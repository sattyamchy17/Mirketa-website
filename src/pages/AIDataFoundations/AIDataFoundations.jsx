import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Images } from "../../assets/images/index.js";
import problemDiagramImg from "../../assets/changes/ai-data-foundations/mirketa_data_foundation_left_section.webp";
import Seo from "../../components/Seo/Seo.jsx";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb.jsx";
import ConsultationSection from "../../components/ConsultationSection/ConsultationSection.jsx";
import "./AIDataFoundations.css";

const BREADCRUMB_ITEMS = [{ label: "Home", href: "/" }, { label: "AI Data Foundations" }];

gsap.registerPlugin(ScrollTrigger);

// ============================================================
// DATA — content sourced verbatim from
// https://mirketa.com/ai-data-foundations/
// ============================================================

const HERO = {
  eyebrow: "AI Data Foundation Services",
  title: "Build the Data Layer Your AI Actually Needs",
  stat: { value: "84%", label: "of business leaders say data quality is the #1 blocker to AI success" },
  description:
    "Mirketa's services unify, govern, and prepare your enterprise data across Salesforce Data Cloud, Snowflake, and your existing systems so your AI agents, models, and analytics can finally deliver trusted, production-grade results.",
  primaryCta: { label: "Get Your AI Data Readiness Assessment", href: "#contact" },
  secondaryCta: { label: "See Our Methodology", href: "#approach" },
  badges: ["Salesforce Data Cloud Certified", "Snowflake Partner", "HIPAA & GDPR Ready"],
};

const PROBLEM = {
  eyebrow: "The Data Foundation Problem",
  heading: "Why AI Without a Data Foundation Always Fails",
  issue:
    "Enterprise data lives in silos across CRM, ERP, marketing automation, support systems, data warehouses, and spreadsheets. It's inconsistent in format, governed differently by each team, and rarely captured with the metadata AI systems need.",
  solution:
    "Mirketa designs and builds the unified data layer that turns your fragmented enterprise data into a strategic asset for AI — using proven architectures including Salesforce Data Cloud, Snowflake, Zero Copy integration, vector databases, and Retrieval-Augmented Generation (RAG).",
  silos: ["CRM", "ERP", "Marketing Automation", "Support Systems", "Data Warehouses", "Spreadsheets"],
};

const SERVICES = [
  {
    tab: "01",
    icon: Images.serviceReadinessAssessment,
    title: "AI Data Readiness Assessment",
    description:
      "A 3-week diagnostic that maps your existing data landscape, scores data quality across critical domains, identifies AI use case data dependencies, and produces a prioritized data modernization roadmap.",
  },
  {
    tab: "02",
    icon: Images.iconServiceDataCloud,
    title: "Salesforce Data Cloud Implementation",
    description:
      "End-to-end Salesforce Data Cloud consulting and implementation including data ingestion, identity resolution, calculated insights, segmentation, activation, and Agentforce data grounding. Includes Zero Copy integration with Snowflake, Databricks, BigQuery, and Redshift.",
  },
  {
    tab: "03",
    icon: Images.iconPillarConnectivity,
    title: "Enterprise Data Integration",
    description:
      "Salesforce Integration Services and enterprise iPaaS implementation using Boomi, MuleSoft, and native API frameworks connecting CRM, ERP, data warehouses, and SaaS systems into a single AI-ready data fabric.",
  },
  {
    tab: "04",
    icon: Images.iconServiceRag,
    title: "RAG Implementation Services",
    description:
      "Design and deployment of Retrieval-Augmented Generation systems that ground large language models in your enterprise data. Includes embedding strategy, vector database setup, chunking architecture, hybrid search, and evaluation frameworks.",
  },
  {
    tab: "05",
    icon: Images.iconDimensionGovernance,
    title: "Data Governance for AI",
    description:
      "Implementation of data governance frameworks tailored for AI workloads covering data lineage, access controls, PII handling, consent management, model-data versioning, and audit trails for AI decision explainability.",
  },
  {
    tab: "06",
    icon: Images.iconServiceMdm,
    title: "Master Data Management (MDM)",
    description:
      "Unified customer, product, and account master data — the foundation that makes AI personalization, agent grounding, and predictive analytics actually trustworthy at enterprise scale.",
  },
];

