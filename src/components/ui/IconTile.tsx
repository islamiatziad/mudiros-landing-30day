import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * Consistent icon container used across all sections.
 * tone "accent" = brand tiles (features, AI, active); "muted" = neutral (problems).
 */
export default function IconTile({
  icon: Icon,
  tone = "accent",
  className,
}: {
  icon: LucideIcon;
  tone?: "accent" | "muted";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "grid h-11 w-11 shrink-0 place-items-center rounded-[var(--radius-tile)]",
        tone === "accent" ? "bg-accent-soft text-accent" : "bg-surface-raised text-secondary",
        className,
      )}
    >
      <Icon size={18} strokeWidth={1.75} aria-hidden="true" />
    </span>
  );
}
