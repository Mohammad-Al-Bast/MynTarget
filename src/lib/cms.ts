import "server-only";

import { clients as fallbackClients, projects as fallbackProjects } from "@/lib/content";
import type { Img, Project } from "@/lib/content";
import { sanityClient } from "@/sanity/client";

/** Projection for an image field: URL, alt text and a blur placeholder. */
const IMAGE = `"src": asset->url, "alt": coalesce(alt, ""), "blurDataURL": asset->metadata.lqip`;

const PROJECT_FIELDS = `
  "slug": slug.current,
  "client": clientName,
  tagline,
  service,
  discipline,
  summary,
  "cover": cover{ ${IMAGE} },
  "gallery": coalesce(gallery[]{ ${IMAGE} }, [])
`;

const PROJECTS_QUERY = `*[_type == "project" && defined(slug.current) && defined(cover.asset)] | order(order asc, clientName asc){${PROJECT_FIELDS}}`;

const CLIENTS_QUERY = `*[_type == "client" && showInMarquee != false && defined(logo.asset)] | order(order asc, name asc){
  "src": logo.asset->url,
  "alt": name
}`;

/** Content changes reach the site through the `sanity` tag (see the revalidate webhook). */
const options = { next: { revalidate: 3600, tags: ["sanity"] } };

async function query<T>(groq: string): Promise<T[]> {
  try {
    return await sanityClient.fetch<T[]>(groq, {}, options);
  } catch (err) {
    console.error("Sanity query failed", err);
    return [];
  }
}

// Until the CMS holds content (or if it can't be reached) the bundled content is used,
// so the site never renders an empty portfolio.
export async function getProjects(): Promise<Project[]> {
  const projects = await query<Project>(PROJECTS_QUERY);
  return projects.length ? projects : fallbackProjects;
}

export async function getProject(slug: string): Promise<Project | undefined> {
  return (await getProjects()).find((p) => p.slug === slug);
}

export async function getClients(): Promise<Img[]> {
  const clients = await query<Img>(CLIENTS_QUERY);
  return clients.length ? clients : fallbackClients;
}
