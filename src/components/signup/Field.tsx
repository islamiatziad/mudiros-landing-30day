import { useId } from "react";
import { cn } from "@/lib/cn";

type FieldProps = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: "text" | "email" | "tel";
  placeholder?: string;
  error?: string;
  autoFocus?: boolean;
  autoComplete?: string;
  disabled?: boolean;
};

/** Dark-premium input with label, inline validation and accessible wiring. */
export default function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  error,
  autoFocus,
  autoComplete,
  disabled,
}: FieldProps) {
  const id = useId();
  const errorId = `${id}-error`;

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-primary">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        autoFocus={autoFocus}
        autoComplete={autoComplete}
        disabled={disabled}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        className={cn(
          "mt-2 h-11 w-full rounded-[var(--radius-tile)] border bg-background px-4 text-[15px] text-primary",
          "placeholder:text-muted transition-colors duration-200 outline-none",
          "focus:border-accent focus:ring-2 focus:ring-[var(--color-accent-soft)]",
          "disabled:opacity-60",
          error ? "border-red-400/60" : "border-border hover:border-border-strong",
        )}
      />
      {error && (
        <p id={errorId} className="mt-1.5 text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
