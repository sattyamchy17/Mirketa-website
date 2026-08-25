import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Images } from "../../../assets/images/index.js";
import Seo from "../../../components/Seo/Seo.jsx";
import StickyCta from "../../../components/StickyCta/StickyCta.jsx";
import TrustedByMarquee from "../../../components/TrustedByMarquee/TrustedByMarquee.jsx";
import FaqAccordion from "../../../components/FaqAccordion/FaqAccordion.jsx";
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb.jsx";
import HeroVisual from "../../../components/HeroVisual/HeroVisual.jsx";
import ConsultationSection from "../../../components/ConsultationSection/ConsultationSection.jsx";
import "./SupportManagedServices.css";

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
  upgrade: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 19V6M6 11l6-6 6 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /><path d="M5 21h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
  ),
  pulse: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 12h4l2-6 4 12 2-6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  backlog: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="4" y="4" width="16" height="4" rx="1" stroke="currentColor" strokeWidth="1.4" /><rect x="4" y="10" width="16" height="4" rx="1" stroke="currentColor" strokeWidth="1.4" /><rect x="4" y="16" width="10" height="4" rx="1" stroke="currentColor" strokeWidth="1.4" /></svg>
  ),
  admin: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="8" r="3.4" stroke="currentColor" strokeWidth="1.4" /><path d="M5 20c.8-4 3.4-6.2 7-6.2s6.2 2.2 7 6.2" stroke="currentColor" strokeWidth="1.4" /><path d="M16.5 4.5l1 1M17.5 3.5l1.5 1.5-1 1-1.5-1.5 1-1z" stroke="currentColor" strokeWidth="1.2" /></svg>
  ),
  monitor: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="4" width="18" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.4" /><path d="M8 20h8M12 16v4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /><path d="M6 12l3-3 2 2 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  cycle: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 12a8 8 0 0113.9-5.4M20 12a8 8 0 01-13.9 5.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><path d="M17 4v3.5h-3.5M7 20v-3.5h3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  bank: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 10l8-5 8 5M4 10v9M20 10v9M4 19h16M8 13v4M12 13v4M16 13v4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  factory: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 21V11l5 3V11l5 3V8l8 5v8H3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  cart: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 4h2l2.2 11h10.6L20 7H6.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /><circle cx="9" cy="20" r="1.3" fill="currentColor" /><circle cx="17" cy="20" r="1.3" fill="currentColor" /></svg>
  ),
  chip: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="7" y="7" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.4" /><path d="M9 3v4M15 3v4M9 21v-4M15 21v-4M3 9h4M3 15h4M21 9h-4M21 15h-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
  ),
  globe: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.4" /><path d="M3 12h18M12 3c2.5 2.5 3.5 6 3.5 9s-1 6.5-3.5 9c-2.5-2.5-3.5-6-3.5-9s1-6.5 3.5-9z" stroke="currentColor" strokeWidth="1.3" /></svg>
  ),
  award: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="8" r="5" stroke="currentColor" strokeWidth="1.4" /><path d="M8.5 12.5L7 21l5-2.5L17 21l-1.5-8.5" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  headset: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 13a8 8 0 0116 0v4" stroke="currentColor" strokeWidth="1.5" /><rect x="3" y="13" width="4" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4" /><rect x="17" y="13" width="4" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4" /></svg>
  ),
  compass: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" /><path d="M15 9l-2 6-6 2 2-6 6-2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  dashboard: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="3" width="8" height="8" rx="1.4" stroke="currentColor" strokeWidth="1.4" /><rect x="13" y="3" width="8" height="5" rx="1.4" stroke="currentColor" strokeWidth="1.4" /><rect x="13" y="10" width="8" height="11" rx="1.4" stroke="currentColor" strokeWidth="1.4" /><rect x="3" y="13" width="8" height="8" rx="1.4" stroke="currentColor" strokeWidth="1.4" /></svg>
  ),
  atf: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 8l-5 4 5 4M15 8l5 4-5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  radar: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.3" opacity="0.5" /><circle cx="12" cy="12" r="5.5" stroke="currentColor" strokeWidth="1.3" opacity="0.7" /><path d="M12 12L18 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><circle cx="12" cy="12" r="1.4" fill="currentColor" /></svg>
  ),
};

// ============================================================
// DATA
// ============================================================

