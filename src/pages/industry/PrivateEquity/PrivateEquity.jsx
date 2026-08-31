import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Images } from "../../../assets/images/index.js";
import { INDUSTRY_PAGES, SALESFORCE_PAGES, NETSUITE_PAGES, AI_PAGES, ORACLE_PAGES } from "../../../config/pageSlugs.js";
import Seo from "../../../components/Seo/Seo.jsx";
import StickyCta from "../../../components/StickyCta/StickyCta.jsx";
import TrustedByMarquee from "../../../components/TrustedByMarquee/TrustedByMarquee.jsx";
import AnimatedCounter from "../../../components/AnimatedCounter/AnimatedCounter.jsx";
import FaqAccordion from "../../../components/FaqAccordion/FaqAccordion.jsx";
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb.jsx";
import HeroVisual from "../../../components/HeroVisual/HeroVisual.jsx";
import ConsultationSection from "../../../components/ConsultationSection/ConsultationSection.jsx";
import RelatedServices from "../../../components/RelatedServices/RelatedServices.jsx";
import WorkflowDiagram from "../../../components/illustrations/WorkflowDiagram/WorkflowDiagram.jsx";
import SupplyChainMap from "../../../components/illustrations/SupplyChainMap/SupplyChainMap.jsx";
import AnalyticsPanel from "../../../components/illustrations/AnalyticsPanel/AnalyticsPanel.jsx";
import "./PrivateEquity.css";

gsap.registerPlugin(ScrollTrigger);

// ============================================================
// SLUG / SEO CONFIGURATION — kept local to this component per
// project convention, sourced from the central pageSlugs.js entry
// so the URL itself still only needs to change in one place.
// ============================================================

export const pageSEO = {
  slug: `${INDUSTRY_PAGES.PRIVATE_EQUITY.slug}/`,
  title: "Private Equity Technology Solutions | Mirketa",
  description:
    "Private Equity Technology Solutions from Mirketa: portfolio company standardization, LP reporting automation, and fund operations technology.",
};

// ============================================================
// ICONS
// ============================================================

const Ico = {
  check: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12.5l5 5L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  bank: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 10l8-5 8 5M4 10v9M20 10v9M4 19h16M8 13v4M12 13v4M16 13v4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  report: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 3h9l3 3v15H6V3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="M9 13l2-2 2 2 3-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  route: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="6" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.4" /><circle cx="18" cy="18" r="2.5" stroke="currentColor" strokeWidth="1.4" /><path d="M6 8.5V13a4 4 0 004 4h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
  ),
  db: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><ellipse cx="12" cy="6" rx="7" ry="3" stroke="currentColor" strokeWidth="1.4" /><path d="M5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6" stroke="currentColor" strokeWidth="1.4" /><path d="M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3" stroke="currentColor" strokeWidth="1.4" /></svg>
  ),
  compass: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" /><path d="M15 9l-2 6-6 2 2-6 6-2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  clock: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" /><path d="M12 7v5l3.5 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
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
  shield: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  brain: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 4a3 3 0 00-3 3v1a3 3 0 000 6v1a3 3 0 003 3M15 4a3 3 0 013 3v1a3 3 0 010 6v1a3 3 0 01-3 3M9 4v16M15 4v16" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
  ),
  cart: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 4h2l2.2 11h10.6L20 7H6.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /><circle cx="9" cy="20" r="1.3" fill="currentColor" /><circle cx="17" cy="20" r="1.3" fill="currentColor" /></svg>
  ),
  cloud: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 18h10a4 4 0 000-8 5.5 5.5 0 00-10.7-1.7A4.5 4.5 0 007 18z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  building: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="5" y="3" width="14" height="18" rx="1.4" stroke="currentColor" strokeWidth="1.4" /><path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
  ),
};

// ============================================================
// DATA
// ============================================================

const BREADCRUMB_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Industry", href: "/" },
  { label: INDUSTRY_PAGES.PRIVATE_EQUITY.label },
];

const HERO = {
  badge: "Private Equity Technology Partner",
  title: "Private Equity Technology Solutions for Funds Ready to Scale Portfolio Operations",
  description:
    "Mirketa's Private Equity Technology Solutions give general partners one connected view across fund operations and every portfolio company — standardized CRM and ERP rollouts, automated LP reporting, and portfolio analytics that turn a diligence data room into a repeatable value-creation playbook instead of a one-time exercise.",
  primaryCta: { label: "Get a Portfolio Technology Assessment", href: "#contact" },
  secondaryCta: { label: "Talk to a PE Technology Advisor", href: "#contact" },
  metrics: ["Multi-Fund & Multi-Entity Experience", "Rapid Portfolio Company Onboarding", "LP Reporting Automation Built In", "Data Security & Compliance First"],
};

