import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Images } from "../../assets/images/index.js";
import Seo from "../../components/Seo/Seo.jsx";
import StickyCta from "../../components/StickyCta/StickyCta.jsx";
import TrustedByMarquee from "../../components/TrustedByMarquee/TrustedByMarquee.jsx";
import AnimatedCounter from "../../components/AnimatedCounter/AnimatedCounter.jsx";
import FaqAccordion from "../../components/FaqAccordion/FaqAccordion.jsx";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb.jsx";
import HeroVisual from "../../components/HeroVisual/HeroVisual.jsx";
import ConsultationSection from "../../components/ConsultationSection/ConsultationSection.jsx";
import "./ServiceNow.css";

gsap.registerPlugin(ScrollTrigger);

// ============================================================
// ICONS
// ============================================================

const Ico = {
  check: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12.5l5 5L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  gear: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.4" /><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
  ),
  server: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="4" y="4" width="16" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4" /><rect x="4" y="14" width="16" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4" /><circle cx="8" cy="7" r="1" fill="currentColor" /><circle cx="8" cy="17" r="1" fill="currentColor" /></svg>
  ),
  headset: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 13a8 8 0 0116 0v4" stroke="currentColor" strokeWidth="1.5" /><rect x="3" y="13" width="4" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4" /><rect x="17" y="13" width="4" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4" /></svg>
  ),
  users: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="9" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.4" /><path d="M3.5 19c.6-3.4 2.9-5.2 5.5-5.2s4.9 1.8 5.5 5.2" stroke="currentColor" strokeWidth="1.4" /><circle cx="17" cy="9" r="2.6" stroke="currentColor" strokeWidth="1.3" opacity="0.7" /><path d="M15.5 13.4c2.2.3 3.7 1.9 4 4.6" stroke="currentColor" strokeWidth="1.3" opacity="0.7" /></svg>
  ),
  code: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 8l-5 4 5 4M15 8l5 4-5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  wrench: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M14.7 6.3a4 4 0 00-5.4 5.4L4 17l3 3 5.3-5.3a4 4 0 005.4-5.4l-2 2-2.7-.7-.7-2.7z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
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
  chartUp: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 19V13M10 19V8M16 19v-5M20 19V5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
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

const BREADCRUMB_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Platforms & Technology", href: "/" },
  { label: "ServiceNow" },
];

const HERO = {
  badge: "ServiceNow Certified Implementation Partner",
  title: "ServiceNow Consulting, Implementation & Managed Services for the Now Platform",
  description:
    "Mirketa helps enterprises implement and run ServiceNow across IT, customer, employee, and creator workflows — turning disconnected tickets and spreadsheets into one connected system of action, backed by certified consultants and SLA-driven managed services.",
  primaryCta: { label: "Schedule a ServiceNow Consultation", href: "#contact" },
  secondaryCta: { label: "Talk to a ServiceNow Expert", href: "#contact" },
  metrics: ["120+ ServiceNow Engagements", "Certified ServiceNow Consultants", "Global Delivery Model", "24×7 Managed Support Available"],
  stats: [
    { value: "4", label: "Workflows Live — Tech, CX, HR, Creator" },
    { value: "45%", label: "Faster Incident Resolution" },
    { value: "99.9%", label: "Uptime, Rolling 90-Day" },
  ],
};

const HERO_DASHBOARD = {
  title: "ServiceNow Instance Health",
  stats: [
    { label: "Workflows Live — Tech, CX, HR, Creator", value: "4", caption: "Across every business unit" },
    { label: "Faster Incident Resolution", value: "45%", caption: "Vs. legacy ticketing tools" },
    { label: "Uptime, Rolling 90-Day", value: "99.9%", caption: "Platform availability" },
  ],
  rows: [
    { title: "P1 incident — payment gateway", meta: "ITSM · Auto-routed to on-call", tone: "good", status: "Resolved" },
    { title: "HR onboarding case backlog", meta: "HRSD · Employee Center", tone: "good", status: "On Track" },
    { title: "Custom App Engine release", meta: "Creator Workflows · UAT signoff pending", tone: "neutral", status: "In Review" },
  ],
  floatingCards: [
    { icon: Ico.shield, title: "24×7 Managed Support", subtitle: "SLA-backed coverage" },
    { icon: Ico.award, title: "Certified Consultants", subtitle: "ITSM · ITOM · CSM · HRSD" },
  ],
};

