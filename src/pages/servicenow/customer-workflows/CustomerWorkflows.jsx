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
import "./CustomerWorkflows.css";

gsap.registerPlugin(ScrollTrigger);

// ============================================================
// ICONS
// ============================================================

const Ico = {
  check: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12.5l5 5L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  headset: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 13a8 8 0 0116 0v4" stroke="currentColor" strokeWidth="1.5" /><rect x="3" y="13" width="4" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4" /><rect x="17" y="13" width="4" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4" /></svg>
  ),
  truck: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 7h11v9H3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M14 11h4l3 3v2h-7z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><circle cx="7" cy="18" r="1.6" stroke="currentColor" strokeWidth="1.3" /><circle cx="17.5" cy="18" r="1.6" stroke="currentColor" strokeWidth="1.3" /></svg>
  ),
  portal: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3.5" y="4" width="17" height="14" rx="2" stroke="currentColor" strokeWidth="1.4" /><path d="M3.5 8.5h17M7 12h5M7 15h3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
  ),
  swarm: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="7" cy="7" r="2.4" stroke="currentColor" strokeWidth="1.3" /><circle cx="17" cy="7" r="2.4" stroke="currentColor" strokeWidth="1.3" /><circle cx="12" cy="16" r="2.8" stroke="currentColor" strokeWidth="1.4" /><path d="M8.6 8.8L10.5 14M15.4 8.8L13.5 14" stroke="currentColor" strokeWidth="1.3" /></svg>
  ),
  bell: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 10a6 6 0 0112 0v4l1.5 2.5h-15L6 14v-4z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M9.5 19a2.5 2.5 0 005 0" stroke="currentColor" strokeWidth="1.4" /></svg>
  ),
  robot: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="5" y="9" width="14" height="10" rx="3" stroke="currentColor" strokeWidth="1.5" /><path d="M12 5v4M9 14h.01M15 14h.01" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /><circle cx="12" cy="4" r="1.4" fill="currentColor" /></svg>
  ),
  compass: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" /><path d="M15 9l-2 6-6 2 2-6 6-2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  gear: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.4" /><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
  ),
  layers: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3l8 4.5-8 4.5-8-4.5L12 3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M4 12l8 4.5 8-4.5M4 16.5L12 21l8-4.5" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /></svg>
  ),
  link: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 15l6-6M9 9h-.5A3.5 3.5 0 005 12.5v0A3.5 3.5 0 008.5 16H10M15 9h.5A3.5 3.5 0 0119 12.5v0A3.5 3.5 0 0115.5 16H14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
  ),
  flag: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 21V4M6 4h12l-3 4 3 4H6" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  award: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="8" r="5" stroke="currentColor" strokeWidth="1.4" /><path d="M8.5 12.5L7 21l5-2.5L17 21l-1.5-8.5" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  globe: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.4" /><path d="M3 12h18M12 3c2.5 2.5 3.5 6 3.5 9s-1 6.5-3.5 9c-2.5-2.5-3.5-6-3.5-9s1-6.5 3.5-9z" stroke="currentColor" strokeWidth="1.3" /></svg>
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
  clock: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.4" /><path d="M12 7v5l3.5 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  chat: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 5h16v10H9l-4 4v-4H4V5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
};

// ============================================================
// DATA
// ============================================================

const CONSULTATION = {
  eyebrow: "Get Started",
  heading: "Schedule a Consultation",
  description: "Tell us about your CSM or Field Service Management goals — a certified consultant will follow up within one business day.",
  formTitle: "Schedule a Free Consultation",
};

const BREADCRUMB_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Platforms & Technology", href: "/" },
  { label: "ServiceNow", href: "/platforms/servicenow" },
  { label: "Customer Workflows" },
];

const HERO = {
  badge: "ServiceNow CSM & Field Service Management Partner",
  title: "ServiceNow Customer Workflows Implementation for Connected Case, Field, and Self-Service",
  description:
    "Mirketa's ServiceNow Customer Workflows Implementation connects Customer Service Management, Field Service Management, and self-service into one system of record — so agents see the full customer history, technicians arrive prepared, and customers stop repeating themselves across channels.",
  primaryCta: { label: "Schedule a Consultation", href: "#contact" },
  secondaryCta: { label: "Talk to a ServiceNow Expert", href: "#contact" },
  metrics: [
    "Certified CSM & FSM Consultants",
    "Case Swarming & Virtual Agent Ready",
    "Faster Case Resolution Post Go-Live",
    "24×7 Managed Support Available",
  ],
  stats: [
    { value: "92%", label: "CSAT Score" },
    { value: "45%", label: "Faster Avg. Resolution" },
    { value: "38%", label: "Cases Self-Service Deflected" },
  ],
};

