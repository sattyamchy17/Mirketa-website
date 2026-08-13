import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Images } from "../../../assets/images/index.js";
import Seo from "../../../components/Seo/Seo.jsx";
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb.jsx";
import HeroVisual from "../../../components/HeroVisual/HeroVisual.jsx";
import ConsultationSection from "../../../components/ConsultationSection/ConsultationSection.jsx";
import "./ServiceCloud.css";

gsap.registerPlugin(ScrollTrigger);

// ============================================================
// ICONS
// ============================================================

const Ico = {
  clock: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" /><path d="M12 7v5l4 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  scatter: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="6" cy="6" r="2.4" stroke="currentColor" strokeWidth="1.4" /><circle cx="18" cy="7" r="2.4" stroke="currentColor" strokeWidth="1.4" /><circle cx="7" cy="18" r="2.4" stroke="currentColor" strokeWidth="1.4" /><circle cx="17" cy="17" r="2.4" stroke="currentColor" strokeWidth="1.4" /><path d="M8 7l8 1M8 9l-1 8M16 9l1 7" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2 3" opacity="0.6" /></svg>
  ),
  shuffle: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 6h4l7 12h4M3 18h4l3-5M14 6h4l-2-2M14 6l2 2M18 18l2-2M18 18l-2 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  gaugeLow: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 16a8 8 0 1116 0" stroke="currentColor" strokeWidth="1.5" /><path d="M12 16l-4.5-3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /><circle cx="12" cy="16" r="1.3" fill="currentColor" /></svg>
  ),
  frown: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.4" /><path d="M8.5 15.5c1-1.6 2.3-2.4 3.5-2.4s2.5.8 3.5 2.4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /><circle cx="9" cy="9.5" r="1" fill="currentColor" /><circle cx="15" cy="9.5" r="1" fill="currentColor" /></svg>
  ),
  coins: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><ellipse cx="9" cy="7" rx="6" ry="3" stroke="currentColor" strokeWidth="1.4" /><path d="M3 7v5c0 1.7 2.7 3 6 3s6-1.3 6-3V7" stroke="currentColor" strokeWidth="1.4" /><ellipse cx="16" cy="14" rx="5" ry="2.6" stroke="currentColor" strokeWidth="1.3" /><path d="M11 14v4c0 1.4 2.2 2.6 5 2.6s5-1.2 5-2.6v-4" stroke="currentColor" strokeWidth="1.3" /></svg>
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
  bolt: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M13 2L4 14h7l-1 8 10-13h-7l0-7z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  robot: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="5" y="9" width="14" height="10" rx="3" stroke="currentColor" strokeWidth="1.5" /><path d="M12 5v4M9 14h.01M15 14h.01" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /><circle cx="12" cy="4" r="1.4" fill="currentColor" /></svg>
  ),
  headset: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 13a8 8 0 0116 0v4" stroke="currentColor" strokeWidth="1.5" /><rect x="3" y="13" width="4" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4" /><rect x="17" y="13" width="4" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4" /></svg>
  ),
  book: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 5.5A2.5 2.5 0 016.5 3H20v15H6.5A2.5 2.5 0 004 20.5v-15z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M4 20.5A2.5 2.5 0 016.5 18H20" stroke="currentColor" strokeWidth="1.4" /></svg>
  ),
  window: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" /><path d="M3 9h18M9 9v11" stroke="currentColor" strokeWidth="1.3" opacity="0.6" /></svg>
  ),
  sparkle: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /></svg>
  ),
  plug: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 3v5M15 3v5M7 8h10v4a5 5 0 01-10 0V8z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="M12 17v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
  ),
  chartUp: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 19V13M10 19V8M16 19v-5M20 19V5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
  ),
  gear: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.4" /><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
  ),
  award: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="8" r="5" stroke="currentColor" strokeWidth="1.4" /><path d="M8.5 12.5L7 21l5-2.5L17 21l-1.5-8.5" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  check: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12.5l5 5L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  cross: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
  ),
  globe: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.4" /><path d="M3 12h18M12 3c2.5 2.5 3.5 6 3.5 9s-1 6.5-3.5 9c-2.5-2.5-3.5-6-3.5-9s1-6.5 3.5-9z" stroke="currentColor" strokeWidth="1.3" /></svg>
  ),
  tag: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3l8 8-8.5 8.5a1.5 1.5 0 01-2.1 0L3.5 13.6a1.5 1.5 0 010-2.1L12 3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><circle cx="9" cy="8" r="1.6" fill="currentColor" /></svg>
  ),
  handshake: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 12l4-4 4 4-4 4-4-4zM21 12l-4-4-4 4 4 4 4-4z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M11 12h2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
  ),
};

// ============================================================
// DATA
// ============================================================

const BREADCRUMB = [
  { label: "Home", href: "/" },
  { label: "Platforms & Technology", href: "/platforms/salesforce/clouds" },
  { label: "Salesforce Clouds", href: "/platforms/salesforce/clouds" },
  { label: "Service Cloud" },
];

const HERO = {
  badge: "Salesforce Summit Partner • Service Cloud Experts",
  title: "Deliver Faster, Smarter Customer Support with Salesforce Service Cloud",
  description:
    "Transform your customer service operations with Salesforce Service Cloud consulting, implementation, customization, AI automation, omnichannel support, and managed services. Improve agent productivity, reduce response times, and deliver personalized customer experiences across every interaction.",
  primaryCta: { label: "Get Free Consultation", href: "#contact" },
  secondaryCta: { label: "Talk to Our Experts", href: "#contact" },
};

