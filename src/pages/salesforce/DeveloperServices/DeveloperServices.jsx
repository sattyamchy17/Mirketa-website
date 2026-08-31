import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Images } from "../../../assets/images/index.js";
import Seo from "../../../components/Seo/Seo.jsx";
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb.jsx";
import HeroVisual from "../../../components/HeroVisual/HeroVisual.jsx";
import ConsultationSection from "../../../components/ConsultationSection/ConsultationSection.jsx";
import "./DeveloperServices.css";

gsap.registerPlugin(ScrollTrigger);

// ============================================================
// ICONS
// ============================================================

const Ico = {
  code: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 6L4 12l5 6M15 6l5 6-5 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  chip: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="7" y="7" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.4" /><path d="M9 3v4M15 3v4M9 21v-4M15 21v-4M3 9h4M3 15h4M21 9h-4M21 15h-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
  ),
  document: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 3h9l3 3v15H6z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M9 10h6M9 14h6M9 18h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
  ),
  plug: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 3v5M15 3v5M7 8h10v4a5 5 0 01-10 0V8z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="M12 17v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
  ),
  cart: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 4h2l2.2 11h10.6L20 7H6.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /><circle cx="9" cy="20" r="1.3" fill="currentColor" /><circle cx="17" cy="20" r="1.3" fill="currentColor" /></svg>
  ),
  box: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 8l9-5 9 5-9 5-9-5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M3 8v8l9 5 9-5V8M12 13v8" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /></svg>
  ),
  layers: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3l9 5-9 5-9-5 9-5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M3 12l9 5 9-5M3 16l9 5 9-5" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /></svg>
  ),
  gear: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.4" /><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
  ),
  gear2: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="10" width="18" height="4" rx="2" stroke="currentColor" strokeWidth="1.4" /><rect x="3" y="18" width="12" height="4" rx="2" stroke="currentColor" strokeWidth="1.4" /><rect x="3" y="2" width="15" height="4" rx="2" stroke="currentColor" strokeWidth="1.4" /></svg>
  ),
  phone: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="6" y="2" width="12" height="20" rx="3" stroke="currentColor" strokeWidth="1.5" /><path d="M10 19h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
  ),
  sparkle: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /></svg>
  ),
  robot: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="5" y="9" width="14" height="10" rx="3" stroke="currentColor" strokeWidth="1.5" /><path d="M12 5v4M9 14h.01M15 14h.01" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /><circle cx="12" cy="4" r="1.4" fill="currentColor" /></svg>
  ),
  network: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="6" r="2.4" stroke="currentColor" strokeWidth="1.4" /><circle cx="6" cy="18" r="2.4" stroke="currentColor" strokeWidth="1.4" /><circle cx="18" cy="18" r="2.4" stroke="currentColor" strokeWidth="1.4" /><path d="M12 8.4L7 16M12 8.4l5 7.6M8.4 18h7.2" stroke="currentColor" strokeWidth="1.3" /></svg>
  ),
  refresh: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 12a8 8 0 0113.7-5.7L20 8M20 4v4h-4M20 12a8 8 0 01-13.7 5.7L4 16M4 20v-4h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  compass: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" /><path d="M15 9l-2 6-6 2 2-6 6-2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  eye: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.4" /></svg>
  ),
  check: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12.5l5 5L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  chartUp: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 19V13M10 19V8M16 19v-5M20 19V5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 2l8 4v6c0 5-4 8-8 10-4-2-8-5-8-10V6l8-4z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M8.5 12l2 2 5-5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  award: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="8" r="5" stroke="currentColor" strokeWidth="1.4" /><path d="M8.5 12.5L7 21l5-2.5L17 21l-1.5-8.5" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  bolt: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M13 2L4 14h7l-1 8 10-13h-7l0-7z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  handshake: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 12l4-4 4 4-4 4-4-4zM21 12l-4-4-4 4 4 4 4-4z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M11 12h2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
  ),
  users: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="9" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.4" /><path d="M3.5 19c.6-3.4 2.9-5.2 5.5-5.2s4.9 1.8 5.5 5.2" stroke="currentColor" strokeWidth="1.4" /><circle cx="17" cy="9" r="2.6" stroke="currentColor" strokeWidth="1.3" opacity="0.7" /><path d="M15.5 13.4c2.2.3 3.7 1.9 4 4.6" stroke="currentColor" strokeWidth="1.3" opacity="0.7" /></svg>
  ),
  heartbeat: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 21s-7-4-7-10V5l7-3 7 3v6c0 6-7 10-7 10z" stroke="currentColor" strokeWidth="1.4" /><path d="M8 12h2l1.5-3 2 6 1.5-3H16" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  factory: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 21V11l5 3V11l5 3V8l8 5v8H3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  bank: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 21V9l8-5 8 5v12H4z" stroke="currentColor" strokeWidth="1.4" /><path d="M9 21v-6M15 21v-6" stroke="currentColor" strokeWidth="1.3" /></svg>
  ),
  graduation: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M2 8l10-4 10 4-10 4-10-4z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M6 10v5c0 1.5 3 3 6 3s6-1.5 6-3v-5" stroke="currentColor" strokeWidth="1.4" /></svg>
  ),
  heart: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 20s-7-4.2-7-9.6C5 7 7.2 5 9.8 5c1 0 2 .4 2.2 1.2C12.2 5.4 13.2 5 14.2 5 16.8 5 19 7 19 10.4 19 15.8 12 20 12 20z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  flask: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 3h6M10 3v6l-5 9a2 2 0 001.7 3h10.6a2 2 0 001.7-3l-5-9V3" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /></svg>
  ),
  building: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 21V9l8-5 8 5v12H4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="M9 21v-6h6v6" stroke="currentColor" strokeWidth="1.4" /></svg>
  ),
  cross: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 4v16M4 12h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
  ),
  globe: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.4" /><path d="M3 12h18M12 3c2.5 2.5 3.5 6 3.5 9s-1 6.5-3.5 9c-2.5-2.5-3.5-6-3.5-9s1-6.5 3.5-9z" stroke="currentColor" strokeWidth="1.3" /></svg>
  ),
  cloud: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6.5 16.5A4.2 4.2 0 017 8.2 5.5 5.5 0 0117.5 9.5 3.7 3.7 0 0117 17H7" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></svg>
  ),
  government: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 10l8-6 8 6" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="M4 10h16v2H4z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M6 12v8M10 12v8M14 12v8M18 12v8" stroke="currentColor" strokeWidth="1.4" /><path d="M4 20h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
  ),
  bolt2: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M13 2L4 14h7l-1 8 10-13h-7l0-7z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  headset: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 13a8 8 0 0116 0v4" stroke="currentColor" strokeWidth="1.5" /><rect x="3" y="13" width="4" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4" /><rect x="17" y="13" width="4" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4" /></svg>
  ),
};

