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
import WorkflowDiagram from "../../../components/illustrations/WorkflowDiagram/WorkflowDiagram.jsx";
import AnalyticsPanel from "../../../components/illustrations/AnalyticsPanel/AnalyticsPanel.jsx";
import "./DuplicateSearchAndMerge.css";

gsap.registerPlugin(ScrollTrigger);

// ============================================================
// SLUG / SEO CONFIGURATION — kept local to this component per
// project convention, sourced from the central pageSlugs.js entry
// so the URL itself still only needs to change in one place.
//
// Keyword strategy (researched against Duplicate Search & Merge's
// verified capability — intelligent duplicate detection, matching
// rules, and one-click merge on Salesforce data):
// ============================================================

const seoKeywords = {
  primary: "Salesforce Duplicate Search and Merge Software",
  secondary: [
    "Salesforce data deduplication",
    "duplicate record detection",
    "CRM data cleansing",
    "duplicate merge tool",
    "data quality software",
    "record matching software",
    "Salesforce data accuracy",
    "AI-ready CRM data",
  ],
  longTail: [
    "find and merge duplicate Salesforce records",
    "keep Salesforce data clean and AI-ready",
    "automated duplicate detection for CRM data quality",
  ],
};

export const pageSEO = {
  slug: `${PRODUCT_PAGES.DUPLICATE_SEARCH_MERGE.slug}/`,
  title: "Salesforce Duplicate Search & Merge Software | Mirketa",
  description:
    "Duplicate Search and Merge keeps Salesforce data clean and AI-ready with intelligent duplicate detection, matching rules, and one-click merge tools.",
  keywords: seoKeywords,
};

// ============================================================
// ICONS
// ============================================================

const Ico = {
  check: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12.5l5 5L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  search: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.5" /><path d="M20 20l-4.5-4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
  ),
  merge: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 4v6a4 4 0 004 4h4M6 4L3 7M6 4l3 3M18 4v6a4 4 0 01-4 4M18 4l3 3M18 4l-3 3M14 14v6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  sliders: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h13M20 18h-1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><circle cx="16" cy="6" r="2" stroke="currentColor" strokeWidth="1.4" /><circle cx="8" cy="12" r="2" stroke="currentColor" strokeWidth="1.4" /><circle cx="16" cy="18" r="2" stroke="currentColor" strokeWidth="1.4" /></svg>
  ),
  layers: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3l9 5-9 5-9-5 9-5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M3 13l9 5 9-5" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  shieldCheck: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  history: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 12a9 9 0 109-9M3 12H1M3 12l2-2M3 12l2 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /><path d="M12 8v4l3 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
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
  users: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="9" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.4" /><path d="M3.5 19c.6-3.4 2.9-5.2 5.5-5.2s4.9 1.8 5.5 5.2" stroke="currentColor" strokeWidth="1.4" /><circle cx="17" cy="9" r="2.6" stroke="currentColor" strokeWidth="1.3" opacity="0.7" /><path d="M15.5 13.4c2.2.3 3.7 1.9 4 4.6" stroke="currentColor" strokeWidth="1.3" opacity="0.7" /></svg>
  ),
  db: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><ellipse cx="12" cy="6" rx="7" ry="3" stroke="currentColor" strokeWidth="1.4" /><path d="M5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6" stroke="currentColor" strokeWidth="1.4" /><path d="M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3" stroke="currentColor" strokeWidth="1.4" /></svg>
  ),
  cloud: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 18h10a4 4 0 000-8 5.5 5.5 0 00-10.7-1.7A4.5 4.5 0 007 18z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  brain: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 4a3 3 0 00-3 3v1a3 3 0 000 6v1a3 3 0 003 3M15 4a3 3 0 013 3v1a3 3 0 010 6v1a3 3 0 01-3 3M9 4v16M15 4v16" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
  ),
  building: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="5" y="3" width="14" height="18" rx="1.4" stroke="currentColor" strokeWidth="1.4" /><path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
  ),
  handshake: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M2 12l4-4 4 2 3-3 3 3 4 2-3 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /><path d="M6 14l3 3 3-2 3 2 3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
};

// ============================================================
// DATA
// ============================================================

