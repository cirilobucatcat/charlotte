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
| `npm run typecheck` | `next typegen && tsc --noEmit`: typecheck outside a build |
| `npm test` | Vitest unit tests |
| `npm run test:e2e` | Playwright browser journeys (see [Testing](#testing)) |

`npm run build`, `npm run lint`, `npm run typecheck`, `npm test` and `npm run test:e2e` should all pass with zero errors.

## Testing

**Unit tests** (Vitest) sit beside the code they test as `lib/*.test.ts`.

**Browser journeys** (Playwright) live in `e2e/` and run in two projects: desktop Chromium, and an iPhone 14 in WebKit (390px wide, below the 768px breakpoint). Every journey runs in both. Where the layout differs (filter sets, the "+" card button, the menu sheet) a test branches on the project.

```bash
npx playwright install chromium webkit   # once, to download the browsers
npm run test:e2e
```

Playwright starts the production build (`next build && next start`) itself. If something is already listening on :3000 it is reused instead, which is handy with `npm run build && npm run start` in another terminal. `npm run dev` also works but compiles each route on first visit, so it is slower. Locally the tests run one at a time for that reason; CI runs them in parallel against the production build, which it builds in an earlier step so Playwright only starts the server.

The journeys find things by role, label and visible text rather than class names, and they spell out product names and prices instead of importing `lib/products`. That way they keep passing when the catalogue moves out of that file.

The [CI workflow](.github/workflows/ci.yml) runs on every pull request and on pushes to `main`: install, lint, typecheck, build, unit tests, then the browser journeys. If the journeys fail, the Playwright report is attached to the run as an artifact.

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
lib/*.test.ts         Vitest unit tests
e2e/                  Playwright browser journeys
public/               Static assets
.github/workflows/    CI
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
