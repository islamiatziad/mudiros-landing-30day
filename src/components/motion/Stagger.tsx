import { m } from "framer-motion";
import type { ReactNode } from "react";
import { staggerParent, viewport } from "@/lib/motion";

/**
 * Parent that staggers its motion children (children must carry variants,
 * e.g. <m.li variants={fadeUp}>). Use for card grids and lists.
 */
export default function Stagger({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "ul" | "ol";
}) {
  const Tag = m[as];
  return (
    <Tag
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={staggerParent}
      className={className}
    >
      {children}
    </Tag>
  );
}
