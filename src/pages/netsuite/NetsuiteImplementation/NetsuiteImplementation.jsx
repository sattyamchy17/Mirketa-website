import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { NETSUITE_PAGES, ORACLE_PAGES, SALESFORCE_PAGES, AI_PAGES, CLOUD_PAGES } from "../../../config/pageSlugs.js";
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
import "./NetsuiteImplementation.css";

gsap.registerPlugin(ScrollTrigger);

// ============================================================
// ICONS
// ============================================================

const Ico = {
  check: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12.5l5 5L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  ledger: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 3h12v18H6V3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="M9 8h6M9 12h6M9 16h4" stroke="currentColor" strokeWidth="1.2" opacity="0.6" /></svg>
  ),
  branches: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="6" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.4" /><circle cx="6" cy="18" r="2.5" stroke="currentColor" strokeWidth="1.4" /><circle cx="18" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.4" /><path d="M8.2 7.2L15.8 11M8.2 16.8L15.8 13" stroke="currentColor" strokeWidth="1.3" /></svg>
  ),
  gear: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.4" /><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
  ),
  report: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 3h9l3 3v15H6V3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="M9 13l2-2 2 2 3-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  plug: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 3v5M15 3v5M7 8h10v4a5 5 0 01-10 0V8z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="M12 17v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
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
  bank: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 10l8-5 8 5M4 10v9M20 10v9M4 19h16M8 13v4M12 13v4M16 13v4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  factory: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 21V11l5 3V11l5 3V8l8 5v8H3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  cart: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 4h2l2.2 11h10.6L20 7H6.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /><circle cx="9" cy="20" r="1.3" fill="currentColor" /><circle cx="17" cy="20" r="1.3" fill="currentColor" /></svg>
  ),
  code: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 8l-5 4 5 4M15 8l5 4-5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  heart: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 20s-7-4.5-9.3-9A5 5 0 0112 6a5 5 0 019.3 5c-2.3 4.5-9.3 9-9.3 9z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
};

// ============================================================
// DATA
// ============================================================

const BREADCRUMB_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Platforms & Technology", href: "/" },
  { label: NETSUITE_PAGES.IMPLEMENTATION.label },
];

const HERO = {
  badge: "NetSuite Solution Provider & Implementation Partner",
  title: "NetSuite Implementation Services for Finance-Led, Multi-Entity Growth",
  description:
    "Mirketa's NetSuite implementation services help finance and operations teams move off spreadsheets and disconnected systems onto a single, well-configured NetSuite instance — with a chart of accounts built to scale, subsidiaries that consolidate cleanly, and a data migration your auditors won't flag.",
  primaryCta: { label: "Get a NetSuite Implementation Roadmap", href: "#contact" },
  secondaryCta: { label: "Talk to a NetSuite Consultant", href: "#contact" },
  metrics: ["SuiteCloud-Certified Consultants", "Multi-Subsidiary & Multi-Currency Ready", "Fixed-Scope Go-Live Timeline", "Clean Data Migration Track Record"],
};

const HERO_DASHBOARD = {
  title: "NetSuite Go-Live Command Center",
  stats: [
    { label: "MIGRATION ACCURACY", value: "99.4%", caption: "Legacy ERP records" },
    { label: "AVG GO-LIVE", value: "14 wks", caption: "Single-entity rollout" },
    { label: "CLOSE TIME CUT", value: "-58%", caption: "Post go-live" },
  ],
  rows: [
    { title: "Chart of accounts mapping", meta: "Finance workstream · Sprint 2", tone: "good", status: "Complete" },
    { title: "Subsidiary consolidation rules", meta: "3 of 4 entities configured", tone: "neutral", status: "In Progress" },
    { title: "Legacy GL history import", meta: "Reconciled against trial balance", tone: "good", status: "Verified" },
  ],
  floatingCards: [
    { icon: Ico.ledger, title: "Clean COA Design", subtitle: "Built for future entities" },
    { icon: Ico.branches, title: "Multi-Subsidiary", subtitle: "Consolidations that reconcile" },
  ],
};

