import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Images } from "../../../assets/images/index.js";
import Seo from "../../../components/Seo/Seo.jsx";
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb.jsx";
import HeroVisual from "../../../components/HeroVisual/HeroVisual.jsx";
import ConsultationSection from "../../../components/ConsultationSection/ConsultationSection.jsx";
import "./SalesCloud.css";

gsap.registerPlugin(ScrollTrigger);

// ============================================================
// ICONS — small inline SVGs for component-local iconography
// ============================================================

const Ico = {
  funnel: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 4h16l-6 9v6l-4 2v-8L4 4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></svg>
  ),
  robot: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="5" y="9" width="14" height="10" rx="3" stroke="currentColor" strokeWidth="1.5" /><path d="M12 5v4M9 14h.01M15 14h.01" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /><circle cx="12" cy="4" r="1.4" fill="currentColor" /></svg>
  ),
  eye: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.4" /></svg>
  ),
  chartUp: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 19V13M10 19V8M16 19v-5M20 19V5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
  ),
  users: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="9" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.4" /><path d="M3.5 19c.6-3.4 2.9-5.2 5.5-5.2s4.9 1.8 5.5 5.2" stroke="currentColor" strokeWidth="1.4" /><circle cx="17" cy="9" r="2.6" stroke="currentColor" strokeWidth="1.3" opacity="0.7" /><path d="M15.5 13.4c2.2.3 3.7 1.9 4 4.6" stroke="currentColor" strokeWidth="1.3" opacity="0.7" /></svg>
  ),
  phone: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="6" y="2" width="12" height="20" rx="3" stroke="currentColor" strokeWidth="1.5" /><path d="M10 19h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
  ),
  compass: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" /><path d="M15 9l-2 6-6 2 2-6 6-2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  rocket: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 2c3 2 5 6 5 10 0 3-1 6-5 10-4-4-5-7-5-10 0-4 2-8 5-10z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><circle cx="12" cy="10" r="1.6" fill="currentColor" /></svg>
  ),
  code: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 6L4 12l5 6M15 6l5 6-5 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  sliders: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 6h10M18 6h2M4 12h2M10 12h10M4 18h14M20 18h0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><circle cx="16" cy="6" r="2" fill="currentColor" /><circle cx="6" cy="12" r="2" fill="currentColor" /><circle cx="18" cy="18" r="2" fill="currentColor" /></svg>
  ),
  plug: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 3v5M15 3v5M7 8h10v4a5 5 0 01-10 0V8z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="M12 17v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
  ),
  swap: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 7h13l-3-3M20 17H7l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  gauge: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 16a8 8 0 1116 0" stroke="currentColor" strokeWidth="1.5" /><path d="M12 16l4.5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /><circle cx="12" cy="16" r="1.3" fill="currentColor" /></svg>
  ),
  headset: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 13a8 8 0 0116 0v4" stroke="currentColor" strokeWidth="1.5" /><rect x="3" y="13" width="4" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4" /><rect x="17" y="13" width="4" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4" /></svg>
  ),
  target: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.4" /><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.3" opacity="0.6" /><circle cx="12" cy="12" r="1.2" fill="currentColor" /></svg>
  ),
  card: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" /><path d="M3 9h18" stroke="currentColor" strokeWidth="1.4" /></svg>
  ),
  building: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 21V9l8-5 8 5v12H4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="M9 21v-6h6v6" stroke="currentColor" strokeWidth="1.4" /></svg>
  ),
  mail: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" /><path d="M4 6.5l8 6 8-6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
  ),
  layers: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3l9 5-9 5-9-5 9-5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M3 12l9 5 9-5M3 16l9 5 9-5" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /></svg>
  ),
  check: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12.5l5 5L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  sparkle: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /></svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 2l8 4v6c0 5-4 8-8 10-4-2-8-5-8-10V6l8-4z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M8.5 12l2 2 5-5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
};

// ============================================================
// DATA
// ============================================================

const BREADCRUMB = [
  { label: "Home", href: "/" },
  { label: "Platforms & Technology", href: "/salesforce" },
  { label: "Salesforce Clouds", href: "/salesforce" },
  { label: "Sales Cloud" },
];

const HERO = {
  badge: "Salesforce Sales Cloud Experts",
  title: "Accelerate Revenue Growth with Salesforce Sales Cloud Consulting & Development",
  description:
    "Mirketa helps enterprise sales organizations implement, customize, integrate, optimize, and manage Salesforce Sales Cloud so revenue teams can sell with clarity instead of guesswork. From pipeline visibility and workflow automation to AI-powered forecasting, we turn Sales Cloud into a system reps actually use — and leadership can actually trust.",
  primaryCta: { label: "Schedule Free Consultation", href: "#contact" },
  secondaryCta: { label: "Talk to Sales Cloud Experts", href: "#contact" },
  trustBadges: ["Salesforce Certified Consultants", "AI Powered CRM", "Global Delivery", "15+ Years Experience"],
};

