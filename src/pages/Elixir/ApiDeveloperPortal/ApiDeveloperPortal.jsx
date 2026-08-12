import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Images } from "../../../assets/images/index.js";
import { ELIXIR_PAGES, INDUSTRY_PAGES, INTEGRATION_PAGES, AI_PAGES } from "../../../config/pageSlugs.js";
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
import "./ApiDeveloperPortal.css";

gsap.registerPlugin(ScrollTrigger);

// ============================================================
// SLUG / SEO CONFIGURATION — kept local to this component per
// project convention, sourced from the central pageSlugs.js entry
// so the URL itself still only needs to change in one place.
// ============================================================

export const pageSEO = {
  slug: `${ELIXIR_PAGES.API_DEVELOPER_PORTAL.slug}/`,
  title: "API Developer Portal for Elixir EHR | Mirketa",
  description:
    "Explore the Elixir API Developer Portal — documentation, sandbox testing, and secure authentication for integrating healthcare applications with Elixir EHR.",
};

// ============================================================
// ICONS
// ============================================================

const Ico = {
  check: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12.5l5 5L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  code: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M8 6L2.5 12 8 18M16 6l5.5 6-5.5 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  book: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 5.5C4 4.7 4.7 4 5.5 4H12v16H5.5A1.5 1.5 0 014 18.5v-13z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M20 5.5c0-.8-.7-1.5-1.5-1.5H12v16h6.5a1.5 1.5 0 001.5-1.5v-13z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  key: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="8" cy="15" r="4" stroke="currentColor" strokeWidth="1.4" /><path d="M11.5 12L20 3.5M20 3.5V8M20 3.5h-4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  flask: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 3h6M10 3v6l-5 9a2 2 0 001.7 3h10.6a2 2 0 001.7-3l-5-9V3" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  webhook: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="6" cy="7" r="2.5" stroke="currentColor" strokeWidth="1.4" /><circle cx="18" cy="7" r="2.5" stroke="currentColor" strokeWidth="1.4" /><circle cx="12" cy="19" r="2.5" stroke="currentColor" strokeWidth="1.4" /><path d="M8.2 8.5L11 17M15.8 8.5L13 17M8.5 7h7" stroke="currentColor" strokeWidth="1.3" /></svg>
  ),
  layers: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3l9 5-9 5-9-5 9-5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M3 13l9 5 9-5" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  bolt: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M13 3L5 14h6l-1 7 8-11h-6l1-7z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
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
  compass: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" /><path d="M15 9l-2 6-6 2 2-6 6-2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  db: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><ellipse cx="12" cy="6" rx="7" ry="3" stroke="currentColor" strokeWidth="1.4" /><path d="M5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6" stroke="currentColor" strokeWidth="1.4" /><path d="M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3" stroke="currentColor" strokeWidth="1.4" /></svg>
  ),
  chart: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 20V10M12 20V4M20 20v-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
  ),
  cart: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 4h2l2.2 11h10.6L20 7H6.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /><circle cx="9" cy="20" r="1.3" fill="currentColor" /><circle cx="17" cy="20" r="1.3" fill="currentColor" /></svg>
  ),
  heart: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 20s-7-4.5-9.3-9A5 5 0 0112 6a5 5 0 019.3 5c-2.3 4.5-9.3 9-9.3 9z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
};

// ============================================================
// DATA
// ============================================================

const BREADCRUMB_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Elixir (EHR)", href: "/" },
  { label: ELIXIR_PAGES.API_DEVELOPER_PORTAL.label },
];

const HERO = {
  badge: "Elixir EHR Integration Capability",
  title: "API Developer Portal for Secure Elixir EHR Integrations",
  description:
    "Mirketa helps development teams get productive on the Elixir API Developer Portal quickly — from first API key to a tested integration — so patient engagement apps, practice management systems, and analytics tools can connect to Elixir without weeks of trial and error against undocumented endpoints.",
  primaryCta: { label: "Talk to an Integration Advisor", href: "#contact" },
  secondaryCta: { label: "Request Portal Access Support", href: "#contact" },
  metrics: ["Interactive API Reference & Sandbox", "OAuth 2.0 Secured Endpoints", "Webhook Event Subscriptions", "Guided Developer Onboarding"],
};

