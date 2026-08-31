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
import "./Education.css";

gsap.registerPlugin(ScrollTrigger);

// ============================================================
// SLUG / SEO CONFIGURATION — kept local to this component per
// project convention, sourced from the central pageSlugs.js entry
// so the URL itself still only needs to change in one place.
// ============================================================

export const pageSEO = {
  slug: `${INDUSTRY_PAGES.EDUCATION.slug}/`,
  title: "Education Technology Solutions | Mirketa",
  description:
    "Education Technology Solutions from Mirketa: student information systems, admissions CRM, financial aid automation, and LMS integration for K-12 and higher ed.",
};

// ============================================================
// ICONS
// ============================================================

const Ico = {
  check: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12.5l5 5L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  book: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 6.5c-1.8-1.3-4.2-2-6.5-2A1.5 1.5 0 004 6v12c2.3 0 4.7.7 6.5 2m1.5-13.5c1.8-1.3 4.2-2 6.5-2A1.5 1.5 0 0120 6v12c-2.3 0-4.7.7-6.5 2M12 6.5V20" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  graduationCap: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M2 9l10-4 10 4-10 4-10-4z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M6 11v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /><path d="M22 9v6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
  ),
  laptop: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="4" y="5" width="16" height="10" rx="1.2" stroke="currentColor" strokeWidth="1.4" /><path d="M2 19h20M9 19l1-2h4l1 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  wrench: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M14.7 6.3a4 4 0 00-5.4 4.9L4 16.5V20h3.5l5.3-5.3a4 4 0 004.9-5.4l-2.6 2.6-2-2 2.6-2.6z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  briefcase: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="7.5" width="18" height="12" rx="1.4" stroke="currentColor" strokeWidth="1.4" /><path d="M8.5 7.5V6a2 2 0 012-2h3a2 2 0 012 2v1.5M3 12.5h18" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
  ),
  rocket: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 2c3 2 5 5.5 5 9.5 0 2-1 4-2 5l-3 2-3-2c-1-1-2-3-2-5C7 7.5 9 4 12 2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><circle cx="12" cy="10" r="1.6" stroke="currentColor" strokeWidth="1.3" /><path d="M9 17l-2 4M15 17l2 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
  ),
  report: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 3h9l3 3v15H6V3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="M9 13l2-2 2 2 3-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
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
  layers: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3l9 5-9 5-9-5 9-5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M3 12l9 5 9-5M3 16l9 5 9-5" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  screen: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="4" width="18" height="12" rx="1.2" stroke="currentColor" strokeWidth="1.4" /><path d="M8 20h8M12 16v4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
  ),
};

// ============================================================
// DATA
// ============================================================

const BREADCRUMB_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Industry", href: "/" },
  { label: INDUSTRY_PAGES.EDUCATION.label },
];

const HERO = {
  badge: "Education Technology Partner",
  title: "Education Technology Solutions for Institutions Ready to Connect Every Student Touchpoint",
  description:
    "Mirketa's Education Technology Solutions connect admissions, financial aid, the student information system, and the learning management system into one governed data layer — so registrars stop reconciling spreadsheets, advisors catch at-risk students before they disappear, and leadership finally sees enrollment, retention, and giving in one place.",
  primaryCta: { label: "Get an Education Technology Assessment", href: "#contact" },
  secondaryCta: { label: "Talk to an EdTech Advisor", href: "#contact" },
  metrics: ["K-12 to Higher Ed Experience", "FERPA-Aware Data Practices", "Rapid SIS & LMS Integration", "Retention Analytics Built In"],
};

const HERO_DASHBOARD = {
  title: "Student Success Console",
  stats: [
    { label: "AT-RISK ALERTS", value: "312", caption: "Flagged before mid-term" },
    { label: "ENROLLMENT YIELD", value: "+18%", caption: "After funnel automation" },
    { label: "FINANCIAL AID PROCESSING", value: "-40%", caption: "Faster turnaround" },
  ],
  rows: [
    { title: "At-risk alert — first-year cohort", meta: "LMS engagement drop detected", tone: "attention", status: "Advisor Notified" },
    { title: "Financial aid package — applicant #2210", meta: "Auto-synced from SIS", tone: "good", status: "Awarded" },
    { title: "Enrollment funnel — Fall cohort", meta: "Recruitment CRM to SIS handoff", tone: "good", status: "On Track" },
  ],
  floatingCards: [
    { icon: Ico.graduationCap, title: "18% Higher Yield", subtitle: "Connected recruitment funnel" },
    { icon: Ico.shield, title: "FERPA-Aware", subtitle: "Data practices built in" },
  ],
};

