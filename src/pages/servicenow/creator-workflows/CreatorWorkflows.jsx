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
import "./CreatorWorkflows.css";

gsap.registerPlugin(ScrollTrigger);

// ============================================================
// ICONS
// ============================================================

const Ico = {
  check: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12.5l5 5L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  backlog: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="4" y="4" width="16" height="4" rx="1" stroke="currentColor" strokeWidth="1.4" /><rect x="4" y="10" width="16" height="4" rx="1" stroke="currentColor" strokeWidth="1.4" /><rect x="4" y="16" width="10" height="4" rx="1" stroke="currentColor" strokeWidth="1.4" /></svg>
  ),
  spreadsheet: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="1.5" stroke="currentColor" strokeWidth="1.4" /><path d="M4 10h16M10 4v16" stroke="currentColor" strokeWidth="1.3" /></svg>
  ),
  gavel: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 12l6-6 6 6-6 6-6-6z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /><path d="M4 20h8M9 15l-5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
  ),
  clock: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.4" /><path d="M12 7v5l3.5 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  code: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 8l-5 4 5 4M15 8l5 4-5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  plug: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 3v5M15 3v5M7 8h10v4a5 5 0 01-10 0V8z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="M12 17v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
  ),
  flow: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="5" cy="6" r="2" stroke="currentColor" strokeWidth="1.4" /><circle cx="19" cy="6" r="2" stroke="currentColor" strokeWidth="1.4" /><circle cx="12" cy="18" r="2" stroke="currentColor" strokeWidth="1.4" /><path d="M7 6h10M6 8l5 8M18 8l-5 8" stroke="currentColor" strokeWidth="1.3" /></svg>
  ),
  mobile: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="7" y="2" width="10" height="20" rx="2" stroke="currentColor" strokeWidth="1.4" /><path d="M10 19h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
  ),
  template: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.4" /><path d="M4 9h16M9 9v11" stroke="currentColor" strokeWidth="1.3" /></svg>
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

const HERO_DASHBOARD = {
  title: "App Engine Delivery Board",
  stats: [
    { label: "APPS SHIPPED", value: "40+", caption: "Governed, production-ready" },
    { label: "DELIVERY TIME", value: "-55%", caption: "Vs. traditional IT backlog" },
    { label: "ACL REVIEWS", value: "100%", caption: "Every app, every time" },
  ],
  rows: [
    { title: "Store-audit mobile app", meta: "App Engine · UAT signoff pending", tone: "neutral", status: "In Review" },
    { title: "Vendor-approval workflow", meta: "Integration Hub · ERP connector live", tone: "good", status: "Shipped" },
    { title: "Citizen-developer app request", meta: "Governance intake · ACL review complete", tone: "good", status: "Approved" },
  ],
  floatingCards: [
    { icon: Ico.code, title: "40+ Apps Shipped", subtitle: "Governed App Engine builds" },
    { icon: Ico.shield, title: "100% ACL Reviews", subtitle: "Every app, every time" },
  ],
};

const CONSULTATION = {
  eyebrow: "Get Started",
  heading: "Schedule a Consultation",
  description: "Tell us about your App Engine or low-code development goals — a certified consultant will follow up within one business day.",
  formTitle: "Schedule a Free Consultation",
};

const BREADCRUMB_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Platforms & Technology", href: "/" },
  { label: "ServiceNow", href: "/servicenow" },
  { label: "Creator Workflows" },
];

const HERO = {
  badge: "ServiceNow App Engine Development Partner",
  title: "ServiceNow Creator Workflows App Engine Development for Governed, Fast-Moving Innovation",
  description:
    "Mirketa's ServiceNow Creator Workflows App Engine Development turns backlogged app requests into governed, production-ready workflows — built on App Engine, Integration Hub, and Automation Engine, without the shadow-IT sprawl that comes from ungoverned low-code.",
  primaryCta: { label: "Schedule a Consultation", href: "#contact" },
  secondaryCta: { label: "Talk to a ServiceNow Expert", href: "#contact" },
  metrics: [
    "Certified App Engine Consultants",
    "Governed Low-Code From Day One",
    "Faster App Delivery Post Go-Live",
    "24×7 Managed Support Available",
  ],
};