const HERO_DASHBOARD = {
  title: "Customer Service Operations",
  stats: [
    { label: "CSAT Score", value: "92%", caption: "Trailing quarter average" },
    { label: "Faster Avg. Resolution", value: "45%", caption: "Vs. pre-implementation" },
    { label: "Cases Self-Service Deflected", value: "38%", caption: "Never reach an agent" },
  ],
  rows: [
    { title: "VIP case — enterprise account escalation", meta: "CSM · Swarming activated", tone: "good", status: "Resolved" },
    { title: "Field technician dispatch — HVAC repair", meta: "FSM · ETA 24 min", tone: "good", status: "En Route" },
    { title: "Billing inquiry — self-service deflection", meta: "Virtual Agent · No agent needed", tone: "neutral", status: "Deflected" },
  ],
  floatingCards: [
    { icon: Ico.headset, title: "92% CSAT", subtitle: "Trailing quarter average" },
    { icon: Ico.truck, title: "Field Service Ready", subtitle: "Real-time technician tracking" },
  ],
};

const OVERVIEW = {
  eyebrow: "Overview",
  heading: "What ServiceNow Customer Workflows Implementation Means in Practice",
  paragraphs: [
    "Most support organizations run customer service and field service as two separate worlds. A case opened by phone doesn't know about the technician already on-site for the same account. A field dispatch doesn't know the customer called twice last week about the identical issue. ServiceNow Customer Workflows Implementation closes that gap by putting Customer Service Management (CSM) and Field Service Management (FSM) on one platform, sharing one data model, one case record, and one view of the customer.",
    "In practice, this means a case raised through email, chat, phone, or a self-service portal lands in the same queue with the same context — account history, entitlements, prior interactions, and any open work orders. If the issue requires a technician, FSM dispatches from the same case, carrying parts data, skills requirements, and customer history straight to the mobile app the technician uses in the field. Nothing gets re-typed, re-explained, or lost in a handoff between systems.",
    "Mirketa configures this connected model around your existing service structure — your entitlements, your SLAs, your dispatch rules — rather than forcing a generic template onto how your teams actually work. The result is a single connected system of action across Customer Workflows, not a patchwork of point tools bridged by manual data entry.",
  ],
};

const CHALLENGES = {
  eyebrow: "Challenges",
  heading: "Why Customer Service Breaks Down Without Connected Workflows",
  intro:
    "These are the four problems we see most often before a ServiceNow Customer Workflows Implementation — familiar to any team running case handling and field dispatch as separate, disconnected functions.",
  items: [
    {
      icon: Ico.chat,
      title: "Case Data Scattered Across Email, Phone, and Chat",
      description:
        "A customer's history lives in three inboxes and a phone log, not one record. Every agent who picks up the case starts from zero, asking the customer to repeat what they already explained.",
    },
    {
      icon: Ico.truck,
      title: "Field Technicians Dispatched Blind",
      description:
        "Technicians show up without visibility into which parts are needed, what was tried before, or the customer's service history — leading to repeat visits and wasted truck rolls.",
    },
    {
      icon: Ico.clock,
      title: "Slow Resolution Because Agents Can't See the Full Picture",
      description:
        "Without a shared case model, agents escalate issues they could resolve themselves simply because the account history, entitlements, or prior tickets aren't visible from where they sit.",
    },
    {
      icon: Ico.portal,
      title: "No Self-Service Portal, So Every Question Becomes a Ticket",
      description:
        "Customers can't check order status, track a case, or find an answer on their own — so routine questions consume the same queue as genuinely complex issues.",
    },
  ],
};

