import { Mark } from "@/components/logo";

/** Inner-page hero: big statement left, short intro under it, brand mark as a quiet anchor. */
export function PageHero({
  kicker,
  title,
  intro,
  children,
}: {
  kicker: string;
  title: React.ReactNode;
  intro: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative mx-auto max-w-[1400px] px-5 pb-16 pt-14 md:px-8 md:pb-24 md:pt-24">
      <p className="rise font-mono text-xs uppercase tracking-[0.2em] text-accent-text">{kicker}</p>
      <h1
        className="rise display mt-6 max-w-[14ch] pb-1 text-[clamp(3rem,8vw,7.5rem)]"
        style={{ "--i": 1 } as React.CSSProperties}
      >
        {title}
      </h1>
      <p
        className="rise mt-8 max-w-[44ch] text-lg leading-relaxed text-muted md:text-xl"
        style={{ "--i": 2 } as React.CSSProperties}
      >
        {intro}
      </p>
      {children && (
        <div className="rise mt-10" style={{ "--i": 3 } as React.CSSProperties}>
          {children}
        </div>
      )}
      <Mark className="pointer-events-none absolute right-8 top-24 hidden w-40 opacity-90 lg:block xl:w-52" />
    </section>
  );
}
