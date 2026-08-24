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
import "./TechnologyWorkflows.css";

gsap.registerPlugin(ScrollTrigger);

// ============================================================
// ICONS
// ============================================================

const Ico = {
  check: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12.5l5 5L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  ticket: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 8a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 000 4v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2a2 2 0 000-4V8z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  cloud: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6.5 16.5A4.2 4.2 0 017 8.2 5.5 5.5 0 0117.5 9.5 3.7 3.7 0 0117 17H7" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></svg>
  ),
  map: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="6" r="2.4" stroke="currentColor" strokeWidth="1.4" /><circle cx="6" cy="18" r="2.4" stroke="currentColor" strokeWidth="1.4" /><circle cx="18" cy="18" r="2.4" stroke="currentColor" strokeWidth="1.4" /><path d="M12 8.4L7 16M12 8.4l5 7.6M8.4 18h7.2" stroke="currentColor" strokeWidth="1.3" /></svg>
  ),
  gear: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.4" /><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
  ),
  box: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 8l9-5 9 5-9 5-9-5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M3 8v8l9 5 9-5V8M12 13v8" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /></svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  eye: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.4" /></svg>
  ),
  chartUp: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 19V13M10 19V8M16 19v-5M20 19V5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
  ),
  bell: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 10a6 6 0 0112 0v4l1.5 2.5h-15L6 14v-4z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M9.5 19a2.5 2.5 0 005 0" stroke="currentColor" strokeWidth="1.4" /></svg>
  ),
  layers: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3l9 5-9 5-9-5 9-5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M3 12l9 5 9-5M3 16l9 5 9-5" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /></svg>
  ),
  compass: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" /><path d="M15 9l-2 6-6 2 2-6 6-2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
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
  bank: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 10l8-5 8 5M4 10v9M20 10v9M4 19h16M8 13v4M12 13v4M16 13v4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
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
  pulse: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 12h4l2-6 4 12 2-6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
};

// ============================================================
// DATA
// ============================================================

const CONSULTATION = {
  eyebrow: "Get Started",
  heading: "Schedule a Consultation",
  description: "Tell us about your ITSM, ITOM, or SecOps goals — a certified consultant will follow up within one business day.",
  formTitle: "Schedule a Free Consultation",
};

const BREADCRUMB_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Platforms & Technology", href: "/" },
  { label: "ServiceNow", href: "/platforms/servicenow" },
  { label: "Technology Workflows" },
];

const HERO = {
  badge: "ServiceNow ITSM & ITOM Implementation Partner",
  title: "ServiceNow Technology Workflows Implementation for Connected IT Operations",
  description:
    "Mirketa's ServiceNow Technology Workflows Implementation connects ITSM, ITOM, ITAM, and SecOps on one Now Platform instance — so incidents route automatically, dependencies are visible before something breaks, and IT and security teams stop duplicating effort during every outage.",
  primaryCta: { label: "Schedule a Consultation", href: "#contact" },
  secondaryCta: { label: "Talk to a ServiceNow Expert", href: "#contact" },
  stats: [
    { value: "98%", label: "SLA Compliance" },
    { value: "45%", label: "Avg Resolution" },
    { value: "1,240", label: "CIs Tracked" },
  ],
};

const HERO_DASHBOARD = {
  title: "IT Operations Command Center",
  stats: [
    { label: "SLA Compliance", value: "98%", caption: "Across all priority tiers" },
    { label: "Avg Resolution", value: "45%", caption: "Faster than legacy tooling" },
    { label: "CIs Tracked", value: "1,240", caption: "Live in the CMDB" },
  ],
  rows: [
    { title: "P2 incident — network switch failure", meta: "Auto-linked to CMDB · Routed to Network Ops", tone: "good", status: "Resolved" },
    { title: "Change request — firewall rule update", meta: "Risk-scored · Pending CAB approval", tone: "neutral", status: "In Review" },
    { title: "Vulnerability scan — exposed endpoint", meta: "SecOps · Linked to business service", tone: "attention", status: "Investigating" },
  ],
  floatingCards: [
    { icon: Ico.map, title: "1,240 CIs Tracked", subtitle: "Live CMDB accuracy" },
    { icon: Ico.shield, title: "SecOps Integrated", subtitle: "Same data model as ITSM" },
  ],
};

