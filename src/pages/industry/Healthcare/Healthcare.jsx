import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Images } from "../../../assets/images/index.js";
import { INDUSTRY_PAGES, SALESFORCE_PAGES, NETSUITE_PAGES, AI_PAGES } from "../../../config/pageSlugs.js";
import Seo from "../../../components/Seo/Seo.jsx";
import StickyCta from "../../../components/StickyCta/StickyCta.jsx";
import TrustedByMarquee from "../../../components/TrustedByMarquee/TrustedByMarquee.jsx";
import AnimatedCounter from "../../../components/AnimatedCounter/AnimatedCounter.jsx";
import FaqAccordion from "../../../components/FaqAccordion/FaqAccordion.jsx";
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb.jsx";
import HeroVisual from "../../../components/HeroVisual/HeroVisual.jsx";
import ConsultationSection from "../../../components/ConsultationSection/ConsultationSection.jsx";
import RelatedServices from "../../../components/RelatedServices/RelatedServices.jsx";
import WorkflowDiagram from "../../../components/illustrations/WorkflowDiagram/WorkflowDiagram.jsx";
import SupplyChainMap from "../../../components/illustrations/SupplyChainMap/SupplyChainMap.jsx";
import AnalyticsPanel from "../../../components/illustrations/AnalyticsPanel/AnalyticsPanel.jsx";
import Timeline from "../../../components/sections/Timeline/Timeline.jsx";
import "./Healthcare.css";

gsap.registerPlugin(ScrollTrigger);

// ============================================================
// SLUG / SEO CONFIGURATION — kept local to this component per
// project convention, sourced from the central pageSlugs.js entry
// so the URL itself still only needs to change in one place.
// ============================================================

export const pageSEO = {
  slug: `${INDUSTRY_PAGES.HEALTHCARE.slug}/`,
  title: "Healthcare Technology Solutions | Mirketa",
  description:
    "Healthcare Technology Solutions from Mirketa: EHR integration, patient engagement, healthcare CRM, and digital health platforms for care teams.",
};

// ============================================================
// ICONS
// ============================================================

const Ico = {
  check: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12.5l5 5L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  pulse: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 12h4l2-7 4 14 2-7h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  cross: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 4v16M4 12h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
  ),
  route: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="6" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.4" /><circle cx="18" cy="18" r="2.5" stroke="currentColor" strokeWidth="1.4" /><path d="M6 8.5V13a4 4 0 004 4h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
  ),
  db: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><ellipse cx="12" cy="6" rx="7" ry="3" stroke="currentColor" strokeWidth="1.4" /><path d="M5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6" stroke="currentColor" strokeWidth="1.4" /><path d="M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3" stroke="currentColor" strokeWidth="1.4" /></svg>
  ),
  compass: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" /><path d="M15 9l-2 6-6 2 2-6 6-2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  clock: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" /><path d="M12 7v5l3.5 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
  ),
  award: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="8" r="5" stroke="currentColor" strokeWidth="1.4" /><path d="M8.5 12.5L7 21l5-2.5L17 21l-1.5-8.5" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  users: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="9" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.4" /><path d="M3.5 19c.6-3.4 2.9-5.2 5.5-5.2s4.9 1.8 5.5 5.2" stroke="currentColor" strokeWidth="1.4" /><circle cx="17" cy="9" r="2.6" stroke="currentColor" strokeWidth="1.3" opacity="0.7" /><path d="M15.5 13.4c2.2.3 3.7 1.9 4 4.6" stroke="currentColor" strokeWidth="1.3" opacity="0.7" /></svg>
  ),
  heart: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 20s-7-4.5-9.3-9A5 5 0 0112 6a5 5 0 019.3 5c-2.3 4.5-9.3 9-9.3 9z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  brain: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 4a3 3 0 00-3 3v1a3 3 0 000 6v1a3 3 0 003 3M15 4a3 3 0 013 3v1a3 3 0 010 6v1a3 3 0 01-3 3M9 4v16M15 4v16" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
  ),
  cloud: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 18h10a4 4 0 000-8 5.5 5.5 0 00-10.7-1.7A4.5 4.5 0 007 18z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  building: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="5" y="3" width="14" height="18" rx="1.4" stroke="currentColor" strokeWidth="1.4" /><path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
  ),
  video: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="6" width="13" height="12" rx="2" stroke="currentColor" strokeWidth="1.4" /><path d="M16 10l5-3v10l-5-3" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  flask: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 3h6M10 3v6l-5 9a2 2 0 001.7 3h10.6a2 2 0 001.7-3l-5-9V3" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
};