const HERO_DASHBOARD = {
  title: "Managed Services Operations",
  stats: [
    { label: "SLA ADHERENCE", value: "99.2%", caption: "Trailing 12-month average" },
    { label: "OPEN TICKETS", value: "11", caption: "Across all priority tiers" },
    { label: "CSAT", value: "9.5", caption: "Out of 10, client-reported" },
  ],
  rows: [
    { title: "Semi-annual upgrade — Xanadu release", meta: "Sub-production tested · Customizations validated", tone: "good", status: "Scheduled" },
    { title: "P3 admin ticket — new ACL request", meta: "SLA: 4hr response · 22 min elapsed", tone: "good", status: "In Progress" },
    { title: "Scheduled job queue anomaly", meta: "Proactive monitoring · Auto-flagged", tone: "attention", status: "Investigating" },
  ],
  floatingCards: [
    { icon: Ico.shield, title: "99.2% SLA Adherence", subtitle: "Trailing 12-month average" },
    { icon: Ico.headset, title: "Dedicated Admin Team", subtitle: "24×7 proactive monitoring" },
  ],
};

const CONSULTATION = {
  eyebrow: "Get Started",
  heading: "Schedule a Consultation",
  description: "Tell us about your managed services or support goals — a certified consultant will follow up within one business day.",
  formTitle: "Schedule a Free Managed Services Consultation",
};

const BREADCRUMB_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Platforms & Technology", href: "/" },
  { label: "ServiceNow", href: "/servicenow" },
  { label: "Support & Managed Services" },
];

const HERO = {
  badge: "ServiceNow Managed Services & Support Partner",
  title: "ServiceNow Managed Services That Keep Your Instance Healthy, Current, and Optimized",
  description:
    "Mirketa's ServiceNow Managed Services give you a dedicated team responsible for day-to-day platform administration, semi-annual upgrades, proactive instance monitoring, and continuous optimization — all delivered against defined SLAs, so your live ServiceNow instance keeps pace with your business instead of quietly falling behind.",
  primaryCta: { label: "Schedule a Consultation", href: "#contact" },
  secondaryCta: { label: "Talk to a ServiceNow Expert", href: "#contact" },
  metrics: [
    "24×7 Proactive Monitoring Available",
    "Semi-Annual Upgrade Management",
    "SLA-Backed Response Times",
    "Dedicated ServiceNow Admins",
  ],
};

const OVERVIEW = {
  eyebrow: "Overview",
  heading: "What ServiceNow Managed Services Means in Practice",
  paragraphs: [
    "ServiceNow Managed Services is the ongoing operational partnership that begins the day your instance goes live and continues for as long as ServiceNow remains part of your technology stack. Where an implementation project has a defined start and end date, managed services is built to run indefinitely — a dedicated team of certified administrators and engineers monitoring, maintaining, and improving your Now Platform instance week after week, quarter after quarter.",
    "In practice, that means someone other than your stretched internal IT team owns the unglamorous but essential work: triaging day-to-day administration tickets, applying configuration changes safely, tuning ACLs and workflows as your organization evolves, and validating that every integration is still passing data correctly. It also means someone is planning months ahead for the next semi-annual ServiceNow upgrade, testing it against your customizations in a sub-production instance long before it ever reaches your users. And it means proactive monitoring is watching instance health, scheduled job queues, and performance metrics around the clock, so problems get caught and resolved before they turn into a flood of help-desk tickets.",
    "Mirketa structures every ServiceNow Managed Services engagement around a written SLA, a named point of contact, and a monthly reporting cadence — so managed support is never a black box, and every hour spent on your instance ties back to a measurable operational outcome.",
  ],
};

