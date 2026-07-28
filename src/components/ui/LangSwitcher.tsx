import { Languages } from "lucide-react";
import { useI18n } from "@/i18n/I18nContext";
import { cn } from "@/lib/cn";

/** EN / AR toggle. Shows the language you'd switch TO. */
export default function LangSwitcher({ className }: { className?: string }) {
  const { t, toggle, locale } = useI18n();
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={t.lang.label}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-border px-3 h-9 text-sm text-secondary",
        "transition-colors hover:border-border-strong hover:text-primary",
        className,
      )}
    >
      <Languages size={15} aria-hidden="true" />
      <span className={locale === "en" ? "font-[system-ui]" : ""}>{t.lang.switchTo}</span>
    </button>
  );
}
