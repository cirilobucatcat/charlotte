import { expect, type Locator, type Page } from "@playwright/test";

/*
 * What a customer sees today. These are written out here on purpose rather than
 * imported from lib/products: the journeys must keep passing when the catalogue
 * moves to the database, which is how we know customers see no difference.
 */
export const strawberry = {
  name: "Strawberry Charlotte",
  slug: "strawberry-charlotte",
  price: { "6″": 48, "8″": 64, "10″": 86 },
};
export const midnight = {
  name: "Midnight Chocolate",
  slug: "midnight-chocolate",
  price: { "6″": 52, "8″": 68, "10″": 90 },
};
export const lemon = {
  name: "Lemon Lavender",
  slug: "lemon-lavender",
  price: { "6″": 46, "8″": 62, "10″": 84 },
};
export const petits = {
  name: "Rose Pistachio Petits",
  slug: "rose-pistachio-petits",
  price: 28,
};

/** The grid order. */
export const allProducts = [strawberry.name, midnight.name, lemon.name, petits.name];

/**
 * Wait until React has hydrated `locator`, so that a click or fill on it is not
 * lost. Server-rendered HTML is visible and "actionable" a moment before its
 * handlers are attached.
 */
export async function hydrated(locator: Locator) {
  await expect
    .poll(() => locator.evaluate((el) => Object.keys(el).some((key) => key.startsWith("__reactProps$"))))
    .toBe(true);
}

/** Click a control once React is ready for it. */
export async function press(locator: Locator) {
  await hydrated(locator);
  await locator.click();
}

/** The "Signature cakes" section of the home page. */
export const collection = (page: Page) => page.getByRole("region", { name: /^Signature/ });

/** The names of the Products currently in the grid, in order. */
export const gridNames = (page: Page) => collection(page).getByRole("heading", { level: 3 });

export const filterTabs = (page: Page) => page.getByRole("group", { name: "Filter the collection" });

/** One Product's card in the grid. */
export const card = (page: Page, name: string) =>
  collection(page)
    .getByRole("article")
    .filter({ has: page.getByRole("heading", { name }) });

/** Open a Product from the grid by its title. */
export async function openFromGrid(page: Page, name: string) {
  await press(collection(page).getByRole("heading", { name }).getByRole("link"));
}

/**
 * Add one of a Product's default Size and Sponge from its grid card. Desktop has
 * an "Add to bag" button on the card; the phone has a "+" button on the arch.
 */
export async function quickAdd(page: Page, name: string, isMobile: boolean) {
  const button = isMobile
    ? card(page, name).getByRole("button", { name: `Add ${name} to bag` })
    : card(page, name).getByRole("button", { name: "Add to bag" });
  await press(button);
}

/** The big price under a Product's name (the add button repeats it, so take the first). */
export const shownPrice = (page: Page) =>
  page
    .getByText(/^\$\d+$/)
    .filter({ visible: true })
    .first();

export const addToBagButton = (page: Page) => page.getByRole("button", { name: /^Add to bag/ });

/** Choose options on a cake's page. Leave a field out to keep its default. */
export async function chooseOptions(
  page: Page,
  options: { size?: string; sponge?: string; message?: string; date?: string },
) {
  const { size, sponge, message, date } = options;
  if (size) await press(page.getByRole("group", { name: "Size" }).getByRole("button", { name: new RegExp(`^${size}`) }));
  if (sponge) await press(page.getByRole("group", { name: "Sponge" }).getByRole("button", { name: sponge }));
  if (message) {
    await hydrated(page.getByLabel("Message on the cake"));
    await page.getByLabel("Message on the cake").fill(message);
  }
  if (date) {
    await hydrated(page.getByLabel("Date"));
    await page.getByLabel("Date").fill(date);
  }
}

/** The header's bag link, which carries the item count in its name. */
export const headerBag = (page: Page, count: number) =>
  page.getByRole("banner").getByRole("link", { name: `Bag, ${count} ${count === 1 ? "item" : "items"}` });

/** The Pickup / Delivery toggle on the Bag page. */
export const fulfilment = (page: Page, option: "Pickup" | "Delivery", state: { pressed?: boolean } = {}) =>
  page.getByRole("group", { name: "Pickup or delivery" }).getByRole("button", { name: option, ...state });

/** The order summary panel on the Bag page. */
export const summary = (page: Page) => page.getByRole("complementary", { name: "Order summary" });

/** One Bag line, found by its Product name. */
export const bagLine = (page: Page, name: string) => page.getByRole("listitem").filter({ hasText: name });
