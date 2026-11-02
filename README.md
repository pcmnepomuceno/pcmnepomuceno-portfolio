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
- `public/` - photo, CV PDF and project screenshots
- `docs/` - project brief and decisions log

## Content

Text, projects, skills and links live in `src/content.ts`. Edit that file to change what the site says; components only render it.

## Fonts

Plus Jakarta Sans (weights 300, 400 and 500) loads through `next/font/google`. The OG image and icons are rendered by `next/og`, which cannot read woff2, so they use static TTF copies in `src/app/og-fonts/`. Plus Jakarta Sans is copyright 2020 The Plus Jakarta Sans Project Authors and licensed under the SIL Open Font License 1.1; the license text is in `src/app/og-fonts/OFL.txt`.

## Decisions

Scope decisions, deferred items and reversals are recorded in [docs/DECISIONS.md](docs/DECISIONS.md).