const OVERVIEW = {
  eyebrow: "Overview",
  heading: "What ServiceNow Technology Workflows Implementation Means in Practice",
  paragraphs: [
    "Most IT organizations run incident management, monitoring, asset tracking, and security response as separate tools that were never designed to talk to each other. An incident ticket doesn't know which server it depends on. A monitoring alert doesn't know if that server is already scheduled for a change. A security team investigating a vulnerability can't see which business service actually depends on the affected asset. ServiceNow Technology Workflows Implementation removes that fragmentation by putting IT Service Management (ITSM), IT Operations Management (ITOM), IT Asset Management (ITAM), and Security Operations (SecOps) on one shared data model.",
    "In practice, this means a single Configuration Management Database (CMDB) becomes the source of truth every other application reads from. When an incident is logged, it's automatically linked to the affected configuration item and every service that depends on it. When a monitoring tool detects an anomaly, ServiceNow can correlate it against known changes and open — or even auto-resolve — an incident before a human ever gets paged. When a vulnerability is discovered, SecOps can see instantly which assets and business services are actually exposed, instead of chasing down ownership through email.",
    "Mirketa configures this connected technology workflow around your existing service catalog, change process, and risk tolerance — not a generic out-of-the-box template. The result is IT operations that behave like one coordinated system instead of four disconnected tools bridged by tribal knowledge and spreadsheets.",
  ],
};

const CHALLENGES = {
  eyebrow: "Challenges",
  heading: "Why IT Operations Break Down Without Connected Technology Workflows",
  intro:
    "These are the four problems we see most often before a ServiceNow Technology Workflows Implementation — familiar to any IT organization running ITSM, monitoring, and security as separate, disconnected functions.",
  items: [
    {
      icon: Ico.ticket,
      title: "Disconnected Ticketing Tools With No Shared Visibility",
      description:
        "Incidents, problems, and changes live in separate systems or spreadsheets, so nobody has a single view of what's actually happening across the IT estate at any given moment.",
    },
    {
      icon: Ico.map,
      title: "No CMDB Means Nobody Knows What Depends on What",
      description:
        "Without an accurate, automatically maintained service map, a simple server restart can take down three business services nobody realized were connected to it.",
    },
    {
      icon: Ico.bell,
      title: "Reactive Firefighting Instead of Proactive Monitoring",
      description:
        "Issues surface only after users complain, because event and alert data isn't correlated against known changes or historical incident patterns in real time.",
    },
    {
      icon: Ico.shield,
      title: "Siloed IT and Security Teams Duplicating Effort",
      description:
        "During a real incident, IT operations and security teams work from separate tools and separate facts, wasting critical minutes reconciling what each side already knows.",
    },
  ],
};

const SOLUTIONS = {
  eyebrow: "Solutions",
  heading: "How Mirketa Configures ServiceNow to Fix Each Problem",
  intro:
    "Each challenge above maps to a specific configuration decision inside a ServiceNow Technology Workflows Implementation — not a generic module activation.",
  items: [
    {
      icon: Ico.layers,
      title: "One Connected Data Model Across ITSM, ITOM, and ITAM",
      description:
        "Incidents, problems, changes, and assets all reference the same CMDB records, so every ticket automatically carries the context of what it actually affects.",
    },
    {
      icon: Ico.map,
      title: "Automated CMDB Discovery and Service Mapping",
      description:
        "Discovery keeps your configuration items current automatically, while Service Mapping traces the real dependencies between infrastructure and the business services that rely on it.",
    },
    {
      icon: Ico.eye,
      title: "Event Correlation and Proactive Alerting",
      description:
        "ITOM correlates monitoring events against known changes and historical patterns, surfacing the real root cause and often resolving known issues before a ticket is even needed.",
    },
    {
      icon: Ico.shield,
      title: "SecOps Integrated Into the Same Instance",
      description:
        "Vulnerability response and security incident response run against the same CMDB and service map as ITSM, so security and operations teams work from one shared set of facts.",
    },
  ],
};