const HERO_DASHBOARD = {
  title: "Sales Cloud Pipeline",
  stats: [
    { label: "Higher Win Rates", value: "41%", caption: "With AI-ranked lead scoring" },
    { label: "Faster Sales Cycles", value: "29%", caption: "End-to-end pipeline speed" },
    { label: "Forecast Accuracy", value: "99.6%", caption: "AI-adjusted projections" },
  ],
  rows: [
    { title: "Acme Corp — Enterprise Deal", meta: "Stage: Negotiation • $240K", status: "On Track", tone: "good" },
    { title: "Globex Renewal", meta: "Stage: Proposal • At risk", status: "Needs Attention", tone: "attention" },
    { title: "Lead: Initech Inc.", meta: "AI Score: 92 • Hot", status: "Qualified", tone: "good" },
    { title: "Q3 Forecast Rollup", meta: "AI-adjusted vs. commit", status: "Synced", tone: "neutral" },
  ],
  floatingCards: [
    { icon: Ico.robot, title: "Agentforce", subtitle: "Qualifying leads 24/7" },
    { icon: Ico.sparkle, title: "Einstein AI", subtitle: "Next-best-action live" },
  ],
};

const WHY_SALES_CLOUD = {
  eyebrow: "Why Salesforce Sales Cloud",
  heading: "The Revenue Platform Your Sales Team Has Been Missing",
  intro:
    "Sales Cloud is more than a contact database — configured correctly, it becomes the operating system for your entire revenue engine. Here's what a properly architected Sales Cloud implementation delivers.",
  items: [
    { illo: Images.illoWorkflowAutomation, title: "Complete Sales Automation", description: "Lead routing, approval processes, and follow-up sequences that run themselves, so reps spend time selling instead of updating records." },
    { illo: Images.illoAiSalesAssistant, title: "AI Powered Selling", description: "Einstein and Agentforce surface next-best actions, flag at-risk deals, and draft outreach so every rep sells like your best rep." },
    { illo: Images.illoSalesPipeline, title: "Pipeline Visibility", description: "Real-time pipeline views by stage, owner, and territory replace spreadsheet exports and end-of-week guesswork." },
    { illo: Images.illoForecastDashboard, title: "Revenue Forecasting", description: "Rollup forecasting with AI-adjusted projections gives leadership a number they can defend to the board." },
    { illo: Images.illoAccountContactManagement, title: "Customer Intelligence", description: "Unified account, contact, and activity history means every conversation starts with full context, not a cold open." },
    { illo: Images.illoMobileSales, title: "Mobile CRM", description: "Full CRM functionality in the field — log calls, update opportunities, and check dashboards from any device." },
  ],
};

const CONSULTING_SERVICES = {
  eyebrow: "Sales Cloud Consulting Services",
  heading: "End-to-End Salesforce Sales Cloud Services",
  intro: "Whether you're deploying Sales Cloud for the first time or rescuing a stalled rollout, our certified consultants handle every phase of the engagement.",
  illo: Images.illoEnterpriseSalesTeam,
  items: [
    { icon: Ico.compass, title: "Sales Cloud Consulting", description: "Strategic assessment of your sales process, data model, and license usage before a single configuration change is made.", capabilities: ["Sales process mapping", "Org health audit", "Roadmap & ROI modeling"] },
    { icon: Ico.rocket, title: "Sales Cloud Implementation", description: "Full lifecycle deployment — discovery, design, build, test, and go-live — configured around how your reps actually sell.", capabilities: ["Data migration & cleansing", "Role & territory design", "Go-live hypercare"] },
    { icon: Ico.code, title: "Sales Cloud Development", description: "Apex, Lightning Web Components, and custom APIs for requirements standard configuration can't reach.", capabilities: ["Apex & LWC development", "Custom objects & triggers", "REST/SOAP API development"] },
    { icon: Ico.sliders, title: "Sales Cloud Customization", description: "Page layouts, record types, validation rules, and Flow automation tailored to your exact sales motion.", capabilities: ["Custom page layouts", "Flow & validation rules", "Dynamic forecasting views"] },
    { icon: Ico.plug, title: "Sales Cloud Integration", description: "Connect Sales Cloud to ERP, marketing, finance, and quoting systems so data moves without manual re-entry.", capabilities: ["MuleSoft & REST APIs", "ERP & finance sync", "Marketing platform connectors"] },
    { icon: Ico.swap, title: "Sales Cloud Migration", description: "Move off legacy CRM or a broken Sales Cloud org without losing history, pipeline, or user trust.", capabilities: ["Legacy CRM migration", "Data deduplication", "Zero-downtime cutover planning"] },
    { icon: Ico.gauge, title: "Sales Cloud Optimization", description: "Org audits that find and fix the automation debt, unused fields, and adoption gaps slowing your team down.", capabilities: ["Performance & UX audit", "Automation cleanup", "Adoption diagnostics"] },
    { icon: Ico.headset, title: "Managed Services", description: "A dedicated team of certified admins and developers keeping your org healthy long after go-live.", capabilities: ["Dedicated admin support", "Release management", "Monthly health reporting"] },
  ],
};