const HERO_STATS = [
  { value: "500+", label: "Salesforce Projects" },
  { value: "98%", label: "Customer Satisfaction" },
  { value: "100%", label: "Certified Consultants" },
  { value: "Global", label: "Delivery Model" },
];

const HERO_DASHBOARD = {
  title: "Service Cloud Console",
  stats: [
    { label: "Faster Resolution", value: "44%", caption: "Avg. case resolution time" },
    { label: "Auto-Resolved", value: "41%", caption: "Cases handled by Agentforce" },
    { label: "SLA Compliance", value: "99.4%", caption: "Across every channel" },
  ],
  rows: [
    { title: "Case #4821 — Billing Dispute", meta: "Chat • Auto-routed to Tier 1", status: "Resolved", tone: "good" },
    { title: "Case #4830 — Platform Outage", meta: "Voice • Escalated to Tier 2", status: "In Progress", tone: "attention" },
    { title: "Knowledge Article Matched", meta: "AI-ranked • Billing FAQ", status: "Deflected", tone: "neutral" },
    { title: "Omnichannel Queue", meta: "Chat, Email, Voice, Social", status: "Unified", tone: "good" },
  ],
  floatingCards: [
    { icon: Ico.robot, title: "Agentforce Bot", subtitle: "Resolving routine requests" },
    { icon: Ico.sparkle, title: "Einstein AI", subtitle: "Sentiment analysis live" },
  ],
};

const CHALLENGES = {
  eyebrow: "Customer Service Challenges",
  heading: "The Support Problems Costing You Customers",
  intro: "Most customer service teams aren't short on effort — they're short on the right platform. These are the problems we hear most often before a Service Cloud engagement.",
  illo: Images.illoOmnichannelSupport,
  items: [
    { icon: Ico.clock, title: "Slow Response Times", description: "Cases sit in a queue while customers wait — and switch to a competitor." },
    { icon: Ico.scatter, title: "Fragmented Customer Data", description: "Support, sales, and billing history live in three different systems." },
    { icon: Ico.shuffle, title: "Manual Case Routing", description: "Agents triage tickets by hand instead of software doing it in seconds." },
    { icon: Ico.gaugeLow, title: "Low Agent Productivity", description: "Reps toggle between five tools just to answer one customer question." },
    { icon: Ico.frown, title: "Poor Customer Experience", description: "Customers repeat themselves across every channel they contact you on." },
    { icon: Ico.coins, title: "High Operational Costs", description: "Ticket volume keeps growing, and so does the headcount needed to handle it." },
  ],
};

const SERVICES = {
  eyebrow: "Our Salesforce Service Cloud Services",
  heading: "End-to-End Service Cloud Consulting & Development",
  intro: "From first strategy session to long-term managed support, our certified consultants handle every phase of your Service Cloud transformation.",
  illo: Images.illoCaseManagementWorkflow,
  items: [
    { icon: Ico.compass, title: "Service Cloud Consulting", description: "Strategic assessment of your support operations, channels, and case data before any configuration begins." },
    { icon: Ico.rocket, title: "Implementation", description: "Full lifecycle Service Cloud deployment configured around how your support team actually works." },
    { icon: Ico.code, title: "Custom Development", description: "Apex, LWC, and custom APIs for support workflows standard configuration can't reach." },
    { icon: Ico.bolt, title: "Lightning Migration", description: "Move off Classic or a legacy help desk without losing case history or agent trust." },
    { icon: Ico.robot, title: "AI-powered Service Automation", description: "Agentforce and Einstein automation that resolves and routes cases without human intervention." },
    { icon: Ico.headset, title: "Omni-channel Setup", description: "Chat, email, voice, and social unified into one queue with intelligent presence-based routing." },
    { icon: Ico.book, title: "Knowledge Management", description: "A searchable knowledge base that deflects repetitive cases before they reach an agent." },
    { icon: Ico.window, title: "Experience Cloud Integration", description: "Self-service customer portals connected directly to your Service Cloud case data." },
    { icon: Ico.sparkle, title: "Einstein AI for Service", description: "Case classification, reply recommendations, and sentiment analysis built on your own case history." },
    { icon: Ico.plug, title: "CTI Integration", description: "Telephony systems connected to Service Cloud for click-to-dial and automatic call logging." },
    { icon: Ico.chartUp, title: "Service Analytics", description: "Real-time dashboards on SLA performance, deflection rate, and agent workload." },
    { icon: Ico.gear, title: "Managed Services", description: "A dedicated team of certified admins keeping your Service Cloud org healthy long-term." },
  ],
};

