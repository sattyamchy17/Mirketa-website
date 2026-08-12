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
import "./ErpConsulting.css";

gsap.registerPlugin(ScrollTrigger);

// ============================================================
// ICONS
// ============================================================

const Ico = {
  check: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12.5l5 5L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  dollar: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.4" /><path d="M12 7v10M15 9.5c0-1.4-1.3-2.5-3-2.5s-3 1-3 2.3c0 3 6 1.5 6 4.5 0 1.3-1.3 2.4-3 2.4s-3-1.1-3-2.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
  ),
  cart: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 4h2l2.2 11h10.6L20 7H6.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /><circle cx="9" cy="20" r="1.3" fill="currentColor" /><circle cx="17" cy="20" r="1.3" fill="currentColor" /></svg>
  ),
  compass: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" /><path d="M15 9l-2 6-6 2 2-6 6-2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  network: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="6" r="2.4" stroke="currentColor" strokeWidth="1.4" /><circle cx="6" cy="18" r="2.4" stroke="currentColor" strokeWidth="1.4" /><circle cx="18" cy="18" r="2.4" stroke="currentColor" strokeWidth="1.4" /><path d="M12 8.4L7 16M12 8.4l5 7.6M8.4 18h7.2" stroke="currentColor" strokeWidth="1.3" /></svg>
  ),
  box: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 8l9-5 9 5-9 5-9-5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M3 8v8l9 5 9-5V8M12 13v8" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /></svg>
  ),
  factory: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 21V11l5 3V11l5 3V8l8 5v8H3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  chartUp: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 19V13M10 19V8M16 19v-5M20 19V5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
  ),
  bolt: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M13 2L4 14h7l-1 8 10-13h-7l0-7z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  document: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 3h9l3 3v15H6z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M9 10h6M9 14h6M9 18h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
  ),
  eye: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.4" /></svg>
  ),
  robot: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="5" y="9" width="14" height="10" rx="3" stroke="currentColor" strokeWidth="1.5" /><path d="M12 5v4M9 14h.01M15 14h.01" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /><circle cx="12" cy="4" r="1.4" fill="currentColor" /></svg>
  ),
  sparkle: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /></svg>
  ),
  cloud: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6.5 16.5A4.2 4.2 0 017 8.2 5.5 5.5 0 0117.5 9.5 3.7 3.7 0 0117 17H7" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></svg>
  ),
  users: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="9" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.4" /><path d="M3.5 19c.6-3.4 2.9-5.2 5.5-5.2s4.9 1.8 5.5 5.2" stroke="currentColor" strokeWidth="1.4" /><circle cx="17" cy="9" r="2.6" stroke="currentColor" strokeWidth="1.3" opacity="0.7" /><path d="M15.5 13.4c2.2.3 3.7 1.9 4 4.6" stroke="currentColor" strokeWidth="1.3" opacity="0.7" /></svg>
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
  globe: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.4" /><path d="M3 12h18M12 3c2.5 2.5 3.5 6 3.5 9s-1 6.5-3.5 9c-2.5-2.5-3.5-6-3.5-9s1-6.5 3.5-9z" stroke="currentColor" strokeWidth="1.3" /></svg>
  ),
  award: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="8" r="5" stroke="currentColor" strokeWidth="1.4" /><path d="M8.5 12.5L7 21l5-2.5L17 21l-1.5-8.5" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  headset: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 13a8 8 0 0116 0v4" stroke="currentColor" strokeWidth="1.5" /><rect x="3" y="13" width="4" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4" /><rect x="17" y="13" width="4" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4" /></svg>
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
  { label: "ERP Consulting" },
];

const HERO = {
  badge: "Oracle Certified ERP Implementation Partner",
  title: "Oracle Cloud ERP Consulting for Enterprise Finance & Operations",
  description:
    "Mirketa helps enterprises implement, migrate, and optimize Oracle Cloud ERP — Financials, Procurement, Projects, and Supply Chain — with a delivery model built around faster close cycles, cleaner data, and measurable ROI.",
  primaryCta: { label: "Schedule Consultation", href: "#contact" },
  secondaryCta: { label: "Talk to Oracle Expert", href: "#contact" },
  metrics: ["150+ Oracle ERP Engagements", "Certified ERP Consultants", "Global Delivery Model", "Post Go-Live Support Included"],
};

