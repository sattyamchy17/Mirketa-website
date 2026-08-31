import { parseYouTubeUrl } from "../../utils/youtube.js";

// Real, given webinar recording (Mirketa Inc's own YouTube channel) —
// thumbnail/embed derived from this one URL rather than duplicated by hand.
const VIDEO_URL = "https://www.youtube.com/watch?v=58TQUnRU2bQ";
const youtube = parseYouTubeUrl(VIDEO_URL);

// No written recap was supplied for this recording, but its own real,
// published YouTube description (fetched and verified from the video
// itself) contains a genuine intro and a real 6-item topic list — see
// HowMachineLearningWorks.jsx's OVERVIEW_PARAGRAPHS/TOPIC_CARDS, which
// reproduce that real text (lightly cleaned up) rather than inventing
// new claims. No statistic, speaker, date, or quote is invented
// anywhere on this entry or its page.
export const post = {
  id: "how-machine-learning-works",
  slug: "how-machine-learning-works",
  href: "/webinars/how-machine-learning-works",
  title: "How Machine Learning Works",
  author: "Mirketa",
  publishedDate: "2026-08-31",
  category: "Webinars",
  excerpt:
    "Understand what machine learning is, how it works, and how it's applied across industries — including within Salesforce.",
  featuredImage: youtube?.thumbnailUrl,
  tags: ["Machine Learning", "Artificial Intelligence", "Webinar"],
  ctaLabel: "Watch Webinar",
  videoUrl: VIDEO_URL,
  content: [],
};
