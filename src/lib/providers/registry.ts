// Ordered provider fallback chain.
//
// On each chat request: walk the list, skip any provider currently marked
// "exhausted" in the store, and try to start a stream. If the first chunk-or-
// open call throws QuotaExhaustedError, mark that provider exhausted (with the
// reset time the API gave us, or midnight Pacific as the default) and try the
// next. If it throws OverloadedError, advance immediately without marking
// (overloads clear themselves quickly). Any other error: re-throw to the route.

import { createGeminiProvider } from './gemini';
import { createGroqProvider } from './groq';
import { isExhausted, markExhausted, nextMidnightPacificMs } from './exhaustion';
import { QuotaExhaustedError, OverloadedError } from './types';
import type { GenerateRequest, GenerateChunk, Provider } from './types';

// Order matters: best/cheapest/fastest first, fall through to alternatives.
// Each Gemini model has its own 20/day free-tier bucket.
// Groq is the safety-net (much higher daily limits on free tier).
function buildChain(): Provider[] {
  const chain: Provider[] = [];

  if (process.env.GEMINI_API_KEY) {
    chain.push(
      createGeminiProvider('gemini-2.5-flash-lite'),
      createGeminiProvider('gemini-2.0-flash-lite'),
      createGeminiProvider('gemini-2.0-flash'),
      createGeminiProvider('gemini-flash-latest'),
      createGeminiProvider('gemini-2.5-flash'),
    );
  }

  if (process.env.GROQ_API_KEY) {
    chain.push(
      createGroqProvider('openai/gpt-oss-120b'),
      createGroqProvider('llama-3.3-70b-versatile'),
      createGroqProvider('openai/gpt-oss-20b'),
      createGroqProvider('llama-3.1-8b-instant'),
    );
  }

  return chain;
}

let cachedChain: Provider[] | null = null;
function getChain(): Provider[] {
  if (!cachedChain) cachedChain = buildChain();
  return cachedChain;
}

export interface CallResult {
  providerName: string;
  stream: AsyncIterable<GenerateChunk>;
}

export class AllProvidersExhaustedError extends Error {
  constructor() {
    super('All providers are exhausted or unavailable.');
    this.name = 'AllProvidersExhaustedError';
  }
}

/**
 * Walk the provider chain, return the first successful stream.
 * The stream itself is fault-tolerant: errors thrown mid-stream will surface
 * to the caller. Fallback only happens at stream-open time.
 */
export async function callWithFallback(req: GenerateRequest): Promise<CallResult> {
  const chain = getChain();
  if (chain.length === 0) {
    throw new Error('No providers configured — set GEMINI_API_KEY and/or GROQ_API_KEY.');
  }

  let lastError: Error | null = null;

  for (const provider of chain) {
    if (await isExhausted(provider.name)) {
      console.warn(`[providers] skipping ${provider.name} (cached exhausted)`);
      continue;
    }

    try {
      // Probe by opening the stream and reading the first chunk. This forces
      // the API call to happen so quota errors surface here, not mid-stream.
      const generator = provider.generate(req);
      const probed = probeAndContinue(generator);
      await probed.firstChunkReady;
      console.log(`[providers] using ${provider.name}`);
      return { providerName: provider.name, stream: probed.stream };
    } catch (err) {
      if (err instanceof QuotaExhaustedError) {
        const resetAt = err.scope === 'day' ? nextMidnightPacificMs() : Date.now() + err.retryAfterMs;
        await markExhausted(provider.name, resetAt);
        const waitMin = Math.round((resetAt - Date.now()) / 60_000);
        console.warn(`[providers] ${provider.name} exhausted (${err.scope}); marked until ${new Date(resetAt).toISOString()} (~${waitMin}m)`);
        lastError = err;
        continue;
      }
      if (err instanceof OverloadedError) {
        console.warn(`[providers] ${provider.name} overloaded — advancing`);
        lastError = err;
        continue;
      }
      // Unknown error — surface to caller.
      throw err;
    }
  }

  throw lastError instanceof Error
    ? new AllProvidersExhaustedError()
    : new AllProvidersExhaustedError();
}

/**
 * Wraps an AsyncIterable so we can "peek" the first chunk synchronously-ish.
 * The probe iterates once to force the underlying API call; the returned
 * `stream` yields that first chunk and then everything else.
 */
function probeAndContinue(source: AsyncIterable<GenerateChunk>): {
  firstChunkReady: Promise<void>;
  stream: AsyncIterable<GenerateChunk>;
} {
  const iterator = source[Symbol.asyncIterator]();
  const firstChunkPromise = iterator.next();
  // firstChunkReady resolves when the underlying API call has produced (or
  // failed to produce) its first chunk. Errors propagate so the caller can
  // catch QuotaExhaustedError before any output is enqueued downstream.
  const firstChunkReady = firstChunkPromise.then(() => undefined);

  const stream = (async function* () {
    const first = await firstChunkPromise;
    if (!first.done) yield first.value;
    while (true) {
      const next = await iterator.next();
      if (next.done) return;
      yield next.value;
    }
  })();

  return { firstChunkReady, stream };
}
