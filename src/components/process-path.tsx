"use client";

import { ArrowsClockwise } from "@phosphor-icons/react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

import { processSteps } from "@/lib/content";

/**
 * The path to performance: five diamond nodes on a line that draws itself as the
 * section scrolls in. The last step loops back, because optimisation feeds the next brief.
 */
export function ProcessPath() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "center 50%"] });
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={ref} aria-labelledby="process-title" className="mx-auto max-w-[1400px] px-5 py-24 md:px-8 md:py-32">
      <h2 id="process-title" className="display text-[clamp(2.6rem,5.4vw,5rem)]">
        The path to performance.
      </h2>
      <p className="mt-5 max-w-[46ch] text-lg text-muted">
        Five steps from the first conversation to the next opportunity.
      </p>

      <ol className="relative mt-16 grid gap-10 md:mt-24 md:grid-cols-5 md:gap-6">
        {/* Track: horizontal on desktop, vertical on mobile */}
        <span aria-hidden="true" className="absolute left-[7px] top-2 h-[calc(100%-1rem)] w-px bg-line md:left-0 md:top-[7px] md:h-px md:w-full" />
        <motion.span
          aria-hidden="true"
          style={{ scaleX }}
          className="absolute left-0 top-[7px] hidden h-px w-full origin-left bg-accent md:block"
        />
        {processSteps.map((step, i) => (
          <li key={step.title} className="relative pl-10 md:pl-0 md:pt-12">
            <span
              aria-hidden="true"
              className={`diamond absolute left-0 top-0 size-4 ${i === processSteps.length - 1 ? "bg-accent" : "bg-ink"}`}
            />
            <span className="font-mono text-sm text-accent-text">0{i + 1}</span>
            <h3 className="display mt-2 text-3xl">{step.title}</h3>
            <p className="mt-3 max-w-[26ch] text-muted">{step.body}</p>
            {i === processSteps.length - 1 && (
              <p className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-accent-text">
                <ArrowsClockwise weight="bold" className="size-4" aria-hidden="true" />
                Learn. Refine. Repeat.
              </p>
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}
