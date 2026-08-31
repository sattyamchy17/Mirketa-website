import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Images } from "../../../assets/images/index.js";
import { CLOUD_PAGES } from "../../../config/pageSlugs.js";
import Seo from "../../../components/Seo/Seo.jsx";
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb.jsx";
import FaqAccordion from "../../../components/FaqAccordion/FaqAccordion.jsx";
import ConsultationSection from "../../../components/ConsultationSection/ConsultationSection.jsx";
import "./AzureManagedServices.css";

gsap.registerPlugin(ScrollTrigger);

// ============================================================
// ICONS
// ============================================================
const Ico = {
  gears: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" /><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
  ),
  layers: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3l8 4.5-8 4.5-8-4.5L12 3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M4 12l8 4.5 8-4.5M4 16.5l8 4.5 8-4.5" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  clipboardCheck: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="6" y="4" width="12" height="16" rx="1.5" stroke="currentColor" strokeWidth="1.4" /><rect x="9" y="2.5" width="6" height="3" rx="1" fill="currentColor" opacity="0.7" /><path d="M9.5 12l1.7 1.7L14.5 10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  pulse: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 12h4l2 6 4-12 2 6h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
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
// duplicated "Economic projections/forecasts... continually
// rising" bullet under "Why Azure Requires a Dedicated Team",
// consolidated to one clean version (same dedup approach approved
// for the AWS Managed Services page); (2) en/em dashes replaced
// with natural punctuation; (3) a handful of obvious grammar fixes
// (missing articles/subjects, a run-on sentence, a garbled clause
// under "Azure MSP Support", and a duplicated "Ready to Simplify..."
// line collapsed to one); (4) "●" bullets converted to this site's
// standard checklist style, matching the AWS Managed Services page.
// No question or answer content was removed — there were no
// duplicate FAQ entries in this submission.
// ============================================================

const BREADCRUMB_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Platforms & Technology", href: "/" },
  { label: CLOUD_PAGES.AZURE.label },
];

const HERO = {
  badge: "Azure Managed Services",
  title: "Azure Services to Ensure Your Cloud Is Running Smoothly",
  description:
    "Well-managed Azure requires constant care and attention: monitoring, patching, scaling, security, cost control. Mirketa's Azure Managed Services do it all, letting your team concentrate on product development, not on the infrastructure that supports it.",
  primaryCta: { label: "Contact Us Today", href: "#contact" },
  secondaryCta: { label: "Get a Free Azure Health Check", href: "#contact" },
};

const WHY_DEDICATED_TEAM = {
  heading: "Why Azure Requires a Dedicated Team",
  intro:
    "Azure provides you with a large collection of excellent tools. It doesn't provide you with the time and the expertise to run them effectively on your own. As your team grows, most teams will face the same problems:",
  items: [
    "Economic projections, which are continually rising with no apparent justification.",
    "Outages that could have been caught and fixed earlier.",
    "Security patches that are not owned and accumulate.",
    "An architecture that's out of sync with the current way of doing business.",
  ],
  closing:
    "When engineers are pulled away from product work to solve infrastructure issues, Azure Cloud Managed Services can take that operational burden off their plate. You're getting a team that takes care of your environment every day, finding problems before you do.",
  cta: { label: "Talk to Our Azure Team Today", href: "#contact" },
};

