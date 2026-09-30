import type { MetadataRoute } from "next";

import { getProjects } from "@/lib/cms";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getProjects();
  const pages = ["", "/services", "/studio", "/work", "/about", "/contact", "/privacy"];
  return [
    ...pages.map((p) => ({ url: `${base}${p}`, changeFrequency: "monthly" as const, priority: p === "" ? 1 : 0.7 })),
    ...projects.map((p) => ({ url: `${base}/work/${p.slug}`, changeFrequency: "yearly" as const, priority: 0.6 })),
  ];
}
