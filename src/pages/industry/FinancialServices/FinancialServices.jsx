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
import "./FinancialServices.css";

gsap.registerPlugin(ScrollTrigger);

// ============================================================
// SLUG / SEO CONFIGURATION — kept local to this component per
// project convention, sourced from the central pageSlugs.js entry
// so the URL itself still only needs to change in one place.
// ============================================================

export const pageSEO = {
  slug: `${INDUSTRY_PAGES.FINANCIAL_SERVICES.slug}/`,
  title: "Financial Services Technology | Mirketa",
  description:
    "Financial Services Technology Solutions from Mirketa: core banking integration, KYC/AML automation, wealth management reporting, and fraud detection analytics.",
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
  shield: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  route: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="6" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.4" /><circle cx="18" cy="18" r="2.5" stroke="currentColor" strokeWidth="1.4" /><path d="M6 8.5V13a4 4 0 004 4h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
  ),
  report: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 3h9l3 3v15H6V3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="M9 13l2-2 2 2 3-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
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
  brain: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 4a3 3 0 00-3 3v1a3 3 0 000 6v1a3 3 0 003 3M15 4a3 3 0 013 3v1a3 3 0 010 6v1a3 3 0 01-3 3M9 4v16M15 4v16" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
  ),
  cloud: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 18h10a4 4 0 000-8 5.5 5.5 0 00-10.7-1.7A4.5 4.5 0 007 18z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  card: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="6" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.4" /><path d="M3 10h18" stroke="currentColor" strokeWidth="1.4" /></svg>
  ),
  umbrella: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 11a9 9 0 0118 0H3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M12 11v8a2.2 2.2 0 004.4 0" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /><path d="M12 3v2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
  ),
  vault: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.4" /><circle cx="12" cy="12" r="3.4" stroke="currentColor" strokeWidth="1.3" /><path d="M12 8.6v1M12 14.4v1M8.6 12h1M14.4 12h1" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
  ),
};

// ============================================================
// DATA
// ============================================================

const BREADCRUMB_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Industry", href: "/" },
  { label: INDUSTRY_PAGES.FINANCIAL_SERVICES.label },
];

const HERO = {
  badge: "Financial Services Technology Partner",
  title: "Financial Services Technology That Connects Client Data Across Every System",
  description:
    "Mirketa's Financial Services Technology practice gives banks, insurers, and wealth managers one connected view of the client — core banking and CRM data unified, KYC/AML checks automated instead of manual, and claims or portfolio reporting generated from governed data instead of assembled across disconnected systems by hand.",
  primaryCta: { label: "Get a Financial Services Technology Assessment", href: "#contact" },
  secondaryCta: { label: "Talk to a Financial Services Advisor", href: "#contact" },
  metrics: ["Regulated-Data Security Expertise", "Core Banking & CRM Integration", "KYC/AML Automation Built In", "Compliance-First Architecture"],
};

const HERO_DASHBOARD = {
  title: "Client Compliance Console",
  stats: [
    { label: "KYC/AML CHECKS", value: "100%", caption: "Automated at onboarding" },
    { label: "CLAIMS PROCESSING", value: "-32%", caption: "Faster turnaround time" },
    { label: "DATA ACCURACY", value: "99.6%", caption: "Across core banking & CRM" },
  ],
  rows: [
    { title: "KYC verification — new account", meta: "Automated identity check complete", tone: "good", status: "Cleared" },
    { title: "Claims review — policy #8821", meta: "Flagged for adjuster review", tone: "attention", status: "In Review" },
    { title: "Portfolio report — Q3 wealth clients", meta: "Generated from governed core data", tone: "good", status: "Delivered" },
  ],
  floatingCards: [
    { icon: Ico.shield, title: "Compliance-First", subtitle: "Built into the architecture" },
    { icon: Ico.vault, title: "Secure by Design", subtitle: "Regulated-data expertise" },
  ],
};

