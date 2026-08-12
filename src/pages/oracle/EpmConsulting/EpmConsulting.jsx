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
import "./EpmConsulting.css";

gsap.registerPlugin(ScrollTrigger);

// ============================================================
// ICONS
// ============================================================

const Ico = {
  check: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12.5l5 5L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  cross: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 4v16M4 12h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
  ),
  target: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.4" /><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.3" opacity="0.6" /><circle cx="12" cy="12" r="1.2" fill="currentColor" /></svg>
  ),
  network: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="6" r="2.4" stroke="currentColor" strokeWidth="1.4" /><circle cx="6" cy="18" r="2.4" stroke="currentColor" strokeWidth="1.4" /><circle cx="18" cy="18" r="2.4" stroke="currentColor" strokeWidth="1.4" /><path d="M12 8.4L7 16M12 8.4l5 7.6M8.4 18h7.2" stroke="currentColor" strokeWidth="1.3" /></svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  chartUp: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 19V13M10 19V8M16 19v-5M20 19V5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
  ),
  document: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 3h9l3 3v15H6z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M9 10h6M9 14h6M9 18h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
  ),
  eye: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.4" /></svg>
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
  globe: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.4" /><path d="M3 12h18M12 3c2.5 2.5 3.5 6 3.5 9s-1 6.5-3.5 9c-2.5-2.5-3.5-6-3.5-9s1-6.5 3.5-9z" stroke="currentColor" strokeWidth="1.3" /></svg>
  ),
  robot: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="5" y="9" width="14" height="10" rx="3" stroke="currentColor" strokeWidth="1.5" /><path d="M12 5v4M9 14h.01M15 14h.01" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /><circle cx="12" cy="4" r="1.4" fill="currentColor" /></svg>
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
  chip: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="7" y="7" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.4" /><path d="M9 3v4M15 3v4M9 21v-4M15 21v-4M3 9h4M3 15h4M21 9h-4M21 15h-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
  ),
  quote: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 9c-2 0-3.5 1.6-3.5 3.6 0 2 1.5 3.4 3.3 3.4.3 2.4-1.2 3.9-3.3 4.4v1.3c3.4-.4 5.7-2.8 5.7-6.3V9H7zm10 0c-2 0-3.5 1.6-3.5 3.6 0 2 1.5 3.4 3.3 3.4.3 2.4-1.2 3.9-3.3 4.4v1.3c3.4-.4 5.7-2.8 5.7-6.3V9H17z" fill="currentColor" /></svg>
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
  { label: "EPM Consulting Development Services" },
];

const HERO = {
  badge: "Oracle Certified EPM Implementation Partner",
  title: "Oracle EPM Consulting Services for a Faster, Sharper Finance Function",
  description:
    "Mirketa helps finance leaders implement and optimize Oracle Enterprise Performance Management — planning, consolidation, reconciliation, and reporting — so budgets, forecasts, and board decks run on one trusted number.",
  primaryCta: { label: "Schedule a Consultation", href: "#contact" },
  secondaryCta: { label: "Talk to an Oracle EPM Expert", href: "#contact" },
  metrics: ["80+ Oracle EPM Engagements", "Certified EPM Consultants", "Global Delivery Model", "Post Go-Live Support Included"],
};

const HERO_DASHBOARD = {
  title: "Finance Close Control Center",
  stats: [
    { label: "CLOSE CYCLE", value: "5 Days", caption: "Down from a 12-day close" },
    { label: "FORECAST ACCURACY", value: "94%", caption: "Driver-based planning models" },
    { label: "REPORTING SPEED", value: "3.4x", caption: "Faster board-ready reports" },
  ],
  rows: [
    { title: "Q3 consolidation — EMEA entities", meta: "Intercompany eliminations automated", tone: "good", status: "Complete" },
    { title: "Reconciliation exception — AP subledger", meta: "Flagged before month-end close", tone: "attention", status: "Review" },
    { title: "Board deck — Q3 narrative report", meta: "Generated directly from consolidated data", tone: "good", status: "Ready" },
  ],
  floatingCards: [
    { icon: Ico.chartUp, title: "42% Faster Close", subtitle: "Automated consolidation" },
    { icon: Ico.shield, title: "Audit-Ready Trails", subtitle: "Every reconciliation logged" },
  ],
};

