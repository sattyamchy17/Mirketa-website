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
import "./CxConsulting.css";

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
  compass: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" /><path d="M15 9l-2 6-6 2 2-6 6-2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  chartUp: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 19V13M10 19V8M16 19v-5M20 19V5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
  ),
  network: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="6" r="2.4" stroke="currentColor" strokeWidth="1.4" /><circle cx="6" cy="18" r="2.4" stroke="currentColor" strokeWidth="1.4" /><circle cx="18" cy="18" r="2.4" stroke="currentColor" strokeWidth="1.4" /><path d="M12 8.4L7 16M12 8.4l5 7.6M8.4 18h7.2" stroke="currentColor" strokeWidth="1.3" /></svg>
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
  cart: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 4h2l2.2 11h10.6L20 7H6.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /><circle cx="9" cy="20" r="1.3" fill="currentColor" /><circle cx="17" cy="20" r="1.3" fill="currentColor" /></svg>
  ),
  document: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 3h9l3 3v15H6z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M9 10h6M9 14h6M9 18h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
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
  sparkle: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /></svg>
  ),
  eye: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.4" /></svg>
  ),
  target: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.4" /><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.3" opacity="0.6" /><circle cx="12" cy="12" r="1.2" fill="currentColor" /></svg>
  ),
  bolt: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M13 2L4 14h7l-1 8 10-13h-7l0-7z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  factory: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 21V11l5 3V11l5 3V8l8 5v8H3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  bank: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 10l8-5 8 5M4 10v9M20 10v9M4 19h16M8 13v4M12 13v4M16 13v4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  chip: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="7" y="7" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.4" /><path d="M9 3v4M15 3v4M9 21v-4M15 21v-4M3 9h4M3 15h4M21 9h-4M21 15h-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
  ),
  signal: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 19h2v-4H4v4zm5 0h2V9H9v10zm5 0h2V5h-2v14zm5 0h2V12h-2v7z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" /></svg>
  ),
};

// ============================================================
// DATA
// ============================================================

const L3_ITEMS = [
  { label: "ERP Consulting", href: "/oracle-fusion/erp-consulting" },
  { label: "HCM", href: "/oracle-fusion/hcm-consulting" },
  { label: "CX Consulting Development", href: "/oracle-fusion/cx-consulting" },
  { label: "EPM Consulting Development Services", href: "/oracle-fusion/epm-consulting" },
  { label: "SCM", href: "/oracle-fusion/scm-consulting" },
];

const BREADCRUMB = [
  { label: "Home", href: "/" },
  { label: "Platforms & Technology", href: "/" },
  { label: "Oracle Fusion Applications Implementation", href: "/oracle-fusion-applications-implementation" },
  { label: "CX Consulting Development" },
];

const HERO = {
  badge: "Oracle Certified CX Implementation Partner",
  title: "Oracle CX Consulting & Development for Modern Customer Experience",
  description:
    "Mirketa helps enterprises implement, modernize, and optimize Oracle CX — Sales, Service, Marketing, Commerce, and CPQ — with a delivery model built around faster deals, stronger service, and AI-driven customer engagement.",
  primaryCta: { label: "Schedule Consultation", href: "#contact" },
  secondaryCta: { label: "Talk to an Oracle CX Expert", href: "#contact" },
  metrics: ["100+ Oracle CX Engagements", "Certified CX Consultants", "Global Delivery Model", "Post Go-Live Support Included"],
};

const HERO_DASHBOARD = {
  title: "Customer Experience Command Center",
  stats: [
    { label: "CASE RESOLUTION", value: "38%", caption: "Faster with unified Customer 360" },
    { label: "QUOTE TURNAROUND", value: "68%", caption: "Faster with Oracle CPQ automation" },
    { label: "CSAT SCORE", value: "96%", caption: "Across enterprise engagements" },
  ],
  rows: [
    { title: "Enterprise renewal — key account", meta: "Next-best-action surfaced by AI", tone: "good", status: "On Track" },
    { title: "Service case — omnichannel escalation", meta: "Routed to specialist queue", tone: "neutral", status: "In Progress" },
    { title: "CPQ approval — multi-part quote", meta: "Auto-cleared within discount threshold", tone: "good", status: "Approved" },
  ],
  floatingCards: [
    { icon: Ico.target, title: "AI Lead Scoring", subtitle: "Ranked against real conversion data" },
    { icon: Ico.bolt, title: "68% Faster Quotes", subtitle: "Automated CPQ approvals" },
  ],
};

