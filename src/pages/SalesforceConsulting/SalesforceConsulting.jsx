import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Images } from "../../assets/images/index.js";
import Seo from "../../components/Seo/Seo.jsx";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb.jsx";
import HeroVisual from "../../components/HeroVisual/HeroVisual.jsx";
import ConsultationSection from "../../components/ConsultationSection/ConsultationSection.jsx";
import "./SalesforceConsulting.css";

gsap.registerPlugin(ScrollTrigger);

// ============================================================
// ICONS — small inline SVGs for component-local iconography
// ============================================================

const Ico = {
  compass: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" /><path d="M15 9l-2 6-6 2 2-6 6-2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  code: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 6L4 12l5 6M15 6l5 6-5 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  plug: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 3v5M15 3v5M7 8h10v4a5 5 0 01-10 0V8z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="M12 17v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
  ),
  headset: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 13a8 8 0 0116 0v4" stroke="currentColor" strokeWidth="1.5" /><rect x="3" y="13" width="4" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4" /><rect x="17" y="13" width="4" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4" /></svg>
  ),
  sparkle: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /></svg>
  ),
  cloud: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6.5 16.5A4.2 4.2 0 017 8.2 5.5 5.5 0 0117.5 9.5 3.7 3.7 0 0117 17H7" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></svg>
  ),
  building: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 21V9l8-5 8 5v12H4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="M9 21v-6h6v6" stroke="currentColor" strokeWidth="1.4" /></svg>
  ),
  flow: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="4" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" /><rect x="14" y="13" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" /><path d="M10 7.5h4a3 3 0 013 3V14" stroke="currentColor" strokeWidth="1.4" /></svg>
  ),
  target: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.4" /><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.3" opacity="0.6" /><circle cx="12" cy="12" r="1.2" fill="currentColor" /></svg>
  ),
  megaphone: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 10v4h3l6 4V6L6 10H3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="M17 8a5 5 0 010 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
  ),
  window: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" /><path d="M3 9h18M9 9v11" stroke="currentColor" strokeWidth="1.3" opacity="0.6" /></svg>
  ),
  cart: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 4h2l2.2 11h10.6L20 7H6.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /><circle cx="9" cy="20" r="1.3" fill="currentColor" /><circle cx="17" cy="20" r="1.3" fill="currentColor" /></svg>
  ),
  bank: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 21V9l8-5 8 5v12H4z" stroke="currentColor" strokeWidth="1.4" /><path d="M9 21v-6M15 21v-6" stroke="currentColor" strokeWidth="1.3" /></svg>
  ),
  heartbeat: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 21s-7-4-7-10V5l7-3 7 3v6c0 6-7 10-7 10z" stroke="currentColor" strokeWidth="1.4" /><path d="M8 12h2l1.5-3 2 6 1.5-3H16" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  heart: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 20s-7-4.2-7-9.6C5 7 7.2 5 9.8 5c1 0 2 .4 2.2 1.2C12.2 5.4 13.2 5 14.2 5 16.8 5 19 7 19 10.4 19 15.8 12 20 12 20z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  gauge: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 16a8 8 0 1116 0" stroke="currentColor" strokeWidth="1.5" /><path d="M12 16l4.5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /><circle cx="12" cy="16" r="1.3" fill="currentColor" /></svg>
  ),
  robot: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="5" y="9" width="14" height="10" rx="3" stroke="currentColor" strokeWidth="1.5" /><path d="M12 5v4M9 14h.01M15 14h.01" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /><circle cx="12" cy="4" r="1.4" fill="currentColor" /></svg>
  ),
  chartUp: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 19V13M10 19V8M16 19v-5M20 19V5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
  ),
  graduation: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M2 8l10-4 10 4-10 4-10-4z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M6 10v5c0 1.5 3 3 6 3s6-1.5 6-3v-5" stroke="currentColor" strokeWidth="1.4" /></svg>
  ),
  award: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="8" r="5" stroke="currentColor" strokeWidth="1.4" /><path d="M8.5 12.5L7 21l5-2.5L17 21l-1.5-8.5" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  tag: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3l8 8-8.5 8.5a1.5 1.5 0 01-2.1 0L3.5 13.6a1.5 1.5 0 010-2.1L12 3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><circle cx="9" cy="8" r="1.6" fill="currentColor" /></svg>
  ),
  eye: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.4" /></svg>
  ),
  lifering: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.4" /><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.4" /><path d="M8.5 8.5l-3-3M15.5 8.5l3-3M8.5 15.5l-3 3M15.5 15.5l3 3" stroke="currentColor" strokeWidth="1.3" /></svg>
  ),
  check: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12.5l5 5L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M9 12l2 2 4-4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  sprint: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 12a8 8 0 0113.9-5.4M20 12a8 8 0 01-13.9 5.4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /><path d="M17.5 3.5v3.4h-3.4M6.5 20.5v-3.4h3.4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
};

// ============================================================
// DATA — content sourced verbatim from
// https://mirketa.us/salesforce-consulting-development-services/
// ============================================================

const BREADCRUMB = [
  { label: "Home", href: "/" },
  { label: "Platforms & Technology", href: "/platforms/salesforce/development-consulting" },
  { label: "Salesforce Development & Consulting" },
];

const HERO = {
  badge: "Certified Salesforce Partner",
  title: "Salesforce Consulting Services That Drive Measurable Growth",
  description:
    "We help mid-market and enterprise companies unlock the full power of Salesforce — from CRM implementation and custom development to AI-powered automation and seamless integrations. Real outcomes, not just configurations.",
  primaryCta: { label: "Get a Free Consultation", href: "#contact" },
  secondaryCta: { label: "Explore Services", href: "#services" },
  trust: "Trusted by 200+ enterprises across industries",
  platforms: ["Salesforce", "MuleSoft", "AWS", "Microsoft", "Oracle", "HubSpot", "ServiceNow"],
};

