"use client";

import { AnimatePresence, motion } from "motion/react";
import { useId, useRef, useState } from "react";

import { cn } from "@/lib/cn";
import { whyMyn } from "@/lib/content";

/** Why MYN: accessible vertical tabs (arrow keys, Home, End). */
export function WhyTabs() {
  const [active, setActive] = useState(0);
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const id = useId();

  const select = (i: number) => {
    setActive(i);
    tabs.current[i]?.focus();
  };

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const n = whyMyn.length;
    const next =
      e.key === "ArrowDown" || e.key === "ArrowRight"
        ? (i + 1) % n
        : e.key === "ArrowUp" || e.key === "ArrowLeft"
          ? (i - 1 + n) % n
          : e.key === "Home"
            ? 0
            : e.key === "End"
              ? n - 1
              : null;
    if (next !== null) {
      e.preventDefault();
      select(next);
    }
  };

  const item = whyMyn[active];

  return (
    <section aria-labelledby={`${id}-title`} className="border-t border-line">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-5 py-24 md:px-8 md:py-32 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h2 id={`${id}-title`} className="display text-[clamp(2.6rem,5.4vw,5rem)]">
            Built different. On purpose.
          </h2>
          <div role="tablist" aria-orientation="vertical" aria-label="Why MYN" className="mt-12 flex flex-col">
            {whyMyn.map((w, i) => (
              <button
                key={w.label}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                role="tab"
                id={`${id}-tab-${i}`}
                aria-selected={i === active}
                aria-controls={`${id}-panel`}
                tabIndex={i === active ? 0 : -1}
                onClick={() => setActive(i)}
                onKeyDown={(e) => onKey(e, i)}
                className={cn(
                  "group flex items-center gap-4 border-b border-line py-5 text-left text-xl transition-colors md:text-2xl",
                  i === active ? "text-ink" : "text-muted hover:text-ink",
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "diamond size-3 shrink-0 transition-all duration-500",
                    i === active ? "rotate-0 bg-accent" : "scale-50 bg-line",
                  )}
                />
                {w.label}
              </button>
            ))}
          </div>
        </div>
        <div
          role="tabpanel"
          id={`${id}-panel`}
          aria-labelledby={`${id}-tab-${active}`}
          tabIndex={0}
          className="relative flex min-h-[320px] items-end bg-paper-2 p-8 md:p-14 lg:col-span-7"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="display block text-[8rem] leading-[0.8] text-accent-text/25 md:text-[11rem]" aria-hidden="true">
                0{active + 1}
              </span>
              <h3 className="display mt-6 max-w-[16ch] text-4xl md:text-5xl">{item.headline}</h3>
              <p className="mt-5 max-w-[52ch] text-lg leading-relaxed text-muted">{item.body}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
