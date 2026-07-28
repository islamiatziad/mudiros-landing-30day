/**
 * External conversion destinations in ONE place.
 * Trial signup is handled in-page by the signup modal (no external URL).
 * Every CTA on the page reads from here, so wiring is a one-line change.
 * DEMO currently routes to WhatsApp; swap for a Calendly/TidyCal link if desired.
 */
export const LINKS = {
  demo: "https://wa.me/212661356073?text=Hello%2C%20I%27d%20like%20to%20book%20a%20MudirOS%20demo",
  whatsapp: "https://wa.me/212661356073",
} as const;
