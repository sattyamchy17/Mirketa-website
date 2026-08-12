import { useEffect, useMemo, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Images } from "../../assets/images/index.js";
import Seo from "../../components/Seo/Seo.jsx";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb.jsx";
import ConsultationSection from "../../components/ConsultationSection/ConsultationSection.jsx";
import "./DataCloud.css";

const BREADCRUMB_ITEMS = [{ label: "Home", href: "/" }, { label: "Salesforce Data Cloud" }];

gsap.registerPlugin(ScrollTrigger);

// ============================================================
// DATA — content sourced verbatim from
// https://mirketa.com/data-cloud/
// ============================================================

const HERO = {
  eyebrow: "Salesforce Data Cloud Consulting",
  title: "Salesforce Data Cloud Consulting & Real-Time Customer Data Unification",
  description:
    "Unify, activate, and govern enterprise customer data in real time with Salesforce Data Cloud — the industry-leading customer data platform built natively on Salesforce. Mirketa's certified Data Cloud consultants help you build a scalable, governed data foundation that powers AI, analytics, and personalised experiences across every Salesforce Cloud.",
  primaryCta: { label: "Get a Free Data Cloud Assessment", href: "#contact" },
  secondaryCta: { label: "Explore Capabilities", href: "#capabilities" },
};

const HERO_STATS = [
  { value: "200+", label: "Enterprise Clients" },
  { value: "15+", label: "Years Salesforce Experience" },
  { value: "500+", label: "Projects Delivered" },
  { value: "60-Day", label: "Hypercare Warranty" },
];

const DATA_FLOW = {
  sources: ["Salesforce CRM", "Marketing Cloud", "Data Warehouse", "E-Commerce", "Mobile App"],
  hub: "Unified Real-Time Customer Profile",
  destinations: ["Sales Cloud", "Service Cloud", "Marketing", "Agentforce AI"],
};

const PROBLEMS = [
  {
    challenge: "Fragmented Customer Data Across 10+ Systems",
    challengeDetail: "Sales reps, service agents, and marketers each see a different version of the customer — leading to duplicate outreach, inconsistent experiences, and missed upsell opportunities worth millions annually.",
    solution: "Unified Real-Time Customer Profile via Data Cloud Identity Resolution",
    solutionDetail: "Salesforce Data Cloud ingests data from all sources, applies deterministic and probabilistic identity resolution, and creates a single, real-time unified customer profile accessible across every Salesforce Cloud.",
  },
  {
    challenge: "AI Models Trained on Stale, Incomplete Data",
    challengeDetail: "Einstein AI, Agentforce agents, and predictive models are only as good as the data they consume. Batch-processed, siloed data produces inaccurate predictions, poor recommendations, and low AI adoption rates.",
    solution: "Real-Time Data Activation for Einstein AI & Agentforce",
    solutionDetail: "Data Cloud provides Einstein AI and Agentforce agents with real-time, unified customer context — enabling accurate predictions, personalised recommendations, and autonomous agent actions grounded in current data.",
  },
  {
    challenge: "Data Privacy & Consent Management Complexity",
    challengeDetail: "GDPR, CCPA, and industry-specific regulations require precise consent tracking, data lineage, and the ability to honour opt-outs across every system — a near-impossible task without a centralised data governance layer.",
    solution: "Built-In Data Governance, Consent, & Compliance Framework",
    solutionDetail: "Data Cloud's native consent management, data lineage tracking, and Einstein Trust Layer ensure all customer data is handled in compliance with GDPR, CCPA, HIPAA, and other regulatory frameworks with full audit trails.",
  },
];

const EXPERTISE = [
  { icon: Images.iconCapabilityIngestion, title: "Data Ingestion & Source Integration", description: "Connect CRM, marketing, data warehouse, e-commerce, and third-party sources into Data Cloud with real-time and batch ingestion patterns." },
  { icon: Images.iconIdentityResolution, title: "Identity Resolution & Data Modelling", description: "Design deterministic and probabilistic matching rules to resolve customer identities across systems and build unified customer profiles." },
  { icon: Images.iconAgentTypeOrchestrator, title: "Real-Time Activation Across Salesforce Clouds", description: "Activate unified data across Sales, Service, Marketing, Commerce, and Agentforce — enabling consistent, personalised customer experiences." },
  { icon: Images.iconEinsteinPredictive, title: "AI, Einstein & Agentforce Readiness", description: "Prepare your Data Cloud architecture to power Einstein AI predictions, Agentforce agents, and calculated insights at enterprise scale." },
  { icon: Images.iconDimensionGovernance, title: "Data Governance, Security & Compliance", description: "Implement consent management, data lineage, access controls, and compliance frameworks for GDPR, CCPA, HIPAA, and industry regulations." },
];

const CAPABILITIES = [
  {
    icon: Images.iconCapabilityIngestion,
    title: "Real-Time Data Ingestion & Harmonisation",
    subheading: "Connect and normalise data from any source",
    description: "Salesforce Data Cloud ingests structured and unstructured data from Salesforce Clouds, external data warehouses (Snowflake, BigQuery, Redshift), cloud storage, streaming APIs, and third-party applications — normalising it into a harmonised data model for unified analysis.",
    features: ["Batch Ingestion", "Streaming Ingestion", "REST API Connectors", "Snowflake Direct Share", "Data Harmonisation"],
  },
  {
    icon: Images.iconIdentityResolution,
    title: "Identity Resolution & Customer Unification",
    subheading: "Create a single, accurate customer profile",
    description: "Data Cloud's identity resolution engine matches and merges customer records from multiple sources using deterministic rules (email, phone, Salesforce ID) and probabilistic matching — creating a unified customer profile that eliminates duplicates and provides a true 360-degree view.",
    features: ["Deterministic Matching", "Probabilistic Matching", "360° Customer Profile", "Duplicate Elimination"],
  },
  {
    icon: Images.iconCapabilitySegments,
    title: "Calculated Insights & Advanced Segmentation",
    subheading: "Build dynamic audiences and predictive metrics",
    description: "Create calculated insights — custom metrics derived from unified customer data — and build dynamic audience segments that update in real time. Use these segments to power personalised marketing campaigns, sales prioritisation, and service routing across Salesforce Clouds.",
    features: ["Calculated Insights", "Dynamic Segments", "Real-Time Audiences", "Predictive Scoring"],
  },
  {
    icon: Images.iconAgentTypeOrchestrator,
    title: "Cross-Cloud Data Activation",
    subheading: "Activate unified data across every Salesforce Cloud",
    description: "Activate unified customer profiles and segments directly within Sales Cloud, Service Cloud, Marketing Cloud, Commerce Cloud, and Agentforce — ensuring every customer-facing team and AI agent operates from the same real-time data foundation.",
    features: ["Sales Cloud Activation", "Service Cloud Activation", "Marketing Personalisation", "Agentforce Data Context"],
  },
  {
    icon: Images.iconEinsteinPredictive,
    title: "AI, Einstein & Agentforce Data Foundation",
    subheading: "Power AI models with real-time, unified data",
    description: "Data Cloud serves as the data foundation for Einstein AI predictions, Agentforce autonomous agents, and custom AI models — providing real-time, unified customer context that dramatically improves prediction accuracy, personalisation quality, and agent decision-making.",
    features: ["Einstein AI Readiness", "Agentforce Data Context", "Predictive Modelling", "Vector Embeddings"],
  },
];

