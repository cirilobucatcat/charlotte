import { describe, expect, it } from "vitest";
import { filters, matchesFilter, type FilterId, type Product } from "./products";

type Filterable = Pick<Product, "category" | "tags">;

const strawberryCake: Filterable = { category: "cakes", tags: ["birthdays", "weddings"] };
const lemonCake: Filterable = { category: "cakes", tags: ["eggless", "weddings"] };
const petitsBox: Filterable = { category: "petits", tags: ["gift-boxes"] };

describe("matchesFilter", () => {
  it("matches everything for All", () => {
    expect(matchesFilter("all", strawberryCake)).toBe(true);
    expect(matchesFilter("all", petitsBox)).toBe(true);
    expect(matchesFilter("all", { category: "cakes", tags: [] })).toBe(true);
  });

  it("matches Cakes and Petits by category", () => {
    expect(matchesFilter("cakes", strawberryCake)).toBe(true);
    expect(matchesFilter("cakes", petitsBox)).toBe(false);
    expect(matchesFilter("petits", petitsBox)).toBe(true);
    expect(matchesFilter("petits", strawberryCake)).toBe(false);
  });

  it("does not look at tags for the category filters", () => {
    expect(matchesFilter("cakes", { category: "petits", tags: ["cakes"] })).toBe(false);
  });

  it("matches Eggless, Weddings and Gift boxes by tag", () => {
    expect(matchesFilter("eggless", lemonCake)).toBe(true);
    expect(matchesFilter("eggless", strawberryCake)).toBe(false);
    expect(matchesFilter("weddings", strawberryCake)).toBe(true);
    expect(matchesFilter("weddings", petitsBox)).toBe(false);
    expect(matchesFilter("gift-boxes", petitsBox)).toBe(true);
    expect(matchesFilter("gift-boxes", lemonCake)).toBe(false);
  });

  it("does not look at category for the tag filters", () => {
    expect(matchesFilter("eggless", { category: "cakes", tags: [] })).toBe(false);
  });
});

describe("filters", () => {
  const labelsFor = (surface: "desktop" | "mobile") =>
    filters.filter((f) => f.show === "both" || f.show === surface).map((f) => f.label);

  it("shows All · Cakes · Petits · Eggless on desktop", () => {
    expect(labelsFor("desktop")).toEqual(["All", "Cakes", "Petits", "Eggless"]);
  });

  it("shows All · Cakes · Petits · Weddings · Gift boxes on mobile", () => {
    expect(labelsFor("mobile")).toEqual(["All", "Cakes", "Petits", "Weddings", "Gift boxes"]);
  });

  it("has a unique id for every filter", () => {
    const ids: FilterId[] = filters.map((f) => f.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
