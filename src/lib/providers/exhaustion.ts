// Persistent "model X is exhausted until time Y" store.
//
// Backed by Upstash Redis when KV_REST_API_URL / KV_REST_API_TOKEN env vars
// are present (Vercel Marketplace integration sets these). Otherwise falls back
// to a per-Lambda in-memory Map — works fine for a single warm instance but
// won't survive cold starts or scale across instances. Both behaviors are
// "good enough": the worst case with in-memory is that each cold instance pays
// one 429 to rediscover an exhausted model.

import { Redis } from '@upstash/redis';

const KEY_PREFIX = 'mach:exhausted:';

let kvClient: Redis | null = null;
function getKv(): Redis | null {
  if (kvClient) return kvClient;
  const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  kvClient = new Redis({ url, token });
  return kvClient;
}

// In-memory fallback. Map<providerName, resetAtMs>.
const memCache = new Map<string, number>();

export async function isExhausted(providerName: string): Promise<boolean> {
  const kv = getKv();
  if (kv) {
    try {
      const val = await kv.get<number>(KEY_PREFIX + providerName);
      if (typeof val === 'number' && val > Date.now()) return true;
      return false;
    } catch (err) {
      console.warn('[exhaustion] KV read failed, falling back to in-memory:', (err as Error).message);
    }
  }
  const memTs = memCache.get(providerName);
  return typeof memTs === 'number' && memTs > Date.now();
}

export async function markExhausted(providerName: string, resetAtMs: number): Promise<void> {
  memCache.set(providerName, resetAtMs);
  const kv = getKv();
  if (kv) {
    try {
      const ttlSeconds = Math.max(1, Math.ceil((resetAtMs - Date.now()) / 1000));
      await kv.set(KEY_PREFIX + providerName, resetAtMs, { ex: ttlSeconds });
    } catch (err) {
      console.warn('[exhaustion] KV write failed:', (err as Error).message);
    }
  }
}

export async function getAllExhaustionStates(): Promise<Record<string, number>> {
  const out: Record<string, number> = {};
  const now = Date.now();
  for (const [name, ts] of memCache.entries()) {
    if (ts > now) out[name] = ts;
  }
  return out;
}

// Default reset time when the API doesn't tell us (use next midnight Pacific
// since Gemini's daily quota resets there).
export function nextMidnightPacificMs(): number {
  const now = new Date();
  const utcNow = now.getTime();
  // Pacific is UTC-8 (standard) or UTC-7 (daylight). Use a safe conservative
  // estimate: 8 hours behind UTC. That gives us "midnight at -8" which is
  // 08:00 UTC. Round up to the next such moment.
  const offsetHours = 8;
  const pacificNow = new Date(utcNow - offsetHours * 3600 * 1000);
  const pacificMidnight = new Date(
    Date.UTC(
      pacificNow.getUTCFullYear(),
      pacificNow.getUTCMonth(),
      pacificNow.getUTCDate() + 1,
      0,
      0,
      0
    )
  );
  return pacificMidnight.getTime() + offsetHours * 3600 * 1000;
}
