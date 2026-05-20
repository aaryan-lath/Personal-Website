import { GoogleGenAI } from '@google/genai';
import type { GenerateRequest, GenerateChunk, Provider } from './types';
import { QuotaExhaustedError, OverloadedError } from './types';

let aiClient: GoogleGenAI | null = null;
function getClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error('GEMINI_API_KEY not set');
    aiClient = new GoogleGenAI({ apiKey });
  }
  return aiClient;
}

function parseRetryAfterMs(msg: string): number {
  const m = msg.match(/retry in (\d+(?:\.\d+)?)s/i);
  if (m) return Math.ceil(parseFloat(m[1]) * 1000);
  return 60_000;
}

function classifyError(err: unknown, providerName: string): Error {
  const msg = err instanceof Error ? err.message : String(err);
  const isQuota = /429|RESOURCE_EXHAUSTED|quota|GenerateRequestsPerDay/i.test(msg);
  const isOverloaded = /503|UNAVAILABLE|overloaded|high demand/i.test(msg);
  if (isQuota) {
    const isDaily = /GenerateRequestsPerDayPerProjectPerModel|day/i.test(msg);
    return new QuotaExhaustedError(
      providerName,
      parseRetryAfterMs(msg),
      isDaily ? 'day' : 'minute',
      err
    );
  }
  if (isOverloaded) return new OverloadedError(providerName, err);
  return err instanceof Error ? err : new Error(msg);
}

export function createGeminiProvider(modelId: string): Provider {
  const providerName = `gemini:${modelId}`;
  return {
    name: providerName,
    vendor: 'gemini',
    async *generate(req: GenerateRequest): AsyncIterable<GenerateChunk> {
      const ai = getClient();
      const contents = req.messages.map((m) => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }],
      }));

      let stream;
      try {
        stream = await ai.models.generateContentStream({
          model: modelId,
          contents,
          config: {
            systemInstruction: req.systemInstruction,
            temperature: req.temperature ?? 0.3,
            maxOutputTokens: req.maxOutputTokens ?? 512,
          },
        });
      } catch (err) {
        throw classifyError(err, providerName);
      }

      try {
        for await (const chunk of stream) {
          const promptBlock = chunk.promptFeedback?.blockReason;
          const finishReason = chunk.candidates?.[0]?.finishReason;
          if (promptBlock || finishReason === 'SAFETY') {
            yield { safetyBlocked: true, blockReason: String(promptBlock ?? finishReason) };
            return;
          }
          const text = chunk.text;
          if (text) yield { text };
        }
      } catch (err) {
        throw classifyError(err, providerName);
      }
    },
  };
}
