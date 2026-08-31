import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { WORKDAY_PAGES, ORACLE_PAGES, SALESFORCE_PAGES, NETSUITE_PAGES, AI_PAGES } from "../../../config/pageSlugs.js";
import { Images } from "../../../assets/images/index.js";
import Seo from "../../../components/Seo/Seo.jsx";
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb.jsx";
import StickyCta from "../../../components/StickyCta/StickyCta.jsx";
import TrustedByMarquee from "../../../components/TrustedByMarquee/TrustedByMarquee.jsx";
import AnimatedCounter from "../../../components/AnimatedCounter/AnimatedCounter.jsx";
import FaqAccordion from "../../../components/FaqAccordion/FaqAccordion.jsx";
import HeroVisual from "../../../components/HeroVisual/HeroVisual.jsx";
import ConsultationSection from "../../../components/ConsultationSection/ConsultationSection.jsx";
import RelatedServices from "../../../components/RelatedServices/RelatedServices.jsx";
import BentoGrid from "../../../components/sections/BentoGrid/BentoGrid.jsx";
import WorkflowDiagram from "../../../components/illustrations/WorkflowDiagram/WorkflowDiagram.jsx";
import SupplyChainMap from "../../../components/illustrations/SupplyChainMap/SupplyChainMap.jsx";
import "./WorkdayConsultingDevelopment.css";

gsap.registerPlugin(ScrollTrigger);

// ============================================================
// ICONS
// ============================================================

const Ico = {
  check: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12.5l5 5L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  users: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="9" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.4" /><path d="M3.5 19c.6-3.4 2.9-5.2 5.5-5.2s4.9 1.8 5.5 5.2" stroke="currentColor" strokeWidth="1.4" /><circle cx="17" cy="9" r="2.6" stroke="currentColor" strokeWidth="1.3" opacity="0.7" /><path d="M15.5 13.4c2.2.3 3.7 1.9 4 4.6" stroke="currentColor" strokeWidth="1.3" opacity="0.7" /></svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  report: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 3h9l3 3v15H6V3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="M9 13l2-2 2 2 3-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  plug: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 3v5M15 3v5M7 8h10v4a5 5 0 01-10 0V8z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="M12 17v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
  ),
  code: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 8l-5 4 5 4M15 8l5 4-5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  compass: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" /><path d="M15 9l-2 6-6 2 2-6 6-2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  gear: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.4" /><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
  ),
  award: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="8" r="5" stroke="currentColor" strokeWidth="1.4" /><path d="M8.5 12.5L7 21l5-2.5L17 21l-1.5-8.5" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  clock: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" /><path d="M12 7v5l3.5 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
  ),
  heart: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 20s-7-4.5-9.3-9A5 5 0 0112 6a5 5 0 019.3 5c-2.3 4.5-9.3 9-9.3 9z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  bank: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 10l8-5 8 5M4 10v9M20 10v9M4 19h16M8 13v4M12 13v4M16 13v4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  factory: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 21V11l5 3V11l5 3V8l8 5v8H3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  cart: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 4h2l2.2 11h10.6L20 7H6.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /><circle cx="9" cy="20" r="1.3" fill="currentColor" /><circle cx="17" cy="20" r="1.3" fill="currentColor" /></svg>
  ),
};

// ============================================================
// DATA
// ============================================================

const BREADCRUMB_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Platforms & Technology", href: "/" },
  { label: WORKDAY_PAGES.CONSULTING_DEVELOPMENT.label },
];

const HERO = {
  badge: "Workday Certified Consulting Partner",
  title: "Workday Consulting and Development Services Built Around Your Org Design",
  description:
    "Mirketa's Workday consulting and development services start with how your organization actually approves work, not with a generic tenant template — business process framework, security groups, calculated fields, and custom reports configured to match your hierarchy, then extended with Workday Studio and EIB integrations where configuration alone can't finish the job.",
  primaryCta: { label: "Get a Workday Configuration Review", href: "#contact" },
  secondaryCta: { label: "Talk to a Workday Consultant", href: "#contact" },
  metrics: ["Workday Certified Consultants", "Business-Process-First Methodology", "Custom Report & EIB Development", "Fixed-Scope Delivery"],
};