const HERO_DASHBOARD = {
  title: "Fund Operations Console",
  stats: [
    { label: "LP REPORTING TIME", value: "-45%", caption: "Since standardization" },
    { label: "PORTFOLIO COMPANIES", value: "12", caption: "Standardized on one stack" },
    { label: "DATA ACCURACY", value: "99.4%", caption: "Consolidated across funds" },
  ],
  rows: [
    { title: "LP quarterly report — Fund III", meta: "Auto-generated from governed data", tone: "good", status: "Sent" },
    { title: "New portfolio company onboarding", meta: "CRM + ERP rollout in progress", tone: "neutral", status: "In Progress" },
    { title: "Diligence document review — Deal #47", meta: "AI-flagged risk items for deal team", tone: "attention", status: "Needs Review" },
  ],
  floatingCards: [
    { icon: Ico.report, title: "45% Faster Reporting", subtitle: "LP reports from governed data" },
    { icon: Ico.shield, title: "Multi-Entity Security", subtitle: "Data segregation by design" },
  ],
};

const CHALLENGES = {
  eyebrow: "Industry Challenges",
  heading: "Why Portfolio Technology Becomes a GP's Hidden Cost Center",
  intro:
    "Private equity technology challenges rarely show up in the deal model. They show up two years into the hold period, when reporting and integration debt start eating into the returns the deal thesis promised.",
  items: [
    { title: "Portfolio Data Scattered Across Systems", description: "Every portfolio company runs its own CRM, ERP, and reporting tools, so there is no fund-level roll-up without a manual spreadsheet exercise every quarter." },
    { title: "LP Reporting Consumes Weeks Every Quarter", description: "Investor relations teams manually assemble reports from disconnected portfolio company data instead of pulling from one governed source." },
    { title: "Diligence Data Never Makes It Into Operations", description: "The technical diligence a deal team compiles pre-close gets filed away instead of feeding the post-close integration and value-creation plan." },
    { title: "Inconsistent Tech Stacks Slow Synergy Capture", description: "Every add-on acquisition arrives on different systems, delaying the operational synergies the investment thesis depends on." },
  ],
};

const SOLUTION = {
  eyebrow: "Industry Solutions",
  heading: "One Technology Layer Across Every Fund and Portfolio Company",
  paragraphs: [
    "Mirketa's Private Equity Technology Solutions start where most technology conversations at a fund stop: the 100-day plan. We work with deal teams and portfolio company leadership together to standardize CRM, ERP, and reporting technology across every entity in the portfolio, so synergy capture starts on day one instead of quarter four.",
    "Because we already carry deep implementation experience across Salesforce, NetSuite, and Oracle, we don't need to learn a new platform for every portfolio company — we bring a repeatable playbook that shortens onboarding time for each new acquisition while still respecting what already works in that business.",
    "The result is a fund operations layer where LP reporting pulls from governed, standardized data instead of a quarterly fire drill, and where diligence data actually informs the technology roadmap for the businesses you've just acquired.",
  ],
};

const SERVICES = {
  eyebrow: "Services We Offer",
  heading: "Six Ways Mirketa Supports Private Equity Technology",
  intro: "Every engagement starts with one of these six service lines and expands as your portfolio grows.",
  items: [
    { icon: Ico.compass, title: "Portfolio Company Technology Standardization", description: "A repeatable CRM and ERP rollout playbook applied consistently across every new acquisition." },
    { icon: Ico.report, title: "LP Reporting Automation", description: "Investor reports generated from governed, standardized portfolio data instead of assembled by hand each quarter." },
    { icon: Ico.route, title: "Deal Pipeline & CRM Integration", description: "Deal flow, relationship data, and diligence notes connected to the systems your deal team already uses." },
    { icon: Ico.db, title: "Fund Accounting System Implementation", description: "NetSuite and Oracle implementations designed for multi-entity, multi-fund consolidation from day one." },
    { icon: Ico.shield, title: "Data Room & Diligence Technology", description: "Technical diligence findings carried forward into the actual post-close integration plan, not filed away." },
    { icon: Ico.brain, title: "Portfolio Analytics & BI", description: "Fund-level dashboards that roll up portfolio company performance without a manual spreadsheet exercise." },
  ],
};

