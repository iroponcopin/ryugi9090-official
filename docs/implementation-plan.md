# Implementation Plan — Ryugi9090 Animated Website

## Phase 1 — Baseline audit
- Read `AGENTS.md`.
- Review current Next.js version docs if needed because this repo explicitly warns that the version has breaking changes.
- Run:
  ```bash
  npm install
  npm run lint
  npm run build
  ```
- Note existing failures before changing code.

## Phase 2 — Motion foundation
- Create or consolidate shared motion constants if helpful, e.g. `components/motion/variants.ts`.
- Ensure reduced-motion handling is consistent.
- Keep existing `StarField`, `ScrollDrift`, and `SectionHeading` unless replacing them clearly improves maintainability.

## Phase 3 — Hero upgrade
- Strengthen the above-the-fold composition.
- Make the YouTube CTA visually dominant.
- Add layered gold/orange decorative motion.
- Improve featured video presentation.
- Confirm mobile hero order is excellent.

## Phase 4 — Content sections
- Apply consistent section reveals.
- Improve card depth and spacing.
- Use staggered reveals for videos, series, upcoming, and style cards.
- Preserve existing data-driven structure.

## Phase 5 — Navigation polish
- Confirm desktop nav and video mega menu feel premium.
- Confirm mobile menu and accordion work smoothly.
- Ensure language switcher remains obvious.

## Phase 6 — Final QA
Run:
```bash
npm run lint
npm run build
```

Manual checks:
- `/ja`
- `/en`
- `/ja/legal`
- `/en/legal`
- Desktop width
- Tablet width
- Mobile width
- Reduced motion
- Keyboard navigation

## Output summary format
When finished, report:
- Files changed
- Design improvements made
- Animation improvements made
- Checks run and results
- Remaining risks / TODOs
