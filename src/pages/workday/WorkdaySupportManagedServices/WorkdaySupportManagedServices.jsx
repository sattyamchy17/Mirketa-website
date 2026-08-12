import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { WORKDAY_PAGES, NETSUITE_PAGES, ORACLE_PAGES, SERVICENOW_PAGES, CLOUD_PAGES } from "../../../config/pageSlugs.js";
import { Images } from "../../../assets/images/index.js";
import Seo from "../../../components/Seo/Seo.jsx";
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb.jsx";
import StickyCta from "../../../components/StickyCta/StickyCta.jsx";
import TrustedByMarquee from "../../../components/TrustedByMarquee/TrustedByMarquee.jsx";
import AnimatedCounter from "../../../components/AnimatedCounter/AnimatedCounter.jsx";
import FaqAccordion from "../../../components/FaqAccordion/FaqAccordion.jsx";
import HeroVisual from "../../../components/HeroVisual/HeroVisual.jsx";
import ConsultationSection from "../../../components/ConsultationSection/ConsultationSection.jsx";
import RelatedServices from "../../../components/RelatedServices/RelatedServices.jsx";
import WorkflowDiagram from "../../../components/illustrations/WorkflowDiagram/WorkflowDiagram.jsx";
import SupplyChainMap from "../../../components/illustrations/SupplyChainMap/SupplyChainMap.jsx";
import AnalyticsPanel from "../../../components/illustrations/AnalyticsPanel/AnalyticsPanel.jsx";
import "./WorkdaySupportManagedServices.css";

gsap.registerPlugin(ScrollTrigger);

// ============================================================
// ICONS
// ============================================================

const Ico = {
  check: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12.5l5 5L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  users: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="9" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.4" /><path d="M3.5 19c.6-3.4 2.9-5.2 5.5-5.2s4.9 1.8 5.5 5.2" stroke="currentColor" strokeWidth="1.4" /><circle cx="17" cy="9" r="2.6" stroke="currentColor" strokeWidth="1.3" opacity="0.7" /><path d="M15.5 13.4c2.2.3 3.7 1.9 4 4.6" stroke="currentColor" strokeWidth="1.3" opacity="0.7" /></svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  headset: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 13v-1a8 8 0 0116 0v1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /><rect x="3" y="13" width="4" height="6" rx="1.4" stroke="currentColor" strokeWidth="1.4" /><rect x="17" y="13" width="4" height="6" rx="1.4" stroke="currentColor" strokeWidth="1.4" /><path d="M19 19v1a2 2 0 01-2 2h-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
  ),
  clock: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" /><path d="M12 7v5l3.5 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
  ),
  refresh: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 12a8 8 0 0114-5.3L20 8M4 12a8 8 0 0014 5.3L20 16M20 8v-4M20 8h-4M4 16v4M4 16h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  monitor: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M2 12s3.5-6.5 10-6.5S22 12 22 12s-3.5 6.5-10 6.5S2 12 2 12z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><circle cx="12" cy="12" r="2.8" stroke="currentColor" strokeWidth="1.4" /></svg>
  ),
  report: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 3h9l3 3v15H6V3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="M9 13l2-2 2 2 3-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  gear: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.4" /><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
  ),
  calendar: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3.5" y="5" width="17" height="16" rx="2" stroke="currentColor" strokeWidth="1.4" /><path d="M3.5 10h17M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
  ),
  award: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="8" r="5" stroke="currentColor" strokeWidth="1.4" /><path d="M8.5 12.5L7 21l5-2.5L17 21l-1.5-8.5" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  compass: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" /><path d="M15 9l-2 6-6 2 2-6 6-2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
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
};

// ============================================================
// DATA
// ============================================================

const BREADCRUMB_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Platforms & Technology", href: "/" },
  { label: WORKDAY_PAGES.SUPPORT_MANAGED_SERVICES.label },
];

