import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Images } from "../../../assets/images/index.js";
import Seo from "../../../components/Seo/Seo.jsx";
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb.jsx";
import HeroVisual from "../../../components/HeroVisual/HeroVisual.jsx";
import ConsultationSection from "../../../components/ConsultationSection/ConsultationSection.jsx";
import "./PremiumSupport.css";

gsap.registerPlugin(ScrollTrigger);

// ============================================================
// ICONS
// ============================================================

const Ico = {
  check: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12.5l5 5L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  headset: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 13a8 8 0 0116 0v4" stroke="currentColor" strokeWidth="1.5" /><rect x="3" y="13" width="4" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4" /><rect x="17" y="13" width="4" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4" /></svg>
  ),
  gear: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.4" /><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
  ),
  wrench: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M14.7 6.3a4 4 0 00-5.4 5.4L4 17l3 3 5.3-5.3a4 4 0 005.4-5.4l-2 2-2.7-.7-.7-2.7z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  chartUp: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 19V13M10 19V8M16 19v-5M20 19V5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  loop: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 12a8 8 0 0113.6-5.7M20 12a8 8 0 01-13.6 5.7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><path d="M17.5 3.5v3.4h-3.4M6.5 20.5v-3.4h3.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  cloud: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6.5 16.5A4.2 4.2 0 017 8.2 5.5 5.5 0 0117.5 9.5 3.7 3.7 0 0117 17H7" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></svg>
  ),
  database: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><ellipse cx="12" cy="5.5" rx="8" ry="3" stroke="currentColor" strokeWidth="1.4" /><path d="M4 5.5V12c0 1.7 3.6 3 8 3s8-1.3 8-3V5.5" stroke="currentColor" strokeWidth="1.4" /><path d="M4 12v6.5c0 1.7 3.6 3 8 3s8-1.3 8-3V12" stroke="currentColor" strokeWidth="1.4" /></svg>
  ),
  robot: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="5" y="9" width="14" height="10" rx="3" stroke="currentColor" strokeWidth="1.5" /><path d="M12 5v4M9 14h.01M15 14h.01" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /><circle cx="12" cy="4" r="1.4" fill="currentColor" /></svg>
  ),
  eye: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.4" /></svg>
  ),
  clock: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" /><path d="M12 7v5l4 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  bolt: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M13 2L4 14h7l-1 8 10-13h-7l0-7z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  compass: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" /><path d="M15 9l-2 6-6 2 2-6 6-2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  award: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="8" r="5" stroke="currentColor" strokeWidth="1.4" /><path d="M8.5 12.5L7 21l5-2.5L17 21l-1.5-8.5" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  globe: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.4" /><path d="M3 12h18M12 3c2.5 2.5 3.5 6 3.5 9s-1 6.5-3.5 9c-2.5-2.5-3.5-6-3.5-9s1-6.5 3.5-9z" stroke="currentColor" strokeWidth="1.3" /></svg>
  ),
  document: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 3h9l3 3v15H6z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M9 10h6M9 14h6M9 18h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
  ),
  target: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.4" /><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.3" opacity="0.6" /><circle cx="12" cy="12" r="1.2" fill="currentColor" /></svg>
  ),
  quote: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 9c-2 0-3.5 1.6-3.5 3.6 0 2 1.5 3.4 3.3 3.4.3 2.4-1.2 3.9-3.3 4.4v1.3c3.4-.4 5.7-2.8 5.7-6.3V9H7zm10 0c-2 0-3.5 1.6-3.5 3.6 0 2 1.5 3.4 3.3 3.4.3 2.4-1.2 3.9-3.3 4.4v1.3c3.4-.4 5.7-2.8 5.7-6.3V9H17z" fill="currentColor" /></svg>
  ),
};

// ============================================================
// DATA
// ============================================================

const BREADCRUMB = [
  { label: "Home", href: "/" },
  { label: "Platforms & Technology", href: "/" },
  { label: "Oracle Premium Support Service" },
];

