import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Images } from "../../../assets/images/index.js";
import Seo from "../../../components/Seo/Seo.jsx";
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb.jsx";
import ConsultationSection from "../../../components/ConsultationSection/ConsultationSection.jsx";
import "./ManagedServices.css";

gsap.registerPlugin(ScrollTrigger);

// ============================================================
// ICONS
// ============================================================

const Ico = {
  check: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12.5l5 5L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  dollar: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.4" /><path d="M12 7v10M15 9.5c0-1.4-1.3-2.5-3-2.5s-3 1-3 2.3c0 3 6 1.5 6 4.5 0 1.3-1.3 2.4-3 2.4s-3-1.1-3-2.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
  ),
  clock: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" /><path d="M12 7v5l4 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  award: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="8" r="5" stroke="currentColor" strokeWidth="1.4" /><path d="M8.5 12.5L7 21l5-2.5L17 21l-1.5-8.5" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  scale: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3v18M6 7l-3 6a3 3 0 006 0l-3-6zm12 0l-3 6a3 3 0 006 0l-3-6z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M4 21h16M6 7h6M18 7h-6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
  ),
  loop: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 12a8 8 0 0113.6-5.7M20 12a8 8 0 01-13.6 5.7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><path d="M17.5 3.5v3.4h-3.4M6.5 20.5v-3.4h3.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  target: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.4" /><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.3" opacity="0.6" /><circle cx="12" cy="12" r="1.2" fill="currentColor" /></svg>
  ),
  headset: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 13a8 8 0 0116 0v4" stroke="currentColor" strokeWidth="1.5" /><rect x="3" y="13" width="4" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4" /><rect x="17" y="13" width="4" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4" /></svg>
  ),
  wrench: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M14.7 6.3a4 4 0 00-5.4 5.4L4 17l3 3 5.3-5.3a4 4 0 005.4-5.4l-2 2-2.7-.7-.7-2.7z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  document: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 3h9l3 3v15H6z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M9 10h6M9 14h6M9 18h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  building: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="5" y="3" width="14" height="18" rx="1.5" stroke="currentColor" strokeWidth="1.4" /><path d="M9 8h1M14 8h1M9 12h1M14 12h1M9 16h1M14 16h1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
  ),
  globe: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.4" /><path d="M3 12h18M12 3c2.5 2.5 3.5 6 3.5 9s-1 6.5-3.5 9c-2.5-2.5-3.5-6-3.5-9s1-6.5 3.5-9z" stroke="currentColor" strokeWidth="1.3" /></svg>
  ),
  receipt: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 3h12v17l-2-1.3L14 20l-2-1.3L10 20l-2-1.3L6 20V3z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /><path d="M9 8h6M9 12h6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
  ),
  layers: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3l9 5-9 5-9-5 9-5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M3 12l9 5 9-5M3 16l9 5 9-5" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /></svg>
  ),
  gear: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.4" /><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
  ),
  code: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 8l-5 4 5 4M15 8l5 4-5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  eye: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.4" /></svg>
  ),
  book: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 5.5C4 4.7 4.7 4 5.5 4H12v16H5.5c-.8 0-1.5-.7-1.5-1.5v-13z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M20 5.5c0-.8-.7-1.5-1.5-1.5H12v16h6.5c.8 0 1.5-.7 1.5-1.5v-13z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  chartUp: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 19V13M10 19V8M16 19v-5M20 19V5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
  ),
  users: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="9" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.4" /><path d="M3.5 19c.6-3.4 2.9-5.2 5.5-5.2s4.9 1.8 5.5 5.2" stroke="currentColor" strokeWidth="1.4" /><circle cx="17" cy="9" r="2.6" stroke="currentColor" strokeWidth="1.3" opacity="0.7" /><path d="M15.5 13.4c2.2.3 3.7 1.9 4 4.6" stroke="currentColor" strokeWidth="1.3" opacity="0.7" /></svg>
  ),
  truck: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 7h11v9H3zM14 11h4l3 3v2h-7z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><circle cx="7" cy="19" r="1.6" stroke="currentColor" strokeWidth="1.3" /><circle cx="17.5" cy="19" r="1.6" stroke="currentColor" strokeWidth="1.3" /></svg>
  ),
  compass: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" /><path d="M15 9l-2 6-6 2 2-6 6-2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  rocket: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 2c3 2 5 6 5 10 0 2-1 4-2 5l-3-1-3 1c-1-1-2-3-2-5 0-4 2-8 5-10z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M9 15l-3 3M15 15l3 3M10 10h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
  ),
  sparkle: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /></svg>
  ),
  quote: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 9c-2 0-3.5 1.6-3.5 3.6 0 2 1.5 3.4 3.3 3.4.3 2.4-1.2 3.9-3.3 4.4v1.3c3.4-.4 5.7-2.8 5.7-6.3V9H7zm10 0c-2 0-3.5 1.6-3.5 3.6 0 2 1.5 3.4 3.3 3.4.3 2.4-1.2 3.9-3.3 4.4v1.3c3.4-.4 5.7-2.8 5.7-6.3V9H17z" fill="currentColor" /></svg>
  ),
  star: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.5l2.9 6 6.6.6-5 4.4 1.5 6.5L12 16.8l-5.9 3.2 1.5-6.5-5-4.4 6.6-.6L12 2.5z" /></svg>
  ),
};

// ============================================================
// DATA
// ============================================================

const BREADCRUMB = [
  { label: "Home", href: "/" },
  { label: "Platforms & Technology", href: "/" },
  { label: "Oracle Managed Services" },
];

