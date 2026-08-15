import hljs from "highlight.js/lib/core";
import bash from "highlight.js/lib/languages/bash";
import css from "highlight.js/lib/languages/css";
import dockerfile from "highlight.js/lib/languages/dockerfile";
import go from "highlight.js/lib/languages/go";
import ini from "highlight.js/lib/languages/ini";
import java from "highlight.js/lib/languages/java";
import javascript from "highlight.js/lib/languages/javascript";
import json from "highlight.js/lib/languages/json";
import nginx from "highlight.js/lib/languages/nginx";
import plaintext from "highlight.js/lib/languages/plaintext";
import python from "highlight.js/lib/languages/python";
import rust from "highlight.js/lib/languages/rust";
import scss from "highlight.js/lib/languages/scss";
import sql from "highlight.js/lib/languages/sql";
import typescript from "highlight.js/lib/languages/typescript";
import xml from "highlight.js/lib/languages/xml";
import yaml from "highlight.js/lib/languages/yaml";

const languageAliases: Record<string, string> = {
  shell: "bash",
  sh: "bash",
  zsh: "bash",
  yml: "yaml",
  ts: "typescript",
  js: "javascript",
  html: "xml",
  text: "plaintext",
  py: "python",
  golang: "go",
  rs: "rust",
  conf: "nginx",
};

hljs.registerLanguage("bash", bash);
hljs.registerLanguage("css", css);
hljs.registerLanguage("dockerfile", dockerfile);
hljs.registerLanguage("go", go);
hljs.registerLanguage("ini", ini);
hljs.registerLanguage("java", java);
hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("json", json);
hljs.registerLanguage("nginx", nginx);
hljs.registerLanguage("plaintext", plaintext);
hljs.registerLanguage("python", python);
hljs.registerLanguage("rust", rust);
hljs.registerLanguage("scss", scss);
hljs.registerLanguage("sql", sql);
hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("xml", xml);
hljs.registerLanguage("yaml", yaml);

function isChineseUi(): boolean {
  return document.documentElement.dataset.uiLanguage === "zh-CN";
}

function uiText(english: string, chinese: string): string {
  return isChineseUi() ? chinese : english;
}

function slugify(value: string): string {
  return (
    value
      .trim()
      .toLowerCase()
      .replace(/[^\p{Letter}\p{Number}\s-]/gu, "")
      .replace(/[\s_]+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "") || "section"
  );
}

function ensureUniqueId(base: string, usedIds: Set<string>, element: HTMLElement): string {
  let id = base;
  let counter = 2;
  while (true) {
    const existing = document.getElementById(id);
    if (!usedIds.has(id) && (!existing || existing === element)) break;
    id = `${base}-${counter}`;
    counter += 1;
  }
  usedIds.add(id);
  return id;
}

function initTableOfContents(content: HTMLElement): void {
  const section = document.querySelector<HTMLElement>("[data-toc-container]");
  const navigation = section?.querySelector<HTMLElement>("[data-toc]");
  if (!section || !navigation) return;

  const headings = Array.from(content.querySelectorAll<HTMLElement>("h2, h3"));
  if (headings.length < 2) return;

  const usedIds = new Set<string>();
  for (const heading of headings) {
    const label = heading.textContent?.trim() || uiText("Section", "章节");
    heading.id = ensureUniqueId(heading.id || slugify(label), usedIds, heading);

    const anchor = document.createElement("a");
    anchor.className = "heading-anchor";
    anchor.href = `#${heading.id}`;
    anchor.textContent = "#";
    anchor.setAttribute("aria-label", uiText(`Link to ${label}`, `链接到 ${label}`));
    heading.prepend(anchor);

    const link = document.createElement("a");
    link.href = `#${heading.id}`;
    link.dataset.level = heading.tagName.slice(1);
    link.textContent = label;
    navigation.append(link);
  }

  section.hidden = false;
  const links = Array.from(navigation.querySelectorAll<HTMLAnchorElement>("a"));
  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((left, right) => left.boundingClientRect.top - right.boundingClientRect.top)[0];
      if (!visible) return;
      for (const link of links) {
        link.classList.toggle("is-active", link.hash === `#${visible.target.id}`);
      }
    },
    { rootMargin: "-20% 0px -72%", threshold: 0 },
  );
  headings.forEach((heading) => observer.observe(heading));
  initMobileToc(section, navigation);
}

