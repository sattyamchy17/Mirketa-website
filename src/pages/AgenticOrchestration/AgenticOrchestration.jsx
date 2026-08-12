import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Images } from "../../assets/images/index.js";
import Seo from "../../components/Seo/Seo.jsx";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb.jsx";
import ConsultationSection from "../../components/ConsultationSection/ConsultationSection.jsx";
import "./AgenticOrchestration.css";

const BREADCRUMB_ITEMS = [{ label: "Home", href: "/" }, { label: "Agentic Orchestration & Legacy Integration" }];

gsap.registerPlugin(ScrollTrigger);

// ============================================================
// DATA — content sourced verbatim from
// https://mirketa.com/ai-enablement/agentic-orchestration-legacy-integration/
// ============================================================

const HERO = {
  eyebrow: "Agentic Orchestration & Legacy Integration",
  title: "Move Beyond AI Pilots to Production-Scale Intelligence.",
  description:
    "Architect secure, scalable AI ecosystems that unify your SaaS and legacy environments, without the cost or risk of system replacement. Powered by Agentic AI, MCP integration, and proven multi-agent frameworks.",
  primaryCta: { label: "Talk to AI Architecture Team", href: "#contact" },
  secondaryCta: { label: "Explore Capabilities", href: "#capabilities" },
  badges: [
    "MCP Integration",
    "Multi-Agent Orchestration",
    "Zero Legacy Replacement",
    "Salesforce + Agentforce Ready",
  ],
};

const KEY_METRICS = [
  { value: 40, suffix: "%", label: "Faster Time-to-Production vs. custom-built integrations" },
  { value: 30, suffix: "+", label: "Enterprise System Integrations Delivered" },
  { value: 0, suffix: "", label: "Legacy Systems Replaced, Ever" },
  { value: 9.6, suffix: "", decimals: 1, label: "Average Client CSAT Score" },
];

const INDUSTRIES_SERVED = ["Healthcare", "Financial Services", "Nonprofit", "E-Commerce", "Technology"];

const CAPABILITIES_STRIP = [
  { label: "MCP Integration", tag: "Protocol Layer", icon: Images.iconPillarConnectivity },
  { label: "Multi-Agent Routing", tag: "Orchestration", icon: Images.serviceAgenticOrchestration },
  { label: "Legacy AI Bridge", tag: "Integration", icon: Images.iconLegacyBridge },
  { label: "Trust & Security Layer", tag: "Governance", icon: Images.iconDimensionGovernance },
  { label: "Parallel Fan-out", tag: "Performance", icon: Images.iconPatternFanout },
  { label: "DAG Pipelines", tag: "Workflow", icon: Images.iconPatternDag },
];

const PROBLEM = {
  heading: "Most AI Initiatives Stall Before They Scale",
  statement:
    "The bottleneck isn't intelligence — it's orchestration. Enterprises get trapped building one-off integrations that create unsustainable complexity and unpredictable AI behavior.",
  trapTitle: "The 'M × N' Integration Trap",
  trapItems: [
    "Bespoke adapters multiply with every new model or data source",
    "Context windows overflow, degrading AI response quality",
    "No consistent governance across AI agents and tools",
    "Legacy systems locked out of AI value creation",
    "Pilot projects fail to scale to production environments",
  ],
  solutionTitle: "The Mirketa Orchestration Layer",
  solutionItems: [
    "Single MCP integration layer replaces dozens of custom adapters",
    "Managed context windows prevent overflow and ensure accuracy",
    "Centralized governance with Approval Gates and Trust Calibration",
    "Legacy systems exposed as secure AI-accessible Resources and Tools",
    "Production-ready architecture from Week 1, not an afterthought",
  ],
};

const CAPABILITIES_DEEP_DIVE = [
  {
    index: "01",
    icon: Images.iconPillarConnectivity,
    title: "Model Context Protocol (MCP) Integration",
    description:
      "We utilize Anthropic's open standard to collapse complex integration surfaces into a single, shared protocol. One integration layer connects AI to every system — CRM, ERP, databases, and legacy applications.",
    benefits: [
      "Eliminates the M × N integration complexity permanently",
      "Exposes enterprise data as secure, AI-readable Resources",
      "Enables executable Tools for cross-system workflow automation",
      "Transport-agnostic: works via stdio, HTTP, and SSE protocols",
    ],
  },
  {
    index: "02",
    icon: Images.serviceAgenticOrchestration,
    title: "Strategic Multi-Agent Orchestration",
    description:
      "We don't just deploy models — we coordinate multiple AI agents, memory stores, and human touchpoints into reliable, long-running workflows. Complex tasks are decomposed and distributed across specialist agents for maximum precision.",
    benefits: [
      "Orchestrator–Subagent patterns for complex task decomposition",
      "Parallel Fan-out to reduce total workflow latency",
      "DAG pipelines for sequential, dependency-aware processing",
      "Human-in-the-loop escalation for high-stakes decisions",
    ],
  },
  {
    index: "03",
    icon: Images.iconLegacyBridge,
    title: "Legacy System AI Enablement",
    description:
      "Your legacy systems contain decades of business-critical data. We unlock that value by layering sophisticated AI orchestration directly onto your current infrastructure — without migration, replacement, or disruption.",
    benefits: [
      "CRM and legacy databases exposed as AI-accessible Resources",
      "Secure read/write access governed by enterprise policies",
      "Zero system replacement — build on what you already own",
      "Bi-directional data flow between AI agents and legacy systems",
    ],
  },
  {
    index: "04",
    icon: Images.iconDimensionGovernance,
    title: "Trust & Security Layer",
    description:
      "Enterprise AI must be trustworthy before it can be transformative. Our Trust Layer implements progressive oversight — starting with maximum human control and systematically reducing approval friction as the system demonstrates consistent, reliable performance.",
    benefits: [
      "Approval Gates for financial transactions and record modifications",
      "Ambiguity Resolution: agents escalate with structured options, never guess",
      "Trust Calibration: oversight reduces as performance is validated",
      "Bounded retry logic prevents runaway agent loops",
    ],
  },
];