const INGESTION_METRICS = [
  { source: "Salesforce CRM", pct: 98 },
  { source: "Marketing Cloud", pct: 94 },
  { source: "Snowflake Warehouse", pct: 89 },
  { source: "E-Commerce Platform", pct: 85 },
  { source: "Mobile App Events", pct: 79 },
];

const UNIFIED_PROFILE = {
  id: "UC-4829-SMITH-JOHN",
  matched: "7 records merged → 1 profile",
  confidence: "98.5% deterministic",
  sources: ["CRM Contact", "Marketing Lead", "Commerce Account", "Service Case"],
};

const AUDIENCE_SEGMENTS = [
  { name: "High-Value Prospects", count: "12.4K" },
  { name: "At-Risk Renewals", count: "3.2K" },
  { name: "Upsell Ready", count: "8.7K" },
  { name: "Churned Win Back", count: "1.9K" },
  { name: "New Onboarding", count: "4.5K" },
  { name: "VIP Tier", count: "890" },
];

const ACTIVATION_STATUS = ["Sales Cloud", "Service Cloud", "Marketing Cloud", "Agentforce AI"];

const DASHBOARD_PERFORMANCE = [
  { value: "+40%", label: "Einstein Prediction Accuracy" },
  { value: "98.5%", label: "Agentforce Context Quality" },
  { value: "+35%", label: "Personalisation Lift" },
  { value: "Real-Time", label: "Data Freshness" },
];

const USE_CASES = [
  { title: "360-Degree Real-Time Customer View for Sales & Service Teams", description: "Unify CRM, marketing, e-commerce, and service data into a single real-time customer profile — giving sales reps and service agents complete context for every interaction, reducing handle time by 25% and increasing upsell rates by 30%.", tags: ["Sales Cloud", "Service Cloud", "Identity Resolution", "Real-Time Profile"] },
  { title: "AI-Powered Product Recommendations & Predictive Personalisation", description: "Power Einstein AI and Agentforce with unified customer data to deliver personalised product recommendations, next-best-action suggestions, and predictive lead scoring across every channel.", tags: ["Einstein AI", "Agentforce", "Personalisation"] },
  { title: "Cross-Cloud Analytics & Unified Reporting Dashboards", description: "Connect Data Cloud to Tableau and Salesforce Analytics to build unified cross-cloud dashboards that provide a single source of truth for revenue, engagement, and customer lifecycle metrics.", tags: ["Tableau Analytics", "Unified Reporting"] },
  { title: "Consent Management & Data Governance for Regulatory Compliance", description: "Implement centralised consent tracking, data lineage, and privacy controls across all customer data — ensuring GDPR, CCPA, and HIPAA compliance with full audit trails and automated opt-out enforcement.", tags: ["GDPR", "CCPA", "Consent Management"] },
  { title: "Marketing Personalisation at Scale with Real-Time Audience Segments", description: "Build dynamic audience segments that update in real time as customer behaviour changes — enabling Marketing Cloud to deliver hyper-personalised campaigns with 40% higher engagement rates.", tags: ["Marketing Cloud", "Dynamic Segments", "Real-Time Audiences"] },
];

const ARCHITECTURE_STAGES = [
  { icon: Images.iconLayerSourceSystems, stage: "Ingest", title: "Multi-Source Data Ingestion", description: "Connect all customer data sources into Data Cloud using real-time streaming, batch connectors, and direct data shares.", items: ["Salesforce Clouds", "Snowflake", "BigQuery", "REST APIs", "S3 / Azure Blob"] },
  { icon: Images.iconLayerHarmonise, stage: "Harmonise", title: "Data Mapping & Normalisation", description: "Map source data to the Data Cloud data model, normalise field formats, and apply data quality rules to ensure consistency.", items: ["Data Model Mapping", "Field Normalisation", "Data Quality Rules", "Schema Validation"] },
  { icon: Images.iconIdentityResolution, stage: "Unify", title: "Identity Resolution & Profile Creation", description: "Resolve customer identities across sources using deterministic and probabilistic matching to create unified customer profiles.", items: ["Identity Resolution", "Profile Merging", "360° View", "Duplicate Elimination"] },
  { icon: Images.iconAgentTypeOrchestrator, stage: "Activate", title: "Cross-Cloud Data Activation & Segmentation", description: "Activate unified profiles and calculated insights across Sales, Service, Marketing, Commerce, and Agentforce in real time.", items: ["Sales Cloud", "Service Cloud", "Marketing Cloud", "Agentforce", "Dynamic Segments"] },
  { icon: Images.iconEinsteinPredictive, stage: "AI", title: "Einstein AI & Agentforce Intelligence Layer", description: "Power Einstein predictions, Agentforce agents, and custom AI models with real-time, unified customer data and vector embeddings.", items: ["Einstein AI", "Agentforce", "Vector Embeddings", "Predictive Scoring", "Einstein Trust Layer"] },
];

