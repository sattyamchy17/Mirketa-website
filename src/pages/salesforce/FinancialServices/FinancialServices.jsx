import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Images } from "../../../assets/images/index.js";
import Seo from "../../../components/Seo/Seo.jsx";
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb.jsx";
import HeroVisual from "../../../components/HeroVisual/HeroVisual.jsx";
import ConsultationSection from "../../../components/ConsultationSection/ConsultationSection.jsx";
import "./FinancialServices.css";

gsap.registerPlugin(ScrollTrigger);

// ============================================================
// ICONS
// ============================================================

const Ico = {
  document: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 3h9l3 3v15H6z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M9 10h6M9 14h6M9 18h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
  ),
  building: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 21V9l8-5 8 5v12H4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="M9 21v-6h6v6" stroke="currentColor" strokeWidth="1.4" /></svg>
  ),
  gauge: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 16a8 8 0 1116 0" stroke="currentColor" strokeWidth="1.5" /><path d="M12 16l-4.5-3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /><circle cx="12" cy="16" r="1.3" fill="currentColor" /></svg>
  ),
  gear: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.4" /><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 2l8 4v6c0 5-4 8-8 10-4-2-8-5-8-10V6l8-4z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M8.5 12l2 2 5-5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  users: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="9" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.4" /><path d="M3.5 19c.6-3.4 2.9-5.2 5.5-5.2s4.9 1.8 5.5 5.2" stroke="currentColor" strokeWidth="1.4" /><circle cx="17" cy="9" r="2.6" stroke="currentColor" strokeWidth="1.3" opacity="0.7" /><path d="M15.5 13.4c2.2.3 3.7 1.9 4 4.6" stroke="currentColor" strokeWidth="1.3" opacity="0.7" /></svg>
  ),
  eye: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.4" /></svg>
  ),
  network: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="6" r="2.4" stroke="currentColor" strokeWidth="1.4" /><circle cx="6" cy="18" r="2.4" stroke="currentColor" strokeWidth="1.4" /><circle cx="18" cy="18" r="2.4" stroke="currentColor" strokeWidth="1.4" /><path d="M12 8.4L7 16M12 8.4l5 7.6M8.4 18h7.2" stroke="currentColor" strokeWidth="1.3" /></svg>
  ),
  clock: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" /><path d="M12 7v5l4 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  users2: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="8" cy="9" r="3" stroke="currentColor" strokeWidth="1.4" /><circle cx="16" cy="9" r="3" stroke="currentColor" strokeWidth="1.4" /><path d="M2.5 20c.6-3.4 2.8-5.5 5.5-5.5s4.9 2.1 5.5 5.5M10.5 20c.6-3.4 2.8-5.5 5.5-5.5s4.9 2.1 5.5 5.5" stroke="currentColor" strokeWidth="1.3" /></svg>
  ),
  compass: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" /><path d="M15 9l-2 6-6 2 2-6 6-2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  rocket: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 2c3 2 5 6 5 10 0 3-1 6-5 10-4-4-5-7-5-10 0-4 2-8 5-10z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><circle cx="12" cy="10" r="1.6" fill="currentColor" /></svg>
  ),
  layers: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3l9 5-9 5-9-5 9-5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M3 12l9 5 9-5M3 16l9 5 9-5" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /></svg>
  ),
  bank: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 21V9l8-5 8 5v12H4z" stroke="currentColor" strokeWidth="1.4" /><path d="M9 21v-6M15 21v-6" stroke="currentColor" strokeWidth="1.3" /></svg>
  ),
  chartUp: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 19V13M10 19V8M16 19v-5M20 19V5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
  ),
  sparkle: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /></svg>
  ),
  robot: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="5" y="9" width="14" height="10" rx="3" stroke="currentColor" strokeWidth="1.5" /><path d="M12 5v4M9 14h.01M15 14h.01" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /><circle cx="12" cy="4" r="1.4" fill="currentColor" /></svg>
  ),
  target: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.4" /><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.3" opacity="0.6" /><circle cx="12" cy="12" r="1.2" fill="currentColor" /></svg>
  ),
  award: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="8" r="5" stroke="currentColor" strokeWidth="1.4" /><path d="M8.5 12.5L7 21l5-2.5L17 21l-1.5-8.5" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  globe: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.4" /><path d="M3 12h18M12 3c2.5 2.5 3.5 6 3.5 9s-1 6.5-3.5 9c-2.5-2.5-3.5-6-3.5-9s1-6.5 3.5-9z" stroke="currentColor" strokeWidth="1.3" /></svg>
  ),
  headset: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 13a8 8 0 0116 0v4" stroke="currentColor" strokeWidth="1.5" /><rect x="3" y="13" width="4" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4" /><rect x="17" y="13" width="4" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4" /></svg>
  ),
  refresh: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 12a8 8 0 0113.7-5.7L20 8M20 4v4h-4M20 12a8 8 0 01-13.7 5.7L4 16M4 20v-4h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  cross: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 4v16M4 12h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
  ),
  check: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12.5l5 5L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  cloud: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6.5 16.5A4.2 4.2 0 017 8.2 5.5 5.5 0 0117.5 9.5 3.7 3.7 0 0117 17H7" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></svg>
  ),
  handshake: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 12l4-4 4 4-4 4-4-4zM21 12l-4-4-4 4 4 4 4-4z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M11 12h2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
  ),
  chip: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="7" y="7" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.4" /><path d="M9 3v4M15 3v4M9 21v-4M15 21v-4M3 9h4M3 15h4M21 9h-4M21 15h-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
  ),
};