const HERO_STATS = [
  { value: "500+", label: "Salesforce Projects" },
  { value: "98%", label: "Client Retention Rate" },
  { value: "15+", label: "Years of Expertise" },
  { value: "3.2×", label: "Avg. ROI Delivered" },
];

const HERO_DASHBOARD = {
  title: "Salesforce Engagement Overview",
  stats: [
    { label: "Salesforce Projects", value: "500+", caption: "Delivered across 15+ industries" },
    { label: "Client Retention", value: "98%", caption: "Long-term partner relationships" },
    { label: "Avg. ROI Delivered", value: "3.2×", caption: "Across recent engagements" },
  ],
  rows: [
    { title: "Sales Cloud Lead Routing", meta: "Regional Bank — Einstein Lead Scoring", status: "68% faster", tone: "good" },
    { title: "6-System Integration", meta: "Manufacturer — SAP + ServiceMax", status: "Unified", tone: "good" },
    { title: "Agentforce Deployment", meta: "SaaS Company — Support automation", status: "62% auto-resolved", tone: "neutral" },
    { title: "Org Health Audit", meta: "Rescue engagement — technical debt", status: "In remediation", tone: "attention" },
  ],
  floatingCards: [
    { icon: Ico.award, title: "150+", subtitle: "Certified Professionals" },
    { icon: Ico.sparkle, title: "Einstein AI", subtitle: "Predictive scoring & Agentforce" },
  ],
};

const SERVICES = {
  eyebrow: "What We Do",
  heading: "End-to-End Salesforce Consulting Services",
  intro: "From initial strategy through long-term managed support, our certified Salesforce CRM experts handle every phase of your transformation so your team can focus on what matters most.",
  items: [
    { icon: Ico.compass, title: "Salesforce CRM Consulting", description: "Strategic guidance from certified Salesforce CRM experts who understand both the technology and the business outcomes you're trying to achieve.", capabilities: ["CRM Roadmap Planning", "Platform Assessment", "License Optimization"] },
    { icon: Ico.code, title: "Salesforce Custom Development", description: "Purpose-built Apex, Lightning Web Components, and Visualforce solutions that extend Salesforce far beyond out-of-the-box capabilities.", capabilities: ["Apex & LWC Development", "Custom Objects & Flows", "API Development"] },
    { icon: Ico.plug, title: "Salesforce Integration Services", description: "Connect Salesforce to your ERP, marketing stack, e-commerce platform, and data warehouse using MuleSoft, REST APIs, and native connectors.", capabilities: ["MuleSoft Integration", "ERP Connectivity", "Real-time Data Sync"] },
    { icon: Ico.headset, title: "Salesforce Managed Services", description: "Ongoing administration, optimization, and support that keeps your Salesforce org healthy, secure, and aligned with your evolving business needs.", capabilities: ["Dedicated Admin Support", "Release Management", "User Training"] },
    { icon: Ico.sparkle, title: "Salesforce AI Solutions", description: "Einstein AI, Agentforce, and predictive analytics implementations that automate decisions, surface insights, and accelerate revenue growth.", capabilities: ["Einstein Analytics", "Agentforce Setup", "Predictive Scoring"] },
    { icon: Ico.cloud, title: "Salesforce Cloud Consulting", description: "Deep expertise across Sales Cloud, Service Cloud, Marketing Cloud, Commerce Cloud, and Experience Cloud for unified customer experiences.", capabilities: ["Sales Cloud Optimization", "Service Cloud Setup", "Marketing Cloud"] },
    { icon: Ico.building, title: "Salesforce Industry Solutions", description: "Vertical-specific Salesforce configurations for financial services, healthcare, manufacturing, retail, and technology companies.", capabilities: ["Financial Services Cloud", "Health Cloud", "Manufacturing Cloud"] },
    { icon: Ico.flow, title: "Salesforce Business Automation", description: "Flow Builder, Process Builder, and custom automation solutions that eliminate manual work and accelerate your core business processes.", capabilities: ["Flow Automation", "Approval Processes", "Lead Assignment Rules"] },
  ],
};

const SERVICES_TRUST = [
  { icon: Ico.award, title: "Salesforce Certified Consultants", description: "Active certifications across Sales Cloud, Service Cloud, Marketing Cloud, and Platform Developer tracks." },
  { icon: Ico.shield, title: "Enterprise-Grade Security", description: "Rigorous UAT, regression testing, and security reviews before every production deployment." },
  { icon: Ico.sprint, title: "Agile Delivery Methodology", description: "Two-week sprints with regular demos keep stakeholders aligned throughout the build." },
  { icon: Ico.lifering, title: "Long-Term Managed Support", description: "A structured hypercare period with a clear transition to our managed services team." },
];

