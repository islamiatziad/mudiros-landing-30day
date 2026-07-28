import { useState, useRef, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Sparkles, Send } from "lucide-react";
import { useI18n } from "@/i18n/I18nContext";
import { enDemo } from "@/i18n/en";
import { arDemo } from "@/i18n/ar";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/cn";

type Msg = { role: "user" | "ai"; lines: string[]; chip?: string };

/**
 * Interactive AI demo — click a suggested question and watch the assistant
 * "think" then answer with realistic business data. Pure front-end, no backend.
 */
export default function AiDemo() {
  const { t, locale } = useI18n();
  const demo = locale === "ar" ? arDemo : enDemo;

  const [messages, setMessages] = useState<Msg[]>([]);
  const [thinking, setThinking] = useState(false);
  const [asked, setAsked] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    // Reset the conversation when language changes so lines match locale.
    setMessages([]);
    setAsked([]);
    setThinking(false);
  }, [locale]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, thinking]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const ask = (id: string, q: string) => {
    if (thinking) return;
    const answer = demo.answers[id as keyof typeof demo.answers];
    setAsked((a) => [...a, id]);
    setMessages((prev) => [...prev, { role: "user", lines: [q] }]);
    setThinking(true);
    const tid = window.setTimeout(() => {
      setThinking(false);
      setMessages((prev) => [...prev, { role: "ai", lines: [...answer.lines], chip: answer.chip }]);
    }, 1100);
    timers.current.push(tid);
  };

  const remaining = demo.prompts.filter((p) => !asked.includes(p.id));

  return (
    <div className="mx-auto max-w-2xl">
      <div className="card relative overflow-hidden rounded-[var(--radius-panel)] shadow-[var(--shadow-panel)]">
        <div className="absolute -inset-8 rounded-[2rem] bg-accent-soft blur-3xl" aria-hidden="true" />
        {/* Header */}
        <div className="relative flex items-center justify-between border-b border-border px-5 py-3">
          <span className="flex items-center gap-2 text-xs text-secondary">
            <Sparkles size={13} className="text-accent" />
            {t.ai.eyebrow}
          </span>
          <span className="flex items-center gap-1.5 text-xs text-secondary">
            <m.span
              className="h-1.5 w-1.5 rounded-full bg-accent"
              animate={{ opacity: [1, 0.35, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            Live
          </span>
        </div>

        {/* Conversation */}
        <div ref={scrollRef} className="relative max-h-[22rem] min-h-[16rem] space-y-3 overflow-y-auto p-5">
          {messages.length === 0 && (
            <p className="pt-8 text-center text-sm text-muted">{t.ai.trySubtitle}</p>
          )}
          <AnimatePresence initial={false}>
            {messages.map((msg, i) => (
              <m.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: EASE }}
                className={cn("flex", msg.role === "user" ? "justify-end" : "justify-start")}
              >
                <div
                  className={cn(
                    "max-w-[85%] rounded-2xl border px-4 py-3 text-sm leading-relaxed",
                    msg.role === "user"
                      ? "rounded-tr-sm border-border bg-background text-primary"
                      : "rounded-tl-sm border-accent/25 bg-accent-soft text-primary",
                  )}
                >
                  {msg.lines.map((line, j) => (
                    <p key={j} className={j > 0 ? "mt-1.5" : ""}>{line}</p>
                  ))}
                  {msg.chip && (
                    <span className="mt-2.5 inline-flex rounded-full bg-background/60 px-2.5 py-1 text-xs font-medium text-accent">
                      {msg.chip}
                    </span>
                  )}
                </div>
              </m.div>
            ))}
          </AnimatePresence>

          {thinking && (
            <div className="flex justify-start">
              <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-sm border border-accent/25 bg-accent-soft px-4 py-3">
                {[0, 1, 2].map((d) => (
                  <m.span
                    key={d}
                    className="h-1.5 w-1.5 rounded-full bg-accent"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1, repeat: Infinity, delay: d * 0.2 }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Suggested prompts */}
        <div className="relative border-t border-border p-4">
          <div className="flex flex-wrap gap-2">
            {remaining.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => ask(p.id, p.q)}
                disabled={thinking}
                className="rounded-full border border-border bg-surface px-3.5 py-2 text-sm text-secondary transition-colors hover:border-accent/40 hover:text-primary disabled:opacity-50"
              >
                {p.q}
              </button>
            ))}
          </div>
          {/* Decorative input (non-functional by design — prompts drive the demo) */}
          <div className="mt-3 flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2.5 text-sm text-muted">
            <span className="flex-1 truncate">{t.ai.inputPlaceholder}</span>
            <Send size={15} className="text-muted rtl-flip" />
          </div>
        </div>
      </div>
    </div>
  );
}
