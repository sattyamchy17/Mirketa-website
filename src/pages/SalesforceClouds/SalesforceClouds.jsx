import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Images } from "../../assets/images/index.js";
import Seo from "../../components/Seo/Seo.jsx";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb.jsx";
import HeroVisual from "../../components/HeroVisual/HeroVisual.jsx";
import ConsultationSection from "../../components/ConsultationSection/ConsultationSection.jsx";
import "./SalesforceClouds.css";

gsap.registerPlugin(ScrollTrigger);

// ============================================================
// ICONS — small inline SVGs for component-local iconography
// ============================================================

const Ico = {
  target: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.4" /><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.3" opacity="0.6" /><circle cx="12" cy="12" r="1.2" fill="currentColor" /></svg>
  ),
  headset: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 13a8 8 0 0116 0v4" stroke="currentColor" strokeWidth="1.5" /><rect x="3" y="13" width="4" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4" /><rect x="17" y="13" width="4" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4" /></svg>
  ),
  megaphone: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 10v4h3l6 4V6L6 10H3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="M17 8a5 5 0 010 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
  ),
  heartbeat: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 21s-7-4-7-10V5l7-3 7 3v6c0 6-7 10-7 10z" stroke="currentColor" strokeWidth="1.4" /><path d="M8 12h2l1.5-3 2 6 1.5-3H16" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  heart: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 20s-7-4.2-7-9.6C5 7 7.2 5 9.8 5c1 0 2 .4 2.2 1.2C12.2 5.4 13.2 5 14.2 5 16.8 5 19 7 19 10.4 19 15.8 12 20 12 20z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  window: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" /><path d="M3 9h18M9 9v11" stroke="currentColor" strokeWidth="1.3" opacity="0.6" /></svg>
  ),
  cart: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 4h2l2.2 11h10.6L20 7H6.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /><circle cx="9" cy="20" r="1.3" fill="currentColor" /><circle cx="17" cy="20" r="1.3" fill="currentColor" /></svg>
  ),
  tag: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3l8 8-8.5 8.5a1.5 1.5 0 01-2.1 0L3.5 13.6a1.5 1.5 0 010-2.1L12 3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><circle cx="9" cy="8" r="1.6" fill="currentColor" /></svg>
  ),
  factory: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 20V11l5 3.5V11l5 3.5V9l5 4v7H3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  bank: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 21V9l8-5 8 5v12H4z" stroke="currentColor" strokeWidth="1.4" /><path d="M9 21v-6M15 21v-6" stroke="currentColor" strokeWidth="1.3" /></svg>
  ),
  graduation: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M2 8l10-4 10 4-10 4-10-4z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M6 10v5c0 1.5 3 3 6 3s6-1.5 6-3v-5" stroke="currentColor" strokeWidth="1.4" /></svg>
  ),
  database: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><ellipse cx="12" cy="5" rx="7" ry="2.5" stroke="currentColor" strokeWidth="1.4" /><path d="M5 5v14c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5V5" stroke="currentColor" strokeWidth="1.4" /></svg>
  ),
  unify: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="7" cy="7" r="3.4" stroke="currentColor" strokeWidth="1.4" /><circle cx="17" cy="7" r="3.4" stroke="currentColor" strokeWidth="1.4" /><circle cx="12" cy="17" r="3.4" stroke="currentColor" strokeWidth="1.4" /><path d="M9.5 9.3L11 14M14.5 9.3L13 14" stroke="currentColor" strokeWidth="1.2" opacity="0.6" /></svg>
  ),
  robot: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="5" y="9" width="14" height="10" rx="3" stroke="currentColor" strokeWidth="1.5" /><path d="M12 5v4M9 14h.01M15 14h.01" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /><circle cx="12" cy="4" r="1.4" fill="currentColor" /></svg>
  ),
  layers: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3l8 4-8 4-8-4 8-4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="M4 11l8 4 8-4M4 15l8 4 8-4" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" opacity="0.6" /></svg>
  ),
  lock: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="5" y="11" width="14" height="9" rx="2" stroke="currentColor" strokeWidth="1.5" /><path d="M8 11V7.5a4 4 0 018 0V11" stroke="currentColor" strokeWidth="1.5" /></svg>
  ),
  rocket: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 2c3 2 5 6 5 10-2 1-4 1-5 0-1 1-3 1-5 0 0-4 2-8 5-10z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M9 15l-3 5M15 15l3 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
  ),
  award: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="8" r="5" stroke="currentColor" strokeWidth="1.4" /><path d="M8.5 12.5L7 21l5-2.5L17 21l-1.5-8.5" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  check: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12.5l5 5L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  chevron: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
};

