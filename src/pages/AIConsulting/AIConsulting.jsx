import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Images } from "../../assets/images/index.js";
import Seo from "../../components/Seo/Seo.jsx";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb.jsx";
import ConsultationSection from "../../components/ConsultationSection/ConsultationSection.jsx";
import "swiper/css";
import "./AIConsulting.css";

const BREADCRUMB_ITEMS = [{ label: "Home", href: "/" }, { label: "AI Consulting" }];

gsap.registerPlugin(ScrollTrigger);

// ============================================================
// DATA — sourced from mirketa.us/ai-consulting/, preserving the
// original headings, statistics, and messaging intent.
// ============================================================

const HERO = {
  eyebrow: "AI Consulting",
  heading: "Enterprise AI Consulting",
  subheading: "Trusted AI Consulting Partner for your AI Roadmap",
  paragraph:
    "Deploy AI workflows that drive measurable business outcomes — beyond pilots. Whether you're assessing AI readiness or deploying AI solutions into production, we help CIOs, CTOs, and business executives deploy AI that saves costs, increases productivity, and delivers measurable ROI in less than 90 days.",
  primaryCta: { label: "Schedule Executive AI Assessment", href: "#contact" },
  secondaryCta: { label: "Download Sample Assessment Report", href: "#contact" },
};

const HERO_STATS = [
  { value: 87, decimals: 0, suffix: "%", label: "of AI pilots fail to scale" },
  { value: 90, decimals: 0, suffix: "%", label: "faster time-to-value" },
  { value: 3, decimals: 0, suffix: "–5 wks", label: "for a readiness assessment" },
  { value: 100, decimals: 0, suffix: "%", label: "client IP ownership" },
];

const CHALLENGES = [
  {
    icon: Images.iconChallengeData,
    title: "AI Can't Access Your Business Data",
    description:
      "Enterprise knowledge is trapped across Salesforce, SAP, SharePoint, legacy databases, PDFs, and internal applications, preventing AI from delivering accurate, context-aware responses.",
  },
  {
    icon: Images.iconChallengePilot,
    title: "AI Pilots Never Reach Production",
    description:
      "87% of AI initiatives fail before enterprise deployment because organizations underestimate governance, integration complexity, operational readiness, and change management.",
  },
  {
    icon: Images.iconChallengeCompliance,
    title: "Compliance Slows Every AI Initiative",
    description:
      "Healthcare, financial services, insurance, and public sector organizations must address governance, auditability, data privacy, and security before AI can move into production.",
  },
  {
    icon: Images.iconChallengePriority,
    title: "Too Many AI Ideas. No Priorities.",
    description:
      "Most enterprises identify hundreds of AI opportunities but lack a framework to determine which initiatives deliver measurable ROI first.",
  },
];

const SERVICES = [
  {
    icon: Images.serviceReadinessAssessment,
    title: "AI Readiness Assessment",
    description:
      "3 to 5 weeks long, our structured analysis of your current data architecture will help you uncover the top opportunities for ROI in implementing AI.",
    items: ["AI Maturity Score", "Executive Readiness Report", "12-Month Roadmap", "Risk Assessment"],
    cta: { label: "Get Your Readiness Score", href: "#contact" },
  },
  {
    icon: Images.serviceStrategyRoadmap,
    title: "AI Strategy & Roadmap",
    description:
      "Strategically align your AI investments with your business objectives, pick the right use cases, and design a phased plan for ROI measurement.",
    items: ["Executive AI Strategy", "AI Architecture", "Budget Planning", "Vendor Evaluation"],
    cta: { label: "Request a Strategy Session", href: "#contact" },
  },
  {
    icon: Images.serviceEnablementImplementation,
    title: "AI Enablement & Implementation",
    description:
      "From smart assistants to process automation and integration, we streamline high-value processes, eliminate manual effort, and deploy at scale.",
    items: ["AI Assistants", "Workflow Automation", "MCP Integrations", "AI Governance"],
    cta: { label: "Explore AI Enablement", href: "#contact" },
  },
];

