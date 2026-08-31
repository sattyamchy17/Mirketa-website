import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Images } from "../../../assets/images/index.js";
import {
  INTEGRATION_PAGES,
  ORACLE_PAGES,
  SALESFORCE_PAGES,
  SERVICENOW_PAGES,
  NETSUITE_PAGES,
  WORKDAY_PAGES,
  CLOUD_PAGES,
} from "../../../config/pageSlugs.js";
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
import "./BoomiIntegrationServices.css";

gsap.registerPlugin(ScrollTrigger);

// ============================================================
// SLUG / SEO CONFIGURATION — kept local to this component per
// project convention, sourced from the central pageSlugs.js entry
// so the URL itself still only needs to change in one place.
// ============================================================

export const pageSEO = {
  slug: `${INTEGRATION_PAGES.BOOMI.slug}/`,
  title: "Boomi Integration Services | Mirketa",
  description:
    "Boomi Integration Services from certified Dell Boomi consultants — AtomSphere implementation, API management, Master Data Hub, and EDI on Boomi.",
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
  atom: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="2.2" fill="currentColor" /><ellipse cx="12" cy="12" rx="9" ry="3.6" stroke="currentColor" strokeWidth="1.3" /><ellipse cx="12" cy="12" rx="9" ry="3.6" stroke="currentColor" strokeWidth="1.3" transform="rotate(60 12 12)" /><ellipse cx="12" cy="12" rx="9" ry="3.6" stroke="currentColor" strokeWidth="1.3" transform="rotate(120 12 12)" /></svg>
  ),
  flow: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="4" width="6" height="5" rx="1.2" stroke="currentColor" strokeWidth="1.4" /><rect x="15" y="15" width="6" height="5" rx="1.2" stroke="currentColor" strokeWidth="1.4" /><path d="M9 6.5h5a3 3 0 013 3V13a3 3 0 01-3 3H9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
  ),
  spark: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3l1.8 5.4L19 10l-5.2 1.6L12 17l-1.8-5.4L5 10l5.2-1.6L12 3z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /></svg>
  ),
};

// ============================================================
// DATA
// ============================================================

const BREADCRUMB_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Platforms & Technology", href: "/" },
  { label: "Boomi Integration Services and Solutions" },
];

const HERO = {
  badge: "Certified Dell Boomi Implementation Partner",
  title: "Boomi Integration Services for a Faster, Low-Code AtomSphere Practice",
  description:
    "Mirketa's Boomi Integration Services help IT and enterprise application teams design, build, and govern integrations on the Dell Boomi AtomSphere platform — from Atom and Molecule deployment topology through process design, API Management, and Master Data Hub, so every new connector reuses what the last one already proved out.",
  primaryCta: { label: "Get a Boomi Architecture Review", href: "#contact" },
  secondaryCta: { label: "Talk to a Dell Boomi Consultant", href: "#contact" },
  metrics: ["Boomi-Certified Solution Architects", "Low-Code Process Design", "AtomSphere API Management", "Fixed-Scope Delivery Sprints"],
};

const HERO_DASHBOARD = {
  title: "AtomSphere Operations Console",
  stats: [
    { label: "ATOM UPTIME", value: "99.97%", caption: "Trailing 90-day average" },
    { label: "ACTIVE PROCESSES", value: "62", caption: "Running across all Atoms" },
    { label: "CONNECTOR LIBRARY", value: "40+", caption: "Reusable across processes" },
  ],
  rows: [
    { title: "Order-to-cash — ERP sync", meta: "Molecule cluster · Production", tone: "good", status: "Healthy" },
    { title: "EDI 850 purchase order intake", meta: "Trading partner gateway", tone: "good", status: "Processed" },
    { title: "Master Data Hub reconciliation", meta: "Customer golden record match", tone: "neutral", status: "Reviewing" },
  ],
  floatingCards: [
    { icon: Ico.atom, title: "62 Active Processes", subtitle: "Governed on AtomSphere" },
    { icon: Ico.shield, title: "Zero Unreviewed Deploys", subtitle: "Promotion path enforced" },
  ],
};

