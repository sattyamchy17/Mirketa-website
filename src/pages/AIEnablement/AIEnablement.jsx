import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Images } from "../../assets/images/index.js";
import Seo from "../../components/Seo/Seo.jsx";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb.jsx";
import ConsultationSection from "../../components/ConsultationSection/ConsultationSection.jsx";
import "./AIEnablement.css";

const BREADCRUMB_ITEMS = [{ label: "Home", href: "/" }, { label: "AI Enablement" }];

gsap.registerPlugin(ScrollTrigger);

// ============================================================
// DATA — sourced from mirketa.us/ai-enablement/, preserving the
// original headings, statistics, and messaging intent. The
// source page's live counters were captured mid-animation at
// "0" for the four hero stats; the real values are recovered
// from the matching figures quoted later in the same page
// (the Service 01 / Service 02 stat call-outs).
// ============================================================

const HERO = {
  eyebrow: "AI Enablement",
  heading: "AI Enablement",
  tagline: "From Static Systems to Self-Governing Architectures",
  description:
    "Mirketa's AI Enablement practice moves enterprises beyond passive AI assistants into the era of autonomous agentic workflows — orchestrating your data, systems, and AI models into a unified intelligence layer.",
  badges: ["LangGraph · CrewAI · AutoGen", "Salesforce Agentforce Certified", "MCP Protocol Specialists", "HIPAA & SOC2 Compliant Delivery"],
  primaryCta: { label: "Request a Technical Briefing", href: "#contact" },
  secondaryCta: { label: "Explore AI Orchestration", href: "#services" },
};

const HERO_STATS = [
  { value: 40, decimals: 0, suffix: "%", label: "Faster Time-to-Value" },
  { value: 100, decimals: 0, suffix: "+", label: "Integrations Supported" },
  { value: 8, decimals: 0, suffix: " wks", label: "First Agent Live" },
  { value: 100, decimals: 0, suffix: "%", label: "Client IP Ownership" },
];

const QUICK_SHIFTS = [
  { from: "Siloed AI tools", to: "Unified intelligence layer" },
  { from: "Manual integrations", to: "MCP protocol connectivity" },
  { from: "Sequential automation", to: "Parallel multi-agent execution" },
  { from: "Rigid workflows", to: "Adaptive agentic reasoning" },
  { from: "Vendor lock-in", to: "Model-agnostic architecture" },
  { from: "Black-box AI", to: "Full audit trails & governance" },
];

const SHIFT = {
  eyebrow: "The Shift",
  heading: "From Middleware to Intelligence",
  paragraphs: [
    "For decades, enterprise technology has been defined by rigid integration — connecting System A to System B via fragile, custom-coded bridges. The competitive advantage has shifted from simply connecting data to enabling it to reason and act.",
    "Mirketa helps you transition from passive AI assistants to autonomous Agentic Workflows. By architecting a secure, governed communication layer between your data and the world's most advanced AI models, we enable your systems to reason, plan, and execute complex business processes across your entire technology estate.",
    "Our AI Enablement framework moves your organization past the limitations of simple automation into the era of Agentic Ecosystems — where AI agents work as virtual teammates, not just tools.",
  ],
  comparison: [
    { traditional: "Point-to-point integrations that break when systems change", mirketa: "MCP protocol — universal plug-and-play connectivity" },
    { traditional: "One AI model, one task, no context sharing", mirketa: "Multi-agent orchestration — specialized agents working in parallel" },
    { traditional: "Automation that fails when edge cases arise", mirketa: "Iterative reasoning — agents adapt their path as new data emerges" },
    { traditional: "Vendor lock-in to a single AI platform", mirketa: "Model-agnostic architecture — swap LLMs without rewriting logic" },
    { traditional: "No audit trail, no governance, no compliance", mirketa: "Full observability — every agent decision logged and auditable" },
  ],
};

