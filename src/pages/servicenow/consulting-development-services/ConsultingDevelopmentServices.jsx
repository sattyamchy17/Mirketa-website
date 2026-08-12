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
import "./ConsultingDevelopmentServices.css";

gsap.registerPlugin(ScrollTrigger);

// ============================================================
// ICONS
// ============================================================

const Ico = {
  check: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12.5l5 5L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  compass: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" /><path d="M15 9l-2 6-6 2 2-6 6-2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  code: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 8l-5 4 5 4M15 8l5 4-5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  link: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 15l6-6M8 13l-2 2a3.5 3.5 0 105 5l2-2M16 11l2-2a3.5 3.5 0 10-5-5l-2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  gear: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.4" /><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
  ),
  gavel: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 12l6-6 6 6-6 6-6-6z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /><path d="M4 20h8M9 15l-5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
  ),
  chart: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 19V13M10 19V8M16 19v-5M20 19V5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
  ),
  award: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="8" r="5" stroke="currentColor" strokeWidth="1.4" /><path d="M8.5 12.5L7 21l5-2.5L17 21l-1.5-8.5" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  globe: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.4" /><path d="M3 12h18M12 3c2.5 2.5 3.5 6 3.5 9s-1 6.5-3.5 9c-2.5-2.5-3.5-6-3.5-9s1-6.5 3.5-9z" stroke="currentColor" strokeWidth="1.3" /></svg>
  ),
  layers: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3l8 4.5-8 4.5-8-4.5L12 3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M4 12l8 4.5 8-4.5M4 16.5l8 4.5 8-4.5" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  bank: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 10l8-5 8 5M4 10v9M20 10v9M4 19h16M8 13v4M12 13v4M16 13v4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  heart: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 20s-7-4.5-9.3-9A5 5 0 0112 6a5 5 0 019.3 5c-2.3 4.5-9.3 9-9.3 9z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
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
  x: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
  ),
};

// ============================================================
// DATA
// ============================================================

const CONSULTATION = {
  eyebrow: "Get Started",
  heading: "Schedule a Consultation",
  description: "Tell us about your platform architecture or governance goals — a certified consultant will follow up within one business day.",
  formTitle: "Schedule a Consultation",
};

const BREADCRUMB_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Platforms & Technology", href: "/" },
  { label: "ServiceNow", href: "/platforms/servicenow" },
  { label: "Consulting & Development Services" },
];

const HERO = {
  badge: "ServiceNow Advisory & Custom Development",
  title: "ServiceNow Consulting and Development Services for a Platform Built to Last",
  description:
    "Mirketa's ServiceNow Consulting and Development Services give enterprises the strategic and technical layer that sits above any single workflow deployment — platform architecture assessments, governance frameworks, custom App Engine builds, integration development, upgrade planning, and CAB support, all delivered by certified consultants who think in roadmaps, not tickets.",
  primaryCta: { label: "Schedule a Consultation", href: "#contact" },
  secondaryCta: { label: "Talk to a ServiceNow Expert", href: "#contact" },
  stats: [
    { value: "120+", label: "ServiceNow Engagements" },
    { value: "50%+", label: "Upgrade Effort Cut" },
    { value: "60+", label: "Governance Builds" },
    { value: "Global", label: "Delivery Model" },
  ],
};

const HERO_DASHBOARD = {
  title: "Platform Advisory Dashboard",
  stats: [
    { label: "ServiceNow Engagements", value: "120+", caption: "Delivered across industries" },
    { label: "Upgrade Effort Cut", value: "50%+", caption: "Via tested upgrade paths" },
    { label: "Governance Builds", value: "60+", caption: "Frameworks shipped" },
    { label: "Delivery Model", value: "Global", caption: "Follow-the-sun coverage" },
  ],
  rows: [
    { title: "Architecture assessment — retail client", meta: "Well-Architected scorecard · 42 findings", tone: "good", status: "Complete" },
    { title: "App Engine governance review", meta: "Intake process · Pending sign-off", tone: "neutral", status: "In Review" },
    { title: "Upgrade impact analysis — Utah release", meta: "127 customizations flagged", tone: "attention", status: "In Progress" },
  ],
  floatingCards: [
    { icon: Ico.shield, title: "60+ Governance Builds", subtitle: "Frameworks delivered" },
    { icon: Ico.award, title: "Certified Architects", subtitle: "CSA · CIS · CAD" },
  ],
};

