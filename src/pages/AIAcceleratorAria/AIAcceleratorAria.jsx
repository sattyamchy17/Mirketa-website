import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Images } from "../../assets/images/index.js";
import Seo from "../../components/Seo/Seo.jsx";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb.jsx";
import ConsultationSection from "../../components/ConsultationSection/ConsultationSection.jsx";
import "./AIAcceleratorAria.css";

const BREADCRUMB_ITEMS = [{ label: "Home", href: "/" }, { label: "AI Accelerator Aria" }];

gsap.registerPlugin(ScrollTrigger);

// ============================================================
// DATA — content sourced verbatim from
// https://mirketa.us/ai-accelerator-aria/
// ============================================================

const HERO = {
  badge: "AI Accelerator by Mirketa",
  title: "Salesforce RCA setup, dramatically faster.",
  description:
    "Aria is an AI-powered configurator that guides your team through every step of Salesforce Revenue Cloud Advanced setup — CPQ, Billing, and CLM — in days, not weeks.",
  supporting: "No cost to talk. Bring your catalog, and you'll see it live in a working configuration within 3 weeks.",
  primaryCta: { label: "Book a 20-Minute Call", href: "#contact" },
  secondaryCta: { label: "See What Aria Configures", href: "#how-it-works" },
};

const HERO_STATS = [
  { value: 13, suffix: "", display: null, label: "RCA Modules Covered" },
  { value: 30, suffix: "+", display: null, label: "Metadata Objects Automated" },
  { value: null, suffix: "", display: "Days", label: "Not Weeks, for Full Setup" },
  { value: 0, suffix: "", display: null, label: "AppExchange Installs Needed" },
];

const TRUST_BADGES = [
  { icon: Images.clientSalesforce, label: "Salesforce Partner" },
  { icon: Images.clientSoc2, label: "SOC 2" },
  { icon: Images.clientHipaa, label: "HIPAA" },
  { icon: Images.clientEnterprise, label: "Enterprise Ready" },
];

const PROBLEM = {
  eyebrow: "The Problem",
  heading: "RCA configuration is slow, complex and expensive.",
  intro:
    "Salesforce Revenue Cloud Advanced is one of the most powerful CPQ-to-cash platforms — but configuring it today is a major bottleneck.",
  points: [
    {
      icon: Images.iconAriaProblemTimeline,
      stat: "6–12 weeks minimum",
      description: "Every implementation requires a certified Salesforce Revenue Cloud engineer for weeks of manual configuration.",
    },
    {
      icon: Images.iconAriaProblemObjects,
      stat: "30+ interconnected objects",
      description: "Deep knowledge of Expression Sets, Decision Tables, CML, Metadata API and dozens of interrelated objects is required.",
    },
    {
      icon: Images.iconAriaProblemReengage,
      stat: "Re-engagement for every change",
      description: "Any update — a new product, a pricing rule change, a contract clause — requires re-engaging expensive engineering resources.",
    },
    {
      icon: Images.iconAriaProblemValidation,
      stat: "No validation layer",
      description: "Manual UI-based configuration has no automated validation. Errors surface only after deployment, often in client demos or production.",
    },
  ],
};

const MODES = [
  {
    icon: Images.iconAriaModeUpload,
    name: "Document Upload",
    // `blurb` is a verbatim first sentence of the real `description` below —
    // used on the summary card so it isn't a newly-written claim, just a
    // shorter excerpt of the same content shown in the detail panel.
    blurb: "Upload your Excel, Word, or PDF files.",
    title: "Upload. Extract. Validate.",
    description:
      "Upload your Excel, Word, or PDF files. Aria's AI parser extracts records, maps them to Salesforce objects, and presents them in an editable review table. You validate and add to the change set.",
    modules: ["Products & Catalog", "Price Books (multi-currency)", "Bundle Configuration", "CLM Contract Templates"],
  },
  {
    icon: Images.iconAriaModeWizard,
    name: "Guided Wizard",
    blurb: "A strict linear wizard where each element is configured and locked before the next unlocks.",
    title: "Step by step, validated at every gate.",
    description:
      "A strict linear wizard where each element is configured and locked before the next unlocks. Aria generates Expression Sets and Decision Tables and validates the full price waterfall before deployment.",
    modules: ["Pricing Procedures (6-step wizard)", "Context definition & field mapping", "Volume discount tiers", "Contract price overrides & surcharges"],
  },
  {
    icon: Images.iconAriaModePrompt,
    name: "Template + Prompt",
    blurb: "Pre-built base templates are loaded automatically.",
    title: "Start from a base. Refine with language.",
    description:
      "Pre-built base templates are loaded automatically. You describe what you want in plain English and Aria updates the configuration, maps changes to Salesforce metadata, and records them in the change set.",
    modules: ["Quote Templates", "Billing Rules & Invoice Setup", "CLM Clause Library", "Approval Chains"],
  },
];

