import { m } from "framer-motion";
import { FileSpreadsheet, MessageCircle, EyeOff, Boxes, Banknote, Layers } from "lucide-react";
import { fadeUp } from "@/lib/motion";
import { useI18n } from "@/i18n/I18nContext";
import Section from "@/layout/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Stagger from "@/components/motion/Stagger";
import Reveal from "@/components/motion/Reveal";
import IconTile from "@/components/ui/IconTile";

export default function Problem() {
  const { t } = useI18n();
  const pains = [
    { icon: FileSpreadsheet, ...t.problem.items.excel },
    { icon: MessageCircle, ...t.problem.items.whatsapp },
    { icon: EyeOff, ...t.problem.items.visibility },
    { icon: Boxes, ...t.problem.items.inventory },
    { icon: Banknote, ...t.problem.items.cashflow },
    { icon: Layers, ...t.problem.items.tools },
  ];
  return (
    <Section id="problem">
      <SectionHeading eyebrow={t.problem.eyebrow} title={t.problem.title} subtitle={t.problem.subtitle} />
      <Stagger as="ul" className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {pains.map((p) => (
          <m.li key={p.title} variants={fadeUp} className="card card-interactive p-6 sm:p-7">
            <IconTile icon={p.icon} tone="muted" />
            <h3 className="mt-4 font-display text-base font-semibold tracking-tight">{p.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-secondary">{p.text}</p>
          </m.li>
        ))}
      </Stagger>
      <Reveal className="mx-auto mt-14 max-w-xl text-center">
        <p className="font-display text-lg font-medium text-primary">{t.problem.bridgeStrong}</p>
        <p className="mt-2 text-secondary">{t.problem.bridge}</p>
      </Reveal>
    </Section>
  );
}