const ARCHITECTURE_LAYERS = [
  {
    tier: "Layer 1",
    icon: Images.iconLayerSourceSystems,
    title: "Source Systems",
    description:
      "Your existing systems of record — Salesforce CRM, NetSuite ERP, Oracle Fusion, ServiceNow, Workday, marketing automation, and data lakes — connected via Salesforce Integration Services, Boomi, MuleSoft, or native APIs.",
  },
  {
    tier: "Layer 2",
    icon: Images.iconLayerDataFabric,
    title: "Unified Data Fabric",
    description:
      "Salesforce Data Cloud as the customer data hub, integrated with Snowflake / Databricks / BigQuery as the analytical foundation. Zero Copy architecture eliminates duplicate data movement and ensures every AI workload runs on the same trusted dataset.",
  },
  {
    tier: "Layer 3",
    icon: Images.iconLayerVectorServices,
    title: "AI Data Services",
    description:
      "Vector databases (Pinecone, Weaviate, pgvector), embedding generation pipelines, RAG retrievers, semantic search indexes, and feature stores that prepare data for both generative and predictive AI consumption.",
  },
  {
    tier: "Layer 4",
    icon: Images.iconDimensionGovernance,
    title: "Governance & Observability",
    description:
      "Data lineage, quality monitoring, access controls, PII detection, consent management, and audit trails — all integrated with your AI Roadmap & Governance framework for end-to-end compliance.",
  },
  {
    tier: "Layer 5",
    icon: Images.iconAgentTypeOrchestrator,
    title: "AI Consumption Layer",
    description:
      "AI agents (Agentforce, custom LLM agents), predictive analytics, Einstein AI, dashboards, and applications — all consuming from the same governed data layer for consistent, trustworthy results.",
  },
];

const TECH_CATEGORIES = [
  {
    icon: Images.iconTechCustomerDataPlatform,
    title: "Customer Data Platform",
    description: "Our primary recommendation for customer data unification, Agentforce grounding, and CRM-integrated AI. Native integration with Salesforce CRM eliminates overhead.",
    chips: ["Salesforce Data Cloud"],
  },
  {
    icon: Images.iconTechAnalyticalFoundation,
    title: "Analytical Foundation",
    description: "For analytical data foundations and Zero Copy integration with Data Cloud. Supports both structured analytics and AI workloads from the same platform.",
    chips: ["Snowflake", "Databricks", "BigQuery", "Redshift"],
  },
  {
    icon: Images.iconLayerVectorServices,
    title: "Vector Databases",
    description: "For RAG and semantic search workloads — including Salesforce native vector storage for Agentforce-grounded AI agents.",
    chips: ["Pinecone", "Weaviate", "Qdrant", "pgvector"],
  },
  {
    icon: Images.iconPillarConnectivity,
    title: "Integration Platforms",
    description: "Enterprise iPaaS and native Salesforce Integration Services for connecting source systems into a unified AI-ready data fabric.",
    chips: ["Boomi", "MuleSoft", "Workato"],
  },
  {
    icon: Images.iconProcessReasonPlan,
    title: "AI Platforms",
    description: "We build data foundations that work with any AI platform — grounding your chosen LLM in your enterprise data for trusted, production-grade results.",
    chips: ["OpenAI", "Anthropic", "AWS Bedrock", "Azure OpenAI", "Agentforce"],
  },
  {
    icon: Images.iconDimensionGovernance,
    title: "Governance Tools",
    description: "Data governance, lineage, and audit-ready documentation built into every engagement, not bolted on as a separate phase.",
    chips: ["Collibra", "Alation", "Salesforce Privacy Center"],
  },
];