const SOLUTIONS = {
  eyebrow: "Solutions",
  heading: "How Mirketa Configures ServiceNow to Fix Each Problem",
  intro:
    "Each challenge above maps to a specific configuration decision inside a ServiceNow Customer Workflows Implementation — not a generic module activation.",
  items: [
    {
      icon: Ico.layers,
      title: "One Unified Case Record Across Every Channel",
      description:
        "Email, phone, chat, and portal submissions all create or update the same case record, so agents work from one continuous history instead of piecing it together manually.",
    },
    {
      icon: Ico.compass,
      title: "Field Service Dispatch Tied to the Case",
      description:
        "Work orders inherit the case's full context — parts availability, skills needed, customer history — and sync back to the case automatically as technicians update status in the field.",
    },
    {
      icon: Ico.swarm,
      title: "Case Swarming for Complex Issues",
      description:
        "Instead of escalating up a tier ladder, the right specialists are pulled into a real-time swarm on the case itself, cutting resolution time on issues that don't fit a standard script.",
    },
    {
      icon: Ico.portal,
      title: "A Branded Self-Service Portal With Knowledge and Virtual Agent",
      description:
        "Customers check case status, browse a curated knowledge base, and get instant answers from a Virtual Agent before a case is ever created — deflecting the questions that never needed a human.",
    },
  ],
};

const FEATURES = {
  eyebrow: "Core Capabilities",
  heading: "The ServiceNow Modules Behind a Connected Customer Workflow",
  intro:
    "A ServiceNow Customer Workflows Implementation is built from a specific set of Now Platform applications, each configured to work off the same case and customer data model.",
  items: [
    {
      icon: Ico.headset,
      title: "Customer Service Management (CSM)",
      description:
        "The system of record for every case, account, and contact — with SLA-driven queues, entitlement checks, and configurable case workflows that route by product, severity, or customer tier instead of a flat first-in-first-out queue.",
      points: ["Unified case, account, and contact model", "SLA and entitlement-aware routing", "Agent workspace with full interaction history"],
    },
    {
      icon: Ico.truck,
      title: "Field Service Management (FSM)",
      description:
        "Work order management, technician scheduling, and mobile dispatch connected directly to the case that created them — so a technician's mobile app shows the same customer context the agent saw when they opened the ticket.",
      points: ["Skills- and parts-aware scheduling", "Mobile app with offline-capable work orders", "Real-time sync back to the originating case"],
    },
    {
      icon: Ico.portal,
      title: "Customer Service Portal & Self-Service",
      description:
        "A branded portal where customers submit and track cases, browse a curated knowledge base, and manage account details — deflecting routine questions before they ever consume an agent's queue.",
      points: ["Case submission and live status tracking", "Searchable knowledge base tied to case categories", "Configurable to your brand and account structure"],
    },
    {
      icon: Ico.swarm,
      title: "Case Swarming for Complex Issues",
      description:
        "For cases that don't resolve on a script, swarming pulls the right subject-matter experts into a live collaboration space attached to the case itself — replacing slow tier-to-tier escalation with real-time teamwork.",
      points: ["Real-time expert collaboration on a single case", "Full audit trail of who contributed what", "Shorter time-to-resolution on non-standard issues"],
    },
    {
      icon: Ico.bell,
      title: "Proactive Customer Service Operations",
      description:
        "Connected to monitoring and IoT signals, Proactive Customer Service Operations opens a case and notifies the customer before they notice a problem — turning support from reactive to preventive.",
      points: ["Automated case creation from monitored events", "Proactive customer notification workflows", "Fewer inbound cases for known, recurring issues"],
    },
    {
      icon: Ico.robot,
      title: "Virtual Agent & Conversational Support",
      description:
        "A configurable conversational assistant answers common questions, checks case status, and can create or update a case directly from a chat conversation — available across web, portal, and messaging channels.",
      points: ["Natural-language case creation and lookup", "Configurable topics tied to your knowledge base", "Seamless handoff to a live agent when needed"],
    },
  ],
};

const BENEFITS = {
  eyebrow: "Benefits",
  heading: "What a Connected Customer Workflow Delivers",
  intro: "These are the outcomes clients report after moving CSM, FSM, and self-service onto one connected ServiceNow instance.",
  items: [
    { title: "Faster Case Resolution", description: "Agents see full account and case history immediately, cutting the time spent gathering context before they can act." },
    { title: "Fewer Repeat Field Visits", description: "Technicians arrive with the right parts and full case context, reducing truck rolls caused by incomplete information." },
    { title: "Higher Self-Service Deflection", description: "A working portal and Virtual Agent resolve routine questions before they ever become a ticket in the queue." },
    { title: "One Customer History, Not Three", description: "Email, phone, chat, and field data all update the same case record instead of living in disconnected systems." },
    { title: "Faster Resolution on Complex Issues", description: "Case swarming brings the right experts together in real time instead of routing through sequential escalation tiers." },
    { title: "Fewer Surprises for Customers", description: "Proactive Customer Service Operations opens and resolves known issues before the customer has to report them." },
  ],
};