const CHALLENGES = {
  eyebrow: "Industry Challenges",
  heading: "Why Client Data Stays Fragmented Across Financial Services Firms",
  intro:
    "Financial services technology challenges rarely trace back to a single broken system. They trace back to years of core banking, CRM, and reporting platforms that were never designed to share data.",
  items: [
    { title: "Manual KYC/AML Compliance Checks", description: "Client onboarding still routes through manual document review and identity verification steps that delay account opening by days." },
    { title: "Core Banking Data Siloed From CRM", description: "Relationship managers work from an incomplete client picture because transaction and account data never reaches the CRM they actually use." },
    { title: "Claims Processing Slowed by Disconnected Systems", description: "Adjusters re-enter the same claim information across separate intake, review, and payment systems, adding days to every claim." },
    { title: "Wealth Management Reporting Assembled by Hand", description: "Client portfolio reports get manually compiled across multiple custodians instead of pulled from one consolidated source." },
  ],
};

const SOLUTION = {
  eyebrow: "Industry Solutions",
  heading: "One Connected Client View Across Banking, Insurance, and Wealth Management",
  paragraphs: [
    "Mirketa's Financial Services Technology practice starts with the systems your relationship managers, underwriters, and advisors already touch every day — core banking platforms, policy administration systems, and custodial data feeds — and connects them to a single CRM view of the client.",
    "Compliance isn't bolted on afterward. KYC and AML verification steps are automated into the onboarding workflow itself, so document checks and identity verification happen in seconds instead of becoming a multi-day manual queue that delays revenue.",
    "The same governed data model that speeds onboarding also powers claims processing and wealth management reporting — because the underlying client and account data is consistent everywhere, reports and reviews pull from one source instead of being reconciled by hand across systems.",
  ],
};

const SERVICES = {
  eyebrow: "Services We Offer",
  heading: "Six Ways Mirketa Supports Financial Services Technology",
  intro: "Every engagement starts with one of these six service lines and expands as your institution's technology roadmap takes shape.",
  items: [
    { icon: Ico.bank, title: "Core Banking & CRM Integration", description: "Account, transaction, and relationship data connected so relationship managers see the full client picture in one place." },
    { icon: Ico.shield, title: "KYC/AML Compliance Automation", description: "Identity verification and compliance checks automated into onboarding instead of a manual, multi-day review queue." },
    { icon: Ico.route, title: "Claims Processing Modernization", description: "Intake, review, and payment systems connected so claims data is entered once and flows through automatically." },
    { icon: Ico.report, title: "Wealth Management Client Reporting", description: "Portfolio reports consolidated across custodians and generated from governed data, not manually assembled." },
    { icon: Ico.brain, title: "Fraud Detection & Risk Analytics", description: "AI-assisted anomaly detection applied to transaction and claims data to flag risk before it becomes a loss." },
    { icon: Ico.users, title: "Digital Client Onboarding", description: "A guided digital onboarding experience that replaces paper forms and manual data entry across channels." },
  ],
};

const PLATFORM_EXPERTISE = {
  eyebrow: "Platform Expertise",
  heading: "The Platforms Behind Every Financial Services Technology Engagement",
  intro: "We bring proven implementation depth across the platforms banks, insurers, and wealth managers already depend on.",
  items: [
    { title: "Salesforce Financial Services Cloud", description: "Client relationship and household views built for the way financial advisors and bankers actually work." },
    { title: "NetSuite & Oracle for Financial Consolidation", description: "Multi-entity financial reporting and consolidation for institutions with complex organizational structures." },
    { title: "AI-Powered Fraud and Risk Analytics", description: "Predictive models applied to transaction data to catch anomalies before they become losses." },
    { title: "Secure Cloud Infrastructure for Regulated Data", description: "Data segregation and access controls designed for the compliance requirements financial services firms actually face." },
  ],
};

