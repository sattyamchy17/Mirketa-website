import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Images } from "../../assets/images/index.js";
import Seo from "../../components/Seo/Seo.jsx";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb.jsx";
import ConsultationSection from "../../components/ConsultationSection/ConsultationSection.jsx";
import "./AIReadiness.css";

const BREADCRUMB_ITEMS = [{ label: "Home", href: "/" }, { label: "AI Readiness Assessment" }];

gsap.registerPlugin(ScrollTrigger);

// ============================================================
// DATA — sourced from mirketa.com's AI Readiness Assessment page,
// preserving the original headings, statistics, and messaging intent.
// ============================================================

const HERO = {
  eyebrow: "AI Readiness Assessment",
  heading: "Enterprise AI Readiness Assessment",
  subheading: "Is Your Institution or Organization Truly Ready for AI?",
  paragraph:
    "Most enterprise AI initiatives fail not because the technology is immature, but because the organization isn't ready for it. Mirketa's structured assessment evaluates six critical dimensions of your business and gives you a prioritized, board-ready roadmap before you spend a dollar on implementation.",
  primaryCta: { label: "Get Your Free Assessment", href: "#contact" },
  secondaryCta: { label: "Explore the Framework", href: "#framework" },
};

const HERO_STATS = [
  { value: 150, decimals: 0, suffix: "+", label: "Enterprises Assessed" },
  { value: 12, decimals: 0, suffix: "+", label: "Industries Served" },
  { value: 4, decimals: 0, suffix: " wks", label: "Avg. Time to Roadmap" },
  { value: 98, decimals: 0, suffix: "%", label: "Client Satisfaction" },
];

const RESEARCH_CITATIONS = [
  { stat: "90%", detail: "of enterprise AI pilots fail to scale", source: "MIT Sloan, 2025" },
  { stat: "87%", detail: "cite poor data quality as the #1 barrier", source: "Gartner, 2025" },
  { stat: "3x", detail: "more likely to succeed with a readiness assessment", source: "McKinsey, 2024" },
  { stat: "40%", detail: "of AI budgets wasted on the wrong use cases", source: "IDC, 2025" },
];

const PROBLEMS = [
  {
    icon: Images.iconProblemStart,
    title: "Where Do We Even Start?",
    description:
      "Hundreds of AI tools, frameworks, and vendors are competing for attention, and most enterprises have no clear strategy or roadmap to cut through the noise.",
  },
  {
    icon: Images.iconProblemData,
    title: "Fragmented Data, Broken Pipelines",
    description: "Siloed data across CRM, ERP, and legacy systems prevents reliable AI models from ever reaching production.",
  },
  {
    icon: Images.iconProblemUsecase,
    title: "Which Use Cases Are Actually Ready?",
    description: "Most teams have no framework to evaluate use case feasibility versus business impact before committing budget.",
  },
  {
    icon: Images.iconProblemRollout,
    title: "Rollout Risks Nobody Talks About",
    description: "AI adoption fails at the human level far more often than the technical one, because change management gets underestimated.",
  },
  {
    icon: Images.iconProblemTalent,
    title: "The Talent and Culture Gap",
    description: "Scaling AI requires a culture of experimentation and cross-functional AI literacy that most organizations haven't built yet.",
  },
  {
    icon: Images.iconProblemGovernance,
    title: "Governance Without a Framework",
    description: "Deploying AI without governance risks regulatory penalties, reputational damage, and ethical blind spots.",
  },
];

const MATURITY_LEVELS = [
  { level: "01", label: "AI Unaware", description: "No formal strategy, manual processes, siloed data, no AI skills." },
  { level: "02", label: "AI Exploring", description: "Isolated pilots, basic data collection, some leadership awareness." },
  { level: "03", label: "AI Scaling", description: "Integrated strategy, standardized governance, models in production with ROI." },
  { level: "04", label: "AI Leading", description: "AI-driven innovation, continuous learning, ethical framework embedded." },
];