// ============================================================
// DATA
// ============================================================

const BREADCRUMB = [
  { label: "Home", href: "/" },
  { label: "Platforms & Technology", href: "/platforms/salesforce/development-consulting" },
  { label: "Salesforce Financial Services Cloud" },
];

const HERO = {
  badge: "Salesforce Financial Services Cloud Partner",
  title: "Salesforce Financial Services Cloud Consulting & Implementation Services",
  description:
    "Transform customer relationships, advisor productivity, financial planning, and regulatory compliance with Salesforce Financial Services Cloud powered by AI, automation, and intelligent customer engagement.",
  primaryCta: { label: "Book a Discovery Call", href: "#contact" },
  secondaryCta: { label: "Talk to a Financial Cloud Expert", href: "#contact" },
};

const HERO_DASHBOARD = {
  title: "Financial Services Cloud Console",
  stats: [
    { label: "Advisor Productivity", value: "+34%", caption: "Regional bank engagement" },
    { label: "Client Retention", value: "+27%", caption: "Wealth management firm" },
    { label: "Onboarding Time", value: "-52%", caption: "Insurance carrier" },
  ],
  rows: [
    { title: "Customer 360 Rollout", meta: "Regional Bank — Advisor workspace", status: "Deployed", tone: "good" },
    { title: "Goals-based Planning", meta: "Wealth Management — AI engagement", status: "Live", tone: "good" },
    { title: "Digital Onboarding Flow", meta: "Insurance Carrier — Compliance checks", status: "In rollout", tone: "neutral" },
    { title: "Core Banking Integration", meta: "MuleSoft — Real-time sync", status: "Monitoring", tone: "attention" },
  ],
  floatingCards: [
    { icon: Ico.shield, title: "99.3%", subtitle: "Compliance Accuracy" },
    { icon: Ico.users, title: "300+", subtitle: "Financial Projects Delivered" },
  ],
};

const CHALLENGES = {
  eyebrow: "Financial Services Challenges",
  heading: "Challenges We Solve",
  intro: "Most financial institutions aren't short on customer relationships — they're short on a platform that connects data, advisors, and compliance. These are the problems we hear most before a Financial Services Cloud engagement.",
  illo: Images.illoComplianceWorkflow,
  items: [
    { icon: Ico.document, title: "Disconnected Customer Data", description: "Account, policy, and interaction data live in separate systems with no shared view." },
    { icon: Ico.gear, title: "Legacy Banking Systems", description: "Aging core systems can't support modern customer engagement expectations." },
    { icon: Ico.gauge, title: "Poor Advisor Productivity", description: "Advisors spend more time searching for information than serving clients." },
    { icon: Ico.document, title: "Manual Financial Processes", description: "Onboarding, approvals, and servicing rely on manual, paper-based steps." },
    { icon: Ico.shield, title: "Compliance Challenges", description: "Regulatory requirements slow down every new customer initiative." },
    { icon: Ico.users, title: "Customer Retention Issues", description: "Generic service and outreach fail to reflect real relationship value." },
    { icon: Ico.eye, title: "Limited Customer Insights", description: "Leadership can't see household or portfolio risk in real time." },
    { icon: Ico.network, title: "Siloed Financial Operations", description: "Sales, service, and back-office teams work from different systems." },
    { icon: Ico.clock, title: "Slow Loan Processing", description: "Manual underwriting and approval steps delay every application." },
    { icon: Ico.users2, title: "Disconnected Client Experiences", description: "Clients repeat themselves across every channel they contact you on." },
  ],
};

const SERVICES = {
  eyebrow: "Our Financial Services Cloud Services",
  heading: "End-to-End Financial Services Cloud Consulting & Implementation",
  intro: "From first strategy session to long-term managed support, our certified consultants handle every phase of your Financial Services Cloud transformation.",
  illo: Images.illoAdvisorWorkspace,
  items: [
    { icon: Ico.compass, title: "Financial Services Cloud Consulting", description: "Strategic assessment of your customer, advisor, and compliance workflows before configuration begins." },
    { icon: Ico.rocket, title: "Financial Services Cloud Implementation", description: "Full lifecycle deployment configured around how your institution actually serves customers." },
    { icon: Ico.users, title: "Customer 360", description: "A unified view of every account, policy, and interaction across the household.", illo: Images.illoCustomer360Financial },
    { icon: Ico.chartUp, title: "Wealth Management Solutions", description: "Portfolio, goals, and financial planning tools built for advisor workflows.", illo: Images.illoWealthPortfolioDashboard },
    { icon: Ico.bank, title: "Retail Banking CRM", description: "Unified customer engagement across branch, digital, and call center channels." },
    { icon: Ico.building, title: "Commercial Banking CRM", description: "Relationship management built for complex commercial banking portfolios." },
    { icon: Ico.shield, title: "Insurance CRM", description: "Policy, claims, and agent workflows unified in a single platform." },
    { icon: Ico.document, title: "Mortgage Lending Solutions", description: "Loan origination and servicing workflows connected to the customer record." },
    { icon: Ico.users2, title: "Financial Advisor Workspace", description: "A single workspace giving advisors client goals, accounts, and next actions." },
    { icon: Ico.rocket, title: "Client Onboarding Automation", description: "Digital onboarding flows that replace manual paperwork." },
    { icon: Ico.network, title: "Relationship Management", description: "Household and business relationship mapping across every product line." },
    { icon: Ico.shield, title: "Compliance Automation", description: "Automated compliance checks and audit trails built into every workflow." },
    { icon: Ico.sparkle, title: "Salesforce AI for Financial Services", description: "Einstein-powered insights and recommendations grounded in your own data." },
    { icon: Ico.headset, title: "Managed Services", description: "A dedicated team keeping your Financial Services Cloud org healthy long-term." },
    { icon: Ico.gear, title: "Support & Optimization", description: "Ongoing tuning of workflows, automation, and integrations." },
  ],
};

