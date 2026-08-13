import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Images } from "../../assets/images/index.js";
import Seo from "../../components/Seo/Seo.jsx";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb.jsx";
import ConsultationSection from "../../components/ConsultationSection/ConsultationSection.jsx";
import "./AIRoadmapGovernance.css";

const BREADCRUMB_ITEMS = [{ label: "Home", href: "/" }, { label: "AI Roadmap Governance" }];

gsap.registerPlugin(ScrollTrigger);

// ============================================================
// DATA
// ============================================================

const HERO = {
  eyebrow: "AI Roadmap Governance",
  heading: "Build a Governed AI Roadmap That Moves from Strategy to Scale",
  subheading: "From Scattered AI Pilots to a Sequenced, Accountable Program",
  paragraph:
    "Most enterprises run AI as a series of disconnected pilots with no shared prioritization logic and no consistent oversight. AI roadmap governance replaces that pattern with a structured plan — one that sequences use cases by business value and feasibility, assigns clear ownership, and puts data, security, and responsible-AI controls in place before initiatives reach production.",
  primaryCta: { label: "Talk to an AI Expert", href: "#contact" },
  secondaryCta: { label: "Build Your AI Roadmap", href: "#framework" },
};

const INTRO = {
  eyebrow: "Why It Matters",
  heading: "AI Initiatives Without Governance Rarely Scale",
  paragraphs: [
    "AI programs tend to start as isolated experiments — a chatbot pilot here, a forecasting model there — each sponsored by a different team, evaluated against different criteria, and rarely connected to a shared business case. Without a roadmap, that pattern is difficult to break: leadership loses visibility into which initiatives are working, budget gets allocated to whichever proposal is loudest rather than most valuable, and there is no consistent way to manage the security, compliance, and operational risk each initiative introduces.",
    "AI roadmap governance establishes the decision rights, controls, ownership, and monitoring required to move AI initiatives from experimentation into production. It gives leadership a single, business-aligned plan for what gets built, in what order, under what oversight, and how success is measured.",
  ],
};

const VALUE_CARDS = [
  { title: "Strategic Alignment", description: "Prioritize AI initiatives against the business outcomes they are meant to support, not against which team asks first." },
  { title: "Governance & Risk", description: "Establish controls across data, security, compliance, and responsible AI before initiatives move into production." },
  { title: "Prioritization", description: "Evaluate AI opportunities on value, feasibility, and data readiness so effort goes where it will actually pay off." },
  { title: "Execution Roadmap", description: "Turn strategy and priorities into a sequenced, resourced plan with clear ownership at every stage." },
];

const STAGES = [
  { num: "01", title: "Assess", description: "Evaluate current AI maturity across business, data, technology, security, governance, talent, and operating model.", outcome: "A documented readiness baseline" },
  { num: "02", title: "Align", description: "Connect potential AI initiatives to specific business objectives and executive sponsors.", outcome: "Confirmed executive sponsorship" },
  { num: "03", title: "Prioritize", description: "Score candidate use cases on business value, feasibility, data availability, and risk.", outcome: "A ranked, defensible use-case list" },
  { num: "04", title: "Govern", description: "Define decision rights, controls, and policies for data, security, privacy, and responsible AI.", outcome: "An approved governance framework" },
  { num: "05", title: "Execute", description: "Deliver initiatives in sequence, starting with pilots and scaling what proves out.", outcome: "Production-ready AI initiatives" },
  { num: "06", title: "Measure", description: "Track initiatives against the KPIs and success criteria defined during alignment.", outcome: "Objective evidence of business impact" },
  { num: "07", title: "Optimize", description: "Revisit priorities, retire what isn't working, and reallocate capacity to what is.", outcome: "A roadmap that stays current" },
];