const FEATURED_ASSESSMENT = {
  heading: "The Executive AI Readiness Assessment That Identifies Your Fastest Path to ROI",
  paragraph:
    "Before investing in AI development, you need to know exactly where you stand. Mirketa's AI Readiness Assessment evaluates six critical dimensions of your organization — giving you the clarity and confidence to invest in AI at scale.",
  benefits: [
    {
      title: "Discover What's Holding Your AI Strategy Back",
      description: "Identify technical, organizational, and operational barriers before they become expensive implementation problems.",
    },
    {
      title: "Benchmark Your Organization Against Industry Leaders",
      description: "Know exactly how your AI capabilities compare with organizations successfully deploying AI at scale.",
    },
    {
      title: "Leave with a Prioritized 12-Month AI Investment Plan",
      description:
        "A phased, ROI-ranked roadmap of AI use cases organized into Quick Wins, Strategic Initiatives, and Future Horizon opportunities.",
    },
  ],
  cta: { label: "Request Assessment", href: "#contact" },
};

const MATURITY_LEVELS = [
  { level: "01", label: "Unaware", description: "Limited Experimentation" },
  { level: "02", label: "Exploring", description: "Pilots Underway" },
  { level: "03", label: "Scaling AI", description: "Integrated into Workflows" },
  { level: "04", label: "Leading", description: "AI-driven Business Decisions" },
];

const ASSESSMENT_DELIVERABLES = [
  "AI Maturity Score Report",
  "6-Dimension Analysis",
  "Risk Assessment Matrix",
  "Use Case Prioritization",
  "12-Month Roadmap",
  "ROI Projections",
];

const EXECUTION_SERVICES = [
  {
    number: "01",
    icon: Images.serviceAgenticOrchestration,
    title: "Agentic Orchestration & Legacy Integration",
    description: "Connect your entire data estate. Orchestrate AI across every system without replacing your infrastructure.",
    details:
      "Integrate AI with SAP, Salesforce, Microsoft 365, ServiceNow, Snowflake, SharePoint, and legacy applications — without replacing your existing infrastructure.",
    capabilities: [
      "MCP protocol integration across your entire technology estate",
      "Multi-agent orchestration: Orchestrator-Subagent, Fan-out, DAG patterns",
      "Zero infrastructure replacement — works with existing systems",
      "Full audit trails, governance, and compliance controls",
    ],
    timeline: "6–8 Weeks",
    cta: { label: "Book Architecture Review", href: "#contact" },
  },
  {
    number: "02",
    icon: Images.serviceAgentDevelopment,
    title: "Custom AI Agent Development",
    description: "Purpose-built AI agents that think, decide, and act — tailored to your specific workflows and systems.",
    details:
      "Deploy AI agents that handle repetitive tasks, support employees, accelerate customer service, and improve operational efficiency.",
    capabilities: [
      "Custom agents for any enterprise workflow or business process",
      "Salesforce Agentforce and Einstein AI development",
      "LangGraph, CrewAI, AutoGen, OpenAI Assistants",
      "8–12 week delivery from requirements to production",
    ],
    timeline: "8–12 Weeks",
    cta: { label: "Talk to an AI Solutions Expert", href: "#contact" },
  },
];

const INDUSTRIES = [
  {
    name: "Healthcare & Life Sciences",
    image: Images.industryHealthcare,
    benefits: ["Reduce Administrative Burden", "Support HIPAA-aligned Workflows", "Improve Patient Experience", "Accelerate Prior Authorization"],
    useCases: "Clinical Documentation, Patient Scheduling, Medical Coding, Appeals Automation",
  },
  {
    name: "Financial Services",
    image: Images.industryFinancialServices,
    benefits: ["Reduce Compliance Effort", "Detect Fraud Faster", "Improve Audit Readiness", "Accelerate Customer Onboarding"],
    useCases: "Fraud Detection, Risk Scoring, Loan Processing, Claims Review",
  },
  {
    name: "Nonprofit",
    image: Images.industryNonprofits,
    benefits: ["Increase Donor Retention & Engagement", "Reduce Administrative Workload", "Improve Grant Application Success"],
    useCases: "Donor Segmentation, Grant Writing Assistance, Volunteer Management, Impact Reporting Automation",
  },
  {
    name: "Technology & SaaS",
    image: Images.industryTechnologySaas,
    benefits: ["Reduce Customer Support Costs", "Accelerate Product Delivery", "Increase Customer Retention"],
    useCases: "Engineering Copilots, AI-Powered Documentation, Product Analytics Assistants",
  },
  {
    name: "Retail & eCommerce",
    image: Images.industryRetailEcommerce,
    benefits: ["Increase Revenue", "Improve Forecasting", "Reduce Inventory Costs", "Personalize Customer Journeys"],
    useCases: "AI Shopping Assistants, Inventory Optimization, Dynamic Pricing",
  },
  {
    name: "Manufacturing",
    image: Images.industryManufacturing,
    benefits: ["Reduce Downtime", "Improve Quality", "Optimize Supply Chain", "Increase Productivity"],
    useCases: "Supply Chain Demand Forecasting, SOP & Work Instruction Copilots, Predictive Maintenance",
  },
];

