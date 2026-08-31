import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Images } from "../../../assets/images/index.js";
import { CLOUD_PAGES, SERVICENOW_PAGES, AI_PAGES, WORKDAY_PAGES } from "../../../config/pageSlugs.js";
import Seo from "../../../components/Seo/Seo.jsx";
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb.jsx";
import StickyCta from "../../../components/StickyCta/StickyCta.jsx";
import TrustedByMarquee from "../../../components/TrustedByMarquee/TrustedByMarquee.jsx";
import AnimatedCounter from "../../../components/AnimatedCounter/AnimatedCounter.jsx";
import FaqAccordion from "../../../components/FaqAccordion/FaqAccordion.jsx";
import HeroVisual from "../../../components/HeroVisual/HeroVisual.jsx";
import ConsultationSection from "../../../components/ConsultationSection/ConsultationSection.jsx";
import RelatedServices from "../../../components/RelatedServices/RelatedServices.jsx";
import WorkflowDiagram from "../../../components/illustrations/WorkflowDiagram/WorkflowDiagram.jsx";
import SupplyChainMap from "../../../components/illustrations/SupplyChainMap/SupplyChainMap.jsx";
import "./InfrastructureManagement.css";

gsap.registerPlugin(ScrollTrigger);

// ============================================================
// ICONS
// ============================================================

const Ico = {
  check: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12.5l5 5L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  gear: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.4" /><path d="M12 2.5v3M12 18.5v3M4.2 6.2l2.1 2.1M17.7 15.7l2.1 2.1M2.5 12h3M18.5 12h3M4.2 17.8l2.1-2.1M17.7 8.3l2.1-2.1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  box: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 7l9-4 9 4-9 4-9-4z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M3 7v10l9 4 9-4V7M12 11v10" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /></svg>
  ),
  bar: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 19V13M10 19V8M16 19v-5M20 19V5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
  ),
  layers: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3l8 4.5-8 4.5-8-4.5L12 3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M4 12l8 4.5 8-4.5M4 16.5l8 4.5 8-4.5" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  cloud: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 18h10a4 4 0 000-8 5.5 5.5 0 00-10.7-1.7A4.5 4.5 0 007 18z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  clock: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" /><path d="M12 7v5l3.5 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
  ),
  award: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="8" r="5" stroke="currentColor" strokeWidth="1.4" /><path d="M8.5 12.5L7 21l5-2.5L17 21l-1.5-8.5" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  scale: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3v18M6 8l-3 6a3 3 0 006 0l-3-6zM18 8l-3 6a3 3 0 006 0l-3-6zM6 8h12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  heart: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 20s-7-4.5-9.3-9A5 5 0 0112 6a5 5 0 019.3 5c-2.3 4.5-9.3 9-9.3 9z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  server: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="4" y="4" width="16" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4" /><rect x="4" y="14" width="16" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4" /><circle cx="8" cy="7" r="1" fill="currentColor" /><circle cx="8" cy="17" r="1" fill="currentColor" /></svg>
  ),
  route: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="6" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.4" /><circle cx="18" cy="18" r="2.5" stroke="currentColor" strokeWidth="1.4" /><path d="M6 8.5V13a4 4 0 004 4h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
  ),
};

// ============================================================
// DATA
// ============================================================

const BREADCRUMB_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Platforms & Technology", href: "/" },
  { label: CLOUD_PAGES.INFRA_MANAGEMENT.label },
];

const HERO = {
  badge: "Terraform · Kubernetes · FinOps Partner",
  title: "Cloud Infrastructure Management Services for Environments Already Running in Production",
  description:
    "Mirketa's cloud infrastructure management services take over once workloads are already live in AWS, Azure, or Google Cloud — bringing every resource under version-controlled infrastructure as code, running Kubernetes clusters against real capacity data, closing the gap between cloud spend and actual usage, and enforcing configuration consistency across every environment so nothing drifts quietly out of compliance.",
  primaryCta: { label: "Get an Infrastructure Health Assessment", href: "#contact" },
  secondaryCta: { label: "Talk to a Platform Engineer", href: "#contact" },
  metrics: ["Full IaC Coverage, Not Partial", "Kubernetes Capacity Planned, Not Guessed", "FinOps-Driven Cost Governance", "Drift Detected Before It Ships"],
};