const CONSULTATION = {
  eyebrow: "Get Started",
  heading: "Schedule a ServiceNow Consultation",
  description: "Share a few details about your ServiceNow goals — a certified consultant will follow up within one business day.",
  formTitle: "Schedule a Free ServiceNow Consultation",
};

const STATS = {
  eyebrow: "Statistics",
  heading: "ServiceNow Delivery, Measured in Outcomes",
  intro: "These are the numbers our ServiceNow clients see after moving from disconnected tools to one connected platform.",
  items: [
    { value: "120+", label: "ServiceNow Engagements Delivered" },
    { value: "98%", label: "Client Retention Rate" },
    { value: "45%", label: "Average Faster Incident Resolution" },
    { value: "24×7", label: "Managed Support Availability" },
    { value: "16", label: "Countries Served" },
  ],
};

const WHY_MIRKETA = {
  eyebrow: "Why Mirketa",
  heading: "A ServiceNow Partner That Understands Workflows, Not Just Modules",
  intro: "Hundreds of partners can activate ServiceNow applications. Fewer can tie every workflow decision back to a measurable operational outcome.",
  items: [
    { icon: Ico.award, title: "Certified ServiceNow Consultants", description: "Every consultant holds active ServiceNow certifications across ITSM, ITOM, CSM, and HRSD." },
    { icon: Ico.compass, title: "Cross-Workflow Expertise", description: "One team fluent across technology, customer, employee, and creator workflows — not siloed specialists." },
    { icon: Ico.robot, title: "AI-Ready Implementations", description: "Instances built to take advantage of Now Assist and predictive intelligence from day one." },
    { icon: Ico.globe, title: "Global Delivery Model", description: "Follow-the-sun coverage for multi-region rollouts and managed support." },
    { icon: Ico.shield, title: "Governance & Security First", description: "Role design, ACLs, and compliance reporting built into every engagement." },
    { icon: Ico.headset, title: "Post Go-Live Support", description: "A dedicated team keeping your instance healthy long after launch." },
  ],
};

const SERVICE_CATEGORIES = {
  eyebrow: "Service Categories",
  heading: "Six Ways Mirketa Delivers ServiceNow Value",
  intro: "Every ServiceNow engagement fits into one of six service categories — explore the one that matches where you are today.",
  items: [
    {
      icon: Ico.compass,
      title: "Consulting & Development Services",
      description: "Strategy, architecture, and custom development for your Now Platform instance.",
      href: "/servicenow-consulting-development-services",
    },
    {
      icon: Ico.server,
      title: "Technology Workflows",
      description: "ITSM, ITOM, ITAM, and SecOps implementations that connect IT operations end to end.",
      href: "/servicenow-technology-workflows",
    },
    {
      icon: Ico.headset,
      title: "Customer Workflows",
      description: "Customer Service Management and Field Service Management built around case resolution speed.",
      href: "/servicenow-customer-workflows",
    },
    {
      icon: Ico.users,
      title: "Employee Workflows",
      description: "HR Service Delivery and Workplace Service Delivery that make every employee interaction self-service.",
      href: "/servicenow-employee-workflows",
    },
    {
      icon: Ico.code,
      title: "Creator Workflows",
      description: "App Engine and low-code development that ships custom apps without a backlog of developers.",
      href: "/servicenow-creator-workflows",
    },
    {
      icon: Ico.wrench,
      title: "Support & Managed Services",
      description: "SLA-backed managed support, upgrades, and continuous optimization for your live instance.",
      href: "/servicenow-support-managed-services",
    },
  ],
};

const SOLUTIONS = {
  eyebrow: "Solutions",
  heading: "Packaged Accelerators Built on Real ServiceNow Deployments",
  intro: "Beyond custom implementation, Mirketa maintains a library of accelerators that shorten time-to-value for common ServiceNow use cases.",
  items: [
    { title: "Onboarding Accelerator", description: "A pre-built HRSD and IT onboarding journey configured to your policies in weeks, not months." },
    { title: "Incident Reduction Accelerator", description: "Proactive monitoring and knowledge-base tuning that cuts repeat incidents at the source." },
    { title: "Portal Quick-Start", description: "A branded Employee Center or Customer Service Portal deployed on a fixed-scope timeline." },
    { title: "Integration Framework", description: "Pre-built connectors and patterns for integrating ServiceNow with ERP, CRM, and identity systems." },
  ],
};

