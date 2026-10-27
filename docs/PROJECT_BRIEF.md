# Project: Czed's Portfolio Website

**One-liner:** A light, clean, minimal personal portfolio with a Japanese-red + tech visual style, acting as an easily accessible resume for recruiters.

## 1. Problem and audience
- **Who is it for?** Recruiters and hiring managers (PH entry-level, remote/global), freelance clients, and fellow devs.
- **Problem:** A resume PDF alone doesn't show projects, personality, or ability to ship.
- **Today:** LinkedIn + GitHub + PDF resume.
- **Why build:** Portfolio piece + real use in job applications + personal brand (anime / J-pop culture).

## 2. Core features (MVP)
1. Hero: Sablay photo + name + short summary + links
2. Experience timeline (chronological: work, orgs); projects have their own section
3. Featured projects: Steam Review Analyzer, CosRec (+ small PICSEL card)
4. Skills grouped by depth (Core, Used in my projects, Coursework), then Technical foundations (three course projects)
5. Contact (email, GitHub, LinkedIn) + downloadable CV (PDF)
Cross-cutting: light/dark mode, responsive, SEO/OG metadata.

## 3. Out of scope (v1)
- Separate backend or database, CMS, blog
- Chatbot ("Ask about Czed"): v2
- /now page, hackathon log: v2
- Steinholdt project: add when deployed + client agrees
- FashionTech code, repo link, live demo, pitch deck, slide templates, Firebase config and real-looking data: never. Name, role, screenshots and a written case study are allowed (permission received 2026-10-16, see DECISIONS)
- Heavy animation, 3D, page transitions

## 4. Tech stack
| Layer | Choice | Why |
|---|---|---|
| Frontend | Next.js (App Router) + TypeScript | Already known; same as friends' sites |
| Styling | Tailwind CSS | Design tokens, dark mode |
| Theming | next-themes | No flash on load, system preference |
| Animation | Motion (minimal) | Subtle scroll reveals only |
| Content | Typed `content.ts` | Add a project = one-file edit |
| Fonts | Plus Jakarta Sans only, weights 300/400/500 (next/font), per docs/redesign-spec.md | One calm sans; no serif or monospace |
| Backend/DB/Auth | None | Static site |
| Hosting | Vercel (free), pcmnepomuceno.vercel.app | Free, deploy on push |

## 5. Data model (content.ts)
- Profile: name, role, location, education, summary, links (email, github, linkedin), photo (src, alt)
- ExperienceItem: type (work | org), title, organization, start, end, bullets[], tags[], link?
- Project: slug, title, summary, status ("live" | "in-progress" | null), featured, badge?, result?, org?, period?, role?, tags[], links[] { label, href }, image?
- SkillGroup: label, items[]
- Foundation: title, meta, what, part

## 6. Key screens
Single page with anchored sections: Home, Projects, Experience, Skills, Technical foundations (no nav item), Contact. Plus the /projects/fashiontech case study and /resume (print-friendly, optional).

## 7. Milestones
| # | Milestone | Done when... |
|---|---|---|
| 1 | Scaffold + hello world + Vercel deploy connected | Runs locally; live URL shows the page |
| 2 | Design tokens (red/ink/washi), fonts, layout shell, theme toggle | Light/dark toggle works, no flash on reload |
| 3 | content.ts + Hero + Experience timeline | Timeline renders chronologically from data |
| 4 | Featured projects + PICSEL card + Skills | Steam card links to the real demo and repo; CosRec card shows a demo-in-progress label |
| 5 | Contact + CV PDF + SEO/OG metadata | CV downloads; link preview looks right |
| 6 | Command palette (Ctrl+K) + hanko status stamps | Palette jumps to sections, toggles theme |
| 7 | Polish: responsive, accessibility, Lighthouse | Mobile OK; Lighthouse 90+ |
| Perf | Self-host latin Noto Serif JP to slim render-blocking CSS (PR #20) | Merged; CJK font slices no longer in the render-blocking stylesheet |
| 8a | CosRec live demo + hero link (PR #21) | Merged; CosRec card links to the live demo |
| 8b | Theme-aware Steam screenshot (PR #22) | Merged; screenshot follows the light/dark theme |
| 8c | Projects list rows + screenshot lightbox (PR #23) | Merged; project rows render from content.ts, screenshot opens in a lightbox |
| 9 | Critique fixes and ideas from friends' portfolios (PR #24) | Merged; Projects before Experience, CosRec as flagship, hero Summary / TL;DR toggle, header CV button |
| 10 | FashionTech case study (PR #25) | Merged; case study page, project row and Experience entry live, Limitless Lab credited |

## 8. Constraints and risks
- **Time:** [fill in hours/week]
- **Budget:** $0 (free tier, no custom domain)
- **Riskiest part:** Making Japanese + tech style feel tasteful and clean, not cluttered
- **Don't know yet:** Japanese font loading/performance with next/font; command palette implementation

## 9. Open questions
- Limitless Lab permission to show FashionTech? (ask in writing)
- CosRec: demo, public repo, or screenshots only?
- Tagline / summary wording; tone (formal vs casual)
- CV: how will the PDF be produced and kept current?

## 10. Decisions log
See `docs/DECISIONS.md`.