const SERVICES = {
  eyebrow: "Oracle CX Consulting Services",
  heading: "Consulting Built Around How Your Customers Actually Buy",
  intro: "Every engagement starts with how your business sells, serves, and markets to customers — not a generic CRM checklist.",
  items: [
    { icon: Ico.compass, title: "Oracle CX Consulting", description: "A prioritized roadmap tying every CX decision to a measurable revenue or service outcome." },
    { icon: Ico.chartUp, title: "Oracle CX Implementation", description: "Sales, service, and commerce workflows configured to your go-to-market model." },
    { icon: Ico.network, title: "CRM Modernization", description: "Legacy CRM data and process migrated onto a connected Oracle CX foundation." },
    { icon: Ico.gear, title: "Oracle CX Customization", description: "Extensions tailored to sales and service policies a standard build can't cover." },
    { icon: Ico.headset, title: "Managed Services", description: "A dedicated team keeping your Oracle CX environment healthy after launch." },
    { icon: Ico.shield, title: "Support & Maintenance", description: "Ongoing monitoring, patching, and issue resolution built into every engagement." },
  ],
};

const PRODUCTS = {
  eyebrow: "Oracle CX Products",
  heading: "One Connected Platform Across Every Customer Touchpoint",
  intro: "Select a product to see how we configure it around your customer experience — not in isolation.",
  items: [
    { key: "sales", label: "Sales", title: "Oracle Sales", description: "Opportunity, quoting, and forecasting workflows configured to your sales motion, with a single connected view of every account." },
    { key: "service", label: "Service", title: "Oracle Service", description: "Case management and omnichannel support unified so agents resolve issues without switching systems." },
    { key: "marketing", label: "Marketing", title: "Oracle Marketing", description: "Campaign orchestration and journey design built on the same customer data your sales and service teams see." },
    { key: "commerce", label: "Commerce", title: "Oracle Commerce", description: "B2B and B2C storefronts connected directly to pricing, inventory, and order data in real time." },
    { key: "cpq", label: "CPQ", title: "Oracle CPQ", description: "Configure-price-quote automation that removes manual approval bottlenecks from every deal." },
    { key: "loyalty", label: "Loyalty", title: "Oracle Loyalty", description: "Rewards and retention programs tied to real purchase and engagement history." },
  ],
};

const CHALLENGES = {
  eyebrow: "Business Challenges & Our Oracle CX Solutions",
  heading: "The Gap Between Fragmented CX and a Connected Oracle Platform",
  intro: "Side by side, the cost of disconnected customer data versus a properly configured Oracle CX platform is hard to ignore.",
  pairs: [
    { challenge: "Customer data scattered across sales, service, and marketing systems", solution: "A unified Customer 360 profile shared across every Oracle CX product" },
    { challenge: "Slow, error-prone quote-to-cash cycles that stall revenue", solution: "Oracle CPQ automation with built-in approval workflows" },
    { challenge: "Fragmented, inconsistent service experience across channels", solution: "Omnichannel service unified on one connected CX platform" },
    { challenge: "Legacy CRM limiting AI and automation adoption", solution: "Oracle CX's native AI layer built directly into every workflow" },
  ],
};

const PROCESS = {
  eyebrow: "Oracle CX Implementation Process",
  heading: "A Structured Path From Discovery to Continuous Optimization",
  intro: "No surprises, no scope creep. Our Oracle CX delivery methodology has been refined across enterprise engagements.",
  stages: [
    { name: "Discovery", description: "Mapping your current sales, service, and marketing processes." },
    { name: "Business Process Mapping", description: "Identifying gaps across every customer touchpoint." },
    { name: "Solution Design", description: "Data model, security, and integration architecture documented." },
    { name: "Configuration", description: "Core CX setup — accounts, pipelines, service workflows." },
    { name: "Integration", description: "Connecting Oracle CX to the systems your teams already run." },
    { name: "Testing", description: "UAT, regression, and security testing completed before go-live." },
    { name: "Deployment", description: "Structured cutover with a dedicated go-live command center." },
    { name: "Continuous Optimization", description: "Ongoing tuning and support after launch." },
  ],
};

