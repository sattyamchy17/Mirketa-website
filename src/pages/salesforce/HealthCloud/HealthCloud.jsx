import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Images } from "../../../assets/images/index.js";
import Seo from "../../../components/Seo/Seo.jsx";
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb.jsx";
import HeroVisual from "../../../components/HeroVisual/HeroVisual.jsx";
import ConsultationSection from "../../../components/ConsultationSection/ConsultationSection.jsx";
import "./HealthCloud.css";

gsap.registerPlugin(ScrollTrigger);

// ============================================================
// ICONS
// ============================================================

const Ico = {
  check: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12.5l5 5L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  layers: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3l9 5-9 5-9-5 9-5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M3 12l9 5 9-5M3 16l9 5 9-5" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /></svg>
  ),
  users: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="9" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.4" /><path d="M3.5 19c.6-3.4 2.9-5.2 5.5-5.2s4.9 1.8 5.5 5.2" stroke="currentColor" strokeWidth="1.4" /><circle cx="17" cy="9" r="2.6" stroke="currentColor" strokeWidth="1.3" opacity="0.7" /><path d="M15.5 13.4c2.2.3 3.7 1.9 4 4.6" stroke="currentColor" strokeWidth="1.3" opacity="0.7" /></svg>
  ),
  document: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 3h9l3 3v15H6z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M9 10h6M9 14h6M9 18h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
  ),
  handshake: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 12l4-4 4 4-4 4-4-4zM21 12l-4-4-4 4 4 4 4-4z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M11 12h2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
  ),
  calendar: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" /><path d="M3 9h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
  ),
  network: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="6" r="2.4" stroke="currentColor" strokeWidth="1.4" /><circle cx="6" cy="18" r="2.4" stroke="currentColor" strokeWidth="1.4" /><circle cx="18" cy="18" r="2.4" stroke="currentColor" strokeWidth="1.4" /><path d="M12 8.4L7 16M12 8.4l5 7.6M8.4 18h7.2" stroke="currentColor" strokeWidth="1.3" /></svg>
  ),
  sparkle: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /></svg>
  ),
  code: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 6L4 12l5 6M15 6l5 6-5 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  headset: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 13a8 8 0 0116 0v4" stroke="currentColor" strokeWidth="1.5" /><rect x="3" y="13" width="4" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4" /><rect x="17" y="13" width="4" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4" /></svg>
  ),
  gear: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.4" /><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
  ),
  target: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.4" /><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.3" opacity="0.6" /><circle cx="12" cy="12" r="1.2" fill="currentColor" /></svg>
  ),
  clock: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" /><path d="M12 7v5l4 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 2l8 4v6c0 5-4 8-8 10-4-2-8-5-8-10V6l8-4z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M8.5 12l2 2 5-5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  robot: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="5" y="9" width="14" height="10" rx="3" stroke="currentColor" strokeWidth="1.5" /><path d="M12 5v4M9 14h.01M15 14h.01" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /><circle cx="12" cy="4" r="1.4" fill="currentColor" /></svg>
  ),
  chartUp: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 19V13M10 19V8M16 19v-5M20 19V5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
  ),
  phone: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="6" y="2" width="12" height="20" rx="3" stroke="currentColor" strokeWidth="1.5" /><path d="M10 19h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
  ),
  lock: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="5" y="11" width="14" height="9" rx="2" stroke="currentColor" strokeWidth="1.4" /><path d="M8 11V8a4 4 0 018 0v3" stroke="currentColor" strokeWidth="1.4" /></svg>
  ),
  building: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 21V9l8-5 8 5v12H4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="M9 21v-6h6v6" stroke="currentColor" strokeWidth="1.4" /></svg>
  ),
  heartbeat: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 21s-7-4-7-10V5l7-3 7 3v6c0 6-7 10-7 10z" stroke="currentColor" strokeWidth="1.4" /><path d="M8 12h2l1.5-3 2 6 1.5-3H16" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  cross: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 4v16M4 12h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
  ),
  brain: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 4a3 3 0 013 2 3 3 0 013-2 3 3 0 013 3c0 1-.5 1.7-1 2.2A3 3 0 0118 12c0 1.2-.7 2.1-1.5 2.6.5.6.8 1.3.8 2.1A3 3 0 0114 20a3 3 0 01-2-.8 3 3 0 01-2 .8 3 3 0 01-3.3-3.3c0-.8.3-1.5.8-2.1A3 3 0 016 12a3 3 0 011-2.8C6.5 8.7 6 8 6 7a3 3 0 013-3z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /></svg>
  ),
  clipboard: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="6" y="4" width="12" height="17" rx="2" stroke="currentColor" strokeWidth="1.4" /><rect x="9" y="2" width="6" height="4" rx="1" stroke="currentColor" strokeWidth="1.3" /><path d="M9 11h6M9 15h6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
  ),
  flask: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 3h6M10 3v6l-5 9a2 2 0 001.7 3h10.6a2 2 0 001.7-3l-5-9V3" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /></svg>
  ),
  activity: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 12h4l3 8 4-16 3 8h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  chip: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="7" y="7" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.4" /><path d="M9 3v4M15 3v4M9 21v-4M15 21v-4M3 9h4M3 15h4M21 9h-4M21 15h-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
  ),
  award: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="8" r="5" stroke="currentColor" strokeWidth="1.4" /><path d="M8.5 12.5L7 21l5-2.5L17 21l-1.5-8.5" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  globe: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.4" /><path d="M3 12h18M12 3c2.5 2.5 3.5 6 3.5 9s-1 6.5-3.5 9c-2.5-2.5-3.5-6-3.5-9s1-6.5 3.5-9z" stroke="currentColor" strokeWidth="1.3" /></svg>
  ),
};

// ============================================================
// DATA
// ============================================================