const CHALLENGES = {
  eyebrow: "Industry Challenges",
  heading: "Why Student Data Fragmentation Quietly Undermines Enrollment and Retention Goals",
  intro:
    "Most colleges, universities, and school districts did not choose to run six disconnected systems — it happened one grant-funded pilot and one departmental purchase at a time, until admissions, the registrar's office, financial aid, and the LMS were each working from a different version of the truth. None of that shows up on a strategic plan slide. It shows up every registration period as duplicate data entry, every advising cycle as a student who fell through the cracks unnoticed, and every board meeting as an enrollment number nobody can fully explain.",
  items: [
    { title: "Admissions and Financial Aid Data Siloed From the SIS", description: "Prospective student records live in a recruitment tool, aid decisions live in another system entirely, and neither one talks to the student information system that registrars and advisors rely on every single day." },
    { title: "No Early-Warning System for At-Risk Students", description: "Attendance, LMS engagement, and academic performance data sit in separate systems, so advisors typically learn a student has disengaged only after withdrawal is already the likely outcome." },
    { title: "Alumni and Donor Data Disconnected From Academic Records", description: "Advancement teams cultivate donors using a CRM with no visibility into a graduate's program, faculty relationships, or academic milestones that could make outreach genuinely personal." },
    { title: "Disconnected LMS and SIS Creating Duplicate Manual Entry", description: "Faculty re-key grades, rosters, and attendance by hand each term because the learning management system and the student information system were never actually integrated." },
  ],
};

const SOLUTION = {
  eyebrow: "Industry Solutions",
  heading: "One Connected Technology Layer From First Inquiry to Alumni Giving",
  paragraphs: [
    "Mirketa's Education Technology Solutions start with the systems your institution already has, not a rip-and-replace mandate nobody asked for. We map how a prospective student actually moves from inquiry to application to enrollment, then close the gaps between your recruitment CRM, your student information system, and your financial aid workflow so admissions counselors and financial aid officers work from the same record instead of three different ones that never quite agree.",
    "Because we carry deep implementation experience across Salesforce Education Cloud, NetSuite for institutional finance, and the learning management platforms most campuses already run — Canvas, Moodle, Brightspace — we integrate rather than force a migration your faculty never signed up for. Attendance and engagement data flow from the LMS into the SIS automatically, so an advisor sees the full academic picture in one place instead of chasing five spreadsheets before a single advising appointment.",
    "The result is a student lifecycle leadership can finally see end to end: enrollment funnel performance, retention risk, and alumni engagement inside one governed reporting layer, built to hold up under FERPA and the access-control expectations that come with managing sensitive student records across departments.",
  ],
};

const SERVICES = {
  eyebrow: "Services We Offer",
  heading: "Six Ways Mirketa Supports Education Technology Solutions",
  intro: "Every engagement starts with one of these six service lines and expands as your institution's needs evolve.",
  items: [
    { icon: Ico.db, title: "Student Information System Implementation", description: "Full-scale SIS implementation and configuration, covering student records, scheduling, grade management, and compliance reporting." },
    { icon: Ico.route, title: "Admissions & Enrollment CRM", description: "A recruitment and admissions CRM that tracks a prospect from first inquiry through enrollment, replacing spreadsheets and disconnected web forms." },
    { icon: Ico.report, title: "Financial Aid Process Automation", description: "Automated aid-package workflows that reconcile awards against enrollment status without a financial aid officer re-keying a single field." },
    { icon: Ico.laptop, title: "LMS Integration", description: "Canvas, Moodle, or Brightspace connected directly to your student information system so grades, attendance, and rosters sync automatically." },
    { icon: Ico.brain, title: "Student Retention Analytics", description: "Predictive models that flag at-risk students from engagement, attendance, and academic signals early enough for an advisor to actually intervene." },
    { icon: Ico.heart, title: "Alumni & Donor Relationship Management", description: "Advancement CRM connected to academic records so donor cultivation reflects a graduate's real program history and faculty relationships." },
  ],
};

