/** Company + contact facts referenced across legal pages. Edit here once. */
export const SITE = {
  name: "MudirOS",
  legalName: "MudirOS",
  product: "MudirOS",
  descriptor: "The AI Business Manager for SMEs in Saudi Arabia and the GCC",
  supportEmail: "support@mudiros.com",
  privacyEmail: "support@mudiros.com",
  legalEmail: "support@mudiros.com",
  securityEmail: "support@mudiros.com",
  whatsapp: "https://wa.me/212661356073",
  whatsappDisplay: "+212 661 356073",
  jurisdiction: "the Kingdom of Saudi Arabia",
  governingLaw: "the laws of the Kingdom of Saudi Arabia",
  trialDays: 30,
  // Keep this in sync with real releases; shown on every legal page.
  lastUpdated: "February 2026",
} as const;

/** Legal / trust routes — used by the footer and the router. */
export const LEGAL_ROUTES = [
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
  { to: "/security", label: "Security" },
  { to: "/privacy", label: "Privacy Policy" },
  { to: "/terms", label: "Terms of Service" },
  { to: "/refund", label: "Refund Policy" },
  { to: "/cookies", label: "Cookie Policy" },
] as const;