const AI_AUTOMATION = {
  eyebrow: "AI & Automation",
  heading: "Where AI Actually Reduces Risk and Manual Work in Financial Services",
  intro: "These are the AI and automation capabilities Mirketa builds into financial services technology engagements once the data foundation is in place.",
  items: [
    { title: "Automated KYC/AML Verification", description: "Identity and compliance checks completed in seconds against governed client data instead of a manual review queue." },
    { title: "Fraud Pattern Detection", description: "Unusual transaction patterns flagged for review before they turn into confirmed fraud losses." },
    { title: "Predictive Credit and Risk Scoring", description: "Historical account behavior applied to score new credit and underwriting decisions more accurately." },
    { title: "Claims Document Intelligence", description: "AI-assisted review of claims documentation that flags missing information automatically." },
    { title: "Client Churn Prediction", description: "Early warning signals surfaced from account activity before a client relationship is actually at risk." },
    { title: "Natural Language Portfolio Q&A", description: "Advisors can ask plain-language questions across client portfolio data instead of building a new report." },
  ],
};

const BENEFITS = {
  eyebrow: "Business Benefits",
  heading: "What Changes Once Client Data Runs on One Connected Layer",
  intro: "These are the outcomes Mirketa's financial services technology clients consistently report.",
  stats: [
    { value: "0", label: "Compliance Exceptions Post-Automation" },
    { value: "90sec", label: "Average Fraud Review Time" },
    { value: "12.4%", label: "AUM Growth After Integration" },
    { value: "60%", label: "Faster Client Onboarding" },
  ],
  items: [
    { title: "Faster, Compliant Client Onboarding", description: "Automated KYC/AML checks mean new accounts open in minutes instead of days, without cutting compliance corners." },
    { title: "One Client View for Every Relationship Manager", description: "Banking, CRM, and wealth data connected so no relationship manager works from an incomplete picture." },
    { title: "Claims Processed Without Duplicate Data Entry", description: "Connected intake, review, and payment systems mean claims data is entered once and flows through automatically." },
    { title: "Reporting Clients Actually Trust", description: "Consolidated portfolio and account reporting pulls from governed data instead of a manual reconciliation exercise." },
  ],
};

const USE_CASES = {
  eyebrow: "Industry Use Cases",
  heading: "Financial Services Technology Across Business Models",
  intro: "Every financial services business model brings its own regulatory and operational requirements — our approach adapts to how each one actually works.",
  items: [
    { icon: Ico.bank, title: "Retail Banking" },
    { icon: Ico.umbrella, title: "Insurance Carriers" },
    { icon: Ico.report, title: "Wealth Management Firms" },
    { icon: Ico.vault, title: "Credit Unions" },
    { icon: Ico.brain, title: "FinTech Startups" },
    { icon: Ico.card, title: "Payment Processors" },
  ],
};

const SUCCESS_STORIES = {
  eyebrow: "Success Stories",
  heading: "Real Financial Services Technology Outcomes",
  intro: "Anonymized results from recent financial services technology engagements.",
  cases: [
    {
      title: "Regional Bank Cuts Client Onboarding Time by 60%",
      industry: "Retail Banking",
      challenge: "New account opening required manual identity verification and compliance review that took an average of three business days.",
      solution: "We automated KYC/AML verification into the digital onboarding workflow, connected to core banking and CRM data.",
      outcome: "Client onboarding time dropped 60%, with zero compliance exceptions in the following two quarters.",
    },
    {
      title: "Insurance Carrier Modernizes Claims Processing Across Three Systems",
      industry: "Insurance",
      challenge: "Claims adjusters manually re-entered the same claim data across separate intake, review, and payment systems.",
      solution: "We connected all three systems on a shared data model so claim information flows through automatically.",
      outcome: "Average claims processing time dropped significantly, with adjusters no longer re-entering data by hand.",
    },
  ],
};

