import { Mail, MessageCircle, LifeBuoy, ShieldCheck, Clock } from "lucide-react";
import LegalLayout from "@/components/legal/LegalLayout";
import { ROUTES } from "@/lib/routes";
import IconTile from "@/components/ui/IconTile";
import { useSignup } from "@/context/SignupContext";
import { useI18n } from "@/i18n/I18nContext";
import { SITE } from "@/lib/site";

export default function Contact() {
  const { open } = useSignup();
  const { t } = useI18n();
  const c = t.pages.contact;
  const channels = [
    { icon: MessageCircle, ...c.channels.whatsapp, action: { label: SITE.whatsappDisplay, href: SITE.whatsapp } },
    { icon: LifeBuoy, ...c.channels.support, action: { label: SITE.supportEmail, href: `mailto:${SITE.supportEmail}` } },
    { icon: ShieldCheck, ...c.channels.security, action: { label: SITE.securityEmail, href: `mailto:${SITE.securityEmail}` } },
  ];

  return (
    <LegalLayout route={ROUTES.contact} eyebrow={c.eyebrow} title={c.title} intro={c.intro}>
      <div className="grid gap-4 sm:grid-cols-3">
        {channels.map((ch) => (
          <div key={ch.title} className="card flex flex-col p-6">
            <IconTile icon={ch.icon} />
            <h2 className="mt-4 font-display text-base font-semibold tracking-tight text-primary">{ch.title}</h2>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-secondary">{ch.text}</p>
            <a href={ch.action.href} className="mt-4 text-sm font-medium text-accent transition-colors hover:text-accent-hover">
              {ch.action.label}
            </a>
          </div>
        ))}
      </div>

      <div className="mt-12 flex items-start gap-3 rounded-[var(--radius-card)] border border-border bg-surface p-6">
        <IconTile icon={Clock} tone="muted" />
        <div>
          <h2 className="font-display text-base font-semibold text-primary">{c.responseTitle}</h2>
          <p className="mt-1 text-sm leading-relaxed text-secondary">{c.responseText}</p>
        </div>
      </div>

      <div className="mt-12 overflow-hidden rounded-[var(--radius-panel)] border border-accent/25 bg-surface px-6 py-10 text-center sm:px-12">
        <IconTile icon={Mail} className="mx-auto" />
        <h2 className="mt-5 font-display text-xl font-semibold tracking-tight text-primary sm:text-2xl">{c.ctaTitle}</h2>
        <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-secondary">{c.ctaText}</p>
        <button
          type="button"
          onClick={open}
          className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-accent px-6 text-sm font-medium text-white shadow-[var(--shadow-accent)] transition-colors hover:bg-accent-hover"
        >
          {c.ctaButton}
        </button>
      </div>
    </LegalLayout>
  );
}
