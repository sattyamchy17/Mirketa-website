import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Images } from "../../assets/images/index.js";
import Seo from "../../components/Seo/Seo.jsx";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb.jsx";
import ConsultationSection from "../../components/ConsultationSection/ConsultationSection.jsx";
import heroBg from "../../assets/images/netsuite-ai/hero-bg.svg";
import heroIllustration from "../../assets/images/netsuite-ai/hero-illustration.svg";
import overviewImg from "../../assets/images/netsuite-ai/overview.svg";
import erpDashboardImg from "../../assets/changes/netsuite-ai/netsuite_erp_intelligence_right_section.webp";
import automationImg from "../../assets/images/netsuite-ai/automation.svg";
import analyticsImg from "../../assets/images/netsuite-ai/analytics.svg";
import forecastingImg from "../../assets/images/netsuite-ai/forecasting.svg";
import integrationImg from "../../assets/images/netsuite-ai/integration.svg";
import ctaImg from "../../assets/images/netsuite-ai/cta.svg";
import "./NetSuiteAI.css";

gsap.registerPlugin(ScrollTrigger);

// ============================================================
// ICONS — small inline SVGs for component-local iconography
// (page-specific glyphs; the 11 illustrations above are the
// only file-based images per this page's asset spec)
// ============================================================

const Ico = {
  search: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="10" cy="10" r="6.5" stroke="currentColor" strokeWidth="1.5" /><path d="M19 19l-4.5-4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
  ),
  handshake: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 12l4-4 4 3 3-3 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M7 16l3 2 3-2 4 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  chartUp: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 19V13M10 19V8M16 19v-5M20 19V5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
  ),
  gauge: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 16a8 8 0 1116 0" stroke="currentColor" strokeWidth="1.5" /><path d="M12 16l4.5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /><circle cx="12" cy="16" r="1.3" fill="currentColor" /></svg>
  ),
  robot: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="5" y="9" width="14" height="10" rx="3" stroke="currentColor" strokeWidth="1.5" /><path d="M12 5v4M9 14h.01M15 14h.01" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /><circle cx="12" cy="4" r="1.4" fill="currentColor" /></svg>
  ),
  workflow: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="4" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" /><rect x="14" y="13" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" /><path d="M10 7.5h4a3 3 0 013 3V14" stroke="currentColor" strokeWidth="1.4" /></svg>
  ),
  report: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 3h9l3 3v15H6V3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="M9 13l2-2 2 2 3-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  plug: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 3v5M15 3v5M7 8h10v4a5 5 0 01-10 0V8z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="M12 17v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
  ),
  ledger: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 3h12v18H6V3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="M9 8h6M9 12h6M9 16h4" stroke="currentColor" strokeWidth="1.2" opacity="0.6" /></svg>
  ),
  invoice: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 3h10v18l-2-1.3L11 21l-2-1.3L7 21l-2-1.3V3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="M8 8h5M8 12h5" stroke="currentColor" strokeWidth="1.3" opacity="0.6" /></svg>
  ),
  truck: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 7h11v9H3V7z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="M14 11h4l3 3v2h-7v-5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><circle cx="7" cy="18" r="1.6" stroke="currentColor" strokeWidth="1.3" /><circle cx="17.5" cy="18" r="1.6" stroke="currentColor" strokeWidth="1.3" /></svg>
  ),
  cart: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 4h2l2.2 11h10.6L20 7H6.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /><circle cx="9" cy="20" r="1.3" fill="currentColor" /><circle cx="17" cy="20" r="1.3" fill="currentColor" /></svg>
  ),
  headset: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 13a8 8 0 0116 0v4" stroke="currentColor" strokeWidth="1.5" /><rect x="3" y="13" width="4" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4" /><rect x="17" y="13" width="4" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4" /></svg>
  ),
  target: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.4" /><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.3" opacity="0.6" /><circle cx="12" cy="12" r="1.2" fill="currentColor" /></svg>
  ),
  gears: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="9" cy="9" r="4" stroke="currentColor" strokeWidth="1.4" /><circle cx="16" cy="16" r="3" stroke="currentColor" strokeWidth="1.3" /></svg>
  ),
  presentation: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="4" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" /><path d="M8 20l4-4 4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /><path d="M7 12l3-3 3 2 4-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  lock: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="5" y="11" width="14" height="9" rx="2" stroke="currentColor" strokeWidth="1.5" /><path d="M8 11V7.5a4 4 0 018 0V11" stroke="currentColor" strokeWidth="1.5" /></svg>
  ),
  link: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 15l6-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /><path d="M11 6l1-1a4 4 0 015.5 5.5l-1 1M13 18l-1 1a4 4 0 01-5.5-5.5l1-1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
  ),
  checkArrow: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 12l5 5L20 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  map: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 4l-5 2v14l5-2 6 2 5-2V4l-5 2-6-2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M9 4v14M15 6v14" stroke="currentColor" strokeWidth="1.2" opacity="0.5" /></svg>
  ),
  database: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><ellipse cx="12" cy="5" rx="7" ry="2.5" stroke="currentColor" strokeWidth="1.4" /><path d="M5 5v14c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5V5" stroke="currentColor" strokeWidth="1.4" /></svg>
  ),
  flask: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 3h6M10 3v6l-5 9a2 2 0 002 3h10a2 2 0 002-3l-5-9V3" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  rocket: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 2c3 2 5 6 5 10-2 1-4 1-5 0-1 1-3 1-5 0 0-4 2-8 5-10z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M9 15l-3 5M15 15l3 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
  ),
  check: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12.5l5 5L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
};