const HERO_DASHBOARD = {
  title: "Workday Tenant Health",
  stats: [
    { label: "REPORT ACCURACY", value: "99.1%", caption: "Custom report writer" },
    { label: "ADOPTION", value: "94%", caption: "Manager self-service" },
    { label: "AVG GO-LIVE", value: "10 wks", caption: "Single-domain rollout" },
  ],
  rows: [
    { title: "Business process framework", meta: "Hire-to-retire · Sprint 2", tone: "good", status: "Complete" },
    { title: "Security group architecture", meta: "3 of 5 domains configured", tone: "neutral", status: "In Progress" },
    { title: "EIB payroll integration", meta: "Reconciled against test run", tone: "good", status: "Verified" },
  ],
  floatingCards: [
    { icon: Ico.shield, title: "Security by Design", subtitle: "Domains matched to org" },
    { icon: Ico.report, title: "Custom Reports", subtitle: "Built on real requirements" },
  ],
};

const CHALLENGES = {
  eyebrow: "Business Challenges",
  heading: "Why Workday Tenants Stop Working the Way They Should",
  intro:
    "Workday consulting and development requests rarely start on day one of a new tenant. They start after the original configuration has drifted from how the business actually runs — usually around one of these four problems.",
  items: [
    { title: "Generic Tenant Configuration", description: "The original implementation used out-of-the-box business processes and security groups that never matched your actual approval hierarchy." },
    { title: "A Custom Report Backlog Nobody Owns", description: "Requests for new calculated fields and reports pile up because no one internally has the Workday development bandwidth to build them." },
    { title: "Integrations Break After Every Release", description: "EIB and Workday Studio integrations were built once and never revisited, so each biannual release risks silently breaking a payroll or benefits feed." },
    { title: "One Admin Holds All the Institutional Knowledge", description: "Every business process change routes through a single internal admin, creating a bottleneck and a single point of failure." },
  ],
};

const SOLUTION = {
  eyebrow: "Our Workday Solution",
  heading: "Consulting and Development That Starts With Your Org Chart, Not the Tenant",
  paragraphs: [
    "Mirketa's Workday consulting and development engagements begin with a structured review of how your organization actually approves hires, transfers, compensation changes, and journal entries — then we configure business process framework and security group architecture to match that reality, instead of leaving default Workday settings in place and working around them.",
    "From there, our development team builds what configuration alone can't deliver: calculated fields and custom report writer objects tuned to your KPIs, Workday Extend applications for workflows the platform doesn't natively support, and EIB or Workday Studio integrations connecting your tenant to payroll providers, benefits carriers, and third-party systems.",
    "Because our consultants hold active Workday certifications and follow Workday's own deployment methodology, every business process change we make is documented, testable, and safe to carry through your next release preview — so a configuration change made today doesn't become a mystery your team has to debug in six months.",
  ],
};

const CORE_SERVICES = {
  eyebrow: "Core Services",
  heading: "Six Ways Mirketa Delivers Workday Consulting and Development",
  intro: "Every engagement starts with one of these six service lines and expands as your roadmap takes shape.",
  items: [
    { icon: Ico.compass, title: "Business Process Configuration", description: "Hire-to-retire, procure-to-pay, and record-to-report business processes configured to match your actual approval chains — the foundation every other service on this page builds on.", size: "large" },
    { icon: Ico.shield, title: "Security Group Design", description: "Domain and business process security architecture that enforces segregation of duties without blocking legitimate work." },
    { icon: Ico.report, title: "Custom Report & Dashboard Development", description: "Report writer objects, calculated fields, and composite reports built around the KPIs your leadership actually reviews." },
    { icon: Ico.plug, title: "EIB & Integration Development", description: "Enterprise Interface Builder and Workday Studio integrations connecting your tenant to payroll, benefits, and third-party systems." },
    { icon: Ico.code, title: "Workday Extend Custom Applications", description: "Purpose-built Extend applications for workflows that don't fit inside a standard Workday business process." },
    { icon: Ico.users, title: "Workforce & Org Design Consulting", description: "Organizational structure, supervisory hierarchy, and staffing model design that your Workday configuration should reflect." },
  ],
};