const ARCHITECTURE_PATTERNS = [
  {
    icon: Images.iconPatternOrchestratorSubagent,
    name: "Orchestrator–Subagent",
    description:
      "A central orchestrator agent decomposes complex tasks and delegates to specialist subagents each optimized for a specific function. Results are aggregated and validated before returning to the user, ensuring precision at every step.",
    bestFor: "Complex, multi-step workflows",
  },
  {
    icon: Images.iconPatternFanout,
    name: "Parallel Fan-out",
    description:
      "Multiple agents are spawned simultaneously across independent data streams, dramatically reducing total latency. Ideal for scenarios where tasks can be executed in parallel, such as multi-source data retrieval or concurrent analysis across business units.",
    bestFor: "High-volume, time-sensitive tasks",
  },
  {
    icon: Images.iconPatternDag,
    name: "Directed Acyclic Graphs (DAG)",
    description:
      "Sequential dependencies are modeled as a DAG, ensuring each processing step enriches the next in a controlled, auditable pipeline. Every node's output becomes the next node's context — building intelligence progressively through the workflow.",
    bestFor: "Sequential, dependency-driven pipelines",
  },
];

const MCP_FOUNDATION = [
  {
    title: "Server Architecture",
    description:
      "We expose your CRM and legacy databases as Resources (read-only context) and Tools (executable functions) through a secure, governed MCP interface that AI agents can query reliably.",
  },
  {
    title: "Transport Flexibility",
    description:
      "Whether via stdio for local developer tooling or HTTP + SSE for multi-tenant cloud environments, our architecture remains transport-agnostic — adapting to your infrastructure, not the other way around.",
  },
  {
    title: "Reliability Engineering",
    description:
      "Bounded retry logic handles tool failures gracefully, while selective summarization prevents context overflow. Every component is built for production uptime, not just proof-of-concept demos.",
  },
];