// ============================================================
// DATA — content sourced verbatim from
// https://mirketa.us/netsuite-ai/
// ============================================================

const BREADCRUMB_ITEMS = [{ label: "Home", href: "/" }, { label: "NetSuite AI" }];

const HERO = {
  badge: "NetSuite AI Solutions",
  title: "Turn NetSuite into a smarter operating system for decisions, workflows, and growth.",
  description:
    "Mirketa helps finance, operations, supply chain, and technology teams apply AI where it actually matters: cleaner reporting, faster close cycles, sharper forecasting, governed AI agents, and less manual work across NetSuite ERP.",
  tagline: "Built for leaders who want AI inside NetSuite without breaking controls, integrations, or user trust.",
  primaryCta: { label: "Plan My NetSuite AI Roadmap", href: "#contact" },
  secondaryCta: { label: "Explore Business Use Cases", href: "#use-cases" },
};

const HERO_STATS = [
  { title: "Unified Perspective", note: "ERP, data, and workflow view across the full operating cycle" },
  { title: "Practical Roadmap", note: "Roadmap options for priority AI use cases" },
  { title: "5 Core Focus Areas", note: "Finance, operations, supply chain, service, and reporting" },
];

const TRUST_BADGES = [
  { icon: Images.clientSalesforce, label: "Salesforce Partner" },
  { icon: Images.clientSoc2, label: "SOC 2" },
  { icon: Images.clientHipaa, label: "HIPAA" },
  { icon: Images.clientEnterprise, label: "Enterprise Ready" },
];

const ERP_LAYER = {
  eyebrow: "ERP Intelligence Layer",
  heading: "Designed for enterprise NetSuite teams",
  loop: [
    { name: "Capture", note: "Live operational signals" },
    { name: "Reason", note: "Forecast confidence by business function, AI-reviewed" },
    { name: "Act", note: "Agent-ready answer, human approved" },
  ],
  scenario: [
    { label: "Exception spotted", text: "AI flags margin movement before the weekly review." },
    { label: "Agent-ready answer", text: "A governed assistant summarizes the NetSuite record trail." },
  ],
  services: ["ERP Automation", "Predictive Analytics", "AI Agents", "Integration Strategy", "Managed Optimization"],
};

const WHAT_WE_SOLVE = {
  eyebrow: "What We Solve",
  heading: "NetSuite AI consulting that starts with the business process, not the model.",
  intro: "Most NetSuite teams do not need another AI experiment. They need a reliable way to remove repeated work, explain numbers faster, surface risk earlier, and give users practical help inside the flow of work.",
  shifts: [
    { title: "From data to decisions", description: "Connect NetSuite records, reporting structures, and operating signals so leaders see what changed, why it matters, and what to do next." },
    { title: "From manual follow-up to intelligent automation", description: "Prioritize high-friction workflows such as approvals, invoice review, customer follow-up, procurement exceptions, and close support." },
    { title: "From AI hype to governed adoption", description: "Build with controls, role context, user adoption, integration hygiene, and measurable business value as first-class requirements." },
  ],
  executiveHeading: "A practical AI layer for the way NetSuite already runs your business.",
  executiveBody: "Oracle NetSuite's AI direction is rooted in unified ERP data, embedded assistance, analytics, recommendations, and extensibility. Mirketa helps translate those capabilities into a prioritized implementation plan that fits your processes, controls, integrations, and users.",
  benefits: [
    { icon: Ico.search, title: "Faster answers", description: "Reduce the time users spend searching across reports, records, notes, and spreadsheets." },
    { icon: Ico.handshake, title: "Cleaner handoffs", description: "Use AI-assisted workflows to reduce rework between finance, sales, operations, and service teams." },
    { icon: Ico.chartUp, title: "Better forecast discipline", description: "Bring predictive signals into planning conversations before surprises become escalations." },
  ],
};

