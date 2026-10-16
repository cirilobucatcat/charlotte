import Link from "next/link";
import { Arch } from "@/components/Arch";
import { ButtonLink } from "@/components/Button";
import { Eyebrow } from "@/components/Eyebrow";
import { HeroCarousel } from "@/components/HeroCarousel";
import { ArrowRightIcon, ArrowUpRightIcon } from "@/components/icons";
import { WeddingCake } from "@/components/illustrations/WeddingCake";
import { Marquee } from "@/components/Marquee";
import { NewsletterForm } from "@/components/NewsletterForm";
import { ProductCard } from "@/components/ProductCard";
import { ProductGrid } from "@/components/ProductGrid";
import { Sparkle } from "@/components/Sparkle";
import { TextLink } from "@/components/TextLink";
import { cn } from "@/lib/cn";
import { products } from "@/lib/products";

/*
 * Below 768px the marquee and everything after the collection take
 * `order-1`, so the mobile page runs hero → collection like the app design.
 */
export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroCarousel intro={<HeroIntro />} />
      <Marquee className="max-md:order-1" />
      <Collection />
      <Atelier />
      <Occasions />
      <Statement />
      <Newsletter />
    </div>
  );
}

function HeroIntro() {
  return (
    <div className="flex flex-col gap-3.5 md:gap-8">
      <Eyebrow line className="max-md:hidden">
        Pâtisserie · Made to order
      </Eyebrow>
      <h1 className="font-serif text-[46px] leading-[0.95] font-normal tracking-[-0.02em] md:text-[clamp(64px,8.2vw,128px)] md:leading-[0.92] md:tracking-[-0.025em]">
        Cakes for moments <em className="text-rose">worth</em> keeping.
      </h1>
      <p className="max-w-[440px] text-lg leading-[1.7] font-light text-muted max-md:hidden">
        Hand‑finished cakes and petite pâtisserie, baked to order in Charlotte’s kitchen for birthdays,
        weddings and quiet little celebrations.
      </p>
      <div className="flex flex-wrap items-center gap-7">
        <ButtonLink href="#shop" className="self-start">
          Shop the collection
        </ButtonLink>
        <TextLink href="#atelier" className="max-md:hidden">
          Book a custom cake
        </TextLink>
      </div>
    </div>
  );
}

function Collection() {
  return (
    <section id="shop" aria-labelledby="shop-heading" className="shell pt-0 pb-[72px] md:py-[120px]">
      <ProductGrid
        heading={
          <div className="flex flex-col gap-[18px]">
            <Eyebrow className="max-md:hidden">The collection</Eyebrow>
            <h2
              id="shop-heading"
              className="font-serif text-[30px] leading-none font-normal md:text-[clamp(48px,5.6vw,80px)] md:leading-[0.95] md:tracking-[-0.02em]"
            >
              Signature<span className="max-md:hidden"> </span>
              <em className="text-rose max-md:hidden">cakes</em>
            </h2>
          </div>
        }
        items={products.map((product) => ({
          slug: product.slug,
          category: product.category,
          tags: product.tags,
          card: <ProductCard product={product} />,
        }))}
      />
    </section>
  );
}

const steps = [
  {
    title: "Choose size & shape",
    body: "Round, square or tiered — for two guests or two hundred.",
  },
  {
    title: "Select flavours & finish",
    body: "Sponge, filling, buttercream and fresh flowers or fruit.",
  },
  {
    title: "Collect or have it delivered",
    body: "Boxed with care, chilled, and ready for the moment.",
  },
];

