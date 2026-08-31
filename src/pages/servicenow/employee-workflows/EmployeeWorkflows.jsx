import { useEffect, useRef, useState } from "react";
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
import "./EmployeeWorkflows.css";

gsap.registerPlugin(ScrollTrigger);

// ============================================================
// ICONS
// ============================================================

const Ico = {
  check: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12.5l5 5L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  mail: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.4" /><path d="M4 6.5l8 6 8-6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  journey: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 18c3 0 3-6 6-6s3 6 6 6 3-6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
  ),
  building: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="5" y="3" width="14" height="18" rx="1.5" stroke="currentColor" strokeWidth="1.4" /><path d="M9 8h1M14 8h1M9 12h1M14 12h1M9 16h1M14 16h1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
  ),
  users: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="9" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.4" /><path d="M3.5 19c.6-3.4 2.9-5.2 5.5-5.2s4.9 1.8 5.5 5.2" stroke="currentColor" strokeWidth="1.4" /><circle cx="17" cy="9" r="2.6" stroke="currentColor" strokeWidth="1.3" opacity="0.7" /><path d="M15.5 13.4c2.2.3 3.7 1.9 4 4.6" stroke="currentColor" strokeWidth="1.3" opacity="0.7" /></svg>
  ),
  portal: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3.5" y="4" width="17" height="14" rx="2" stroke="currentColor" strokeWidth="1.4" /><path d="M3.5 8.5h17M7 12h5M7 15h3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
  ),
  gavel: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 12l6-6 6 6-6 6-6-6z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /><path d="M4 20h8M9 15l-5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
  ),
  manager: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="7" r="3.4" stroke="currentColor" strokeWidth="1.4" /><path d="M5 20c1-4.5 3.6-7 7-7s6 2.5 7 7" stroke="currentColor" strokeWidth="1.4" /><path d="M9 20v-3M15 20v-3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
  ),
  compass: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" /><path d="M15 9l-2 6-6 2 2-6 6-2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
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
};

// ============================================================
// DATA
// ============================================================

const HERO_DASHBOARD = {
  title: "Employee Center Snapshot",
  stats: [
    { label: "SELF-SERVICE", value: "41%", caption: "Of requests never reach HR" },
    { label: "ONBOARDING TIME", value: "-60%", caption: "Faster new-hire journeys" },
    { label: "ADOPTION RATE", value: "94%", caption: "Employees using the portal" },
  ],
  rows: [
    { title: "New hire onboarding — Sarah Chen", meta: "HRSD · Laptop, badge, benefits linked", tone: "good", status: "In Progress" },
    { title: "Facilities request — broken office chair", meta: "Workplace Service Delivery · Auto-routed", tone: "good", status: "Resolved" },
    { title: "Parental leave policy question", meta: "Employee Center · Knowledge article surfaced", tone: "neutral", status: "Self-Served" },
  ],
  floatingCards: [
    { icon: Ico.journey, title: "94% Adoption Rate", subtitle: "Employee Center usage" },
    { icon: Ico.building, title: "Workplace Service Delivery", subtitle: "Facilities requests automated" },
  ],
};

const CONSULTATION = {
  eyebrow: "Get Started",
  heading: "Schedule a Consultation",
  description: "Tell us about your HR or Workplace Service Delivery goals — a certified consultant will follow up within one business day.",
  formTitle: "Schedule a Free Consultation",
};

const BREADCRUMB_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Platforms & Technology", href: "/" },
  { label: "ServiceNow", href: "/servicenow" },
  { label: "Employee Workflows" },
];

const HERO = {
  badge: "ServiceNow HRSD & Workplace Service Delivery Partner",
  title: "ServiceNow Employee Workflows Implementation for Self-Service HR and Workplace Support",
  description:
    "Mirketa's ServiceNow Employee Workflows Implementation connects HR Service Delivery, Workplace Service Delivery, and Legal Service Delivery into one Employee Center — turning repetitive HR emails and facilities requests into guided, self-service journeys your people actually use.",
  primaryCta: { label: "Schedule a Consultation", href: "#contact" },
  secondaryCta: { label: "Talk to a ServiceNow Expert", href: "#contact" },
  metrics: [
    "Certified HRSD Consultants",
    "Onboarding Journeys Built to Your Policies",
    "Higher Self-Service Adoption Post Go-Live",
    "24×7 Managed Support Available",
  ],
};

