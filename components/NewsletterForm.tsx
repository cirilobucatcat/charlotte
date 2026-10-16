"use client";

import { useState, type FormEvent } from "react";
import { ArrowRightIcon } from "./icons";

/** Underline email field. There is no backend yet, so submitting just thanks the reader. */
export function NewsletterForm() {
  const [done, setDone] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setDone(true);
  }

  if (done) {
    return (
      <p role="status" className="flex flex-[1_1_420px] items-center gap-3 border-b border-ink pb-4 text-lg font-light">
        <span aria-hidden="true" className="size-2 flex-none rounded-full bg-pink" />
        Thank you — your first letter is on its way.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-[1_1_420px] items-center border-b border-ink">
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        name="email"
        type="email"
        required
        autoComplete="email"
        placeholder="Your email address"
        className="h-14 min-w-0 flex-1 bg-transparent p-0 text-lg font-light text-ink placeholder:text-muted focus-visible:outline-offset-4"
      />
      <button
        type="submit"
        className="flex h-14 cursor-pointer items-center gap-2.5 pl-4 text-[13px] font-medium uppercase tracking-[0.16em] transition-colors hover:text-rose"
      >
        Subscribe <ArrowRightIcon size={18} />
      </button>
    </form>
  );
}
