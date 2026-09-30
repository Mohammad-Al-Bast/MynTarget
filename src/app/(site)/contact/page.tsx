import { EnvelopeSimple, Phone, WhatsappLogo } from "@phosphor-icons/react/ssr";
import type { Metadata } from "next";

import { ContactForm } from "./contact-form";
import { locations, site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a project with MYN Target. Tell us where you want to take your brand. Offices and partners across Lebanon, the UAE and Türkiye.",
  alternates: { canonical: "/contact" },
};

export default async function ContactPage(props: PageProps<"/contact">) {
  const { service } = await props.searchParams;
  const defaultService = typeof service === "string" ? service : undefined;

  return (
    <>
      <section className="mx-auto max-w-[1400px] px-5 pb-12 pt-14 md:px-8 md:pt-24">
        <h1 className="rise display max-w-[12ch] pb-1 text-[clamp(3rem,8vw,7.5rem)]">
          Have a project in mind?
        </h1>
        <p className="rise mt-8 max-w-[40ch] text-lg text-muted md:text-xl" style={{ "--i": 1 } as React.CSSProperties}>
          Tell us where you want to take your brand.
        </p>
      </section>

      <section aria-label="Enquiry" className="mx-auto grid max-w-[1400px] gap-14 px-5 pb-24 md:px-8 md:pb-32 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <ContactForm defaultService={defaultService} />
        </div>

        <aside className="lg:col-span-4 lg:col-start-9">
          <h2 className="display text-3xl">Prefer a conversation?</h2>
          <ul className="mt-6 space-y-3">
            <li>
              <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-accent-text">
                <WhatsappLogo aria-hidden="true" className="size-5 text-accent-text" /> Chat on WhatsApp
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="flex items-center gap-3 hover:text-accent-text">
                <EnvelopeSimple aria-hidden="true" className="size-5 text-accent-text" /> {site.email}
              </a>
            </li>
            <li>
              <a href={site.phoneHref} className="flex items-center gap-3 hover:text-accent-text">
                <Phone aria-hidden="true" className="size-5 text-accent-text" /> {site.phone}
              </a>
            </li>
          </ul>

          <h2 className="display mt-14 text-3xl">Four locations. One conversation.</h2>
          <ul className="mt-6 border-t border-line">
            {locations.map((l) => (
              <li key={l.city} className="flex items-baseline justify-between gap-4 border-b border-line py-4">
                <span>
                  <span className="block font-medium">{l.city}</span>
                  <span className="text-sm text-muted">{l.note}</span>
                </span>
                <span className="shrink-0 text-sm text-muted">{l.country}</span>
              </li>
            ))}
          </ul>
        </aside>
      </section>
    </>
  );
}
