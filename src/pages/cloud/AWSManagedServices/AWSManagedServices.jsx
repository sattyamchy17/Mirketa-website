import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Images } from "../../../assets/images/index.js";
import { CLOUD_PAGES } from "../../../config/pageSlugs.js";
import Seo from "../../../components/Seo/Seo.jsx";
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb.jsx";
import FaqAccordion from "../../../components/FaqAccordion/FaqAccordion.jsx";
import ConsultationSection from "../../../components/ConsultationSection/ConsultationSection.jsx";
import "./AWSManagedServices.css";

gsap.registerPlugin(ScrollTrigger);

// ============================================================
// ICONS
// ============================================================
const Ico = {
  gears: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" /><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
  ),
  pulse: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 12h4l2 6 4-12 2 6h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  server: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="4" y="4" width="16" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4" /><rect x="4" y="14" width="16" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4" /><circle cx="8" cy="7" r="1" fill="currentColor" /><circle cx="8" cy="17" r="1" fill="currentColor" /></svg>
  ),
  build: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 7l9-4 9 4-9 4-9-4z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M3 7v10l9 4 9-4V7M12 11v10" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /></svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  backup: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 7v10a8 4 0 0016 0V7" stroke="currentColor" strokeWidth="1.4" /><ellipse cx="12" cy="7" rx="8" ry="4" stroke="currentColor" strokeWidth="1.4" /><path d="M12 11v4M10 13h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
  ),
  check: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12.5l5 5L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  compass: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" /><path d="M15 9l-2 6-6 2 2-6 6-2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  clipboard: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="6" y="4" width="12" height="16" rx="1.5" stroke="currentColor" strokeWidth="1.4" /><rect x="9" y="2.5" width="6" height="3" rx="1" fill="currentColor" opacity="0.7" /><path d="M9 10h6M9 14h6M9 18h3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
  ),
  swap: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 8h13M13 4l4 4-4 4M20 16H7M11 12l-4 4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  bar: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 19V13M10 19V8M16 19v-5M20 19V5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
  ),
};

// ============================================================
// DATA — content preserved exactly as provided, except: (1) the
// three duplicated/unrelated "Why AWS Needs a Dedicated Team"
// bullets, consolidated to one clean version of the cost point and
// one of the security-patch point, with the unrelated "electrical
// surge" line dropped (confirmed with the requester); (2) en/em
// dashes replaced with natural punctuation; (3) the "systems/
// focused" typo corrected to "systems-focused"; (4) the FAQ section
// deduplicated to one clean version of each of the 6 unique
// questions, keeping the better-worded phrasing where both versions
// existed.
// ============================================================

const BREADCRUMB_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Platforms & Technology", href: "/" },
  { label: CLOUD_PAGES.AWS.label },
];

const HERO = {
  badge: "AWS Managed Services",
  title: "AWS Managed Services to Keep Your Cloud Running",
  description:
    "There's a lot of work involved in running AWS well: monitoring, patching, scaling, security, controlling costs, etc. With Mirketa's AWS Managed Services, all this is taken care of, allowing your team to focus on the product and not on maintaining the infrastructure underneath it.",
  primaryCta: { label: "Talk to an AWS Expert", href: "#contact" },
  secondaryCta: { label: "Get a Free Cloud Health Check", href: "#contact" },
};

const WHY_DEDICATED_TEAM = {
  heading: "Why AWS Needs a Dedicated Team",
  intro:
    "Powerful tools are provided by AWS. It doesn't provide you enough time or expertise to operate them effectively on your own. Eventually, most growing teams will experience similar problems:",
  items: ["Inconsistent or continually rising cloud costs.", "Security patches that accumulate as nobody owns them.", "An architecture that is no longer relevant to the business."],
  closing:
    "This is where AWS Cloud Managed Services come in. You get a dedicated team managing your environment every day, identifying operational, security, and cost issues before they become bigger problems.",
};

const WHAT_WE_MANAGE = {
  heading: "What We Manage",
  items: [
    { icon: Ico.gears, title: "AWS Cloud Management", description: "We own the whole AWS environment from the structure of your account to access control, tagging and budgets. One system, not dashboards everywhere." },
    { icon: Ico.pulse, title: "AWS Cloud Operations", description: "Round the clock monitoring and incident response. Problems are detected early and fixed quickly, so uptime is always your standard, never a concern." },
    { icon: Ico.server, title: "AWS Infrastructure Management", description: "We ensure your infrastructure is stable and cost-effective from EC2, RDS, networking and load balancing, with regular right-sizing to avoid paying for what you don't use." },
    { icon: Ico.build, title: "AWS Infrastructure Services", description: "Looking for new environments, migration or rebuild? We build and deploy AWS infrastructure that is right for your business today, and tomorrow." },
    { icon: Ico.shield, title: "Security, Compliance, and Cost Optimization", description: "Regular cost reviews, waste reduction, cost reduction without compromise, audit-ready documentation, continual security checks, automated patching." },
    { icon: Ico.backup, title: "Backup and Disaster Recovery", description: "You remain secure and protected, and you're prepared for what happens next if things go wrong." },
  ],
};