// ============================================================
// DATA
// ============================================================

const BREADCRUMB_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Industry", href: "/" },
  { label: INDUSTRY_PAGES.HEALTHCARE.label },
];

const HERO = {
  badge: "Healthcare Technology Partner",
  title: "Healthcare Technology Solutions That Keep Patient Data Connected and Compliant",
  description:
    "Mirketa's Healthcare Technology Solutions connect EHR systems, patient engagement platforms, and care coordination tools into one HIPAA-compliant view — so care teams spend less time re-entering the same patient information and more time on the care itself, with referrals, follow-ups, and outreach that actually close the loop.",
  primaryCta: { label: "Get a Healthcare Technology Assessment", href: "#contact" },
  secondaryCta: { label: "Talk to a Healthcare Technology Advisor", href: "#contact" },
  metrics: ["HIPAA-Compliant Architecture", "EHR & CRM Integration Experience", "Patient Engagement Automation", "Care Coordination Built In"],
};

const HERO_DASHBOARD = {
  title: "Care Coordination Console",
  stats: [
    { label: "REFERRAL CLOSE RATE", value: "94%", caption: "Scheduled and attended" },
    { label: "INTAKE TIME", value: "-38%", caption: "With EHR-connected forms" },
    { label: "COMPLIANCE", value: "100%", caption: "HIPAA-audited messaging" },
  ],
  rows: [
    { title: "Specialist referral — patient #4471", meta: "Appointment scheduled, EHR updated", tone: "good", status: "Closed Loop" },
    { title: "Digital intake form — new patient", meta: "Synced directly to EHR record", tone: "good", status: "Complete" },
    { title: "Care team handoff — cardiology", meta: "Awaiting case manager review", tone: "neutral", status: "Pending" },
  ],
  floatingCards: [
    { icon: Ico.shield, title: "HIPAA-Compliant", subtitle: "Built into the architecture" },
    { icon: Ico.pulse, title: "94% Referral Closure", subtitle: "Tracked end to end" },
  ],
};

const CHALLENGES = {
  eyebrow: "Industry Challenges",
  heading: "Why Patient Data Stays Disconnected Across Care Settings",
  intro:
    "Healthcare technology challenges rarely come down to one broken system. They come down to EHR, scheduling, and patient engagement platforms that were never designed to share information.",
  items: [
    { title: "EHR Data Disconnected From Patient Engagement", description: "Appointment reminders and follow-up outreach run from a separate system that doesn't reflect what's actually in the patient's chart." },
    { title: "Referral Loops That Never Close", description: "Referrals get sent to specialists with no visibility into whether the patient actually scheduled or attended the appointment." },
    { title: "Manual Intake Slows Every Visit", description: "Patients fill out the same information on paper forms that already exists in the EHR from a prior visit." },
    { title: "Care Coordination Across Teams Is Manual", description: "Care managers track patient handoffs between departments in spreadsheets instead of a shared system." },
  ],
};

const SOLUTION = {
  eyebrow: "Industry Solutions",
  heading: "One Connected, HIPAA-Compliant View of the Patient Journey",
  paragraphs: [
    "Mirketa's Healthcare Technology Solutions start with the systems your care teams already touch every day — EHR platforms, scheduling systems, and patient engagement tools — and connect them so patient information flows automatically instead of being re-entered at every step.",
    "Compliance is built into the architecture from the start, not layered on afterward. Patient messaging, digital intake, and data handling are designed to meet HIPAA requirements as a baseline, so your compliance team isn't reviewing a workaround after the fact.",
    "The same connected data model that speeds up scheduling and intake also closes the referral loop — when a specialist referral is sent, care coordinators can see whether the patient scheduled, attended, and what the outcome was, instead of losing visibility the moment the referral leaves your system.",
  ],
};

const SERVICES = {
  eyebrow: "Services We Offer",
  heading: "Six Ways Mirketa Supports Healthcare Technology",
  intro: "Every engagement starts with one of these six service lines and expands as your care organization's technology roadmap takes shape.",
  items: [
    { icon: Ico.db, title: "EHR Integration", description: "Electronic health record data connected to scheduling, patient engagement, and care coordination systems." },
    { icon: Ico.route, title: "Patient Engagement Automation", description: "Appointment reminders, follow-up outreach, and digital intake connected directly to patient records." },
    { icon: Ico.compass, title: "Referral Management & Care Coordination", description: "Referral loops tracked end to end, so care teams know whether a patient actually completed the referral." },
    { icon: Ico.heart, title: "Healthcare CRM Implementation", description: "A patient relationship view built for how care teams and patient access staff actually work." },
    { icon: Ico.video, title: "Telehealth Platform Integration", description: "Virtual care visits connected to the same patient record as in-person care, not a separate silo." },
    { icon: Ico.shield, title: "HIPAA Compliance & Data Security", description: "Data handling, messaging, and access controls designed to meet HIPAA requirements from day one." },
  ],
};