const WHAT_WE_MANAGE = {
  heading: "What We Manage",
  items: [
    { icon: Ico.gears, title: "Azure Cloud Management", description: "We do everything that you need for your Azure environment: Subscriptions, Resource Groups, Access Controls, Tagging, Budgets, etc. One system, not piecemeal dashboards." },
    { icon: Ico.layers, title: "Azure Cloud Services", description: "Our Azure Cloud Services cover the full Azure service stack, from virtual machines and App Services to storage and networking, keeping your environment stable, secure, and cost-effective." },
    { icon: Ico.clipboardCheck, title: "Azure Cloud Management Services", description: "Our Azure Cloud Management Services provide active governance, policy enforcement, access audits, and ongoing oversight to keep your Azure environment secure, organized, and efficient as it grows." },
    { icon: Ico.pulse, title: "Azure MSP Support", description: "Around-the-clock monitoring and incident response with a team familiar with your environment. Uptime is no longer your concern, it's ours to handle." },
    { icon: Ico.shield, title: "Security, Compliance, and Cost Optimization", description: "Regular cost analysis to eliminate waste and not reduce performance, combined with continuous security checks, automated patching, and audit-ready documentation." },
    { icon: Ico.backup, title: "Backup and Disaster Recovery", description: "Your data remains secure and recoverable, with a plan in place if things go wrong." },
  ],
  cta: { heading: "Ready to Simplify Your Azure Environment?", label: "Contact Us Today", href: "#contact" },
};

const WHY_MIRKETA = {
  heading: "Why Companies Choose Mirketa",
  items: [
    "Updates in plain language, not console jargon",
    "A dedicated team who are aware of your environment, not a rotating helpdesk",
    "A proactive approach solving small issues before they become outages",
    "Clear pricing, no hidden fees or charges from the invoice.",
  ],
};

const HOW_IT_WORKS = {
  heading: "How It Works",
  steps: [
    { icon: Ico.compass, title: "Cloud Assessment", description: "We audit your existing Azure environment, security profile and spend to give you a clear picture of where you stand." },
    { icon: Ico.clipboard, title: "Custom Management Plan", description: "We don't offer a 'one size fits all' plan; when we create your plan, it is based on your real workloads." },
    { icon: Ico.swap, title: "Smooth Onboarding", description: "We don't disrupt your live systems and take over operations instead." },
    { icon: Ico.bar, title: "Ongoing Management and Reporting", description: "You'll receive real-time monitoring, frequent reporting and a team that's always at your fingertips." },
  ],
  cta: { label: "Get Started: Contact Us Today for a Free Assessment", href: "#contact" },
};

const SAAS_FIT = {
  heading: "Designed for SaaS & Salesforce Driven Businesses",
  paragraph:
    "When your Azure infrastructure interacts with Salesforce or other SaaS applications, you require a partner that's familiar with both systems. Your cloud and your business systems work together, not against one another, with Mirketa's Azure infrastructure and expertise, and SaaS and Salesforce experience.",
};

const CLOSING_CTA = {
  heading: "Looking to put your Azure environment out of your mind?",
  paragraph: "Let's see what's really going on in your cloud now. No pressure, just understanding of where you're at and how we can help!",
  cta: { label: "Contact Us Today for a Free Azure Cloud Assessment", href: "#contact" },
};

const FAQ = {
  heading: "Frequently Asked Questions",
  items: [
    { q: "What are Azure Managed Services?", a: "Relax knowing that your Azure environment, monitoring, maintenance, security and optimization is in the hands of a dedicated team, allowing your team to focus on core business tasks." },
    { q: "What is an Azure MSP?", a: "There's no need to deal with it all yourself. An Azure MSP takes care of your cloud environment on a regular basis: monitoring, patching, incident response, cost management, and governance." },
    { q: "What is the difference between this and having an Azure engineer?", a: "One engineer is responsible for one engineer's time and abilities. A managed services team provides you with 24/7 support and greater skill sets built into a system, rather than on a single individual." },
    { q: "Will we save money on Azure as a result?", a: "In most cases, yes. Generally, spending on the cloud is reduced over time through regular right-sizing, unused resource cleanup, and intelligent architecture decisions." },
    { q: "Do you have experience with companies that are already on Salesforce or other SaaS products?", a: "Yes. Our experience is most profound here, with Azure infrastructure that enables the integration of Salesforce, the development of custom SaaS products, and the flow of enterprise data." },
    { q: "What's the speed of your Azure onboarding?", a: "Onboarding can be more or less complicated, depending on the size and complexity of your setup, but is intended to be seamless and non-disruptive to your live systems." },
    { q: "Does the small or medium enterprise fit the bill as well?", a: "No. We support businesses that are scaling and require enterprise-level reliability, but don't need to have a full internal cloud team." },
  ],
  closing: { text: "Still have questions?", cta: { label: "Contact Us Today", href: "#contact" }, tail: "and our Azure team will get back to you." },
};

