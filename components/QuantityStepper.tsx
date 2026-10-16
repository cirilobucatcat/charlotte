"use client";

import { cn } from "@/lib/cn";
import { MAX_QTY, MIN_QTY } from "@/lib/cart";
import { MinusIcon, PlusIcon } from "./icons";

/**
 * Hairline − n + pill. `lg` is the 60px product-page stepper; `sm` is the
 * inline bag stepper with 44×40 buttons.
 */
export function QuantityStepper({
  value,
  onChange,
  label,
  size = "lg",
}: {
  value: number;
  onChange: (next: number) => void;
  label: string;
  size?: "lg" | "sm";
}) {
  const lg = size === "lg";
  const buttonClass = cn(
    "flex cursor-pointer items-center justify-center text-ink disabled:cursor-not-allowed disabled:opacity-35",
    lg ? "size-11 rounded-full" : "h-10 w-11",
  );

  return (
    <div
      role="group"
      aria-label={`Quantity, ${label}`}
      className={cn("flex items-center rounded-full border border-line", lg && "h-[60px] px-1.5")}
    >
      <button
        type="button"
        aria-label={`Decrease quantity, ${label}`}
        disabled={value <= MIN_QTY}
        onClick={() => onChange(value - 1)}
        className={buttonClass}
      >
        <MinusIcon size={lg ? 16 : 14} />
      </button>
      <span aria-live="polite" className={cn("text-center", lg ? "min-w-8 text-[17px]" : "min-w-[18px] text-[15px]")}>
        {value}
      </span>
      <button
        type="button"
        aria-label={`Increase quantity, ${label}`}
        disabled={value >= MAX_QTY}
        onClick={() => onChange(value + 1)}
        className={buttonClass}
      >
        <PlusIcon size={lg ? 16 : 14} />
      </button>
    </div>
  );
}