// Generic across all three modes (capture → process → validate → deploy),
// reusing real, already-established Aria facts rather than inventing new
// ones — the icons and concepts here are the same ones used in CAPABILITIES
// below (Validation Before Every Step, Deployable Change Sets).
const ARIA_PIPELINE = [
  { icon: Images.iconAriaModeUpload, title: "Capture Input", caption: "Upload a file, complete a wizard, or write a prompt" },
  { icon: Images.iconAriaCapCopilot, title: "AI Processing", caption: "Aria parses input and generates configuration" },
  { icon: Images.iconAriaCapValidation, title: "Validate", caption: "Field-level rules and schema checks before deployment" },
  { icon: Images.iconAriaCapChangeset, title: "Change Set Ready", caption: "Deployable Salesforce Metadata API package" },
];

// Status captions reuse real facts from CAPABILITIES below (Session
// Persistence, Production Deployment Guard, Validation Before Every Step)
// rather than new claims.
const ARIA_STATUS = [
  { icon: Images.iconAriaCapSession, title: "Active Session", caption: "Configuration state persists for 8 hours" },
  { icon: Images.iconAriaCapProdguard, title: "Sandbox Mode", caption: "Production deployment requires explicit confirmation" },
  { icon: Images.iconAriaCapValidation, title: "Validation Active", caption: "Every module validated before reaching the change set" },
];

const MODULE_GROUPS = [
  {
    icon: Images.iconAriaPillarCpq,
    pillar: "CPQ",
    name: "Configure Price Quote",
    modules: [
      { n: 1, title: "Products & Catalog", description: "Upload Excel/Word/PDF catalogue. Aria maps to Product2, ProductCategory, and AttributeSet records with inline validation and editable extraction table." },
      { n: 2, title: "Price Books", description: "Upload pricing sheets in any currency. Aria generates PricebookEntry records with 85% fuzzy-match to products, multi-currency tabs, and auto-conversion disclosure." },
      { n: 3, title: "Bundle Configuration", description: "Upload bundle specs or BOMs. Aria builds the product tree and generates CML constraint rules (REQUIRE, INCLUDE, EXCLUDE, cardinality) with a live preview panel." },
      { n: 4, title: "Pricing Procedures", description: "6-step guided wizard: context definition, list price, volume discounts, contract overrides, surcharges, and waterfall preview. AI generates ExpressionSetDefinition XML." },
      { n: 5, title: "Quote Templates", description: "Pre-built DocumentTemplate loaded with standard sections. Prompt Aria to customise header, line items table, pricing summary, T&Cs, and PDF layout." },
    ],
  },
  {
    icon: Images.iconAriaPillarBilling,
    pillar: "Billing",
    name: "Invoicing & Revenue",
    modules: [
      { n: 6, title: "Invoice Rules", description: "Configure BillingSchedule and InvoiceRule objects. Set trigger event, billing frequency, line grouping, auto-send, and full dunning escalation schedule." },
      { n: 7, title: "Payment Terms", description: "Set default payment terms (Net 15/30/60/90), accepted payment methods, early payment discounts, and late payment fee policies with per-segment overrides." },
      { n: 8, title: "Revenue Recognition", description: "Configure RevenueSchedule rules per product type aligned to ASC 606 or IFRS 15 — straight-line, percentage-of-completion, or on-consumption with GL account mapping." },
      { n: 9, title: "Tax Configuration", description: "Connect Salesforce Tax, Avalara AvaTax, or Vertex. Configure TaxTreatment and TaxPolicy objects, product-family-to-tax-code mapping, and jurisdiction rules." },
    ],
  },
  {
    icon: Images.iconAriaPillarClm,
    pillar: "CLM",
    name: "Contract Lifecycle",
    modules: [
      { n: 10, title: "Contract Template Mapper", description: "Upload Word or PDF contract template. Aria detects merge fields in [Field] or {{Field}} format, maps each to Salesforce Contract object fields with confidence scores." },
      { n: 11, title: "Clause Library", description: "Manage standard, fallback, and non-standard clause variants. Colour-coded variant badges and per-clause approval gate indicators configurable via natural language prompt." },
      { n: 12, title: "Approval Chains", description: "Configure Salesforce ApprovalProcess objects. Base template: Sales Manager → Legal → Finance → VP. Supports parallel approvals, threshold-based routing, and auto-escalation." },
      { n: 13, title: "E-Signature Integration", description: "Connect DocuSign, Adobe Sign, or Salesforce native e-signature. Configure signing order, reminder frequency, and completion actions (create Order, notify billing)." },
    ],
  },
];

