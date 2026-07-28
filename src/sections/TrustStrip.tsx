import { Languages, ShieldCheck, FileCheck2, Smartphone } from "lucide-react";
import { useI18n } from "@/i18n/I18nContext";
import Container from "@/layout/Container";
import Reveal from "@/components/motion/Reveal";

export default function TrustStrip() {
  const { t } = useI18n();
  const items = [
    { icon: Languages, text: t.trust.items.gcc.title },
    { icon: FileCheck2, text: t.trust.items.trial.title },
    { icon: ShieldCheck, text: t.trust.items.secure.title },
    { icon: Smartphone, text: t.trust.items.privacy.title },
  ];
  return (
    <div className="border-y border-border bg-surface/40">
      <Container>
        <Reveal as="ul" className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 py-6">
          {items.map((i) => (
            <li key={i.text} className="flex items-center gap-2.5 text-sm text-secondary whitespace-nowrap">
              <i.icon size={15} className="shrink-0 text-muted" />
              {i.text}
            </li>
          ))}
        </Reveal>
      </Container>
    </div>
  );
}