const CAPABILITIES = {
  eyebrow: "Platform Capabilities",
  heading: "Every Financial Services Cloud Capability, Configured to Perform",
  intro: "We configure each capability around your actual relationship model — not a generic template.",
  illo: Images.illoWealthPortfolioDashboard,
  items: [
    { icon: Ico.users, title: "Customer 360" },
    { icon: Ico.network, title: "Relationship Management" },
    { icon: Ico.bank, title: "Financial Account Management" },
    { icon: Ico.users2, title: "Household Management" },
    { icon: Ico.document, title: "Action Plans" },
    { icon: Ico.target, title: "Goals & Financial Planning" },
    { icon: Ico.handshake, title: "Referral Tracking" },
    { icon: Ico.gauge, title: "Advisor Productivity" },
    { icon: Ico.sparkle, title: "Einstein AI" },
    { icon: Ico.gear, title: "Workflow Automation" },
    { icon: Ico.headset, title: "Digital Customer Engagement" },
    { icon: Ico.chartUp, title: "Analytics & Reporting" },
  ],
};

const INDUSTRIES = {
  eyebrow: "Industries We Serve",
  heading: "Financial Services Cloud Expertise Across the Industry",
  intro: "Regulatory and relationship models differ sharply across financial services sub-verticals — we bring specific context to every engagement.",
  items: [
    { icon: Ico.bank, title: "Retail Banking" },
    { icon: Ico.building, title: "Commercial Banking" },
    { icon: Ico.handshake, title: "Credit Unions" },
    { icon: Ico.shield, title: "Insurance" },
    { icon: Ico.chartUp, title: "Wealth Management" },
    { icon: Ico.layers, title: "Investment Banking" },
    { icon: Ico.layers, title: "Asset Management" },
    { icon: Ico.document, title: "Mortgage Lending" },
    { icon: Ico.target, title: "Private Equity" },
    { icon: Ico.chip, title: "FinTech" },
    { icon: Ico.users2, title: "Financial Advisory" },
    { icon: Ico.globe, title: "Capital Markets" },
  ],
};

const AI_FSC = {
  eyebrow: "AI + Financial Services Cloud",
  heading: "How AI Makes Every Client Relationship Smarter",
  intro: "AI in Financial Services Cloud isn't a chatbot bolted onto a banking app — configured correctly, it becomes the layer that flags risk, personalizes engagement, and guides advisors in real time.",
  illo: Images.illoAiFinancialInsights,
  items: [
    { icon: Ico.sparkle, title: "AI Financial Insights", description: "Portfolio and account signals surfaced automatically from customer data." },
    { icon: Ico.target, title: "Personalized Recommendations", description: "Product and service recommendations grounded in real customer behavior." },
    { icon: Ico.shield, title: "Customer Risk Analysis", description: "Risk profiles calculated continuously as customer data changes." },
    { icon: Ico.gauge, title: "Intelligent Lead Scoring", description: "Leads ranked automatically so advisors focus on the highest-value relationships." },
    { icon: Ico.robot, title: "Advisor Copilot", description: "Real-time guidance surfaced directly inside the advisor workspace." },
    { icon: Ico.chartUp, title: "Predictive Analytics", description: "Retention and growth patterns predicted before they show up in a report." },
    { icon: Ico.gear, title: "AI Workflow Automation", description: "Flow-driven approvals and servicing steps with zero manual work." },
    { icon: Ico.eye, title: "Client Engagement Intelligence", description: "Next-best engagement surfaced automatically for every household." },
  ],
};

const INTEGRATIONS = {
  eyebrow: "Integration Section",
  heading: "Financial Services Cloud, Connected to Your Full Stack",
  intro: "Customer and account data are only as useful as the systems they reach. We connect Financial Services Cloud to the platforms your institution already runs.",
  illo: Images.illoCoreBankingIntegration,
  items: [
    { icon: Ico.bank, title: "Core Banking Systems" },
    { icon: Ico.layers, title: "ERP" },
    { icon: Ico.layers, title: "Salesforce Data Cloud" },
    { icon: Ico.sparkle, title: "Marketing Cloud" },
    { icon: Ico.headset, title: "Service Cloud" },
    { icon: Ico.globe, title: "Experience Cloud" },
    { icon: Ico.network, title: "MuleSoft" },
    { icon: Ico.cloud, title: "Payment Gateways" },
    { icon: Ico.document, title: "Document Management Systems" },
    { icon: Ico.chip, title: "Third-party Financial Platforms" },
  ],
};

const PROCESS = {
  eyebrow: "Implementation Process",
  heading: "A Structured Path From Discovery to Go-Live",
  intro: "No surprises, no scope creep. Our Financial Services Cloud delivery framework has been refined across hundreds of implementations.",
  illo: Images.illoComplianceWorkflow,
  steps: [
    { name: "Discovery", description: "We map your current customer, advisor, and compliance workflows." },
    { name: "Business Assessment", description: "A structured audit of relationship data and process gaps." },
    { name: "Solution Architecture", description: "Data model and integration architecture, fully documented." },
    { name: "Configuration", description: "Core Financial Services Cloud setup — accounts, roles, and relationships." },
    { name: "Customization", description: "Action plans, goals, and workflows tailored to your service model." },
    { name: "Data Migration", description: "Customer and account data migrated with full validation." },
    { name: "Integration", description: "Connecting Financial Services Cloud to core banking and back-office systems." },
    { name: "Testing", description: "UAT, regression testing, and security review before go-live." },
    { name: "Training", description: "Role-based training so advisors and staff are productive on day one." },
    { name: "Go Live", description: "Structured cutover with go-live support on-site or remote." },
    { name: "Continuous Optimization", description: "Hypercare and ongoing optimization after launch." },
  ],
};