const PLATFORM_EXPERTISE = {
  eyebrow: "Platform Expertise",
  heading: "The Platforms Behind Every Education Technology Engagement",
  intro: "We bring proven implementation depth across the platforms most institutions and school districts already depend on.",
  items: [
    { title: "Salesforce Education Cloud for Admissions & Advancement", description: "Recruitment, admissions, and alumni relationship management standardized on one connected platform." },
    { title: "NetSuite for Institutional Finance & Multi-Entity Reporting", description: "Fund accounting and multi-entity consolidation built for how colleges, districts, and foundations actually report." },
    { title: "AI-Powered Retention Analytics", description: "Predictive models applied to attendance, engagement, and academic performance data, not just historical enrollment reports." },
    { title: "Cloud Infrastructure for Hybrid & Online Learning", description: "Secure, scalable infrastructure that supports in-person, hybrid, and fully online instruction without separate technology stacks." },
  ],
};

const AI_AUTOMATION = {
  eyebrow: "AI & Automation",
  heading: "Where AI Actually Moves the Needle in Education Technology Solutions",
  intro: "These are the AI and automation capabilities Mirketa builds into education technology engagements once the underlying data foundation is in place.",
  items: [
    { title: "Predictive Retention Risk Scoring", description: "Attendance, LMS engagement, and grade trends combined into a single risk score advisors can act on before a student disengages." },
    { title: "Automated Financial Aid Matching", description: "Aid eligibility and disbursement matched to enrollment status automatically, instead of a manual quarterly reconciliation." },
    { title: "AI-Assisted Admissions Review", description: "Application data pre-screened and routed to the right admissions counselor based on program fit and prior outcomes." },
    { title: "Natural Language Student Data Q&A", description: "Advisors and administrators can ask plain-language questions across enrollment and academic data instead of requesting a custom report." },
    { title: "Automated Enrollment Funnel Reporting", description: "Inquiry-to-enrollment conversion tracked automatically at every stage instead of assembled by hand before each leadership meeting." },
    { title: "Anomaly Detection in Financial Aid Disbursements", description: "Unusual variance in aid disbursement flagged before it becomes a compliance finding during an audit." },
  ],
};

const BENEFITS = {
  eyebrow: "Business Benefits",
  heading: "What Changes Once Your Institution Runs on One Technology Layer",
  intro: "These are the outcomes Mirketa's education technology clients consistently report after go-live.",
  stats: [
    { value: "18%", label: "Higher Enrollment Yield" },
    { value: "<24 hrs", label: "At-Risk Alert Response Time" },
    { value: "76%", label: "Student Self-Service Adoption" },
    { value: "40%", label: "Less Manual Entry for Faculty" },
  ],
  items: [
    { title: "One Enrollment Funnel View for Leadership", description: "Cabinet-level leaders see inquiry-to-enrollment performance without waiting on a manually assembled report." },
    { title: "Advisors Catch At-Risk Students Sooner", description: "Engagement and attendance signals surface early enough for an intervention to actually change the outcome." },
    { title: "Faculty Reclaim Hours Lost to Duplicate Entry", description: "Grades and rosters sync between the LMS and SIS automatically instead of being entered twice every term." },
    { title: "Advancement Teams Cultivate Donors With Real Context", description: "Alumni outreach reflects a graduate's actual academic history instead of a generic mail-merge campaign." },
  ],
};

const USE_CASES = {
  eyebrow: "Industry Use Cases",
  heading: "Education Technology Solutions Across Every Learning Model",
  intro: "Every institution type runs on a different operating model — our approach adapts to how each one actually works.",
  items: [
    { icon: Ico.graduationCap, title: "Higher Education" },
    { icon: Ico.building, title: "K-12 Districts" },
    { icon: Ico.laptop, title: "Online Learning Platforms" },
    { icon: Ico.wrench, title: "Vocational & Trade Schools" },
    { icon: Ico.briefcase, title: "Corporate Training" },
    { icon: Ico.rocket, title: "EdTech Providers" },
  ],
};