function Atelier() {
  return (
    <section
      id="atelier"
      aria-labelledby="atelier-heading"
      data-surface="dark"
      className="bg-ink text-on-dark max-md:order-1"
    >
      <div className="shell flex flex-wrap items-center gap-12 py-[72px] md:gap-[72px] md:py-[120px]">
        <div className="flex min-w-0 flex-[1_1_440px] justify-center">
          <Arch className="aspect-[4/5] w-full max-w-[480px] bg-pink">
            <WeddingCake className="mb-[6%] block h-auto w-[78%]" />
          </Arch>
        </div>

        <div className="flex min-w-0 flex-[1_1_460px] flex-col gap-7">
          <Eyebrow className="text-on-dark-muted">The atelier · Custom orders</Eyebrow>
          <h2
            id="atelier-heading"
            className="font-serif text-[clamp(48px,5.4vw,80px)] leading-[0.95] font-normal tracking-[-0.02em]"
          >
            Designed with you, <em className="text-pink">baked for you.</em>
          </h2>
          <p className="max-w-[480px] text-[17px] leading-[1.7] font-light text-on-dark-body">
            From an intimate six‑inch to a three‑tier centrepiece — tell us about your celebration and we’ll
            create something entirely its own.
          </p>
          <ol className="mt-2 flex flex-col">
            {steps.map((step, i) => (
              <li
                key={step.title}
                className="flex items-baseline gap-7 border-t border-dark-line py-[22px] last:border-b"
              >
                <span className="font-serif text-[22px] text-pink">{String(i + 1).padStart(2, "0")}</span>
                <span className="flex flex-col gap-1">
                  <strong className="text-[17px] font-medium">{step.title}</strong>
                  <span className="text-[15px] font-light text-on-dark-muted">{step.body}</span>
                </span>
              </li>
            ))}
          </ol>
          <ButtonLink href="/cakes/strawberry-charlotte" variant="pink" className="self-start">
            Start your design
            <ArrowRightIcon size={18} />
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

const occasions = [
  { name: "Birthdays", tile: "bg-pink text-ink", ring: "border-ink" },
  { name: "Weddings", tile: "border border-line bg-surface text-ink", ring: "border-ink" },
  { name: "Petits gâteaux", tile: "bg-pink-soft text-ink", ring: "border-ink" },
  { name: "Gift boxes", tile: "bg-ink text-on-dark", ring: "border-pink text-pink" },
];

function Occasions() {
  return (
    <section
      id="occasions"
      aria-labelledby="occasions-heading"
      className="shell pt-[72px] pb-16 max-md:order-1 md:pt-[120px] md:pb-24"
    >
      <div className="mb-10 flex flex-wrap items-end justify-between gap-6 md:mb-12">
        <h2
          id="occasions-heading"
          className="font-serif text-[clamp(44px,5vw,72px)] leading-[0.95] font-normal tracking-[-0.02em]"
        >
          Shop by <em className="text-rose">occasion</em>
        </h2>
        <TextLink href="#shop">View everything</TextLink>
      </div>
      <ul className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-5">
        {occasions.map((o, i) => (
          <li key={o.name}>
            <Link
              href="#shop"
              className={cn(
                "flex min-h-[300px] flex-col justify-between rounded-[28px] p-7 transition-transform duration-400 motion-safe:hover:-translate-y-1.5",
                o.tile,
              )}
            >
              <span className="text-[13px] font-medium tracking-[0.16em]">{String(i + 1).padStart(2, "0")}</span>
              <span className="flex items-end justify-between gap-3">
                <span className="font-serif text-[40px] leading-none">{o.name}</span>
                <span
                  aria-hidden="true"
                  className={cn("flex size-12 flex-none items-center justify-center rounded-full border", o.ring)}
                >
                  <ArrowUpRightIcon size={18} />
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Statement() {
  return (
    <section className="mx-auto flex max-w-[1100px] flex-col items-center gap-7 px-(--gutter) pt-10 pb-24 text-center max-md:order-1 md:pt-16 md:pb-32">
      <Sparkle size={28} />
      <p className="font-serif text-[clamp(34px,4.2vw,60px)] leading-[1.12] tracking-[-0.015em]">
        Every cake begins with a moment <em className="text-rose">worth celebrating</em> — and ends with the very
        last crumb.
      </p>
      <Eyebrow>The Charlotte kitchen</Eyebrow>
    </section>
  );
}

function Newsletter() {
  return (
    <section aria-labelledby="newsletter-heading" className="bg-pink-soft max-md:order-1">
      <div className="shell flex flex-wrap items-end justify-between gap-10 py-[72px] md:py-[88px]">
        <div className="flex flex-[1_1_400px] flex-col gap-3.5">
          <h2
            id="newsletter-heading"
            className="font-serif text-[clamp(40px,4.4vw,60px)] leading-none font-normal"
          >
            Letters from <em className="text-rose">the kitchen</em>
          </h2>
          <p className="text-base leading-[1.7] font-light text-muted">
            Seasonal menus, new flavours and first access to holiday ordering.
          </p>
        </div>
        <NewsletterForm />
      </div>
    </section>
  );
}
