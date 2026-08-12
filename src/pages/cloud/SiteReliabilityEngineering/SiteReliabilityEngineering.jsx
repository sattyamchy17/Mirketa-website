import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Images } from "../../../assets/images/index.js";
import { CLOUD_PAGES, SERVICENOW_PAGES, AI_PAGES } from "../../../config/pageSlugs.js";
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
import AnalyticsPanel from "../../../components/illustrations/AnalyticsPanel/AnalyticsPanel.jsx";
import SupplyChainMap from "../../../components/illustrations/SupplyChainMap/SupplyChainMap.jsx";
import "./SiteReliabilityEngineering.css";

gsap.registerPlugin(ScrollTrigger);

// ============================================================
// ICONS
// ============================================================

const Ico = {
  check: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12.5l5 5L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  gauge: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" /><path d="M12 12L16 8.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /><path d="M7 15a6 6 0 0110 0" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.6" /></svg>
  ),
  bell: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 10a6 6 0 0112 0v4l1.5 3h-15L6 14v-4z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M9.5 19.5a2.5 2.5 0 005 0" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
  ),
  clock: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" /><path d="M12 7v5l3.5 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
  ),
  bar: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 19V13M10 19V8M16 19v-5M20 19V5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
  ),
  gear: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.4" /><path d="M12 3v2.5M12 18.5V21M21 12h-2.5M5.5 12H3M18.4 5.6l-1.8 1.8M7.4 16.6l-1.8 1.8M18.4 18.4l-1.8-1.8M7.4 7.4L5.6 5.6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
  ),
  route: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="6" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.4" /><circle cx="18" cy="18" r="2.5" stroke="currentColor" strokeWidth="1.4" /><path d="M6 8.5V13a4 4 0 004 4h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
  ),
  bolt: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M13 3L5 14h6l-1 7 8-11h-6l1-7z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  eye: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.4" /></svg>
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
  server: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="4" y="4" width="16" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4" /><rect x="4" y="14" width="16" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4" /><circle cx="8" cy="7" r="1" fill="currentColor" /><circle cx="8" cy="17" r="1" fill="currentColor" /></svg>
  ),
  box: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 7l9-4 9 4-9 4-9-4z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M3 7v10l9 4 9-4V7M12 11v10" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /></svg>
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
  { label: CLOUD_PAGES.SITE_RELIABILITY_ENGINEERING.label },
];

const HERO = {
  badge: "Observability · Incident Response · Cloud Security",
  title: "Site Reliability Engineering Services That Keep Live Cloud Environments Trustworthy",
  description:
    "Once workloads are running in production, reliability stops being a migration checklist item and becomes an ongoing discipline. Mirketa's site reliability engineering services give already-live AWS, Azure, and Google Cloud environments unified observability, defined SLOs and error budgets, a real on-call and incident response model, and continuous security monitoring — so 'reliable' is a number your team can point to, not a feeling.",
  primaryCta: { label: "Get an SRE Readiness Review", href: "#contact" },
  secondaryCta: { label: "Talk to a Reliability Engineer", href: "#contact" },
  metrics: ["99.95% Median Uptime SLO", "24/7 On-Call Coverage", "Sub-15-Minute MTTA", "Security Monitoring Included"],
};

const HERO_DASHBOARD = {
  title: "Reliability Operations Center",
  stats: [
    { label: "UPTIME SLO", value: "99.95%", caption: "Trailing 90-day average" },
    { label: "AVG MTTR", value: "22 min", caption: "Down from 3+ hours" },
    { label: "AUTO-REMEDIATED", value: "61%", caption: "Of P2/P3 incidents" },
  ],
  rows: [
    { title: "Checkout API latency spike", meta: "Auto-remediated · Runbook RB-014", tone: "good", status: "Resolved" },
    { title: "Error budget — payments service", meta: "18% consumed this cycle", tone: "good", status: "Healthy" },
    { title: "Anomalous auth traffic — region us-east", meta: "Security on-call paged", tone: "neutral", status: "Investigating" },
  ],
  floatingCards: [
    { icon: Ico.gauge, title: "99.95% SLO", subtitle: "Tracked in real time" },
    { icon: Ico.bell, title: "Sub-15 Min MTTA", subtitle: "Every page routed, not lost" },
  ],
};

