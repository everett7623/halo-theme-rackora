import { cp, mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const output = path.join(root, ".preview");
const builtAssets = path.join(root, "templates", "assets");
const assetNames = await readdir(builtAssets);
const cssName = assetNames.find((name) => /^main-.*\.css$/.test(name));
const mainName = assetNames.find((name) => /^main-.*\.js$/.test(name));

if (!cssName || !mainName) {
  throw new Error("Built assets are missing; run pnpm build-only before creating the preview");
}

await rm(output, { recursive: true, force: true });
await mkdir(path.join(output, "assets"), { recursive: true });
await cp(builtAssets, path.join(output, "assets"), { recursive: true });

const mark = await readFile(path.join(root, "public", "images", "rackora-mark.svg"), "utf8");
await writeFile(path.join(output, "assets", "rackora-mark.svg"), mark);

const posts = [
  {
    category: "便宜VPS",
    date: "2026-07-29",
    title: "CloudCone 九周年 DC3 洛杉矶机房优惠：$18.28/年起，续费不变",
    excerpt: "洛杉矶 DC3 新机房首发，记录配置、续费规则、库存状态与本次价格核验时间。",
    views: 28,
  },
  {
    category: "机房测评",
    date: "2026-04-18",
    title: "VMRack L3.VPS.1C2G.Base $49/y 真实测评：三网精品 CN2 GIA + 9929 + CMIN2",
    excerpt: "从硬件、回程、IP 质量和晚高峰表现拆解这台三网精品线路 VPS 的适用范围与限制。",
    views: 124,
  },
  {
    category: "教程",
    date: "2026-04-10",
    title: "Halo 2.x 站点部署与备份：从 Docker 到可验证恢复的完整流程",
    excerpt: "给出环境约束、命令、预期输出、功能验证和回滚路径，适合首次搭建与已有站点迁移。",
    views: 86,
  },
  {
    category: "公告",
    date: "2026-03-28",
    title: "近期测试计划与数据更新说明",
    excerpt: "说明测试样本、价格核验周期和历史文章的持续维护安排。",
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
          <h2 class="post-entry__title"><a href="#">${post.title}</a></h2>
          <p class="post-entry__excerpt">${post.excerpt}</p>
          <div class="post-entry__meta"><span>${post.views} 阅读</span><span>0 评论</span><span>更新 08-13</span></div>
        </div>
      </li>`,
  )
  .join("");

const html = `<!doctype html>
<html lang="zh-CN" data-color-scheme="light" class="color-scheme-light">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Rackora 视觉预览</title>
    <link rel="stylesheet" href="/assets/${cssName}" />
    <script type="module" src="/assets/${mainName}"></script>
  </head>
  <body style="--rack-accent:#08775b">
    <a class="skip-link" href="#main-content">跳到正文</a>
    <header class="site-header site-header--compact">
      <div class="shell header-inner">
        <a class="brand" href="#" aria-label="返回首页">
          <img class="brand-mark" width="34" height="34" src="/assets/rackora-mark.svg" alt="Rackora" />
          <span class="brand-copy"><strong>Rackora</strong><small>独立测试、透明披露、持续更新</small></span>
        </a>
        <button class="icon-button nav-toggle" type="button" aria-label="打开导航" aria-controls="primary-nav" aria-expanded="false" data-nav-toggle><i data-lucide="menu"></i></button>
        <nav id="primary-nav" class="site-nav" aria-label="主导航" data-site-nav>
          <ul><li><a href="#">首页</a></li><li><a href="#">便宜VPS</a></li><li><a href="#">机房测评</a></li><li><a href="#">教程</a></li><li><a href="#">脚本工具</a></li><li><a href="#">FAQ</a></li></ul>
        </nav>
        <div class="header-actions"><button class="icon-button" type="button" title="搜索" aria-label="搜索"><i data-lucide="search"></i></button><button class="icon-button" type="button" title="切换配色" aria-label="切换配色" data-theme-toggle><i data-lucide="moon"></i></button></div>
      </div>
    </header>
    <main id="main-content" class="site-main">
      <div class="shell">
        <div class="home-grid">
          <section class="home-heading" aria-labelledby="home-title">
            <h1 id="home-title">1VPS</h1><p>真实 VPS 测评、优惠核验和可复现运维教程</p>
            <div class="home-heading__meta"><span>31 篇内容</span><span>价格与库存按核验时间为准</span></div>
          </section>
          <section class="content-section" aria-labelledby="latest-title">
            <header class="section-heading"><h2 id="latest-title">最新文章</h2><a class="text-link" href="#">查看归档</a></header>
            <ul class="post-list post-list--cards">${postMarkup}</ul>
            <nav class="pagination" aria-label="分页"><span class="pagination__status">1 / 4</span><a class="pagination__link" href="#"><span>下一页</span><i data-lucide="arrow-right"></i></a></nav>
          </section>
          <aside class="home-sidebar" aria-label="站点信息">
            <section class="profile-panel"><img class="profile-panel__mark" width="64" height="64" src="/assets/rackora-mark.svg" alt="Rackora" /><div><h2>1VPS</h2><p>真实测试、透明披露和持续更新的中文 VPS 内容索引。</p></div><nav class="profile-socials" aria-label="社交账号"><a href="#" title="GitHub" aria-label="GitHub"><i data-lucide="github" aria-hidden="true"></i></a><a href="#" title="Telegram" aria-label="Telegram"><i data-lucide="send" aria-hidden="true"></i></a><a href="#" title="RSS" aria-label="RSS"><i data-lucide="rss" aria-hidden="true"></i></a><a href="#" title="网站" aria-label="网站"><i data-lucide="globe" aria-hidden="true"></i></a></nav><dl class="profile-stats"><div><dt>文章</dt><dd>31</dd></div><div><dt>栏目</dt><dd>6</dd></div></dl></section>
            <section class="sidebar-panel"><header><h2>内容栏目</h2><a href="#">全部</a></header><ul><li><a href="#"><span>便宜VPS</span><small>16</small></a></li><li><a href="#"><span>机房测评</span><small>9</small></a></li><li><a href="#"><span>教程</span><small>3</small></a></li><li><a href="#"><span>脚本工具</span><small>3</small></a></li></ul></section>
            <nav class="sidebar-shortcuts"><a href="#">文章归档</a><a href="#">标签索引</a></nav>
          </aside>
        </div>
      </div>
    </main>
    <footer class="site-footer"><div class="shell footer-inner"><div><strong>Rackora</strong><p>独立测试、透明披露、持续更新。</p></div><nav><a href="#">归档</a><a href="#">栏目</a><a href="#">标签</a></nav><small>Powered by Halo · Rackora</small></div></footer>
    <button class="back-to-top" type="button" aria-label="返回顶部" data-back-to-top><i data-lucide="chevron-up"></i></button>
  </body>
</html>`;

await writeFile(path.join(output, "index.html"), html);
console.log(`Preview generated at ${path.join(output, "index.html")}`);
