import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Images } from "../../../assets/images/index.js";
import Seo from "../../../components/Seo/Seo.jsx";
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb.jsx";
import HeroVisual from "../../../components/HeroVisual/HeroVisual.jsx";
import ConsultationSection from "../../../components/ConsultationSection/ConsultationSection.jsx";
import L3SideNav from "../../../components/L3SideNav/L3SideNav.jsx";
import "./HcmConsulting.css";

gsap.registerPlugin(ScrollTrigger);

// ============================================================
// ICONS
// ============================================================

const Ico = {
  check: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12.5l5 5L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  compass: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" /><path d="M15 9l-2 6-6 2 2-6 6-2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  chartUp: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 19V13M10 19V8M16 19v-5M20 19V5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
  ),
  network: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="6" r="2.4" stroke="currentColor" strokeWidth="1.4" /><circle cx="6" cy="18" r="2.4" stroke="currentColor" strokeWidth="1.4" /><circle cx="18" cy="18" r="2.4" stroke="currentColor" strokeWidth="1.4" /><path d="M12 8.4L7 16M12 8.4l5 7.6M8.4 18h7.2" stroke="currentColor" strokeWidth="1.3" /></svg>
  ),
  arrowUp: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 19V5M6 11l6-6 6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  plug: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 3v5M15 3v5M7 8h10v4a5 5 0 01-10 0V8z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="M12 17v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
  ),
  gear: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.4" /><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
  ),
  headset: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 13a8 8 0 0116 0v4" stroke="currentColor" strokeWidth="1.5" /><rect x="3" y="13" width="4" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4" /><rect x="17" y="13" width="4" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4" /></svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  users: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="9" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.4" /><path d="M3.5 19c.6-3.4 2.9-5.2 5.5-5.2s4.9 1.8 5.5 5.2" stroke="currentColor" strokeWidth="1.4" /><circle cx="17" cy="9" r="2.6" stroke="currentColor" strokeWidth="1.3" opacity="0.7" /><path d="M15.5 13.4c2.2.3 3.7 1.9 4 4.6" stroke="currentColor" strokeWidth="1.3" opacity="0.7" /></svg>
  ),
  globe: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.4" /><path d="M3 12h18M12 3c2.5 2.5 3.5 6 3.5 9s-1 6.5-3.5 9c-2.5-2.5-3.5-6-3.5-9s1-6.5 3.5-9z" stroke="currentColor" strokeWidth="1.3" /></svg>
  ),
  dollar: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.4" /><path d="M12 7v10M15 9.5c0-1.4-1.3-2.5-3-2.5s-3 1-3 2.3c0 3 6 1.5 6 4.5 0 1.3-1.3 2.4-3 2.4s-3-1.1-3-2.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
  ),
  award: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="8" r="5" stroke="currentColor" strokeWidth="1.4" /><path d="M8.5 12.5L7 21l5-2.5L17 21l-1.5-8.5" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  clock: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" /><path d="M12 7v5l4 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  search: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" strokeWidth="1.5" /><path d="M20 20l-4.8-4.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
  ),
  book: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 5.5C4 4.7 4.7 4 5.5 4H12v16H5.5c-.8 0-1.5-.7-1.5-1.5v-13z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M20 5.5c0-.8-.7-1.5-1.5-1.5H12v16h6.5c.8 0 1.5-.7 1.5-1.5v-13z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  target: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.4" /><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.3" opacity="0.6" /><circle cx="12" cy="12" r="1.2" fill="currentColor" /></svg>
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
  bolt: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M13 2L4 14h7l-1 8 10-13h-7l0-7z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  cloud: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6.5 16.5A4.2 4.2 0 017 8.2 5.5 5.5 0 0117.5 9.5 3.7 3.7 0 0117 17H7" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></svg>
  ),
  api: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="4" y="8" width="6" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.4" /><rect x="14" y="8" width="6" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.4" /><path d="M10 12h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
  ),
  document: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 3h9l3 3v15H6z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M9 10h6M9 14h6M9 18h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
  ),
};

// ============================================================
// DATA
// ============================================================

const L3_ITEMS = [
  { label: "ERP Consulting", href: "/platforms/oracle/fusion-implementation/erp-consulting" },
  { label: "HCM", href: "/platforms/oracle/fusion-implementation/hcm-consulting" },
  { label: "CX Consulting Development", href: "/platforms/oracle/fusion-implementation/cx-consulting" },
  { label: "EPM Consulting Development Services", href: "/platforms/oracle/fusion-implementation/epm-consulting" },
  { label: "SCM", href: "/platforms/oracle/fusion-implementation/scm-consulting" },
];

