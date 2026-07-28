import { useMemo } from "react";
import LegalLayout from "./LegalLayout";
import LegalContent, { setLinkLabels } from "./LegalContent";
import { useI18n } from "@/i18n/I18nContext";
import { legalEn } from "@/i18n/legalEn";
import { legalAr } from "@/i18n/legalAr";
import type { LegalPage } from "@/i18n/legalEn";
import type { RouteMeta } from "@/lib/routes";

/**
 * Renders a legal page from structured i18n data, switching EN/AR with the
 * global locale. SEO (title/description/canonical) still comes from `route`.
 */
export default function LegalPageView({ pageKey, route }: { pageKey: string; route: RouteMeta }) {
  const { locale, t } = useI18n();

  const page: LegalPage = useMemo(() => {
    const ar = legalAr[pageKey];
    return locale === "ar" && ar ? ar : legalEn[pageKey];
  }, [locale, pageKey]);

  // Localized labels for {token} links inside the copy.
  setLinkLabels(t.legalLinks as Record<string, string>);

  return (
    <LegalLayout route={route} eyebrow={page.eyebrow} title={page.title} intro={page.intro} updated={page.updated}>
      <LegalContent page={page} />
    </LegalLayout>
  );
}
