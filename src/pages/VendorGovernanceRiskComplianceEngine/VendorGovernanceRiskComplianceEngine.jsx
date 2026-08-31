import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Seo from "../../components/Seo/Seo.jsx";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb.jsx";
import ContactForm from "../../components/ContactForm/ContactForm.jsx";
import heroImage from "../../assets/images/vendor-governance/hero-dashboard.png";
import "./VendorGovernanceRiskComplianceEngine.css";

gsap.registerPlugin(ScrollTrigger);

const BREADCRUMB_ITEMS = [
  { label: "Home", href: "/" },
  { label: "AI Velocity Engines" },
  { label: "Vendor Governance, Risk & Compliance Engine" },
];

// ============================================================
// ICONS — inline, matching the reference's stroke-style icon set.
// ============================================================
const Ico = {
  home: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  bolt: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  users: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  file: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  ),
  compass: (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
      <path d="M22 12A10 10 0 0 0 12 2v10z" />
    </svg>
  ),
  check: (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
  search: (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
      <line x1="11" y1="8" x2="11" y2="14" />
      <line x1="8" y1="11" x2="14" y2="11" />
    </svg>
  ),
  fileBig: (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  ),
  usersBig: (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  homeBig: (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
};

// ============================================================
// DATA — copy is the reference's own text verbatim, except the
// two Module cards flagged as containing leftover internal
// reviewer notes rather than real product copy (confirmed with
// the requester): Module 1's OCR claim is corrected to what the
// underlying implementation actually does (text-layer extraction,
// not OCR), and Module 3's "Active purchase order flagging" claim
// is removed since no PO integration exists — the card is
// reframed around its four other, unflagged capabilities.
// ============================================================

const HERO = {
  eyebrow: "AI-Powered Salesforce Native",
  heading: "The AI Platform That Helps Procurement Teams Onboard Suppliers Faster, Monitor Risk, and Prove Compliance",
  primaryCta: { label: "Request a Demo", href: "#form" },
  secondaryCta: { label: "Explore the Platform", href: "#solution" },
};

const HERO_FEATURES = [
  { icon: Ico.home, title: "Salesforce-Native", description: "AI-powered compliance review (Vendor Grace)" },
  { icon: Ico.bolt, title: "Flexible", description: "Choose your AI infrastructure - swap engines anytime, no lock-in" },
  { icon: Ico.users, title: "Risk-Based Human-in-the-Loop", description: "Flagged items always route to a reviewer" },
  { icon: Ico.file, title: "Full Audit Trail", description: "Every action is traceable in Salesforce" },
];

const IMPACT = {
  eyebrow: "Measurable Impact",
  heading: "Results that matter, from day one",
  paragraph: "Organizations deploying our platform target meaningful gains within the first twelve months without adding headcount.",
  items: [
    { value: "70%+", label: "Faster Verification", description: "Compared to manual document review" },
    { value: "3-5x", label: "Faster Onboarding", description: "Reducing cycle time from weeks to days" },
    { value: "360°", label: "Risk Visibility", description: "Tracing compliance from Tier-3 to active POs" },
    { value: "-40%", label: "Ongoing Maintenance", description: "Less time spent maintaining workflows, more time returned to strategic sourcing." },
  ],
};

const PROBLEM = {
  eyebrow: "The Procurement Gap",
  heading: "Your supply chain deserves more than fragmented data and manual work",
  intro:
    "Procurement teams are being asked to onboard suppliers faster, monitor sub-tier risks, and prove compliance with tools that weren't built for connected, AI-enabled work. The result is a familiar pattern: critical certifications expire unnoticed, manual document review consumes staff time, and hidden Tier-2 risks become your problem.",
  cards: [
    {
      title: "Data is a never-ending resource, insight is a rare commodity.",
      description: "There are isolated systems in place for supplier records, compliance certificates, and risk scores. Your team knows the data, but doesn't have the same intelligence as one team.",
    },
    {
      title: "Failure to comply without anyone knowing",
      description: "Predictive renewal tracking ensures critical supplier certifications expire in a timely manner without being noticed. The first warning sign shouldn't be a failed audit or a halted operation.",
    },
    {
      title: "Staff are spending too much time on chasing documents.",
      description: "The time procurement managers and compliance officers spend on document review, data entry and follow-up emails is just as much time that they could be spending on strategic sourcing.",
    },
    {
      title: "Sub-tier risks fall through the cracks",
      description: "It is difficult to detect Tier-3 supplier issues early when they could escalate to a risk impacting Tier-1 deliveries.",
    },
  ],
};

const SOLUTION = {
  eyebrow: "Meet the Platform",
  heading: "One Salesforce-native AI platform for every stage of supplier compliance",
  intro:
    "We connect the full lifecycle of supplier management from the first onboarding interaction to continuous multi-tier risk monitoring in a single intelligent Salesforce-native environment. No new platform. No data leaving your trusted environment. A human in control of every AI decision.",
  benefits: [
    { icon: Ico.compass, title: "Predict what's likely to happen", description: "Identify compliance gaps, expiring certifications, and sub-tier supplier risks earlier." },
    { icon: Ico.bolt, title: "Personalize every interaction at scale", description: "Generate onboarding checklists, compliance alerts, and audit reports grounded in your Salesforce data." },
    { icon: Ico.check, title: "Prove compliance with confidence", description: "Connect supplier records, risk scores, and audit trails in one auditable environment." },
  ],
};

const MODULES_HEADER = {
  eyebrow: "Core Capabilities",
  heading: "Three compliance capabilities. One connected platform.",
  paragraph: "Each capability delivers value on its own and compounds when combined. Most organizations start with automated onboarding and expand to multi-tier visibility as they grow.",
};

const MODULES = [
  {
    number: 1,
    title: "AI Document Classification and Text Extraction",
    subhead: "Turn manual document review into automated, accurate compliance",
    description:
      "Supplier documents are classified and their text extracted automatically, pulling structured data straight from digitally-native PDFs and routing it into Salesforce — no manual re-keying required.",
    features: ["Guided self-service supplier portals", "AI document classification and text extraction", "Automated compliance gap detection", "Human-in-the-loop review for low-confidence items", "Full audit trail inside Salesforce"],
  },
  {
    number: 2,
    title: "Continuous Monitoring & Renewal Orchestration",
    subhead: "Spend less time chasing updates. More time managing strategy.",
    description: "The platform tracks expiry dates across your entire supplier base, automatically drafting contextual reminder sequences before documents lapse, giving your team back hours every week.",
    features: ["Proactive expiry tracking and alerts", "AI-drafted renewal communications", "Real-time compliance scoring updates", "Autonomous escalation alerts for high-risk lapses", "Natural-language Q&A for compliance status"],
  },
  {
    number: 3,
    title: "Multi-Tier Supplier Risk Monitoring",
    subhead: "See the risks that legacy systems miss.",
    description: "See risk across your entire supplier network — not just Tier-1 — so a disruption three tiers down surfaces long before it reaches your business.",
    features: ["Tier-2 and Tier-3 relationship mapping", "Cascading risk score recalculation", "Real-time disruption impact analysis", "Geopolitical and environmental risk overlays"],
  },
];

const DIFFERENTIATOR = {
  eyebrow: "Why Choose This Platform",
  heading: "AI your procurement team can trust with sensitive supplier data",
  paragraph: "Most procurement AI tools require moving data into disconnected systems. Our platform operates natively within Salesforce, the environment your team already uses for supplier relationship management.",
  cards: [
    { icon: Ico.homeBig, title: "Your data stays home", description: "Built for Salesforce-native operation, reducing the need for external AI infrastructure or separate data movement." },
    { icon: Ico.usersBig, title: "Always a human in control", description: "AI extracts, scores, summarizes, and recommends while your team reviews and approves all supplier-facing actions." },
    { icon: Ico.search, title: "Explainable by design", description: "Recommendations and scores include the reasons behind them, helping teams understand why a compliance gap is flagged no black boxes." },
    { icon: Ico.fileBig, title: "Fully auditable", description: "AI-assisted recommendations, approvals, and actions are logged inside Salesforce to support governance and audit-readiness." },
  ],
};

const FAQ = {
  eyebrow: "FAQ",
  heading: "Questions procurement leaders ask",
  items: [
    {
      question: "Is this built on Salesforce?",
      answer: "Yes. This platform is designed as a Salesforce-native solution that uses Salesforce AI and data capabilities, including Data Cloud and Einstein. It extends the Salesforce environment your procurement team already uses rather than requiring a separate CRM replacement.",
    },
    {
      question: "Do we need to replace Ariba or Coupa?",
      answer: "No. This platform complements your existing procurement tools by handling the deep compliance verification and multi-tier risk visibility that traditional Source-to-Pay platforms don't provide. It works alongside your current systems to fill the compliance gap.",
    },
    {
      question: "Will AI automatically reject suppliers?",
      answer: "No. The platform follows a human-in-the-loop model. AI can draft communications, recommend next steps, prepare summaries, and support workflow decisions, but supplier-facing actions are reviewed and approved by your team before they are sent or finalized.",
    },
    {
      question: "How is this different from existing GRC tools?",
      answer: "This platform is native to Salesforce, priced for mid-market organizations, and focused specifically on supplier compliance rather than general governance, risk, and compliance. It provides multi-tier supplier visibility that traditional GRC tools don't offer, and it operates within your existing Salesforce environment.",
    },
    {
      question: "How long does implementation take?",
      answer: "Implementation timelines depend on your Salesforce readiness, data quality, scope, and integration needs. A focused supplier onboarding deployment can typically move faster than a broader multi-tier risk monitoring rollout because the latter often requires more data-foundation work. We'll provide a realistic timeline during your discovery call.",
    },
  ],
};

const FORM_SECTION = {
  eyebrow: "Get Started",
  heading: "Transform Your Procurement Operations",
  paragraph: "Organizations deploying our platform achieve measurable results within the first twelve months without adding headcount.",
  benefits: ["70%+ faster verification cycles", "3-5x faster supplier onboarding", "360° multi-tier risk visibility", "40% reduction in admin time", "Audit-ready compliance trails"],
  footnote: "No commitment required. Our specialists will review your needs and recommend a practical starting path.",
  formTitle: "Let's identify your highest-impact compliance use case",
  formSubcopy: "Tell us about your organization, Salesforce environment, and current procurement priorities.",
};

const SEO = {
  title: "Vendor Governance, Risk & Compliance Engine | Mirketa",
  description: "Unify supplier onboarding, compliance gap detection, and multi-tier risk management into one Salesforce-native AI platform powered by Data Cloud and Einstein.",
  canonical: "https://www.mirketa.com/ai-velocity-engines/vendor-governance-risk-compliance-engine/",
  keywords: ["vendor governance", "supplier risk management", "procurement compliance AI", "Salesforce Data Cloud", "Salesforce Einstein", "supplier onboarding automation"],
  schema: [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Vendor Governance, Risk & Compliance Engine",
      url: "https://www.mirketa.com/ai-velocity-engines/vendor-governance-risk-compliance-engine/",
      description: "A Salesforce-native AI platform unifying supplier onboarding, compliance gap detection, and multi-tier risk management.",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.mirketa.com/" },
        { "@type": "ListItem", position: 2, name: "AI Velocity Engines", item: "https://www.mirketa.com/ai-velocity-engines/vendor-governance-risk-compliance-engine/" },
        { "@type": "ListItem", position: 3, name: "Vendor Governance, Risk & Compliance Engine", item: "https://www.mirketa.com/ai-velocity-engines/vendor-governance-risk-compliance-engine/" },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQ.items.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
  ],
};

export default function VendorGovernanceRiskComplianceEngine() {
  const heroTextRef = useRef(null);
  const [openFaq, setOpenFaq] = useState(() => new Set());

  useEffect(() => {
    document.documentElement.classList.add("has-light-hero");
    return () => document.documentElement.classList.remove("has-light-hero");
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.from(heroTextRef.current.children, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      });

      gsap.utils.toArray(".vgc-reveal").forEach((el) => {
        gsap.from(el, {
          y: 28,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 90%" },
        });
      });

      gsap.utils.toArray(".vgc-reveal-stagger").forEach((group) => {
        gsap.from(group.children, {
          y: 24,
          opacity: 0,
          duration: 0.55,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: { trigger: group, start: "top 90%" },
        });
      });
    });
    return () => ctx.revert();
  }, []);

  const toggleFaq = (index) => {
    setOpenFaq((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  return (
    <div className="vgc-page">
      <Seo {...SEO} />

      {/* ============ HERO ============ */}
      <section className="vgc-hero">
        <div className="container">
          <Breadcrumb items={BREADCRUMB_ITEMS} className="vgc-breadcrumb breadcrumb--dark" />

          <div className="vgc-hero__grid">
            <div className="vgc-hero__content" ref={heroTextRef}>
              <span className="vgc-eyebrow">{HERO.eyebrow}</span>
              <h1>{HERO.heading}</h1>
              <p>
                Unify supplier onboarding, compliance gap detection, and multi-tier risk management into one intelligent Salesforce-native platform powered <b>by Data Cloud and Einstein.</b>
              </p>
              <div className="vgc-hero__ctas">
                <a href={HERO.primaryCta.href} className="vgc-btn vgc-btn--primary">
                  {HERO.primaryCta.label}
                </a>
                <a href={HERO.secondaryCta.href} className="vgc-btn vgc-btn--outline">
                  {HERO.secondaryCta.label}
                </a>
              </div>
            </div>
            <div className="vgc-hero__image-container">
              <img src={heroImage} alt="Salesforce AI Procurement Dashboard" className="vgc-hero__image" />
            </div>
          </div>

          <div className="vgc-hero__features">
            {HERO_FEATURES.map((f) => (
              <div className="vgc-hero-feature" key={f.title}>
                <div className="vgc-hero-feature__icon">{f.icon}</div>
                <div>
                  <div className="vgc-hero-feature__title">{f.title}</div>
                  <div className="vgc-hero-feature__desc">{f.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ IMPACT ============ */}
      <section className="vgc-section vgc-impact">
        <div className="container">
          <div className="vgc-section-header vgc-reveal">
            <span className="vgc-eyebrow">{IMPACT.eyebrow}</span>
            <h2>{IMPACT.heading}</h2>
            <p>{IMPACT.paragraph}</p>
          </div>
          <div className="vgc-impact__grid vgc-reveal-stagger">
            {IMPACT.items.map((item) => (
              <div className="vgc-impact-item" key={item.label}>
                <div className="vgc-impact-item__value">{item.value}</div>
                <div className="vgc-impact-item__label">{item.label}</div>
                <div className="vgc-impact-item__desc">{item.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PROBLEM ============ */}
      <section className="vgc-section vgc-problem">
        <div className="container">
          <div className="vgc-section-header vgc-reveal">
            <span className="vgc-eyebrow">{PROBLEM.eyebrow}</span>
            <h2>{PROBLEM.heading}</h2>
          </div>
          <div className="vgc-problem__intro vgc-reveal">
            <p>{PROBLEM.intro}</p>
          </div>
          <div className="vgc-problem__grid vgc-reveal-stagger">
            {PROBLEM.cards.map((card) => (
              <div className="vgc-problem-card" key={card.title}>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ SOLUTION ============ */}
      <section id="solution" className="vgc-section vgc-solution">
        <div className="container">
          <div className="vgc-section-header vgc-reveal">
            <span className="vgc-eyebrow">{SOLUTION.eyebrow}</span>
            <h2>{SOLUTION.heading}</h2>
          </div>
          <div className="vgc-solution__intro vgc-reveal">
            <p>{SOLUTION.intro}</p>
          </div>
          <div className="vgc-solution__grid vgc-reveal-stagger">
            {SOLUTION.benefits.map((b) => (
              <div className="vgc-benefit-item" key={b.title}>
                <div className="vgc-benefit-item__icon">{b.icon}</div>
                <h3>{b.title}</h3>
                <p>{b.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ MODULES ============ */}
      <section className="vgc-section vgc-modules">
        <div className="container">
          <div className="vgc-section-header vgc-reveal">
            <span className="vgc-eyebrow">{MODULES_HEADER.eyebrow}</span>
            <h2>{MODULES_HEADER.heading}</h2>
            <p>{MODULES_HEADER.paragraph}</p>
          </div>
          <div className="vgc-modules__grid vgc-reveal-stagger">
            {MODULES.map((m) => (
              <div className="vgc-module-card" key={m.number}>
                <div className="vgc-module-card__number">{m.number}</div>
                <h3>{m.title}</h3>
                <p className="vgc-module-card__subhead">{m.subhead}</p>
                <p>{m.description}</p>
                <ul className="vgc-module-card__features">
                  {m.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ DIFFERENTIATOR ============ */}
      <section className="vgc-section vgc-differentiator">
        <div className="container">
          <div className="vgc-section-header vgc-reveal">
            <span className="vgc-eyebrow">{DIFFERENTIATOR.eyebrow}</span>
            <h2>{DIFFERENTIATOR.heading}</h2>
            <p>{DIFFERENTIATOR.paragraph}</p>
          </div>
          <div className="vgc-differentiator__grid vgc-reveal-stagger">
            {DIFFERENTIATOR.cards.map((card) => (
              <div className="vgc-differentiator-card" key={card.title}>
                <div className="vgc-differentiator-card__icon">{card.icon}</div>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="vgc-section vgc-faq">
        <div className="container">
          <div className="vgc-section-header vgc-reveal">
            <span className="vgc-eyebrow">{FAQ.eyebrow}</span>
            <h2>{FAQ.heading}</h2>
          </div>
          <div className="vgc-faq__container vgc-reveal">
            {FAQ.items.map((item, index) => {
              const isOpen = openFaq.has(index);
              return (
                <div className="vgc-faq-item" key={item.question}>
                  <div
                    className="vgc-faq-question"
                    role="button"
                    tabIndex={0}
                    aria-expanded={isOpen}
                    onClick={() => toggleFaq(index)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        toggleFaq(index);
                      }
                    }}
                  >
                    <h3>{item.question}</h3>
                    <span className="vgc-faq-toggle">{isOpen ? "−" : "+"}</span>
                  </div>
                  <div className={`vgc-faq-answer ${isOpen ? "is-open" : ""}`}>
                    <p>{item.answer}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ FORM ============ */}
      <section id="form" className="vgc-form-section">
        <div className="container">
          <div className="vgc-form__wrapper">
            <div className="vgc-cta-box">
              <span className="vgc-eyebrow vgc-eyebrow--on-dark">{FORM_SECTION.eyebrow}</span>
              <h2>{FORM_SECTION.heading}</h2>
              <p>{FORM_SECTION.paragraph}</p>
              <ul className="vgc-cta-benefits">
                {FORM_SECTION.benefits.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
              <p className="vgc-cta-footnote">{FORM_SECTION.footnote}</p>
            </div>

            <div className="vgc-form-column">
              <p className="vgc-form-column__subcopy">{FORM_SECTION.formSubcopy}</p>
              <ContactForm title={FORM_SECTION.formTitle} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