const PLATFORM_EXPERTISE = {
  eyebrow: "Platform Expertise",
  heading: "The Platforms Behind Every Private Equity Technology Engagement",
  intro: "We bring proven implementation depth across the platforms most portfolio companies and fund operations teams already depend on.",
  items: [
    { title: "Salesforce for Deal & Relationship Management", description: "Deal pipeline, LP relationship tracking, and portfolio company CRM standardized on one platform family." },
    { title: "NetSuite & Oracle for Fund and Portfolio Financials", description: "Multi-entity financial consolidation built for how funds and portfolio companies actually report." },
    { title: "AI-Powered Portfolio Monitoring", description: "Predictive analytics applied to portfolio company performance data, not just historical reporting." },
    { title: "Secure Multi-Entity Cloud Infrastructure", description: "Data segregation and access controls appropriate for a fund managing multiple portfolio companies' sensitive data." },
  ],
};

const AI_AUTOMATION = {
  eyebrow: "AI & Automation",
  heading: "Where AI Actually Moves the Needle in Fund Operations",
  intro: "These are the AI and automation capabilities Mirketa builds into private equity technology engagements once the data foundation is in place.",
  items: [
    { title: "AI-Powered Portfolio Monitoring", description: "Predictive signals surfaced from portfolio company data before they show up in a quarterly board deck." },
    { title: "Automated LP Report Generation", description: "Investor reports drafted directly from governed source systems instead of manually compiled." },
    { title: "Predictive Deal Scoring", description: "Historical deal outcome data applied to score new opportunities against your fund's actual track record." },
    { title: "Document Intelligence for Diligence", description: "AI-assisted review of data room documents that flags risk items for the deal team automatically." },
    { title: "Anomaly Detection in Portfolio Financials", description: "Unusual variance in portfolio company financials flagged before it becomes a board-level surprise." },
    { title: "Natural Language Portfolio Q&A", description: "Fund operations teams can ask plain-language questions across portfolio data instead of building a new report." },
  ],
};

const BENEFITS = {
  eyebrow: "Business Benefits",
  heading: "What Changes Once Fund Operations Run on One Technology Layer",
  intro: "These are the outcomes Mirketa's private equity technology clients consistently report.",
  stats: [
    { value: "45%", label: "Faster LP Reporting" },
    { value: "12", label: "Portfolio Companies Standardized" },
    { value: "30%", label: "Reduction in Diligence Time" },
    { value: "99.4%", label: "Consolidated Data Accuracy" },
  ],
  items: [
    { title: "One Consolidated View of Fund Performance", description: "GPs see portfolio-wide performance without waiting on a manual quarterly roll-up." },
    { title: "Faster Time-to-Value Post-Acquisition", description: "A repeatable onboarding playbook means each new portfolio company reaches synergy capture faster." },
    { title: "LP Confidence Through Transparent Reporting", description: "Investor reports pull from the same governed data the fund itself relies on internally." },
    { title: "Technology That Scales With the Fund", description: "Adding the next portfolio company doesn't mean starting the technology conversation from zero." },
  ],
};

const USE_CASES = {
  eyebrow: "Industry Use Cases",
  heading: "Private Equity Technology Across Fund Strategies",
  intro: "Every fund strategy brings its own operational model — our approach adapts to how each one actually works.",
  items: [
    { icon: Ico.building, title: "Buyout Funds" },
    { icon: Ico.compass, title: "Venture Capital" },
    { icon: Ico.report, title: "Growth Equity" },
    { icon: Ico.bank, title: "Real Estate PE" },
    { icon: Ico.db, title: "Fund of Funds" },
    { icon: Ico.users, title: "Family Offices" },
  ],
};

const SUCCESS_STORIES = {
  eyebrow: "Success Stories",
  heading: "Real Private Equity Technology Outcomes",
  intro: "Anonymized results from recent private equity technology engagements.",
  cases: [
    {
      title: "Mid-Market Buyout Fund Cuts LP Reporting Time by 60%",
      industry: "Buyout Fund",
      challenge: "Investor relations manually compiled quarterly reports from five portfolio companies running five different systems.",
      solution: "We standardized portfolio company financial reporting on NetSuite and built an automated LP reporting layer on top.",
      outcome: "Quarterly LP reporting time dropped 60%, with reports now generated directly from governed source data.",
    },
    {
      title: "PE Firm Standardizes CRM Across Eight Portfolio Companies in One Quarter",
      industry: "Growth Equity",
      challenge: "Eight portfolio companies ran eight different CRMs, making fund-wide pipeline visibility impossible for the deal team.",
      solution: "We deployed a repeatable Salesforce rollout playbook across all eight companies using a single implementation template.",
      outcome: "All eight portfolio companies were live on standardized CRM within one quarter, with fund-wide pipeline visibility for the first time.",
    },
  ],
};