const FEATURES = {
  eyebrow: "Sales Cloud Features",
  heading: "Every Sales Cloud Capability, Configured to Perform",
  intro: "We don't just turn features on — we configure each one around your sales motion, your data, and your reps' day-to-day workflow.",
  illo: Images.illoSalesCloudDashboard,
  items: [
    { title: "Lead Management", description: "Capture, score, and route leads automatically so hot prospects never sit in a queue.", illo: Images.illoLeadManagement },
    { title: "Opportunity Management", description: "Stage-based deal tracking with guided selling paths that keep every opportunity moving.", illo: Images.illoOpportunityManagement },
    { title: "Account Management", description: "A single, unified view of every account — hierarchy, history, and health in one place." },
    { title: "Contact Management", description: "Relationship mapping and activity timelines that keep every stakeholder visible." },
    { title: "Sales Forecasting", description: "Rollup and AI-adjusted forecasts your leadership team can actually rely on." },
    { title: "Sales Engagement", description: "Cadences, email templates, and call logging built directly into the rep workflow." },
    { title: "Reports & Dashboards", description: "Real-time, role-based dashboards that replace manual spreadsheet reporting." },
    { title: "AI Insights", description: "Einstein-powered signals that flag risk, opportunity, and next-best actions." },
    { title: "Workflow Automation", description: "Flow-driven approvals, assignments, and notifications with zero manual steps." },
    { title: "Email Integration", description: "Native Outlook and Gmail sync that logs every touchpoint automatically." },
    { title: "Mobile CRM", description: "Full functionality on any device, wherever your reps are working." },
    { title: "Approval Processes", description: "Automated discount, contract, and deal-desk approvals with full audit trails." },
  ],
};

const AI_SALES_CLOUD = {
  eyebrow: "AI Powered Sales Cloud",
  heading: "Sell Smarter With Agentforce and Einstein AI",
  intro: "AI in Sales Cloud isn't a bolt-on — configured correctly, it becomes the layer that tells reps exactly where to focus next.",
  illo: Images.illoAiSalesAssistant,
  items: [
    { icon: Ico.robot, title: "Agentforce Integration", description: "Autonomous AI agents that qualify leads, answer rep questions, and draft outreach around the clock." },
    { icon: Ico.sparkle, title: "Einstein AI", description: "Native Salesforce AI trained on your own CRM data — not a generic model bolted on after the fact." },
    { icon: Ico.chartUp, title: "Predictive Sales", description: "Deal-health scoring that flags at-risk opportunities before they fall out of the pipeline." },
    { icon: Ico.target, title: "Intelligent Lead Scoring", description: "AI-ranked leads so reps spend their time on the accounts most likely to close." },
    { icon: Ico.gauge, title: "AI Forecasting", description: "Forecast projections adjusted continuously against real pipeline signals, not last quarter's guesswork." },
    { icon: Ico.eye, title: "Automated Recommendations", description: "Next-best-action guidance surfaced directly on the opportunity record, in context." },
  ],
};

const INTEGRATIONS = {
  eyebrow: "Integration Capabilities",
  heading: "Sales Cloud, Connected to Every System That Matters",
  intro: "Pipeline data is only as useful as the systems it reaches. We connect Sales Cloud to the platforms your finance, marketing, and operations teams already rely on.",
  illo: Images.illoCrmIntegrations,
  platforms: ["ERP Systems", "NetSuite", "Oracle", "SAP", "MuleSoft", "Boomi", "REST APIs", "Marketing Platforms", "Finance Systems"],
};

const INDUSTRIES = {
  eyebrow: "Industries We Serve",
  heading: "Sales Cloud Expertise Across Every Vertical",
  intro: "Generic CRM configurations don't survive contact with industry-specific sales cycles. We bring vertical context to every Sales Cloud engagement.",
  items: [
    { icon: Images.iconIndustryHealthcare, title: "Healthcare" },
    { icon: Images.iconIndustryManufacturing, title: "Manufacturing" },
    { icon: Images.iconIndustryFinancialServices, title: "Financial Services" },
    { icon: Images.iconIndustryPrivateEquity, title: "Private Equity" },
    { icon: Images.iconIndustryEcommerce, title: "Retail" },
    { icon: Images.iconIndustryWholesale, title: "Wholesale" },
    { icon: Images.iconIndustryEducation, title: "Education" },
    { icon: Images.iconIndustryNonprofits, title: "Nonprofit" },
    { icon: Images.iconIndustryHitech, title: "Hi-Tech" },
  ],
};

