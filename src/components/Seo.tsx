import { useEffect } from "react";
import { SITE_URL } from "@/lib/routes";
import { useI18n } from "@/i18n/I18nContext";

/**
 * Sets document title, meta description, and canonical URL per page.
 * Restores the previous values on unmount so SPA navigation stays clean.
 * (For crawler-critical SEO, pair with prerendering — see README.)
 */
export default function Seo({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}) {
  const { locale } = useI18n();
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;

    const descEl = ensureMeta("name", "description");
    const prevDesc = descEl.getAttribute("content");
    descEl.setAttribute("content", description);

    const canonical = ensureLink("canonical");
    const prevHref = canonical.getAttribute("href");
    canonical.setAttribute("href", `${SITE_URL}${path === "/" ? "" : path}`);

    // Keep OG/Twitter title + description in sync for shared links
    const ogTitle = ensureMeta("property", "og:title");
    const prevOgTitle = ogTitle.getAttribute("content");
    ogTitle.setAttribute("content", title);

    const ogDesc = ensureMeta("property", "og:description");
    const prevOgDesc = ogDesc.getAttribute("content");
    ogDesc.setAttribute("content", description);

    const ogUrl = ensureMeta("property", "og:url");
    const prevOgUrl = ogUrl.getAttribute("content");
    ogUrl.setAttribute("content", `${SITE_URL}${path === "/" ? "" : path}`);

    const ogLocale = ensureMeta("property", "og:locale");
    const prevOgLocale = ogLocale.getAttribute("content");
    ogLocale.setAttribute("content", locale === "ar" ? "ar_SA" : "en_US");

    return () => {
      document.title = prevTitle;
      if (prevDesc !== null) descEl.setAttribute("content", prevDesc);
      if (prevHref !== null) canonical.setAttribute("href", prevHref);
      if (prevOgTitle !== null) ogTitle.setAttribute("content", prevOgTitle);
      if (prevOgDesc !== null) ogDesc.setAttribute("content", prevOgDesc);
      if (prevOgUrl !== null) ogUrl.setAttribute("content", prevOgUrl);
      if (prevOgLocale !== null) ogLocale.setAttribute("content", prevOgLocale);
    };
  }, [title, description, path, locale]);

  return null;
}

function ensureMeta(attr: "name" | "property", value: string): HTMLMetaElement {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${value}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, value);
    document.head.appendChild(el);
  }
  return el;
}

function ensureLink(rel: string): HTMLLinkElement {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  return el;
}
