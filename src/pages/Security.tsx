import { Lock, KeyRound, Server, Eye, FileCheck2, Bug, UserCheck, Download } from "lucide-react";
import { Link as RouterLink } from "react-router-dom";
import LegalLayout from "@/components/legal/LegalLayout";
import { Clause } from "@/components/legal/Prose";
import IconTile from "@/components/ui/IconTile";
import { ROUTES } from "@/lib/routes";
import { useI18n } from "@/i18n/I18nContext";
import { SITE } from "@/lib/site";

export default function Security() {
  const { t } = useI18n();
  const sec = t.pages.security;
  const measures = [
    { icon: Lock, ...sec.measures.encryption },
    { icon: KeyRound, ...sec.measures.access },
    { icon: Server, ...sec.measures.infra },
    { icon: Eye, ...sec.measures.monitoring },
    { icon: FileCheck2, ...sec.measures.ownership },
    { icon: UserCheck, ...sec.measures.privilege },
  ];

  return (
    <LegalLayout route={ROUTES.security} eyebrow={sec.eyebrow} title={sec.title} intro={sec.intro}>
      <div className="grid gap-4 sm:grid-cols-2">
        {measures.map((m) => (
          <div key={m.title} className="card p-6">
            <IconTile icon={m.icon} />
            <h2 className="mt-4 font-display text-base font-semibold tracking-tight text-primary">{m.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-secondary">{m.text}</p>
          </div>
        ))}
      </div>

      <div className="mt-14">
        <Clause title={sec.dataTitle}>
          <p>{sec.dataText}</p>
        </Clause>

        <Clause title={sec.reliabilityTitle}>
          <p>{sec.reliabilityText}</p>
        </Clause>

        <Clause title={sec.disclosureTitle}>
          <p>{sec.disclosureText}</p>
          <p className="flex items-center gap-2 pt-1">
            <Bug size={16} className="text-accent" />
            {sec.reportLabel}{" "}
            <a href={`mailto:${SITE.securityEmail}`}>{SITE.securityEmail}</a>
          </p>
        </Clause>

        <Clause title={sec.roleTitle}>
          <p>{sec.roleText}</p>
          <p className="flex items-center gap-2 pt-1">
            <Download size={16} className="text-accent" />
            <RouterLink to="/privacy-policy">{sec.exportNote}</RouterLink>
          </p>
        </Clause>
      </div>
    </LegalLayout>
  );
}
