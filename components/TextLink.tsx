import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

/** Uppercase label with a 1px underline that wipes away on hover. */
export function TextLink({ className, ...props }: ComponentProps<typeof Link>) {
  return (
    <Link
      className={cn(
        "link-wipe text-[13px] font-medium uppercase tracking-[0.16em] transition-colors hover:text-rose",
        className,
      )}
      {...props}
    />
  );
}