const PILLARS = [
  {
    icon: Images.serviceAgenticOrchestration,
    title: "Agentic Orchestration",
    description: "Deploy specialized AI agents that act as virtual teammates — decomposing goals, reasoning iteratively, and coordinating at scale to automate complex business processes end-to-end.",
    capabilities: [
      "Goal decomposition into actionable sub-tasks",
      "Chain-of-thought reasoning with adaptive path adjustment",
      "Parallel agent execution for complex workflows",
      "Human-in-the-loop approval gates for high-stakes actions",
    ],
    size: "tall",
  },
  {
    icon: Images.iconPillarConnectivity,
    title: "Unified Connectivity via MCP",
    description: "Eliminate the integration trap. The Model Context Protocol (MCP) provides a universal plug-and-play architecture — turning your databases, Salesforce, and legacy ERPs into AI-accessible resources without custom connectors.",
    capabilities: [
      "Protocol-based connectivity across your entire tech estate",
      "Zero-trust, per-session data access governance",
      "Swap LLM providers without rewriting integration code",
      "Read-only resources and executable tools with strict controls",
    ],
  },
  {
    icon: Images.serviceAgentDevelopment,
    title: "Custom AI Agent Development",
    description: "Build purpose-built AI agents tailored to your specific workflows — from Salesforce Agentforce implementations to custom LangGraph and CrewAI agents that integrate with your existing systems.",
    capabilities: [
      "Custom agents for any enterprise workflow or use case",
      "Salesforce Agentforce and Einstein AI development",
      "LangGraph, CrewAI, AutoGen, and OpenAI Assistants",
      "100% client-owned IP — no vendor lock-in",
    ],
  },
  {
    icon: Images.iconDimensionGovernance,
    title: "Trust Calibration & Governance",
    description: "Autonomous doesn't mean uncontrolled. Our frameworks embed rigorous safety gates, audit trails, and compliance controls ensuring your AI agents operate within defined boundaries at all times.",
    capabilities: [
      "Approval gates for high-consequence financial or data actions",
      "Ambiguity escalation — agents ask humans when uncertain",
      "Complete audit trails for regulatory compliance",
      "HIPAA, SOC2, GDPR-aligned governance frameworks",
    ],
    size: "wide",
  },
];

const SERVICES = [
  {
    number: "01",
    title: "Agentic Orchestration & Legacy Integration",
    tagline: "Connect everything. Orchestrate intelligently. Scale without replacing your existing infrastructure.",
    description:
      "Most enterprises have valuable data locked in legacy systems, SaaS platforms, and fragmented databases. Our AI Orchestration service breaks down these silos using the Model Context Protocol (MCP) and multi-agent frameworks — enabling your AI to see, reason across, and act on your entire data estate.",
    capabilities: [
      "MCP integration layer connecting legacy ERPs, CRMs, and databases",
      "Multi-agent orchestration patterns: Orchestrator-Subagent, Fan-out, DAG",
      "Production-scale deployment with monitoring, observability, and SLAs",
      "Zero infrastructure replacement — works with your existing systems",
      "Trust layer with human approval gates and full audit trails",
    ],
    stats: [
      { value: "40%", label: "Faster Deployment" },
      { value: "100+", label: "System Integrations" },
    ],
    cta: { label: "Explore AI Orchestration", href: "/agentic-orchestration" },
  },
  {
    number: "02",
    title: "Custom AI Agent Development",
    tagline: "Purpose-built agents that understand your business context.",
    description:
      "Generic AI tools can't handle the nuance of your enterprise workflows. Our Agent Development service builds custom AI agents — from Salesforce Agentforce implementations to LangGraph-powered multi-agent systems — that understand your business context and integrate with your existing technology stack.",
    capabilities: [
      "Custom AI agents for any enterprise workflow or business process",
      "Salesforce Agentforce and Einstein AI development and deployment",
      "Multi-agent systems using LangGraph, CrewAI, AutoGen, and OpenAI",
      "8–12 week delivery from requirements to production deployment",
      "100% client-owned IP — model-agnostic, no vendor lock-in",
    ],
    stats: [
      { value: "8 wks", label: "First Agent Live" },
      { value: "60%+", label: "Efficiency Gain" },
    ],
    cta: { label: "Explore Agent Development", href: "/agent-development" },
  },
];

