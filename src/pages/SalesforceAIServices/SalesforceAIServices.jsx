import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Images } from "../../assets/images/index.js";
import Seo from "../../components/Seo/Seo.jsx";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb.jsx";
import ConsultationSection from "../../components/ConsultationSection/ConsultationSection.jsx";
import "./SalesforceAIServices.css";

const BREADCRUMB_ITEMS = [{ label: "Home", href: "/" }, { label: "Salesforce AI Services & CRM Solutions" }];

gsap.registerPlugin(ScrollTrigger);

// ============================================================
// DATA — content sourced verbatim from
// https://mirketa.com/salesforce-ai-services/
// ============================================================

const HERO = {
  title: "Your Competitors Are Already Using Salesforce AI. Are You?",
  description:
    "Mirketa's certified Salesforce AI team deploys Einstein AI, Agentforce, and intelligent automation that cuts costs, accelerates sales, and delivers measurable ROI in weeks, not months.",
  primaryCta: { label: "Talk to an AI Expert", href: "#contact" },
  secondaryCta: { label: "Explore Capabilities", href: "#services" },
};

const KEY_METRICS = [
  { value: 100, suffix: "+", label: "Enterprise Clients" },
  { value: 2, suffix: "M+", label: "Hours Cloud Delivered" },
  { value: 1000, suffix: "+", label: "Projects Completed" },
  { value: 9.6, suffix: "", decimals: 1, label: "CSAT Score" },
];

const CREDENTIALS = [
  "Salesforce Crest Partner Since 2013",
  "Master: Healthcare & Life Sciences",
  "Everest Group PEAK Matrix® 2025",
  "Fortune 500 & Emerging Enterprise Clients",
  "Einstein Trust Layer Certified",
];

const SERVICES = [
  {
    icon: Images.iconCapabilityAgentforce,
    title: "Agentforce Implementation",
    features: [
      "Custom agent design for your workflows",
      "Multi-agent orchestration and handoffs",
      "Integration with Data Cloud for grounded AI",
      "Einstein Trust Layer compliance built-in",
    ],
  },
  {
    icon: Images.iconEinsteinPredictive,
    title: "Einstein AI & Predictive Analytics",
    features: [
      "Einstein Lead & Opportunity Scoring",
      "Revenue forecasting with AI confidence",
      "Next-best-action recommendations",
      "Churn prediction and retention alerts",
    ],
  },
  {
    icon: Images.iconEinsteinBots,
    title: "Einstein Bots & Conversational AI",
    features: [
      "24/7 automated customer support",
      "Multilingual bot capabilities",
      "Seamless live-agent handoff with context",
      "Deployable on web, WhatsApp, SMS, Slack",
    ],
  },
  {
    icon: Images.iconEinsteinCopilot,
    title: "Einstein Copilot & Generative AI",
    features: [
      "AI-generated email and proposal drafts",
      "Case and call summarization",
      "Natural language CRM queries",
      "Custom Copilot actions for your workflows",
    ],
  },
  {
    icon: Images.iconServiceDataCloud,
    title: "Salesforce Data Cloud & AI",
    features: [
      "Real-time unified customer profiles",
      "Third-party data harmonization",
      "AI-ready data models and pipelines",
      "Segment activation across clouds",
    ],
  },
  {
    icon: Images.serviceReadinessAssessment,
    title: "AI Strategy & Roadmap Consulting",
    features: [
      "AI readiness assessment (2-week sprint)",
      "Use case prioritization by ROI potential",
      "Phased implementation roadmap",
      "Change management and training plan",
    ],
  },
];

const RESULTS = [
  { value: "40%", label: "Reduction in Support Ticket Volume", description: "Einstein Bots and Agentforce resolve Tier-1 issues automatically, freeing agents for complex cases." },
  { value: "3×", label: "Faster Lead Response Time", description: "AI-powered lead scoring and automated follow-up sequences ensure no opportunity goes cold." },
  { value: "60%", label: "Improvement in Forecast Accuracy", description: "Einstein Forecasting uses AI to eliminate gut-feel guessing and deliver data-driven revenue predictions." },
  { value: "25%", label: "Increase in Agent Productivity", description: "Einstein Copilot handles drafting, summarization, and data entry so agents focus on relationships." },
];