// ============================================================
// DATA — content sourced verbatim from
// https://mirketa.us/salesforce-clouds/, cross-referenced with
// real, previously-established Mirketa facts on this site
// (see src/pages/SalesforceConsulting) where the source page
// itself only showed unrendered "0" stat placeholders.
// ============================================================

const BREADCRUMB = [
  { label: "Home", href: "/" },
  { label: "Platforms & Technology", href: "/platforms/salesforce/development-consulting" },
  { label: "Salesforce Clouds" },
];

const HERO = {
  badge: "Salesforce Cloud Solutions",
  title: "Every Salesforce Cloud. One Trusted Partner.",
  description:
    "From Sales Cloud to Health Cloud, Mirketa's certified consultants implement, integrate, and optimize the full Salesforce ecosystem — so your teams can move faster and your customers feel the difference.",
  primaryCta: { label: "Talk to a Salesforce Cloud Specialist", href: "#contact" },
  secondaryCta: { label: "All Salesforce Services", href: "/platforms/salesforce/development-consulting" },
  trustBadges: ["Certified Salesforce Partner", "15+ Years Experience", "AI Powered Solutions", "Global Delivery Team"],
};

const HERO_DASHBOARD = {
  title: "Multi-Cloud Delivery Snapshot",
  stats: [
    { label: "Pipeline Accuracy", value: "+38%", caption: "With Einstein Forecasting" },
    { label: "Case Deflection", value: "40%", caption: "Via Agentforce bots" },
    { label: "Certified Experts", value: "200+", caption: "Across every cloud" },
  ],
  rows: [
    { title: "Sales Cloud Rollout", meta: "Regional Bank — Lead routing", status: "68% faster", tone: "good" },
    { title: "Nonprofit Cloud Migration", meta: "NPSP & NPC — Donor management", status: "Live", tone: "good" },
    { title: "Experience Cloud Portal", meta: "Partner site — LWR components", status: "In build", tone: "neutral" },
    { title: "Health Cloud Integration", meta: "HIPAA-aligned architecture", status: "Review", tone: "attention" },
  ],
  floatingCards: [
    { icon: Ico.award, title: "Summit Partner", subtitle: "Highest Salesforce tier" },
    { icon: Ico.robot, title: "Agentforce Ready", subtitle: "Certified AI practice" },
  ],
};

const WHY_CLOUDS = {
  eyebrow: "Why Salesforce Clouds",
  heading: "One Platform, Every Part of Your Business",
  items: [
    { icon: Ico.unify, title: "Unified Customer View", description: "Every team works from the same customer record — no more conflicting data across sales, service, and marketing." },
    { icon: Ico.robot, title: "AI Powered Automation", description: "Einstein and Agentforce turn routine decisions and interactions into automated, explainable workflows." },
    { icon: Ico.layers, title: "Scalable Architecture", description: "Built to grow with you — from a single cloud to a fully connected multi-cloud enterprise platform." },
    { icon: Ico.lock, title: "Secure Cloud Platform", description: "Enterprise-grade security, compliance, and governance built into every implementation from day one." },
    { icon: Ico.rocket, title: "Faster Business Growth", description: "Shorter sales cycles, faster case resolution, and more responsive campaigns compound into measurable growth." },
    { icon: Ico.unify, title: "Seamless Integrations", description: "Every cloud connects cleanly to your ERP, data warehouse, and existing business systems." },
  ],
};

const CLOUDS = [
  {
    key: "nonprofit",
    name: "Nonprofit Cloud",
    tagline: "NPSP + NPC donor & program management",
    icon: Ico.heart,
    headline: "Built for Mission-Driven Organizations",
    body: "Donor, volunteer, and program management built for nonprofits. Mirketa brings deep NPSP and NPC expertise to help you do more with every dollar.",
    features: ["NPSP & NPC implementation & migration", "Donor management & gift processing", "Volunteer & program tracking", "Grant management & outcome reporting"],
  },
  {
    key: "experience",
    name: "Experience Cloud",
    tagline: "Portals, communities & partner sites",
    icon: Ico.window,
    headline: "Portals, Communities & Partner Sites",
    body: "We design and deploy branded Experience Cloud sites that give customers, partners, and employees a seamless, self-service digital experience.",
    features: ["Customer & partner portal design & build", "LWR & Aura component development", "SSO & identity management integration", "Community engagement & gamification"],
  },
];

