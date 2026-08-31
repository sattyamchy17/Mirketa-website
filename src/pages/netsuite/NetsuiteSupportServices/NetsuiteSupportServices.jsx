import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { NETSUITE_PAGES, ORACLE_PAGES, SERVICENOW_PAGES, SALESFORCE_PAGES, CLOUD_PAGES } from "../../../config/pageSlugs.js";
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
import FinanceChart from "../../../components/illustrations/FinanceChart/FinanceChart.jsx";
import SupplyChainMap from "../../../components/illustrations/SupplyChainMap/SupplyChainMap.jsx";
import "./NetsuiteSupportServices.css";

gsap.registerPlugin(ScrollTrigger);

// ============================================================
// ICONS
// ============================================================

const Ico = {
  check: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12.5l5 5L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  headset: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 13v-1a8 8 0 0116 0v1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><rect x="3" y="13" width="4" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4" /><rect x="17" y="13" width="4" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4" /><path d="M19 19v1a2 2 0 01-2 2h-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
  ),
  clock: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" /><path d="M12 7v5l3.5 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
  ),
  pulse: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 12h4l2-7 4 14 2-7h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  refresh: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 12a8 8 0 0113.9-5.4M20 12a8 8 0 01-13.9 5.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><path d="M18 3v4h-4M6 21v-4h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  code: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 8l-5 4 5 4M15 8l5 4-5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  gear: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.4" /><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  award: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="8" r="5" stroke="currentColor" strokeWidth="1.4" /><path d="M8.5 12.5L7 21l5-2.5L17 21l-1.5-8.5" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  compass: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" /><path d="M15 9l-2 6-6 2 2-6 6-2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  report: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 3h9l3 3v15H6V3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="M9 13l2-2 2 2 3-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  users: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="9" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.4" /><path d="M3.5 19c.6-3.4 2.9-5.2 5.5-5.2s4.9 1.8 5.5 5.2" stroke="currentColor" strokeWidth="1.4" /><circle cx="17" cy="9" r="2.6" stroke="currentColor" strokeWidth="1.3" opacity="0.7" /><path d="M15.5 13.4c2.2.3 3.7 1.9 4 4.6" stroke="currentColor" strokeWidth="1.3" opacity="0.7" /></svg>
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
  alert: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3l10 18H2L12 3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M12 10v4M12 17h.01" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
  ),
};

// ============================================================
// DATA
// ============================================================

const BREADCRUMB_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Platforms & Technology", href: "/" },
  { label: NETSUITE_PAGES.SUPPORT_SERVICES.label },
];

const HERO = {
  badge: "NetSuite Support & Managed Services Provider",
  title: "NetSuite Support Services for Teams Running a Live Production Instance",
  description:
    "Mirketa's NetSuite Support Services keep an already-live NetSuite account healthy after go-live — SLA-backed ticket resolution, proactive monitoring, and a SuiteScript enhancement backlog that actually gets worked, so your internal team stops being the accidental NetSuite administrator on top of their real job.",
  primaryCta: { label: "Talk to a NetSuite Support Specialist", href: "#contact" },
  secondaryCta: { label: "Compare Our SLA Tiers", href: "#contact" },
  metrics: ["24/7 Coverage for P1 Incidents", "SuiteCloud-Certified Support Engineers", "Semi-Annual Release Regression Testing", "Avg. First Response Under 2 Hours"],
};

const HERO_DASHBOARD = {
  title: "NetSuite Support Operations Center",
  stats: [
    { label: "SLA ADHERENCE", value: "98.7%", caption: "Trailing 12 months" },
    { label: "AVG FIRST RESPONSE", value: "1.8 hrs", caption: "All priority tiers" },
    { label: "OPEN TICKETS", value: "11", caption: "Across active accounts" },
  ],
  rows: [
    { title: "P1 — Approval workflow failing in production", meta: "Escalated to L3 · SuiteScript review", tone: "attention", status: "In Progress" },
    { title: "2026.1 release preview regression pass", meta: "Sandbox validated against customizations", tone: "good", status: "Complete" },
    { title: "Monthly close saved search error", meta: "L2 · Root cause identified", tone: "neutral", status: "Assigned" },
  ],
  floatingCards: [
    { icon: Ico.clock, title: "1.8 hr Avg Response", subtitle: "Across all priority tiers" },
    { icon: Ico.shield, title: "99.9% Uptime Watch", subtitle: "24/7 proactive monitoring" },
  ],
};

