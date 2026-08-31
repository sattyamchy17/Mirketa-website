import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Images } from "../../../assets/images/index.js";
import { INTEGRATION_PAGES, ORACLE_PAGES, SALESFORCE_PAGES, SERVICENOW_PAGES, NETSUITE_PAGES, WORKDAY_PAGES, CLOUD_PAGES } from "../../../config/pageSlugs.js";
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
import "./EnterpriseIntegrationServices.css";

gsap.registerPlugin(ScrollTrigger);

// ============================================================
// SLUG / SEO CONFIGURATION — kept local to this component per
// project convention, sourced from the central pageSlugs.js entry
// so the URL itself still only needs to change in one place.
// ============================================================

export const pageSEO = {
  slug: `${INTEGRATION_PAGES.ENTERPRISE.slug}/`,
  title: "Enterprise Integration Services | Mirketa",
  description:
    "Enterprise Integration Services connecting ERP, CRM, cloud, and on-premise systems with modern iPaaS, APIs, and real-time data synchronization.",
};

// ============================================================
// ICONS
// ============================================================

const Ico = {
  check: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12.5l5 5L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  plug: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 3v5M15 3v5M7 8h10v4a5 5 0 01-10 0V8z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="M12 17v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
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
  cloud: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 18h10a4 4 0 000-8 5.5 5.5 0 00-10.7-1.7A4.5 4.5 0 007 18z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  layers: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3l8 4.5-8 4.5-8-4.5L12 3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M4 12l8 4.5 8-4.5M4 16.5l8 4.5 8-4.5" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
};

// ============================================================
// DATA
// ============================================================

const BREADCRUMB_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Platforms & Technology", href: "/" },
  { label: INTEGRATION_PAGES.ENTERPRISE.label },
];

const HERO = {
  badge: "Enterprise iPaaS & API Integration Partner",
  title: "Enterprise Integration Services for Connecting Every System You Run",
  description:
    "Mirketa's enterprise integration services connect ERP, CRM, cloud applications, and on-premise systems into one dependable data flow — built on modern iPaaS platforms, governed APIs, and real-time synchronization, so your teams stop reconciling spreadsheets between systems that should already be talking to each other.",
  primaryCta: { label: "Get an Integration Architecture Review", href: "#contact" },
  secondaryCta: { label: "Talk to an Integration Architect", href: "#contact" },
  metrics: ["Platform-Agnostic Integration Architects", "200+ Pre-Built Connector Patterns", "API-First, Governed by Design", "Fixed-Scope Delivery Waves"],
};

const HERO_DASHBOARD = {
  title: "Integration Control Center",
  stats: [
    { label: "API UPTIME", value: "99.98%", caption: "Trailing 90-day average" },
    { label: "SYSTEMS CONNECTED", value: "14", caption: "ERP, CRM, cloud & legacy" },
    { label: "AVG SYNC LATENCY", value: "120ms", caption: "Real-time data flows" },
  ],
  rows: [
    { title: "Order sync — ERP to CRM", meta: "Real-time · Bi-directional", tone: "good", status: "Healthy" },
    { title: "Customer master reconciliation", meta: "Batch · Nightly run", tone: "good", status: "Completed" },
    { title: "Legacy EDI exchange — vendor gateway", meta: "API rate limits monitored", tone: "neutral", status: "Watching" },
  ],
  floatingCards: [
    { icon: Ico.plug, title: "200+ Connector Patterns", subtitle: "Reused across every integration" },
    { icon: Ico.shield, title: "Governed API Layer", subtitle: "Auth, versioning, audit built in" },
  ],
};

const SERVICE_OVERVIEW = {
  eyebrow: "Service Overview",
  heading: "Enterprise Integration Services Built Around Your Actual System Landscape",
  paragraphs: [
    "Every enterprise ends up running more systems than it planned to. A CRM for sales, an ERP for finance, a handful of cloud applications for HR, marketing, and support, and usually at least one legacy system nobody wants to touch but nobody can retire either. Enterprise integration services exist to make that landscape behave like one coherent platform instead of a dozen disconnected islands each holding a partial version of the truth.",
    "Mirketa approaches enterprise integration as an architecture discipline, not a series of one-off point-to-point connections. Before we build a single integration, we map your data flows end to end — which system owns which record, where duplication already exists, and which integrations are load-bearing enough that a failure would stop the business, not just annoy someone in finance.",
    "From there, we design on modern iPaaS platforms and governed APIs so every new connection reuses existing patterns instead of becoming another one-off script that only one person understands. The result is an integration layer that scales with you, rather than one that needs to be re-architected every time you add a system.",
  ],
};

