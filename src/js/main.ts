import {
  ArrowLeft,
  ArrowRight,
  AtSign,
  Check,
  ChevronUp,
  Clapperboard,
  Copy,
  ExternalLink,
  Facebook,
  Github,
  Globe,
  Linkedin,
  List,
  Mail,
  Menu,
  MessageCircle,
  MessageSquare,
  MessagesSquare,
  Moon,
  Rss,
  Search,
  Send,
  Sun,
  Twitter,
  X,
  Youtube,
  createIcons,
} from "lucide";

import "../css/main.css";

const icons = {
  ArrowLeft,
  ArrowRight,
  AtSign,
  Check,
  ChevronUp,
  Clapperboard,
  Copy,
  ExternalLink,
  Facebook,
  Github,
  Globe,
  Linkedin,
  List,
  Mail,
  Menu,
  MessageCircle,
  MessageSquare,
  MessagesSquare,
  Moon,
  Rss,
  Search,
  Send,
  Sun,
  Twitter,
  X,
  Youtube,
};

const socialIconAliases: Record<string, string> = {
  bilibili: "clapperboard",
  discord: "message-square",
  mastodon: "at-sign",
  wechat: "message-circle",
};

function isChineseUi(): boolean {
  return document.documentElement.dataset.uiLanguage === "zh-CN";
}

function uiText(english: string, chinese: string): string {
  return isChineseUi() ? chinese : english;
}

function renderIcons(): void {
  const placeholders = document.querySelectorAll<HTMLElement>("i[data-lucide]");
  if (!placeholders.length) return;
  for (const icon of placeholders) {
    const alias = socialIconAliases[icon.dataset.lucide || ""];
    if (alias) icon.dataset.lucide = alias;
  }
  createIcons({ icons });
  // createIcons 会在生成的 svg 上保留 data-lucide，不清除的话每次调用都会把整页图标重建一遍。
  for (const svg of document.querySelectorAll("svg[data-lucide]")) {
    svg.removeAttribute("data-lucide");
  }
}

function setButtonIcon(button: HTMLButtonElement, name: "menu" | "moon" | "sun" | "x"): void {
  button.querySelector("svg, i[data-lucide]")?.remove();
  const icon = document.createElement("i");
  icon.dataset.lucide = name;
  icon.setAttribute("aria-hidden", "true");
  button.prepend(icon);
  renderIcons();
}

function applyScheme(scheme: "light" | "dark"): void {
  document.documentElement.dataset.colorScheme = scheme;
  document.documentElement.classList.remove(
    "color-scheme-auto",
    "color-scheme-light",
    "color-scheme-dark",
  );
  document.documentElement.classList.add(`color-scheme-${scheme}`);
}

function initNavigation(): void {
  const toggle = document.querySelector<HTMLButtonElement>("[data-nav-toggle]");
  const navigation = document.querySelector<HTMLElement>("[data-site-nav]");
  if (!toggle || !navigation) return;

  const close = (): void => {
    navigation.classList.remove("is-open");
    document.body.classList.remove("nav-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", uiText("Open navigation", "打开导航"));
    setButtonIcon(toggle, "menu");
  };

  toggle.addEventListener("click", () => {
    const open = !navigation.classList.contains("is-open");
    navigation.classList.toggle("is-open", open);
    document.body.classList.toggle("nav-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute(
      "aria-label",
      open ? uiText("Close navigation", "关闭导航") : uiText("Open navigation", "打开导航"),
    );
    setButtonIcon(toggle, open ? "x" : "menu");
  });

  navigation.addEventListener("click", (event) => {
    if ((event.target as Element).closest("a")) close();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape" || !navigation.classList.contains("is-open")) return;
    close();
    toggle.focus();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 960 && navigation.classList.contains("is-open")) close();
  });
}

function normalizePath(pathname: string): string {
  const trimmed = pathname.replace(/\/+$/, "");
  return trimmed || "/";
}

function initActiveNavigation(): void {
  const current = normalizePath(window.location.pathname);
  for (const link of document.querySelectorAll<HTMLAnchorElement>("[data-site-nav] a[href]")) {
    const rawHref = link.getAttribute("href") || "";
    let url: URL;
    try {
      url = new URL(link.href, window.location.origin);
    } catch {
      continue;
    }
    // 下拉父级常用的 "#"、空链接和站外链接都会解析出与当前页相同的路径，不能参与高亮判断。
    const comparable =
      rawHref !== "" && !rawHref.startsWith("#") && url.origin === window.location.origin;
    const path = normalizePath(url.pathname);
    const active =
      comparable && (path === current || (path !== "/" && current.startsWith(`${path}/`)));
    link.classList.toggle("is-active", active);
    if (active) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  }
}

