// ============================================================
// CENTRALIZED BLOG CATEGORY CONFIGURATION
//
// Single source of truth for the real categories this site organizes
// insight content into: Customer Success, Blogs, Webinars, E-books,
// Whitepaper, Press Release.
//
// To add a category: add one entry here, then tag posts in
// src/blog/posts/*.js with that exact `category` string. Nothing
// else needs to change — Home, Insights, and /blog all read from
// this list and from src/blog/blogUtils.js. A category with no
// posts yet renders its existing empty state ("No <Category>
// available yet.") rather than an error, so it's safe to add ahead
// of any real content.
// ============================================================

export const BLOG_CATEGORIES = [
  { name: "Customer Success", slug: "customer-success" },
  { name: "Blogs", slug: "blogs" },
  { name: "Webinars", slug: "webinars" },
  { name: "E-books", slug: "e-books" },
  { name: "Whitepaper", slug: "whitepaper" },
  { name: "Press Release", slug: "press-release" },
];

export function getCategoryBySlug(slug) {
  return BLOG_CATEGORIES.find((c) => c.slug === slug) || null;
}
