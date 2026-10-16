"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { formatPrice } from "@/lib/format";
import { getProduct, heroSlides } from "@/lib/products";
import { ArchGlow } from "./Arch";
import { IconCircleButton } from "./Button";
import { ArrowLeftIcon, ArrowRightIcon } from "./icons";
import { HeroCake } from "./illustrations/HeroCake";
import { RotatingBadge } from "./RotatingBadge";

const slides = heroSlides.map((slide, i) => {
  const product = getProduct(slide.slug)!;
  return {
    ...slide,
    num: String(i + 1).padStart(2, "0"),
    name: product.name,
    price: product.sizes[0].price,
    colors: product.hero!,
  };
});

const total = String(slides.length).padStart(2, "0");

/**
 * Home hero. The intro copy is rendered on the server and passed in; this
 * component owns the slide state, caption, arrows and the arch panel.
 * Below 768px it becomes the mobile arch card followed by the headline.
 */
export function HeroCarousel({ intro }: { intro: ReactNode }) {
  const [index, setIndex] = useState(0);
  const slide = slides[index];
  const step = (delta: number) => setIndex((i) => (i + delta + slides.length) % slides.length);

  return (
    <section
      id="top"
      className="shell flex flex-wrap items-stretch gap-[22px] pt-2 pb-[26px] md:gap-16 md:pt-16 md:pb-28"
    >
      <div className="order-2 flex min-w-0 flex-[1_1_520px] flex-col justify-between gap-14 md:order-none">
        {intro}

        <div className="hidden flex-wrap items-end justify-between gap-6 border-t border-line pt-6 md:flex">
          <div aria-live="polite" aria-atomic="true" className="flex items-baseline gap-[18px]">
            <span className="font-serif text-5xl leading-none">{slide.num}</span>
            <span className="text-sm text-muted">/ {total}</span>
            <span className="ml-3 flex flex-col gap-0.5">
              <span className="font-serif text-[22px]">{slide.name}</span>
              <span className="text-[13px] text-muted">
                {slide.notes} — from {formatPrice(slide.price)}
              </span>
            </span>
          </div>
          <div className="flex gap-2.5">
            <IconCircleButton aria-label="Previous cake" onClick={() => step(-1)}>
              <ArrowLeftIcon />
            </IconCircleButton>
            <IconCircleButton aria-label="Next cake" onClick={() => step(1)}>
              <ArrowRightIcon />
            </IconCircleButton>
          </div>
        </div>
      </div>

      <div className="relative order-1 flex h-[300px] min-w-0 flex-[1_1_460px] md:order-none md:h-auto md:min-h-[640px]">
        <Link
          href={`/cakes/${slide.slug}`}
          aria-label={`View ${slide.name}`}
          className="relative flex flex-1 items-end justify-center overflow-hidden rounded-arch transition-[background-color] duration-500"
          style={{ backgroundColor: slide.panel }}
        >
          <ArchGlow className="top-[18%] w-[64%] md:top-[22%] md:w-[70%]" />
          <HeroCake colors={slide.colors} className="relative mb-[4%] block h-auto w-[66%] md:mb-[6%] md:w-[82%]" />
        </Link>

        <span className="absolute bottom-3.5 left-3.5 rounded-full bg-ground px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] md:hidden">
          New season
        </span>

        <RotatingBadge className="absolute top-2 left-2 max-md:hidden lg:top-[72px] lg:-left-11" />
      </div>
    </section>
  );
}
