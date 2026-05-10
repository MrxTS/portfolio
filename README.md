# portfolio.stng.dev

Personal developer portfolio — cinematic dark, hero video background, framer-motion typography. Live at [portfolio.stng.dev](https://portfolio.stng.dev).

## Stack

- **Astro 6** static site with **React 19** islands (`@astrojs/react`)
- **Tailwind v4** via `@tailwindcss/vite` — CSS-first config in `src/styles/global.css`
- **framer-motion** — pull-up text, scroll-linked letter opacity, `prefers-reduced-motion` aware
- **lucide-react** — icon set (Flame, Sprout, Server, Check, ArrowRight)
- Self-hosted **Almarai** + **Instrument Serif** as `woff2` (DSGVO, no Google Fonts CDN)
- Self-hosted hero video (`+faststart`, no audio, ~1.4 MB)
- Hosted on **Cloudflare Pages**

## Structure

```
src/
├── layouts/Layout.astro              HTML shell with per-page title/description/path/ogImage
│                                     props, OG/Twitter meta, JSON-LD Person (root only),
│                                     font preload
├── styles/global.css                 Tailwind v4 @import, @theme, @font-face, noise utils
├── components/
│   ├── Hero.tsx                      island — video BG, navbar pill, "Curious*" title
│   ├── About.tsx                     island — multi-style pull-up + scroll-linked letters
│   ├── Features.tsx                  island — terminal card + Forge / Sproutly / Homelab
│   │                                 + "On the workbench" strip (Meadowlight)
│   ├── Skills.astro                  static — tag grid, 3 categories
│   ├── Contact.astro                 static — email pill + GitHub + LinkedIn
│   └── animations/
│       ├── WordsPullUp.tsx
│       ├── WordsPullUpMultiStyle.tsx
│       └── AnimatedLetter.tsx
├── og-sources/                       SVG sources for the per-project OG cards
│   ├── forge.svg
│   ├── sproutly.svg
│   └── homelab.svg
└── pages/
    ├── index.astro                   home
    └── projects/
        ├── forge.astro               iOS habit tracker · backend live
        ├── sproutly.astro            iOS baby tracker · backend live
        └── homelab.astro             self-hosted production stack · live
public/
├── favicon.svg / favicon.ico
├── fonts/*.woff2                     5 files, ~93 KB total
├── og-image.jpg                      1200×630, home OG (extracted from hero video)
├── og-forge.jpg                      1200×630, per-project OG cards rendered
├── og-sproutly.jpg                   from src/og-sources/*.svg
├── og-homelab.jpg
├── robots.txt + sitemap.xml
└── videos/hero.mp4
```

## Project detail pages

Each project under `/projects/<slug>` ships with the same shell (back link, hero,
stack, architecture diagram, decisions, code excerpt, CTA) and its own OG card.
Code excerpts come straight from the source repos — nothing invented.

To re-render an OG image after editing its SVG source:

```bash
rsvg-convert -w 1200 -h 630 src/og-sources/forge.svg -o /tmp/og.png
magick /tmp/og.png -quality 88 public/og-forge.jpg
```

## Commands

| Command            | Action                                       |
| :----------------- | :------------------------------------------- |
| `npm install`      | Install dependencies (Node ≥ 22.12)          |
| `npm run dev`      | Dev server at `localhost:4321` with HMR      |
| `npm run build`    | Production build → `./dist/`                 |
| `npm run preview`  | Preview the production build locally         |
| `npx astro check`  | TypeScript + Astro diagnostics               |

## Deployment

```
git push (Gitea master) → mirror to GitHub → Cloudflare Pages auto-build → live (~1 min)
```

Only pushes to `master` trigger a Cloudflare build. Feature branches stay local until merged.

## A11y & Performance

- `<MotionConfig reducedMotion="user">` in every React island — animations resolve instantly when the OS sets `prefers-reduced-motion`
- Hero `<video>` autoplay disabled under reduced motion; `poster="/og-image.jpg"` as fallback
- Almarai-400 preloaded (above-the-fold critical), all fonts use `font-display: swap`
- JSON-LD `Person` schema on the root page, OG/Twitter meta, per-page canonical URL, static sitemap + robots