const FEATURES = {
  eyebrow: "Core Capabilities",
  heading: "The ServiceNow Modules Behind a Connected Technology Workflow",
  intro:
    "A ServiceNow Technology Workflows Implementation is built from a specific set of Now Platform applications, each configured to read from and write to the same operational data model.",
  items: [
    {
      icon: Ico.ticket,
      status: "Automated",
      title: "Incident & Problem Management",
      description:
        "Incidents are auto-categorized, prioritized by business impact, and routed to the right team based on the configuration items they actually affect — with problem management tracking root cause across recurring incidents.",
    },
    {
      icon: Ico.gear,
      status: "Risk-Scored",
      title: "Change Management",
      description:
        "Every change request is risk-scored against the CMDB before approval, and scheduled changes are visible to incident and event management so alerts can be automatically suppressed during known maintenance.",
    },
    {
      icon: Ico.map,
      status: "Real-Time",
      title: "CMDB & Service Mapping",
      description:
        "An always-current configuration database traces every dependency between infrastructure, applications, and the business services they support — the foundation every other Technology Workflows capability reads from.",
    },
    {
      icon: Ico.eye,
      status: "Real-Time",
      title: "IT Operations Management (ITOM)",
      description:
        "Event management correlates alerts from your existing monitoring tools, distinguishing real incidents from noise and often triggering automated remediation before anyone needs to get involved.",
    },
    {
      icon: Ico.box,
      status: "Automated",
      title: "IT Asset Management (ITAM)",
      description:
        "Hardware and software asset lifecycles are tracked from procurement through retirement, tying license compliance and asset cost directly back to the CMDB and the services those assets support.",
    },
    {
      icon: Ico.shield,
      status: "Connected",
      title: "Security Operations (SecOps) Integration",
      description:
        "Vulnerability response and security incident response run against the same configuration and service data as ITSM, so remediation is prioritized by actual business impact, not guesswork.",
    },
  ],
};

const BENEFITS = {
  eyebrow: "Benefits",
  heading: "What a Connected Technology Workflow Delivers",
  intro: "These are the outcomes clients report after moving ITSM, ITOM, ITAM, and SecOps onto one connected ServiceNow instance.",
  items: [
    { title: "Faster Incident Resolution", description: "Automated routing and CMDB context mean the right team gets the right information immediately, not after twenty minutes of triage." },
    { title: "Fewer Change-Related Outages", description: "Risk-scored changes and dependency visibility catch conflicts before they reach production." },
    { title: "Less Alert Noise", description: "Event correlation filters monitoring noise down to the alerts that actually represent a real, actionable problem." },
    { title: "Accurate, Living CMDB", description: "Automated discovery keeps your configuration data current, instead of a static spreadsheet nobody trusts." },
    { title: "Faster Security Response", description: "Vulnerability and incident response teams see business impact immediately instead of chasing down asset ownership." },
    { title: "Lower Audit and Compliance Risk", description: "IT asset and license data stays accurate and traceable, reducing the scramble before every audit cycle." },
  ],
};

const PROCESS = {
  eyebrow: "Implementation Process",
  heading: "A Six-Stage Path to ServiceNow Technology Workflows Implementation",
  intro:
    "Every ServiceNow Technology Workflows Implementation Mirketa delivers follows the same structured methodology — refined across ITSM, ITOM, and SecOps engagements in complex, multi-vendor IT environments.",
  stages: [
    { name: "Discovery & Assessment", description: "We map your current incident, change, and monitoring processes, and assess the state of your existing CMDB, if one exists." },
    { name: "CMDB & Service Mapping", description: "Discovery and Service Mapping are configured to build an accurate, automatically maintained view of your infrastructure and business services." },
    { name: "ITSM Configuration", description: "Incident, problem, and change management workflows are configured against your actual service catalog and approval structure — the core of a ServiceNow Technology Workflows Implementation." },
    { name: "Integration & Automation", description: "ITOM event correlation is connected to your existing monitoring tools, and SecOps is integrated so vulnerability data flows into the same CMDB." },
    { name: "Testing", description: "Workflows, routing rules, and event correlation logic are validated against real historical incident and change data before go-live." },
    { name: "Go-Live & Hypercare", description: "A supported cutover is followed by an elevated hypercare period, with our team monitoring incident volume and CMDB accuracy to resolve issues before they compound." },
  ],
};

