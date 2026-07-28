# Sprint 10 — MudirOS Landing Page V1

**Status:** ✅ `tsc --noEmit && vite build` clean.
**Isolation:** Completely separate module — its own Vite project, zero imports from Dashboard code. The Dashboard was not touched. Deploy standalone, or mount in the main repo as the marketing `/` route.

## Stack
React 18 · Vite 6 · **TypeScript (strict)** · Tailwind CSS v4 · **Framer Motion** · Lucide · self-hosted Sora + Instrument Sans (MudirOS design tokens reused: #050505 / #2E6BFF / same surfaces & type scale).

## Positioning implemented
"The AI Business Manager" — the word ERP appears exactly once, in the FAQ, to reject it. Copy is pain-first (Excel_FINAL_v7.xlsx, WhatsApp-as-system, month-end surprises) and speaks to a 5–100-employee owner. Arabic & English support stated in hero footnote, AI section and FAQ.

## Sections (in order)
1. **Hero** — "Run your business. Not your spreadsheets." · Start Free Trial (primary) + Book Demo (secondary) · trust line · wide dashboard mock below.
2. **Problem** — 6 chaos cards: Excel, WhatsApp, no visibility, inventory, cashflow, disconnected tools.
3. **Solution** — "Everything connected" + dashboard mock with AI insight strip.
4. **AI Business Manager** — proactive notification stack with the three briefed examples (low inventory / +14% revenue / 3 overdue invoices), each with an action button.
5. **Features** — CRM, Sales, Inventory, Finance, Reports, AI Assistant (hover-lift cards).
6. **Dashboard Showcase** — wide mock, accent glow.
7. **Pricing** — Starter 149 / **Growth 299 (highlighted, "Most popular")** / Business 599 SAR·mo, 30-day trial. ⚠️ amounts are placeholders to confirm.
8. **FAQ** — 6 owner questions (ERP?, Arabic?, Excel import, setup time, security, trial) as accessible native `<details>`.
9. **Final CTA** — accent-framed card, both CTAs repeated.
+ Navbar (transparent → blur on scroll, mobile menu) and Footer.

## Animation
Single motion language in `src/lib/motion.ts`: one ease `[0.16,1,0.3,1]`, 0.55s, 24px travel, 0.08s stagger. Primitives `<Reveal>` / `<Stagger>` wrap `whileInView` (fire once). `MotionConfig reducedMotion="user"` disables transforms globally for reduced-motion users. Nothing flashy: fades, small rises, one scale-in per mock.

## Performance & a11y
- Lazy loading: Solution→Footer are `React.lazy` chunks (0.5–2.8 kB each); first load = react 43 kB + motion 39.5 kB + app 7 kB gzipped.
- Mockups are pure markup (zero images). Fonts self-hosted, variable, subset.
- Semantic landmarks + correct heading order, `aria-expanded` on menu, native details/summary FAQ, focus-visible ring, decorative visuals `aria-hidden`.
- SEO: full meta/OG in index.html; content renders top-down in source order.

## Deliberate decisions to review
1. English-first copy (per brief's examples). Given the Saudi-primary market, an **Arabic RTL variant should be Sprint 11** — tokens and layout were kept logical-property-friendly to ease it.
2. Prices, trial length, and user limits are product decisions marked as placeholders.
3. CTAs link to `#cta`; wiring "Start Free Trial" → signup and "Book Demo" → calendar is backend/routing work for the next sprint.