const PLATFORM_EXPERTISE = {
  eyebrow: "Platform Expertise",
  heading: "The Platforms Behind Every Healthcare Technology Engagement",
  intro: "We bring proven implementation depth across the platforms healthcare organizations already depend on.",
  items: [
    { title: "Salesforce Health Cloud", description: "Patient relationship and care coordination views built for how care teams actually operate." },
    { title: "NetSuite for Healthcare Financial Operations", description: "Financial consolidation for healthcare organizations managing multiple facilities or practice groups." },
    { title: "AI-Powered Patient Engagement", description: "Predictive outreach that flags patients likely to miss appointments or fall out of a care plan." },
    { title: "HIPAA-Compliant Cloud Infrastructure", description: "Data segregation and access controls appropriate for protected health information." },
  ],
};

const AI_AUTOMATION = {
  eyebrow: "AI & Automation",
  heading: "Where AI Actually Improves Patient Outcomes and Reduces Admin Work",
  intro: "These are the AI and automation capabilities Mirketa builds into healthcare technology engagements once the data foundation is in place.",
  items: [
    { title: "Predictive No-Show Outreach", description: "Patients likely to miss an appointment identified and reached with targeted reminders before the visit." },
    { title: "Automated Referral Tracking", description: "Referral status updates captured automatically instead of care coordinators calling to check." },
    { title: "Digital Intake With EHR Sync", description: "Patient-entered intake information flows directly into the EHR instead of being manually transcribed." },
    { title: "Care Gap Identification", description: "Patients overdue for preventive care or follow-up flagged automatically from EHR data." },
    { title: "AI-Assisted Care Coordination Notes", description: "Care team handoff notes summarized automatically from patient records and recent encounters." },
    { title: "Natural Language Population Health Queries", description: "Care teams can ask plain-language questions across patient population data instead of building a new report." },
  ],
};

const BENEFITS = {
  eyebrow: "Business Benefits",
  heading: "What Changes Once Patient Data Runs on One Connected Layer",
  intro: "These are the outcomes Mirketa's healthcare technology clients consistently report.",
  stats: [
    { value: "31%", label: "Reduction in No-Show Rate" },
    { value: "94%", label: "Referral Completion Rate" },
    { value: "100%", label: "HIPAA-Compliant Messaging" },
    { value: "45%", label: "Less Time on Manual Intake" },
  ],
  items: [
    { title: "Care Teams Spend Less Time on Data Entry", description: "Connected systems mean patient information is entered once and flows everywhere it's needed." },
    { title: "Referrals That Actually Close the Loop", description: "Care coordinators see referral status end to end instead of losing visibility after the referral is sent." },
    { title: "Fewer Missed Appointments", description: "Automated, targeted outreach reduces no-show rates without adding staff workload." },
    { title: "Compliance Built In, Not Bolted On", description: "HIPAA requirements are part of the architecture from day one, not a retrofit after an audit." },
  ],
};

const USE_CASES = {
  eyebrow: "Industry Use Cases",
  heading: "Healthcare Technology Across Care Settings",
  intro: "Every care setting brings its own workflow and compliance requirements — our approach adapts to how each one actually operates.",
  items: [
    { icon: Ico.building, title: "Hospitals & Health Systems" },
    { icon: Ico.cross, title: "Ambulatory Care" },
    { icon: Ico.video, title: "Telehealth Providers" },
    { icon: Ico.shield, title: "Payers & Health Plans" },
    { icon: Ico.flask, title: "Life Sciences" },
    { icon: Ico.heart, title: "Behavioral Health" },
  ],
};

const SUCCESS_STORIES = {
  eyebrow: "Success Stories",
  heading: "Real Healthcare Technology Outcomes",
  intro: "Anonymized results from recent healthcare technology engagements.",
  cases: [
    {
      title: "Ambulatory Care Network Cuts No-Show Rate by 31%",
      industry: "Ambulatory Care",
      challenge: "Appointment reminders were sent from a system disconnected from the EHR, so outreach wasn't personalized or well-timed.",
      solution: "We connected patient engagement outreach directly to EHR scheduling data with automated, targeted reminders.",
      outcome: "No-show rate dropped 31% within two quarters, with no additional staff time required.",
    },
    {
      title: "Health System Closes 94% of Specialist Referral Loops",
      industry: "Hospitals & Health Systems",
      challenge: "Referrals to specialists had no tracking after they left the referring system, leaving care coordinators unable to confirm follow-through.",
      solution: "We implemented end-to-end referral tracking connected to both referring and receiving systems.",
      outcome: "Referral completion visibility increased to 94%, with care coordinators now able to intervene on incomplete referrals.",
    },
  ],
};