const BREADCRUMB = [
  { label: "Home", href: "/" },
  { label: "Platforms & Technology", href: "/salesforce" },
  { label: "Salesforce Clouds", href: "/salesforce" },
  { label: "Health Cloud" },
];

const HERO = {
  badge: "Healthcare CRM on Salesforce",
  title: "Salesforce Health Cloud Consulting & Implementation Services",
  description:
    "Transform patient engagement, care coordination, provider collaboration, and healthcare operations with Salesforce Health Cloud powered by AI, automation, and secure digital experiences.",
  primaryCta: { label: "Book a Discovery Call", href: "#contact" },
  secondaryCta: { label: "Download Brochure", href: "#contact" },
};

const HERO_DASHBOARD = {
  title: "Patient 360 Console",
  stats: [
    { label: "Patients Managed", value: "2M+", caption: "Across Health Cloud orgs" },
    { label: "Fewer Readmissions", value: "27%", caption: "With care plan automation" },
    { label: "Faster Intake", value: "68%", caption: "Digital patient intake" },
  ],
  rows: [
    { title: "Patient #4821 — Care Plan Review", meta: "Care team • Due today", status: "On Track", tone: "good" },
    { title: "Referral: Cardiology", meta: "Provider collaboration", status: "Pending", tone: "attention" },
    { title: "AI Risk Flag", meta: "Care gap detected", status: "Reviewed", tone: "neutral" },
    { title: "HIPAA Compliance Audit", meta: "Quarterly governance check", status: "Passed", tone: "good" },
  ],
  floatingCards: [
    { icon: Ico.sparkle, title: "Einstein AI", subtitle: "Care recommendations live" },
    { icon: Ico.shield, title: "HIPAA-ready", subtitle: "Security built in" },
  ],
};

const TRUST = [
  "Health Cloud Consulting",
  "Health Cloud Implementation",
  "Patient Engagement",
  "Care Coordination",
  "AI Automation",
  "Healthcare CRM",
  "HIPAA-ready Solutions",
  "Salesforce Integration",
];

const CHALLENGES = {
  eyebrow: "Healthcare Challenges We Solve",
  heading: "Healthcare Challenges We Solve",
  intro: "Most healthcare organizations aren't short on dedication to patients — they're short on a platform that connects records, teams, and compliance. These are the problems we hear most before a Health Cloud engagement.",
  illo: Images.illoCareCoordinationTeam,
  items: [
    { icon: Ico.document, title: "Disconnected Patient Records", description: "Patient data lives across EHRs, spreadsheets, and portals with no single source of truth." },
    { icon: Ico.users, title: "Poor Care Coordination", description: "Care teams work from different information, causing gaps in follow-up and treatment." },
    { icon: Ico.clipboard, title: "Manual Intake", description: "Intake forms are re-entered by hand, slowing down every new patient relationship." },
    { icon: Ico.network, title: "Provider Collaboration Issues", description: "Referrals and specialist communication happen over fax, phone, and email." },
    { icon: Ico.heartbeat, title: "Patient Engagement Challenges", description: "Patients disengage between visits with no consistent digital touchpoint." },
    { icon: Ico.gear, title: "Legacy Healthcare Systems", description: "Aging systems can't support modern patient experience expectations." },
    { icon: Ico.shield, title: "Compliance Complexity", description: "HIPAA and data governance requirements slow down every new initiative." },
    { icon: Ico.chartUp, title: "Limited Healthcare Analytics", description: "Leadership can't see patient outcomes or operational performance in real time." },
  ],
};

const SERVICES = {
  eyebrow: "Our Health Cloud Services",
  heading: "End-to-End Salesforce Health Cloud Services",
  intro: "From first strategy session to long-term managed support, our certified consultants handle every phase of your Health Cloud transformation.",
  illo: Images.illoPatient360View,
  items: [
    { icon: Ico.target, title: "Health Cloud Consulting", description: "Strategic assessment of your care model and data before configuration begins." },
    { icon: Ico.layers, title: "Health Cloud Implementation", description: "Full lifecycle deployment configured around your care teams' real workflow." },
    { icon: Ico.users, title: "Patient 360", description: "A unified patient record spanning clinical, administrative, and engagement data.", illo: Images.illoPatient360View },
    { icon: Ico.clipboard, title: "Care Plan Management", description: "Structured, trackable care plans that keep every care team aligned.", illo: Images.illoCarePlanManagement },
    { icon: Ico.network, title: "Care Coordination", description: "Cross-team collaboration tools that close gaps between visits." },
    { icon: Ico.handshake, title: "Referral Management", description: "Referrals tracked end-to-end instead of disappearing into a fax machine." },
    { icon: Ico.calendar, title: "Appointment Scheduling", description: "Self-service and staff-assisted scheduling connected to the patient record." },
    { icon: Ico.building, title: "Provider Relationship Management", description: "A single view of every provider relationship and network affiliation." },
    { icon: Ico.sparkle, title: "Healthcare AI", description: "Einstein-powered insights and recommendations grounded in your own patient data." },
    { icon: Ico.code, title: "Custom Health Cloud Development", description: "Apex, LWC, and OmniStudio builds for requirements standard configuration can't reach." },
    { icon: Ico.headset, title: "Managed Services", description: "A dedicated team keeping your Health Cloud org healthy long-term." },
    { icon: Ico.gear, title: "Health Cloud Support", description: "Ongoing tuning of care plans, automation, and integrations." },
  ],
};