const CHALLENGES = {
  eyebrow: "Challenges",
  heading: "Why Live ServiceNow Instances Need Dedicated Support",
  intro: "Most organizations don't struggle to implement ServiceNow — they struggle to keep it running well once the implementation partner leaves. These are the four problems we hear most often.",
  items: [
    {
      icon: Ico.users,
      title: "Your Admin Team Is Stretched Too Thin",
      description: "Internal ServiceNow admins are already juggling break-fix tickets, access requests, and configuration changes for other systems — day-to-day platform administration keeps slipping behind more visible IT priorities.",
    },
    {
      icon: Ico.upgrade,
      title: "Semi-Annual Upgrades Put Stability at Risk",
      description: "Every ServiceNow release cycle carries the risk of breaking custom scripts, UI policies, and third-party integrations that were never tested against the new version before it reached production.",
    },
    {
      icon: Ico.pulse,
      title: "No Proactive Monitoring Means Reactive Firefighting",
      description: "Without instance health monitoring in place, degraded job queues, failing scheduled jobs, and silent integration errors go unnoticed until frustrated users start opening tickets themselves.",
    },
    {
      icon: Ico.backlog,
      title: "Enhancement Requests Pile Up With No Owner",
      description: "Business teams keep requesting new workflows, dashboards, and automations, but there is no dedicated capacity on the internal team to actually scope, build, and ship them.",
    },
  ],
};

const SOLUTIONS = {
  eyebrow: "Solutions",
  heading: "How Mirketa's Managed Services Model Solves Each of These",
  intro: "Each challenge above maps directly to a piece of how we structure a ServiceNow Managed Services engagement.",
  items: [
    {
      icon: Ico.admin,
      title: "A Dedicated or Shared ServiceNow Admin Pool",
      description: "Mirketa's certified administrators absorb day-to-day platform administration — access provisioning, configuration changes, and first-line ticket triage — freeing your internal team to focus on strategic initiatives instead of queue management.",
    },
    {
      icon: Ico.upgrade,
      title: "Structured Upgrade & Release Management",
      description: "We test every semi-annual ServiceNow release against your specific customizations in a sub-production instance weeks before go-live, so upgrades ship on schedule without surprise regressions or weekend outages.",
    },
    {
      icon: Ico.monitor,
      title: "24×7 Proactive Instance Health Monitoring",
      description: "Dashboards and automated alerting watch scheduled job queues, integration health, and performance metrics continuously, catching degradation before it ever reaches the help desk.",
    },
    {
      icon: Ico.cycle,
      title: "A Managed, Prioritized Enhancement Backlog",
      description: "Every enhancement request is logged, scoped, and scheduled into a recurring optimization cycle, so your backlog steadily shrinks instead of growing indefinitely.",
    },
  ],
};

const SLA_TIERS = {
  eyebrow: "Features",
  heading: "Choose the ServiceNow Managed Services SLA Tier That Fits Your Instance",
  intro: "Every managed services engagement is anchored to a written SLA. Compare the three tiers below to see how response time, coverage, and dedicated attention scale with the criticality of your instance.",
  columns: ["Standard", "Priority", "Mission-Critical"],
  rows: [
    {
      label: "Response Time",
      values: ["4 Business Hours", "1 Hour", "15 Minutes"],
    },
    {
      label: "Coverage Hours",
      values: ["Business Hours (9×5)", "Extended Hours (16×5)", "24×7×365"],
    },
    {
      label: "Dedicated Admin",
      values: ["Shared Admin Pool", "Named Admin", "Dedicated Team"],
    },
    {
      label: "Proactive Monitoring",
      values: ["Business Hours", "24×7", "24×7 Proactive"],
    },
  ],
};

const BENEFITS = {
  eyebrow: "Benefits",
  heading: "What ServiceNow Managed Services Delivers, in Measurable Terms",
  intro: "These are the outcomes Mirketa clients typically report within the first two to three quarters of a managed services engagement.",
  items: [
    { stat: "45%", title: "Faster Ticket Resolution", description: "Dedicated admins with deep instance context resolve routine requests without the ramp-up delay of a shared or unfamiliar internal team." },
    { stat: "2×", title: "Seamless Upgrade Management", description: "Pre-tested semi-annual upgrades move roughly twice as fast through validation, with far fewer post-upgrade regression tickets." },
    { stat: "30%", title: "Reduced Admin Overhead", description: "Offloading routine platform administration frees internal IT capacity for projects that actually require their institutional knowledge." },
    { stat: "99.9%", title: "Continuous Instance Health", description: "Around-the-clock monitoring of job queues, integrations, and performance keeps your instance stable and predictable." },
    { stat: "20%", title: "Lower Total Cost of Ownership", description: "A right-sized SLA tier costs less than an equivalent full-time hire, without sacrificing coverage or certified expertise." },
    { stat: "60%", title: "Proactive Risk Reduction", description: "Catching degraded jobs, failed integrations, and upgrade conflicts early prevents the majority of incidents before users ever notice." },
  ],
};

