import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { gzipSync } from "node:zlib";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const assetsRoot = path.join(root, "templates", "assets");
const budgets = {
  css: 48 * 1024,
  js: 120 * 1024,
  total: 160 * 1024,
};
const canonicalAssets = new Set(["main.css", "main.js", "post.js"]);

const entries = await readdir(assetsRoot, { recursive: true, withFileTypes: true });
const totals = { css: 0, js: 0 };
let checked = 0;

for (const entry of entries) {
  if (!entry.isFile()) continue;
  if (!canonicalAssets.has(entry.name)) continue;
  const extension = path.extname(entry.name).slice(1);
  if (extension !== "css" && extension !== "js") continue;
  const source = await readFile(path.join(entry.parentPath, entry.name));
  totals[extension] += gzipSync(source).byteLength;
  checked += 1;
}

assert.ok(checked > 0, "No built CSS or JS assets found; run pnpm build-only first");
assert.equal(checked, canonicalAssets.size, "All canonical CSS and JS assets must be built");
assert.ok(totals.css <= budgets.css, `CSS gzip budget exceeded: ${totals.css} > ${budgets.css}`);
assert.ok(totals.js <= budgets.js, `JS gzip budget exceeded: ${totals.js} > ${budgets.js}`);
assert.ok(
  totals.css + totals.js <= budgets.total,
  `Combined gzip budget exceeded: ${totals.css + totals.js} > ${budgets.total}`,
);

console.log(
  `Performance budget passed: ${checked} assets, CSS ${totals.css} B, JS ${totals.js} B gzip.`,
);
