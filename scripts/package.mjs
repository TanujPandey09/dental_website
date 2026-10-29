/**
 * Creates a clean distributable zip of the template in `release/`.
 *
 * Usage:  npm run package
 *
 * Excludes build artifacts, dependencies, editor configs, internal agent/tooling files,
 * design specs, internal seller docs, and packaging scripts.
 * Strips the author-only "package" script from the distributed package.json.
 */

import { execFileSync } from "node:child_process";
import { cpSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join, relative } from "node:path";

const root = process.cwd();
const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
const name = pkg.name || "template";
const version = pkg.version || "0.0.0";

const EXCLUDE_DIRS = new Set([
  "node_modules",
  ".next",
  ".git",
  ".vscode",
  ".opencode",
  ".agents",
  ".claude",
  "agent",
  ".idea",
  ".turbo",
  ".vercel",
  "coverage",
  "out",
  "build",
  "release",
  "docs",
  "scripts",
]);

const EXCLUDE_FILES = new Set([
  ".open-design.json",
  "ts-errors.txt",
  "next-env.d.ts",
  ".env",
  ".env.local",
  ".env.development.local",
  ".env.production.local",
  "LAUNCH-READINESS.md",
  "FINAL-REPORT.md",
  "GUMROAD-LISTING.md",
  "RELEASE-CHECKLIST.md",
  "image-generation-prompt.txt",
  "skills-lock.json",
  "tsconfig.tsbuildinfo",
]);

const isExcluded = (entry) =>
  EXCLUDE_DIRS.has(entry) ||
  EXCLUDE_FILES.has(entry) ||
  entry.endsWith(".tsbuildinfo") ||
  entry.endsWith(".log") ||
  entry === ".DS_Store" ||
  entry === "Thumbs.db";

const entries = readdirSync(root).filter((entry) => !isExcluded(entry));

if (entries.length === 0) {
  console.error("Nothing to package.");
  process.exit(1);
}

const releaseDir = join(root, "release");
const stagingDir = join(releaseDir, ".staging");
mkdirSync(releaseDir, { recursive: true });
rmSync(stagingDir, { recursive: true, force: true });
mkdirSync(stagingDir, { recursive: true });

const outPath = join(releaseDir, `${name}-v${version}.zip`);

try {
  // 1. Copy all distributable files to staging directory
  for (const entry of entries) {
    cpSync(join(root, entry), join(stagingDir, entry), { recursive: true });
  }

  // 2. Sanitize package.json for buyers: remove author packaging script
  const buyerPkg = { ...pkg };
  if (buyerPkg.scripts) {
    const { package: _pkgScript, ...cleanScripts } = buyerPkg.scripts;
    buyerPkg.scripts = cleanScripts;
  }
  writeFileSync(
    join(stagingDir, "package.json"),
    JSON.stringify(buyerPkg, null, 2) + "\n"
  );

  // 3. Sanitize README.md for buyers: remove internal packaging mentions
  const readmePath = join(stagingDir, "README.md");
  try {
    let readme = readFileSync(readmePath, "utf8");
    readme = readme.replace(/\r?\n\| `npm run package` \|[^\r\n]*/, "");
    readme = readme.replace(/\r?\n- Packaging for sale:[^\r\n]*/, "");
    writeFileSync(readmePath, readme);
  } catch {
    // If README doesn't exist, proceed
  }

  // 4. Archive staging files to destination zip
  if (process.platform === "win32") {
    const quote = (p) => `'${p.replace(/'/g, "''")}'`;
    const script = [
      "$ErrorActionPreference='Stop'",
      `if (Test-Path -LiteralPath ${quote(outPath)}) { Remove-Item -LiteralPath ${quote(outPath)} -Force }`,
      `$items = Get-ChildItem -Path ${quote(stagingDir)} -Force | ForEach-Object { $_.FullName }`,
      `Compress-Archive -Path $items -DestinationPath ${quote(outPath)} -Force`,
    ].join("; ");
    execFileSync("powershell", ["-NoProfile", "-Command", script], {
      stdio: "inherit",
    });
  } else {
    execFileSync(
      "sh",
      [
        "-c",
        `cd "${stagingDir}" && zip -r -X "${outPath}" ./* ./.??* -x ".*"`,
      ],
      { stdio: "inherit" }
    );
  }

  console.log(`\nSuccessfully packaged ${entries.length} items -> ${relative(root, outPath)}`);
} finally {
  // Always clean up staging directory
  rmSync(stagingDir, { recursive: true, force: true });
}
