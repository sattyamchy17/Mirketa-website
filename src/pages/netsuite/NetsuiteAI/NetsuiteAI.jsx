import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { NETSUITE_PAGES, AI_PAGES } from "../../../config/pageSlugs.js";
import { Images } from "../../../assets/images/index.js";
import Seo from "../../../components/Seo/Seo.jsx";
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb.jsx";
import StickyCta from "../../../components/StickyCta/StickyCta.jsx";
import TrustedByMarquee from "../../../components/TrustedByMarquee/TrustedByMarquee.jsx";
import AnimatedCounter from "../../../components/AnimatedCounter/AnimatedCounter.jsx";
import FaqAccordion from "../../../components/FaqAccordion/FaqAccordion.jsx";
import HeroVisual from "../../../components/HeroVisual/HeroVisual.jsx";
import ConsultationSection from "../../../components/ConsultationSection/ConsultationSection.jsx";
import RelatedServices from "../../../components/RelatedServices/RelatedServices.jsx";
import WorkflowDiagram from "../../../components/illustrations/WorkflowDiagram/WorkflowDiagram.jsx";
import FinanceChart from "../../../components/illustrations/FinanceChart/FinanceChart.jsx";
import SupplyChainMap from "../../../components/illustrations/SupplyChainMap/SupplyChainMap.jsx";
import AnalyticsPanel from "../../../components/illustrations/AnalyticsPanel/AnalyticsPanel.jsx";
import "./NetsuiteAI.css";

gsap.registerPlugin(ScrollTrigger);

// ============================================================
// ICONS
// ============================================================

const Ico = {
  check: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12.5l5 5L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  gear: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.4" /><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
  ),
  report: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 3h9l3 3v15H6V3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="M9 13l2-2 2 2 3-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  chart: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 19V13M10 19V8M16 19v-5M20 19V5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
  ),
  brain: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 4a3 3 0 00-3 3v1a3 3 0 000 6v1a3 3 0 003 3M15 4a3 3 0 013 3v1a3 3 0 010 6v1a3 3 0 01-3 3M9 4v16M15 4v16" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
  ),
  compass: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" /><path d="M15 9l-2 6-6 2 2-6 6-2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  eye: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.4" /></svg>
  ),
  award: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="8" r="5" stroke="currentColor" strokeWidth="1.4" /><path d="M8.5 12.5L7 21l5-2.5L17 21l-1.5-8.5" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  users: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="9" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.4" /><path d="M3.5 19c.6-3.4 2.9-5.2 5.5-5.2s4.9 1.8 5.5 5.2" stroke="currentColor" strokeWidth="1.4" /><circle cx="17" cy="9" r="2.6" stroke="currentColor" strokeWidth="1.3" opacity="0.7" /><path d="M15.5 13.4c2.2.3 3.7 1.9 4 4.6" stroke="currentColor" strokeWidth="1.3" opacity="0.7" /></svg>
  ),
  heart: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 20s-7-4.5-9.3-9A5 5 0 0112 6a5 5 0 019.3 5c-2.3 4.5-9.3 9-9.3 9z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  code: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 8l-5 4 5 4M15 8l5 4-5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  truck: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 7h11v9H3V7z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="M14 11h4l3 3v2h-7v-5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><circle cx="7" cy="18" r="1.6" stroke="currentColor" strokeWidth="1.3" /><circle cx="17.5" cy="18" r="1.6" stroke="currentColor" strokeWidth="1.3" /></svg>
  ),
  cart: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 4h2l2.2 11h10.6L20 7H6.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /><circle cx="9" cy="20" r="1.3" fill="currentColor" /><circle cx="17" cy="20" r="1.3" fill="currentColor" /></svg>
  ),
  bank: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 10l8-5 8 5M4 10v9M20 10v9M4 19h16M8 13v4M12 13v4M16 13v4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  factory: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 21V11l5 3V11l5 3V8l8 5v8H3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
};

// ============================================================
// DATA
// ============================================================

const BREADCRUMB_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Platforms & Technology", href: "/" },
  { label: NETSUITE_PAGES.AI.label },
];

const HERO = {
  badge: "AI Consulting for Live NetSuite Environments",
  title: "NetSuite AI Consulting for Finance Teams Ready to Govern AI, Not Just Pilot It",
  description:
    "NetSuite AI Consulting from Mirketa is built for a specific moment: your NetSuite instance is already live, your chart of accounts is stable, and finance leadership now wants AI without giving up the controls that get you through an audit cleanly. We help you decide which use cases are safe to automate today, which still need a human sign-off, and how to document that decision so it holds up when your auditors ask about it next year.",
  primaryCta: { label: "Start a NetSuite AI Readiness Assessment", href: "#contact" },
  secondaryCta: { label: "Talk to an AI Governance Consultant", href: "#contact" },
  metrics: [
    "SuiteScript-Certified AI Delivery Team",
    "Governed, Human-in-the-Loop AI Agents",
    "Audit-Ready Approval Trails",
    "Phased Discovery-to-Scale Engagements",
  ],
};

