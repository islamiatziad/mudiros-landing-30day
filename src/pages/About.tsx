import { Target, Compass, ShieldCheck, Languages } from "lucide-react";
import { Link as RouterLink } from "react-router-dom";
import LegalLayout from "@/components/legal/LegalLayout";
import { Clause } from "@/components/legal/Prose";
import IconTile from "@/components/ui/IconTile";
import { ROUTES } from "@/lib/routes";
import { useI18n } from "@/i18n/I18nContext";

export default function About() {
  const { t } = useI18n();
  const a = t.pages.about;
  const values = [
    { icon: Compass, ...a.values.clarity },
    { icon: Languages, ...a.values.arabic },
    { icon: ShieldCheck, ...a.values.trust },
  ];

  return (
    <LegalLayout route={ROUTES.about} eyebrow={a.eyebrow} title={a.title} intro={a.intro}>
      <Clause title={a.whyTitle}>
        {a.why.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </Clause>

      <Clause title={a.buildingTitle}>
        <p>{a.building}</p>
      </Clause>

      <div className="mt-12 grid gap-4 sm:grid-cols-3">
        {values.map((v) => (
          <div key={v.title} className="card p-6">
            <IconTile icon={v.icon} />
            <h3 className="mt-4 font-display text-base font-semibold tracking-tight text-primary">{v.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-secondary">{v.text}</p>
          </div>
        ))}
      </div>

      <div className="mt-12">
        <Clause title={a.headedTitle}>
          <p>{a.headed}</p>
          <p className="flex items-center gap-2 pt-1">
            <Target size={16} className="text-accent" />
            <RouterLink to="/contact">{a.getInTouch}</RouterLink> {a.orStartTrial}
          </p>
        </Clause>
      </div>
    </LegalLayout>
  );
}
