import type { Variants, Transition, Easing } from "framer-motion";

/**
 * MudirOS motion language for Framer Motion.
 * One ease, short durations, small distances — subtle and fast.
 */
export const EASE: Easing = [0.16, 1, 0.3, 1];

export const transition: Transition = { duration: 0.5, ease: EASE };

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition },
};

export const fade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: { opacity: 1, scale: 1, transition },
};

/** Parent container that staggers its children's variants. */
export const staggerParent: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.04 } },
};

/** Shared whileInView viewport config: trigger once, slightly before fully visible. */
export const viewport = { once: true, amount: 0.2, margin: "0px 0px -10% 0px" } as const;