const WHY_EPM = {
  eyebrow: "Why Oracle EPM",
  heading: "The Gap Between Spreadsheet Finance and Oracle EPM",
  intro: "Most finance teams don't lack effort — they lack a connected system. Here's what changes when planning, close, and reporting run on one platform.",
  without: {
    title: "Without Oracle EPM",
    points: [
      "Budgets built and rebuilt across disconnected spreadsheets",
      "Consolidation is a manual, error-prone month-end scramble",
      "Reconciliation exceptions surface weeks after close",
      "Board reporting takes days of manual assembly",
    ],
  },
  with: {
    title: "With Oracle EPM",
    points: [
      "Driver-based planning connected to real financial data",
      "Multi-entity consolidation automated end-to-end",
      "Reconciliation exceptions flagged before they become findings",
      "Board-ready narrative reports generated in hours",
    ],
  },
};

const SERVICES = {
  eyebrow: "Oracle EPM Consulting Services",
  heading: "Services Built Around How Finance Actually Closes and Plans",
  intro: "Expand a service to see how we scope it — every engagement starts with your close calendar and planning cycle, not a generic checklist.",
  items: [
    { title: "Oracle EPM Consulting", description: "A prioritized roadmap tying every EPM decision to a measurable planning or close outcome." },
    { title: "Oracle EPM Implementation", description: "Planning, consolidation, and reporting modules configured to your entity structure and close calendar." },
    { title: "Oracle EPM Migration & Upgrade", description: "Legacy planning tools and spreadsheet models migrated onto a governed EPM foundation." },
    { title: "Oracle EPM Integration", description: "EPM connected to ERP, HCM, and data warehouse systems your finance team already relies on." },
    { title: "Oracle EPM Customization", description: "Business rules, allocation models, and reporting templates tailored to your finance policies." },
    { title: "Managed Services & Support", description: "A dedicated team keeping your EPM environment healthy through every close cycle." },
  ],
};

const PILLARS = [
  {
    id: "planning",
    icon: Ico.target,
    title: "Planning & Budgeting",
    description: "Driver-based planning models replace static spreadsheets, so budgets stay connected to the assumptions that actually drive them.",
    capabilities: ["Driver-Based Planning", "Rolling Forecasts", "Scenario Modeling"],
  },
  {
    id: "consolidation",
    icon: Ico.network,
    title: "Financial Consolidation",
    description: "Multi-entity consolidation with automated intercompany eliminations and currency translation, built for organizations that close across borders.",
    capabilities: ["Intercompany Eliminations", "Currency Translation", "Multi-GAAP Reporting"],
  },
  {
    id: "reconciliation",
    icon: Ico.shield,
    title: "Account Reconciliation",
    description: "Automated matching and exception workflows surface reconciliation risk before it becomes an audit finding.",
    capabilities: ["Automated Matching", "Exception Workflows", "Audit-Ready Trails"],
  },
  {
    id: "profitability",
    icon: Ico.chartUp,
    title: "Profitability & Cost Management",
    description: "Allocation models that trace cost and margin back to the products, customers, and channels actually driving performance.",
    capabilities: ["Allocation Modeling", "Margin Analysis", "Cost Driver Insights"],
  },
  {
    id: "narrative",
    icon: Ico.document,
    title: "Narrative Reporting",
    description: "Board decks and regulatory filings authored collaboratively, pulling numbers directly from consolidated financial data.",
    capabilities: ["Collaborative Authoring", "Regulatory Filings", "Board-Ready Decks"],
  },
  {
    id: "analytics",
    icon: Ico.eye,
    title: "Enterprise Performance Analytics",
    description: "Real-time KPI dashboards give finance and operations leaders drill-down visibility the moment performance shifts.",
    capabilities: ["Real-Time Dashboards", "Drill-Down Analysis", "Predictive Signals"],
    kpis: [
      { value: "6 Days", label: "Faster Close" },
      { value: "94%", label: "Forecast Accuracy" },
      { value: "3.1x", label: "Reporting Speed" },
    ],
  },
];