// ============================================================
// DATA
// ============================================================

const BREADCRUMB = [
  { label: "Home", href: "/" },
  { label: "Platforms & Technology", href: "/salesforce-consulting-development-services" },
  { label: "Salesforce Developer Services" },
];

const HERO = {
  badge: "Certified Salesforce Development Partner",
  title: "Salesforce Developer Services",
  description:
    "Build scalable, secure, and future-ready Salesforce solutions with certified Salesforce developers specializing in custom development, Lightning, Apex, integrations, automation, AI, and enterprise applications.",
  primaryCta: { label: "Hire Salesforce Developers", href: "#contact" },
  secondaryCta: { label: "Book a Discovery Call", href: "#contact" },
};

const HERO_DASHBOARD = {
  title: "Salesforce Development Sprint",
  stats: [
    { label: "Certified Developers", value: "150+", caption: "Platform Developer certified" },
    { label: "Avg. Test Coverage", value: "95%", caption: "Across delivered orgs" },
    { label: "Projects Delivered", value: "500+", caption: "Custom builds & integrations" },
  ],
  rows: [
    { title: "Apex Trigger Refactor", meta: "SaaS Co. — governor-limit fix", status: "Deployed", tone: "good" },
    { title: "LWC Order Dashboard", meta: "Manufacturing — Lightning UI", status: "In QA", tone: "neutral" },
    { title: "AppExchange Package Review", meta: "Fintech ISV — security review", status: "1st-pass", tone: "good" },
    { title: "SAP Integration Layer", meta: "Manufacturer — real-time sync", status: "Monitoring", tone: "attention" },
  ],
  floatingCards: [
    { icon: Ico.shield, title: "98%", subtitle: "Client Satisfaction" },
    { icon: Ico.award, title: "300+", subtitle: "Salesforce Certifications" },
  ],
};

