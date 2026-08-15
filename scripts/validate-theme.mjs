import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import YAML from "yaml";

import "./check-sync-conflicts.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const requiredPages = [
  "index.html",
  "post.html",
  "page.html",
  "archives.html",
  "tags.html",
  "tag.html",
  "categories.html",
  "category.html",
  "author.html",
  "links.html",
  "error/404.html",
];

async function read(relativePath) {
  return readFile(path.join(root, relativePath), "utf8");
}

const [
  themeSource,
  settingsSource,
  annotationSource,
  layout,
  seoHead,
  mainStyles,
  packageSource,
  changelog,
  readme,
] = await Promise.all([
  read("theme.yaml"),
  read("settings.yaml"),
  read("annotation-setting.yaml"),
  read("src/partials/layout.html"),
  read("src/partials/seo-head.html"),
  read("src/css/main.css"),
  read("package.json"),
  read("CHANGELOG.md"),
  read("README.md"),
]);
const theme = YAML.parse(themeSource);
const settings = YAML.parse(settingsSource);
const packageManifest = JSON.parse(packageSource);
const annotations = YAML.parseAllDocuments(annotationSource).map((document) => document.toJSON());

assert.equal(theme?.metadata?.name, "theme-rackora", "theme ID must match the folder name");
assert.equal(
  theme?.spec?.settingName,
  settings?.metadata?.name,
  "theme settingName must match settings metadata.name",
);
assert.equal(theme?.spec?.configMapName, "theme-rackora-configMap");
assert.match(theme?.spec?.requires ?? "", /^>=2\./, "theme must declare a Halo 2.x requirement");
assert.equal(
  theme?.spec?.version,
  packageManifest?.version,
  "theme.yaml and package.json versions must stay in sync",
);
assert.match(
  packageManifest?.scripts?.build ?? "",
  /pnpm test && pnpm test:budget && theme-package/,
  "release builds must validate before packaging",
);
assert.equal(
  packageManifest?.scripts?.["prebuild-only"],
  "node scripts/check-sync-conflicts.mjs",
  "source conflicts must be rejected before Vite builds",
);
assert.match(
  changelog,
  new RegExp(`^## \\[${packageManifest.version.replaceAll(".", "\\.")}\\]`, "m"),
  "CHANGELOG.md must contain the current release version",
);
assert.match(
  readme,
  new RegExp("Current release: `v" + packageManifest.version.replaceAll(".", "\\.") + "`"),
  "README.md must identify the current release version",
);
assert.match(
  await read(".github/workflows/release.yml"),
  /extract-changelog\.mjs/,
  "GitHub releases must publish CHANGELOG notes instead of bare generate-notes",
);
assert.doesNotMatch(
  await read(".github/workflows/release.yml"),
  /--generate-notes/,
  "do not ship releases with only auto-generated commit compare notes",
);
assert.match(
  await read("docs/plugin-compatibility.md"),
  /Site leftovers|plugin-time-factor/,
  "plugin docs must treat Time Factor as a site leftover, not a theme dependency",
);

