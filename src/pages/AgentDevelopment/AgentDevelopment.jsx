import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Images } from "../../assets/images/index.js";
import Seo from "../../components/Seo/Seo.jsx";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb.jsx";
import ConsultationSection from "../../components/ConsultationSection/ConsultationSection.jsx";
import "./AgentDevelopment.css";

const BREADCRUMB_ITEMS = [{ label: "Home", href: "/" }, { label: "Agent Development" }];

gsap.registerPlugin(ScrollTrigger);

// ============================================================
// DATA — content sourced verbatim from
// https://mirketa.com/ai-enablement/agent-development/
// ============================================================

const HERO = {
  eyebrow: "AI Agent Development",
  title: "Build AI Agents That Think, Act, and Deliver.",
  description:
    "Design and deploy custom enterprise AI agents that autonomously plan, use tools, and execute complex multi-step workflows without constant human intervention. From single-purpose task agents to sophisticated multi-agent systems.",
  primaryCta: { label: "Talk to an AI Expert", href: "#contact" },
  secondaryCta: { label: "Explore Capabilities", href: "#capabilities" },
};

const KEY_METRICS = [
  { value: 46, suffix: "%", label: "CAGR — Agentic AI Market Growth" },
  { value: "8–12", suffix: " Weeks", label: "From Design to Production", isText: true },
  { value: 60, suffix: "%", label: "Reduction in Manual Processing Time" },
  { value: 100, suffix: "%", label: "Client IP Ownership, Always" },
];

const TRUSTED_INDUSTRIES = ["Healthcare", "Financial Services", "Nonprofit", "Technology & SaaS", "Manufacturing", "Retail"];

const PROCESS_STEPS = [
  { icon: Images.iconProcessGoalReceived, title: "Goal Received", description: "User or system defines the objective" },
  { icon: Images.iconProcessReasonPlan, title: "Reason & Plan", description: "LLM breaks task into actionable steps" },
  { icon: Images.iconProcessUseTools, title: "Use Tools & APIs", description: "Calls CRM, databases, web, and services" },
  { icon: Images.iconProcessObserveAdapt, title: "Observe & Adapt", description: "Evaluates results and adjusts approach" },
  { icon: Images.iconProcessDeliverOutcome, title: "Deliver Outcome", description: "Returns result or escalates to human" },
];

const SHIFT = {
  heading: "The Shift to Agentic AI",
  traditionalTitle: "Traditional RPA & Automation",
  traditionalItems: [
    "Rigid rule-based logic breaks on exceptions",
    "Requires constant human intervention",
    "Cannot reason, plan, or adapt",
    "Siloed workflows",
    "Expensive to maintain",
    "No memory context",
  ],
  agentTitle: "Mirketa AI Agents",
  agentItems: [
    "Goal-oriented reasoning navigates ambiguity autonomously",
    "Dynamic tool use calls APIs and databases",
    "Multi-step planning with self-correction",
    "Persistent memory across sessions",
    "Human-in-the-loop escalation",
    "Continuously learns from outcomes",
  ],
};

const CAPABILITIES = [
  {
    file: "custom-agent.config",
    icon: Images.iconCapabilityCustomAgent,
    title: "Custom AI Agent Development",
    description:
      "We design and build bespoke AI agents tailored to your exact business processes. From single-purpose task agents to sophisticated reasoning systems, each agent is built with production-grade reliability, security, and governance from day one.",
    features: [
      "Purpose-built agent logic aligned to workflows",
      "Tool integration with APIs, databases, enterprise systems",
      "Persistent memory and context management",
      "Built-in guardrails to prevent hallucination",
    ],
    tags: ["LangGraph", "CrewAI", "AutoGen"],
  },
  {
    file: "agentforce.config",
    icon: Images.iconCapabilityAgentforce,
    title: "Salesforce Agentforce Development",
    description:
      "As Salesforce consulting partners, we build native AI agents within the Agentforce platform, deeply integrated with your CRM, Service Cloud, and Sales Cloud data. Agents that know your customers, your products, and your processes.",
    features: [
      "Native Agentforce agent design and configuration",
      "Deep integration with Salesforce data, flows, and Apex",
      "Customer service, sales, operations automation agents",
      "Einstein AI capabilities embedded",
    ],
    tags: ["Salesforce Agentforce", "Einstein AI"],
  },
  {
    file: "multi-agent.config",
    icon: Images.serviceAgenticOrchestration,
    title: "Multi-Agent Systems",
    description:
      "Complex enterprise problems require more than a single agent. We architect collaborative multi-agent systems where an orchestrator agent decomposes tasks and delegates to specialist sub-agents, each optimized for a specific function, working in parallel or sequence.",
    features: [
      "Orchestrator-subagent patterns for task decomposition",
      "Parallel agent execution to reduce latency",
      "Agent-to-agent communication with structured handoff",
      "Centralized monitoring across agents",
    ],
    tags: ["Multi-Agent", "Orchestration", "MCP"],
  },
  {
    file: "governance.config",
    icon: Images.iconDimensionGovernance,
    title: "Agent Governance & Trust Layer",
    description:
      "Enterprise AI must be trustworthy before it can be transformative. We implement a progressive oversight framework, starting with maximum human control and systematically reducing approval friction as agents demonstrate consistent, reliable performance in your environment.",
    features: [
      "Approval gates for financial transactions",
      "Ambiguity resolution: agents escalate with options",
      "Trust calibration: oversight reduces with validated performance",
      "Full audit trails, explainability, compliance reporting",
    ],
    tags: ["Governance", "HITL", "Compliance"],
  },
];

