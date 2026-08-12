import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Images } from "../../assets/images/index.js";
import Seo from "../../components/Seo/Seo.jsx";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb.jsx";
import ConsultationSection from "../../components/ConsultationSection/ConsultationSection.jsx";
import "./Agentforce.css";

const BREADCRUMB_ITEMS = [{ label: "Home", href: "/" }, { label: "Agentforce" }];

gsap.registerPlugin(ScrollTrigger);

// ============================================================
// DATA — content sourced verbatim from
// https://mirketa.com/agentforce/
// ============================================================

const HERO = {
  eyebrow: "Salesforce Agentforce Consulting",
  title: "Salesforce Agentforce Consulting & Autonomous AI Agent Implementation",
  description:
    "Deploy enterprise-grade autonomous AI agents automating customer support, sales workflows, marketing campaigns, and CRM operations 24/7 with measurable ROI.",
  primaryCta: { label: "Talk to an Agentforce Expert", href: "#contact" },
  secondaryCta: { label: "Explore Capabilities", href: "#capabilities" },
};

const HERO_METRICS = [
  { value: "98.5%", label: "Task Accuracy" },
  { value: "24/7", label: "Agent Uptime" },
  { value: "40%", label: "Cost Reduction" },
];

const OVERVIEW = {
  eyebrow: "What is Agentforce?",
  heading: "Beyond Chatbots. Beyond RPA.",
  description:
    "Agentforce is an enterprise AI agent platform built natively on the Salesforce platform. It uses the Atlas Reasoning Engine for context understanding, takes autonomous actions across systems, and continuously learns from outcomes — all powered by Salesforce Data Cloud and the Einstein Trust Layer, with native MuleSoft integrations.",
  ladder: [
    { label: "Chatbots", detail: "Scripted responses, no memory or actions", height: 34 },
    { label: "RPA", detail: "Rule-based automation, breaks on exceptions", height: 58 },
    { label: "Agentforce", detail: "Reasons, decides, acts, and learns autonomously", height: 100 },
  ],
};

const CAPABILITIES = [
  { icon: Images.iconCapabilityAgentforce, title: "Customizable AI Agents", description: "Role-specific agents for sales, service, marketing, HR" },
  { icon: Images.iconPillarConnectivity, title: "Seamless CRM Integration", description: "Real-time connections to Salesforce, ERPs, HRIS, data warehouses" },
  { icon: Images.iconCapabilitySlack, title: "Slack-Native Collaboration", description: "Direct Slack integration for workflow automation" },
  { icon: Images.iconProcessReasonPlan, title: "Atlas Reasoning Engine", description: "Multi-step problem-solving with data retrieval and citations" },
  { icon: Images.iconDimensionGovernance, title: "Einstein Trust Layer", description: "Enterprise security preventing data leakage to external LLMs" },
  { icon: Images.iconEinsteinPredictive, title: "Real-Time Analytics", description: "Performance tracking via dashboards and Tableau visualizations" },
];

const USE_CASES = [
  {
    title: "Autonomous Customer Support",
    stats: [
      { value: "62%", label: "Autonomous Resolution Rate" },
      { value: "−38%", label: "Avg. Handle Time" },
      { value: "4.8/5.0", label: "CSAT Score" },
      { value: "99.97%", label: "Agent Uptime" },
    ],
  },
  {
    title: "AI-Powered Sales Assistance",
    stats: [
      { value: "+45%", label: "Lead Qualification Speed" },
      { value: "+28%", label: "Pipeline Conversion Rate" },
      { value: "3.2 hrs/day", label: "Rep Admin Time Saved" },
      { value: "+52%", label: "Demo Booking Rate" },
    ],
  },
  {
    title: "Marketing Campaign Automation",
    stats: [
      { value: "−65%", label: "Campaign Launch Time" },
      { value: "+34%", label: "Email Open Rate Lift" },
      { value: "+22%", label: "Conversion Rate Improvement" },
      { value: "1,840", label: "Campaigns Automated / Quarter" },
    ],
  },
  {
    title: "Employee Onboarding (HRSD)",
    stats: [
      { value: "−30%", label: "Time-to-Productivity" },
      { value: "−45%", label: "HR Ticket Volume" },
      { value: "4.7/5.0", label: "New Hire Satisfaction" },
      { value: "99.2%", label: "Compliance Completion Rate" },
    ],
  },
  {
    title: "Personal Shopper Agent",
    stats: [
      { value: "+38%", label: "Cart Recovery Rate" },
      { value: "+24%", label: "Avg. Order Value Increase" },
      { value: "58%", label: "Support Ticket Deflection" },
      { value: "+18%", label: "Customer Retention Lift" },
    ],
  },
  {
    title: "Sales Coach Agent",
    stats: [
      { value: "−35%", label: "Rep Ramp Time Reduction" },
      { value: "+22%", label: "Win Rate Improvement" },
      { value: "1,200", label: "Coaching Sessions Automated / Month" },
      { value: "4 hrs/wk", label: "Manager Time Saved" },
    ],
  },
];