const READINESS = {
  eyebrow: "Before You Build the Roadmap",
  heading: "Seven Dimensions of AI Readiness",
  intro:
    "A roadmap is only as good as the assessment it's built on. Each of these dimensions surfaces gaps that, left unaddressed, tend to stall AI initiatives after they've already consumed budget and attention.",
  dimensions: [
    { icon: Images.iconDimensionBusiness, title: "Business Readiness", description: "Whether AI initiatives map to specific business objectives with defined ownership and executive sponsorship." },
    { icon: Images.iconDimensionData, title: "Data Readiness", description: "The quality, completeness, and accessibility of the data each initiative depends on." },
    { icon: Images.iconDimensionTechnology, title: "Technology Readiness", description: "Whether your cloud, integration, and application architecture can support the initiatives you're planning." },
    { icon: Images.iconDimensionSecurity, title: "Security Readiness", description: "Whether access controls, data protection, and monitoring are in place before AI touches production data." },
    { icon: Images.iconDimensionGovernance, title: "Governance Readiness", description: "Whether decision rights, policies, and oversight structures exist to approve and monitor AI initiatives." },
    { icon: Images.iconDimensionTalent, title: "Talent Readiness", description: "Whether the skills and cross-functional literacy needed to build, run, and govern AI initiatives are in place." },
    { icon: Images.iconDimensionProcess, title: "Operating Model Readiness", description: "Whether workflows, ownership, and change management practices can absorb AI-driven changes to how work gets done." },
  ],
};

const PRIORITIZATION = {
  eyebrow: "Use-Case Prioritization",
  heading: "Decide What Moves First",
  paragraph:
    "Not every AI opportunity deserves the same attention. Candidate use cases are evaluated against business value, technical feasibility, data availability, implementation complexity, risk, regulatory impact, time to value, and strategic alignment — then plotted against value and complexity to decide sequencing.",
  factors: ["Business Value", "Technical Feasibility", "Data Availability", "Implementation Complexity", "Risk", "Regulatory Impact", "Time to Value", "Strategic Alignment"],
};

const MATRIX = [
  { tone: "prioritize", axis: "High Value · Low Complexity", action: "Prioritize First", description: "Clear business impact with a manageable path to production — the initiatives that should anchor an early roadmap." },
  { tone: "strategic", axis: "High Value · High Complexity", action: "Strategic Roadmap", description: "Meaningful impact that requires sustained investment — sequence these deliberately rather than rushing them." },
  { tone: "opportunistic", axis: "Low Value · Low Complexity", action: "Opportunistic", description: "Worth doing when capacity allows, but shouldn't compete with higher-value work for resources." },
  { tone: "deprioritize", axis: "Low Value · High Complexity", action: "Deprioritize", description: "Limited business case relative to the effort required — revisit only if the underlying conditions change." },
];

const GOVERNANCE = {
  eyebrow: "Governance Model",
  heading: "Governance Is Continuous, Not a Sign-Off",
  intro:
    "A one-time approval at project kickoff doesn't hold up once an AI initiative reaches production. Mirketa's governance model treats oversight as an ongoing responsibility spanning strategy through operations.",
  pillars: [
    { title: "Strategy & Alignment", description: "Keeping the roadmap connected to current business priorities as they shift." },
    { title: "Data Governance", description: "Ownership, quality standards, and access policies for the data AI initiatives depend on." },
    { title: "Security & Privacy", description: "Access controls, data protection, and privacy-by-design requirements for every initiative." },
    { title: "Responsible AI", description: "Fairness, transparency, and explainability standards applied consistently across initiatives." },
    { title: "Regulatory Compliance", description: "Alignment with the regulatory requirements relevant to your industry and geography." },
    { title: "Model Lifecycle", description: "Version control, retraining triggers, and retirement criteria for every model in production." },
    { title: "Human Oversight", description: "Defined points where a person reviews or can override an AI-driven decision." },
    { title: "Monitoring & Performance", description: "Ongoing tracking of accuracy, drift, and business impact after go-live." },
    { title: "Change Management", description: "Communication, training, and adoption support as AI changes how teams work." },
  ],
};