function initMobileToc(section: HTMLElement, navigation: HTMLElement): void {
  if (document.querySelector("[data-mobile-toc]")) return;

  const toggle = document.createElement("button");
  toggle.type = "button";
  toggle.className = "mobile-toc-toggle";
  toggle.dataset.mobileToc = "toggle";
  toggle.setAttribute("aria-expanded", "false");
  toggle.setAttribute("aria-controls", "mobile-toc-panel");
  toggle.innerHTML = `<i data-lucide="list" aria-hidden="true"></i><span>${uiText("Contents", "目录")}</span>`;

  const panel = document.createElement("div");
  panel.id = "mobile-toc-panel";
  panel.className = "mobile-toc-panel";
  panel.hidden = true;
  panel.dataset.mobileToc = "panel";
  panel.innerHTML = `<div class="mobile-toc-panel__sheet"><header><strong>${uiText("On this page", "本页目录")}</strong><button type="button" class="icon-button" data-mobile-toc-close aria-label="${uiText("Close", "关闭")}"><i data-lucide="x" aria-hidden="true"></i></button></header><nav></nav></div>`;
  panel
    .querySelector("nav")!
    .append(...Array.from(navigation.children).map((node) => node.cloneNode(true)));

  const close = (): void => {
    panel.hidden = true;
    document.body.classList.remove("toc-open");
    toggle.setAttribute("aria-expanded", "false");
  };

  toggle.addEventListener("click", () => {
    const open = Boolean(panel.hidden);
    panel.hidden = !open;
    document.body.classList.toggle("toc-open", open);
    toggle.setAttribute("aria-expanded", String(open));
  });
  panel.querySelector("[data-mobile-toc-close]")?.addEventListener("click", close);
  panel.addEventListener("click", (event) => {
    if (event.target === panel) close();
    if ((event.target as Element).closest("a")) close();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !panel.hidden) close();
  });

  section.after(toggle);
  document.body.append(panel);
  document.dispatchEvent(new CustomEvent("rackora:icons"));
}

function languageName(code: HTMLElement): string {
  const className = Array.from(code.classList).find((item) => item.startsWith("language-"));
  const raw = className?.replace("language-", "") || "text";
  return languageAliases[raw] || raw;
}

async function copyText(value: string): Promise<void> {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(value);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.append(textarea);
  textarea.select();
  const copied = document.execCommand("copy");
  textarea.remove();
  if (!copied) throw new Error("Copy command failed");
}

function initCodeBlocks(content: HTMLElement): void {
  for (const pre of content.querySelectorAll<HTMLPreElement>("pre")) {
    if (pre.parentElement?.classList.contains("code-block")) continue;
    const code = pre.querySelector<HTMLElement>("code");
    if (!code) continue;

    const language = languageName(code);
    if (hljs.getLanguage(language)) {
      code.classList.add(`language-${language}`);
      hljs.highlightElement(code);
    }

    const wrapper = document.createElement("div");
    wrapper.className = "code-block";
    pre.before(wrapper);

    const toolbar = document.createElement("div");
    toolbar.className = "code-toolbar";
    const label = document.createElement("span");
    label.textContent = language;
    toolbar.append(label);

    const button = document.createElement("button");
    button.type = "button";
    button.className = "code-copy";
    button.setAttribute("aria-label", uiText("Copy code", "复制代码"));
    button.innerHTML = `<i data-lucide="copy" aria-hidden="true"></i><span>${uiText("Copy", "复制")}</span>`;
    button.addEventListener("click", async () => {
      try {
        await copyText(code.textContent || "");
        button.innerHTML = `<i data-lucide="check" aria-hidden="true"></i><span>${uiText("Copied", "已复制")}</span>`;
        window.setTimeout(() => {
          button.innerHTML = `<i data-lucide="copy" aria-hidden="true"></i><span>${uiText("Copy", "复制")}</span>`;
          document.dispatchEvent(new CustomEvent("rackora:icons"));
        }, 1600);
      } catch {
        button.querySelector("span")!.textContent = uiText("Copy failed", "复制失败");
      }
      document.dispatchEvent(new CustomEvent("rackora:icons"));
    });
    toolbar.append(button);

    wrapper.append(toolbar, pre);
  }
  document.dispatchEvent(new CustomEvent("rackora:icons"));
}

function normalizeHeader(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, "");
}

function initTables(content: HTMLElement): void {
  const productKeywords = [
    "cpu",
    "内存",
    "ram",
    "硬盘",
    "存储",
    "流量",
    "带宽",
    "价格",
    "售价",
    "购买",
  ];
  for (const table of content.querySelectorAll<HTMLTableElement>("table")) {
    if (table.parentElement?.classList.contains("table-scroll")) continue;
    const headers = Array.from(
      table.querySelectorAll<HTMLTableCellElement>("thead th, tr:first-child th"),
    );
    const names = headers.map((header) => normalizeHeader(header.textContent || ""));
    const matches = names.filter((name) =>
      productKeywords.some((keyword) => name.includes(keyword)),
    );
    if (matches.length >= 2) table.classList.add("product-table");

    for (const row of table.tBodies) {
      for (const tableRow of Array.from(row.rows)) {
        Array.from(tableRow.cells).forEach((cell, index) => {
          const header = names[index];
          if (!header) return;
          if (/价格|售价|price/.test(header)) cell.dataset.column = "价格";
          if (/购买|链接|buy/.test(header)) cell.dataset.column = "购买";
        });
      }
    }

    const wrapper = document.createElement("div");
    wrapper.className = "table-scroll";
    wrapper.tabIndex = 0;
    wrapper.setAttribute("role", "region");
    wrapper.setAttribute(
      "aria-label",
      table.classList.contains("product-table")
        ? uiText("Product comparison table", "产品比较表")
        : uiText("Data table", "数据表"),
    );
    table.before(wrapper);
    wrapper.append(table);
  }
}

