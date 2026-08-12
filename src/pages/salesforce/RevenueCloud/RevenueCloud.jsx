import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Images } from "../../../assets/images/index.js";
import Seo from "../../../components/Seo/Seo.jsx";
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb.jsx";
import HeroVisual from "../../../components/HeroVisual/HeroVisual.jsx";
import ConsultationSection from "../../../components/ConsultationSection/ConsultationSection.jsx";
import "./RevenueCloud.css";

gsap.registerPlugin(ScrollTrigger);

// ============================================================
// ICONS
// ============================================================

const Ico = {
  document: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 3h9l3 3v15H6z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M9 10h6M9 14h6M9 18h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
  ),
  gauge: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 16a8 8 0 1116 0" stroke="currentColor" strokeWidth="1.5" /><path d="M12 16l4.5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /><circle cx="12" cy="16" r="1.3" fill="currentColor" /></svg>
  ),
  droplet: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3s7 7.5 7 12a7 7 0 01-14 0c0-4.5 7-12 7-12z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  clock: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" /><path d="M12 7v5l4 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  alertCircle: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.4" /><path d="M12 8v5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /><circle cx="12" cy="16.2" r="0.9" fill="currentColor" /></svg>
  ),
  plug: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 3v5M15 3v5M7 8h10v4a5 5 0 01-10 0V8z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="M12 17v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
  ),
  compass: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" /><path d="M15 9l-2 6-6 2 2-6 6-2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  rocket: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 2c3 2 5 6 5 10 0 3-1 6-5 10-4-4-5-7-5-10 0-4 2-8 5-10z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><circle cx="12" cy="10" r="1.6" fill="currentColor" /></svg>
  ),
  receipt: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 3h12v18l-3-2-3 2-3-2-3 2V3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M9 8h6M9 12h6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
  ),
  refresh: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 12a8 8 0 0113.7-5.7L20 8M20 4v4h-4M20 12a8 8 0 01-13.7 5.7L4 16M4 20v-4h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  tag: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3l8 8-8.5 8.5a1.5 1.5 0 01-2.1 0L3.5 13.6a1.5 1.5 0 010-2.1L12 3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><circle cx="9" cy="8" r="1.6" fill="currentColor" /></svg>
  ),
  layers: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3l9 5-9 5-9-5 9-5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M3 12l9 5 9-5M3 16l9 5 9-5" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /></svg>
  ),
  sparkle: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /></svg>
  ),
  code: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 6L4 12l5 6M15 6l5 6-5 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  headset: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 13a8 8 0 0116 0v4" stroke="currentColor" strokeWidth="1.5" /><rect x="3" y="13" width="4" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4" /><rect x="17" y="13" width="4" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4" /></svg>
  ),
  wrench: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M14.7 6.3a4 4 0 105 5l-3 3-2-2 3-3a4 4 0 01-3-3z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /><path d="M4 20l7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
  ),
  robot: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="5" y="9" width="14" height="10" rx="3" stroke="currentColor" strokeWidth="1.5" /><path d="M12 5v4M9 14h.01M15 14h.01" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /><circle cx="12" cy="4" r="1.4" fill="currentColor" /></svg>
  ),
  chartUp: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 19V13M10 19V8M16 19v-5M20 19V5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
  ),
  eye: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.4" /></svg>
  ),
  target: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.4" /><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.3" opacity="0.6" /><circle cx="12" cy="12" r="1.2" fill="currentColor" /></svg>
  ),
  award: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="8" r="5" stroke="currentColor" strokeWidth="1.4" /><path d="M8.5 12.5L7 21l5-2.5L17 21l-1.5-8.5" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  globe: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.4" /><path d="M3 12h18M12 3c2.5 2.5 3.5 6 3.5 9s-1 6.5-3.5 9c-2.5-2.5-3.5-6-3.5-9s1-6.5 3.5-9z" stroke="currentColor" strokeWidth="1.3" /></svg>
  ),
  bolt: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M13 2L4 14h7l-1 8 10-13h-7l0-7z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  handshake: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 12l4-4 4 4-4 4-4-4zM21 12l-4-4-4 4 4 4 4-4z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M11 12h2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
  ),
  check: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12.5l5 5L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  cross: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
  ),
};

// ============================================================
// DATA
// ============================================================

const BREADCRUMB = [
  { label: "Home", href: "/" },
  { label: "Platforms & Technology", href: "/platforms/salesforce/clouds" },
  { label: "Salesforce Clouds", href: "/platforms/salesforce/clouds" },
  { label: "Revenue Cloud" },
];

const HERO = {
  badge: "Salesforce Summit Partner • Revenue Cloud Experts",
  title: "Accelerate Revenue Growth with Salesforce Revenue Cloud",
  description:
    "Streamline your entire revenue lifecycle with Salesforce Revenue Cloud consulting, CPQ implementation, billing automation, subscription management, contract lifecycle management, and AI-powered revenue operations. Simplify quote-to-cash processes, improve sales efficiency, and increase revenue with an intelligent cloud platform.",
  primaryCta: { label: "Book Free Consultation", href: "#contact" },
  secondaryCta: { label: "Talk to Our Revenue Cloud Experts", href: "#contact" },
  metrics: ["500+ Salesforce Projects Delivered", "Certified Revenue Cloud Consultants", "Enterprise Quote-to-Cash Expertise", "Global Delivery Model"],
};

const HERO_DASHBOARD = {
  title: "Quote-to-Cash Console",
  stats: [
    { label: "Faster Quotes", value: "68%", caption: "CPQ-driven quote generation" },
    { label: "Fewer Billing Errors", value: "91%", caption: "Automated billing accuracy" },
    { label: "Pricing Accuracy", value: "99.4%", caption: "AI-guided pricing rules" },
  ],
  rows: [
    { title: "Quote #Q-3092 — Enterprise Bundle", meta: "CPQ • Pending approval", status: "In Review", tone: "attention" },
    { title: "Contract #C-8841 Renewal", meta: "Subscription • Auto-renew", status: "On Track", tone: "good" },
    { title: "Invoice Batch — August", meta: "Billing automation", status: "Processed", tone: "good" },
    { title: "AI Contract Risk Flag", meta: "Non-standard clause detected", status: "Reviewed", tone: "neutral" },
  ],
  floatingCards: [
    { icon: Ico.sparkle, title: "Einstein AI", subtitle: "Pricing recommendations live" },
    { icon: Ico.document, title: "Contract Intelligence", subtitle: "Key terms auto-extracted" },
  ],
};

