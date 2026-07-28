import { useId } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

type SelectProps = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: readonly string[];
  placeholder?: string;
  error?: string;
  disabled?: boolean;
};

/** Dark-premium select, visually identical to Field. */
export default function Select({
  label,
  value,
  onChange,
  options,
  placeholder = "Select…",
  error,
  disabled,
}: SelectProps) {
  const id = useId();
  const errorId = `${id}-error`;

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-primary">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className={cn(
            "mt-2 h-11 w-full appearance-none rounded-[var(--radius-tile)] border bg-background px-4 pr-10 text-[15px]",
            "transition-colors duration-200 outline-none",
            "focus:border-accent focus:ring-2 focus:ring-[var(--color-accent-soft)]",
            "disabled:opacity-60",
            value ? "text-primary" : "text-muted",
            error ? "border-red-400/60" : "border-border hover:border-border-strong",
          )}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((o) => (
            <option key={o} value={o} className="bg-surface text-primary">
              {o}
            </option>
          ))}
        </select>
        <ChevronDown
          size={16}
          aria-hidden="true"
          className="pointer-events-none absolute right-4 top-1/2 mt-1 -translate-y-1/2 text-muted"
        />
      </div>
      {error && (
        <p id={errorId} className="mt-1.5 text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
