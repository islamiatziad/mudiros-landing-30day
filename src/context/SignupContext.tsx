import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";

type SignupContextValue = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

const SignupContext = createContext<SignupContextValue | null>(null);

/** Provides the trial-signup modal state to every CTA on the page. */
export function SignupProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo(() => ({ isOpen, open, close }), [isOpen, open, close]);

  return <SignupContext.Provider value={value}>{children}</SignupContext.Provider>;
}

export function useSignup() {
  const ctx = useContext(SignupContext);
  if (!ctx) throw new Error("useSignup must be used within <SignupProvider>");
  return ctx;
}