const HERO_DASHBOARD = {
  title: "API Developer Console",
  stats: [
    { label: "API STATUS", value: "Operational", caption: "All endpoints healthy" },
    { label: "AUTH MODEL", value: "OAuth 2.0", caption: "Token-based access" },
    { label: "SANDBOX", value: "Available", caption: "Test before you integrate" },
  ],
  rows: [
    { title: "GET /patients/{id}", meta: "200 OK · 142ms", tone: "good", status: "Complete" },
    { title: "Webhook subscription created", meta: "appointment.scheduled event", tone: "good", status: "Complete" },
    { title: "New sandbox API key requested", meta: "Awaiting approval", tone: "neutral", status: "In Progress" },
  ],
  floatingCards: [
    { icon: Ico.key, title: "API Key Issued", subtitle: "Ready for sandbox testing" },
    { icon: Ico.webhook, title: "Webhook Delivered", subtitle: "Real-time event received" },
  ],
};

const CHALLENGES = {
  eyebrow: "Key Challenges",
  heading: "Why Healthcare API Integrations Take Longer Than They Should",
  intro:
    "Most delays in healthcare API integration work don't come from the API itself — they come from unclear documentation, unclear authentication flows, and no safe place to test before touching real patient data.",
  items: [
    { title: "Documentation That Doesn't Match Reality", description: "Reference docs that fall out of sync with the actual API force developers to reverse-engineer endpoints through trial and error." },
    { title: "No Safe Sandbox Environment", description: "Testing against production data — or not testing at all — is a common and avoidable risk in healthcare integration projects." },
    { title: "Unclear Authentication Requirements", description: "OAuth flows, token scopes, and key rotation policies that aren't clearly documented slow down every new integration." },
    { title: "No Visibility Into API Usage", description: "Without usage dashboards or clear rate limits, integration teams find out about a problem only after it breaks in production." },
  ],
};

const SOLUTION = {
  eyebrow: "Solution & Capabilities",
  heading: "One Developer Portal for Documentation, Testing, and Access Management",
  paragraphs: [
    "The Elixir API Developer Portal gives integration teams a single place to discover endpoints, read live-matched documentation, generate API keys, and test requests against a sandbox before touching production data.",
    "Mirketa supports healthcare organizations and their integration partners in getting the most out of that portal — helping teams navigate authentication setup, webhook configuration, and endpoint selection for the specific integration they're building, whether that's a patient engagement app, a practice management system, or an analytics platform.",
    "Because every endpoint in the sandbox mirrors the structure of its production counterpart, teams can validate an integration end to end — including error handling and webhook delivery — before it ever touches a real patient record.",
  ],
};

const SERVICES = {
  eyebrow: "Key Features",
  heading: "What's Inside the Elixir API Developer Portal",
  intro: "The portal is built around the parts of an integration project that usually cause the most friction.",
  items: [
    { icon: Ico.book, title: "Interactive API Reference", description: "Live, try-it-now documentation for every endpoint, kept in sync with the actual API behavior." },
    { icon: Ico.flask, title: "Sandbox Testing Environment", description: "A full sandbox that mirrors production structure, so integrations can be validated before go-live." },
    { icon: Ico.key, title: "API Key & Credential Management", description: "Self-service key generation, rotation, and scoping without opening a support ticket for every change." },
    { icon: Ico.webhook, title: "Webhook Event Subscriptions", description: "Subscribe to real-time events — appointment changes, record updates — instead of polling the API on a schedule." },
    { icon: Ico.layers, title: "Versioned API Releases", description: "API versioning that gives integration teams a predictable upgrade path instead of breaking changes with no notice." },
    { icon: Ico.code, title: "Code Samples & Client Libraries", description: "Reference implementations and sample requests to shorten the time from portal access to a working call." },
  ],
};