const ARCHITECTURE_LAYERS = [
  {
    icon: Images.iconDimensionGovernance,
    title: "Einstein Trust Layer",
    description: "Data masking, zero LLM retention, audit trails, GDPR/HIPAA compliance, toxicity detection",
    size: "outer",
  },
  {
    icon: Images.iconProcessReasonPlan,
    title: "Atlas Reasoning Engine",
    description: "Multi-step reasoning, Data Cloud retrieval, action planning, inline citations, contextual memory",
    size: "middle",
  },
  {
    icon: Images.iconAgentActions,
    title: "Agent Actions Layer",
    description: "Salesforce APIs, MuleSoft connectors, Slack integration, Flow automation, REST/SOAP APIs",
    size: "inner",
  },
];

const INDUSTRIES = [
  { icon: Images.iconIndustryFinancialServices, title: "Financial Services", metric: "+35% CSAT" },
  { icon: Images.iconIndustryHealthcare, title: "Healthcare", metric: "−40% Admin Burden" },
  { icon: Images.iconIndustryEcommerce, title: "Retail & E-Commerce", metric: "+28% AOV Lift" },
  { icon: Images.iconIndustryEducation, title: "Education", metric: "+50% Self-Serve Rate" },
  { icon: Images.iconIndustryManufacturing, title: "Manufacturing", metric: "−25% Response Time" },
  { icon: Images.iconIndustryNonprofits, title: "Nonprofits", metric: "+42% Donor Retention" },
  { icon: Images.iconIndustryWholesale, title: "Wholesale & Distribution", metric: "−30% Order Errors" },
];

const WHY_MIRKETA = [
  { icon: Images.iconCapabilityAgentforce, title: "Certified Salesforce Agentforce & AI Partner", description: "150+ active certifications across our consulting team" },
  { icon: Images.iconOptimize, title: "Tailored Solutions", description: "Built around your workflows, versus generic templates" },
  { icon: Images.iconCheckCircle, title: "End-to-End Implementation", description: "Full delivery with a 60-day hypercare period" },
  { icon: Images.iconAgentTypeOrchestrator, title: "Proven at Scale", description: "200+ enterprise deployments across sectors" },
];

const COMPANY_STATS = [
  { value: 200, suffix: "+", label: "Enterprise Clients" },
  { value: 15, suffix: "+", label: "Years Salesforce Experience" },
  { value: 500, suffix: "+", label: "Projects Delivered" },
  { value: 60, suffix: "-Day", label: "Hypercare Warranty" },
];

const ENGAGEMENT_MODELS = [
  {
    tier: Images.iconTierQuickwins,
    name: "Starter",
    tagline: "Agentforce Discovery & Pilot",
    duration: "4–6 weeks",
    features: ["AI readiness assessment", "Use case prioritization", "1 production-ready agent", "30-day hypercare"],
    highlight: false,
  },
  {
    tier: Images.iconTierStrategic,
    name: "Programme",
    tagline: "Implementation",
    duration: "10–16 weeks",
    features: ["Multi-agent architecture", "Data Cloud integration", "3–8 production agents", "60-day hypercare"],
    highlight: true,
    badge: "Most Popular",
  },
  {
    tier: Images.iconTierFuture,
    name: "Enterprise",
    tagline: "Managed Services",
    duration: "Ongoing",
    features: ["Dedicated success team", "Continuous optimization", "Monthly new use case development", "4-hour response SLA"],
    highlight: false,
  },
];

const TIMELINE = {
  heading: "Typical time-to-value for first production Agentforce agent deployment: 4–6 wk",
  stages: [
    { label: "Pilot Implementation", weeks: "4–6 weeks" },
    { label: "Full Programme", weeks: "10–16 weeks" },
  ],
};

