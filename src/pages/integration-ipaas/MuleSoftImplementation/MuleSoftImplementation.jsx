import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Images } from "../../../assets/images/index.js";
import { INTEGRATION_PAGES, ORACLE_PAGES, SALESFORCE_PAGES, SERVICENOW_PAGES } from "../../../config/pageSlugs.js";
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
import "./MuleSoftImplementation.css";

gsap.registerPlugin(ScrollTrigger);

// ============================================================
// SLUG / SEO CONFIGURATION — kept local to this component per
// project convention, sourced from the central pageSlugs.js entry
// so the URL itself still only needs to change in one place.
// ============================================================

export const pageSEO = {
  slug: `${INTEGRATION_PAGES.MULESOFT.slug}/`,
  title: "MuleSoft Implementation | Mirketa",
  description:
    "MuleSoft Implementation services from Mirketa deliver API-led connectivity, Anypoint Platform governance, and CloudHub deployment built for API reuse.",
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
  { label: INTEGRATION_PAGES.MULESOFT.label },
];

const HERO = {
  badge: "MuleSoft Anypoint Platform Partner",
  title: "MuleSoft Implementation Built on API-Led Connectivity",
  description:
    "Mirketa's MuleSoft Implementation engagements bring API-led connectivity, disciplined Anypoint Platform governance, and production-grade DataWeave development to organizations that need APIs to behave like reusable assets instead of one-off integrations. Our MuleSoft Consulting Services team designs the System, Process, and Experience API layers your business actually needs, builds them in Anypoint Studio against a documented RAML or OAS contract, and operates them on CloudHub or Runtime Fabric long after go-live.",
  primaryCta: { label: "Get a MuleSoft Implementation Assessment", href: "#contact" },
  secondaryCta: { label: "Talk to a MuleSoft Architect", href: "#contact" },
  metrics: ["MuleSoft-Certified Integration Architects", "API-Led Connectivity by Default", "CloudHub & RTF Deployment Expertise", "Fixed-Scope Delivery Sprints"],
};

const HERO_DASHBOARD = {
  title: "Anypoint Delivery Console",
  stats: [
    { label: "APIS IN PRODUCTION", value: "42", caption: "Published to Anypoint Exchange" },
    { label: "CLOUDHUB UPTIME", value: "99.97%", caption: "Trailing 90-day average" },
    { label: "API REUSE RATE", value: "68%", caption: "System APIs reused across projects" },
  ],
  rows: [
    { title: "Order Management System API", meta: "CloudHub 2.0 · Production", tone: "good", status: "Healthy" },
    { title: "Customer 360 Process API", meta: "Reused by 4 downstream teams", tone: "good", status: "Stable" },
    { title: "Legacy ESB migration — claims domain", meta: "RAML spec under review", tone: "neutral", status: "In Design" },
  ],
  floatingCards: [
    { icon: Ico.shield, title: "Governed by API Manager", subtitle: "OAuth & rate limiting enforced" },
    { icon: Ico.route, title: "68% API Reuse", subtitle: "Across business units" },
  ],
};

const SERVICE_OVERVIEW = {
  eyebrow: "Service Overview",
  heading: "MuleSoft Implementation Services Grounded in the Anypoint Platform",
  paragraphs: [
    "MuleSoft implementation is more than standing up the Mule runtime and wiring a few connectors together. Anypoint Platform gives you a genuine API management layer, a shared asset library in Anypoint Exchange, and a runtime that can live in CloudHub, on Runtime Fabric, or on your own infrastructure — but only if the underlying API architecture is designed correctly from the first project. Mirketa's MuleSoft Consulting Services start with that architecture question before a single flow gets built in Anypoint Studio.",
    "We design and build against the API-led connectivity model: System APIs that expose backend systems of record exactly once, Process APIs that orchestrate business logic across those systems, and Experience APIs that shape data for the specific channel consuming it — a mobile app, a partner portal, or an internal dashboard. Every API ships with a RAML or OAS specification published to Anypoint Exchange, so the next team that needs the same data doesn't rebuild the connection from scratch.",
    "Our MuleSoft developers write DataWeave transformations as shared, testable modules rather than inline scripts buried inside a single flow, apply consistent error-handling and logging patterns across every Mule application, and hand over CloudHub or RTF environments that are sized, monitored, and documented — not just deployed and left running until something breaks.",
  ],
};