const INDUSTRY_IMPACT = [
  {
    id: "healthcare",
    label: "Healthcare",
    image: Images.industryHealthcare,
    overview:
      "Healthcare organizations manage a fragmented mix of EHR systems, payer platforms, scheduling tools, and clinical databases. Our orchestration layer bridges these silos — enabling AI agents to access patient data, trigger care workflows, and coordinate across clinical teams in real time, all within HIPAA-compliant governance frameworks.",
    metrics: [
      { value: "50%+", label: "Faster chart review with AI Patient Chart Summaries" },
      { value: "40%", label: "Reduction in call center volume via Smart Appointment Agent" },
      { value: "30-40%", label: "Fewer no-shows with predictive intervention workflows" },
      { value: "↑25%", label: "First-pass claim acceptance via orchestrated pre-submission review" },
    ],
    useCases: [
      { name: "Clinical Notes AI", flow: "EHR → AI → Structured Notes → Provider Review" },
      { name: "Smart Appointment Agent", flow: "NLP → Scheduling System → Confirmation → Reminder" },
      { name: "Claim Rejection Prediction", flow: "Claims Data → AI Analysis → Flag → Correction → Submit" },
      { name: "Lab Result Intelligence", flow: "Raw Data → Pattern Detection → Alert → Care Team" },
    ],
  },
  {
    id: "financial-services",
    label: "Financial Services",
    image: Images.industryFinancialServices,
    overview:
      "Financial institutions operate across a complex web of core banking systems, compliance platforms, and customer-facing applications. Our orchestration layer enables AI agents to perform real-time fraud detection, automate compliance checks, and deliver personalized financial guidance — all within strict regulatory governance frameworks.",
    metrics: [
      { value: "60%", label: "Reduction in manual compliance review time" },
      { value: "3x", label: "Faster fraud alert triage with multi-agent analysis" },
      { value: "45%", label: "Improvement in customer query resolution speed" },
      { value: "↓30%", label: "Operational cost reduction via workflow automation" },
    ],
    useCases: [
      { name: "Fraud Detection Agent", flow: "Transaction → Multi-Agent Analysis → Risk Score → Alert" },
      { name: "Compliance Automation", flow: "Policy DB → AI Review → Flag → Human Approval → Report" },
      { name: "Customer Intelligence Agent", flow: "CRM → Behavioral AI → Personalized Offer → CRM Update" },
      { name: "Risk Reporting Orchestration", flow: "Multi-Source Data → DAG Pipeline → Consolidated Report" },
    ],
  },
  {
    id: "nonprofit-education",
    label: "Nonprofit & Education",
    image: Images.industryNonprofits,
    overview:
      "Nonprofits and educational institutions often operate with limited IT resources but complex stakeholder relationships. Our orchestration layer connects donor management systems, student information platforms, and fundraising tools — enabling AI agents to drive engagement, predict churn, and optimize outreach at scale.",
    metrics: [
      { value: "25%", label: "Higher donor retention through predictive engagement" },
      { value: "40%", label: "Improvement in fundraising campaign ROI" },
      { value: "↓50%", label: "Reduction in manual donor outreach effort" },
      { value: "3x", label: "Faster grant application processing via AI workflows" },
    ],
    useCases: [
      { name: "Donor Management AI", flow: "CRM → Lapse Prediction → Personalized Outreach → Track" },
      { name: "Student Engagement Agent", flow: "SIS Data → Risk Detection → Advisor Alert → Intervention" },
      { name: "Grant Management Orchestration", flow: "Requirements → AI Draft → Review → Submission → Track" },
      { name: "Campaign Optimization AI", flow: "Historical Data → AI Segmentation → Targeted Campaign → ROI" },
    ],
  },
  {
    id: "technology-saas",
    label: "Technology & SaaS",
    image: Images.industryTechnologySaas,
    overview:
      "Technology companies face unique challenges: rapid product iteration, complex DevOps pipelines, and high-velocity sales cycles. Our orchestration layer accelerates every stage — from automated code review and deployment pipelines to AI-powered sales intelligence and customer success workflows.",
    metrics: [
      { value: "35%", label: "Shorter DevOps cycle times via agentic automation" },
      { value: "50%", label: "Reduction in mean time to remediate (MTTR) security issues" },
      { value: "20-30%", label: "Improvement in sales pipeline conversion rates" },
      { value: "↑40%", label: "Agent productivity with AI-powered case resolution" },
    ],
    useCases: [
      { name: "Vulnerability Remediation Agent", flow: "Scan → AI Triage → Auto-Remediation → Follow-up → Close" },
      { name: "Sales Intelligence Orchestration", flow: "CRM → AI Scoring → Prioritized Pipeline → Guided Actions" },
      { name: "DevOps Agentic Pipeline", flow: "Code Commit → AI Review → Test → Deploy → Monitor" },
      { name: "Case Resolution AI", flow: "Ticket → Knowledge Base → AI Suggestion → Agent → Resolve" },
    ],
  },
];

const DELIVERY_PHASES = [
  {
    weeks: "Week 1–2",
    title: "Architecture Assessment",
    description:
      "Evaluate your existing systems, data quality, integration landscape, and identify the highest-ROI orchestration opportunities for your specific business context.",
  },
  {
    weeks: "Week 2–3",
    title: "Framework Design",
    description:
      "Design the MCP integration layer, agent routing logic, data models, security protocols, and Trust Layer governance framework tailored to your enterprise policies.",
  },
  {
    weeks: "Week 3–8",
    title: "Build & Connect",
    description:
      "Develop the orchestration hub, connect APIs and legacy databases, configure multi-agent workflows, and run iterative demos with your team throughout the build cycle.",
  },
  {
    weeks: "Week 8–10+",
    title: "Deploy & Scale",
    description:
      "Launch to production, train your teams, monitor agent performance in real time, and continuously optimize context windows and routing logic based on live outcomes.",
  },
];

const COMPARISON_ROWS = [
  ["Time to production deployment", "✓ 8–10 weeks", "~ 6–18 months", "~ 3–6 months (with customization)"],
  ["Legacy system integration", "✓ Zero replacement required", "~ Requires migration effort", "✗ Often requires system upgrade"],
  ["MCP / open standard support", "✓ Native MCP integration", "~ Requires custom build", "~ Vendor-specific protocols"],
  ["Enterprise Trust & Security Layer", "✓ Built-in, configurable", "~ Must be designed from scratch", "~ Basic governance only"],
  ["Client IP ownership", "✓ 100% client-owned", "✓ Client-owned", "✗ Platform-dependent"],
  ["Industry-specific use cases", "✓ Pre-built accelerators", "✗ Built from zero", "~ Generic templates only"],
  ["Salesforce / Agentforce integration", "✓ Deep native integration", "~ Requires Salesforce expertise", "~ API-level only"],
];