const FAQS = [
  { q: "What is Salesforce Agentforce and how does it work?", a: "Salesforce Agentforce is an enterprise AI agent platform built natively on the Salesforce platform. It enables businesses to deploy autonomous AI agents that use the Atlas Reasoning Engine to understand context, reason through complex multi-step problems, take actions across systems (CRM, ERP, HRIS, etc.), and continuously learn from outcomes — all within the Einstein Trust Layer's security and governance framework." },
  { q: "How does Agentforce differ from traditional Salesforce automation tools?", a: "Unlike Salesforce Flow, Process Builder, or Einstein Bots, Agentforce agents use the Atlas Reasoning Engine to handle ambiguous, complex, and multi-step situations that rule-based automation cannot address. Agentforce agents reason, decide, act, and learn — going far beyond predefined workflow automation to deliver truly autonomous AI-powered CRM operations." },
  { q: "What industries benefit most from Salesforce Agentforce?", a: "Agentforce delivers measurable ROI across financial services, healthcare, retail & e-commerce, manufacturing, education, nonprofits, wholesale distribution, and private equity. Any industry with high-volume customer interactions, complex multi-system workflows, or significant manual CRM data entry is an ideal candidate for Agentforce automation." },
  { q: "How long does an Agentforce implementation take?", a: "A standard Agentforce pilot implementation typically takes 4–6 weeks from kickoff to production go-live. A full multi-agent programme with Data Cloud integration and MuleSoft connectivity typically takes 10–16 weeks. Mirketa's sprint-based delivery model enables faster time-to-value with production-ready agents deployed in iterative 2-week sprints." },
  { q: "What is the Einstein Trust Layer and why does it matter?", a: "The Einstein Trust Layer is Salesforce's built-in AI security and governance framework that makes Agentforce enterprise-safe. It ensures all AI agent actions comply with data privacy policies (GDPR, HIPAA, CCPA), prevents sensitive data from being sent to external LLMs, provides complete audit trails of all agent actions, detects and blocks toxic or harmful content, and enforces role-based access controls." },
  { q: "Can Agentforce integrate with non-Salesforce systems like SAP or Workday?", a: "Yes. Agentforce agents can connect to any external system via Salesforce APIs, MuleSoft Anypoint Platform connectors, or custom REST/SOAP integrations. This includes ERP systems (SAP, Oracle, NetSuite), HRIS platforms (Workday, SuccessFactors, Oracle HCM), marketing tools, data warehouses, and legacy systems — enabling truly unified enterprise AI automation." },
  { q: "What is the Atlas Reasoning Engine in Agentforce?", a: "The Atlas Reasoning Engine is the core AI intelligence framework powering Agentforce. It enables agents to perform complex multi-step problem-solving, evaluate multiple solution paths, retrieve relevant data from Salesforce Data Cloud, generate accurate responses with inline citations, and continuously learn from feedback — making Agentforce agents significantly more capable than traditional chatbots or RPA tools." },
  { q: "How does Mirketa support Agentforce after go-live?", a: "Mirketa provides comprehensive post-deployment Agentforce managed services including: 60-day hypercare period with daily monitoring, agent performance analytics and KPI reporting, continuous model tuning and prompt library updates, new use case development on a monthly cadence, integration maintenance, quarterly business reviews, and priority SLA support ensuring your AI agents continuously improve and deliver increasing ROI." },
  { q: "What does a Mirketa Agentforce consulting engagement include?", a: "A Mirketa Agentforce engagement includes: AI readiness assessment, use case prioritisation workshop with ROI modelling, agent design & persona definition, Salesforce Data Cloud and knowledge base setup, agent build & unit testing, UAT with business stakeholders, go-live support, and a 60-day hypercare period with performance optimisation. We also provide change management support and end-user training." },
  { q: "Do I need Salesforce Data Cloud to use Agentforce?", a: "Salesforce Data Cloud significantly enhances Agentforce capabilities by providing agents with unified customer data for more personalised and accurate responses. However, Agentforce can be deployed without Data Cloud using existing Salesforce CRM data, knowledge articles, and external API connections. Mirketa will assess your current data architecture and recommend the optimal configuration for your use cases and budget." },
];

