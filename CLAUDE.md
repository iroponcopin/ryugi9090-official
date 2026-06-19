# CLAUDE.md — Ryugi9090 Official Site

## Mission
Build a polished, animated official website for **竜義9090 / Ryugi9090**, a Japanese Yukkuri gameplay commentator. The site should feel like a premium creator landing page: warm white, gold, and soft orange; playful enough for gaming, but not childish.

This is a **friend creator site**, not a corporate product site. Prioritise personality, motion, clarity, and fast navigation to YouTube/X.

## Current project snapshot
- Framework: **Next.js 16 App Router**
- React: **19**
- Styling: **Tailwind CSS v4** through `@theme` tokens in `app/globals.css`
- Motion: **framer-motion** is already installed
- Locales: `/ja` and `/en`
- Default route: `/` redirects to `/ja`
- Static export target appears to be `docs/` for GitHub Pages output
- Main content source:
  - `data/config.ts`
  - `i18n/ja.ts`
  - `i18n/en.ts`
- Existing reusable pieces:
  - `components/ui/SectionHeading.tsx`
  - `components/ui/ScrollDrift.tsx`
  - `components/ui/StarField.tsx`
  - `components/ui/MagneticButton.tsx`
  - `components/ui/VideoCard.tsx`

## Non-negotiables
1. **Do not downgrade the tech stack.** Keep Next.js App Router, TypeScript, Tailwind v4, and framer-motion.
2. **Do not remove bilingual support.** Every user-facing content change must update both Japanese and English dictionaries.
3. **Do not hard-code copy inside components** unless it is purely decorative and language-neutral.
4. **Do not break static deployment.** Keep GitHub Pages/static export compatibility in mind.
5. **Respect reduced motion.** Any animation must degrade cleanly under `prefers-reduced-motion`.
6. **Do not add heavy animation libraries** unless absolutely necessary. Prefer framer-motion and CSS.
7. **Do not use copyrighted game artwork unless it already exists in the repository or is supplied later.** If missing, use gradients, silhouettes, simple geometric motifs, or YouTube thumbnails.
8. **No autoplay audio/video.** Motion is fine; surprise sound is not.
9. **No editing/delete operations outside the website files unless explicitly requested.**
10. **Run checks before finalising:** `npm run lint` and `npm run build` where possible.

## Design direction
See `docs/design-requirements.md` for the full requirements definition.

Core style:
- Warm white / ivory base
- Gold primary accent
- Soft orange secondary accent
- Charcoal text
- Glass cards with restrained blur
- Apple-like motion: calm, precise, layered, premium
- Gaming personality: Yukkuri commentary, Sparkle/花火 enthusiasm, variety gaming

Avoid:
- Dark cyberpunk overload
- Neon rainbow everywhere
- Cheap template sections
- Excessive 3D gimmicks
- Tiny unreadable text
- Animation that fights the content

## User experience goal
The visitor should understand in 5 seconds:
1. This is Ryugi9090's official site.
2. He makes Yukkuri gameplay commentary.
3. Honkai: Star Rail / Sparkle is a major personality point.
4. They can watch YouTube or follow X immediately.

## Preferred page structure
Keep the existing single-page structure unless there is a strong reason to change it:
1. Hero
2. About
3. Featured Videos
4. Series
5. Upcoming Content
6. Creator Style
7. Social CTA
8. Legal / disclaimer page

Enhance rather than rebuild from scratch, unless the implementation is simpler and safer.

## Animation requirements
See `docs/animation-system.md`.

Minimum motion system:
- Hero entrance sequence
- Scroll reveal for each section
- Subtle parallax / scroll drift on decorative elements
- Hover lift on cards
- Button light sweep
- Mobile menu animation
- Mega menu animation
- Reduced-motion fallback

## Component rules
- Keep components small and purpose-specific.
- Prefer reusable motion wrappers rather than copying animation variants everywhere.
- Use semantic HTML: `section`, `nav`, `header`, `footer`, proper headings.
- Keep interactive elements keyboard accessible.
- Links opening YouTube/X must use `target="_blank"` and `rel="noopener noreferrer"`.
- Use `next/image` for local images and remote YouTube thumbnails where suitable.

## Copy/content rules
Tone:
- Japanese: casual but polished, creator-like, not stiff corporate Japanese.
- English: simple, natural, not over-translated.

Do not invent factual claims such as subscriber count, exact schedule, sponsorships, or official affiliations unless provided.

## Implementation workflow
Use this order:
1. Read `AGENTS.md` first.
2. Inspect `package.json`, `next.config.ts`, `app/globals.css`, `data/config.ts`, and locale dictionaries.
3. Confirm current behaviour locally if possible.
4. Improve design tokens only if needed.
5. Implement motion and layout enhancements section by section.
6. Keep commits/changes logically grouped.
7. Run lint/build.
8. Summarise changed files, checks run, and remaining risks.

## Acceptance criteria
The work is complete when:
- `/ja` and `/en` render correctly.
- The homepage feels intentionally animated, not merely decorated.
- Navigation, language switcher, mega menu, and mobile menu work.
- YouTube/X CTAs are prominent.
- All sections remain readable on mobile.
- Motion is disabled or drastically reduced for reduced-motion users.
- Lint/build pass or any failure is clearly explained with the exact error.

## Suggested first task for Claude Design
Implement the requirements in `docs/design-requirements.md` and `docs/animation-system.md`, improving the existing site without removing bilingual support or static export compatibility. Focus first on the hero, section transitions, video cards, and social CTA.
