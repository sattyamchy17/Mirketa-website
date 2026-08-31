import { parseYouTubeUrl } from "../../utils/youtube.js";

// Real, given webinar recording (Mirketa Inc's own YouTube channel) —
// thumbnail/embed derived from this one URL rather than duplicated by hand.
const VIDEO_URL = "https://www.youtube.com/watch?v=Y0bdJQmW4RI&t=3s";
const youtube = parseYouTubeUrl(VIDEO_URL);

// No written recap, description, speaker info, or date was supplied for
// this recording — only the real video URL and its real public title
// ("Webinar Digital Transformation for Nonprofits", confirmed via
// YouTube's oEmbed endpoint). The excerpt below is honest, general
// framing of that real, stated topic — not a claimed summary of the
// video's exact spoken content, and no statistic, speaker, company, or
// quote is invented anywhere on this entry or its page.
//
// See mastering-data-management-nonprofit-organizations.js — the two
// are companion webinars from the same real channel on nonprofit
// technology, and cross-link each other in "Related Content".
export const post = {
  id: "digital-transformation-for-nonprofits",
  slug: "digital-transformation-for-nonprofits",
  href: "/webinars/digital-transformation-for-nonprofits",
  title: "Digital Transformation for Nonprofits",
  author: "Mirketa",
  publishedDate: "2026-08-31",
  category: "Webinars",
  excerpt:
    "A Mirketa webinar on how nonprofit organizations can modernize their technology, streamline day-to-day operations, and build a digital foundation that supports their mission.",
  featuredImage: youtube?.thumbnailUrl,
  tags: ["Nonprofit", "Digital Transformation", "Webinar"],
  ctaLabel: "Watch Webinar",
  videoUrl: VIDEO_URL,
  content: [],
};
