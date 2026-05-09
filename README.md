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
├── layouts/Layout.astro              HTML shell, OG/Twitter, JSON-LD Person, font preload
├── styles/global.css                 Tailwind v4 @import, @theme, @font-face, noise utils
├── components/
│   ├── Hero.tsx                      island — video BG, navbar pill, "Curious*" title
│   ├── About.tsx                     island — multi-style pull-up + scroll-linked letters
│   ├── Features.tsx                  island — terminal card + Forge / Sproutly / Homelab
│   ├── Skills.astro                  static — tag grid, 3 categories
│   ├── Contact.astro                 static — email pill + GitHub + LinkedIn
│   └── animations/
│       ├── WordsPullUp.tsx
│       ├── WordsPullUpMultiStyle.tsx
│       └── AnimatedLetter.tsx
└── pages/index.astro
public/
├── favicon.svg / favicon.ico
├── fonts/*.woff2                     5 files, ~93 KB total
├── og-image.jpg                      1200×630, extracted from hero video
├── robots.txt + sitemap.xml
└── videos/hero.mp4
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
- JSON-LD `Person` schema, OG/Twitter meta, canonical URL, static sitemap + robots