const APPROACH_PHASES = [
  {
    phase: "01",
    title: "Assess",
    description: "Map current-state data architecture, score data quality, identify AI use case data requirements, and document gaps across all critical data domains.",
    output: "AI data readiness scorecard and prioritized backlog",
  },
  {
    phase: "02",
    title: "Design",
    description: "Architect the target-state data foundation. Select platforms, define integration patterns, design data models, and plan governance controls for AI workloads.",
    output: "Reference architecture, technology selection, implementation roadmap",
  },
  {
    phase: "03",
    title: "Build",
    description: "Execute data integration, Salesforce Data Cloud implementation, vector database deployment, RAG pipeline setup, and governance configuration in production.",
    output: "Production AI data foundation",
  },
  {
    phase: "04",
    title: "Operate",
    description: "Ongoing managed services — data quality monitoring, governance reviews, schema evolution, AI model-data alignment, and performance optimization.",
    output: "Continuously improving, audit-ready AI data foundation",
  },
];

const CASE_STUDIES = [
  {
    image: Images.industryHealthcare,
    badge: "HIPAA Compliant",
    title: "Healthcare Data Foundation for AI Care Coordination",
    description:
      "HIPAA-compliant data foundation integrating EHR, Salesforce Health Cloud, claims data, and patient engagement systems supporting AI-powered care coordination, risk stratification, and patient outreach via Mirketa's Elixir platform.",
  },
  {
    image: Images.industryTechnologySaas,
    badge: "↓ 45% Resolution Time",
    title: "RAG-Powered Customer Service for SaaS",
    description:
      "RAG implementation grounding Agentforce service agents in real-time product documentation, support tickets, and knowledge base content — reducing first-contact resolution time by 45% and deflecting 60% of Tier-1 cases.",
  },
  {
    image: Images.industryManufacturing,
    badge: "Zero Copy Architecture",
    title: "CRM-ERP Data Unification for Manufacturing",
    description:
      "Salesforce Integration Services connecting Sales Cloud, Manufacturing Cloud, Oracle ERP, and Snowflake into a single data foundation that powers AI-driven sales forecasting and supply chain optimization.",
  },
  {
    image: Images.industryNonprofits,
    badge: "Donor AI Enabled",
    title: "Salesforce Data Cloud for Nonprofits",
    description:
      "Unified donor, program, and impact data foundation feeding personalized fundraising AI, donor lifetime value prediction, and impact reporting built on Salesforce Nonprofit Cloud and Data Cloud.",
  },
];

const WHY_MIRKETA = [
  { title: "Cross-platform expertise", description: "Certified specialists in Salesforce Data Cloud, Snowflake, Databricks, and vector databases — we build hybrid architectures that fit your real stack, not idealized vendor demos." },
  { title: "AI-first data architecture", description: "Every foundation we design is built for both today's analytics and tomorrow's AI agents — eliminating expensive re-architecture later." },
  { title: "Salesforce Integration Services depth", description: "15 years of Salesforce CRM consulting and Salesforce Implementation Services means we know how to integrate Data Cloud with the rest of your enterprise without breaking what already works." },
  { title: "Governance built in, not bolted on", description: "Data governance, lineage, and audit-ready documentation are part of every engagement, not a separate phase." },
  { title: "Industry data models", description: "Pre-built nonprofit, healthcare, manufacturing, and hi-tech data models cut implementation time by 30–50%." },
  { title: "Managed services continuity", description: "Mirketa stays with you after go-live with ongoing data quality, integration, and AI data lifecycle management." },
];

// NOTE: The live "Proven Results" section on the source page renders broken
// "0" placeholder values for every statistic. The real figures are stated
// elsewhere on the same page (Why Mirketa + Client Results sections) and are
// cross-referenced here: "15 years" (Salesforce Integration Services depth),
// "30-50%" (Industry data models), "45%" and "60%" (RAG case study).
const PROVEN_RESULTS = [
  { value: 15, suffix: "", label: "Years Salesforce & Data Experience" },
  { value: 50, prefix: "30–", suffix: "%", label: "Faster with Pre-built Data Models" },
  { value: 45, suffix: "%", label: "Reduction in Resolution Time (RAG)" },
  { value: 60, suffix: "%", label: "Tier-1 Case Deflection Rate" },
];

