import { m } from "framer-motion";
import { Building2, Globe2, ShieldCheck, Clock, Lock } from "lucide-react";
import { fadeUp } from "@/lib/motion";
import { useI18n } from "@/i18n/I18nContext";
import Section from "@/layout/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Stagger from "@/components/motion/Stagger";
import IconTile from "@/components/ui/IconTile";

/**
 * Credibility section — no testimonials, no invented numbers.
 * Five true, verifiable pillars of why MudirOS is trustworthy.
 */
export default function Trust() {
  const { t } = useI18n();
  const items = [
    { icon: Building2, ...t.trust.items.sme },
    { icon: Globe2, ...t.trust.items.gcc },
    { icon: ShieldCheck, ...t.trust.items.secure },
    { icon: Clock, ...t.trust.items.trial },
    { icon: Lock, ...t.trust.items.privacy },
  ];

  return (
    <Section id="trust">
      <SectionHeading eyebrow={t.trust.eyebrow} title={t.trust.title} subtitle={t.trust.subtitle} />
      <Stagger as="ul" className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it) => (
          <m.li key={it.title} variants={fadeUp} className="card card-interactive p-6 sm:p-7">
            <IconTile icon={it.icon} />
            <h3 className="mt-4 font-display text-base font-semibold tracking-tight">{it.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-secondary">{it.text}</p>
          </m.li>
        ))}
      </Stagger>
    </Section>
  );
}
