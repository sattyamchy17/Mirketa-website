import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Images } from "../../../assets/images/index.js";
import Seo from "../../../components/Seo/Seo.jsx";
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb.jsx";
import HeroVisual from "../../../components/HeroVisual/HeroVisual.jsx";
import ConsultationSection from "../../../components/ConsultationSection/ConsultationSection.jsx";
import "./AdminSupport.css";

gsap.registerPlugin(ScrollTrigger);

// ============================================================
// ICONS
// ============================================================

const Ico = {
  users: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="9" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.4" /><path d="M3.5 19c.6-3.4 2.9-5.2 5.5-5.2s4.9 1.8 5.5 5.2" stroke="currentColor" strokeWidth="1.4" /><circle cx="17" cy="9" r="2.6" stroke="currentColor" strokeWidth="1.3" opacity="0.7" /><path d="M15.5 13.4c2.2.3 3.7 1.9 4 4.6" stroke="currentColor" strokeWidth="1.3" opacity="0.7" /></svg>
  ),
  document: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 3h9l3 3v15H6z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M9 10h6M9 14h6M9 18h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
  ),
  clock: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" /><path d="M12 7v5l4 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  gear: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.4" /><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
  ),
  gear2: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="10" width="18" height="4" rx="2" stroke="currentColor" strokeWidth="1.4" /><rect x="3" y="18" width="12" height="4" rx="2" stroke="currentColor" strokeWidth="1.4" /><rect x="3" y="2" width="15" height="4" rx="2" stroke="currentColor" strokeWidth="1.4" /></svg>
  ),
  layers: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3l9 5-9 5-9-5 9-5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M3 12l9 5 9-5M3 16l9 5 9-5" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /></svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 2l8 4v6c0 5-4 8-8 10-4-2-8-5-8-10V6l8-4z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M8.5 12l2 2 5-5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  eye: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.4" /></svg>
  ),
  network: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="6" r="2.4" stroke="currentColor" strokeWidth="1.4" /><circle cx="6" cy="18" r="2.4" stroke="currentColor" strokeWidth="1.4" /><circle cx="18" cy="18" r="2.4" stroke="currentColor" strokeWidth="1.4" /><path d="M12 8.4L7 16M12 8.4l5 7.6M8.4 18h7.2" stroke="currentColor" strokeWidth="1.3" /></svg>
  ),
  code: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 6L4 12l5 6M15 6l5 6-5 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  chip: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="7" y="7" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.4" /><path d="M9 3v4M15 3v4M9 21v-4M15 21v-4M3 9h4M3 15h4M21 9h-4M21 15h-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
  ),
  plug: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 3v5M15 3v5M7 8h10v4a5 5 0 01-10 0V8z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="M12 17v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
  ),
  database: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><ellipse cx="12" cy="6" rx="8" ry="3" stroke="currentColor" strokeWidth="1.4" /><path d="M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" stroke="currentColor" strokeWidth="1.4" /></svg>
  ),
  refresh: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 12a8 8 0 0113.7-5.7L20 8M20 4v4h-4M20 12a8 8 0 01-13.7 5.7L4 16M4 20v-4h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  box: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 8l9-5 9 5-9 5-9-5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M3 8v8l9 5 9-5V8M12 13v8" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /></svg>
  ),
  chartUp: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 19V13M10 19V8M16 19v-5M20 19V5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
  ),
  sparkle: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /></svg>
  ),
  robot: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="5" y="9" width="14" height="10" rx="3" stroke="currentColor" strokeWidth="1.5" /><path d="M12 5v4M9 14h.01M15 14h.01" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /><circle cx="12" cy="4" r="1.4" fill="currentColor" /></svg>
  ),
  check: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12.5l5 5L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  cross: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
  ),
  award: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="8" r="5" stroke="currentColor" strokeWidth="1.4" /><path d="M8.5 12.5L7 21l5-2.5L17 21l-1.5-8.5" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  globe: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.4" /><path d="M3 12h18M12 3c2.5 2.5 3.5 6 3.5 9s-1 6.5-3.5 9c-2.5-2.5-3.5-6-3.5-9s1-6.5 3.5-9z" stroke="currentColor" strokeWidth="1.3" /></svg>
  ),
  headset: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 13a8 8 0 0116 0v4" stroke="currentColor" strokeWidth="1.5" /><rect x="3" y="13" width="4" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4" /><rect x="17" y="13" width="4" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4" /></svg>
  ),
  bolt: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M13 2L4 14h7l-1 8 10-13h-7l0-7z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  handshake: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 12l4-4 4 4-4 4-4-4zM21 12l-4-4-4 4 4 4 4-4z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M11 12h2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
  ),
  compass: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" /><path d="M15 9l-2 6-6 2 2-6 6-2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  cloud: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6.5 16.5A4.2 4.2 0 017 8.2 5.5 5.5 0 0117.5 9.5 3.7 3.7 0 0117 17H7" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></svg>
  ),
  target: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.4" /><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.3" opacity="0.6" /><circle cx="12" cy="12" r="1.2" fill="currentColor" /></svg>
  ),
  heartbeat: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 21s-7-4-7-10V5l7-3 7 3v6c0 6-7 10-7 10z" stroke="currentColor" strokeWidth="1.4" /><path d="M8 12h2l1.5-3 2 6 1.5-3H16" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  bank: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 21V9l8-5 8 5v12H4z" stroke="currentColor" strokeWidth="1.4" /><path d="M9 21v-6M15 21v-6" stroke="currentColor" strokeWidth="1.3" /></svg>
  ),
  factory: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 21V11l5 3V11l5 3V8l8 5v8H3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  cart: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 4h2l2.2 11h10.6L20 7H6.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /><circle cx="9" cy="20" r="1.3" fill="currentColor" /><circle cx="17" cy="20" r="1.3" fill="currentColor" /></svg>
  ),
  graduation: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M2 8l10-4 10 4-10 4-10-4z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M6 10v5c0 1.5 3 3 6 3s6-1.5 6-3v-5" stroke="currentColor" strokeWidth="1.4" /></svg>
  ),
  heart: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 20s-7-4.2-7-9.6C5 7 7.2 5 9.8 5c1 0 2 .4 2.2 1.2C12.2 5.4 13.2 5 14.2 5 16.8 5 19 7 19 10.4 19 15.8 12 20 12 20z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  building: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 21V9l8-5 8 5v12H4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="M9 21v-6h6v6" stroke="currentColor" strokeWidth="1.4" /></svg>
  ),
  flask: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 3h6M10 3v6l-5 9a2 2 0 001.7 3h10.6a2 2 0 001.7-3l-5-9V3" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /></svg>
  ),
  government: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 10l8-6 8 6" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="M4 10h16v2H4z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M6 12v8M10 12v8M14 12v8M18 12v8" stroke="currentColor" strokeWidth="1.4" /><path d="M4 20h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
  ),
  bolt2: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M13 2L4 14h7l-1 8 10-13h-7l0-7z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
};

