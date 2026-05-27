import { aboutAaryan } from '../../../data/about-aaryan';
import { checkRateLimit, getClientIp } from '../../../lib/rate-limit';
import { callWithFallback, AllProvidersExhaustedError } from '../../../lib/providers/registry';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const MAX_HISTORY = 20;
const MAX_CONTENT_CHARS = 2000;

export async function POST(req: Request) {
  const ip = getClientIp(req);
  const limit = checkRateLimit(ip);
  if (!limit.ok) {
    return new Response(
      JSON.stringify({ error: 'Too many requests. Please try again later.' }),
      {
        status: 429,
        headers: { 'content-type': 'application/json', 'retry-after': String(limit.retryAfterSeconds) },
      }
    );
  }

  if (!process.env.GEMINI_API_KEY && !process.env.GROQ_API_KEY) {
    return new Response(
      JSON.stringify({ error: 'Chat is not configured. Set GEMINI_API_KEY or GROQ_API_KEY.' }),
      { status: 503, headers: { 'content-type': 'application/json' } }
    );
  }

  let body: { messages?: ChatMessage[] };
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON body.' }), {
      status: 400,
      headers: { 'content-type': 'application/json' },
    });
  }

  const messages = (body.messages ?? [])
    .filter((m) => (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
    .slice(-MAX_HISTORY)
    .map((m) => ({ ...m, content: m.content.slice(0, MAX_CONTENT_CHARS) }));

  if (messages.length === 0 || messages[messages.length - 1].role !== 'user') {
    return new Response(JSON.stringify({ error: 'Last message must be from user.' }), {
      status: 400,
      headers: { 'content-type': 'application/json' },
    });
  }

  const lastUserMessage = messages[messages.length - 1].content;

  let providerName: string;
  let providerStream;
  try {
    const result = await callWithFallback({
      systemInstruction: aboutAaryan,
      messages,
      temperature: 0.3,
      maxOutputTokens: 512,
    });
    providerName = result.providerName;
    providerStream = result.stream;
  } catch (err) {
    if (err instanceof AllProvidersExhaustedError) {
      return new Response(
        JSON.stringify({ error: 'Daily chat quota reached across all providers. Please try again tomorrow.' }),
        { status: 429, headers: { 'content-type': 'application/json' } }
      );
    }
    const msg = err instanceof Error ? err.message : String(err);
    console.error('[Mach] provider chain failed:', msg);
    return new Response(
      JSON.stringify({ error: 'Something went wrong reaching the model. Please try again.' }),
      { status: 502, headers: { 'content-type': 'application/json' } }
    );
  }

  // Mach can append two kinds of inline tags:
  //   - "[GAP: career goals]"            — knowledge gap, log server-side, strip from output.
  //   - "[UNLOCK: /admin/team-manager.html]" — Mach revealed the hidden admin route to
  //     a recognized trigger phrase. Strip from text, append a `__MACH_UNLOCK__{json}`
  //     sentinel line so AskMach.tsx can render an unlock-link card.
  const GAP_TAG = /\[GAP:\s*([^\]]*?)\]/g;
  const UNLOCK_TAG = /\[UNLOCK:\s*([^\]]*?)\]/g;
  const stripTags = (s: string) => s.replace(GAP_TAG, '').replace(UNLOCK_TAG, '');
  const HOLD_CHARS = 80;
  const SAFETY_REFUSAL = "I can't help with that one. Try a different question about Aaryan.";
  // Whitelist of paths Mach is allowed to unlock. Anything else is dropped silently.
  const UNLOCK_WHITELIST = new Set(['/admin/team-manager.html']);

  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
      let raw = '';
      let sentLen = 0;
      let safetyBlocked = false;
      let blockReason = '';
      try {
        for await (const chunk of providerStream) {
          if (chunk.safetyBlocked) {
            safetyBlocked = true;
            blockReason = chunk.blockReason ?? 'unknown';
            break;
          }
          const text = chunk.text;
          if (!text) continue;
          raw += text;
          const cleaned = stripTags(raw);
          if (cleaned.length - sentLen > HOLD_CHARS) {
            const toSend = cleaned.slice(sentLen, cleaned.length - HOLD_CHARS);
            controller.enqueue(encoder.encode(toSend));
            sentLen += toSend.length;
          }
        }

        if (safetyBlocked) {
          console.warn(
            `[Mach safety-block] provider=${providerName} reason=${blockReason} question=${JSON.stringify(lastUserMessage)}`
          );
          const prefix = sentLen > 0 ? '\n\n' : '';
          controller.enqueue(encoder.encode(prefix + SAFETY_REFUSAL));
          controller.close();
          return;
        }

        const finalCleaned = stripTags(raw);
        const tail = finalCleaned.slice(sentLen);
        if (tail) controller.enqueue(encoder.encode(tail));

        // Surface any whitelisted UNLOCK tag as a sentinel JSON frame for the client.
        const unlockMatches = [...raw.matchAll(UNLOCK_TAG)];
        for (const m of unlockMatches) {
          const path = m[1].trim();
          if (UNLOCK_WHITELIST.has(path)) {
            controller.enqueue(
              encoder.encode(`\n\n__MACH_UNLOCK__${JSON.stringify({ path })}\n`)
            );
            console.log(
              `[Mach unlock] provider=${providerName} path=${path} question=${JSON.stringify(lastUserMessage)}`
            );
            break; // only emit the first whitelisted unlock per response
          } else {
            console.warn(
              `[Mach unlock-rejected] provider=${providerName} path=${path} not in whitelist`
            );
          }
        }

        controller.close();

        const matches = [...raw.matchAll(GAP_TAG)];
        if (matches.length > 0) {
          const topics = matches.map((m) => m[1].trim()).filter(Boolean);
          console.warn(
            `[Mach gap] provider=${providerName} question=${JSON.stringify(lastUserMessage)} topics=${JSON.stringify(topics)}`
          );
        }
      } catch (err) {
        console.error(`[Mach] stream error from ${providerName}:`, err);
        controller.enqueue(encoder.encode('\n\n[Sorry, something went wrong generating a reply.]'));
        controller.close();
      }
    },
  });

  return new Response(readable, {
    headers: {
      'content-type': 'text/plain; charset=utf-8',
      'cache-control': 'no-store',
      'x-mach-provider': providerName,
    },
  });
}