const BREADCRUMB_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Products & IP", href: "/" },
  { label: PRODUCT_PAGES.DUPLICATE_SEARCH_MERGE.label },
];

const HERO = {
  badge: "Salesforce-Native Data Quality Product",
  title: "Salesforce Duplicate Search and Merge Software for Clean, AI-Ready Data",
  description:
    "Duplicate Search and Merge is Mirketa's Salesforce-native data quality product. It keeps your CRM data clean and AI-ready with intelligent duplicate detection, configurable matching rules, and one-click merge — so lead, contact, and account records stay accurate as your data grows.",
  primaryCta: { label: "See Duplicate Search & Merge in Action", href: "#contact" },
  secondaryCta: { label: "Talk to a Data Quality Advisor", href: "#contact" },
  metrics: ["Intelligent Duplicate Detection", "Configurable Matching Rules", "One-Click Merge Workflows", "Clean, AI-Ready Salesforce Data"],
};

const HERO_DASHBOARD = {
  title: "Data Quality Console",
  stats: [
    { label: "MATCHING RULES", value: "Configurable", caption: "Per object and field" },
    { label: "DUPLICATE SCAN", value: "Ongoing", caption: "Flagged as records are created" },
    { label: "MERGE WORKFLOW", value: "One-Click", caption: "Survivor record selected" },
  ],
  rows: [
    { title: "3 duplicate contacts detected", meta: "Matched on email + name", tone: "good", status: "Complete" },
    { title: "Account records merged", meta: "Survivor record confirmed", tone: "good", status: "Complete" },
    { title: "Bulk duplicate scan — Leads object", meta: "Reviewing flagged matches", tone: "neutral", status: "In Progress" },
  ],
  floatingCards: [
    { icon: Ico.search, title: "Duplicates Found", subtitle: "Matched by configured rule" },
    { icon: Ico.merge, title: "Records Merged", subtitle: "One clean record remains" },
  ],
};

const CHALLENGES = {
  eyebrow: "Key Challenges",
  heading: "Why Salesforce Data Gets Messier Over Time",
  intro:
    "Duplicate records rarely come from one source — they build up gradually from every form, import, and integration that touches your Salesforce org.",
  items: [
    { title: "Duplicates From Multiple Entry Points", description: "Web forms, manual entry, imports, and integrations each create records independently, with no shared check for existing matches." },
    { title: "Manual Merges That Risk Losing Data", description: "Merging records by hand means someone has to decide, field by field, which values survive — and mistakes are easy to make." },
    { title: "Data Quality Undermining AI and Reporting", description: "Duplicate and inconsistent records skew reports and make AI-driven initiatives less reliable than they should be." },
    { title: "No Consistent Matching Rules Across Teams", description: "Different teams define a duplicate differently, so cleanup efforts don't produce a consistent result." },
  ],
};

const SOLUTION = {
  eyebrow: "Solution & Capabilities",
  heading: "Duplicate Detection and Merge Built Into Your Salesforce Data Model",
  paragraphs: [
    "Duplicate Search and Merge runs natively inside Salesforce, scanning leads, contacts, accounts, and other objects against matching rules configured for how your organization actually defines a duplicate.",
    "When a likely duplicate is found, it's flagged for review with a clear comparison of the records involved — and merging them down to one clean record takes a single action instead of a manual, field-by-field reconciliation.",
    "Mirketa configures the matching rules and merge workflow around your actual data model, so the tool catches the duplicates that matter to your organization without flagging every near-match as a false positive.",
  ],
};

const SERVICES = {
  eyebrow: "Core Features",
  heading: "What Duplicate Search and Merge Delivers Out of the Box",
  intro: "Every implementation starts from this core capability set, then gets configured to your data model and matching requirements.",
  items: [
    { icon: Ico.search, title: "Intelligent Duplicate Detection", description: "Records scanned against configurable matching criteria to surface likely duplicates automatically." },
    { icon: Ico.sliders, title: "Configurable Matching Rules", description: "Matching logic configured per object and field, so the definition of a duplicate matches how your organization actually works." },
    { icon: Ico.merge, title: "One-Click Merge", description: "Merge matched records down to a single, clean record without a manual, field-by-field reconciliation." },
    { icon: Ico.layers, title: "Bulk Duplicate Resolution", description: "Review and resolve duplicate matches in bulk, rather than one record at a time." },
    { icon: Ico.shieldCheck, title: "Duplicate Prevention at Entry", description: "Likely duplicates are flagged at the point of creation, before they become a cleanup project later." },
    { icon: Ico.history, title: "Merge History & Audit Trail", description: "A clear record of what was merged, when, and by whom — so merge decisions stay traceable." },
  ],
};

