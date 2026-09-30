import { defineArrayMember, defineField, defineType } from "sanity";

/** Matches the service ids in `src/lib/content.ts`. */
export const disciplines = [
  { title: "Social media & marketing", value: "social" },
  { title: "Content & production", value: "production" },
  { title: "Branding & creative", value: "branding" },
  { title: "Advertising & performance", value: "performance" },
  { title: "Digital & technology", value: "digital" },
];

const altField = defineField({
  name: "alt",
  title: "Alt text",
  type: "string",
  description: "Describes the image for screen readers and search engines.",
  validation: (rule) => rule.required(),
});

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "clientName",
      title: "Client name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "The page address: /work/<slug>",
      options: { source: "clientName", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "service",
      title: "Service label",
      type: "string",
      description: 'Shown on the project card, e.g. "Food photography".',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "discipline",
      title: "Discipline",
      type: "string",
      options: { list: disciplines, layout: "radio" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "cover",
      title: "Cover image",
      type: "image",
      options: { hotspot: true },
      fields: [altField],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [altField],
        }),
      ],
      options: { layout: "grid" },
    }),
    defineField({
      name: "client",
      title: "Client",
      type: "reference",
      to: [{ type: "client" }],
      description: "Optional link to the client's entry.",
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      description: "Lower numbers appear first.",
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: "Display order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "clientName", subtitle: "service", media: "cover" },
  },
});