const PROCESS = {
  eyebrow: "Implementation Process",
  heading: "A Six-Stage Path to ServiceNow Customer Workflows Implementation",
  intro:
    "Every ServiceNow Customer Workflows Implementation Mirketa delivers follows the same structured methodology — refined across CSM and Field Service Management engagements in regulated and high-volume support environments.",
  stages: [
    {
      title: "Discovery",
      description:
        "We map your current case flows, channels, field dispatch process, and escalation paths — identifying exactly where customer data breaks between systems today.",
    },
    {
      title: "Case Model Design",
      description:
        "We design the unified case, account, and entitlement data model that CSM and FSM will both read from, along with SLA definitions and routing rules matched to your service tiers.",
    },
    {
      title: "Configuration: The Core of ServiceNow Customer Workflows Implementation",
      description:
        "Case forms, queues, work order templates, dispatch rules, swarming groups, and Virtual Agent topics are configured against the design — this is where the majority of implementation effort lives.",
    },
    {
      title: "Portal & Self-Service Build",
      description:
        "The Customer Service Portal is branded, structured, and connected to your knowledge base, so case submission, status tracking, and self-service deflection are live before go-live day.",
    },
    {
      title: "Integration",
      description:
        "CSM and FSM are connected to your CRM, ERP, inventory, and communication systems, so case, account, and parts data flow without manual re-entry on either side.",
    },
    {
      title: "Go-Live & Hypercare",
      description:
        "A supported cutover is followed by an elevated hypercare period, with our team monitoring case volume, dispatch accuracy, and portal adoption to resolve issues before they compound.",
    },
  ],
};

const INDUSTRIES = {
  eyebrow: "Industry Expertise",
  heading: "Customer and Field Service Workflows Across Complex Industries",
  intro: "CSM and FSM configurations differ meaningfully by industry — our delivery teams bring domain context, not a one-size-fits-all template.",
  items: [
    { icon: Ico.bank, title: "Financial Services", description: "Entitlement-aware case handling for regulated account and dispute workflows." },
    { icon: Ico.shield, title: "Healthcare", description: "Case and field service workflows built around compliance and patient-adjacent equipment support." },
    { icon: Ico.factory, title: "Manufacturing", description: "Field service dispatch tied to installed-base equipment history and parts inventory." },
    { icon: Ico.cart, title: "Retail & Consumer Goods", description: "High-volume case deflection through self-service and Virtual Agent for order and return questions." },
    { icon: Ico.chip, title: "Technology & SaaS", description: "Tiered support and case swarming for technical issues that cross product and engineering boundaries." },
    { icon: Ico.globe, title: "Public Sector", description: "Citizen-facing case and self-service workflows built to accessibility and compliance standards." },
  ],
};

const WHY_MIRKETA = {
  eyebrow: "Why Mirketa",
  heading: "A ServiceNow Partner Fluent in Customer and Field Service Operations",
  intro: "Activating CSM and FSM modules is easy. Configuring them around how your agents and technicians actually work is where engagements succeed or stall.",
  items: [
    { icon: Ico.award, title: "Certified CSM & FSM Consultants", description: "Every consultant on a Customer Workflows engagement holds active ServiceNow certifications in CSM and Field Service Management." },
    { icon: Ico.compass, title: "Case-First Design Philosophy", description: "We design the case and account model first, then configure CSM, FSM, and the portal to read from it — not the other way around." },
    { icon: Ico.robot, title: "AI-Ready From Day One", description: "Virtual Agent, predictive intelligence, and case classification are built into the instance from the start, not bolted on later." },
    { icon: Ico.shield, title: "Post Go-Live Support", description: "A dedicated managed services team keeps case routing, dispatch rules, and the portal healthy long after launch." },
  ],
};

