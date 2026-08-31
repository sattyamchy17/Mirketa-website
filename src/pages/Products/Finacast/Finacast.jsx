import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PRODUCT_PAGES, SALESFORCE_PAGES, AI_PAGES } from "../../../config/pageSlugs.js";
import { Images } from "../../../assets/images/index.js";
import Seo from "../../../components/Seo/Seo.jsx";
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb.jsx";
import StickyCta from "../../../components/StickyCta/StickyCta.jsx";
import TrustedByMarquee from "../../../components/TrustedByMarquee/TrustedByMarquee.jsx";
import FaqAccordion from "../../../components/FaqAccordion/FaqAccordion.jsx";
import HeroVisual from "../../../components/HeroVisual/HeroVisual.jsx";
import ConsultationSection from "../../../components/ConsultationSection/ConsultationSection.jsx";
import RelatedServices from "../../../components/RelatedServices/RelatedServices.jsx";
import AnalyticsPanel from "../../../components/illustrations/AnalyticsPanel/AnalyticsPanel.jsx";
import WorkflowDiagram from "../../../components/illustrations/WorkflowDiagram/WorkflowDiagram.jsx";
import "./Finacast.css";

gsap.registerPlugin(ScrollTrigger);

// ============================================================
// SLUG / SEO CONFIGURATION — kept local to this component per
// project convention, sourced from the central pageSlugs.js entry
// so the URL itself still only needs to change in one place.
//
// Keyword strategy (researched against Finacast's verified capability
// set — AI-powered revenue forecasting natively on Salesforce, with
// scenario modeling and variance analysis — not guessed):
// ============================================================

const seoKeywords = {
  primary: "AI Revenue Forecasting Software",
  secondary: [
    "Salesforce revenue forecasting",
    "AI financial forecasting software",
    "sales forecasting AI",
    "scenario modeling software",
    "variance analysis tool",
    "predictive revenue analytics",
    "Salesforce forecasting app",
    "revenue prediction software",
  ],
  longTail: [
    "AI revenue forecasting for Salesforce sales teams",
    "scenario modeling and variance analysis software for finance teams",
    "how to improve revenue forecast accuracy with AI",
  ],
};

export const pageSEO = {
  slug: `${PRODUCT_PAGES.FINACAST.slug}/`,
  title: "AI Revenue Forecasting Software | Mirketa",
  description:
    "Finacast is AI revenue forecasting software built natively on Salesforce — accurate predictions, scenario modeling, and variance analysis for revenue teams.",
  keywords: seoKeywords,
};

// ============================================================
// ICONS
// ============================================================

const Ico = {
  check: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12.5l5 5L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  chart: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 20V10M12 20V4M20 20v-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
  ),
  branch: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="6" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.4" /><circle cx="6" cy="18" r="2.5" stroke="currentColor" strokeWidth="1.4" /><circle cx="18" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.4" /><path d="M6 8.5v7M8.3 7l7.5 3.8M8.3 17l7.5-3.8" stroke="currentColor" strokeWidth="1.3" /></svg>
  ),
  target: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.4" /><circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.4" /><circle cx="12" cy="12" r="1.2" fill="currentColor" /></svg>
  ),
  sliders: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h13M20 18h-1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><circle cx="16" cy="6" r="2" stroke="currentColor" strokeWidth="1.4" /><circle cx="8" cy="12" r="2" stroke="currentColor" strokeWidth="1.4" /><circle cx="16" cy="18" r="2" stroke="currentColor" strokeWidth="1.4" /></svg>
  ),
  db: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><ellipse cx="12" cy="6" rx="7" ry="3" stroke="currentColor" strokeWidth="1.4" /><path d="M5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6" stroke="currentColor" strokeWidth="1.4" /><path d="M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3" stroke="currentColor" strokeWidth="1.4" /></svg>
  ),
  award: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="8" r="5" stroke="currentColor" strokeWidth="1.4" /><path d="M8.5 12.5L7 21l5-2.5L17 21l-1.5-8.5" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  compass: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" /><path d="M15 9l-2 6-6 2 2-6 6-2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  clock: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" /><path d="M12 7v5l3.5 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  users: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="9" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.4" /><path d="M3.5 19c.6-3.4 2.9-5.2 5.5-5.2s4.9 1.8 5.5 5.2" stroke="currentColor" strokeWidth="1.4" /><circle cx="17" cy="9" r="2.6" stroke="currentColor" strokeWidth="1.3" opacity="0.7" /><path d="M15.5 13.4c2.2.3 3.7 1.9 4 4.6" stroke="currentColor" strokeWidth="1.3" opacity="0.7" /></svg>
  ),
  building: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="5" y="3" width="14" height="18" rx="1.4" stroke="currentColor" strokeWidth="1.4" /><path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
  ),
  cloud: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 18h10a4 4 0 000-8 5.5 5.5 0 00-10.7-1.7A4.5 4.5 0 007 18z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  layers: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3l9 5-9 5-9-5 9-5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M3 13l9 5 9-5" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  presentation: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="4" width="18" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.4" /><path d="M12 16v4M8 20h8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /><path d="M7 13l3-3 2 2 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
};

