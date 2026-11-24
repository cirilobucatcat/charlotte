import { expect, test } from "@playwright/test";
import { press } from "./helpers";

test.describe("Site navigation", () => {
  test("the shop, occasions and atelier links are reachable, and so is the Bag", async ({ page, isMobile }) => {
    await page.goto("/");
    const names = ["Shop", "Occasions", "Atelier"];

    if (isMobile) {
      // Below 860px the links move into the menu sheet.
      await expect(page.getByRole("navigation", { name: "Main" })).toBeHidden();

      await press(page.getByRole("button", { name: "Menu", exact: true }));
      const sheet = page.getByRole("dialog", { name: "Menu" });
      await expect(sheet).toBeVisible();
      for (const name of [...names, "Bag"]) {
        await expect(sheet.getByRole("link", { name, exact: true })).toBeVisible();
      }

      await sheet.getByRole("button", { name: "Close menu" }).click();
      await expect(sheet).toBeHidden();

      await page.getByRole("button", { name: "Menu", exact: true }).click();
      await sheet.getByRole("link", { name: "Bag", exact: true }).click();
      await expect(sheet).toBeHidden();
    } else {
      const nav = page.getByRole("navigation", { name: "Main" });
      for (const name of names) {
        await expect(nav.getByRole("link", { name, exact: true })).toBeVisible();
      }
      await expect(page.getByRole("button", { name: "Menu", exact: true })).toBeHidden();

      await press(page.getByRole("banner").getByRole("link", { name: "Bag, 0 items" }));
    }

    await expect(page).toHaveURL("/bag");
    await expect(page.getByRole("heading", { level: 1, name: "Your bag" })).toBeVisible();
  });
});
