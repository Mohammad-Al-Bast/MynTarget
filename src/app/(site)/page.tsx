import { ButtonLink } from "@/components/button";
import { ClientMarquee } from "@/components/client-marquee";
import { ClosingCta } from "@/components/closing-cta";
import { Connected } from "@/components/home/connected";
import { HomeHero } from "@/components/home/hero";
import { ServicesIndex } from "@/components/home/services-index";
import { StudioBand } from "@/components/home/studio-band";
import { ProcessPath } from "@/components/process-path";
import { ProjectGrid } from "@/components/project-grid";
import { WhyTabs } from "@/components/why-tabs";
import { getClients } from "@/lib/cms";
import { cta, site } from "@/lib/content";

export default async function Home() {
  const logos = await getClients();
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    description: "Creative marketing and media agency: strategy, branding, content production, advertising and digital.",
    email: site.email,
    telephone: site.phone,
    areaServed: site.regions,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd).replace(/</g, "\\u003c") }}
      />
      <HomeHero />
      <ClientMarquee />
      <ServicesIndex logos={logos} />

      <section aria-labelledby="work-title" className="mx-auto max-w-[1400px] px-5 py-24 md:px-8 md:py-36">
        <div className="mb-16 flex flex-col justify-between gap-8 md:mb-24 md:flex-row md:items-end">
          <h2 id="work-title" className="display max-w-[12ch] text-[clamp(2.6rem,6vw,5.5rem)]">
            Real brands. Thoughtful craft.
          </h2>
          <ButtonLink href={cta.work.href} variant="outline">
            {cta.work.label}
          </ButtonLink>
        </div>
        <ProjectGrid />
      </section>

      <Connected />
      <StudioBand />
      <ProcessPath />
      <WhyTabs />
      <ClosingCta />
    </>
  );
}
