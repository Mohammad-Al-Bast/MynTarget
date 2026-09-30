"use client";

import { ArrowUpRight } from "@phosphor-icons/react";
import { AnimatePresence, motion, useInView } from "motion/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { ServiceVisual } from "@/components/service-visual";
import { services, type Service } from "@/lib/content";

/**
 * Five disciplines, one scroll. On desktop the left column pins a large visual and
 * numeral that swap as each service panel crosses the middle of the viewport.
 */
export function ServicesIndex() {
  const [active, setActive] = useState(0);
  const current = services[active];

  return (
    <section aria-labelledby="services-title" className="bg-paper-2">
      <div className="mx-auto max-w-[1400px] px-5 py-24 md:px-8 md:py-32">
        <h2 id="services-title" className="display max-w-4xl text-[clamp(2.6rem,6vw,5.5rem)]">
          Five disciplines. One direction.
        </h2>

        <div className="mt-16 grid gap-10 lg:mt-20 lg:grid-cols-12 lg:gap-16">
          {/* Pinned visual, desktop only */}
          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-[120px]">
              <div className="relative aspect-square w-full max-w-[480px]">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.div
                    key={current.id}
                    className="absolute inset-0"
                    initial={{ opacity: 0, rotate: -8, scale: 0.9 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 8, scale: 0.9 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <ServiceVisual service={current} className="diamond size-full" />
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="mt-8 flex items-end gap-5">
                <span className="display text-[7rem] leading-[0.8] text-accent-text tabular-nums">
                  {current.number}
                </span>
                <span className="pb-2 text-muted">
                  of 05
                  <span className="block font-medium text-ink">{current.short}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Service panels */}
          <ol className="lg:col-span-7">
            {services.map((s, i) => (
              <ServicePanel key={s.id} service={s} index={i} onActive={setActive} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function ServicePanel({
  service,
  index,
  onActive,
}: {
  service: Service;
  index: number;
  onActive: (i: number) => void;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });

  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);

  return (
    <li
      ref={ref}
      className="flex flex-col justify-center border-t border-line py-14 first:border-t-0 first:pt-0 lg:min-h-[78vh] lg:first:pt-14"
    >
      <ServiceVisual service={service} className="diamond mb-10 aspect-square w-full max-w-[340px] lg:hidden" />
      <p className="flex items-center gap-3 text-muted">
        <span className="font-mono text-sm text-accent-text">{service.number}</span>
        {service.name}
      </p>
      <h3 className="display mt-4 text-[clamp(2.4rem,5vw,4.5rem)]">{service.statement}</h3>
      <p className="mt-5 max-w-[48ch] text-lg leading-relaxed text-muted">{service.intro}</p>
      <ul className="mt-8 grid gap-x-8 gap-y-5 sm:grid-cols-2">
        {service.items.map((item) => (
          <li key={item.title} className="flex gap-3">
            <span aria-hidden="true" className="diamond mt-2 size-2 shrink-0 bg-accent" />
            <span>
              <span className="block font-medium">{item.title}</span>
              <span className="block text-sm leading-relaxed text-muted">{item.body}</span>
            </span>
          </li>
        ))}
      </ul>
      <Link
        href={`/services#${service.id}`}
        className="group mt-10 inline-flex w-fit items-center gap-2 font-medium underline decoration-accent decoration-2 underline-offset-[6px] hover:decoration-ink"
      >
        More on {service.short.toLowerCase()}
        <ArrowUpRight weight="bold" className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </Link>
    </li>
  );
}
