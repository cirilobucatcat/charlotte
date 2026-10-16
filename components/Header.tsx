import Link from "next/link";
import { AccountIcon, SearchIcon } from "./icons";
import { BagLink } from "./BagLink";
import { MobileMenu } from "./MobileMenu";

export const navLinks = [
  { href: "/#shop", label: "Shop" },
  { href: "/#occasions", label: "Occasions" },
  { href: "/#atelier", label: "Atelier" },
];

export function Header() {
  return (
    // Height is mirrored in --header-h (globals.css) for anchor scroll offsets.
    <header className="sticky top-0 z-40 border-b border-line bg-ground">
      <div className="shell grid grid-cols-[1fr_auto_1fr] items-center gap-4 pt-3.5 pb-2.5 md:py-[18px]">
        <div className="flex items-center">
          <nav
            aria-label="Main"
            className="hidden gap-8 text-[13px] font-medium uppercase tracking-[0.16em] min-[860px]:flex"
          >
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="transition-colors hover:text-rose">
                {link.label}
              </Link>
            ))}
          </nav>
          <MobileMenu links={navLinks} className="min-[860px]:hidden" />
        </div>

        <Link
          href="/"
          className="text-center font-serif text-[32px] leading-none tracking-[-0.01em] italic transition-colors hover:text-rose md:text-[40px]"
        >
          Charlotte
        </Link>

        <div className="flex items-center justify-end gap-1">
          {/* Search and account are placeholders until those features exist. */}
          <button
            type="button"
            aria-label="Search"
            className="hidden size-11 cursor-pointer items-center justify-center transition-colors hover:text-rose md:flex"
          >
            <SearchIcon />
          </button>
          <button
            type="button"
            aria-label="Account"
            className="hidden size-11 cursor-pointer items-center justify-center transition-colors hover:text-rose md:flex"
          >
            <AccountIcon />
          </button>
          <BagLink />
        </div>
      </div>
    </header>
  );
}
