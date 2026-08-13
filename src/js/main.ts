import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronUp,
  Copy,
  ExternalLink,
  Github,
  Globe,
  Mail,
  Menu,
  Moon,
  Rss,
  Search,
  Send,
  Sun,
  Twitter,
  X,
  createIcons,
} from "lucide";

import "../css/main.css";

const icons = {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronUp,
  Copy,
  ExternalLink,
  Github,
  Globe,
  Mail,
  Menu,
  Moon,
  Rss,
  Search,
  Send,
  Sun,
  Twitter,
  X,
};

function renderIcons(): void {
  createIcons({ icons });
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
    toggle.setAttribute("aria-label", "打开导航");
    setButtonIcon(toggle, "menu");
  };

  toggle.addEventListener("click", () => {
    const open = !navigation.classList.contains("is-open");
    navigation.classList.toggle("is-open", open);
    document.body.classList.toggle("nav-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "关闭导航" : "打开导航");
    setButtonIcon(toggle, open ? "x" : "menu");
  });

  navigation.addEventListener("click", (event) => {
    if ((event.target as Element).closest("a")) close();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 960) close();
  });
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
    toggle.setAttribute("aria-label", scheme === "dark" ? "切换为浅色" : "切换为深色");
    toggle.setAttribute("title", scheme === "dark" ? "切换为浅色" : "切换为深色");
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

  update();
}

function initBackToTop(): void {
  const button = document.querySelector<HTMLButtonElement>("[data-back-to-top]");
  if (!button) return;

  const update = (): void => {
    button.classList.toggle("is-visible", window.scrollY > 600);
  };
  window.addEventListener("scroll", update, { passive: true });
  button.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  update();
}

function initSiteUptime(): void {
  const target = document.querySelector<HTMLElement>("[data-site-launch]");
  if (!target) return;

  const launchDate = new Date(`${target.dataset.siteLaunch}T00:00:00`);
  const elapsed = Date.now() - launchDate.getTime();
  if (!Number.isFinite(elapsed) || elapsed < 0) {
    target.remove();
    return;
  }

  target.textContent = `运行 ${Math.floor(elapsed / 86_400_000) + 1} 天`;
}

document.addEventListener("DOMContentLoaded", () => {
  renderIcons();
  initNavigation();
  initThemeToggle();
  initBackToTop();
  initSiteUptime();
});

document.addEventListener("rackora:icons", renderIcons);