const OVERVIEW = {
  eyebrow: "Overview",
  heading: "What ServiceNow Consulting and Development Services Actually Cover",
  paragraphs: [
    "Most ServiceNow work happens one module at a time — an ITSM rollout here, an HR Service Delivery project there. Someone still has to own the layer above all of it: the instance architecture, the naming and scoping standards, the release calendar, the decision about whether a request belongs in a Flow, a Scripted REST API, or a custom App Engine application. That advisory and development layer is what Mirketa's ServiceNow Consulting and Development Services practice provides.",
    "In practice, this means platform strategy workshops that produce an actual roadmap document, not a slide deck; architecture assessments that score your instance against ServiceNow's own well-architected framework; governance frameworks that define who can build what, where, and under which change process; and a development bench that writes production-grade Glide scripts, Scripted REST APIs, and App Engine applications when configuration alone can't get you there.",
    "This capability applies whether you are three years into a mature ITSM deployment carrying technical debt, six months into a multi-workflow rollout without a documented data model, or evaluating ServiceNow for the first time and need an independent architecture opinion before you commit budget. Mirketa's consultants work alongside your existing ServiceNow team — augmenting, auditing, or building — rather than replacing the work already underway.",
  ],
};

const CHALLENGES = {
  eyebrow: "Challenges",
  heading: "What Happens Without Dedicated ServiceNow Advisory Support",
  intro: "These are the recurring problems Mirketa is called in to fix — almost always after they've been quietly compounding for a year or more.",
  items: [
    {
      title: "Fragmented Instance Architecture",
      description: "Separate teams configure ITSM, HR, and CSM independently, producing duplicate tables, inconsistent naming conventions, and a CMDB that no two departments trust equally.",
    },
    {
      title: "Technical Debt From Ungoverned Customization",
      description: "Years of point-in-time fixes — business rules layered on business rules, UI policies nobody remembers the reason for — turn every upgrade into a multi-week regression exercise.",
    },
    {
      title: "No Documented Platform Roadmap",
      description: "Requests get approved app by app with no shared view of licensing exposure, upcoming ServiceNow release impact, or how one team's build will collide with another's six months later.",
    },
    {
      title: "Shadow IT Building Unsanctioned Apps",
      description: "Citizen developers spin up App Engine apps outside any review process, leaving Security and IT unaware of what data those apps touch or how they're scoped.",
    },
  ],
};

const SOLUTIONS = {
  eyebrow: "Solutions",
  heading: "The Difference a Dedicated Consulting and Development Layer Makes",
  intro: "Mirketa's ServiceNow Consulting and Development Services close the gap between what your instance currently is and what a governed, scalable Now Platform environment looks like.",
  without: {
    title: "Without Proper ServiceNow Advisory",
    items: [
      "Every team configures the platform its own way, with no shared data model or naming standard",
      "Upgrades take weeks of manual regression testing because nobody documented what was customized and why",
      "App Engine apps get built ad hoc, with no ACL review or scoped-app discipline",
      "Integrations are one-off Scripted REST endpoints with no shared error-handling or logging pattern",
      "Change requests reach the CAB with incomplete risk assessments, causing last-minute rollbacks",
    ],
  },
  with: {
    title: "With Mirketa's ServiceNow Consulting",
    items: [
      "A documented architecture standard and data model that every future build inherits automatically",
      "A release and upgrade calendar with pre-tested customization inventories, cutting upgrade effort dramatically",
      "A governance framework with a formal intake and review process for every new App Engine application",
      "A reusable Integration Hub and Scripted REST API pattern library with consistent logging and retry logic",
      "A CAB support model where every change arrives with a complete risk, rollback, and testing plan",
    ],
  },
};