const COMPARISON = {
  eyebrow: "Why Salesforce Service Cloud?",
  heading: "Traditional Customer Support vs. Salesforce Service Cloud",
  intro: "Side by side, the gap between a disconnected help desk and a modern Service Cloud implementation is hard to ignore.",
  rows: [
    { label: "AI Automation", traditional: "Manual triage on every case", serviceCloud: "Agentforce & Einstein automate classification and replies" },
    { label: "Omnichannel", traditional: "Separate tools per channel", serviceCloud: "Chat, email, voice, and social in one unified queue" },
    { label: "Case Routing", traditional: "Assigned manually by a supervisor", serviceCloud: "Skill and priority-based routing in real time" },
    { label: "Knowledge Base", traditional: "Scattered docs and tribal knowledge", serviceCloud: "Searchable, AI-ranked knowledge articles" },
    { label: "Customer History", traditional: "Reconstructed from multiple systems", serviceCloud: "Full Customer 360 timeline on every case" },
    { label: "SLA Tracking", traditional: "Tracked in spreadsheets, after the fact", serviceCloud: "Automated SLA timers and escalation rules" },
    { label: "Agent Productivity", traditional: "Toggling between five disconnected tools", serviceCloud: "Every tool, macro, and script in one console" },
    { label: "Reporting", traditional: "Manual exports, days out of date", serviceCloud: "Live dashboards updated in real time" },
    { label: "Predictive Intelligence", traditional: "Reactive — issues found after they escalate", serviceCloud: "Predictive routing flags risk before it escalates" },
  ],
};

const FEATURES = {
  eyebrow: "Service Cloud Features",
  heading: "Every Service Cloud Capability, Configured to Perform",
  intro: "We configure each capability around your support workflow, not a generic template.",
  illo: Images.illoServiceConsole,
  items: [
    { title: "Omni-channel Routing", description: "Unified queue across chat, email, voice, and social channels." },
    { title: "AI Chatbots", description: "Agentforce bots that resolve common questions without an agent." },
    { title: "Case Management", description: "Structured workflows that move every case toward resolution.", illo: Images.illoCaseManagementWorkflow },
    { title: "Knowledge Articles", description: "Searchable, AI-ranked articles that deflect repetitive cases.", illo: Images.illoKnowledgeBase },
    { title: "Service Console", description: "A single agent workspace for every tool, macro, and script.", illo: Images.illoServiceConsole },
    { title: "Field Service", description: "Scheduling and mobile tools for on-site technician visits." },
    { title: "Einstein AI", description: "Native AI trained on your own case and customer data." },
    { title: "Customer 360", description: "Every interaction, purchase, and case in one unified view.", illo: Images.illoCustomer360 },
    { title: "Macros", description: "One-click automation for repetitive multi-step case actions." },
    { title: "Workflow Automation", description: "Flow-driven escalation, assignment, and notification rules." },
    { title: "Service Analytics", description: "Real-time dashboards on SLA, deflection, and agent workload." },
    { title: "Digital Engagement", description: "SMS, WhatsApp, and in-app messaging inside the same console." },
  ],
};

const INDUSTRIES = {
  eyebrow: "Industries We Serve",
  heading: "Service Cloud Expertise Across Every Vertical",
  intro: "Support requirements differ sharply by industry — we bring vertical context to every Service Cloud engagement.",
  items: [
    { icon: Images.iconIndustryHealthcare, title: "Healthcare" },
    { icon: Images.iconIndustryManufacturing, title: "Manufacturing" },
    { icon: Images.iconIndustryEcommerce, title: "Retail" },
    { icon: Images.iconIndustryEducation, title: "Education" },
    { icon: Images.iconIndustryFinancialServices, title: "Financial Services" },
    { icon: Images.iconIndustryInsurance, title: "Insurance" },
    { icon: Images.iconIndustryPublicSector, title: "Public Sector" },
    { icon: Images.iconIndustryHitech, title: "High Tech" },
  ],
};

const PROCESS = {
  eyebrow: "Implementation Process",
  heading: "A Structured Path From Discovery to Go-Live",
  intro: "No surprises, no scope creep. Our Service Cloud delivery framework has been refined across hundreds of implementations.",
  illo: Images.illoCsatGrowth,
  steps: [
    { name: "Discovery", description: "We map your current support process, channels, and pain points." },
    { name: "Solution Design", description: "Case model, automation, and integration architecture, documented." },
    { name: "Configuration", description: "Core Service Cloud setup — queues, roles, and console layout." },
    { name: "Custom Development", description: "Apex, LWC, and API work for requirements beyond configuration." },
    { name: "Integration", description: "Connecting Service Cloud to CTI, ERP, and knowledge systems." },
    { name: "Data Migration", description: "Case history and knowledge migrated with full validation." },
    { name: "Testing", description: "UAT, regression testing, and security review before go-live." },
    { name: "User Training", description: "Role-based training so agents are productive on day one." },
    { name: "Go-Live", description: "Structured cutover with go-live support on-site or remote." },
    { name: "Continuous Optimization", description: "Hypercare and ongoing optimization after launch." },
  ],
};

