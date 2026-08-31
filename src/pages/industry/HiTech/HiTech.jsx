import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Images } from "../../../assets/images/index.js";
import { INDUSTRY_PAGES, SALESFORCE_PAGES, AI_PAGES, CLOUD_PAGES } from "../../../config/pageSlugs.js";
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
import "./HiTech.css";

gsap.registerPlugin(ScrollTrigger);

// ============================================================
// SLUG / SEO CONFIGURATION — kept local to this component per
// project convention, sourced from the central pageSlugs.js entry
// so the URL itself still only needs to change in one place.
// ============================================================

export const pageSEO = {
  slug: `${INDUSTRY_PAGES.HI_TECH.slug}/`,
  title: "Hi-Tech Solutions | Mirketa",
  description:
    "Hi-Tech Solutions from Mirketa: SaaS revenue operations, cloud infrastructure modernization, and AI-powered product analytics for software companies.",
};

// ============================================================
// ICONS
// ============================================================

const Ico = {
  check: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12.5l5 5L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  cloud: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 18h10a4 4 0 000-8 5.5 5.5 0 00-10.7-1.7A4.5 4.5 0 007 18z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  code: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 8l-5 4 5 4M15 8l5 4-5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
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
  report: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 3h9l3 3v15H6V3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="M9 13l2-2 2 2 3-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  chip: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="7" y="7" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.4" /><path d="M9 3v4M15 3v4M9 21v-4M15 21v-4M3 9h4M3 15h4M21 9h-4M21 15h-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
  ),
  rocket: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 2c3 2 5 5.5 5 9.5 0 2-1 4-2 5l-3 2-3-2c-1-1-2-3-2-5C7 7.5 9 4 12 2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><circle cx="12" cy="10" r="1.6" stroke="currentColor" strokeWidth="1.3" /></svg>
  ),
};

// ============================================================
// DATA
// ============================================================

const BREADCRUMB_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Industry", href: "/" },
  { label: INDUSTRY_PAGES.HI_TECH.label },
];

const HERO = {
  badge: "Hi-Tech & SaaS Technology Partner",
  title: "Hi-Tech Solutions for Software Companies Scaling Revenue and Product Operations",
  description:
    "Mirketa's Hi-Tech Solutions connect the systems SaaS and technology companies actually run on — CRM, billing, product analytics, and cloud infrastructure — so revenue operations, customer success, and engineering teams work from the same governed data instead of a dozen disconnected dashboards.",
  primaryCta: { label: "Get a Hi-Tech Operations Assessment", href: "#contact" },
  secondaryCta: { label: "Talk to a Hi-Tech Solutions Advisor", href: "#contact" },
  metrics: ["SaaS Revenue Operations Expertise", "Cloud-Native Architecture", "AI-Powered Product Analytics", "Rapid Implementation Cycles"],
};

const HERO_DASHBOARD = {
  title: "SaaS Operations Console",
  stats: [
    { label: "NET REVENUE RETENTION", value: "118%", caption: "Trailing 12 months" },
    { label: "TRIAL-TO-PAID", value: "22%", caption: "Conversion rate" },
    { label: "DEPLOYS / WEEK", value: "12", caption: "Zero unplanned downtime" },
  ],
  rows: [
    { title: "Churn risk score — Acme Corp", meta: "Usage signal flagged 3 weeks pre-renewal", tone: "attention", status: "Reviewing" },
    { title: "CI/CD pipeline — production release", meta: "Automated tests passed", tone: "good", status: "Deployed" },
    { title: "Billing sync — new subscription", meta: "CRM → billing → provisioning", tone: "good", status: "Complete" },
  ],
  floatingCards: [
    { icon: Ico.chip, title: "12 Deploys/Week", subtitle: "Zero unplanned downtime" },
    { icon: Ico.brain, title: "118% NRR", subtitle: "Usage-driven expansion" },
  ],
};

