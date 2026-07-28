import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import Container from "./Container";

export default function Section({
  id,
  size = "default",
  className,
  children,
}: {
  id?: string;
  size?: "narrow" | "default";
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={cn("py-section", className)}>
      <Container size={size}>{children}</Container>
    </section>
  );
}
