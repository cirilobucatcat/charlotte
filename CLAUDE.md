# Charlotte — cake shop storefront

Next.js 16.4 (App Router) + React 19 + TypeScript + Tailwind CSS v4. No component library, no icon package. UI only: there is no backend, and the cart lives in localStorage.

Routes: `/` (home), `/cakes/[slug]` (product), `/bag`. The original design references (`Main`, `Product`, `MobileHome`, `MobileCart` `.dc.html`) are not committed. When asked to match "the reference", ask for them.

## Commands

- `npm run dev`: dev server on :3000 (writes to `.next/dev`, so it can run alongside a build)
- `npm run build`, `npm run lint`: both must pass with zero errors
- `npx next typegen && npx tsc --noEmit`: typecheck outside a build (`PageProps` / `LayoutProps` are generated globals)

## Next.js 16 specifics (read `node_modules/next/dist/docs/` before changing routing or caching)

- `cacheComponents` and `partialPrefetching` are on in `next.config.ts`. Tailwind runs through the `@tailwindcss/turbopack` loader there (there is no PostCSS config).
- Dynamic routes need `generateStaticParams`. `dynamicParams` is not allowed; call `notFound()` for unknown params.
- `app/cakes/[slug]/page.tsx` exports `ensureStatic = "navigation"`. Without it, the first request for an unknown slug returns 200 (the App Shell) instead of 404. Even with it, the 404's not-found UI renders client-side (framework behaviour).
- Pages stay mounted but hidden after navigation (React `<Activity>`). Reset transient UI in a `useLayoutEffect` cleanup; see the "added" confirmation in `ProductPurchase.tsx`.

## Layout

- `lib/products.ts`: product data, hero slides, filters. Prices are samples: whole dollars, marked `// sample price`. 8″/10″ prices = 6″ price + 16 / + 38.
- `lib/cart.tsx`: `CartProvider` / `useCart()`. External store read through `useSyncExternalStore`; the server snapshot is always the empty cart, so hydration never mismatches. Use `hydrated` before showing cart-dependent UI such as the empty state. Storage key `charlotte:cart:v1`; lines merge on slug+size+sponge+message+date; qty is clamped to 1–9; delivery fee is $8.
- `components/illustrations/`: flat SVG cakes ported verbatim from the references. Use `useId()` for gradient/path ids. `ProductMedia` switches to `next/image` when `product.image` is set; the arch layout stays the same.
- `components/icons.tsx`: line icons ported from the references (24px grid, 1.4 stroke). Add new icons here rather than installing `lucide-react`.

## Conventions

- Server Components by default. Client islands: carousel, filters, cart UI, pickers/steppers, mobile menu/tab bar, newsletter form.
- Keep markup server-rendered by passing it into client components as props (`HeroCarousel intro`, `ProductGrid items[].card`, `ProductPurchase heading/description`).
- There is no `tailwind-merge`, and `cn()` only joins strings. Never pass a class that conflicts with one a component already sets (e.g. `hidden` onto a base `inline-flex`): the winner depends on CSS order, not class order. Wrap the component instead, or write the classes out explicitly.
- Dynamic colours from data (product tints, hero panels) go in `style={{ backgroundColor }}`, not generated class names.
- Copy comes verbatim from the spec. Keep `[bracketed]` placeholders visible. Never invent reviews, ratings or stats.

## Charlotte Design System

**All UI must use the Charlotte Design System:** the tokens and utilities in `app/globals.css` plus the shared components below. Reuse them before writing new markup. Source of truth for the brand book, tokens and component guidelines: https://claude.ai/artifact/ANKAiZsi78RVXHWx81bps2 (read it with the Artifact tool, `project/README.md` first). Code token names differ from the system's semantic names; see the mapping below.

Look: classy and modern. An editorial page on a warm off-white ground, a refined serif with one italic accent word per headline, quiet uppercase labels, hairlines instead of shadows, and the brand pink used in large, confident fields. Every product sits in an arch.

Do not introduce any of these:
- Raw hex values in class names. Colours from product data and the ported SVG illustrations are the exceptions.
- Tailwind's default palette (`bg-white`, `text-gray-*`, …).
- Other fonts, shadows, or radii beyond the ones listed here.

If something genuinely new is needed, add it to the system (a token in `@theme` or a shared component) and document it here, rather than writing one-off styles.

### Colour

