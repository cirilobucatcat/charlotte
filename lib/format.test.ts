import { describe, expect, it } from "vitest";
import { formatDate, formatPrice, pluralize } from "./format";

describe("formatPrice", () => {
  it("shows whole dollars with a dollar sign", () => {
    expect(formatPrice(48)).toBe("$48");
    expect(formatPrice(0)).toBe("$0");
  });

  it("does not add decimals or thousands separators", () => {
    expect(formatPrice(1250)).toBe("$1250");
  });
});

describe("pluralize", () => {
  it("uses the singular for exactly one", () => {
    expect(pluralize(1, "item", "items")).toBe("1 item");
  });

  it("uses the plural for zero and for many", () => {
    expect(pluralize(0, "item", "items")).toBe("0 items");
    expect(pluralize(3, "item", "items")).toBe("3 items");
  });
});

describe("formatDate", () => {
  it("formats a yyyy-mm-dd value as a short weekday, day and month", () => {
    expect(formatDate("2027-06-15")).toMatch(/Tue.*15 Jun/);
  });

  it("returns the input unchanged when it is not a date", () => {
    expect(formatDate("")).toBe("");
    expect(formatDate("soon")).toBe("soon");
  });
});