const TECHNICAL = {
  eyebrow: "Technical & Integration Information",
  heading: "How the API Developer Portal Fits Your Integration Architecture",
  intro: "Built around standards most integration teams already work with, rather than a proprietary protocol to learn from scratch.",
  items: [
    { title: "RESTful, FHIR-Aligned Endpoints", description: "API responses structured around FHIR-aligned resource models familiar to most healthcare integration teams." },
    { title: "OAuth 2.0 / OpenID Connect Authentication", description: "Standard OAuth 2.0 authorization flows with scoped access tokens, rather than a static shared credential." },
    { title: "Rate Limits & Usage Quotas", description: "Documented rate limits per API key, with usage visibility so integration teams can plan around them instead of guessing." },
    { title: "Webhook Delivery & Retry Policy", description: "Documented webhook payload structure, delivery retries, and signature verification for securely consuming events." },
  ],
};

const AI_AUTOMATION = {
  eyebrow: "Developer Productivity",
  heading: "Where the Portal Reduces Manual Integration Work",
  intro: "Beyond documentation, the developer portal includes tooling aimed at cutting the time between portal access and a working integration.",
  items: [
    { title: "Auto-Generated Code Snippets", description: "Sample requests generated directly from the endpoint you're viewing, in common languages your team already uses." },
    { title: "Schema Validation on Request", description: "Malformed requests are flagged with a specific validation error instead of a generic failure response." },
    { title: "Usage Anomaly Visibility", description: "Unusual spikes or drops in API call volume are surfaced so integration issues are caught early, not after a support escalation." },
    { title: "Guided Onboarding Checklist", description: "A structured checklist walks new developers from portal signup to their first successful sandbox call." },
  ],
};

const BENEFITS = {
  eyebrow: "Benefits",
  heading: "What Changes Once Your Team Has Proper Portal Access",
  intro: "These are the practical outcomes integration teams look for when documentation, sandbox, and access management are handled properly from the start.",
  items: [
    { title: "Faster Time to First Successful Call", description: "Clear documentation and a working sandbox mean less time spent guessing at request formats." },
    { title: "Fewer Integration Support Tickets", description: "Self-service key management and accurate docs reduce the back-and-forth that usually slows integration projects down." },
    { title: "Safer Testing Before Go-Live", description: "A sandbox that mirrors production means integration bugs are caught before they touch real patient data." },
    { title: "Clearer Ownership of API Usage", description: "Usage visibility per API key means your team knows exactly which integration is calling which endpoint." },
  ],
};

const USE_CASES = {
  eyebrow: "Use Cases",
  heading: "What Teams Build on the Elixir API Developer Portal",
  intro: "The portal supports a range of integration patterns, from patient-facing apps to backend data pipelines.",
  items: [
    { icon: Ico.db, title: "Practice Management System Sync" },
    { icon: Ico.heart, title: "Patient Engagement Applications" },
    { icon: Ico.chart, title: "Analytics & Population Health Tools" },
    { icon: Ico.cart, title: "Billing & Clearinghouse Integration" },
    { icon: Ico.webhook, title: "Real-Time Event Automation" },
    { icon: Ico.compass, title: "Custom Patient-Facing Apps" },
  ],
};

const SCENARIOS = {
  eyebrow: "Implementation Scenarios",
  heading: "How Integration Teams Typically Use the Portal",
  intro: "Illustrative scenarios based on common integration patterns — not a specific client engagement.",
  cases: [
    {
      title: "A Patient Engagement App Integrates Appointment Data",
      tag: "Patient Engagement",
      challenge: "A third-party patient engagement vendor needed real-time appointment data without polling the EHR on a fixed schedule.",
      approach: "Mirketa helped the integration team configure a webhook subscription for appointment events alongside a scoped, read-only API key.",
      result: "The vendor's app now receives appointment updates in near real time instead of on a delayed polling cycle.",
    },
    {
      title: "An Analytics Platform Validates Its Integration in Sandbox First",
      tag: "Population Health",
      challenge: "An analytics vendor's integration needed to be validated against realistic data before touching any live patient records.",
      approach: "Mirketa guided the team through sandbox testing that mirrored the structure of the production environment, including error-handling scenarios.",
      result: "The integration was fully validated in sandbox, and the production cutover required no unplanned rework.",
    },
  ],
};