// ============================================================
// DATA
// ============================================================

const BREADCRUMB = [
  { label: "Home", href: "/" },
  { label: "Platforms & Technology", href: "/salesforce-consulting-development-services" },
  { label: "Developer Services & Admin Support" },
];

const HERO = {
  badge: "Certified Salesforce Managed Services Partner",
  title: "Salesforce Developer Services & Admin Support",
  description:
    "Extend your Salesforce team with certified Salesforce Administrators and Developers who provide continuous platform management, enhancements, automation, integrations, customization, and proactive support to maximize your Salesforce investment.",
  primaryCta: { label: "Hire Salesforce Experts", href: "#contact" },
  secondaryCta: { label: "Book a Discovery Call", href: "#contact" },
};

const HERO_DASHBOARD = {
  title: "Admin & Dev Support Queue",
  stats: [
    { label: "Faster Response Time", value: "91%", caption: "vs. internal-only support" },
    { label: "Less Downtime", value: "76%", caption: "With proactive monitoring" },
    { label: "Backlog Cleared", value: "80+", caption: "Items resolved in 10 weeks" },
  ],
  rows: [
    { title: "Ticket #2210 — Flow Error", meta: "Sandbox • Assigned to Dev", status: "Resolved", tone: "good" },
    { title: "Security Review — Q3", meta: "100% profiles reviewed", status: "Complete", tone: "good" },
    { title: "Release: Winter '26", meta: "Sandbox → Production", status: "Scheduled", tone: "neutral" },
    { title: "Critical Org Alert", meta: "Permission set drift detected", status: "In Progress", tone: "attention" },
  ],
  floatingCards: [
    { icon: Ico.headset, title: "24×7 Support", subtitle: "Enterprise SLA coverage" },
    { icon: Ico.shield, title: "Security Reviews", subtitle: "0 critical findings" },
  ],
};

const CHALLENGES = {
  eyebrow: "Challenges We Solve",
  heading: "Salesforce Challenges We Solve",
  intro: "Most organizations aren't short on Salesforce licenses — they're short on the ongoing expertise to keep the platform healthy. These are the problems we hear most before an admin support engagement.",
  illo: Images.illoSupportTicketQueue,
  items: [
    { icon: Ico.users, title: "Lack of Internal Salesforce Expertise", description: "No dedicated admin or developer to keep the org running smoothly." },
    { icon: Ico.document, title: "Growing Enhancement Backlog", description: "Feature requests pile up faster than internal teams can address them." },
    { icon: Ico.clock, title: "Slow Issue Resolution", description: "Bugs and user issues sit unresolved for days or weeks." },
    { icon: Ico.gear, title: "Manual Business Processes", description: "Processes that could be automated still run through spreadsheets and email." },
    { icon: Ico.layers, title: "Technical Debt", description: "Years of quick fixes have made the org fragile and hard to change." },
    { icon: Ico.eye, title: "Poor User Adoption", description: "Reps and staff avoid Salesforce because it doesn't match how they work." },
    { icon: Ico.chartUp, title: "Platform Performance Issues", description: "Slow page loads and timeouts frustrate users daily." },
    { icon: Ico.network, title: "Complex Integrations", description: "Connected systems break silently with no one monitoring them." },
    { icon: Ico.shield, title: "Security Concerns", description: "Permissions and sharing rules haven't been reviewed in years." },
    { icon: Ico.users, title: "Limited Internal Resources", description: "The one person who understood the org has already left." },
  ],
};