const OVERVIEW = {
  eyebrow: "Overview",
  heading: "What ServiceNow Creator Workflows App Engine Development Means in Practice",
  paragraphs: [
    "Every business team eventually needs a custom digital workflow that doesn't fit neatly into an existing system — a store-audit checklist, an equipment inspection log, a vendor-approval tracker. Traditionally, that request joins an IT backlog measured in months, so the business team builds it themselves in a spreadsheet or a consumer app instead. ServiceNow Creator Workflows App Engine Development gives teams a faster, governed alternative: build the same app on the Now Platform, in days or weeks, with IT oversight built in from the start rather than discovered after the fact.",
    "In practice, this means App Engine Studio provides a guided, low-code environment where both professional developers and trained business users can design forms, lists, workflows, and mobile experiences without writing every line of code by hand. Integration Hub connects that new app to the systems it actually needs to talk to — your ERP, your CRM, your identity provider — using pre-built connectors instead of custom point-to-point code. And because everything runs on the same Now Platform instance as your other workflows, governance, security, and access control apply automatically instead of needing to be bolted on later.",
    "Mirketa configures ServiceNow Creator Workflows around your organization's actual appetite for citizen development — some clients want IT-led App Engine builds only, others want a governed citizen-development program with guardrails. Either way, the result is faster time-to-value for new digital workflows without recreating the shadow-IT problem you were trying to solve in the first place.",
  ],
};

const CHALLENGES = {
  eyebrow: "Challenges",
  heading: "Why Digital Innovation Stalls Without Governed Creator Workflows",
  intro:
    "These are the four problems we see most often before a ServiceNow Creator Workflows App Engine Development engagement — familiar to any organization where IT can't keep up with the pace business teams need.",
  items: [
    {
      icon: Ico.clock,
      title: "IT Backlog Blocking New App Requests for Months",
      description: "A simple internal workflow request waits behind higher-priority projects for months, even when the business impact of the delay compounds daily.",
    },
    {
      icon: Ico.spreadsheet,
      title: "Shadow-IT Spreadsheets Filling the Gap",
      description: "Frustrated teams build their own tracking spreadsheets and consumer apps, creating fragile, unsupported tools nobody in IT even knows exist.",
    },
    {
      icon: Ico.shield,
      title: "No Governance Over Citizen-Developed Apps",
      description: "Once a shadow app exists, there's no visibility into what data it touches, who can access it, or what happens when the person who built it leaves.",
    },
    {
      icon: Ico.backlog,
      title: "Slow Time-to-Value for New Digital Workflows",
      description: "By the time a properly governed app finally ships through traditional development, the business need it was meant to solve has often already changed.",
    },
  ],
};

const SOLUTIONS = {
  eyebrow: "Solutions",
  heading: "How Mirketa Configures ServiceNow to Fix Each Problem",
  intro:
    "Each challenge above maps to a specific configuration decision inside a ServiceNow Creator Workflows App Engine Development engagement — not a generic module activation.",
  items: [
    {
      icon: Ico.code,
      title: "App Engine as a Faster, Governed Alternative",
      description: "Low-code development on App Engine ships working apps in weeks, with the same platform governance as everything else running on ServiceNow.",
    },
    {
      icon: Ico.template,
      title: "Templates and Accelerators for Common Use Cases",
      description: "Pre-built App Engine templates cut development time further for common patterns like inspections, approvals, and request tracking.",
    },
    {
      icon: Ico.shield,
      title: "Built-In Access Control and App Governance",
      description: "Every App Engine app inherits platform-level security, role design, and change control automatically — no separate governance process required.",
    },
    {
      icon: Ico.plug,
      title: "Integration Hub Instead of Custom Point-to-Point Code",
      description: "Pre-built connectors let new apps talk to your ERP, CRM, and identity systems without hand-written integration code that nobody else can maintain.",
    },
  ],
};