Code token → system role (light values): `ground` = `bg` #FAF6F4 (page) · `surface` #FFFFFF (inputs, white tiles, selected option card) · `ink` = `text` #1C1418 · `muted` = `text-muted` #6B5A62 · `line` #E5D9DE (every hairline) · `pink` = `brand` #ED96D7 · `pink-soft` = `brand-soft` #FBE6F2 · `rose` = `accent-text` #B4407F · `on-dark` = `inverse-text` #F5EEF1 · `on-dark-muted` = `inverse-muted` #BFAEB6 · `on-dark-body` · `dark-line` = `inverse-line` #3A2E33 · `gold` #D9B26A (illustrations only, never UI).

- `pink` is a **field**: hero arch, atelier arch, Birthdays tile, bag summary panel, sparkles, the selected-option dot. Text on a pink fill is always `ink` (8.6:1); never white on pink.
- **Contrast rule:** never use `pink` for text on light backgrounds (1.9:1 on `ground`); use `rose` for accent words and hover colour there. `pink` text is for `ink` backgrounds only. `muted` text on a `pink` background fails AA.
- `ink` sections (marquee, atelier, footer, gift-box tile) use `on-dark`, `on-dark-muted`, `dark-line`. Add `data-surface="dark"` to them so focus rings switch from rose to pink.
- Product tints behind arches: strawberry `#FBE6F2` (= `pink-soft`), chocolate `#F1E4E9`, lemon `#F8F0E1`, pistachio `#EEF0E6`. They come from product data via `style`, not class names.
- Text must meet 4.5:1 on its ground (3:1 for display text at 24px+).

### Typography

- `font-serif` = Instrument Serif 400 (display, card titles, total prices, numbers; the logo is italic). `font-sans` = Jost (300 reading text, 400 UI values, 500 labels).
- Every headline has **one** `<em>` accent word in `rose` (`pink` on `ink` sections). Never set a whole headline in italic or in pink.
- Display scale: hero H1 `clamp(64px, 8.2vw, 128px)` leading 0.92 · section H2 and product H1 `clamp(48px, 5.6vw, 80px)` leading 0.95 · statements `clamp(34px, 4.2vw, 60px)` leading 1.12 · tile titles 40px · card titles 28px · line items 22px · carousel numerals 48px · marquee 36px italic.
- Text scale: lead 18px/300 (`muted`) · body 16px/300, leading 1.7 · UI values 15px/400 · caption 13px/300 (`muted`) · price 17px/500 (26px on the product page).
- Labels (buttons, nav, text links) 13px/500, **uppercase**, tracking 0.16em. Eyebrows and field labels 12px/500, uppercase, tracking 0.24em, often after a 40px rule.

### Shape, layout and spacing

- Shapes: all product imagery sits in an arch (`rounded-arch`, taller than wide, anchored bottom-centre): 3/4 on cards, 4/5 in the hero and product page, 82×104 mini arches in the bag and thumbnail rail. Buttons, chips, badges and segmented controls are pills. Occasion tiles and the bag panel use 28px corners; option cards use 16px.
- `shell` = 1320px max + fluid gutter `clamp(20px, 4vw, 56px)`. Sections are 120px apart on desktop, 72px on phones. Product grid: `repeat(auto-fill, minmax(270px, 1fr))`, 56px row gap, 28px column gap. Splits are two wrapping flex columns (text beside an arch, stacking on phones).
- Spacing is a 4px base: 4 / 8 / 12 / 16 / 20 / 24 / 28 / 32 / 48 / 56 / 72 / 120.
- Hairlines, not shadows: separate with 1px `line`. The only "shadow" is the focus ring (2px outline, offset 3px; where an outline cannot follow the shape, a 3px `ground` + 2px `rose` ring). No background gradients, no emoji.
- Touch targets are 44px or larger; icon-only buttons carry an `aria-label`. Toggles (filters, chips, sizes, segmented options) use `aria-pressed`. Marquee and sparkles are decorative (`aria-hidden`).

### Motion

Slow and quiet. Marquee loops every 16s; rotating badge turns once per 22s; product arches lift 6px on hover over 600ms and occasion tiles over 400ms (`ease-lift`); the hero panel colour crossfades over 0.5s. Under `prefers-reduced-motion` the marquee and badge stop and nothing lifts (`motion-safe:` / `motion-reduce:`). No autoplaying carousels.

### Components

`Button` / `ButtonLink`, `IconCircleButton`, `TextLink`, `Eyebrow`, `Arch` / `ArchGlow`, `Sparkle`, `icons.tsx`, `QuantityStepper`, `SegmentedControl`, `SizePicker`, `SpongePicker`, `Accordion`, `ProductCard` / `ProductMedia`, `Marquee`, `RotatingBadge`, and the cakes in `components/illustrations/`. Names in the Charlotte system → code: `IconButton` = `IconCircleButton`, `OptionCard` = `SizePicker` options, `Chip` = `SpongePicker` options, `CakeIllustration` = `components/illustrations/`, `FilterTabs` / `TabBar` / `BagSummary` live in `ProductGrid` / `MobileTabBar` / `BagView`.

