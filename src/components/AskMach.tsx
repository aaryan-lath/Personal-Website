'use client';

import { useEffect, useRef, useState } from 'react';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  unlock?: { path: string };
}

const UNLOCK_SENTINEL = '__MACH_UNLOCK__';

const STARTER_PROMPTS = [
  "What's Aaryan's race with Prof. Parsons?",
  "What hackathon prize did Aaryan win?",
  "What does Aaryan listen to when he studies?",
];

export default function AskMach() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    setError(null);
    const next: ChatMessage[] = [...messages, { role: 'user', content: trimmed }];
    setMessages(next);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ messages: next }),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        const fallbackByStatus =
          res.status === 429
            ? 'Too many messages. Please wait a bit.'
            : res.status === 503
              ? 'Chat is not configured yet.'
              : 'Something went wrong.';
        setError(data.error ?? fallbackByStatus);
        setLoading(false);
        return;
      }

      if (!res.body) {
        setError('No response body.');
        setLoading(false);
        return;
      }

      setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let raw = '';
      let unlock: { path: string } | undefined;
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        raw += decoder.decode(value, { stream: true });
        // Detect the __MACH_UNLOCK__{"path":"..."} sentinel emitted by the server.
        // Anything from the sentinel onward is metadata, not visible content.
        let visible = raw;
        const idx = raw.indexOf(UNLOCK_SENTINEL);
        if (idx >= 0) {
          visible = raw.slice(0, idx).replace(/\n+$/, '');
          const after = raw.slice(idx + UNLOCK_SENTINEL.length);
          const jsonMatch = after.match(/^\s*(\{[^}]*\})/);
          if (jsonMatch) {
            try {
              const parsed = JSON.parse(jsonMatch[1]) as { path?: unknown };
              if (typeof parsed.path === 'string' && parsed.path.startsWith('/')) {
                unlock = { path: parsed.path };
              }
            } catch {
              // Wait for more bytes; partial JSON across chunks.
            }
          }
        }
        setMessages((prev) => {
          const updated = [...prev];
          const last = updated[updated.length - 1];
          if (last?.role === 'assistant') {
            updated[updated.length - 1] = { ...last, content: visible, unlock };
          }
          return updated;
        });
      }
    } catch (e) {
      console.error(e);
      setError('Network error. Try again.');
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    send(input);
  }

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Close Ask Mach 0.96 chat' : 'Open Ask Mach 0.96 chat'}
        className={`fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full shadow-xl transition-all duration-300 ${
          open
            ? 'bg-gray-900 text-white hover:bg-gray-800 px-4 py-3'
            : 'bg-indigo-600 text-white hover:bg-indigo-700 px-5 py-3'
        }`}
      >
        {open ? (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span className="text-sm font-medium">Ask Mach 0.96</span>
          </>
        )}
      </button>

      {/* Chat panel — liquid glass */}
      {open && (
        <div
          className="fixed bottom-20 right-3 left-3 sm:left-auto sm:right-5 sm:bottom-24 z-50 sm:w-[380px] max-w-full rounded-3xl shadow-2xl border border-white/40 flex flex-col overflow-hidden animate-[fadeInUp_0.2s_ease-out] bg-white/55 backdrop-blur-2xl backdrop-saturate-150 ring-1 ring-black/5"
          style={{ height: 'min(560px, calc(100vh - 7rem))' }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-indigo-600/90 to-purple-600/90 backdrop-blur-xl text-white border-b border-white/30">
            <div className="w-9 h-9 rounded-full bg-white/25 backdrop-blur ring-1 ring-white/40 flex items-center justify-center text-lg font-semibold">M</div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold leading-tight">Mach 0.96</div>
              <div className="text-xs text-white/85 leading-tight">Ask about Aaryan&apos;s hackathon prize, research, and more</div>
            </div>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 bg-white/10">
            {messages.length === 0 && (
              <div className="space-y-3">
                <p className="text-sm text-gray-700">
                  Hi, I&apos;m Mach 0.96. Ask me anything about Aaryan — his work, research, projects, or his recent StarkHacks finish.
                </p>
                <div className="flex flex-wrap gap-2">
                  {STARTER_PROMPTS.map((p) => (
                    <button
                      key={p}
                      onClick={() => send(p)}
                      className="text-xs text-indigo-800 bg-white/60 hover:bg-white/80 backdrop-blur-md border border-white/60 px-3 py-1.5 rounded-full transition-colors shadow-sm"
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className="flex flex-col gap-2 max-w-[85%]">
                  <div
                    className={`rounded-2xl px-3.5 py-2 text-sm whitespace-pre-wrap shadow-sm ${
                      m.role === 'user'
                        ? 'bg-indigo-600/90 backdrop-blur text-white rounded-br-sm border border-indigo-400/40'
                        : 'bg-white/70 backdrop-blur-md text-gray-800 border border-white/60 rounded-bl-sm'
                    }`}
                  >
                    {m.content || (
                      <span className="inline-flex gap-1">
                        <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </span>
                    )}
                  </div>
                  {m.role === 'assistant' && m.unlock && (
                    <a
                      href={m.unlock.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="self-start inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 text-xs font-semibold shadow-md hover:opacity-90 transition-opacity"
                    >
                      <span aria-hidden>🔐</span>
                      <span>Open Team Manager</span>
                      <span aria-hidden>→</span>
                    </a>
                  )}
                </div>
              </div>
            ))}

            {error && (
              <div className="text-xs text-red-700 bg-red-100/70 backdrop-blur border border-red-200 rounded-lg px-3 py-2">
                {error}
              </div>
            )}
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="border-t border-white/40 p-3 bg-white/30 backdrop-blur-xl flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question..."
              disabled={loading}
              maxLength={1000}
              className="flex-1 px-3 py-2 text-sm text-gray-900 bg-white/70 backdrop-blur border border-white/60 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:opacity-60 placeholder:text-gray-500"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="bg-indigo-600 text-white rounded-full p-2 hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-md"
              aria-label="Send message"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </>
  );
}