const DEEP_DIVE = {
  eyebrow: "Deep Dive",
  heading: "Salesforce Development & Implementation Expertise",
  tabs: [
    {
      tab: "CRM Consulting",
      title: "Salesforce CRM Consulting That Starts With Your Business",
      body: "Most Salesforce projects fail not because of the technology — they fail because the implementation wasn't grounded in a clear business strategy. Our CRM consulting engagements start with a deep discovery phase where we map your revenue processes, identify friction points, and define what \"success\" actually means for your organization. From there, we build a Salesforce roadmap that's realistic, prioritized, and tied to measurable outcomes. Whether you're evaluating Salesforce for the first time or trying to rescue a stalled implementation, our certified consultants bring the experience to get it right.",
      capabilities: ["Current-state CRM assessment", "Business process mapping", "Salesforce license advisory", "Org health audit", "Implementation roadmap", "ROI modeling", "Stakeholder alignment workshops", "Change management planning"],
    },
    {
      tab: "Implementation",
      title: "Salesforce Implementation Services Built for Scale",
      body: "A Salesforce implementation done right is one you never have to redo. Our implementation methodology follows a structured five-phase approach — Discovery, Design, Build, Test, and Deploy — with clear milestones, documented decisions, and rigorous quality gates at every stage. We configure Salesforce to match your actual sales, service, and marketing workflows rather than forcing your team to adapt to a generic setup. Every implementation includes comprehensive data migration, user training, and a 30-day hypercare period to ensure smooth adoption from day one.",
      capabilities: ["Full lifecycle implementation", "Data migration & cleansing", "Custom object configuration", "Workflow & approval setup", "User role & permission design", "UAT & QA testing", "Go-live support & hypercare", "Integration architecture"],
    },
    {
      tab: "Development",
      title: "Salesforce Custom Development for Complex Requirements",
      body: "When standard Salesforce configuration reaches its limits, custom development is the answer. Our Salesforce development team builds Apex triggers, Lightning Web Components, custom APIs, and AppExchange-ready applications that extend the platform's capabilities to match your most complex business requirements. We follow Salesforce best practices for governor limits, test coverage, and security review standards so your custom code is maintainable, scalable, and ready for every platform release.",
      capabilities: ["Apex classes & triggers", "Lightning Web Components", "Custom REST/SOAP APIs", "Batch & scheduled jobs", "AppExchange development", "Code review & refactoring"],
    },
    {
      tab: "Integration",
      title: "Salesforce Integration Services for a Connected Enterprise",
      body: "Your CRM is only as powerful as the data flowing into it. Our Salesforce integration team connects your org to ERP systems, marketing automation platforms, e-commerce solutions, data warehouses, and custom applications — creating a unified data environment where every team works from the same source of truth. We specialize in MuleSoft Anypoint Platform, native Salesforce Connect, and custom API development to build integrations that are reliable, observable, and built to handle enterprise-scale data volumes.",
      capabilities: ["MuleSoft Anypoint Platform", "ERP integration (SAP, Oracle)", "Marketing automation sync", "E-commerce connectivity", "Real-time event streaming", "API monitoring & alerting"],
    },
    {
      tab: "Managed Services",
      title: "Salesforce Managed Services — Your Org, Always Optimized",
      body: "Most companies don't need a full-time Salesforce admin — they need an experienced team available when it matters. Our managed services model gives you access to certified Salesforce administrators, developers, and architects on a flexible retainer. We handle day-to-day administration, release management, user support, and proactive optimization so your Salesforce org stays healthy, secure, and aligned with your business as it evolves. Monthly reporting keeps you informed on usage, performance, and upcoming opportunities.",
      capabilities: ["Dedicated admin support", "Salesforce release management", "Data quality management", "Security review & hardening", "Monthly health reports", "Priority incident response"],
    },
  ],
};

const AI_SECTION = {
  eyebrow: "AI-Powered CRM",
  heading: "Salesforce AI Solutions That Work While You Sleep",
  intro: "Einstein AI, Agentforce, and predictive analytics aren't buzzwords — they're the tools that help our clients close deals faster, reduce churn, and surface insights that manual reporting simply can't match. We configure, train, and deploy Salesforce AI capabilities that fit your actual business model.",
  items: [
    { icon: Ico.gauge, title: "Einstein Lead Scoring", description: "AI-powered lead prioritization that helps reps focus on deals most likely to close." },
    { icon: Ico.robot, title: "Agentforce Deployment", description: "Autonomous AI agents that handle routine customer interactions 24/7 without human intervention." },
    { icon: Ico.chartUp, title: "Predictive Analytics", description: "Revenue forecasting and churn prediction models trained on your historical CRM data." },
  ],
  cta: { label: "Explore Agentforce", href: "/agentforce" },
};

const CLOUDS = {
  eyebrow: "Salesforce Clouds Expertise",
  heading: "Certified Across the Full Salesforce Platform",
  items: [
    { icon: Ico.target, name: "Sales Cloud" },
    { icon: Ico.headset, name: "Service Cloud" },
    { icon: Ico.megaphone, name: "Marketing Cloud" },
    { icon: Ico.window, name: "Experience Cloud" },
    { icon: Ico.cart, name: "Commerce Cloud" },
    { icon: Ico.bank, name: "Financial Services Cloud" },
    { icon: Ico.heartbeat, name: "Health Cloud" },
    { icon: Ico.heart, name: "Nonprofit Cloud" },
  ],
};

const INTEGRATIONS = {
  eyebrow: "Integrations",
  heading: "Connect Salesforce to Every Corner of Your Business",
  intro: "Siloed systems kill productivity. Our Salesforce integration services connect your CRM to ERP platforms, marketing tools, e-commerce systems, and custom applications — creating a single source of truth your teams can actually trust. We use MuleSoft, REST APIs, and native connectors to build integrations that are reliable, scalable, and maintainable.",
  platforms: ["SAP", "Oracle ERP", "Microsoft Dynamics", "NetSuite", "Workday", "Marketo", "HubSpot", "Shopify", "Magento", "AWS", "Azure", "Google Cloud", "Slack", "Tableau", "MuleSoft", "Boomi", "Jira", "ServiceNow"],
};