const PATH_PHASES = [
  { phase: "01", title: "Assessment", duration: "Weeks 1–3", description: "Evaluate your data readiness, system landscape, and identify the highest-ROI use cases for agentic automation.", width: 20 },
  { phase: "02", title: "Architecture", duration: "Weeks 3–6", description: "Implement the MCP server layer to securely expose your legacy and cloud data to AI models without custom connectors.", width: 25 },
  { phase: "03", title: "Orchestration", duration: "Weeks 6–14", description: "Build the multi-agent workflows and custom AI agents that automate your end-to-end business processes.", width: 35 },
  { phase: "04", title: "Optimization", duration: "Ongoing", description: "Continuously calibrate agent autonomy, expand use cases, and improve performance based on real-world outcomes.", width: 20 },
];

const MCP_LAYERS = [
  { label: "AI Models", items: ["GPT-4o", "Claude 3.5", "Gemini 2.0", "Llama 3"] },
  { label: "MCP Protocol Layer (Universal)", items: ["MCP Client", "MCP Server", "Resources", "Tools"], highlight: true },
  { label: "Enterprise Systems", items: ["Salesforce", "ServiceNow", "Oracle ERP", "SQL DBs", "Legacy APIs"] },
];

const MCP_CONCEPTS = [
  { title: "Protocol-Based Connectivity", description: "Turn your SQL databases, Salesforce instances, and legacy ERPs into MCP Servers that any AI model can access through a shared, secure protocol." },
  { title: "Zero-Trust Data Access", description: "Expose sensitive data as read-only Resources or executable Tools with strict, per-session governance — no broad data exposure." },
  { title: "Architectural Agility", description: "Switch LLM providers or add new data sources without rewriting a single line of integration code. Future-proof by design." },
];

const MCP_KEY_BENEFIT = "One protocol connects all systems to all AI models — no custom connectors, no fragile point-to-point integrations, no vendor lock-in.";

const INDUSTRIES = [
  { name: "Healthcare & Life Sciences", image: Images.industryHealthcare, description: "HIPAA-compliant agents for clinical documentation, prior authorization, patient scheduling, and EHR data orchestration.", tags: ["HIPAA Compliant", "EHR Integration", "Clinical AI"] },
  { name: "Financial Services", image: Images.industryFinancialServices, description: "Agents for KYC/AML processing, fraud detection, financial reporting, and regulatory compliance workflows.", tags: ["SOC2 Compliant", "AML/KYC Agents", "Audit Trails"] },
  { name: "Nonprofit", image: Images.industryNonprofits, description: "Donor intelligence agents, grant writing assistance, volunteer coordination, and impact reporting automation.", tags: ["Donor Analytics", "Grant AI", "Volunteer Ops"] },
  { name: "Technology & SaaS", image: Images.industryTechnologySaas, description: "Developer copilots, support automation agents, product analytics, and customer success workflow orchestration.", tags: ["DevOps AI", "Support Agents", "CS Automation"] },
  { name: "Manufacturing", image: Images.industryManufacturing, description: "Quality control agents, predictive maintenance orchestration, supplier contract intelligence, and CAPA automation.", tags: ["Quality AI", "Predictive Maint.", "Supply Chain"] },
  { name: "Retail & eCommerce", image: Images.industryRetailEcommerce, description: "Merchandising agents, demand forecasting orchestration, order management automation, and personalization at scale.", tags: ["Demand Forecast", "Order Agents", "Personalization"] },
];

const MID_CTA = {
  heading: "Ready to Orchestrate the Future of Work?",
  paragraph: "Schedule a technical architecture briefing with our AI Enablement team and discover how agentic AI can transform your enterprise operations.",
  primaryCta: { label: "Request a Technical Briefing", href: "#contact" },
  secondaryCtas: [
    { label: "Explore AI Orchestration", href: "/agentic-orchestration" },
    { label: "Explore Agent Development", href: "/agent-development" },
  ],
};