const CHALLENGES = {
  eyebrow: "Business Challenges",
  heading: "The Problems That Push Finance Teams to NetSuite",
  intro:
    "Most companies don't wake up one day and decide to implement NetSuite. They get there after a specific breaking point — a close that takes three weeks, a spreadsheet consolidation that no longer holds together, or a QuickBooks instance that simply can't track a second subsidiary. These are the situations Mirketa is most often called in to fix.",
  items: [
    { title: "Close Takes Too Long", description: "Finance teams spend two to three weeks every month reconciling spreadsheets, manual journal entries, and disconnected subledgers just to close the books." },
    { title: "Multi-Entity Chaos", description: "A second or third subsidiary was bolted onto an accounting system never designed for consolidation, intercompany eliminations, or multi-currency reporting." },
    { title: "No Real-Time Visibility", description: "Leadership makes decisions on numbers that are already three weeks old by the time a report gets built and circulated." },
    { title: "Outgrown QuickBooks or Legacy ERP", description: "Transaction volume, headcount, or investor reporting requirements have outpaced what the current system was ever built to handle." },
  ],
};

const SOLUTION = {
  eyebrow: "Our Solution",
  heading: "A NetSuite Implementation Built Around Your Chart of Accounts, Not a Template",
  paragraphs: [
    "Mirketa's approach to NetSuite implementation starts with the general ledger, not the software. Before a single form or workflow gets configured, we sit with your controller and finance leadership to understand how you actually want to report — by subsidiary, by class, by department, by location — and design a chart of accounts and segment structure that supports that reporting without heroic month-end effort.",
    "From there, implementation moves through configuration, integration, and data migration in parallel workstreams rather than a single long sequential project. Your team sees a working sandbox early, tests real transactions against real approval workflows, and raises issues while they're still cheap to fix — not during user acceptance testing three days before go-live.",
    "We're a NetSuite Solution Provider, which means our consultants carry direct SuiteCloud certification and work inside NetSuite's own implementation methodology — not a generic ERP playbook adapted after the fact. That matters most in the details: how intercompany transactions eliminate on consolidation, how revenue recognition schedules behave under ASC 606, and how approval workflows should actually route in a company your size.",
  ],
};

const FEATURES = {
  eyebrow: "Key Features",
  heading: "What a Properly Configured NetSuite Instance Actually Includes",
  intro: "These are the capability areas every Mirketa NetSuite implementation is built around — configured to your chart of accounts, not left at default settings.",
  items: [
    { icon: Ico.ledger, title: "Financial Management & Multi-Book Accounting", description: "GL, AP, AR, and fixed assets configured with multi-book accounting for parallel GAAP, tax, and management reporting." },
    { icon: Ico.branches, title: "Multi-Subsidiary & Intercompany", description: "Subsidiary hierarchies, intercompany elimination rules, and multi-currency consolidation that close cleanly every period." },
    { icon: Ico.gear, title: "SuiteFlow Workflow Automation", description: "Approval routing, purchase requisitions, and exception handling automated without custom code wherever configuration can do the job." },
    { icon: Ico.plug, title: "Integration Framework", description: "SuiteTalk, RESTlets, and connector platforms like Celigo and Boomi linking NetSuite to your CRM, warehouse, ecommerce, and banking systems." },
    { icon: Ico.shield, title: "Role-Based Security & Controls", description: "Segregation of duties, approval thresholds, and audit trails designed to satisfy your external auditors, not just pass a login test." },
    { icon: Ico.report, title: "SuiteAnalytics & Saved Reporting", description: "Real-time dashboards and saved searches your finance team can build on, instead of exporting to Excel to get an answer." },
  ],
};