const AI_SERVICE_CLOUD = {
  eyebrow: "AI + Service Cloud",
  heading: "How AI Makes Every Support Interaction Faster",
  intro: "AI in Service Cloud isn't a chatbot bolted onto your help desk — configured correctly, it becomes the layer that classifies, routes, and resolves work before an agent even sees it.",
  illo: Images.illoAiAgentCopilot,
  items: [
    { icon: Ico.tag, title: "AI Case Classification", description: "Incoming cases are categorized and prioritized automatically on arrival." },
    { icon: Ico.sparkle, title: "AI Suggested Replies", description: "Agents get drafted responses grounded in your own knowledge base." },
    { icon: Ico.book, title: "AI Knowledge Search", description: "The right article surfaces on the case screen before an agent searches." },
    { icon: Ico.robot, title: "AI Chatbots", description: "Agentforce bots resolve routine requests without human intervention." },
    { icon: Ico.shuffle, title: "Predictive Routing", description: "Cases are routed to the agent most likely to resolve them fastest." },
    { icon: Ico.frown, title: "Sentiment Analysis", description: "At-risk conversations are flagged for escalation before they churn." },
    { icon: Ico.headset, title: "Agent Copilot", description: "Real-time guidance surfaced directly inside the console, in context." },
    { icon: Ico.gear, title: "Workflow Automation", description: "Flow-driven approvals, assignments, and follow-ups with zero manual steps." },
  ],
};

const WHY_MIRKETA = {
  eyebrow: "Why Choose Mirketa",
  heading: "A Service Cloud Partner That Delivers Outcomes",
  intro: "Hundreds of partners can configure Service Cloud. Fewer can tie every decision back to a measurable support outcome.",
  items: [
    { icon: Ico.award, title: "Salesforce Summit Partner", description: "Our highest-tier Salesforce partnership, backed by a verified delivery track record." },
    { icon: Ico.compass, title: "Certified Experts", description: "Every consultant holds active Service Cloud and Platform certifications." },
    { icon: Ico.globe, title: "Industry Experience", description: "Deep vertical context across healthcare, financial services, and more." },
    { icon: Ico.bolt, title: "Agile Delivery", description: "Two-week sprints with regular demos keep every engagement on schedule." },
    { icon: Ico.sparkle, title: "AI-first Solutions", description: "Agentforce and Einstein are part of the architecture, not an afterthought." },
    { icon: Ico.headset, title: "Global Support", description: "A delivery model built to support distributed, multi-region teams." },
    { icon: Ico.tag, title: "Transparent Pricing", description: "Fixed-price options and detailed proposals — no hidden fees, ever." },
    { icon: Ico.handshake, title: "Long-term Partnership", description: "98% client retention because our work continues past go-live." },
  ],
};

const CASE_STUDIES = {
  eyebrow: "Case Studies",
  heading: "Real Service Cloud Outcomes From Real Deployments",
  intro: "Anonymized results from recent Service Cloud engagements across industries.",
  cases: [
    {
      title: "Regional Insurer Cuts Case Resolution Time by 44%",
      industry: "Insurance",
      challenge: "Claims support was split across email and three legacy ticketing tools, with no shared case history.",
      solution: "We implemented Service Cloud with omnichannel routing, Einstein case classification, and a unified knowledge base.",
      outcome: "Agents now resolve claims cases from a single console with full policyholder history on screen.",
      metrics: [{ value: "44%", label: "Faster Resolution" }, { value: "37%", label: "More Cases/Agent" }, { value: "4.8★", label: "CSAT Score" }],
    },
    {
      title: "Healthcare Network Deflects 41% of Cases With AI",
      industry: "Healthcare",
      challenge: "A growing patient support team couldn't scale headcount fast enough to match rising case volume.",
      solution: "We deployed Agentforce bots and an AI-ranked knowledge base for common scheduling and billing questions.",
      outcome: "The support team now handles 3× the volume without proportional headcount growth.",
      metrics: [{ value: "41%", label: "Cases Auto-Resolved" }, { value: "3×", label: "Volume Handled" }, { value: "29%", label: "Cost Reduction" }],
    },
    {
      title: "Retail Brand Unifies 4 Channels Into One Console",
      industry: "Retail",
      challenge: "Chat, email, phone, and social support ran on four separate platforms with no shared queue.",
      solution: "We consolidated every channel into Service Cloud with skill-based omnichannel routing and SLA automation.",
      outcome: "Customers now get a consistent experience regardless of which channel they contact first.",
      metrics: [{ value: "4→1", label: "Channels Unified" }, { value: "52%", label: "Faster First Response" }, { value: "99.4%", label: "SLA Compliance" }],
    },
  ],
};

const TESTIMONIALS = [
  { quote: "Our support team went from drowning in tickets to actually getting ahead of them. The AI-powered routing alone paid for the engagement within the first quarter.", name: "Marcus Chen", role: "VP of Customer Support, a national insurer" },
  { quote: "Mirketa didn't just configure Service Cloud — they rebuilt our entire support workflow around it. Our agents finally have one console instead of five browser tabs.", name: "Renata Silva", role: "Director of Support Operations" },
  { quote: "The knowledge base deflection alone cut our ticket volume by over a third. That's the kind of ROI that gets a Salesforce investment approved for next year too.", name: "Aakash Rao", role: "Head of Customer Experience" },
  { quote: "What impressed us most was how honest the team was about timelines. They under-promised and over-delivered, which is rare in this industry.", name: "Diane Osei", role: "COO, healthcare services provider" },
];

const TECH_ECOSYSTEM = {
  eyebrow: "Technology Ecosystem",
  heading: "Service Cloud, Connected to Your Full Stack",
  items: ["Salesforce", "Slack", "MuleSoft", "Tableau", "Marketing Cloud", "Data Cloud", "AWS", "Azure", "Snowflake", "SAP", "Oracle", "NetSuite"],
};