const HERO = {
  badge: "Oracle Certified Managed Support Partner",
  title: "Oracle Premium Support Service for Mission-Critical Operations",
  description:
    "Mirketa keeps Oracle applications, databases, and cloud environments running at their best — with proactive monitoring, rapid incident response, and continuous optimization backed by real SLAs.",
  primaryCta: { label: "Schedule a Support Consultation", href: "#contact" },
  secondaryCta: { label: "Talk to an Oracle Support Expert", href: "#contact" },
  metrics: ["24×7×365 Coverage", "99.9% Uptime SLA", "<15 Min Critical Response", "Certified Oracle Support Engineers"],
};

const HERO_DASHBOARD = {
  title: "Oracle Support Operations Center",
  stats: [
    { label: "CRITICAL RESPONSE", value: "<15 Min", caption: "Mission-critical SLA tier" },
    { label: "SLA COMPLIANCE", value: "99.9%", caption: "Tracked and reported monthly" },
    { label: "REPEAT INCIDENTS", value: "62%", caption: "Fewer after root-cause fixes" },
  ],
  rows: [
    { title: "Checkout module — latency alert", meta: "Auto-remediated before ticket opened", tone: "good", status: "Resolved" },
    { title: "Quarterly patch — EBS environment", meta: "Tested in staging, scheduled release window", tone: "neutral", status: "Scheduled" },
    { title: "Database performance — query timeout", meta: "Root-cause diagnostics in progress", tone: "attention", status: "In Progress" },
  ],
  floatingCards: [
    { icon: Ico.clock, title: "24×7×365 Coverage", subtitle: "Proactive monitoring, always on" },
    { icon: Ico.shield, title: "99.9% Uptime SLA", subtitle: "Backed by real accountability" },
  ],
};

const WHY_SUPPORT = {
  eyebrow: "Why Oracle Premium Support",
  heading: "Support That Scales With How Critical Your Oracle Environment Is",
  intro: "Not every system needs the same level of coverage. Our support tiers scale response time, coverage hours, and engineer dedication to match what's actually at stake.",
  tiers: [
    { tier: "Standard", response: "4 business hours", coverage: "Business Hours", engineer: "Shared Support Pool", monitoring: "Business Hours" },
    { tier: "Premium", response: "1 hour", coverage: "Extended Hours", engineer: "Named Engineer", monitoring: "24×7" },
    { tier: "Mission-Critical", response: "15 minutes", coverage: "24×7×365", engineer: "Dedicated Team", monitoring: "24×7 Proactive" },
  ],
};

const OVERVIEW = {
  eyebrow: "Our Oracle Support Services",
  heading: "One Support Partner Across Every Layer of Your Oracle Stack",
  intro: "From day-to-day functional questions to mission-critical incident response, every layer of support runs through the same accountable team.",
  items: [
    { icon: Ico.clock, title: "24×7 Oracle Support", description: "Round-the-clock coverage for the systems that can't afford downtime." },
    { icon: Ico.robot, title: "Oracle Managed Services", description: "A dedicated team operating your environment so your staff can focus on the business." },
    { icon: Ico.headset, title: "Oracle Application Support", description: "Functional and technical support for the applications your teams use every day." },
    { icon: Ico.cloud, title: "Oracle Cloud Support", description: "Cloud infrastructure and application support unified under one accountable team." },
    { icon: Ico.target, title: "Oracle Health Checks", description: "Structured assessments that surface risk before it becomes an incident." },
    { icon: Ico.loop, title: "Continuous Optimization", description: "Ongoing tuning that keeps performance improving long after go-live." },
  ],
};