const BENEFITS = {
  eyebrow: "Benefits",
  heading: "What a Properly Configured Financial Services Cloud Delivers",
  intro: "These are the outcomes our financial services clients report after their Financial Services Cloud engagement — not vanity metrics.",
  items: [
    { icon: Ico.users, title: "Improve Customer Relationships", description: "Every interaction grounded in full household and portfolio context." },
    { icon: Ico.gauge, title: "Increase Advisor Productivity", description: "Advisors spend more time serving clients and less time searching for data." },
    { icon: Ico.target, title: "Deliver Personalized Financial Services", description: "Recommendations and outreach grounded in real customer goals." },
    { icon: Ico.shield, title: "Improve Compliance", description: "Automated checks and audit trails built into every workflow." },
    { icon: Ico.rocket, title: "Accelerate Customer Onboarding", description: "Digital onboarding flows that replace manual paperwork." },
    { icon: Ico.gear, title: "Increase Operational Efficiency", description: "Automation removes manual servicing and approval steps." },
    { icon: Ico.eye, title: "Real-time Customer Insights", description: "Leadership sees household and portfolio risk as it changes." },
    { icon: Ico.sparkle, title: "AI-powered Decision Making", description: "Recommendations grounded in real customer and market data." },
    { icon: Ico.shield, title: "Secure Customer Data", description: "Bank-grade security and governance built into the platform." },
    { icon: Ico.layers, title: "Scalable Financial Platform", description: "A platform that grows with new products, regions, and regulations." },
  ],
};

const WHY_MIRKETA = {
  eyebrow: "Why Mirketa",
  heading: "A Financial Services Cloud Partner That Understands Regulated Industries",
  intro: "Hundreds of partners can configure Financial Services Cloud. Fewer can tie every decision back to a measurable relationship and compliance outcome.",
  items: [
    { icon: Ico.award, title: "Certified Salesforce Financial Services Experts", description: "Consultants holding active Financial Services Cloud and Platform certifications." },
    { icon: Ico.building, title: "Industry-specific Experience", description: "Deep experience across banking, insurance, and wealth management." },
    { icon: Ico.sparkle, title: "AI-powered Financial Solutions", description: "Einstein AI is part of the architecture, not an afterthought." },
    { icon: Ico.shield, title: "Secure Enterprise Architecture", description: "Bank-grade security and governance built into every engagement." },
    { icon: Ico.document, title: "Regulatory Compliance Knowledge", description: "Compliance considered from the first discovery session, not bolted on later." },
    { icon: Ico.compass, title: "End-to-End Implementation", description: "One team from discovery through go-live and ongoing optimization." },
    { icon: Ico.globe, title: "Global Delivery Model", description: "A delivery model built to support distributed financial institutions." },
    { icon: Ico.headset, title: "24×7 Managed Support", description: "A support model built for institutions that never fully close." },
  ],
};

const SUCCESS_METRICS = [
  { value: "300+", label: "Financial Projects Delivered" },
  { value: "150+", label: "Certified Salesforce Consultants" },
  { value: "15+", label: "Countries Served" },
  { value: "98%", label: "Customer Satisfaction" },
  { value: "80+", label: "Enterprise Clients" },
  { value: "15+", label: "Years of Salesforce Experience" },
];

const CASE_STUDIES = {
  eyebrow: "Customer Success Stories",
  heading: "Real Financial Services Cloud Outcomes From Real Deployments",
  intro: "Anonymized results from recent Financial Services Cloud engagements across the industry.",
  cases: [
    {
      title: "Regional Bank Increases Advisor Productivity by 34%",
      industry: "Retail Banking",
      challenge: "Advisors spent hours each week reconstructing customer context across disconnected banking systems.",
      solution: "We implemented Customer 360 and a unified advisor workspace connected to core banking data.",
      outcome: "Advisors now open every conversation with full household context already visible.",
      roi: "34% Productivity Gain",
      metrics: [{ value: "34%", label: "Higher Advisor Productivity" }, { value: "41%", label: "Faster Case Resolution" }, { value: "4.7★", label: "Client Satisfaction" }],
    },
    {
      title: "Wealth Management Firm Improves Client Retention by 27%",
      industry: "Wealth Management",
      challenge: "Client outreach was generic and disconnected from actual portfolio performance or life events.",
      solution: "We deployed goals-based financial planning tools with AI-driven engagement recommendations.",
      outcome: "Advisors now reach out at the moments that matter most to each client's goals.",
      roi: "27% Retention Improvement",
      metrics: [{ value: "27%", label: "Higher Retention" }, { value: "31%", label: "More Referrals" }, { value: "22%", label: "AUM Growth" }],
    },
    {
      title: "Insurance Carrier Cuts Onboarding Time by 52%",
      industry: "Insurance",
      challenge: "New policyholder onboarding relied on manual paperwork and disconnected underwriting systems.",
      solution: "We built digital onboarding workflows with automated compliance checks connected to the policy record.",
      outcome: "New policyholders are onboarded digitally with full audit trail visibility.",
      roi: "52% Faster Onboarding",
      metrics: [{ value: "52%", label: "Faster Onboarding" }, { value: "38%", label: "Fewer Manual Errors" }, { value: "99.3%", label: "Compliance Accuracy" }],
    },
  ],
};

