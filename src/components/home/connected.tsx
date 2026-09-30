"use client";

import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";

const chain = ["Strategy", "Creative", "Production", "Performance"];

/**
 * The connected advantage. As the section scrolls through, each link in the chain
 * lights up in order, which is the point: one brief moving through every discipline.
 */
export function Connected() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });

  return (
    <section ref={ref} aria-labelledby="connected-title" className="mx-auto max-w-[1400px] px-5 py-24 md:px-8 md:py-36">
      <h2 id="connected-title" className="max-w-2xl text-2xl leading-snug md:text-3xl">
        One brief. A wider perspective. Identity, content, campaigns and digital work better when they
        share a direction.
      </h2>
      <p className="display mt-14 flex flex-col text-[clamp(2.25rem,9vw,8.5rem)] leading-[0.95]">
        {chain.map((word, i) => (
          <ChainWord key={word} word={word} index={i} progress={scrollYProgress} />
        ))}
      </p>
      <dl className="mt-16 grid max-w-2xl grid-cols-2 gap-8 border-t border-line pt-8">
        <div>
          <dt className="text-muted">Connected disciplines</dt>
          <dd className="display mt-2 text-6xl text-accent-text">05</dd>
        </div>
        <div>
          <dt className="text-muted">Accountable team</dt>
          <dd className="display mt-2 text-6xl text-accent-text">01</dd>
        </div>
      </dl>
    </section>
  );
}

function ChainWord({
  word,
  index,
  progress,
}: {
  word: string;
  index: number;
  progress: MotionValue<number>;
}) {
  const start = index / chain.length;
  const opacity = useTransform(progress, [start, start + 0.18], [0.14, 1]);
  return (
    <motion.span style={{ opacity, paddingLeft: `${index * 5}vw` }} className="flex items-center gap-[0.25em]">
      {word}
      {index < chain.length - 1 && (
        <span aria-hidden="true" className="diamond inline-block size-[0.22em] bg-accent" />
      )}
    </motion.span>
  );
}
