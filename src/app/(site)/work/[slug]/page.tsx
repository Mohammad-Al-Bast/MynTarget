import { ArrowUpRight } from "@phosphor-icons/react/ssr";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ClosingCta } from "@/components/closing-cta";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/cn";
import { getProject, getProjects } from "@/lib/cms";
import { services } from "@/lib/content";
import { blurProps, imageUrl } from "@/lib/img";

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const project = await getProject(slug);
  if (!project) return {};
  return {
    title: `${project.client}: ${project.service}`,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: { images: [{ url: imageUrl(project.cover), alt: project.cover.alt }] },
  };
}

export default async function ProjectPage(props: PageProps<"/work/[slug]">) {
  const { slug } = await props.params;
  const projects = await getProjects();
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();
  const project = projects[index];
  const next = projects[(index + 1) % projects.length];

  return (
    <>
      <section className="mx-auto grid max-w-[1400px] items-end gap-12 px-5 pb-20 pt-14 md:px-8 md:pt-20 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Link href="/work" className="rise inline-flex items-center gap-2 text-sm text-muted hover:text-ink">
            <span aria-hidden="true">←</span> All work
          </Link>
          <h1 className="rise display mt-8 text-[clamp(3.4rem,9vw,8.5rem)]" style={{ "--i": 1 } as React.CSSProperties}>
            {project.client}
          </h1>
          <p className="rise display mt-4 text-[clamp(1.6rem,3vw,2.6rem)] text-accent-text" style={{ "--i": 2 } as React.CSSProperties}>
            {project.tagline}
          </p>
          <p className="rise mt-8 max-w-[46ch] text-lg leading-relaxed text-muted" style={{ "--i": 3 } as React.CSSProperties}>
            {project.summary}
          </p>
          <dl className="rise mt-10 grid max-w-xl grid-cols-3 gap-6 border-t border-line pt-6 text-sm" style={{ "--i": 4 } as React.CSSProperties}>
            <div>
              <dt className="text-muted">Client</dt>
              <dd className="mt-1 font-medium">{project.client}</dd>
            </div>
            <div>
              <dt className="text-muted">Service</dt>
              <dd className="mt-1 font-medium">{project.service}</dd>
            </div>
            <div>
              <dt className="text-muted">Discipline</dt>
              <dd className="mt-1 font-medium">{services.find((s) => s.id === project.discipline)?.name}</dd>
            </div>
          </dl>
        </div>
        <div className="relative aspect-[4/5] overflow-hidden bg-paper-2 lg:col-span-5">
          <Image src={project.cover.src} alt={project.cover.alt} fill priority {...blurProps(project.cover)} sizes="(min-width: 1024px) 520px, 100vw" className="object-cover" />
        </div>
      </section>

      <section aria-label="Gallery" className="mx-auto max-w-[1400px] px-5 pb-24 md:px-8 md:pb-36">
        <ul className="grid gap-4 md:grid-cols-2 md:gap-6">
          {project.gallery.filter((img) => img.src !== project.cover.src).map((img, i) => (
            <Reveal as="li" key={`${img.alt}-${i}`} delay={(i % 2) * 0.1} className={cn(i % 2 === 1 && "md:mt-24")}>
              <div className="relative aspect-[4/5] overflow-hidden bg-paper-2">
                <Image src={img.src} alt={img.alt} fill {...blurProps(img)} sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
              </div>
            </Reveal>
          ))}
        </ul>
      </section>

      <section aria-label="Next project" className="border-t border-line">
        <Link href={`/work/${next.slug}`} className="group mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-5 py-16 md:px-8 md:py-24">
          <span>
            <span className="block text-muted">Next project</span>
            <span className="display mt-3 block text-[clamp(2.8rem,8vw,7rem)] transition-colors group-hover:text-accent-text">
              {next.client}
            </span>
          </span>
          <span className="diamond grid size-20 shrink-0 place-items-center bg-accent text-accent-ink transition-transform duration-500 ease-out-expo group-hover:rotate-90 md:size-28">
            <ArrowUpRight aria-hidden="true" weight="bold" className="size-7 transition-transform duration-500 group-hover:-rotate-90" />
          </span>
        </Link>
      </section>

      <ClosingCta />
    </>
  );
}
