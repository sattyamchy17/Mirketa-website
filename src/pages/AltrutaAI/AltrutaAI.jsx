import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Images } from "../../assets/images/index.js";
import Seo from "../../components/Seo/Seo.jsx";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb.jsx";
import ConsultationSection from "../../components/ConsultationSection/ConsultationSection.jsx";
import heroBg from "../../assets/images/altruta-ai/hero-bg.svg";
import heroIllustration from "../../assets/images/altruta-ai/hero-illustration.svg";
import overviewImg from "../../assets/changes/altruta-ai/altruta_nonprofit_ai_suite_full_cover.webp";
import benefitsImg from "../../assets/images/altruta-ai/benefits.svg";
import automationImg from "../../assets/images/altruta-ai/automation.svg";
import integrationImg from "../../assets/images/altruta-ai/integration.svg";
import ctaImg from "../../assets/images/altruta-ai/cta.svg";
import "./AltrutaAI.css";

gsap.registerPlugin(ScrollTrigger);

// ============================================================
// ICONS — small inline SVGs for component-local iconography
// (page-specific glyphs; the 9 illustrations above are the
// only file-based images per this page's asset spec)
// ============================================================

const Ico = {
  salesforce: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6.5 16.5A4.2 4.2 0 017 8.2 5.5 5.5 0 0117.5 9.5 3.7 3.7 0 0117 17H7" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></svg>
  ),
  team: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" /><path d="M3.5 20c0-3 2.5-5 5.5-5s5.5 2 5.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><circle cx="17" cy="9" r="2.4" stroke="currentColor" strokeWidth="1.4" opacity="0.6" /></svg>
  ),
  heart: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 20s-7-4.2-7-9.6C5 7 7.2 5 9.8 5c1 0 2 .4 2.2 1.2C12.2 5.4 13.2 5 14.2 5 16.8 5 19 7 19 10.4 19 15.8 12 20 12 20z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  scatter: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="5" cy="6" r="2" stroke="currentColor" strokeWidth="1.4" /><circle cx="18" cy="7" r="2" stroke="currentColor" strokeWidth="1.4" /><circle cx="7" cy="18" r="2" stroke="currentColor" strokeWidth="1.4" /><circle cx="17" cy="17" r="2" stroke="currentColor" strokeWidth="1.4" /></svg>
  ),
  bell: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 10a6 6 0 0112 0v4l2 3H4l2-3v-4z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M10 20a2 2 0 004 0" stroke="currentColor" strokeWidth="1.4" /></svg>
  ),
  clock: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="11" cy="12" r="8" stroke="currentColor" strokeWidth="1.4" /><path d="M11 8v4l3 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  target: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.4" /><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.3" opacity="0.6" /><circle cx="12" cy="12" r="1.2" fill="currentColor" /></svg>
  ),
  home: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 21V9l8-5 8 5v12H4z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  eye: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.4" /></svg>
  ),
  ledger: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 3h9l3 3v15H6V3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M9 9h6M9 13h6M9 17h4" stroke="currentColor" strokeWidth="1.2" opacity="0.6" /></svg>
  ),
  check: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12.5l5 5L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  donor: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 20s-7-4.2-7-9.6C5 7 7.2 5 9.8 5c1 0 2 .4 2.2 1.2C12.2 5.4 13.2 5 14.2 5 16.8 5 19 7 19 10.4 19 15.8 12 20 12 20z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M8 12.5l2.2 2 1.8-4 2 2.8L18 8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  program: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 7a1 1 0 011-1h5l2 2h9a1 1 0 011 1v9a1 1 0 01-1 1H4a1 1 0 01-1-1V7z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><circle cx="10" cy="13.5" r="1.6" stroke="currentColor" strokeWidth="1.2" /><circle cx="14.5" cy="13.5" r="1.6" stroke="currentColor" strokeWidth="1.2" /></svg>
  ),
  grant: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 3h7l4 4v14H7V3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M9 9h5M9 12.5h5" stroke="currentColor" strokeWidth="1.1" opacity="0.6" /><circle cx="9.2" cy="18.3" r="2.2" stroke="currentColor" strokeWidth="1.2" /><path d="M8.2 20l-1 2.6 1.9-1 1.9 1-1-2.6" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" /></svg>
  ),
  trendArrow: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 16l6-6 4 4 6-8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /><path d="M14 6h6v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  person: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="8" r="3.4" stroke="currentColor" strokeWidth="1.4" /><path d="M5 20c0-3.5 3-6 7-6s7 2.5 7 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
  ),
  shieldCheck: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M9 12l2 2 4-4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  converge: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="4.5" cy="5" r="1.5" stroke="currentColor" strokeWidth="1.1" /><circle cx="19.5" cy="5" r="1.5" stroke="currentColor" strokeWidth="1.1" /><circle cx="12" cy="4" r="1.5" stroke="currentColor" strokeWidth="1.1" /><path d="M4.8 6.3L11 16M19.2 6.3L13 16M12 5.5V15" stroke="currentColor" strokeWidth="1.1" /><circle cx="12" cy="18" r="2.4" stroke="currentColor" strokeWidth="1.4" /></svg>
  ),
  trendSpark: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 17l4-5 3 3 5-7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /><path d="M18 4l1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" /></svg>
  ),
  docSpark: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 3h8l4 4v14H6V3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M9 12h6M9 15.5h6" stroke="currentColor" strokeWidth="1.1" opacity="0.6" /><path d="M14 6l.8 1.8L17 8.6l-2.2.8L14 11l-.8-1.6L11 8.6l2.2-.8L14 6z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" /></svg>
  ),
};