const SEO = {
  title: "Salesforce Agentforce Consulting Services | Mirketa",
  description:
    "Deploy enterprise-grade autonomous AI agents on Salesforce Agentforce. Automate support, sales, and CRM operations 24/7 with measurable ROI in weeks.",
  canonical: "https://www.mirketa.com/agentforce/",
  keywords: [
    "Salesforce Agentforce Consulting",
    "Agentforce Implementation",
    "Autonomous AI Agents",
    "Atlas Reasoning Engine",
    "Einstein Trust Layer",
    "Salesforce AI Agents",
    "Agentforce Development",
    "Agentic AI CRM",
    "Salesforce Agentforce consulting company",
    "autonomous AI agent implementation partner",
    "Agentforce implementation services for enterprises",
    "Salesforce Agentforce pilot to production",
  ],
  schema: [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "Salesforce Agentforce Consulting",
      provider: { "@type": "Organization", name: "Mirketa Inc.", url: "https://www.mirketa.com" },
      name: "Salesforce Agentforce Consulting & Implementation",
      description:
        "Deploys enterprise-grade autonomous AI agents on the Salesforce Agentforce platform, automating customer support, sales, marketing, and CRM operations 24/7.",
      areaServed: "Global",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.mirketa.com/" },
        { "@type": "ListItem", position: 2, name: "Agentforce", item: "https://www.mirketa.com/agentforce/" },
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
  eyebrow: "Get Started",
  heading: "Talk to a Salesforce Agentforce Expert",
  benefits: ["Certified Salesforce AI Specialists", "Proven AI Agent Delivery Methodology", "60-Day Post-Deployment Hypercare", "200+ Enterprise Clients Served"],
};

const CONSULTATION = {
  eyebrow: "Get Started",
  heading: "Schedule an Agentforce Consultation",
  description: "Tell us about your workflows and goals. We'll map your highest-ROI Agentforce use cases.",
  benefits: FINAL_CTA.benefits,
  formTitle: "Request a Free Agentforce Consultation",
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

const cssUrl = (src) => `url("${src}")`;

// ============================================================
// MAIN COMPONENT
// ============================================================

export default function Agentforce() {
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

      gsap.utils.toArray(".af-reveal").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 32,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      gsap.utils.toArray(".af-reveal-stagger").forEach((el) => {
        gsap.from(el.children, {
          opacity: 0,
          y: 26,
          duration: 0.6,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      gsap.utils.toArray(".af-zoom-in").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          scale: 0.9,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="agentforce">
      <Seo {...SEO} />
      <HeroSection heroTextRef={heroTextRef} />
      <OverviewSection />
      <CapabilitiesSection />
      <UseCasesSection />
      <ArchitectureSection />
      <IndustriesSection />
      <WhyMirketaSection />
      <EngagementSection />
      <FaqSection />
      <FinalCtaSection />
      <ContactSection />
    </div>
  );
}

// ============================================================
// HERO — pulse/radar core background + live-status metric bar
// ============================================================

function HeroSection({ heroTextRef }) {
  return (
    <section className="af-hero" style={{ backgroundImage: cssUrl(Images.heroAgentforce) }} aria-label="Salesforce Agentforce Consulting">
      <div className="af-hero__scrim" />
      <div className="container">
        <Breadcrumb items={BREADCRUMB_ITEMS} className="af-breadcrumb" />
      </div>
      <div className="container af-hero__inner">
        <div ref={heroTextRef} className="af-hero__text">
          <p className="af-eyebrow">{HERO.eyebrow}</p>
          <h1>{HERO.title}</h1>
          <p className="af-hero__description">{HERO.description}</p>
          <div className="af-hero__ctas">
            <a href={HERO.primaryCta.href} className="btn btn-primary af-btn">
              {HERO.primaryCta.label} <span aria-hidden="true">→</span>
            </a>
            <a href={HERO.secondaryCta.href} className="btn btn-secondary af-btn">
              {HERO.secondaryCta.label}
            </a>
          </div>
        </div>
        <div className="af-status-bar af-reveal-stagger">
          {HERO_METRICS.map((m) => (
            <div className="af-status-chip" key={m.label}>
              <span className="af-status-chip__dot" aria-hidden="true" />
              <div>
                <strong>{m.value}</strong>
                <span>{m.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button
        type="button"
        className="af-scroll-indicator"
        onClick={() => document.getElementById("capabilities")?.scrollIntoView({ behavior: "smooth" })}
        aria-label="Scroll to core capabilities"
      >
        <span />
      </button>
    </section>
  );
}

// ============================================================
// WHAT IS AGENTFORCE — evolution ladder
// ============================================================

function OverviewSection() {
  return (
    <section className="section af-overview" aria-labelledby="af-overview-heading">
      <div className="container af-overview__grid">
        <div className="af-overview__content">
          <p className="af-eyebrow">{OVERVIEW.eyebrow}</p>
          <h2 id="af-overview-heading">{OVERVIEW.heading}</h2>
          <p>{OVERVIEW.description}</p>
        </div>
        <div className="af-ladder af-zoom-in" role="img" aria-label="Evolution from chatbots to RPA to Agentforce, with Agentforce shown as the most advanced">
          {OVERVIEW.ladder.map((step, i) => (
            <div className={`af-ladder__step af-ladder__step--${i}`} key={step.label}>
              <div className="af-ladder__bar" style={{ height: `${step.height}%` }}>
                <span className="af-ladder__value">{step.label}</span>
              </div>
              <p>{step.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// CORE PLATFORM CAPABILITIES — hexagon honeycomb grid
// ============================================================

function CapabilitiesSection() {
  return (
    <section className="section af-capabilities" id="capabilities" aria-labelledby="af-capabilities-heading">
      <div className="container">
        <div className="af-capabilities__head af-reveal">
          <div className="section-heading">
            <p className="af-eyebrow">Core Platform Capabilities</p>
            <h2 id="af-capabilities-heading">Six Pillars of the Agentforce Platform</h2>
          </div>
          <img src={Images.illoAgentforceActionConsole} alt="" aria-hidden="true" className="af-capabilities__illo" loading="lazy" />
        </div>
        <div className="af-hive af-reveal-stagger">
          {CAPABILITIES.map((cap) => (
            <div className="af-hex" key={cap.title}>
              <div className="af-hex__inner">
                <img src={cap.icon} alt="" loading="lazy" />
                <h3>{cap.title}</h3>
                <p>{cap.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// USE CASES — KPI scorecards
// ============================================================

function UseCasesSection() {
  return (
    <section className="section af-use-cases" aria-labelledby="af-use-cases-heading">
      <div className="container">
        <div className="section-heading af-reveal">
          <p className="af-eyebrow">Use Cases & Performance Metrics</p>
          <h2 id="af-use-cases-heading">Agentforce in Action Across the Enterprise</h2>
        </div>
        <div className="af-scorecards af-reveal-stagger">
          {USE_CASES.map((uc) => (
            <div className="af-scorecard" key={uc.title}>
              <h3>{uc.title}</h3>
              <div className="af-scorecard__grid">
                {uc.stats.map((s) => (
                  <div className="af-scorecard__stat" key={s.label}>
                    <strong>{s.value}</strong>
                    <span>{s.label}</span>
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
// TECHNICAL ARCHITECTURE — nested concentric layers
// ============================================================

function ArchitectureSection() {
  return (
    <section className="section af-architecture" aria-labelledby="af-architecture-heading">
      <div className="container">
        <div className="section-heading af-reveal">
          <p className="af-eyebrow">Technical Architecture</p>
          <h2 id="af-architecture-heading">Three Integrated Layers of Trust, Reasoning, and Action</h2>
        </div>
        <div className="af-nest af-zoom-in">
          {ARCHITECTURE_LAYERS.map((layer) => (
            <div className={`af-nest__layer af-nest__layer--${layer.size}`} key={layer.title}>
              <div className="af-nest__content">
                <img src={layer.icon} alt="" loading="lazy" />
                <h3>{layer.title}</h3>
                <p>{layer.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// INDUSTRIES — dense stat-chip grid
// ============================================================

function IndustriesSection() {
  return (
    <section className="section af-industries" aria-labelledby="af-industries-heading">
      <div className="container">
        <div className="section-heading af-reveal">
          <p className="af-eyebrow">Industries Served</p>
          <h2 id="af-industries-heading">Measurable ROI Across Every Vertical</h2>
        </div>
        <div className="af-industry-ticker af-reveal-stagger">
          {INDUSTRIES.map((ind) => (
            <div className="af-industry-chip" key={ind.title}>
              <img src={ind.icon} alt="" loading="lazy" />
              <div>
                <h3>{ind.title}</h3>
                <span>{ind.metric}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// WHY CHOOSE MIRKETA + COMPANY STATS
// ============================================================

function StatTile({ metric }) {
  const [ref, inView] = useInView(0.5);
  const count = useCountUp(metric.value, inView);
  return (
    <div ref={ref} className="af-stat">
      <div className="af-stat__value">
        {count}
        {metric.suffix}
      </div>
      <p>{metric.label}</p>
    </div>
  );
}

function WhyMirketaSection() {
  return (
    <section className="section af-why" aria-labelledby="af-why-heading">
      <div className="container">
        <div className="section-heading af-reveal">
          <p className="af-eyebrow">Why Choose Mirketa</p>
          <h2 id="af-why-heading">Your Salesforce Agentforce Implementation Partner</h2>
        </div>
        <div className="af-why__grid af-reveal-stagger">
          {WHY_MIRKETA.map((item) => (
            <div className="af-why-card" key={item.title}>
              <img src={item.icon} alt="" loading="lazy" />
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
        <div className="af-company-stats af-reveal-stagger">
          {COMPANY_STATS.map((s) => (
            <StatTile key={s.label} metric={s} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// ENGAGEMENT MODELS — pricing-tier cards
// ============================================================

function EngagementSection() {
  return (
    <section className="section af-engagement" aria-labelledby="af-engagement-heading">
      <div className="container">
        <div className="section-heading af-reveal">
          <p className="af-eyebrow">Engagement Models</p>
          <h2 id="af-engagement-heading">Choose the Right Path to Production</h2>
        </div>
        <div className="af-tiers af-reveal-stagger">
          {ENGAGEMENT_MODELS.map((tier) => (
            <div className={`af-tier ${tier.highlight ? "is-highlighted" : ""}`} key={tier.name}>
              {tier.badge && <span className="af-tier__badge">{tier.badge}</span>}
              <img src={tier.tier} alt="" className="af-tier__icon" loading="lazy" />
              <h3>{tier.name}</h3>
              <p className="af-tier__tagline">{tier.tagline}</p>
              <span className="af-tier__duration">{tier.duration}</span>
              <ul>
                {tier.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="af-timeline af-reveal">
          <p className="af-timeline__heading">{TIMELINE.heading}</p>
          <div className="af-timeline__bars">
            {TIMELINE.stages.map((stage) => (
              <div className="af-timeline__stage" key={stage.label}>
                <span className="af-timeline__label">{stage.label}</span>
                <span className="af-timeline__weeks">{stage.weeks}</span>
              </div>
            ))}
          </div>
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
    <section className="section af-faq" aria-labelledby="af-faq-heading">
      <div className="container">
        <div className="section-heading af-reveal">
          <p className="af-eyebrow">FAQ</p>
          <h2 id="af-faq-heading">Frequently Asked Questions</h2>
        </div>
        <div className="af-faq__search-wrap af-reveal">
          <label htmlFor="af-faq-search" className="visually-hidden">
            Search frequently asked questions
          </label>
          <input
            id="af-faq-search"
            type="search"
            className="af-faq__search"
            placeholder="Ask a question — e.g. &quot;Data Cloud&quot;, &quot;implementation time&quot;, &quot;security&quot;..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpenIndex(-1);
            }}
          />
        </div>
        <div className="af-faq__list af-reveal">
          {filtered.length === 0 ? (
            <p className="af-faq__empty">No questions match &ldquo;{query}&rdquo;. Try a different search term.</p>
          ) : (
            filtered.map((item, i) => {
              const open = openIndex === i;
              const panelId = `af-faq-panel-${i}`;
              return (
                <div className={`af-faq-item ${open ? "is-open" : ""}`} key={item.q}>
                  <button type="button" className="af-faq-item__question" aria-expanded={open} aria-controls={panelId} onClick={() => setOpenIndex(open ? -1 : i)}>
                    <span>{item.q}</span>
                    <span className="af-faq-item__icon" aria-hidden="true">{open ? "−" : "+"}</span>
                  </button>
                  <div id={panelId} className="af-faq-item__answer" role="region" hidden={!open}>
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
    <section className="af-final-cta af-reveal" aria-labelledby="af-final-cta-heading">
      <div className="container af-final-cta__inner">
        <p className="af-eyebrow">{FINAL_CTA.eyebrow}</p>
        <h2 id="af-final-cta-heading">{FINAL_CTA.heading}</h2>
        <ul className="af-final-cta__benefits">
          {FINAL_CTA.benefits.map((b) => (
            <li key={b}>
              <img src={Images.iconCheckCircle} alt="" aria-hidden="true" />
              {b}
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
