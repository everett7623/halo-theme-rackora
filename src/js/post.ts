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
  console: "bash",
  yml: "yaml",
  ts: "typescript",
  tsx: "typescript",
  js: "javascript",
  jsx: "javascript",
  html: "xml",
  htm: "xml",
  svg: "xml",
  text: "plaintext",
  txt: "plaintext",
  plain: "plaintext",
  py: "python",
  golang: "go",
  rs: "rust",
  conf: "nginx",
  toml: "ini",
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

function headingLabel(heading: HTMLElement): string {
  const clone = heading.cloneNode(true) as HTMLElement;
  for (const anchor of clone.querySelectorAll(".heading-anchor")) {
    anchor.remove();
  }
  return clone.textContent?.trim() || "";
}

function initTableOfContents(content: HTMLElement): void {
  const section = document.querySelector<HTMLElement>("[data-toc-container]");
  const navigation = section?.querySelector<HTMLElement>("[data-toc]");
  if (!section || !navigation) return;

  const headings = Array.from(content.querySelectorAll<HTMLElement>("h2, h3")).filter((heading) => {
    if (heading.hidden || heading.getAttribute("aria-hidden") === "true") return false;
    if (heading.closest('[hidden], [aria-hidden="true"]')) return false;
    return headingLabel(heading).length > 0;
  });
  if (headings.length < 2) return;

  const usedIds = new Set<string>();
  for (const heading of headings) {
    const label = headingLabel(heading);
    heading.id = ensureUniqueId(heading.id || slugify(label), usedIds, heading);

    if (!heading.querySelector(".heading-anchor")) {
      const anchor = document.createElement("a");
      anchor.className = "heading-anchor";
      anchor.href = `#${heading.id}`;
      anchor.textContent = "#";
      anchor.setAttribute("aria-label", uiText(`Link to ${label}`, `链接到 ${label}`));
      heading.prepend(anchor);
    }

    const link = document.createElement("a");
    link.href = `#${heading.id}`;
    link.dataset.level = heading.tagName.slice(1);
    link.textContent = label;
    navigation.append(link);
  }

  section.hidden = false;
  initMobileToc(section, navigation);
  const tocLinks = Array.from(
    document.querySelectorAll<HTMLAnchorElement>("[data-toc] a, [data-mobile-toc] nav a"),
  );
  let activeTargetId = "";
  const setActiveLink = (targetId: string): void => {
    if (targetId === activeTargetId) return;
    activeTargetId = targetId;
    for (const link of tocLinks) {
      const active = link.getAttribute("href") === `#${targetId}`;
      link.classList.toggle("is-active", active);
      if (active) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    }
  };

  let configuredHeader = 72;
  const syncHeaderHeight = (): void => {
    const parsed = Number.parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue("--rack-header-height"),
    );
    configuredHeader = Number.isFinite(parsed) ? parsed : 72;
  };
  syncHeaderHeight();

  let updateScheduled = false;
  const updateActiveHeading = (): void => {
    updateScheduled = false;
    const marker = Math.max(configuredHeader + 24, Math.min(window.innerHeight * 0.48, 520));
    let activeHeading = headings[0];
    for (const heading of headings) {
      if (heading.getBoundingClientRect().top > marker) break;
      activeHeading = heading;
    }
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
      activeHeading = headings.at(-1) || activeHeading;
    }
    setActiveLink(activeHeading.id);
  };
  const scheduleActiveHeading = (): void => {
    if (updateScheduled) return;
    updateScheduled = true;
    window.requestAnimationFrame(updateActiveHeading);
  };

  scheduleActiveHeading();
  window.addEventListener("scroll", scheduleActiveHeading, { passive: true });
  window.addEventListener("resize", () => {
    syncHeaderHeight();
    scheduleActiveHeading();
  });
  window.addEventListener("hashchange", scheduleActiveHeading);
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
  panel.setAttribute("role", "dialog");
  panel.setAttribute("aria-modal", "true");
  panel.setAttribute("aria-label", uiText("On this page", "本页目录"));
  panel.innerHTML = `<div class="mobile-toc-panel__sheet"><header><strong>${uiText("On this page", "本页目录")}</strong><button type="button" class="icon-button" data-mobile-toc-close aria-label="${uiText("Close", "关闭")}"><i data-lucide="x" aria-hidden="true"></i></button></header><nav></nav></div>`;
  panel
    .querySelector("nav")!
    .append(...Array.from(navigation.children).map((node) => node.cloneNode(true)));

  const close = (restoreFocus = false): void => {
    if (panel.hidden) return;
    panel.hidden = true;
    document.body.classList.remove("toc-open");
    toggle.setAttribute("aria-expanded", "false");
    if (restoreFocus) toggle.focus();
  };

  toggle.addEventListener("click", () => {
    const open = Boolean(panel.hidden);
    if (open) {
      document.dispatchEvent(
        new CustomEvent("rackora:overlay-open", { detail: { source: "toc" } }),
      );
    }
    panel.hidden = !open;
    document.body.classList.toggle("toc-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    if (open) {
      panel.querySelector<HTMLElement>("a.is-active, [data-mobile-toc-close]")?.focus();
    }
  });
  document.addEventListener("rackora:overlay-open", (event) => {
    const detail = (event as CustomEvent<{ source?: string }>).detail;
    if (detail?.source !== "toc" && !panel.hidden) close();
  });
  panel.querySelector("[data-mobile-toc-close]")?.addEventListener("click", () => close(true));
  panel.addEventListener("click", (event) => {
    if (event.target === panel) close(true);
    if ((event.target as Element).closest("a")) close();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !panel.hidden) close(true);
  });
  window.addEventListener("resize", () => {
    if (window.innerWidth > 960 && !panel.hidden) close();
  });

  const sidebar = section.closest<HTMLElement>(".article-sidebar");
  if (sidebar) sidebar.after(toggle);
  else section.after(toggle);
  document.body.append(panel);
  document.dispatchEvent(new CustomEvent("rackora:icons"));
}

