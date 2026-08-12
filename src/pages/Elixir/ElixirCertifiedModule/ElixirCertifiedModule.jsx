import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Images } from "../../../assets/images/index.js";
import { ELIXIR_PAGES, INDUSTRY_PAGES, AI_PAGES } from "../../../config/pageSlugs.js";
import Seo from "../../../components/Seo/Seo.jsx";
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb.jsx";
import StickyCta from "../../../components/StickyCta/StickyCta.jsx";
import TrustedByMarquee from "../../../components/TrustedByMarquee/TrustedByMarquee.jsx";
import FaqAccordion from "../../../components/FaqAccordion/FaqAccordion.jsx";
import HeroVisual from "../../../components/HeroVisual/HeroVisual.jsx";
import ConsultationSection from "../../../components/ConsultationSection/ConsultationSection.jsx";
import RelatedServices from "../../../components/RelatedServices/RelatedServices.jsx";
import WorkflowDiagram from "../../../components/illustrations/WorkflowDiagram/WorkflowDiagram.jsx";
import SupplyChainMap from "../../../components/illustrations/SupplyChainMap/SupplyChainMap.jsx";
import "./ElixirCertifiedModule.css";

gsap.registerPlugin(ScrollTrigger);

// ============================================================
// SLUG / SEO CONFIGURATION — kept local to this component per
// project convention, sourced from the central pageSlugs.js entry
// so the URL itself still only needs to change in one place.
// ============================================================

export const pageSEO = {
  slug: `${ELIXIR_PAGES.CERTIFIED_MODULE.slug}/`,
  title: "Elixir Certified Module for Healthcare EHR | Mirketa",
  description:
    "The Elixir Certified Module brings certified EHR capabilities to clinical documentation, data management, and care operations, configured by Mirketa.",
};

// ============================================================
// ICONS
// ============================================================

const Ico = {
  check: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12.5l5 5L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  award: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="8" r="5" stroke="currentColor" strokeWidth="1.4" /><path d="M8.5 12.5L7 21l5-2.5L17 21l-1.5-8.5" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  clipboard: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="6" y="4" width="12" height="17" rx="2" stroke="currentColor" strokeWidth="1.4" /><path d="M9 4V3a1 1 0 011-1h4a1 1 0 011 1v1M9 10h6M9 14h6M9 18h3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
  ),
  route: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="6" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.4" /><circle cx="18" cy="18" r="2.5" stroke="currentColor" strokeWidth="1.4" /><path d="M6 8.5V13a4 4 0 004 4h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
  ),
  db: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><ellipse cx="12" cy="6" rx="7" ry="3" stroke="currentColor" strokeWidth="1.4" /><path d="M5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6" stroke="currentColor" strokeWidth="1.4" /><path d="M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3" stroke="currentColor" strokeWidth="1.4" /></svg>
  ),
  chart: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 20V10M12 20V4M20 20v-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
  ),
  sliders: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h13M20 18h-1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><circle cx="16" cy="6" r="2" stroke="currentColor" strokeWidth="1.4" /><circle cx="8" cy="12" r="2" stroke="currentColor" strokeWidth="1.4" /><circle cx="16" cy="18" r="2" stroke="currentColor" strokeWidth="1.4" /></svg>
  ),
  compass: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" /><path d="M15 9l-2 6-6 2 2-6 6-2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  clock: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" /><path d="M12 7v5l3.5 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  users: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="9" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.4" /><path d="M3.5 19c.6-3.4 2.9-5.2 5.5-5.2s4.9 1.8 5.5 5.2" stroke="currentColor" strokeWidth="1.4" /><circle cx="17" cy="9" r="2.6" stroke="currentColor" strokeWidth="1.3" opacity="0.7" /><path d="M15.5 13.4c2.2.3 3.7 1.9 4 4.6" stroke="currentColor" strokeWidth="1.3" opacity="0.7" /></svg>
  ),
  layers: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3l9 5-9 5-9-5 9-5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M3 13l9 5 9-5" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  building: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="5" y="3" width="14" height="18" rx="1.4" stroke="currentColor" strokeWidth="1.4" /><path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
  ),
  cloud: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 18h10a4 4 0 000-8 5.5 5.5 0 00-10.7-1.7A4.5 4.5 0 007 18z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  heart: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 20s-7-4.5-9.3-9A5 5 0 0112 6a5 5 0 019.3 5c-2.3 4.5-9.3 9-9.3 9z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  move: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 9l-3 3 3 3M19 9l3 3-3 3M9 5l3-3 3 3M9 19l3 3 3-3M2 12h20M12 2v20" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
};

