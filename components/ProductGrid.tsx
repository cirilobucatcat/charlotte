"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { filters, matchesFilter, type FilterId, type Product } from "@/lib/products";

export type GridItem = {
  slug: string;
  category: Product["category"];
  tags: string[];
  card: ReactNode;
};

/**
 * Collection grid with working filters. Cards are rendered on the server and
 * passed in; this component only decides which ones are visible.
 */
export function ProductGrid({ heading, items }: { heading: ReactNode; items: GridItem[] }) {
  const [filter, setFilter] = useState<FilterId>("all");
  const visible = items.filter((item) => matchesFilter(filter, item));

  return (
    <>
      <div className="mb-6 flex flex-col gap-[22px] md:mb-14 md:flex-row md:flex-wrap md:items-end md:justify-between md:gap-7">
        <div className="flex items-baseline justify-between gap-4">
          {heading}
          <button
            type="button"
            onClick={() => setFilter("all")}
            className="h-11 cursor-pointer text-[11px] font-medium uppercase tracking-[0.18em] underline underline-offset-4 hover:text-rose md:hidden"
          >
            View all
          </button>
        </div>

        <div
          role="group"
          aria-label="Filter the collection"
          className="-order-1 -mx-(--gutter) flex gap-[22px] overflow-x-auto border-b border-line px-(--gutter) [scrollbar-width:none] md:order-none md:mx-0 md:flex-wrap md:gap-x-7 md:gap-y-1 md:overflow-visible md:border-0 md:px-0"
        >
          {filters.map((f) => {
            const active = f.id === filter;
            return (
              <button
                key={f.id}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(f.id)}
                className={cn(
                  "-mb-px h-11 flex-none cursor-pointer border-b text-xs font-medium uppercase tracking-[0.16em] transition-colors md:mb-0 md:text-[13px]",
                  active ? "border-ink text-ink" : "border-transparent text-muted hover:text-ink",
                  f.show === "desktop" && "hidden md:block",
                  f.show === "mobile" && "md:hidden",
                )}
              >
                {f.label}
              </button>
            );
          })}
        </div>
      </div>

      {visible.length > 0 ? (
        <div className="grid grid-cols-2 gap-x-3.5 gap-y-6 md:grid-cols-[repeat(auto-fill,minmax(270px,1fr))] md:gap-x-7 md:gap-y-14">
          {visible.map((item) => (
            <div key={item.slug}>{item.card}</div>
          ))}
        </div>
      ) : (
        <p className="border-t border-line py-10 text-center font-serif text-[28px]">
          Nothing here just yet.
        </p>
      )}
    </>
  );
}
