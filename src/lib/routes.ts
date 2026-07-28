/**
 * Canonical routes for mudiros.com.
 * Production path-based URLs (React Router). One source of truth for
 * paths, nav labels, and per-page SEO.
 */
export const SITE_URL = "https://mudiros.com";

export type RouteMeta = {
  path: string;
  label: string;
  title: string;
  description: string;
};

export const ROUTES = {
  home: {
    path: "/",
    label: "Home",
    title: "MudirOS — The AI Business Manager for SMEs in Saudi Arabia & GCC",
    description:
      "MudirOS replaces scattered Excel files and WhatsApp threads with one AI Business Manager: sales, inventory, cashflow and reports in one place, watched for you.",
  },
  about: {
    path: "/about",
    label: "About",
    title: "About MudirOS — Why we built an AI Business Manager",
    description:
      "Why MudirOS exists: an Arabic-first AI Business Manager built for small and medium businesses across Saudi Arabia and the GCC.",
  },
  contact: {
    path: "/contact",
    label: "Contact",
    title: "Contact MudirOS — Talk to a human",
    description:
      "Reach MudirOS on WhatsApp or by email for support, sales, and security. A real person is on the other end.",
  },
  security: {
    path: "/security",
    label: "Security",
    title: "Security — How MudirOS protects your data",
    description:
      "How MudirOS keeps your business data safe: encryption, access controls, monitoring, and responsible disclosure.",
  },
  privacy: {
    path: "/privacy-policy",
    label: "Privacy Policy",
    title: "Privacy Policy — MudirOS",
    description:
      "How MudirOS collects, uses, and protects your data. Clear, plain-language privacy policy for our AI Business Manager.",
  },
  terms: {
    path: "/terms",
    label: "Terms of Service",
    title: "Terms of Service — MudirOS",
    description:
      "The terms governing use of MudirOS, including the 30-day free trial, monthly subscriptions, billing, and acceptable use.",
  },
  refund: {
    path: "/refund-policy",
    label: "Refund Policy",
    title: "Refund Policy — MudirOS",
    description:
      "How the MudirOS 30-day free trial, monthly billing, cancellations, and refunds work. No surprises.",
  },
  cookies: {
    path: "/cookie-policy",
    label: "Cookie Policy",
    title: "Cookie Policy — MudirOS",
    description:
      "How MudirOS uses cookies and similar technologies, and how you can manage your preferences.",
  },
} as const satisfies Record<string, RouteMeta>;

export const FOOTER_COMPANY = [ROUTES.about, ROUTES.contact, ROUTES.security];
export const FOOTER_LEGAL = [ROUTES.privacy, ROUTES.terms, ROUTES.refund, ROUTES.cookies];