const FRAMEWORK_DIMENSIONS = [
  {
    id: "business",
    icon: Images.iconDimensionBusiness,
    title: "Business Alignment",
    subtitle: "Strategy & Vision",
    items: ["AI strategy clarity and roadmap", "Executive buy-in and C-suite alignment", "Business-driven use case prioritization", "KPIs and success metrics definition"],
  },
  {
    id: "data",
    icon: Images.iconDimensionData,
    title: "Data Readiness",
    subtitle: "Foundation & Quality",
    items: ["Data quality, completeness, consistency", "Integration across CRM, ERP, EHR systems", "Data governance and privacy compliance", "Master data management maturity"],
  },
  {
    id: "technology",
    icon: Images.iconDimensionTechnology,
    title: "Technology Landscape",
    subtitle: "Infrastructure & Stack",
    items: ["Cloud readiness (AWS, Azure, GCP, Salesforce)", "Legacy system modernization status", "API architecture and integration capability", "AI/ML tooling compatibility"],
  },
  {
    id: "process",
    icon: Images.iconDimensionProcess,
    title: "Process & Operations",
    subtitle: "Efficiency & Automation",
    items: ["Workflow efficiency and automation potential", "Process documentation and standardization", "Scalability of core operations", "Change management readiness"],
  },
  {
    id: "talent",
    icon: Images.iconDimensionTalent,
    title: "Talent & Culture",
    subtitle: "People & Capability",
    items: ["AI/ML skill availability and gaps", "Culture of data-driven decision-making", "Training, reskilling, upskilling plans", "AI champions and center of excellence"],
  },
  {
    id: "governance",
    icon: Images.iconDimensionGovernance,
    title: "Governance & Risk",
    subtitle: "Compliance & Ethics",
    items: ["Ethical AI policies and decision transparency", "Regulatory compliance (GDPR, HIPAA, SOC2)", "Risk identification and mitigation", "AI audit trails and accountability frameworks"],
  },
];

const TIERS = [
  {
    icon: Images.iconTierQuickwins,
    accent: "quickwins",
    title: "Quick Wins",
    timeframe: "0–3 Months",
    items: [
      "AI-powered customer service chatbots",
      "Document processing and data extraction",
      "Email classification and routing automation",
      "Predictive maintenance for known equipment",
      "AI-assisted report generation and summarization",
    ],
  },
  {
    icon: Images.iconTierStrategic,
    accent: "strategic",
    title: "Strategic Initiatives",
    timeframe: "3–9 Months",
    items: [
      "Intelligent demand forecasting and supply chain optimization",
      "Personalized customer experience at scale",
      "AI-driven fraud detection and risk scoring",
      "Generative AI for content and knowledge management",
      "Predictive customer churn and retention models",
    ],
  },
  {
    icon: Images.iconTierFuture,
    accent: "future",
    title: "Future Horizon",
    timeframe: "9–18 Months",
    items: [
      "Autonomous AI agents for complex decision-making",
      "Real-time AI-driven pricing optimization",
      "Computer vision for quality control and inspection",
      "AI-powered drug discovery or clinical trial optimization",
      "Fully autonomous workflow orchestration",
    ],
  },
];

const RISK_GROUPS = [
  {
    icon: Images.iconRiskTechnical,
    title: "Technical Risks",
    risks: [
      { risk: "Data quality degradation", severity: "High", mitigation: "Continuous monitoring and quality scoring" },
      { risk: "Model drift and performance decay", severity: "High", mitigation: "Automated monitoring with retraining" },
      { risk: "Integration failures with legacy systems", severity: "Medium", mitigation: "API-first architecture" },
    ],
  },
  {
    icon: Images.iconRiskOrganizational,
    title: "Organizational Risks",
    risks: [
      { risk: "Employee resistance to AI adoption", severity: "High", mitigation: "Change management and training" },
      { risk: "Loss of key AI talent", severity: "Medium", mitigation: "Knowledge documentation and cross-training" },
      { risk: "IT/business misalignment", severity: "Medium", mitigation: "Joint governance committee" },
    ],
  },
  {
    icon: Images.iconRiskCompliance,
    title: "Compliance & Ethical Risks",
    risks: [
      { risk: "Regulatory non-compliance", severity: "High", mitigation: "Privacy-by-design architecture" },
      { risk: "Algorithmic bias in models", severity: "High", mitigation: "Bias testing and fairness metrics" },
      { risk: "Lack of AI decision transparency", severity: "Medium", mitigation: "Explainable AI requirements" },
    ],
  },
];

const PROCESS_STEPS = [
  { week: "Week 1", title: "Discovery & Stakeholder Alignment", description: "Structured interviews across C-suite, IT, and operations leadership." },
  { week: "Week 1–2", title: "Current State Analysis", description: "Deep-dive evaluation of data infrastructure, technology stack, processes, and talent." },
  { week: "Week 2–3", title: "AI Opportunity Mapping", description: "Workshops identifying use cases mapped to your organization's readiness level." },
  { week: "Week 3", title: "Feasibility & Risk Scoring", description: "Each identified use case is scored on a proprietary impact-vs-effort matrix." },
  { week: "Week 4", title: "Roadmap & Business Case", description: "Phased implementation roadmap with ROI, resource requirements, and governance." },
];