const TECH_STACK = {
  eyebrow: "Technology Stack",
  heading: "The Now Platform Applications We Configure",
  intro: "A ServiceNow Customer Workflows Implementation draws on this specific set of applications, each mapped to a role in the connected case model.",
  items: [
    { icon: Ico.headset, label: "Customer Service Management" },
    { icon: Ico.truck, label: "Field Service Management" },
    { icon: Ico.gear, label: "Advanced Work Assignment" },
    { icon: Ico.robot, label: "Virtual Agent" },
    { icon: Ico.portal, label: "Customer Service Portal" },
    { icon: Ico.pulse, label: "Performance Analytics" },
  ],
};

const FAQS = [
  {
    q: "What is ServiceNow Customer Workflows Implementation?",
    a: "ServiceNow Customer Workflows Implementation is the process of configuring Customer Service Management (CSM) and Field Service Management (FSM) on the Now Platform to share one case and customer data model — so support agents, field technicians, and self-service channels all work from the same connected history instead of disconnected systems.",
  },
  {
    q: "What's the difference between ServiceNow CSM and Field Service Management?",
    a: "CSM manages the customer case — intake, routing, SLAs, and resolution. FSM manages the physical work that a case sometimes requires — technician scheduling, dispatch, parts, and mobile work orders. In a connected implementation, FSM work orders are created from and synced back to the CSM case automatically.",
  },
  {
    q: "How long does a ServiceNow Customer Workflows Implementation take?",
    a: "A focused CSM-only implementation typically takes 8–12 weeks. Adding Field Service Management, a full self-service portal, and case swarming extends a typical engagement to 4–7 months, depending on integration complexity and the number of service tiers involved.",
  },
  {
    q: "What is case swarming and when do we need it?",
    a: "Case swarming pulls the right subject-matter experts into real-time collaboration on a single complex case, rather than escalating it sequentially through support tiers. It's most valuable for issues that cross product lines, require multiple specialists, or don't fit a documented resolution script.",
  },
  {
    q: "Can Mirketa build a self-service customer portal as part of this implementation?",
    a: "Yes. A branded Customer Service Portal with case submission, status tracking, and a searchable knowledge base is a standard part of our ServiceNow Customer Workflows Implementation scope, and can include Virtual Agent for conversational self-service.",
  },
  {
    q: "How does the ServiceNow Virtual Agent fit into customer workflows?",
    a: "Virtual Agent answers common questions, checks case status, and can create or update a case directly from a conversation — on the portal, web, or messaging channels — before a live agent is ever involved, deflecting routine volume from the case queue.",
  },
  {
    q: "Can ServiceNow Customer Workflows integrate with our existing CRM or ERP?",
    a: "Yes. We integrate CSM and FSM with Salesforce, Oracle, SAP, and other CRM and ERP systems using Integration Hub and REST APIs, so account, order, and parts data flow into the case record without manual re-entry.",
  },
  {
    q: "Do you provide managed support after the Customer Workflows go-live?",
    a: "Yes. Every implementation can transition into an ongoing managed services engagement covering case routing tuning, dispatch rule updates, portal enhancements, and SLA-backed support with a dedicated team.",
  },
];

const FINAL_CTA = {
  heading: "Start Your ServiceNow Customer Workflows Implementation Today",
  description:
    "Partner with Mirketa's certified CSM and Field Service Management consultants to connect case handling, field dispatch, and self-service into one system — or speak with a ServiceNow expert before you commit to a scope.",
  primaryCta: { label: "Schedule a Consultation", href: "#contact" },
  secondaryCta: { label: "Talk to a ServiceNow Expert", href: "#contact" },
};

