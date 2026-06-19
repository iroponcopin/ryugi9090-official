# Animation System — Ryugi9090 Official Site

## Motion principle
Motion should feel like **controlled energy**: polished enough for a premium site, lively enough for a gaming creator.

Use animation to guide attention, not to show off.

## Global easing
Use the existing spring-like easing:

```ts
const EASE = [0.16, 1, 0.3, 1] as const
```

For CSS, use:

```css
var(--ease-spring)
```

## Standard timings
- Micro hover: 150–250ms
- Card hover lift: 220–300ms
- Section reveal: 550–800ms
- Hero sequence: 900–1600ms total
- Background drift: 12–28s loop
- Light sweep: 1.8–2.8s, one-time or hover only

## Reduced motion
Every component with motion must check one of:
- `useReducedMotion()` from framer-motion
- local `window.matchMedia('(prefers-reduced-motion: reduce)')`
- global CSS reduced-motion override

Reduced-motion behaviour:
- Keep opacity fades if necessary.
- Remove parallax, large transforms, continuous loops, and hover displacement.
- Do not remove content.

## Recommended reusable variants
```ts
export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

export const softScale = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1 },
}

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.08,
    },
  },
}
```

When reduced motion is enabled, override `y` and `scale` to neutral values.

## Section reveal pattern
Each major section should:
1. Fade/slide the section label.
2. Reveal the heading using the existing line-mask pattern.
3. Draw a gold divider line.
4. Stagger child cards.

Existing component to use:
- `components/ui/SectionHeading.tsx`

## Hero animation sequence
Suggested sequence:
1. Background glints appear subtly.
2. Small tagline fades in.
3. Main title reveals upward.
4. Description fades in.
5. CTAs slide in together.
6. Featured video card settles with slight scale.
7. Hero light sweep passes once.

Do not delay the CTA for too long. This is a landing page, not a loading screen.

## Card hover pattern
For video/series cards:
- Lift: `y: -4` to `-8`
- Border glow: gold/soft orange
- Thumbnail/image scale: `1.03` to `1.06`
- Play icon or badge opacity: fade in/out

Avoid rotation unless extremely subtle.

## Background motion
Allowed:
- Slow particles/glints
- Soft radial gradients
- Small parallax movement
- Light sweep overlays
- Gentle floating cards/badges

Avoid:
- Heavy canvas/WebGL unless requested
- Constant fast movement
- Animated noise that impacts performance
- Anything that makes text harder to read

## Mega menu motion
Desktop video mega menu:
- Animate opacity + y + slight scale.
- Close cleanly on outside hover/focus behaviour.
- Keep keyboard accessibility intact.

Mobile video accordion:
- Animate height + opacity.
- Keep tap targets comfortable.

## Scroll motion
Use `ScrollDrift` sparingly for decorative elements or hero/section accents.

Recommended ranges:
- Decorative blobs: `y: [-20, 20]`
- Feature card settle: `y: [24, 0]`, `scale: [0.98, 1]`
- Do not apply aggressive parallax to body text.

## Testing checklist
- Test with normal motion.
- Test with reduced motion enabled.
- Test mobile menu open/close.
- Test language switching.
- Test keyboard tab order.
- Test build output.