const CHALLENGES = {
  eyebrow: "Industry Challenges",
  heading: "Why SaaS Operations Break Down as Companies Scale",
  intro:
    "Hi-tech and SaaS companies rarely hit a single point of failure. Growth exposes the gaps between the CRM, billing, product, and support systems that were never built to share data.",
  items: [
    { title: "CRM and Billing Data Out of Sync", description: "Sales closes a deal in the CRM, but billing and provisioning don't update automatically, delaying revenue recognition and customer activation." },
    { title: "Product Usage Data Disconnected From Customer Success", description: "Customer success teams manage renewals without visibility into whether the customer is actually using the product." },
    { title: "No Early Warning System for Churn", description: "Account health signals live in a product analytics tool nobody on the revenue team actually checks." },
    { title: "Engineering Velocity Slowed by Fragile Infrastructure", description: "Releases require manual coordination across environments instead of a reliable, automated deployment pipeline." },
  ],
};

const SOLUTION = {
  eyebrow: "Industry Solutions",
  heading: "One Connected Layer Across Revenue, Product, and Engineering",
  paragraphs: [
    "Mirketa's Hi-Tech Solutions start by connecting the systems that already run your business — CRM, billing, product analytics, and support — so a closed deal, a usage spike, or a support escalation shows up everywhere it needs to, automatically.",
    "For companies scaling past their first few hundred customers, we bring the same revenue operations discipline that mature SaaS companies rely on: consistent lead-to-cash processes, product usage data feeding customer success workflows, and churn signals surfaced before a renewal conversation, not during it.",
    "Underneath the applications, we also help engineering teams modernize the cloud infrastructure and deployment pipeline supporting the product, so releases become routine instead of risky, and the platform can scale with the business instead of becoming its constraint.",
  ],
};

const SERVICES = {
  eyebrow: "Services We Offer",
  heading: "Six Ways Mirketa Supports Hi-Tech and SaaS Companies",
  intro: "Every engagement starts with one of these six service lines and expands as your company scales.",
  items: [
    { icon: Ico.compass, title: "Revenue Operations Implementation", description: "CRM, billing, and quote-to-cash processes connected into one consistent lead-to-cash workflow." },
    { icon: Ico.brain, title: "Product Analytics & Usage Intelligence", description: "Product usage data connected to customer success and sales workflows instead of sitting in an isolated dashboard." },
    { icon: Ico.route, title: "Customer Success & Churn Prevention", description: "Account health scoring built from real usage signals, surfaced before renewal conversations, not during them." },
    { icon: Ico.cloud, title: "Cloud Infrastructure Modernization", description: "Infrastructure-as-code and CI/CD pipelines that make releases routine instead of risky." },
    { icon: Ico.chip, title: "AI Feature Development", description: "AI capabilities built into your own product, not just internal tooling, using your existing data responsibly." },
    { icon: Ico.shield, title: "Platform Security & Compliance", description: "SOC 2 and enterprise security requirements built in as you move upmarket to larger accounts." },
  ],
};

const PLATFORM_EXPERTISE = {
  eyebrow: "Platform Expertise",
  heading: "The Platforms Behind Every Hi-Tech Solutions Engagement",
  intro: "We bring proven implementation depth across the platforms hi-tech and SaaS companies already depend on.",
  items: [
    { title: "Salesforce for Revenue Operations", description: "CRM, CPQ, and billing processes connected for a consistent lead-to-cash workflow." },
    { title: "NetSuite for SaaS Financial Operations", description: "Subscription revenue recognition and financial reporting built for how SaaS companies actually bill." },
    { title: "AI-Powered Product & Usage Analytics", description: "Usage data turned into churn signals and expansion opportunities, not just a dashboard." },
    { title: "Cloud-Native Infrastructure", description: "Kubernetes, infrastructure-as-code, and CI/CD pipelines built for a product that needs to scale." },
  ],
};