const CHALLENGES = {
  eyebrow: "Business Challenges",
  heading: "What Happens to a NetSuite Instance Without Dedicated Support",
  intro:
    "Most companies don't think about NetSuite support until the instance they went live with two years ago starts showing cracks. A saved search someone built for a one-off report is now load-bearing. A SuiteFlow that worked fine at 50 employees times out at 300. Nobody on staff owns any of it full-time, so problems get triaged by whoever has ten free minutes — which usually means they don't get triaged at all until a controller or ops director escalates loudly enough.",
  items: [
    { title: "Tickets Pile Up With No NetSuite-Specialized Owner", description: "Internal IT can reset a password but can't debug a SuiteScript error, so NetSuite issues sit in a general helpdesk queue behind requests that have nothing to do with your ERP." },
    { title: "The Enhancement Backlog Nobody Is Assigned To", description: "Every department has a list of \"it would be great if NetSuite could...\" requests, but with no dedicated developer capacity, that backlog just grows instead of shrinking." },
    { title: "Upgrades That Break Customizations Without Warning", description: "NetSuite's semi-annual releases can silently affect custom SuiteScript, workflows, and saved searches if nobody runs a regression pass in sandbox before the release hits production." },
    { title: "Issues Surface Only When a User Complains", description: "Without proactive monitoring, a failed scheduled script or a stuck integration queue goes unnoticed until someone downstream notices their numbers don't add up." },
  ],
};

const SOLUTION = {
  eyebrow: "Our Solution",
  heading: "A Managed Support Model Built for an Instance That's Already Live",
  paragraphs: [
    "Mirketa's NetSuite Support Services start from a simple premise: your instance is already configured, your users are already trained, and what you need now is a team that treats it like production infrastructure — not a project. That means we start every engagement with a baseline audit of your account: which SuiteScripts and SuiteFlows are custom, which saved searches drive real reporting decisions, where the integration touchpoints are, and which workflows are business-critical versus nice-to-have.",
    "From there, support runs on defined SLA tiers with real accountability. A payroll approval workflow that stops routing is not the same priority as a cosmetic form label issue, and our ticketing process reflects that from the moment a ticket is logged. Every ticket gets triaged by someone who actually reads NetSuite's release notes, not a generalist help-desk agent reading from a script — which is also why our NetSuite Managed Services model routes tickets by specialization rather than by whoever is next in a round-robin queue.",
    "We also treat NetSuite's twice-yearly release cycle as a planned event rather than a surprise. Before any release preview window closes, we run your customizations against the upgraded sandbox, flag anything that regresses, and file the fixes before the release ever reaches your production account. Between releases, our SuiteAnalytics dashboards and scheduled health checks catch failed script executions, stuck integration records, and permission drift before they turn into a support ticket from a frustrated end user.",
  ],
};

const FEATURES = {
  eyebrow: "Key Features",
  heading: "What's Included in NetSuite Support Services",
  intro: "These are the capability areas every Mirketa support engagement is built around — priced and scoped for an instance that's already live, not a fresh implementation.",
  items: [
    { icon: Ico.headset, title: "L1–L3 Ticket Triage & Resolution", description: "Every ticket is triaged against your account's specific configuration and routed to the right specialist tier — from password and access requests up through SuiteScript debugging." },
    { icon: Ico.clock, title: "SLA-Backed Response Times", description: "Defined response and resolution windows by priority, published in your contract and tracked against real ticket data, not a vague \"we'll get to it\" promise." },
    { icon: Ico.pulse, title: "Proactive Health Monitoring & Alerting", description: "Scheduled script failures, stuck integration queues, and unusual saved search load are flagged before they become a ticket your users have to file." },
    { icon: Ico.refresh, title: "Semi-Annual Release & Upgrade Management", description: "Full regression testing of your customizations against NetSuite's release preview account before every upgrade reaches production." },
    { icon: Ico.code, title: "SuiteScript & SuiteFlow Enhancement Delivery", description: "A managed backlog of custom development requests, estimated, prioritized with your stakeholders, and delivered on a predictable cadence instead of sitting untouched." },
    { icon: Ico.gear, title: "NetSuite Administration-as-a-Service", description: "Day-to-day configuration work — new roles, saved searches, custom fields, form changes — handled by certified administrators without adding headcount." },
  ],
};

