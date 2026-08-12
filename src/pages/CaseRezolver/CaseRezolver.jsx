import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Images } from "../../assets/images/index.js";
import Seo from "../../components/Seo/Seo.jsx";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb.jsx";
import ConsultationSection from "../../components/ConsultationSection/ConsultationSection.jsx";
import heroBg from "../../assets/images/case-rezolver/hero-bg.svg";
import heroIllustration from "../../assets/images/case-rezolver/hero-illustration.svg";
import overviewImg from "../../assets/images/case-rezolver/overview.svg";
import workflowImg from "../../assets/images/case-rezolver/workflow.svg";
import integrationImg from "../../assets/images/case-rezolver/integration.svg";
import automationImg from "../../assets/images/case-rezolver/automation.svg";
import featuresImg from "../../assets/images/case-rezolver/features.svg";
import benefitsImg from "../../assets/images/case-rezolver/benefits.svg";
import analyticsImg from "../../assets/images/case-rezolver/analytics.svg";
import ctaImg from "../../assets/images/case-rezolver/cta.svg";
import "./CaseRezolver.css";

gsap.registerPlugin(ScrollTrigger);

// ============================================================
// ICONS — small inline SVGs for component-local iconography
// (page-specific glyphs; the 10 illustrations above are the
// only file-based images per this page's asset spec)
// ============================================================

const Ico = {
  human: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" /><path d="M3.5 20c0-3 2.5-5 5.5-5s5.5 2 5.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><path d="M15.5 12.5l1.5 1.5 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  salesforce: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6.5 16.5A4.2 4.2 0 017 8.2 5.5 5.5 0 0117.5 9.5 3.7 3.7 0 0117 17H7" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></svg>
  ),
  book: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 3h9l3 3v15H6V3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="M9 9h6M9 13h6M9 17h4" stroke="currentColor" strokeWidth="1.2" opacity="0.6" /></svg>
  ),
  steering: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" /><circle cx="12" cy="12" r="2.2" fill="currentColor" /><path d="M12 5v5M6 16.5l4.5-2.6M18 16.5l-4.5-2.6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
  ),
  shieldCheck: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="M9 12l2 2 4-4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  search: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="10" cy="10" r="6.5" stroke="currentColor" strokeWidth="1.5" /><path d="M19 19l-4.5-4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
  ),
  scatterDot: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="6" cy="7" r="2" stroke="currentColor" strokeWidth="1.4" /><circle cx="18" cy="9" r="2" stroke="currentColor" strokeWidth="1.4" /><circle cx="9" cy="17" r="2" stroke="currentColor" strokeWidth="1.4" /></svg>
  ),
  robot: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="5" y="9" width="14" height="10" rx="3" stroke="currentColor" strokeWidth="1.5" /><path d="M12 5v4M9 14h.01M15 14h.01" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /><circle cx="12" cy="4" r="1.4" fill="currentColor" /></svg>
  ),
  lock: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="5" y="11" width="14" height="9" rx="2" stroke="currentColor" strokeWidth="1.5" /><path d="M8 11V7.5a4 4 0 018 0V11" stroke="currentColor" strokeWidth="1.5" /></svg>
  ),
  chart: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 20V10M11 20V4M18 20v-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
  ),
  workspace: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="5" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" /><path d="M8 21h8M12 17v4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
  ),
  context: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 3h9l3 3v15H6V3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" opacity="0.6" /><circle cx="17" cy="16" r="4" stroke="currentColor" strokeWidth="1.3" /><path d="M17 14v2l1.3.8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" /></svg>
  ),
  knowledge: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 4a8 8 0 00-4.5 14.5c.7.5 1.1 1.3 1.1 2.1v.4h6.8v-.4c0-.8.4-1.6 1.1-2.1A8 8 0 0012 4z" stroke="currentColor" strokeWidth="1.5" /><path d="M9.5 21h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
  ),
  compare: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="7" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" /><circle cx="17" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" /></svg>
  ),
  reply: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 8L4 12l5 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /><path d="M4 12h9a6 6 0 016 6v1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
  ),
  eye: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.4" /></svg>
  ),
  ruler: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="9" width="18" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" /><path d="M7 9v3M11 9v3M15 9v3" stroke="currentColor" strokeWidth="1.3" /></svg>
  ),
  building: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 21V9l8-5 8 5v12H4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="M9 21v-6h6v6" stroke="currentColor" strokeWidth="1.4" /></svg>
  ),
  factory: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 20V11l5 3.5V11l5 3.5V9l5 4v7H3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  heartbeat: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 21s-7-4-7-10V5l7-3 7 3v6c0 6-7 10-7 10z" stroke="currentColor" strokeWidth="1.4" /><path d="M8 12h2l1.5-3 2 6 1.5-3H16" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  bank: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 21V9l8-5 8 5v12H4z" stroke="currentColor" strokeWidth="1.4" /><path d="M9 21v-6M15 21v-6" stroke="currentColor" strokeWidth="1.3" /></svg>
  ),
  chip: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="7" y="7" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" /><path d="M12 3v3M12 18v3M3 12h3M18 12h3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
  ),
  check: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12.5l5 5L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
};