const MORE_CLOUDS = [
  { icon: Ico.target, name: "Sales Cloud", href: "/platforms/salesforce/clouds/sales-cloud" },
  { icon: Ico.headset, name: "Service Cloud", href: "/platforms/salesforce/clouds/service-cloud" },
  { icon: Ico.megaphone, name: "Marketing Cloud", href: "/platforms/salesforce/clouds/marketing-cloud" },
  { icon: Ico.cart, name: "Commerce Cloud", href: "#contact", slug: "commerce-cloud" },
  { icon: Ico.tag, name: "Revenue Cloud", href: "/platforms/salesforce/clouds/revenue-cloud" },
  { icon: Ico.heartbeat, name: "Health Cloud", href: "/platforms/salesforce/clouds/health-cloud" },
  { icon: Ico.factory, name: "Manufacturing Cloud", href: "/platforms/salesforce/clouds/manufacturing-cloud" },
  { icon: Ico.bank, name: "Financial Services Cloud", href: "#contact", slug: "financial-services-cloud" },
  { icon: Ico.graduation, name: "Education Cloud", href: "#contact", slug: "education-cloud" },
  { icon: Ico.database, name: "Data Cloud", href: "/data-cloud" },
];

const AI_SECTION = {
  eyebrow: "Salesforce AI",
  heading: "The Layer That Makes Every Cloud Smarter",
  intro: "Agentforce, Einstein AI, and Salesforce Data Cloud don't live in a silo — they amplify every cloud you already use. Mirketa's AI practice embeds intelligent automation, predictive scoring, and autonomous agents directly into your Sales, Service, Marketing, and Health Cloud workflows.",
  capabilities: ["Agentforce Bots", "Einstein Copilot", "Predictive Lead Scoring", "Einstein Forecasting", "Data Cloud Unification"],
  results: [
    { value: "+38%", label: "Pipeline Accuracy", note: "With Einstein Forecasting" },
    { value: "40%", label: "Case Deflection", note: "Via Agentforce bots" },
    { value: "3×", label: "Time-to-Insight", note: "Faster with Data Cloud" },
  ],
  cta: { label: "Explore Agentforce", href: "/agentforce" },
};

const PARTNER_STATUS = {
  eyebrow: "Recognized Partner Status",
  heading: "The Credentials Behind Every Cloud Engagement",
  intro: "Mirketa has been a Salesforce partner for 15+ years. We've earned Summit Partner status — the highest tier Salesforce awards — and hold active certifications across every cloud we implement. That means the person configuring your org has done it dozens of times before.",
  items: [
    { icon: Ico.award, title: "Summit Partner", description: "Highest Salesforce partner tier" },
    { icon: Ico.heartbeat, title: "Master Health Partner", description: "Recognized healthcare cloud expertise" },
    { icon: Ico.heart, title: "Nonprofit Partner", description: "NPSP & NPC certified delivery team" },
    { icon: Ico.robot, title: "Agentforce Ready", description: "Certified AI implementation practice" },
  ],
  note: "200+ Certified Experts",
};

const METHODOLOGY = {
  eyebrow: "How We Work",
  heading: "A Process Built for Predictable Results",
  intro: "Every cloud engagement follows the same proven four-phase approach so you always know what's happening, what's next, and what success looks like.",
  phases: [
    { name: "Discovery & Architecture", description: "We map your business processes, data model, and integration landscape before writing a single line of configuration." },
    { name: "Agile Build & Configure", description: "Certified architects and developers build in two-week sprints with demos at every milestone — no surprises at go-live." },
    { name: "UAT & Training", description: "Your team tests every workflow before launch. We provide role-based training so adoption happens on day one." },
    { name: "Go-Live & Optimize", description: "We stay hands-on through launch and beyond — monitoring performance, tuning automations, and adding AI capabilities as you grow." },
  ],
};

const INDUSTRIES = {
  eyebrow: "Industry Solutions",
  heading: "Salesforce Clouds Configured for Your Industry",
  items: [
    { icon: Ico.bank, title: "Financial Services", description: "Wealth management, banking, and insurance CRM solutions" },
    { icon: Ico.factory, title: "Manufacturing", description: "Dealer management and field service optimization" },
    { icon: Ico.tag, title: "Private Equity", description: "Portfolio-wide reporting and standardized deal workflows" },
    { icon: Ico.heartbeat, title: "Healthcare", description: "Patient engagement and clinical workflow automation" },
    { icon: Ico.graduation, title: "Education", description: "Student recruitment and alumni engagement solutions" },
    { icon: Ico.cart, title: "Retail", description: "Unified commerce and personalized customer journeys" },
    { icon: Ico.factory, title: "Wholesale", description: "Distribution visibility and channel partner enablement" },
    { icon: Ico.heart, title: "Nonprofit", description: "Donor management and program delivery optimization" },
    { icon: Ico.robot, title: "Hi-Tech", description: "Subscription revenue, renewals, and product-led growth support" },
  ],
};

