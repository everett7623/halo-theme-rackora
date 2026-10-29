<div align="center">

<img src="https://raw.githubusercontent.com/everett7623/halo-theme-rackora/v0.9.9/public/assets/images/rackora-mark.svg" alt="Rackora" width="96" height="96" />

# Rackora

English | [简体中文](README.md)

</div>

Rackora is a content-first theme for Halo 2.x. It is designed for independent blogs, knowledge bases, technical documentation, and other sites that need a calm, durable publishing surface. The theme provides responsive reading, light/dark modes, article navigation, syntax highlighting, and page-level SEO without adding a separate frontend runtime.

Current release: `v0.9.9`

- License: [GPL-3.0](LICENSE) (free theme, no in-app purchase)
- Halo compatibility: `>= 2.20.0`
- Issues: [GitHub Issues](https://github.com/everett7623/halo-theme-rackora/issues)
- Source: [halo-theme-rackora](https://github.com/everett7623/halo-theme-rackora)

## Screenshots

### Front end

|                                                                                           Home (light)                                                                                            |                                                                          Home (dark)                                                                          |
| :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------: |
|                  <img src="https://raw.githubusercontent.com/everett7623/halo-theme-rackora/v0.9.9/docs/screenshots/home-light.png" alt="Home page in light mode" width="600" />                  | <img src="https://raw.githubusercontent.com/everett7623/halo-theme-rackora/v0.9.9/docs/screenshots/home-dark.png" alt="Home page in dark mode" width="600" /> |
|                                                                                             **Post**                                                                                              |                                                                          **Mobile**                                                                           |
| <img src="https://raw.githubusercontent.com/everett7623/halo-theme-rackora/v0.9.9/docs/screenshots/post.png" alt="Post page with table of contents, share bar, and license notice" width="600" /> | <img src="https://raw.githubusercontent.com/everett7623/halo-theme-rackora/v0.9.9/docs/screenshots/home-mobile.png" alt="Home page on mobile" width="240" />  |
|                                                                                           **Archives**                                                                                            |                                                                           **About**                                                                           |
|                        <img src="https://raw.githubusercontent.com/everett7623/halo-theme-rackora/v0.9.9/docs/screenshots/archives.png" alt="Archives page" width="600" />                        |         <img src="https://raw.githubusercontent.com/everett7623/halo-theme-rackora/v0.9.9/docs/screenshots/about.png" alt="About page" width="600" />         |
|                                                                                           **Category**                                                                                            |                                                                           **Tags**                                                                            |
|                        <img src="https://raw.githubusercontent.com/everett7623/halo-theme-rackora/v0.9.9/docs/screenshots/category.png" alt="Category page" width="600" />                        |          <img src="https://raw.githubusercontent.com/everett7623/halo-theme-rackora/v0.9.9/docs/screenshots/tags.png" alt="Tag index" width="600" />          |

### Admin settings

|                                                                                    Theme details                                                                                    |                                                                               Basic                                                                                |
| :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| <img src="https://raw.githubusercontent.com/everett7623/halo-theme-rackora/v0.9.9/docs/screenshots/console-theme-detail.png" alt="Theme details in the Halo Console" width="600" /> |     <img src="https://raw.githubusercontent.com/everett7623/halo-theme-rackora/v0.9.9/docs/screenshots/settings-basic.png" alt="Basic settings" width="600" />     |
|                                                                                   **Appearance**                                                                                    |                                                                            **Sidebar**                                                                             |
|        <img src="https://raw.githubusercontent.com/everett7623/halo-theme-rackora/v0.9.9/docs/screenshots/settings-appearance.png" alt="Appearance settings" width="600" />         |   <img src="https://raw.githubusercontent.com/everett7623/halo-theme-rackora/v0.9.9/docs/screenshots/settings-sidebar.png" alt="Sidebar settings" width="600" />   |
|                                                                                      **Post**                                                                                       |                                                                            **Plugins**                                                                             |
|              <img src="https://raw.githubusercontent.com/everett7623/halo-theme-rackora/v0.9.9/docs/screenshots/settings-post.png" alt="Post settings" width="600" />               |   <img src="https://raw.githubusercontent.com/everett7623/halo-theme-rackora/v0.9.9/docs/screenshots/settings-plugins.png" alt="Plugin settings" width="600" />    |
|                                                                                       **SEO**                                                                                       |                                                                           **Analytics**                                                                            |
|               <img src="https://raw.githubusercontent.com/everett7623/halo-theme-rackora/v0.9.9/docs/screenshots/settings-seo.png" alt="SEO settings" width="600" />                | <img src="https://raw.githubusercontent.com/everett7623/halo-theme-rackora/v0.9.9/docs/screenshots/settings-analytics.png" alt="Analytics settings" width="600" /> |
|                                                                                       **Ads**                                                                                       |                                                                             **Filing**                                                                             |
|                <img src="https://raw.githubusercontent.com/everett7623/halo-theme-rackora/v0.9.9/docs/screenshots/settings-ads.png" alt="Ad settings" width="600" />                |    <img src="https://raw.githubusercontent.com/everett7623/halo-theme-rackora/v0.9.9/docs/screenshots/settings-filing.png" alt="Filing settings" width="600" />    |

Analytics and ads are off by default; these screenshots show both groups after enabling them to reveal every option.

## Who It Is For

- Independent publishing, technical writing, product documentation, and personal knowledge bases.
- Sites with long Chinese or English titles, code, tables, and long-form articles.
- Sites that want the theme to own presentation while Halo plugins provide search, RSS, comments, links, caching, and backups.

Rackora reimplements an information hierarchy inspired by [Fuwari](https://github.com/saicaca/fuwari), an Astro static-blog theme released under the MIT License. It is not a fork of any Halo theme, does not copy Fuwari Astro components or styles, and does not require Astro, Svelte, Tailwind, or Pagefind at runtime.

## Features

- Homepage profile sidebar, sortable social links, native site statistics, category index, and post-count-ranked popular tags.
- Eleven standard Halo routes: home, post, page, archive, tag, category, author, links, and 404 templates, plus About and Documentation custom templates.
- Responsive navigation with nested menus, back-to-top control, reduced-motion support, and light, dark, and print styles.
- Author information, reading progress, reading time, table of contents, heading anchors, copy-link action, related posts, series, and adjacent-post navigation.
- Highlight.js syntax highlighting for 16 bundled languages (Bash, CSS, Dockerfile, Go, INI, Java, JavaScript, JSON, Nginx, Python, Rust, SCSS, SQL, TypeScript, HTML/XML, and YAML; other languages stay plain text), code-copy controls, responsive tables, and image lightbox.
- X, Facebook, LinkedIn, Reddit, Telegram, WhatsApp, Weibo, email, and copy-link sharing, each configurable in the theme settings.
- Halo comment, search, and footer extension points, with official RSS and Links plugin integration.
- One page H1, self-referencing canonical URLs, Open Graph, Twitter Cards, breadcrumbs, and WebSite / Organization / BlogPosting / TechArticle JSON-LD.
- Optional GA4, Microsoft Clarity, Baidu Analytics, ICP, public-security filing details, structured ad slots, and affiliate disclosures. These capabilities are off by default.

## Compatibility and Dependencies

**Runtime requires only Halo `>= 2.20.0`.** Node.js and pnpm are needed only when building from source.

The theme can be installed, enabled, switched, and uninstalled on its own. The official plugins below are optional; missing plugins hide the matching entry and do not break reading:

| Capability   | Plugin                                                      | Without the plugin                    |
| ------------ | ----------------------------------------------------------- | ------------------------------------- |
| Search       | [Search Widget](https://www.halo.run/store/apps/app-DlacW)  | Search button is hidden               |
| Comments     | [Comment Widget](https://www.halo.run/store/apps/app-YXyaD) | Comment area is not rendered          |
| RSS          | [RSS](https://www.halo.run/store/apps/app-KhIVw)            | Feed discovery links are omitted      |
| Friend links | [Links](https://www.halo.run/store/apps/app-hfbQg)          | `/links` has no data                  |
| Sitemap      | [Sitemap](https://www.halo.run/store/apps/app-QDFMI)        | The theme does not generate a sitemap |

Keep Halo page static cache and automatic backup when those services are needed. See [`docs/plugin-compatibility.md`](docs/plugin-compatibility.md) for the full responsibility matrix.

## Installation

1. Download `theme-rackora-X.Y.Z.zip` from [GitHub Releases](https://github.com/everett7623/halo-theme-rackora/releases). Upload the release artifact as-is; do not unzip and re-zip it.
2. Open Halo Console → Themes → Upload Theme, then select the ZIP.
3. Enable Rackora.
4. Click “Reload configuration” in Theme Management so the settings form and defaults become available.
5. Check the site title, subtitle, primary menu, category descriptions, and whether search, comments, RSS, and links plugins are enabled as needed.

The theme directory and `metadata.name` in `theme.yaml` must remain `theme-rackora`.

The default interface language is Simplified Chinese, and the site language defaults to `zh-CN`. For English theme UI copy, open **Theme Settings → Basic → Interface language**, choose English, and set **Site language** to `en-US`. Halo site title, posts, and menus are left unchanged.

## Usage

1. Configure the primary menu under Halo Appearance → Menus. Rackora reads the primary menu and supports nested items.
2. Choose a logo mode and upload the matching image under **Theme Settings → Appearance**. See [Logo Setup](#logo-setup).
3. Fill in Basic, Sidebar, Post, SEO, and Filing groups as needed. Title, subtitle, and the global description come from Halo site settings; do not duplicate them in theme settings.
4. For an about page, create a single page and select the **关于页（About）** template. It shows the profile card, social links, and selected logo.
5. For long technical writing, edit a post and select the **文档（Documentation）** template. It keeps a persistent table of contents.
6. The friend-links page requires the official Links plugin; visit `/links` after enabling it.
7. Comments and search come from the matching official plugins. The theme only shows those entries when the plugin is available.

## Logo Setup

Logo uploads are located at **Theme Settings → Appearance**, not under the SEO field named “Organization Logo”. If the fields are missing after an install or upgrade, click “Reload configuration” in Halo Theme Management first.

1. Choose a value under “Logo display mode”.
2. Choose `1:1 Square Logo + site title`, then upload the “1:1 Square Logo”. The header, homepage profile, and About template show the square image together with the Halo site title and subtitle.
3. Choose `3:1 Wide Logo (text included in image)`, then upload the “3:1 Wide Logo”. The header, homepage profile, and About template show the image directly; the header and profile do not repeat the title text.

SVG, PNG, and WebP are recommended. Only the upload field for the selected mode is displayed; switching modes does not delete the other image. Fallbacks are:

- Square mode: theme square logo → Halo Site Logo → Rackora default mark.
- Wide mode: theme wide logo → square logo plus site title.

The SEO “Organization Logo” field is used only for Organization / WebSite structured data. It does not control the visible header, homepage profile, or About template logo.

## Theme Settings

The settings page is organized into nine groups, each with safe defaults:

| Group        | Main options                                                                                     |
| ------------ | ------------------------------------------------------------------------------------------------ |
| Basic        | Interface/site language, region, social links, RSS, footer, credits, site stats, and launch date |
| Appearance   | Logo mode and uploads, colors, accent, covers, banner, homepage copy, site width, and font scale |
| Sidebar      | Homepage sidebar, profile, categories, popular tags, and tag count                               |
| Post         | Post sidebar, sharing targets, lightbox, related posts, series, and license notice               |
| Integrations | Official Links page and footer entry                                                             |
| SEO          | Tag/archive indexing policy, site verification, and Organization entity                          |
| Analytics    | GA4, Microsoft Clarity, and Baidu Analytics IDs; disabled by default                             |
| Ads          | Global switch, disclosure text, and sortable placements; disabled by default                     |
| Filing       | ICP and public-security filing numbers and URLs                                                  |

Legacy `content.*` and `stats.*` configuration keys remain readable after upgrades.

## Upgrade

1. Back up Halo data, or confirm that automatic backups are available.
2. Upload the new ZIP, or update from the Halo App Store after the theme is listed.
3. Click “Reload configuration” in Theme Management.
4. Spot-check home, post, category, tag, archive, page, and 404 routes.
5. If page static cache is enabled, clear it and re-check `<head>` output.

Existing setting keys are preserved. New fields use theme defaults and do not wipe previous values. Switching away from Rackora and back, or switching from another theme, does not require manual content repair.

## Disable and Uninstall

1. Switch to another theme and confirm the public site still loads.
2. Then disable or uninstall Rackora.
3. Uninstalling the theme does not delete posts, pages, attachments, comments, or menus.
4. Rackora metadata fields on posts, tags, and categories remain on those Halo objects, but they do not affect other themes.
5. Theme settings live in a Halo ConfigMap. After uninstall, clean that data up only with a backup and Halo’s usual configuration workflow.

## Plugin Boundary

Rackora owns the frontend shell, syntax highlighting, table of contents, tag presentation, back-to-top control, frontend analytics hooks, and page-level SEO structure. It does not replace server-side Sitemap, search, RSS, comments, friend links, caching, backups, authentication, or content storage.

Older themes may leave plugins such as Time Factor SEO enabled. They are not Rackora dependencies and will duplicate canonical, Open Graph, and article JSON-LD output. Disable conflicting SEO plugins, clear page caches, and spot-check the `<head>` on the home, post, category, and tag routes.

## Content Metadata

Rackora registers Halo metadata fields for:

- Posts: primary keyword, search intent, promotion relationship, content verification date, next review date, manually confirmed Pillar status, and series.
- Tags: indexing policy and visible summary.
- Categories: featured-post entry.

Primary keywords are editorial review data only; the theme does not emit ineffective `meta keywords` or infer Pillar structure from tags.

## Privacy, Analytics, and External Services

### What the Theme Itself Does

- The theme sets no cookies, does not collect, upload, or sell visitor information, site content, comments, or access logs, and has no analytics endpoint of its own.
- Fonts, icons, and syntax highlighting are bundled with the theme and served from the site's own domain. A default installation requests no third-party domains.
- When a visitor switches between light and dark mode, the choice is stored as `rackora-color-scheme` (`light` or `dark`) in the browser's `localStorage`. It stays on that device and is never sent to a server; clearing the site's browser data removes it.
- Copy link and copy code write to the local clipboard only when the visitor clicks them.
- Share buttons are plain links. No social platform is contacted on page load; the visitor is taken to the chosen platform only after clicking.
- Post view counts and homepage site statistics are recorded by Halo itself, and comments, search, and RSS are handled by Halo or the matching plugins. The theme only reads and displays them.

### External Services That Require Opt-In

| Capability             | Settings group | Destination                                | Default |
| ---------------------- | -------------- | ------------------------------------------ | ------- |
| GA4                    | Analytics      | `www.googletagmanager.com`                 | Off     |
| Microsoft Clarity      | Analytics      | `www.clarity.ms`                           | Off     |
| Baidu Analytics        | Analytics      | `hm.baidu.com`                             | Off     |
| Site-verification meta | SEO            | No network request; meta tags only         | Empty   |
| Theme ad slots         | Ads            | Linked only when a destination URL is set  | Off     |
| Social share buttons   | Post           | Navigate to the selected platform on click | On      |

### Third-Party Analytics Data Handling

After “Enable third-party analytics” is turned on and a service ID is entered, the visitor's browser loads that service's script directly and sends visit data to the provider. The data does not pass through the theme and is not stored in Halo; the theme can neither view nor delete it. Data categories, retention, and deletion are decided by each provider. The summary below follows the providers' public documentation; their latest terms prevail.

**Google Analytics 4** (script: `www.googletagmanager.com/gtag/js`)

- Data categories: page URL and title, referrer, device, browser, operating system, screen and language, approximate location derived from the IP address, and events such as page views, scrolls, and outbound clicks (depending on the Enhanced measurement settings in GA). Google states that Google Analytics does not log or store IP addresses.
- Browser storage: first-party cookies such as `_ga` and `_ga_<ID>` that distinguish visitors and sessions.
- Retention and deletion: data is stored on Google's servers. Retention for user-level and event-level data is set under Data retention in GA (2 or 14 months for standard properties), expired data is deleted automatically, and standard aggregated reports are not affected. Data for an individual visitor can be deleted through User explorer or the User Deletion API, or the whole property can be deleted.
- Policies: [Google Privacy Policy](https://policies.google.com/privacy) · [Safeguarding your data](https://support.google.com/analytics/answer/6004245) · [Data retention](https://support.google.com/analytics/answer/7667196)

**Microsoft Clarity** (script: `www.clarity.ms/tag/<project ID>`)

- Data categories: interaction events such as clicks, scrolls, mouse movement, and window resizing; page structure and content for session playback and heatmaps (text in input fields is always masked); page performance and error information; device and browser information; and location derived from the IP address.
- Browser storage: cookies such as `_clck` and `_clsk`; see Clarity's cookie documentation for the full list.
- Retention and deletion: data is stored in Microsoft Azure. Site owners can access data for up to 30 days after recording, and favorite or randomly sampled recordings are kept for up to 9 months. Clarity cannot delete data for an individual visitor or recording; only deleting the whole project removes data, and a deleted project cannot be recovered.
- Policies: [Microsoft Privacy Statement](https://privacy.microsoft.com/privacystatement) · [Clarity FAQ](https://learn.microsoft.com/clarity/faq) · [Data collection](https://learn.microsoft.com/clarity/setup-and-installation/clarity-data) · [Cookies](https://learn.microsoft.com/clarity/setup-and-installation/clarity-cookies)

**Baidu Analytics** (script: `hm.baidu.com/hm.js?<site ID>`)

- Data categories: visited pages and referrers, visit times, and log information such as IP address, browser type and language, operating system, and device information.
- Browser storage: cookies such as `HMACCOUNT` (visitor ID), `Hm_lvt_<site ID>` (previous visit times, 1 year), and `Hm_lpvt_<site ID>` (current visit time, session).
- Retention and deletion: the Baidu Analytics privacy policy states that personal information is stored within the People's Republic of China and kept while the service is in use; its terms of service state that site owners may not require Baidu Analytics to delete collected data. Visitors can delete browser cookies or submit requests through the contact details in the privacy policy.
- Policies (Chinese): [Privacy policy](https://tongji.baidu.com/web/help/article?id=330&type=0) · [Terms of service](https://tongji.baidu.com/holmes/Analytics/%E9%9A%90%E7%A7%81%E5%90%88%E8%A7%84%E6%8C%87%E5%8D%97/%E7%99%BE%E5%BA%A6%E7%BB%9F%E8%AE%A1%E6%9C%8D%E5%8A%A1%E6%9D%A1%E6%AC%BE) · [Cookie list](https://tongji.baidu.com/holmes/Analytics/%E9%9A%90%E7%A7%81%E5%90%88%E8%A7%84%E6%8C%87%E5%8D%97/%E7%99%BE%E5%BA%A6%E7%BB%9F%E8%AE%A1%E7%9B%B8%E5%85%B3Cookie%E5%88%97%E8%A1%A8)

### Turning It Off and Informing Visitors

- After “Enable third-party analytics” is turned off or a service ID is cleared, the theme stops rendering that script immediately (clear the page cache first when static page caching is enabled) and no new data is collected. Data already sent to a provider is not deleted; handle it with that provider as described above.
- The theme does not include a cookie consent banner. Before enabling analytics, list the services and how they process data in your site's privacy policy. For visitors in regions that require prior consent, such as the EU and the UK, add a consent management solution yourself.
- Theme ad slots display only the text, images, and links an administrator enters; no third-party ad scripts are loaded.

## Third-Party Assets and Licenses

Rackora is released under [GPL-3.0](LICENSE). The install package also includes:

| Asset          | Use                  | License      |
| -------------- | -------------------- | ------------ |
| IBM Plex Sans  | UI font              | OFL-1.1      |
| Source Serif 4 | Display / body serif | OFL-1.1      |
| Highlight.js   | Syntax highlighting  | BSD-3-Clause |
| Lucide         | Icons                | ISC          |

These assets are bundled locally and are not loaded from a CDN; their full copyright notices and license texts ship in `THIRD_PARTY_LICENSES.txt` inside the release package. Fuwari is an information-hierarchy reference only; its source is not included.

## Troubleshooting

- **New settings missing after upgrade:** Theme Management → Reload configuration, then refresh Console.
- **Wrong header logo:** Upload it in the Appearance group, not the SEO organization logo field.
- **Chinese UI copy still in English:** Set Basic → Interface language to Simplified Chinese (sites upgraded from older versions keep their previous English setting).
- **English site shows Chinese UI copy:** New installs default to Simplified Chinese; set Basic → Interface language to English and Site language to `en-US`.
- **No search, comments, RSS, or friend links:** Install and enable the matching official plugin. The theme does not fail when a plugin is absent.
- **Duplicate canonical or JSON-LD:** Disable Time Factor SEO or similar injectors, then clear page cache.
- **Stale frontend styles:** Clear the browser cache, or refresh page static cache. For a development Halo instance, set `SPRING_THYMELEAF_CACHE=false`.
- **ZIP install fails:** Use `theme-rackora-X.Y.Z.zip` from GitHub Releases. Do not upload the source tree or a re-zipped folder.

## Build from Source

```powershell
pnpm install
pnpm build
```

Upload `dist/theme-rackora-X.Y.Z.zip` after the build completes. Source builds require Node.js 24 and pnpm `10.33.0`.

```powershell
pnpm check
pnpm build-only
pnpm test
pnpm test:budget
pnpm preview
```

- `src/`: theme source; edit templates here and never hand-edit `templates/`.
- `public/`: static assets copied without Vite processing.
- `templates/`: Vite build output read by Halo.
- `scripts/validate-theme.mjs`: route, H1, content-contract, settings, and extension checks.
- `scripts/create-preview.mjs`: local visual fixtures, not a replacement for a running Halo instance.

`pnpm build` runs the build, static validation, performance budget, and reproducible ZIP packaging. Release packages are limited to `400 KiB`; `dist/` keeps only the current ZIP.

## SEO Boundary

Rackora emits a self-referencing canonical URL, Open Graph, Twitter Cards, visible breadcrumbs, author/date semantics, and JSON-LD for the current route. Page 2 and later of the home, category, tag, author, and archive lists include the page number in the canonical URL and title, and emit `rel="prev"` / `rel="next"`. Tag and archive `noindex` policies are configurable and do not modify the Sitemap.

Custom canonicals, content consolidation, redirects, Sitemap management, reverse-proxy fixes, and Rich Results verification remain site operations.

## Versioning and Releases

Rackora follows semantic versioning: PATCH for fixes, MINOR for backward-compatible features, and MAJOR for breaking changes. A release updates `package.json`, `theme.yaml`, `README.md`, `README.en.md`, and [`CHANGELOG.md`](CHANGELOG.md), creates a `vX.Y.Z` tag, and verifies the ZIP SHA-256 in the GitHub Release.

## License

[GPL-3.0](LICENSE)