const WHY_MIRKETA = [
  { icon: Images.iconOptimize, title: "Model-Agnostic Architecture", description: "We build orchestration logic that is independent of any single AI model — ensuring you can swap LLM providers as the market evolves without losing your core investment." },
  { icon: Images.iconCheckCircle, title: "100% Client-Owned IP", description: "Every agent, workflow, and integration we build belongs entirely to you. We use our accelerators to reduce your time-to-market, but you retain full ownership of the resulting IP." },
  { icon: Images.iconDeliverableScore, title: "Production-Proven Frameworks", description: "We don't experiment with your production systems. Our agentic frameworks are battle-tested across healthcare, financial services, and technology enterprises at scale." },
  { icon: Images.iconDimensionGovernance, title: "Governance-First Design", description: "Every agent we build includes approval gates, audit trails, and compliance controls from day one — not as afterthoughts bolted on at the end of the project." },
  { icon: Images.iconPlatformIntegration, title: "Deep Enterprise Integration", description: "We've integrated with Salesforce, ServiceNow, Oracle, Workday, Epic, and hundreds of other enterprise systems — bringing proven patterns to every new engagement." },
  { icon: Images.iconTierQuickwins, title: "Accelerators That Reduce Risk", description: "Pre-built AI accelerators for common enterprise use cases cut your time-to-production by 40–60%, reducing both cost and delivery risk without sacrificing customization." },
];

// FAQ content synthesized from facts stated elsewhere on the source page
// (service descriptions, stat call-outs, and the Why Mirketa section) —
// the source page itself has no dedicated FAQ block for AI Enablement.
const FAQS = [
  {
    question: "What's the difference between AI Orchestration and Agent Development?",
    answer:
      "Agentic Orchestration & Legacy Integration connects your existing systems — ERPs, CRMs, databases — through the Model Context Protocol so AI can see and act across your entire data estate. Custom AI Agent Development builds the purpose-built agents themselves, from Salesforce Agentforce implementations to custom LangGraph and CrewAI systems. Most engagements use both: orchestration lays the connectivity foundation, then custom agents run on top of it.",
  },
  {
    question: "Do we need to replace our existing systems to adopt MCP?",
    answer:
      "No. MCP integration is designed for zero infrastructure replacement — it works with your existing Salesforce, ServiceNow, Oracle ERP, SQL databases, and legacy APIs by exposing them as MCP Servers, not by replacing them.",
  },
  {
    question: "Who owns the AI agents and workflows Mirketa builds?",
    answer:
      "100% of the IP. Every agent, workflow, and integration we build belongs entirely to you. Mirketa uses proprietary accelerators to reduce time-to-market, but you retain full ownership with no ongoing licensing fees or vendor lock-in.",
  },
  {
    question: "How long does it take to get our first AI agent live?",
    answer:
      "Custom Agent Development typically runs 8–12 weeks from requirements to production. The broader Mirketa Path — assessment through orchestration — spans roughly 6 to 14 weeks depending on scope, with optimization continuing afterward.",
  },
  {
    question: "Can we switch AI model providers later?",
    answer:
      "Yes. Mirketa's orchestration logic is model-agnostic by design — you can swap LLM providers (OpenAI, Azure, Vertex AI, Bedrock) as the market evolves without rewriting your integration code or losing your core investment.",
  },
];

const SEO = {
  title: "AI Enablement Services | Mirketa",
  description:
    "Move beyond passive AI assistants into autonomous agentic workflows. Mirketa's AI Enablement practice unifies your data, systems, and AI models.",
  canonical: "https://www.mirketa.com/ai-enablement/",
  keywords: [
    "AI Enablement",
    "AI Enablement Services",
    "Agentic Workflows",
    "AI Orchestration",
    "Enterprise AI Integration",
    "MCP Protocol",
    "Multi-Agent Systems",
    "AI Governance",
    "AI enablement services for enterprises",
    "agentic AI workflow implementation",
    "enterprise AI orchestration and integration",
    "self-governing AI architecture",
  ],
  schema: [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "AI Enablement",
      provider: { "@type": "Organization", name: "Mirketa Inc.", url: "https://www.mirketa.com" },
      name: "AI Enablement",
      description:
        "Moves enterprises beyond passive AI assistants into autonomous agentic workflows, orchestrating data, systems, and AI models into a unified intelligence layer.",
      areaServed: "Global",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.mirketa.com/" },
        { "@type": "ListItem", position: 2, name: "AI Enablement", item: "https://www.mirketa.com/ai-enablement/" },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    },
  ],
};