const FAQS = [
  {
    q: "Do we need Salesforce Data Cloud to have an AI data foundation?",
    a: "No. Salesforce Data Cloud is our most-recommended customer data layer for organizations already running Salesforce CRM, because it eliminates integration overhead and natively grounds Agentforce. But we build AI data foundations on Snowflake, Databricks, BigQuery, and hybrid architectures as well — the right answer depends on your existing stack, AI use cases, and governance requirements.",
  },
  {
    q: "What's the difference between a data warehouse and an AI data foundation?",
    a: "A traditional data warehouse is optimized for structured analytical queries — reports, dashboards, BI. An AI data foundation extends that to support unstructured data (documents, conversations, images), vector embeddings, real-time retrieval for RAG applications, and continuous data flows for agentic AI. It also adds AI-specific governance like model-data lineage and explainability.",
  },
  {
    q: "How long does a Salesforce Data Cloud implementation take?",
    a: "A focused Salesforce Data Cloud implementation connecting 3–5 source systems with identity resolution and basic segmentation typically takes 8–12 weeks. Enterprise Data Cloud rollouts with Agentforce grounding, advanced calculated insights, and Zero Copy integration with Snowflake run 16–24 weeks. Mirketa's pre-built accelerators reduce these timelines by 30–40%.",
  },
  {
    q: "What is RAG and do we need it?",
    a: "Retrieval-Augmented Generation (RAG) is the architecture pattern that grounds large language models in your enterprise data, eliminating hallucinations and making AI answers traceable to source documents. If you're deploying AI agents (Agentforce, custom chatbots, internal copilots) that need to answer questions using your company's specific knowledge, you need RAG — or you'll deploy an AI that confidently invents wrong answers.",
  },
  {
    q: "How does Mirketa handle data privacy and compliance for AI?",
    a: "Every AI data foundation we build includes governance controls mapped to your industry — HIPAA for healthcare, SOC 2 and GDPR for SaaS, PCI-DSS for financial services. We implement PII detection and masking, consent management, fine-grained access controls, audit logging, and AI decision explainability from day one. See our AI Roadmap & Governance services for the full governance framework.",
  },
  {
    q: "Can Mirketa migrate our existing data warehouse to an AI-ready architecture?",
    a: "Yes. Data warehouse modernization to AI-ready architectures is one of our most common engagements. We've migrated organizations from legacy warehouses (Oracle, Teradata, on-prem SQL Server) to modern AI-ready stacks built on Snowflake, Databricks, and Salesforce Data Cloud with minimal disruption to existing analytics consumers.",
  },
];

