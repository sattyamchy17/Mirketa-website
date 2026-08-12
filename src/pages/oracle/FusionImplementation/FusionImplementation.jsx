import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Images } from "../../../assets/images/index.js";
import Seo from "../../../components/Seo/Seo.jsx";
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb.jsx";
import HeroVisual from "../../../components/HeroVisual/HeroVisual.jsx";
import ConsultationSection from "../../../components/ConsultationSection/ConsultationSection.jsx";
import "./FusionImplementation.css";

gsap.registerPlugin(ScrollTrigger);

// ============================================================
// ICONS
// ============================================================

const Ico = {
  check: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12.5l5 5L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  layers: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3l9 5-9 5-9-5 9-5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M3 12l9 5 9-5M3 16l9 5 9-5" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /></svg>
  ),
  users: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="9" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.4" /><path d="M3.5 19c.6-3.4 2.9-5.2 5.5-5.2s4.9 1.8 5.5 5.2" stroke="currentColor" strokeWidth="1.4" /><circle cx="17" cy="9" r="2.6" stroke="currentColor" strokeWidth="1.3" opacity="0.7" /><path d="M15.5 13.4c2.2.3 3.7 1.9 4 4.6" stroke="currentColor" strokeWidth="1.3" opacity="0.7" /></svg>
  ),
  network: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="6" r="2.4" stroke="currentColor" strokeWidth="1.4" /><circle cx="6" cy="18" r="2.4" stroke="currentColor" strokeWidth="1.4" /><circle cx="18" cy="18" r="2.4" stroke="currentColor" strokeWidth="1.4" /><path d="M12 8.4L7 16M12 8.4l5 7.6M8.4 18h7.2" stroke="currentColor" strokeWidth="1.3" /></svg>
  ),
  headset: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 13a8 8 0 0116 0v4" stroke="currentColor" strokeWidth="1.5" /><rect x="3" y="13" width="4" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4" /><rect x="17" y="13" width="4" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4" /></svg>
  ),
  chartUp: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 19V13M10 19V8M16 19v-5M20 19V5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
  ),
  cart: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 4h2l2.2 11h10.6L20 7H6.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /><circle cx="9" cy="20" r="1.3" fill="currentColor" /><circle cx="17" cy="20" r="1.3" fill="currentColor" /></svg>
  ),
  document: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 3h9l3 3v15H6z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M9 10h6M9 14h6M9 18h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
  ),
  target: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.4" /><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.3" opacity="0.6" /><circle cx="12" cy="12" r="1.2" fill="currentColor" /></svg>
  ),
  factory: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 21V11l5 3V11l5 3V8l8 5v8H3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  gear: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.4" /><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
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
  sparkle: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /></svg>
  ),
  robot: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="5" y="9" width="14" height="10" rx="3" stroke="currentColor" strokeWidth="1.5" /><path d="M12 5v4M9 14h.01M15 14h.01" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /><circle cx="12" cy="4" r="1.4" fill="currentColor" /></svg>
  ),
  eye: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.4" /></svg>
  ),
  cloud: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6.5 16.5A4.2 4.2 0 017 8.2 5.5 5.5 0 0117.5 9.5 3.7 3.7 0 0117 17H7" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></svg>
  ),
  plug: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 3v5M15 3v5M7 8h10v4a5 5 0 01-10 0V8z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="M12 17v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
  ),
  bank: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 10l8-5 8 5M4 10v9M20 10v9M4 19h16M8 13v4M12 13v4M16 13v4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  api: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="4" y="8" width="6" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.4" /><rect x="14" y="8" width="6" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.4" /><path d="M10 12h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
  ),
  arrowRefresh: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 12a8 8 0 0113.6-5.7M20 12a8 8 0 01-13.6 5.7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><path d="M17.5 3.5v3.4h-3.4M6.5 20.5v-3.4h3.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  cross: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 4v16M4 12h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
  ),
  clock: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" /><path d="M12 7v5l4 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  compass: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" /><path d="M15 9l-2 6-6 2 2-6 6-2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
};

// ============================================================
// DATA
// ============================================================

const BREADCRUMB = [
  { label: "Home", href: "/" },
  { label: "Platforms & Technology", href: "/" },
  { label: "Oracle Fusion Applications Implementation" },
];

const HERO = {
  badge: "Oracle Certified Implementation Partner",
  title: "Oracle Fusion Applications Implementation Built for Enterprise Scale",
  description:
    "Mirketa helps global enterprises implement, migrate, and optimize Oracle Fusion Cloud Applications — ERP, HCM, SCM, CX, and EPM — with a delivery model built around measurable business outcomes, not just go-live dates.",
  primaryCta: { label: "Schedule Consultation", href: "#contact" },
  secondaryCta: { label: "Talk to Oracle Expert", href: "#contact" },
  metrics: [
    "200+ Oracle Cloud Engagements Delivered",
    "100% Certified Fusion Consultants",
    "Global Follow-the-Sun Delivery Model",
    "Included Post Go-Live Hypercare Support",
  ],
};