const AGENT_TYPES = [
  {
    index: "01",
    icon: Images.iconAgentTypeTaskExecution,
    title: "Task Execution Agents",
    description:
      "Autonomous agents that take a goal and execute a defined sequence of steps — calling APIs, querying databases, filling forms, and generating outputs without human intervention at each step. Ideal for high-volume, repetitive workflows that currently require manual effort.",
    useCases: ["Invoice Processing", "Data Entry & Validation", "Report Generation", "Compliance Checks"],
  },
  {
    index: "02",
    icon: Images.iconAgentTypeConversational,
    title: "Conversational & Support Agents",
    description:
      "Intelligent agents that go far beyond FAQ chatbots — they understand context, access live data, take actions on behalf of users, and resolve issues end-to-end. They handle escalations gracefully and hand off to human agents with full context when needed.",
    useCases: ["Customer Service", "IT Help Desk", "HR Self-Service", "Sales Assistant"],
  },
  {
    index: "03",
    icon: Images.iconAgentTypeResearch,
    title: "Research & Analytical Agents",
    description:
      "Agents designed to gather information from multiple sources, synthesize insights, identify patterns, and produce structured outputs, dramatically compressing the time required for research, due diligence, competitive analysis, and business intelligence workflows.",
    useCases: ["Market Research", "Due Diligence", "Clinical Summarization", "Financial Analysis"],
  },
  {
    index: "04",
    icon: Images.iconAgentTypeOrchestrator,
    title: "Orchestrator & Coordinator Agents",
    description:
      "Master agents that receive high-level goals, decompose them into sub-tasks, delegate to specialist agents, monitor progress, and aggregate results. The brain of a multi-agent system, enabling enterprise-scale automation that no single agent could accomplish alone.",
    useCases: ["Workflow Orchestration", "Multi-Agent Coordination", "Process Automation", "Decision Routing"],
  },
];

const FRAMEWORKS = [
  {
    name: "LangGraph",
    accent: "#21ad65",
    icon: Images.iconPatternDag,
    description:
      "Built for complex, stateful, production-grade agent workflows. LangGraph's graph-based architecture gives us precise control over agent state, branching logic, and human-in-the-loop checkpoints — ideal for enterprise deployments requiring auditability and reliability.",
    bestFor: "Complex, stateful enterprise workflows",
  },
  {
    name: "CrewAI",
    accent: "#3d7bd9",
    icon: Images.serviceAgenticOrchestration,
    description:
      "Purpose-built for multi-agent collaboration with role-based agent design. CrewAI enables rapid development of agent teams where each agent has a defined role, backstory, and toolset — making it ideal for research, content, and analysis workflows requiring diverse expertise.",
    bestFor: "Multi-agent collaboration & research",
  },
  {
    name: "AutoGen",
    accent: "#8a5cf6",
    icon: Images.iconAgentTypeConversational,
    description:
      "Microsoft's open-source framework for conversational multi-agent systems. AutoGen excels in Azure-integrated environments and scenarios requiring dynamic agent conversations, code execution, and tight integration with Microsoft 365 and enterprise data platforms.",
    bestFor: "Azure & Microsoft ecosystem",
  },
  {
    name: "Salesforce Agentforce",
    accent: "#21ad65",
    icon: Images.iconCapabilityAgentforce,
    description:
      "Native AI agents built directly within the Salesforce platform. Agentforce agents have deep access to your CRM data, Salesforce Flows, and Einstein AI capabilities — making them the most powerful choice for customer-facing and sales operations use cases.",
    bestFor: "CRM & customer-facing automation",
  },
  {
    name: "Model Context Protocol",
    accent: "#3d7bd9",
    icon: Images.iconPillarConnectivity,
    description:
      "Anthropic's open standard for connecting AI agents to enterprise data and tools. MCP eliminates the M×N integration problem by providing a single, standardized protocol, allowing agents built on any framework to access your CRM, ERP, and legacy systems securely.",
    bestFor: "Enterprise system integration",
  },
  {
    name: "OpenAI Assistants API",
    accent: "#8a5cf6",
    icon: Images.iconProcessReasonPlan,
    description:
      "OpenAI's production-ready Assistants API provides built-in tool use, code interpreter, file search, and persistent thread management. Ideal for building highly capable, general-purpose agents that leverage the latest GPT-4 and o-series model capabilities.",
    bestFor: "General-purpose & GPT-native agents",
  },
];