// ============================================================
// DATA
// ============================================================

const BREADCRUMB_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Products & IP", href: "/" },
  { label: PRODUCT_PAGES.FINACAST.label },
];

const HERO = {
  badge: "Salesforce-Native Revenue Product",
  title: "AI Revenue Forecasting Software for Salesforce Revenue Teams",
  description:
    "Finacast is Mirketa's AI-powered revenue forecasting product, built natively on Salesforce. It turns your live pipeline and opportunity data into accurate revenue predictions, scenario models, and variance analysis — so forecast reviews run on real CRM data instead of a spreadsheet someone rebuilds every Monday.",
  primaryCta: { label: "See Finacast in Action", href: "#contact" },
  secondaryCta: { label: "Talk to a Finacast Advisor", href: "#contact" },
  metrics: ["Native to Salesforce Pipeline Data", "AI-Assisted Revenue Predictions", "Scenario Modeling Built In", "Variance Analysis Without Spreadsheets"],
};

const HERO_DASHBOARD = {
  title: "Finacast Forecast Console",
  stats: [
    { label: "FORECAST SOURCE", value: "Live Pipeline", caption: "Synced from Salesforce" },
    { label: "SCENARIO MODELS", value: "Base / Upside / Downside", caption: "Compared side by side" },
    { label: "VARIANCE TRACKING", value: "Continuous", caption: "Actuals vs. forecast" },
  ],
  rows: [
    { title: "Q3 forecast recalculated", meta: "Pipeline data synced automatically", tone: "good", status: "Complete" },
    { title: "Downside scenario modeled", meta: "Applied to enterprise segment", tone: "good", status: "Complete" },
    { title: "Variance review — West region", meta: "Flagged for manager follow-up", tone: "neutral", status: "In Progress" },
  ],
  floatingCards: [
    { icon: Ico.chart, title: "Forecast Synced", subtitle: "Direct from Salesforce pipeline" },
    { icon: Ico.branch, title: "Scenario Modeled", subtitle: "Upside case compared to base" },
  ],
};

const CHALLENGES = {
  eyebrow: "Key Challenges",
  heading: "Why Revenue Forecasting Still Runs on Guesswork",
  intro:
    "Most forecasting problems aren't about the math — they're about forecasts that live outside the system where the actual pipeline data does.",
  items: [
    { title: "Forecasts Disconnected From Live Pipeline Data", description: "Spreadsheet forecasts get built from an export that's stale the moment a deal moves stage in Salesforce." },
    { title: "No Way to Model More Than One Scenario", description: "Sales leadership needs a base, upside, and downside view, but rebuilding three versions manually eats a full day every cycle." },
    { title: "Variance Analysis Happens Too Late", description: "Actual-versus-forecast gaps usually surface only after the quarter closes, when nothing can be done about them." },
    { title: "Inconsistent Forecasting Methodology Across Teams", description: "Every region or team rolls up numbers a little differently, making board-level forecasts hard to trust." },
  ],
};

const SOLUTION = {
  eyebrow: "Solution & Capabilities",
  heading: "Forecasts Built From the Pipeline Data You Already Trust",
  paragraphs: [
    "Finacast runs natively inside Salesforce, so it works from the opportunity and pipeline data your sales teams already update — not a parallel spreadsheet someone maintains by hand.",
    "AI-assisted predictions give revenue leaders a forecast grounded in actual deal activity, while built-in scenario modeling lets teams compare a base case against upside and downside variations without rebuilding the model from scratch.",
    "Mirketa configures Finacast around your organization's actual sales process — territories, forecast categories, and roll-up hierarchy — so the forecast reflects how your revenue teams actually operate, not a generic default.",
  ],
};