const SERVICE_OVERVIEW = {
  eyebrow: "Service Overview",
  heading: "Boomi Integration Services Scoped Around AtomSphere, Not Generic iPaaS Theory",
  paragraphs: [
    "Dell Boomi is a low-code integration platform, which means a surprising amount of a Boomi program's success or failure gets decided by who is allowed to drag a shape onto the process canvas and under what review process. Mirketa's Boomi Integration Services start from that reality. We treat AtomSphere as a serious enterprise runtime — with its own deployment topology of Atoms and Molecules, its own connector governance, and its own upgrade cadence — rather than as a drag-and-drop tool anyone on the team can pick up without oversight.",
    "A typical engagement begins with an audit of what's already running: how many Atoms and Molecules are deployed, whether they're sized correctly for current process volume, which processes were built with reusable sub-processes and which were copy-pasted, and whether Master Data Hub is doing any real reconciliation work or sitting unconfigured. From there we design the process architecture, connector standards, and environment promotion path — dev, test, and production Atom clouds — before writing a single map.",
    "Because Boomi's value is largely in speed, our Boomi development work is judged on more than whether an integration works once in testing. We build for the tenth process, not just the first: naming conventions for components, reusable sub-processes for common patterns like error notification and retry logic, and documented connector configurations so the next Boomi developer on your team — ours or yours — isn't reverse-engineering an undocumented map. That is what Boomi Integration Services should mean in practice: a governed, low-code integration platform that scales with your application landscape instead of accumulating undocumented process sprawl.",
  ],
};

const CHALLENGES = {
  eyebrow: "Business Challenges",
  heading: "Where Boomi Implementations Quietly Go Off the Rails",
  intro:
    "Boomi's low-code model makes it easy to get a first integration live fast, which is exactly why governance problems tend to show up later rather than at kickoff. These are the patterns we see most often when we're brought in to stabilize an existing Boomi environment.",
  items: [
    { title: "Atoms Deployed Without a Scaling Plan", description: "A single Atom sized for a pilot project is still running every production process eighteen months later, with no Molecule or high-availability cluster in place when it finally falls over during peak volume." },
    { title: "Process Canvases Built Without Reusable Sub-Processes", description: "The same error-handling, logging, and field-mapping logic gets rebuilt inside every new process because nobody established a shared library of sub-processes to reference instead." },
    { title: "No Governance Over Who Can Publish", description: "Any developer with platform access can push a new integration process straight to a production Atom, with no peer review, versioning discipline, or environment promotion gate in place." },
    { title: "Master Data Hub Never Configured", description: "The platform's built-in data hub for customer, product, or vendor golden records sits licensed but unused, so the same duplicate and conflicting records that existed before Boomi still drift across systems." },
  ],
};

const CAPABILITIES = {
  eyebrow: "Our Capabilities",
  heading: "What Mirketa's Dell Boomi Practice Actually Covers",
  intro: "Our Boomi consultants work across the full AtomSphere suite, not just the process-building canvas — these are the capability areas we bring to every engagement.",
  items: [
    { title: "AtomSphere Platform Architecture", description: "Atom, Molecule, and cloud runtime topology designed for your actual transaction volume and high-availability requirements, not a default single-Atom setup." },
    { title: "Low-Code Process Development", description: "Integration processes built on the Boomi process canvas with reusable sub-processes, documented maps, and consistent naming conventions from day one." },
    { title: "Boomi API Management", description: "API design, publishing, and governance through Boomi's API Management layer, including authentication, throttling, and developer portal documentation." },
    { title: "Master Data Hub Configuration", description: "Golden-record models configured in Boomi Master Data Hub so customer, product, and vendor data reconciles automatically instead of drifting across connected systems." },
  ],
};

const INTEGRATION_SERVICES = {
  eyebrow: "Integration Services",
  heading: "Six Ways Mirketa Delivers Boomi Integration Services",
  intro: "Every Boomi engagement starts with one or more of these service lines and expands as your integration roadmap matures.",
  items: [
    { icon: Ico.atom, title: "Boomi AtomSphere Implementation", description: "End-to-end setup of your AtomSphere environment, including Atom and Molecule deployment, environment management, and connector licensing." },
    { icon: Ico.route, title: "Boomi Process Design & Development", description: "Integration processes built on the process canvas with reusable components, proper error handling, and documentation your team can maintain." },
    { icon: Ico.plug, title: "Boomi API Management", description: "REST and SOAP API design, publishing, and governance through Boomi's API Management, with consistent security policy across every endpoint." },
    { icon: Ico.db, title: "Master Data Hub Configuration", description: "Golden-record models and match rules configured in Boomi Master Data Hub to give every connected system one trusted version of core data." },
    { icon: Ico.layers, title: "EDI/B2B Integration on Boomi", description: "Trading partner onboarding and EDI document processing built on Boomi's B2B/EDI management capability, including 850, 810, 856, and custom document types." },
    { icon: Ico.shield, title: "Boomi Upgrade & Governance", description: "Version upgrade planning, process review standards, and a promotion path between development, test, and production Atoms." },
  ],
};