const WHY_MIRKETA = {
  eyebrow: "Why Choose Mirketa",
  heading: "A Technology Partner That Understands Regulated Data",
  intro: "Plenty of partners can implement a CRM. Fewer understand the compliance and audit requirements that shape every financial services technology decision.",
  items: [
    { icon: Ico.award, title: "Regulated-Data Security Expertise", description: "Data segregation and access controls designed for the compliance requirements financial institutions actually face." },
    { icon: Ico.compass, title: "Deep Financial Services Domain Experience", description: "We understand core banking, claims, and wealth management operations, not just generic enterprise software." },
    { icon: Ico.clock, title: "Compliance-First Implementation", description: "KYC/AML and regulatory requirements built into the technology from day one, not retrofitted after an audit finding." },
    { icon: Ico.shield, title: "Fraud and Risk Analytics Depth", description: "AI-assisted risk models applied to real transaction and claims data, not a generic analytics dashboard." },
    { icon: Ico.users, title: "Dedicated Delivery Team", description: "The consultants who scope your engagement support it through go-live and beyond." },
    { icon: Ico.heart, title: "Support Beyond Go-Live", description: "Ongoing technology support available as your institution's compliance and reporting needs evolve." },
  ],
};

const TECHNOLOGIES = {
  eyebrow: "Technology Stack",
  heading: "The Platforms We Build Financial Services Technology On",
  intro: "Selected based on your institution's actual compliance requirements and client servicing model, not a default recommendation.",
  items: [
    { icon: Ico.cloud, title: "Salesforce Financial Services Cloud" },
    { icon: Ico.report, title: "NetSuite" },
    { icon: Ico.bank, title: "Oracle Fusion" },
    { icon: Ico.brain, title: "AI & ML Risk Analytics" },
    { icon: Ico.shield, title: "Cloud Data Warehousing" },
    { icon: Ico.route, title: "Core Banking Integration APIs" },
  ],
};

const PROCESS = {
  eyebrow: "Industry Process",
  heading: "A Five-Stage Path From Assessment to Compliant Operations",
  intro: "A structured methodology refined across financial services technology engagements spanning banking, insurance, and wealth management.",
  steps: [
    { label: "Compliance Assessment" },
    { label: "Technology Roadmap" },
    { label: "Integration & Automation" },
    { label: "Regulatory Validation" },
    { label: "Launch & Optimize" },
  ],
  detail: [
    { name: "Compliance Assessment", description: "Current technology landscape and compliance posture mapped across core banking, CRM, and reporting systems." },
    { name: "Technology Roadmap", description: "An integration and automation plan documented and prioritized against your institution's regulatory requirements." },
    { name: "Integration & Automation", description: "Core banking, CRM, and compliance systems connected on a shared, governed data model." },
    { name: "Regulatory Validation", description: "Structured testing with compliance and risk stakeholders before anything goes live." },
    { name: "Launch & Optimize", description: "Supported go-live followed by continuous refinement as reporting and compliance needs evolve." },
  ],
};

const FAQS = [
  { q: "What does Financial Services Technology from Mirketa include?", a: "It covers core banking and CRM integration, KYC/AML compliance automation, claims processing modernization, wealth management reporting, and fraud and risk analytics for banks, insurers, and wealth management firms." },
  { q: "Can you automate KYC and AML compliance checks without sacrificing accuracy?", a: "Yes. We automate identity verification and compliance checks against governed client data, reducing review time from days to seconds while maintaining the audit trail regulators expect." },
  { q: "Do you work with insurance carriers, or only banks?", a: "We work across financial services business models, including retail banking, insurance carriers, wealth management firms, credit unions, FinTech startups, and payment processors." },
  { q: "How does this help with wealth management client reporting?", a: "By consolidating client and custodial data on one governed platform, portfolio reports can be generated automatically instead of manually assembled across multiple custodians." },
  { q: "Can you integrate with our existing core banking platform?", a: "Yes. We build integrations connecting core banking platforms to CRM and reporting systems using secure, compliant integration patterns appropriate for regulated data." },
  { q: "How do you handle data security for regulated financial data?", a: "We design data segregation and access controls specific to financial services compliance requirements, not a generic enterprise security model." },
  { q: "What platforms do you typically implement for financial services clients?", a: "Most engagements involve Salesforce Financial Services Cloud for client relationship management, supplemented with NetSuite or Oracle for financial consolidation and AI-powered risk analytics." },
  { q: "Do you provide ongoing support after the initial implementation?", a: "Yes. Every engagement can transition into ongoing support as your institution's compliance, reporting, and integration needs evolve." },
];