const SERVICES = {
  eyebrow: "Core Features",
  heading: "What Finacast Delivers Out of the Box",
  intro: "Every Finacast implementation starts from this core capability set, then gets configured to your forecasting process.",
  items: [
    { icon: Ico.chart, title: "AI-Powered Revenue Predictions", description: "Forecasts generated from live Salesforce pipeline and opportunity data, not a manually maintained spreadsheet." },
    { icon: Ico.branch, title: "Scenario Modeling", description: "Compare base, upside, and downside revenue scenarios side by side without rebuilding the model each time." },
    { icon: Ico.target, title: "Variance Analysis", description: "Actuals tracked against forecast on an ongoing basis, so gaps surface while there's still time to act." },
    { icon: Ico.db, title: "Native Salesforce Data Model", description: "Built on the same opportunity, account, and pipeline objects your sales team already works in every day." },
    { icon: Ico.sliders, title: "Configurable Forecast Periods", description: "Forecast cadence and roll-up structure configured to match how your organization actually reports revenue." },
    { icon: Ico.presentation, title: "Forecast Accuracy Tracking", description: "A consistent view of how forecasts compare to actuals over time, by team, territory, or segment." },
  ],
};

const TECHNICAL = {
  eyebrow: "Salesforce Platform Fit",
  heading: "Built to Work Inside the Salesforce Instance You Already Have",
  intro: "Finacast is Salesforce-native, which shapes how it fits into your existing CRM setup.",
  items: [
    { title: "Runs on Sales Cloud Pipeline Data", description: "Forecasts pull directly from the opportunity, pipeline, and stage data your sales team already maintains in Salesforce." },
    { title: "Configurable Per Team or Territory", description: "Forecast roll-ups and scenario models can be scoped to match your existing territory and team structure." },
    { title: "Works Alongside Native Salesforce Reporting", description: "Finacast outputs are designed to complement — not replace — the reports and dashboards your teams already use." },
    { title: "No Separate Data Migration Required", description: "Because it runs on data already in Salesforce, there's no parallel dataset to import or keep in sync." },
  ],
};

const AI_AUTOMATION = {
  eyebrow: "AI-Powered Forecasting Intelligence",
  heading: "Where AI Actually Changes the Forecasting Process",
  intro: "Finacast's AI capabilities are aimed squarely at the parts of forecasting that are the most manual and the most error-prone.",
  items: [
    { title: "Predictive Revenue Modeling", description: "Revenue predictions generated from historical pipeline behavior and current deal signals, not a flat linear projection." },
    { title: "Automated Variance Flagging", description: "Meaningful gaps between forecast and actuals are surfaced automatically instead of requiring a manual comparison." },
    { title: "Scenario Comparison at a Glance", description: "Base, upside, and downside scenarios generated and compared without manually rebuilding each version." },
    { title: "Pipeline Health Signals", description: "Deal-level signals that inform the forecast are visible alongside the numbers, not hidden behind them." },
  ],
};

const BENEFITS = {
  eyebrow: "Benefits",
  heading: "What Changes Once Forecasting Runs on Live Pipeline Data",
  intro: "These are the practical outcomes revenue and finance teams look for once forecasting is grounded in the CRM instead of a spreadsheet.",
  items: [
    { title: "Forecasts Rooted in Real Pipeline Data", description: "Every forecast reflects the same opportunity data your sales team is already updating, not a stale export." },
    { title: "Scenario Planning Without Spreadsheets", description: "Base, upside, and downside models available on demand instead of rebuilt by hand for every review." },
    { title: "Faster, Earlier Variance Analysis", description: "Gaps between forecast and actuals are visible in time to act on them, not after the quarter closes." },
    { title: "One Consistent Forecasting Methodology", description: "Every team rolls up forecasts the same way, making board-level numbers easier to trust." },
  ],
};

const USE_CASES = {
  eyebrow: "Use Cases",
  heading: "Where Revenue Teams Put Finacast to Work",
  intro: "Forecasting needs look different depending on who's asking — Finacast is configured around each of these views.",
  items: [
    { icon: Ico.presentation, title: "Sales Leadership Forecast Reviews" },
    { icon: Ico.chart, title: "Finance & FP&A Revenue Planning" },
    { icon: Ico.building, title: "Territory & Team-Level Forecasting" },
    { icon: Ico.users, title: "Board & Investor Revenue Reporting" },
    { icon: Ico.branch, title: "Scenario Planning for New Product Lines" },
    { icon: Ico.target, title: "Quota Planning & Attainment Tracking" },
  ],
};