const INDUSTRIES = {
  eyebrow: "Industry Expertise",
  heading: "Technology Workflows Experience Across Complex IT Environments",
  intro: "ITSM, ITOM, and SecOps configurations differ meaningfully by industry — our delivery teams bring domain context, not a one-size-fits-all template.",
  items: [
    { icon: Ico.bank, title: "Financial Services", description: "Change and incident processes built around regulatory change-control requirements." },
    { icon: Ico.shield, title: "Healthcare", description: "CMDB and asset tracking that account for clinical and patient-adjacent systems." },
    { icon: Ico.factory, title: "Manufacturing", description: "Service mapping that connects plant-floor systems to enterprise IT dependencies." },
    { icon: Ico.cart, title: "Retail & Consumer Goods", description: "High-availability incident response tuned to peak seasonal transaction volume." },
    { icon: Ico.chip, title: "Technology & SaaS", description: "Event correlation and SecOps integration built for fast-moving cloud-native infrastructure." },
    { icon: Ico.globe, title: "Public Sector", description: "ITSM and asset management aligned to government compliance and audit requirements." },
  ],
};

const WHY_MIRKETA = {
  eyebrow: "Why Mirketa",
  heading: "A ServiceNow Partner Fluent in IT Operations, Not Just ITSM",
  intro: "Activating ITSM modules is easy. Connecting them to a real CMDB, live monitoring, and security data is where engagements succeed or stall.",
  items: [
    { icon: Ico.award, title: "Certified ITSM & ITOM Consultants", description: "Every consultant on a Technology Workflows engagement holds active ServiceNow certifications in ITSM and ITOM." },
    { icon: Ico.compass, title: "CMDB-First Design Philosophy", description: "We build an accurate configuration model first, then configure ITSM, ITOM, and SecOps to read from it — not the other way around." },
    { icon: Ico.robot, title: "AI-Ready From Day One", description: "Predictive intelligence and event correlation are built into the instance from the start, not bolted on later." },
    { icon: Ico.shield, title: "Post Go-Live Support", description: "A dedicated managed services team keeps CMDB accuracy, routing rules, and event correlation healthy long after launch." },
  ],
};

const TECH_STACK = {
  eyebrow: "Technology Stack",
  heading: "The Now Platform Applications We Configure",
  intro: "A ServiceNow Technology Workflows Implementation draws on this specific set of applications, each mapped to a role in the connected operational model.",
  items: [
    { icon: Ico.ticket, label: "ITSM" },
    { icon: Ico.eye, label: "ITOM" },
    { icon: Ico.box, label: "ITAM" },
    { icon: Ico.shield, label: "SecOps" },
    { icon: Ico.map, label: "Discovery" },
    { icon: Ico.bell, label: "Event Management" },
    { icon: Ico.pulse, label: "Performance Analytics" },
  ],
};

