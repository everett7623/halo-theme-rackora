import { haloThemePlugin } from "@halo-dev/vite-plugin-halo-theme";
import { defineConfig } from "vite-plus";

import packageMetadata from "./package.json" with { type: "json" };

const themeVersion = packageMetadata.version;
const canonicalScriptSources = {
  "assets/main.js": "/src/js/main.ts",
  "assets/post.js": "/src/js/post.ts",
};
const legacyAssetAliases = {
  "assets/main-C94QBGj4.css": "assets/main.css",
  "assets/main-jGzUTz-A.js": "assets/main.js",
  "assets/post-Df6TdZI-.js": "assets/post.js",
  "assets/main-Wmud_qCD.css": "assets/main.css",
  "assets/main-BlOEJXrT.js": "assets/main.js",
  "assets/post-BjpWceAN.js": "assets/post.js",
  "assets/main-zTR4KUqa.css": "assets/main.css",
  "assets/main-yc4NlTUX.js": "assets/main.js",
  "assets/post-Br0gHPGa.js": "assets/post.js",
  "assets/main-BC4DLRCu.css": "assets/main.css",
  "assets/main-BBWn-Rvk.js": "assets/main.js",
};

function legacyAliasSource(legacyName: string, currentName: string): string {
  const currentFile = currentName.slice(currentName.lastIndexOf("/") + 1);
  return legacyName.endsWith(".css")
    ? `@import url("./${currentFile}?v=${themeVersion}");\n`
    : `import "./${currentFile}?v=${themeVersion}";\n`;
}

export default defineConfig({
  plugins: [
    haloThemePlugin(),
    {
      name: "rackora-stable-theme-assets",
      enforce: "post",
      generateBundle(_options, bundle) {
        const renamedAssets = new Map<string, string>();
        const canonicalSources = new Map<string, string | Uint8Array>();
        const disposableAssets = new Set<string>();
        for (const [canonicalName, sourceSuffix] of Object.entries(canonicalScriptSources)) {
          const output = Object.values(bundle).find(
            (candidate) =>
              candidate.type === "chunk" &&
              Object.keys(candidate.modules).some((id) =>
                id.replaceAll("\\", "/").endsWith(sourceSuffix),
              ),
          );
          if (!output || output.type !== "chunk") {
            this.error(`Missing theme script built from ${sourceSuffix}`);
          }
          const previousName = output.fileName;
          renamedAssets.set(previousName, canonicalName);
          canonicalSources.set(canonicalName, output.code);
          disposableAssets.add(previousName);
          this.emitFile({ type: "asset", fileName: canonicalName, source: output.code });
        }

        const stylesheet = Object.values(bundle).find(
          (candidate) =>
            candidate.type === "asset" && /^assets\/main(?:-[^/]+)?\.css$/.test(candidate.fileName),
        );
        if (!stylesheet || stylesheet.type !== "asset") {
          this.error("Missing primary theme stylesheet");
        }
        const previousStylesheetName = stylesheet.fileName;
        renamedAssets.set(previousStylesheetName, "assets/main.css");
        canonicalSources.set("assets/main.css", stylesheet.source);
        disposableAssets.add(previousStylesheetName);
        this.emitFile({ type: "asset", fileName: "assets/main.css", source: stylesheet.source });

        for (const output of Object.values(bundle)) {
          if (output.type !== "asset" || !output.fileName.endsWith(".html")) continue;
          let html = String(output.source);
          for (const [previousName, canonicalName] of renamedAssets) {
            html = html.replaceAll(
              `/themes/theme-rackora/${previousName}`,
              `/themes/theme-rackora/${canonicalName}?v=${themeVersion}`,
            );
          }
          output.source = html;
        }

        for (const disposableName of disposableAssets) {
          delete bundle[disposableName];
        }

        for (const [legacyName, currentName] of Object.entries(legacyAssetAliases)) {
          if (!canonicalSources.has(currentName)) {
            this.error(`Missing canonical theme asset source: ${currentName}`);
          }
          const source = legacyAliasSource(legacyName, currentName);
          const existing = bundle[legacyName];
          if (existing) {
            const existingSource = existing.type === "asset" ? existing.source : existing.code;
            if (String(existingSource) !== String(source)) {
              this.error(`Current output conflicts with legacy theme asset alias: ${legacyName}`);
            }
            continue;
          }
          this.emitFile({ type: "asset", fileName: legacyName, source });
        }
      },
    },
  ],
  lint: { options: { typeAware: true, typeCheck: true }, ignorePatterns: [".agents"] },
  fmt: {
    printWidth: 100,
    tabWidth: 2,
    useTabs: false,
    endOfLine: "lf",
    sortPackageJson: true,
    insertFinalNewline: true,
    sortImports: {},
    sortTailwindcss: {},
    ignorePatterns: [".agents"],
  },
  staged: {
    "*.{js,mjs,cjs,ts,tsx}": ["vp check"],
  },
});
