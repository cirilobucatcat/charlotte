"use client";

import { cn } from "@/lib/cn";

/** Pill chips; the selected sponge is ink-filled. */
export function SpongePicker({
  options,
  value,
  onChange,
}: {
  options: readonly string[];
  value: string;
  onChange: (sponge: string) => void;
}) {
  return (
    <fieldset className="m-0 border-0 p-0">
      <legend className="mb-3.5 text-xs font-medium uppercase tracking-[0.2em]">Sponge</legend>
      <div className="flex flex-wrap gap-2.5">
        {options.map((option) => {
          const active = option === value;
          return (
            <button
              key={option}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(option)}
              className={cn(
                "h-11 cursor-pointer rounded-full border px-5 text-sm transition-colors",
                active ? "border-ink bg-ink text-ground" : "border-line bg-transparent text-ink hover:border-muted",
              )}
            >
              {option}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
