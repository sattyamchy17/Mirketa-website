import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Seo from "../../../components/Seo/Seo.jsx";
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb.jsx";
import ConsultationSection from "../../../components/ConsultationSection/ConsultationSection.jsx";
import { post as webinarMeta } from "../../../blog/posts/mastering-data-management-nonprofit-organizations.js";
import { post as digitalTransformationWebinar } from "../../../blog/posts/digital-transformation-for-nonprofits.js";
import { post as mdmWebinar } from "../../../blog/posts/master-data-management-mdm.js";
import { parseYouTubeUrl } from "../../../utils/youtube.js";
import "./MasteringDataManagementNonprofit.css";

gsap.registerPlugin(ScrollTrigger);

// ============================================================
// DATA
// Every fact below comes from the webinar content supplied for
// this page. No date, speaker, or agenda was provided, so this
// page deliberately omits a Speakers section and a timestamped
// agenda rather than inventing either — it uses "On-Demand
// Webinar" framing instead of a fabricated live date. The two
// source paragraphs are reproduced in full in the Overview
// section; the "What You'll Learn" cards and data-type pills
// only reorganize phrases already present in that source text
// (the four framework components named in paragraph two, and the
// four nonprofit data types named in paragraph one) — nothing new
// is claimed about any of them.
//
// Title, excerpt, and video/thumbnail all come from webinarMeta
// (src/blog/posts/mastering-data-management-nonprofit-organizations.js)
// — the same object every listing card (Homepage Latest Insights,
// /insights, /blog, related content) reads through, so this page and
// its own card everywhere else can never drift out of sync.
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

const OVERVIEW_PARAGRAPHS = [
  "We hosted a webinar on Data Management Best Practices tailored specifically for nonprofit organizations. In today's data-driven world, nonprofits face unique challenges in effectively managing and leveraging their data to drive impact and achieve their mission. Whether you're dealing with donor information, volunteer data, program outcomes, or operational metrics, having a robust data management strategy is crucial for success.",
  "In this webinar, we share practical insights and strategies to help your nonprofit organization optimize its data management practices. We explore the key components of a successful data management framework, including data collection, storage, quality assurance, and analysis. Gain valuable tips and techniques to streamline your data processes, improve data accuracy, and unlock the hidden potential within your organization's data.",
];

const DATA_TYPES = ["Donor Information", "Volunteer Data", "Program Outcomes", "Operational Metrics"];

const Ico = {
  collect: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 7l8-4 8 4-8 4-8-4z" /><path d="M4 12l8 4 8-4M4 17l8 4 8-4" /></svg>
  ),
  storage: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><ellipse cx="12" cy="5" rx="8" ry="3" /><path d="M4 5v14c0 1.66 3.58 3 8 3s8-1.34 8-3V5" /><path d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3" /></svg>
  ),
  quality: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 12l2 2 4-4" /><circle cx="12" cy="12" r="9" /></svg>
  ),
  analysis: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 19V5M10 19v-9M16 19V9M4 19h16" /></svg>
  ),
  play: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
  ),
};

const LEARN_CARDS = [
  {
    icon: Ico.collect,
    title: "Data Collection",
    description: "Capturing donor information, volunteer data, program outcomes, and operational metrics accurately from the start.",
  },
  {
    icon: Ico.storage,
    title: "Data Storage",
    description: "Organizing and safeguarding your nonprofit's data so it stays accessible when you need it.",
  },
  {
    icon: Ico.quality,
    title: "Data Quality Assurance",
    description: "Improving data accuracy so your team can trust what the numbers are telling them.",
  },
  {
    icon: Ico.analysis,
    title: "Data Analysis",
    description: "Unlocking the hidden potential within your organization's data to drive impact and achieve your mission.",
  },
];

const RELATED_CONTENT = [
  {
    label: "Webinar",
    title: mdmWebinar.title,
    description: mdmWebinar.excerpt,
    href: mdmWebinar.href,
  },
  {
    label: "Webinar",
    title: digitalTransformationWebinar.title,
    description: digitalTransformationWebinar.excerpt,
    href: digitalTransformationWebinar.href,
  },
  {
    label: "AI Solution",
    title: "ALTRUTA — AI Nonprofit Suite",
    description: "Mirketa's AI-powered suite built specifically for nonprofit operations.",
    href: "/altruta-ai",
  },
  {
    label: "Case Study",
    title: "NetSuite for Nonprofit Organizations: Optimizing Donor Engagement",
    description: "How a nonprofit used NetSuite to strengthen donor engagement.",
    href: "/blog/netsuite-donor-engagement-nonprofit-youth-education",
  },
  {
    label: "Case Study",
    title: "NetSuite ERP: Streamlining Grant Management for a Nonprofit",
    description: "A real nonprofit's approach to simplifying grant management with NetSuite ERP.",
    href: "/blog/netsuite-erp-grant-management-nonprofit-healthcare",
  },
  {
    label: "Solution",
    title: "Salesforce Nonprofit Cloud",
    description: "Explore how Mirketa helps nonprofits run on Salesforce Nonprofit Cloud.",
    href: "/salesforce#nonprofit-cloud",
  },
  {
    label: "Capability",
    title: "AI Data Foundations",
    description: "Building the data foundation your organization needs before scaling AI.",
    href: "/ai-data-foundations",
  },
];