const CHALLENGES = {
  eyebrow: "Business Challenges",
  heading: "The Integration Problems That Quietly Cost the Most",
  intro:
    "Most companies don't set out to build a tangle of point-to-point integrations. It happens one urgent request at a time, until the cost of that approach becomes impossible to ignore.",
  items: [
    { title: "Point-to-Point Sprawl", description: "Years of one-off scripts connecting System A to System B directly mean a single field change can silently break three other integrations nobody remembers exist." },
    { title: "Data That Disagrees With Itself", description: "Customer records, inventory counts, and financial data drift out of sync across systems, so different teams work from different versions of the truth." },
    { title: "No Governance Over APIs", description: "APIs get built and exposed without consistent authentication, rate limiting, or documentation, creating both a security risk and a maintenance burden." },
    { title: "Integration Work That Doesn't Scale", description: "Every new system or acquisition requires custom integration work from scratch because nothing from the last project was built to be reused." },
  ],
};

const CAPABILITIES = {
  eyebrow: "Our Capabilities",
  heading: "What Mirketa's Integration Practice Actually Covers",
  intro: "Enterprise integration spans more than connecting two systems — these are the capability areas our architects and developers bring to every engagement.",
  items: [
    { title: "iPaaS Platform Architecture", description: "Design and implementation on leading iPaaS platforms including Boomi and MuleSoft, selected based on your actual technical landscape, not a default recommendation." },
    { title: "API Design & Governance", description: "REST and SOAP API design with consistent authentication, versioning, and documentation standards applied across every integration." },
    { title: "Real-Time & Batch Data Sync", description: "Bi-directional, real-time synchronization where the business needs it, and efficient batch processing where it doesn't." },
    { title: "Master Data Management", description: "A single source of truth for core entities like customers, products, and vendors, reconciled across every connected system." },
  ],
};

const INTEGRATION_SERVICES = {
  eyebrow: "Integration Services",
  heading: "Six Ways Mirketa Delivers Enterprise Integration",
  intro: "Every engagement starts with one of these six service lines and expands as your integration roadmap takes shape.",
  items: [
    { icon: Ico.compass, title: "Integration Architecture Assessment", description: "A structured review of your current system landscape, data flows, and integration debt before any new work begins." },
    { icon: Ico.plug, title: "API Design & Development", description: "Governed, reusable APIs built to a consistent standard so future integrations don't start from zero." },
    { icon: Ico.route, title: "iPaaS Implementation", description: "Full implementation on Boomi, MuleSoft, or another iPaaS platform matched to your technical environment and team skill set." },
    { icon: Ico.db, title: "Data Synchronization & Migration", description: "Real-time and batch data synchronization between ERP, CRM, cloud, and legacy systems, with reconciliation built in." },
    { icon: Ico.shield, title: "Integration Governance", description: "Standards, naming conventions, and review processes that keep every future integration consistent with the last one." },
    { icon: Ico.code, title: "Custom Connector Development", description: "Purpose-built connectors for systems without an off-the-shelf integration available." },
  ],
};

const FEATURES = {
  eyebrow: "Platform Features",
  heading: "What a Properly Governed Integration Layer Actually Includes",
  intro: "These are the capability areas every Mirketa enterprise integration engagement is built around.",
  items: [
    { title: "Reusable API Layer", description: "APIs designed once and reused across multiple integrations instead of rebuilt for every new connection." },
    { title: "Centralized Monitoring", description: "A single dashboard showing the health of every integration flow, not a dozen disconnected logs." },
    { title: "Error Handling & Retry Logic", description: "Automatic retry and alerting on failed transactions, so issues surface before they become a business problem." },
    { title: "Security & Compliance Controls", description: "Authentication, encryption, and audit trails applied consistently across every integration, not just the newest one." },
    { title: "Scalable Connector Library", description: "A growing library of reusable connector patterns that shortens delivery time on every subsequent integration." },
    { title: "Hybrid Cloud Connectivity", description: "Secure connectivity between cloud applications and on-premise systems without exposing your network unnecessarily." },
  ],
};

