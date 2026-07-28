import { lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { LazyMotion, domAnimation, MotionConfig } from "framer-motion";
import { SignupProvider } from "@/context/SignupContext";
import SignupModal from "@/components/signup/SignupModal";
import MobileCtaBar from "@/components/ui/MobileCtaBar";
import Landing from "@/pages/Landing";
import { ROUTES } from "@/lib/routes";
import Seo from "@/components/Seo";

// Legal + trust pages are lazy-loaded — off the homepage critical path.
const About = lazy(() => import("@/pages/About"));
const Contact = lazy(() => import("@/pages/Contact"));
const Security = lazy(() => import("@/pages/Security"));
const Privacy = lazy(() => import("@/pages/legal/Privacy"));
const Terms = lazy(() => import("@/pages/legal/Terms"));
const Refund = lazy(() => import("@/pages/legal/Refund"));
const Cookies = lazy(() => import("@/pages/legal/Cookies"));

/** Scroll to top on every route change (except in-page hash anchors). */
function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) window.scrollTo({ top: 0 });
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <SignupProvider>
          <ScrollToTop />
          <Suspense fallback={<div className="min-h-screen bg-background" />}>
            <Routes>
              <Route path={ROUTES.home.path} element={<Landing />} />
              <Route path={ROUTES.about.path} element={<About />} />
              <Route path={ROUTES.contact.path} element={<Contact />} />
              <Route path={ROUTES.security.path} element={<Security />} />
              <Route path={ROUTES.privacy.path} element={<Privacy />} />
              <Route path={ROUTES.terms.path} element={<Terms />} />
              <Route path={ROUTES.refund.path} element={<Refund />} />
              <Route path={ROUTES.cookies.path} element={<Cookies />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
          <MobileCtaBar />
          <SignupModal />
        </SignupProvider>
      </MotionConfig>
    </LazyMotion>
  );
}

/** Minimal 404 that keeps branding and routes home. */
function NotFound() {
  return (
    <div className="grid min-h-screen place-items-center bg-background px-6 text-center">
      <Seo
        title="Page not found — MudirOS"
        description="The page you were looking for doesn't exist."
        path="/404"
      />
      <div>
        <p className="font-display text-6xl font-semibold text-primary">404</p>
        <p className="mt-4 text-lg text-secondary">This page doesn&apos;t exist.</p>
        <a
          href="/"
          className="mt-8 inline-flex h-11 items-center justify-center rounded-full bg-accent px-6 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
        >
          Back to home
        </a>
      </div>
    </div>
  );
}
