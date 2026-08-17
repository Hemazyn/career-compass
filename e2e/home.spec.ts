import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test("renders the hero with primary CTAs", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("heading", { level: 1, name: /Your career is a map/i })
    ).toBeVisible();
    await expect(page.getByRole("link", { name: /Find your career path/i }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: /Explore all careers/i })).toBeVisible();
  });

  test("primary navigation reaches all main sections", async ({ page }) => {
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: "Primary" });
    for (const [label, path] of [
      ["Careers", "/careers"],
      ["Career Path Quiz", "/quiz"],
      ["Post-NYSC", "/pivot"],
      ["Resources", "/resources"],
    ] as const) {
      await nav.getByRole("link", { name: label }).click();
      await expect(page).toHaveURL(new RegExp(path));
    }
  });

  test("shows the FAQ section and opens answers", async ({ page }) => {
    await page.goto("/");
    const faq = page.locator("#faq");
    await faq.scrollIntoViewIfNeeded();
    await expect(faq.getByRole("heading", { name: /Questions\? Answered/i })).toBeVisible();
    // First item starts open; click the second (initially closed) to test toggling
    const second = faq.locator("details").nth(1);
    await expect(second.locator("p")).toBeHidden();
    await second.locator("summary").click();
    await expect(second.locator("p")).toBeVisible();
  });

  test("contains structured-data JSON-LD for FAQ", async ({ page }) => {
    await page.goto("/");
    const jsonLd = page.locator('script[type="application/ld+json"]#faq-jsonld');
    await expect(jsonLd).toHaveCount(1);
    const content = JSON.parse((await jsonLd.textContent()) ?? "{}");
    expect(content["@type"]).toBe("FAQPage");
  });

  test("footer links include external resources with safe rel", async ({ page }) => {
    await page.goto("/");
    const jambLink = page.locator("footer a", { hasText: "JAMB e-Brochure" });
    await expect(jambLink).toHaveAttribute("rel", "noopener noreferrer");
    await expect(jambLink).toHaveAttribute("target", "_blank");
  });
});
