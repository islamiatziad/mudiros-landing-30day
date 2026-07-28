import { Receipt, Boxes, Wallet, BarChart3, ArrowRight } from "lucide-react";
import { useI18n } from "@/i18n/I18nContext";
import Section from "@/layout/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/motion/Reveal";
import DashboardMock from "@/components/mockups/DashboardMock";
import { scaleIn } from "@/lib/motion";

export default function Solution() {
  const { t } = useI18n();
  const chain = [
    { icon: Receipt, label: t.solution.chain.sale },
    { icon: Boxes, label: t.solution.chain.stock },
    { icon: Wallet, label: t.solution.chain.cash },
    { icon: BarChart3, label: t.solution.chain.report },
  ];
  return (
    <Section id="solution">
      <SectionHeading eyebrow={t.solution.eyebrow} title={t.solution.title} subtitle={t.solution.subtitle} />
      <Reveal className="mx-auto mt-10 flex max-w-3xl flex-wrap items-center justify-center gap-x-3 gap-y-3">
        {chain.map((step, i) => (
          <span key={step.label} className="flex items-center gap-3">
            <span className="flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm text-primary">
              <step.icon size={14} className="text-accent" />
              {step.label}
            </span>
            {i < chain.length - 1 && <ArrowRight size={14} aria-hidden="true" className="text-muted rtl-flip" />}
          </span>
        ))}
      </Reveal>
      <Reveal variants={scaleIn} className="mx-auto mt-14 max-w-4xl">
        <DashboardMock wide />
      </Reveal>
    </Section>
  );
}
