import { m } from "framer-motion";
import { Check } from "lucide-react";
import { fadeUp } from "@/lib/motion";
import { cn } from "@/lib/cn";
import { useI18n } from "@/i18n/I18nContext";
import { useSignup } from "@/context/SignupContext";
import { LINKS } from "@/lib/links";
import Section from "@/layout/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Stagger from "@/components/motion/Stagger";
import Button from "@/components/ui/Button";
import Reveal from "@/components/motion/Reveal";

export default function Pricing() {
  const { t } = useI18n();
  const { open } = useSignup();
  const p = t.pricing;
  const plans = [
    { key: "starter", price: "149", ...p.plans.starter, highlighted: false, demo: false },
    { key: "growth", price: "299", ...p.plans.growth, highlighted: true, demo: false },
    { key: "business", price: "599", ...p.plans.business, highlighted: false, demo: true },
  ];
  return (
    <Section id="pricing">
      <SectionHeading eyebrow={p.eyebrow} title={p.title} subtitle={p.subtitle} />
      <Stagger as="ul" className="mt-16 grid items-start gap-5 lg:grid-cols-3 lg:pt-6">
        {plans.map((plan) => (
          <m.li
            key={plan.key}
            variants={fadeUp}
            className={cn(
              "card relative p-7 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
              plan.highlighted
                ? "border-accent/50 bg-surface-raised shadow-[0_0_0_1px_var(--color-accent),var(--shadow-accent)] lg:-translate-y-3 lg:scale-[1.03] z-10"
                : "lg:mt-0",
            )}
          >
            {plan.highlighted && (
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-accent px-4 py-1.5 text-xs font-semibold tracking-wide text-white shadow-[var(--shadow-accent)]">
                {p.popular}
              </span>
            )}
            <h3 className="font-display text-lg font-semibold">{plan.name}</h3>
            <p className="mt-1 text-sm text-secondary">{plan.blurb}</p>
            <p className="mt-6 flex items-baseline gap-1.5">
              <span className="font-display text-4xl font-semibold">{plan.price}</span>
              <span className="text-sm text-muted">{p.perMonth}</span>
            </p>
            {plan.highlighted && <p className="mt-1 text-xs text-secondary">{p.perDay}</p>}
            <ul className="mt-7 space-y-3">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-secondary">
                  <Check size={15} className="mt-0.5 shrink-0 text-accent" />
                  {f}
                </li>
              ))}
            </ul>
            <Button
              {...(plan.demo ? { href: LINKS.demo } : { onClick: open })}
              variant={plan.highlighted ? "primary" : "secondary"}
              className="mt-8 w-full"
            >
              {plan.cta}
            </Button>
          </m.li>
        ))}
      </Stagger>
      <Reveal className="mt-10 text-center">
        <p className="text-sm text-secondary">
          {p.helper1} <span className="text-primary">{p.helperGrowth}</span> {p.helper2}
        </p>
        <p className="mt-2 text-xs text-muted">{p.vat}</p>
      </Reveal>
    </Section>
  );
}