const BENEFITS = {
  eyebrow: "Benefits",
  heading: "What Changes Once NetSuite Support Is Actually Owned",
  intro: "These are the outcomes Mirketa's NetSuite Support Services clients consistently report within the first two quarters of an engagement.",
  stats: [
    { value: "98.7%", label: "SLA Adherence Rate" },
    { value: "1.8", label: "Avg. Hours to First Response" },
    { value: "42%", label: "Fewer Recurring Break-Fix Tickets" },
    { value: "96%", label: "Client Retention Beyond Year One" },
  ],
  items: [
    { title: "No More Ad Hoc NetSuite Fire Drills", description: "Issues get caught by proactive monitoring or resolved inside a defined SLA window instead of turning into an all-hands scramble every few weeks." },
    { title: "A Backlog That Actually Moves", description: "SuiteScript and SuiteFlow requests get estimated, scheduled, and delivered on a predictable cadence instead of accumulating in a spreadsheet nobody reviews." },
    { title: "Upgrades You See Coming", description: "Regression testing against the release preview account means you know what a NetSuite upgrade will touch weeks before it reaches production." },
    { title: "One Team That Knows Your Customizations", description: "The same support engineers who resolved last quarter's tickets already understand your chart of accounts, your workflows, and why they were built that way." },
  ],
};

const SERVICES_INCLUDED = {
  eyebrow: "Services Included",
  heading: "Every NetSuite Managed Services Engagement Includes",
  intro: "NetSuite support is more than a help desk ticket queue. These are the discrete service lines Mirketa delivers as part of every managed services engagement.",
  items: [
    { title: "L1–L3 Help Desk Support", description: "Tiered support from basic access and navigation questions through deep SuiteScript and integration debugging, all under one ticketing system." },
    { title: "Release & Upgrade Management", description: "Sandbox regression testing, release note review, and coordinated go-live for every semi-annual NetSuite upgrade." },
    { title: "Proactive Monitoring & Health Checks", description: "Scheduled reviews of script execution logs, integration queues, and user permission changes, plus real-time alerting on failures." },
    { title: "Enhancement & Custom Development Backlog", description: "A managed intake, estimation, and delivery process for new SuiteScript, SuiteFlow, and saved search requests." },
    { title: "NetSuite Administration-as-a-Service", description: "Ongoing configuration support — roles, forms, custom fields, approval limits — handled by certified administrators on your behalf." },
    { title: "Quarterly Business Reviews & Optimization Roadmap", description: "A recurring review of ticket trends, backlog health, and an evolving roadmap of configuration improvements worth prioritizing next." },
  ],
  chart: {
    title: "Monthly Ticket Volume & SLA Trend",
    kpis: [
      { value: "98.7%", label: "SLA adherence" },
      { value: "-31%", label: "Ticket volume, 6 months" },
    ],
    bars: [42, 38, 35, 30, 27, 24],
  },
};

const PROCESS = {
  eyebrow: "Support Engagement Onboarding",
  heading: "How a NetSuite Support Services Engagement Gets Started",
  intro: "There's no re-implementation and no downtime. Onboarding into Mirketa's NetSuite Support Services is designed to be invisible to your end users while giving our team everything it needs to support your instance from day one.",
  supplyChain: {
    title: "Your Support Escalation Path",
    nodes: [
      { label: "NetSuite Production Instance", short: "NS" },
      { label: "L1 Help Desk", short: "L1" },
      { label: "L2 Functional Specialists", short: "L2" },
      { label: "L3 SuiteScript Engineers", short: "L3" },
      { label: "Account & QBR Team", short: "QBR" },
    ],
  },
  detail: [
    { name: "Environment & Documentation Handover", description: "Access provisioning to your sandbox and production accounts, plus a review of any existing runbooks, customizations, and integration documentation." },
    { name: "Baseline Health Assessment", description: "An audit of active SuiteScripts, SuiteFlows, saved searches, and integration touchpoints to establish what's business-critical versus incidental." },
    { name: "SLA & Escalation Setup", description: "Priority definitions, response windows, and escalation contacts are documented and agreed before the first ticket is ever logged." },
    { name: "Ticketing System Integration", description: "Your team gets a dedicated intake channel — email, portal, or your existing ITSM tool — routed directly into our NetSuite-specialized queue." },
    { name: "Steady-State Support", description: "Day-to-day ticket resolution, monitoring, and enhancement delivery begin running on the agreed SLA cadence." },
    { name: "Quarterly Optimization Review", description: "A recurring checkpoint to review ticket trends, backlog progress, and upcoming release considerations with your stakeholders." },
  ],
};