const SERVICES = {
  eyebrow: "Our Services",
  heading: "Salesforce Developer Services & Admin Support Services",
  intro: "From daily administration to deep custom development, our certified team covers every layer of ongoing Salesforce support.",
  illo: Images.illoDevCodeReview,
  items: [
    { icon: Ico.users, title: "Salesforce Administrator Support" },
    { icon: Ico.code, title: "Salesforce Developer Support" },
    { icon: Ico.headset, title: "Salesforce Managed Services" },
    { icon: Ico.eye, title: "Platform Monitoring" },
    { icon: Ico.code, title: "Salesforce Custom Development" },
    { icon: Ico.gear2, title: "Workflow Automation" },
    { icon: Ico.gear2, title: "Flow Development" },
    { icon: Ico.chip, title: "Lightning Web Components" },
    { icon: Ico.code, title: "Apex Development" },
    { icon: Ico.plug, title: "API Integrations" },
    { icon: Ico.database, title: "Data Management" },
    { icon: Ico.database, title: "Data Cleanup" },
    { icon: Ico.box, title: "Sandbox Management" },
    { icon: Ico.refresh, title: "Release Management" },
    { icon: Ico.shield, title: "Security Reviews" },
    { icon: Ico.users, title: "User Management" },
    { icon: Ico.shield, title: "Permission Set Management" },
    { icon: Ico.chartUp, title: "Reports & Dashboards" },
    { icon: Ico.refresh, title: "DevOps Support" },
    { icon: Ico.headset, title: "Ongoing Maintenance" },
  ],
};

const ADMIN_SERVICES = {
  eyebrow: "Salesforce Administration Services",
  heading: "Day-to-Day Administration, Handled by Certified Admins",
  intro: "We keep the fundamentals healthy — the unglamorous work that determines whether Salesforce actually gets used.",
  illo: Images.illoAdminConsoleHealth,
  items: [
    { icon: Ico.users, title: "User Management" },
    { icon: Ico.network, title: "Role Hierarchy" },
    { icon: Ico.shield, title: "Profiles & Permission Sets" },
    { icon: Ico.chartUp, title: "Reports & Dashboards" },
    { icon: Ico.gear2, title: "Workflow Automation" },
    { icon: Ico.check, title: "Approval Processes" },
    { icon: Ico.document, title: "Email Templates" },
    { icon: Ico.layers, title: "Queues" },
    { icon: Ico.shield, title: "Sharing Rules" },
    { icon: Ico.database, title: "Data Quality" },
    { icon: Ico.eye, title: "Health Checks" },
    { icon: Ico.chartUp, title: "Platform Optimization" },
  ],
};

const DEV_SERVICES = {
  eyebrow: "Salesforce Development Services",
  heading: "Custom Development, When Configuration Isn't Enough",
  intro: "When a requirement exceeds what clicks-not-code can deliver, our certified developers build it right.",
  items: [
    { icon: Ico.code, title: "Apex Development" },
    { icon: Ico.chip, title: "Lightning Web Components" },
    { icon: Ico.document, title: "Visualforce" },
    { icon: Ico.layers, title: "Custom Applications" },
    { icon: Ico.box, title: "AppExchange Apps" },
    { icon: Ico.plug, title: "REST APIs" },
    { icon: Ico.plug, title: "SOAP APIs" },
    { icon: Ico.network, title: "Platform Events" },
    { icon: Ico.gear2, title: "Flow Automation" },
    { icon: Ico.sparkle, title: "Einstein AI" },
    { icon: Ico.robot, title: "Agentforce Development" },
    { icon: Ico.network, title: "Custom Integrations" },
  ],
};

const PLAN_FEATURES = ["Dedicated Admin", "Dedicated Developer", "Monthly Enhancements", "Bug Fixes", "Release Management", "SLA Support", "Health Checks", "Security Reviews", "Strategic Consulting"];

const SUPPORT_PLANS = {
  eyebrow: "Managed Support Plans",
  heading: "Choose the Level of Support That Fits Your Org",
  intro: "Every plan includes certified Salesforce expertise — the difference is dedicated capacity and response commitment.",
  plans: [
    { name: "Essential Support", tagline: "For orgs that need reliable break-fix coverage.", featured: false, included: [false, false, false, true, true, true, false, false, false] },
    { name: "Business Support", tagline: "For orgs that need ongoing enhancements, not just fixes.", featured: true, included: [true, false, true, true, true, true, true, false, false] },
    { name: "Enterprise Support", tagline: "For orgs that need a full extended Salesforce team.", featured: false, included: [true, true, true, true, true, true, true, true, true] },
  ],
};

const INDUSTRIES = {
  eyebrow: "Industries We Support",
  heading: "Salesforce Support Expertise Across Every Industry",
  intro: "Support requirements differ by industry — we bring relevant context to every managed services engagement.",
  items: [
    { icon: Ico.heartbeat, title: "Healthcare" },
    { icon: Ico.bank, title: "Financial Services" },
    { icon: Ico.factory, title: "Manufacturing" },
    { icon: Ico.cart, title: "Retail" },
    { icon: Ico.chip, title: "Technology" },
    { icon: Ico.graduation, title: "Education" },
    { icon: Ico.heart, title: "Nonprofit" },
    { icon: Ico.shield, title: "Insurance" },
    { icon: Ico.building, title: "Real Estate" },
    { icon: Ico.flask, title: "Life Sciences" },
    { icon: Ico.government, title: "Government" },
    { icon: Ico.bolt2, title: "Energy" },
  ],
};

const PLATFORMS = {
  eyebrow: "Salesforce Platforms Supported",
  heading: "We Support the Full Salesforce Platform",
  intro: "Whichever Salesforce clouds your organization runs, our admins and developers already know them.",
  items: ["Sales Cloud", "Service Cloud", "Marketing Cloud", "Revenue Cloud", "Experience Cloud", "Health Cloud", "Financial Services Cloud", "Data Cloud", "Net Zero Cloud", "CPQ", "Agentforce", "Einstein AI"],
};

