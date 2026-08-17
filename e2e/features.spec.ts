import { test, expect } from "@playwright/test";

test.describe("Subject checker", () => {
  test("shows JAMB confirmation and qualifies courses for selected credits", async ({ page }) => {
    await page.goto("/check");
    await expect(
      page.getByRole("heading", { name: /Will your subjects work\?/i })
    ).toBeVisible();
    // JAMB reference is present
    await expect(page.getByText(/Always confirm with JAMB/i)).toBeVisible();
    await expect(page.getByRole("link", { name: "jamb.gov.ng", exact: true })).toHaveAttribute(
      "target",
      "_blank"
    );

    // Pick English + Biology + Chemistry + Physics (Medicine-style credits)
    const credits = page.getByRole("group", { name: "O'Level credit subjects" });
    for (const subject of ["English Language", "Biology", "Chemistry", "Physics"]) {
      await credits.getByRole("button", { name: subject, exact: true }).click();
    }

    await expect(page.getByText(/You qualify for \d+ of \d+ courses/i)).toBeVisible();
    await expect(page.getByRole("heading", { name: "Medicine & Surgery (MBBS)" })).toBeVisible();
  });

  test("shows locked courses with missing-credit reasons", async ({ page }) => {
    await page.goto("/check");
    // Only English credit — Medicine and Law should be locked
    const credits = page.getByRole("group", { name: "O'Level credit subjects" });
    await credits.getByRole("button", { name: "English Language", exact: true }).click();

    await expect(page.getByText(/Locked out for now/i)).toBeVisible();
    const medicineCard = page.getByRole("heading", { name: "Medicine & Surgery (MBBS)" }).locator("..").locator("..");
    await expect(
      medicineCard.getByText("Missing: Mathematics, Physics, Chemistry, Biology", { exact: true })
    ).toBeVisible();
  });
});

test.describe("Saved careers and compare", () => {
  test("saves a career from the explorer and compares two careers", async ({ page }) => {
    await page.goto("/careers");
    // Save the first two careers via their heart buttons
    const saveButtons = page.getByRole("button", { name: /^Save / });
    await saveButtons.nth(0).click();
    await saveButtons.nth(1).click();

    await page.goto("/saved");
    await expect(page.getByRole("heading", { name: "Saved careers" })).toBeVisible();
    // Both saved careers show up; tick them to add to the compare list
    await expect(page.getByText(/\(0\/4 selected\)/i)).toBeVisible();
    await page.getByRole("checkbox").nth(0).check();
    await page.getByRole("checkbox").nth(1).check();
    await expect(page.getByText(/\(2\/4 selected\)/i)).toBeVisible();

    await page.getByRole("link", { name: /Compare 2 careers/i }).click();
    await expect(page).toHaveURL(/\/compare\?/);
    await expect(page.getByRole("heading", { name: "Compare careers" })).toBeVisible();
    await expect(page.getByRole("rowheader", { name: /Global rank/i })).toBeVisible();
    await expect(page.getByRole("rowheader", { name: /Salary \(USD\/yr\)/i })).toBeVisible();
  });

  test("empty saved page guides to careers", async ({ page }) => {
    await page.goto("/saved");
    await expect(page.getByText(/Nothing saved yet/i)).toBeVisible();
    await expect(page.getByRole("link", { name: /Explore all careers/i })).toBeVisible();
  });
});

test.describe("Roadmap generator", () => {
  test("builds a year-by-year roadmap for a career", async ({ page }) => {
    await page.goto("/roadmap?career=aeronautical-engineer");
    await expect(
      page.getByRole("heading", { name: /Your roadmap to Aeronautical Engineer/i })
    ).toBeVisible();
    await expect(page.getByRole("button", { name: /Print \/ Save PDF/i })).toBeVisible();
    await expect(page.getByRole("button", { name: "Share" })).toBeVisible();
    // First milestone is the JSS3 stream decision
    await expect(page.getByText(/Choose the Science stream/i)).toBeVisible();
  });

  test("empty roadmap page prompts career selection", async ({ page }) => {
    await page.goto("/roadmap");
    await expect(page.getByRole("heading", { name: /Pick a career to map/i })).toBeVisible();
  });
});

test.describe("Career of the day", () => {
  test("homepage shows a career of the day with a link to it", async ({ page }) => {
    await page.goto("/");
    const section = page.locator("#career-of-the-day");
    await expect(section).toBeVisible();
    await expect(section.getByText(/Career of the day/i)).toBeVisible();
    await expect(section.getByRole("link", { name: /Explore this career/i })).toBeVisible();
    await expect(section.getByText(/New one every day/i)).toBeVisible();
  });
});