// ============================================================
// DATA — content sourced verbatim from
// https://mirketa.us/salesforce-ai-case-management/
// ============================================================

const BREADCRUMB_ITEMS = [{ label: "Home", href: "/" }, { label: "Case Rezolver" }];

const HERO = {
  badge: "Salesforce-Native AI Case Management",
  title: "AI Case Management That Helps Service Teams Resolve Cases Faster and More Consistently",
  description:
    "Mirketa's AI-powered case management accelerator gives Salesforce Service Cloud agents a trusted assistant inside the Case record. It summarizes case context, recommends next-best resolution steps, highlights relevant precedent, and keeps the agent in control from investigation to customer response.",
  primaryCta: { label: "Book an AI Case Management Demo", href: "#contact" },
  secondaryCta: { label: "See How It Works", href: "#flow" },
};

const HERO_METRICS = [
  { title: "Lower Average Handle Time", note: "Indicative average handle time reduction" },
  { title: "Higher Agent Productivity", note: "Agent productivity improvement" },
  { title: "24/7 Knowledge Assistance", note: "Guidance available when agents need it" },
  { title: "Trust Built In", note: "Human review and governed customer context" },
];

const TECH_CHIPS = ["Salesforce Service Cloud", "Agent Assist", "Knowledge Management", "Responsible AI", "Human-in-the-Loop", "Secure Enterprise AI"];

const TRUST_BADGES = [
  { icon: Images.clientSalesforce, label: "Salesforce Partner" },
  { icon: Images.clientSoc2, label: "SOC 2" },
  { icon: Images.clientHipaa, label: "HIPAA" },
  { icon: Images.clientEnterprise, label: "Enterprise Ready" },
];

const PRINCIPLES = {
  eyebrow: "Answer Guardrails",
  heading: "Recommendations are shown only when there is enough enterprise context to support them.",
  items: [
    { icon: Ico.human, title: "Human-in-the-loop by design", description: "Agents approve every next step. The assistant guides, explains, and learns from the final resolution." },
    { icon: Ico.salesforce, title: "Salesforce-native experience", description: "AI guidance appears in the agent workspace, reducing research time without adding another portal." },
    { icon: Ico.book, title: "Precedent-backed answers", description: "Recommendations are grounded in approved knowledge, prior resolutions, policies, and case history." },
    { icon: Ico.steering, title: "Rep-in-control workflow", description: "The accelerator supports investigation, response drafting, and escalation while agents make the decision." },
    { icon: Ico.shieldCheck, title: "Responsible AI guardrails", description: "Governed context, explainable recommendations, and feedback loops help teams scale AI safely." },
  ],
};

const CHALLENGE = {
  eyebrow: "The Service Operations Challenge",
  heading: "The service operations challenge",
  subheading: "Support leaders need faster case resolution without inconsistent answers, knowledge gaps, or uncontrolled AI risk.",
  intro:
    "High-volume service teams spend too much time searching case history, knowledge articles, tickets, policies, and customer context before they can recommend a resolution. The result is longer handle time, slower onboarding, inconsistent customer experience, and limited visibility into which answers are actually working.",
  items: [
    { n: "01", title: "Agents spend time searching", description: "Reps lose valuable minutes moving between case history, knowledge articles, product notes, support tickets, and account context." },
    { n: "02", title: "Resolution quality varies", description: "New and experienced agents often interpret the same issue differently, which can create inconsistent next steps and customer messaging." },
    { n: "03", title: "Generic AI lacks context", description: "Customer service AI must understand company policies, resolved cases, product details, and escalation rules before it can be trusted." },
    { n: "04", title: "Customer context is sensitive", description: "Case management workflows often include personal, account, entitlement, and contractual information that must remain governed." },
    { n: "05", title: "Service leaders need measurable ROI", description: "AI adoption must connect to tangible metrics such as average handle time, MTTR, first-contact resolution, and agent productivity." },
  ],
};

const MEET = {
  eyebrow: "Meet the Accelerator",
  heading: "A Salesforce-native AI assistant that turns institutional knowledge into guided case resolution.",
  description:
    "The accelerator works where service reps already work: inside Salesforce Service Cloud. It reads the case context, finds relevant precedent, explains the suggested path, supports customer communication, and captures feedback so the knowledge base improves over time.",
  capabilities: [
    { title: "Guided next steps", description: "Agents receive concise case summaries, likely resolution paths, recommended actions, and suggested customer responses." },
    { title: "Precedent and policy awareness", description: "The assistant draws from approved support knowledge and prior outcomes so recommendations reflect how your business actually resolves cases." },
    { title: "Governed human-in-the-loop AI", description: "Security, access controls, explainability, and rep approval are built into the workflow from pilot through scale." },
  ],
  flow: ["Case opened", "AI assistant ready", "Context reviewed", "Precedent found", "Guidance prepared", "Guardrails checked", "Agent response"],
};