const CHALLENGES = {
  eyebrow: "Business Challenges",
  heading: "Why MuleSoft Investments Stop Paying Off",
  intro:
    "Most organizations adopt MuleSoft to get out of point-to-point integration chaos, then rebuild a version of that same chaos inside Anypoint Platform because nobody enforced the patterns the platform was designed around. These are the problems we see most often during an environment audit.",
  items: [
    { title: "APIs Built Outside the API-Led Model", description: "System APIs get skipped entirely and Experience APIs call backend systems directly, so nothing is reusable and every new channel means another custom integration from zero." },
    { title: "No Governance in API Manager", description: "APIs go live without consistent OAuth policies, rate limiting, or SLA tiers applied through API Manager, so any team can publish an unsecured endpoint that nobody in IT knows exists." },
    { title: "Duplicated DataWeave Logic", description: "The same transformation gets rewritten inline in three or four different Mule applications instead of published once as a shared DataWeave module in Anypoint Exchange." },
    { title: "CloudHub Environments Never Rightsized", description: "Worker sizes and vCore allocations get set once at go-live and never revisited, so CloudHub costs climb quietly for eighteen months before anyone reconciles the bill against actual API traffic." },
  ],
};

const CAPABILITIES = {
  eyebrow: "Our Capabilities",
  heading: "What Mirketa's MuleSoft Practice Covers",
  intro: "MuleSoft Consulting Services from Mirketa span the full Anypoint Platform lifecycle — these are the capability areas our certified architects and developers bring to every engagement.",
  items: [
    { title: "Anypoint Platform Architecture", description: "API-led connectivity designs spanning System, Process, and Experience API layers, matched to your actual backend landscape rather than a generic reference architecture." },
    { title: "Custom Mule Application Development", description: "Mule 4 applications built in Anypoint Studio with reusable DataWeave modules, consistent error handling, and full unit test coverage using MUnit." },
    { title: "API Management & Governance", description: "Policy design, versioning standards, and SLA tiers enforced through API Manager so every published API meets the same security bar." },
    { title: "CloudHub & Runtime Fabric Operations", description: "Environment sizing, monitoring, and cost governance across CloudHub 2.0 and Runtime Fabric deployments, tuned to real traffic instead of guesswork." },
  ],
};

const INTEGRATION_SERVICES = {
  eyebrow: "Integration Services",
  heading: "Six MuleSoft Implementation Service Lines",
  intro: "Every MuleSoft Implementation engagement starts with one of these six service lines and expands as your Anypoint Platform roadmap matures.",
  items: [
    { icon: Ico.compass, title: "Anypoint Platform Implementation", description: "End-to-end setup of Anypoint Platform — organizations, business groups, environments, and the API Manager and Exchange configuration your team will use for years." },
    { icon: Ico.route, title: "API-Led Connectivity Design", description: "System, Process, and Experience API layering mapped to your actual backend systems, documented as RAML or OAS specifications before any development starts." },
    { icon: Ico.code, title: "Custom Mule Application Development", description: "Mule 4 flows and DataWeave transformations built in Anypoint Studio, version-controlled, and covered by automated MUnit test suites." },
    { icon: Ico.shield, title: "API Management & Governance", description: "OAuth, client ID enforcement, rate limiting, and SLA tier policies applied and enforced consistently through API Manager." },
    { icon: Ico.cloud, title: "CloudHub / RTF Deployment & Operations", description: "Production deployment on CloudHub 2.0 or Runtime Fabric, with monitoring, alerting, and worker sizing tuned to actual traffic patterns." },
    { icon: Ico.db, title: "Legacy-to-MuleSoft Migration", description: "Migrating integrations off legacy ESBs, hand-rolled middleware, or another iPaaS platform onto Anypoint Platform without business disruption during cutover." },
  ],
};

