# Charlotte

A cake shop storefront: an editorial, warm off-white site with a refined serif, brand-pink fields, and every cake set in an arch.

This is a UI-only project. There is no backend, and the bag (cart) is stored in `localStorage`.

## Stack

- [Next.js](https://nextjs.org) 16 (App Router, `cacheComponents` and `partialPrefetching` enabled)
- React 19 and TypeScript
- Tailwind CSS v4, loaded through `@tailwindcss/turbopack`
- No component library and no icon package

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server on :3000 (writes to `.next/dev`, so it can run alongside a build) |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npx next typegen && npx tsc --noEmit` | Typecheck outside a build |

`npm run build` and `npm run lint` should both pass with zero errors.

## Routes

| Route | Page |
| --- | --- |
| `/` | Home: hero, collection, marquee, occasions, atelier |
| `/cakes/[slug]` | Product page |
| `/bag` | Bag and order summary |

Unknown product slugs return a 404 via `notFound()`.

## Project structure

```
app/                  Routes, layout, and globals.css (design tokens)
components/           Shared UI: Button, Arch, ProductCard, SizePicker, Accordion, ...
components/illustrations/   Flat SVG cakes
lib/products.ts       Product data, hero slides, filters
lib/cart.tsx          CartProvider and useCart()
public/               Static assets
```

### Cart

`lib/cart.tsx` is an external store read through `useSyncExternalStore`. The server snapshot is always the empty cart, so hydration never mismatches. Check `hydrated` before showing cart-dependent UI.

- Storage key: `charlotte:cart:v1`
- Lines merge on slug, size, sponge, message and date
- Quantity is clamped to 1–9
- Delivery fee is $8

### Products

Product data lives in `lib/products.ts`. Prices are samples (whole dollars, marked `// sample price`). The 8″ and 10″ sizes cost the 6″ price plus $16 and $38.

## Design system

All UI uses the Charlotte Design System: the tokens and utilities in `app/globals.css` plus the shared components in `components/`.

- **Type:** Instrument Serif for display, Jost for reading text and UI
- **Colour:** `ground`, `surface`, `ink`, `muted`, `line`, `pink`, `pink-soft`, `rose`, and the `on-dark` set for dark sections
- **Shape:** products sit in arches (`rounded-arch`); buttons and chips are pills
- **Depth:** hairlines instead of shadows
- **Motion:** slow and quiet, and it respects `prefers-reduced-motion`

Avoid raw hex values in class names and Tailwind's default palette. If something new is needed, add a token or shared component rather than one-off styles. See `CLAUDE.md` for the full guidelines.

## Responsive behaviour

Below `md` (768px) the mobile layout applies: 2-up cards with a "+" button, a fixed bottom tab bar, and a menu sheet in place of the nav links (below 860px).

## Not implemented yet

- Search, account and saved (the buttons have no action)
- Footer Care links (`href="#"`)
- Checkout
- Newsletter backend (the form only shows a thank-you)
- The bag's collection and delivery time picker

"Start your design" links to the Strawberry Charlotte product page.
