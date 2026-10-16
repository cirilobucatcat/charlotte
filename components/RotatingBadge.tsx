import { useId } from "react";
import { cn } from "@/lib/cn";
import { Sparkle } from "./Sparkle";

/** 136px ink disc with "Freshly baked · Made to order" circling a pink sparkle. */
export function RotatingBadge({ className }: { className?: string }) {
  const ringId = useId();

  return (
    <div
      aria-hidden="true"
      className={cn("flex size-[136px] items-center justify-center rounded-full bg-ink", className)}
    >
      <svg
        viewBox="0 0 136 136"
        className="absolute inset-0 size-full animate-badge motion-reduce:animate-none"
        focusable="false"
      >
        <defs>
          <path id={ringId} d="M68 68 m-48 0 a48 48 0 1 1 96 0 a48 48 0 1 1 -96 0" />
        </defs>
        <text fill="#F5EEF1" fontSize="11" fontWeight="500" letterSpacing="2.6" className="font-sans">
          <textPath href={`#${ringId}`}>FRESHLY BAKED · MADE TO ORDER · </textPath>
        </text>
      </svg>
      <Sparkle size={22} />
    </div>
  );
}
