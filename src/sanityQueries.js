import { sanityClient } from "./sanityClient.js";

// ============================================================
// Sanity GROQ data layer for the Blog feature.
// Every field list below is intentionally minimal — only what the
// listing/detail pages actually render — to keep queries cheap.
// ============================================================

// "contentType" is coalesced to "Blog" here (not just in schema initialValue)
// so posts created before this field existed are treated as Blog everywhere
// that reads this field, with zero migration needed on old documents.
const LISTING_FIELDS = `
  _id,
  title,
  slug,
  publishedAt,
  mainImage,
  "contentType": coalesce(contentType, "Blog"),
  externalUrl,
  downloadUrl,
  eventDate,
  author->{name, image},
  categories[]->{title, slug},
  "excerpt": coalesce(excerpt, pt::text(body[0..1]))
`;

const DETAIL_FIELDS = `
  _id,
  title,
  slug,
  publishedAt,
  mainImage,
  author->{name, image},
  categories[]->{title, slug},
  body,
  seo
`;

/** Trims a GROQ-extracted plain-text excerpt down to a card-friendly length. */
function truncateExcerpt(text, maxLength = 160) {
  if (!text) return "";
  const trimmed = text.trim();
  if (trimmed.length <= maxLength) return trimmed;
  return `${trimmed.slice(0, maxLength).trimEnd()}…`;
}

/** All published posts, most recent first, for the /blog listing page. */
export async function getAllPosts() {
  const posts = await sanityClient.fetch(
    `*[_type == "post" && defined(slug.current) && defined(publishedAt)] | order(publishedAt desc){${LISTING_FIELDS}}`
  );
  return posts.map((post) => ({ ...post, excerpt: truncateExcerpt(post.excerpt) }));
}

/**
 * The N most recently published posts — the single reusable source for every
 * "latest posts" teaser on the site (homepage "Latest Insights" included).
 * Ordered the same way as `getAllPosts` (publishedAt desc) so the newest
 * published post is always first everywhere it appears.
 */
export async function getLatestPosts(limit = 4) {
  const safeLimit = Number.isFinite(limit) && limit > 0 ? Math.floor(limit) : 4;
  const posts = await sanityClient.fetch(
    `*[_type == "post" && defined(slug.current) && defined(publishedAt)] | order(publishedAt desc)[0...${safeLimit}]{${LISTING_FIELDS}}`
  );
  return posts.map((post) => ({ ...post, excerpt: truncateExcerpt(post.excerpt) }));
}

/**
 * A single post by slug for /blog/:slug. Tolerates slugs that were
 * accidentally stored with a leading/trailing "/" in Sanity (e.g. "/test/")
 * in addition to the normal clean form, so either shape resolves correctly.
 */
export async function getPostBySlug(slug) {
  const clean = String(slug || "").replace(/^\/+|\/+$/g, "");
  return sanityClient.fetch(
    `*[_type == "post" && (slug.current == $clean || slug.current == $withSlashes)][0]{${DETAIL_FIELDS}}`,
    { clean, withSlashes: `/${clean}/` }
  );
}

/** Posts belonging to a given category, by category title (the category schema has no slug field). */
export async function getPostsByCategory(categoryTitle) {
  const posts = await sanityClient.fetch(
    `*[_type == "post" && defined(slug.current) && defined(publishedAt) && $categoryTitle in categories[]->title] | order(publishedAt desc){${LISTING_FIELDS}}`,
    { categoryTitle }
  );
  return posts.map((post) => ({ ...post, excerpt: truncateExcerpt(post.excerpt) }));
}

/** Every distinct category title currently used by at least one post, for listing-page filter chips. */
export async function getUsedCategories() {
  return sanityClient.fetch(
    `array::unique(*[_type == "post" && defined(slug.current)].categories[]->title)`
  );
}

/** Strips any accidental leading/trailing slashes so links always point to a clean /blog/:slug. */
export function cleanSlug(slug) {
  return String(slug || "").replace(/^\/+|\/+$/g, "");
}

const SIDEBAR_FIELDS = `_id, title, slug, mainImage`;

