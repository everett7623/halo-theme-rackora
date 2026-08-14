import { cp, mkdir, readdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const output = path.join(root, ".preview");
const builtAssets = path.join(root, "templates", "assets");
const assetNames = await readdir(builtAssets);
const cssName = assetNames.find((name) => /^main-.*\.css$/.test(name));
const mainName = assetNames.find((name) => /^main-.*\.js$/.test(name));
const postName = assetNames.find((name) => /^post-.*\.js$/.test(name));

if (!cssName || !mainName || !postName) {
  throw new Error("Built assets are missing; run pnpm build-only before creating the preview");
}

await rm(output, { recursive: true, force: true });
await mkdir(path.join(output, "assets"), { recursive: true });
await cp(builtAssets, path.join(output, "assets"), { recursive: true });

const posts = [
  {
    category: "Infrastructure",
    date: "2026-07-29",
    title: "A practical framework for reviewing infrastructure services",
    excerpt:
      "A repeatable approach to documenting performance, pricing, constraints, and verification dates.",
    views: 128,
  },
  {
    category: "Engineering",
    date: "2026-04-18",
    title: "Building a reliable content workflow around Halo 2.x",
    excerpt: "From editorial structure to backups and release checks, with fewer moving parts.",
    views: 92,
  },
  {
    category: "Guides",
    date: "2026-04-10",
    title: "Deploy, verify, and restore a small independent publication",
    excerpt:
      "Environment constraints, expected outputs, functional checks, and a tested rollback path.",
    views: 76,
  },
  {
    category: "Notes",
    date: "2026-03-28",
    title: "What we are testing and updating this quarter",
    excerpt: "A short record of current samples, review cadence, and maintenance priorities.",
    views: 42,
  },
];

const postMarkup = posts
  .map(
    (post) => `
      <li class="post-entry">
        <div class="post-entry__body">
          <div class="post-entry__eyebrow">
            <a class="category-link" href="#">${post.category}</a>
            <time datetime="${post.date}">${post.date}</time>
          </div>
          <h2 class="post-entry__title"><a href="/post.html">${post.title}</a></h2>
          <p class="post-entry__excerpt">${post.excerpt}</p>
          <div class="post-entry__meta"><span>${post.views} views</span><span>0 comments</span><span>Updated 08-13</span></div>
        </div>
      </li>`,
  )
  .join("");

const header = `
  <header class="site-header site-header--compact" data-preview-header>
    <div class="shell header-inner">
      <a class="brand" href="/" aria-label="Back to home">
        <img class="brand-mark" width="34" height="34" src="/assets/images/rackora-mark.svg" alt="Rackora" />
        <span class="brand-copy"><strong>Rackora</strong><small>Independent publishing with clarity and care.</small></span>
      </a>
      <button class="icon-button nav-toggle" type="button" aria-label="Open navigation" aria-controls="primary-nav" aria-expanded="false" data-nav-toggle><i data-lucide="menu"></i></button>
      <nav id="primary-nav" class="site-nav" aria-label="Primary navigation" data-site-nav>
        <ul><li><a href="/">Home</a></li><li><a href="#">Infrastructure</a></li><li><a href="#">Reviews</a></li><li><a href="#">Guides</a></li><li><a href="#">Notes</a></li><li><a href="#">About</a></li></ul>
      </nav>
      <div class="header-actions"><button class="icon-button" type="button" title="Search" aria-label="Search"><i data-lucide="search"></i></button><button class="icon-button" type="button" title="Toggle color scheme" aria-label="Toggle color scheme" data-theme-toggle><i data-lucide="moon"></i></button></div>
    </div>
  </header>`;

const footer = `
  <footer class="site-footer"><div class="shell footer-inner"><div><strong>Rackora</strong><p>Independent publishing with clarity and care.</p></div><nav><a href="#">Archives</a><a href="#">Categories</a><a href="#">Tags</a><a href="#">Links</a><a href="#">RSS</a></nav><small>Powered by Halo · Rackora · Everett Labs · Region SG</small><p class="footer-compliance"><a href="#">Example ICP 00000000</a><a href="#">Public security 00000000000000</a></p><p class="footer-stats"><span>31 posts</span><span>128 comments</span><span>Online for 365 days</span></p></div></footer>
  <button class="back-to-top" type="button" aria-label="Back to top" data-back-to-top><i data-lucide="chevron-up"></i></button>`;

function page(title, body, scripts = "") {
  return `<!doctype html>
<html lang="en-US" data-color-scheme="light" data-ui-language="en" class="color-scheme-light">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
    <link rel="stylesheet" href="/assets/${cssName}" />
    <style>[data-preview-header] { position: relative; }</style>
    <script type="module" src="/assets/${mainName}"></script>
    ${scripts}
  </head>
  <body style="--rack-accent:#08775b">
    <a class="skip-link" href="#main-content">Skip to content</a>
    ${header}
    <main id="main-content" class="site-main"><div class="shell">${body}</div></main>
    ${footer}
  </body>
</html>`;
}

const home = `
  <div class="home-grid">
    <section class="home-heading" aria-labelledby="home-title">
      <h1 id="home-title">Rackora</h1><p>A quiet, content-first theme for independent publishing.</p>
      <div class="home-heading__meta"><span>31 posts</span><span>Independent publishing, clearly presented</span></div>
    </section>
    <section class="content-section" aria-labelledby="latest-title">
      <header class="section-heading"><h2 id="latest-title">Latest posts</h2><a class="text-link" href="#">View archives</a></header>
      <ul class="post-list post-list--cards">${postMarkup}</ul>
      <nav class="pagination" aria-label="Pagination"><span class="pagination__status">1 / 4</span><a class="pagination__link" href="#"><span>Next</span><i data-lucide="arrow-right"></i></a></nav>
    </section>
    <aside class="home-sidebar" aria-label="Site information">
      <section class="profile-panel"><img class="profile-panel__mark" width="64" height="64" src="/assets/images/rackora-mark.svg" alt="Rackora" /><div><h2>Rackora</h2><p>Independent publishing with clarity, useful context, and fewer distractions.</p></div><nav class="profile-socials" aria-label="Social profiles"><a href="#" title="GitHub" aria-label="GitHub"><i data-lucide="github" aria-hidden="true"></i></a><a href="#" title="Telegram" aria-label="Telegram"><i data-lucide="send" aria-hidden="true"></i></a><a href="#" title="RSS" aria-label="RSS"><i data-lucide="rss" aria-hidden="true"></i></a><a href="#" title="Website" aria-label="Website"><i data-lucide="globe" aria-hidden="true"></i></a></nav></section>
      <section class="sidebar-panel site-stats-panel"><header><h2>Site stats</h2></header><dl class="site-stats-grid"><div><dt>Visits</dt><dd>128</dd></div><div><dt>Posts</dt><dd>31</dd></div><div><dt>Comments</dt><dd>42</dd></div><div><dt>Upvotes</dt><dd>17</dd></div><div><dt>Categories</dt><dd>6</dd></div><div><dt>Uptime</dt><dd data-site-launch="2026-03-01" data-site-launch-compact>--</dd></div></dl></section>
      <section class="sidebar-panel"><header><h2>Categories</h2><a href="#">All</a></header><ul><li><a href="#"><span>Infrastructure</span><small>16</small></a></li><li><a href="#"><span>Reviews</span><small>9</small></a></li><li><a href="#"><span>Guides</span><small>3</small></a></li><li><a href="#"><span>Notes</span><small>3</small></a></li></ul></section>
      <section class="sidebar-panel sidebar-panel--tags"><header><h2>Tags</h2><a href="#">All</a></header><ul class="sidebar-tag-list" data-popular-tags data-tag-limit="8"><li data-tag-count="4"><a href="#">Halo</a></li><li data-tag-count="13"><a href="#">Performance</a></li><li data-tag-count="8"><a href="#">Linux</a></li><li data-tag-count="17"><a href="#">Infrastructure</a></li><li data-tag-count="6"><a href="#">Security</a></li><li data-tag-count="11"><a href="#">Networking</a></li><li data-tag-count="3"><a href="#">Writing</a></li><li data-tag-count="9"><a href="#">Automation</a></li><li data-tag-count="2"><a href="#">Design</a></li></ul></section>
    </aside>
  </div>`;

const article = `
  <div class="reading-progress" aria-hidden="true"><span data-reading-progress></span></div>
  <div class="article-layout">
    <article class="article" data-article>
      <header class="article-header">
        <nav class="breadcrumbs" aria-label="Breadcrumb"><span><a href="/">Home</a></span><span>/</span><span><a href="#">Guides</a></span><span>/</span><span>Article</span></nav>
        <h1 class="article-title">Designing a calmer technical publication</h1>
        <p class="article-deck">A practical guide to hierarchy, code presentation, content licensing, and useful navigation.</p>
        <div class="article-meta"><span><a class="article-author" href="#">Everett Labs</a></span><time>Published 2026-08-14</time><span data-reading-time>Calculating reading time</span><span>128 views</span></div>
      </header>
      <div id="article-content" class="article-content" data-article-content>
        <p>A minimal theme should help the reader understand structure without turning every section into a decorative object. Rackora uses a single accent color, restrained surfaces, and <code>semantic HTML</code>.</p>
        <h2 id="content-hierarchy">Content hierarchy</h2>
        <p>Headings now use a quiet accent marker inspired by Fuwari's clarity while keeping Rackora's technical publishing tone.</p>
        <blockquote><p>Good interface hierarchy remains visible even when images are removed.</p></blockquote>
        <h3>Keep the system small</h3>
        <p>The theme relies on Halo for content, comments, search, and feeds, while Rackora emits route-aware canonical and social metadata.</p>
        <pre><code class="language-yaml">theme:
  uiLanguage: en
  imageMode: none
  popularTags: 10</code></pre>
        <h2>Structured technical content</h2>
        <p>Tables remain readable on small screens and code blocks expose their language and a copy action.</p>
        <table><thead><tr><th>Feature</th><th>Owner</th><th>Result</th></tr></thead><tbody><tr><td>Search</td><td>Halo plugin</td><td>Integrated</td></tr><tr><td>Code highlighting</td><td>Rackora</td><td>Built in</td></tr><tr><td>Backups</td><td>Server/plugin</td><td>External</td></tr></tbody></table>
        <h2>Publish with context</h2>
        <p>Each post closes with its permanent URL, author, publication date, and declared license.</p>
      </div>
      <footer class="article-footer">
        <div class="article-tags" aria-label="Post tags"><a href="#">Halo</a><a href="#">Design</a><a href="#">Publishing</a></div>
        <aside class="article-license" aria-label="Author and copyright notice"><div class="article-license__lead"><strong>Designing a calmer technical publication</strong><a href="/post.html">http://127.0.0.1:4173/post.html</a></div><dl><div><dt>Author</dt><dd>Everett Labs</dd></div><div><dt>Published</dt><dd>2026-08-14</dd></div><div><dt>License</dt><dd>All rights reserved</dd></div></dl><span class="article-license__mark" aria-hidden="true">©</span></aside>
        <nav class="post-navigation" aria-label="Adjacent posts"><a href="#"><span>Previous</span><strong>Building a reliable content workflow</strong></a><a href="#"><span>Next</span><strong>Verification notes for independent sites</strong></a></nav>
      </footer>
    </article>
    <aside class="article-sidebar" aria-label="Post navigation">
      <section class="article-sidebar__section" data-toc-container hidden><h2>On this page</h2><nav data-toc></nav></section>
      <section class="article-sidebar__section"><h2>Latest posts</h2><ol class="article-sidebar__posts"><li><a href="#">A practical framework for infrastructure reviews</a></li><li><a href="#">Building a reliable content workflow</a></li><li><a href="#">Deploy and restore a small publication</a></li></ol></section>
    </aside>
  </div>`;

const archiveRows = posts
  .map(
    (post) => `
      <li class="timeline-entry">
        <time class="timeline-entry__date" datetime="${post.date}">${post.date.slice(5)}</time>
        <a class="timeline-entry__title" href="/post.html">${post.title}</a>
        <a class="timeline-entry__category" href="#">${post.category}</a>
      </li>`,
  )
  .join("");

const archives = `
  <header class="archive-heading">
    <h1>Archives</h1>
    <p>31 public posts, organized by publish date.</p>
  </header>
  <div class="timeline">
    <section class="timeline-year">
      <h2>2026</h2>
      <div class="timeline-month">
        <h3>Recent posts</h3>
        <ol>${archiveRows}</ol>
      </div>
    </section>
  </div>`;

await writeFile(path.join(output, "index.html"), page("Rackora preview", home));
await writeFile(path.join(output, "archives.html"), page("Archives - Rackora", archives));
await writeFile(
  path.join(output, "post.html"),
  page(
    "Designing a calmer technical publication - Rackora",
    article,
    `<script type="module" src="/assets/${postName}"></script>`,
  ),
);
console.log(`Preview generated at ${output}`);