const AI_AUTOMATION = {
  eyebrow: "AI & Automation",
  heading: "Where AI Actually Moves Metrics for SaaS Companies",
  intro: "These are the AI and automation capabilities Mirketa builds into hi-tech and SaaS engagements once the data foundation is in place.",
  items: [
    { title: "Predictive Churn Scoring", description: "Usage and engagement signals combined into a churn risk score customer success can act on before renewal." },
    { title: "Automated Lead-to-Cash Workflows", description: "Deals close in CRM and flow automatically into billing and provisioning without manual handoffs." },
    { title: "Product Usage Segmentation", description: "Accounts segmented by actual feature usage, not just plan tier, to prioritize expansion outreach." },
    { title: "AI-Assisted Support Triage", description: "Support tickets categorized and routed automatically based on content and account context." },
    { title: "Anomaly Detection in Product Metrics", description: "Unusual drops in usage or performance flagged before they show up in a churn report." },
    { title: "Natural Language Revenue Reporting", description: "Revenue and product teams can ask plain-language questions across connected data instead of building a new report." },
  ],
};

const BENEFITS = {
  eyebrow: "Business Benefits",
  heading: "What Changes Once Revenue, Product, and Engineering Data Connect",
  intro: "These are the outcomes Mirketa's hi-tech and SaaS clients consistently report.",
  stats: [
    { value: "118%", label: "Net Revenue Retention" },
    { value: "22%", label: "Trial-to-Paid Conversion" },
    { value: "12", label: "Deploys Per Week" },
    { value: "40%", label: "Faster Churn Signal Detection" },
  ],
  items: [
    { title: "Revenue Teams Work From One Pipeline", description: "CRM, billing, and provisioning stay in sync, so deals close without manual handoff delays." },
    { title: "Customer Success Sees Usage, Not Just Contracts", description: "Account health scoring built from real product usage data instead of contract renewal dates alone." },
    { title: "Engineering Ships With Confidence", description: "Modern CI/CD pipelines mean releases happen routinely instead of becoming a risk event." },
    { title: "A Platform That Scales With the Business", description: "Cloud infrastructure and data architecture designed to support the next stage of growth, not just the current one." },
  ],
};

const USE_CASES = {
  eyebrow: "Industry Use Cases",
  heading: "Hi-Tech Solutions Across Company Types",
  intro: "Every hi-tech company brings its own product and go-to-market model — our approach adapts to how each one actually operates.",
  items: [
    { icon: Ico.cloud, title: "SaaS Platforms" },
    { icon: Ico.report, title: "Enterprise Software Vendors" },
    { icon: Ico.brain, title: "AI/ML Startups" },
    { icon: Ico.chip, title: "Cloud-Native Companies" },
    { icon: Ico.code, title: "Developer Tools Companies" },
    { icon: Ico.rocket, title: "Hardware & IoT" },
  ],
};

const SUCCESS_STORIES = {
  eyebrow: "Success Stories",
  heading: "Real Hi-Tech Solutions Outcomes",
  intro: "Anonymized results from recent hi-tech and SaaS engagements.",
  cases: [
    {
      title: "SaaS Company Lifts Net Revenue Retention to 118%",
      industry: "SaaS",
      challenge: "Customer success had no visibility into product usage, so renewal conversations happened without knowing which accounts were actually at risk.",
      solution: "We connected product analytics to the CRM and built a churn risk score based on real usage signals.",
      outcome: "Net revenue retention climbed to 118%, with at-risk accounts flagged weeks before renewal.",
    },
    {
      title: "Enterprise Software Vendor Cuts Deploy Time From Days to Minutes",
      industry: "Enterprise Software",
      challenge: "Releases required manual coordination across environments, limiting the engineering team to one deploy every two weeks.",
      solution: "We modernized the CI/CD pipeline and infrastructure-as-code setup to automate testing and deployment.",
      outcome: "Deploy frequency increased to 12 per week with zero unplanned downtime.",
    },
  ],
};

