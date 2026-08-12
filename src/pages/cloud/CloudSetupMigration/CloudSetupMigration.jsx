import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Images } from "../../../assets/images/index.js";
import { CLOUD_PAGES, ORACLE_PAGES, SERVICENOW_PAGES, NETSUITE_PAGES, AI_PAGES } from "../../../config/pageSlugs.js";
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
import AnalyticsPanel from "../../../components/illustrations/AnalyticsPanel/AnalyticsPanel.jsx";
import "./CloudSetupMigration.css";

gsap.registerPlugin(ScrollTrigger);

// ============================================================
// ICONS
// ============================================================

const Ico = {
  check: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12.5l5 5L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  cloud: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 18h10a4 4 0 000-8 5.5 5.5 0 00-10.7-1.7A4.5 4.5 0 007 18z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  route: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="6" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.4" /><circle cx="18" cy="18" r="2.5" stroke="currentColor" strokeWidth="1.4" /><path d="M6 8.5V13a4 4 0 004 4h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
  ),
  db: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><ellipse cx="12" cy="6" rx="7" ry="3" stroke="currentColor" strokeWidth="1.4" /><path d="M5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6" stroke="currentColor" strokeWidth="1.4" /><path d="M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3" stroke="currentColor" strokeWidth="1.4" /></svg>
  ),
  bar: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 19V13M10 19V8M16 19v-5M20 19V5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
  ),
  swap: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 8h13M13 4l4 4-4 4M20 16H7M11 12l-4 4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
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
  server: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="4" y="4" width="16" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4" /><rect x="4" y="14" width="16" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4" /><circle cx="8" cy="7" r="1" fill="currentColor" /><circle cx="8" cy="17" r="1" fill="currentColor" /></svg>
  ),
  layers: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3l8 4.5-8 4.5-8-4.5L12 3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M4 12l8 4.5 8-4.5M4 16.5l8 4.5 8-4.5" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  box: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 7l9-4 9 4-9 4-9-4z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M3 7v10l9 4 9-4V7M12 11v10" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /></svg>
  ),
};

// ============================================================
// DATA
// ============================================================

const BREADCRUMB_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Platforms & Technology", href: "/" },
  { label: CLOUD_PAGES.SETUP_MIGRATION.label },
];

const HERO = {
  badge: "AWS · Azure · GCP Migration Partner",
  title: "Cloud Setup and Migration Services for a Landing Zone Built to Scale",
  description:
    "Mirketa's cloud setup and migration services move workloads off legacy infrastructure onto AWS, Azure, or Google Cloud with a governed landing zone in place before the first server moves — wave-based migration planning, rightsized compute and storage, and a rehearsed cutover so go-live isn't the first time your team sees the new environment under real load.",
  primaryCta: { label: "Get a Cloud Migration Assessment", href: "#contact" },
  secondaryCta: { label: "Talk to a Cloud Architect", href: "#contact" },
  metrics: ["Multi-Cloud Certified Architects", "Governed Landing Zone Design", "Rightsized From Day One", "Rehearsed, Low-Downtime Cutover"],
};

const HERO_DASHBOARD = {
  title: "Migration Control Center",
  stats: [
    { label: "COST REDUCTION", value: "34%", caption: "Average after rightsizing" },
    { label: "CLEAN MIGRATION RATE", value: "99.6%", caption: "Across all migration waves" },
    { label: "AVG CUTOVER DOWNTIME", value: "45 min", caption: "Per rehearsed wave" },
  ],
  rows: [
    { title: "Wave 3 — order management VMs", meta: "AWS landing zone · Rehearsed cutover", tone: "good", status: "Migrated" },
    { title: "Database sync — customer records", meta: "Continuous replication active", tone: "good", status: "In Sync" },
    { title: "Wave 4 — legacy reporting services", meta: "Dependency review in progress", tone: "neutral", status: "Planning" },
  ],
  floatingCards: [
    { icon: Ico.shield, title: "Governed Landing Zone", subtitle: "IAM & guardrails before go-live" },
    { icon: Ico.swap, title: "Zero Unplanned Downtime", subtitle: "Across 200+ VM migrations" },
  ],
};