const BREADCRUMB = [
  { label: "Home", href: "/" },
  { label: "Platforms & Technology", href: "/" },
  { label: "Oracle Fusion Applications Implementation", href: "/platforms/oracle/fusion-implementation" },
  { label: "HCM" },
];

const HERO = {
  badge: "Oracle Certified HCM Implementation Partner",
  title: "Oracle HCM Consulting & Development Services for Modern Enterprise HR",
  description:
    "Mirketa helps enterprises implement, migrate, and optimize Oracle Cloud HCM — Core HR, Talent, Payroll, and Workforce Management — with a delivery model built around faster hiring, stronger compliance, and measurable HR outcomes.",
  primaryCta: { label: "Schedule Consultation", href: "#contact" },
  secondaryCta: { label: "Talk to Oracle HCM Experts", href: "#contact" },
  metrics: ["120+ Oracle HCM Engagements", "Certified HCM Consultants", "Global Delivery Model", "Post Go-Live Support Included"],
};

const HERO_DASHBOARD = {
  title: "Workforce Operations Center",
  stats: [
    { label: "TIME-TO-HIRE", value: "46%", caption: "Faster with unified recruiting" },
    { label: "HR ADMIN COSTS", value: "31%", caption: "Lower after go-live" },
    { label: "CLIENT SATISFACTION", value: "96%", caption: "Across enterprise engagements" },
  ],
  rows: [
    { title: "Global payroll run — 14 countries", meta: "Localized compliance validated", tone: "good", status: "Processed" },
    { title: "Candidate pipeline — engineering roles", meta: "AI-ranked against role requirements", tone: "good", status: "Active" },
    { title: "Attrition risk — APAC region", meta: "Flagged by predictive workforce insights", tone: "attention", status: "Review" },
  ],
  floatingCards: [
    { icon: Ico.robot, title: "AI Copilot for HR", subtitle: "Answers policy questions in context" },
    { icon: Ico.search, title: "AI Recruiting", subtitle: "Candidates ranked in seconds" },
  ],
};

const SERVICES = {
  eyebrow: "Oracle HCM Consulting Services",
  heading: "Consulting Built Around How Your Workforce Actually Runs",
  intro: "Every engagement starts with how your business hires, pays, and develops people — not a generic module checklist.",
  items: [
    { icon: Ico.compass, title: "Oracle HCM Consulting", description: "A prioritized roadmap tying every HR decision to a measurable workforce outcome." },
    { icon: Ico.chartUp, title: "Oracle HCM Implementation", description: "Core HR, payroll, and talent workflows configured to your organizational structure." },
    { icon: Ico.network, title: "Oracle HCM Migration", description: "Legacy HR and payroll data migrated, deduplicated, and reconciled before go-live." },
    { icon: Ico.arrowUp, title: "Oracle HCM Upgrade", description: "Quarterly HCM updates managed and regression-tested proactively." },
    { icon: Ico.plug, title: "Oracle HCM Integration", description: "HCM connected to the payroll, directory, and CRM systems your teams already run." },
    { icon: Ico.gear, title: "Oracle HCM Customization", description: "Extensions and configuration tailored to policies a standard build can't cover." },
    { icon: Ico.headset, title: "Managed Services", description: "A dedicated team keeping your HCM environment healthy after launch." },
    { icon: Ico.shield, title: "Support & Maintenance", description: "Ongoing monitoring, patching, and issue resolution built into every engagement." },
  ],
};

const MODULES = {
  eyebrow: "Oracle HCM Modules",
  heading: "Full-Scope Coverage Across Every HCM Module",
  intro: "We implement and configure every Oracle HCM module to work together as one connected system, not twelve disconnected ones.",
  items: [
    { icon: Ico.users, title: "Core HR" },
    { icon: Ico.globe, title: "Global HR" },
    { icon: Ico.dollar, title: "Payroll" },
    { icon: Ico.award, title: "Talent Management" },
    { icon: Ico.clock, title: "Workforce Management" },
    { icon: Ico.search, title: "Recruiting" },
    { icon: Ico.book, title: "Learning" },
    { icon: Ico.chartUp, title: "Compensation" },
    { icon: Ico.target, title: "Performance Management" },
    { icon: Ico.network, title: "Succession Planning" },
    { icon: Ico.headset, title: "HR Help Desk" },
    { icon: Ico.sparkle, title: "Employee Experience" },
  ],
};

