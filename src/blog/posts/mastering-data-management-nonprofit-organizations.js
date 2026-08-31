import { parseYouTubeUrl } from "../../utils/youtube.js";

// Real, given webinar recording — thumbnail and embed IDs below are
// derived from this one URL rather than duplicated by hand.
const VIDEO_URL = "https://www.youtube.com/watch?v=UEZmMgVe4sk&t=1s";
const youtube = parseYouTubeUrl(VIDEO_URL);

// This entry is what makes the webinar show up automatically in every
// insight listing (Homepage Latest Insights, /insights, /blog, related
// content, discovery sidebars) — see blogUtils.js's getPostHref/getLatestPosts.
// `href` points at the webinar's own standalone page (hero, inline video,
// full agenda) instead of the generic /blog/:slug template; BlogDetail.jsx
// redirects /blog/:slug to `href` for any post that declares one.
export const post = {
  id: "mastering-data-management-nonprofit-organizations",
  slug: "mastering-data-management-nonprofit-organizations",
  href: "/webinars/mastering-data-management-nonprofit-organizations",
  title: "Mastering Data Management: Best Practices for Nonprofit Organizations",
  author: "Mirketa",
  publishedDate: "2026-08-31",
  category: "Webinars",
  excerpt:
    "Practical, on-demand guidance for nonprofits on managing donor information, volunteer data, program outcomes, and operational metrics — and turning that data into impact.",
  featuredImage: youtube?.thumbnailUrl,
  tags: ["Nonprofit", "Data Management", "Webinar"],
  ctaLabel: "Watch Webinar",
  videoUrl: VIDEO_URL,
  content: [],
};