const FEATURES = {
  eyebrow: "Platform Features",
  heading: "What a Properly Governed Boomi Environment Actually Includes",
  intro: "These are the capability areas every Mirketa Boomi engagement is built to deliver, whether we're starting fresh or stabilizing an existing AtomSphere account.",
  items: [
    { title: "Reusable Sub-Process Library", description: "Common logic like error notification, retry handling, and field mapping built once as a shared sub-process instead of duplicated across every integration." },
    { title: "Centralized Process Monitoring", description: "Boomi's Process Reporting and Atom Management dashboards configured so every execution, error, and document is visible from one place." },
    { title: "Error Handling & Automatic Retry", description: "Try/catch shapes and automated retry logic built into every process so a downstream outage doesn't require manual intervention to recover." },
    { title: "Boomi Suggest & AI-Assisted Mapping", description: "Boomi Suggest's machine-learning field mapping used to accelerate map development, reviewed and validated by our developers before deployment." },
    { title: "Environment Promotion Pipeline", description: "A documented path for moving a process from a development Atom to test and then production, with version control at each stage." },
    { title: "Hybrid Atom Connectivity", description: "Secure, on-premise Atom or Molecule deployment for connecting cloud applications to internal systems without exposing your network." },
  ],
};

const BENEFITS = {
  eyebrow: "Benefits",
  heading: "What Changes Once Your Boomi Environment Is Actually Governed",
  intro: "These are the outcomes Mirketa's Boomi Integration Services clients consistently report after we stabilize or stand up their AtomSphere practice.",
  stats: [
    { value: "65%", label: "Reduction in Duplicate Process Logic" },
    { value: "99.97%", label: "Average Atom Uptime" },
    { value: "3x", label: "Faster Delivery on New Boomi Processes" },
    { value: "0", label: "Unreviewed Production Deployments" },
  ],
  items: [
    { title: "A Boomi Environment That Scales", description: "Reusable sub-processes and connector standards mean the tenth integration process is faster to build than the first." },
    { title: "One Trusted Version of Core Data", description: "Master Data Hub reconciles customer, product, and vendor records so connected systems stop disagreeing with each other." },
    { title: "Governed API Exposure", description: "Every API published through Boomi API Management follows the same authentication and rate-limiting policy, not a one-off decision per developer." },
    { title: "Fewer Production Surprises", description: "A tested promotion path from development to production Atoms catches breaking changes before they reach live processes." },
  ],
};

const PROCESS = {
  eyebrow: "Integration Process",
  heading: "A Five-Stage Path From Discovery to Governed Boomi Operations",
  intro: "Our Boomi delivery methodology has been refined across dozens of AtomSphere engagements, from greenfield implementations to stabilizing environments we inherited from another partner.",
  steps: [
    { label: "Discovery" },
    { label: "Process Design" },
    { label: "Build & Connect" },
    { label: "Testing" },
    { label: "Governance & Handover" },
  ],
  detail: [
    { name: "Discovery", description: "Every existing Atom, Molecule, process, and connector inventoried and scored for reuse, risk, and technical debt before any new build work begins." },
    { name: "Process Design", description: "Process canvas architecture, sub-process library, naming conventions, and Atom topology documented and agreed before development starts." },
    { name: "Build & Connect", description: "Integration processes and connectors built against the governed design, unit tested inside a development Atom before promotion." },
    { name: "Testing", description: "End-to-end validation of full business transactions across every connected system, including document-level testing for EDI flows." },
    { name: "Governance & Handover", description: "Documentation, monitoring dashboards, and a review process handed to your team or retained under an ongoing Boomi support model." },
  ],
};