const WORKFLOW_CATEGORIES = {
  eyebrow: "Workflow Categories",
  heading: "The Four Workflow Pillars of the Now Platform",
  intro: "ServiceNow organizes its capabilities into four core workflow families. Mirketa configures each one around how your teams actually operate, not a generic template.",
  items: [
    { icon: Ico.server, title: "Technology Workflows", modules: ["ITSM", "ITOM", "ITAM", "SecOps"] },
    { icon: Ico.headset, title: "Customer Workflows", modules: ["CSM", "Field Service Management", "Order Management"] },
    { icon: Ico.users, title: "Employee Workflows", modules: ["HR Service Delivery", "Workplace Service Delivery", "Legal Service Delivery"] },
    { icon: Ico.code, title: "Creator Workflows", modules: ["App Engine", "Integration Hub", "Automation Engine"] },
  ],
};

const INDUSTRIES = {
  eyebrow: "Industry Expertise",
  heading: "ServiceNow Experience Across Regulated, Complex Industries",
  intro: "Every industry brings its own compliance and operational constraints — our delivery teams bring specific domain context to each one.",
  items: [
    { icon: Ico.bank, title: "Financial Services" },
    { icon: Ico.shield, title: "Healthcare" },
    { icon: Ico.factory, title: "Manufacturing" },
    { icon: Ico.cart, title: "Retail & Consumer Goods" },
    { icon: Ico.chip, title: "Technology & SaaS" },
    { icon: Ico.globe, title: "Public Sector" },
  ],
};

const PROCESS = {
  eyebrow: "Implementation Process",
  heading: "A Structured Path From Discovery to Hypercare",
  intro: "No surprises, no scope creep. Our ServiceNow delivery methodology has been refined across hundreds of instance builds.",
  stages: [
    { name: "Discovery & Assessment", description: "Mapping your current workflows, tools, and pain points across teams." },
    { name: "Solution Design", description: "Data model, security architecture, and integration plan documented in full." },
    { name: "Configuration & Build", description: "Core workflow setup — forms, flows, approvals, and role design." },
    { name: "Integration", description: "Connecting ServiceNow to the systems your teams already run." },
    { name: "Testing & UAT", description: "Structured testing with your own stakeholders before go-live." },
    { name: "Go-Live & Hypercare", description: "Supported cutover followed by elevated post-launch support." },
  ],
};

const CASE_STUDIES = {
  eyebrow: "Case Studies",
  heading: "Real ServiceNow Outcomes From Real Deployments",
  intro: "Anonymized results from recent ServiceNow engagements across industries.",
  cases: [
    {
      title: "Global Manufacturer Cuts Incident Resolution Time by 46%",
      industry: "Manufacturing",
      challenge: "IT incidents were logged across email and spreadsheets with no shared visibility into severity or ownership.",
      solution: "We implemented ITSM with automated routing, SLA tracking, and a CMDB-backed service map.",
      outcome: "Incidents now route to the right team automatically, with resolution time down nearly half.",
    },
    {
      title: "Healthcare Network Deflects 41% of Employee HR Cases",
      industry: "Healthcare",
      challenge: "HR received the same policy questions repeatedly through email with no self-service option.",
      solution: "We deployed HR Service Delivery with an Employee Center and a curated knowledge base.",
      outcome: "Over 4 in 10 HR cases now resolve without ever reaching an HR agent.",
    },
    {
      title: "Retail Group Launches Custom App in 6 Weeks With App Engine",
      industry: "Retail",
      challenge: "A store-audit process ran entirely on paper forms, with no visibility into completion rates.",
      solution: "We built a custom App Engine application replacing paper forms with a mobile-first workflow.",
      outcome: "Store audits are now tracked in real time with full completion visibility across every location.",
    },
  ],
};