// ============================================================
// DATA — content sourced verbatim from
// https://mirketa.us/altruta-ai/
// ============================================================

const BREADCRUMB_ITEMS = [{ label: "Home", href: "/" }, { label: "Altruta AI" }];

const HERO = {
  badge: "Salesforce-Native Nonprofit AI Suite",
  title: "The AI Suite That Helps Nonprofits Raise More, Serve Better, and Prove Impact",
  description:
    "Altruta unifies donor management, program and case management, and grant management into one intelligent Salesforce-native platform powered by Data Cloud, Einstein, Agentforce, and Prompt Builder.",
  primaryCta: { label: "Request a Demo", href: "#contact" },
  secondaryCta: { label: "Explore the AI Suite", href: "#suite" },
};

const HERO_STATS = [
  { display: "100%", label: "Salesforce-Native" },
  { display: "0", label: "External AI Infra" },
  { display: "Always", label: "Human-Approved" },
  { display: "Full", label: "Audit Trail" },
];

const TRUST_BADGES = [
  { icon: Images.clientSalesforce, label: "Salesforce Partner" },
  { icon: Images.clientSoc2, label: "SOC 2" },
  { icon: Images.clientHipaa, label: "HIPAA" },
  { icon: Images.clientEnterprise, label: "Enterprise Ready" },
];

const PILLARS = {
  heading: "Trusted by mission-driven organizations",
  items: [
    { icon: Ico.salesforce, title: "Salesforce-native architecture", description: "Extends your existing CRM" },
    { icon: Ico.shield, title: "Governance-ready design", description: "Explainable, reviewable, auditable" },
    { icon: Ico.team, title: "Built for lean teams", description: "Focus on donors, beneficiaries, and funders" },
    { icon: Ico.heart, title: "Mission-first intelligence", description: "Connects fundraising to outcomes" },
  ],
};

const GAP = {
  eyebrow: "The Nonprofit Technology Gap",
  heading: "Your mission deserves more than fragmented data and manual work",
  intro:
    "Nonprofit teams are being asked to grow fundraising, deliver more services, prove outcomes, and report impact — with tools that weren't built for connected, AI-enabled work. The result is a familiar pattern: donor signals missed, case documentation consuming staff time, and grant opportunities moving faster than the team can respond.",
  points: [
    { icon: Ico.scatter, title: "Data is everywhere, insight is nowhere", description: "Donor records, wealth indicators, case notes, program data, and impact stories live in disconnected systems. Teams have information, but not the unified intelligence needed to act quickly." },
    { icon: Ico.bell, title: "Donors lapse before anyone notices", description: "Without predictive donor management AI, at-risk supporters quietly disengage until the first warning sign is a missed gift or an unanswered appeal." },
    { icon: Ico.clock, title: "Staff spend too much time documenting", description: "Gift officers and case managers lose valuable hours to manual notes, research, and reporting instead of relationship-building and service delivery." },
    { icon: Ico.target, title: "Grant opportunities slip through the cracks", description: "Limited capacity makes it difficult to identify high-fit funders, draft compelling proposals, and produce funder-ready reports from real outcome data." },
  ],
};

const MEET_ALTRUTA = {
  eyebrow: "Meet Altruta",
  heading: "One Salesforce-native AI suite for every stage of your nonprofit mission",
  description:
    "Altruta connects the full lifecycle of nonprofit work — from the first donor interaction to the program outcome that proves impact — in a single intelligent Salesforce-native environment. No new platform. No data leaving your trusted environment. A human in control of every AI decision.",
  capabilities: [
    { tag: "Predict", color: "navy", icon: Ico.trendArrow, title: "Predict what's likely to happen", description: "Identify donor risk, beneficiary disengagement, and funding opportunities earlier." },
    { tag: "Personalize", color: "green", icon: Ico.person, title: "Personalize every interaction at scale", description: "Generate outreach, notes, briefs, and reports grounded in your Salesforce data." },
    { tag: "Prove", color: "teal", icon: Ico.shieldCheck, title: "Prove impact with confidence", description: "Connect fundraising, programs, outcomes, and funder reporting in one auditable environment." },
  ],
};

