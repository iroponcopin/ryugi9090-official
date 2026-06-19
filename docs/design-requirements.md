# Design Requirements — Ryugi9090 Animated Official Website

## 1. Project objective
Create a premium animated creator website for **竜義9090 / Ryugi9090**, a YouTube creator focused on Yukkuri gameplay commentary.

The site should function as:
- An official profile page
- A portfolio of video content
- A quick path to YouTube and X
- A bilingual landing page for Japanese and international viewers

## 2. Target audience
Primary:
- Japanese viewers who already understand Yukkuri commentary and gaming culture
- Viewers from YouTube/X looking for links and channel identity

Secondary:
- International viewers who need a simple English explanation of the channel
- Future collaborators or fans checking whether the creator has a proper official presence

## 3. Brand personality
Keywords:
- Friendly
- Energetic
- Creator-led
- Warm luxury
- Light gaming atmosphere
- Sparkle / 花火 enthusiasm
- Calm but animated

The visual positioning should be **"premium creator room"**, not "corporate agency" and not "cheap fan blog".

## 4. Visual direction
### Colour
Use the existing palette as the base:
- Ivory / warm white background
- Pearl-white content surfaces
- Gold as primary accent
- Deep bronze-gold for readable links/text accents
- Soft orange for glows and secondary highlights
- Charcoal text for contrast

Do not switch to a black/neon gaming palette unless specifically requested.

### Typography
- Japanese: Noto Sans JP / system Japanese fallback
- English: Inter / system sans
- Headings should feel strong but not aggressive.
- Keep generous line-height for Japanese body text.

### Layout
- Spacious sections with strong vertical rhythm.
- Hero should feel cinematic and instantly recognisable.
- Cards should have depth through shadow, blur, border, and motion — not heavy gradients alone.
- Mobile layout must be treated as first-class.

## 5. Page sections
### 5.1 Hero
Goal: communicate identity immediately.

Required elements:
- Creator name: `竜義9090` and/or `Ryugi9090`
- Short tagline from dictionary
- One-sentence channel description
- Primary CTA: YouTube
- Secondary CTA: X
- Featured video preview
- Decorative animated background using gold/orange particles, glints, rings, or light sweeps

Animation:
- Name/title reveal on load
- CTA reveal after title
- Featured video card floats or settles subtly
- Background glints drift slowly
- One-time hero light sweep is acceptable

### 5.2 About
Goal: humanise the creator.

Required elements:
- Short bio
- Sparkle/花火 note
- Games covered
- Visual card/avatar block

Animation:
- Split layout with staggered reveal
- Decorative badge or quote card may drift gently

### 5.3 Featured Videos
Goal: get visitors to click videos.

Required elements:
- Featured video cards from `data/config.ts`
- YouTube thumbnails
- Title, game, type
- External link behaviour

Animation:
- Cards reveal in staggered sequence
- Hover lift and thumbnail zoom
- Play icon fade on hover

### 5.4 Series
Goal: show range of content.

Required elements:
- Series list from `data/config.ts`
- Game name, description, tag
- Accent treatment for major/favourite series

Animation:
- Cards should feel tactile: hover lift, gold border glow, small icon motion

### 5.5 Upcoming Content
Goal: make future activity feel alive.

Required elements:
- NTE and Wuthering Waves cards from `upcomingContent`
- Clear "planned / upcoming" wording
- No false promises about schedule

Animation:
- Subtle timeline or "incoming signal" motif
- Avoid overclaiming launch dates

### 5.6 Creator Style
Goal: define the channel's voice.

Required elements:
- Three style points from dictionary
- Yukkuri commentary, passion, own pace

Animation:
- Step/card reveal sequence
- Optional numbered markers

### 5.7 Social CTA
Goal: final conversion point.

Required elements:
- YouTube CTA
- X CTA
- Clear channel/social descriptions

Animation:
- Large CTA panel with soft glow
- Buttons should have hover sweep

### 5.8 Legal page
Keep simple, readable, and low-animation.

## 6. Navigation requirements
- Fixed header
- Transparent on top, glass/blur after scroll
- Desktop nav with mega menu for videos
- Mobile hamburger menu
- Language switcher between `/ja` and `/en`
- Smooth anchor links

## 7. Bilingual requirements
- Japanese is the default language.
- English is available at `/en`.
- All section titles, labels, body copy, CTA text, legal text, aria labels if user-facing, and menu text must be localised.
- Keep content meaning equivalent, not word-for-word literal.

## 8. Accessibility requirements
- Respect `prefers-reduced-motion`.
- Keep sufficient colour contrast.
- Provide visible focus states.
- Use semantic landmarks.
- Do not rely on animation alone to communicate meaning.
- Buttons and menus must be keyboard reachable.
- Decorative animations must be `aria-hidden`.

## 9. Performance requirements
- Avoid huge JS bundles.
- Prefer CSS/framer-motion over adding more libraries.
- Use transform/opacity animations, not layout-thrashing properties.
- Use `will-change` sparingly.
- Keep image sizes reasonable.
- Do not autoplay heavy video backgrounds.

## 10. SEO / metadata requirements
- Metadata should describe Ryugi9090 as a Yukkuri gameplay commentator.
- `/ja` and `/en` should have language alternates.
- OpenGraph should be set where practical.
- Do not claim official affiliation with game publishers.

## 11. Definition of done
- Homepage is visually more animated and premium than the current version.
- All primary CTAs are obvious above the fold or near the top.
- Mobile experience is clean.
- Japanese and English routes both work.
- No console errors from animation hydration.
- `npm run lint` passes.
- `npm run build` passes or the exact blocker is documented.