const HERO_DASHBOARD = {
  title: "Infrastructure Operations Console",
  stats: [
    { label: "IAC COVERAGE", value: "96%", caption: "Resources under Terraform" },
    { label: "COST SAVINGS", value: "29%", caption: "After FinOps optimization" },
    { label: "CLUSTER UPTIME", value: "99.95%", caption: "Trailing 90 days" },
  ],
  rows: [
    { title: "Terraform state — production VPC", meta: "Last plan: 0 drift detected", tone: "good", status: "In Sync" },
    { title: "EKS node pool autoscaling", meta: "Spot mix at 62% · Cost-optimized", tone: "good", status: "Healthy" },
    { title: "Staging vs. prod config parity", meta: "3 environment variables flagged", tone: "neutral", status: "Reviewing" },
  ],
  floatingCards: [
    { icon: Ico.gear, title: "Zero Manual Changes", subtitle: "Every change goes through IaC" },
    { icon: Ico.bar, title: "29% Cost Reduction", subtitle: "FinOps governance in place" },
  ],
};

const CHALLENGES = {
  eyebrow: "Business Challenges",
  heading: "Why Infrastructure That's Already Live Gets Harder to Manage, Not Easier",
  intro:
    "Once workloads are running in the cloud, the discipline that got them there tends to erode. These are the four patterns Mirketa sees most often in environments that have been live for a year or more.",
  items: [
    { title: "Hand-Made Changes Outside Version Control", description: "An engineer fixes something directly in the console during an incident, it works, and it never gets backported into Terraform — so the state file quietly stops matching reality." },
    { title: "Kubernetes Clusters Sized on Guesswork", description: "Node pools were sized for launch-day traffic and never revisited, so clusters either run over-provisioned around the clock or scramble during real load spikes." },
    { title: "Cloud Spend Outpacing Usage With No Owner", description: "Nobody on the team owns cost as a metric, so reserved instance coverage lapses, orphaned volumes pile up, and the monthly bill grows faster than the workload it's running." },
    { title: "\"Works in Staging, Breaks in Production\"", description: "Environments were cloned once and have diverged ever since, so a change that passes every staging test still fails when it reaches a production config nobody fully documented." },
  ],
};

const SOLUTION = {
  eyebrow: "Cloud Solution Overview",
  heading: "Day-2 Infrastructure Operations Built Around Code, Not Console Access",
  paragraphs: [
    "Mirketa's cloud infrastructure management engagements start by inventorying what's actually running against what your Terraform or Pulumi state says is running — and closing that gap is usually the first deliverable, not an afterthought. Once every resource is represented in code and every change flows through a reviewed pull request, infrastructure stops being something that happens to your environment and starts being something your team controls on purpose.",
    "From there we take over the operational load of the platform layer: Kubernetes node pool sizing and autoscaling policy tuned against real utilization, Helm-based release management for the workloads running on top of the cluster, and configuration management that keeps staging, QA, and production genuinely aligned instead of just similar. Policy-as-code guardrails catch a misconfigured security group or an unencrypted bucket before it merges, not after a scan flags it in production.",
    "Cost is treated as an engineering input, not a finance afterthought. We build a FinOps practice around your actual environment — right-sizing instances against observed CPU and memory data, shifting steady-state workloads onto reserved or spot capacity, and giving engineering leadership a live view of what each service actually costs to run, updated continuously rather than reconstructed once a quarter from a billing export.",
  ],
};