const SUITE = {
  eyebrow: "The Altruta Suite",
  heading: "Three AI modules. One connected nonprofit platform.",
  intro: "Each module delivers value on its own and compounds when combined. Most organizations start with Donor Management AI and expand as they grow.",
  modules: [
    {
      status: "Available Now",
      icon: Ico.donor,
      name: "Donor Management AI",
      title: "Turn fragmented donor data into predictive, personalized engagement",
      description: "Altruta unifies every donor signal into a single Salesforce profile, then uses AI to tell your team exactly who to focus on — and why — with personalized outreach drafted from real impact stories.",
      features: ["Unified donor profiles with wealth enrichment", "Daily AI scoring: acquisition, retention, upgrade", "Personalized outreach from matched impact stories", "Autonomous campaign enrollment with human approval", "Full audit trail inside Salesforce"],
      cta: "Explore Donor Management",
    },
    {
      status: "Available Now",
      icon: Ico.program,
      name: "Program & Case Management AI",
      title: "Spend less time documenting. More time delivering impact.",
      description: "Altruta predicts which beneficiaries are at risk of disengaging, drafts structured case notes, and tracks program outcomes against funder targets in real time — giving staff back hours every week.",
      features: ["Predictive scoring for dropout risk and service intensity", "AI-drafted case progress notes from service records", "Real-time outcome tracking against funder goals", "Autonomous escalation alerts with structured briefs", "AI-matched program enrollment for new beneficiaries"],
      cta: "Explore Program & Case Management",
    },
    {
      status: "Coming Soon",
      icon: Ico.grant,
      name: "Grant Management AI",
      title: "Find the right funding. Win it. Report on it with AI.",
      description: "Altruta's Grant Management module surfaces high-fit funding opportunities, assists with proposal drafting grounded in real outcome data, and auto-generates funder-ready reports.",
      features: ["Intelligent grant discovery matched to your mission", "AI-assisted proposal drafting from real impact data", "Automated outcome and compliance reporting", "Deadline and renewal tracking inside Salesforce", "Seamless connection to program outcomes"],
      cta: "Join the Waitlist",
    },
  ],
};

const DIFFERENCE = {
  eyebrow: "The Altruta Difference",
  heading: "AI your nonprofit can trust with sensitive donor and beneficiary data",
  intro: "Most nonprofit AI tools require moving data into disconnected systems. Altruta operates natively within Salesforce — the platform your team already uses for CRM, program operations, and outcomes.",
  rows: [
    { title: "Data residency", other: "Data moves to a separate AI platform", altruta: "Your data stays home — built for Salesforce-native operation" },
    { title: "Sending actions", other: "AI sends messages autonomously", altruta: "Human-approved, always — your team reviews every action" },
    { title: "Recommendations", other: "Black-box scores with no reasoning", altruta: "Explainable by design — every score includes the reasons behind it" },
    { title: "Governance", other: "Actions logged outside your CRM, if at all", altruta: "Fully auditable — logged inside Salesforce for board-level confidence" },
  ],
};

const HOW_IT_WORKS = {
  eyebrow: "How Altruta Works",
  heading: "Four Salesforce AI capabilities working as one nonprofit intelligence layer",
  intro: "Altruta turns Salesforce into an AI engine for mission-driven work by connecting unified data, predictive intelligence, agentic workflow support, and governed content generation.",
  steps: [
    { name: "Data Cloud", verb: "unifies", icon: Ico.converge, description: "Altruta brings together every donor, beneficiary, and program signal into a single, real-time Salesforce profile." },
    { name: "Einstein", verb: "predicts", icon: Ico.trendSpark, description: "Prediction models score who needs attention and why across donors, beneficiaries, and program outcomes." },
    { name: "Agentforce", verb: "acts", icon: Ico.team, description: "AI agents draft outreach, recommend next steps, and orchestrate workflows — routing everything for human approval." },
    { name: "Prompt Builder", verb: "personalizes", icon: Ico.docSpark, description: "Every message and report is generated in your voice, grounded in your real data, with no fabrication." },
  ],
};

const IMPACT = {
  eyebrow: "Measurable Impact",
  heading: "Results your leadership team and board can see",
  intro: "Organizations deploying Altruta target meaningful gains within the first twelve months, without adding headcount.",
  stats: [
    { display: "+15%", label: "Donor Retention", note: "Through earlier risk detection" },
    { display: "+25%", label: "Engagement Rate", note: "From AI-personalized outreach" },
    { display: "−40%", label: "Research Time", note: "Returned to relationships" },
    { display: "10×", label: "Personalization", note: "Reach every supporter" },
  ],
};

const INTEGRATIONS = {
  eyebrow: "Platform Integrations",
  heading: "Runs natively inside the Salesforce you already trust",
  items: ["Salesforce", "Data Cloud", "Einstein", "Agentforce", "Prompt Builder", "Nonprofit Cloud", "NPSP"],
};

const ORG_TYPES = {
  eyebrow: "Built for Mission-Driven Organizations",
  heading: "Whether you're scaling fundraising or proving impact, Altruta fits",
  items: [
    { title: "Foundations & community organizations", description: "Manage growing donor portfolios and grant cycles with AI-powered intelligence." },
    { title: "Health & human services nonprofits", description: "Support case managers with risk alerts, structured notes, and outcome visibility." },
    { title: "International & multi-program organizations", description: "Coordinate donors, programs, outcomes, and funders across teams and regions." },
    { title: "Development teams ready for AI-enabled growth", description: "Move from manual segmentation to predictive fundraising and personalized donor journeys." },
  ],
};

