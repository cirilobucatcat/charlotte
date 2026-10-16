import type { ReactNode } from "react";

/** Native <details> list with hairlines, uppercase summaries and a +/− icon. */
export function Accordion({ items }: { items: { title: string; body: ReactNode; open?: boolean }[] }) {
  return (
    <div className="flex flex-col border-b border-line">
      {items.map((item) => (
        <details key={item.title} open={item.open} className="group border-t border-line">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-[13px] font-medium uppercase tracking-[0.18em] [&::-webkit-details-marker]:hidden">
            {item.title}
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              aria-hidden="true"
              className="flex-none"
            >
              <path d="M5 12h14" />
              <path d="M12 5v14" className="transition-opacity group-open:opacity-0" />
            </svg>
          </summary>
          <p className="-mt-1.5 pb-5 text-[15px] leading-[1.7] font-light text-muted">{item.body}</p>
        </details>
      ))}
    </div>
  );
}