const SERVICES = {
  eyebrow: "Services",
  heading: "NetSuite AI services built around the work your teams do every day.",
  intro: "Our role is to help you choose the right AI use cases, connect them safely to NetSuite, and keep improving them after launch.",
  items: [
    { icon: Ico.search, title: "NetSuite AI Readiness Assessment", description: "Evaluate data quality, process readiness, automation opportunities, security considerations, and practical ROI before committing to a build.", cta: "Start with readiness", badge: "Start Here", bullets: ["Data quality", "Process readiness", "Automation opportunities", "Security considerations", "Practical ROI"] },
    { icon: Ico.chartUp, title: "Predictive Analytics in NetSuite", description: "Improve forecasting, cash visibility, demand planning, inventory confidence, and variance analysis with practical models and business-friendly outputs.", cta: "Improve forecasts", bullets: ["Forecasting", "Cash visibility", "Demand planning", "Inventory confidence", "Variance analysis"] },
    { icon: Ico.robot, title: "NetSuite AI Agents & Chatbots", description: "Create governed assistants that help users answer ERP questions, review exceptions, draft follow-ups, and move work forward with clear guardrails.", cta: "Design AI agents", bullets: ["Answer ERP questions", "Review exceptions", "Draft follow-ups", "Clear guardrails"] },
    { icon: Ico.workflow, title: "NetSuite Workflow Automation", description: "Automate repetitive tasks, approvals, notifications, exception routing, and cross-functional handoffs while respecting existing controls.", cta: "Automate workflows", bullets: ["Repetitive tasks", "Approvals", "Notifications", "Exception routing", "Cross-functional handoffs"] },
    { icon: Ico.report, title: "NetSuite AI Reporting", description: "Turn dense transaction and performance data into readable explanations, executive summaries, KPI narratives, and decision-ready dashboards.", cta: "Modernize reporting", bullets: ["Readable explanations", "Executive summaries", "KPI narratives", "Decision-ready dashboards"] },
    { icon: Ico.plug, title: "NetSuite AI Integration", description: "Connect NetSuite with CRM, ecommerce, warehouse, service, finance, BI, and data platforms so AI has the context it needs to be useful.", cta: "Connect the ecosystem", bullets: ["CRM", "Ecommerce", "Warehouse & service", "Finance & BI", "Data platforms"] },
  ],
};

const USE_CASES = {
  eyebrow: "Business Use Cases",
  heading: "Where AI for NetSuite ERP starts paying back.",
  intro: "The best AI projects begin with a specific operating bottleneck. We help teams choose use cases that are visible, measurable, and adoption-friendly. Practical beats flashy.",
  context: "A CFO does not need a science project during close. A warehouse manager does not need a black-box forecast. NetSuite AI becomes valuable when it makes a hard day easier and a decision clearer.",
  cta: { label: "Map My Use Cases", href: "#contact" },
  items: [
    { icon: Ico.ledger, title: "Finance & Close", description: "AI-assisted variance explanations, journal review support, close task summaries, and quicker reporting commentary." },
    { icon: Ico.invoice, title: "Accounting & AP", description: "Invoice capture review, duplicate detection support, exception routing, vendor inquiry summaries, and approval nudges." },
    { icon: Ico.truck, title: "Supply Chain", description: "Demand signals, stockout risk prompts, purchase timing insights, and supplier performance intelligence." },
    { icon: Ico.cart, title: "Procurement", description: "Spend pattern review, contract reminders, approval guidance, supplier issue summaries, and quote comparison assistance." },
    { icon: Ico.headset, title: "Customer Service", description: "Order status explanations, return summaries, customer context briefs, and faster responses without switching systems." },
    { icon: Ico.target, title: "Sales & Revenue", description: "Opportunity-to-order visibility, pricing guidance, renewal prompts, cross-sell signals, and revenue risk summaries." },
    { icon: Ico.gears, title: "Operations", description: "Workflow monitoring, bottleneck identification, role-based alerts, task prioritization, and management reporting." },
    { icon: Ico.presentation, title: "Executive Reporting", description: "Board-ready narratives, KPI explanations, multi-entity summaries, and plain-English views of operational movement." },
  ],
};

const AGENTS = {
  eyebrow: "AI Agents for NetSuite",
  heading: "Give teams a governed helper, not another place to search.",
  intro: "NetSuite AI agents and chatbots can help users ask better questions, understand records faster, and act with context. Mirketa designs these assistants with role-aware access, workflow discipline, and adoption in mind.",
  dialogue: {
    user: "Why did gross margin move in the West region this week?",
    assistant: "Margin dipped after two discounted orders, one expedited freight charge, and a late vendor cost update. I can open the related transactions or prepare a short variance note.",
    governance: "Response limited to authorized records, logged for review, and linked to source transactions.",
  },
  pillars: [
    { icon: Ico.lock, title: "Role-aware answers", description: "Assistants should follow the same access expectations your users already understand." },
    { icon: Ico.link, title: "Source-backed summaries", description: "Make AI useful by tying explanations to transactions, reports, notes, and governed business context." },
    { icon: Ico.checkArrow, title: "Workflow-ready guidance", description: "Move beyond answering questions to helping users complete the next responsible step." },
  ],
};

const METHODOLOGY = {
  eyebrow: "Methodology",
  heading: "A business-safe path from AI idea to NetSuite adoption.",
  intro: "The details vary by company, but the discipline does not. We move from discovery to controlled rollout with clear ownership, measurement, and governance.",
  steps: [
    { name: "Discover", description: "Identify friction, data gaps, manual touchpoints, and decisions that slow teams down." },
    { name: "Prioritize", description: "Rank use cases by impact, feasibility, risk, adoption effort, and speed to value." },
    { name: "Connect", description: "Prepare NetSuite and related systems so AI has the right context and boundaries." },
    { name: "Automate", description: "Build guided workflows, assistant experiences, reporting intelligence, or predictive signals." },
    { name: "Govern", description: "Align security, approvals, audit trails, responsible use, and operating controls." },
    { name: "Improve", description: "Measure usage, tune outputs, expand coverage, and keep the solution aligned to business change." },
  ],
};