const BENEFITS = {
  eyebrow: "Business Benefits",
  heading: "What a Properly Configured Oracle EPM Delivers",
  intro: "These are the outcomes our finance clients report after their Oracle EPM engagement.",
  items: [
    { metric: "42%", title: "Faster Financial Close", description: "Automated consolidation and reconciliation remove manual bottlenecks from every close cycle." },
    { metric: "3.4x", title: "Reporting Speed", description: "Narrative reports generated directly from live, consolidated financial data." },
    { metric: "31%", title: "Fewer Manual Adjustments", description: "Driver-based models reduce the spreadsheet rework that follows every forecast cycle." },
    { metric: null, title: "Real-Time Executive Visibility", description: "CFOs and finance leaders see performance shift the moment it happens, not at month-end." },
  ],
};

const IMPLEMENTATION = {
  eyebrow: "Oracle EPM Implementation Approach",
  heading: "A Phased Path From Assessment to Continuous Optimization",
  intro: "No surprises, no scope creep. Our EPM delivery approach has been refined across enterprise finance transformations.",
  stages: [
    { name: "Assess", description: "Mapping your current planning, close, and reporting processes." },
    { name: "Design", description: "Data model, security, and integration architecture documented." },
    { name: "Configure", description: "Core EPM setup — hierarchies, rules, and workflows." },
    { name: "Integrate", description: "Connecting EPM to ERP, HCM, and data warehouse systems." },
    { name: "Validate", description: "UAT and parallel testing against your existing close process." },
    { name: "Deploy", description: "Structured cutover aligned to your close calendar." },
    { name: "Optimize", description: "Ongoing tuning after the first live close cycle." },
  ],
};

const INDUSTRIES = {
  eyebrow: "Industries Served",
  heading: "Oracle EPM Experience Across Complex Finance Organizations",
  intro: "Every industry brings its own consolidation and compliance constraints — our teams bring specific domain context to each one.",
  items: [
    { icon: Ico.bank, title: "Financial Services", stat: "Faster regulatory close cycles" },
    { icon: Ico.factory, title: "Manufacturing", stat: "Margin visibility by product line" },
    { icon: Ico.cart, title: "Retail & Consumer Goods", stat: "Rolling forecasts tied to demand" },
    { icon: Ico.shield, title: "Healthcare", stat: "Consolidated reporting across entities" },
    { icon: Ico.chip, title: "Technology", stat: "SaaS metrics tied to financial plans" },
    { icon: Ico.globe, title: "Public Sector", stat: "Budget-to-actual transparency" },
  ],
};

const WHY_MIRKETA = {
  eyebrow: "Why Choose Mirketa",
  heading: "An Oracle EPM Partner That Understands Finance, Not Just Software",
  intro: "Hundreds of partners can activate EPM modules. Fewer can tie every decision back to a measurable finance outcome.",
  items: [
    { icon: Ico.award, title: "Certified Oracle EPM Consultants", description: "Every consultant holds active Oracle EPM Cloud certifications." },
    { icon: Ico.compass, title: "Finance Transformation Expertise", description: "Delivery teams who understand close calendars, not just configuration screens." },
    { icon: Ico.robot, title: "AI-Ready Delivery Framework", description: "Implementations built to take advantage of Oracle's embedded planning AI from day one." },
    { icon: Ico.globe, title: "Global Support Coverage", description: "Follow-the-sun coverage for multi-region close and reporting cycles." },
  ],
};

const TESTIMONIALS = {
  eyebrow: "Customer Success Stories",
  heading: "What Finance Leaders Say About Their Oracle EPM Results",
  intro: "Real feedback from finance teams after their Oracle EPM engagement with Mirketa.",
  items: [
    { quote: "Our close used to take twelve days and three conflicting spreadsheets. Now it's five days and one number everyone trusts.", name: "Renata Cole", role: "VP of Finance, multi-entity manufacturer", metric: "12 → 5 days to close" },
    { quote: "The board deck used to take my team a full week to assemble. Now it's generated directly from consolidated data in hours.", name: "Marcus Deng", role: "Corporate Controller, financial services", metric: "Board deck in hours, not days" },
    { quote: "Mirketa understood our allocation model before they touched a single screen. That's rare in this space.", name: "Priya Anand", role: "CFO, retail holding company", metric: "31% fewer manual adjustments" },
  ],
};