const RELATED_SERVICES = {
  eyebrow: "Related Services",
  heading: "Explore More Ways Mirketa Supports Financial Institutions",
  intro: "Financial services technology often overlaps with related industries and platforms. Here's where to look next.",
  items: [
    { slug: INDUSTRY_PAGES.PRIVATE_EQUITY.slug, label: INDUSTRY_PAGES.PRIVATE_EQUITY.label, description: "Explore technology solutions for private equity funds and portfolio company operations adjacent to financial services." },
    { slug: INDUSTRY_PAGES.HI_TECH.slug, label: INDUSTRY_PAGES.HI_TECH.label, description: "See how Mirketa supports the FinTech and hi-tech companies many financial institutions partner with." },
    { slug: SALESFORCE_PAGES.DEVELOPMENT_CONSULTING.slug, label: SALESFORCE_PAGES.DEVELOPMENT_CONSULTING.label, description: "Build client relationship management on Salesforce Financial Services Cloud." },
    { slug: NETSUITE_PAGES.AI.slug, label: NETSUITE_PAGES.AI.label, description: "Bring AI-assisted forecasting and reporting into a NetSuite instance already running financial consolidation." },
    { slug: AI_PAGES.AI_DATA_FOUNDATIONS.slug, label: AI_PAGES.AI_DATA_FOUNDATIONS.label, description: "Build the governed data foundation that makes fraud analytics and AI reliable for regulated data." },
  ],
};

const FINAL_CTA = {
  heading: "Turn Client Data Into a Compliance and Growth Advantage",
  description: "Partner with Mirketa to connect core banking, compliance, and client reporting on one governed platform — or talk to a financial services technology advisor first.",
  primaryCta: { label: "Get a Financial Services Technology Assessment", href: "#contact" },
  secondaryCta: { label: "Talk to a Financial Services Advisor", href: "#contact" },
};

const CONSULTATION = {
  eyebrow: "Get Started",
  heading: "Get a Financial Services Technology Assessment",
  description: "Tell us about your core systems, compliance requirements, and reporting needs — a financial services technology advisor will follow up within one business day.",
  formTitle: "Get a Free Financial Services Technology Assessment",
};