const TECHNICAL = {
  eyebrow: "Salesforce Platform Fit",
  heading: "Built Around the Salesforce Data Model You Already Have",
  intro: "Duplicate Search and Merge is Salesforce-native, which shapes how it fits into your existing data architecture.",
  items: [
    { title: "Works Across Standard & Custom Objects", description: "Matching rules can be configured for leads, contacts, accounts, and relevant custom objects in your org." },
    { title: "Configurable Matching Criteria Per Object", description: "Different objects can use different matching logic, reflecting how each type of record is actually created and maintained." },
    { title: "Works Alongside Existing Validation Rules", description: "Duplicate detection runs alongside the validation rules and automation your org already has in place." },
    { title: "No Separate Data Export Required", description: "Detection and merge happen directly inside Salesforce — there's no need to export data to a separate tool for cleanup." },
  ],
};

const AI_AUTOMATION = {
  eyebrow: "Intelligent Matching & Automation",
  heading: "Where Intelligent Matching Reduces Manual Review",
  intro: "The matching logic behind Duplicate Search and Merge is designed to catch real duplicates without burying your team in false positives.",
  items: [
    { title: "Fuzzy Matching Logic", description: "Matching that accounts for small differences — typos, formatting, abbreviations — instead of requiring an exact field match." },
    { title: "Automated Duplicate Flagging", description: "Likely duplicates are surfaced automatically as records are created or updated, not discovered during a periodic cleanup." },
    { title: "Bulk Merge Automation", description: "High-confidence duplicate groups can be resolved in bulk, reserving manual review for the genuinely ambiguous cases." },
    { title: "Ongoing Duplicate Monitoring", description: "Matching runs continuously, so data quality doesn't quietly degrade again after an initial cleanup." },
  ],
};

const BENEFITS = {
  eyebrow: "Benefits",
  heading: "What Changes Once Duplicate Data Stops Piling Up",
  intro: "These are the practical outcomes teams look for once duplicate detection and merge become part of the everyday data workflow.",
  items: [
    { title: "Cleaner Data Without a Manual Review Queue", description: "Duplicates are caught and resolved as part of the normal workflow, not a recurring cleanup project." },
    { title: "Fewer Duplicate Outreach Mistakes", description: "Sales and marketing teams stop contacting the same person twice from two different records." },
    { title: "AI and Reporting Built on Reliable Data", description: "Clean, deduplicated records mean reports and AI-driven initiatives reflect reality instead of inflated or fragmented data." },
    { title: "One Consistent Definition of a Duplicate", description: "Matching rules apply the same way across every team, so cleanup results are consistent org-wide." },
  ],
};

const USE_CASES = {
  eyebrow: "Use Cases",
  heading: "Where Teams Put Duplicate Search and Merge to Work",
  intro: "Different data quality problems call for different matching and merge approaches — here's where this capability is typically applied.",
  items: [
    { icon: Ico.users, title: "Lead & Contact Deduplication" },
    { icon: Ico.building, title: "Account Consolidation After Data Imports" },
    { icon: Ico.handshake, title: "M&A / Org Data Consolidation" },
    { icon: Ico.brain, title: "Data Quality Before AI Initiatives" },
    { icon: Ico.shieldCheck, title: "Ongoing Duplicate Prevention at Entry" },
    { icon: Ico.layers, title: "Multi-Team Data Governance" },
  ],
};

