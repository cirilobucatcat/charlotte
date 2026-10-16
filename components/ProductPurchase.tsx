"use client";

import Link from "next/link";
import { useLayoutEffect, useState, type ReactNode } from "react";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/cn";
import { formatPrice } from "@/lib/format";
import { defaultSponge, getProduct } from "@/lib/products";
import { QuantityStepper } from "./QuantityStepper";
import { SizePicker } from "./SizePicker";
import { SpongePicker } from "./SpongePicker";

const fieldLabel = "text-xs font-medium uppercase tracking-[0.2em]";
const fieldInput =
  "h-12 border-0 border-b border-ink bg-transparent p-0 text-[17px] font-light text-ink placeholder:text-muted";

/**
 * The interactive part of the buy box: live price, size and sponge pickers,
 * message and date fields, quantity and add to bag. Renders a fragment so
 * each group sits in the parent column's 32px rhythm.
 */
export function ProductPurchase({
  slug,
  heading,
  description,
}: {
  slug: string;
  heading: ReactNode;
  description: ReactNode;
}) {
  const product = getProduct(slug)!;
  const { add } = useCart();
  const [sizeIndex, setSizeIndex] = useState(0);
  const [sponge, setSponge] = useState(() => defaultSponge(product));
  const [message, setMessage] = useState("");
  const [date, setDate] = useState("");
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  // Pages stay mounted (hidden) after navigating away; drop the confirmation so it isn't stale on return.
  useLayoutEffect(() => () => setAdded(false), []);

  const size = product.sizes[sizeIndex];
  const isCake = product.category === "cakes";

  // Any change to the selection clears the "added" confirmation.
  function update<T>(setter: (value: T) => void) {
    return (value: T) => {
      setter(value);
      setAdded(false);
    };
  }

  function handleAdd() {
    add({
      slug: product.slug,
      size: size.label,
      sponge,
      message: isCake ? message : "",
      date,
      qty,
      unitPrice: size.price,
    });
    setAdded(true);
  }

  return (
    <>
      <div className="flex flex-col gap-4.5">
        {heading}
        <div className="flex items-baseline gap-3.5">
          <span className="text-[26px] font-medium">{formatPrice(size.price)}</span>
          <span className="text-sm font-light text-muted">{size.serves}</span>
        </div>
        {description}
      </div>

      {product.sizes.length > 1 && (
        <SizePicker sizes={product.sizes} value={sizeIndex} onChange={update(setSizeIndex)} />
      )}

      {product.sponges && <SpongePicker options={product.sponges} value={sponge} onChange={update(setSponge)} />}

      <div className="flex flex-wrap gap-7">
        {isCake && (
          <div className="flex flex-[1_1_220px] flex-col gap-1.5">
            <label htmlFor="cake-message" className={fieldLabel}>
              Message on the cake
            </label>
            <input
              id="cake-message"
              type="text"
              maxLength={30}
              placeholder="Happy birthday, Mia"
              value={message}
              onChange={(e) => update(setMessage)(e.target.value)}
              className={fieldInput}
            />
          </div>
        )}
        <div className="flex flex-[1_1_160px] flex-col gap-1.5">
          <label htmlFor="cake-date" className={fieldLabel}>
            Date
          </label>
          <input
            id="cake-date"
            type="date"
            value={date}
            onChange={(e) => update(setDate)(e.target.value)}
            className={fieldInput}
          />
        </div>
      </div>

      <div className="flex flex-wrap items-stretch gap-3">
        <QuantityStepper value={qty} onChange={update(setQty)} label={product.name} />
        <button
          type="button"
          onClick={handleAdd}
          className="flex h-15 flex-[1_1_240px] cursor-pointer items-center justify-between rounded-full border border-ink bg-ink px-[30px] text-[13px] font-medium uppercase tracking-[0.18em] text-ground transition-colors duration-250 hover:border-rose hover:bg-rose"
        >
          <span>Add to bag</span>
          <span className="text-[15px] tracking-[0.04em]">{formatPrice(size.price * qty)}</span>
        </button>
      </div>

      <div role="status" className={cn(added ? "-mt-3 flex items-center gap-3 text-[15px]" : "sr-only")}>
        {added && (
          <>
            <span aria-hidden="true" className="size-2 flex-none rounded-full bg-pink" />
            <span>
              Added to your bag —{" "}
              <Link href="/bag" className="underline underline-offset-4 transition-colors hover:text-rose">
                view bag
              </Link>
            </span>
          </>
        )}
      </div>
    </>
  );
}