const WHY_MIRKETA = {
  eyebrow: "Why Choose Mirketa",
  heading: "A Technology Partner That Understands SaaS Metrics",
  intro: "Plenty of partners can implement a CRM. Fewer understand why net revenue retention and deploy frequency should shape the technology roadmap.",
  items: [
    { icon: Ico.award, title: "SaaS Revenue Operations Expertise", description: "We understand subscription billing, usage-based pricing, and the metrics investors actually track." },
    { icon: Ico.compass, title: "Cloud-Native Architecture Depth", description: "Infrastructure designed for a product that needs to scale, not a one-time deployment." },
    { icon: Ico.clock, title: "Rapid Implementation Cycles", description: "Fixed-scope delivery that matches the pace hi-tech companies actually move at." },
    { icon: Ico.shield, title: "Security Built for Enterprise Sales", description: "SOC 2 and compliance requirements built in as you move upmarket." },
    { icon: Ico.users, title: "Dedicated Delivery Team", description: "The consultants who scope your engagement support it through launch and beyond." },
    { icon: Ico.heart, title: "Support Beyond Launch", description: "Ongoing technology support available as your product and go-to-market motion evolve." },
  ],
};

const TECHNOLOGIES = {
  eyebrow: "Technology Stack",
  heading: "The Platforms We Build Hi-Tech Solutions On",
  intro: "Selected based on your product architecture and go-to-market model, not a default recommendation.",
  items: [
    { icon: Ico.cloud, title: "Salesforce" },
    { icon: Ico.db, title: "NetSuite" },
    { icon: Ico.chip, title: "Kubernetes & Cloud-Native Infra" },
    { icon: Ico.brain, title: "AI & ML Analytics" },
    { icon: Ico.route, title: "CI/CD Pipelines" },
    { icon: Ico.shield, title: "SOC 2 Security Tooling" },
  ],
};

const PROCESS = {
  eyebrow: "Industry Process",
  heading: "A Five-Stage Path From Assessment to Scalable Operations",
  intro: "A structured methodology refined across hi-tech and SaaS engagements from early-stage startups to enterprise software vendors.",
  steps: [
    { label: "Operations Assessment" },
    { label: "Technology Roadmap" },
    { label: "Integration & Automation" },
    { label: "Testing & Rollout" },
    { label: "Launch & Optimize" },
  ],
  detail: [
    { name: "Operations Assessment", description: "Current revenue, product, and engineering systems mapped against your growth stage and metrics." },
    { name: "Technology Roadmap", description: "An integration and automation plan documented and prioritized against your go-to-market model." },
    { name: "Integration & Automation", description: "CRM, billing, product analytics, and infrastructure connected on a shared data model." },
    { name: "Testing & Rollout", description: "Structured testing with revenue, product, and engineering stakeholders before anything goes live." },
    { name: "Launch & Optimize", description: "Supported launch followed by continuous refinement as your metrics and growth stage evolve." },
  ],
};

const FAQS = [
  { q: "What are Hi-Tech Solutions from Mirketa?", a: "Hi-Tech Solutions cover revenue operations implementation, product analytics integration, customer success and churn prevention workflows, cloud infrastructure modernization, and AI feature development for hi-tech and SaaS companies." },
  { q: "Can you connect our CRM and billing systems?", a: "Yes. We connect CRM, CPQ, and billing systems so a closed deal flows automatically into provisioning and revenue recognition without manual handoffs." },
  { q: "How does this help reduce customer churn?", a: "By connecting product usage data to customer success workflows, we build account health scores from real usage signals so at-risk accounts are flagged before renewal conversations, not during them." },
  { q: "Do you work with early-stage startups, or only enterprise software companies?", a: "We work across company types, including SaaS platforms, enterprise software vendors, AI/ML startups, cloud-native companies, developer tools companies, and hardware/IoT companies." },
  { q: "Can you help modernize our deployment pipeline?", a: "Yes. We help engineering teams implement infrastructure-as-code and CI/CD pipelines that make releases routine and reliable instead of a manual, risky process." },
  { q: "What platforms do you typically implement for hi-tech clients?", a: "Most engagements involve Salesforce for revenue operations, NetSuite for SaaS financial operations, and cloud-native infrastructure tooling like Kubernetes, supplemented with AI-powered product analytics." },
  { q: "Do you help with SOC 2 or enterprise security requirements?", a: "Yes. We help build security and compliance requirements into your platform as you move upmarket to larger enterprise accounts." },
  { q: "Do you provide ongoing support after launch?", a: "Yes. Every engagement can transition into ongoing support as your product, revenue model, and growth stage evolve." },
];