const OUTCOMES = {
  eyebrow: "Business Outcomes",
  heading: "What changes when NetSuite AI is implemented around real work?",
  intro: "Good AI should show up in the calendar, the close checklist, the forecast review, the exception queue, and the executive meeting — not just in a demo.",
  metrics: [
    { title: "Process Time Reclaimed", subtitle: "Less manual effort", description: "Automate routine checks, drafts, alerts, and summaries so skilled teams spend more time on judgment and less time on chasing context." },
    { title: "Faster Reporting Cycles", subtitle: "Clearer reporting", description: "Use AI-assisted narratives and data intelligence to explain performance movements without waiting for another spreadsheet pass." },
    { title: "3 Levels of Governance", subtitle: "Safer adoption", description: "Access, evidence, and monitoring: design every AI capability with controls and source traceability rather than leaving teams to experiment." },
  ],
  proof: [
    { title: "Month-end clarity", description: "Finance teams can move faster when variance explanations, open items, and supporting records are easier to gather and summarize." },
    { title: "Forecast confidence", description: "Operations teams can make better calls when stock, demand, vendor, and revenue signals are surfaced before the review meeting." },
    { title: "Safer scale", description: "AI becomes easier to trust when access, sources, decisions, and workflow handoffs are visible rather than hidden in a black box." },
  ],
};

const INDUSTRIES = {
  eyebrow: "Industry Relevance",
  heading: "NetSuite AI solutions for industries where timing, margin, and visibility matter.",
  items: [
    { title: "Manufacturing", description: "Forecast demand, monitor costs, spot inventory risk, and explain production variance faster." },
    { title: "Wholesale Distribution", description: "Improve replenishment signals, supplier visibility, pricing review, and order exception handling." },
    { title: "Ecommerce", description: "Connect commerce, customer, inventory, and fulfillment signals for better recommendations and responses." },
    { title: "Healthcare", description: "Support operational finance, procurement visibility, service workflows, and compliance-aware reporting." },
    { title: "Financial Services", description: "Bring better control, reporting discipline, and exception intelligence to multi-entity operations." },
    { title: "Technology", description: "Help high-growth teams manage bookings, subscriptions, support, and revenue signals with less friction." },
    { title: "Private Equity", description: "Standardize portfolio reporting, operating metrics, finance workflows, and scalable AI patterns." },
    { title: "Professional Services", description: "Improve project margin visibility, utilization prompts, invoice readiness, and client reporting." },
  ],
};

const IMPLEMENTATION = {
  eyebrow: "Implementation Approach",
  heading: "A NetSuite AI implementation path that respects governance and gets used.",
  intro: "Mirketa combines enterprise AI strategy, NetSuite consulting, integration experience, and business process optimization so the solution can survive beyond the first pilot.",
  items: [
    { icon: Ico.map, title: "Use-case roadmap", description: "Define what to automate first, which teams benefit, what data is needed, and how value will be measured." },
    { icon: Ico.database, title: "Data and integration readiness", description: "Check whether NetSuite, connected systems, custom records, and reporting layers can support the AI outcome reliably." },
    { icon: Ico.flask, title: "Proof of value", description: "Launch focused pilots that prove usefulness, accuracy, workflow fit, and adoption potential before broader rollout." },
    { icon: Ico.rocket, title: "Production rollout and optimization", description: "Support users, monitor performance, tune workflows, expand use cases, and keep controls aligned as adoption grows." },
  ],
};

const INTEGRATION = {
  eyebrow: "Integration Capabilities",
  heading: "NetSuite AI gets stronger when the surrounding business context is connected.",
  intro: "AI should understand more than a single record. We help connect the systems and data sources that influence how finance, operations, sales, and service actually make decisions.",
  areas: [
    { icon: Ico.chartUp, title: "Data intelligence and analytics", description: "Blend NetSuite data with external business sources for clearer reporting, forecasting, and executive insight." },
    { icon: Ico.gears, title: "Process automation", description: "Route approvals, exceptions, follow-ups, and task reminders across the systems teams already use." },
    { icon: Ico.lock, title: "AI governance", description: "Maintain human oversight, permission boundaries, documentation, and operational auditability." },
  ],
};

