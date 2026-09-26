# Rehan Sha — Cinematic Portfolio

A Next.js (App Router) portfolio with a fullscreen cinematic photo hero,
a Three.js warm bokeh particle atmosphere, and GSAP entrance/scroll animations,
followed by About / Projects / Skills / Achievements / Contact sections built
from the resume.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Project structure

```
app/
  layout.jsx          Root layout + fonts/metadata
  page.jsx             Assembles VideoIntro + content sections, GSAP ScrollTrigger reveals
  page.module.css       Styles for About/Projects/Skills/Achievements/Contact
  globals.css           Design tokens: color, type, spacing
components/
  VideoIntro.jsx         Fullscreen sticky hero: fg/bg portrait image, GSAP timeline
  VideoIntro.module.css  Hero-specific styles (glassmorphism, gradients, typography)
  CinematicLayer.jsx     Three.js additive-blended bokeh particle layer w/ mouse parallax
public/images/
  profile.jpg             Portrait used as both fg and blurred bg hero layer
```

## Design system

- **Background**: near-black `#0A0908` ("void")
- **Accent (warm)**: `#FF8C42` — practical amber light, echoed in the particle layer
- **Accent (cool)**: `#4A6FA5` — monitor-glow blue, used sparingly for data/stat accents
- **Display type**: Fraunces (serif, credits-style huge stacked name)
- **Body type**: Inter
- **Utility/mono type**: IBM Plex Mono (uppercase, tracked-out labels — film-credit feel)

## Notes

- The hero section is `position: sticky` so the next section slides over it as the
  user scrolls — an intentional cinematic "reveal" rather than a hard cut.
- The foreground portrait uses a slow CSS Ken Burns zoom for a cinematic feel.
- The Three.js layer disposes all GPU resources (geometry, material, textures,
  renderer) on unmount and pauses rendering via `IntersectionObserver` when the
  hero scrolls out of view, to stay GPU-light.
- Reduced-motion users get all CSS animations shortened to near-zero via
  `prefers-reduced-motion` in `globals.css`.

## Deploy

- **Vercel**: import this repo/folder at vercel.com/new — Next.js is auto-detected, no config needed.
- **Render**: create a Web Service, build command `npm install && npm run build`, start command `npm start`.

Before deploying, drop in real links for LinkedIn / GitHub / CodeChef in the
Contact section of `app/page.jsx` (currently `#` placeholders).