const SCENARIOS = {
  eyebrow: "Implementation Scenarios",
  heading: "How Revenue Teams Typically Configure Finacast",
  intro: "Illustrative scenarios based on common forecasting needs — not a specific client engagement.",
  cases: [
    {
      title: "A Sales Org Replaces Its Manual Forecast Spreadsheet",
      tag: "Sales Leadership",
      challenge: "Regional sales managers each maintained a separate forecast spreadsheet that rarely matched Salesforce pipeline data by the time leadership reviewed it.",
      approach: "Mirketa configured Finacast to generate forecasts directly from each region's live pipeline, with a shared roll-up view for leadership.",
      result: "Forecast reviews now run from one consistent, pipeline-linked view instead of reconciling several spreadsheets.",
    },
    {
      title: "A Finance Team Adds Scenario Modeling to Quarterly Planning",
      tag: "Finance & FP&A",
      challenge: "Quarterly planning needed base, upside, and downside revenue scenarios, but each version had to be built manually in a separate file.",
      approach: "Mirketa configured Finacast's scenario modeling around the finance team's existing planning assumptions and segments.",
      result: "All three scenarios are now generated from the same underlying pipeline data and compared side by side.",
    },
  ],
};

const WHY_MIRKETA = {
  eyebrow: "Why Mirketa",
  heading: "Implementation Support From a Team That Knows Salesforce Revenue Data",
  intro: "Plenty of partners can install an app. Fewer understand how your forecast categories, territories, and roll-up hierarchy actually need to work together.",
  items: [
    { icon: Ico.award, title: "Salesforce Platform Depth", description: "Deep Salesforce implementation experience, applied specifically to how Finacast reads pipeline and opportunity data." },
    { icon: Ico.compass, title: "Revenue Process Awareness", description: "Configuration built around your actual forecast categories and territory structure, not a generic default." },
    { icon: Ico.clock, title: "Structured, Scoped Delivery", description: "A defined implementation timeline scoped to your forecasting cadence and reporting calendar." },
    { icon: Ico.shield, title: "Data Accuracy First", description: "Forecast configuration treats clean, consistent pipeline data as a prerequisite, not an afterthought." },
    { icon: Ico.users, title: "Dedicated Delivery Team", description: "The consultants who scope your engagement support it through go-live and beyond." },
    { icon: Ico.compass, title: "Support Beyond Go-Live", description: "Ongoing configuration support available as your forecasting process or org structure evolves." },
  ],
};

const TECHNOLOGIES = {
  eyebrow: "Technology Stack",
  heading: "The Platform Capabilities This Work Builds On",
  intro: "Selected based on your existing Salesforce setup, not a default recommendation.",
  items: [
    { icon: Ico.cloud, title: "Salesforce Sales Cloud" },
    { icon: Ico.chart, title: "Finacast Forecasting Engine" },
    { icon: Ico.branch, title: "Scenario Modeling Tools" },
    { icon: Ico.target, title: "Variance Analysis Reporting" },
    { icon: Ico.layers, title: "Salesforce Dashboards" },
    { icon: Ico.db, title: "AI-Assisted Prediction Models" },
  ],
};

const PROCESS = {
  eyebrow: "Implementation Process",
  heading: "A Five-Stage Path From Forecast Assessment to Optimized Reviews",
  intro: "A structured methodology for configuring Finacast around your existing forecasting cadence.",
  steps: [
    { label: "Forecast Process Assessment" },
    { label: "Configuration Design" },
    { label: "Data Model Setup" },
    { label: "Validation" },
    { label: "Launch & Optimize" },
  ],
  detail: [
    { name: "Forecast Process Assessment", description: "Current forecast categories, territories, and roll-up hierarchy mapped against Finacast's configuration options." },
    { name: "Configuration Design", description: "Scenario models and variance reporting designed around your planning assumptions and reporting cadence." },
    { name: "Data Model Setup", description: "Finacast connected to the pipeline and opportunity data your sales team already maintains." },
    { name: "Validation", description: "Forecast outputs validated against a full cycle before rolling out to the broader revenue team." },
    { name: "Launch & Optimize", description: "Supported go-live followed by continuous refinement as forecasting needs evolve." },
  ],
};