const DIFFERENTIATORS = [
  {
    number: "01",
    title: "One Team From Strategy Through Deployment",
    benefits: ["Faster Execution", "Fewer Handoffs", "Better Alignment", "Reduced Project Risk"],
  },
  {
    number: "02",
    title: "100% Client-Owned IP",
    benefits: ["Full Ownership", "Lower Long-Term Costs", "Easier Future Expansion", "Freedom to Change Vendors"],
  },
  {
    number: "03",
    title: "Pre-Built AI Accelerators",
    benefits: ["Faster Deployment", "Lower Implementation Cost", "Reduced Delivery Risk", "Proven Implementation Patterns"],
  },
  {
    number: "04",
    title: "Governance-First Approach",
    benefits: ["Reduce Compliance Risk", "Accelerate Approvals", "Improve Audit Readiness", "Build Executive Confidence"],
  },
  {
    number: "05",
    title: "Deep Enterprise Integration Experience",
    benefits: ["Cost Reduction", "Productivity Improvements", "Cycle-Time Reduction", "Customer Experience", "Revenue Growth"],
  },
  {
    number: "06",
    title: "Outcome-Oriented Delivery",
    description:
      "Our consultants integrate AI with the enterprise systems your teams already rely on — including Salesforce, SAP, Oracle, Microsoft 365, ServiceNow, Epic, Workday, and other business-critical platforms.",
    benefits: ["Preserve Existing Investments", "Faster Deployment", "Minimal Operational Disruption", "Enterprise Scalability"],
  },
];

const JOURNEY = [
  {
    phase: "01",
    title: "AI Readiness Assessment",
    description: "Evaluate data, systems, governance, and workforce readiness. Produce an AI Maturity Score and prioritized roadmap.",
    icon: Images.serviceReadinessAssessment,
  },
  {
    phase: "02",
    title: "AI Strategy & Architecture",
    description: "Define the right AI architecture for your organization — model selection, data pipelines, integration patterns, and governance.",
    icon: Images.serviceStrategyRoadmap,
  },
  {
    phase: "03",
    title: "AI Enablement & Build",
    description: "Deploy AI orchestration and custom AI agents that automate your highest-value workflows at production scale.",
    icon: Images.serviceEnablementImplementation,
  },
  {
    phase: "04",
    title: "Continuous Optimization",
    description: "Monitor agent performance, expand use cases, and continuously improve ROI as your AI ecosystem matures.",
    icon: Images.iconOptimize,
  },
];

const TESTIMONIALS = [
  {
    quote:
      "Mirketa's AI Readiness Assessment gave us the clarity we'd been searching for. Within five weeks, we had a quantified maturity score, a risk-ranked use case roadmap, and a board-ready AI strategy.",
    name: "Chief Information Officer",
    title: "Regional Healthcare Network (12 Hospitals)",
    initials: "CIO",
  },
  {
    quote:
      "We'd tried two other AI consulting firms before Mirketa. The difference was that Mirketa's team could both design the architecture and build it. We went from AI Readiness Assessment to our first production agent in under 14 weeks.",
    name: "VP of Digital Transformation",
    title: "Mid-Market Financial Services Firm",
    initials: "VP",
  },
];

