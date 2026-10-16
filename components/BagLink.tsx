"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart";
import { pluralize } from "@/lib/format";
import { BagIcon } from "./icons";

/** Header bag link: "Bag (n)" on desktop, an icon with a pink count bubble on mobile. */
export function BagLink() {
  const { count } = useCart();
  const label = `Bag, ${pluralize(count, "item", "items")}`;

  return (
    <>
      <Link
        href="/bag"
        aria-label={label}
        className="hidden h-11 items-center gap-2 pr-1 pl-2.5 text-[13px] font-medium uppercase tracking-[0.16em] transition-colors hover:text-rose md:flex"
      >
        <BagIcon />
        <span>Bag ({count})</span>
      </Link>
      <Link href="/bag" aria-label={label} className="relative flex size-11 items-center justify-center md:hidden">
        <BagIcon size={22} />
        <span
          aria-hidden="true"
          className="absolute top-1.5 right-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-pink px-1 text-[11px] font-semibold text-ink"
        >
          {count}
        </span>
      </Link>
    </>
  );
}
