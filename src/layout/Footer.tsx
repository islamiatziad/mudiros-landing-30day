import { MessageCircle } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useI18n } from "@/i18n/I18nContext";
import Container from "./Container";
import Logo from "@/components/ui/Logo";
import { SITE } from "@/lib/site";
import { FOOTER_COMPANY, FOOTER_LEGAL } from "@/lib/routes";
import { scrollToSection } from "@/lib/scrollToSection";

const linkClass = "text-sm text-secondary transition-colors hover:text-primary text-start";

export default function Footer() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const PRODUCT = [
    { label: t.nav.problem, id: "problem" },
    { label: t.nav.features, id: "features" },
    { label: t.nav.pricing, id: "pricing" },
    { label: t.nav.faq, id: "faq" },
  ];
  // Localised labels for company/legal, keyed by route path.
  const labelFor: Record<string, string> = {
    "/about": t.footer.about, "/contact": t.footer.contact, "/security": t.footer.security,
    "/privacy-policy": t.footer.privacy, "/terms": t.footer.terms,
    "/refund-policy": t.footer.refund, "/cookie-policy": t.footer.cookies,
  };

  const goToSection = (id: string) => {
    if (pathname !== "/") { navigate("/"); scrollToSection(id); } else { scrollToSection(id); }
  };

  return (
    <footer className="border-t border-border py-14">
      <Container className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="max-w-xs">
          <Link to="/" aria-label={t.nav.home}><Logo /></Link>
          <p className="mt-4 text-sm leading-relaxed text-muted">{t.footer.tagline}</p>
          <a href={SITE.whatsapp} className="mt-5 inline-flex items-center gap-2 text-sm text-secondary transition-colors hover:text-primary">
            <MessageCircle size={15} />
            {t.footer.whatsapp}
          </a>
        </div>

        <FooterCol title={t.footer.product}>
          {PRODUCT.map((l) => (
            <li key={l.id}>
              <button type="button" onClick={() => goToSection(l.id)} className={linkClass}>{l.label}</button>
            </li>
          ))}
        </FooterCol>

        <FooterCol title={t.footer.company}>
          {FOOTER_COMPANY.map((r) => (
            <li key={r.path}><Link to={r.path} className={linkClass}>{labelFor[r.path]}</Link></li>
          ))}
        </FooterCol>

        <FooterCol title={t.footer.legal}>
          {FOOTER_LEGAL.map((r) => (
            <li key={r.path}><Link to={r.path} className={linkClass}>{labelFor[r.path]}</Link></li>
          ))}
        </FooterCol>
      </Container>

      <Container className="mt-12 flex flex-col gap-3 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted">© {new Date().getFullYear()} {SITE.name}. {t.footer.rights}</p>
        <p className="text-xs text-muted">{t.footer.madeFor}</p>
      </Container>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <nav aria-label={title}>
      <p className="text-sm font-medium text-primary">{title}</p>
      <ul className="mt-4 space-y-2.5">{children}</ul>
    </nav>
  );
}