const INDUSTRY_IMPACT = [
  {
    id: "healthcare",
    label: "Healthcare",
    image: Images.industryHealthcare,
    metrics: [
      { value: "50%+", label: "Faster clinical documentation with AI-assisted note generation" },
      { value: "40%", label: "Reduction in call center volume via intelligent scheduling agents" },
      { value: "↑25%", label: "First-pass claim acceptance via pre-submission review agents" },
    ],
    useCases: [
      { name: "Clinical Documentation Agent", flow: "EHR → Transcription → Structured Notes → Provider Review" },
      { name: "Smart Scheduling Agent", flow: "Patient Request → NLP → Availability Check → Confirmation" },
      { name: "Prior Authorization Agent", flow: "Prescription → Payer Rules → Auto-Submit → Status Tracking" },
      { name: "Claims Processing Agent", flow: "Claim → Validation → Coding Review → Submission → Follow-up" },
    ],
  },
  {
    id: "financial-services",
    label: "Financial Services",
    image: Images.industryFinancialServices,
    metrics: [
      { value: "70%", label: "Reduction in loan processing time with document analysis agents" },
      { value: "3×", label: "Faster client onboarding with KYC and compliance automation" },
      { value: "85%", label: "Fraud alert accuracy improvement with pattern-matching agents" },
    ],
    useCases: [
      { name: "Loan Processing Agent", flow: "Application → Document Extraction → Credit Analysis → Decision" },
      { name: "Fraud Detection Agent", flow: "Transaction → Pattern Analysis → Risk Score → Alert or Approve" },
      { name: "KYC & Onboarding Agent", flow: "Documents → Identity Verification → Compliance Check → Approval" },
      { name: "Portfolio Analysis Agent", flow: "Market Data → Risk Assessment → Rebalancing Recommendations" },
    ],
  },
  {
    id: "nonprofit-education",
    label: "Nonprofit & Education",
    image: Images.industryNonprofits,
    metrics: [
      { value: "45%", label: "Increase in donor engagement with personalized outreach agents" },
      { value: "60%", label: "Reduction in grant research time with automated discovery agents" },
      { value: "30%", label: "Improvement in student retention with proactive support agents" },
    ],
    useCases: [
      { name: "Donor Engagement Agent", flow: "Donor Profile → Personalization → Outreach → Response Tracking" },
      { name: "Grant Research Agent", flow: "Mission Profile → Grant Database → Match Analysis → Draft Report" },
      { name: "Student Success Agent", flow: "Performance Data → Risk Identification → Intervention → Follow-up" },
      { name: "Admissions Processing Agent", flow: "Application → Document Review → Scoring → Decision Support" },
    ],
  },
  {
    id: "technology-saas",
    label: "Technology & SaaS",
    image: Images.industryTechnologySaas,
    metrics: [
      { value: "55%", label: "Faster incident resolution with intelligent IT operations agents" },
      { value: "40%", label: "Reduction in support ticket volume with self-service agents" },
      { value: "3×", label: "Faster code review cycles with AI-assisted development agents" },
    ],
    useCases: [
      { name: "IT Operations Agent", flow: "Alert → Root Cause Analysis → Remediation → Verification" },
      { name: "Technical Support Agent", flow: "Ticket → Knowledge Base → Solution → Escalation if Needed" },
      { name: "CI/CD Monitoring Agent", flow: "Build Event → Test Analysis → Failure Diagnosis → Dev Notification" },
      { name: "Customer Success Agent", flow: "Usage Data → Churn Risk → Proactive Outreach → Retention Action" },
    ],
  },
  {
    id: "retail-ecommerce",
    label: "Retail & E-Commerce",
    image: Images.industryRetailEcommerce,
    metrics: [
      { value: "35%", label: "Increase in conversion with personalized shopping agents" },
      { value: "25%", label: "Reduction in inventory holding costs with demand planning agents" },
      { value: "50%", label: "Faster order resolution with autonomous customer service agents" },
    ],
    useCases: [
      { name: "Personal Shopping Agent", flow: "Customer Profile → Preference Analysis → Recommendations → Purchase" },
      { name: "Inventory Management Agent", flow: "Sales Data → Demand Forecast → Reorder Trigger → Supplier PO" },
      { name: "Order Tracking Agent", flow: "Order Event → Logistics API → Customer Notification → Issue Resolution" },
      { name: "Returns & Refunds Agent", flow: "Return Request → Policy Check → Approval → Refund Processing" },
    ],
  },
];

const DELIVERY_PHASES = [
  {
    weeks: "Week 1–2",
    title: "Discovery & Use Case Design",
    description:
      "Identify high-ROI agent opportunities, map existing workflows, define agent personas, tools, and success metrics. Deliver a prioritized agent roadmap.",
  },
  {
    weeks: "Week 2–4",
    title: "Architecture & Framework Selection",
    description:
      "Design the agent architecture, select the right framework (LangGraph, CrewAI, Agentforce), define tool integrations, memory strategy, and governance model.",
  },
  {
    weeks: "Week 4–10",
    title: "Build, Integrate & Test",
    description:
      "Develop agent logic, integrate enterprise APIs and data sources, implement guardrails and human-in-the-loop checkpoints. Iterative demos throughout the build cycle.",
  },
  {
    weeks: "Week 10–12+",
    title: "Deploy, Monitor & Optimize",
    description:
      "Launch to production, train your teams, establish monitoring dashboards, and continuously optimize agent performance based on real-world outcomes.",
  },
];

const COMPARISON_PLANS = [
  {
    name: "Build In-House",
    highlight: false,
    rows: [
      "~ 6–18 months",
      "~ Depends on team expertise",
      "~ Requires significant dev effort",
      "~ Must be designed from scratch",
      "~ Requires Salesforce expertise",
      "✓ Client-owned",
      "✗ Built from zero",
    ],
  },
  {
    name: "Mirketa Agent Development",
    highlight: true,
    rows: [
      "✓ 8–12 weeks",
      "✓ Framework-agnostic",
      "✓ Native MCP + custom connectors",
      "✓ Built-in, configurable",
      "✓ Deep native integration",
      "✓ 100% client-owned",
      "✓ Pre-built accelerators",
    ],
  },
  {
    name: "Generic AI Platforms",
    highlight: false,
    rows: [
      "~ 3–6 months (with customization)",
      "✗ Locked to platform",
      "~ Limited connector library",
      "~ Basic guardrails only",
      "~ API-level only",
      "✗ Platform-dependent",
      "~ Generic templates only",
    ],
  },
];

