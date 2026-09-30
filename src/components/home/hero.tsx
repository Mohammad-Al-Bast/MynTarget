import { ButtonLink } from "@/components/button";
import { HeroWindow } from "@/components/home/hero-window";
import { getProjects } from "@/lib/cms";
import { cta } from "@/lib/content";

export async function HomeHero() {
  const projects = await getProjects();
  return (
    <section className="relative mx-auto grid min-h-[calc(100dvh-68px)] max-w-[1400px] items-center gap-10 px-5 pb-16 pt-10 md:px-8 lg:grid-cols-12 lg:gap-6 lg:pt-6">
      <div className="lg:col-span-7">
        <h1 className="display text-[clamp(2.75rem,5.2vw,4.6rem)] lg:whitespace-nowrap">
          <span className="rise block" style={{ "--i": 0 } as React.CSSProperties}>
            We build brands
          </span>
          <span className="rise block" style={{ "--i": 1 } as React.CSSProperties}>
            that <span className="text-accent-text">move</span> the region.
          </span>
        </h1>
        <p
          className="rise mt-8 max-w-[42ch] text-lg leading-relaxed text-muted md:text-xl"
          style={{ "--i": 3 } as React.CSSProperties}
        >
          Strategy, creative, production and performance under one roof. We make work that works.
        </p>
        <div className="rise mt-10 flex flex-wrap gap-3" style={{ "--i": 4 } as React.CSSProperties}>
          <ButtonLink href={cta.contact.href}>{cta.contact.label}</ButtonLink>
          <ButtonLink href={cta.work.href} variant="outline">
            {cta.work.label}
          </ButtonLink>
        </div>
      </div>
      <div className="lg:col-span-5">
        <HeroWindow projects={projects} />
      </div>
    </section>
  );
}