const MODULES_CLOSING = "All 13 modules → one validated Salesforce change set";
const MODULES_DEPLOY_NOTE =
  "Download the ZIP, deploy via Inbound Change Sets to your sandbox, validate, then promote to production. Aria guides you through every step inline.";

const CAPABILITIES = {
  eyebrow: "Key Capabilities",
  heading: "Built for accuracy, speed, and control.",
  intro: "Every design decision in Aria prioritises reducing configuration errors and keeping your team in control at every step.",
  items: [
    { icon: Images.iconAriaCapCopilot, title: "AI Co-pilot (Context-aware)", description: "The right-panel AI assistant automatically updates its knowledge based on the active module. Supports structured suggestion chips and free-form natural language — always relevant to where you are." },
    { icon: Images.iconAriaCapEditable, title: "Inline Editable Extraction Tables", description: "Every field in every AI-extracted row is editable directly in the table — no separate edit screens. Fix a product name, correct a SKU, or assign a missing family. Validation updates in real time." },
    { icon: Images.iconAriaCapValidation, title: "Validation Before Every Step", description: "No configuration reaches the change set unvalidated. Each module has field-level rules, AI hallucination guards, and schema validation against the Salesforce Metadata API before anything is queued." },
    { icon: Images.iconAriaCapWaterfall, title: "Pricing Waterfall Preview", description: "Before locking a Pricing Procedure, Aria simulates the full price waterfall with test inputs — showing how list price, discounts, contract overrides, and surcharges stack to reach the final net price." },
    { icon: Images.iconAriaCapCurrency, title: "Multi-Currency Support", description: "Price books with multiple currencies are presented in separate tabs — one per currency code. Auto-conversion is available with full rate disclosure (source, date, exact rate per currency pair)." },
    { icon: Images.iconAriaCapProdguard, title: "Production Deployment Guard", description: "All operations default to sandbox. Switching to production requires explicit two-step confirmation and triggers a high-visibility warning banner. No accidental production deployments." },
    { icon: Images.iconAriaCapChangeset, title: "Deployable Change Sets", description: "The output is a standard Salesforce Metadata API-compatible ZIP — package.xml plus all component files. Deploy via Inbound Change Sets with no AppExchange install or Salesforce package required." },
    { icon: Images.iconAriaCapSession, title: "Session Persistence", description: "Browser refresh preserves all configuration state. Session data persists for 8 hours so you can start a configuration, take a break, and pick up exactly where you left off." },
  ],
};

