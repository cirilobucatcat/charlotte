# Browser tests run against a fresh local Supabase

Playwright tests create Products, change prices and mark things Sold out, so they must never touch production. The shared development project would let tests collide with manual experiments and leave test Products in previews, and a third Supabase project for tests needs a paid plan. Each test run therefore starts Supabase locally in Docker with the Supabase CLI, reset to the starting data. Its built-in test mailbox catches sign-in emails, so the real email sign-in link can be tested end to end.

## Consequences

- CI (GitHub Actions on every pull request) is where browser tests always run. GitHub's runners have Docker.
- Running browser tests on a developer's machine needs Docker Desktop. Everyday development against the development project does not.