const METHODOLOGY = [
  { phase: "Assessment", description: "Evaluate current Salesforce environment, data quality, and highest-ROI AI use cases." },
  { phase: "Architecture", description: "Design the agent, data, and governance architecture tailored to your workflows." },
  { phase: "Build", description: "Configure and develop Einstein, Agentforce, and Data Cloud in iterative sprints." },
  { phase: "Launch", description: "Deploy to production with training, change management, and live monitoring." },
];

const INDUSTRIES = [
  {
    icon: Images.iconIndustryHealthcare,
    title: "Healthcare & Life Sciences",
    items: ["AI-driven patient no-show prediction", "Automated appointment scheduling & reminders", "Personalized patient engagement & care plans", "HIPAA-compliant AI on Salesforce Health Cloud"],
  },
  {
    icon: Images.iconIndustryFinancialServices,
    title: "Financial Services",
    items: ["Fraud detection and risk scoring with Einstein", "AI-assisted underwriting decisions", "Customer sentiment monitoring in service", "Automated KYC and compliance workflows"],
  },
  {
    icon: Images.iconIndustryEcommerce,
    title: "E-Commerce & Retail",
    items: ["AI product recommendation engines", "Conversational shopping assistants", "Smart cart abandonment recovery", "Predictive inventory and demand forecasting"],
  },
  {
    icon: Images.iconIndustryManufacturing,
    title: "Manufacturing",
    items: ["Predictive maintenance with IoT + AI", "Smart service dispatch and field optimization", "AI-assisted inventory control", "Dealer and channel partner AI enablement"],
  },
  {
    icon: Images.iconIndustryHitech,
    title: "Hi-Tech & SaaS",
    items: ["AI-powered churn prediction and prevention", "Automated renewal and cross-sell workflows", "Tier-1 support automation with Agentforce", "Product usage analytics and health scoring"],
  },
  {
    icon: Images.iconIndustryEducation,
    title: "Education",
    items: ["AI-driven student engagement and retention", "Chatbots for admissions and course selection", "Predictive dropout prevention analytics", "Personalized learning journey automation"],
  },
  {
    icon: Images.iconIndustryNonprofits,
    title: "Nonprofits",
    items: ["Personalized donor journey automation", "AI-powered fundraising campaign optimization", "Volunteer management and support bots", "Grant tracking and reporting automation"],
  },
  {
    icon: Images.iconIndustryWholesale,
    title: "Wholesale & Distribution",
    items: ["Intelligent order tracking and replenishment", "Predictive demand forecasting", "Customer service automation at scale", "AI-driven pricing optimization"],
  },
  {
    icon: Images.iconIndustryPrivateEquity,
    title: "Private Equity & Finance",
    items: ["Portfolio company data analysis and reporting", "AI-driven deal pipeline optimization", "Investor communication automation", "Due diligence AI acceleration"],
  },
];

const TECH_STACK = {
  core: {
    title: "Core Salesforce AI Platform",
    items: [
      { name: "Salesforce Einstein Platform", description: "Native AI for predictions, recommendations, and automation" },
      { name: "Agentforce", description: "Autonomous AI agents for any business function" },
      { name: "Einstein Copilot Studio", description: "Build and customize AI assistants with natural language" },
      { name: "Salesforce Data Cloud", description: "Real-time unified customer data for AI grounding" },
      { name: "Einstein Trust Layer", description: "Secure, compliant, and auditable AI applications" },
    ],
  },
  extended: {
    title: "Extended Integrations & Tools",
    items: [
      { name: "MuleSoft", description: "API connectivity and data harmonization across systems" },
      { name: "Heroku", description: "Custom AI models, microservices, and app extensions" },
      { name: "Slack AI Integration", description: "Drive agent collaboration and AI-powered workflows in Slack" },
      { name: "Lightning Web Components (LWC)", description: "Dynamic, AI-enhanced UI components for Salesforce" },
      { name: "Einstein Conversation Mining", description: "Analyze chat and call data to identify automation opportunities" },
    ],
  },
};

