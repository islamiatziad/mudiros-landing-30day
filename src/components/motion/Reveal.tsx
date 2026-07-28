import { m, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { fadeUp, viewport } from "@/lib/motion";

type RevealProps = {
  children: ReactNode;
  variants?: Variants;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "header" | "ul" | "li";
};

/**
 * Scroll reveal wrapper. Animates once when entering the viewport.
 * Reduced motion is handled globally by <MotionConfig reducedMotion="user">.
 */
export default function Reveal({
  children,
  variants = fadeUp,
  delay = 0,
  className,
  as = "div",
}: RevealProps) {
  const Tag = m[as];
  return (
    <Tag
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={variants}
      transition={delay ? { delay } : undefined}
      className={className}
    >
      {children}
    </Tag>
  );
}