const WHY_MIRKETA = {
  eyebrow: "Why Choose Mirketa",
  heading: "A Technology Partner That Understands Patient Care Workflows",
  intro: "Plenty of partners can implement a CRM. Fewer understand the compliance and clinical workflow requirements that shape every healthcare technology decision.",
  items: [
    { icon: Ico.award, title: "HIPAA-Compliant Architecture", description: "Data handling and messaging built to meet HIPAA requirements as a baseline, not an afterthought." },
    { icon: Ico.compass, title: "Deep Healthcare Domain Experience", description: "We understand EHR workflows, referral management, and care coordination, not just generic enterprise software." },
    { icon: Ico.clock, title: "Rapid, Compliant Implementation", description: "Fixed-scope delivery that respects the compliance review your organization requires." },
    { icon: Ico.shield, title: "Patient Data Security First", description: "Access controls and data segregation appropriate for protected health information." },
    { icon: Ico.users, title: "Dedicated Delivery Team", description: "The consultants who scope your engagement support it through go-live and beyond." },
    { icon: Ico.heart, title: "Support Beyond Go-Live", description: "Ongoing technology support available as your care organization's needs evolve." },
  ],
};

const TECHNOLOGIES = {
  eyebrow: "Technology Stack",
  heading: "The Platforms We Build Healthcare Technology On",
  intro: "Selected based on your care setting and compliance requirements, not a default recommendation.",
  items: [
    { icon: Ico.cloud, title: "Salesforce Health Cloud" },
    { icon: Ico.db, title: "NetSuite" },
    { icon: Ico.video, title: "Telehealth Platform Integration" },
    { icon: Ico.brain, title: "AI & ML Patient Analytics" },
    { icon: Ico.shield, title: "HIPAA-Compliant Cloud Infrastructure" },
    { icon: Ico.route, title: "EHR Integration APIs" },
  ],
};

const PROCESS = {
  eyebrow: "Industry Process",
  heading: "A Five-Stage Path From Assessment to Connected Care Operations",
  intro: "A structured methodology refined across healthcare technology engagements spanning hospitals, ambulatory care, and telehealth.",
  steps: [
    { label: "Compliance Assessment" },
    { label: "Technology Roadmap" },
    { label: "Integration & Automation" },
    { label: "Clinical Validation" },
    { label: "Launch & Optimize" },
  ],
  detail: [
    { name: "Compliance Assessment", description: "Current EHR, scheduling, and patient engagement systems mapped against HIPAA and workflow requirements." },
    { name: "Technology Roadmap", description: "An integration and automation plan documented and prioritized against your care delivery model." },
    { name: "Integration & Automation", description: "EHR, patient engagement, and care coordination systems connected on a shared, compliant data model." },
    { name: "Clinical Validation", description: "Structured testing with clinical and administrative stakeholders before anything goes live." },
    { name: "Launch & Optimize", description: "Supported go-live followed by continuous refinement as care delivery needs evolve." },
  ],
};

const FAQS = [
  { q: "What are Healthcare Technology Solutions from Mirketa?", a: "Healthcare Technology Solutions cover EHR integration, patient engagement automation, referral management and care coordination, healthcare CRM implementation, telehealth integration, and HIPAA compliance for care organizations." },
  { q: "Is your approach HIPAA-compliant?", a: "Yes. Data handling, patient messaging, and access controls are designed to meet HIPAA requirements as a baseline architecture decision, not an afterthought added after implementation." },
  { q: "Can you integrate with our existing EHR system?", a: "Yes. We connect leading EHR platforms to scheduling, patient engagement, and care coordination systems using secure, compliant integration patterns." },
  { q: "Do you work with hospitals, or only smaller care settings?", a: "We work across care settings, including hospitals and health systems, ambulatory care, telehealth providers, payers and health plans, life sciences organizations, and behavioral health providers." },
  { q: "How does this help reduce patient no-shows?", a: "By connecting patient engagement outreach directly to EHR scheduling data, we build automated, targeted reminders that reflect the actual appointment and patient history, reducing no-show rates." },
  { q: "Can you help close the loop on specialist referrals?", a: "Yes. We implement end-to-end referral tracking connected to both referring and receiving systems, so care coordinators can see whether a patient actually completed a referral." },
  { q: "What platforms do you typically implement for healthcare clients?", a: "Most engagements involve Salesforce Health Cloud for patient relationship management, supplemented with NetSuite for financial operations and AI-powered patient engagement analytics." },
  { q: "Do you provide ongoing support after go-live?", a: "Yes. Every engagement can transition into ongoing support as your care organization's compliance and workflow needs evolve." },
];

