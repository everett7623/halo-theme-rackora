import hljs from "highlight.js/lib/core";
import bash from "highlight.js/lib/languages/bash";
import dockerfile from "highlight.js/lib/languages/dockerfile";
import ini from "highlight.js/lib/languages/ini";
import javascript from "highlight.js/lib/languages/javascript";
import json from "highlight.js/lib/languages/json";
import nginx from "highlight.js/lib/languages/nginx";
import plaintext from "highlight.js/lib/languages/plaintext";
import typescript from "highlight.js/lib/languages/typescript";
import xml from "highlight.js/lib/languages/xml";
import yaml from "highlight.js/lib/languages/yaml";

const languageAliases: Record<string, string> = {
  shell: "bash",
  sh: "bash",
  yml: "yaml",
  ts: "typescript",
  js: "javascript",
  html: "xml",
  text: "plaintext",
};

hljs.registerLanguage("bash", bash);
hljs.registerLanguage("dockerfile", dockerfile);
hljs.registerLanguage("ini", ini);
hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("json", json);
hljs.registerLanguage("nginx", nginx);
hljs.registerLanguage("plaintext", plaintext);
hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("xml", xml);
hljs.registerLanguage("yaml", yaml);

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

function ensureUniqueId(base: string, usedIds: Set<string>): string {
  let id = base;
  let counter = 2;
  while (usedIds.has(id) || document.getElementById(id)) {
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
    const label = heading.textContent?.trim() || "章节";
    heading.id = ensureUniqueId(heading.id || slugify(label), usedIds);

    const anchor = document.createElement("a");
    anchor.className = "heading-anchor";
    anchor.href = `#${heading.id}`;
    anchor.textContent = "#";
    anchor.setAttribute("aria-label", `链接到 ${label}`);
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
      const visible = entries.find((entry) => entry.isIntersecting);
      if (!visible) return;
      for (const link of links) {
        link.classList.toggle("is-active", link.hash === `#${visible.target.id}`);
      }
    },
    { rootMargin: "-20% 0px -72%", threshold: 0 },
  );
  headings.forEach((heading) => observer.observe(heading));
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
    button.setAttribute("aria-label", "复制代码");
    button.innerHTML = '<i data-lucide="copy" aria-hidden="true"></i><span>复制</span>';
    button.addEventListener("click", async () => {
      try {
        await copyText(code.textContent || "");
        button.innerHTML = '<i data-lucide="check" aria-hidden="true"></i><span>已复制</span>';
        window.setTimeout(() => {
          button.innerHTML = '<i data-lucide="copy" aria-hidden="true"></i><span>复制</span>';
          document.dispatchEvent(new CustomEvent("rackora:icons"));
        }, 1600);
      } catch {
        button.querySelector("span")!.textContent = "复制失败";
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
      table.classList.contains("product-table") ? "产品比较表" : "数据表",
    );
    table.before(wrapper);
    wrapper.append(table);
  }
}

function initAffiliateMarkup(content: HTMLElement): void {
  for (const link of content.querySelectorAll<HTMLAnchorElement>('a[rel~="sponsored"]')) {
    link.dataset.sponsoredLabel = "合作链接";
  }
  for (const quote of content.querySelectorAll<HTMLElement>("blockquote")) {
    if (/affiliate|佣金|推广链接|合作链接/i.test(quote.textContent || "")) {
      quote.classList.add("affiliate-disclosure");
    }
  }
}

function initReadingMetrics(content: HTMLElement): void {
  const target = document.querySelector<HTMLElement>("[data-reading-time]");
  if (target) {
    const text = content.textContent?.replace(/\s+/g, "") || "";
    target.textContent = `约 ${Math.max(1, Math.ceil(text.length / 450))} 分钟`;
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
});