const HERO_DASHBOARD = {
  title: "ERP Operations Dashboard",
  stats: [
    { label: "CLOSE CYCLE", value: "4 Days", caption: "Down from a 14-day close" },
    { label: "PROCUREMENT COST", value: "27%", caption: "Lower spend, multi-entity" },
    { label: "CUSTOMER SATISFACTION", value: "97%", caption: "Across enterprise engagements" },
  ],
  rows: [
    { title: "Intercompany eliminations — 9 entities", meta: "Automated across global instance", tone: "good", status: "Complete" },
    { title: "Supplier PO — approval pending", meta: "Within policy threshold, auto-clearing", tone: "neutral", status: "In Review" },
    { title: "AP reconciliation exception", meta: "Flagged before month-end close", tone: "attention", status: "Action Needed" },
  ],
  floatingCards: [
    { icon: Ico.dollar, title: "$3.1M Annual ROI", subtitle: "Global distributor case study" },
    { icon: Ico.shield, title: "Audit-Ready Controls", subtitle: "Built into every transaction" },
  ],
};

const SERVICES = {
  eyebrow: "Oracle ERP Consulting Services",
  heading: "Consulting Built Around Your Financial and Operational Reality",
  intro: "Every engagement starts with how your business actually closes books and moves goods — not a generic module checklist.",
  items: [
    { icon: Ico.compass, title: "ERP Strategy & Roadmap", description: "A prioritized roadmap tying every ERP decision to a measurable finance or ops outcome." },
    { icon: Ico.chartUp, title: "Implementation & Configuration", description: "Core ledgers, business units, and approval workflows configured to your chart of accounts." },
    { icon: Ico.network, title: "Data Migration", description: "Legacy financial and operational data migrated, deduplicated, and reconciled before go-live." },
    { icon: Ico.plug, title: "Integration Services", description: "ERP connected to the banking, CRM, and supply chain systems your teams already run." },
    { icon: Ico.headset, title: "Managed Support & Optimization", description: "Ongoing tuning and support that keeps your ERP environment healthy long after launch." },
    { icon: Ico.users, title: "Change Management", description: "Role-based training and adoption planning so finance and ops teams are productive on day one." },
  ],
};

const MODULES = {
  eyebrow: "Oracle ERP Modules",
  heading: "Full-Scope Coverage Across Every ERP Module",
  intro: "We implement and configure every Oracle ERP module to work together as one connected system, not eight disconnected ones.",
  items: [
    { icon: Ico.dollar, title: "Financial Management", description: "General ledger, payables, and receivables on a single connected ledger." },
    { icon: Ico.cart, title: "Procurement", description: "Sourcing and supplier management with built-in spend control." },
    { icon: Ico.compass, title: "Project Management", description: "Project costing, billing, and resource management in real time." },
    { icon: Ico.shield, title: "Risk Management", description: "Automated controls and audit trails built into every transaction." },
    { icon: Ico.network, title: "Supply Chain", description: "Planning and logistics synchronized against real demand signals." },
    { icon: Ico.box, title: "Inventory", description: "Real-time inventory visibility shared across every business unit." },
    { icon: Ico.factory, title: "Manufacturing", description: "Work orders, quality, and cost management on the shop floor." },
    { icon: Ico.chartUp, title: "Reporting & Analytics", description: "Real-time dashboards built on your own financial and operational data." },
  ],
};

const BENEFITS = {
  eyebrow: "Business Benefits",
  heading: "What a Properly Configured Oracle ERP Delivers",
  intro: "These are the outcomes our finance and operations clients report after their Oracle ERP engagement.",
  items: [
    { title: "Faster Financial Close", description: "Automated reconciliations cut close cycles from weeks to days." },
    { title: "Real-Time Visibility", description: "One connected system instead of reconciling spreadsheets across departments." },
    { title: "Reduced Operational Costs", description: "Manual processes replaced with configured workflows and approvals." },
    { title: "Improved Compliance", description: "Built-in controls and audit trails aligned to your regulatory requirements." },
    { title: "Scalable Growth", description: "A platform that supports new entities and business units without re-platforming." },
    { title: "Better Decision-Making", description: "Leadership works from one trusted number instead of three conflicting reports." },
  ],
};