const CHALLENGES = {
  eyebrow: "Business Challenges",
  heading: "Why Cloud Migrations Stall or Blow Past Budget",
  intro:
    "Most cloud setup and migration engagements don't start from a blank slate — they start after a first attempt has already run into one of these four problems.",
  items: [
    { title: "No Migration Roadmap", description: "Workloads and their dependencies were never mapped, so nobody can say safely what can move first without breaking something downstream." },
    { title: "Rightsizing Guesswork", description: "Instances were provisioned to match on-prem specs instead of actual utilization, quietly inflating the cloud bill from month one." },
    { title: "Untested Cutover Plans", description: "The migration plan looks fine on paper, but nobody rehearsed the actual cutover, so go-live becomes the first real test." },
    { title: "A Landing Zone Without Guardrails", description: "Accounts, IAM roles, and networking were set up ad hoc, so resource sprawl and security gaps show up within the first quarter." },
  ],
};

const SOLUTION = {
  eyebrow: "Cloud Solution Overview",
  heading: "A Landing Zone and Migration Plan Built Before Anything Moves",
  paragraphs: [
    "Mirketa's cloud setup and migration services start with a dependency-aware assessment of your current environment — which workloads talk to which databases, which services have hard latency requirements, and which can move on day one without coordination. That assessment becomes the migration wave plan, not a generic lift-and-shift order.",
    "Before any workload moves, we stand up a governed landing zone: account structure, IAM baseline, network topology, and policy-as-code guardrails that keep the environment auditable from day one instead of retrofitted after a security review flags it. Rightsizing recommendations come from real utilization data, not a one-to-one match of on-prem specs.",
    "Every migration wave includes a rehearsed cutover in a non-production run before the real one, so the team executing go-live has already seen the runbook work end to end. That's the difference between a migration that finishes on schedule and one that turns into a weekend-long incident.",
  ],
};

const CORE_SERVICES = {
  eyebrow: "Core Services",
  heading: "Six Ways Mirketa Delivers Cloud Setup and Migration",
  intro: "Every engagement starts with one of these six service lines and expands as your migration roadmap takes shape.",
  items: [
    { icon: Ico.compass, title: "Cloud Readiness Assessment", description: "Dependency mapping, workload discovery, and a scored readiness review before any migration date is set." },
    { icon: Ico.layers, title: "Landing Zone Design & Governance", description: "Account structure, IAM baseline, network topology, and policy-as-code guardrails deployed before workloads arrive." },
    { icon: Ico.swap, title: "Workload Migration", description: "Lift-and-shift and replatforming execution across AWS, Azure, and Google Cloud, sequenced into low-risk waves." },
    { icon: Ico.db, title: "Data Migration & Synchronization", description: "Database and storage migration with continuous sync during cutover so replication lag never becomes data loss." },
    { icon: Ico.bar, title: "Cost Modeling & Rightsizing", description: "Compute and storage sizing based on real utilization data, plus a reserved and spot instance mix built for your workload pattern." },
    { icon: Ico.route, title: "Cutover Planning & Hypercare", description: "A rehearsed cutover runbook and an elevated support window through your first weeks of production traffic." },
  ],
};

const FEATURES = {
  eyebrow: "Key Features",
  heading: "What a Properly Executed Cloud Migration Actually Includes",
  intro: "These are the capability areas every Mirketa cloud setup and migration engagement is built around.",
  items: [
    { title: "Multi-Cloud Landing Zone", description: "Governed account and network structure that works consistently whether you land on AWS, Azure, or Google Cloud." },
    { title: "Automated Migration Tooling", description: "Native and third-party migration tooling that replicates workloads with minimal manual intervention." },
    { title: "Network & Connectivity Design", description: "VPC/VNet topology, peering, and hybrid connectivity designed for the latency your applications actually need." },
    { title: "IAM & Security Baseline", description: "Least-privilege access and policy-as-code guardrails deployed before the first workload lands, not after an audit." },
    { title: "Rightsized Compute & Storage", description: "Instance and storage tiers matched to observed utilization, not a guess based on legacy hardware specs." },
    { title: "Migration Wave Orchestration", description: "Sequenced migration waves with dependency awareness, so nothing moves before what it depends on is ready." },
  ],
};

