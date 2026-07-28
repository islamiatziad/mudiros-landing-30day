import { m } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { fadeUp } from "@/lib/motion";
import { useI18n } from "@/i18n/I18nContext";
import { SITE } from "@/lib/site";
import Section from "@/layout/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Stagger from "@/components/motion/Stagger";
import Reveal from "@/components/motion/Reveal";

export default function Faq() {
  const { t } = useI18n();
  return (
    <Section id="faq" size="narrow">
      <SectionHeading eyebrow={t.faq.eyebrow} title={t.faq.title} />
      <Stagger as="ul" className="mt-14 space-y-3">
        {t.faq.items.map((f) => (
          <m.li key={f.q} variants={fadeUp}>
            <details className="card group px-6 py-1 open:bg-surface-raised">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-display text-[15px] font-medium text-primary [&::-webkit-details-marker]:hidden">
                {f.q}
                <ChevronDown size={17} className="shrink-0 text-muted transition-transform duration-200 group-open:rotate-180" />
              </summary>
              <p className="pb-5 text-sm leading-relaxed text-secondary">{f.a}</p>
            </details>
          </m.li>
        ))}
      </Stagger>
      <Reveal className="mt-10 text-center">
        <p className="text-sm text-secondary">
          {t.faq.escape1}{" "}
          <a href={SITE.whatsapp} className="text-primary underline underline-offset-4 transition-colors hover:text-accent">
            {t.faq.escapeLink}
          </a>{" "}
          {t.faq.escape2}
        </p>
      </Reveal>
    </Section>
  );
}