const ARCHITECTURE = {
  eyebrow: "Trust-First Solution Architecture",
  heading: "A protected resolution intelligence layer for Salesforce Service Cloud.",
  intro:
    "The accelerator connects Salesforce case workflows with approved knowledge, business rules, and responsible AI controls. The technical foundation remains configurable, but the buyer value is simple: agents get helpful guidance only when there is enough trusted context to support it.",
  dataSources: ["Salesforce", "Knowledge", "Case History", "Policies", "Product Data"],
  steps: [
    { icon: Ico.context, title: "Secure case context", description: "The assistant works from Salesforce case details, entitlements, interaction history, and approved access rules so recommendations respect the customer and the rep's permissions." },
    { icon: Ico.knowledge, title: "Enterprise knowledge activation", description: "Approved articles, prior resolutions, policies, product notes, and operational knowledge are made available to the assistant without forcing agents to search each system manually." },
    { icon: Ico.compare, title: "Precedent-aware matching", description: "The accelerator looks for similar resolved cases and relevant business context, helping the rep understand what worked before and why it applies now." },
    { icon: Ico.shieldCheck, title: "Responsible recommendation guardrails", description: "Answer generation is constrained by trusted context, policy fit, and confidence signals so the assistant can recommend, defer, or guide escalation appropriately." },
    { icon: Ico.reply, title: "Agent-ready synthesis", description: "The rep receives a concise case summary, suggested next steps, supporting rationale, and optional response language rather than a black-box answer." },
    { icon: Ico.chart, title: "Feedback and continuous improvement", description: "Rep acceptance, edits, escalations, and final resolutions create an improvement loop for service leaders to tune adoption, knowledge quality, and outcomes." },
  ],
};

const DIFFERENCE = {
  eyebrow: "Why It Is Different",
  heading: "Purpose-built for service operations, not a generic chatbot bolted onto CRM.",
  intro:
    "Mirketa's accelerator combines Salesforce delivery experience, service-process knowledge, and reusable AI patterns so clients can move faster than a custom build while retaining governance, configurability, and business fit.",
  items: [
    { title: "Built around the case record", description: "Agents stay in the Salesforce workflow, with guidance surfaced where investigation, communication, escalation, and closure happen." },
    { title: "Trusted recommendation behavior", description: "The assistant is designed to recommend only when context supports it and to guide escalation when the answer is not clear." },
    { title: "Precedent-aware intelligence", description: "Prior resolutions, policies, product knowledge, and customer context work together so reps see why a path is recommended." },
    { title: "Governance from pilot to scale", description: "Access, auditability, source visibility, and human review are part of the operating model, not afterthoughts." },
    { title: "Flexible enterprise deployment", description: "The accelerator can align with each client's security, data, model, integration, and packaging preferences." },
  ],
};

const CAPABILITIES = {
  eyebrow: "Key Capabilities",
  heading: "Capabilities that improve the agent experience and service performance.",
  intro:
    "The page-level details stay business-safe, but the accelerator includes reusable components for case understanding, guided resolution, agent communication, governance, and measurement.",
  items: [
    { icon: Ico.workspace, title: "Agent workspace assistant", description: "Surface summaries, suggested actions, and response guidance directly inside the Salesforce Service Cloud experience." },
    { icon: Ico.context, title: "Context-aware recommendations", description: "Use case details, relevant history, policies, and product context to help reps move from issue diagnosis to next action." },
    { icon: Ico.knowledge, title: "Knowledge activation", description: "Make approved support knowledge easier to find and reuse without requiring agents to manually search every repository." },
    { icon: Ico.lock, title: "Secure customer context", description: "Respect access rules, data sensitivity, and enterprise governance expectations as case information is used for AI assistance." },
    { icon: Ico.compare, title: "Precedent matching", description: "Help agents compare the current issue with similar cases and known patterns to choose a more reliable path." },
    { icon: Ico.reply, title: "Response assistance", description: "Draft customer-friendly explanations, follow-up questions, and escalation summaries that agents can review and edit." },
    { icon: Ico.eye, title: "Explainable guidance", description: "Show supporting context and rationale so agents understand why a recommendation is being suggested." },
    { icon: Ico.ruler, title: "Outcome measurement", description: "Track usage, acceptance, resolution outcomes, and productivity indicators to inform service leadership decisions." },
  ],
};