const BUILT_BY = {
  eyebrow: "Built by Mirketa",
  heading: "An AI-first Salesforce partner focused on nonprofit transformation",
  description:
    "Altruta is built by Mirketa, an AI-first consulting firm and Salesforce partner specializing in nonprofit digital transformation. We don't treat nonprofits as an afterthought — we build for the unique realities of mission-driven work: limited budgets, lean teams, sensitive data, and the need to prove impact to every funder and board. Our practice spans the full Salesforce AI stack — Data Cloud, Einstein, Agentforce, and Prompt Builder — and Altruta is the product of everything we've learned helping organizations like yours do more with less.",
  credentials: ["Salesforce Crest Partner", "Einstein Trust Layer Certified", "Nonprofit AI Specialists"],
  metrics: [
    { display: "13+", label: "AI Use Cases", note: "Production-ready nonprofit AI capabilities" },
    { display: "9+", label: "Industries Served", note: "Including healthcare, nonprofit, and enterprise" },
    { display: "100+", label: "Enterprise Clients", note: "Organizations transformed with Salesforce AI" },
    { display: "9.6", label: "CSAT Score", note: "Client satisfaction across all engagements" },
  ],
};

const MID_CTA = {
  eyebrow: "See Altruta in Action",
  heading: "Book a personalized demo and watch Altruta turn your Salesforce org into an AI engine for your mission",
  description: "See how donor signals, case activity, program outcomes, and grant reporting can work together in one Salesforce-native AI suite — live, on a real sandbox.",
  cta: { label: "Talk to Our Nonprofit AI Team", href: "#contact" },
  qualifiers: ["No commitment", "Built on the Salesforce you already trust", "Human-approved AI, every step"],
};

const CONTACT = {
  heading: "Let's identify your highest-impact nonprofit AI use case",
  description: "Tell us about your organization, Salesforce environment, and current fundraising or program priorities. Our nonprofit AI specialists will review your needs and recommend a practical starting path.",
  benefits: [
    "Personalized demo",
    "Salesforce-native roadmap",
    "Use-case prioritization",
    "Governance review",
  ],
  formTitle: "Request a Free Altruta AI Consultation",
};

const FAQS = [
  { q: "What is Altruta?", a: "Altruta is an AI suite purpose-built for nonprofits and built natively on Salesforce. It brings AI to donor management, program and case management, and grant management so nonprofit teams can predict risk, personalize engagement, reduce manual work, and prove impact without adding unnecessary operational complexity." },
  { q: "Is Altruta built on Salesforce?", a: "Yes. Altruta is designed as a Salesforce-native AI suite that uses Salesforce AI and data capabilities, including Data Cloud, Einstein, Agentforce, and Prompt Builder. It extends the Salesforce environment your nonprofit already uses rather than requiring a separate CRM replacement." },
  { q: "Does our nonprofit's data leave Salesforce?", a: "Altruta is built as a Salesforce-native solution designed to keep donor, beneficiary, program, and grant workflows inside Salesforce. The implementation preserves this trust model and avoids unnecessary third-party AI infrastructure or uncontrolled data movement." },
  { q: "Will AI send messages to our donors automatically?", a: "No. Altruta follows a human-in-the-loop model. AI can draft communications, recommend next steps, prepare summaries, and support workflow decisions — but donor, beneficiary, and funder-facing actions are reviewed and approved by your team before they are sent." },
  { q: "Which Altruta module should we start with?", a: "Most organizations start with Donor Management AI because it creates fast visibility into donor retention, upgrade potential, and personalized outreach. Program & Case Management AI and Grant Management AI can then extend the same Salesforce-native intelligence layer across service delivery and funder reporting." },
  { q: "Do we need to replace our current CRM?", a: "No. If your nonprofit already uses Salesforce, including Nonprofit Cloud or NPSP, Altruta is designed to extend your current environment. The goal is to activate AI inside Salesforce, not force a disruptive rip-and-replace project." },
  { q: "How long does implementation take?", a: "Implementation timelines depend on Salesforce readiness, data quality, module scope, and integration needs. A focused Donor Management AI deployment can typically move faster than a broader program and case management rollout, because the latter often requires more data-foundation work." },
  { q: "Is Altruta a good fit for smaller nonprofits?", a: "Yes. Altruta is designed for lean teams that need to do more with limited capacity. Because it builds on Salesforce-native capabilities, nonprofits can pursue practical AI use cases without standing up a separate AI platform." },
  { q: "How is Altruta different from other nonprofit AI tools?", a: "Altruta differentiates itself through Salesforce-native architecture, human approval, explainable recommendations, and auditable workflows. Instead of treating AI as an external add-on, Altruta connects nonprofit intelligence to the CRM, program, and outcome data already managed in Salesforce." },
  { q: "How do we get started?", a: "Request a personalized demo. The Altruta team can walk through the suite, discuss your Salesforce environment, identify the best starting module, and recommend a phased roadmap aligned to your fundraising, program, and grant priorities." },
];

