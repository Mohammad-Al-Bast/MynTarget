import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "./env";

/** Read-only, CDN-backed client for published content. Never give it a token. */
export const sanityClient = createClient({ projectId, dataset, apiVersion, useCdn: true });