const OUTCOMES = {
  eyebrow: "Indicative Outcomes",
  heading: "Designed to improve service productivity, answer consistency, and customer experience.",
  disclaimer:
    "Actual results vary by service volume, knowledge readiness, process complexity, and adoption. The accelerator is designed around measurable service metrics such as average handle time, MTTR, first-contact resolution, answer acceptance, escalation rate, and agent onboarding speed.",
  items: [
    { title: "Lower Average Handle Time", description: "By surfacing the right precedent and next-step guidance faster." },
    { title: "Higher Agent Productivity", description: "By reducing manual search, case research, and knowledge comparison." },
    { title: "More Consistent Answers", description: "By helping reps reuse approved knowledge and proven resolution patterns." },
    { title: "Faster MTTR", description: "With guided investigation, resolution suggestions, and response support inside the Case workflow." },
  ],
};

const DELIVERY = {
  eyebrow: "Delivery Model",
  heading: "A practical accelerator path from service use case to measurable adoption.",
  intro: "Mirketa packages the repeatable delivery patterns while tailoring the experience to each client's queues, knowledge sources, security posture, and Salesforce operating model.",
  phases: [
    { name: "Align", description: "Prioritize the service queues, case types, agent journeys, and business metrics that will define pilot success." },
    { name: "Activate", description: "Make the highest-value knowledge and case context available through governed enterprise access patterns." },
    { name: "Configure", description: "Adapt the accelerator experience, guardrails, prompts, workflow states, and rep handoffs to your service process." },
    { name: "Pilot", description: "Launch with a focused group of agents, gather acceptance feedback, and compare productivity and quality indicators." },
    { name: "Measure", description: "Review usage, resolution outcomes, answer quality, escalation patterns, and adoption signals with service leadership." },
    { name: "Scale", description: "Expand across products, queues, regions, and channels with a governed packaging and enhancement roadmap." },
  ],
};

const WHERE_IT_FITS = {
  eyebrow: "Where It Fits",
  heading: "Built for enterprise service operations where accuracy matters.",
  intro: "The accelerator is especially useful for support teams with complex products, regulated data, distributed knowledge, high case volume, and repeatable resolution patterns.",
  items: [
    { icon: Ico.building, title: "Enterprise service desks", description: "Support internal and external users with faster agent guidance across multiple knowledge systems." },
    { icon: Ico.factory, title: "Manufacturing support", description: "Resolve SKU, parts, warranty, and field issue cases using product-specific domain boosts." },
    { icon: Ico.heartbeat, title: "Healthcare service", description: "Protect sensitive member, patient, or account information while accelerating support workflows." },
    { icon: Ico.bank, title: "Financial services", description: "Use PII-safe retrieval and governance-ready answer controls for regulated service operations." },
    { icon: Ico.chip, title: "High-tech support", description: "Guide reps through incidents, known issues, technical symptoms, and prior resolutions for faster customer updates." },
  ],
};

const TESTIMONIALS = [
  { quote: "The value is not just faster answers. It is giving every rep a repeatable path to the right next step while preserving expert judgment.", role: "Service Operations Leader", org: "Enterprise Service Cloud" },
  { quote: "The biggest shift was consistency. Agents could see similar cases, recommended actions, and suggested customer language in one workflow.", role: "VP Customer Support", org: "High-Tech Product Company" },
  { quote: "The governance-first design made the accelerator easier to evaluate for regulated support operations and leadership adoption.", role: "CRM Transformation Sponsor", org: "Financial Services" },
];

const DEMO = {
  eyebrow: "Request a Demo",
  heading: "Schedule an AI Case Management Consultation",
  description: "Talk to Mirketa about where agent assist, guided resolution, secure customer context, and measurable service productivity can create the fastest impact.",
  benefits: [
    "Review your Service Cloud case resolution workflows and knowledge sources.",
    "Identify the right pilot queue and measurable success criteria.",
    "Map governance requirements for data access, human review, source visibility, and responsible AI controls.",
    "Design a practical path from proof of value to production rollout.",
  ],
  formTitle: "Request a Free Salesforce AI Case Management Consultation",
};

