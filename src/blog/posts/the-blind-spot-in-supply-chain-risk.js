import featuredImage from "../../assets/images/vendor-governance/hero-dashboard.png";
import downloadUrl from "../../assets/download(pdf)/BeyondTier1-TheBlindSpotinSupplyChainRisk_WHITEPAPER.pdf";

// The first "Whitepaper" post — title and description are exactly as
// given; no findings/stats/claims from inside the PDF are asserted on
// this page, since only the title and description were supplied (not
// the document's contents). The featured image reuses the real
// supplier-compliance dashboard mockup already built for the Vendor
// Governance/Risk/Compliance Engine page — a genuine, on-topic asset,
// not a new stock photo.
//
// `href` gives this post its own /whitepapers/:slug URL instead of
// /blog/:slug — same mechanism as the webinar pages and
// "salesforce-testing"/"model-context-protocol-salesforce-erp" — see
// BlogDetail.jsx's `post.href` redirect and App.jsx's route below.
// `downloadUrl`/`downloadLabel` drive the "Download Whitepaper" CTA in
// BlogDetail.jsx's hero and below the article body; both are optional
// fields any future post can set to get the same download CTA.
export const post = {
  id: "the-blind-spot-in-supply-chain-risk",
  title: "The Blind Spot in Supply Chain Risk",
  slug: "the-blind-spot-in-supply-chain-risk",
  href: "/whitepapers/the-blind-spot-in-supply-chain-risk",
  author: "Mirketa",
  publishedDate: "2026-09-01",
  category: "Whitepaper",
  excerpt: "Why most supplier compliance and risk programs stop seeing risk exactly where it becomes most dangerous, and what it takes to see further.",
  featuredImage,
  featuredImageAlt: "A supplier compliance dashboard showing a compliance score, onboarding progress, a document checklist, and an AI-set human oversight level",
  seoTitle: "The Blind Spot in Supply Chain Risk | Mirketa Whitepaper",
  seoDescription:
    "Why most supplier compliance and risk programs stop seeing risk exactly where it becomes most dangerous, and what it takes to see further. Download the whitepaper.",
  readingTime: "5 min read",
  downloadUrl,
  downloadLabel: "Download Whitepaper",
  content: [
    { type: "heading2", text: "Overview" },
    {
      type: "paragraph",
      text: "Why most supplier compliance and risk programs stop seeing risk exactly where it becomes most dangerous, and what it takes to see further.",
    },
    { type: "callout", text: "Download the full whitepaper below for the complete analysis." },
  ],
};