const BENEFITS = {
  eyebrow: "Benefits",
  heading: "What Changes Once Your Workloads Land Somewhere Governed",
  intro: "These are the outcomes Mirketa's cloud setup and migration clients consistently report.",
  stats: [
    { value: "34%", label: "Average Cost Reduction" },
    { value: "99.6%", label: "Clean Migration Success Rate" },
    { value: "45", label: "Avg. Cutover Downtime (Minutes)" },
    { value: "12", label: "Average Weeks to Full Migration" },
  ],
  items: [
    { title: "A Bill That Matches Actual Usage", description: "Rightsizing based on real utilization data replaces guesswork, cutting cloud spend from month one." },
    { title: "Guardrails From Day One", description: "IAM and policy-as-code baselines mean the environment is audit-ready before it's even fully populated." },
    { title: "A Cutover Without Surprises", description: "Rehearsed runbooks mean go-live plays out the way the team already saw it work in a dry run." },
    { title: "A Foundation That Scales", description: "The landing zone is designed to absorb new workloads and accounts without a redesign six months later." },
  ],
};

const PROCESS = {
  eyebrow: "Migration / Implementation Process",
  heading: "A Six-Stage Path From Assessment to Hypercare",
  intro: "A structured methodology refined across cloud setup and migration engagements in retail, SaaS, and financial services.",
  steps: [
    { label: "Discovery & Assessment" },
    { label: "Landing Zone Design" },
    { label: "Wave Planning" },
    { label: "Migration Execution" },
    { label: "Cutover & Validation" },
    { label: "Hypercare & Optimization" },
  ],
  detail: [
    { name: "Discovery & Assessment", description: "Dependency mapping and a scored readiness review across your current infrastructure and applications." },
    { name: "Landing Zone Design", description: "Account structure, IAM baseline, and network topology documented and deployed before migration begins." },
    { name: "Wave Planning", description: "Workloads sequenced into low-risk migration waves based on dependencies and business criticality." },
    { name: "Migration Execution", description: "Automated replication and cutover rehearsal for each wave in a non-production run before the real one." },
    { name: "Cutover & Validation", description: "Production cutover executed against the rehearsed runbook, with validation checkpoints at every stage." },
    { name: "Hypercare & Optimization", description: "Elevated support through your first weeks of production traffic, plus a rightsizing review against real usage." },
  ],
};

const TECHNOLOGIES = {
  eyebrow: "Technologies Supported",
  heading: "Cloud Platforms and Tooling We Migrate You Onto",
  intro: "Our architects hold active certifications across every major hyperscaler and the infrastructure tooling that supports it.",
  items: [
    { icon: Ico.cloud, title: "Amazon Web Services" },
    { icon: Ico.cloud, title: "Microsoft Azure" },
    { icon: Ico.cloud, title: "Google Cloud Platform" },
    { icon: Ico.layers, title: "Terraform" },
    { icon: Ico.box, title: "Kubernetes" },
    { icon: Ico.server, title: "VMware" },
  ],
};

const WHY_MIRKETA = {
  eyebrow: "Why Mirketa",
  heading: "A Migration Partner That Designs Governance Before Moving Workloads",
  intro: "Plenty of partners can lift and shift a VM. Fewer design the landing zone's guardrails before the first workload arrives.",
  items: [
    { icon: Ico.award, title: "Certified Multi-Cloud Architects", description: "Our architects hold active certifications across AWS, Azure, and Google Cloud, not just one hyperscaler." },
    { icon: Ico.bar, title: "Data-Driven Rightsizing", description: "Compute and storage recommendations come from observed utilization, not a one-to-one hardware match." },
    { icon: Ico.shield, title: "Governance-First Landing Zones", description: "IAM and policy-as-code guardrails are deployed before workloads arrive, not retrofitted after an audit." },
    { icon: Ico.clock, title: "Fixed-Scope Migration Waves", description: "A documented wave plan and timeline agreed before kickoff, with change requests handled transparently." },
    { icon: Ico.route, title: "Zero-Surprise Cutover Planning", description: "Every cutover is rehearsed in a non-production run before the real one, so go-live isn't the first test." },
    { icon: Ico.heart, title: "Support Beyond Go-Live", description: "Hypercare and ongoing cloud infrastructure management are available the moment your migration completes." },
  ],
};

