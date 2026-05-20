// Lightweight diagnostic endpoint. Tells you whether each piece of Mach's
// runtime is configured and reachable. Safe to expose publicly — returns only
// boolean / status strings, no secret values.
//
// Curl from anywhere:
//   curl https://www.aaryanlath.com/api/health | jq
//
// Useful when verifying a new Vercel deploy picked up env-var changes
// (Upstash, GROQ_API_KEY, etc.) without having to trigger a real chat.

import { Redis } from '@upstash/redis';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface HealthReport {
  ok: boolean;
  providers: {
    gemini: 'configured' | 'missing';
    groq: 'configured' | 'missing';
  };
  kv: 'ok' | 'not-configured' | string;
  timestamp: string;
}

async function checkKv(): Promise<HealthReport['kv']> {
  const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return 'not-configured';

  try {
    const redis = new Redis({ url, token });
    const key = `mach:health:${Date.now()}`;
    await redis.set(key, '1', { ex: 60 });
    const got = await redis.get<string>(key);
    await redis.del(key);
    return got === '1' ? 'ok' : `unexpected-value:${got}`;
  } catch (err) {
    return `error:${(err as Error).message.slice(0, 120)}`;
  }
}

export async function GET() {
  const report: HealthReport = {
    ok: false,
    providers: {
      gemini: process.env.GEMINI_API_KEY ? 'configured' : 'missing',
      groq: process.env.GROQ_API_KEY ? 'configured' : 'missing',
    },
    kv: await checkKv(),
    timestamp: new Date().toISOString(),
  };

  // "ok" = at least one provider is configured AND kv is either ok or
  // intentionally not configured. KV not-configured is fine — in-memory fallback
  // covers it. KV error is a problem worth knowing about.
  const hasProvider = report.providers.gemini === 'configured' || report.providers.groq === 'configured';
  const kvHealthy = report.kv === 'ok' || report.kv === 'not-configured';
  report.ok = hasProvider && kvHealthy;

  return new Response(JSON.stringify(report, null, 2), {
    status: report.ok ? 200 : 503,
    headers: { 'content-type': 'application/json' },
  });
}
