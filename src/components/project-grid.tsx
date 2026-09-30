import { ArrowUpRight } from "@phosphor-icons/react/ssr";
import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/cn";
import { getProjects } from "@/lib/cms";
import { blurProps } from "@/lib/img";

/**
 * Asymmetric portfolio grid. Tiles alternate wide/narrow and drop in height so the
 * grid reads like a contact sheet, not a row of equal cards.
 */
const layout = [
  "md:col-span-6",
  "md:col-span-5 md:col-start-8 md:mt-40",
  "md:col-span-5 md:col-start-2",
  "md:col-span-6 md:col-start-7 md:mt-24",
];
const ratio = ["aspect-[4/5]", "aspect-square", "aspect-square", "aspect-[5/4]"];

export async function ProjectGrid() {
  const projects = await getProjects();
  return (
    <ul className="grid gap-x-8 gap-y-16 md:grid-cols-12 md:gap-y-24">
      {projects.map((p, i) => (
        <Reveal as="li" key={p.slug} delay={(i % 2) * 0.1} className={layout[i % layout.length]}>
          <Link href={`/work/${p.slug}`} className="group block">
            <div className={cn("relative overflow-hidden bg-paper-2", ratio[i % ratio.length])}>
              <Image
                src={p.cover.src}
                alt={p.cover.alt}
                fill
                {...blurProps(p.cover)}
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.04]"
              />
              <span
                aria-hidden="true"
                className="diamond absolute bottom-5 right-5 grid size-14 scale-0 place-items-center bg-accent text-accent-ink transition-transform duration-500 ease-out-expo group-hover:scale-100"
              >
                <ArrowUpRight weight="bold" className="size-5" />
              </span>
            </div>
            <div className="mt-5 flex items-baseline justify-between gap-4">
              <h3 className="display text-3xl md:text-4xl">{p.client}</h3>
              <p className="text-sm text-muted">{p.service}</p>
            </div>
            <p className="mt-2 text-muted">{p.tagline}</p>
          </Link>
        </Reveal>
      ))}
    </ul>
  );
}