const CASE_STUDIES = {
  eyebrow: "Case Study / Customer Success",
  heading: "Real Cloud Setup and Migration Outcomes",
  intro: "Anonymized results from recent cloud migration engagements across industries.",
  cases: [
    {
      title: "Retailer Migrates 200+ VMs to AWS With Zero Unplanned Downtime",
      industry: "Retail",
      challenge: "A retailer's data center lease was expiring with no documented plan for migrating over 200 production VMs supporting store operations.",
      solution: "We ran a dependency-aware assessment, designed a governed AWS landing zone, and executed the migration across four rehearsed waves.",
      outcome: "All 200+ VMs migrated on schedule with zero unplanned downtime during business hours.",
    },
    {
      title: "SaaS Company Cuts Cloud Spend 38% After Replatforming to Containers",
      industry: "Software & SaaS",
      challenge: "A SaaS company's cloud bill had grown faster than its user base because instances were sized for peak load year-round.",
      solution: "We replatformed core services onto Kubernetes with autoscaling and rightsized the remaining VM-based workloads.",
      outcome: "Monthly cloud spend dropped 38% within two billing cycles, with no degradation in peak-load performance.",
    },
  ],
};

const FAQS = [
  { q: "What does cloud setup and migration actually include?", a: "It covers workload assessment and dependency mapping, landing zone design with governance guardrails, wave-based migration execution, data migration and synchronization, rightsizing, and a rehearsed cutover with hypercare support afterward." },
  { q: "How long does a typical cloud migration take?", a: "A focused migration of a single application or environment typically takes 8 to 14 weeks. Larger, multi-wave migrations across an entire data center can take 4 to 9 months depending on workload count and complexity." },
  { q: "Which cloud providers do you support?", a: "We design and execute migrations onto AWS, Microsoft Azure, and Google Cloud Platform, and can support multi-cloud landing zones when a workload needs to span more than one provider." },
  { q: "How do you minimize downtime during cutover?", a: "Every cutover is rehearsed in a non-production run before the real one, using the same runbook the team will execute on go-live day, so the actual cutover window is short and predictable." },
  { q: "Can you migrate our databases without data loss?", a: "Yes. We use continuous replication and synchronization tooling during the migration window so the source and target databases stay in sync until the final cutover moment, eliminating data loss risk." },
  { q: "Will our cloud bill actually be lower after migration?", a: "Rightsizing is based on your actual observed utilization data, not your legacy hardware specs, which is why our clients see meaningful cost reduction rather than a like-for-like cost transfer." },
  { q: "Do you provide support after the migration is complete?", a: "Yes. Every migration includes a hypercare period through your first weeks of production traffic, and can transition into ongoing cloud infrastructure management or site reliability engineering support." },
  { q: "What is a landing zone, and why does it matter?", a: "A landing zone is the governed account structure, network topology, and security baseline your workloads move into. Building it before migration prevents the resource sprawl and security gaps that show up when accounts are set up ad hoc." },
];

const RELATED_SERVICES = {
  eyebrow: "Related Services",
  heading: "Explore More Ways Mirketa Supports Your Cloud Environment",
  intro: "Cloud setup and migration is the first step in a longer cloud operations story. Here's where to look next.",
  items: [
    { slug: CLOUD_PAGES.SITE_RELIABILITY_ENGINEERING.slug, label: CLOUD_PAGES.SITE_RELIABILITY_ENGINEERING.label, description: "Keep the environment you just migrated to reliable with observability, incident response, and SLO management." },
    { slug: CLOUD_PAGES.INFRA_MANAGEMENT.slug, label: CLOUD_PAGES.INFRA_MANAGEMENT.label, description: "Ongoing infrastructure-as-code, Kubernetes operations, and cost optimization for your live cloud environment." },
    { slug: ORACLE_PAGES.MANAGED_SERVICES.slug, label: ORACLE_PAGES.MANAGED_SERVICES.label, description: "Running Oracle Fusion workloads in the cloud? Pair migration with ongoing Oracle managed services." },
    { slug: SERVICENOW_PAGES.TECHNOLOGY_WORKFLOWS.slug, label: SERVICENOW_PAGES.TECHNOLOGY_WORKFLOWS.label, description: "Connect cloud incident data into ServiceNow ITSM for unified IT operations visibility." },
    { slug: AI_PAGES.AI_DATA_FOUNDATIONS.slug, label: AI_PAGES.AI_DATA_FOUNDATIONS.label, description: "Build the governed data foundation that makes analytics and AI reliable once workloads land in the cloud." },
  ],
};

const CONSULTATION = {
  eyebrow: "Get Started",
  heading: "Get a Cloud Migration Assessment",
  description: "Tell us about your current environment, timeline, and target cloud provider — a certified cloud architect will follow up within one business day.",
  formTitle: "Get a Free Cloud Migration Assessment",
};