const WHY_MIRKETA = {
  eyebrow: "Why Mirketa",
  heading: "Integration Support That Understands the Portal and the Data Behind It",
  intro: "Plenty of partners can read API documentation. Fewer understand the healthcare data model and compliance context behind each endpoint.",
  items: [
    { icon: Ico.award, title: "Elixir Platform Depth", description: "Direct experience with Elixir's API structure and developer portal, not a generic integration playbook." },
    { icon: Ico.compass, title: "Healthcare Data Model Fluency", description: "We understand what each endpoint actually represents clinically, not just its request and response shape." },
    { icon: Ico.clock, title: "Structured, Scoped Delivery", description: "A defined integration timeline scoped to the endpoints and events your project actually needs." },
    { icon: Ico.shield, title: "Security-First Integration Design", description: "Access scoping and credential handling designed around least-privilege principles from the start." },
    { icon: Ico.users, title: "Dedicated Delivery Team", description: "The consultants who scope your integration support it through go-live and beyond." },
    { icon: Ico.compass, title: "Support Beyond Go-Live", description: "Ongoing integration support available as your API usage or endpoint needs evolve." },
  ],
};

const TECHNOLOGIES = {
  eyebrow: "Technology Stack",
  heading: "The Standards and Tools This Work Typically Touches",
  intro: "Selected based on the integration you're building, not a default recommendation.",
  items: [
    { icon: Ico.layers, title: "RESTful / FHIR-Aligned APIs" },
    { icon: Ico.key, title: "OAuth 2.0 / OpenID Connect" },
    { icon: Ico.webhook, title: "Webhook Event Subscriptions" },
    { icon: Ico.book, title: "OpenAPI / Postman Collections" },
    { icon: Ico.flask, title: "Sandbox Test Environment" },
    { icon: Ico.db, title: "Elixir EHR Platform" },
  ],
};

const PROCESS = {
  eyebrow: "Implementation Process",
  heading: "A Five-Stage Path From Portal Access to Live Integration",
  intro: "A structured methodology for taking an integration from initial API access to a monitored, production-ready connection.",
  steps: [
    { label: "Integration Scoping" },
    { label: "Access Provisioning" },
    { label: "Build" },
    { label: "Sandbox Testing" },
    { label: "Go-Live & Monitor" },
  ],
  detail: [
    { name: "Integration Scoping", description: "Endpoints, data flows, and webhook events identified based on what the integration actually needs to do." },
    { name: "Access Provisioning", description: "API keys, OAuth scopes, and sandbox access configured for the development team." },
    { name: "Build", description: "The integration is built against sandbox endpoints using the portal's reference documentation and code samples." },
    { name: "Sandbox Testing", description: "Structured testing of both expected behavior and error scenarios before any production access is granted." },
    { name: "Go-Live & Monitor", description: "Supported production cutover followed by ongoing monitoring of API usage and webhook delivery." },
  ],
};

const FAQS = [
  { q: "What is the Elixir API Developer Portal?", a: "It's the self-service portal where developers integrating with Elixir EHR find API documentation, generate credentials, test in a sandbox environment, and manage webhook subscriptions." },
  { q: "Do I need to be a Mirketa client to use the portal?", a: "The portal is provided as part of the Elixir platform. Mirketa supports healthcare organizations and their integration partners in getting the most out of it during implementation and beyond." },
  { q: "Is there a sandbox environment for testing?", a: "Yes. The portal includes a sandbox that mirrors the structure of the production environment, so integrations can be validated before they touch real patient data." },
  { q: "What authentication method does the API use?", a: "The API uses OAuth 2.0 / OpenID Connect authentication with scoped access tokens rather than a single shared credential." },
  { q: "Can I subscribe to real-time events instead of polling?", a: "Yes. The portal supports webhook subscriptions for events like appointment changes and record updates, so integrations don't need to poll on a fixed schedule." },
  { q: "How are API rate limits handled?", a: "Rate limits are documented per API key, with usage visibility in the portal so integration teams can plan around them instead of discovering limits in production." },
  { q: "What kinds of applications typically integrate through this portal?", a: "Common integrations include practice management system sync, patient engagement apps, analytics and population health tools, billing and clearinghouse connections, and custom patient-facing applications." },
  { q: "Do you provide support after an integration goes live?", a: "Yes. Ongoing integration support is available as your API usage, endpoint needs, or webhook events evolve over time." },
];

