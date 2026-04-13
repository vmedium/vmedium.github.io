@AGENTS.md

# vmedium.xyz — Claude Context

## Who / how we work
JT DiMartile (vmedium) — product designer, musician, visual artist. Comfortable with code, Claude writes most of it. JT provides direction and details. Be terse. No summaries at the end of responses.

## What this site is
Personal site replacing Cargo at vmedium.xyz. Next.js 16 App Router, TypeScript, CSS Modules. No Tailwind. No UI library. Deployed to GitHub Pages via Actions at https://vmedium.github.io/ (custom domain vmedium.xyz not yet wired).

## Design system
Swiss International Style — Müller-Brockmann, grid-first, type-dominant. Single source of truth: `styles/tokens.css`. Never hardcode colors, sizes, or spacing — always use tokens.

- **Type scale:** Golden ratio (×1.618) anchored at 16px. `--text-2xs` → `--text-3xl`
- **Spacing:** Same ratio. `--space-1` (4px) → `--space-8` (109px)
- **Grid:** 12-column. `--grid-gutter`, `--grid-margin`, `--grid-max-width: 1440px`
- **Color:** Black/white only. `--color-text`, `--color-bg`, `--color-surface` + subtle/muted variants. Light + dark mode via `data-theme` on `<html>`
- **Font:** System stack only. SF Pro on macOS. No web fonts.
- **Mode toggle:** `components/ui/ThemeProvider.tsx` — localStorage + `data-theme` attribute

## Content model
File-based markdown. No CMS. Parsed with `gray-matter`.

**Work / Projects / Experiments** → `content/{section}/slug.md`, read by `lib/content.ts`
```yaml
title: string
description: string
category: string
year: number
span: 3 | 4 | 6 | 8 | 12   # grid column span
tags: string[]
```

**Blog** → `content/blog/slug.md`, read by `lib/blog.ts`
```yaml
title: string
description: string
date: "YYYY-MM-DD"
tags: string[]
```

Adding content = drop a `.md` file + push. GitHub Actions deploys automatically.

## Routes
| Route | Notes |
|---|---|
| `/` | Modular grid of all projects (all sections combined) |
| `/work` + `/work/[slug]` | Client projects |
| `/projects` + `/projects/[slug]` | Personal/self-initiated |
| `/experiments` + `/experiments/[slug]` | Browser toys, generative tools |
| `/blog` + `/blog/[slug]` | Writing — AI methods, design, process |
| `/about` | Two-column: bio left, info/links right |
| `/store` | Stub — "Coming Soon" |
| `/private` | Client-side password gate via sessionStorage. Password: `NEXT_PUBLIC_PRIVATE_PASSWORD` env var |

## Key files
| File | Purpose |
|---|---|
| `styles/tokens.css` | All design tokens — edit here first |
| `styles/globals.css` | Reset + utilities: `.container`, `.label`, `.mono`, stub page classes |
| `components/ui/ProjectCard.tsx` | Card component — `data-span` attribute, grid overlay on hover |
| `components/ui/ProjectGrid.tsx` | 12-col grid. Brockmann span sequence: `[6,3,3,4,8,6,6,4,4,4,12,3,3,6]` |
| `components/ui/Prose.tsx` | Markdown body renderer (`react-markdown` + `remark-gfm`) |
| `components/ui/DebugPanel.tsx` | Floating GRID button (fixed top-right, z-9999). Always-on ghost grid (dashed gutter hairlines). GRID toggle shows measurement panel + forces card overlays blue via `data-debug` on `<html>` |
| `components/layout/Nav.tsx` | Fixed 48px top bar. Logo left, nav links right, mode toggle |
| `components/layout/Footer.tsx` | Copyright + social links — update URLs here |
| `lib/content.ts` | Reads work/projects/experiments markdown |
| `lib/blog.ts` | Reads blog markdown |

## Images
No real images yet. Placeholders are `--color-surface` blocks. Card aspect ratio: `8/3`. Detail page hero: `16/9`.

## Deployment
- Repo: https://github.com/vmedium/vmedium.github.io
- **To deploy: `git push origin main`** — GitHub Actions handles the rest automatically
- Pipeline: push → `.github/workflows/deploy.yml` → `npm ci` → `next build` → `out/` → GitHub Pages
- Monitor builds: https://github.com/vmedium/vmedium.github.io/actions
- Static export: `output: "export"` in `next.config.ts` (required for GitHub Pages — no server)
- **Why `vmedium.github.io` works without a basePath:** GitHub Pages serves repos named `<username>.github.io` at the root URL (`https://vmedium.github.io/`). Any other repo name would need `basePath: '/<reponame>'` in `next.config.ts` or all links/assets break. Do not rename the repo.
- Set `PRIVATE_PASSWORD` as a GitHub Actions secret for the `/private` route

## What's stubbed / not yet built
- Store (just "Coming Soon")
- Real images
- `/private` content (auth works, content is blank)
- Contact form, newsletter
- Custom domain DNS (point vmedium.xyz → GitHub Pages IPs, then add in repo Settings → Pages)
- Vercel migration (consider when store/API routes are needed)

## Hard rules
- Tokens only — no hardcoded values
- CSS Modules only — no additions to globals except established utilities
- No new dependencies without reason. Current: `gray-matter`, `react-markdown`, `remark-gfm`
- Content in `content/` only — never hardcoded in components
- Grid spans must be 3, 4, 6, 8, or 12
- Commit after every completed task — before starting the next one