const CASE_STUDIES = {
  eyebrow: "Customer Success Stories",
  heading: "Proof That the Right Cloud, Configured Right, Pays Off",
  intro: "A sample of the measurable outcomes our multi-cloud clients report — full write-ups live on our Salesforce Development & Consulting page.",
  items: [
    { title: "Regional Bank Cuts Lead Response Time by 68%", stat: "68%", label: "Faster Response", cloud: "Sales Cloud" },
    { title: "Industrial Manufacturer Unifies 6 Systems Into One CRM", stat: "6→1", label: "Systems Unified", cloud: "Service Cloud" },
    { title: "B2B SaaS Company Scales Support Without Adding Headcount", stat: "62%", label: "Auto-Resolved", cloud: "Agentforce" },
  ],
  cta: { label: "Read the Full Case Studies", href: "/platforms/salesforce/development-consulting#svc-results-heading" },
};

const TECH_STACK = {
  eyebrow: "Integrates With Your Stack",
  heading: "Every Cloud Connects to the Systems You Already Run",
  intro: "ERP, iPaaS, and cloud infrastructure platforms connect cleanly into every Salesforce Cloud we implement. For the full integration catalog, see our Salesforce Development & Consulting page.",
  items: ["MuleSoft", "Boomi", "SAP", "Oracle ERP", "NetSuite", "AWS", "Azure", "Google Cloud", "REST APIs", "GraphQL", "Data Cloud", "Agentforce"],
};

const FAQS = [
  { q: "Which Salesforce Cloud is right for my business?", a: "The right Salesforce Cloud depends on your primary business goal. Sales Cloud is the best fit if you want to improve pipeline visibility and close rates. Service Cloud is built for support teams managing cases across multiple channels. Marketing Cloud suits businesses running multi-channel campaigns and needing journey automation. Health Cloud is purpose-built for healthcare and life sciences. Nonprofit Cloud (NPSP/NPC) serves mission-driven organizations managing donors and programs. Experience Cloud is the right choice when you need customer portals, partner sites, or employee communities. Most clients use two or more clouds together — our consultants will map your goals to the right combination during a free discovery call." },
  { q: "Can you implement multiple Salesforce Clouds at once?", a: "Yes — and it's often the most efficient approach. Mirketa has delivered multi-cloud implementations combining Sales + Service Cloud, Marketing + Sales Cloud, and Health + Experience Cloud in a single phased engagement. Our architects design a unified data model upfront so each cloud shares clean, consistent data. We use Agile sprints to roll out clouds in parallel or in sequence based on your priorities, reducing overall time-to-value." },
  { q: "How long does it take to implement a Salesforce Cloud?", a: "A single-cloud implementation for a focused team typically takes 8–12 weeks. Multi-cloud or highly customized deployments with complex integrations can run 3–6 months. Your exact timeline depends on data readiness, integration scope, and how many workflows need custom configuration — we provide a detailed estimate after a free discovery call." },
  { q: "What does Salesforce Cloud implementation cost?", a: "Pricing depends on which clouds you're implementing, the number of users and integrations, and how much custom development is required. Most engagements are scoped as fixed-price projects so you know the total investment upfront, with optional managed services retainers for ongoing support after go-live." },
  { q: "Do you offer ongoing support after go-live?", a: "Yes. Every implementation includes a structured hypercare period immediately after launch, and most clients transition into a managed services retainer for ongoing administration, optimization, and user support once their org stabilizes." },
  { q: "Can Salesforce Clouds integrate with our existing ERP or other business systems?", a: "Yes. We regularly integrate Salesforce Clouds with SAP, Oracle ERP, NetSuite, Microsoft Dynamics, and custom-built systems using MuleSoft Anypoint Platform, Boomi, or direct REST/SOAP APIs, with monitoring and error handling built in from day one." },
  { q: "Is my data secure across multiple Salesforce Clouds?", a: "Security and governance are part of the architecture from the first discovery session, not an afterthought. We design role-based access, field-level security, and data-sharing rules that respect your compliance requirements — including HIPAA-aligned architecture for Health Cloud engagements." },
  { q: "Can you migrate us from another CRM into Salesforce Clouds?", a: "Yes. We've migrated organizations from legacy CRMs, spreadsheets, and other platforms into Salesforce, including full data cleansing, deduplication, and validation before go-live so you start with a trustworthy foundation." },
  { q: "How does Salesforce AI fit into these clouds?", a: "Agentforce, Einstein, and Data Cloud aren't separate products bolted on afterward — they're configured directly inside the cloud you're implementing, whether that's Einstein forecasting inside Sales Cloud, Agentforce bots inside Service Cloud, or predictive scoring inside Marketing Cloud." },
  { q: "What is the difference between Sales Cloud and Service Cloud?", a: "Sales Cloud is built around the sales pipeline — leads, opportunities, forecasting, and quoting. Service Cloud is built around post-sale support — cases, omnichannel routing, and knowledge management. Many clients run both on a shared data model so sales and support teams see the same customer history." },
  { q: "Do you provide Salesforce Cloud training for our team?", a: "Yes. Every implementation includes role-based training sessions, recorded walkthroughs, and custom user guides, because a cloud your team doesn't fully understand won't deliver the ROI it should." },
  { q: "Can Nonprofit Cloud work alongside Sales or Marketing Cloud?", a: "Yes. Many mission-driven organizations run Nonprofit Cloud for donor and program management alongside Marketing Cloud for donor communications, or Experience Cloud for volunteer and program portals, all sharing one unified data model." },
  { q: "What makes Mirketa different from other Salesforce implementation partners?", a: "Summit Partner status, active certifications across every cloud we implement, transparent fixed-price options, and a structured methodology that's been refined across 500+ Salesforce projects — not a one-off team assembled for your engagement." },
  { q: "Can you rescue a Salesforce Cloud implementation that isn't working?", a: "Yes — this is a common engagement type. We start with an org health audit to find data quality issues, broken automations, and adoption gaps, then build a prioritized remediation roadmap so you see improvement within weeks, not months." },
  { q: "How do I get started?", a: "Book a free 30-minute discovery call with a certified Salesforce cloud specialist. We'll map your goals to the right cloud (or combination of clouds) and show you what a realistic implementation timeline and budget look like — no commitment required." },
];

