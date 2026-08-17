import { test, expect } from "@playwright/test";

test.describe("PWA", () => {
  test("serves a valid web app manifest", async ({ page }) => {
    const res = await page.request.get("/manifest.webmanifest");
    expect(res.ok()).toBeTruthy();
    const manifest = await res.json();
    expect(manifest.name).toContain("Career Compass");
    expect(manifest.display).toBe("standalone");
    expect(manifest.start_url).toBe("/");
    expect(manifest.scope).toBe("/");
    expect(manifest.icons.length).toBeGreaterThanOrEqual(2);
  });

  test("serves the service worker and iOS install metadata", async ({ page }) => {
    const res = await page.request.get("/sw.js");
    expect(res.ok()).toBeTruthy();
    const sw = await res.text();
    expect(sw).toContain("offline.html");

    await page.goto("/");
    await expect(page.locator('meta[name="apple-mobile-web-app-capable"]')).toHaveAttribute(
      "content",
      "yes"
    );
    await expect(page.locator('meta[name="apple-mobile-web-app-title"]')).toHaveAttribute(
      "content",
      "Career Compass"
    );
  });

  test("shows the install prompt and installs the app", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => {
      let promptCalled = false;
      const makeEvent = () => {
        const event = new Event("beforeinstallprompt");
        Object.defineProperty(event, "prompt", {
          value: async () => {
            promptCalled = true;
          },
        });
        Object.defineProperty(event, "userChoice", {
          value: Promise.resolve({ outcome: "accepted", platform: "test" }),
        });
        return event;
      };
      // @ts-expect-error test hook
      window.__dispatchPrompt = () => window.dispatchEvent(makeEvent());
      // @ts-expect-error test hook
      window.__promptCalled = () => promptCalled;
      // @ts-expect-error test hook
      window.__dispatchPrompt();
    });

    // React may still be hydrating — keep dispatching until the listener attaches
    for (let i = 0; i < 10 && (await page.getByRole("dialog", { name: "Install app" }).count()) === 0; i++) {
      await page.waitForTimeout(500);
      // @ts-expect-error test hook
      await page.evaluate(() => window.__dispatchPrompt());
    }
    await expect(page.getByRole("dialog", { name: "Install app" })).toBeVisible();
    await page.getByRole("button", { name: "Install", exact: true }).click();
    await expect(page.getByRole("dialog", { name: "Install app" })).toHaveCount(0);
    // @ts-expect-error test hook
    expect(await page.evaluate(() => window.__promptCalled())).toBe(true);
  });

  test("falls back to the offline page when the network is unavailable", async ({ page, context }) => {
    test.setTimeout(60_000); // dev-server page compilation can be slow
    // Registration is production-only in the app, so register manually here to test the worker.
    await page.goto("/");
    await page.evaluate(async () => {
      await navigator.serviceWorker.register("/sw.js");
      await navigator.serviceWorker.ready;
    });
    // Reload so this page is definitely served and controlled by the worker
    await page.reload({ waitUntil: "networkidle" });
    await page.waitForFunction(() => navigator.serviceWorker.controller !== null);

    await context.setOffline(true);
    // /careers is precached, so it serves from cache offline — use a page that
    // was neither precached nor visited to trigger the offline fallback.
    await page.goto("/careers/lawyer");
    // The page renders a typographic apostrophe (You're), so match loosely
    await expect(page.getByRole("heading", { name: /You.re offline/i })).toBeVisible();
    await expect(page.getByRole("button", { name: "Try again" })).toBeVisible();
  });
});