const SERVICES = {
  eyebrow: "Salesforce Development Services",
  heading: "Salesforce Development Services",
  intro: "From a single Apex class to a full enterprise application, our certified developers handle every layer of Salesforce development.",
  illo: Images.illoCodeEditorApex,
  items: [
    { icon: Ico.code, title: "Salesforce Custom Development", description: "Purpose-built solutions that extend Salesforce beyond out-of-the-box configuration." },
    { icon: Ico.chip, title: "Lightning Web Components (LWC)", description: "Modern, performant UI components built on the Lightning Web Components framework.", illo: Images.illoLwcComponentTree },
    { icon: Ico.code, title: "Apex Development", description: "Apex classes, triggers, and batch jobs built to governor-limit and test-coverage standards." },
    { icon: Ico.document, title: "Visualforce Development", description: "Legacy Visualforce pages maintained, extended, or migrated to Lightning." },
    { icon: Ico.plug, title: "Salesforce API Development", description: "REST and SOAP APIs that expose Salesforce data securely to external systems." },
    { icon: Ico.cart, title: "AppExchange Development", description: "Managed and unmanaged packages built to AppExchange security review standards." },
    { icon: Ico.box, title: "Managed Packages", description: "Versioned, upgradable packages for multi-org and ISV distribution." },
    { icon: Ico.layers, title: "Custom Objects", description: "Data models designed around your actual business processes, not generic templates." },
    { icon: Ico.layers, title: "Custom Applications", description: "Full custom Lightning applications built for specific business functions." },
    { icon: Ico.gear2, title: "Flow Automation", description: "Flow Builder automation that replaces manual, error-prone processes.", illo: Images.illoFlowAutomationCanvas },
    { icon: Ico.refresh, title: "Salesforce DevOps", description: "CI/CD pipelines, version control, and release management for Salesforce orgs." },
    { icon: Ico.phone, title: "Salesforce Mobile Development", description: "Mobile-optimized Lightning experiences for field and remote teams." },
    { icon: Ico.sparkle, title: "Einstein AI Development", description: "Einstein-powered features trained on your own Salesforce data.", illo: Images.illoAiCodeAssistant },
    { icon: Ico.robot, title: "Agentforce Development", description: "Custom Agentforce actions and topics built for your specific workflows." },
    { icon: Ico.network, title: "Salesforce Integration Development", description: "Point-to-point and platform-level integrations with ERP, finance, and marketing systems." },
    { icon: Ico.box, title: "Legacy Modernization", description: "Classic-to-Lightning migrations and technical debt remediation." },
    { icon: Ico.compass, title: "Technical Architecture", description: "Scalable data models and integration architecture reviewed before a line of code is written." },
    { icon: Ico.eye, title: "Code Review", description: "Independent review of existing Apex, LWC, and configuration for risk and quality." },
    { icon: Ico.chartUp, title: "Performance Optimization", description: "Governor-limit, query, and page-load optimization for orgs under real production load." },
    { icon: Ico.users, title: "Developer Augmentation", description: "Certified Salesforce developers embedded directly into your existing team." },
  ],
};

const TECHNOLOGIES = {
  eyebrow: "Salesforce Technologies",
  heading: "Deep Expertise Across the Salesforce Technology Stack",
  intro: "We don't just know these technologies — we use them daily across production Salesforce orgs.",
  illo: Images.illoLwcComponentTree,
  items: ["Apex", "Lightning Web Components", "Visualforce", "SOQL", "SOSL", "Platform Events", "Flows", "Einstein AI", "Agentforce", "Data Cloud APIs", "REST API", "SOAP API", "MuleSoft", "Heroku", "Experience Cloud"],
};

const INDUSTRIES = {
  eyebrow: "Industries We Serve",
  heading: "Salesforce Development Expertise Across Every Industry",
  intro: "Development requirements differ sharply by industry — we bring relevant context to every engagement.",
  items: [
    { icon: Ico.heartbeat, title: "Healthcare" },
    { icon: Ico.cart, title: "Retail" },
    { icon: Ico.factory, title: "Manufacturing" },
    { icon: Ico.bank, title: "Finance" },
    { icon: Ico.shield, title: "Insurance" },
    { icon: Ico.graduation, title: "Education" },
    { icon: Ico.heart, title: "Nonprofit" },
    { icon: Ico.flask, title: "Life Sciences" },
    { icon: Ico.building, title: "Real Estate" },
    { icon: Ico.bolt2, title: "Energy" },
    { icon: Ico.chip, title: "Technology" },
    { icon: Ico.government, title: "Government" },
  ],
};

const DEV_CAPABILITIES = {
  eyebrow: "Development Capabilities",
  heading: "Every Development Discipline, Under One Team",
  intro: "We treat development as a full discipline — not just writing code, but designing, securing, testing, and supporting it long-term.",
  illo: Images.illoFlowAutomationCanvas,
  items: [
    { icon: Ico.chip, title: "Custom UI" },
    { icon: Ico.gear, title: "Business Logic" },
    { icon: Ico.gear2, title: "Workflow Automation" },
    { icon: Ico.plug, title: "API Integration" },
    { icon: Ico.network, title: "Third-party Integration" },
    { icon: Ico.compass, title: "Enterprise Architecture" },
    { icon: Ico.code, title: "Code Optimization" },
    { icon: Ico.chartUp, title: "Performance Tuning" },
    { icon: Ico.shield, title: "Security" },
    { icon: Ico.check, title: "Testing" },
    { icon: Ico.refresh, title: "Deployment" },
    { icon: Ico.headset, title: "Continuous Support" },
  ],
};

const INTEGRATIONS = {
  eyebrow: "Salesforce Integration Expertise",
  heading: "Salesforce, Connected to Every System You Run",
  intro: "Salesforce data is only as useful as the systems it reaches. We build integrations that are reliable, secure, and built to last.",
  illo: Images.illoApiIntegrationHub,
  items: [
    { icon: Ico.layers, title: "ERP" },
    { icon: Ico.layers, title: "SAP" },
    { icon: Ico.layers, title: "Oracle" },
    { icon: Ico.layers, title: "NetSuite" },
    { icon: Ico.network, title: "HubSpot" },
    { icon: Ico.chartUp, title: "QuickBooks" },
    { icon: Ico.bolt, title: "Stripe" },
    { icon: Ico.phone, title: "Twilio" },
    { icon: Ico.network, title: "Slack" },
    { icon: Ico.cloud, title: "Microsoft" },
    { icon: Ico.cloud, title: "Google Workspace" },
    { icon: Ico.cloud, title: "AWS" },
    { icon: Ico.cloud, title: "Azure" },
    { icon: Ico.code, title: "REST APIs" },
    { icon: Ico.code, title: "GraphQL" },
  ],
};