const WHY_MIRKETA = {
  eyebrow: "Why Mirketa",
  heading: "Why Teams Choose Mirketa for NetSuite Managed Services",
  intro: "Plenty of vendors will sell a generic help-desk retainer against your NetSuite account. Fewer route every ticket through someone who actually holds a SuiteCloud certification.",
  items: [
    { icon: Ico.award, title: "SuiteCloud-Certified Support Engineers", description: "Every support engineer on your account holds an active NetSuite certification relevant to the module they're supporting." },
    { icon: Ico.clock, title: "SLA-Backed Support You Can Hold Us To", description: "Response and resolution windows are documented in your contract and reported on every quarter — not adjusted after the fact." },
    { icon: Ico.compass, title: "We Learn Your Customizations, Not Just NetSuite", description: "Onboarding includes a real audit of your specific scripts, workflows, and saved searches before we ever touch a ticket." },
    { icon: Ico.shield, title: "Release Testing Before It Touches Production", description: "Every semi-annual NetSuite upgrade is regression-tested against your customizations in sandbox before go-live." },
    { icon: Ico.report, title: "Transparent Ticket Visibility", description: "You see the same ticket queue, SLA metrics, and backlog status we do — no monthly summary you have to take on faith." },
  ],
};

const INDUSTRIES = {
  eyebrow: "Industry Solutions",
  heading: "NetSuite Support Experience Across Industries",
  intro: "Every industry stresses a NetSuite instance differently — high transaction volume, complex revenue recognition, multi-entity consolidation — and our support engineers bring that context into every ticket.",
  items: [
    { icon: Ico.code, title: "Software & SaaS" },
    { icon: Ico.factory, title: "Wholesale Distribution" },
    { icon: Ico.users, title: "Professional Services" },
    { icon: Ico.cart, title: "Retail" },
    { icon: Ico.bank, title: "Financial Services" },
    { icon: Ico.gear, title: "Manufacturing" },
  ],
};

const CASE_STUDIES = {
  eyebrow: "Case Study / Results",
  heading: "Real NetSuite Support Services Outcomes",
  intro: "Anonymized results from recent NetSuite managed services engagements across industries.",
  cases: [
    {
      title: "Distribution Company Cuts Recurring Ticket Volume by 40% After Moving to Managed Support",
      industry: "Wholesale Distribution",
      challenge: "A single internal admin was covering NetSuite support alongside three other job functions, and recurring issues with the same three workflows kept resurfacing every few weeks.",
      solution: "Mirketa's support team ran a root-cause review of the recurring tickets, rebuilt the underlying SuiteFlow logic, and put proactive monitoring in place around the affected processes.",
      outcome: "Recurring ticket volume dropped 40% within two quarters, and the internal admin was freed up to focus on cross-departmental projects.",
    },
    {
      title: "SaaS Company Clears an 18-Month SuiteScript Backlog in Two Quarters",
      industry: "Software & SaaS",
      challenge: "A backlog of over 30 requested SuiteScript and SuiteFlow enhancements had accumulated over a year and a half with no dedicated developer capacity to work through it.",
      solution: "We triaged the backlog by business impact, assigned dedicated development hours each sprint, and delivered enhancements on a published cadence with stakeholder sign-off.",
      outcome: "The full backlog was cleared in two quarters, and new requests are now delivered within an average of three weeks of approval.",
    },
  ],
};

