# Ryugi9090 Official Site — Project Notes

This repository contains a bilingual animated creator website for **竜義9090 / Ryugi9090**.

## Key routes
- `/ja` — Japanese homepage
- `/en` — English homepage
- `/ja/legal` — Japanese legal/disclaimer page
- `/en/legal` — English legal/disclaimer page

## Main editing points
- `data/config.ts` — creator profile, videos, series, upcoming content
- `i18n/ja.ts` — Japanese copy
- `i18n/en.ts` — English copy
- `app/globals.css` — Tailwind v4 design tokens and global animation CSS
- `components/sections/*` — homepage sections
- `components/layout/*` — header/footer/navigation
- `components/ui/*` — reusable interface/motion components

## Development
```bash
npm install
npm run dev
npm run lint
npm run build
```

## Design brief
See:
- `CLAUDE.md`
- `docs/design-requirements.md`
- `docs/animation-system.md`
- `docs/implementation-plan.md`