const RELATED_SERVICES = {
  eyebrow: "Related Reading",
  heading: "Explore More of the Elixir (EHR) Platform",
  intro: "API integration is one part of a broader Elixir implementation. Here's where to look next.",
  items: [
    { slug: ELIXIR_PAGES.ONC_MFA_USE_CASES.slug, label: ELIXIR_PAGES.ONC_MFA_USE_CASES.label, description: "See how authentication and access security are configured for the same platform this API sits behind." },
    { slug: ELIXIR_PAGES.CERTIFIED_MODULE.slug, label: ELIXIR_PAGES.CERTIFIED_MODULE.label, description: "Learn about the certified module capabilities available through these same API endpoints." },
    { slug: INTEGRATION_PAGES.ENTERPRISE.slug, label: INTEGRATION_PAGES.ENTERPRISE.label, description: "Explore Mirketa's broader enterprise integration services beyond the Elixir platform." },
    { slug: INDUSTRY_PAGES.HEALTHCARE.slug, label: INDUSTRY_PAGES.HEALTHCARE.label, description: "Explore Mirketa's broader healthcare technology and EHR integration work." },
    { slug: AI_PAGES.AI_DATA_FOUNDATIONS.slug, label: AI_PAGES.AI_DATA_FOUNDATIONS.label, description: "Build the governed data foundation that keeps integrated data reliable across systems." },
  ],
};

const FINAL_CTA = {
  heading: "Get Your Integration Team Productive on the Elixir API",
  description: "Partner with Mirketa to scope, build, and validate your Elixir API integration — or talk to an integration advisor first.",
  primaryCta: { label: "Talk to an Integration Advisor", href: "#contact" },
  secondaryCta: { label: "Request Portal Access Support", href: "#contact" },
};

const CONSULTATION = {
  eyebrow: "Get Started",
  heading: "Talk to an Elixir Integration Advisor",
  description: "Tell us what you're integrating and which systems are involved — an integration advisor will follow up within one business day.",
  formTitle: "Request Integration Support",
};