const BENEFITS = {
  eyebrow: "Benefits",
  heading: "What Changes Once Your Systems Actually Talk to Each Other",
  intro: "These are the outcomes Mirketa's enterprise integration clients consistently report.",
  stats: [
    { value: "70%", label: "Reduction in Manual Data Entry" },
    { value: "99.98%", label: "Average API Uptime" },
    { value: "3x", label: "Faster Delivery on New Integrations" },
    { value: "0", label: "Duplicate Customer Records After Cleanup" },
  ],
  items: [
    { title: "One Version of the Truth", description: "Customer, product, and financial data stays synchronized across every system instead of drifting apart." },
    { title: "Faster Time-to-Value on New Systems", description: "A reusable integration layer means adding a new application doesn't mean starting integration work from zero." },
    { title: "Fewer Manual Workarounds", description: "Teams stop re-keying data between systems because the systems already share it automatically." },
    { title: "An Integration Layer That Scales", description: "Governance and reusable patterns mean the tenth integration is easier to build than the first, not harder." },
  ],
};

const PROCESS = {
  eyebrow: "Integration Process",
  heading: "A Five-Stage Path From Assessment to Governed Operations",
  intro: "A structured methodology refined across enterprise integration engagements in retail, financial services, and manufacturing.",
  steps: [
    { label: "Discovery & Mapping" },
    { label: "Architecture Design" },
    { label: "Build & Connect" },
    { label: "Testing & Validation" },
    { label: "Governance & Handover" },
  ],
  detail: [
    { name: "Discovery & Mapping", description: "Every system, data flow, and existing integration mapped and scored for risk and business criticality." },
    { name: "Architecture Design", description: "iPaaS platform selection, API design standards, and a data ownership model documented before any build work begins." },
    { name: "Build & Connect", description: "Integrations built against the governed API standard, tested individually in a sandbox environment." },
    { name: "Testing & Validation", description: "End-to-end testing of full business processes across every connected system, not just isolated point-to-point checks." },
    { name: "Governance & Handover", description: "Documentation, monitoring dashboards, and a review process handed to your team or retained under an ongoing support model." },
  ],
};

const TECHNOLOGIES = {
  eyebrow: "Technology Stack",
  heading: "iPaaS Platforms and Tools We Build On",
  intro: "Our architects hold active certifications across the leading integration platforms, selecting the right one for your environment rather than defaulting to one.",
  items: [
    { icon: Ico.cloud, title: "Dell Boomi" },
    { icon: Ico.route, title: "MuleSoft Anypoint" },
    { icon: Ico.plug, title: "REST & SOAP APIs" },
    { icon: Ico.db, title: "EDI & B2B Exchange" },
    { icon: Ico.layers, title: "Kafka & Event Streaming" },
    { icon: Ico.shield, title: "OAuth & API Security" },
  ],
};

const INDUSTRIES = {
  eyebrow: "Industries Served",
  heading: "Enterprise Integration Experience Across Industries",
  intro: "Every industry brings its own system landscape and compliance requirement — our architects bring specific domain context to each one.",
  items: [
    { icon: Ico.bank, title: "Financial Services" },
    { icon: Ico.heart, title: "Healthcare" },
    { icon: Ico.factory, title: "Manufacturing" },
    { icon: Ico.cart, title: "Retail & Ecommerce" },
    { icon: Ico.code, title: "Software & SaaS" },
    { icon: Ico.users, title: "Professional Services" },
  ],
};

