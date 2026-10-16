"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/cn";
import { pluralize } from "@/lib/format";
import { AccountIcon, BagIcon, HeartIcon, HomeIcon, SearchIcon } from "./icons";

const tabClass =
  "flex min-w-[60px] cursor-pointer flex-col items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.16em]";

function TabContent({ icon, label, active }: { icon: ReactNode; label: string; active: boolean }) {
  return (
    <>
      {icon}
      {label}
      {active && <span aria-hidden="true" className="-mt-0.5 size-1 rounded-full bg-rose" />}
    </>
  );
}

/** Bottom tab bar, shown below 768px only. */
export function MobileTabBar() {
  const pathname = usePathname();
  const { count } = useCart();
  const onBag = pathname === "/bag";
  const onHome = !onBag;

  return (
    <nav
      aria-label="App"
      className="fixed inset-x-0 bottom-0 z-40 flex h-[82px] items-start justify-around border-t border-line bg-ground pt-3 md:hidden"
    >
      <Link
        href="/"
        aria-current={pathname === "/" ? "page" : undefined}
        className={cn(tabClass, onHome ? "text-ink" : "text-muted")}
      >
        <TabContent icon={<HomeIcon size={22} />} label="Home" active={onHome} />
      </Link>
      {/* Search, Saved and Account are placeholders until those features exist. */}
      <button type="button" className={cn(tabClass, "text-muted")}>
        <TabContent icon={<SearchIcon size={22} />} label="Search" active={false} />
      </button>
      <button type="button" className={cn(tabClass, "text-muted")}>
        <TabContent icon={<HeartIcon size={22} />} label="Saved" active={false} />
      </button>
      <Link
        href="/bag"
        aria-label={`Bag, ${pluralize(count, "item", "items")}`}
        aria-current={onBag ? "page" : undefined}
        className={cn(tabClass, onBag ? "text-ink" : "text-muted")}
      >
        <TabContent
          icon={
            <span className="relative">
              <BagIcon size={22} />
              {count > 0 && (
                <span
                  aria-hidden="true"
                  className="absolute -top-1.5 -right-2.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-pink px-1 text-[11px] font-semibold tracking-normal text-ink"
                >
                  {count}
                </span>
              )}
            </span>
          }
          label="Bag"
          active={onBag}
        />
      </Link>
      <button type="button" className={cn(tabClass, "text-muted")}>
        <TabContent icon={<AccountIcon size={22} />} label="Account" active={false} />
      </button>
    </nav>
  );
}
