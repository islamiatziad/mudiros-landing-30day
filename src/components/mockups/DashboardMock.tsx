import { m } from "framer-motion";
import { TrendingUp, Wallet, Package, FileText, Sparkles } from "lucide-react";
import { cn } from "@/lib/cn";

const KPIS = [
  { icon: TrendingUp, label: "Sales today", value: "SAR 18,240", meta: "+14% vs last week", accent: true },
  { icon: Wallet, label: "Cash position", value: "SAR 96,500", meta: "Updated 2 min ago" },
  { icon: Package, label: "Low stock items", value: "4", meta: "Reorder suggested" },
  { icon: FileText, label: "Overdue invoices", value: "3", meta: "SAR 12,400 total" },
];

/**
 * Stylized MudirOS dashboard. Pure markup — crisp at any size, zero image weight.
 * Decorative: the surrounding copy carries the meaning.
 */
export default function DashboardMock({ wide = false, className }: { wide?: boolean; className?: string }) {
  return (
    <div aria-hidden="true" className={cn("relative", className)}>
      <div className="absolute -inset-8 rounded-[2rem] bg-accent-soft blur-3xl" />

      <div className="card relative overflow-hidden rounded-[var(--radius-panel)] p-0 shadow-[var(--shadow-panel)]">
        {/* Chrome */}
        <div className="flex items-center justify-between border-b border-border px-5 py-3">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
            <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
            <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
          </div>
          <span className="text-xs text-muted">MudirOS — Overview</span>
          <span className="flex items-center gap-1.5 text-xs text-secondary">
            <m.span
              className="h-1.5 w-1.5 rounded-full bg-accent"
              animate={{ opacity: [1, 0.35, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            Live
          </span>
        </div>

        {/* KPI grid */}
        <div className={cn("grid gap-3 p-5", wide ? "sm:grid-cols-4" : "sm:grid-cols-2")}>
          {KPIS.map((k) => (
            <div key={k.label} className="rounded-xl border border-border bg-background/60 p-4">
              <div className="flex items-center gap-2 text-muted">
                <k.icon size={14} />
                <span className="text-xs">{k.label}</span>
              </div>
              <p className="mt-2 font-display text-xl font-semibold text-primary">{k.value}</p>
              <p className={cn("mt-1 text-xs", k.accent ? "text-accent" : "text-muted")}>{k.meta}</p>
            </div>
          ))}
        </div>

        {/* AI insight strip */}
        <div className="mx-5 mb-5 flex items-start gap-3 rounded-xl border border-accent/25 bg-accent-soft px-4 py-3.5">
          <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-accent/20">
            <Sparkles size={14} className="text-accent" />
          </span>
          <div>
            <p className="text-sm font-medium text-primary">Your AI Manager</p>
            <p className="mt-0.5 text-xs leading-relaxed text-secondary">
              Water bottles (500ml) will run out in 3 days at the current sales pace. Draft purchase
              order is ready for your approval.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
