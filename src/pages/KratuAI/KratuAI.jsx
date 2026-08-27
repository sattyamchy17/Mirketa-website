import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Images } from "../../assets/images/index.js";
import Seo from "../../components/Seo/Seo.jsx";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb.jsx";
import ConsultationSection from "../../components/ConsultationSection/ConsultationSection.jsx";
import "./KratuAI.css";

const BREADCRUMB_ITEMS = [{ label: "Home", href: "/" }, { label: "Kratu AI" }];

gsap.registerPlugin(ScrollTrigger);

// ============================================================
// DATA — content sourced verbatim from
// https://mirketa.us/kratu-ai/
// ============================================================

const HERO = {
  badge: "Elixir-Powered Enterprise AI Assistant",
  title: "Meet Kratu AI: The Intelligence Inside Your Workflows",
  description:
    "Move from fragmented data to decisive outcomes, woven into every workflow. Kratu AI helps healthcare teams connect clinical documentation, payer intelligence, claims readiness, and denial management inside a smarter healthcare operating model.",
  pillars: ["Ingest", "Capture", "Generate", "Score", "Defend"],
  primaryCta: { label: "Request Executive Briefing", href: "#contact" },
  secondaryCta: { label: "See Kratu AI in Action", href: "#console" },
};

const HERO_STATS = [
  { value: 62, suffix: "%", label: "Screen Time Lost to Repetitive Work" },
  { value: 90, suffix: "%", label: "of Denials Are Preventable" },
  { value: 90, suffix: "%", label: "of Rejections Caused by Human Error" },
];

const TRUST_BADGES = [
  { icon: Images.clientSalesforce, label: "Salesforce Partner" },
  { icon: Images.clientHipaa, label: "HIPAA" },
  { icon: Images.clientSoc2, label: "SOC 2" },
  { icon: Images.clientEnterprise, label: "Enterprise Ready" },
];

const CONSOLE = {
  eyebrow: "Healthcare Intelligence Console",
  heading: "From audio to claim. From policy to payment.",
  description: "Kratu brings clinical and operational intelligence into one action-oriented journey.",
  cards: [
    { icon: Images.iconKratuWorkflowClinical, title: "Clinical Encounter", description: "Visit audio and patient context become structured documentation." },
    { icon: Images.iconKratuWorkflowRevenue, title: "Revenue Readiness", description: "Payer policy context, claim checks, and risk signals prepare the workflow before submission." },
    { icon: Images.iconKratuWorkflowJourney, title: "Journey Statement", description: "From audio to claim. From policy to payment." },
  ],
};

const VALUE_PROPS = {
  eyebrow: "Core Value",
  heading: "Not just AI answers. Intelligent action.",
  intro: "Kratu is designed to turn healthcare data into useful next steps across care, operations, and revenue workflows.",
  items: [
    { icon: Images.iconKratuValueAudio, title: "Audio to action", description: "Clinical encounters can move from conversation to structured documentation and downstream workflow support." },
    { icon: Images.iconKratuValuePolicy, title: "Policy to claim", description: "Payer policy intelligence helps teams interpret requirements before revenue processes are delayed." },
    { icon: Images.iconKratuValueRisk, title: "Risk before submit", description: "Claim readiness and denial likelihood signals help surface preventable issues earlier." },
    { icon: Images.iconKratuValueDefense, title: "Defense after denial", description: "Denial categorization, appeals, and trend insights support a more resilient revenue cycle." },
  ],
};

const CHALLENGE = {
  eyebrow: "The Challenge",
  heading: "Healthcare operations challenge",
  problem: "Care delivery and revenue operations still run on disconnected information.",
  intro:
    "Healthcare organizations are asked to deliver better care, faster documentation, cleaner claims, and stronger denial prevention — while teams still work across fragmented records, payer rules, manual notes, and operational handoffs.",
  points: [
    { icon: Images.iconKratuChallengeDocumentation, title: "Clinical teams lose time to documentation.", description: "Visit notes, orders, referrals, chart summaries, and follow-up information often require manual work after the patient interaction." },
    { icon: Images.iconKratuChallengePayer, title: "Payer requirements change faster than workflows.", description: "Policies, prior authorization rules, and billing requirements can sit outside the systems where claims are prepared." },
    { icon: Images.iconKratuChallengeRisk, title: "Revenue risk appears too late.", description: "Documentation gaps, coding questions, and denial patterns often become visible only after submission or rejection." },
  ],
};

