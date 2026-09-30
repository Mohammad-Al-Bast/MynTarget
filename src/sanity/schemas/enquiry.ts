import { defineField, defineType } from "sanity";

/** Written by the contact form. Only `status` is editable in the Studio. */
export const enquiry = defineType({
  name: "enquiry",
  title: "Enquiry",
  type: "document",
  fields: [
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "New", value: "new" },
          { title: "Contacted", value: "contacted" },
          { title: "Closed", value: "closed" },
        ],
        layout: "radio",
        direction: "horizontal",
      },
      initialValue: "new",
    }),
    defineField({ name: "name", title: "Name", type: "string", readOnly: true }),
    defineField({ name: "company", title: "Company", type: "string", readOnly: true }),
    defineField({ name: "email", title: "Email", type: "string", readOnly: true }),
    defineField({ name: "phone", title: "Phone", type: "string", readOnly: true }),
    defineField({ name: "region", title: "Region", type: "string", readOnly: true }),
    defineField({ name: "service", title: "Service", type: "string", readOnly: true }),
    defineField({ name: "message", title: "Message", type: "text", readOnly: true }),
    defineField({ name: "receivedAt", title: "Received", type: "datetime", readOnly: true }),
  ],
  orderings: [
    {
      title: "Newest first",
      name: "receivedDesc",
      by: [{ field: "receivedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: { name: "name", company: "company", service: "service", status: "status" },
    prepare: ({ name, company, service, status }) => ({
      title: [name, company].filter(Boolean).join(", "),
      subtitle: [status, service].filter(Boolean).join(" · "),
    }),
  },
});