const CONTACT = {
  heading: "Let's Start Your AI Transformation",
  paragraph: "Tell us about your organization and AI goals. Our AI consulting architects will reach out within one business day to schedule a technical briefing.",
  benefits: [
    "Free 30-minute AI strategy consultation",
    "Senior AI architect on every initial call",
    "No commitment required — just a conversation",
    "Typical response within 4 business hours",
  ],
  disclaimer: "By submitting, you agree to Mirketa's Privacy Policy. We will never share your information with third parties.",
};

const CONSULTATION = {
  eyebrow: "Get Started",
  heading: "Schedule an AI Enablement Consultation",
  description: CONTACT.paragraph,
  benefits: CONTACT.benefits,
  formTitle: "Request My Technical Briefing",
};


// ============================================================
// SHARED HOOKS — scoped to this page.
// ============================================================
function useInView(options = { threshold: 0.3 }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.disconnect();
      }
    }, options);
    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return [ref, inView];
}

function useCountUp(end, start, duration = 1600, decimals = 0) {
  const [value, setValue] = useState((0).toFixed(decimals));
  const rafRef = useRef(null);
  const hasRun = useRef(false);
  useEffect(() => {
    if (!start || hasRun.current) return;
    hasRun.current = true;
    const startTime = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue((eased * end).toFixed(decimals));
      if (progress < 1) rafRef.current = requestAnimationFrame(tick);
      else setValue(end.toFixed(decimals));
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => rafRef.current && cancelAnimationFrame(rafRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start]);
  return value;
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
    ripple.addEventListener("animationend", () => ripple.remove());
  };
}

function cssUrl(src) {
  return `url("${src}")`;
}

