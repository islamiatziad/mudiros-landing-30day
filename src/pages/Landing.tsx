import { lazy, Suspense } from "react";
import Navbar from "@/layout/Navbar";
import Hero from "@/sections/Hero";
import TrustStrip from "@/sections/TrustStrip";
import Problem from "@/sections/Problem";
import Trust from "@/sections/Trust";
import Seo from "@/components/Seo";
import { ROUTES } from "@/lib/routes";

const Solution = lazy(() => import("@/sections/Solution"));
const AiManager = lazy(() => import("@/sections/AiManager"));
const Features = lazy(() => import("@/sections/Features"));
const Showcase = lazy(() => import("@/sections/Showcase"));
const Pricing = lazy(() => import("@/sections/Pricing"));
const Faq = lazy(() => import("@/sections/Faq"));
const FinalCta = lazy(() => import("@/sections/FinalCta"));
const Footer = lazy(() => import("@/layout/Footer"));

/** The marketing landing page (route "/"). */
export default function Landing() {
  return (
    <div className="relative min-h-screen bg-background">
      <Seo title={ROUTES.home.title} description={ROUTES.home.description} path={ROUTES.home.path} />
      <Navbar />
      <main>
        <Hero />
        <TrustStrip />
        <Problem />
        <Trust />
        <Suspense fallback={null}>
          <Solution />
          <AiManager />
          <Features />
          <Showcase />
          <Pricing />
          <Faq />
          <FinalCta />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
}
