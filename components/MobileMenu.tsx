"use client";

import Link from "next/link";
import { useRef } from "react";
import { cn } from "@/lib/cn";
import { CloseIcon, MenuIcon } from "./icons";
import { Sparkle } from "./Sparkle";

/**
 * Menu button and full-height sheet. A modal <dialog> handles focus
 * containment and Escape; the page behind stops scrolling while it's open.
 */
export function MobileMenu({
  links,
  className,
}: {
  links: { href: string; label: string }[];
  className?: string;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const close = () => dialog.current?.close();

  return (
    <>
      <button
        type="button"
        aria-label="Menu"
        aria-haspopup="dialog"
        onClick={() => dialog.current?.showModal()}
        className={cn("flex size-11 cursor-pointer items-center justify-start", className)}
      >
        <MenuIcon size={24} />
      </button>

      <dialog
        ref={dialog}
        aria-label="Menu"
        className="m-0 h-dvh max-h-none w-full max-w-none border-0 bg-ground p-0 text-ink backdrop:bg-ink/30"
      >
        <div className="shell flex h-full flex-col pt-3.5 pb-10">
          <div className="flex items-center justify-between">
            <span className="font-serif text-[32px] leading-none italic">Charlotte</span>
            <button
              type="button"
              aria-label="Close menu"
              onClick={close}
              className="flex size-11 cursor-pointer items-center justify-end"
            >
              <CloseIcon size={24} />
            </button>
          </div>

          <nav aria-label="Menu" className="mt-14 flex flex-col">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={close}
                className="border-b border-line py-4 font-serif text-[40px] leading-none transition-colors hover:text-rose"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/bag"
              onClick={close}
              className="border-b border-line py-4 font-serif text-[40px] leading-none transition-colors hover:text-rose"
            >
              Bag
            </Link>
          </nav>

          <div className="mt-auto flex items-center gap-3 text-xs font-medium uppercase tracking-[0.24em] text-muted">
            <Sparkle size={16} />
            Pâtisserie · Made to order
          </div>
        </div>
      </dialog>
    </>
  );
}