const FEATURES = {
  eyebrow: "Features",
  heading: "Six Core Services Inside Our ServiceNow Consulting and Development Practice",
  intro: "Engagements typically start with one of these six services and expand as the roadmap takes shape.",
  items: [
    {
      icon: Ico.compass,
      title: "Platform Architecture Assessment",
      description: "A structured review of your instance against ServiceNow's well-architected principles — data model, scoping, security, and performance — scored and prioritized into a remediation plan.",
    },
    {
      icon: Ico.shield,
      title: "Governance Framework Design",
      description: "Role-based build authority, naming and scoping standards, and a documented intake process so every new workflow, app, or integration follows the same rules from day one.",
    },
    {
      icon: Ico.code,
      title: "Custom App Engine Development",
      description: "Scoped, production-grade App Engine applications built for the use cases configuration can't cover — with proper ACLs, client scripts, and UI Builder pages designed to survive upgrades.",
    },
    {
      icon: Ico.link,
      title: "Integration Development",
      description: "Integration Hub spokes and hand-written Scripted REST APIs connecting ServiceNow to ERP, CRM, identity, and monitoring systems, built with consistent authentication and error handling.",
    },
    {
      icon: Ico.gear,
      title: "Upgrade & Release Planning",
      description: "A tested upgrade path for every ServiceNow release — customization impact analysis, sandbox validation, and a rollback plan — so upgrades stop being an annual fire drill.",
    },
    {
      icon: Ico.gavel,
      title: "CAB & Change Advisory Support",
      description: "Structured change request templates, risk scoring, and CAB meeting facilitation that give your change advisory board the information it needs to approve changes with confidence.",
    },
  ],
};

const BENEFITS = {
  eyebrow: "Benefits",
  heading: "Outcomes Our Advisory and Development Clients Report",
  intro: "These are measured results from ServiceNow consulting and development engagements, not aspirational statements.",
  items: [
    { title: "Upgrade Effort Cut by More Than Half", description: "Documented customization inventories and sandbox-tested upgrade paths turn a multi-week regression cycle into a predictable, scheduled event." },
    { title: "Faster App Engine Delivery Cycles", description: "A governed intake process and reusable app templates let new departmental apps move from request to production in weeks instead of quarters." },
    { title: "Fewer Failed Changes at the CAB", description: "Standardized risk assessment templates mean change requests arrive complete, reducing CAB rejection and last-minute rollback rates." },
    { title: "One Shared Data Model Across Workflows", description: "A single documented CMDB and table architecture that every subsequent ITSM, CSM, or HRSD build inherits instead of re-deriving." },
    { title: "Reduced Licensing and Scope Sprawl", description: "A platform roadmap that ties every new request to a business case, catching duplicate or unnecessary app builds before they consume license capacity." },
    { title: "Audit-Ready Governance Documentation", description: "A governance framework and change history that stands up to internal audit and compliance review without a scramble beforehand." },
  ],
};

const PROCESS = {
  eyebrow: "Implementation Process",
  heading: "How a ServiceNow Consulting and Development Engagement Runs",
  intro: "A five-stage roadmap that moves from understanding your current instance to becoming an embedded advisory partner.",
  stages: [
    { name: "Discovery", description: "Stakeholder interviews and instance access to understand current workflows, teams, and pain points across the platform." },
    { name: "Assessment", description: "A scored architecture and governance assessment against ServiceNow's well-architected framework, surfacing technical debt and risk." },
    { name: "Roadmap Design", description: "A prioritized, budget-aware roadmap covering architecture remediation, governance rollout, and planned custom development." },
    { name: "Build & Governance", description: "Custom App Engine development, integration builds, and the governance framework roll out together, with CAB templates in place before go-live." },
    { name: "Continuous Advisory", description: "An ongoing advisory retainer covering upgrade planning, architecture review of new requests, and ongoing CAB support." },
  ],
};

const INDUSTRIES = {
  eyebrow: "Industry Expertise",
  heading: "Advisory and Development Experience Across Regulated Industries",
  intro: "Governance and architecture requirements differ by industry — our consultants bring domain context to each engagement.",
  items: [
    { icon: Ico.bank, title: "Financial Services" },
    { icon: Ico.heart, title: "Healthcare" },
    { icon: Ico.factory, title: "Manufacturing" },
    { icon: Ico.cart, title: "Retail" },
    { icon: Ico.chip, title: "Technology & SaaS" },
    { icon: Ico.globe, title: "Public Sector" },
  ],
};

const WHY_MIRKETA = {
  eyebrow: "Why Choose Mirketa",
  heading: "Why Enterprises Choose Mirketa for ServiceNow Consulting and Development",
  intro: "This is advisory work — the quality of the people doing it is the entire product.",
  items: [
    { icon: Ico.award, title: "Certified Platform Consultants", description: "Every architect and developer on this practice holds active ServiceNow certifications in Certified System Administrator, CIS, and Certified Application Developer tracks." },
    { icon: Ico.layers, title: "Architecture Depth", description: "We assess against ServiceNow's own well-architected framework, not a generic checklist, and back every recommendation with a documented rationale." },
    { icon: Ico.shield, title: "Governance Rigor", description: "Every engagement produces a governance framework your teams can actually operate — intake forms, scoping rules, and CAB templates included, not just a slide deck." },
    { icon: Ico.globe, title: "Global Delivery Model", description: "Follow-the-sun coverage means architecture reviews, development sprints, and CAB support run on your schedule, not ours." },
  ],
};