const FAQS = [
  {
    q: "What is ServiceNow Technology Workflows Implementation?",
    a: "ServiceNow Technology Workflows Implementation is the process of configuring IT Service Management (ITSM), IT Operations Management (ITOM), IT Asset Management (ITAM), and Security Operations (SecOps) on the Now Platform to share one CMDB and operational data model — so incidents, monitoring, assets, and security all work from the same connected view of your IT estate.",
  },
  {
    q: "What is a CMDB and why does it matter for ITSM?",
    a: "A Configuration Management Database (CMDB) is the record of every IT asset and the dependencies between them. Without an accurate CMDB, incident and change management can't reliably tell you what a given issue actually affects — which is why CMDB and Service Mapping configuration is the foundation of any serious ServiceNow Technology Workflows Implementation.",
  },
  {
    q: "How long does a ServiceNow Technology Workflows Implementation take?",
    a: "A focused ITSM-only implementation typically takes 8–12 weeks. Adding CMDB, ITOM event correlation, and SecOps integration extends a typical engagement to 5–9 months, depending on the size of your infrastructure and the number of monitoring tools being connected.",
  },
  {
    q: "Can Mirketa integrate ServiceNow with our existing monitoring tools?",
    a: "Yes. We connect ITOM event management to your existing monitoring stack using Integration Hub and REST APIs, so alerts flow into ServiceNow for correlation without replacing the monitoring tools your teams already trust.",
  },
  {
    q: "Do we need ITAM if we already have an asset spreadsheet?",
    a: "A spreadsheet can't automatically update itself as your infrastructure changes, and it can't connect asset data to incidents, changes, or license compliance in real time. ITAM configured against a live CMDB replaces that manual tracking with data your other Technology Workflows applications can actually use.",
  },
  {
    q: "How does SecOps fit into ServiceNow Technology Workflows?",
    a: "SecOps runs vulnerability response and security incident response against the same CMDB and service map used by ITSM and ITOM, so security teams can see the real business impact of a vulnerability or breach instead of working from a separate, disconnected security tool.",
  },
  {
    q: "Do you provide managed support after the Technology Workflows go-live?",
    a: "Yes. Every implementation can transition into an ongoing managed services engagement covering CMDB maintenance, event correlation tuning, and SLA-backed support with a dedicated team.",
  },
  {
    q: "Are Mirketa's ServiceNow consultants certified in ITSM and ITOM?",
    a: "Yes. Every consultant assigned to a Technology Workflows engagement holds active ServiceNow certifications specific to ITSM, ITOM, or the relevant module, backed by a verified delivery track record.",
  },
];

const FINAL_CTA = {
  heading: "Start Your ServiceNow Technology Workflows Implementation Today",
  description:
    "Partner with Mirketa's certified ITSM and ITOM consultants to connect incident management, monitoring, assets, and security into one system — or speak with a ServiceNow expert before you commit to a scope.",
  primaryCta: { label: "Schedule a Consultation", href: "#contact" },
  secondaryCta: { label: "Talk to a ServiceNow Expert", href: "#contact" },
};

