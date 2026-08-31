import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PRODUCT_PAGES, SALESFORCE_PAGES } from "../../../config/pageSlugs.js";
import { Images } from "../../../assets/images/index.js";
import Seo from "../../../components/Seo/Seo.jsx";
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb.jsx";
import StickyCta from "../../../components/StickyCta/StickyCta.jsx";
import TrustedByMarquee from "../../../components/TrustedByMarquee/TrustedByMarquee.jsx";
import FaqAccordion from "../../../components/FaqAccordion/FaqAccordion.jsx";
import HeroVisual from "../../../components/HeroVisual/HeroVisual.jsx";
import ConsultationSection from "../../../components/ConsultationSection/ConsultationSection.jsx";
import RelatedServices from "../../../components/RelatedServices/RelatedServices.jsx";
import WorkflowDiagram from "../../../components/illustrations/WorkflowDiagram/WorkflowDiagram.jsx";
import "./Ecourier.css";

gsap.registerPlugin(ScrollTrigger);

// ============================================================
// SLUG / SEO CONFIGURATION — kept local to this component per
// project convention, sourced from the central pageSlugs.js entry
// so the URL itself still only needs to change in one place.
//
// Keyword strategy (researched against eCourier's verified
// capability — a Salesforce-native scheduled report and dashboard
// delivery tool, not a physical courier/delivery service):
// ============================================================

const seoKeywords = {
  primary: "Automated Salesforce Report Scheduler",
  secondary: [
    "Salesforce report automation",
    "automated report delivery",
    "scheduled Salesforce reports",
    "dashboard scheduling tool",
    "Salesforce reporting automation",
    "recurring report delivery",
    "stakeholder report automation",
    "Salesforce dashboard automation",
  ],
  longTail: [
    "schedule and auto-deliver Salesforce reports",
    "stop manually exporting Salesforce dashboards every week",
    "automated dashboard delivery for stakeholders without Salesforce access",
  ],
};

export const pageSEO = {
  slug: `${PRODUCT_PAGES.ECOURIER.slug}/`,
  title: "Automated Salesforce Report Scheduler | Mirketa",
  description:
    "eCourier is a Salesforce-native report scheduler that customizes and auto-delivers reports and dashboards to any stakeholder — no manual exports needed.",
  keywords: seoKeywords,
};

// ============================================================
// ICONS
// ============================================================

const Ico = {
  check: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12.5l5 5L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  send: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 12l16-8-6 16-3-6-7-2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  clock: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" /><path d="M12 7v5l3.5 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
  ),
  users: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="9" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.4" /><path d="M3.5 19c.6-3.4 2.9-5.2 5.5-5.2s4.9 1.8 5.5 5.2" stroke="currentColor" strokeWidth="1.4" /><circle cx="17" cy="9" r="2.6" stroke="currentColor" strokeWidth="1.3" opacity="0.7" /><path d="M15.5 13.4c2.2.3 3.7 1.9 4 4.6" stroke="currentColor" strokeWidth="1.3" opacity="0.7" /></svg>
  ),
  layers: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3l9 5-9 5-9-5 9-5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M3 13l9 5 9-5" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  list: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
  ),
  history: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 12a9 9 0 109-9M3 12H1M3 12l2-2M3 12l2 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /><path d="M12 8v4l3 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
  ),
  chart: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 20V10M12 20V4M20 20v-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
  ),
  award: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="8" r="5" stroke="currentColor" strokeWidth="1.4" /><path d="M8.5 12.5L7 21l5-2.5L17 21l-1.5-8.5" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  compass: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" /><path d="M15 9l-2 6-6 2 2-6 6-2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  building: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="5" y="3" width="14" height="18" rx="1.4" stroke="currentColor" strokeWidth="1.4" /><path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
  ),
  cloud: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 18h10a4 4 0 000-8 5.5 5.5 0 00-10.7-1.7A4.5 4.5 0 007 18z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  handshake: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M2 12l4-4 4 2 3-3 3 3 4 2-3 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /><path d="M6 14l3 3 3-2 3 2 3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  presentation: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="4" width="18" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.4" /><path d="M12 16v4M8 20h8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /><path d="M7 13l3-3 2 2 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
};

// ============================================================
// DATA
// ============================================================

