import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Images } from "../../../assets/images/index.js";
import Seo from "../../../components/Seo/Seo.jsx";
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb.jsx";
import HeroVisual from "../../../components/HeroVisual/HeroVisual.jsx";
import ConsultationSection from "../../../components/ConsultationSection/ConsultationSection.jsx";
import "./ManufacturingCloud.css";

gsap.registerPlugin(ScrollTrigger);

// ============================================================
// ICONS
// ============================================================

const Ico = {
  chartUp: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 19V13M10 19V8M16 19v-5M20 19V5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
  ),
  box: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 8l9-5 9 5-9 5-9-5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M3 8v8l9 5 9-5V8M12 13v8" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /></svg>
  ),
  network: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="6" r="2.4" stroke="currentColor" strokeWidth="1.4" /><circle cx="6" cy="18" r="2.4" stroke="currentColor" strokeWidth="1.4" /><circle cx="18" cy="18" r="2.4" stroke="currentColor" strokeWidth="1.4" /><path d="M12 8.4L7 16M12 8.4l5 7.6M8.4 18h7.2" stroke="currentColor" strokeWidth="1.3" /></svg>
  ),
  clock: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" /><path d="M12 7v5l4 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  layers: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3l9 5-9 5-9-5 9-5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M3 12l9 5 9-5M3 16l9 5 9-5" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /></svg>
  ),
  truck: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 7h11v9H3zM14 11h4l3 3v2h-7z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><circle cx="7" cy="19" r="1.6" stroke="currentColor" strokeWidth="1.3" /><circle cx="17.5" cy="19" r="1.6" stroke="currentColor" strokeWidth="1.3" /></svg>
  ),
  handshake: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 12l4-4 4 4-4 4-4-4zM21 12l-4-4-4 4 4 4 4-4z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M11 12h2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
  ),
  compass: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" /><path d="M15 9l-2 6-6 2 2-6 6-2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  gear: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.4" /><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
  ),
  plug: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 3v5M15 3v5M7 8h10v4a5 5 0 01-10 0V8z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="M12 17v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
  ),
  headset: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 13a8 8 0 0116 0v4" stroke="currentColor" strokeWidth="1.5" /><rect x="3" y="13" width="4" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4" /><rect x="17" y="13" width="4" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4" /></svg>
  ),
  award: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="8" r="5" stroke="currentColor" strokeWidth="1.4" /><path d="M8.5 12.5L7 21l5-2.5L17 21l-1.5-8.5" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  document: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 3h9l3 3v15H6z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M9 10h6M9 14h6M9 18h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
  ),
  target: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.4" /><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.3" opacity="0.6" /><circle cx="12" cy="12" r="1.2" fill="currentColor" /></svg>
  ),
  users: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="9" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.4" /><path d="M3.5 19c.6-3.4 2.9-5.2 5.5-5.2s4.9 1.8 5.5 5.2" stroke="currentColor" strokeWidth="1.4" /><circle cx="17" cy="9" r="2.6" stroke="currentColor" strokeWidth="1.3" opacity="0.7" /><path d="M15.5 13.4c2.2.3 3.7 1.9 4 4.6" stroke="currentColor" strokeWidth="1.3" opacity="0.7" /></svg>
  ),
  sparkle: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /></svg>
  ),
  eye: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.4" /></svg>
  ),
  robot: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="5" y="9" width="14" height="10" rx="3" stroke="currentColor" strokeWidth="1.5" /><path d="M12 5v4M9 14h.01M15 14h.01" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /><circle cx="12" cy="4" r="1.4" fill="currentColor" /></svg>
  ),
  bolt: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M13 2L4 14h7l-1 8 10-13h-7l0-7z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  factory: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 21V11l5 3V11l5 3V8l8 5v8H3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  car: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 16l2-6h12l2 6" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><rect x="3" y="16" width="18" height="4" rx="1.5" stroke="currentColor" strokeWidth="1.3" /><circle cx="7.5" cy="20" r="1.4" stroke="currentColor" strokeWidth="1.2" /><circle cx="16.5" cy="20" r="1.4" stroke="currentColor" strokeWidth="1.2" /></svg>
  ),
  chip: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="7" y="7" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.4" /><path d="M9 3v4M15 3v4M9 21v-4M15 21v-4M3 9h4M3 15h4M21 9h-4M21 15h-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
  ),
  cross: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 4v16M4 12h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
  ),
  plane: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M2 12l20-7-7 20-3-8-8-3-2-2z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /></svg>
  ),
  cart: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 4h2l2.2 11h10.6L20 7H6.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /><circle cx="9" cy="20" r="1.3" fill="currentColor" /><circle cx="17" cy="20" r="1.3" fill="currentColor" /></svg>
  ),
  check: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12.5l5 5L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  globe: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.4" /><path d="M3 12h18M12 3c2.5 2.5 3.5 6 3.5 9s-1 6.5-3.5 9c-2.5-2.5-3.5-6-3.5-9s1-6.5 3.5-9z" stroke="currentColor" strokeWidth="1.3" /></svg>
  ),
  cloud: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6.5 16.5A4.2 4.2 0 017 8.2 5.5 5.5 0 0117.5 9.5 3.7 3.7 0 0117 17H7" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></svg>
  ),
};

// ============================================================
// DATA
// ============================================================

const BREADCRUMB = [
  { label: "Home", href: "/" },
  { label: "Platforms & Technology", href: "/salesforce" },
  { label: "Salesforce Clouds", href: "/salesforce" },
  { label: "Manufacturing Cloud" },
];

