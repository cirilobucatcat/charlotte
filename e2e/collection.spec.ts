import { expect, test } from "@playwright/test";
import { allProducts, filterTabs, gridNames, lemon, midnight, petits, press, strawberry } from "./helpers";

test.describe("Home → collection", () => {
  test("the grid shows all four Products", async ({ page }) => {
    await page.goto("/");
    await expect(gridNames(page)).toHaveText(allProducts);
  });

  test("each filter narrows the grid", async ({ page, isMobile }) => {
    await page.goto("/");

    // The filter set differs by layout.
    const tabs = filterTabs(page);
    const cases = isMobile
      ? [
          { label: "Cakes", shows: [strawberry.name, midnight.name, lemon.name] },
          { label: "Petits", shows: [petits.name] },
          { label: "Weddings", shows: [strawberry.name, lemon.name] },
          { label: "Gift boxes", shows: [petits.name] },
          { label: "All", shows: allProducts },
        ]
      : [
          { label: "Cakes", shows: [strawberry.name, midnight.name, lemon.name] },
          { label: "Petits", shows: [petits.name] },
          { label: "Eggless", shows: [lemon.name] },
          { label: "All", shows: allProducts },
        ];

    await expect(tabs.getByRole("button")).toHaveText(["All", ...cases.slice(0, -1).map((c) => c.label)]);
    await expect(tabs.getByRole("button", { name: "All", pressed: true })).toBeVisible();

    for (const { label, shows } of cases) {
      await test.step(`${label} shows ${shows.length}`, async () => {
        const tab = tabs.getByRole("button", { name: label, exact: true });
        await press(tab);
        await expect(tab).toHaveAttribute("aria-pressed", "true");
        await expect(gridNames(page)).toHaveText(shows);
      });
    }
  });
});