const FAQS = [
  { q: "What is AI-powered case management for Salesforce Service Cloud?", a: "AI-powered case management helps Salesforce Service Cloud teams use AI to summarize cases, find relevant knowledge, recommend next steps, draft customer responses, and improve resolution consistency. Mirketa's accelerator delivers this as a Salesforce-native agent assist experience with business guardrails and human approval." },
  { q: "Is this an autonomous customer service AI agent?", a: "No. The accelerator is intentionally designed as a human-in-the-loop assistant. It supports investigation, recommends actions, prepares response language, and explains context, but the service rep reviews and approves every customer-facing action." },
  { q: "How does the accelerator improve agent productivity?", a: "It reduces manual search and context switching by bringing case summaries, similar resolution patterns, approved knowledge, recommended next steps, and response assistance into the Salesforce workflow. Teams can measure impact through average handle time, MTTR, acceptance rate, escalation rate, and first-contact resolution." },
  { q: "How does it reduce the risk of incorrect AI answers?", a: "The assistant is designed to ground recommendations in approved knowledge and relevant service context. When context is insufficient, the experience can guide the rep toward escalation, additional investigation, or a follow-up question rather than forcing an unsupported answer." },
  { q: "Can it use our existing service knowledge?", a: "Yes. The accelerator can be scoped around existing Salesforce knowledge, resolved cases, policies, product information, ticketing history, and other approved enterprise repositories. Mirketa typically starts with the highest-value sources for a focused pilot and expands after validation." },
  { q: "How does it support responsible AI governance?", a: "The accelerator supports governance through role-aware access, source visibility, human review, audit-friendly interaction tracking, and configurable controls aligned to the client's security and service operating model." },
  { q: "What teams benefit most from AI case resolution?", a: "High-volume support teams, enterprise service desks, high-tech support, manufacturing service, healthcare service, and financial services teams benefit when they have repeatable case types, distributed knowledge, complex products, or regulated customer context." },
  { q: "How long does a pilot take?", a: "Pilot timing depends on use case scope, knowledge readiness, security review, Salesforce configuration, and integration needs. Mirketa recommends beginning with a focused service queue, measurable success metrics, and a controlled set of knowledge sources before expanding across the service organization." },
];

