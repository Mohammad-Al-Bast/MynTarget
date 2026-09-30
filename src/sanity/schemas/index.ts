import type { SchemaTypeDefinition } from "sanity";

import { client } from "./client";
import { enquiry } from "./enquiry";
import { project } from "./project";

export const schemaTypes: SchemaTypeDefinition[] = [project, client, enquiry];