- `Button` variants: `primary` (ink fill, `ground` label; hover turns `rose` with white text; one per view), `outline` (1px ink border, fills on hover; secondary actions and "Add to bag" on cards at `sm`), `pink` (pink fill, ink label; use on `ink` sections where an ink button would vanish). `TextLink` is the underlined uppercase link (`link-wipe`) that pairs with a primary button. Labels are verbs in sentence form ("Add to bag") rendered uppercase by CSS.
- `IconCircleButton`: outline 52px for carousel arrows; solid 44px for the mobile card "+" (arch's bottom-right); soft favourite on an arch (uses `ground` so it reads on pink); ghost 44px for header icons.
- Option cards (`SizePicker`): 2–4 options with a detail line; selected gets a 1px `ink` border, `surface` fill and a pink dot; serif 26px title, 12px `muted` detail. Use chips for short single-word choices; wrap a set in `role="group"` with an `aria-label`.
- Badge: small uppercase pill at the bottom-left of its arch, one per product, two or three words ("Signature", "Eggless option").
- `QuantityStepper`: hairline pill, 1–9; `md` 60px beside Add to bag, `sm` 42px in bag lines. Pass a product `label` for the buttons. Removing a line is a separate "Remove" text button, not the minus at 1.
- `Accordion`: native `<details>`, hairline rows, uppercase summaries, plus becomes minus; open the first row by default.
- `Marquee`: one per page between hero and collection, decorative, italic serif words separated by pink sparkles. `RotatingBadge`: one per page, overlapping the hero arch's top-left edge. `Sparkle`: one or two per section; the only ornament.
- Icons: 24px grid, 1.4 stroke, round caps/joins, `currentColor`; 20px in the header, 22px in the tab bar, 16–18px in steppers. Icons never carry meaning alone.
- Illustrations: flat, no outlines, faces or drop shadows; bottom-centred in an arch on the matching tint (`pink` with the white glow disc for the hero cake). Replace with real photos when available (front-on, slightly above, soft daylight, backdrop matching the tint).
- Utilities: `shell`, `rounded-arch`, `link-wipe`, `animate-marquee`, `animate-badge`, `ease-lift`.
- CSS vars: `--gutter` (side padding; full-bleed blocks use `-mx-(--gutter)`), `--header-h` (69px mobile / 81px md+). `--header-h` must match the sticky header's real height: it drives `scroll-padding-top` for `#shop` / `#atelier` / `#occasions` and the bag summary's sticky offset.

### Voice and copy

Warm, assured, unhurried. Short plain sentences; no exclamation marks, emoji or urgency. Lead with the cake and the moment. Product names in Title Case; ingredient notes are three items joined by middle dots ("Vanilla chiffon · strawberry · chantilly"); sizes use the inch mark and say who they feed ("8″ · Serves 10–12"); prices "$48" / "from $48". British-leaning spelling (favourite, centrepiece, colour). Unknown facts stay as visible `[bracketed]` placeholders.

### Not yet in the system

Form error states, an empty-bag illustration, and a dark theme (the site is light-only; the system's dark values are a proposal). Build them from the existing tokens and components, then document them here.

## Responsive behaviour

- Below `md` (768px) the mobile references apply. The home page reorders to hero → collection, then the marquee and the rest (`max-md:order-1`). Cards become 2-up with a "+" button. The rotating badge is hidden on phones; the "New season" pill shows instead.
- Nav links hide below 860px, where the menu button (a modal `<dialog>` sheet) takes over.
- The tab bar is fixed and 82px tall below `md`. The bottom padding is on `<body>` (not `<main>`) so the footer isn't covered. The bag summary sticks at `bottom-[82px]` on mobile.
- Collection filters: desktop shows All · Cakes · Petits · Eggless; mobile shows All · Cakes · Petits · Weddings · Gift boxes (driven by product `tags`).
- The marquee repeats its word list 4× and moves −25% per 16s, so it loops seamlessly at 1920px.

## Not implemented yet (placeholders)

Search, account and saved (header/tab-bar buttons with no action), footer Care links (`href="#"`), checkout, newsletter backend (the form only shows a thank-you), and the bag's collection/delivery time picker. "Start your design" links to the Strawberry Charlotte product page.
