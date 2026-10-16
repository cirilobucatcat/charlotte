"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/cn";
import { defaultSponge, getProduct } from "@/lib/products";
import { buttonClasses } from "./Button";
import { CheckIcon, PlusIcon } from "./icons";

/**
 * Quick add from a product card: adds one of the default size and sponge.
 * `outline` is the desktop pill; `icon` is the 44px "+" on mobile cards.
 */
export function QuickAddButton({
  slug,
  variant,
  className,
}: {
  slug: string;
  variant: "outline" | "icon";
  className?: string;
}) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  // Pages stay mounted but hidden (<Activity>), so reset on hide as well as unmount.
  useLayoutEffect(
    () => () => {
      window.clearTimeout(timer.current);
      setAdded(false);
    },
    [],
  );

  const product = getProduct(slug);
  if (!product) return null;

  function handleClick() {
    if (!product) return;
    add({
      slug: product.slug,
      size: product.sizes[0].label,
      sponge: defaultSponge(product),
      message: "",
      date: "",
      qty: 1,
      unitPrice: product.sizes[0].price,
    });
    setAdded(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setAdded(false), 1600);
  }

  if (variant === "icon") {
    return (
      <button
        type="button"
        onClick={handleClick}
        aria-label={added ? `${product.name} added to bag` : `Add ${product.name} to bag`}
        className={cn(
          "flex size-11 cursor-pointer items-center justify-center rounded-full bg-ink text-ground",
          className,
        )}
      >
        {added ? <CheckIcon size={18} /> : <PlusIcon size={18} />}
      </button>
    );
  }

  return (
    <button type="button" onClick={handleClick} className={buttonClasses("outline", className)}>
      <span aria-live="polite">{added ? "Added to bag" : "Add to bag"}</span>
    </button>
  );
}