const CHALLENGES = {
  eyebrow: "Business Challenges",
  heading: "Why 'It's in the Cloud' Doesn't Mean 'It's Reliable'",
  intro:
    "Most teams we meet aren't struggling to run workloads in the cloud — they're struggling to know, with confidence, whether those workloads are actually healthy. These four problems show up again and again once the migration excitement fades and steady-state operations begin.",
  items: [
    { title: "Alerts Firing With No Clear Owner", description: "Dashboards and alert rules were bolted on ad hoc, so when something pages at 2 a.m., three teams assume someone else has it — and nobody actually does." },
    { title: "No Defined SLOs, So 'Reliable' Is Subjective", description: "Without agreed-upon service level objectives and error budgets, every outage debate becomes an argument about whether it even counted as one." },
    { title: "Incidents That Take Hours to Diagnose", description: "Metrics live in one tool, logs in another, and traces nowhere at all, so root cause analysis means stitching together screenshots across five browser tabs." },
    { title: "Security Monitoring Bolted On as an Afterthought", description: "Cloud security monitoring was added after the fact with generic rules, producing alert fatigue instead of catching the anomalous access pattern that actually matters." },
  ],
};

const SOLUTION = {
  eyebrow: "Cloud Solution Overview",
  heading: "Reliability as an Operating Discipline, Not a One-Time Project",
  paragraphs: [
    "Mirketa's site reliability engineering services start from a simple premise: your workloads are already live, so the first job is to make their actual health visible. We instrument metrics, logs, and traces into a single observability stack, define the service level indicators that matter for each critical user journey, and turn those SLIs into SLOs with a real error budget — a number engineering and the business can both agree on.",
    "From there, reliability becomes operational, not aspirational. We build the on-call rotation, the escalation paths, and the runbooks so that when something breaks, the right person is paged with the right context in minutes, not hours. Every incident closes with a blameless postmortem that feeds back into monitoring coverage and automated remediation, so the same failure mode doesn't page anyone twice.",
    "Security monitoring is woven into the same observability layer rather than living in a separate silo — anomalous access patterns, privilege escalation attempts, and configuration drift get surfaced through the same pipeline your SRE team already watches, evaluated against the same on-call process. Chaos engineering and resilience testing are introduced gradually and safely, in staging first and then in controlled production experiments, so you find the weak points on your terms instead of during an actual outage.",
  ],
};

const CORE_SERVICES = {
  eyebrow: "Core Services",
  heading: "Six Ways Mirketa Delivers SRE and Security Monitoring",
  intro: "Every site reliability engineering services engagement draws from these six service lines, scoped to the maturity of your current environment.",
  items: [
    { icon: Ico.eye, title: "Observability & Monitoring Setup", description: "Unified metrics, logs, and distributed tracing so engineers can answer 'what's actually happening right now' in one place, not five." },
    { icon: Ico.bell, title: "Incident Response & On-Call Management", description: "A staffed on-call rotation, escalation policy, and paging workflow built around your team's actual coverage hours and skill mix." },
    { icon: Ico.gauge, title: "SLO & Error Budget Definition", description: "Service level indicators tied to real user journeys, translated into SLOs and error budgets that both engineering and leadership can act on." },
    { icon: Ico.bolt, title: "Chaos Engineering & Resilience Testing", description: "Controlled fault-injection experiments that surface single points of failure before customers do, staged from non-production to live traffic." },
    { icon: Ico.shield, title: "Cloud Security Monitoring", description: "Continuous threat detection across identity, network, and workload layers, correlated with the same observability data your SRE team uses." },
    { icon: Ico.gear, title: "Automated Remediation & Runbooks", description: "Codified runbooks and auto-remediation scripts that resolve known failure signatures without waking a human up for the third time this month." },
  ],
};