const WHY_MIRKETA = {
  heading: "Why Companies Choose Mirketa",
  items: [
    "Explanations in layman's terms, not console jargon",
    "One staff team that is familiar with your environment, rather than a rotating helpdesk.",
    "A systems-focused strategy to address small problems before they become outages.",
    "Ongoing support and maintenance plans",
  ],
};

const HOW_IT_WORKS = {
  heading: "How It Works",
  steps: [
    { icon: Ico.compass, title: "Cloud Assessment", description: "We assess your current AWS resources, security configuration and spending, and provide you with a clear understanding of where you are currently at." },
    { icon: Ico.clipboard, title: "Custom Management Plan", description: "A plan is not built for you around a generic package of workloads, it is built around your actual workloads." },
    { icon: Ico.swap, title: "Smooth Onboarding", description: "We continue service without impacting your live systems." },
    { icon: Ico.bar, title: "Ongoing Management and Reporting", description: "You receive real-time monitoring, frequent reporting and a team that is always on call." },
  ],
};

const SAAS_FIT = {
  heading: "Designed to fit the needs of SaaS and Salesforce Driven Businesses.",
  paragraph:
    "When you're talking to AWS and Salesforce or any SaaS apps, you require an ally that knows both sides. Whether you're using AWS or Salesforce, Mirketa's expertise in both allows your cloud system to work with your business system instead of against them.",
};

const CLOSING_CTA = {
  heading: "Looking for reliable AWS Managed Services without building a full internal cloud team?",
  paragraph: "Let's check out your cloud now. Not pressured, just a clear idea of where you're at and how we can help. Schedule a free AWS Cloud Assessment.",
  cta: { label: "Book Your Free AWS Cloud Assessment", href: "#contact" },
};

const FAQ = {
  heading: "Frequently Asked Questions",
  items: [
    { q: "What are AWS Managed Services?", a: "Handing over the day-to-day operation of your AWS environment, monitoring, maintenance, security, and optimization, to a dedicated team, so your internal staff can focus on core business work." },
    { q: "How is this different from hiring an AWS engineer?", a: "One engineer covers one person's hours and skill set. A managed services team gives you round-the-clock coverage and broader expertise built into a system, not dependent on one person." },
    { q: "Will this reduce our AWS bill?", a: "In most cases, yes. Regular right-sizing, cleanup of unused resources, and smarter architecture decisions typically lower cloud spend over time." },
    { q: "Do you work with companies already using Salesforce or other SaaS tools?", a: "Yes. This is where our experience runs deepest: AWS infrastructure that supports Salesforce integrations, custom SaaS products, and enterprise data flows." },
    { q: "How fast can you onboard our AWS environment?", a: "Timelines depend on the size and complexity of your setup, but onboarding is designed to be smooth and non-disruptive to your live systems." },
    { q: "Is this only for large enterprises?", a: "No. We work with growing companies that need enterprise-level reliability without hiring a full internal cloud team." },
  ],
};

const CONSULTATION = {
  eyebrow: "Get Started",
  heading: "Book Your Free AWS Cloud Assessment",
  description: "Not pressured, just a clear idea of where you're at and how we can help.",
  formTitle: "Get a Free Cloud Health Check",
};

const SEO = {
  title: "AWS Managed Services | 24/7 Cloud Support by Mirketa",
  description:
    "Mirketa's AWS Managed Services cover monitoring, security, cost optimization, and disaster recovery, so your team can focus on your product instead of your infrastructure.",
  canonical: `https://www.mirketa.com${CLOUD_PAGES.AWS.slug}/`,
  keywords: [
    "AWS Managed Services",
    "AWS Cloud Management",
    "AWS Infrastructure Management",
    "AWS Cloud Operations",
    "AWS Infrastructure Services",
    "AWS Managed Cloud Services",
    "AWS Support Services",
    "AWS Cost Optimization",
    "AWS Security Management",
    "AWS Disaster Recovery",
    "AWS Monitoring Services",
    "Cloud Infrastructure Management",
  ],
  schema: [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "AWS Managed Services",
      provider: { "@type": "Organization", name: "Mirketa" },
      description: "AWS Managed Services covering cloud management, operations, infrastructure, security, cost optimization, and disaster recovery.",
      url: `https://www.mirketa.com${CLOUD_PAGES.AWS.slug}/`,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.mirketa.com/" },
        { "@type": "ListItem", position: 2, name: "AWS Managed Services", item: `https://www.mirketa.com${CLOUD_PAGES.AWS.slug}/` },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQ.items.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  ],
};

