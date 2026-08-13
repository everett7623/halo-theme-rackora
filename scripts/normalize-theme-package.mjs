import { createWriteStream } from "node:fs";
import { mkdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import archiver from "archiver";
import YAML from "yaml";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const theme = YAML.parse(await readFile(path.join(root, "theme.yaml"), "utf8"));
const version = theme?.spec?.version;
const name = theme?.metadata?.name;

if (!name || !version) throw new Error("theme.yaml must define metadata.name and spec.version");

const outputPath = path.join(root, "dist", `${name}-${version}.zip`);
const requiredFiles = [
  "theme.yaml",
  "settings.yaml",
  "annotation-setting.yaml",
  "CHANGELOG.md",
  "README.md",
  "LICENSE",
  "screenshot.png",
];

for (const relativePath of requiredFiles) {
  const info = await stat(path.join(root, relativePath));
  if (!info.isFile()) throw new Error(`Required release file is not a file: ${relativePath}`);
}
if (!(await stat(path.join(root, "templates"))).isDirectory()) {
  throw new Error("templates must be built before packaging");
}

await mkdir(path.dirname(outputPath), { recursive: true });
const output = createWriteStream(outputPath);
const archive = archiver("zip", { zlib: { level: 9 } });
const completed = new Promise((resolve, reject) => {
  output.on("close", resolve);
  output.on("error", reject);
  archive.on("error", reject);
});

archive.pipe(output);
for (const relativePath of requiredFiles) {
  archive.file(path.join(root, relativePath), { name: relativePath });
}
archive.directory(path.join(root, "templates"), "templates");
await archive.finalize();
await completed;

console.log(`Normalized release package: ${outputPath} (${archive.pointer()} bytes)`);