const CHALLENGES = {
  eyebrow: "Revenue Challenges We Solve",
  heading: "The Revenue Problems Slowing Down Your Deal Cycle",
  intro: "Most revenue teams aren't short on pipeline — they're short on a platform that connects quoting, billing, and contracts. These are the problems we hear most before a Revenue Cloud engagement.",
  illo: Images.illoQuoteToCashPipeline,
  items: [
    { icon: Ico.document, title: "Manual Quote Creation", description: "Reps build quotes by hand in spreadsheets, introducing errors and delay." },
    { icon: Ico.layers, title: "Complex Pricing Models", description: "Bundles, tiers, and discounts are managed outside the CRM, inconsistently." },
    { icon: Ico.droplet, title: "Revenue Leakage", description: "Under-billing and missed renewals quietly erode margin every quarter." },
    { icon: Ico.clock, title: "Slow Contract Approvals", description: "Deals stall in email threads waiting on legal and finance sign-off." },
    { icon: Ico.alertCircle, title: "Billing Errors", description: "Manual invoicing produces mistakes that damage customer trust." },
    { icon: Ico.plug, title: "Disconnected Sales Processes", description: "CRM, CPQ, and billing run in separate systems with no shared data." },
  ],
};

const SERVICES = {
  eyebrow: "Our Salesforce Revenue Cloud Services",
  heading: "End-to-End Revenue Cloud Consulting & Implementation",
  intro: "From first strategy session to long-term managed support, our certified consultants handle every phase of your Revenue Cloud transformation.",
  illo: Images.illoCpqWorkflow,
  items: [
    { icon: Ico.compass, title: "Revenue Cloud Consulting", description: "Strategic assessment of your quote-to-cash process before configuration begins." },
    { icon: Ico.rocket, title: "Salesforce CPQ Implementation", description: "Full lifecycle CPQ deployment configured around your pricing and approval rules." },
    { icon: Ico.receipt, title: "Billing Automation", description: "Automated invoicing and revenue recognition that eliminates manual billing work." },
    { icon: Ico.refresh, title: "Subscription Management", description: "Renewals, upgrades, and usage-based billing handled without manual tracking." },
    { icon: Ico.document, title: "Contract Lifecycle Management", description: "Draft, review, approval, and e-signature workflows in one connected system." },
    { icon: Ico.tag, title: "Pricing & Discount Automation", description: "Guided pricing and approval guardrails that protect margin at every deal stage." },
    { icon: Ico.layers, title: "Revenue Recognition", description: "ASC 606-aligned recognition schedules generated automatically from contracts." },
    { icon: Ico.plug, title: "Revenue Cloud Integration", description: "Connect Revenue Cloud to ERP, finance, and e-signature systems." },
    { icon: Ico.sparkle, title: "AI-powered Revenue Optimization", description: "Einstein-driven pricing, discounting, and forecasting recommendations." },
    { icon: Ico.code, title: "Custom Revenue Cloud Development", description: "Apex, LWC, and custom APIs for requirements standard configuration can't reach." },
    { icon: Ico.headset, title: "Managed Revenue Cloud Services", description: "A dedicated team keeping your Revenue Cloud org healthy long-term." },
    { icon: Ico.wrench, title: "Support & Optimization", description: "Ongoing tuning of pricing rules, approval flows, and billing configuration." },
  ],
};

const CAPABILITIES = {
  eyebrow: "Revenue Cloud Capabilities",
  heading: "Every Revenue Cloud Capability, Configured to Perform",
  intro: "We configure each capability around your pricing, billing, and contract rules — not a generic template.",
  illo: Images.illoAiPricingRecommendations,
  items: [
    { title: "Configure, Price & Quote (CPQ)", description: "Guided selling and accurate quotes generated in minutes, not days.", illo: Images.illoCpqWorkflow },
    { title: "Subscription Management", description: "Recurring billing, renewals, and upgrades handled automatically.", illo: Images.illoSubscriptionManagement },
    { title: "Automated Billing", description: "Invoices generated and reconciled without manual intervention.", illo: Images.illoBillingAutomation },
    { title: "Revenue Recognition", description: "Recognition schedules generated automatically from contract terms." },
    { title: "Contract Management", description: "Every contract, amendment, and renewal in one connected system." },
    { title: "Pricing Engine", description: "Centralized pricing logic that keeps every quote consistent." },
    { title: "Product Catalog", description: "A single source of truth for products, bundles, and configurations." },
    { title: "Approval Automation", description: "Discount and contract approvals routed automatically by rule." },
    { title: "Quote Generation", description: "Branded, accurate quotes generated directly from the opportunity." },
    { title: "Renewal Management", description: "Upcoming renewals surfaced automatically before they're at risk." },
    { title: "Revenue Analytics", description: "Real-time visibility into bookings, billings, and recognized revenue." },
    { title: "AI Sales Forecasting", description: "Forecasts adjusted continuously against real pipeline and billing data.", illo: Images.illoAiPricingRecommendations },
  ],
};