const INDUSTRIES = {
  eyebrow: "Industries We Serve",
  heading: "Salesforce Solutions Built for Your Industry",
  intro: "Generic CRM configurations don't cut it in competitive markets. We bring deep vertical expertise to every engagement.",
  items: [
    { icon: Ico.bank, title: "Financial Services", description: "Wealth management, banking, and insurance CRM solutions" },
    { icon: Ico.heartbeat, title: "Healthcare & Life Sciences", description: "Patient engagement and clinical workflow automation" },
    { icon: Ico.building, title: "Manufacturing", description: "Dealer management and field service optimization" },
    { icon: Ico.cart, title: "Retail & E-commerce", description: "Unified commerce and personalized customer journeys" },
    { icon: Ico.graduation, title: "Education", description: "Student recruitment and alumni engagement solutions" },
    { icon: Ico.heart, title: "Nonprofits", description: "Donor management and program delivery optimization" },
  ],
};

const RESULTS = {
  eyebrow: "Proven Results",
  heading: "What Happens When Salesforce Is Done Right",
  intro: "These aren't vanity metrics. They're the outcomes our clients report after working with us.",
  cases: [
    {
      title: "Regional Bank Cuts Lead Response Time by 68%",
      industry: "Financial Services",
      body: "A mid-sized regional bank was losing prospects to faster competitors. We rebuilt their Sales Cloud implementation with intelligent lead routing, automated follow-up sequences, and Einstein Lead Scoring — reducing average response time from 4 hours to 47 minutes.",
      metrics: [{ value: "68%", label: "Faster Response" }, { value: "2.4×", label: "Pipeline Growth" }, { value: "41%", label: "Higher Close Rate" }],
    },
    {
      title: "Industrial Manufacturer Unifies 6 Systems Into One CRM",
      industry: "Manufacturing",
      body: "A $200M manufacturer was running sales, service, and field operations across six disconnected platforms. Our integration team connected SAP, ServiceMax, and three legacy databases to Salesforce — giving leadership a single dashboard for the entire customer lifecycle.",
      metrics: [{ value: "6→1", label: "Systems Unified" }, { value: "35%", label: "Admin Time Saved" }, { value: "99.8%", label: "Data Accuracy" }],
    },
    {
      title: "B2B SaaS Company Scales Support Without Adding Headcount",
      industry: "SaaS / Technology",
      body: "A fast-growing SaaS company needed to handle 3× ticket volume without tripling their support team. We deployed Agentforce with custom AI models trained on their product documentation — resolving 62% of tickets automatically.",
      metrics: [{ value: "62%", label: "Auto-Resolved" }, { value: "3×", label: "Volume Handled" }, { value: "4.8★", label: "CSAT Score" }],
    },
  ],
};

const TESTIMONIALS = [
  { quote: "The team at Mirketa didn't just implement Salesforce — they took the time to understand how our sales team actually works. The result is a CRM our reps use voluntarily, which is something we never achieved with our previous setup.", name: "Brent" },
  { quote: "We had a failed Salesforce implementation from another vendor. Mirketa came in, diagnosed the root causes, and rebuilt the foundation in 90 days. Our pipeline visibility went from zero to real-time. The ROI was evident within the first quarter.", name: "Drew Powers" },
  { quote: "What sets Mirketa apart is their honesty. They told us upfront what was realistic and what wasn't — and then they delivered exactly what they promised. That kind of transparency is rare in the consulting world.", name: "Priya Sharma", role: "Director of Operations, HealthBridge Systems" },
  { quote: "Our Salesforce org was a mess — years of technical debt, duplicate records, and broken automations. The managed services team cleaned it up, documented everything, and now we have a system we can actually build on.", name: "David Park" },
];

const METHODOLOGY = {
  eyebrow: "How We Work",
  heading: "Our Proven Salesforce Implementation Methodology",
  intro: "No surprises, no scope creep, no missed deadlines. Our structured delivery framework has been refined across 500+ Salesforce projects.",
  phases: [
    { name: "Discovery & Assessment", description: "We audit your current state, map your business processes, and define success metrics before writing a single line of configuration." },
    { name: "Solution Design", description: "Architecture decisions, data models, integration blueprints, and a detailed project plan — all documented and approved before build begins." },
    { name: "Agile Build & Configure", description: "Two-week sprints with regular demos keep stakeholders aligned and allow for course corrections before they become expensive problems." },
    { name: "Testing & Quality Gates", description: "Rigorous UAT, regression testing, and security reviews ensure every component performs exactly as designed before it touches production." },
    { name: "Deploy & Optimize", description: "Go-live support, user training, and a 30-day hypercare period followed by ongoing optimization to maximize your investment over time." },
  ],
};

const WHY_MIRKETA = {
  eyebrow: "Why Mirketa",
  heading: "Salesforce Consulting That Puts Business Outcomes First",
  intro: "There are hundreds of Salesforce partners. What separates the ones who deliver from the ones who disappear after go-live is a genuine commitment to your outcomes — not just your project timeline. We've built our practice around long-term client relationships, and our 98% retention rate reflects that.",
  items: [
    { icon: Ico.award, title: "Certified Salesforce Expertise", description: "Every consultant holds active Salesforce certifications across Sales Cloud, Service Cloud, Marketing Cloud, and Platform Developer tracks." },
    { icon: Ico.tag, title: "Fixed-Price Delivery Options", description: "We offer fixed-price engagements for well-defined scopes so you always know what you're getting and what you're paying." },
    { icon: Ico.eye, title: "Transparent Communication", description: "Weekly status reports, a dedicated project manager, and a real-time project dashboard — no black boxes, ever." },
    { icon: Ico.lifering, title: "Post-Launch Support Included", description: "Every project includes a structured hypercare period and transition to our managed services team if you need ongoing support." },
  ],
  stats: [
    { value: "500+", label: "Salesforce Projects", note: "Delivered across 15+ industries worldwide" },
    { value: "98%", label: "Client Retention Rate", note: "Our work speaks for itself" },
    { value: "150+", label: "Certified Professionals", note: "Active Salesforce certifications on our team" },
    { value: "15+", label: "Years of Partnership", note: "As a certified Salesforce consulting partner" },
  ],
};