const FAQS = [
  {
    question: "What is an AI Readiness Assessment and why do I need one?",
    answer:
      "An AI Readiness Assessment is an executive engagement that involves assessing the readiness of your organization's data, technology, governance, security, processes, and workforce for adopting AI. After this assessment, you will get a maturity score, prioritized use cases, return on investment, and a roadmap to implement AI.",
  },
  {
    question: "How long does the AI Readiness Assessment take?",
    answer:
      "Usually, most evaluations take between 3 to 5 weeks, depending on organizational size, stakeholder availability, and the number of business divisions involved. Implementing solutions within enterprises typically takes 8 to 16 weeks.",
  },
  {
    question: "What is the difference between AI Consulting and AI Enablement?",
    answer:
      "AI Consulting focuses on identifying opportunities, defining strategy, governance, and implementation priorities. AI Enablement is where we build, integrate, deploy, and optimize production-ready AI solutions based on that strategy. Many clients begin with consulting and continue into implementation with the same delivery team.",
  },
  {
    question: "Do we need to replace our existing systems to adopt AI?",
    answer:
      "No. Our approach is designed around your existing technology investments. We integrate AI with platforms such as Salesforce, Microsoft 365, SAP, Oracle, ServiceNow, Workday, Epic, SharePoint, and custom enterprise applications whenever possible.",
  },
  {
    question: "What industries does Mirketa specialize in?",
    answer:
      "Mirketa specializes in Healthcare & Life Sciences, Financial Services, Nonprofit, Technology & SaaS, Retail & eCommerce, and Manufacturing — bringing deep understanding of each sector's workflows, compliance requirements, and competitive dynamics to every engagement.",
  },
  {
    question: "What makes Mirketa different?",
    answer:
      "Unlike strategy-only consulting firms or implementation-only development shops, Mirketa combines executive AI strategy, enterprise architecture, governance, integration, and production deployment within one engagement. Clients work with the same cross-functional team from assessment through implementation.",
  },
  {
    question: "What happens after the assessment?",
    answer:
      "The best starting point is a 30-minute technical briefing with one of our AI architects. We'll discuss your current AI initiatives, technology landscape, and business objectives, and recommend the right entry point — whether that's an AI Readiness Assessment, a targeted AI strategy engagement, or a specific AI Enablement implementation. Fill out the form below and we'll reach out within one business day.",
  },
  {
    question: "Who owns the AI solutions Mirketa builds?",
    answer:
      "100% of the IP belongs to you. Every assessment report, strategy document, AI agent, workflow, and integration we build is fully owned by your organization. Mirketa uses proprietary accelerators to reduce your time-to-market, but the resulting deliverables are yours — with no ongoing licensing fees or vendor lock-in.",
  },
];

