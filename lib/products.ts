export type Size = { label: string; serves: string; price: number };

export type IllustrationVariant = "layer" | "drip" | "petits";

/** Palette for the pedestal cake used in the hero and on product pages. */
export type HeroColors = {
  light: string;
  base: string;
  shade: string;
  top: string;
  berry: string;
};

export type Product = {
  slug: string;
  name: string;
  notes: string; // short uppercase line on cards
  description: string;
  category: "cakes" | "petits";
  tags: string[]; // e.g. "eggless"
  badge?: string;
  badgeTone?: "light" | "dark";
  tint: string; // arch background
  sizes: Size[]; // first = default
  sponges?: readonly string[]; // omitted when there is no sponge choice
  defaultSponge?: string;
  illustration: { variant: IllustrationVariant; colors: Record<string, string> };
  hero?: HeroColors;
  thumb: { body: string; top: string; accent: string }; // mini cake in the bag
  image?: string;
};

export const SPONGES = ["Vanilla chiffon", "Dark chocolate", "Eggless vanilla"] as const;

function sizeLadder(from: number): Size[] {
  return [
    { label: "6″", serves: "Serves 6–8", price: from }, // sample price
    { label: "8″", serves: "Serves 10–12", price: from + 16 }, // sample price
    { label: "10″", serves: "Serves 16–20", price: from + 38 }, // sample price
  ];
}

export const products: Product[] = [
  {
    slug: "strawberry-charlotte",
    name: "Strawberry Charlotte",
    notes: "Vanilla chiffon · strawberry · chantilly",
    description:
      "Our namesake. Layers of airy vanilla chiffon with fresh strawberries and whipped chantilly, softly tinted and finished by hand with piped rosettes and a touch of gold leaf.",
    category: "cakes",
    tags: ["birthdays", "weddings"],
    badge: "Signature",
    badgeTone: "light",
    tint: "#FBE6F2",
    sizes: sizeLadder(48), // sample price
    sponges: SPONGES,
    illustration: {
      variant: "layer",
      colors: { base: "#F4B6DF", top: "#FCE3F3", shade: "#DC8FC2", berry: "#C8325A" },
    },
    hero: { light: "#FCE3F3", base: "#F4B6DF", shade: "#DC8FC2", top: "#FCE3F3", berry: "#C8325A" },
    thumb: { body: "#F4B6DF", top: "#FCE3F3", accent: "#C8325A" },
  },
  {
    slug: "midnight-chocolate",
    name: "Midnight Chocolate",
    notes: "Dark cocoa · ganache · cherry",
    description:
      "For the chocolate devoted. Deep, dark cocoa sponge layered with silky ganache and morello cherries, finished with a glossy ganache drip, fresh cherries and flecks of gold leaf.",
    category: "cakes",
    tags: ["birthdays"],
    tint: "#F1E4E9",
    sizes: sizeLadder(52), // sample price
    sponges: SPONGES,
    defaultSponge: "Dark chocolate",
    illustration: {
      variant: "drip",
      colors: { base: "#5A3426", top: "#3A1F16", drip: "#3A1F16", cherry: "#9E1F45" },
    },
    hero: { light: "#7A4A38", base: "#5A3426", shade: "#3A2018", top: "#6B3F2E", berry: "#9E1F45" },
    thumb: { body: "#5A3426", top: "#3A1F16", accent: "#9E1F45" },
  },
  {
    slug: "lemon-lavender",
    name: "Lemon Lavender",
    notes: "Lemon curd · lavender · chiffon",
    description:
      "Bright and gently floral. Lemon chiffon filled with sharp lemon curd and a whisper of lavender buttercream, crowned with candied lemon and a single sprig of lavender. Also made eggless.",
    category: "cakes",
    tags: ["eggless", "weddings"],
    badge: "Eggless option",
    badgeTone: "dark",
    tint: "#F8F0E1",
    sizes: sizeLadder(46), // sample price
    sponges: SPONGES,
    illustration: {
      variant: "layer",
      colors: {
        base: "#F3E0A0",
        top: "#FFF6DA",
        lemon: "#F2CD5C",
        lemonInner: "#FFF3B0",
        lavender: "#9B7FC4",
      },
    },
    hero: { light: "#FFF8E2", base: "#F3E0A0", shade: "#D6BF78", top: "#FFF6DA", berry: "#ED96D7" },
    thumb: { body: "#F3E0A0", top: "#FFF6DA", accent: "#9B7FC4" },
  },
  {
    slug: "rose-pistachio-petits",
    name: "Rose Pistachio Petits",
    notes: "Box of six · rosewater · pistachio",
    description:
      "Six petite cakes in fluted cases. Pistachio sponge piped high with pistachio and rosewater buttercream, each one finished with a sugared rosebud. Boxed for gifting, or for keeping.",
    category: "petits",
    tags: ["gift-boxes"],
    tint: "#EEF0E6",
    sizes: [{ label: "Box of six", serves: "Six petits gâteaux", price: 28 }], // sample price
    illustration: {
      variant: "petits",
      colors: {
        liner: "#ED96D7",
        linerAlt: "#1C1418",
        frosting: "#CFE0B8",
        frostingAlt: "#FBE3F3",
        rose: "#E78FB3",
      },
    },
    thumb: { body: "#CFE0B8", top: "#E3EDD3", accent: "#E78FB3" },
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function defaultSponge(product: Product) {
  return product.defaultSponge ?? product.sponges?.[0] ?? "";
}

export const categoryLabels: Record<Product["category"], string> = {
  cakes: "Signature cakes",
  petits: "Petits gâteaux",
};

/** Hero carousel slides, in order. Prices come from each product's first size. */
export const heroSlides = [
  {
    slug: "strawberry-charlotte",
    notes: "Vanilla chiffon, strawberries, chantilly",
    panel: "#ED96D7",
  },
  {
    slug: "midnight-chocolate",
    notes: "Dark cocoa, ganache, cherries",
    panel: "#F3C4E2",
  },
  {
    slug: "lemon-lavender",
    notes: "Lemon curd, lavender buttercream",
    panel: "#F8D9EC",
  },
] as const;

export type FilterId = "all" | "cakes" | "petits" | "eggless" | "weddings" | "gift-boxes";

/**
 * Collection filters. Desktop shows All · Cakes · Petits · Eggless; the
 * mobile tab row shows All · Cakes · Petits · Weddings · Gift boxes.
 */
export const filters: { id: FilterId; label: string; show: "both" | "desktop" | "mobile" }[] = [
  { id: "all", label: "All", show: "both" },
  { id: "cakes", label: "Cakes", show: "both" },
  { id: "petits", label: "Petits", show: "both" },
  { id: "eggless", label: "Eggless", show: "desktop" },
  { id: "weddings", label: "Weddings", show: "mobile" },
  { id: "gift-boxes", label: "Gift boxes", show: "mobile" },
];

export function matchesFilter(id: FilterId, product: Pick<Product, "category" | "tags">) {
  if (id === "all") return true;
  if (id === "cakes" || id === "petits") return product.category === id;
  return product.tags.includes(id);
}