const PILLARS = [
  {
    id: "functional",
    icon: Ico.headset,
    title: "Functional Support",
    description: "Business process guidance and configuration support for the teams who use Oracle applications every day.",
    capabilities: ["Process Guidance", "Configuration Support"],
  },
  {
    id: "technical",
    icon: Ico.gear,
    title: "Technical Support",
    description: "Deep technical troubleshooting for the issues functional teams can't resolve on their own.",
    capabilities: ["Root-Cause Diagnostics", "Technical Escalations"],
  },
  {
    id: "maintenance",
    icon: Ico.wrench,
    title: "Application Maintenance",
    description: "Ongoing fixes, enhancements, and regression testing that keep your Oracle applications stable release after release.",
    capabilities: ["Bug Fixes", "Regression Testing"],
  },
  {
    id: "performance",
    icon: Ico.chartUp,
    title: "Performance Optimization",
    description: "Tuning that removes the slow reports and timeout errors your teams have learned to work around.",
    capabilities: ["Query Tuning", "Capacity Planning"],
  },
  {
    id: "security",
    icon: Ico.shield,
    title: "Security & Compliance",
    description: "Access reviews and vulnerability monitoring aligned to the compliance requirements your industry actually enforces.",
    capabilities: ["Access Reviews", "Vulnerability Monitoring"],
  },
  {
    id: "patching",
    icon: Ico.loop,
    title: "Patch & Release Management",
    description: "Quarterly Oracle updates tested and applied on your schedule, not discovered as a surprise outage.",
    capabilities: ["Patch Testing", "Rollback Planning"],
  },
  {
    id: "cloud",
    icon: Ico.cloud,
    title: "Oracle Cloud Support",
    description: "Cloud infrastructure and application support unified under one team instead of split across vendors.",
    capabilities: ["Cloud Infrastructure", "Cost Optimization"],
  },
  {
    id: "database",
    icon: Ico.database,
    title: "Database & Middleware Support",
    description: "Database performance and middleware configuration kept healthy beneath every application you run.",
    capabilities: ["Database Tuning", "Backup & Recovery"],
  },
  {
    id: "managed",
    icon: Ico.robot,
    title: "Managed Services",
    description: "A dedicated team operating your Oracle environment day to day, so your staff can focus on the business.",
    capabilities: ["Dedicated Support Team", "SLA-Backed Delivery"],
  },
  {
    id: "monitoring",
    icon: Ico.eye,
    title: "Monitoring & Incident Management",
    description: "Proactive monitoring that catches issues before users report them, with incidents triaged against clear SLA targets.",
    capabilities: ["24×7 Monitoring", "Incident Triage"],
    kpis: [
      { value: "15 Min", label: "Critical Response Time" },
      { value: "99.9%", label: "SLA Compliance" },
      { value: "24×7", label: "Coverage" },
    ],
  },
];

const METHODOLOGY = {
  eyebrow: "Our Support Methodology",
  heading: "A Continuous Cycle, Not a One-Time Engagement",
  intro: "Oracle support isn't a project with an end date. Our methodology repeats every cycle, getting sharper each time it runs.",
  stages: [
    { name: "Onboarding & Health Check", description: "A full assessment of your Oracle environment before support begins." },
    { name: "Proactive Monitoring", description: "24×7 monitoring tuned to your specific systems and thresholds." },
    { name: "Issue Detection", description: "Anomalies flagged before users notice a problem." },
    { name: "Rapid Resolution", description: "Incidents triaged and resolved against SLA targets." },
    { name: "Root-Cause Analysis", description: "Every incident traced to its actual cause, not just patched." },
    { name: "Continuous Optimization", description: "Findings fed back into monitoring thresholds and tuning." },
  ],
};

const WHY_MIRKETA = {
  eyebrow: "Why Choose Mirketa",
  heading: "A Support Partner Held to the Same Standard as Your SLA",
  intro: "Hundreds of vendors can staff a help desk. Fewer can tie every ticket back to a measurable SLA commitment.",
  items: [
    { icon: Ico.award, stat: "100%", title: "Certified Oracle Support Engineers", description: "Every engineer holds active Oracle certifications relevant to your stack." },
    { icon: Ico.globe, stat: "24×7", title: "Global Coverage", description: "Follow-the-sun support across every region you operate in." },
    { icon: Ico.bolt, stat: "90%", title: "Proactive, Not Reactive", description: "Most issues caught and resolved before they ever reach an end user." },
    { icon: Ico.compass, stat: "99.9%", title: "SLA-Backed Accountability", description: "Every commitment tracked and reported against, not just promised." },
  ],
};

