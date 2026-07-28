import { cn } from "@/lib/cn";

export default function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span className="grid h-7 w-7 place-items-center rounded-lg bg-accent-soft border border-accent/30">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M2.5 11V3l4.5 5 4.5-5v8" stroke="var(--color-accent)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span className="font-display text-[15px] font-semibold tracking-tight text-primary">
        Mudir<span className="text-accent">OS</span>
      </span>
    </span>
  );
}