const FEATURES = {
  eyebrow: "Key Features",
  heading: "What a Properly Configured Workday Tenant Actually Includes",
  intro: "These are the capability areas every Mirketa Workday engagement is built around.",
  items: [
    { title: "Business Process Framework", description: "Approval chains, conditional routing, and notification rules configured to your actual org hierarchy." },
    { title: "Report Writer & Calculated Fields", description: "Custom calculated fields and composite reports that answer questions standard delivered reports can't." },
    { title: "Security Group Architecture", description: "Domain security policies and business process security profiles aligned to least-privilege access." },
    { title: "Workday Studio & EIB Integrations", description: "Inbound and outbound integrations built with error handling and monitoring, not one-off scripts." },
    { title: "Workday Extend Applications", description: "Custom apps that extend Workday's data model without leaving the security and audit boundary of the platform." },
    { title: "Workday Prism Analytics Readiness", description: "Data prepared and modeled so Prism dashboards reflect the same numbers finance already trusts." },
  ],
};

const BENEFITS = {
  eyebrow: "Benefits",
  heading: "What Changes Once Your Tenant Matches How You Actually Work",
  intro: "These are the outcomes Mirketa's Workday consulting and development clients consistently report.",
  stats: [
    { value: "94%", label: "Manager Self-Service Adoption" },
    { value: "99.1%", label: "Custom Report Accuracy" },
    { value: "10", label: "Average Weeks to Go-Live" },
    { value: "0", label: "Broken Integrations at Last Release" },
  ],
  items: [
    { title: "Approvals Route to the Right Person, First Time", description: "Business process framework matches your real hierarchy, so requests stop stalling with the wrong approver." },
    { title: "Reports Leadership Actually Trusts", description: "Custom calculated fields and dashboards reflect the KPIs your executive team already tracks elsewhere." },
    { title: "Integrations That Survive Release Weekends", description: "EIB and Studio integrations are documented and regression-tested against every biannual Workday release." },
    { title: "No More Single-Admin Bottleneck", description: "Documented configuration and a support relationship mean business process changes don't depend on one person's memory." },
  ],
};

const PROCESS = {
  eyebrow: "Implementation Methodology",
  heading: "A Five-Stage Path From Assessment to Adoption",
  intro: "A structured methodology that has been refined across Workday consulting and development engagements in professional services, healthcare, and technology.",
  steps: [
    { label: "Discovery & Org Assessment" },
    { label: "Configuration Design" },
    { label: "Build & Development" },
    { label: "Testing & UAT" },
    { label: "Go-Live & Adoption" },
  ],
  detail: [
    { name: "Discovery & Org Assessment", description: "Mapping your current business processes, security groups, and approval hierarchy against how the organization actually operates." },
    { name: "Configuration Design", description: "Business process framework, security architecture, and report design documented and signed off before build begins." },
    { name: "Build & Development", description: "Configuration, calculated fields, custom reports, and any Extend applications or integrations built in a sandbox tenant." },
    { name: "Testing & UAT", description: "Structured testing with your own HR, finance, and IT stakeholders using real approval scenarios." },
    { name: "Go-Live & Adoption", description: "Supported cutover with manager and employee enablement so self-service adoption doesn't lag behind the configuration." },
  ],
};

const INDUSTRIES = {
  eyebrow: "Industry Use Cases",
  heading: "Workday Consulting and Development Across Industries",
  intro: "Every industry brings its own approval hierarchy, compliance requirement, and reporting expectation — our consultants bring specific domain context to each one.",
  items: [
    { icon: Ico.bank, title: "Financial Services" },
    { icon: Ico.heart, title: "Healthcare" },
    { icon: Ico.factory, title: "Manufacturing" },
    { icon: Ico.users, title: "Professional Services" },
    { icon: Ico.code, title: "Technology & SaaS" },
    { icon: Ico.cart, title: "Retail & Consumer Goods" },
  ],
};