const RELATED_SERVICES = {
  eyebrow: "Related Services",
  heading: "Explore More Ways Mirketa Supports Healthcare Organizations",
  intro: "Healthcare technology often overlaps with related industries and platforms. Here's where to look next.",
  items: [
    { slug: INDUSTRY_PAGES.EDUCATION.slug, label: INDUSTRY_PAGES.EDUCATION.label, description: "Explore technology solutions for the education institutions that partner with healthcare organizations on training and research." },
    { slug: INDUSTRY_PAGES.HI_TECH.slug, label: INDUSTRY_PAGES.HI_TECH.label, description: "See how Mirketa supports the digital health and life sciences technology companies adjacent to healthcare." },
    { slug: SALESFORCE_PAGES.DEVELOPMENT_CONSULTING.slug, label: SALESFORCE_PAGES.DEVELOPMENT_CONSULTING.label, description: "Build patient relationship management on Salesforce Health Cloud." },
    { slug: NETSUITE_PAGES.AI.slug, label: NETSUITE_PAGES.AI.label, description: "Bring AI-assisted forecasting and reporting into a NetSuite instance already running healthcare financial operations." },
    { slug: AI_PAGES.AI_DATA_FOUNDATIONS.slug, label: AI_PAGES.AI_DATA_FOUNDATIONS.label, description: "Build the governed, compliant data foundation that makes patient analytics and AI reliable." },
  ],
};

const FINAL_CTA = {
  heading: "Turn Connected Patient Data Into Better Care Outcomes",
  description: "Partner with Mirketa to connect EHR, patient engagement, and care coordination on one HIPAA-compliant platform — or talk to a healthcare technology advisor first.",
  primaryCta: { label: "Get a Healthcare Technology Assessment", href: "#contact" },
  secondaryCta: { label: "Talk to a Healthcare Technology Advisor", href: "#contact" },
};

const CONSULTATION = {
  eyebrow: "Get Started",
  heading: "Get a Healthcare Technology Assessment",
  description: "Tell us about your care setting, EHR system, and patient engagement needs — a healthcare technology advisor will follow up within one business day.",
  formTitle: "Get a Free Healthcare Technology Assessment",
};