const PROCESS = {
  eyebrow: "Implementation Process",
  heading: "A Structured Path From Kickoff to Full Adoption",
  intro: "No surprises, no scope creep. Our Sales Cloud delivery framework has been refined across 300+ implementations.",
  illo: Images.illoWorkflowAutomation,
  steps: [
    { name: "Discovery", description: "We map your current sales process, systems, and pain points." },
    { name: "Sales Assessment", description: "A structured audit of pipeline, forecasting, and rep workflow gaps." },
    { name: "Solution Design", description: "Data model, automation, and integration architecture, fully documented." },
    { name: "Configuration", description: "Core Sales Cloud setup — objects, layouts, roles, and territories." },
    { name: "Custom Development", description: "Apex, LWC, and API work for requirements beyond configuration." },
    { name: "Integration", description: "Connecting Sales Cloud to ERP, marketing, and finance systems." },
    { name: "Testing", description: "UAT, regression testing, and security review before go-live." },
    { name: "Deployment", description: "Go-live support with a structured cutover plan." },
    { name: "User Training", description: "Role-based training so adoption starts on day one." },
    { name: "Continuous Support", description: "Hypercare and ongoing optimization after launch." },
  ],
};

const BENEFITS = {
  eyebrow: "Benefits of Sales Cloud",
  heading: "What a Properly Configured Sales Cloud Delivers",
  intro: "These are the outcomes our clients report after their Sales Cloud engagement — not vanity metrics.",
  illo: Images.illoRevenueGrowth,
  stats: [
    { value: "38%", label: "Increase in Sales Productivity" },
    { value: "29%", label: "Faster Sales Cycles" },
    { value: "41%", label: "Higher Win Rates" },
    { value: "3.1×", label: "Better Forecast Accuracy" },
    { value: "52%", label: "Improved Customer Relationships" },
    { value: "34%", label: "Increased Revenue" },
  ],
};

const CASE_STUDIES = {
  eyebrow: "Customer Success Stories",
  heading: "Real Sales Cloud Outcomes From Real Deployments",
  intro: "Anonymized results from recent Sales Cloud engagements across industries.",
  illo: Images.illoCustomerJourney,
  cases: [
    {
      title: "Mid-Market Manufacturer Cuts Sales Cycle by 29%",
      industry: "Manufacturing",
      body: "A distributed sales team was tracking deals across spreadsheets and a legacy CRM with no forecasting discipline. We implemented Sales Cloud with guided opportunity stages and Einstein forecasting, giving leadership a real-time view of the pipeline for the first time.",
      metrics: [{ value: "29%", label: "Faster Sales Cycle" }, { value: "2.1×", label: "Pipeline Growth" }, { value: "41%", label: "Higher Win Rate" }],
    },
    {
      title: "Financial Services Firm Unifies 5 Regional Teams",
      industry: "Financial Services",
      body: "Five regional sales teams were operating on inconsistent processes and disconnected reporting. Our team standardized territory management and rollup forecasting in Sales Cloud, giving executives one accurate revenue number across every region.",
      metrics: [{ value: "5→1", label: "Unified Sales Process" }, { value: "34%", label: "Revenue Growth" }, { value: "99.6%", label: "Forecast Accuracy" }],
    },
    {
      title: "B2B Technology Company Scales Without Adding Headcount",
      industry: "Hi-Tech",
      body: "A fast-growing SaaS company needed to triple pipeline coverage without tripling the sales team. We deployed Agentforce-powered lead scoring and automated sequencing, letting reps focus only on the highest-intent accounts.",
      metrics: [{ value: "3×", label: "Pipeline Coverage" }, { value: "38%", label: "Productivity Gain" }, { value: "4.7★", label: "Rep Satisfaction" }],
    },
  ],
};

const TECH_STACK = {
  eyebrow: "Technology Stack",
  heading: "Built on the Platforms Enterprises Already Trust",
  items: ["Salesforce", "Sales Cloud", "Agentforce", "Data Cloud", "MuleSoft", "Boomi", "AWS", "Azure", "REST APIs", "GraphQL"],
};