const SEO = {
  title: "AI Consulting Services for Enterprises | Mirketa",
  description:
    "Enterprise AI consulting that moves you beyond pilots. Get an AI roadmap, readiness assessment, and production deployment with measurable ROI in 90 days.",
  canonical: "https://www.mirketa.com/ai-consulting/",
  keywords: [
    "AI Consulting Services",
    "Enterprise AI Consulting",
    "Salesforce AI Consulting",
    "AI Strategy Consulting",
    "AI Roadmap",
    "AI Readiness",
    "AI Implementation Partner",
    "Digital Transformation Consulting",
    "AI consulting services for enterprises",
    "enterprise AI consulting company",
    "AI roadmap and strategy consulting partner",
    "AI pilot to production consulting",
  ],
  schema: [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "AI Consulting",
      provider: { "@type": "Organization", name: "Mirketa Inc.", url: "https://www.mirketa.com" },
      name: "Enterprise AI Consulting",
      description:
        "Deploy AI workflows that drive measurable business outcomes beyond pilots, with an AI roadmap, readiness assessment, and production deployment.",
      areaServed: "Global",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.mirketa.com/" },
        { "@type": "ListItem", position: 2, name: "AI Consulting", item: "https://www.mirketa.com/ai-consulting/" },
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

const FINAL_CTA = {
  heading: "Your Next AI Investment Should Be Your Smartest One. Ready?",
  paragraph:
    "Book a complimentary executive consultation to discuss your AI goals, evaluate your organization's readiness, and receive guidance on the highest-value opportunities for AI adoption.",
  primaryCta: { label: "Schedule Executive AI Assessment", href: "#contact" },
  secondaryCta: { label: "Download Sample Assessment Report", href: "#contact" },
};

const CONTACT = {
  heading: "Let's Identify Your Highest-Value AI Opportunities",
  description:
    "Meet with one of our enterprise AI strategists to discuss your business goals, current AI initiatives, and technology landscape. We'll help you identify high-impact opportunities, assess implementation risks, and recommend practical next steps tailored to your organization.",
  benefits: [
    "30-minute executive strategy session",
    "Personalized AI opportunity assessment",
    "Guidance from senior AI architects",
    "Response within one business day",
  ],
  formTitle: "Schedule Executive AI Assessment",
};

// ============================================================
// SHARED HOOKS — scoped to this page (kept in this single file
// per the requested "only two files" page structure).
// ============================================================

/** Fires `true` once an element enters the viewport, then disconnects. */
function useInView(options = { threshold: 0.25 }) {
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

/** Animates a numeric value from 0 to `end` once `start` becomes true. */
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

/** Adds a short-lived ripple span at the pointer's position inside the button. */
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
export default function AIConsulting() {
  const heroTextRef = useRef(null);
  const heroArtRef = useRef(null);
  const ripple = useRipple();

  // Hero entrance + parallax + scroll-reveal for every `.reveal` element on the page.
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(heroTextRef.current.children, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
      });

      gsap.from(heroArtRef.current, {
        y: 40,
        opacity: 0,
        scale: 0.94,
        duration: 1,
        ease: "power3.out",
        delay: 0.15,
      });

      gsap.to(heroArtRef.current, {
        y: -30,
        ease: "none",
        scrollTrigger: { trigger: heroArtRef.current, start: "top top", end: "bottom top", scrub: 0.6 },
      });

      gsap.utils.toArray(".reveal").forEach((el) => {
        gsap.from(el, {
          y: 34,
          opacity: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      gsap.utils.toArray(".reveal-stagger").forEach((group) => {
        gsap.from(group.children, {
          y: 28,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: { trigger: group, start: "top 85%" },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="ai-consulting">
      <Seo {...SEO} />
      <HeroSection ripple={ripple} textRef={heroTextRef} artRef={heroArtRef} />
      <StatsSection />
      <ChallengeSection />
      <ServicesSection ripple={ripple} />
      <FeaturedAssessmentSection ripple={ripple} />
      <ExecutionServicesSection ripple={ripple} />
      <IndustriesSection />
      <WhyMirketaSection />
      <JourneySection />
      <TestimonialsSection />
      <FaqSection />
      <FinalCtaSection ripple={ripple} />
      <ContactSection />
    </div>
  );
}

// ================= HERO =================
function HeroSection({ ripple, textRef, artRef }) {
  return (
    <section className="aic-hero" aria-label="AI Consulting introduction">
      <div className="aic-hero__bg" />
      <div className="container">
        <Breadcrumb items={BREADCRUMB_ITEMS} className="aic-breadcrumb" />
      </div>
      <div className="container aic-hero__inner">
        <div className="aic-hero__text" ref={textRef}>
          <span className="aic-eyebrow">{HERO.eyebrow}</span>
          <h1>{HERO.heading}</h1>
          <p className="aic-hero__subheading">{HERO.subheading}</p>
          <p className="aic-hero__paragraph">{HERO.paragraph}</p>
          <div className="aic-hero__ctas">
            <a href={HERO.primaryCta.href} className="btn btn-primary aic-btn" onClick={ripple}>
              {HERO.primaryCta.label}
              <span className="btn-arrow">&rarr;</span>
            </a>
            <a href={HERO.secondaryCta.href} className="btn btn-secondary aic-btn" onClick={ripple}>
              {HERO.secondaryCta.label}
            </a>
          </div>
        </div>

        <div className="aic-hero__art" ref={artRef} aria-hidden="true">
          <img src={Images.heroAiConsulting} alt="" width="560" height="560" />
        </div>
      </div>

      <button
        className="aic-scroll-indicator"
        aria-label="Scroll to next section"
        onClick={() => document.getElementById("aic-challenge")?.scrollIntoView({ behavior: "smooth" })}
      >
        <span />
      </button>
    </section>
  );
}

// ================= TRUST STATS =================
function StatItem({ stat }) {
  const [ref, inView] = useInView({ threshold: 0.5 });
  const display = useCountUp(stat.value, inView, 1600, stat.decimals);
  return (
    <div className="aic-stat" ref={ref}>
      <p className="aic-stat__value">
        {display}
        {stat.suffix}
      </p>
      <p className="aic-stat__label">{stat.label}</p>
    </div>
  );
}

function StatsSection() {
  return (
    <section className="aic-stats" aria-label="Key statistics">
      <div className="content-wrap aic-stats__grid">
        {HERO_STATS.map((stat) => (
          <StatItem stat={stat} key={stat.label} />
        ))}
      </div>
    </section>
  );
}

// ================= THE CHALLENGE =================
function ChallengeSection() {
  return (
    <section className="section aic-challenge" id="aic-challenge" aria-labelledby="aic-challenge-heading">
      <div className="content-wrap">
        <div className="section-heading reveal">
          <span className="aic-eyebrow">The Challenge</span>
          <h2 id="aic-challenge-heading">Why Most Enterprise AI Initiatives Stall</h2>
        </div>

        <div className="aic-challenge__grid reveal-stagger">
          {CHALLENGES.map((c) => (
            <div className="aic-challenge-card" key={c.title}>
              <span className="aic-challenge-card__icon">
                <img src={c.icon} alt="" width="34" height="34" loading="lazy" />
              </span>
              <h3>{c.title}</h3>
              <p>{c.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ================= AI CONSULTING SERVICES =================
function ServicesSection({ ripple }) {
  return (
    <section className="section aic-services" aria-labelledby="aic-services-heading">
      <div className="content-wrap">
        <div className="section-heading reveal">
          <span className="aic-eyebrow">What We Do</span>
          <h2 id="aic-services-heading">AI Consulting Services</h2>
          <p>From first assessment to production-scale deployment, one team owns the outcome.</p>
        </div>

        <div className="aic-services__grid reveal-stagger">
          {SERVICES.map((s) => (
            <div className="aic-service-card" key={s.title}>
              <span className="aic-service-card__icon">
                <img src={s.icon} alt="" width="40" height="40" loading="lazy" />
              </span>
              <h3>{s.title}</h3>
              <p>{s.description}</p>
              <ul>
                {s.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <a href={s.cta.href} className="aic-service-card__link" onClick={ripple}>
                {s.cta.label} <span className="btn-arrow">&rarr;</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ================= FEATURED ASSESSMENT + MATURITY MODEL =================
function FeaturedAssessmentSection({ ripple }) {
  return (
    <section className="section aic-featured" aria-labelledby="aic-featured-heading">
      <div className="content-wrap aic-featured__grid">
        <div className="aic-featured__intro reveal">
          <span className="aic-eyebrow">Featured Service</span>
          <h2 id="aic-featured-heading">{FEATURED_ASSESSMENT.heading}</h2>
          <p>{FEATURED_ASSESSMENT.paragraph}</p>

          <div className="aic-featured__benefits">
            {FEATURED_ASSESSMENT.benefits.map((b) => (
              <div className="aic-featured__benefit" key={b.title}>
                <img src={Images.iconCheckCircle} alt="" width="22" height="22" loading="lazy" />
                <div>
                  <strong>{b.title}</strong>
                  <p>{b.description}</p>
                </div>
              </div>
            ))}
          </div>

          <a href={FEATURED_ASSESSMENT.cta.href} className="btn btn-primary aic-btn" onClick={ripple}>
            {FEATURED_ASSESSMENT.cta.label}
            <span className="btn-arrow">&rarr;</span>
          </a>
        </div>

        <div className="aic-maturity reveal">
          <h3>AI Maturity Model</h3>
          <ol className="aic-maturity__levels">
            {MATURITY_LEVELS.map((lvl) => (
              <li key={lvl.level}>
                <span className="aic-maturity__badge">{lvl.level}</span>
                <div>
                  <strong>{lvl.label}</strong>
                  <p>{lvl.description}</p>
                </div>
              </li>
            ))}
          </ol>

          <h4>Assessment Deliverables</h4>
          <ul className="aic-maturity__deliverables">
            {ASSESSMENT_DELIVERABLES.map((d) => (
              <li key={d}>
                <img src={Images.iconCheckCircle} alt="" width="16" height="16" loading="lazy" />
                {d}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

// ================= FROM STRATEGY TO EXECUTION =================
function ExecutionServicesSection({ ripple }) {
  return (
    <section className="section aic-execution" aria-labelledby="aic-execution-heading">
      <div className="content-wrap">
        <div className="section-heading reveal">
          <span className="aic-eyebrow">From Strategy to Execution</span>
          <h2 id="aic-execution-heading">Turn Your AI Strategy Into Enterprise-Ready Solutions</h2>
          <p>
            Once your AI Readiness Assessment defines the roadmap, Mirketa's AI Enablement practice executes it —
            building the agentic workflows, MCP integrations, and custom AI agents that make your AI strategy real.
          </p>
        </div>

        <div className="aic-execution__list">
          {EXECUTION_SERVICES.map((svc) => (
            <div className="aic-execution-card reveal" key={svc.number}>
              <div className="aic-execution-card__media">
                <span className="aic-execution-card__number">{svc.number}</span>
                <span className="aic-execution-card__icon">
                  <img src={svc.icon} alt="" width="44" height="44" loading="lazy" />
                </span>
              </div>
              <div className="aic-execution-card__body">
                <h3>{svc.title}</h3>
                <p className="aic-execution-card__lead">{svc.description}</p>
                <p>{svc.details}</p>
                <ul>
                  {svc.capabilities.map((cap) => (
                    <li key={cap}>{cap}</li>
                  ))}
                </ul>
                <div className="aic-execution-card__footer">
                  <span className="aic-execution-card__timeline">{svc.timeline}</span>
                  <a href={svc.cta.href} className="btn btn-outline-dark aic-btn" onClick={ripple}>
                    {svc.cta.label}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ================= INDUSTRIES =================
function IndustriesSection() {
  const swiperRef = useRef(null);
  return (
    <section className="section aic-industries" aria-labelledby="aic-industries-heading">
      <div className="content-wrap">
        <div className="aic-industries__header reveal">
          <div>
            <span className="aic-eyebrow">Industries</span>
            <h2 id="aic-industries-heading">AI Solutions Designed Around Your Industry's Business Challenges</h2>
            <p>
              Mirketa brings deep industry context to every AI consulting engagement — understanding the specific
              workflows, compliance requirements, and competitive dynamics of your sector.
            </p>
          </div>
          <div className="aic-industries__nav">
            <button aria-label="Previous industry" onClick={() => swiperRef.current?.slidePrev()}>
              &larr;
            </button>
            <button aria-label="Next industry" onClick={() => swiperRef.current?.slideNext()}>
              &rarr;
            </button>
          </div>
        </div>

        <Swiper
          modules={[Autoplay]}
          onSwiper={(s) => (swiperRef.current = s)}
          loop
          speed={800}
          autoplay={{ delay: 3600, disableOnInteraction: false, pauseOnMouseEnter: true }}
          spaceBetween={24}
          slidesPerView={3}
          breakpoints={{
            0: { slidesPerView: 1.1 },
            640: { slidesPerView: 1.6 },
            900: { slidesPerView: 2.2 },
            1280: { slidesPerView: 3 },
          }}
          className="aic-industries__swiper"
        >
          {INDUSTRIES.map((ind) => (
            <SwiperSlide key={ind.name}>
              <div className="aic-industry-card" style={{ backgroundImage: cssUrl(ind.image) }}>
                <div className="aic-industry-card__overlay" />
                <div className="aic-industry-card__content">
                  <h3>{ind.name}</h3>
                  <ul>
                    {ind.benefits.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                  <p className="aic-industry-card__usecases">
                    <strong>Typical use cases: </strong>
                    {ind.useCases}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

// ================= WHY CHOOSE MIRKETA =================
function WhyMirketaSection() {
  return (
    <section className="section aic-why" aria-labelledby="aic-why-heading">
      <div className="content-wrap">
        <div className="section-heading reveal">
          <span className="aic-eyebrow">Why Mirketa</span>
          <h2 id="aic-why-heading">Why Do Leaders Choose Mirketa?</h2>
          <p>
            We don't just advise — we build. Mirketa's AI consulting practice is differentiated by our ability to
            move from strategy to production-scale delivery in a single engagement.
          </p>
        </div>

        <div className="aic-why__grid reveal-stagger">
          {DIFFERENTIATORS.map((d) => (
            <div className="aic-why-card" key={d.number}>
              <span className="aic-why-card__number">{d.number}</span>
              <h3>{d.title}</h3>
              {d.description && <p className="aic-why-card__description">{d.description}</p>}
              <ul>
                {d.benefits.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ================= THE MIRKETA AI CONSULTING JOURNEY =================
function JourneySection() {
  return (
    <section className="section aic-journey" aria-labelledby="aic-journey-heading">
      <div className="content-wrap">
        <div className="section-heading reveal">
          <span className="aic-eyebrow">Our Process</span>
          <h2 id="aic-journey-heading">The Mirketa AI Consulting Journey</h2>
        </div>

        <div className="aic-journey__timeline reveal-stagger">
          {JOURNEY.map((step) => (
            <div className="aic-journey-step" key={step.phase}>
              <div className="aic-journey-step__marker">
                <img src={step.icon} alt="" width="26" height="26" loading="lazy" />
              </div>
              <span className="aic-journey-step__phase">Phase {step.phase}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ================= CLIENT OUTCOMES / TESTIMONIALS =================
function TestimonialsSection() {
  return (
    <section className="section aic-testimonials" aria-labelledby="aic-testimonials-heading">
      <div className="content-wrap">
        <div className="section-heading reveal">
          <span className="aic-eyebrow">Client Outcomes</span>
          <h2 id="aic-testimonials-heading">Real Results From Real Engagements</h2>
        </div>

        <div className="aic-testimonials__grid reveal-stagger">
          {TESTIMONIALS.map((t) => (
            <blockquote className="aic-testimonial-card" key={t.name + t.title}>
              <img src={Images.iconQuote} alt="" width="30" height="22" loading="lazy" />
              <p>{t.quote}</p>
              <footer>
                <span className="aic-testimonial-card__avatar">{t.initials}</span>
                <div>
                  <strong>{t.name}</strong>
                  <small>{t.title}</small>
                </div>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

// ================= FAQ =================
function FaqItem({ faq, isOpen, onToggle, index }) {
  const panelRef = useRef(null);
  return (
    <div className={`aic-faq-item ${isOpen ? "is-open" : ""}`}>
      <h3>
        <button
          className="aic-faq-item__trigger"
          aria-expanded={isOpen}
          aria-controls={`aic-faq-panel-${index}`}
          id={`aic-faq-trigger-${index}`}
          onClick={onToggle}
        >
          {faq.question}
          <svg width="14" height="8" viewBox="0 0 14 8" fill="none" aria-hidden="true">
            <path d="M1 1l6 6 6-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </h3>
      <div
        className="aic-faq-item__panel"
        id={`aic-faq-panel-${index}`}
        role="region"
        aria-labelledby={`aic-faq-trigger-${index}`}
        ref={panelRef}
        style={{ maxHeight: isOpen ? `${panelRef.current?.scrollHeight ?? 400}px` : "0px" }}
      >
        <p>{faq.answer}</p>
      </div>
    </div>
  );
}

function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="section aic-faq" aria-labelledby="aic-faq-heading">
      <div className="content-wrap aic-faq__wrap">
        <div className="section-heading reveal">
          <span className="aic-eyebrow">FAQ</span>
          <h2 id="aic-faq-heading">Frequently Asked Questions</h2>
        </div>

        <div className="aic-faq__list reveal">
          {FAQS.map((faq, i) => (
            <FaqItem key={faq.question} faq={faq} index={i} isOpen={openIndex === i} onToggle={() => setOpenIndex(openIndex === i ? -1 : i)} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ================= FINAL CTA =================
function FinalCtaSection({ ripple }) {
  return (
    <section className="section aic-final-cta" aria-labelledby="aic-final-cta-heading">
      <div className="content-wrap aic-final-cta__inner reveal">
        <span className="aic-final-cta__pattern" aria-hidden="true" style={{ backgroundImage: cssUrl(Images.aiNetworkPattern) }} />
        <h2 id="aic-final-cta-heading">{FINAL_CTA.heading}</h2>
        <p>{FINAL_CTA.paragraph}</p>
        <div className="aic-final-cta__ctas">
          <a href={FINAL_CTA.primaryCta.href} className="btn btn-primary aic-btn" onClick={ripple}>
            {FINAL_CTA.primaryCta.label}
            <span className="btn-arrow">&rarr;</span>
          </a>
          <a href={FINAL_CTA.secondaryCta.href} className="btn btn-secondary aic-btn" onClick={ripple}>
            {FINAL_CTA.secondaryCta.label}
          </a>
        </div>
      </div>
    </section>
  );
}

// ================= CONTACT FORM =================
function ContactSection() {
  return <ConsultationSection {...CONTACT} />;
}