const HERO_DASHBOARD = {
  title: "NetSuite AI Governance Console",
  stats: [
    { label: "FORECAST ACCURACY", value: "94.2%", caption: "13-week rolling cash forecast" },
    { label: "ANOMALIES CAUGHT", value: "312", caption: "Flagged pre-close, last quarter" },
    { label: "HOURS SAVED / MO", value: "126", caption: "AP coding & reporting workflows" },
  ],
  rows: [
    { title: "AI-drafted journal entry review", meta: "Routed to controller · Awaiting sign-off", tone: "neutral", status: "Pending Approval" },
    { title: "Vendor invoice anomaly detection", meta: "AP workflow · 3 flagged this week", tone: "good", status: "Active" },
    { title: "Board reporting narrative draft", meta: "SuiteAnalytics dataset · Ready for review", tone: "good", status: "Drafted" },
  ],
  floatingCards: [
    { icon: Ico.shield, title: "Full Audit Trail", subtitle: "Every AI action logged & reviewable" },
    { icon: Ico.chart, title: "94% Forecast Accuracy", subtitle: "13-week rolling cash view" },
  ],
};

const CHALLENGES = {
  eyebrow: "Business Challenges",
  heading: "What Actually Goes Wrong When Companies Add AI to NetSuite",
  intro:
    "Most of the NetSuite AI projects that stall don't fail on the technology. They fail because nobody defined who's accountable when an AI-generated number turns out to be wrong, or because a promising pilot never got a governance model that would let it near production data. These are the patterns Mirketa sees most often in organizations that already run a mature, well-configured NetSuite instance.",
  items: [
    { title: "AI Pilots That Never Leave the Sandbox", description: "A team builds a working proof of concept in a sandbox account, gets a good demo, and then can't answer the one question that matters to IT and finance leadership: who approves what it does once it's connected to production." },
    { title: "No Audit Trail for Automated Decisions", description: "When an AI tool drafts a journal entry, flags a vendor invoice, or adjusts a forecast, there's often no record of what data it used or who reviewed the output — a gap your external auditors will find." },
    { title: "Forecasts Still Built on Stale Exports", description: "Finance teams want predictive forecasting, but the underlying NetSuite data — saved searches, subsidiaries, item categories — was never cleaned up enough for a model to trust." },
  ],
};

const SOLUTION = {
  eyebrow: "Our Solution",
  heading: "A NetSuite AI Consulting Engagement Built Around Governance, Not Just Automation",
  paragraphs: [
    "Mirketa's approach to NetSuite AI consulting starts with a question most AI vendors skip entirely: what happens when the model is wrong? Before we recommend a single use case, we map your existing approval workflows, segregation-of-duties rules, and audit requirements, then scope every AI feature — from a governed agent that codes vendor invoices to a forecasting model that drafts next quarter's cash position — against that existing control structure instead of around it.",
    "That's a deliberately different starting point than a capability demo. We're not selling a chatbot bolted onto your NetSuite login screen. We're designing a small number of AI use cases that touch your general ledger, AP workflow, or reporting cycle in a way your controller can explain to an auditor in one sentence: here's what it recommended, here's who reviewed it, here's what changed as a result.",
    "Delivery runs through SuiteScript, SuiteFlow, and SuiteAnalytics — the same extension points your NetSuite instance already uses for custom logic and reporting — so AI outputs show up inside the workflows your team already runs, rather than in a separate tool nobody logs into after the second week. AI governance in NetSuite, in our experience, succeeds or fails on exactly this detail: whether the recommendation appears where the work already happens.",
  ],
};

