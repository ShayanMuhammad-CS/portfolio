import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const manifestPath = path.join(rootDir, "build-manifest.json");
const buildsPath = path.join(rootDir, "BUILDS.md");

console.log("\n⚡ Starting Portfolio Build & Integrity Verification...\n");

// 1. Required Core & Modular Files Check
const requiredFiles = [
  "index.html",
  "index.css",
  "index.js",
  "js/modules/particles.js",
  "js/modules/clock.js",
  "js/modules/typing.js",
  "js/modules/dropdown.js",
  "js/modules/project-filter.js",
  "js/modules/counters.js",
  "js/modules/navigation.js",
  "profile.jpg",
  "profile.png",
  "Shayan-Resume.pdf",
  "vercel.json",
  "README.md",
  "BUILDS.md",
  "AGENTS.md"
];

let hasErrors = false;
console.log("🔍 Checking core project files and modular architecture:");
for (const file of requiredFiles) {
  const fullPath = path.join(rootDir, file);
  if (fs.existsSync(fullPath)) {
    const stats = fs.statSync(fullPath);
    const sizeKb = (stats.size / 1024).toFixed(1);
    console.log(`  ✓ ${file.padEnd(30)} (${sizeKb} KB)`);
  } else {
    console.error(`  ✗ Missing required file: ${file}`);
    hasErrors = true;
  }
}

// 2. Validate ES Module Imports in index.js
console.log("\n📦 Validating ES module dependencies in index.js:");
const indexJsContent = fs.readFileSync(path.join(rootDir, "index.js"), "utf8");
const importRegex = /import\s+.*?\s+from\s+['"]([^'"]+)['"]/g;
let importMatch;
while ((importMatch = importRegex.exec(indexJsContent)) !== null) {
  const importRelPath = importMatch[1];
  const resolvedPath = path.join(rootDir, importRelPath);
  if (fs.existsSync(resolvedPath)) {
    console.log(`  ✓ ES Module resolved: ${importRelPath}`);
  } else {
    console.error(`  ✗ Broken ES Module import: ${importRelPath}`);
    hasErrors = true;
  }
}

// 3. Validate HTML asset references & anchors
console.log("\n🔗 Validating index.html asset references & internal anchors:");
const htmlContent = fs.readFileSync(path.join(rootDir, "index.html"), "utf8");

// Check script/link tags
const localAssetRegex = /(?:href|src)=["']([^"':]+)["']/g;
let match;
const checkedAssets = new Set();

while ((match = localAssetRegex.exec(htmlContent)) !== null) {
  const assetRef = match[1].split("?")[0].split("#")[0].trim();
  if (!assetRef || assetRef.startsWith("data:") || assetRef.startsWith("mailto:") || assetRef.startsWith("tel:")) {
    continue;
  }
  if (!checkedAssets.has(assetRef)) {
    checkedAssets.add(assetRef);
    const resolvedPath = path.join(rootDir, assetRef.startsWith("/") ? assetRef.slice(1) : assetRef);
    if (fs.existsSync(resolvedPath)) {
      console.log(`  ✓ Asset reference verified: ${assetRef}`);
    } else {
      console.warn(`  ⚠️ Warning: Referenced asset not found locally: ${assetRef}`);
    }
  }
}

// Check navigation anchor IDs
const anchorRegex = /href=["']#([a-zA-Z0-9_-]+)["']/g;
const checkedAnchors = new Set();
while ((match = anchorRegex.exec(htmlContent)) !== null) {
  const id = match[1];
  if (!checkedAnchors.has(id)) {
    checkedAnchors.add(id);
    const hasTarget = htmlContent.includes(`id="${id}"`) || htmlContent.includes(`id='${id}'`);
    if (hasTarget) {
      console.log(`  ✓ Navigation anchor valid: #${id}`);
    } else {
      console.warn(`  ⚠️ Warning: Navigation anchor #${id} does not match any element ID!`);
    }
  }
}

// 4. Update build manifest
let currentBuildNumber = "1.0.0";
if (fs.existsSync(manifestPath)) {
  try {
    const prevManifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
    const parts = (prevManifest.version || "1.0.0").split(".");
    if (process.argv.includes("--bump")) {
      parts[2] = (parseInt(parts[2] || "0", 10) + 1).toString();
      currentBuildNumber = parts.join(".");
    } else {
      currentBuildNumber = prevManifest.version;
    }
  } catch (e) {
    currentBuildNumber = "1.0.0";
  }
}

const buildManifest = {
  version: currentBuildNumber,
  lastBuildTime: new Date().toISOString(),
  environment: "Bun " + (typeof Bun !== "undefined" ? Bun.version : "Node"),
  status: hasErrors ? "FAILED" : "SUCCESS",
  files: requiredFiles.filter(f => fs.existsSync(path.join(rootDir, f)))
};

fs.writeFileSync(manifestPath, JSON.stringify(buildManifest, null, 2));
console.log(`\n📦 Build Manifest updated: ${manifestPath} (Version: v${currentBuildNumber})`);

if (hasErrors) {
  console.error("\n❌ Build failed with errors. Please fix missing files above.\n");
  process.exit(1);
} else {
  console.log("\n✅ Portfolio build and integrity check passed successfully!\n");
}