const WHY_MIRKETA = {
  eyebrow: "Why Mirketa",
  heading: "A Workday Partner That Starts With Your Org Chart",
  intro: "Plenty of partners can activate Workday modules. Fewer start every engagement by mapping your actual approval hierarchy first.",
  items: [
    { icon: Ico.award, title: "Workday Certified Consultants", description: "Every lead consultant holds active Workday certifications across HCM, Payroll, and Financial Management." },
    { icon: Ico.compass, title: "Business-Process-First Methodology", description: "We document your real approval hierarchy before touching configuration, not after go-live problems appear." },
    { icon: Ico.clock, title: "Fixed-Scope Delivery", description: "A documented scope and timeline agreed before kickoff, with change requests handled transparently." },
    { icon: Ico.shield, title: "Security Designed for Audit", description: "Segregation-of-duties reviews built into every security group design, not bolted on after a finding." },
    { icon: Ico.users, title: "Dedicated Delivery Team", description: "The consultants who scope your engagement configure and support it through go-live and beyond." },
    { icon: Ico.heart, title: "Adoption-Focused Delivery", description: "Manager and employee enablement is part of the engagement, not an afterthought left to your internal team." },
  ],
};

const CASE_STUDIES = {
  eyebrow: "Customer Success / Case Study",
  heading: "Real Workday Consulting and Development Outcomes",
  intro: "Anonymized results from recent Workday engagements across industries.",
  cases: [
    {
      title: "Professional Services Firm Cuts Approval Cycle Time by 65%",
      industry: "Professional Services",
      challenge: "Default business processes routed approvals through generic roles that didn't reflect the firm's actual partner hierarchy, causing weeks-long delays.",
      solution: "We redesigned the business process framework and security groups around the firm's real supervisory organization.",
      outcome: "Average approval cycle time dropped 65%, with requests now routing to the correct approver on the first attempt.",
    },
    {
      title: "Healthcare Network Clears an 18-Month Custom Report Backlog",
      industry: "Healthcare",
      challenge: "HR and finance had submitted dozens of custom report requests that the internal team lacked bandwidth to build.",
      solution: "Our development team built the full backlog of calculated fields and composite reports over two focused sprints.",
      outcome: "Leadership now has real-time visibility into headcount and labor cost metrics that previously took days to compile manually.",
    },
  ],
};

const FAQS = [
  { q: "What is Workday consulting and development, exactly?", a: "It covers business process configuration, security group design, custom report and calculated field development, EIB and Workday Studio integrations, and Workday Extend application development — the advisory and technical layer that keeps a Workday tenant matched to how your organization actually operates." },
  { q: "How long does a typical engagement take?", a: "A focused configuration or reporting engagement typically takes 6 to 10 weeks. Larger engagements involving new business process design across multiple domains or custom integration builds can take 3 to 6 months." },
  { q: "Can you fix a Workday tenant that was implemented by someone else?", a: "Yes. Most of our engagements start with a tenant that's already live. We assess the existing business process framework, security architecture, and report inventory before recommending changes." },
  { q: "Do you build custom integrations?", a: "Yes. We build and maintain EIB integrations and Workday Studio integrations connecting Workday to payroll providers, benefits carriers, and other enterprise systems, with monitoring and regression testing against every release." },
  { q: "What is Workday Extend, and when do we need it?", a: "Workday Extend lets you build custom applications on Workday's data model for workflows the platform doesn't natively support. We recommend it only when configuration and standard business processes genuinely can't meet the requirement." },
  { q: "Do you provide support after go-live?", a: "Yes. Every engagement can transition into an ongoing Workday support and managed services relationship covering enhancement requests, release regression testing, and administration." },
  { q: "Are your consultants Workday certified?", a: "Yes. Mirketa's consultants hold active Workday certifications across HCM, Payroll, and Financial Management, backed by a verified delivery track record." },
  { q: "Can Workday integrate with our existing finance or CRM systems?", a: "Yes. We integrate Workday with Salesforce, NetSuite, Oracle, and other finance and CRM platforms using EIB, Workday Studio, and REST/SOAP APIs so data flows without manual re-entry." },
];

