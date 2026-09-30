import type { Metadata } from "next";
import Link from "next/link";

import { ButtonLink } from "@/components/button";
import { ClosingCta } from "@/components/closing-cta";
import { PageHero } from "@/components/page-hero";
import { ProcessPath } from "@/components/process-path";
import { Reveal } from "@/components/reveal";
import { ServiceVisual } from "@/components/service-visual";
import { cn } from "@/lib/cn";
import { cta, services, type Service } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Social media and marketing, content and production, branding, advertising and performance, and digital. Five disciplines from one accountable team.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        kicker="Our capabilities"
        title="Every service. One clear direction."
        intro="Strategy, content, branding, advertising and digital, working together."
      >
        <ButtonLink href={cta.contact.href}>{cta.contact.label}</ButtonLink>
      </PageHero>

      <nav
        aria-label="Services"
        className="sticky top-[68px] z-20 border-y border-line bg-paper/85 backdrop-blur-xl"
      >
        <ul className="mx-auto flex max-w-[1400px] gap-2 overflow-x-auto px-5 py-3 md:px-8 [scrollbar-width:none]">
          {services.map((s) => (
            <li key={s.id} className="shrink-0">
              <Link
                href={`#${s.id}`}
                className="flex items-center gap-2 border border-line px-4 py-2 text-sm transition-colors hover:border-accent hover:text-accent-text"
              >
                <span className="font-mono text-xs text-accent-text">{s.number}</span>
                {s.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {services.map((s, i) => (
        <ServiceChapter key={s.id} service={s} flip={i % 2 === 1} />
      ))}

      <ProcessPath />
      <ClosingCta title="Not sure where to start?" body="Tell us where you want to take your brand. We'll shape the right mix with you." />
    </>
  );
}

function ServiceChapter({ service, flip }: { service: Service; flip: boolean }) {
  return (
    <section
      id={service.id}
      aria-labelledby={`${service.id}-title`}
      className="scroll-mt-10 border-b border-line"
    >
      <div className="mx-auto max-w-[1400px] px-5 py-24 md:px-8 md:py-32">
        <div className="flex items-start gap-6 md:gap-10">
          <span
            aria-hidden="true"
            className="display text-[clamp(4.5rem,13vw,12rem)] leading-[0.78] text-transparent [-webkit-text-stroke:1.5px_var(--accent)]"
          >
            {service.number}
          </span>
          <div className="pt-1">
            <p className="text-muted">{service.name}</p>
            <h2 id={`${service.id}-title`} className="display mt-3 text-[clamp(2.4rem,6vw,5.5rem)]">
              {service.statement}
            </h2>
            <p className="mt-5 max-w-[46ch] text-lg leading-relaxed text-muted">{service.intro}</p>
          </div>
        </div>

        <div className="mt-16 grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className={cn("lg:col-span-5", flip && "lg:order-2")}>
            <ServiceVisual
              service={service}
              className={cn("aspect-square w-full max-w-[520px]", flip ? "diamond" : "", flip && "lg:ml-auto")}
            />
          </Reveal>
          <ol className="lg:col-span-7">
            {service.items.map((item, idx) => (
              <Reveal as="li" key={item.title} delay={idx * 0.08} className="group border-t border-line py-8 last:border-b">
                <div className="grid gap-3 md:grid-cols-[180px_1fr] md:gap-8">
                  <p className="flex items-center gap-3 font-medium">
                    <span aria-hidden="true" className="diamond size-2 bg-accent transition-transform duration-500 group-hover:rotate-90" />
                    {item.title}
                  </p>
                  <div>
                    <h3 className="display text-3xl md:text-4xl">{item.headline}</h3>
                    <p className="mt-3 max-w-[48ch] text-muted">{item.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