const TECH_STACK = {
  eyebrow: "Technology Stack",
  heading: "Now Platform Capabilities This Practice Works Across",
  intro: "Our consulting and development work spans the full set of platform capabilities that sit beneath every ServiceNow workflow.",
  items: [
    { icon: Ico.code, title: "App Engine" },
    { icon: Ico.link, title: "Integration Hub" },
    { icon: Ico.gear, title: "Flow Designer" },
    { icon: Ico.layers, title: "Service Portal" },
    { icon: Ico.chip, title: "GlideScript & Scripted REST APIs" },
    { icon: Ico.chart, title: "Performance Analytics" },
  ],
};

const FAQS = [
  { q: "What exactly do Mirketa's ServiceNow Consulting and Development Services include?", a: "They cover the advisory and custom-build layer above any single workflow: platform architecture assessments, governance framework design, custom App Engine development, integration development, upgrade and release planning, and CAB/change advisory support." },
  { q: "How is this different from a standard ServiceNow implementation project?", a: "An implementation project configures a specific workflow, such as ITSM or HR Service Delivery. ServiceNow Consulting and Development Services sit above that layer, setting the architecture, governance, and custom-build standards every workflow implementation should follow." },
  { q: "Do we need this if our ServiceNow instance is already live?", a: "Yes, often more so. Most engagements start with a live instance carrying years of technical debt — an architecture assessment is usually the fastest way to see exactly where that debt is concentrated." },
  { q: "Can Mirketa build custom applications on App Engine from scratch?", a: "Yes. Our development team builds scoped App Engine applications with proper ACLs, client scripts, and UI Builder pages, designed from the start to survive ServiceNow's semi-annual upgrades." },
  { q: "What does a ServiceNow governance framework actually contain?", a: "A documented naming and scoping standard, role-based build authority, an intake and review process for new apps or integrations, and CAB templates that give your change advisory board complete risk and rollback information." },
  { q: "How long does a platform architecture assessment take?", a: "A typical architecture and governance assessment takes three to five weeks, covering stakeholder interviews, instance review, and a scored, prioritized remediation roadmap." },
  { q: "Does Mirketa support the CAB process directly, or just provide templates?", a: "Both. We provide standardized change request and risk-assessment templates, and our consultants can facilitate CAB meetings directly during the engagement to establish the process with your board." },
  { q: "Can this consulting and development practice help before we upgrade ServiceNow?", a: "Yes — upgrade and release planning is one of our six core services. We build a tested upgrade path with a customization impact analysis and sandbox validation before any production upgrade." },
  { q: "How does this relate to Mirketa's other ServiceNow services?", a: "This practice is cross-cutting — it sets the architecture, governance, and custom development foundation that our Technology Workflows, Customer Workflows, Employee Workflows, and Creator Workflows teams build on top of." },
];

const RELATED_LINKS = [
  { to: "/platforms/servicenow", label: "ServiceNow Solutions" },
  { to: "/platforms/servicenow/technology-workflows", label: "ServiceNow Technology Workflows" },
  { to: "/platforms/servicenow/customer-workflows", label: "ServiceNow Customer Workflows" },
  { to: "/platforms/servicenow/employee-workflows", label: "ServiceNow Employee Workflows" },
  { to: "/platforms/servicenow/creator-workflows", label: "ServiceNow Creator Workflows" },
  { to: "/platforms/servicenow/support-managed-services", label: "ServiceNow Managed Services" },
  { to: "/platforms/oracle/fusion-implementation", label: "Oracle Fusion Applications Implementation" },
  { to: "/platforms/oracle/premium-support-service", label: "Oracle Premium Support Service" },
  { to: "/platforms/salesforce/development-consulting", label: "Salesforce Development & Consulting" },
  { to: "/platforms/salesforce/clouds", label: "Salesforce Clouds" },
  { to: "/ai-consulting", label: "AI Consulting" },
  { to: "/data-cloud", label: "Salesforce Data Cloud" },
];

