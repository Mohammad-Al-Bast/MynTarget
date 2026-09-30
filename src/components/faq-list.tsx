import { Plus } from "@phosphor-icons/react/ssr";

import type { Faq } from "@/lib/content";

/** Native <details> accordion: keyboard and screen-reader friendly with zero JS. */
export function FaqList({ items }: { items: Faq[] }) {
  return (
    <div className="border-t border-line">
      {items.map((f) => (
        <details key={f.q} className="group border-b border-line">
          <summary className="flex cursor-pointer items-center justify-between gap-6 py-6 text-xl font-medium transition-colors hover:text-accent-text md:text-2xl">
            {f.q}
            <span className="acc-icon grid size-10 shrink-0 place-items-center border border-line transition-transform duration-300 group-open:border-accent group-open:bg-accent group-open:text-accent-ink">
              <Plus aria-hidden="true" weight="bold" className="size-4" />
            </span>
          </summary>
          <p className="max-w-[60ch] pb-7 text-lg leading-relaxed text-muted">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
