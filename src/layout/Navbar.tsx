import { useEffect, useState } from "react";
import { m } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/cn";
import { useI18n } from "@/i18n/I18nContext";
import { useSignup } from "@/context/SignupContext";
import { scrollToSection } from "@/lib/scrollToSection";
import Button from "@/components/ui/Button";
import Logo from "@/components/ui/Logo";
import LangSwitcher from "@/components/ui/LangSwitcher";

export default function Navbar() {
  const { t } = useI18n();
  const { open: openSignup } = useSignup();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const LINKS = [
    { label: t.nav.problem, id: "problem" },
    { label: t.nav.product, id: "solution" },
    { label: t.nav.features, id: "features" },
    { label: t.nav.pricing, id: "pricing" },
    { label: t.nav.faq, id: "faq" },
  ];

  const goToSection = (id: string) => {
    if (pathname !== "/") {
      navigate("/");
      scrollToSection(id);
    } else {
      scrollToSection(id);
    }
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <m.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled || open ? "bg-background/70 backdrop-blur-xl border-b border-border" : "bg-transparent border-b border-transparent",
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">
        <a href="/" aria-label={t.nav.home} className="shrink-0" onClick={(e) => { e.preventDefault(); navigate("/"); }}>
          <Logo />
        </a>

        <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-7 md:flex">
          {LINKS.map((l) => (
            <li key={l.id}>
              <button type="button" onClick={() => goToSection(l.id)} className="text-sm text-secondary transition-colors hover:text-primary">
                {l.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2.5">
          <LangSwitcher className="hidden sm:inline-flex" />
          <Button onClick={openSignup} size="sm" className="hidden sm:inline-flex">
            {t.nav.startTrial}
          </Button>
          <button
            type="button"
            aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            className="grid h-10 w-10 place-items-center rounded-full text-secondary transition-colors hover:text-primary md:hidden"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-border bg-background/95 backdrop-blur-xl md:hidden">
          <ul className="flex flex-col px-5 py-4">
            {LINKS.map((l) => (
              <li key={l.id}>
                <button
                  type="button"
                  onClick={() => { setOpen(false); goToSection(l.id); }}
                  className="block w-full py-3 text-start text-base text-secondary transition-colors hover:text-primary"
                >
                  {l.label}
                </button>
              </li>
            ))}
            <li className="flex items-center gap-3 pt-3">
              <LangSwitcher />
              <Button onClick={() => { setOpen(false); openSignup(); }} className="flex-1">
                {t.nav.startTrial}
              </Button>
            </li>
          </ul>
        </div>
      )}
    </m.header>
  );
}