const HERO = {
  title: "Keep Oracle Fusion Running Flawlessly at a Fraction of the Cost",
  description:
    "Mirketa delivers SLA-backed Oracle Fusion managed support for Cloud ERP, HCM, CX, EPM, and SCM. Our onshore–offshore model gives you local-time responsiveness for critical issues and offshore execution for enhancements — driving 30–50% cost savings versus a fully onshore team.",
  cta: { label: "Talk to Managed Services", href: "#contact" },
  stats: [
    { value: "100+", label: "Satisfied Clients" },
    { value: "2M+", label: "Hours Cloud Experience" },
    { value: "1,000+", label: "Successful Projects" },
    { value: "9.6", label: "CSAT Score" },
  ],
};

const DASHBOARD = {
  title: "Oracle Fusion Support Dashboard",
  stats: [
    { label: "P1 RESPONSE", value: "1hr", caption: "SLA target" },
    { label: "SLA ADHERENCE", value: "99.2%", caption: "This month" },
    { label: "OPEN TICKETS", value: "14", caption: "3 P1/P2, 11 P3/P4" },
    { label: "CSAT", value: "9.6", caption: "Rolling 90-day" },
  ],
  tickets: [
    { title: "ERP P2P reconciliation error", meta: "ERP · Assigned: Onshore · 42min ago", status: "Active" },
    { title: "HCM payroll integration failure", meta: "HCM · Assigned: Onshore · 1hr 18min ago", status: "Resolved" },
    { title: "EPM planning rule enhancement", meta: "EPM · Assigned: Offshore · Sprint Q3", status: "In Sprint" },
  ],
};

const TRUST_BADGES = ["Oracle Partner Network", "Oracle Cloud ERP Certified", "Oracle HCM Specialists", "Oracle Integration Cloud", "SOX & HIPAA Ready"];

const WHY_MIRKETA_1 = {
  eyebrow: "Why Mirketa",
  heading: "Why Oracle Managed Services from Mirketa?",
  intro: "Most Oracle Fusion teams are stretched thin handling support, quarterly updates, enhancements, and governance all at once. Mirketa's managed support model takes that weight off your team without adding headcount.",
  items: [
    { icon: Ico.dollar, title: "Lower Total Cost of Ownership", description: "Shift routine support and enhancements offshore while keeping critical incident response onshore. Mirketa clients typically reduce run costs by 30–50% compared to a fully onshore team — without sacrificing quality or SLA adherence." },
    { icon: Ico.clock, title: "Always-On Coverage", description: "Our follow-the-sun model ensures local-time coverage for P1/P2 critical incidents and overnight progress on non-critical tickets. Your Oracle Fusion environment is monitored and supported around the clock, every day of the year." },
    { icon: Ico.users, title: "Skills on Demand", description: "Access certified Oracle Fusion developers and functional consultants across ERP, HCM, CX, EPM, and SCM — plus OIC integration specialists and OTBI/BIP reporting experts — without the hiring timeline or retention overhead." },
    { icon: Ico.scale, title: "Capacity Flexibility", description: "Scale sprints and squads up or down based on release peaks, quarter close, payroll cycles, or seasonal demand without hiring delays. Add flex capacity for peak periods and scale back during quieter months." },
    { icon: Ico.loop, title: "Release Readiness", description: "Quarterly Oracle Fusion updates are handled end-to-end: impact analysis, automated regression testing, defect management, change enablement for users, and go-live runbooks. No surprises, no disruptions." },
    { icon: Ico.target, title: "Outcome-Driven Governance", description: "We link enhancement backlogs to your KPIs — close cycle time, DSO, time-to-hire, forecast accuracy, OTIF — and show value in monthly scorecards. Transparent governance means you always know what you're getting." },
  ],
};

const INCLUDED = {
  eyebrow: "What's Included",
  heading: "Everything Your Oracle Fusion Team Needs",
  intro: "Four service pillars that cover the full lifecycle of Oracle Fusion operations — from day-to-day user support to quarterly release management.",
  items: [
    {
      icon: Ico.headset,
      title: "End-User Support (L1–L3)",
      points: [
        "L1 triage, knowledge base, and guided resolution for common tasks",
        "L2 functional support for configuration and process issues",
        "L3 technical support for integrations (OIC/APIs), extensions (VBCS/APEX), and reporting (OTBI/BIP/Smart View)",
        "Dedicated support portal with SLA tracking and audit trail",
      ],
    },
    {
      icon: Ico.wrench,
      title: "Enhancements & Minor Projects",
      points: [
        "UX tweaks, page composer changes, approval rules, and workflows",
        "New reports/dashboards, data loads, and FBIs",
        "Integrations and automations across HCM ↔ ERP ↔ EPM ↔ CX ↔ SCM",
        "Sprint-based delivery with backlog grooming and prioritization",
      ],
    },
    {
      icon: Ico.document,
      title: "Release & Change Management",
      points: [
        "Sandbox strategy and quarterly Oracle update impact assessment",
        "Test plan and automated regression packs; defect management",
        "Go-live runbooks, cutover planning, and hypercare support",
        "Change enablement communications for end users",
      ],
    },
    {
      icon: Ico.shield,
      title: "Governance & Quality",
      points: [
        "Backlog grooming and sprint planning with your stakeholders",
        "SLA tracking (response/resolve), CSAT, and KPI scorecards",
        "CAB/architecture guardrails and security reviews",
        "Role design, SoD reviews, audit support, and PII safeguards",
      ],
    },
  ],
};

