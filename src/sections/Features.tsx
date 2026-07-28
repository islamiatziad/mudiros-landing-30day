import { m } from "framer-motion";
import { Users, Receipt, Boxes, Wallet, BarChart3, Sparkles } from "lucide-react";
import { fadeUp } from "@/lib/motion";
import { useI18n } from "@/i18n/I18nContext";
import Section from "@/layout/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Stagger from "@/components/motion/Stagger";
import IconTile from "@/components/ui/IconTile";

export default function Features() {
  const { t } = useI18n();
  const items = [
    { icon: Users, ...t.features.items.crm },
    { icon: Receipt, ...t.features.items.sales },
    { icon: Boxes, ...t.features.items.inventory },
    { icon: Wallet, ...t.features.items.finance },
    { icon: BarChart3, ...t.features.items.reports },
    { icon: Sparkles, ...t.features.items.assistant },
  ];
  return (
    <Section id="features">
      <SectionHeading eyebrow={t.features.eyebrow} title={t.features.title} subtitle={t.features.subtitle} />
      <Stagger as="ul" className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((f) => (
          <m.li key={f.title} variants={fadeUp} className="card card-interactive p-6 sm:p-7">
            <IconTile icon={f.icon} />
            <h3 className="mt-4 font-display text-base font-semibold tracking-tight">{f.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-secondary">{f.text}</p>
          </m.li>
        ))}
      </Stagger>
    </Section>
  );
}