const OVERVIEW = {
  eyebrow: "Overview",
  heading: "What ServiceNow Employee Workflows Implementation Means in Practice",
  paragraphs: [
    "Most HR and facilities teams spend a surprising share of their week answering the same handful of questions — how to enroll in benefits, where to submit a facilities request, what the parental leave policy actually says. ServiceNow Employee Workflows Implementation replaces that inbox with a structured system: HR Service Delivery (HRSD), Workplace Service Delivery, and Legal Service Delivery all running on the Now Platform, surfaced to employees through a single Employee Center.",
    "In practice, this means a new hire's entire onboarding — laptop provisioning, badge access, benefits enrollment, policy acknowledgment — runs as one connected journey instead of five separate emails to five separate teams. It means a facilities request for a broken office chair routes automatically to the right team with no HR involvement at all. And it means the HR business partner who used to answer the same parental-leave question forty times a quarter can instead point employees to a knowledge article that answers it instantly, any time, without waiting for business hours.",
    "Mirketa configures ServiceNow Employee Workflows around your actual HR service catalog, your org structure, and your existing policies — not a generic template that ignores how your teams already operate. The result is fewer repetitive tickets, faster resolution on the ones that remain, and an employee experience that finally matches what people expect from consumer software.",
  ],
};

const CHALLENGES = {
  eyebrow: "Challenges",
  heading: "Why Employee Service Delivery Breaks Down Without Connected Workflows",
  intro:
    "These are the four problems we see most often before a ServiceNow Employee Workflows Implementation — familiar to any HR, IT, and facilities team fielding requests through disconnected inboxes.",
  items: [
    {
      icon: Ico.mail,
      title: "HR Buried Answering the Same Questions Repeatedly",
      description: "The same benefits, leave, and policy questions arrive in the HR inbox dozens of times a month, consuming hours that could go toward real HR work.",
    },
    {
      icon: Ico.journey,
      title: "No Unified Onboarding Journey Across Departments",
      description: "A new hire's laptop, badge, benefits, and training requests are scattered across HR, IT, and facilities, with nobody owning the end-to-end experience.",
    },
    {
      icon: Ico.building,
      title: "Disconnected Workplace and Facilities Requests",
      description: "A request for a new monitor or a conference room booking issue has no clear owner or tracking, so it gets lost between email threads and hallway conversations.",
    },
    {
      icon: Ico.users,
      title: "Inconsistent Employee Experience Across Locations",
      description: "How quickly and consistently an employee question gets answered depends entirely on which office, region, or manager they happen to report to.",
    },
  ],
};

const SOLUTIONS = {
  eyebrow: "Solutions",
  heading: "How Mirketa Configures ServiceNow to Fix Each Problem",
  intro:
    "Each challenge above maps to a specific configuration decision inside a ServiceNow Employee Workflows Implementation — not a generic module activation.",
  items: [
    {
      icon: Ico.portal,
      title: "One Employee Center for Every HR and Workplace Request",
      description: "A single branded portal replaces the scattered inboxes, giving employees one place to ask, request, and track — regardless of which team ultimately fulfills it.",
    },
    {
      icon: Ico.journey,
      title: "Structured Onboarding and Offboarding Journeys",
      description: "HR, IT, and facilities tasks for a new hire are sequenced into one journey with clear ownership and status visibility for every stakeholder.",
    },
    {
      icon: Ico.building,
      title: "Workplace Service Delivery for Facilities Requests",
      description: "Office and facilities requests get their own catalog, routing rules, and SLAs — tracked with the same rigor as an IT ticket instead of an email nobody owns.",
    },
    {
      icon: Ico.globe,
      title: "One Consistent Experience Across Every Location",
      description: "Region-specific policies and catalogs are configured within the same platform, so every employee gets a consistent experience tuned to their local requirements.",
    },
  ],
};

