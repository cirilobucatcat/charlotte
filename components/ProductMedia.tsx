import Image from "next/image";
import type { Product } from "@/lib/products";
import { cn } from "@/lib/cn";
import { Arch } from "./Arch";
import { CardCake } from "./illustrations/CardCake";

/**
 * A product inside its arch. Renders the photo when `product.image` exists,
 * otherwise the flat illustration on the product's tint; the 3/4 arch keeps
 * the layout identical either way.
 */
export function ProductMedia({
  product,
  className,
  sizes = "(min-width: 768px) 320px, 50vw",
}: {
  product: Product;
  className?: string;
  sizes?: string;
}) {
  return (
    <Arch className={cn("aspect-3/4", className)} style={{ backgroundColor: product.tint }}>
      {product.image ? (
        <Image src={product.image} alt="" fill sizes={sizes} className="object-cover" />
      ) : (
        <CardCake
          variant={product.illustration.variant}
          colors={product.illustration.colors}
          className={cn(
            "mb-[8%] block h-auto",
            product.illustration.variant === "petits" ? "w-[88%]" : "w-[84%]",
          )}
        />
      )}
    </Arch>
  );
}
