# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
Primary: recruiters and hiring managers (PH entry-level, remote/global) who scan quickly for proof the owner can ship. Secondary: freelance clients and fellow developers. Today they see a LinkedIn profile, GitHub and a PDF resume; none of these show projects or personality together.

## Product Purpose
Prince Czedrick Nepomuceno's (nickname Czed) personal portfolio: an easily accessible resume that shows projects, experience and the ability to ship. It is a portfolio piece, real use in job applications, and a personal brand (anime / J-pop culture). Success: a recruiter reaches experience, featured projects and contact or CV in one short visit.

## Positioning
A resume PDF plus links cannot show shipped projects and personality in one place. This site does, and its own build quality is part of the evidence.

## Operating Context
Single-page static site with anchored sections: Home, Projects, Experience, Skills, Contact, plus one FashionTech case-study page at /projects/fashiontech. Hosted on Vercel free tier at pcmnepomuceno.vercel.app. Content lives in a typed `src/content.ts`. Scope, milestones and out-of-scope live in `docs/PROJECT_BRIEF.md`, which wins on those; this file owns audience, tone and design intent.

## Capabilities and Constraints
- Static: no backend, database, auth, CMS or blog in v1. Chatbot, /now page and hackathon log are v2.
- Light/dark mode following system preference with manual override; responsive; SEO/OG metadata; downloadable CV.
- Minimal animation only (subtle scroll reveals); no heavy animation, 3D or page transitions.
- Some projects are excluded until readiness is confirmed; nothing is shown beyond what is in src/content.ts. FashionTech (Limitless Lab) may show its name, the owner's role, screenshots and a written case study, with Limitless Lab credited; never code, a repo, a live demo, the pitch deck or slide templates, Firebase config or keys, or real-looking personal data.
- No claims about experience or projects beyond `src/content.ts`.
- Decided: CosRec is shown as an in-progress card with no links until a live demo exists; tagline and summary wording are decided; the CV is produced by the owner and replaced manually in `public/cv/`.

## Brand Commitments
Light, clean, techy, Japanese-red visual style; visual style only, no Japanese text. Voice: casual-professional, first person, plain, light personality, no buzzwords (assumed; to be confirmed by owner).

## Evidence on Hand
- Steam Review Analyzer: project is finished and the owner can show it.
- CosRec: shown as an in-progress card with no links until a live demo exists.
- Sablay photo and CV PDF: exist in `public/` and are in use.
- FashionTech: five dummy-data screenshots and the written case study, shown with permission from Limitless Lab (see docs/DECISIONS.md).
- Not available and not to be invented: testimonials, metrics, employer or client claims beyond `src/content.ts`.

## Product Principles
- Proof over polish: real projects and links come before decoration.
- Scannable in under a minute for a recruiter, with depth one click away.
- Claim only what `src/content.ts` supports.
- Personality stays light; clarity and craft come first.
- Restraint: minimal motion, no clutter.
