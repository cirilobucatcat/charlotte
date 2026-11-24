# Supabase as the backend

The site had no backend, and Inventory needs real data that every customer sees, plus Admin sign-in and photo storage, on Vercel. We chose Supabase (Postgres, Auth and Storage), added through the Vercel Marketplace, over Neon Postgres + Vercel Blob + a sign-in library (Auth.js or Better Auth), because one vendor and one dashboard suits a single shop with 1–3 Admins. Tables are defined in the repo with Drizzle so schema changes are versioned and reviewed.

## Consequences

- Two Supabase projects: production for the live site, development for local work and Vercel previews. The free plan allows two projects, so there is no third one for tests (see ADR-0003).
- All reads and writes go through server code (Drizzle). Row Level Security is on with no public policies, so the public Supabase key cannot read or change data directly.
- Admins sign in with an email sign-in link. The `admins` table, edited in the Supabase dashboard, is the list of approved addresses, and it is checked on every Inventory request.