const SEO = {
  title: "Cloud Setup and Migration Services | Mirketa",
  description:
    "Mirketa's cloud setup and migration services design a governed AWS, Azure, or GCP landing zone and execute rightsized, low-downtime workload migrations.",
  canonical: `https://mirketa.us${CLOUD_PAGES.SETUP_MIGRATION.slug}/`,
  keywords: [
    "Cloud Setup and Migration Services",
    "Cloud Migration Services",
    "AWS Migration",
    "Azure Migration",
    "Google Cloud Migration",
    "Landing Zone Design",
    "Cloud Rightsizing",
    "Multi-Cloud Migration",
  ],
  schema: [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "Cloud Setup and Migration Services",
      provider: { "@type": "Organization", name: "Mirketa Inc.", url: "https://mirketa.us" },
      name: "Cloud Setup and Migration Services",
      description: "Landing zone design, workload migration, data migration, and rightsizing across AWS, Azure, and Google Cloud.",
      areaServed: "Global",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://mirketa.us/" },
        { "@type": "ListItem", position: 2, name: CLOUD_PAGES.SETUP_MIGRATION.label, item: `https://mirketa.us${CLOUD_PAGES.SETUP_MIGRATION.slug}/` },
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

export default function CloudSetupMigration() {
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

      gsap.utils.toArray(".csm-reveal").forEach((el) => {
        gsap.from(el, { opacity: prefersReduced ? 1 : 0, y: prefersReduced ? 0 : 32, duration: 0.7, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 88%" } });
      });
      gsap.utils.toArray(".csm-reveal-left").forEach((el) => {
        gsap.from(el, { opacity: prefersReduced ? 1 : 0, x: prefersReduced ? 0 : -30, duration: 0.7, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 88%" } });
      });
      gsap.utils.toArray(".csm-reveal-right").forEach((el) => {
        gsap.from(el, { opacity: prefersReduced ? 1 : 0, x: prefersReduced ? 0 : 30, duration: 0.7, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 88%" } });
      });
      gsap.utils.toArray(".csm-reveal-stagger").forEach((el) => {
        gsap.from(el.children, { opacity: prefersReduced ? 1 : 0, y: prefersReduced ? 0 : 26, duration: 0.6, stagger: 0.06, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 85%" } });
      });
      gsap.utils.toArray(".csm-zoom-in").forEach((el) => {
        gsap.from(el, { opacity: prefersReduced ? 1 : 0, scale: prefersReduced ? 1 : 0.94, duration: 0.6, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 88%" } });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="cloud-setup-migration">
      <Seo {...SEO} />
      <HeroSection heroTextRef={heroTextRef} heroRef={heroRef} />
      <TrustedByMarquee label="Trusted by Engineering & IT Leaders Running Multi-Cloud" />
      <ChallengesSection />
      <SolutionSection />
      <CoreServicesSection />
      <FeaturesSection />
      <BenefitsSection />
      <ProcessSection />
      <TechnologiesSection />
      <WhyMirketaSection />
      <CaseStudySection />
      <FaqSection />
      <RelatedServices {...RELATED_SERVICES} className="csm-related csm-reveal" />
      <ConsultationSection {...CONSULTATION} />
      <StickyCta heroRef={heroRef} label="Get a Cloud Migration Assessment" />
    </div>
  );
}

// ============================================================
// HERO
// ============================================================

function HeroSection({ heroTextRef, heroRef }) {
  return (
    <section ref={heroRef} className="csm-hero" style={{ backgroundImage: `url("${Images.heroCloudSetupMigration}")` }} aria-label="Cloud Setup and Migration Services by Mirketa">
      <div className="csm-hero__scrim" />
      <div className="container">
        <Breadcrumb items={BREADCRUMB_ITEMS} className="csm-breadcrumb" />
        <div className="csm-hero__inner">
          <div ref={heroTextRef} className="csm-hero__text">
            <span className="csm-badge">
              <span className="csm-badge__spark" aria-hidden="true">✦</span> {HERO.badge}
            </span>
            <h1>{HERO.title}</h1>
            <p className="csm-hero__description">{HERO.description}</p>
            <div className="csm-hero__ctas">
              <a href={HERO.primaryCta.href} className="btn btn-primary csm-btn">
                {HERO.primaryCta.label} <span aria-hidden="true">→</span>
              </a>
              <a href={HERO.secondaryCta.href} className="btn btn-secondary csm-btn">
                {HERO.secondaryCta.label}
              </a>
            </div>
            <ul className="csm-hero__metrics">
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
            className="csm-hero__visual csm-zoom-in"
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
    <section className="section csm-challenges" aria-labelledby="csm-challenges-heading">
      <div className="container">
        <div className="section-heading csm-reveal">
          <p className="csm-eyebrow">{CHALLENGES.eyebrow}</p>
          <h2 id="csm-challenges-heading">{CHALLENGES.heading}</h2>
          <p>{CHALLENGES.intro}</p>
        </div>
        <div className="csm-challenges__grid csm-reveal-stagger">
          {CHALLENGES.items.map((c) => (
            <div className="csm-challenge-card" key={c.title}>
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
// CLOUD SOLUTION OVERVIEW
// ============================================================

function SolutionSection() {
  return (
    <section className="section csm-solution" aria-labelledby="csm-solution-heading">
      <div className="container csm-solution__grid">
        <div className="csm-reveal-left">
          <p className="csm-eyebrow">{SOLUTION.eyebrow}</p>
          <h2 id="csm-solution-heading">{SOLUTION.heading}</h2>
          {SOLUTION.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <div className="csm-reveal-right">
          <AnalyticsPanel
            title="Migration Wave Progress"
            donutPercent={68}
            donutLabel="Workloads migrated across all active waves"
            metrics={[
              { value: "68%", label: "Workloads migrated" },
              { value: "0", label: "Rollback events" },
            ]}
          />
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
    <section className="section csm-core" aria-labelledby="csm-core-heading">
      <div className="container">
        <div className="section-heading csm-reveal">
          <p className="csm-eyebrow">{CORE_SERVICES.eyebrow}</p>
          <h2 id="csm-core-heading">{CORE_SERVICES.heading}</h2>
          <p>{CORE_SERVICES.intro}</p>
        </div>
        <div className="csm-core__grid csm-reveal-stagger">
          {CORE_SERVICES.items.map((c) => (
            <div className="csm-core-card" key={c.title}>
              <span className="csm-core-card__icon">{c.icon}</span>
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
// KEY FEATURES
// ============================================================

function FeaturesSection() {
  return (
    <section className="section csm-features" aria-labelledby="csm-features-heading">
      <div className="container">
        <div className="section-heading csm-reveal">
          <p className="csm-eyebrow">{FEATURES.eyebrow}</p>
          <h2 id="csm-features-heading">{FEATURES.heading}</h2>
          <p>{FEATURES.intro}</p>
        </div>
        <div className="csm-features__layout">
          <div className="csm-features__grid csm-reveal-stagger">
            {FEATURES.items.map((f) => (
              <div className="csm-feature-item" key={f.title}>
                <p className="csm-card-title">{f.title}</p>
                <p>{f.description}</p>
              </div>
            ))}
          </div>
          <div className="csm-reveal-right">
            <WorkflowDiagram
              title="Migration Wave Lifecycle"
              steps={[{ label: "Discover" }, { label: "Rehearse" }, { label: "Migrate" }, { label: "Validate" }, { label: "Optimize" }]}
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
    <section className="section csm-benefits" aria-labelledby="csm-benefits-heading">
      <div className="container">
        <div className="section-heading csm-reveal">
          <p className="csm-eyebrow">{BENEFITS.eyebrow}</p>
          <h2 id="csm-benefits-heading">{BENEFITS.heading}</h2>
          <p>{BENEFITS.intro}</p>
        </div>
        <div className="csm-benefits__stats csm-reveal-stagger">
          {BENEFITS.stats.map((s) => (
            <AnimatedCounter key={s.label} value={s.value} label={s.label} className="csm-stat" />
          ))}
        </div>
        <div className="csm-benefits__grid csm-reveal-stagger">
          {BENEFITS.items.map((b) => (
            <div className="csm-benefit-item" key={b.title}>
              <span aria-hidden="true">{Ico.check}</span>
              <div>
                <p className="csm-card-title">{b.title}</p>
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
// MIGRATION / IMPLEMENTATION PROCESS
// ============================================================

function ProcessSection() {
  return (
    <section className="section csm-process" aria-labelledby="csm-process-heading">
      <div className="container">
        <div className="section-heading csm-reveal">
          <img src={Images.illoCloudMigrationTimeline} alt="" aria-hidden="true" className="csm-process__illo" loading="lazy" />
          <p className="csm-eyebrow">{PROCESS.eyebrow}</p>
          <h2 id="csm-process-heading">{PROCESS.heading}</h2>
          <p>{PROCESS.intro}</p>
        </div>
        <div className="csm-zoom-in">
          <WorkflowDiagram title="Six-Stage Migration Path" steps={PROCESS.steps} />
        </div>
        <div className="csm-process__grid csm-reveal-stagger">
          {PROCESS.detail.map((p, i) => (
            <div className="csm-step-card" key={p.name}>
              <span className="csm-step-card__num">{String(i + 1).padStart(2, "0")}</span>
              <p className="csm-card-title">{p.name}</p>
              <p>{p.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// TECHNOLOGIES SUPPORTED
// ============================================================

function TechnologiesSection() {
  return (
    <section className="section csm-tech" aria-labelledby="csm-tech-heading">
      <div className="container">
        <div className="section-heading csm-reveal">
          <p className="csm-eyebrow">{TECHNOLOGIES.eyebrow}</p>
          <h2 id="csm-tech-heading">{TECHNOLOGIES.heading}</h2>
          <p>{TECHNOLOGIES.intro}</p>
        </div>
        <div className="csm-tech__grid csm-reveal-stagger">
          {TECHNOLOGIES.items.map((t) => (
            <div className="csm-tech-card" key={t.title}>
              <span className="csm-tech-card__icon">{t.icon}</span>
              <p className="csm-card-title">{t.title}</p>
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
    <section className="section csm-why" aria-labelledby="csm-why-heading">
      <div className="container">
        <div className="section-heading csm-reveal">
          <p className="csm-eyebrow">{WHY_MIRKETA.eyebrow}</p>
          <h2 id="csm-why-heading">{WHY_MIRKETA.heading}</h2>
          <p>{WHY_MIRKETA.intro}</p>
        </div>
        <div className="csm-why__grid csm-reveal-stagger">
          {WHY_MIRKETA.items.map((w) => (
            <div className="csm-why-card" key={w.title}>
              <span className="csm-why-card__icon">{w.icon}</span>
              <p className="csm-card-title">{w.title}</p>
              <p>{w.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// CASE STUDY / CUSTOMER SUCCESS
// ============================================================

function CaseStudySection() {
  return (
    <section className="section csm-cases" aria-labelledby="csm-cases-heading">
      <div className="container">
        <div className="section-heading csm-reveal">
          <p className="csm-eyebrow">{CASE_STUDIES.eyebrow}</p>
          <h2 id="csm-cases-heading">{CASE_STUDIES.heading}</h2>
          <p>{CASE_STUDIES.intro}</p>
        </div>
        <div className="csm-cases__grid csm-reveal-stagger">
          {CASE_STUDIES.cases.map((c) => (
            <div className="csm-case-card" key={c.title}>
              <span className="csm-case-card__tag">{c.industry}</span>
              <p className="csm-card-title">{c.title}</p>
              <dl className="csm-case-card__fields">
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
    <section className="section csm-faq" aria-labelledby="csm-faq-heading">
      <div className="container">
        <div className="section-heading csm-reveal">
          <p className="csm-eyebrow">FAQ</p>
          <h2 id="csm-faq-heading">Frequently Asked Questions About Cloud Setup and Migration</h2>
        </div>
        <FaqAccordion items={FAQS} className="csm-reveal" searchPlaceholder="Ask a question — e.g. &quot;downtime&quot;, &quot;cost&quot;, &quot;timeline&quot;..." />
        <p className="csm-faq__links">
          Related reading: <Link to={CLOUD_PAGES.SITE_RELIABILITY_ENGINEERING.slug}>{CLOUD_PAGES.SITE_RELIABILITY_ENGINEERING.label}</Link>,{" "}
          <Link to={CLOUD_PAGES.INFRA_MANAGEMENT.slug}>{CLOUD_PAGES.INFRA_MANAGEMENT.label}</Link>,{" "}
          <Link to={ORACLE_PAGES.MANAGED_SERVICES.slug}>{ORACLE_PAGES.MANAGED_SERVICES.label}</Link>,{" "}
          <Link to={NETSUITE_PAGES.IMPLEMENTATION.slug}>{NETSUITE_PAGES.IMPLEMENTATION.label}</Link>,{" "}
          <Link to={AI_PAGES.AI_DATA_FOUNDATIONS.slug}>{AI_PAGES.AI_DATA_FOUNDATIONS.label}</Link>.
        </p>
      </div>
    </section>
  );
}
