import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import Eyebrow from "./Eyebrow";
import Reveal from "@/components/motion/Reveal";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "center" | "left";
  className?: string;
};

/** Standard section opener: eyebrow → display heading → supporting line. */
export default function SectionHeading({ eyebrow, title, subtitle, align = "center", className }: Props) {
  return (
    <Reveal className={cn(align === "center" && "text-center", "max-w-2xl", align === "center" && "mx-auto", className)}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="mt-4 text-display-lg font-semibold leading-[1.08]">{title}</h2>
      {subtitle && (
        <p className={cn("mt-5 text-lg leading-relaxed text-secondary", align === "center" && "mx-auto max-w-xl")}>
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