const FEATURES = {
  eyebrow: "Key Features",
  heading: "What a Governed NetSuite AI Consulting Engagement Actually Delivers",
  intro:
    "These are the capability areas Mirketa designs, builds, and hands off with documentation your compliance team can actually use — not a list of AI buzzwords loosely bolted onto your existing instance.",
  items: [
    { icon: Ico.brain, title: "Governed AI Agents for Finance Workflows", description: "Purpose-built AI agents that draft journal entries, code vendor invoices, or triage AP exceptions — every action routed through an approval step and written to an audit-ready log before it touches your GL." },
    { icon: Ico.compass, title: "NetSuite AI Readiness Assessment", description: "A structured review of your chart of accounts, saved searches, data quality, and existing approval workflows that scores which AI use cases are realistic in the next two quarters versus which need cleanup first." },
    { icon: Ico.chart, title: "Predictive Forecasting & Anomaly Detection", description: "Models trained on your own SuiteAnalytics datasets to flag unusual AP activity, forecast cash and demand, and surface variances before they show up in a board deck." },
    { icon: Ico.report, title: "AI-Assisted Reporting & Narrative Generation", description: "AI-drafted commentary for management reporting and board packages, grounded in your actual NetSuite figures and clearly labeled as a draft until a controller signs off." },
    { icon: Ico.gear, title: "AI Output Integration Into NetSuite Workflows", description: "Recommendations don't live in a separate dashboard — they're delivered back into NetSuite through SuiteFlow and SuiteScript AI extensions so the people doing the work see them where they already work." },
    { icon: Ico.shield, title: "Role-Based AI Governance & Audit Trail", description: "Every AI feature is scoped to specific roles, with a permanent, exportable record of what data it saw, what it recommended, and who approved or rejected it — real AI agent governance, not a promise." },
  ],
};

const BENEFITS = {
  eyebrow: "Benefits",
  heading: "What Changes Once AI Is Actually Governed Inside NetSuite",
  intro:
    "These are the outcomes Mirketa's NetSuite AI consulting clients report once a pilot has graduated into a permanent, monitored part of their finance operation.",
  stats: [
    { value: "94.2%", label: "Forecast Accuracy Achieved" },
    { value: "126", label: "Hours Saved Per Month" },
    { value: "312", label: "Anomalies Caught Pre-Close" },
    { value: "100%", label: "AI Actions Logged For Audit" },
  ],
  items: [
    { title: "A Faster, More Defensible Close", description: "AI-assisted financial close routines catch coding errors and unusual entries before they reach the trial balance, instead of during a reconciliation scramble on day three." },
    { title: "Forecasts Leadership Actually Trusts", description: "Predictive forecasting built on your own transaction history replaces the spreadsheet model nobody outside finance can explain or reproduce." },
    { title: "An Audit That Doesn't Start With a Fight", description: "Because every AI recommendation and approval is logged, your SOX or financial statement auditors get a clean answer the first time they ask how a number was produced." },
    { title: "A Pilot That Actually Scales", description: "Use cases move from one team to the next using the same governance model, instead of restarting the approval conversation from zero every time." },
  ],
};

const SERVICES_INCLUDED = {
  eyebrow: "Services Included",
  heading: "Every NetSuite AI Consulting Engagement Includes",
  intro:
    "AI on top of NetSuite is a services problem as much as a technology one. These are the discrete service lines Mirketa delivers, together or independently, depending on how far along your organization already is.",
  items: [
    { title: "AI Readiness Assessment", description: "A scored review of data quality, workflow maturity, and governance gaps across your live NetSuite instance, delivered as a prioritized use-case roadmap." },
    { title: "Governed AI Agent Design", description: "Scoping, approval-routing design, and build for AI agents that act inside specific NetSuite workflows, from AP coding to exception triage." },
    { title: "Predictive Analytics Implementation", description: "Forecasting and anomaly-detection models built on your SuiteAnalytics datasets and validated against your own historical actuals." },
    { title: "AI Reporting & Narrative Generation", description: "AI-drafted commentary for management and board reporting, configured to always cite the underlying NetSuite data it drew from." },
    { title: "Change Management & Adoption", description: "Role-based training and communication plans so controllers, AP clerks, and FP&A analysts trust what the AI produces instead of quietly redoing it by hand." },
    { title: "Ongoing AI Governance Review", description: "A recurring review cadence that re-scores AI agent performance, approval-override rates, and audit-log completeness as usage grows." },
  ],
  chart: {
    title: "Forecast vs. Actual Variance",
    kpis: [
      { value: "±4.8%", label: "Average forecast variance" },
      { value: "312", label: "Anomalies caught pre-close" },
    ],
    bars: [12, 9.5, 7.6, 6.4, 5.2, 4.8],
  },
};