const TESTIMONIALS = [
  {
    headline: "Zero Legacy Replacements",
    subheading: "Systems integrated without migration",
    quote:
      "We were convinced we'd need to replace our legacy EHR system to participate in AI. Mirketa proved us wrong. Their MCP integration layer connected our existing systems to AI agents in weeks — not the 18-month migration project we feared. We now have production AI workflows running on infrastructure we've had for years.",
    attribution: "Senior IT Director · Leading Healthcare Network",
  },
  {
    headline: "8 Weeks to Production",
    subheading: "From assessment to live deployment",
    quote:
      "What impressed us most was the Trust Layer. We were nervous about AI agents making autonomous decisions in our financial workflows. Mirketa's Approval Gates and Trust Calibration framework gave our compliance team the confidence to approve production deployment. The system started with maximum oversight and earned its autonomy over time.",
    attribution: "Chief Technology Officer · Regional Financial Services Firm",
  },
];

const FAQS = [
  {
    q: "What is AI orchestration, and why does my enterprise need it?",
    a: "AI orchestration is the coordinated management of multiple AI agents, data sources, and enterprise systems to achieve complex business goals reliably and at scale. Without orchestration, AI initiatives remain isolated pilots — each model operating independently, unable to access the full context of your business data or trigger actions across systems. Orchestration is what transforms individual AI capabilities into an integrated, production-grade intelligence layer that actually runs your business processes.",
  },
  {
    q: "What is Model Context Protocol (MCP), and how does Mirketa use it?",
    a: "Model Context Protocol (MCP) is an open standard developed by Anthropic that provides a universal way for AI models to interact with external data sources and tools. Instead of building custom integrations for every system your AI needs to access, MCP creates a single, standardized interface. Mirketa uses MCP to expose your enterprise systems — CRM, ERP, legacy databases, and APIs — as AI-accessible Resources (for reading context) and Tools (for executing actions). This eliminates the M × N integration complexity and makes your entire data estate available to AI agents through one governed layer.",
  },
  {
    q: "Do we need to replace our legacy systems to implement AI orchestration?",
    a: "Absolutely not — and this is one of our core differentiators. We have never required a client to replace their legacy systems to implement AI orchestration. Our MCP integration layer is designed to connect to existing infrastructure, exposing legacy databases and applications as secure, AI-readable resources. Whether your systems are decades-old mainframes or modern SaaS platforms, our architecture adapts to what you have, not the other way around. The value of your existing data and workflows is preserved and amplified, not discarded.",
  },
  {
    q: "How do you ensure AI agents don't make unauthorized or harmful decisions?",
    a: "Our Trust & Security Layer is built into every orchestration deployment. It operates on three principles: Approval Gates require explicit human consent before any consequential action such as financial transactions, record modifications, or customer communications. Ambiguity Resolution ensures that when an agent reaches a confidence threshold below a defined level, it escalates to your team with structured options rather than guessing. Trust Calibration starts every deployment with maximum human oversight and progressively reduces approval friction only as the system demonstrates consistent, validated performance. You remain in control at every stage.",
  },
  {
    q: "How long does it take to go from assessment to production deployment?",
    a: "Our standard delivery timeline runs 8–10 weeks from initial Architecture Assessment to production launch. Week 1–2 covers the assessment and opportunity identification. Week 2–3 is dedicated to framework design and security architecture. Weeks 3–8 involve the build, integration, and iterative testing cycle. Weeks 8–10+ cover production deployment, team training, and performance optimization. Complex enterprise environments with many legacy systems may require additional time, but our pre-built accelerators and MCP integration framework consistently reduce delivery timelines by 40% compared to custom-built approaches.",
  },
  {
    q: "Does Mirketa work with Salesforce and Agentforce?",
    a: "Yes, Salesforce and Agentforce are among our deepest integration competencies. We are a Salesforce partner with extensive experience deploying Einstein AI, Agentforce, and Data Cloud. Our orchestration frameworks are designed to work natively within the Salesforce ecosystem, connecting Agentforce agents to your external systems, legacy databases, and non-Salesforce platforms through our MCP integration layer. This means your Salesforce investment becomes the orchestration hub for your entire enterprise AI strategy, not just a CRM.",
  },
  {
    q: "Who owns the intellectual property built during the engagement?",
    a: "You do — 100%. While we leverage our pre-built accelerators and frameworks to speed up delivery, the underlying intellectual property developed during your engagement belongs entirely to your organization. This is a non-negotiable principle for us. We believe that the AI systems running your business should be owned by your business, not licensed from a consulting firm. Our accelerators reduce your time-to-value; your custom orchestration layer is yours to own, operate, and evolve independently.",
  },
];