const SEO = {
  title: "Altruta AI — Salesforce-Native Nonprofit AI Suite | Mirketa",
  description:
    "Altruta unifies donor management, case management, and grant management into one Salesforce-native AI suite — helping nonprofits raise more and prove impact.",
  canonical: "https://www.mirketa.com/altruta-ai/",
  keywords: [
    "Altruta AI",
    "nonprofit AI suite",
    "Salesforce-native nonprofit AI",
    "donor management AI",
    "predictive donor management",
    "nonprofit case management AI",
    "grant management AI",
    "Salesforce Data Cloud nonprofit",
    "Agentforce for nonprofits",
    "nonprofit fundraising AI",
    "Salesforce Nonprofit Cloud AI",
    "AI donor retention",
  ],
  schema: [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "Salesforce-Native Nonprofit AI Suite",
      provider: { "@type": "Organization", name: "Mirketa Inc.", url: "https://www.mirketa.com" },
      name: "Altruta AI",
      description:
        "A Salesforce-native AI suite unifying donor management, program and case management, and grant management for nonprofits, powered by Data Cloud, Einstein, Agentforce, and Prompt Builder.",
      areaServed: "Global",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.mirketa.com/" },
        { "@type": "ListItem", position: 2, name: "Altruta AI", item: "https://www.mirketa.com/altruta-ai/" },
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
// HOOKS
// ============================================================

function useInView(threshold = 0.3) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView];
}

// ============================================================
// MAIN COMPONENT
// ============================================================