const FAQS = [
  { q: "What is Salesforce Sales Cloud and how does it help sales teams?", a: "Salesforce Sales Cloud is a cloud-based CRM built specifically for revenue teams — it manages leads, opportunities, accounts, and forecasting in one connected platform. Configured properly, it gives sales leaders real-time pipeline visibility and gives reps a single system for every account interaction, replacing spreadsheets and disconnected tools." },
  { q: "What does Salesforce Sales Cloud consulting include?", a: "Our Sales Cloud consulting starts with a discovery phase that maps your existing sales process, data model, and license usage. From there we deliver a prioritized roadmap covering implementation, customization, automation, and integration — so every recommendation is tied to a specific business outcome, not a generic feature checklist." },
  { q: "How long does a Sales Cloud implementation take?", a: "A focused Sales Cloud implementation for a single sales team typically takes 6–10 weeks. Multi-region or multi-team rollouts with custom integrations can take 3–5 months. We provide a detailed timeline with milestones during discovery, before any implementation work begins." },
  { q: "Can Sales Cloud be customized for our specific sales process?", a: "Yes. Sales Cloud is designed to be configured around your sales motion rather than forcing your team into a generic template. We customize page layouts, opportunity stages, validation rules, approval processes, and Flow automation to match how your reps actually sell." },
  { q: "How much does Salesforce Sales Cloud consulting cost?", a: "Pricing depends on scope, team size, and integration complexity. Most Sales Cloud implementations range from $20,000 to $120,000 depending on customization and integration needs. We provide a detailed, fixed-scope proposal after a free discovery consultation — no hidden fees." },
  { q: "Can you migrate our existing CRM data into Sales Cloud?", a: "Yes. We handle full data migration from legacy CRMs and prior Salesforce orgs, including deduplication, field mapping, and historical activity preservation. Our migration process is designed to minimize downtime and protect data integrity through a structured cutover plan." },
  { q: "What AI capabilities are available in Sales Cloud?", a: "Sales Cloud includes Einstein AI for lead scoring, opportunity insights, and forecast adjustments, alongside Agentforce for autonomous AI agents that can qualify leads and draft outreach. We configure these capabilities against your own CRM data rather than relying on generic, out-of-the-box models." },
  { q: "How does sales process automation work in Sales Cloud?", a: "Automation in Sales Cloud is built with Flow Builder — covering lead routing, approval processes, task creation, and notification rules. We design automation around your actual sales stages so reps are guided through the process automatically instead of relying on manual follow-up." },
  { q: "How is Sales Cloud different from other Salesforce clouds?", a: "Sales Cloud is purpose-built for sales pipeline management, forecasting, and revenue operations, while Service Cloud focuses on customer support and Marketing Cloud on campaign execution. Many enterprises run Sales Cloud alongside other clouds — we architect the data model so information flows cleanly between them." },
  { q: "What systems can Sales Cloud integrate with?", a: "We integrate Sales Cloud with ERP systems (SAP, Oracle, NetSuite), marketing automation platforms, finance and billing systems, and custom applications using MuleSoft or REST APIs. Every integration is built with error handling and monitoring so data stays reliable at enterprise scale." },
  { q: "Do you offer ongoing managed services after go-live?", a: "Yes. Our managed services model gives you access to certified Sales Cloud admins and developers on a monthly retainer, covering configuration changes, release management, and proactive optimization — so your org keeps improving long after the initial rollout." },
  { q: "What kind of support is included after implementation?", a: "Every implementation includes a structured hypercare period immediately following go-live, plus role-based user training and documentation. Clients can transition into an ongoing managed services retainer for continued support, optimization, and admin coverage." },
  { q: "How secure is data inside Salesforce Sales Cloud?", a: "Sales Cloud runs on Salesforce's enterprise-grade infrastructure with field-level security, role-based access, and audit trails built in. We layer on org-specific security reviews, permission set design, and data governance policies aligned to your compliance requirements." },
  { q: "What are best practices for Sales Cloud adoption?", a: "Strong adoption starts with configuring Sales Cloud around existing rep workflows rather than adding friction, pairing go-live with role-based training, and using dashboards reps actually check daily. We build adoption tracking into every implementation so gaps get caught early, not after quarter-end." },
  { q: "What Salesforce development services do you offer for Sales Cloud?", a: "We provide custom Apex development, Lightning Web Components, REST and SOAP API development, and AppExchange-ready builds for requirements that go beyond standard configuration — all built to Salesforce governor-limit and security-review standards." },
];

const FINAL_CTA = {
  heading: "Ready to Maximize Your Sales Performance with Salesforce Sales Cloud?",
  description: "Join 300+ sales organizations that trust Mirketa to turn Salesforce Sales Cloud into a real revenue advantage — not just another CRM license.",
  primaryCta: { label: "Schedule Consultation", href: "#contact" },
  secondaryCta: { label: "Speak with Sales Cloud Experts", href: "#contact" },
};