const INDUSTRIES = [
  { icon: Images.iconIndustryEcommerce, title: "Retail & E-Commerce", description: "Personalisation at scale, cart abandonment recovery, loyalty data unification" },
  { icon: Images.iconIndustryFinancialServices, title: "Financial Services", description: "360° client views, AML compliance data, wealth management personalisation" },
  { icon: Images.iconIndustryHealthcare, title: "Healthcare & Life Sciences", description: "Unified patient profiles, HIPAA-compliant data activation, care coordination" },
  { icon: Images.iconIndustryHitech, title: "Technology & SaaS", description: "Product usage + CRM fusion, churn prediction, PLG data activation" },
  { icon: Images.iconIndustryManufacturing, title: "Manufacturing", description: "Dealer/distributor data unification, warranty analytics, IoT data integration" },
  { icon: Images.iconIndustryEducation, title: "Education", description: "Student lifecycle data, alumni engagement, recruitment personalisation" },
  { icon: Images.iconIndustryNonprofits, title: "Nonprofit", description: "Donor 360° profiles, constituent engagement, grant impact analytics" },
  { icon: Images.iconIndustryWholesale, title: "Wholesale Distribution", description: "Channel partner data unification, demand forecasting, order analytics" },
];

const WHY_MIRKETA = [
  { icon: Images.iconCapabilityAgentforce, title: "Certified Salesforce Data Cloud Architects", description: "Salesforce-certified Data Cloud architects, integration specialists, and AI consultants with deep experience across 15+ years and 200+ client engagements." },
  { icon: Images.iconOptimize, title: "Sprint-Based Delivery with Measurable KPIs", description: "An agile, sprint-based methodology with measurable milestones at every phase — predictable timelines, transparent progress, no surprise scope creep." },
  { icon: Images.iconCheckCircle, title: "60-Day Hypercare Warranty", description: "Every engagement includes performance monitoring, data quality validation, model tuning, and team training after go-live." },
];

const IMPLEMENTATION_PHASES = [
  { phase: "Phase 1", title: "Data Discovery & Source Mapping", weeks: "Weeks 1–2", detail: "Audit all data sources, define data model", start: 0, span: 2 },
  { phase: "Phase 2", title: "Ingestion & Identity Resolution Build", weeks: "Weeks 3–6", detail: "Configure connectors, matching rules", start: 2, span: 4 },
  { phase: "Phase 3", title: "Activation & AI Readiness", weeks: "Weeks 7–12", detail: "Cross-cloud activation, Einstein setup", start: 6, span: 6 },
  { phase: "Phase 4", title: "Go-Live & 60-Day Hypercare", weeks: "Weeks 13–16+", detail: "UAT, go-live, optimisation", start: 12, span: 4 },
];
const TIMELINE_TOTAL_WEEKS = 16;

const TESTIMONIALS = [
  { name: "Brent", quote: "Delivering custom, AppExchange-certified solutions at a fraction of the cost of legacy market alternatives, backed by agile development cycles that deploy production environment fixes within 12 to 24 hours." },
  { name: "Peachy Insurance", quote: "Empowering prominent US behavioral health and specialty care brands to maximize clinical velocity, reduce administrative overhead, and drive measurable workflow efficiency across multiple departments through native cloud innovation." },
  { name: "Vikram Chandra", quote: "We designed a sophisticated, highly efficient Salesforce infrastructure for a leading healthcare brand, enabling their teams to accelerate patient access to critical care while maximizing operational velocity across multiple departments." },
  { name: "Drew Powers", quote: "Mirketa helped us connect Snowflake, Marketing Cloud, and our mobile app data into a single unified customer profile. The real-time segmentation has transformed our marketing campaigns — we're seeing 38% higher email engagement and 22% lower unsubscribe rates." },
  { name: "Shruti Sharma", quote: "Our Data Cloud implementation with Mirketa was the most strategic technology investment we've made in five years. The unified patient profile they built — HIPAA-compliant, real-time, connected to our service and marketing clouds — has fundamentally changed how we engage patients." },
  { name: "Matt", quote: "Mirketa's governance and consent management work within Data Cloud gave our legal and compliance teams the confidence to proceed with AI initiatives we'd been delaying for two years. The data lineage and audit trail capabilities are exactly what we needed for GDPR compliance." },
];

const FAQS = [
  { q: "What is Salesforce Data Cloud and how does it differ from a traditional CDP?", a: "Salesforce Data Cloud (formerly Salesforce CDP) is a real-time customer data platform built natively on the Salesforce platform. Unlike traditional CDPs that require separate data pipelines and batch processing, Data Cloud is natively integrated with all Salesforce Clouds — enabling real-time data ingestion, instant identity resolution, and immediate activation across Sales Cloud, Service Cloud, Marketing Cloud, Commerce Cloud, and Agentforce without ETL overhead." },
  { q: "What is identity resolution in Salesforce Data Cloud and why does it matter?", a: "Identity resolution in Salesforce Data Cloud is the process of matching and merging customer records from multiple data sources into a single, unified customer profile. It uses deterministic matching (email, phone, Salesforce ID) and probabilistic matching to reconcile data from CRM, marketing, e-commerce, and third-party sources — eliminating duplicate profiles and creating a true 360-degree customer view that powers personalisation and AI." },
  { q: "What data sources can Salesforce Data Cloud ingest and connect?", a: "Salesforce Data Cloud can ingest data from Salesforce CRM (Sales, Service, Marketing, Commerce), external data warehouses (Snowflake, BigQuery, Redshift), cloud storage (AWS S3, Azure Blob, GCS), streaming sources (Kafka, webhooks), marketing platforms, e-commerce systems, mobile apps, and any REST API source. Mirketa designs the optimal ingestion architecture for your specific source landscape." },
  { q: "How does Salesforce Data Cloud support Einstein AI and Agentforce?", a: "Salesforce Data Cloud serves as the data foundation for Einstein AI and Agentforce. It provides AI models and agents with real-time, unified customer profiles, calculated insights, and segmentation data — enabling personalised AI recommendations, predictive scoring, and autonomous agent actions grounded in accurate, up-to-date customer context. Without Data Cloud, Einstein and Agentforce operate on incomplete, fragmented data." },
  { q: "How long does a Salesforce Data Cloud implementation take with Mirketa?", a: "A standard Salesforce Data Cloud implementation with Mirketa typically takes 8–16 weeks depending on the number of data sources, complexity of identity resolution rules, and activation use cases. We follow an agile sprint-based delivery methodology with measurable milestones at each phase — from data discovery and source mapping through to production go-live and a 60-day hypercare period." },
  { q: "What industries benefit most from Salesforce Data Cloud?", a: "Salesforce Data Cloud delivers measurable ROI across retail and e-commerce (personalisation at scale), financial services (360-degree client views), healthcare (unified patient profiles with HIPAA compliance), manufacturing (dealer and distributor data unification), technology/SaaS (product usage and CRM data fusion), and any enterprise with complex multi-system customer data challenges and AI adoption goals." },
  { q: "Does Salesforce Data Cloud support GDPR and CCPA compliance?", a: "Yes. Salesforce Data Cloud includes built-in consent management, data lineage tracking, and the Einstein Trust Layer — ensuring all customer data is handled in compliance with GDPR, CCPA, HIPAA, and other regulatory frameworks. Mirketa implements these governance frameworks as part of every Data Cloud engagement, including consent propagation across all activated Salesforce Clouds." },
  { q: "What does Mirketa's Salesforce Data Cloud engagement include?", a: "A Mirketa Data Cloud engagement includes: data strategy and architecture assessment, source system mapping and ingestion design, identity resolution rule configuration, data model and calculated insights setup, segmentation and activation configuration, AI/Einstein readiness preparation, UAT, go-live support, and a 60-day hypercare period with performance optimisation, data quality validation, and team training." },
];