const FAQS = [
  { q: "What is Oracle EPM Consulting?", a: "Oracle EPM Consulting is the process of implementing and optimizing Oracle's Enterprise Performance Management suite — planning and budgeting, financial consolidation, account reconciliation, profitability management, and narrative reporting — configured to your organization's close calendar and entity structure." },
  { q: "How long does an Oracle EPM implementation take?", a: "A focused single-module implementation, such as Planning or Account Reconciliation, typically takes 2–4 months. Multi-module deployments spanning consolidation, reporting, and profitability management can take 6–10 months depending on entity complexity." },
  { q: "Can you migrate us from spreadsheets or a legacy planning tool?", a: "Yes. We migrate budget models, historical actuals, and reporting templates from spreadsheets and legacy planning tools, validating every data object before it goes live on Oracle EPM." },
  { q: "What Oracle EPM modules do you implement?", a: "We implement Planning and Budgeting, Financial Consolidation and Close, Account Reconciliation, Profitability and Cost Management, Narrative Reporting, and Enterprise Performance Analytics." },
  { q: "How does Oracle EPM integrate with our ERP and HCM systems?", a: "We integrate Oracle EPM with Oracle ERP, Oracle HCM, and third-party data warehouses using Oracle Integration Cloud and REST APIs, so actuals flow into planning and consolidation without manual re-entry." },
  { q: "What AI capabilities does Oracle EPM include?", a: "Oracle EPM includes embedded AI for predictive forecasting and anomaly detection in consolidation and reconciliation. We configure these against your own financial data so predictions reflect how your business actually performs." },
  { q: "Do you provide support after go-live?", a: "Yes. Every implementation includes a structured hypercare period through the first live close cycle. Clients can transition into an ongoing managed services retainer for continued optimization." },
  { q: "Are you a certified Oracle EPM implementation partner?", a: "Yes. Mirketa's consultants hold active Oracle EPM Cloud certifications, backed by a verified delivery track record across enterprise finance transformation engagements." },
  { q: "Can Oracle EPM support multi-entity, multi-currency consolidation?", a: "Yes. Oracle EPM is built for multi-entity consolidation with automated intercompany eliminations and currency translation across global entity structures." },
];

const FINAL_CTA = {
  heading: "Modernize Your Finance Function with Oracle EPM",
  description: "Partner with Mirketa's certified Oracle EPM consultants to connect planning, consolidation, and reporting into one trusted system — or speak with an Oracle EPM expert before you commit to a roadmap.",
  primaryCta: { label: "Schedule a Consultation", href: "#contact" },
  secondaryCta: { label: "Talk to an Oracle EPM Expert", href: "#contact" },
};

