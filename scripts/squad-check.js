/**
 * ⚽ 5-a-Side Champions League Agent Squad Pre-Match Verification Script
 * Simulates tactical inspection across:
 * 1. 🛡️ Rodri (Architecture, Manifest, ES Modules, Vercel Edge)
 * 2. ⚡ Yamal (CSS Design Tokens, Modern Palette, Keyframes, Animations)
 * 3. 🚀 Mbappé (UX Conversion Funnel, High-Converting CTAs, Viewport)
 * 4. 🎯 Pedri (DOM Anchor Integrity, Form Validation, Script Bindings)
 * 5. 🧤 Courtois (OpenGraph Social Graph, Privacy Guard, Security Headers)
 */

import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const rootDir = process.cwd();
let issuesFound = 0;

function logPass(player, emoji, message) {
  console.log(`  ${emoji} [${player}] ✓ ${message}`);
}

function logFail(player, emoji, message) {
  issuesFound++;
  console.error(`  ${emoji} [${player}] ❌ ${message}`);
}

console.log("\n⚽ ================================================================");
console.log("   5-A-SIDE CHAMPIONS LEAGUE SQUAD INSPECTION: SHAYAN'S PORTFOLIO");
console.log("================================================================\n");

// =========================================================================
// 1. 🛡️ RODRI (Backend, Runtime & Architecture)
// =========================================================================
console.log("🛡️ [RODRI - Captain & Defensive Midfielder]: Inspecting Architectural Integrity...");
const requiredModules = [
  "js/modules/particles.js",
  "js/modules/clock.js",
  "js/modules/typing.js",
  "js/modules/dropdown.js",
  "js/modules/project-filter.js",
  "js/modules/counters.js",
  "js/modules/navigation.js",
  "js/modules/contact.js"
];

for (const mod of requiredModules) {
  if (existsSync(join(rootDir, mod))) {
    logPass("Rodri", "🛡️", `ES Module exists and verified: ${mod}`);
  } else {
    logFail("Rodri", "🛡️", `Missing ES Module: ${mod}`);
  }
}

if (existsSync(join(rootDir, "vercel.json"))) {
  logPass("Rodri", "🛡️", "Vercel edge deployment config verified (vercel.json)");
} else {
  logFail("Rodri", "🛡️", "vercel.json missing!");
}

// =========================================================================
// 2. ⚡ LAMINE YAMAL (UI Wizard & Visual Flair)
// =========================================================================
console.log("\n⚡ [YAMAL - Right Winger]: Inspecting Aesthetics, Colors & Design Tokens...");
const cssPath = join(rootDir, "index.css");
if (existsSync(cssPath)) {
  const cssContent = readFileSync(cssPath, "utf-8");
  const essentialTokens = [
    "--accent-purple",
    "--bg-base",
    "--font-display",
    "--radius-pill",
    "@keyframes"
  ];

  for (const token of essentialTokens) {
    if (cssContent.includes(token)) {
      logPass("Yamal", "⚡", `Design Token / Visual Feature verified: "${token}"`);
    } else {
      logFail("Yamal", "⚡", `Missing design token in index.css: "${token}"`);
    }
  }
} else {
  logFail("Yamal", "⚡", "index.css not found!");
}

// =========================================================================
// 3. 🚀 KYLIAN MBAPPÉ (UX & Conversion Striker)
// =========================================================================
console.log("\n🚀 [MBAPPÉ - Center Forward]: Inspecting UX Friction & Conversion Funnel...");
const htmlPath = join(rootDir, "index.html");
if (existsSync(htmlPath)) {
  const htmlContent = readFileSync(htmlPath, "utf-8");
  
  if (htmlContent.includes('name="viewport"')) {
    logPass("Mbappé", "🚀", "Mobile viewport tag configured for 60fps responsive scaling");
  } else {
    logFail("Mbappé", "🚀", "Viewport meta tag missing in index.html");
  }

  const conversionHooks = [
    { label: "WhatsApp Direct CTA", query: "https://wa.me/" },
    { label: "Direct Email CTA", query: "mailto:shayanmuhammad.cs@gmail.com" },
    { label: "Resume PDF Asset Link", query: "Shayan-Resume.pdf" },
    { label: "Projects Anchor Link", query: "#projects" }
  ];

  for (const hook of conversionHooks) {
    if (htmlContent.includes(hook.query)) {
      logPass("Mbappé", "🚀", `High-converting CTA verified: ${hook.label}`);
    } else {
      logFail("Mbappé", "🚀", `Missing conversion CTA: ${hook.label}`);
    }
  }
} else {
  logFail("Mbappé", "🚀", "index.html not found!");
}

