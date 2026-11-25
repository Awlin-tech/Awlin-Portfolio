import { Fragment, useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from 'react';
import {
  AlertCircle,
  Loader2,
  MessageSquare,
  RotateCcw,
  Send,
  X,
} from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

type ChatRole = 'user' | 'model';
type ChatMode = 'balanced' | 'fast';

interface ChatMessage {
  id: string;
  role: ChatRole;
  text: string;
}

const STARTER_PROMPTS = [
  'Tell me about YieldSense AI',
  "What internship and certificates has Awlin completed?",
  "What are Awlin's core technical skills?",
];

function renderInlineSegments(line: string) {
  const parts = line.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return parts.map((part, idx) => {
    if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
      return (
        <strong key={idx} className="font-semibold">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith('`') && part.endsWith('`') && part.length > 2) {
      return (
        <code
          key={idx}
          className="rounded bg-[var(--bg-primary)] px-1.5 py-0.5 font-mono text-[12px] text-[var(--accent-primary)]"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    return <Fragment key={idx}>{part}</Fragment>;
  });
}

function SafeMessageBody({ text }: { text: string }) {
  const lines = text.split('\n');
  return (
    <div className="space-y-1.5 text-sm leading-relaxed break-words">
      {lines.map((line, index) => {
        const trimmed = line.trim();
        if (!trimmed) {
          return <div key={index} className="h-1" aria-hidden="true" />;
        }
        return (
          <p key={index} className="leading-relaxed">
            {renderInlineSegments(line)}
          </p>
        );
      })}
    </div>
  );
}

export function PortfolioChatbot() {
  const prefersReducedMotion = useReducedMotion();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<ChatMode>('fast');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastFailedInput, setLastFailedInput] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const timer = window.setTimeout(() => {
      inputRef.current?.focus();
    }, 120);

    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const sendMessage = async (rawText: string, overrideHistory?: ChatMessage[]) => {
    const trimmed = rawText.trim();
    if (!trimmed || isLoading) return;

    const currentHistory = overrideHistory ?? messages;
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      role: 'user',
      text: trimmed,
    };

    setMessages([...currentHistory, userMessage]);
    setInput('');
    setError(null);
    setLastFailedInput(null);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: trimmed,
          mode,
          history: currentHistory.map((m) => ({
            role: m.role,
            text: m.text,
          })),
        }),
      });

      const rawBody = await response.text();
      let data: { reply?: string; error?: string } = {};

      if (rawBody) {
        try {
          data = JSON.parse(rawBody) as { reply?: string; error?: string };
        } catch {
          throw new Error(
            'The assistant service is temporarily unavailable or restarting. Please try again in a moment.'
          );
        }
      }

      if (!response.ok || !data.reply) {
        throw new Error(
          data.error || 'Unable to generate a response right now. Please try again.'
        );
      }

      const modelMessage: ChatMessage = {
        id: `model-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        role: 'model',
        text: data.reply,
      };

      setMessages((prev) => [...prev, modelMessage]);
    } catch (err) {
      const errorMsg =
        err instanceof Error ? err.message : 'Network error while reaching the assistant.';
      setError(errorMsg);
      setLastFailedInput(trimmed);
      setMessages(currentHistory);
      setInput(trimmed);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    void sendMessage(input);
  };

  const handleTextareaKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      void sendMessage(input);
    }
  };

  const handleReset = () => {
    if (isLoading) return;
    setMessages([]);
    setError(null);
    setLastFailedInput(null);
    inputRef.current?.focus();
  };

  return (
    <>
      {!isOpen && (
        <motion.button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Open portfolio Q&A assistant"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 18, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="fixed right-5 bottom-5 z-40 inline-flex min-h-[44px] items-center gap-2.5 whitespace-nowrap shrink-0 rounded-xl border border-[var(--border-strong)] bg-[var(--accent-primary)] px-4 py-2.5 text-sm font-semibold text-[var(--accent-on-primary)] shadow-lg transition-transform duration-200 hover:-translate-y-0.5 hover:bg-[var(--accent-primary-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-primary)]"
        >
          <MessageSquare className="h-4 w-4 shrink-0" />
          <span>Ask Assistant</span>
        </motion.button>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.section
            role="dialog"
            aria-modal="false"
            aria-labelledby="portfolio-chatbot-title"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed right-4 bottom-4 z-50 flex h-[min(600px,calc(100dvh-5rem))] w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border border-[var(--border-strong)] bg-[var(--bg-secondary)] shadow-2xl sm:right-5 sm:bottom-5 sm:w-[420px]"
          >
            {/* Header */}
            <div className="flex items-center justify-between gap-3 border-b border-[var(--border-subtle)] bg-[var(--bg-primary)] px-4 py-3">
              <div className="min-w-0">
                <h2
                  id="portfolio-chatbot-title"
                  className="font-display truncate text-sm font-bold tracking-tight text-[var(--text-primary)]"
                >
                  Ask Assistant
                </h2>
                <p className="truncate text-xs text-[var(--text-secondary)]">
                  Portfolio &amp; general Q&amp;A
                </p>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <div
                  role="group"
                  aria-label="Response mode"
                  className="flex items-center rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-secondary)] p-0.5"
                >
                  <button
                    type="button"
                    onClick={() => setMode('balanced')}
                    className={`whitespace-nowrap shrink-0 rounded-md px-2 py-1 text-[11px] font-medium transition-colors ${
                      mode === 'balanced'
                        ? 'bg-[var(--accent-primary)] font-semibold text-[var(--accent-on-primary)]'
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    Balanced
                  </button>
                  <button
                    type="button"
                    onClick={() => setMode('fast')}
                    className={`whitespace-nowrap shrink-0 rounded-md px-2 py-1 text-[11px] font-medium transition-colors ${
                      mode === 'fast'
                        ? 'bg-[var(--accent-primary)] font-semibold text-[var(--accent-on-primary)]'
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    Fast
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleReset}
                  disabled={isLoading || messages.length === 0}
                  aria-label="Reset conversation"
                  title="New conversation"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-secondary)] text-[var(--text-secondary)] transition-colors hover:border-[var(--border-hover)] hover:text-[var(--text-primary)] disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)]"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                </button>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close assistant"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-secondary)] text-[var(--text-secondary)] transition-colors hover:border-[var(--border-hover)] hover:text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)]"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Scrollable Messages Area */}
            <div className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
              {messages.length === 0 ? (
                <div className="space-y-4">
                  <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4">
                    <p className="font-display text-sm font-semibold text-[var(--text-primary)]">
                      Hi! Ask me anything.
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-[var(--text-secondary)]">
                      You can ask about Awlin Sajan&apos;s education, Java Full Stack internship,
                      YieldSense AI project, certificates, technical skills, or any general computer
                      science and technology question.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs font-medium text-[var(--text-secondary)]">
                      Suggested questions
                    </p>
                    <div className="flex flex-col gap-2">
                      {STARTER_PROMPTS.map((prompt) => (
                        <button
                          key={prompt}
                          type="button"
                          onClick={() => void sendMessage(prompt)}
                          className="min-h-[40px] rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-primary)] px-3.5 py-2 text-left text-xs font-medium text-[var(--text-primary)] transition-colors hover:border-[var(--border-hover)] hover:text-[var(--accent-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)]"
                        >
                          {prompt}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                messages.map((message) => {
                  const isUser = message.role === 'user';
                  return (
                    <div
                      key={message.id}
                      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl px-4 py-2.5 ${
                          isUser
                            ? 'bg-[var(--accent-primary)] text-[var(--accent-on-primary)]'
                            : 'border border-[var(--border-subtle)] bg-[var(--bg-card)] text-[var(--text-primary)]'
                        }`}
                      >
                        <SafeMessageBody text={message.text} />
                      </div>
                    </div>
                  );
                })
              )}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="inline-flex items-center gap-2 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] px-4 py-2.5 text-xs font-medium text-[var(--text-secondary)]">
                    <Loader2 className="h-3.5 w-3.5 animate-spin text-[var(--accent-primary)]" />
                    <span>Thinking...</span>
                  </div>
                </div>
              )}

              {error && (
                <div
                  role="alert"
                  className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-700 dark:text-red-300"
                >
                  <div className="flex items-start gap-2">
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                    <div className="min-w-0 flex-1 space-y-2">
                      <p className="leading-relaxed">{error}</p>
                      {lastFailedInput && (
                        <button
                          type="button"
                          onClick={() => void sendMessage(lastFailedInput)}
                          className="font-semibold underline underline-offset-2 hover:opacity-80"
                        >
                          Retry message
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Composer */}
            <form
              onSubmit={handleSubmit}
              className="border-t border-[var(--border-subtle)] bg-[var(--bg-primary)] p-3"
            >
              <div className="flex items-end gap-2">
                <label htmlFor="portfolio-chat-input" className="sr-only">
                  Ask a question
                </label>
                <textarea
                  ref={inputRef}
                  id="portfolio-chat-input"
                  rows={1}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleTextareaKeyDown}
                  placeholder="Ask about Awlin or any topic..."
                  disabled={isLoading}
                  className="max-h-28 min-h-[44px] flex-1 resize-none rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-input)] px-3.5 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] focus:border-[var(--accent-primary)] focus:outline-none disabled:opacity-60"
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  aria-label="Send message"
                  className="inline-flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-xl bg-[var(--accent-primary)] text-[var(--accent-on-primary)] transition-colors hover:bg-[var(--accent-primary-hover)] disabled:cursor-not-allowed disabled:opacity-45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)]"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </form>
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
}