const BREADCRUMB_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Products & IP", href: "/" },
  { label: PRODUCT_PAGES.ECOURIER.label },
];

const HERO = {
  badge: "Salesforce-Native Reporting Product",
  title: "Automated Salesforce Report Scheduler for Effortless Dashboard Delivery",
  description:
    "eCourier is Mirketa's Salesforce-native report scheduler. It customizes and auto-delivers reports and dashboards to any stakeholder on a recurring schedule — so no one on your team spends Monday morning exporting the same report by hand.",
  primaryCta: { label: "See eCourier in Action", href: "#contact" },
  secondaryCta: { label: "Talk to an eCourier Advisor", href: "#contact" },
  metrics: ["Scheduled, Recurring Report Delivery", "Delivers to Stakeholders Without Salesforce Access", "No Manual Exports Required", "Configurable Per Recipient"],
};

const HERO_DASHBOARD = {
  title: "eCourier Delivery Console",
  stats: [
    { label: "DELIVERY MODE", value: "Scheduled", caption: "Recurring, automated sends" },
    { label: "RECIPIENTS", value: "Any Stakeholder", caption: "Inside or outside Salesforce" },
    { label: "MANUAL EXPORTS", value: "Eliminated", caption: "No more ad hoc requests" },
  ],
  rows: [
    { title: "Weekly sales summary delivered", meta: "Sent to 12 recipients", tone: "good", status: "Complete" },
    { title: "Executive dashboard scheduled", meta: "Monthly delivery configured", tone: "good", status: "Complete" },
    { title: "New recipient added to distribution list", meta: "Pending confirmation", tone: "neutral", status: "In Progress" },
  ],
  floatingCards: [
    { icon: Ico.send, title: "Report Delivered", subtitle: "Direct to inbox, on schedule" },
    { icon: Ico.clock, title: "Recurring Send", subtitle: "No manual export needed" },
  ],
};

const CHALLENGES = {
  eyebrow: "Key Challenges",
  heading: "Why Salesforce Reporting Still Depends on Manual Exports",
  intro:
    "Most Salesforce reporting bottlenecks aren't about the reports themselves — they're about getting those reports to the people who need them, on time, without someone doing it by hand.",
  items: [
    { title: "Weekly Exports Eating Into Someone's Calendar", description: "The same report gets manually exported and emailed out every week, taking real time away from higher-value work." },
    { title: "Stakeholders Without Salesforce Access", description: "Executives, partners, and external stakeholders who need visibility into performance often don't have — or need — a Salesforce login." },
    { title: "Inconsistent Report Formatting", description: "Manually assembled reports vary slightly each time they're sent, making it harder to compare results period over period." },
    { title: "Delayed Decisions From Stale Reports", description: "By the time a manually exported report reaches its recipient, the underlying data may have already changed." },
  ],
};

const SOLUTION = {
  eyebrow: "Solution & Capabilities",
  heading: "Reports and Dashboards That Deliver Themselves",
  paragraphs: [
    "eCourier runs natively inside Salesforce, working directly from the reports and dashboards your teams already build — there's nothing new to design from scratch.",
    "Once a report or dashboard is scheduled, eCourier customizes and delivers it automatically to the recipients who need it, whether they're a Salesforce user or a stakeholder who only ever needs to see the finished output in their inbox.",
    "Mirketa configures eCourier around your organization's actual reporting calendar and distribution lists, so the right report reaches the right person on the right schedule — without anyone needing to remember to send it.",
  ],
};

const SERVICES = {
  eyebrow: "Core Features",
  heading: "What eCourier Delivers Out of the Box",
  intro: "Every eCourier implementation starts from this core capability set, then gets configured to your reporting workflow.",
  items: [
    { icon: Ico.clock, title: "Scheduled Report Delivery", description: "Reports and dashboards delivered automatically on a recurring schedule — daily, weekly, or monthly." },
    { icon: Ico.users, title: "Recipient & Distribution Management", description: "Deliver to any stakeholder, whether they log into Salesforce or only ever see the finished report." },
    { icon: Ico.layers, title: "Dashboard Customization Per Recipient", description: "Tailor what each recipient sees without maintaining a separate dashboard for every audience." },
    { icon: Ico.history, title: "Delivery History & Logs", description: "A clear record of what was sent, to whom, and when — so delivery issues are easy to trace." },
    { icon: Ico.send, title: "Direct-to-Inbox Delivery", description: "Reports arrive as a finished, ready-to-read output — no login or manual export required on the recipient's end." },
    { icon: Ico.list, title: "Recurring Schedule Configuration", description: "Delivery cadence configured to match your actual reporting calendar, not a fixed default interval." },
  ],
};

