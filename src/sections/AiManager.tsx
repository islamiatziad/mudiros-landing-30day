import { m } from "framer-motion";
import { Package, TrendingUp, FileWarning, ArrowRight } from "lucide-react";
import { fadeUp } from "@/lib/motion";
import { useI18n } from "@/i18n/I18nContext";
import Section from "@/layout/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Stagger from "@/components/motion/Stagger";
import IconTile from "@/components/ui/IconTile";

export default function AiManager() {
  const { t } = useI18n();
  const n = t.ai.notifications;
  const items = [
    { icon: Package, ...n.inventory },
    { icon: TrendingUp, ...n.revenue },
    { icon: FileWarning, ...n.invoices },
  ];
  return (
    <Section id="ai">
      <SectionHeading eyebrow={t.ai.eyebrow} title={t.ai.title} subtitle={t.ai.subtitle} />
      <Stagger as="ul" className="mx-auto mt-16 flex max-w-2xl flex-col gap-4">
        {items.map((item) => (
          <m.li key={item.title} variants={fadeUp} className="card card-interactive flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:p-6">
            <IconTile icon={item.icon} />
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline justify-between gap-3">
                <p className="font-display text-[15px] font-semibold text-primary">{item.title}</p>
                <span className="shrink-0 text-xs text-muted">{item.time}</span>
              </div>
              <p className="mt-1 text-sm leading-relaxed text-secondary">{item.text}</p>
            </div>
            <button
              type="button"
              className="group inline-flex shrink-0 items-center gap-1.5 self-start rounded-full border border-border px-4 py-2 text-sm text-primary transition-colors hover:border-border-strong hover:bg-surface-raised sm:self-center"
            >
              {item.action}
              <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5 rtl-flip" />
            </button>
          </m.li>
        ))}
      </Stagger>
    </Section>
  );
}