const MEET_KRATU = {
  eyebrow: "Meet Kratu AI",
  heading: "End-to-End Operational Intelligence",
  intro:
    "Kratu AI represents the exact power that turns raw knowledge into decisive movement. It does not wait for prompts; it acts. As a comprehensive Enterprise AI Assistant, it embeds deeply into your daily operations to bridge the gap between human intent and systemic execution.",
  principles: [
    { title: "Native workflow intelligence", description: "Kratu supports clinical, operational, and financial workflows where healthcare work already happens." },
    { title: "Human-supervised automation", description: "Kratu AI is positioned to support teams with guided outputs and action-ready context while keeping healthcare teams in control." },
    { title: "Elixir-first brand architecture", description: "Elixir remains the healthcare platform. Kratu AI is the intelligence that makes the platform more decisive across every workflow." },
  ],
};

const PILLARS = {
  eyebrow: "Five Capability Pillars",
  heading: "A concise view of what Kratu AI helps healthcare teams do.",
  stat: "Teams spend up to 62% of their active screen time navigating clunky interfaces and typing repetitive records. Kratu automates the data layer so you can focus on core execution.",
  items: [
    { icon: Images.iconKratuPillarIngest, tag: "Ingest", title: "Intelligent Data Intake", description: "Instantly process structured or unstructured inputs. Safely read and interpret policies, health records, legal documents, emails, and multi-format audio files.", examples: ["Payer policies", "Health records", "Audio and documents"] },
    { icon: Images.iconKratuPillarCapture, tag: "Capture", title: "Ambient Context Harvesting", description: "Functioning as a secure Enterprise AI Copilot, Kratu listens to operational encounters, registers timelines, routes critical schedules, and structures ambient data into fully compliant records.", examples: ["Clinical notes", "Scheduling", "Referrals and orders"] },
    { icon: Images.iconKratuPillarGenerate, tag: "Generate", title: "Instant Systemic Outputs", description: "Eliminate hours of manual documentation. Instantly produce detailed chart summaries, compliant billing rules, legal appeal documentation, and complex forms directly from your workflows.", examples: ["Chart summaries", "Billing rules", "Claim support"] },
    { icon: Images.iconKratuPillarScore, tag: "Score", title: "Proactive Risk Evaluation", description: "Evaluate operations before submission. Predict denial or error likelihood, flag missing credentials, validate compliance, and forecast final financial impacts.", examples: ["Denial risk", "Documentation gaps", "Compliance checks"] },
    { icon: Images.iconKratuPillarDefend, tag: "Defend", title: "Support the path to payment.", description: "When denials happen, Kratu supports categorization, appeal preparation, tracking, and trend visibility.", examples: ["Appeals", "Resolution tracking", "Prevention insights"] },
  ],
};

const JOURNEY = {
  eyebrow: "Patient-to-Payment Journey",
  heading: "A high-level flow from first interaction to final resolution.",
  stat: "Up to 90% of business process denials and workflow rejections are entirely preventable. Kratu pre-scores your transactions to eliminate human error before submission.",
  steps: [
    { title: "Patient encounter", description: "Clinical and patient context enters the workflow from visits, records, documents, or conversations." },
    { title: "Clinical capture", description: "Important details are summarized and structured so clinicians and staff can act with less administrative drag." },
    { title: "Operational output", description: "Orders, referrals, summaries, requests, and billing support can be generated from trusted workflow context." },
    { title: "Claim readiness", description: "Payer requirements, documentation signals, and coding considerations can be checked before submission." },
    { title: "Denial prevention", description: "Risk indicators help teams correct avoidable issues earlier in the revenue cycle." },
    { title: "Revenue defense", description: "If a denial occurs, categorization, appeal workflow, and pattern analysis help teams improve resolution." },
  ],
};