const USE_CASES = {
  eyebrow: "Industry Use Cases",
  heading: "Oracle CX Experience Across Complex, Customer-Facing Industries",
  intro: "Every industry brings its own customer journey and compliance constraints — our teams bring specific domain context to each one.",
  items: [
    { icon: Ico.cart, title: "Retail & Consumer Goods", outcome: "Unified loyalty and commerce across every channel." },
    { icon: Ico.bank, title: "Financial Services", outcome: "Advisor and service workflows tied to one client record." },
    { icon: Ico.shield, title: "Healthcare", outcome: "Patient engagement connected to service and scheduling." },
    { icon: Ico.factory, title: "Manufacturing", outcome: "Quote-to-cash automation across dealer and direct sales." },
    { icon: Ico.chip, title: "High Tech", outcome: "Renewal and upsell workflows driven by usage data." },
    { icon: Ico.signal, title: "Telecommunications", outcome: "Omnichannel support across billing and service requests." },
  ],
};

const AI_CX = {
  eyebrow: "AI & Automation in Oracle CX",
  heading: "AI That Works Inside Your Customer Workflows",
  intro: "Embedded AI becomes valuable only when it's tuned against your own customer data — not a generic model.",
  items: [
    { icon: Ico.target, title: "AI-Powered Lead Scoring", description: "Leads ranked and routed automatically against your real conversion data." },
    { icon: Ico.robot, title: "Conversational Commerce", description: "AI-guided buying assistants embedded directly in the storefront." },
    { icon: Ico.eye, title: "Predictive Customer Insights", description: "Churn and upsell signals surfaced before they show up in a report." },
    { icon: Ico.bolt, title: "Automated Quote-to-Cash", description: "CPQ approvals cleared automatically within policy thresholds." },
    { icon: Ico.headset, title: "AI Service Copilot", description: "A conversational assistant that helps agents resolve cases faster." },
    { icon: Ico.sparkle, title: "Next-Best-Action Recommendations", description: "Guidance surfaced directly on the account and case record." },
  ],
};

const WHY_MIRKETA = {
  eyebrow: "Why Choose Mirketa",
  heading: "An Oracle CX Partner That Owns the Customer Outcome",
  intro: "Hundreds of partners can activate CX modules. Fewer can tie every decision back to a measurable customer outcome.",
  items: [
    { icon: Ico.award, title: "Certified Oracle CX Consultants", description: "Every consultant holds active Oracle CX Cloud certifications." },
    { icon: Ico.network, title: "Proven CRM Modernization Framework", description: "A structured, sprint-based methodology refined across engagements." },
    { icon: Ico.compass, title: "Industry-Specific Expertise", description: "Context specific to your sector's customer journey and compliance needs." },
    { icon: Ico.robot, title: "AI Accelerators", description: "Pre-built frameworks that cut implementation time without cutting quality." },
    { icon: Ico.globe, title: "Global Delivery Model", description: "Follow-the-sun coverage for multi-region enterprise rollouts." },
    { icon: Ico.headset, title: "End-to-End Support", description: "One team from discovery through post-launch optimization." },
  ],
};

const METRICS = {
  eyebrow: "Customer Success Metrics",
  heading: "What Our Oracle CX Clients Have Achieved",
  intro: "These are the outcomes our enterprise clients report after their Oracle CX engagement.",
  stats: [
    { value: "100+", label: "CX Projects Delivered" },
    { value: "60+", label: "Certified Consultants" },
    { value: "85+", label: "Enterprise Clients" },
    { value: "13", label: "Countries Served" },
    { value: "96%", label: "Customer Satisfaction" },
  ],
};

const CASE_STUDIES = {
  eyebrow: "Case Studies",
  heading: "Real Oracle CX Outcomes From Real Deployments",
  intro: "Anonymized results from recent Oracle CX engagements across industries.",
  cases: [
    {
      title: "Global Retailer Unifies Sales and Service on Oracle CX",
      industry: "Retail",
      challenge: "Sales, service, and loyalty data lived in three disconnected systems, leaving agents blind to a customer's full history.",
      solution: "We implemented a unified Customer 360 across Oracle Sales, Service, and Loyalty on a single connected platform.",
      outcome: "Agents now resolve cases in one screen instead of three, with loyalty and purchase history visible in real time.",
      metrics: [{ value: "38%", label: "Faster Case Resolution" }, { value: "2.1x", label: "Loyalty Engagement" }, { value: "94%", label: "CSAT" }],
    },
    {
      title: "B2B Manufacturer Cuts Quote Turnaround by 68% With Oracle CPQ",
      industry: "Manufacturing",
      challenge: "Complex, multi-part quotes required manual approval chains that routinely took over a week to complete.",
      solution: "We deployed Oracle CPQ with automated approval workflows tied directly to deal size and discount thresholds.",
      outcome: "Sales reps now generate accurate, approved quotes in hours instead of weeks.",
      metrics: [{ value: "68%", label: "Faster Quote Turnaround" }, { value: "22%", label: "Higher Win Rate" }, { value: "$1.8M", label: "Annual ROI" }],
    },
  ],
};