const COMPARISON_LABELS = [
  "Time to production deployment",
  "Framework flexibility",
  "Enterprise system integration",
  "Governance & trust layer",
  "Salesforce / Agentforce support",
  "Client IP ownership",
  "Industry-specific use cases",
];

const TESTIMONIALS = [
  {
    quote:
      "We had tried to build an internal AI agent for six months with our own team and kept hitting walls — hallucinations, unreliable tool calls, no governance. Mirketa came in, assessed our architecture, and had a production-ready agent running in eight weeks. The difference was their experience with LangGraph and their trust layer framework. Our compliance team finally signed off.",
    attribution: "VP of Engineering, Regional Financial Services Firm",
  },
  {
    quote:
      "Our clinical documentation process was consuming 3–4 hours of physician time per day. Mirketa built a clinical notes agent that integrates directly with our EHR system and generates structured SOAP notes from voice transcriptions. Physicians now spend 45 minutes on documentation. That time goes back to patient care. The ROI was evident within the first month.",
    attribution: "Chief Information Officer, Multi-Site Healthcare Network",
  },
];

const FAQS = [
  {
    q: "What exactly is an AI agent, and how is it different from a chatbot?",
    a: "A chatbot responds to questions using predefined rules or a language model — it answers, but it doesn't act. An AI agent, by contrast, is goal-oriented: it receives an objective, reasons about how to achieve it, uses tools (APIs, databases, web search), takes actions, observes results, and adapts its approach until the goal is accomplished. An agent can execute a multi-step workflow autonomously — a chatbot cannot. Think of the difference between asking someone a question versus delegating a task to them.",
  },
  {
    q: "Which AI agent framework is right for our use case?",
    a: "The right framework depends on your use case complexity, existing technology stack, and governance requirements. LangGraph is best for complex, stateful, production-grade workflows requiring precise control. CrewAI excels at multi-agent collaboration with role-based design. AutoGen is ideal for Azure-integrated environments. Agentforce is the clear choice if you're deeply invested in Salesforce. We conduct a framework assessment during our Discovery phase and recommend the best option — or a combination — for your specific requirements.",
  },
  {
    q: "How do you prevent AI agents from making mistakes or taking unauthorized actions?",
    a: "We implement a multi-layered Trust & Governance framework. This includes: Approval Gates that require human sign-off before high-stakes actions (financial transactions, record modifications); Ambiguity Resolution protocols where agents present structured options rather than guessing; bounded retry logic to prevent runaway loops; role-based access controls that limit what each agent can access or modify; and full audit trails for every action taken. We start with maximum oversight and systematically reduce it as the agent demonstrates reliable performance in your environment.",
  },
  {
    q: "Do we need to replace our existing systems to deploy AI agents?",
    a: "No, and this is one of our core principles. We build AI agents that layer on top of your existing infrastructure using MCP integration and custom API connectors. Your legacy CRM, ERP, databases, and applications become AI-accessible resources without any migration or replacement. We have never required a client to replace a core system to deploy production AI agents.",
  },
  {
    q: "How long does it take to build and deploy an AI agent?",
    a: "A focused, single-purpose agent can go from discovery to production in 8–10 weeks. More complex multi-agent systems with extensive enterprise integrations typically take 10–16 weeks. Our pre-built industry accelerators for Healthcare, Financial Services, and Nonprofit significantly reduce development time for common use cases. We provide iterative demos throughout the build cycle so you see progress and can provide feedback every step of the way.",
  },
  {
    q: "Does Mirketa work with Salesforce and Agentforce?",
    a: "Yes — we are experienced Salesforce consulting partners with deep expertise in Agentforce, Einstein AI, and the broader Salesforce platform. We build native Agentforce agents that are deeply integrated with your CRM data, Salesforce Flows, and Apex code. For organizations with Salesforce as their system of record, Agentforce agents often deliver the fastest time-to-value because they have immediate access to your customer data without additional integration work.",
  },
  {
    q: "Who owns the intellectual property built during the engagement?",
    a: "You do — 100%. All custom agent code, configurations, prompts, and workflows built during your engagement are fully owned by your organization. We do not retain any rights to your custom implementations. You receive complete source code, documentation, and the knowledge transfer required to maintain and extend the agents independently after our engagement concludes.",
  },
];