const WHY_MIRKETA = {
  eyebrow: "Why Choose Mirketa",
  heading: "A Technology Partner That Understands Fund Economics",
  intro: "Plenty of partners can implement a CRM. Fewer understand why a fund's 100-day plan and LP reporting cadence should shape the technology roadmap.",
  items: [
    { icon: Ico.award, title: "Deep Private Equity Domain Experience", description: "We understand fund structures, hold periods, and LP reporting cadences, not just generic enterprise software." },
    { icon: Ico.compass, title: "Multi-Entity & Multi-Fund Expertise", description: "Consolidation and reporting designed for funds managing multiple entities, not a single-company deployment." },
    { icon: Ico.clock, title: "Rapid Portfolio Company Onboarding", description: "A repeatable playbook that shortens the technology timeline for every new acquisition." },
    { icon: Ico.shield, title: "Data Security & Compliance First", description: "Access controls and data segregation appropriate for sensitive, multi-entity portfolio data." },
    { icon: Ico.users, title: "Dedicated Fund Operations Team", description: "The consultants who scope your engagement support it through close and beyond." },
    { icon: Ico.heart, title: "Support Beyond Close", description: "Ongoing technology support available for both fund operations and individual portfolio companies." },
  ],
};

const TECHNOLOGIES = {
  eyebrow: "Technology Stack",
  heading: "The Platforms We Build Private Equity Technology On",
  intro: "Selected based on your fund's actual reporting cadence and portfolio company landscape, not a default recommendation.",
  items: [
    { icon: Ico.cloud, title: "Salesforce" },
    { icon: Ico.db, title: "NetSuite" },
    { icon: Ico.building, title: "Oracle Fusion" },
    { icon: Ico.report, title: "Power BI & Tableau" },
    { icon: Ico.brain, title: "AI & ML Analytics" },
    { icon: Ico.shield, title: "Cloud Data Warehousing" },
  ],
};

const PROCESS = {
  eyebrow: "Industry Process",
  heading: "A Five-Stage Path From Assessment to Fund-Wide Standardization",
  intro: "A structured methodology refined across private equity technology engagements spanning buyout, growth, and venture strategies.",
  steps: [
    { label: "Fund Assessment" },
    { label: "Technology Roadmap" },
    { label: "Portfolio Onboarding" },
    { label: "Integration & Automation" },
    { label: "Ongoing Optimization" },
  ],
  detail: [
    { name: "Fund Assessment", description: "Current technology landscape mapped across fund operations and every portfolio company." },
    { name: "Technology Roadmap", description: "A standardization plan documented and prioritized against your fund's actual reporting cadence." },
    { name: "Portfolio Onboarding", description: "The repeatable implementation playbook applied to each portfolio company in sequence." },
    { name: "Integration & Automation", description: "LP reporting, analytics, and cross-entity data flows automated on top of the standardized layer." },
    { name: "Ongoing Optimization", description: "Continuous refinement as new acquisitions join the portfolio and reporting needs evolve." },
  ],
};

const FAQS = [
  { q: "What are Private Equity Technology Solutions?", a: "Private Equity Technology Solutions cover portfolio company technology standardization, LP reporting automation, fund accounting system implementation, and portfolio analytics — the technology layer that connects fund operations to every portfolio company." },
  { q: "Can you standardize technology across portfolio companies that already have different systems?", a: "Yes. We assess each portfolio company's existing systems and apply a repeatable migration playbook that respects what already works while moving toward a fund-wide standard." },
  { q: "How does this help with LP reporting specifically?", a: "By standardizing portfolio company data on governed systems, LP reports can be generated directly from source data instead of manually compiled each quarter, cutting reporting time significantly." },
  { q: "Do you work with venture capital and growth equity funds, or only buyout funds?", a: "We work across fund strategies, including buyout, growth equity, venture capital, real estate PE, fund of funds, and family offices, adapting our approach to each strategy's operational model." },
  { q: "How quickly can a new portfolio company be onboarded onto standardized technology?", a: "Using our repeatable implementation playbook, most portfolio companies can be onboarded onto standardized CRM or ERP within one quarter, depending on complexity." },
  { q: "Can you integrate diligence data into the post-close technology plan?", a: "Yes. We help deal teams carry technical diligence findings forward into the actual 100-day integration plan instead of letting that work go unused after close." },
  { q: "What platforms do you typically implement for private equity clients?", a: "Most engagements involve Salesforce for deal and relationship management, and NetSuite or Oracle for fund and portfolio company financial consolidation, supplemented with AI-powered analytics." },
  { q: "Do you provide ongoing support after the initial rollout?", a: "Yes. Every engagement can transition into ongoing support for both fund operations and individual portfolio companies as the portfolio grows." },
];

