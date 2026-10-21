# Portfolio

Personal portfolio website of Prince Czedrick Nepomuceno (Czed): a single-page static site with experience, projects, skills, technical foundations, contact details and a downloadable CV.

Live: https://pcmnepomuceno.vercel.app

## Stack

- Next.js (App Router) and React
- TypeScript
- Tailwind CSS
- next-themes (light and dark theme)

## Run it

```bash
npm install
npm run dev     # dev server at http://localhost:3000
npm run build   # production build
npm run lint    # ESLint
```

## Structure

- `src/app/` - layout, page, global styles and design tokens, metadata and icon routes
- `src/components/sections/` - Hero, Experience, Projects, Skills, Foundations, Contact
- `src/components/ui/` - small reusable pieces
- `src/content.ts` - all site content, typed
- `public/` - photo and CV PDF
- `docs/` - project brief and decisions log

## Content

Text, projects, skills and links live in `src/content.ts`. Edit that file to change what the site says; components only render it.

## Fonts

Inter and JetBrains Mono load through `next/font/google`. The heading font is a self-hosted file, `src/app/fonts/NotoSerifJP-600-latin.woff2`: Noto Serif JP, weight 600, latin subset only. It is copyright (c) 2017-2024 Adobe and licensed under the SIL Open Font License 1.1 (https://openfontlicense.org). The full license text is not bundled in the repo; add an `OFL.txt` next to the font if the license requires it for your use.

## Decisions

Scope decisions, deferred items and reversals are recorded in [docs/DECISIONS.md](docs/DECISIONS.md).
