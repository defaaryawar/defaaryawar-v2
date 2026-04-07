import { createClient } from "@sanity/client";
import imageUrlBuilder, { type SanityImageSource } from "@sanity/image-url";

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;
const dataset = import.meta.env.VITE_SANITY_DATASET || "production";
const apiVersion = import.meta.env.VITE_SANITY_API_VERSION || "2026-04-07";

/**
 * Returns true if Sanity environment variables are properly configured.
 */
export const isSanityConfigured = (): boolean => {
  return !!(projectId && projectId !== "your_project_id_here");
};

export const sanityClient = createClient({
  projectId: projectId || "placeholder",
  dataset,
  apiVersion,
  useCdn: true, // CDN for faster reads - real-time listener handles updates
});

const builder = imageUrlBuilder(sanityClient);

/**
 * Build an optimized image URL from a Sanity image reference.
 */
export const urlFor = (source: SanityImageSource) => builder.image(source);