const FEATURES = [
  {
    id: "studio",
    icon: Ico.code,
    title: "App Engine Studio Development",
    description: "A guided, low-code environment for designing forms, lists, workflows, and business logic — used by both professional developers and trained business creators to build production-ready apps faster than traditional development.",
  },
  {
    id: "governance",
    icon: Ico.shield,
    title: "Low-Code App Governance",
    description: "Every app built on App Engine inherits platform-level access control, change management, and audit trails automatically, so citizen development never becomes ungoverned shadow IT.",
  },
  {
    id: "integration",
    icon: Ico.plug,
    title: "Integration Hub Connectors",
    description: "Pre-built, reusable connectors link new apps to your ERP, CRM, and identity systems, replacing custom point-to-point integration code with configuration your team can actually maintain.",
  },
  {
    id: "automation",
    icon: Ico.flow,
    title: "Automation Engine (Flow Designer)",
    description: "Business logic and approval routing are configured visually with Flow Designer, so workflow changes don't require a developer to touch code every time a process evolves.",
  },
  {
    id: "mobile",
    icon: Ico.mobile,
    title: "Mobile App Experience",
    description: "Every App Engine app is mobile-ready by default, giving field teams and remote employees the same functionality on a phone that they'd get on a desktop.",
  },
  {
    id: "templates",
    icon: Ico.template,
    title: "App Engine Templates & Accelerators",
    description: "Pre-built templates for common patterns — inspections, approvals, request tracking — give new projects a head start instead of building every app from a blank canvas.",
  },
];

const BENEFITS = {
  eyebrow: "Benefits",
  heading: "What a Governed Creator Workflow Delivers",
  intro: "These are the outcomes clients report after standing up governed App Engine development on ServiceNow.",
  items: [
    { title: "Faster App Delivery", description: "New digital workflows ship in weeks instead of the months a traditional development backlog would require." },
    { title: "Fewer Shadow-IT Tools", description: "A faster, governed alternative removes the incentive for teams to build their own unsupported spreadsheets and apps." },
    { title: "Consistent Governance by Default", description: "Every App Engine app inherits the same access control and audit trail as the rest of your ServiceNow instance." },
    { title: "Lower Integration Maintenance Burden", description: "Integration Hub connectors are reusable and configuration-based, not custom code only one person understands." },
    { title: "Broader Development Capacity", description: "Trained business creators can build within governed guardrails, expanding capacity beyond what IT alone could deliver." },
    { title: "Mobile-Ready Apps Without Extra Work", description: "Field and remote teams get a working mobile experience automatically, with no separate mobile development effort." },
  ],
};

const PROCESS = {
  eyebrow: "Implementation Process",
  heading: "A Six-Stage Path to ServiceNow Creator Workflows App Engine Development",
  intro:
    "Every ServiceNow Creator Workflows App Engine Development engagement Mirketa delivers follows the same structured methodology — refined across low-code programs for organizations at every stage of platform maturity.",
  stages: [
    { name: "Discovery & Use Case Scoping", description: "We identify the highest-impact app requests sitting in your backlog and assess which are the right fit for App Engine." },
    { name: "App Design", description: "We design the data model, workflow logic, and user experience for the app before a single screen is built." },
    { name: "Low-Code Build", description: "The app is built in App Engine Studio, using templates and accelerators wherever they fit the use case." },
    { name: "Integration", description: "Integration Hub connectors link the new app to the ERP, CRM, or identity systems it needs to exchange data with." },
    { name: "Governance Review", description: "Access control, audit configuration, and change management are validated before the app moves toward production." },
    { name: "Launch & Iterate", description: "The app goes live with a feedback loop built in, so early usage data drives the next round of improvements." },
  ],
};

const INDUSTRIES = {
  eyebrow: "Industry Expertise",
  heading: "Creator Workflows Experience Across Complex Organizations",
  intro: "App Engine use cases differ meaningfully by industry — our delivery teams bring domain context, not a one-size-fits-all template.",
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
  heading: "A ServiceNow Partner That Builds Fast Without Sacrificing Governance",
  intro: "Activating App Engine is easy. Building a governed, sustainable low-code program is where engagements succeed or stall.",
  items: [
    { icon: Ico.award, title: "Certified App Engine Consultants", description: "Every consultant on a Creator Workflows engagement holds active ServiceNow App Engine certifications." },
    { icon: Ico.compass, title: "Governance-First Design Philosophy", description: "We build access control and audit configuration into every app from day one, not as a retrofit after launch." },
    { icon: Ico.robot, title: "AI-Ready From Day One", description: "Generative app scaffolding and intelligent form design are built into our App Engine delivery approach from the start." },
    { icon: Ico.shield, title: "Post Go-Live Support", description: "A dedicated managed services team keeps your App Engine apps and integrations healthy long after launch." },
  ],
};

