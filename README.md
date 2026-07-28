# MudirOS Landing — Sprint 10 (V1)

Standalone landing module. **Completely separate from the Dashboard** — no shared
code, no imports from the app; safe to develop and deploy independently, or mount
in the main repo as the `/` route.

Stack: React 18 · Vite · TypeScript · Tailwind CSS v4 · Framer Motion · Lucide.

```bash
npm install
npm run dev
npm run build   # tsc --noEmit + vite build
```

Sections: Hero → Problem → Solution → AI Business Manager → Features →
Dashboard Showcase → Pricing (Growth highlighted) → FAQ → Final CTA → Footer.
Below-the-fold sections are lazy-loaded. Reduced motion respected globally.

## ⚠️ Before launch

1. **Set `LEAD_ENDPOINT` in `src/lib/leads.ts`.** Trial signups are captured by an
   in-page modal (no external app needed). Until this endpoint is set, the modal
   shows the success screen but **the lead is not stored anywhere**.
   Any JSON-POST form backend works (Formspree, Basin, Supabase, your own API).
2. Set the demo / WhatsApp URLs in `src/lib/links.ts`.
3. Pricing amounts (SAR 149/299/599) are placeholders — confirm.