const WHY_MIRKETA = {
  eyebrow: "Why Choose Mirketa",
  heading: "A Managed Services Partner Built for the Long Term",
  intro: "Hundreds of shops can fix a broken flow. Fewer can be trusted with your org for years, not weeks.",
  items: [
    { icon: Ico.award, title: "Certified Salesforce Experts", description: "Every admin and developer holds active Salesforce certifications." },
    { icon: Ico.globe, title: "Global Delivery Model", description: "A delivery model built to support distributed, multi-region teams." },
    { icon: Ico.headset, title: "Dedicated Support Team", description: "The same team gets to know your org instead of a rotating help desk." },
    { icon: Ico.compass, title: "Flexible Engagement Models", description: "Dedicated, shared, or project-based — scoped to your actual needs." },
    { icon: Ico.sparkle, title: "AI-driven Automation Expertise", description: "Einstein AI and Agentforce are part of the practice, not an afterthought." },
    { icon: Ico.shield, title: "Secure Development Practices", description: "Security review built into every change we make." },
    { icon: Ico.layers, title: "Enterprise Governance", description: "Change management and release discipline, even for a small team." },
    { icon: Ico.clock, title: "24×7 Support", description: "A support model built for organizations that never fully close." },
  ],
};

const ENGAGEMENT_MODELS = {
  eyebrow: "Engagement Models",
  heading: "An Engagement Model Built Around How You Work",
  intro: "There's no single right way to extend a Salesforce team — we scope the model to your actual workload.",
  illo: Images.illoTeamCollaboration,
  items: [
    { icon: Ico.users, title: "Dedicated Salesforce Administrator", description: "One admin, focused entirely on your org." },
    { icon: Ico.code, title: "Dedicated Salesforce Developer", description: "One developer, embedded in your sprint cadence." },
    { icon: Ico.network, title: "Shared Support Team", description: "A pooled team covering multiple orgs cost-effectively." },
    { icon: Ico.headset, title: "Managed Services", description: "A full retainer covering admin, dev, and strategic support." },
    { icon: Ico.box, title: "Project-Based Support", description: "Defined scope, defined timeline, defined deliverable." },
    { icon: Ico.handshake, title: "Staff Augmentation", description: "Certified resources embedded directly into your existing team." },
  ],
};

const SUCCESS_METRICS = [
  { value: "500+", label: "Projects Delivered" },
  { value: "150+", label: "Certified Consultants" },
  { value: "120+", label: "Active Support Clients" },
  { value: "300+", label: "Salesforce Certifications" },
  { value: "15+", label: "Countries Served" },
  { value: "98%", label: "Customer Satisfaction" },
];

const CASE_STUDIES = {
  eyebrow: "Customer Success Stories",
  heading: "Real Managed Services Outcomes From Real Engagements",
  intro: "Anonymized results from recent Salesforce admin and developer support engagements.",
  illo: Images.illoPlatformMonitoring,
  cases: [
    {
      title: "SaaS Company Clears a 6-Month Enhancement Backlog in 10 Weeks",
      industry: "Technology",
      challenge: "A growing SaaS company had a single overworked admin and a backlog of over 80 enhancement requests.",
      services: "We embedded a dedicated admin and developer team on a Business Support retainer.",
      improvements: "Backlog cleared, response time dropped from days to hours.",
      outcome: "The internal team now focuses on strategy instead of firefighting tickets.",
      metrics: [{ value: "80+", label: "Backlog Items Cleared" }, { value: "91%", label: "Faster Response Time" }, { value: "10 wks", label: "To Zero Backlog" }],
    },
    {
      title: "Healthcare Provider Passes Security Audit After Org Cleanup",
      industry: "Healthcare",
      challenge: "Years of ad hoc permission changes left the org unable to pass an internal security audit.",
      services: "We performed a full security review, rebuilt the permission model, and implemented ongoing health checks.",
      improvements: "Sharing rules and profiles rebuilt around least-privilege access.",
      outcome: "The org passed its next security audit with zero critical findings.",
      metrics: [{ value: "0", label: "Critical Findings" }, { value: "100%", label: "Profiles Reviewed" }, { value: "Quarterly", label: "Ongoing Health Checks" }],
    },
    {
      title: "Retailer Reduces Platform Downtime by 76% With Managed Monitoring",
      industry: "Retail",
      challenge: "Integration failures went unnoticed for days, disrupting order processing during peak season.",
      services: "We implemented proactive platform monitoring and a dedicated on-call support rotation.",
      improvements: "Integration failures are now caught and resolved within minutes.",
      outcome: "The retailer went through its next peak season with zero unplanned downtime.",
      metrics: [{ value: "76%", label: "Less Downtime" }, { value: "<15 min", label: "Avg. Detection Time" }, { value: "0", label: "Peak-Season Outages" }],
    },
  ],
};