const SEO = {
  title: "AI Agent Development Services | Mirketa",
  description:
    "Build AI agents that think, act, and deliver. Mirketa designs custom AI agent development with LangGraph, CrewAI, AutoGen, and Salesforce Agentforce.",
  canonical: "https://www.mirketa.com/agent-development/",
  keywords: [
    "AI Agent Development",
    "Custom AI Agent Development",
    "Multi-Agent Systems",
    "LangGraph Development",
    "CrewAI Development",
    "AutoGen Development",
    "Agent Governance",
    "Autonomous AI Agents",
    "AI agent development services for enterprises",
    "custom AI agent development company",
    "multi-agent system development partner",
    "build autonomous AI agents for business",
  ],
  schema: [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "AI Agent Development",
      provider: { "@type": "Organization", name: "Mirketa Inc.", url: "https://www.mirketa.com" },
      name: "AI Agent Development",
      description:
        "Design and deploy custom enterprise AI agents that autonomously plan, use tools, and execute complex multi-step workflows.",
      areaServed: "Global",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.mirketa.com/" },
        { "@type": "ListItem", position: 2, name: "AI Agent Development", item: "https://www.mirketa.com/agent-development/" },
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

const INSIGHTS = [
  {
    tag: "Technical Guide",
    title: "LangGraph vs. CrewAI vs. AutoGen: Choosing the Right Framework for Your Enterprise",
    description:
      "A practical decision framework for selecting the right AI agent technology based on your use case complexity, team expertise, and existing infrastructure.",
  },
  {
    tag: "Enterprise Strategy",
    title: "Building Trust in Autonomous AI: The Progressive Oversight Framework",
    description:
      "How enterprise leaders can deploy AI agents with confidence using Approval Gates, Ambiguity Resolution, and Trust Calibration, and systematically earn autonomy over time.",
  },
  {
    tag: "ROI Guide",
    title: "Measuring AI Agent ROI: The Metrics That Actually Matter for Enterprise Deployments",
    description:
      "Beyond cost savings — how to measure the true business impact of AI agents across time-to-completion, error rates, employee satisfaction, and customer outcomes.",
  },
];

const FINAL_CTA = {
  title: "Your First AI Agent Could Be Live in 8 Weeks.",
  description:
    "You don't need to replace your systems or hire a team of ML engineers. You need the right partner, the right framework, and a clear use case. Let's find yours together.",
  primaryCta: { label: "Talk to an AI Expert", href: "#contact" },
  secondaryCta: { label: "Explore AI Accelerators", href: "/ai-enablement" },
};

const CONTACT = {
  heading: "Start Your AI Agent Development Journey",
  description:
    "Our AI engineering team is ready to assess your current environment and identify the highest-ROI agent opportunities. No obligation — just a focused conversation about your specific challenges.",
  benefits: [
    { title: "Free Use Case Assessment", description: "We identify your top 3 highest-ROI agent opportunities based on your workflows and data" },
    { title: "Response Within 24 Hours", description: "Our team will reach out to schedule your assessment call within one business day" },
    { title: "NDA Available on Request", description: "We treat your business information with complete confidentiality from day one" },
    { title: "Framework Recommendation", description: "We recommend the right agent framework for your use case — no vendor bias" },
  ],
};

const CONSULTATION = {
  eyebrow: "Get Started",
  heading: "Schedule an AI Agent Development Consultation",
  description: CONTACT.description,
  benefits: CONTACT.benefits.map((b) => b.title),
  formTitle: "Talk to an AI Expert",
};

// ============================================================
// HOOKS
// ============================================================

function useInView(threshold = 0.2) {
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

function useCountUp(target, inView, duration = 1400) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let frame;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(target * eased);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, target, duration]);

  return Math.round(value);
}

function useRipple() {
  return (e) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const ripple = document.createElement("span");
    const size = Math.max(rect.width, rect.height);
    ripple.className = "btn-ripple";
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  };
}

function useCarouselNav() {
  const swiperRef = useRef(null);
  const bindSwiper = (swiper) => {
    swiperRef.current = swiper;
  };
  const slidePrev = () => swiperRef.current?.slidePrev();
  const slideNext = () => swiperRef.current?.slideNext();
  return { bindSwiper, slidePrev, slideNext };
}

const cssUrl = (src) => `url("${src}")`;

// ============================================================
// MAIN COMPONENT
// ============================================================