const SUCCESS_STORIES = {
  eyebrow: "Success Stories",
  heading: "Real Education Technology Outcomes",
  intro: "Anonymized results from recent education technology engagements.",
  cases: [
    {
      title: "Regional University Raises Enrollment Yield 18% With a Connected Admissions CRM",
      industry: "Higher Education",
      challenge: "Admissions counselors tracked prospects in spreadsheets disconnected from the student information system, so applicants fell out of contact between inquiry and enrollment deadline.",
      solution: "We implemented Salesforce Education Cloud as the admissions CRM and integrated it directly with the institution's SIS so counselors could see application status in real time.",
      outcome: "Enrollment yield increased 18% in the first recruiting cycle after go-live, with counselors following up on every applicant automatically instead of manually.",
    },
    {
      title: "K-12 District Cuts Faculty Data Entry Time 40% With LMS-SIS Integration",
      industry: "K-12 District",
      challenge: "Teachers across twelve schools manually re-entered grades and attendance into the district's student information system every week because the LMS and SIS operated independently.",
      solution: "We built a direct integration between the district's LMS and SIS so grades, attendance, and rosters synchronized automatically each day.",
      outcome: "Faculty data entry time dropped 40% district-wide, freeing teachers to spend that time on instruction instead of administrative duplication.",
    },
  ],
};

const WHY_MIRKETA = {
  eyebrow: "Why Choose Mirketa",
  heading: "A Technology Partner That Understands How Institutions Actually Operate",
  intro: "Plenty of partners can implement a CRM or an SIS. Fewer understand why an admissions cycle, an academic term, and a financial aid calendar should shape the technology roadmap.",
  items: [
    { icon: Ico.award, title: "Deep Education Sector Domain Experience", description: "We understand admissions cycles, academic terms, and financial aid calendars, not just generic enterprise software timelines." },
    { icon: Ico.compass, title: "Higher Ed & K-12 Implementation Range", description: "Experience spanning universities, community colleges, K-12 districts, and vocational programs, each with a different operating model." },
    { icon: Ico.clock, title: "Rapid SIS & LMS Integration", description: "A repeatable integration approach that connects core academic systems in weeks, not an open-ended multi-year project." },
    { icon: Ico.shield, title: "FERPA-Aware Data Practices", description: "Access controls and data governance built with student privacy requirements in mind from day one, not bolted on afterward." },
    { icon: Ico.users, title: "Dedicated Student Success Team", description: "The consultants who scope your engagement stay with it through go-live and the terms that follow." },
    { icon: Ico.heart, title: "Support Beyond Go-Live", description: "Ongoing technology support available across admissions, registrar, financial aid, and advancement as your needs evolve." },
  ],
};

const TECHNOLOGIES = {
  eyebrow: "Technology Stack",
  heading: "The Platforms We Build Education Technology Solutions On",
  intro: "Selected based on your institution's actual enrollment model and academic calendar, not a default recommendation.",
  items: [
    { icon: Ico.cloud, title: "Salesforce Education Cloud" },
    { icon: Ico.db, title: "NetSuite" },
    { icon: Ico.laptop, title: "Canvas, Moodle & LMS Integration" },
    { icon: Ico.brain, title: "AI Retention Analytics" },
    { icon: Ico.layers, title: "Cloud Data Warehousing" },
    { icon: Ico.screen, title: "Student Portal Technology" },
  ],
};

const PROCESS = {
  eyebrow: "Industry Process",
  heading: "A Five-Stage Path From Assessment to Campus-Wide Integration",
  intro: "A structured methodology refined across education technology engagements spanning higher education, K-12 districts, and online learning providers.",
  steps: [
    { label: "Discovery & Assessment" },
    { label: "Technology Roadmap" },
    { label: "Integration & Automation" },
    { label: "Testing & Faculty Training" },
    { label: "Launch & Optimize" },
  ],
  detail: [
    { name: "Discovery & Systems Assessment", description: "Current technology landscape mapped across admissions, the registrar's office, financial aid, and the LMS." },
    { name: "Technology Roadmap", description: "An integration and standardization plan documented and prioritized against your academic calendar." },
    { name: "Integration & Automation", description: "SIS, LMS, financial aid, and CRM connected so data flows automatically instead of being re-entered by hand." },
    { name: "Testing & Faculty Training", description: "Every workflow validated with registrar, admissions, and faculty staff before a single student depends on it." },
    { name: "Launch & Optimize", description: "Continuous refinement as enrollment patterns shift and new academic programs come online." },
  ],
};

