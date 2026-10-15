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
| 2026-10-15 | Pinned next-themes at exactly 0.4.6 (--save-exact) | Only new dependency in Milestone 2; exact pin avoids surprise upgrades |
| 2026-10-15 | Fonts: Noto Serif JP 600, JetBrains Mono 400, Inter 400 and 500; latin subset only; display swap | Max 2 weights per family, only those used. Noto Serif JP offers a latin subset, so no CJK stop was needed |
| 2026-10-15 | Flagged: next build emits ~124 Noto Serif JP @font-face rules (CJK slices) though only latin is preloaded | Browsers fetch by unicode-range, so CJK files should not download for latin text. Not verified in a real browser (see Playwright entry); verify in DevTools Network and revisit if CJK woff2 files load |
| 2026-10-15 | Kept the starting colors unchanged; all pass WCAG AA. Light: text 16.81, accent 5.51, muted 5.58. Dark: text 16.27, accent 5.80, muted 6.79 | Contrast checked by calculation. Added muted (#6B625B / #A39A91) and border (#E4DDD3 / #2E2925) values; border is decorative only (1.26 / 1.31) |
| 2026-10-15 | Button text uses the background token on the accent fill (5.51 light, 5.80 dark); no accent-foreground token | One fewer token; contrast already passes |
| 2026-10-15 | Theme toggle mounted-check uses useSyncExternalStore, not useEffect + setState | Avoids the React 19 set-state-in-effect lint rule; same no-mismatch result |
| 2026-10-15 | Header and footer live inline in layout.tsx; name and nav labels hardcoded for now | Used once; move to components and content.ts in Milestone 3 |
| 2026-10-15 | Deferred skip-to-content link to Milestone 7 | Accessibility polish pass |
| 2026-10-15 | Browser verification not run by Claude: Playwright MCP present but its Chrome binary is missing | Per instruction, no Playwright install or browser download. Czed verifies in the browser |
| 2026-10-15 | Site name changed from "Czed Nepomuceno" to "Prince Czedrick Nepomuceno" (title, description, header, footer, specimen) | Czed's request. Past entries and CLAUDE.md keep "Czed" as the nickname |
| 2026-10-15 | Font tokens in globals.css end with generic families (serif; ui-monospace, monospace; ui-sans-serif, system-ui, sans-serif); no next/font fallback option added | Built CSS showed next/font variables end at the metric fallback face (local Arial or Times New Roman) with no generic family, so a missing local font dropped to the browser default. The @theme inline mapping is where the chain ends, so the fix goes there |
| 2026-10-15 | Flagged: next/font's metric fallback for JetBrains Mono is local(Arial), so if the web font fails the mono nav renders in Arial before reaching monospace | next/font picks the fallback face. adjustFontFallback: false on JetBrains_Mono would skip it; left for Czed to decide |
| 2026-10-15 | Footer year uses new Date().getFullYear() | Static site, so it is evaluated at build time and updates on the next deploy |
| 2026-10-15 | Theme toggle switches only light and dark; a manual choice pins the theme and there is no way back to "system" | By design, matches the 2026-10-15 theme decision (system by default, manual override persists). A system/light/dark cycle was considered and deferred to Milestone 7 polish because it adds UI and labels |
| 2026-10-15 | Theme toggle icon and accessible name switch with CSS (dark: variants on both icons and two sr-only labels); removed the useSyncExternalStore mounted check | Same markup on server and client, so no hydration mismatch and no blank button before mount. The click reads the html .dark class that next-themes sets before hydration, so an early click picks the right theme. Replaces the useSyncExternalStore entry above |
| 2026-10-15 | Nav links to #experience, #projects, #skills and #contact have no targets yet | Deferred: the sections arrive in Milestones 3 and 4. The specimen's accent link goes away with the specimen in Milestone 3 |
| 2026-10-15 | Deferred the React "Encountered a script tag" warning caused by next-themes' inline script | Dev-only noise: the message is only in React's development build (absent from the production react-dom and from .next/static). Fixing it means replacing next-themes |
| 2026-10-15 | Header nav links and theme toggle get 44x44px hit areas through padding: links use min-h-11 / min-w-11 with px-2 instead of list gaps (-mx-2 keeps text aligned), toggle goes from size-9 to size-11, header padding drops to py-2 | The audit measured about 20px tall links and a 36px toggle, below the 44px touch guideline. Text size unchanged. Headless Chromium screenshot at 320px: header wraps onto rows (name, nav, toggle) with no overflow |
| 2026-10-15 | Hover states on the name link, nav links and theme toggle: text (and toggle border) turn accent; color transition only under motion-safe | The audit found no hover feedback anywhere. Uses existing tokens only. Tailwind v4 wraps hover in @media (hover: hover), so touch devices get no sticky hover. Focus ring unchanged |
| 2026-10-15 | ::selection uses the background token on the accent token: 5.51:1 light, 5.80:1 dark | The audit flagged the default blue selection as off-brand. Same pair as the accent button, so contrast is already verified at 4.5:1 or better |
| 2026-10-15 | The three entries above came from the /impeccable audit of the M2 design system, run after Milestone 2 merged (#5); fixed in the follow-up branch fix/m2-audit-findings | The audit finished after the merge. A small follow-up branch keeps M2's history as merged and keeps these fixes reviewable on their own |
| 2026-10-15 | Adopted Impeccable (installed at ~/.claude/skills/impeccable) as an evaluation tool, not a build dependency. Used: its skill commands (audit, critique and similar) run on demand inside Claude Code. Nothing is added to package.json. `impeccable hooks status` reports the design detector hook as "enabled" with defaults (no .impeccable/config.json present), but no hook entry was found in ~/.claude/settings.json or the project, so no auto-run after edits was observed. The detector is used only when a command invokes it | Extra review pass on the UI. Hook state is recorded as observed so it can be corrected if it turns out to fire |
| 2026-10-15 | Impeccable telemetry set to off (per Czed). No telemetry setting was found in the skill files or the local binary, so this is recorded as instructed, not verified in-session | Keep usage data private; verify against the Impeccable docs if it matters |
| 2026-10-15 | Impeccable output is a review to triage, not orders. Anything that contradicts a logged decision, CLAUDE.md or docs/PROJECT_BRIEF.md is discussed with Czed first, never auto-applied | Same triage as the M2 audit, where findings were checked against the log before fixing |
| 2026-10-15 | Skipping the Impeccable overdrive, delight, animate and bolder commands for now | They conflict with the minimal-animation rule and the light, clean brief. Revisit only if the brief changes |