const DELIVERY = {
  eyebrow: "Delivery Model",
  heading: "Our Onshore–Offshore Support Model",
  intro: "The right person for the right task — at the right cost. Critical issues get local-time attention; enhancement work runs efficiently offshore.",
  teams: [
    {
      icon: Ico.building,
      title: "Onshore Team",
      subtitle: "Critical Response & Client Governance",
      description: "Your onshore consultants are your first point of contact for P1/P2 incidents, executive stakeholder communication, and governance oversight. They operate in your timezone.",
      points: [
        "P1/P2 incident response within SLA",
        "Client relationship and escalation management",
        "Sprint planning and backlog prioritization",
        "Architecture decisions and change advisory",
        "Monthly KPI scorecard reviews",
      ],
    },
    {
      icon: Ico.globe,
      title: "Offshore Team",
      subtitle: "Enhancements, Development & Scale",
      description: "Your offshore pod handles the volume work — enhancements, development, testing, reporting, and integrations overnight and at scale, driving the cost efficiency of the model.",
      points: [
        "P3/P4 ticket resolution and enhancements",
        "OIC integration development and monitoring",
        "OTBI/BIP/Smart View report builds",
        "Automated regression test execution",
        "VBCS/APEX extension development",
      ],
    },
  ],
};

const TOOLING = {
  eyebrow: "Tooling & Ways of Working",
  heading: "Enterprise-Grade Tooling",
  intro: "Enterprise-grade tooling for intake, testing, CI/CD, observability, and knowledge management.",
  items: [
    { icon: Ico.receipt, title: "ITSM", description: "ServiceNow / Jira for intake, SLAs, and audit trail" },
    { icon: Ico.check, title: "Testing", description: "Automated regression packs; reusable scripts per release" },
    { icon: Ico.code, title: "CI/CD", description: "Version control and pipelines for OIC, VBCS/APEX, reports" },
    { icon: Ico.eye, title: "Observability", description: "Integration monitors, failure alerts, performance dashboards" },
    { icon: Ico.book, title: "Knowledge", description: "Playbooks, SOPs, user guides, KEDB for recurrent fixes" },
  ],
};

const PILLAR_COVERAGE = {
  eyebrow: "Pillar Coverage",
  heading: "Example Scope by Oracle Cloud Pillar",
  intro: "Cross-pillar depth under one roof — ERP, HCM, CX, EPM, and SCM plus OIC integrations and analytics.",
  columns: [
    { icon: Ico.dollar, title: "ERP", points: ["Close support & reconciliations", "P2P/O2C process fixes", "Financial reports & tax updates", "Subledger accounting rules"] },
    { icon: Ico.users, title: "HCM", points: ["Journeys & Time/Absence", "Payroll integrations", "Role audits & SoD", "Talent & performance flows"] },
    { icon: Ico.headset, title: "CX", points: ["CPQ rules & lead-to-order", "Service SLAs & queues", "Campaign reporting", "Sales quota & territory"] },
    { icon: Ico.chartUp, title: "EPM", points: ["Planning cycles & close calendar", "Rule tuning & calc scripts", "Narrative reporting", "Consolidation & eliminations"] },
    { icon: Ico.truck, title: "SCM", points: ["Planning simulations", "OM orchestration", "WMS integrations", "Inventory & OTIF reporting"] },
  ],
};

const PROCESS = {
  eyebrow: "How We Work",
  heading: "From Discovery to Steady-State Support in 5 Steps",
  steps: [
    { icon: Ico.compass, name: "Discovery & Scoping", description: "We assess your Oracle Fusion environment, backlog, SLA requirements, and team structure." },
    { icon: Ico.gear, name: "Model Design", description: "We propose the optimal onshore–offshore mix aligned to your KPIs and risk profile." },
    { icon: Ico.rocket, name: "Onboarding", description: "Environment documentation, playbooks, ITSM setup, and knowledge transfer in 2–4 weeks." },
    { icon: Ico.shield, name: "Steady-State Support", description: "Your dedicated pod handles L1–L3 tickets, release readiness, enhancements, and governance." },
    { icon: Ico.sparkle, name: "Continuous Improvement", description: "Monthly scorecards track SLA adherence, CSAT, and KPI progress. Improvement sprints reduce recurring incidents." },
  ],
};

const ENGAGEMENT_MODELS = {
  eyebrow: "Engagement Models",
  heading: "Choose the Model That Fits Your Business",
  intro: "Three flexible engagement structures plus optional add-ons for 24×7 cover, regression automation, and peak-period flex capacity.",
  models: [
    {
      title: "Ticket-Based",
      description: "A predictable monthly bundle with rollover for P3/P4 tickets. Ideal for organizations with stable, lower-volume support needs.",
      points: ["Monthly ticket bundle with defined SLAs", "P3/P4 rollover to next month", "Monthly SLA and CSAT reporting", "Onshore escalation for P1/P2"],
    },
    {
      title: "Capacity-Based",
      featured: true,
      description: "A dedicated onshore–offshore pod sized to your backlog and SLAs. Best for organizations with ongoing enhancement needs alongside run-support.",
      points: ["Dedicated named team (onshore + offshore)", "Full L1–L3 support coverage", "Sprint-based enhancement delivery", "Quarterly release readiness included", "Monthly KPI scorecards and exec dashboards"],
    },
    {
      title: "Hybrid",
      description: "A fixed base for run-support with sprint add-ons for mini-projects. Ideal for organizations that need predictable costs with occasional burst capacity.",
      points: ["Fixed monthly base for run-support", "Sprint add-ons for enhancements", "Flex capacity for quarterly peaks", "Optional 24×7 critical cover"],
    },
  ],
};