const HERO = {
  badge: "Workday Managed Services Partner",
  title: "Workday Support Managed Services for Tenants Already Live in Production",
  description:
    "Mirketa's Workday Support Managed Services keep an already-configured Workday tenant running the way it was designed to — L1 through L3 help desk coverage, bi-annual release regression testing, and proactive monitoring, all backed by named escalation paths instead of a shared support inbox nobody owns.",
  primaryCta: { label: "Get a Workday Support Assessment", href: "#contact" },
  secondaryCta: { label: "Talk to a Managed Services Specialist", href: "#contact" },
  metrics: ["24/7 L1–L3 Ticket Coverage", "Bi-Annual Release Regression Testing", "SLA-Backed Response Times", "Dedicated Workday Admin Team"],
};

const HERO_DASHBOARD = {
  title: "Workday Support Health",
  stats: [
    { label: "SLA ADHERENCE", value: "98.6%", caption: "Trailing 90 days" },
    { label: "OPEN TICKETS", value: "12", caption: "Across all severities" },
    { label: "REGRESSION PASS RATE", value: "99.4%", caption: "2026R1 release cycle" },
  ],
  rows: [
    { title: "P1 payroll integration failure", meta: "Resolved in 2h 10m", tone: "good", status: "Resolved" },
    { title: "2026R1 release regression suite", meta: "312 of 314 test cases passed", tone: "good", status: "Complete" },
    { title: "Manager self-service enhancement backlog", meta: "6 items in current sprint", tone: "neutral", status: "In Progress" },
  ],
  floatingCards: [
    { icon: Ico.headset, title: "24/7 Help Desk", subtitle: "L1–L3 ticket coverage" },
    { icon: Ico.clock, title: "Avg P1 Response", subtitle: "18 minutes" },
  ],
};

const CHALLENGES = {
  eyebrow: "Business Challenges",
  heading: "Why a Live Workday Tenant Still Needs a Support Plan",
  intro:
    "Go-live is the beginning of a Workday tenant's life, not the end of the work. Most requests for Workday Support Managed Services come in after one of these four problems has already started costing the business time.",
  items: [
    { title: "No Workday-Certified Admin on Staff", description: "The consultant who configured the tenant moved on, and the internal team inherited business processes, security groups, and integrations nobody currently on staff is certified to safely change." },
    { title: "Enhancement Requests With Nowhere to Go", description: "HR and finance keep asking for new calculated fields, reports, and workflow tweaks, but there's no dedicated Workday development capacity to pick the backlog up." },
    { title: "Bi-Annual Releases That Break Things Without Warning", description: "Workday's biannual updates land on the calendar whether or not anyone has tested them against your custom business processes, EIB integrations, and Extend applications first." },
    { title: "No Proactive Monitoring Until Someone Complains", description: "Failed integration runs, stalled approval steps, and broken calculated fields usually surface only when an employee or manager reports something is wrong." },
  ],
};

const SOLUTION = {
  eyebrow: "Our Workday Solution",
  heading: "How Mirketa's Workday Support Managed Services Model Works",
  paragraphs: [
    "Mirketa's Workday Support Managed Services engagement starts by treating your production tenant as a system that already works and needs to keep working, not a blank slate to redesign. We inventory your business process framework, security group architecture, EIB and Studio integrations, and custom report inventory so our support team understands your tenant on day one instead of learning it ticket by ticket.",
    "From there, a named team of Workday-certified specialists handles day-to-day L1 through L3 ticket support, runs your sandbox and preview environments through a structured regression suite ahead of every biannual release, and works through your enhancement and report backlog on a predictable cadence rather than an ad hoc basis. This is Workday managed services delivered as an ongoing relationship, with the same specialists returning release after release instead of a rotating queue of unfamiliar agents.",
    "Because monitoring runs continuously against your tenant — not just when a ticket is filed — configuration drift, failed integration runs, and broken calculated fields typically get caught and corrected before an employee or manager ever notices. That combination of steady-state administration and Workday managed services discipline is what keeps a tenant's original configuration intent intact for years, not just for the first two release cycles after go-live.",
  ],
};

