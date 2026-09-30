"use client";

import { ArrowUpRight } from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { projects } from "@/lib/content";

/**
 * The logo's composition, rebuilt as the hero visual: the big diamond is a window
 * onto the portfolio, flanked by the two small brand diamonds. It cycles through the
 * projects so the first thing visitors see is the actual work.
 */
export function HeroWindow() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const project = projects[index];

  useEffect(() => {
    if (reduce || paused) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % projects.length), 3800);
    return () => window.clearInterval(id);
  }, [reduce, paused]);

  return (
    <div
      className="relative mx-auto w-full max-w-[520px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="relative aspect-square">
        <motion.span
          aria-hidden="true"
          className="diamond absolute left-1/2 top-0 z-10 size-[15%] -translate-x-1/2 -translate-y-[45%] bg-accent"
          animate={reduce ? undefined : { y: [0, -8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <Link
          href={`/work/${project.slug}`}
          className="diamond group absolute inset-[6%] block overflow-hidden bg-paper-2"
          aria-label={`${project.client}, ${project.service}. View project`}
        >
          <AnimatePresence initial={false}>
            <motion.div
              key={project.slug}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.12 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <Image
                src={project.cover.src}
                alt={project.cover.alt}
                fill
                priority={index === 0}
                placeholder="blur"
                sizes="(min-width: 1024px) 480px, 90vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </motion.div>
          </AnimatePresence>
        </Link>
        <motion.span
          aria-hidden="true"
          className="diamond absolute bottom-0 left-1/2 z-10 size-[15%] -translate-x-1/2 translate-y-[45%] bg-accent"
          animate={reduce ? undefined : { y: [0, 8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="mt-14 flex items-center justify-between gap-4 border-t border-line pt-4">
        <Link href={`/work/${project.slug}`} className="group flex items-baseline gap-3">
          <span className="font-medium">{project.client}</span>
          <span className="text-sm text-muted">{project.service}</span>
          <ArrowUpRight weight="bold" className="size-3.5 self-center text-accent-text transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
        <div className="flex gap-1.5" role="group" aria-label="Choose project">
          {projects.map((p, i) => (
            <button
              key={p.slug}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show ${p.client}`}
              aria-pressed={i === index}
              className="grid size-6 place-items-center"
            >
              <span
                className={`diamond block size-2.5 transition-colors ${i === index ? "bg-accent" : "bg-ink/25 hover:bg-ink/50"}`}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
