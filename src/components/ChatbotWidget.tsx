'use client';

import React, { useEffect, useRef, useState } from 'react';
import { MessageSquare, X, Loader2, RefreshCw, Send, Square } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const STARTERS = [
  'What has Adrian actually shipped?',
  'Tell me about his hackathon results',
  'What is his tech stack?',
  'Is he available for internships?',
  'Why should we hire him?',
];

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const uid = () => Math.random().toString(36).slice(2);

/** The shadcn/ui mark — two diagonal strokes on a 256 grid. */
const ShadcnMark = ({ size = 14 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 256 256"
    fill="none"
    stroke="currentColor"
    strokeWidth={25}
    strokeLinecap="round"
    aria-hidden="true"
  >
    <line x1="208" y1="128" x2="128" y2="208" />
    <line x1="192" y1="40" x2="40" y2="192" />
  </svg>
);

/** Minimal inline markdown: **bold**, [text](url), "- " bullets. */
const renderInline = (line: string, keyPrefix: string) => {
  const parts = line.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g);

  return parts.map((part, i) => {
    const key = `${keyPrefix}-${i}`;

    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={key} className="font-semibold text-primary">
          {part.slice(2, -2)}
        </strong>
      );
    }

    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      return (
        <a
          key={key}
          href={link[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="prose-link underline underline-offset-2"
        >
          {link[1]}
        </a>
      );
    }

    return <React.Fragment key={key}>{part}</React.Fragment>;
  });
};

const MessageBody = ({ content, role }: { content: string; role: ChatMessage['role'] }) => {
  if (role === 'user') return <p className="text-[16.5px] leading-relaxed">{content}</p>;

  return (
    <div className="space-y-1.5 text-[16.5px] leading-relaxed">
      {content.split('\n').map((line, i) => {
        const trimmed = line.trim();
        if (!trimmed) return null;

        if (/^[-•*]\s+/.test(trimmed)) {
          return (
            <div key={i} className="flex gap-1.5 pl-0.5">
              <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-muted" />
              <span className="text-secondary">
                {renderInline(trimmed.replace(/^[-•*]\s+/, ''), `l${i}`)}
              </span>
            </div>
          );
        }

        return (
          <p key={i} className="text-secondary">
            {renderInline(trimmed, `l${i}`)}
          </p>
        );
      })}
    </div>
  );
};