const PHASES = [
  {
    title: "AI Strategy & Assessment",
    objective: "Establish where the organization stands and what it's trying to achieve.",
    activities: ["Stakeholder interviews across business and IT", "Readiness assessment across all seven dimensions", "Definition of target business outcomes"],
    outcome: "A documented baseline and set of guiding objectives.",
  },
  {
    title: "Use-Case Discovery & Prioritization",
    objective: "Build a ranked, defensible list of AI opportunities.",
    activities: ["Workshops to surface candidate use cases", "Scoring against value, feasibility, and risk", "Sequencing into an initial roadmap draft"],
    outcome: "A prioritized use-case backlog.",
  },
  {
    title: "Governance Framework",
    objective: "Put decision rights and controls in place before execution begins.",
    activities: ["Define governance structure and decision rights", "Establish data, security, and responsible-AI policies", "Assign accountable owners per initiative"],
    outcome: "An approved governance framework ready to apply.",
  },
  {
    title: "Pilot & Validation",
    objective: "Prove out the highest-priority use cases at limited scale.",
    activities: ["Scope and deliver pilots for top-ranked use cases", "Validate assumptions on data, integration, and value", "Apply governance controls from day one"],
    outcome: "Evidence-based go/no-go decisions for scaling.",
  },
  {
    title: "Production Scaling",
    objective: "Move validated initiatives into production and to additional teams or geographies.",
    activities: ["Harden pilots for production reliability and scale", "Extend governance monitoring to live initiatives", "Expand successful pilots to additional business units"],
    outcome: "AI initiatives operating at production scale under governance.",
  },
  {
    title: "Continuous Optimization",
    objective: "Keep the roadmap current as priorities and results change.",
    activities: ["Review performance against defined KPIs", "Reprioritize based on new opportunities or constraints", "Retire or retool initiatives that underperform"],
    outcome: "A roadmap that adapts rather than goes stale.",
  },
];

const OUTCOMES = [
  { title: "Better AI Investment Decisions", description: "Budget and attention go to the initiatives most likely to deliver business value." },
  { title: "Reduced Implementation Risk", description: "Security, compliance, and responsible-AI considerations are addressed before, not after, go-live." },
  { title: "Faster Movement from Pilot to Production", description: "A clear governance framework removes the ambiguity that stalls initiatives after a successful pilot." },
  { title: "Clear Ownership", description: "Every initiative has an accountable owner, not a diffuse group of interested stakeholders." },
  { title: "Stronger Cross-Functional Alignment", description: "Business, IT, data, and security teams work from the same prioritized plan." },
  { title: "Durable Governance", description: "Oversight structures that hold up as more initiatives move into production." },
  { title: "Measurable AI Outcomes", description: "KPIs defined at the start make it possible to evaluate results objectively." },
  { title: "A Scalable AI Operating Model", description: "A roadmap and governance framework that keep working as the AI portfolio grows." },
];

const WHY_MIRKETA = [
  { title: "Enterprise Transformation Experience", description: "Over a decade delivering digital transformation, CRM, ERP, and cloud initiatives for enterprise clients." },
  { title: "Salesforce Crest Partner Since 2013", description: "Certified expertise across the Salesforce ecosystem, including Salesforce Einstein and Agentforce." },
  { title: "AI Consulting and Implementation, End to End", description: "From readiness assessment and roadmap design through agent development and production support." },
  { title: "Data Foundations Expertise", description: "Experience unifying and preparing data across CRM, ERP, and legacy systems — the foundation most AI initiatives depend on." },
  { title: "Governance-Minded Delivery", description: "Security, compliance, and responsible-AI considerations built into how initiatives are scoped, not added on afterward." },
  { title: "Enterprise Integration Capability", description: "Experience connecting AI initiatives into existing systems rather than standing them up in isolation." },
];

const RELATED_SERVICES = [
  { title: "AI Readiness Assessment", description: "Score your organization across seven readiness dimensions before committing budget.", href: "/ai-readiness" },
  { title: "AI Consulting", description: "Strategic guidance for enterprise AI adoption, from use case to architecture.", href: "/ai-consulting" },
  { title: "AI Enablement", description: "Build the internal capability needed to run AI initiatives beyond the first pilot.", href: "/ai-enablement" },
  { title: "AI Data Foundations", description: "Unify and prepare the data your AI roadmap depends on.", href: "/ai-data-foundations" },
  { title: "Agentic Orchestration & Legacy Integration", description: "Connect AI agents to the systems that already run your business.", href: "/agentic-orchestration" },
  { title: "Agent Development", description: "Design and build the AI agents your roadmap prioritizes.", href: "/agent-development" },
];

