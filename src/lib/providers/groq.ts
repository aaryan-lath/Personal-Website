import Groq from 'groq-sdk';
import type { GenerateRequest, GenerateChunk, Provider } from './types';
import { QuotaExhaustedError, OverloadedError } from './types';

let groqClient: Groq | null = null;
function getClient(): Groq {
  if (!groqClient) {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) throw new Error('GROQ_API_KEY not set');
    groqClient = new Groq({ apiKey });
  }
  return groqClient;
}

function classifyError(err: unknown, providerName: string): Error {
  const msg = err instanceof Error ? err.message : String(err);
  const status = (err as { status?: number })?.status;
  const isQuota = status === 429 || /429|quota|rate.?limit/i.test(msg);
  const isOverloaded = status === 503 || /503|overloaded|unavailable/i.test(msg);
  if (isQuota) {
    const isDaily = /day|daily|24h|tokens.?per.?day|requests.?per.?day/i.test(msg);
    return new QuotaExhaustedError(providerName, 60_000, isDaily ? 'day' : 'minute', err);
  }
  if (isOverloaded) return new OverloadedError(providerName, err);
  return err instanceof Error ? err : new Error(msg);
}

export function createGroqProvider(modelId: string): Provider {
  const providerName = `groq:${modelId}`;
  return {
    name: providerName,
    vendor: 'groq',
    async *generate(req: GenerateRequest): AsyncIterable<GenerateChunk> {
      const groq = getClient();

      // Groq follows the OpenAI message shape: system + user/assistant turns.
      const messages = [
        { role: 'system' as const, content: req.systemInstruction },
        ...req.messages.map((m) => ({
          role: m.role as 'user' | 'assistant',
          content: m.content,
        })),
      ];

      let stream;
      try {
        stream = await groq.chat.completions.create({
          model: modelId,
          messages,
          temperature: req.temperature ?? 0.3,
          max_tokens: req.maxOutputTokens ?? 512,
          stream: true,
        });
      } catch (err) {
        throw classifyError(err, providerName);
      }

      try {
        for await (const chunk of stream) {
          const choice = chunk.choices?.[0];
          // Some OpenAI-compatible APIs use 'content_filter' as a finish_reason;
          // Groq's typings don't include it but the API could return it. Compare
          // as a string for forward compatibility.
          const finishReason = choice?.finish_reason as string | null | undefined;
          if (finishReason === 'content_filter') {
            yield { safetyBlocked: true, blockReason: 'content_filter' };
            return;
          }
          const text = choice?.delta?.content;
          if (text) yield { text };
        }
      } catch (err) {
        throw classifyError(err, providerName);
      }
    },
  };
}
