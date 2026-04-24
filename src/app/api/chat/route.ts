import { GoogleGenAI } from '@google/genai';
import { aboutAaryan } from '../../../data/about-aaryan';
import { checkRateLimit, getClientIp } from '../../../lib/rate-limit';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const MODEL = 'gemini-2.5-flash';
const MAX_HISTORY = 20;
const MAX_CONTENT_CHARS = 2000;

export async function POST(req: Request) {
  const ip = getClientIp(req);
  const limit = checkRateLimit(ip);
  if (!limit.ok) {
    return new Response(
      JSON.stringify({ error: 'Too many requests. Please try again later.' }),
      { status: 429, headers: { 'content-type': 'application/json', 'retry-after': String(limit.retryAfterSeconds) } }
    );
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: 'Chat is temporarily unavailable.' }),
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

  const contents = messages.map((m) => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }],
  }));

  const ai = new GoogleGenAI({ apiKey });

  const stream = await ai.models.generateContentStream({
    model: MODEL,
    contents,
    config: {
      systemInstruction: aboutAaryan,
      temperature: 0.4,
      maxOutputTokens: 512,
    },
  });

  // Mach can append a gap marker like "[GAP: career goals]" when it lacks info.
  // Strip these from the user-facing stream and log them server-side so Aaryan
  // sees what visitors are asking that the bot can't answer well.
  const GAP_TAG = /\[GAP:\s*([^\]]*?)\]/g;
  const HOLD_CHARS = 80; // hold the tail of the stream so we can detect a forming "[GAP:" tag
  const lastUserMessage = messages[messages.length - 1].content;

  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
      let raw = '';
      let sentLen = 0;
      try {
        for await (const chunk of stream) {
          const text = chunk.text;
          if (!text) continue;
          raw += text;
          const cleaned = raw.replace(GAP_TAG, '');
          if (cleaned.length - sentLen > HOLD_CHARS) {
            const toSend = cleaned.slice(sentLen, cleaned.length - HOLD_CHARS);
            controller.enqueue(encoder.encode(toSend));
            sentLen += toSend.length;
          }
        }
        const finalCleaned = raw.replace(GAP_TAG, '');
        const tail = finalCleaned.slice(sentLen);
        if (tail) controller.enqueue(encoder.encode(tail));
        controller.close();

        const matches = [...raw.matchAll(GAP_TAG)];
        if (matches.length > 0) {
          const topics = matches.map((m) => m[1].trim()).filter(Boolean);
          console.warn(
            `[Mach gap] question=${JSON.stringify(lastUserMessage)} topics=${JSON.stringify(topics)}`
          );
        }
      } catch (err) {
        console.error('Gemini stream error:', err);
        controller.enqueue(encoder.encode('\n\n[Sorry, something went wrong generating a reply.]'));
        controller.close();
      }
    },
  });

  return new Response(readable, {
    headers: {
      'content-type': 'text/plain; charset=utf-8',
      'cache-control': 'no-store',
    },
  });
}
