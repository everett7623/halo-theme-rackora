import { readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const rootEntries = await readdir(root, { withFileTypes: true });
const conflictFiles = rootEntries
  .filter((entry) => entry.isFile() && entry.name.includes(".sync-conflict-"))
  .map((entry) => entry.name);

for (const directory of ["src", "scripts", "public"]) {
  const entries = await readdir(path.join(root, directory), {
    recursive: true,
    withFileTypes: true,
  });
  conflictFiles.push(
    ...entries
      .filter((entry) => entry.isFile() && entry.name.includes(".sync-conflict-"))
      .map((entry) => path.relative(root, path.join(entry.parentPath, entry.name))),
  );
}

if (conflictFiles.length > 0) {
  throw new Error(`remove sync conflict files before building: ${conflictFiles.join(", ")}`);
}