const SEO = {
  title: pageSEO.title,
  description: pageSEO.description,
  canonical: `https://mirketa.us${pageSEO.slug}`,
  keywords: [
    "API Developer Portal",
    "healthcare API",
    "API integration",
    "developer portal",
    "healthcare APIs",
    "EHR integration",
  ],
  schema: [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "Healthcare API Integration Support",
      provider: { "@type": "Organization", name: "Mirketa Inc.", url: "https://mirketa.us" },
      name: "Elixir API Developer Portal Integration Support",
      description: "API documentation, sandbox testing, and secure authentication support for integrating healthcare applications with Elixir EHR.",
      areaServed: "Global",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://mirketa.us/" },
        { "@type": "ListItem", position: 2, name: ELIXIR_PAGES.API_DEVELOPER_PORTAL.label, item: `https://mirketa.us${pageSEO.slug}` },
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

export default function ApiDeveloperPortal() {
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

      gsap.utils.toArray(".adp-reveal").forEach((el) => {
        gsap.from(el, { opacity: prefersReduced ? 1 : 0, y: prefersReduced ? 0 : 32, duration: 0.7, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 88%" } });
      });
      gsap.utils.toArray(".adp-reveal-left").forEach((el) => {
        gsap.from(el, { opacity: prefersReduced ? 1 : 0, x: prefersReduced ? 0 : -30, duration: 0.7, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 88%" } });
      });
      gsap.utils.toArray(".adp-reveal-right").forEach((el) => {
        gsap.from(el, { opacity: prefersReduced ? 1 : 0, x: prefersReduced ? 0 : 30, duration: 0.7, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 88%" } });
      });
      gsap.utils.toArray(".adp-reveal-stagger").forEach((el) => {
        gsap.from(el.children, { opacity: prefersReduced ? 1 : 0, y: prefersReduced ? 0 : 26, duration: 0.6, stagger: 0.06, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 85%" } });
      });
      gsap.utils.toArray(".adp-zoom-in").forEach((el) => {
        gsap.from(el, { opacity: prefersReduced ? 1 : 0, scale: prefersReduced ? 1 : 0.94, duration: 0.6, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 88%" } });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="elixir-api-developer-portal">
      <Seo {...SEO} />
      <HeroSection heroTextRef={heroTextRef} heroRef={heroRef} />
      <TrustedByMarquee label="Trusted by Healthcare Integration & Development Teams" />
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
      <RelatedServices {...RELATED_SERVICES} className="adp-related adp-reveal" />
      <FinalCtaSection />
      <ConsultationSection {...CONSULTATION} />
      <StickyCta heroRef={heroRef} label="Talk to an Integration Advisor" />
    </div>
  );
}

// ============================================================
// HERO
// ============================================================

function HeroSection({ heroTextRef, heroRef }) {
  return (
    <section ref={heroRef} className="adp-hero" style={{ backgroundImage: `url("${Images.heroElixirApiDeveloperPortal}")` }} aria-label="API Developer Portal by Mirketa">
      <div className="adp-hero__scrim" />
      <div className="container">
        <Breadcrumb items={BREADCRUMB_ITEMS} className="adp-breadcrumb" />
        <div className="adp-hero__inner">
          <div ref={heroTextRef} className="adp-hero__text">
            <span className="adp-badge">
              <span className="adp-badge__spark" aria-hidden="true">✦</span> {HERO.badge}
            </span>
            <h1>{HERO.title}</h1>
            <p className="adp-hero__description">{HERO.description}</p>
            <div className="adp-hero__ctas">
              <a href={HERO.primaryCta.href} className="btn btn-primary adp-btn">
                {HERO.primaryCta.label} <span aria-hidden="true">→</span>
              </a>
              <a href={HERO.secondaryCta.href} className="btn btn-secondary adp-btn">
                {HERO.secondaryCta.label}
              </a>
            </div>
            <ul className="adp-hero__metrics">
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
            className="adp-hero__visual adp-zoom-in"
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
    <section className="section adp-challenges" aria-labelledby="adp-challenges-heading">
      <div className="container">
        <div className="section-heading adp-reveal">
          <p className="adp-eyebrow">{CHALLENGES.eyebrow}</p>
          <h2 id="adp-challenges-heading">{CHALLENGES.heading}</h2>
          <p>{CHALLENGES.intro}</p>
        </div>
        <div className="adp-challenges__grid adp-reveal-stagger">
          {CHALLENGES.items.map((c) => (
            <div className="adp-challenge-card" key={c.title}>
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
    <section className="section adp-solution" aria-labelledby="adp-solution-heading">
      <div className="container adp-solution__grid">
        <div className="adp-reveal-left">
          <p className="adp-eyebrow">{SOLUTION.eyebrow}</p>
          <h2 id="adp-solution-heading">{SOLUTION.heading}</h2>
          {SOLUTION.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <div className="adp-reveal-right">
          <WorkflowDiagram
            title="API Request Lifecycle"
            steps={[{ label: "Request Sent" }, { label: "Token Verified" }, { label: "Validated" }, { label: "Processed" }, { label: "Response Returned" }]}
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
    <section className="section adp-services" aria-labelledby="adp-services-heading">
      <div className="container">
        <div className="adp-services__head adp-reveal">
          <img src={Images.illoElixirApiPortalConsole} alt="" aria-hidden="true" className="adp-services__illo" loading="lazy" />
          <div className="section-heading">
            <p className="adp-eyebrow">{SERVICES.eyebrow}</p>
            <h2 id="adp-services-heading">{SERVICES.heading}</h2>
            <p>{SERVICES.intro}</p>
          </div>
        </div>
        <div className="adp-services__grid adp-reveal-stagger">
          {SERVICES.items.map((c) => (
            <div className="adp-service-card" key={c.title}>
              <span className="adp-service-card__icon">{c.icon}</span>
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
    <section className="section adp-technical" aria-labelledby="adp-technical-heading">
      <div className="container">
        <div className="section-heading adp-reveal">
          <p className="adp-eyebrow">{TECHNICAL.eyebrow}</p>
          <h2 id="adp-technical-heading">{TECHNICAL.heading}</h2>
          <p>{TECHNICAL.intro}</p>
        </div>
        <div className="adp-technical__grid adp-reveal-stagger">
          {TECHNICAL.items.map((c) => (
            <div className="adp-technical-item" key={c.title}>
              <p className="adp-card-title">{c.title}</p>
              <p>{c.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// DEVELOPER PRODUCTIVITY
// ============================================================

function AiAutomationSection() {
  return (
    <section className="section adp-ai" aria-labelledby="adp-ai-heading">
      <div className="container">
        <div className="section-heading adp-reveal">
          <p className="adp-eyebrow">{AI_AUTOMATION.eyebrow}</p>
          <h2 id="adp-ai-heading">{AI_AUTOMATION.heading}</h2>
          <p>{AI_AUTOMATION.intro}</p>
        </div>
        <div className="adp-ai__grid adp-reveal-stagger">
          {AI_AUTOMATION.items.map((f) => (
            <div className="adp-ai-item" key={f.title}>
              <p className="adp-card-title">{f.title}</p>
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
    <section className="section adp-benefits" aria-labelledby="adp-benefits-heading">
      <div className="container">
        <div className="section-heading adp-reveal">
          <p className="adp-eyebrow">{BENEFITS.eyebrow}</p>
          <h2 id="adp-benefits-heading">{BENEFITS.heading}</h2>
          <p>{BENEFITS.intro}</p>
        </div>
        <div className="adp-benefits__grid adp-reveal-stagger">
          {BENEFITS.items.map((b) => (
            <div className="adp-benefit-item" key={b.title}>
              <span aria-hidden="true">{Ico.check}</span>
              <div>
                <p className="adp-card-title">{b.title}</p>
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
    <section className="section adp-usecases" aria-labelledby="adp-usecases-heading">
      <div className="container">
        <div className="section-heading adp-reveal">
          <p className="adp-eyebrow">{USE_CASES.eyebrow}</p>
          <h2 id="adp-usecases-heading">{USE_CASES.heading}</h2>
          <p>{USE_CASES.intro}</p>
        </div>
        <div className="adp-usecases__grid adp-reveal-stagger">
          {USE_CASES.items.map((n) => (
            <div className="adp-usecase-card" key={n.title}>
              <span className="adp-usecase-card__icon">{n.icon}</span>
              <p className="adp-card-title">{n.title}</p>
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
    <section className="section adp-scenarios" aria-labelledby="adp-scenarios-heading">
      <div className="container">
        <div className="section-heading adp-reveal">
          <p className="adp-eyebrow">{SCENARIOS.eyebrow}</p>
          <h2 id="adp-scenarios-heading">{SCENARIOS.heading}</h2>
          <p>{SCENARIOS.intro}</p>
        </div>
        <div className="adp-scenarios__grid adp-reveal-stagger">
          {SCENARIOS.cases.map((c) => (
            <div className="adp-scenario-card" key={c.title}>
              <span className="adp-scenario-card__tag">{c.tag}</span>
              <p className="adp-card-title">{c.title}</p>
              <dl className="adp-scenario-card__fields">
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
    <section className="section adp-why" aria-labelledby="adp-why-heading">
      <div className="container">
        <div className="section-heading adp-reveal">
          <p className="adp-eyebrow">{WHY_MIRKETA.eyebrow}</p>
          <h2 id="adp-why-heading">{WHY_MIRKETA.heading}</h2>
          <p>{WHY_MIRKETA.intro}</p>
        </div>
        <div className="adp-why__grid adp-reveal-stagger">
          {WHY_MIRKETA.items.map((w, i) => (
            <div className="adp-why-card" key={`${w.title}-${i}`}>
              <span className="adp-why-card__icon">{w.icon}</span>
              <p className="adp-card-title">{w.title}</p>
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
    <section className="section adp-tech" aria-labelledby="adp-tech-heading">
      <div className="container">
        <div className="section-heading adp-reveal">
          <p className="adp-eyebrow">{TECHNOLOGIES.eyebrow}</p>
          <h2 id="adp-tech-heading">{TECHNOLOGIES.heading}</h2>
          <p>{TECHNOLOGIES.intro}</p>
        </div>
        <div className="adp-tech__grid adp-reveal-stagger">
          {TECHNOLOGIES.items.map((t) => (
            <div className="adp-tech-card" key={t.title}>
              <span className="adp-tech-card__icon">{t.icon}</span>
              <p className="adp-card-title">{t.title}</p>
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
    <section className="section adp-process" aria-labelledby="adp-process-heading">
      <div className="container">
        <div className="section-heading adp-reveal">
          <p className="adp-eyebrow">{PROCESS.eyebrow}</p>
          <h2 id="adp-process-heading">{PROCESS.heading}</h2>
          <p>{PROCESS.intro}</p>
        </div>
        <div className="adp-zoom-in">
          <SupplyChainMap
            title="API Integration Network"
            nodes={[
              { label: "Client Application", short: "APP" },
              { label: "API Gateway", short: "API" },
              { label: "Elixir Platform", short: "EHR" },
              { label: "Webhook Consumer", short: "HOOK" },
              { label: "Sandbox Environment", short: "SBX" },
            ]}
          />
        </div>
        <div className="adp-process__grid adp-reveal-stagger">
          {PROCESS.detail.map((p, i) => (
            <div className="adp-step-card" key={p.name}>
              <span className="adp-step-card__num">{String(i + 1).padStart(2, "0")}</span>
              <p className="adp-card-title">{p.name}</p>
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
    <section className="section adp-faq" aria-labelledby="adp-faq-heading">
      <div className="container">
        <div className="section-heading adp-reveal">
          <p className="adp-eyebrow">FAQ</p>
          <h2 id="adp-faq-heading">Frequently Asked Questions About the API Developer Portal</h2>
        </div>
        <FaqAccordion items={FAQS} className="adp-reveal" searchPlaceholder="Ask a question — e.g. &quot;sandbox&quot;, &quot;OAuth&quot;, &quot;webhooks&quot;..." />
        <p className="adp-faq__links">
          Related reading: <Link to={ELIXIR_PAGES.ONC_MFA_USE_CASES.slug}>{ELIXIR_PAGES.ONC_MFA_USE_CASES.label}</Link>,{" "}
          <Link to={ELIXIR_PAGES.CERTIFIED_MODULE.slug}>{ELIXIR_PAGES.CERTIFIED_MODULE.label}</Link>,{" "}
          <Link to={INTEGRATION_PAGES.ENTERPRISE.slug}>{INTEGRATION_PAGES.ENTERPRISE.label}</Link>,{" "}
          <Link to={INDUSTRY_PAGES.HEALTHCARE.slug}>{INDUSTRY_PAGES.HEALTHCARE.label}</Link>.
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
    <section className="adp-final-cta adp-reveal" aria-labelledby="adp-final-cta-heading">
      <div className="container adp-final-cta__inner">
        <h2 id="adp-final-cta-heading">{FINAL_CTA.heading}</h2>
        <p>{FINAL_CTA.description}</p>
        <div className="adp-final-cta__ctas">
          <a href={FINAL_CTA.primaryCta.href} className="btn btn-primary adp-btn">
            {FINAL_CTA.primaryCta.label} <span aria-hidden="true">→</span>
          </a>
          <a href={FINAL_CTA.secondaryCta.href} className="btn btn-secondary adp-btn">
            {FINAL_CTA.secondaryCta.label}
          </a>
        </div>
      </div>
    </section>
  );
}