const FEATURES = {
  eyebrow: "Key Features",
  heading: "What a Properly Run SRE Practice Actually Includes",
  intro: "These are the capability areas every Mirketa SRE services engagement is built around, from first alert to full remediation.",
  items: [
    { title: "Unified Observability Stack", description: "Metrics, logs, and traces correlated in one pane of glass instead of scattered across disconnected tools." },
    { title: "SLI-Driven Alerting", description: "Alerts tied to service level indicators that reflect user impact, not noisy infrastructure thresholds nobody trusts." },
    { title: "On-Call Rotation & Escalation Policy", description: "A documented rotation with clear escalation paths, so ownership is never ambiguous when a page fires." },
    { title: "Living Runbooks", description: "Step-by-step incident runbooks that are tested, versioned, and updated after every postmortem, not written once and forgotten." },
    { title: "Blameless Postmortems", description: "A structured review process focused on system and process gaps, not individual blame, that actually changes what happens next time." },
    { title: "Security & Reliability Correlation", description: "Anomaly detection and access monitoring surfaced through the same observability pipeline your on-call engineers already watch." },
  ],
};

const BENEFITS = {
  eyebrow: "Benefits",
  heading: "What Changes Once Reliability Has an Owner",
  intro: "These are the outcomes Mirketa's site reliability engineering clients consistently report within the first two quarters.",
  stats: [
    { value: "99.95%", label: "Median Uptime SLO Achieved" },
    { value: "22", label: "Avg. MTTR (Minutes)" },
    { value: "61%", label: "Incidents Auto-Remediated" },
    { value: "40%", label: "Fewer Repeat Incidents" },
  ],
  items: [
    { title: "Incidents Resolved in Minutes, Not Hours", description: "Unified observability and tested runbooks turn root cause analysis from a scavenger hunt into a documented procedure." },
    { title: "A Shared, Defensible Definition of 'Reliable'", description: "SLOs and error budgets give engineering and the business the same number to plan releases and risk tolerance against." },
    { title: "On-Call That Doesn't Burn Out Your Team", description: "Clear escalation paths and automated remediation mean fewer 2 a.m. pages for problems the system can fix itself." },
    { title: "Threats Caught Alongside Outages", description: "Security monitoring built into the same pipeline means anomalous behavior gets the same fast response as a service degradation." },
  ],
};

const PROCESS = {
  eyebrow: "Migration / Implementation Process",
  heading: "A Five-Stage Path to Steady-State Reliability",
  intro: "A structured onboarding methodology refined across SRE and security monitoring engagements for teams whose workloads are already live in the cloud.",
  steps: [
    { label: "Baseline Assessment" },
    { label: "Instrumentation" },
    { label: "SLO Workshop" },
    { label: "Runbook Development" },
    { label: "Steady-State Ops" },
  ],
  detail: [
    { name: "Observability Baseline Assessment", description: "We audit your existing metrics, logs, tracing, and alerting to find blind spots before adding a single new dashboard." },
    { name: "Instrumentation & Dashboard Setup", description: "Metrics, logs, and traces are unified into a single observability stack scoped to your critical user journeys first." },
    { name: "SLO Definition Workshop", description: "Engineering and business stakeholders agree on SLIs, SLOs, and error budgets together, so nobody discovers the target during an outage." },
    { name: "On-Call Runbook Development", description: "Escalation policies and step-by-step runbooks are written, tested, and staffed before your team takes its first live on-call shift." },
    { name: "Steady-State Operations", description: "Ongoing on-call coverage, chaos engineering cadence, and quarterly SLO reviews keep reliability improving instead of quietly decaying." },
  ],
};

const TECHNOLOGIES = {
  eyebrow: "Technologies Supported",
  heading: "Observability and Operations Tooling We Work In",
  intro: "Our SRE and security monitoring engagements plug into the tools your team already runs, or help you choose the right stack from scratch.",
  items: [
    { icon: Ico.bar, title: "Prometheus & Grafana" },
    { icon: Ico.eye, title: "Datadog" },
    { icon: Ico.bell, title: "PagerDuty" },
    { icon: Ico.route, title: "OpenTelemetry" },
    { icon: Ico.server, title: "AWS CloudWatch" },
    { icon: Ico.box, title: "Kubernetes" },
  ],
};

