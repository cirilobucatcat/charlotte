import { describe, expect, it } from "vitest";
import { addLine, clampQty, lineId, MAX_QTY, MIN_QTY, type LineItem, type NewLineItem } from "./cart";

const strawberry: NewLineItem = {
  slug: "strawberry-charlotte",
  size: "6″",
  sponge: "Vanilla chiffon",
  message: "",
  date: "",
  qty: 1,
  unitPrice: 48,
};

function line(overrides: Partial<NewLineItem> = {}): LineItem {
  const item = { ...strawberry, ...overrides };
  return { ...item, id: lineId(item) };
}

describe("clampQty", () => {
  it("keeps quantities between 1 and 9", () => {
    expect(MIN_QTY).toBe(1);
    expect(MAX_QTY).toBe(9);
    expect(clampQty(1)).toBe(1);
    expect(clampQty(5)).toBe(5);
    expect(clampQty(9)).toBe(9);
  });

  it("raises anything below 1 to 1", () => {
    expect(clampQty(0)).toBe(1);
    expect(clampQty(-3)).toBe(1);
  });

  it("lowers anything above 9 to 9", () => {
    expect(clampQty(10)).toBe(9);
    expect(clampQty(500)).toBe(9);
  });

  it("rounds to a whole number", () => {
    expect(clampQty(2.4)).toBe(2);
    expect(clampQty(2.6)).toBe(3);
  });
});

describe("lineId", () => {
  it("joins slug, size, sponge, message and date", () => {
    const id = lineId({ ...strawberry, message: "Happy birthday", date: "2027-06-15" });
    expect(id).toBe("strawberry-charlotte|6″|Vanilla chiffon|Happy birthday|2027-06-15");
  });

  it("ignores whitespace around the message", () => {
    expect(lineId({ ...strawberry, message: "  Hello  " })).toBe(lineId({ ...strawberry, message: "Hello" }));
  });

  it("ignores quantity and price", () => {
    expect(lineId({ ...strawberry, qty: 4, unitPrice: 99 })).toBe(lineId(strawberry));
  });

  it("differs when any of the five fields differs", () => {
    const base = lineId(strawberry);
    expect(lineId({ ...strawberry, slug: "midnight-chocolate" })).not.toBe(base);
    expect(lineId({ ...strawberry, size: "8″" })).not.toBe(base);
    expect(lineId({ ...strawberry, sponge: "Dark chocolate" })).not.toBe(base);
    expect(lineId({ ...strawberry, message: "Hello" })).not.toBe(base);
    expect(lineId({ ...strawberry, date: "2027-06-15" })).not.toBe(base);
  });
});

describe("addLine", () => {
  it("adds a new line to an empty bag", () => {
    expect(addLine([], strawberry)).toEqual([line()]);
  });

  it("trims the message on a new line", () => {
    const [added] = addLine([], { ...strawberry, message: "  Hello  " });
    expect(added.message).toBe("Hello");
    expect(added.id).toBe(lineId({ ...strawberry, message: "Hello" }));
  });

  it("merges an identical line into the existing one and adds the quantities", () => {
    const items = addLine([line({ qty: 2 })], { ...strawberry, qty: 3 });
    expect(items).toHaveLength(1);
    expect(items[0].qty).toBe(5);
  });

  it("merges lines whose messages differ only by surrounding whitespace", () => {
    const items = addLine([line({ message: "Hello", qty: 1 })], { ...strawberry, message: " Hello ", qty: 1 });
    expect(items).toHaveLength(1);
    expect(items[0].qty).toBe(2);
  });

  it("keeps a separate line when the size, sponge, message or date differs", () => {
    let items = addLine([], strawberry);
    items = addLine(items, { ...strawberry, size: "8″", unitPrice: 64 });
    items = addLine(items, { ...strawberry, sponge: "Dark chocolate" });
    items = addLine(items, { ...strawberry, message: "Hello" });
    items = addLine(items, { ...strawberry, date: "2027-06-15" });
    expect(items).toHaveLength(5);
    expect(items.every((i) => i.qty === 1)).toBe(true);
  });

  it("keeps a separate line for a different product", () => {
    const items = addLine([line()], { ...strawberry, slug: "midnight-chocolate", unitPrice: 52 });
    expect(items.map((i) => i.slug)).toEqual(["strawberry-charlotte", "midnight-chocolate"]);
  });

  it("caps a merged quantity at 9", () => {
    const items = addLine([line({ qty: 8 })], { ...strawberry, qty: 5 });
    expect(items[0].qty).toBe(9);
  });

  it("clamps the quantity of a new line into 1–9", () => {
    expect(addLine([], { ...strawberry, qty: 20 })[0].qty).toBe(9);
    expect(addLine([], { ...strawberry, qty: 0 })[0].qty).toBe(1);
  });

  it("leaves the other lines alone when merging", () => {
    const other = line({ slug: "midnight-chocolate", unitPrice: 52, qty: 4 });
    const items = addLine([line(), other], strawberry);
    expect(items[1]).toBe(other);
  });

  it("does not change the list it is given", () => {
    const before = [line({ qty: 2 })];
    const snapshot = structuredClone(before);
    addLine(before, strawberry);
    expect(before).toEqual(snapshot);
  });
});