const FAQS = [
  {
    question: "What is AI roadmap governance?",
    answer:
      "AI roadmap governance is the combination of a sequenced implementation plan and the decision rights, controls, and monitoring needed to move AI initiatives from experimentation into production responsibly.",
  },
  {
    question: "Why does an enterprise need an AI roadmap?",
    answer:
      "Without a roadmap, AI initiatives tend to run as disconnected pilots with no shared prioritization logic. A roadmap gives leadership a single, sequenced plan for what gets built, in what order, and why.",
  },
  {
    question: "How do you prioritize AI use cases?",
    answer:
      "Candidate use cases are scored against business value, technical feasibility, data availability, implementation complexity, risk, regulatory impact, time to value, and strategic alignment, then sequenced accordingly.",
  },
  {
    question: "What should an AI governance framework include?",
    answer:
      "At minimum: decision rights and ownership, data and security controls, responsible-AI standards, regulatory compliance requirements, model lifecycle management, human oversight points, and ongoing performance monitoring.",
  },
  {
    question: "How do you align AI initiatives with business strategy?",
    answer:
      "Each candidate initiative is connected to a specific business objective and an accountable executive sponsor before it's added to the roadmap — initiatives without a clear business case don't move forward.",
  },
  {
    question: "How often should an AI roadmap be updated?",
    answer:
      "Roadmaps should be reviewed on a regular cadence, typically quarterly, and whenever a major shift in business priorities, regulation, or results warrants reprioritization.",
  },
  {
    question: "How does AI governance reduce implementation risk?",
    answer:
      "By addressing data quality, security, compliance, and responsible-AI requirements before an initiative reaches production, rather than discovering gaps after it's already been deployed.",
  },
];