const SEO = {
  title: "ServiceNow Technology Workflows Implementation | Mirketa",
  description:
    "Mirketa delivers ServiceNow Technology Workflows Implementation — connecting ITSM, ITOM, ITAM, and SecOps into one system for faster incident resolution.",
  canonical: "https://mirketa.us/servicenow-technology-workflows/",
  keywords: [
    "ServiceNow Technology Workflows Implementation",
    "ServiceNow ITSM Implementation",
    "ServiceNow ITOM Consulting",
    "ServiceNow ITAM",
    "ServiceNow SecOps Integration",
    "ServiceNow CMDB Service Mapping",
    "ServiceNow Incident Management",
    "ServiceNow Change Management",
    "ServiceNow Event Management",
    "Now Platform IT Operations",
    "ServiceNow Discovery Configuration",
    "ServiceNow Security Operations",
  ],
  ogTitle: "ServiceNow Technology Workflows Implementation Services",
  ogDescription:
    "Connect ITSM, ITOM, ITAM, and SecOps into one ServiceNow instance — Mirketa's certified consultants make IT operations work like one system.",
  twitterTitle: "ServiceNow ITSM & ITOM Implementation | Mirketa",
  twitterDescription:
    "See how Mirketa implements ServiceNow Technology Workflows — CMDB, incident management, event correlation, and security operations in one connected system.",
  schema: [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "ServiceNow Technology Workflows Implementation",
      provider: { "@type": "Organization", name: "Mirketa Inc.", url: "https://mirketa.us" },
      name: "ServiceNow Technology Workflows Implementation",
      description:
        "ServiceNow ITSM, ITOM, ITAM, and SecOps implementation connecting incident management, monitoring, assets, and security into one system for faster IT operations.",
      areaServed: "Global",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://mirketa.us/" },
        { "@type": "ListItem", position: 2, name: "ServiceNow", item: "https://mirketa.us/servicenow/" },
        { "@type": "ListItem", position: 3, name: "Technology Workflows", item: "https://mirketa.us/servicenow-technology-workflows/" },
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

export default function TechnologyWorkflows() {
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

      gsap.utils.toArray(".sntw-reveal").forEach((el) => {
        gsap.from(el, {
          opacity: prefersReduced ? 1 : 0,
          y: prefersReduced ? 0 : 32,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      gsap.utils.toArray(".sntw-reveal-left").forEach((el) => {
        gsap.from(el, {
          opacity: prefersReduced ? 1 : 0,
          x: prefersReduced ? 0 : -30,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      gsap.utils.toArray(".sntw-reveal-right").forEach((el) => {
        gsap.from(el, {
          opacity: prefersReduced ? 1 : 0,
          x: prefersReduced ? 0 : 30,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      gsap.utils.toArray(".sntw-reveal-stagger").forEach((el) => {
        gsap.from(el.children, {
          opacity: prefersReduced ? 1 : 0,
          y: prefersReduced ? 0 : 26,
          duration: 0.6,
          stagger: 0.06,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      gsap.utils.toArray(".sntw-zoom-in").forEach((el) => {
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
    <div className="technology-workflows">
      <Seo {...SEO} />
      <HeroSection heroTextRef={heroTextRef} heroRef={heroRef} />
      <TrustedByMarquee label="Trusted by Enterprise IT Operations Teams" />
      <OverviewSection />
      <ChallengesSection />
      <SolutionsSection />
      <FeaturesSection />
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
    <section ref={heroRef} className="sntw-hero" style={{ backgroundImage: `url("${Images.heroServiceNowTechnologyWorkflows}")` }} aria-label={HERO.title}>
      <div className="sntw-hero__scrim" />
      <div className="container">
        <Breadcrumb items={BREADCRUMB_ITEMS} className="sntw-breadcrumb" />
        <div className="sntw-hero__inner">
          <div ref={heroTextRef} className="sntw-hero__text">
            <span className="sntw-badge">
              <span className="sntw-badge__spark" aria-hidden="true">✦</span> {HERO.badge}
            </span>
            <h1>{HERO.title}</h1>
            <p className="sntw-hero__description">{HERO.description}</p>
            <div className="sntw-hero__ctas">
              <a href={HERO.primaryCta.href} className="btn btn-primary sntw-btn">
                {HERO.primaryCta.label} <span aria-hidden="true">→</span>
              </a>
              <a href={HERO.secondaryCta.href} className="btn btn-secondary sntw-btn">
                {HERO.secondaryCta.label}
              </a>
            </div>
          </div>

          <HeroVisual
            dashboardTitle={HERO_DASHBOARD.title}
            stats={HERO_DASHBOARD.stats}
            rows={HERO_DASHBOARD.rows}
            floatingCards={HERO_DASHBOARD.floatingCards}
            className="sntw-hero__visual sntw-zoom-in"
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
    <section className="section sntw-overview" aria-labelledby="sntw-overview-heading">
      <div className="container">
        <div className="section-heading sntw-reveal">
          <p className="sntw-eyebrow">{OVERVIEW.eyebrow}</p>
          <h2 id="sntw-overview-heading">{OVERVIEW.heading}</h2>
        </div>
        <div className="sntw-overview__grid sntw-reveal-stagger">
          {OVERVIEW.paragraphs.map((p, i) => (
            <p className="sntw-overview__text" key={i}>{p}</p>
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
    <section className="section sntw-challenges" aria-labelledby="sntw-challenges-heading">
      <div className="container">
        <div className="section-heading sntw-reveal">
          <p className="sntw-eyebrow">{CHALLENGES.eyebrow}</p>
          <h2 id="sntw-challenges-heading">{CHALLENGES.heading}</h2>
          <p>{CHALLENGES.intro}</p>
        </div>
        <div className="sntw-challenges__grid sntw-reveal-stagger">
          {CHALLENGES.items.map((c) => (
            <div className="sntw-challenge-card" key={c.title}>
              <span className="sntw-challenge-card__icon">{c.icon}</span>
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
    <section className="section sntw-solutions" aria-labelledby="sntw-solutions-heading">
      <div className="container">
        <div className="section-heading sntw-reveal">
          <p className="sntw-eyebrow">{SOLUTIONS.eyebrow}</p>
          <h2 id="sntw-solutions-heading">{SOLUTIONS.heading}</h2>
          <p>{SOLUTIONS.intro}</p>
        </div>
        <div className="sntw-solutions__grid sntw-reveal-stagger">
          {SOLUTIONS.items.map((s) => (
            <div className="sntw-solution-card" key={s.title}>
              <span className="sntw-solution-card__icon">{s.icon}</span>
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
// FEATURES — monitoring dashboard-tile grid
// ============================================================

function FeaturesSection() {
  return (
    <section className="section sntw-features" aria-labelledby="sntw-features-heading">
      <div className="container">
        <div className="section-heading sntw-reveal">
          <p className="sntw-eyebrow">{FEATURES.eyebrow}</p>
          <h2 id="sntw-features-heading">{FEATURES.heading}</h2>
          <p>{FEATURES.intro}</p>
        </div>
        <div className="sntw-features__grid sntw-reveal-stagger">
          {FEATURES.items.map((f) => (
            <div className="sntw-feature-tile" key={f.title}>
              <div className="sntw-feature-tile__head">
                <span className="sntw-feature-tile__icon">{f.icon}</span>
                <span className="sntw-feature-tile__status">
                  <span className="sntw-feature-tile__dot" aria-hidden="true" /> {f.status}
                </span>
              </div>
              <h3>{f.title}</h3>
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
    <section className="section sntw-benefits" aria-labelledby="sntw-benefits-heading">
      <div className="container">
        <div className="section-heading sntw-reveal">
          <p className="sntw-eyebrow">{BENEFITS.eyebrow}</p>
          <h2 id="sntw-benefits-heading">{BENEFITS.heading}</h2>
          <p>{BENEFITS.intro}</p>
        </div>
        <div className="sntw-benefits__grid sntw-reveal-stagger">
          {BENEFITS.items.map((b) => (
            <div className="sntw-benefit-item" key={b.title}>
              <span aria-hidden="true">{Ico.check}</span>
              <div>
                <h4>{b.title}</h4>
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
// IMPLEMENTATION PROCESS — segmented horizontal progress bar
// ============================================================

function ProcessSection() {
  return (
    <section className="section sntw-process" aria-labelledby="sntw-process-heading">
      <div className="container">
        <div className="section-heading sntw-reveal">
          <p className="sntw-eyebrow">{PROCESS.eyebrow}</p>
          <h2 id="sntw-process-heading">{PROCESS.heading}</h2>
          <p>{PROCESS.intro}</p>
        </div>
        <div className="sntw-process__bar" aria-hidden="true">
          {PROCESS.stages.map((s) => (
            <span key={s.name} />
          ))}
        </div>
        <div className="sntw-process__grid sntw-reveal-stagger">
          {PROCESS.stages.map((p, i) => (
            <div className="sntw-process-card" key={p.name}>
              <span className="sntw-process-card__num">{i + 1}</span>
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
// INDUSTRIES
// ============================================================

function IndustriesSection() {
  return (
    <section className="section sntw-industries" aria-labelledby="sntw-industries-heading">
      <div className="container">
        <div className="section-heading sntw-reveal">
          <p className="sntw-eyebrow">{INDUSTRIES.eyebrow}</p>
          <h2 id="sntw-industries-heading">{INDUSTRIES.heading}</h2>
          <p>{INDUSTRIES.intro}</p>
        </div>
        <div className="sntw-industries__grid sntw-reveal-stagger">
          {INDUSTRIES.items.map((n) => (
            <div className="sntw-industry-card" key={n.title}>
              <span className="sntw-industry-card__icon">{n.icon}</span>
              <h4>{n.title}</h4>
              <p>{n.description}</p>
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
    <section className="section sntw-why" aria-labelledby="sntw-why-heading">
      <div className="container">
        <div className="section-heading sntw-reveal">
          <p className="sntw-eyebrow">{WHY_MIRKETA.eyebrow}</p>
          <h2 id="sntw-why-heading">{WHY_MIRKETA.heading}</h2>
          <p>{WHY_MIRKETA.intro}</p>
        </div>
        <div className="sntw-why__grid sntw-reveal-stagger">
          {WHY_MIRKETA.items.map((w) => (
            <div className="sntw-why-card" key={w.title}>
              <span className="sntw-why-card__icon">{w.icon}</span>
              <h4>{w.title}</h4>
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
    <section className="section sntw-stack" aria-labelledby="sntw-stack-heading">
      <div className="container">
        <div className="section-heading sntw-reveal">
          <p className="sntw-eyebrow">{TECH_STACK.eyebrow}</p>
          <h2 id="sntw-stack-heading">{TECH_STACK.heading}</h2>
          <p>{TECH_STACK.intro}</p>
        </div>
        <div className="sntw-stack__grid sntw-reveal-stagger">
          {TECH_STACK.items.map((t) => (
            <div className="sntw-stack-chip" key={t.label}>
              <span className="sntw-stack-chip__icon">{t.icon}</span>
              <span className="sntw-stack-chip__label">{t.label}</span>
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
    <section className="section sntw-faq" aria-labelledby="sntw-faq-heading">
      <div className="container">
        <div className="section-heading sntw-reveal">
          <p className="sntw-eyebrow">FAQ</p>
          <h2 id="sntw-faq-heading">Frequently Asked Questions About ServiceNow Technology Workflows Implementation</h2>
        </div>
        <FaqAccordion items={FAQS} className="sntw-reveal" searchPlaceholder="Ask a question — e.g. &quot;CMDB&quot;, &quot;ITOM&quot;, &quot;SecOps&quot;..." />
        <p className="sntw-faq__links">
          Related reading: <Link to="/platforms/servicenow">ServiceNow Solutions</Link>,{" "}
          <Link to="/platforms/servicenow/consulting-development-services">ServiceNow Consulting &amp; Development Services</Link>,{" "}
          <Link to="/platforms/servicenow/customer-workflows">ServiceNow Customer Workflows</Link>,{" "}
          <Link to="/platforms/servicenow/employee-workflows">ServiceNow Employee Workflows</Link>,{" "}
          <Link to="/platforms/servicenow/creator-workflows">ServiceNow Creator Workflows</Link>,{" "}
          <Link to="/platforms/servicenow/support-managed-services">ServiceNow Managed Services</Link>,{" "}
          <Link to="/platforms/oracle/fusion-implementation">Oracle Fusion Applications Implementation</Link>,{" "}
          <Link to="/platforms/oracle/premium-support-service">Oracle Premium Support Service</Link>,{" "}
          <Link to="/platforms/salesforce/development-consulting">Salesforce Development &amp; Consulting</Link>,{" "}
          <Link to="/platforms/salesforce/clouds">Salesforce Clouds</Link>,{" "}
          <Link to="/ai-consulting">AI Consulting</Link>, and{" "}
          <Link to="/data-cloud">Salesforce Data Cloud</Link>.
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
    <section className="sntw-final-cta sntw-reveal" aria-labelledby="sntw-final-cta-heading">
      <div className="container sntw-final-cta__inner">
        <h2 id="sntw-final-cta-heading">{FINAL_CTA.heading}</h2>
        <p>{FINAL_CTA.description}</p>
        <div className="sntw-final-cta__ctas">
          <a href={FINAL_CTA.primaryCta.href} className="btn btn-primary sntw-btn">
            {FINAL_CTA.primaryCta.label} <span aria-hidden="true">→</span>
          </a>
          <a href={FINAL_CTA.secondaryCta.href} className="btn btn-secondary sntw-btn">
            {FINAL_CTA.secondaryCta.label}
          </a>
        </div>
      </div>
    </section>
  );
}
