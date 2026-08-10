import { test, expect } from "@playwright/test";

test.describe("Resources hub", () => {
  test("renders resource categories and items", async ({ page }) => {
    await page.goto("/resources");
    await expect(page.getByRole("heading", { name: /Everything you need/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: /Official Exam Portals/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: /Scholarships & Funding/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /JAMB \(UTME\)/i })).toBeVisible();
  });

  test("searches and filters resources", async ({ page }) => {
    await page.goto("/resources");
    await page.getByLabel("Search resources").fill("scholarship");
    await expect(page.getByRole("heading", { name: /Scholarships & Funding/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: /Official Exam Portals/i })).toHaveCount(0);
  });

  test("external resource links open safely", async ({ page }) => {
    await page.goto("/resources");
    const jamb = page.getByRole("link", { name: /JAMB \(UTME\)/i });
    await expect(jamb).toHaveAttribute("target", "_blank");
    await expect(jamb).toHaveAttribute("rel", /noopener noreferrer/);
  });

  test("homepage teaser links through to the hub", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: /Open the full resource hub/i }).click();
    await expect(page).toHaveURL(/\/resources$/);
  });
});
