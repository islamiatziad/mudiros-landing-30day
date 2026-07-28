import { m } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { fadeUp, staggerParent } from "@/lib/motion";
import { useI18n } from "@/i18n/I18nContext";
import { useSignup } from "@/context/SignupContext";
import { LINKS } from "@/lib/links";
import Container from "@/layout/Container";
import Button from "@/components/ui/Button";
import Eyebrow from "@/components/ui/Eyebrow";
import DashboardMock from "@/components/mockups/DashboardMock";

export default function Hero() {
  const { t } = useI18n();
  const { open } = useSignup();

  return (
    <section className="relative overflow-hidden pt-32 pb-20 sm:pt-44 sm:pb-24 lg:pb-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[32rem] w-[52rem] -translate-x-1/2 -translate-y-1/3 rounded-full bg-accent-soft blur-[120px]"
      />
      <Container className="relative">
        <m.div initial="hidden" animate="visible" variants={staggerParent} className="mx-auto max-w-3xl text-center">
          <m.div variants={fadeUp}>
            <Eyebrow>{t.hero.eyebrow}</Eyebrow>
          </m.div>
          <m.h1 variants={fadeUp} className="mt-5 text-display-xl font-semibold leading-[1.02]">
            {t.hero.titleTop}
            <br />
            <span className="text-secondary">{t.hero.titleBottom}</span>
          </m.h1>
          <m.p variants={fadeUp} className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-secondary">
            {t.hero.subtitle}
          </m.p>
          <m.div variants={fadeUp} className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button onClick={open} size="lg" className="w-full sm:w-auto">
              {t.hero.primary}
              <ArrowRight size={17} className="rtl-flip" />
            </Button>
            <Button href={LINKS.demo} size="lg" variant="secondary" className="w-full sm:w-auto">
              {t.hero.secondary}
            </Button>
          </m.div>
          <m.p variants={fadeUp} className="mt-6 text-sm text-muted">
            {t.hero.trust}
          </m.p>
        </m.div>
        <m.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-16 max-w-4xl"
        >
          <DashboardMock wide />
        </m.div>
      </Container>
    </section>
  );
}