const SEO = {
  title: "Salesforce AI Case Management — Case Rezolver | Mirketa",
  description:
    "Case Rezolver gives Salesforce Service Cloud agents an AI assistant that summarizes cases, recommends next steps, and cites precedent — with humans approving every action.",
  canonical: "https://www.mirketa.com/salesforce-ai-case-management/",
  keywords: [
    "Salesforce AI case management",
    "Case Rezolver",
    "AI agent assist Salesforce",
    "Salesforce Service Cloud AI",
    "case resolution AI",
    "AI case routing",
    "human-in-the-loop customer service AI",
    "Salesforce knowledge management AI",
    "responsible AI customer service",
    "AI case summarization",
    "service desk AI automation",
    "enterprise case management AI",
  ],
  schema: [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "Salesforce-Native AI Case Management",
      provider: { "@type": "Organization", name: "Mirketa Inc.", url: "https://www.mirketa.com" },
      name: "Case Rezolver & Management",
      description:
        "An AI-powered case management accelerator for Salesforce Service Cloud that summarizes case context, recommends next-best resolution steps, and highlights relevant precedent under human approval.",
      areaServed: "Global",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.mirketa.com/" },
        { "@type": "ListItem", position: 2, name: "Salesforce AI Case Management", item: "https://www.mirketa.com/salesforce-ai-case-management/" },
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

const FINAL_CTA = {
  heading: "Ready to give every Salesforce support rep a smarter path to resolution?",
  description: "Modernize case management with a Salesforce-native AI accelerator that improves agent productivity, answer consistency, knowledge reuse, and responsible service operations.",
  cta: { label: "Start the Conversation", href: "#contact" },
};

// ============================================================
// MAIN COMPONENT
// ============================================================

export default function CaseRezolver() {
  const heroTextRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (heroTextRef.current) {
        gsap.from(heroTextRef.current.children, {
          opacity: 0,
          y: 28,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
        });
      }

      gsap.utils.toArray(".cr-reveal").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 32,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      gsap.utils.toArray(".cr-reveal-stagger").forEach((el) => {
        gsap.from(el.children, {
          opacity: 0,
          y: 26,
          duration: 0.6,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      gsap.utils.toArray(".cr-zoom-in").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          scale: 0.92,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="case-rezolver">
      <Seo {...SEO} />
      <HeroSection heroTextRef={heroTextRef} />
      <PrinciplesSection />
      <ChallengeSection />
      <MeetSection />
      <ArchitectureSection />
      <DifferenceSection />
      <CapabilitiesSection />
      <OutcomesSection />
      <DeliverySection />
      <WhereItFitsSection />
      <TestimonialsSection />
      <FaqSection />
      <FinalCtaSection />
      <ContactSection />
    </div>
  );
}

// ============================================================
// HERO — case-routing backdrop + floating service-console illustration
// ============================================================

function HeroSection({ heroTextRef }) {
  return (
    <section className="cr-hero" style={{ backgroundImage: `url("${heroBg}")` }} aria-label="Case Rezolver — Salesforce-native AI case management">
      <div className="cr-hero__scrim" />
      <div className="container">
        <Breadcrumb items={BREADCRUMB_ITEMS} className="cr-breadcrumb" />
      </div>
      <div className="container cr-hero__inner">
        <div ref={heroTextRef} className="cr-hero__text">
          <span className="cr-badge">
            <span className="cr-badge__spark" aria-hidden="true">✦</span> {HERO.badge}
          </span>
          <p className="cr-hero__eyebrow">Salesforce-Native AI Case Management</p>
          <h1>{HERO.title}</h1>
          <p className="cr-hero__description">{HERO.description}</p>
          <div className="cr-hero__ctas">
            <a href={HERO.primaryCta.href} className="btn btn-primary cr-btn">
              {HERO.primaryCta.label} <span aria-hidden="true">→</span>
            </a>
            <a href={HERO.secondaryCta.href} className="btn btn-secondary cr-btn">
              {HERO.secondaryCta.label}
            </a>
          </div>
          <div className="cr-hero__chips">
            {TECH_CHIPS.map((c) => (
              <span key={c}>{c}</span>
            ))}
          </div>
          <div className="cr-hero__trust">
            <span className="cr-hero__trust-label">Backed by Mirketa's enterprise credentials</span>
            <div className="cr-hero__trust-badges">
              {TRUST_BADGES.map((b) => (
                <img key={b.label} src={b.icon} alt={b.label} loading="lazy" />
              ))}
            </div>
          </div>
        </div>

        <div className="cr-hero__illustration cr-zoom-in">
          <img src={heroIllustration} alt="Salesforce Service Console showing case #43821 with AI resolution guidance, matched precedent, and secure case context" />
        </div>
      </div>

      <div className="cr-hero__metrics cr-reveal-stagger">
        {HERO_METRICS.map((m) => (
          <div className="cr-hero-metric" key={m.title}>
            <strong>{m.title}</strong>
            <span>{m.note}</span>
          </div>
        ))}
      </div>

      <button
        type="button"
        className="cr-scroll-indicator"
        onClick={() => document.getElementById("flow")?.scrollIntoView({ behavior: "smooth" })}
        aria-label="Scroll to how it works"
      >
        <span />
      </button>
    </section>
  );
}

// ============================================================
// ANSWER GUARDRAILS / DESIGN PRINCIPLES
// ============================================================

function PrinciplesSection() {
  return (
    <section className="section cr-principles" aria-labelledby="cr-principles-heading">
      <div className="container">
        <div className="section-heading cr-reveal">
          <p className="cr-eyebrow">{PRINCIPLES.eyebrow}</p>
          <h2 id="cr-principles-heading">{PRINCIPLES.heading}</h2>
        </div>
        <div className="cr-principles__row cr-reveal-stagger">
          {PRINCIPLES.items.map((p) => (
            <div className="cr-principle-chip" key={p.title}>
              <span className="cr-principle-chip__icon">{p.icon}</span>
              <h3>{p.title}</h3>
              <p>{p.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// THE SERVICE OPERATIONS CHALLENGE — ghost-numeral stack
// ============================================================

function ChallengeSection() {
  return (
    <section className="section cr-challenge" aria-labelledby="cr-challenge-heading">
      <div className="container">
        <div className="section-heading cr-reveal">
          <p className="cr-eyebrow">{CHALLENGE.eyebrow}</p>
          <h2 id="cr-challenge-heading">{CHALLENGE.subheading}</h2>
          <p>{CHALLENGE.intro}</p>
        </div>
        <div className="cr-challenge__stack cr-reveal-stagger">
          {CHALLENGE.items.map((c) => (
            <div className="cr-challenge-row" key={c.n}>
              <span className="cr-challenge-row__ghost" aria-hidden="true">{c.n}</span>
              <div>
                <h3>{c.title}</h3>
                <p>{c.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// MEET THE ACCELERATOR — capabilities + case resolution flow rail
// ============================================================

function MeetSection() {
  return (
    <section className="section cr-meet" id="flow" aria-labelledby="cr-meet-heading">
      <div className="container cr-meet__grid">
        <div className="cr-meet__text cr-reveal">
          <p className="cr-eyebrow">{MEET.eyebrow}</p>
          <h2 id="cr-meet-heading">{MEET.heading}</h2>
          <p>{MEET.description}</p>
          <ul className="cr-meet__capabilities">
            {MEET.capabilities.map((c) => (
              <li key={c.title}>
                <span aria-hidden="true">{Ico.check}</span>
                <div>
                  <h3>{c.title}</h3>
                  <p>{c.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="cr-meet__image cr-zoom-in">
          <img src={overviewImg} alt="AI assistant reviewing a case summary and surfacing a human-approved next step" loading="lazy" />
        </div>
      </div>

      <div className="container cr-meet__flow-wrap">
        <p className="cr-meet__flow-label">Case Resolution Flow</p>
        <div className="cr-meet__flow cr-reveal-stagger">
          {MEET.flow.map((step, i) => (
            <div className="cr-flow-node" key={step}>
              <span className="cr-flow-node__dot">{i + 1}</span>
              <span className="cr-flow-node__label">{step}</span>
              {i < MEET.flow.length - 1 && <span className="cr-flow-node__connector" aria-hidden="true" />}
            </div>
          ))}
        </div>
        <div className="cr-meet__diagram">
          <img src={workflowImg} alt="Diagram of the six-stage case resolution flow from case opened to response approved" loading="lazy" />
        </div>
      </div>
    </section>
  );
}

// ============================================================
// TRUST-FIRST SOLUTION ARCHITECTURE — zigzag timeline
// ============================================================

function ArchitectureSection() {
  return (
    <section className="section cr-architecture" aria-labelledby="cr-architecture-heading">
      <div className="container">
        <div className="section-heading cr-reveal">
          <p className="cr-eyebrow">{ARCHITECTURE.eyebrow}</p>
          <h2 id="cr-architecture-heading">{ARCHITECTURE.heading}</h2>
          <p>{ARCHITECTURE.intro}</p>
        </div>
        <div className="cr-architecture__image cr-reveal">
          <img src={integrationImg} alt="Salesforce Service Cloud connected to Knowledge, Case History, Policies, and Product Data sources" loading="lazy" />
        </div>
        <ul className="cr-architecture__sources cr-reveal-stagger">
          {ARCHITECTURE.dataSources.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>
        <div className="cr-architecture__zigzag cr-reveal-stagger">
          {ARCHITECTURE.steps.map((s, i) => (
            <div className={`cr-zigzag-row ${i % 2 === 1 ? "is-reversed" : ""}`} key={s.title}>
              <div className="cr-zigzag-row__content">
                <span className="cr-zigzag-row__icon">{s.icon}</span>
                <h3>
                  {i + 1}. {s.title}
                </h3>
                <p>{s.description}</p>
              </div>
              <span className="cr-zigzag-row__node" aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// WHY IT IS DIFFERENT
// ============================================================

function DifferenceSection() {
  return (
    <section className="section cr-difference" aria-labelledby="cr-difference-heading">
      <div className="container">
        <div className="section-heading cr-reveal">
          <p className="cr-eyebrow">{DIFFERENCE.eyebrow}</p>
          <h2 id="cr-difference-heading">{DIFFERENCE.heading}</h2>
          <p>{DIFFERENCE.intro}</p>
        </div>
        <div className="cr-difference__image cr-reveal">
          <img src={benefitsImg} alt="Checklist of Case Rezolver differentiators including governance and precedent-aware intelligence" loading="lazy" />
        </div>
        <div className="cr-difference__grid cr-reveal-stagger">
          {DIFFERENCE.items.map((d) => (
            <div className="cr-difference-card" key={d.title}>
              <h3>{d.title}</h3>
              <p>{d.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// KEY CAPABILITIES — 4x2 grid
// ============================================================

function CapabilitiesSection() {
  return (
    <section className="section cr-capabilities" aria-labelledby="cr-capabilities-heading">
      <div className="container">
        <div className="section-heading cr-reveal">
          <p className="cr-eyebrow">{CAPABILITIES.eyebrow}</p>
          <h2 id="cr-capabilities-heading">{CAPABILITIES.heading}</h2>
          <p>{CAPABILITIES.intro}</p>
        </div>
        <div className="cr-capabilities__image cr-reveal">
          <img src={featuresImg} alt="Grid of Salesforce Service Cloud AI capability tiles" loading="lazy" />
        </div>
        <div className="cr-capabilities__grid cr-reveal-stagger">
          {CAPABILITIES.items.map((c) => (
            <div className="cr-capability-card" key={c.title}>
              <span className="cr-capability-card__icon">{c.icon}</span>
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
// INDICATIVE OUTCOMES
// ============================================================

function OutcomesSection() {
  return (
    <section className="section cr-outcomes" aria-labelledby="cr-outcomes-heading">
      <div className="cr-outcomes__bg" style={{ backgroundImage: `url("${analyticsImg}")` }} aria-hidden="true" />
      <div className="container">
        <div className="section-heading cr-reveal">
          <p className="cr-eyebrow">{OUTCOMES.eyebrow}</p>
          <h2 id="cr-outcomes-heading">{OUTCOMES.heading}</h2>
        </div>
        <div className="cr-outcomes__grid cr-reveal-stagger">
          {OUTCOMES.items.map((o) => (
            <div className="cr-outcome-card" key={o.title}>
              <h3>{o.title}</h3>
              <p>{o.description}</p>
            </div>
          ))}
        </div>
        <p className="cr-outcomes__disclaimer cr-reveal">{OUTCOMES.disclaimer}</p>
      </div>
    </section>
  );
}

// ============================================================
// DELIVERY MODEL — connected pill stepper
// ============================================================

function DeliverySection() {
  return (
    <section className="section cr-delivery" aria-labelledby="cr-delivery-heading">
      <div className="container">
        <div className="section-heading cr-reveal">
          <p className="cr-eyebrow">{DELIVERY.eyebrow}</p>
          <h2 id="cr-delivery-heading">{DELIVERY.heading}</h2>
          <p>{DELIVERY.intro}</p>
        </div>
        <div className="cr-delivery__stepper cr-reveal-stagger">
          {DELIVERY.phases.map((p, i) => (
            <div className="cr-delivery-phase" key={p.name}>
              <span className="cr-delivery-phase__pill">
                {String(i + 1).padStart(2, "0")} {p.name}
              </span>
              <p>{p.description}</p>
            </div>
          ))}
        </div>
        <div className="cr-delivery__image cr-reveal">
          <img src={automationImg} alt="Six-phase delivery roadmap from Align through Scale" loading="lazy" />
        </div>
      </div>
    </section>
  );
}

// ============================================================
// WHERE IT FITS
// ============================================================

function WhereItFitsSection() {
  return (
    <section className="section cr-fits" aria-labelledby="cr-fits-heading">
      <div className="container">
        <div className="section-heading cr-reveal">
          <p className="cr-eyebrow">{WHERE_IT_FITS.eyebrow}</p>
          <h2 id="cr-fits-heading">{WHERE_IT_FITS.heading}</h2>
          <p>{WHERE_IT_FITS.intro}</p>
        </div>
        <div className="cr-fits__grid cr-reveal-stagger">
          {WHERE_IT_FITS.items.map((f) => (
            <div className="cr-fit-card" key={f.title}>
              <span className="cr-fit-card__icon">{f.icon}</span>
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
// ENTERPRISE SERVICE IMPACT — testimonials
// ============================================================

function TestimonialsSection() {
  return (
    <section className="section cr-testimonials" aria-labelledby="cr-testimonials-heading">
      <div className="container">
        <div className="section-heading cr-reveal">
          <p className="cr-eyebrow">Enterprise Service Impact</p>
          <h2 id="cr-testimonials-heading">Give every agent the knowledge of your best support experts.</h2>
        </div>
        <div className="cr-testimonials__grid cr-reveal-stagger">
          {TESTIMONIALS.map((t) => (
            <figure className="cr-testimonial-card" key={t.role}>
              <img src={Images.iconQuote} alt="" aria-hidden="true" className="cr-testimonial-card__mark" />
              <blockquote>{t.quote}</blockquote>
              <figcaption>
                <strong>{t.role}</strong>
                <span>{t.org}</span>
              </figcaption>
            </figure>
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
    <section className="section cr-faq" aria-labelledby="cr-faq-heading">
      <div className="container">
        <div className="section-heading cr-reveal">
          <p className="cr-eyebrow">FAQ</p>
          <h2 id="cr-faq-heading">Questions service leaders ask about AI-powered case management</h2>
          <p>These answers are written for buyers evaluating Salesforce Service Cloud AI, agent assist, customer service automation, responsible AI governance, and enterprise case management modernization.</p>
        </div>
        <div className="cr-faq__search-wrap cr-reveal">
          <label htmlFor="cr-faq-search" className="visually-hidden">
            Search frequently asked questions
          </label>
          <input
            id="cr-faq-search"
            type="search"
            className="cr-faq__search"
            placeholder="Ask a question — e.g. &quot;governance&quot;, &quot;pilot&quot;, &quot;productivity&quot;..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpenIndex(-1);
            }}
          />
        </div>
        <div className="cr-faq__list cr-reveal">
          {filtered.length === 0 ? (
            <p className="cr-faq__empty">No questions match &ldquo;{query}&rdquo;. Try a different search term.</p>
          ) : (
            filtered.map((item, i) => {
              const open = openIndex === i;
              const panelId = `cr-faq-panel-${i}`;
              return (
                <div className={`cr-faq-item ${open ? "is-open" : ""}`} key={item.q}>
                  <button type="button" className="cr-faq-item__question" aria-expanded={open} aria-controls={panelId} onClick={() => setOpenIndex(open ? -1 : i)}>
                    <span>{item.q}</span>
                    <span className="cr-faq-item__icon" aria-hidden="true">{open ? "−" : "+"}</span>
                  </button>
                  <div id={panelId} className="cr-faq-item__answer" role="region" hidden={!open}>
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
// FINAL CTA
// ============================================================

function FinalCtaSection() {
  return (
    <section className="cr-final-cta cr-reveal" style={{ backgroundImage: `url("${ctaImg}")` }} aria-labelledby="cr-final-cta-heading">
      <div className="container cr-final-cta__inner">
        <h2 id="cr-final-cta-heading">{FINAL_CTA.heading}</h2>
        <p>{FINAL_CTA.description}</p>
        <a href={FINAL_CTA.cta.href} className="btn btn-primary cr-btn">
          {FINAL_CTA.cta.label} <span aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  );
}

// ============================================================
// CONTACT / REQUEST A DEMO
// ============================================================

function ContactSection() {
  return <ConsultationSection {...DEMO} />;
}