const CONSULTATION = {
  eyebrow: "Get Started",
  heading: "Contact Us Today for a Free Azure Cloud Assessment",
  description: "No pressure, just understanding of where you're at and how we can help.",
  formTitle: "Get a Free Azure Health Check",
};

const SEO = {
  title: "Azure Managed Services | 24/7 Cloud Support by Mirketa",
  description:
    "Mirketa's Azure Managed Services cover monitoring, security, cost optimization, and disaster recovery, so your team can focus on your product instead of your infrastructure.",
  canonical: `https://www.mirketa.com${CLOUD_PAGES.AZURE.slug}/`,
  keywords: [
    "Azure Managed Services",
    "Azure Cloud Services",
    "Azure Cloud Management",
    "Azure Cloud Management Services",
    "Azure MSP",
    "Azure MSP Support",
    "Microsoft Azure Managed Services",
    "Azure Infrastructure Management",
    "Azure Monitoring Services",
    "Azure Cost Optimization",
    "Azure Security Management",
    "Azure Backup and Disaster Recovery",
    "Azure Cloud Support",
    "Azure Managed Cloud Services",
  ],
  schema: [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Azure Managed Services",
      provider: { "@type": "Organization", name: "Mirketa" },
      description: "Azure Managed Services covering cloud management, MSP support, infrastructure, security, cost optimization, and disaster recovery.",
      url: `https://www.mirketa.com${CLOUD_PAGES.AZURE.slug}/`,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.mirketa.com/" },
        { "@type": "ListItem", position: 2, name: "Azure Managed Services", item: `https://www.mirketa.com${CLOUD_PAGES.AZURE.slug}/` },
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

export default function AzureManagedServices() {
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

      gsap.utils.toArray(".azms-reveal").forEach((el) => {
        gsap.from(el, {
          y: 28,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 90%" },
        });
      });

      gsap.utils.toArray(".azms-reveal-stagger").forEach((group) => {
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
    <div className="azure-managed-services">
      <Seo {...SEO} />

      {/* ============ HERO ============ */}
      <section className="azms-hero" style={{ backgroundImage: `url("${Images.heroAzureManagedServices}")` }} aria-label="Azure Managed Services by Mirketa">
        <div className="azms-hero__scrim" />
        <div className="container">
          <Breadcrumb items={BREADCRUMB_ITEMS} className="azms-breadcrumb" />
          <div className="azms-hero__inner" ref={heroTextRef}>
            <span className="azms-badge">{HERO.badge}</span>
            <h1>{HERO.title}</h1>
            <p className="azms-hero__description">{HERO.description}</p>
            <div className="azms-hero__ctas">
              <a href={HERO.primaryCta.href} className="btn btn-primary azms-btn">
                {HERO.primaryCta.label}
              </a>
              <a href={HERO.secondaryCta.href} className="btn btn-secondary azms-btn">
                {HERO.secondaryCta.label}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============ WHY A DEDICATED TEAM ============ */}
      <section className="section azms-why-team" aria-labelledby="azms-why-team-heading">
        <div className="content-wrap">
          <div className="azms-section-heading azms-reveal">
            <h2 id="azms-why-team-heading">{WHY_DEDICATED_TEAM.heading}</h2>
            <p>{WHY_DEDICATED_TEAM.intro}</p>
          </div>
          <ul className="azms-check-list azms-reveal-stagger">
            {WHY_DEDICATED_TEAM.items.map((item) => (
              <li key={item}>
                <span aria-hidden="true">{Ico.check}</span>
                {item}
              </li>
            ))}
          </ul>
          <p className="azms-why-team__closing azms-reveal">{WHY_DEDICATED_TEAM.closing}</p>
          <div className="azms-inline-cta azms-reveal">
            <a href={WHY_DEDICATED_TEAM.cta.href} className="btn btn-outline-dark azms-btn">
              {WHY_DEDICATED_TEAM.cta.label}
            </a>
          </div>
        </div>
      </section>

      {/* ============ WHAT WE MANAGE ============ */}
      <section className="section azms-manage" aria-labelledby="azms-manage-heading">
        <div className="content-wrap">
          <div className="azms-section-heading azms-reveal">
            <h2 id="azms-manage-heading">{WHAT_WE_MANAGE.heading}</h2>
          </div>
          <div className="azms-manage__grid azms-reveal-stagger">
            {WHAT_WE_MANAGE.items.map((item) => (
              <div className="azms-manage-card" key={item.title}>
                <div className="azms-manage-card__icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
          <div className="azms-inline-cta azms-reveal">
            <h3 className="azms-inline-cta__heading">{WHAT_WE_MANAGE.cta.heading}</h3>
            <a href={WHAT_WE_MANAGE.cta.href} className="btn btn-primary azms-btn">
              {WHAT_WE_MANAGE.cta.label}
            </a>
          </div>
        </div>
      </section>

      {/* ============ WHY COMPANIES CHOOSE MIRKETA ============ */}
      <section className="section azms-why-mirketa" aria-labelledby="azms-why-mirketa-heading">
        <div className="content-wrap">
          <div className="azms-section-heading azms-reveal">
            <h2 id="azms-why-mirketa-heading">{WHY_MIRKETA.heading}</h2>
          </div>
          <ul className="azms-check-list azms-reveal-stagger">
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
      <section className="section azms-how" aria-labelledby="azms-how-heading">
        <div className="content-wrap">
          <div className="azms-section-heading azms-reveal">
            <h2 id="azms-how-heading">{HOW_IT_WORKS.heading}</h2>
          </div>
          <div className="azms-how__grid azms-reveal-stagger">
            {HOW_IT_WORKS.steps.map((step, i) => (
              <div className="azms-how-card" key={step.title}>
                <div className="azms-how-card__number">{String(i + 1).padStart(2, "0")}</div>
                <div className="azms-how-card__icon">{step.icon}</div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
          <div className="azms-inline-cta azms-reveal">
            <a href={HOW_IT_WORKS.cta.href} className="btn btn-primary azms-btn">
              {HOW_IT_WORKS.cta.label}
            </a>
          </div>
        </div>
      </section>

      {/* ============ SAAS / SALESFORCE FIT ============ */}
      <section className="section azms-saas-fit" aria-labelledby="azms-saas-fit-heading">
        <div className="content-wrap azms-reveal">
          <h2 id="azms-saas-fit-heading">{SAAS_FIT.heading}</h2>
          <p>{SAAS_FIT.paragraph}</p>
        </div>
      </section>

      {/* ============ CLOSING CTA ============ */}
      <section className="azms-closing-cta" aria-labelledby="azms-closing-cta-heading">
        <div className="content-wrap azms-closing-cta__inner azms-reveal">
          <h2 id="azms-closing-cta-heading">{CLOSING_CTA.heading}</h2>
          <p>{CLOSING_CTA.paragraph}</p>
          <a href={CLOSING_CTA.cta.href} className="btn btn-primary azms-btn">
            {CLOSING_CTA.cta.label}
          </a>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="section azms-faq" aria-labelledby="azms-faq-heading">
        <div className="content-wrap">
          <div className="azms-section-heading azms-reveal">
            <h2 id="azms-faq-heading">{FAQ.heading}</h2>
          </div>
          <FaqAccordion items={FAQ.items} className="azms-reveal" />
          <p className="azms-faq__closing azms-reveal">
            {FAQ.closing.text}{" "}
            <a href={FAQ.closing.cta.href} className="azms-faq__closing-link">
              {FAQ.closing.cta.label}
            </a>{" "}
            {FAQ.closing.tail}
          </p>
        </div>
      </section>

      <ConsultationSection {...CONSULTATION} />
    </div>
  );
}
