import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * The signature arch: a fully rounded top on a box taller than it is wide.
 * Content is anchored bottom-centre, like a cake sitting on a shelf.
 */
export function Arch({
  className,
  style,
  children,
}: {
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}) {
  return (
    <div
      className={cn("relative flex items-end justify-center overflow-hidden rounded-arch", className)}
      style={style}
    >
      {children}
    </div>
  );
}

/** Soft white disc that sits behind a hero cake. */
export function ArchGlow({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "absolute left-1/2 aspect-square -translate-x-1/2 rounded-full bg-surface opacity-22",
        className,
      )}
    />
  );
}