const FAQS = [
  { q: "What are NetSuite AI Solutions?", a: "NetSuite AI Solutions use artificial intelligence, automation, analytics, and governed assistants to improve ERP workflows, reporting, forecasting, and decision-making around NetSuite data and processes." },
  { q: "How does AI work in NetSuite?", a: "AI can support NetSuite through embedded capabilities, analytics, integrations, workflow automation, AI-assisted reporting, and agent experiences that help users understand records, exceptions, and business trends more quickly." },
  { q: "Can AI automate NetSuite workflows?", a: "Yes. NetSuite workflow automation can help with approvals, reminders, exception routing, invoice review, reporting summaries, order follow-up, and other repeatable steps, provided the automation is designed with governance and controls." },
  { q: "What business processes can NetSuite AI improve?", a: "Common opportunities include finance close, accounts payable, demand planning, inventory review, procurement, customer service, sales operations, executive reporting, and cross-system handoffs." },
  { q: "Does NetSuite support AI agents and generative AI?", a: "NetSuite's AI ecosystem includes embedded assistance, generative AI features, analytics intelligence, and extensibility options. Mirketa helps organizations design governed AI agent experiences that fit their NetSuite roles, records, and processes." },
  { q: "How long does a NetSuite AI implementation take?", a: "Timelines depend on the use case, data readiness, integrations, and governance needs. Many organizations begin with a focused assessment or proof of value before scaling into broader automation and AI agent programs." },
  { q: "Why choose Mirketa for NetSuite AI consulting?", a: "Mirketa brings a combination of NetSuite consulting, AI strategy, workflow automation, systems integration, analytics, and managed optimization so the solution is practical, governed, and aligned to business outcomes." },
];