const PROCESS = {
  eyebrow: "Development Process",
  heading: "A Structured Path From Discovery to Go-Live",
  intro: "No surprises, no scope creep. Our development delivery framework has been refined across hundreds of Salesforce projects.",
  illo: Images.illoDevopsPipeline,
  steps: [
    { name: "Discovery", description: "We map your requirements, existing org, and technical constraints." },
    { name: "Technical Planning", description: "Scope, effort, and sprint plan defined before development begins." },
    { name: "Architecture", description: "Data model and integration architecture, fully documented." },
    { name: "Development", description: "Sprint-based development with regular demos and check-ins." },
    { name: "Testing", description: "Unit tests, regression testing, and code review before UAT." },
    { name: "UAT", description: "Structured user acceptance testing with clear sign-off criteria." },
    { name: "Deployment", description: "Managed deployment with rollback plans and change documentation." },
    { name: "Hypercare", description: "Focused post-launch support to catch issues early." },
    { name: "Continuous Improvement", description: "Ongoing optimization after the initial release." },
  ],
};

const WHY_MIRKETA = {
  eyebrow: "Why Mirketa",
  heading: "A Development Partner Built for Long-Term Salesforce Success",
  intro: "Hundreds of shops can write Apex. Fewer can architect it to still make sense two years later.",
  items: [
    { icon: Ico.award, title: "Certified Salesforce Developers", description: "Every developer holds active Salesforce Platform Developer certifications." },
    { icon: Ico.bolt, title: "Agile Development", description: "Two-week sprints with regular demos keep every engagement on schedule." },
    { icon: Ico.compass, title: "Enterprise Architecture", description: "Solutions designed to scale, not just to pass a demo." },
    { icon: Ico.sparkle, title: "AI Expertise", description: "Einstein AI and Agentforce development as a core practice, not an afterthought." },
    { icon: Ico.check, title: "Code Quality", description: "Test coverage, code review, and documentation standards enforced on every project." },
    { icon: Ico.shield, title: "Security Best Practices", description: "Security review built into every development engagement by default." },
    { icon: Ico.refresh, title: "DevOps Ready", description: "CI/CD pipelines and version control set up from day one, not bolted on later." },
    { icon: Ico.handshake, title: "Long-term Support", description: "98% client retention because our work continues past go-live." },
  ],
};

const SUCCESS_METRICS = [
  { value: "500+", label: "Projects Delivered" },
  { value: "150+", label: "Certified Developers" },
  { value: "15+", label: "Countries Served" },
  { value: "300+", label: "Salesforce Certifications" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "15+", label: "Years of Experience" },
];

const CASE_STUDIES = {
  eyebrow: "Case Studies",
  heading: "Real Salesforce Development Outcomes From Real Deployments",
  intro: "Anonymized results from recent Salesforce development engagements across industries.",
  cases: [
    {
      title: "SaaS Company Cuts Page Load Time by 68%",
      industry: "Technology",
      challenge: "A growing SaaS company's Salesforce org had accumulated years of technical debt, causing slow page loads and frequent governor-limit errors.",
      approach: "We audited the org, identified inefficient Apex and unoptimized queries, and rebuilt the highest-traffic Lightning pages.",
      solution: "Refactored Apex, optimized SOQL queries, and rebuilt three core Lightning pages with LWC.",
      outcome: "Sales reps now work in a fast, reliable org instead of fighting timeouts.",
      metrics: [{ value: "68%", label: "Faster Page Load" }, { value: "91%", label: "Fewer Governor Errors" }, { value: "34%", label: "Higher Rep Productivity" }],
    },
    {
      title: "Financial Services Firm Launches AppExchange Package in 12 Weeks",
      industry: "Financial Services",
      challenge: "A fintech ISV needed a security-review-ready managed package to list on AppExchange within a tight fundraising timeline.",
      approach: "We architected the package for multi-org scalability and built it to AppExchange security review standards from day one.",
      solution: "A fully managed package with automated test coverage and a clean upgrade path for future releases.",
      outcome: "The package passed AppExchange security review on the first submission.",
      metrics: [{ value: "12 weeks", label: "Idea to Listing" }, { value: "1st Pass", label: "Security Review" }, { value: "95%", label: "Test Coverage" }],
    },
    {
      title: "Manufacturer Integrates SAP With Salesforce in 8 Weeks",
      industry: "Manufacturing",
      challenge: "Order and inventory data lived in SAP with no real-time visibility inside Salesforce, forcing manual data entry.",
      approach: "We built a REST-based integration layer with error handling, retry logic, and real-time monitoring.",
      solution: "A bi-directional integration syncing orders, inventory, and pricing between SAP and Salesforce.",
      outcome: "Sales and operations teams now see the same order data in real time.",
      metrics: [{ value: "8 weeks", label: "Integration Delivered" }, { value: "99.6%", label: "Data Accuracy" }, { value: "22hrs/wk", label: "Manual Work Removed" }],
    },
  ],
};