const CORE_SERVICES = {
  eyebrow: "Core Services",
  heading: "Six Ways Mirketa Delivers Workday Support Managed Services",
  intro: "Every managed services engagement is built from these six service lines, scoped to match how much of your tenant administration you want to keep in-house versus hand off.",
  items: [
    { icon: Ico.headset, title: "L1–L3 Help Desk Support", description: "Tiered ticket support from basic how-to questions through complex business process and integration troubleshooting, with a named escalation path at every level." },
    { icon: Ico.refresh, title: "Bi-Annual Release & Regression Testing", description: "Every Workday release is run through your sandbox and preview tenants against a documented regression suite before it ever reaches production." },
    { icon: Ico.monitor, title: "Proactive Tenant Monitoring", description: "Continuous checks against integration runs, business process bottlenecks, and security group changes so issues surface before employees feel them." },
    { icon: Ico.report, title: "Enhancement & Report Backlog Delivery", description: "A standing queue of calculated fields, custom reports, and configuration enhancements worked through on a predictable sprint cadence." },
    { icon: Ico.gear, title: "Workday Administration-as-a-Service", description: "Routine tenant administration — security group updates, business process tuning, EIB monitoring — handled without you needing a full-time certified admin on staff." },
    { icon: Ico.calendar, title: "Quarterly Business Reviews & Optimization Roadmap", description: "A recurring review of ticket trends, adoption metrics, and an evolving roadmap for what to configure or automate next." },
  ],
};

const FEATURES = {
  eyebrow: "Key Features",
  heading: "How a Support Ticket Actually Moves Through Mirketa's Desk",
  intro: "These are the operational features behind every Workday Support Managed Services engagement, from the moment a ticket is logged to the moment it's closed.",
  items: [
    { title: "Tiered SLA Response Times", description: "P1, P2, and P3 severity definitions with documented response and resolution targets for each tier." },
    { title: "Named Escalation Path", description: "A specific specialist and backup are assigned to your tenant, not a rotating anonymous queue." },
    { title: "Release Preview Regression Suite", description: "A documented set of test cases run against every Workday release preview before production update weekend." },
    { title: "Change-Log Documentation", description: "Every configuration change is logged with what changed, why, and who approved it, so nothing depends on memory." },
    { title: "Security Group Health Checks", description: "Periodic review of domain and business process security to catch drift and segregation-of-duties gaps early." },
    { title: "Prism Analytics Report Maintenance", description: "Existing Prism dashboards and data sources are kept aligned as source business processes and fields evolve." },
  ],
};

const BENEFITS = {
  eyebrow: "Benefits",
  heading: "What Changes Once a Support Plan Is in Place",
  intro: "These are the outcomes clients on a Workday Support Managed Services retainer consistently report within the first two quarters.",
  stats: [
    { value: "98.6%", label: "SLA Adherence" },
    { value: "18min", label: "Avg P1 Response Time" },
    { value: "99.4%", label: "Release Regression Pass Rate" },
    { value: "35%", label: "Fewer Escalations After Onboarding" },
  ],
  items: [
    { title: "Releases Stop Being a Surprise", description: "Regression testing against release preview means you know what's changing before your employees do." },
    { title: "The Backlog Actually Moves", description: "Enhancement and report requests get worked on a set cadence instead of waiting for a spare afternoon." },
    { title: "No Single Point of Failure", description: "A documented, supported tenant no longer depends on one internal admin's memory or availability." },
    { title: "Issues Get Caught Before Employees Notice", description: "Proactive monitoring surfaces failed integrations and stalled approvals before they become a help desk fire drill." },
  ],
};

const PROCESS = {
  eyebrow: "Implementation Methodology",
  heading: "A Five-Stage Path to Steady-State Support",
  intro: "This is the onboarding sequence Mirketa follows to take over Workday support for a tenant that's already live, whether it's coming from an internal team or another partner.",
  steps: [
    { label: "Environment & Documentation Handover" },
    { label: "Baseline Health Assessment" },
    { label: "SLA & Escalation Setup" },
    { label: "Ticketing System Integration" },
    { label: "Steady-State Support" },
  ],
  detail: [
    { name: "Environment & Documentation Handover", description: "Access to sandbox, preview, and production tenants along with existing configuration documentation, integration inventories, and open ticket history." },
    { name: "Baseline Health Assessment", description: "A structured audit of business process framework, security groups, EIB and Studio integrations, and report inventory to establish a starting point." },
    { name: "SLA & Escalation Setup", description: "Severity definitions, response targets, and escalation contacts agreed and documented before the first ticket is logged under the new arrangement." },
    { name: "Ticketing System Integration", description: "Your preferred ticketing tool or Mirketa's own portal is connected so requests are tracked, prioritized, and reported on from day one." },
    { name: "Steady-State Support", description: "Ongoing L1–L3 support, release regression testing, and backlog delivery begin on the agreed SLA, with a quarterly review cadence layered on top." },
  ],
};