const DELIVERABLES = [
  { icon: Images.iconDeliverableScore, title: "AI Readiness Score & Maturity Benchmark", description: "A quantified score across all six dimensions with industry benchmarking." },
  { icon: Images.iconDeliverableGap, title: "Detailed Gap Analysis", description: "Dimension-by-dimension breakdown of current versus required capabilities." },
  { icon: Images.iconDeliverableUsecases, title: "Industry-Relevant AI Use Cases", description: "A curated, prioritized list specific to your business functions." },
  { icon: Images.iconDeliverableRoadmap, title: "Phased Implementation Roadmap", description: "A 12–18 month roadmap with milestones, resources, and a 90-day quick-start." },
  { icon: Images.iconDeliverableRoi, title: "ROI Forecast & Business Impact Model", description: "Financial projections including cost savings and time-to-value." },
  { icon: Images.iconProblemGovernance, title: "Governance & Risk Framework", description: "AI governance structures, ethical policies, and compliance recommendations." },
];

const WHY_MIRKETA = [
  { title: "Deep Enterprise AI Expertise", description: "Over a decade of experience delivering AI and digital transformation projects for Fortune 500 companies." },
  { title: "Salesforce & Cloud Ecosystem Specialists", description: "Certified across Salesforce Einstein AI, AWS, Azure, and Google Cloud." },
  { title: "Industry-Specific AI Accelerators", description: "Pre-built frameworks that reduce time-to-value by up to 40%." },
  { title: "Outcome-Focused", description: "We measure success by business outcomes — cost reduction, revenue growth, and operational efficiency." },
  { title: "End-to-End Partnership", description: "From initial assessment through implementation, change management, and ongoing optimization." },
  { title: "Global Delivery, Local Understanding", description: "Teams across the US and India delivering around the clock." },
];

// Every item links to its real, existing page — verified against
// src/App.jsx / src/config/pageSlugs.js rather than guessed. A few labels
// (e.g. "Salesforce Support", "iPaaS Development") don't have a page of
// their own; those point at the closest real page that actually covers
// that work rather than a dead or invented URL.
const SERVICE_GROUPS = [
  {
    icon: Images.clientSalesforce,
    title: "Salesforce",
    description: "Consulting, development, and managed services across the Salesforce platform.",
    items: [
      { label: "Salesforce Dev and Consulting", href: "/platforms/salesforce/development-consulting" },
      { label: "Salesforce Clouds", href: "/platforms/salesforce/clouds" },
      { label: "Salesforce Developer Services", href: "/platforms/salesforce/developer-services" },
      { label: "Salesforce Support", href: "/platforms/salesforce/admin-support" },
    ],
  },
  {
    icon: Images.iconPlatformOracle,
    title: "Oracle Apps",
    description: "Implementation and managed services for Oracle Fusion Applications.",
    items: [
      { label: "Oracle Fusion Applications Implementation", href: "/platforms/oracle/fusion-implementation" },
      { label: "Oracle Managed Services", href: "/platforms/oracle/support-services" },
    ],
  },
  {
    icon: Images.iconPlatformNetsuite,
    title: "NetSuite",
    description: "Implementation, managed services, and AI consulting for NetSuite.",
    items: [
      { label: "NetSuite Implementation", href: "/platforms/netsuite/implementation" },
      { label: "NetSuite Managed Services", href: "/platforms/netsuite/managed-services" },
      { label: "NetSuite AI Solutions", href: "/platforms/netsuite/ai-consulting" },
    ],
  },
  {
    icon: Images.iconPlatformServicenow,
    title: "ServiceNow",
    description: "Consulting, workflow implementation, and managed services across ServiceNow.",
    items: [
      { label: "ServiceNow Consulting and Development", href: "/platforms/servicenow/consulting-development-services" },
      { label: "Technology, Customer, Employee & Creator Workflows", href: "/platforms/servicenow" },
      { label: "ServiceNow Managed Services", href: "/platforms/servicenow/support-managed-services" },
    ],
  },
  {
    icon: Images.iconPlatformWorkday,
    title: "Workday",
    description: "Consulting, development, and managed services for Workday.",
    items: [
      { label: "Workday Consulting and Development", href: "/platforms/workday/consulting-development" },
      { label: "Workday Managed Services", href: "/platforms/workday/managed-services" },
    ],
  },
  {
    icon: Images.iconPlatformCloud,
    title: "Cloud Infra Services",
    description: "Cloud setup, infrastructure management, and site reliability engineering.",
    items: [
      { label: "Cloud Setup and Migration", href: "/platforms/cloud/setup-migration" },
      { label: "Cloud Infra Management", href: "/platforms/cloud/infra-management" },
      { label: "SRE Services", href: "/platforms/cloud/sre-security" },
      { label: "Security Monitoring Services", href: "/platforms/cloud/sre-security" },
    ],
  },
  {
    icon: Images.iconPlatformIntegration,
    title: "Systems Integration",
    description: "Enterprise integration services built on Boomi and MuleSoft.",
    items: [
      { label: "Enterprise Integration Services", href: "/enterprise-integration-services" },
      { label: "iPaaS Development", href: "/enterprise-integration-services" },
      { label: "Boomi Services", href: "/boomi-integration-services-solutions" },
      { label: "MuleSoft Services", href: "/mulesoft-implementation" },
    ],
  },
];