const RELATED_SERVICES = {
  eyebrow: "Related Services",
  heading: "Explore More Ways Mirketa Supports Enterprise HR and Finance Technology",
  intro: "Workday consulting and development is one part of a broader enterprise technology strategy. Here's where to look next.",
  items: [
    { slug: WORKDAY_PAGES.SUPPORT_MANAGED_SERVICES.slug, label: WORKDAY_PAGES.SUPPORT_MANAGED_SERVICES.label, description: "SLA-backed administration, release testing, and enhancement delivery for a live Workday tenant." },
    { slug: NETSUITE_PAGES.IMPLEMENTATION.slug, label: NETSUITE_PAGES.IMPLEMENTATION.label, description: "Connect Workday HCM data to a NetSuite general ledger with a properly designed implementation." },
    { slug: ORACLE_PAGES.FUSION_IMPLEMENTATION.slug, label: ORACLE_PAGES.FUSION_IMPLEMENTATION.label, description: "Considering Oracle Fusion HCM instead? Compare implementation approaches for larger, more complex enterprises." },
    { slug: SALESFORCE_PAGES.DEVELOPMENT_CONSULTING.slug, label: SALESFORCE_PAGES.DEVELOPMENT_CONSULTING.label, description: "Extend your Workday data into Salesforce for sales, service, or people-facing applications." },
    { slug: AI_PAGES.AI_DATA_FOUNDATIONS.slug, label: AI_PAGES.AI_DATA_FOUNDATIONS.label, description: "Build the clean, governed data foundation that makes workforce analytics on top of Workday reliable." },
  ],
};

const CONSULTATION = {
  eyebrow: "Get Started",
  heading: "Get a Workday Configuration Review",
  description: "Tell us about your business processes, security groups, and integration needs — a certified Workday consultant will follow up within one business day.",
  formTitle: "Get a Free Workday Consulting Assessment",
};

const SEO = {
  title: "Workday Consulting and Development Services | Mirketa",
  description:
    "Mirketa's Workday consulting and development services configure business processes, security, and custom reports around your org design, then extend the platform.",
  canonical: `https://mirketa.us${WORKDAY_PAGES.CONSULTING_DEVELOPMENT.slug}/`,
  keywords: [
    "Workday Consulting and Development Services",
    "Workday Consulting",
    "Workday Development",
    "Workday Business Process Configuration",
    "Workday Security Group Design",
    "Workday Custom Reports",
    "Workday EIB Integration",
    "Workday Extend Development",
  ],
  schema: [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "Workday Consulting and Development Services",
      provider: { "@type": "Organization", name: "Mirketa Inc.", url: "https://mirketa.us" },
      name: "Workday Consulting and Development Services",
      description: "Business process configuration, security design, custom reporting, and integration development for Workday HCM, Payroll, and Financial Management.",
      areaServed: "Global",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://mirketa.us/" },
        { "@type": "ListItem", position: 2, name: WORKDAY_PAGES.CONSULTING_DEVELOPMENT.label, item: `https://mirketa.us${WORKDAY_PAGES.CONSULTING_DEVELOPMENT.slug}/` },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ],
};

// ============================================================
// MAIN COMPONENT
// ============================================================

