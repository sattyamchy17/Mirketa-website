import { createClient } from "@sanity/client";

export const sanityClient = createClient({
  projectId: "ve5w3pcd",
  dataset: "production",
  apiVersion: "2026-08-11",
  useCdn: true,
});