const HERO_DASHBOARD = {
  title: "Fusion Implementation Command Center",
  stats: [
    { label: "IMPLEMENTATIONS DELIVERED", value: "200+", caption: "Across 18 countries" },
    { label: "CUSTOMER SATISFACTION", value: "97%", caption: "Post go-live survey average" },
    { label: "CERTIFIED CONSULTANTS", value: "120+", caption: "Active Oracle Fusion credentials" },
  ],
  rows: [
    { title: "ERP Cloud — global ledger cutover", meta: "Multi-entity · 12 legacy systems consolidated", tone: "good", status: "Live" },
    { title: "HCM Cloud — workforce data migration", meta: "Zero payroll continuity risk", tone: "good", status: "Completed" },
    { title: "SCM Cloud — demand planning rollout", meta: "Hypercare support active", tone: "neutral", status: "Stabilizing" },
  ],
  floatingCards: [
    { icon: Ico.award, title: "100% Certified Consultants", subtitle: "Active Oracle Fusion credentials" },
    { icon: Ico.headset, title: "Hypercare Included", subtitle: "Post go-live support built in" },
  ],
};

const APPLICATIONS = {
  eyebrow: "Oracle Fusion Implementation Services",
  heading: "Full-Scope Implementation Across Every Oracle Fusion Application",
  intro: "We implement Oracle Fusion Cloud Applications end-to-end — from initial configuration through hypercare — across every pillar of the suite.",
  items: [
    { icon: Ico.chartUp, title: "ERP Cloud", description: "Financial close, procurement, and reporting on a single connected ledger." },
    { icon: Ico.users, title: "HCM Cloud", description: "Core HR, talent, and workforce management unified in one system." },
    { icon: Ico.network, title: "SCM Cloud", description: "Planning, manufacturing, and logistics synchronized end-to-end." },
    { icon: Ico.headset, title: "CX Cloud", description: "Sales, service, and marketing connected to a single customer record." },
    { icon: Ico.target, title: "EPM Cloud", description: "Planning, budgeting, and consolidation built for finance leaders." },
    { icon: Ico.cart, title: "Procurement", description: "Sourcing and supplier management with built-in spend control." },
    { icon: Ico.document, title: "Financials", description: "General ledger, payables, and receivables configured to your chart." },
    { icon: Ico.compass, title: "Projects", description: "Project costing, billing, and resource management in real time." },
    { icon: Ico.factory, title: "Manufacturing", description: "Work orders, quality, and cost management on the shop floor." },
  ],
};

const EXPERTISE = {
  eyebrow: "Oracle Cloud Applications Expertise",
  heading: "Deep Configuration Expertise Across Every Fusion Pillar",
  intro: "Configuring Oracle Fusion Applications well means understanding how each pillar actually runs in your business — not just enabling modules from a checklist.",
  pillars: [
    {
      title: "ERP & Financials",
      description: "We configure General Ledger, Payables, Receivables, and Fixed Assets around your existing chart of accounts and close calendar — not a generic template. Multi-entity consolidations, intercompany eliminations, and statutory reporting are built in from day one.",
      illo: Images.illoErpFinancialsDashboard,
    },
    {
      title: "HCM & Talent",
      description: "Core HR, absence management, compensation, and talent acquisition are configured to your workforce structure and approval hierarchy. We migrate historical employee data cleanly, so payroll and benefits continuity is never at risk during cutover.",
      illo: Images.illoHcmWorkforceManagement,
    },
    {
      title: "SCM & Manufacturing",
      description: "Supply planning, inventory, and manufacturing execution are connected so demand signals actually drive production schedules. We tune lead times and safety stock parameters against your real supplier performance, not default assumptions.",
      illo: Images.illoScmSupplyChain,
    },
    {
      title: "CX & Engagement",
      description: "Sales, service, and marketing data are unified against a single customer record, so account teams and support agents work from the same source of truth instead of reconciling exports between systems.",
    },
  ],
};

const INDUSTRIES = {
  eyebrow: "Industries We Serve",
  heading: "Oracle Fusion Experience Across Regulated, Complex Industries",
  intro: "Every industry brings its own compliance, reporting, and operational constraints — our implementation teams bring specific domain context to each one.",
  items: [
    { icon: Ico.factory, title: "Manufacturing" },
    { icon: Ico.headset, title: "Healthcare" },
    { icon: Ico.bank, title: "Financial Services" },
    { icon: Ico.cart, title: "Retail & Consumer Goods" },
    { icon: Ico.globe, title: "Public Sector" },
    { icon: Ico.network, title: "High Tech" },
    { icon: Ico.compass, title: "Professional Services" },
    { icon: Ico.gear, title: "Energy & Utilities" },
    { icon: Ico.users, title: "Nonprofits & Education" },
    { icon: Ico.document, title: "Insurance" },
  ],
};