// ============================================================
// DATA
// ============================================================

const BREADCRUMB_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Elixir (EHR)", href: "/" },
  { label: ELIXIR_PAGES.CERTIFIED_MODULE.label },
];

const HERO = {
  badge: "Elixir EHR Platform Capability",
  title: "Elixir Certified Module for Certified EHR Capabilities Your Care Teams Can Rely On",
  description:
    "Mirketa configures and implements the Elixir Certified Module around your organization's actual clinical documentation, care planning, and data exchange needs — so the certified capabilities built into Elixir translate into workflows your care teams will actually use, not settings that sit unconfigured after go-live.",
  primaryCta: { label: "Get a Module Configuration Assessment", href: "#contact" },
  secondaryCta: { label: "Talk to an Elixir Implementation Advisor", href: "#contact" },
  metrics: ["Certified EHR Module Capabilities", "Structured Clinical Documentation", "Interoperable Data Exchange", "Configurable to Your Care Model"],
};

const HERO_DASHBOARD = {
  title: "Elixir Module Configuration Console",
  stats: [
    { label: "MODULE STATUS", value: "Configured", caption: "Aligned to care workflows" },
    { label: "DATA EXCHANGE", value: "Interoperable", caption: "Structured record sharing" },
    { label: "DOCUMENTATION", value: "Structured", caption: "Templated clinical notes" },
  ],
  rows: [
    { title: "Clinical note template applied", meta: "Structured documentation synced", tone: "good", status: "Complete" },
    { title: "Care plan updated", meta: "Shared across care team", tone: "good", status: "Complete" },
    { title: "Quality reporting extract", meta: "Scheduled export in progress", tone: "neutral", status: "In Progress" },
  ],
  floatingCards: [
    { icon: Ico.award, title: "Module Certified", subtitle: "Core EHR capabilities" },
    { icon: Ico.route, title: "Data Synced", subtitle: "Across connected modules" },
  ],
};

const CHALLENGES = {
  eyebrow: "Key Challenges",
  heading: "Why Certified EHR Capabilities Don't Always Translate Into Better Workflows",
  intro:
    "Having a certified module and actually using it well are two different things. Most of the friction we see comes down to configuration, not the underlying platform capability.",
  items: [
    { title: "Clinical Documentation That Doesn't Match Workflow", description: "Default note templates and structured fields that don't reflect how a specific care team actually documents an encounter slow everyone down." },
    { title: "Data Trapped in a Single Module", description: "Patient information entered in one part of the EHR doesn't reliably reach the care plan, reporting, or exchange functions that depend on it." },
    { title: "Manual Effort Around Quality Reporting", description: "Pulling data for quality programs often means manual extraction instead of relying on structured, governed data the module already captures." },
    { title: "Unconfigured Capabilities Going Unused", description: "Certified capabilities the module already supports often sit unconfigured, simply because no one scoped the work to turn them on properly." },
  ],
};

const SOLUTION = {
  eyebrow: "Solution & Capabilities",
  heading: "Configuration That Turns Certified Capabilities Into Everyday Workflows",
  paragraphs: [
    "The Elixir Certified Module provides the core certified EHR capabilities — structured clinical documentation, care plan management, and interoperable data exchange — that most healthcare organizations need as a foundation.",
    "Mirketa's role is configuring that foundation around how your organization actually delivers care: which documentation templates your providers need, how care plans should flow between departments, and which data needs to move where for reporting and exchange.",
    "That configuration work is what determines whether a certified capability actually gets used day to day, or sits available but ignored because it was never set up around a real clinical workflow.",
  ],
};

const SERVICES = {
  eyebrow: "Key Features",
  heading: "What the Elixir Certified Module Provides",
  intro: "These are the core capability areas Mirketa configures as part of every Elixir Certified Module implementation.",
  items: [
    { icon: Ico.clipboard, title: "Structured Clinical Documentation", description: "Templated clinical notes and structured data capture designed around your care team's actual documentation patterns." },
    { icon: Ico.heart, title: "Care Plan Management", description: "Care plans that stay current across the care team instead of living in a single provider's notes." },
    { icon: Ico.route, title: "Interoperable Data Exchange", description: "Structured data exchange with other certified systems, so patient information moves with the patient." },
    { icon: Ico.chart, title: "Quality & Operational Reporting", description: "Reporting built on the same structured data your care teams already capture, not a separate manual export process." },
    { icon: Ico.sliders, title: "Module Configuration & Customization", description: "Templates, fields, and workflows configured to match your organization's care model instead of a generic default." },
    { icon: Ico.db, title: "Structured Data Management", description: "Patient data governed and structured consistently across every module that depends on it." },
  ],
};

