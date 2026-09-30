import Image from "next/image";

import { ButtonLink } from "@/components/button";
import { Reveal } from "@/components/reveal";
import { cta, studioImages } from "@/lib/content";

const formats = ["Photography", "Video production", "Podcasts & talking heads"];

export function StudioBand() {
  const shots = [studioImages.jewel, studioImages.food, studioImages.beverage];
  return (
    <section aria-labelledby="studio-title" className="overflow-hidden bg-band text-band-ink">
      <div className="mx-auto max-w-[1400px] px-5 py-24 md:px-8 md:py-32">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-band-ink/60">The MYN studio</p>
            <h2 id="studio-title" className="display mt-5 text-[clamp(2.6rem,5.4vw,5rem)]">
              A production floor built for the work.
            </h2>
            <p className="mt-6 max-w-[40ch] text-lg leading-relaxed text-band-ink/70">
              Your next product shoot, podcast or campaign starts with a conversation.
            </p>
            <ul className="mt-10 border-t border-band-ink/15">
              {formats.map((f) => (
                <li key={f} className="flex items-center gap-3 border-b border-band-ink/15 py-4 text-lg">
                  <span aria-hidden="true" className="diamond size-2 bg-accent" />
                  {f}
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href={cta.studio.href} variant="band-primary">
                {cta.studio.label}
              </ButtonLink>
              <ButtonLink href="/studio" variant="band-outline">
                Tour the studio
              </ButtonLink>
            </div>
          </div>
          <div className="grid grid-cols-3 items-start gap-3 md:gap-5 lg:col-span-7">
            {shots.map((img, i) => (
              <Reveal key={img.alt} delay={i * 0.12} className={["mt-16", "", "mt-32"][i]}>
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image src={img.src} alt={img.alt} fill placeholder="blur" sizes="(min-width: 1024px) 260px, 33vw" className="object-cover" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