const METHODOLOGY = {
  eyebrow: "Oracle Implementation Methodology",
  heading: "A Structured Journey From Discovery to Hypercare",
  intro: "No surprises, no scope creep. Our Oracle Fusion delivery methodology has been refined across hundreds of enterprise implementations.",
  stages: [
    { name: "Discovery", description: "Mapping current-state finance, HR, and supply chain processes." },
    { name: "Solution Design", description: "Data model, security, and integration architecture documented." },
    { name: "Configuration", description: "Core Fusion setup — ledgers, business units, workflows." },
    { name: "Integration", description: "Connecting Fusion to the systems your teams already run." },
    { name: "Testing", description: "UAT, regression, and security testing before go-live." },
    { name: "Go Live", description: "Structured cutover with dedicated go-live command center." },
    { name: "Hypercare Support", description: "Elevated support coverage through post-launch stabilization." },
  ],
};

const AI_AUTOMATION = {
  eyebrow: "Oracle + AI + Automation",
  heading: "AI That Works Inside Your Fusion Processes, Not Beside Them",
  intro:
    "Oracle Fusion's embedded AI becomes valuable only when it's tuned against your own transaction history and approval patterns. We configure it to flag risk, recommend actions, and remove manual steps — directly inside the workflows your teams already use.",
  illo: Images.illoAiCopilotOracle,
  items: [
    { icon: Ico.gear, title: "AI-Powered Workflows", description: "Approval routing and exception handling driven by transaction patterns." },
    { icon: Ico.chartUp, title: "Predictive Analytics", description: "Cash flow, demand, and attrition risk surfaced before they become problems." },
    { icon: Ico.check, title: "Intelligent Approvals", description: "Low-risk transactions cleared automatically within policy thresholds." },
    { icon: Ico.bolt, title: "Process Automation", description: "Manual reconciliation and data-entry steps removed from daily workflows." },
    { icon: Ico.robot, title: "AI Copilots", description: "Conversational assistants that answer finance and HR questions in context." },
    { icon: Ico.eye, title: "Data Insights", description: "Anomalies and trends surfaced directly on the record, not buried in reports." },
  ],
};

const MIGRATION = {
  eyebrow: "Migration & Upgrade Services",
  heading: "Moving Off Legacy Oracle Systems Without the Risk",
  intro:
    "Migrating from EBS, PeopleSoft, or JD Edwards is as much a data and change-management challenge as a technical one. We plan the cutover around your fiscal calendar and validate every data object before it goes live.",
  illo: Images.illoLegacyToCloudMigration,
  items: [
    { title: "Cloud Migration", description: "A phased path from on-premise Oracle to Fusion Cloud with minimal disruption." },
    { title: "EBS-to-Fusion Migration", description: "Chart of accounts, ledgers, and open transactions migrated and reconciled." },
    { title: "PeopleSoft Migration", description: "HR, payroll, and benefits data migrated with zero continuity risk." },
    { title: "JD Edwards Migration", description: "Manufacturing and distribution data mapped to Fusion SCM structures." },
    { title: "Version Upgrades", description: "Quarterly Fusion updates managed and regression-tested proactively." },
    { title: "Data Migration & Cleansing", description: "Legacy data deduplicated and validated before it enters production." },
  ],
};

const INTEGRATIONS = {
  eyebrow: "Integration Capabilities",
  heading: "Oracle Fusion Connected to the Systems You Already Run",
  intro: "Fusion data is only as useful as the systems it reaches. We connect it to the platforms your teams rely on every day.",
  illo: Images.illoIntegrationHubOracle,
  items: [
    { icon: Ico.cloud, title: "Salesforce" },
    { icon: Ico.layers, title: "SAP" },
    { icon: Ico.gear, title: "Microsoft" },
    { icon: Ico.users, title: "Workday" },
    { icon: Ico.plug, title: "MuleSoft" },
    { icon: Ico.api, title: "REST APIs" },
    { icon: Ico.bank, title: "Banking Systems" },
    { icon: Ico.network, title: "Third-Party Platforms" },
  ],
};

const WHY_MIRKETA = {
  eyebrow: "Why Choose Mirketa",
  heading: "An Oracle Partner That Owns the Outcome, Not Just the Configuration",
  intro: "Hundreds of partners can activate Fusion modules. Fewer can tie every decision back to a measurable finance, HR, or supply chain outcome.",
  items: [
    { icon: Ico.award, title: "Certified Oracle Consultants", description: "Every consultant holds active Oracle Fusion Cloud certifications." },
    { icon: Ico.layers, title: "End-to-End Delivery", description: "One team from discovery through hypercare — no handoffs, no gaps." },
    { icon: Ico.compass, title: "Industry Expertise", description: "Delivery teams with real domain context, not generic playbooks." },
    { icon: Ico.robot, title: "AI Accelerators", description: "Pre-built frameworks that cut implementation time without cutting quality." },
    { icon: Ico.bolt, title: "Agile Methodology", description: "Sprint-based delivery with visible progress from week one." },
    { icon: Ico.globe, title: "Global Delivery Model", description: "Follow-the-sun coverage for multi-region enterprise rollouts." },
    { icon: Ico.headset, title: "Post Go-Live Support", description: "A dedicated team keeping your Fusion environment healthy after launch." },
    { icon: Ico.sparkle, title: "Proven Enterprise Success", description: "A verified track record across complex, multi-entity implementations." },
  ],
};