const WHY_MIRKETA = {
  eyebrow: "Why Mirketa",
  heading: "A Reliability Partner That Measures Instead of Guessing",
  intro: "Plenty of partners can set up a dashboard. Fewer can define an error budget your leadership will actually trust and staff the on-call model behind it.",
  items: [
    { icon: Ico.gauge, title: "SLO-First Engagements", description: "Every engagement starts by defining what reliable actually means for your critical services, in numbers both sides agree on." },
    { icon: Ico.bell, title: "Real On-Call Staffing, Not Just Tooling", description: "We help build and, when needed, augment the on-call rotation itself — not just hand over a PagerDuty license." },
    { icon: Ico.shield, title: "Security Woven Into Reliability", description: "Threat detection runs through the same observability pipeline as uptime monitoring, so nothing falls in the gap between teams." },
    { icon: Ico.bolt, title: "Chaos Engineering Done Safely", description: "Fault injection is introduced gradually, starting in staging, with clear blast-radius controls before touching live traffic." },
    { icon: Ico.clock, title: "Fast, Measurable MTTA and MTTR", description: "Sub-15-minute mean time to acknowledge and steadily improving mean time to resolution, tracked and reported every month." },
    { icon: Ico.heart, title: "Support That Outlasts the Handoff", description: "We stay engaged through steady-state operations, not just the initial instrumentation sprint." },
  ],
};

const CASE_STUDIES = {
  eyebrow: "Case Study / Customer Success",
  heading: "Real Site Reliability Engineering Outcomes",
  intro: "Anonymized results from recent SRE and security monitoring engagements across industries.",
  cases: [
    {
      title: "Fintech Platform Cuts MTTR From 3 Hours to 20 Minutes",
      industry: "Financial Services",
      challenge: "A fintech company's on-call engineers were manually correlating logs across four tools during every incident, stretching resolution times past three hours and eroding customer trust.",
      solution: "We unified metrics, logs, and traces into one observability stack, defined SLOs for every customer-facing API, and built tested runbooks for the top twelve recurring failure signatures.",
      outcome: "Mean time to resolution dropped to under 20 minutes, and repeat incidents fell by more than a third within the first quarter.",
    },
    {
      title: "E-Commerce Platform Catches Credential-Stuffing Attack Before It Spread",
      industry: "E-Commerce",
      challenge: "A mid-market retailer had cloud security monitoring bolted on with generic rules that generated so much noise the security team had started ignoring alerts entirely.",
      solution: "We rebuilt anomaly detection on top of their existing observability pipeline, correlating login patterns with infrastructure telemetry and routing verified threats through the same on-call process as reliability incidents.",
      outcome: "A credential-stuffing attempt was detected and contained within eleven minutes of the first anomalous spike, before any customer accounts were compromised.",
    },
  ],
};

const FAQS = [
  { q: "What exactly are SLOs and error budgets, and why do we need them?", a: "An SLO (service level objective) is a target for a service level indicator, like 99.95% of checkout requests succeeding in under 400ms. The error budget is the allowed room to miss that target. Together they turn 'reliable' from a feeling into a number both engineering and the business can plan against." },
  { q: "What does your on-call coverage model actually look like?", a: "We help design a rotation that matches your team's real coverage hours — whether that's a follow-the-sun model, a primary/secondary structure, or Mirketa engineers augmenting your existing on-call bench during ramp-up or off-hours." },
  { q: "What response time commitments do you offer?", a: "Response time commitments are scoped per severity tier in the engagement agreement. Our typical benchmark across active clients is a sub-15-minute mean time to acknowledge for page-worthy incidents, with resolution targets set per service based on its SLO." },
  { q: "How do you introduce chaos engineering without causing an outage?", a: "We start in staging with clearly scoped experiments and a defined blast radius, validate the system's response, and only graduate to controlled production experiments once the failure mode is well understood and rollback is proven." },
  { q: "What's the difference between monitoring and observability?", a: "Monitoring tells you a threshold was crossed. Observability lets you ask new questions about system behavior you didn't anticipate when you set up the dashboard — which is what actually shortens root cause analysis during a real incident." },
  { q: "How is cloud security monitoring different from a traditional SOC?", a: "We correlate security signals with the same infrastructure and application telemetry your SRE team already watches, so an anomalous access pattern is investigated with the same urgency and context as a service degradation, not routed to a disconnected team." },
  { q: "What's the pricing model for ongoing SRE services?", a: "Most engagements run on a monthly retainer scoped to the number of services under SLO and the on-call coverage model required, with a fixed-scope onboarding phase billed separately from steady-state operations." },
  { q: "Can you work alongside our existing DevOps or platform team?", a: "Yes. Most engagements augment an existing team rather than replace it — we typically own observability architecture, SLO governance, and specific on-call shifts while your engineers retain deep product knowledge." },
];

