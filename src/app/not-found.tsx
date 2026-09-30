import { ButtonLink } from "@/components/button";
import { Mark } from "@/components/logo";
import { cta } from "@/lib/content";

export default function NotFound() {
  return (
    <section className="mx-auto grid min-h-[70dvh] max-w-[1400px] items-center gap-12 px-5 py-20 md:px-8 lg:grid-cols-12">
      <div className="lg:col-span-7">
        <p className="font-mono text-sm text-accent-text">404</p>
        <h1 className="display mt-6 text-[clamp(3rem,8vw,7rem)]">Off target.</h1>
        <p className="mt-6 max-w-[40ch] text-lg text-muted">
          This page doesn&apos;t exist or has moved. Let&apos;s get you back to the work.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href="/">Back to home</ButtonLink>
          <ButtonLink href={cta.work.href} variant="outline">
            {cta.work.label}
          </ButtonLink>
        </div>
      </div>
      <Mark className="mx-auto w-48 rotate-45 opacity-80 lg:col-span-5 lg:w-72" />
    </section>
  );
}
