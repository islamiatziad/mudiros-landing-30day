import { ArrowRight, MessageCircle } from "lucide-react";
import { useI18n } from "@/i18n/I18nContext";
import { useSignup } from "@/context/SignupContext";
import Section from "@/layout/Section";
import Reveal from "@/components/motion/Reveal";
import Button from "@/components/ui/Button";
import { scaleIn } from "@/lib/motion";
import { LINKS } from "@/lib/links";
import { SITE } from "@/lib/site";

export default function FinalCta() {
  const { t } = useI18n();
  const { open } = useSignup();
  return (
    <Section id="cta">
      <Reveal variants={scaleIn} className="relative mx-auto max-w-3xl overflow-hidden rounded-3xl border border-accent/25 bg-surface px-8 py-16 text-center sm:px-16">
        <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-0 h-48 w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-soft blur-3xl" />
        <div className="relative">
          <h2 className="text-display-md font-semibold leading-[1.15]">
            {t.finalCta.title1}
            <br className="hidden sm:block" /> {t.finalCta.title2}
          </h2>
          <p className="mx-auto mt-5 max-w-md text-lg leading-relaxed text-secondary">{t.finalCta.subtitle}</p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button onClick={open} size="lg" className="w-full sm:w-auto">
              {t.finalCta.primary}
              <ArrowRight size={17} className="rtl-flip" />
            </Button>
            <Button href={LINKS.demo} size="lg" variant="secondary" className="w-full sm:w-auto">
              {t.finalCta.secondary}
            </Button>
          </div>
          <p className="mt-6 text-sm text-muted">{t.finalCta.trust}</p>
          <a href={SITE.whatsapp} className="mt-5 inline-flex items-center gap-2 text-sm text-secondary transition-colors hover:text-primary">
            <MessageCircle size={15} />
            {t.finalCta.whatsapp}
          </a>
        </div>
      </Reveal>
    </Section>
  );
}
