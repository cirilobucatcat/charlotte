import { expect, test } from "@playwright/test";
import {
  addToBagButton,
  filterTabs,
  midnight,
  openFromGrid,
  petits,
  press,
  shownPrice,
} from "./helpers";

test.describe("Product page", () => {
  test("opening a Product from the grid shows its name and price", async ({ page }) => {
    await page.goto("/");
    await openFromGrid(page, midnight.name);

    await expect(page).toHaveURL(`/cakes/${midnight.slug}`);
    await expect(page.getByRole("heading", { level: 1, name: midnight.name })).toBeVisible();
    await expect(shownPrice(page)).toHaveText(`$${midnight.price["6″"]}`);
  });

  test("choosing another Size updates the price", async ({ page }) => {
    await page.goto(`/cakes/${midnight.slug}`);
    const sizes = page.getByRole("group", { name: "Size" });

    await expect(sizes.getByRole("button", { name: /^6″/, pressed: true })).toBeVisible();
    await expect(shownPrice(page)).toHaveText("$52");

    await press(sizes.getByRole("button", { name: /^8″/ }));
    await expect(sizes.getByRole("button", { name: /^8″/, pressed: true })).toBeVisible();
    await expect(shownPrice(page)).toHaveText("$68");
    await expect(addToBagButton(page)).toHaveAccessibleName("Add to bag $68");

    await sizes.getByRole("button", { name: /^10″/ }).click();
    await expect(shownPrice(page)).toHaveText("$90");
    await expect(addToBagButton(page)).toHaveAccessibleName("Add to bag $90");

    await sizes.getByRole("button", { name: /^6″/ }).click();
    await expect(shownPrice(page)).toHaveText("$52");
  });

  test("Rose Pistachio Petits offers no Message field", async ({ page }) => {
    await page.goto("/");
    await press(filterTabs(page).getByRole("button", { name: "Petits", exact: true }));
    await openFromGrid(page, petits.name);

    await expect(page).toHaveURL(`/cakes/${petits.slug}`);
    await expect(page.getByRole("heading", { level: 1, name: petits.name })).toBeVisible();
    await expect(shownPrice(page)).toHaveText(`$${petits.price}`);
    // The date is still asked for; only the message is not.
    await expect(page.getByLabel("Date")).toBeVisible();
    await expect(page.getByLabel("Message on the cake")).toHaveCount(0);
  });

  test("an unknown slug under /cakes/ returns the 404 page", async ({ page }) => {
    const response = await page.goto("/cakes/no-such-cake");

    expect(response?.status()).toBe(404);
    await expect(page.getByRole("heading", { level: 1, name: "Page not found" })).toBeVisible();
  });
});
