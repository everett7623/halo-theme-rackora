# Halo plugin compatibility

Rackora owns presentation. It does not replace server-side indexing, search, comments, feeds,
backups, authentication, or content storage. Disable one plugin at a time in a staging or backed-up
environment, verify the editor and all public routes, and uninstall only after confirming that no
published content depends on it.

## Site leftovers (not theme dependencies)

Plugins installed for an older theme or another content stack can remain enabled after you switch
to Rackora. They are **Halo site resources**, not part of this theme package: Rackora does not
declare, ship, or call them.

Common leftovers from prior theme / SEO workflows:

| Leftover                                                | What to do                                                                                                                                                                                                                                                                                                                             |
| ------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Time Factor SEO (`plugin-time-factor`)                  | **Disable** on Rackora sites. It injects a second set of canonical, Open Graph, Twitter Card, and article JSON-LD (verified with 1.0.9, including placeholder article metadata). Keep Sitemap for the XML feed. After disabling, clear Page Static Cache and spot-check post, category, and tag `<head>`. Uninstall only after backup. |
| Moments / Gallery                                       | Disable if those content types are unused; Rackora has no templates for them.                                                                                                                                                                                                                                                          |
| Extra highlight / TOC / tag-cloud / back-to-top plugins | Disable; Rackora already ships these in the frontend.                                                                                                                                                                                                                                                                                  |

Do not “implant” Time Factor into the theme: core SEO markup already lives in
`src/partials/seo-head.html` and article JSON-LD. Baidu / ByteDance-specific metas and SEO for
third-party plugin routes (moments, photos, etc.) are out of Rackora’s scope—use a dedicated
plugin only on sites that actually need those surfaces, and never alongside Rackora’s duplicate
canonical / OG / BlogPosting output.

## Keep enabled

| Plugin            | Why it is still needed                                                                                                                       |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| App Store         | Installs and updates Halo extensions; a theme cannot replace it.                                                                             |
| Page Static Cache | Provides server-side caching; Rackora only controls frontend assets and markup.                                                              |
| Sitemap           | Generates the sitemap. Rackora can set page-level robots policy but cannot remove URLs from the plugin feed.                                 |
| Search Widget     | Provides the search index and UI API. Rackora only renders its trigger when available.                                                       |
| RSS               | Generates the feed. Rackora provides discovery and footer links when the plugin is available.                                                |
| Comment Widget    | Stores and renders comments. Rackora provides the extension point and matching styles.                                                       |
| Links             | Supplies the friend-link data and route used by Rackora's `/links` template.                                                                 |
| Automatic Backup  | A theme cannot back up Halo data, attachments, plugin resources, or configuration. Keep it until restore drills prove another backup system. |

## Review before disabling

| Plugin                         | Recommendation                                                                                                                                      |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| Time Factor SEO                | See **Site leftovers** above. Not required by Rackora; disable to avoid duplicate head metadata.                                                    |
| Content Assistant              | Third-party removal candidate if article import/export and format conversion are not part of the current workflow. It is not needed by Rackora.     |
| Storage Toolbox                | Third-party removal candidate when image processing, conversion, and watermark workflows are unused. Check existing attachment URLs before removal. |
| OAuth2 Authentication          | Keep only when visitors or administrators actually use an OAuth provider. Test Console and frontend login before disabling.                         |
| Editor Link Card               | Optional for new content, but published link-card blocks may depend on it. Search existing content before disabling.                                |
| Markdown / HTML Content Blocks | Optional unless current pages or posts contain these editor blocks. Removing it may break existing rendered content.                                |
| Gallery                        | Disable if the gallery content type and routes are unused. Rackora does not provide a gallery template.                                             |
| Moments                        | Disable if the Moments content type and routes are unused. Rackora does not provide a Moments template.                                             |

## Built into Rackora

- Highlight.js syntax highlighting, code-language labels, and copy controls.
- Responsive tables and product-comparison table enhancement.
- Reading time, reading progress, table of contents, heading anchors, and back-to-top control.
- Light/dark color schemes and official plugin color-scheme adaptation.
- Homepage profile, sortable social links, categories, and post-count-ranked popular tags.
- Article author/license notice, affiliate disclosure, safe sponsored-link attributes, and structured ad slots.
- Page-level SEO structure: one H1, absolute self canonical, Open Graph, Twitter Card, breadcrumbs, visible dates, author semantics, `WebSite`, `Organization`, and `BlogPosting` data.

Do not install a second frontend syntax-highlighting, table-of-contents, theme analytics, tag-cloud,
or back-to-top plugin alongside Rackora. Server-side Sitemap, Search, RSS, Comments, Links, caching,
and backups remain separate responsibilities.