const BENEFITS = {
  eyebrow: "Benefits",
  heading: "What a Properly Configured ServiceNow Instance Delivers",
  intro: "These are the outcomes our clients report after their ServiceNow engagement with Mirketa.",
  items: [
    { title: "Faster Incident Resolution", description: "Automated routing and SLA tracking replace manual triage." },
    { title: "Higher Self-Service Adoption", description: "Employees and customers resolve more issues without opening a ticket." },
    { title: "Connected Data Across Teams", description: "IT, HR, and customer service work from one shared system of record." },
    { title: "Reduced Operational Risk", description: "Change and security controls built into every workflow." },
    { title: "Lower Total Cost of Ownership", description: "Fewer disconnected tools means less licensing and integration overhead." },
    { title: "Continuous Improvement", description: "Monthly reporting ties every enhancement back to a measurable KPI." },
  ],
};

const FAQS = [
  { q: "What does ServiceNow consulting from Mirketa include?", a: "Mirketa's ServiceNow consulting covers strategy and architecture, implementation across technology, customer, employee, and creator workflows, custom App Engine development, integrations, and ongoing managed services — a full lifecycle service, not a single-module engagement." },
  { q: "How long does a ServiceNow implementation take?", a: "A focused single-workflow implementation, such as ITSM or HR Service Delivery, typically takes 8–14 weeks. Multi-workflow deployments spanning technology, customer, and employee workflows can take 6–12 months depending on scope and integration complexity." },
  { q: "Can Mirketa migrate us from a legacy ITSM or helpdesk tool?", a: "Yes. We migrate incidents, knowledge articles, and CMDB data from legacy tools, validating every data object before it goes live on ServiceNow." },
  { q: "What ServiceNow workflows does Mirketa implement?", a: "We implement Technology Workflows (ITSM, ITOM, ITAM, SecOps), Customer Workflows (CSM, Field Service Management), Employee Workflows (HR Service Delivery, Workplace Service Delivery), and Creator Workflows (App Engine, Integration Hub)." },
  { q: "Do you provide ServiceNow managed services after go-live?", a: "Yes. Every implementation can transition into an ongoing managed services engagement covering support, upgrades, and continuous optimization with defined SLAs." },
  { q: "Are Mirketa's ServiceNow consultants certified?", a: "Yes. Mirketa's consultants hold active ServiceNow certifications across ITSM, ITOM, CSM, and HRSD, backed by a verified delivery track record across enterprise engagements." },
  { q: "Can ServiceNow integrate with our ERP and CRM systems?", a: "Yes. We integrate ServiceNow with Salesforce, Oracle, SAP, and other ERP and CRM platforms using Integration Hub and REST APIs, so data flows without manual re-entry." },
  { q: "What AI capabilities does ServiceNow include?", a: "ServiceNow includes Now Assist and predictive intelligence for case classification, incident deflection, and generative summarization. We configure these against your own workflow data so recommendations reflect how your teams actually operate." },
];

const FINAL_CTA = {
  heading: "Turn ServiceNow Into a Connected System of Action",
  description: "Partner with Mirketa's certified ServiceNow consultants to implement, integrate, and support your Now Platform instance — or speak with a ServiceNow expert before you commit to a roadmap.",
  primaryCta: { label: "Schedule a ServiceNow Consultation", href: "#contact" },
  secondaryCta: { label: "Talk to a ServiceNow Expert", href: "#contact" },
};