const TECHNICAL = {
  eyebrow: "Salesforce Platform Fit",
  heading: "Built to Work With the Reports You Already Have",
  intro: "eCourier is Salesforce-native, which shapes how it fits into your existing reporting setup.",
  items: [
    { title: "Runs on Native Salesforce Reports & Dashboards", description: "eCourier delivers the same reports and dashboards your teams already build in Salesforce — nothing to rebuild elsewhere." },
    { title: "No Separate Reporting Tool to Maintain", description: "Because it works from existing Salesforce reports, there's no parallel reporting system to keep in sync." },
    { title: "Configurable Recipient Lists", description: "Distribution lists configured per report, so the right stakeholders receive the right output automatically." },
    { title: "Delivery Independent of Salesforce Login", description: "Recipients receive the finished report directly, whether or not they have a Salesforce license." },
  ],
};

const AI_AUTOMATION = {
  eyebrow: "Automation & Delivery Intelligence",
  heading: "Where Automation Removes the Manual Reporting Work",
  intro: "eCourier's automation is aimed at the repetitive, calendar-driven parts of reporting that consume the most manual time.",
  items: [
    { title: "Rule-Based Delivery Schedules", description: "Delivery timing configured once per report, then handled automatically on every recurring cycle." },
    { title: "No More Manual Exports", description: "Reports that used to require someone to log in, export, and email are now delivered without any manual step." },
    { title: "Consistent Recipient Lists", description: "Distribution lists stay accurate and consistent instead of being rebuilt from memory each time." },
    { title: "Delivery Confirmation & Logging", description: "Every scheduled send is logged, so it's easy to confirm a report actually reached its recipients." },
  ],
};

const BENEFITS = {
  eyebrow: "Benefits",
  heading: "What Changes Once Reporting Runs on Autopilot",
  intro: "These are the practical outcomes teams look for once report delivery stops depending on someone remembering to send it.",
  items: [
    { title: "Stakeholders Get Reports Without Salesforce Access", description: "Executives, partners, and external stakeholders receive finished reports directly, with nothing extra to set up on their end." },
    { title: "Hours Back From Manual Exporting", description: "Time previously spent exporting and formatting reports goes back to the team members who used to do it by hand." },
    { title: "Consistent, On-Time Reporting", description: "Every recipient gets the same report, formatted the same way, on the same schedule, every time." },
    { title: "Less Back-and-Forth on Ad Hoc Requests", description: "Recurring requests for “can you send me that report again” are handled by the schedule instead of an inbox." },
  ],
};

const USE_CASES = {
  eyebrow: "Use Cases",
  heading: "Where Teams Put eCourier to Work",
  intro: "Reporting needs look different depending on the audience — eCourier is configured around each of these delivery patterns.",
  items: [
    { icon: Ico.presentation, title: "Executive Reporting to Non-Salesforce Stakeholders" },
    { icon: Ico.chart, title: "Weekly & Monthly Sales Performance Reports" },
    { icon: Ico.building, title: "Board & Investor Updates" },
    { icon: Ico.handshake, title: "Partner & Vendor Reporting" },
    { icon: Ico.users, title: "Customer-Facing Dashboard Delivery" },
    { icon: Ico.list, title: "Department-Level KPI Reports" },
  ],
};