const COMPARISON = {
  eyebrow: "Why Salesforce Revenue Cloud?",
  heading: "Traditional Revenue Management vs. Salesforce Revenue Cloud",
  intro: "Side by side, the gap between spreadsheet-driven revenue processes and a modern Revenue Cloud implementation is hard to ignore.",
  rows: [
    { label: "Quote Creation", traditional: "Manually built in spreadsheets", revenueCloud: "Generated automatically from guided selling" },
    { label: "Pricing Accuracy", traditional: "Inconsistent across reps and regions", revenueCloud: "Centralized pricing engine, enforced every time" },
    { label: "Contract Automation", traditional: "Email threads and manual redlines", revenueCloud: "Structured approval and e-signature workflows" },
    { label: "Subscription Billing", traditional: "Tracked manually in spreadsheets", revenueCloud: "Automated recurring billing and renewals" },
    { label: "Revenue Visibility", traditional: "Reconstructed at quarter-end", revenueCloud: "Real-time bookings-to-revenue visibility" },
    { label: "Approval Workflow", traditional: "Ad hoc, routed by email", revenueCloud: "Rule-based routing with full audit trail" },
    { label: "AI Insights", traditional: "No predictive capability", revenueCloud: "Einstein-driven pricing and discount guidance" },
    { label: "Forecasting", traditional: "Static, updated monthly", revenueCloud: "Continuously adjusted against live pipeline data" },
    { label: "Quote-to-Cash Speed", traditional: "Days to weeks per deal", revenueCloud: "Minutes to hours per deal" },
  ],
};

const AI_REVENUE_OPS = {
  eyebrow: "AI-Powered Revenue Operations",
  heading: "How AI Makes Every Deal More Profitable",
  intro: "AI in Revenue Cloud isn't a bolt-on feature — configured correctly, it becomes the layer that protects margin and predicts what's coming next.",
  illo: Images.illoAiPricingRecommendations,
  items: [
    { icon: Ico.tag, title: "AI Pricing Recommendations", description: "Optimal pricing suggested automatically based on deal context and history." },
    { icon: Ico.gauge, title: "Intelligent Discount Optimization", description: "Discount guardrails that protect margin without slowing down reps." },
    { icon: Ico.chartUp, title: "Revenue Forecasting", description: "Forecasts adjusted continuously against real pipeline and billing signals." },
    { icon: Ico.eye, title: "Predictive Sales Insights", description: "Deal-risk signals surfaced before a quote ever stalls." },
    { icon: Ico.document, title: "AI Contract Intelligence", description: "Key terms and risk clauses extracted automatically from every contract." },
    { icon: Ico.refresh, title: "Subscription Renewal Predictions", description: "At-risk renewals flagged weeks before the contract end date." },
    { icon: Ico.target, title: "Opportunity Scoring", description: "Deals ranked by likelihood to close so reps focus where it matters." },
    { icon: Ico.chartUp, title: "Revenue Analytics Dashboard", description: "Bookings, billings, and recognized revenue in one live view." },
  ],
};

const INDUSTRIES = {
  eyebrow: "Industries We Serve",
  heading: "Revenue Cloud Expertise Across Every Vertical",
  intro: "Pricing models and billing requirements differ sharply by industry — we bring vertical context to every Revenue Cloud engagement.",
  items: [
    { icon: Images.iconIndustryManufacturing, title: "Manufacturing" },
    { icon: Images.iconIndustryHealthcare, title: "Healthcare" },
    { icon: Images.iconIndustryHitech, title: "Technology" },
    { icon: Images.iconIndustryEcommerce, title: "Retail" },
    { icon: Images.iconIndustryFinancialServices, title: "Financial Services" },
    { icon: Images.iconIndustryTelecommunications, title: "Telecommunications" },
    { icon: Images.iconIndustryProfessionalServices, title: "Professional Services" },
    { icon: Images.iconIndustryWholesale, title: "Distribution" },
  ],
};

const PROCESS = {
  eyebrow: "Salesforce Revenue Cloud Implementation Process",
  heading: "A Structured Path From Discovery to Go-Live",
  intro: "No surprises, no scope creep. Our Revenue Cloud delivery framework has been refined across hundreds of implementations.",
  illo: Images.illoRevenueForecastGrowth,
  steps: [
    { name: "Business Discovery", description: "We map your current quote, billing, and contract processes." },
    { name: "Revenue Process Assessment", description: "A structured audit of pricing, approval, and billing gaps." },
    { name: "Solution Architecture", description: "Data model, pricing, and integration architecture, documented." },
    { name: "CPQ Configuration", description: "Product catalog, pricing rules, and guided selling setup." },
    { name: "Billing Setup", description: "Invoicing, revenue recognition, and payment workflows configured." },
    { name: "Integration Development", description: "Connecting Revenue Cloud to ERP, finance, and signature systems." },
    { name: "Testing & Validation", description: "UAT, regression testing, and security review before go-live." },
    { name: "User Training", description: "Role-based training so reps and finance are productive on day one." },
    { name: "Go-Live", description: "Structured cutover with go-live support on-site or remote." },
    { name: "Continuous Optimization", description: "Hypercare and ongoing optimization after launch." },
  ],
};

const INTEGRATION_ECOSYSTEM = {
  eyebrow: "Integration Ecosystem",
  heading: "Revenue Cloud, Connected to Your Full Stack",
  items: ["Salesforce CRM", "Sales Cloud", "Service Cloud", "Data Cloud", "MuleSoft", "Slack", "Tableau", "SAP", "Oracle ERP", "NetSuite", "Stripe", "DocuSign"],
};

const WHY_MIRKETA = {
  eyebrow: "Why Choose Mirketa",
  heading: "A Revenue Cloud Partner That Delivers Outcomes",
  intro: "Hundreds of partners can configure Revenue Cloud. Fewer can tie every decision back to a measurable revenue outcome.",
  items: [
    { icon: Ico.award, title: "Salesforce Summit Partner", description: "Our highest-tier Salesforce partnership, backed by a verified delivery track record." },
    { icon: Ico.compass, title: "Certified Revenue Cloud Consultants", description: "Every consultant holds active Revenue Cloud and CPQ certifications." },
    { icon: Ico.globe, title: "Deep Quote-to-Cash Expertise", description: "Hundreds of implementations across pricing, billing, and contract workflows." },
    { icon: Ico.sparkle, title: "Enterprise AI Solutions", description: "Einstein AI is part of the architecture, not an afterthought." },
    { icon: Ico.bolt, title: "Agile Delivery Methodology", description: "Two-week sprints with regular demos keep every engagement on schedule." },
    { icon: Ico.headset, title: "Global Support Team", description: "A delivery model built to support distributed, multi-region finance teams." },
    { icon: Ico.rocket, title: "Proven Salesforce Accelerators", description: "Pre-built frameworks that cut implementation time without cutting quality." },
    { icon: Ico.handshake, title: "Long-Term Managed Services", description: "98% client retention because our work continues past go-live." },
  ],
};