const WHY_MIRKETA = {
  eyebrow: "Why Choose Mirketa",
  heading: "An Integration Partner That Designs for Reuse, Not Just Connection",
  intro: "Plenty of partners can connect two systems. Fewer design the integration layer so the eleventh connection is easier than the first.",
  items: [
    { icon: Ico.award, title: "Platform-Agnostic Architects", description: "We recommend Boomi, MuleSoft, or a custom approach based on your environment, not a fixed partnership incentive." },
    { icon: Ico.compass, title: "Architecture-First Methodology", description: "Every engagement starts with a data flow map and governance model, not a race to connect the first two systems." },
    { icon: Ico.clock, title: "Fixed-Scope Delivery Waves", description: "A documented scope and timeline agreed before kickoff, with change requests handled transparently." },
    { icon: Ico.shield, title: "Security Built Into Every API", description: "Authentication, rate limiting, and audit logging are standard on every integration, not an upsell." },
    { icon: Ico.users, title: "Dedicated Delivery Team", description: "The architects who scope your engagement build and support it through go-live and beyond." },
    { icon: Ico.heart, title: "Support Beyond Go-Live", description: "Ongoing integration monitoring and enhancement support are available the moment your integrations go live." },
  ],
};

const CASE_STUDIES = {
  eyebrow: "Case Study",
  heading: "Real Enterprise Integration Outcomes",
  intro: "Anonymized results from recent enterprise integration engagements across industries.",
  cases: [
    {
      title: "Retailer Eliminates Manual Order Reconciliation Across Four Systems",
      industry: "Retail",
      challenge: "Orders were manually re-keyed between an ecommerce platform, ERP, warehouse system, and CRM, creating delays and data entry errors.",
      solution: "We designed a governed iPaaS integration layer connecting all four systems with real-time, bi-directional order synchronization.",
      outcome: "Manual order entry dropped to zero, with order-to-fulfillment time cut by more than half.",
    },
    {
      title: "Financial Services Firm Cuts Integration Delivery Time by 65%",
      industry: "Financial Services",
      challenge: "Every new system integration took months because nothing from prior projects was reusable or documented.",
      solution: "We rebuilt the integration layer around a governed API standard and a reusable connector library.",
      outcome: "New system integrations that used to take three months now ship in under five weeks.",
    },
  ],
};

const FAQS = [
  { q: "What are enterprise integration services?", a: "Enterprise integration services connect ERP, CRM, cloud applications, and on-premise systems so data flows automatically between them, using APIs, iPaaS platforms, and governed data synchronization instead of manual re-entry or fragile point-to-point scripts." },
  { q: "How is enterprise integration different from a single point-to-point connection?", a: "A point-to-point connection links two systems directly with no reuse. Enterprise integration architecture designs a governed API and data layer so every new connection reuses existing patterns instead of starting from scratch." },
  { q: "Which iPaaS platform should we use?", a: "It depends on your existing technology stack, team skills, and integration complexity. We assess your environment before recommending Boomi, MuleSoft, or another platform, rather than defaulting to a single partner platform." },
  { q: "Can you integrate our legacy on-premise systems with cloud applications?", a: "Yes. We build secure hybrid connectivity between on-premise systems and cloud applications using API gateways and iPaaS runtime agents, without exposing your internal network unnecessarily." },
  { q: "How long does a typical enterprise integration engagement take?", a: "A focused integration between two or three systems typically takes 8 to 12 weeks. Larger, multi-system architecture engagements can take 4 to 8 months depending on system count and data complexity." },
  { q: "Do you provide ongoing support after integrations go live?", a: "Yes. Every engagement can transition into an ongoing monitoring and enhancement support model, so integration health doesn't depend on a single internal owner." },
  { q: "How do you prevent integrations from breaking during system updates?", a: "Every integration is built against a documented API contract with automated testing, so a system update that changes underlying data structures is caught before it breaks downstream integrations." },
  { q: "Can enterprise integration help with data quality issues?", a: "Yes. Integration architecture typically includes master data management, which reconciles duplicate and conflicting records across systems so every connected application works from the same source of truth." },
];