const METRICS = {
  eyebrow: "Customer Success Metrics",
  heading: "What a Properly Delivered Oracle Fusion Implementation Achieves",
  intro: "These are the outcomes our enterprise clients report after their Oracle Fusion engagement.",
  stats: [
    { value: "200+", label: "Successful Implementations" },
    { value: "18", label: "Countries Served" },
    { value: "120+", label: "Certified Consultants" },
    { value: "97%", label: "Customer Satisfaction" },
    { value: "15+", label: "Years Experience" },
  ],
};

const CASE_STUDY = {
  eyebrow: "Case Study",
  heading: "Global Manufacturer Consolidates 12 Legacy ERPs Into One Fusion Instance",
  industry: "Discrete Manufacturing • Multi-Entity, 18 Countries",
  challenge:
    "A global industrial manufacturer was running twelve disconnected ERP instances across regional entities, including legacy Oracle EBS and PeopleSoft systems. Financial close took eighteen days, and no single team had a reliable consolidated view of cash, inventory, or headcount.",
  solution:
    "Mirketa led a phased Oracle Fusion Cloud implementation spanning ERP, HCM, and SCM, migrating and reconciling data from all twelve legacy systems into a single global instance. We built a standardized chart of accounts, automated intercompany eliminations, and connected the platform to existing banking and logistics systems.",
  outcome:
    "The client now closes financials from a single Fusion instance instead of twelve disconnected systems, with leadership working from one trusted number instead of reconciling regional spreadsheets.",
  metrics: [
    { value: "18 → 5", label: "Days to Close Financials" },
    { value: "12 → 1", label: "ERP Instances Consolidated" },
    { value: "31%", label: "Reduction in Finance Headcount Overhead" },
    { value: "$6.4M", label: "Annual Savings in License & Maintenance" },
  ],
};

const FAQS = [
  { q: "What is Oracle Fusion Applications Implementation?", a: "Oracle Fusion Applications Implementation is the end-to-end process of deploying Oracle's Fusion Cloud suite — ERP, HCM, SCM, CX, and EPM — including configuration, data migration, integration, testing, and post-launch support, tailored to your organization's structure and processes." },
  { q: "How long does an Oracle Fusion implementation take?", a: "A focused single-module implementation typically takes 3–5 months. Multi-entity, multi-pillar deployments spanning ERP, HCM, and SCM can take 9–18 months depending on scope, data complexity, and the number of legacy systems being consolidated." },
  { q: "Can you migrate us from Oracle EBS, PeopleSoft, or JD Edwards?", a: "Yes. We specialize in migrating from legacy Oracle applications to Fusion Cloud, including chart-of-accounts redesign, historical data migration, and parallel testing to validate financial and operational continuity before cutover." },
  { q: "What industries do you implement Oracle Fusion for?", a: "We've delivered Oracle Fusion implementations across manufacturing, healthcare, financial services, retail, public sector, high tech, professional services, energy, and nonprofit organizations, each with domain-specific configuration." },
  { q: "How does Oracle Fusion integrate with other enterprise systems?", a: "We integrate Fusion with Salesforce, SAP, Microsoft, Workday, and banking systems using MuleSoft, REST APIs, and Oracle Integration Cloud, so transactional data flows without manual re-entry between systems." },
  { q: "What AI capabilities does Oracle Fusion include?", a: "Oracle Fusion includes embedded AI for predictive analytics, intelligent approvals, and process automation. We configure these capabilities against your own transaction history so recommendations reflect how your business actually operates, not generic defaults." },
  { q: "Do you provide support after go-live?", a: "Yes. Every implementation includes a structured hypercare period immediately after go-live, with elevated support coverage. Clients can transition into an ongoing managed services retainer for continued optimization." },
  { q: "How is Oracle Fusion licensed?", a: "Oracle Fusion is licensed per employee or per user depending on the module, with pricing tiers based on functional scope. We help you model the right license mix based on your actual organizational structure before you commit to a contract." },
  { q: "Are you an Oracle certified implementation partner?", a: "Yes. Mirketa's consultants hold active Oracle Fusion Cloud certifications across ERP, HCM, and SCM, backed by a verified delivery track record across enterprise engagements." },
  { q: "Can Oracle Fusion support multi-entity, multi-country deployments?", a: "Yes. Fusion is built for multi-entity operations with localized tax, statutory reporting, and compliance requirements across 190+ countries. We've delivered rollouts spanning up to 18 countries within a single global instance." },
];