const TECHNOLOGIES = {
  eyebrow: "Technology Stack",
  heading: "The Boomi Ecosystem Our Consultants Build On",
  intro: "Our architects hold active Boomi certifications across the AtomSphere suite, so every recommendation reflects the platform's actual capability rather than a workaround.",
  items: [
    { icon: Ico.atom, title: "Boomi AtomSphere" },
    { icon: Ico.plug, title: "Boomi API Management" },
    { icon: Ico.db, title: "Boomi Master Data Hub" },
    { icon: Ico.flow, title: "Boomi Flow" },
    { icon: Ico.layers, title: "Boomi EDI/B2B Management" },
    { icon: Ico.spark, title: "Boomi Suggest & AI Mapping" },
  ],
};

const INDUSTRIES = {
  eyebrow: "Industries Served",
  heading: "Boomi Integration Experience Across Industries",
  intro: "Every industry brings its own trading-partner network, compliance requirement, and system landscape — our Boomi consultants bring specific domain context to each one.",
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
  heading: "A Dell Boomi Consulting Partner That Builds for Reuse",
  intro: "Plenty of partners can drag a few shapes onto a Boomi process canvas and call it done. Fewer design the environment so the eleventh process is easier than the first.",
  items: [
    { icon: Ico.award, title: "Boomi-Certified Architects", description: "Our consultants hold active Dell Boomi certifications across process development, API Management, and Master Data Hub." },
    { icon: Ico.compass, title: "Architecture-First Methodology", description: "Every engagement starts with an Atom topology and process design document, not a race to publish the first integration." },
    { icon: Ico.clock, title: "Fixed-Scope Delivery Sprints", description: "A documented scope and timeline agreed before kickoff, with change requests handled transparently rather than as scope creep." },
    { icon: Ico.shield, title: "Governance Built Into Every Process", description: "Naming conventions, sub-process reuse, and environment promotion gates are standard on every Boomi engagement, not an upsell." },
    { icon: Ico.users, title: "Dedicated Delivery Team", description: "The Boomi architects who scope your engagement build and support it through go-live and beyond." },
    { icon: Ico.heart, title: "Support Beyond Go-Live", description: "Ongoing Atom monitoring, process enhancement, and upgrade support are available the moment your Boomi environment goes live." },
  ],
};

const CASE_STUDIES = {
  eyebrow: "Case Study",
  heading: "Real Boomi Integration Outcomes",
  intro: "Anonymized results from recent Dell Boomi engagements across industries.",
  cases: [
    {
      title: "Manufacturer Consolidates Six Undocumented Boomi Processes Into a Governed Library",
      industry: "Manufacturing",
      challenge: "A prior contractor had built six production integration processes with no shared sub-processes, no documentation, and a single Atom running every workload.",
      solution: "We rebuilt the process library around reusable sub-processes, deployed a Molecule for high availability, and documented every connector configuration.",
      outcome: "New integration processes now ship in under two weeks, and the environment survived its first peak-season volume spike without a single Atom outage.",
    },
    {
      title: "Distributor Automates EDI Onboarding for 40+ Trading Partners on Boomi",
      industry: "Retail & Distribution",
      challenge: "Trading partner EDI onboarding was handled manually per partner, taking weeks and creating inconsistent document handling across the partner network.",
      solution: "We implemented Boomi's B2B/EDI management module with standardized 850, 810, and 856 document processing and a templated onboarding process.",
      outcome: "New trading partner onboarding time dropped from an average of three weeks to under four days.",
    },
  ],
};