const CASE_STUDIES = {
  eyebrow: "Customer Success Stories",
  heading: "Real Revenue Cloud Outcomes From Real Deployments",
  intro: "Anonymized results from recent Revenue Cloud engagements across industries.",
  illo: Images.illoContractLifecycle,
  cases: [
    {
      title: "Manufacturer Cuts Quote Turnaround by 68%",
      industry: "Manufacturing",
      challenge: "Complex product bundles meant every quote required manual pricing review, delaying deals by days.",
      solution: "We implemented Salesforce CPQ with guided selling and automated pricing rules across every product line.",
      results: "Reps now generate accurate, approved quotes in minutes instead of days.",
      metrics: [{ value: "68%", label: "Faster Quotes" }, { value: "2.2×", label: "Deal Velocity" }, { value: "99.4%", label: "Pricing Accuracy" }],
    },
    {
      title: "Technology Company Recovers 22% in Revenue Leakage",
      industry: "Technology",
      challenge: "Manual billing and inconsistent renewal tracking were silently costing the business real revenue.",
      solution: "We deployed Revenue Cloud billing automation with subscription and renewal management built in.",
      results: "Billing errors dropped to near zero and renewals are now tracked automatically.",
      metrics: [{ value: "22%", label: "Revenue Recovered" }, { value: "91%", label: "Fewer Billing Errors" }, { value: "34%", label: "Renewal Rate Lift" }],
    },
    {
      title: "Professional Services Firm Cuts Contract Cycle Time in Half",
      industry: "Professional Services",
      challenge: "Contracts moved through legal and finance via email, with no visibility into where a deal was stuck.",
      solution: "We implemented contract lifecycle management with automated approval routing and e-signature integration.",
      results: "Every contract now moves through a visible, auditable workflow from draft to signature.",
      metrics: [{ value: "50%", label: "Faster Contract Cycle" }, { value: "3.4×", label: "Approval Throughput" }, { value: "100%", label: "Audit Trail Coverage" }],
    },
  ],
};

const TESTIMONIALS = [
  { quote: "Our reps used to spend half a day building a single complex quote. With CPQ, that same quote takes fifteen minutes and it's more accurate than what they were producing by hand.", name: "Carlos Mendes", role: "VP of Sales Operations, industrial manufacturer" },
  { quote: "Revenue leakage was invisible to us until Mirketa showed us exactly where billing automation would recover margin. The ROI was obvious within the first billing cycle.", name: "Sofia Nakamura", role: "Director of Finance Operations" },
  { quote: "Contract cycle time was our biggest bottleneck to closing deals faster. Automating approvals and e-signature cut that bottleneck in half almost immediately.", name: "Ben Okafor", role: "Head of Revenue Operations" },
  { quote: "What impressed us most was how deeply the team understood quote-to-cash, not just Salesforce configuration. Every recommendation was tied to a revenue outcome.", name: "Louise Fontaine", role: "CFO, technology company" },
];

const FAQS = [
  { q: "What does Salesforce Revenue Cloud consulting include?", a: "Our Revenue Cloud consulting starts with a business discovery phase that maps your current quote, billing, and contract processes. From there we deliver a prioritized roadmap covering CPQ, billing, and contract lifecycle management — each recommendation tied to a measurable revenue outcome." },
  { q: "How long does a Salesforce Revenue Cloud implementation take?", a: "A focused CPQ and billing implementation for a single revenue team typically takes 8–12 weeks. Multi-entity deployments with complex pricing and ERP integration can take 4–6 months. We provide a detailed timeline during discovery, before implementation begins." },
  { q: "What Salesforce Revenue Cloud services do you offer?", a: "We provide end-to-end Revenue Cloud services covering consulting, CPQ implementation, billing automation, subscription management, contract lifecycle management, revenue recognition, integration, and long-term managed services." },
  { q: "Do you offer Salesforce CPQ consulting specifically?", a: "Yes. Salesforce CPQ consulting is one of our core practices — covering product catalog design, pricing rules, guided selling, approval automation, and quote templates configured around your actual sales motion." },
  { q: "How does Salesforce Billing work within Revenue Cloud?", a: "Salesforce Billing automates invoice generation, payment processing, and revenue recognition directly from your CPQ quotes and contracts, eliminating the manual handoffs between sales and finance that cause billing errors." },
  { q: "Can Revenue Cloud handle subscription management?", a: "Yes. Revenue Cloud manages recurring billing, usage-based pricing, upgrades, downgrades, and renewals natively, so subscription revenue doesn't rely on manual tracking in spreadsheets." },
  { q: "What is quote-to-cash automation and why does it matter?", a: "Quote-to-cash automation connects quoting, contracting, billing, and revenue recognition into one continuous process. It matters because every manual handoff between those steps is where deals slow down and revenue leaks — automating it compounds speed and accuracy across every deal." },
  { q: "Are you a certified Salesforce Revenue Cloud partner?", a: "Yes. Mirketa is a Salesforce Summit Partner with consultants holding active Revenue Cloud, CPQ, and Billing certifications, backed by a track record across hundreds of Salesforce engagements." },
  { q: "How does Salesforce Revenue Cloud improve revenue management?", a: "Revenue Cloud centralizes pricing, billing, and contract data so finance and sales work from the same numbers in real time, replacing quarter-end reconciliation with continuous, accurate revenue visibility." },
  { q: "What Salesforce AI revenue solutions are available?", a: "Revenue Cloud includes Einstein-powered pricing recommendations, discount optimization, opportunity scoring, and renewal predictions — all trained on your own deal and billing history rather than a generic model." },
  { q: "How much does a Salesforce Revenue Cloud implementation cost?", a: "Pricing depends on scope, product complexity, and integration needs. Most implementations range from $30,000 to $150,000. We provide a detailed, fixed-scope proposal after a free discovery consultation — no hidden fees." },
  { q: "Can Revenue Cloud integrate with our existing ERP and finance systems?", a: "Yes. We build integrations between Revenue Cloud and ERP platforms like SAP, Oracle, and NetSuite, along with payment processors like Stripe and e-signature tools like DocuSign, so revenue data flows without manual re-entry." },
];

