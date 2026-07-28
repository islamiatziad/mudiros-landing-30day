# MudirOS Landing — Conversion Audit & Fixes (Sprint 10.1)

Audited as: Senior SaaS Conversion Designer. Every finding below is now **implemented** — build & typecheck clean.

## Critical (were actively losing conversions)

**1. Dead CTAs at the highest-intent moment.** 🔴 Bug: Final CTA buttons rendered as `<button>` with no destination — a visitor ready to convert clicked… nothing. Navbar/Hero/Pricing CTAs looped to `#cta` (an anchor, not an action).
→ **Fixed:** created `src/lib/links.ts` — every CTA on the page (navbar, hero, all 3 pricing tiers, final CTA, footer) now reads from one constants file: `signup`, `demo`, `whatsapp`. Launch wiring is a 3-line edit, clearly marked TODO.

**2. No WhatsApp path.** In KSA/GCC, WhatsApp is the highest-trust, lowest-friction contact channel for SME owners — its absence was leaving the most natural conversion route closed.
→ **Fixed:** "Book Demo" points to a WhatsApp deep-link with a pre-filled message (swap for Calendly if preferred), plus a "Prefer WhatsApp?" line under the final CTA and a contact link in the footer.

**3. Dead footer links.** Product/Company/Legal columns all pointed to `#` — clicking them did nothing, which quietly signals "this company isn't real." Fatal for a trust-building page.
→ **Fixed:** footer reduced to real anchors + WhatsApp contact. Legal pages return when they exist — a missing link is better than a fake one.

## High impact

**4. Zero trust signals between Hero and Problem.** No proof layer at all. (Correctly, no fake testimonials or invented customer counts — but factual reassurance was available and unused.)
→ **Fixed:** quiet TrustStrip under the hero with four true, checkable claims: Arabic-first RTL · VAT-ready invoicing · data exportable anytime · works on any device.

**5. Showcase repeated the same mockup as Solution.** Scrolling past the identical panel twice reads as padding and wastes a full section.
→ **Fixed:** Showcase now demos the strongest differentiator instead — a **bilingual AI assistant conversation** (owner asks in Arabic, gets an answer with real numbers; switches to English mid-chat). New heading: "Your business speaks Arabic. So does MudirOS."

**6. AI Manager section told but didn't show proactivity.**
→ **Fixed:** timestamps on each notification (6:42 AM / 8:00 AM / 9:15 AM) + one line in the subhead: "The first alert below arrived before you woke up."

**7. Pricing decision friction.** Three plans, no guidance beyond the highlight; no VAT clarity (a real objection in KSA).
→ **Fixed:** decision helper under the grid ("Not sure? Start with Growth — change or cancel anytime during the trial") + "Prices exclude VAT." microcopy. Tier CTAs now differentiated: Starter/Growth → signup, Business → demo.

## Medium impact

**8. Missing FAQ objections.** The two questions that stall SME deals — "my team isn't technical" and "does it work on my phone" — weren't answered.
→ **Fixed:** both added (now 8 questions, ordered by objection severity).

**9. Hero risk-reversal incomplete + no audience anchor.**
→ **Fixed:** trust line now "30-day free trial · No credit card · Cancel anytime · Arabic & English"; subheadline ends with "Built for businesses with 5–100 employees" and reframes stakes as money ("before it costs you money").

**10. Problem section ended without a bridge** — chaos cards, then an abrupt jump to the solution.
→ **Fixed:** closing beat: "It's not a discipline problem. It's a tools problem. / And it has a fix." (absolves the owner — blame the tools, never the visitor — then promises relief).

**11. SEO.** Title lacked geo/audience qualifiers; no structured data.
→ **Fixed:** title now "…for SMEs in Saudi Arabia & GCC"; added SoftwareApplication JSON-LD with offer pricing.

## Verified, left as-is (deliberate)
- Single accent color and restrained motion — premium positioning depends on it; adding urgency banners/popups would cheapen it.
- No fabricated social proof. When real customer quotes exist, a testimonial section between Showcase and Pricing is the next biggest conversion lever on this page.

## ⚠️ Before launch checklist
1. Replace 3 placeholder URLs in `src/lib/links.ts` (signup, demo, WhatsApp number).
2. Confirm pricing amounts + VAT wording; confirm "VAT-ready invoicing" claim matches product reality (ZATCA e-invoicing phase wording matters in KSA).
3. Add real OG image (1200×630).
