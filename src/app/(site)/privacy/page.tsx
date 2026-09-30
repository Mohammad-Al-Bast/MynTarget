import type { Metadata } from "next";

import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How the MYN Target website handles your enquiry.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-[1400px] px-5 pb-28 pt-14 md:px-8 md:pt-24">
      <h1 className="rise display max-w-[12ch] text-[clamp(3rem,8vw,7rem)]">Privacy. Plain and simple.</h1>
      <div className="mt-16 grid max-w-3xl gap-12 text-lg leading-relaxed text-muted">
        <section>
          <h2 className="display text-3xl text-ink">Contacting MYN Target</h2>
          <p className="mt-4">
            When you send an enquiry through our contact form, we receive the details you enter (your
            name, company, email, phone, region, the service you&apos;re interested in and your message)
            and use them only to respond to your enquiry. Enquiries are stored in our content management
            system (Sanity), where only our team can read them, and may be forwarded to our email
            inbox. If you choose to send it as an email draft
            instead, the information is shared when you send that email.
          </p>
        </section>
        <section>
          <h2 className="display text-3xl text-ink">External services</h2>
          <p className="mt-4">
            WhatsApp links open WhatsApp, and email links open your email application. Those services
            handle your information under their own privacy policies. This website does not add
            advertising pixels or analytics cookies.
          </p>
        </section>
        <section>
          <h2 className="display text-3xl text-ink">Questions about your information</h2>
          <p className="mt-4">
            Contact{" "}
            <a href={`mailto:${site.email}`} className="text-accent-text underline underline-offset-4">
              {site.email}
            </a>
            .
          </p>
        </section>
      </div>
    </article>
  );
}