const FEATURES = {
  eyebrow: "Platform Features",
  heading: "What a Properly Governed Anypoint Implementation Includes",
  intro: "These are the capability areas every Mirketa MuleSoft Implementation is built around, regardless of industry or system landscape.",
  items: [
    { title: "Three-Layer API Architecture", description: "System, Process, and Experience APIs kept cleanly separated so a channel change never requires touching backend connection logic." },
    { title: "Reusable DataWeave Library", description: "Common transformations published once to Anypoint Exchange and referenced everywhere, instead of copy-pasted between Mule applications." },
    { title: "Automated MUnit Test Coverage", description: "Every flow ships with MUnit tests that run in CI, so a change to one API surfaces regressions before it reaches CloudHub." },
    { title: "Centralized API Governance", description: "Consistent OAuth, rate limiting, and versioning policies enforced across every API published through API Manager." },
    { title: "CloudHub & RTF Monitoring", description: "Anypoint Monitoring dashboards and custom alerting tuned to the SLAs each API actually needs to meet." },
    { title: "Hybrid & On-Premise Connectivity", description: "Secure connectivity between CloudHub-deployed APIs and on-premise systems through Anypoint VPCs and on-prem Mule runtimes, without exposing your network unnecessarily." },
  ],
};

const BENEFITS = {
  eyebrow: "Benefits",
  heading: "What Changes Once Your Anypoint Platform Is Actually Governed",
  intro: "These are the outcomes Mirketa's MuleSoft Implementation clients consistently report once the platform is built around API-led connectivity instead of ad hoc flows.",
  stats: [
    { value: "68%", label: "Average API Reuse Rate" },
    { value: "99.97%", label: "CloudHub Uptime" },
    { value: "2.5x", label: "Faster Delivery on New APIs" },
    { value: "40%", label: "Lower CloudHub Spend After Rightsizing" },
  ],
  items: [
    { title: "APIs That Get Reused, Not Rebuilt", description: "A System API built for one project becomes the connection point for the next five, instead of being rebuilt from scratch each time." },
    { title: "Governed, Secure Endpoints by Default", description: "Every API inherits the same OAuth and rate-limiting policy set the moment it's published through API Manager." },
    { title: "Predictable CloudHub Costs", description: "Worker sizing tied to actual traffic instead of a one-time guess, so your Anypoint Platform bill stops climbing on its own." },
    { title: "Faster Onboarding for New MuleSoft Developers", description: "Documented RAML specs and a shared DataWeave library mean new developers can extend an existing API instead of reverse-engineering it." },
  ],
};

const PROCESS = {
  eyebrow: "Integration Process",
  heading: "A Five-Stage MuleSoft Implementation Methodology",
  intro: "A structured delivery methodology refined across MuleSoft Implementation engagements in financial services, healthcare, and retail.",
  steps: [
    { label: "Discovery & API Strategy" },
    { label: "API Design (RAML/OAS)" },
    { label: "Build & Develop" },
    { label: "Testing & Governance" },
    { label: "Deploy & Operate" },
  ],
  detail: [
    { name: "Discovery & API Strategy", description: "Backend systems, existing integrations, and API candidates identified and scored, with a target System/Process/Experience layering proposed before design starts." },
    { name: "API Design (RAML/OAS)", description: "Every API specified in RAML or OAS and published to Anypoint Exchange for review before a single line of Mule code is written." },
    { name: "Build & Develop", description: "Mule 4 applications and DataWeave transformations built in Anypoint Studio against the approved specification, with MUnit tests written alongside each flow." },
    { name: "Testing & Governance", description: "End-to-end testing across the full API chain plus API Manager policy configuration, so governance ships with the API instead of being retrofitted later." },
    { name: "Deploy & Operate", description: "Production deployment to CloudHub or Runtime Fabric with monitoring, alerting, and a documented runbook handed to your team or retained under ongoing support." },
  ],
};

const TECHNOLOGIES = {
  eyebrow: "Technology Stack",
  heading: "The Anypoint Platform Ecosystem We Build On",
  intro: "Our architects hold active MuleSoft certifications and work across the full Anypoint Platform toolset on every engagement.",
  items: [
    { icon: Ico.code, title: "Anypoint Studio" },
    { icon: Ico.layers, title: "Anypoint Exchange" },
    { icon: Ico.shield, title: "API Manager" },
    { icon: Ico.cloud, title: "CloudHub 2.0" },
    { icon: Ico.route, title: "DataWeave" },
    { icon: Ico.compass, title: "Anypoint Monitoring" },
  ],
};

