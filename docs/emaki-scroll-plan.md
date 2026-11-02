# Full-page horizontal emaki scroll: plan and measurements

**Status: deferred 2026-11-02. Replaced by a desktop-only Projects strip (PR 6).** Kept so the work is not repeated if the full-page version is revisited. See `docs/DECISIONS.md`.

Gate for any enhancement: `screen and (min-width: 1024px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)`. Outside it, render exactly what ships today.

## Why it was deferred

Two panels are about twice the viewport height at every desktop size, and a reflow probe did not fix that. A horizontal layout would need vertical scroll inside those panels. The user chose a strip for Projects only.

## Measurements

Production build, Playwright Chromium, fonts loaded, at 1024x768, 1280x720, 1440x900 and 1920x1080. Section heights are the same at every width of 1024 or more, because the content column is capped at `max-w-5xl` (992px). Every section has 96px of padding above and below.

Space today is viewport height minus the 61px sticky header. Space in emaki would also lose the 68px footer strip.

| Panel | Height | 1024x768 | 1280x720 | 1440x900 | 1920x1080 |
|---|---|---|---|---|---|
| Space today | | 707 | 659 | 839 | 1019 |
| Space in emaki | | 639 | 591 | 771 | 951 |
| Intro | 552 | fits | fits | fits | fits |
| Projects | 1338 | +699 | +747 | +567 | +387 |
| Experience | 684 | +45 | +93 | fits | fits |
| Skills + Foundations | 1417 (536 + 881) | +778 | +826 | +646 | +466 |
| Contact | 480 | fits | fits | fits | fits |

Overflow is measured against the emaki space. Projects at 1280 is a 36px heading, a 336px featured article and a 678px rows list. Foundations content alone is 612px.

**Reflow probe** (DOM-only, nothing changed in the repo): Projects in two columns, Skills and Foundations side by side, section padding 48px, column 80rem. Results: Projects 884px, Skills + Foundations 1224px, Experience 588px. Skills + Foundations still exceeded the viewport at every size (+205 at 1080p, +565 at 720p, measured against today's space). Projects still exceeded it at 720p and 900p.

Note: a stale `next-server` (pid 10204) held port 3100 and served an old build, which gave bogus first numbers (unstyled page). All figures above come from a fresh build on port 3300.

## How the page works today (what a full-page version must remap)

- **Scroll-spy** (`SiteNav.tsx`): an IntersectionObserver on the viewport with `rootMargin "-35% 0px -64% 0px"`, a thin line at 35% down. `data-nav-parent` maps Foundations to Skills. A second observer treats the fully visible `<footer>` as Contact. `locked` ignores updates for 300ms after a nav click.
- **Palette jump** (`CommandPalette.tsx`, `jump.ts`): `jumpTo` sets `location.hash`, calls `scrollIntoView()`, then sets `tabIndex=-1` and focuses without scrolling. Off the home page it calls `router.push('/#id')`.
- **Nav links:** the desktop nav uses `<Link href="/#id">` (native fragment scroll). The mobile menu uses `jumpTo`.
- **Anchors:** `html { scroll-padding-top: var(--header-h) }`, with `--header-h` 61 / 97 / 113px by breakpoint. `scrollbar-gutter: stable` on `html`.
- **Skip link and Back to top** both target `#main`, which is `<main tabIndex=-1>`. The case study uses the same footer.
- **Lightbox:** `html:has(dialog[data-lightbox][open]) { overflow: hidden }`.
- The case-study back link is `<Link href="/#projects">`.

## Approaches compared

**A. Real horizontal scroller** (`overflow-x` with scroll-snap, each panel `overflow-y: auto`). **B. Sticky stage** where vertical scroll drives a `translateX` of the track.

| | A | B |
|---|---|---|
| Panels taller than the viewport | Native `overflow-y: auto` per panel | Clip (not allowed), nested scroll inside a transformed stage (two vertical scrolls fight), or per-panel JS choreography |
| Anchors, deep links | Native; measured working (load, case-study link, nested `#foundations`) | Browser targets the pre-transform layout; load, hashchange and links must be intercepted and mapped to scrollY |
| Scroll-spy | Same observer, with a small fix | Rewrite as scrollY math |
| Tab into an off-screen panel | Native, measured | Browser scrolls the overflow stage and desyncs the transform; needs `overflow: clip` plus a focusin handler |
| Ctrl+F | Native | Matches in translated panels are invisible; breaks "no content hidden" |
| Ctrl+K palette | `jumpTo` unchanged | `jumpTo` rewrite |
| Lightbox | Top layer, unchanged | Unchanged |
| Wheel | Trackpad sideways native; a mouse wheel needs a guarded mapping | Vertical wheel natural; sideways swipe dead |
| CLS, hydration | CSS-only behind the media query; measured CLS 0 | Possible in CSS (`animation-timeline: scroll()`, no Firefox) or JS; tall panels unsolved |
| Kill switch | Remove a `data-emaki` attribute | Same |

Recommendation at the time: A. Its cost is that a plain mouse wheel needs a small JS mapping.

## Prototype of A (CSS injected at DOMContentLoaded, 1280x720)

- `/#projects` and `/#foundations` on load land on the right panel (the second also scrolled the panel 536px). Nested fragment scroll is native.
- The case-study "Back to projects" link lands on Projects with focus on the link.
- `scrollIntoView` (the `jumpTo` path) to `#foundations` works.
- Tab into off-screen panels scrolls them in, horizontally and vertically. Native.
- ArrowRight after a click on the track scrolls one panel. Native.
- A plain vertical wheel over a short panel (Intro) does nothing. A wheel mapping would be needed.
- A vertical wheel over Projects scrolls the panel.
- **Scroll-spy broke:** always "Contact", because the footer strip is always fully visible, so the `atBottom` rule always fires.
- CLS 0.
- Intro and Skills use the column class on the band wrapper itself, so a panel wrapper is needed per band.

## Design sketch

- CSS only, behind the media query and a `main[data-emaki]` attribute (the kill switch). No React branch on media, so server HTML equals client HTML.
- `body:has(main[data-emaki])` becomes a 100dvh grid (header, track, footer). The track is `display: flex; overflow-x: auto; scroll-snap-type: x mandatory; overscroll-behavior-x: contain`. Each panel is `flex: 0 0 100%; overflow-y: auto; scroll-snap-align: start; scroll-snap-stop: always`.
- Section padding drops from 96px to 48px inside panels (this alone makes Experience fit at 720p).
- Scroll-spy skips the `atBottom` rule in emaki. Back to top resets the track's `scrollLeft`.
- Controls: a footer strip with "02 / 05", Previous and Next (`scrollBy`), and a guarded wheel mapping that does nothing when the target is in a dialog, a modifier key is down, the gesture is sideways, or the panel under the pointer can still scroll that way.
- Split: 6a layout, kill switch, spy fix, back to start; 6b progress, arrows and wheel.

## Risks

- Wheel mapping against inertial trackpads; Playwright cannot emulate momentum.
- A tall panel with no focus inside it cannot be scrolled by keyboard.
- Extra keyboard stops on scrollable regions in Chrome.
- Two sets of scrollbars (track and per panel).
- Safari snap and `scroll-snap-stop` quirks.
- At 720p, Projects and Skills + Foundations need about 2.3 times the panel height, so those panels would scroll inside, not read as slides.

## Open questions that were never resolved

1. Reflow tall panels for desktop (Projects in two columns, Skills beside Foundations)? It reduces inner scroll but does not remove it.
2. A wheel mapping at all, or leave a plain wheel dead on short panels?
3. Keep a permanent 68px footer strip for the progress indicator?
