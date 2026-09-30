import "server-only";

import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "./env";

const token = process.env.SANITY_API_WRITE_TOKEN;

/** Server-only client that can write. Null when no token is configured. */
export const sanityWriteClient = token
  ? createClient({ projectId, dataset, apiVersion, token, useCdn: false })
  : null;