const WHO_IT_HELPS = {
  eyebrow: "Who It Helps",
  heading: "Built for healthcare organizations that need intelligence across care and revenue.",
  intro:
    "Kratu AI seamlessly adapts to your organizational scale as an elite AI Automation Platform. Whether managing multi-facility clinical documentation or complex institutional revenue cycles, this unified Enterprise AI Assistant secures your workflows, accelerates delivery speeds, and protects your bottom line without adding administrative friction.",
  groups: [
    { icon: Images.iconKratuBuyerHospitals, title: "Health systems and hospitals", description: "Enterprise-grade intelligence for documentation support, operational consistency, and revenue workflow scale." },
    { icon: Images.iconKratuBuyerPractice, title: "Independent practices", description: "Less administrative burden for clinicians and staff, with smarter scheduling, documentation, and claim preparation." },
    { icon: Images.iconKratuBuyerRcm, title: "RCM and billing companies", description: "Stronger billing workflows with payer policy intelligence, claim readiness signals, and denial lifecycle support." },
  ],
};

const HIGHLIGHTS = {
  eyebrow: "Business Highlights",
  heading: "Intelligence That Transforms Your Entire Operational Workflow.",
  intro:
    "Kratu AI consolidates clinical depth and financial precision into a single AI Platform. By replacing manual data extraction, slow coding validation, and repetitive documentation with automated, decisive action, it addresses the industry's most critical operational bottlenecks.",
  items: [
    { icon: Images.iconKratuHighlightAmbient, title: "Ambient Intelligence", description: "Secure AI Copilot capabilities eliminate manual charting burden, capturing real-time patient interactions and transforming unstructured data into structured records automatically." },
    { icon: Images.iconKratuHighlightRelief, title: "Administrative Relief", description: "Automates the operational layers that consume up to 62% of standard workflow timelines, freeing your teams to focus entirely on core delivery and execution." },
    { icon: Images.iconKratuHighlightScoring, title: "Pre-Submission Scoring", description: "Intelligent transaction and claim evaluation that intercepts errors before processing, effectively neutralizing the human errors responsible for up to 90% of preventable process rejections." },
    { icon: Images.iconKratuHighlightDefense, title: "Autonomous Defense", description: "24/7 exception and denial lifecycle management driven by an intelligent AI Assistant that proactively tracks, documents, and resolves transaction anomalies." },
  ],
};

const WHY_MIRKETA = {
  eyebrow: "Why Mirketa",
  heading: "Proven Domain Expertise for Healthcare AI Adoption",
  intro:
    "Mirketa brings deep technology capability and practical operational strategy to help enterprise leaders deploy Kratu AI securely. As a trusted partner in implementation, we'll ensure your platforms align seamlessly with overarching business goals.",
  items: [
    { icon: Images.iconKratuWhySalesforce, title: "Salesforce Ecosystem Synergy", description: "We bridge advanced AI Search and automation tools directly with your core CRM architectures. This ensures your secure AI Assistant works natively within your existing infrastructure without disrupting day-to-day operations." },
    { icon: Images.iconKratuWhyOutcomes, title: "Clear Operational Outcomes", description: "We deliver intentional technology deployment, focusing strictly on business impact over novelty. Every workflow automation is built to eliminate human error, enhance team capacity, and secure predictable financial performance." },
    { icon: Images.iconKratuWhyWorkflow, title: "Workflow-First Integration", description: "We map your systems to match human processes, not the other way around. By integrating our modular AI Automation Platform directly into daily routines, your organization experiences instant, intuitive adoption from day one." },
    { icon: Images.iconKratuWhyScale, title: "Seamless Scalability", description: "We provide a frictionless bridge from strategic consultation to deployment. Get started immediately with a targeted use case or scale across your institution to unify fragmented data layers into a single source of truth." },
  ],
};

