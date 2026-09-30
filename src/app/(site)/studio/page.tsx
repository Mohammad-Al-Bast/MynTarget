import { Microphone } from "@phosphor-icons/react/ssr";
import type { Metadata } from "next";
import Image from "next/image";

import { ButtonLink } from "@/components/button";
import { ClosingCta } from "@/components/closing-cta";
import { FaqList } from "@/components/faq-list";
import { Reveal } from "@/components/reveal";
import { cta, studioFaqs, studioImages } from "@/lib/content";

export const metadata: Metadata = {
  title: "The MYN Studio",
  description:
    "A production studio for product photography, video, reels, podcasts and campaign shoots, with a team to help you make it.",
  alternates: { canonical: "/studio" },
};

const support = [
  { title: "Photography & video", body: "Capture for products, people and campaigns." },
  { title: "Editing & content", body: "Thoughtful finishing for your chosen platforms." },
  { title: "Creative direction", body: "A clear idea and a purposeful shoot plan." },
  { title: "Production planning", body: "Coordination from the first brief to delivery." },
];

const audience = ["Brands", "Creators", "Podcasters", "Businesses", "Agencies", "Professionals"];

const booking = [
  { title: "Tell us about it", body: "Share the idea, format and support you need." },
  { title: "Choose a date", body: "Send your preference. We'll confirm availability." },
  { title: "Plan the setup", body: "Agree on equipment, timing and production details." },
  { title: "Create", body: "Arrive with a clear plan and make the work." },
];

export default function StudioPage() {
  return (
    <>
      {/* Hero: split, with the photo in the brand diamond */}
      <section className="mx-auto grid max-w-[1400px] items-center gap-12 px-5 pb-20 pt-14 md:px-8 md:pt-20 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="rise font-mono text-xs uppercase tracking-[0.2em] text-accent-text">The MYN studio</p>
          <h1 className="rise display mt-6 text-[clamp(3rem,7.4vw,7rem)]" style={{ "--i": 1 } as React.CSSProperties}>
            A space to create. A team to make it.
          </h1>
          <p className="rise mt-8 max-w-[42ch] text-lg text-muted md:text-xl" style={{ "--i": 2 } as React.CSSProperties}>
            For brands, creators and businesses ready to bring an idea to life.
          </p>
          <div className="rise mt-10" style={{ "--i": 3 } as React.CSSProperties}>
            <ButtonLink href={cta.studio.href}>{cta.studio.label}</ButtonLink>
          </div>
        </div>
        <div className="relative mx-auto aspect-square w-full max-w-[460px] lg:col-span-5">
          <div className="diamond absolute inset-0 overflow-hidden">
            <Image src={studioImages.hero.src} alt={studioImages.hero.alt} fill priority placeholder="blur" sizes="460px" className="object-cover" />
          </div>
        </div>
      </section>

      {/* Formats: bento, exactly four cells */}
      <section aria-labelledby="formats-title" className="bg-paper-2">
        <div className="mx-auto max-w-[1400px] px-5 py-24 md:px-8 md:py-32">
          <h2 id="formats-title" className="display max-w-[16ch] text-[clamp(2.6rem,5.4vw,5rem)]">
            Different formats. The same care.
          </h2>
          <div className="mt-14 grid gap-4 md:grid-cols-4 md:grid-rows-[300px_300px]">
            <FormatTile className="md:col-span-2 md:row-span-2" image={studioImages.product} title="Product photography" body="Put your product in the spotlight." />
            <Reveal className="flex flex-col justify-between bg-accent p-8 text-accent-ink md:col-span-2">
              <Microphone aria-hidden="true" weight="light" className="size-14" />
              <div>
                <h3 className="display text-4xl">Podcasts</h3>
                <p className="mt-2 opacity-85">Give your conversations room to grow.</p>
              </div>
            </Reveal>
            <FormatTile image={studioImages.reels} title="Reels & social" body="Made for the way people watch." compact />
            <FormatTile image={studioImages.campaign} title="Campaign shoots" body="One concept. A connected set of visuals." compact />
          </div>
          <p className="mt-6 text-sm text-muted">Photography shown is from our production portfolio.</p>
        </div>
      </section>

      {/* Production support + audience */}
      <section aria-labelledby="support-title" className="mx-auto max-w-[1400px] px-5 py-24 md:px-8 md:py-32">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 id="support-title" className="display text-[clamp(2.6rem,5.4vw,5rem)]">
              You don&apos;t have to do it alone.
            </h2>
            <p className="mt-6 max-w-[40ch] text-lg text-muted">
              Bring us in for the parts you need, or plan the full production with our team.
            </p>
            <p className="mt-12 text-sm text-muted">Made for</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {audience.map((a) => (
                <li key={a} className="border border-line px-4 py-2">
                  {a}
                </li>
              ))}
            </ul>
          </div>
          <dl className="grid gap-px self-start bg-line sm:grid-cols-2 lg:col-span-7">
            {support.map((s) => (
              <div key={s.title} className="bg-paper p-8">
                <dt className="display text-2xl">{s.title}</dt>
                <dd className="mt-3 text-muted">{s.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Booking steps on the brand band */}
      <section aria-labelledby="booking-title" className="bg-band text-band-ink">
        <div className="mx-auto max-w-[1400px] px-5 py-24 md:px-8 md:py-32">
          <h2 id="booking-title" className="display text-[clamp(2.6rem,5.4vw,5rem)]">
            A clear path to your shoot.
          </h2>
          <ol className="mt-16 grid gap-10 md:grid-cols-4 md:gap-8">
            {booking.map((b, i) => (
              <Reveal as="li" key={b.title} delay={i * 0.08} className="border-t border-band-ink/20 pt-6">
                <span className="display text-6xl text-accent">{i + 1}</span>
                <h3 className="mt-4 text-xl font-medium">{b.title}</h3>
                <p className="mt-2 text-band-ink/70">{b.body}</p>
              </Reveal>
            ))}
          </ol>
          <div className="mt-14">
            <ButtonLink href={cta.studio.href} variant="band-primary">
              {cta.studio.label}
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section aria-labelledby="studio-faq" className="mx-auto grid max-w-[1400px] gap-12 px-5 py-24 md:px-8 md:py-32 lg:grid-cols-12">
        <h2 id="studio-faq" className="display text-[clamp(2.6rem,5.4vw,5rem)] lg:col-span-4">
          Straight answers.
        </h2>
        <div className="lg:col-span-8">
          <FaqList items={studioFaqs} />
        </div>
      </section>

      <ClosingCta title="Make the work here." body="Tell us about your shoot. Let's plan what comes next." action={cta.studio} />
    </>
  );
}

function FormatTile({
  image,
  title,
  body,
  className,
  compact,
}: {
  image: { src: import("next/image").StaticImageData; alt: string };
  title: string;
  body: string;
  className?: string;
  compact?: boolean;
}) {
  return (
    <Reveal className={`group relative min-h-[300px] overflow-hidden bg-band ${className ?? ""}`}>
      <Image
        src={image.src}
        alt={image.alt}
        fill
        placeholder="blur"
        sizes="(min-width: 768px) 50vw, 100vw"
        className="object-cover transition-transform duration-[1.2s] ease-out-expo group-hover:scale-105"
      />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6 pt-20 text-white">
        <h3 className={`display ${compact ? "text-2xl" : "text-3xl md:text-4xl"}`}>{title}</h3>
        <p className="mt-1 text-sm text-white/80">{body}</p>
      </div>
    </Reveal>
  );
}