const SEO = {
  title: "NetSuite AI Solutions & Consulting Services | Mirketa",
  description:
    "Mirketa's NetSuite AI solutions bring governed automation, predictive analytics, and AI agents to finance, operations, and supply chain teams running Oracle NetSuite.",
  canonical: "https://www.mirketa.com/netsuite-ai/",
  keywords: [
    "NetSuite AI",
    "NetSuite AI consulting",
    "Oracle NetSuite AI solutions",
    "NetSuite workflow automation",
    "NetSuite AI agents",
    "NetSuite predictive analytics",
    "NetSuite AI reporting",
    "AI ERP automation",
    "NetSuite integration AI",
    "governed AI ERP",
    "NetSuite finance automation",
    "AI for NetSuite implementation",
  ],
  schema: [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "NetSuite AI Consulting and Implementation",
      provider: { "@type": "Organization", name: "Mirketa Inc.", url: "https://www.mirketa.com" },
      name: "NetSuite AI Solutions",
      description:
        "AI-powered automation, predictive analytics, and governed AI agents for Oracle NetSuite, covering finance, operations, supply chain, service, and reporting.",
      areaServed: "Global",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.mirketa.com/" },
        { "@type": "ListItem", position: 2, name: "NetSuite AI", item: "https://www.mirketa.com/netsuite-ai/" },
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

const FINAL_CTA = {
  heading: "Build a NetSuite AI program your teams will actually trust.",
  description: "Start with one valuable workflow, prove the business case, and scale with governance.",
  cta: { label: "Schedule a NetSuite AI Consultation", href: "#contact" },
};

const CONTACT = {
  eyebrow: "Talk to Mirketa",
  heading: "Ready to find the first NetSuite AI use case worth building?",
  description: "Tell us where NetSuite feels too manual, too slow, or too hard to explain. We will help you shape a practical roadmap around your ERP data, workflows, integrations, and operating goals.",
  formTitle: "Request a Free NetSuite AI Consultation",
};

// ============================================================
// MAIN COMPONENT
// ============================================================

export default function NetSuiteAI() {
  const heroTextRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (heroTextRef.current) {
        gsap.from(heroTextRef.current.children, {
          opacity: 0,
          y: 28,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
        });
      }

      gsap.utils.toArray(".ns-reveal").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 32,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      gsap.utils.toArray(".ns-reveal-stagger").forEach((el) => {
        gsap.from(el.children, {
          opacity: 0,
          y: 26,
          duration: 0.6,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      gsap.utils.toArray(".ns-zoom-in").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          scale: 0.92,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="netsuite-ai">
      <Seo {...SEO} />
      <HeroSection heroTextRef={heroTextRef} />
      <ErpLayerSection />
      <WhatWeSolveSection />
      <ServicesSection />
      <UseCasesSection />
      <AgentsSection />
      <MethodologySection />
      <OutcomesSection />
      <IndustriesSection />
      <ImplementationSection />
      <IntegrationSection />
      <FaqSection />
      <FinalCtaSection />
      <ContactSection />
    </div>
  );
}

// ============================================================
// HERO — ledger backdrop + floating executive dashboard
// ============================================================

function HeroSection({ heroTextRef }) {
  return (
    <section className="ns-hero" style={{ backgroundImage: `url("${heroBg}")` }} aria-label="NetSuite AI Solutions by Mirketa">
      <div className="ns-hero__scrim" />
      <div className="container">
        <Breadcrumb items={BREADCRUMB_ITEMS} className="ns-breadcrumb" />
      </div>
      <div className="container ns-hero__inner">
        <div ref={heroTextRef} className="ns-hero__text">
          <span className="ns-badge">
            <span className="ns-badge__spark" aria-hidden="true">✦</span> {HERO.badge}
          </span>
          <h1>{HERO.title}</h1>
          <p className="ns-hero__description">{HERO.description}</p>
          <div className="ns-hero__ctas">
            <a href={HERO.primaryCta.href} className="btn btn-primary ns-btn">
              {HERO.primaryCta.label} <span aria-hidden="true">→</span>
            </a>
            <a href={HERO.secondaryCta.href} className="btn btn-secondary ns-btn">
              {HERO.secondaryCta.label}
            </a>
          </div>
          <p className="ns-hero__tagline">{HERO.tagline}</p>
          <div className="ns-hero__trust">
            <span className="ns-hero__trust-label">Backed by Mirketa's enterprise credentials</span>
            <div className="ns-hero__trust-badges">
              {TRUST_BADGES.map((b) => (
                <img key={b.label} src={b.icon} alt={b.label} loading="lazy" />
              ))}
            </div>
          </div>
        </div>

        <div className="ns-hero__illustration ns-zoom-in">
          <img src={heroIllustration} alt="Executive dashboard with a margin alert and a governed AI assistant answering a variance question" />
        </div>
      </div>

      <div className="ns-hero__stats ns-reveal-stagger">
        {HERO_STATS.map((s) => (
          <div className="ns-hero-stat" key={s.title}>
            <strong>{s.title}</strong>
            <span>{s.note}</span>
          </div>
        ))}
      </div>

      <button
        type="button"
        className="ns-scroll-indicator"
        onClick={() => document.getElementById("erp-layer")?.scrollIntoView({ behavior: "smooth" })}
        aria-label="Scroll to the ERP intelligence layer"
      >
        <span />
      </button>
    </section>
  );
}

// ============================================================
// ERP INTELLIGENCE LAYER — Capture / Reason / Act loop
// ============================================================

function ErpLayerSection() {
  return (
    <section className="section ns-erp" id="erp-layer" aria-labelledby="ns-erp-heading">
      <div className="container ns-erp__grid">
        <div className="ns-erp__text ns-reveal">
          <p className="ns-eyebrow">{ERP_LAYER.eyebrow}</p>
          <h2 id="ns-erp-heading">{ERP_LAYER.heading}</h2>
          <ul className="ns-erp__loop-list">
            {ERP_LAYER.loop.map((l) => (
              <li key={l.name}>
                <strong>{l.name}</strong>
                <span>{l.note}</span>
              </li>
            ))}
          </ul>
          <div className="ns-erp__scenario">
            {ERP_LAYER.scenario.map((s) => (
              <p key={s.label}>
                <span>{s.label}:</span> {s.text}
              </p>
            ))}
          </div>
        </div>
        <div className="ns-erp__image ns-zoom-in">
          <img src={erpDashboardImg} alt="Capture, Reason, Act loop diagram for the ERP intelligence layer" loading="lazy" />
        </div>
      </div>
      <div className="container">
        <ul className="ns-erp__services ns-reveal-stagger">
          {ERP_LAYER.services.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// ============================================================
// WHAT WE SOLVE — three shifts + executive benefits
// ============================================================

function WhatWeSolveSection() {
  return (
    <section className="section ns-solve" aria-labelledby="ns-solve-heading">
      <div className="container">
        <div className="section-heading ns-reveal">
          <p className="ns-eyebrow">{WHAT_WE_SOLVE.eyebrow}</p>
          <h2 id="ns-solve-heading">{WHAT_WE_SOLVE.heading}</h2>
          <p>{WHAT_WE_SOLVE.intro}</p>
        </div>
        <div className="ns-solve__grid">
          <div className="ns-solve__shifts ns-reveal-stagger">
            {WHAT_WE_SOLVE.shifts.map((s, i) => (
              <div className="ns-shift-card" key={s.title}>
                <span className="ns-shift-card__num">{i + 1}</span>
                <h3>{s.title}</h3>
                <p>{s.description}</p>
              </div>
            ))}
          </div>
          <div className="ns-solve__image ns-zoom-in">
            <img src={overviewImg} alt="Scattered NetSuite data points converging into a single governed decision" loading="lazy" />
          </div>
        </div>

        <div className="ns-solve__executive ns-reveal">
          <h3>{WHAT_WE_SOLVE.executiveHeading}</h3>
          <p>{WHAT_WE_SOLVE.executiveBody}</p>
        </div>
        <div className="ns-solve__benefits ns-reveal-stagger">
          {WHAT_WE_SOLVE.benefits.map((b) => (
            <div className="ns-benefit-card" key={b.title}>
              <span className="ns-benefit-card__icon">{b.icon}</span>
              <h4>{b.title}</h4>
              <p>{b.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// SERVICES
// ============================================================

function ServicesSection() {
  return (
    <section className="section ns-services" aria-labelledby="ns-services-heading">
      <div className="container">
        <div className="section-heading ns-reveal">
          <p className="ns-eyebrow">{SERVICES.eyebrow}</p>
          <h2 id="ns-services-heading">{SERVICES.heading}</h2>
          <p>{SERVICES.intro}</p>
        </div>
        <div className="ns-services__grid ns-reveal-stagger">
          {SERVICES.items.map((s) => (
            <div className="ns-service-card" key={s.title}>
              <div className="ns-service-card__head">
                <span className="ns-service-card__icon">{s.icon}</span>
                {s.badge && <span className="ns-service-card__badge">{s.badge}</span>}
              </div>
              <h3>{s.title}</h3>
              <p>{s.description}</p>
              <ul className="ns-service-card__bullets">
                {s.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
              <a href="#contact" className="ns-service-card__cta">
                {s.cta} <span aria-hidden="true">→</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// BUSINESS USE CASES
// ============================================================

function UseCasesSection() {
  return (
    <section className="section ns-use-cases" id="use-cases" aria-labelledby="ns-use-cases-heading">
      <div className="container">
        <div className="section-heading ns-reveal">
          <p className="ns-eyebrow">{USE_CASES.eyebrow}</p>
          <h2 id="ns-use-cases-heading">{USE_CASES.heading}</h2>
          <p>{USE_CASES.intro}</p>
          <p className="ns-use-cases__context">{USE_CASES.context}</p>
        </div>
        <div className="ns-use-cases__grid ns-reveal-stagger">
          {USE_CASES.items.map((u) => (
            <div className="ns-use-case-card" key={u.title}>
              <span className="ns-use-case-card__icon">{u.icon}</span>
              <h3>{u.title}</h3>
              <p>{u.description}</p>
            </div>
          ))}
        </div>
        <div className="ns-use-cases__cta ns-reveal">
          <a href={USE_CASES.cta.href} className="btn btn-primary ns-btn">
            {USE_CASES.cta.label} <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// AI AGENTS — chat mockup + pillars
// ============================================================

function AgentsSection() {
  return (
    <section className="section ns-agents" aria-labelledby="ns-agents-heading">
      <div className="container ns-agents__grid">
        <div className="ns-agents__text ns-reveal">
          <p className="ns-eyebrow">{AGENTS.eyebrow}</p>
          <h2 id="ns-agents-heading">{AGENTS.heading}</h2>
          <p>{AGENTS.intro}</p>
          <ul className="ns-agents__pillars">
            {AGENTS.pillars.map((p) => (
              <li key={p.title}>
                <span aria-hidden="true">{p.icon}</span>
                <div>
                  <h3>{p.title}</h3>
                  <p>{p.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="ns-chat ns-zoom-in" role="group" aria-label="Example AI agent conversation">
          <p className="ns-chat__label">Finance user asks the assistant</p>
          <div className="ns-chat__bubble ns-chat__bubble--user">{AGENTS.dialogue.user}</div>
          <div className="ns-chat__bubble ns-chat__bubble--assistant">{AGENTS.dialogue.assistant}</div>
          <p className="ns-chat__governance">
            <span aria-hidden="true">{Ico.lock}</span> {AGENTS.dialogue.governance}
          </p>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// METHODOLOGY — ascending staircase
// ============================================================

function MethodologySection() {
  return (
    <section className="section ns-methodology" aria-labelledby="ns-methodology-heading">
      <div className="container">
        <div className="section-heading ns-reveal">
          <p className="ns-eyebrow">{METHODOLOGY.eyebrow}</p>
          <h2 id="ns-methodology-heading">{METHODOLOGY.heading}</h2>
          <p>{METHODOLOGY.intro}</p>
        </div>
        <div className="ns-methodology__image ns-reveal">
          <img src={automationImg} alt="Six-step ascending staircase from Discover through Improve" loading="lazy" />
        </div>
        <div className="ns-methodology__steps ns-reveal-stagger">
          {METHODOLOGY.steps.map((s, i) => (
            <div className="ns-method-step" key={s.name}>
              <span className="ns-method-step__num">{String(i + 1).padStart(2, "0")}</span>
              <h3>{s.name}</h3>
              <p>{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// BUSINESS OUTCOMES — metrics + proof patterns
// ============================================================

function OutcomesSection() {
  return (
    <section className="section ns-outcomes" aria-labelledby="ns-outcomes-heading">
      <div className="ns-outcomes__bg" style={{ backgroundImage: `url("${analyticsImg}")` }} aria-hidden="true" />
      <div className="container">
        <div className="section-heading ns-reveal">
          <p className="ns-eyebrow">{OUTCOMES.eyebrow}</p>
          <h2 id="ns-outcomes-heading">{OUTCOMES.heading}</h2>
          <p>{OUTCOMES.intro}</p>
        </div>
        <div className="ns-outcomes__metrics ns-reveal-stagger">
          {OUTCOMES.metrics.map((m) => (
            <div className="ns-outcome-metric" key={m.title}>
              <span aria-hidden="true">{Ico.check}</span>
              <div>
                <strong>{m.title}</strong>
                <span className="ns-outcome-metric__subtitle">{m.subtitle}</span>
                <p>{m.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="ns-outcomes__proof-wrap">
          <div className="ns-outcomes__proof-image ns-reveal">
            <img src={forecastingImg} alt="Forecast confidence chart showing a projected trend after today" loading="lazy" />
          </div>
          <div className="ns-outcomes__proof ns-reveal-stagger">
            {OUTCOMES.proof.map((p) => (
              <div className="ns-proof-card" key={p.title}>
                <h3>{p.title}</h3>
                <p>{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// INDUSTRY RELEVANCE — scrollable strip
// ============================================================

function IndustriesSection() {
  return (
    <section className="section ns-industries" aria-labelledby="ns-industries-heading">
      <div className="container">
        <div className="section-heading ns-reveal">
          <p className="ns-eyebrow">{INDUSTRIES.eyebrow}</p>
          <h2 id="ns-industries-heading">{INDUSTRIES.heading}</h2>
        </div>
      </div>
      <div className="ns-industries__scroller">
        <div className="ns-industries__track ns-reveal-stagger">
          {INDUSTRIES.items.map((i) => (
            <div className="ns-industry-pill" key={i.title}>
              <h3>{i.title}</h3>
              <p>{i.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// IMPLEMENTATION APPROACH
// ============================================================

function ImplementationSection() {
  return (
    <section className="section ns-implementation" aria-labelledby="ns-implementation-heading">
      <div className="container">
        <div className="section-heading ns-reveal">
          <p className="ns-eyebrow">{IMPLEMENTATION.eyebrow}</p>
          <h2 id="ns-implementation-heading">{IMPLEMENTATION.heading}</h2>
          <p>{IMPLEMENTATION.intro}</p>
        </div>
        <div className="ns-timeline ns-reveal-stagger">
          {IMPLEMENTATION.items.map((item, i) => (
            <div className="ns-timeline-step" key={item.title}>
              <div className="ns-timeline-step__marker">
                <span className="ns-timeline-step__icon">{item.icon}</span>
                <span className="ns-timeline-step__badge">{String(i + 1).padStart(2, "0")}</span>
              </div>
              {i < IMPLEMENTATION.items.length - 1 && <span className="ns-timeline-step__connector" aria-hidden="true" />}
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// INTEGRATION CAPABILITIES — hub and spoke
// ============================================================

function IntegrationSection() {
  return (
    <section className="section ns-integration" aria-labelledby="ns-integration-heading">
      <div className="container ns-integration__grid">
        <div className="ns-integration__image ns-zoom-in">
          <img src={integrationImg} alt="NetSuite AI Intelligence hub connected to BI, CRM, Commerce, Service, Warehouse, and Service Ops" loading="lazy" />
        </div>
        <div className="ns-integration__text ns-reveal">
          <p className="ns-eyebrow">{INTEGRATION.eyebrow}</p>
          <h2 id="ns-integration-heading">{INTEGRATION.heading}</h2>
          <p>{INTEGRATION.intro}</p>
          <div className="ns-integration__areas">
            {INTEGRATION.areas.map((a) => (
              <div className="ns-integration-area" key={a.title}>
                <span aria-hidden="true">{a.icon}</span>
                <div>
                  <h3>{a.title}</h3>
                  <p>{a.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// FAQ — live search + accordion
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
    <section className="section ns-faq" aria-labelledby="ns-faq-heading">
      <div className="container">
        <div className="section-heading ns-reveal">
          <p className="ns-eyebrow">FAQ</p>
          <h2 id="ns-faq-heading">NetSuite AI questions buyers ask before they invest</h2>
          <p>Short answers for decision-makers evaluating NetSuite AI consulting, automation, AI agents, and implementation planning.</p>
        </div>
        <div className="ns-faq__search-wrap ns-reveal">
          <label htmlFor="ns-faq-search" className="visually-hidden">
            Search frequently asked questions
          </label>
          <input
            id="ns-faq-search"
            type="search"
            className="ns-faq__search"
            placeholder="Ask a question — e.g. &quot;agents&quot;, &quot;timeline&quot;, &quot;workflow&quot;..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpenIndex(-1);
            }}
          />
        </div>
        <div className="ns-faq__list ns-reveal">
          {filtered.length === 0 ? (
            <p className="ns-faq__empty">No questions match &ldquo;{query}&rdquo;. Try a different search term.</p>
          ) : (
            filtered.map((item, i) => {
              const open = openIndex === i;
              const panelId = `ns-faq-panel-${i}`;
              return (
                <div className={`ns-faq-item ${open ? "is-open" : ""}`} key={item.q}>
                  <button type="button" className="ns-faq-item__question" aria-expanded={open} aria-controls={panelId} onClick={() => setOpenIndex(open ? -1 : i)}>
                    <span>{item.q}</span>
                    <span className="ns-faq-item__icon" aria-hidden="true">{open ? "−" : "+"}</span>
                  </button>
                  <div id={panelId} className="ns-faq-item__answer" role="region" hidden={!open}>
                    <p>{item.a}</p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// FINAL CTA
// ============================================================

function FinalCtaSection() {
  return (
    <section className="ns-final-cta ns-reveal" style={{ backgroundImage: `url("${ctaImg}")` }} aria-labelledby="ns-final-cta-heading">
      <div className="container ns-final-cta__inner">
        <h2 id="ns-final-cta-heading">{FINAL_CTA.heading}</h2>
        <p>{FINAL_CTA.description}</p>
        <a href={FINAL_CTA.cta.href} className="btn btn-primary ns-btn">
          {FINAL_CTA.cta.label} <span aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  );
}

// ============================================================
// CONTACT / TALK TO MIRKETA
// ============================================================

function ContactSection() {
  return <ConsultationSection {...CONTACT} />;
}