const FEATURES = {
  eyebrow: "Core Capabilities",
  heading: "The ServiceNow Modules Behind a Connected Employee Workflow",
  intro: "Expand any capability below to see how it fits into a ServiceNow Employee Workflows Implementation.",
  items: [
    {
      icon: Ico.users,
      title: "HR Service Delivery (HRSD)",
      description:
        "The system of record for every HR case — benefits questions, leave requests, and policy inquiries — with a curated knowledge base and case types that route automatically to the right HR specialist.",
    },
    {
      icon: Ico.journey,
      title: "Employee Onboarding & Offboarding Journeys",
      description:
        "Cross-departmental tasks for a new hire or departing employee are sequenced into one guided journey, with HR, IT, and facilities all working from the same checklist instead of separate emails.",
    },
    {
      icon: Ico.building,
      title: "Workplace Service Delivery",
      description:
        "Office moves, equipment requests, and facilities issues get a proper service catalog, routing, and SLA tracking — the same operational rigor IT already applies to its own tickets.",
    },
    {
      icon: Ico.portal,
      title: "Employee Center Portal",
      description:
        "A single branded front door for every HR, IT, and workplace request, with case status, knowledge articles, and personalized content all in one place employees actually want to use.",
    },
    {
      icon: Ico.manager,
      title: "Manager Hub",
      description:
        "A dedicated workspace giving managers visibility into their team's open cases, approvals awaiting their action, and org-level requests without digging through email.",
    },
    {
      icon: Ico.gavel,
      title: "Legal Service Delivery",
      description:
        "Contract requests, NDAs, and legal intake are tracked through a structured workflow instead of an inbox, with clear status visibility for the requester and the legal team.",
    },
  ],
};

const BENEFITS = {
  eyebrow: "Benefits",
  heading: "What a Connected Employee Workflow Delivers",
  intro: "These are the outcomes clients report after moving HRSD, Workplace Service Delivery, and Legal Service Delivery onto one connected ServiceNow instance.",
  items: [
    { title: "Fewer Repetitive HR Tickets", description: "A working knowledge base and Employee Center deflect the questions HR answered the same way every week." },
    { title: "Faster, More Consistent Onboarding", description: "New hires move through one connected journey instead of waiting on five separate departmental handoffs." },
    { title: "Tracked, Accountable Facilities Requests", description: "Workplace requests finally have an owner, an SLA, and a status employees can check without asking." },
    { title: "Higher Employee Satisfaction", description: "A consumer-grade portal experience replaces email threads that made simple requests feel unnecessarily difficult." },
    { title: "More Time for Strategic HR Work", description: "HR business partners spend less time on repetitive case volume and more time on the work only they can do." },
    { title: "Consistent Experience Across Every Office", description: "Location-specific policy and catalog configuration keep the experience fair and predictable everywhere your people work." },
  ],
};

const PROCESS = {
  eyebrow: "Implementation Process",
  heading: "A Six-Stage Path to ServiceNow Employee Workflows Implementation",
  intro:
    "Every ServiceNow Employee Workflows Implementation Mirketa delivers follows the same structured methodology — refined across HRSD and Workplace Service Delivery engagements for organizations of every size.",
  stages: [
    { name: "Discovery", description: "We map your current HR case types, onboarding process, and workplace request flows across every department involved." },
    { name: "Journey Design", description: "We design the onboarding, offboarding, and case journeys that HRSD and Workplace Service Delivery will run, matched to your actual policies." },
    { name: "Configuration", description: "HR case types, workplace catalogs, routing rules, and Manager Hub views are configured against the journey design." },
    { name: "Portal Build", description: "The Employee Center is branded, structured, and connected to a curated knowledge base so self-service is genuinely usable on day one." },
    { name: "Integration & Testing", description: "HRSD and Workplace Service Delivery are connected to your HRIS, identity, and facilities systems, then validated against real onboarding scenarios." },
    { name: "Go-Live & Hypercare", description: "A supported cutover is followed by an elevated hypercare period, with our team monitoring case volume and portal adoption to resolve issues quickly." },
  ],
};