const FAQS = [
  { q: "What does a Salesforce developer actually do?", a: "A Salesforce developer builds custom functionality on the Salesforce platform — Apex classes and triggers, Lightning Web Components, integrations, and automation — that goes beyond what standard configuration (clicks, not code) can achieve." },
  { q: "What is Apex development and when do we need it?", a: "Apex is Salesforce's proprietary programming language, used for business logic that's too complex for Flow Builder — multi-object transactions, complex validation, or integrations with external systems. We recommend Apex only when configuration genuinely can't meet the requirement." },
  { q: "What is Lightning development and how is it different from Classic?", a: "Lightning development uses the modern Salesforce UI framework (Lightning Web Components and Aura) to build faster, more responsive interfaces than the older Visualforce/Classic model. We build new work in Lightning by default and migrate legacy Classic pages when it makes business sense." },
  { q: "What are Lightning Web Components (LWC)?", a: "LWC is Salesforce's modern component framework, built on native web standards. It renders faster than Aura components and is the recommended approach for new custom UI development on the platform." },
  { q: "How is custom development different from standard configuration?", a: "Standard configuration (Flow Builder, page layouts, validation rules) covers most business requirements without code. Custom development is used specifically when a requirement exceeds what configuration can do — complex logic, custom UI, or integration with external systems." },
  { q: "What Salesforce integrations can your developers build?", a: "We build integrations with ERP systems (SAP, Oracle, NetSuite), finance tools (QuickBooks, Stripe), communication platforms (Twilio, Slack), and cloud infrastructure (AWS, Azure, Google Workspace) using REST APIs, SOAP APIs, and MuleSoft." },
  { q: "How much does Salesforce development cost?", a: "Pricing depends on scope, complexity, and timeline. Smaller Apex or LWC projects can start around $10,000–$25,000, while enterprise integrations or AppExchange packages typically range from $40,000 to $150,000+. We provide a fixed-scope estimate after a free discovery call." },
  { q: "How long does a typical Salesforce development project take?", a: "A focused feature or integration typically takes 6–10 weeks. Larger custom applications or AppExchange packages can take 3–6 months, depending on scope and testing requirements. We provide a detailed timeline after discovery." },
  { q: "Do you offer Salesforce managed services after development?", a: "Yes. Our managed services model gives you access to certified developers on a monthly retainer, covering bug fixes, new feature requests, and ongoing optimization — so your custom development doesn't become unmaintained technical debt." },
  { q: "What kind of support is included after a project goes live?", a: "Every development engagement includes a structured hypercare period immediately after go-live, plus documentation of everything built. Clients can transition into an ongoing managed services retainer for continued support." },
  { q: "Can your developers work inside our existing Salesforce org and team?", a: "Yes. Our developer augmentation model embeds certified Salesforce developers directly into your existing team and processes, working inside your org, your sprint cadence, and your tooling rather than as a separate, disconnected vendor." },
  { q: "Are your Salesforce developers certified?", a: "Yes. Every developer on our team holds active Salesforce Platform Developer certifications, and many hold additional certifications across Application Architect, Integration Architect, and AI Specialist tracks." },
];

const FINAL_CTA = {
  heading: "Need Expert Salesforce Developers?",
  description: "Accelerate Salesforce innovation with certified developers who build scalable, secure, and AI-ready Salesforce solutions.",
  primaryCta: { label: "Hire Developers", href: "#contact" },
  secondaryCta: { label: "Talk to an Expert", href: "#contact" },
};