const SEO = {
  title: "AI Data Foundation Services | Mirketa",
  description:
    "Build the data layer your AI actually needs. Mirketa unifies, governs, and prepares enterprise data across Salesforce Data Cloud, Snowflake, and RAG.",
  canonical: "https://www.mirketa.com/ai-data-foundations/",
  keywords: [
    "AI Data Foundations",
    "Enterprise Data Foundation for AI",
    "Salesforce Data Cloud Consulting",
    "RAG Implementation",
    "Data Governance for AI",
    "Master Data Management",
    "Vector Database Implementation",
    "AI Data Readiness",
    "AI data foundation services for enterprises",
    "enterprise data foundation for AI consulting",
    "RAG implementation services company",
    "Salesforce Data Cloud and Snowflake AI data architecture",
  ],
  schema: [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "AI Data Foundation",
      provider: { "@type": "Organization", name: "Mirketa Inc.", url: "https://www.mirketa.com" },
      name: "AI Data Foundation Services",
      description:
        "Unifies, governs, and prepares enterprise data across Salesforce Data Cloud, Snowflake, and existing systems so AI agents and analytics can deliver trusted, production-grade results.",
      areaServed: "Global",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.mirketa.com/" },
        { "@type": "ListItem", position: 2, name: "AI Data Foundations", item: "https://www.mirketa.com/ai-data-foundations/" },
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
  heading: "Ready to Build an AI-Ready Data Foundation?",
  description:
    "Book a free 30-minute AI data readiness call with one of Mirketa's senior data architects. We'll map your current data landscape, identify the gaps blocking your AI initiatives, and give you a clear next step — whether that's Salesforce Data Cloud, a Snowflake-based architecture, or a hybrid approach.",
  points: [
    "No commitment required, just a clear-eyed assessment",
    "Senior data architect, not a sales rep",
    "Platform-agnostic recommendation for your stack",
    "Response within 1 business day",
  ],
  primaryCta: { label: "Book My Free Data Readiness Assessment", href: "#contact" },
  secondaryCta: { label: "Download the Architecture Guide", href: "/ai-enablement" },
};

const CONTACT = {
  heading: "Book Your Free Data Readiness Assessment",
  description: "Tell us about your current data landscape and AI goals. A senior data architect — not a sales rep — will map the gaps and recommend your next step.",
};

const CONSULTATION = {
  eyebrow: "Get Started",
  heading: "Schedule a Data Foundations Consultation",
  description: CONTACT.description,
  benefits: FINAL_CTA.points,
  formTitle: "Book My Free Assessment",
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

const cssUrl = (src) => `url("${src}")`;

// ============================================================
// MAIN COMPONENT
// ============================================================

export default function AIDataFoundations() {
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

      gsap.utils.toArray(".adf-reveal").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 32,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      gsap.utils.toArray(".adf-reveal-stagger").forEach((el) => {
        gsap.from(el.children, {
          opacity: 0,
          y: 26,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      gsap.utils.toArray(".adf-slide-left").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          x: -36,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      gsap.utils.toArray(".adf-slide-right").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          x: 36,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="ai-data-foundations">
      <Seo {...SEO} />
      <HeroSection heroTextRef={heroTextRef} />
      <ProblemSection />
      <ServicesSection />
      <ArchitectureSection />
      <TechnologySection />
      <ApproachSection />
      <ResultsSection />
      <WhyMirketaSection />
      <StatsSection />
      <FaqSection />
      <FinalCtaSection />
      <ContactSection />
    </div>
  );
}

// ============================================================
// HERO — layered data-terrain background + pull-quote stat
// ============================================================

function HeroSection({ heroTextRef }) {
  return (
    <section className="adf-hero" style={{ backgroundImage: cssUrl(Images.heroAiDataFoundations) }} aria-label="AI Data Foundation Services">
      <div className="adf-hero__scrim" />
      <div className="container">
        <Breadcrumb items={BREADCRUMB_ITEMS} className="adf-breadcrumb" />
      </div>
      <div className="container adf-hero__inner">
        <div ref={heroTextRef} className="adf-hero__text">
          <p className="adf-eyebrow">{HERO.eyebrow}</p>
          <h1>{HERO.title}</h1>
          <p className="adf-hero__description">{HERO.description}</p>
          <div className="adf-hero__ctas">
            <a href={HERO.primaryCta.href} className="btn btn-primary adf-btn">
              {HERO.primaryCta.label} <span aria-hidden="true">→</span>
            </a>
            <a href={HERO.secondaryCta.href} className="btn btn-secondary adf-btn">
              {HERO.secondaryCta.label}
            </a>
          </div>
          <ul className="adf-hero__badges">
            {HERO.badges.map((badge) => (
              <li key={badge}>{badge}</li>
            ))}
          </ul>
        </div>
        <aside className="adf-hero__pullquote" aria-label="Key statistic">
          <span className="adf-hero__pullquote-value">{HERO.stat.value}</span>
          <p>{HERO.stat.label}</p>
        </aside>
      </div>
      <button
        type="button"
        className="adf-scroll-indicator"
        onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
        aria-label="Scroll to services"
      >
        <span />
      </button>
    </section>
  );
}

// ============================================================
// THE DATA FOUNDATION PROBLEM — scattered silos -> unified fabric
// ============================================================

function ProblemSection() {
  return (
    <section className="section adf-problem" aria-labelledby="adf-problem-heading">
      <div className="container adf-problem__grid">
        <div className="adf-problem__diagram adf-slide-left" aria-hidden="true">
          <img src={problemDiagramImg} alt="" loading="lazy" />
        </div>
        <div className="adf-problem__content adf-slide-right">
          <p className="adf-eyebrow">{PROBLEM.eyebrow}</p>
          <h2 id="adf-problem-heading">{PROBLEM.heading}</h2>
          <p>{PROBLEM.issue}</p>
          <p className="adf-problem__solution">{PROBLEM.solution}</p>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// SERVICES — folded-corner document cards
// ============================================================

function ServicesSection() {
  return (
    <section className="section adf-services" id="services" aria-labelledby="adf-services-heading">
      <div className="container">
        <div className="section-heading adf-reveal">
          <p className="adf-eyebrow">Services</p>
          <h2 id="adf-services-heading">What Mirketa's AI Data Foundation Services Include</h2>
        </div>
        <div className="adf-services__grid adf-reveal-stagger">
          {SERVICES.map((svc) => (
            <article className="adf-doc-card" key={svc.title}>
              <span className="adf-doc-card__fold" aria-hidden="true" />
              <span className="adf-doc-card__tab">{svc.tab}</span>
              <img src={svc.icon} alt="" className="adf-doc-card__icon" loading="lazy" />
              <h3>{svc.title}</h3>
              <p>{svc.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// REFERENCE ARCHITECTURE — stratified horizontal layer diagram
// ============================================================

function ArchitectureSection() {
  return (
    <section className="section adf-architecture" aria-labelledby="adf-architecture-heading">
      <div className="container">
        <div className="section-heading adf-reveal">
          <p className="adf-eyebrow">Reference Architecture</p>
          <h2 id="adf-architecture-heading">Mirketa's AI-Ready Enterprise Data Architecture</h2>
        </div>
        <div className="adf-strata adf-reveal-stagger">
          {ARCHITECTURE_LAYERS.map((layer) => (
            <div className="adf-stratum" key={layer.title}>
              <div className="adf-stratum__icon">
                <img src={layer.icon} alt="" loading="lazy" />
              </div>
              <div className="adf-stratum__body">
                <span className="adf-stratum__tier">{layer.tier}</span>
                <h3>{layer.title}</h3>
                <p>{layer.description}</p>
              </div>
            </div>
          ))}
          <div className="adf-strata__flow" aria-hidden="true">
            <span>Data flows upward from source to AI consumption</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// TECHNOLOGY PARTNERS — category panels with chip lists
// ============================================================

function TechnologySection() {
  return (
    <section className="section adf-technology" aria-labelledby="adf-technology-heading">
      <div className="container">
        <div className="section-heading adf-reveal">
          <p className="adf-eyebrow">Technology Partners</p>
          <h2 id="adf-technology-heading">Salesforce Data Cloud, Snowflake, and the AI Data Stack We Build On</h2>
          <p>Mirketa is platform-pragmatic. We recommend the right architecture for your stack, budget, and use case, not a single-vendor lock-in.</p>
        </div>
        <div className="adf-technology__grid adf-reveal-stagger">
          {TECH_CATEGORIES.map((cat) => (
            <div className="adf-tech-panel" key={cat.title}>
              <div className="adf-tech-panel__head">
                <img src={cat.icon} alt="" loading="lazy" />
                <h3>{cat.title}</h3>
              </div>
              <p>{cat.description}</p>
              <div className="adf-tech-panel__chips">
                {cat.chips.map((chip) => (
                  <span key={chip}>{chip}</span>
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
// APPROACH — 2x2 cyclical loop (Assess -> Design -> Build -> Operate -> Assess)
// ============================================================

function ApproachSection() {
  return (
    <section className="section adf-approach" id="approach" aria-labelledby="adf-approach-heading">
      <div className="container">
        <div className="section-heading adf-reveal">
          <p className="adf-eyebrow">Our Approach</p>
          <h2 id="adf-approach-heading">How We Build Your AI Data Foundation — 4-Phase Methodology</h2>
        </div>
        <div className="adf-cycle adf-reveal">
          <div className="adf-cycle__grid">
            {APPROACH_PHASES.map((phase) => (
              <div className="adf-cycle-card" key={phase.phase}>
                <span className="adf-cycle-card__number">{phase.phase}</span>
                <h3>{phase.title}</h3>
                <p>{phase.description}</p>
                <span className="adf-cycle-card__output">Output: {phase.output}</span>
              </div>
            ))}
          </div>
          <div className="adf-cycle__center" aria-hidden="true">
            <span>↻</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// CLIENT RESULTS — case study tiles
// ============================================================

function ResultsSection() {
  return (
    <section className="section adf-results" aria-labelledby="adf-results-heading">
      <div className="container">
        <div className="section-heading adf-reveal">
          <p className="adf-eyebrow">Client Results</p>
          <h2 id="adf-results-heading">AI Data Foundation Use Cases Our Clients Have Built</h2>
        </div>
        <div className="adf-results__grid adf-reveal-stagger">
          {CASE_STUDIES.map((cs) => (
            <article className="adf-case-tile" key={cs.title}>
              <div className="adf-case-tile__media" style={{ backgroundImage: cssUrl(cs.image) }} role="img" aria-label={cs.title} />
              <div className="adf-case-tile__body">
                <span className="adf-case-tile__badge">{cs.badge}</span>
                <h3>{cs.title}</h3>
                <p>{cs.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// WHY MIRKETA — numbered manifesto list
// ============================================================

function WhyMirketaSection() {
  return (
    <section className="section adf-why" aria-labelledby="adf-why-heading">
      <div className="container">
        <div className="section-heading adf-reveal">
          <p className="adf-eyebrow">Why Mirketa</p>
          <h2 id="adf-why-heading">Why Enterprises Trust Mirketa for AI Data Foundation Services</h2>
        </div>
        <div className="adf-manifesto adf-reveal-stagger">
          {WHY_MIRKETA.map((item, i) => (
            <div className="adf-manifesto__item" key={item.title}>
              <span className="adf-manifesto__number">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// PROVEN RESULTS — soft green editorial stats band
// ============================================================

function StatTile({ metric }) {
  const [ref, inView] = useInView(0.5);
  const count = useCountUp(metric.value, inView);

  return (
    <div ref={ref} className="adf-stat">
      <div className="adf-stat__value">
        {metric.prefix}
        {count}
        {metric.suffix}
      </div>
      <p className="adf-stat__label">{metric.label}</p>
    </div>
  );
}

function StatsSection() {
  return (
    <section className="adf-stats" aria-label="Proven results">
      <div className="container">
        <div className="adf-stats__grid adf-reveal-stagger">
          {PROVEN_RESULTS.map((metric) => (
            <StatTile key={metric.label} metric={metric} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// FAQ — clean single-column accordion
// ============================================================

function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="section adf-faq" aria-labelledby="adf-faq-heading">
      <div className="container">
        <div className="section-heading adf-reveal">
          <p className="adf-eyebrow">FAQ</p>
          <h2 id="adf-faq-heading">Frequently Asked Questions About AI Data Foundation Services</h2>
        </div>
        <div className="adf-faq__list adf-reveal">
          {FAQS.map((item, i) => {
            const open = openIndex === i;
            const panelId = `adf-faq-panel-${i}`;
            return (
              <div className={`adf-faq-item ${open ? "is-open" : ""}`} key={item.q}>
                <button
                  type="button"
                  className="adf-faq-item__question"
                  aria-expanded={open}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(open ? -1 : i)}
                >
                  <span>{item.q}</span>
                  <span className="adf-faq-item__chevron" aria-hidden="true">⌄</span>
                </button>
                <div id={panelId} className="adf-faq-item__answer" role="region" hidden={!open}>
                  <p>{item.a}</p>
                </div>
              </div>
            );
          })}
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
    <section className="adf-final-cta adf-reveal" aria-labelledby="adf-final-cta-heading">
      <div className="container adf-final-cta__grid">
        <div>
          <h2 id="adf-final-cta-heading">{FINAL_CTA.heading}</h2>
          <p>{FINAL_CTA.description}</p>
          <div className="adf-final-cta__ctas">
            <a href={FINAL_CTA.primaryCta.href} className="btn btn-primary adf-btn" onClick={ripple}>
              {FINAL_CTA.primaryCta.label}
            </a>
            <a href={FINAL_CTA.secondaryCta.href} className="btn btn-secondary adf-btn">
              {FINAL_CTA.secondaryCta.label}
            </a>
          </div>
        </div>
        <ul className="adf-final-cta__points">
          {FINAL_CTA.points.map((p) => (
            <li key={p}>
              <img src={Images.iconCheckCircle} alt="" aria-hidden="true" />
              {p}
            </li>
          ))}
        </ul>
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
