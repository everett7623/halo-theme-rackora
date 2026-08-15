import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const version =
  process.argv[2] ?? JSON.parse(readFileSync(join(root, "package.json"), "utf8")).version;
const changelog = readFileSync(join(root, "CHANGELOG.md"), "utf8");
const heading = new RegExp(
  `^## \\[${version.replaceAll(".", "\\.")}\\](?:\\s+-\\s+[^\\n]+)?\\n`,
  "m",
);
const match = changelog.match(heading);
if (!match || match.index === undefined) {
  console.error(`CHANGELOG.md is missing a section for ${version}`);
  process.exit(1);
}

const afterHeading = changelog.slice(match.index + match[0].length);
const nextHeading = afterHeading.search(/\n## \[/);
const body = (nextHeading === -1 ? afterHeading : afterHeading.slice(0, nextHeading))
  .replace(/\n\[[0-9]+\.[0-9]+\.[0-9]+\]:[\s\S]*$/, "")
  .trim();

if (!body) {
  console.error(`CHANGELOG.md section for ${version} is empty`);
  process.exit(1);
}

const repo = process.env.GITHUB_REPOSITORY ?? "everett7623/halo-theme-rackora";
const previousMatch = afterHeading.match(/\n## \[([0-9]+\.[0-9]+\.[0-9]+)\]/);
const compareLine = previousMatch
  ? `完整提交对比：https://github.com/${repo}/compare/v${previousMatch[1]}...v${version}`
  : `更新日志源文件：https://github.com/${repo}/blob/v${version}/CHANGELOG.md`;

process.stdout.write(
  [
    `## Rackora v${version}`,
    "",
    body,
    "",
    "---",
    "",
    `安装包：\`theme-rackora-${version}.zip\``,
    "",
    compareLine,
    "",
  ].join("\n"),
);
