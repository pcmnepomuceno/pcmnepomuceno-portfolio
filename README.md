# Portfolio

Personal portfolio website of Prince Czedrick Nepomuceno (Czed): a single-page static site with experience, projects, skills, contact details and a downloadable CV.

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
- `src/components/sections/` - Hero, Experience, Projects, Skills, Contact
- `src/components/ui/` - small reusable pieces
- `src/content.ts` - all site content, typed
- `public/` - photo and CV PDF
- `docs/` - project brief and decisions log

## Content

Text, projects, skills and links live in `src/content.ts`. Edit that file to change what the site says; components only render it.

## Decisions

Scope decisions, deferred items and reversals are recorded in [docs/DECISIONS.md](docs/DECISIONS.md).
