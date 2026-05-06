import type { GoogleGenAI } from '@google/genai';

export const EMBED_MODEL = 'gemini-embedding-001';
export const EMBED_DIM = 768;

// Free tier of gemini-embedding-001 is 100 requests/min.
// Throttle to ~85 RPM (one call every ~710ms) to leave headroom for the rest of the build.
const MIN_DELAY_MS = 720;
const MAX_RETRIES = 4;

function sleep(ms: number): Promise<void> {
  return new Promise((res) => setTimeout(res, ms));
}

async function embedOne(ai: GoogleGenAI, text: string): Promise<number[]> {
  let attempt = 0;
  while (true) {
    try {
      const res = await ai.models.embedContent({
        model: EMBED_MODEL,
        contents: [text],
        config: { outputDimensionality: EMBED_DIM },
      });
      const values = res.embeddings?.[0]?.values ?? [];
      if (values.length === 0) throw new Error('Empty embedding returned by Gemini');
      return values;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      const is429 = /429|RESOURCE_EXHAUSTED|quota/i.test(msg);
      attempt++;
      if (!is429 || attempt > MAX_RETRIES) throw err;
      const retryMatch = msg.match(/retry in (\d+(?:\.\d+)?)s/i);
      const wait = retryMatch ? Math.ceil(parseFloat(retryMatch[1]) * 1000) + 500 : 2000 * attempt;
      console.warn(`[embed] 429 received, retrying in ${(wait / 1000).toFixed(1)}s (attempt ${attempt}/${MAX_RETRIES})`);
      await sleep(wait);
    }
  }
}

export async function embedTexts(ai: GoogleGenAI, texts: string[]): Promise<number[][]> {
  if (texts.length === 0) return [];

  const out: number[][] = [];
  for (let i = 0; i < texts.length; i++) {
    const start = Date.now();
    out.push(await embedOne(ai, texts[i]));
    const elapsed = Date.now() - start;
    if (i < texts.length - 1 && elapsed < MIN_DELAY_MS) {
      await sleep(MIN_DELAY_MS - elapsed);
    }
  }
  return out;
}

export async function embedText(ai: GoogleGenAI, text: string): Promise<number[]> {
  const [v] = await embedTexts(ai, [text]);
  return v;
}

export function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length) return 0;
  let dot = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  const denom = Math.sqrt(normA) * Math.sqrt(normB);
  return denom === 0 ? 0 : dot / denom;
}
