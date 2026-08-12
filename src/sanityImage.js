import { createImageUrlBuilder } from "@sanity/image-url";
import { sanityClient } from "./sanityClient.js";

const builder = createImageUrlBuilder(sanityClient);

// Never `import` a Sanity image file directly — pass the image reference
// object (e.g. post.mainImage) from a GROQ query result to this instead.
// Respects hotspot/crop info set in the Studio automatically.
export function urlFor(source) {
  return builder.image(source);
}