const PROCESS = {
  eyebrow: "Onboarding & Engagement Model",
  heading: "How We Bring Your Instance Into Managed Services",
  intro: "Moving to Mirketa's ServiceNow Managed Services follows a structured onboarding, then settles into a recurring operating rhythm.",
  stages: [
    { name: "Onboarding & Instance Health Check", description: "We audit your current configuration, customizations, integrations, and technical debt before assuming any support responsibility." },
    { name: "Support Model Design", description: "We map your ticket volume and business criticality to the right SLA tier, admin model, and escalation path." },
    { name: "Steady-State Support", description: "Day-to-day administration, ticket triage, and configuration changes run against the agreed SLA, with monthly reporting." },
    { name: "Upgrade & Release Management", description: "Every semi-annual ServiceNow release is scoped, tested against your customizations, and scheduled before it touches production." },
    { name: "Continuous Optimization", description: "A recurring cycle reviews instance health, retires unused customizations, and works through the enhancement backlog." },
  ],
};

const INDUSTRIES = {
  eyebrow: "Industry Expertise",
  heading: "Managed Services Experience Across Regulated, Complex Industries",
  intro: "Every industry brings its own compliance, uptime, and change-control expectations — our managed services teams bring specific domain context to each one.",
  items: [
    { icon: Ico.bank, title: "Financial Services" },
    { icon: Ico.shield, title: "Healthcare" },
    { icon: Ico.factory, title: "Manufacturing" },
    { icon: Ico.cart, title: "Retail" },
    { icon: Ico.chip, title: "Technology & SaaS" },
    { icon: Ico.globe, title: "Public Sector" },
  ],
};

const WHY_MIRKETA = {
  eyebrow: "Why Choose Mirketa",
  heading: "A Managed Services Partner That Treats Your Instance Like It's Ours",
  intro: "Plenty of vendors will sell you a support contract. Fewer will run your ServiceNow instance the way a permanent, senior in-house team would.",
  items: [
    { icon: Ico.award, title: "Certified ServiceNow Administrators", description: "Every admin assigned to your instance holds active ServiceNow certifications, not a generic IT helpdesk background." },
    { icon: Ico.compass, title: "SLA-Backed Accountability", description: "Response times, coverage hours, and reporting are written into the engagement, not left to informal expectations." },
    { icon: Ico.headset, title: "Same Team, Not a Rotating Queue", description: "You work with consistent, named engineers who understand your instance's history, not a different agent on every ticket." },
    { icon: Ico.globe, title: "Global, Follow-the-Sun Coverage", description: "Mission-Critical tier clients get genuine 24×7×365 coverage across time zones, not on-call best-effort." },
  ],
};

const TECH_STACK = {
  eyebrow: "Technology Stack",
  heading: "ServiceNow Capabilities Our Managed Services Team Uses Every Day",
  intro: "Ongoing support isn't just ticket triage — it relies on the same native ServiceNow tooling our engineers use to keep your instance healthy and current.",
  items: [
    { icon: Ico.dashboard, title: "Instance Health Dashboards", description: "Real-time visibility into node performance, job queues, and system health." },
    { icon: Ico.upgrade, title: "Upgrade Center", description: "Native tooling for planning, testing, and scheduling semi-annual releases." },
    { icon: Ico.pulse, title: "Performance Analytics", description: "Trend reporting on KPIs, SLA compliance, and workflow throughput over time." },
    { icon: Ico.atf, title: "Automated Test Framework (ATF)", description: "Regression test suites that validate customizations before every upgrade." },
    { icon: Ico.radar, title: "Discovery", description: "Automated CMDB population and dependency mapping across your infrastructure." },
    { icon: Ico.shield, title: "Vulnerability Response", description: "Security patch tracking and remediation prioritization tied to real risk." },
  ],
};