const PRODUCTS = [
  { icon: Images.productElixir, name: "Elixir", tagline: "AI-Powered Healthcare EHR", description: "Salesforce-native Electronic Health Record with AI-driven patient engagement, no-show prediction, and HIPAA-compliant care coordination." },
  { icon: Images.productEcourier, name: "eCourier", tagline: "Automated Report Scheduler", description: "Schedule, customize, and auto-deliver Salesforce reports and dashboards to any stakeholder — no manual exports required." },
  { icon: Images.productFinacast, name: "Finacast", tagline: "AI Revenue Forecasting", description: "AI-powered financial forecasting built on Salesforce, delivering accurate revenue predictions with scenario modeling and variance analysis." },
  { icon: Images.productRrd, name: "Round Robin Distributor", tagline: "Smart Lead & Case Assignment", description: "Smart, rule-based lead and case assignment engine that ensures fair distribution, skills-based routing, and workload balancing." },
  { icon: Images.productDuplicateSearchMerge, name: "Duplicate Search & Merge", tagline: "Clean, AI-Ready Data", description: "Keep your Salesforce data clean and AI-ready with intelligent duplicate detection, matching rules, and one-click merge capabilities." },
];

const WHY_MIRKETA = [
  { icon: Images.iconCapabilityAgentforce, title: "Salesforce Crest Partner", description: "Top-tier partner status with 13+ years of Salesforce expertise" },
  { icon: Images.iconAgentTypeOrchestrator, title: "Dedicated AI Teams", description: "Specialized AI architects and industry solution experts" },
  { icon: Images.iconOptimize, title: "Rapid Time-to-Value", description: "Prebuilt accelerators and frameworks cut deployment time by 40%" },
  { icon: Images.iconTierFuture, title: "Flexible Delivery Models", description: "Fixed scope, Agile pods, or staff augmentation — your choice" },
  { icon: Images.iconCheckCircle, title: "Fortune 500 Proven", description: "Trusted by global enterprises and high-growth companies alike" },
  { icon: Images.iconDimensionGovernance, title: "Regulated Industry Experts", description: "Deep expertise in healthcare, financial services, and education compliance" },
];

const TESTIMONIAL = {
  quote:
    "Mirketa delivered a highly effective Agentforce solution that transformed how we manage support operations. In just a few months, we experienced improved efficiency, reduced ticket volume, and better visibility across workflows. Their expertise in healthcare made all the difference.",
  attribution: "Michael Reynolds",
  badges: ["Crest Partner", "Master: Healthcare", "Everest Group 2025", "Pledge 1%", "Best Workplaces"],
};

const INSIGHTS = [
  { tag: "Guide", title: "The Complete Guide to Agentforce Implementation: What to Expect in 2025", description: "A step-by-step breakdown of planning, deploying, and optimizing Agentforce for enterprise use cases with real-world lessons from our implementations." },
  { tag: "Case Study", title: "How a Healthcare Network Reduced No-Shows by 31% with Einstein AI", description: "Discover how Mirketa deployed predictive AI on Salesforce Health Cloud to transform patient engagement and operational efficiency for a multi-site healthcare provider." },
  { tag: "Webinar", title: "AI for Nonprofits: Practical Use Cases, Tools & Implementation Strategies", description: "Watch our on-demand webinar exploring how nonprofits are using Salesforce AI to personalize donor journeys, automate outreach, and maximize mission impact." },
];