const RELATED_SERVICES = {
  eyebrow: "Related Services",
  heading: "Explore More Ways Mirketa Supports Technology Companies",
  intro: "Hi-tech technology needs often overlap with related industries and platforms. Here's where to look next.",
  items: [
    { slug: INDUSTRY_PAGES.FINANCIAL_SERVICES.slug, label: INDUSTRY_PAGES.FINANCIAL_SERVICES.label, description: "See how Mirketa supports the FinTech companies at the intersection of hi-tech and financial services." },
    { slug: INDUSTRY_PAGES.ECOMMERCE.slug, label: INDUSTRY_PAGES.ECOMMERCE.label, description: "Explore technology solutions for the e-commerce platforms many hi-tech companies build for." },
    { slug: SALESFORCE_PAGES.DEVELOPMENT_CONSULTING.slug, label: SALESFORCE_PAGES.DEVELOPMENT_CONSULTING.label, description: "Build revenue operations on Salesforce for a consistent lead-to-cash workflow." },
    { slug: CLOUD_PAGES.SITE_RELIABILITY_ENGINEERING.slug, label: CLOUD_PAGES.SITE_RELIABILITY_ENGINEERING.label, description: "Keep your product's cloud infrastructure reliable with observability and incident response." },
    { slug: AI_PAGES.AI_DATA_FOUNDATIONS.slug, label: AI_PAGES.AI_DATA_FOUNDATIONS.label, description: "Build the governed data foundation that makes AI features in your own product reliable." },
  ],
};

const FINAL_CTA = {
  heading: "Turn Connected Data Into a Growth Advantage",
  description: "Partner with Mirketa to connect revenue, product, and engineering systems — or talk to a hi-tech solutions advisor before your next growth stage.",
  primaryCta: { label: "Get a Hi-Tech Operations Assessment", href: "#contact" },
  secondaryCta: { label: "Talk to a Hi-Tech Solutions Advisor", href: "#contact" },
};

const CONSULTATION = {
  eyebrow: "Get Started",
  heading: "Get a Hi-Tech Operations Assessment",
  description: "Tell us about your product, revenue model, and growth stage — a hi-tech solutions advisor will follow up within one business day.",
  formTitle: "Get a Free Hi-Tech Operations Assessment",
};

