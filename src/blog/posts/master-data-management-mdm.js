import { parseYouTubeUrl } from "../../utils/youtube.js";

// Real, given webinar recording (Mirketa Inc's own YouTube channel) —
// thumbnail/embed derived from this one URL rather than duplicated by hand.
const VIDEO_URL = "https://www.youtube.com/watch?v=IwZUTAnR-_M";
const youtube = parseYouTubeUrl(VIDEO_URL);

// Overview text is the user's own supplied content, used verbatim. The
// "What You'll Learn" topics on the page reproduce the video's own
// real, published YouTube description (a genuine 6-item topic list),
// not invented content — see MasterDataManagementMDM.jsx.
export const post = {
  id: "master-data-management-mdm",
  slug: "master-data-management-mdm",
  href: "/webinars/master-data-management-mdm",
  title: "Master Data Management (MDM) Webinar",
  author: "Mirketa",
  publishedDate: "2026-08-31",
  category: "Webinars",
  excerpt:
    "A Mirketa webinar on why data quality matters, and how Master Data Management helps organizations keep their data reliable and consistent.",
  featuredImage: youtube?.thumbnailUrl,
  tags: ["Master Data Management", "Data Quality", "Salesforce", "Webinar"],
  ctaLabel: "Watch Webinar",
  videoUrl: VIDEO_URL,
  content: [],
};