const TESTIMONIALS = {
  eyebrow: "Customer Success Stories",
  heading: "What Our Support Clients Say",
  intro: "Real feedback from IT and operations leaders after moving their Oracle environment to Mirketa's premium support.",
  items: [
    { quote: "We went from finding out about outages on Twitter to getting a Mirketa alert twenty minutes before customers noticed anything.", name: "Tobias Lindgren", role: "VP of IT Operations, logistics company", metric: "99.98% uptime achieved" },
    { quote: "Our old support vendor closed tickets. Mirketa's team actually traces the root cause, so the same issue doesn't come back next quarter.", name: "Amara Chukwu", role: "Director of Enterprise Applications", metric: "62% fewer repeat incidents" },
    { quote: "Patch weekends used to mean nobody slept. Now it's a scheduled, tested, unremarkable Tuesday.", name: "Hana Petrova", role: "CIO, financial services firm", metric: "Zero unplanned patch outages" },
  ],
};

const FAQS = [
  { q: "What is Oracle Premium Support Service?", a: "Oracle Premium Support Service is a managed support offering covering functional support, technical troubleshooting, application maintenance, performance optimization, security monitoring, and patch management for Oracle applications and cloud environments, backed by defined SLAs." },
  { q: "What's the difference between functional and technical support?", a: "Functional support helps your teams use Oracle applications correctly — configuration, process guidance, and end-user questions. Technical support handles deeper issues: custom code, integrations, root-cause diagnostics, and infrastructure-level troubleshooting." },
  { q: "What SLA response times do you offer?", a: "Response times scale by tier: 4 business hours for Standard support, 1 hour for Premium, and 15 minutes for Mission-Critical coverage with 24×7×365 monitoring and a dedicated support team." },
  { q: "Do you support Oracle Cloud applications as well as on-premise?", a: "Yes. We support Oracle Cloud applications, on-premise E-Business Suite and PeopleSoft environments, and hybrid deployments, including the underlying database and middleware layers." },
  { q: "How does patch and release management work?", a: "We test quarterly Oracle updates in a non-production environment against your specific configuration before scheduling a coordinated release window, with a rollback plan defined in advance." },
  { q: "Can you take over support from our current Oracle vendor?", a: "Yes. We run a structured knowledge-transfer and health-check process during onboarding, so support continuity is maintained through the transition with no coverage gap." },
  { q: "What AI or automation is involved in your monitoring?", a: "Our monitoring uses anomaly detection tuned to your environment's own historical patterns, flagging and in some cases auto-remediating issues before they escalate to an incident." },
  { q: "Are your support engineers Oracle certified?", a: "Yes. Every engineer assigned to a Premium Support engagement holds active Oracle certifications relevant to the specific applications and infrastructure they support." },
  { q: "Can support scale up during major events like quarter-end or Black Friday?", a: "Yes. We plan elevated coverage and monitoring thresholds around known high-load events, agreed with your team in advance as part of the engagement plan." },
];

const FINAL_CTA = {
  heading: "Keep Your Oracle Environment Running at Its Best",
  description: "Partner with Mirketa's certified Oracle support engineers for proactive monitoring, rapid incident response, and continuous optimization — or speak with an Oracle support expert before you commit to a plan.",
  primaryCta: { label: "Schedule a Support Consultation", href: "#contact" },
  secondaryCta: { label: "Talk to an Oracle Support Expert", href: "#contact" },
};

