import type { ReactNode } from "react";
import Navbar from "@/layout/Navbar";
import Footer from "@/layout/Footer";
import Container from "@/layout/Container";
import Reveal from "@/components/motion/Reveal";
import Seo from "@/components/Seo";
import type { RouteMeta } from "@/lib/routes";
import { SITE } from "@/lib/site";

type LegalLayoutProps = {
  route: RouteMeta; // provides SEO title, description, canonical path
  eyebrow?: string;
  title: string; // visible <h1> (can differ from SEO title)
  intro?: ReactNode;
  updated?: boolean;
  children: ReactNode;
};

/**
 * Shared shell for every trust/legal page: navbar, hero, readable content
 * column, footer. SEO (title/description/canonical) is driven by the
 * route meta passed in.
 */
export default function LegalLayout({
  route,
  eyebrow = "MudirOS",
  title,
  intro,
  updated = false,
  children,
}: LegalLayoutProps) {
  return (
    <div className="relative min-h-screen bg-background">
      <Seo title={route.title} description={route.description} path={route.path} />
      <Navbar />
      <main>
        <section className="relative overflow-hidden pt-36 pb-12 sm:pt-44 sm:pb-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-0 h-80 w-[46rem] -translate-x-1/2 -translate-y-1/3 rounded-full bg-accent-soft blur-[120px]"
          />
          <Container size="narrow" className="relative">
            <Reveal>
              <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-accent">
                {eyebrow}
              </span>
              <h1 className="mt-4 text-display-lg font-semibold leading-[1.08]">{title}</h1>
              {intro && <p className="mt-5 text-lg leading-relaxed text-secondary">{intro}</p>}
              {updated && (
                <p className="mt-6 text-sm text-muted">Last updated: {SITE.lastUpdated}</p>
              )}
            </Reveal>
          </Container>
        </section>

        <section className="pb-section">
          <Container size="narrow">
            <Reveal>
              <div className="legal-prose">{children}</div>
            </Reveal>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
}