const FAQS = [
  { q: "What is Salesforce Financial Services Cloud?", a: "Salesforce Financial Services Cloud is a CRM built specifically for banks, credit unions, wealth management firms, and insurance providers, combining Customer 360, relationship management, and compliance tools with standard Salesforce capabilities." },
  { q: "What does Salesforce Financial Services Cloud implementation involve?", a: "Implementation covers discovery, business assessment, solution architecture, configuration, customization, data migration, integration, testing, training, and go-live — typically over 10–16 weeks depending on scope." },
  { q: "What does Financial Services Cloud consulting include?", a: "Our consulting starts with a discovery phase that maps your current customer, advisor, and compliance workflows. From there we deliver a prioritized roadmap covering implementation, AI, and integration — each recommendation tied to a measurable business outcome." },
  { q: "Can Financial Services Cloud work as a banking CRM?", a: "Yes. Financial Services Cloud supports retail and commercial banking use cases including unified customer profiles, relationship management, and cross-channel engagement across branch, digital, and call center." },
  { q: "Is Financial Services Cloud suitable for insurance CRM use cases?", a: "Yes. We configure Financial Services Cloud for insurance carriers and agencies to unify policy, claims, and agent data, with compliance and audit trail requirements built in from the start." },
  { q: "How does Financial Services Cloud support wealth management?", a: "Financial Services Cloud includes goals-based financial planning, action plans, and a dedicated advisor workspace that gives wealth managers a unified view of every client's accounts, goals, and household relationships." },
  { q: "What AI capabilities are available in Financial Services Cloud?", a: "Financial Services Cloud includes Einstein AI for risk analysis, lead scoring, and personalized recommendations, alongside an advisor copilot that surfaces guidance directly inside the workspace — all trained on your own customer data." },
  { q: "What systems can Financial Services Cloud integrate with?", a: "We integrate Financial Services Cloud with core banking systems, ERP platforms, payment gateways, document management systems, and other Salesforce clouds using MuleSoft or REST APIs." },
  { q: "How much does a Financial Services Cloud implementation cost?", a: "Pricing depends on scope, user count, and integration complexity. Most implementations range from $40,000 to $180,000. We provide a detailed, fixed-scope proposal after a free discovery consultation." },
  { q: "How long does a typical implementation timeline take?", a: "A focused implementation for a single business line typically takes 10–16 weeks. Multi-entity deployments with complex core banking integration can take 6–9 months, depending on scope." },
  { q: "Can you migrate our existing CRM data into Financial Services Cloud?", a: "Yes. We migrate customer, account, and relationship data from legacy CRMs and core systems, including deduplication and validation, so you start on Financial Services Cloud with a trustworthy foundation." },
  { q: "Do you offer managed services after go-live?", a: "Yes. Our managed services model gives you access to certified Financial Services Cloud admins and developers on a monthly retainer, covering configuration changes, compliance updates, and ongoing optimization." },
];

const FINAL_CTA = {
  heading: "Transform Financial Services with Salesforce",
  description: "Partner with Mirketa to modernize customer engagement, empower financial advisors, and accelerate digital transformation using Salesforce Financial Services Cloud.",
  primaryCta: { label: "Book a Discovery Call", href: "#contact" },
  secondaryCta: { label: "Talk to an Expert", href: "#contact" },
};

const SEO = {
  title: "Salesforce Financial Services Cloud Consulting & Implementation | Mirketa",
  description:
    "Mirketa's certified Salesforce consultants deliver Financial Services Cloud implementation, Customer 360, advisor productivity, and AI-powered engagement for banks, insurers, and wealth managers.",
  canonical: "https://mirketa.us/salesforce-financial-services/",
  keywords: [
    "Salesforce Financial Services Cloud",
    "Salesforce Financial Services Consulting",
    "Salesforce Financial Services Cloud Implementation",
    "Financial Services Cloud Partner",
    "Banking CRM",
    "Wealth Management CRM",
    "Insurance CRM",
    "Financial Advisor CRM",
    "Salesforce Banking Solutions",
    "Financial CRM Platform",
    "AI for Financial Services",
    "Customer 360 for Financial Services",
  ],
  schema: [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "Salesforce Financial Services Cloud Consulting and Implementation",
      provider: { "@type": "Organization", name: "Mirketa Inc.", url: "https://mirketa.us" },
      name: "Salesforce Financial Services Cloud Consulting & Implementation",
      description:
        "End-to-end Salesforce Financial Services Cloud consulting, implementation, Customer 360, advisor productivity, compliance automation, and AI-powered engagement for financial institutions.",
      areaServed: "Global",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://mirketa.us/" },
        { "@type": "ListItem", position: 2, name: "Platforms & Technology", item: "https://mirketa.us/platforms/salesforce/development-consulting" },
        { "@type": "ListItem", position: 3, name: "Salesforce Financial Services Cloud", item: "https://mirketa.us/salesforce-financial-services/" },
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
    <div className="fsc-metric-stat" ref={ref}>
      <strong>{display}</strong>
      <span>{label}</span>
    </div>
  );
}

// ============================================================
// MAIN COMPONENT
// ============================================================

