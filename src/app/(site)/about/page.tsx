import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { ButtonLink } from "@/components/button";
import { ClientMarquee } from "@/components/client-marquee";
import { ClosingCta } from "@/components/closing-cta";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { WhyTabs } from "@/components/why-tabs";
import { aboutImages, cta, services, values } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "MYN Target is a creative marketing agency for brands with somewhere to go: strategy, production and performance from one connected team.",
  alternates: { canonical: "/about" },
};

const promises = [
  "Strategy shaped around your market",
  "Creative production with attention to detail",
  "Campaigns connected to your goals",
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        kicker="The agency"
        title="Built different. On purpose."
        intro="A creative marketing agency for brands with somewhere to go."
      />

      {/* One connected team */}
      <section aria-labelledby="team-title" className="mx-auto grid max-w-[1400px] items-center gap-12 px-5 pb-24 md:px-8 md:pb-32 lg:grid-cols-12">
        <Reveal className="relative aspect-[4/5] overflow-hidden bg-paper-2 lg:col-span-5">
          <Image src={aboutImages.team.src} alt={aboutImages.team.alt} fill placeholder="blur" sizes="(min-width: 1024px) 520px, 100vw" className="object-cover" />
        </Reveal>
        <div className="lg:col-span-6 lg:col-start-7">
          <h2 id="team-title" className="display text-[clamp(2.6rem,5.4vw,5rem)]">
            Strategy. Production. Performance.
          </h2>
          <p className="mt-6 max-w-[46ch] text-lg leading-relaxed text-muted">
            MYN Target brings creative thinking and purposeful execution together. We help brands grow
            through design, content and digital media.
          </p>
          <ul className="mt-10 space-y-4">
            {promises.map((p) => (
              <li key={p} className="flex items-center gap-4 text-lg">
                <span aria-hidden="true" className="diamond size-2.5 shrink-0 bg-accent" />
                {p}
              </li>
            ))}
          </ul>
          <ButtonLink href={cta.services.href} variant="outline" className="mt-10">
            {cta.services.label}
          </ButtonLink>
        </div>
      </section>

      {/* Purpose: manifesto on the brand band */}
      <section aria-labelledby="purpose-title" className="bg-band text-band-ink">
        <div className="mx-auto max-w-[1400px] px-5 py-24 md:px-8 md:py-36">
          <h2 id="purpose-title" className="display max-w-[18ch] text-[clamp(2.8rem,7vw,6.5rem)]">
            We build work that moves brands.
          </h2>
          <p className="mt-8 max-w-[52ch] text-xl leading-relaxed text-band-ink/75">
            Empowering businesses through tailored marketing that builds visibility, creates connections
            and supports growth.
          </p>
          <dl className="mt-16 grid gap-10 border-t border-band-ink/20 pt-10 md:grid-cols-2">
            <div>
              <dt className="text-band-ink/60">Our vision</dt>
              <dd className="display mt-3 text-3xl md:text-4xl">
                To be recognised for creativity, innovation and meaningful results.
              </dd>
            </div>
            <div>
              <dt className="text-band-ink/60">Our mission</dt>
              <dd className="display mt-3 text-3xl md:text-4xl">
                To turn smart marketing into impact and long-term value.
              </dd>
            </div>
          </dl>
        </div>
      </section>

      {/* Values */}
      <section aria-labelledby="values-title" className="mx-auto max-w-[1400px] px-5 py-24 md:px-8 md:py-32">
        <h2 id="values-title" className="display text-[clamp(2.6rem,5.4vw,5rem)]">
          What we hold ourselves to.
        </h2>
        <ol className="mt-14 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <Reveal as="li" key={v.title} delay={i * 0.07} className="bg-paper p-8 pt-10">
              <span aria-hidden="true" className="diamond block size-5 bg-accent" style={{ transform: `rotate(${i * 15}deg)` }} />
              <h3 className="display mt-10 text-3xl">{v.title}</h3>
              <p className="mt-3 text-muted">{v.body}</p>
            </Reveal>
          ))}
        </ol>
      </section>

      <WhyTabs />

      {/* Capabilities index */}
      <section aria-labelledby="cap-title" className="border-t border-line">
        <div className="mx-auto max-w-[1400px] px-5 py-24 md:px-8 md:py-32">
          <h2 id="cap-title" className="display text-[clamp(2.6rem,5.4vw,5rem)]">
            Five service lines. One accountable team.
          </h2>
          <ul className="mt-14 border-t border-line">
            {services.map((s) => (
              <li key={s.id}>
                <Link
                  href={`/services#${s.id}`}
                  className="group flex items-baseline gap-6 border-b border-line py-6 transition-colors hover:text-accent-text md:gap-10"
                >
                  <span className="font-mono text-sm text-accent-text">{s.number}</span>
                  <span className="display text-[clamp(1.8rem,4vw,3.4rem)] transition-transform duration-500 ease-out-expo group-hover:translate-x-3">
                    {s.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ClientMarquee />
      <ClosingCta />
    </>
  );
}