const FAQS = [
  { q: "What is Salesforce admin support?", a: "Salesforce admin support is ongoing administration of your Salesforce org — user management, permissions, reports, workflow automation, and health checks — provided by a certified admin so your internal team doesn't have to handle it alone." },
  { q: "What are Salesforce managed services?", a: "Salesforce managed services is a retainer-based engagement model that gives you ongoing access to certified admins and developers for enhancements, bug fixes, and platform optimization, instead of hiring full-time or engaging a new vendor for every project." },
  { q: "What's included in Salesforce developer services?", a: "Our developer services cover Apex, Lightning Web Components, custom integrations, AppExchange development, and platform automation — for requirements that go beyond what standard configuration can achieve." },
  { q: "Can we get a dedicated Salesforce resource instead of a shared team?", a: "Yes. Our dedicated engagement model assigns one admin or developer focused entirely on your org, rather than splitting time across multiple clients." },
  { q: "How much does Salesforce admin and developer support cost?", a: "Pricing depends on the engagement model and scope. Shared support retainers typically start around $2,500/month, while dedicated resources range from $6,000 to $12,000/month depending on seniority and hours committed." },
  { q: "What SLAs do you offer for support requests?", a: "SLA commitments vary by plan — Essential Support covers business-hours response, while Business and Enterprise plans include faster guaranteed response times and, for Enterprise, 24×7 coverage." },
  { q: "What is your typical response time for support tickets?", a: "Response time depends on your support plan and case priority. Critical issues on our Enterprise plan are typically acknowledged within 1 hour; standard requests on lower tiers are addressed within one business day." },
  { q: "How do you handle security for ongoing Salesforce support?", a: "Every engagement includes role-based access controls, permission set review, and an audit trail of every change made to your org. Security reviews are a standing item on Business and Enterprise plans." },
  { q: "Can your team manage our existing Salesforce integrations?", a: "Yes. We support and monitor existing integrations with ERP, marketing, and finance systems, and can build new integrations using REST APIs, SOAP APIs, or MuleSoft as needed." },
  { q: "What does ongoing Salesforce maintenance actually involve?", a: "Ongoing maintenance covers release readiness testing, sandbox management, data quality monitoring, security reviews, and proactive health checks — the recurring work that keeps an org from accumulating technical debt." },
  { q: "What's the difference between the support plans?", a: "Essential Support covers break-fix and basic release management. Business Support adds a part-time dedicated admin and monthly enhancements. Enterprise Support adds a dedicated developer, 24×7 SLA coverage, security reviews, and strategic consulting." },
  { q: "Can Mirketa extend our existing internal Salesforce team?", a: "Yes. Our staff augmentation model embeds certified admins and developers directly into your existing team and processes, working inside your tools and cadence rather than as a separate, disconnected vendor." },
];

const FINAL_CTA = {
  heading: "Need a Dedicated Salesforce Team?",
  description: "Scale faster with certified Salesforce Administrators and Developers who provide proactive support, continuous enhancements, and enterprise-grade managed services.",
  primaryCta: { label: "Hire Salesforce Experts", href: "#contact" },
  secondaryCta: { label: "Talk to an Expert", href: "#contact" },
};

const SEO = {
  title: "Salesforce Developer Services & Admin Support | Managed Services | Mirketa",
  description:
    "Mirketa's certified Salesforce Administrators and Developers provide ongoing managed services — administration, custom development, integrations, and proactive support.",
  canonical: "https://mirketa.us/developer-services-admin-support/",
  keywords: [
    "Salesforce Developer Services",
    "Salesforce Admin Support",
    "Salesforce Managed Services",
    "Salesforce Administrator Services",
    "Hire Salesforce Developers",
    "Salesforce Support Services",
    "Salesforce Maintenance Services",
    "Salesforce Administration",
    "Salesforce Platform Support",
    "Salesforce Enhancement Services",
    "Salesforce Optimization Services",
    "Dedicated Salesforce Team",
  ],
  schema: [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "Salesforce Developer Services and Admin Support",
      provider: { "@type": "Organization", name: "Mirketa Inc.", url: "https://mirketa.us" },
      name: "Salesforce Developer Services & Admin Support",
      description:
        "Ongoing Salesforce administration, custom development, automation, integrations, and managed support services for organizations of every size.",
      areaServed: "Global",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://mirketa.us/" },
        { "@type": "ListItem", position: 2, name: "Platforms & Technology", item: "https://mirketa.us/salesforce-consulting-development-services" },
        { "@type": "ListItem", position: 3, name: "Developer Services & Admin Support", item: "https://mirketa.us/developer-services-admin-support/" },
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
    <div className="asp-metric-stat" ref={ref}>
      <strong>{display}</strong>
      <span>{label}</span>
    </div>
  );
}

// ============================================================
// MAIN COMPONENT
// ============================================================