const TECHNICAL = {
  eyebrow: "Technical & Integration Information",
  heading: "How the Certified Module Fits Your Broader EHR Environment",
  intro: "Designed to work alongside the other modules and systems your organization already runs on the Elixir platform.",
  items: [
    { title: "Structured, Interoperable Data Exchange", description: "Patient data structured for exchange with other certified health IT systems rather than trapped in a proprietary format." },
    { title: "Cross-Module Data Consistency", description: "Documentation, care plan, and reporting data kept consistent across every connected Elixir module." },
    { title: "Configurable Templates & Fields", description: "Clinical documentation templates and structured fields configured per department or care setting, not fixed platform-wide." },
    { title: "Data Migration Support", description: "Structured migration guidance for organizations bringing historical clinical data into the certified module." },
  ],
};

const AI_AUTOMATION = {
  eyebrow: "Workflow Automation",
  heading: "Where Configuration Reduces Manual Clinical Administration",
  intro: "Once documentation and data flows are configured correctly, several routine tasks can be automated around them.",
  items: [
    { title: "Automated Task Routing", description: "Care plan updates and follow-up tasks routed to the right team member automatically instead of tracked manually." },
    { title: "Structured Note Templates", description: "Encounter-specific templates that reduce free-text entry for information that should be structured and reportable." },
    { title: "Rules-Based Clinical Alerts", description: "Configurable alerts triggered by structured data conditions, rather than relying on a provider remembering to check." },
    { title: "Automated Data Validation", description: "Required structured fields validated at the point of entry, reducing incomplete records downstream." },
  ],
};

const BENEFITS = {
  eyebrow: "Benefits",
  heading: "What Changes Once the Certified Module Is Properly Configured",
  intro: "These are the practical outcomes healthcare organizations look for once documentation, care plans, and data exchange are configured around real workflows.",
  items: [
    { title: "Documentation That Matches How Care Is Delivered", description: "Structured templates built around your actual encounters instead of a generic default configuration." },
    { title: "Data That Moves With the Patient", description: "Interoperable exchange means patient information reaches the systems and teams that need it." },
    { title: "Less Manual Effort on Reporting", description: "Quality and operational reporting drawn from structured data your teams already capture during care." },
    { title: "Certified Capabilities That Actually Get Used", description: "Configuration work turns available module capabilities into workflows your teams rely on daily." },
  ],
};

const USE_CASES = {
  eyebrow: "Use Cases",
  heading: "Where the Certified Module Is Configured in Practice",
  intro: "Every care setting configures the module a little differently based on how it actually delivers and documents care.",
  items: [
    { icon: Ico.clipboard, title: "Clinical Documentation Templates" },
    { icon: Ico.heart, title: "Care Plan Tracking" },
    { icon: Ico.route, title: "Interoperable Data Exchange" },
    { icon: Ico.chart, title: "Quality Program Reporting" },
    { icon: Ico.building, title: "Multi-Facility Configuration" },
    { icon: Ico.move, title: "Legacy System Data Migration" },
  ],
};

const SCENARIOS = {
  eyebrow: "Implementation Scenarios",
  heading: "How Organizations Typically Configure the Certified Module",
  intro: "Illustrative scenarios based on common configuration patterns — not a specific client engagement.",
  cases: [
    {
      title: "A Multi-Facility Group Standardizes Documentation Templates",
      tag: "Ambulatory Care",
      challenge: "Each facility had built its own documentation shortcuts over time, making structured reporting across the group inconsistent.",
      approach: "Mirketa configured a shared set of structured documentation templates while leaving room for facility-specific fields where genuinely needed.",
      result: "Documentation became consistent enough for group-wide reporting, without forcing every facility into an identical workflow.",
    },
    {
      title: "A Care Team Connects Care Plans Across Departments",
      tag: "Care Coordination",
      challenge: "Care plans were being updated in one department without visibility for the other teams involved in a patient's care.",
      approach: "Mirketa configured care plan data to flow across the relevant modules so every involved team sees the current plan.",
      result: "Care teams now work from one current care plan instead of reconciling separate departmental notes.",
    },
  ],
};