const SEO = {
  title: "ServiceNow Consulting & Implementation Services | Mirketa",
  description:
    "Mirketa delivers ServiceNow consulting, implementation, and managed services across technology, customer, employee, and creator workflows — backed by certified consultants and SLA-driven support.",
  canonical: "https://mirketa.us/servicenow/",
  keywords: [
    "ServiceNow Consulting",
    "ServiceNow Implementation",
    "ServiceNow Managed Services",
    "ServiceNow Partner",
    "ServiceNow ITSM Implementation",
    "ServiceNow HR Service Delivery",
    "ServiceNow Customer Service Management",
    "ServiceNow App Engine Development",
    "Now Platform Consulting",
    "ServiceNow Workflow Automation",
  ],
  schema: [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "ServiceNow Consulting and Implementation Services",
      provider: { "@type": "Organization", name: "Mirketa Inc.", url: "https://mirketa.us" },
      name: "ServiceNow Consulting & Implementation",
      description:
        "End-to-end ServiceNow consulting, implementation, and managed services across technology, customer, employee, and creator workflows.",
      areaServed: "Global",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://mirketa.us/" },
        { "@type": "ListItem", position: 2, name: "ServiceNow", item: "https://mirketa.us/servicenow/" },
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

export default function ServiceNow() {
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

      gsap.utils.toArray(".snh-reveal").forEach((el) => {
        gsap.from(el, {
          opacity: prefersReduced ? 1 : 0,
          y: prefersReduced ? 0 : 32,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      gsap.utils.toArray(".snh-reveal-left").forEach((el) => {
        gsap.from(el, {
          opacity: prefersReduced ? 1 : 0,
          x: prefersReduced ? 0 : -30,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      gsap.utils.toArray(".snh-reveal-right").forEach((el) => {
        gsap.from(el, {
          opacity: prefersReduced ? 1 : 0,
          x: prefersReduced ? 0 : 30,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      gsap.utils.toArray(".snh-reveal-stagger").forEach((el) => {
        gsap.from(el.children, {
          opacity: prefersReduced ? 1 : 0,
          y: prefersReduced ? 0 : 26,
          duration: 0.6,
          stagger: 0.06,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      gsap.utils.toArray(".snh-zoom-in").forEach((el) => {
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
    <div className="servicenow-hub">
      <Seo {...SEO} />
      <HeroSection heroTextRef={heroTextRef} heroRef={heroRef} />
      <TrustedByMarquee label="Trusted by Enterprise IT & Operations Teams" />
      <StatsSection />
      <WhyMirketaSection />
      <ServiceCategoriesSection />
      <SolutionsSection />
      <WorkflowCategoriesSection />
      <IndustriesSection />
      <ProcessSection />
      <CaseStudiesSection />
      <BenefitsSection />
      <FaqSection />
      <FinalCtaSection />
      <ConsultationSection {...CONSULTATION} />
      <StickyCta heroRef={heroRef} label="Schedule a ServiceNow Consultation" />
    </div>
  );
}

// ============================================================
// HERO
// ============================================================

function HeroSection({ heroTextRef, heroRef }) {
  return (
    <section ref={heroRef} className="snh-hero" style={{ backgroundImage: `url("${Images.heroServiceNowHub}")` }} aria-label={HERO.title}>
      <div className="snh-hero__scrim" />
      <div className="container">
        <Breadcrumb items={BREADCRUMB_ITEMS} className="snh-breadcrumb" />
        <div className="snh-hero__inner">
          <div ref={heroTextRef} className="snh-hero__text">
            <span className="snh-badge">
              <span className="snh-badge__spark" aria-hidden="true">✦</span> {HERO.badge}
            </span>
            <h1>{HERO.title}</h1>
            <p className="snh-hero__description">{HERO.description}</p>
            <div className="snh-hero__ctas">
              <a href={HERO.primaryCta.href} className="btn btn-primary snh-btn">
                {HERO.primaryCta.label} <span aria-hidden="true">→</span>
              </a>
              <a href={HERO.secondaryCta.href} className="btn btn-secondary snh-btn">
                {HERO.secondaryCta.label}
              </a>
            </div>
            <ul className="snh-hero__metrics">
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
            className="snh-hero__visual snh-zoom-in"
          />
        </div>
      </div>
    </section>
  );
}

// ============================================================
// STATISTICS
// ============================================================

function StatsSection() {
  return (
    <section className="snh-stats" aria-labelledby="snh-stats-heading">
      <div className="container">
        <div className="section-heading snh-stats__heading snh-reveal">
          <p className="snh-eyebrow">{STATS.eyebrow}</p>
          <h2 id="snh-stats-heading">{STATS.heading}</h2>
          <p>{STATS.intro}</p>
        </div>
        <div className="snh-stats__grid snh-reveal-stagger">
          {STATS.items.map((s) => (
            <AnimatedCounter key={s.label} value={s.value} label={s.label} className="snh-stat" />
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
    <section className="section snh-why" aria-labelledby="snh-why-heading">
      <div className="container">
        <div className="section-heading snh-reveal">
          <p className="snh-eyebrow">{WHY_MIRKETA.eyebrow}</p>
          <h2 id="snh-why-heading">{WHY_MIRKETA.heading}</h2>
          <p>{WHY_MIRKETA.intro}</p>
        </div>
        <div className="snh-why__grid snh-reveal-stagger">
          {WHY_MIRKETA.items.map((w) => (
            <div className="snh-why-card" key={w.title}>
              <span className="snh-why-card__icon">{w.icon}</span>
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
// SERVICE CATEGORIES — links out to all 6 L3 pages
// ============================================================

function ServiceCategoriesSection() {
  return (
    <section className="section snh-categories" aria-labelledby="snh-categories-heading">
      <div className="container">
        <div className="section-heading snh-reveal">
          <p className="snh-eyebrow">{SERVICE_CATEGORIES.eyebrow}</p>
          <h2 id="snh-categories-heading">{SERVICE_CATEGORIES.heading}</h2>
          <p>{SERVICE_CATEGORIES.intro}</p>
        </div>
        <div className="snh-categories__grid snh-reveal-stagger">
          {SERVICE_CATEGORIES.items.map((c) => (
            <Link to={c.href} className="snh-category-card" key={c.title}>
              <span className="snh-category-card__icon">{c.icon}</span>
              <h3>{c.title}</h3>
              <p>{c.description}</p>
              <span className="snh-category-card__link">
                Explore {c.title} <span aria-hidden="true">→</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// SOLUTIONS — packaged accelerators
// ============================================================

function SolutionsSection() {
  return (
    <section className="section snh-solutions" aria-labelledby="snh-solutions-heading">
      <div className="container">
        <div className="section-heading snh-reveal">
          <p className="snh-eyebrow">{SOLUTIONS.eyebrow}</p>
          <h2 id="snh-solutions-heading">{SOLUTIONS.heading}</h2>
          <p>{SOLUTIONS.intro}</p>
        </div>
        <div className="snh-solutions__grid snh-reveal-stagger">
          {SOLUTIONS.items.map((s) => (
            <div className="snh-solution-card" key={s.title}>
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
// WORKFLOW CATEGORIES — ServiceNow's own platform taxonomy
// ============================================================

function WorkflowCategoriesSection() {
  return (
    <section className="section snh-workflows" aria-labelledby="snh-workflows-heading">
      <div className="container">
        <div className="snh-workflows__head snh-reveal">
          <img src={Images.illoServicenowHubDashboard} alt="" aria-hidden="true" className="snh-workflows__illo" loading="lazy" />
          <div className="section-heading">
            <p className="snh-eyebrow">{WORKFLOW_CATEGORIES.eyebrow}</p>
            <h2 id="snh-workflows-heading">{WORKFLOW_CATEGORIES.heading}</h2>
            <p>{WORKFLOW_CATEGORIES.intro}</p>
          </div>
        </div>
        <div className="snh-workflows__grid snh-reveal-stagger">
          {WORKFLOW_CATEGORIES.items.map((w) => (
            <div className="snh-workflow-card" key={w.title}>
              <span className="snh-workflow-card__icon">{w.icon}</span>
              <h3>{w.title}</h3>
              <div className="snh-workflow-card__modules">
                {w.modules.map((m) => (
                  <span key={m}>{m}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// INDUSTRY EXPERTISE
// ============================================================

function IndustriesSection() {
  return (
    <section className="section snh-industries" aria-labelledby="snh-industries-heading">
      <div className="container">
        <div className="section-heading snh-reveal">
          <p className="snh-eyebrow">{INDUSTRIES.eyebrow}</p>
          <h2 id="snh-industries-heading">{INDUSTRIES.heading}</h2>
          <p>{INDUSTRIES.intro}</p>
        </div>
        <div className="snh-industries__grid snh-reveal-stagger">
          {INDUSTRIES.items.map((n) => (
            <div className="snh-industry-card" key={n.title}>
              <span className="snh-industry-card__icon">{n.icon}</span>
              <h3>{n.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// IMPLEMENTATION PROCESS
// ============================================================

function ProcessSection() {
  return (
    <section className="section snh-process" aria-labelledby="snh-process-heading">
      <div className="container">
        <div className="section-heading snh-reveal">
          <p className="snh-eyebrow">{PROCESS.eyebrow}</p>
          <h2 id="snh-process-heading">{PROCESS.heading}</h2>
          <p>{PROCESS.intro}</p>
        </div>
        <div className="snh-process__rail snh-reveal-stagger">
          {PROCESS.stages.map((p, i) => (
            <div className="snh-step-card" key={p.name}>
              <span className="snh-step-card__num">{String(i + 1).padStart(2, "0")}</span>
              <h3>{p.name}</h3>
              <p>{p.description}</p>
              {i < PROCESS.stages.length - 1 && <span className="snh-step-card__arrow" aria-hidden="true">→</span>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// CASE STUDIES
// ============================================================

function CaseStudiesSection() {
  return (
    <section className="section snh-cases" aria-labelledby="snh-cases-heading">
      <div className="container">
        <div className="section-heading snh-reveal">
          <p className="snh-eyebrow">{CASE_STUDIES.eyebrow}</p>
          <h2 id="snh-cases-heading">{CASE_STUDIES.heading}</h2>
          <p>{CASE_STUDIES.intro}</p>
        </div>
        <div className="snh-cases__grid snh-reveal-stagger">
          {CASE_STUDIES.cases.map((c) => (
            <div className="snh-case-card" key={c.title}>
              <span className="snh-case-card__tag">{c.industry}</span>
              <h3>{c.title}</h3>
              <dl className="snh-case-card__fields">
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
// BENEFITS
// ============================================================

function BenefitsSection() {
  return (
    <section className="section snh-benefits" aria-labelledby="snh-benefits-heading">
      <div className="container">
        <div className="section-heading snh-reveal">
          <p className="snh-eyebrow">{BENEFITS.eyebrow}</p>
          <h2 id="snh-benefits-heading">{BENEFITS.heading}</h2>
          <p>{BENEFITS.intro}</p>
        </div>
        <div className="snh-benefits__grid snh-reveal-stagger">
          {BENEFITS.items.map((b) => (
            <div className="snh-benefit-item" key={b.title}>
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
// FAQ
// ============================================================

function FaqSection() {
  return (
    <section className="section snh-faq" aria-labelledby="snh-faq-heading">
      <div className="container">
        <div className="section-heading snh-reveal">
          <p className="snh-eyebrow">FAQ</p>
          <h2 id="snh-faq-heading">Frequently Asked Questions About ServiceNow Consulting</h2>
        </div>
        <FaqAccordion items={FAQS} className="snh-reveal" searchPlaceholder="Ask a question — e.g. &quot;workflows&quot;, &quot;managed services&quot;, &quot;AI&quot;..." />
        <p className="snh-faq__links">
          Related reading: <Link to="/servicenow-consulting-development-services">ServiceNow Consulting & Development</Link>,{" "}
          <Link to="/servicenow-technology-workflows">Technology Workflows</Link>,{" "}
          <Link to="/servicenow-customer-workflows">Customer Workflows</Link>,{" "}
          <Link to="/servicenow-employee-workflows">Employee Workflows</Link>,{" "}
          <Link to="/servicenow-creator-workflows">Creator Workflows</Link>,{" "}
          <Link to="/servicenow-support-managed-services">Support & Managed Services</Link>,{" "}
          <Link to="/oracle-fusion-applications-implementation">Oracle Fusion Implementation</Link>,{" "}
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
    <section className="snh-final-cta snh-reveal" aria-labelledby="snh-final-cta-heading">
      <div className="container snh-final-cta__inner">
        <h2 id="snh-final-cta-heading">{FINAL_CTA.heading}</h2>
        <p>{FINAL_CTA.description}</p>
        <div className="snh-final-cta__ctas">
          <a href={FINAL_CTA.primaryCta.href} className="btn btn-primary snh-btn">
            {FINAL_CTA.primaryCta.label} <span aria-hidden="true">→</span>
          </a>
          <a href={FINAL_CTA.secondaryCta.href} className="btn btn-secondary snh-btn">
            {FINAL_CTA.secondaryCta.label}
          </a>
        </div>
      </div>
    </section>
  );
}