const PROCESS = {
  eyebrow: "Delivery Methodology",
  heading: "A Phased Path From Discovery to Scale Across Your NetSuite Instance",
  intro:
    "We don't propose a big-bang AI rollout across your entire NetSuite instance. Every engagement moves through the same six phases, with a governance checkpoint before anything touches production data.",
  network: {
    title: "Who Reviews AI Decisions on a Live NetSuite Instance",
    nodes: [
      { label: "Live NetSuite Instance", short: "ERP" },
      { label: "Finance & Controllership", short: "FIN" },
      { label: "IT & SuiteScript", short: "IT" },
      { label: "Internal Audit", short: "AUD" },
      { label: "Data & Integrations", short: "DATA" },
    ],
  },
  detail: [
    { name: "Discovery & Readiness", description: "We run the NetSuite AI readiness assessment against your chart of accounts, saved searches, and current approval workflows to establish a realistic starting point." },
    { name: "Use Case Prioritization", description: "Candidate use cases are scored on data readiness, financial risk, and expected time savings, then sequenced into a roadmap your CFO can actually approve." },
    { name: "Pilot & Governance Design", description: "Before any code is written, we document who approves each AI action, what gets logged, and what happens when the model's confidence is low." },
    { name: "Build & Integrate", description: "Agents, models, and reporting extensions are built using SuiteScript, SuiteFlow, and SuiteAnalytics, then connected back into the workflows your team already uses." },
    { name: "Adoption & Training", description: "Role-based training and a defined feedback loop so early users flag bad recommendations instead of silently ignoring or overriding them." },
    { name: "Scale & Optimize", description: "Once a use case earns trust in one team, we extend the same governance model to the next workflow or subsidiary instead of starting over." },
  ],
};

const WHY_MIRKETA = {
  eyebrow: "Why Mirketa",
  heading: "A NetSuite AI Consulting Partner That Leads With Governance",
  intro:
    "Plenty of firms can wire an AI API into NetSuite. Fewer will sit with your controller first and ask what has to be true before that AI is allowed anywhere near your general ledger.",
  items: [
    { icon: Ico.award, title: "SuiteScript-Certified AI Delivery Team", description: "Consultants who hold active NetSuite certifications and have built production SuiteScript AI extensions, not generic AI integrations retrofitted onto NetSuite." },
    { icon: Ico.shield, title: "Governance Built In From Day One", description: "Approval routing, audit logging, and role scoping are designed before a single model is trained, not added after a pilot raises concerns." },
    { icon: Ico.compass, title: "Phased, Not Big-Bang, Delivery", description: "A discovery-to-scale methodology that earns trust one workflow at a time instead of asking finance to approve AI across the whole instance at once." },
    { icon: Ico.eye, title: "Full Transparency Into Every Recommendation", description: "Every AI output is traceable back to the NetSuite data it used, so a controller can explain a number to an auditor without calling us first." },
    { icon: Ico.users, title: "Consultants Who Already Know Your Ledger", description: "The same team that scoped your original NetSuite implementation or supports it today can extend it with AI, without relearning your chart of accounts." },
  ],
};

const INDUSTRIES = {
  eyebrow: "Industry Solutions",
  heading: "NetSuite AI Consulting Experience Across Industries",
  intro:
    "AI governance requirements look different depending on your revenue model and reporting obligations — our consultants bring that context into every engagement.",
  items: [
    { icon: Ico.code, title: "Software & SaaS" },
    { icon: Ico.truck, title: "Wholesale Distribution" },
    { icon: Ico.users, title: "Professional Services" },
    { icon: Ico.cart, title: "Retail" },
    { icon: Ico.bank, title: "Financial Services" },
    { icon: Ico.factory, title: "Manufacturing" },
  ],
};

const CASE_STUDIES = {
  eyebrow: "Case Study / Results",
  heading: "Real NetSuite AI Consulting Outcomes",
  intro: "Anonymized results from recent engagements where Mirketa added governed AI to an already-live NetSuite instance.",
  cases: [
    {
      title: "SaaS Company Automates Anomaly Detection Ahead of Its Series C Audit",
      industry: "Software & SaaS",
      challenge: "A fast-growing SaaS company needed to show investors it could catch billing and AP anomalies without adding headcount, but had no governance model for letting AI near financial data.",
      solution: "We ran a NetSuite AI readiness assessment, then built a governed anomaly-detection agent scoped to AP and subscription billing, with every flag routed to a named approver.",
      outcome: "312 anomalies were caught pre-close in the first quarter, and the company passed Series C financial due diligence without an AI-related finding.",
    },
    {
      title: "Wholesale Distributor Cuts Forecast Variance in Half With a Governed AI Pilot",
      industry: "Wholesale Distribution",
      challenge: "Demand forecasting was built on a spreadsheet model that one analyst maintained manually, and it consistently missed by double digits during seasonal swings.",
      solution: "Mirketa implemented predictive forecasting trained on the distributor's own NetSuite transaction history, piloted on a single product line before wider rollout.",
      outcome: "Forecast variance dropped from roughly 11% to under 5%, and the model has since been extended to two additional product lines.",
    },
  ],
};