const FAQS = [
  { q: "What is the Kratu AI Accelerator?", a: "The Kratu AI Accelerator is a Mirketa brand-site page that introduces Elixir powered by Kratu AI. It explains how Kratu helps connect clinical, operational, and revenue workflows, from documents and patient encounters to claims, risk scoring, and denial management." },
  { q: "Is Kratu AI the same as an AI chatbot?", a: "No. Kratu AI is positioned as native healthcare workflow intelligence, not a standalone chatbot. It is designed to support action across documentation, scheduling, referrals, claim readiness, and denial lifecycle workflows." },
  { q: "How does Kratu AI support AI-powered EHR workflows?", a: "Kratu AI can help capture clinical encounters, generate chart summaries, support referrals and orders, and bring relevant context into the healthcare workflow so clinicians and staff spend less time on administrative translation." },
  { q: "How does Kratu AI support healthcare revenue cycle management?", a: "Kratu AI supports RCM by helping interpret payer policies, generate billing-rule context, review claim readiness, flag denial risk, and support denial management activities such as categorization, appeal preparation, tracking, and trend analysis." },
  { q: "Who is Kratu AI built for?", a: "Kratu AI is relevant for health systems, hospitals, independent practices, RCM organizations, and billing companies that need better clinical documentation, operational workflow support, medical billing automation, and denial prevention intelligence." },
  { q: "Where can I learn about the complete Elixir healthcare management suite?", a: "This page provides brief context for Mirketa visitors. The detailed Elixir platform, product modules, and Kratu AI suite should be explored at www.elixirEHR.com." },
];