const FAQS = [
  { q: "What SLA tiers does Mirketa offer for NetSuite support?", a: "We typically structure NetSuite Support Services around three priority tiers — P1 (production down or business-critical process blocked), P2 (degraded functionality with a workaround), and P3 (cosmetic or non-urgent requests) — each with published response and resolution targets documented in your contract." },
  { q: "What counts as a P1 issue?", a: "A P1 is any issue that stops a business-critical process outright — a failed payroll approval workflow, a broken revenue recognition schedule, or an integration outage blocking order processing. P1 tickets get our fastest response commitment, typically under an hour during business hours and with defined after-hours coverage for true production outages." },
  { q: "How fast is your average first response time?", a: "Across all priority tiers, our trailing 12-month average first response time is under two hours. Higher-priority tickets are addressed considerably faster than that blended average." },
  { q: "How are NetSuite upgrades handled under a support contract?", a: "We regression-test your specific customizations against NetSuite's release preview account before every semi-annual upgrade, document anything that will be affected, and remediate issues before the release reaches your production account — not after." },
  { q: "What's the pricing model for NetSuite Support Services?", a: "Most engagements run on a monthly retainer sized to your ticket volume and administration needs, with a defined block of hours for enhancement development. Overage and one-off project work is quoted transparently rather than billed against a vague hourly rate." },
  { q: "How long does onboarding take before support actually starts?", a: "A typical onboarding — environment access, baseline health assessment, SLA setup, and ticketing integration — takes two to three weeks. Basic ticket intake can usually begin sooner while the deeper account audit continues in parallel." },
  { q: "Can you support an instance you didn't originally implement?", a: "Yes, this is the majority of our NetSuite Support Services engagements. Onboarding always includes an audit of existing customizations, workflows, and integrations regardless of who originally built them." },
  { q: "Do you handle new SuiteScript development, or only break-fix tickets?", a: "Both. Support contracts include a managed enhancement backlog for new SuiteScript, SuiteFlow, and reporting requests, in addition to standard break-fix ticket resolution." },
];

const RELATED_SERVICES = {
  eyebrow: "Related Services",
  heading: "Explore More Ways Mirketa Supports Finance & Operations Technology",
  intro: "NetSuite support is one part of a broader technology strategy. Here's where to look next.",
  items: [
    { slug: NETSUITE_PAGES.IMPLEMENTATION.slug, label: NETSUITE_PAGES.IMPLEMENTATION.label, description: "Planning a new rollout or a re-implementation? See how Mirketa scopes and delivers a NetSuite go-live." },
    { slug: NETSUITE_PAGES.AI.slug, label: NETSUITE_PAGES.AI.label, description: "Layer AI-assisted forecasting, anomaly detection, and reporting on top of the NetSuite instance we're already supporting." },
    { slug: ORACLE_PAGES.MANAGED_SERVICES.slug, label: ORACLE_PAGES.MANAGED_SERVICES.label, description: "Running Oracle alongside or instead of NetSuite? Compare our managed services approach for Oracle environments." },
    { slug: SERVICENOW_PAGES.SUPPORT_MANAGED_SERVICES.slug, label: SERVICENOW_PAGES.SUPPORT_MANAGED_SERVICES.label, description: "Extend the same SLA-backed support model to your ServiceNow instance." },
    { slug: CLOUD_PAGES.INFRA_MANAGEMENT.slug, label: CLOUD_PAGES.INFRA_MANAGEMENT.label, description: "Manage the cloud infrastructure and integrations that sit around your NetSuite environment." },
    { slug: SALESFORCE_PAGES.DEVELOPER_SERVICES.slug, label: SALESFORCE_PAGES.DEVELOPER_SERVICES.label, description: "Keep the Salesforce side of your quote-to-cash stack supported alongside your NetSuite general ledger." },
  ],
};

const CONSULTATION = {
  eyebrow: "Get Started",
  heading: "Get NetSuite Support Services On Your Terms",
  description: "Tell us about your current ticket volume, backlog, and pain points — a certified NetSuite support lead will follow up within one business day with SLA tiers and pricing.",
  formTitle: "Request a NetSuite Support Services Quote",
};

