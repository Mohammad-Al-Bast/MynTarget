"use client";

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { apiVersion, dataset, projectId } from "./src/sanity/env";
import { schemaTypes } from "./src/sanity/schemas";

export default defineConfig({
  name: "default",
  title: "MYN Target",
  basePath: "/admin",
  projectId,
  dataset,
  schema: { types: schemaTypes },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.documentTypeListItem("project").title("Projects"),
            S.documentTypeListItem("client").title("Clients"),
            S.divider(),
            S.listItem()
              .title("Enquiries")
              .child(
                S.documentTypeList("enquiry")
                  .title("Enquiries")
                  .defaultOrdering([{ field: "receivedAt", direction: "desc" }]),
              ),
          ]),
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
  document: {
    // Enquiries only come from the contact form.
    newDocumentOptions: (prev) => prev.filter((item) => item.templateId !== "enquiry"),
    actions: (prev, { schemaType }) =>
      schemaType === "enquiry"
        ? prev.filter(({ action }) => action !== "duplicate" && action !== "unpublish")
        : prev,
  },
});