const CORE_SERVICES = {
  eyebrow: "Core Services",
  heading: "Six Ways Mirketa Manages Infrastructure That's Already Live",
  intro: "Every ongoing infrastructure management engagement is built from these six service lines, scoped to how much of your environment is already codified.",
  items: [
    { icon: Ico.layers, title: "Infrastructure-as-Code Management", description: "Terraform or Pulumi modules, remote state management, and a pull-request workflow so every infrastructure change is reviewed, tested, and auditable." },
    { icon: Ico.box, title: "Kubernetes & Container Operations", description: "Node pool sizing, autoscaling policy, Helm chart lifecycle, and cluster upgrades managed against real workload demand instead of a fixed baseline." },
    { icon: Ico.bar, title: "Cost Optimization & FinOps", description: "Reserved and spot instance strategy, orphaned resource cleanup, and per-service cost attribution so engineering owns spend, not just finance." },
    { icon: Ico.gear, title: "Patch & Configuration Management", description: "OS patching cadence, configuration baselines, and drift remediation across every environment, applied consistently instead of environment by environment." },
    { icon: Ico.cloud, title: "Multi-Cloud Governance", description: "Consistent policy-as-code, tagging standards, and access controls enforced whether the workload sits in AWS, Azure, GCP, or across more than one." },
    { icon: Ico.scale, title: "Capacity Planning & Scaling", description: "Forecasted growth modeled against historical usage so compute, storage, and cluster capacity scale ahead of demand instead of reacting to it." },
  ],
};

const FEATURES = {
  eyebrow: "Key Features",
  heading: "What Ongoing Infrastructure Management Actually Includes",
  intro: "Every capability below is part of the standard infrastructure management engagement, not an add-on.",
  items: [
    { title: "Terraform State Governance", description: "Remote state, locking, and module structure designed so infrastructure changes are reviewable instead of tribal knowledge." },
    { title: "Policy-as-Code Enforcement", description: "Guardrails that block a non-compliant change at the pull-request stage, before it ever reaches a live environment." },
    { title: "Automated Drift Detection", description: "Scheduled reconciliation between declared infrastructure and actual cloud state, with alerts the moment they diverge." },
    { title: "Kubernetes Autoscaling Tuning", description: "Horizontal and cluster autoscaler configuration tuned against real traffic patterns, not launch-day defaults." },
    { title: "Cost Anomaly Alerting", description: "Spend thresholds and anomaly detection tied to specific services, so a runaway resource gets caught within hours, not at month-end." },
    { title: "Environment Parity Audits", description: "Scheduled comparisons between staging, QA, and production configuration to close the gap before it causes a failed release." },
  ],
};

const BENEFITS = {
  eyebrow: "Benefits",
  heading: "What Changes Once Infrastructure Is Actually Managed",
  intro: "These are the outcomes Mirketa's infrastructure management clients report within the first two quarters.",
  stats: [
    { value: "96%", label: "Infrastructure-as-Code Coverage" },
    { value: "29%", label: "Average Cloud Cost Reduction" },
    { value: "99.95%", label: "Cluster Uptime, Trailing 90 Days" },
    { value: "70%", label: "Fewer Manual Console Changes" },
  ],
  items: [
    { title: "A Bill That Reflects Real Usage", description: "FinOps governance and rightsizing turn a growing, unexplained cloud bill into a cost curve that tracks actual demand." },
    { title: "No More Surprise Console Changes", description: "Every change goes through code review, so 'someone fixed it in the console' stops being how incidents get resolved." },
    { title: "Kubernetes Capacity You Can Explain", description: "Node pool and autoscaling decisions are backed by utilization data, not a number picked at launch and never revisited." },
    { title: "Environments That Actually Match", description: "Configuration management keeps staging and production close enough that a passing test means something." },
  ],
};