const FAQS = [
  { q: "What are Education Technology Solutions?", a: "Education Technology Solutions cover student information system implementation, admissions and enrollment CRM, financial aid automation, LMS integration, and retention analytics — the technology layer that connects every student touchpoint from inquiry to alumni giving." },
  { q: "Can you integrate our existing student information system instead of replacing it?", a: "Yes. Most engagements start by integrating your current SIS with admissions, financial aid, and the LMS rather than recommending a costly replacement your staff never asked for." },
  { q: "How does this help with student retention specifically?", a: "By combining attendance, LMS engagement, and academic performance data into a single retention risk score, advisors can identify and reach at-risk students early enough for an intervention to matter." },
  { q: "Do you work with K-12 districts, or only higher education institutions?", a: "We work across the education sector, including higher education, K-12 districts, online learning platforms, vocational and trade schools, corporate training programs, and EdTech providers." },
  { q: "How quickly can LMS and SIS integration be completed?", a: "Using our repeatable integration approach, most institutions see grades, attendance, and roster data syncing automatically between the LMS and SIS within a single academic term." },
  { q: "Can you connect financial aid data to enrollment and academic records?", a: "Yes. We build automated workflows that reconcile financial aid awards against enrollment status and academic progress, reducing manual reconciliation for financial aid staff." },
  { q: "What platforms do you typically implement for education clients?", a: "Most engagements involve Salesforce Education Cloud for admissions and advancement, NetSuite for institutional finance, and integration with LMS platforms like Canvas, Moodle, or Brightspace." },
  { q: "Do you provide ongoing support after go-live?", a: "Yes. Every engagement can transition into ongoing support across admissions, registrar operations, financial aid, and advancement as enrollment needs evolve term over term." },
];

const RELATED_SERVICES = {
  eyebrow: "Related Services",
  heading: "Explore More Ways Mirketa Supports Education Institutions",
  intro: "Education technology often overlaps with related industries and platforms. Here's where to look next.",
  items: [
    { slug: INDUSTRY_PAGES.HI_TECH.slug, label: INDUSTRY_PAGES.HI_TECH.label, description: "See how Mirketa supports the hi-tech and SaaS platforms many EdTech providers build on." },
    { slug: INDUSTRY_PAGES.HEALTHCARE.slug, label: INDUSTRY_PAGES.HEALTHCARE.label, description: "Explore technology solutions for healthcare and academic medical center operations adjacent to higher education." },
    { slug: SALESFORCE_PAGES.DEVELOPMENT_CONSULTING.slug, label: SALESFORCE_PAGES.DEVELOPMENT_CONSULTING.label, description: "Standardize admissions and advancement CRM workflows on Salesforce Education Cloud." },
    { slug: NETSUITE_PAGES.IMPLEMENTATION.slug, label: NETSUITE_PAGES.IMPLEMENTATION.label, description: "Bring institutional finance and multi-entity reporting onto a NetSuite implementation built for education." },
    { slug: AI_PAGES.AI_DATA_FOUNDATIONS.slug, label: AI_PAGES.AI_DATA_FOUNDATIONS.label, description: "Build the governed data foundation that makes student retention analytics and AI reliable." },
  ],
};

const FINAL_CTA = {
  heading: "Bring Education Technology Solutions to Every Student Touchpoint",
  description: "Partner with Mirketa to connect admissions, financial aid, the SIS, and the LMS into one governed layer — or talk to an EdTech advisor before your next enrollment cycle.",
  primaryCta: { label: "Get an Education Technology Assessment", href: "#contact" },
  secondaryCta: { label: "Talk to an EdTech Advisor", href: "#contact" },
};

const CONSULTATION = {
  eyebrow: "Get Started",
  heading: "Get an Education Technology Assessment",
  description: "Tell us about your institution, current systems, and academic calendar — an education technology advisor will follow up within one business day.",
  formTitle: "Get a Free Education Technology Assessment",
};

