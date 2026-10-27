# Portfolio redesign spec (Sumi & Washi / Emaki)

Source: Stitch exports (stitch_minimalist_emaki_*), decisions from 2026-10-27. Goal: replace the cream/serif/mono "AI minimal" look with a calm Japanese-minimal design that uses real color blocks. No Japanese text anywhere.

## Decisions
- Theme follows system (next-themes defaultTheme="system", enableSystem); manual toggle stays. Toggle shows an icon, not the word "Dark".
- Desktop (>=1024px, no reduced-motion): horizontal emaki panels. Mobile and prefers-reduced-motion: normal vertical scroll. Every section is reachable by top nav anchors and keyboard; no content hidden behind interaction.
- Photo goes in the hero (right side), cropped tighter (head + upper chest), not mirrored.

## Tokens
Light: canvas #F2EDE4, surface #E8E2D7, ink #1A1614, ink-2 #635C56, hairline #D6CEBF, vermilion #D7261E.
Dark: canvas #1A1614, surface #231F1C, ink #F2EDE4, ink-2 #A39A8E, hairline #2C2622, vermilion #E63930, indigo band #121826.
Font: Plus Jakarta Sans only (next/font), weights 300/400/500. Sentence case. No serif, no monospace, no all-caps labels. Remove Noto Serif JP.
Shapes: radius 0-4px, 1px hairlines, no shadows, no gradients, no pills.

## Color bands (the fix for "too few colors")
Light: Intro paper / Projects surface / Experience ink band / Skills paper / Contact vermilion band.
Dark: Intro canvas / Projects surface / Experience indigo band / Skills canvas / Contact vermilion band.
Seal: small vermilion square with the letter "C" (header and footer only).

## Sections
- Intro: name, one-line headline, 2 short sentences, links (email, CV, GitHub, LinkedIn), photo.
- Projects: CosRec featured large with a REAL screenshot and Live demo; Steam Review Analyzer, FashionTech (case-study link stays), PICSEL as simple list rows with type label on the right. No tag chips; technologies named in one sentence.
- Experience: Limitless Lab (Software Engineer Intern), UPLB CS Society (VP for External Affairs), UP Soma Soshiki (Secretary and Secretariat Committee Lead). Year label + one plain sentence each.
- Skills: grouped by depth (Core / Used in projects / Coursework exposure) + Technical foundations (CMSC 180 labs solo; CMSC 127 expense manager group; CMSC 124 LOLCODE interpreter group; OS and deep-learning lines). Keep existing approved copy.
- Contact: vermilion band, email + copy, GitHub, LinkedIn, Download CV.

## Remove
`~/section` eyebrows, "Panel 01 - Prologue" labels, TL;DR toggle, availability dot/badge, thesis/stamp badges, repeated identical cards, kanji in the seal, floating nav overlapping content.

## Copy rules
Plain, short sentences. Banned words: quiet, restraint, contemplative, precision (as filler), "thoughtful". No invented metrics or achievements. No years of experience. Phone stays on the CV only.
Verify before showing: CosRec 97.8% Top-K (know K); Steam F1 0.780 vs baseline 0.000 (baseline looks wrong); "Vision Transformer fine-tuning" and Docker (list only if actually done).

## Nav
Same names on desktop and mobile: Intro, Projects, Experience, Skills, Contact. Progress indicator (02 / 05) on desktop; must not overlap content.

## PR plan (each testable, committable, phone-checked on Vercel preview)
1. Tokens, font, system theme, remove serif/mono/eyebrows/badges.
2. Hero + photo + header/nav.
3. Projects (featured CosRec + rows) + FashionTech case-study restyle.
4. Experience (ink/indigo band) + Skills/Foundations restyle.
5. Contact vermilion band + footer.
6. Desktop horizontal emaki scroll + progress nav + reduced-motion/mobile fallback + keyboard.
7. Cleanup, Lighthouse (mobile) and a11y pass.