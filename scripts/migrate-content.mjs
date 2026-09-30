// One-off: uploads the bundled portfolio (images, clients, projects) into Sanity.
// Run with: node --env-file=.env.local scripts/migrate-content.mjs
// Safe to re-run: documents use fixed ids and Sanity de-duplicates identical uploads.
import { createReadStream } from "node:fs";
import { basename } from "node:path";

import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2026-09-30",
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

const work = (n) => `src/assets/work/${n}.png`;
const logo = (n) => `src/assets/clients/${n}.png`;

const clients = [
  { id: "sushique", name: "Sushique", file: logo("portfolio-5-12") },
  { id: "beit-el-helo", name: "Beit El Helo", file: logo("portfolio-5-11") },
  { id: "cadmus", name: "Cadmus Resto Café", file: logo("portfolio-5-16") },
  { id: "malak-al-habach", name: "Malak Al Habach", file: logo("portfolio-5-17") },
  { id: "saifi-jewelry", name: "Saifi Jewelry", file: logo("portfolio-5-21") },
];

const shots = (name, prefix, first) =>
  [0, 1, 2, 3].map((i) => ({ file: work(`${prefix}-${first + i}`), alt: `${name}, photograph ${i + 1}` }));

const projects = [
  {
    slug: "sushique",
    clientName: "Sushique",
    clientRef: "sushique",
    tagline: "A feast for the eyes.",
    service: "Food photography",
    summary:
      "Rich textures, dramatic light and food at the centre of the frame. A selection of restaurant photography from our portfolio.",
    cover: { file: work("work-11-2"), alt: "Sushique sushi rolls under dramatic light" },
    gallery: shots("Sushique platter", "work-11", 1),
  },
  {
    slug: "jay-jewels",
    clientName: "Jay Jewels",
    tagline: "Small details. Lasting impressions.",
    service: "Jewellery photography",
    summary:
      "A closer look at the details. Product and lifestyle photography that brings the jewellery into focus.",
    cover: { file: work("work-14-2"), alt: "Jay Jewels jewellery close-up" },
    gallery: shots("Jay Jewels", "work-14", 1),
  },
  {
    slug: "beit-el-helo",
    clientName: "Beit El Helo",
    clientRef: "beit-el-helo",
    tagline: "Craft you can almost taste.",
    service: "Product photography",
    summary:
      "From delicate pastries to carefully wrapped products, imagery celebrating the texture and craft of the collection.",
    cover: { file: work("work-11-6"), alt: "Beit El Helo pistachio pastries on a dark plate" },
    gallery: shots("Beit El Helo", "work-11", 5),
  },
  {
    slug: "lazurd",
    clientName: "Lazurd",
    tagline: "Everyday, elevated.",
    service: "Lifestyle photography",
    summary:
      "Jewellery photographed in a lifestyle setting, balancing the character of each piece with an elegant visual mood.",
    cover: { file: work("work-14-8"), alt: "Lazurd jewellery in a lifestyle setting" },
    gallery: shots("Lazurd", "work-14", 5),
  },
];

const uploads = new Map();
async function asset(file) {
  if (!uploads.has(file)) {
    uploads.set(file, client.assets.upload("image", createReadStream(file), { filename: basename(file) }));
  }
  return (await uploads.get(file))._id;
}
const imageValue = async ({ file, alt }) => ({
  _type: "image",
  asset: { _type: "reference", _ref: await asset(file) },
  ...(alt ? { alt } : {}),
});

for (const [order, c] of clients.entries()) {
  await client.createOrReplace({
    _id: `client-${c.id}`,
    _type: "client",
    name: c.name,
    logo: await imageValue({ file: c.file }),
    showInMarquee: true,
    order,
  });
  console.log("client", c.name);
}

for (const [order, p] of projects.entries()) {
  const gallery = [];
  for (const [i, g] of p.gallery.entries()) gallery.push({ _key: `img${i}`, ...(await imageValue(g)) });
  await client.createOrReplace({
    _id: `project-${p.slug}`,
    _type: "project",
    clientName: p.clientName,
    slug: { _type: "slug", current: p.slug },
    tagline: p.tagline,
    service: p.service,
    discipline: "production",
    summary: p.summary,
    cover: await imageValue(p.cover),
    gallery,
    ...(p.clientRef ? { client: { _type: "reference", _ref: `client-${p.clientRef}` } } : {}),
    order,
  });
  console.log("project", p.slug);
}
console.log("Done.");