const PROCESS = {
  eyebrow: "Migration / Implementation Process",
  heading: "A Five-Stage Path to Steady-State Infrastructure Management",
  intro: "This is the onboarding methodology Mirketa uses to take over infrastructure operations for an environment that's already live.",
  steps: [
    { label: "Audit & Drift Assessment" },
    { label: "IaC Baseline Migration" },
    { label: "Governance Policy Setup" },
    { label: "Cost Baseline & Optimization" },
    { label: "Steady-State Management" },
  ],
  detail: [
    { name: "Infrastructure Audit & Drift Assessment", description: "Every resource in your live environment is inventoried and compared against existing IaC, if any, to size the actual gap." },
    { name: "IaC Baseline Migration", description: "Uncodified resources are imported into Terraform or Pulumi modules until the declared state matches reality end to end." },
    { name: "Governance Policy Setup", description: "Policy-as-code guardrails, tagging standards, and access controls are deployed across every account and environment." },
    { name: "Cost Baseline & Optimization", description: "A cost baseline is established per service, followed by rightsizing, reserved capacity planning, and spend attribution." },
    { name: "Steady-State Management", description: "Ongoing change management, patching, capacity planning, and cost governance take over as the ongoing operating model." },
  ],
};

const TECHNOLOGIES = {
  eyebrow: "Technologies Supported",
  heading: "Infrastructure Tooling We Operate and Manage",
  intro: "Our platform engineers work daily across the infrastructure-as-code and container tooling that runs your environment.",
  items: [
    { icon: Ico.layers, title: "Terraform" },
    { icon: Ico.box, title: "Kubernetes" },
    { icon: Ico.server, title: "Docker" },
    { icon: Ico.gear, title: "Ansible" },
    { icon: Ico.cloud, title: "AWS · Azure · GCP Native Tooling" },
    { icon: Ico.route, title: "Helm" },
  ],
};

const WHY_MIRKETA = {
  eyebrow: "Why Mirketa",
  heading: "A Partner That Manages Infrastructure as a System, Not a Ticket Queue",
  intro: "Plenty of providers will patch a server when asked. Fewer treat infrastructure-as-code coverage and cost governance as ongoing engineering disciplines.",
  items: [
    { icon: Ico.award, title: "Certified Platform Engineers", description: "Our team holds active certifications across Terraform, Kubernetes, and every major hyperscaler, not a single-vendor specialty." },
    { icon: Ico.bar, title: "Cost Treated as an Engineering Metric", description: "FinOps reporting is built into the same dashboards your team already uses, not a separate quarterly finance exercise." },
    { icon: Ico.shield, title: "Policy-as-Code by Default", description: "Governance guardrails are enforced at the pull-request stage across every account, not retrofitted after an audit." },
    { icon: Ico.clock, title: "Documented Change Windows", description: "Patch and configuration changes follow an agreed cadence and runbook, so nothing lands on your environment as a surprise." },
    { icon: Ico.route, title: "Multi-Cloud Fluency", description: "The same governance model applies whether your workloads run in one cloud or are split across three." },
    { icon: Ico.heart, title: "A Long-Term Operating Partner", description: "Infrastructure management is designed as an ongoing relationship, with the same engineers staying accountable for your environment over time." },
  ],
};

const CASE_STUDIES = {
  eyebrow: "Case Study / Customer Success",
  heading: "Real Infrastructure Management Outcomes",
  intro: "Anonymized results from recent cloud infrastructure management engagements across industries.",
  cases: [
    {
      title: "Fintech Brings 1,400 Cloud Resources Under Terraform in 10 Weeks",
      industry: "Financial Services",
      challenge: "A fintech company had grown its AWS footprint to over 1,400 resources with less than a third represented in code, making every change a manual, unreviewed risk.",
      solution: "We ran a full drift assessment, imported the remaining resources into modular Terraform, and put every future change behind pull-request review.",
      outcome: "Infrastructure-as-code coverage reached 97%, and unplanned console changes dropped to near zero within the first quarter.",
    },
    {
      title: "Healthtech SaaS Cuts Kubernetes Spend 33% Without Losing Headroom",
      industry: "Healthcare Technology",
      challenge: "A healthtech SaaS provider's EKS clusters were over-provisioned around the clock to absorb rare traffic spikes, driving compute costs well above actual demand.",
      solution: "We rebuilt node pool autoscaling policy against 90 days of real utilization data and shifted steady-state workloads onto a reserved and spot instance mix.",
      outcome: "Monthly Kubernetes spend dropped 33% with no degradation in peak-traffic performance or availability.",
    },
  ],
};