export default function AWSManagedServices() {
  const heroTextRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.from(heroTextRef.current.children, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      });

      gsap.utils.toArray(".awsms-reveal").forEach((el) => {
        gsap.from(el, {
          y: 28,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 90%" },
        });
      });

      gsap.utils.toArray(".awsms-reveal-stagger").forEach((group) => {
        gsap.from(group.children, {
          y: 24,
          opacity: 0,
          duration: 0.55,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: { trigger: group, start: "top 90%" },
        });
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="aws-managed-services">
      <Seo {...SEO} />

      {/* ============ HERO ============ */}
      <section className="awsms-hero" style={{ backgroundImage: `url("${Images.heroAwsManagedServices}")` }} aria-label="AWS Managed Services by Mirketa">
        <div className="awsms-hero__scrim" />
        <div className="container">
          <Breadcrumb items={BREADCRUMB_ITEMS} className="awsms-breadcrumb" />
          <div className="awsms-hero__inner" ref={heroTextRef}>
            <span className="awsms-badge">{HERO.badge}</span>
            <h1>{HERO.title}</h1>
            <p className="awsms-hero__description">{HERO.description}</p>
            <div className="awsms-hero__ctas">
              <a href={HERO.primaryCta.href} className="btn btn-primary awsms-btn">
                {HERO.primaryCta.label}
              </a>
              <a href={HERO.secondaryCta.href} className="btn btn-secondary awsms-btn">
                {HERO.secondaryCta.label}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============ WHY A DEDICATED TEAM ============ */}
      <section className="section awsms-why-team" aria-labelledby="awsms-why-team-heading">
        <div className="content-wrap">
          <div className="awsms-section-heading awsms-reveal">
            <h2 id="awsms-why-team-heading">{WHY_DEDICATED_TEAM.heading}</h2>
            <p>{WHY_DEDICATED_TEAM.intro}</p>
          </div>
          <ul className="awsms-check-list awsms-reveal-stagger">
            {WHY_DEDICATED_TEAM.items.map((item) => (
              <li key={item}>
                <span aria-hidden="true">{Ico.check}</span>
                {item}
              </li>
            ))}
          </ul>
          <p className="awsms-why-team__closing awsms-reveal">{WHY_DEDICATED_TEAM.closing}</p>
        </div>
      </section>

      {/* ============ WHAT WE MANAGE ============ */}
      <section className="section awsms-manage" aria-labelledby="awsms-manage-heading">
        <div className="content-wrap">
          <div className="awsms-section-heading awsms-reveal">
            <h2 id="awsms-manage-heading">{WHAT_WE_MANAGE.heading}</h2>
          </div>
          <div className="awsms-manage__grid awsms-reveal-stagger">
            {WHAT_WE_MANAGE.items.map((item) => (
              <div className="awsms-manage-card" key={item.title}>
                <div className="awsms-manage-card__icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ WHY COMPANIES CHOOSE MIRKETA ============ */}
      <section className="section awsms-why-mirketa" aria-labelledby="awsms-why-mirketa-heading">
        <div className="content-wrap">
          <div className="awsms-section-heading awsms-reveal">
            <h2 id="awsms-why-mirketa-heading">{WHY_MIRKETA.heading}</h2>
          </div>
          <ul className="awsms-check-list awsms-reveal-stagger">
            {WHY_MIRKETA.items.map((item) => (
              <li key={item}>
                <span aria-hidden="true">{Ico.check}</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ============ HOW IT WORKS ============ */}
      <section className="section awsms-how" aria-labelledby="awsms-how-heading">
        <div className="content-wrap">
          <div className="awsms-section-heading awsms-reveal">
            <h2 id="awsms-how-heading">{HOW_IT_WORKS.heading}</h2>
          </div>
          <div className="awsms-how__grid awsms-reveal-stagger">
            {HOW_IT_WORKS.steps.map((step, i) => (
              <div className="awsms-how-card" key={step.title}>
                <div className="awsms-how-card__number">{String(i + 1).padStart(2, "0")}</div>
                <div className="awsms-how-card__icon">{step.icon}</div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ SAAS / SALESFORCE FIT ============ */}
      <section className="section awsms-saas-fit" aria-labelledby="awsms-saas-fit-heading">
        <div className="content-wrap awsms-reveal">
          <h2 id="awsms-saas-fit-heading">{SAAS_FIT.heading}</h2>
          <p>{SAAS_FIT.paragraph}</p>
        </div>
      </section>

      {/* ============ CLOSING CTA ============ */}
      <section className="awsms-closing-cta" aria-labelledby="awsms-closing-cta-heading">
        <div className="content-wrap awsms-closing-cta__inner awsms-reveal">
          <h2 id="awsms-closing-cta-heading">{CLOSING_CTA.heading}</h2>
          <p>{CLOSING_CTA.paragraph}</p>
          <a href={CLOSING_CTA.cta.href} className="btn btn-primary awsms-btn">
            {CLOSING_CTA.cta.label}
          </a>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="section awsms-faq" aria-labelledby="awsms-faq-heading">
        <div className="content-wrap">
          <div className="awsms-section-heading awsms-reveal">
            <h2 id="awsms-faq-heading">{FAQ.heading}</h2>
          </div>
          <FaqAccordion items={FAQ.items} className="awsms-reveal" />
        </div>
      </section>

      <ConsultationSection {...CONSULTATION} />
    </div>
  );
}