const TIERS = {
  eyebrow: "Service Tiers",
  heading: "Oracle Fusion Managed Support Tiers",
  intro: "From essential run-support to full-service managed operations — choose the tier that matches your team's needs and budget.",
  tiers: [
    {
      name: "Silver",
      subtitle: "Essential Support",
      description: "Core run-support for organizations that need reliable L1–L2 coverage and quarterly release readiness without a full enhancement backlog.",
      points: ["L1–L2 end-user support", "Quarterly release impact assessment", "Monthly SLA reporting", "Business-hours coverage", "Shared support team"],
      cta: "Get a Quote",
    },
    {
      name: "Gold",
      subtitle: "Full Managed Operations",
      featured: true,
      description: "The complete managed support experience — L1–L3 coverage, enhancements, release management, and governance reporting with a dedicated pod.",
      points: ["L1–L3 full support coverage", "Dedicated onshore–offshore pod", "Sprint-based enhancement delivery", "Quarterly release readiness end-to-end", "Monthly KPI scorecards", "SoD and security reviews", "Follow-the-sun coverage"],
      cta: "Talk to Us",
    },
    {
      name: "Platinum",
      subtitle: "Enterprise Premium",
      description: "For large, complex Oracle Fusion environments requiring 24×7 critical cover, dedicated architecture oversight, and executive governance reporting.",
      points: ["Everything in Gold", "24×7 P1/P2 critical cover", "Dedicated solution architect", "Regression automation build-out", "Executive quarterly business reviews", "Peak-period flex capacity"],
      cta: "Get a Quote",
    },
  ],
};

const WHY_MIRKETA_2 = {
  eyebrow: "Why Mirketa",
  heading: "Oracle Managed Support You Can Actually Count On",
  intro: "Mirketa has been delivering Oracle Cloud services since the early days of Oracle Fusion. Our team combines deep cross-pillar expertise with a proven onshore–offshore delivery model and enterprise-grade governance practices.",
  items: [
    { icon: Ico.award, title: "Oracle Partner Network", description: "Recognized Oracle partner with certified consultants across all major Fusion pillars." },
    { icon: Ico.loop, title: "Agile + ITIL", description: "Sprint-based delivery with ITSM rigor and auditable change control." },
    { icon: Ico.shield, title: "Security First", description: "SoD, least-privilege roles, compliance reporting for SOX, HIPAA, and GDPR." },
    { icon: Ico.chartUp, title: "Transparent Governance", description: "KPIs, SLA scorecards, exec dashboards, and continuous improvement plans." },
  ],
  stats: [
    { value: "100+", label: "Oracle Fusion Clients Supported" },
    { value: "13+", label: "Years Oracle Cloud Experience" },
    { value: "9.6", label: "Average CSAT Score" },
    { value: "99%", label: "SLA Adherence Rate" },
  ],
};

const TESTIMONIALS = {
  eyebrow: "Client Stories",
  heading: "What Our Oracle Fusion Clients Say",
  items: [
    { quote: "Mirketa's managed support team resolved a critical P1 payroll integration failure in under two hours on a Friday evening. That kind of responsiveness is why we renewed for a third year.", name: "Sarah L.", initials: "SL" },
    { quote: "We moved from a fully onshore team to Mirketa's hybrid model and cut our Oracle support costs by 38% in year one. The quality actually went up — better documentation, faster turnaround, and zero missed SLAs.", name: "Michael R.", initials: "MR" },
    { quote: "Quarterly Oracle updates used to be a two-week scramble. Mirketa's release readiness process turned it into a non-event. Impact analysis, regression testing, and go-live runbooks all handled before we even knew the update was coming.", name: "Jennifer K.", initials: "JK" },
  ],
};

const FAQ_CATEGORIES = ["All Questions", "Support Model", "Scope & Coverage", "SLAs & Pricing", "Technical", "Migration"];