const WHY_HEALTH_CLOUD = {
  eyebrow: "Why Salesforce Health Cloud",
  heading: "The Platform Purpose-Built for Modern Care Delivery",
  intro: "Health Cloud is more than a patient database — configured correctly, it becomes the connective layer for every care team, channel, and system you rely on.",
  illo: Images.illoClinicalTimeline,
  items: [
    { icon: Ico.users, title: "Patient 360", description: "Every clinical and administrative touchpoint in one unified record." },
    { icon: Ico.network, title: "Care Coordination", description: "Care teams collaborate from the same real-time information." },
    { icon: Ico.building, title: "Provider Networks", description: "A connected view of every provider, referral, and affiliation." },
    { icon: Ico.clipboard, title: "Care Plans", description: "Structured, measurable plans that keep patients on track." },
    { icon: Ico.clock, title: "Clinical Timeline", description: "A chronological view of every visit, treatment, and outcome." },
    { icon: Ico.shield, title: "Member Management", description: "Payer and health-plan member data connected to care activity." },
    { icon: Ico.sparkle, title: "Einstein AI", description: "Native AI trained on your own healthcare data, not a generic model." },
    { icon: Ico.gear, title: "Automation", description: "Flow-driven workflows that remove manual administrative steps." },
    { icon: Ico.chip, title: "OmniStudio", description: "Guided workflows and dynamic forms built for complex care processes." },
    { icon: Ico.phone, title: "Mobile Care", description: "Full functionality for care teams working outside a desk." },
    { icon: Ico.lock, title: "Secure Data Sharing", description: "HIPAA-aligned sharing rules that protect patient data by design." },
    { icon: Ico.chartUp, title: "Healthcare Analytics", description: "Real-time visibility into outcomes, utilization, and performance." },
  ],
};

const INDUSTRIES = {
  eyebrow: "Industries We Serve",
  heading: "Health Cloud Expertise Across the Healthcare Ecosystem",
  intro: "Care models and compliance requirements differ sharply across healthcare organizations — we bring specific context to every engagement.",
  items: [
    { icon: Ico.cross, title: "Hospitals" },
    { icon: Ico.building, title: "Health Systems" },
    { icon: Ico.heartbeat, title: "Clinics" },
    { icon: Ico.users, title: "Medical Groups" },
    { icon: Ico.brain, title: "Behavioral Health" },
    { icon: Ico.shield, title: "Payers" },
    { icon: Ico.flask, title: "Life Sciences" },
    { icon: Ico.activity, title: "Pharmaceuticals" },
    { icon: Ico.chip, title: "Medical Devices" },
    { icon: Ico.phone, title: "Digital Health Companies" },
  ],
};

const AI_HEALTH_CLOUD = {
  eyebrow: "AI + Health Cloud",
  heading: "How AI Makes Every Care Interaction Smarter",
  intro: "AI in Health Cloud isn't a chatbot bolted onto a patient portal — configured correctly, it becomes the layer that surfaces the right insight to the right care team member at the right moment.",
  illo: Images.illoAiClinicalIntelligence,
  items: [
    { icon: Ico.users, title: "AI Patient Insights", description: "Risk factors and care gaps surfaced automatically from patient history." },
    { icon: Ico.sparkle, title: "AI Care Recommendations", description: "Next-best-action guidance grounded in clinical and engagement data." },
    { icon: Ico.chartUp, title: "Predictive Healthcare Analytics", description: "Outcomes and utilization trends predicted before they show up in a report." },
    { icon: Ico.network, title: "Intelligent Patient Routing", description: "Patients routed to the right care team or channel automatically." },
    { icon: Ico.clipboard, title: "Automated Care Plans", description: "Care plans generated and adjusted automatically as patient status changes." },
    { icon: Ico.document, title: "AI Documentation", description: "Clinical notes and summaries drafted automatically from patient interactions." },
    { icon: Ico.brain, title: "Clinical Intelligence", description: "Patterns across patient populations surfaced for care teams and leadership." },
    { icon: Ico.headset, title: "AI-powered Patient Support", description: "Automated, secure patient support available between visits." },
  ],
};

const INTEGRATIONS = {
  eyebrow: "Integration Section",
  heading: "Health Cloud Integrates With the Systems You Already Run",
  intro: "Patient data is only as useful as the systems it reaches. We connect Health Cloud to the platforms your clinical and operational teams already rely on.",
  illo: Images.illoEhrIntegration,
  items: [
    { icon: Ico.building, title: "Epic" },
    { icon: Ico.building, title: "Cerner" },
    { icon: Ico.document, title: "EHR" },
    { icon: Ico.document, title: "EMR" },
    { icon: Ico.network, title: "MuleSoft" },
    { icon: Ico.layers, title: "Salesforce Data Cloud" },
    { icon: Ico.sparkle, title: "Marketing Cloud" },
    { icon: Ico.headset, title: "Service Cloud" },
    { icon: Ico.globe, title: "Experience Cloud" },
  ],
};

const PROCESS = {
  eyebrow: "Implementation Process",
  heading: "A Structured Path From Discovery to Go-Live",
  intro: "No surprises, no scope creep. Our Health Cloud delivery framework has been refined across hundreds of healthcare implementations.",
  steps: [
    { name: "Discovery", description: "We map your current patient, care, and data workflows." },
    { name: "Assessment", description: "A structured audit of systems, compliance, and process gaps." },
    { name: "Architecture", description: "Data model and integration architecture, fully documented." },
    { name: "Configuration", description: "Core Health Cloud setup — records, care plans, and roles." },
    { name: "Integration", description: "Connecting Health Cloud to EHR, EMR, and operational systems." },
    { name: "Migration", description: "Patient and provider data migrated with full validation." },
    { name: "Testing", description: "UAT, regression testing, and security review before go-live." },
    { name: "Training", description: "Role-based training so care teams are productive on day one." },
    { name: "Go Live", description: "Structured cutover with go-live support on-site or remote." },
    { name: "Continuous Support", description: "Hypercare and ongoing optimization after launch." },
  ],
};