// ============================================================
// PAGE
// ============================================================
export default function AIEnablement() {
  const heroTextRef = useRef(null);
  const ripple = useRipple();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(heroTextRef.current.children, {
        y: 28,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      });

      gsap.utils.toArray(".ae-reveal").forEach((el) => {
        gsap.from(el, {
          y: 30,
          opacity: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      gsap.utils.toArray(".ae-reveal-stagger").forEach((group) => {
        gsap.from(group.children, {
          y: 24,
          opacity: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: { trigger: group, start: "top 85%" },
        });
      });

      gsap.utils.toArray(".ae-zoom-in").forEach((el) => {
        gsap.from(el, {
          scale: 0.92,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="ai-enablement">
      <Seo {...SEO} />
      <HeroSection ripple={ripple} textRef={heroTextRef} />
      <StatsSection />
      <QuickShiftsSection />
      <ShiftSection />
      <PillarsSection />
      <ServicesSection />
      <PathSection />
      <McpSection />
      <IndustriesSection />
      <MidCtaSection ripple={ripple} />
      <WhyMirketaSection />
      <FaqSection />
      <ContactSection />
    </div>
  );
}

// ================= HERO =================
function HeroSection({ ripple, textRef }) {
  return (
    <section className="ae-hero" aria-label="AI Enablement introduction" style={{ backgroundImage: cssUrl(Images.heroAiEnablement) }}>
      <div className="ae-hero__scrim" />
      <div className="container">
        <Breadcrumb items={BREADCRUMB_ITEMS} className="ae-breadcrumb" />
      </div>
      <div className="container ae-hero__inner">
        <div className="ae-hero__glass" ref={textRef}>
          <span className="ae-eyebrow">{HERO.eyebrow}</span>
          <h1>{HERO.heading}</h1>
          <p className="ae-hero__tagline">{HERO.tagline}</p>
          <p className="ae-hero__description">{HERO.description}</p>
          <div className="ae-hero__ctas">
            <a href={HERO.primaryCta.href} className="btn btn-primary ae-btn" onClick={ripple}>
              {HERO.primaryCta.label}
              <span className="btn-arrow">&rarr;</span>
            </a>
            <a href={HERO.secondaryCta.href} className="btn btn-secondary ae-btn">
              {HERO.secondaryCta.label}
            </a>
          </div>
          <div className="ae-hero__badges">
            {HERO.badges.map((b) => (
              <span className="ae-hero__badge" key={b}>
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>
      <button className="ae-scroll-indicator" aria-label="Scroll to next section" onClick={() => document.getElementById("ae-stats")?.scrollIntoView({ behavior: "smooth" })}>
        <span />
      </button>
    </section>
  );
}

// ================= STATS — floating glass tiles =================
function StatTile({ stat, offset }) {
  const [ref, inView] = useInView({ threshold: 0.4 });
  const display = useCountUp(stat.value, inView, 1500, stat.decimals);
  return (
    <div className="ae-stat-tile" ref={ref} style={{ "--offset": `${offset}px` }}>
      <p className="ae-stat-tile__value">
        {display}
        {stat.suffix}
      </p>
      <p className="ae-stat-tile__label">{stat.label}</p>
    </div>
  );
}

function StatsSection() {
  return (
    <section className="ae-stats" id="ae-stats" aria-label="Key statistics">
      <div className="ae-stats__mesh" />
      <div className="content-wrap ae-stats__grid">
        {HERO_STATS.map((stat, i) => (
          <StatTile stat={stat} key={stat.label} offset={i % 2 === 0 ? 0 : 22} />
        ))}
      </div>
    </section>
  );
}

// ================= QUICK SHIFTS =================
function QuickShiftsSection() {
  return (
    <section className="section ae-quick-shifts" aria-label="At a glance transformation">
      <div className="content-wrap">
        <div className="ae-quick-shifts__grid ae-reveal-stagger">
          {QUICK_SHIFTS.map((s) => (
            <div className="ae-shift-chip" key={s.from}>
              <span className="ae-shift-chip__from">{s.from}</span>
              <span className="ae-shift-chip__arrow">&rarr;</span>
              <span className="ae-shift-chip__to">{s.to}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ================= THE SHIFT =================
function ShiftSection() {
  return (
    <section className="section ae-shift" aria-labelledby="ae-shift-heading">
      <div className="content-wrap ae-shift__grid">
        <div className="ae-shift__intro ae-reveal">
          <span className="ae-eyebrow">{SHIFT.eyebrow}</span>
          <h2 id="ae-shift-heading">{SHIFT.heading}</h2>
          {SHIFT.paragraphs.map((p) => (
            <p key={p.slice(0, 20)}>{p}</p>
          ))}
        </div>

        <div className="ae-shift__table ae-reveal">
          <div className="ae-shift__table-head">
            <span>Traditional Approach</span>
            <span>Mirketa AI Enablement</span>
          </div>
          {SHIFT.comparison.map((row) => (
            <div className="ae-shift__table-row" key={row.traditional}>
              <div className="ae-shift__cell ae-shift__cell--old">
                <span className="ae-shift__mark ae-shift__mark--x">&times;</span>
                {row.traditional}
              </div>
              <div className="ae-shift__cell ae-shift__cell--new">
                <span className="ae-shift__mark ae-shift__mark--check">&#10003;</span>
                {row.mirketa}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ================= FOUR PILLARS — bento grid =================
function PillarsSection() {
  return (
    <section className="section ae-pillars" aria-labelledby="ae-pillars-heading">
      <div className="content-wrap">
        <div className="section-heading ae-reveal">
          <span className="ae-eyebrow">Core Pillars</span>
          <h2 id="ae-pillars-heading">The Four Pillars of AI Enablement</h2>
        </div>

        <div className="ae-pillars__bento ae-reveal-stagger">
          {PILLARS.map((pillar) => (
            <div className={`ae-pillar-card ${pillar.size ? `ae-pillar-card--${pillar.size}` : ""}`} key={pillar.title}>
              <span className="ae-pillar-card__icon">
                <img src={pillar.icon} alt="" width="36" height="36" loading="lazy" />
              </span>
              <h3>{pillar.title}</h3>
              <p>{pillar.description}</p>
              <ul>
                {pillar.capabilities.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ================= TWO SPECIALIZED SERVICES =================
function ServicesSection() {
  return (
    <section className="section ae-services" id="services" aria-labelledby="ae-services-heading">
      <div className="content-wrap">
        <div className="section-heading ae-reveal">
          <span className="ae-eyebrow">Our Services</span>
          <h2 id="ae-services-heading">Two Specialized Services. One Unified Goal.</h2>
          <p>Mirketa's AI Enablement practice is organized around two deep specializations — each addressing a distinct but complementary dimension of enterprise AI at scale.</p>
        </div>

        <div className="ae-services__list">
          {SERVICES.map((svc, i) => (
            <div className={`ae-service-card ${i % 2 === 1 ? "is-reversed" : ""} ae-reveal`} key={svc.number}>
              <div className="ae-service-card__stats">
                <span className="ae-service-card__number">{svc.number}</span>
                {svc.stats.map((s) => (
                  <div className="ae-service-card__stat" key={s.label}>
                    <strong>{s.value}</strong>
                    <span>{s.label}</span>
                  </div>
                ))}
              </div>
              <div className="ae-service-card__body">
                <h3>{svc.title}</h3>
                <p className="ae-service-card__tagline">{svc.tagline}</p>
                <p>{svc.description}</p>
                <ul>
                  {svc.capabilities.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
                <Link to={svc.cta.href} className="btn btn-outline-dark ae-btn">
                  {svc.cta.label}
                  <span className="btn-arrow">&rarr;</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ================= THE MIRKETA PATH — horizontal stepper =================
function PathSection() {
  return (
    <section className="section ae-path" aria-labelledby="ae-path-heading">
      <div className="content-wrap">
        <div className="section-heading ae-reveal">
          <span className="ae-eyebrow">The Mirketa Path</span>
          <h2 id="ae-path-heading">Your Journey to Production-Scale AI</h2>
          <p>A structured, 4-phase transformation path from evaluating your current state to running autonomous AI agents in production.</p>
        </div>

        <div className="ae-path__track ae-reveal">
          {PATH_PHASES.map((phase) => (
            <div className="ae-path__segment" key={phase.phase} style={{ "--w": `${phase.width}%` }}>
              <span className="ae-path__marker">{phase.phase}</span>
            </div>
          ))}
        </div>

        <div className="ae-path__cards ae-reveal-stagger">
          {PATH_PHASES.map((phase) => (
            <div className="ae-path-card" key={phase.phase} style={{ "--w": `${phase.width}%` }}>
              <span className="ae-path-card__duration">{phase.duration}</span>
              <h3>{phase.title}</h3>
              <p>{phase.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ================= MCP ARCHITECTURE =================
function McpSection() {
  return (
    <section className="section ae-mcp" aria-labelledby="ae-mcp-heading">
      <div className="content-wrap">
        <div className="section-heading ae-reveal">
          <span className="ae-eyebrow">MCP Architecture</span>
          <h2 id="ae-mcp-heading">The Universal AI Connectivity Layer</h2>
          <p>The biggest barrier to enterprise AI adoption is the Integration Trap — building custom connectors for every system. Mirketa uses the Model Context Protocol (MCP) to eliminate this problem permanently.</p>
        </div>

        <div className="ae-mcp__diagram ae-zoom-in">
          {MCP_LAYERS.map((layer, i) => (
            <div key={layer.label}>
              <div className={`ae-mcp__layer ${layer.highlight ? "ae-mcp__layer--highlight" : ""}`}>
                <p className="ae-mcp__layer-label">{layer.label}</p>
                <div className="ae-mcp__layer-chips">
                  {layer.items.map((item) => (
                    <span className="ae-mcp__chip" key={item}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              {i < MCP_LAYERS.length - 1 && (
                <div className="ae-mcp__connector" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </div>
              )}
            </div>
          ))}
        </div>

        <p className="ae-mcp__benefit ae-reveal">{MCP_KEY_BENEFIT}</p>

        <div className="ae-mcp__concepts ae-reveal-stagger">
          {MCP_CONCEPTS.map((c) => (
            <div className="ae-mcp-concept" key={c.title}>
              <h3>{c.title}</h3>
              <p>{c.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ================= INDUSTRIES — static grid =================
function IndustriesSection() {
  return (
    <section className="section ae-industries" aria-labelledby="ae-industries-heading">
      <div className="content-wrap">
        <div className="section-heading ae-reveal">
          <span className="ae-eyebrow">Industries</span>
          <h2 id="ae-industries-heading">Agentic AI Built for Your Industry</h2>
          <p>Mirketa's AI Enablement practice brings deep industry context to every engagement — understanding the specific workflows, compliance requirements, and data realities of your sector.</p>
        </div>

        <div className="ae-industries__grid ae-reveal-stagger">
          {INDUSTRIES.map((ind) => (
            <div className="ae-industry-card" key={ind.name}>
              <div className="ae-industry-card__media" style={{ backgroundImage: cssUrl(ind.image) }} />
              <div className="ae-industry-card__body">
                <h3>{ind.name}</h3>
                <p>{ind.description}</p>
                <div className="ae-industry-card__tags">
                  {ind.tags.map((tag) => (
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

// ================= MID-PAGE CTA BANNER =================
function MidCtaSection({ ripple }) {
  return (
    <section className="ae-mid-cta" aria-labelledby="ae-mid-cta-heading">
      <div className="content-wrap ae-mid-cta__inner ae-reveal">
        <h2 id="ae-mid-cta-heading">{MID_CTA.heading}</h2>
        <p>{MID_CTA.paragraph}</p>
        <div className="ae-mid-cta__ctas">
          <a href={MID_CTA.primaryCta.href} className="btn btn-primary ae-btn" onClick={ripple}>
            {MID_CTA.primaryCta.label}
            <span className="btn-arrow">&rarr;</span>
          </a>
          {MID_CTA.secondaryCtas.map((c) => (
            <Link to={c.href} className="btn btn-secondary ae-btn" key={c.label}>
              {c.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// ================= WHY MIRKETA =================
function WhyMirketaSection() {
  return (
    <section className="section ae-why" aria-labelledby="ae-why-heading">
      <div className="content-wrap">
        <div className="section-heading ae-reveal">
          <span className="ae-eyebrow">Why Mirketa</span>
          <h2 id="ae-why-heading">Architectural Sovereignty. Client-Owned Intelligence.</h2>
          <p>We believe your intelligence layer is your most valuable asset. Here's what makes Mirketa the right partner for AI Enablement.</p>
        </div>

        <div className="ae-why__grid ae-reveal-stagger">
          {WHY_MIRKETA.map((w) => (
            <div className="ae-why-card" key={w.title}>
              <span className="ae-why-card__icon">
                <img src={w.icon} alt="" width="28" height="28" loading="lazy" />
              </span>
              <h3>{w.title}</h3>
              <p>{w.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ================= FAQ — question list + answer panel =================
function FaqSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = FAQS[activeIndex];

  return (
    <section className="section ae-faq" aria-labelledby="ae-faq-heading">
      <div className="content-wrap">
        <div className="section-heading ae-reveal">
          <span className="ae-eyebrow">FAQ</span>
          <h2 id="ae-faq-heading">Frequently Asked Questions</h2>
        </div>

        <div className="ae-faq__layout ae-reveal">
          <div className="ae-faq__questions" role="tablist" aria-orientation="vertical">
            {FAQS.map((faq, i) => (
              <button
                key={faq.question}
                role="tab"
                aria-selected={activeIndex === i}
                aria-controls={`ae-faq-panel-${i}`}
                id={`ae-faq-tab-${i}`}
                className={`ae-faq__question ${activeIndex === i ? "is-active" : ""}`}
                onClick={() => setActiveIndex(i)}
              >
                {faq.question}
                <svg width="10" height="16" viewBox="0 0 10 16" fill="none" aria-hidden="true">
                  <path d="M1 1l7 7-7 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            ))}
          </div>
          <div className="ae-faq__panel" role="tabpanel" id={`ae-faq-panel-${activeIndex}`} aria-labelledby={`ae-faq-tab-${activeIndex}`} key={activeIndex}>
            <h3>{active.question}</h3>
            <p>{active.answer}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ================= CONTACT =================
function ContactSection() {
  return <ConsultationSection {...CONSULTATION} />;
}
