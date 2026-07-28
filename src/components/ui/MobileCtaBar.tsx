import { useEffect, useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { EASE } from "@/lib/motion";
import { LINKS } from "@/lib/links";
import { useI18n } from "@/i18n/I18nContext";
import { useSignup } from "@/context/SignupContext";

/**
 * Mobile-only sticky CTA. Appears after the visitor scrolls past the hero,
 * so the primary action is always one thumb-tap away. Hidden on >= sm.
 */
export default function MobileCtaBar() {
  const { open } = useSignup();
  const { t } = useI18n();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <m.div
          initial={{ y: 80 }}
          animate={{ y: 0 }}
          exit={{ y: 80 }}
          transition={{ duration: 0.35, ease: EASE }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/85 px-4 pt-3 backdrop-blur-xl sm:hidden"
          style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}
        >
          <div className="flex gap-2.5">
            <button
              type="button"
              onClick={open}
              className="flex h-11 flex-1 items-center justify-center rounded-full bg-accent text-sm font-medium text-white"
            >
              {t.mobileCta.trial}
            </button>
            <a
              href={LINKS.demo}
              className="flex h-11 flex-1 items-center justify-center rounded-full border border-border bg-surface text-sm font-medium text-primary"
            >
              {t.mobileCta.demo}
            </a>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