const FINAL_CTA = {
  heading: "Ready to Find the Right Salesforce Cloud for Your Business?",
  description: "Book a free 30-minute discovery call with a certified Salesforce cloud specialist. We'll map your goals to the right cloud and show you what a realistic implementation looks like.",
  primaryCta: { label: "Talk to a Salesforce Cloud Specialist", href: "#contact" },
  secondaryCta: { label: "View All Salesforce Services", href: "/platforms/salesforce/development-consulting" },
  trust: "No commitment required · Free discovery call · Response within 1 business day",
};

const GET_IN_TOUCH_LINKS = [
  { label: "Salesforce Development & Consulting", to: "/platforms/salesforce/development-consulting" },
  { label: "Salesforce Data Cloud", to: "/data-cloud" },
  { label: "Agentforce", to: "/agentforce" },
  { label: "AI Consulting", to: "/ai-consulting" },
  { label: "AI Enablement", to: "/ai-enablement" },
];

const SEO = {
  title: "Salesforce Clouds — Consulting & Implementation | Mirketa",
  description:
    "Mirketa implements, integrates, and optimizes every Salesforce Cloud — Sales, Service, Marketing, Health, Nonprofit, and Experience — with 15+ years of certified expertise.",
  canonical: "https://www.mirketa.com/platforms/salesforce/clouds/",
  keywords: [
    "Salesforce Clouds",
    "Salesforce Sales Cloud consulting",
    "Salesforce Service Cloud implementation",
    "Salesforce Marketing Cloud experts",
    "Salesforce Health Cloud partner",
    "Salesforce Nonprofit Cloud consulting",
    "Salesforce Experience Cloud development",
    "multi-cloud Salesforce implementation",
    "Salesforce Summit Partner",
    "Salesforce cloud specialist",
    "Salesforce AI Agentforce Einstein",
    "certified Salesforce consulting partner",
  ],
  schema: [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "Salesforce Cloud Implementation and Consulting",
      provider: { "@type": "Organization", name: "Mirketa Inc.", url: "https://www.mirketa.com" },
      name: "Salesforce Clouds",
      description:
        "Implementation, integration, and optimization services across Sales Cloud, Service Cloud, Marketing Cloud, Health Cloud, Nonprofit Cloud, and Experience Cloud.",
      areaServed: "Global",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.mirketa.com/" },
        { "@type": "ListItem", position: 2, name: "Platforms & Technology", item: "https://www.mirketa.com/platforms/salesforce/development-consulting" },
        { "@type": "ListItem", position: 3, name: "Salesforce Clouds", item: "https://www.mirketa.com/platforms/salesforce/clouds/" },
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

export default function SalesforceClouds() {
  const heroTextRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (heroTextRef.current) {
        gsap.from(heroTextRef.current.children, {
          opacity: 0,
          y: 28,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
        });
      }

      gsap.utils.toArray(".scd-reveal").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 32,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      gsap.utils.toArray(".scd-reveal-stagger").forEach((el) => {
        gsap.from(el.children, {
          opacity: 0,
          y: 26,
          duration: 0.6,
          stagger: 0.06,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="salesforce-clouds">
      <Seo {...SEO} />
      <HeroSection heroTextRef={heroTextRef} />
      <WhyCloudsSection />
      <CloudsSection />
      <AiSection />
      <PartnerStatusSection />
      <MethodologySection />
      <IndustriesSection />
      <CaseStudiesSection />
      <TechStackSection />
      <FaqSection />
      <GetInTouchSection />
      <FinalCtaSection />
      <ConsultationSection
        eyebrow="Get Started"
        heading="Request a Free Salesforce Clouds Consultation"
        description="Tell us which Salesforce Clouds you're running today and where you want to go next — Sales, Service, Marketing, Financial Services, Health, Nonprofit, or Experience Cloud — and how they should work together. A certified Salesforce Cloud specialist will follow up within one business day."
        formTitle="Request a Free Salesforce Clouds Consultation"
      />
    </div>
  );
}

// ============================================================
// HERO
// ============================================================

function HeroSection({ heroTextRef }) {
  return (
    <section className="scd-hero" style={{ backgroundImage: `url("${Images.heroSalesforceClouds}")` }} aria-label="Salesforce Clouds by Mirketa">
      <div className="scd-hero__scrim" />
      <div className="container">
        <Breadcrumb items={BREADCRUMB} className="scd-breadcrumb" />
        <div className="scd-hero__inner">
          <div ref={heroTextRef} className="scd-hero__text">
            <span className="scd-badge">
              <span aria-hidden="true">✦</span> {HERO.badge}
            </span>
            <h1>{HERO.title}</h1>
            <p className="scd-hero__description">{HERO.description}</p>
            <div className="scd-hero__ctas">
              <a href={HERO.primaryCta.href} className="btn btn-primary scd-btn">
                {HERO.primaryCta.label} <span aria-hidden="true">→</span>
              </a>
              <a href={HERO.secondaryCta.href} className="btn btn-secondary scd-btn">
                {HERO.secondaryCta.label}
              </a>
            </div>
            <ul className="scd-hero__metrics">
              {HERO.trustBadges.map((m) => (
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
            className="scd-hero__visual"
          />
        </div>
      </div>
    </section>
  );
}

// ============================================================
// WHY SALESFORCE CLOUDS
// ============================================================

function WhyCloudsSection() {
  return (
    <section className="section scd-why" aria-labelledby="scd-why-heading">
      <div className="container">
        <div className="section-heading scd-reveal">
          <p className="scd-eyebrow">{WHY_CLOUDS.eyebrow}</p>
          <h2 id="scd-why-heading">{WHY_CLOUDS.heading}</h2>
        </div>
        <div className="scd-why__grid scd-reveal-stagger">
          {WHY_CLOUDS.items.map((w) => (
            <div className="scd-why-card" key={w.title}>
              <span className="scd-why-card__icon">{w.icon}</span>
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
// SALESFORCE CLOUDS WE IMPLEMENT — accordion + "also available" strip
// ============================================================

function CloudsSection() {
  const [openIndex, setOpenIndex] = useState(0);

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    const matchIndex = CLOUDS.findIndex((c) => `${c.key}-cloud` === hash);
    if (matchIndex >= 0) {
      setOpenIndex(matchIndex);
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return (
    <section className="section scd-clouds" id="clouds" aria-labelledby="scd-clouds-heading">
      <div className="container">
        <div className="scd-clouds__head scd-reveal">
          <div className="section-heading">
            <p className="scd-eyebrow">Salesforce Clouds We Implement</p>
            <h2 id="scd-clouds-heading">Deep Expertise Across the Clouds That Matter Most</h2>
          </div>
          <img src={Images.illoSalesforceCloudsArchitectureMap} alt="" aria-hidden="true" className="scd-clouds__illo" loading="lazy" />
        </div>

        <div className="scd-clouds__accordion scd-reveal-stagger">
          {CLOUDS.map((c, i) => {
            const open = openIndex === i;
            return (
              <div className={`scd-cloud-item ${open ? "is-open" : ""}`} key={c.key} id={`${c.key}-cloud`}>
                <button
                  type="button"
                  className="scd-cloud-item__header"
                  aria-expanded={open}
                  aria-controls={`scd-cloud-panel-${c.key}`}
                  onClick={() => setOpenIndex(open ? -1 : i)}
                >
                  <span className="scd-cloud-item__icon">{c.icon}</span>
                  <span className="scd-cloud-item__title">
                    <strong>{c.name}</strong>
                    <span>{c.tagline}</span>
                  </span>
                  <span className="scd-cloud-item__chevron" aria-hidden="true">{Ico.chevron}</span>
                </button>
                <div id={`scd-cloud-panel-${c.key}`} className="scd-cloud-item__panel" hidden={!open}>
                  <h3>{c.headline}</h3>
                  <p>{c.body}</p>
                  <ul>
                    {c.features.map((f) => (
                      <li key={f}>
                        <span aria-hidden="true">{Ico.check}</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a href="#contact" className="scd-cloud-item__cta">
                    Discuss {c.name} <span aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        <div className="scd-clouds__more">
          <p className="scd-clouds__more-label">Also Available</p>
          <div className="scd-clouds__more-grid">
            {MORE_CLOUDS.map((m) =>
              m.href.startsWith("/") ? (
                <Link to={m.href} className="scd-more-chip" key={m.name} id={m.slug}>
                  <span aria-hidden="true">{m.icon}</span> {m.name}
                </Link>
              ) : (
                <a href={m.href} className="scd-more-chip" key={m.name} id={m.slug}>
                  <span aria-hidden="true">{m.icon}</span> {m.name}
                </a>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// SALESFORCE AI
// ============================================================

function AiSection() {
  return (
    <section className="section scd-ai" aria-labelledby="scd-ai-heading">
      <div className="container">
        <div className="section-heading scd-reveal">
          <p className="scd-eyebrow">{AI_SECTION.eyebrow}</p>
          <h2 id="scd-ai-heading">{AI_SECTION.heading}</h2>
          <p>{AI_SECTION.intro}</p>
        </div>
        <ul className="scd-ai__chips scd-reveal-stagger">
          {AI_SECTION.capabilities.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
        <div className="scd-ai__results scd-reveal-stagger">
          {AI_SECTION.results.map((r) => (
            <div className="scd-ai-result" key={r.label}>
              <strong>{r.value}</strong>
              <span>{r.label}</span>
              <p>{r.note}</p>
            </div>
          ))}
        </div>
        <div className="scd-ai__cta">
          <Link to={AI_SECTION.cta.href} className="btn btn-primary scd-btn">
            {AI_SECTION.cta.label} <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// RECOGNIZED PARTNER STATUS
// ============================================================

function PartnerStatusSection() {
  return (
    <section className="section scd-partner" aria-labelledby="scd-partner-heading">
      <div className="container">
        <div className="section-heading scd-reveal">
          <p className="scd-eyebrow">{PARTNER_STATUS.eyebrow}</p>
          <h2 id="scd-partner-heading">{PARTNER_STATUS.heading}</h2>
          <p>{PARTNER_STATUS.intro}</p>
        </div>
        <div className="scd-partner__grid scd-reveal-stagger">
          {PARTNER_STATUS.items.map((p) => (
            <div className="scd-partner-card" key={p.title}>
              <span className="scd-partner-card__icon">{p.icon}</span>
              <h3>{p.title}</h3>
              <p>{p.description}</p>
            </div>
          ))}
        </div>
        <p className="scd-partner__note">{PARTNER_STATUS.note}</p>
      </div>
    </section>
  );
}

// ============================================================
// HOW WE WORK
// ============================================================

function MethodologySection() {
  return (
    <section className="section scd-methodology" aria-labelledby="scd-methodology-heading">
      <div className="container">
        <div className="section-heading scd-reveal">
          <p className="scd-eyebrow">{METHODOLOGY.eyebrow}</p>
          <h2 id="scd-methodology-heading">{METHODOLOGY.heading}</h2>
          <p>{METHODOLOGY.intro}</p>
        </div>
        <div className="scd-methodology__grid scd-reveal-stagger">
          {METHODOLOGY.phases.map((p, i) => (
            <div className="scd-phase-card" key={p.name}>
              <span className="scd-phase-card__num">{String(i + 1).padStart(2, "0")}</span>
              <h3>{p.name}</h3>
              <p>{p.description}</p>
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
    <section className="section scd-industries" aria-labelledby="scd-industries-heading">
      <div className="container">
        <div className="section-heading scd-reveal">
          <p className="scd-eyebrow">{INDUSTRIES.eyebrow}</p>
          <h2 id="scd-industries-heading">{INDUSTRIES.heading}</h2>
        </div>
        <div className="scd-industries__grid scd-reveal-stagger">
          {INDUSTRIES.items.map((i) => (
            <div className="scd-industry-card" key={i.title}>
              <span className="scd-industry-card__icon">{i.icon}</span>
              <h3>{i.title}</h3>
              <p>{i.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// CUSTOMER SUCCESS STORIES
// ============================================================

function CaseStudiesSection() {
  return (
    <section className="section scd-cases" aria-labelledby="scd-cases-heading">
      <div className="container">
        <div className="section-heading scd-reveal">
          <p className="scd-eyebrow">{CASE_STUDIES.eyebrow}</p>
          <h2 id="scd-cases-heading">{CASE_STUDIES.heading}</h2>
          <p>{CASE_STUDIES.intro}</p>
        </div>
        <div className="scd-cases__grid scd-reveal-stagger">
          {CASE_STUDIES.items.map((c) => (
            <div className="scd-case-card" key={c.title}>
              <span className="scd-case-card__cloud">{c.cloud}</span>
              <strong className="scd-case-card__stat">{c.stat}</strong>
              <span className="scd-case-card__label">{c.label}</span>
              <p>{c.title}</p>
            </div>
          ))}
        </div>
        <div className="scd-cases__cta scd-reveal">
          <Link to={CASE_STUDIES.cta.href}>{CASE_STUDIES.cta.label} →</Link>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// INTEGRATES WITH YOUR STACK
// ============================================================

function TechStackSection() {
  return (
    <section className="section scd-stack" aria-labelledby="scd-stack-heading">
      <div className="container">
        <div className="section-heading scd-reveal">
          <p className="scd-eyebrow">{TECH_STACK.eyebrow}</p>
          <h2 id="scd-stack-heading">{TECH_STACK.heading}</h2>
          <p>
            ERP, iPaaS, and cloud infrastructure platforms connect cleanly into every Salesforce Cloud we implement. For the full integration catalog, see our{" "}
            <Link to="/platforms/salesforce/development-consulting">Salesforce Development & Consulting</Link> page.
          </p>
        </div>
        <ul className="scd-stack__wall scd-reveal-stagger">
          {TECH_STACK.items.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// ============================================================
// FAQ — live search + accordion
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
    <section className="section scd-faq" aria-labelledby="scd-faq-heading">
      <div className="container">
        <div className="section-heading scd-reveal">
          <p className="scd-eyebrow">FAQ</p>
          <h2 id="scd-faq-heading">Questions We Hear Every Day</h2>
          <p>Straight answers, no jargon.</p>
        </div>
        <div className="scd-faq__search-wrap scd-reveal">
          <label htmlFor="scd-faq-search" className="visually-hidden">
            Search frequently asked questions
          </label>
          <input
            id="scd-faq-search"
            type="search"
            className="scd-faq__search"
            placeholder="Ask a question — e.g. &quot;pricing&quot;, &quot;migration&quot;, &quot;support&quot;..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpenIndex(-1);
            }}
          />
        </div>
        <div className="scd-faq__list scd-reveal">
          {filtered.length === 0 ? (
            <p className="scd-faq__empty">No questions match &ldquo;{query}&rdquo;. Try a different search term.</p>
          ) : (
            filtered.map((item, i) => {
              const open = openIndex === i;
              const panelId = `scd-faq-panel-${i}`;
              return (
                <div className={`scd-faq-item ${open ? "is-open" : ""}`} key={item.q}>
                  <button type="button" className="scd-faq-item__question" aria-expanded={open} aria-controls={panelId} onClick={() => setOpenIndex(open ? -1 : i)}>
                    <span>{item.q}</span>
                    <span className="scd-faq-item__icon" aria-hidden="true">{open ? "−" : "+"}</span>
                  </button>
                  <div id={panelId} className="scd-faq-item__answer" role="region" hidden={!open}>
                    <p>{item.a}</p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// GET IN TOUCH — supporting copy that anchors back to the hero form
// ============================================================

function GetInTouchSection() {
  return (
    <section className="section scd-touch" aria-labelledby="scd-touch-heading">
      <div className="container scd-touch__inner">
        <h2 id="scd-touch-heading">Explore More Ways We Can Help</h2>
        <ul className="scd-touch__links">
          {GET_IN_TOUCH_LINKS.map((l) => (
            <li key={l.label}>
              <Link to={l.to}>{l.label}</Link>
            </li>
          ))}
          <li>
            <Link to="/insights">Customer Success</Link>
          </li>
          <li>
            <Link to="/blog">Blogs</Link>
          </li>
        </ul>
        <a href="#contact" className="btn btn-primary scd-btn">
          Request Your Free Consultation <span aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  );
}

// ============================================================
// FINAL CTA
// ============================================================

function FinalCtaSection() {
  return (
    <section className="scd-final-cta scd-reveal" aria-labelledby="scd-final-cta-heading">
      <div className="container scd-final-cta__inner">
        <h2 id="scd-final-cta-heading">{FINAL_CTA.heading}</h2>
        <p>{FINAL_CTA.description}</p>
        <div className="scd-final-cta__ctas">
          <a href={FINAL_CTA.primaryCta.href} className="btn btn-primary scd-btn">
            {FINAL_CTA.primaryCta.label} <span aria-hidden="true">→</span>
          </a>
          <Link to={FINAL_CTA.secondaryCta.href} className="btn btn-secondary scd-btn">
            {FINAL_CTA.secondaryCta.label}
          </Link>
        </div>
        <p className="scd-final-cta__trust">{FINAL_CTA.trust}</p>
      </div>
    </section>
  );
}
