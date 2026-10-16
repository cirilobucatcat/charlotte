/** Sample prices are whole dollars, so no decimals are shown. */
export function formatPrice(amount: number) {
  return `$${amount}`;
}

export function pluralize(count: number, one: string, many: string) {
  return `${count} ${count === 1 ? one : many}`;
}

const dateFormat = new Intl.DateTimeFormat("en-GB", {
  weekday: "short",
  day: "numeric",
  month: "short",
});

/** Formats a `yyyy-mm-dd` value from a date input, e.g. "Sat 24 Oct". */
export function formatDate(iso: string) {
  const date = new Date(`${iso}T00:00:00`);
  return Number.isNaN(date.getTime()) ? iso : dateFormat.format(date);
}