const FAQS = [
  { q: "What does Salesforce Service Cloud consulting include?", a: "Our Service Cloud consulting starts with a discovery phase that maps your existing support channels, case data, and agent workflow. From there we deliver a prioritized roadmap covering implementation, automation, and integration — each recommendation tied to a measurable support outcome." },
  { q: "How long does a Salesforce Service Cloud implementation take?", a: "A focused Service Cloud implementation for a single support team typically takes 6–10 weeks. Multi-channel or highly customized deployments with CTI and knowledge base migration can take 3–5 months. We provide a detailed timeline during discovery, before implementation begins." },
  { q: "What Salesforce Service Cloud development services do you offer?", a: "We provide custom Apex development, Lightning Web Components, CTI integration, and REST/SOAP API development for support workflows that go beyond standard configuration — all built to Salesforce governor-limit and security-review standards." },
  { q: "How does Salesforce customer service automation work?", a: "Automation in Service Cloud is built with Flow Builder and Agentforce — covering case routing, escalation rules, macros, and automated responses. We design automation around your actual case types so routine work resolves itself instead of relying on manual triage." },
  { q: "What Salesforce AI customer support capabilities are available?", a: "Service Cloud includes Einstein AI for case classification, reply suggestions, and sentiment analysis, alongside Agentforce for autonomous bots that resolve routine requests. We configure these against your own case history rather than a generic, out-of-the-box model." },
  { q: "Are you a certified Salesforce Service Cloud partner?", a: "Yes. Mirketa is a Salesforce Summit Partner with consultants holding active Service Cloud, Platform, and Einstein certifications, backed by a track record across hundreds of Salesforce engagements." },
  { q: "Can you migrate our existing help desk into Service Cloud?", a: "Yes. We migrate case history, knowledge articles, and customer data from legacy help desks and other CRMs, including deduplication and validation, so you start on Service Cloud with a trustworthy foundation." },
  { q: "How much does Salesforce Service Cloud consulting cost?", a: "Pricing depends on scope, channel count, and integration complexity. Most implementations range from $20,000 to $110,000. We provide a detailed, fixed-scope proposal after a free discovery consultation — no hidden fees." },
  { q: "Do you offer Salesforce managed services after go-live?", a: "Yes. Our managed services model gives you access to certified Service Cloud admins and developers on a monthly retainer, covering configuration changes, release management, and proactive optimization after the initial rollout." },
  { q: "How secure is customer data inside Salesforce Service Cloud?", a: "Service Cloud runs on Salesforce's enterprise-grade infrastructure with field-level security, role-based access, and full audit trails. We layer on org-specific security reviews and permission design aligned to your compliance requirements, including HIPAA-aligned architecture where needed." },
  { q: "Can Service Cloud integrate with our existing phone system?", a: "Yes. We build CTI integrations that connect Service Cloud to your existing telephony platform for click-to-dial, automatic call logging, and screen pop — so agents never have to switch tools mid-call." },
  { q: "What's the difference between Service Cloud and a traditional help desk?", a: "A traditional help desk tracks tickets in isolation. Service Cloud unifies every channel, surfaces full Customer 360 history on every case, and layers in AI for routing and resolution — turning support into a connected, measurable operation instead of a ticket queue." },
];

const FINAL_CTA = {
  heading: "Ready to Modernize Your Customer Service?",
  description: "Let our Salesforce experts help you implement an AI-powered customer service platform that improves customer satisfaction, agent productivity, and operational efficiency.",
  primaryCta: { label: "Book Free Consultation", href: "#contact" },
  secondaryCta: { label: "Talk to an Expert", href: "#contact" },
};