const SEO = {
  title: "ServiceNow Customer Workflows Implementation | Mirketa",
  description:
    "Mirketa delivers ServiceNow Customer Workflows Implementation — connecting CSM, Field Service Management, and self-service into one system for faster case resolution.",
  canonical: "https://mirketa.us/servicenow-customer-workflows/",
  keywords: [
    "ServiceNow Customer Workflows Implementation",
    "ServiceNow CSM Implementation",
    "ServiceNow Field Service Management",
    "ServiceNow Customer Service Portal",
    "ServiceNow Case Swarming",
    "ServiceNow Virtual Agent",
    "ServiceNow Customer Service Automation",
    "ServiceNow Proactive Customer Service Operations",
    "Now Platform Customer Workflows",
    "ServiceNow FSM Consulting",
    "ServiceNow Self-Service Portal",
    "ServiceNow Advanced Work Assignment",
  ],
  ogTitle: "ServiceNow Customer Workflows Implementation Services",
  ogDescription:
    "Connect case handling, field dispatch, and self-service into one ServiceNow instance — Mirketa's certified CSM and FSM consultants make it happen.",
  twitterTitle: "ServiceNow CSM & Field Service Implementation | Mirketa",
  twitterDescription:
    "See how Mirketa implements ServiceNow Customer Workflows — CSM, Field Service Management, case swarming, and self-service in one connected system.",
  schema: [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "ServiceNow Customer Workflows Implementation",
      provider: { "@type": "Organization", name: "Mirketa Inc.", url: "https://mirketa.us" },
      name: "ServiceNow Customer Workflows Implementation",
      description:
        "ServiceNow Customer Service Management and Field Service Management implementation connecting case data, field dispatch, and self-service into one system for faster customer case resolution.",
      areaServed: "Global",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://mirketa.us/" },
        { "@type": "ListItem", position: 2, name: "ServiceNow", item: "https://mirketa.us/servicenow/" },
        { "@type": "ListItem", position: 3, name: "Customer Workflows", item: "https://mirketa.us/servicenow-customer-workflows/" },
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

export default function CustomerWorkflows() {
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

      gsap.utils.toArray(".sncw-reveal").forEach((el) => {
        gsap.from(el, {
          opacity: prefersReduced ? 1 : 0,
          y: prefersReduced ? 0 : 32,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      gsap.utils.toArray(".sncw-reveal-left").forEach((el) => {
        gsap.from(el, {
          opacity: prefersReduced ? 1 : 0,
          x: prefersReduced ? 0 : -30,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      gsap.utils.toArray(".sncw-reveal-right").forEach((el) => {
        gsap.from(el, {
          opacity: prefersReduced ? 1 : 0,
          x: prefersReduced ? 0 : 30,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      gsap.utils.toArray(".sncw-reveal-stagger").forEach((el) => {
        gsap.from(el.children, {
          opacity: prefersReduced ? 1 : 0,
          y: prefersReduced ? 0 : 26,
          duration: 0.6,
          stagger: 0.06,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      gsap.utils.toArray(".sncw-zoom-in").forEach((el) => {
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
    <div className="customer-workflows">
      <Seo {...SEO} />
      <HeroSection heroTextRef={heroTextRef} heroRef={heroRef} />
      <TrustedByMarquee label="Trusted by Customer Service Leaders" />
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
    <section ref={heroRef} className="sncw-hero" style={{ backgroundImage: `url("${Images.heroServiceNowCustomerWorkflows}")` }} aria-label={HERO.title}>
      <div className="sncw-hero__scrim" />
      <div className="container">
        <Breadcrumb items={BREADCRUMB_ITEMS} className="sncw-breadcrumb" />
        <div className="sncw-hero__inner">
          <div ref={heroTextRef} className="sncw-hero__text">
            <span className="sncw-badge">
              <span className="sncw-badge__spark" aria-hidden="true">✦</span> {HERO.badge}
            </span>
            <h1>{HERO.title}</h1>
            <p className="sncw-hero__description">{HERO.description}</p>
            <div className="sncw-hero__ctas">
              <a href={HERO.primaryCta.href} className="btn btn-primary sncw-btn">
                {HERO.primaryCta.label} <span aria-hidden="true">→</span>
              </a>
              <a href={HERO.secondaryCta.href} className="btn btn-secondary sncw-btn">
                {HERO.secondaryCta.label}
              </a>
            </div>
            <ul className="sncw-hero__metrics">
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
            className="sncw-hero__visual sncw-zoom-in"
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
    <section className="section sncw-overview" aria-labelledby="sncw-overview-heading">
      <div className="container sncw-overview__grid">
        <div className="sncw-reveal-left">
          <p className="sncw-eyebrow">{OVERVIEW.eyebrow}</p>
          <h2 id="sncw-overview-heading">{OVERVIEW.heading}</h2>
          {OVERVIEW.paragraphs.map((p, i) => (
            <p className="sncw-overview__text" key={i}>{p}</p>
          ))}
          <p className="sncw-overview__links">
            This implementation sits alongside Mirketa's broader{" "}
            <Link to="/platforms/servicenow">ServiceNow Solutions</Link> practice, and pairs naturally with{" "}
            <Link to="/platforms/servicenow/technology-workflows">ServiceNow Technology Workflows</Link> for IT operations
            and <Link to="/platforms/servicenow/employee-workflows">ServiceNow Employee Workflows</Link> for internal service delivery.
          </p>
        </div>
        <div className="sncw-overview__callout sncw-reveal-right" aria-label="Connected workflow snapshot">
          <img src={Images.illoServicenowCsmQueue} alt="" aria-hidden="true" className="sncw-overview__illo" loading="lazy" />
          <h3>One Case, Three Channels</h3>
          <ul>
            <li><span aria-hidden="true">{Ico.headset}</span> Support agent sees full case &amp; account history</li>
            <li><span aria-hidden="true">{Ico.truck}</span> Field technician dispatched with the same context</li>
            <li><span aria-hidden="true">{Ico.portal}</span> Customer tracks status from the self-service portal</li>
          </ul>
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
    <section className="section sncw-challenges" aria-labelledby="sncw-challenges-heading">
      <div className="container">
        <div className="section-heading sncw-reveal">
          <p className="sncw-eyebrow">{CHALLENGES.eyebrow}</p>
          <h2 id="sncw-challenges-heading">{CHALLENGES.heading}</h2>
          <p>{CHALLENGES.intro}</p>
        </div>
        <div className="sncw-challenges__grid sncw-reveal-stagger">
          {CHALLENGES.items.map((c) => (
            <div className="sncw-challenge-card" key={c.title}>
              <span className="sncw-challenge-card__icon">{c.icon}</span>
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
    <section className="section sncw-solutions" aria-labelledby="sncw-solutions-heading">
      <div className="container">
        <div className="section-heading sncw-reveal">
          <p className="sncw-eyebrow">{SOLUTIONS.eyebrow}</p>
          <h2 id="sncw-solutions-heading">{SOLUTIONS.heading}</h2>
          <p>{SOLUTIONS.intro}</p>
        </div>
        <div className="sncw-solutions__grid sncw-reveal-stagger">
          {SOLUTIONS.items.map((s) => (
            <div className="sncw-solution-card" key={s.title}>
              <span className="sncw-solution-card__icon">{s.icon}</span>
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
// FEATURES — full-width alternating bands
// ============================================================

function FeaturesSection() {
  return (
    <section className="section sncw-features" aria-labelledby="sncw-features-heading">
      <div className="container">
        <div className="section-heading sncw-reveal">
          <p className="sncw-eyebrow">{FEATURES.eyebrow}</p>
          <h2 id="sncw-features-heading">{FEATURES.heading}</h2>
          <p>{FEATURES.intro}</p>
        </div>
      </div>
      <div className="sncw-bands">
        {FEATURES.items.map((f, i) => {
          const reversed = i % 2 === 1;
          return (
            <div className={`sncw-band ${reversed ? "sncw-band--reverse" : ""}`} key={f.title}>
              <div className="container sncw-band__inner">
                <div className={`sncw-band__content ${reversed ? "sncw-reveal-right" : "sncw-reveal-left"}`}>
                  <span className="sncw-band__icon">{f.icon}</span>
                  <h3>{f.title}</h3>
                  <p>{f.description}</p>
                  <ul className="sncw-band__points">
                    {f.points.map((pt) => (
                      <li key={pt}><span aria-hidden="true">{Ico.check}</span>{pt}</li>
                    ))}
                  </ul>
                </div>
                <div className={`sncw-band__panel ${reversed ? "sncw-reveal-left" : "sncw-reveal-right"}`} aria-hidden="true">
                  <div className="sncw-band__panel-shape">
                    <span className="sncw-band__panel-icon">{f.icon}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ============================================================
// BENEFITS
// ============================================================

function BenefitsSection() {
  return (
    <section className="section sncw-benefits" aria-labelledby="sncw-benefits-heading">
      <div className="container">
        <div className="section-heading sncw-reveal">
          <p className="sncw-eyebrow">{BENEFITS.eyebrow}</p>
          <h2 id="sncw-benefits-heading">{BENEFITS.heading}</h2>
          <p>{BENEFITS.intro}</p>
        </div>
        <div className="sncw-benefits__grid sncw-reveal-stagger">
          {BENEFITS.items.map((b) => (
            <div className="sncw-benefit-item" key={b.title}>
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
// IMPLEMENTATION PROCESS — vertical connected stepper
// ============================================================

function ProcessSection() {
  return (
    <section className="section sncw-process" aria-labelledby="sncw-process-heading">
      <div className="container">
        <div className="section-heading sncw-reveal">
          <p className="sncw-eyebrow">{PROCESS.eyebrow}</p>
          <h2 id="sncw-process-heading">{PROCESS.heading}</h2>
          <p>{PROCESS.intro}</p>
        </div>
        <div className="sncw-process__list">
          {PROCESS.stages.map((p, i) => (
            <div className="sncw-process-step sncw-reveal-left" key={p.title}>
              <div className="sncw-process-step__rail">
                <span className="sncw-process-step__marker">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <div className="sncw-process-step__content">
                <h3>{p.title}</h3>
                <p>{p.description}</p>
              </div>
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
    <section className="section sncw-industries" aria-labelledby="sncw-industries-heading">
      <div className="container">
        <div className="section-heading sncw-reveal">
          <p className="sncw-eyebrow">{INDUSTRIES.eyebrow}</p>
          <h2 id="sncw-industries-heading">{INDUSTRIES.heading}</h2>
          <p>{INDUSTRIES.intro}</p>
        </div>
        <div className="sncw-industries__grid sncw-reveal-stagger">
          {INDUSTRIES.items.map((n) => (
            <div className="sncw-industry-card" key={n.title}>
              <span className="sncw-industry-card__icon">{n.icon}</span>
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
    <section className="section sncw-why" aria-labelledby="sncw-why-heading">
      <div className="container">
        <div className="section-heading sncw-reveal">
          <p className="sncw-eyebrow">{WHY_MIRKETA.eyebrow}</p>
          <h2 id="sncw-why-heading">{WHY_MIRKETA.heading}</h2>
          <p>{WHY_MIRKETA.intro}</p>
        </div>
        <div className="sncw-why__grid sncw-reveal-stagger">
          {WHY_MIRKETA.items.map((w) => (
            <div className="sncw-why-card" key={w.title}>
              <span className="sncw-why-card__icon">{w.icon}</span>
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
    <section className="section sncw-stack" aria-labelledby="sncw-stack-heading">
      <div className="container">
        <div className="section-heading sncw-reveal">
          <p className="sncw-eyebrow">{TECH_STACK.eyebrow}</p>
          <h2 id="sncw-stack-heading">{TECH_STACK.heading}</h2>
          <p>{TECH_STACK.intro}</p>
        </div>
        <div className="sncw-stack__grid sncw-reveal-stagger">
          {TECH_STACK.items.map((t) => (
            <div className="sncw-stack-chip" key={t.label}>
              <span className="sncw-stack-chip__icon">{t.icon}</span>
              <span className="sncw-stack-chip__label">{t.label}</span>
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
    <section className="section sncw-faq" aria-labelledby="sncw-faq-heading">
      <div className="container">
        <div className="section-heading sncw-reveal">
          <p className="sncw-eyebrow">FAQ</p>
          <h2 id="sncw-faq-heading">Frequently Asked Questions About ServiceNow Customer Workflows Implementation</h2>
        </div>
        <FaqAccordion items={FAQS} className="sncw-reveal" searchPlaceholder="Ask a question — e.g. &quot;case swarming&quot;, &quot;portal&quot;, &quot;virtual agent&quot;..." />
        <p className="sncw-faq__links">
          Related reading: <Link to="/platforms/servicenow">ServiceNow Solutions</Link>,{" "}
          <Link to="/platforms/servicenow/consulting-development-services">ServiceNow Consulting &amp; Development Services</Link>,{" "}
          <Link to="/platforms/servicenow/technology-workflows">ServiceNow Technology Workflows</Link>,{" "}
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
    <section className="sncw-final-cta sncw-reveal" aria-labelledby="sncw-final-cta-heading">
      <div className="container sncw-final-cta__inner">
        <h2 id="sncw-final-cta-heading">{FINAL_CTA.heading}</h2>
        <p>{FINAL_CTA.description}</p>
        <div className="sncw-final-cta__ctas">
          <a href={FINAL_CTA.primaryCta.href} className="btn btn-primary sncw-btn">
            {FINAL_CTA.primaryCta.label} <span aria-hidden="true">→</span>
          </a>
          <a href={FINAL_CTA.secondaryCta.href} className="btn btn-secondary sncw-btn">
            {FINAL_CTA.secondaryCta.label}
          </a>
        </div>
      </div>
    </section>
  );
}