const SEO = {
  title: "Oracle Premium Support Service | Mirketa",
  description:
    "Mirketa's Oracle Premium Support Service delivers 24×7 managed support, application maintenance, performance optimization, security monitoring, and SLA-backed incident management for Oracle environments.",
  canonical: "https://mirketa.us/oracle-premium-support-service/",
  keywords: [
    "Oracle Premium Support Services",
    "Oracle Managed Services",
    "Oracle Application Support",
    "Oracle Cloud Support",
    "Oracle Technical Support",
    "Oracle Functional Support",
    "Oracle Managed Support",
    "Oracle Support Consulting",
    "Oracle Performance Optimization",
    "Oracle Maintenance Services",
  ],
  schema: [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "Oracle Premium Support Service",
      provider: { "@type": "Organization", name: "Mirketa Inc.", url: "https://mirketa.us" },
      name: "Oracle Premium Support Service",
      description:
        "Managed Oracle support covering functional support, technical support, application maintenance, performance optimization, security monitoring, patch management, and 24×7 incident response.",
      areaServed: "Global",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://mirketa.us/" },
        { "@type": "ListItem", position: 2, name: "Oracle Premium Support Service", item: "https://mirketa.us/oracle-premium-support-service/" },
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

// ============================================================
// MAIN COMPONENT
// ============================================================

export default function PremiumSupport() {
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
          stagger: 0.1,
          ease: "power3.out",
        });
      }

      gsap.utils.toArray(".ops-reveal").forEach((el) => {
        gsap.from(el, {
          opacity: prefersReduced ? 1 : 0,
          y: prefersReduced ? 0 : 32,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      gsap.utils.toArray(".ops-reveal-left").forEach((el) => {
        gsap.from(el, {
          opacity: prefersReduced ? 1 : 0,
          x: prefersReduced ? 0 : -30,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      gsap.utils.toArray(".ops-reveal-right").forEach((el) => {
        gsap.from(el, {
          opacity: prefersReduced ? 1 : 0,
          x: prefersReduced ? 0 : 30,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      gsap.utils.toArray(".ops-reveal-stagger").forEach((el) => {
        gsap.from(el.children, {
          opacity: prefersReduced ? 1 : 0,
          y: prefersReduced ? 0 : 26,
          duration: 0.6,
          stagger: 0.06,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      gsap.utils.toArray(".ops-zoom-in").forEach((el) => {
        gsap.from(el, {
          opacity: prefersReduced ? 1 : 0,
          scale: prefersReduced ? 1 : 0.94,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="oracle-premium-support">
      <Seo {...SEO} />
      <HeroSection heroTextRef={heroTextRef} heroRef={heroRef} />
      <TrustedBySection />
      <WhySupportSection />
      <OverviewSection />
      {PILLARS.map((p) => (
        <PillarSection key={p.id} pillar={p} />
      ))}
      <MethodologySection />
      <WhyMirketaSection />
      <TestimonialsSection />
      <FaqSection />
      <FinalCtaSection />
      <ConsultationSection
        eyebrow="Get Started"
        heading="Schedule a Free Oracle Support Consultation"
        description="Tell us about your current Oracle environment, support challenges, and the coverage hours or SLA response times you need — an Oracle Premium Support expert will follow up within one business day."
        formTitle="Schedule a Free Oracle Support Consultation"
      />
      <StickyCta visible={showStickyCta} />
    </div>
  );
}

// ============================================================
// STICKY CTA
// ============================================================

function StickyCta({ visible }) {
  return (
    <div className={`ops-sticky-cta ${visible ? "is-visible" : ""}`} aria-hidden={!visible}>
      <a href="#contact" className="btn btn-primary ops-btn" tabIndex={visible ? 0 : -1}>
        Schedule a Support Consultation <span aria-hidden="true">→</span>
      </a>
    </div>
  );
}

// ============================================================
// HERO
// ============================================================

function HeroSection({ heroTextRef, heroRef }) {
  return (
    <section ref={heroRef} className="ops-hero" style={{ backgroundImage: `url("${Images.heroOraclePremiumSupport}")` }} aria-label="Oracle Premium Support Service by Mirketa">
      <div className="ops-hero__scrim" />
      <div className="container">
        <Breadcrumb items={BREADCRUMB} className="ops-breadcrumb" />
        <div className="ops-hero__inner">
          <div ref={heroTextRef} className="ops-hero__text">
            <span className="ops-badge">
              <span className="ops-badge__spark" aria-hidden="true">✦</span> {HERO.badge}
            </span>
            <h1>{HERO.title}</h1>
            <p className="ops-hero__description">{HERO.description}</p>
            <div className="ops-hero__ctas">
              <a href={HERO.primaryCta.href} className="btn btn-primary ops-btn">
                {HERO.primaryCta.label} <span aria-hidden="true">→</span>
              </a>
              <a href={HERO.secondaryCta.href} className="btn btn-secondary ops-btn">
                {HERO.secondaryCta.label}
              </a>
            </div>
            <ul className="ops-hero__metrics">
              {HERO.metrics.map((m) => (
                <li key={m}>
                  <span aria-hidden="true">{Ico.check}</span>
                  {m}
                </li>
              ))}
            </ul>
          </div>

          <HeroVisual
            dashboardTitle={HERO_DASHBOARD.title}
            stats={HERO_DASHBOARD.stats}
            rows={HERO_DASHBOARD.rows}
            floatingCards={HERO_DASHBOARD.floatingCards}
            className="ops-hero__visual ops-zoom-in"
          />
        </div>
      </div>
    </section>
  );
}

// ============================================================
// TRUSTED CLIENTS
// ============================================================

function TrustedBySection() {
  const badges = [
    { icon: Images.clientSalesforce, label: "Certified Partner" },
    { icon: Images.clientSoc2, label: "SOC 2 Certified" },
    { icon: Images.clientHipaa, label: "HIPAA Ready" },
    { icon: Images.clientEnterprise, label: "Enterprise Ready" },
    { icon: Images.clientExperience, label: "15+ Years Experience" },
  ];
  const loop = [...badges, ...badges];

  return (
    <section className="ops-trusted" aria-label="Trusted clients">
      <div className="container ops-trusted__inner">
        <p className="ops-trusted__label">Trusted by IT & Operations Leaders</p>
        <div className="ops-trusted__track" role="list">
          <div className="ops-trusted__marquee">
            {loop.map((b, i) => (
              <div className="ops-trusted__badge" role="listitem" key={`${b.label}-${i}`}>
                <img src={b.icon} alt="" aria-hidden="true" />
                <span>{b.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// WHY ORACLE PREMIUM SUPPORT — SLA comparison table
// ============================================================

function WhySupportSection() {
  return (
    <section className="section ops-why" id="services" aria-labelledby="ops-why-heading">
      <div className="container">
        <div className="section-heading ops-reveal">
          <p className="ops-eyebrow">{WHY_SUPPORT.eyebrow}</p>
          <h2 id="ops-why-heading">{WHY_SUPPORT.heading}</h2>
          <p>{WHY_SUPPORT.intro}</p>
        </div>
        <div className="ops-sla-table__wrap ops-reveal">
          <table className="ops-sla-table">
            <caption className="visually-hidden">Oracle Premium Support SLA tiers compared by response time, coverage, engineer assignment, and monitoring</caption>
            <thead>
              <tr>
                <th scope="col">Support Tier</th>
                <th scope="col">Critical Response Time</th>
                <th scope="col">Coverage Hours</th>
                <th scope="col">Dedicated Engineer</th>
                <th scope="col">Monitoring</th>
              </tr>
            </thead>
            <tbody>
              {WHY_SUPPORT.tiers.map((t) => (
                <tr key={t.tier} className={t.tier === "Mission-Critical" ? "is-featured" : ""}>
                  <th scope="row">{t.tier}</th>
                  <td>{t.response}</td>
                  <td>{t.coverage}</td>
                  <td>{t.engineer}</td>
                  <td>{t.monitoring}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// OUR ORACLE SUPPORT SERVICES — borderless big-icon list
// ============================================================

function OverviewSection() {
  return (
    <section className="section ops-overview" aria-labelledby="ops-overview-heading">
      <div className="container">
        <div className="section-heading ops-reveal">
          <p className="ops-eyebrow">{OVERVIEW.eyebrow}</p>
          <h2 id="ops-overview-heading">{OVERVIEW.heading}</h2>
          <p>{OVERVIEW.intro}</p>
        </div>
        <div className="ops-overview__list ops-reveal-stagger">
          {OVERVIEW.items.map((o) => (
            <div className="ops-overview-row" key={o.title}>
              <span className="ops-overview-row__icon">{o.icon}</span>
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

// ============================================================
// SUPPORT PILLARS — monitoring dashboard tiles, each own H2
// ============================================================

function PillarSection({ pillar }) {
  return (
    <section className="section ops-pillar-section" aria-labelledby={`ops-pillar-${pillar.id}-heading`}>
      <div className="container">
        <div className="ops-pillar-tile ops-reveal">
          <div className="ops-pillar-tile__head">
            <span className="ops-pillar-tile__icon">{pillar.icon}</span>
            <span className="ops-pillar-tile__status">
              <span className="ops-pillar-tile__dot" aria-hidden="true" /> 24×7 Monitored
            </span>
          </div>
          <h2 id={`ops-pillar-${pillar.id}-heading`}>{pillar.title}</h2>
          <p>{pillar.description}</p>
          <div className="ops-pillar-tile__chips">
            {pillar.capabilities.map((c) => (
              <span key={c}>{c}</span>
            ))}
          </div>
          {pillar.kpis && (
            <div className="ops-pillar-tile__kpis ops-reveal-stagger">
              {pillar.kpis.map((k) => (
                <PillarKpi key={k.label} value={k.value} label={k.label} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function PillarKpi({ value, label }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const match = value.match(/^([\d.]+)(.*)$/);
    if (!match) {
      setDisplay(value);
      return;
    }
    const target = parseFloat(match[1]);
    const suffix = match[2];
    const isDecimal = match[1].includes(".");

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setDisplay(value);
      return;
    }

    let hasStarted = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          hasStarted = true;
          const duration = 1200;
          const startTime = performance.now();
          const step = (now) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const current = target * progress;
            setDisplay((isDecimal ? current.toFixed(1) : Math.floor(current)) + suffix);
            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              setDisplay(value);
            }
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div className="ops-pillar-tile__kpi" ref={ref}>
      <strong>{display}</strong>
      <span>{label}</span>
    </div>
  );
}

// ============================================================
// OUR SUPPORT METHODOLOGY — continuous cycle
// ============================================================

function MethodologySection() {
  return (
    <section className="section ops-methodology" aria-labelledby="ops-methodology-heading">
      <div className="container">
        <div className="section-heading ops-reveal">
          <p className="ops-eyebrow">{METHODOLOGY.eyebrow}</p>
          <h2 id="ops-methodology-heading">{METHODOLOGY.heading}</h2>
          <p>{METHODOLOGY.intro}</p>
        </div>
        <div className="ops-methodology__cycle ops-reveal-stagger">
          {METHODOLOGY.stages.map((s, i) => (
            <div className="ops-methodology__stage" key={s.name}>
              <div className="ops-methodology__card">
                <span className="ops-methodology__num">{i + 1}</span>
                <h3>{s.name}</h3>
                <p>{s.description}</p>
              </div>
              {i < METHODOLOGY.stages.length - 1 && (
                <span className="ops-methodology__arrow" aria-hidden="true">→</span>
              )}
            </div>
          ))}
        </div>
        <p className="ops-methodology__caption">
          <span aria-hidden="true">↻</span> Continuous Cycle — optimization findings feed directly back into monitoring
        </p>
      </div>
    </section>
  );
}

// ============================================================
// WHY CHOOSE MIRKETA — stat + feature hybrid cards
// ============================================================

function WhyMirketaSection() {
  return (
    <section className="section ops-why-mirketa" aria-labelledby="ops-why-mirketa-heading">
      <div className="container">
        <div className="section-heading ops-reveal">
          <p className="ops-eyebrow">{WHY_MIRKETA.eyebrow}</p>
          <h2 id="ops-why-mirketa-heading">{WHY_MIRKETA.heading}</h2>
          <p>{WHY_MIRKETA.intro}</p>
        </div>
        <div className="ops-why-mirketa__grid ops-reveal-stagger">
          {WHY_MIRKETA.items.map((w) => (
            <div className="ops-why-mirketa-card" key={w.title}>
              <div className="ops-why-mirketa-card__head">
                <span className="ops-why-mirketa-card__icon">{w.icon}</span>
                <strong>{w.stat}</strong>
              </div>
              <h3>{w.title}</h3>
              <p>{w.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// CUSTOMER SUCCESS STORIES — stacked quote list
// ============================================================

function TestimonialsSection() {
  return (
    <section className="section ops-testimonials" aria-labelledby="ops-testimonials-heading">
      <div className="container">
        <div className="section-heading ops-reveal">
          <p className="ops-eyebrow">{TESTIMONIALS.eyebrow}</p>
          <h2 id="ops-testimonials-heading">{TESTIMONIALS.heading}</h2>
          <p>{TESTIMONIALS.intro}</p>
        </div>
        <div className="ops-testimonials__stack ops-reveal-stagger">
          {TESTIMONIALS.items.map((t) => (
            <figure className="ops-testimonial-block" key={t.name}>
              <span className="ops-testimonial-block__mark" aria-hidden="true">{Ico.quote}</span>
              <div>
                <blockquote>{t.quote}</blockquote>
                <figcaption>
                  <strong>{t.name}</strong>
                  <span>{t.role}</span>
                </figcaption>
              </div>
              <p className="ops-testimonial-block__metric">{t.metric}</p>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// FAQ
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
    <section className="section ops-faq" aria-labelledby="ops-faq-heading">
      <div className="container">
        <div className="section-heading ops-reveal">
          <p className="ops-eyebrow">FAQ</p>
          <h2 id="ops-faq-heading">Frequently Asked Questions About Oracle Premium Support</h2>
        </div>
        <div className="ops-faq__search-wrap ops-reveal">
          <label htmlFor="ops-faq-search" className="visually-hidden">
            Search frequently asked questions
          </label>
          <input
            id="ops-faq-search"
            type="search"
            className="ops-faq__search"
            placeholder="Ask a question — e.g. &quot;SLA&quot;, &quot;patch&quot;, &quot;monitoring&quot;..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpenIndex(-1);
            }}
          />
        </div>
        <div className="ops-faq__list ops-reveal">
          {filtered.length === 0 ? (
            <p className="ops-faq__empty">No questions match &ldquo;{query}&rdquo;. Try a different search term.</p>
          ) : (
            filtered.map((item, i) => {
              const open = openIndex === i;
              const panelId = `ops-faq-panel-${i}`;
              return (
                <div className={`ops-faq-item ${open ? "is-open" : ""}`} key={item.q}>
                  <button type="button" className="ops-faq-item__question" aria-expanded={open} aria-controls={panelId} onClick={() => setOpenIndex(open ? -1 : i)}>
                    <span>{item.q}</span>
                    <span className="ops-faq-item__icon" aria-hidden="true">{open ? "−" : "+"}</span>
                  </button>
                  <div id={panelId} className="ops-faq-item__answer" role="region" hidden={!open}>
                    <p>{item.a}</p>
                  </div>
                </div>
              );
            })
          )}
        </div>
        <p className="ops-faq__links">
          Related reading: <Link to="/platforms/oracle/fusion-implementation">Oracle Fusion Applications Implementation</Link>,{" "}
          <Link to="/platforms/salesforce/development-consulting">Salesforce Development & Consulting</Link>,{" "}
          <Link to="/ai-consulting">AI Consulting</Link>, <a href="#services">Support Services</a>.
        </p>
      </div>
    </section>
  );
}

// ============================================================
// FINAL CTA
// ============================================================

function FinalCtaSection() {
  return (
    <section className="ops-final-cta ops-reveal" aria-labelledby="ops-final-cta-heading">
      <div className="container ops-final-cta__inner">
        <h2 id="ops-final-cta-heading">{FINAL_CTA.heading}</h2>
        <p>{FINAL_CTA.description}</p>
        <div className="ops-final-cta__ctas">
          <a href={FINAL_CTA.primaryCta.href} className="btn btn-primary ops-btn">
            {FINAL_CTA.primaryCta.label} <span aria-hidden="true">→</span>
          </a>
          <a href={FINAL_CTA.secondaryCta.href} className="btn btn-secondary ops-btn">
            {FINAL_CTA.secondaryCta.label}
          </a>
        </div>
      </div>
    </section>
  );
}