const SCENARIOS = {
  eyebrow: "Implementation Scenarios",
  heading: "How Organizations Typically Configure Duplicate Search and Merge",
  intro: "Illustrative scenarios based on common data quality needs — not a specific client engagement.",
  cases: [
    {
      title: "A Sales Org Cleans Up Years of Duplicate Contacts",
      tag: "Data Cleanup",
      challenge: "Years of manual entry, imports, and web-to-lead forms had left the org with a significant number of duplicate contact records.",
      approach: "Mirketa configured matching rules for the org's contact data and ran a structured bulk merge process to resolve the backlog.",
      result: "The contact database now reflects one record per person, with ongoing detection catching new duplicates as they're created.",
    },
    {
      title: "A Company Consolidates Data After a Merger",
      tag: "Data Consolidation",
      challenge: "Combining two Salesforce orgs after an acquisition created a large number of overlapping account and contact records.",
      approach: "Mirketa configured matching rules specific to the merged data set and supported a phased bulk merge across accounts and contacts.",
      result: "The combined organization now works from one consolidated data set instead of two overlapping systems.",
    },
  ],
};

const WHY_MIRKETA = {
  eyebrow: "Why Mirketa",
  heading: "Implementation Support From a Team That Understands Your Data Model",
  intro: "Plenty of partners can turn on a matching rule. Fewer take the time to understand which near-matches are actually duplicates in your business.",
  items: [
    { icon: Ico.award, title: "Salesforce Platform Depth", description: "Deep Salesforce implementation experience, applied specifically to matching rule and merge workflow configuration." },
    { icon: Ico.compass, title: "Data Model Awareness", description: "Matching rules configured around how your organization actually creates and maintains records, not a generic default." },
    { icon: Ico.clock, title: "Structured, Scoped Delivery", description: "A defined implementation timeline that includes both rule configuration and an initial cleanup pass." },
    { icon: Ico.shieldCheck, title: "Data Integrity First", description: "Merge workflows configured to protect the data that matters, not just resolve the duplicate as quickly as possible." },
    { icon: Ico.users, title: "Dedicated Delivery Team", description: "The consultants who scope your engagement support it through go-live and beyond." },
    { icon: Ico.compass, title: "Support Beyond Go-Live", description: "Ongoing configuration support available as your data model or matching requirements evolve." },
  ],
};

const TECHNOLOGIES = {
  eyebrow: "Technology Stack",
  heading: "The Platform Capabilities This Work Builds On",
  intro: "Selected based on your existing Salesforce data model, not a default recommendation.",
  items: [
    { icon: Ico.cloud, title: "Salesforce Data Model" },
    { icon: Ico.search, title: "Duplicate Search & Merge Engine" },
    { icon: Ico.sliders, title: "Configurable Matching Rules" },
    { icon: Ico.merge, title: "Bulk Merge Tools" },
    { icon: Ico.db, title: "Salesforce Platform" },
    { icon: Ico.history, title: "Data Quality Reporting" },
  ],
};

const PROCESS = {
  eyebrow: "Implementation Process",
  heading: "A Five-Stage Path From Data Assessment to Ongoing Data Quality",
  intro: "A structured methodology for configuring duplicate detection and merge around your actual data model.",
  steps: [
    { label: "Data Quality Assessment" },
    { label: "Matching Rule Configuration" },
    { label: "Duplicate Resolution" },
    { label: "Validation" },
    { label: "Launch & Monitor" },
  ],
  detail: [
    { name: "Data Quality Assessment", description: "Existing data model and known duplicate patterns reviewed across the objects that matter most." },
    { name: "Matching Rule Configuration", description: "Matching criteria configured per object and field to reflect how your organization defines a duplicate." },
    { name: "Duplicate Resolution", description: "An initial cleanup pass resolves existing duplicates through bulk and manual merge as appropriate." },
    { name: "Validation", description: "Matching rules validated against real data to confirm they catch true duplicates without excessive false positives." },
    { name: "Launch & Monitor", description: "Supported go-live followed by ongoing monitoring as new records are created and rules evolve." },
  ],
};