const CONTACT = {
  eyebrow: "Get in Touch",
  heading: "Talk to a Salesforce Data Cloud Consulting Expert Today",
  description: "Ready to unify your customer data, activate real-time insights, and power AI with Salesforce Data Cloud? Our certified Data Cloud consultants will assess your current data landscape and design a roadmap tailored to your business goals.",
  benefits: [
    "Free Data Cloud Assessment",
    "Response Within 24 Hours",
    "No Obligation Consultation",
  ],
  formTitle: "Talk to a Data Cloud Expert",
};

const SEO = {
  title: "Salesforce Data Cloud Consulting Services | Mirketa",
  description:
    "Unify customer data in real time with Salesforce Data Cloud. Mirketa delivers identity resolution, AI activation, and Einstein/Agentforce grounding.",
  canonical: "https://www.mirketa.com/data-cloud/",
  keywords: [
    "Salesforce Data Cloud Consulting",
    "Salesforce Data Cloud Implementation",
    "Customer Data Platform",
    "Identity Resolution",
    "Customer 360",
    "Real-Time Data Integration",
    "AI-Powered Analytics",
    "Zero Copy Integration",
    "Salesforce Data Cloud consulting company",
    "Salesforce Data Cloud implementation partner",
    "real-time customer data platform for Salesforce",
    "identity resolution and Customer 360 consulting",
  ],
  schema: [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "Salesforce Data Cloud Consulting",
      provider: { "@type": "Organization", name: "Mirketa Inc.", url: "https://www.mirketa.com" },
      name: "Salesforce Data Cloud Consulting & Implementation",
      description:
        "Unifies enterprise customer data in real time on Salesforce Data Cloud, powering identity resolution, AI-driven analytics, and Einstein/Agentforce grounding.",
      areaServed: "Global",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.mirketa.com/" },
        { "@type": "ListItem", position: 2, name: "Data Cloud", item: "https://www.mirketa.com/data-cloud/" },
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
  heading: "Ready to Unify Your Customer Data with Salesforce Data Cloud?",
  description: "Join 200+ enterprises that trust Mirketa to implement Salesforce Data Cloud — delivering real-time customer intelligence, AI readiness, and measurable business outcomes.",
  cta: { label: "Talk to an Expert", href: "#contact" },
  stats: [
    { value: "200+", label: "Enterprise Clients" },
    { value: "15+", label: "Years Salesforce Experience" },
    { value: "60-Day", label: "Hypercare Warranty" },
    { value: "98%", label: "Client Retention Rate" },
  ],
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

export default function DataCloud() {
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
          stagger: 0.12,
          ease: "power3.out",
        });
      }

      gsap.utils.toArray(".dc-reveal").forEach((el) => {
        gsap.from(el, {
          opacity: prefersReduced ? 1 : 0,
          y: prefersReduced ? 0 : 32,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      gsap.utils.toArray(".dc-reveal-stagger").forEach((el) => {
        gsap.from(el.children, {
          opacity: prefersReduced ? 1 : 0,
          y: prefersReduced ? 0 : 26,
          duration: 0.6,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="data-cloud">
      <Seo {...SEO} />
      <HeroSection heroTextRef={heroTextRef} heroRef={heroRef} />
      <DataFlowSection />
      <ProblemSection />
      <ExpertiseSection />
      <CapabilitiesSection />
      <DashboardSection />
      <UseCasesSection />
      <ArchitectureSection />
      <IntegrationsSection />
      <IndustriesSection />
      <WhyMirketaSection />
      <TestimonialsSection />
      <FaqSection />
      <FinalCtaSection />
      <ContactSection />
      <StickyCta visible={showStickyCta} />
    </div>
  );
}

// ============================================================
// STICKY CTA — desktop only, appears once the hero scrolls out of view
// ============================================================

function StickyCta({ visible }) {
  return (
    <div className={`dc-sticky-cta ${visible ? "is-visible" : ""}`} aria-hidden={!visible}>
      <a href="#contact" className="btn btn-primary dc-btn" tabIndex={visible ? 0 : -1}>
        Talk to a Data Cloud Expert <span aria-hidden="true">→</span>
      </a>
    </div>
  );
}

// ============================================================
// HERO — converging data-stream background
// ============================================================

function HeroSection({ heroTextRef, heroRef }) {
  return (
    <section ref={heroRef} className="dc-hero" style={{ backgroundImage: cssUrl(Images.heroDataCloud) }} aria-label="Salesforce Data Cloud Consulting">
      <div className="dc-hero__scrim" />
      <div className="container">
        <Breadcrumb items={BREADCRUMB_ITEMS} className="dc-breadcrumb" />
      </div>
      <div className="container dc-hero__inner">
        <div ref={heroTextRef} className="dc-hero__text">
          <p className="dc-eyebrow">{HERO.eyebrow}</p>
          <h1>{HERO.title}</h1>
          <p className="dc-hero__description">{HERO.description}</p>
          <div className="dc-hero__ctas">
            <a href={HERO.primaryCta.href} className="btn btn-primary dc-btn">
              {HERO.primaryCta.label} <span aria-hidden="true">→</span>
            </a>
            <a href={HERO.secondaryCta.href} className="btn btn-secondary dc-btn">
              {HERO.secondaryCta.label}
            </a>
          </div>
        </div>
        <div className="dc-hero__stats dc-reveal-stagger">
          {HERO_STATS.map((s) => (
            <div className="dc-hero__stat" key={s.label}>
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
      <button type="button" className="dc-scroll-indicator" onClick={() => document.getElementById("capabilities")?.scrollIntoView({ behavior: "smooth" })} aria-label="Scroll to capabilities">
        <span />
      </button>
    </section>
  );
}

// ============================================================
// LIVE DATA FLOW VISUALIZATION — 3-column flow diagram
// ============================================================

function DataFlowSection() {
  return (
    <section className="section dc-flow" aria-labelledby="dc-flow-heading">
      <div className="container">
        <div className="section-heading dc-reveal">
          <p className="dc-eyebrow">Live Data Flow</p>
          <h2 id="dc-flow-heading">From Fragmented Sources to Unified Activation</h2>
        </div>
        <div className="dc-flow__diagram dc-reveal">
          <div className="dc-flow__column">
            <span className="dc-flow__column-label">Sources</span>
            {DATA_FLOW.sources.map((s) => (
              <div className="dc-flow__node" key={s}>{s}</div>
            ))}
          </div>
          <div className="dc-flow__lines" aria-hidden="true">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0 10 L100 50" stroke="#21ad65" strokeWidth="0.6" fill="none" opacity="0.5" />
              <path d="M0 30 L100 50" stroke="#21ad65" strokeWidth="0.6" fill="none" opacity="0.5" />
              <path d="M0 50 L100 50" stroke="#21ad65" strokeWidth="0.6" fill="none" opacity="0.5" />
              <path d="M0 70 L100 50" stroke="#21ad65" strokeWidth="0.6" fill="none" opacity="0.5" />
              <path d="M0 90 L100 50" stroke="#21ad65" strokeWidth="0.6" fill="none" opacity="0.5" />
            </svg>
          </div>
          <div className="dc-flow__hub">{DATA_FLOW.hub}</div>
          <div className="dc-flow__lines" aria-hidden="true">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0 50 L100 12" stroke="#21ad65" strokeWidth="0.6" fill="none" opacity="0.5" />
              <path d="M0 50 L100 38" stroke="#21ad65" strokeWidth="0.6" fill="none" opacity="0.5" />
              <path d="M0 50 L100 62" stroke="#21ad65" strokeWidth="0.6" fill="none" opacity="0.5" />
              <path d="M0 50 L100 88" stroke="#21ad65" strokeWidth="0.6" fill="none" opacity="0.5" />
            </svg>
          </div>
          <div className="dc-flow__column">
            <span className="dc-flow__column-label">Destinations</span>
            {DATA_FLOW.destinations.map((d) => (
              <div className="dc-flow__node dc-flow__node--dest" key={d}>{d}</div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// THE DATA PROBLEM — stacked challenge/solution rows
// ============================================================

function ProblemSection() {
  return (
    <section className="section dc-problem" aria-labelledby="dc-problem-heading">
      <div className="container">
        <div className="section-heading dc-reveal">
          <p className="dc-eyebrow">The Data Problem</p>
          <h2 id="dc-problem-heading">Why Enterprises Need Salesforce Data Cloud for Real-Time Customer Intelligence</h2>
          <p>Fragmented customer data across CRM, marketing, e-commerce, and third-party systems creates blind spots that cost revenue, reduce personalisation quality, and block AI adoption. Salesforce Data Cloud solves this at enterprise scale.</p>
        </div>
        <div className="dc-problem__rows dc-reveal-stagger">
          {PROBLEMS.map((p) => (
            <div className="dc-problem__row" key={p.challenge}>
              <div className="dc-problem__side dc-problem__side--challenge">
                <span className="dc-problem__tag">Challenge</span>
                <h3>{p.challenge}</h3>
                <p>{p.challengeDetail}</p>
              </div>
              <div className="dc-problem__arrow" aria-hidden="true">→</div>
              <div className="dc-problem__side dc-problem__side--solution">
                <span className="dc-problem__tag">Solution</span>
                <h3>{p.solution}</h3>
                <p>{p.solutionDetail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// MIRKETA DATA CLOUD EXPERTISE — flip cards
// ============================================================

function FlipCard({ item }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <button type="button" className={`dc-flip-card ${flipped ? "is-flipped" : ""}`} onClick={() => setFlipped((v) => !v)} aria-pressed={flipped}>
      <div className="dc-flip-card__inner">
        <div className="dc-flip-card__face dc-flip-card__face--front">
          <img src={item.icon} alt="" loading="lazy" />
          <h3>{item.title}</h3>
          <span className="dc-flip-card__hint">Tap to learn more</span>
        </div>
        <div className="dc-flip-card__face dc-flip-card__face--back">
          <p>{item.description}</p>
        </div>
      </div>
    </button>
  );
}

function ExpertiseSection() {
  return (
    <section className="section dc-expertise" aria-labelledby="dc-expertise-heading">
      <div className="container">
        <div className="section-heading dc-reveal">
          <p className="dc-eyebrow">Mirketa Data Cloud Expertise</p>
          <h2 id="dc-expertise-heading">End-to-End Salesforce Data Cloud Consulting, Implementation & Activation Services</h2>
          <p>From data strategy and architecture to production go-live and ongoing optimisation, Mirketa's certified Data Cloud consultants cover every dimension of your Salesforce Data Cloud implementation.</p>
        </div>
        <div className="dc-flip-grid dc-reveal-stagger">
          {EXPERTISE.map((item) => (
            <FlipCard key={item.title} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// KEY CAPABILITIES — full-width alternating spec bands
// ============================================================

function CapabilitiesSection() {
  return (
    <section className="section dc-capabilities" id="capabilities" aria-labelledby="dc-capabilities-heading">
      <div className="container">
        <div className="section-heading dc-reveal">
          <p className="dc-eyebrow">Key Capabilities</p>
          <h2 id="dc-capabilities-heading">Salesforce Data Cloud Platform Capabilities That Drive Enterprise Customer Intelligence</h2>
        </div>
      </div>
      <div className="dc-bands">
        {CAPABILITIES.map((cap, i) => (
          <div className={`dc-band ${i % 2 === 1 ? "dc-band--alt" : ""} dc-reveal`} key={cap.title}>
            <div className="container dc-band__inner">
              <img src={cap.icon} alt="" className="dc-band__icon" loading="lazy" />
              <div className="dc-band__content">
                <span className="dc-band__subheading">{cap.subheading}</span>
                <h3>{cap.title}</h3>
                <p>{cap.description}</p>
                <div className="dc-band__tags">
                  {cap.features.map((f) => (
                    <span key={f}>{f}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ============================================================
// LIVE DATA CLOUD METRICS DASHBOARD — mock live console
// ============================================================

function IngestionBar({ metric }) {
  const [ref, inView] = useInView(0.4);
  return (
    <div ref={ref} className="dc-ingestion-row">
      <span className="dc-ingestion-row__label">{metric.source}</span>
      <div className="dc-ingestion-row__track">
        <div className="dc-ingestion-row__fill" style={{ width: inView ? `${metric.pct}%` : "0%" }} />
      </div>
      <span className="dc-ingestion-row__pct">{metric.pct}%</span>
    </div>
  );
}

function DashboardSection() {
  return (
    <section className="section dc-dashboard" aria-labelledby="dc-dashboard-heading">
      <div className="container">
        <div className="dc-dashboard__head dc-reveal">
          <div className="section-heading">
            <p className="dc-eyebrow">Live Data Cloud Metrics</p>
            <h2 id="dc-dashboard-heading">See Salesforce Data Cloud in Action</h2>
          </div>
          <img src={Images.illoDataCloudUnifiedProfileDashboard} alt="" aria-hidden="true" className="dc-dashboard__illo" loading="lazy" />
        </div>
        <div className="dc-console dc-reveal">
          <div className="dc-console__titlebar">
            <span className="dc-console__dot dc-console__dot--red" />
            <span className="dc-console__dot dc-console__dot--yellow" />
            <span className="dc-console__dot dc-console__dot--green" />
            <span className="dc-console__filename">data-cloud-console — live</span>
            <span className="dc-console__live"><span /> 2.4M records/hr</span>
          </div>
          <div className="dc-console__grid">
            <div className="dc-console__panel">
              <h3>Data Ingestion</h3>
              {INGESTION_METRICS.map((m) => (
                <IngestionBar key={m.source} metric={m} />
              ))}
            </div>
            <div className="dc-console__panel">
              <h3>Unified Customer Profile</h3>
              <div className="dc-profile-card">
                <span className="dc-profile-card__id">{UNIFIED_PROFILE.id}</span>
                <p>{UNIFIED_PROFILE.matched}</p>
                <span className="dc-profile-card__confidence">{UNIFIED_PROFILE.confidence}</span>
                <div className="dc-profile-card__sources">
                  {UNIFIED_PROFILE.sources.map((s) => (
                    <span key={s}>{s}</span>
                  ))}
                </div>
              </div>
              <h3 className="dc-console__panel-subheading">Cross-Cloud Activation</h3>
              <div className="dc-activation-grid">
                {ACTIVATION_STATUS.map((a) => (
                  <div className="dc-activation-chip" key={a}>
                    <span className="dc-activation-chip__dot" /> {a}
                  </div>
                ))}
              </div>
            </div>
            <div className="dc-console__panel">
              <h3>Active Audience Segments</h3>
              <div className="dc-segments-list">
                {AUDIENCE_SEGMENTS.map((seg) => (
                  <div className="dc-segments-list__row" key={seg.name}>
                    <span>{seg.name}</span>
                    <strong>{seg.count}</strong>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="dc-console__performance">
            {DASHBOARD_PERFORMANCE.map((p) => (
              <div className="dc-console__performance-item" key={p.label}>
                <strong>{p.value}</strong>
                <span>{p.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// USE CASES — numbered rows
// ============================================================

function UseCasesSection() {
  return (
    <section className="section dc-use-cases" aria-labelledby="dc-use-cases-heading">
      <div className="container">
        <div className="section-heading dc-reveal">
          <p className="dc-eyebrow">Use Cases</p>
          <h2 id="dc-use-cases-heading">Salesforce Data Cloud Use Cases That Deliver Measurable Business Outcomes</h2>
        </div>
        <div className="dc-use-case__list dc-reveal-stagger">
          {USE_CASES.map((uc, i) => (
            <div className="dc-use-case__row" key={uc.title}>
              <span className="dc-use-case__number">{String(i + 1).padStart(2, "0")}</span>
              <div className="dc-use-case__body">
                <h3>{uc.title}</h3>
                <p>{uc.description}</p>
                <div className="dc-use-case__tags">
                  {uc.tags.map((t) => (
                    <span key={t}>{t}</span>
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
// PLATFORM ARCHITECTURE — horizontal pipeline stages
// ============================================================

function ArchitectureSection() {
  return (
    <section className="section dc-architecture" aria-labelledby="dc-architecture-heading">
      <div className="container">
        <div className="section-heading dc-reveal">
          <p className="dc-eyebrow">Platform Architecture</p>
          <h2 id="dc-architecture-heading">Salesforce Data Cloud Architecture: From Raw Data to AI-Ready Insights</h2>
          <p>Mirketa implements the full Salesforce Data Cloud architecture stack — from data ingestion and harmonisation through identity resolution, segmentation, activation, and AI readiness.</p>
        </div>
        <div className="dc-pipeline dc-reveal-stagger">
          {ARCHITECTURE_STAGES.map((stage, i) => (
            <div className="dc-pipeline__stage" key={stage.title}>
              <div className="dc-pipeline__card">
                <span className="dc-pipeline__badge">{stage.stage}</span>
                <img src={stage.icon} alt="" loading="lazy" />
                <h3>{stage.title}</h3>
                <p>{stage.description}</p>
                <div className="dc-pipeline__items">
                  {stage.items.map((it) => (
                    <span key={it}>{it}</span>
                  ))}
                </div>
              </div>
              {i < ARCHITECTURE_STAGES.length - 1 && <span className="dc-pipeline__arrow" aria-hidden="true">→</span>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// INTEGRATIONS — connected systems grid
// ============================================================

const IntegrationIco = {
  cloud: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6.5 16.5A4.2 4.2 0 017 8.2 5.5 5.5 0 0117.5 9.5 3.7 3.7 0 0117 17H7" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></svg>
  ),
  database: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><ellipse cx="12" cy="6" rx="8" ry="3" stroke="currentColor" strokeWidth="1.4" /><path d="M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" stroke="currentColor" strokeWidth="1.4" /></svg>
  ),
  chart: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 19V13M10 19V8M16 19v-5M20 19V5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
  ),
  plug: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 3v5M15 3v5M7 8h10v4a5 5 0 01-10 0V8z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="M12 17v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
  ),
  layers: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3l9 5-9 5-9-5 9-5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M3 12l9 5 9-5M3 16l9 5 9-5" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /></svg>
  ),
  globe: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.4" /><path d="M3 12h18M12 3c2.5 2.5 3.5 6 3.5 9s-1 6.5-3.5 9c-2.5-2.5-3.5-6-3.5-9s1-6.5 3.5-9z" stroke="currentColor" strokeWidth="1.3" /></svg>
  ),
  headset: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 13a8 8 0 0116 0v4" stroke="currentColor" strokeWidth="1.5" /><rect x="3" y="13" width="4" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4" /><rect x="17" y="13" width="4" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4" /></svg>
  ),
  megaphone: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 10v4h3l6 4V6L6 10H3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="M17 8a5 5 0 010 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
  ),
  cart: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 4h2l2.2 11h10.6L20 7H6.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /><circle cx="9" cy="20" r="1.3" fill="currentColor" /><circle cx="17" cy="20" r="1.3" fill="currentColor" /></svg>
  ),
  target: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.4" /><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.3" opacity="0.6" /><circle cx="12" cy="12" r="1.2" fill="currentColor" /></svg>
  ),
  code: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 6L4 12l5 6M15 6l5 6-5 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
};

const INTEGRATIONS = {
  eyebrow: "Integrations",
  heading: "Salesforce Data Cloud, Connected to Your Full Stack",
  intro: "Unified customer data is only useful if it reaches the systems your teams already run. We connect Data Cloud to your CRM, analytics, and cloud infrastructure.",
  items: [
    { icon: IntegrationIco.target, title: "Salesforce CRM" },
    { icon: IntegrationIco.target, title: "Sales Cloud" },
    { icon: IntegrationIco.headset, title: "Service Cloud" },
    { icon: IntegrationIco.megaphone, title: "Marketing Cloud" },
    { icon: IntegrationIco.cart, title: "Commerce Cloud" },
    { icon: IntegrationIco.plug, title: "MuleSoft" },
    { icon: IntegrationIco.chart, title: "Tableau" },
    { icon: IntegrationIco.database, title: "Snowflake" },
    { icon: IntegrationIco.database, title: "Databricks" },
    { icon: IntegrationIco.cloud, title: "AWS" },
    { icon: IntegrationIco.cloud, title: "Azure" },
    { icon: IntegrationIco.cloud, title: "Google Cloud" },
    { icon: IntegrationIco.layers, title: "SAP" },
    { icon: IntegrationIco.layers, title: "Oracle" },
    { icon: IntegrationIco.code, title: "External APIs" },
  ],
};

function IntegrationsSection() {
  return (
    <section className="section dc-integrations" aria-labelledby="dc-integrations-heading">
      <div className="container">
        <div className="section-heading dc-reveal">
          <p className="dc-eyebrow">{INTEGRATIONS.eyebrow}</p>
          <h2 id="dc-integrations-heading">{INTEGRATIONS.heading}</h2>
          <p>{INTEGRATIONS.intro}</p>
        </div>
        <div className="dc-integrations__grid dc-reveal-stagger">
          {INTEGRATIONS.items.map((i) => (
            <div className="dc-integration-card" key={i.title}>
              <span className="dc-integration-card__icon">{i.icon}</span>
              <h3>{i.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// INDUSTRIES — minimal definition-style cards
// ============================================================

function IndustriesSection() {
  return (
    <section className="section dc-industries" aria-labelledby="dc-industries-heading">
      <div className="container">
        <div className="section-heading dc-reveal">
          <p className="dc-eyebrow">Industries We Serve</p>
          <h2 id="dc-industries-heading">Salesforce Data Cloud Solutions Across Every Industry Vertical</h2>
        </div>
        <div className="dc-industries__grid dc-reveal-stagger">
          {INDUSTRIES.map((ind) => (
            <div className="dc-industry-card" key={ind.title}>
              <img src={ind.icon} alt="" loading="lazy" />
              <h3>{ind.title}</h3>
              <p>{ind.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// WHY MIRKETA + IMPLEMENTATION GANTT TIMELINE
// ============================================================

function WhyMirketaSection() {
  return (
    <section className="section dc-why" aria-labelledby="dc-why-heading">
      <div className="container">
        <div className="section-heading dc-reveal">
          <p className="dc-eyebrow">Why Mirketa</p>
          <h2 id="dc-why-heading">Why Choose Mirketa as Your Salesforce Data Cloud Consulting Partner</h2>
        </div>
        <div className="dc-why__grid dc-reveal-stagger">
          {WHY_MIRKETA.map((item) => (
            <div className="dc-why-card" key={item.title}>
              <img src={item.icon} alt="" loading="lazy" />
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
        <div className="dc-gantt dc-reveal">
          <h3>Sprint-Based Implementation Timeline</h3>
          <div className="dc-gantt__axis" aria-hidden="true">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i}>Wk {i * 4}</span>
            ))}
          </div>
          {IMPLEMENTATION_PHASES.map((phase) => (
            <div className="dc-gantt__row" key={phase.phase}>
              <div className="dc-gantt__label">
                <strong>{phase.phase}</strong>
                <span>{phase.title}</span>
              </div>
              <div className="dc-gantt__track">
                <div
                  className="dc-gantt__bar"
                  style={{ marginLeft: `${(phase.start / TIMELINE_TOTAL_WEEKS) * 100}%`, width: `${(phase.span / TIMELINE_TOTAL_WEEKS) * 100}%` }}
                >
                  {phase.weeks}
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
// CLIENT SUCCESS STORIES — testimonial carousel
// ============================================================

function useCarouselNav() {
  const swiperRef = useRef(null);
  const bindSwiper = (swiper) => {
    swiperRef.current = swiper;
  };
  const slidePrev = () => swiperRef.current?.slidePrev();
  const slideNext = () => swiperRef.current?.slideNext();
  const pauseAutoplay = () => swiperRef.current?.autoplay?.stop();
  const resumeAutoplay = () => swiperRef.current?.autoplay?.start();
  return { bindSwiper, slidePrev, slideNext, pauseAutoplay, resumeAutoplay };
}

function TestimonialsSection() {
  const { bindSwiper, slidePrev, slideNext, pauseAutoplay, resumeAutoplay } = useCarouselNav();
  const [isPlaying, setIsPlaying] = useState(true);

  const togglePlay = () => {
    if (isPlaying) {
      pauseAutoplay();
    } else {
      resumeAutoplay();
    }
    setIsPlaying((p) => !p);
  };

  return (
    <section
      className="section dc-testimonials"
      aria-labelledby="dc-testimonials-heading"
      onFocus={pauseAutoplay}
      onBlur={(e) => {
        if (isPlaying && !e.currentTarget.contains(e.relatedTarget)) resumeAutoplay();
      }}
    >
      <div className="container">
        <div className="dc-testimonials__header dc-reveal">
          <div className="section-heading dc-testimonials__heading">
            <p className="dc-eyebrow">Client Success Stories</p>
            <h2 id="dc-testimonials-heading">What Enterprises Say About Mirketa's Salesforce Data Cloud Implementations</h2>
          </div>
          <div className="dc-testimonials__nav">
            <button type="button" className="dc-testimonials__playpause" onClick={togglePlay} aria-label={isPlaying ? "Pause testimonial rotation" : "Resume testimonial rotation"} aria-pressed={!isPlaying}>
              {isPlaying ? "❚❚" : "▶"}
            </button>
            <button type="button" onClick={slidePrev} aria-label="Previous testimonials">‹</button>
            <button type="button" onClick={slideNext} aria-label="Next testimonials">›</button>
          </div>
        </div>
        <Swiper
          modules={[Autoplay]}
          loop
          grabCursor
          speed={700}
          autoplay={{ delay: 6000, disableOnInteraction: false, pauseOnMouseEnter: true }}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{ 900: { slidesPerView: 2 } }}
          onSwiper={bindSwiper}
          className="dc-testimonials__swiper"
        >
          {TESTIMONIALS.map((t) => (
            <SwiperSlide key={t.name}>
              <div className="dc-testimonial-card">
                <p>&ldquo;{t.quote}&rdquo;</p>
                <footer>{t.name}</footer>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

// ============================================================
// FAQ — accordion + live search (all answers present in the DOM,
// matching the visible FAQPage schema)
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
    <section className="section dc-faq" aria-labelledby="dc-faq-heading">
      <div className="container">
        <div className="section-heading dc-reveal">
          <p className="dc-eyebrow">FAQ</p>
          <h2 id="dc-faq-heading">Salesforce Data Cloud Consulting — Common Questions Answered</h2>
        </div>
        <div className="dc-faq__search-wrap dc-reveal">
          <label htmlFor="dc-faq-search" className="visually-hidden">
            Search frequently asked questions
          </label>
          <input
            id="dc-faq-search"
            type="search"
            className="dc-faq__search"
            placeholder="Ask a question — e.g. &quot;pricing&quot;, &quot;identity resolution&quot;, &quot;AI&quot;..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpenIndex(-1);
            }}
          />
        </div>
        <div className="dc-faq__list dc-reveal">
          {filtered.length === 0 ? (
            <p className="dc-faq__empty">No questions match &ldquo;{query}&rdquo;. Try a different search term.</p>
          ) : (
            filtered.map((item, i) => {
              const open = openIndex === i;
              const panelId = `dc-faq-panel-${i}`;
              return (
                <div className={`dc-faq-item ${open ? "is-open" : ""}`} key={item.q}>
                  <button type="button" className="dc-faq-item__question" aria-expanded={open} aria-controls={panelId} onClick={() => setOpenIndex(open ? -1 : i)}>
                    <span>{item.q}</span>
                    <span className="dc-faq-item__icon" aria-hidden="true">{open ? "−" : "+"}</span>
                  </button>
                  <div id={panelId} className="dc-faq-item__answer" role="region" hidden={!open}>
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
  const ripple = useRipple();
  return (
    <section className="dc-final-cta dc-reveal" aria-labelledby="dc-final-cta-heading">
      <div className="container dc-final-cta__inner">
        <h2 id="dc-final-cta-heading">{FINAL_CTA.heading}</h2>
        <p>{FINAL_CTA.description}</p>
        <a href={FINAL_CTA.cta.href} className="btn btn-primary dc-btn" onClick={ripple}>
          {FINAL_CTA.cta.label}
        </a>
        <div className="dc-final-cta__stats">
          {FINAL_CTA.stats.map((s) => (
            <div key={s.label}>
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
// CONTACT
// ============================================================

function ContactSection() {
  return <ConsultationSection {...CONTACT} />;
}