const PROCESS = {
  eyebrow: "Oracle ERP Implementation Process",
  heading: "A Structured Path From Discovery to Ongoing Support",
  intro: "No surprises, no scope creep. Our ERP delivery methodology has been refined across hundreds of enterprise implementations.",
  stages: [
    { name: "Discovery", description: "Mapping your current financial, procurement, and supply chain processes." },
    { name: "Planning", description: "Scope, timeline, and resourcing agreed before a single screen is configured." },
    { name: "Solution Design", description: "Data model, security, and integration architecture documented in full." },
    { name: "Configuration", description: "Core ERP setup — ledgers, business units, approval workflows." },
    { name: "Testing", description: "UAT, regression, and security testing completed before go-live." },
    { name: "Deployment", description: "Structured cutover with a dedicated go-live command center." },
    { name: "Support", description: "Hypercare and ongoing optimization after launch." },
  ],
};

const AI_ERP = {
  eyebrow: "AI-Powered ERP",
  heading: "AI That Works Inside Your Financial Processes",
  intro: "Embedded AI becomes valuable only when it's tuned against your own transaction history — not a generic model.",
  illo: Images.illoAiCopilotOracle,
  items: [
    { icon: Ico.chartUp, title: "Predictive Analytics", description: "Cash flow and demand risk surfaced before they become problems." },
    { icon: Ico.bolt, title: "Intelligent Automation", description: "Manual reconciliation and data-entry steps removed from daily workflows." },
    { icon: Ico.document, title: "AI Reporting", description: "Financial narratives drafted automatically from your own close data." },
    { icon: Ico.check, title: "Approval Automation", description: "Low-risk transactions cleared automatically within policy thresholds." },
    { icon: Ico.eye, title: "Financial Insights", description: "Anomalies and trends surfaced directly on the record, not buried in reports." },
    { icon: Ico.robot, title: "AI Copilot", description: "A conversational assistant that answers finance questions in context." },
    { icon: Ico.sparkle, title: "Smart Forecasting", description: "Forecasts adjusted continuously against real transaction data." },
  ],
};

const INTEGRATIONS = {
  eyebrow: "ERP Integration Services",
  heading: "Oracle ERP Connected to the Systems You Already Run",
  intro: "ERP data is only as useful as the systems it reaches. We connect it to the platforms your teams rely on every day.",
  illo: Images.illoIntegrationHubOracle,
  items: [
    { icon: Ico.cloud, title: "Salesforce" },
    { icon: Ico.chartUp, title: "Oracle EPM" },
    { icon: Ico.users, title: "Oracle HCM" },
    { icon: Ico.network, title: "Oracle SCM" },
    { icon: Ico.plug, title: "MuleSoft" },
    { icon: Ico.bank, title: "Banking Systems" },
    { icon: Ico.api, title: "REST APIs" },
    { icon: Ico.globe, title: "Third-Party Applications" },
  ],
};

const WHY_MIRKETA = {
  eyebrow: "Why Choose Mirketa",
  heading: "An Oracle ERP Partner That Owns the Outcome",
  intro: "Hundreds of partners can activate ERP modules. Fewer can tie every decision back to a measurable financial outcome.",
  items: [
    { icon: Ico.award, title: "Certified Oracle ERP Consultants", description: "Every consultant holds active Oracle ERP Cloud certifications." },
    { icon: Ico.document, title: "Proven Delivery Framework", description: "A structured, sprint-based methodology refined across hundreds of engagements." },
    { icon: Ico.compass, title: "Industry Expertise", description: "Delivery teams with real finance and operations domain context." },
    { icon: Ico.robot, title: "AI Accelerators", description: "Pre-built frameworks that cut implementation time without cutting quality." },
    { icon: Ico.globe, title: "Global Delivery", description: "Follow-the-sun coverage for multi-region enterprise rollouts." },
    { icon: Ico.headset, title: "Continuous Support", description: "A dedicated team keeping your ERP environment healthy after go-live." },
  ],
};

