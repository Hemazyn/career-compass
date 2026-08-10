import { test, expect } from "@playwright/test";

const SCALE_ANSWERS = ["No way", "Not really", "Maybe", "Yes", "That's so me"];

test.describe("Stream quiz flow", () => {
  test("answers all questions and shows a stream result", async ({ page }) => {
    await page.goto("/quiz");
    await expect(page.getByText(/Question 1 of 18/i)).toBeVisible();

    for (let i = 1; i <= 18; i++) {
      const answer = SCALE_ANSWERS[(i + 2) % SCALE_ANSWERS.length];
      await page.getByRole("button", { name: answer }).click();
    }

    await expect(page.getByText("Your recommended stream")).toBeVisible();
    const heading = page.getByRole("heading", { level: 1 });
    await expect(heading).not.toHaveText("");
    const stream = (await heading.textContent())?.trim() ?? "";
    expect(["Science", "Art", "Commercial"]).toContain(stream);
  });

  test("supports going back and retaking the quiz", async ({ page }) => {
    await page.goto("/quiz");
    await page.getByRole("button", { name: "Yes" }).click();
    await expect(page.getByText(/Question 2 of 18/i)).toBeVisible();
    await page.getByRole("button", { name: /Previous question/i }).click();
    await expect(page.getByText(/Question 1 of 18/i)).toBeVisible();

    await page.getByRole("button", { name: "Start over" }).click();
    await expect(page.getByText(/Question 1 of 18/i)).toBeVisible();
  });

  test("share result page is publicly reachable for every stream", async ({ page }) => {
    for (const stream of ["science", "art", "commercial"]) {
      await page.goto(`/s/${stream}`);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      await expect(page.getByRole("link", { name: /Take the quiz/i })).toBeVisible();
    }
  });
});