const FAQS = [
  {
    q: "What is included in Mirketa's ServiceNow Managed Services?",
    a: "Mirketa's ServiceNow Managed Services include day-to-day platform administration, SLA-backed ticket response, semi-annual upgrade testing and deployment, 24×7 proactive instance monitoring, and a recurring continuous optimization cycle for your enhancement backlog.",
  },
  {
    q: "How fast will Mirketa respond to a critical ServiceNow incident?",
    a: "Response time depends on your SLA tier. Standard tier guarantees a 4-business-hour response, Priority tier guarantees 1 hour during extended coverage, and Mission-Critical tier guarantees a 15-minute response with 24×7×365 coverage.",
  },
  {
    q: "Do you handle ServiceNow's semi-annual upgrades for us?",
    a: "Yes. Upgrade and release management is a core part of every managed services engagement — we scope the release, test it against your specific customizations and integrations in a sub-production instance, and schedule deployment well before end-of-support deadlines.",
  },
  {
    q: "What is proactive instance monitoring and why does it matter?",
    a: "Proactive monitoring watches scheduled job queues, integration health, and performance metrics continuously so degradation is caught and resolved before it becomes a user-facing outage. It's the difference between finding out about a problem from a dashboard versus from an angry email.",
  },
  {
    q: "Can managed services start after we've already implemented ServiceNow ourselves?",
    a: "Absolutely. Most of our ServiceNow Managed Services engagements begin with an instance health check on a platform someone else built or implemented internally, so we can document existing customizations before taking on support responsibility.",
  },
  {
    q: "How is pricing structured for ServiceNow Managed Services?",
    a: "Pricing is tied to your chosen SLA tier — Standard, Priority, or Mission-Critical — and scales with ticket volume, coverage hours, and whether you need a shared admin pool or a dedicated named administrator.",
  },
  {
    q: "What's the difference between the Standard, Priority, and Mission-Critical tiers?",
    a: "The tiers differ across response time, coverage hours, and dedicated attention: Standard offers business-hours coverage from a shared admin pool, Priority adds a named admin with extended-hours coverage, and Mission-Critical provides a dedicated team with 24×7×365 proactive monitoring.",
  },
  {
    q: "Will we have a named ServiceNow admin, or a shared pool?",
    a: "That depends on tier. Standard tier is served by a shared pool of certified administrators, while Priority and Mission-Critical tiers include a named admin or dedicated team who stays consistent across every ticket and upgrade cycle.",
  },
  {
    q: "How do you handle enhancement requests that aren't emergencies?",
    a: "Non-urgent enhancement requests are logged into a managed backlog, prioritized against business impact, and scheduled into our continuous optimization cycle rather than left in an unattended queue.",
  },
  {
    q: "Do you provide reporting on instance health and SLA performance?",
    a: "Yes. Every ServiceNow Managed Services client receives monthly reporting covering SLA compliance, ticket trends, instance health metrics, and progress against the enhancement backlog.",
  },
];

const FINAL_CTA = {
  heading: "Ready for ServiceNow Managed Services You Can Actually Rely On?",
  description: "Partner with Mirketa to keep your ServiceNow instance healthy, current, and continuously optimized — or talk to a ServiceNow expert first about which SLA tier fits your team.",
  primaryCta: { label: "Schedule a Consultation", href: "#contact" },
  secondaryCta: { label: "Talk to a ServiceNow Expert", href: "#contact" },
};