const TECH_STACK_TABS = [
  { key: "hrsd", label: "HR Service Delivery", description: "The core case management system for benefits, leave, and policy questions, with configurable case types, SLAs, and a knowledge base tuned to reduce repeat inquiries." },
  { key: "wsd", label: "Workplace Service Delivery", description: "A dedicated service catalog and routing engine for facilities, equipment, and office requests, giving workplace teams the same operational visibility IT already has." },
  { key: "lsd", label: "Legal Service Delivery", description: "Structured intake for contracts, NDAs, and legal requests, replacing inbox-based intake with a trackable workflow and clear status for every stakeholder." },
  { key: "ec", label: "Employee Center", description: "The unified portal experience employees use to submit, track, and resolve requests across HR, IT, workplace, and legal from one consistent interface." },
];

const INDUSTRIES = {
  eyebrow: "Industry Expertise",
  heading: "Employee Workflows Experience Across Complex Organizations",
  intro: "HRSD and Workplace Service Delivery configurations differ by industry — our delivery teams bring domain context, not a one-size-fits-all template.",
  items: [
    { icon: Ico.bank, title: "Financial Services" },
    { icon: Ico.shield, title: "Healthcare" },
    { icon: Ico.factory, title: "Manufacturing" },
    { icon: Ico.cart, title: "Retail & Consumer Goods" },
    { icon: Ico.chip, title: "Technology & SaaS" },
    { icon: Ico.globe, title: "Public Sector" },
  ],
};

const WHY_MIRKETA = {
  eyebrow: "Why Mirketa",
  heading: "A ServiceNow Partner That Understands HR Operations, Not Just Case Management",
  intro: "Activating HRSD modules is easy. Configuring journeys your employees actually complete without frustration is where engagements succeed or stall.",
  items: [
    { icon: Ico.award, title: "Certified HRSD Consultants", description: "Every consultant on an Employee Workflows engagement holds active ServiceNow HRSD certifications." },
    { icon: Ico.compass, title: "Journey-First Design Philosophy", description: "We design the employee journey first, then configure HRSD, Workplace Service Delivery, and the portal to support it." },
    { icon: Ico.robot, title: "AI-Ready From Day One", description: "Case classification and knowledge recommendations are built into the instance from the start, not bolted on later." },
    { icon: Ico.shield, title: "Post Go-Live Support", description: "A dedicated managed services team keeps case routing, catalogs, and the portal healthy long after launch." },
  ],
};

const FAQS = [
  {
    q: "What is ServiceNow Employee Workflows Implementation?",
    a: "ServiceNow Employee Workflows Implementation is the process of configuring HR Service Delivery (HRSD), Workplace Service Delivery, and Legal Service Delivery on the Now Platform, surfaced through a unified Employee Center — so HR, facilities, and legal requests all run through structured, trackable workflows instead of email.",
  },
  {
    q: "What's the difference between HRSD and Workplace Service Delivery?",
    a: "HRSD manages HR-specific cases — benefits, leave, and policy questions. Workplace Service Delivery manages facilities and workplace requests — equipment, office moves, and building issues. In a connected ServiceNow Employee Workflows Implementation, both run through the same Employee Center for a consistent employee experience.",
  },
  {
    q: "How long does a ServiceNow Employee Workflows Implementation take?",
    a: "A focused HRSD-only implementation typically takes 8–12 weeks. Adding Workplace Service Delivery, Legal Service Delivery, and a full Employee Center portal extends a typical engagement to 4–7 months, depending on the number of case types and integrations involved.",
  },
  {
    q: "Can Mirketa build onboarding journeys that span HR, IT, and facilities?",
    a: "Yes. Cross-departmental onboarding and offboarding journeys are a standard part of our ServiceNow Employee Workflows Implementation scope, sequencing tasks across HR, IT, and facilities into one connected experience for the employee and every team involved.",
  },
  {
    q: "Does the Employee Center replace our existing HR system of record?",
    a: "No. The Employee Center and HRSD sit on top of and integrate with your existing HRIS (such as Workday or SAP SuccessFactors), handling case management and self-service while your HRIS remains the system of record for core employee data.",
  },
  {
    q: "Can ServiceNow Employee Workflows integrate with our HRIS and identity systems?",
    a: "Yes. We integrate HRSD and Workplace Service Delivery with your HRIS, Active Directory, and facilities systems using Integration Hub and REST APIs, so employee and access data flow without manual re-entry.",
  },
  {
    q: "What is Manager Hub and do we need it?",
    a: "Manager Hub gives managers a dedicated view of their team's open HR and workplace cases, pending approvals, and org-level requests. It's most valuable for organizations where managers currently chase status updates through email or informal check-ins.",
  },
  {
    q: "Do you provide managed support after the Employee Workflows go-live?",
    a: "Yes. Every implementation can transition into an ongoing managed services engagement covering case routing tuning, knowledge base maintenance, and SLA-backed support with a dedicated team.",
  },
];

