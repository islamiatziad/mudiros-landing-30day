import type { ReactNode } from "react";

/** A titled section with an anchor id for deep-linking. */
export function Clause({
  n,
  title,
  id,
  children,
}: {
  n?: number;
  title: string;
  id?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28 border-t border-border pt-10 first:border-t-0 first:pt-0">
      <h2 className="font-display text-xl font-semibold tracking-tight text-primary sm:text-2xl">
        {n != null && <span className="mr-2 text-muted">{n}.</span>}
        {title}
      </h2>
      <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-secondary">{children}</div>
    </section>
  );
}

/** Sub-heading inside a clause. */
export function SubHeading({ children }: { children: ReactNode }) {
  return (
    <h3 className="mt-6 font-display text-base font-semibold text-primary">{children}</h3>
  );
}

/** Bulleted list with consistent styling. */
export function List({ items }: { items: ReactNode[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3">
          <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