const RELATED_SERVICES = {
  eyebrow: "Related Services",
  heading: "Explore More Ways Mirketa Supports Investment Firms",
  intro: "Private equity technology often overlaps with related industries and platforms. Here's where to look next.",
  items: [
    { slug: INDUSTRY_PAGES.FINANCIAL_SERVICES.slug, label: INDUSTRY_PAGES.FINANCIAL_SERVICES.label, description: "Explore technology solutions for banking, insurance, and wealth management firms adjacent to private equity." },
    { slug: INDUSTRY_PAGES.HI_TECH.slug, label: INDUSTRY_PAGES.HI_TECH.label, description: "See how Mirketa supports the hi-tech and SaaS portfolio companies many funds invest in." },
    { slug: SALESFORCE_PAGES.DEVELOPMENT_CONSULTING.slug, label: SALESFORCE_PAGES.DEVELOPMENT_CONSULTING.label, description: "Standardize deal and relationship management on Salesforce across your portfolio." },
    { slug: NETSUITE_PAGES.AI.slug, label: NETSUITE_PAGES.AI.label, description: "Bring AI-assisted forecasting and reporting into a NetSuite instance already running fund or portfolio company financials." },
    { slug: AI_PAGES.AI_DATA_FOUNDATIONS.slug, label: AI_PAGES.AI_DATA_FOUNDATIONS.label, description: "Build the governed data foundation that makes portfolio-wide analytics and AI reliable." },
  ],
};

const FINAL_CTA = {
  heading: "Turn Portfolio Technology Into a Value-Creation Advantage",
  description: "Partner with Mirketa to standardize technology across your fund and portfolio companies — or talk to a private equity technology advisor before your next close.",
  primaryCta: { label: "Get a Portfolio Technology Assessment", href: "#contact" },
  secondaryCta: { label: "Talk to a PE Technology Advisor", href: "#contact" },
};

const CONSULTATION = {
  eyebrow: "Get Started",
  heading: "Get a Portfolio Technology Assessment",
  description: "Tell us about your fund structure, portfolio companies, and reporting timeline — a private equity technology advisor will follow up within one business day.",
  formTitle: "Get a Free Portfolio Technology Assessment",
};