const FAQS = [
  { q: "What are Boomi Integration Services?", a: "Boomi Integration Services cover the design, development, and governance of integrations built on the Dell Boomi AtomSphere platform — including process design on the low-code canvas, Atom and Molecule deployment, API Management, Master Data Hub configuration, and EDI/B2B trading partner integration." },
  { q: "What is the difference between a Boomi Atom and a Molecule?", a: "An Atom is a single lightweight runtime engine that executes integration processes. A Molecule is a clustered group of Atoms that provides high availability and load balancing for production workloads that a single Atom can't reliably handle alone." },
  { q: "How does Dell Boomi licensing typically work?", a: "Boomi is generally licensed by connector, API call volume, and the specific AtomSphere modules you use — such as Integration, API Management, Master Data Hub, EDI, or Flow. We help clients map their actual usage to the right license tier before signing, so they aren't overpaying for modules they won't use." },
  { q: "Can you migrate us from another iPaaS platform to Boomi?", a: "Yes. We've migrated integration workloads from custom middleware, MuleSoft, and other iPaaS platforms onto Boomi, re-architecting process logic to take advantage of AtomSphere's native connectors and sub-process reuse rather than a direct one-to-one port." },
  { q: "How long does a typical Boomi implementation take?", a: "A focused implementation connecting two or three systems typically takes 6 to 10 weeks. Larger programs involving Master Data Hub, API Management, and multiple trading partners can run 4 to 6 months depending on scope." },
  { q: "Do you provide ongoing support after our Boomi environment goes live?", a: "Yes. Every engagement can transition into an ongoing Boomi support model covering Atom monitoring, process enhancements, and version upgrade management, so platform health doesn't rest on a single internal owner." },
  { q: "Is Dell Boomi a good fit for connecting on-premise and cloud systems?", a: "Yes. Boomi's local Atom runtime can be deployed inside your network to securely connect on-premise systems like an ERP or legacy database to cloud applications, without exposing internal systems directly to the internet." },
  { q: "Can Boomi Master Data Hub actually fix duplicate customer records?", a: "Yes, when it's configured with the right match rules and golden-record model. Master Data Hub is often licensed but left unconfigured — once properly set up, it reconciles duplicate and conflicting records across every connected system automatically." },
];

const RELATED_SERVICES = {
  eyebrow: "Related Services",
  heading: "Explore More Ways Mirketa Connects Your Enterprise Systems",
  intro: "Boomi is often one piece of a larger enterprise application and integration landscape. Here's where to look next.",
  items: [
    { slug: INTEGRATION_PAGES.ENTERPRISE.slug, label: INTEGRATION_PAGES.ENTERPRISE.label, description: "Step back to platform-agnostic enterprise integration architecture spanning ERP, CRM, and legacy systems." },
    { slug: INTEGRATION_PAGES.MULESOFT.slug, label: INTEGRATION_PAGES.MULESOFT.label, description: "Compare Boomi against API-led connectivity on MuleSoft Anypoint Platform for complex enterprise API programs." },
    { slug: NETSUITE_PAGES.AI.slug, label: NETSUITE_PAGES.AI.label, description: "Pair a Boomi-connected NetSuite ERP with AI-driven forecasting and automation on the NetSuite platform." },
    { slug: SALESFORCE_PAGES.DEVELOPER_SERVICES.slug, label: SALESFORCE_PAGES.DEVELOPER_SERVICES.label, description: "Extend Salesforce with custom development before or after integrating it into your Boomi process layer." },
    { slug: ORACLE_PAGES.FUSION_IMPLEMENTATION.slug, label: ORACLE_PAGES.FUSION_IMPLEMENTATION.label, description: "Connect Oracle Fusion Applications into your Boomi-governed integration architecture." },
  ],
};

const FINAL_CTA = {
  heading: "Get Boomi Integration Services Built for Reuse, Not Just Go-Live",
  description: "Partner with Mirketa's Boomi-certified consultants to design an AtomSphere environment your team can actually govern — or talk to an architect before you commit to a scope.",
  primaryCta: { label: "Get a Boomi Architecture Review", href: "#contact" },
  secondaryCta: { label: "Talk to a Dell Boomi Consultant", href: "#contact" },
};

const CONSULTATION = {
  eyebrow: "Get Started",
  heading: "Get a Boomi Integration Services Consultation",
  description: "Tell us about your current AtomSphere environment, integration goals, and timeline — a Dell Boomi consultant will follow up within one business day.",
  formTitle: "Get a Free Boomi Architecture Review",
};

