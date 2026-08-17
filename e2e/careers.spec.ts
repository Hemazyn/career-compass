import { test, expect } from "@playwright/test";

test.describe("Careers explorer", () => {
  test("lists careers with pagination and filters by search", async ({ page }) => {
    await page.goto("/careers");
    await expect(page.getByRole("heading", { name: /Explore careers/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /Aeronautical Engineer/i })).toBeVisible();
    await expect(page.getByText(/Page 1 of 18/i)).toBeVisible();

    await page.getByLabel("Search careers").fill("neuroscientist");
    await expect(page.getByRole("link", { name: /Neuroscientist/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /Aeronautical Engineer/i })).toHaveCount(0);
  });

  test("filters by stream tab", async ({ page }) => {
    await page.goto("/careers");
    await page.getByRole("button", { name: "Commercial", exact: true }).click();
    await expect(page.getByRole("link", { name: /Chartered Accountant/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /Medical Doctor/i })).toHaveCount(0);
  });

  test("opens a career detail page with the traced path", async ({ page }) => {
    await page.goto("/careers/pharmacist");
    await expect(page.getByRole("heading", { name: "Pharmacist" })).toBeVisible();
    await expect(page.getByText(/Your path, traced backwards/i)).toBeVisible();
    await expect(page.getByText(/UTME subject combination/i)).toBeVisible();
    await expect(page.getByText(/SSS stream — decided at JSS3/i)).toBeVisible();
    await expect(page.locator('script[type="application/ld+json"]#breadcrumb-jsonld')).toHaveCount(1);
  });

  test("shows 404 for unknown career slugs", async ({ page }) => {
    await page.goto("/careers/definitely-not-a-career");
    await expect(page.getByText(/This path doesn't exist/i)).toBeVisible();
  });
});