const TECH_STACK = {
  eyebrow: "Technology Stack",
  heading: "The Now Platform Applications We Configure",
  intro: "A ServiceNow Creator Workflows App Engine Development engagement draws on this specific set of applications.",
  items: [
    { icon: Ico.code, label: "App Engine Studio" },
    { icon: Ico.plug, label: "Integration Hub" },
    { icon: Ico.flow, label: "Flow Designer" },
    { icon: Ico.mobile, label: "Mobile Studio" },
    { icon: Ico.template, label: "App Engine Templates" },
    { icon: Ico.pulse, label: "Performance Analytics" },
  ],
};

const FAQS = [
  {
    q: "What is ServiceNow Creator Workflows App Engine Development?",
    a: "ServiceNow Creator Workflows App Engine Development is the process of building custom, governed applications on the Now Platform using App Engine Studio, Integration Hub, and Automation Engine — giving business teams a faster alternative to the traditional IT backlog without creating ungoverned shadow IT.",
  },
  {
    q: "Is App Engine the same as a citizen development free-for-all?",
    a: "No. App Engine can support citizen developers, but every app inherits platform-level governance — access control, audit trails, and change management — automatically. Mirketa configures the guardrails that keep low-code development governed, not unchecked.",
  },
  {
    q: "How long does it take to build an app on App Engine?",
    a: "A focused single-use-case app typically ships in 3–6 weeks with Mirketa's App Engine Development approach, depending on integration complexity and whether an existing template fits the use case. More complex, multi-integration apps can take 2–4 months.",
  },
  {
    q: "Do we need a developer, or can business users build apps themselves?",
    a: "Both are possible. App Engine's low-code environment allows trained business users to build simpler apps directly, while more complex logic and integrations typically benefit from a professional developer's involvement — Mirketa can staff either model depending on your program's maturity.",
  },
  {
    q: "Can Creator Workflows apps integrate with our ERP or CRM?",
    a: "Yes. Integration Hub provides pre-built connectors to systems like Salesforce, Oracle, and SAP, so new App Engine apps can exchange data with your ERP or CRM without custom point-to-point integration code.",
  },
  {
    q: "What happens to an App Engine app if the person who built it leaves?",
    a: "Because every App Engine app runs on the same governed Now Platform instance, ownership, documentation, and access control persist independently of any one individual — unlike an unsupported spreadsheet or personal automation tool.",
  },
  {
    q: "Can Mirketa help us build a citizen development program, not just individual apps?",
    a: "Yes. Beyond individual App Engine builds, we help organizations design the governance model, training, and review process needed to run a sustainable citizen development program at scale.",
  },
  {
    q: "Do you provide managed support after apps go live?",
    a: "Yes. Every Creator Workflows engagement can transition into an ongoing managed services engagement covering app maintenance, integration monitoring, and SLA-backed support with a dedicated team.",
  },
];

const FINAL_CTA = {
  heading: "Start Your ServiceNow Creator Workflows App Engine Development Today",
  description:
    "Partner with Mirketa's certified App Engine consultants to turn backlogged app requests into governed, production-ready workflows — or speak with a ServiceNow expert before you commit to a scope.",
  primaryCta: { label: "Schedule a Consultation", href: "#contact" },
  secondaryCta: { label: "Talk to a ServiceNow Expert", href: "#contact" },
};

