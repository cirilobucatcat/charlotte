import { expect, test, type Page } from "@playwright/test";
import {
  addToBagButton,
  bagLine,
  chooseOptions,
  fulfilment,
  headerBag,
  midnight,
  quickAdd,
  strawberry,
  summary,
} from "./helpers";

const MESSAGE = "Happy birthday, Mia";
const DATE = "2027-06-15"; // shown as "Tue 15 Jun"
const LINE_DETAILS = "8″ · Dark chocolate · “Happy birthday, Mia” ·";

/** Put one Midnight Chocolate (6″, Dark chocolate) in the Bag from its grid card, then open the Bag. */
async function bagWithMidnight(page: Page, isMobile: boolean) {
  await page.goto("/");
  await quickAdd(page, midnight.name, isMobile);
  await expect(headerBag(page, 1)).toBeVisible();
  await headerBag(page, 1).click();
  await expect(page).toHaveURL("/bag");
}

/** Add an 8″ Strawberry Charlotte with a sponge, Message and date from its page, then open the Bag. */
async function bagWithConfiguredStrawberry(page: Page) {
  await page.goto(`/cakes/${strawberry.slug}`);
  await chooseOptions(page, { size: "8″", sponge: "Dark chocolate", message: MESSAGE, date: DATE });
  await addToBagButton(page).click();
  await page.getByRole("status").getByRole("link", { name: "view bag" }).click();
  await expect(page).toHaveURL("/bag");
}

test.describe("Add to bag", () => {
  test("a cake with a Size, sponge, Message and date lands in the Bag, and delivery adds the fee", async ({ page }) => {
    await page.goto(`/cakes/${strawberry.slug}`);
    await chooseOptions(page, { size: "8″", sponge: "Dark chocolate", message: MESSAGE, date: DATE });

    await expect(page.getByRole("group", { name: "Size" }).getByRole("button", { name: /^8″/, pressed: true })).toBeVisible();
    await expect(page.getByRole("group", { name: "Sponge" }).getByRole("button", { name: "Dark chocolate", pressed: true })).toBeVisible();
    await expect(addToBagButton(page)).toHaveAccessibleName("Add to bag $64");

    await addToBagButton(page).click();

    const confirmation = page.getByRole("status").filter({ hasText: "Added to your bag" });
    await expect(confirmation).toBeVisible();
    await expect(headerBag(page, 1)).toBeVisible();

    await confirmation.getByRole("link", { name: "view bag" }).click();
    await expect(page).toHaveURL("/bag");

    const line = bagLine(page, strawberry.name);
    await expect(line).toHaveCount(1);
    await expect(line).toContainText(LINE_DETAILS);
    await expect(line).toContainText("15 Jun");
    await expect(line).toContainText("$64");

    // Pickup is the default, and free.
    await expect(summary(page)).toContainText(/Total\s*\$64/);

    await fulfilment(page, "Delivery").click();
    await expect(summary(page)).toContainText(/Subtotal\s*\$64/);
    await expect(summary(page)).toContainText(/Delivery\s*\$8/);
    await expect(summary(page)).toContainText(/Total\s*\$72/);
  });

  test("adding from a grid card puts the default Size and sponge in the Bag", async ({ page, isMobile }) => {
    await bagWithMidnight(page, isMobile);

    const line = bagLine(page, midnight.name);
    await expect(line).toHaveCount(1);
    await expect(line).toContainText("6″ · Dark chocolate");
    await expect(line).toContainText("$52");
    await expect(summary(page)).toContainText(/Total\s*\$52/);
  });
});

test.describe("In the Bag", () => {
  test("pickup is complimentary and delivery adds the $8 fee", async ({ page, isMobile }) => {
    await bagWithMidnight(page, isMobile);
    const totals = summary(page);

    await expect(fulfilment(page, "Pickup", { pressed: true })).toBeVisible();
    await expect(totals).toContainText(/Subtotal\s*\$52/);
    await expect(totals).toContainText(/Collection\s*Complimentary/);
    await expect(totals).toContainText(/Total\s*\$52/);

    await fulfilment(page, "Delivery").click();
    await expect(fulfilment(page, "Delivery", { pressed: true })).toBeVisible();
    await expect(totals).toContainText(/Subtotal\s*\$52/);
    await expect(totals).toContainText(/Delivery\s*\$8/);
    await expect(totals).toContainText(/Total\s*\$60/);

    await fulfilment(page, "Pickup").click();
    await expect(totals).toContainText(/Total\s*\$52/);
  });

  test("the stepper changes the quantity within 1–9", async ({ page, isMobile }) => {
    await bagWithMidnight(page, isMobile);

    const line = bagLine(page, midnight.name);
    const stepper = line.getByRole("group", { name: `Quantity, ${midnight.name}` });
    const decrease = stepper.getByRole("button", { name: `Decrease quantity, ${midnight.name}` });
    const increase = stepper.getByRole("button", { name: `Increase quantity, ${midnight.name}` });

    // At 1 it cannot go lower.
    await expect(stepper).toHaveText("1");
    await expect(decrease).toBeDisabled();

    await increase.click();
    await expect(stepper).toHaveText("2");
    await expect(line).toContainText("$104");
    await expect(summary(page)).toContainText(/Total\s*\$104/);

    await decrease.click();
    await expect(stepper).toHaveText("1");
    await expect(decrease).toBeDisabled();

    // Up to 9, where it cannot go higher.
    for (let qty = 2; qty <= 9; qty++) {
      await increase.click();
      await expect(stepper).toHaveText(String(qty));
    }
    await expect(increase).toBeDisabled();
    await expect(line).toContainText("$468");
    await expect(summary(page)).toContainText(/Total\s*\$468/);

    await decrease.click();
    await expect(stepper).toHaveText("8");
    await expect(increase).toBeEnabled();
    await expect(summary(page)).toContainText(/Total\s*\$416/);
  });

  test("Remove empties the Bag and shows the empty state", async ({ page, isMobile }) => {
    await bagWithMidnight(page, isMobile);

    await page.getByRole("button", { name: `Remove ${midnight.name}` }).click();

    await expect(bagLine(page, midnight.name)).toHaveCount(0);
    await expect(page.getByText("Your bag is empty")).toBeVisible();
    await expect(page.getByRole("link", { name: "Discover the collection" })).toBeVisible();
    await expect(page.getByText("0 items", { exact: true })).toBeVisible();
    await expect(summary(page)).toContainText(/Total\s*\$0/);
    await expect(summary(page).getByRole("button", { name: "Checkout" })).toBeDisabled();
    await expect(headerBag(page, 0)).toBeVisible();
  });

  test("the Bag survives a reload", async ({ page }) => {
    await bagWithConfiguredStrawberry(page);
    await expect(bagLine(page, strawberry.name)).toHaveCount(1);

    await page.reload();

    const line = bagLine(page, strawberry.name);
    await expect(line).toHaveCount(1);
    await expect(line).toContainText(LINE_DETAILS);
    await expect(line).toContainText("15 Jun");
    await expect(line).toContainText("$64");
    await expect(headerBag(page, 1)).toBeVisible();
    await expect(summary(page)).toContainText(/Total\s*\$64/);
  });
});
