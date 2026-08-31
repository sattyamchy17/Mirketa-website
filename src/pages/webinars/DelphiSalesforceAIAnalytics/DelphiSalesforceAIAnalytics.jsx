import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Seo from "../../../components/Seo/Seo.jsx";
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb.jsx";
import ConsultationSection from "../../../components/ConsultationSection/ConsultationSection.jsx";
import { post as webinarMeta } from "../../../blog/posts/delphi-salesforce-ai-analytics.js";
import { post as mlWebinar } from "../../../blog/posts/how-machine-learning-works.js";
import { post as agentforceGuide } from "../../../blog/posts/salesforce-agentforce-implementation-enterprise-guide.js";
import { post as dataCloudAgentforce } from "../../../blog/posts/data-cloud-for-agentforce.js";
import { parseYouTubeUrl } from "../../../utils/youtube.js";
import { getPostHref } from "../../../blog/blogUtils.js";
import "./DelphiSalesforceAIAnalytics.css";

gsap.registerPlugin(ScrollTrigger);

// ============================================================
// DATA
// Title, overview paragraph, and the 4 highlights below are the
// content supplied for this webinar, used as given (light formatting
// cleanup only — e.g. "closed date" -> "close date", the standard
// CRM term). No speaker, date, statistic, or claim beyond what was
// given is added anywhere on this page, so no Speakers section or
// timestamped agenda is included.
//
// Title, excerpt, and video/thumbnail come from webinarMeta
// (src/blog/posts/delphi-salesforce-ai-analytics.js) — the same
// object every listing card (Homepage Latest Insights, /insights,
// /blog, related content) reads through, so this page and its own
// card everywhere else can never drift out of sync.
// ============================================================

const YOUTUBE = parseYouTubeUrl(webinarMeta.videoUrl);

const BREADCRUMB_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Webinar" },
  { label: webinarMeta.title },
];

const HERO = {
  badge: "On-Demand Webinar",
  title: webinarMeta.title,
  paragraph: webinarMeta.excerpt,
  primaryCta: { label: "Watch Webinar", href: "#video" },
  secondaryCta: { label: "Talk to an Expert", href: "/company/contact" },
};

const OVERVIEW_PARAGRAPH = webinarMeta.excerpt;

const Ico = {
  priority: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 6h16M4 12h10M4 18h6" /></svg>
  ),
  calendar: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
  ),
  amount: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 7v10M9.5 9.5c0-1.4 1.1-2.5 2.5-2.5s2.5 1 2.5 2c0 2-5 1.5-5 3.5 0 1 1.1 2 2.5 2s2.5-1.1 2.5-2.5" /></svg>
  ),
  recommend: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 18h6M10 21h4M12 3a6 6 0 00-3.5 10.9c.4.3.5.7.5 1.1v.5h6v-.5c0-.4.1-.8.5-1.1A6 6 0 0012 3z" /></svg>
  ),
  play: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
  ),
};

// Reproduces the 4 given highlights, lightly cleaned up for formatting.
const HIGHLIGHT_CARDS = [
  {
    icon: Ico.priority,
    title: "Open Opportunity Prioritization",
    description: "Surfaces which open opportunities deserve the most attention.",
  },
  {
    icon: Ico.calendar,
    title: "Forecasted Close Date",
    description: "Predicts when an open opportunity is likely to close.",
  },
  {
    icon: Ico.amount,
    title: "Forecasted Opportunity Amount",
    description: "Predicts the likely value of an open opportunity.",
  },
  {
    icon: Ico.recommend,
    title: "Sales Rep Recommendations",
    description: "Gives sales reps recommendations for their open opportunities.",
  },
];

const RELATED_CONTENT = [
  {
    label: "Webinar",
    title: mlWebinar.title,
    description: mlWebinar.excerpt,
    href: getPostHref(mlWebinar),
  },
  {
    label: "Solution",
    title: "Salesforce Clouds",
    description: "Explore Mirketa's Salesforce implementation and consulting services.",
    href: "/salesforce",
  },
  {
    label: "Service",
    title: "AI Consulting",
    description: "Mirketa's AI consulting services for Salesforce and beyond.",
    href: "/ai-consulting",
  },
  {
    label: "Blog",
    title: agentforceGuide.title,
    description: agentforceGuide.excerpt,
    href: getPostHref(agentforceGuide),
  },
  {
    label: "Blog",
    title: dataCloudAgentforce.title,
    description: dataCloudAgentforce.excerpt,
    href: getPostHref(dataCloudAgentforce),
  },
];

const SEO = {
  title: "Webinar: Delphi — AI-Based Sales, Service & Marketing Analytics for Salesforce | Mirketa",
  description:
    "Watch Mirketa's on-demand webinar on Delphi, a Salesforce AppExchange app that uses AI and machine learning for sales, service, and marketing analytics.",
  canonical: "https://www.mirketa.com/webinars/delphi-salesforce-ai-analytics/",
  keywords: ["Delphi Salesforce app", "AI sales analytics Salesforce", "Salesforce AppExchange AI", "opportunity forecasting Salesforce", "Mirketa webinar"],
  schema: [
    {
      "@context": "https://schema.org",
      "@type": "VideoObject",
      name: webinarMeta.title,
      description: OVERVIEW_PARAGRAPH,
      thumbnailUrl: [webinarMeta.featuredImage],
      uploadDate: webinarMeta.publishedDate,
      contentUrl: YOUTUBE.watchUrl,
      embedUrl: YOUTUBE.embedUrl,
      publisher: { "@type": "Organization", name: "Mirketa Inc" },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.mirketa.com/" },
        { "@type": "ListItem", position: 2, name: webinarMeta.title, item: "https://www.mirketa.com/webinars/delphi-salesforce-ai-analytics/" },
      ],
    },
  ],
};