const SEO = {
  title: "ServiceNow Creator Workflows App Engine Dev | Mirketa",
  description:
    "Mirketa delivers ServiceNow Creator Workflows App Engine Development — governed low-code apps, Integration Hub, and Automation Engine on the Now Platform.",
  canonical: "https://mirketa.us/servicenow-creator-workflows/",
  keywords: [
    "ServiceNow Creator Workflows",
    "ServiceNow App Engine Development",
    "ServiceNow Low-Code Platform",
    "ServiceNow Integration Hub",
    "ServiceNow Flow Designer",
    "ServiceNow Citizen Development Governance",
    "ServiceNow Custom App Development",
    "App Engine Studio",
    "Now Platform Low-Code",
    "ServiceNow Mobile App Development",
  ],
  ogTitle: "ServiceNow Creator Workflows & App Engine Development Services",
  ogDescription:
    "Governed low-code app development on the Now Platform — Mirketa's certified App Engine consultants ship apps fast without shadow IT.",
  twitterTitle: "ServiceNow App Engine Development | Mirketa",
  twitterDescription:
    "See how Mirketa builds ServiceNow Creator Workflows — App Engine Studio, Integration Hub, and Automation Engine in one governed system.",
  schema: [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "ServiceNow Creator Workflows App Engine Development",
      provider: { "@type": "Organization", name: "Mirketa Inc.", url: "https://mirketa.us" },
      name: "ServiceNow Creator Workflows App Engine Development",
      description:
        "Governed low-code app development on the ServiceNow Now Platform using App Engine Studio, Integration Hub, and Automation Engine.",
      areaServed: "Global",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://mirketa.us/" },
        { "@type": "ListItem", position: 2, name: "ServiceNow", item: "https://mirketa.us/servicenow/" },
        { "@type": "ListItem", position: 3, name: "Creator Workflows", item: "https://mirketa.us/servicenow-creator-workflows/" },
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

export default function CreatorWorkflows() {
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

      gsap.utils.toArray(".sncr-reveal").forEach((el) => {
        gsap.from(el, {
          opacity: prefersReduced ? 1 : 0,
          y: prefersReduced ? 0 : 32,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      gsap.utils.toArray(".sncr-reveal-left").forEach((el) => {
        gsap.from(el, {
          opacity: prefersReduced ? 1 : 0,
          x: prefersReduced ? 0 : -30,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      gsap.utils.toArray(".sncr-reveal-right").forEach((el) => {
        gsap.from(el, {
          opacity: prefersReduced ? 1 : 0,
          x: prefersReduced ? 0 : 30,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      gsap.utils.toArray(".sncr-reveal-stagger").forEach((el) => {
        gsap.from(el.children, {
          opacity: prefersReduced ? 1 : 0,
          y: prefersReduced ? 0 : 26,
          duration: 0.6,
          stagger: 0.06,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      gsap.utils.toArray(".sncr-zoom-in").forEach((el) => {
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
    <div className="creator-workflows">
      <Seo {...SEO} />
      <HeroSection heroTextRef={heroTextRef} heroRef={heroRef} />
      <TrustedByMarquee label="Trusted by Digital Innovation Teams" />
      <OverviewSection />
      <ChallengesSection />
      <SolutionsSection />
      <FeaturesFlowSection />
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
    <section ref={heroRef} className="sncr-hero" style={{ backgroundImage: `url("${Images.heroServiceNowCreatorWorkflows}")` }} aria-label={HERO.title}>
      <div className="sncr-hero__scrim" />
      <div className="container">
        <Breadcrumb items={BREADCRUMB_ITEMS} className="sncr-breadcrumb" />
        <div className="sncr-hero__inner">
          <div ref={heroTextRef} className="sncr-hero__text">
            <span className="sncr-badge">
              <span className="sncr-badge__spark" aria-hidden="true">✦</span> {HERO.badge}
            </span>
            <h1>{HERO.title}</h1>
            <p className="sncr-hero__description">{HERO.description}</p>
            <div className="sncr-hero__ctas">
              <a href={HERO.primaryCta.href} className="btn btn-primary sncr-btn">
                {HERO.primaryCta.label} <span aria-hidden="true">→</span>
              </a>
              <a href={HERO.secondaryCta.href} className="btn btn-secondary sncr-btn">
                {HERO.secondaryCta.label}
              </a>
            </div>
            <ul className="sncr-hero__metrics">
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
            className="sncr-hero__visual sncr-zoom-in"
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
    <section className="section sncr-overview" aria-labelledby="sncr-overview-heading">
      <div className="container">
        <div className="section-heading sncr-reveal">
          <p className="sncr-eyebrow">{OVERVIEW.eyebrow}</p>
          <h2 id="sncr-overview-heading">{OVERVIEW.heading}</h2>
        </div>
        <div className="sncr-overview__grid sncr-reveal-stagger">
          {OVERVIEW.paragraphs.map((p, i) => (
            <p className="sncr-overview__text" key={i}>{p}</p>
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
    <section className="section sncr-challenges" aria-labelledby="sncr-challenges-heading">
      <div className="container">
        <div className="section-heading sncr-reveal">
          <p className="sncr-eyebrow">{CHALLENGES.eyebrow}</p>
          <h2 id="sncr-challenges-heading">{CHALLENGES.heading}</h2>
          <p>{CHALLENGES.intro}</p>
        </div>
        <div className="sncr-challenges__grid sncr-reveal-stagger">
          {CHALLENGES.items.map((c) => (
            <div className="sncr-challenge-card" key={c.title}>
              <span className="sncr-challenge-card__icon">{c.icon}</span>
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
    <section className="section sncr-solutions" aria-labelledby="sncr-solutions-heading">
      <div className="container">
        <div className="section-heading sncr-reveal">
          <p className="sncr-eyebrow">{SOLUTIONS.eyebrow}</p>
          <h2 id="sncr-solutions-heading">{SOLUTIONS.heading}</h2>
          <p>{SOLUTIONS.intro}</p>
        </div>
        <div className="sncr-solutions__grid sncr-reveal-stagger">
          {SOLUTIONS.items.map((s) => (
            <div className="sncr-solution-card" key={s.title}>
              <span className="sncr-solution-card__icon">{s.icon}</span>
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
// FEATURES — connected workflow-flow diagram
// ============================================================

function FeaturesFlowSection() {
  return (
    <section className="section sncr-features" aria-labelledby="sncr-features-heading">
      <div className="container">
        <div className="sncr-features__head sncr-reveal">
          <div className="section-heading">
            <p className="sncr-eyebrow">Core Capabilities</p>
            <h2 id="sncr-features-heading">The ServiceNow Modules Behind a Governed Creator Workflow</h2>
            <p>A ServiceNow Creator Workflows App Engine Development engagement is built from a specific set of connected Now Platform applications.</p>
          </div>
        </div>
        <div className="sncr-flow">
          <span className="sncr-flow__line" aria-hidden="true" />
          {FEATURES.map((f, i) => (
            <div className={`sncr-flow-item ${i % 2 === 1 ? "sncr-flow-item--reverse" : ""}`} key={f.id}>
              <span className="sncr-flow-item__node" aria-hidden="true" />
              <div className="sncr-flow-item__card">
                <span className="sncr-flow-item__icon">{f.icon}</span>
                <h3>{f.title}</h3>
                <p>{f.description}</p>
              </div>
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
    <section className="section sncr-benefits" aria-labelledby="sncr-benefits-heading">
      <div className="container">
        <div className="section-heading sncr-reveal">
          <p className="sncr-eyebrow">{BENEFITS.eyebrow}</p>
          <h2 id="sncr-benefits-heading">{BENEFITS.heading}</h2>
          <p>{BENEFITS.intro}</p>
        </div>
        <div className="sncr-benefits__grid sncr-reveal-stagger">
          {BENEFITS.items.map((b) => (
            <div className="sncr-benefit-item" key={b.title}>
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
// IMPLEMENTATION PROCESS — stepped/staggered roadmap
// ============================================================

function ProcessSection() {
  return (
    <section className="section sncr-process" aria-labelledby="sncr-process-heading">
      <div className="container">
        <div className="section-heading sncr-reveal">
          <p className="sncr-eyebrow">{PROCESS.eyebrow}</p>
          <h2 id="sncr-process-heading">{PROCESS.heading}</h2>
          <p>{PROCESS.intro}</p>
        </div>
        <div className="sncr-process__roadmap sncr-reveal-stagger">
          {PROCESS.stages.map((s, i) => (
            <div className={`sncr-process-card ${i % 2 === 1 ? "sncr-process-card--down" : ""}`} key={s.name}>
              <span className="sncr-process-card__num">{i + 1}</span>
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
// INDUSTRIES
// ============================================================

function IndustriesSection() {
  return (
    <section className="section sncr-industries" aria-labelledby="sncr-industries-heading">
      <div className="container">
        <div className="section-heading sncr-reveal">
          <p className="sncr-eyebrow">{INDUSTRIES.eyebrow}</p>
          <h2 id="sncr-industries-heading">{INDUSTRIES.heading}</h2>
          <p>{INDUSTRIES.intro}</p>
        </div>
        <div className="sncr-industries__grid sncr-reveal-stagger">
          {INDUSTRIES.items.map((n) => (
            <div className="sncr-industry-card" key={n.title}>
              <span className="sncr-industry-card__icon">{n.icon}</span>
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
    <section className="section sncr-why" aria-labelledby="sncr-why-heading">
      <div className="container">
        <div className="section-heading sncr-reveal">
          <p className="sncr-eyebrow">{WHY_MIRKETA.eyebrow}</p>
          <h2 id="sncr-why-heading">{WHY_MIRKETA.heading}</h2>
          <p>{WHY_MIRKETA.intro}</p>
        </div>
        <div className="sncr-why__grid sncr-reveal-stagger">
          {WHY_MIRKETA.items.map((w) => (
            <div className="sncr-why-card" key={w.title}>
              <span className="sncr-why-card__icon">{w.icon}</span>
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
    <section className="section sncr-stack" aria-labelledby="sncr-stack-heading">
      <div className="container">
        <div className="section-heading sncr-reveal">
          <p className="sncr-eyebrow">{TECH_STACK.eyebrow}</p>
          <h2 id="sncr-stack-heading">{TECH_STACK.heading}</h2>
          <p>{TECH_STACK.intro}</p>
        </div>
        <div className="sncr-stack__grid sncr-reveal-stagger">
          {TECH_STACK.items.map((t) => (
            <div className="sncr-stack-chip" key={t.label}>
              <span className="sncr-stack-chip__icon">{t.icon}</span>
              <span className="sncr-stack-chip__label">{t.label}</span>
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
    <section className="section sncr-faq" aria-labelledby="sncr-faq-heading">
      <div className="container">
        <div className="section-heading sncr-reveal">
          <p className="sncr-eyebrow">FAQ</p>
          <h2 id="sncr-faq-heading">Frequently Asked Questions About ServiceNow Creator Workflows App Engine Development</h2>
        </div>
        <FaqAccordion items={FAQS} className="sncr-reveal" searchPlaceholder="Ask a question — e.g. &quot;App Engine&quot;, &quot;governance&quot;, &quot;integration&quot;..." />
        <p className="sncr-faq__links">
          Related reading: <Link to="/servicenow">ServiceNow Solutions</Link>,{" "}
          <Link to="/servicenow-consulting-development-services">ServiceNow Consulting &amp; Development Services</Link>,{" "}
          <Link to="/servicenow-technology-workflows">ServiceNow Technology Workflows</Link>,{" "}
          <Link to="/servicenow-customer-workflows">ServiceNow Customer Workflows</Link>,{" "}
          <Link to="/servicenow-employee-workflows">ServiceNow Employee Workflows</Link>,{" "}
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
    <section className="sncr-final-cta sncr-reveal" aria-labelledby="sncr-final-cta-heading">
      <div className="container sncr-final-cta__inner">
        <h2 id="sncr-final-cta-heading">{FINAL_CTA.heading}</h2>
        <p>{FINAL_CTA.description}</p>
        <div className="sncr-final-cta__ctas">
          <a href={FINAL_CTA.primaryCta.href} className="btn btn-primary sncr-btn">
            {FINAL_CTA.primaryCta.label} <span aria-hidden="true">→</span>
          </a>
          <a href={FINAL_CTA.secondaryCta.href} className="btn btn-secondary sncr-btn">
            {FINAL_CTA.secondaryCta.label}
          </a>
        </div>
      </div>
    </section>
  );
}
