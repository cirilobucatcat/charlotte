import { Fragment } from "react";
import { cn } from "@/lib/cn";
import { Sparkle } from "./Sparkle";

const words = ["Birthdays", "Weddings", "Anniversaries", "Afternoon tea", "Just because"];

/*
 * The word list is repeated four times and the track moves one list width
 * (-25%) every 16s, so the loop is seamless even on 1920px screens. Items use
 * trailing padding rather than `gap` so every repeat is exactly the same width.
 */
const repeats = [0, 1, 2, 3];

export function Marquee({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" data-surface="dark" className={cn("overflow-hidden bg-ink py-6 text-on-dark", className)}>
      <div className="flex w-max animate-marquee items-center font-serif text-4xl leading-none whitespace-nowrap italic motion-reduce:animate-none">
        {repeats.map((r) =>
          words.map((word) => (
            <Fragment key={`${r}-${word}`}>
              <span className="pr-10">{word}</span>
              <Sparkle size={18} className="mr-10" />
            </Fragment>
          )),
        )}
      </div>
    </div>
  );
}