const FAQS = [
  { q: "Which NetSuite AI use cases are safe to fully automate, and which need human approval?", a: "As a rule, anything that changes a financial balance — journal entries, invoice approvals, revenue recognition adjustments — gets a human approval step in our designs. Read-only use cases like anomaly flagging, forecast drafts, and reporting narratives can run with lighter oversight once they've earned trust in a pilot. We score this explicitly during the readiness assessment rather than assuming." },
  { q: "How do you handle data privacy when AI tools access our NetSuite financial data?", a: "We scope every AI feature to the minimum data it needs, document what leaves your NetSuite instance and where it goes, and default to models and configurations that keep financial data inside your existing security boundary. Any exception is called out and approved explicitly before build begins." },
  { q: "Do AI agents get their own audit trail inside NetSuite?", a: "Yes. Every governed AI agent we build writes a permanent, exportable record of the data it saw, the recommendation it made, and who approved or overrode it — the same standard we'd expect from a human user with equivalent access." },
  { q: "How long does a NetSuite AI consulting engagement take?", a: "A readiness assessment typically takes two to three weeks. A first governed pilot, from use case selection through go-live, usually runs eight to twelve weeks. Scaling a proven use case to additional teams or subsidiaries is faster since the governance model already exists." },
  { q: "What does a NetSuite AI readiness assessment actually involve?", a: "We review your chart of accounts, saved searches and reporting structure, existing approval workflows, and data quality, then score candidate AI use cases against financial risk and expected time savings. You get a prioritized roadmap, not just a slide about AI possibilities." },
  { q: "How is this engagement priced?", a: "Readiness assessments are fixed-fee. Pilot and build phases are scoped against specific use cases with a fixed-scope statement of work, the same way we price NetSuite implementation and support engagements, so there's no open-ended AI experimentation budget." },
  { q: "Will this require custom SuiteScript development?", a: "Some use cases need custom SuiteScript or SuiteFlow work to route AI outputs correctly; others can be delivered through configuration and existing NetSuite extension points. We tell you which is which during use case prioritization, before any development budget is committed." },
  { q: "How is this different from just turning on NetSuite's built-in AI features ourselves?", a: "NetSuite's native AI features are a starting point, not a governance model. We help you decide which of those features are safe to enable as-is, which need additional approval routing before they touch production data, and where a custom agent is worth building instead." },
];

const RELATED_SERVICES = {
  eyebrow: "Related Services",
  heading: "Explore More Ways Mirketa Supports AI on Finance & Operations Technology",
  intro: "NetSuite AI consulting works best alongside a stable instance and a clean data foundation. Here's where to look next.",
  items: [
    { slug: NETSUITE_PAGES.IMPLEMENTATION.slug, label: NETSUITE_PAGES.IMPLEMENTATION.label, description: "Not live on NetSuite yet, or mid-migration? Start with implementation before layering on AI governance." },
    { slug: NETSUITE_PAGES.SUPPORT_SERVICES.slug, label: NETSUITE_PAGES.SUPPORT_SERVICES.label, description: "SLA-backed administration and optimization for the NetSuite instance your AI agents will run inside." },
    { slug: AI_PAGES.AI_READINESS.slug, label: AI_PAGES.AI_READINESS.label, description: "A broader, platform-agnostic AI readiness assessment for organizations evaluating AI beyond NetSuite alone." },
    { slug: AI_PAGES.AGENTIC_ORCHESTRATION.slug, label: AI_PAGES.AGENTIC_ORCHESTRATION.label, description: "Coordinate AI agents across NetSuite and the other systems in your stack, not just within one application." },
    { slug: AI_PAGES.AI_DATA_FOUNDATIONS.slug, label: AI_PAGES.AI_DATA_FOUNDATIONS.label, description: "Build the clean, governed data foundation that makes predictive forecasting and anomaly detection reliable." },
  ],
};

const CONSULTATION = {
  eyebrow: "Get Started",
  heading: "Get Your NetSuite AI Consulting Roadmap",
  description: "Tell us which NetSuite workflows you want AI to touch first — a consultant will map a phased, governed rollout and follow up within one business day.",
  formTitle: "Request a NetSuite AI Consulting Assessment",
};

const SEO = {
  title: "NetSuite AI Consulting Services | Mirketa",
  description:
    "Mirketa's NetSuite AI Consulting helps finance teams govern AI agents, forecasting, and reporting on a live NetSuite instance without losing audit control.",
  canonical: `https://mirketa.us${NETSUITE_PAGES.AI.slug}/`,
  keywords: [
    "NetSuite AI Consulting",
    "AI Governance in NetSuite",
    "NetSuite AI Readiness Assessment",
    "AI-Assisted Financial Close",
    "Predictive Forecasting NetSuite",
    "AI Agent Governance",
    "SuiteScript AI Extensions",
    "Governed AI Agents Finance",
  ],
  schema: [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "NetSuite AI Consulting",
      provider: { "@type": "Organization", name: "Mirketa Inc.", url: "https://mirketa.us" },
      name: "NetSuite AI Consulting",
      description: "AI readiness assessment, governed AI agent design, predictive analytics, and AI governance consulting for organizations already running NetSuite.",
      areaServed: "Global",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://mirketa.us/" },
        { "@type": "ListItem", position: 2, name: NETSUITE_PAGES.AI.label, item: `https://mirketa.us${NETSUITE_PAGES.AI.slug}/` },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ],
};