const SEO = {
  title: "NetSuite Support Services | Mirketa",
  description:
    "Mirketa's NetSuite Support Services deliver SLA-backed ticket resolution, proactive monitoring, and release management for live NetSuite instances.",
  canonical: `https://mirketa.us${NETSUITE_PAGES.SUPPORT_SERVICES.slug}/`,
  keywords: [
    "NetSuite Support Services",
    "NetSuite Managed Services",
    "NetSuite Administration Services",
    "NetSuite SLA Support",
    "NetSuite Release Management",
    "NetSuite Help Desk",
    "SuiteScript Support",
    "NetSuite Admin as a Service",
  ],
  schema: [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "NetSuite Support Services",
      provider: { "@type": "Organization", name: "Mirketa Inc.", url: "https://mirketa.us" },
      name: "NetSuite Support Services",
      description: "SLA-backed NetSuite support, proactive monitoring, release management, and administration-as-a-service for live NetSuite instances.",
      areaServed: "Global",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://mirketa.us/" },
        { "@type": "ListItem", position: 2, name: NETSUITE_PAGES.SUPPORT_SERVICES.label, item: `https://mirketa.us${NETSUITE_PAGES.SUPPORT_SERVICES.slug}/` },
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

export default function NetsuiteSupportServices() {
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

      gsap.utils.toArray(".nss-reveal").forEach((el) => {
        gsap.from(el, { opacity: prefersReduced ? 1 : 0, y: prefersReduced ? 0 : 32, duration: 0.7, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 88%" } });
      });
      gsap.utils.toArray(".nss-reveal-left").forEach((el) => {
        gsap.from(el, { opacity: prefersReduced ? 1 : 0, x: prefersReduced ? 0 : -30, duration: 0.7, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 88%" } });
      });
      gsap.utils.toArray(".nss-reveal-right").forEach((el) => {
        gsap.from(el, { opacity: prefersReduced ? 1 : 0, x: prefersReduced ? 0 : 30, duration: 0.7, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 88%" } });
      });
      gsap.utils.toArray(".nss-reveal-stagger").forEach((el) => {
        gsap.from(el.children, { opacity: prefersReduced ? 1 : 0, y: prefersReduced ? 0 : 26, duration: 0.6, stagger: 0.06, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 85%" } });
      });
      gsap.utils.toArray(".nss-zoom-in").forEach((el) => {
        gsap.from(el, { opacity: prefersReduced ? 1 : 0, scale: prefersReduced ? 1 : 0.94, duration: 0.6, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 88%" } });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="netsuite-support-services">
      <Seo {...SEO} />
      <HeroSection heroTextRef={heroTextRef} heroRef={heroRef} />
      <TrustedByMarquee label="Trusted by Finance & Operations Teams Running NetSuite in Production" />
      <ChallengesSection />
      <SolutionSection />
      <FeaturesSection />
      <BenefitsSection />
      <ServicesIncludedSection />
      <ProcessSection />
      <WhyMirketaSection />
      <IndustriesSection />
      <CaseStudySection />
      <FaqSection />
      <RelatedServices {...RELATED_SERVICES} className="nss-related nss-reveal" />
      <ConsultationSection {...CONSULTATION} />
      <StickyCta heroRef={heroRef} label="Talk to a NetSuite Support Specialist" />
    </div>
  );
}

// ============================================================
// HERO
// ============================================================

function HeroSection({ heroTextRef, heroRef }) {
  return (
    <section ref={heroRef} className="nss-hero" style={{ backgroundImage: `url("${Images.heroNetSuiteSupportServices}")` }} aria-label="NetSuite Support Services by Mirketa">
      <div className="nss-hero__scrim" />
      <div className="container">
        <Breadcrumb items={BREADCRUMB_ITEMS} className="nss-breadcrumb" />
        <div className="nss-hero__inner">
          <div ref={heroTextRef} className="nss-hero__text">
            <span className="nss-badge">
              <span className="nss-badge__spark" aria-hidden="true">✦</span> {HERO.badge}
            </span>
            <h1>{HERO.title}</h1>
            <p className="nss-hero__description">{HERO.description}</p>
            <div className="nss-hero__ctas">
              <a href={HERO.primaryCta.href} className="btn btn-primary nss-btn">
                {HERO.primaryCta.label} <span aria-hidden="true">→</span>
              </a>
              <a href={HERO.secondaryCta.href} className="btn btn-secondary nss-btn">
                {HERO.secondaryCta.label}
              </a>
            </div>
            <ul className="nss-hero__metrics">
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
            className="nss-hero__visual nss-zoom-in"
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
    <section className="section nss-challenges" aria-labelledby="nss-challenges-heading">
      <div className="container">
        <div className="section-heading nss-reveal">
          <p className="nss-eyebrow">{CHALLENGES.eyebrow}</p>
          <h2 id="nss-challenges-heading">{CHALLENGES.heading}</h2>
          <p>{CHALLENGES.intro}</p>
        </div>
        <div className="nss-challenges__grid nss-reveal-stagger">
          {CHALLENGES.items.map((c) => (
            <div className="nss-challenge-card" key={c.title}>
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
// OUR SOLUTION
// ============================================================

function SolutionSection() {
  return (
    <section className="section nss-solution" aria-labelledby="nss-solution-heading">
      <div className="container nss-solution__grid">
        <div className="nss-reveal-left">
          <p className="nss-eyebrow">{SOLUTION.eyebrow}</p>
          <h2 id="nss-solution-heading">{SOLUTION.heading}</h2>
          {SOLUTION.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
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
  const [big, ...rest] = FEATURES.items;
  return (
    <section className="section nss-features" aria-labelledby="nss-features-heading">
      <div className="container">
        <div className="section-heading nss-reveal">
          <p className="nss-eyebrow">{FEATURES.eyebrow}</p>
          <h2 id="nss-features-heading">{FEATURES.heading}</h2>
          <p>{FEATURES.intro}</p>
        </div>
        <div className="nss-features__top nss-reveal-stagger">
          <div className="nss-feature-card nss-feature-card--big">
            <span className="nss-feature-card__icon">{big.icon}</span>
            <h3>{big.title}</h3>
            <p>{big.description}</p>
          </div>
          <WorkflowDiagram
            title="Ticket Lifecycle"
            steps={[
              { label: "Ticket logged" },
              { label: "Triaged & prioritized" },
              { label: "Assigned to specialist" },
              { label: "Fixed & tested" },
              { label: "Closed with root cause" },
            ]}
          />
        </div>
        <div className="nss-features__grid nss-reveal-stagger">
          {rest.map((f) => (
            <div className="nss-feature-card" key={f.title}>
              <span className="nss-feature-card__icon">{f.icon}</span>
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
    <section className="section nss-benefits" aria-labelledby="nss-benefits-heading">
      <div className="container">
        <div className="section-heading nss-reveal">
          <p className="nss-eyebrow">{BENEFITS.eyebrow}</p>
          <h2 id="nss-benefits-heading">{BENEFITS.heading}</h2>
          <p>{BENEFITS.intro}</p>
        </div>
        <div className="nss-benefits__stats nss-reveal-stagger">
          {BENEFITS.stats.map((s) => (
            <AnimatedCounter key={s.label} value={s.value} label={s.label} className="nss-stat" />
          ))}
        </div>
        <div className="nss-benefits__grid nss-reveal-stagger">
          {BENEFITS.items.map((b) => (
            <div className="nss-benefit-item" key={b.title}>
              <span aria-hidden="true">{Ico.check}</span>
              <div>
                <p className="nss-benefit-item__title">{b.title}</p>
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
// SERVICES INCLUDED
// ============================================================

function ServicesIncludedSection() {
  return (
    <section className="section nss-services" aria-labelledby="nss-services-heading">
      <div className="container">
        <div className="section-heading nss-reveal">
          <p className="nss-eyebrow">{SERVICES_INCLUDED.eyebrow}</p>
          <h2 id="nss-services-heading">{SERVICES_INCLUDED.heading}</h2>
          <p>{SERVICES_INCLUDED.intro}</p>
        </div>
        <div className="nss-services__layout">
          <div className="nss-services__list nss-reveal-stagger">
            {SERVICES_INCLUDED.items.map((s) => (
              <div className="nss-service-item" key={s.title}>
                <p className="nss-service-item__title">{s.title}</p>
                <p>{s.description}</p>
              </div>
            ))}
          </div>
          <div className="nss-reveal-right">
            <FinanceChart title={SERVICES_INCLUDED.chart.title} kpis={SERVICES_INCLUDED.chart.kpis} bars={SERVICES_INCLUDED.chart.bars} />
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// SUPPORT ENGAGEMENT ONBOARDING (IMPLEMENTATION PROCESS)
// ============================================================

function ProcessSection() {
  return (
    <section className="section nss-process" aria-labelledby="nss-process-heading">
      <div className="container">
        <div className="section-heading nss-reveal">
          <p className="nss-eyebrow">{PROCESS.eyebrow}</p>
          <h2 id="nss-process-heading">{PROCESS.heading}</h2>
          <p>{PROCESS.intro}</p>
        </div>
        <div className="nss-zoom-in">
          <SupplyChainMap title={PROCESS.supplyChain.title} nodes={PROCESS.supplyChain.nodes} />
        </div>
        <div className="nss-process__grid nss-reveal-stagger">
          {PROCESS.detail.map((p, i) => (
            <div className="nss-step-card" key={p.name}>
              <span className="nss-step-card__num">{String(i + 1).padStart(2, "0")}</span>
              <p className="nss-step-card__title">{p.name}</p>
              <p>{p.description}</p>
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
    <section className="section nss-why" aria-labelledby="nss-why-heading">
      <div className="container">
        <div className="section-heading nss-reveal">
          <p className="nss-eyebrow">{WHY_MIRKETA.eyebrow}</p>
          <h2 id="nss-why-heading">{WHY_MIRKETA.heading}</h2>
          <p>{WHY_MIRKETA.intro}</p>
        </div>
        <div className="nss-why__grid nss-reveal-stagger">
          {WHY_MIRKETA.items.map((w) => (
            <div className="nss-why-card" key={w.title}>
              <span className="nss-why-card__icon">{w.icon}</span>
              <p className="nss-why-card__title">{w.title}</p>
              <p>{w.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// INDUSTRY SOLUTIONS
// ============================================================

function IndustriesSection() {
  return (
    <section className="section nss-industries" aria-labelledby="nss-industries-heading">
      <div className="container">
        <div className="section-heading nss-reveal">
          <p className="nss-eyebrow">{INDUSTRIES.eyebrow}</p>
          <h2 id="nss-industries-heading">{INDUSTRIES.heading}</h2>
          <p>{INDUSTRIES.intro}</p>
        </div>
        <div className="nss-industries__grid nss-reveal-stagger">
          {INDUSTRIES.items.map((n) => (
            <div className="nss-industry-card" key={n.title}>
              <span className="nss-industry-card__icon">{n.icon}</span>
              <p className="nss-industry-card__title">{n.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// CASE STUDY / RESULTS
// ============================================================

function CaseStudySection() {
  return (
    <section className="section nss-cases" aria-labelledby="nss-cases-heading">
      <div className="container">
        <div className="section-heading nss-reveal">
          <p className="nss-eyebrow">{CASE_STUDIES.eyebrow}</p>
          <h2 id="nss-cases-heading">{CASE_STUDIES.heading}</h2>
          <p>{CASE_STUDIES.intro}</p>
        </div>
        <div className="nss-cases__grid nss-reveal-stagger">
          {CASE_STUDIES.cases.map((c) => (
            <div className="nss-case-card" key={c.title}>
              <span className="nss-case-card__tag">{c.industry}</span>
              <h3>{c.title}</h3>
              <dl className="nss-case-card__fields">
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
    <section className="section nss-faq" aria-labelledby="nss-faq-heading">
      <div className="container">
        <div className="section-heading nss-reveal">
          <p className="nss-eyebrow">FAQ</p>
          <h2 id="nss-faq-heading">Frequently Asked Questions About NetSuite Support Services</h2>
        </div>
        <FaqAccordion items={FAQS} className="nss-reveal" searchPlaceholder="Ask a question — e.g. &quot;SLA&quot;, &quot;response time&quot;, &quot;pricing&quot;..." />
        <p className="nss-faq__links">
          Related reading: <Link to={NETSUITE_PAGES.IMPLEMENTATION.slug}>{NETSUITE_PAGES.IMPLEMENTATION.label}</Link>,{" "}
          <Link to={NETSUITE_PAGES.AI.slug}>{NETSUITE_PAGES.AI.label}</Link>,{" "}
          <Link to={ORACLE_PAGES.MANAGED_SERVICES.slug}>{ORACLE_PAGES.MANAGED_SERVICES.label}</Link>,{" "}
          <Link to={SERVICENOW_PAGES.SUPPORT_MANAGED_SERVICES.slug}>{SERVICENOW_PAGES.SUPPORT_MANAGED_SERVICES.label}</Link>,{" "}
          <Link to={CLOUD_PAGES.INFRA_MANAGEMENT.slug}>{CLOUD_PAGES.INFRA_MANAGEMENT.label}</Link>.
        </p>
      </div>
    </section>
  );
}
