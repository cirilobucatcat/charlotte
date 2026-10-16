"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/cn";
import { getProduct, type Product } from "@/lib/products";
import { ArchGlow } from "./Arch";
import { HeartIcon } from "./icons";
import { CardCake } from "./illustrations/CardCake";
import { BoxView, FrontThumb, SliceView, TopView } from "./illustrations/GalleryViews";
import { HeroCake } from "./illustrations/HeroCake";

type View = "front" | "slice" | "top" | "box";

const viewLabels: Record<View, string> = {
  front: "Front view",
  slice: "Slice",
  top: "From above",
  box: "Gift box",
};

function Thumb({ product, view }: { product: Product; view: View }) {
  const { hero, illustration } = product;
  if (view === "box") return <BoxView className="h-auto w-full" />;
  if (!hero) return <CardCake variant={illustration.variant} colors={illustration.colors} className="h-auto w-full" />;
  if (view === "slice") return <SliceView colors={hero} className="h-auto w-full" />;
  if (view === "top") return <TopView colors={hero} className="h-auto w-full" />;
  return <FrontThumb colors={hero} className="h-auto w-full" />;
}

function MainView({ product, view }: { product: Product; view: View }) {
  const { hero, illustration } = product;
  if (view === "box") return <BoxView className="mb-[12%] h-auto w-[56%]" />;
  if (hero && view === "slice") return <SliceView colors={hero} className="mb-[18%] h-auto w-[70%]" />;
  if (hero && view === "top") return <TopView colors={hero} className="mb-[16%] h-auto w-[62%]" />;
  if (product.image) {
    return <Image src={product.image} alt="" fill priority sizes="(min-width: 1100px) 560px, 90vw" className="object-cover" />;
  }
  if (hero) return <HeroCake colors={hero} className="relative mb-[6%] block h-auto w-[80%]" />;
  return (
    <CardCake
      variant={illustration.variant}
      colors={illustration.colors}
      className="relative mb-[8%] block h-auto w-[86%]"
    />
  );
}

/** Thumbnail rail (vertical on desktop, a row on mobile) and the main pink arch. */
export function ProductGallery({ slug }: { slug: string }) {
  const product = getProduct(slug)!;
  const views: View[] = product.hero ? ["front", "slice", "top", "box"] : ["front", "box"];
  const [view, setView] = useState<View>("front");
  const [saved, setSaved] = useState(false);

  return (
    <div className="flex w-full max-w-[680px] min-w-0 flex-[1_1_560px] flex-col-reverse gap-4 md:flex-row">
      <div role="group" aria-label="Views" className="grid grid-cols-4 gap-3 md:flex md:w-[84px] md:flex-none md:flex-col">
        {views.map((v) => {
          const active = v === view;
          return (
            <button
              key={v}
              type="button"
              aria-label={viewLabels[v]}
              aria-pressed={active}
              onClick={() => setView(v)}
              className={cn(
                "flex aspect-[84/104] w-full cursor-pointer justify-center overflow-hidden rounded-arch border md:aspect-auto md:h-[104px] md:w-[84px]",
                active ? "border-ink" : "border-line hover:border-muted",
                v === "front" ? "items-end px-2 pt-[18px] pb-1.5" : "items-center px-3 pt-[22px] pb-2.5",
              )}
              style={{ backgroundColor: v === "front" ? product.tint : "#FFFFFF" }}
            >
              <Thumb product={product} view={v} />
            </button>
          );
        })}
      </div>

      <div className="relative min-w-0 flex-1">
        <div className="relative flex aspect-[4/5] items-end justify-center overflow-hidden rounded-arch bg-pink">
          <ArchGlow className="top-[20%] w-[72%]" />
          <MainView product={product} view={view} />
        </div>
        <button
          type="button"
          aria-label="Save to favourites"
          aria-pressed={saved}
          onClick={() => setSaved((s) => !s)}
          className="absolute right-5 bottom-5 flex size-[52px] cursor-pointer items-center justify-center rounded-full bg-ground text-ink transition-colors hover:text-rose"
        >
          <HeartIcon size={22} fill={saved ? "currentColor" : "none"} className={cn(saved && "text-rose")} />
        </button>
      </div>
    </div>
  );
}