const FINAL_CTA = {
  heading: "Transform Your Business with Oracle Fusion Applications",
  description: "Partner with Mirketa's certified Oracle consultants to implement, migrate, and optimize Fusion Cloud Applications — or speak with an Oracle expert before you commit to a roadmap.",
  primaryCta: { label: "Schedule Consultation", href: "#contact" },
  secondaryCta: { label: "Contact Oracle Experts", href: "#contact" },
};

const SEO = {
  title: "Oracle Fusion Applications Implementation | Mirketa",
  description:
    "Mirketa's certified Oracle consultants deliver Fusion Cloud implementation, migration, and AI-powered automation across ERP, HCM, SCM, CX, and EPM for global enterprises.",
  canonical: "https://mirketa.us/oracle-fusion-applications-implementation/",
  keywords: [
    "Oracle Fusion Applications Implementation",
    "Oracle Fusion Cloud Consulting",
    "Oracle ERP Cloud Implementation",
    "Oracle HCM Cloud Implementation",
    "Oracle SCM Cloud",
    "Oracle EPM Cloud",
    "Oracle Cloud Migration",
    "EBS to Fusion Migration",
    "PeopleSoft Migration",
    "Oracle Implementation Partner",
    "Oracle Fusion Integration",
    "Oracle AI Automation",
    "Enterprise ERP Consulting",
    "Oracle Cloud Applications",
  ],
  schema: [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "Oracle Fusion Applications Implementation Services",
      provider: { "@type": "Organization", name: "Mirketa Inc.", url: "https://mirketa.us" },
      name: "Oracle Fusion Applications Implementation",
      description:
        "End-to-end Oracle Fusion Cloud implementation, migration, integration, and AI-powered automation across ERP, HCM, SCM, CX, and EPM.",
      areaServed: "Global",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://mirketa.us/" },
        { "@type": "ListItem", position: 2, name: "Oracle Fusion Applications Implementation", item: "https://mirketa.us/oracle-fusion-applications-implementation/" },
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

export default function FusionImplementation() {
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

      gsap.utils.toArray(".ofa-reveal").forEach((el) => {
        gsap.from(el, {
          opacity: prefersReduced ? 1 : 0,
          y: prefersReduced ? 0 : 32,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      gsap.utils.toArray(".ofa-reveal-left").forEach((el) => {
        gsap.from(el, {
          opacity: prefersReduced ? 1 : 0,
          x: prefersReduced ? 0 : -30,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      gsap.utils.toArray(".ofa-reveal-right").forEach((el) => {
        gsap.from(el, {
          opacity: prefersReduced ? 1 : 0,
          x: prefersReduced ? 0 : 30,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      gsap.utils.toArray(".ofa-reveal-stagger").forEach((el) => {
        gsap.from(el.children, {
          opacity: prefersReduced ? 1 : 0,
          y: prefersReduced ? 0 : 26,
          duration: 0.6,
          stagger: 0.06,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      gsap.utils.toArray(".ofa-zoom-in").forEach((el) => {
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
    <div className="oracle-fusion-applications">
      <Seo {...SEO} />
      <HeroSection heroTextRef={heroTextRef} heroRef={heroRef} />
      <TrustedBySection />
      <ApplicationsSection />
      <ExpertiseSection />
      <IndustriesSection />
      <MethodologySection />
      <AiAutomationSection />
      <MigrationSection />
      <IntegrationsSection />
      <WhyMirketaSection />
      <MetricsSection />
      <CaseStudySection />
      <FaqSection />
      <FinalCtaSection />
      <ConsultationSection
        eyebrow="Get Started"
        heading="Schedule a Free Oracle Fusion Consultation"
        description="Tell us about your Oracle Fusion environment and goals — an Oracle expert will follow up within one business day."
        formTitle="Schedule a Free Oracle Fusion Consultation"
      />
      <StickyCta visible={showStickyCta} />
    </div>
  );
}

// ============================================================
// STICKY CTA
// ============================================================

function StickyCta({ visible }) {
  return (
    <div className={`ofa-sticky-cta ${visible ? "is-visible" : ""}`} aria-hidden={!visible}>
      <a href="#contact" className="btn btn-primary ofa-btn" tabIndex={visible ? 0 : -1}>
        Schedule Consultation <span aria-hidden="true">→</span>
      </a>
    </div>
  );
}

// ============================================================
// HERO
// ============================================================

function HeroSection({ heroTextRef, heroRef }) {
  return (
    <section ref={heroRef} className="ofa-hero" style={{ backgroundImage: `url("${Images.heroOracleFusion}")` }} aria-label="Oracle Fusion Applications Implementation by Mirketa">
      <div className="ofa-hero__scrim" />
      <div className="container">
        <Breadcrumb items={BREADCRUMB} className="ofa-breadcrumb" />
        <div className="ofa-hero__inner">
          <div ref={heroTextRef} className="ofa-hero__text">
            <span className="ofa-badge">
              <span className="ofa-badge__spark" aria-hidden="true">✦</span> {HERO.badge}
            </span>
            <h1>{HERO.title}</h1>
            <p className="ofa-hero__description">{HERO.description}</p>
            <div className="ofa-hero__ctas">
              <a href={HERO.primaryCta.href} className="btn btn-primary ofa-btn">
                {HERO.primaryCta.label} <span aria-hidden="true">→</span>
              </a>
              <a href={HERO.secondaryCta.href} className="btn btn-secondary ofa-btn">
                {HERO.secondaryCta.label}
              </a>
            </div>
            <ul className="ofa-hero__metrics">
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
            className="ofa-hero__visual ofa-zoom-in"
          />
        </div>
      </div>
    </section>
  );
}

// ============================================================
// TRUSTED BY GLOBAL ENTERPRISES
// ============================================================

function TrustedBySection() {
  const badges = [
    { icon: Images.clientSalesforce, label: "Certified Partner" },
    { icon: Images.clientSoc2, label: "SOC 2 Certified" },
    { icon: Images.clientHipaa, label: "HIPAA Ready" },
    { icon: Images.clientEnterprise, label: "Enterprise Ready" },
    { icon: Images.clientExperience, label: "15+ Years Experience" },
  ];
  const loop = [...badges, ...badges];

  return (
    <section className="ofa-trusted" aria-label="Trusted by global enterprises">
      <div className="container ofa-trusted__inner">
        <p className="ofa-trusted__label">Trusted by Global Enterprises</p>
        <div className="ofa-trusted__track" role="list">
          <div className="ofa-trusted__marquee">
            {loop.map((b, i) => (
              <div className="ofa-trusted__badge" role="listitem" key={`${b.label}-${i}`}>
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
// ORACLE FUSION IMPLEMENTATION SERVICES — centered grid
// ============================================================

function ApplicationsSection() {
  return (
    <section className="section ofa-apps" id="services" aria-labelledby="ofa-apps-heading">
      <div className="container">
        <div className="section-heading ofa-reveal ofa-apps__head">
          <p className="ofa-eyebrow">{APPLICATIONS.eyebrow}</p>
          <h2 id="ofa-apps-heading">{APPLICATIONS.heading}</h2>
          <p>{APPLICATIONS.intro}</p>
        </div>
        <div className="ofa-apps__grid ofa-reveal-stagger">
          {APPLICATIONS.items.map((a) => (
            <div className="ofa-app-card" key={a.title}>
              <span className="ofa-app-card__icon">{a.icon}</span>
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
// ORACLE CLOUD APPLICATIONS EXPERTISE — alternating full-width bands
// ============================================================

function ExpertiseSection() {
  return (
    <section className="section ofa-expertise" aria-labelledby="ofa-expertise-heading">
      <div className="container">
        <div className="section-heading ofa-reveal">
          <p className="ofa-eyebrow">{EXPERTISE.eyebrow}</p>
          <h2 id="ofa-expertise-heading">{EXPERTISE.heading}</h2>
          <p>{EXPERTISE.intro}</p>
        </div>
      </div>
      <div className="ofa-expertise__bands">
        {EXPERTISE.pillars.map((p, i) => (
          <div className={`ofa-expertise__band ${i % 2 === 1 ? "ofa-expertise__band--reverse" : ""}`} key={p.title}>
            <div className="container ofa-expertise__band-inner">
              <div className={i % 2 === 1 ? "ofa-reveal-right" : "ofa-reveal-left"}>
                <span className="ofa-expertise__num">{String(i + 1).padStart(2, "0")}</span>
                <h3>{p.title}</h3>
                <p>{p.description}</p>
              </div>
              {p.illo ? (
                <img src={p.illo} alt="" aria-hidden="true" className="ofa-expertise__illo ofa-zoom-in" loading="lazy" />
              ) : (
                <div className="ofa-expertise__placeholder ofa-zoom-in" aria-hidden="true">
                  <span>{Ico.headset}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ============================================================
// INDUSTRIES WE SERVE — dense icon-row grid
// ============================================================

function IndustriesSection() {
  return (
    <section className="section ofa-industries" aria-labelledby="ofa-industries-heading">
      <div className="container">
        <div className="section-heading ofa-reveal">
          <p className="ofa-eyebrow">{INDUSTRIES.eyebrow}</p>
          <h2 id="ofa-industries-heading">{INDUSTRIES.heading}</h2>
          <p>{INDUSTRIES.intro}</p>
        </div>
        <div className="ofa-industries__grid ofa-reveal-stagger">
          {INDUSTRIES.items.map((n) => (
            <div className="ofa-industry-card" key={n.title}>
              <span className="ofa-industry-card__icon">{n.icon}</span>
              <h3>{n.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// ORACLE IMPLEMENTATION METHODOLOGY — numbered horizontal journey
// ============================================================

function MethodologySection() {
  return (
    <section className="section ofa-methodology" aria-labelledby="ofa-methodology-heading">
      <div className="container">
        <div className="section-heading ofa-reveal">
          <p className="ofa-eyebrow">{METHODOLOGY.eyebrow}</p>
          <h2 id="ofa-methodology-heading">{METHODOLOGY.heading}</h2>
          <p>{METHODOLOGY.intro}</p>
        </div>
        <div className="ofa-methodology__journey ofa-reveal-stagger">
          <div className="ofa-methodology__line" aria-hidden="true" />
          {METHODOLOGY.stages.map((s, i) => (
            <div className="ofa-methodology__stop" key={s.name}>
              <span className="ofa-methodology__dot">{i + 1}</span>
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
// ORACLE + AI + AUTOMATION — asymmetric 2-column
// ============================================================

function AiAutomationSection() {
  return (
    <section className="section ofa-ai" aria-labelledby="ofa-ai-heading">
      <div className="container ofa-ai__grid">
        <img src={AI_AUTOMATION.illo} alt="" aria-hidden="true" className="ofa-ai__illo ofa-reveal-left" loading="lazy" />
        <div className="ofa-reveal-right">
          <div className="section-heading">
            <p className="ofa-eyebrow">{AI_AUTOMATION.eyebrow}</p>
            <h2 id="ofa-ai-heading">{AI_AUTOMATION.heading}</h2>
            <p>{AI_AUTOMATION.intro}</p>
          </div>
          <ul className="ofa-ai__list">
            {AI_AUTOMATION.items.map((a) => (
              <li key={a.title}>
                <span className="ofa-ai__list-icon">{a.icon}</span>
                <div>
                  <h3>{a.title}</h3>
                  <p>{a.description}</p>
                </div>
              </li>
            ))}
          </ul>
          <Link to="/agentforce" className="btn btn-primary ofa-btn">
            Explore AI Capabilities <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// MIGRATION & UPGRADE SERVICES — before/after comparison layout
// ============================================================

function MigrationSection() {
  return (
    <section className="section ofa-migration" aria-labelledby="ofa-migration-heading">
      <div className="container">
        <div className="ofa-migration__head ofa-reveal">
          <div className="section-heading">
            <p className="ofa-eyebrow">{MIGRATION.eyebrow}</p>
            <h2 id="ofa-migration-heading">{MIGRATION.heading}</h2>
            <p>{MIGRATION.intro}</p>
          </div>
          <img src={MIGRATION.illo} alt="" aria-hidden="true" className="ofa-migration__illo" loading="lazy" />
        </div>
        <div className="ofa-migration__grid ofa-reveal-stagger">
          {MIGRATION.items.map((m) => (
            <div className="ofa-migration-card" key={m.title}>
              <h3>{m.title}</h3>
              <p>{m.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// INTEGRATION CAPABILITIES — compact icon grid
// ============================================================

function IntegrationsSection() {
  return (
    <section className="section ofa-integrations" aria-labelledby="ofa-integrations-heading">
      <div className="container ofa-integrations__head">
        <div className="section-heading ofa-reveal">
          <p className="ofa-eyebrow">{INTEGRATIONS.eyebrow}</p>
          <h2 id="ofa-integrations-heading">{INTEGRATIONS.heading}</h2>
          <p>{INTEGRATIONS.intro}</p>
        </div>
        <img src={INTEGRATIONS.illo} alt="" aria-hidden="true" className="ofa-integrations__illo ofa-zoom-in" loading="lazy" />
      </div>
      <div className="container">
        <div className="ofa-integrations__grid ofa-reveal-stagger">
          {INTEGRATIONS.items.map((i) => (
            <div className="ofa-integration-card" key={i.title}>
              <span className="ofa-integration-card__icon">{i.icon}</span>
              <h3>{i.title}</h3>
            </div>
          ))}
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
    <section className="section ofa-why" aria-labelledby="ofa-why-heading">
      <div className="container">
        <div className="section-heading ofa-reveal">
          <p className="ofa-eyebrow">{WHY_MIRKETA.eyebrow}</p>
          <h2 id="ofa-why-heading">{WHY_MIRKETA.heading}</h2>
          <p>{WHY_MIRKETA.intro}</p>
        </div>
        <div className="ofa-why__grid ofa-reveal-stagger">
          {WHY_MIRKETA.items.map((w) => (
            <div className="ofa-why-card" key={w.title}>
              <span className="ofa-why-card__icon">{w.icon}</span>
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
// CUSTOMER SUCCESS METRICS — animated counters
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
    <div className="ofa-metric-stat" ref={ref}>
      <strong>{display}</strong>
      <span>{label}</span>
    </div>
  );
}

function MetricsSection() {
  return (
    <section className="ofa-metrics" aria-label="Oracle Fusion customer success metrics">
      <div className="container">
        <div className="section-heading ofa-metrics__heading ofa-reveal">
          <p className="ofa-eyebrow">{METRICS.eyebrow}</p>
          <h2>{METRICS.heading}</h2>
          <p>{METRICS.intro}</p>
        </div>
        <div className="ofa-metrics__grid ofa-reveal-stagger">
          {METRICS.stats.map((s) => (
            <AnimatedCounter key={s.label} value={s.value} label={s.label} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// CASE STUDY — single featured enterprise success story
// ============================================================

function CaseStudySection() {
  return (
    <section className="section ofa-case" aria-labelledby="ofa-case-heading">
      <div className="container">
        <div className="ofa-case__card ofa-reveal">
          <div className="ofa-case__narrative">
            <p className="ofa-eyebrow">{CASE_STUDY.eyebrow}</p>
            <h2 id="ofa-case-heading">{CASE_STUDY.heading}</h2>
            <p className="ofa-case__industry">{CASE_STUDY.industry}</p>
            <dl className="ofa-case__fields">
              <div>
                <dt>Client Challenge</dt>
                <dd>{CASE_STUDY.challenge}</dd>
              </div>
              <div>
                <dt>Oracle Solution</dt>
                <dd>{CASE_STUDY.solution}</dd>
              </div>
              <div>
                <dt>Business Outcome</dt>
                <dd>{CASE_STUDY.outcome}</dd>
              </div>
            </dl>
          </div>
          <div className="ofa-case__metrics">
            <p className="ofa-case__metrics-label">ROI Metrics</p>
            {CASE_STUDY.metrics.map((m) => (
              <div className="ofa-case__metric" key={m.label}>
                <strong>{m.value}</strong>
                <span>{m.label}</span>
              </div>
            ))}
          </div>
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
    <section className="section ofa-faq" aria-labelledby="ofa-faq-heading">
      <div className="container">
        <div className="section-heading ofa-reveal">
          <p className="ofa-eyebrow">FAQ</p>
          <h2 id="ofa-faq-heading">Frequently Asked Questions About Oracle Fusion Implementation</h2>
        </div>
        <div className="ofa-faq__search-wrap ofa-reveal">
          <label htmlFor="ofa-faq-search" className="visually-hidden">
            Search frequently asked questions
          </label>
          <input
            id="ofa-faq-search"
            type="search"
            className="ofa-faq__search"
            placeholder="Ask a question — e.g. &quot;migration&quot;, &quot;integrations&quot;, &quot;AI&quot;..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpenIndex(-1);
            }}
          />
        </div>
        <div className="ofa-faq__list ofa-reveal">
          {filtered.length === 0 ? (
            <p className="ofa-faq__empty">No questions match &ldquo;{query}&rdquo;. Try a different search term.</p>
          ) : (
            filtered.map((item, i) => {
              const open = openIndex === i;
              const panelId = `ofa-faq-panel-${i}`;
              return (
                <div className={`ofa-faq-item ${open ? "is-open" : ""}`} key={item.q}>
                  <button type="button" className="ofa-faq-item__question" aria-expanded={open} aria-controls={panelId} onClick={() => setOpenIndex(open ? -1 : i)}>
                    <span>{item.q}</span>
                    <span className="ofa-faq-item__icon" aria-hidden="true">{open ? "−" : "+"}</span>
                  </button>
                  <div id={panelId} className="ofa-faq-item__answer" role="region" hidden={!open}>
                    <p>{item.a}</p>
                  </div>
                </div>
              );
            })
          )}
        </div>
        <p className="ofa-faq__links">
          Related reading: <Link to="/platforms/salesforce/development-consulting">Salesforce Development & Consulting</Link>,{" "}
          <Link to="/platforms/salesforce/clouds">Salesforce Clouds</Link>,{" "}
          <Link to="/data-cloud">Data Cloud</Link>, <Link to="/ai-consulting">AI Consulting</Link>,{" "}
          <Link to="/agentforce">Agentforce</Link>, <a href="#services">Implementation Services</a>.
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
    <section className="ofa-final-cta ofa-reveal" aria-labelledby="ofa-final-cta-heading">
      <div className="container ofa-final-cta__inner">
        <h2 id="ofa-final-cta-heading">{FINAL_CTA.heading}</h2>
        <p>{FINAL_CTA.description}</p>
        <div className="ofa-final-cta__ctas">
          <a href={FINAL_CTA.primaryCta.href} className="btn btn-primary ofa-btn">
            {FINAL_CTA.primaryCta.label} <span aria-hidden="true">→</span>
          </a>
          <a href={FINAL_CTA.secondaryCta.href} className="btn btn-secondary ofa-btn">
            {FINAL_CTA.secondaryCta.label}
          </a>
        </div>
      </div>
    </section>
  );
}