const BENEFITS = {
  eyebrow: "Benefits Section",
  heading: "What a Properly Configured Health Cloud Delivers",
  intro: "These are the outcomes our healthcare clients report after their Health Cloud engagement — not vanity metrics.",
  illo: Images.illoHealthcareAnalyticsDashboard,
  items: [
    { icon: Ico.heartbeat, title: "Increase Patient Satisfaction", description: "Consistent, personalized experiences across every touchpoint." },
    { icon: Ico.network, title: "Improve Care Coordination", description: "Every care team member works from the same current information." },
    { icon: Ico.gear, title: "Reduce Administrative Work", description: "Automation removes manual intake, scheduling, and documentation steps." },
    { icon: Ico.users, title: "Enhance Patient Experience", description: "Patients get a connected experience instead of a fragmented one." },
    { icon: Ico.chartUp, title: "Increase Staff Productivity", description: "Care teams spend more time on patients and less on administration." },
    { icon: Ico.layers, title: "Unified Patient View", description: "Clinical, administrative, and engagement data in one record." },
    { icon: Ico.sparkle, title: "AI-driven Healthcare Decisions", description: "Recommendations grounded in real patient and population data." },
    { icon: Ico.clock, title: "Faster Case Resolution", description: "Cases and requests routed and resolved without manual triage." },
    { icon: Ico.shield, title: "HIPAA-ready Architecture", description: "Security and governance built into the platform from day one." },
    { icon: Ico.globe, title: "Scalable Digital Healthcare", description: "A platform that grows with new sites, services, and populations." },
  ],
};

const SUCCESS_METRICS = [
  { value: "2M+", label: "Patients Managed" },
  { value: "500+", label: "Projects Delivered" },
  { value: "80+", label: "Healthcare Clients" },
  { value: "150+", label: "Certified Salesforce Experts" },
  { value: "15+", label: "Countries Served" },
  { value: "98%", label: "Customer Satisfaction" },
];

const WHY_MIRKETA = {
  eyebrow: "Why Mirketa",
  heading: "A Health Cloud Partner That Understands Healthcare",
  intro: "Hundreds of partners can configure Health Cloud. Fewer can tie every decision back to a measurable care and compliance outcome.",
  items: [
    { icon: Ico.award, title: "Certified Salesforce Partner", description: "Consultants holding active Health Cloud and Platform certifications." },
    { icon: Ico.heartbeat, title: "Healthcare Industry Expertise", description: "Deep experience across hospitals, payers, and life sciences." },
    { icon: Ico.sparkle, title: "AI + Salesforce Specialists", description: "Einstein AI is part of the architecture, not an afterthought." },
    { icon: Ico.shield, title: "HIPAA-aware Best Practices", description: "Security and governance built into every engagement by default." },
    { icon: Ico.headset, title: "24x7 Support", description: "A support model built for care operations that never fully stop." },
    { icon: Ico.globe, title: "Global Delivery Model", description: "A delivery model built to support distributed healthcare teams." },
    { icon: Ico.lock, title: "Enterprise Security", description: "Role-based access, audit trails, and data governance by design." },
    { icon: Ico.handshake, title: "Long-term Managed Services", description: "98% client retention because our work continues past go-live." },
  ],
};

const CASE_STUDIES = {
  eyebrow: "Customer Success Stories",
  heading: "Real Health Cloud Outcomes From Real Deployments",
  intro: "Anonymized results from recent Health Cloud engagements across the healthcare ecosystem.",
  cases: [
    {
      title: "Regional Health System Cuts Readmissions by 27%",
      industry: "Health System",
      challenge: "Care teams across five facilities had no shared view of patient history, leading to inconsistent follow-up care.",
      solution: "We implemented Health Cloud with Patient 360 and automated care plans shared across every facility.",
      outcome: "Care teams now coordinate from one unified patient record system-wide.",
      metrics: [{ value: "27%", label: "Fewer Readmissions" }, { value: "34%", label: "Faster Follow-up" }, { value: "4.7★", label: "Patient Satisfaction" }],
    },
    {
      title: "Behavioral Health Network Automates Intake",
      industry: "Behavioral Health",
      challenge: "Manual intake was taking up to 45 minutes per patient, delaying access to care.",
      solution: "We deployed OmniStudio-guided intake flows integrated directly with Health Cloud records.",
      outcome: "New patients now complete intake in a fraction of the time, with fewer errors.",
      metrics: [{ value: "68%", label: "Faster Intake" }, { value: "3×", label: "More Patients Seen" }, { value: "91%", label: "Fewer Data Errors" }],
    },
    {
      title: "Payer Organization Improves Member Engagement by 41%",
      industry: "Payer",
      challenge: "Member outreach was generic and disconnected from actual care activity or risk status.",
      solution: "We implemented Health Cloud member management with AI-driven engagement recommendations.",
      outcome: "Outreach is now targeted to members most likely to benefit, at the right moment.",
      metrics: [{ value: "41%", label: "Higher Engagement" }, { value: "29%", label: "Lower Care Costs" }, { value: "99.1%", label: "Data Accuracy" }],
    },
  ],
};