const SEO = {
  title: "AI Roadmap Governance | Mirketa",
  description:
    "Create a governed AI roadmap aligned with business goals, use-case priorities, data readiness, risk, and scalable enterprise AI execution.",
  canonical: "https://www.mirketa.com/ai-roadmap-governance/",
  keywords: [
    "AI Roadmap Governance",
    "AI roadmap",
    "AI governance",
    "enterprise AI strategy",
    "AI strategy roadmap",
    "AI governance framework",
    "AI use case prioritization",
    "AI implementation roadmap",
    "responsible AI governance",
    "enterprise AI governance",
  ],
  schema: [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "AI Roadmap Governance",
      provider: { "@type": "Organization", name: "Mirketa Inc.", url: "https://www.mirketa.com" },
      name: "AI Roadmap Governance",
      description:
        "A structured approach to building, governing, prioritizing, and continuously optimizing an enterprise AI roadmap.",
      areaServed: "Global",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.mirketa.com/" },
        { "@type": "ListItem", position: 2, name: "AI Roadmap Governance", item: "https://www.mirketa.com/ai-roadmap-governance/" },
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
  heading: "Turn Your AI Strategy Into a Governed Roadmap",
  paragraph: "Get a structured, business-aligned plan for what to build, in what order, and under what governance — before you commit further budget to AI.",
  primaryCta: { label: "Talk to an AI Expert", href: "#contact" },
  secondaryCta: { label: "Book a Discovery Call", href: "#contact" },
};

const CONSULTATION = {
  eyebrow: "Get Started",
  heading: "Schedule an AI Roadmap Consultation",
  description: "Tell us about your AI initiatives and goals, and one of our AI strategists will follow up within one business day.",
  benefits: ["No-obligation discovery call", "Guidance scoped to your industry and current AI maturity", "Response within one business day"],
  formTitle: "Talk to an AI Expert",
};

// ============================================================
// SHARED HOOKS — scoped to this page.
// ============================================================

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

// ============================================================
// PAGE
// ============================================================
export default function AIRoadmapGovernance() {
  const heroTextRef = useRef(null);
  const ripple = useRipple();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.from(heroTextRef.current.children, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
      });

      gsap.utils.toArray(".arg-reveal").forEach((el) => {
        gsap.from(el, {
          y: 32,
          opacity: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      gsap.utils.toArray(".arg-reveal-stagger").forEach((group) => {
        gsap.from(group.children, {
          y: 26,
          opacity: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: { trigger: group, start: "top 85%" },
        });
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="ai-roadmap-governance">
      <Seo {...SEO} />
      <HeroSection ripple={ripple} textRef={heroTextRef} />
      <IntroSection />
      <FrameworkSection />
      <ReadinessSection />
      <PrioritizationSection />
      <GovernanceSection />
      <PhasesSection />
      <OutcomesSection />
      <WhyMirketaSection />
      <RelatedServicesSection />
      <FaqSection />
      <FinalCtaSection ripple={ripple} />
      <ContactSection />
    </div>
  );
}

// ================= HERO =================
function HeroSection({ ripple, textRef }) {
  return (
    <section className="arg-hero" aria-label="AI Roadmap Governance introduction" style={{ backgroundImage: `url("${Images.heroAiRoadmapGovernance}")` }}>
      <div className="arg-hero__overlay" />
      <div className="container">
        <Breadcrumb items={BREADCRUMB_ITEMS} className="arg-breadcrumb" />
      </div>
      <div className="container arg-hero__inner">
        <div className="arg-hero__text" ref={textRef}>
          <span className="arg-eyebrow">{HERO.eyebrow}</span>
          <h1>{HERO.heading}</h1>
          <p className="arg-hero__subheading">{HERO.subheading}</p>
          <p className="arg-hero__paragraph">{HERO.paragraph}</p>
          <div className="arg-hero__ctas">
            <a href={HERO.primaryCta.href} className="btn btn-primary arg-btn" onClick={ripple}>
              {HERO.primaryCta.label}
              <span className="btn-arrow">&rarr;</span>
            </a>
            <a href={HERO.secondaryCta.href} className="btn btn-secondary arg-btn">
              {HERO.secondaryCta.label}
            </a>
          </div>
        </div>
      </div>

      <button
        className="arg-scroll-indicator"
        aria-label="Scroll to next section"
        onClick={() => document.getElementById("arg-intro")?.scrollIntoView({ behavior: "smooth" })}
      >
        <span />
      </button>
    </section>
  );
}

// ================= INTRO / VALUE PROP =================
function IntroSection() {
  return (
    <section className="section arg-intro" id="arg-intro" aria-labelledby="arg-intro-heading">
      <div className="content-wrap">
        <div className="section-heading arg-reveal">
          <span className="arg-eyebrow">{INTRO.eyebrow}</span>
          <h2 id="arg-intro-heading">{INTRO.heading}</h2>
        </div>

        <div className="arg-intro__copy arg-reveal">
          {INTRO.paragraphs.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>

        <div className="arg-value__grid arg-reveal-stagger">
          {VALUE_CARDS.map((card) => (
            <div className="arg-value-card" key={card.title}>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ================= GOVERNANCE FRAMEWORK — 7 STAGES =================
function FrameworkSection() {
  return (
    <section className="section arg-framework" id="framework" aria-labelledby="arg-framework-heading">
      <div className="content-wrap">
        <div className="section-heading arg-reveal">
          <span className="arg-eyebrow">The Governance Framework</span>
          <h2 id="arg-framework-heading">A Roadmap Built in Seven Stages</h2>
        </div>

        <ol className="arg-stages">
          {STAGES.map((stage) => (
            <li className="arg-stage arg-reveal" key={stage.num}>
              <span className="arg-stage__num" aria-hidden="true">
                {stage.num}
              </span>
              <div className="arg-stage__body">
                <h3>{stage.title}</h3>
                <p>{stage.description}</p>
                <span className="arg-stage__outcome">
                  <strong>Outcome:</strong> {stage.outcome}
                </span>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

// ================= AI READINESS — 7 DIMENSIONS =================
function ReadinessSection() {
  return (
    <section className="section arg-readiness" id="arg-readiness" aria-labelledby="arg-readiness-heading">
      <div className="content-wrap">
        <div className="section-heading arg-reveal">
          <span className="arg-eyebrow">{READINESS.eyebrow}</span>
          <h2 id="arg-readiness-heading">{READINESS.heading}</h2>
          <p>{READINESS.intro}</p>
        </div>

        <div className="arg-readiness__grid arg-reveal-stagger">
          {READINESS.dimensions.map((d) => (
            <div className="arg-readiness-card" key={d.title}>
              <span className="arg-readiness-card__icon">
                <img src={d.icon} alt="" width="26" height="26" loading="lazy" />
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

// ================= USE-CASE PRIORITIZATION =================
function PrioritizationSection() {
  return (
    <section className="section arg-prioritization" id="arg-prioritization" aria-labelledby="arg-prioritization-heading">
      <div className="content-wrap">
        <div className="section-heading arg-reveal">
          <span className="arg-eyebrow">{PRIORITIZATION.eyebrow}</span>
          <h2 id="arg-prioritization-heading">{PRIORITIZATION.heading}</h2>
          <p>{PRIORITIZATION.paragraph}</p>
        </div>

        <ul className="arg-factors arg-reveal-stagger" aria-label="Prioritization factors">
          {PRIORITIZATION.factors.map((f) => (
            <li className="arg-factor-chip" key={f}>
              {f}
            </li>
          ))}
        </ul>

        <div className="arg-matrix-wrap arg-reveal">
          <div className="arg-matrix" role="list" aria-label="Prioritization matrix: value versus implementation complexity">
            {MATRIX.map((q) => (
              <div className={`arg-matrix-quadrant arg-matrix-quadrant--${q.tone}`} role="listitem" key={q.action}>
                <span className="arg-matrix-quadrant__axis">{q.axis}</span>
                <h3>{q.action}</h3>
                <p>{q.description}</p>
              </div>
            ))}
          </div>
          <div className="arg-matrix-axis arg-matrix-axis--y" aria-hidden="true">
            Business Value
          </div>
          <div className="arg-matrix-axis arg-matrix-axis--x" aria-hidden="true">
            Implementation Complexity
          </div>
        </div>
      </div>
    </section>
  );
}

// ================= GOVERNANCE MODEL =================
function GovernanceSection() {
  return (
    <section className="section arg-governance" id="arg-governance" aria-labelledby="arg-governance-heading">
      <div className="content-wrap">
        <div className="section-heading arg-reveal">
          <span className="arg-eyebrow">{GOVERNANCE.eyebrow}</span>
          <h2 id="arg-governance-heading">{GOVERNANCE.heading}</h2>
          <p>{GOVERNANCE.intro}</p>
        </div>

        <div className="arg-pillars arg-reveal-stagger">
          {GOVERNANCE.pillars.map((p) => (
            <div className="arg-pillar-card" key={p.title}>
              <h3>{p.title}</h3>
              <p>{p.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ================= ROADMAP PHASES =================
function PhasesSection() {
  return (
    <section className="section arg-phases" id="arg-phases" aria-labelledby="arg-phases-heading">
      <div className="content-wrap">
        <div className="section-heading arg-reveal">
          <span className="arg-eyebrow">Implementation Roadmap</span>
          <h2 id="arg-phases-heading">Six Phases, From Assessment to Continuous Optimization</h2>
        </div>

        <ol className="arg-phase-grid arg-reveal-stagger">
          {PHASES.map((phase, i) => (
            <li className="arg-phase-card" key={phase.title}>
              <span className="arg-phase-card__num">Phase {i + 1}</span>
              <h3>{phase.title}</h3>
              <p className="arg-phase-card__objective">{phase.objective}</p>
              <p className="arg-phase-card__label">Key Activities</p>
              <ul>
                {phase.activities.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
              <p className="arg-phase-card__outcome">
                <strong>Outcome:</strong> {phase.outcome}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

// ================= BUSINESS VALUE / OUTCOMES =================
function OutcomesSection() {
  return (
    <section className="section arg-outcomes" aria-labelledby="arg-outcomes-heading">
      <div className="content-wrap">
        <div className="section-heading arg-reveal">
          <span className="arg-eyebrow">Business Value</span>
          <h2 id="arg-outcomes-heading">What a Governed Roadmap Delivers</h2>
        </div>

        <div className="arg-outcomes__list arg-reveal-stagger">
          {OUTCOMES.map((o, i) => (
            <div className="arg-outcome-item" key={o.title}>
              <span className="arg-outcome-item__index">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3>{o.title}</h3>
                <p>{o.description}</p>
              </div>
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
    <section className="section arg-why" aria-labelledby="arg-why-heading">
      <div className="content-wrap">
        <div className="section-heading arg-reveal">
          <span className="arg-eyebrow">Why Mirketa</span>
          <h2 id="arg-why-heading">An Experienced Partner for AI Roadmap Governance</h2>
        </div>

        <div className="arg-why__grid arg-reveal-stagger">
          {WHY_MIRKETA.map((w) => (
            <div className="arg-why-card" key={w.title}>
              <h3>{w.title}</h3>
              <p>{w.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ================= RELATED AI SERVICES =================
function RelatedServicesSection() {
  return (
    <section className="section arg-related" aria-labelledby="arg-related-heading">
      <div className="content-wrap">
        <div className="section-heading arg-reveal">
          <span className="arg-eyebrow">Related AI Services</span>
          <h2 id="arg-related-heading">Supporting Services Across the AI Lifecycle</h2>
        </div>

        <div className="arg-related__grid arg-reveal-stagger">
          {RELATED_SERVICES.map((s) => (
            <Link to={s.href} className="arg-related-card" key={s.title}>
              <h3>{s.title}</h3>
              <p>{s.description}</p>
              <span className="arg-related-card__link">
                Learn More <span className="btn-arrow">&rarr;</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// ================= FAQ =================
function FaqItem({ faq, isOpen, onToggle, index }) {
  return (
    <div className={`arg-faq-item ${isOpen ? "is-open" : ""}`}>
      <h3>
        <button
          className="arg-faq-item__trigger"
          aria-expanded={isOpen}
          aria-controls={`arg-faq-panel-${index}`}
          id={`arg-faq-trigger-${index}`}
          onClick={onToggle}
        >
          <span className="arg-faq-item__toggle" aria-hidden="true">
            {isOpen ? "−" : "+"}
          </span>
          {faq.question}
        </button>
      </h3>
      <div className="arg-faq-item__panel" id={`arg-faq-panel-${index}`} role="region" aria-labelledby={`arg-faq-trigger-${index}`}>
        <p>{faq.answer}</p>
      </div>
    </div>
  );
}

function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);
  return (
    <section className="section arg-faq" aria-labelledby="arg-faq-heading">
      <div className="content-wrap arg-faq__wrap">
        <div className="section-heading arg-reveal">
          <span className="arg-eyebrow">FAQ</span>
          <h2 id="arg-faq-heading">Frequently Asked Questions</h2>
        </div>
        <div className="arg-faq__list arg-reveal">
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
    <section className="section arg-final-cta" aria-labelledby="arg-final-cta-heading">
      <div className="content-wrap arg-final-cta__inner arg-reveal">
        <h2 id="arg-final-cta-heading">{FINAL_CTA.heading}</h2>
        <p>{FINAL_CTA.paragraph}</p>
        <div className="arg-final-cta__ctas">
          <a href={FINAL_CTA.primaryCta.href} className="btn btn-primary arg-btn" onClick={ripple}>
            {FINAL_CTA.primaryCta.label}
            <span className="btn-arrow">&rarr;</span>
          </a>
          <a href={FINAL_CTA.secondaryCta.href} className="btn btn-secondary arg-btn">
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
