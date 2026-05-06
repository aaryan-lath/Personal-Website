import { GoogleGenAI } from '@google/genai';
import { personaPrompt } from '../../../data/about-aaryan';
import { checkRateLimit, getClientIp } from '../../../lib/rate-limit';
import { embedText } from '../../../lib/rag/embed';
import { getIndex, retrieveTopK, formatRetrievedAsContext } from '../../../lib/rag/retrieve';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const MODEL = 'gemini-2.5-flash-lite';
const MAX_HISTORY = 20;
const MAX_CONTENT_CHARS = 2000;
const TOP_K = 7;
const MAX_GENERATION_RETRIES = 2;
const RETRIEVAL_USER_TURNS = 3;

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
  const lastUserMessage = messages[messages.length - 1].content;

  // RAG: embed the last few USER turns combined (no assistant messages — those
  // are Mach's own verbose responses and pollute retrieval intent). Short
  // follow-ups like "Professionally?" then carry the prior question's intent.
  const recentUserTurns = messages
    .filter((m) => m.role === 'user')
    .slice(-RETRIEVAL_USER_TURNS)
    .map((m) => m.content);
  const retrievalQuery = recentUserTurns.join('\n');

  let retrievedBlock = '(no facts retrieved)';
  try {
    const [queryEmbedding, index] = await Promise.all([
      embedText(ai, retrievalQuery),
      getIndex(),
    ]);
    const top = retrieveTopK(index, queryEmbedding, TOP_K);
    retrievedBlock = formatRetrievedAsContext(top);
  } catch (err) {
    console.error('[Mach retrieval] failed, falling back to persona-only prompt:', err);
  }

  const systemInstruction = `${personaPrompt}

# Retrieved facts (top ${TOP_K} most relevant to the user's latest question)
${retrievedBlock}
`;

  let stream;
  let lastErr: unknown;
  for (let attempt = 0; attempt <= MAX_GENERATION_RETRIES; attempt++) {
    try {
      stream = await ai.models.generateContentStream({
        model: MODEL,
        contents,
        config: {
          systemInstruction,
          temperature: 0.4,
          maxOutputTokens: 512,
        },
      });
      break;
    } catch (err) {
      lastErr = err;
      const msg = err instanceof Error ? err.message : String(err);
      const isOverloaded = /503|UNAVAILABLE|overloaded|high demand/i.test(msg);
      if (!isOverloaded || attempt === MAX_GENERATION_RETRIES) break;
      const wait = 800 * (attempt + 1);
      console.warn(`[Mach] gemini overloaded, retrying in ${wait}ms (attempt ${attempt + 1}/${MAX_GENERATION_RETRIES})`);
      await new Promise((r) => setTimeout(r, wait));
    }
  }

  if (!stream) {
    const msg = lastErr instanceof Error ? lastErr.message : String(lastErr);
    const isOverloaded = /503|UNAVAILABLE|overloaded|high demand/i.test(msg);
    const isQuota = /429|RESOURCE_EXHAUSTED|quota/i.test(msg);
    console.error('[Mach] generateContentStream failed after retries:', msg);
    if (isOverloaded) {
      return new Response(
        JSON.stringify({ error: 'Gemini is overloaded right now. Please try again in a minute.' }),
        { status: 503, headers: { 'content-type': 'application/json' } }
      );
    }
    if (isQuota) {
      return new Response(
        JSON.stringify({ error: 'Daily chat quota reached. Please try again tomorrow.' }),
        { status: 429, headers: { 'content-type': 'application/json' } }
      );
    }
    return new Response(
      JSON.stringify({ error: 'Something went wrong reaching the model. Please try again.' }),
      { status: 502, headers: { 'content-type': 'application/json' } }
    );
  }

  // Mach can append a gap marker like "[GAP: career goals]" when it lacks info.
  // Strip these from the user-facing stream and log them server-side so Aaryan
  // sees what visitors are asking that the bot can't answer well.
  const GAP_TAG = /\[GAP:\s*([^\]]*?)\]/g;
  const HOLD_CHARS = 80; // hold the tail of the stream so we can detect a forming "[GAP:" tag

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