const FAQS = [
  { q: "What is Salesforce Health Cloud and who is it for?", a: "Salesforce Health Cloud is a healthcare CRM built for hospitals, health systems, payers, life sciences companies, and digital health organizations. It unifies patient, provider, and care data into one platform so care teams can coordinate more effectively than they could with a traditional EHR alone." },
  { q: "What does Salesforce Health Cloud implementation involve?", a: "Implementation covers discovery, solution architecture, configuration of records and care plans, EHR/EMR integration, data migration, testing, and role-based training. Most focused implementations take 8–12 weeks, with larger multi-facility deployments taking longer." },
  { q: "What does Salesforce Health Cloud consulting include?", a: "Our Health Cloud consulting starts with a discovery phase that maps your current patient, care, and data workflows. From there we deliver a prioritized roadmap covering implementation, integration, AI, and compliance — each recommendation tied to a measurable care outcome." },
  { q: "Can you migrate our existing patient data into Health Cloud?", a: "Yes. We migrate patient, provider, and care history from legacy systems and EHRs into Health Cloud, including deduplication and validation, so your team starts on a trustworthy, unified record." },
  { q: "How does Health Cloud improve patient engagement?", a: "Health Cloud gives care teams a single view of every patient interaction, so outreach, scheduling, and follow-up are personalized and consistent rather than generic and disconnected from actual care activity." },
  { q: "How is Salesforce Health Cloud different from a traditional healthcare CRM?", a: "Traditional healthcare CRMs are typically built around marketing lists. Health Cloud is purpose-built around clinical and care coordination workflows — care plans, provider networks, and patient timelines — while still supporting engagement and outreach." },
  { q: "What systems can Health Cloud integrate with?", a: "We integrate Health Cloud with EHR and EMR platforms including Epic and Cerner, along with MuleSoft, Salesforce Data Cloud, Marketing Cloud, Service Cloud, and Experience Cloud, so patient data flows without manual re-entry." },
  { q: "What AI capabilities are available in Health Cloud?", a: "Health Cloud includes Einstein AI for patient insights, care recommendations, predictive analytics, and automated documentation — all trained on your own patient and care data rather than a generic model." },
  { q: "Is Salesforce Health Cloud HIPAA-ready?", a: "Health Cloud runs on Salesforce's enterprise-grade infrastructure with field-level security, role-based access, and audit trails. We layer on HIPAA-aware security reviews, permission design, and data governance policies specific to your compliance requirements." },
  { q: "How much does a Salesforce Health Cloud implementation cost?", a: "Pricing depends on scope, facility count, and integration complexity. Most implementations range from $30,000 to $150,000. We provide a detailed, fixed-scope proposal after a free discovery consultation — no hidden fees." },
  { q: "How long does a Health Cloud implementation typically take?", a: "A focused implementation for a single facility or care team typically takes 8–12 weeks. Multi-facility deployments with complex EHR integration and data migration can take 4–6 months, depending on scope." },
  { q: "What support is available after Health Cloud go-live?", a: "Every implementation includes a structured hypercare period immediately after go-live, plus role-based training and documentation. Clients can transition into an ongoing managed services retainer for continued support and optimization." },
];

const FINAL_CTA = {
  heading: "Ready to Transform Healthcare with Salesforce Health Cloud?",
  description: "Partner with Mirketa to modernize patient experiences, streamline care delivery, and unlock the full potential of Salesforce Health Cloud.",
  primaryCta: { label: "Book a Discovery Call", href: "#contact" },
  secondaryCta: { label: "Talk to an Expert", href: "#contact" },
};