const SEO = {
  title: pageSEO.title,
  description: pageSEO.description,
  canonical: `https://mirketa.us${pageSEO.slug}`,
  keywords: [
    "Healthcare Technology Solutions",
    "EHR",
    "Patient Engagement",
    "Healthcare CRM",
    "Digital Health",
  ],
  schema: [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "Healthcare Technology Solutions",
      provider: { "@type": "Organization", name: "Mirketa Inc.", url: "https://mirketa.us" },
      name: "Healthcare Technology Solutions",
      description: "EHR integration, patient engagement automation, referral management, and HIPAA-compliant technology for care organizations.",
      areaServed: "Global",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://mirketa.us/" },
        { "@type": "ListItem", position: 2, name: INDUSTRY_PAGES.HEALTHCARE.label, item: `https://mirketa.us${pageSEO.slug}` },
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

export default function Healthcare() {
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

      gsap.utils.toArray(".hct-reveal").forEach((el) => {
        gsap.from(el, { opacity: prefersReduced ? 1 : 0, y: prefersReduced ? 0 : 32, duration: 0.7, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 88%" } });
      });
      gsap.utils.toArray(".hct-reveal-left").forEach((el) => {
        gsap.from(el, { opacity: prefersReduced ? 1 : 0, x: prefersReduced ? 0 : -30, duration: 0.7, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 88%" } });
      });
      gsap.utils.toArray(".hct-reveal-right").forEach((el) => {
        gsap.from(el, { opacity: prefersReduced ? 1 : 0, x: prefersReduced ? 0 : 30, duration: 0.7, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 88%" } });
      });
      gsap.utils.toArray(".hct-reveal-stagger").forEach((el) => {
        gsap.from(el.children, { opacity: prefersReduced ? 1 : 0, y: prefersReduced ? 0 : 26, duration: 0.6, stagger: 0.06, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 85%" } });
      });
      gsap.utils.toArray(".hct-zoom-in").forEach((el) => {
        gsap.from(el, { opacity: prefersReduced ? 1 : 0, scale: prefersReduced ? 1 : 0.94, duration: 0.6, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 88%" } });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="industry-healthcare">
      <Seo {...SEO} />
      <HeroSection heroTextRef={heroTextRef} heroRef={heroRef} />
      <TrustedByMarquee label="Trusted by Hospitals, Health Systems, and Care Networks" />
      <ChallengesSection />
      <SolutionSection />
      <ServicesSection />
      <PlatformExpertiseSection />
      <AiAutomationSection />
      <BenefitsSection />
      <UseCasesSection />
      <SuccessStoriesSection />
      <WhyMirketaSection />
      <TechnologiesSection />
      <ProcessSection />
      <FaqSection />
      <RelatedServices {...RELATED_SERVICES} className="hct-related hct-reveal" />
      <FinalCtaSection />
      <ConsultationSection {...CONSULTATION} />
      <StickyCta heroRef={heroRef} label="Get a Healthcare Technology Assessment" />
    </div>
  );
}

// ============================================================
// HERO
// ============================================================

function HeroSection({ heroTextRef, heroRef }) {
  return (
    <section ref={heroRef} className="hct-hero" style={{ backgroundImage: `url("${Images.heroIndustryHealthcare}")` }} aria-label="Healthcare Technology Solutions by Mirketa">
      <div className="hct-hero__scrim" />
      <div className="container">
        <Breadcrumb items={BREADCRUMB_ITEMS} className="hct-breadcrumb" />
        <div className="hct-hero__inner">
          <div ref={heroTextRef} className="hct-hero__text">
            <span className="hct-badge">
              <span className="hct-badge__spark" aria-hidden="true">✦</span> {HERO.badge}
            </span>
            <h1>{HERO.title}</h1>
            <p className="hct-hero__description">{HERO.description}</p>
            <div className="hct-hero__ctas">
              <a href={HERO.primaryCta.href} className="btn btn-primary hct-btn">
                {HERO.primaryCta.label} <span aria-hidden="true">→</span>
              </a>
              <a href={HERO.secondaryCta.href} className="btn btn-secondary hct-btn">
                {HERO.secondaryCta.label}
              </a>
            </div>
            <ul className="hct-hero__metrics">
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
            className="hct-hero__visual hct-zoom-in"
          />
        </div>
      </div>
    </section>
  );
}

// ============================================================
// INDUSTRY CHALLENGES
// ============================================================

function ChallengesSection() {
  return (
    <section className="section hct-challenges" aria-labelledby="hct-challenges-heading">
      <div className="container">
        <div className="section-heading hct-reveal">
          <p className="hct-eyebrow">{CHALLENGES.eyebrow}</p>
          <h2 id="hct-challenges-heading">{CHALLENGES.heading}</h2>
          <p>{CHALLENGES.intro}</p>
        </div>
        <div className="hct-challenges__grid hct-reveal-stagger">
          {CHALLENGES.items.map((c) => (
            <div className="hct-challenge-card" key={c.title}>
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
// INDUSTRY SOLUTIONS
// ============================================================

function SolutionSection() {
  return (
    <section className="section hct-solution" aria-labelledby="hct-solution-heading">
      <div className="container hct-solution__grid">
        <div className="hct-reveal-left">
          <p className="hct-eyebrow">{SOLUTION.eyebrow}</p>
          <h2 id="hct-solution-heading">{SOLUTION.heading}</h2>
          {SOLUTION.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <div className="hct-reveal-right">
          <AnalyticsPanel
            title="Referral Loop Completion"
            donutPercent={94}
            donutLabel="Specialist referrals tracked to completion"
            metrics={[
              { value: "94%", label: "Referral completion rate" },
              { value: "-31%", label: "No-show rate" },
            ]}
          />
        </div>
      </div>
    </section>
  );
}

// ============================================================
// SERVICES WE OFFER
// ============================================================

function ServicesSection() {
  return (
    <section className="section hct-services" aria-labelledby="hct-services-heading">
      <div className="container">
        <div className="hct-services__head hct-reveal">
          <img src={Images.industryHealthcare} alt="" aria-hidden="true" className="hct-services__illo" loading="lazy" />
          <div className="section-heading">
            <p className="hct-eyebrow">{SERVICES.eyebrow}</p>
            <h2 id="hct-services-heading">{SERVICES.heading}</h2>
            <p>{SERVICES.intro}</p>
          </div>
        </div>
        <div className="hct-services__grid hct-reveal-stagger">
          {SERVICES.items.map((c) => (
            <div className="hct-service-card" key={c.title}>
              <span className="hct-service-card__icon">{c.icon}</span>
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
// PLATFORM EXPERTISE
// ============================================================

function PlatformExpertiseSection() {
  return (
    <section className="section hct-platform" aria-labelledby="hct-platform-heading">
      <div className="container">
        <div className="section-heading hct-reveal">
          <p className="hct-eyebrow">{PLATFORM_EXPERTISE.eyebrow}</p>
          <h2 id="hct-platform-heading">{PLATFORM_EXPERTISE.heading}</h2>
          <p>{PLATFORM_EXPERTISE.intro}</p>
        </div>
        <div className="hct-platform__grid hct-reveal-stagger">
          {PLATFORM_EXPERTISE.items.map((c) => (
            <div className="hct-platform-item" key={c.title}>
              <p className="hct-card-title">{c.title}</p>
              <p>{c.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// AI & AUTOMATION
// ============================================================

function AiAutomationSection() {
  return (
    <section className="section hct-ai" aria-labelledby="hct-ai-heading">
      <div className="container">
        <div className="section-heading hct-reveal">
          <p className="hct-eyebrow">{AI_AUTOMATION.eyebrow}</p>
          <h2 id="hct-ai-heading">{AI_AUTOMATION.heading}</h2>
          <p>{AI_AUTOMATION.intro}</p>
        </div>
        <div className="hct-ai__layout">
          <div className="hct-ai__grid hct-reveal-stagger">
            {AI_AUTOMATION.items.map((f) => (
              <div className="hct-ai-item" key={f.title}>
                <p className="hct-card-title">{f.title}</p>
                <p>{f.description}</p>
              </div>
            ))}
          </div>
          <div className="hct-reveal-right">
            <WorkflowDiagram
              title="Referral Coordination Flow"
              steps={[{ label: "Referred" }, { label: "Scheduled" }, { label: "Attended" }, { label: "Outcome Logged" }, { label: "Closed" }]}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// BUSINESS BENEFITS
// ============================================================

function BenefitsSection() {
  return (
    <section className="section hct-benefits" aria-labelledby="hct-benefits-heading">
      <div className="container">
        <div className="section-heading hct-reveal">
          <p className="hct-eyebrow">{BENEFITS.eyebrow}</p>
          <h2 id="hct-benefits-heading">{BENEFITS.heading}</h2>
          <p>{BENEFITS.intro}</p>
        </div>
        <div className="hct-benefits__stats hct-reveal-stagger">
          {BENEFITS.stats.map((s) => (
            <AnimatedCounter key={s.label} value={s.value} label={s.label} className="hct-stat" />
          ))}
        </div>
        <div className="hct-benefits__grid hct-reveal-stagger">
          {BENEFITS.items.map((b) => (
            <div className="hct-benefit-item" key={b.title}>
              <span aria-hidden="true">{Ico.check}</span>
              <div>
                <p className="hct-card-title">{b.title}</p>
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
// INDUSTRY USE CASES
// ============================================================

function UseCasesSection() {
  return (
    <section className="section hct-usecases" aria-labelledby="hct-usecases-heading">
      <div className="container">
        <div className="section-heading hct-reveal">
          <p className="hct-eyebrow">{USE_CASES.eyebrow}</p>
          <h2 id="hct-usecases-heading">{USE_CASES.heading}</h2>
          <p>{USE_CASES.intro}</p>
        </div>
        <div className="hct-usecases__grid hct-reveal-stagger">
          {USE_CASES.items.map((n) => (
            <div className="hct-usecase-card" key={n.title}>
              <span className="hct-usecase-card__icon">{n.icon}</span>
              <p className="hct-card-title">{n.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// SUCCESS STORIES
// ============================================================

function SuccessStoriesSection() {
  return (
    <section className="section hct-cases" aria-labelledby="hct-cases-heading">
      <div className="container">
        <div className="section-heading hct-reveal">
          <p className="hct-eyebrow">{SUCCESS_STORIES.eyebrow}</p>
          <h2 id="hct-cases-heading">{SUCCESS_STORIES.heading}</h2>
          <p>{SUCCESS_STORIES.intro}</p>
        </div>
        <div className="hct-cases__grid hct-reveal-stagger">
          {SUCCESS_STORIES.cases.map((c) => (
            <div className="hct-case-card" key={c.title}>
              <span className="hct-case-card__tag">{c.industry}</span>
              <p className="hct-card-title">{c.title}</p>
              <dl className="hct-case-card__fields">
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
// WHY CHOOSE MIRKETA
// ============================================================

function WhyMirketaSection() {
  return (
    <section className="section hct-why" aria-labelledby="hct-why-heading">
      <div className="container">
        <div className="section-heading hct-reveal">
          <p className="hct-eyebrow">{WHY_MIRKETA.eyebrow}</p>
          <h2 id="hct-why-heading">{WHY_MIRKETA.heading}</h2>
          <p>{WHY_MIRKETA.intro}</p>
        </div>
        <div className="hct-why__grid hct-reveal-stagger">
          {WHY_MIRKETA.items.map((w) => (
            <div className="hct-why-card" key={w.title}>
              <span className="hct-why-card__icon">{w.icon}</span>
              <p className="hct-card-title">{w.title}</p>
              <p>{w.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// TECHNOLOGY STACK
// ============================================================

function TechnologiesSection() {
  return (
    <section className="section hct-tech" aria-labelledby="hct-tech-heading">
      <div className="container">
        <div className="section-heading hct-reveal">
          <p className="hct-eyebrow">{TECHNOLOGIES.eyebrow}</p>
          <h2 id="hct-tech-heading">{TECHNOLOGIES.heading}</h2>
          <p>{TECHNOLOGIES.intro}</p>
        </div>
        <div className="hct-tech__grid hct-reveal-stagger">
          {TECHNOLOGIES.items.map((t) => (
            <div className="hct-tech-card" key={t.title}>
              <span className="hct-tech-card__icon">{t.icon}</span>
              <p className="hct-card-title">{t.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// INDUSTRY PROCESS
// ============================================================

function ProcessSection() {
  return (
    <section className="section hct-process" aria-labelledby="hct-process-heading">
      <div className="container">
        <div className="section-heading hct-reveal">
          <p className="hct-eyebrow">{PROCESS.eyebrow}</p>
          <h2 id="hct-process-heading">{PROCESS.heading}</h2>
          <p>{PROCESS.intro}</p>
        </div>
        <div className="hct-zoom-in">
          <SupplyChainMap
            title="Care Coordination Network"
            nodes={[
              { label: "Primary Care", short: "PCP" },
              { label: "Specialist", short: "SPEC" },
              { label: "Care Coordinator", short: "CC" },
              { label: "Patient", short: "PT" },
              { label: "Health Plan", short: "PLAN" },
            ]}
          />
        </div>
        <Timeline items={PROCESS.detail} className="hct-timeline hct-reveal-stagger" />
      </div>
    </section>
  );
}

// ============================================================
// FAQ
// ============================================================

function FaqSection() {
  return (
    <section className="section hct-faq" aria-labelledby="hct-faq-heading">
      <div className="container">
        <div className="section-heading hct-reveal">
          <p className="hct-eyebrow">FAQ</p>
          <h2 id="hct-faq-heading">Frequently Asked Questions About Healthcare Technology Solutions</h2>
        </div>
        <FaqAccordion items={FAQS} className="hct-reveal" searchPlaceholder="Ask a question — e.g. &quot;HIPAA&quot;, &quot;referrals&quot;, &quot;EHR&quot;..." />
        <p className="hct-faq__links">
          Related reading: <Link to={INDUSTRY_PAGES.EDUCATION.slug}>{INDUSTRY_PAGES.EDUCATION.label}</Link>,{" "}
          <Link to={INDUSTRY_PAGES.HI_TECH.slug}>{INDUSTRY_PAGES.HI_TECH.label}</Link>,{" "}
          <Link to={SALESFORCE_PAGES.DEVELOPMENT_CONSULTING.slug}>{SALESFORCE_PAGES.DEVELOPMENT_CONSULTING.label}</Link>,{" "}
          <Link to={NETSUITE_PAGES.AI.slug}>{NETSUITE_PAGES.AI.label}</Link>,{" "}
          <Link to={AI_PAGES.AI_DATA_FOUNDATIONS.slug}>{AI_PAGES.AI_DATA_FOUNDATIONS.label}</Link>.
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
    <section className="hct-final-cta hct-reveal" aria-labelledby="hct-final-cta-heading">
      <div className="container hct-final-cta__inner">
        <h2 id="hct-final-cta-heading">{FINAL_CTA.heading}</h2>
        <p>{FINAL_CTA.description}</p>
        <div className="hct-final-cta__ctas">
          <a href={FINAL_CTA.primaryCta.href} className="btn btn-primary hct-btn">
            {FINAL_CTA.primaryCta.label} <span aria-hidden="true">→</span>
          </a>
          <a href={FINAL_CTA.secondaryCta.href} className="btn btn-secondary hct-btn">
            {FINAL_CTA.secondaryCta.label}
          </a>
        </div>
      </div>
    </section>
  );
}