const METRICS = {
  eyebrow: "Customer Success",
  heading: "What Our Oracle ERP Clients Have Achieved",
  intro: "These are the outcomes our enterprise clients report after their Oracle Cloud ERP engagement.",
  stats: [
    { value: "150+", label: "ERP Projects" },
    { value: "80+", label: "Certified Experts" },
    { value: "120+", label: "Enterprise Clients" },
    { value: "16", label: "Countries Served" },
    { value: "97%", label: "Customer Satisfaction" },
  ],
};

const CASE_STUDY = {
  eyebrow: "Case Study",
  heading: "Global Distributor Cuts Financial Close From 14 Days to 4",
  industry: "Wholesale Distribution • Multi-Entity, 9 Countries",
  challenge: "A global distributor was closing financials manually across nine regional entities, with no shared visibility into cash position or supplier commitments until weeks after month-end.",
  solution: "Implementation: Mirketa implemented Oracle Cloud ERP across Financials, Procurement, and Supply Chain, standardizing the chart of accounts and automating intercompany eliminations across all nine entities.",
  outcome: "The client now closes financials in four days from a single Oracle ERP instance, with leadership working from one trusted number instead of nine regional spreadsheets.",
  metrics: [
    { value: "14 → 4", label: "Days to Close" },
    { value: "9 → 1", label: "Entities Consolidated" },
    { value: "27%", label: "Lower Procurement Costs" },
    { value: "$3.1M", label: "Annual ROI" },
  ],
};

const FAQS = [
  { q: "What is Oracle Cloud ERP Consulting?", a: "Oracle Cloud ERP Consulting is the process of implementing, migrating, and optimizing Oracle's Fusion Cloud ERP suite — Financials, Procurement, Projects, and Supply Chain — configured to your organization's chart of accounts, approval hierarchy, and reporting requirements." },
  { q: "How long does an Oracle ERP implementation take?", a: "A focused single-entity implementation typically takes 3–5 months. Multi-entity deployments spanning Financials, Procurement, and Supply Chain can take 9–14 months depending on scope and the number of legacy systems being consolidated." },
  { q: "Can you migrate us from a legacy ERP or spreadsheets?", a: "Yes. We migrate financial, procurement, and supply chain data from legacy ERPs and spreadsheets, including deduplication and reconciliation, so you start on Oracle ERP with a trustworthy foundation." },
  { q: "What Oracle ERP modules do you implement?", a: "We implement Financial Management, Procurement, Project Management, Risk Management, Supply Chain, Inventory, Manufacturing, and Reporting & Analytics, configured to work together as one connected system." },
  { q: "How does Oracle ERP integrate with other systems?", a: "We integrate Oracle ERP with Salesforce, Oracle EPM, Oracle HCM, Oracle SCM, and banking systems using MuleSoft and REST APIs, so financial and operational data flows without manual re-entry." },
  { q: "What AI capabilities does Oracle ERP include?", a: "Oracle ERP includes embedded AI for predictive analytics, intelligent automation, and approval automation. We configure these against your own transaction history so recommendations reflect how your business actually operates." },
  { q: "Do you provide support after go-live?", a: "Yes. Every implementation includes a structured hypercare period immediately after go-live. Clients can transition into an ongoing managed services retainer for continued optimization." },
  { q: "Are you a certified Oracle ERP implementation partner?", a: "Yes. Mirketa's consultants hold active Oracle ERP Cloud certifications, backed by a verified delivery track record across enterprise finance and operations engagements." },
  { q: "Can Oracle ERP support multi-entity, multi-country deployments?", a: "Yes. Oracle ERP is built for multi-entity operations with localized tax and statutory reporting across 190+ countries. We've delivered rollouts spanning up to 9 countries within a single global instance." },
];

