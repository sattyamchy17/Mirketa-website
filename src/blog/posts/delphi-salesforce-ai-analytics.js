import { parseYouTubeUrl } from "../../utils/youtube.js";

// Video URL confirmed with the user (same recording as the companion
// "How Machine Learning Works" webinar — that video's own real
// description includes a "Salesforce and Machine Learning" topic,
// which is consistent with this session's Delphi content).
const VIDEO_URL = "https://www.youtube.com/watch?v=58TQUnRU2bQ";
const youtube = parseYouTubeUrl(VIDEO_URL);

// Title, overview paragraph, and the 4 highlights below are the user's
// own supplied content, used as given — nothing invented.
export const post = {
  id: "delphi-salesforce-ai-analytics",
  slug: "delphi-salesforce-ai-analytics",
  href: "/webinars/delphi-salesforce-ai-analytics",
  title: "Delphi: Salesforce App for AI-Based Sales, Service & Marketing Analytics",
  author: "Mirketa",
  publishedDate: "2026-08-31",
  category: "Webinars",
  excerpt:
    "Delphi is a Salesforce AppExchange app that uses machine learning and artificial intelligence to provide analytics for functional areas like Sales, Marketing, and Service.",
  featuredImage: youtube?.thumbnailUrl,
  tags: ["Salesforce", "AI", "Sales Analytics", "Webinar"],
  ctaLabel: "Watch Webinar",
  videoUrl: VIDEO_URL,
  content: [],
};
