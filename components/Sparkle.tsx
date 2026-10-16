import { cn } from "@/lib/cn";

/** The brand's four-point sparkle. Colour comes from `currentColor` (pink by default). */
export function Sparkle({ size = 18, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      className={cn("flex-none text-pink", className)}
    >
      <path
        d="M12 2 C12.8 8 16 11.2 22 12 C16 12.8 12.8 16 12 22 C11.2 16 8 12.8 2 12 C8 11.2 11.2 8 12 2 Z"
        fill="currentColor"
      />
    </svg>
  );
}