const INDUSTRIES = {
  eyebrow: "Industry Use Cases",
  heading: "Workday Support Managed Services Across Industries",
  intro: "Every industry brings its own audit expectations and peak-period sensitivity to a live Workday tenant, which shapes how we prioritize monitoring and release testing.",
  items: [
    { icon: Ico.code, title: "Software & SaaS" },
    { icon: Ico.users, title: "Professional Services" },
    { icon: Ico.heart, title: "Healthcare" },
    { icon: Ico.bank, title: "Financial Services" },
    { icon: Ico.factory, title: "Manufacturing" },
    { icon: Ico.cart, title: "Retail" },
  ],
};

const WHY_MIRKETA = {
  eyebrow: "Why Mirketa",
  heading: "A Support Partner Built for a Tenant That's Already Live",
  intro: "Plenty of partners will implement a new Workday tenant. Fewer are built specifically to keep an existing one healthy release after release.",
  items: [
    { icon: Ico.award, title: "Workday Certified Support Team", description: "Every specialist assigned to your tenant holds active Workday certifications across HCM, Payroll, or Financial Management." },
    { icon: Ico.headset, title: "Named Specialists, Not a Queue", description: "The same people learn your tenant's history and quirks, rather than a rotating group of unfamiliar agents." },
    { icon: Ico.clock, title: "SLA-Backed Response Commitments", description: "Documented response and resolution targets by severity, tracked and reported on every quarter." },
    { icon: Ico.refresh, title: "Release-Ready by Design", description: "Every biannual Workday release is regression-tested against your specific configuration before it reaches production." },
    { icon: Ico.shield, title: "Security Reviewed, Not Just Maintained", description: "Ongoing security group health checks catch drift and segregation-of-duties gaps before an audit does." },
    { icon: Ico.compass, title: "Flexible Engagement Scope", description: "Scale from help-desk-only coverage up to full administration-as-a-service as your internal capacity changes." },
  ],
};

const CASE_STUDIES = {
  eyebrow: "Customer Success / Case Study",
  heading: "Real Workday Support Managed Services Outcomes",
  intro: "Anonymized results from recent Workday support engagements across industries.",
  cases: [
    {
      title: "SaaS Company Cuts Ticket Resolution Time by 58%",
      industry: "Software & SaaS",
      challenge: "A single internal admin was handling every Workday ticket alongside other duties, and resolution times routinely stretched past a week for anything beyond a password reset.",
      solution: "Mirketa took over L1–L3 support with tiered SLA response targets and a named escalation path for complex business process and integration issues.",
      outcome: "Average ticket resolution time dropped 58%, and P1 issues are now acknowledged in under 20 minutes.",
    },
    {
      title: "Healthcare Network Stops Losing Configuration to Bad Releases",
      industry: "Healthcare",
      challenge: "Two consecutive Workday releases had broken existing approval routing and a payroll EIB integration, both discovered only after employees reported paycheck errors.",
      solution: "We introduced a documented regression suite run against release preview in the sandbox tenant ahead of every biannual update.",
      outcome: "The network has had zero unplanned configuration breaks across the last four release cycles.",
    },
  ],
};