const SEO = {
  title: "Kratu AI — Healthcare Workflow Intelligence | Mirketa",
  description:
    "Kratu AI embeds intelligence into clinical documentation, payer policy, claims readiness, and denial management — turning healthcare data into decisive action across Elixir.",
  canonical: "https://www.mirketa.com/kratu-ai/",
  keywords: [
    "Kratu AI",
    "healthcare workflow intelligence",
    "AI clinical documentation",
    "denial management AI",
    "Salesforce healthcare AI",
    "Elixir EHR AI assistant",
    "RCM automation AI",
    "claims readiness AI",
    "ambient clinical documentation",
    "payer policy AI",
    "healthcare AI copilot",
    "revenue cycle AI",
  ],
  schema: [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "Healthcare Workflow Intelligence AI Assistant",
      provider: { "@type": "Organization", name: "Mirketa Inc.", url: "https://www.mirketa.com" },
      name: "Kratu AI",
      description:
        "An enterprise AI assistant embedded in the Elixir healthcare platform that connects clinical documentation, payer intelligence, claims readiness, and denial management into one operating model.",
      areaServed: "Global",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.mirketa.com/" },
        { "@type": "ListItem", position: 2, name: "Kratu AI", item: "https://www.mirketa.com/kratu-ai/" },
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
  eyebrow: "Business Highlights",
  heading: "Intelligence that transforms your entire operational workflow.",
  description:
    "Kratu AI consolidates clinical depth and financial precision into a single AI Platform — replacing manual data extraction, slow coding validation, and repetitive documentation with automated, decisive action.",
  benefits: ["Ambient Intelligence", "Administrative Relief", "Pre-Submission Scoring", "Autonomous Defense"],
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

export default function KratuAI() {
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

      gsap.utils.toArray(".kr-reveal").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 32,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      gsap.utils.toArray(".kr-reveal-stagger").forEach((el) => {
        gsap.from(el.children, {
          opacity: 0,
          y: 26,
          duration: 0.6,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      gsap.utils.toArray(".kr-zoom-in").forEach((el) => {
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
    <div className="kratu-ai">
      <Seo {...SEO} />
      <HeroSection heroTextRef={heroTextRef} />
      <ValuePropsSection />
      <ChallengeSection />
      <MeetKratuSection />
      <PillarsSection />
      <JourneySection />
      <WhoItHelpsSection />
      <HighlightsSection />
      <WhyMirketaSection />
      <FaqSection />
      <FinalCtaSection />
      <ContactSection />
    </div>
  );
}

// ============================================================
// HERO — pulse backdrop + glassmorphic intelligence console
// ============================================================

function StatTile({ metric }) {
  const [ref, inView] = useInView(0.5);
  const count = useCountUp(metric.value, inView);
  return (
    <div ref={ref} className="kr-stat">
      <div className="kr-stat__value">
        {inView ? count : 0}
        {metric.suffix}
      </div>
      <p>{metric.label}</p>
    </div>
  );
}

function HeroSection({ heroTextRef }) {
  return (
    <section className="kr-hero" style={{ backgroundImage: cssUrl(Images.heroKratuAi) }} aria-label="Kratu AI healthcare workflow intelligence">
      <div className="kr-hero__scrim" />
      <div className="container">
        <Breadcrumb items={BREADCRUMB_ITEMS} className="kr-breadcrumb" />
      </div>
      <div className="container kr-hero__inner">
        <div ref={heroTextRef} className="kr-hero__text">
          <span className="kr-badge">
            <span className="kr-badge__spark" aria-hidden="true">✦</span> {HERO.badge}
          </span>
          <h1>{HERO.title}</h1>
          <p className="kr-hero__description">{HERO.description}</p>
          <ul className="kr-hero__pillars" aria-label="Kratu AI capability pillars">
            {HERO.pillars.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
          <div className="kr-hero__ctas">
            <a href={HERO.primaryCta.href} className="btn btn-primary kr-btn">
              {HERO.primaryCta.label} <span aria-hidden="true">→</span>
            </a>
            <a href={HERO.secondaryCta.href} className="btn btn-secondary kr-btn">
              {HERO.secondaryCta.label}
            </a>
          </div>

          <div className="kr-hero__trust">
            <span className="kr-hero__trust-label">Backed by Mirketa's enterprise credentials</span>
            <div className="kr-hero__trust-badges">
              {TRUST_BADGES.map((b) => (
                <img key={b.label} src={b.icon} alt={b.label} loading="lazy" />
              ))}
            </div>
          </div>
        </div>

        <aside className="kr-console kr-zoom-in" aria-label="Healthcare Intelligence Console preview">
          <p className="kr-console__eyebrow">{CONSOLE.eyebrow}</p>
          <div className="kr-console__cards">
            {CONSOLE.cards.map((c) => (
              <div className="kr-console__card" key={c.title}>
                <img src={c.icon} alt="" aria-hidden="true" />
                <div>
                  <h3>{c.title}</h3>
                  <p>{c.description}</p>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>

      <div className="kr-hero__stats kr-reveal-stagger">
        {HERO_STATS.map((s) => (
          <StatTile key={s.label} metric={s} />
        ))}
      </div>
    </section>
  );
}

// ============================================================
// CORE VALUE PROPOSITIONS
// ============================================================

function ValuePropsSection() {
  return (
    <section className="section kr-values" id="console" aria-labelledby="kr-values-heading">
      <div className="container">
        <div className="section-heading kr-reveal">
          <p className="kr-eyebrow">{VALUE_PROPS.eyebrow}</p>
          <h2 id="kr-values-heading">{VALUE_PROPS.heading}</h2>
          <p>{VALUE_PROPS.intro}</p>
        </div>
        <div className="kr-values__grid kr-reveal-stagger">
          {VALUE_PROPS.items.map((v) => (
            <div className="kr-value-card" key={v.title}>
              <img src={v.icon} alt="" loading="lazy" />
              <h3>{v.title}</h3>
              <p>{v.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// THE CHALLENGE — fragmented-workflow row with disconnect motif
// ============================================================

function ChallengeSection() {
  return (
    <section className="section kr-challenge" aria-labelledby="kr-challenge-heading">
      <div className="container">
        <div className="section-heading kr-reveal">
          <p className="kr-eyebrow">{CHALLENGE.eyebrow}</p>
          <h2 id="kr-challenge-heading">{CHALLENGE.heading}</h2>
          <p className="kr-challenge__problem">{CHALLENGE.problem}</p>
          <p>{CHALLENGE.intro}</p>
        </div>
        <div className="kr-challenge__row kr-reveal-stagger">
          {CHALLENGE.points.map((p, i) => (
            <div className="kr-challenge-card" key={p.title}>
              <img src={p.icon} alt="" loading="lazy" />
              <h3>{p.title}</h3>
              <p>{p.description}</p>
              {i < CHALLENGE.points.length - 1 && <span className="kr-challenge-card__gap" aria-hidden="true" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// MEET KRATU AI — end-to-end operational intelligence
// ============================================================

function MeetKratuSection() {
  return (
    <section className="section kr-meet" aria-labelledby="kr-meet-heading">
      <div className="container kr-meet__grid">
        <div className="kr-meet__intro kr-reveal">
          <p className="kr-eyebrow">{MEET_KRATU.eyebrow}</p>
          <h2 id="kr-meet-heading">{MEET_KRATU.heading}</h2>
          <p>{MEET_KRATU.intro}</p>
        </div>
        <div className="kr-meet__principles kr-reveal-stagger">
          {MEET_KRATU.principles.map((p, i) => (
            <div className="kr-principle-card" key={p.title}>
              <span className="kr-principle-card__bar" aria-hidden="true" style={{ "--i": i }} />
              <h3>{p.title}</h3>
              <p>{p.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// FIVE CAPABILITY PILLARS — connected horizontal spine
// ============================================================

function PillarsSection() {
  return (
    <section className="section kr-pillars" aria-labelledby="kr-pillars-heading">
      <div className="container">
        <div className="kr-pillars__head kr-reveal">
          <div className="section-heading">
            <p className="kr-eyebrow">{PILLARS.eyebrow}</p>
            <h2 id="kr-pillars-heading">{PILLARS.heading}</h2>
          </div>
          <img src={Images.illoKratuAmbientDocumentationDashboard} alt="" aria-hidden="true" className="kr-pillars__illo" loading="lazy" />
        </div>
        <p className="kr-pillars__stat kr-reveal">{PILLARS.stat}</p>
        <div className="kr-pillars__spine kr-reveal-stagger">
          {PILLARS.items.map((p) => (
            <div className="kr-pillar-card" key={p.tag}>
              <span className="kr-pillar-card__node" aria-hidden="true" />
              <img src={p.icon} alt="" loading="lazy" />
              <span className="kr-pillar-card__tag">{p.tag}</span>
              <h3>{p.title}</h3>
              <p>{p.description}</p>
              <ul className="kr-pillar-card__examples">
                {p.examples.map((ex) => (
                  <li key={ex}>{ex}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// PATIENT-TO-PAYMENT JOURNEY — vertical connected timeline
// ============================================================

function JourneySection() {
  return (
    <section className="section kr-journey" aria-labelledby="kr-journey-heading">
      <div className="container">
        <div className="section-heading kr-reveal">
          <p className="kr-eyebrow">{JOURNEY.eyebrow}</p>
          <h2 id="kr-journey-heading">{JOURNEY.heading}</h2>
        </div>
        <p className="kr-journey__stat kr-reveal">{JOURNEY.stat}</p>
        <ol className="kr-journey__timeline kr-reveal-stagger">
          {JOURNEY.steps.map((s, i) => (
            <li className="kr-journey-step" key={s.title}>
              <span className="kr-journey-step__num">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3>{s.title}</h3>
                <p>{s.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

// ============================================================
// WHO IT HELPS
// ============================================================

function WhoItHelpsSection() {
  return (
    <section className="section kr-who" aria-labelledby="kr-who-heading">
      <div className="container">
        <div className="section-heading kr-reveal">
          <p className="kr-eyebrow">{WHO_IT_HELPS.eyebrow}</p>
          <h2 id="kr-who-heading">{WHO_IT_HELPS.heading}</h2>
          <p>{WHO_IT_HELPS.intro}</p>
        </div>
        <div className="kr-who__grid kr-reveal-stagger">
          {WHO_IT_HELPS.groups.map((g) => (
            <div className="kr-who-card" key={g.title}>
              <img src={g.icon} alt="" loading="lazy" />
              <h3>{g.title}</h3>
              <p>{g.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// BUSINESS HIGHLIGHTS — asymmetric bento
// ============================================================

function HighlightsSection() {
  return (
    <section className="section kr-highlights" aria-labelledby="kr-highlights-heading">
      <div className="container">
        <div className="section-heading kr-reveal">
          <p className="kr-eyebrow">{HIGHLIGHTS.eyebrow}</p>
          <h2 id="kr-highlights-heading">{HIGHLIGHTS.heading}</h2>
          <p>{HIGHLIGHTS.intro}</p>
        </div>
        <div className="kr-highlights__bento kr-reveal-stagger">
          {HIGHLIGHTS.items.map((h, i) => (
            <div className={`kr-highlight-card ${i === 0 ? "kr-highlight-card--lead" : ""}`} key={h.title}>
              <img src={h.icon} alt="" loading="lazy" />
              <h3>{h.title}</h3>
              <p>{h.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// WHY MIRKETA — horizontal list rows
// ============================================================

function WhyMirketaSection() {
  return (
    <section className="section kr-why" aria-labelledby="kr-why-heading">
      <div className="container">
        <div className="section-heading kr-reveal">
          <p className="kr-eyebrow">{WHY_MIRKETA.eyebrow}</p>
          <h2 id="kr-why-heading">{WHY_MIRKETA.heading}</h2>
          <p>{WHY_MIRKETA.intro}</p>
        </div>
        <div className="kr-why__flow kr-reveal-stagger">
          {WHY_MIRKETA.items.map((w, i) => (
            <div className="kr-why-card" key={w.title}>
              <span className="kr-why-card__num">{String(i + 1).padStart(2, "0")}</span>
              <img src={w.icon} alt="" loading="lazy" />
              <h3>{w.title}</h3>
              <p>{w.description}</p>
              {i < WHY_MIRKETA.items.length - 1 && (
                <span className="kr-why-card__arrow" aria-hidden="true">→</span>
              )}
            </div>
          ))}
        </div>

        <div className="kr-why__hub kr-reveal" aria-hidden="true">
          <span className="kr-why__hub-connector" />
          <span className="kr-why__hub-badge">Secure Healthcare AI Deployment</span>
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
    <section className="section kr-faq" aria-labelledby="kr-faq-heading">
      <div className="container">
        <div className="section-heading kr-reveal">
          <p className="kr-eyebrow">FAQ</p>
          <h2 id="kr-faq-heading">Frequently Asked Questions</h2>
          <p>Questions buyers ask about Kratu AI and healthcare workflow intelligence.</p>
        </div>
        <div className="kr-faq__search-wrap kr-reveal">
          <label htmlFor="kr-faq-search" className="visually-hidden">
            Search frequently asked questions
          </label>
          <input
            id="kr-faq-search"
            type="search"
            className="kr-faq__search"
            placeholder="Ask a question — e.g. &quot;RCM&quot;, &quot;chatbot&quot;, &quot;Elixir&quot;..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpenIndex(-1);
            }}
          />
        </div>
        <div className="kr-faq__list kr-reveal">
          {filtered.length === 0 ? (
            <p className="kr-faq__empty">No questions match &ldquo;{query}&rdquo;. Try a different search term.</p>
          ) : (
            filtered.map((item, i) => {
              const open = openIndex === i;
              const panelId = `kr-faq-panel-${i}`;
              return (
                <div className={`kr-faq-item ${open ? "is-open" : ""}`} key={item.q}>
                  <button type="button" className="kr-faq-item__question" aria-expanded={open} aria-controls={panelId} onClick={() => setOpenIndex(open ? -1 : i)}>
                    <span>{item.q}</span>
                    <span className="kr-faq-item__icon" aria-hidden="true">{open ? "−" : "+"}</span>
                  </button>
                  <div id={panelId} className="kr-faq-item__answer" role="region" hidden={!open}>
                    <p>
                      {item.a.includes("www.elixirEHR.com") ? (
                        <>
                          {item.a.split("www.elixirEHR.com")[0]}
                          <a href="https://www.elixirEHR.com" target="_blank" rel="noopener noreferrer">
                            www.elixirEHR.com
                          </a>
                          {item.a.split("www.elixirEHR.com")[1]}
                        </>
                      ) : (
                        item.a
                      )}
                    </p>
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
    <section className="kr-final-cta kr-reveal" aria-labelledby="kr-final-cta-heading">
      <div className="container kr-final-cta__inner">
        <p className="kr-eyebrow">{FINAL_CTA.eyebrow}</p>
        <h2 id="kr-final-cta-heading">{FINAL_CTA.heading}</h2>
        <p>{FINAL_CTA.description}</p>
        <ul className="kr-final-cta__benefits">
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

const CONTACT = {
  heading: "Request a Kratu AI Briefing",
  description:
    "Explore the Kratu AI Accelerator with Mirketa. Use this form to discuss how the Kratu AI story can support healthcare workflow modernization, Salesforce-aligned transformation, AI-powered EHR positioning, clinical documentation, RCM automation, and denial management conversations.",
  formTitle: "Request Executive Briefing",
};

function ContactSection() {
  return <ConsultationSection {...CONTACT} />;
}