const SEO = {
  title: pageSEO.title,
  description: pageSEO.description,
  canonical: `https://mirketa.us${pageSEO.slug}`,
  keywords: [
    "Education Technology Solutions",
    "EdTech",
    "Student Information Systems",
    "Digital Learning",
    "Higher Education",
  ],
  schema: [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "Education Technology Solutions",
      provider: { "@type": "Organization", name: "Mirketa Inc.", url: "https://mirketa.us" },
      name: "Education Technology Solutions",
      description: "Student information system implementation, admissions and enrollment CRM, financial aid automation, and LMS integration for education institutions.",
      areaServed: "Global",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://mirketa.us/" },
        { "@type": "ListItem", position: 2, name: INDUSTRY_PAGES.EDUCATION.label, item: `https://mirketa.us${pageSEO.slug}` },
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

export default function Education() {
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

      gsap.utils.toArray(".edu-reveal").forEach((el) => {
        gsap.from(el, { opacity: prefersReduced ? 1 : 0, y: prefersReduced ? 0 : 32, duration: 0.7, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 88%" } });
      });
      gsap.utils.toArray(".edu-reveal-left").forEach((el) => {
        gsap.from(el, { opacity: prefersReduced ? 1 : 0, x: prefersReduced ? 0 : -30, duration: 0.7, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 88%" } });
      });
      gsap.utils.toArray(".edu-reveal-right").forEach((el) => {
        gsap.from(el, { opacity: prefersReduced ? 1 : 0, x: prefersReduced ? 0 : 30, duration: 0.7, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 88%" } });
      });
      gsap.utils.toArray(".edu-reveal-stagger").forEach((el) => {
        gsap.from(el.children, { opacity: prefersReduced ? 1 : 0, y: prefersReduced ? 0 : 26, duration: 0.6, stagger: 0.06, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 85%" } });
      });
      gsap.utils.toArray(".edu-zoom-in").forEach((el) => {
        gsap.from(el, { opacity: prefersReduced ? 1 : 0, scale: prefersReduced ? 1 : 0.94, duration: 0.6, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 88%" } });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="industry-education">
      <Seo {...SEO} />
      <HeroSection heroTextRef={heroTextRef} heroRef={heroRef} />
      <TrustedByMarquee label="Trusted by Registrars, Enrollment Leaders, and Academic IT Teams" />
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
      <RelatedServices {...RELATED_SERVICES} className="edu-related edu-reveal" />
      <FinalCtaSection />
      <ConsultationSection {...CONSULTATION} />
      <StickyCta heroRef={heroRef} label="Get an Education Technology Assessment" />
    </div>
  );
}

// ============================================================
// HERO
// ============================================================

function HeroSection({ heroTextRef, heroRef }) {
  return (
    <section ref={heroRef} className="edu-hero" style={{ backgroundImage: `url("${Images.heroIndustryEducation}")` }} aria-label="Education Technology Solutions by Mirketa">
      <div className="edu-hero__scrim" />
      <div className="container">
        <Breadcrumb items={BREADCRUMB_ITEMS} className="edu-breadcrumb" />
        <div className="edu-hero__inner">
          <div ref={heroTextRef} className="edu-hero__text">
            <span className="edu-badge">
              <span className="edu-badge__spark" aria-hidden="true">✦</span> {HERO.badge}
            </span>
            <h1>{HERO.title}</h1>
            <p className="edu-hero__description">{HERO.description}</p>
            <div className="edu-hero__ctas">
              <a href={HERO.primaryCta.href} className="btn btn-primary edu-btn">
                {HERO.primaryCta.label} <span aria-hidden="true">→</span>
              </a>
              <a href={HERO.secondaryCta.href} className="btn btn-secondary edu-btn">
                {HERO.secondaryCta.label}
              </a>
            </div>
            <ul className="edu-hero__metrics">
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
            className="edu-hero__visual edu-zoom-in"
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
    <section className="section edu-challenges" aria-labelledby="edu-challenges-heading">
      <div className="container">
        <div className="section-heading edu-reveal">
          <p className="edu-eyebrow">{CHALLENGES.eyebrow}</p>
          <h2 id="edu-challenges-heading">{CHALLENGES.heading}</h2>
          <p>{CHALLENGES.intro}</p>
        </div>
        <div className="edu-challenges__grid edu-reveal-stagger">
          {CHALLENGES.items.map((c) => (
            <div className="edu-challenge-card" key={c.title}>
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
    <section className="section edu-solution" aria-labelledby="edu-solution-heading">
      <div className="container edu-solution__grid">
        <div className="edu-reveal-left">
          <p className="edu-eyebrow">{SOLUTION.eyebrow}</p>
          <h2 id="edu-solution-heading">{SOLUTION.heading}</h2>
          {SOLUTION.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <div className="edu-reveal-right">
          <AnalyticsPanel
            title="Student Data Accuracy Across Systems"
            donutPercent={97}
            donutLabel="Consolidated accuracy across SIS, LMS, and CRM"
            metrics={[
              { value: "18%", label: "Higher enrollment yield" },
              { value: "76%", label: "Student self-service adoption" },
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
    <section className="section edu-services" aria-labelledby="edu-services-heading">
      <div className="container">
        <div className="edu-services__head edu-reveal">
          <div className="section-heading">
            <p className="edu-eyebrow">{SERVICES.eyebrow}</p>
            <h2 id="edu-services-heading">{SERVICES.heading}</h2>
            <p>{SERVICES.intro}</p>
          </div>
        </div>
        <div className="edu-services__grid edu-reveal-stagger">
          {SERVICES.items.map((c) => (
            <div className="edu-service-card" key={c.title}>
              <span className="edu-service-card__icon">{c.icon}</span>
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
    <section className="section edu-platform" aria-labelledby="edu-platform-heading">
      <div className="container">
        <div className="section-heading edu-reveal">
          <p className="edu-eyebrow">{PLATFORM_EXPERTISE.eyebrow}</p>
          <h2 id="edu-platform-heading">{PLATFORM_EXPERTISE.heading}</h2>
          <p>{PLATFORM_EXPERTISE.intro}</p>
        </div>
        <div className="edu-platform__grid edu-reveal-stagger">
          {PLATFORM_EXPERTISE.items.map((c) => (
            <div className="edu-platform-item" key={c.title}>
              <p className="edu-card-title">{c.title}</p>
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
    <section className="section edu-ai" aria-labelledby="edu-ai-heading">
      <div className="container">
        <div className="section-heading edu-reveal">
          <p className="edu-eyebrow">{AI_AUTOMATION.eyebrow}</p>
          <h2 id="edu-ai-heading">{AI_AUTOMATION.heading}</h2>
          <p>{AI_AUTOMATION.intro}</p>
        </div>
        <div className="edu-ai__layout">
          <div className="edu-ai__grid edu-reveal-stagger">
            {AI_AUTOMATION.items.map((f) => (
              <div className="edu-ai-item" key={f.title}>
                <p className="edu-card-title">{f.title}</p>
                <p>{f.description}</p>
              </div>
            ))}
          </div>
          <div className="edu-reveal-right">
            <WorkflowDiagram
              title="Admissions-to-Retention Data Flow"
              steps={[{ label: "Applied" }, { label: "Reviewed" }, { label: "Admitted" }, { label: "Enrolled" }, { label: "Retained" }]}
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
    <section className="section edu-benefits" aria-labelledby="edu-benefits-heading">
      <div className="container">
        <div className="section-heading edu-reveal">
          <p className="edu-eyebrow">{BENEFITS.eyebrow}</p>
          <h2 id="edu-benefits-heading">{BENEFITS.heading}</h2>
          <p>{BENEFITS.intro}</p>
        </div>
        <div className="edu-benefits__stats edu-reveal-stagger">
          {BENEFITS.stats.map((s) => (
            <AnimatedCounter key={s.label} value={s.value} label={s.label} className="edu-stat" />
          ))}
        </div>
        <div className="edu-benefits__grid edu-reveal-stagger">
          {BENEFITS.items.map((b) => (
            <div className="edu-benefit-item" key={b.title}>
              <span aria-hidden="true">{Ico.check}</span>
              <div>
                <p className="edu-card-title">{b.title}</p>
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
    <section className="section edu-usecases" aria-labelledby="edu-usecases-heading">
      <div className="container">
        <div className="section-heading edu-reveal">
          <p className="edu-eyebrow">{USE_CASES.eyebrow}</p>
          <h2 id="edu-usecases-heading">{USE_CASES.heading}</h2>
          <p>{USE_CASES.intro}</p>
        </div>
        <div className="edu-usecases__grid edu-reveal-stagger">
          {USE_CASES.items.map((n) => (
            <div className="edu-usecase-card" key={n.title}>
              <span className="edu-usecase-card__icon">{n.icon}</span>
              <p className="edu-card-title">{n.title}</p>
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
    <section className="section edu-cases" aria-labelledby="edu-cases-heading">
      <div className="container">
        <div className="section-heading edu-reveal">
          <p className="edu-eyebrow">{SUCCESS_STORIES.eyebrow}</p>
          <h2 id="edu-cases-heading">{SUCCESS_STORIES.heading}</h2>
          <p>{SUCCESS_STORIES.intro}</p>
        </div>
        <div className="edu-cases__grid edu-reveal-stagger">
          {SUCCESS_STORIES.cases.map((c) => (
            <div className="edu-case-card" key={c.title}>
              <span className="edu-case-card__tag">{c.industry}</span>
              <p className="edu-card-title">{c.title}</p>
              <dl className="edu-case-card__fields">
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
    <section className="section edu-why" aria-labelledby="edu-why-heading">
      <div className="container">
        <div className="section-heading edu-reveal">
          <p className="edu-eyebrow">{WHY_MIRKETA.eyebrow}</p>
          <h2 id="edu-why-heading">{WHY_MIRKETA.heading}</h2>
          <p>{WHY_MIRKETA.intro}</p>
        </div>
        <div className="edu-why__grid edu-reveal-stagger">
          {WHY_MIRKETA.items.map((w) => (
            <div className="edu-why-card" key={w.title}>
              <span className="edu-why-card__icon">{w.icon}</span>
              <p className="edu-card-title">{w.title}</p>
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
    <section className="section edu-tech" aria-labelledby="edu-tech-heading">
      <div className="container">
        <div className="section-heading edu-reveal">
          <p className="edu-eyebrow">{TECHNOLOGIES.eyebrow}</p>
          <h2 id="edu-tech-heading">{TECHNOLOGIES.heading}</h2>
          <p>{TECHNOLOGIES.intro}</p>
        </div>
        <div className="edu-tech__grid edu-reveal-stagger">
          {TECHNOLOGIES.items.map((t) => (
            <div className="edu-tech-card" key={t.title}>
              <span className="edu-tech-card__icon">{t.icon}</span>
              <p className="edu-card-title">{t.title}</p>
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
    <section className="section edu-process" aria-labelledby="edu-process-heading">
      <div className="container">
        <div className="section-heading edu-reveal">
          <p className="edu-eyebrow">{PROCESS.eyebrow}</p>
          <h2 id="edu-process-heading">{PROCESS.heading}</h2>
          <p>{PROCESS.intro}</p>
        </div>
        <div className="edu-zoom-in">
          <SupplyChainMap
            title="Campus Technology Network"
            nodes={[
              { label: "Admissions", short: "ADM" },
              { label: "Registrar", short: "REG" },
              { label: "Financial Aid", short: "FA" },
              { label: "Faculty", short: "FAC" },
              { label: "Alumni Office", short: "ALM" },
            ]}
          />
        </div>
        <div className="edu-process__grid edu-reveal-stagger">
          {PROCESS.detail.map((p, i) => (
            <div className="edu-step-card" key={p.name}>
              <span className="edu-step-card__num">{String(i + 1).padStart(2, "0")}</span>
              <p className="edu-card-title">{p.name}</p>
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
    <section className="section edu-faq" aria-labelledby="edu-faq-heading">
      <div className="container">
        <div className="section-heading edu-reveal">
          <p className="edu-eyebrow">FAQ</p>
          <h2 id="edu-faq-heading">Frequently Asked Questions About Education Technology Solutions</h2>
        </div>
        <FaqAccordion items={FAQS} className="edu-reveal" searchPlaceholder="Ask a question — e.g. &quot;retention&quot;, &quot;LMS integration&quot;, &quot;financial aid&quot;..." />
        <p className="edu-faq__links">
          Related reading: <Link to={INDUSTRY_PAGES.HI_TECH.slug}>{INDUSTRY_PAGES.HI_TECH.label}</Link>,{" "}
          <Link to={INDUSTRY_PAGES.HEALTHCARE.slug}>{INDUSTRY_PAGES.HEALTHCARE.label}</Link>,{" "}
          <Link to={SALESFORCE_PAGES.DEVELOPMENT_CONSULTING.slug}>{SALESFORCE_PAGES.DEVELOPMENT_CONSULTING.label}</Link>,{" "}
          <Link to={NETSUITE_PAGES.IMPLEMENTATION.slug}>{NETSUITE_PAGES.IMPLEMENTATION.label}</Link>,{" "}
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
    <section className="edu-final-cta edu-reveal" aria-labelledby="edu-final-cta-heading">
      <div className="container edu-final-cta__inner">
        <h2 id="edu-final-cta-heading">{FINAL_CTA.heading}</h2>
        <p>{FINAL_CTA.description}</p>
        <div className="edu-final-cta__ctas">
          <a href={FINAL_CTA.primaryCta.href} className="btn btn-primary edu-btn">
            {FINAL_CTA.primaryCta.label} <span aria-hidden="true">→</span>
          </a>
          <a href={FINAL_CTA.secondaryCta.href} className="btn btn-secondary edu-btn">
            {FINAL_CTA.secondaryCta.label}
          </a>
        </div>
      </div>
    </section>
  );
}