export default function WorkdayConsultingDevelopment() {
  const heroTextRef = useRef(null);
  const heroRef = useRef(null);

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

      gsap.utils.toArray(".wcd-reveal").forEach((el) => {
        gsap.from(el, { opacity: prefersReduced ? 1 : 0, y: prefersReduced ? 0 : 32, duration: 0.7, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 88%" } });
      });
      gsap.utils.toArray(".wcd-reveal-left").forEach((el) => {
        gsap.from(el, { opacity: prefersReduced ? 1 : 0, x: prefersReduced ? 0 : -30, duration: 0.7, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 88%" } });
      });
      gsap.utils.toArray(".wcd-reveal-right").forEach((el) => {
        gsap.from(el, { opacity: prefersReduced ? 1 : 0, x: prefersReduced ? 0 : 30, duration: 0.7, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 88%" } });
      });
      gsap.utils.toArray(".wcd-reveal-stagger").forEach((el) => {
        gsap.from(el.children, { opacity: prefersReduced ? 1 : 0, y: prefersReduced ? 0 : 26, duration: 0.6, stagger: 0.06, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 85%" } });
      });
      gsap.utils.toArray(".wcd-zoom-in").forEach((el) => {
        gsap.from(el, { opacity: prefersReduced ? 1 : 0, scale: prefersReduced ? 1 : 0.94, duration: 0.6, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 88%" } });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="workday-consulting-development">
      <Seo {...SEO} />
      <HeroSection heroTextRef={heroTextRef} heroRef={heroRef} />
      <TrustedByMarquee label="Trusted by HR & Finance Leaders Running Workday" />
      <ChallengesSection />
      <SolutionSection />
      <CoreServicesSection />
      <FeaturesSection />
      <BenefitsSection />
      <ProcessSection />
      <IndustriesSection />
      <WhyMirketaSection />
      <CaseStudySection />
      <FaqSection />
      <RelatedServices {...RELATED_SERVICES} className="wcd-related wcd-reveal" />
      <ConsultationSection {...CONSULTATION} />
      <StickyCta heroRef={heroRef} label="Get a Workday Configuration Review" />
    </div>
  );
}

// ============================================================
// HERO
// ============================================================

function HeroSection({ heroTextRef, heroRef }) {
  return (
    <section ref={heroRef} className="wcd-hero" style={{ backgroundImage: `url("${Images.heroWorkdayConsultingDevelopment}")` }} aria-label="Workday Consulting and Development Services by Mirketa">
      <div className="wcd-hero__scrim" />
      <div className="container">
        <Breadcrumb items={BREADCRUMB_ITEMS} className="wcd-breadcrumb" />
        <div className="wcd-hero__inner">
          <div ref={heroTextRef} className="wcd-hero__text">
            <span className="wcd-badge">
              <span className="wcd-badge__spark" aria-hidden="true">✦</span> {HERO.badge}
            </span>
            <h1>{HERO.title}</h1>
            <p className="wcd-hero__description">{HERO.description}</p>
            <div className="wcd-hero__ctas">
              <a href={HERO.primaryCta.href} className="btn btn-primary wcd-btn">
                {HERO.primaryCta.label} <span aria-hidden="true">→</span>
              </a>
              <a href={HERO.secondaryCta.href} className="btn btn-secondary wcd-btn">
                {HERO.secondaryCta.label}
              </a>
            </div>
            <ul className="wcd-hero__metrics">
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
            className="wcd-hero__visual wcd-zoom-in"
          />
        </div>
      </div>
    </section>
  );
}

// ============================================================
// BUSINESS CHALLENGES
// ============================================================

function ChallengesSection() {
  return (
    <section className="section wcd-challenges" aria-labelledby="wcd-challenges-heading">
      <div className="container">
        <div className="section-heading wcd-reveal">
          <p className="wcd-eyebrow">{CHALLENGES.eyebrow}</p>
          <h2 id="wcd-challenges-heading">{CHALLENGES.heading}</h2>
          <p>{CHALLENGES.intro}</p>
        </div>
        <div className="wcd-challenges__grid wcd-reveal-stagger">
          {CHALLENGES.items.map((c) => (
            <div className="wcd-challenge-card" key={c.title}>
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
// OUR WORKDAY SOLUTION
// ============================================================

function SolutionSection() {
  return (
    <section className="section wcd-solution" aria-labelledby="wcd-solution-heading">
      <div className="container wcd-solution__grid">
        <div className="wcd-reveal-left">
          <p className="wcd-eyebrow">{SOLUTION.eyebrow}</p>
          <h2 id="wcd-solution-heading">{SOLUTION.heading}</h2>
          {SOLUTION.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// CORE SERVICES
// ============================================================

function CoreServicesSection() {
  return (
    <section className="section wcd-core" aria-labelledby="wcd-core-heading">
      <div className="container">
        <div className="section-heading wcd-reveal">
          <p className="wcd-eyebrow">{CORE_SERVICES.eyebrow}</p>
          <h2 id="wcd-core-heading">{CORE_SERVICES.heading}</h2>
          <p>{CORE_SERVICES.intro}</p>
        </div>
        <BentoGrid items={CORE_SERVICES.items} className="wcd-reveal-stagger" />
      </div>
    </section>
  );
}

// ============================================================
// KEY FEATURES
// ============================================================

function FeaturesSection() {
  return (
    <section className="section wcd-features" aria-labelledby="wcd-features-heading">
      <div className="container">
        <div className="section-heading wcd-reveal">
          <p className="wcd-eyebrow">{FEATURES.eyebrow}</p>
          <h2 id="wcd-features-heading">{FEATURES.heading}</h2>
          <p>{FEATURES.intro}</p>
        </div>
        <div className="wcd-features__layout">
          <div className="wcd-features__grid wcd-reveal-stagger">
            {FEATURES.items.map((f) => (
              <div className="wcd-feature-item" key={f.title}>
                <p className="wcd-card-title">{f.title}</p>
                <p>{f.description}</p>
              </div>
            ))}
          </div>
          <div className="wcd-reveal-right">
            <WorkflowDiagram
              title="EIB Integration Lifecycle"
              steps={[{ label: "Data extracted" }, { label: "Validated" }, { label: "Transformed" }, { label: "Loaded to target" }, { label: "Monitored" }]}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// BENEFITS
// ============================================================

function BenefitsSection() {
  return (
    <section className="section wcd-benefits" aria-labelledby="wcd-benefits-heading">
      <div className="container">
        <div className="section-heading wcd-reveal">
          <p className="wcd-eyebrow">{BENEFITS.eyebrow}</p>
          <h2 id="wcd-benefits-heading">{BENEFITS.heading}</h2>
          <p>{BENEFITS.intro}</p>
        </div>
        <div className="wcd-benefits__stats wcd-reveal-stagger">
          {BENEFITS.stats.map((s) => (
            <AnimatedCounter key={s.label} value={s.value} label={s.label} className="wcd-stat" />
          ))}
        </div>
        <div className="wcd-benefits__grid wcd-reveal-stagger">
          {BENEFITS.items.map((b) => (
            <div className="wcd-benefit-item" key={b.title}>
              <span aria-hidden="true">{Ico.check}</span>
              <div>
                <p className="wcd-card-title">{b.title}</p>
                <p>{b.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// IMPLEMENTATION METHODOLOGY
// ============================================================

function ProcessSection() {
  return (
    <section className="section wcd-process" aria-labelledby="wcd-process-heading">
      <div className="container">
        <div className="section-heading wcd-reveal">
          <p className="wcd-eyebrow">{PROCESS.eyebrow}</p>
          <h2 id="wcd-process-heading">{PROCESS.heading}</h2>
          <p>{PROCESS.intro}</p>
        </div>
        <div className="wcd-zoom-in">
          <SupplyChainMap
            title="Engagement Stakeholder Network"
            nodes={[
              { label: "Mirketa Delivery Team", short: "MIR" },
              { label: "HR & People Ops", short: "HR" },
              { label: "Finance & Payroll", short: "FIN" },
              { label: "IT & Security", short: "IT" },
              { label: "Executive Sponsor", short: "EXEC" },
            ]}
          />
        </div>
        <div className="wcd-process__grid wcd-reveal-stagger">
          {PROCESS.detail.map((p, i) => (
            <div className="wcd-step-card" key={p.name}>
              <span className="wcd-step-card__num">{String(i + 1).padStart(2, "0")}</span>
              <p className="wcd-card-title">{p.name}</p>
              <p>{p.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// INDUSTRY USE CASES
// ============================================================

function IndustriesSection() {
  return (
    <section className="section wcd-industries" aria-labelledby="wcd-industries-heading">
      <div className="container">
        <div className="section-heading wcd-reveal">
          <p className="wcd-eyebrow">{INDUSTRIES.eyebrow}</p>
          <h2 id="wcd-industries-heading">{INDUSTRIES.heading}</h2>
          <p>{INDUSTRIES.intro}</p>
        </div>
        <div className="wcd-industries__grid wcd-reveal-stagger">
          {INDUSTRIES.items.map((n) => (
            <div className="wcd-industry-card" key={n.title}>
              <span className="wcd-industry-card__icon">{n.icon}</span>
              <p className="wcd-card-title">{n.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// WHY MIRKETA
// ============================================================

function WhyMirketaSection() {
  return (
    <section className="section wcd-why" aria-labelledby="wcd-why-heading">
      <div className="container">
        <div className="section-heading wcd-reveal">
          <p className="wcd-eyebrow">{WHY_MIRKETA.eyebrow}</p>
          <h2 id="wcd-why-heading">{WHY_MIRKETA.heading}</h2>
          <p>{WHY_MIRKETA.intro}</p>
        </div>
        <div className="wcd-why__grid wcd-reveal-stagger">
          {WHY_MIRKETA.items.map((w) => (
            <div className="wcd-why-card" key={w.title}>
              <span className="wcd-why-card__icon">{w.icon}</span>
              <p className="wcd-card-title">{w.title}</p>
              <p>{w.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// CUSTOMER SUCCESS / CASE STUDY
// ============================================================

function CaseStudySection() {
  return (
    <section className="section wcd-cases" aria-labelledby="wcd-cases-heading">
      <div className="container">
        <div className="section-heading wcd-reveal">
          <p className="wcd-eyebrow">{CASE_STUDIES.eyebrow}</p>
          <h2 id="wcd-cases-heading">{CASE_STUDIES.heading}</h2>
          <p>{CASE_STUDIES.intro}</p>
        </div>
        <div className="wcd-cases__grid wcd-reveal-stagger">
          {CASE_STUDIES.cases.map((c) => (
            <div className="wcd-case-card" key={c.title}>
              <span className="wcd-case-card__tag">{c.industry}</span>
              <p className="wcd-card-title">{c.title}</p>
              <dl className="wcd-case-card__fields">
                <div><dt>Challenge</dt><dd>{c.challenge}</dd></div>
                <div><dt>Solution</dt><dd>{c.solution}</dd></div>
                <div><dt>Outcome</dt><dd>{c.outcome}</dd></div>
              </dl>
            </div>
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
  return (
    <section className="section wcd-faq" aria-labelledby="wcd-faq-heading">
      <div className="container">
        <div className="section-heading wcd-reveal">
          <p className="wcd-eyebrow">FAQ</p>
          <h2 id="wcd-faq-heading">Frequently Asked Questions About Workday Consulting and Development</h2>
        </div>
        <FaqAccordion items={FAQS} className="wcd-reveal" searchPlaceholder="Ask a question — e.g. &quot;security&quot;, &quot;integrations&quot;, &quot;timeline&quot;..." />
        <p className="wcd-faq__links">
          Related reading: <Link to={WORKDAY_PAGES.SUPPORT_MANAGED_SERVICES.slug}>{WORKDAY_PAGES.SUPPORT_MANAGED_SERVICES.label}</Link>,{" "}
          <Link to={NETSUITE_PAGES.IMPLEMENTATION.slug}>{NETSUITE_PAGES.IMPLEMENTATION.label}</Link>,{" "}
          <Link to={ORACLE_PAGES.FUSION_IMPLEMENTATION.slug}>{ORACLE_PAGES.FUSION_IMPLEMENTATION.label}</Link>,{" "}
          <Link to={SALESFORCE_PAGES.DEVELOPMENT_CONSULTING.slug}>{SALESFORCE_PAGES.DEVELOPMENT_CONSULTING.label}</Link>,{" "}
          <Link to={AI_PAGES.AI_DATA_FOUNDATIONS.slug}>{AI_PAGES.AI_DATA_FOUNDATIONS.label}</Link>.
        </p>
      </div>
    </section>
  );
}