const HERO = {
  badge: "Salesforce Summit Partner • Manufacturing Cloud Experts",
  title: "Connect Sales, Service, and Production With Salesforce Manufacturing Cloud",
  description:
    "Improve sales planning, demand forecasting, and dealer management with a platform built for manufacturers. Mirketa implements Salesforce Manufacturing Cloud to unify account-based forecasting, partner collaboration, production visibility, and AI-powered manufacturing intelligence.",
  primaryCta: { label: "Book a Manufacturing Assessment", href: "#contact" },
  secondaryCta: { label: "Schedule a Demo", href: "#contact" },
  metrics: ["500+ Salesforce Projects Delivered", "Certified Manufacturing Cloud Consultants", "Global Delivery Model", "Trusted by Industrial Enterprises"],
};

const HERO_DASHBOARD = {
  title: "Manufacturing Cloud Forecast",
  stats: [
    { label: "Forecast Accuracy", value: "92%", caption: "Account-based forecasting" },
    { label: "Dealer Engagement", value: "+41%", caption: "Connected dealer portal" },
    { label: "Revenue Growth", value: "+34%", caption: "Post-implementation" },
  ],
  rows: [
    { title: "Account-Based Forecast", meta: "Discrete manufacturer — run-rate reconciled", status: "On track", tone: "good" },
    { title: "Dealer Portal Rollout", meta: "Industrial OEM — Experience Cloud", status: "Live", tone: "good" },
    { title: "Production Planning Sync", meta: "Automotive supplier — demand signals", status: "In progress", tone: "neutral" },
    { title: "Supply Chain Risk Alert", meta: "ERP integration — early warning", status: "Monitoring", tone: "attention" },
  ],
  floatingCards: [
    { icon: Ico.factory, title: "500+", subtitle: "Manufacturing Projects" },
    { icon: Ico.robot, title: "Agentforce", subtitle: "Autonomous dealer support" },
  ],
};

const EXPLAINER = {
  eyebrow: "What Is Salesforce Manufacturing Cloud?",
  heading: "What Is Salesforce Manufacturing Cloud?",
  paragraph:
    "Salesforce Manufacturing Cloud is a CRM built specifically for manufacturers — combining Sales Cloud's opportunity management with account-based forecasting, sales agreements, and a connected view of production and dealer data. It gives sales, service, and operations teams a single source of truth instead of separate spreadsheets and disconnected ERP reports.",
  points: [
    "Account-based forecasting that reconciles run-rate and sales agreement data automatically",
    "Sales agreements that track committed volume against actual orders in real time",
    "Order and inventory visibility shared across sales, service, and production teams",
    "A connected foundation for Data Cloud, Agentforce, and AI-powered manufacturing intelligence",
  ],
  illo: Images.illoManufacturingEcosystem,
};

const COMPARISON = {
  eyebrow: "Manufacturing Challenges",
  heading: "Manufacturing Challenges vs. Salesforce Manufacturing Cloud",
  intro: "Side by side, the gap between spreadsheet-driven manufacturing operations and a connected Manufacturing Cloud implementation is hard to ignore.",
  illo: Images.illoProductionScheduling,
  rows: [
    { label: "Forecast Accuracy", traditional: "Manual spreadsheets, reconciled monthly", solution: "Account-Based Forecasting with AI-adjusted projections" },
    { label: "Inventory Visibility", traditional: "Disconnected from sales and dealer data", solution: "Real-time order and inventory visibility across the network" },
    { label: "Dealer Visibility", traditional: "Phone calls and email updates", solution: "A connected Dealer Portal with shared pipeline data" },
    { label: "Production Timing", traditional: "Scheduled independent of real demand", solution: "Production planning synced to real demand signals" },
    { label: "System Silos", traditional: "CRM, ERP, and service data kept separate", solution: "Customer 360 unifying sales, service, and production data" },
    { label: "Supply Chain Risk", traditional: "Disruptions discovered after the fact", solution: "Supply chain collaboration with early-warning signals" },
    { label: "Customer Collaboration", traditional: "No shared visibility for partners", solution: "Partner Collaboration and Experience Cloud portals" },
  ],
};

const WHY_MIRKETA = {
  eyebrow: "Why Choose Mirketa",
  heading: "A Manufacturing Cloud Partner That Understands the Plant Floor",
  intro: "Hundreds of partners can configure Manufacturing Cloud. Fewer can tie every decision back to a measurable production and revenue outcome.",
  items: [
    { icon: Ico.award, title: "Salesforce Expertise", description: "A Salesforce Summit Partner with a verified delivery track record across the platform." },
    { icon: Ico.factory, title: "Manufacturing Domain Knowledge", description: "Deep experience across discrete, process, and industrial equipment manufacturers." },
    { icon: Ico.compass, title: "Certified Consultants", description: "Every consultant holds active Manufacturing Cloud and Platform certifications." },
    { icon: Ico.bolt, title: "Proven Accelerators", description: "Pre-built frameworks that cut implementation time without cutting quality." },
    { icon: Ico.document, title: "Proven Implementation Methodology", description: "A structured, sprint-based delivery framework refined across hundreds of projects." },
    { icon: Ico.plug, title: "Integration Capabilities", description: "Deep experience connecting Manufacturing Cloud to ERP, MES, and PLM systems." },
    { icon: Ico.headset, title: "Ongoing Support", description: "A dedicated team keeping your Manufacturing Cloud org healthy long after go-live." },
  ],
};