const SCENARIOS = {
  eyebrow: "Implementation Scenarios",
  heading: "How Teams Typically Configure eCourier",
  intro: "Illustrative scenarios based on common reporting needs — not a specific client engagement.",
  cases: [
    {
      title: "A Sales Team Automates Its Weekly Executive Summary",
      tag: "Sales Reporting",
      challenge: "A sales operations analyst spent part of every Monday manually exporting and emailing the same performance summary to leadership.",
      approach: "Mirketa configured eCourier to deliver the existing Salesforce dashboard automatically every Monday morning to the same distribution list.",
      result: "The report now arrives on schedule without anyone exporting it, freeing up recurring time for other operations work.",
    },
    {
      title: "A Partner Organization Gets Reporting Without a Salesforce Login",
      tag: "Partner Reporting",
      challenge: "An external partner needed regular visibility into shared pipeline data but didn't have — and didn't need — a Salesforce license.",
      approach: "Mirketa configured eCourier to deliver a scoped, recipient-specific report directly to the partner's inbox on a recurring schedule.",
      result: "The partner now receives consistent, formatted reporting without requiring any Salesforce access at all.",
    },
  ],
};

const WHY_MIRKETA = {
  eyebrow: "Why Mirketa",
  heading: "Implementation Support From a Team That Knows Salesforce Reporting",
  intro: "Plenty of partners can install an app. Fewer take the time to understand your actual reporting calendar and who needs to see what.",
  items: [
    { icon: Ico.award, title: "Salesforce Platform Depth", description: "Deep Salesforce implementation experience, applied specifically to how eCourier schedules and delivers reports." },
    { icon: Ico.compass, title: "Reporting Workflow Awareness", description: "Configuration built around your actual reporting calendar and stakeholder list, not a generic default." },
    { icon: Ico.clock, title: "Structured, Scoped Delivery", description: "A defined implementation timeline scoped to the reports and recipients that matter most first." },
    { icon: Ico.shield, title: "Consistent, Reliable Delivery", description: "Delivery schedules and recipient lists configured to be dependable, not a one-time setup that drifts out of date." },
    { icon: Ico.users, title: "Dedicated Delivery Team", description: "The consultants who scope your engagement support it through go-live and beyond." },
    { icon: Ico.compass, title: "Support Beyond Go-Live", description: "Ongoing configuration support available as your reporting needs or recipient list changes." },
  ],
};

const TECHNOLOGIES = {
  eyebrow: "Technology Stack",
  heading: "The Platform Capabilities This Work Builds On",
  intro: "Selected based on your existing Salesforce reports and dashboards, not a default recommendation.",
  items: [
    { icon: Ico.cloud, title: "Salesforce Reports & Dashboards" },
    { icon: Ico.send, title: "eCourier Scheduling Engine" },
    { icon: Ico.clock, title: "Automated Delivery Scheduling" },
    { icon: Ico.users, title: "Recipient & Distribution List Management" },
    { icon: Ico.layers, title: "Salesforce Platform" },
    { icon: Ico.history, title: "Delivery Logging & History" },
  ],
};

const PROCESS = {
  eyebrow: "Implementation Process",
  heading: "A Five-Stage Path From Reporting Assessment to Automated Delivery",
  intro: "A structured methodology for configuring eCourier around your existing reporting calendar.",
  steps: [
    { label: "Reporting Needs Assessment" },
    { label: "Schedule & Recipient Configuration" },
    { label: "Setup & Testing" },
    { label: "Validation" },
    { label: "Launch & Monitor" },
  ],
  detail: [
    { name: "Reporting Needs Assessment", description: "Existing reports, dashboards, and distribution lists mapped against who actually needs each one." },
    { name: "Schedule & Recipient Configuration", description: "Delivery cadence and recipient lists configured to match your real reporting calendar." },
    { name: "Setup & Testing", description: "eCourier connected to the relevant Salesforce reports and dashboards, with test deliveries confirmed." },
    { name: "Validation", description: "A full delivery cycle validated end to end before rolling out to the complete recipient list." },
    { name: "Launch & Monitor", description: "Supported go-live followed by ongoing monitoring of delivery logs and recipient changes." },
  ],
};