const FINAL_CTA = {
  heading: "Bring Structure to Your Next ServiceNow Consulting and Development Engagement",
  description: "Whether you need an independent architecture opinion, a governance framework, or a custom App Engine build, Mirketa's certified consultants can start with an assessment or jump straight into build.",
  primaryCta: { label: "Schedule a Consultation", href: "#contact" },
  secondaryCta: { label: "Talk to a ServiceNow Expert", href: "#contact" },
};

const SEO = {
  title: "ServiceNow Consulting and Development Services | Mirketa",
  description:
    "Mirketa's ServiceNow Consulting and Development Services cover platform architecture, governance frameworks, custom App Engine builds, and CAB support.",
  canonical: "https://mirketa.us/servicenow-consulting-development-services/",
  keywords: [
    "ServiceNow Consulting and Development Services",
    "ServiceNow architecture consulting",
    "ServiceNow custom app development",
    "ServiceNow governance framework",
    "ServiceNow CAB process",
    "ServiceNow platform roadmap",
    "ServiceNow App Engine development",
    "ServiceNow integration development",
    "ServiceNow upgrade planning",
    "Now Platform advisory services",
    "ServiceNow change advisory board",
    "ServiceNow platform architecture assessment",
    "ServiceNow Scripted REST API development",
  ],
  ogTitle: "ServiceNow Consulting & Development — Advisory + Custom Build",
  ogDescription:
    "Platform architecture, governance, and custom development on the Now Platform — Mirketa's cross-cutting ServiceNow advisory practice.",
  twitterTitle: "ServiceNow Consulting and Development Services | Mirketa",
  twitterDescription:
    "Architecture assessments, governance frameworks, App Engine builds, and CAB support from Mirketa's ServiceNow consulting practice.",
  schema: [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "ServiceNow Consulting and Development Services",
      provider: { "@type": "Organization", name: "Mirketa Inc.", url: "https://mirketa.us" },
      name: "ServiceNow Consulting and Development Services",
      description:
        "Platform architecture assessments, governance framework design, custom App Engine development, integration development, upgrade planning, and CAB advisory support on the Now Platform.",
      areaServed: "Global",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://mirketa.us/" },
        { "@type": "ListItem", position: 2, name: "ServiceNow", item: "https://mirketa.us/servicenow/" },
        { "@type": "ListItem", position: 3, name: "ServiceNow Consulting & Development Services", item: "https://mirketa.us/servicenow-consulting-development-services/" },
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

export default function ConsultingDevelopmentServices() {
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

      gsap.utils.toArray(".scnc-reveal").forEach((el) => {
        gsap.from(el, {
          opacity: prefersReduced ? 1 : 0,
          y: prefersReduced ? 0 : 32,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      gsap.utils.toArray(".scnc-reveal-left").forEach((el) => {
        gsap.from(el, {
          opacity: prefersReduced ? 1 : 0,
          x: prefersReduced ? 0 : -30,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      gsap.utils.toArray(".scnc-reveal-right").forEach((el) => {
        gsap.from(el, {
          opacity: prefersReduced ? 1 : 0,
          x: prefersReduced ? 0 : 30,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      gsap.utils.toArray(".scnc-reveal-stagger").forEach((el) => {
        gsap.from(el.children, {
          opacity: prefersReduced ? 1 : 0,
          y: prefersReduced ? 0 : 26,
          duration: 0.6,
          stagger: 0.06,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      gsap.utils.toArray(".scnc-zoom-in").forEach((el) => {
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
    <div className="scnc-page">
      <Seo {...SEO} />
      <HeroSection heroTextRef={heroTextRef} heroRef={heroRef} />
      <TrustedByMarquee label="Trusted by Enterprise IT Leaders" />
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
    <section ref={heroRef} className="scnc-hero" style={{ backgroundImage: `url("${Images.heroServiceNowConsultingDevelopment}")` }} aria-label={HERO.title}>
      <div className="scnc-hero__scrim" />
      <div className="container">
        <Breadcrumb items={BREADCRUMB_ITEMS} className="scnc-breadcrumb" />
        <div className="scnc-hero__inner">
          <div ref={heroTextRef} className="scnc-hero__text">
            <span className="scnc-badge">
              <span className="scnc-badge__spark" aria-hidden="true">✦</span> {HERO.badge}
            </span>
            <h1>{HERO.title}</h1>
            <p className="scnc-hero__description">{HERO.description}</p>
            <div className="scnc-hero__ctas">
              <a href={HERO.primaryCta.href} className="btn btn-primary scnc-btn">
                {HERO.primaryCta.label} <span aria-hidden="true">→</span>
              </a>
              <a href={HERO.secondaryCta.href} className="btn btn-secondary scnc-btn">
                {HERO.secondaryCta.label}
              </a>
            </div>
          </div>

          <HeroVisual
            dashboardTitle={HERO_DASHBOARD.title}
            stats={HERO_DASHBOARD.stats}
            rows={HERO_DASHBOARD.rows}
            floatingCards={HERO_DASHBOARD.floatingCards}
            className="scnc-hero__visual scnc-zoom-in"
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
    <section className="section scnc-overview" aria-labelledby="scnc-overview-heading">
      <div className="container">
        <div className="section-heading scnc-reveal">
          <p className="scnc-eyebrow">{OVERVIEW.eyebrow}</p>
          <h2 id="scnc-overview-heading">{OVERVIEW.heading}</h2>
        </div>
        <div className="scnc-overview__body scnc-reveal">
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
    <section className="section scnc-challenges" aria-labelledby="scnc-challenges-heading">
      <div className="container">
        <div className="section-heading scnc-reveal">
          <p className="scnc-eyebrow">{CHALLENGES.eyebrow}</p>
          <h2 id="scnc-challenges-heading">{CHALLENGES.heading}</h2>
          <p>{CHALLENGES.intro}</p>
        </div>
        <div className="scnc-challenges__grid scnc-reveal-stagger">
          {CHALLENGES.items.map((c, i) => (
            <div className="scnc-challenge-card" key={c.title}>
              <span className="scnc-challenge-card__num">{String(i + 1).padStart(2, "0")}</span>
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
// SOLUTIONS — side-by-side comparison cards
// ============================================================

function SolutionsSection() {
  return (
    <section className="section scnc-solutions" aria-labelledby="scnc-solutions-heading">
      <div className="container">
        <div className="section-heading scnc-reveal">
          <p className="scnc-eyebrow">{SOLUTIONS.eyebrow}</p>
          <h2 id="scnc-solutions-heading">{SOLUTIONS.heading}</h2>
          <p>{SOLUTIONS.intro}</p>
        </div>
        <div className="scnc-compare">
          <div className="scnc-compare__card scnc-compare__card--without scnc-reveal-left">
            <h3>{SOLUTIONS.without.title}</h3>
            <ul>
              {SOLUTIONS.without.items.map((item) => (
                <li key={item}>
                  <span aria-hidden="true" className="scnc-compare__icon scnc-compare__icon--no">{Ico.x}</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="scnc-compare__card scnc-compare__card--with scnc-reveal-right">
            <h3>{SOLUTIONS.with.title}</h3>
            <ul>
              {SOLUTIONS.with.items.map((item) => (
                <li key={item}>
                  <span aria-hidden="true" className="scnc-compare__icon scnc-compare__icon--yes">{Ico.check}</span>
                  {item}
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
// FEATURES
// ============================================================

function FeaturesSection() {
  return (
    <section className="section scnc-features" aria-labelledby="scnc-features-heading">
      <div className="container">
        <div className="scnc-features__head scnc-reveal">
          <img src={Images.illoServicenowDevopsPipeline} alt="" aria-hidden="true" className="scnc-features__illo" loading="lazy" />
          <div className="section-heading">
            <p className="scnc-eyebrow">{FEATURES.eyebrow}</p>
            <h2 id="scnc-features-heading">{FEATURES.heading}</h2>
            <p>{FEATURES.intro}</p>
          </div>
        </div>
        <div className="scnc-features__grid scnc-reveal-stagger">
          {FEATURES.items.map((f) => (
            <div className="scnc-feature-card" key={f.title}>
              <span className="scnc-feature-card__icon">{f.icon}</span>
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
    <section className="section scnc-benefits" aria-labelledby="scnc-benefits-heading">
      <div className="container">
        <div className="section-heading scnc-reveal">
          <p className="scnc-eyebrow">{BENEFITS.eyebrow}</p>
          <h2 id="scnc-benefits-heading">{BENEFITS.heading}</h2>
          <p>{BENEFITS.intro}</p>
        </div>
        <div className="scnc-benefits__grid scnc-reveal-stagger">
          {BENEFITS.items.map((b) => (
            <div className="scnc-benefit-item" key={b.title}>
              <span aria-hidden="true">{Ico.check}</span>
              <div>
                <h3>{b.title}</h3>
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
// IMPLEMENTATION PROCESS — horizontal roadmap timeline
// ============================================================

function ProcessSection() {
  return (
    <section className="section scnc-process" aria-labelledby="scnc-process-heading">
      <div className="container">
        <div className="section-heading scnc-reveal">
          <p className="scnc-eyebrow">{PROCESS.eyebrow}</p>
          <h2 id="scnc-process-heading">{PROCESS.heading}</h2>
          <p>{PROCESS.intro}</p>
        </div>
        <div className="scnc-timeline scnc-reveal-stagger">
          {PROCESS.stages.map((p, i) => (
            <div className="scnc-timeline__stage" key={p.name}>
              <div className="scnc-timeline__marker">
                <span className="scnc-timeline__dot">{String(i + 1).padStart(2, "0")}</span>
              </div>
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
    <section className="section scnc-industries" aria-labelledby="scnc-industries-heading">
      <div className="container">
        <div className="section-heading scnc-reveal">
          <p className="scnc-eyebrow">{INDUSTRIES.eyebrow}</p>
          <h2 id="scnc-industries-heading">{INDUSTRIES.heading}</h2>
          <p>{INDUSTRIES.intro}</p>
        </div>
        <div className="scnc-industries__grid scnc-reveal-stagger">
          {INDUSTRIES.items.map((n) => (
            <div className="scnc-industry-card" key={n.title}>
              <span className="scnc-industry-card__icon">{n.icon}</span>
              <h3>{n.title}</h3>
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
    <section className="section scnc-why" aria-labelledby="scnc-why-heading">
      <div className="container">
        <div className="section-heading scnc-reveal">
          <p className="scnc-eyebrow">{WHY_MIRKETA.eyebrow}</p>
          <h2 id="scnc-why-heading">{WHY_MIRKETA.heading}</h2>
          <p>{WHY_MIRKETA.intro}</p>
        </div>
        <div className="scnc-why__grid scnc-reveal-stagger">
          {WHY_MIRKETA.items.map((w) => (
            <div className="scnc-why-card" key={w.title}>
              <span className="scnc-why-card__icon">{w.icon}</span>
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
    <section className="section scnc-stack" aria-labelledby="scnc-stack-heading">
      <div className="container">
        <div className="section-heading scnc-reveal">
          <p className="scnc-eyebrow">{TECH_STACK.eyebrow}</p>
          <h2 id="scnc-stack-heading">{TECH_STACK.heading}</h2>
          <p>{TECH_STACK.intro}</p>
        </div>
        <div className="scnc-stack__grid scnc-reveal-stagger">
          {TECH_STACK.items.map((t) => (
            <div className="scnc-stack-chip" key={t.title}>
              <span className="scnc-stack-chip__icon">{t.icon}</span>
              <span>{t.title}</span>
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
    <section className="section scnc-faq" aria-labelledby="scnc-faq-heading">
      <div className="container">
        <div className="section-heading scnc-reveal">
          <p className="scnc-eyebrow">FAQ</p>
          <h2 id="scnc-faq-heading">Frequently Asked Questions About ServiceNow Consulting and Development Services</h2>
        </div>
        <FaqAccordion items={FAQS} className="scnc-reveal" searchPlaceholder="Ask a question — e.g. &quot;governance&quot;, &quot;App Engine&quot;, &quot;CAB&quot;..." />
        <p className="scnc-faq__links">
          Related reading:{" "}
          {RELATED_LINKS.map((l, i) => (
            <span key={l.to}>
              <Link to={l.to}>{l.label}</Link>
              {i < RELATED_LINKS.length - 1 ? ", " : "."}
            </span>
          ))}
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
    <section className="scnc-final-cta scnc-reveal" aria-labelledby="scnc-final-cta-heading">
      <div className="container scnc-final-cta__inner">
        <h2 id="scnc-final-cta-heading">{FINAL_CTA.heading}</h2>
        <p>{FINAL_CTA.description}</p>
        <div className="scnc-final-cta__ctas">
          <a href={FINAL_CTA.primaryCta.href} className="btn btn-primary scnc-btn">
            {FINAL_CTA.primaryCta.label} <span aria-hidden="true">→</span>
          </a>
          <a href={FINAL_CTA.secondaryCta.href} className="btn btn-secondary scnc-btn">
            {FINAL_CTA.secondaryCta.label}
          </a>
        </div>
      </div>
    </section>
  );
}