function initAffiliateMarkup(content: HTMLElement): void {
  for (const link of content.querySelectorAll<HTMLAnchorElement>('a[rel~="sponsored"]')) {
    link.dataset.sponsoredLabel = uiText("Sponsored", "合作链接");
  }
  for (const quote of content.querySelectorAll<HTMLElement>("blockquote")) {
    if (/affiliate|佣金|推广链接|合作链接/i.test(quote.textContent || "")) {
      quote.classList.add("affiliate-disclosure");
    }
  }
}

function initShareLink(): void {
  for (const button of document.querySelectorAll<HTMLButtonElement>("[data-share-link]")) {
    button.addEventListener("click", async () => {
      const shareUrl =
        button.dataset.shareUrl ||
        button.closest<HTMLElement>("[data-share-url]")?.dataset.shareUrl ||
        window.location.href;
      const absolute = new URL(shareUrl, window.location.origin).href;
      try {
        await copyText(absolute);
        button.classList.add("is-copied");
        window.setTimeout(() => button.classList.remove("is-copied"), 1600);
      } catch {
        button.classList.remove("is-copied");
      }
      document.dispatchEvent(new CustomEvent("rackora:icons"));
    });
  }
}

function initShareBar(): void {
  const bar = document.querySelector<HTMLElement>("[data-share-bar]");
  if (!bar) return;

  const title = bar.dataset.shareTitle || document.title;
  const sharePath = bar.dataset.shareUrl || window.location.pathname;
  const url = new URL(sharePath, window.location.origin).href;
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const targets: Record<string, string> = {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
    weibo: `https://service.weibo.com/share/share.php?url=${encodedUrl}&title=${encodedTitle}`,
  };

  for (const link of bar.querySelectorAll<HTMLAnchorElement>("[data-share]")) {
    const href = targets[link.dataset.share || ""];
    if (!href) continue;
    link.href = href;
  }
}

function initSeriesList(): void {
  const list = document.querySelector<HTMLElement>("[data-series-list]");
  if (!list) return;
  const ordered = list.querySelector("ol");
  if (!ordered) return;

  const limit = Math.max(1, Number.parseInt(list.dataset.seriesLimit || "6", 10) || 6);
  const items = Array.from(ordered.children) as HTMLElement[];
  items
    .sort((left, right) => {
      const orderDifference =
        Number.parseInt(left.dataset.seriesOrder || "9999", 10) -
        Number.parseInt(right.dataset.seriesOrder || "9999", 10);
      return orderDifference || 0;
    })
    .forEach((item, index) => {
      if (index < limit) ordered.append(item);
      else item.remove();
    });
}

function initLightbox(content: HTMLElement): void {
  if (content.dataset.imageLightbox !== "true") return;

  const dialog = document.createElement("dialog");
  dialog.className = "image-lightbox";
  dialog.innerHTML = `<button type="button" class="image-lightbox__close" aria-label="${uiText("Close", "关闭")}"><i data-lucide="x" aria-hidden="true"></i></button><img alt="" />`;
  const image = dialog.querySelector("img")!;
  const close = (): void => dialog.close();
  dialog.querySelector("button")?.addEventListener("click", close);
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) close();
  });
  document.body.append(dialog);
  document.dispatchEvent(new CustomEvent("rackora:icons"));

  for (const img of content.querySelectorAll<HTMLImageElement>("img")) {
    if (img.closest("a")) continue;
    img.classList.add("is-zoomable");
    img.addEventListener("click", () => {
      image.src = img.currentSrc || img.src;
      image.alt = img.alt || "";
      dialog.showModal();
    });
  }
}

function initReadingMetrics(content: HTMLElement): void {
  const target = document.querySelector<HTMLElement>("[data-reading-time]");
  if (target) {
    const text = content.textContent?.replace(/\s+/g, "") || "";
    const minutes = Math.max(1, Math.ceil(text.length / (isChineseUi() ? 450 : 900)));
    target.textContent = isChineseUi() ? `约 ${minutes} 分钟` : `${minutes} min read`;
  }

  const progress = document.querySelector<HTMLElement>("[data-reading-progress]");
  if (!progress) return;
  const update = (): void => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    progress.style.width = `${ratio * 100}%`;
  };
  window.addEventListener("scroll", update, { passive: true });
  update();
}

document.addEventListener("DOMContentLoaded", () => {
  const content = document.querySelector<HTMLElement>("[data-article-content]");
  if (!content) return;
  initTableOfContents(content);
  initCodeBlocks(content);
  initTables(content);
  initAffiliateMarkup(content);
  initReadingMetrics(content);
  initShareBar();
  initShareLink();
  initSeriesList();
  initLightbox(content);
});