const SEO = {
  title: "Agentic Orchestration & Legacy Integration | Mirketa",
  description:
    "Unify legacy systems and AI with Mirketa's Agentic Orchestration layer. MCP integration, multi-agent orchestration, and zero legacy replacement.",
  canonical: "https://www.mirketa.com/agentic-orchestration/",
  keywords: [
    "Agentic Orchestration",
    "AI Orchestration Platform",
    "Legacy System AI Integration",
    "Model Context Protocol",
    "MCP Integration",
    "Multi-Agent Orchestration",
    "Enterprise AI Integration",
    "AI Trust Layer",
    "agentic orchestration and legacy integration services",
    "MCP integration for enterprise AI",
    "AI orchestration without replacing legacy systems",
    "multi-agent orchestration consulting",
  ],
  schema: [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "Agentic Orchestration & Legacy Integration",
      provider: { "@type": "Organization", name: "Mirketa Inc.", url: "https://www.mirketa.com" },
      name: "Agentic Orchestration & Legacy Integration",
      description:
        "Architects secure, scalable AI ecosystems that unify SaaS and legacy environments using MCP integration, multi-agent orchestration, and zero legacy replacement.",
      areaServed: "Global",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.mirketa.com/" },
        { "@type": "ListItem", position: 2, name: "Agentic Orchestration", item: "https://www.mirketa.com/agentic-orchestration/" },
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
    title: "Model Context Protocol: The Enterprise Integration Standard for Agentic AI",
    description:
      "How MCP eliminates the M × N integration problem and creates a universal interface between AI models and enterprise systems.",
  },
  {
    tag: "Architecture Guide",
    title: "Orchestrator–Subagent vs. Parallel Fan-out: Choosing the Right Pattern",
    description:
      "A practical framework for selecting the right multi-agent architecture pattern based on your workflow complexity and performance requirements.",
  },
  {
    tag: "Enterprise Strategy",
    title: "Building Trust in Autonomous AI: The Progressive Oversight Framework",
    description:
      "How enterprise leaders can deploy AI agents with confidence using Approval Gates, Ambiguity Resolution, and Trust Calibration.",
  },
];

const FINAL_CTA = {
  title: "Ready to Scale?",
  subtitle: "Your AI Pilot Deserves to Become Production-Scale Intelligence.",
  description:
    "You don't need to replace your core systems to participate in the AI revolution. You need a robust orchestration and data access layer that unifies what you already have.",
  primaryCta: { label: "Talk to AI Architecture Team", href: "#contact" },
  secondaryCta: { label: "Explore AI Accelerators", href: "/ai-enablement" },
};

const CONTACT = {
  heading: "Talk to Our AI Architecture Team",
  description:
    "Tell us about your systems and integration goals. We'll show you how to unify your AI and legacy environments without replacing what already works.",
  points: ["8–10 week delivery timeline", "Zero legacy replacement, guaranteed", "100% client-owned IP"],
};

