import Image from "next/image";

import { clients } from "@/lib/content";

/** The site's one marquee. Logos ship on black, so each sits on its own black tile. */
export function ClientMarquee() {
  const row = [...clients, ...clients];
  return (
    <section aria-labelledby="clients-label" className="border-y border-line py-10">
      <div className="mx-auto mb-6 max-w-[1400px] px-5 md:px-8">
        <p id="clients-label" className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
          In good company
        </p>
      </div>
      <div className="marquee overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
        <ul className="marquee-track flex w-max gap-4">
          {row.map((c, i) => (
            <li
              key={`${c.alt}-${i}`}
              aria-hidden={i >= clients.length ? true : undefined}
              className="relative h-28 w-44 shrink-0 bg-black md:h-32 md:w-52"
            >
              <Image
                src={c.src}
                alt={i >= clients.length ? "" : c.alt}
                fill
                className="object-contain p-4"
                sizes="208px"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