const BENEFITS = {
  eyebrow: "Benefits",
  heading: "What Changes in the First Two Closes After Go-Live",
  intro: "These are the outcomes Mirketa's NetSuite implementation clients consistently report once the new instance is live and adopted.",
  stats: [
    { value: "58%", label: "Average Reduction in Close Time" },
    { value: "99.4%", label: "Data Migration Accuracy" },
    { value: "14", label: "Average Weeks to Go-Live" },
    { value: "100%", label: "Fixed-Scope Delivery Track Record" },
  ],
  items: [
    { title: "A Close Measured in Days, Not Weeks", description: "Automated subledger reconciliation and intercompany elimination remove the manual spreadsheet work that used to define month-end." },
    { title: "One Number Everyone Trusts", description: "Sales, finance, and operations pull from the same real-time NetSuite data instead of three versions of the same spreadsheet." },
    { title: "Confidence at Audit Time", description: "Role-based controls and a full audit trail mean SOX and financial statement audits move faster with fewer follow-up requests." },
    { title: "Room to Add Entities", description: "The chart of accounts and subsidiary structure are designed to absorb a new entity or acquisition without a redesign project." },
  ],
};

const SERVICES_INCLUDED = {
  eyebrow: "Services Included",
  heading: "Every NetSuite Implementation Engagement Includes",
  intro: "A NetSuite implementation is more than turning on modules. These are the service lines Mirketa delivers as part of every engagement.",
  items: [
    { title: "Implementation & Configuration", description: "Full configuration of financials, subsidiaries, roles, and workflows against your documented requirements." },
    { title: "Data Migration", description: "Customers, vendors, items, open transactions, and GL history migrated and reconciled against your legacy system before cutover." },
    { title: "Integration Development", description: "CRM, ecommerce, warehouse, and banking integrations built on SuiteTalk, RESTlets, or a connector platform." },
  ],
  supplyChain: {
    title: "Connected Systems Around NetSuite",
    nodes: [
      { label: "NetSuite Core", short: "ERP" },
      { label: "CRM & Sales", short: "CRM" },
      { label: "Ecommerce", short: "ECOM" },
      { label: "Warehouse & 3PL", short: "WMS" },
      { label: "Banking & Payments", short: "BANK" },
    ],
  },
  items2: [
    { title: "Custom SuiteScript & SuiteFlow Development", description: "Purpose-built scripts and workflows for the requirements configuration alone can't satisfy." },
    { title: "Training & Change Management", description: "Role-based training so finance, sales, and operations teams are productive from day one, not week six." },
    { title: "Post Go-Live Hypercare", description: "Elevated support in the first close cycles after launch, when questions are most frequent and highest stakes." },
  ],
};

const PROCESS = {
  eyebrow: "Implementation Process",
  heading: "A Six-Stage Path From Kickoff to a Stable Close",
  intro: "No surprises, no scope creep. Our NetSuite implementation methodology has been refined across engagements in wholesale distribution, software, and professional services.",
  steps: [
    { label: "Discovery & Assessment" },
    { label: "Solution Design" },
    { label: "Configuration & Build" },
    { label: "Data Migration" },
    { label: "Testing & UAT" },
    { label: "Go-Live & Hypercare" },
  ],
  detail: [
    { name: "Discovery & Assessment", description: "Mapping current chart of accounts, subsidiary structure, approval workflows, and pain points across finance and operations." },
    { name: "Solution Design", description: "Chart of accounts, segments, subsidiary hierarchy, and integration architecture documented and signed off before configuration begins." },
    { name: "Configuration & Build", description: "Financials, roles, workflows, and forms configured in a sandbox your team can see and test early." },
    { name: "Data Migration", description: "Customers, vendors, items, open transactions, and GL history migrated and reconciled against legacy trial balances." },
    { name: "Testing & UAT", description: "Structured testing with your own finance and operations stakeholders using real transaction scenarios." },
    { name: "Go-Live & Hypercare", description: "Supported cutover followed by elevated support through your first full close cycle on NetSuite." },
  ],
};

