import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.routeFromHAR("./tests/opentdb.har", {
    url: "**/api**",
    update: false,
  });

  await page.goto("/");
  await expect(page.getByRole("heading")).toHaveText(/pink floyd/i);
});
