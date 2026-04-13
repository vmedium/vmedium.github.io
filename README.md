# vmedium.xyz

Personal site for JT DiMartile — product designer, musician, visual artist.

**Live:** https://vmedium.github.io  
**Stack:** Next.js 16 App Router · TypeScript · CSS Modules · GitHub Pages

---

## Running locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Adding content

Drop a markdown file in the right folder and push. GitHub Actions builds and deploys automatically.

### Work / Projects / Experiments

`content/work/slug.md`, `content/projects/slug.md`, `content/experiments/slug.md`

```md
---
title: "Project Title"
description: "One sentence description."
category: "Product Design"
year: 2025
span: 6
tags: ["Tag One", "Tag Two"]
---

Prose content goes here. Supports full markdown.
```

`span` controls the grid column width on index pages: `3 | 4 | 6 | 8 | 12`

### Blog

`content/blog/slug.md`

```md
---
title: "Post Title"
description: "One sentence description."
date: "2025-04-01"
tags: ["AI", "Design"]
---

Post prose goes here.
```

## Environment variables

```bash
cp .env.example .env.local
```

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_PRIVATE_PASSWORD` | Password for the `/private` route |

For GitHub Pages deployment, set `PRIVATE_PASSWORD` as a repository secret (Settings → Secrets and variables → Actions).

## Design system

All tokens are in `styles/tokens.css`. Do not hardcode values — always reference tokens.

- **Type:** Golden ratio scale (×1.618) from 16px base
- **Spacing:** Same golden ratio scale
- **Grid:** 12-column, 1440px max width
- **Color:** Black/white, light + dark mode via `data-theme` attribute
- **Font:** System stack — SF Pro on macOS, no web fonts loaded

## Debug panel

Click the **GRID** button (top-right corner) to open a panel showing all element widths and grid measurements. "Show cols" overlays the 12-column grid structure.

## Deployment

Push to `main` — GitHub Actions runs the build and deploys to GitHub Pages automatically.

To deploy the private route password: add `PRIVATE_PASSWORD` to repository secrets.

To use a custom domain: add DNS records pointing to GitHub Pages, then set the custom domain in repo Settings → Pages.

## Project structure

```
app/                    # Next.js App Router pages
  work/
  projects/
  experiments/
  blog/
  about/
  store/
  private/
components/
  layout/               # Nav, Footer, SectionHeader
  ui/                   # ProjectCard, ProjectGrid, Prose, DebugPanel, ThemeProvider
content/                # Markdown files — edit these to update content
  work/
  projects/
  experiments/
  blog/
lib/
  content.ts            # Reads work/projects/experiments markdown
  blog.ts               # Reads blog markdown
styles/
  tokens.css            # Design tokens — single source of truth
  globals.css           # Reset + global utilities
.github/workflows/
  deploy.yml            # GitHub Actions deploy pipeline
```