const WHY_MIRKETA = {
  eyebrow: "Why Mirketa",
  heading: "A NetSuite Partner That Starts With Your General Ledger",
  intro: "Plenty of partners can activate NetSuite modules. Fewer start every engagement with your chart of accounts and reporting requirements first.",
  items: [
    { icon: Ico.award, title: "SuiteCloud-Certified Consultants", description: "Every lead consultant holds active NetSuite certifications and has led multiple full-lifecycle implementations." },
    { icon: Ico.compass, title: "Finance-First Methodology", description: "We design the chart of accounts and reporting structure before touching configuration — not after." },
    { icon: Ico.clock, title: "Fixed-Scope Timelines", description: "A documented scope and timeline agreed before kickoff, with change requests handled transparently, not silently absorbed." },
    { icon: Ico.shield, title: "Migration Accuracy You Can Audit", description: "Every migrated record reconciles against your legacy trial balance before cutover, not after go-live surprises." },
    { icon: Ico.users, title: "Dedicated Delivery Team", description: "The consultants who scope your project are the same ones configuring and supporting it through go-live." },
    { icon: Ico.heart, title: "Support That Doesn't End at Go-Live", description: "Hypercare and ongoing NetSuite support services are available the moment your instance goes live." },
  ],
};

const INDUSTRIES = {
  eyebrow: "Industry Solutions",
  heading: "NetSuite Implementation Experience Across Industries",
  intro: "Every industry brings its own chart of accounts, revenue recognition, and reporting requirements — our consultants bring specific domain context to each one.",
  items: [
    { icon: Ico.factory, title: "Wholesale Distribution" },
    { icon: Ico.code, title: "Software & SaaS" },
    { icon: Ico.cart, title: "Retail & Ecommerce" },
    { icon: Ico.users, title: "Professional Services" },
    { icon: Ico.bank, title: "Financial Services" },
    { icon: Ico.heart, title: "Nonprofit & NGO" },
  ],
};

const CASE_STUDIES = {
  eyebrow: "Case Study / Results",
  heading: "Real NetSuite Implementation Outcomes",
  intro: "Anonymized results from recent NetSuite implementation engagements across industries.",
  cases: [
    {
      title: "Wholesale Distributor Cuts Month-End Close From 18 Days to 6",
      industry: "Wholesale Distribution",
      challenge: "Three subsidiaries closed independently in QuickBooks, with intercompany balances reconciled manually in spreadsheets every month.",
      solution: "We implemented NetSuite OneWorld with automated intercompany elimination and a redesigned chart of accounts shared across all three entities.",
      outcome: "Consolidated close time dropped from 18 days to 6, with intercompany balances reconciling automatically.",
    },
    {
      title: "SaaS Company Automates Revenue Recognition Ahead of Audit",
      industry: "Software & SaaS",
      challenge: "Subscription revenue was recognized manually in spreadsheets, creating audit risk as the company approached its first ASC 606 compliance review.",
      solution: "We configured NetSuite's revenue recognition engine against the company's actual contract terms and billing schedules.",
      outcome: "Revenue recognition schedules now generate automatically, and the company passed its first audit without a revenue recognition finding.",
    },
  ],
};

const FAQS = [
  { q: "How long does a NetSuite implementation take?", a: "A focused single-entity implementation typically takes 10 to 16 weeks from kickoff to go-live. Multi-subsidiary rollouts with complex integrations can take 4 to 9 months depending on the number of entities and legacy systems involved." },
  { q: "What is a NetSuite Solution Provider, and why does it matter?", a: "A NetSuite Solution Provider is a partner authorized to sell and implement NetSuite licenses directly. Working with one means a single point of accountability for licensing, implementation, and ongoing support instead of coordinating between separate vendors." },
  { q: "Can Mirketa migrate us from QuickBooks or a legacy ERP?", a: "Yes. We migrate customers, vendors, items, open transactions, and GL history from QuickBooks, Sage, Microsoft Dynamics, and other legacy systems, reconciling every migrated balance against your existing trial balance before go-live." },
  { q: "Does NetSuite support multi-subsidiary and multi-currency consolidation?", a: "Yes, through NetSuite OneWorld. We configure subsidiary hierarchies, intercompany elimination rules, and multi-currency translation so consolidated financials close accurately without manual spreadsheet work." },
  { q: "What happens if our requirements change mid-implementation?", a: "Our fixed-scope methodology documents scope before kickoff, and any material change is handled through a transparent change order — never silently absorbed into the timeline or budget without your sign-off." },
  { q: "Do you provide support after go-live?", a: "Yes. Every implementation includes a hypercare period through your first full close cycle, and can transition into an ongoing NetSuite support services engagement with defined SLAs." },
  { q: "Can NetSuite integrate with our CRM and ecommerce platform?", a: "Yes. We build integrations using SuiteTalk, RESTlets, and connector platforms such as Celigo and Boomi to connect NetSuite with Salesforce, Shopify, and other CRM, ecommerce, and warehouse systems." },
  { q: "Is NetSuite a good fit if we're outgrowing QuickBooks?", a: "For companies adding subsidiaries, multi-currency operations, or more complex revenue recognition than QuickBooks can support, NetSuite is typically the next step. We can assess your specific situation before you commit to a migration." },
];