const FAQS = [
  { q: "What is Oracle CX Consulting & Development?", a: "Oracle CX Consulting & Development is the process of implementing, modernizing, and optimizing Oracle's Customer Experience suite — Sales, Service, Marketing, Commerce, and CPQ — configured to your organization's go-to-market model." },
  { q: "How long does an Oracle CX implementation take?", a: "A focused single-product implementation typically takes 3–4 months. Multi-product deployments spanning Sales, Service, and Commerce can take 8–12 months depending on scope and integration complexity." },
  { q: "Can you migrate us from a legacy CRM?", a: "Yes. We migrate account, opportunity, and case data from legacy CRMs, including deduplication and validation, so you start on Oracle CX with a trustworthy foundation." },
  { q: "What Oracle CX products do you implement?", a: "We implement Oracle Sales, Oracle Service, Oracle Marketing, Oracle Commerce, Oracle CPQ, and Oracle Loyalty, configured to work together as one connected platform." },
  { q: "How does Oracle CX integrate with other systems?", a: "We integrate Oracle CX with Oracle ERP, Oracle HCM, and third-party systems using REST APIs and Oracle Integration Cloud, so customer data flows without manual re-entry." },
  { q: "What AI capabilities does Oracle CX include?", a: "Oracle CX includes embedded AI for lead scoring, predictive customer insights, and next-best-action recommendations. We configure these against your own customer data so recommendations reflect how your business actually sells and serves." },
  { q: "Do you provide support after go-live?", a: "Yes. Every implementation includes a structured hypercare period immediately after go-live. Clients can transition into an ongoing managed services retainer for continued optimization." },
  { q: "Are you a certified Oracle CX implementation partner?", a: "Yes. Mirketa's consultants hold active Oracle CX Cloud certifications, backed by a verified delivery track record across enterprise customer experience engagements." },
  { q: "Can Oracle CX support B2B and B2C commerce together?", a: "Yes. Oracle Commerce supports both B2B and B2C storefronts on a single platform, connected directly to the same pricing, inventory, and CPQ data used by your sales team." },
];

const FINAL_CTA = {
  heading: "Transform Your Customer Experience with Oracle CX",
  description: "Partner with Mirketa's certified Oracle CX consultants to implement, modernize, and optimize your sales, service, and commerce systems — or speak with an Oracle CX expert before you commit to a roadmap.",
  primaryCta: { label: "Schedule Consultation", href: "#contact" },
  secondaryCta: { label: "Talk to an Oracle CX Expert", href: "#contact" },
};

