import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Accordion } from "@/components/Accordion";
import { ProductCard } from "@/components/ProductCard";
import { ProductGallery } from "@/components/ProductGallery";
import { ProductPurchase } from "@/components/ProductPurchase";
import { TextLink } from "@/components/TextLink";
import { categoryLabels, getProduct, products } from "@/lib/products";

// Product pages are fully static. An unknown slug then waits for its render
// instead of streaming the App Shell, so notFound() returns a real 404.
export const ensureStatic = "navigation";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: PageProps<"/cakes/[slug]">): Promise<Metadata> {
  const product = getProduct((await params).slug);
  if (!product) return {};
  return { title: product.name, description: product.description };
}

export default async function ProductPage({ params }: PageProps<"/cakes/[slug]">) {
  const product = getProduct((await params).slug);
  if (!product) notFound();

  const words = product.name.split(" ");
  const lastWord = words.pop();
  const others = products.filter((p) => p.slug !== product.slug);

  return (
    <>
      <div className="shell flex flex-wrap items-start gap-10 pt-6 pb-[72px] md:gap-[72px] md:pt-8 md:pb-[120px]">
        <ProductGallery slug={product.slug} />

        <div className="flex min-w-0 flex-[1_1_420px] flex-col gap-8 md:pt-4">
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap gap-2.5 text-xs font-medium uppercase tracking-[0.18em] text-muted"
          >
            <Link href="/#shop" className="transition-colors hover:text-rose">
              Shop
            </Link>
            <span aria-hidden="true">/</span>
            <Link href="/#shop" className="transition-colors hover:text-rose">
              {categoryLabels[product.category]}
            </Link>
          </nav>

          <ProductPurchase
            key={product.slug}
            slug={product.slug}
            heading={
              <h1 className="font-serif text-[clamp(52px,5.4vw,80px)] leading-[0.92] font-normal tracking-[-0.025em]">
                {words.join(" ")} <em className="text-rose">{lastWord}</em>
              </h1>
            }
            description={
              <p className="text-[17px] leading-[1.75] font-light text-muted">{product.description}</p>
            }
          />

          <Accordion
            items={[
              {
                title: "Ingredients & allergens",
                open: true,
                body: "[List ingredients and allergens here.]",
              },
              {
                title: "Storage & serving",
                body: "Keep refrigerated. Rest at room temperature for 20 minutes before serving.",
              },
              {
                title: "Delivery & collection",
                body: "[Delivery areas, ordering lead time and collection hours.]",
              },
            ]}
          />
        </div>
      </div>

      <section aria-labelledby="also-love-heading" className="border-t border-line">
        <div className="shell py-[72px] md:pt-24 md:pb-[120px]">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-5 md:mb-12">
            <h2
              id="also-love-heading"
              className="font-serif text-[clamp(40px,4.4vw,64px)] leading-[0.95] font-normal tracking-[-0.02em]"
            >
              You may <em className="text-rose">also love</em>
            </h2>
            <TextLink href="/#shop">View all</TextLink>
          </div>
          <div className="grid grid-cols-2 gap-x-3.5 gap-y-6 md:grid-cols-[repeat(auto-fill,minmax(260px,1fr))] md:gap-x-7 md:gap-y-12">
            {others.map((p) => (
              <ProductCard key={p.slug} product={p} showAdd={false} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
