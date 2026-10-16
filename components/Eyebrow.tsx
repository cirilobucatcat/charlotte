import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Small uppercase label above a heading, optionally led by a 40px rule. */
export function Eyebrow({
  children,
  line = false,
  className,
}: {
  children: ReactNode;
  line?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "flex items-center gap-3.5 text-xs font-medium uppercase tracking-[0.24em] text-muted",
        className,
      )}
    >
      {line && <span aria-hidden="true" className="inline-block h-px w-10 bg-current" />}
      {children}
    </span>
  );
}