const SEO = {
  title: "ServiceNow Managed Services & Support Partner | Mirketa",
  description:
    "Mirketa's ServiceNow Managed Services deliver SLA-backed admin support, upgrade management, and proactive instance monitoring to keep your Now Platform healthy.",
  canonical: "https://mirketa.us/servicenow-managed-services/",
  keywords: [
    "ServiceNow Managed Services",
    "ServiceNow Support Services",
    "ServiceNow Upgrade Management",
    "ServiceNow Instance Health Monitoring",
    "ServiceNow Admin Support",
    "ServiceNow SLA Support Tiers",
    "ServiceNow Proactive Monitoring",
    "ServiceNow Managed Support Partner",
    "ServiceNow Continuous Optimization",
    "ServiceNow Application Management",
    "ServiceNow 24x7 Support",
    "ServiceNow Release Management",
  ],
  ogTitle: "Keep Your ServiceNow Instance Healthy With Mirketa Managed Services",
  ogDescription:
    "SLA-backed support, semi-annual upgrade management, and 24×7 proactive monitoring for your live ServiceNow instance — from certified Mirketa administrators.",
  twitterTitle: "ServiceNow Managed Services — SLA-Backed Support From Mirketa",
  twitterDescription:
    "Admin support, upgrade management, and proactive instance monitoring for ServiceNow, delivered against defined SLAs by certified Mirketa engineers.",
  schema: [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "ServiceNow Managed Services",
      provider: { "@type": "Organization", name: "Mirketa Inc.", url: "https://mirketa.us" },
      name: "ServiceNow Managed Services & Support",
      description:
        "SLA-backed ServiceNow Managed Services covering day-to-day platform administration, semi-annual upgrade management, proactive instance monitoring, and continuous optimization.",
      areaServed: "Global",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://mirketa.us/" },
        { "@type": "ListItem", position: 2, name: "ServiceNow", item: "https://mirketa.us/servicenow/" },
        { "@type": "ListItem", position: 3, name: "Support & Managed Services", item: "https://mirketa.us/servicenow-managed-services/" },
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

export default function SupportManagedServices() {
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

      gsap.utils.toArray(".snms-reveal").forEach((el) => {
        gsap.from(el, {
          opacity: prefersReduced ? 1 : 0,
          y: prefersReduced ? 0 : 32,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      gsap.utils.toArray(".snms-reveal-left").forEach((el) => {
        gsap.from(el, {
          opacity: prefersReduced ? 1 : 0,
          x: prefersReduced ? 0 : -30,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      gsap.utils.toArray(".snms-reveal-right").forEach((el) => {
        gsap.from(el, {
          opacity: prefersReduced ? 1 : 0,
          x: prefersReduced ? 0 : 30,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      gsap.utils.toArray(".snms-reveal-stagger").forEach((el) => {
        gsap.from(el.children, {
          opacity: prefersReduced ? 1 : 0,
          y: prefersReduced ? 0 : 26,
          duration: 0.6,
          stagger: 0.06,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      gsap.utils.toArray(".snms-zoom-in").forEach((el) => {
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
    <div className="snms-page">
      <Seo {...SEO} />
      <HeroSection heroTextRef={heroTextRef} heroRef={heroRef} />
      <TrustedByMarquee label="Trusted by IT & Operations Leaders" />
      <OverviewSection />
      <ChallengesSection />
      <SolutionsSection />
      <SlaTiersSection />
      <BenefitsSection />
      <ProcessSection />
      <IndustriesSection />
      <WhyMirketaSection />
      <TechStackSection />
      <FaqSection />
      <FinalCtaSection />
      <ConsultationSection {...CONSULTATION} />
      <StickyCta heroRef={heroRef} label="Schedule a Consultation" />
    </div>
  );
}

// ============================================================
// HERO
// ============================================================

function HeroSection({ heroTextRef, heroRef }) {
  return (
    <section ref={heroRef} className="snms-hero" style={{ backgroundImage: `url("${Images.heroServiceNowSupportManagedServices}")` }} aria-label={HERO.title}>
      <div className="snms-hero__scrim" />
      <div className="container">
        <Breadcrumb items={BREADCRUMB_ITEMS} className="snms-breadcrumb" />
        <div className="snms-hero__inner">
          <div ref={heroTextRef} className="snms-hero__text">
            <span className="snms-badge">
              <span className="snms-badge__spark" aria-hidden="true">✦</span> {HERO.badge}
            </span>
            <h1>{HERO.title}</h1>
            <p className="snms-hero__description">{HERO.description}</p>
            <div className="snms-hero__ctas">
              <a href={HERO.primaryCta.href} className="btn btn-primary snms-btn">
                {HERO.primaryCta.label} <span aria-hidden="true">→</span>
              </a>
              <a href={HERO.secondaryCta.href} className="btn btn-secondary snms-btn">
                {HERO.secondaryCta.label}
              </a>
            </div>
            <ul className="snms-hero__metrics">
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
            className="snms-hero__visual snms-zoom-in"
          />
        </div>
      </div>
    </section>
  );
}

// ============================================================
// OVERVIEW
// ============================================================

function OverviewSection() {
  return (
    <section className="section snms-overview" aria-labelledby="snms-overview-heading">
      <div className="container snms-overview__inner">
        <div className="snms-reveal-left">
          <p className="snms-eyebrow">{OVERVIEW.eyebrow}</p>
          <h2 id="snms-overview-heading">{OVERVIEW.heading}</h2>
        </div>
        <div className="snms-overview__text snms-reveal-right">
          {OVERVIEW.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// CHALLENGES
// ============================================================

function ChallengesSection() {
  return (
    <section className="section snms-challenges" aria-labelledby="snms-challenges-heading">
      <div className="container">
        <div className="section-heading snms-reveal">
          <p className="snms-eyebrow">{CHALLENGES.eyebrow}</p>
          <h2 id="snms-challenges-heading">{CHALLENGES.heading}</h2>
          <p>{CHALLENGES.intro}</p>
        </div>
        <div className="snms-challenges__grid snms-reveal-stagger">
          {CHALLENGES.items.map((c) => (
            <div className="snms-challenge-card" key={c.title}>
              <span className="snms-challenge-card__icon">{c.icon}</span>
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
// SOLUTIONS
// ============================================================

function SolutionsSection() {
  return (
    <section className="section snms-solutions" aria-labelledby="snms-solutions-heading">
      <div className="container">
        <div className="section-heading snms-reveal">
          <p className="snms-eyebrow">{SOLUTIONS.eyebrow}</p>
          <h2 id="snms-solutions-heading">{SOLUTIONS.heading}</h2>
          <p>{SOLUTIONS.intro}</p>
        </div>
        <div className="snms-solutions__grid snms-reveal-stagger">
          {SOLUTIONS.items.map((s) => (
            <div className="snms-solution-card" key={s.title}>
              <span className="snms-solution-card__icon">{s.icon}</span>
              <h3>{s.title}</h3>
              <p>{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// SLA TIERS — real semantic table
// ============================================================

function SlaTiersSection() {
  return (
    <section className="section snms-sla" aria-labelledby="snms-sla-heading">
      <div className="container">
        <div className="snms-sla__head snms-reveal">
          <img src={Images.illoServicenowManagedSla} alt="" aria-hidden="true" className="snms-sla__illo" loading="lazy" />
          <div className="section-heading">
            <p className="snms-eyebrow">{SLA_TIERS.eyebrow}</p>
            <h2 id="snms-sla-heading">{SLA_TIERS.heading}</h2>
            <p>{SLA_TIERS.intro}</p>
          </div>
        </div>
        <div className="snms-sla__table-wrap snms-reveal">
          <table className="snms-sla__table">
            <caption className="visually-hidden">
              Comparison of Standard, Priority, and Mission-Critical ServiceNow Managed Services SLA tiers across response time, coverage hours, dedicated admin, and proactive monitoring.
            </caption>
            <thead>
              <tr>
                <th scope="col">SLA Criteria</th>
                {SLA_TIERS.columns.map((col) => (
                  <th scope="col" key={col}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SLA_TIERS.rows.map((row) => (
                <tr key={row.label}>
                  <th scope="row">{row.label}</th>
                  {row.values.map((v, i) => (
                    <td key={i}>{v}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// BENEFITS — metric-led tiles
// ============================================================

function BenefitsSection() {
  return (
    <section className="section snms-benefits" aria-labelledby="snms-benefits-heading">
      <div className="container">
        <div className="section-heading snms-reveal">
          <p className="snms-eyebrow">{BENEFITS.eyebrow}</p>
          <h2 id="snms-benefits-heading">{BENEFITS.heading}</h2>
          <p>{BENEFITS.intro}</p>
        </div>
        <div className="snms-benefits__grid snms-reveal-stagger">
          {BENEFITS.items.map((b) => (
            <div className="snms-benefit-tile" key={b.title}>
              <span className="snms-benefit-tile__stat">{b.stat}</span>
              <h3>{b.title}</h3>
              <p>{b.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// IMPLEMENTATION / ONBOARDING PROCESS
// ============================================================

function ProcessSection() {
  return (
    <section className="section snms-process" aria-labelledby="snms-process-heading">
      <div className="container">
        <div className="section-heading snms-reveal">
          <p className="snms-eyebrow">{PROCESS.eyebrow}</p>
          <h2 id="snms-process-heading">{PROCESS.heading}</h2>
          <p>{PROCESS.intro}</p>
        </div>
        <div className="snms-process__rail snms-reveal-stagger">
          {PROCESS.stages.map((p, i) => (
            <div className="snms-step-card" key={p.name}>
              <span className="snms-step-card__num">{String(i + 1).padStart(2, "0")}</span>
              <h3>{p.name}</h3>
              <p>{p.description}</p>
              {i < PROCESS.stages.length - 1 && <span className="snms-step-card__arrow" aria-hidden="true">→</span>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// INDUSTRIES
// ============================================================

function IndustriesSection() {
  return (
    <section className="section snms-industries" aria-labelledby="snms-industries-heading">
      <div className="container">
        <div className="section-heading snms-reveal">
          <p className="snms-eyebrow">{INDUSTRIES.eyebrow}</p>
          <h2 id="snms-industries-heading">{INDUSTRIES.heading}</h2>
          <p>{INDUSTRIES.intro}</p>
        </div>
        <div className="snms-industries__grid snms-reveal-stagger">
          {INDUSTRIES.items.map((n) => (
            <div className="snms-industry-card" key={n.title}>
              <span className="snms-industry-card__icon">{n.icon}</span>
              <h4>{n.title}</h4>
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
    <section className="section snms-why" aria-labelledby="snms-why-heading">
      <div className="container">
        <div className="section-heading snms-reveal">
          <p className="snms-eyebrow">{WHY_MIRKETA.eyebrow}</p>
          <h2 id="snms-why-heading">{WHY_MIRKETA.heading}</h2>
          <p>{WHY_MIRKETA.intro}</p>
        </div>
        <div className="snms-why__grid snms-reveal-stagger">
          {WHY_MIRKETA.items.map((w) => (
            <div className="snms-why-card" key={w.title}>
              <span className="snms-why-card__icon">{w.icon}</span>
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
// TECHNOLOGY STACK
// ============================================================

function TechStackSection() {
  return (
    <section className="section snms-stack" aria-labelledby="snms-stack-heading">
      <div className="container">
        <div className="section-heading snms-reveal">
          <p className="snms-eyebrow">{TECH_STACK.eyebrow}</p>
          <h2 id="snms-stack-heading">{TECH_STACK.heading}</h2>
          <p>{TECH_STACK.intro}</p>
        </div>
        <div className="snms-stack__grid snms-reveal-stagger">
          {TECH_STACK.items.map((t) => (
            <div className="snms-stack-chip" key={t.title}>
              <span className="snms-stack-chip__icon">{t.icon}</span>
              <div>
                <h4>{t.title}</h4>
                <p>{t.description}</p>
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
  return (
    <section className="section snms-faq" aria-labelledby="snms-faq-heading">
      <div className="container">
        <div className="section-heading snms-reveal">
          <p className="snms-eyebrow">FAQ</p>
          <h2 id="snms-faq-heading">Frequently Asked Questions About ServiceNow Managed Services</h2>
        </div>
        <FaqAccordion items={FAQS} className="snms-reveal" searchPlaceholder="Ask a question — e.g. &quot;SLA&quot;, &quot;upgrade&quot;, &quot;monitoring&quot;..." />
        <p className="snms-faq__links">
          Related reading: <Link to="/servicenow">ServiceNow Solutions</Link>,{" "}
          <Link to="/servicenow-consulting-development-services">ServiceNow Consulting & Development Services</Link>,{" "}
          <Link to="/servicenow-technology-workflows">ServiceNow Technology Workflows</Link>,{" "}
          <Link to="/servicenow-customer-workflows">ServiceNow Customer Workflows</Link>,{" "}
          <Link to="/servicenow-employee-workflows">ServiceNow Employee Workflows</Link>,{" "}
          <Link to="/servicenow-creator-workflows">ServiceNow Creator Workflows</Link>,{" "}
          <Link to="/oracle-premium-support-service">Oracle Premium Support Service</Link>,{" "}
          <Link to="/salesforce-consulting-development-services">Salesforce Development & Consulting</Link>,{" "}
          <Link to="/ai-consulting">AI Consulting</Link>.
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
    <section className="snms-final-cta snms-reveal" aria-labelledby="snms-final-cta-heading">
      <div className="container snms-final-cta__inner">
        <h2 id="snms-final-cta-heading">{FINAL_CTA.heading}</h2>
        <p>{FINAL_CTA.description}</p>
        <div className="snms-final-cta__ctas">
          <a href={FINAL_CTA.primaryCta.href} className="btn btn-primary snms-btn">
            {FINAL_CTA.primaryCta.label} <span aria-hidden="true">→</span>
          </a>
          <a href={FINAL_CTA.secondaryCta.href} className="btn btn-secondary snms-btn">
            {FINAL_CTA.secondaryCta.label}
          </a>
        </div>
      </div>
    </section>
  );
}
