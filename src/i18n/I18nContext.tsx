import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { en } from "./en";
import { ar } from "./ar";

export type Locale = "en" | "ar";
type Dict = typeof en;
// ar mirrors en's shape; strings differ so we widen at the boundary.

const DICTS: Record<Locale, Dict> = { en, ar: ar as unknown as Dict };
const STORAGE_KEY = "mudiros-locale";

type I18nValue = {
  locale: Locale;
  dir: "ltr" | "rtl";
  t: Dict;
  setLocale: (l: Locale) => void;
  toggle: () => void;
};

const I18nContext = createContext<I18nValue | null>(null);

function initialLocale(): Locale {
  if (typeof window === "undefined") return "en";
  const saved = window.localStorage.getItem(STORAGE_KEY) as Locale | null;
  if (saved === "en" || saved === "ar") return saved;
  // Default to Arabic for Arabic-speaking browsers, else English.
  return navigator.language?.toLowerCase().startsWith("ar") ? "ar" : "en";
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);
  const dir = locale === "ar" ? "rtl" : "ltr";

  // Reflect locale on <html> for CSS, a11y, and SEO.
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
    window.localStorage.setItem(STORAGE_KEY, locale);
  }, [locale, dir]);

  const value = useMemo<I18nValue>(
    () => ({
      locale,
      dir,
      t: DICTS[locale],
      setLocale: setLocaleState,
      toggle: () => setLocaleState((l) => (l === "en" ? "ar" : "en")),
    }),
    [locale, dir],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
