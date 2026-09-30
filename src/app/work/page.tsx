import type { Metadata } from "next";

import { ClosingCta } from "@/components/closing-cta";
import { FaqList } from "@/components/faq-list";
import { PageHero } from "@/components/page-hero";
import { ProjectGrid } from "@/components/project-grid";
import { workFaqs } from "@/lib/content";

export const metadata: Metadata = {
  title: "Selected work",
  description:
    "Food, jewellery, product and lifestyle photography from the MYN Target portfolio: Sushique, Jay Jewels, Beit El Helo and Lazurd.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <PageHero
        kicker="The portfolio"
        title="Work that cuts through the noise."
        intro="A selection of real projects from the MYN Target portfolio."
      />
      <section aria-label="Projects" className="mx-auto max-w-[1400px] px-5 pb-24 md:px-8 md:pb-36">
        <ProjectGrid />
      </section>
      <section aria-labelledby="work-faq" className="border-t border-line">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-5 py-24 md:px-8 md:py-32 lg:grid-cols-12">
          <h2 id="work-faq" className="display text-[clamp(2.6rem,5.4vw,5rem)] lg:col-span-4">
            Straight answers.
          </h2>
          <div className="lg:col-span-8">
            <FaqList items={workFaqs} />
          </div>
        </div>
      </section>
      <ClosingCta title="Your brand could be next." body="Let's put your story in the frame." />
    </>
  );
}