const RELATED_SERVICES = {
  eyebrow: "Related Services",
  heading: "Explore More Ways Mirketa Supports Finance & Operations Technology",
  intro: "NetSuite implementation is one part of a broader technology strategy. Here's where to look next.",
  items: [
    { slug: NETSUITE_PAGES.AI.slug, label: NETSUITE_PAGES.AI.label, description: "Bring AI-assisted forecasting, anomaly detection, and reporting into a NetSuite instance you already run." },
    { slug: NETSUITE_PAGES.SUPPORT_SERVICES.slug, label: NETSUITE_PAGES.SUPPORT_SERVICES.label, description: "SLA-backed administration, upgrades, and optimization for your live NetSuite instance after go-live." },
    { slug: ORACLE_PAGES.FUSION_IMPLEMENTATION.slug, label: ORACLE_PAGES.FUSION_IMPLEMENTATION.label, description: "Considering Oracle Fusion instead? Compare implementation approaches for larger, more complex enterprises." },
    { slug: SALESFORCE_PAGES.REVENUE_CLOUD.slug, label: SALESFORCE_PAGES.REVENUE_CLOUD.label, description: "Connect quote-to-cash in Salesforce Revenue Cloud with your NetSuite general ledger." },
    { slug: AI_PAGES.AI_DATA_FOUNDATIONS.slug, label: AI_PAGES.AI_DATA_FOUNDATIONS.label, description: "Build the clean, governed data foundation that makes AI on top of NetSuite actually reliable." },
    { slug: CLOUD_PAGES.INFRA_MANAGEMENT.slug, label: CLOUD_PAGES.INFRA_MANAGEMENT.label, description: "Manage the cloud infrastructure and integrations that sit around your NetSuite environment." },
  ],
};

const CONSULTATION = {
  eyebrow: "Get Started",
  heading: "Get a NetSuite Implementation Roadmap",
  description: "Tell us about your subsidiaries, close timeline, and legacy systems — a certified NetSuite consultant will follow up within one business day.",
  formTitle: "Get a Free NetSuite Implementation Assessment",
};