const WHY_MIRKETA = {
  eyebrow: "Why Mirketa",
  heading: "Configuration Expertise That Understands Both the Module and the Clinic",
  intro: "Plenty of partners can turn on a module's default settings. Fewer take the time to configure it around how your organization actually delivers care.",
  items: [
    { icon: Ico.award, title: "Elixir Platform Depth", description: "Configuration experience specific to the Elixir Certified Module's documentation, care plan, and exchange capabilities." },
    { icon: Ico.compass, title: "Clinical Workflow Awareness", description: "We configure around how care teams actually document and coordinate care, not a generic default template set." },
    { icon: Ico.clock, title: "Structured, Scoped Delivery", description: "A defined configuration timeline that respects the change-management process your organization already requires." },
    { icon: Ico.shield, title: "Data Governance First", description: "Structured data consistency treated as a first-class requirement, not an afterthought once reporting breaks." },
    { icon: Ico.users, title: "Dedicated Delivery Team", description: "The consultants who scope your engagement support it through go-live and beyond." },
    { icon: Ico.compass, title: "Support Beyond Go-Live", description: "Ongoing configuration support available as your care model or reporting needs evolve." },
  ],
};

const TECHNOLOGIES = {
  eyebrow: "Technology Stack",
  heading: "The Platform Capabilities This Work Builds On",
  intro: "Selected based on your organization's existing systems and care model, not a default recommendation.",
  items: [
    { icon: Ico.award, title: "Elixir Certified Module" },
    { icon: Ico.route, title: "Interoperable Data Exchange" },
    { icon: Ico.clipboard, title: "Structured Clinical Documentation" },
    { icon: Ico.chart, title: "Reporting & Analytics Tools" },
    { icon: Ico.layers, title: "Cross-Module Data Consistency" },
    { icon: Ico.cloud, title: "Elixir EHR Platform" },
  ],
};

const PROCESS = {
  eyebrow: "Implementation Process",
  heading: "A Five-Stage Path From Module Assessment to Optimized Operations",
  intro: "A structured methodology for configuring the certified module without disrupting clinical operations mid-rollout.",
  steps: [
    { label: "Module Assessment" },
    { label: "Configuration Design" },
    { label: "Data Migration & Integration" },
    { label: "Validation" },
    { label: "Launch & Optimize" },
  ],
  detail: [
    { name: "Module Assessment", description: "Current documentation, care plan, and reporting workflows mapped against the module's available capabilities." },
    { name: "Configuration Design", description: "Templates, fields, and data flows designed around your care model and reporting requirements." },
    { name: "Data Migration & Integration", description: "Historical clinical data migrated and connected modules configured for consistent data flow." },
    { name: "Validation", description: "Structured testing with clinical and administrative stakeholders before anything goes live." },
    { name: "Launch & Optimize", description: "Supported go-live followed by continuous refinement as care delivery needs evolve." },
  ],
};

const FAQS = [
  { q: "What is the Elixir Certified Module?", a: "It's the core certified EHR capability set within the Elixir platform, covering structured clinical documentation, care plan management, and interoperable data exchange." },
  { q: "What does Mirketa configure as part of this?", a: "Mirketa configures documentation templates, care plan workflows, and data exchange settings around your organization's actual care delivery model, rather than leaving default settings in place." },
  { q: "Can documentation templates be customized per department?", a: "Yes. Structured documentation templates can be configured per department or care setting where that genuinely reflects how care is delivered." },
  { q: "How does this help with quality reporting?", a: "Because documentation and care plan data are captured in a structured format, quality and operational reporting can draw from that data instead of requiring a separate manual extraction process." },
  { q: "Can historical clinical data be migrated into the module?", a: "Yes. Mirketa provides structured data migration support for organizations bringing historical clinical records into the certified module." },
  { q: "Does this integrate with other Elixir modules?", a: "Yes. The certified module is designed to keep documentation, care plan, and reporting data consistent across other connected Elixir modules." },
  { q: "How long does configuration typically take?", a: "Timelines depend on the number of departments, documentation templates, and integrations involved, and are scoped during the module assessment stage." },
  { q: "Do you provide support after go-live?", a: "Yes. Ongoing configuration support is available as your care model, departments, or reporting requirements evolve." },
];