const SEO = {
  title: "Salesforce Developer Services | Hire Certified Salesforce Developers | Mirketa",
  description:
    "Mirketa's certified Salesforce developers deliver custom development, Apex, Lightning Web Components, integrations, and AI-ready Salesforce applications.",
  canonical: "https://mirketa.us/salesforce-developer-services/",
  keywords: [
    "Salesforce Developer Services",
    "Salesforce Development Services",
    "Hire Salesforce Developers",
    "Salesforce Custom Development",
    "Apex Development",
    "Lightning Web Components",
    "Salesforce API Development",
    "Salesforce Integration",
    "Salesforce Development Company",
    "Salesforce Development Partner",
    "Salesforce Managed Services",
    "Salesforce App Development",
  ],
  schema: [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "Salesforce Developer Services",
      provider: { "@type": "Organization", name: "Mirketa Inc.", url: "https://mirketa.us" },
      name: "Salesforce Developer Services",
      description:
        "Custom Salesforce development, Apex, Lightning Web Components, integrations, DevOps, AI development, and developer augmentation services.",
      areaServed: "Global",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://mirketa.us/" },
        { "@type": "ListItem", position: 2, name: "Platforms & Technology", item: "https://mirketa.us/salesforce-consulting-development-services" },
        { "@type": "ListItem", position: 3, name: "Salesforce Developer Services", item: "https://mirketa.us/salesforce-developer-services/" },
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
// ANIMATED COUNTER
// ============================================================

function AnimatedCounter({ value, label }) {
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
          const duration = 1400;
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
    <div className="sds-metric-stat" ref={ref}>
      <strong>{display}</strong>
      <span>{label}</span>
    </div>
  );
}

// ============================================================
// MAIN COMPONENT
// ============================================================

export default function DeveloperServices() {
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

      gsap.utils.toArray(".sds-reveal").forEach((el) => {
        gsap.from(el, {
          opacity: prefersReduced ? 1 : 0,
          y: prefersReduced ? 0 : 32,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      gsap.utils.toArray(".sds-reveal-stagger").forEach((el) => {
        gsap.from(el.children, {
          opacity: prefersReduced ? 1 : 0,
          y: prefersReduced ? 0 : 26,
          duration: 0.6,
          stagger: 0.05,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      gsap.utils.toArray(".sds-zoom-in").forEach((el) => {
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
    <div className="salesforce-developer-services">
      <Seo {...SEO} />
      <HeroSection heroTextRef={heroTextRef} heroRef={heroRef} />
      <TrustedBySection />
      <ServicesSection />
      <TechnologiesSection />
      <IndustriesSection />
      <DevCapabilitiesSection />
      <IntegrationsSection />
      <ProcessSection />
      <WhyMirketaSection />
      <SuccessMetricsSection />
      <CaseStudiesSection />
      <FaqSection />
      <FinalCtaSection />
      <ConsultationSection
        eyebrow="Get Started"
        heading="Talk to a Salesforce Development Expert"
        description="Tell us about your custom development needs, Apex or LWC challenges, technical debt, or integration requirements — a Salesforce development expert will follow up within one business day."
        formTitle="Talk to a Salesforce Development Expert"
      />
      <StickyCta visible={showStickyCta} />
    </div>
  );
}

// ============================================================
// STICKY CTA — desktop only, appears once the hero scrolls out of view
// ============================================================

function StickyCta({ visible }) {
  return (
    <div className={`sds-sticky-cta ${visible ? "is-visible" : ""}`} aria-hidden={!visible}>
      <a href="#contact" className="btn btn-primary sds-btn" tabIndex={visible ? 0 : -1}>
        Hire Salesforce Developers <span aria-hidden="true">→</span>
      </a>
    </div>
  );
}

// ============================================================
// HERO
// ============================================================

function HeroSection({ heroTextRef, heroRef }) {
  return (
    <section ref={heroRef} className="sds-hero" style={{ backgroundImage: `url("${Images.heroSalesforceDeveloperServices}")` }} aria-label="Salesforce Developer Services by Mirketa">
      <div className="sds-hero__scrim" />
      <div className="container">
        <Breadcrumb items={BREADCRUMB} className="sds-breadcrumb" />
        <div className="sds-hero__inner">
          <div ref={heroTextRef} className="sds-hero__text">
            <span className="sds-badge">
              <span aria-hidden="true">✦</span> {HERO.badge}
            </span>
            <h1>{HERO.title}</h1>
            <p className="sds-hero__description">{HERO.description}</p>
            <div className="sds-hero__ctas">
              <a href={HERO.primaryCta.href} className="btn btn-primary sds-btn">
                {HERO.primaryCta.label} <span aria-hidden="true">→</span>
              </a>
              <a href={HERO.secondaryCta.href} className="btn btn-secondary sds-btn">
                {HERO.secondaryCta.label}
              </a>
            </div>
          </div>

          <HeroVisual
            dashboardTitle={HERO_DASHBOARD.title}
            stats={HERO_DASHBOARD.stats}
            rows={HERO_DASHBOARD.rows}
            floatingCards={HERO_DASHBOARD.floatingCards}
            className="sds-hero__visual"
          />
        </div>
      </div>
    </section>
  );
}

// ============================================================
// TRUSTED BY
// ============================================================

function TrustedBySection() {
  const badges = [
    { icon: Images.clientSalesforce, label: "Salesforce Partner" },
    { icon: Images.clientSoc2, label: "SOC 2 Certified" },
    { icon: Images.clientHipaa, label: "HIPAA Ready" },
    { icon: Images.clientEnterprise, label: "Enterprise Ready" },
    { icon: Images.clientExperience, label: "15+ Years Experience" },
  ];
  const loop = [...badges, ...badges];

  return (
    <section className="sds-trusted" aria-label="Trusted by enterprises">
      <div className="container sds-trusted__inner">
        <p className="sds-trusted__label">Trusted By</p>
        <div className="sds-trusted__track" role="list">
          <div className="sds-trusted__marquee">
            {loop.map((b, i) => (
              <div className="sds-trusted__badge" role="listitem" key={`${b.label}-${i}`}>
                <img src={b.icon} alt="" aria-hidden="true" />
                <span>{b.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// SALESFORCE DEVELOPMENT SERVICES
// ============================================================

function ServicesSection() {
  return (
    <section className="section sds-services" id="services" aria-labelledby="sds-services-heading">
      <div className="container">
        <div className="sds-services__head sds-reveal">
          <div className="section-heading">
            <p className="sds-eyebrow">{SERVICES.eyebrow}</p>
            <h2 id="sds-services-heading">{SERVICES.heading}</h2>
            <p>{SERVICES.intro}</p>
          </div>
        </div>
        <div className="sds-services__grid sds-reveal-stagger">
          {SERVICES.items.map((s) => (
            <div className={`sds-service-card ${s.illo ? "sds-service-card--illo" : ""}`} key={s.title}>
              {s.illo ? (
                <img src={s.illo} alt="" aria-hidden="true" className="sds-service-card__illo" loading="lazy" />
              ) : (
                <span className="sds-service-card__icon">{s.icon}</span>
              )}
              <h3>{s.title}</h3>
              <p>{s.description}</p>
            </div>
          ))}
        </div>
        <div className="sds-section-cta sds-reveal">
          <a href="#contact" className="btn btn-primary sds-btn">
            Hire Salesforce Developers <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// SALESFORCE TECHNOLOGIES
// ============================================================

function TechnologiesSection() {
  return (
    <section className="section sds-technologies" aria-labelledby="sds-technologies-heading">
      <div className="container">
        <div className="sds-technologies__head sds-reveal">
          <div className="section-heading">
            <p className="sds-eyebrow">{TECHNOLOGIES.eyebrow}</p>
            <h2 id="sds-technologies-heading">{TECHNOLOGIES.heading}</h2>
            <p>{TECHNOLOGIES.intro}</p>
          </div>
        </div>
        <ul className="sds-technologies__wall sds-reveal-stagger">
          {TECHNOLOGIES.items.map((t) => (
            <li key={t}>{t}</li>
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
    <section className="section sds-industries" aria-labelledby="sds-industries-heading">
      <div className="container">
        <div className="section-heading sds-reveal">
          <p className="sds-eyebrow">{INDUSTRIES.eyebrow}</p>
          <h2 id="sds-industries-heading">{INDUSTRIES.heading}</h2>
          <p>{INDUSTRIES.intro}</p>
        </div>
        <div className="sds-industries__grid sds-reveal-stagger">
          {INDUSTRIES.items.map((i) => (
            <div className="sds-industry-card" key={i.title}>
              <span className="sds-industry-card__icon">{i.icon}</span>
              <h3>{i.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// DEVELOPMENT CAPABILITIES
// ============================================================

function DevCapabilitiesSection() {
  return (
    <section className="section sds-capabilities" aria-labelledby="sds-capabilities-heading">
      <div className="container">
        <div className="sds-capabilities__head sds-reveal">
          <div className="section-heading">
            <p className="sds-eyebrow">{DEV_CAPABILITIES.eyebrow}</p>
            <h2 id="sds-capabilities-heading">{DEV_CAPABILITIES.heading}</h2>
            <p>{DEV_CAPABILITIES.intro}</p>
          </div>
        </div>
        <div className="sds-capabilities__grid sds-reveal-stagger">
          {DEV_CAPABILITIES.items.map((c) => (
            <div className="sds-capability-card" key={c.title}>
              <span className="sds-capability-card__icon">{c.icon}</span>
              <h3>{c.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// SALESFORCE INTEGRATION EXPERTISE
// ============================================================

function IntegrationsSection() {
  return (
    <section className="section sds-integrations" id="integrations" aria-labelledby="sds-integrations-heading">
      <div className="container">
        <div className="sds-integrations__head sds-reveal">
          <div className="section-heading">
            <p className="sds-eyebrow">{INTEGRATIONS.eyebrow}</p>
            <h2 id="sds-integrations-heading">{INTEGRATIONS.heading}</h2>
            <p>{INTEGRATIONS.intro}</p>
          </div>
        </div>
        <div className="sds-integrations__grid sds-reveal-stagger">
          {INTEGRATIONS.items.map((i) => (
            <div className="sds-integration-card" key={i.title}>
              <span className="sds-integration-card__icon">{i.icon}</span>
              <h3>{i.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// DEVELOPMENT PROCESS
// ============================================================

function ProcessSection() {
  return (
    <section className="section sds-process" aria-labelledby="sds-process-heading">
      <div className="container">
        <div className="sds-process__head sds-reveal">
          <div className="section-heading">
            <p className="sds-eyebrow">{PROCESS.eyebrow}</p>
            <h2 id="sds-process-heading">{PROCESS.heading}</h2>
            <p>{PROCESS.intro}</p>
          </div>
        </div>
        <div className="sds-process__rail sds-reveal-stagger">
          {PROCESS.steps.map((p, i) => (
            <div className="sds-step-card" key={p.name}>
              <span className="sds-step-card__num">{String(i + 1).padStart(2, "0")}</span>
              <h3>{p.name}</h3>
              <p>{p.description}</p>
              {i < PROCESS.steps.length - 1 && <span className="sds-step-card__arrow" aria-hidden="true">→</span>}
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
    <section className="section sds-why" aria-labelledby="sds-why-heading">
      <div className="container">
        <div className="section-heading sds-reveal">
          <p className="sds-eyebrow">{WHY_MIRKETA.eyebrow}</p>
          <h2 id="sds-why-heading">{WHY_MIRKETA.heading}</h2>
          <p>{WHY_MIRKETA.intro}</p>
        </div>
        <div className="sds-why__grid sds-reveal-stagger">
          {WHY_MIRKETA.items.map((w) => (
            <div className="sds-why-card" key={w.title}>
              <span className="sds-why-card__icon">{w.icon}</span>
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
// SUCCESS METRICS
// ============================================================

function SuccessMetricsSection() {
  return (
    <section className="sds-metrics" aria-label="Mirketa Salesforce development success metrics">
      <div className="container">
        <div className="sds-metrics__grid sds-reveal-stagger">
          {SUCCESS_METRICS.map((m) => (
            <AnimatedCounter key={m.label} value={m.value} label={m.label} />
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
    <section className="section sds-cases" aria-labelledby="sds-cases-heading">
      <div className="container">
        <div className="section-heading sds-reveal">
          <p className="sds-eyebrow">{CASE_STUDIES.eyebrow}</p>
          <h2 id="sds-cases-heading">{CASE_STUDIES.heading}</h2>
          <p>{CASE_STUDIES.intro}</p>
        </div>
        <div className="sds-cases__grid sds-reveal-stagger">
          {CASE_STUDIES.cases.map((c) => (
            <div className="sds-case-card" key={c.title}>
              <span className="sds-case-card__tag">{c.industry}</span>
              <h3>{c.title}</h3>
              <dl className="sds-case-card__fields">
                <div><dt>Customer Challenge</dt><dd>{c.challenge}</dd></div>
                <div><dt>Development Approach</dt><dd>{c.approach}</dd></div>
                <div><dt>Solution Delivered</dt><dd>{c.solution}</dd></div>
                <div><dt>Business Outcome</dt><dd>{c.outcome}</dd></div>
              </dl>
              <div className="sds-case-card__metrics">
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
// FAQ
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
    <section className="section sds-faq" aria-labelledby="sds-faq-heading">
      <div className="container">
        <div className="section-heading sds-reveal">
          <p className="sds-eyebrow">FAQ</p>
          <h2 id="sds-faq-heading">Frequently Asked Questions About Salesforce Developer Services</h2>
        </div>
        <div className="sds-faq__search-wrap sds-reveal">
          <label htmlFor="sds-faq-search" className="visually-hidden">
            Search frequently asked questions
          </label>
          <input
            id="sds-faq-search"
            type="search"
            className="sds-faq__search"
            placeholder="Ask a question — e.g. &quot;Apex&quot;, &quot;pricing&quot;, &quot;LWC&quot;..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpenIndex(-1);
            }}
          />
        </div>
        <div className="sds-faq__list sds-reveal">
          {filtered.length === 0 ? (
            <p className="sds-faq__empty">No questions match &ldquo;{query}&rdquo;. Try a different search term.</p>
          ) : (
            filtered.map((item, i) => {
              const open = openIndex === i;
              const panelId = `sds-faq-panel-${i}`;
              return (
                <div className={`sds-faq-item ${open ? "is-open" : ""}`} key={item.q}>
                  <button type="button" className="sds-faq-item__question" aria-expanded={open} aria-controls={panelId} onClick={() => setOpenIndex(open ? -1 : i)}>
                    <span>{item.q}</span>
                    <span className="sds-faq-item__icon" aria-hidden="true">{open ? "−" : "+"}</span>
                  </button>
                  <div id={panelId} className="sds-faq-item__answer" role="region" hidden={!open}>
                    <p>{item.a}</p>
                  </div>
                </div>
              );
            })
          )}
        </div>
        <p className="sds-faq__links">
          Related reading: <Link to="/salesforce-consulting-development-services">Salesforce Consulting & Development Services</Link>,{" "}
          <Link to="/salesforce-ai-services">Salesforce AI Services</Link>, <Link to="/salesforce">Salesforce Clouds</Link>,{" "}
          <Link to="/agentforce">Agentforce</Link>, <Link to="/data-cloud">Data Cloud</Link>, <Link to="/ai-consulting">AI Consulting</Link>,{" "}
          <Link to="/ai-accelerator-aria">AI Accelerator Aria</Link>, <Link to="/salesforce-ai-case-management">Salesforce Case Management</Link>,{" "}
          <a href="#integrations">Salesforce Integration Services</a>.
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
    <section className="sds-final-cta sds-reveal" aria-labelledby="sds-final-cta-heading">
      <div className="container sds-final-cta__inner">
        <h2 id="sds-final-cta-heading">{FINAL_CTA.heading}</h2>
        <p>{FINAL_CTA.description}</p>
        <div className="sds-final-cta__ctas">
          <a href={FINAL_CTA.primaryCta.href} className="btn btn-primary sds-btn">
            {FINAL_CTA.primaryCta.label} <span aria-hidden="true">→</span>
          </a>
          <a href={FINAL_CTA.secondaryCta.href} className="btn btn-secondary sds-btn">
            {FINAL_CTA.secondaryCta.label}
          </a>
        </div>
        <Link to="/salesforce-consulting-development-services" className="sds-final-cta__all-services">
          Explore All Salesforce Services →
        </Link>
      </div>
    </section>
  );
}