const BENEFITS = {
  eyebrow: "HR Transformation Benefits",
  heading: "What a Properly Configured Oracle HCM Delivers",
  intro: "These are the outcomes our HR and people leaders report after their Oracle HCM engagement.",
  items: [
    { title: "Better Employee Experience", description: "Self-service HR that employees actually want to use." },
    { title: "Faster Hiring", description: "Recruiting pipelines that move candidates through in days, not weeks." },
    { title: "Improved Workforce Planning", description: "Headcount and skills gaps visible before they become a crisis." },
    { title: "Automated HR Processes", description: "Approvals and onboarding steps removed from manual queues." },
    { title: "Compliance Management", description: "Policy and regulatory controls built into every workflow." },
    { title: "Real-Time Analytics", description: "Workforce dashboards built on your own HR data, not stale exports." },
    { title: "Reduced Operational Costs", description: "Manual HR administration replaced with configured workflows." },
    { title: "Higher Employee Engagement", description: "Managers and employees working from one connected HR system." },
  ],
};

const METHODOLOGY = {
  eyebrow: "Oracle HCM Implementation Methodology",
  heading: "A Structured Path From Assessment to Hypercare",
  intro: "No surprises, no scope creep. Our HCM delivery methodology has been refined across hundreds of enterprise implementations.",
  stages: [
    { name: "Assessment", description: "Mapping your current HR, payroll, and talent processes." },
    { name: "Business Process Review", description: "Identifying gaps and inefficiencies before a single screen is configured." },
    { name: "Solution Design", description: "Data model, security, and integration architecture documented." },
    { name: "Configuration", description: "Core HCM setup — org structure, roles, approval workflows." },
    { name: "Data Migration", description: "Employee and payroll history migrated and reconciled." },
    { name: "Testing", description: "UAT, regression, and security testing completed before go-live." },
    { name: "Go Live", description: "Structured cutover with a dedicated go-live command center." },
    { name: "Hypercare & Support", description: "Elevated support coverage through post-launch stabilization." },
  ],
};

const AI_HCM = {
  eyebrow: "AI-Powered Human Capital Management",
  heading: "AI That Works Inside Your HR Processes",
  intro: "Embedded AI becomes valuable only when it's tuned against your own workforce data — not a generic model.",
  featured: [
    { icon: Ico.robot, title: "AI Copilot for HR", description: "A conversational assistant that answers HR and policy questions in context." },
    { icon: Ico.eye, title: "Predictive Workforce Insights", description: "Attrition and skills-gap risk surfaced before they become problems." },
  ],
  items: [
    { icon: Ico.search, title: "AI-Powered Recruiting", description: "Candidates ranked and routed automatically against role requirements." },
    { icon: Ico.document, title: "Resume Screening", description: "Resumes parsed and matched to open roles in seconds, not days." },
    { icon: Ico.chartUp, title: "Employee Analytics", description: "Engagement and performance trends surfaced directly on the record." },
    { icon: Ico.compass, title: "Workforce Planning", description: "Headcount scenarios modeled against real demand signals." },
    { icon: Ico.sparkle, title: "Intelligent Recommendations", description: "Next-best-action guidance for managers and HR business partners." },
    { icon: Ico.bolt, title: "HR Automation", description: "Onboarding and approval steps removed from manual queues." },
  ],
};

const INTEGRATIONS = {
  eyebrow: "Oracle HCM Integration Services",
  heading: "Oracle HCM Connected to the Systems You Already Run",
  intro: "HCM data is only as useful as the systems it reaches. We connect it to the platforms your teams rely on every day.",
  items: [
    { icon: Ico.chartUp, title: "Oracle ERP" },
    { icon: Ico.network, title: "Oracle SCM" },
    { icon: Ico.headset, title: "Oracle CX" },
    { icon: Ico.cloud, title: "Salesforce" },
    { icon: Ico.globe, title: "Microsoft 365" },
    { icon: Ico.shield, title: "Active Directory" },
    { icon: Ico.dollar, title: "Payroll Systems" },
    { icon: Ico.api, title: "REST APIs" },
    { icon: Ico.plug, title: "Third-Party HR Applications" },
  ],
};

