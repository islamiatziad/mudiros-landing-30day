import { useEffect, useRef, useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { X, Loader2, ArrowRight, AlertCircle } from "lucide-react";
import { EASE } from "@/lib/motion";
import { submitTrialRequest, SubmitError } from "@/lib/trialRequests";
import { useSignup } from "@/context/SignupContext";
import { useI18n } from "@/i18n/I18nContext";
import Logo from "@/components/ui/Logo";
import Field from "./Field";
import Select from "./Select";

type FieldName = "fullName" | "companyName" | "email" | "companySize";
type Errors = Partial<Record<FieldName, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Sized around the ICP: SMEs with 5–100 employees. */


export default function SignupModal() {
  const { isOpen, close } = useSignup();
  const { t } = useI18n();
  const tr = t.signup;

  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [companySize, setCompanySize] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const clearError = (key: FieldName) =>
    setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev));

  // Remember what opened the modal; restore focus and reset state on close
  useEffect(() => {
    if (isOpen) {
      triggerRef.current = document.activeElement as HTMLElement;
      return;
    }
    triggerRef.current?.focus?.();
    const t = setTimeout(() => {
      setStatus("idle");
      setErrors({});
      setErrorMessage("");
      setFullName("");
      setCompanyName("");
      setEmail("");
      setPhone("");
      setCompanySize("");
    }, 250); // after the exit animation, so the user never sees it clear
    return () => clearTimeout(t);
  }, [isOpen]);

  // Move focus into the dialog on open
  useEffect(() => {
    if (!isOpen) return;
    const t = setTimeout(() => {
      panelRef.current?.querySelector<HTMLInputElement>("input")?.focus();
    }, 60);
    return () => clearTimeout(t);
  }, [isOpen]);

  // Body scroll lock
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  // Escape to close + focus trap
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;

      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'button, input, select, a[href], [tabindex]:not([tabindex="-1"])',
      );
      if (!focusables.length) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, close]);

  function validate(): boolean {
    const next: Errors = {};
    if (!fullName.trim()) next.fullName = tr.errName;
    if (!companyName.trim()) next.companyName = tr.errCompany;
    if (!email.trim()) next.email = tr.errEmail;
    else if (!EMAIL_RE.test(email.trim())) next.email = tr.errEmailInvalid;
    if (!companySize) next.companySize = tr.errSize;
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit() {
    if (status === "submitting") return;
    setErrorMessage("");
    if (!validate()) return;

    setStatus("submitting");
    try {
      await submitTrialRequest({ fullName, companyName, email, phone, companySize });
      setStatus("success");
    } catch (err) {
      setErrorMessage(
        err instanceof SubmitError
          ? err.message
          : tr.genericError,
      );
      setStatus("error");
    }
  }

  const busy = status === "submitting";

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center overflow-y-auto overscroll-contain sm:items-center sm:p-4">
          {/* Backdrop */}
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
            onClick={close}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Panel */}
          <m.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="signup-title"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="card relative z-10 max-h-[92dvh] w-full max-w-[min(28rem,100vw)] overflow-y-auto rounded-t-[var(--radius-panel)] shadow-[var(--shadow-panel)] sm:max-h-[90dvh] sm:rounded-[var(--radius-panel)]"
          >
            {/* Accent halo */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-0 h-32 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-soft blur-3xl"
            />

            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full text-muted transition-colors hover:bg-surface-raised hover:text-primary"
            >
              <X size={17} />
            </button>

            <div
              className="relative px-6 py-8 sm:px-8"
              style={{ paddingBottom: "calc(2rem + env(safe-area-inset-bottom))" }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {status === "success" ? (
                  /* ---------------- Success ---------------- */
                  <m.div
                    key="success"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    className="py-4 text-center"
                    role="status"
                    aria-live="polite"
                  >
                    {/* Green success check — ring draws, then check springs in */}
                    <span className="relative mx-auto grid h-16 w-16 place-items-center">
                      <m.span
                        initial={{ scale: 0.6, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.4, ease: EASE }}
                        className="absolute inset-0 rounded-full bg-emerald-500/12 ring-1 ring-emerald-500/30"
                      />
                      <m.svg
                        width="30"
                        height="30"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden="true"
                        className="relative"
                      >
                        <m.path
                          d="M5 12.5l4.5 4.5L19 7.5"
                          stroke="rgb(52 211 153)"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.45, delay: 0.15, ease: EASE }}
                        />
                      </m.svg>
                    </span>

                    <h2
                      id="signup-title"
                      className="mt-6 font-display text-2xl font-semibold leading-tight"
                    >
                      {tr.successTitle}
                    </h2>
                    <p className="mx-auto mt-3 max-w-xs text-[15px] leading-relaxed text-secondary">
                      {tr.successBody}
                    </p>

                    <div className="mt-7 rounded-[var(--radius-tile)] border border-border bg-background/60 px-4 py-3 text-left">
                      <p className="text-xs text-muted">{tr.reachOut}</p>
                      <p className="mt-0.5 truncate text-sm font-medium text-primary">{email}</p>
                    </div>

                    <button
                      type="button"
                      onClick={close}
                      className="mt-6 text-sm text-secondary transition-colors hover:text-primary"
                    >
                      {tr.back}
                    </button>
                  </m.div>
                ) : (
                  /* ---------------- Form ---------------- */
                  <m.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25, ease: EASE }}
                  >
                    <Logo />
                    <h2
                      id="signup-title"
                      className="mt-5 font-display text-2xl font-semibold leading-tight"
                    >
                      {tr.title}
                    </h2>
                    <p className="mt-2 text-[15px] leading-relaxed text-secondary">
                      {tr.subtitle}
                    </p>

                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        void handleSubmit();
                      }}
                      noValidate
                    >
                      <div className="mt-7 space-y-4">
                        <Field
                          label={tr.fullName}
                          value={fullName}
                          onChange={(v) => {
                            setFullName(v);
                            clearError("fullName");
                          }}
                          placeholder="Ahmed Al-Otaibi"
                          autoComplete="name"
                          error={errors.fullName}
                          disabled={busy}
                        />
                        <Field
                          label={tr.companyName}
                          value={companyName}
                          onChange={(v) => {
                            setCompanyName(v);
                            clearError("companyName");
                          }}
                          placeholder="Al-Noor Trading"
                          autoComplete="organization"
                          error={errors.companyName}
                          disabled={busy}
                        />
                        <Field
                          label={tr.email}
                          type="email"
                          value={email}
                          onChange={(v) => {
                            setEmail(v);
                            clearError("email");
                          }}
                          placeholder="you@company.com"
                          autoComplete="email"
                          error={errors.email}
                          disabled={busy}
                        />
                        <Field
                          label={tr.phone}
                          type="tel"
                          value={phone}
                          onChange={setPhone}
                          placeholder="+212 6XX XXXXXX"
                          autoComplete="tel"
                          disabled={busy}
                        />
                        <Select
                          label={tr.companySize}
                          value={companySize}
                          onChange={(v) => {
                            setCompanySize(v);
                            clearError("companySize");
                          }}
                          options={tr.sizes}
                          placeholder={tr.sizePlaceholder}
                          error={errors.companySize}
                          disabled={busy}
                        />
                      </div>

                      <m.button
                        type="submit"
                        disabled={busy}
                        whileHover={busy ? undefined : { y: -1 }}
                        whileTap={busy ? undefined : { scale: 0.98 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        className="group mt-7 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-accent text-[15px] font-medium text-white shadow-[var(--shadow-accent)] transition-colors duration-200 hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-70"
                      >
                        {busy ? (
                          <>
                            <Loader2 size={17} className="animate-spin" />
                            {tr.submitting}
                          </>
                        ) : (
                          <>
                            {tr.submit}
                            <ArrowRight
                              size={16}
                              className="transition-transform duration-200 group-hover:translate-x-0.5"
                            />
                          </>
                        )}
                      </m.button>

                      {status === "error" && errorMessage && (
                        <m.p
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          role="alert"
                          className="mt-3 flex items-start justify-center gap-2 text-center text-sm text-red-400"
                        >
                          <AlertCircle size={15} className="mt-0.5 shrink-0" />
                          {errorMessage}
                        </m.p>
                      )}

                      <p className="mt-4 text-center text-xs leading-relaxed text-muted">
                        {tr.footnote}
                      </p>
                    </form>
                  </m.div>
                )}
              </AnimatePresence>
            </div>
          </m.div>
        </div>
      )}
    </AnimatePresence>
  );
}
