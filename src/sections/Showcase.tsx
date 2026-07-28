import { useI18n } from "@/i18n/I18nContext";
import Section from "@/layout/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/motion/Reveal";
import AiDemo from "@/components/AiDemo";
import { scaleIn } from "@/lib/motion";

export default function Showcase() {
  const { t } = useI18n();
  return (
    <Section id="showcase" className="overflow-hidden">
      <SectionHeading eyebrow={t.ai.tryLabel} title={t.ai.tryTitle} subtitle={t.showcase.subtitle} />
      <Reveal variants={scaleIn} className="mt-14">
        <AiDemo />
      </Reveal>
    </Section>
  );
}