const FAQS = [
  { q: "What is Duplicate Search and Merge?", a: "Duplicate Search and Merge is Mirketa's Salesforce-native product that detects likely duplicate records and lets you resolve them with a one-click merge, using configurable matching rules." },
  { q: "Which Salesforce objects can it work with?", a: "Matching rules can be configured for leads, contacts, accounts, and relevant custom objects in your Salesforce org." },
  { q: "Will merging records cause us to lose data?", a: "The merge workflow presents a clear comparison of matched records so the surviving record is chosen deliberately, rather than losing field data unintentionally." },
  { q: "Can matching rules be customized for our organization?", a: "Yes. Matching criteria are configured per object and field to reflect how your organization actually defines a duplicate." },
  { q: "Does this only clean up existing duplicates, or prevent new ones too?", a: "Both. Existing duplicates can be resolved through bulk merge, and ongoing detection flags likely duplicates as new records are created." },
  { q: "How does clean data help with AI initiatives?", a: "AI-driven reporting and automation are only as reliable as the underlying data. Removing duplicate and inconsistent records gives those initiatives a more accurate data set to work from." },
  { q: "Can duplicates be resolved in bulk?", a: "Yes. High-confidence duplicate groups can be reviewed and merged in bulk, reserving manual review for genuinely ambiguous matches." },
  { q: "Do you provide support after the initial cleanup?", a: "Yes. Ongoing configuration support is available as your data model or matching requirements evolve over time." },
];

const RELATED_SERVICES = {
  eyebrow: "Related Reading",
  heading: "Explore More of Mirketa's Salesforce-Native Products",
  intro: "Duplicate Search and Merge is one part of Mirketa's Salesforce product suite. Here's where to look next.",
  items: [
    { slug: PRODUCT_PAGES.FINACAST.slug, label: PRODUCT_PAGES.FINACAST.label, description: "See how clean, accurate pipeline data powers AI-assisted revenue forecasting." },
    { slug: PRODUCT_PAGES.ECOURIER.slug, label: PRODUCT_PAGES.ECOURIER.label, description: "Schedule and auto-deliver reports built on the same clean Salesforce data." },
    { slug: SALESFORCE_PAGES.DEVELOPMENT_CONSULTING.slug, label: SALESFORCE_PAGES.DEVELOPMENT_CONSULTING.label, description: "Explore Mirketa's broader Salesforce development and consulting services." },
    { slug: "/salesforce-ai-services", label: "Salesforce AI Services & CRM Solutions", description: "See the full suite of AI-powered Salesforce products and services Mirketa builds and supports." },
    { slug: AI_PAGES.AI_DATA_FOUNDATIONS.slug, label: AI_PAGES.AI_DATA_FOUNDATIONS.label, description: "Build the governed data foundation that keeps AI initiatives reliable across systems." },
  ],
};

const FINAL_CTA = {
  heading: "Keep Your Salesforce Data Clean and AI-Ready",
  description: "Partner with Mirketa to configure duplicate detection and merge around your data model — or talk to a data quality advisor first.",
  primaryCta: { label: "See Duplicate Search & Merge in Action", href: "#contact" },
  secondaryCta: { label: "Talk to a Data Quality Advisor", href: "#contact" },
};

