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

const [themeSource, settingsSource, annotationSource, layout, packageSource, changelog, readme] =
  await Promise.all([
    read("theme.yaml"),
    read("settings.yaml"),
    read("annotation-setting.yaml"),
    read("src/partials/layout.html"),
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
  "Halo injects description metadata",
);
assert.doesNotMatch(layout, /<link\s+rel=["']canonical["']/i, "Halo injects canonical links");

for (const page of requiredPages) {
  const source = await read(`src/${page}`);
  const h1Count = source.match(/<h1\b/gi)?.length ?? 0;
  assert.equal(h1Count, 1, `${page} must contain exactly one page-level H1`);
  assert.match(
    source,
    /<include\s+src=["']layout\.html["']>/,
    `${page} must use the shared layout`,
  );
}

const post = await read("src/post.html");
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
assert.match(home, /site-stats-grid/, "home must expose a structured stats grid");
assert.match(
  home,
  /<th:block\s+th:if="\$\{showHomeStats\}"\s*>[\s\S]*?siteStatsFinder\.getStats\(\)/,
  "home must query stats only inside the stats panel condition",
);
assert.match(home, /\? '标签' : 'Tags'/, "home sidebar must use the concise tag heading");
assert.doesNotMatch(home, /常用标签|Popular tags/, "home must not use the old tag heading");
assert.match(
  home,
  /<th:block\s+th:if="\$\{theme\.config\.content\.show_home_tags == null or theme\.config\.content\.show_home_tags\}"\s*>\s*<th:block th:with="homeTags = \$\{tagFinder\.listAll\(\)\}">/,
  "home must not query tags when sidebar tags are disabled",
);
assert.match(
  archives,
  /post\.categories\[0\]\.status\.permalink/,
  "archives must link each post's primary category",
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

const contentForm = settings?.spec?.forms?.find((form) => form.group === "content");
const imageMode = contentForm?.formSchema?.find((field) => field.name === "image_mode");
assert.equal(imageMode?.value, "none", "article covers must default to low-image mode");
assert.equal(
  contentForm?.formSchema?.find((field) => field.name === "show_home_tags")?.value,
  true,
);
assert.equal(contentForm?.formSchema?.find((field) => field.name === "home_tag_count")?.value, 10);
assert.equal(
  contentForm?.formSchema?.find((field) => field.name === "show_post_license")?.value,
  true,
);
assert.ok(contentForm?.formSchema?.find((field) => field.name === "license_name"));
assert.ok(contentForm?.formSchema?.find((field) => field.name === "license_url"));
assert.deepEqual(
  settings?.spec?.forms?.map((form) => form.group),
  ["basic", "appearance", "content", "stats", "seo", "analytics", "integrations", "monetization"],
  "theme settings must separate site data, presentation, stats, SEO, analytics, integrations, and monetization",
);
const statsForm = settings?.spec?.forms?.find((form) => form.group === "stats");
assert.equal(statsForm?.label, "站点统计");
assert.equal(statsForm?.formSchema?.find((field) => field.name === "show_home_stats")?.value, true);
assert.equal(
  statsForm?.formSchema?.find((field) => field.name === "show_footer_stats")?.value,
  undefined,
  "footer stats must stay unset until legacy config has been migrated",
);
assert.ok(statsForm?.formSchema?.find((field) => field.name === "site_launch_date"));
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
assert.ok(analyticsForm?.formSchema?.find((field) => field.name === "ga4_id"));
assert.ok(analyticsForm?.formSchema?.find((field) => field.name === "clarity_id"));
assert.ok(analyticsForm?.formSchema?.find((field) => field.name === "baidu_analytics_id"));

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
  /<link\b[^>]*rel=["']canonical["']/i,
  "canonical policy must remain under Halo and content governance",
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
assert.match(layout, /siteStatsFinder\.getStats\(\)/, "footer must support native Halo stats");
assert.match(
  layout,
  /<th:block\s+th:if="\$\{showFooterStats\}"\s+th:with="stats = \$\{siteStatsFinder\.getStats\(\)\}"\s*>/,
  "footer must not query site stats when only uptime is enabled",
);
assert.match(
  layout,
  /theme\.config\.basic\.show_footer_stats/,
  "footer must keep legacy stats config compatibility",
);
assert.match(
  layout,
  /theme\.config\.basic\.site_launch_date/,
  "footer must keep legacy launch date compatibility",
);
assert.match(layout, /data-site-launch/, "footer must support optional site uptime");
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
assert.match(home, /tagFinder\.listAll\(\)/, "home must query tags through Halo Tag Finder");
assert.match(home, /data-popular-tags/, "home must expose sortable popular tags");
assert.match(mainScript, /function initPopularTags\(/, "home tags must be sorted by post count");
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