const RELATED_SERVICES = {
  eyebrow: "Related Services",
  heading: "Explore More Ways Mirketa Connects Your Enterprise Systems",
  intro: "Enterprise integration is often the layer that connects the platforms Mirketa already supports. Here's where to look next.",
  items: [
    { slug: INTEGRATION_PAGES.BOOMI.slug, label: INTEGRATION_PAGES.BOOMI.label, description: "Go deeper on Dell Boomi implementation, connector development, and AtomSphere platform consulting." },
    { slug: INTEGRATION_PAGES.MULESOFT.slug, label: INTEGRATION_PAGES.MULESOFT.label, description: "Explore API-led connectivity and Anypoint Platform implementation for complex enterprise API programs." },
    { slug: NETSUITE_PAGES.IMPLEMENTATION.slug, label: NETSUITE_PAGES.IMPLEMENTATION.label, description: "Connect a newly implemented NetSuite ERP into your broader enterprise integration layer." },
    { slug: SALESFORCE_PAGES.DEVELOPMENT_CONSULTING.slug, label: SALESFORCE_PAGES.DEVELOPMENT_CONSULTING.label, description: "Integrate Salesforce CRM data with ERP and finance systems through governed APIs." },
    { slug: ORACLE_PAGES.FUSION_IMPLEMENTATION.slug, label: ORACLE_PAGES.FUSION_IMPLEMENTATION.label, description: "Connect Oracle Fusion Applications into a broader multi-system integration architecture." },
  ],
};

const FINAL_CTA = {
  heading: "Turn Disconnected Systems Into One Reliable Data Flow",
  description: "Partner with Mirketa's platform-agnostic integration architects to design an enterprise integration layer built for reuse — or talk to an architect before you commit to a platform.",
  primaryCta: { label: "Get an Integration Architecture Review", href: "#contact" },
  secondaryCta: { label: "Talk to an Integration Architect", href: "#contact" },
};

const CONSULTATION = {
  eyebrow: "Get Started",
  heading: "Get an Enterprise Integration Architecture Review",
  description: "Tell us about your current systems, integration pain points, and timeline — an integration architect will follow up within one business day.",
  formTitle: "Get a Free Integration Architecture Review",
};

