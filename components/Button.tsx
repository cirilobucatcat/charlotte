import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "outline" | "pink";

const base =
  "inline-flex items-center justify-center gap-3 rounded-full border font-medium uppercase whitespace-nowrap transition-colors duration-250 cursor-pointer";

const variants: Record<Variant, string> = {
  // Ink pill: 48px on mobile, 56px from md up. Hover turns it rose.
  primary:
    "h-12 border-ink bg-ink px-[26px] text-xs tracking-[0.18em] text-ground hover:border-rose hover:bg-rose md:h-14 md:px-[34px] md:text-[13px] md:tracking-[0.16em]",
  // Hairline ink outline that fills on hover.
  outline:
    "h-12 border-ink bg-transparent px-6 text-xs tracking-[0.18em] text-ink hover:bg-ink hover:text-ground",
  // Pink pill for dark sections.
  pink: "h-14 border-pink bg-pink px-[34px] text-[13px] tracking-[0.16em] text-ink hover:border-on-dark hover:bg-on-dark",
};

export function buttonClasses(variant: Variant = "primary", className?: string) {
  return cn(base, variants[variant], className);
}

export function ButtonLink({
  variant = "primary",
  className,
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant }) {
  return <Link className={buttonClasses(variant, className)} {...props} />;
}

export function Button({
  variant = "primary",
  className,
  type = "button",
  ...props
}: ComponentProps<"button"> & { variant?: Variant }) {
  return <button type={type} className={buttonClasses(variant, className)} {...props} />;
}

/** 52px circular icon button with a hairline ink border (carousel arrows). */
export function IconCircleButton({ className, type = "button", ...props }: ComponentProps<"button">) {
  return (
    <button
      type={type}
      className={cn(
        "flex size-13 cursor-pointer items-center justify-center rounded-full border border-ink bg-transparent text-ink transition-colors duration-250 hover:bg-ink hover:text-ground",
        className,
      )}
      {...props}
    />
  );
}
