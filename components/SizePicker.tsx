"use client";

import { cn } from "@/lib/cn";
import type { Size } from "@/lib/products";

/** Three-up grid of size cards; the selected one gets an ink border and a pink dot. */
export function SizePicker({
  sizes,
  value,
  onChange,
}: {
  sizes: Size[];
  value: number;
  onChange: (index: number) => void;
}) {
  return (
    <fieldset className="m-0 border-0 p-0">
      <legend className="mb-3.5 text-xs font-medium uppercase tracking-[0.2em]">Size</legend>
      <div className="grid grid-cols-3 gap-2.5">
        {sizes.map((size, i) => {
          const active = i === value;
          return (
            <button
              key={size.label}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(i)}
              className={cn(
                "relative flex h-[76px] cursor-pointer flex-col items-center justify-center gap-1 rounded-2xl border transition-colors",
                active ? "border-ink bg-surface" : "border-line bg-transparent hover:border-muted",
              )}
            >
              {active && (
                <span aria-hidden="true" className="absolute top-2.5 right-2.5 size-2 rounded-full bg-pink" />
              )}
              <span className="font-serif text-[26px] leading-none">{size.label}</span>
              <span className="text-xs text-muted">{size.serves}</span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