const FAQS = [
  { q: "What does infrastructure-as-code coverage actually mean?", a: "It means every cloud resource your team relies on — networking, compute, storage, IAM, Kubernetes configuration — exists as version-controlled Terraform or Pulumi code that matches what's actually deployed, so changes go through review instead of a console click." },
  { q: "How do you measure cost optimization results?", a: "We establish a per-service cost baseline before making changes, then track spend against that baseline as rightsizing, reserved capacity, and spot instance adjustments take effect, so savings are attributable rather than estimated." },
  { q: "What's included in your Kubernetes operations scope?", a: "Node pool sizing, autoscaling policy, Helm chart lifecycle management, cluster version upgrades, and capacity planning. Incident response and on-call escalation for production issues are handled under our site reliability engineering service." },
  { q: "How do you prevent configuration drift between environments?", a: "Scheduled reconciliation jobs compare declared infrastructure state against actual cloud state and flag divergence automatically, and configuration management tooling keeps staging, QA, and production baselines aligned on an ongoing cadence." },
  { q: "What is your pricing model for ongoing infrastructure management?", a: "Most clients move to a monthly retainer scoped to the size and complexity of their environment, sized after the initial infrastructure audit. It's a predictable operating cost, not a per-incident bill." },
  { q: "Do you support multi-cloud environments?", a: "Yes. We apply the same infrastructure-as-code and governance model whether your workloads run entirely in one cloud or are split across AWS, Azure, and Google Cloud." },
  { q: "How is this different from your cloud setup and migration service?", a: "Cloud setup and migration is a project that moves workloads into the cloud and stands up the landing zone. Infrastructure management is the ongoing operating model for workloads that are already live, covering IaC, Kubernetes operations, cost, and governance." },
  { q: "How long does onboarding to ongoing infrastructure management take?", a: "The initial audit, drift assessment, and IaC baseline migration typically take 4 to 8 weeks depending on environment size, after which the engagement transitions into steady-state monthly management." },
];

const RELATED_SERVICES = {
  eyebrow: "Related Services",
  heading: "Explore More Ways Mirketa Supports Your Cloud Environment",
  intro: "Infrastructure management works best alongside a few adjacent disciplines. Here's where to look next.",
  items: [
    { slug: CLOUD_PAGES.SETUP_MIGRATION.slug, label: CLOUD_PAGES.SETUP_MIGRATION.label, description: "Still moving workloads into the cloud? Start with landing zone design and governed migration before ongoing management begins." },
    { slug: CLOUD_PAGES.SITE_RELIABILITY_ENGINEERING.slug, label: CLOUD_PAGES.SITE_RELIABILITY_ENGINEERING.label, description: "Pair infrastructure management with observability, incident response, and SLO management for full operational coverage." },
    { slug: SERVICENOW_PAGES.TECHNOLOGY_WORKFLOWS.slug, label: SERVICENOW_PAGES.TECHNOLOGY_WORKFLOWS.label, description: "Connect infrastructure change and asset data into ServiceNow ITSM for unified IT operations visibility." },
    { slug: AI_PAGES.AI_DATA_FOUNDATIONS.slug, label: AI_PAGES.AI_DATA_FOUNDATIONS.label, description: "Build the governed data foundation that keeps analytics and AI workloads reliable on top of a well-managed cloud platform." },
    { slug: WORKDAY_PAGES.SUPPORT_MANAGED_SERVICES.slug, label: WORKDAY_PAGES.SUPPORT_MANAGED_SERVICES.label, description: "Extend the same ongoing, retainer-based management model to your Workday platform operations." },
  ],
};

const CONSULTATION = {
  eyebrow: "Get Started",
  heading: "Get an Infrastructure Health Assessment",
  description: "Tell us about your current cloud footprint and IaC coverage — a platform engineer will follow up within one business day with a scoped assessment.",
  formTitle: "Get a Free Infrastructure Health Assessment",
};