const SEO = {
  title: pageSEO.title,
  description: pageSEO.description,
  canonical: `https://mirketa.us${pageSEO.slug}`,
  keywords: [
    "Boomi Integration Services",
    "Dell Boomi Consulting",
    "Boomi Implementation",
    "Boomi Integration Solutions",
    "Cloud Integration",
    "API Management",
    "Integration Platform as a Service",
    "Boomi Development",
  ],
  schema: [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "Boomi Integration Services",
      provider: { "@type": "Organization", name: "Mirketa Inc.", url: "https://mirketa.us" },
      name: "Boomi Integration Services",
      description: "Dell Boomi AtomSphere implementation, process development, API Management, and Master Data Hub configuration services.",
      areaServed: "Global",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://mirketa.us/" },
        { "@type": "ListItem", position: 2, name: INTEGRATION_PAGES.BOOMI.label, item: `https://mirketa.us${pageSEO.slug}` },
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

export default function BoomiIntegrationServices() {
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

      gsap.utils.toArray(".bis-reveal").forEach((el) => {
        gsap.from(el, { opacity: prefersReduced ? 1 : 0, y: prefersReduced ? 0 : 32, duration: 0.7, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 88%" } });
      });
      gsap.utils.toArray(".bis-reveal-left").forEach((el) => {
        gsap.from(el, { opacity: prefersReduced ? 1 : 0, x: prefersReduced ? 0 : -30, duration: 0.7, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 88%" } });
      });
      gsap.utils.toArray(".bis-reveal-right").forEach((el) => {
        gsap.from(el, { opacity: prefersReduced ? 1 : 0, x: prefersReduced ? 0 : 30, duration: 0.7, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 88%" } });
      });
      gsap.utils.toArray(".bis-reveal-stagger").forEach((el) => {
        gsap.from(el.children, { opacity: prefersReduced ? 1 : 0, y: prefersReduced ? 0 : 26, duration: 0.6, stagger: 0.06, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 85%" } });
      });
      gsap.utils.toArray(".bis-zoom-in").forEach((el) => {
        gsap.from(el, { opacity: prefersReduced ? 1 : 0, scale: prefersReduced ? 1 : 0.94, duration: 0.6, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 88%" } });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="boomi-integration-services">
      <Seo {...SEO} />
      <HeroSection heroTextRef={heroTextRef} heroRef={heroRef} />
      <TrustedByMarquee label="Trusted by IT Leaders Running Dell Boomi at Enterprise Scale" />
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
      <RelatedServices {...RELATED_SERVICES} className="bis-related bis-reveal" />
      <FinalCtaSection />
      <ConsultationSection {...CONSULTATION} />
      <StickyCta heroRef={heroRef} label="Get a Boomi Architecture Review" />
    </div>
  );
}

// ============================================================
// HERO
// ============================================================

function HeroSection({ heroTextRef, heroRef }) {
  return (
    <section ref={heroRef} className="bis-hero" style={{ backgroundImage: `url("${Images.heroBoomiIntegration}")` }} aria-label="Boomi Integration Services by Mirketa">
      <div className="bis-hero__scrim" />
      <div className="container">
        <Breadcrumb items={BREADCRUMB_ITEMS} className="bis-breadcrumb" />
        <div className="bis-hero__inner">
          <div ref={heroTextRef} className="bis-hero__text">
            <span className="bis-badge">
              <span className="bis-badge__spark" aria-hidden="true">✦</span> {HERO.badge}
            </span>
            <h1>{HERO.title}</h1>
            <p className="bis-hero__description">{HERO.description}</p>
            <div className="bis-hero__ctas">
              <a href={HERO.primaryCta.href} className="btn btn-primary bis-btn">
                {HERO.primaryCta.label} <span aria-hidden="true">→</span>
              </a>
              <a href={HERO.secondaryCta.href} className="btn btn-secondary bis-btn">
                {HERO.secondaryCta.label}
              </a>
            </div>
            <ul className="bis-hero__metrics">
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
            className="bis-hero__visual bis-zoom-in"
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
    <section className="section bis-overview" aria-labelledby="bis-overview-heading">
      <div className="container bis-overview__grid">
        <div className="bis-reveal-left">
          <p className="bis-eyebrow">{SERVICE_OVERVIEW.eyebrow}</p>
          <h2 id="bis-overview-heading">{SERVICE_OVERVIEW.heading}</h2>
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
    <section className="section bis-challenges" aria-labelledby="bis-challenges-heading">
      <div className="container">
        <div className="section-heading bis-reveal">
          <p className="bis-eyebrow">{CHALLENGES.eyebrow}</p>
          <h2 id="bis-challenges-heading">{CHALLENGES.heading}</h2>
          <p>{CHALLENGES.intro}</p>
        </div>
        <div className="bis-challenges__grid bis-reveal-stagger">
          {CHALLENGES.items.map((c) => (
            <div className="bis-challenge-card" key={c.title}>
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
    <section className="section bis-capabilities" aria-labelledby="bis-capabilities-heading">
      <div className="container">
        <div className="section-heading bis-reveal">
          <p className="bis-eyebrow">{CAPABILITIES.eyebrow}</p>
          <h2 id="bis-capabilities-heading">{CAPABILITIES.heading}</h2>
          <p>{CAPABILITIES.intro}</p>
        </div>
        <div className="bis-capabilities__grid bis-reveal-stagger">
          {CAPABILITIES.items.map((c) => (
            <div className="bis-capability-item" key={c.title}>
              <p className="bis-card-title">{c.title}</p>
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
    <section className="section bis-services" aria-labelledby="bis-services-heading">
      <div className="container">
        <div className="section-heading bis-reveal">
          <p className="bis-eyebrow">{INTEGRATION_SERVICES.eyebrow}</p>
          <h2 id="bis-services-heading">{INTEGRATION_SERVICES.heading}</h2>
          <p>{INTEGRATION_SERVICES.intro}</p>
        </div>
        <div className="bis-services__grid bis-reveal-stagger">
          {INTEGRATION_SERVICES.items.map((c) => (
            <div className="bis-service-card" key={c.title}>
              <span className="bis-service-card__icon">{c.icon}</span>
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
    <section className="section bis-features" aria-labelledby="bis-features-heading">
      <div className="container">
        <div className="section-heading bis-reveal">
          <p className="bis-eyebrow">{FEATURES.eyebrow}</p>
          <h2 id="bis-features-heading">{FEATURES.heading}</h2>
          <p>{FEATURES.intro}</p>
        </div>
        <div className="bis-features__layout">
          <div className="bis-features__grid bis-reveal-stagger">
            {FEATURES.items.map((f) => (
              <div className="bis-feature-item" key={f.title}>
                <p className="bis-card-title">{f.title}</p>
                <p>{f.description}</p>
              </div>
            ))}
          </div>
          <div className="bis-reveal-right">
            <WorkflowDiagram
              title="Boomi Process: Trigger → Deliver"
              steps={[{ label: "Trigger" }, { label: "Map" }, { label: "Transform" }, { label: "Route" }, { label: "Deliver" }]}
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
    <section className="section bis-benefits" aria-labelledby="bis-benefits-heading">
      <div className="container">
        <div className="section-heading bis-reveal">
          <p className="bis-eyebrow">{BENEFITS.eyebrow}</p>
          <h2 id="bis-benefits-heading">{BENEFITS.heading}</h2>
          <p>{BENEFITS.intro}</p>
        </div>
        <div className="bis-benefits__stats bis-reveal-stagger">
          {BENEFITS.stats.map((s) => (
            <AnimatedCounter key={s.label} value={s.value} label={s.label} className="bis-stat" />
          ))}
        </div>
        <div className="bis-benefits__grid bis-reveal-stagger">
          {BENEFITS.items.map((b) => (
            <div className="bis-benefit-item" key={b.title}>
              <span aria-hidden="true">{Ico.check}</span>
              <div>
                <p className="bis-card-title">{b.title}</p>
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
    <section className="section bis-process" aria-labelledby="bis-process-heading">
      <div className="container">
        <div className="section-heading bis-reveal">
          <p className="bis-eyebrow">{PROCESS.eyebrow}</p>
          <h2 id="bis-process-heading">{PROCESS.heading}</h2>
          <p>{PROCESS.intro}</p>
        </div>
        <div className="bis-zoom-in">
          <SupplyChainMap
            title="Systems Connected Through the Boomi AtomSphere Layer"
            nodes={[
              { label: "Boomi AtomSphere", short: "Boomi" },
              { label: "ERP", short: "ERP" },
              { label: "CRM", short: "CRM" },
              { label: "Cloud Apps", short: "SaaS" },
              { label: "Trading Partners", short: "EDI" },
            ]}
          />
        </div>
        <div className="bis-process__grid bis-reveal-stagger">
          {PROCESS.detail.map((p, i) => (
            <div className="bis-step-card" key={p.name}>
              <span className="bis-step-card__num">{String(i + 1).padStart(2, "0")}</span>
              <p className="bis-card-title">{p.name}</p>
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
    <section className="section bis-tech" aria-labelledby="bis-tech-heading">
      <div className="container">
        <div className="section-heading bis-reveal">
          <p className="bis-eyebrow">{TECHNOLOGIES.eyebrow}</p>
          <h2 id="bis-tech-heading">{TECHNOLOGIES.heading}</h2>
          <p>{TECHNOLOGIES.intro}</p>
        </div>
        <div className="bis-tech__grid bis-reveal-stagger">
          {TECHNOLOGIES.items.map((t) => (
            <div className="bis-tech-card" key={t.title}>
              <span className="bis-tech-card__icon">{t.icon}</span>
              <p className="bis-card-title">{t.title}</p>
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
    <section className="section bis-industries" aria-labelledby="bis-industries-heading">
      <div className="container">
        <div className="section-heading bis-reveal">
          <p className="bis-eyebrow">{INDUSTRIES.eyebrow}</p>
          <h2 id="bis-industries-heading">{INDUSTRIES.heading}</h2>
          <p>{INDUSTRIES.intro}</p>
        </div>
        <div className="bis-industries__grid bis-reveal-stagger">
          {INDUSTRIES.items.map((n) => (
            <div className="bis-industry-card" key={n.title}>
              <span className="bis-industry-card__icon">{n.icon}</span>
              <p className="bis-card-title">{n.title}</p>
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
    <section className="section bis-why" aria-labelledby="bis-why-heading">
      <div className="container">
        <div className="section-heading bis-reveal">
          <p className="bis-eyebrow">{WHY_MIRKETA.eyebrow}</p>
          <h2 id="bis-why-heading">{WHY_MIRKETA.heading}</h2>
          <p>{WHY_MIRKETA.intro}</p>
        </div>
        <div className="bis-why__grid bis-reveal-stagger">
          {WHY_MIRKETA.items.map((w) => (
            <div className="bis-why-card" key={w.title}>
              <span className="bis-why-card__icon">{w.icon}</span>
              <p className="bis-card-title">{w.title}</p>
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
    <section className="section bis-cases" aria-labelledby="bis-cases-heading">
      <div className="container">
        <div className="section-heading bis-reveal">
          <p className="bis-eyebrow">{CASE_STUDIES.eyebrow}</p>
          <h2 id="bis-cases-heading">{CASE_STUDIES.heading}</h2>
          <p>{CASE_STUDIES.intro}</p>
        </div>
        <div className="bis-cases__grid bis-reveal-stagger">
          {CASE_STUDIES.cases.map((c) => (
            <div className="bis-case-card" key={c.title}>
              <span className="bis-case-card__tag">{c.industry}</span>
              <p className="bis-card-title">{c.title}</p>
              <dl className="bis-case-card__fields">
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
    <section className="section bis-faq" aria-labelledby="bis-faq-heading">
      <div className="container">
        <div className="section-heading bis-reveal">
          <p className="bis-eyebrow">FAQ</p>
          <h2 id="bis-faq-heading">Frequently Asked Questions About Boomi Integration Services</h2>
        </div>
        <FaqAccordion items={FAQS} className="bis-reveal" searchPlaceholder="Ask a question — e.g. &quot;Atom&quot;, &quot;licensing&quot;, &quot;migration&quot;..." />
        <p className="bis-faq__links">
          Related reading: <Link to={INTEGRATION_PAGES.ENTERPRISE.slug}>{INTEGRATION_PAGES.ENTERPRISE.label}</Link>,{" "}
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
    <section className="bis-final-cta bis-reveal" aria-labelledby="bis-final-cta-heading">
      <div className="container bis-final-cta__inner">
        <h2 id="bis-final-cta-heading">{FINAL_CTA.heading}</h2>
        <p>{FINAL_CTA.description}</p>
        <div className="bis-final-cta__ctas">
          <a href={FINAL_CTA.primaryCta.href} className="btn btn-primary bis-btn">
            {FINAL_CTA.primaryCta.label} <span aria-hidden="true">→</span>
          </a>
          <a href={FINAL_CTA.secondaryCta.href} className="btn btn-secondary bis-btn">
            {FINAL_CTA.secondaryCta.label}
          </a>
        </div>
      </div>
    </section>
  );
}