const SEO = {
  title: "Oracle CX Consulting & Development Services | Mirketa",
  description:
    "Mirketa's certified Oracle CX consultants deliver Oracle Sales, Service, Marketing, Commerce, and CPQ implementation, CRM modernization, and AI-driven customer engagement.",
  canonical: "https://mirketa.us/oracle-cx-consulting-development/",
  keywords: [
    "Oracle CX Consulting",
    "Oracle CX Development",
    "Oracle CX Implementation",
    "Oracle CX Services",
    "Oracle Customer Experience",
    "Oracle CRM Consulting",
    "Oracle Sales Cloud",
    "Oracle Service Cloud",
    "Oracle Marketing Cloud",
    "Oracle Commerce Cloud",
    "Oracle CPQ",
    "Oracle CX Partner",
  ],
  schema: [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "Oracle CX Consulting and Development Services",
      provider: { "@type": "Organization", name: "Mirketa Inc.", url: "https://mirketa.us" },
      name: "Oracle CX Consulting & Development Services",
      description:
        "End-to-end Oracle CX consulting, implementation, CRM modernization, integration, and AI-driven customer engagement across Sales, Service, Marketing, Commerce, and CPQ.",
      areaServed: "Global",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://mirketa.us/" },
        { "@type": "ListItem", position: 2, name: "Oracle Fusion Applications Implementation", item: "https://mirketa.us/oracle-fusion-applications-implementation/" },
        { "@type": "ListItem", position: 3, name: "Oracle CX Consulting & Development Services", item: "https://mirketa.us/oracle-cx-consulting-development/" },
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

export default function CxConsulting() {
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

      gsap.utils.toArray(".ocx-reveal").forEach((el) => {
        gsap.from(el, {
          opacity: prefersReduced ? 1 : 0,
          y: prefersReduced ? 0 : 32,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      gsap.utils.toArray(".ocx-reveal-left").forEach((el) => {
        gsap.from(el, {
          opacity: prefersReduced ? 1 : 0,
          x: prefersReduced ? 0 : -30,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      gsap.utils.toArray(".ocx-reveal-right").forEach((el) => {
        gsap.from(el, {
          opacity: prefersReduced ? 1 : 0,
          x: prefersReduced ? 0 : 30,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      gsap.utils.toArray(".ocx-reveal-stagger").forEach((el) => {
        gsap.from(el.children, {
          opacity: prefersReduced ? 1 : 0,
          y: prefersReduced ? 0 : 26,
          duration: 0.6,
          stagger: 0.06,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      gsap.utils.toArray(".ocx-zoom-in").forEach((el) => {
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
    <div className="oracle-cx-consulting">
      <Seo {...SEO} />
      <HeroSection heroTextRef={heroTextRef} heroRef={heroRef} />
      <TrustedBySection />

      <section className="ocx-l3-layout" aria-label="Oracle CX Consulting details">
        <div className="container ocx-l3-layout__grid">
          <L3SideNav eyebrow="Oracle Fusion Applications" items={L3_ITEMS} activeHref={location.pathname} ariaLabel="Oracle Fusion Applications Implementation sub-pages" />
          <div className="ocx-l3-layout__content">
            <ServicesSection />
            <ProductsSection />
            <ChallengesSection />
            <ProcessSection />
            <UseCasesSection />
            <AiCxSection />
            <WhyMirketaSection />
            <MetricsSection />
          </div>
        </div>
      </section>

      <CaseStudiesSection />
      <FaqSection />
      <FinalCtaSection />
      <ConsultationSection
        eyebrow="Get Started"
        heading="Schedule a Free Oracle CX Consultation"
        description="Tell us about your current sales, service, and commerce systems and where your customer experience is falling short — an Oracle CX expert will follow up within one business day."
        formTitle="Schedule a Free Oracle CX Consultation"
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
    <div className={`ocx-sticky-cta ${visible ? "is-visible" : ""}`} aria-hidden={!visible}>
      <a href="#contact" className="btn btn-primary ocx-btn" tabIndex={visible ? 0 : -1}>
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
    <section ref={heroRef} className="ocx-hero" style={{ backgroundImage: `url("${Images.heroOracleCxConsulting}")` }} aria-label="Oracle CX Consulting & Development by Mirketa">
      <div className="ocx-hero__scrim" />
      <div className="container">
        <Breadcrumb items={BREADCRUMB} className="ocx-breadcrumb" />
        <div className="ocx-hero__inner">
          <div ref={heroTextRef} className="ocx-hero__text">
            <span className="ocx-badge">
              <span className="ocx-badge__spark" aria-hidden="true">✦</span> {HERO.badge}
            </span>
            <h1>{HERO.title}</h1>
            <p className="ocx-hero__description">{HERO.description}</p>
            <div className="ocx-hero__ctas">
              <a href={HERO.primaryCta.href} className="btn btn-primary ocx-btn">
                {HERO.primaryCta.label} <span aria-hidden="true">→</span>
              </a>
              <a href={HERO.secondaryCta.href} className="btn btn-secondary ocx-btn">
                {HERO.secondaryCta.label}
              </a>
            </div>
            <ul className="ocx-hero__metrics">
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
            className="ocx-hero__visual ocx-zoom-in"
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
    <section className="ocx-trusted" aria-label="Trusted clients">
      <div className="container ocx-trusted__inner">
        <p className="ocx-trusted__label">Trusted Clients</p>
        <div className="ocx-trusted__track" role="list">
          <div className="ocx-trusted__marquee">
            {loop.map((b, i) => (
              <div className="ocx-trusted__badge" role="listitem" key={`${b.label}-${i}`}>
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
// ORACLE CX CONSULTING SERVICES — 3-col compact card grid
// ============================================================

function ServicesSection() {
  return (
    <section className="ocx-services" id="services" aria-labelledby="ocx-services-heading">
      <div className="ocx-services__head">
        <div>
          <p className="ocx-eyebrow">{SERVICES.eyebrow}</p>
          <h2 id="ocx-services-heading">{SERVICES.heading}</h2>
          <p className="ocx-section-intro">{SERVICES.intro}</p>
        </div>
      </div>
      <div className="ocx-services__grid ocx-reveal-stagger">
        {SERVICES.items.map((s) => (
          <div className="ocx-service-card" key={s.title}>
            <span className="ocx-service-card__icon">{s.icon}</span>
            <h3>{s.title}</h3>
            <p>{s.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ============================================================
// ORACLE CX PRODUCTS — accessible tabs
// ============================================================

function ProductsSection() {
  const [activeKey, setActiveKey] = useState(PRODUCTS.items[0].key);
  const tabRefs = useRef([]);
  const activeIndex = PRODUCTS.items.findIndex((p) => p.key === activeKey);
  const active = PRODUCTS.items[activeIndex];

  const focusTab = (index) => {
    const wrapped = (index + PRODUCTS.items.length) % PRODUCTS.items.length;
    setActiveKey(PRODUCTS.items[wrapped].key);
    tabRefs.current[wrapped]?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowRight") { e.preventDefault(); focusTab(activeIndex + 1); }
    else if (e.key === "ArrowLeft") { e.preventDefault(); focusTab(activeIndex - 1); }
    else if (e.key === "Home") { e.preventDefault(); focusTab(0); }
    else if (e.key === "End") { e.preventDefault(); focusTab(PRODUCTS.items.length - 1); }
  };

  return (
    <section className="ocx-products" aria-labelledby="ocx-products-heading">
      <p className="ocx-eyebrow">{PRODUCTS.eyebrow}</p>
      <h2 id="ocx-products-heading">{PRODUCTS.heading}</h2>
      <p className="ocx-section-intro">{PRODUCTS.intro}</p>

      <div className="ocx-products__tablist" role="tablist" aria-label="Oracle CX products" onKeyDown={handleKeyDown}>
        {PRODUCTS.items.map((p, i) => (
          <button
            key={p.key}
            ref={(el) => (tabRefs.current[i] = el)}
            role="tab"
            id={`ocx-tab-${p.key}`}
            aria-selected={activeKey === p.key}
            aria-controls={`ocx-panel-${p.key}`}
            tabIndex={activeKey === p.key ? 0 : -1}
            className={`ocx-products__tab ${activeKey === p.key ? "is-active" : ""}`}
            onClick={() => setActiveKey(p.key)}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div
        className="ocx-products__panel ocx-reveal"
        role="tabpanel"
        id={`ocx-panel-${active.key}`}
        aria-labelledby={`ocx-tab-${active.key}`}
        tabIndex={0}
      >
        <h3>{active.title}</h3>
        <p>{active.description}</p>
      </div>
    </section>
  );
}

// ============================================================
// BUSINESS CHALLENGES & OUR ORACLE CX SOLUTIONS — paired comparison
// ============================================================

function ChallengesSection() {
  return (
    <section className="ocx-challenges" aria-labelledby="ocx-challenges-heading">
      <p className="ocx-eyebrow">{CHALLENGES.eyebrow}</p>
      <h2 id="ocx-challenges-heading">{CHALLENGES.heading}</h2>
      <p className="ocx-section-intro">{CHALLENGES.intro}</p>
      <div className="ocx-challenges__list ocx-reveal-stagger">
        {CHALLENGES.pairs.map((pair) => (
          <div className="ocx-challenge-row" key={pair.challenge}>
            <div className="ocx-challenge-row__cell ocx-challenge-row__cell--challenge">
              <span aria-hidden="true">{Ico.cross}</span>
              <p>{pair.challenge}</p>
            </div>
            <div className="ocx-challenge-row__cell ocx-challenge-row__cell--solution">
              <span aria-hidden="true">{Ico.check}</span>
              <p>{pair.solution}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ============================================================
// ORACLE CX IMPLEMENTATION PROCESS — zigzag alternating timeline
// ============================================================

function ProcessSection() {
  return (
    <section className="ocx-process" aria-labelledby="ocx-process-heading">
      <p className="ocx-eyebrow">{PROCESS.eyebrow}</p>
      <h2 id="ocx-process-heading">{PROCESS.heading}</h2>
      <p className="ocx-section-intro">{PROCESS.intro}</p>
      <div className="ocx-process__zigzag ocx-reveal-stagger">
        {PROCESS.stages.map((s, i) => (
          <div className={`ocx-process__row ${i % 2 === 1 ? "ocx-process__row--reverse" : ""}`} key={s.name}>
            <div className="ocx-process__card">
              <span className="ocx-process__num">{String(i + 1).padStart(2, "0")}</span>
              <h3>{s.name}</h3>
              <p>{s.description}</p>
            </div>
            <div className="ocx-process__spacer" aria-hidden="true" />
          </div>
        ))}
        <div className="ocx-process__line" aria-hidden="true" />
      </div>
    </section>
  );
}

// ============================================================
// INDUSTRY USE CASES — outcome-labeled cards
// ============================================================

function UseCasesSection() {
  return (
    <section className="ocx-usecases" aria-labelledby="ocx-usecases-heading">
      <p className="ocx-eyebrow">{USE_CASES.eyebrow}</p>
      <h2 id="ocx-usecases-heading">{USE_CASES.heading}</h2>
      <p className="ocx-section-intro">{USE_CASES.intro}</p>
      <div className="ocx-usecases__grid ocx-reveal-stagger">
        {USE_CASES.items.map((u) => (
          <div className="ocx-usecase-card" key={u.title}>
            <span className="ocx-usecase-card__icon">{u.icon}</span>
            <div>
              <h3>{u.title}</h3>
              <p>{u.outcome}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ============================================================
// AI & AUTOMATION IN ORACLE CX — inline icon-left tiles
// ============================================================

function AiCxSection() {
  return (
    <section className="ocx-ai" aria-labelledby="ocx-ai-heading">
      <p className="ocx-eyebrow">{AI_CX.eyebrow}</p>
      <h2 id="ocx-ai-heading">{AI_CX.heading}</h2>
      <p className="ocx-section-intro">{AI_CX.intro}</p>
      <div className="ocx-ai__grid ocx-reveal-stagger">
        {AI_CX.items.map((a) => (
          <div className="ocx-ai-tile" key={a.title}>
            <span>{a.icon}</span>
            <div>
              <h3>{a.title}</h3>
              <p>{a.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ============================================================
// WHY CHOOSE MIRKETA — top-accent highlight cards
// ============================================================

function WhyMirketaSection() {
  return (
    <section className="ocx-why" aria-labelledby="ocx-why-heading">
      <p className="ocx-eyebrow">{WHY_MIRKETA.eyebrow}</p>
      <h2 id="ocx-why-heading">{WHY_MIRKETA.heading}</h2>
      <p className="ocx-section-intro">{WHY_MIRKETA.intro}</p>
      <div className="ocx-why__grid ocx-reveal-stagger">
        {WHY_MIRKETA.items.map((w) => (
          <div className="ocx-why-card" key={w.title}>
            <span className="ocx-why-card__icon">{w.icon}</span>
            <h3>{w.title}</h3>
            <p>{w.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ============================================================
// CUSTOMER SUCCESS METRICS — inset divided single row
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
    <div className="ocx-metric-stat" ref={ref}>
      <strong>{display}</strong>
      <span>{label}</span>
    </div>
  );
}

function MetricsSection() {
  return (
    <section className="ocx-metrics" aria-labelledby="ocx-metrics-heading">
      <div className="ocx-metrics__card ocx-reveal">
        <p className="ocx-eyebrow">{METRICS.eyebrow}</p>
        <h2 id="ocx-metrics-heading">{METRICS.heading}</h2>
        <p className="ocx-section-intro">{METRICS.intro}</p>
        <div className="ocx-metrics__row ocx-reveal-stagger">
          {METRICS.stats.map((s) => (
            <AnimatedCounter key={s.label} value={s.value} label={s.label} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// CASE STUDIES — plural, 2-card grid
// ============================================================

function CaseStudiesSection() {
  return (
    <section className="section ocx-cases" aria-labelledby="ocx-cases-heading">
      <div className="container">
        <div className="section-heading ocx-reveal">
          <p className="ocx-eyebrow">{CASE_STUDIES.eyebrow}</p>
          <h2 id="ocx-cases-heading">{CASE_STUDIES.heading}</h2>
          <p>{CASE_STUDIES.intro}</p>
        </div>
        <div className="ocx-cases__grid ocx-reveal-stagger">
          {CASE_STUDIES.cases.map((c) => (
            <div className="ocx-case-card" key={c.title}>
              <span className="ocx-case-card__tag">{c.industry}</span>
              <h3>{c.title}</h3>
              <dl className="ocx-case-card__fields">
                <div><dt>Challenge</dt><dd>{c.challenge}</dd></div>
                <div><dt>Solution</dt><dd>{c.solution}</dd></div>
                <div><dt>Outcome</dt><dd>{c.outcome}</dd></div>
              </dl>
              <div className="ocx-case-card__metrics">
                {c.metrics.map((m) => (
                  <div key={m.label}>
                    <strong>{m.value}</strong>
                    <span>{m.label}</span>
                  </div>
                ))}
              </div>
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
  const [query, setQuery] = useState("");
  const [openIndex, setOpenIndex] = useState(-1);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return FAQS;
    return FAQS.filter((item) => item.q.toLowerCase().includes(q) || item.a.toLowerCase().includes(q));
  }, [query]);

  return (
    <section className="section ocx-faq" aria-labelledby="ocx-faq-heading">
      <div className="container">
        <div className="section-heading ocx-reveal">
          <p className="ocx-eyebrow">FAQ</p>
          <h2 id="ocx-faq-heading">Frequently Asked Questions About Oracle CX Consulting</h2>
        </div>
        <div className="ocx-faq__search-wrap ocx-reveal">
          <label htmlFor="ocx-faq-search" className="visually-hidden">
            Search frequently asked questions
          </label>
          <input
            id="ocx-faq-search"
            type="search"
            className="ocx-faq__search"
            placeholder="Ask a question — e.g. &quot;CPQ&quot;, &quot;integrations&quot;, &quot;AI&quot;..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpenIndex(-1);
            }}
          />
        </div>
        <div className="ocx-faq__list ocx-reveal">
          {filtered.length === 0 ? (
            <p className="ocx-faq__empty">No questions match &ldquo;{query}&rdquo;. Try a different search term.</p>
          ) : (
            filtered.map((item, i) => {
              const open = openIndex === i;
              const panelId = `ocx-faq-panel-${i}`;
              return (
                <div className={`ocx-faq-item ${open ? "is-open" : ""}`} key={item.q}>
                  <button type="button" className="ocx-faq-item__question" aria-expanded={open} aria-controls={panelId} onClick={() => setOpenIndex(open ? -1 : i)}>
                    <span>{item.q}</span>
                    <span className="ocx-faq-item__icon" aria-hidden="true">{open ? "−" : "+"}</span>
                  </button>
                  <div id={panelId} className="ocx-faq-item__answer" role="region" hidden={!open}>
                    <p>{item.a}</p>
                  </div>
                </div>
              );
            })
          )}
        </div>
        <p className="ocx-faq__links">
          Related reading: <Link to="/oracle-fusion-applications-implementation">Oracle Fusion Applications Implementation</Link>,{" "}
          <Link to="/oracle-fusion/erp-consulting">Oracle Cloud ERP Consulting</Link>,{" "}
          <Link to="/oracle-fusion/hcm-consulting">Oracle HCM Consulting</Link>,{" "}
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
    <section className="ocx-final-cta ocx-reveal" aria-labelledby="ocx-final-cta-heading">
      <div className="container ocx-final-cta__inner">
        <h2 id="ocx-final-cta-heading">{FINAL_CTA.heading}</h2>
        <p>{FINAL_CTA.description}</p>
        <div className="ocx-final-cta__ctas">
          <a href={FINAL_CTA.primaryCta.href} className="btn btn-primary ocx-btn">
            {FINAL_CTA.primaryCta.label} <span aria-hidden="true">→</span>
          </a>
          <a href={FINAL_CTA.secondaryCta.href} className="btn btn-secondary ocx-btn">
            {FINAL_CTA.secondaryCta.label}
          </a>
        </div>
      </div>
    </section>
  );
}
