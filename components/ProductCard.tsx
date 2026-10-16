import Link from "next/link";
import type { Product } from "@/lib/products";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/cn";
import { ProductMedia } from "./ProductMedia";
import { QuickAddButton } from "./AddToBag";

/**
 * Product card. Desktop: badge, 28px title with price, notes and an outline
 * "Add to bag". Mobile: compact 2-up card with a "+" button on the arch.
 */
export function ProductCard({ product, showAdd = true }: { product: Product; showAdd?: boolean }) {
  const href = `/cakes/${product.slug}`;
  const from = product.sizes[0].price;

  return (
    <article className="group flex flex-col gap-2.5 md:gap-4.5">
      <div className="relative">
        <Link
          href={href}
          aria-label={product.badge ? `${product.name}, ${product.badge}` : product.name}
          className="block"
        >
          <ProductMedia
            product={product}
            className="transition-transform duration-600 ease-lift motion-safe:group-hover:-translate-y-1.5"
          />
          {product.badge && (
            <span
              className={cn(
                "absolute bottom-3.5 left-3.5 hidden rounded-full px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] md:block",
                product.badgeTone === "dark" ? "bg-ink text-ground" : "bg-ground text-ink",
              )}
            >
              {product.badge}
            </span>
          )}
        </Link>
        {showAdd && (
          <QuickAddButton slug={product.slug} variant="icon" className="absolute right-2 bottom-2 md:hidden" />
        )}
      </div>

      <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between md:gap-3">
        <h3 className="font-serif text-[21px] leading-[1.05] font-normal md:text-[28px]">
          <Link href={href} className="transition-colors hover:text-rose">
            {product.name}
          </Link>
        </h3>
        <span className="text-sm font-medium md:text-[17px]">
          {product.sizes.length > 1 && <span className="sr-only">From </span>}
          {formatPrice(from)}
        </span>
      </div>

      <p className="-mt-2 hidden text-xs font-medium uppercase tracking-[0.14em] text-muted md:block">
        {product.notes}
      </p>

      {showAdd && (
        <div className="hidden flex-col md:flex">
          <QuickAddButton slug={product.slug} variant="outline" />
        </div>
      )}
    </article>
  );
}