const TRUST = {
  eyebrow: "Trust & Security",
  heading: "Why Trust Aria With Your Org",
  subheading: "AI writes the configuration. A person still signs off on it.",
  intro:
    "You're letting AI generate metadata that gets deployed into a live Salesforce org. Here's exactly what stands between a generated change set and your production environment — and how Aria connects to your org in the first place.",
  points: [
    { icon: Images.iconAriaTrustReview, title: "Consultant review, every time", description: "A certified Mirketa Revenue Cloud consultant reviews and approves every change set before it touches production — not just an AI validation pass." },
    { icon: Images.iconAriaTrustSandbox, title: "Sandbox-first, always", description: "All operations default to sandbox. Switching to production requires explicit two-step confirmation and a high-visibility warning banner." },
    { icon: Images.iconAriaTrustGuards, title: "Schema & hallucination guards", description: "Every module runs field-level validation rules and schema checks against the Salesforce Metadata API before anything is queued for deployment." },
    { icon: Images.iconAriaTrustNoinstall, title: "Nothing installed in your org", description: "Aria runs inside Mirketa's secure environment and connects to Salesforce through an encrypted, revocable connection you control — no package or app to install on your side." },
    { icon: Images.iconAriaTrustRetention, title: "Your documents aren't retained", description: "Catalogs, price books, and contracts you share are processed only for the duration of the engagement and are not kept beyond what's needed to build your change set." },
    { icon: Images.iconAriaTrustInfra, title: "Built on modern, audited infrastructure", description: "A current, security-reviewed cloud stack with a leading LLM provider — full architecture details available on request during a security review." },
  ],
};

const CERTIFICATIONS = ["Salesforce Crest Partner", "Dedicated Revenue Cloud Practice", "Metadata API-native output", "WCAG 2.1 AA accessible"];

const FAQS = [
  { q: "What exactly is Aria and how does it differ from a standard Salesforce implementation?", a: "Aria is an AI-powered configurator built specifically for Salesforce Revenue Cloud Advanced (RCA). Unlike a traditional implementation where a consultant manually builds every object in the Salesforce UI, Aria guides your team through each of the 13 RCA modules — CPQ, Billing, and CLM — using document upload, guided wizards, and natural-language prompts. The output is a validated, Metadata API-compatible change set you deploy directly, cutting setup time from weeks to days." },
  { q: "Does Aria require any AppExchange installation or changes to my Salesforce org?", a: "No. Aria runs entirely inside Mirketa's secure environment. It connects to your Salesforce org through an encrypted, revocable connection that you control — there is nothing to install from AppExchange and no package to deploy on your side before you begin. The only thing that enters your org is the validated change set you explicitly approve and deploy." },
  { q: "Which Salesforce Revenue Cloud modules does Aria cover?", a: "Aria covers all 13 RCA configuration modules across three pillars. On the CPQ side: Products & Catalog, Price Books, Bundle Configuration, Pricing Procedures, and Quote Templates. On the Billing side: Invoice Rules, Payment Terms, Revenue Recognition, and Tax Configuration. On the CLM side: Contract Template Mapper, Clause Library, Approval Chains, and E-Signature Integration. Every module produces validated Salesforce metadata bundled into a single deployable change set." },
  { q: "How does Aria handle my uploaded documents — are they stored or shared?", a: "Your documents — product catalogs, price books, contract templates — are processed only for the duration of the engagement to build your configuration. They are not retained beyond what is strictly necessary to generate your change set, and they are never shared with third parties. Aria runs on a current, security-reviewed cloud stack, and full architecture details are available on request during a formal security review." },
  { q: "What file formats can I upload to Aria?", a: "Aria's AI parser accepts Excel (.xlsx), Word (.docx), and PDF files for document-upload modules such as Products & Catalog, Price Books, Bundle Configuration, and CLM Contract Templates. For modules that use the guided wizard or template-plus-prompt mode, no file upload is required — you work directly through the step-by-step interface or describe your requirements in plain English." },
  { q: "Who reviews the configuration before it goes to production?", a: "A certified Mirketa Revenue Cloud consultant reviews and approves every change set before it touches your production org — this is not just an automated validation pass. All Aria operations default to sandbox. Switching to production requires explicit two-step confirmation and triggers a high-visibility warning banner, so there is no risk of an accidental production deployment." },
  { q: "How long does a typical RCA setup take with Aria?", a: "Most teams reach a fully configured, sandbox-validated change set within three weeks of starting — compared to the six-to-twelve-week minimum typical of a manual implementation. The exact timeline depends on the complexity of your product catalog, pricing rules, and contract requirements, but Aria's inline validation and automated metadata generation remove the largest time bottlenecks at every step." },
  { q: "Is Aria suitable for a CPQ-to-RCA migration, or only for new implementations?", a: "Aria is designed for both. If you are migrating from Salesforce CPQ (Steelbrick) to Revenue Cloud Advanced, Aria maps your existing product structures, pricing rules, and contract templates to the new RCA metadata schema. If you are starting a net-new RCA implementation, Aria guides you through every module from scratch. The free trial is open to both scenarios." },
  { q: "What does the free trial include and who qualifies?", a: "The free trial gives qualifying teams full access to Aria across all 13 modules, with a dedicated Mirketa Revenue Cloud consultant guiding the engagement. It is open to early-stage startups, companies with fewer than 50 employees, teams beginning a new RCA implementation, and teams migrating from CPQ to RCA. Spots are limited — submit the form below and a consultant will reach out within one business day to confirm eligibility and schedule a 20-minute scoping call." },
];

