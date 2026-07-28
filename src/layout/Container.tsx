import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

const SIZES = {
  narrow: "max-w-3xl",
  default: "max-w-7xl",
} as const;

export default function Container({
  size = "default",
  className,
  children,
}: {
  size?: keyof typeof SIZES;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full px-5 sm:px-8 lg:px-12", SIZES[size], className)}>
      {children}
    </div>
  );
}