// ============================================================
// MAIN COMPONENT
// ============================================================

export default function NetsuiteAI() {
  const heroTextRef = useRef(null);
  const heroRef = useRef(null);

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

      gsap.utils.toArray(".nsa-reveal").forEach((el) => {
        gsap.from(el, { opacity: prefersReduced ? 1 : 0, y: prefersReduced ? 0 : 32, duration: 0.7, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 88%" } });
      });
      gsap.utils.toArray(".nsa-reveal-left").forEach((el) => {
        gsap.from(el, { opacity: prefersReduced ? 1 : 0, x: prefersReduced ? 0 : -30, duration: 0.7, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 88%" } });
      });
      gsap.utils.toArray(".nsa-reveal-right").forEach((el) => {
        gsap.from(el, { opacity: prefersReduced ? 1 : 0, x: prefersReduced ? 0 : 30, duration: 0.7, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 88%" } });
      });
      gsap.utils.toArray(".nsa-reveal-stagger").forEach((el) => {
        gsap.from(el.children, { opacity: prefersReduced ? 1 : 0, y: prefersReduced ? 0 : 26, duration: 0.6, stagger: 0.06, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 85%" } });
      });
      gsap.utils.toArray(".nsa-zoom-in").forEach((el) => {
        gsap.from(el, { opacity: prefersReduced ? 1 : 0, scale: prefersReduced ? 1 : 0.94, duration: 0.6, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 88%" } });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="netsuite-ai-consulting">
      <Seo {...SEO} />
      <HeroSection heroTextRef={heroTextRef} heroRef={heroRef} />
      <TrustedByMarquee label="Trusted by Finance Leaders Governing AI on NetSuite" />
      <ChallengesSection />
      <SolutionSection />
      <FeaturesSection />
      <BenefitsSection />
      <ServicesIncludedSection />
      <ProcessSection />
      <WhyMirketaSection />
      <IndustriesSection />
      <CaseStudySection />
      <FaqSection />
      <RelatedServices {...RELATED_SERVICES} className="nsa-related nsa-reveal" />
      <ConsultationSection {...CONSULTATION} />
      <StickyCta heroRef={heroRef} label="Get a NetSuite AI Consulting Roadmap" />
    </div>
  );
}

// ============================================================
// HERO
// ============================================================

function HeroSection({ heroTextRef, heroRef }) {
  return (
    <section ref={heroRef} className="nsa-hero" style={{ backgroundImage: `url("${Images.heroNetSuiteAIConsulting}")` }} aria-label="NetSuite AI Consulting by Mirketa">
      <div className="nsa-hero__scrim" />
      <div className="container">
        <Breadcrumb items={BREADCRUMB_ITEMS} className="nsa-breadcrumb" />
        <div className="nsa-hero__inner">
          <div ref={heroTextRef} className="nsa-hero__text">
            <span className="nsa-badge">
              <span className="nsa-badge__spark" aria-hidden="true">✦</span> {HERO.badge}
            </span>
            <h1>{HERO.title}</h1>
            <p className="nsa-hero__description">{HERO.description}</p>
            <div className="nsa-hero__ctas">
              <a href={HERO.primaryCta.href} className="btn btn-primary nsa-btn">
                {HERO.primaryCta.label} <span aria-hidden="true">→</span>
              </a>
              <a href={HERO.secondaryCta.href} className="btn btn-secondary nsa-btn">
                {HERO.secondaryCta.label}
              </a>
            </div>
            <ul className="nsa-hero__metrics">
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
            className="nsa-hero__visual nsa-zoom-in"
          />
        </div>
      </div>
    </section>
  );
}

// ============================================================
// BUSINESS CHALLENGES
// ============================================================

function ChallengesSection() {
  return (
    <section className="section nsa-challenges" aria-labelledby="nsa-challenges-heading">
      <div className="container">
        <div className="section-heading nsa-reveal">
          <p className="nsa-eyebrow">{CHALLENGES.eyebrow}</p>
          <h2 id="nsa-challenges-heading">{CHALLENGES.heading}</h2>
          <p>{CHALLENGES.intro}</p>
        </div>
        <div className="nsa-challenges__grid nsa-reveal-stagger">
          {CHALLENGES.items.map((c) => (
            <div className="nsa-challenge-card" key={c.title}>
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
// OUR SOLUTION
// ============================================================

function SolutionSection() {
  return (
    <section className="section nsa-solution" aria-labelledby="nsa-solution-heading">
      <div className="container nsa-solution__grid">
        <div className="nsa-reveal-left">
          <img src={Images.illoNetsuiteAiForecastDashboard} alt="" aria-hidden="true" className="nsa-solution__illo" loading="lazy" />
          <p className="nsa-eyebrow">{SOLUTION.eyebrow}</p>
          <h2 id="nsa-solution-heading">{SOLUTION.heading}</h2>
          {SOLUTION.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <div className="nsa-reveal-right">
          <AnalyticsPanel
            title="AI Recommendation Adoption"
            donutPercent={88}
            donutLabel="AI-drafted recommendations approved as-drafted after 90 days"
            metrics={[
              { value: "88%", label: "Approved as-drafted at 90 days" },
              { value: "100%", label: "Actions logged to the audit trail" },
            ]}
          />
        </div>
      </div>
    </section>
  );
}

// ============================================================
// KEY FEATURES
// ============================================================

function FeaturesSection() {
  const [big, ...rest] = FEATURES.items;
  return (
    <section className="section nsa-features" aria-labelledby="nsa-features-heading">
      <div className="container">
        <div className="section-heading nsa-reveal">
          <p className="nsa-eyebrow">{FEATURES.eyebrow}</p>
          <h2 id="nsa-features-heading">{FEATURES.heading}</h2>
          <p>{FEATURES.intro}</p>
        </div>
        <div className="nsa-features__top nsa-reveal-stagger">
          <div className="nsa-feature-card nsa-feature-card--big">
            <span className="nsa-feature-card__icon">{big.icon}</span>
            <h3>{big.title}</h3>
            <p>{big.description}</p>
          </div>
          <div className="nsa-zoom-in">
            <WorkflowDiagram
              title="How a Governed AI Agent Acts on NetSuite Data"
              steps={[
                { label: "Signal detected" },
                { label: "AI drafts recommendation" },
                { label: "Routed for approval" },
                { label: "Action applied in NetSuite" },
                { label: "Outcome logged" },
              ]}
            />
          </div>
        </div>
        <div className="nsa-features__grid nsa-reveal-stagger">
          {rest.map((f) => (
            <div className="nsa-feature-card" key={f.title}>
              <span className="nsa-feature-card__icon">{f.icon}</span>
              <h3>{f.title}</h3>
              <p>{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// BENEFITS
// ============================================================

function BenefitsSection() {
  return (
    <section className="section nsa-benefits" aria-labelledby="nsa-benefits-heading">
      <div className="container">
        <div className="section-heading nsa-reveal">
          <p className="nsa-eyebrow">{BENEFITS.eyebrow}</p>
          <h2 id="nsa-benefits-heading">{BENEFITS.heading}</h2>
          <p>{BENEFITS.intro}</p>
        </div>
        <div className="nsa-benefits__stats nsa-reveal-stagger">
          {BENEFITS.stats.map((s) => (
            <AnimatedCounter key={s.label} value={s.value} label={s.label} className="nsa-stat" />
          ))}
        </div>
        <div className="nsa-benefits__grid nsa-reveal-stagger">
          {BENEFITS.items.map((b) => (
            <div className="nsa-benefit-item" key={b.title}>
              <span aria-hidden="true">{Ico.check}</span>
              <div>
                <p className="nsa-benefit-item__title">{b.title}</p>
                <p>{b.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// SERVICES INCLUDED
// ============================================================

function ServicesIncludedSection() {
  return (
    <section className="section nsa-services" aria-labelledby="nsa-services-heading">
      <div className="container">
        <div className="section-heading nsa-reveal">
          <p className="nsa-eyebrow">{SERVICES_INCLUDED.eyebrow}</p>
          <h2 id="nsa-services-heading">{SERVICES_INCLUDED.heading}</h2>
          <p>{SERVICES_INCLUDED.intro}</p>
        </div>
        <div className="nsa-services__layout">
          <div className="nsa-services__list nsa-reveal-stagger">
            {SERVICES_INCLUDED.items.map((s) => (
              <div className="nsa-service-item" key={s.title}>
                <h3>{s.title}</h3>
                <p>{s.description}</p>
              </div>
            ))}
          </div>
          <div className="nsa-reveal-right">
            <FinanceChart title={SERVICES_INCLUDED.chart.title} kpis={SERVICES_INCLUDED.chart.kpis} bars={SERVICES_INCLUDED.chart.bars} />
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// IMPLEMENTATION PROCESS (AI DELIVERY METHODOLOGY)
// ============================================================

function ProcessSection() {
  return (
    <section className="section nsa-process" aria-labelledby="nsa-process-heading">
      <div className="container">
        <div className="section-heading nsa-reveal">
          <p className="nsa-eyebrow">{PROCESS.eyebrow}</p>
          <h2 id="nsa-process-heading">{PROCESS.heading}</h2>
          <p>{PROCESS.intro}</p>
        </div>
        <div className="nsa-zoom-in">
          <SupplyChainMap title={PROCESS.network.title} nodes={PROCESS.network.nodes} />
        </div>
        <div className="nsa-process__grid nsa-reveal-stagger">
          {PROCESS.detail.map((p, i) => (
            <div className="nsa-step-card" key={p.name}>
              <span className="nsa-step-card__num">{String(i + 1).padStart(2, "0")}</span>
              <p className="nsa-step-card__title">{p.name}</p>
              <p>{p.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// WHY MIRKETA
// ============================================================

function WhyMirketaSection() {
  return (
    <section className="section nsa-why" aria-labelledby="nsa-why-heading">
      <div className="container">
        <div className="section-heading nsa-reveal">
          <p className="nsa-eyebrow">{WHY_MIRKETA.eyebrow}</p>
          <h2 id="nsa-why-heading">{WHY_MIRKETA.heading}</h2>
          <p>{WHY_MIRKETA.intro}</p>
        </div>
        <div className="nsa-why__grid nsa-reveal-stagger">
          {WHY_MIRKETA.items.map((w) => (
            <div className="nsa-why-card" key={w.title}>
              <span className="nsa-why-card__icon">{w.icon}</span>
              <p className="nsa-why-card__title">{w.title}</p>
              <p>{w.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// INDUSTRY SOLUTIONS
// ============================================================

function IndustriesSection() {
  return (
    <section className="section nsa-industries" aria-label={INDUSTRIES.heading}>
      <div className="container">
        <div className="section-heading nsa-reveal">
          <p className="nsa-eyebrow">{INDUSTRIES.eyebrow}</p>
          <p className="nsa-section-title">{INDUSTRIES.heading}</p>
          <p>{INDUSTRIES.intro}</p>
        </div>
        <div className="nsa-industries__grid nsa-reveal-stagger">
          {INDUSTRIES.items.map((n) => (
            <div className="nsa-industry-card" key={n.title}>
              <span className="nsa-industry-card__icon">{n.icon}</span>
              <p className="nsa-industry-card__title">{n.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// CASE STUDY / RESULTS
// ============================================================

function CaseStudySection() {
  return (
    <section className="section nsa-cases" aria-labelledby="nsa-cases-heading">
      <div className="container">
        <div className="section-heading nsa-reveal">
          <p className="nsa-eyebrow">{CASE_STUDIES.eyebrow}</p>
          <h2 id="nsa-cases-heading">{CASE_STUDIES.heading}</h2>
          <p>{CASE_STUDIES.intro}</p>
        </div>
        <div className="nsa-cases__grid nsa-reveal-stagger">
          {CASE_STUDIES.cases.map((c) => (
            <div className="nsa-case-card" key={c.title}>
              <span className="nsa-case-card__tag">{c.industry}</span>
              <h3>{c.title}</h3>
              <dl className="nsa-case-card__fields">
                <div><dt>Challenge</dt><dd>{c.challenge}</dd></div>
                <div><dt>Solution</dt><dd>{c.solution}</dd></div>
                <div><dt>Outcome</dt><dd>{c.outcome}</dd></div>
              </dl>
            </div>
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
  return (
    <section className="section nsa-faq" aria-labelledby="nsa-faq-heading">
      <div className="container">
        <div className="section-heading nsa-reveal">
          <p className="nsa-eyebrow">FAQ</p>
          <h2 id="nsa-faq-heading">Frequently Asked Questions About NetSuite AI Consulting</h2>
        </div>
        <FaqAccordion items={FAQS} className="nsa-reveal" searchPlaceholder="Ask a question — e.g. &quot;governance&quot;, &quot;pricing&quot;, &quot;timeline&quot;..." />
        <p className="nsa-faq__links">
          Related reading: <Link to={NETSUITE_PAGES.IMPLEMENTATION.slug}>{NETSUITE_PAGES.IMPLEMENTATION.label}</Link>,{" "}
          <Link to={NETSUITE_PAGES.SUPPORT_SERVICES.slug}>{NETSUITE_PAGES.SUPPORT_SERVICES.label}</Link>,{" "}
          <Link to={AI_PAGES.AI_READINESS.slug}>{AI_PAGES.AI_READINESS.label}</Link>,{" "}
          <Link to={AI_PAGES.AGENTIC_ORCHESTRATION.slug}>{AI_PAGES.AGENTIC_ORCHESTRATION.label}</Link>,{" "}
          <Link to={AI_PAGES.AI_DATA_FOUNDATIONS.slug}>{AI_PAGES.AI_DATA_FOUNDATIONS.label}</Link>.
        </p>
      </div>
    </section>
  );
}