const FAQS = [
  { q: "What is Finacast?", a: "Finacast is Mirketa's AI-powered revenue forecasting product, built natively on Salesforce, that generates revenue predictions with scenario modeling and variance analysis." },
  { q: "Does Finacast require a separate data migration?", a: "No. Finacast works from the opportunity and pipeline data already in your Salesforce instance, so there's no parallel dataset to import or maintain." },
  { q: "Can Finacast model more than one forecast scenario?", a: "Yes. Finacast supports base, upside, and downside scenario modeling, compared side by side without rebuilding each version manually." },
  { q: "How does variance analysis work in Finacast?", a: "Finacast tracks actuals against forecast on an ongoing basis and surfaces meaningful gaps, rather than waiting until the end of the quarter to compare the two." },
  { q: "Can forecasting be configured per territory or team?", a: "Yes. Mirketa configures forecast roll-ups and scenario models to match your existing territory and team structure." },
  { q: "Does Finacast replace our existing Salesforce reports?", a: "No. Finacast is designed to complement your existing Salesforce reports and dashboards, not replace them." },
  { q: "Who typically uses Finacast inside an organization?", a: "Sales leadership, finance and FP&A teams, and revenue operations typically use Finacast for forecast reviews, planning, and board reporting." },
  { q: "Do you provide support after Finacast is configured?", a: "Yes. Ongoing configuration support is available as your forecasting process, territories, or reporting needs evolve." },
];

const RELATED_SERVICES = {
  eyebrow: "Related Reading",
  heading: "Explore More of Mirketa's Salesforce-Native Products",
  intro: "Finacast is one part of Mirketa's Salesforce product suite. Here's where to look next.",
  items: [
    { slug: PRODUCT_PAGES.ECOURIER.slug, label: PRODUCT_PAGES.ECOURIER.label, description: "See how forecast dashboards and reports can be scheduled and auto-delivered to stakeholders." },
    { slug: PRODUCT_PAGES.DUPLICATE_SEARCH_MERGE.slug, label: PRODUCT_PAGES.DUPLICATE_SEARCH_MERGE.label, description: "Keep the account and opportunity data your forecasts depend on clean and duplicate-free." },
    { slug: SALESFORCE_PAGES.DEVELOPMENT_CONSULTING.slug, label: SALESFORCE_PAGES.DEVELOPMENT_CONSULTING.label, description: "Explore Mirketa's broader Salesforce development and consulting services." },
    { slug: "/salesforce-ai-services", label: "Salesforce AI Services & CRM Solutions", description: "See the full suite of AI-powered Salesforce products and services Mirketa builds and supports." },
    { slug: AI_PAGES.AI_DATA_FOUNDATIONS.slug, label: AI_PAGES.AI_DATA_FOUNDATIONS.label, description: "Build the governed data foundation that keeps AI-assisted forecasting reliable." },
  ],
};

const FINAL_CTA = {
  heading: "Turn Live Pipeline Data Into a Forecast You Can Trust",
  description: "Partner with Mirketa to configure Finacast around your forecasting process — or talk to a Finacast advisor first.",
  primaryCta: { label: "See Finacast in Action", href: "#contact" },
  secondaryCta: { label: "Talk to a Finacast Advisor", href: "#contact" },
};

const CONSULTATION = {
  eyebrow: "Get Started",
  heading: "Talk to a Finacast Advisor",
  description: "Tell us about your forecasting process and Salesforce setup — a Finacast advisor will follow up within one business day.",
  formTitle: "Request a Finacast Walkthrough",
};