const FAQS = [
  { q: "What is the difference between Agentforce and Einstein AI?", a: "Einstein AI refers to Salesforce's suite of predictive and generative AI features built into the CRM — including lead scoring, opportunity insights, forecasting, and Einstein Copilot. Agentforce is Salesforce's autonomous AI agent platform that can take multi-step actions across systems without human intervention. Think of Einstein AI as intelligence embedded in your CRM, and Agentforce as AI that can act on your behalf. Mirketa implements both, often together, to maximize automation and insight." },
  { q: "How long does a Salesforce AI implementation typically take?", a: "Implementation timelines vary by scope and complexity. A focused Einstein Bot or Einstein Scoring deployment can go live in 4–6 weeks. A full Agentforce implementation with Data Cloud integration typically takes 8–12 weeks. Our AI Readiness Assessment (2 weeks) defines the exact scope, timeline, and resource requirements before any build begins, so you always know what to expect." },
  { q: "Do I need Salesforce Data Cloud to use Agentforce?", a: "Data Cloud is not strictly required to deploy Agentforce, but it significantly enhances agent performance by providing a unified, real-time customer profile that grounds AI decisions in accurate data. For organizations with complex, multi-system data environments, we strongly recommend implementing Data Cloud alongside Agentforce to achieve the best outcomes. Mirketa can assess your specific data architecture and recommend the right approach." },
  { q: "Is Salesforce AI compliant with HIPAA and financial regulations?", a: "Yes. Salesforce's Einstein Trust Layer is specifically designed to ensure that AI interactions are secure, compliant, and auditable. It prevents sensitive data from leaving the Salesforce ecosystem, masks PII before sending to LLMs, and provides full audit trails. Mirketa has deep expertise in HIPAA-compliant healthcare AI implementations and financial services regulatory requirements, ensuring your AI deployment meets all applicable standards." },
  { q: "What Salesforce licenses do I need for Einstein AI and Agentforce?", a: "Licensing requirements depend on the specific AI features you want to activate. Some Einstein features are included in existing Sales Cloud and Service Cloud licenses, while Einstein Copilot, Agentforce, and Data Cloud require additional licensing. During our AI Readiness Assessment, Mirketa reviews your current licenses, identifies what's already available, and provides a clear picture of any additional investment required before you commit to a build." },
  { q: "How does Mirketa ensure successful user adoption of Salesforce AI?", a: "Technology alone doesn't drive adoption — people do. Every Mirketa engagement includes a change management and training plan tailored to your users. We conduct role-based training sessions, create custom documentation, establish AI champions within your organization, and provide post-launch support to ensure your teams actually use and benefit from the AI capabilities we deploy. Our 9.6 CSAT score reflects our commitment to outcomes, not just go-lives." },
  { q: "Can Mirketa integrate Salesforce AI with our existing non-Salesforce systems?", a: "Absolutely. Mirketa's MuleSoft-certified integration team specializes in connecting Salesforce AI with ERP systems (SAP, Oracle, NetSuite), marketing platforms, data warehouses, and custom applications. Agentforce can take actions across your entire technology stack — not just within Salesforce — making it a true enterprise AI layer when properly integrated." },
  { q: "What makes Mirketa different from other Salesforce AI partners?", a: "Three things set Mirketa apart: industry depth, proprietary accelerators, and an outcomes-first mindset. Our teams specialize in specific industries — healthcare, financial services, hi-tech — which means we understand your workflows, compliance requirements, and business drivers from day one. Our prebuilt accelerators reduce implementation time by up to 40%. And our success metrics are tied to your business outcomes, not just project milestones. That's why 100+ enterprises trust us with their Salesforce AI journey." },
];