function languageName(code: HTMLElement, pre?: HTMLElement | null): string {
  const classes = [...Array.from(code.classList), ...(pre ? Array.from(pre.classList) : [])];
  const className = classes.find((item) => /^(?:language|lang)-.+/i.test(item));
  const raw = className ? className.replace(/^(?:language|lang)-/i, "").toLowerCase() : "text";
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

const codeCopyTimers = new WeakMap<HTMLButtonElement, number>();

function initCodeBlocks(content: HTMLElement): void {
  const defaultCopyLabel = uiText("Copy code", "复制代码");
  const defaultCopyText = uiText("Copy", "复制");
  for (const pre of content.querySelectorAll<HTMLPreElement>("pre")) {
    if (pre.parentElement?.classList.contains("code-block")) continue;
    const code = pre.querySelector<HTMLElement>("code");
    if (!code) continue;

    const language = languageName(code, pre);
    if (hljs.getLanguage(language)) {
      code.classList.add(`language-${language}`);
      hljs.highlightElement(code);
    }

    const wrapper = document.createElement("div");
    wrapper.className = "code-block";
    pre.tabIndex = 0;
    pre.setAttribute("role", "region");
    pre.setAttribute("aria-label", uiText(`${language} code block`, `${language} 代码块`));
    pre.before(wrapper);

    const toolbar = document.createElement("div");
    toolbar.className = "code-toolbar";
    const label = document.createElement("span");
    label.textContent = language;
    toolbar.append(label);

    const button = document.createElement("button");
    button.type = "button";
    button.className = "code-copy";
    button.setAttribute("aria-label", defaultCopyLabel);
    button.innerHTML = `<i data-lucide="copy" aria-hidden="true"></i><span>${defaultCopyText}</span>`;
    button.addEventListener("click", async () => {
      window.clearTimeout(codeCopyTimers.get(button));
      try {
        await copyText(code.textContent || "");
        const copiedText = uiText("Copied", "已复制");
        button.classList.add("is-copied");
        button.classList.remove("is-failed");
        button.setAttribute("aria-label", copiedText);
        button.innerHTML = `<i data-lucide="check" aria-hidden="true"></i><span>${copiedText}</span>`;
      } catch {
        const failedText = uiText("Copy failed", "复制失败");
        button.classList.add("is-failed");
        button.classList.remove("is-copied");
        button.setAttribute("aria-label", failedText);
        button.innerHTML = `<i data-lucide="x" aria-hidden="true"></i><span>${failedText}</span>`;
      }
      document.dispatchEvent(new CustomEvent("rackora:icons"));
      codeCopyTimers.set(
        button,
        window.setTimeout(() => {
          button.classList.remove("is-copied", "is-failed");
          button.setAttribute("aria-label", defaultCopyLabel);
          button.innerHTML = `<i data-lucide="copy" aria-hidden="true"></i><span>${defaultCopyText}</span>`;
          document.dispatchEvent(new CustomEvent("rackora:icons"));
        }, 1600),
      );
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
    const headerRow = table.tHead?.rows[0] || table.rows[0];
    const headers = headerRow
      ? Array.from(headerRow.querySelectorAll<HTMLTableCellElement>(":scope > th"))
      : [];
    const names = headers.map((header) => normalizeHeader(header.textContent || ""));
    const matches = names.filter((name) =>
      productKeywords.some((keyword) => name.includes(keyword)),
    );
    if (matches.length >= 2) table.classList.add("product-table");

    for (const row of table.tBodies) {
      for (const tableRow of Array.from(row.rows)) {
        if (tableRow === headerRow) continue;
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

const shareFeedbackTimers = new WeakMap<HTMLButtonElement, number>();

function setShareLinkIcon(button: HTMLButtonElement, name: "copy" | "check" | "x"): void {
  button.querySelector("svg, i[data-lucide]")?.remove();
  const icon = document.createElement("i");
  icon.dataset.lucide = name;
  icon.setAttribute("aria-hidden", "true");
  button.prepend(icon);
}

// 复制文章链接后的反馈：图标切换为对勾 / 叉号，同步可访问名称并由 live region 播报，1.6 秒后恢复。
// 连续点击时先清掉上一次的恢复计时，避免旧计时提前把新状态还原。
function showShareLinkFeedback(button: HTMLButtonElement, copied: boolean): void {
  const defaultLabel = (button.dataset.defaultLabel ||= button.getAttribute("aria-label") || "");
  const message = copied ? uiText("Link copied", "链接已复制") : uiText("Copy failed", "复制失败");
  const status = button
    .closest("[data-share-bar]")
    ?.querySelector<HTMLElement>("[data-share-status]");

  window.clearTimeout(shareFeedbackTimers.get(button));
  button.classList.toggle("is-copied", copied);
  button.classList.toggle("is-failed", !copied);
  button.setAttribute("aria-label", message);
  button.title = message;
  setShareLinkIcon(button, copied ? "check" : "x");
  if (status) status.textContent = message;

  shareFeedbackTimers.set(
    button,
    window.setTimeout(() => {
      button.classList.remove("is-copied", "is-failed");
      button.setAttribute("aria-label", defaultLabel);
      button.title = defaultLabel;
      setShareLinkIcon(button, "copy");
      if (status) status.textContent = "";
      document.dispatchEvent(new CustomEvent("rackora:icons"));
    }, 1600),
  );
}

function initShareLink(): void {
  for (const bar of document.querySelectorAll<HTMLElement>("[data-share-bar]")) {
    if (!bar.querySelector("[data-share-link]") || bar.querySelector("[data-share-status]"))
      continue;
    const status = document.createElement("span");
    status.className = "share-bar__status";
    status.dataset.shareStatus = "";
    status.setAttribute("role", "status");
    bar.append(status);
  }

  for (const button of document.querySelectorAll<HTMLButtonElement>("[data-share-link]")) {
    button.addEventListener("click", async () => {
      const shareUrl =
        button.dataset.shareUrl ||
        button.closest<HTMLElement>("[data-share-url]")?.dataset.shareUrl ||
        window.location.href;
      const absolute = new URL(shareUrl, window.location.origin).href;
      try {
        await copyText(absolute);
        showShareLinkFeedback(button, true);
      } catch {
        showShareLinkFeedback(button, false);
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
  const encodedMessage = encodeURIComponent(`${title}\n${url}`);

  const targets: Record<string, string> = {
    x: `https://x.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    reddit: `https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`,
    telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodedMessage}`,
    weibo: `https://service.weibo.com/share/share.php?url=${encodedUrl}&title=${encodedTitle}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedMessage}`,
  };

  for (const link of bar.querySelectorAll<HTMLAnchorElement>("[data-share]")) {
    const href = targets[link.dataset.share || ""];
    if (!href) continue;
    const current = link.getAttribute("href");
    if (!current || current === "#") link.href = href;
  }
}

function parseSeriesOrder(value: string | undefined): number {
  const parsed = Number.parseInt(value || "", 10);
  return Number.isFinite(parsed) ? parsed : 9999;
}

function initSeriesList(): void {
  const list = document.querySelector<HTMLElement>("[data-series-list]");
  if (!list) return;
  const ordered = list.querySelector("ol");
  if (!ordered) return;

  const limit = Math.max(1, Number.parseInt(list.dataset.seriesLimit || "6", 10) || 6);
  const items = Array.from(ordered.children) as HTMLElement[];
  if (items.length < 2) {
    list.remove();
    return;
  }
  const sorted = items.sort(
    (left, right) =>
      parseSeriesOrder(left.dataset.seriesOrder) - parseSeriesOrder(right.dataset.seriesOrder),
  );
  let start = 0;
  if (sorted.length > limit) {
    const currentIndex = sorted.findIndex((item) => item.classList.contains("is-current"));
    if (currentIndex >= limit) {
      start = Math.min(sorted.length - limit, Math.max(0, currentIndex - Math.floor(limit / 2)));
    }
  }
  ordered.replaceChildren(...sorted.slice(start, start + limit));
}

function initRelatedPosts(): void {
  for (const block of document.querySelectorAll<HTMLElement>(".related-posts")) {
    const list = block.querySelector("ol");
    if (!list || list.children.length === 0) {
      block.remove();
    }
  }
}

function isSmallDecorativeImage(img: HTMLImageElement): boolean {
  if (img.closest("figure")) return false;
  const attrWidth = Number.parseFloat(img.getAttribute("width") || "");
  const attrHeight = Number.parseFloat(img.getAttribute("height") || "");
  const rect = img.getBoundingClientRect();
  const width =
    rect.width ||
    (Number.isFinite(attrWidth) && attrWidth > 0 ? attrWidth : 0) ||
    (img.complete ? img.naturalWidth : 0);
  const height =
    rect.height ||
    (Number.isFinite(attrHeight) && attrHeight > 0 ? attrHeight : 0) ||
    (img.complete ? img.naturalHeight : 0);
  return width > 0 && height > 0 && width <= 48 && height <= 48;
}

function isZoomableImage(img: HTMLImageElement): boolean {
  if (img.closest("a")) return false;
  const hasSource = Boolean(img.getAttribute("src")?.trim() || img.getAttribute("srcset")?.trim());
  if (!hasSource) return false;
  if (img.hidden || img.getAttribute("aria-hidden") === "true") return false;
  if (img.closest('[hidden], [aria-hidden="true"]')) return false;
  if (img.hasAttribute("data-no-lightbox") || img.closest("[data-no-lightbox]")) return false;
  if (isSmallDecorativeImage(img)) return false;
  return true;
}

function initLightbox(content: HTMLElement): void {
  const images = Array.from(content.querySelectorAll<HTMLImageElement>("img"));
  for (const img of images) {
    if (!img.hasAttribute("loading")) img.loading = "lazy";
    if (!img.hasAttribute("decoding")) img.decoding = "async";
  }
  if (content.dataset.imageLightbox !== "true") return;

  const zoomableImages = images.filter(isZoomableImage);
  if (zoomableImages.length === 0) return;

  const hasGallery = zoomableImages.length > 1;
  const dialog = document.createElement("dialog");
  dialog.className = "image-lightbox";
  dialog.setAttribute("aria-label", uiText("Image preview", "图片预览"));
  dialog.innerHTML = [
    `<button type="button" class="image-lightbox__close" aria-label="${uiText("Close", "关闭")}"><i data-lucide="x" aria-hidden="true"></i></button>`,
    hasGallery
      ? `<button type="button" class="image-lightbox__nav image-lightbox__nav--prev" data-lightbox-prev aria-label="${uiText("Previous image", "上一张图片")}"><i data-lucide="arrow-left" aria-hidden="true"></i></button>`
      : "",
    `<img alt="" />`,
    hasGallery
      ? `<button type="button" class="image-lightbox__nav image-lightbox__nav--next" data-lightbox-next aria-label="${uiText("Next image", "下一张图片")}"><i data-lucide="arrow-right" aria-hidden="true"></i></button>`
      : "",
    `<p class="image-lightbox__caption" hidden></p>`,
    hasGallery ? `<p class="image-lightbox__counter" aria-live="polite"></p>` : "",
  ].join("");
  const image = dialog.querySelector("img")!;
  const caption = dialog.querySelector<HTMLElement>(".image-lightbox__caption")!;
  const counter = dialog.querySelector<HTMLElement>(".image-lightbox__counter");
  let currentIndex = -1;
  let lastTrigger: HTMLElement | null = null;
  const close = (): void => dialog.close();
  const showImage = (index: number): void => {
    currentIndex = (index + zoomableImages.length) % zoomableImages.length;
    const target = zoomableImages[currentIndex];
    lastTrigger = target;
    image.src = target.currentSrc || target.src;
    image.alt = target.alt || "";
    const captionText =
      target.closest("figure")?.querySelector("figcaption")?.textContent?.trim() ||
      target.alt.trim();
    caption.textContent = captionText;
    caption.hidden = !captionText;
    if (counter) counter.textContent = `${currentIndex + 1} / ${zoomableImages.length}`;
  };
  dialog.querySelector(".image-lightbox__close")?.addEventListener("click", close);
  dialog
    .querySelector("[data-lightbox-prev]")
    ?.addEventListener("click", () => showImage(currentIndex - 1));
  dialog
    .querySelector("[data-lightbox-next]")
    ?.addEventListener("click", () => showImage(currentIndex + 1));
  image.addEventListener("click", close);
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) close();
  });
  if (hasGallery) {
    dialog.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        showImage(currentIndex - 1);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        showImage(currentIndex + 1);
      }
    });
  }
  dialog.addEventListener("close", () => {
    lastTrigger?.focus();
    lastTrigger = null;
  });
  document.body.append(dialog);
  document.dispatchEvent(new CustomEvent("rackora:icons"));

  zoomableImages.forEach((img, index) => {
    const open = (): void => {
      showImage(index);
      if (!dialog.open) dialog.showModal();
    };
    img.classList.add("is-zoomable");
    img.tabIndex = 0;
    img.setAttribute("role", "button");
    img.setAttribute(
      "aria-label",
      img.alt.trim()
        ? uiText(`View larger image: ${img.alt.trim()}`, `查看大图：${img.alt.trim()}`)
        : uiText("View larger image", "查看大图"),
    );
    img.addEventListener("click", open);
    img.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      open();
    });
  });
}

function estimateReadingMinutes(text: string): number {
  const cjkCharacters = text.match(/[\u3400-\u9fff\uf900-\ufaff]/g)?.length ?? 0;
  const nonCjkWords = text
    .replace(/[\u3400-\u9fff\uf900-\ufaff]/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.ceil(cjkCharacters / 400 + nonCjkWords / 220));
}

function extractReadableText(content: HTMLElement): string {
  const clone = content.cloneNode(true) as HTMLElement;
  for (const node of clone.querySelectorAll("style, script, noscript, template")) {
    node.remove();
  }
  return clone.textContent || "";
}

function initReadingMetrics(content: HTMLElement): void {
  const target = document.querySelector<HTMLElement>("[data-reading-time]");
  if (target) {
    const minutes = estimateReadingMinutes(extractReadableText(content));
    target.textContent = isChineseUi() ? `约 ${minutes} 分钟` : `${minutes} min read`;
  }

  const progress = document.querySelector<HTMLElement>("[data-reading-progress]");
  if (!progress) return;
  let updateScheduled = false;
  const update = (): void => {
    updateScheduled = false;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    // transform 只触发合成，不像修改 width 那样每次滚动都引起布局。
    progress.style.transform = `scaleX(${ratio})`;
  };
  const scheduleUpdate = (): void => {
    if (updateScheduled) return;
    updateScheduled = true;
    window.requestAnimationFrame(update);
  };
  window.addEventListener("scroll", scheduleUpdate, { passive: true });
  window.addEventListener("resize", scheduleUpdate);
  update();
}

document.addEventListener("DOMContentLoaded", () => {
  const content = document.querySelector<HTMLElement>("[data-article-content]");
  if (!content) return;
  initReadingMetrics(content);
  initTableOfContents(content);
  initCodeBlocks(content);
  initTables(content);
  initAffiliateMarkup(content);
  initShareBar();
  initShareLink();
  initSeriesList();
  initRelatedPosts();
  initLightbox(content);
});