const RELATED_SERVICES = {
  eyebrow: "Related Services",
  heading: "Explore More Ways Mirketa Supports Your Cloud Environment",
  intro: "Site reliability engineering is one part of a broader cloud operations story. Here's where to look next.",
  items: [
    { slug: CLOUD_PAGES.SETUP_MIGRATION.slug, label: CLOUD_PAGES.SETUP_MIGRATION.label, description: "Planning a migration first? Design the governed landing zone and cutover plan before workloads go live." },
    { slug: CLOUD_PAGES.INFRA_MANAGEMENT.slug, label: CLOUD_PAGES.INFRA_MANAGEMENT.label, description: "Pair SRE practices with ongoing infrastructure-as-code, Kubernetes operations, and cost optimization." },
    { slug: SERVICENOW_PAGES.TECHNOLOGY_WORKFLOWS.slug, label: SERVICENOW_PAGES.TECHNOLOGY_WORKFLOWS.label, description: "Route incident data into ServiceNow ITSM for unified IT operations and change management visibility." },
    { slug: AI_PAGES.AI_DATA_FOUNDATIONS.slug, label: AI_PAGES.AI_DATA_FOUNDATIONS.label, description: "Build the governed data foundation that keeps observability and analytics pipelines trustworthy at scale." },
    { slug: AI_PAGES.AI_READINESS.slug, label: AI_PAGES.AI_READINESS.label, description: "Assess whether your reliability and data foundations are ready to support AI-driven operations tooling." },
  ],
};

const CONSULTATION = {
  eyebrow: "Get Started",
  heading: "Get an SRE Readiness Review",
  description: "Tell us about your current monitoring setup, on-call model, and biggest reliability pain point — a site reliability engineer will follow up within one business day.",
  formTitle: "Get a Free SRE Readiness Review",
};