const FAQS = [
  { q: "What SLA tiers do you offer for Workday support?", a: "We define three severity tiers — P1 (production-down or payroll-impacting), P2 (a significant workflow disruption with a workaround), and P3 (a how-to question or minor issue) — each with its own documented response and resolution targets agreed before onboarding." },
  { q: "What counts as a P1 issue?", a: "A P1 is anything that stops a business-critical process outright — a failed payroll integration, a broken business process blocking hires or terminations, or a tenant-wide outage. P1 tickets get the fastest acknowledgment and are worked continuously until resolved." },
  { q: "How do you handle Workday's bi-annual releases?", a: "We run your existing business processes, security groups, and integrations through a documented regression suite in your sandbox or preview tenant as soon as the release is available, well ahead of the production update weekend, so breaking changes are caught and fixed before employees see them." },
  { q: "What is your average response time for tickets?", a: "P1 tickets are typically acknowledged within 15 to 20 minutes and worked continuously. P2 tickets are acknowledged within a few hours, and P3 requests are scheduled into the next available support cycle." },
  { q: "How is Workday Support Managed Services priced?", a: "Most clients choose a monthly retainer scoped to expected ticket volume and support hours, with enhancement and report backlog work either included up to a cap or billed as a separate block of hours. We'll recommend a model based on your tenant's size and ticket history." },
  { q: "How long does onboarding to a support retainer take?", a: "Typical onboarding runs two to four weeks, covering environment handover, a baseline health assessment of your current configuration, and SLA and escalation setup before steady-state support begins." },
  { q: "Do you only handle break-fix tickets, or enhancement requests too?", a: "Both. Break-fix tickets are handled under your SLA, while enhancement requests — new reports, calculated fields, or configuration changes — are worked through a standing backlog on a predictable sprint cadence." },
  { q: "Can you take over support from our current partner or internal admin?", a: "Yes. Most engagements start exactly this way. We run a baseline health assessment against the existing tenant, document what we find, and transition support without requiring a reimplementation." },
];

const RELATED_SERVICES = {
  eyebrow: "Related Services",
  heading: "Explore More Ways Mirketa Supports a Live Enterprise Tenant",
  intro: "Workday Support Managed Services is one part of keeping enterprise systems healthy after go-live. Here's where to look next.",
  items: [
    { slug: WORKDAY_PAGES.CONSULTING_DEVELOPMENT.slug, label: WORKDAY_PAGES.CONSULTING_DEVELOPMENT.label, description: "Need new business processes, security groups, or custom development instead of ongoing support? Start here." },
    { slug: NETSUITE_PAGES.SUPPORT_SERVICES.slug, label: NETSUITE_PAGES.SUPPORT_SERVICES.label, description: "The same SLA-backed support model, applied to a live NetSuite ERP environment." },
    { slug: ORACLE_PAGES.MANAGED_SERVICES.slug, label: ORACLE_PAGES.MANAGED_SERVICES.label, description: "Ongoing administration and release support for Oracle Fusion tenants running alongside Workday." },
    { slug: SERVICENOW_PAGES.SUPPORT_MANAGED_SERVICES.slug, label: SERVICENOW_PAGES.SUPPORT_MANAGED_SERVICES.label, description: "Extend the same managed-support model to your ServiceNow instance and workflows." },
    { slug: CLOUD_PAGES.INFRA_MANAGEMENT.slug, label: CLOUD_PAGES.INFRA_MANAGEMENT.label, description: "Managed support for the cloud infrastructure your Workday integrations and middleware depend on." },
  ],
};

const CONSULTATION = {
  eyebrow: "Get Started",
  heading: "Get Started With Workday Support Managed Services",
  description: "Tell us about your current tenant, ticket volume, and upcoming release timeline — a Workday-certified specialist will follow up within one business day with SLA options.",
  formTitle: "Talk to a Workday Support Specialist",
};