const SEO = {
  title: pageSEO.title,
  description: pageSEO.description,
  canonical: `https://mirketa.us${pageSEO.slug}`,
  keywords: [
    "Private Equity Technology Solutions",
    "Portfolio Management",
    "Investment Technology",
    "Private Equity Consulting",
    "Digital Transformation",
  ],
  schema: [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "Private Equity Technology Solutions",
      provider: { "@type": "Organization", name: "Mirketa Inc.", url: "https://mirketa.us" },
      name: "Private Equity Technology Solutions",
      description: "Portfolio company technology standardization, LP reporting automation, and fund operations technology for private equity firms.",
      areaServed: "Global",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://mirketa.us/" },
        { "@type": "ListItem", position: 2, name: INDUSTRY_PAGES.PRIVATE_EQUITY.label, item: `https://mirketa.us${pageSEO.slug}` },
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

export default function PrivateEquity() {
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

      gsap.utils.toArray(".pe-reveal").forEach((el) => {
        gsap.from(el, { opacity: prefersReduced ? 1 : 0, y: prefersReduced ? 0 : 32, duration: 0.7, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 88%" } });
      });
      gsap.utils.toArray(".pe-reveal-left").forEach((el) => {
        gsap.from(el, { opacity: prefersReduced ? 1 : 0, x: prefersReduced ? 0 : -30, duration: 0.7, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 88%" } });
      });
      gsap.utils.toArray(".pe-reveal-right").forEach((el) => {
        gsap.from(el, { opacity: prefersReduced ? 1 : 0, x: prefersReduced ? 0 : 30, duration: 0.7, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 88%" } });
      });
      gsap.utils.toArray(".pe-reveal-stagger").forEach((el) => {
        gsap.from(el.children, { opacity: prefersReduced ? 1 : 0, y: prefersReduced ? 0 : 26, duration: 0.6, stagger: 0.06, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 85%" } });
      });
      gsap.utils.toArray(".pe-zoom-in").forEach((el) => {
        gsap.from(el, { opacity: prefersReduced ? 1 : 0, scale: prefersReduced ? 1 : 0.94, duration: 0.6, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 88%" } });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="industry-private-equity">
      <Seo {...SEO} />
      <HeroSection heroTextRef={heroTextRef} heroRef={heroRef} />
      <TrustedByMarquee label="Trusted by General Partners and Portfolio Company Leaders" />
      <ChallengesSection />
      <SolutionSection />
      <ServicesSection />
      <PlatformExpertiseSection />
      <AiAutomationSection />
      <BenefitsSection />
      <UseCasesSection />
      <SuccessStoriesSection />
      <WhyMirketaSection />
      <TechnologiesSection />
      <ProcessSection />
      <FaqSection />
      <RelatedServices {...RELATED_SERVICES} className="pe-related pe-reveal" />
      <FinalCtaSection />
      <ConsultationSection {...CONSULTATION} />
      <StickyCta heroRef={heroRef} label="Get a Portfolio Technology Assessment" />
    </div>
  );
}

// ============================================================
// HERO
// ============================================================

function HeroSection({ heroTextRef, heroRef }) {
  return (
    <section ref={heroRef} className="pe-hero" style={{ backgroundImage: `url("${Images.heroIndustryPrivateEquity}")` }} aria-label="Private Equity Technology Solutions by Mirketa">
      <div className="pe-hero__scrim" />
      <div className="container">
        <Breadcrumb items={BREADCRUMB_ITEMS} className="pe-breadcrumb" />
        <div className="pe-hero__inner">
          <div ref={heroTextRef} className="pe-hero__text">
            <span className="pe-badge">
              <span className="pe-badge__spark" aria-hidden="true">✦</span> {HERO.badge}
            </span>
            <h1>{HERO.title}</h1>
            <p className="pe-hero__description">{HERO.description}</p>
            <div className="pe-hero__ctas">
              <a href={HERO.primaryCta.href} className="btn btn-primary pe-btn">
                {HERO.primaryCta.label} <span aria-hidden="true">→</span>
              </a>
              <a href={HERO.secondaryCta.href} className="btn btn-secondary pe-btn">
                {HERO.secondaryCta.label}
              </a>
            </div>
            <ul className="pe-hero__metrics">
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
            className="pe-hero__visual pe-zoom-in"
          />
        </div>
      </div>
    </section>
  );
}

// ============================================================
// INDUSTRY CHALLENGES
// ============================================================

function ChallengesSection() {
  return (
    <section className="section pe-challenges" aria-labelledby="pe-challenges-heading">
      <div className="container">
        <div className="section-heading pe-reveal">
          <p className="pe-eyebrow">{CHALLENGES.eyebrow}</p>
          <h2 id="pe-challenges-heading">{CHALLENGES.heading}</h2>
          <p>{CHALLENGES.intro}</p>
        </div>
        <div className="pe-challenges__grid pe-reveal-stagger">
          {CHALLENGES.items.map((c) => (
            <div className="pe-challenge-card" key={c.title}>
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
// INDUSTRY SOLUTIONS
// ============================================================

function SolutionSection() {
  return (
    <section className="section pe-solution" aria-labelledby="pe-solution-heading">
      <div className="container pe-solution__grid">
        <div className="pe-reveal-left">
          <p className="pe-eyebrow">{SOLUTION.eyebrow}</p>
          <h2 id="pe-solution-heading">{SOLUTION.heading}</h2>
          {SOLUTION.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <div className="pe-reveal-right">
          <AnalyticsPanel
            title="Fund-Wide Reporting Accuracy"
            donutPercent={99}
            donutLabel="Consolidated data accuracy across the portfolio"
            metrics={[
              { value: "12", label: "Portfolio companies standardized" },
              { value: "45%", label: "Faster LP reporting" },
            ]}
          />
        </div>
      </div>
    </section>
  );
}

// ============================================================
// SERVICES WE OFFER
// ============================================================

function ServicesSection() {
  return (
    <section className="section pe-services" aria-labelledby="pe-services-heading">
      <div className="container">
        <div className="pe-services__head pe-reveal">
          <div className="section-heading">
            <p className="pe-eyebrow">{SERVICES.eyebrow}</p>
            <h2 id="pe-services-heading">{SERVICES.heading}</h2>
            <p>{SERVICES.intro}</p>
          </div>
        </div>
        <div className="pe-services__grid pe-reveal-stagger">
          {SERVICES.items.map((c) => (
            <div className="pe-service-card" key={c.title}>
              <span className="pe-service-card__icon">{c.icon}</span>
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
// PLATFORM EXPERTISE
// ============================================================

function PlatformExpertiseSection() {
  return (
    <section className="section pe-platform" aria-labelledby="pe-platform-heading">
      <div className="container">
        <div className="section-heading pe-reveal">
          <p className="pe-eyebrow">{PLATFORM_EXPERTISE.eyebrow}</p>
          <h2 id="pe-platform-heading">{PLATFORM_EXPERTISE.heading}</h2>
          <p>{PLATFORM_EXPERTISE.intro}</p>
        </div>
        <div className="pe-platform__grid pe-reveal-stagger">
          {PLATFORM_EXPERTISE.items.map((c) => (
            <div className="pe-platform-item" key={c.title}>
              <p className="pe-card-title">{c.title}</p>
              <p>{c.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// AI & AUTOMATION
// ============================================================

function AiAutomationSection() {
  return (
    <section className="section pe-ai" aria-labelledby="pe-ai-heading">
      <div className="container">
        <div className="section-heading pe-reveal">
          <p className="pe-eyebrow">{AI_AUTOMATION.eyebrow}</p>
          <h2 id="pe-ai-heading">{AI_AUTOMATION.heading}</h2>
          <p>{AI_AUTOMATION.intro}</p>
        </div>
        <div className="pe-ai__layout">
          <div className="pe-ai__grid pe-reveal-stagger">
            {AI_AUTOMATION.items.map((f) => (
              <div className="pe-ai-item" key={f.title}>
                <p className="pe-card-title">{f.title}</p>
                <p>{f.description}</p>
              </div>
            ))}
          </div>
          <div className="pe-reveal-right">
            <WorkflowDiagram
              title="Portfolio Data Intelligence Flow"
              steps={[{ label: "Ingested" }, { label: "Normalized" }, { label: "Analyzed" }, { label: "Flagged" }, { label: "Reported" }]}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// BUSINESS BENEFITS
// ============================================================

function BenefitsSection() {
  return (
    <section className="section pe-benefits" aria-labelledby="pe-benefits-heading">
      <div className="container">
        <div className="section-heading pe-reveal">
          <p className="pe-eyebrow">{BENEFITS.eyebrow}</p>
          <h2 id="pe-benefits-heading">{BENEFITS.heading}</h2>
          <p>{BENEFITS.intro}</p>
        </div>
        <div className="pe-benefits__stats pe-reveal-stagger">
          {BENEFITS.stats.map((s) => (
            <AnimatedCounter key={s.label} value={s.value} label={s.label} className="pe-stat" />
          ))}
        </div>
        <div className="pe-benefits__grid pe-reveal-stagger">
          {BENEFITS.items.map((b) => (
            <div className="pe-benefit-item" key={b.title}>
              <span aria-hidden="true">{Ico.check}</span>
              <div>
                <p className="pe-card-title">{b.title}</p>
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
// INDUSTRY USE CASES
// ============================================================

function UseCasesSection() {
  return (
    <section className="section pe-usecases" aria-labelledby="pe-usecases-heading">
      <div className="container">
        <div className="section-heading pe-reveal">
          <p className="pe-eyebrow">{USE_CASES.eyebrow}</p>
          <h2 id="pe-usecases-heading">{USE_CASES.heading}</h2>
          <p>{USE_CASES.intro}</p>
        </div>
        <div className="pe-usecases__grid pe-reveal-stagger">
          {USE_CASES.items.map((n) => (
            <div className="pe-usecase-card" key={n.title}>
              <span className="pe-usecase-card__icon">{n.icon}</span>
              <p className="pe-card-title">{n.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// SUCCESS STORIES
// ============================================================

function SuccessStoriesSection() {
  return (
    <section className="section pe-cases" aria-labelledby="pe-cases-heading">
      <div className="container">
        <div className="section-heading pe-reveal">
          <p className="pe-eyebrow">{SUCCESS_STORIES.eyebrow}</p>
          <h2 id="pe-cases-heading">{SUCCESS_STORIES.heading}</h2>
          <p>{SUCCESS_STORIES.intro}</p>
        </div>
        <div className="pe-cases__grid pe-reveal-stagger">
          {SUCCESS_STORIES.cases.map((c) => (
            <div className="pe-case-card" key={c.title}>
              <span className="pe-case-card__tag">{c.industry}</span>
              <p className="pe-card-title">{c.title}</p>
              <dl className="pe-case-card__fields">
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
// WHY CHOOSE MIRKETA
// ============================================================

function WhyMirketaSection() {
  return (
    <section className="section pe-why" aria-labelledby="pe-why-heading">
      <div className="container">
        <div className="section-heading pe-reveal">
          <p className="pe-eyebrow">{WHY_MIRKETA.eyebrow}</p>
          <h2 id="pe-why-heading">{WHY_MIRKETA.heading}</h2>
          <p>{WHY_MIRKETA.intro}</p>
        </div>
        <div className="pe-why__grid pe-reveal-stagger">
          {WHY_MIRKETA.items.map((w) => (
            <div className="pe-why-card" key={w.title}>
              <span className="pe-why-card__icon">{w.icon}</span>
              <p className="pe-card-title">{w.title}</p>
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
    <section className="section pe-tech" aria-labelledby="pe-tech-heading">
      <div className="container">
        <div className="section-heading pe-reveal">
          <p className="pe-eyebrow">{TECHNOLOGIES.eyebrow}</p>
          <h2 id="pe-tech-heading">{TECHNOLOGIES.heading}</h2>
          <p>{TECHNOLOGIES.intro}</p>
        </div>
        <div className="pe-tech__grid pe-reveal-stagger">
          {TECHNOLOGIES.items.map((t) => (
            <div className="pe-tech-card" key={t.title}>
              <span className="pe-tech-card__icon">{t.icon}</span>
              <p className="pe-card-title">{t.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// INDUSTRY PROCESS
// ============================================================

function ProcessSection() {
  return (
    <section className="section pe-process" aria-labelledby="pe-process-heading">
      <div className="container">
        <div className="section-heading pe-reveal">
          <p className="pe-eyebrow">{PROCESS.eyebrow}</p>
          <h2 id="pe-process-heading">{PROCESS.heading}</h2>
          <p>{PROCESS.intro}</p>
        </div>
        <div className="pe-zoom-in">
          <SupplyChainMap
            title="Fund Operations Network"
            nodes={[
              { label: "General Partner", short: "GP" },
              { label: "Portfolio Companies", short: "CO" },
              { label: "Limited Partners", short: "LP" },
              { label: "Fund Administrator", short: "ADM" },
              { label: "Auditors", short: "AUD" },
            ]}
          />
        </div>
        <div className="pe-process__grid pe-reveal-stagger">
          {PROCESS.detail.map((p, i) => (
            <div className="pe-step-card" key={p.name}>
              <span className="pe-step-card__num">{String(i + 1).padStart(2, "0")}</span>
              <p className="pe-card-title">{p.name}</p>
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
    <section className="section pe-faq" aria-labelledby="pe-faq-heading">
      <div className="container">
        <div className="section-heading pe-reveal">
          <p className="pe-eyebrow">FAQ</p>
          <h2 id="pe-faq-heading">Frequently Asked Questions About Private Equity Technology Solutions</h2>
        </div>
        <FaqAccordion items={FAQS} className="pe-reveal" searchPlaceholder="Ask a question — e.g. &quot;LP reporting&quot;, &quot;onboarding&quot;, &quot;platforms&quot;..." />
        <p className="pe-faq__links">
          Related reading: <Link to={INDUSTRY_PAGES.FINANCIAL_SERVICES.slug}>{INDUSTRY_PAGES.FINANCIAL_SERVICES.label}</Link>,{" "}
          <Link to={INDUSTRY_PAGES.HI_TECH.slug}>{INDUSTRY_PAGES.HI_TECH.label}</Link>,{" "}
          <Link to={SALESFORCE_PAGES.DEVELOPMENT_CONSULTING.slug}>{SALESFORCE_PAGES.DEVELOPMENT_CONSULTING.label}</Link>,{" "}
          <Link to={ORACLE_PAGES.FUSION_IMPLEMENTATION.slug}>{ORACLE_PAGES.FUSION_IMPLEMENTATION.label}</Link>,{" "}
          <Link to={NETSUITE_PAGES.AI.slug}>{NETSUITE_PAGES.AI.label}</Link>.
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
    <section className="pe-final-cta pe-reveal" aria-labelledby="pe-final-cta-heading">
      <div className="container pe-final-cta__inner">
        <h2 id="pe-final-cta-heading">{FINAL_CTA.heading}</h2>
        <p>{FINAL_CTA.description}</p>
        <div className="pe-final-cta__ctas">
          <a href={FINAL_CTA.primaryCta.href} className="btn btn-primary pe-btn">
            {FINAL_CTA.primaryCta.label} <span aria-hidden="true">→</span>
          </a>
          <a href={FINAL_CTA.secondaryCta.href} className="btn btn-secondary pe-btn">
            {FINAL_CTA.secondaryCta.label}
          </a>
        </div>
      </div>
    </section>
  );
}