const FAQS = [
  { q: "What does Oracle Fusion managed support include?", a: "Oracle Fusion managed support from Mirketa covers L1–L3 end-user support, enhancements and minor projects, quarterly release and change management, and governance and quality reporting — a complete lifecycle service across ERP, HCM, CX, EPM, and SCM.", category: "Scope & Coverage" },
  { q: "What is the difference between Oracle Premium Support and Oracle Managed Services?", a: "Oracle Premium Support is Oracle's own break-fix and technical support offering for licensing-covered issues. Mirketa's Managed Services goes further — combining L1–L3 support, enhancements, release readiness, and governance under one accountable onshore–offshore team, with SLAs tied to your business outcomes rather than just ticket closure.", category: "Support Model" },
  { q: "How does the onshore–offshore Oracle support model work?", a: "Onshore consultants handle P1/P2 incident response, client governance, and architecture decisions in your timezone, while an offshore pod executes P3/P4 tickets, enhancements, integrations, and reporting at scale — giving you local responsiveness for what's critical and cost efficiency for the rest.", category: "Support Model" },
  { q: "What SLAs does Mirketa offer for Oracle Fusion support?", a: "SLA targets are tiered by ticket severity — typically 1 hour for P1 critical incidents, with defined response and resolution windows for P2–P4 tickets agreed during onboarding and tracked in monthly scorecards.", category: "SLAs & Pricing" },
  { q: "How does Mirketa handle quarterly Oracle Fusion updates?", a: "We run impact analysis on every quarterly Oracle Fusion update, execute automated regression packs, manage defects, prepare go-live runbooks, and communicate changes to end users — so updates land as a non-event instead of a scramble.", category: "Technical" },
  { q: "Can Mirketa support Oracle Fusion integrations with third-party systems?", a: "Yes. Our offshore pod builds and monitors OIC integrations connecting Oracle Fusion to third-party systems, with automated failure alerts and performance dashboards to catch issues before they affect users.", category: "Technical" },
  { q: "What Oracle Fusion modules does Mirketa support?", a: "We support Oracle Cloud ERP, HCM, CX, EPM, and SCM, plus Oracle Integration Cloud (OIC) integrations and OTBI/BIP/Smart View reporting across all five pillars.", category: "Scope & Coverage" },
  { q: "How quickly can Mirketa onboard as our Oracle support partner?", a: "Onboarding typically takes 2–4 weeks and includes environment documentation, playbook creation, ITSM setup, and knowledge transfer from your current team or vendor before we take on live tickets.", category: "Migration" },
  { q: "What engagement models are available for Oracle Fusion managed support?", a: "We offer Ticket-Based, Capacity-Based, and Hybrid engagement models, plus optional add-ons like 24×7 critical cover, regression automation, and peak-period flex capacity.", category: "SLAs & Pricing" },
  { q: "How does Mirketa ensure Oracle Fusion security and compliance?", a: "Security is built into every engagement through segregation-of-duties reviews, least-privilege role design, audit support, and compliance reporting aligned to SOX, HIPAA, and GDPR requirements.", category: "Technical" },
  { q: "How is Oracle Fusion managed support different from break-fix support?", a: "Break-fix support waits for something to break. Managed support proactively monitors your environment, handles quarterly releases before they become urgent, and ties enhancement work to your business KPIs — so fewer incidents happen in the first place.", category: "Support Model" },
  { q: "Can Mirketa help reduce Oracle Fusion support costs compared to an in-house team?", a: "Yes. Clients typically see 30–50% lower run costs by shifting routine support and enhancements to our offshore pod while keeping critical incident response onshore, without sacrificing SLA adherence or quality.", category: "SLAs & Pricing" },
  { q: "Can Mirketa take over support from our current Oracle vendor or internal team?", a: "Yes. We run a structured knowledge-transfer and onboarding process — environment documentation, playbook creation, and shadow support — so the transition from your current vendor or internal team happens without a coverage gap.", category: "Migration" },
];

const FINAL_CTA = {
  heading: "Keep Oracle Fusion Stable, Secure, and Continually Improving Without Growing Headcount",
  description: "Speak with a Managed Services lead or request a cost-savings assessment today. Most clients see a clear ROI within the first quarter.",
  cta: { label: "Schedule a 15-Minute Discovery", href: "#contact" },
};