const SEO = {
  title: pageSEO.title,
  description: pageSEO.description,
  canonical: `https://mirketa.us${pageSEO.slug}`,
  keywords: [
    "Enterprise Integration Services",
    "Enterprise Integration Solutions",
    "API Integration",
    "System Integration",
    "Application Integration",
    "Data Integration",
    "Cloud Integration",
    "Enterprise Connectivity",
  ],
  schema: [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "Enterprise Integration Services",
      provider: { "@type": "Organization", name: "Mirketa Inc.", url: "https://mirketa.us" },
      name: "Enterprise Integration Services",
      description: "API design, iPaaS implementation, and data synchronization services connecting ERP, CRM, cloud, and on-premise systems.",
      areaServed: "Global",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://mirketa.us/" },
        { "@type": "ListItem", position: 2, name: INTEGRATION_PAGES.ENTERPRISE.label, item: `https://mirketa.us${pageSEO.slug}` },
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

export default function EnterpriseIntegrationServices() {
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

      gsap.utils.toArray(".eis-reveal").forEach((el) => {
        gsap.from(el, { opacity: prefersReduced ? 1 : 0, y: prefersReduced ? 0 : 32, duration: 0.7, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 88%" } });
      });
      gsap.utils.toArray(".eis-reveal-left").forEach((el) => {
        gsap.from(el, { opacity: prefersReduced ? 1 : 0, x: prefersReduced ? 0 : -30, duration: 0.7, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 88%" } });
      });
      gsap.utils.toArray(".eis-reveal-right").forEach((el) => {
        gsap.from(el, { opacity: prefersReduced ? 1 : 0, x: prefersReduced ? 0 : 30, duration: 0.7, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 88%" } });
      });
      gsap.utils.toArray(".eis-reveal-stagger").forEach((el) => {
        gsap.from(el.children, { opacity: prefersReduced ? 1 : 0, y: prefersReduced ? 0 : 26, duration: 0.6, stagger: 0.06, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 85%" } });
      });
      gsap.utils.toArray(".eis-zoom-in").forEach((el) => {
        gsap.from(el, { opacity: prefersReduced ? 1 : 0, scale: prefersReduced ? 1 : 0.94, duration: 0.6, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 88%" } });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="enterprise-integration-services">
      <Seo {...SEO} />
      <HeroSection heroTextRef={heroTextRef} heroRef={heroRef} />
      <TrustedByMarquee label="Trusted by IT & Operations Leaders Running Multi-System Landscapes" />
      <ServiceOverviewSection />
      <ChallengesSection />
      <CapabilitiesSection />
      <IntegrationServicesSection />
      <FeaturesSection />
      <BenefitsSection />
      <ProcessSection />
      <TechnologiesSection />
      <IndustriesSection />
      <WhyMirketaSection />
      <CaseStudySection />
      <FaqSection />
      <RelatedServices {...RELATED_SERVICES} className="eis-related eis-reveal" />
      <FinalCtaSection />
      <ConsultationSection {...CONSULTATION} />
      <StickyCta heroRef={heroRef} label="Get an Integration Architecture Review" />
    </div>
  );
}

// ============================================================
// HERO
// ============================================================

function HeroSection({ heroTextRef, heroRef }) {
  return (
    <section ref={heroRef} className="eis-hero" style={{ backgroundImage: `url("${Images.heroEnterpriseIntegration}")` }} aria-label="Enterprise Integration Services by Mirketa">
      <div className="eis-hero__scrim" />
      <div className="container">
        <Breadcrumb items={BREADCRUMB_ITEMS} className="eis-breadcrumb" />
        <div className="eis-hero__inner">
          <div ref={heroTextRef} className="eis-hero__text">
            <span className="eis-badge">
              <span className="eis-badge__spark" aria-hidden="true">✦</span> {HERO.badge}
            </span>
            <h1>{HERO.title}</h1>
            <p className="eis-hero__description">{HERO.description}</p>
            <div className="eis-hero__ctas">
              <a href={HERO.primaryCta.href} className="btn btn-primary eis-btn">
                {HERO.primaryCta.label} <span aria-hidden="true">→</span>
              </a>
              <a href={HERO.secondaryCta.href} className="btn btn-secondary eis-btn">
                {HERO.secondaryCta.label}
              </a>
            </div>
            <ul className="eis-hero__metrics">
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
            className="eis-hero__visual eis-zoom-in"
          />
        </div>
      </div>
    </section>
  );
}

// ============================================================
// SERVICE OVERVIEW
// ============================================================

function ServiceOverviewSection() {
  return (
    <section className="section eis-overview" aria-labelledby="eis-overview-heading">
      <div className="container eis-overview__grid">
        <div className="eis-reveal-left">
          <p className="eis-eyebrow">{SERVICE_OVERVIEW.eyebrow}</p>
          <h2 id="eis-overview-heading">{SERVICE_OVERVIEW.heading}</h2>
          {SERVICE_OVERVIEW.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
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
    <section className="section eis-challenges" aria-labelledby="eis-challenges-heading">
      <div className="container">
        <div className="section-heading eis-reveal">
          <p className="eis-eyebrow">{CHALLENGES.eyebrow}</p>
          <h2 id="eis-challenges-heading">{CHALLENGES.heading}</h2>
          <p>{CHALLENGES.intro}</p>
        </div>
        <div className="eis-challenges__grid eis-reveal-stagger">
          {CHALLENGES.items.map((c) => (
            <div className="eis-challenge-card" key={c.title}>
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
// OUR CAPABILITIES
// ============================================================

function CapabilitiesSection() {
  return (
    <section className="section eis-capabilities" aria-labelledby="eis-capabilities-heading">
      <div className="container">
        <div className="section-heading eis-reveal">
          <p className="eis-eyebrow">{CAPABILITIES.eyebrow}</p>
          <h2 id="eis-capabilities-heading">{CAPABILITIES.heading}</h2>
          <p>{CAPABILITIES.intro}</p>
        </div>
        <div className="eis-capabilities__grid eis-reveal-stagger">
          {CAPABILITIES.items.map((c) => (
            <div className="eis-capability-item" key={c.title}>
              <p className="eis-card-title">{c.title}</p>
              <p>{c.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// INTEGRATION SERVICES
// ============================================================

function IntegrationServicesSection() {
  return (
    <section className="section eis-services" aria-labelledby="eis-services-heading">
      <div className="container">
        <div className="section-heading eis-reveal">
          <p className="eis-eyebrow">{INTEGRATION_SERVICES.eyebrow}</p>
          <h2 id="eis-services-heading">{INTEGRATION_SERVICES.heading}</h2>
          <p>{INTEGRATION_SERVICES.intro}</p>
        </div>
        <div className="eis-services__grid eis-reveal-stagger">
          {INTEGRATION_SERVICES.items.map((c) => (
            <div className="eis-service-card" key={c.title}>
              <span className="eis-service-card__icon">{c.icon}</span>
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
// PLATFORM FEATURES
// ============================================================

function FeaturesSection() {
  return (
    <section className="section eis-features" aria-labelledby="eis-features-heading">
      <div className="container">
        <div className="section-heading eis-reveal">
          <p className="eis-eyebrow">{FEATURES.eyebrow}</p>
          <h2 id="eis-features-heading">{FEATURES.heading}</h2>
          <p>{FEATURES.intro}</p>
        </div>
        <div className="eis-features__layout">
          <div className="eis-features__grid eis-reveal-stagger">
            {FEATURES.items.map((f) => (
              <div className="eis-feature-item" key={f.title}>
                <p className="eis-card-title">{f.title}</p>
                <p>{f.description}</p>
              </div>
            ))}
          </div>
          <div className="eis-reveal-right">
            <WorkflowDiagram
              title="Integration Delivery Lifecycle"
              steps={[{ label: "Design" }, { label: "Build" }, { label: "Test" }, { label: "Deploy" }, { label: "Monitor" }]}
            />
          </div>
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
    <section className="section eis-benefits" aria-labelledby="eis-benefits-heading">
      <div className="container">
        <div className="section-heading eis-reveal">
          <p className="eis-eyebrow">{BENEFITS.eyebrow}</p>
          <h2 id="eis-benefits-heading">{BENEFITS.heading}</h2>
          <p>{BENEFITS.intro}</p>
        </div>
        <div className="eis-benefits__stats eis-reveal-stagger">
          {BENEFITS.stats.map((s) => (
            <AnimatedCounter key={s.label} value={s.value} label={s.label} className="eis-stat" />
          ))}
        </div>
        <div className="eis-benefits__grid eis-reveal-stagger">
          {BENEFITS.items.map((b) => (
            <div className="eis-benefit-item" key={b.title}>
              <span aria-hidden="true">{Ico.check}</span>
              <div>
                <p className="eis-card-title">{b.title}</p>
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
// INTEGRATION PROCESS
// ============================================================

function ProcessSection() {
  return (
    <section className="section eis-process" aria-labelledby="eis-process-heading">
      <div className="container">
        <div className="section-heading eis-reveal">
          <p className="eis-eyebrow">{PROCESS.eyebrow}</p>
          <h2 id="eis-process-heading">{PROCESS.heading}</h2>
          <p>{PROCESS.intro}</p>
        </div>
        <div className="eis-zoom-in">
          <SupplyChainMap
            title="Systems Connected Through the Integration Layer"
            nodes={[
              { label: "Integration Layer", short: "iPaaS" },
              { label: "ERP", short: "ERP" },
              { label: "CRM", short: "CRM" },
              { label: "Cloud Apps", short: "SaaS" },
              { label: "Legacy Systems", short: "LEG" },
            ]}
          />
        </div>
        <div className="eis-process__grid eis-reveal-stagger">
          {PROCESS.detail.map((p, i) => (
            <div className="eis-step-card" key={p.name}>
              <span className="eis-step-card__num">{String(i + 1).padStart(2, "0")}</span>
              <p className="eis-card-title">{p.name}</p>
              <p>{p.description}</p>
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
    <section className="section eis-tech" aria-labelledby="eis-tech-heading">
      <div className="container">
        <div className="section-heading eis-reveal">
          <p className="eis-eyebrow">{TECHNOLOGIES.eyebrow}</p>
          <h2 id="eis-tech-heading">{TECHNOLOGIES.heading}</h2>
          <p>{TECHNOLOGIES.intro}</p>
        </div>
        <div className="eis-tech__grid eis-reveal-stagger">
          {TECHNOLOGIES.items.map((t) => (
            <div className="eis-tech-card" key={t.title}>
              <span className="eis-tech-card__icon">{t.icon}</span>
              <p className="eis-card-title">{t.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// INDUSTRIES SERVED
// ============================================================

function IndustriesSection() {
  return (
    <section className="section eis-industries" aria-labelledby="eis-industries-heading">
      <div className="container">
        <div className="section-heading eis-reveal">
          <p className="eis-eyebrow">{INDUSTRIES.eyebrow}</p>
          <h2 id="eis-industries-heading">{INDUSTRIES.heading}</h2>
          <p>{INDUSTRIES.intro}</p>
        </div>
        <div className="eis-industries__grid eis-reveal-stagger">
          {INDUSTRIES.items.map((n) => (
            <div className="eis-industry-card" key={n.title}>
              <span className="eis-industry-card__icon">{n.icon}</span>
              <p className="eis-card-title">{n.title}</p>
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
    <section className="section eis-why" aria-labelledby="eis-why-heading">
      <div className="container">
        <div className="section-heading eis-reveal">
          <p className="eis-eyebrow">{WHY_MIRKETA.eyebrow}</p>
          <h2 id="eis-why-heading">{WHY_MIRKETA.heading}</h2>
          <p>{WHY_MIRKETA.intro}</p>
        </div>
        <div className="eis-why__grid eis-reveal-stagger">
          {WHY_MIRKETA.items.map((w) => (
            <div className="eis-why-card" key={w.title}>
              <span className="eis-why-card__icon">{w.icon}</span>
              <p className="eis-card-title">{w.title}</p>
              <p>{w.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// CASE STUDY
// ============================================================

function CaseStudySection() {
  return (
    <section className="section eis-cases" aria-labelledby="eis-cases-heading">
      <div className="container">
        <div className="section-heading eis-reveal">
          <p className="eis-eyebrow">{CASE_STUDIES.eyebrow}</p>
          <h2 id="eis-cases-heading">{CASE_STUDIES.heading}</h2>
          <p>{CASE_STUDIES.intro}</p>
        </div>
        <div className="eis-cases__grid eis-reveal-stagger">
          {CASE_STUDIES.cases.map((c) => (
            <div className="eis-case-card" key={c.title}>
              <span className="eis-case-card__tag">{c.industry}</span>
              <p className="eis-card-title">{c.title}</p>
              <dl className="eis-case-card__fields">
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
    <section className="section eis-faq" aria-labelledby="eis-faq-heading">
      <div className="container">
        <div className="section-heading eis-reveal">
          <p className="eis-eyebrow">FAQ</p>
          <h2 id="eis-faq-heading">Frequently Asked Questions About Enterprise Integration Services</h2>
        </div>
        <FaqAccordion items={FAQS} className="eis-reveal" searchPlaceholder="Ask a question — e.g. &quot;iPaaS&quot;, &quot;API&quot;, &quot;timeline&quot;..." />
        <p className="eis-faq__links">
          Related reading: <Link to={INTEGRATION_PAGES.BOOMI.slug}>{INTEGRATION_PAGES.BOOMI.label}</Link>,{" "}
          <Link to={INTEGRATION_PAGES.MULESOFT.slug}>{INTEGRATION_PAGES.MULESOFT.label}</Link>,{" "}
          <Link to={SERVICENOW_PAGES.HUB.slug}>{SERVICENOW_PAGES.HUB.label}</Link>,{" "}
          <Link to={WORKDAY_PAGES.CONSULTING_DEVELOPMENT.slug}>{WORKDAY_PAGES.CONSULTING_DEVELOPMENT.label}</Link>,{" "}
          <Link to={CLOUD_PAGES.SETUP_MIGRATION.slug}>{CLOUD_PAGES.SETUP_MIGRATION.label}</Link>.
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
    <section className="eis-final-cta eis-reveal" aria-labelledby="eis-final-cta-heading">
      <div className="container eis-final-cta__inner">
        <h2 id="eis-final-cta-heading">{FINAL_CTA.heading}</h2>
        <p>{FINAL_CTA.description}</p>
        <div className="eis-final-cta__ctas">
          <a href={FINAL_CTA.primaryCta.href} className="btn btn-primary eis-btn">
            {FINAL_CTA.primaryCta.label} <span aria-hidden="true">→</span>
          </a>
          <a href={FINAL_CTA.secondaryCta.href} className="btn btn-secondary eis-btn">
            {FINAL_CTA.secondaryCta.label}
          </a>
        </div>
      </div>
    </section>
  );
}
