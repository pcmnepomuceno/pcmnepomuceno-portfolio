# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Czed's personal portfolio website. Light, clean, techy, Japanese-red visual style (visual style only, no Japanese text). Scope, milestones, open questions and decisions log: `docs/PROJECT_BRIEF.md`.

## Stack

- Next.js 16 App Router, React 19, TypeScript strict, path alias `@/*` → `src/*`.
- Tailwind CSS v4 via `@tailwindcss/postcss` and `postcss.config.mjs` (not the turbopack loader). `globals.css` is `@import "tailwindcss"`; no `tailwind.config`.
- next-themes (theming), Motion (minimal scroll reveals).
- Static site. No backend, database, auth, CMS or blog in v1. Chatbot is v2.
- Layouts use Next's global `LayoutProps<"/">` type (no import).
- This Next version may differ from training data; check `node_modules/next/dist/docs/` before using unfamiliar APIs.

## Commands

- `npm run dev` — dev server (http://localhost:3000)
- `npm run build` — production build
- `npm run lint` — ESLint (flat config)
- No test runner configured.

## Folder structure (target)

- `src/app/` — `layout.tsx`, `page.tsx`, `globals.css`: routes, theme provider, tokens
- `src/components/sections/` — Hero, Experience, Projects, Skills, Foundations, Contact
- `src/components/ui/` — small reusable pieces
- `src/content.ts` — all data, typed (Profile, ExperienceItem, Project, SkillGroup). Content is not hardcoded in components.
- `public/` — photo, CV PDF, og-image
- `docs/` — `PROJECT_BRIEF.md` and decisions

## Rules

- Never commit `.env` files.
- Ask before adding any new dependency.
- Minimal animation only.
- No claims about experience or projects beyond what is in `content.ts`.
- FashionTech (Limitless Lab): the project name, the owner's role, screenshots and a written case study are allowed, and Limitless Lab must be credited wherever it's shown. NEVER add source code or snippets, a repo link or public repo, a live demo, the pitch deck or any slide template, Firebase config or keys, or real-looking personal data. Screenshots must show dummy data only.
- `next.config.ts` keeps `agentRules: false` (stops Next generating AGENTS.md).
- docs/PROJECT_BRIEF.md owns scope, milestones and out-of-scope. PRODUCT.md owns audience, tone and design intent. If they conflict, stop and ask me.
- Log every non-trivial decision, including deferred items and reversals, in docs/DECISIONS.md (append-only).

## Workflow

One milestone at a time, branch per milestone, plan mode first, small logical commits. Stop only when a decision is the user's.

## Status

Skills by depth + Technical foundations merged (PR #29, squash `4ca1c12`) and live. Follow-up PRs pending, listed in `docs/DECISIONS.md` (2026-10-21, "After skills").
