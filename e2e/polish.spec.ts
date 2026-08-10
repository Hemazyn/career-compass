import { test, expect, type Page } from "@playwright/test";

async function expectNoHorizontalOverflow(page: Page) {
  const overflow = await page.evaluate(() => {
    const doc = document.documentElement;
    return doc.scrollWidth > doc.clientWidth + 1;
  });
  expect(overflow, "page should not scroll horizontally").toBe(false);
}

test.describe("Polish & quality", () => {
  test("no horizontal overflow on key pages", async ({ page }) => {
    for (const path of ["/", "/careers", "/resources", "/pivot", "/quiz"]) {
      await page.goto(path);
      await page.waitForLoadState("domcontentloaded");
      await expectNoHorizontalOverflow(page);
    }
  });

  test("dark mode toggle switches theme and persists across reloads", async ({ page }) => {
    await page.goto("/");
    const html = page.locator("html");
    await expect(html).not.toHaveClass(/dark/);

    await page.getByRole("button", { name: /Switch to dark mode/i }).click();
    await expect(html).toHaveClass(/dark/);

    const bodyBg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
    expect(bodyBg.toLowerCase()).not.toBe("rgb(245, 249, 246)");

    // Choice persists after a reload (saved to localStorage)
    await page.reload();
    await expect(html).toHaveClass(/dark/);

    // And the toggle flips back to light
    await page.getByRole("button", { name: /Switch to light mode/i }).click();
    await expect(html).not.toHaveClass(/dark/);
  });

  test("scroll-reveal content becomes fully visible", async ({ page }) => {
    await page.goto("/");
    // The pivot section is wrapped in <Reveal> — assert it animates to opacity 1
    const pivotHeading = page.locator("#pivot h2").first();
    await pivotHeading.scrollIntoViewIfNeeded();
    await page.waitForTimeout(900); // allow the reveal transition
    const opacity = await pivotHeading.evaluate((el) => getComputedStyle(el).opacity);
    expect(opacity).toBe("1");
  });

  test("no console errors on core pages", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });
    page.on("pageerror", (err) => errors.push(err.message));

    for (const path of ["/", "/careers/pharmacist", "/pivot/sciences", "/resources", "/s/science"]) {
      await page.goto(path);
      await page.waitForLoadState("networkidle");
    }
    expect(errors).toEqual([]);
  });
});