const FAQS = [
  { q: "How long does a typical Salesforce implementation take?", a: "Timeline depends on scope and complexity. A focused Sales Cloud implementation for a 50-person team typically takes 8–12 weeks. A multi-cloud enterprise deployment with custom integrations can take 4–6 months. During our initial discovery session, we provide a detailed timeline with milestones so you know exactly what to expect before we begin." },
  { q: "What does Salesforce consulting cost?", a: "Salesforce consulting engagements are priced based on scope, team size, and complexity. We offer both fixed-price project engagements and flexible retainer-based managed services. Most mid-market implementations range from $25,000 to $150,000 depending on the number of clouds, integrations, and custom development required. We provide detailed proposals with no hidden fees after our free discovery session." },
  { q: "Can you rescue a failed Salesforce implementation?", a: "Yes — this is one of our most common engagement types. We start with a comprehensive org audit to identify technical debt, broken automations, data quality issues, and adoption gaps. From there, we build a remediation roadmap that prioritizes the highest-impact fixes first. Most rescue projects see measurable improvement within 60–90 days." },
  { q: "Do you provide Salesforce training for our team?", a: "Absolutely. User adoption is one of the most critical factors in Salesforce ROI, and we treat training as a core deliverable, not an afterthought. We provide role-based training sessions, recorded walkthroughs, custom user guides, and admin training to ensure your team is fully self-sufficient after go-live." },
  { q: "What Salesforce clouds do you specialize in?", a: "We hold certifications and have active project experience across Sales Cloud, Service Cloud, Marketing Cloud, Experience Cloud, Commerce Cloud, Financial Services Cloud, Health Cloud, and Nonprofit Cloud. We also specialize in MuleSoft integration and Einstein AI implementations." },
  { q: "How do Salesforce managed services work?", a: "Our managed services model gives you access to a dedicated team of Salesforce admins, developers, and architects on a monthly retainer. You get a defined number of hours per month, a named project manager, a ticketing system for requests, and monthly reporting on org health and activity. Retainers start at 20 hours/month and scale based on your needs." },
  { q: "Can you integrate Salesforce with our existing ERP?", a: "Yes. We have deep experience integrating Salesforce with SAP, Oracle ERP, NetSuite, Microsoft Dynamics, Workday, and custom-built ERP systems. Our integration approach uses MuleSoft Anypoint Platform or custom REST/SOAP APIs depending on your architecture, with full error handling, retry logic, and monitoring built in from day one." },
  { q: "What industries does Mirketa serve?", a: "We serve clients across financial services, healthcare and life sciences, manufacturing, retail and e-commerce, technology and SaaS, education, nonprofits, and energy and utilities. Our vertical expertise means we understand your industry's regulatory requirements, data models, and business processes — not just the Salesforce platform." },
];

const GET_IN_TOUCH = {
  eyebrow: "Get In Touch",
  heading: "Talk to a Certified Salesforce Consultant — Free",
  intro: "Whether you're starting fresh, scaling an existing org, or trying to rescue a stalled project, our team is ready to help. No sales pressure. No generic pitch decks. Just an honest conversation about what's possible for your business.",
  points: [
    "Free 60-minute discovery call — no commitment required",
    "Detailed proposal within 3 business days",
    "Certified consultants on every call — not junior sales reps",
    "NDA available before any technical discussions",
    "Fixed-price options available for defined scopes",
  ],
};

const FINAL_CTA = {
  heading: "Ready to Transform Your Business With Salesforce?",
  description: "Join 200+ enterprises that trust Mirketa to deliver Salesforce consulting services that create real, measurable business outcomes — not just configurations.",
  primaryCta: { label: "Book a Discovery Call", href: "#contact" },
  secondaryCta: { label: "Contact Salesforce Experts", href: "#contact" },
};