const SEO = {
  title: "Aria AI Accelerator for Salesforce Revenue Cloud | Mirketa",
  description:
    "Aria is Mirketa's AI-powered configurator for Salesforce Revenue Cloud Advanced — automating CPQ, Billing, and CLM setup in days, not weeks, with zero AppExchange installs.",
  canonical: "https://www.mirketa.com/ai-accelerator-aria/",
  keywords: [
    "AI Accelerator Aria",
    "Salesforce Revenue Cloud Advanced configurator",
    "RCA setup automation",
    "AI-powered CPQ configuration",
    "Salesforce Revenue Cloud AI tool",
    "Salesforce CPQ to RCA migration",
    "AI configurator for Salesforce billing",
    "Salesforce CLM automation",
    "Revenue Cloud Advanced implementation AI",
    "Aria AI Salesforce",
    "AI Salesforce Revenue Cloud setup",
    "Salesforce Revenue Cloud Advanced consulting",
  ],
  schema: [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "AI-Powered Salesforce Revenue Cloud Advanced Configuration",
      provider: { "@type": "Organization", name: "Mirketa Inc.", url: "https://www.mirketa.com" },
      name: "AI Accelerator Aria",
      description:
        "An AI-powered configurator that guides teams through Salesforce Revenue Cloud Advanced setup — CPQ, Billing, and CLM — producing a validated, deployable change set in days instead of weeks.",
      areaServed: "Global",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.mirketa.com/" },
        { "@type": "ListItem", position: 2, name: "AI Accelerator Aria", item: "https://www.mirketa.com/ai-accelerator-aria/" },
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
  eyebrow: "Get Started Today",
  heading: "Ready to transform your business with Salesforce AI?",
  description:
    "Your AI transformation starts with a conversation. Our Salesforce AI consultants will assess your current environment, identify your highest-ROI use cases, and outline a clear path to measurable outcomes — at no cost.",
  benefits: ["No-obligation assessment", "Response within 24 hours", "Certified Salesforce AI experts", "No AppExchange install required", "Salesforce Crest Partner"],
};

const CONSULTATION = {
  eyebrow: "Get Started Today",
  heading: "Schedule an Aria Consultation",
  description:
    "The free trial is open to early-stage startups, teams under 50 employees, new RCA implementations, and CPQ-to-RCA migrations. A consultant replies within one business day — no spam, no AppExchange install required.",
  formTitle: "Book a Free 20-Minute Call",
};

// ============================================================
// HOOKS
// ============================================================

function useInView(threshold = 0.3) {
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

function useCountUp(target, inView, duration = 1300) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView || target == null) return;
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

export default function AIAcceleratorAria() {
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

      gsap.utils.toArray(".ara-reveal").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 32,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      gsap.utils.toArray(".ara-reveal-stagger").forEach((el) => {
        gsap.from(el.children, {
          opacity: 0,
          y: 26,
          duration: 0.6,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      gsap.utils.toArray(".ara-zoom-in").forEach((el) => {
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
    <div className="ai-accelerator-aria">
      <Seo {...SEO} />
      <HeroSection heroTextRef={heroTextRef} />
      <ProblemSection />
      <HowItWorksSection />
      <ModulesSection />
      <CapabilitiesSection />
      <TrustSection />
      <FaqSection />
      <FinalCtaSection />
      <ContactSection />
    </div>
  );
}

// ============================================================
// HERO — configuration-pipeline backdrop + animated stat strip
// ============================================================

function StatTile({ metric }) {
  const [ref, inView] = useInView(0.5);
  const count = useCountUp(metric.value, inView);
  return (
    <div ref={ref} className="ara-stat">
      <div className="ara-stat__value">{metric.display ?? `${inView ? count : 0}${metric.suffix}`}</div>
      <p>{metric.label}</p>
    </div>
  );
}

function HeroSection({ heroTextRef }) {
  return (
    <section className="ara-hero" style={{ backgroundImage: cssUrl(Images.heroAiAcceleratorAria) }} aria-label="AI Accelerator Aria for Salesforce Revenue Cloud Advanced">
      <div className="ara-hero__scrim" />
      <div className="container">
        <Breadcrumb items={BREADCRUMB_ITEMS} className="ara-breadcrumb" />
      </div>
      <div className="container ara-hero__inner">
        <div ref={heroTextRef} className="ara-hero__text">
          <span className="ara-badge">
            <span className="ara-badge__spark" aria-hidden="true">✦</span> {HERO.badge}
          </span>
          <h1>{HERO.title}</h1>
          <p className="ara-hero__description">{HERO.description}</p>
          <div className="ara-hero__ctas">
            <a href={HERO.primaryCta.href} className="btn btn-primary ara-btn">
              {HERO.primaryCta.label} <span aria-hidden="true">→</span>
            </a>
            <a href={HERO.secondaryCta.href} className="btn btn-secondary ara-btn">
              {HERO.secondaryCta.label}
            </a>
          </div>
          <p className="ara-hero__supporting">{HERO.supporting}</p>
        </div>

        <div className="ara-hero__stats ara-reveal-stagger">
          {HERO_STATS.map((s) => (
            <StatTile key={s.label} metric={s} />
          ))}
        </div>

        <div className="ara-hero__trust ara-reveal-stagger">
          <span className="ara-hero__trust-label">Backed by Mirketa's enterprise credentials</span>
          <div className="ara-hero__trust-badges">
            {TRUST_BADGES.map((b) => (
              <img key={b.label} src={b.icon} alt={b.label} loading="lazy" />
            ))}
          </div>
        </div>
      </div>
      <button
        type="button"
        className="ara-scroll-indicator"
        onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })}
        aria-label="Scroll to how Aria works"
      >
        <span />
      </button>
    </section>
  );
}

// ============================================================
// THE PROBLEM — four friction-point cards
// ============================================================

function ProblemSection() {
  return (
    <section className="section ara-problem" aria-labelledby="ara-problem-heading">
      <div className="container">
        <div className="section-heading ara-reveal">
          <p className="ara-eyebrow">{PROBLEM.eyebrow}</p>
          <h2 id="ara-problem-heading">{PROBLEM.heading}</h2>
          <p>{PROBLEM.intro}</p>
        </div>
        <div className="ara-problem__grid ara-reveal-stagger">
          {PROBLEM.points.map((p) => (
            <div className="ara-problem-card" key={p.stat}>
              <img src={p.icon} alt="" loading="lazy" />
              <h3>{p.stat}</h3>
              <p>{p.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// HOW ARIA WORKS — three interactive interaction-mode tabs
// ============================================================

function HowItWorksSection() {
  const [active, setActive] = useState(0);
  const mode = MODES[active];

  return (
    <section className="section ara-modes" id="how-it-works" aria-labelledby="ara-modes-heading">
      <div className="container">
        <div className="section-heading ara-reveal">
          <p className="ara-eyebrow">How Aria Works</p>
          <h2 id="ara-modes-heading">Three interaction modes, matched to the task.</h2>
          <p>Aria doesn't take a one-size-fits-all approach. Each configuration area uses the mode that gets the best result fastest.</p>
        </div>

        <div className="ara-modes__cards ara-reveal-stagger" role="tablist" aria-label="Aria interaction modes">
          {MODES.map((m, i) => (
            <button
              key={m.name}
              type="button"
              role="tab"
              id={`ara-mode-tab-${i}`}
              aria-selected={active === i}
              aria-controls="ara-mode-panel"
              className={`ara-modes__card ${active === i ? "is-active" : ""}`}
              onClick={() => setActive(i)}
            >
              <span className="ara-modes__card-badge">{String(i + 1).padStart(2, "0")}</span>
              <img src={m.icon} alt="" aria-hidden="true" className="ara-modes__card-icon" />
              <h3>{m.name}</h3>
              <p>{m.blurb}</p>
            </button>
          ))}
        </div>

        <div className="ara-modes__panel ara-reveal" role="tabpanel" id="ara-mode-panel" aria-labelledby={`ara-mode-tab-${active}`}>
          <div className="ara-modes__panel-grid" key={active}>
            <div className="ara-modes__pipeline">
              {ARIA_PIPELINE.map((step, i) => (
                <div className="ara-modes__pipeline-step" style={{ "--i": i }} key={step.title}>
                  <div className="ara-modes__pipeline-icon">
                    <img src={step.icon} alt="" aria-hidden="true" />
                  </div>
                  <div className="ara-modes__pipeline-copy">
                    <h4>{step.title}</h4>
                    <p>{step.caption}</p>
                  </div>
                  {i < ARIA_PIPELINE.length - 1 && <span className="ara-modes__pipeline-arrow" aria-hidden="true" />}
                </div>
              ))}
            </div>

            <div className="ara-modes__detail">
              <h3>{mode.title}</h3>
              <p>{mode.description}</p>
              <span className="ara-modes__modules-label">Applicable modules</span>
              <ul className="ara-modes__detail-list">
                {mode.modules.map((m) => (
                  <li key={m}>{m}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="ara-modes__status">
            {ARIA_STATUS.map((s) => (
              <div className="ara-modes__status-item" key={s.title}>
                <img src={s.icon} alt="" aria-hidden="true" />
                <div>
                  <strong>{s.title}</strong>
                  <span>{s.caption}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// ALL 13 MODULES — pillar-grouped, numbered module stack
// ============================================================

function ModulesSection() {
  return (
    <section className="section ara-modules" aria-labelledby="ara-modules-heading">
      <div className="container">
        <div className="ara-modules__head ara-reveal">
          <div className="section-heading">
            <p className="ara-eyebrow">All 13 Modules</p>
            <h2 id="ara-modules-heading">The full RCA stack, configured end to end.</h2>
            <p>Aria covers every configuration area across CPQ, Billing, and CLM — generating a single validated change set you deploy to your sandbox or production org.</p>
          </div>
          <img src={Images.illoAriaQuoteToCashPipeline} alt="" aria-hidden="true" className="ara-modules__illo" loading="lazy" />
        </div>

        <div className="ara-modules__grid ara-reveal-stagger">
          {MODULE_GROUPS.map((group) => (
            <div className="ara-modules__column" key={group.pillar}>
              <div className="ara-modules__pillar-head">
                <img src={group.icon} alt="" aria-hidden="true" />
                <div>
                  <span className="ara-modules__pillar-tag">{group.pillar}</span>
                  <h3>{group.name}</h3>
                </div>
              </div>
              <ol className="ara-modules__list">
                {group.modules.map((m) => (
                  <li key={m.n} className="ara-module-row">
                    <span className="ara-module-row__num">{String(m.n).padStart(2, "0")}</span>
                    <div>
                      <h4>{m.title}</h4>
                      <p>{m.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>

        <div className="ara-modules__footer ara-reveal">
          <p className="ara-modules__closing">{MODULES_CLOSING}</p>
          <p className="ara-modules__deploy-note">{MODULES_DEPLOY_NOTE}</p>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// KEY CAPABILITIES — premium bento grid
// ============================================================

function CapabilitiesSection() {
  return (
    <section className="section ara-capabilities" aria-labelledby="ara-capabilities-heading">
      <div className="container">
        <div className="section-heading ara-reveal">
          <p className="ara-eyebrow">{CAPABILITIES.eyebrow}</p>
          <h2 id="ara-capabilities-heading">{CAPABILITIES.heading}</h2>
          <p>{CAPABILITIES.intro}</p>
        </div>
        <div className="ara-capabilities__grid ara-reveal-stagger">
          {CAPABILITIES.items.map((c) => (
            <div className="ara-capability-card" key={c.title}>
              <img src={c.icon} alt="" loading="lazy" />
              <h3>{c.title}</h3>
              <p>{c.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// TRUST & SECURITY — dark section + certification strip
// ============================================================

function TrustSection() {
  return (
    <section className="section ara-trust" aria-labelledby="ara-trust-heading">
      <div className="container">
        <div className="section-heading ara-reveal">
          <p className="ara-eyebrow">{TRUST.eyebrow}</p>
          <h2 id="ara-trust-heading">{TRUST.heading}</h2>
          <p className="ara-trust__subheading">{TRUST.subheading}</p>
          <p>{TRUST.intro}</p>
        </div>
        <div className="ara-trust__grid ara-reveal-stagger">
          {TRUST.points.map((t) => (
            <div className="ara-trust-card" key={t.title}>
              <img src={t.icon} alt="" loading="lazy" />
              <h3>{t.title}</h3>
              <p>{t.description}</p>
            </div>
          ))}
        </div>
        <ul className="ara-trust__certifications ara-reveal-stagger">
          {CERTIFICATIONS.map((c) => (
            <li key={c}>
              <img src={Images.iconCheckCircle} alt="" aria-hidden="true" />
              {c}
            </li>
          ))}
        </ul>
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
    <section className="section ara-faq" aria-labelledby="ara-faq-heading">
      <div className="container">
        <div className="section-heading ara-reveal">
          <p className="ara-eyebrow">FAQ</p>
          <h2 id="ara-faq-heading">Frequently Asked Questions</h2>
          <p>Got questions about how Aria works, what it covers, or how it connects to your Salesforce org? We've answered the most common ones below.</p>
        </div>
        <div className="ara-faq__search-wrap ara-reveal">
          <label htmlFor="ara-faq-search" className="visually-hidden">
            Search frequently asked questions
          </label>
          <input
            id="ara-faq-search"
            type="search"
            className="ara-faq__search"
            placeholder="Ask a question — e.g. &quot;file formats&quot;, &quot;migration&quot;, &quot;security&quot;..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpenIndex(-1);
            }}
          />
        </div>
        <div className="ara-faq__list ara-reveal">
          {filtered.length === 0 ? (
            <p className="ara-faq__empty">No questions match &ldquo;{query}&rdquo;. Try a different search term.</p>
          ) : (
            filtered.map((item, i) => {
              const open = openIndex === i;
              const panelId = `ara-faq-panel-${i}`;
              return (
                <div className={`ara-faq-item ${open ? "is-open" : ""}`} key={item.q}>
                  <button type="button" className="ara-faq-item__question" aria-expanded={open} aria-controls={panelId} onClick={() => setOpenIndex(open ? -1 : i)}>
                    <span>{item.q}</span>
                    <span className="ara-faq-item__icon" aria-hidden="true">{open ? "−" : "+"}</span>
                  </button>
                  <div id={panelId} className="ara-faq-item__answer" role="region" hidden={!open}>
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
    <section className="ara-final-cta ara-reveal" aria-labelledby="ara-final-cta-heading">
      <div className="container ara-final-cta__inner">
        <p className="ara-eyebrow">{FINAL_CTA.eyebrow}</p>
        <h2 id="ara-final-cta-heading">{FINAL_CTA.heading}</h2>
        <p>{FINAL_CTA.description}</p>
        <ul className="ara-final-cta__benefits">
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