const WHY_MIRKETA = {
  eyebrow: "Why Choose Mirketa",
  heading: "An Oracle HCM Partner That Owns the Outcome",
  intro: "Hundreds of partners can activate HCM modules. Fewer can tie every decision back to a measurable HR outcome.",
  items: [
    { icon: Ico.award, title: "Certified Oracle HCM Consultants", description: "Every consultant holds active Oracle HCM Cloud certifications." },
    { icon: Ico.users, title: "Enterprise HR Expertise", description: "Delivery teams with real HR and workforce domain context." },
    { icon: Ico.globe, title: "Global Delivery Team", description: "Follow-the-sun coverage for multi-region enterprise rollouts." },
    { icon: Ico.robot, title: "AI Accelerators", description: "Pre-built frameworks that cut implementation time without cutting quality." },
    { icon: Ico.document, title: "Proven Implementation Framework", description: "A structured, sprint-based methodology refined across hundreds of engagements." },
    { icon: Ico.compass, title: "Industry Experience", description: "Context specific to your sector's workforce and compliance needs." },
    { icon: Ico.network, title: "End-to-End Delivery", description: "One team from assessment through hypercare — no handoffs, no gaps." },
    { icon: Ico.headset, title: "Post Go-Live Support", description: "A dedicated team keeping your HCM environment healthy after launch." },
  ],
};

const METRICS = {
  eyebrow: "Customer Success Metrics",
  heading: "What Our Oracle HCM Clients Have Achieved",
  intro: "These are the outcomes our enterprise clients report after their Oracle HCM engagement.",
  stats: [
    { value: "120+", label: "HCM Projects Delivered" },
    { value: "70+", label: "Certified Consultants" },
    { value: "95+", label: "Enterprise Customers" },
    { value: "14", label: "Countries Served" },
    { value: "96%", label: "Client Satisfaction" },
  ],
};

const CASE_STUDY = {
  eyebrow: "Case Study",
  heading: "Global Retailer Cuts Time-to-Hire by 46% With Oracle HCM",
  industry: "Retail • Multi-Country Workforce, 40,000+ Employees",
  fields: [
    { label: "Business Challenge", text: "A global retailer was managing recruiting, payroll, and workforce data across six disconnected regional systems, with hiring managers waiting weeks for candidate visibility." },
    { label: "Oracle HCM Solution", text: "Mirketa implemented Oracle Cloud HCM across Core HR, Recruiting, and Payroll, unifying workforce data into a single global instance." },
    { label: "Implementation Approach", text: "A phased rollout by region, starting with recruiting and core HR before extending to payroll, with parallel testing at every stage to protect pay continuity." },
    { label: "Business Outcomes", text: "Hiring managers now see candidate status in real time, and HR reports from one connected system instead of six regional exports." },
  ],
  metrics: [
    { value: "46%", label: "Faster Time-to-Hire" },
    { value: "6 → 1", label: "Systems Consolidated" },
    { value: "31%", label: "Lower HR Admin Costs" },
    { value: "$2.4M", label: "Annual ROI" },
  ],
};

const FAQS = [
  { q: "What is Oracle HCM Consulting & Development?", a: "Oracle HCM Consulting & Development is the process of implementing, migrating, and optimizing Oracle's Fusion Cloud HCM suite — Core HR, Payroll, Talent Management, and Workforce Management — configured to your organization's structure and policies." },
  { q: "How long does an Oracle HCM implementation take?", a: "A focused single-country implementation typically takes 3–4 months. Multi-country deployments spanning Core HR, Payroll, and Talent Management can take 8–12 months depending on scope and legacy data complexity." },
  { q: "Can you migrate us from a legacy HRIS or spreadsheets?", a: "Yes. We migrate employee, payroll, and talent data from legacy HR systems and spreadsheets, including deduplication and reconciliation, so you start on Oracle HCM with a trustworthy foundation." },
  { q: "What Oracle HCM modules do you implement?", a: "We implement Core HR, Global HR, Payroll, Talent Management, Workforce Management, Recruiting, Learning, Compensation, Performance Management, Succession Planning, HR Help Desk, and Employee Experience." },
  { q: "How does Oracle HCM integrate with other systems?", a: "We integrate Oracle HCM with Oracle ERP, Oracle SCM, Oracle CX, Salesforce, Microsoft 365, Active Directory, and payroll systems using REST APIs, so employee data flows without manual re-entry." },
  { q: "What AI capabilities does Oracle HCM include?", a: "Oracle HCM includes embedded AI for recruiting, resume screening, and predictive workforce insights. We configure these against your own workforce data so recommendations reflect how your business actually operates." },
  { q: "Do you provide support after go-live?", a: "Yes. Every implementation includes a structured hypercare period immediately after go-live. Clients can transition into an ongoing managed services retainer for continued optimization." },
  { q: "Are you a certified Oracle HCM implementation partner?", a: "Yes. Mirketa's consultants hold active Oracle HCM Cloud certifications, backed by a verified delivery track record across enterprise HR transformation engagements." },
  { q: "Can Oracle HCM support multi-country payroll and compliance?", a: "Yes. Oracle HCM is built for multi-country HR operations with localized payroll and statutory compliance across 190+ countries. We've delivered rollouts spanning workforces of 40,000+ employees." },
];