const RELATED_SERVICES = {
  eyebrow: "Related Reading",
  heading: "Explore More of the Elixir (EHR) Platform",
  intro: "The certified module is the foundation the rest of the Elixir platform builds on. Here's where to look next.",
  items: [
    { slug: ELIXIR_PAGES.ONC_MFA_USE_CASES.slug, label: ELIXIR_PAGES.ONC_MFA_USE_CASES.label, description: "See how access to certified module data is secured with multi-factor authentication." },
    { slug: ELIXIR_PAGES.API_DEVELOPER_PORTAL.slug, label: ELIXIR_PAGES.API_DEVELOPER_PORTAL.label, description: "See how third-party applications integrate with the data this module manages." },
    { slug: INDUSTRY_PAGES.HEALTHCARE.slug, label: INDUSTRY_PAGES.HEALTHCARE.label, description: "Explore Mirketa's broader healthcare technology and EHR integration work." },
    { slug: AI_PAGES.AI_DATA_FOUNDATIONS.slug, label: AI_PAGES.AI_DATA_FOUNDATIONS.label, description: "Build the governed data foundation that keeps structured clinical data reliable." },
    { slug: "/kratu-ai", label: "Kratu AI (ElixirAI)", description: "See the AI-assisted clinical and revenue workflows built on top of the Elixir platform." },
  ],
};

const FINAL_CTA = {
  heading: "Configure the Elixir Certified Module Around Your Care Model",
  description: "Partner with Mirketa to configure structured documentation, care plans, and data exchange inside Elixir — or talk to an implementation advisor first.",
  primaryCta: { label: "Get a Module Configuration Assessment", href: "#contact" },
  secondaryCta: { label: "Talk to an Elixir Implementation Advisor", href: "#contact" },
};

const CONSULTATION = {
  eyebrow: "Get Started",
  heading: "Get an Elixir Certified Module Configuration Assessment",
  description: "Tell us about your care model, departments, and reporting needs — an Elixir implementation advisor will follow up within one business day.",
  formTitle: "Request a Module Configuration Assessment",
};