const FAQS = [
  { q: "What is eCourier?", a: "eCourier is Mirketa's Salesforce-native product that schedules, customizes, and automatically delivers reports and dashboards to any stakeholder." },
  { q: "Do recipients need a Salesforce login to receive reports?", a: "No. eCourier delivers finished reports directly to a recipient's inbox, so stakeholders without Salesforce access can still receive them." },
  { q: "Can delivery schedules be customized per report?", a: "Yes. Each report or dashboard can have its own delivery schedule and recipient list, configured to match your actual reporting calendar." },
  { q: "Does eCourier replace our existing Salesforce reports?", a: "No. eCourier delivers the same reports and dashboards your teams already build in Salesforce — there's nothing new to build from scratch." },
  { q: "How do we know a report was actually delivered?", a: "eCourier keeps a delivery history and log, so you can confirm what was sent, to whom, and when." },
  { q: "Can we add or remove recipients easily?", a: "Yes. Recipient and distribution lists are configurable per report, so changes don't require rebuilding the schedule." },
  { q: "Who typically uses eCourier inside an organization?", a: "Sales operations, executive teams, and anyone responsible for recurring reporting to internal or external stakeholders typically uses eCourier." },
  { q: "Do you provide support after eCourier is configured?", a: "Yes. Ongoing configuration support is available as your reporting needs or recipient lists change over time." },
];

const RELATED_SERVICES = {
  eyebrow: "Related Reading",
  heading: "Explore More of Mirketa's Salesforce-Native Products",
  intro: "eCourier is one part of Mirketa's Salesforce product suite. Here's where to look next.",
  items: [
    { slug: PRODUCT_PAGES.FINACAST.slug, label: PRODUCT_PAGES.FINACAST.label, description: "See how the same pipeline data behind your reports can power AI-assisted revenue forecasting." },
    { slug: PRODUCT_PAGES.DUPLICATE_SEARCH_MERGE.slug, label: PRODUCT_PAGES.DUPLICATE_SEARCH_MERGE.label, description: "Keep the underlying Salesforce data your scheduled reports pull from clean and accurate." },
    { slug: SALESFORCE_PAGES.DEVELOPMENT_CONSULTING.slug, label: SALESFORCE_PAGES.DEVELOPMENT_CONSULTING.label, description: "Explore Mirketa's broader Salesforce development and consulting services." },
    { slug: "/salesforce-ai-services", label: "Salesforce AI Services & CRM Solutions", description: "See the full suite of AI-powered Salesforce products and services Mirketa builds and supports." },
  ],
};

const FINAL_CTA = {
  heading: "Stop Exporting the Same Report Every Week",
  description: "Partner with Mirketa to configure eCourier around your reporting calendar — or talk to an eCourier advisor first.",
  primaryCta: { label: "See eCourier in Action", href: "#contact" },
  secondaryCta: { label: "Talk to an eCourier Advisor", href: "#contact" },
};

const CONSULTATION = {
  eyebrow: "Get Started",
  heading: "Talk to an eCourier Advisor",
  description: "Tell us which reports you're sending manually today and who needs them — an eCourier advisor will follow up within one business day.",
  formTitle: "Request an eCourier Walkthrough",
};