const FINAL_CTA = {
  heading: "Start Your ServiceNow Employee Workflows Implementation Today",
  description:
    "Partner with Mirketa's certified HRSD consultants to connect HR, workplace, and legal service delivery into one Employee Center — or speak with a ServiceNow expert before you commit to a scope.",
  primaryCta: { label: "Schedule a Consultation", href: "#contact" },
  secondaryCta: { label: "Talk to a ServiceNow Expert", href: "#contact" },
};

const SEO = {
  title: "ServiceNow Employee Workflows Implementation | Mirketa",
  description:
    "Mirketa delivers ServiceNow Employee Workflows Implementation — connecting HRSD, Workplace Service Delivery, and Legal Service Delivery into one Employee Center.",
  canonical: "https://mirketa.us/servicenow-employee-workflows/",
  keywords: [
    "ServiceNow Employee Workflows Implementation",
    "ServiceNow HR Service Delivery",
    "ServiceNow HRSD Implementation",
    "ServiceNow Workplace Service Delivery",
    "ServiceNow Employee Center",
    "ServiceNow Legal Service Delivery",
    "ServiceNow Employee Onboarding",
    "ServiceNow Manager Hub",
    "Now Platform Employee Experience",
    "ServiceNow HR Case Management",
    "ServiceNow Self-Service Portal",
  ],
  ogTitle: "ServiceNow Employee Workflows Implementation Services",
  ogDescription:
    "Connect HR, workplace, and legal service delivery into one Employee Center — Mirketa's certified HRSD consultants make it happen.",
  twitterTitle: "ServiceNow HRSD & Employee Workflows | Mirketa",
  twitterDescription:
    "See how Mirketa implements ServiceNow Employee Workflows — HRSD, Workplace Service Delivery, and the Employee Center in one connected system.",
  schema: [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "ServiceNow Employee Workflows Implementation",
      provider: { "@type": "Organization", name: "Mirketa Inc.", url: "https://mirketa.us" },
      name: "ServiceNow Employee Workflows Implementation",
      description:
        "ServiceNow HR Service Delivery, Workplace Service Delivery, and Legal Service Delivery implementation connecting employee requests into one Employee Center.",
      areaServed: "Global",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://mirketa.us/" },
        { "@type": "ListItem", position: 2, name: "ServiceNow", item: "https://mirketa.us/servicenow/" },
        { "@type": "ListItem", position: 3, name: "Employee Workflows", item: "https://mirketa.us/servicenow-employee-workflows/" },
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

export default function EmployeeWorkflows() {
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

      gsap.utils.toArray(".snew-reveal").forEach((el) => {
        gsap.from(el, {
          opacity: prefersReduced ? 1 : 0,
          y: prefersReduced ? 0 : 32,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      gsap.utils.toArray(".snew-reveal-left").forEach((el) => {
        gsap.from(el, {
          opacity: prefersReduced ? 1 : 0,
          x: prefersReduced ? 0 : -30,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      gsap.utils.toArray(".snew-reveal-right").forEach((el) => {
        gsap.from(el, {
          opacity: prefersReduced ? 1 : 0,
          x: prefersReduced ? 0 : 30,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      gsap.utils.toArray(".snew-reveal-stagger").forEach((el) => {
        gsap.from(el.children, {
          opacity: prefersReduced ? 1 : 0,
          y: prefersReduced ? 0 : 26,
          duration: 0.6,
          stagger: 0.06,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      gsap.utils.toArray(".snew-zoom-in").forEach((el) => {
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
    <div className="employee-workflows">
      <Seo {...SEO} />
      <HeroSection heroTextRef={heroTextRef} heroRef={heroRef} />
      <TrustedByMarquee label="Trusted by HR & People Operations Leaders" />
      <OverviewSection />
      <ChallengesSection />
      <SolutionsSection />
      <FeaturesSection />
      <BenefitsSection />
      <ProcessSection />
      <IndustriesSection />
      <WhyMirketaSection />
      <TechStackTabsSection />
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
    <section ref={heroRef} className="snew-hero" style={{ backgroundImage: `url("${Images.heroServiceNowEmployeeWorkflows}")` }} aria-label={HERO.title}>
      <div className="snew-hero__scrim" />
      <div className="container">
        <Breadcrumb items={BREADCRUMB_ITEMS} className="snew-breadcrumb" />
        <div className="snew-hero__inner">
          <div ref={heroTextRef} className="snew-hero__text">
            <span className="snew-badge">
              <span className="snew-badge__spark" aria-hidden="true">✦</span> {HERO.badge}
            </span>
            <h1>{HERO.title}</h1>
            <p className="snew-hero__description">{HERO.description}</p>
            <div className="snew-hero__ctas">
              <a href={HERO.primaryCta.href} className="btn btn-primary snew-btn">
                {HERO.primaryCta.label} <span aria-hidden="true">→</span>
              </a>
              <a href={HERO.secondaryCta.href} className="btn btn-secondary snew-btn">
                {HERO.secondaryCta.label}
              </a>
            </div>
            <ul className="snew-hero__metrics">
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
            className="snew-hero__visual snew-zoom-in"
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
    <section className="section snew-overview" aria-labelledby="snew-overview-heading">
      <div className="container">
        <div className="section-heading snew-reveal">
          <p className="snew-eyebrow">{OVERVIEW.eyebrow}</p>
          <h2 id="snew-overview-heading">{OVERVIEW.heading}</h2>
        </div>
        <div className="snew-overview__grid snew-reveal-stagger">
          {OVERVIEW.paragraphs.map((p, i) => (
            <p className="snew-overview__text" key={i}>{p}</p>
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
    <section className="section snew-challenges" aria-labelledby="snew-challenges-heading">
      <div className="container">
        <div className="section-heading snew-reveal">
          <p className="snew-eyebrow">{CHALLENGES.eyebrow}</p>
          <h2 id="snew-challenges-heading">{CHALLENGES.heading}</h2>
          <p>{CHALLENGES.intro}</p>
        </div>
        <div className="snew-challenges__grid snew-reveal-stagger">
          {CHALLENGES.items.map((c) => (
            <div className="snew-challenge-card" key={c.title}>
              <span className="snew-challenge-card__icon">{c.icon}</span>
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
    <section className="section snew-solutions" aria-labelledby="snew-solutions-heading">
      <div className="container">
        <div className="section-heading snew-reveal">
          <p className="snew-eyebrow">{SOLUTIONS.eyebrow}</p>
          <h2 id="snew-solutions-heading">{SOLUTIONS.heading}</h2>
          <p>{SOLUTIONS.intro}</p>
        </div>
        <div className="snew-solutions__grid snew-reveal-stagger">
          {SOLUTIONS.items.map((s) => (
            <div className="snew-solution-card" key={s.title}>
              <span className="snew-solution-card__icon">{s.icon}</span>
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
// FEATURES — accordion list
// ============================================================

function FeaturesSection() {
  const [openSet, setOpenSet] = useState(() => new Set([0]));

  const toggle = (i) => {
    setOpenSet((prev) => {
      const next = new Set(prev);
      if (next.has(i)) {
        next.delete(i);
      } else {
        next.add(i);
      }
      return next;
    });
  };

  return (
    <section className="section snew-features" aria-labelledby="snew-features-heading">
      <div className="container">
        <div className="snew-features__head snew-reveal">
          <div className="section-heading">
            <p className="snew-eyebrow">{FEATURES.eyebrow}</p>
            <h2 id="snew-features-heading">{FEATURES.heading}</h2>
            <p>{FEATURES.intro}</p>
          </div>
        </div>
        <div className="snew-features__grid snew-reveal-stagger">
          {FEATURES.items.map((f, i) => {
            const open = openSet.has(i);
            const panelId = `snew-feature-panel-${i}`;
            return (
              <div className={`snew-feature-card ${open ? "is-open" : ""}`} key={f.title}>
                <button
                  type="button"
                  className="snew-feature-card__trigger"
                  aria-expanded={open}
                  aria-controls={panelId}
                  onClick={() => toggle(i)}
                >
                  <div className="snew-feature-card__head">
                    <span className="snew-feature-card__icon">{f.icon}</span>
                    <span className="snew-feature-card__toggle" aria-hidden="true">{open ? "−" : "+"}</span>
                  </div>
                  <span className="snew-feature-card__num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="snew-feature-card__title">{f.title}</span>
                </button>
                <div id={panelId} className="snew-feature-card__answer" role="region" hidden={!open}>
                  <p>{f.description}</p>
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
// BENEFITS
// ============================================================

function BenefitsSection() {
  return (
    <section className="section snew-benefits" aria-labelledby="snew-benefits-heading">
      <div className="container">
        <div className="section-heading snew-reveal">
          <p className="snew-eyebrow">{BENEFITS.eyebrow}</p>
          <h2 id="snew-benefits-heading">{BENEFITS.heading}</h2>
          <p>{BENEFITS.intro}</p>
        </div>
        <div className="snew-benefits__grid snew-reveal-stagger">
          {BENEFITS.items.map((b) => (
            <div className="snew-benefit-item" key={b.title}>
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
// IMPLEMENTATION PROCESS — zigzag alternating timeline
// ============================================================

function ProcessSection() {
  return (
    <section className="section snew-process" aria-labelledby="snew-process-heading">
      <div className="container">
        <div className="section-heading snew-reveal">
          <p className="snew-eyebrow">{PROCESS.eyebrow}</p>
          <h2 id="snew-process-heading">{PROCESS.heading}</h2>
          <p>{PROCESS.intro}</p>
        </div>
        <div className="snew-process__zigzag">
          <span className="snew-process__line" aria-hidden="true" />
          {PROCESS.stages.map((s, i) => (
            <div className={`snew-process__row ${i % 2 === 1 ? "snew-process__row--reverse" : ""}`} key={s.name}>
              <div className={`snew-process__card ${i % 2 === 1 ? "snew-reveal-right" : "snew-reveal-left"}`}>
                <span className="snew-process__num">{String(i + 1).padStart(2, "0")}</span>
                <h3>{s.name}</h3>
                <p>{s.description}</p>
              </div>
              <div className="snew-process__spacer" aria-hidden="true" />
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
    <section className="section snew-industries" aria-labelledby="snew-industries-heading">
      <div className="container">
        <div className="section-heading snew-reveal">
          <p className="snew-eyebrow">{INDUSTRIES.eyebrow}</p>
          <h2 id="snew-industries-heading">{INDUSTRIES.heading}</h2>
          <p>{INDUSTRIES.intro}</p>
        </div>
        <div className="snew-industries__grid snew-reveal-stagger">
          {INDUSTRIES.items.map((n) => (
            <div className="snew-industry-card" key={n.title}>
              <span className="snew-industry-card__icon">{n.icon}</span>
              <h4>{n.title}</h4>
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
    <section className="section snew-why" aria-labelledby="snew-why-heading">
      <div className="container">
        <div className="section-heading snew-reveal">
          <p className="snew-eyebrow">{WHY_MIRKETA.eyebrow}</p>
          <h2 id="snew-why-heading">{WHY_MIRKETA.heading}</h2>
          <p>{WHY_MIRKETA.intro}</p>
        </div>
        <div className="snew-why__grid snew-reveal-stagger">
          {WHY_MIRKETA.items.map((w) => (
            <div className="snew-why-card" key={w.title}>
              <span className="snew-why-card__icon">{w.icon}</span>
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
// TECHNOLOGY STACK — accessible tabs
// ============================================================

function TechStackTabsSection() {
  const [activeKey, setActiveKey] = useState(TECH_STACK_TABS[0].key);
  const tabRefs = useRef([]);
  const activeIndex = TECH_STACK_TABS.findIndex((t) => t.key === activeKey);
  const active = TECH_STACK_TABS[activeIndex];

  const focusTab = (index) => {
    const wrapped = (index + TECH_STACK_TABS.length) % TECH_STACK_TABS.length;
    setActiveKey(TECH_STACK_TABS[wrapped].key);
    tabRefs.current[wrapped]?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowRight") { e.preventDefault(); focusTab(activeIndex + 1); }
    else if (e.key === "ArrowLeft") { e.preventDefault(); focusTab(activeIndex - 1); }
    else if (e.key === "Home") { e.preventDefault(); focusTab(0); }
    else if (e.key === "End") { e.preventDefault(); focusTab(TECH_STACK_TABS.length - 1); }
  };

  return (
    <section className="section snew-stack" aria-labelledby="snew-stack-heading">
      <div className="container">
        <div className="section-heading snew-reveal">
          <p className="snew-eyebrow">Technology Stack</p>
          <h2 id="snew-stack-heading">The Now Platform Applications We Configure</h2>
          <p>A ServiceNow Employee Workflows Implementation draws on this specific set of applications — select one to learn more.</p>
        </div>

        <div className="snew-stack__tablist" role="tablist" aria-label="ServiceNow Employee Workflows technology stack" onKeyDown={handleKeyDown}>
          {TECH_STACK_TABS.map((t, i) => (
            <button
              key={t.key}
              ref={(el) => (tabRefs.current[i] = el)}
              role="tab"
              id={`snew-tab-${t.key}`}
              aria-selected={activeKey === t.key}
              aria-controls={`snew-panel-${t.key}`}
              tabIndex={activeKey === t.key ? 0 : -1}
              className={`snew-stack__tab ${activeKey === t.key ? "is-active" : ""}`}
              onClick={() => setActiveKey(t.key)}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div
          className="snew-stack__panel snew-reveal"
          role="tabpanel"
          id={`snew-panel-${active.key}`}
          aria-labelledby={`snew-tab-${active.key}`}
          tabIndex={0}
        >
          <h3>{active.label}</h3>
          <p>{active.description}</p>
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
    <section className="section snew-faq" aria-labelledby="snew-faq-heading">
      <div className="container">
        <div className="section-heading snew-reveal">
          <p className="snew-eyebrow">FAQ</p>
          <h2 id="snew-faq-heading">Frequently Asked Questions About ServiceNow Employee Workflows Implementation</h2>
        </div>
        <FaqAccordion items={FAQS} className="snew-reveal" searchPlaceholder="Ask a question — e.g. &quot;HRSD&quot;, &quot;onboarding&quot;, &quot;portal&quot;..." />
        <p className="snew-faq__links">
          Related reading: <Link to="/servicenow">ServiceNow Solutions</Link>,{" "}
          <Link to="/servicenow-consulting-development-services">ServiceNow Consulting &amp; Development Services</Link>,{" "}
          <Link to="/servicenow-technology-workflows">ServiceNow Technology Workflows</Link>,{" "}
          <Link to="/servicenow-customer-workflows">ServiceNow Customer Workflows</Link>,{" "}
          <Link to="/servicenow-creator-workflows">ServiceNow Creator Workflows</Link>,{" "}
          <Link to="/servicenow-support-managed-services">ServiceNow Managed Services</Link>,{" "}
          <Link to="/oracle-fusion-applications-implementation">Oracle Fusion Applications Implementation</Link>,{" "}
          <Link to="/oracle-premium-support-service">Oracle Premium Support Service</Link>,{" "}
          <Link to="/salesforce-consulting-development-services">Salesforce Development &amp; Consulting</Link>,{" "}
          <Link to="/salesforce">Salesforce Clouds</Link>,{" "}
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
    <section className="snew-final-cta snew-reveal" aria-labelledby="snew-final-cta-heading">
      <div className="container snew-final-cta__inner">
        <h2 id="snew-final-cta-heading">{FINAL_CTA.heading}</h2>
        <p>{FINAL_CTA.description}</p>
        <div className="snew-final-cta__ctas">
          <a href={FINAL_CTA.primaryCta.href} className="btn btn-primary snew-btn">
            {FINAL_CTA.primaryCta.label} <span aria-hidden="true">→</span>
          </a>
          <a href={FINAL_CTA.secondaryCta.href} className="btn btn-secondary snew-btn">
            {FINAL_CTA.secondaryCta.label}
          </a>
        </div>
      </div>
    </section>
  );
}