export default function AgentDevelopment() {
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

      gsap.utils.toArray(".ad-reveal").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 32,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      gsap.utils.toArray(".ad-reveal-stagger").forEach((el) => {
        gsap.from(el.children, {
          opacity: 0,
          y: 26,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      gsap.utils.toArray(".ad-zoom-in").forEach((el) => {
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
    <div className="agent-development">
      <Seo {...SEO} />
      <HeroSection heroTextRef={heroTextRef} />
      <ProcessSection />
      <ShiftSection />
      <CapabilitiesSection />
      <AgentTypesSection />
      <FrameworksSection />
      <IndustryImpactSection />
      <DeliverySection />
      <ComparisonSection />
      <TestimonialsSection />
      <FaqSection />
      <InsightsSection />
      <FinalCtaSection />
      <ContactSection />
    </div>
  );
}

// ============================================================
// HERO — full-bleed image with an overlapping stat bar
// ============================================================

function MetricValue({ metric }) {
  const [ref, inView] = useInView(0.5);
  const isNumeric = typeof metric.value === "number";
  const count = useCountUp(isNumeric ? metric.value : 0, inView && isNumeric);

  return (
    <div ref={ref} className="ad-metric">
      <div className="ad-metric__value">
        {isNumeric ? count : metric.value}
        {metric.suffix}
      </div>
      <p className="ad-metric__label">{metric.label}</p>
    </div>
  );
}

function HeroSection({ heroTextRef }) {
  return (
    <section className="ad-hero" aria-label="AI Agent Development">
      <div className="ad-hero__media" style={{ backgroundImage: cssUrl(Images.heroAgentDevelopment) }}>
        <div className="ad-hero__scrim" />
        <div className="container">
          <Breadcrumb items={BREADCRUMB_ITEMS} className="ad-breadcrumb" />
        </div>
        <div className="container ad-hero__inner">
          <div ref={heroTextRef} className="ad-hero__text">
            <p className="ad-eyebrow">{HERO.eyebrow}</p>
            <h1>{HERO.title}</h1>
            <p className="ad-hero__description">{HERO.description}</p>
            <div className="ad-hero__ctas">
              <a href={HERO.primaryCta.href} className="btn btn-primary ad-btn">
                {HERO.primaryCta.label} <span aria-hidden="true">→</span>
              </a>
              <a href={HERO.secondaryCta.href} className="btn btn-secondary ad-btn">
                {HERO.secondaryCta.label}
              </a>
            </div>
          </div>
        </div>
        <button
          type="button"
          className="ad-scroll-indicator"
          onClick={() => document.getElementById("capabilities")?.scrollIntoView({ behavior: "smooth" })}
          aria-label="Scroll to core capabilities"
        >
          <span />
        </button>
      </div>

      <div className="container">
        <div className="ad-stat-bar ad-reveal-stagger">
          {KEY_METRICS.map((metric) => (
            <MetricValue key={metric.label} metric={metric} />
          ))}
        </div>
        <div className="ad-hero__industries">
          <span>Trusted across:</span>
          <ul>
            {TRUSTED_INDUSTRIES.map((ind) => (
              <li key={ind}>{ind}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// HOW AN AI AGENT WORKS — horizontal pipeline
// ============================================================

function ProcessSection() {
  return (
    <section className="section ad-process" aria-labelledby="ad-process-heading">
      <div className="container">
        <div className="section-heading ad-reveal">
          <p className="ad-eyebrow">The Agent Loop</p>
          <h2 id="ad-process-heading">How an AI Agent Works</h2>
        </div>
        <div className="ad-process__rail ad-reveal-stagger">
          {PROCESS_STEPS.map((step, i) => (
            <div className="ad-process__step" key={step.title}>
              <div className="ad-process__node">
                <img src={step.icon} alt="" loading="lazy" />
                <span className="ad-process__number">{i + 1}</span>
              </div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
              {i < PROCESS_STEPS.length - 1 && <span className="ad-process__connector" aria-hidden="true" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// THE SHIFT TO AGENTIC AI — split panel
// ============================================================

function ShiftSection() {
  return (
    <section className="section ad-shift" aria-labelledby="ad-shift-heading">
      <div className="container">
        <div className="section-heading ad-reveal">
          <p className="ad-eyebrow">Why It Matters</p>
          <h2 id="ad-shift-heading">{SHIFT.heading}</h2>
        </div>
        <div className="ad-shift__panel ad-reveal">
          <div className="ad-shift__half ad-shift__half--old">
            <h3>{SHIFT.traditionalTitle}</h3>
            <ul>
              {SHIFT.traditionalItems.map((item) => (
                <li key={item}>
                  <span className="ad-mark ad-mark--x" aria-hidden="true">✕</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="ad-shift__divider">
            <span>VS</span>
          </div>
          <div className="ad-shift__half ad-shift__half--new">
            <h3>{SHIFT.agentTitle}</h3>
            <ul>
              {SHIFT.agentItems.map((item) => (
                <li key={item}>
                  <span className="ad-mark ad-mark--check" aria-hidden="true">✓</span>
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
// CORE CAPABILITIES — IDE / code-editor styled cards
// ============================================================

function CapabilitiesSection() {
  return (
    <section className="section ad-capabilities" id="capabilities" aria-labelledby="ad-capabilities-heading">
      <div className="container">
        <div className="section-heading ad-reveal">
          <p className="ad-eyebrow">Core Capabilities</p>
          <h2 id="ad-capabilities-heading">What We Build for Your Enterprise</h2>
        </div>
        <div className="ad-capabilities__grid ad-reveal-stagger">
          {CAPABILITIES.map((cap) => (
            <div className="ad-code-card" key={cap.title}>
              <div className="ad-code-card__titlebar">
                <span className="ad-code-card__dot ad-code-card__dot--red" />
                <span className="ad-code-card__dot ad-code-card__dot--yellow" />
                <span className="ad-code-card__dot ad-code-card__dot--green" />
                <span className="ad-code-card__filename">{cap.file}</span>
              </div>
              <div className="ad-code-card__body">
                <img src={cap.icon} alt="" className="ad-code-card__icon" loading="lazy" />
                <h3>{cap.title}</h3>
                <p>{cap.description}</p>
                <ul>
                  {cap.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
                <div className="ad-code-card__tags">
                  {cap.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// TYPES OF AI AGENTS — horizontal scroll-snap rail
// ============================================================

function AgentTypesSection() {
  const railRef = useRef(null);

  const scrollByCard = (dir) => {
    const rail = railRef.current;
    if (!rail) return;
    const card = rail.querySelector(".ad-type-card");
    const amount = card ? card.getBoundingClientRect().width + 24 : 320;
    rail.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  return (
    <section className="section ad-types" aria-labelledby="ad-types-heading">
      <div className="container">
        <div className="ad-types__header ad-reveal">
          <div className="section-heading ad-types__heading">
            <p className="ad-eyebrow">Types of AI Agents</p>
            <h2 id="ad-types-heading">Built for Every Kind of Enterprise Work</h2>
          </div>
          <div className="ad-types__nav">
            <button type="button" onClick={() => scrollByCard(-1)} aria-label="Scroll agent types left">‹</button>
            <button type="button" onClick={() => scrollByCard(1)} aria-label="Scroll agent types right">›</button>
          </div>
        </div>
        <div className="ad-types__rail" ref={railRef}>
          {AGENT_TYPES.map((type) => (
            <article className="ad-type-card" key={type.title}>
              <span className="ad-type-card__index">{type.index}</span>
              <img src={type.icon} alt="" className="ad-type-card__icon" loading="lazy" />
              <h3>{type.title}</h3>
              <p>{type.description}</p>
              <div className="ad-type-card__use-cases">
                {type.useCases.map((uc) => (
                  <span key={uc}>{uc}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// TECHNOLOGY & FRAMEWORKS — package-registry style cards
// ============================================================

function FrameworksSection() {
  return (
    <section className="section ad-frameworks" aria-labelledby="ad-frameworks-heading">
      <div className="container">
        <div className="section-heading ad-reveal">
          <p className="ad-eyebrow">Technology & Frameworks</p>
          <h2 id="ad-frameworks-heading">Framework-Agnostic. Outcome-Obsessed.</h2>
        </div>
        <div className="ad-frameworks__grid ad-reveal-stagger">
          {FRAMEWORKS.map((fw) => (
            <div className="ad-framework-card" key={fw.name} style={{ "--accent": fw.accent }}>
              <div className="ad-framework-card__head">
                <img src={fw.icon} alt="" loading="lazy" />
                <h3>{fw.name}</h3>
              </div>
              <p>{fw.description}</p>
              <span className="ad-framework-card__best-for">Best for: {fw.bestFor}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// INDUSTRY IMPACT — vertical sidebar tabs
// ============================================================

function IndustryImpactSection() {
  const [active, setActive] = useState(INDUSTRY_IMPACT[0].id);
  const industry = INDUSTRY_IMPACT.find((i) => i.id === active) ?? INDUSTRY_IMPACT[0];

  const handleKeyDown = (e, index) => {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    e.preventDefault();
    const dir = e.key === "ArrowDown" ? 1 : -1;
    const nextIndex = (index + dir + INDUSTRY_IMPACT.length) % INDUSTRY_IMPACT.length;
    setActive(INDUSTRY_IMPACT[nextIndex].id);
    document.getElementById(`ad-industry-tab-${INDUSTRY_IMPACT[nextIndex].id}`)?.focus();
  };

  return (
    <section className="section ad-industries" aria-labelledby="ad-industries-heading">
      <div className="container">
        <div className="section-heading ad-reveal">
          <p className="ad-eyebrow">Industry Impact</p>
          <h2 id="ad-industries-heading">AI Agents Across Every Vertical</h2>
        </div>
        <div className="ad-industries__layout">
          <div className="ad-industries__sidebar" role="tablist" aria-label="Select an industry" aria-orientation="vertical">
            {INDUSTRY_IMPACT.map((ind, i) => (
              <button
                key={ind.id}
                id={`ad-industry-tab-${ind.id}`}
                role="tab"
                type="button"
                aria-selected={active === ind.id}
                className={`ad-industries__sidebar-item ${active === ind.id ? "is-active" : ""}`}
                onClick={() => setActive(ind.id)}
                onKeyDown={(e) => handleKeyDown(e, i)}
              >
                {ind.label}
              </button>
            ))}
          </div>
          <div className="ad-industries__panel" role="tabpanel">
            <div className="ad-industries__media" style={{ backgroundImage: cssUrl(industry.image) }} role="img" aria-label={`${industry.label} enterprise environment`} />
            <div className="ad-industries__metrics">
              {industry.metrics.map((m) => (
                <div key={m.label} className="ad-industries__metric">
                  <strong>{m.value}</strong>
                  <span>{m.label}</span>
                </div>
              ))}
            </div>
            <div className="ad-industries__use-cases">
              {industry.useCases.map((uc) => (
                <div key={uc.name} className="ad-flow-card">
                  <h4>{uc.name}</h4>
                  <div className="ad-flow-card__chain">
                    {uc.flow.split(" → ").map((step, idx, arr) => (
                      <span key={step} className="ad-flow-card__step-group">
                        <span className="ad-flow-card__step">{step}</span>
                        {idx < arr.length - 1 && <span className="ad-flow-card__arrow" aria-hidden="true">→</span>}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// DELIVERY APPROACH — horizontal roadmap with hex markers
// ============================================================

function DeliverySection() {
  return (
    <section className="section ad-delivery" aria-labelledby="ad-delivery-heading">
      <div className="container">
        <div className="section-heading ad-reveal">
          <p className="ad-eyebrow">Delivery Approach</p>
          <h2 id="ad-delivery-heading">From Discovery to Production in Weeks</h2>
        </div>
        <div className="ad-delivery__road ad-reveal-stagger">
          {DELIVERY_PHASES.map((phase, i) => (
            <div className="ad-delivery__stop" key={phase.title}>
              <div className="ad-delivery__hex">
                <span>{i + 1}</span>
              </div>
              <span className="ad-delivery__weeks">{phase.weeks}</span>
              <h3>{phase.title}</h3>
              <p>{phase.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// WHY MIRKETA — pricing-style comparison cards
// ============================================================

function ComparisonSection() {
  const renderCell = (text) => {
    let variant = "neutral";
    if (text.startsWith("✓")) variant = "good";
    else if (text.startsWith("✗")) variant = "bad";
    const label = text.replace(/^[✓✗~]\s*/, "");
    const symbol = text.startsWith("✓") ? "✓" : text.startsWith("✗") ? "✕" : "~";
    return (
      <span className={`ad-plan-cell ad-plan-cell--${variant}`}>
        <span aria-hidden="true">{symbol}</span>
        {label}
      </span>
    );
  };

  return (
    <section className="section ad-comparison" aria-labelledby="ad-comparison-heading">
      <div className="container">
        <div className="section-heading ad-reveal">
          <p className="ad-eyebrow">Why Mirketa</p>
          <h2 id="ad-comparison-heading">Mirketa vs. Building In-House vs. Generic Platforms</h2>
        </div>
        <div className="ad-comparison__grid ad-reveal-stagger">
          {COMPARISON_PLANS.map((plan) => (
            <div className={`ad-plan-card ${plan.highlight ? "is-highlighted" : ""}`} key={plan.name}>
              {plan.highlight && <span className="ad-plan-card__ribbon">Recommended</span>}
              <h3>{plan.name}</h3>
              <ul>
                {plan.rows.map((row, i) => (
                  <li key={COMPARISON_LABELS[i]}>
                    <span className="ad-plan-cell__label">{COMPARISON_LABELS[i]}</span>
                    {renderCell(row)}
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
// CLIENT OUTCOMES — testimonial carousel
// ============================================================

function TestimonialsSection() {
  const { bindSwiper, slidePrev, slideNext } = useCarouselNav();

  return (
    <section className="section ad-testimonials" aria-labelledby="ad-testimonials-heading">
      <div className="container">
        <div className="ad-testimonials__header ad-reveal">
          <div className="section-heading ad-testimonials__heading">
            <p className="ad-eyebrow">Client Outcomes</p>
            <h2 id="ad-testimonials-heading">What Our Clients Say</h2>
          </div>
          <div className="ad-testimonials__nav">
            <button type="button" onClick={slidePrev} aria-label="Previous testimonial">‹</button>
            <button type="button" onClick={slideNext} aria-label="Next testimonial">›</button>
          </div>
        </div>
        <Swiper
          modules={[Autoplay]}
          loop
          grabCursor
          speed={700}
          autoplay={{ delay: 5500, disableOnInteraction: false, pauseOnMouseEnter: true }}
          spaceBetween={24}
          slidesPerView={1}
          onSwiper={bindSwiper}
          className="ad-testimonials__swiper"
        >
          {TESTIMONIALS.map((t) => (
            <SwiperSlide key={t.attribution}>
              <blockquote className="ad-testimonial">
                <span className="ad-testimonial__mark" aria-hidden="true">&ldquo;</span>
                <p>{t.quote}</p>
                <footer>{t.attribution}</footer>
              </blockquote>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

// ============================================================
// FAQ — chat transcript UI
// ============================================================

function FaqBubble({ item, index, openIndex, setOpenIndex }) {
  const open = openIndex === index;
  const panelId = `ad-faq-answer-${index}`;

  return (
    <div className="ad-chat-turn">
      <button
        type="button"
        className="ad-chat-bubble ad-chat-bubble--user"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpenIndex(open ? -1 : index)}
      >
        {item.q}
      </button>
      {open && (
        <div id={panelId} className="ad-chat-row ad-chat-row--agent">
          <span className="ad-chat-avatar" aria-hidden="true">AI</span>
          <div className="ad-chat-bubble ad-chat-bubble--agent">
            <p>{item.a}</p>
          </div>
        </div>
      )}
    </div>
  );
}

function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="section ad-faq" aria-labelledby="ad-faq-heading">
      <div className="container">
        <div className="section-heading ad-reveal">
          <p className="ad-eyebrow">FAQ</p>
          <h2 id="ad-faq-heading">Ask Us Anything</h2>
        </div>
        <div className="ad-faq__transcript ad-reveal">
          {FAQS.map((item, i) => (
            <FaqBubble key={item.q} item={item} index={i} openIndex={openIndex} setOpenIndex={setOpenIndex} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// FEATURED INSIGHTS — reading-list rows
// ============================================================

function InsightsSection() {
  return (
    <section className="section ad-insights" aria-labelledby="ad-insights-heading">
      <div className="container">
        <div className="section-heading ad-reveal">
          <p className="ad-eyebrow">Featured Insights</p>
          <h2 id="ad-insights-heading">Agent Development Intelligence</h2>
        </div>
        <div className="ad-insights__list ad-reveal-stagger">
          {INSIGHTS.map((res) => (
            <article className="ad-insight-row" key={res.title}>
              <span className="ad-insight-row__tag">{res.tag}</span>
              <div className="ad-insight-row__body">
                <h3>{res.title}</h3>
                <p>{res.description}</p>
              </div>
              <span className="ad-insight-row__arrow" aria-hidden="true">→</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// FINAL CTA
// ============================================================

function FinalCtaSection() {
  const ripple = useRipple();
  return (
    <section className="ad-final-cta ad-reveal" aria-labelledby="ad-final-cta-heading">
      <div className="container ad-final-cta__inner">
        <h2 id="ad-final-cta-heading">{FINAL_CTA.title}</h2>
        <p>{FINAL_CTA.description}</p>
        <div className="ad-final-cta__ctas">
          <a href={FINAL_CTA.primaryCta.href} className="btn btn-primary ad-btn" onClick={ripple}>
            {FINAL_CTA.primaryCta.label}
          </a>
          <a href={FINAL_CTA.secondaryCta.href} className="btn btn-outline-dark ad-btn">
            {FINAL_CTA.secondaryCta.label}
          </a>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// CONTACT
// ============================================================

function ContactSection() {
  return <ConsultationSection {...CONSULTATION} />;
}
