import { ButtonLink } from "@/components/button";
import { Mark } from "@/components/logo";
import { Reveal } from "@/components/reveal";
import { cta } from "@/lib/content";

export function ClosingCta({
  title = "Let's build something that moves.",
  body = "Bring the ambition. We'll bring the strategy and the craft.",
  action = cta.contact,
}: {
  title?: string;
  body?: string;
  action?: { href: string; label: string };
}) {
  return (
    <section aria-labelledby="cta-title" className="relative overflow-hidden bg-accent text-accent-ink">
      <Mark className="pointer-events-none absolute -right-[8%] top-1/2 w-[46%] max-w-[560px] -translate-y-1/2 opacity-[0.12] [&_.mark-body]:bg-accent-ink [&_.mark-dots]:bg-accent-ink" />
      <div className="relative mx-auto max-w-[1400px] px-5 py-24 md:px-8 md:py-36">
        <Reveal>
          <h2 id="cta-title" className="display max-w-[14ch] text-[clamp(3rem,8vw,7.5rem)]">
            {title}
          </h2>
          <p className="mt-6 max-w-[40ch] text-lg opacity-85 md:text-xl">{body}</p>
          <ButtonLink href={action.href} variant="on-accent" className="mt-10">
            {action.label}
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
