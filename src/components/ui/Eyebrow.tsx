import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export default function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-accent",
        className,
      )}
    >
      {children}
    </span>
  );
}