const SEO = {
  title: "Salesforce Sales Cloud Consulting & Development Services | Mirketa",
  description:
    "Mirketa's certified Salesforce consultants deliver Sales Cloud implementation, customization, integration, and AI-powered automation that drives measurable revenue growth.",
  canonical: "https://mirketa.us/salesforce-sales-cloud-consulting-development/",
  keywords: [
    "Salesforce Sales Cloud consulting",
    "Sales Cloud implementation services",
    "Salesforce Sales Cloud development",
    "Sales Cloud customization",
    "Sales Cloud integration services",
    "Sales Cloud migration",
    "Agentforce for Sales Cloud",
    "Einstein AI Sales Cloud",
    "Sales Cloud managed services",
    "Sales Cloud pipeline management",
    "Salesforce revenue operations consulting",
    "enterprise Sales Cloud partner",
  ],
  schema: [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "Salesforce Sales Cloud Consulting and Development Services",
      provider: { "@type": "Organization", name: "Mirketa Inc.", url: "https://mirketa.us" },
      name: "Salesforce Sales Cloud Consulting & Development",
      description:
        "End-to-end Salesforce Sales Cloud consulting, implementation, customization, integration, AI enablement, and managed services for enterprise sales organizations.",
      areaServed: "Global",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://mirketa.us/" },
        { "@type": "ListItem", position: 2, name: "Platforms & Technology", item: "https://mirketa.us/salesforce" },
        { "@type": "ListItem", position: 3, name: "Salesforce Clouds", item: "https://mirketa.us/salesforce" },
        { "@type": "ListItem", position: 4, name: "Sales Cloud", item: "https://mirketa.us/salesforce-sales-cloud-consulting-development/" },
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

export default function SalesCloud() {
  const heroTextRef = useRef(null);

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

      gsap.utils.toArray(".slc-reveal").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 32,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      gsap.utils.toArray(".slc-reveal-stagger").forEach((el) => {
        gsap.from(el.children, {
          opacity: 0,
          y: 26,
          duration: 0.6,
          stagger: 0.06,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      gsap.utils.toArray(".slc-zoom-in").forEach((el) => {
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
    <div className="salesforce-sales-cloud">
      <Seo {...SEO} />
      <HeroSection heroTextRef={heroTextRef} />
      <TrustedBySection />
      <WhySalesCloudSection />
      <ConsultingServicesSection />
      <FeaturesSection />
      <AiSalesCloudSection />
      <IntegrationsSection />
      <IndustriesSection />
      <ProcessSection />
      <BenefitsSection />
      <CaseStudiesSection />
      <TechStackSection />
      <FaqSection />
      <FinalCtaSection />
      <ConsultationSection
        eyebrow="Get Started"
        heading="Talk to a Sales Cloud Expert"
        description="Tell us about your sales process and pipeline goals — a Sales Cloud expert will follow up within one business day."
        formTitle="Talk to a Sales Cloud Expert"
      />
    </div>
  );
}

// ============================================================
// HERO
// ============================================================

function HeroSection({ heroTextRef }) {
  return (
    <section className="slc-hero" style={{ backgroundImage: `url("${Images.heroSalesforceSalesCloud}")` }} aria-label="Salesforce Sales Cloud Consulting by Mirketa">
      <div className="slc-hero__scrim" />
      <div className="container">
        <Breadcrumb items={BREADCRUMB} className="slc-breadcrumb" />
        <div className="slc-hero__inner">
          <div ref={heroTextRef} className="slc-hero__text">
            <span className="slc-badge">
              <span className="slc-badge__spark" aria-hidden="true">✦</span> {HERO.badge}
            </span>
            <h1>{HERO.title}</h1>
            <p className="slc-hero__description">{HERO.description}</p>
            <div className="slc-hero__ctas">
              <a href={HERO.primaryCta.href} className="btn btn-primary slc-btn">
                {HERO.primaryCta.label} <span aria-hidden="true">→</span>
              </a>
              <a href={HERO.secondaryCta.href} className="btn btn-secondary slc-btn">
                {HERO.secondaryCta.label}
              </a>
            </div>
            <ul className="slc-hero__metrics">
              {HERO.trustBadges.map((m) => (
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
            className="slc-hero__visual"
          />
        </div>
      </div>
    </section>
  );
}

// ============================================================
// TRUSTED BY GLOBAL ENTERPRISES
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
    <section className="slc-trusted" aria-label="Trusted by global enterprises">
      <div className="container slc-trusted__inner">
        <p className="slc-trusted__label">Trusted by Global Enterprises</p>
        <div className="slc-trusted__track" role="list">
          <div className="slc-trusted__marquee">
            {loop.map((b, i) => (
              <div className="slc-trusted__badge" role="listitem" key={`${b.label}-${i}`}>
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
// WHY SALESFORCE SALES CLOUD
// ============================================================

function WhySalesCloudSection() {
  return (
    <section className="section slc-why" id="why-sales-cloud" aria-labelledby="slc-why-heading">
      <div className="container">
        <div className="section-heading slc-reveal">
          <p className="slc-eyebrow">{WHY_SALES_CLOUD.eyebrow}</p>
          <h2 id="slc-why-heading">{WHY_SALES_CLOUD.heading}</h2>
          <p>{WHY_SALES_CLOUD.intro}</p>
        </div>
        <div className="slc-why__grid slc-reveal-stagger">
          {WHY_SALES_CLOUD.items.map((w) => (
            <div className="slc-why-card" key={w.title}>
              <img src={w.illo} alt="" aria-hidden="true" className="slc-why-card__illo" loading="lazy" />
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
// SALES CLOUD CONSULTING SERVICES
// ============================================================

function ConsultingServicesSection() {
  return (
    <section className="section slc-services" id="services" aria-labelledby="slc-services-heading">
      <div className="container">
        <div className="slc-services__head slc-reveal">
          <div className="section-heading">
            <p className="slc-eyebrow">{CONSULTING_SERVICES.eyebrow}</p>
            <h2 id="slc-services-heading">{CONSULTING_SERVICES.heading}</h2>
            <p>{CONSULTING_SERVICES.intro}</p>
          </div>
        </div>
        <div className="slc-services__grid slc-reveal-stagger">
          {CONSULTING_SERVICES.items.map((s) => (
            <div className="slc-service-card" key={s.title}>
              <span className="slc-service-card__icon">{s.icon}</span>
              <h3>{s.title}</h3>
              <p>{s.description}</p>
              <ul className="slc-service-card__caps">
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
      </div>
    </section>
  );
}

// ============================================================
// SALES CLOUD FEATURES
// ============================================================

function FeaturesSection() {
  return (
    <section className="section slc-features" id="features" aria-labelledby="slc-features-heading">
      <div className="container">
        <div className="slc-features__head slc-reveal">
          <div className="section-heading">
            <p className="slc-eyebrow">{FEATURES.eyebrow}</p>
            <h2 id="slc-features-heading">{FEATURES.heading}</h2>
            <p>{FEATURES.intro}</p>
          </div>
        </div>
        <div className="slc-features__grid slc-reveal-stagger">
          {FEATURES.items.map((f) => (
            <div className={`slc-feature-card ${f.illo ? "slc-feature-card--illo" : ""}`} key={f.title}>
              {f.illo ? (
                <img src={f.illo} alt="" aria-hidden="true" className="slc-feature-card__illo" loading="lazy" />
              ) : (
                <span className="slc-feature-card__check" aria-hidden="true">{Ico.check}</span>
              )}
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
// AI POWERED SALES CLOUD
// ============================================================

function AiSalesCloudSection() {
  return (
    <section className="section slc-ai" aria-labelledby="slc-ai-heading">
      <div className="container">
        <div className="slc-ai__head slc-reveal">
          <div className="section-heading">
            <p className="slc-eyebrow">{AI_SALES_CLOUD.eyebrow}</p>
            <h2 id="slc-ai-heading">{AI_SALES_CLOUD.heading}</h2>
            <p>{AI_SALES_CLOUD.intro}</p>
          </div>
        </div>
        <div className="slc-ai__grid slc-reveal-stagger">
          {AI_SALES_CLOUD.items.map((a) => (
            <div className="slc-ai-card" key={a.title}>
              <span className="slc-ai-card__icon">{a.icon}</span>
              <h3>{a.title}</h3>
              <p>{a.description}</p>
            </div>
          ))}
        </div>
        <div className="slc-ai__cta slc-reveal">
          <Link to="/agentforce" className="btn btn-primary slc-btn">
            Explore Agentforce <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// INTEGRATION CAPABILITIES
// ============================================================

function IntegrationsSection() {
  return (
    <section className="section slc-integrations" aria-labelledby="slc-integrations-heading">
      <div className="container">
        <div className="slc-integrations__head slc-reveal">
          <div className="section-heading">
            <p className="slc-eyebrow">{INTEGRATIONS.eyebrow}</p>
            <h2 id="slc-integrations-heading">{INTEGRATIONS.heading}</h2>
            <p>{INTEGRATIONS.intro}</p>
          </div>
        </div>
        <ul className="slc-integrations__wall slc-reveal-stagger">
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
    <section className="section slc-industries" aria-labelledby="slc-industries-heading">
      <div className="container">
        <div className="section-heading slc-reveal">
          <p className="slc-eyebrow">{INDUSTRIES.eyebrow}</p>
          <h2 id="slc-industries-heading">{INDUSTRIES.heading}</h2>
          <p>{INDUSTRIES.intro}</p>
        </div>
        <div className="slc-industries__grid slc-reveal-stagger">
          {INDUSTRIES.items.map((i) => (
            <div className="slc-industry-card" key={i.title}>
              <img src={i.icon} alt="" aria-hidden="true" />
              <h3>{i.title}</h3>
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
    <section className="section slc-process" aria-labelledby="slc-process-heading">
      <div className="container">
        <div className="slc-process__head slc-reveal">
          <div className="section-heading">
            <p className="slc-eyebrow">{PROCESS.eyebrow}</p>
            <h2 id="slc-process-heading">{PROCESS.heading}</h2>
            <p>{PROCESS.intro}</p>
          </div>
        </div>
        <div className="slc-process__rail slc-reveal-stagger">
          {PROCESS.steps.map((p, i) => (
            <div className="slc-step-card" key={p.name}>
              <span className="slc-step-card__num">{String(i + 1).padStart(2, "0")}</span>
              <h3>{p.name}</h3>
              <p>{p.description}</p>
              {i < PROCESS.steps.length - 1 && <span className="slc-step-card__arrow" aria-hidden="true">→</span>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// BENEFITS OF SALES CLOUD
// ============================================================

function BenefitsSection() {
  return (
    <section className="section slc-benefits" aria-labelledby="slc-benefits-heading">
      <div className="container">
        <div className="slc-benefits__head slc-reveal">
          <div className="section-heading">
            <p className="slc-eyebrow">{BENEFITS.eyebrow}</p>
            <h2 id="slc-benefits-heading">{BENEFITS.heading}</h2>
            <p>{BENEFITS.intro}</p>
          </div>
        </div>
        <div className="slc-benefits__grid slc-reveal-stagger">
          {BENEFITS.stats.map((s) => (
            <div className="slc-benefit-stat" key={s.label}>
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// CUSTOMER SUCCESS STORIES
// ============================================================

function CaseStudiesSection() {
  return (
    <section className="section slc-cases" aria-labelledby="slc-cases-heading">
      <div className="container">
        <div className="slc-cases__head slc-reveal">
          <div className="section-heading">
            <p className="slc-eyebrow">{CASE_STUDIES.eyebrow}</p>
            <h2 id="slc-cases-heading">{CASE_STUDIES.heading}</h2>
            <p>{CASE_STUDIES.intro}</p>
          </div>
        </div>
        <div className="slc-cases__grid slc-reveal-stagger">
          {CASE_STUDIES.cases.map((c) => (
            <div className="slc-case-card" key={c.title}>
              <span className="slc-case-card__tag">{c.industry}</span>
              <h3>{c.title}</h3>
              <p>{c.body}</p>
              <div className="slc-case-card__metrics">
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
// TECHNOLOGY STACK
// ============================================================

function TechStackSection() {
  return (
    <section className="section slc-stack" aria-labelledby="slc-stack-heading">
      <div className="container">
        <div className="section-heading slc-reveal">
          <p className="slc-eyebrow">{TECH_STACK.eyebrow}</p>
          <h2 id="slc-stack-heading">{TECH_STACK.heading}</h2>
        </div>
        <ul className="slc-stack__wall slc-reveal-stagger">
          {TECH_STACK.items.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
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
    <section className="section slc-faq" aria-labelledby="slc-faq-heading">
      <div className="container">
        <div className="section-heading slc-reveal">
          <p className="slc-eyebrow">FAQ</p>
          <h2 id="slc-faq-heading">Frequently Asked Questions About Salesforce Sales Cloud</h2>
        </div>
        <div className="slc-faq__search-wrap slc-reveal">
          <label htmlFor="slc-faq-search" className="visually-hidden">
            Search frequently asked questions
          </label>
          <input
            id="slc-faq-search"
            type="search"
            className="slc-faq__search"
            placeholder="Ask a question — e.g. &quot;pricing&quot;, &quot;AI&quot;, &quot;migration&quot;..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpenIndex(-1);
            }}
          />
        </div>
        <div className="slc-faq__list slc-reveal">
          {filtered.length === 0 ? (
            <p className="slc-faq__empty">No questions match &ldquo;{query}&rdquo;. Try a different search term.</p>
          ) : (
            filtered.map((item, i) => {
              const open = openIndex === i;
              const panelId = `slc-faq-panel-${i}`;
              return (
                <div className={`slc-faq-item ${open ? "is-open" : ""}`} key={item.q}>
                  <button type="button" className="slc-faq-item__question" aria-expanded={open} aria-controls={panelId} onClick={() => setOpenIndex(open ? -1 : i)}>
                    <span>{item.q}</span>
                    <span className="slc-faq-item__icon" aria-hidden="true">{open ? "−" : "+"}</span>
                  </button>
                  <div id={panelId} className="slc-faq-item__answer" role="region" hidden={!open}>
                    <p>{item.a}</p>
                  </div>
                </div>
              );
            })
          )}
        </div>
        <p className="slc-faq__links">
          Related reading: <Link to="/salesforce-consulting-development-services">Salesforce Development & Consulting</Link>,{" "}
          <Link to="/salesforce">Salesforce Clouds</Link>,{" "}
          <Link to="/salesforce#service-cloud">Salesforce Service Cloud</Link>,{" "}
          <Link to="/salesforce#marketing-cloud">Salesforce Marketing Cloud</Link>,{" "}
          <Link to="/data-cloud">Salesforce Data Cloud</Link>, <Link to="/agentforce">Agentforce</Link>,{" "}
          <Link to="/ai-consulting">AI Consulting</Link>, <Link to="/ai-enablement">AI Enablement</Link>,{" "}
          <a href="#services">Integration Services</a>, <Link to="/insights">Customer Success</Link>,{" "}
          <Link to="/blog">Blogs</Link>.
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
    <section className="slc-final-cta slc-reveal" aria-labelledby="slc-final-cta-heading">
      <div className="container slc-final-cta__inner">
        <h2 id="slc-final-cta-heading">{FINAL_CTA.heading}</h2>
        <p>{FINAL_CTA.description}</p>
        <div className="slc-final-cta__ctas">
          <a href={FINAL_CTA.primaryCta.href} className="btn btn-primary slc-btn">
            {FINAL_CTA.primaryCta.label} <span aria-hidden="true">→</span>
          </a>
          <a href={FINAL_CTA.secondaryCta.href} className="btn btn-secondary slc-btn">
            {FINAL_CTA.secondaryCta.label}
          </a>
        </div>
        <Link to="/salesforce" className="slc-final-cta__all-services">
          Explore All Salesforce Clouds →
        </Link>
      </div>
    </section>
  );
}
