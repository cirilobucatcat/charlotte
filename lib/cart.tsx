"use client";

import { createContext, use, useMemo, useSyncExternalStore, type ReactNode } from "react";
import { getProduct } from "./products";

export type Fulfilment = "pickup" | "delivery";

export type LineItem = {
  id: string;
  slug: string;
  size: string;
  sponge: string;
  message: string;
  date: string;
  qty: number;
  unitPrice: number;
};

export type NewLineItem = Omit<LineItem, "id">;

type CartState = { items: LineItem[]; mode: Fulfilment };

export const DELIVERY_FEE = 8; // sample price
export const MIN_QTY = 1;
export const MAX_QTY = 9;

const STORAGE_KEY = "charlotte:cart:v1";
const EMPTY: CartState = { items: [], mode: "pickup" };

/*
 * The cart lives in a tiny external store backed by localStorage and read
 * through useSyncExternalStore. The server snapshot is always the empty cart,
 * so hydration matches and the stored cart appears right after.
 */
let state: CartState = EMPTY;
let loaded = false;
const listeners = new Set<() => void>();

function clampQty(qty: number) {
  return Math.min(MAX_QTY, Math.max(MIN_QTY, Math.round(qty)));
}

/**
 * Rebuild a stored line from current product data. The stored price and id are
 * never trusted: the price comes from the product's size, the id is recomputed.
 * Returns null for lines whose product, size or sponge no longer exist.
 */
function toLineItem(value: unknown): LineItem | null {
  if (typeof value !== "object" || value === null) return null;
  const v = value as Record<string, unknown>;
  if (
    typeof v.slug !== "string" ||
    typeof v.size !== "string" ||
    typeof v.sponge !== "string" ||
    typeof v.message !== "string" ||
    typeof v.date !== "string" ||
    typeof v.qty !== "number" ||
    !Number.isFinite(v.qty)
  ) {
    return null;
  }
  const product = getProduct(v.slug);
  const size = product?.sizes.find((s) => s.label === v.size);
  if (!product || !size) return null;
  if (product.sponges ? !product.sponges.includes(v.sponge) : v.sponge !== "") return null;

  const item: NewLineItem = {
    slug: product.slug,
    size: size.label,
    sponge: v.sponge,
    message: v.message.trim(),
    date: v.date,
    qty: clampQty(v.qty),
    unitPrice: size.price,
  };
  return { ...item, id: lineId(item) };
}

function parse(raw: string | null): CartState {
  if (!raw) return EMPTY;
  try {
    const data = JSON.parse(raw) as { items?: unknown; mode?: unknown };
    const items: LineItem[] = [];
    for (const stored of Array.isArray(data.items) ? data.items : []) {
      const item = toLineItem(stored);
      if (!item) continue;
      // Lines that now share an id (e.g. after a price or whitespace fix) merge.
      const twin = items.find((i) => i.id === item.id);
      if (twin) twin.qty = clampQty(twin.qty + item.qty);
      else items.push(item);
    }
    return { items, mode: data.mode === "delivery" ? "delivery" : "pickup" };
  } catch {
    return EMPTY;
  }
}

function getSnapshot() {
  if (!loaded) {
    loaded = true;
    try {
      state = parse(window.localStorage.getItem(STORAGE_KEY));
    } catch {
      state = EMPTY;
    }
  }
  return state;
}

function getServerSnapshot() {
  return EMPTY;
}

function emit() {
  listeners.forEach((listener) => listener());
}

function onStorage(event: StorageEvent) {
  // Another tab changed the cart (or cleared storage): re-read on next snapshot.
  if (event.key !== null && event.key !== STORAGE_KEY) return;
  loaded = false;
  emit();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  if (listeners.size === 1) window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) window.removeEventListener("storage", onStorage);
  };
}

function write(next: CartState) {
  state = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Storage can be full or blocked; the cart still works for this visit.
  }
  emit();
}

function lineId(item: NewLineItem) {
  return [item.slug, item.size, item.sponge, item.message.trim(), item.date].join("|");
}

const actions = {
  add(item: NewLineItem) {
    const current = getSnapshot();
    const id = lineId(item);
    const existing = current.items.find((i) => i.id === id);
    const items = existing
      ? current.items.map((i) => (i.id === id ? { ...i, qty: clampQty(i.qty + item.qty) } : i))
      : [...current.items, { ...item, message: item.message.trim(), id, qty: clampQty(item.qty) }];
    write({ ...current, items });
  },
  setQty(id: string, qty: number) {
    const current = getSnapshot();
    write({
      ...current,
      items: current.items.map((i) => (i.id === id ? { ...i, qty: clampQty(qty) } : i)),
    });
  },
  remove(id: string) {
    const current = getSnapshot();
    write({ ...current, items: current.items.filter((i) => i.id !== id) });
  },
  clear() {
    write({ ...getSnapshot(), items: [] });
  },
  setMode(mode: Fulfilment) {
    write({ ...getSnapshot(), mode });
  },
};

function subscribeNever() {
  return () => {};
}

type CartValue = CartState &
  typeof actions & {
    count: number;
    subtotal: number;
    fee: number;
    total: number;
    /** False during the server render and hydration, before the stored cart is read. */
    hydrated: boolean;
  };

const CartContext = createContext<CartValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const cart = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const hydrated = useSyncExternalStore(
    subscribeNever,
    () => true,
    () => false,
  );

  const value = useMemo<CartValue>(() => {
    const count = cart.items.reduce((sum, i) => sum + i.qty, 0);
    const subtotal = cart.items.reduce((sum, i) => sum + i.unitPrice * i.qty, 0);
    const fee = cart.mode === "delivery" && subtotal > 0 ? DELIVERY_FEE : 0;
    return { ...cart, ...actions, count, subtotal, fee, total: subtotal + fee, hydrated };
  }, [cart, hydrated]);

  return <CartContext value={value}>{children}</CartContext>;
}

export function useCart() {
  const cart = use(CartContext);
  if (!cart) throw new Error("useCart must be used inside <CartProvider>");
  return cart;
}