/**
 * Shared implementation behind getLatestBlogs/getLatestCaseStudies/getLatestPressReleases.
 * Differentiates content purely via the existing `category` reference's `title` —
 * there is no separate "case study" or "press release" document type in the
 * schema, so this relies on posts being tagged with a category of that exact
 * name in Sanity Studio. If no such category/posts exist yet, this simply
 * returns an empty array (callers must hide the section, never fake content).
 */
async function getLatestByCategory(categoryTitle, limit = 2, excludeSlug = null) {
  const safeLimit = Number.isFinite(limit) && limit > 0 ? Math.floor(limit) : 2;
  const cleanExclude = excludeSlug ? cleanSlug(excludeSlug) : "";
  return sanityClient.fetch(
    `*[
      _type == "post" &&
      defined(slug.current) &&
      defined(publishedAt) &&
      $categoryTitle in categories[]->title &&
      slug.current != $cleanExclude &&
      slug.current != $slashedExclude
    ] | order(publishedAt desc)[0...${safeLimit}]{${SIDEBAR_FIELDS}}`,
    { categoryTitle, cleanExclude, slashedExclude: cleanExclude ? `/${cleanExclude}/` : "" }
  );
}

/** Latest 2 posts categorized "Blog", excluding the article currently being viewed. */
export function getLatestBlogs(limit = 2, excludeSlug = null) {
  return getLatestByCategory("Blog", limit, excludeSlug);
}

/** Latest 2 posts categorized "Case Study" — empty today; no such category exists yet in Sanity. */
export function getLatestCaseStudies(limit = 2, excludeSlug = null) {
  return getLatestByCategory("Case Study", limit, excludeSlug);
}

/** Latest 2 posts categorized "Press Release" — empty today; no such category exists yet in Sanity. */
export function getLatestPressReleases(limit = 2, excludeSlug = null) {
  return getLatestByCategory("Press Release", limit, excludeSlug);
}

// ============================================================
// INSIGHTS HUB — content-type-driven queries (src/pages/Insights).
// Differentiates via the post's `contentType` field (a fixed-option
// Studio dropdown: Blog / Case Study / PR / Webinar / E-book), NOT the
// freeform `categories` reference array the functions above use — the
// two are intentionally separate mechanisms serving different pages.
// Every query here excludes `body` (listing views never need it) and
// coalesces contentType to "Blog" via LISTING_FIELDS, so pre-existing
// posts with no contentType set behave as Blog automatically.
// ============================================================

/** Every published insight (any content type), newest first. */
export async function getAllInsights() {
  const posts = await sanityClient.fetch(
    `*[_type == "post" && defined(slug.current) && defined(publishedAt)] | order(publishedAt desc){${LISTING_FIELDS}}`
  );
  return posts.map((post) => ({ ...post, excerpt: truncateExcerpt(post.excerpt) }));
}

/** Every published insight of one exact contentType ("Blog"|"Case Study"|"PR"|"Webinar"|"E-book"), newest first. */
export async function getInsightsByType(type) {
  const posts = await sanityClient.fetch(
    `*[_type == "post" && defined(slug.current) && defined(publishedAt) && coalesce(contentType, "Blog") == $type] | order(publishedAt desc){${LISTING_FIELDS}}`,
    { type }
  );
  return posts.map((post) => ({ ...post, excerpt: truncateExcerpt(post.excerpt) }));
}

/** Latest N insights across all content types. */
export async function getLatestInsights(limit = 4) {
  const safeLimit = Number.isFinite(limit) && limit > 0 ? Math.floor(limit) : 4;
  const posts = await sanityClient.fetch(
    `*[_type == "post" && defined(slug.current) && defined(publishedAt)] | order(publishedAt desc)[0...${safeLimit}]{${LISTING_FIELDS}}`
  );
  return posts.map((post) => ({ ...post, excerpt: truncateExcerpt(post.excerpt) }));
}

/** Latest N insights of one exact contentType. */
export async function getLatestInsightsByType(type, limit = 4) {
  const safeLimit = Number.isFinite(limit) && limit > 0 ? Math.floor(limit) : 4;
  const posts = await sanityClient.fetch(
    `*[_type == "post" && defined(slug.current) && defined(publishedAt) && coalesce(contentType, "Blog") == $type] | order(publishedAt desc)[0...${safeLimit}]{${LISTING_FIELDS}}`,
    { type }
  );
  return posts.map((post) => ({ ...post, excerpt: truncateExcerpt(post.excerpt) }));
}