const FEATURES = {
  eyebrow: "Core Manufacturing Cloud Features",
  heading: "Every Manufacturing Cloud Capability, Configured to Perform",
  intro: "We configure each capability around your sales agreements, production data, and dealer network — not a generic template.",
  items: [
    { title: "Account-Based Forecasting", description: "Run-rate and sales agreement data reconciled into one forecast.", benefit: "38% better forecast accuracy", illo: Images.illoAccountBasedForecasting },
    { title: "Sales Agreements", description: "Committed volume tracked against actual orders in real time.", benefit: "Fewer missed commitments" },
    { title: "Manufacturing Intelligence", description: "AI-driven insights surfaced directly on the account record.", benefit: "Faster, data-backed decisions" },
    { title: "Production Planning", description: "Production schedules synced to real demand signals.", benefit: "Fewer production delays", illo: Images.illoProductionPlanning },
    { title: "Partner Collaboration", description: "Shared visibility for distributors and channel partners.", benefit: "Higher partner engagement" },
    { title: "Dealer Portal", description: "A connected portal giving dealers real-time pipeline access.", benefit: "41% higher dealer engagement", illo: Images.illoDealerPortal },
    { title: "Opportunity Management", description: "Every deal tracked from quote through fulfillment." },
    { title: "Order Visibility", description: "Real-time order status shared across sales and service." },
    { title: "Customer 360", description: "Sales, service, and production data in one unified view." },
    { title: "AI Insights", description: "Einstein-powered signals that flag risk and opportunity." },
    { title: "Manufacturing Analytics", description: "Real-time dashboards on sales, production, and dealer performance." },
    { title: "Asset Visibility", description: "Installed base and equipment data connected to the account." },
  ],
};

const SOLUTIONS = {
  eyebrow: "Manufacturing Solutions",
  heading: "Manufacturing Cloud Expertise Across Every Sub-Vertical",
  intro: "Production models and go-to-market motions differ sharply across manufacturing sub-verticals — we bring specific context to every engagement.",
  items: [
    { icon: Ico.factory, title: "Discrete Manufacturing" },
    { icon: Ico.gear, title: "Process Manufacturing" },
    { icon: Ico.box, title: "Industrial Equipment" },
    { icon: Ico.car, title: "Automotive" },
    { icon: Ico.chip, title: "Electronics" },
    { icon: Ico.cross, title: "Medical Devices" },
    { icon: Ico.plane, title: "Aerospace" },
    { icon: Ico.cart, title: "Consumer Goods" },
    { icon: Ico.chip, title: "High Tech Manufacturing" },
  ],
};

const AI_MANUFACTURING = {
  eyebrow: "AI-Powered Manufacturing",
  heading: "How AI Makes Every Forecast and Order Smarter",
  intro: "AI in Manufacturing Cloud isn't a bolt-on feature — configured correctly, it becomes the layer that flags risk, recommends reorders, and keeps forecasts honest.",
  illo: Images.illoAiReorderRecommendation,
  items: [
    { icon: Ico.robot, title: "Agentforce", description: "Autonomous agents that handle routine dealer and order questions." },
    { icon: Ico.sparkle, title: "Einstein AI", description: "Native AI trained on your own account and production data." },
    { icon: Ico.chartUp, title: "Predictive Analytics", description: "Demand and risk patterns surfaced before they show up in a report." },
    { icon: Ico.target, title: "AI Forecasting", description: "Forecasts adjusted continuously against real order and production data." },
    { icon: Ico.eye, title: "AI Recommendations", description: "Next-best-action guidance surfaced directly on the account record." },
    { icon: Ico.gear, title: "Manufacturing Automation", description: "Flow-driven approvals and order workflows with zero manual steps." },
    { icon: Ico.sparkle, title: "Generative AI", description: "Einstein GPT drafts account summaries and dealer communications." },
    { icon: Ico.network, title: "Intelligent Supply Chain", description: "Early-warning signals flag disruption risk before it hits production." },
  ],
};

const PROCESS = {
  eyebrow: "Implementation Methodology",
  heading: "A Structured Path From Discovery to Go-Live",
  intro: "No surprises, no scope creep. Our Manufacturing Cloud delivery framework has been refined across hundreds of implementations.",
  steps: [
    { name: "Discovery", description: "We map your current sales, production, and dealer processes." },
    { name: "Business Assessment", description: "A structured audit of forecasting, order, and data gaps." },
    { name: "Solution Design", description: "Data model and integration architecture, fully documented." },
    { name: "Configuration", description: "Core Manufacturing Cloud setup — accounts, agreements, forecasts." },
    { name: "Integrations", description: "Connecting Manufacturing Cloud to ERP, MES, and PLM systems." },
    { name: "Testing", description: "UAT, regression testing, and security review before go-live." },
    { name: "User Training", description: "Role-based training so sales and ops teams are productive on day one." },
    { name: "Go-live", description: "Structured cutover with go-live support on-site or remote." },
    { name: "Continuous Optimization", description: "Hypercare and ongoing optimization after launch." },
  ],
};

const INTEGRATIONS = {
  eyebrow: "Integrations",
  heading: "Manufacturing Cloud Integrates With the Systems You Already Run",
  intro: "Production and order data are only as useful as the systems they reach. We connect Manufacturing Cloud to the platforms your operations teams already rely on.",
  items: [
    { icon: Ico.cloud, title: "SAP" },
    { icon: Ico.cloud, title: "Oracle ERP" },
    { icon: Ico.cloud, title: "Microsoft Dynamics" },
    { icon: Ico.cloud, title: "NetSuite" },
    { icon: Ico.gear, title: "MES" },
    { icon: Ico.layers, title: "PLM" },
    { icon: Ico.network, title: "IoT Platforms" },
    { icon: Ico.layers, title: "Data Cloud" },
    { icon: Ico.plug, title: "MuleSoft" },
    { icon: Ico.chartUp, title: "Tableau" },
    { icon: Ico.headset, title: "Service Cloud" },
    { icon: Ico.globe, title: "Experience Cloud" },
  ],
};