const SEO = {
  title: pageSEO.title,
  description: pageSEO.description,
  canonical: `https://mirketa.us${pageSEO.slug}`,
  keywords: [seoKeywords.primary, ...seoKeywords.secondary],
  schema: [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "Automated Salesforce Report Scheduling",
      provider: { "@type": "Organization", name: "Mirketa Inc.", url: "https://mirketa.us" },
      name: "eCourier",
      description: "Salesforce-native report and dashboard scheduler that customizes and auto-delivers reports to any stakeholder.",
      areaServed: "Global",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://mirketa.us/" },
        { "@type": "ListItem", position: 2, name: PRODUCT_PAGES.ECOURIER.label, item: `https://mirketa.us${pageSEO.slug}` },
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

export default function Ecourier() {
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

      gsap.utils.toArray(".ec-reveal").forEach((el) => {
        gsap.from(el, { opacity: prefersReduced ? 1 : 0, y: prefersReduced ? 0 : 32, duration: 0.7, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 88%" } });
      });
      gsap.utils.toArray(".ec-reveal-left").forEach((el) => {
        gsap.from(el, { opacity: prefersReduced ? 1 : 0, x: prefersReduced ? 0 : -30, duration: 0.7, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 88%" } });
      });
      gsap.utils.toArray(".ec-reveal-right").forEach((el) => {
        gsap.from(el, { opacity: prefersReduced ? 1 : 0, x: prefersReduced ? 0 : 30, duration: 0.7, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 88%" } });
      });
      gsap.utils.toArray(".ec-reveal-stagger").forEach((el) => {
        gsap.from(el.children, { opacity: prefersReduced ? 1 : 0, y: prefersReduced ? 0 : 26, duration: 0.6, stagger: 0.06, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 85%" } });
      });
      gsap.utils.toArray(".ec-zoom-in").forEach((el) => {
        gsap.from(el, { opacity: prefersReduced ? 1 : 0, scale: prefersReduced ? 1 : 0.94, duration: 0.6, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 88%" } });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="product-ecourier">
      <Seo {...SEO} />
      <HeroSection heroTextRef={heroTextRef} heroRef={heroRef} />
      <TrustedByMarquee label="Trusted by Salesforce Reporting and Operations Teams" />
      <ChallengesSection />
      <SolutionSection />
      <ServicesSection />
      <TechnicalSection />
      <AiAutomationSection />
      <BenefitsSection />
      <UseCasesSection />
      <ScenariosSection />
      <WhyMirketaSection />
      <TechnologiesSection />
      <ProcessSection />
      <FaqSection />
      <RelatedServices {...RELATED_SERVICES} className="ec-related ec-reveal" />
      <FinalCtaSection />
      <ConsultationSection {...CONSULTATION} />
      <StickyCta heroRef={heroRef} label="See eCourier in Action" />
    </div>
  );
}

// ============================================================
// HERO
// ============================================================

function HeroSection({ heroTextRef, heroRef }) {
  return (
    <section ref={heroRef} className="ec-hero" style={{ backgroundImage: `url("${Images.heroEcourier}")` }} aria-label="eCourier Automated Report Scheduler by Mirketa">
      <div className="ec-hero__scrim" />
      <div className="container">
        <Breadcrumb items={BREADCRUMB_ITEMS} className="ec-breadcrumb" />
        <div className="ec-hero__inner">
          <div ref={heroTextRef} className="ec-hero__text">
            <span className="ec-badge">
              <span className="ec-badge__spark" aria-hidden="true">✦</span> {HERO.badge}
            </span>
            <h1>{HERO.title}</h1>
            <p className="ec-hero__description">{HERO.description}</p>
            <div className="ec-hero__ctas">
              <a href={HERO.primaryCta.href} className="btn btn-primary ec-btn">
                {HERO.primaryCta.label} <span aria-hidden="true">→</span>
              </a>
              <a href={HERO.secondaryCta.href} className="btn btn-secondary ec-btn">
                {HERO.secondaryCta.label}
              </a>
            </div>
            <ul className="ec-hero__metrics">
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
            className="ec-hero__visual ec-zoom-in"
          />
        </div>
      </div>
    </section>
  );
}

// ============================================================
// KEY CHALLENGES
// ============================================================

function ChallengesSection() {
  return (
    <section className="section ec-challenges" aria-labelledby="ec-challenges-heading">
      <div className="container">
        <div className="section-heading ec-reveal">
          <p className="ec-eyebrow">{CHALLENGES.eyebrow}</p>
          <h2 id="ec-challenges-heading">{CHALLENGES.heading}</h2>
          <p>{CHALLENGES.intro}</p>
        </div>
        <div className="ec-challenges__grid ec-reveal-stagger">
          {CHALLENGES.items.map((c) => (
            <div className="ec-challenge-card" key={c.title}>
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
// SOLUTION & CAPABILITIES
// ============================================================

function SolutionSection() {
  return (
    <section className="section ec-solution" aria-labelledby="ec-solution-heading">
      <div className="container ec-solution__grid">
        <div className="ec-reveal-left">
          <p className="ec-eyebrow">{SOLUTION.eyebrow}</p>
          <h2 id="ec-solution-heading">{SOLUTION.heading}</h2>
          {SOLUTION.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <div className="ec-reveal-right">
          <WorkflowDiagram
            title="Report Delivery Pipeline"
            steps={[{ label: "Report Scheduled" }, { label: "Recipients Set" }, { label: "Generated" }, { label: "Delivered" }, { label: "Logged" }]}
          />
        </div>
      </div>
    </section>
  );
}

// ============================================================
// CORE FEATURES
// ============================================================

function ServicesSection() {
  return (
    <section className="section ec-services" aria-labelledby="ec-services-heading">
      <div className="container">
        <div className="ec-services__head ec-reveal">
          <div className="section-heading">
            <p className="ec-eyebrow">{SERVICES.eyebrow}</p>
            <h2 id="ec-services-heading">{SERVICES.heading}</h2>
            <p>{SERVICES.intro}</p>
          </div>
        </div>
        <div className="ec-services__grid ec-reveal-stagger">
          {SERVICES.items.map((c) => (
            <div className="ec-service-card" key={c.title}>
              <span className="ec-service-card__icon">{c.icon}</span>
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
// SALESFORCE PLATFORM FIT
// ============================================================

function TechnicalSection() {
  return (
    <section className="section ec-technical" aria-labelledby="ec-technical-heading">
      <div className="container">
        <div className="section-heading ec-reveal">
          <p className="ec-eyebrow">{TECHNICAL.eyebrow}</p>
          <h2 id="ec-technical-heading">{TECHNICAL.heading}</h2>
          <p>{TECHNICAL.intro}</p>
        </div>
        <div className="ec-technical__grid ec-reveal-stagger">
          {TECHNICAL.items.map((c) => (
            <div className="ec-technical-item" key={c.title}>
              <p className="ec-card-title">{c.title}</p>
              <p>{c.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// AUTOMATION & DELIVERY INTELLIGENCE
// ============================================================

function AiAutomationSection() {
  return (
    <section className="section ec-ai" aria-labelledby="ec-ai-heading">
      <div className="container">
        <div className="section-heading ec-reveal">
          <p className="ec-eyebrow">{AI_AUTOMATION.eyebrow}</p>
          <h2 id="ec-ai-heading">{AI_AUTOMATION.heading}</h2>
          <p>{AI_AUTOMATION.intro}</p>
        </div>
        <div className="ec-ai__grid ec-reveal-stagger">
          {AI_AUTOMATION.items.map((f) => (
            <div className="ec-ai-item" key={f.title}>
              <p className="ec-card-title">{f.title}</p>
              <p>{f.description}</p>
            </div>
          ))}
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
    <section className="section ec-benefits" aria-labelledby="ec-benefits-heading">
      <div className="container">
        <div className="section-heading ec-reveal">
          <p className="ec-eyebrow">{BENEFITS.eyebrow}</p>
          <h2 id="ec-benefits-heading">{BENEFITS.heading}</h2>
          <p>{BENEFITS.intro}</p>
        </div>
        <div className="ec-benefits__grid ec-reveal-stagger">
          {BENEFITS.items.map((b) => (
            <div className="ec-benefit-item" key={b.title}>
              <span aria-hidden="true">{Ico.check}</span>
              <div>
                <p className="ec-card-title">{b.title}</p>
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
// USE CASES
// ============================================================

function UseCasesSection() {
  return (
    <section className="section ec-usecases" aria-labelledby="ec-usecases-heading">
      <div className="container">
        <div className="section-heading ec-reveal">
          <p className="ec-eyebrow">{USE_CASES.eyebrow}</p>
          <h2 id="ec-usecases-heading">{USE_CASES.heading}</h2>
          <p>{USE_CASES.intro}</p>
        </div>
        <div className="ec-usecases__grid ec-reveal-stagger">
          {USE_CASES.items.map((n) => (
            <div className="ec-usecase-card" key={n.title}>
              <span className="ec-usecase-card__icon">{n.icon}</span>
              <p className="ec-card-title">{n.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// IMPLEMENTATION SCENARIOS
// ============================================================

function ScenariosSection() {
  return (
    <section className="section ec-scenarios" aria-labelledby="ec-scenarios-heading">
      <div className="container">
        <div className="section-heading ec-reveal">
          <p className="ec-eyebrow">{SCENARIOS.eyebrow}</p>
          <h2 id="ec-scenarios-heading">{SCENARIOS.heading}</h2>
          <p>{SCENARIOS.intro}</p>
        </div>
        <div className="ec-scenarios__grid ec-reveal-stagger">
          {SCENARIOS.cases.map((c) => (
            <div className="ec-scenario-card" key={c.title}>
              <span className="ec-scenario-card__tag">{c.tag}</span>
              <p className="ec-card-title">{c.title}</p>
              <dl className="ec-scenario-card__fields">
                <div><dt>Challenge</dt><dd>{c.challenge}</dd></div>
                <div><dt>Approach</dt><dd>{c.approach}</dd></div>
                <div><dt>Result</dt><dd>{c.result}</dd></div>
              </dl>
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
    <section className="section ec-why" aria-labelledby="ec-why-heading">
      <div className="container">
        <div className="section-heading ec-reveal">
          <p className="ec-eyebrow">{WHY_MIRKETA.eyebrow}</p>
          <h2 id="ec-why-heading">{WHY_MIRKETA.heading}</h2>
          <p>{WHY_MIRKETA.intro}</p>
        </div>
        <div className="ec-why__grid ec-reveal-stagger">
          {WHY_MIRKETA.items.map((w, i) => (
            <div className="ec-why-card" key={`${w.title}-${i}`}>
              <span className="ec-why-card__icon">{w.icon}</span>
              <p className="ec-card-title">{w.title}</p>
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
    <section className="section ec-tech" aria-labelledby="ec-tech-heading">
      <div className="container">
        <div className="section-heading ec-reveal">
          <p className="ec-eyebrow">{TECHNOLOGIES.eyebrow}</p>
          <h2 id="ec-tech-heading">{TECHNOLOGIES.heading}</h2>
          <p>{TECHNOLOGIES.intro}</p>
        </div>
        <div className="ec-tech__grid ec-reveal-stagger">
          {TECHNOLOGIES.items.map((t) => (
            <div className="ec-tech-card" key={t.title}>
              <span className="ec-tech-card__icon">{t.icon}</span>
              <p className="ec-card-title">{t.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// IMPLEMENTATION PROCESS
// ============================================================

function ProcessSection() {
  return (
    <section className="section ec-process" aria-labelledby="ec-process-heading">
      <div className="container">
        <div className="section-heading ec-reveal">
          <p className="ec-eyebrow">{PROCESS.eyebrow}</p>
          <h2 id="ec-process-heading">{PROCESS.heading}</h2>
          <p>{PROCESS.intro}</p>
        </div>
        <div className="ec-process__grid ec-reveal-stagger">
          {PROCESS.detail.map((p, i) => (
            <div className="ec-step-card" key={p.name}>
              <span className="ec-step-card__num">{String(i + 1).padStart(2, "0")}</span>
              <p className="ec-card-title">{p.name}</p>
              <p>{p.description}</p>
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
    <section className="section ec-faq" aria-labelledby="ec-faq-heading">
      <div className="container">
        <div className="section-heading ec-reveal">
          <p className="ec-eyebrow">FAQ</p>
          <h2 id="ec-faq-heading">Frequently Asked Questions About eCourier</h2>
        </div>
        <FaqAccordion items={FAQS} className="ec-reveal" searchPlaceholder="Ask a question — e.g. &quot;schedule&quot;, &quot;recipients&quot;, &quot;delivery&quot;..." />
        <p className="ec-faq__links">
          Related reading: <Link to={PRODUCT_PAGES.FINACAST.slug}>{PRODUCT_PAGES.FINACAST.label}</Link>,{" "}
          <Link to={PRODUCT_PAGES.DUPLICATE_SEARCH_MERGE.slug}>{PRODUCT_PAGES.DUPLICATE_SEARCH_MERGE.label}</Link>,{" "}
          <Link to={SALESFORCE_PAGES.DEVELOPMENT_CONSULTING.slug}>{SALESFORCE_PAGES.DEVELOPMENT_CONSULTING.label}</Link>.
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
    <section className="ec-final-cta ec-reveal" aria-labelledby="ec-final-cta-heading">
      <div className="container ec-final-cta__inner">
        <h2 id="ec-final-cta-heading">{FINAL_CTA.heading}</h2>
        <p>{FINAL_CTA.description}</p>
        <div className="ec-final-cta__ctas">
          <a href={FINAL_CTA.primaryCta.href} className="btn btn-primary ec-btn">
            {FINAL_CTA.primaryCta.label} <span aria-hidden="true">→</span>
          </a>
          <a href={FINAL_CTA.secondaryCta.href} className="btn btn-secondary ec-btn">
            {FINAL_CTA.secondaryCta.label}
          </a>
        </div>
      </div>
    </section>
  );
}