const SEO = {
  title: pageSEO.title,
  description: pageSEO.description,
  canonical: `https://mirketa.us${pageSEO.slug}`,
  keywords: [
    "Hi-Tech Solutions",
    "SaaS",
    "Software Development",
    "Cloud Computing",
    "Artificial Intelligence",
  ],
  schema: [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "Hi-Tech Solutions",
      provider: { "@type": "Organization", name: "Mirketa Inc.", url: "https://mirketa.us" },
      name: "Hi-Tech Solutions",
      description: "Revenue operations, product analytics, cloud infrastructure, and AI feature development for hi-tech and SaaS companies.",
      areaServed: "Global",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://mirketa.us/" },
        { "@type": "ListItem", position: 2, name: INDUSTRY_PAGES.HI_TECH.label, item: `https://mirketa.us${pageSEO.slug}` },
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

export default function HiTech() {
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

      gsap.utils.toArray(".hte-reveal").forEach((el) => {
        gsap.from(el, { opacity: prefersReduced ? 1 : 0, y: prefersReduced ? 0 : 32, duration: 0.7, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 88%" } });
      });
      gsap.utils.toArray(".hte-reveal-left").forEach((el) => {
        gsap.from(el, { opacity: prefersReduced ? 1 : 0, x: prefersReduced ? 0 : -30, duration: 0.7, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 88%" } });
      });
      gsap.utils.toArray(".hte-reveal-right").forEach((el) => {
        gsap.from(el, { opacity: prefersReduced ? 1 : 0, x: prefersReduced ? 0 : 30, duration: 0.7, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 88%" } });
      });
      gsap.utils.toArray(".hte-reveal-stagger").forEach((el) => {
        gsap.from(el.children, { opacity: prefersReduced ? 1 : 0, y: prefersReduced ? 0 : 26, duration: 0.6, stagger: 0.06, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 85%" } });
      });
      gsap.utils.toArray(".hte-zoom-in").forEach((el) => {
        gsap.from(el, { opacity: prefersReduced ? 1 : 0, scale: prefersReduced ? 1 : 0.94, duration: 0.6, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 88%" } });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="industry-hi-tech">
      <Seo {...SEO} />
      <HeroSection heroTextRef={heroTextRef} heroRef={heroRef} />
      <TrustedByMarquee label="Trusted by SaaS and Technology Company Leaders" />
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
      <RelatedServices {...RELATED_SERVICES} className="hte-related hte-reveal" />
      <FinalCtaSection />
      <ConsultationSection {...CONSULTATION} />
      <StickyCta heroRef={heroRef} label="Get a Hi-Tech Operations Assessment" />
    </div>
  );
}

// ============================================================
// HERO
// ============================================================

function HeroSection({ heroTextRef, heroRef }) {
  return (
    <section ref={heroRef} className="hte-hero" style={{ backgroundImage: `url("${Images.heroIndustryHiTech}")` }} aria-label="Hi-Tech Solutions by Mirketa">
      <div className="hte-hero__scrim" />
      <div className="container">
        <Breadcrumb items={BREADCRUMB_ITEMS} className="hte-breadcrumb" />
        <div className="hte-hero__inner">
          <div ref={heroTextRef} className="hte-hero__text">
            <span className="hte-badge">
              <span className="hte-badge__spark" aria-hidden="true">✦</span> {HERO.badge}
            </span>
            <h1>{HERO.title}</h1>
            <p className="hte-hero__description">{HERO.description}</p>
            <div className="hte-hero__ctas">
              <a href={HERO.primaryCta.href} className="btn btn-primary hte-btn">
                {HERO.primaryCta.label} <span aria-hidden="true">→</span>
              </a>
              <a href={HERO.secondaryCta.href} className="btn btn-secondary hte-btn">
                {HERO.secondaryCta.label}
              </a>
            </div>
            <ul className="hte-hero__metrics">
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
            className="hte-hero__visual hte-zoom-in"
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
    <section className="section hte-challenges" aria-labelledby="hte-challenges-heading">
      <div className="container">
        <div className="section-heading hte-reveal">
          <p className="hte-eyebrow">{CHALLENGES.eyebrow}</p>
          <h2 id="hte-challenges-heading">{CHALLENGES.heading}</h2>
          <p>{CHALLENGES.intro}</p>
        </div>
        <div className="hte-challenges__grid hte-reveal-stagger">
          {CHALLENGES.items.map((c) => (
            <div className="hte-challenge-card" key={c.title}>
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
    <section className="section hte-solution" aria-labelledby="hte-solution-heading">
      <div className="container hte-solution__grid">
        <div className="hte-reveal-left">
          <p className="hte-eyebrow">{SOLUTION.eyebrow}</p>
          <h2 id="hte-solution-heading">{SOLUTION.heading}</h2>
          {SOLUTION.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <div className="hte-reveal-right">
          <AnalyticsPanel
            title="Product Adoption Health"
            donutPercent={91}
            donutLabel="Accounts with healthy usage signals"
            metrics={[
              { value: "118%", label: "Net revenue retention" },
              { value: "22%", label: "Trial-to-paid conversion" },
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
    <section className="section hte-services" aria-labelledby="hte-services-heading">
      <div className="container">
        <div className="hte-services__head hte-reveal">
          <div className="section-heading">
            <p className="hte-eyebrow">{SERVICES.eyebrow}</p>
            <h2 id="hte-services-heading">{SERVICES.heading}</h2>
            <p>{SERVICES.intro}</p>
          </div>
        </div>
        <div className="hte-services__grid hte-reveal-stagger">
          {SERVICES.items.map((c) => (
            <div className="hte-service-card" key={c.title}>
              <span className="hte-service-card__icon">{c.icon}</span>
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
    <section className="section hte-platform" aria-labelledby="hte-platform-heading">
      <div className="container">
        <div className="section-heading hte-reveal">
          <p className="hte-eyebrow">{PLATFORM_EXPERTISE.eyebrow}</p>
          <h2 id="hte-platform-heading">{PLATFORM_EXPERTISE.heading}</h2>
          <p>{PLATFORM_EXPERTISE.intro}</p>
        </div>
        <div className="hte-platform__grid hte-reveal-stagger">
          {PLATFORM_EXPERTISE.items.map((c) => (
            <div className="hte-platform-item" key={c.title}>
              <p className="hte-card-title">{c.title}</p>
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
    <section className="section hte-ai" aria-labelledby="hte-ai-heading">
      <div className="container">
        <div className="section-heading hte-reveal">
          <p className="hte-eyebrow">{AI_AUTOMATION.eyebrow}</p>
          <h2 id="hte-ai-heading">{AI_AUTOMATION.heading}</h2>
          <p>{AI_AUTOMATION.intro}</p>
        </div>
        <div className="hte-ai__layout">
          <div className="hte-ai__grid hte-reveal-stagger">
            {AI_AUTOMATION.items.map((f) => (
              <div className="hte-ai-item" key={f.title}>
                <p className="hte-card-title">{f.title}</p>
                <p>{f.description}</p>
              </div>
            ))}
          </div>
          <div className="hte-reveal-right">
            <WorkflowDiagram
              title="Lead-to-Cash Automation Flow"
              steps={[{ label: "Deal Closed" }, { label: "Provisioned" }, { label: "Billed" }, { label: "Onboarded" }, { label: "Expanded" }]}
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
    <section className="section hte-benefits" aria-labelledby="hte-benefits-heading">
      <div className="container">
        <div className="section-heading hte-reveal">
          <p className="hte-eyebrow">{BENEFITS.eyebrow}</p>
          <h2 id="hte-benefits-heading">{BENEFITS.heading}</h2>
          <p>{BENEFITS.intro}</p>
        </div>
        <div className="hte-benefits__stats hte-reveal-stagger">
          {BENEFITS.stats.map((s) => (
            <AnimatedCounter key={s.label} value={s.value} label={s.label} className="hte-stat" />
          ))}
        </div>
        <div className="hte-benefits__grid hte-reveal-stagger">
          {BENEFITS.items.map((b) => (
            <div className="hte-benefit-item" key={b.title}>
              <span aria-hidden="true">{Ico.check}</span>
              <div>
                <p className="hte-card-title">{b.title}</p>
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
    <section className="section hte-usecases" aria-labelledby="hte-usecases-heading">
      <div className="container">
        <div className="section-heading hte-reveal">
          <p className="hte-eyebrow">{USE_CASES.eyebrow}</p>
          <h2 id="hte-usecases-heading">{USE_CASES.heading}</h2>
          <p>{USE_CASES.intro}</p>
        </div>
        <div className="hte-usecases__grid hte-reveal-stagger">
          {USE_CASES.items.map((n) => (
            <div className="hte-usecase-card" key={n.title}>
              <span className="hte-usecase-card__icon">{n.icon}</span>
              <p className="hte-card-title">{n.title}</p>
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
    <section className="section hte-cases" aria-labelledby="hte-cases-heading">
      <div className="container">
        <div className="section-heading hte-reveal">
          <p className="hte-eyebrow">{SUCCESS_STORIES.eyebrow}</p>
          <h2 id="hte-cases-heading">{SUCCESS_STORIES.heading}</h2>
          <p>{SUCCESS_STORIES.intro}</p>
        </div>
        <div className="hte-cases__grid hte-reveal-stagger">
          {SUCCESS_STORIES.cases.map((c) => (
            <div className="hte-case-card" key={c.title}>
              <span className="hte-case-card__tag">{c.industry}</span>
              <p className="hte-card-title">{c.title}</p>
              <dl className="hte-case-card__fields">
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
    <section className="section hte-why" aria-labelledby="hte-why-heading">
      <div className="container">
        <div className="section-heading hte-reveal">
          <p className="hte-eyebrow">{WHY_MIRKETA.eyebrow}</p>
          <h2 id="hte-why-heading">{WHY_MIRKETA.heading}</h2>
          <p>{WHY_MIRKETA.intro}</p>
        </div>
        <div className="hte-why__grid hte-reveal-stagger">
          {WHY_MIRKETA.items.map((w) => (
            <div className="hte-why-card" key={w.title}>
              <span className="hte-why-card__icon">{w.icon}</span>
              <p className="hte-card-title">{w.title}</p>
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
    <section className="section hte-tech" aria-labelledby="hte-tech-heading">
      <div className="container">
        <div className="section-heading hte-reveal">
          <p className="hte-eyebrow">{TECHNOLOGIES.eyebrow}</p>
          <h2 id="hte-tech-heading">{TECHNOLOGIES.heading}</h2>
          <p>{TECHNOLOGIES.intro}</p>
        </div>
        <div className="hte-tech__grid hte-reveal-stagger">
          {TECHNOLOGIES.items.map((t) => (
            <div className="hte-tech-card" key={t.title}>
              <span className="hte-tech-card__icon">{t.icon}</span>
              <p className="hte-card-title">{t.title}</p>
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
    <section className="section hte-process" aria-labelledby="hte-process-heading">
      <div className="container">
        <div className="section-heading hte-reveal">
          <p className="hte-eyebrow">{PROCESS.eyebrow}</p>
          <h2 id="hte-process-heading">{PROCESS.heading}</h2>
          <p>{PROCESS.intro}</p>
        </div>
        <div className="hte-zoom-in">
          <SupplyChainMap
            title="Go-to-Market Systems Network"
            nodes={[
              { label: "CRM", short: "CRM" },
              { label: "Billing", short: "BILL" },
              { label: "Product Analytics", short: "PROD" },
              { label: "Customer Success", short: "CS" },
              { label: "Engineering", short: "ENG" },
            ]}
          />
        </div>
        <div className="hte-process__grid hte-reveal-stagger">
          {PROCESS.detail.map((p, i) => (
            <div className="hte-step-card" key={p.name}>
              <span className="hte-step-card__num">{String(i + 1).padStart(2, "0")}</span>
              <p className="hte-card-title">{p.name}</p>
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
    <section className="section hte-faq" aria-labelledby="hte-faq-heading">
      <div className="container">
        <div className="section-heading hte-reveal">
          <p className="hte-eyebrow">FAQ</p>
          <h2 id="hte-faq-heading">Frequently Asked Questions About Hi-Tech Solutions</h2>
        </div>
        <FaqAccordion items={FAQS} className="hte-reveal" searchPlaceholder="Ask a question — e.g. &quot;churn&quot;, &quot;deploy&quot;, &quot;security&quot;..." />
        <p className="hte-faq__links">
          Related reading: <Link to={INDUSTRY_PAGES.FINANCIAL_SERVICES.slug}>{INDUSTRY_PAGES.FINANCIAL_SERVICES.label}</Link>,{" "}
          <Link to={INDUSTRY_PAGES.ECOMMERCE.slug}>{INDUSTRY_PAGES.ECOMMERCE.label}</Link>,{" "}
          <Link to={SALESFORCE_PAGES.DEVELOPMENT_CONSULTING.slug}>{SALESFORCE_PAGES.DEVELOPMENT_CONSULTING.label}</Link>,{" "}
          <Link to={CLOUD_PAGES.SITE_RELIABILITY_ENGINEERING.slug}>{CLOUD_PAGES.SITE_RELIABILITY_ENGINEERING.label}</Link>,{" "}
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
    <section className="hte-final-cta hte-reveal" aria-labelledby="hte-final-cta-heading">
      <div className="container hte-final-cta__inner">
        <h2 id="hte-final-cta-heading">{FINAL_CTA.heading}</h2>
        <p>{FINAL_CTA.description}</p>
        <div className="hte-final-cta__ctas">
          <a href={FINAL_CTA.primaryCta.href} className="btn btn-primary hte-btn">
            {FINAL_CTA.primaryCta.label} <span aria-hidden="true">→</span>
          </a>
          <a href={FINAL_CTA.secondaryCta.href} className="btn btn-secondary hte-btn">
            {FINAL_CTA.secondaryCta.label}
          </a>
        </div>
      </div>
    </section>
  );
}
