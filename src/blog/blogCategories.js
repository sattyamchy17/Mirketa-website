// ============================================================
// CENTRALIZED BLOG CATEGORY CONFIGURATION
//
// Single source of truth for the 4 real categories this site
// actually organizes insight content into today (confirmed against
// the existing Insights page / homepage structure — not invented):
//   Customer Success, Blogs, Webinars, E-books
//
// To add a category: add one entry here, then tag posts in
// src/blog/posts/*.js with that exact `category` string. Nothing
// else needs to change — Home, Insights, and /blog all read from
// this list and from src/blog/blogUtils.js.
// ============================================================

export const BLOG_CATEGORIES = [
  { name: "Customer Success", slug: "customer-success" },
  { name: "Blogs", slug: "blogs" },
  { name: "Webinars", slug: "webinars" },
  { name: "E-books", slug: "e-books" },
];

export function getCategoryBySlug(slug) {
  return BLOG_CATEGORIES.find((c) => c.slug === slug) || null;
}