export default function AdminSupport() {
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

      gsap.utils.toArray(".asp-reveal").forEach((el) => {
        gsap.from(el, {
          opacity: prefersReduced ? 1 : 0,
          y: prefersReduced ? 0 : 32,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      gsap.utils.toArray(".asp-reveal-stagger").forEach((el) => {
        gsap.from(el.children, {
          opacity: prefersReduced ? 1 : 0,
          y: prefersReduced ? 0 : 26,
          duration: 0.6,
          stagger: 0.05,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      gsap.utils.toArray(".asp-zoom-in").forEach((el) => {
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
    <div className="salesforce-admin-support">
      <Seo {...SEO} />
      <HeroSection heroTextRef={heroTextRef} heroRef={heroRef} />
      <TrustedBySection />
      <ChallengesSection />
      <ServicesSection />
      <AdminServicesSection />
      <DevServicesSection />
      <SupportPlansSection />
      <IndustriesSection />
      <PlatformsSection />
      <EngagementModelsSection />
      <WhyMirketaSection />
      <SuccessMetricsSection />
      <CaseStudiesSection />
      <FaqSection />
      <FinalCtaSection />
      <ConsultationSection
        eyebrow="Get Started"
        heading="Talk to a Salesforce Managed Services Expert"
        description="Tell us about your current org, your support backlog, and where your team needs the most help — a Salesforce Managed Services expert will follow up within one business day."
        formTitle="Talk to a Salesforce Managed Services Expert"
      />
      <StickyCta visible={showStickyCta} />
    </div>
  );
}

// ============================================================
// STICKY CTA — desktop only, appears once the hero scrolls out of view
// ============================================================

function StickyCta({ visible }) {
  return (
    <div className={`asp-sticky-cta ${visible ? "is-visible" : ""}`} aria-hidden={!visible}>
      <a href="#contact" className="btn btn-primary asp-btn" tabIndex={visible ? 0 : -1}>
        Hire Salesforce Experts <span aria-hidden="true">→</span>
      </a>
    </div>
  );
}

// ============================================================
// HERO
// ============================================================

function HeroSection({ heroTextRef, heroRef }) {
  return (
    <section ref={heroRef} className="asp-hero" style={{ backgroundImage: `url("${Images.heroSalesforceAdminSupport}")` }} aria-label="Salesforce Developer Services & Admin Support by Mirketa">
      <div className="asp-hero__scrim" />
      <div className="container">
        <Breadcrumb items={BREADCRUMB} className="asp-breadcrumb" />
        <div className="asp-hero__inner">
          <div ref={heroTextRef} className="asp-hero__text">
            <span className="asp-badge">
              <span className="asp-badge__spark" aria-hidden="true">✦</span> {HERO.badge}
            </span>
            <h1>{HERO.title}</h1>
            <p className="asp-hero__description">{HERO.description}</p>
            <div className="asp-hero__ctas">
              <a href={HERO.primaryCta.href} className="btn btn-primary asp-btn">
                {HERO.primaryCta.label} <span aria-hidden="true">→</span>
              </a>
              <a href={HERO.secondaryCta.href} className="btn btn-secondary asp-btn">
                {HERO.secondaryCta.label}
              </a>
            </div>
          </div>

          <HeroVisual
            dashboardTitle={HERO_DASHBOARD.title}
            stats={HERO_DASHBOARD.stats}
            rows={HERO_DASHBOARD.rows}
            floatingCards={HERO_DASHBOARD.floatingCards}
            className="asp-hero__visual"
          />
        </div>
      </div>
    </section>
  );
}

// ============================================================
// TRUSTED BY
// ============================================================

function TrustedBySection() {
  const badges = [
    { icon: Images.clientSalesforce, label: "Salesforce Partner" },
    { icon: Images.clientSoc2, label: "SOC 2 Certified" },
    { icon: Images.clientHipaa, label: "HIPAA Ready" },
    { icon: Images.clientEnterprise, label: "Enterprise Ready" },
    { icon: Images.clientExperience, label: "15+ Years Experience" },
  ];
  const loop = [...badges, ...badges];

  return (
    <section className="asp-trusted" aria-label="Trusted by enterprises">
      <div className="container asp-trusted__inner">
        <p className="asp-trusted__label">Trusted By</p>
        <div className="asp-trusted__track" role="list">
          <div className="asp-trusted__marquee">
            {loop.map((b, i) => (
              <div className="asp-trusted__badge" role="listitem" key={`${b.label}-${i}`}>
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
// CHALLENGES WE SOLVE
// ============================================================

function ChallengesSection() {
  return (
    <section className="section asp-challenges" aria-labelledby="asp-challenges-heading">
      <div className="container">
        <div className="asp-challenges__head asp-reveal">
          <div className="section-heading">
            <p className="asp-eyebrow">{CHALLENGES.eyebrow}</p>
            <h2 id="asp-challenges-heading">{CHALLENGES.heading}</h2>
            <p>{CHALLENGES.intro}</p>
          </div>
          <img src={CHALLENGES.illo} alt="" aria-hidden="true" className="asp-challenges__illo" loading="lazy" />
        </div>
        <div className="asp-challenges__grid asp-reveal-stagger">
          {CHALLENGES.items.map((c) => (
            <div className="asp-challenge-card" key={c.title}>
              <span className="asp-challenge-card__icon">{c.icon}</span>
              <h3>{c.title}</h3>
              <p>{c.description}</p>
            </div>
          ))}
        </div>
        <div className="asp-section-cta asp-reveal">
          <a href="#contact" className="btn btn-primary asp-btn">
            Hire Salesforce Experts <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// OUR SERVICES
// ============================================================

function ServicesSection() {
  return (
    <section className="section asp-services" id="services" aria-labelledby="asp-services-heading">
      <div className="container">
        <div className="asp-services__head asp-reveal">
          <div className="section-heading">
            <p className="asp-eyebrow">{SERVICES.eyebrow}</p>
            <h2 id="asp-services-heading">{SERVICES.heading}</h2>
            <p>{SERVICES.intro}</p>
          </div>
          <img src={SERVICES.illo} alt="" aria-hidden="true" className="asp-services__illo" loading="lazy" />
        </div>
        <div className="asp-services__grid asp-reveal-stagger">
          {SERVICES.items.map((s) => (
            <div className="asp-service-card" key={s.title}>
              <span className="asp-service-card__icon">{s.icon}</span>
              <h3>{s.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// SALESFORCE ADMINISTRATION SERVICES
// ============================================================

function AdminServicesSection() {
  return (
    <section className="section asp-admin" aria-labelledby="asp-admin-heading">
      <div className="container">
        <div className="asp-admin__head asp-reveal">
          <img src={ADMIN_SERVICES.illo} alt="" aria-hidden="true" className="asp-admin__illo" loading="lazy" />
          <div className="section-heading">
            <p className="asp-eyebrow">{ADMIN_SERVICES.eyebrow}</p>
            <h2 id="asp-admin-heading">{ADMIN_SERVICES.heading}</h2>
            <p>{ADMIN_SERVICES.intro}</p>
          </div>
        </div>
        <div className="asp-admin__grid asp-reveal-stagger">
          {ADMIN_SERVICES.items.map((c) => (
            <div className="asp-admin-card" key={c.title}>
              <span className="asp-admin-card__icon">{c.icon}</span>
              <h3>{c.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// SALESFORCE DEVELOPMENT SERVICES
// ============================================================

function DevServicesSection() {
  return (
    <section className="section asp-dev" aria-labelledby="asp-dev-heading">
      <div className="container">
        <div className="section-heading asp-reveal">
          <p className="asp-eyebrow">{DEV_SERVICES.eyebrow}</p>
          <h2 id="asp-dev-heading">{DEV_SERVICES.heading}</h2>
          <p>{DEV_SERVICES.intro}</p>
        </div>
        <div className="asp-dev__grid asp-reveal-stagger">
          {DEV_SERVICES.items.map((c) => (
            <div className="asp-dev-card" key={c.title}>
              <span className="asp-dev-card__icon">{c.icon}</span>
              <h3>{c.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// MANAGED SUPPORT PLANS — pricing-tier comparison
// ============================================================

function SupportPlansSection() {
  return (
    <section className="section asp-plans" aria-labelledby="asp-plans-heading">
      <div className="container">
        <div className="section-heading asp-reveal">
          <p className="asp-eyebrow">{SUPPORT_PLANS.eyebrow}</p>
          <h2 id="asp-plans-heading">{SUPPORT_PLANS.heading}</h2>
          <p>{SUPPORT_PLANS.intro}</p>
        </div>
        <div className="asp-plans__grid asp-reveal-stagger">
          {SUPPORT_PLANS.plans.map((plan) => (
            <div className={`asp-plan-card ${plan.featured ? "asp-plan-card--featured" : ""}`} key={plan.name}>
              {plan.featured && <span className="asp-plan-card__badge">Most Popular</span>}
              <h3>{plan.name}</h3>
              <p className="asp-plan-card__tagline">{plan.tagline}</p>
              <ul className="asp-plan-card__features">
                {PLAN_FEATURES.map((feature, i) => (
                  <li key={feature} className={plan.included[i] ? "is-included" : "is-excluded"}>
                    <span aria-hidden="true">{plan.included[i] ? Ico.check : Ico.cross}</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <a href="#contact" className={`btn asp-btn ${plan.featured ? "btn-primary" : "btn-secondary"}`}>
                Talk to an Expert
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// INDUSTRIES WE SUPPORT
// ============================================================

function IndustriesSection() {
  return (
    <section className="section asp-industries" aria-labelledby="asp-industries-heading">
      <div className="container">
        <div className="section-heading asp-reveal">
          <p className="asp-eyebrow">{INDUSTRIES.eyebrow}</p>
          <h2 id="asp-industries-heading">{INDUSTRIES.heading}</h2>
          <p>{INDUSTRIES.intro}</p>
        </div>
        <div className="asp-industries__grid asp-reveal-stagger">
          {INDUSTRIES.items.map((i) => (
            <div className="asp-industry-card" key={i.title}>
              <span className="asp-industry-card__icon">{i.icon}</span>
              <h3>{i.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// SALESFORCE PLATFORMS SUPPORTED
// ============================================================

function PlatformsSection() {
  return (
    <section className="section asp-platforms" aria-labelledby="asp-platforms-heading">
      <div className="container">
        <div className="section-heading asp-reveal">
          <p className="asp-eyebrow">{PLATFORMS.eyebrow}</p>
          <h2 id="asp-platforms-heading">{PLATFORMS.heading}</h2>
          <p>{PLATFORMS.intro}</p>
        </div>
        <ul className="asp-platforms__wall asp-reveal-stagger">
          {PLATFORMS.items.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// ============================================================
// ENGAGEMENT MODELS
// ============================================================

function EngagementModelsSection() {
  return (
    <section className="section asp-engagement" aria-labelledby="asp-engagement-heading">
      <div className="container">
        <div className="asp-engagement__head asp-reveal">
          <div className="section-heading">
            <p className="asp-eyebrow">{ENGAGEMENT_MODELS.eyebrow}</p>
            <h2 id="asp-engagement-heading">{ENGAGEMENT_MODELS.heading}</h2>
            <p>{ENGAGEMENT_MODELS.intro}</p>
          </div>
          <img src={ENGAGEMENT_MODELS.illo} alt="" aria-hidden="true" className="asp-engagement__illo" loading="lazy" />
        </div>
        <div className="asp-engagement__grid asp-reveal-stagger">
          {ENGAGEMENT_MODELS.items.map((e) => (
            <div className="asp-engagement-card" key={e.title}>
              <span className="asp-engagement-card__icon">{e.icon}</span>
              <h3>{e.title}</h3>
              <p>{e.description}</p>
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
    <section className="section asp-why" aria-labelledby="asp-why-heading">
      <div className="container">
        <div className="section-heading asp-reveal">
          <p className="asp-eyebrow">{WHY_MIRKETA.eyebrow}</p>
          <h2 id="asp-why-heading">{WHY_MIRKETA.heading}</h2>
          <p>{WHY_MIRKETA.intro}</p>
        </div>
        <div className="asp-why__grid asp-reveal-stagger">
          {WHY_MIRKETA.items.map((w) => (
            <div className="asp-why-card" key={w.title}>
              <span className="asp-why-card__icon">{w.icon}</span>
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
// SUCCESS METRICS
// ============================================================

function SuccessMetricsSection() {
  return (
    <section className="asp-metrics" aria-label="Mirketa managed services success metrics">
      <div className="container">
        <div className="asp-metrics__grid asp-reveal-stagger">
          {SUCCESS_METRICS.map((m) => (
            <AnimatedCounter key={m.label} value={m.value} label={m.label} />
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
    <section className="section asp-cases" aria-labelledby="asp-cases-heading">
      <div className="container">
        <div className="asp-cases__head asp-reveal">
          <img src={CASE_STUDIES.illo} alt="" aria-hidden="true" className="asp-cases__illo" loading="lazy" />
          <div className="section-heading">
            <p className="asp-eyebrow">{CASE_STUDIES.eyebrow}</p>
            <h2 id="asp-cases-heading">{CASE_STUDIES.heading}</h2>
            <p>{CASE_STUDIES.intro}</p>
          </div>
        </div>
        <div className="asp-cases__grid asp-reveal-stagger">
          {CASE_STUDIES.cases.map((c) => (
            <div className="asp-case-card" key={c.title}>
              <span className="asp-case-card__tag">{c.industry}</span>
              <h3>{c.title}</h3>
              <dl className="asp-case-card__fields">
                <div><dt>Customer Challenge</dt><dd>{c.challenge}</dd></div>
                <div><dt>Services Delivered</dt><dd>{c.services}</dd></div>
                <div><dt>Measurable Improvements</dt><dd>{c.improvements}</dd></div>
                <div><dt>Business Outcome</dt><dd>{c.outcome}</dd></div>
              </dl>
              <div className="asp-case-card__metrics">
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
    <section className="section asp-faq" aria-labelledby="asp-faq-heading">
      <div className="container">
        <div className="section-heading asp-reveal">
          <p className="asp-eyebrow">FAQ</p>
          <h2 id="asp-faq-heading">Frequently Asked Questions About Salesforce Admin & Developer Support</h2>
        </div>
        <div className="asp-faq__search-wrap asp-reveal">
          <label htmlFor="asp-faq-search" className="visually-hidden">
            Search frequently asked questions
          </label>
          <input
            id="asp-faq-search"
            type="search"
            className="asp-faq__search"
            placeholder="Ask a question — e.g. &quot;pricing&quot;, &quot;SLA&quot;, &quot;security&quot;..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpenIndex(-1);
            }}
          />
        </div>
        <div className="asp-faq__list asp-reveal">
          {filtered.length === 0 ? (
            <p className="asp-faq__empty">No questions match &ldquo;{query}&rdquo;. Try a different search term.</p>
          ) : (
            filtered.map((item, i) => {
              const open = openIndex === i;
              const panelId = `asp-faq-panel-${i}`;
              return (
                <div className={`asp-faq-item ${open ? "is-open" : ""}`} key={item.q}>
                  <button type="button" className="asp-faq-item__question" aria-expanded={open} aria-controls={panelId} onClick={() => setOpenIndex(open ? -1 : i)}>
                    <span>{item.q}</span>
                    <span className="asp-faq-item__icon" aria-hidden="true">{open ? "−" : "+"}</span>
                  </button>
                  <div id={panelId} className="asp-faq-item__answer" role="region" hidden={!open}>
                    <p>{item.a}</p>
                  </div>
                </div>
              );
            })
          )}
        </div>
        <p className="asp-faq__links">
          Related reading: <Link to="/salesforce-consulting-development-services">Salesforce Consulting & Development Services</Link>,{" "}
          <Link to="/salesforce-developer-services">Salesforce Developer Services</Link>,{" "}
          <Link to="/salesforce-ai-services">Salesforce AI Services</Link>, <Link to="/salesforce">Salesforce Clouds</Link>,{" "}
          <a href="#services">Salesforce Integration Services</a>, <Link to="/agentforce">Agentforce</Link>, <Link to="/data-cloud">Data Cloud</Link>,{" "}
          <Link to="/ai-consulting">AI Consulting</Link>, <Link to="/salesforce/health-cloud">Health Cloud</Link>,{" "}
          <Link to="/salesforce-financial-services">Financial Services Cloud</Link>.
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
    <section className="asp-final-cta asp-reveal" aria-labelledby="asp-final-cta-heading">
      <div className="container asp-final-cta__inner">
        <h2 id="asp-final-cta-heading">{FINAL_CTA.heading}</h2>
        <p>{FINAL_CTA.description}</p>
        <div className="asp-final-cta__ctas">
          <a href={FINAL_CTA.primaryCta.href} className="btn btn-primary asp-btn">
            {FINAL_CTA.primaryCta.label} <span aria-hidden="true">→</span>
          </a>
          <a href={FINAL_CTA.secondaryCta.href} className="btn btn-secondary asp-btn">
            {FINAL_CTA.secondaryCta.label}
          </a>
        </div>
        <Link to="/salesforce-consulting-development-services" className="asp-final-cta__all-services">
          Explore All Salesforce Services →
        </Link>
      </div>
    </section>
  );
}