const SEO = {
  title: "Site Reliability Engineering Services | Mirketa",
  description:
    "Mirketa's Site Reliability Engineering Services deliver observability, on-call incident response, SLO management, and cloud security monitoring for live workloads.",
  canonical: `https://mirketa.us${CLOUD_PAGES.SITE_RELIABILITY_ENGINEERING.slug}/`,
  keywords: [
    "Site Reliability Engineering Services",
    "SRE Services",
    "SRE and Security Monitoring",
    "Cloud Observability",
    "Incident Response",
    "SLO Management",
    "On-Call Management",
    "Chaos Engineering",
    "Cloud Security Monitoring",
  ],
  schema: [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "Site Reliability Engineering Services",
      provider: { "@type": "Organization", name: "Mirketa Inc.", url: "https://mirketa.us" },
      name: "Site Reliability Engineering Services",
      description: "Observability, incident response, SLO and error budget management, chaos engineering, and cloud security monitoring for live cloud workloads.",
      areaServed: "Global",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://mirketa.us/" },
        { "@type": "ListItem", position: 2, name: CLOUD_PAGES.SITE_RELIABILITY_ENGINEERING.label, item: `https://mirketa.us${CLOUD_PAGES.SITE_RELIABILITY_ENGINEERING.slug}/` },
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

export default function SiteReliabilityEngineering() {
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

      gsap.utils.toArray(".sre-reveal").forEach((el) => {
        gsap.from(el, { opacity: prefersReduced ? 1 : 0, y: prefersReduced ? 0 : 32, duration: 0.7, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 88%" } });
      });
      gsap.utils.toArray(".sre-reveal-left").forEach((el) => {
        gsap.from(el, { opacity: prefersReduced ? 1 : 0, x: prefersReduced ? 0 : -30, duration: 0.7, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 88%" } });
      });
      gsap.utils.toArray(".sre-reveal-right").forEach((el) => {
        gsap.from(el, { opacity: prefersReduced ? 1 : 0, x: prefersReduced ? 0 : 30, duration: 0.7, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 88%" } });
      });
      gsap.utils.toArray(".sre-reveal-stagger").forEach((el) => {
        gsap.from(el.children, { opacity: prefersReduced ? 1 : 0, y: prefersReduced ? 0 : 26, duration: 0.6, stagger: 0.06, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 85%" } });
      });
      gsap.utils.toArray(".sre-zoom-in").forEach((el) => {
        gsap.from(el, { opacity: prefersReduced ? 1 : 0, scale: prefersReduced ? 1 : 0.94, duration: 0.6, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 88%" } });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="site-reliability-engineering">
      <Seo {...SEO} />
      <HeroSection heroTextRef={heroTextRef} heroRef={heroRef} />
      <TrustedByMarquee label="Trusted by SRE and Platform Engineering Teams" />
      <ChallengesSection />
      <SolutionSection />
      <CoreServicesSection />
      <FeaturesSection />
      <BenefitsSection />
      <ProcessSection />
      <TechnologiesSection />
      <WhyMirketaSection />
      <CaseStudySection />
      <FaqSection />
      <RelatedServices {...RELATED_SERVICES} className="sre-related sre-reveal" />
      <ConsultationSection {...CONSULTATION} />
      <StickyCta heroRef={heroRef} label="Get an SRE Readiness Review" />
    </div>
  );
}

// ============================================================
// HERO
// ============================================================

function HeroSection({ heroTextRef, heroRef }) {
  return (
    <section ref={heroRef} className="sre-hero" style={{ backgroundImage: `url("${Images.heroCloudSreSecurity}")` }} aria-label="Site Reliability Engineering Services by Mirketa">
      <div className="sre-hero__scrim" />
      <div className="container">
        <Breadcrumb items={BREADCRUMB_ITEMS} className="sre-breadcrumb" />
        <div className="sre-hero__inner">
          <div ref={heroTextRef} className="sre-hero__text">
            <span className="sre-badge">
              <span className="sre-badge__spark" aria-hidden="true">✦</span> {HERO.badge}
            </span>
            <h1>{HERO.title}</h1>
            <p className="sre-hero__description">{HERO.description}</p>
            <div className="sre-hero__ctas">
              <a href={HERO.primaryCta.href} className="btn btn-primary sre-btn">
                {HERO.primaryCta.label} <span aria-hidden="true">→</span>
              </a>
              <a href={HERO.secondaryCta.href} className="btn btn-secondary sre-btn">
                {HERO.secondaryCta.label}
              </a>
            </div>
            <ul className="sre-hero__metrics">
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
            className="sre-hero__visual sre-zoom-in"
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
    <section className="section sre-challenges" aria-labelledby="sre-challenges-heading">
      <div className="container">
        <div className="section-heading sre-reveal">
          <p className="sre-eyebrow">{CHALLENGES.eyebrow}</p>
          <h2 id="sre-challenges-heading">{CHALLENGES.heading}</h2>
          <p>{CHALLENGES.intro}</p>
        </div>
        <div className="sre-challenges__grid sre-reveal-stagger">
          {CHALLENGES.items.map((c) => (
            <div className="sre-challenge-card" key={c.title}>
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
// CLOUD SOLUTION OVERVIEW
// ============================================================

function SolutionSection() {
  return (
    <section className="section sre-solution" aria-labelledby="sre-solution-heading">
      <div className="container sre-solution__grid">
        <div className="sre-reveal-left">
          <img src={Images.illoCloudSreUptimeDashboard} alt="" aria-hidden="true" className="sre-solution__illo" loading="lazy" />
          <p className="sre-eyebrow">{SOLUTION.eyebrow}</p>
          <h2 id="sre-solution-heading">{SOLUTION.heading}</h2>
          {SOLUTION.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <div className="sre-reveal-right">
          <AnalyticsPanel
            title="Reliability Trend — Last 90 Days"
            donutPercent={95}
            donutLabel="Uptime SLO attainment across monitored services"
            metrics={[
              { value: "99.95%", label: "Uptime SLO" },
              { value: "22 min", label: "Avg. MTTR" },
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
    <section className="section sre-core" aria-labelledby="sre-core-heading">
      <div className="container">
        <div className="section-heading sre-reveal">
          <p className="sre-eyebrow">{CORE_SERVICES.eyebrow}</p>
          <h2 id="sre-core-heading">{CORE_SERVICES.heading}</h2>
          <p>{CORE_SERVICES.intro}</p>
        </div>
        <div className="sre-core__grid sre-reveal-stagger">
          {CORE_SERVICES.items.map((c) => (
            <div className="sre-core-card" key={c.title}>
              <span className="sre-core-card__icon">{c.icon}</span>
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
    <section className="section sre-features" aria-labelledby="sre-features-heading">
      <div className="container">
        <div className="section-heading sre-reveal">
          <p className="sre-eyebrow">{FEATURES.eyebrow}</p>
          <h2 id="sre-features-heading">{FEATURES.heading}</h2>
          <p>{FEATURES.intro}</p>
        </div>
        <div className="sre-features__layout">
          <div className="sre-features__grid sre-reveal-stagger">
            {FEATURES.items.map((f) => (
              <div className="sre-feature-item" key={f.title}>
                <p className="sre-card-title">{f.title}</p>
                <p>{f.description}</p>
              </div>
            ))}
          </div>
          <div className="sre-reveal-right">
            <WorkflowDiagram
              title="Incident Lifecycle"
              steps={[{ label: "Anomaly Detected" }, { label: "Alert Triaged" }, { label: "On-Call Paged" }, { label: "Root Cause ID'd" }, { label: "Remediated & Documented" }]}
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
    <section className="section sre-benefits" aria-labelledby="sre-benefits-heading">
      <div className="container">
        <div className="section-heading sre-reveal">
          <p className="sre-eyebrow">{BENEFITS.eyebrow}</p>
          <h2 id="sre-benefits-heading">{BENEFITS.heading}</h2>
          <p>{BENEFITS.intro}</p>
        </div>
        <div className="sre-benefits__stats sre-reveal-stagger">
          {BENEFITS.stats.map((s) => (
            <AnimatedCounter key={s.label} value={s.value} label={s.label} className="sre-stat" />
          ))}
        </div>
        <div className="sre-benefits__grid sre-reveal-stagger">
          {BENEFITS.items.map((b) => (
            <div className="sre-benefit-item" key={b.title}>
              <span aria-hidden="true">{Ico.check}</span>
              <div>
                <p className="sre-card-title">{b.title}</p>
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
// MIGRATION / IMPLEMENTATION PROCESS (SRE ONBOARDING)
// ============================================================

function ProcessSection() {
  return (
    <section className="section sre-process" aria-labelledby="sre-process-heading">
      <div className="container">
        <div className="section-heading sre-reveal">
          <p className="sre-eyebrow">{PROCESS.eyebrow}</p>
          <h2 id="sre-process-heading">{PROCESS.heading}</h2>
          <p>{PROCESS.intro}</p>
        </div>
        <div className="sre-zoom-in">
          <SupplyChainMap
            title="Incident Escalation Network"
            nodes={[
              { label: "On-Call Engineer (Primary)", short: "L1" },
              { label: "Secondary On-Call", short: "L2" },
              { label: "Service Owner", short: "SVC" },
              { label: "Security On-Call", short: "SEC" },
              { label: "Incident Commander", short: "IC" },
            ]}
          />
        </div>
        <div className="sre-process__grid sre-reveal-stagger">
          {PROCESS.detail.map((p, i) => (
            <div className="sre-step-card" key={p.name}>
              <span className="sre-step-card__num">{String(i + 1).padStart(2, "0")}</span>
              <p className="sre-card-title">{p.name}</p>
              <p>{p.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// TECHNOLOGIES SUPPORTED
// ============================================================

function TechnologiesSection() {
  return (
    <section className="section sre-tech" aria-labelledby="sre-tech-heading">
      <div className="container">
        <div className="section-heading sre-reveal">
          <p className="sre-eyebrow">{TECHNOLOGIES.eyebrow}</p>
          <h2 id="sre-tech-heading">{TECHNOLOGIES.heading}</h2>
          <p>{TECHNOLOGIES.intro}</p>
        </div>
        <div className="sre-tech__grid sre-reveal-stagger">
          {TECHNOLOGIES.items.map((t) => (
            <div className="sre-tech-card" key={t.title}>
              <span className="sre-tech-card__icon">{t.icon}</span>
              <p className="sre-card-title">{t.title}</p>
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
    <section className="section sre-why" aria-labelledby="sre-why-heading">
      <div className="container">
        <div className="section-heading sre-reveal">
          <p className="sre-eyebrow">{WHY_MIRKETA.eyebrow}</p>
          <h2 id="sre-why-heading">{WHY_MIRKETA.heading}</h2>
          <p>{WHY_MIRKETA.intro}</p>
        </div>
        <div className="sre-why__grid sre-reveal-stagger">
          {WHY_MIRKETA.items.map((w) => (
            <div className="sre-why-card" key={w.title}>
              <span className="sre-why-card__icon">{w.icon}</span>
              <p className="sre-card-title">{w.title}</p>
              <p>{w.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// CASE STUDY / CUSTOMER SUCCESS
// ============================================================

function CaseStudySection() {
  return (
    <section className="section sre-cases" aria-labelledby="sre-cases-heading">
      <div className="container">
        <div className="section-heading sre-reveal">
          <p className="sre-eyebrow">{CASE_STUDIES.eyebrow}</p>
          <h2 id="sre-cases-heading">{CASE_STUDIES.heading}</h2>
          <p>{CASE_STUDIES.intro}</p>
        </div>
        <div className="sre-cases__grid sre-reveal-stagger">
          {CASE_STUDIES.cases.map((c) => (
            <div className="sre-case-card" key={c.title}>
              <span className="sre-case-card__tag">{c.industry}</span>
              <p className="sre-card-title">{c.title}</p>
              <dl className="sre-case-card__fields">
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
    <section className="section sre-faq" aria-labelledby="sre-faq-heading">
      <div className="container">
        <div className="section-heading sre-reveal">
          <p className="sre-eyebrow">FAQ</p>
          <h2 id="sre-faq-heading">Frequently Asked Questions About Site Reliability Engineering Services</h2>
        </div>
        <FaqAccordion items={FAQS} className="sre-reveal" searchPlaceholder="Ask a question — e.g. &quot;SLO&quot;, &quot;on-call&quot;, &quot;chaos engineering&quot;..." />
        <p className="sre-faq__links">
          Related reading: <Link to={CLOUD_PAGES.SETUP_MIGRATION.slug}>{CLOUD_PAGES.SETUP_MIGRATION.label}</Link>,{" "}
          <Link to={CLOUD_PAGES.INFRA_MANAGEMENT.slug}>{CLOUD_PAGES.INFRA_MANAGEMENT.label}</Link>,{" "}
          <Link to={SERVICENOW_PAGES.TECHNOLOGY_WORKFLOWS.slug}>{SERVICENOW_PAGES.TECHNOLOGY_WORKFLOWS.label}</Link>,{" "}
          <Link to={AI_PAGES.AI_DATA_FOUNDATIONS.slug}>{AI_PAGES.AI_DATA_FOUNDATIONS.label}</Link>.
        </p>
      </div>
    </section>
  );
}