const SEO = {
  title: "Oracle EPM Consulting & Development Services | Mirketa",
  description:
    "Mirketa's certified Oracle EPM consultants deliver Enterprise Performance Management implementation across planning, budgeting, financial consolidation, account reconciliation, and narrative reporting.",
  canonical: "https://mirketa.us/oracle-epm-consulting-development/",
  keywords: [
    "Oracle EPM Consulting",
    "Oracle EPM Implementation",
    "Oracle Enterprise Performance Management",
    "Oracle Planning and Budgeting",
    "Oracle Financial Consolidation",
    "Oracle Account Reconciliation",
    "Oracle Profitability Management",
    "Oracle Narrative Reporting",
    "Oracle EPM Services",
    "Oracle EPM Consultants",
  ],
  schema: [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "Oracle EPM Consulting and Development Services",
      provider: { "@type": "Organization", name: "Mirketa Inc.", url: "https://mirketa.us" },
      name: "Oracle EPM Consulting & Development Services",
      description:
        "End-to-end Oracle Enterprise Performance Management consulting and implementation across planning, budgeting, financial consolidation, account reconciliation, profitability management, and narrative reporting.",
      areaServed: "Global",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://mirketa.us/" },
        { "@type": "ListItem", position: 2, name: "Oracle Fusion Applications Implementation", item: "https://mirketa.us/oracle-fusion-applications-implementation/" },
        { "@type": "ListItem", position: 3, name: "Oracle EPM Consulting & Development Services", item: "https://mirketa.us/oracle-epm-consulting-development/" },
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

export default function EpmConsulting() {
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

      gsap.utils.toArray(".oep-reveal").forEach((el) => {
        gsap.from(el, {
          opacity: prefersReduced ? 1 : 0,
          y: prefersReduced ? 0 : 32,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      gsap.utils.toArray(".oep-reveal-left").forEach((el) => {
        gsap.from(el, {
          opacity: prefersReduced ? 1 : 0,
          x: prefersReduced ? 0 : -30,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      gsap.utils.toArray(".oep-reveal-right").forEach((el) => {
        gsap.from(el, {
          opacity: prefersReduced ? 1 : 0,
          x: prefersReduced ? 0 : 30,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      gsap.utils.toArray(".oep-reveal-stagger").forEach((el) => {
        gsap.from(el.children, {
          opacity: prefersReduced ? 1 : 0,
          y: prefersReduced ? 0 : 26,
          duration: 0.6,
          stagger: 0.06,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      gsap.utils.toArray(".oep-zoom-in").forEach((el) => {
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
    <div className="oracle-epm-consulting">
      <Seo {...SEO} />
      <HeroSection heroTextRef={heroTextRef} heroRef={heroRef} />
      <TrustedBySection />

      <section className="oep-l3-layout" aria-label="Oracle EPM Consulting details">
        <div className="container oep-l3-layout__grid">
          <L3SideNav eyebrow="Oracle Fusion Applications" items={L3_ITEMS} activeHref={location.pathname} ariaLabel="Oracle Fusion Applications Implementation sub-pages" />
          <div className="oep-l3-layout__content">
            <WhyEpmSection />
            <ServicesSection />
            {PILLARS.map((p, i) => (
              <PillarSection key={p.id} pillar={p} alt={i % 2 === 1} />
            ))}
            <BenefitsSection />
            <ImplementationSection />
            <IndustriesSection />
            <WhyMirketaSection />
          </div>
        </div>
      </section>

      <TestimonialsSection />
      <FaqSection />
      <FinalCtaSection />
      <ConsultationSection
        eyebrow="Get Started"
        heading="Schedule a Free Oracle EPM Consultation"
        description="Tell us about your planning, budgeting, forecasting, or consolidation challenges, and your current EPM and finance systems — an Oracle EPM consultant will follow up within one business day."
        formTitle="Schedule a Free Oracle EPM Consultation"
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
    <div className={`oep-sticky-cta ${visible ? "is-visible" : ""}`} aria-hidden={!visible}>
      <a href="#contact" className="btn btn-primary oep-btn" tabIndex={visible ? 0 : -1}>
        Schedule a Consultation <span aria-hidden="true">→</span>
      </a>
    </div>
  );
}

// ============================================================
// HERO
// ============================================================

function HeroSection({ heroTextRef, heroRef }) {
  return (
    <section ref={heroRef} className="oep-hero" style={{ backgroundImage: `url("${Images.heroOracleEpmConsulting}")` }} aria-label="Oracle EPM Consulting & Development by Mirketa">
      <div className="oep-hero__scrim" />
      <div className="container">
        <Breadcrumb items={BREADCRUMB} className="oep-breadcrumb" />
        <div className="oep-hero__inner">
          <div ref={heroTextRef} className="oep-hero__text">
            <span className="oep-badge">
              <span className="oep-badge__spark" aria-hidden="true">✦</span> {HERO.badge}
            </span>
            <h1>{HERO.title}</h1>
            <p className="oep-hero__description">{HERO.description}</p>
            <div className="oep-hero__ctas">
              <a href={HERO.primaryCta.href} className="btn btn-primary oep-btn">
                {HERO.primaryCta.label} <span aria-hidden="true">→</span>
              </a>
              <a href={HERO.secondaryCta.href} className="btn btn-secondary oep-btn">
                {HERO.secondaryCta.label}
              </a>
            </div>
            <ul className="oep-hero__metrics">
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
            className="oep-hero__visual oep-zoom-in"
          />
        </div>
      </div>
    </section>
  );
}

// ============================================================
// TRUSTED CLIENTS
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
    <section className="oep-trusted" aria-label="Trusted clients">
      <div className="container oep-trusted__inner">
        <p className="oep-trusted__label">Trusted by Finance Teams Worldwide</p>
        <div className="oep-trusted__track" role="list">
          <div className="oep-trusted__marquee">
            {loop.map((b, i) => (
              <div className="oep-trusted__badge" role="listitem" key={`${b.label}-${i}`}>
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
// WHY ORACLE EPM — comparison cards (without / with)
// ============================================================

function WhyEpmSection() {
  return (
    <section className="oep-why-epm" id="services" aria-labelledby="oep-why-epm-heading">
      <p className="oep-eyebrow">{WHY_EPM.eyebrow}</p>
      <h2 id="oep-why-epm-heading">{WHY_EPM.heading}</h2>
      <p className="oep-section-intro">{WHY_EPM.intro}</p>
      <div className="oep-comparison oep-reveal-stagger">
        <div className="oep-comparison__card oep-comparison__card--without">
          <h3>{WHY_EPM.without.title}</h3>
          <ul>
            {WHY_EPM.without.points.map((p) => (
              <li key={p}>
                <span aria-hidden="true">{Ico.cross}</span>
                {p}
              </li>
            ))}
          </ul>
        </div>
        <div className="oep-comparison__card oep-comparison__card--with">
          <h3>{WHY_EPM.with.title}</h3>
          <ul>
            {WHY_EPM.with.points.map((p) => (
              <li key={p}>
                <span aria-hidden="true">{Ico.check}</span>
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// ORACLE EPM CONSULTING SERVICES — accordion list
// ============================================================

function ServicesSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="oep-services" aria-labelledby="oep-services-heading">
      <div className="oep-services__head">
        <div>
          <p className="oep-eyebrow">{SERVICES.eyebrow}</p>
          <h2 id="oep-services-heading">{SERVICES.heading}</h2>
          <p className="oep-section-intro">{SERVICES.intro}</p>
        </div>
        <img src={Images.illoOracleEpmCloseDashboard} alt="" aria-hidden="true" className="oep-services__illo" loading="lazy" />
      </div>
      <div className="oep-services__accordion">
        {SERVICES.items.map((s, i) => {
          const open = openIndex === i;
          const panelId = `oep-service-panel-${i}`;
          return (
            <div className={`oep-service-item ${open ? "is-open" : ""}`} key={s.title}>
              <button type="button" className="oep-service-item__question" aria-expanded={open} aria-controls={panelId} onClick={() => setOpenIndex(open ? -1 : i)}>
                <span className="oep-service-item__num">{String(i + 1).padStart(2, "0")}</span>
                <span className="oep-service-item__title">{s.title}</span>
                <span className="oep-service-item__icon" aria-hidden="true">{open ? "−" : "+"}</span>
              </button>
              <div id={panelId} className="oep-service-item__answer" role="region" hidden={!open}>
                <p>{s.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ============================================================
// EPM PILLARS — Planning, Consolidation, Reconciliation,
// Profitability, Narrative Reporting, Analytics — each its
// own alternating-band section with an independent H2.
// ============================================================

function PillarSection({ pillar, alt }) {
  return (
    <section className={`oep-pillar ${alt ? "oep-pillar--alt" : ""}`} aria-labelledby={`oep-pillar-${pillar.id}-heading`}>
      <div className="oep-pillar__row">
        <span className="oep-pillar__icon">{pillar.icon}</span>
        <div className="oep-pillar__body">
          <h2 id={`oep-pillar-${pillar.id}-heading`}>{pillar.title}</h2>
          <p>{pillar.description}</p>
          <div className="oep-pillar__chips">
            {pillar.capabilities.map((c) => (
              <span key={c}>{c}</span>
            ))}
          </div>
        </div>
      </div>
      {pillar.kpis && (
        <div className="oep-pillar__kpis oep-reveal-stagger">
          {pillar.kpis.map((k) => (
            <PillarKpi key={k.label} value={k.value} label={k.label} />
          ))}
        </div>
      )}
    </section>
  );
}

function PillarKpi({ value, label }) {
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
          const duration = 1200;
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
    <div className="oep-pillar__kpi" ref={ref}>
      <strong>{display}</strong>
      <span>{label}</span>
    </div>
  );
}

// ============================================================
// BUSINESS BENEFITS — 2x2 metric-led tiles
// ============================================================

function BenefitsSection() {
  return (
    <section className="oep-benefits" aria-labelledby="oep-benefits-heading">
      <p className="oep-eyebrow">{BENEFITS.eyebrow}</p>
      <h2 id="oep-benefits-heading">{BENEFITS.heading}</h2>
      <p className="oep-section-intro">{BENEFITS.intro}</p>
      <div className="oep-benefits__grid oep-reveal-stagger">
        {BENEFITS.items.map((b) => (
          <div className="oep-benefit-tile" key={b.title}>
            {b.metric && <strong>{b.metric}</strong>}
            <h3>{b.title}</h3>
            <p>{b.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ============================================================
// ORACLE EPM IMPLEMENTATION APPROACH — segmented progress bar
// ============================================================

function ImplementationSection() {
  return (
    <section className="oep-implementation" aria-labelledby="oep-implementation-heading">
      <p className="oep-eyebrow">{IMPLEMENTATION.eyebrow}</p>
      <h2 id="oep-implementation-heading">{IMPLEMENTATION.heading}</h2>
      <p className="oep-section-intro">{IMPLEMENTATION.intro}</p>
      <div className="oep-implementation__bar" aria-hidden="true">
        {IMPLEMENTATION.stages.map((s) => (
          <span key={s.name} />
        ))}
      </div>
      <div className="oep-implementation__stages oep-reveal-stagger">
        {IMPLEMENTATION.stages.map((s, i) => (
          <div className="oep-implementation__stage" key={s.name}>
            <span className="oep-implementation__marker">{i + 1}</span>
            <h3>{s.name}</h3>
            <p>{s.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ============================================================
// INDUSTRIES SERVED — 3-col stat cards
// ============================================================

function IndustriesSection() {
  return (
    <section className="oep-industries" aria-labelledby="oep-industries-heading">
      <p className="oep-eyebrow">{INDUSTRIES.eyebrow}</p>
      <h2 id="oep-industries-heading">{INDUSTRIES.heading}</h2>
      <p className="oep-section-intro">{INDUSTRIES.intro}</p>
      <div className="oep-industries__grid oep-reveal-stagger">
        {INDUSTRIES.items.map((n) => (
          <div className="oep-industry-card" key={n.title}>
            <span className="oep-industry-card__icon">{n.icon}</span>
            <h3>{n.title}</h3>
            <p>{n.stat}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ============================================================
// WHY CHOOSE MIRKETA — ghost-numeral cards
// ============================================================

function WhyMirketaSection() {
  return (
    <section className="oep-why-mirketa" aria-labelledby="oep-why-mirketa-heading">
      <p className="oep-eyebrow">{WHY_MIRKETA.eyebrow}</p>
      <h2 id="oep-why-mirketa-heading">{WHY_MIRKETA.heading}</h2>
      <p className="oep-section-intro">{WHY_MIRKETA.intro}</p>
      <div className="oep-why-mirketa__grid oep-reveal-stagger">
        {WHY_MIRKETA.items.map((w, i) => (
          <div className="oep-why-mirketa-card" key={w.title}>
            <span className="oep-why-mirketa-card__ghost" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
            <span className="oep-why-mirketa-card__icon">{w.icon}</span>
            <h3>{w.title}</h3>
            <p>{w.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ============================================================
// CUSTOMER SUCCESS STORIES — testimonial cards
// ============================================================

function TestimonialsSection() {
  return (
    <section className="section oep-testimonials" aria-labelledby="oep-testimonials-heading">
      <div className="container">
        <div className="section-heading oep-reveal">
          <p className="oep-eyebrow">{TESTIMONIALS.eyebrow}</p>
          <h2 id="oep-testimonials-heading">{TESTIMONIALS.heading}</h2>
          <p>{TESTIMONIALS.intro}</p>
        </div>
        <div className="oep-testimonials__grid oep-reveal-stagger">
          {TESTIMONIALS.items.map((t) => (
            <figure className="oep-testimonial-card" key={t.name}>
              <span className="oep-testimonial-card__mark" aria-hidden="true">{Ico.quote}</span>
              <blockquote>{t.quote}</blockquote>
              <p className="oep-testimonial-card__metric">{t.metric}</p>
              <figcaption>
                <strong>{t.name}</strong>
                <span>{t.role}</span>
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
    <section className="section oep-faq" aria-labelledby="oep-faq-heading">
      <div className="container">
        <div className="section-heading oep-reveal">
          <p className="oep-eyebrow">FAQ</p>
          <h2 id="oep-faq-heading">Frequently Asked Questions About Oracle EPM Consulting</h2>
        </div>
        <div className="oep-faq__search-wrap oep-reveal">
          <label htmlFor="oep-faq-search" className="visually-hidden">
            Search frequently asked questions
          </label>
          <input
            id="oep-faq-search"
            type="search"
            className="oep-faq__search"
            placeholder="Ask a question — e.g. &quot;consolidation&quot;, &quot;migration&quot;, &quot;AI&quot;..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpenIndex(-1);
            }}
          />
        </div>
        <div className="oep-faq__list oep-reveal">
          {filtered.length === 0 ? (
            <p className="oep-faq__empty">No questions match &ldquo;{query}&rdquo;. Try a different search term.</p>
          ) : (
            filtered.map((item, i) => {
              const open = openIndex === i;
              const panelId = `oep-faq-panel-${i}`;
              return (
                <div className={`oep-faq-item ${open ? "is-open" : ""}`} key={item.q}>
                  <button type="button" className="oep-faq-item__question" aria-expanded={open} aria-controls={panelId} onClick={() => setOpenIndex(open ? -1 : i)}>
                    <span>{item.q}</span>
                    <span className="oep-faq-item__icon" aria-hidden="true">{open ? "−" : "+"}</span>
                  </button>
                  <div id={panelId} className="oep-faq-item__answer" role="region" hidden={!open}>
                    <p>{item.a}</p>
                  </div>
                </div>
              );
            })
          )}
        </div>
        <p className="oep-faq__links">
          Related reading: <Link to="/platforms/oracle/fusion-implementation">Oracle Fusion Applications Implementation</Link>,{" "}
          <Link to="/platforms/oracle/fusion-implementation/erp-consulting">Oracle Cloud ERP Consulting</Link>,{" "}
          <Link to="/platforms/oracle/fusion-implementation/hcm-consulting">Oracle HCM Consulting</Link>,{" "}
          <Link to="/platforms/oracle/fusion-implementation/cx-consulting">Oracle CX Consulting</Link>,{" "}
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
    <section className="oep-final-cta oep-reveal" aria-labelledby="oep-final-cta-heading">
      <div className="container oep-final-cta__inner">
        <h2 id="oep-final-cta-heading">{FINAL_CTA.heading}</h2>
        <p>{FINAL_CTA.description}</p>
        <div className="oep-final-cta__ctas">
          <a href={FINAL_CTA.primaryCta.href} className="btn btn-primary oep-btn">
            {FINAL_CTA.primaryCta.label} <span aria-hidden="true">→</span>
          </a>
          <a href={FINAL_CTA.secondaryCta.href} className="btn btn-secondary oep-btn">
            {FINAL_CTA.secondaryCta.label}
          </a>
        </div>
      </div>
    </section>
  );
}
