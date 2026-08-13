import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import YAML from "yaml";

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
  "error/404.html",
];

async function read(relativePath) {
  return readFile(path.join(root, relativePath), "utf8");
}

const [themeSource, settingsSource, annotationSource, layout, packageSource, changelog] =
  await Promise.all([
    read("theme.yaml"),
    read("settings.yaml"),
    read("annotation-setting.yaml"),
    read("src/partials/layout.html"),
    read("package.json"),
    read("CHANGELOG.md"),
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
  changelog,
  new RegExp(`^## \\[${packageManifest.version.replaceAll(".", "\\.")}\\]`, "m"),
  "CHANGELOG.md must contain the current release version",
);

assert.match(layout, /<html\b[^>]*xmlns:th=/, "layout must declare the Thymeleaf namespace");
assert.match(layout, /menuFinder\.getPrimary\(\)/, "layout must render the primary Halo menu");
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
const adSlot = await read("src/partials/ad-slot.html");
const mainScript = await read("src/js/main.ts");
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
assert.match(mainScript, /\bGithub\b/, "social icons must be registered with Lucide");

const basicForm = settings?.spec?.forms?.find((form) => form.group === "basic");
const socials = basicForm?.formSchema?.find((field) => field.name === "socials");
assert.equal(socials?.$formkit, "array", "socials must use Halo's sortable array input");

const contentForm = settings?.spec?.forms?.find((form) => form.group === "content");
const imageMode = contentForm?.formSchema?.find((field) => field.name === "image_mode");
assert.equal(imageMode?.value, "none", "article covers must default to low-image mode");
assert.deepEqual(
  settings?.spec?.forms?.map((form) => form.group),
  ["basic", "appearance", "content", "seo", "monetization"],
  "theme settings must separate presentation, SEO, and monetization",
);
const seoForm = settings?.spec?.forms?.find((form) => form.group === "seo");
assert.equal(seoForm?.formSchema?.find((field) => field.name === "noindex_tags")?.value, true);
assert.equal(seoForm?.formSchema?.find((field) => field.name === "noindex_archives")?.value, true);
assert.ok(seoForm?.formSchema?.find((field) => field.name === "google_verification"));
assert.ok(seoForm?.formSchema?.find((field) => field.name === "bing_verification"));
assert.ok(seoForm?.formSchema?.find((field) => field.name === "baidu_verification"));

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

await read("public/images/rackora-mark.svg");
console.log(
  `Theme validation passed: ${requiredPages.length} routes, config, SEO, and extensions.`,
);