const SEO = {
  title: "Salesforce Health Cloud Consulting & Implementation Services | Mirketa",
  description:
    "Mirketa's certified Salesforce consultants deliver Health Cloud implementation, Patient 360, care coordination, and AI-powered healthcare CRM solutions for providers, payers, and life sciences.",
  canonical: "https://mirketa.us/health-cloud/",
  keywords: [
    "Salesforce Health Cloud",
    "Salesforce Health Cloud Consulting",
    "Salesforce Health Cloud Implementation",
    "Health Cloud Services",
    "Healthcare CRM",
    "Patient Engagement Platform",
    "Care Coordination",
    "Healthcare Automation",
    "Salesforce for Healthcare",
    "Health Cloud Partner",
    "AI Healthcare CRM",
    "Salesforce Healthcare Solutions",
  ],
  schema: [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "Salesforce Health Cloud Consulting and Implementation Services",
      provider: { "@type": "Organization", name: "Mirketa Inc.", url: "https://mirketa.us" },
      name: "Salesforce Health Cloud Consulting & Implementation",
      description:
        "End-to-end Salesforce Health Cloud consulting, implementation, Patient 360, care coordination, EHR/EMR integration, and AI-powered healthcare CRM services.",
      areaServed: "Global",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://mirketa.us/" },
        { "@type": "ListItem", position: 2, name: "Platforms & Technology", item: "https://mirketa.us/salesforce" },
        { "@type": "ListItem", position: 3, name: "Salesforce Clouds", item: "https://mirketa.us/salesforce" },
        { "@type": "ListItem", position: 4, name: "Health Cloud", item: "https://mirketa.us/health-cloud/" },
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
// ANIMATED COUNTER
// ============================================================

function AnimatedCounter({ value, label }) {
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
          const duration = 1400;
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
    <div className="hlc-metric-stat" ref={ref}>
      <strong>{display}</strong>
      <span>{label}</span>
    </div>
  );
}

// ============================================================
// MAIN COMPONENT
// ============================================================

export default function HealthCloud() {
  const heroTextRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (heroTextRef.current) {
        gsap.from(heroTextRef.current.children, {
          opacity: 0,
          y: 28,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
        });
      }

      gsap.utils.toArray(".hlc-reveal").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 32,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      gsap.utils.toArray(".hlc-reveal-stagger").forEach((el) => {
        gsap.from(el.children, {
          opacity: 0,
          y: 26,
          duration: 0.6,
          stagger: 0.06,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      gsap.utils.toArray(".hlc-zoom-in").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          scale: 0.94,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="salesforce-health-cloud">
      <Seo {...SEO} />
      <HeroSection heroTextRef={heroTextRef} />
      <TrustSection />
      <ClientLogosSection />
      <ChallengesSection />
      <ServicesSection />
      <WhyHealthCloudSection />
      <IndustriesSection />
      <AiHealthCloudSection />
      <IntegrationsSection />
      <ProcessSection />
      <BenefitsSection />
      <SuccessMetricsSection />
      <WhyMirketaSection />
      <CaseStudiesSection />
      <FaqSection />
      <FinalCtaSection />
      <ConsultationSection
        eyebrow="Get Started"
        heading="Request a Free Health Cloud Consultation"
        description="Tell us about your patient engagement, care coordination, or provider workflow needs — a Health Cloud implementation expert will follow up within one business day."
        formTitle="Request a Free Health Cloud Consultation"
      />
    </div>
  );
}

// ============================================================
// HERO
// ============================================================

function HeroSection({ heroTextRef }) {
  return (
    <section className="hlc-hero" style={{ backgroundImage: `url("${Images.heroHealthCloud}")` }} aria-label="Salesforce Health Cloud Consulting by Mirketa">
      <div className="hlc-hero__scrim" />
      <div className="container">
        <Breadcrumb items={BREADCRUMB} className="hlc-breadcrumb" />
        <div className="hlc-hero__inner">
          <div ref={heroTextRef} className="hlc-hero__text">
            <span className="hlc-badge">
              <span className="hlc-badge__spark" aria-hidden="true">✦</span> {HERO.badge}
            </span>
            <h1>{HERO.title}</h1>
            <p className="hlc-hero__description">{HERO.description}</p>
            <div className="hlc-hero__ctas">
              <a href={HERO.primaryCta.href} className="btn btn-primary hlc-btn">
                {HERO.primaryCta.label} <span aria-hidden="true">→</span>
              </a>
              <a href={HERO.secondaryCta.href} className="btn btn-secondary hlc-btn">
                {HERO.secondaryCta.label}
              </a>
            </div>
          </div>

          <HeroVisual
            dashboardTitle={HERO_DASHBOARD.title}
            stats={HERO_DASHBOARD.stats}
            rows={HERO_DASHBOARD.rows}
            floatingCards={HERO_DASHBOARD.floatingCards}
            className="hlc-hero__visual"
          />
        </div>
      </div>
    </section>
  );
}

// ============================================================
// TRUST SECTION
// ============================================================

function TrustSection() {
  return (
    <section className="section hlc-trust" aria-labelledby="hlc-trust-heading">
      <div className="container">
        <div className="section-heading hlc-reveal">
          <h2 id="hlc-trust-heading">Healthcare Organizations Trust Mirketa For</h2>
        </div>
        <ul className="hlc-trust__grid hlc-reveal-stagger">
          {TRUST.map((t) => (
            <li key={t}>
              <span aria-hidden="true">{Ico.check}</span>
              {t}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// ============================================================
// CLIENT LOGOS
// ============================================================

function ClientLogosSection() {
  const badges = [
    { icon: Images.clientSalesforce, label: "Salesforce Partner" },
    { icon: Images.clientSoc2, label: "SOC 2 Certified" },
    { icon: Images.clientHipaa, label: "HIPAA Ready" },
    { icon: Images.clientEnterprise, label: "Enterprise Ready" },
    { icon: Images.clientExperience, label: "15+ Years Experience" },
  ];
  const loop = [...badges, ...badges];

  return (
    <section className="hlc-trusted" aria-label="Trusted by healthcare organizations">
      <div className="container hlc-trusted__inner">
        <p className="hlc-trusted__label">Trusted By</p>
        <div className="hlc-trusted__track" role="list">
          <div className="hlc-trusted__marquee">
            {loop.map((b, i) => (
              <div className="hlc-trusted__badge" role="listitem" key={`${b.label}-${i}`}>
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
// HEALTHCARE CHALLENGES WE SOLVE
// ============================================================

function ChallengesSection() {
  return (
    <section className="section hlc-challenges" aria-labelledby="hlc-challenges-heading">
      <div className="container">
        <div className="hlc-challenges__head hlc-reveal">
          <div className="section-heading">
            <p className="hlc-eyebrow">{CHALLENGES.eyebrow}</p>
            <h2 id="hlc-challenges-heading">{CHALLENGES.heading}</h2>
            <p>{CHALLENGES.intro}</p>
          </div>
          <img src={CHALLENGES.illo} alt="" aria-hidden="true" className="hlc-challenges__illo" loading="lazy" />
        </div>
        <div className="hlc-challenges__grid hlc-reveal-stagger">
          {CHALLENGES.items.map((c) => (
            <div className="hlc-challenge-card" key={c.title}>
              <span className="hlc-challenge-card__icon">{c.icon}</span>
              <h3>{c.title}</h3>
              <p>{c.description}</p>
            </div>
          ))}
        </div>
        <div className="hlc-section-cta hlc-reveal">
          <a href="#contact" className="btn btn-primary hlc-btn">
            Talk to a Health Cloud Expert <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// OUR HEALTH CLOUD SERVICES
// ============================================================

function ServicesSection() {
  return (
    <section className="section hlc-services" id="services" aria-labelledby="hlc-services-heading">
      <div className="container">
        <div className="hlc-services__head hlc-reveal">
          <div className="section-heading">
            <p className="hlc-eyebrow">{SERVICES.eyebrow}</p>
            <h2 id="hlc-services-heading">{SERVICES.heading}</h2>
            <p>{SERVICES.intro}</p>
          </div>
          <img src={SERVICES.illo} alt="" aria-hidden="true" className="hlc-services__illo" loading="lazy" />
        </div>
        <div className="hlc-services__grid hlc-reveal-stagger">
          {SERVICES.items.map((s) => (
            <div className="hlc-service-card" key={s.title}>
              {s.illo ? (
                <img src={s.illo} alt="" aria-hidden="true" className="hlc-service-card__illo" loading="lazy" />
              ) : (
                <span className="hlc-service-card__icon">{s.icon}</span>
              )}
              <h3>{s.title}</h3>
              <p>{s.description}</p>
            </div>
          ))}
        </div>
        <div className="hlc-section-cta hlc-reveal">
          <a href="#contact" className="btn btn-primary hlc-btn">
            Book a Discovery Call <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// WHY SALESFORCE HEALTH CLOUD
// ============================================================

function WhyHealthCloudSection() {
  return (
    <section className="section hlc-why-cloud" aria-labelledby="hlc-why-cloud-heading">
      <div className="container">
        <div className="hlc-why-cloud__head hlc-reveal">
          <img src={WHY_HEALTH_CLOUD.illo} alt="" aria-hidden="true" className="hlc-why-cloud__illo" loading="lazy" />
          <div className="section-heading">
            <p className="hlc-eyebrow">{WHY_HEALTH_CLOUD.eyebrow}</p>
            <h2 id="hlc-why-cloud-heading">{WHY_HEALTH_CLOUD.heading}</h2>
            <p>{WHY_HEALTH_CLOUD.intro}</p>
          </div>
        </div>
        <div className="hlc-why-cloud__grid hlc-reveal-stagger">
          {WHY_HEALTH_CLOUD.items.map((w) => (
            <div className="hlc-feature-card" key={w.title}>
              <span className="hlc-feature-card__icon">{w.icon}</span>
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
// INDUSTRIES WE SERVE
// ============================================================

function IndustriesSection() {
  return (
    <section className="section hlc-industries" aria-labelledby="hlc-industries-heading">
      <div className="container">
        <div className="section-heading hlc-reveal">
          <p className="hlc-eyebrow">{INDUSTRIES.eyebrow}</p>
          <h2 id="hlc-industries-heading">{INDUSTRIES.heading}</h2>
          <p>{INDUSTRIES.intro}</p>
        </div>
        <div className="hlc-industries__grid hlc-reveal-stagger">
          {INDUSTRIES.items.map((i) => (
            <div className="hlc-industry-card" key={i.title}>
              <span className="hlc-industry-card__icon">{i.icon}</span>
              <h3>{i.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// AI + HEALTH CLOUD
// ============================================================

function AiHealthCloudSection() {
  return (
    <section className="section hlc-ai" aria-labelledby="hlc-ai-heading">
      <div className="container">
        <div className="hlc-ai__head hlc-reveal">
          <div className="section-heading">
            <p className="hlc-eyebrow">{AI_HEALTH_CLOUD.eyebrow}</p>
            <h2 id="hlc-ai-heading">{AI_HEALTH_CLOUD.heading}</h2>
            <p>{AI_HEALTH_CLOUD.intro}</p>
          </div>
          <img src={AI_HEALTH_CLOUD.illo} alt="" aria-hidden="true" className="hlc-ai__illo" loading="lazy" />
        </div>
        <div className="hlc-ai__grid hlc-reveal-stagger">
          {AI_HEALTH_CLOUD.items.map((a) => (
            <div className="hlc-ai-card" key={a.title}>
              <span className="hlc-ai-card__icon">{a.icon}</span>
              <h3>{a.title}</h3>
              <p>{a.description}</p>
            </div>
          ))}
        </div>
        <div className="hlc-ai__cta hlc-reveal">
          <Link to="/agentforce" className="btn btn-primary hlc-btn">
            Explore Agentforce <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// INTEGRATION SECTION
// ============================================================

function IntegrationsSection() {
  return (
    <section className="section hlc-integrations" aria-labelledby="hlc-integrations-heading">
      <div className="container">
        <div className="hlc-integrations__head hlc-reveal">
          <img src={INTEGRATIONS.illo} alt="" aria-hidden="true" className="hlc-integrations__illo" loading="lazy" />
          <div className="section-heading">
            <p className="hlc-eyebrow">{INTEGRATIONS.eyebrow}</p>
            <h2 id="hlc-integrations-heading">{INTEGRATIONS.heading}</h2>
            <p>{INTEGRATIONS.intro}</p>
          </div>
        </div>
        <div className="hlc-integrations__grid hlc-reveal-stagger">
          {INTEGRATIONS.items.map((i) => (
            <div className="hlc-integration-card" key={i.title}>
              <span className="hlc-integration-card__icon">{i.icon}</span>
              <h3>{i.title}</h3>
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
    <section className="section hlc-process" aria-labelledby="hlc-process-heading">
      <div className="container">
        <div className="section-heading hlc-reveal">
          <p className="hlc-eyebrow">{PROCESS.eyebrow}</p>
          <h2 id="hlc-process-heading">{PROCESS.heading}</h2>
          <p>{PROCESS.intro}</p>
        </div>
        <div className="hlc-process__rail hlc-reveal-stagger">
          {PROCESS.steps.map((p, i) => (
            <div className="hlc-step-card" key={p.name}>
              <span className="hlc-step-card__num">{String(i + 1).padStart(2, "0")}</span>
              <h3>{p.name}</h3>
              <p>{p.description}</p>
              {i < PROCESS.steps.length - 1 && <span className="hlc-step-card__arrow" aria-hidden="true">→</span>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// BENEFITS SECTION
// ============================================================

function BenefitsSection() {
  return (
    <section className="section hlc-benefits" aria-labelledby="hlc-benefits-heading">
      <div className="container">
        <div className="hlc-benefits__head hlc-reveal">
          <div className="section-heading">
            <p className="hlc-eyebrow">{BENEFITS.eyebrow}</p>
            <h2 id="hlc-benefits-heading">{BENEFITS.heading}</h2>
            <p>{BENEFITS.intro}</p>
          </div>
          <img src={BENEFITS.illo} alt="" aria-hidden="true" className="hlc-benefits__illo" loading="lazy" />
        </div>
        <div className="hlc-benefits__grid hlc-reveal-stagger">
          {BENEFITS.items.map((b) => (
            <div className="hlc-benefit-card" key={b.title}>
              <span className="hlc-benefit-card__icon">{b.icon}</span>
              <h3>{b.title}</h3>
              <p>{b.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// SUCCESS METRICS
// ============================================================

function SuccessMetricsSection() {
  return (
    <section className="hlc-metrics" aria-label="Mirketa Health Cloud success metrics">
      <div className="container">
        <div className="hlc-metrics__grid hlc-reveal-stagger">
          {SUCCESS_METRICS.map((m) => (
            <AnimatedCounter key={m.label} value={m.value} label={m.label} />
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
    <section className="section hlc-why-mirketa" aria-labelledby="hlc-why-mirketa-heading">
      <div className="container">
        <div className="section-heading hlc-reveal">
          <p className="hlc-eyebrow">{WHY_MIRKETA.eyebrow}</p>
          <h2 id="hlc-why-mirketa-heading">{WHY_MIRKETA.heading}</h2>
          <p>{WHY_MIRKETA.intro}</p>
        </div>
        <div className="hlc-why-mirketa__grid hlc-reveal-stagger">
          {WHY_MIRKETA.items.map((w) => (
            <div className="hlc-why-mirketa-card" key={w.title}>
              <span className="hlc-why-mirketa-card__icon">{w.icon}</span>
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
// CUSTOMER SUCCESS STORIES
// ============================================================

function CaseStudiesSection() {
  return (
    <section className="section hlc-cases" aria-labelledby="hlc-cases-heading">
      <div className="container">
        <div className="section-heading hlc-reveal">
          <p className="hlc-eyebrow">{CASE_STUDIES.eyebrow}</p>
          <h2 id="hlc-cases-heading">{CASE_STUDIES.heading}</h2>
          <p>{CASE_STUDIES.intro}</p>
        </div>
        <div className="hlc-cases__grid hlc-reveal-stagger">
          {CASE_STUDIES.cases.map((c) => (
            <div className="hlc-case-card" key={c.title}>
              <span className="hlc-case-card__tag">{c.industry}</span>
              <h3>{c.title}</h3>
              <dl className="hlc-case-card__fields">
                <div><dt>Challenge</dt><dd>{c.challenge}</dd></div>
                <div><dt>Solution</dt><dd>{c.solution}</dd></div>
                <div><dt>Business Outcome</dt><dd>{c.outcome}</dd></div>
              </dl>
              <div className="hlc-case-card__metrics">
                {c.metrics.map((m) => (
                  <div key={m.label}>
                    <strong>{m.value}</strong>
                    <span>{m.label}</span>
                  </div>
                ))}
              </div>
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
  const [query, setQuery] = useState("");
  const [openIndex, setOpenIndex] = useState(-1);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return FAQS;
    return FAQS.filter((item) => item.q.toLowerCase().includes(q) || item.a.toLowerCase().includes(q));
  }, [query]);

  return (
    <section className="section hlc-faq" aria-labelledby="hlc-faq-heading">
      <div className="container">
        <div className="section-heading hlc-reveal">
          <p className="hlc-eyebrow">FAQ</p>
          <h2 id="hlc-faq-heading">Frequently Asked Questions About Salesforce Health Cloud</h2>
        </div>
        <div className="hlc-faq__search-wrap hlc-reveal">
          <label htmlFor="hlc-faq-search" className="visually-hidden">
            Search frequently asked questions
          </label>
          <input
            id="hlc-faq-search"
            type="search"
            className="hlc-faq__search"
            placeholder="Ask a question — e.g. &quot;HIPAA&quot;, &quot;pricing&quot;, &quot;AI&quot;..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpenIndex(-1);
            }}
          />
        </div>
        <div className="hlc-faq__list hlc-reveal">
          {filtered.length === 0 ? (
            <p className="hlc-faq__empty">No questions match &ldquo;{query}&rdquo;. Try a different search term.</p>
          ) : (
            filtered.map((item, i) => {
              const open = openIndex === i;
              const panelId = `hlc-faq-panel-${i}`;
              return (
                <div className={`hlc-faq-item ${open ? "is-open" : ""}`} key={item.q}>
                  <button type="button" className="hlc-faq-item__question" aria-expanded={open} aria-controls={panelId} onClick={() => setOpenIndex(open ? -1 : i)}>
                    <span>{item.q}</span>
                    <span className="hlc-faq-item__icon" aria-hidden="true">{open ? "−" : "+"}</span>
                  </button>
                  <div id={panelId} className="hlc-faq-item__answer" role="region" hidden={!open}>
                    <p>{item.a}</p>
                  </div>
                </div>
              );
            })
          )}
        </div>
        <p className="hlc-faq__links">
          Related reading: <Link to="/salesforce-consulting-development-services">Salesforce Consulting</Link>,{" "}
          <Link to="/salesforce">Salesforce Clouds</Link>,{" "}
          <Link to="/salesforce/service-cloud">Service Cloud</Link>,{" "}
          <Link to="/salesforce/sales-cloud">Sales Cloud</Link>,{" "}
          <Link to="/salesforce/marketing-cloud">Marketing Cloud</Link>,{" "}
          <Link to="/salesforce/revenue-cloud">Revenue Cloud</Link>,{" "}
          <Link to="/data-cloud">Data Cloud</Link>, <Link to="/ai-consulting">AI Consulting</Link>,{" "}
          <Link to="/agentforce">Agentforce</Link>, <Link to="/kratu-ai">Healthcare Solutions</Link>.
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
    <section className="hlc-final-cta hlc-reveal" aria-labelledby="hlc-final-cta-heading">
      <div className="container hlc-final-cta__inner">
        <h2 id="hlc-final-cta-heading">{FINAL_CTA.heading}</h2>
        <p>{FINAL_CTA.description}</p>
        <div className="hlc-final-cta__ctas">
          <a href={FINAL_CTA.primaryCta.href} className="btn btn-primary hlc-btn">
            {FINAL_CTA.primaryCta.label} <span aria-hidden="true">→</span>
          </a>
          <a href={FINAL_CTA.secondaryCta.href} className="btn btn-secondary hlc-btn">
            {FINAL_CTA.secondaryCta.label}
          </a>
        </div>
        <Link to="/salesforce" className="hlc-final-cta__all-services">
          Explore All Salesforce Clouds →
        </Link>
      </div>
    </section>
  );
}