const SEO = {
  title: "Oracle Managed Services | Mirketa",
  description:
    "Mirketa delivers SLA-backed Oracle Fusion managed support for Cloud ERP, HCM, CX, EPM, and SCM through an onshore–offshore model — cutting support costs 30–50% without sacrificing quality.",
  canonical: "https://mirketa.us/oracle-managed-services/",
  keywords: [
    "Oracle Managed Services",
    "Oracle Fusion Managed Support",
    "Oracle Support Onshore Offshore",
    "Oracle Cloud ERP Support",
    "Oracle HCM Support",
    "Oracle Fusion Support SLA",
    "Oracle Application Managed Support",
    "Oracle Fusion Release Management",
    "Oracle Support Engagement Models",
    "Oracle Fusion Support Partner",
  ],
  schema: [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "Oracle Fusion Managed Support Services",
      provider: { "@type": "Organization", name: "Mirketa Inc.", url: "https://mirketa.us" },
      name: "Oracle Managed Services",
      description:
        "SLA-backed Oracle Fusion managed support across ERP, HCM, CX, EPM, and SCM delivered through an onshore–offshore model covering end-user support, enhancements, release management, and governance.",
      areaServed: "Global",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://mirketa.us/" },
        { "@type": "ListItem", position: 2, name: "Oracle Managed Services", item: "https://mirketa.us/oracle-managed-services/" },
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

export default function ManagedServices() {
  const heroTextRef = useRef(null);
  const heroRef = useRef(null);
  const [showStickyCta, setShowStickyCta] = useState(false);

  useEffect(() => {
    const heroEl = heroRef.current;
    if (!heroEl) return;
    const observer = new IntersectionObserver(
      ([entry]) => setShowStickyCta(!entry.isIntersecting),
      { rootMargin: "-10% 0px 0px 0px" }
    );
    observer.observe(heroEl);
    return () => observer.disconnect();
  }, []);

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

      gsap.utils.toArray(".oms-reveal").forEach((el) => {
        gsap.from(el, {
          opacity: prefersReduced ? 1 : 0,
          y: prefersReduced ? 0 : 32,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      gsap.utils.toArray(".oms-reveal-left").forEach((el) => {
        gsap.from(el, {
          opacity: prefersReduced ? 1 : 0,
          x: prefersReduced ? 0 : -30,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      gsap.utils.toArray(".oms-reveal-right").forEach((el) => {
        gsap.from(el, {
          opacity: prefersReduced ? 1 : 0,
          x: prefersReduced ? 0 : 30,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      gsap.utils.toArray(".oms-reveal-stagger").forEach((el) => {
        gsap.from(el.children, {
          opacity: prefersReduced ? 1 : 0,
          y: prefersReduced ? 0 : 26,
          duration: 0.6,
          stagger: 0.06,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      gsap.utils.toArray(".oms-zoom-in").forEach((el) => {
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
    <div className="oracle-managed-services">
      <Seo {...SEO} />
      <HeroSection heroTextRef={heroTextRef} heroRef={heroRef} />
      <TrustBadgesSection />
      <WhyMirketaOneSection />
      <IncludedSection />
      <DeliverySection />
      <ToolingSection />
      <PillarCoverageSection />
      <ProcessSection />
      <EngagementModelsSection />
      <TiersSection />
      <WhyMirketaTwoSection />
      <TestimonialsSection />
      <FaqSection />
      <FinalCtaSection />
      <ContactSection />
      <StickyCta visible={showStickyCta} />
    </div>
  );
}

// ============================================================
// STICKY CTA
// ============================================================

function StickyCta({ visible }) {
  return (
    <div className={`oms-sticky-cta ${visible ? "is-visible" : ""}`} aria-hidden={!visible}>
      <a href="#contact" className="btn btn-primary oms-btn" tabIndex={visible ? 0 : -1}>
        Talk to Managed Services <span aria-hidden="true">→</span>
      </a>
    </div>
  );
}

// ============================================================
// HERO — headline/copy/CTA/stats left, live dashboard widget right
// ============================================================

function AnimatedStat({ value, label, className }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const match = value.match(/^([\d.]+)(.*)$/);
    if (!match) {
      setDisplay(value);
      return;
    }
    const target = parseFloat(match[1]);
    const suffix = match[2];
    const isDecimal = match[1].includes(".");

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setDisplay(value);
      return;
    }

    let hasStarted = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          hasStarted = true;
          const duration = 1200;
          const startTime = performance.now();
          const step = (now) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const current = target * progress;
            setDisplay((isDecimal ? current.toFixed(1) : Math.floor(current)) + suffix);
            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              setDisplay(value);
            }
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div className={className} ref={ref}>
      <strong>{display}</strong>
      <span>{label}</span>
    </div>
  );
}

function HeroSection({ heroTextRef, heroRef }) {
  return (
    <section ref={heroRef} className="oms-hero" style={{ backgroundImage: `url("${Images.heroOracleManagedServices}")` }} aria-label="Oracle Managed Services by Mirketa">
      <div className="oms-hero__bg" aria-hidden="true" />
      <div className="container">
        <Breadcrumb items={BREADCRUMB} className="oms-breadcrumb" />

        <div className="oms-hero__inner">
          <div ref={heroTextRef} className="oms-hero__text">
            <h1>{HERO.title}</h1>
            <p className="oms-hero__description">{HERO.description}</p>
            <a href={HERO.cta.href} className="btn btn-primary oms-btn">
              {HERO.cta.label} <span aria-hidden="true">→</span>
            </a>
            <div className="oms-hero__stats">
              {HERO.stats.map((s) => (
                <AnimatedStat key={s.label} value={s.value} label={s.label} className="oms-hero__stat" />
              ))}
            </div>
          </div>

          <div className="oms-dashboard oms-zoom-in">
            <div className="oms-dashboard__head">
              <h2>{DASHBOARD.title}</h2>
              <span className="oms-dashboard__live">
                <span className="oms-dashboard__live-dot" aria-hidden="true" /> LIVE
              </span>
            </div>
            <div className="oms-dashboard__stats">
              {DASHBOARD.stats.map((s) => (
                <div className="oms-dashboard__stat" key={s.label}>
                  <span className="oms-dashboard__stat-label">{s.label}</span>
                  <strong>{s.value}</strong>
                  <span className="oms-dashboard__stat-caption">{s.caption}</span>
                </div>
              ))}
            </div>
            <ul className="oms-dashboard__tickets">
              {DASHBOARD.tickets.map((t) => (
                <li key={t.title}>
                  <div>
                    <p className="oms-dashboard__ticket-title">{t.title}</p>
                    <p className="oms-dashboard__ticket-meta">{t.meta}</p>
                  </div>
                  <span className={`oms-dashboard__ticket-status oms-dashboard__ticket-status--${t.status.replace(/\s+/g, "-").toLowerCase()}`}>{t.status}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// TRUST / EXPERTISE BADGES
// ============================================================

function TrustBadgesSection() {
  return (
    <section className="oms-trust" aria-label="Oracle expertise badges">
      <div className="container oms-trust__inner">
        {TRUST_BADGES.map((b) => (
          <span key={b} className="oms-trust__badge">
            <span aria-hidden="true">{Ico.check}</span>
            {b}
          </span>
        ))}
      </div>
    </section>
  );
}

// ============================================================
// CONTACT — shared Web-to-Lead form anchor
// ============================================================

const CONSULTATION = {
  eyebrow: "Get Started",
  heading: "Schedule an Oracle Managed Services Consultation",
  description:
    "Tell us about your Oracle Fusion environment and support needs — a managed services specialist will follow up within one business day to discuss SLA-backed coverage across ERP, HCM, CX, EPM, and SCM.",
  formTitle: "Talk to Our Managed Services Team",
};

function ContactSection() {
  return (
    <ConsultationSection {...CONSULTATION} />
  );
}

// ============================================================
// WHY MIRKETA (1) — 6 feature cards
// ============================================================

function WhyMirketaOneSection() {
  return (
    <section className="section oms-why-1" aria-labelledby="oms-why-1-heading">
      <div className="container">
        <div className="section-heading oms-reveal">
          <p className="oms-eyebrow">{WHY_MIRKETA_1.eyebrow}</p>
          <h2 id="oms-why-1-heading">{WHY_MIRKETA_1.heading}</h2>
          <p>{WHY_MIRKETA_1.intro}</p>
        </div>
        <div className="oms-why-1__grid oms-reveal-stagger">
          {WHY_MIRKETA_1.items.map((w) => (
            <div className="oms-why-1-card" key={w.title}>
              <span className="oms-why-1-card__icon">{w.icon}</span>
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
// WHAT'S INCLUDED — 4 pillar cards with bullet lists
// ============================================================

function IncludedSection() {
  return (
    <section className="section oms-included" aria-labelledby="oms-included-heading">
      <div className="container">
        <div className="section-heading oms-reveal">
          <p className="oms-eyebrow">{INCLUDED.eyebrow}</p>
          <h2 id="oms-included-heading">{INCLUDED.heading}</h2>
          <p>{INCLUDED.intro}</p>
        </div>
        <div className="oms-included__grid oms-reveal-stagger">
          {INCLUDED.items.map((item) => (
            <div className="oms-included-card" key={item.title}>
              <span className="oms-included-card__icon">{item.icon}</span>
              <h3>{item.title}</h3>
              <ul>
                {item.points.map((p) => (
                  <li key={p}>
                    <span aria-hidden="true">{Ico.check}</span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// DELIVERY MODEL — onshore / offshore split
// ============================================================

function DeliverySection() {
  return (
    <section className="section oms-delivery" aria-labelledby="oms-delivery-heading">
      <div className="container">
        <div className="section-heading oms-reveal">
          <p className="oms-eyebrow">{DELIVERY.eyebrow}</p>
          <h2 id="oms-delivery-heading">{DELIVERY.heading}</h2>
          <p>{DELIVERY.intro}</p>
        </div>
        <div className="oms-delivery__grid">
          {DELIVERY.teams.map((t, i) => (
            <div className={`oms-delivery-card ${i === 0 ? "oms-reveal-left" : "oms-reveal-right"}`} key={t.title}>
              <span className="oms-delivery-card__icon">{t.icon}</span>
              <h3>{t.title}</h3>
              <p className="oms-delivery-card__subtitle">{t.subtitle}</p>
              <p>{t.description}</p>
              <ul>
                {t.points.map((p) => (
                  <li key={p}>
                    <span aria-hidden="true">{Ico.check}</span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// TOOLING & WAYS OF WORKING — 5-item strip
// ============================================================

function ToolingSection() {
  return (
    <section className="section oms-tooling" aria-labelledby="oms-tooling-heading">
      <div className="container">
        <div className="oms-tooling__head">
          <div className="section-heading oms-reveal">
            <p className="oms-eyebrow">{TOOLING.eyebrow}</p>
            <h2 id="oms-tooling-heading">{TOOLING.heading}</h2>
            <p>{TOOLING.intro}</p>
          </div>
        </div>
        <div className="oms-tooling__grid oms-reveal-stagger">
          {TOOLING.items.map((t) => (
            <div className="oms-tooling-card" key={t.title}>
              <span>{t.icon}</span>
              <h3>{t.title}</h3>
              <p>{t.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// PILLAR COVERAGE — 5-column scope grid
// ============================================================

function PillarCoverageSection() {
  return (
    <section className="section oms-pillars" aria-labelledby="oms-pillars-heading">
      <div className="container">
        <div className="section-heading oms-reveal">
          <p className="oms-eyebrow">{PILLAR_COVERAGE.eyebrow}</p>
          <h2 id="oms-pillars-heading">{PILLAR_COVERAGE.heading}</h2>
          <p>{PILLAR_COVERAGE.intro}</p>
        </div>
        <div className="oms-pillars__grid oms-reveal-stagger">
          {PILLAR_COVERAGE.columns.map((c) => (
            <div className="oms-pillar-column" key={c.title}>
              <span className="oms-pillar-column__icon">{c.icon}</span>
              <h3>{c.title}</h3>
              <ul>
                {c.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// HOW WE WORK — 5-step process
// ============================================================

function ProcessSection() {
  return (
    <section className="section oms-process" aria-labelledby="oms-process-heading">
      <div className="container">
        <div className="section-heading oms-reveal">
          <p className="oms-eyebrow">{PROCESS.eyebrow}</p>
          <h2 id="oms-process-heading">{PROCESS.heading}</h2>
        </div>
        <div className="oms-process__grid oms-reveal-stagger">
          {PROCESS.steps.map((s, i) => (
            <div className="oms-process-card" key={s.name}>
              <span className="oms-process-card__num">{i + 1}</span>
              <span className="oms-process-card__icon">{s.icon}</span>
              <h3>{s.name}</h3>
              <p>{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// ENGAGEMENT MODELS — 3-col comparison
// ============================================================

function EngagementModelsSection() {
  return (
    <section className="section oms-engagement" aria-labelledby="oms-engagement-heading">
      <div className="container">
        <div className="section-heading oms-reveal">
          <p className="oms-eyebrow">{ENGAGEMENT_MODELS.eyebrow}</p>
          <h2 id="oms-engagement-heading">{ENGAGEMENT_MODELS.heading}</h2>
          <p>{ENGAGEMENT_MODELS.intro}</p>
        </div>
        <div className="oms-engagement__grid oms-reveal-stagger">
          {ENGAGEMENT_MODELS.models.map((m) => (
            <div className={`oms-engagement-card ${m.featured ? "is-featured" : ""}`} key={m.title}>
              {m.featured && <span className="oms-engagement-card__badge">Most Popular</span>}
              <h3>{m.title}</h3>
              <p>{m.description}</p>
              <ul>
                {m.points.map((p) => (
                  <li key={p}>
                    <span aria-hidden="true">{Ico.check}</span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// SERVICE TIERS — Silver / Gold / Platinum pricing cards
// ============================================================

function TiersSection() {
  return (
    <section className="section oms-tiers" id="services" aria-labelledby="oms-tiers-heading">
      <div className="container">
        <div className="section-heading oms-reveal">
          <p className="oms-eyebrow">{TIERS.eyebrow}</p>
          <h2 id="oms-tiers-heading">{TIERS.heading}</h2>
          <p>{TIERS.intro}</p>
        </div>
        <div className="oms-tiers__grid oms-reveal-stagger">
          {TIERS.tiers.map((t) => (
            <div className={`oms-tier-card ${t.featured ? "is-featured" : ""}`} key={t.name}>
              {t.featured && <span className="oms-tier-card__badge">Most Popular</span>}
              <h3>{t.name}</h3>
              <p className="oms-tier-card__subtitle">{t.subtitle}</p>
              <p className="oms-tier-card__description">{t.description}</p>
              <ul>
                {t.points.map((p) => (
                  <li key={p}>
                    <span aria-hidden="true">{Ico.check}</span>
                    {p}
                  </li>
                ))}
              </ul>
              <a href="#contact" className={`btn ${t.featured ? "btn-primary" : "btn-secondary"} oms-btn oms-tier-card__cta`}>
                {t.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// WHY MIRKETA (2) — feature cards + stat band
// ============================================================

function WhyMirketaTwoSection() {
  return (
    <section className="section oms-why-2" aria-labelledby="oms-why-2-heading">
      <div className="container">
        <div className="section-heading oms-reveal">
          <p className="oms-eyebrow">{WHY_MIRKETA_2.eyebrow}</p>
          <h2 id="oms-why-2-heading">{WHY_MIRKETA_2.heading}</h2>
          <p>{WHY_MIRKETA_2.intro}</p>
        </div>
        <div className="oms-why-2__grid oms-reveal-stagger">
          {WHY_MIRKETA_2.items.map((w) => (
            <div className="oms-why-2-card" key={w.title}>
              <span className="oms-why-2-card__icon">{w.icon}</span>
              <h3>{w.title}</h3>
              <p>{w.description}</p>
            </div>
          ))}
        </div>
        <div className="oms-why-2__stats oms-reveal-stagger">
          {WHY_MIRKETA_2.stats.map((s) => (
            <AnimatedStat key={s.label} value={s.value} label={s.label} className="oms-why-2__stat" />
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// CLIENT STORIES — testimonials
// ============================================================

function TestimonialsSection() {
  return (
    <section className="section oms-testimonials" aria-labelledby="oms-testimonials-heading">
      <div className="container">
        <div className="section-heading oms-reveal">
          <p className="oms-eyebrow">{TESTIMONIALS.eyebrow}</p>
          <h2 id="oms-testimonials-heading">{TESTIMONIALS.heading}</h2>
        </div>
        <div className="oms-testimonials__grid oms-reveal-stagger">
          {TESTIMONIALS.items.map((t) => (
            <figure className="oms-testimonial-card" key={t.name}>
              <div className="oms-testimonial-card__stars" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} aria-hidden="true">{Ico.star}</span>
                ))}
              </div>
              <span className="oms-testimonial-card__mark" aria-hidden="true">{Ico.quote}</span>
              <blockquote>{t.quote}</blockquote>
              <figcaption>
                <span className="oms-testimonial-card__avatar" aria-hidden="true">{t.initials}</span>
                <strong>{t.name}</strong>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// FAQ — category tabs
// ============================================================

function FaqSection() {
  const [category, setCategory] = useState("All Questions");
  const [openIndex, setOpenIndex] = useState(-1);

  const filtered = useMemo(() => {
    if (category === "All Questions") return FAQS;
    return FAQS.filter((item) => item.category === category);
  }, [category]);

  return (
    <section className="section oms-faq" aria-labelledby="oms-faq-heading">
      <div className="container">
        <div className="section-heading oms-reveal">
          <p className="oms-eyebrow">FAQ</p>
          <h2 id="oms-faq-heading">Frequently Asked Questions About Oracle Fusion Managed Support</h2>
          <p>Straight answers to the questions we hear most from Oracle Fusion teams evaluating managed support.</p>
        </div>
        <div className="oms-faq__tabs oms-reveal" role="tablist" aria-label="Filter FAQs by category">
          {FAQ_CATEGORIES.map((c) => (
            <button
              key={c}
              type="button"
              role="tab"
              aria-selected={category === c}
              className={`oms-faq__tab ${category === c ? "is-active" : ""}`}
              onClick={() => {
                setCategory(c);
                setOpenIndex(-1);
              }}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="oms-faq__list oms-reveal">
          {filtered.map((item, i) => {
            const open = openIndex === i;
            const panelId = `oms-faq-panel-${i}`;
            return (
              <div className={`oms-faq-item ${open ? "is-open" : ""}`} key={item.q}>
                <button type="button" className="oms-faq-item__question" aria-expanded={open} aria-controls={panelId} onClick={() => setOpenIndex(open ? -1 : i)}>
                  <span>{item.q}</span>
                  <span className="oms-faq-item__icon" aria-hidden="true">{open ? "−" : "+"}</span>
                </button>
                <div id={panelId} className="oms-faq-item__answer" role="region" hidden={!open}>
                  <p>{item.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// FINAL CTA
// ============================================================

function FinalCtaSection() {
  return (
    <section className="oms-final-cta oms-reveal" aria-labelledby="oms-final-cta-heading">
      <div className="container oms-final-cta__inner">
        <h2 id="oms-final-cta-heading">{FINAL_CTA.heading}</h2>
        <p>{FINAL_CTA.description}</p>
        <a href={FINAL_CTA.cta.href} className="btn btn-primary oms-btn">
          {FINAL_CTA.cta.label} <span aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  );
}
