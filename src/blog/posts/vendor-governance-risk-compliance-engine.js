import heroBackground from "../../assets/blog/vendor-governance-risk-compliance-engine/hero-background.jpg";

// Real press release, sourced verbatim from the live reference page
// (title, dateline, quote, body copy, and hero image pulled directly
// from mirketa.com/press-releases/vendor-governance-risk-compliance-engine/
// — no content invented). No individual byline is given on the source
// (just the company), so `author` is "Mirketa", matching the source.
//
// `category: "Press Release"` is enough on its own to route this post
// to /press-releases/vendor-governance-risk-compliance-engine — see
// CATEGORY_ROUTE_PREFIXES in blogUtils.js. No `href` field, no new
// App.jsx route: this is the first real post to use that mechanism.
//
// The "Learn more here" link in the source points at
// mirketa.com/ai-velocity-engines/vendor-governance-risk-compliance-engine/
// — a page that already exists in this project
// (src/pages/VendorGovernanceRiskComplianceEngine/), so it's linked
// internally rather than to the live production URL.
export const post = {
  id: "vendor-governance-risk-compliance-engine",
  title: "Mirketa Introduces Vendor Governance, Risk and Compliance Engine (Vendor GRACE) - an AI copilot for vendor governance, risk & compliance.",
  slug: "vendor-governance-risk-compliance-engine",
  author: "Mirketa",
  publishedDate: "2026-09-01",
  category: "Press Release",
  excerpt:
    "Mirketa introduces Vendor GRACE, an AI-powered vendor governance, risk and compliance engine for automated supplier compliance and multi-tier risk management.",
  featuredImage: heroBackground,
  featuredImageAlt: "A woman presenting to an audience on a stage, with a glowing blue neural-network graphic labeled \"AI\" displayed on the screen behind her",
  seoTitle: "Mirketa Introduces Vendor Governance, Risk and Compliance Engine (Vendor GRACE)",
  seoDescription:
    "Mirketa introduces Vendor GRACE, an AI-powered vendor governance, risk and compliance engine for automated supplier compliance and multi-tier risk management.",
  primaryKeyword: "Vendor GRACE",
  secondaryKeywords: ["vendor governance risk compliance engine", "supplier risk management AI", "multi-tier supplier compliance", "Salesforce vendor compliance"],
  tags: ["Press Release", "AI", "Vendor Governance", "Supplier Compliance", "Salesforce"],
  readingTime: "4 min read",
  content: [
    {
      type: "paragraph",
      text: "DUBLIN, Calif. – August 2026 – Mirketa today introduced its Salesforce-native, AI-powered Vendor Governance, Risk and Compliance Engine, Vendor GRACE, giving procurement and compliance teams automated visibility into supplier risk across multiple tiers of the supply chain.",
    },
    {
      type: "paragraph",
      text: "Compliance failures that halt a production line rarely originate with a company's direct supplier. They typically trace back to a subcontractor two or three tiers down the chain, the segment of the supply chain most procurement teams have had no practical way to monitor. Mirketa built the platform to close that gap.",
    },
    {
      type: "callout",
      text: "“The real differentiator is the Multi-Tier Risk Propagation,” said Ajay Jalali, VP – Delivery & Operations at Mirketa. “While traditional tools stop at Tier 1, our platform maps sub-supplier hierarchy. If a deep-tier sub-supplier fails a critical regulation, the system automatically calculates the cascading impact so you can act before it becomes a bottleneck.”",
    },
    {
      type: "paragraph",
      text: "Vendor GRACE allows procurement team to invite suppliers to upload relevant compliance documentation followed by an AI driven compliance review and risk scoring of each submission ensuring manual effort for procurement team is drastically reduced. The product automates operational trust from end to end with five core capabilities.",
    },

    { type: "heading2", text: "Core Capabilities" },
    {
      type: "list",
      items: [
        "**Intelligent Document Ingestion** – GRACE classifies, extracts, and scores confidence on every certificate, license, and compliance document a supplier submits, with no manual data entry.",
        "**Compliance Gap Detection & Risk Scoring** – Missing or expired certifications are flagged automatically and scored against jurisdiction-specific requirements in real time.",
        "**Renewal Orchestration** – Expiry dates are tracked continuously, with proactive alerts sent well before a lapse becomes a liability.",
        "**Multi-Tier Supplier Compliance** – Tier 2 and Tier 3 sub-supplier relationships are mapped automatically, with risk signals propagating up the chain, a depth of visibility no competing platform currently offers.",
        "**GRACE Copilot** – Mirketa's AI copilot for vendor governance, risk & compliance helps procurement managers and analysts prioritize which risks need attention first and navigate compliance workflows without digging through dashboards.",
      ],
    },

    { type: "heading2", text: "What Changes for Procurement and Compliance Teams" },
    {
      type: "paragraph",
      text: "The platform is Salesforce-native by design, so compliance data flows straight into the CRM procurement teams already use, no spreadsheet exports, no manual re-entry. A self-service supplier portal takes the bulk of document collection off procurement's desk, and continuous monitoring from GRACE catches issues before an audit does. Early benchmarks show verification running more than 70% faster than manual review, onboarding three to five times quicker, and full visibility across all three supplier tiers.",
    },
    {
      type: "paragraph",
      text: "The platform is purpose-built for manufacturing, industrial, defense, healthcare, and aerospace, and chemical manufacturing supply chains, sectors already mapped in the product's compliance engine. [Learn more here](/ai-velocity-engines/vendor-governance-risk-compliance-engine).",
    },

    { type: "heading2", text: "About Mirketa" },
    {
      type: "paragraph",
      text: "Mirketa Inc. is an AI-first consulting company and Salesforce partner headquartered in San Ramon, California. The company specializes in digital transformation for nonprofit and social impact organizations, Salesforce implementation services, nonprofit cloud consulting, AI enablement, enterprise data integration, and intelligent automation solutions. Its architecture combines the data and integration layer, intelligence and prediction layer, and agent orchestration layer, forming the infrastructure required to deploy enterprise AI at scale.",
    },

    { type: "heading2", text: "Media Contact" },
    { type: "paragraph", text: "Mirketa Inc." },
    { type: "paragraph", text: "info@mirketa.com | mirketa.com | +1 855-647-5382" },
  ],
};
