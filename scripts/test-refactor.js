import { chromium } from "playwright";
import { spawn } from "node:child_process";

async function runQATest() {
  console.log("⚡ Launching background dev server...");
  const devServer = spawn("bun", ["run", "scripts/dev.js"], {
    stdio: "pipe"
  });

  // Give dev server a moment to spin up
  await new Promise(resolve => setTimeout(resolve, 1500));

  console.log("🌐 Starting Playwright Edge instance...");
  const browser = await chromium.launch({
    channel: "msedge",
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });

  const page = await browser.newPage();
  const consoleErrors = [];
  page.on("console", msg => {
    if (msg.type() === "error") {
      consoleErrors.push(msg.text());
    }
  });
  page.on("pageerror", err => {
    consoleErrors.push(err.message);
  });

  try {
    console.log("Navigating to http://localhost:3000...");
    await page.goto("http://localhost:3000", { waitUntil: "networkidle", timeout: 15000 });

    // 1. Verify Title & Core Elements
    const title = await page.title();
    console.log(`✓ Page Title: "${title}"`);

    // 2. Verify Live Clock
    const liveTimeText = await page.$eval("#liveTime", el => el.textContent.trim());
    console.log(`✓ Live Clock Output: "${liveTimeText}"`);
    if (!liveTimeText.includes("PKT")) {
      throw new Error(`Clock does not contain PKT: ${liveTimeText}`);
    }

    // 3. Verify Typewriter Element
    await page.waitForTimeout(1000);
    const typingText = await page.$eval("#typingText", el => el.textContent.trim());
    console.log(`✓ Typewriter Output: "${typingText}"`);

    // 4. Verify Specialties Dropdown
    const dropdownBtn = await page.$("#categoryDropdownBtn");
    const dropdownMenu = await page.$("#categoryDropdownMenu");
    await dropdownBtn.click();
    const isMenuShow = await dropdownMenu.evaluate(el => el.classList.contains("show"));
    console.log(`✓ Dropdown toggles open: ${isMenuShow}`);
    if (!isMenuShow) throw new Error("Dropdown menu failed to open on click");

    // 5. Verify Project Filters
    const aiFilterBtn = await page.$('.filter-pill[data-filter="ai"]');
    await aiFilterBtn.click();
    await page.waitForTimeout(400);

    const visibleCards = await page.$$eval(".project-card", cards =>
      cards.filter(c => window.getComputedStyle(c).display !== "none").length
    );
    console.log(`✓ AI Filter Active: ${visibleCards} cards visible`);
    if (visibleCards !== 2) {
      throw new Error(`Expected 2 cards for AI filter, got ${visibleCards}`);
    }

    // Filter back to all
    const allFilterBtn = await page.$('.filter-pill[data-filter="all"]');
    await allFilterBtn.click();
    await page.waitForTimeout(400);
    const allCards = await page.$$eval(".project-card", cards =>
      cards.filter(c => window.getComputedStyle(c).display !== "none").length
    );
    console.log(`✓ All Filter Active: ${allCards} cards visible`);
    if (allCards !== 4) {
      throw new Error(`Expected 4 cards for all filter, got ${allCards}`);
    }

    // 6. Check Console Errors
    if (consoleErrors.length > 0) {
      console.error("❌ Console errors detected:", consoleErrors);
      throw new Error("Console errors were logged during session");
    } else {
      console.log("✓ Zero JavaScript console errors logged!");
    }

    console.log("\n🎉 ALL REFACTORING VERIFICATION TESTS PASSED SUCCESSFULLY!\n");
  } catch (err) {
    console.error("❌ QA Test Failed:", err);
    process.exitCode = 1;
  } finally {
    await browser.close();
    devServer.kill();
  }
}

runQATest();
