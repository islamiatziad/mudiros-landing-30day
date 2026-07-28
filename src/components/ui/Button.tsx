import { m } from "framer-motion";
import type { ReactNode, ComponentProps } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-accent text-white hover:bg-accent-hover shadow-[var(--shadow-accent)] hover:shadow-[0_10px_40px_-4px_rgba(46,107,255,0.5)]",
  secondary:
    "bg-surface text-primary border border-border hover:border-border-strong hover:bg-surface-raised",
  ghost: "text-secondary hover:text-primary",
};

const SIZES: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-[52px] px-8 text-base",
};

type ButtonProps = {
  variant?: Variant;
  size?: Size;
  href?: string;
  className?: string;
  children: ReactNode;
} & Omit<ComponentProps<"a"> & ComponentProps<"button">, "children" | "className">;

/**
 * MudirOS button. Renders <a> when href is given.
 * Premium feedback: subtle lift on hover (primary/secondary), spring tap,
 * token-based accent shadow. A trailing icon nudges right on hover.
 */
export default function Button({
  variant = "primary",
  size = "md",
  href,
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(
    "group inline-flex items-center justify-center gap-2 rounded-full font-medium",
    "transition-[background-color,border-color,box-shadow,color] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]",
    "select-none cursor-pointer [&_svg]:transition-transform [&_svg]:duration-200 hover:[&_svg]:translate-x-0.5",
    VARIANTS[variant],
    SIZES[size],
    className,
  );
  const Tag = href ? m.a : m.button;
  const lift = variant === "ghost" ? undefined : { y: -1 };
  return (
    <Tag
      href={href}
      whileHover={lift}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      className={classes}
      {...(props as object)}
    >
      {children}
    </Tag>
  );
}