const SEO = {
  title: "Cloud Infrastructure Management Services | Mirketa",
  description:
    "Mirketa's Cloud Infrastructure Management Services cover infrastructure as code, Kubernetes operations, FinOps cost optimization, and multi-cloud governance.",
  canonical: `https://mirketa.us${CLOUD_PAGES.INFRA_MANAGEMENT.slug}/`,
  keywords: [
    "Cloud Infrastructure Management Services",
    "Infrastructure as Code",
    "Kubernetes Operations",
    "Cost Optimization",
    "FinOps",
    "Configuration Management",
    "Multi-Cloud Governance",
    "Terraform Management",
  ],
  schema: [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "Cloud Infrastructure Management Services",
      provider: { "@type": "Organization", name: "Mirketa Inc.", url: "https://mirketa.us" },
      name: "Cloud Infrastructure Management Services",
      description: "Infrastructure-as-code management, Kubernetes and container operations, cost optimization and FinOps, patch and configuration management, and multi-cloud governance for live cloud environments.",
      areaServed: "Global",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://mirketa.us/" },
        { "@type": "ListItem", position: 2, name: CLOUD_PAGES.INFRA_MANAGEMENT.label, item: `https://mirketa.us${CLOUD_PAGES.INFRA_MANAGEMENT.slug}/` },
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

export default function InfrastructureManagement() {
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

      gsap.utils.toArray(".cim-reveal").forEach((el) => {
        gsap.from(el, { opacity: prefersReduced ? 1 : 0, y: prefersReduced ? 0 : 32, duration: 0.7, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 88%" } });
      });
      gsap.utils.toArray(".cim-reveal-left").forEach((el) => {
        gsap.from(el, { opacity: prefersReduced ? 1 : 0, x: prefersReduced ? 0 : -30, duration: 0.7, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 88%" } });
      });
      gsap.utils.toArray(".cim-reveal-right").forEach((el) => {
        gsap.from(el, { opacity: prefersReduced ? 1 : 0, x: prefersReduced ? 0 : 30, duration: 0.7, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 88%" } });
      });
      gsap.utils.toArray(".cim-reveal-stagger").forEach((el) => {
        gsap.from(el.children, { opacity: prefersReduced ? 1 : 0, y: prefersReduced ? 0 : 26, duration: 0.6, stagger: 0.06, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 85%" } });
      });
      gsap.utils.toArray(".cim-zoom-in").forEach((el) => {
        gsap.from(el, { opacity: prefersReduced ? 1 : 0, scale: prefersReduced ? 1 : 0.94, duration: 0.6, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 88%" } });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="infrastructure-management">
      <Seo {...SEO} />
      <HeroSection heroTextRef={heroTextRef} heroRef={heroRef} />
      <TrustedByMarquee label="Trusted by Platform & Infrastructure Engineering Teams" />
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
      <RelatedServices {...RELATED_SERVICES} className="cim-related cim-reveal" />
      <ConsultationSection {...CONSULTATION} />
      <StickyCta heroRef={heroRef} label="Get an Infrastructure Health Assessment" />
    </div>
  );
}

// ============================================================
// HERO
// ============================================================

function HeroSection({ heroTextRef, heroRef }) {
  return (
    <section ref={heroRef} className="cim-hero" style={{ backgroundImage: `url("${Images.heroCloudInfraManagement}")` }} aria-label="Cloud Infrastructure Management Services by Mirketa">
      <div className="cim-hero__scrim" />
      <div className="container">
        <Breadcrumb items={BREADCRUMB_ITEMS} className="cim-breadcrumb" />
        <div className="cim-hero__inner">
          <div ref={heroTextRef} className="cim-hero__text">
            <span className="cim-badge">
              <span className="cim-badge__spark" aria-hidden="true">✦</span> {HERO.badge}
            </span>
            <h1>{HERO.title}</h1>
            <p className="cim-hero__description">{HERO.description}</p>
            <div className="cim-hero__ctas">
              <a href={HERO.primaryCta.href} className="btn btn-primary cim-btn">
                {HERO.primaryCta.label} <span aria-hidden="true">→</span>
              </a>
              <a href={HERO.secondaryCta.href} className="btn btn-secondary cim-btn">
                {HERO.secondaryCta.label}
              </a>
            </div>
            <ul className="cim-hero__metrics">
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
            className="cim-hero__visual cim-zoom-in"
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
    <section className="section cim-challenges" aria-labelledby="cim-challenges-heading">
      <div className="container">
        <div className="section-heading cim-reveal">
          <p className="cim-eyebrow">{CHALLENGES.eyebrow}</p>
          <h2 id="cim-challenges-heading">{CHALLENGES.heading}</h2>
          <p>{CHALLENGES.intro}</p>
        </div>
        <div className="cim-challenges__grid cim-reveal-stagger">
          {CHALLENGES.items.map((c) => (
            <div className="cim-challenge-card" key={c.title}>
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
    <section className="section cim-solution" aria-labelledby="cim-solution-heading">
      <div className="container cim-solution__grid">
        <div className="cim-reveal-left">
          <p className="cim-eyebrow">{SOLUTION.eyebrow}</p>
          <h2 id="cim-solution-heading">{SOLUTION.heading}</h2>
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
    <section className="section cim-core" aria-labelledby="cim-core-heading">
      <div className="container">
        <div className="section-heading cim-reveal">
          <p className="cim-eyebrow">{CORE_SERVICES.eyebrow}</p>
          <h2 id="cim-core-heading">{CORE_SERVICES.heading}</h2>
          <p>{CORE_SERVICES.intro}</p>
        </div>
        <div className="cim-core__grid cim-reveal-stagger">
          {CORE_SERVICES.items.map((c) => (
            <div className="cim-core-card" key={c.title}>
              <span className="cim-core-card__icon">{c.icon}</span>
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
    <section className="section cim-features" aria-labelledby="cim-features-heading">
      <div className="container">
        <div className="section-heading cim-reveal">
          <p className="cim-eyebrow">{FEATURES.eyebrow}</p>
          <h2 id="cim-features-heading">{FEATURES.heading}</h2>
          <p>{FEATURES.intro}</p>
        </div>
        <div className="cim-features__layout">
          <div className="cim-features__grid cim-reveal-stagger">
            {FEATURES.items.map((f) => (
              <div className="cim-feature-item" key={f.title}>
                <p className="cim-card-title">{f.title}</p>
                <p>{f.description}</p>
              </div>
            ))}
          </div>
          <div className="cim-reveal-right">
            <WorkflowDiagram
              title="Change Management Lifecycle"
              steps={[{ label: "Change proposed" }, { label: "Plan reviewed" }, { label: "Policy checked" }, { label: "Applied" }, { label: "Drift monitored" }]}
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
    <section className="section cim-benefits" aria-labelledby="cim-benefits-heading">
      <div className="container">
        <div className="section-heading cim-reveal">
          <p className="cim-eyebrow">{BENEFITS.eyebrow}</p>
          <h2 id="cim-benefits-heading">{BENEFITS.heading}</h2>
          <p>{BENEFITS.intro}</p>
        </div>
        <div className="cim-benefits__stats cim-reveal-stagger">
          {BENEFITS.stats.map((s) => (
            <AnimatedCounter key={s.label} value={s.value} label={s.label} className="cim-stat" />
          ))}
        </div>
        <div className="cim-benefits__grid cim-reveal-stagger">
          {BENEFITS.items.map((b) => (
            <div className="cim-benefit-item" key={b.title}>
              <span aria-hidden="true">{Ico.check}</span>
              <div>
                <p className="cim-card-title">{b.title}</p>
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
    <section className="section cim-process" aria-labelledby="cim-process-heading">
      <div className="container">
        <div className="section-heading cim-reveal">
          <p className="cim-eyebrow">{PROCESS.eyebrow}</p>
          <h2 id="cim-process-heading">{PROCESS.heading}</h2>
          <p>{PROCESS.intro}</p>
        </div>
        <div className="cim-zoom-in">
          <SupplyChainMap
            title="Multi-Cloud Governance Map"
            nodes={[
              { label: "Central Policy-as-Code Baseline", short: "HUB" },
              { label: "AWS Accounts", short: "AWS" },
              { label: "Azure Subscriptions", short: "AZR" },
              { label: "Google Cloud Projects", short: "GCP" },
              { label: "On-Prem / Hybrid Environments", short: "HYB" },
            ]}
          />
        </div>
        <div className="cim-process__grid cim-reveal-stagger">
          {PROCESS.detail.map((p, i) => (
            <div className="cim-step-card" key={p.name}>
              <span className="cim-step-card__num">{String(i + 1).padStart(2, "0")}</span>
              <p className="cim-card-title">{p.name}</p>
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
    <section className="section cim-tech" aria-labelledby="cim-tech-heading">
      <div className="container">
        <div className="section-heading cim-reveal">
          <p className="cim-eyebrow">{TECHNOLOGIES.eyebrow}</p>
          <h2 id="cim-tech-heading">{TECHNOLOGIES.heading}</h2>
          <p>{TECHNOLOGIES.intro}</p>
        </div>
        <div className="cim-tech__grid cim-reveal-stagger">
          {TECHNOLOGIES.items.map((t) => (
            <div className="cim-tech-card" key={t.title}>
              <span className="cim-tech-card__icon">{t.icon}</span>
              <p className="cim-card-title">{t.title}</p>
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
    <section className="section cim-why" aria-labelledby="cim-why-heading">
      <div className="container">
        <div className="section-heading cim-reveal">
          <p className="cim-eyebrow">{WHY_MIRKETA.eyebrow}</p>
          <h2 id="cim-why-heading">{WHY_MIRKETA.heading}</h2>
          <p>{WHY_MIRKETA.intro}</p>
        </div>
        <div className="cim-why__grid cim-reveal-stagger">
          {WHY_MIRKETA.items.map((w) => (
            <div className="cim-why-card" key={w.title}>
              <span className="cim-why-card__icon">{w.icon}</span>
              <p className="cim-card-title">{w.title}</p>
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
    <section className="section cim-cases" aria-labelledby="cim-cases-heading">
      <div className="container">
        <div className="section-heading cim-reveal">
          <p className="cim-eyebrow">{CASE_STUDIES.eyebrow}</p>
          <h2 id="cim-cases-heading">{CASE_STUDIES.heading}</h2>
          <p>{CASE_STUDIES.intro}</p>
        </div>
        <div className="cim-cases__grid cim-reveal-stagger">
          {CASE_STUDIES.cases.map((c) => (
            <div className="cim-case-card" key={c.title}>
              <span className="cim-case-card__tag">{c.industry}</span>
              <p className="cim-card-title">{c.title}</p>
              <dl className="cim-case-card__fields">
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
    <section className="section cim-faq" aria-labelledby="cim-faq-heading">
      <div className="container">
        <div className="section-heading cim-reveal">
          <p className="cim-eyebrow">FAQ</p>
          <h2 id="cim-faq-heading">Frequently Asked Questions About Cloud Infrastructure Management</h2>
        </div>
        <FaqAccordion items={FAQS} className="cim-reveal" searchPlaceholder="Ask a question — e.g. &quot;drift&quot;, &quot;cost&quot;, &quot;Kubernetes&quot;..." />
        <p className="cim-faq__links">
          Related reading: <Link to={CLOUD_PAGES.SETUP_MIGRATION.slug}>{CLOUD_PAGES.SETUP_MIGRATION.label}</Link>,{" "}
          <Link to={CLOUD_PAGES.SITE_RELIABILITY_ENGINEERING.slug}>{CLOUD_PAGES.SITE_RELIABILITY_ENGINEERING.label}</Link>,{" "}
          <Link to={SERVICENOW_PAGES.TECHNOLOGY_WORKFLOWS.slug}>{SERVICENOW_PAGES.TECHNOLOGY_WORKFLOWS.label}</Link>,{" "}
          <Link to={AI_PAGES.AI_DATA_FOUNDATIONS.slug}>{AI_PAGES.AI_DATA_FOUNDATIONS.label}</Link>.
        </p>
      </div>
    </section>
  );
}