const SEO = {
  title: "NetSuite Implementation Services | Mirketa",
  description:
    "Mirketa's NetSuite implementation services help finance teams design a clean chart of accounts, migrate data accurately, and go live on a fixed-scope timeline.",
  canonical: `https://mirketa.us${NETSUITE_PAGES.IMPLEMENTATION.slug}/`,
  keywords: [
    "NetSuite Implementation Services",
    "NetSuite ERP Implementation",
    "NetSuite Consulting",
    "NetSuite Solution Provider",
    "NetSuite Data Migration",
    "Multi-Subsidiary NetSuite",
    "NetSuite Go-Live",
    "SuiteCloud Implementation Partner",
  ],
  schema: [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "NetSuite Implementation Services",
      provider: { "@type": "Organization", name: "Mirketa Inc.", url: "https://mirketa.us" },
      name: "NetSuite Implementation Services",
      description: "End-to-end NetSuite implementation, data migration, and integration services for finance-led, multi-entity organizations.",
      areaServed: "Global",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://mirketa.us/" },
        { "@type": "ListItem", position: 2, name: NETSUITE_PAGES.IMPLEMENTATION.label, item: `https://mirketa.us${NETSUITE_PAGES.IMPLEMENTATION.slug}/` },
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

export default function NetsuiteImplementation() {
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

      gsap.utils.toArray(".nsi-reveal").forEach((el) => {
        gsap.from(el, { opacity: prefersReduced ? 1 : 0, y: prefersReduced ? 0 : 32, duration: 0.7, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 88%" } });
      });
      gsap.utils.toArray(".nsi-reveal-left").forEach((el) => {
        gsap.from(el, { opacity: prefersReduced ? 1 : 0, x: prefersReduced ? 0 : -30, duration: 0.7, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 88%" } });
      });
      gsap.utils.toArray(".nsi-reveal-right").forEach((el) => {
        gsap.from(el, { opacity: prefersReduced ? 1 : 0, x: prefersReduced ? 0 : 30, duration: 0.7, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 88%" } });
      });
      gsap.utils.toArray(".nsi-reveal-stagger").forEach((el) => {
        gsap.from(el.children, { opacity: prefersReduced ? 1 : 0, y: prefersReduced ? 0 : 26, duration: 0.6, stagger: 0.06, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 85%" } });
      });
      gsap.utils.toArray(".nsi-zoom-in").forEach((el) => {
        gsap.from(el, { opacity: prefersReduced ? 1 : 0, scale: prefersReduced ? 1 : 0.94, duration: 0.6, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 88%" } });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="netsuite-implementation">
      <Seo {...SEO} />
      <HeroSection heroTextRef={heroTextRef} heroRef={heroRef} />
      <TrustedByMarquee label="Trusted by Finance & Operations Leaders Running NetSuite" />
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
      <RelatedServices {...RELATED_SERVICES} className="nsi-related nsi-reveal" />
      <ConsultationSection {...CONSULTATION} />
      <StickyCta heroRef={heroRef} label="Get a NetSuite Implementation Roadmap" />
    </div>
  );
}

// ============================================================
// HERO
// ============================================================

function HeroSection({ heroTextRef, heroRef }) {
  return (
    <section ref={heroRef} className="nsi-hero" style={{ backgroundImage: `url("${Images.heroNetSuiteImplementation}")` }} aria-label="NetSuite Implementation Services by Mirketa">
      <div className="nsi-hero__scrim" />
      <div className="container">
        <Breadcrumb items={BREADCRUMB_ITEMS} className="nsi-breadcrumb" />
        <div className="nsi-hero__inner">
          <div ref={heroTextRef} className="nsi-hero__text">
            <span className="nsi-badge">
              <span className="nsi-badge__spark" aria-hidden="true">✦</span> {HERO.badge}
            </span>
            <h1>{HERO.title}</h1>
            <p className="nsi-hero__description">{HERO.description}</p>
            <div className="nsi-hero__ctas">
              <a href={HERO.primaryCta.href} className="btn btn-primary nsi-btn">
                {HERO.primaryCta.label} <span aria-hidden="true">→</span>
              </a>
              <a href={HERO.secondaryCta.href} className="btn btn-secondary nsi-btn">
                {HERO.secondaryCta.label}
              </a>
            </div>
            <ul className="nsi-hero__metrics">
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
            className="nsi-hero__visual nsi-zoom-in"
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
    <section className="section nsi-challenges" aria-labelledby="nsi-challenges-heading">
      <div className="container">
        <div className="section-heading nsi-reveal">
          <p className="nsi-eyebrow">{CHALLENGES.eyebrow}</p>
          <h2 id="nsi-challenges-heading">{CHALLENGES.heading}</h2>
          <p>{CHALLENGES.intro}</p>
        </div>
        <div className="nsi-challenges__grid nsi-reveal-stagger">
          {CHALLENGES.items.map((c) => (
            <div className="nsi-challenge-card" key={c.title}>
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
    <section className="section nsi-solution" aria-labelledby="nsi-solution-heading">
      <div className="container nsi-solution__grid">
        <div className="nsi-reveal-left">
          <p className="nsi-eyebrow">{SOLUTION.eyebrow}</p>
          <h2 id="nsi-solution-heading">{SOLUTION.heading}</h2>
          {SOLUTION.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <div className="nsi-reveal-right">
          <FinanceChart
            title="Month-End Close Timeline"
            kpis={[
              { value: "18 → 6", label: "Days to close" },
              { value: "99.4%", label: "Migration accuracy" },
            ]}
            bars={[18, 15, 11, 9, 7, 6]}
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
  const [big1, big2, ...rest] = FEATURES.items;
  return (
    <section className="section nsi-features" aria-labelledby="nsi-features-heading">
      <div className="container">
        <div className="section-heading nsi-reveal">
          <p className="nsi-eyebrow">{FEATURES.eyebrow}</p>
          <h2 id="nsi-features-heading">{FEATURES.heading}</h2>
          <p>{FEATURES.intro}</p>
        </div>
        <div className="nsi-features__top nsi-reveal-stagger">
          <div className="nsi-feature-card nsi-feature-card--big">
            <span className="nsi-feature-card__icon">{big1.icon}</span>
            <h3>{big1.title}</h3>
            <p>{big1.description}</p>
          </div>
          <AnalyticsPanel
            title="SuiteAnalytics Reporting"
            donutPercent={92}
            donutLabel="Dashboards adopted by finance users within 30 days"
            metrics={[
              { value: "92%", label: "User adoption at 30 days" },
              { value: "0", label: "Manual Excel exports needed" },
            ]}
          />
        </div>
        <div className="nsi-features__grid nsi-reveal-stagger">
          <div className="nsi-feature-card">
            <span className="nsi-feature-card__icon">{big2.icon}</span>
            <h3>{big2.title}</h3>
            <p>{big2.description}</p>
          </div>
          {rest.map((f) => (
            <div className="nsi-feature-card" key={f.title}>
              <span className="nsi-feature-card__icon">{f.icon}</span>
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
    <section className="section nsi-benefits" aria-labelledby="nsi-benefits-heading">
      <div className="container">
        <div className="section-heading nsi-reveal">
          <p className="nsi-eyebrow">{BENEFITS.eyebrow}</p>
          <h2 id="nsi-benefits-heading">{BENEFITS.heading}</h2>
          <p>{BENEFITS.intro}</p>
        </div>
        <div className="nsi-benefits__stats nsi-reveal-stagger">
          {BENEFITS.stats.map((s) => (
            <AnimatedCounter key={s.label} value={s.value} label={s.label} className="nsi-stat" />
          ))}
        </div>
        <div className="nsi-benefits__grid nsi-reveal-stagger">
          {BENEFITS.items.map((b) => (
            <div className="nsi-benefit-item" key={b.title}>
              <span aria-hidden="true">{Ico.check}</span>
              <div>
                <p className="nsi-card-title">{b.title}</p>
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
    <section className="section nsi-services" aria-labelledby="nsi-services-heading">
      <div className="container">
        <div className="section-heading nsi-reveal">
          <p className="nsi-eyebrow">{SERVICES_INCLUDED.eyebrow}</p>
          <h2 id="nsi-services-heading">{SERVICES_INCLUDED.heading}</h2>
          <p>{SERVICES_INCLUDED.intro}</p>
        </div>
        <div className="nsi-services__layout">
          <div className="nsi-services__list nsi-reveal-stagger">
            {SERVICES_INCLUDED.items.map((s) => (
              <div className="nsi-service-item" key={s.title}>
                <p className="nsi-card-title">{s.title}</p>
                <p>{s.description}</p>
              </div>
            ))}
          </div>
          <div className="nsi-reveal-right">
            <SupplyChainMap title={SERVICES_INCLUDED.supplyChain.title} nodes={SERVICES_INCLUDED.supplyChain.nodes} />
          </div>
        </div>
        <div className="nsi-services__list nsi-services__list--second nsi-reveal-stagger">
          {SERVICES_INCLUDED.items2.map((s) => (
            <div className="nsi-service-item" key={s.title}>
              <p className="nsi-card-title">{s.title}</p>
              <p>{s.description}</p>
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
    <section className="section nsi-process" aria-labelledby="nsi-process-heading">
      <div className="container">
        <div className="section-heading nsi-reveal">
          <img src={Images.illoNetsuiteImplementationTimeline} alt="" aria-hidden="true" className="nsi-process__illo" loading="lazy" />
          <p className="nsi-eyebrow">{PROCESS.eyebrow}</p>
          <h2 id="nsi-process-heading">{PROCESS.heading}</h2>
          <p>{PROCESS.intro}</p>
        </div>
        <div className="nsi-zoom-in">
          <WorkflowDiagram title="Six-Stage Implementation Path" steps={PROCESS.steps} />
        </div>
        <div className="nsi-process__grid nsi-reveal-stagger">
          {PROCESS.detail.map((p, i) => (
            <div className="nsi-step-card" key={p.name}>
              <span className="nsi-step-card__num">{String(i + 1).padStart(2, "0")}</span>
              <p className="nsi-card-title">{p.name}</p>
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
    <section className="section nsi-why" aria-labelledby="nsi-why-heading">
      <div className="container">
        <div className="section-heading nsi-reveal">
          <p className="nsi-eyebrow">{WHY_MIRKETA.eyebrow}</p>
          <h2 id="nsi-why-heading">{WHY_MIRKETA.heading}</h2>
          <p>{WHY_MIRKETA.intro}</p>
        </div>
        <div className="nsi-why__grid nsi-reveal-stagger">
          {WHY_MIRKETA.items.map((w) => (
            <div className="nsi-why-card" key={w.title}>
              <span className="nsi-why-card__icon">{w.icon}</span>
              <p className="nsi-card-title">{w.title}</p>
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
    <section className="section nsi-industries" aria-labelledby="nsi-industries-heading">
      <div className="container">
        <div className="section-heading nsi-reveal">
          <p className="nsi-eyebrow">{INDUSTRIES.eyebrow}</p>
          <h2 id="nsi-industries-heading">{INDUSTRIES.heading}</h2>
          <p>{INDUSTRIES.intro}</p>
        </div>
        <div className="nsi-industries__grid nsi-reveal-stagger">
          {INDUSTRIES.items.map((n) => (
            <div className="nsi-industry-card" key={n.title}>
              <span className="nsi-industry-card__icon">{n.icon}</span>
              <p className="nsi-card-title">{n.title}</p>
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
    <section className="section nsi-cases" aria-labelledby="nsi-cases-heading">
      <div className="container">
        <div className="section-heading nsi-reveal">
          <p className="nsi-eyebrow">{CASE_STUDIES.eyebrow}</p>
          <h2 id="nsi-cases-heading">{CASE_STUDIES.heading}</h2>
          <p>{CASE_STUDIES.intro}</p>
        </div>
        <div className="nsi-cases__grid nsi-reveal-stagger">
          {CASE_STUDIES.cases.map((c) => (
            <div className="nsi-case-card" key={c.title}>
              <span className="nsi-case-card__tag">{c.industry}</span>
              <h3>{c.title}</h3>
              <dl className="nsi-case-card__fields">
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
    <section className="section nsi-faq" aria-labelledby="nsi-faq-heading">
      <div className="container">
        <div className="section-heading nsi-reveal">
          <p className="nsi-eyebrow">FAQ</p>
          <h2 id="nsi-faq-heading">Frequently Asked Questions About NetSuite Implementation Services</h2>
        </div>
        <FaqAccordion items={FAQS} className="nsi-reveal" searchPlaceholder="Ask a question — e.g. &quot;migration&quot;, &quot;subsidiaries&quot;, &quot;timeline&quot;..." />
        <p className="nsi-faq__links">
          Related reading: <Link to={NETSUITE_PAGES.AI.slug}>{NETSUITE_PAGES.AI.label}</Link>,{" "}
          <Link to={NETSUITE_PAGES.SUPPORT_SERVICES.slug}>{NETSUITE_PAGES.SUPPORT_SERVICES.label}</Link>,{" "}
          <Link to={ORACLE_PAGES.FUSION_IMPLEMENTATION.slug}>{ORACLE_PAGES.FUSION_IMPLEMENTATION.label}</Link>,{" "}
          <Link to={SALESFORCE_PAGES.REVENUE_CLOUD.slug}>{SALESFORCE_PAGES.REVENUE_CLOUD.label}</Link>,{" "}
          <Link to={AI_PAGES.AI_DATA_FOUNDATIONS.slug}>{AI_PAGES.AI_DATA_FOUNDATIONS.label}</Link>.
        </p>
      </div>
    </section>
  );
}