const SEO = {
  title: "Salesforce Consulting & Development Services | Mirketa",
  description:
    "Mirketa's certified Salesforce consultants deliver CRM implementation, custom development, AI solutions, and integrations that drive measurable growth for enterprises.",
  canonical: "https://www.mirketa.com/salesforce-consulting-development-services/",
  keywords: [
    "Salesforce consulting services",
    "Salesforce development company",
    "Salesforce implementation partner",
    "Salesforce managed services",
    "Salesforce integration services",
    "Salesforce AI consulting",
    "certified Salesforce partner",
    "Salesforce CRM consulting",
    "Salesforce custom development",
    "MuleSoft integration services",
    "Salesforce Agentforce implementation",
    "enterprise Salesforce consulting",
  ],
  schema: [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "Salesforce Consulting and Development Services",
      provider: { "@type": "Organization", name: "Mirketa Inc.", url: "https://www.mirketa.com" },
      name: "Salesforce Development & Consulting Services",
      description:
        "End-to-end Salesforce consulting, implementation, custom development, integration, AI, and managed services for mid-market and enterprise organizations.",
      areaServed: "Global",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.mirketa.com/" },
        { "@type": "ListItem", position: 2, name: "Platforms & Technology", item: "https://www.mirketa.com/platforms/salesforce/development-consulting" },
        { "@type": "ListItem", position: 3, name: "Salesforce Development & Consulting", item: "https://www.mirketa.com/salesforce-consulting-development-services/" },
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

export default function SalesforceConsulting() {
  const heroTextRef = useRef(null);
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (heroTextRef.current) {
        gsap.from(heroTextRef.current.children, {
          opacity: 0,
          y: 28,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
        });
      }

      gsap.utils.toArray(".svc-reveal").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 32,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      gsap.utils.toArray(".svc-reveal-stagger").forEach((el) => {
        gsap.from(el.children, {
          opacity: 0,
          y: 26,
          duration: 0.6,
          stagger: 0.06,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      gsap.utils.toArray(".svc-zoom-in").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          scale: 0.94,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="salesforce-consulting">
      <Seo {...SEO} />
      <HeroSection heroTextRef={heroTextRef} heroRef={heroRef} />
      <ServicesSection />
      <DeepDiveSection />
      <AiSection />
      <CloudsSection />
      <IntegrationsSection />
      <IndustriesSection />
      <ResultsSection />
      <TestimonialsSection />
      <MethodologySection />
      <WhyMirketaSection />
      <FaqSection />
      <GetInTouchSection />
      <FinalCtaSection />
      <ConsultationSection
        eyebrow="Get Started"
        heading="Request a Free Salesforce Consultation"
        description="Tell us about your current Salesforce org, business goals, and where you need strategic or implementation help — a senior Salesforce consultant will follow up within one business day."
        formTitle="Request a Free Salesforce Consultation"
      />
    </div>
  );
}

// ============================================================
// HERO
// ============================================================

function HeroSection({ heroTextRef, heroRef }) {
  return (
    <section ref={heroRef} className="svc-hero" style={{ backgroundImage: `url("${Images.heroSalesforceConsulting}")` }} aria-label="Salesforce Consulting Services by Mirketa">
      <div className="svc-hero__scrim" />
      <div className="container">
        <Breadcrumb items={BREADCRUMB} className="svc-breadcrumb" />
        <div className="svc-hero__inner">
          <div ref={heroTextRef} className="svc-hero__text">
            <span className="svc-badge">
              <span aria-hidden="true">✦</span> {HERO.badge}
            </span>
            <h1>{HERO.title}</h1>
            <p className="svc-hero__description">{HERO.description}</p>
            <div className="svc-hero__ctas">
              <a href={HERO.primaryCta.href} className="btn btn-primary svc-btn">
                {HERO.primaryCta.label} <span aria-hidden="true">→</span>
              </a>
              <a href={HERO.secondaryCta.href} className="btn btn-secondary svc-btn">
                {HERO.secondaryCta.label}
              </a>
            </div>
            <ul className="svc-hero__metrics">
              {HERO_STATS.map((s) => (
                <li key={s.label}>
                  <span aria-hidden="true">{Ico.check}</span>
                  {s.value} {s.label}
                </li>
              ))}
            </ul>
          </div>

          <HeroVisual
            dashboardTitle={HERO_DASHBOARD.title}
            stats={HERO_DASHBOARD.stats}
            rows={HERO_DASHBOARD.rows}
            floatingCards={HERO_DASHBOARD.floatingCards}
            className="svc-hero__visual"
          />
        </div>
      </div>
    </section>
  );
}

// ============================================================
// WHAT WE DO — 8 service cards with capability sub-lists
// ============================================================

function ServicesSection() {
  return (
    <section className="section svc-services" id="services" aria-labelledby="svc-services-heading">
      <div className="container">
        <div className="section-heading svc-reveal">
          <p className="svc-eyebrow">{SERVICES.eyebrow}</p>
          <h2 id="svc-services-heading">{SERVICES.heading}</h2>
          <p>{SERVICES.intro}</p>
        </div>
        <div className="svc-services__grid svc-reveal-stagger">
          {SERVICES.items.map((s) => (
            <div className="svc-service-card" key={s.title}>
              <span className="svc-service-card__icon">{s.icon}</span>
              <h3>{s.title}</h3>
              <p>{s.description}</p>
              <ul className="svc-service-card__caps">
                {s.capabilities.map((c) => (
                  <li key={c}>
                    <span aria-hidden="true">{Ico.check}</span>
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="svc-services__trust svc-reveal-stagger">
          {SERVICES_TRUST.map((t) => (
            <div className="svc-trust-item" key={t.title}>
              <span className="svc-trust-item__icon">{t.icon}</span>
              <div>
                <strong>{t.title}</strong>
                <span>{t.description}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// DEEP DIVE — tabbed capability breakdown
// ============================================================

function DeepDiveSection() {
  const [active, setActive] = useState(0);
  const tab = DEEP_DIVE.tabs[active];

  return (
    <section className="section svc-deepdive" aria-labelledby="svc-deepdive-heading">
      <div className="container">
        <div className="section-heading svc-reveal">
          <p className="svc-eyebrow">{DEEP_DIVE.eyebrow}</p>
          <h2 id="svc-deepdive-heading">{DEEP_DIVE.heading}</h2>
        </div>

        <div className="svc-deepdive__tabs" role="tablist" aria-label="Salesforce service deep dives">
          {DEEP_DIVE.tabs.map((t, i) => (
            <button
              key={t.tab}
              type="button"
              role="tab"
              id={`svc-tab-${i}`}
              aria-selected={active === i}
              aria-controls={`svc-panel-${i}`}
              className={`svc-deepdive__tab ${active === i ? "is-active" : ""}`}
              onClick={() => setActive(i)}
            >
              {t.tab}
            </button>
          ))}
        </div>

        <div className="svc-deepdive__panel svc-zoom-in" role="tabpanel" id={`svc-panel-${active}`} aria-labelledby={`svc-tab-${active}`} key={active}>
          <h3>{tab.title}</h3>
          <p>{tab.body}</p>
          <ul className="svc-deepdive__caps">
            {tab.capabilities.map((c) => (
              <li key={c}>
                <span aria-hidden="true">{Ico.check}</span>
                {c}
              </li>
            ))}
          </ul>
          <a href="#contact" className="svc-deepdive__cta">
            Discuss This Service <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// AI-POWERED CRM
// ============================================================

function AiSection() {
  return (
    <section className="section svc-ai" aria-labelledby="svc-ai-heading">
      <div className="container">
        <div className="section-heading svc-reveal">
          <p className="svc-eyebrow">{AI_SECTION.eyebrow}</p>
          <h2 id="svc-ai-heading">{AI_SECTION.heading}</h2>
          <p>{AI_SECTION.intro}</p>
        </div>
        <div className="svc-ai__grid svc-reveal-stagger">
          {AI_SECTION.items.map((a) => (
            <div className="svc-ai-card" key={a.title}>
              <span className="svc-ai-card__icon">{a.icon}</span>
              <h3>{a.title}</h3>
              <p>{a.description}</p>
            </div>
          ))}
        </div>
        <div className="svc-ai__cta svc-reveal">
          <Link to={AI_SECTION.cta.href} className="btn btn-primary svc-btn">
            {AI_SECTION.cta.label} <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// SALESFORCE CLOUDS EXPERTISE
// ============================================================

function CloudsSection() {
  return (
    <section className="section svc-clouds" aria-labelledby="svc-clouds-heading">
      <div className="container">
        <div className="section-heading svc-reveal">
          <p className="svc-eyebrow">{CLOUDS.eyebrow}</p>
          <h2 id="svc-clouds-heading">{CLOUDS.heading}</h2>
        </div>
        <div className="svc-clouds__grid svc-reveal-stagger">
          {CLOUDS.items.map((c) => (
            <div className="svc-cloud-card" key={c.name}>
              <span className="svc-cloud-card__icon">{c.icon}</span>
              <h3>{c.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// INTEGRATIONS
// ============================================================

function IntegrationsSection() {
  return (
    <section className="section svc-integrations" aria-labelledby="svc-integrations-heading">
      <div className="container">
        <div className="section-heading svc-reveal">
          <p className="svc-eyebrow">{INTEGRATIONS.eyebrow}</p>
          <h2 id="svc-integrations-heading">{INTEGRATIONS.heading}</h2>
          <p>{INTEGRATIONS.intro}</p>
        </div>
        <ul className="svc-integrations__wall svc-reveal-stagger">
          {INTEGRATIONS.platforms.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// ============================================================
// INDUSTRIES WE SERVE
// ============================================================

function IndustriesSection() {
  return (
    <section className="section svc-industries" aria-labelledby="svc-industries-heading">
      <div className="container">
        <div className="section-heading svc-reveal">
          <p className="svc-eyebrow">{INDUSTRIES.eyebrow}</p>
          <h2 id="svc-industries-heading">{INDUSTRIES.heading}</h2>
          <p>{INDUSTRIES.intro}</p>
        </div>
        <div className="svc-industries__grid svc-reveal-stagger">
          {INDUSTRIES.items.map((i) => (
            <div className="svc-industry-card" key={i.title}>
              <span className="svc-industry-card__icon">{i.icon}</span>
              <h3>{i.title}</h3>
              <p>{i.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// PROVEN RESULTS — case studies
// ============================================================

function ResultsSection() {
  return (
    <section className="section svc-results" aria-labelledby="svc-results-heading">
      <div className="container">
        <div className="section-heading svc-reveal">
          <p className="svc-eyebrow">{RESULTS.eyebrow}</p>
          <h2 id="svc-results-heading">{RESULTS.heading}</h2>
          <p>{RESULTS.intro}</p>
        </div>
        <div className="svc-results__grid svc-reveal-stagger">
          {RESULTS.cases.map((c) => (
            <div className="svc-case-card" key={c.title}>
              <span className="svc-case-card__tag">{c.industry}</span>
              <h3>{c.title}</h3>
              <p>{c.body}</p>
              <div className="svc-case-card__metrics">
                {c.metrics.map((m) => (
                  <div key={m.label}>
                    <strong>{m.value}</strong>
                    <span>{m.label}</span>
                  </div>
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
// CLIENT VOICES — testimonials
// ============================================================

function TestimonialsSection() {
  return (
    <section className="section svc-testimonials" aria-labelledby="svc-testimonials-heading">
      <div className="container">
        <div className="section-heading svc-reveal">
          <p className="svc-eyebrow">Client Voices</p>
          <h2 id="svc-testimonials-heading">What Our Clients Say About Working With Us</h2>
        </div>
        <div className="svc-testimonials__grid svc-reveal-stagger">
          {TESTIMONIALS.map((t) => (
            <figure className="svc-testimonial-card" key={t.name}>
              <img src={Images.iconQuote} alt="" aria-hidden="true" className="svc-testimonial-card__mark" />
              <blockquote>{t.quote}</blockquote>
              <figcaption>
                <strong>{t.name}</strong>
                {t.role && <span>{t.role}</span>}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// HOW WE WORK — five-phase methodology
// ============================================================

function MethodologySection() {
  return (
    <section className="section svc-methodology" aria-labelledby="svc-methodology-heading">
      <div className="container">
        <div className="section-heading svc-reveal">
          <p className="svc-eyebrow">{METHODOLOGY.eyebrow}</p>
          <h2 id="svc-methodology-heading">{METHODOLOGY.heading}</h2>
          <p>{METHODOLOGY.intro}</p>
        </div>
        <div className="svc-methodology__rail svc-reveal-stagger">
          {METHODOLOGY.phases.map((p, i) => (
            <div className="svc-phase-card" key={p.name}>
              <span className="svc-phase-card__num">{String(i + 1).padStart(2, "0")}</span>
              <h3>{p.name}</h3>
              <p>{p.description}</p>
              {i < METHODOLOGY.phases.length - 1 && <span className="svc-phase-card__arrow" aria-hidden="true">→</span>}
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
    <section className="section svc-why" aria-labelledby="svc-why-heading">
      <div className="container">
        <div className="section-heading svc-reveal">
          <p className="svc-eyebrow">{WHY_MIRKETA.eyebrow}</p>
          <h2 id="svc-why-heading">{WHY_MIRKETA.heading}</h2>
          <p>{WHY_MIRKETA.intro}</p>
        </div>
        <div className="svc-why__grid svc-reveal-stagger">
          {WHY_MIRKETA.items.map((w) => (
            <div className="svc-why-card" key={w.title}>
              <span className="svc-why-card__icon">{w.icon}</span>
              <h3>{w.title}</h3>
              <p>{w.description}</p>
            </div>
          ))}
        </div>
        <div className="svc-why__stats svc-reveal-stagger">
          {WHY_MIRKETA.stats.map((s) => (
            <div className="svc-why-stat" key={s.label}>
              <strong>{s.value}</strong>
              <span>{s.label}</span>
              <p>{s.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// FAQ — live search + accordion
// ============================================================

function FaqSection() {
  const [query, setQuery] = useState("");
  const [openIndex, setOpenIndex] = useState(-1);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return FAQS;
    return FAQS.filter((item) => item.q.toLowerCase().includes(q) || item.a.toLowerCase().includes(q));
  }, [query]);

  return (
    <section className="section svc-faq" aria-labelledby="svc-faq-heading">
      <div className="container">
        <div className="section-heading svc-reveal">
          <p className="svc-eyebrow">FAQ</p>
          <h2 id="svc-faq-heading">Frequently Asked Questions About Salesforce Consulting</h2>
        </div>
        <div className="svc-faq__search-wrap svc-reveal">
          <label htmlFor="svc-faq-search" className="visually-hidden">
            Search frequently asked questions
          </label>
          <input
            id="svc-faq-search"
            type="search"
            className="svc-faq__search"
            placeholder="Ask a question — e.g. &quot;cost&quot;, &quot;timeline&quot;, &quot;managed services&quot;..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpenIndex(-1);
            }}
          />
        </div>
        <div className="svc-faq__list svc-reveal">
          {filtered.length === 0 ? (
            <p className="svc-faq__empty">No questions match &ldquo;{query}&rdquo;. Try a different search term.</p>
          ) : (
            filtered.map((item, i) => {
              const open = openIndex === i;
              const panelId = `svc-faq-panel-${i}`;
              return (
                <div className={`svc-faq-item ${open ? "is-open" : ""}`} key={item.q}>
                  <button type="button" className="svc-faq-item__question" aria-expanded={open} aria-controls={panelId} onClick={() => setOpenIndex(open ? -1 : i)}>
                    <span>{item.q}</span>
                    <span className="svc-faq-item__icon" aria-hidden="true">{open ? "−" : "+"}</span>
                  </button>
                  <div id={panelId} className="svc-faq-item__answer" role="region" hidden={!open}>
                    <p>{item.a}</p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// GET IN TOUCH — supporting copy that anchors back to the hero form
// ============================================================

function GetInTouchSection() {
  return (
    <section className="section svc-touch" aria-labelledby="svc-touch-heading">
      <div className="container svc-touch__inner">
        <p className="svc-eyebrow">{GET_IN_TOUCH.eyebrow}</p>
        <h2 id="svc-touch-heading">{GET_IN_TOUCH.heading}</h2>
        <p>{GET_IN_TOUCH.intro}</p>
        <ul className="svc-touch__points">
          {GET_IN_TOUCH.points.map((p) => (
            <li key={p}>
              <img src={Images.iconCheckCircle} alt="" aria-hidden="true" />
              {p}
            </li>
          ))}
        </ul>
        <a href="#contact" className="btn btn-primary svc-btn">
          Request Your Free Consultation <span aria-hidden="true">→</span>
        </a>
        <p className="svc-touch__links">
          Explore related services: <Link to="/ai-consulting">AI Consulting</Link>, <Link to="/ai-enablement">AI Enablement</Link>,{" "}
          <Link to="/data-cloud">Salesforce Data Cloud</Link>, <Link to="/agentforce">Agentforce</Link>,{" "}
          <a href="#services">Integration Services</a>, <a href="#services">Managed Services</a>,{" "}
          <Link to="/insights">Customer Success</Link>, <Link to="/blog">Blogs</Link>.
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
    <section className="svc-final-cta svc-reveal" aria-labelledby="svc-final-cta-heading">
      <div className="container svc-final-cta__inner">
        <h2 id="svc-final-cta-heading">{FINAL_CTA.heading}</h2>
        <p>{FINAL_CTA.description}</p>
        <div className="svc-final-cta__ctas">
          <a href={FINAL_CTA.primaryCta.href} className="btn btn-primary svc-btn">
            {FINAL_CTA.primaryCta.label} <span aria-hidden="true">→</span>
          </a>
          <a href={FINAL_CTA.secondaryCta.href} className="btn btn-secondary svc-btn">
            {FINAL_CTA.secondaryCta.label}
          </a>
        </div>
        <Link to="/platforms/salesforce/clouds" className="svc-final-cta__all-services">
          View All Services →
        </Link>
      </div>
    </section>
  );
}