const SEO = {
  title: pageSEO.title,
  description: pageSEO.description,
  canonical: `https://mirketa.us${pageSEO.slug}`,
  keywords: [
    "Financial Services Technology",
    "Banking Solutions",
    "Insurance Technology",
    "Wealth Management",
    "FinTech",
  ],
  schema: [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "Financial Services Technology",
      provider: { "@type": "Organization", name: "Mirketa Inc.", url: "https://mirketa.us" },
      name: "Financial Services Technology",
      description: "Core banking integration, KYC/AML automation, wealth management reporting, and fraud analytics for banks, insurers, and wealth managers.",
      areaServed: "Global",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://mirketa.us/" },
        { "@type": "ListItem", position: 2, name: INDUSTRY_PAGES.FINANCIAL_SERVICES.label, item: `https://mirketa.us${pageSEO.slug}` },
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

export default function FinancialServices() {
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

      gsap.utils.toArray(".fst-reveal").forEach((el) => {
        gsap.from(el, { opacity: prefersReduced ? 1 : 0, y: prefersReduced ? 0 : 32, duration: 0.7, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 88%" } });
      });
      gsap.utils.toArray(".fst-reveal-left").forEach((el) => {
        gsap.from(el, { opacity: prefersReduced ? 1 : 0, x: prefersReduced ? 0 : -30, duration: 0.7, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 88%" } });
      });
      gsap.utils.toArray(".fst-reveal-right").forEach((el) => {
        gsap.from(el, { opacity: prefersReduced ? 1 : 0, x: prefersReduced ? 0 : 30, duration: 0.7, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 88%" } });
      });
      gsap.utils.toArray(".fst-reveal-stagger").forEach((el) => {
        gsap.from(el.children, { opacity: prefersReduced ? 1 : 0, y: prefersReduced ? 0 : 26, duration: 0.6, stagger: 0.06, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 85%" } });
      });
      gsap.utils.toArray(".fst-zoom-in").forEach((el) => {
        gsap.from(el, { opacity: prefersReduced ? 1 : 0, scale: prefersReduced ? 1 : 0.94, duration: 0.6, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 88%" } });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="industry-financial-services">
      <Seo {...SEO} />
      <HeroSection heroTextRef={heroTextRef} heroRef={heroRef} />
      <TrustedByMarquee label="Trusted by Banking, Insurance, and Wealth Management Leaders" />
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
      <RelatedServices {...RELATED_SERVICES} className="fst-related fst-reveal" />
      <FinalCtaSection />
      <ConsultationSection {...CONSULTATION} />
      <StickyCta heroRef={heroRef} label="Get a Financial Services Technology Assessment" />
    </div>
  );
}

// ============================================================
// HERO
// ============================================================

function HeroSection({ heroTextRef, heroRef }) {
  return (
    <section ref={heroRef} className="fst-hero" style={{ backgroundImage: `url("${Images.heroIndustryFinancialServices}")` }} aria-label="Financial Services Technology Solutions by Mirketa">
      <div className="fst-hero__scrim" />
      <div className="container">
        <Breadcrumb items={BREADCRUMB_ITEMS} className="fst-breadcrumb" />
        <div className="fst-hero__inner">
          <div ref={heroTextRef} className="fst-hero__text">
            <span className="fst-badge">
              <span className="fst-badge__spark" aria-hidden="true">✦</span> {HERO.badge}
            </span>
            <h1>{HERO.title}</h1>
            <p className="fst-hero__description">{HERO.description}</p>
            <div className="fst-hero__ctas">
              <a href={HERO.primaryCta.href} className="btn btn-primary fst-btn">
                {HERO.primaryCta.label} <span aria-hidden="true">→</span>
              </a>
              <a href={HERO.secondaryCta.href} className="btn btn-secondary fst-btn">
                {HERO.secondaryCta.label}
              </a>
            </div>
            <ul className="fst-hero__metrics">
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
            className="fst-hero__visual fst-zoom-in"
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
    <section className="section fst-challenges" aria-labelledby="fst-challenges-heading">
      <div className="container">
        <div className="section-heading fst-reveal">
          <p className="fst-eyebrow">{CHALLENGES.eyebrow}</p>
          <h2 id="fst-challenges-heading">{CHALLENGES.heading}</h2>
          <p>{CHALLENGES.intro}</p>
        </div>
        <div className="fst-challenges__grid fst-reveal-stagger">
          {CHALLENGES.items.map((c) => (
            <div className="fst-challenge-card" key={c.title}>
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
    <section className="section fst-solution" aria-labelledby="fst-solution-heading">
      <div className="container fst-solution__grid">
        <div className="fst-reveal-left">
          <p className="fst-eyebrow">{SOLUTION.eyebrow}</p>
          <h2 id="fst-solution-heading">{SOLUTION.heading}</h2>
          {SOLUTION.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <div className="fst-reveal-right">
          <AnalyticsPanel
            title="Compliance & Onboarding Health"
            donutPercent={98}
            donutLabel="KYC/AML checks completed automatically"
            metrics={[
              { value: "0", label: "Compliance exceptions" },
              { value: "60%", label: "Faster onboarding" },
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
    <section className="section fst-services" aria-labelledby="fst-services-heading">
      <div className="container">
        <div className="fst-services__head fst-reveal">
          <div className="section-heading">
            <p className="fst-eyebrow">{SERVICES.eyebrow}</p>
            <h2 id="fst-services-heading">{SERVICES.heading}</h2>
            <p>{SERVICES.intro}</p>
          </div>
        </div>
        <div className="fst-services__grid fst-reveal-stagger">
          {SERVICES.items.map((c) => (
            <div className="fst-service-card" key={c.title}>
              <span className="fst-service-card__icon">{c.icon}</span>
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
    <section className="section fst-platform" aria-labelledby="fst-platform-heading">
      <div className="container">
        <div className="section-heading fst-reveal">
          <p className="fst-eyebrow">{PLATFORM_EXPERTISE.eyebrow}</p>
          <h2 id="fst-platform-heading">{PLATFORM_EXPERTISE.heading}</h2>
          <p>{PLATFORM_EXPERTISE.intro}</p>
        </div>
        <div className="fst-platform__grid fst-reveal-stagger">
          {PLATFORM_EXPERTISE.items.map((c) => (
            <div className="fst-platform-item" key={c.title}>
              <p className="fst-card-title">{c.title}</p>
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
    <section className="section fst-ai" aria-labelledby="fst-ai-heading">
      <div className="container">
        <div className="section-heading fst-reveal">
          <p className="fst-eyebrow">{AI_AUTOMATION.eyebrow}</p>
          <h2 id="fst-ai-heading">{AI_AUTOMATION.heading}</h2>
          <p>{AI_AUTOMATION.intro}</p>
        </div>
        <div className="fst-ai__layout">
          <div className="fst-ai__grid fst-reveal-stagger">
            {AI_AUTOMATION.items.map((f) => (
              <div className="fst-ai-item" key={f.title}>
                <p className="fst-card-title">{f.title}</p>
                <p>{f.description}</p>
              </div>
            ))}
          </div>
          <div className="fst-reveal-right">
            <WorkflowDiagram
              title="Client Onboarding Intelligence Flow"
              steps={[{ label: "Applied" }, { label: "Verified" }, { label: "Scored" }, { label: "Approved" }, { label: "Onboarded" }]}
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
    <section className="section fst-benefits" aria-labelledby="fst-benefits-heading">
      <div className="container">
        <div className="section-heading fst-reveal">
          <p className="fst-eyebrow">{BENEFITS.eyebrow}</p>
          <h2 id="fst-benefits-heading">{BENEFITS.heading}</h2>
          <p>{BENEFITS.intro}</p>
        </div>
        <div className="fst-benefits__stats fst-reveal-stagger">
          {BENEFITS.stats.map((s) => (
            <AnimatedCounter key={s.label} value={s.value} label={s.label} className="fst-stat" />
          ))}
        </div>
        <div className="fst-benefits__grid fst-reveal-stagger">
          {BENEFITS.items.map((b) => (
            <div className="fst-benefit-item" key={b.title}>
              <span aria-hidden="true">{Ico.check}</span>
              <div>
                <p className="fst-card-title">{b.title}</p>
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
    <section className="section fst-usecases" aria-labelledby="fst-usecases-heading">
      <div className="container">
        <div className="section-heading fst-reveal">
          <p className="fst-eyebrow">{USE_CASES.eyebrow}</p>
          <h2 id="fst-usecases-heading">{USE_CASES.heading}</h2>
          <p>{USE_CASES.intro}</p>
        </div>
        <div className="fst-usecases__grid fst-reveal-stagger">
          {USE_CASES.items.map((n) => (
            <div className="fst-usecase-card" key={n.title}>
              <span className="fst-usecase-card__icon">{n.icon}</span>
              <p className="fst-card-title">{n.title}</p>
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
    <section className="section fst-cases" aria-labelledby="fst-cases-heading">
      <div className="container">
        <div className="section-heading fst-reveal">
          <p className="fst-eyebrow">{SUCCESS_STORIES.eyebrow}</p>
          <h2 id="fst-cases-heading">{SUCCESS_STORIES.heading}</h2>
          <p>{SUCCESS_STORIES.intro}</p>
        </div>
        <div className="fst-cases__grid fst-reveal-stagger">
          {SUCCESS_STORIES.cases.map((c) => (
            <div className="fst-case-card" key={c.title}>
              <span className="fst-case-card__tag">{c.industry}</span>
              <p className="fst-card-title">{c.title}</p>
              <dl className="fst-case-card__fields">
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
    <section className="section fst-why" aria-labelledby="fst-why-heading">
      <div className="container">
        <div className="section-heading fst-reveal">
          <p className="fst-eyebrow">{WHY_MIRKETA.eyebrow}</p>
          <h2 id="fst-why-heading">{WHY_MIRKETA.heading}</h2>
          <p>{WHY_MIRKETA.intro}</p>
        </div>
        <div className="fst-why__grid fst-reveal-stagger">
          {WHY_MIRKETA.items.map((w) => (
            <div className="fst-why-card" key={w.title}>
              <span className="fst-why-card__icon">{w.icon}</span>
              <p className="fst-card-title">{w.title}</p>
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
    <section className="section fst-tech" aria-labelledby="fst-tech-heading">
      <div className="container">
        <div className="section-heading fst-reveal">
          <p className="fst-eyebrow">{TECHNOLOGIES.eyebrow}</p>
          <h2 id="fst-tech-heading">{TECHNOLOGIES.heading}</h2>
          <p>{TECHNOLOGIES.intro}</p>
        </div>
        <div className="fst-tech__grid fst-reveal-stagger">
          {TECHNOLOGIES.items.map((t) => (
            <div className="fst-tech-card" key={t.title}>
              <span className="fst-tech-card__icon">{t.icon}</span>
              <p className="fst-card-title">{t.title}</p>
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
    <section className="section fst-process" aria-labelledby="fst-process-heading">
      <div className="container">
        <div className="section-heading fst-reveal">
          <p className="fst-eyebrow">{PROCESS.eyebrow}</p>
          <h2 id="fst-process-heading">{PROCESS.heading}</h2>
          <p>{PROCESS.intro}</p>
        </div>
        <div className="fst-zoom-in">
          <SupplyChainMap
            title="Client Servicing Network"
            nodes={[
              { label: "Client", short: "CLI" },
              { label: "Relationship Manager", short: "RM" },
              { label: "Compliance", short: "CMP" },
              { label: "Operations", short: "OPS" },
              { label: "Regulator", short: "REG" },
            ]}
          />
        </div>
        <div className="fst-process__grid fst-reveal-stagger">
          {PROCESS.detail.map((p, i) => (
            <div className="fst-step-card" key={p.name}>
              <span className="fst-step-card__num">{String(i + 1).padStart(2, "0")}</span>
              <p className="fst-card-title">{p.name}</p>
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
    <section className="section fst-faq" aria-labelledby="fst-faq-heading">
      <div className="container">
        <div className="section-heading fst-reveal">
          <p className="fst-eyebrow">FAQ</p>
          <h2 id="fst-faq-heading">Frequently Asked Questions About Financial Services Technology</h2>
        </div>
        <FaqAccordion items={FAQS} className="fst-reveal" searchPlaceholder="Ask a question — e.g. &quot;KYC&quot;, &quot;claims&quot;, &quot;reporting&quot;..." />
        <p className="fst-faq__links">
          Related reading: <Link to={INDUSTRY_PAGES.PRIVATE_EQUITY.slug}>{INDUSTRY_PAGES.PRIVATE_EQUITY.label}</Link>,{" "}
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
    <section className="fst-final-cta fst-reveal" aria-labelledby="fst-final-cta-heading">
      <div className="container fst-final-cta__inner">
        <h2 id="fst-final-cta-heading">{FINAL_CTA.heading}</h2>
        <p>{FINAL_CTA.description}</p>
        <div className="fst-final-cta__ctas">
          <a href={FINAL_CTA.primaryCta.href} className="btn btn-primary fst-btn">
            {FINAL_CTA.primaryCta.label} <span aria-hidden="true">→</span>
          </a>
          <a href={FINAL_CTA.secondaryCta.href} className="btn btn-secondary fst-btn">
            {FINAL_CTA.secondaryCta.label}
          </a>
        </div>
      </div>
    </section>
  );
}
