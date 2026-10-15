# Decisions log

Rules for this file:

- Append-only. Never rewrite or delete a past entry. If a decision is reversed, add a new dated entry explaining what changed and why; the old entry stays as the record of what was believed then.
- Each entry records the reason, not just the fact.
- Deferred items go here too, with the reason they were deferred.

| Date | Decision | Reason |
|---|---|---|
| 2026-10-14 | Next.js (App Router) + TypeScript + Tailwind, hosted on Vercel | Known stack, free tier, matches the reference portfolios, easy to explain in an interview |
| 2026-10-14 | No backend or database in v1 | Nothing to store; avoids cost, maintenance, and a failure point |
| 2026-10-14 | Chatbot ("Ask about Czed") deferred to v2 | Ship the static site first; a chatbot needs a server route, key handling, rate limits, and a spend cap |
| 2026-10-14 | Japanese theme is visual style only (no Japanese text) | Personal taste (anime, UP Soma Soshiki); avoids mistranslation risk |
| 2026-10-14 | Free vercel.app URL (pcmnepomuceno.vercel.app) for now | Budget is $0; custom domain can come later |
| 2026-10-14 | Used official create-next-app, not a community starter | Minimal dependencies; every file is explainable; a portfolio doesn't need a backend-style starter |
| 2026-10-14 | Domain-based folder structure (sections/, ui/, content.ts) | Organize by real concern, not file type; documented in CLAUDE.md |
| 2026-10-14 | FashionTech (Limitless Lab internship project) stays generic on the site: no code, screenshots, or demo | Rights unclear; permission requested from Limitless Lab by email; revisit only after a written reply |
| 2026-10-14 | Steinholdt project left off the site for now | Still being built; needs deployment and client agreement first |
| 2026-10-14 | Removed cacheComponents and partialPrefetching from next.config.ts | Generator defaults from --yes, not needed for a static portfolio; "no extras" rule |
| 2026-10-14 | Set agentRules: false in next.config.ts | Stops AGENTS.md regenerating on every dev run; project rules live in CLAUDE.md |
| 2026-10-14 | Replaced the @tailwindcss/turbopack loader with the documented @tailwindcss/postcss + postcss.config.mjs | The generator wired an undocumented loader; the documented path is safer across upgrades. Verified with a text-red-600 utility in the built CSS |
| 2026-10-14 | Deferred 5 high-severity npm audit findings (braces DoS chain via eslint-config-next) | Dev-only (0 in npm audit --omit=dev); the only fix is a major downgrade via --force. Revisit when Next ships a newer eslint-config-next |
| 2026-10-14 | Deferred the ESLint deprecation warning from the scaffold | No correctness impact; revisit with the eslint-config-next update |
| 2026-10-15 | Added CLAUDE.md as project memory | Claude Code reads it every session; keeps rules out of individual prompts |
| 2026-10-15 | Theme: light by default, manual toggle, no system-preference detection | Matches the light and clean preference; predictable behavior. Assumed by Claude, not yet explicitly confirmed by Czed |
| 2026-10-15 | Reversed the entry above. Theme now follows the visitor's system preference by default (next-themes, enableSystem), with a manual light/dark toggle whose choice persists | Czed's choice: respect the visitor's OS setting while still allowing an override. Light is the design's primary look, so light mode gets the most polish |