const INDUSTRIES = [
  { icon: Images.iconIndustryHitech, name: "Hi-Tech" },
  { icon: Images.iconIndustryWholesale, name: "Wholesale" },
  { icon: Images.iconIndustryEducation, name: "Education" },
  { icon: Images.iconIndustryNonprofits, name: "Nonprofits" },
  { icon: Images.iconIndustryHealthcare, name: "Healthcare" },
  { icon: Images.iconIndustryEcommerce, name: "E-commerce" },
  { icon: Images.iconIndustryPrivateEquity, name: "Private Equity" },
  { icon: Images.iconIndustryManufacturing, name: "Manufacturing" },
  { icon: Images.iconIndustryFinancialServices, name: "Financial Services" },
];

const FAQS = [
  {
    question: "What is an Enterprise AI Readiness Assessment?",
    answer:
      "A structured evaluation of your organization's ability to successfully adopt and scale AI. It examines your strategy, data quality, technology infrastructure, business processes, talent capabilities, and governance frameworks to identify gaps and build a prioritized AI roadmap.",
  },
  {
    question: "How long does Mirketa's assessment take?",
    answer: "Typically 3–4 weeks for mid-sized enterprises, and up to 6 weeks for large, complex organizations.",
  },
  {
    question: "Which industries does Mirketa specialize in?",
    answer: "Healthcare, financial services, manufacturing, retail, technology, and professional services — each backed by industry-specific use case libraries.",
  },
  {
    question: "What do we receive at the end?",
    answer: "A comprehensive report including your maturity score, gap analysis, prioritized use cases, implementation roadmap, ROI forecasts, and governance recommendations.",
  },
  {
    question: "How is Mirketa's assessment different from generic audits?",
    answer: "It's grounded in hands-on enterprise implementation experience — we evaluate through the lens of what it actually takes to deploy AI successfully, not just theory.",
  },
  {
    question: "Can Mirketa help with implementation?",
    answer: "Absolutely. Mirketa offers end-to-end AI transformation services, from assessment and strategy through implementation, change management, and ongoing optimization.",
  },
  {
    question: "Is it suitable for organizations with no existing AI?",
    answer: "Yes. Organizations at the earliest stages benefit most from the assessment — it provides a clear starting point and prevents costly mistakes.",
  },
];

