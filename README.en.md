# Rackora

English | [简体中文](README.md)

Rackora is a content-first theme for Halo 2.x. It is designed for independent blogs, knowledge bases, technical documentation, and other sites that need a calm, durable publishing surface. The theme provides responsive reading, light/dark modes, article navigation, syntax highlighting, and page-level SEO without adding a separate frontend runtime.

Current release: `v0.9.2`

## Who It Is For

- Independent publishing, technical writing, product documentation, and personal knowledge bases.
- Sites with long Chinese or English titles, code, tables, and long-form articles.
- Sites that want the theme to own presentation while Halo plugins provide search, RSS, comments, links, caching, and backups.

Rackora reimplements an information hierarchy inspired by [Fuwari](https://github.com/saicaca/fuwari). It does not copy Fuwari Astro components or styles and does not require Astro, Svelte, Tailwind, or Pagefind at runtime. Fuwari is MIT-licensed; Rackora is released under GPL-3.0.

## Features

- Homepage profile sidebar, sortable social links, native site statistics, category index, and post-count-ranked popular tags.
- Eleven standard Halo routes: home, post, page, archive, tag, category, author, links, and 404 templates, plus About and Documentation custom templates.
- Responsive navigation with nested menus, back-to-top control, reduced-motion support, and light, dark, and print styles.
- Author information, reading progress, reading time, table of contents, heading anchors, copy-link action, related posts, series, and adjacent-post navigation.
- Highlight.js syntax highlighting with on-demand language bundles, code-copy controls, responsive tables, image lightbox, and VPS product-table detection.
- X, Facebook, LinkedIn, Reddit, Telegram, WhatsApp, Weibo, email, and copy-link sharing, each configurable in the theme settings.
- Halo comment, search, and footer extension points, with official RSS and Links plugin integration.
- One page H1, self-referencing canonical URLs, Open Graph, Twitter Cards, breadcrumbs, and WebSite / Organization / BlogPosting / TechArticle JSON-LD.
- Optional GA4, Microsoft Clarity, Baidu Analytics, ICP, public-security filing details, structured ad slots, and affiliate disclosures.

## Compatibility

- Halo `>= 2.20.0`
- Node.js 24
- pnpm `10.33.0`

## Installation

### Install from a release

1. Download `theme-rackora-X.Y.Z.zip` from [GitHub Releases](https://github.com/everett7623/halo-theme-rackora/releases).
2. Open Halo Console → Theme Management → Upload Theme, then select the ZIP.
3. Enable Rackora. After upgrading an existing installation, click “Reload configuration” in Theme Management so new or changed settings become available.
4. Check the site title, subtitle, menus, category descriptions, search/comments plugins, and public routes.

### Build from source

```powershell
pnpm install
pnpm build
```

Upload `dist/theme-rackora-X.Y.Z.zip` after the build completes. The theme directory and `metadata.name` in `theme.yaml` must remain `theme-rackora`.

## Logo Setup

Logo uploads are located at **Theme Settings → Appearance**, not under the SEO field named “Organization Logo”. If the fields are missing after an install or upgrade, click “Reload configuration” in Halo Theme Management first.

1. Choose a value under “Logo display mode”.
2. Choose `1:1 Square Logo + site title`, then upload the “1:1 Square Logo” shown below it. The header and homepage profile show the square image together with the Halo site title and subtitle.
3. Choose `3:1 Wide Logo (text included in image)`, then upload the “3:1 Wide Logo” shown below it. The header and homepage profile show the image directly and do not repeat the title text.

SVG, PNG, and WebP are recommended. Only the upload field for the selected mode is displayed; switching modes does not delete the other image. Fallbacks are:

- Square mode: theme square logo → Halo Site Logo → Rackora default mark.
- Wide mode: theme wide logo → square logo plus site title.

The SEO “Organization Logo” field is used only for Organization / WebSite structured data. It does not control the visible header or homepage profile logo.

## Theme Settings

The settings page is organized into nine groups:

| Group        | Main options                                                                                     |
| ------------ | ------------------------------------------------------------------------------------------------ |
| Basic        | Interface/site language, region, social links, RSS, footer, credits, site stats, and launch date |
| Appearance   | Logo mode and uploads, colors, accent, covers, banner, homepage copy, site width, and font scale |
| Sidebar      | Homepage sidebar, profile, categories, popular tags, and tag count                               |
| Post         | Post sidebar, sharing targets, lightbox, related posts, series, and license notice               |
| Integrations | Official Links page and footer entry                                                             |
| SEO          | Tag/archive indexing policy, site verification, and Organization entity                          |
| Analytics    | GA4, Microsoft Clarity, and Baidu Analytics IDs; disabled by default                             |
| Ads          | Global switch, disclosure text, and sortable placements                                          |
| Filing       | ICP and public-security filing numbers and URLs                                                  |

The site title, subtitle, and global description come from Halo site settings. Legacy `content.*` and `stats.*` configuration keys remain readable for upgrades.

## Plugin Boundary

Rackora owns the frontend shell, syntax highlighting, table of contents, tag presentation, back-to-top control, frontend analytics hooks, and page-level SEO structure. It does not replace server-side Sitemap, search, RSS, comments, friend links, caching, backups, authentication, or content storage.

Keep Halo Sitemap, Search Widget, RSS, Comment Widget, Links, Page Static Cache, and Automatic Backup when those services are needed. Older themes may leave plugins such as Time Factor SEO enabled; they are not Rackora dependencies and will duplicate canonical, Open Graph, and article JSON-LD output. See [`docs/plugin-compatibility.md`](docs/plugin-compatibility.md) for the responsibility matrix.

## Content Metadata

Rackora registers Halo metadata fields for:

- Posts: primary keyword, search intent, promotion relationship, content verification date, next review date, and manually confirmed Pillar status.
- Tags: indexing policy and visible summary.
- Categories: featured-post entry.

Primary keywords are editorial review data only; the theme does not emit ineffective `meta keywords` or infer Pillar structure from tags.

## Development and Validation

```powershell
pnpm install
pnpm check
pnpm build-only
pnpm test
pnpm test:budget
pnpm build
pnpm preview
```

- `src/`: theme source; edit templates here and never hand-edit `templates/`.
- `public/`: static assets copied without Vite processing.
- `templates/`: Vite build output read by Halo.
- `scripts/validate-theme.mjs`: route, H1, content-contract, settings, and extension checks.
- `scripts/create-preview.mjs`: local visual fixtures, not a replacement for a running Halo instance.

Set `SPRING_THYMELEAF_CACHE=false` for a development Halo instance. `pnpm build` runs the build, static validation, performance budget, and reproducible ZIP packaging. Release packages are limited to `400 KiB`; `dist/` keeps only the current ZIP.

## SEO Boundary

Rackora emits a self-referencing canonical URL, Open Graph, Twitter Cards, visible breadcrumbs, author/date semantics, and JSON-LD for the current route. Tag and archive `noindex` policies are configurable and do not modify the Sitemap.

Custom canonicals, content consolidation, redirects, Sitemap management, reverse-proxy fixes, and Rich Results verification remain site operations. Disable conflicting SEO plugins, clear page caches, and spot-check the `<head>` on the home, post, category, and tag routes after deployment.

## Versioning and Releases

Rackora follows semantic versioning: PATCH for fixes, MINOR for backward-compatible features, and MAJOR for breaking changes. A release updates `package.json`, `theme.yaml`, `README.md`, `README.en.md`, and [`CHANGELOG.md`](CHANGELOG.md), creates a `vX.Y.Z` tag, and verifies the ZIP SHA-256 in the GitHub Release.

## License

[GPL-3.0](LICENSE)