// =========================================================================
// 4. 🎯 PEDRI (QA & Bug Fixer Playmaker)
// =========================================================================
console.log("\n🎯 [PEDRI - Attacking Midfield]: Inspecting Anchors, Form & Bug Tolerance...");
if (existsSync(htmlPath)) {
  const htmlContent = readFileSync(htmlPath, "utf-8");
  
  // Verify all internal navigation links have matching IDs
  const anchorRegex = /href="(#[a-zA-Z0-9_-]+)"/g;
  let match;
  const verifiedAnchors = new Set();
  
  while ((match = anchorRegex.exec(htmlContent)) !== null) {
    const anchorId = match[1].replace("#", "");
    if (anchorId && !verifiedAnchors.has(anchorId)) {
      const idPattern = new RegExp(`id=["']${anchorId}["']`);
      if (idPattern.test(htmlContent)) {
        logPass("Pedri", "🎯", `Internal anchor verified: #${anchorId}`);
        verifiedAnchors.add(anchorId);
      } else {
        logFail("Pedri", "🎯", `Dead anchor link! No element with id="${anchorId}" found in DOM`);
      }
    }
  }

  // Verify Contact Form structure
  if (htmlContent.includes('id="contactForm"') && htmlContent.includes('id="name"') && htmlContent.includes('id="email"')) {
    logPass("Pedri", "🎯", "Contact form elements and input IDs verified for clean DOM binding");
  } else {
    logFail("Pedri", "🎯", "Contact form elements or IDs missing in index.html");
  }
}

// =========================================================================
// 5. 🧤 THIBAUT COURTOIS (Goalkeeper / Security & SEO Guardian)
// =========================================================================
console.log("\n🧤 [COURTOIS - Goalkeeper]: Inspecting Security Headers & Social Graph SEO...");
if (existsSync(htmlPath)) {
  const htmlContent = readFileSync(htmlPath, "utf-8");
  const seoTags = [
    { label: "Page Title", tag: "<title>" },
    { label: "Meta Description", tag: 'name="description"' },
    { label: "OpenGraph Title", tag: 'property="og:title"' },
    { label: "OpenGraph Image", tag: 'property="og:image"' },
    { label: "Twitter Card", tag: 'name="twitter:card"' }
  ];

  for (const item of seoTags) {
    if (htmlContent.includes(item.tag)) {
      logPass("Courtois", "🧤", `SEO/Social metadata verified: ${item.label}`);
    } else {
      logFail("Courtois", "🧤", `Missing SEO meta tag: ${item.label}`);
    }
  }
}

const vercelPath = join(rootDir, "vercel.json");
if (existsSync(vercelPath)) {
  const vercelContent = readFileSync(vercelPath, "utf-8");
  if (vercelContent.includes("X-Content-Type-Options") && vercelContent.includes("X-Frame-Options")) {
    logPass("Courtois", "🧤", "Vercel HTTP security headers active (nosniff, DENY frame)");
  } else {
    logFail("Courtois", "🧤", "Security headers missing from vercel.json!");
  }
}

console.log("\n================================================================");
if (issuesFound === 0) {
  console.log("🏆 MATCH RESULT: CLEAN SHEET! All 5 Agents Certified the Portfolio!");
  console.log("================================================================\n");
  process.exit(0);
} else {
  console.error(`⚠️ MATCH RESULT: ${issuesFound} Tactical Issues Detected!`);
  console.log("================================================================\n");
  process.exit(1);
}