const SEO = {
  title: "Salesforce Service Cloud Consulting & Development Services | Mirketa",
  description:
    "Mirketa's certified Salesforce consultants deliver Service Cloud implementation, customization, AI automation, and omnichannel support that improves CSAT and agent productivity.",
  canonical: "https://mirketa.us/salesforce-service-cloud-consulting-development/",
  keywords: [
    "Salesforce Service Cloud Consulting",
    "Salesforce Service Cloud Development",
    "Salesforce Service Cloud Implementation",
    "Salesforce Customer Service Solutions",
    "Salesforce Service Cloud Partner",
    "Salesforce Support Automation",
    "Salesforce AI Customer Service",
    "Salesforce Managed Services",
    "Salesforce CRM Consulting",
    "Omnichannel Customer Support",
    "AI-powered Customer Service",
  ],
  schema: [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "Salesforce Service Cloud Consulting and Development Services",
      provider: { "@type": "Organization", name: "Mirketa Inc.", url: "https://mirketa.us" },
      name: "Salesforce Service Cloud Consulting & Development",
      description:
        "End-to-end Salesforce Service Cloud consulting, implementation, customization, AI automation, omnichannel setup, and managed services for enterprise support teams.",
      areaServed: "Global",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://mirketa.us/" },
        { "@type": "ListItem", position: 2, name: "Platforms & Technology", item: "https://mirketa.us/platforms/salesforce/clouds" },
        { "@type": "ListItem", position: 3, name: "Salesforce Clouds", item: "https://mirketa.us/platforms/salesforce/clouds" },
        { "@type": "ListItem", position: 4, name: "Service Cloud", item: "https://mirketa.us/salesforce-service-cloud-consulting-development/" },
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

export default function ServiceCloud() {
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

      gsap.utils.toArray(".scc-reveal").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 32,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      gsap.utils.toArray(".scc-reveal-stagger").forEach((el) => {
        gsap.from(el.children, {
          opacity: 0,
          y: 26,
          duration: 0.6,
          stagger: 0.06,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      gsap.utils.toArray(".scc-zoom-in").forEach((el) => {
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
    <div className="salesforce-service-cloud">
      <Seo {...SEO} />
      <HeroSection heroTextRef={heroTextRef} />
      <TrustedBySection />
      <ChallengesSection />
      <ServicesSection />
      <ComparisonSection />
      <FeaturesSection />
      <IndustriesSection />
      <ProcessSection />
      <AiServiceCloudSection />
      <WhyMirketaSection />
      <CaseStudiesSection />
      <TestimonialsSection />
      <TechEcosystemSection />
      <FaqSection />
      <FinalCtaSection />
      <ConsultationSection
        eyebrow="Get Started"
        heading="Talk to a Service Cloud Expert"
        description="Tell us about your customer service operations and support channels — a Service Cloud expert will follow up within one business day."
        formTitle="Talk to a Service Cloud Expert"
      />
    </div>
  );
}

// ============================================================
// HERO
// ============================================================

function HeroSection({ heroTextRef }) {
  return (
    <section className="scc-hero" style={{ backgroundImage: `url("${Images.heroSalesforceServiceCloud}")` }} aria-label="Salesforce Service Cloud Consulting by Mirketa">
      <div className="scc-hero__scrim" />
      <div className="container">
        <Breadcrumb items={BREADCRUMB} className="scc-breadcrumb" />
        <div className="scc-hero__inner">
          <div ref={heroTextRef} className="scc-hero__text">
            <span className="scc-badge">
              <span className="scc-badge__spark" aria-hidden="true">✦</span> {HERO.badge}
            </span>
            <h1>{HERO.title}</h1>
            <p className="scc-hero__description">{HERO.description}</p>
            <div className="scc-hero__ctas">
              <a href={HERO.primaryCta.href} className="btn btn-primary scc-btn">
                {HERO.primaryCta.label} <span aria-hidden="true">→</span>
              </a>
              <a href={HERO.secondaryCta.href} className="btn btn-secondary scc-btn">
                {HERO.secondaryCta.label}
              </a>
            </div>
            <ul className="scc-hero__metrics">
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
            className="scc-hero__visual"
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
    <section className="scc-trusted" aria-label="Trusted by global enterprises">
      <div className="container scc-trusted__inner">
        <p className="scc-trusted__label">Trusted By</p>
        <div className="scc-trusted__track" role="list">
          <div className="scc-trusted__marquee">
            {loop.map((b, i) => (
              <div className="scc-trusted__badge" role="listitem" key={`${b.label}-${i}`}>
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
// CUSTOMER SERVICE CHALLENGES
// ============================================================

function ChallengesSection() {
  return (
    <section className="section scc-challenges" aria-labelledby="scc-challenges-heading">
      <div className="container">
        <div className="scc-challenges__head scc-reveal">
          <div className="section-heading">
            <p className="scc-eyebrow">{CHALLENGES.eyebrow}</p>
            <h2 id="scc-challenges-heading">{CHALLENGES.heading}</h2>
            <p>{CHALLENGES.intro}</p>
          </div>
          <img src={CHALLENGES.illo} alt="" aria-hidden="true" className="scc-challenges__illo" loading="lazy" />
        </div>
        <div className="scc-challenges__grid scc-reveal-stagger">
          {CHALLENGES.items.map((c) => (
            <div className="scc-challenge-card" key={c.title}>
              <span className="scc-challenge-card__icon">{c.icon}</span>
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
// OUR SALESFORCE SERVICE CLOUD SERVICES
// ============================================================

function ServicesSection() {
  return (
    <section className="section scc-services" id="services" aria-labelledby="scc-services-heading">
      <div className="container">
        <div className="scc-services__head scc-reveal">
          <div className="section-heading">
            <p className="scc-eyebrow">{SERVICES.eyebrow}</p>
            <h2 id="scc-services-heading">{SERVICES.heading}</h2>
            <p>{SERVICES.intro}</p>
          </div>
          <img src={SERVICES.illo} alt="" aria-hidden="true" className="scc-services__illo" loading="lazy" />
        </div>
        <div className="scc-services__grid scc-reveal-stagger">
          {SERVICES.items.map((s) => (
            <div className="scc-service-card" key={s.title}>
              <span className="scc-service-card__icon">{s.icon}</span>
              <h3>{s.title}</h3>
              <p>{s.description}</p>
              <a href="#contact" className="scc-service-card__link">
                Learn More <span aria-hidden="true">→</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// WHY SALESFORCE SERVICE CLOUD — comparison
// ============================================================

function ComparisonSection() {
  return (
    <section className="section scc-comparison" aria-labelledby="scc-comparison-heading">
      <div className="container">
        <div className="section-heading scc-reveal">
          <p className="scc-eyebrow">{COMPARISON.eyebrow}</p>
          <h2 id="scc-comparison-heading">{COMPARISON.heading}</h2>
          <p>{COMPARISON.intro}</p>
        </div>
        <div className="scc-comparison__table scc-reveal-stagger">
          <div className="scc-comparison__row scc-comparison__row--head">
            <span></span>
            <span>Traditional Customer Support</span>
            <span>Salesforce Service Cloud</span>
          </div>
          {COMPARISON.rows.map((r) => (
            <div className="scc-comparison__row" key={r.label}>
              <span className="scc-comparison__label">{r.label}</span>
              <span className="scc-comparison__cell scc-comparison__cell--traditional">
                <span aria-hidden="true">{Ico.cross}</span> {r.traditional}
              </span>
              <span className="scc-comparison__cell scc-comparison__cell--service">
                <span aria-hidden="true">{Ico.check}</span> {r.serviceCloud}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// SERVICE CLOUD FEATURES
// ============================================================

function FeaturesSection() {
  return (
    <section className="section scc-features" id="features" aria-labelledby="scc-features-heading">
      <div className="container">
        <div className="scc-features__head scc-reveal">
          <img src={FEATURES.illo} alt="" aria-hidden="true" className="scc-features__illo" loading="lazy" />
          <div className="section-heading">
            <p className="scc-eyebrow">{FEATURES.eyebrow}</p>
            <h2 id="scc-features-heading">{FEATURES.heading}</h2>
            <p>{FEATURES.intro}</p>
          </div>
        </div>
        <div className="scc-features__grid scc-reveal-stagger">
          {FEATURES.items.map((f) => (
            <div className={`scc-feature-card ${f.illo ? "scc-feature-card--illo" : ""}`} key={f.title}>
              {f.illo ? (
                <img src={f.illo} alt="" aria-hidden="true" className="scc-feature-card__illo" loading="lazy" />
              ) : (
                <span className="scc-feature-card__check" aria-hidden="true">{Ico.check}</span>
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
// INDUSTRIES WE SERVE
// ============================================================

function IndustriesSection() {
  return (
    <section className="section scc-industries" aria-labelledby="scc-industries-heading">
      <div className="container">
        <div className="section-heading scc-reveal">
          <p className="scc-eyebrow">{INDUSTRIES.eyebrow}</p>
          <h2 id="scc-industries-heading">{INDUSTRIES.heading}</h2>
          <p>{INDUSTRIES.intro}</p>
        </div>
        <div className="scc-industries__grid scc-reveal-stagger">
          {INDUSTRIES.items.map((i) => (
            <div className="scc-industry-card" key={i.title}>
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
    <section className="section scc-process" aria-labelledby="scc-process-heading">
      <div className="container">
        <div className="scc-process__head scc-reveal">
          <div className="section-heading">
            <p className="scc-eyebrow">{PROCESS.eyebrow}</p>
            <h2 id="scc-process-heading">{PROCESS.heading}</h2>
            <p>{PROCESS.intro}</p>
          </div>
          <img src={PROCESS.illo} alt="" aria-hidden="true" className="scc-process__illo" loading="lazy" />
        </div>
        <div className="scc-process__rail scc-reveal-stagger">
          {PROCESS.steps.map((p, i) => (
            <div className="scc-step-card" key={p.name}>
              <span className="scc-step-card__num">{String(i + 1).padStart(2, "0")}</span>
              <h3>{p.name}</h3>
              <p>{p.description}</p>
              {i < PROCESS.steps.length - 1 && <span className="scc-step-card__arrow" aria-hidden="true">→</span>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// AI + SERVICE CLOUD
// ============================================================

function AiServiceCloudSection() {
  return (
    <section className="section scc-ai" aria-labelledby="scc-ai-heading">
      <div className="container">
        <div className="scc-ai__head scc-reveal">
          <div className="section-heading">
            <p className="scc-eyebrow">{AI_SERVICE_CLOUD.eyebrow}</p>
            <h2 id="scc-ai-heading">{AI_SERVICE_CLOUD.heading}</h2>
            <p>{AI_SERVICE_CLOUD.intro}</p>
          </div>
          <img src={AI_SERVICE_CLOUD.illo} alt="" aria-hidden="true" className="scc-ai__illo" loading="lazy" />
        </div>
        <div className="scc-ai__grid scc-reveal-stagger">
          {AI_SERVICE_CLOUD.items.map((a) => (
            <div className="scc-ai-card" key={a.title}>
              <span className="scc-ai-card__icon">{a.icon}</span>
              <h3>{a.title}</h3>
              <p>{a.description}</p>
            </div>
          ))}
        </div>
        <div className="scc-ai__cta scc-reveal">
          <Link to="/agentforce" className="btn btn-primary scc-btn">
            Explore Agentforce <span aria-hidden="true">→</span>
          </Link>
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
    <section className="section scc-why" aria-labelledby="scc-why-heading">
      <div className="container">
        <div className="section-heading scc-reveal">
          <p className="scc-eyebrow">{WHY_MIRKETA.eyebrow}</p>
          <h2 id="scc-why-heading">{WHY_MIRKETA.heading}</h2>
          <p>{WHY_MIRKETA.intro}</p>
        </div>
        <div className="scc-why__grid scc-reveal-stagger">
          {WHY_MIRKETA.items.map((w) => (
            <div className="scc-why-card" key={w.title}>
              <span className="scc-why-card__icon">{w.icon}</span>
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
// CASE STUDIES
// ============================================================

function CaseStudiesSection() {
  return (
    <section className="section scc-cases" aria-labelledby="scc-cases-heading">
      <div className="container">
        <div className="section-heading scc-reveal">
          <p className="scc-eyebrow">{CASE_STUDIES.eyebrow}</p>
          <h2 id="scc-cases-heading">{CASE_STUDIES.heading}</h2>
          <p>{CASE_STUDIES.intro}</p>
        </div>
        <div className="scc-cases__grid scc-reveal-stagger">
          {CASE_STUDIES.cases.map((c) => (
            <div className="scc-case-card" key={c.title}>
              <span className="scc-case-card__tag">{c.industry}</span>
              <h3>{c.title}</h3>
              <dl className="scc-case-card__fields">
                <div><dt>Challenge</dt><dd>{c.challenge}</dd></div>
                <div><dt>Solution</dt><dd>{c.solution}</dd></div>
                <div><dt>Outcome</dt><dd>{c.outcome}</dd></div>
              </dl>
              <div className="scc-case-card__metrics">
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
// TESTIMONIALS
// ============================================================

function TestimonialsSection() {
  return (
    <section className="section scc-testimonials" aria-labelledby="scc-testimonials-heading">
      <div className="container">
        <div className="section-heading scc-reveal">
          <p className="scc-eyebrow">Testimonials</p>
          <h2 id="scc-testimonials-heading">What Our Clients Say About Their Service Cloud Results</h2>
        </div>
        <div className="scc-testimonials__grid scc-reveal-stagger">
          {TESTIMONIALS.map((t) => (
            <figure className="scc-testimonial-card" key={t.name}>
              <img src={Images.iconQuote} alt="" aria-hidden="true" className="scc-testimonial-card__mark" />
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
// TECHNOLOGY ECOSYSTEM
// ============================================================

function TechEcosystemSection() {
  return (
    <section className="section scc-stack" aria-labelledby="scc-stack-heading">
      <div className="container">
        <div className="section-heading scc-reveal">
          <p className="scc-eyebrow">{TECH_ECOSYSTEM.eyebrow}</p>
          <h2 id="scc-stack-heading">{TECH_ECOSYSTEM.heading}</h2>
        </div>
        <ul className="scc-stack__wall scc-reveal-stagger">
          {TECH_ECOSYSTEM.items.map((t) => (
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
    <section className="section scc-faq" aria-labelledby="scc-faq-heading">
      <div className="container">
        <div className="section-heading scc-reveal">
          <p className="scc-eyebrow">FAQ</p>
          <h2 id="scc-faq-heading">Frequently Asked Questions About Salesforce Service Cloud</h2>
        </div>
        <div className="scc-faq__search-wrap scc-reveal">
          <label htmlFor="scc-faq-search" className="visually-hidden">
            Search frequently asked questions
          </label>
          <input
            id="scc-faq-search"
            type="search"
            className="scc-faq__search"
            placeholder="Ask a question — e.g. &quot;pricing&quot;, &quot;AI&quot;, &quot;security&quot;..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpenIndex(-1);
            }}
          />
        </div>
        <div className="scc-faq__list scc-reveal">
          {filtered.length === 0 ? (
            <p className="scc-faq__empty">No questions match &ldquo;{query}&rdquo;. Try a different search term.</p>
          ) : (
            filtered.map((item, i) => {
              const open = openIndex === i;
              const panelId = `scc-faq-panel-${i}`;
              return (
                <div className={`scc-faq-item ${open ? "is-open" : ""}`} key={item.q}>
                  <button type="button" className="scc-faq-item__question" aria-expanded={open} aria-controls={panelId} onClick={() => setOpenIndex(open ? -1 : i)}>
                    <span>{item.q}</span>
                    <span className="scc-faq-item__icon" aria-hidden="true">{open ? "−" : "+"}</span>
                  </button>
                  <div id={panelId} className="scc-faq-item__answer" role="region" hidden={!open}>
                    <p>{item.a}</p>
                  </div>
                </div>
              );
            })
          )}
        </div>
        <p className="scc-faq__links">
          Related reading: <Link to="/platforms/salesforce/development-consulting">Salesforce Development & Consulting</Link>,{" "}
          <Link to="/platforms/salesforce/clouds">Salesforce Clouds</Link>,{" "}
          <Link to="/platforms/salesforce/clouds/sales-cloud">Salesforce Sales Cloud</Link>,{" "}
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
    <section className="scc-final-cta scc-reveal" aria-labelledby="scc-final-cta-heading">
      <div className="container scc-final-cta__inner">
        <h2 id="scc-final-cta-heading">{FINAL_CTA.heading}</h2>
        <p>{FINAL_CTA.description}</p>
        <div className="scc-final-cta__ctas">
          <a href={FINAL_CTA.primaryCta.href} className="btn btn-primary scc-btn">
            {FINAL_CTA.primaryCta.label} <span aria-hidden="true">→</span>
          </a>
          <a href={FINAL_CTA.secondaryCta.href} className="btn btn-secondary scc-btn">
            {FINAL_CTA.secondaryCta.label}
          </a>
        </div>
        <Link to="/platforms/salesforce/clouds" className="scc-final-cta__all-services">
          Explore All Salesforce Clouds →
        </Link>
      </div>
    </section>
  );
}