function currentScheme(): "light" | "dark" {
  const configured = document.documentElement.dataset.colorScheme;
  if (configured === "light" || configured === "dark") return configured;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function initThemeToggle(): void {
  const toggle = document.querySelector<HTMLButtonElement>("[data-theme-toggle]");
  if (!toggle) return;

  const update = (): void => {
    const scheme = currentScheme();
    const label =
      scheme === "dark"
        ? uiText("Switch to light mode", "切换为浅色")
        : uiText("Switch to dark mode", "切换为深色");
    toggle.setAttribute("aria-label", label);
    toggle.setAttribute("title", label);
    setButtonIcon(toggle, scheme === "dark" ? "sun" : "moon");
  };

  toggle.addEventListener("click", () => {
    const next = currentScheme() === "dark" ? "light" : "dark";
    applyScheme(next);
    try {
      localStorage.setItem("rackora-color-scheme", next);
    } catch {
      // The visual change still works for this page when storage is unavailable.
    }
    update();
  });

  // 跟随系统配色时，系统切换明暗后同步按钮图标与提示文字。
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", update);
  update();
}

function initBackToTop(): void {
  const button = document.querySelector<HTMLButtonElement>("[data-back-to-top]");
  if (!button) return;

  let visible = false;
  let scheduled = false;
  const update = (): void => {
    scheduled = false;
    const nextVisible = window.scrollY > 600;
    if (nextVisible === visible) return;
    visible = nextVisible;
    button.classList.toggle("is-visible", visible);
  };
  const scheduleUpdate = (): void => {
    if (scheduled) return;
    scheduled = true;
    window.requestAnimationFrame(update);
  };
  window.addEventListener("scroll", scheduleUpdate, { passive: true });
  button.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  update();
}

function initSearchShortcut(): void {
  if (!document.querySelector("[data-search-toggle]")) return;
  document.addEventListener("keydown", (event) => {
    if (!(event.ctrlKey || event.metaKey) || event.key.toLowerCase() !== "k") return;
    const target = event.target as HTMLElement | null;
    if (target?.closest("input, textarea, select, [contenteditable='true']")) return;
    const searchWidget = (window as Window & { SearchWidget?: { open?: () => void } }).SearchWidget;
    if (typeof searchWidget?.open === "function") {
      event.preventDefault();
      searchWidget.open();
    }
  });
}

function initSiteUptime(): void {
  const targets = document.querySelectorAll<HTMLElement>("[data-site-launch]");
  for (const target of targets) {
    const launchValue = target.dataset.siteLaunch;
    if (!launchValue) {
      target.remove();
      continue;
    }

    const launchDate = new Date(`${launchValue}T00:00:00`);
    const elapsed = Date.now() - launchDate.getTime();
    if (!Number.isFinite(elapsed) || elapsed < 0) {
      target.remove();
      continue;
    }

    const days = Math.floor(elapsed / 86_400_000) + 1;
    // 紧凑统计的英文标签已是 "Days"，数值只保留数字，避免在窄列里折成两行。
    target.textContent = target.hasAttribute("data-site-launch-compact")
      ? isChineseUi()
        ? `${days} 天`
        : String(days)
      : isChineseUi()
        ? `运行 ${days} 天`
        : `Online for ${days} ${days === 1 ? "day" : "days"}`;
  }
}

function initPopularTags(): void {
  const list = document.querySelector<HTMLElement>("[data-popular-tags]");
  if (!list) return;

  const limit = Math.max(1, Number.parseInt(list.dataset.tagLimit || "10", 10) || 10);
  const items = Array.from(list.children) as HTMLElement[];
  items
    .sort((left, right) => {
      const countDifference =
        Number.parseInt(right.dataset.tagCount || "0", 10) -
        Number.parseInt(left.dataset.tagCount || "0", 10);
      return countDifference || left.textContent!.localeCompare(right.textContent!);
    })
    .forEach((item, index) => {
      if (index < limit) list.append(item);
      else item.remove();
    });
}

document.addEventListener("DOMContentLoaded", () => {
  renderIcons();
  initNavigation();
  initActiveNavigation();
  initThemeToggle();
  initBackToTop();
  initSearchShortcut();
  initSiteUptime();
  initPopularTags();
});

document.addEventListener("rackora:icons", renderIcons);