export const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (isOpen) endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, isStreaming, isOpen]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  // Drop any in-flight stream if the widget unmounts.
  useEffect(() => () => abortRef.current?.abort(), []);

  const send = async (text: string) => {
    const question = text.trim();
    if (!question || isStreaming) return;

    setError(null);
    setInput('');

    const userMsg: ChatMessage = { id: uid(), role: 'user', content: question };
    const replyId = uid();
    const history = [...messages, userMsg];

    setMessages([...history, { id: replyId, role: 'assistant', content: '' }]);
    setIsStreaming(true);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          messages: history.map(({ role, content }) => ({ role, content })),
        }),
      });

      if (!res.ok || !res.body) {
        throw new Error((await res.text()) || 'The assistant is unavailable right now.');
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = '';

      // Plain text stream from the route, appended token-by-token.
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages((prev) => prev.map((m) => (m.id === replyId ? { ...m, content: acc } : m)));
      }

      if (!acc.trim()) {
        setMessages((prev) => prev.filter((m) => m.id !== replyId));
        setError('No response came back. Try asking again.');
      }
    } catch (err) {
      // An aborted stream is a user action, not a failure.
      if ((err as Error).name !== 'AbortError') {
        setMessages((prev) => prev.filter((m) => m.id !== replyId || m.content));
        setError(err instanceof Error ? err.message : 'Something went wrong.');
      }
    } finally {
      setIsStreaming(false);
      abortRef.current = null;
    }
  };

  const reset = () => {
    abortRef.current?.abort();
    setMessages([]);
    setError(null);
    setInput('');
  };

  const waiting = isStreaming && !messages[messages.length - 1]?.content;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="mb-3 flex w-[calc(100vw-2.5rem)] flex-col overflow-hidden rounded-xl border border-border bg-background shadow-2xl sm:w-[400px]"
            style={{ height: 540, maxHeight: '76vh' }}
          >
            {/* Header */}
            <div className="flex shrink-0 items-center justify-between border-b border-border px-3.5 py-2.5">
              <div className="flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface text-primary">
                  <ShadcnMark size={18} />
                </span>
                <div>
                  <p className="text-[16.5px] font-medium text-primary">Ask about Adrian</p>
                  <p className="text-[14px] text-muted">
                    Answers from the portfolio — or anything else
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {messages.length > 0 && (
                  <button
                    type="button"
                    onClick={reset}
                    title="New conversation"
                    className="flex h-8 w-8 items-center justify-center rounded-md text-muted transition-colors hover:bg-surface hover:text-primary"
                  >
                    <RefreshCw size={17} />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close chat"
                  className="flex h-8 w-8 items-center justify-center rounded-md text-muted transition-colors hover:bg-surface hover:text-primary"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Transcript */}
            {/* data-lenis-prevent: smooth scrolling hijacks the wheel at the
                document level, which otherwise makes this panel unscrollable. */}
            <div
              data-lenis-prevent
              className="flex-1 space-y-3 overflow-y-auto overscroll-contain px-3.5 py-3.5"
            >
              {messages.length === 0 && (
                <div className="py-4">
                  <p className="text-[16.5px] leading-relaxed text-secondary">
                    Ask about Adrian&apos;s projects, experience, or availability — or ask
                    anything else you&apos;re curious about.
                  </p>
                  <div className="mt-3 flex flex-col gap-1.5">
                    {STARTERS.map((starter) => (
                      <button
                        key={starter}
                        type="button"
                        onClick={() => send(starter)}
                        className="rounded-lg border border-border bg-background px-2.5 py-2 text-left text-[16px] text-secondary transition-colors hover:border-primary/20 hover:bg-surface hover:text-primary"
                      >
                        {starter}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* The assistant message is created empty while the stream opens;
                  rendering it draws a blank bubble above the "Thinking…" pill. */}
              {messages.map((m) =>
                m.role === 'assistant' && !m.content ? null : (
                <div
                  key={m.id}
                  className={cn('flex', m.role === 'user' ? 'justify-end' : 'justify-start')}
                >
                  <div
                    className={cn(
                      'max-w-[88%] rounded-xl px-3 py-2',
                      m.role === 'user'
                        ? 'bg-accent text-background'
                        : 'border border-border bg-surface'
                    )}
                  >
                    <MessageBody content={m.content} role={m.role} />
                  </div>
                </div>
                )
              )}

              {waiting && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-2 rounded-xl border border-border bg-surface px-3 py-2 text-[16px] text-muted">
                    <Loader2 size={17} className="animate-spin" />
                    Thinking…
                  </div>
                </div>
              )}

              {error && (
                <p className="rounded-lg border border-border bg-surface px-3 py-2 text-[15px] text-secondary">
                  {error}
                </p>
              )}

              <div ref={endRef} />
            </div>

            {/* Composer */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex shrink-0 items-center gap-2 border-t border-border px-3 py-2.5"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything…"
                // outline-none with no replacement leaves keyboard users with
                // no focus indication at all (WCAG 2.4.7), so ring it instead.
                className="min-w-0 flex-1 rounded-md bg-transparent px-1 py-0.5 text-[16.5px] text-primary outline-none ring-primary/40 placeholder:text-muted focus-visible:ring-2"
              />
              {isStreaming ? (
                <button
                  type="button"
                  onClick={() => abortRef.current?.abort()}
                  aria-label="Stop generating"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-secondary transition-colors hover:text-primary"
                >
                  <Square size={15} />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!input.trim()}
                  aria-label="Send message"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-background transition-opacity disabled:opacity-30"
                >
                  <Send size={16} />
                </button>
              )}
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        className="flex items-center gap-2 rounded-full bg-accent px-4 py-3 font-mono text-[14.5px] font-bold uppercase tracking-wide text-background shadow-xl transition-transform hover:scale-[1.03] active:scale-95"
      >
        {isOpen ? <X size={21} /> : <MessageSquare size={21} />}
        {isOpen ? 'Close chat' : 'Chat with AJ'}
      </button>
    </div>
  );
};
