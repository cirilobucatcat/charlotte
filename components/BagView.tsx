"use client";

import Link from "next/link";
import { useCart, type Fulfilment, type LineItem } from "@/lib/cart";
import { formatDate, formatPrice, pluralize } from "@/lib/format";
import { getProduct } from "@/lib/products";
import { ArrowLeftIcon, ArrowRightIcon, CalendarIcon, ChevronRightIcon } from "./icons";
import { MiniCake } from "./illustrations/CardCake";
import { QuantityStepper } from "./QuantityStepper";
import { SegmentedControl } from "./SegmentedControl";

const modes: { value: Fulfilment; label: string }[] = [
  { value: "pickup", label: "Pickup" },
  { value: "delivery", label: "Delivery" },
];

function describe(item: LineItem) {
  return [item.size, item.sponge, item.message && `“${item.message}”`, item.date && formatDate(item.date)]
    .filter(Boolean)
    .join(" · ");
}

function BagLine({ item }: { item: LineItem }) {
  const { setQty, remove } = useCart();
  const product = getProduct(item.slug);
  if (!product) return null;
  const href = `/cakes/${product.slug}`;

  return (
    <li className="flex gap-4 border-t border-line py-[18px]">
      <Link
        href={href}
        tabIndex={-1}
        aria-hidden="true"
        className="flex h-[104px] w-[82px] flex-none items-end justify-center overflow-hidden rounded-arch"
        style={{ backgroundColor: product.tint }}
      >
        <MiniCake {...product.thumb} className="mb-2 h-auto w-[66px]" />
      </Link>
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div className="flex items-baseline justify-between gap-2">
          <h2 className="font-serif text-[22px] leading-[1.05] font-normal">
            <Link href={href} className="transition-colors hover:text-rose">
              {product.name}
            </Link>
          </h2>
          <span className="text-[15px] font-medium">{formatPrice(item.unitPrice * item.qty)}</span>
        </div>
        <p className="text-[13px] leading-normal font-light text-muted">{describe(item)}</p>
        <div className="mt-1.5 flex items-center justify-between gap-3">
          <QuantityStepper size="sm" value={item.qty} onChange={(qty) => setQty(item.id, qty)} label={product.name} />
          <button
            type="button"
            onClick={() => remove(item.id)}
            className="h-11 cursor-pointer text-[11px] font-medium uppercase tracking-[0.16em] text-muted underline underline-offset-4 transition-colors hover:text-rose"
          >
            Remove<span className="sr-only"> {product.name}</span>
          </button>
        </div>
      </div>
    </li>
  );
}

/** The bag, built from the mobile reference; on desktop the summary becomes a right-hand card. */
export function BagView() {
  const { items, mode, setMode, count, subtotal, fee, total, hydrated } = useCart();
  const delivery = mode === "delivery";

  return (
    <div className="shell pt-3.5 md:pt-8 md:pb-[120px]">
      <div className="grid grid-cols-[44px_1fr_44px] items-center">
        <Link href="/" aria-label="Back to the shop" className="flex size-11 items-center transition-colors hover:text-rose">
          <ArrowLeftIcon size={22} />
        </Link>
        <span className="text-center text-[11px] font-medium uppercase tracking-[0.22em] text-muted">
          {hydrated ? pluralize(count, "item", "items") : " "}
        </span>
      </div>

      <div className="mt-5 grid items-start gap-5 md:grid-cols-[minmax(0,1fr)_minmax(320px,400px)] md:gap-x-16 lg:gap-x-24">
        <div className="flex min-w-0 flex-col gap-5">
          <h1 className="font-serif text-[52px] leading-[0.95] font-normal tracking-[-0.02em]">
            Your <em className="text-rose">bag</em>
          </h1>

          <SegmentedControl label="Pickup or delivery" options={modes} value={mode} onChange={setMode} />

          {hydrated && items.length > 0 && (
            <ul className="flex flex-col">
              {items.map((item) => (
                <BagLine key={item.id} item={item} />
              ))}
            </ul>
          )}

          {hydrated && items.length === 0 && (
            <div className="flex flex-col items-center gap-3 border-t border-line py-6 text-center">
              <p className="font-serif text-[28px]">Your bag is empty</p>
              <Link
                href="/#shop"
                className="text-xs font-medium uppercase tracking-[0.18em] underline underline-offset-4 transition-colors hover:text-rose"
              >
                Discover the collection
              </Link>
            </div>
          )}

          <div className="flex items-center gap-3.5 border-y border-line py-[18px]">
            <CalendarIcon size={22} />
            <span className="flex flex-1 flex-col gap-0.5">
              <span className="text-[11px] font-medium uppercase tracking-[0.18em]">
                {delivery ? "Delivery slot" : "Collection time"}
              </span>
              <span className="text-sm font-light text-muted">[Choose a date &amp; time]</span>
            </span>
            <ChevronRightIcon size={16} />
          </div>
        </div>

        <aside
          aria-label="Order summary"
          className="sticky bottom-[82px] z-10 -mx-(--gutter) mt-1 flex flex-col gap-2.5 rounded-t-[28px] bg-pink px-[22px] pt-[26px] pb-7 text-ink md:top-[calc(var(--header-h)+2rem)] md:bottom-auto md:mx-0 md:mt-[72px] md:rounded-[28px] md:p-8"
        >
          <div className="flex justify-between text-[15px]">
            <span>Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between text-[15px]">
            <span>{delivery ? "Delivery" : "Collection"}</span>
            <span>{delivery ? formatPrice(fee) : "Complimentary"}</span>
          </div>
          <div className="flex items-baseline justify-between border-t border-ink/25 pt-2.5">
            <span className="text-xs font-medium uppercase tracking-[0.2em]">Total</span>
            <span className="font-serif text-[38px] leading-none">{formatPrice(total)}</span>
          </div>
          <button
            type="button"
            disabled={items.length === 0}
            className="mt-1.5 flex h-[58px] cursor-pointer items-center justify-center gap-3 rounded-full bg-ink text-[13px] font-medium uppercase tracking-[0.18em] text-ground transition-colors hover:bg-rose disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-ink"
          >
            Checkout
            <ArrowRightIcon size={18} />
          </button>
        </aside>
      </div>
    </div>
  );
}