const SEO = {
  title: "AI Readiness Assessment Services | Mirketa",
  description:
    "Find out if your organization is truly ready for AI. Mirketa's structured readiness assessment scores 6 dimensions and delivers a board-ready roadmap.",
  canonical: "https://www.mirketa.com/ai-readiness/",
  keywords: [
    "AI Readiness Assessment",
    "Enterprise AI Readiness",
    "AI Maturity Assessment",
    "AI Strategy",
    "AI Roadmap",
    "Digital Transformation Assessment",
    "AI Governance",
    "AI Implementation Planning",
    "AI readiness assessment services",
    "enterprise AI readiness evaluation",
    "AI maturity score and roadmap",
    "is my organization ready for AI",
  ],
  schema: [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "AI Readiness Assessment",
      provider: { "@type": "Organization", name: "Mirketa Inc.", url: "https://www.mirketa.com" },
      name: "Enterprise AI Readiness Assessment",
      description:
        "A structured assessment evaluating six critical dimensions of your business, delivering a prioritized, board-ready AI roadmap.",
      areaServed: "Global",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.mirketa.com/" },
        { "@type": "ListItem", position: 2, name: "AI Readiness Assessment", item: "https://www.mirketa.com/ai-readiness/" },
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
  heading: "Get Your Free AI Readiness Assessment",
  paragraph: "Schedule a discovery call and find out exactly where your organization stands — and what to do next.",
  primaryCta: { label: "Schedule Discovery Call", href: "#contact" },
  secondaryCta: { label: "Find Your Maturity Level", href: "#maturity" },
};

const CONTACT = {
  heading: "Schedule Your AI Readiness Assessment",
  paragraph: "Tell us about your organization and one of our AI strategists will follow up within one business day to schedule your assessment.",
  benefits: ["No-obligation discovery call", "Assessment scoped to your industry", "Response within one business day"],
};

const CONSULTATION = {
  eyebrow: "Get Started",
  heading: "Schedule an AI Readiness Consultation",
  description: CONTACT.paragraph,
  benefits: CONTACT.benefits,
  formTitle: "Get My Free Assessment",
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

const SEVERITY_CLASS = { High: "sev-high", Medium: "sev-medium", Low: "sev-low" };

// ============================================================
// PAGE
// ============================================================
export default function AIReadiness() {
  const heroTextRef = useRef(null);
  const ripple = useRipple();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(heroTextRef.current.children, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
      });

      gsap.utils.toArray(".ar-reveal").forEach((el) => {
        gsap.from(el, {
          y: 32,
          opacity: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      gsap.utils.toArray(".ar-reveal-stagger").forEach((group) => {
        gsap.from(group.children, {
          y: 26,
          opacity: 0,
          duration: 0.6,
          stagger: 0.09,
          ease: "power2.out",
          scrollTrigger: { trigger: group, start: "top 85%" },
        });
      });

      gsap.utils.toArray(".ar-zigzag-row, .ar-reveal-slide").forEach((row, i) => {
        gsap.from(row, {
          x: i % 2 === 0 ? -30 : 30,
          opacity: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: row, start: "top 85%" },
        });
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="ai-readiness">
      <Seo {...SEO} />
      <HeroSection ripple={ripple} textRef={heroTextRef} />
      <ProblemSection />
      <MaturitySection />
      <FrameworkSection />
      <TiersSection />
      <RiskSection />
      <ProcessSection />
      <DeliverablesSection />
      <WhyMirketaSection />
      <ServicesSection />
      <IndustriesSection />
      <FaqSection />
      <FinalCtaSection ripple={ripple} />
      <ContactSection />
    </div>
  );
}

// ================= HERO =================
function HeroSection({ ripple, textRef }) {
  return (
    <section className="ar-hero" aria-label="AI Readiness Assessment introduction" style={{ backgroundImage: `url("${Images.heroAiReadiness}")` }}>
      <div className="ar-hero__overlay" />
      <div className="container">
        <Breadcrumb items={BREADCRUMB_ITEMS} className="ar-breadcrumb" />
      </div>
      <div className="container ar-hero__inner">
        <div className="ar-hero__text" ref={textRef}>
          <span className="ar-eyebrow">{HERO.eyebrow}</span>
          <h1>{HERO.heading}</h1>
          <p className="ar-hero__subheading">{HERO.subheading}</p>
          <p className="ar-hero__paragraph">{HERO.paragraph}</p>
          <div className="ar-hero__ctas">
            <a href={HERO.primaryCta.href} className="btn btn-primary ar-btn" onClick={ripple}>
              {HERO.primaryCta.label}
              <span className="btn-arrow">&rarr;</span>
            </a>
            <a href={HERO.secondaryCta.href} className="btn btn-secondary ar-btn">
              {HERO.secondaryCta.label}
            </a>
          </div>
        </div>
      </div>

      <div className="container ar-hero__stats-wrap">
        <div className="ar-hero__stats">
          {HERO_STATS.map((stat) => (
            <StatItem stat={stat} key={stat.label} />
          ))}
        </div>
      </div>

      <button
        className="ar-scroll-indicator"
        aria-label="Scroll to next section"
        onClick={() => document.getElementById("ar-problem")?.scrollIntoView({ behavior: "smooth" })}
      >
        <span />
      </button>
    </section>
  );
}

function StatItem({ stat }) {
  const [ref, inView] = useInView({ threshold: 0.4 });
  const display = useCountUp(stat.value, inView, 1500, stat.decimals);
  return (
    <div className="ar-glass-stat" ref={ref}>
      <p className="ar-glass-stat__value">
        {display}
        {stat.suffix}
      </p>
      <p className="ar-glass-stat__label">{stat.label}</p>
    </div>
  );
}

// ================= THE ENTERPRISE AI PROBLEM =================
function ProblemSection() {
  return (
    <section className="section ar-problem" id="ar-problem" aria-labelledby="ar-problem-heading">
      <div className="content-wrap">
        <div className="section-heading ar-reveal">
          <span className="ar-eyebrow">The Enterprise AI Problem</span>
          <h2 id="ar-problem-heading">Six Reasons Enterprise AI Initiatives Stall</h2>
        </div>

        <div className="ar-problem__zigzag">
          {PROBLEMS.map((p, i) => (
            <div className={`ar-zigzag-row ${i % 2 === 1 ? "is-reversed" : ""}`} key={p.title}>
              <div className="ar-zigzag-row__icon">
                <img src={p.icon} alt="" width="32" height="32" loading="lazy" />
              </div>
              <div className="ar-zigzag-row__content">
                <span className="ar-zigzag-row__index">{String(i + 1).padStart(2, "0")}</span>
                <h3>{p.title}</h3>
                <p>{p.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="ar-citations ar-reveal-stagger">
          {RESEARCH_CITATIONS.map((c) => (
            <div className="ar-citation" key={c.detail}>
              <strong>{c.stat}</strong>
              <p>{c.detail}</p>
              <small>{c.source}</small>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ================= AI MATURITY MODEL =================
function MaturitySection() {
  return (
    <section className="section ar-maturity" id="ar-maturity" aria-labelledby="ar-maturity-heading">
      <div className="content-wrap">
        <div className="section-heading ar-reveal">
          <span className="ar-eyebrow">Where Do You Stand?</span>
          <h2 id="ar-maturity-heading">The AI Maturity Model</h2>
        </div>

        <div className="ar-maturity__track ar-reveal-stagger">
          {MATURITY_LEVELS.map((lvl, i) => (
            <div className="ar-maturity__stop" key={lvl.level}>
              <div className="ar-maturity__connector" aria-hidden={i === 0} style={{ opacity: i === 0 ? 0 : 1 }} />
              <span className="ar-maturity__dot">{lvl.level}</span>
              <h3>{lvl.label}</h3>
              <p>{lvl.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ================= ASSESSMENT FRAMEWORK — 6 DIMENSIONS =================
function FrameworkSection() {
  const [activeId, setActiveId] = useState(FRAMEWORK_DIMENSIONS[0].id);
  const active = FRAMEWORK_DIMENSIONS.find((d) => d.id === activeId);

  return (
    <section className="section ar-framework" id="framework" aria-labelledby="ar-framework-heading">
      <div className="content-wrap">
        <div className="ar-framework__head ar-reveal">
          <div className="section-heading">
            <span className="ar-eyebrow">The Assessment Framework</span>
            <h2 id="ar-framework-heading">Six Dimensions of AI Readiness</h2>
          </div>
          <img src={Images.illoAiReadinessMaturityScorecard} alt="" aria-hidden="true" className="ar-framework__illo" loading="lazy" />
        </div>

        <div className="ar-framework__tabs" role="tablist" aria-label="Assessment dimensions">
          {FRAMEWORK_DIMENSIONS.map((d) => (
            <button
              key={d.id}
              role="tab"
              aria-selected={d.id === activeId}
              aria-controls={`ar-framework-panel-${d.id}`}
              id={`ar-framework-tab-${d.id}`}
              className={`ar-framework__tab ${d.id === activeId ? "is-active" : ""}`}
              onClick={() => setActiveId(d.id)}
            >
              <span className="ar-framework__tab-icon">
                <img src={d.icon} alt="" width="24" height="24" />
              </span>
              {d.title}
            </button>
          ))}
        </div>

        <div
          className="ar-framework__panel"
          role="tabpanel"
          id={`ar-framework-panel-${active.id}`}
          aria-labelledby={`ar-framework-tab-${active.id}`}
          key={active.id}
        >
          <div className="ar-framework__panel-head">
            <h3>{active.title}</h3>
            <span>{active.subtitle}</span>
          </div>
          <ul>
            {active.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

// ================= USE CASE READINESS TIERS =================
function TiersSection() {
  return (
    <section className="section ar-tiers" aria-labelledby="ar-tiers-heading">
      <div className="content-wrap">
        <div className="section-heading ar-reveal">
          <span className="ar-eyebrow">Prioritization</span>
          <h2 id="ar-tiers-heading">Use Case Readiness Tiers</h2>
        </div>

        <div className="ar-tiers__grid ar-reveal-stagger">
          {TIERS.map((tier) => (
            <div className={`ar-tier-card ar-tier-card--${tier.accent}`} key={tier.title}>
              <div className="ar-tier-card__head">
                <span className="ar-tier-card__icon">
                  <img src={tier.icon} alt="" width="26" height="26" />
                </span>
                <span className="ar-tier-card__timeframe">{tier.timeframe}</span>
              </div>
              <h3>{tier.title}</h3>
              <ul>
                {tier.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ================= RISK & ADOPTION ASSESSMENT =================
function RiskSection() {
  return (
    <section className="section ar-risk" aria-labelledby="ar-risk-heading">
      <div className="content-wrap">
        <div className="section-heading ar-reveal">
          <span className="ar-eyebrow">Plan For It</span>
          <h2 id="ar-risk-heading">Risk & Adoption Assessment</h2>
        </div>

        <div className="ar-risk__groups">
          {RISK_GROUPS.map((group) => (
            <div className="ar-risk-group ar-reveal" key={group.title}>
              <div className="ar-risk-group__head">
                <img src={group.icon} alt="" width="24" height="24" />
                <h3>{group.title}</h3>
              </div>
              <table className="ar-risk-table">
                <thead>
                  <tr>
                    <th scope="col">Risk</th>
                    <th scope="col">Severity</th>
                    <th scope="col">Mitigation</th>
                  </tr>
                </thead>
                <tbody>
                  {group.risks.map((r) => (
                    <tr key={r.risk}>
                      <td>{r.risk}</td>
                      <td>
                        <span className={`ar-severity-pill ${SEVERITY_CLASS[r.severity]}`}>{r.severity}</span>
                      </td>
                      <td>{r.mitigation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ================= ASSESSMENT PROCESS — 5 WEEKS =================
function ProcessSection() {
  return (
    <section className="section ar-process" aria-labelledby="ar-process-heading">
      <div className="content-wrap">
        <div className="section-heading ar-reveal">
          <span className="ar-eyebrow">How It Works</span>
          <h2 id="ar-process-heading">The Assessment Process — 5 Weeks</h2>
        </div>

        <div className="ar-process__timeline">
          {PROCESS_STEPS.map((step, i) => (
            <div className={`ar-process-step ${i % 2 === 1 ? "is-reversed" : ""} ar-reveal-slide`} key={step.title}>
              <div className="ar-process-step__content">
                <span className="ar-process-step__week">{step.week}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
              <div className="ar-process-step__marker">{i + 1}</div>
              <div className="ar-process-step__spacer" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ================= DELIVERABLES =================
function DeliverablesSection() {
  return (
    <section className="section ar-deliverables" aria-labelledby="ar-deliverables-heading">
      <div className="content-wrap">
        <div className="section-heading ar-reveal">
          <span className="ar-eyebrow">What You Get</span>
          <h2 id="ar-deliverables-heading">Deliverables</h2>
        </div>

        <div className="ar-deliverables__grid ar-reveal-stagger">
          {DELIVERABLES.map((d) => (
            <div className="ar-deliverable-card" key={d.title}>
              <span className="ar-deliverable-card__icon">
                <img src={d.icon} alt="" width="30" height="30" loading="lazy" />
              </span>
              <h3>{d.title}</h3>
              <p>{d.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ================= WHY MIRKETA =================
function WhyMirketaSection() {
  return (
    <section className="section ar-why" aria-labelledby="ar-why-heading">
      <div className="content-wrap">
        <div className="section-heading ar-reveal">
          <span className="ar-eyebrow">Why Mirketa</span>
          <h2 id="ar-why-heading">Why Enterprises Choose Mirketa</h2>
        </div>

        <div className="ar-why__list ar-reveal-stagger">
          {WHY_MIRKETA.map((w, i) => (
            <div className="ar-why-item" key={w.title}>
              <span className="ar-why-item__index">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3>{w.title}</h3>
                <p>{w.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ================= SERVICES OFFERED (CATEGORY TABS + PANEL) =================
function ServicesSection() {
  const [activeTitle, setActiveTitle] = useState(SERVICE_GROUPS[0].title);
  const active = SERVICE_GROUPS.find((g) => g.title === activeTitle);

  return (
    <section className="section ar-services" aria-labelledby="ar-services-heading">
      <div className="content-wrap">
        <div className="section-heading ar-reveal">
          <span className="ar-eyebrow">Full-Stack Delivery</span>
          <h2 id="ar-services-heading">Services Offered</h2>
          <p>Readiness is only step one — Mirketa delivers across the entire enterprise technology estate.</p>
        </div>

        <div className="ar-services__tabs ar-reveal" role="tablist" aria-label="Service categories">
          {SERVICE_GROUPS.map((group) => {
            const isActive = group.title === activeTitle;
            return (
              <button
                key={group.title}
                role="tab"
                id={`ar-services-tab-${group.title}`}
                aria-selected={isActive}
                aria-controls={`ar-services-panel-${group.title}`}
                className={`ar-services__tab ${isActive ? "is-active" : ""}`}
                onClick={() => setActiveTitle(group.title)}
              >
                <span className="ar-services__tab-icon">
                  <img src={group.icon} alt="" width="18" height="18" />
                </span>
                {group.title}
              </button>
            );
          })}
        </div>

        <div
          className="ar-services__panel ar-reveal"
          role="tabpanel"
          id={`ar-services-panel-${active.title}`}
          aria-labelledby={`ar-services-tab-${active.title}`}
          key={active.title}
        >
          <div className="ar-services__panel-header">
            <span className="ar-services__panel-icon">
              <img src={active.icon} alt="" width="26" height="26" />
            </span>
            <div>
              <h3>{active.title}</h3>
              <p>{active.description}</p>
            </div>
          </div>

          <ul className="ar-services__list">
            {active.items.map((item) => (
              <li key={item.label}>
                <Link to={item.href} className="ar-services__item">
                  <span className="ar-services__item-icon" aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12.5l5 5L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="ar-services__item-title">{item.label}</span>
                  <span className="ar-services__item-arrow" aria-hidden="true">
                    &rarr;
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

// ================= INDUSTRIES SERVED =================
function IndustriesSection() {
  return (
    <section className="section ar-industries" aria-labelledby="ar-industries-heading">
      <div className="content-wrap">
        <div className="section-heading ar-reveal">
          <span className="ar-eyebrow">Industries Served</span>
          <h2 id="ar-industries-heading">Readiness Assessments Built for Your Sector</h2>
        </div>

        <div className="ar-industries__chips ar-reveal-stagger">
          {INDUSTRIES.map((ind) => (
            <div className="ar-industry-chip" key={ind.name}>
              <img src={ind.icon} alt="" width="22" height="22" loading="lazy" />
              <span>{ind.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ================= FAQ =================
function FaqItem({ faq, isOpen, onToggle, index }) {
  return (
    <div className={`ar-faq-item ${isOpen ? "is-open" : ""}`}>
      <h3>
        <button
          className="ar-faq-item__trigger"
          aria-expanded={isOpen}
          aria-controls={`ar-faq-panel-${index}`}
          id={`ar-faq-trigger-${index}`}
          onClick={onToggle}
        >
          <span className="ar-faq-item__toggle" aria-hidden="true">
            {isOpen ? "−" : "+"}
          </span>
          {faq.question}
        </button>
      </h3>
      <div className="ar-faq-item__panel" id={`ar-faq-panel-${index}`} role="region" aria-labelledby={`ar-faq-trigger-${index}`}>
        <p>{faq.answer}</p>
      </div>
    </div>
  );
}

function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);
  return (
    <section className="section ar-faq" aria-labelledby="ar-faq-heading">
      <div className="content-wrap ar-faq__wrap">
        <div className="section-heading ar-reveal">
          <span className="ar-eyebrow">FAQ</span>
          <h2 id="ar-faq-heading">Frequently Asked Questions</h2>
        </div>
        <div className="ar-faq__list ar-reveal">
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
    <section className="section ar-final-cta" aria-labelledby="ar-final-cta-heading">
      <div className="content-wrap ar-final-cta__inner ar-reveal">
        <h2 id="ar-final-cta-heading">{FINAL_CTA.heading}</h2>
        <p>{FINAL_CTA.paragraph}</p>
        <div className="ar-final-cta__ctas">
          <a href={FINAL_CTA.primaryCta.href} className="btn btn-primary ar-btn" onClick={ripple}>
            {FINAL_CTA.primaryCta.label}
            <span className="btn-arrow">&rarr;</span>
          </a>
          <a href={FINAL_CTA.secondaryCta.href} className="btn btn-secondary ar-btn">
            {FINAL_CTA.secondaryCta.label}
          </a>
        </div>
      </div>
    </section>
  );
}

// ================= CONTACT =================
function ContactSection() {
  return <ConsultationSection {...CONSULTATION} />;
}
