import { test, expect } from "@playwright/test";

test.describe("Legal and informational pages", () => {
  test("privacy policy renders with key sections", async ({ page }) => {
    await page.goto("/privacy");
    await expect(page.getByRole("heading", { name: "Privacy Policy" })).toBeVisible();
    await expect(page.getByText(/stays on your own device/i)).toBeVisible();
    await expect(page.getByRole("heading", { name: "Children's privacy" })).toBeVisible();
  });

  test("terms of use renders the JAMB data disclaimer", async ({ page }) => {
    await page.goto("/terms");
    await expect(page.getByRole("heading", { name: "Terms of Use" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Data disclaimer — please read" })).toBeVisible();
    await expect(
      page.getByRole("link", { name: "jamb.gov.ng", exact: true })
    ).toHaveAttribute("href", "https://www.jamb.gov.ng");
  });

  test("about page links to the tools", async ({ page }) => {
    await page.goto("/about");
    await expect(page.getByRole("heading", { name: /Your career is a map/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /Take the quiz/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /Check your subjects/i })).toBeVisible();
  });

  test("contact page exposes all four channels", async ({ page }) => {
    await page.goto("/contact");
    for (const channel of ["Email", "X (Twitter)", "LinkedIn", "Portfolio"]) {
      await expect(page.getByText(channel, { exact: true })).toBeVisible();
    }
    await expect(page.getByRole("link", { name: /immanueltofunmi@gmail.com/i })).toBeVisible();
  });

  test("FAQ page shows questions and JSON-LD", async ({ page }) => {
    await page.goto("/faq");
    await expect(page.getByRole("heading", { name: "Questions? Answered." })).toBeVisible();
    await expect(page.getByText("Is Career Compass really free?")).toBeVisible();
    await expect(page.getByText("What is the roadmap generator?")).toBeVisible();
  });

  test("footer links reach the new pages", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Privacy Policy" }).click();
    await expect(page).toHaveURL(/\/privacy/);
    await page.getByRole("link", { name: "Terms of Use" }).click();
    await expect(page).toHaveURL(/\/terms/);
    await page.getByRole("link", { name: "About" }).click();
    await expect(page).toHaveURL(/\/about/);
    await page.getByRole("link", { name: "FAQ" }).click();
    await expect(page).toHaveURL(/\/faq/);
    await page.getByRole("link", { name: "Contact" }).click();
    await expect(page).toHaveURL(/\/contact/);
  });
});