const CONSULTATION = {
  eyebrow: "Get Started",
  heading: "Want AI-Powered Analytics Inside Your Salesforce Org?",
  description: "Talk to Mirketa about bringing AI-based sales, service, and marketing analytics into your Salesforce implementation.",
  formTitle: "Talk to an Expert",
};

// ============================================================
// PAGE
// ============================================================
export default function DelphiSalesforceAIAnalytics() {
  const heroTextRef = useRef(null);

  // Light-background hero — same override every other light-hero page
  // on the site relies on (see Header.css ".has-light-hero").
  useEffect(() => {
    document.documentElement.classList.add("has-light-hero");
    return () => document.documentElement.classList.remove("has-light-hero");
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.from(heroTextRef.current.children, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
      });

      gsap.utils.toArray(".dsa-reveal").forEach((el) => {
        gsap.from(el, {
          y: 32,
          opacity: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      gsap.utils.toArray(".dsa-reveal-stagger").forEach((group) => {
        gsap.from(group.children, {
          y: 24,
          opacity: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: { trigger: group, start: "top 88%" },
        });
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="dsa-page">
      <Seo {...SEO} />
      <HeroSection textRef={heroTextRef} />
      <VideoSection />
      <OverviewSection />
      <HighlightsSection />
      <RelatedSection />
      <ConsultationSection {...CONSULTATION} />
    </div>
  );
}

// ================= HERO =================
function HeroSection({ textRef }) {
  return (
    <section className="dsa-hero" aria-label="Webinar introduction">
      <div className="container">
        <Breadcrumb items={BREADCRUMB_ITEMS} className="dsa-breadcrumb breadcrumb--dark" />
      </div>
      <div className="container dsa-hero__inner">
        <div className="dsa-hero__text" ref={textRef}>
          <span className="dsa-badge">{HERO.badge}</span>
          <h1>{HERO.title}</h1>
          <p className="dsa-hero__paragraph">{HERO.paragraph}</p>
          <div className="dsa-hero__ctas">
            <a href={HERO.primaryCta.href} className="btn btn-primary dsa-btn">
              {Ico.play}
              {HERO.primaryCta.label}
            </a>
            <Link to={HERO.secondaryCta.href} className="btn btn-outline-dark dsa-btn">
              {HERO.secondaryCta.label}
            </Link>
          </div>
        </div>

        <a href="#video" className="dsa-hero__thumb" aria-label={`Watch: ${HERO.title}`}>
          <img src={webinarMeta.featuredImage} alt={`Webinar preview: ${HERO.title}`} loading="eager" />
          <span className="dsa-hero__play" aria-hidden="true">
            {Ico.play}
          </span>
        </a>
      </div>
    </section>
  );
}

// ================= VIDEO =================
function VideoSection() {
  return (
    <section className="section dsa-video" id="video" aria-labelledby="dsa-video-heading">
      <div className="content-wrap">
        <div className="dsa-section-head dsa-section-head--center dsa-reveal">
          <h2 id="dsa-video-heading">Watch the Full Webinar</h2>
          <p>Delphi's AI-based sales, service, and marketing analytics for Salesforce, on demand.</p>
        </div>
        <div className="dsa-video__frame dsa-reveal">
          <iframe
            src={`${YOUTUBE.embedUrl}${YOUTUBE.embedUrl.includes("?") ? "&" : "?"}rel=0`}
            title={HERO.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}

// ================= OVERVIEW =================
function OverviewSection() {
  return (
    <section className="section" aria-labelledby="dsa-overview-heading">
      <div className="content-wrap dsa-overview">
        <div className="dsa-section-head dsa-reveal">
          <h2 id="dsa-overview-heading">Webinar Overview</h2>
          <p>{OVERVIEW_PARAGRAPH}</p>
        </div>
      </div>
    </section>
  );
}

// ================= HIGHLIGHTS =================
function HighlightsSection() {
  return (
    <section className="section dsa-highlights" aria-labelledby="dsa-highlights-heading">
      <div className="content-wrap">
        <div className="dsa-section-head dsa-section-head--center dsa-reveal">
          <h2 id="dsa-highlights-heading">Key Highlights Covered in This Webinar</h2>
          <p>The major highlights of Delphi covered in the webinar.</p>
        </div>
        <div className="dsa-highlights-grid dsa-reveal-stagger">
          {HIGHLIGHT_CARDS.map((card) => (
            <div className="dsa-highlight-card" key={card.title}>
              <div className="dsa-highlight-icon">{card.icon}</div>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ================= RELATED CONTENT =================
function RelatedSection() {
  return (
    <section className="section dsa-related" aria-labelledby="dsa-related-heading">
      <div className="content-wrap">
        <div className="dsa-section-head dsa-section-head--center dsa-reveal">
          <h2 id="dsa-related-heading">Related Content</h2>
          <p>More resources on AI, machine learning, and Salesforce.</p>
        </div>
        <div className="dsa-related-grid dsa-reveal-stagger">
          {RELATED_CONTENT.map((item) => (
            <Link to={item.href} className="dsa-related-card" key={item.title}>
              <span className="dsa-related-label">{item.label}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <span className="dsa-related-link">
                Learn more <span aria-hidden="true">&rarr;</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