const SEO = {
  title: "Salesforce AI Services & CRM Solutions | Mirketa",
  description:
    "Certified Salesforce AI team deploying Einstein AI, Agentforce, and intelligent automation. Cut costs and accelerate sales with measurable ROI in weeks.",
  canonical: "https://www.mirketa.com/salesforce-ai-services/",
  keywords: [
    "Salesforce AI Services",
    "Salesforce AI Consulting",
    "Einstein AI Implementation",
    "Salesforce CRM AI Solutions",
    "Predictive Analytics Salesforce",
    "Einstein Copilot",
    "Salesforce Data Cloud",
    "CRM AI Solutions",
    "Salesforce AI services and CRM solutions company",
    "Einstein AI and Agentforce implementation partner",
    "AI powered Salesforce CRM consulting",
    "Salesforce Crest Partner AI services",
  ],
  schema: [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "Salesforce AI Services",
      provider: { "@type": "Organization", name: "Mirketa Inc.", url: "https://www.mirketa.com" },
      name: "Salesforce AI Services & CRM Solutions",
      description:
        "Deploys Einstein AI, Agentforce, and intelligent automation across the Salesforce ecosystem, cutting costs and accelerating sales with measurable ROI.",
      areaServed: "Global",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.mirketa.com/" },
        { "@type": "ListItem", position: 2, name: "Salesforce AI Services", item: "https://www.mirketa.com/salesforce-ai-services/" },
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
  heading: "Ready to Transform Your Business with Salesforce AI?",
  description:
    "Your AI transformation starts with a conversation. Our Salesforce AI consultants will assess your current environment, identify your highest-ROI use cases, and outline a clear path to measurable outcomes at no cost.",
  points: ["No-obligation assessment", "Response within 24 hours", "Certified Salesforce AI experts"],
};

const CONSULTATION = {
  eyebrow: "Get Started",
  heading: "Schedule a Salesforce AI Consultation",
  description: "Tell us about your current Salesforce environment and goals. We'll assess your highest-ROI AI use cases at no cost.",
  benefits: FINAL_CTA.points,
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

const cssUrl = (src) => `url("${src}")`;

// ============================================================
// MAIN COMPONENT
// ============================================================

export default function SalesforceAIServices() {
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

      gsap.utils.toArray(".sf-reveal").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 32,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      gsap.utils.toArray(".sf-reveal-stagger").forEach((el) => {
        gsap.from(el.children, {
          opacity: 0,
          y: 26,
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
    <div className="salesforce-ai-services">
      <Seo {...SEO} />
      <HeroSection heroTextRef={heroTextRef} />
      <ServicesSection />
      <ResultsSection />
      <MethodologySection />
      <IndustriesSection />
      <TechnologySection />
      <ProductsSection />
      <WhyMirketaSection />
      <InsightsSection />
      <FaqSection />
      <FinalCtaSection />
      <ContactSection />
    </div>
  );
}

// ============================================================
// HERO — cloud dashboard constellation background
// ============================================================

function HeroSection({ heroTextRef }) {
  return (
    <section className="sf-hero" style={{ backgroundImage: cssUrl(Images.heroSalesforceAiServices) }} aria-label="Salesforce AI Services and CRM Solutions">
      <div className="sf-hero__scrim" />
      <div className="container">
        <Breadcrumb items={BREADCRUMB_ITEMS} className="sf-breadcrumb" />
      </div>
      <div className="container sf-hero__inner">
        <div ref={heroTextRef} className="sf-hero__text">
          <h1>{HERO.title}</h1>
          <p className="sf-hero__description">{HERO.description}</p>
          <div className="sf-hero__ctas">
            <a href={HERO.primaryCta.href} className="btn btn-primary sf-btn">
              {HERO.primaryCta.label} <span aria-hidden="true">→</span>
            </a>
            <a href={HERO.secondaryCta.href} className="btn btn-secondary sf-btn">
              {HERO.secondaryCta.label}
            </a>
          </div>
        </div>
        <div className="sf-hero__metrics sf-reveal-stagger">
          {KEY_METRICS.map((m) => (
            <MetricTile key={m.label} metric={m} />
          ))}
        </div>
        <ul className="sf-hero__credentials">
          {CREDENTIALS.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </div>
      <button
        type="button"
        className="sf-scroll-indicator"
        onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
        aria-label="Scroll to services"
      >
        <span />
      </button>
    </section>
  );
}

function MetricTile({ metric }) {
  const [ref, inView] = useInView(0.5);
  const count = useCountUp(metric.value, inView, 1400, metric.decimals || 0);

  return (
    <div ref={ref} className="sf-metric">
      <div className="sf-metric__value">
        {count}
        {metric.suffix}
      </div>
      <p className="sf-metric__label">{metric.label}</p>
    </div>
  );
}

// ============================================================
// SERVICES — console-style tab list + detail panel
// ============================================================

function ServicesSection() {
  const [active, setActive] = useState(0);
  const service = SERVICES[active];

  const handleKeyDown = (e, index) => {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    e.preventDefault();
    const dir = e.key === "ArrowDown" ? 1 : -1;
    const nextIndex = (index + dir + SERVICES.length) % SERVICES.length;
    setActive(nextIndex);
    document.getElementById(`sf-service-tab-${nextIndex}`)?.focus();
  };

  return (
    <section className="section sf-services" id="services" aria-labelledby="sf-services-heading">
      <div className="container">
        <div className="section-heading sf-reveal">
          <p className="sf-eyebrow">Our AI Services</p>
          <h2 id="sf-services-heading">End-to-End Salesforce AI Implementation</h2>
          <p>From autonomous AI agents to predictive analytics and intelligent automation, Mirketa delivers the full spectrum of Salesforce AI capabilities customized for your business, deployed with precision.</p>
        </div>
        <div className="sf-console">
          <div className="sf-console__list" role="tablist" aria-label="Select a service" aria-orientation="vertical">
            {SERVICES.map((svc, i) => (
              <button
                key={svc.title}
                id={`sf-service-tab-${i}`}
                role="tab"
                type="button"
                aria-selected={active === i}
                className={`sf-console__item ${active === i ? "is-active" : ""}`}
                onClick={() => setActive(i)}
                onKeyDown={(e) => handleKeyDown(e, i)}
              >
                <img src={svc.icon} alt="" loading="lazy" />
                <span>{svc.title}</span>
              </button>
            ))}
          </div>
          <div className="sf-console__panel" role="tabpanel">
            <img src={service.icon} alt="" className="sf-console__panel-icon" loading="lazy" />
            <h3>{service.title}</h3>
            <ul>
              {service.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// PROVEN RESULTS — Lightning-style KPI widget tiles
// ============================================================

function ResultsSection() {
  return (
    <section className="section sf-results" aria-labelledby="sf-results-heading">
      <div className="container">
        <div className="sf-results__head sf-reveal">
          <div className="section-heading">
            <p className="sf-eyebrow">Proven Results</p>
            <h2 id="sf-results-heading">Driving Real-World Results with Salesforce AI</h2>
            <p>These metrics reflect the transformative power of Salesforce AI across industries, moving beyond theoretical potential to proven operational success.</p>
          </div>
          <img src={Images.illoSalesforceAiInsightsDashboard} alt="" aria-hidden="true" className="sf-results__illo" loading="lazy" />
        </div>
        <div className="sf-widgets sf-reveal-stagger">
          {RESULTS.map((r) => (
            <div className="sf-widget" key={r.label}>
              <div className="sf-widget__titlebar">
                <span />
                <span />
                <span />
              </div>
              <div className="sf-widget__body">
                <div className="sf-widget__value">{r.value}</div>
                <h3>{r.label}</h3>
                <p>{r.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// METHODOLOGY — horizontal gradient rail with waypoints
// ============================================================

function MethodologySection() {
  return (
    <section className="section sf-methodology" id="approach" aria-labelledby="sf-methodology-heading">
      <div className="container">
        <div className="section-heading sf-reveal">
          <p className="sf-eyebrow">Our Methodology</p>
          <h2 id="sf-methodology-heading">From Assessment to Go-Live in as Few as 10 Weeks</h2>
          <p>Our proven 4-step delivery framework eliminates guesswork, accelerates time-to-value, and ensures your Salesforce AI investment delivers measurable business outcomes from day one.</p>
        </div>
        <div className="sf-rail sf-reveal-stagger">
          <div className="sf-rail__track" aria-hidden="true" />
          {METHODOLOGY.map((step, i) => (
            <div className="sf-rail__stop" key={step.phase}>
              <span className="sf-rail__marker">{i + 1}</span>
              <h3>{step.phase}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// INDUSTRIES — expandable grid cards
// ============================================================

function IndustryCard({ industry }) {
  const [open, setOpen] = useState(false);
  const panelId = `sf-industry-panel-${industry.title.replace(/\s+/g, "-")}`;

  return (
    <div className={`sf-industry-card ${open ? "is-open" : ""}`}>
      <button type="button" className="sf-industry-card__head" aria-expanded={open} aria-controls={panelId} onClick={() => setOpen((v) => !v)}>
        <img src={industry.icon} alt="" loading="lazy" />
        <span>{industry.title}</span>
        <span className="sf-industry-card__toggle" aria-hidden="true">{open ? "−" : "+"}</span>
      </button>
      <div id={panelId} className="sf-industry-card__body" hidden={!open}>
        <ul>
          {industry.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function IndustriesSection() {
  return (
    <section className="section sf-industries" aria-labelledby="sf-industries-heading">
      <div className="container">
        <div className="section-heading sf-reveal">
          <p className="sf-eyebrow">Industries Served</p>
          <h2 id="sf-industries-heading">Salesforce AI Solutions Tailored to Your Industry</h2>
          <p>Every industry has unique workflows, compliance requirements, and customer dynamics. Mirketa's industry-specialized teams deliver AI solutions that fit your world, not a generic template.</p>
        </div>
        <div className="sf-industries__grid sf-reveal-stagger">
          {INDUSTRIES.map((ind) => (
            <IndustryCard key={ind.title} industry={ind} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// TECHNOLOGY STACK — two-column spec list
// ============================================================

function TechColumn({ category }) {
  return (
    <div className="sf-tech-column">
      <h3>{category.title}</h3>
      <ul>
        {category.items.map((item) => (
          <li key={item.name}>
            <span className="sf-tech-column__dot" aria-hidden="true" />
            <div>
              <strong>{item.name}</strong>
              <p>{item.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function TechnologySection() {
  return (
    <section className="section sf-technology" aria-labelledby="sf-technology-heading">
      <div className="container">
        <div className="section-heading sf-reveal">
          <p className="sf-eyebrow">Technology Stack</p>
          <h2 id="sf-technology-heading">Built on a Modern, Secure, and Scalable AI Stack</h2>
          <p>Every Mirketa Salesforce AI solution is architected for performance, compliance, and future-readiness using the most advanced tools in the Salesforce ecosystem and beyond.</p>
        </div>
        <div className="sf-tech-grid sf-reveal">
          <TechColumn category={TECH_STACK.core} />
          <div className="sf-tech-divider" aria-hidden="true" />
          <TechColumn category={TECH_STACK.extended} />
        </div>
      </div>
    </section>
  );
}

// ============================================================
// PROPRIETARY PRODUCTS
// ============================================================

function ProductsSection() {
  return (
    <section className="section sf-products" aria-labelledby="sf-products-heading">
      <div className="container">
        <div className="section-heading sf-reveal">
          <p className="sf-eyebrow">Proprietary Products</p>
          <h2 id="sf-products-heading">Mirketa-Built Salesforce Products That Accelerate Your AI Journey</h2>
          <p>Beyond implementation services, Mirketa has built a suite of ready-to-deploy, Salesforce-native products that deliver immediate value and leverage AI where it matters most.</p>
        </div>
        <div className="sf-products__grid sf-reveal-stagger">
          {PRODUCTS.map((p) => (
            <div className="sf-product-card" key={p.name}>
              <img src={p.icon} alt="" loading="lazy" />
              <h3>{p.name}</h3>
              <span className="sf-product-card__tagline">{p.tagline}</span>
              <p>{p.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// WHY MIRKETA — differentiator cards + testimonial
// ============================================================

function WhyMirketaSection() {
  return (
    <section className="section sf-why" aria-labelledby="sf-why-heading">
      <div className="container">
        <div className="section-heading sf-reveal">
          <p className="sf-eyebrow">Why Mirketa</p>
          <h2 id="sf-why-heading">The Salesforce AI Partner Built for Outcomes, Not Just Implementations</h2>
          <p>Any Salesforce partner can configure Einstein. Mirketa delivers business transformation. Our team of certified AI architects, industry specialists, and change management experts ensures your Salesforce AI investment generates real, measurable returns.</p>
        </div>
        <div className="sf-why__grid sf-reveal-stagger">
          {WHY_MIRKETA.map((item) => (
            <div className="sf-why-card" key={item.title}>
              <img src={item.icon} alt="" loading="lazy" />
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
        <blockquote className="sf-testimonial sf-reveal">
          <p>&ldquo;{TESTIMONIAL.quote}&rdquo;</p>
          <footer>
            <span className="sf-testimonial__name">{TESTIMONIAL.attribution}</span>
            <div className="sf-testimonial__badges">
              {TESTIMONIAL.badges.map((b) => (
                <span key={b}>{b}</span>
              ))}
            </div>
          </footer>
        </blockquote>
      </div>
    </section>
  );
}

// ============================================================
// FEATURED INSIGHTS
// ============================================================

function InsightsSection() {
  return (
    <section className="section sf-insights" aria-labelledby="sf-insights-heading">
      <div className="container">
        <div className="section-heading sf-reveal">
          <p className="sf-eyebrow">Featured Insights</p>
          <h2 id="sf-insights-heading">Learn from Our Salesforce AI Experts</h2>
          <p>Practical guides, case studies, and thought leadership from the team that has implemented Salesforce AI for 100+ enterprises across 9 industries.</p>
        </div>
        <div className="sf-insights__grid sf-reveal-stagger">
          {INSIGHTS.map((res) => (
            <article className={`sf-insight-card sf-insight-card--${res.tag.toLowerCase().replace(/\s+/g, "-")}`} key={res.title}>
              <span className="sf-insight-card__tag">{res.tag}</span>
              <h3>{res.title}</h3>
              <p>{res.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// FAQ — "support ticket" style cards
// ============================================================

function FaqSection() {
  const [openIndex, setOpenIndex] = useState(-1);

  return (
    <section className="section sf-faq" aria-labelledby="sf-faq-heading">
      <div className="container">
        <div className="section-heading sf-reveal">
          <p className="sf-eyebrow">FAQ</p>
          <h2 id="sf-faq-heading">Frequently Asked Questions About Salesforce AI Services</h2>
        </div>
        <div className="sf-tickets sf-reveal">
          {FAQS.map((item, i) => {
            const open = openIndex === i;
            const panelId = `sf-faq-answer-${i}`;
            return (
              <div className={`sf-ticket ${open ? "is-open" : ""}`} key={item.q}>
                <button
                  type="button"
                  className="sf-ticket__header"
                  aria-expanded={open}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(open ? -1 : i)}
                >
                  <span className="sf-ticket__id">Case #{String(i + 1).padStart(2, "0")}</span>
                  <span className="sf-ticket__subject">{item.q}</span>
                  <span className="sf-ticket__status">{open ? "Open" : "Answered"}</span>
                </button>
                <div id={panelId} className="sf-ticket__body" hidden={!open}>
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
// FINAL CTA + CONTACT
// ============================================================

function FinalCtaSection() {
  return (
    <section className="sf-final-cta sf-reveal" aria-labelledby="sf-final-cta-heading">
      <div className="container sf-final-cta__inner">
        <p className="sf-eyebrow">Get Started</p>
        <h2 id="sf-final-cta-heading">{FINAL_CTA.heading}</h2>
        <p>{FINAL_CTA.description}</p>
        <ul className="sf-final-cta__points">
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

function ContactSection() {
  return <ConsultationSection {...CONSULTATION} />;
}