const SEO = {
  title: "Workday Support Managed Services | Mirketa",
  description:
    "Mirketa's Workday Support Managed Services deliver SLA-backed help desk support, bi-annual release testing, and proactive monitoring for live Workday tenants.",
  canonical: `https://mirketa.us${WORKDAY_PAGES.SUPPORT_MANAGED_SERVICES.slug}/`,
  keywords: [
    "Workday Support Managed Services",
    "Workday Managed Services",
    "Workday Admin Support",
    "Workday Release Management",
    "Bi-Annual Update Testing",
    "Proactive Tenant Monitoring",
    "Workday Enhancement Backlog",
    "Workday Help Desk Support",
  ],
  schema: [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "Workday Support Managed Services",
      provider: { "@type": "Organization", name: "Mirketa Inc.", url: "https://mirketa.us" },
      name: "Workday Support Managed Services",
      description: "L1–L3 help desk support, bi-annual release regression testing, proactive tenant monitoring, and administration-as-a-service for live Workday tenants.",
      areaServed: "Global",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://mirketa.us/" },
        { "@type": "ListItem", position: 2, name: WORKDAY_PAGES.SUPPORT_MANAGED_SERVICES.label, item: `https://mirketa.us${WORKDAY_PAGES.SUPPORT_MANAGED_SERVICES.slug}/` },
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

export default function WorkdaySupportManagedServices() {
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

      gsap.utils.toArray(".wss-reveal").forEach((el) => {
        gsap.from(el, { opacity: prefersReduced ? 1 : 0, y: prefersReduced ? 0 : 32, duration: 0.7, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 88%" } });
      });
      gsap.utils.toArray(".wss-reveal-left").forEach((el) => {
        gsap.from(el, { opacity: prefersReduced ? 1 : 0, x: prefersReduced ? 0 : -30, duration: 0.7, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 88%" } });
      });
      gsap.utils.toArray(".wss-reveal-right").forEach((el) => {
        gsap.from(el, { opacity: prefersReduced ? 1 : 0, x: prefersReduced ? 0 : 30, duration: 0.7, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 88%" } });
      });
      gsap.utils.toArray(".wss-reveal-stagger").forEach((el) => {
        gsap.from(el.children, { opacity: prefersReduced ? 1 : 0, y: prefersReduced ? 0 : 26, duration: 0.6, stagger: 0.06, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 85%" } });
      });
      gsap.utils.toArray(".wss-zoom-in").forEach((el) => {
        gsap.from(el, { opacity: prefersReduced ? 1 : 0, scale: prefersReduced ? 1 : 0.94, duration: 0.6, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 88%" } });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="workday-support-managed-services">
      <Seo {...SEO} />
      <HeroSection heroTextRef={heroTextRef} heroRef={heroRef} />
      <TrustedByMarquee label="Trusted by HR & IT Leaders Running Workday in Production" />
      <ChallengesSection />
      <SolutionSection />
      <CoreServicesSection />
      <FeaturesSection />
      <BenefitsSection />
      <ProcessSection />
      <IndustriesSection />
      <WhyMirketaSection />
      <CaseStudySection />
      <FaqSection />
      <RelatedServices {...RELATED_SERVICES} className="wss-related wss-reveal" />
      <ConsultationSection {...CONSULTATION} />
      <StickyCta heroRef={heroRef} label="Get a Workday Support Assessment" />
    </div>
  );
}

// ============================================================
// HERO
// ============================================================

function HeroSection({ heroTextRef, heroRef }) {
  return (
    <section ref={heroRef} className="wss-hero" style={{ backgroundImage: `url("${Images.heroWorkdaySupportManagedServices}")` }} aria-label="Workday Support Managed Services by Mirketa">
      <div className="wss-hero__scrim" />
      <div className="container">
        <Breadcrumb items={BREADCRUMB_ITEMS} className="wss-breadcrumb" />
        <div className="wss-hero__inner">
          <div ref={heroTextRef} className="wss-hero__text">
            <span className="wss-badge">
              <span className="wss-badge__spark" aria-hidden="true">✦</span> {HERO.badge}
            </span>
            <h1>{HERO.title}</h1>
            <p className="wss-hero__description">{HERO.description}</p>
            <div className="wss-hero__ctas">
              <a href={HERO.primaryCta.href} className="btn btn-primary wss-btn">
                {HERO.primaryCta.label} <span aria-hidden="true">→</span>
              </a>
              <a href={HERO.secondaryCta.href} className="btn btn-secondary wss-btn">
                {HERO.secondaryCta.label}
              </a>
            </div>
            <ul className="wss-hero__metrics">
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
            className="wss-hero__visual wss-zoom-in"
          />
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
    <section className="section wss-challenges" aria-labelledby="wss-challenges-heading">
      <div className="container">
        <div className="section-heading wss-reveal">
          <p className="wss-eyebrow">{CHALLENGES.eyebrow}</p>
          <h2 id="wss-challenges-heading">{CHALLENGES.heading}</h2>
          <p>{CHALLENGES.intro}</p>
        </div>
        <div className="wss-challenges__grid wss-reveal-stagger">
          {CHALLENGES.items.map((c) => (
            <div className="wss-challenge-card" key={c.title}>
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
// OUR WORKDAY SOLUTION
// ============================================================

function SolutionSection() {
  return (
    <section className="section wss-solution" aria-labelledby="wss-solution-heading">
      <div className="container wss-solution__grid">
        <div className="wss-reveal-left">
          <img src={Images.illoWorkdaySupportCaseDashboard} alt="" aria-hidden="true" className="wss-solution__illo" loading="lazy" />
          <p className="wss-eyebrow">{SOLUTION.eyebrow}</p>
          <h2 id="wss-solution-heading">{SOLUTION.heading}</h2>
          {SOLUTION.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <div className="wss-reveal-right">
          <AnalyticsPanel
            title="SLA Adherence & Ticket Resolution"
            donutPercent={98.6}
            donutLabel="Tickets resolved within SLA, trailing 90 days"
            metrics={[
              { value: "98.6%", label: "SLA adherence" },
              { value: "18min", label: "Avg P1 response time" },
            ]}
          />
        </div>
      </div>
    </section>
  );
}

// ============================================================
// CORE SERVICES
// ============================================================

function CoreServicesSection() {
  return (
    <section className="section wss-core" aria-labelledby="wss-core-heading">
      <div className="container">
        <div className="section-heading wss-reveal">
          <p className="wss-eyebrow">{CORE_SERVICES.eyebrow}</p>
          <h2 id="wss-core-heading">{CORE_SERVICES.heading}</h2>
          <p>{CORE_SERVICES.intro}</p>
        </div>
        <div className="wss-core__grid wss-reveal-stagger">
          {CORE_SERVICES.items.map((c) => (
            <div className="wss-core-card" key={c.title}>
              <span className="wss-core-card__icon">{c.icon}</span>
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
// KEY FEATURES
// ============================================================

function FeaturesSection() {
  return (
    <section className="section wss-features" aria-labelledby="wss-features-heading">
      <div className="container">
        <div className="section-heading wss-reveal">
          <p className="wss-eyebrow">{FEATURES.eyebrow}</p>
          <h2 id="wss-features-heading">{FEATURES.heading}</h2>
          <p>{FEATURES.intro}</p>
        </div>
        <div className="wss-features__layout">
          <div className="wss-features__grid wss-reveal-stagger">
            {FEATURES.items.map((f) => (
              <div className="wss-feature-item" key={f.title}>
                <p className="wss-card-title">{f.title}</p>
                <p>{f.description}</p>
              </div>
            ))}
          </div>
          <div className="wss-reveal-right">
            <WorkflowDiagram
              title="Support Ticket Lifecycle"
              steps={[{ label: "Ticket logged" }, { label: "Triaged & prioritized" }, { label: "Assigned to specialist" }, { label: "Fixed & tested" }, { label: "Closed with root cause" }]}
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
    <section className="section wss-benefits" aria-labelledby="wss-benefits-heading">
      <div className="container">
        <div className="section-heading wss-reveal">
          <p className="wss-eyebrow">{BENEFITS.eyebrow}</p>
          <h2 id="wss-benefits-heading">{BENEFITS.heading}</h2>
          <p>{BENEFITS.intro}</p>
        </div>
        <div className="wss-benefits__stats wss-reveal-stagger">
          {BENEFITS.stats.map((s) => (
            <AnimatedCounter key={s.label} value={s.value} label={s.label} className="wss-stat" />
          ))}
        </div>
        <div className="wss-benefits__grid wss-reveal-stagger">
          {BENEFITS.items.map((b) => (
            <div className="wss-benefit-item" key={b.title}>
              <span aria-hidden="true">{Ico.check}</span>
              <div>
                <p className="wss-card-title">{b.title}</p>
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
// IMPLEMENTATION METHODOLOGY (SUPPORT ONBOARDING)
// ============================================================

function ProcessSection() {
  return (
    <section className="section wss-process" aria-labelledby="wss-process-heading">
      <div className="container">
        <div className="section-heading wss-reveal">
          <p className="wss-eyebrow">{PROCESS.eyebrow}</p>
          <h2 id="wss-process-heading">{PROCESS.heading}</h2>
          <p>{PROCESS.intro}</p>
        </div>
        <div className="wss-zoom-in">
          <SupplyChainMap
            title="Support Escalation Network"
            nodes={[
              { label: "Mirketa Support Desk", short: "MIR" },
              { label: "HR & People Ops", short: "HR" },
              { label: "Finance & Payroll", short: "FIN" },
              { label: "IT & Security", short: "IT" },
              { label: "Executive Sponsor", short: "EXEC" },
            ]}
          />
        </div>
        <div className="wss-process__grid wss-reveal-stagger">
          {PROCESS.detail.map((p, i) => (
            <div className="wss-step-card" key={p.name}>
              <span className="wss-step-card__num">{String(i + 1).padStart(2, "0")}</span>
              <p className="wss-card-title">{p.name}</p>
              <p>{p.description}</p>
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

function IndustriesSection() {
  return (
    <section className="section wss-industries" aria-labelledby="wss-industries-heading">
      <div className="container">
        <div className="section-heading wss-reveal">
          <p className="wss-eyebrow">{INDUSTRIES.eyebrow}</p>
          <h2 id="wss-industries-heading">{INDUSTRIES.heading}</h2>
          <p>{INDUSTRIES.intro}</p>
        </div>
        <div className="wss-industries__grid wss-reveal-stagger">
          {INDUSTRIES.items.map((n) => (
            <div className="wss-industry-card" key={n.title}>
              <span className="wss-industry-card__icon">{n.icon}</span>
              <p className="wss-card-title">{n.title}</p>
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
    <section className="section wss-why" aria-labelledby="wss-why-heading">
      <div className="container">
        <div className="section-heading wss-reveal">
          <p className="wss-eyebrow">{WHY_MIRKETA.eyebrow}</p>
          <h2 id="wss-why-heading">{WHY_MIRKETA.heading}</h2>
          <p>{WHY_MIRKETA.intro}</p>
        </div>
        <div className="wss-why__grid wss-reveal-stagger">
          {WHY_MIRKETA.items.map((w) => (
            <div className="wss-why-card" key={w.title}>
              <span className="wss-why-card__icon">{w.icon}</span>
              <p className="wss-card-title">{w.title}</p>
              <p>{w.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// CUSTOMER SUCCESS / CASE STUDY
// ============================================================

function CaseStudySection() {
  return (
    <section className="section wss-cases" aria-labelledby="wss-cases-heading">
      <div className="container">
        <div className="section-heading wss-reveal">
          <p className="wss-eyebrow">{CASE_STUDIES.eyebrow}</p>
          <h2 id="wss-cases-heading">{CASE_STUDIES.heading}</h2>
          <p>{CASE_STUDIES.intro}</p>
        </div>
        <div className="wss-cases__grid wss-reveal-stagger">
          {CASE_STUDIES.cases.map((c) => (
            <div className="wss-case-card" key={c.title}>
              <span className="wss-case-card__tag">{c.industry}</span>
              <p className="wss-card-title">{c.title}</p>
              <dl className="wss-case-card__fields">
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
    <section className="section wss-faq" aria-labelledby="wss-faq-heading">
      <div className="container">
        <div className="section-heading wss-reveal">
          <p className="wss-eyebrow">FAQ</p>
          <h2 id="wss-faq-heading">Frequently Asked Questions About Workday Support Managed Services</h2>
        </div>
        <FaqAccordion items={FAQS} className="wss-reveal" searchPlaceholder="Ask a question — e.g. &quot;SLA&quot;, &quot;release&quot;, &quot;pricing&quot;..." />
        <p className="wss-faq__links">
          Related reading: <Link to={WORKDAY_PAGES.CONSULTING_DEVELOPMENT.slug}>{WORKDAY_PAGES.CONSULTING_DEVELOPMENT.label}</Link>,{" "}
          <Link to={NETSUITE_PAGES.SUPPORT_SERVICES.slug}>{NETSUITE_PAGES.SUPPORT_SERVICES.label}</Link>,{" "}
          <Link to={ORACLE_PAGES.MANAGED_SERVICES.slug}>{ORACLE_PAGES.MANAGED_SERVICES.label}</Link>,{" "}
          <Link to={SERVICENOW_PAGES.SUPPORT_MANAGED_SERVICES.slug}>{SERVICENOW_PAGES.SUPPORT_MANAGED_SERVICES.label}</Link>,{" "}
          <Link to={CLOUD_PAGES.INFRA_MANAGEMENT.slug}>{CLOUD_PAGES.INFRA_MANAGEMENT.label}</Link>.
        </p>
      </div>
    </section>
  );
}