const BUSINESS_OUTCOMES = {
  eyebrow: "Business Outcomes",
  heading: "What a Properly Configured Manufacturing Cloud Delivers",
  intro: "These are the outcomes our manufacturing clients report after their Manufacturing Cloud engagement — not vanity metrics.",
  stats: [
    { value: "34%", label: "Revenue Growth" },
    { value: "92%", label: "Forecast Accuracy" },
    { value: "28%", label: "Faster Sales Cycles" },
    { value: "22%", label: "Reduced Operational Costs" },
    { value: "96%", label: "Customer Satisfaction" },
    { value: "41%", label: "Higher Dealer Engagement" },
    { value: "3.2x", label: "Better Supply Chain Visibility" },
    { value: "37%", label: "Increased Productivity" },
  ],
};

const CASE_STUDIES = {
  eyebrow: "Customer Success Stories",
  heading: "Real Manufacturing Cloud Outcomes From Real Deployments",
  intro: "Anonymized results from recent Manufacturing Cloud engagements across industrial sub-verticals.",
  cases: [
    {
      title: "Discrete Manufacturer Improves Forecast Accuracy by 38%",
      industry: "Discrete Manufacturing",
      challenge: "Sales forecasts were built in spreadsheets with no connection to actual sales agreement or production data.",
      solution: "We implemented Account-Based Forecasting reconciled against real-time sales agreements and order history.",
      outcome: "Leadership now has one trusted forecast number instead of three conflicting spreadsheets.",
      metrics: [{ value: "38%", label: "Better Forecast Accuracy" }, { value: "2.1x", label: "Pipeline Visibility" }, { value: "29%", label: "Faster Sales Cycles" }],
    },
    {
      title: "Industrial Equipment OEM Increases Dealer Engagement by 44%",
      industry: "Industrial Equipment",
      challenge: "Dealers had no shared visibility into order status, inventory, or program pricing.",
      solution: "We deployed a connected Dealer Portal on Experience Cloud tied directly to Manufacturing Cloud data.",
      outcome: "Dealers now self-serve order and inventory status instead of calling for updates.",
      metrics: [{ value: "44%", label: "Higher Dealer Engagement" }, { value: "31%", label: "Fewer Support Calls" }, { value: "4.6★", label: "Dealer Satisfaction" }],
    },
    {
      title: "Automotive Supplier Cuts Production Delays by 26%",
      industry: "Automotive",
      challenge: "Production scheduling ran independently of real sales demand, causing frequent delays and overstock.",
      solution: "We connected production planning to live demand signals from Manufacturing Cloud and supply chain partners.",
      outcome: "Production schedules now adjust automatically as real demand shifts.",
      metrics: [{ value: "26%", label: "Fewer Production Delays" }, { value: "19%", label: "Lower Inventory Costs" }, { value: "33%", label: "Higher On-Time Delivery" }],
    },
  ],
};

const TESTIMONIALS = [
  { quote: "Our forecast used to be three different spreadsheets that never agreed with each other. Now sales, finance, and operations look at the same number, and it's actually right.", name: "Daniel Osei", role: "VP of Sales Operations, industrial equipment manufacturer" },
  { quote: "The dealer portal alone changed our relationship with our channel. Dealers stopped calling for order status because they can just see it themselves.", name: "Marisol Vega", role: "Director of Channel Sales" },
  { quote: "Mirketa understood our production constraints, not just Salesforce configuration. That's the difference between a CRM that looks good in a demo and one that actually works on the floor.", name: "Tom Whitfield", role: "COO, automotive supplier" },
  { quote: "We evaluated three Salesforce partners and Mirketa was the only one who asked about our sales agreements before talking about features.", name: "Grace Lindqvist", role: "CIO, discrete manufacturer" },
];

const FAQS = [
  { q: "What is Salesforce Manufacturing Cloud?", a: "Salesforce Manufacturing Cloud is a CRM built specifically for manufacturers, combining account-based forecasting, sales agreements, and a connected view of production and dealer data with standard Sales and Service Cloud capabilities." },
  { q: "What does Salesforce Manufacturing Cloud consulting include?", a: "Our Manufacturing Cloud consulting starts with a discovery phase that maps your current sales, production, and dealer processes. From there we deliver a prioritized roadmap covering implementation, forecasting, and integration — each recommendation tied to a measurable business outcome." },
  { q: "How is Salesforce Manufacturing Cloud licensed?", a: "Manufacturing Cloud is licensed per user, typically layered on top of Sales Cloud or Service Cloud licenses. We help you scope the right license mix and user count based on your actual sales, service, and operations team structure." },
  { q: "What systems can Manufacturing Cloud integrate with?", a: "We integrate Manufacturing Cloud with ERP systems including SAP, Oracle, Microsoft Dynamics, and NetSuite, along with MES, PLM, and IoT platforms, using MuleSoft or REST APIs so order and production data flow without manual re-entry." },
  { q: "How long does a Manufacturing Cloud implementation take?", a: "A focused implementation for a single sales or dealer team typically takes 8–12 weeks. Multi-entity deployments with complex ERP and MES integration can take 4–6 months, depending on scope." },
  { q: "What ROI can we expect from Manufacturing Cloud?", a: "Clients typically see improved forecast accuracy, faster sales cycles, and higher dealer engagement within the first two quarters after go-live. We tie every engagement to specific, measurable KPIs agreed during discovery, not generic industry benchmarks." },
  { q: "Can you migrate our existing CRM or spreadsheets into Manufacturing Cloud?", a: "Yes. We migrate account, opportunity, and sales agreement data from legacy CRMs and spreadsheets, including deduplication and validation, so you start on Manufacturing Cloud with a trustworthy foundation." },
  { q: "Do you offer support after go-live?", a: "Yes. Every implementation includes a structured hypercare period immediately after go-live, plus role-based training. Clients can transition into an ongoing managed services retainer for continued support and optimization." },
  { q: "What AI capabilities are available in Manufacturing Cloud?", a: "Manufacturing Cloud includes Einstein AI for forecasting and account insights, alongside Agentforce for autonomous dealer and order support — all trained on your own sales and production data rather than a generic model." },
  { q: "Are you a certified Salesforce Manufacturing Cloud partner?", a: "Yes. Mirketa is a Salesforce Summit Partner with consultants holding active Manufacturing Cloud and Platform certifications, backed by a track record across hundreds of Salesforce engagements." },
  { q: "Can Manufacturing Cloud support dealer and distributor management?", a: "Yes. Manufacturing Cloud, paired with Experience Cloud, gives dealers and distributors a connected portal for order status, inventory visibility, and program pricing, without giving them access to your full Salesforce org." },
  { q: "How secure is data inside Salesforce Manufacturing Cloud?", a: "Manufacturing Cloud runs on Salesforce's enterprise-grade infrastructure with field-level security, role-based access, and full audit trails. We layer on org-specific security reviews and permission design aligned to your compliance requirements." },
];