const INDUSTRIES = {
  eyebrow: "Industries Served",
  heading: "MuleSoft Implementation Experience Across Industries",
  intro: "Every industry brings its own compliance requirements and backend landscape — our architects bring specific domain context to each Anypoint Platform engagement.",
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
  heading: "A MuleSoft Consulting Partner That Builds for Reuse, Not Just Go-Live",
  intro: "Plenty of partners can stand up a Mule application. Fewer design the Anypoint Platform so the tenth API is easier to ship than the first.",
  items: [
    { icon: Ico.award, title: "MuleSoft-Certified Architects", description: "Our team holds active MuleSoft Certified Platform Architect and Developer credentials, not a single certified generalist spread across every platform." },
    { icon: Ico.compass, title: "API-Led Architecture From Day One", description: "Every engagement starts with a System/Process/Experience API design, not a rush to connect the first two systems." },
    { icon: Ico.clock, title: "Fixed-Scope Delivery Sprints", description: "A documented API backlog and sprint plan agreed before kickoff, with change requests handled transparently." },
    { icon: Ico.shield, title: "Governance Built Into Every API", description: "OAuth, rate limiting, and audit logging are standard through API Manager on every API we publish, not an upsell." },
    { icon: Ico.users, title: "Dedicated Delivery Team", description: "The architects who scope your MuleSoft Implementation build and support it through go-live and beyond." },
    { icon: Ico.heart, title: "Support Beyond Go-Live", description: "Ongoing Anypoint Platform monitoring, DataWeave enhancements, and API roadmap support available the moment your APIs go live." },
  ],
};

const CASE_STUDIES = {
  eyebrow: "Case Study",
  heading: "Real MuleSoft Implementation Outcomes",
  intro: "Anonymized results from recent MuleSoft Implementation engagements across industries.",
  cases: [
    {
      title: "Healthcare Network Cuts New API Delivery Time by 60% After Anypoint Rebuild",
      industry: "Healthcare",
      challenge: "Every new integration required a custom point-to-point connection because APIs weren't designed for reuse and nothing was published to Anypoint Exchange.",
      solution: "We rebuilt the API layer around System, Process, and Experience APIs and published every reusable component to Anypoint Exchange with governed access.",
      outcome: "New APIs that previously took ten weeks now ship in under four, with 70% of new integrations reusing an existing System API.",
    },
    {
      title: "Retailer Reduces CloudHub Spend 35% Without Losing Uptime",
      industry: "Retail",
      challenge: "CloudHub worker sizes were set at go-live three years earlier and never revisited, while API traffic patterns changed completely.",
      solution: "We audited real traffic against provisioned vCores, rightsized every CloudHub environment, and implemented Anypoint Monitoring alerting tied to actual SLAs.",
      outcome: "CloudHub spend dropped 35% year-over-year while API uptime held at 99.97%.",
    },
  ],
};

const FAQS = [
  { q: "What does MuleSoft Implementation actually involve?", a: "MuleSoft Implementation covers designing your API-led connectivity model, building Mule applications and DataWeave transformations in Anypoint Studio, configuring API Manager governance, and deploying to CloudHub or Runtime Fabric — not just installing the platform." },
  { q: "What is API-led connectivity and why does it matter?", a: "API-led connectivity separates integrations into System APIs (backend systems of record), Process APIs (business logic and orchestration), and Experience APIs (channel-specific formatting), so a new channel or backend change touches only one layer instead of rewriting the whole integration." },
  { q: "How does MuleSoft licensing work?", a: "MuleSoft is licensed through Anypoint Platform subscription tiers based on vCore consumption and platform features, typically negotiated with Salesforce — MuleSoft's parent company — as an annual contract. We help scope the right tier before you commit." },
  { q: "Should we run on CloudHub or an on-premise Mule runtime?", a: "CloudHub suits teams that want a fully managed runtime with elastic scaling; Runtime Fabric or on-premise deployment suits regulated environments needing full network control. Most clients land on a hybrid model, and we help you decide based on your compliance and infrastructure requirements." },
  { q: "Can you migrate us from another iPaaS or a legacy ESB to MuleSoft?", a: "Yes. We've migrated integrations off legacy ESBs, hand-rolled middleware, and other iPaaS platforms onto Anypoint Platform, re-architecting them around API-led connectivity rather than lifting the old logic over as-is." },
  { q: "How long does a typical MuleSoft Implementation take?", a: "A focused implementation covering one or two API-led domains typically takes 10 to 14 weeks. Broader Anypoint Platform rollouts spanning multiple business units can take 4 to 6 months depending on backend system count." },
  { q: "What does MuleSoft Consulting Services cost?", a: "Cost depends on the number of APIs, backend systems involved, and whether you're starting fresh or migrating existing integrations. We scope a fixed-price engagement after a short discovery phase so you have a firm number before committing." },
  { q: "Do you provide support after our MuleSoft Implementation goes live?", a: "Yes. Every engagement can transition into ongoing Anypoint Platform monitoring, DataWeave enhancement, and API governance support so platform health doesn't depend on a single internal MuleSoft developer." },
];