export default function AltrutaAI() {
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

      gsap.utils.toArray(".alt-reveal").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 32,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      gsap.utils.toArray(".alt-reveal-stagger").forEach((el) => {
        gsap.from(el.children, {
          opacity: 0,
          y: 26,
          duration: 0.6,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      gsap.utils.toArray(".alt-zoom-in").forEach((el) => {
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
    <div className="altruta-ai">
      <Seo {...SEO} />
      <HeroSection heroTextRef={heroTextRef} />
      <PillarsSection />
      <GapSection />
      <MeetAltrutaSection />
      <SuiteSection />
      <DifferenceSection />
      <HowItWorksSection />
      <ImpactSection />
      <IntegrationSection />
      <OrgTypesSection />
      <BuiltBySection />
      <MidCtaSection />
      <FaqSection />
      <ContactSection />
    </div>
  );
}

// ============================================================
// HERO — network backdrop + floating donor-scorecard illustration
// ============================================================

function HeroSection({ heroTextRef }) {
  return (
    <section className="alt-hero" style={{ backgroundImage: `url("${heroBg}")` }} aria-label="Altruta AI — Salesforce-native nonprofit AI suite">
      <div className="alt-hero__scrim" />
      <div className="container">
        <Breadcrumb items={BREADCRUMB_ITEMS} className="alt-breadcrumb" />
      </div>
      <div className="container alt-hero__inner">
        <div ref={heroTextRef} className="alt-hero__text">
          <span className="alt-badge">
            <span className="alt-badge__spark" aria-hidden="true">✦</span> {HERO.badge}
          </span>
          <h1>{HERO.title}</h1>
          <p className="alt-hero__description">{HERO.description}</p>
          <div className="alt-hero__ctas">
            <a href={HERO.primaryCta.href} className="btn btn-primary alt-btn">
              {HERO.primaryCta.label} <span aria-hidden="true">→</span>
            </a>
            <a href={HERO.secondaryCta.href} className="btn btn-secondary alt-btn">
              {HERO.secondaryCta.label}
            </a>
          </div>
          <div className="alt-hero__stats alt-reveal-stagger">
            {HERO_STATS.map((s) => (
              <div className="alt-hero-stat" key={s.label}>
                <strong>{s.display}</strong>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
          <div className="alt-hero__trust">
            <span className="alt-hero__trust-label">Backed by Mirketa's enterprise credentials</span>
            <div className="alt-hero__trust-badges">
              {TRUST_BADGES.map((b) => (
                <img key={b.label} src={b.icon} alt={b.label} loading="lazy" />
              ))}
            </div>
          </div>
        </div>

        <div className="alt-hero__illustration alt-zoom-in">
          <img src={heroIllustration} alt="Altruta AI donor scorecard showing a retention score, engagement trend, and a human-approved outreach draft" />
        </div>
      </div>

      <button
        type="button"
        className="alt-scroll-indicator"
        onClick={() => document.getElementById("suite")?.scrollIntoView({ behavior: "smooth" })}
        aria-label="Scroll to the Altruta AI suite"
      >
        <span />
      </button>
    </section>
  );
}

// ============================================================
// TRUSTED BY / CORE PILLARS
// ============================================================

function PillarsSection() {
  return (
    <section className="section alt-pillars" aria-labelledby="alt-pillars-heading">
      <div className="container">
        <p className="alt-eyebrow alt-reveal" style={{ textAlign: "center", display: "block" }}>
          Trusted By
        </p>
        <h2 id="alt-pillars-heading" className="alt-pillars__heading alt-reveal">
          {PILLARS.heading}
        </h2>
        <div className="alt-pillars__row alt-reveal-stagger">
          {PILLARS.items.map((p) => (
            <div className="alt-pillar-chip" key={p.title}>
              <span className="alt-pillar-chip__icon">{p.icon}</span>
              <div>
                <h3>{p.title}</h3>
                <p>{p.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// THE NONPROFIT TECHNOLOGY GAP — scattered card deck
// ============================================================

function GapSection() {
  return (
    <section className="section alt-gap" aria-labelledby="alt-gap-heading">
      <div className="container">
        <div className="section-heading alt-reveal">
          <p className="alt-eyebrow">{GAP.eyebrow}</p>
          <h2 id="alt-gap-heading">{GAP.heading}</h2>
          <p>{GAP.intro}</p>
        </div>
        <div className="alt-gap__deck alt-reveal-stagger">
          {GAP.points.map((p, i) => (
            <div className={`alt-gap-card alt-gap-card--${i}`} key={p.title}>
              <span className="alt-gap-card__icon">{p.icon}</span>
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
// MEET ALTRUTA — overview illustration + predict/personalize/prove
// ============================================================

function MeetAltrutaSection() {
  return (
    <section className="section alt-meet" aria-labelledby="alt-meet-heading">
      <div className="container alt-meet__grid">
        <div className="alt-meet__text alt-reveal">
          <p className="alt-eyebrow">{MEET_ALTRUTA.eyebrow}</p>
          <h2 id="alt-meet-heading">{MEET_ALTRUTA.heading}</h2>
          <p>{MEET_ALTRUTA.description}</p>
          <div className="alt-meet__native-badge">
            <img src={Images.clientSalesforce} alt="" aria-hidden="true" />
            <div>
              <strong>Native on Salesforce</strong>
              <span>Secure. Trusted. Built for Nonprofits.</span>
            </div>
          </div>
        </div>
        <div className="alt-meet__visual alt-zoom-in">
          <div className="alt-meet__image">
            <img src={overviewImg} alt="Altruta team reviewing donor and program data together" loading="lazy" />
          </div>
          <div className="alt-meet__pills" aria-hidden="true">
            {MEET_ALTRUTA.capabilities.map((c) => (
              <span className={`alt-meet__pill alt-meet__pill--${c.color}`} key={c.tag}>
                {c.tag}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="container alt-meet__capabilities alt-reveal-stagger">
        {MEET_ALTRUTA.capabilities.map((c) => (
          <div className={`alt-capability-card alt-capability-card--${c.color}`} key={c.tag}>
            <div className="alt-capability-card__head">
              <span className="alt-capability-card__icon" aria-hidden="true">
                {c.icon}
              </span>
              <span className="alt-capability-card__tag">{c.tag}</span>
            </div>
            <h3>{c.title}</h3>
            <p>{c.description}</p>
            <a href="#suite" className="alt-capability-card__link" aria-label={`Learn more about how Altruta helps you ${c.tag.toLowerCase()}`}>
              <span aria-hidden="true">→</span>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

// ============================================================
// THE ALTRUTA SUITE — module tier cards with status ribbons
// ============================================================

function SuiteSection() {
  return (
    <section className="section alt-suite" id="suite" aria-labelledby="alt-suite-heading">
      <div className="container">
        <span className="alt-badge-pill">{SUITE.eyebrow}</span>
        <div className="section-heading alt-reveal">
          <h2 id="alt-suite-heading">{SUITE.heading}</h2>
          <p>{SUITE.intro}</p>
        </div>

        <div className="alt-suite__layer-bar alt-reveal" aria-hidden="true">
          <span>One Shared Salesforce Intelligence Layer</span>
        </div>

        <div className="alt-suite__grid alt-reveal-stagger">
          {SUITE.modules.map((m) => (
            <div className={`alt-module-card ${m.status === "Coming Soon" ? "is-upcoming" : ""}`} key={m.name}>
              <span className="alt-module-card__connector" aria-hidden="true" />
              <span className={`alt-module-card__status ${m.status === "Coming Soon" ? "is-upcoming" : ""}`}>{m.status}</span>
              <span className="alt-module-card__icon" aria-hidden="true">
                {m.icon}
              </span>
              <h3 className="alt-module-card__name">{m.name}</h3>
              <p className="alt-module-card__title">{m.title}</p>
              <p className="alt-module-card__description">{m.description}</p>
              <ul className="alt-module-card__features">
                {m.features.map((f) => (
                  <li key={f}>
                    <span aria-hidden="true">{Ico.check}</span>
                    {f}
                  </li>
                ))}
              </ul>
              <a href="#contact" className={`btn ${m.status === "Coming Soon" ? "btn-outline-dark" : "btn-primary"} alt-btn alt-module-card__cta`}>
                {m.cta}
              </a>
            </div>
          ))}
        </div>

        <div className="alt-suite__trust-strip alt-reveal">
          <span>
            <span aria-hidden="true">{Ico.shield}</span>Salesforce-native
          </span>
          <span>
            <span aria-hidden="true">{Ico.person}</span>Human-approved
          </span>
          <span>
            <span aria-hidden="true">{Ico.grant}</span>Fully auditable
          </span>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// THE ALTRUTA DIFFERENCE — comparison rows
// ============================================================

function DifferenceSection() {
  return (
    <section className="section alt-difference" aria-labelledby="alt-difference-heading">
      <div className="container alt-difference__grid">
        <div className="alt-difference__text alt-reveal">
          <p className="alt-eyebrow">{DIFFERENCE.eyebrow}</p>
          <h2 id="alt-difference-heading">{DIFFERENCE.heading}</h2>
          <p>{DIFFERENCE.intro}</p>
          <img className="alt-difference__image" src={automationImg} alt="Workflow showing an AI-drafted action pausing for human review before being sent and logged" loading="lazy" />
        </div>
        <div className="alt-difference__table alt-reveal-stagger">
          <div className="alt-difference__table-head">
            <span>Other Nonprofit AI Tools</span>
            <span>Altruta</span>
          </div>
          {DIFFERENCE.rows.map((r) => (
            <div className="alt-difference__row" key={r.title}>
              <h3>{r.title}</h3>
              <p className="alt-difference__other">{r.other}</p>
              <p className="alt-difference__altruta">
                <span aria-hidden="true">{Ico.check}</span> {r.altruta}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// HOW ALTRUTA WORKS — connected horizontal process
// ============================================================

function HowItWorksStep({ step, num }) {
  return (
    <div className="alt-how-step">
      <span className="alt-how-step__num">{String(num).padStart(2, "0")}</span>
      <span className="alt-how-step__icon" aria-hidden="true">
        {step.icon}
      </span>
      <h3>
        {step.name} <em>{step.verb}</em>
      </h3>
      <p>{step.description}</p>
    </div>
  );
}

function HowItWorksSection() {
  const [dataCloud, einstein, agentforce, promptBuilder] = HOW_IT_WORKS.steps;

  return (
    <section className="section alt-how" aria-labelledby="alt-how-heading">
      <div className="container">
        <span className="alt-badge-pill">{HOW_IT_WORKS.eyebrow}</span>
        <div className="section-heading alt-reveal">
          <h2 id="alt-how-heading">{HOW_IT_WORKS.heading}</h2>
          <p>{HOW_IT_WORKS.intro}</p>
        </div>

        <div className="alt-how__panel alt-reveal">
          <div className="alt-how__layout">
            <div className="alt-how__col alt-reveal-stagger">
              <HowItWorksStep step={dataCloud} num={1} />
              <HowItWorksStep step={agentforce} num={3} />
            </div>

            <div className="alt-how__hub" aria-hidden="true">
              <span className="alt-how__hub-icon">{Ico.converge}</span>
              <span className="alt-how__hub-label">Altruta Intelligence Layer</span>
              <span className="alt-how__hub-review">
                <span aria-hidden="true">{Ico.person}</span>
                Human review
              </span>
            </div>

            <div className="alt-how__col alt-reveal-stagger">
              <HowItWorksStep step={einstein} num={2} />
              <HowItWorksStep step={promptBuilder} num={4} />
            </div>
          </div>

          <div className="alt-how__footer" aria-hidden="true">
            <span>
              <span aria-hidden="true">{Ico.person}</span>Unified profiles
            </span>
            <span>
              <span aria-hidden="true">{Ico.check}</span>Prioritized actions
            </span>
            <span>
              <span aria-hidden="true">{Ico.donor}</span>Personalized engagement
            </span>
          </div>
          <p className="alt-how__loop-caption">One Governed Intelligence Loop</p>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// MEASURABLE IMPACT
// ============================================================

function StatCard({ metric }) {
  const [ref, inView] = useInView(0.5);
  return (
    <div ref={ref} className={`alt-impact-stat ${inView ? "is-visible" : ""}`}>
      <strong>{metric.display}</strong>
      <span>{metric.label}</span>
      <p>{metric.note}</p>
    </div>
  );
}

function ImpactSection() {
  return (
    <section className="section alt-impact" aria-labelledby="alt-impact-heading">
      <div className="alt-impact__bg" style={{ backgroundImage: `url("${benefitsImg}")` }} aria-hidden="true" />
      <div className="container">
        <div className="section-heading alt-reveal">
          <p className="alt-eyebrow">{IMPACT.eyebrow}</p>
          <h2 id="alt-impact-heading">{IMPACT.heading}</h2>
          <p>{IMPACT.intro}</p>
        </div>
        <div className="alt-impact__grid alt-reveal-stagger">
          {IMPACT.stats.map((s) => (
            <StatCard key={s.label} metric={s} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// PLATFORM INTEGRATIONS
// ============================================================

function IntegrationSection() {
  return (
    <section className="section alt-integrations" aria-labelledby="alt-integrations-heading">
      <div className="container alt-integrations__grid">
        <div className="alt-integrations__text alt-reveal">
          <p className="alt-eyebrow">{INTEGRATIONS.eyebrow}</p>
          <h2 id="alt-integrations-heading">{INTEGRATIONS.heading}</h2>
          <ul className="alt-integrations__chips">
            {INTEGRATIONS.items.map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
        </div>
        <div className="alt-integrations__image alt-zoom-in">
          <img src={integrationImg} alt="Salesforce cloud connected to Data Cloud, Einstein, Agentforce, and Prompt Builder" loading="lazy" />
        </div>
      </div>
    </section>
  );
}

// ============================================================
// BUILT FOR MISSION-DRIVEN ORGANIZATIONS — editorial list
// ============================================================

function OrgTypesSection() {
  return (
    <section className="section alt-org-types" aria-labelledby="alt-org-types-heading">
      <div className="container">
        <div className="section-heading alt-reveal">
          <p className="alt-eyebrow">{ORG_TYPES.eyebrow}</p>
          <h2 id="alt-org-types-heading">{ORG_TYPES.heading}</h2>
        </div>
        <div className="alt-org-types__list alt-reveal-stagger">
          {ORG_TYPES.items.map((o, i) => (
            <div className="alt-org-row" key={o.title}>
              <span className="alt-org-row__num">{String(i + 1).padStart(2, "0")}</span>
              <h3>{o.title}</h3>
              <p>{o.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// BUILT BY MIRKETA
// ============================================================

function BuiltBySection() {
  return (
    <section className="section alt-built-by" aria-labelledby="alt-built-by-heading">
      <div className="container alt-built-by__grid">
        <div className="alt-built-by__text alt-reveal">
          <p className="alt-eyebrow">{BUILT_BY.eyebrow}</p>
          <h2 id="alt-built-by-heading">{BUILT_BY.heading}</h2>
          <p>{BUILT_BY.description}</p>
          <ul className="alt-built-by__credentials">
            {BUILT_BY.credentials.map((c) => (
              <li key={c}>
                <span aria-hidden="true">{Ico.shield}</span> {c}
              </li>
            ))}
          </ul>
        </div>
        <div className="alt-built-by__metrics alt-reveal-stagger">
          {BUILT_BY.metrics.map((m) => (
            <div className="alt-metric-tile" key={m.label}>
              <strong>{m.display}</strong>
              <span>{m.label}</span>
              <p>{m.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// MID CTA — "See Altruta in Action"
// ============================================================

function MidCtaSection() {
  return (
    <section className="alt-mid-cta alt-reveal" style={{ backgroundImage: `url("${ctaImg}")` }} aria-labelledby="alt-mid-cta-heading">
      <div className="container alt-mid-cta__inner">
        <p className="alt-eyebrow">{MID_CTA.eyebrow}</p>
        <h2 id="alt-mid-cta-heading">{MID_CTA.heading}</h2>
        <p>{MID_CTA.description}</p>
        <a href={MID_CTA.cta.href} className="btn btn-primary alt-btn">
          {MID_CTA.cta.label} <span aria-hidden="true">→</span>
        </a>
        <ul className="alt-mid-cta__qualifiers">
          {MID_CTA.qualifiers.map((q) => (
            <li key={q}>{q}</li>
          ))}
        </ul>
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
    <section className="section alt-faq" aria-labelledby="alt-faq-heading">
      <div className="container">
        <div className="section-heading alt-reveal">
          <p className="alt-eyebrow">FAQ</p>
          <h2 id="alt-faq-heading">Questions nonprofits ask about Altruta</h2>
          <p>Answers to the most common questions about Salesforce-native AI for nonprofits, implementation, governance, and getting started.</p>
        </div>
        <div className="alt-faq__search-wrap alt-reveal">
          <label htmlFor="alt-faq-search" className="visually-hidden">
            Search frequently asked questions
          </label>
          <input
            id="alt-faq-search"
            type="search"
            className="alt-faq__search"
            placeholder="Ask a question — e.g. &quot;NPSP&quot;, &quot;implementation&quot;, &quot;governance&quot;..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpenIndex(-1);
            }}
          />
        </div>
        <div className="alt-faq__list alt-reveal">
          {filtered.length === 0 ? (
            <p className="alt-faq__empty">No questions match &ldquo;{query}&rdquo;. Try a different search term.</p>
          ) : (
            filtered.map((item, i) => {
              const open = openIndex === i;
              const panelId = `alt-faq-panel-${i}`;
              return (
                <div className={`alt-faq-item ${open ? "is-open" : ""}`} key={item.q}>
                  <button type="button" className="alt-faq-item__question" aria-expanded={open} aria-controls={panelId} onClick={() => setOpenIndex(open ? -1 : i)}>
                    <span>{item.q}</span>
                    <span className="alt-faq-item__icon" aria-hidden="true">{open ? "−" : "+"}</span>
                  </button>
                  <div id={panelId} className="alt-faq-item__answer" role="region" hidden={!open}>
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
// CONTACT
// ============================================================

function ContactSection() {
  return <ConsultationSection {...CONTACT} />;
}