const CONSULTATION = {
  eyebrow: "Get Started",
  heading: "Schedule an Agentic Orchestration Consultation",
  description: CONTACT.description,
  benefits: CONTACT.points,
  formTitle: "Talk to AI Architecture Team",
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

function useCountUp(target, inView, duration = 1400, decimals = 0) {
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

  return decimals > 0 ? value.toFixed(decimals) : Math.round(value);
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

const cssUrl = (src) => `url("${src}")`;

// ============================================================
// MAIN COMPONENT
// ============================================================

export default function AgenticOrchestration() {
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

      gsap.utils.toArray(".ao-reveal").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 32,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      gsap.utils.toArray(".ao-reveal-stagger").forEach((el) => {
        gsap.from(el.children, {
          opacity: 0,
          y: 26,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      gsap.utils.toArray(".ao-slide-left").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          x: -40,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      gsap.utils.toArray(".ao-slide-right").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          x: 40,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="agentic-orchestration">
      <Seo {...SEO} />
      <HeroSection heroTextRef={heroTextRef} />
      <MetricsSection />
      <CapabilitiesStripSection />
      <ProblemSection />
      <DeepDiveSection />
      <ArchitectureSection />
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
// HERO
// ============================================================

function HeroSection({ heroTextRef }) {
  const scrollToCapabilities = () => {
    document.getElementById("capabilities")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="ao-hero"
      style={{ backgroundImage: cssUrl(Images.heroAgenticOrchestration) }}
      aria-label="Agentic Orchestration and Legacy Integration"
    >
      <div className="ao-hero__scrim" />
      <div className="container">
        <Breadcrumb items={BREADCRUMB_ITEMS} className="ao-breadcrumb" />
      </div>
      <div className="container ao-hero__inner">
        <p className="ao-eyebrow">{HERO.eyebrow}</p>
        <div ref={heroTextRef} className="ao-hero__text">
          <h1>{HERO.title}</h1>
          <p className="ao-hero__description">{HERO.description}</p>
          <div className="ao-hero__ctas">
            <a href={HERO.primaryCta.href} className="btn btn-primary ao-btn">
              {HERO.primaryCta.label} <span aria-hidden="true">→</span>
            </a>
            <a href={HERO.secondaryCta.href} className="btn btn-outline-dark ao-btn ao-btn--ghost">
              {HERO.secondaryCta.label}
            </a>
          </div>
          <ul className="ao-hero__badges">
            {HERO.badges.map((badge) => (
              <li key={badge}>{badge}</li>
            ))}
          </ul>
        </div>
      </div>
      <button type="button" className="ao-scroll-indicator" onClick={scrollToCapabilities} aria-label="Scroll to core capabilities">
        <span />
      </button>
    </section>
  );
}

// ============================================================
// KEY METRICS + INDUSTRIES SERVED STRIP
// ============================================================

function MetricTile({ metric }) {
  const [ref, inView] = useInView(0.4);
  const count = useCountUp(metric.value, inView, 1400, metric.decimals || 0);

  return (
    <div ref={ref} className="ao-metric-tile">
      <div className="ao-metric-tile__value">
        {count}
        {metric.suffix}
      </div>
      <p className="ao-metric-tile__label">{metric.label}</p>
    </div>
  );
}

function MetricsSection() {
  return (
    <section className="ao-metrics" aria-label="Key metrics">
      <div className="container">
        <div className="ao-metrics__grid ao-reveal-stagger">
          {KEY_METRICS.map((metric) => (
            <MetricTile key={metric.label} metric={metric} />
          ))}
        </div>
        <div className="ao-metrics__industries">
          <span>Industries Served:</span>
          <ul>
            {INDUSTRIES_SERVED.map((ind) => (
              <li key={ind}>{ind}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// CORE ORCHESTRATION CAPABILITIES STRIP
// ============================================================

function CapabilitiesStripSection() {
  return (
    <section className="section ao-capabilities" id="capabilities" aria-labelledby="ao-capabilities-heading">
      <div className="container">
        <div className="section-heading ao-reveal">
          <p className="ao-eyebrow">Core Orchestration Capabilities</p>
          <h2 id="ao-capabilities-heading">The Building Blocks of Production-Scale AI</h2>
        </div>
        <div className="ao-capabilities__grid ao-reveal-stagger">
          {CAPABILITIES_STRIP.map((cap) => (
            <div className="ao-capability-chip" key={cap.label}>
              <img src={cap.icon} alt="" className="ao-capability-chip__icon" loading="lazy" />
              <div>
                <h3>{cap.label}</h3>
                <span>{cap.tag}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// THE PROBLEM WE SOLVE — M x N trap vs. orchestration hub
// ============================================================

function ProblemSection() {
  return (
    <section className="section ao-problem" aria-labelledby="ao-problem-heading">
      <div className="container">
        <div className="section-heading ao-reveal">
          <p className="ao-eyebrow">The Problem We Solve</p>
          <h2 id="ao-problem-heading">{PROBLEM.heading}</h2>
          <p>{PROBLEM.statement}</p>
        </div>
        <div className="ao-problem__grid">
          <div className="ao-problem__panel ao-problem__panel--trap ao-slide-left">
            <img
              src={Images.diagramMxnTrap}
              alt="Diagram showing a tangled many-to-many web of custom integrations between data sources and enterprise systems"
              className="ao-problem__diagram"
              loading="lazy"
            />
            <h3>{PROBLEM.trapTitle}</h3>
            <ul>
              {PROBLEM.trapItems.map((item) => (
                <li key={item}>
                  <span className="ao-mark ao-mark--x" aria-hidden="true">✕</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="ao-problem__panel ao-problem__panel--hub ao-slide-right">
            <img
              src={Images.diagramOrchestrationHub}
              alt="Diagram showing a clean hub-and-spoke architecture where a single MCP orchestration layer connects data sources to enterprise systems"
              className="ao-problem__diagram"
              loading="lazy"
            />
            <h3>{PROBLEM.solutionTitle}</h3>
            <ul>
              {PROBLEM.solutionItems.map((item) => (
                <li key={item}>
                  <span className="ao-mark ao-mark--check" aria-hidden="true">✓</span>
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
// CORE CAPABILITIES DEEP DIVE
// ============================================================

function DeepDiveSection() {
  return (
    <section className="section ao-deep-dive" aria-labelledby="ao-deep-dive-heading">
      <div className="container">
        <div className="section-heading ao-reveal">
          <p className="ao-eyebrow">Core Capabilities</p>
          <h2 id="ao-deep-dive-heading">What We Build for Your Enterprise</h2>
          <p>
            Every capability is designed around a specific enterprise challenge, not generic AI theory. Each one is
            production-ready, reusable, and built to integrate with your existing systems.
          </p>
        </div>
        <div className="ao-deep-dive__list">
          {CAPABILITIES_DEEP_DIVE.map((cap, i) => (
            <article className={`ao-deep-dive__row ${i % 2 === 1 ? "is-reversed" : ""} ao-reveal`} key={cap.title}>
              <div className="ao-deep-dive__media">
                <span className="ao-deep-dive__index">{cap.index}</span>
                <img src={cap.icon} alt="" loading="lazy" />
              </div>
              <div className="ao-deep-dive__body">
                <h3>{cap.title}</h3>
                <p>{cap.description}</p>
                <ul>
                  {cap.benefits.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// TECHNICAL ARCHITECTURE — patterns + MCP foundation
// ============================================================

function ArchitectureSection() {
  return (
    <section className="section ao-architecture" aria-labelledby="ao-architecture-heading">
      <div className="container">
        <div className="section-heading ao-reveal">
          <p className="ao-eyebrow">Technical Architecture</p>
          <h2 id="ao-architecture-heading">Architectural Patterns for Production AI</h2>
          <p>
            Three proven orchestration patterns that power reliable, scalable AI deployments — each selected based on
            your specific workflow complexity and performance requirements.
          </p>
        </div>
        <div className="ao-architecture__patterns ao-reveal-stagger">
          {ARCHITECTURE_PATTERNS.map((pattern) => (
            <div className="ao-pattern-card" key={pattern.name}>
              <img src={pattern.icon} alt="" className="ao-pattern-card__icon" loading="lazy" />
              <h3>{pattern.name}</h3>
              <p>{pattern.description}</p>
              <span className="ao-pattern-card__best-for">Best for: {pattern.bestFor}</span>
            </div>
          ))}
        </div>

        <div className="ao-architecture__foundation ao-reveal">
          <h3>MCP Technical Foundation</h3>
          <div className="ao-architecture__foundation-grid">
            {MCP_FOUNDATION.map((item) => (
              <div key={item.title} className="ao-foundation-item">
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// INDUSTRY IMPACT — pill switcher + flow-chain visuals
// ============================================================

function IndustryImpactSection() {
  const [active, setActive] = useState(INDUSTRY_IMPACT[0].id);
  const industry = INDUSTRY_IMPACT.find((i) => i.id === active) ?? INDUSTRY_IMPACT[0];

  const handleKeyDown = (e, index) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const dir = e.key === "ArrowRight" ? 1 : -1;
    const nextIndex = (index + dir + INDUSTRY_IMPACT.length) % INDUSTRY_IMPACT.length;
    setActive(INDUSTRY_IMPACT[nextIndex].id);
    document.getElementById(`ao-industry-tab-${INDUSTRY_IMPACT[nextIndex].id}`)?.focus();
  };

  return (
    <section className="section ao-industries" aria-labelledby="ao-industries-heading">
      <div className="container">
        <div className="section-heading ao-reveal">
          <p className="ao-eyebrow">Industry Impact</p>
          <h2 id="ao-industries-heading">AI Orchestration Across Every Vertical</h2>
          <p>
            Our orchestration frameworks are not generic — they are designed around the specific data architectures,
            compliance requirements, and workflow patterns of each industry we serve.
          </p>
        </div>

        <div className="ao-industries__tabs" role="tablist" aria-label="Select an industry">
          {INDUSTRY_IMPACT.map((ind, i) => (
            <button
              key={ind.id}
              id={`ao-industry-tab-${ind.id}`}
              role="tab"
              type="button"
              aria-selected={active === ind.id}
              className={`ao-industries__tab ${active === ind.id ? "is-active" : ""}`}
              onClick={() => setActive(ind.id)}
              onKeyDown={(e) => handleKeyDown(e, i)}
            >
              {ind.label}
            </button>
          ))}
        </div>

        <div className="ao-industries__panel" role="tabpanel">
          <div className="ao-industries__media" style={{ backgroundImage: cssUrl(industry.image) }} role="img" aria-label={`${industry.label} enterprise environment`} />
          <div className="ao-industries__content">
            <h3>{industry.label} AI Orchestration</h3>
            <p>{industry.overview}</p>
            <div className="ao-industries__metrics">
              {industry.metrics.map((m) => (
                <div key={m.label} className="ao-industries__metric">
                  <strong>{m.value}</strong>
                  <span>{m.label}</span>
                </div>
              ))}
            </div>
            <div className="ao-industries__use-cases">
              {industry.useCases.map((uc) => (
                <div key={uc.name} className="ao-flow-card">
                  <h4>{uc.name}</h4>
                  <div className="ao-flow-card__chain">
                    {uc.flow.split(" → ").map((step, idx, arr) => (
                      <span key={step} className="ao-flow-card__step-group">
                        <span className="ao-flow-card__step">{step}</span>
                        {idx < arr.length - 1 && <span className="ao-flow-card__arrow" aria-hidden="true">→</span>}
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
// DELIVERY APPROACH — vertical timeline
// ============================================================

function DeliverySection() {
  return (
    <section className="section ao-delivery" aria-labelledby="ao-delivery-heading">
      <div className="container">
        <div className="section-heading ao-reveal">
          <p className="ao-eyebrow">Our Delivery Approach</p>
          <h2 id="ao-delivery-heading">From Architecture Assessment to Go-Live in Weeks</h2>
          <p>
            Our proven delivery framework ensures every AI orchestration project is deployed with precision, speed,
            and measurable business impact — not months of consulting engagements.
          </p>
        </div>
        <ol className="ao-delivery__timeline">
          {DELIVERY_PHASES.map((phase, i) => (
            <li key={phase.title} className={`ao-delivery__item ${i % 2 === 1 ? "is-reversed" : ""} ao-reveal`}>
              <div className="ao-delivery__marker">
                <span>{i + 1}</span>
              </div>
              <div className="ao-delivery__card">
                <span className="ao-delivery__weeks">{phase.weeks}</span>
                <h3>{phase.title}</h3>
                <p>{phase.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

// ============================================================
// WHY MIRKETA — comparison table
// ============================================================

function ComparisonCell({ text }) {
  let variant = "neutral";
  if (text.startsWith("✓")) variant = "good";
  else if (text.startsWith("✗")) variant = "bad";
  else if (text.startsWith("~")) variant = "neutral";
  const label = text.replace(/^[✓✗~]\s*/, "");
  const symbol = text.startsWith("✓") ? "✓" : text.startsWith("✗") ? "✕" : "~";

  return (
    <span className={`ao-cell ao-cell--${variant}`}>
      <span className="ao-cell__symbol" aria-hidden="true">{symbol}</span>
      {label}
    </span>
  );
}

function ComparisonSection() {
  return (
    <section className="section ao-comparison" aria-labelledby="ao-comparison-heading">
      <div className="container">
        <div className="section-heading ao-reveal">
          <p className="ao-eyebrow">Why Mirketa</p>
          <h2 id="ao-comparison-heading">Mirketa vs. Building In-House vs. Generic Platforms</h2>
          <p>Not all AI orchestration approaches are equal. Here is how our approach compares to the alternatives most enterprises consider.</p>
        </div>
        <div className="ao-comparison__table-wrap ao-reveal">
          <table className="ao-comparison__table">
            <thead>
              <tr>
                <th scope="col">Capability</th>
                <th scope="col">Mirketa Orchestration</th>
                <th scope="col">Build In-House</th>
                <th scope="col">Generic AI Platform</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON_ROWS.map((row) => (
                <tr key={row[0]}>
                  <th scope="row">{row[0]}</th>
                  <td><ComparisonCell text={row[1]} /></td>
                  <td><ComparisonCell text={row[2]} /></td>
                  <td><ComparisonCell text={row[3]} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// CLIENT OUTCOMES — testimonials
// ============================================================

function TestimonialsSection() {
  return (
    <section className="section ao-testimonials" aria-labelledby="ao-testimonials-heading">
      <div className="container">
        <div className="section-heading ao-reveal">
          <p className="ao-eyebrow">Client Outcomes</p>
          <h2 id="ao-testimonials-heading">What Our Clients Say About AI Orchestration</h2>
        </div>
        <div className="ao-testimonials__grid ao-reveal-stagger">
          {TESTIMONIALS.map((t) => (
            <blockquote className="ao-testimonial-card" key={t.headline}>
              <img src={Images.iconQuote} alt="" className="ao-testimonial-card__quote-icon" aria-hidden="true" />
              <h3>{t.headline}</h3>
              <p className="ao-testimonial-card__subheading">{t.subheading}</p>
              <p className="ao-testimonial-card__quote">"{t.quote}"</p>
              <footer>{t.attribution}</footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// FAQ — two-column independently-expandable grid
// ============================================================

function FaqCard({ item, index }) {
  const [open, setOpen] = useState(false);
  const panelId = `ao-faq-panel-${index}`;

  return (
    <div className={`ao-faq-card ${open ? "is-open" : ""}`}>
      <button
        type="button"
        className="ao-faq-card__question"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
      >
        <span>{item.q}</span>
        <span className="ao-faq-card__toggle" aria-hidden="true">{open ? "−" : "+"}</span>
      </button>
      <div id={panelId} className="ao-faq-card__answer" role="region" hidden={!open}>
        <p>{item.a}</p>
      </div>
    </div>
  );
}

function FaqSection() {
  return (
    <section className="section ao-faq" aria-labelledby="ao-faq-heading">
      <div className="container">
        <div className="section-heading ao-reveal">
          <p className="ao-eyebrow">FAQ</p>
          <h2 id="ao-faq-heading">You Have Questions. We Have Answers.</h2>
          <p>The most common questions we hear from enterprise leaders before starting their AI orchestration journey.</p>
        </div>
        <div className="ao-faq__grid ao-reveal-stagger">
          {FAQS.map((item, i) => (
            <FaqCard key={item.q} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// FEATURED INSIGHTS
// ============================================================

function InsightsSection() {
  return (
    <section className="section ao-insights" aria-labelledby="ao-insights-heading">
      <div className="container">
        <div className="section-heading ao-reveal">
          <p className="ao-eyebrow">Featured Insights</p>
          <h2 id="ao-insights-heading">AI Orchestration Intelligence</h2>
          <p>Practical guides, technical deep-dives, and strategic frameworks from Mirketa's AI architecture team.</p>
        </div>
        <div className="ao-insights__grid ao-reveal-stagger">
          {INSIGHTS.map((res) => (
            <article className="ao-insight-card" key={res.title}>
              <span className="ao-insight-card__tag">{res.tag}</span>
              <h3>{res.title}</h3>
              <p>{res.description}</p>
              <span className="ao-insight-card__link">
                Read insight <span aria-hidden="true">→</span>
              </span>
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
    <section className="ao-final-cta ao-reveal" aria-labelledby="ao-final-cta-heading">
      <div className="container ao-final-cta__inner">
        <p className="ao-eyebrow">{FINAL_CTA.title}</p>
        <h2 id="ao-final-cta-heading">{FINAL_CTA.subtitle}</h2>
        <p>{FINAL_CTA.description}</p>
        <div className="ao-final-cta__ctas">
          <a href={FINAL_CTA.primaryCta.href} className="btn btn-primary ao-btn" onClick={ripple}>
            {FINAL_CTA.primaryCta.label}
          </a>
          <a href={FINAL_CTA.secondaryCta.href} className="btn btn-secondary ao-btn">
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