const FINAL_CTA = {
  heading: "Transform Your HR Operations with Oracle HCM",
  description: "Partner with Mirketa's certified Oracle HCM consultants to implement, migrate, and optimize your HR systems — or speak with an Oracle HCM expert before you commit to a roadmap.",
  primaryCta: { label: "Schedule Consultation", href: "#contact" },
  secondaryCta: { label: "Speak with an Oracle HCM Expert", href: "#contact" },
};

const SEO = {
  title: "Oracle HCM Consulting & Development Services | Mirketa",
  description:
    "Mirketa's certified Oracle HCM consultants deliver Fusion Cloud HCM implementation, migration, and AI-powered HR transformation across Core HR, Payroll, Talent, and Workforce Management.",
  canonical: "https://mirketa.us/oracle-hcm-consulting-development-services/",
  keywords: [
    "Oracle HCM Consulting",
    "Oracle HCM Implementation",
    "Oracle HCM Development Services",
    "Oracle Cloud HCM",
    "Oracle HCM Migration",
    "Oracle HCM Integration",
    "Oracle HCM AI Automation",
    "Enterprise HR Transformation",
    "Oracle HCM Partner",
    "Oracle Fusion HCM",
  ],
  schema: [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "Oracle HCM Consulting and Development Services",
      provider: { "@type": "Organization", name: "Mirketa Inc.", url: "https://mirketa.us" },
      name: "Oracle HCM Consulting & Development Services",
      description:
        "End-to-end Oracle Cloud HCM consulting, implementation, migration, integration, and AI-powered HR transformation across Core HR, Payroll, Talent, and Workforce Management.",
      areaServed: "Global",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://mirketa.us/" },
        { "@type": "ListItem", position: 2, name: "Oracle Fusion Applications Implementation", item: "https://mirketa.us/oracle-fusion-applications-implementation/" },
        { "@type": "ListItem", position: 3, name: "Oracle HCM Consulting & Development Services", item: "https://mirketa.us/oracle-hcm-consulting-development-services/" },
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

export default function HcmConsulting() {
  const location = useLocation();
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

      gsap.utils.toArray(".ohc-reveal").forEach((el) => {
        gsap.from(el, {
          opacity: prefersReduced ? 1 : 0,
          y: prefersReduced ? 0 : 32,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      gsap.utils.toArray(".ohc-reveal-left").forEach((el) => {
        gsap.from(el, {
          opacity: prefersReduced ? 1 : 0,
          x: prefersReduced ? 0 : -30,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      gsap.utils.toArray(".ohc-reveal-right").forEach((el) => {
        gsap.from(el, {
          opacity: prefersReduced ? 1 : 0,
          x: prefersReduced ? 0 : 30,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      gsap.utils.toArray(".ohc-reveal-stagger").forEach((el) => {
        gsap.from(el.children, {
          opacity: prefersReduced ? 1 : 0,
          y: prefersReduced ? 0 : 26,
          duration: 0.6,
          stagger: 0.06,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      gsap.utils.toArray(".ohc-zoom-in").forEach((el) => {
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
    <div className="oracle-hcm-consulting">
      <Seo {...SEO} />
      <HeroSection heroTextRef={heroTextRef} heroRef={heroRef} />
      <TrustedBySection />

      <section className="ohc-l3-layout" aria-label="Oracle HCM Consulting details">
        <div className="container ohc-l3-layout__grid">
          <L3SideNav eyebrow="Oracle Fusion Applications" items={L3_ITEMS} activeHref={location.pathname} ariaLabel="Oracle Fusion Applications Implementation sub-pages" />
          <div className="ohc-l3-layout__content">
            <ServicesSection />
            <ModulesSection />
            <BenefitsSection />
            <MethodologySection />
            <AiHcmSection />
            <IntegrationsSection />
            <WhyMirketaSection />
            <MetricsSection />
          </div>
        </div>
      </section>

      <CaseStudySection />
      <FaqSection />
      <FinalCtaSection />
      <ConsultationSection
        eyebrow="Get Started"
        heading="Schedule a Free Oracle HCM Consultation"
        description="Tell us about your current HR, payroll, and workforce systems and where Oracle HCM fits into your roadmap — an Oracle HCM expert will follow up within one business day."
        formTitle="Schedule a Free Oracle HCM Consultation"
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
    <div className={`ohc-sticky-cta ${visible ? "is-visible" : ""}`} aria-hidden={!visible}>
      <a href="#contact" className="btn btn-primary ohc-btn" tabIndex={visible ? 0 : -1}>
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
    <section ref={heroRef} className="ohc-hero" style={{ backgroundImage: `url("${Images.heroOracleHcmConsulting}")` }} aria-label="Oracle HCM Consulting & Development by Mirketa">
      <div className="ohc-hero__scrim" />
      <div className="container">
        <Breadcrumb items={BREADCRUMB} className="ohc-breadcrumb" />
        <div className="ohc-hero__inner">
          <div ref={heroTextRef} className="ohc-hero__text">
            <span className="ohc-badge">
              <span className="ohc-badge__spark" aria-hidden="true">✦</span> {HERO.badge}
            </span>
            <h1>{HERO.title}</h1>
            <p className="ohc-hero__description">{HERO.description}</p>
            <div className="ohc-hero__ctas">
              <a href={HERO.primaryCta.href} className="btn btn-primary ohc-btn">
                {HERO.primaryCta.label} <span aria-hidden="true">→</span>
              </a>
              <a href={HERO.secondaryCta.href} className="btn btn-secondary ohc-btn">
                {HERO.secondaryCta.label}
              </a>
            </div>
            <ul className="ohc-hero__metrics">
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
            className="ohc-hero__visual ohc-zoom-in"
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
    <section className="ohc-trusted" aria-label="Trusted by global enterprises">
      <div className="container ohc-trusted__inner">
        <p className="ohc-trusted__label">Trusted by Global Enterprises</p>
        <div className="ohc-trusted__track" role="list">
          <div className="ohc-trusted__marquee">
            {loop.map((b, i) => (
              <div className="ohc-trusted__badge" role="listitem" key={`${b.label}-${i}`}>
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
// ORACLE HCM CONSULTING SERVICES — 2-col icon card grid
// ============================================================

function ServicesSection() {
  return (
    <section className="ohc-services" id="services" aria-labelledby="ohc-services-heading">
      <div className="ohc-services__head">
        <div>
          <p className="ohc-eyebrow">{SERVICES.eyebrow}</p>
          <h2 id="ohc-services-heading">{SERVICES.heading}</h2>
          <p className="ohc-section-intro">{SERVICES.intro}</p>
        </div>
        <img src={Images.illoOracleHcmWorkforceDashboard} alt="" aria-hidden="true" className="ohc-services__illo" loading="lazy" />
      </div>
      <div className="ohc-services__grid ohc-reveal-stagger">
        {SERVICES.items.map((s) => (
          <div className="ohc-service-card" key={s.title}>
            <span className="ohc-service-card__icon">{s.icon}</span>
            <h3>{s.title}</h3>
            <p>{s.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ============================================================
// ORACLE HCM MODULES — dense 3-col compact tile grid
// ============================================================

function ModulesSection() {
  return (
    <section className="ohc-modules" aria-labelledby="ohc-modules-heading">
      <p className="ohc-eyebrow">{MODULES.eyebrow}</p>
      <h2 id="ohc-modules-heading">{MODULES.heading}</h2>
      <p className="ohc-section-intro">{MODULES.intro}</p>
      <div className="ohc-modules__grid ohc-reveal-stagger">
        {MODULES.items.map((m) => (
          <div className="ohc-module-tile" key={m.title}>
            <span>{m.icon}</span>
            <h3>{m.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}

// ============================================================
// HR TRANSFORMATION BENEFITS — 2-col benefit tiles
// ============================================================

function BenefitsSection() {
  return (
    <section className="ohc-benefits" aria-labelledby="ohc-benefits-heading">
      <p className="ohc-eyebrow">{BENEFITS.eyebrow}</p>
      <h2 id="ohc-benefits-heading">{BENEFITS.heading}</h2>
      <p className="ohc-section-intro">{BENEFITS.intro}</p>
      <div className="ohc-benefits__grid ohc-reveal-stagger">
        {BENEFITS.items.map((b) => (
          <div className="ohc-benefit-tile" key={b.title}>
            <span aria-hidden="true">{Ico.check}</span>
            <h3>{b.title}</h3>
            <p>{b.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ============================================================
// ORACLE HCM IMPLEMENTATION METHODOLOGY — horizontal scroll strip
// ============================================================

function MethodologySection() {
  return (
    <section className="ohc-methodology" aria-labelledby="ohc-methodology-heading">
      <p className="ohc-eyebrow">{METHODOLOGY.eyebrow}</p>
      <h2 id="ohc-methodology-heading">{METHODOLOGY.heading}</h2>
      <p className="ohc-section-intro">{METHODOLOGY.intro}</p>
      <div className="ohc-methodology__strip ohc-reveal-stagger">
        {METHODOLOGY.stages.map((s, i) => (
          <div className="ohc-methodology__stage" key={s.name}>
            <div className="ohc-methodology__card">
              <span className="ohc-methodology__num">{i + 1}</span>
              <h3>{s.name}</h3>
              <p>{s.description}</p>
            </div>
            {i < METHODOLOGY.stages.length - 1 && (
              <span className="ohc-methodology__arrow" aria-hidden="true">→</span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

// ============================================================
// AI-POWERED HCM — featured pair + compact list
// ============================================================

function AiHcmSection() {
  return (
    <section className="ohc-ai" aria-labelledby="ohc-ai-heading">
      <p className="ohc-eyebrow">{AI_HCM.eyebrow}</p>
      <h2 id="ohc-ai-heading">{AI_HCM.heading}</h2>
      <p className="ohc-section-intro">{AI_HCM.intro}</p>
      <div className="ohc-ai__featured ohc-reveal-stagger">
        {AI_HCM.featured.map((f) => (
          <div className="ohc-ai-featured-card" key={f.title}>
            <span>{f.icon}</span>
            <h3>{f.title}</h3>
            <p>{f.description}</p>
          </div>
        ))}
      </div>
      <ul className="ohc-ai__list ohc-reveal-stagger">
        {AI_HCM.items.map((a) => (
          <li key={a.title}>
            <span className="ohc-ai__list-icon">{a.icon}</span>
            <div>
              <h3>{a.title}</h3>
              <p>{a.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

// ============================================================
// ORACLE HCM INTEGRATION SERVICES — pill row
// ============================================================

function IntegrationsSection() {
  return (
    <section className="ohc-integrations" aria-labelledby="ohc-integrations-heading">
      <p className="ohc-eyebrow">{INTEGRATIONS.eyebrow}</p>
      <h2 id="ohc-integrations-heading">{INTEGRATIONS.heading}</h2>
      <p className="ohc-section-intro">{INTEGRATIONS.intro}</p>
      <div className="ohc-integrations__pills ohc-reveal-stagger">
        {INTEGRATIONS.items.map((i) => (
          <div className="ohc-integration-pill" key={i.title}>
            <span>{i.icon}</span>
            {i.title}
          </div>
        ))}
      </div>
    </section>
  );
}

// ============================================================
// WHY CHOOSE MIRKETA — left-accent-bar cards
// ============================================================

function WhyMirketaSection() {
  return (
    <section className="ohc-why" aria-labelledby="ohc-why-heading">
      <p className="ohc-eyebrow">{WHY_MIRKETA.eyebrow}</p>
      <h2 id="ohc-why-heading">{WHY_MIRKETA.heading}</h2>
      <p className="ohc-section-intro">{WHY_MIRKETA.intro}</p>
      <div className="ohc-why__grid ohc-reveal-stagger">
        {WHY_MIRKETA.items.map((w) => (
          <div className="ohc-why-card" key={w.title}>
            <span className="ohc-why-card__icon">{w.icon}</span>
            <div>
              <h3>{w.title}</h3>
              <p>{w.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ============================================================
// CUSTOMER SUCCESS METRICS — inset dark horizontal stat row
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
    <div className="ohc-metric-stat" ref={ref}>
      <strong>{display}</strong>
      <span>{label}</span>
    </div>
  );
}

function MetricsSection() {
  return (
    <section className="ohc-metrics" aria-labelledby="ohc-metrics-heading">
      <div className="ohc-metrics__card ohc-reveal">
        <p className="ohc-eyebrow">{METRICS.eyebrow}</p>
        <h2 id="ohc-metrics-heading">{METRICS.heading}</h2>
        <p className="ohc-section-intro">{METRICS.intro}</p>
        <div className="ohc-metrics__row ohc-reveal-stagger">
          {METRICS.stats.map((s) => (
            <AnimatedCounter key={s.label} value={s.value} label={s.label} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// CASE STUDY — full-width two-column (narrative timeline + ROI grid)
// ============================================================

function CaseStudySection() {
  return (
    <section className="section ohc-case" aria-labelledby="ohc-case-heading">
      <div className="container">
        <div className="section-heading ohc-reveal">
          <p className="ohc-eyebrow">{CASE_STUDY.eyebrow}</p>
          <h2 id="ohc-case-heading">{CASE_STUDY.heading}</h2>
          <p className="ohc-case__industry">{CASE_STUDY.industry}</p>
        </div>
        <div className="ohc-case__grid">
          <div className="ohc-case__narrative ohc-reveal-left">
            {CASE_STUDY.fields.map((f, i) => (
              <div className="ohc-case__field" key={f.label}>
                <div className="ohc-case__field-marker">
                  <span>{i + 1}</span>
                  {i < CASE_STUDY.fields.length - 1 && <span className="ohc-case__field-line" aria-hidden="true" />}
                </div>
                <div>
                  <p className="ohc-case__field-label">{f.label}</p>
                  <p>{f.text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="ohc-case__roi ohc-reveal-right">
            <p className="ohc-case__roi-label">ROI Improvements</p>
            <div className="ohc-case__roi-grid">
              {CASE_STUDY.metrics.map((m) => (
                <div className="ohc-case__roi-tile" key={m.label}>
                  <strong>{m.value}</strong>
                  <span>{m.label}</span>
                </div>
              ))}
            </div>
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
    <section className="section ohc-faq" aria-labelledby="ohc-faq-heading">
      <div className="container">
        <div className="section-heading ohc-reveal">
          <p className="ohc-eyebrow">FAQ</p>
          <h2 id="ohc-faq-heading">Frequently Asked Questions About Oracle HCM Consulting</h2>
        </div>
        <div className="ohc-faq__search-wrap ohc-reveal">
          <label htmlFor="ohc-faq-search" className="visually-hidden">
            Search frequently asked questions
          </label>
          <input
            id="ohc-faq-search"
            type="search"
            className="ohc-faq__search"
            placeholder="Ask a question — e.g. &quot;migration&quot;, &quot;integrations&quot;, &quot;AI&quot;..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpenIndex(-1);
            }}
          />
        </div>
        <div className="ohc-faq__list ohc-reveal">
          {filtered.length === 0 ? (
            <p className="ohc-faq__empty">No questions match &ldquo;{query}&rdquo;. Try a different search term.</p>
          ) : (
            filtered.map((item, i) => {
              const open = openIndex === i;
              const panelId = `ohc-faq-panel-${i}`;
              return (
                <div className={`ohc-faq-item ${open ? "is-open" : ""}`} key={item.q}>
                  <button type="button" className="ohc-faq-item__question" aria-expanded={open} aria-controls={panelId} onClick={() => setOpenIndex(open ? -1 : i)}>
                    <span>{item.q}</span>
                    <span className="ohc-faq-item__icon" aria-hidden="true">{open ? "−" : "+"}</span>
                  </button>
                  <div id={panelId} className="ohc-faq-item__answer" role="region" hidden={!open}>
                    <p>{item.a}</p>
                  </div>
                </div>
              );
            })
          )}
        </div>
        <p className="ohc-faq__links">
          Related reading: <Link to="/platforms/oracle/fusion-implementation">Oracle Fusion Applications Implementation</Link>,{" "}
          <Link to="/platforms/oracle/fusion-implementation/erp-consulting">Oracle Cloud ERP Consulting</Link>,{" "}
          <Link to="/platforms/salesforce/development-consulting">Salesforce Development & Consulting</Link>,{" "}
          <Link to="/ai-consulting">AI Consulting</Link>, <a href="#services">Implementation Services</a>.
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
    <section className="ohc-final-cta ohc-reveal" aria-labelledby="ohc-final-cta-heading">
      <div className="container ohc-final-cta__inner">
        <h2 id="ohc-final-cta-heading">{FINAL_CTA.heading}</h2>
        <p>{FINAL_CTA.description}</p>
        <div className="ohc-final-cta__ctas">
          <a href={FINAL_CTA.primaryCta.href} className="btn btn-primary ohc-btn">
            {FINAL_CTA.primaryCta.label} <span aria-hidden="true">→</span>
          </a>
          <a href={FINAL_CTA.secondaryCta.href} className="btn btn-secondary ohc-btn">
            {FINAL_CTA.secondaryCta.label}
          </a>
        </div>
      </div>
    </section>
  );
}
