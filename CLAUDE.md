# Dev Portfolio — Claude Instructions

## Projekt

Statische Portfolio-Website unter `https://portfolio.stng.dev`.

**Tech Stack:** Astro 6.x, plain CSS (scoped + global CSS Custom Properties), Fira Code (Google Fonts), Cloudflare Pages

## Lokales Verzeichnis

`~/Projekte/portfolio/`

## Deployment-Workflow

```
git push (Gitea) → Mirror zu GitHub (MrxTS/portfolio) → Cloudflare Pages Auto-Build → Live
```

Push zu Gitea genügt — der Rest ist automatisch (~1 Min bis Live).

## Struktur

```
src/
├── layouts/Layout.astro   ← HTML-Shell, globale CSS-Variablen, Fira Code
├── components/
│   ├── Nav.astro           ← Sticky Navigation
│   ├── Hero.astro          ← Intro: Name, Rollen, Bio, CTAs
│   ├── About.astro         ← Bio + Quick Facts
│   ├── Projects.astro      ← Projekt-Karten Grid
│   ├── Skills.astro        ← Skill-Tags nach Kategorien
│   └── Contact.astro       ← E-Mail, GitHub, LinkedIn
└── pages/index.astro       ← Alle Komponenten zusammengesetzt
public/favicon.svg
```

## CSS-Variablen (in Layout.astro)

Alle Farben ausschließlich via Custom Properties — keine Hex-Werte in Komponenten:
`--bg`, `--surface`, `--border`, `--border-subtle`, `--text-primary`, `--text-secondary`, `--text-subdued`, `--accent-blue`, `--accent-green`, `--accent-red`, `--accent-purple`, `--font`, `--max-width`

## Remotes

| Remote | URL |
|--------|-----|
| Gitea (primär) | `git@192.168.178.37:pangbae/portfolio.git` |
| GitHub (Mirror) | `https://github.com/MrxTS/portfolio` |

## Build & Check

```bash
npm run build        # Produktionsbuild
npx astro check      # TypeScript-Check
npm run dev          # Dev-Server auf :4321
```