const CONSULTATION = {
  eyebrow: "Get Started",
  heading: "Talk to a Data Quality Advisor",
  description: "Tell us about your data model and known duplicate patterns — a data quality advisor will follow up within one business day.",
  formTitle: "Request a Duplicate Search & Merge Walkthrough",
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
      serviceType: "Salesforce Data Deduplication",
      provider: { "@type": "Organization", name: "Mirketa Inc.", url: "https://mirketa.us" },
      name: "Duplicate Search and Merge",
      description: "Salesforce-native duplicate detection, configurable matching rules, and one-click merge to keep CRM data clean and AI-ready.",
      areaServed: "Global",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://mirketa.us/" },
        { "@type": "ListItem", position: 2, name: PRODUCT_PAGES.DUPLICATE_SEARCH_MERGE.label, item: `https://mirketa.us${pageSEO.slug}` },
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

export default function DuplicateSearchAndMerge() {
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

      gsap.utils.toArray(".dsm-reveal").forEach((el) => {
        gsap.from(el, { opacity: prefersReduced ? 1 : 0, y: prefersReduced ? 0 : 32, duration: 0.7, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 88%" } });
      });
      gsap.utils.toArray(".dsm-reveal-left").forEach((el) => {
        gsap.from(el, { opacity: prefersReduced ? 1 : 0, x: prefersReduced ? 0 : -30, duration: 0.7, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 88%" } });
      });
      gsap.utils.toArray(".dsm-reveal-right").forEach((el) => {
        gsap.from(el, { opacity: prefersReduced ? 1 : 0, x: prefersReduced ? 0 : 30, duration: 0.7, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 88%" } });
      });
      gsap.utils.toArray(".dsm-reveal-stagger").forEach((el) => {
        gsap.from(el.children, { opacity: prefersReduced ? 1 : 0, y: prefersReduced ? 0 : 26, duration: 0.6, stagger: 0.06, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 85%" } });
      });
      gsap.utils.toArray(".dsm-zoom-in").forEach((el) => {
        gsap.from(el, { opacity: prefersReduced ? 1 : 0, scale: prefersReduced ? 1 : 0.94, duration: 0.6, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 88%" } });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="product-duplicate-search-and-merge">
      <Seo {...SEO} />
      <HeroSection heroTextRef={heroTextRef} heroRef={heroRef} />
      <TrustedByMarquee label="Trusted by Salesforce Data & Operations Teams" />
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
      <RelatedServices {...RELATED_SERVICES} className="dsm-related dsm-reveal" />
      <FinalCtaSection />
      <ConsultationSection {...CONSULTATION} />
      <StickyCta heroRef={heroRef} label="See Duplicate Search & Merge in Action" />
    </div>
  );
}

// ============================================================
// HERO
// ============================================================

function HeroSection({ heroTextRef, heroRef }) {
  return (
    <section ref={heroRef} className="dsm-hero" style={{ backgroundImage: `url("${Images.heroDuplicateSearchAndMerge}")` }} aria-label="Duplicate Search and Merge by Mirketa">
      <div className="dsm-hero__scrim" />
      <div className="container">
        <Breadcrumb items={BREADCRUMB_ITEMS} className="dsm-breadcrumb" />
        <div className="dsm-hero__inner">
          <div ref={heroTextRef} className="dsm-hero__text">
            <span className="dsm-badge">
              <span className="dsm-badge__spark" aria-hidden="true">✦</span> {HERO.badge}
            </span>
            <h1>{HERO.title}</h1>
            <p className="dsm-hero__description">{HERO.description}</p>
            <div className="dsm-hero__ctas">
              <a href={HERO.primaryCta.href} className="btn btn-primary dsm-btn">
                {HERO.primaryCta.label} <span aria-hidden="true">→</span>
              </a>
              <a href={HERO.secondaryCta.href} className="btn btn-secondary dsm-btn">
                {HERO.secondaryCta.label}
              </a>
            </div>
            <ul className="dsm-hero__metrics">
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
            className="dsm-hero__visual dsm-zoom-in"
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
    <section className="section dsm-challenges" aria-labelledby="dsm-challenges-heading">
      <div className="container">
        <div className="section-heading dsm-reveal">
          <p className="dsm-eyebrow">{CHALLENGES.eyebrow}</p>
          <h2 id="dsm-challenges-heading">{CHALLENGES.heading}</h2>
          <p>{CHALLENGES.intro}</p>
        </div>
        <div className="dsm-challenges__grid dsm-reveal-stagger">
          {CHALLENGES.items.map((c) => (
            <div className="dsm-challenge-card" key={c.title}>
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
    <section className="section dsm-solution" aria-labelledby="dsm-solution-heading">
      <div className="container dsm-solution__grid">
        <div className="dsm-reveal-left">
          <p className="dsm-eyebrow">{SOLUTION.eyebrow}</p>
          <h2 id="dsm-solution-heading">{SOLUTION.heading}</h2>
          {SOLUTION.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <div className="dsm-reveal-right">
          <AnalyticsPanel
            title="Data Quality Overview"
            donutPercent={96}
            donutLabel="Records confirmed unique after matching"
            metrics={[
              { value: "Ongoing", label: "Duplicate monitoring" },
              { value: "1-Click", label: "Merge workflow" },
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
    <section className="section dsm-services" aria-labelledby="dsm-services-heading">
      <div className="container">
        <div className="dsm-services__head dsm-reveal">
          <img src={Images.illoDuplicateSearchMergeBeforeAfter} alt="" aria-hidden="true" className="dsm-services__illo" loading="lazy" />
          <div className="section-heading">
            <p className="dsm-eyebrow">{SERVICES.eyebrow}</p>
            <h2 id="dsm-services-heading">{SERVICES.heading}</h2>
            <p>{SERVICES.intro}</p>
          </div>
        </div>
        <div className="dsm-services__grid dsm-reveal-stagger">
          {SERVICES.items.map((c) => (
            <div className="dsm-service-card" key={c.title}>
              <span className="dsm-service-card__icon">{c.icon}</span>
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
    <section className="section dsm-technical" aria-labelledby="dsm-technical-heading">
      <div className="container">
        <div className="section-heading dsm-reveal">
          <p className="dsm-eyebrow">{TECHNICAL.eyebrow}</p>
          <h2 id="dsm-technical-heading">{TECHNICAL.heading}</h2>
          <p>{TECHNICAL.intro}</p>
        </div>
        <div className="dsm-technical__grid dsm-reveal-stagger">
          {TECHNICAL.items.map((c) => (
            <div className="dsm-technical-item" key={c.title}>
              <p className="dsm-card-title">{c.title}</p>
              <p>{c.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// INTELLIGENT MATCHING & AUTOMATION
// ============================================================

function AiAutomationSection() {
  return (
    <section className="section dsm-ai" aria-labelledby="dsm-ai-heading">
      <div className="container">
        <div className="section-heading dsm-reveal">
          <p className="dsm-eyebrow">{AI_AUTOMATION.eyebrow}</p>
          <h2 id="dsm-ai-heading">{AI_AUTOMATION.heading}</h2>
          <p>{AI_AUTOMATION.intro}</p>
        </div>
        <div className="dsm-ai__layout">
          <div className="dsm-ai__grid dsm-reveal-stagger">
            {AI_AUTOMATION.items.map((f) => (
              <div className="dsm-ai-item" key={f.title}>
                <p className="dsm-card-title">{f.title}</p>
                <p>{f.description}</p>
              </div>
            ))}
          </div>
          <div className="dsm-reveal-right">
            <WorkflowDiagram
              title="Duplicate Resolution Flow"
              steps={[{ label: "Record Created" }, { label: "Matched" }, { label: "Flagged" }, { label: "Reviewed" }, { label: "Merged" }]}
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
    <section className="section dsm-benefits" aria-labelledby="dsm-benefits-heading">
      <div className="container">
        <div className="section-heading dsm-reveal">
          <p className="dsm-eyebrow">{BENEFITS.eyebrow}</p>
          <h2 id="dsm-benefits-heading">{BENEFITS.heading}</h2>
          <p>{BENEFITS.intro}</p>
        </div>
        <div className="dsm-benefits__grid dsm-reveal-stagger">
          {BENEFITS.items.map((b) => (
            <div className="dsm-benefit-item" key={b.title}>
              <span aria-hidden="true">{Ico.check}</span>
              <div>
                <p className="dsm-card-title">{b.title}</p>
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
    <section className="section dsm-usecases" aria-labelledby="dsm-usecases-heading">
      <div className="container">
        <div className="section-heading dsm-reveal">
          <p className="dsm-eyebrow">{USE_CASES.eyebrow}</p>
          <h2 id="dsm-usecases-heading">{USE_CASES.heading}</h2>
          <p>{USE_CASES.intro}</p>
        </div>
        <div className="dsm-usecases__grid dsm-reveal-stagger">
          {USE_CASES.items.map((n) => (
            <div className="dsm-usecase-card" key={n.title}>
              <span className="dsm-usecase-card__icon">{n.icon}</span>
              <p className="dsm-card-title">{n.title}</p>
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
    <section className="section dsm-scenarios" aria-labelledby="dsm-scenarios-heading">
      <div className="container">
        <div className="section-heading dsm-reveal">
          <p className="dsm-eyebrow">{SCENARIOS.eyebrow}</p>
          <h2 id="dsm-scenarios-heading">{SCENARIOS.heading}</h2>
          <p>{SCENARIOS.intro}</p>
        </div>
        <div className="dsm-scenarios__grid dsm-reveal-stagger">
          {SCENARIOS.cases.map((c) => (
            <div className="dsm-scenario-card" key={c.title}>
              <span className="dsm-scenario-card__tag">{c.tag}</span>
              <p className="dsm-card-title">{c.title}</p>
              <dl className="dsm-scenario-card__fields">
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
    <section className="section dsm-why" aria-labelledby="dsm-why-heading">
      <div className="container">
        <div className="section-heading dsm-reveal">
          <p className="dsm-eyebrow">{WHY_MIRKETA.eyebrow}</p>
          <h2 id="dsm-why-heading">{WHY_MIRKETA.heading}</h2>
          <p>{WHY_MIRKETA.intro}</p>
        </div>
        <div className="dsm-why__grid dsm-reveal-stagger">
          {WHY_MIRKETA.items.map((w, i) => (
            <div className="dsm-why-card" key={`${w.title}-${i}`}>
              <span className="dsm-why-card__icon">{w.icon}</span>
              <p className="dsm-card-title">{w.title}</p>
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
    <section className="section dsm-tech" aria-labelledby="dsm-tech-heading">
      <div className="container">
        <div className="section-heading dsm-reveal">
          <p className="dsm-eyebrow">{TECHNOLOGIES.eyebrow}</p>
          <h2 id="dsm-tech-heading">{TECHNOLOGIES.heading}</h2>
          <p>{TECHNOLOGIES.intro}</p>
        </div>
        <div className="dsm-tech__grid dsm-reveal-stagger">
          {TECHNOLOGIES.items.map((t) => (
            <div className="dsm-tech-card" key={t.title}>
              <span className="dsm-tech-card__icon">{t.icon}</span>
              <p className="dsm-card-title">{t.title}</p>
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
    <section className="section dsm-process" aria-labelledby="dsm-process-heading">
      <div className="container">
        <div className="section-heading dsm-reveal">
          <p className="dsm-eyebrow">{PROCESS.eyebrow}</p>
          <h2 id="dsm-process-heading">{PROCESS.heading}</h2>
          <p>{PROCESS.intro}</p>
        </div>
        <div className="dsm-process__grid dsm-reveal-stagger">
          {PROCESS.detail.map((p, i) => (
            <div className="dsm-step-card" key={p.name}>
              <span className="dsm-step-card__num">{String(i + 1).padStart(2, "0")}</span>
              <p className="dsm-card-title">{p.name}</p>
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
    <section className="section dsm-faq" aria-labelledby="dsm-faq-heading">
      <div className="container">
        <div className="section-heading dsm-reveal">
          <p className="dsm-eyebrow">FAQ</p>
          <h2 id="dsm-faq-heading">Frequently Asked Questions About Duplicate Search and Merge</h2>
        </div>
        <FaqAccordion items={FAQS} className="dsm-reveal" searchPlaceholder="Ask a question — e.g. &quot;matching rules&quot;, &quot;merge&quot;, &quot;bulk&quot;..." />
        <p className="dsm-faq__links">
          Related reading: <Link to={PRODUCT_PAGES.FINACAST.slug}>{PRODUCT_PAGES.FINACAST.label}</Link>,{" "}
          <Link to={PRODUCT_PAGES.ECOURIER.slug}>{PRODUCT_PAGES.ECOURIER.label}</Link>,{" "}
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
    <section className="dsm-final-cta dsm-reveal" aria-labelledby="dsm-final-cta-heading">
      <div className="container dsm-final-cta__inner">
        <h2 id="dsm-final-cta-heading">{FINAL_CTA.heading}</h2>
        <p>{FINAL_CTA.description}</p>
        <div className="dsm-final-cta__ctas">
          <a href={FINAL_CTA.primaryCta.href} className="btn btn-primary dsm-btn">
            {FINAL_CTA.primaryCta.label} <span aria-hidden="true">→</span>
          </a>
          <a href={FINAL_CTA.secondaryCta.href} className="btn btn-secondary dsm-btn">
            {FINAL_CTA.secondaryCta.label}
          </a>
        </div>
      </div>
    </section>
  );
}