const FINAL_CTA = {
  heading: "Ready to Connect Your Manufacturing Operations With Salesforce?",
  description: "Partner with Mirketa's Salesforce experts to unify sales planning, demand forecasting, and dealer management — or speak with a manufacturing expert and request a tailored consultation before you commit to a roadmap.",
  primaryCta: { label: "Book a Manufacturing Assessment", href: "#contact" },
  secondaryCta: { label: "Schedule a Demo", href: "#contact" },
};

const SEO = {
  title: "Salesforce Manufacturing Cloud Consulting & Implementation | Mirketa",
  description:
    "Mirketa's certified Salesforce consultants deliver Manufacturing Cloud implementation, account-based forecasting, dealer management, and AI-powered manufacturing intelligence.",
  canonical: "https://mirketa.us/manufacturing/",
  keywords: [
    "Salesforce Manufacturing Cloud",
    "Salesforce Manufacturing Cloud Consulting",
    "Salesforce Manufacturing Cloud Implementation",
    "Manufacturing CRM",
    "Manufacturing Digital Transformation",
    "Smart Manufacturing",
    "Industrial CRM",
    "Manufacturing Automation",
    "Manufacturing Analytics",
    "Connected Manufacturing",
    "Dealer Management Software",
    "Sales Forecasting",
    "Manufacturing AI",
    "Salesforce Manufacturing Partner",
    "Manufacturing ERP Integration",
    "Manufacturing Customer 360",
  ],
  schema: [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "Salesforce Manufacturing Cloud Consulting and Implementation Services",
      provider: { "@type": "Organization", name: "Mirketa Inc.", url: "https://mirketa.us" },
      name: "Salesforce Manufacturing Cloud Consulting & Implementation",
      description:
        "End-to-end Salesforce Manufacturing Cloud consulting, implementation, account-based forecasting, dealer management, and AI-powered manufacturing intelligence.",
      areaServed: "Global",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://mirketa.us/" },
        { "@type": "ListItem", position: 2, name: "Platforms & Technology", item: "https://mirketa.us/salesforce" },
        { "@type": "ListItem", position: 3, name: "Salesforce Clouds", item: "https://mirketa.us/salesforce" },
        { "@type": "ListItem", position: 4, name: "Manufacturing Cloud", item: "https://mirketa.us/manufacturing/" },
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

export default function ManufacturingCloud() {
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
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (heroTextRef.current) {
        gsap.from(heroTextRef.current.children, {
          opacity: prefersReduced ? 1 : 0,
          y: prefersReduced ? 0 : 28,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
        });
      }

      gsap.utils.toArray(".mfc-reveal").forEach((el) => {
        gsap.from(el, {
          opacity: prefersReduced ? 1 : 0,
          y: prefersReduced ? 0 : 32,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      gsap.utils.toArray(".mfc-reveal-stagger").forEach((el) => {
        gsap.from(el.children, {
          opacity: prefersReduced ? 1 : 0,
          y: prefersReduced ? 0 : 26,
          duration: 0.6,
          stagger: 0.06,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      gsap.utils.toArray(".mfc-zoom-in").forEach((el) => {
        gsap.from(el, {
          opacity: prefersReduced ? 1 : 0,
          scale: prefersReduced ? 1 : 0.94,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="salesforce-manufacturing-cloud">
      <Seo {...SEO} />
      <HeroSection heroTextRef={heroTextRef} heroRef={heroRef} />
      <TrustedBySection />
      <ExplainerSection />
      <ComparisonSection />
      <WhyMirketaSection />
      <FeaturesSection />
      <SolutionsSection />
      <AiManufacturingSection />
      <ProcessSection />
      <IntegrationsSection />
      <BusinessOutcomesSection />
      <CaseStudiesSection />
      <TestimonialsSection />
      <FaqSection />
      <FinalCtaSection />
      <ConsultationSection
        eyebrow="Get Started"
        heading="Talk to a Manufacturing Cloud Expert"
        description="Tell us about your sales agreements and demand forecasting goals — a Manufacturing Cloud expert will follow up within one business day."
        formTitle="Talk to a Manufacturing Cloud Expert"
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
    <div className={`mfc-sticky-cta ${visible ? "is-visible" : ""}`} aria-hidden={!visible}>
      <a href="#contact" className="btn btn-primary mfc-btn" tabIndex={visible ? 0 : -1}>
        Book a Manufacturing Assessment <span aria-hidden="true">→</span>
      </a>
    </div>
  );
}

// ============================================================
// HERO
// ============================================================

function HeroSection({ heroTextRef, heroRef }) {
  return (
    <section ref={heroRef} className="mfc-hero" style={{ backgroundImage: `url("${Images.heroManufacturingCloud}")` }} aria-label="Salesforce Manufacturing Cloud by Mirketa">
      <div className="mfc-hero__scrim" />
      <div className="container">
        <Breadcrumb items={BREADCRUMB} className="mfc-breadcrumb" />
        <div className="mfc-hero__inner">
          <div ref={heroTextRef} className="mfc-hero__text">
            <span className="mfc-badge">
              <span aria-hidden="true">✦</span> {HERO.badge}
            </span>
            <h1>{HERO.title}</h1>
            <p className="mfc-hero__description">{HERO.description}</p>
            <div className="mfc-hero__ctas">
              <a href={HERO.primaryCta.href} className="btn btn-primary mfc-btn">
                {HERO.primaryCta.label} <span aria-hidden="true">→</span>
              </a>
              <a href={HERO.secondaryCta.href} className="btn btn-secondary mfc-btn">
                {HERO.secondaryCta.label}
              </a>
            </div>
            <ul className="mfc-hero__metrics">
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
            className="mfc-hero__visual"
          />
        </div>
      </div>
    </section>
  );
}

// ============================================================
// TRUSTED BY MANUFACTURERS
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
    <section className="mfc-trusted" aria-label="Trusted by manufacturers">
      <div className="container mfc-trusted__inner">
        <p className="mfc-trusted__label">Trusted by Manufacturers</p>
        <div className="mfc-trusted__track" role="list">
          <div className="mfc-trusted__marquee">
            {loop.map((b, i) => (
              <div className="mfc-trusted__badge" role="listitem" key={`${b.label}-${i}`}>
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
// WHAT IS SALESFORCE MANUFACTURING CLOUD?
// ============================================================

function ExplainerSection() {
  return (
    <section className="section mfc-explainer" aria-labelledby="mfc-explainer-heading">
      <div className="container mfc-explainer__grid">
        <div className="mfc-explainer__text mfc-reveal">
          <p className="mfc-eyebrow">{EXPLAINER.eyebrow}</p>
          <h2 id="mfc-explainer-heading">{EXPLAINER.heading}</h2>
          <p>{EXPLAINER.paragraph}</p>
          <ul className="mfc-explainer__points">
            {EXPLAINER.points.map((p) => (
              <li key={p}>
                <span aria-hidden="true">{Ico.check}</span>
                {p}
              </li>
            ))}
          </ul>
        </div>
        <img src={EXPLAINER.illo} alt="" aria-hidden="true" className="mfc-explainer__illo mfc-zoom-in" loading="lazy" />
      </div>
    </section>
  );
}

// ============================================================
// MANUFACTURING CHALLENGES — comparison
// ============================================================

function ComparisonSection() {
  return (
    <section className="section mfc-comparison" aria-labelledby="mfc-comparison-heading">
      <div className="container">
        <div className="mfc-comparison__head mfc-reveal">
          <div className="section-heading">
            <p className="mfc-eyebrow">{COMPARISON.eyebrow}</p>
            <h2 id="mfc-comparison-heading">{COMPARISON.heading}</h2>
            <p>{COMPARISON.intro}</p>
          </div>
          <img src={COMPARISON.illo} alt="" aria-hidden="true" className="mfc-comparison__illo" loading="lazy" />
        </div>
        <div className="mfc-comparison__table mfc-reveal-stagger">
          <div className="mfc-comparison__row mfc-comparison__row--head">
            <span></span>
            <span>Manufacturing Challenge</span>
            <span>Salesforce Manufacturing Cloud</span>
          </div>
          {COMPARISON.rows.map((r) => (
            <div className="mfc-comparison__row" key={r.label}>
              <span className="mfc-comparison__label">{r.label}</span>
              <span className="mfc-comparison__cell mfc-comparison__cell--traditional">
                <span aria-hidden="true">{Ico.cross}</span> {r.traditional}
              </span>
              <span className="mfc-comparison__cell mfc-comparison__cell--solution">
                <span aria-hidden="true">{Ico.check}</span> {r.solution}
              </span>
            </div>
          ))}
        </div>
        <div className="mfc-section-cta mfc-reveal">
          <a href="#contact" className="btn btn-primary mfc-btn">
            See Your Challenges Solved <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// WHY CHOOSE MIRKETA
// ============================================================

function WhyMirketaSection() {
  return (
    <section className="section mfc-why" aria-labelledby="mfc-why-heading">
      <div className="container">
        <div className="section-heading mfc-reveal">
          <p className="mfc-eyebrow">{WHY_MIRKETA.eyebrow}</p>
          <h2 id="mfc-why-heading">{WHY_MIRKETA.heading}</h2>
          <p>{WHY_MIRKETA.intro}</p>
        </div>
        <div className="mfc-why__grid mfc-reveal-stagger">
          {WHY_MIRKETA.items.map((w) => (
            <div className="mfc-why-card" key={w.title}>
              <span className="mfc-why-card__icon">{w.icon}</span>
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
// CORE MANUFACTURING CLOUD FEATURES
// ============================================================

function FeaturesSection() {
  return (
    <section className="section mfc-features" id="services" aria-labelledby="mfc-features-heading">
      <div className="container">
        <div className="section-heading mfc-reveal">
          <p className="mfc-eyebrow">{FEATURES.eyebrow}</p>
          <h2 id="mfc-features-heading">{FEATURES.heading}</h2>
          <p>{FEATURES.intro}</p>
        </div>
        <div className="mfc-features__grid mfc-reveal-stagger">
          {FEATURES.items.map((f) => (
            <div className="mfc-feature-card" key={f.title}>
              {f.illo ? (
                <img src={f.illo} alt="" aria-hidden="true" className="mfc-feature-card__illo" loading="lazy" />
              ) : (
                <span className="mfc-feature-card__check" aria-hidden="true">{Ico.check}</span>
              )}
              <h3>{f.title}</h3>
              <p>{f.description}</p>
              {f.benefit && <p className="mfc-feature-card__benefit">{f.benefit}</p>}
              <a href="#contact" className="mfc-feature-card__link">
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
// MANUFACTURING SOLUTIONS
// ============================================================

function SolutionsSection() {
  return (
    <section className="section mfc-solutions" aria-labelledby="mfc-solutions-heading">
      <div className="container">
        <div className="section-heading mfc-reveal">
          <p className="mfc-eyebrow">{SOLUTIONS.eyebrow}</p>
          <h2 id="mfc-solutions-heading">{SOLUTIONS.heading}</h2>
          <p>{SOLUTIONS.intro}</p>
        </div>
        <div className="mfc-solutions__grid mfc-reveal-stagger">
          {SOLUTIONS.items.map((s) => (
            <div className="mfc-solution-card" key={s.title}>
              <span className="mfc-solution-card__icon">{s.icon}</span>
              <h3>{s.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// AI-POWERED MANUFACTURING
// ============================================================

function AiManufacturingSection() {
  return (
    <section className="section mfc-ai" aria-labelledby="mfc-ai-heading">
      <div className="container">
        <div className="mfc-ai__head mfc-reveal">
          <div className="section-heading">
            <p className="mfc-eyebrow">{AI_MANUFACTURING.eyebrow}</p>
            <h2 id="mfc-ai-heading">{AI_MANUFACTURING.heading}</h2>
            <p>{AI_MANUFACTURING.intro}</p>
          </div>
          <img src={AI_MANUFACTURING.illo} alt="" aria-hidden="true" className="mfc-ai__illo" loading="lazy" />
        </div>
        <div className="mfc-ai__grid mfc-reveal-stagger">
          {AI_MANUFACTURING.items.map((a) => (
            <div className="mfc-ai-card" key={a.title}>
              <span className="mfc-ai-card__icon">{a.icon}</span>
              <h3>{a.title}</h3>
              <p>{a.description}</p>
            </div>
          ))}
        </div>
        <div className="mfc-ai__cta mfc-reveal">
          <Link to="/agentforce" className="btn btn-primary mfc-btn">
            Explore Agentforce <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// IMPLEMENTATION METHODOLOGY
// ============================================================

function ProcessSection() {
  return (
    <section className="section mfc-process" aria-labelledby="mfc-process-heading">
      <div className="container">
        <div className="section-heading mfc-reveal">
          <p className="mfc-eyebrow">{PROCESS.eyebrow}</p>
          <h2 id="mfc-process-heading">{PROCESS.heading}</h2>
          <p>{PROCESS.intro}</p>
        </div>
        <div className="mfc-process__rail mfc-reveal-stagger">
          {PROCESS.steps.map((p, i) => (
            <div className="mfc-step-card" key={p.name}>
              <span className="mfc-step-card__num">{String(i + 1).padStart(2, "0")}</span>
              <h3>{p.name}</h3>
              <p>{p.description}</p>
              {i < PROCESS.steps.length - 1 && <span className="mfc-step-card__arrow" aria-hidden="true">→</span>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// INTEGRATIONS
// ============================================================

function IntegrationsSection() {
  return (
    <section className="section mfc-integrations" aria-labelledby="mfc-integrations-heading">
      <div className="container">
        <div className="section-heading mfc-reveal">
          <p className="mfc-eyebrow">{INTEGRATIONS.eyebrow}</p>
          <h2 id="mfc-integrations-heading">{INTEGRATIONS.heading}</h2>
          <p>{INTEGRATIONS.intro}</p>
        </div>
        <div className="mfc-integrations__grid mfc-reveal-stagger">
          {INTEGRATIONS.items.map((i) => (
            <div className="mfc-integration-card" key={i.title}>
              <span className="mfc-integration-card__icon">{i.icon}</span>
              <h3>{i.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// BUSINESS OUTCOMES
// ============================================================

function AnimatedCounter({ value, label }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const match = value.match(/^([\d.]+)(.*)$/);
    if (!match) {
      setDisplay(value);
      return;
    }
    const target = parseFloat(match[1]);
    const suffix = match[2];
    const isDecimal = match[1].includes(".");

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setDisplay(value);
      return;
    }

    let hasStarted = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          hasStarted = true;
          const duration = 1400;
          const startTime = performance.now();
          const step = (now) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const current = target * progress;
            setDisplay((isDecimal ? current.toFixed(1) : Math.floor(current)) + suffix);
            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              setDisplay(value);
            }
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div className="mfc-outcome-stat" ref={ref}>
      <strong>{display}</strong>
      <span>{label}</span>
    </div>
  );
}

function BusinessOutcomesSection() {
  return (
    <section className="mfc-outcomes" aria-label="Manufacturing Cloud business outcomes">
      <div className="container">
        <div className="section-heading mfc-outcomes__heading mfc-reveal">
          <p className="mfc-eyebrow">{BUSINESS_OUTCOMES.eyebrow}</p>
          <h2>{BUSINESS_OUTCOMES.heading}</h2>
          <p>{BUSINESS_OUTCOMES.intro}</p>
        </div>
        <div className="mfc-outcomes__grid mfc-reveal-stagger">
          {BUSINESS_OUTCOMES.stats.map((s) => (
            <AnimatedCounter key={s.label} value={s.value} label={s.label} />
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
    <section className="section mfc-cases" aria-labelledby="mfc-cases-heading">
      <div className="container">
        <div className="section-heading mfc-reveal">
          <p className="mfc-eyebrow">{CASE_STUDIES.eyebrow}</p>
          <h2 id="mfc-cases-heading">{CASE_STUDIES.heading}</h2>
          <p>{CASE_STUDIES.intro}</p>
        </div>
        <div className="mfc-cases__grid mfc-reveal-stagger">
          {CASE_STUDIES.cases.map((c) => (
            <div className="mfc-case-card" key={c.title}>
              <span className="mfc-case-card__tag">{c.industry}</span>
              <h3>{c.title}</h3>
              <dl className="mfc-case-card__fields">
                <div><dt>Challenge</dt><dd>{c.challenge}</dd></div>
                <div><dt>Solution</dt><dd>{c.solution}</dd></div>
                <div><dt>Outcome</dt><dd>{c.outcome}</dd></div>
              </dl>
              <div className="mfc-case-card__metrics">
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
    <section className="section mfc-testimonials" aria-labelledby="mfc-testimonials-heading">
      <div className="container">
        <div className="section-heading mfc-reveal">
          <p className="mfc-eyebrow">Testimonials</p>
          <h2 id="mfc-testimonials-heading">What Our Clients Say About Their Manufacturing Cloud Results</h2>
        </div>
        <div className="mfc-testimonials__grid mfc-reveal-stagger">
          {TESTIMONIALS.map((t) => (
            <figure className="mfc-testimonial-card" key={t.name}>
              <img src={Images.iconQuote} alt="" aria-hidden="true" className="mfc-testimonial-card__mark" />
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
    <section className="section mfc-faq" aria-labelledby="mfc-faq-heading">
      <div className="container">
        <div className="section-heading mfc-reveal">
          <p className="mfc-eyebrow">FAQ</p>
          <h2 id="mfc-faq-heading">Frequently Asked Questions About Salesforce Manufacturing Cloud</h2>
        </div>
        <div className="mfc-faq__search-wrap mfc-reveal">
          <label htmlFor="mfc-faq-search" className="visually-hidden">
            Search frequently asked questions
          </label>
          <input
            id="mfc-faq-search"
            type="search"
            className="mfc-faq__search"
            placeholder="Ask a question — e.g. &quot;pricing&quot;, &quot;integrations&quot;, &quot;AI&quot;..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpenIndex(-1);
            }}
          />
        </div>
        <div className="mfc-faq__list mfc-reveal">
          {filtered.length === 0 ? (
            <p className="mfc-faq__empty">No questions match &ldquo;{query}&rdquo;. Try a different search term.</p>
          ) : (
            filtered.map((item, i) => {
              const open = openIndex === i;
              const panelId = `mfc-faq-panel-${i}`;
              return (
                <div className={`mfc-faq-item ${open ? "is-open" : ""}`} key={item.q}>
                  <button type="button" className="mfc-faq-item__question" aria-expanded={open} aria-controls={panelId} onClick={() => setOpenIndex(open ? -1 : i)}>
                    <span>{item.q}</span>
                    <span className="mfc-faq-item__icon" aria-hidden="true">{open ? "−" : "+"}</span>
                  </button>
                  <div id={panelId} className="mfc-faq-item__answer" role="region" hidden={!open}>
                    <p>{item.a}</p>
                  </div>
                </div>
              );
            })
          )}
        </div>
        <p className="mfc-faq__links">
          Related reading: <Link to="/salesforce-consulting-development-services">Salesforce Development & Consulting</Link>,{" "}
          <Link to="/salesforce">Salesforce Clouds</Link>,{" "}
          <Link to="/salesforce/sales-cloud">Sales Cloud</Link>,{" "}
          <Link to="/salesforce/service-cloud">Service Cloud</Link>,{" "}
          <Link to="/data-cloud">Data Cloud</Link>, <Link to="/ai-consulting">AI Consulting</Link>,{" "}
          <Link to="/agentforce">Agentforce</Link>, <a href="#services">Integration Services</a>.
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
    <section className="mfc-final-cta mfc-reveal" aria-labelledby="mfc-final-cta-heading">
      <div className="container mfc-final-cta__inner">
        <h2 id="mfc-final-cta-heading">{FINAL_CTA.heading}</h2>
        <p>{FINAL_CTA.description}</p>
        <div className="mfc-final-cta__ctas">
          <a href={FINAL_CTA.primaryCta.href} className="btn btn-primary mfc-btn">
            {FINAL_CTA.primaryCta.label} <span aria-hidden="true">→</span>
          </a>
          <a href={FINAL_CTA.secondaryCta.href} className="btn btn-secondary mfc-btn">
            {FINAL_CTA.secondaryCta.label}
          </a>
        </div>
        <Link to="/salesforce" className="mfc-final-cta__all-services">
          Explore All Salesforce Clouds →
        </Link>
      </div>
    </section>
  );
}
