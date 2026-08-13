import { blogPosts } from "./blogData.js";

// ============================================================
// LOCAL BLOG DATA LAYER — the single source of truth every page
// (Home, Insights, /blog, /blog/:slug) reads through.
//
// All "latest" logic sorts by `publishedDate` — never by array
// order in blogData.js — so adding a new post with a newer date
// automatically becomes the latest for its category everywhere,
// with no changes needed to Home.jsx / Insights.jsx / blogData.js.
// ============================================================

/** Strips any accidental leading/trailing "/" so links always resolve to a clean /blog/:slug. */
export function cleanSlug(slug) {
  return String(slug || "").replace(/^\/+|\/+$/g, "");
}

function toTimestamp(post) {
  const t = new Date(post.publishedDate).getTime();
  return Number.isFinite(t) ? t : 0;
}

/** Every post, newest `publishedDate` first. The base every other function builds on. */
export function getAllPosts() {
  return [...blogPosts].sort((a, b) => toTimestamp(b) - toTimestamp(a));
}

/** A single post by slug, or null if no post has that slug. Tolerates a leading/trailing "/". */
export function getPostBySlug(slug) {
  const clean = cleanSlug(slug);
  return blogPosts.find((post) => post.slug === clean) || null;
}

/** All posts in one topic category (see blogCategories.js), newest first. */
export function getPostsByCategory(category) {
  return getAllPosts().filter((post) => post.category === category);
}

/** The single most recently published post in a category, or null if that category has no posts yet. */
export function getLatestPostByCategory(category) {
  return getPostsByCategory(category)[0] || null;
}

/** The N most recently published posts across every category. */
export function getLatestPosts(limit = 4) {
  const safeLimit = Number.isFinite(limit) && limit > 0 ? Math.floor(limit) : 4;
  return getAllPosts().slice(0, safeLimit);
}

/**
 * Related posts for a blog detail page's "Related Articles" rail.
 * Prefers other posts in the same category (newest first); if that
 * category doesn't have enough, pads with the newest posts from any
 * other category so the rail is never left half-empty.
 */
export function getRelatedPosts(post, limit = 3) {
  if (!post) return [];
  const all = getAllPosts().filter((p) => p.slug !== post.slug);
  const sameCategory = all.filter((p) => p.category === post.category);
  if (sameCategory.length >= limit) return sameCategory.slice(0, limit);
  const others = all.filter((p) => p.category !== post.category);
  return [...sameCategory, ...others].slice(0, limit);
}