const FINAL_CTA = {
  heading: "Ready to Transform Your Quote-to-Cash Process?",
  description: "Partner with Mirketa's Salesforce Revenue Cloud experts to automate your revenue operations, accelerate sales cycles, improve pricing accuracy, and maximize business growth with AI-powered quote-to-cash solutions.",
  primaryCta: { label: "Book Free Consultation", href: "#contact" },
  secondaryCta: { label: "Schedule a Discovery Call", href: "#contact" },
};

const SEO = {
  title: "Salesforce Revenue Cloud Consulting & Implementation Services | Mirketa",
  description:
    "Mirketa's certified Salesforce consultants deliver Revenue Cloud implementation, CPQ, billing automation, subscription management, and AI-powered revenue operations that accelerate quote-to-cash.",
  canonical: "https://mirketa.us/salesforce-revenue-cloud/",
  keywords: [
    "Salesforce Revenue Cloud Consulting",
    "Salesforce Revenue Cloud Implementation",
    "Salesforce Revenue Cloud Services",
    "Salesforce CPQ Consulting",
    "Salesforce Billing Solutions",
    "Quote-to-Cash Automation",
    "Salesforce Revenue Management",
    "Subscription Management",
    "Revenue Cloud Partner",
    "Salesforce Contract Lifecycle Management",
    "AI-powered Revenue Operations",
    "Enterprise Revenue Automation",
    "Salesforce Revenue Optimization",
  ],
  schema: [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "Salesforce Revenue Cloud Consulting and Implementation Services",
      provider: { "@type": "Organization", name: "Mirketa Inc.", url: "https://mirketa.us" },
      name: "Salesforce Revenue Cloud Consulting & Implementation",
      description:
        "End-to-end Salesforce Revenue Cloud consulting, CPQ implementation, billing automation, subscription management, contract lifecycle management, and AI-powered revenue operations.",
      areaServed: "Global",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://mirketa.us/" },
        { "@type": "ListItem", position: 2, name: "Platforms & Technology", item: "https://mirketa.us/platforms/salesforce/clouds" },
        { "@type": "ListItem", position: 3, name: "Salesforce Clouds", item: "https://mirketa.us/platforms/salesforce/clouds" },
        { "@type": "ListItem", position: 4, name: "Revenue Cloud", item: "https://mirketa.us/salesforce-revenue-cloud/" },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

// ============================================================
// MAIN COMPONENT
// ============================================================

export default function RevenueCloud() {
  const heroTextRef = useRef(null);
  const heroRef = useRef(null);
  const [showStickyCta, setShowStickyCta] = useState(false);

  useEffect(() => {
    const heroEl = heroRef.current;
    if (!heroEl) return;
    const observer = new IntersectionObserver(
      ([entry]) => setShowStickyCta(!entry.isIntersecting),
      { rootMargin: "-10% 0px 0px 0px" }
    );
    observer.observe(heroEl);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (heroTextRef.current) {
        gsap.from(heroTextRef.current.children, {
          opacity: 0,
          y: 28,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
        });
      }

      gsap.utils.toArray(".rvc-reveal").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 32,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      gsap.utils.toArray(".rvc-reveal-stagger").forEach((el) => {
        gsap.from(el.children, {
          opacity: 0,
          y: 26,
          duration: 0.6,
          stagger: 0.06,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      gsap.utils.toArray(".rvc-zoom-in").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          scale: 0.94,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="salesforce-revenue-cloud">
      <Seo {...SEO} />
      <HeroSection heroTextRef={heroTextRef} heroRef={heroRef} />
      <TrustedBySection />
      <ChallengesSection />
      <ServicesSection />
      <CapabilitiesSection />
      <ComparisonSection />
      <AiRevenueOpsSection />
      <IndustriesSection />
      <ProcessSection />
      <IntegrationEcosystemSection />
      <WhyMirketaSection />
      <CaseStudiesSection />
      <TestimonialsSection />
      <FaqSection />
      <FinalCtaSection />
      <ConsultationSection
        eyebrow="Get Started"
        heading="Talk to a Revenue Cloud Expert"
        description="Tell us about your quote-to-cash process and billing goals — a Revenue Cloud expert will follow up within one business day."
        formTitle="Talk to a Revenue Cloud Expert"
      />
      <StickyCta visible={showStickyCta} />
    </div>
  );
}

// ============================================================
// STICKY CTA — desktop only, appears once the hero scrolls out of view
// ============================================================

function StickyCta({ visible }) {
  return (
    <div className={`rvc-sticky-cta ${visible ? "is-visible" : ""}`} aria-hidden={!visible}>
      <a href="#contact" className="btn btn-primary rvc-btn" tabIndex={visible ? 0 : -1}>
        Book Free Consultation <span aria-hidden="true">→</span>
      </a>
    </div>
  );
}

// ============================================================
// HERO
// ============================================================

function HeroSection({ heroTextRef, heroRef }) {
  return (
    <section ref={heroRef} className="rvc-hero" style={{ backgroundImage: `url("${Images.heroSalesforceRevenueCloud}")` }} aria-label="Salesforce Revenue Cloud Consulting by Mirketa">
      <div className="rvc-hero__scrim" />
      <div className="container">
        <Breadcrumb items={BREADCRUMB} className="rvc-breadcrumb" />
        <div className="rvc-hero__inner">
          <div ref={heroTextRef} className="rvc-hero__text">
            <span className="rvc-badge">
              <span className="rvc-badge__spark" aria-hidden="true">✦</span> {HERO.badge}
            </span>
            <h1>{HERO.title}</h1>
            <p className="rvc-hero__description">{HERO.description}</p>
            <div className="rvc-hero__ctas">
              <a href={HERO.primaryCta.href} className="btn btn-primary rvc-btn">
                {HERO.primaryCta.label} <span aria-hidden="true">→</span>
              </a>
              <a href={HERO.secondaryCta.href} className="btn btn-secondary rvc-btn">
                {HERO.secondaryCta.label}
              </a>
            </div>
            <ul className="rvc-hero__metrics">
              {HERO.metrics.map((m) => (
                <li key={m}>
                  <span aria-hidden="true">{Ico.check}</span>
                  {m}
                </li>
              ))}
            </ul>
          </div>

          <HeroVisual
            dashboardTitle={HERO_DASHBOARD.title}
            stats={HERO_DASHBOARD.stats}
            rows={HERO_DASHBOARD.rows}
            floatingCards={HERO_DASHBOARD.floatingCards}
            className="rvc-hero__visual"
          />
        </div>
      </div>
    </section>
  );
}

// ============================================================
// TRUSTED BY
// ============================================================

function TrustedBySection() {
  const badges = [
    { icon: Images.clientSalesforce, label: "Salesforce Partner" },
    { icon: Images.clientSoc2, label: "SOC 2 Certified" },
    { icon: Images.clientHipaa, label: "HIPAA Ready" },
    { icon: Images.clientEnterprise, label: "Enterprise Ready" },
    { icon: Images.clientExperience, label: "15+ Years Experience" },
  ];
  const loop = [...badges, ...badges];

  return (
    <section className="rvc-trusted" aria-label="Trusted by global enterprises">
      <div className="container rvc-trusted__inner">
        <p className="rvc-trusted__label">Trusted By</p>
        <div className="rvc-trusted__track" role="list">
          <div className="rvc-trusted__marquee">
            {loop.map((b, i) => (
              <div className="rvc-trusted__badge" role="listitem" key={`${b.label}-${i}`}>
                <img src={b.icon} alt="" aria-hidden="true" />
                <span>{b.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// REVENUE CHALLENGES WE SOLVE
// ============================================================

function ChallengesSection() {
  return (
    <section className="section rvc-challenges" aria-labelledby="rvc-challenges-heading">
      <div className="container">
        <div className="rvc-challenges__head rvc-reveal">
          <div className="section-heading">
            <p className="rvc-eyebrow">{CHALLENGES.eyebrow}</p>
            <h2 id="rvc-challenges-heading">{CHALLENGES.heading}</h2>
            <p>{CHALLENGES.intro}</p>
          </div>
          <img src={CHALLENGES.illo} alt="" aria-hidden="true" className="rvc-challenges__illo" loading="lazy" />
        </div>
        <div className="rvc-challenges__grid rvc-reveal-stagger">
          {CHALLENGES.items.map((c) => (
            <div className="rvc-challenge-card" key={c.title}>
              <span className="rvc-challenge-card__icon">{c.icon}</span>
              <h3>{c.title}</h3>
              <p>{c.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// OUR SALESFORCE REVENUE CLOUD SERVICES
// ============================================================

function ServicesSection() {
  return (
    <section className="section rvc-services" id="services" aria-labelledby="rvc-services-heading">
      <div className="container">
        <div className="rvc-services__head rvc-reveal">
          <div className="section-heading">
            <p className="rvc-eyebrow">{SERVICES.eyebrow}</p>
            <h2 id="rvc-services-heading">{SERVICES.heading}</h2>
            <p>{SERVICES.intro}</p>
          </div>
          <img src={SERVICES.illo} alt="" aria-hidden="true" className="rvc-services__illo" loading="lazy" />
        </div>
        <div className="rvc-services__grid rvc-reveal-stagger">
          {SERVICES.items.map((s) => (
            <div className="rvc-service-card" key={s.title}>
              <span className="rvc-service-card__icon">{s.icon}</span>
              <h3>{s.title}</h3>
              <p>{s.description}</p>
              <a href="#contact" className="rvc-service-card__link">
                Learn More <span aria-hidden="true">→</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// REVENUE CLOUD CAPABILITIES
// ============================================================

function CapabilitiesSection() {
  return (
    <section className="section rvc-capabilities" id="capabilities" aria-labelledby="rvc-capabilities-heading">
      <div className="container">
        <div className="rvc-capabilities__head rvc-reveal">
          <img src={CAPABILITIES.illo} alt="" aria-hidden="true" className="rvc-capabilities__illo" loading="lazy" />
          <div className="section-heading">
            <p className="rvc-eyebrow">{CAPABILITIES.eyebrow}</p>
            <h2 id="rvc-capabilities-heading">{CAPABILITIES.heading}</h2>
            <p>{CAPABILITIES.intro}</p>
          </div>
        </div>
        <div className="rvc-capabilities__grid rvc-reveal-stagger">
          {CAPABILITIES.items.map((c) => (
            <div className={`rvc-capability-card ${c.illo ? "rvc-capability-card--illo" : ""}`} key={c.title}>
              {c.illo ? (
                <img src={c.illo} alt="" aria-hidden="true" className="rvc-capability-card__illo" loading="lazy" />
              ) : (
                <span className="rvc-capability-card__check" aria-hidden="true">{Ico.check}</span>
              )}
              <h3>{c.title}</h3>
              <p>{c.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// WHY SALESFORCE REVENUE CLOUD — comparison
// ============================================================

function ComparisonSection() {
  return (
    <section className="section rvc-comparison" aria-labelledby="rvc-comparison-heading">
      <div className="container">
        <div className="section-heading rvc-reveal">
          <p className="rvc-eyebrow">{COMPARISON.eyebrow}</p>
          <h2 id="rvc-comparison-heading">{COMPARISON.heading}</h2>
          <p>{COMPARISON.intro}</p>
        </div>
        <div className="rvc-comparison__table rvc-reveal-stagger">
          <div className="rvc-comparison__row rvc-comparison__row--head">
            <span></span>
            <span>Traditional Revenue Management</span>
            <span>Salesforce Revenue Cloud</span>
          </div>
          {COMPARISON.rows.map((r) => (
            <div className="rvc-comparison__row" key={r.label}>
              <span className="rvc-comparison__label">{r.label}</span>
              <span className="rvc-comparison__cell rvc-comparison__cell--traditional">
                <span aria-hidden="true">{Ico.cross}</span> {r.traditional}
              </span>
              <span className="rvc-comparison__cell rvc-comparison__cell--rc">
                <span aria-hidden="true">{Ico.check}</span> {r.revenueCloud}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// AI-POWERED REVENUE OPERATIONS
// ============================================================

function AiRevenueOpsSection() {
  return (
    <section className="section rvc-ai" aria-labelledby="rvc-ai-heading">
      <div className="container">
        <div className="rvc-ai__head rvc-reveal">
          <div className="section-heading">
            <p className="rvc-eyebrow">{AI_REVENUE_OPS.eyebrow}</p>
            <h2 id="rvc-ai-heading">{AI_REVENUE_OPS.heading}</h2>
            <p>{AI_REVENUE_OPS.intro}</p>
          </div>
          <img src={AI_REVENUE_OPS.illo} alt="" aria-hidden="true" className="rvc-ai__illo" loading="lazy" />
        </div>
        <div className="rvc-ai__grid rvc-reveal-stagger">
          {AI_REVENUE_OPS.items.map((a) => (
            <div className="rvc-ai-card" key={a.title}>
              <span className="rvc-ai-card__icon">{a.icon}</span>
              <h3>{a.title}</h3>
              <p>{a.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// INDUSTRIES WE SERVE
// ============================================================

function IndustriesSection() {
  return (
    <section className="section rvc-industries" aria-labelledby="rvc-industries-heading">
      <div className="container">
        <div className="section-heading rvc-reveal">
          <p className="rvc-eyebrow">{INDUSTRIES.eyebrow}</p>
          <h2 id="rvc-industries-heading">{INDUSTRIES.heading}</h2>
          <p>{INDUSTRIES.intro}</p>
        </div>
        <div className="rvc-industries__grid rvc-reveal-stagger">
          {INDUSTRIES.items.map((i) => (
            <div className="rvc-industry-card" key={i.title}>
              <img src={i.icon} alt="" aria-hidden="true" />
              <h3>{i.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// SALESFORCE REVENUE CLOUD IMPLEMENTATION PROCESS
// ============================================================

function ProcessSection() {
  return (
    <section className="section rvc-process" aria-labelledby="rvc-process-heading">
      <div className="container">
        <div className="rvc-process__head rvc-reveal">
          <div className="section-heading">
            <p className="rvc-eyebrow">{PROCESS.eyebrow}</p>
            <h2 id="rvc-process-heading">{PROCESS.heading}</h2>
            <p>{PROCESS.intro}</p>
          </div>
          <img src={PROCESS.illo} alt="" aria-hidden="true" className="rvc-process__illo" loading="lazy" />
        </div>
        <div className="rvc-process__rail rvc-reveal-stagger">
          {PROCESS.steps.map((p, i) => (
            <div className="rvc-step-card" key={p.name}>
              <span className="rvc-step-card__num">{String(i + 1).padStart(2, "0")}</span>
              <h3>{p.name}</h3>
              <p>{p.description}</p>
              {i < PROCESS.steps.length - 1 && <span className="rvc-step-card__arrow" aria-hidden="true">→</span>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// INTEGRATION ECOSYSTEM
// ============================================================

function IntegrationEcosystemSection() {
  return (
    <section className="section rvc-stack" aria-labelledby="rvc-stack-heading">
      <div className="container">
        <div className="section-heading rvc-reveal">
          <p className="rvc-eyebrow">{INTEGRATION_ECOSYSTEM.eyebrow}</p>
          <h2 id="rvc-stack-heading">{INTEGRATION_ECOSYSTEM.heading}</h2>
        </div>
        <ul className="rvc-stack__wall rvc-reveal-stagger">
          {INTEGRATION_ECOSYSTEM.items.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// ============================================================
// WHY CHOOSE MIRKETA
// ============================================================

function WhyMirketaSection() {
  return (
    <section className="section rvc-why" aria-labelledby="rvc-why-heading">
      <div className="container">
        <div className="section-heading rvc-reveal">
          <p className="rvc-eyebrow">{WHY_MIRKETA.eyebrow}</p>
          <h2 id="rvc-why-heading">{WHY_MIRKETA.heading}</h2>
          <p>{WHY_MIRKETA.intro}</p>
        </div>
        <div className="rvc-why__grid rvc-reveal-stagger">
          {WHY_MIRKETA.items.map((w) => (
            <div className="rvc-why-card" key={w.title}>
              <span className="rvc-why-card__icon">{w.icon}</span>
              <h3>{w.title}</h3>
              <p>{w.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// CUSTOMER SUCCESS STORIES
// ============================================================

function CaseStudiesSection() {
  return (
    <section className="section rvc-cases" aria-labelledby="rvc-cases-heading">
      <div className="container">
        <div className="rvc-cases__head rvc-reveal">
          <img src={CASE_STUDIES.illo} alt="" aria-hidden="true" className="rvc-cases__illo" loading="lazy" />
          <div className="section-heading">
            <p className="rvc-eyebrow">{CASE_STUDIES.eyebrow}</p>
            <h2 id="rvc-cases-heading">{CASE_STUDIES.heading}</h2>
            <p>{CASE_STUDIES.intro}</p>
          </div>
        </div>
        <div className="rvc-cases__grid rvc-reveal-stagger">
          {CASE_STUDIES.cases.map((c) => (
            <div className="rvc-case-card" key={c.title}>
              <span className="rvc-case-card__tag">{c.industry}</span>
              <h3>{c.title}</h3>
              <dl className="rvc-case-card__fields">
                <div><dt>Business Challenge</dt><dd>{c.challenge}</dd></div>
                <div><dt>Solution Delivered</dt><dd>{c.solution}</dd></div>
                <div><dt>Business Results</dt><dd>{c.results}</dd></div>
              </dl>
              <div className="rvc-case-card__metrics">
                {c.metrics.map((m) => (
                  <div key={m.label}>
                    <strong>{m.value}</strong>
                    <span>{m.label}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// TESTIMONIALS
// ============================================================

function TestimonialsSection() {
  return (
    <section className="section rvc-testimonials" aria-labelledby="rvc-testimonials-heading">
      <div className="container">
        <div className="section-heading rvc-reveal">
          <p className="rvc-eyebrow">Testimonials</p>
          <h2 id="rvc-testimonials-heading">What Our Clients Say About Their Revenue Cloud Results</h2>
        </div>
        <div className="rvc-testimonials__grid rvc-reveal-stagger">
          {TESTIMONIALS.map((t) => (
            <figure className="rvc-testimonial-card" key={t.name}>
              <img src={Images.iconQuote} alt="" aria-hidden="true" className="rvc-testimonial-card__mark" />
              <blockquote>{t.quote}</blockquote>
              <figcaption>
                <strong>{t.name}</strong>
                {t.role && <span>{t.role}</span>}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// FAQ
// ============================================================

function FaqSection() {
  const [query, setQuery] = useState("");
  const [openIndex, setOpenIndex] = useState(-1);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return FAQS;
    return FAQS.filter((item) => item.q.toLowerCase().includes(q) || item.a.toLowerCase().includes(q));
  }, [query]);

  return (
    <section className="section rvc-faq" aria-labelledby="rvc-faq-heading">
      <div className="container">
        <div className="section-heading rvc-reveal">
          <p className="rvc-eyebrow">FAQ</p>
          <h2 id="rvc-faq-heading">Frequently Asked Questions About Salesforce Revenue Cloud</h2>
        </div>
        <div className="rvc-faq__search-wrap rvc-reveal">
          <label htmlFor="rvc-faq-search" className="visually-hidden">
            Search frequently asked questions
          </label>
          <input
            id="rvc-faq-search"
            type="search"
            className="rvc-faq__search"
            placeholder="Ask a question — e.g. &quot;CPQ&quot;, &quot;pricing&quot;, &quot;billing&quot;..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpenIndex(-1);
            }}
          />
        </div>
        <div className="rvc-faq__list rvc-reveal">
          {filtered.length === 0 ? (
            <p className="rvc-faq__empty">No questions match &ldquo;{query}&rdquo;. Try a different search term.</p>
          ) : (
            filtered.map((item, i) => {
              const open = openIndex === i;
              const panelId = `rvc-faq-panel-${i}`;
              return (
                <div className={`rvc-faq-item ${open ? "is-open" : ""}`} key={item.q}>
                  <button type="button" className="rvc-faq-item__question" aria-expanded={open} aria-controls={panelId} onClick={() => setOpenIndex(open ? -1 : i)}>
                    <span>{item.q}</span>
                    <span className="rvc-faq-item__icon" aria-hidden="true">{open ? "−" : "+"}</span>
                  </button>
                  <div id={panelId} className="rvc-faq-item__answer" role="region" hidden={!open}>
                    <p>{item.a}</p>
                  </div>
                </div>
              );
            })
          )}
        </div>
        <p className="rvc-faq__links">
          Related reading: <Link to="/platforms/salesforce/development-consulting">Salesforce Development & Consulting</Link>,{" "}
          <Link to="/platforms/salesforce/clouds">Salesforce Clouds</Link>,{" "}
          <Link to="/platforms/salesforce/clouds/sales-cloud">Salesforce Sales Cloud</Link>,{" "}
          <Link to="/platforms/salesforce/clouds/service-cloud">Salesforce Service Cloud</Link>,{" "}
          <Link to="/platforms/salesforce/clouds/marketing-cloud">Salesforce Marketing Cloud</Link>,{" "}
          <Link to="/data-cloud">Salesforce Data Cloud</Link>, <Link to="/agentforce">Agentforce</Link>,{" "}
          <Link to="/ai-consulting">AI Consulting</Link>, <a href="#services">Integration Services</a>,{" "}
          <Link to="/insights/customer-success">Customer Success</Link>, <Link to="/insights/blogs">Blogs</Link>.
        </p>
      </div>
    </section>
  );
}

// ============================================================
// FINAL CTA
// ============================================================

function FinalCtaSection() {
  return (
    <section className="rvc-final-cta rvc-reveal" aria-labelledby="rvc-final-cta-heading">
      <div className="container rvc-final-cta__inner">
        <h2 id="rvc-final-cta-heading">{FINAL_CTA.heading}</h2>
        <p>{FINAL_CTA.description}</p>
        <div className="rvc-final-cta__ctas">
          <a href={FINAL_CTA.primaryCta.href} className="btn btn-primary rvc-btn">
            {FINAL_CTA.primaryCta.label} <span aria-hidden="true">→</span>
          </a>
          <a href={FINAL_CTA.secondaryCta.href} className="btn btn-secondary rvc-btn">
            {FINAL_CTA.secondaryCta.label}
          </a>
        </div>
        <Link to="/platforms/salesforce/clouds" className="rvc-final-cta__all-services">
          Explore All Salesforce Clouds →
        </Link>
      </div>
    </section>
  );
}