assert.match(layout, /<html\b[^>]*xmlns:th=/, "layout must declare the Thymeleaf namespace");
assert.match(layout, /menuFinder\.getPrimary\(\)/, "layout must render the primary Halo menu");
assert.match(
  layout,
  /th:rel="\$\{item\.spec\.target\?\.value == '_blank' \? 'noopener noreferrer' : null\}"/,
  "new-window menu links must prevent opener access",
);
assert.match(layout, /<halo:footer\s*\/>/, "layout must expose the Halo footer extension point");
assert.doesNotMatch(
  layout,
  /<meta\s+name=["']description["']/i,
  "Halo injects standard description metadata",
);
assert.match(seoHead, /<link\s+rel=["']canonical["']/i, "theme pages need a self canonical");
assert.match(seoHead, /property=["']og:url["']/i, "theme pages need an Open Graph URL");
assert.match(seoHead, /property=["']og:locale["']/i, "theme pages need an Open Graph locale");
assert.match(seoHead, /name=["']twitter:card["']/i, "theme pages need Twitter card metadata");
assert.match(
  seoHead,
  /canonicalPath = \$\{\(\{\{path\}\}\)\}/,
  "SEO props must remain valid Thymeleaf expressions after Vite expansion",
);

for (const page of requiredPages) {
  const source = await read(`src/${page}`);
  const h1Count = source.match(/<h1\b/gi)?.length ?? 0;
  assert.equal(h1Count, 1, `${page} must contain exactly one page-level H1`);
  assert.match(
    source,
    /<include\s+src=["']layout\.html["']>/,
    `${page} must use the shared layout`,
  );
  if (page !== "error/404.html") {
    assert.match(
      source,
      /<include\s+src=["']seo-head\.html["']/,
      `${page} must use the shared SEO head`,
    );
  }
}

const post = await read("src/post.html");
const postDocs = await read("src/post_docs.html");
const singlePage = await read("src/page.html");
const home = await read("src/index.html");
const archives = await read("src/archives.html");
const tags = await read("src/tags.html");
const tagPage = await read("src/tag.html");
const adSlot = await read("src/partials/ad-slot.html");
const mainScript = await read("src/js/main.ts");
const postScript = await read("src/js/post.ts");
assert.match(post, /kind=["']Post["']/, "post comments must target Post");
assert.match(singlePage, /kind=["']SinglePage["']/, "page comments must target SinglePage");
assert.match(post, /post\.owner\.permalink/, "posts must link to their Halo author page");
assert.match(post, /rel=["']author["']/, "post author links must expose author semantics");
assert.match(
  post,
  /itemtype=["']https:\/\/schema\.org\/BlogPosting["']/,
  "posts need BlogPosting schema",
);
assert.match(
  post,
  /itemtype=["']https:\/\/schema\.org\/BreadcrumbList["']/,
  "posts need breadcrumb schema",
);
for (const [label, source] of [
  ["post", post],
  ["documentation post", postDocs],
]) {
  assert.match(
    source,
    /["']publisher["']\s*:\s*\{[\s\S]*?["']@type["']\s*:\s*["']Organization["'][\s\S]*?["']name["']\s*:[\s\S]*?theme\.config\.seo\.organization_name/,
    `${label} JSON-LD must embed the publisher organization name`,
  );
  assert.match(
    source,
    /["']logo["']\s*:\s*\{[\s\S]*?["']@type["']\s*:\s*["']ImageObject["'][\s\S]*?theme\.config\.seo\.organization_logo/,
    `${label} JSON-LD must embed the publisher logo`,
  );
  assert.match(
    source,
    /property=["']article:published_time["']/,
    `${label} pages need Open Graph article published time`,
  );
  assert.match(
    source,
    /property=["']article:modified_time["']/,
    `${label} pages need Open Graph article modified time`,
  );
}
assert.match(
  post,
  /rackora_affiliate_relation/,
  "posts must render the configured relationship disclosure",
);
assert.match(
  mainScript,
  /function setButtonIcon\(/,
  "icon buttons must preserve their button element",
);
assert.doesNotMatch(
  mainScript,
  /toggle\.dataset\.lucide\s*=/,
  "data-lucide on a button makes Lucide replace the interactive element",
);
assert.match(home, /theme\.config\.basic\.socials/, "home profile must render configured socials");
assert.match(home, /siteStatsFinder\.getStats\(\)/, "home must render native site stats");
assert.match(home, /profile-stats/, "home must expose compact profile stats");
assert.match(
  home,
  /th:if="\$\{showHomeStats\}"[\s\S]*?siteStatsFinder\.getStats\(\)/,
  "home must query stats only when the sidebar stats block is enabled",
);
assert.match(home, /\? '标签' : 'Tags'/, "home sidebar must use the concise tag heading");
assert.doesNotMatch(home, /常用标签|Popular tags/, "home must not use the old tag heading");
assert.doesNotMatch(home, /site-stats-grid|站点统计/, "home must not keep the old stats card");
assert.match(
  home,
  /<th:block\s+th:if="\$\{showHomeTags\}"\s*>\s*<th:block th:with="homeTags = \$\{tagFinder\.listAll\(\)\}">/,
  "home must not query tags when sidebar tags are disabled",
);
assert.match(
  archives,
  /post\.categories\[0\]\.status\.permalink/,
  "archives must link each post's primary category",
);
assert.match(
  mainStyles,
  /\.timeline-entry__title\s*\{[\s\S]*?overflow-wrap:\s*break-word/,
  "archive titles must use break-word so long titles do not collapse the grid column",
);
assert.doesNotMatch(
  mainStyles,
  /\.timeline-entry__title\s*\{[^}]*overflow-wrap:\s*anywhere/,
  "overflow-wrap:anywhere shrinks archive title columns to one character",
);
assert.match(
  mainStyles,
  /\.timeline\s*\{[\s\S]*?max-width:\s*var\(--rack-content\)/,
  "archives must share the same content measure as other single-column pages",
);
assert.match(
  mainStyles,
  /\.page-heading\s*\{[\s\S]*?max-width:\s*var\(--rack-content\)/,
  "links page heading must use the shared content measure",
);
assert.match(
  mainStyles,
  /\.article--page[\s\S]*?max-width:\s*var\(--rack-content\)/,
  "about and page templates must use the shared content measure",
);
assert.doesNotMatch(
  home,
  /sidebar-shortcuts/,
  "home must not duplicate footer navigation in the sidebar",
);
assert.match(mainScript, /\bGithub\b/, "social icons must be registered with Lucide");
assert.match(mainScript, /querySelectorAll<HTMLElement>\("\[data-site-launch\]"\)/);
assert.match(mainScript, /data-site-launch-compact/);

const basicForm = settings?.spec?.forms?.find((form) => form.group === "basic");
assert.equal(
  basicForm?.formSchema?.find((field) => field.name === "ui_language")?.value,
  "en",
  "theme UI must default to English",
);
assert.equal(
  basicForm?.formSchema?.find((field) => field.name === "site_language")?.value,
  "en-US",
  "HTML and structured data language must default to English",
);
const socials = basicForm?.formSchema?.find((field) => field.name === "socials");
assert.equal(socials?.$formkit, "array", "socials must use Halo's sortable array input");
assert.equal(
  basicForm?.formSchema?.find((field) => field.name === "show_footer_menu")?.value,
  true,
);
assert.equal(
  basicForm?.formSchema?.find((field) => field.name === "footer_menu")?.$formkit,
  "menuSelect",
  "footer navigation must use Halo's menu selector",
);

const appearanceForm = settings?.spec?.forms?.find((form) => form.group === "appearance");
const homeForm = settings?.spec?.forms?.find((form) => form.group === "home");
const postForm = settings?.spec?.forms?.find((form) => form.group === "post");
const imageMode = appearanceForm?.formSchema?.find((field) => field.name === "image_mode");
assert.equal(imageMode?.value, "none", "article covers must default to low-image mode");
assert.equal(homeForm?.formSchema?.find((field) => field.name === "show_home_tags")?.value, true);
assert.equal(homeForm?.formSchema?.find((field) => field.name === "home_tag_count")?.value, 10);
for (const fieldName of ["show_home_profile", "show_home_categories"]) {
  assert.equal(
    homeForm?.formSchema?.find((field) => field.name === fieldName)?.value,
    true,
    `${fieldName} must default to visible`,
  );
}
for (const fieldName of [
  "show_post_toc",
  "show_post_latest",
  "show_share_link",
  "show_share_bar",
  "show_related_posts",
  "show_series",
]) {
  assert.equal(
    postForm?.formSchema?.find((field) => field.name === fieldName)?.value,
    true,
    `${fieldName} must default to visible`,
  );
}
assert.equal(
  postForm?.formSchema?.find((field) => field.name === "show_post_license")?.value,
  true,
);
assert.equal(
  postForm?.formSchema?.find((field) => field.name === "show_image_lightbox")?.value,
  true,
);
assert.ok(postForm?.formSchema?.find((field) => field.name === "share_targets"));
assert.equal(
  appearanceForm?.formSchema?.find((field) => field.name === "content_width")?.value,
  "comfortable",
);
assert.equal(appearanceForm?.formSchema?.find((field) => field.name === "font_scale")?.value, "md");
assert.ok(postForm?.formSchema?.find((field) => field.name === "license_name"));
assert.ok(postForm?.formSchema?.find((field) => field.name === "license_url"));
assert.ok(annotationSource.includes("rackora_series"));
assert.match(mainStyles, /Source Serif 4|source-serif-4|--rack-font-display/);
assert.match(mainStyles, /IBM Plex Sans|ibm-plex-sans|--rack-font-sans/);
assert.match(mainStyles, /@keyframes rack-rise/);
assert.deepEqual(
  settings?.spec?.forms?.map((form) => form.group),
  [
    "basic",
    "appearance",
    "home",
    "post",
    "compliance",
    "seo",
    "analytics",
    "integrations",
    "monetization",
  ],
  "theme settings must follow mainstream Halo grouping with home/post split",
);
assert.equal(basicForm?.label, "基础");
assert.equal(appearanceForm?.label, "样式");
assert.equal(homeForm?.label, "首页");
assert.equal(postForm?.label, "文章");
assert.equal(settings?.spec?.forms?.find((form) => form.group === "compliance")?.label, "备案");
assert.equal(settings?.spec?.forms?.find((form) => form.group === "integrations")?.label, "插件");
assert.equal(settings?.spec?.forms?.find((form) => form.group === "monetization")?.label, "广告");
assert.equal(basicForm?.formSchema?.find((field) => field.name === "show_home_stats")?.value, true);
const siteLaunchDate = basicForm?.formSchema?.find((field) => field.name === "site_launch_date");
assert.equal(
  basicForm?.formSchema?.find((field) => field.name === "show_footer_stats"),
  undefined,
  "footer stats must be removed to avoid duplicating the home sidebar",
);
assert.equal(siteLaunchDate?.$formkit, "date", "site launch date must use the native date input");
assert.equal(
  siteLaunchDate?.validation,
  undefined,
  "native date input must not duplicate validation",
);
const complianceForm = settings?.spec?.forms?.find((form) => form.group === "compliance");
assert.equal(
  complianceForm?.formSchema?.find((field) => field.name === "icp_url")?.value,
  "https://beian.miit.gov.cn/",
);
assert.ok(complianceForm?.formSchema?.find((field) => field.name === "public_security_number"));
assert.ok(complianceForm?.formSchema?.find((field) => field.name === "public_security_url"));
const seoForm = settings?.spec?.forms?.find((form) => form.group === "seo");
assert.equal(seoForm?.formSchema?.find((field) => field.name === "noindex_tags")?.value, true);
assert.equal(seoForm?.formSchema?.find((field) => field.name === "noindex_archives")?.value, true);
assert.ok(seoForm?.formSchema?.find((field) => field.name === "google_verification"));
assert.ok(seoForm?.formSchema?.find((field) => field.name === "bing_verification"));
assert.ok(seoForm?.formSchema?.find((field) => field.name === "baidu_verification"));
assert.ok(seoForm?.formSchema?.find((field) => field.name === "organization_name"));
assert.ok(seoForm?.formSchema?.find((field) => field.name === "organization_logo"));

const analyticsForm = settings?.spec?.forms?.find((form) => form.group === "analytics");
assert.equal(analyticsForm?.label, "访问分析");
assert.equal(analyticsForm?.formSchema?.find((field) => field.name === "enabled")?.value, false);
assert.equal(
  analyticsForm?.formSchema?.find((field) => field.name === "ga4_id")?.validation,
  "matches:/^G-[A-Z0-9]+$/",
);
assert.equal(
  analyticsForm?.formSchema?.find((field) => field.name === "clarity_id")?.validation,
  "matches:/^[A-Za-z0-9]+$/",
);
assert.equal(
  analyticsForm?.formSchema?.find((field) => field.name === "baidu_analytics_id")?.validation,
  "matches:/^[a-fA-F0-9]{32}$/",
);
for (const fieldName of ["ga4_id", "clarity_id", "baidu_analytics_id"]) {
  const validation = analyticsForm?.formSchema?.find(
    (field) => field.name === fieldName,
  )?.validation;
  assert.ok(
    !validation?.includes("|"),
    `${fieldName} validation must not contain FormKit rule separators`,
  );
}

const integrationsForm = settings?.spec?.forms?.find((form) => form.group === "integrations");
assert.ok(integrationsForm?.formSchema?.find((field) => field.name === "show_links"));

const monetizationForm = settings?.spec?.forms?.find((form) => form.group === "monetization");
assert.equal(monetizationForm?.formSchema?.find((field) => field.name === "enabled")?.value, false);
const ads = monetizationForm?.formSchema?.find((field) => field.name === "ads");
assert.equal(ads?.$formkit, "array", "ads must use Halo's sortable array input");
assert.ok(
  ads?.children?.some((field) => field.name === "url"),
  "each ad needs a target URL",
);
assert.ok(
  ads?.children?.some((field) => field.name === "position"),
  "each ad needs a position",
);

assert.deepEqual(
  annotations.map((setting) => setting.spec.targetRef.kind),
  ["Post", "Tag", "Category"],
  "content governance fields must be attached to their Halo models",
);
assert.ok(annotationSource.includes("rackora_primary_keyword"));
assert.ok(annotationSource.includes("rackora_index_policy"));
assert.ok(annotationSource.includes("rackora_featured_post"));

const sourceFiles = await readdir(path.join(root, "src"), { recursive: true, withFileTypes: true });
for (const entry of sourceFiles) {
  if (!entry.isFile() || !entry.name.endsWith(".html")) continue;
  const source = await read(path.relative(root, path.join(entry.parentPath, entry.name)));
  assert.doesNotMatch(source, /localhost(?::\d+)?/i, `${entry.name} contains a localhost URL`);
}

const sourceMarkup = await Promise.all(
  sourceFiles
    .filter((entry) => entry.isFile() && entry.name.endsWith(".html"))
    .map((entry) => read(path.relative(root, path.join(entry.parentPath, entry.name)))),
);
assert.doesNotMatch(
  sourceMarkup.join("\n"),
  /rack-rail/,
  "decorative color rails must stay removed",
);
assert.doesNotMatch(
  sourceMarkup.join("\n"),
  /post\.tags[^\n]*(?:pillar|hub)|(?:pillar|hub)[^\n]*post\.tags/i,
  "the theme must not infer Pillar or Hub roles from tags",
);
assert.doesNotMatch(sourceMarkup.join("\n"), /data-code-copy|data-sponsored-label/);
assert.match(home, /position=["']home_top["']/, "home must expose a top ad slot");
assert.match(home, /position=["']home_sidebar["']/, "home must expose a sidebar ad slot");
assert.match(post, /position=["']post_before["']/, "posts must expose a pre-content ad slot");
assert.match(post, /position=["']post_after["']/, "posts must expose a post-content ad slot");
assert.match(adSlot, /theme\.config\.monetization\.ads/, "ad slots must render configured ads");
assert.match(adSlot, /sponsored nofollow noopener noreferrer/, "ads need safe link attributes");
assert.doesNotMatch(settingsSource, /\$formkit:\s*code[\s\S]*广告/i, "ads must not accept scripts");
assert.match(
  layout,
  /PluginFeed/,
  "layout must expose RSS discovery when the feed plugin is available",
);
assert.match(
  layout,
  /googletagmanager\.com\/gtag/,
  "layout must support GA4 when explicitly enabled",
);
assert.match(layout, /hm\.baidu\.com\/hm\.js/, "layout must support Baidu Analytics when enabled");
assert.match(layout, /everettlabs\.dev/, "footer must credit Everett Labs");
assert.match(
  layout,
  /menuFinder\.getByName\(theme\.config\.basic\.footer_menu\)/,
  "footer must render a selected Halo menu",
);
assert.match(layout, /footerMenu\?\.menuItems/, "missing footer menus must fall back safely");
assert.match(layout, /footer-compliance/, "footer must expose optional filing information");
assert.match(layout, /theme\.config\.compliance\?\.icp_number/);
assert.match(layout, /theme\.config\.compliance\?\.public_security_number/);
assert.match(mainStyles, /\.footer-compliance\s*\{/);
assert.match(mainStyles, /\.article-layout--single\s*\{/);
assert.match(
  mainStyles,
  /@media \(max-width: 960px\)[\s\S]*?\.home-grid\s*\{[\s\S]*?"heading"[\s\S]*?"content"[\s\S]*?"sidebar"/,
  "tablet home layout must keep posts ahead of secondary sidebar panels",
);
assert.match(
  mainStyles,
  /@media \(max-width: 720px\)[\s\S]*?\.home-grid\s*\{[\s\S]*?"heading"[\s\S]*?"content"[\s\S]*?"sidebar"/,
  "mobile home layout must keep posts ahead of secondary sidebar panels",
);
assert.doesNotMatch(
  layout,
  /footer-stats|show_footer_stats|siteStatsFinder\.getStats\(\)/,
  "footer must not repeat site stats",
);
assert.match(layout, /item\.children/, "primary navigation must support nested menus");
assert.match(post, /data-image-lightbox/, "posts must expose lightbox opt-in");
assert.match(postScript, /function initMobileToc\(/, "posts need a mobile table of contents");
assert.match(postScript, /function initLightbox\(/, "posts need a lightweight image lightbox");
assert.match(themeSource, /customTemplates:/, "theme must declare custom templates");
assert.match(themeSource, /page_about\.html/, "theme must provide an About page template");
assert.match(themeSource, /post_docs\.html/, "theme must provide a Documentation post template");
assert.match(home, /site_launch_date/, "home sidebar stats must keep launch date compatibility");
assert.match(home, /data-site-launch-compact/, "home sidebar must support optional site uptime");
assert.match(layout, /site\.favicon/, "the bundled mark must be available as a favicon fallback");

const linksPage = await read("src/links.html");
assert.match(
  linksPage,
  /th:each="link : \$\{links\}"/,
  "links page must use PluginLinks variables",
);
assert.match(linksPage, /rel="friend noopener noreferrer"/, "friend links need safe attributes");
assert.match(post, /postFinder\.list\(/, "post sidebar must provide an article list");
assert.match(post, /commentFinder\.list\(/, "post sidebar must support recent comments");
assert.match(
  post,
  /<script\s+type=["']application\/ld\+json["'][^>]*>[\s\S]*?["']@type["']:\s*["']BlogPosting["'][\s\S]*?post\.spec\.title[\s\S]*?<\/script>/,
  "post pages need dynamic BlogPosting JSON-LD",
);
assert.match(
  singlePage,
  /<script\s+type=["']application\/ld\+json["'][^>]*>[\s\S]*?["']@type["']:\s*["']WebPage["'][\s\S]*?singlePage\.spec\.title[\s\S]*?<\/script>/,
  "single pages need WebPage JSON-LD without depending on SEO plugins",
);
assert.match(
  home,
  /["']@type["']:\s*["']Organization["'][\s\S]*?["']logo["']\s*:\s*\{[\s\S]*?["']@type["']:\s*["']ImageObject["']/,
  "home Organization JSON-LD must use ImageObject for logo",
);
assert.match(
  post,
  /lastModifyTime\.isAfter\(post\.spec\.publishTime\)/,
  "BlogPosting dateModified must not precede datePublished",
);
assert.match(post, /show_post_toc != null \? theme\.config\.post\.show_post_toc/);
assert.match(post, /show_post_latest != null \? theme\.config\.post\.show_post_latest/);
assert.match(post, /article-layout--single/, "an empty post sidebar must collapse to one column");
assert.match(home, /show_home_profile != null \? theme\.config\.home\.show_home_profile/);
assert.match(
  home,
  /show_home_sidebar != null \? theme\.config\.home\.show_home_sidebar/,
  "missing upgraded config must keep the home sidebar visible",
);
assert.match(
  post,
  /theme\.config\.content\?\.show_post_comments == true/,
  "missing upgraded config must keep recent comments disabled safely",
);
assert.match(
  home,
  /showHomeCategories[\s\S]*?homeCategories = \$\{categoryFinder\.listAll\(\)\}/,
  "home categories must only be queried when their panel is enabled",
);
assert.match(home, /class=["']home-heading["']/, "home must keep the brand hero section");
assert.match(home, /id=["']home-title["']/, "home hero must expose the site title as H1");
assert.match(home, /profile-panel__mark/, "home sidebar must keep the site logo");
assert.match(home, /profile-panel__copy/, "home sidebar must keep the site title and subtitle");
assert.match(home, /profile-stats/, "home stats belong in the compact sidebar profile");
assert.match(home, /siteStatsFinder\.getStats\(\)/, "home sidebar must use native Halo stats");
assert.match(home, /tagFinder\.listAll\(\)/, "home must query tags through Halo Tag Finder");
assert.match(home, /data-popular-tags/, "home must expose sortable popular tags");
assert.match(mainScript, /function initPopularTags\(/, "home tags must be sorted by post count");
assert.match(
  mainScript,
  /function initActiveNavigation\(/,
  "primary navigation must mark the current page",
);
assert.match(
  await read("src/partials/share-bar.html"),
  /data-share-link/,
  "posts must expose a copy-link control",
);
assert.match(
  await read("src/partials/share-bar.html"),
  /data-share-bar|data-share=/,
  "posts must expose social share controls",
);
assert.match(post, /share-bar\.html/, "posts must include the share bar partial");
assert.match(post, /related-posts/, "posts must expose related articles by category");
assert.match(post, /series-posts|rackora_series/, "posts must support series grouping");
assert.match(postScript, /function initShareBar\(/, "share targets must be wired in post script");
assert.match(postScript, /function initSeriesList\(/, "series lists must be sorted client-side");
assert.match(
  await read("src/category.html"),
  /archive-breadcrumbs/,
  "category pages need breadcrumbs",
);
assert.match(await read("src/tag.html"), /archive-breadcrumbs/, "tag pages need breadcrumbs");
assert.match(
  post,
  /class=["']article-license["']/,
  "posts must render the author and license notice",
);
assert.match(postScript, /function uiText\(/, "dynamic post controls must follow the UI language");
assert.doesNotMatch(
  tags,
  /\|#\$\{tag\.spec\.displayName\}\|/,
  "tag index must not prefix labels with #",
);
assert.doesNotMatch(
  tagPage,
  /\|#\$\{tag\.spec\.displayName\}\|/,
  "tag pages must not prefix labels with #",
);
assert.doesNotMatch(
  post,
  /\|#\$\{tag\.spec\.displayName\}\|/,
  "post tags must not prefix labels with #",
);

await read("public/assets/images/rackora-mark.svg");
const builtThemeMark = await read("templates/assets/images/rackora-mark.svg");
assert.match(builtThemeMark, /<svg\b/, "the built theme must contain the default mark asset");
console.log(
  `Theme validation passed: ${requiredPages.length} routes, config, SEO, and extensions.`,
);