const SEO = {
  title: pageSEO.title,
  description: pageSEO.description,
  canonical: `https://mirketa.us${pageSEO.slug}`,
  keywords: [
    "Elixir Certified Module",
    "Elixir EHR",
    "healthcare EHR",
    "EHR integration",
    "healthcare software",
    "EHR capabilities",
  ],
  schema: [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "Elixir EHR Module Configuration",
      provider: { "@type": "Organization", name: "Mirketa Inc.", url: "https://mirketa.us" },
      name: "Elixir Certified Module Implementation",
      description: "Configuration of the Elixir Certified Module's documentation, care plan, and data exchange capabilities around clinical workflows.",
      areaServed: "Global",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://mirketa.us/" },
        { "@type": "ListItem", position: 2, name: ELIXIR_PAGES.CERTIFIED_MODULE.label, item: `https://mirketa.us${pageSEO.slug}` },
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

export default function ElixirCertifiedModule() {
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

      gsap.utils.toArray(".ecmod-reveal").forEach((el) => {
        gsap.from(el, { opacity: prefersReduced ? 1 : 0, y: prefersReduced ? 0 : 32, duration: 0.7, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 88%" } });
      });
      gsap.utils.toArray(".ecmod-reveal-left").forEach((el) => {
        gsap.from(el, { opacity: prefersReduced ? 1 : 0, x: prefersReduced ? 0 : -30, duration: 0.7, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 88%" } });
      });
      gsap.utils.toArray(".ecmod-reveal-right").forEach((el) => {
        gsap.from(el, { opacity: prefersReduced ? 1 : 0, x: prefersReduced ? 0 : 30, duration: 0.7, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 88%" } });
      });
      gsap.utils.toArray(".ecmod-reveal-stagger").forEach((el) => {
        gsap.from(el.children, { opacity: prefersReduced ? 1 : 0, y: prefersReduced ? 0 : 26, duration: 0.6, stagger: 0.06, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 85%" } });
      });
      gsap.utils.toArray(".ecmod-zoom-in").forEach((el) => {
        gsap.from(el, { opacity: prefersReduced ? 1 : 0, scale: prefersReduced ? 1 : 0.94, duration: 0.6, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 88%" } });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="elixir-certified-module">
      <Seo {...SEO} />
      <HeroSection heroTextRef={heroTextRef} heroRef={heroRef} />
      <TrustedByMarquee label="Trusted by Healthcare Organizations Running Elixir" />
      <ChallengesSection />
      <SolutionSection />
      <ServicesSection />
      <TechnicalSection />
      <AiAutomationSection />
      <BenefitsSection />
      <UseCasesSection />
      <ScenariosSection />
      <WhyMirketaSection />
      <TechnologiesSection />
      <ProcessSection />
      <FaqSection />
      <RelatedServices {...RELATED_SERVICES} className="ecmod-related ecmod-reveal" />
      <FinalCtaSection />
      <ConsultationSection {...CONSULTATION} />
      <StickyCta heroRef={heroRef} label="Get a Module Configuration Assessment" />
    </div>
  );
}

// ============================================================
// HERO
// ============================================================

function HeroSection({ heroTextRef, heroRef }) {
  return (
    <section ref={heroRef} className="ecmod-hero" style={{ backgroundImage: `url("${Images.heroElixirCertifiedModule}")` }} aria-label="Elixir Certified Module by Mirketa">
      <div className="ecmod-hero__scrim" />
      <div className="container">
        <Breadcrumb items={BREADCRUMB_ITEMS} className="ecmod-breadcrumb" />
        <div className="ecmod-hero__inner">
          <div ref={heroTextRef} className="ecmod-hero__text">
            <span className="ecmod-badge">
              <span className="ecmod-badge__spark" aria-hidden="true">✦</span> {HERO.badge}
            </span>
            <h1>{HERO.title}</h1>
            <p className="ecmod-hero__description">{HERO.description}</p>
            <div className="ecmod-hero__ctas">
              <a href={HERO.primaryCta.href} className="btn btn-primary ecmod-btn">
                {HERO.primaryCta.label} <span aria-hidden="true">→</span>
              </a>
              <a href={HERO.secondaryCta.href} className="btn btn-secondary ecmod-btn">
                {HERO.secondaryCta.label}
              </a>
            </div>
            <ul className="ecmod-hero__metrics">
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
            className="ecmod-hero__visual ecmod-zoom-in"
          />
        </div>
      </div>
    </section>
  );
}

// ============================================================
// KEY CHALLENGES
// ============================================================

function ChallengesSection() {
  return (
    <section className="section ecmod-challenges" aria-labelledby="ecmod-challenges-heading">
      <div className="container">
        <div className="section-heading ecmod-reveal">
          <p className="ecmod-eyebrow">{CHALLENGES.eyebrow}</p>
          <h2 id="ecmod-challenges-heading">{CHALLENGES.heading}</h2>
          <p>{CHALLENGES.intro}</p>
        </div>
        <div className="ecmod-challenges__grid ecmod-reveal-stagger">
          {CHALLENGES.items.map((c) => (
            <div className="ecmod-challenge-card" key={c.title}>
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
// SOLUTION & CAPABILITIES
// ============================================================

function SolutionSection() {
  return (
    <section className="section ecmod-solution" aria-labelledby="ecmod-solution-heading">
      <div className="container ecmod-solution__grid">
        <div className="ecmod-reveal-left">
          <p className="ecmod-eyebrow">{SOLUTION.eyebrow}</p>
          <h2 id="ecmod-solution-heading">{SOLUTION.heading}</h2>
          {SOLUTION.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <div className="ecmod-reveal-right">
          <WorkflowDiagram
            title="Structured Documentation Flow"
            steps={[{ label: "Encounter Started" }, { label: "Structured Note" }, { label: "Care Plan Updated" }, { label: "Data Synced" }, { label: "Reportable" }]}
          />
        </div>
      </div>
    </section>
  );
}

// ============================================================
// KEY FEATURES
// ============================================================

function ServicesSection() {
  return (
    <section className="section ecmod-services" aria-labelledby="ecmod-services-heading">
      <div className="container">
        <div className="ecmod-services__head ecmod-reveal">
          <img src={Images.illoElixirCertifiedModuleBadge} alt="" aria-hidden="true" className="ecmod-services__illo" loading="lazy" />
          <div className="section-heading">
            <p className="ecmod-eyebrow">{SERVICES.eyebrow}</p>
            <h2 id="ecmod-services-heading">{SERVICES.heading}</h2>
            <p>{SERVICES.intro}</p>
          </div>
        </div>
        <div className="ecmod-services__grid ecmod-reveal-stagger">
          {SERVICES.items.map((c) => (
            <div className="ecmod-service-card" key={c.title}>
              <span className="ecmod-service-card__icon">{c.icon}</span>
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
// TECHNICAL & INTEGRATION INFORMATION
// ============================================================

function TechnicalSection() {
  return (
    <section className="section ecmod-technical" aria-labelledby="ecmod-technical-heading">
      <div className="container">
        <div className="section-heading ecmod-reveal">
          <p className="ecmod-eyebrow">{TECHNICAL.eyebrow}</p>
          <h2 id="ecmod-technical-heading">{TECHNICAL.heading}</h2>
          <p>{TECHNICAL.intro}</p>
        </div>
        <div className="ecmod-technical__grid ecmod-reveal-stagger">
          {TECHNICAL.items.map((c) => (
            <div className="ecmod-technical-item" key={c.title}>
              <p className="ecmod-card-title">{c.title}</p>
              <p>{c.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// WORKFLOW AUTOMATION
// ============================================================

function AiAutomationSection() {
  return (
    <section className="section ecmod-ai" aria-labelledby="ecmod-ai-heading">
      <div className="container">
        <div className="section-heading ecmod-reveal">
          <p className="ecmod-eyebrow">{AI_AUTOMATION.eyebrow}</p>
          <h2 id="ecmod-ai-heading">{AI_AUTOMATION.heading}</h2>
          <p>{AI_AUTOMATION.intro}</p>
        </div>
        <div className="ecmod-ai__grid ecmod-reveal-stagger">
          {AI_AUTOMATION.items.map((f) => (
            <div className="ecmod-ai-item" key={f.title}>
              <p className="ecmod-card-title">{f.title}</p>
              <p>{f.description}</p>
            </div>
          ))}
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
    <section className="section ecmod-benefits" aria-labelledby="ecmod-benefits-heading">
      <div className="container">
        <div className="section-heading ecmod-reveal">
          <p className="ecmod-eyebrow">{BENEFITS.eyebrow}</p>
          <h2 id="ecmod-benefits-heading">{BENEFITS.heading}</h2>
          <p>{BENEFITS.intro}</p>
        </div>
        <div className="ecmod-benefits__grid ecmod-reveal-stagger">
          {BENEFITS.items.map((b) => (
            <div className="ecmod-benefit-item" key={b.title}>
              <span aria-hidden="true">{Ico.check}</span>
              <div>
                <p className="ecmod-card-title">{b.title}</p>
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
// USE CASES
// ============================================================

function UseCasesSection() {
  return (
    <section className="section ecmod-usecases" aria-labelledby="ecmod-usecases-heading">
      <div className="container">
        <div className="section-heading ecmod-reveal">
          <p className="ecmod-eyebrow">{USE_CASES.eyebrow}</p>
          <h2 id="ecmod-usecases-heading">{USE_CASES.heading}</h2>
          <p>{USE_CASES.intro}</p>
        </div>
        <div className="ecmod-usecases__grid ecmod-reveal-stagger">
          {USE_CASES.items.map((n) => (
            <div className="ecmod-usecase-card" key={n.title}>
              <span className="ecmod-usecase-card__icon">{n.icon}</span>
              <p className="ecmod-card-title">{n.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// IMPLEMENTATION SCENARIOS
// ============================================================

function ScenariosSection() {
  return (
    <section className="section ecmod-scenarios" aria-labelledby="ecmod-scenarios-heading">
      <div className="container">
        <div className="section-heading ecmod-reveal">
          <p className="ecmod-eyebrow">{SCENARIOS.eyebrow}</p>
          <h2 id="ecmod-scenarios-heading">{SCENARIOS.heading}</h2>
          <p>{SCENARIOS.intro}</p>
        </div>
        <div className="ecmod-scenarios__grid ecmod-reveal-stagger">
          {SCENARIOS.cases.map((c) => (
            <div className="ecmod-scenario-card" key={c.title}>
              <span className="ecmod-scenario-card__tag">{c.tag}</span>
              <p className="ecmod-card-title">{c.title}</p>
              <dl className="ecmod-scenario-card__fields">
                <div><dt>Challenge</dt><dd>{c.challenge}</dd></div>
                <div><dt>Approach</dt><dd>{c.approach}</dd></div>
                <div><dt>Result</dt><dd>{c.result}</dd></div>
              </dl>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// WHY MIRKETA
// ============================================================

function WhyMirketaSection() {
  return (
    <section className="section ecmod-why" aria-labelledby="ecmod-why-heading">
      <div className="container">
        <div className="section-heading ecmod-reveal">
          <p className="ecmod-eyebrow">{WHY_MIRKETA.eyebrow}</p>
          <h2 id="ecmod-why-heading">{WHY_MIRKETA.heading}</h2>
          <p>{WHY_MIRKETA.intro}</p>
        </div>
        <div className="ecmod-why__grid ecmod-reveal-stagger">
          {WHY_MIRKETA.items.map((w, i) => (
            <div className="ecmod-why-card" key={`${w.title}-${i}`}>
              <span className="ecmod-why-card__icon">{w.icon}</span>
              <p className="ecmod-card-title">{w.title}</p>
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
    <section className="section ecmod-tech" aria-labelledby="ecmod-tech-heading">
      <div className="container">
        <div className="section-heading ecmod-reveal">
          <p className="ecmod-eyebrow">{TECHNOLOGIES.eyebrow}</p>
          <h2 id="ecmod-tech-heading">{TECHNOLOGIES.heading}</h2>
          <p>{TECHNOLOGIES.intro}</p>
        </div>
        <div className="ecmod-tech__grid ecmod-reveal-stagger">
          {TECHNOLOGIES.items.map((t) => (
            <div className="ecmod-tech-card" key={t.title}>
              <span className="ecmod-tech-card__icon">{t.icon}</span>
              <p className="ecmod-card-title">{t.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// IMPLEMENTATION PROCESS
// ============================================================

function ProcessSection() {
  return (
    <section className="section ecmod-process" aria-labelledby="ecmod-process-heading">
      <div className="container">
        <div className="section-heading ecmod-reveal">
          <p className="ecmod-eyebrow">{PROCESS.eyebrow}</p>
          <h2 id="ecmod-process-heading">{PROCESS.heading}</h2>
          <p>{PROCESS.intro}</p>
        </div>
        <div className="ecmod-zoom-in">
          <SupplyChainMap
            title="Certified Module Data Flow"
            nodes={[
              { label: "Clinical Documentation", short: "DOC" },
              { label: "Care Plan", short: "PLAN" },
              { label: "Elixir Platform", short: "EHR" },
              { label: "Reporting & Analytics", short: "RPT" },
              { label: "Connected Systems", short: "SYS" },
            ]}
          />
        </div>
        <div className="ecmod-process__grid ecmod-reveal-stagger">
          {PROCESS.detail.map((p, i) => (
            <div className="ecmod-step-card" key={p.name}>
              <span className="ecmod-step-card__num">{String(i + 1).padStart(2, "0")}</span>
              <p className="ecmod-card-title">{p.name}</p>
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
    <section className="section ecmod-faq" aria-labelledby="ecmod-faq-heading">
      <div className="container">
        <div className="section-heading ecmod-reveal">
          <p className="ecmod-eyebrow">FAQ</p>
          <h2 id="ecmod-faq-heading">Frequently Asked Questions About the Elixir Certified Module</h2>
        </div>
        <FaqAccordion items={FAQS} className="ecmod-reveal" searchPlaceholder="Ask a question — e.g. &quot;documentation&quot;, &quot;care plan&quot;, &quot;migration&quot;..." />
        <p className="ecmod-faq__links">
          Related reading: <Link to={ELIXIR_PAGES.ONC_MFA_USE_CASES.slug}>{ELIXIR_PAGES.ONC_MFA_USE_CASES.label}</Link>,{" "}
          <Link to={ELIXIR_PAGES.API_DEVELOPER_PORTAL.slug}>{ELIXIR_PAGES.API_DEVELOPER_PORTAL.label}</Link>,{" "}
          <Link to={INDUSTRY_PAGES.HEALTHCARE.slug}>{INDUSTRY_PAGES.HEALTHCARE.label}</Link>,{" "}
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
    <section className="ecmod-final-cta ecmod-reveal" aria-labelledby="ecmod-final-cta-heading">
      <div className="container ecmod-final-cta__inner">
        <h2 id="ecmod-final-cta-heading">{FINAL_CTA.heading}</h2>
        <p>{FINAL_CTA.description}</p>
        <div className="ecmod-final-cta__ctas">
          <a href={FINAL_CTA.primaryCta.href} className="btn btn-primary ecmod-btn">
            {FINAL_CTA.primaryCta.label} <span aria-hidden="true">→</span>
          </a>
          <a href={FINAL_CTA.secondaryCta.href} className="btn btn-secondary ecmod-btn">
            {FINAL_CTA.secondaryCta.label}
          </a>
        </div>
      </div>
    </section>
  );
}