const RELATED_SERVICES = {
  eyebrow: "Related Services",
  heading: "Explore More Ways Mirketa Extends Your Anypoint Platform",
  intro: "MuleSoft Implementation rarely stands alone — here's where a governed API layer connects next.",
  items: [
    { slug: INTEGRATION_PAGES.ENTERPRISE.slug, label: INTEGRATION_PAGES.ENTERPRISE.label, description: "Zoom out to platform-agnostic enterprise integration architecture spanning Boomi, MuleSoft, and beyond." },
    { slug: INTEGRATION_PAGES.BOOMI.slug, label: INTEGRATION_PAGES.BOOMI.label, description: "Compare Anypoint Platform against Dell Boomi AtomSphere for teams evaluating which iPaaS fits their landscape." },
    { slug: SALESFORCE_PAGES.DEVELOPER_SERVICES.slug, label: SALESFORCE_PAGES.DEVELOPER_SERVICES.label, description: "Pair MuleSoft Implementation with dedicated Salesforce developer services, since MuleSoft is a Salesforce company and the two platforms are built to work together." },
    { slug: ORACLE_PAGES.FUSION_IMPLEMENTATION.slug, label: ORACLE_PAGES.FUSION_IMPLEMENTATION.label, description: "Connect a MuleSoft-governed API layer to newly implemented Oracle Fusion Applications." },
    { slug: SERVICENOW_PAGES.HUB.slug, label: SERVICENOW_PAGES.HUB.label, description: "Extend Anypoint Platform APIs into ServiceNow workflows for IT service management and case automation." },
  ],
};

const FINAL_CTA = {
  heading: "Turn Anypoint Platform Into a Governed API Program",
  description: "Partner with Mirketa for a MuleSoft Implementation built on API-led connectivity from day one — or talk to an architect before you commit to a CloudHub or Runtime Fabric deployment model.",
  primaryCta: { label: "Get a MuleSoft Implementation Assessment", href: "#contact" },
  secondaryCta: { label: "Talk to a MuleSoft Architect", href: "#contact" },
};

const CONSULTATION = {
  eyebrow: "Get Started",
  heading: "Get a MuleSoft Implementation Assessment",
  description: "Tell us about your current systems, API maturity, and timeline — a MuleSoft-certified architect will follow up within one business day.",
  formTitle: "Get a Free MuleSoft Implementation Assessment",
};