const FINAL_CTA = {
  heading: "Transform Your Business with Oracle Cloud ERP",
  description: "Partner with Mirketa's certified Oracle ERP consultants to implement, migrate, and optimize your financial and operational systems — or speak with an Oracle expert before you commit to a roadmap.",
  primaryCta: { label: "Schedule Consultation", href: "#contact" },
  secondaryCta: { label: "Talk to Oracle Expert", href: "#contact" },
};

const SEO = {
  title: "Oracle Cloud ERP Consulting | Mirketa",
  description:
    "Mirketa's certified Oracle ERP consultants deliver Fusion Cloud ERP implementation, migration, and AI-powered automation across Financials, Procurement, Projects, and Supply Chain.",
  canonical: "https://mirketa.us/oracle-cloud-erp-consulting/",
  keywords: [
    "Oracle Cloud ERP Consulting",
    "Oracle ERP Implementation",
    "Oracle Financials Cloud",
    "Oracle Procurement Cloud",
    "Oracle ERP Migration",
    "Oracle ERP Integration",
    "Oracle ERP AI Automation",
    "Enterprise ERP Consulting",
    "Oracle ERP Partner",
    "Oracle Fusion ERP",
  ],
  schema: [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "Oracle Cloud ERP Consulting and Implementation Services",
      provider: { "@type": "Organization", name: "Mirketa Inc.", url: "https://mirketa.us" },
      name: "Oracle Cloud ERP Consulting",
      description:
        "End-to-end Oracle Cloud ERP consulting, implementation, migration, integration, and AI-powered automation across Financials, Procurement, Projects, and Supply Chain.",
      areaServed: "Global",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://mirketa.us/" },
        { "@type": "ListItem", position: 2, name: "Oracle Fusion Applications Implementation", item: "https://mirketa.us/oracle-fusion-applications-implementation/" },
        { "@type": "ListItem", position: 3, name: "Oracle Cloud ERP Consulting", item: "https://mirketa.us/oracle-cloud-erp-consulting/" },
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

export default function ErpConsulting() {
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

      gsap.utils.toArray(".oec-reveal").forEach((el) => {
        gsap.from(el, {
          opacity: prefersReduced ? 1 : 0,
          y: prefersReduced ? 0 : 32,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      gsap.utils.toArray(".oec-reveal-left").forEach((el) => {
        gsap.from(el, {
          opacity: prefersReduced ? 1 : 0,
          x: prefersReduced ? 0 : -30,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      gsap.utils.toArray(".oec-reveal-right").forEach((el) => {
        gsap.from(el, {
          opacity: prefersReduced ? 1 : 0,
          x: prefersReduced ? 0 : 30,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      gsap.utils.toArray(".oec-reveal-stagger").forEach((el) => {
        gsap.from(el.children, {
          opacity: prefersReduced ? 1 : 0,
          y: prefersReduced ? 0 : 26,
          duration: 0.6,
          stagger: 0.06,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      gsap.utils.toArray(".oec-zoom-in").forEach((el) => {
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
    <div className="oracle-erp-consulting">
      <Seo {...SEO} />
      <HeroSection heroTextRef={heroTextRef} heroRef={heroRef} />
      <TrustedBySection />

      <section className="oec-l3-layout" aria-label="Oracle ERP Consulting details">
        <div className="container oec-l3-layout__grid">
          <L3SideNav eyebrow="Oracle Fusion Applications" items={L3_ITEMS} activeHref={location.pathname} ariaLabel="Oracle Fusion Applications Implementation sub-pages" />
          <div className="oec-l3-layout__content">
            <ServicesSection />
            <ModulesSection />
            <BenefitsSection />
            <ProcessSection />
            <AiErpSection />
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
        heading="Schedule a Free Oracle ERP Consultation"
        description="Tell us about your current financial and operational systems, your close-cycle pain points, and your modernization goals — a certified Oracle ERP expert will follow up within one business day."
        formTitle="Schedule a Free Oracle ERP Consultation"
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
    <div className={`oec-sticky-cta ${visible ? "is-visible" : ""}`} aria-hidden={!visible}>
      <a href="#contact" className="btn btn-primary oec-btn" tabIndex={visible ? 0 : -1}>
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
    <section ref={heroRef} className="oec-hero" style={{ backgroundImage: `url("${Images.heroOracleErpConsulting}")` }} aria-label="Oracle Cloud ERP Consulting by Mirketa">
      <div className="oec-hero__scrim" />
      <div className="container">
        <Breadcrumb items={BREADCRUMB} className="oec-breadcrumb" />
        <div className="oec-hero__inner">
          <div ref={heroTextRef} className="oec-hero__text">
            <span className="oec-badge">
              <span className="oec-badge__spark" aria-hidden="true">✦</span> {HERO.badge}
            </span>
            <h1>{HERO.title}</h1>
            <p className="oec-hero__description">{HERO.description}</p>
            <div className="oec-hero__ctas">
              <a href={HERO.primaryCta.href} className="btn btn-primary oec-btn">
                {HERO.primaryCta.label} <span aria-hidden="true">→</span>
              </a>
              <a href={HERO.secondaryCta.href} className="btn btn-secondary oec-btn">
                {HERO.secondaryCta.label}
              </a>
            </div>
            <ul className="oec-hero__metrics">
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
            className="oec-hero__visual oec-zoom-in"
          />
        </div>
      </div>
    </section>
  );
}

// ============================================================
// TRUSTED BY ENTERPRISES
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
    <section className="oec-trusted" aria-label="Trusted by enterprises">
      <div className="container oec-trusted__inner">
        <p className="oec-trusted__label">Trusted by Enterprises</p>
        <div className="oec-trusted__track" role="list">
          <div className="oec-trusted__marquee">
            {loop.map((b, i) => (
              <div className="oec-trusted__badge" role="listitem" key={`${b.label}-${i}`}>
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
// ORACLE ERP CONSULTING SERVICES — divided row list
// ============================================================

function ServicesSection() {
  return (
    <section className="oec-services" id="services" aria-labelledby="oec-services-heading">
      <p className="oec-eyebrow">{SERVICES.eyebrow}</p>
      <h2 id="oec-services-heading">{SERVICES.heading}</h2>
      <p className="oec-section-intro">{SERVICES.intro}</p>
      <div className="oec-services__list oec-reveal-stagger">
        {SERVICES.items.map((s) => (
          <div className="oec-service-row" key={s.title}>
            <span className="oec-service-row__icon">{s.icon}</span>
            <div>
              <h3>{s.title}</h3>
              <p>{s.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ============================================================
// ORACLE ERP MODULES — 2-col card grid
// ============================================================

function ModulesSection() {
  return (
    <section className="oec-modules" aria-labelledby="oec-modules-heading">
      <p className="oec-eyebrow">{MODULES.eyebrow}</p>
      <h2 id="oec-modules-heading">{MODULES.heading}</h2>
      <p className="oec-section-intro">{MODULES.intro}</p>
      <div className="oec-modules__grid oec-reveal-stagger">
        {MODULES.items.map((m) => (
          <div className="oec-module-card" key={m.title}>
            <span className="oec-module-card__icon">{m.icon}</span>
            <h3>{m.title}</h3>
            <p>{m.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ============================================================
// BUSINESS BENEFITS — single-column checklist
// ============================================================

function BenefitsSection() {
  return (
    <section className="oec-benefits" aria-labelledby="oec-benefits-heading">
      <p className="oec-eyebrow">{BENEFITS.eyebrow}</p>
      <h2 id="oec-benefits-heading">{BENEFITS.heading}</h2>
      <p className="oec-section-intro">{BENEFITS.intro}</p>
      <div className="oec-benefits__list oec-reveal-stagger">
        {BENEFITS.items.map((b) => (
          <div className="oec-benefit-item" key={b.title}>
            <span aria-hidden="true">{Ico.check}</span>
            <div>
              <h3>{b.title}</h3>
              <p>{b.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ============================================================
// ORACLE ERP IMPLEMENTATION PROCESS — vertical connected stepper
// ============================================================

function ProcessSection() {
  return (
    <section className="oec-process" aria-labelledby="oec-process-heading">
      <p className="oec-eyebrow">{PROCESS.eyebrow}</p>
      <h2 id="oec-process-heading">{PROCESS.heading}</h2>
      <p className="oec-section-intro">{PROCESS.intro}</p>
      <div className="oec-process__stepper oec-reveal-stagger">
        {PROCESS.stages.map((s, i) => (
          <div className="oec-process__stage" key={s.name}>
            <div className="oec-process__marker">
              <span className="oec-process__num">{i + 1}</span>
              {i < PROCESS.stages.length - 1 && <span className="oec-process__connector" aria-hidden="true" />}
            </div>
            <div className="oec-process__body">
              <h3>{s.name}</h3>
              <p>{s.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ============================================================
// AI-POWERED ERP — compact 2-col grid with illustration banner
// ============================================================

function AiErpSection() {
  return (
    <section className="oec-ai" aria-labelledby="oec-ai-heading">
      <div className="oec-ai__banner oec-zoom-in">
        <img src={AI_ERP.illo} alt="" aria-hidden="true" loading="lazy" />
      </div>
      <p className="oec-eyebrow">{AI_ERP.eyebrow}</p>
      <h2 id="oec-ai-heading">{AI_ERP.heading}</h2>
      <p className="oec-section-intro">{AI_ERP.intro}</p>
      <div className="oec-ai__grid oec-reveal-stagger">
        {AI_ERP.items.map((a) => (
          <div className="oec-ai-card" key={a.title}>
            <span className="oec-ai-card__icon">{a.icon}</span>
            <h3>{a.title}</h3>
            <p>{a.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ============================================================
// ERP INTEGRATION SERVICES — icon chip grid
// ============================================================

function IntegrationsSection() {
  return (
    <section className="oec-integrations" aria-labelledby="oec-integrations-heading">
      <p className="oec-eyebrow">{INTEGRATIONS.eyebrow}</p>
      <h2 id="oec-integrations-heading">{INTEGRATIONS.heading}</h2>
      <p className="oec-section-intro">{INTEGRATIONS.intro}</p>
      <div className="oec-integrations__grid oec-reveal-stagger">
        {INTEGRATIONS.items.map((i) => (
          <div className="oec-integration-chip" key={i.title}>
            <span>{i.icon}</span>
            <h3>{i.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}

// ============================================================
// WHY CHOOSE MIRKETA — 2-col premium cards
// ============================================================

function WhyMirketaSection() {
  return (
    <section className="oec-why" aria-labelledby="oec-why-heading">
      <p className="oec-eyebrow">{WHY_MIRKETA.eyebrow}</p>
      <h2 id="oec-why-heading">{WHY_MIRKETA.heading}</h2>
      <p className="oec-section-intro">{WHY_MIRKETA.intro}</p>
      <div className="oec-why__grid oec-reveal-stagger">
        {WHY_MIRKETA.items.map((w) => (
          <div className="oec-why-card" key={w.title}>
            <span className="oec-why-card__icon">{w.icon}</span>
            <h3>{w.title}</h3>
            <p>{w.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ============================================================
// CUSTOMER SUCCESS — inset dark stat card
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
    <div className="oec-metric-stat" ref={ref}>
      <strong>{display}</strong>
      <span>{label}</span>
    </div>
  );
}

function MetricsSection() {
  return (
    <section className="oec-metrics" aria-labelledby="oec-metrics-heading">
      <div className="oec-metrics__card oec-reveal">
        <p className="oec-eyebrow">{METRICS.eyebrow}</p>
        <h2 id="oec-metrics-heading">{METRICS.heading}</h2>
        <p className="oec-section-intro">{METRICS.intro}</p>
        <div className="oec-metrics__grid oec-reveal-stagger">
          {METRICS.stats.map((s) => (
            <AnimatedCounter key={s.label} value={s.value} label={s.label} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// CASE STUDY — full-width horizontal three-block layout
// ============================================================

function CaseStudySection() {
  return (
    <section className="section oec-case" aria-labelledby="oec-case-heading">
      <div className="container">
        <div className="section-heading oec-reveal">
          <p className="oec-eyebrow">{CASE_STUDY.eyebrow}</p>
          <h2 id="oec-case-heading">{CASE_STUDY.heading}</h2>
          <p className="oec-case__industry">{CASE_STUDY.industry}</p>
        </div>
        <div className="oec-case__blocks oec-reveal-stagger">
          <div className="oec-case__block">
            <p className="oec-case__block-label">Client Challenge</p>
            <p>{CASE_STUDY.challenge}</p>
          </div>
          <div className="oec-case__block">
            <p className="oec-case__block-label">ERP Solution & Implementation</p>
            <p>{CASE_STUDY.solution}</p>
          </div>
          <div className="oec-case__block">
            <p className="oec-case__block-label">Business Outcome</p>
            <p>{CASE_STUDY.outcome}</p>
          </div>
        </div>
        <div className="oec-case__roi oec-reveal-stagger">
          <p className="oec-case__roi-label">ROI Metrics</p>
          <div className="oec-case__roi-grid">
            {CASE_STUDY.metrics.map((m) => (
              <div key={m.label}>
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
    <section className="section oec-faq" aria-labelledby="oec-faq-heading">
      <div className="container">
        <div className="section-heading oec-reveal">
          <p className="oec-eyebrow">FAQ</p>
          <h2 id="oec-faq-heading">Frequently Asked Questions About Oracle Cloud ERP Consulting</h2>
        </div>
        <div className="oec-faq__search-wrap oec-reveal">
          <label htmlFor="oec-faq-search" className="visually-hidden">
            Search frequently asked questions
          </label>
          <input
            id="oec-faq-search"
            type="search"
            className="oec-faq__search"
            placeholder="Ask a question — e.g. &quot;migration&quot;, &quot;integrations&quot;, &quot;AI&quot;..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpenIndex(-1);
            }}
          />
        </div>
        <div className="oec-faq__list oec-reveal">
          {filtered.length === 0 ? (
            <p className="oec-faq__empty">No questions match &ldquo;{query}&rdquo;. Try a different search term.</p>
          ) : (
            filtered.map((item, i) => {
              const open = openIndex === i;
              const panelId = `oec-faq-panel-${i}`;
              return (
                <div className={`oec-faq-item ${open ? "is-open" : ""}`} key={item.q}>
                  <button type="button" className="oec-faq-item__question" aria-expanded={open} aria-controls={panelId} onClick={() => setOpenIndex(open ? -1 : i)}>
                    <span>{item.q}</span>
                    <span className="oec-faq-item__icon" aria-hidden="true">{open ? "−" : "+"}</span>
                  </button>
                  <div id={panelId} className="oec-faq-item__answer" role="region" hidden={!open}>
                    <p>{item.a}</p>
                  </div>
                </div>
              );
            })
          )}
        </div>
        <p className="oec-faq__links">
          Related reading: <Link to="/platforms/oracle/fusion-implementation">Oracle Fusion Applications Implementation</Link>,{" "}
          <Link to="/platforms/salesforce/development-consulting">Salesforce Development & Consulting</Link>,{" "}
          <Link to="/data-cloud">Data Cloud</Link>, <Link to="/ai-consulting">AI Consulting</Link>,{" "}
          <a href="#services">Implementation Services</a>.
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
    <section className="oec-final-cta oec-reveal" aria-labelledby="oec-final-cta-heading">
      <div className="container oec-final-cta__inner">
        <h2 id="oec-final-cta-heading">{FINAL_CTA.heading}</h2>
        <p>{FINAL_CTA.description}</p>
        <div className="oec-final-cta__ctas">
          <a href={FINAL_CTA.primaryCta.href} className="btn btn-primary oec-btn">
            {FINAL_CTA.primaryCta.label} <span aria-hidden="true">→</span>
          </a>
          <a href={FINAL_CTA.secondaryCta.href} className="btn btn-secondary oec-btn">
            {FINAL_CTA.secondaryCta.label}
          </a>
        </div>
      </div>
    </section>
  );
}