const SEO = {
  title: "Webinar: Mastering Data Management for Nonprofits | Mirketa",
  description:
    "Watch Mirketa's on-demand webinar on data management best practices for nonprofit organizations — covering data collection, storage, quality assurance, and analysis.",
  canonical: "https://www.mirketa.com/webinars/mastering-data-management-nonprofit-organizations/",
  keywords: [
    "nonprofit data management webinar",
    "nonprofit data best practices",
    "donor data management",
    "nonprofit data strategy",
    "Mirketa webinar",
  ],
  schema: [
    {
      "@context": "https://schema.org",
      "@type": "VideoObject",
      name: webinarMeta.title,
      description: OVERVIEW_PARAGRAPHS[0],
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
        { "@type": "ListItem", position: 2, name: "Mastering Data Management for Nonprofits", item: "https://www.mirketa.com/webinars/mastering-data-management-nonprofit-organizations/" },
      ],
    },
  ],
};

const CONSULTATION = {
  eyebrow: "Get Started",
  heading: "Want Help Applying This to Your Nonprofit?",
  description: "Talk to Mirketa about building a data management strategy for your organization's donor, volunteer, program, and operational data.",
  formTitle: "Talk to an Expert",
};

// ============================================================
// PAGE
// ============================================================
export default function MasteringDataManagementNonprofit() {
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

      gsap.utils.toArray(".wbn-reveal").forEach((el) => {
        gsap.from(el, {
          y: 32,
          opacity: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      gsap.utils.toArray(".wbn-reveal-stagger").forEach((group) => {
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
    <div className="wbn-page">
      <Seo {...SEO} />
      <HeroSection textRef={heroTextRef} />
      <VideoSection />
      <OverviewSection />
      <LearnSection />
      <RelatedSection />
      <ConsultationSection {...CONSULTATION} />
    </div>
  );
}

// ================= HERO =================
function HeroSection({ textRef }) {
  return (
    <section className="wbn-hero" aria-label="Webinar introduction">
      <div className="container">
        <Breadcrumb items={BREADCRUMB_ITEMS} className="wbn-breadcrumb breadcrumb--dark" />
      </div>
      <div className="container wbn-hero__inner">
        <div className="wbn-hero__text" ref={textRef}>
          <span className="wbn-badge">{HERO.badge}</span>
          <h1>{HERO.title}</h1>
          <p className="wbn-hero__paragraph">{HERO.paragraph}</p>
          <div className="wbn-hero__ctas">
            <a href={HERO.primaryCta.href} className="btn btn-primary wbn-btn">
              {Ico.play}
              {HERO.primaryCta.label}
            </a>
            <Link to={HERO.secondaryCta.href} className="btn btn-outline-dark wbn-btn">
              {HERO.secondaryCta.label}
            </Link>
          </div>
        </div>

        <a href="#video" className="wbn-hero__thumb" aria-label={`Watch: ${HERO.title}`}>
          <img src={webinarMeta.featuredImage} alt={`Webinar preview: ${HERO.title}`} loading="eager" />
          <span className="wbn-hero__play" aria-hidden="true">
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
    <section className="section wbn-video" id="video" aria-labelledby="wbn-video-heading">
      <div className="content-wrap">
        <div className="wbn-section-head wbn-section-head--center wbn-reveal">
          <h2 id="wbn-video-heading">Watch the Full Webinar</h2>
          <p>Data management best practices for nonprofit organizations, on demand.</p>
        </div>
        <div className="wbn-video__frame wbn-reveal">
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
    <section className="section" aria-labelledby="wbn-overview-heading">
      <div className="content-wrap wbn-overview">
        <div className="wbn-section-head wbn-reveal">
          <h2 id="wbn-overview-heading">Webinar Overview</h2>
          {OVERVIEW_PARAGRAPHS.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <div className="wbn-datatypes wbn-reveal-stagger">
          {DATA_TYPES.map((t) => (
            <span className="wbn-datatype-pill" key={t}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ================= WHAT YOU'LL LEARN =================
function LearnSection() {
  return (
    <section className="section wbn-learn" aria-labelledby="wbn-learn-heading">
      <div className="content-wrap">
        <div className="wbn-section-head wbn-section-head--center wbn-reveal">
          <h2 id="wbn-learn-heading">What You'll Learn</h2>
          <p>The key components of a successful nonprofit data management framework covered in this webinar.</p>
        </div>
        <div className="wbn-learn-grid wbn-reveal-stagger">
          {LEARN_CARDS.map((card) => (
            <div className="wbn-learn-card" key={card.title}>
              <div className="wbn-learn-icon">{card.icon}</div>
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
    <section className="section wbn-related" aria-labelledby="wbn-related-heading">
      <div className="content-wrap">
        <div className="wbn-section-head wbn-section-head--center wbn-reveal">
          <h2 id="wbn-related-heading">Related Content</h2>
          <p>More resources on data, AI, and technology for nonprofit organizations.</p>
        </div>
        <div className="wbn-related-grid wbn-reveal-stagger">
          {RELATED_CONTENT.map((item) => (
            <Link to={item.href} className="wbn-related-card" key={item.title}>
              <span className="wbn-related-label">{item.label}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <span className="wbn-related-link">
                Learn more <span aria-hidden="true">&rarr;</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
