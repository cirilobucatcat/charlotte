"use client";

import { cn } from "@/lib/cn";

/** Hairline pill with equal options; the active one is ink-filled. */
export function SegmentedControl<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <div
      role="group"
      aria-label={label}
      className="grid auto-cols-fr grid-flow-col gap-1 rounded-full border border-line p-1"
    >
      {options.map((option) => {
        const active = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(option.value)}
            className={cn(
              "h-11 cursor-pointer rounded-full text-xs font-medium uppercase tracking-[0.16em] transition-colors",
              active ? "bg-ink text-ground" : "bg-transparent text-ink hover:bg-line/50",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