export default function FinancialServices() {
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

      gsap.utils.toArray(".fsc-reveal").forEach((el) => {
        gsap.from(el, {
          opacity: prefersReduced ? 1 : 0,
          y: prefersReduced ? 0 : 32,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      gsap.utils.toArray(".fsc-reveal-stagger").forEach((el) => {
        gsap.from(el.children, {
          opacity: prefersReduced ? 1 : 0,
          y: prefersReduced ? 0 : 26,
          duration: 0.6,
          stagger: 0.05,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      gsap.utils.toArray(".fsc-zoom-in").forEach((el) => {
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
    <div className="salesforce-financial-services">
      <Seo {...SEO} />
      <HeroSection heroTextRef={heroTextRef} heroRef={heroRef} />
      <TrustedBySection />
      <ChallengesSection />
      <ServicesSection />
      <CapabilitiesSection />
      <IndustriesSection />
      <AiFscSection />
      <IntegrationsSection />
      <ProcessSection />
      <BenefitsSection />
      <WhyMirketaSection />
      <SuccessMetricsSection />
      <CaseStudiesSection />
      <FaqSection />
      <FinalCtaSection />
      <ConsultationSection
        eyebrow="Get Started"
        heading="Talk to a Financial Services Cloud Expert"
        description="Tell us about your advisor workflows, compliance requirements, and current systems — a Financial Services Cloud expert will follow up within one business day."
        formTitle="Talk to a Financial Services Cloud Expert"
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
    <div className={`fsc-sticky-cta ${visible ? "is-visible" : ""}`} aria-hidden={!visible}>
      <a href="#contact" className="btn btn-primary fsc-btn" tabIndex={visible ? 0 : -1}>
        Book a Discovery Call <span aria-hidden="true">→</span>
      </a>
    </div>
  );
}

// ============================================================
// HERO
// ============================================================

function HeroSection({ heroTextRef, heroRef }) {
  return (
    <section ref={heroRef} className="fsc-hero" style={{ backgroundImage: `url("${Images.heroSalesforceFinancialServices}")` }} aria-label="Salesforce Financial Services Cloud by Mirketa">
      <div className="fsc-hero__scrim" />
      <div className="container">
        <Breadcrumb items={BREADCRUMB} className="fsc-breadcrumb" />
        <div className="fsc-hero__inner">
          <div ref={heroTextRef} className="fsc-hero__text">
            <span className="fsc-badge">
              <span aria-hidden="true">✦</span> {HERO.badge}
            </span>
            <h1>{HERO.title}</h1>
            <p className="fsc-hero__description">{HERO.description}</p>
            <div className="fsc-hero__ctas">
              <a href={HERO.primaryCta.href} className="btn btn-primary fsc-btn">
                {HERO.primaryCta.label} <span aria-hidden="true">→</span>
              </a>
              <a href={HERO.secondaryCta.href} className="btn btn-secondary fsc-btn">
                {HERO.secondaryCta.label}
              </a>
            </div>
          </div>

          <HeroVisual
            dashboardTitle={HERO_DASHBOARD.title}
            stats={HERO_DASHBOARD.stats}
            rows={HERO_DASHBOARD.rows}
            floatingCards={HERO_DASHBOARD.floatingCards}
            className="fsc-hero__visual"
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
    <section className="fsc-trusted" aria-label="Trusted by financial institutions">
      <div className="container fsc-trusted__inner">
        <p className="fsc-trusted__label">Trusted By</p>
        <div className="fsc-trusted__track" role="list">
          <div className="fsc-trusted__marquee">
            {loop.map((b, i) => (
              <div className="fsc-trusted__badge" role="listitem" key={`${b.label}-${i}`}>
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
// CHALLENGES WE SOLVE
// ============================================================

function ChallengesSection() {
  return (
    <section className="section fsc-challenges" aria-labelledby="fsc-challenges-heading">
      <div className="container">
        <div className="fsc-challenges__head fsc-reveal">
          <div className="section-heading">
            <p className="fsc-eyebrow">{CHALLENGES.eyebrow}</p>
            <h2 id="fsc-challenges-heading">{CHALLENGES.heading}</h2>
            <p>{CHALLENGES.intro}</p>
          </div>
          <img src={CHALLENGES.illo} alt="" aria-hidden="true" className="fsc-challenges__illo" loading="lazy" />
        </div>
        <div className="fsc-challenges__grid fsc-reveal-stagger">
          {CHALLENGES.items.map((c) => (
            <div className="fsc-challenge-card" key={c.title}>
              <span className="fsc-challenge-card__icon">{c.icon}</span>
              <h3>{c.title}</h3>
              <p>{c.description}</p>
            </div>
          ))}
        </div>
        <div className="fsc-section-cta fsc-reveal">
          <a href="#contact" className="btn btn-primary fsc-btn">
            Talk to a Financial Cloud Expert <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// OUR FINANCIAL SERVICES CLOUD SERVICES
// ============================================================

function ServicesSection() {
  return (
    <section className="section fsc-services" id="services" aria-labelledby="fsc-services-heading">
      <div className="container">
        <div className="fsc-services__head fsc-reveal">
          <div className="section-heading">
            <p className="fsc-eyebrow">{SERVICES.eyebrow}</p>
            <h2 id="fsc-services-heading">{SERVICES.heading}</h2>
            <p>{SERVICES.intro}</p>
          </div>
          <img src={SERVICES.illo} alt="" aria-hidden="true" className="fsc-services__illo" loading="lazy" />
        </div>
        <div className="fsc-services__grid fsc-reveal-stagger">
          {SERVICES.items.map((s) => (
            <div className="fsc-service-card" key={s.title}>
              {s.illo ? (
                <img src={s.illo} alt="" aria-hidden="true" className="fsc-service-card__illo" loading="lazy" />
              ) : (
                <span className="fsc-service-card__icon">{s.icon}</span>
              )}
              <h3>{s.title}</h3>
              <p>{s.description}</p>
            </div>
          ))}
        </div>
        <div className="fsc-section-cta fsc-reveal">
          <a href="#contact" className="btn btn-primary fsc-btn">
            Book a Discovery Call <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// PLATFORM CAPABILITIES
// ============================================================

function CapabilitiesSection() {
  return (
    <section className="section fsc-capabilities" aria-labelledby="fsc-capabilities-heading">
      <div className="container">
        <div className="fsc-capabilities__head fsc-reveal">
          <img src={CAPABILITIES.illo} alt="" aria-hidden="true" className="fsc-capabilities__illo" loading="lazy" />
          <div className="section-heading">
            <p className="fsc-eyebrow">{CAPABILITIES.eyebrow}</p>
            <h2 id="fsc-capabilities-heading">{CAPABILITIES.heading}</h2>
            <p>{CAPABILITIES.intro}</p>
          </div>
        </div>
        <div className="fsc-capabilities__grid fsc-reveal-stagger">
          {CAPABILITIES.items.map((c) => (
            <div className="fsc-capability-card" key={c.title}>
              <span className="fsc-capability-card__icon">{c.icon}</span>
              <h3>{c.title}</h3>
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
    <section className="section fsc-industries" aria-labelledby="fsc-industries-heading">
      <div className="container">
        <div className="section-heading fsc-reveal">
          <p className="fsc-eyebrow">{INDUSTRIES.eyebrow}</p>
          <h2 id="fsc-industries-heading">{INDUSTRIES.heading}</h2>
          <p>{INDUSTRIES.intro}</p>
        </div>
        <div className="fsc-industries__grid fsc-reveal-stagger">
          {INDUSTRIES.items.map((i) => (
            <div className="fsc-industry-card" key={i.title}>
              <span className="fsc-industry-card__icon">{i.icon}</span>
              <h3>{i.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// AI + FINANCIAL SERVICES CLOUD
// ============================================================

function AiFscSection() {
  return (
    <section className="section fsc-ai" aria-labelledby="fsc-ai-heading">
      <div className="container">
        <div className="fsc-ai__head fsc-reveal">
          <div className="section-heading">
            <p className="fsc-eyebrow">{AI_FSC.eyebrow}</p>
            <h2 id="fsc-ai-heading">{AI_FSC.heading}</h2>
            <p>{AI_FSC.intro}</p>
          </div>
          <img src={AI_FSC.illo} alt="" aria-hidden="true" className="fsc-ai__illo" loading="lazy" />
        </div>
        <div className="fsc-ai__grid fsc-reveal-stagger">
          {AI_FSC.items.map((a) => (
            <div className="fsc-ai-card" key={a.title}>
              <span className="fsc-ai-card__icon">{a.icon}</span>
              <h3>{a.title}</h3>
              <p>{a.description}</p>
            </div>
          ))}
        </div>
        <div className="fsc-ai__cta fsc-reveal">
          <Link to="/agentforce" className="btn btn-primary fsc-btn">
            Explore Agentforce <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// INTEGRATION SECTION
// ============================================================

function IntegrationsSection() {
  return (
    <section className="section fsc-integrations" id="integrations" aria-labelledby="fsc-integrations-heading">
      <div className="container">
        <div className="fsc-integrations__head fsc-reveal">
          <img src={INTEGRATIONS.illo} alt="" aria-hidden="true" className="fsc-integrations__illo" loading="lazy" />
          <div className="section-heading">
            <p className="fsc-eyebrow">{INTEGRATIONS.eyebrow}</p>
            <h2 id="fsc-integrations-heading">{INTEGRATIONS.heading}</h2>
            <p>{INTEGRATIONS.intro}</p>
          </div>
        </div>
        <div className="fsc-integrations__grid fsc-reveal-stagger">
          {INTEGRATIONS.items.map((i) => (
            <div className="fsc-integration-card" key={i.title}>
              <span className="fsc-integration-card__icon">{i.icon}</span>
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
    <section className="section fsc-process" aria-labelledby="fsc-process-heading">
      <div className="container">
        <div className="fsc-process__head fsc-reveal">
          <div className="section-heading">
            <p className="fsc-eyebrow">{PROCESS.eyebrow}</p>
            <h2 id="fsc-process-heading">{PROCESS.heading}</h2>
            <p>{PROCESS.intro}</p>
          </div>
          <img src={PROCESS.illo} alt="" aria-hidden="true" className="fsc-process__illo" loading="lazy" />
        </div>
        <div className="fsc-process__rail fsc-reveal-stagger">
          {PROCESS.steps.map((p, i) => (
            <div className="fsc-step-card" key={p.name}>
              <span className="fsc-step-card__num">{String(i + 1).padStart(2, "0")}</span>
              <h3>{p.name}</h3>
              <p>{p.description}</p>
              {i < PROCESS.steps.length - 1 && <span className="fsc-step-card__arrow" aria-hidden="true">→</span>}
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
    <section className="section fsc-benefits" aria-labelledby="fsc-benefits-heading">
      <div className="container">
        <div className="section-heading fsc-reveal">
          <p className="fsc-eyebrow">{BENEFITS.eyebrow}</p>
          <h2 id="fsc-benefits-heading">{BENEFITS.heading}</h2>
          <p>{BENEFITS.intro}</p>
        </div>
        <div className="fsc-benefits__grid fsc-reveal-stagger">
          {BENEFITS.items.map((b) => (
            <div className="fsc-benefit-card" key={b.title}>
              <span className="fsc-benefit-card__icon">{b.icon}</span>
              <h3>{b.title}</h3>
              <p>{b.description}</p>
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
    <section className="section fsc-why" aria-labelledby="fsc-why-heading">
      <div className="container">
        <div className="section-heading fsc-reveal">
          <p className="fsc-eyebrow">{WHY_MIRKETA.eyebrow}</p>
          <h2 id="fsc-why-heading">{WHY_MIRKETA.heading}</h2>
          <p>{WHY_MIRKETA.intro}</p>
        </div>
        <div className="fsc-why__grid fsc-reveal-stagger">
          {WHY_MIRKETA.items.map((w) => (
            <div className="fsc-why-card" key={w.title}>
              <span className="fsc-why-card__icon">{w.icon}</span>
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
    <section className="fsc-metrics" aria-label="Mirketa Financial Services Cloud success metrics">
      <div className="container">
        <div className="fsc-metrics__grid fsc-reveal-stagger">
          {SUCCESS_METRICS.map((m) => (
            <AnimatedCounter key={m.label} value={m.value} label={m.label} />
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
    <section className="section fsc-cases" aria-labelledby="fsc-cases-heading">
      <div className="container">
        <div className="section-heading fsc-reveal">
          <p className="fsc-eyebrow">{CASE_STUDIES.eyebrow}</p>
          <h2 id="fsc-cases-heading">{CASE_STUDIES.heading}</h2>
          <p>{CASE_STUDIES.intro}</p>
        </div>
        <div className="fsc-cases__grid fsc-reveal-stagger">
          {CASE_STUDIES.cases.map((c) => (
            <div className="fsc-case-card" key={c.title}>
              <span className="fsc-case-card__tag">{c.industry}</span>
              <h3>{c.title}</h3>
              <dl className="fsc-case-card__fields">
                <div><dt>Customer Challenge</dt><dd>{c.challenge}</dd></div>
                <div><dt>Implemented Solution</dt><dd>{c.solution}</dd></div>
                <div><dt>Business Outcome</dt><dd>{c.outcome}</dd></div>
                <div><dt>ROI Achieved</dt><dd>{c.roi}</dd></div>
              </dl>
              <div className="fsc-case-card__metrics">
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
    <section className="section fsc-faq" aria-labelledby="fsc-faq-heading">
      <div className="container">
        <div className="section-heading fsc-reveal">
          <p className="fsc-eyebrow">FAQ</p>
          <h2 id="fsc-faq-heading">Frequently Asked Questions About Salesforce Financial Services Cloud</h2>
        </div>
        <div className="fsc-faq__search-wrap fsc-reveal">
          <label htmlFor="fsc-faq-search" className="visually-hidden">
            Search frequently asked questions
          </label>
          <input
            id="fsc-faq-search"
            type="search"
            className="fsc-faq__search"
            placeholder="Ask a question — e.g. &quot;pricing&quot;, &quot;banking CRM&quot;, &quot;AI&quot;..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpenIndex(-1);
            }}
          />
        </div>
        <div className="fsc-faq__list fsc-reveal">
          {filtered.length === 0 ? (
            <p className="fsc-faq__empty">No questions match &ldquo;{query}&rdquo;. Try a different search term.</p>
          ) : (
            filtered.map((item, i) => {
              const open = openIndex === i;
              const panelId = `fsc-faq-panel-${i}`;
              return (
                <div className={`fsc-faq-item ${open ? "is-open" : ""}`} key={item.q}>
                  <button type="button" className="fsc-faq-item__question" aria-expanded={open} aria-controls={panelId} onClick={() => setOpenIndex(open ? -1 : i)}>
                    <span>{item.q}</span>
                    <span className="fsc-faq-item__icon" aria-hidden="true">{open ? "−" : "+"}</span>
                  </button>
                  <div id={panelId} className="fsc-faq-item__answer" role="region" hidden={!open}>
                    <p>{item.a}</p>
                  </div>
                </div>
              );
            })
          )}
        </div>
        <p className="fsc-faq__links">
          Related reading: <Link to="/platforms/salesforce/development-consulting">Salesforce Consulting & Development Services</Link>,{" "}
          <Link to="/platforms/salesforce/developer-services">Salesforce Developer Services</Link>,{" "}
          <Link to="/salesforce-ai-services">Salesforce AI Services</Link>, <Link to="/platforms/salesforce/clouds">Salesforce Clouds</Link>,{" "}
          <Link to="/data-cloud">Data Cloud</Link>, <Link to="/agentforce">Agentforce</Link>, <Link to="/ai-consulting">AI Consulting</Link>,{" "}
          <Link to="/platforms/salesforce/clouds/health-cloud">Healthcare Solutions</Link>,{" "}
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
    <section className="fsc-final-cta fsc-reveal" aria-labelledby="fsc-final-cta-heading">
      <div className="container fsc-final-cta__inner">
        <h2 id="fsc-final-cta-heading">{FINAL_CTA.heading}</h2>
        <p>{FINAL_CTA.description}</p>
        <div className="fsc-final-cta__ctas">
          <a href={FINAL_CTA.primaryCta.href} className="btn btn-primary fsc-btn">
            {FINAL_CTA.primaryCta.label} <span aria-hidden="true">→</span>
          </a>
          <a href={FINAL_CTA.secondaryCta.href} className="btn btn-secondary fsc-btn">
            {FINAL_CTA.secondaryCta.label}
          </a>
        </div>
        <Link to="/platforms/salesforce/development-consulting" className="fsc-final-cta__all-services">
          Explore All Salesforce Services →
        </Link>
      </div>
    </section>
  );
}