const SEO = {
  title: pageSEO.title,
  description: pageSEO.description,
  canonical: `https://mirketa.us${pageSEO.slug}`,
  keywords: [
    "MuleSoft Implementation",
    "MuleSoft Consulting Services",
    "MuleSoft Development",
    "API Management",
    "Anypoint Platform",
    "Enterprise API Integration",
    "Cloud Integration",
    "MuleSoft Developers",
  ],
  schema: [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "MuleSoft Implementation",
      provider: { "@type": "Organization", name: "Mirketa Inc.", url: "https://mirketa.us" },
      name: "MuleSoft Implementation Services",
      description: "API-led connectivity design, Anypoint Platform implementation, and CloudHub/RTF deployment services built around MuleSoft's Anypoint Platform.",
      areaServed: "Global",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://mirketa.us/" },
        { "@type": "ListItem", position: 2, name: INTEGRATION_PAGES.MULESOFT.label, item: `https://mirketa.us${pageSEO.slug}` },
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

export default function MuleSoftImplementation() {
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

      gsap.utils.toArray(".mim-reveal").forEach((el) => {
        gsap.from(el, { opacity: prefersReduced ? 1 : 0, y: prefersReduced ? 0 : 32, duration: 0.7, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 88%" } });
      });
      gsap.utils.toArray(".mim-reveal-left").forEach((el) => {
        gsap.from(el, { opacity: prefersReduced ? 1 : 0, x: prefersReduced ? 0 : -30, duration: 0.7, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 88%" } });
      });
      gsap.utils.toArray(".mim-reveal-right").forEach((el) => {
        gsap.from(el, { opacity: prefersReduced ? 1 : 0, x: prefersReduced ? 0 : 30, duration: 0.7, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 88%" } });
      });
      gsap.utils.toArray(".mim-reveal-stagger").forEach((el) => {
        gsap.from(el.children, { opacity: prefersReduced ? 1 : 0, y: prefersReduced ? 0 : 26, duration: 0.6, stagger: 0.06, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 85%" } });
      });
      gsap.utils.toArray(".mim-zoom-in").forEach((el) => {
        gsap.from(el, { opacity: prefersReduced ? 1 : 0, scale: prefersReduced ? 1 : 0.94, duration: 0.6, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 88%" } });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="mulesoft-implementation">
      <Seo {...SEO} />
      <HeroSection heroTextRef={heroTextRef} heroRef={heroRef} />
      <TrustedByMarquee label="Trusted by Engineering Leaders Running Anypoint Platform at Scale" />
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
      <RelatedServices {...RELATED_SERVICES} className="mim-related mim-reveal" />
      <FinalCtaSection />
      <ConsultationSection {...CONSULTATION} />
      <StickyCta heroRef={heroRef} label="Get a MuleSoft Implementation Assessment" />
    </div>
  );
}

// ============================================================
// HERO
// ============================================================

function HeroSection({ heroTextRef, heroRef }) {
  return (
    <section ref={heroRef} className="mim-hero" style={{ backgroundImage: `url("${Images.heroMuleSoftImplementation}")` }} aria-label="MuleSoft Implementation by Mirketa">
      <div className="mim-hero__scrim" />
      <div className="container">
        <Breadcrumb items={BREADCRUMB_ITEMS} className="mim-breadcrumb" />
        <div className="mim-hero__inner">
          <div ref={heroTextRef} className="mim-hero__text">
            <span className="mim-badge">
              <span className="mim-badge__spark" aria-hidden="true">✦</span> {HERO.badge}
            </span>
            <h1>{HERO.title}</h1>
            <p className="mim-hero__description">{HERO.description}</p>
            <div className="mim-hero__ctas">
              <a href={HERO.primaryCta.href} className="btn btn-primary mim-btn">
                {HERO.primaryCta.label} <span aria-hidden="true">→</span>
              </a>
              <a href={HERO.secondaryCta.href} className="btn btn-secondary mim-btn">
                {HERO.secondaryCta.label}
              </a>
            </div>
            <ul className="mim-hero__metrics">
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
            className="mim-hero__visual mim-zoom-in"
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
    <section className="section mim-overview" aria-labelledby="mim-overview-heading">
      <div className="container mim-overview__grid">
        <div className="mim-reveal-left">
          <p className="mim-eyebrow">{SERVICE_OVERVIEW.eyebrow}</p>
          <h2 id="mim-overview-heading">{SERVICE_OVERVIEW.heading}</h2>
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
    <section className="section mim-challenges" aria-labelledby="mim-challenges-heading">
      <div className="container">
        <div className="section-heading mim-reveal">
          <p className="mim-eyebrow">{CHALLENGES.eyebrow}</p>
          <h2 id="mim-challenges-heading">{CHALLENGES.heading}</h2>
          <p>{CHALLENGES.intro}</p>
        </div>
        <div className="mim-challenges__grid mim-reveal-stagger">
          {CHALLENGES.items.map((c) => (
            <div className="mim-challenge-card" key={c.title}>
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
    <section className="section mim-capabilities" aria-labelledby="mim-capabilities-heading">
      <div className="container">
        <div className="section-heading mim-reveal">
          <p className="mim-eyebrow">{CAPABILITIES.eyebrow}</p>
          <h2 id="mim-capabilities-heading">{CAPABILITIES.heading}</h2>
          <p>{CAPABILITIES.intro}</p>
        </div>
        <div className="mim-capabilities__grid mim-reveal-stagger">
          {CAPABILITIES.items.map((c) => (
            <div className="mim-capability-item" key={c.title}>
              <p className="mim-card-title">{c.title}</p>
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
    <section className="section mim-services" aria-labelledby="mim-services-heading">
      <div className="container">
        <div className="section-heading mim-reveal">
          <p className="mim-eyebrow">{INTEGRATION_SERVICES.eyebrow}</p>
          <h2 id="mim-services-heading">{INTEGRATION_SERVICES.heading}</h2>
          <p>{INTEGRATION_SERVICES.intro}</p>
        </div>
        <div className="mim-services__grid mim-reveal-stagger">
          {INTEGRATION_SERVICES.items.map((c) => (
            <div className="mim-service-card" key={c.title}>
              <span className="mim-service-card__icon">{c.icon}</span>
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
    <section className="section mim-features" aria-labelledby="mim-features-heading">
      <div className="container">
        <div className="section-heading mim-reveal">
          <p className="mim-eyebrow">{FEATURES.eyebrow}</p>
          <h2 id="mim-features-heading">{FEATURES.heading}</h2>
          <p>{FEATURES.intro}</p>
        </div>
        <div className="mim-features__layout">
          <div className="mim-features__grid mim-reveal-stagger">
            {FEATURES.items.map((f) => (
              <div className="mim-feature-item" key={f.title}>
                <p className="mim-card-title">{f.title}</p>
                <p>{f.description}</p>
              </div>
            ))}
          </div>
          <div className="mim-reveal-right">
            <WorkflowDiagram
              title="API-Led Connectivity Request Flow"
              steps={[{ label: "Experience API" }, { label: "Process API" }, { label: "System API" }, { label: "Backend System" }, { label: "Response" }]}
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
    <section className="section mim-benefits" aria-labelledby="mim-benefits-heading">
      <div className="container">
        <div className="section-heading mim-reveal">
          <p className="mim-eyebrow">{BENEFITS.eyebrow}</p>
          <h2 id="mim-benefits-heading">{BENEFITS.heading}</h2>
          <p>{BENEFITS.intro}</p>
        </div>
        <div className="mim-benefits__stats mim-reveal-stagger">
          {BENEFITS.stats.map((s) => (
            <AnimatedCounter key={s.label} value={s.value} label={s.label} className="mim-stat" />
          ))}
        </div>
        <div className="mim-benefits__grid mim-reveal-stagger">
          {BENEFITS.items.map((b) => (
            <div className="mim-benefit-item" key={b.title}>
              <span aria-hidden="true">{Ico.check}</span>
              <div>
                <p className="mim-card-title">{b.title}</p>
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
    <section className="section mim-process" aria-labelledby="mim-process-heading">
      <div className="container">
        <div className="section-heading mim-reveal">
          <p className="mim-eyebrow">{PROCESS.eyebrow}</p>
          <h2 id="mim-process-heading">{PROCESS.heading}</h2>
          <p>{PROCESS.intro}</p>
        </div>
        <div className="mim-zoom-in">
          <SupplyChainMap
            title="Systems Connected Through Anypoint Platform"
            nodes={[
              { label: "Anypoint Platform", short: "APIP" },
              { label: "CRM", short: "CRM" },
              { label: "ERP", short: "ERP" },
              { label: "Cloud Apps", short: "SaaS" },
              { label: "Legacy Systems", short: "LEG" },
            ]}
          />
        </div>
        <div className="mim-process__grid mim-reveal-stagger">
          {PROCESS.detail.map((p, i) => (
            <div className="mim-step-card" key={p.name}>
              <span className="mim-step-card__num">{String(i + 1).padStart(2, "0")}</span>
              <p className="mim-card-title">{p.name}</p>
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
    <section className="section mim-tech" aria-labelledby="mim-tech-heading">
      <div className="container">
        <div className="section-heading mim-reveal">
          <p className="mim-eyebrow">{TECHNOLOGIES.eyebrow}</p>
          <h2 id="mim-tech-heading">{TECHNOLOGIES.heading}</h2>
          <p>{TECHNOLOGIES.intro}</p>
        </div>
        <div className="mim-tech__grid mim-reveal-stagger">
          {TECHNOLOGIES.items.map((t) => (
            <div className="mim-tech-card" key={t.title}>
              <span className="mim-tech-card__icon">{t.icon}</span>
              <p className="mim-card-title">{t.title}</p>
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
    <section className="section mim-industries" aria-labelledby="mim-industries-heading">
      <div className="container">
        <div className="section-heading mim-reveal">
          <p className="mim-eyebrow">{INDUSTRIES.eyebrow}</p>
          <h2 id="mim-industries-heading">{INDUSTRIES.heading}</h2>
          <p>{INDUSTRIES.intro}</p>
        </div>
        <div className="mim-industries__grid mim-reveal-stagger">
          {INDUSTRIES.items.map((n) => (
            <div className="mim-industry-card" key={n.title}>
              <span className="mim-industry-card__icon">{n.icon}</span>
              <p className="mim-card-title">{n.title}</p>
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
    <section className="section mim-why" aria-labelledby="mim-why-heading">
      <div className="container">
        <div className="section-heading mim-reveal">
          <p className="mim-eyebrow">{WHY_MIRKETA.eyebrow}</p>
          <h2 id="mim-why-heading">{WHY_MIRKETA.heading}</h2>
          <p>{WHY_MIRKETA.intro}</p>
        </div>
        <div className="mim-why__grid mim-reveal-stagger">
          {WHY_MIRKETA.items.map((w) => (
            <div className="mim-why-card" key={w.title}>
              <span className="mim-why-card__icon">{w.icon}</span>
              <p className="mim-card-title">{w.title}</p>
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
    <section className="section mim-cases" aria-labelledby="mim-cases-heading">
      <div className="container">
        <div className="section-heading mim-reveal">
          <p className="mim-eyebrow">{CASE_STUDIES.eyebrow}</p>
          <h2 id="mim-cases-heading">{CASE_STUDIES.heading}</h2>
          <p>{CASE_STUDIES.intro}</p>
        </div>
        <div className="mim-cases__grid mim-reveal-stagger">
          {CASE_STUDIES.cases.map((c) => (
            <div className="mim-case-card" key={c.title}>
              <span className="mim-case-card__tag">{c.industry}</span>
              <p className="mim-card-title">{c.title}</p>
              <dl className="mim-case-card__fields">
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
    <section className="section mim-faq" aria-labelledby="mim-faq-heading">
      <div className="container">
        <div className="section-heading mim-reveal">
          <p className="mim-eyebrow">FAQ</p>
          <h2 id="mim-faq-heading">Frequently Asked Questions About MuleSoft Implementation</h2>
        </div>
        <FaqAccordion items={FAQS} className="mim-reveal" searchPlaceholder="Ask a question — e.g. &quot;Anypoint&quot;, &quot;CloudHub&quot;, &quot;licensing&quot;..." />
        <p className="mim-faq__links">
          Related reading: <Link to={INTEGRATION_PAGES.ENTERPRISE.slug}>{INTEGRATION_PAGES.ENTERPRISE.label}</Link>,{" "}
          <Link to={INTEGRATION_PAGES.BOOMI.slug}>{INTEGRATION_PAGES.BOOMI.label}</Link>,{" "}
          <Link to={SALESFORCE_PAGES.DEVELOPER_SERVICES.slug}>{SALESFORCE_PAGES.DEVELOPER_SERVICES.label}</Link>,{" "}
          <Link to={SERVICENOW_PAGES.HUB.slug}>{SERVICENOW_PAGES.HUB.label}</Link>,{" "}
          <Link to={ORACLE_PAGES.FUSION_IMPLEMENTATION.slug}>{ORACLE_PAGES.FUSION_IMPLEMENTATION.label}</Link>.
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
    <section className="mim-final-cta mim-reveal" aria-labelledby="mim-final-cta-heading">
      <div className="container mim-final-cta__inner">
        <h2 id="mim-final-cta-heading">{FINAL_CTA.heading}</h2>
        <p>{FINAL_CTA.description}</p>
        <div className="mim-final-cta__ctas">
          <a href={FINAL_CTA.primaryCta.href} className="btn btn-primary mim-btn">
            {FINAL_CTA.primaryCta.label} <span aria-hidden="true">→</span>
          </a>
          <a href={FINAL_CTA.secondaryCta.href} className="btn btn-secondary mim-btn">
            {FINAL_CTA.secondaryCta.label}
          </a>
        </div>
      </div>
    </section>
  );
}