const SEO = {
  title: pageSEO.title,
  description: pageSEO.description,
  canonical: `https://mirketa.us${pageSEO.slug}`,
  keywords: [seoKeywords.primary, ...seoKeywords.secondary],
  schema: [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "AI Revenue Forecasting Software",
      provider: { "@type": "Organization", name: "Mirketa Inc.", url: "https://mirketa.us" },
      name: "Finacast",
      description: "AI-powered revenue forecasting built natively on Salesforce, with scenario modeling and variance analysis.",
      areaServed: "Global",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://mirketa.us/" },
        { "@type": "ListItem", position: 2, name: PRODUCT_PAGES.FINACAST.label, item: `https://mirketa.us${pageSEO.slug}` },
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

export default function Finacast() {
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

      gsap.utils.toArray(".fc-reveal").forEach((el) => {
        gsap.from(el, { opacity: prefersReduced ? 1 : 0, y: prefersReduced ? 0 : 32, duration: 0.7, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 88%" } });
      });
      gsap.utils.toArray(".fc-reveal-left").forEach((el) => {
        gsap.from(el, { opacity: prefersReduced ? 1 : 0, x: prefersReduced ? 0 : -30, duration: 0.7, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 88%" } });
      });
      gsap.utils.toArray(".fc-reveal-right").forEach((el) => {
        gsap.from(el, { opacity: prefersReduced ? 1 : 0, x: prefersReduced ? 0 : 30, duration: 0.7, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 88%" } });
      });
      gsap.utils.toArray(".fc-reveal-stagger").forEach((el) => {
        gsap.from(el.children, { opacity: prefersReduced ? 1 : 0, y: prefersReduced ? 0 : 26, duration: 0.6, stagger: 0.06, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 85%" } });
      });
      gsap.utils.toArray(".fc-zoom-in").forEach((el) => {
        gsap.from(el, { opacity: prefersReduced ? 1 : 0, scale: prefersReduced ? 1 : 0.94, duration: 0.6, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 88%" } });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="product-finacast">
      <Seo {...SEO} />
      <HeroSection heroTextRef={heroTextRef} heroRef={heroRef} />
      <TrustedByMarquee label="Trusted by Revenue and Finance Teams on Salesforce" />
      <ChallengesSection />
      <SolutionSection />
      <ServicesSection />
      <TechnicalSection />
      <AiAutomationSection />
      <BenefitsSection />
      <UseCasesSection />
      <ScenariosSection />
      <WhyMirketaSection />
      <TechnologiesSection />
      <ProcessSection />
      <FaqSection />
      <RelatedServices {...RELATED_SERVICES} className="fc-related fc-reveal" />
      <FinalCtaSection />
      <ConsultationSection {...CONSULTATION} />
      <StickyCta heroRef={heroRef} label="See Finacast in Action" />
    </div>
  );
}

// ============================================================
// HERO
// ============================================================

function HeroSection({ heroTextRef, heroRef }) {
  return (
    <section ref={heroRef} className="fc-hero" style={{ backgroundImage: `url("${Images.heroFinacast}")` }} aria-label="Finacast AI Revenue Forecasting by Mirketa">
      <div className="fc-hero__scrim" />
      <div className="container">
        <Breadcrumb items={BREADCRUMB_ITEMS} className="fc-breadcrumb" />
        <div className="fc-hero__inner">
          <div ref={heroTextRef} className="fc-hero__text">
            <span className="fc-badge">
              <span className="fc-badge__spark" aria-hidden="true">✦</span> {HERO.badge}
            </span>
            <h1>{HERO.title}</h1>
            <p className="fc-hero__description">{HERO.description}</p>
            <div className="fc-hero__ctas">
              <a href={HERO.primaryCta.href} className="btn btn-primary fc-btn">
                {HERO.primaryCta.label} <span aria-hidden="true">→</span>
              </a>
              <a href={HERO.secondaryCta.href} className="btn btn-secondary fc-btn">
                {HERO.secondaryCta.label}
              </a>
            </div>
            <ul className="fc-hero__metrics">
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
            className="fc-hero__visual fc-zoom-in"
          />
        </div>
      </div>
    </section>
  );
}

// ============================================================
// KEY CHALLENGES
// ============================================================

function ChallengesSection() {
  return (
    <section className="section fc-challenges" aria-labelledby="fc-challenges-heading">
      <div className="container">
        <div className="section-heading fc-reveal">
          <p className="fc-eyebrow">{CHALLENGES.eyebrow}</p>
          <h2 id="fc-challenges-heading">{CHALLENGES.heading}</h2>
          <p>{CHALLENGES.intro}</p>
        </div>
        <div className="fc-challenges__grid fc-reveal-stagger">
          {CHALLENGES.items.map((c) => (
            <div className="fc-challenge-card" key={c.title}>
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
// SOLUTION & CAPABILITIES
// ============================================================

function SolutionSection() {
  return (
    <section className="section fc-solution" aria-labelledby="fc-solution-heading">
      <div className="container fc-solution__grid">
        <div className="fc-reveal-left">
          <p className="fc-eyebrow">{SOLUTION.eyebrow}</p>
          <h2 id="fc-solution-heading">{SOLUTION.heading}</h2>
          {SOLUTION.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <div className="fc-reveal-right">
          <AnalyticsPanel
            title="Forecast vs. Actual Tracking"
            donutPercent={91}
            donutLabel="Forecast-to-actual alignment this quarter"
            metrics={[
              { value: "3", label: "Scenarios modeled" },
              { value: "Live", label: "Pipeline sync" },
            ]}
          />
        </div>
      </div>
    </section>
  );
}

// ============================================================
// CORE FEATURES
// ============================================================

function ServicesSection() {
  return (
    <section className="section fc-services" aria-labelledby="fc-services-heading">
      <div className="container">
        <div className="fc-services__head fc-reveal">
          <div className="section-heading">
            <p className="fc-eyebrow">{SERVICES.eyebrow}</p>
            <h2 id="fc-services-heading">{SERVICES.heading}</h2>
            <p>{SERVICES.intro}</p>
          </div>
        </div>
        <div className="fc-services__grid fc-reveal-stagger">
          {SERVICES.items.map((c) => (
            <div className="fc-service-card" key={c.title}>
              <span className="fc-service-card__icon">{c.icon}</span>
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
// SALESFORCE PLATFORM FIT
// ============================================================

function TechnicalSection() {
  return (
    <section className="section fc-technical" aria-labelledby="fc-technical-heading">
      <div className="container">
        <div className="section-heading fc-reveal">
          <p className="fc-eyebrow">{TECHNICAL.eyebrow}</p>
          <h2 id="fc-technical-heading">{TECHNICAL.heading}</h2>
          <p>{TECHNICAL.intro}</p>
        </div>
        <div className="fc-technical__grid fc-reveal-stagger">
          {TECHNICAL.items.map((c) => (
            <div className="fc-technical-item" key={c.title}>
              <p className="fc-card-title">{c.title}</p>
              <p>{c.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// AI-POWERED FORECASTING INTELLIGENCE
// ============================================================

function AiAutomationSection() {
  return (
    <section className="section fc-ai" aria-labelledby="fc-ai-heading">
      <div className="container">
        <div className="section-heading fc-reveal">
          <p className="fc-eyebrow">{AI_AUTOMATION.eyebrow}</p>
          <h2 id="fc-ai-heading">{AI_AUTOMATION.heading}</h2>
          <p>{AI_AUTOMATION.intro}</p>
        </div>
        <div className="fc-ai__layout">
          <div className="fc-ai__grid fc-reveal-stagger">
            {AI_AUTOMATION.items.map((f) => (
              <div className="fc-ai-item" key={f.title}>
                <p className="fc-card-title">{f.title}</p>
                <p>{f.description}</p>
              </div>
            ))}
          </div>
          <div className="fc-reveal-right">
            <WorkflowDiagram
              title="Forecast Generation Flow"
              steps={[{ label: "Pipeline Synced" }, { label: "Prediction Modeled" }, { label: "Scenarios Compared" }, { label: "Variance Checked" }, { label: "Forecast Published" }]}
            />
          </div>
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
    <section className="section fc-benefits" aria-labelledby="fc-benefits-heading">
      <div className="container">
        <div className="section-heading fc-reveal">
          <p className="fc-eyebrow">{BENEFITS.eyebrow}</p>
          <h2 id="fc-benefits-heading">{BENEFITS.heading}</h2>
          <p>{BENEFITS.intro}</p>
        </div>
        <div className="fc-benefits__grid fc-reveal-stagger">
          {BENEFITS.items.map((b) => (
            <div className="fc-benefit-item" key={b.title}>
              <span aria-hidden="true">{Ico.check}</span>
              <div>
                <p className="fc-card-title">{b.title}</p>
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
// USE CASES
// ============================================================

function UseCasesSection() {
  return (
    <section className="section fc-usecases" aria-labelledby="fc-usecases-heading">
      <div className="container">
        <div className="section-heading fc-reveal">
          <p className="fc-eyebrow">{USE_CASES.eyebrow}</p>
          <h2 id="fc-usecases-heading">{USE_CASES.heading}</h2>
          <p>{USE_CASES.intro}</p>
        </div>
        <div className="fc-usecases__grid fc-reveal-stagger">
          {USE_CASES.items.map((n) => (
            <div className="fc-usecase-card" key={n.title}>
              <span className="fc-usecase-card__icon">{n.icon}</span>
              <p className="fc-card-title">{n.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// IMPLEMENTATION SCENARIOS
// ============================================================

function ScenariosSection() {
  return (
    <section className="section fc-scenarios" aria-labelledby="fc-scenarios-heading">
      <div className="container">
        <div className="section-heading fc-reveal">
          <p className="fc-eyebrow">{SCENARIOS.eyebrow}</p>
          <h2 id="fc-scenarios-heading">{SCENARIOS.heading}</h2>
          <p>{SCENARIOS.intro}</p>
        </div>
        <div className="fc-scenarios__grid fc-reveal-stagger">
          {SCENARIOS.cases.map((c) => (
            <div className="fc-scenario-card" key={c.title}>
              <span className="fc-scenario-card__tag">{c.tag}</span>
              <p className="fc-card-title">{c.title}</p>
              <dl className="fc-scenario-card__fields">
                <div><dt>Challenge</dt><dd>{c.challenge}</dd></div>
                <div><dt>Approach</dt><dd>{c.approach}</dd></div>
                <div><dt>Result</dt><dd>{c.result}</dd></div>
              </dl>
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
    <section className="section fc-why" aria-labelledby="fc-why-heading">
      <div className="container">
        <div className="section-heading fc-reveal">
          <p className="fc-eyebrow">{WHY_MIRKETA.eyebrow}</p>
          <h2 id="fc-why-heading">{WHY_MIRKETA.heading}</h2>
          <p>{WHY_MIRKETA.intro}</p>
        </div>
        <div className="fc-why__grid fc-reveal-stagger">
          {WHY_MIRKETA.items.map((w, i) => (
            <div className="fc-why-card" key={`${w.title}-${i}`}>
              <span className="fc-why-card__icon">{w.icon}</span>
              <p className="fc-card-title">{w.title}</p>
              <p>{w.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// TECHNOLOGY STACK
// ============================================================

function TechnologiesSection() {
  return (
    <section className="section fc-tech" aria-labelledby="fc-tech-heading">
      <div className="container">
        <div className="section-heading fc-reveal">
          <p className="fc-eyebrow">{TECHNOLOGIES.eyebrow}</p>
          <h2 id="fc-tech-heading">{TECHNOLOGIES.heading}</h2>
          <p>{TECHNOLOGIES.intro}</p>
        </div>
        <div className="fc-tech__grid fc-reveal-stagger">
          {TECHNOLOGIES.items.map((t) => (
            <div className="fc-tech-card" key={t.title}>
              <span className="fc-tech-card__icon">{t.icon}</span>
              <p className="fc-card-title">{t.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// IMPLEMENTATION PROCESS
// ============================================================

function ProcessSection() {
  return (
    <section className="section fc-process" aria-labelledby="fc-process-heading">
      <div className="container">
        <div className="section-heading fc-reveal">
          <p className="fc-eyebrow">{PROCESS.eyebrow}</p>
          <h2 id="fc-process-heading">{PROCESS.heading}</h2>
          <p>{PROCESS.intro}</p>
        </div>
        <div className="fc-process__grid fc-reveal-stagger">
          {PROCESS.detail.map((p, i) => (
            <div className="fc-step-card" key={p.name}>
              <span className="fc-step-card__num">{String(i + 1).padStart(2, "0")}</span>
              <p className="fc-card-title">{p.name}</p>
              <p>{p.description}</p>
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
    <section className="section fc-faq" aria-labelledby="fc-faq-heading">
      <div className="container">
        <div className="section-heading fc-reveal">
          <p className="fc-eyebrow">FAQ</p>
          <h2 id="fc-faq-heading">Frequently Asked Questions About Finacast</h2>
        </div>
        <FaqAccordion items={FAQS} className="fc-reveal" searchPlaceholder="Ask a question — e.g. &quot;scenario modeling&quot;, &quot;variance&quot;, &quot;territories&quot;..." />
        <p className="fc-faq__links">
          Related reading: <Link to={PRODUCT_PAGES.ECOURIER.slug}>{PRODUCT_PAGES.ECOURIER.label}</Link>,{" "}
          <Link to={PRODUCT_PAGES.DUPLICATE_SEARCH_MERGE.slug}>{PRODUCT_PAGES.DUPLICATE_SEARCH_MERGE.label}</Link>,{" "}
          <Link to={SALESFORCE_PAGES.DEVELOPMENT_CONSULTING.slug}>{SALESFORCE_PAGES.DEVELOPMENT_CONSULTING.label}</Link>,{" "}
          <Link to={AI_PAGES.AI_DATA_FOUNDATIONS.slug}>{AI_PAGES.AI_DATA_FOUNDATIONS.label}</Link>.
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
    <section className="fc-final-cta fc-reveal" aria-labelledby="fc-final-cta-heading">
      <div className="container fc-final-cta__inner">
        <h2 id="fc-final-cta-heading">{FINAL_CTA.heading}</h2>
        <p>{FINAL_CTA.description}</p>
        <div className="fc-final-cta__ctas">
          <a href={FINAL_CTA.primaryCta.href} className="btn btn-primary fc-btn">
            {FINAL_CTA.primaryCta.label} <span aria-hidden="true">→</span>
          </a>
          <a href={FINAL_CTA.secondaryCta.href} className="btn btn-secondary fc-btn">
            {FINAL_CTA.secondaryCta.label}
          </a>
        </div>
      </div>
    </section>
  );
}
