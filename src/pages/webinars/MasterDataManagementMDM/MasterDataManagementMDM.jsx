import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Seo from "../../../components/Seo/Seo.jsx";
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb.jsx";
import ConsultationSection from "../../../components/ConsultationSection/ConsultationSection.jsx";
import { post as webinarMeta } from "../../../blog/posts/master-data-management-mdm.js";
import { post as nonprofitDataWebinar } from "../../../blog/posts/mastering-data-management-nonprofit-organizations.js";
import { post as dataFoundationBlog } from "../../../blog/posts/enterprise-customer-success-unified-data-foundation.js";
import { parseYouTubeUrl } from "../../../utils/youtube.js";
import { getPostHref } from "../../../blog/blogUtils.js";
import { PRODUCT_PAGES } from "../../../config/pageSlugs.js";
import "./MasterDataManagementMDM.css";

gsap.registerPlugin(ScrollTrigger);

// ============================================================
// DATA
// The intro paragraph (including the Mukesh Ambani quote) is the
// user's own supplied content, used verbatim. The "What You'll Learn"
// topics reproduce the video's own real, published YouTube
// description — a genuine 6-item topic list — not invented content.
// No speaker, date, or statistic beyond what was given/verified is
// added anywhere on this page, so no Speakers section is included.
//
// Title, excerpt, and video/thumbnail come from webinarMeta
// (src/blog/posts/master-data-management-mdm.js) — the same object
// every listing card (Homepage Latest Insights, /insights, /blog,
// related content) reads through, so this page and its own card
// everywhere else can never drift out of sync.
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

// The user's supplied introduction, reproduced verbatim.
const OVERVIEW_PARAGRAPH =
  "As business tycoon Mr. Mukesh Ambani says, ‘Data is the new oil’ and quality data acts as a driver of high productivity and good decision making. Data volume is growing rapidly through data collection at various points, but the quality is somewhat compromised, posing serious questions on the sanctity of databases. Though it may seem a trivial issue, it has a huge and lasting impact on businesses.";

const Ico = {
  intro: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 16v-4M12 8h.01" /></svg>
  ),
  why: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 18h6M10 21h4M12 3a6 6 0 00-3.5 10.9c.4.3.5.7.5 1.1v.5h6v-.5c0-.4.1-.8.5-1.1A6 6 0 0012 3z" /></svg>
  ),
  steps: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 6h16M4 12h10M4 18h6" /></svg>
  ),
  architecture: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M4 10h16M10 4v16" /></svg>
  ),
  duplicate: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="5" y="7" width="11" height="13" rx="2" /><path d="M9 7V5a2 2 0 012-2h8a2 2 0 012 2v11a2 2 0 01-2 2h-2" /></svg>
  ),
  salesforce: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M17.5 19a4.5 4.5 0 000-9 5.5 5.5 0 00-10.6-1.6A4 4 0 003 12.4" /><path d="M12 15v5M9 18h6" /></svg>
  ),
  play: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
  ),
};

// Reproduces the video's own real 6-item topic list.
const TOPIC_CARDS = [
  {
    icon: Ico.intro,
    title: "What Is Master Data Management (MDM)",
    description: "An introduction to what Master Data Management actually is.",
  },
  {
    icon: Ico.why,
    title: "Why Use MDM",
    description: "Why organizations adopt Master Data Management in the first place.",
  },
  {
    icon: Ico.steps,
    title: "Steps for Implementing MDM in Your Organization",
    description: "A practical look at how to roll out MDM step by step.",
  },
  {
    icon: Ico.architecture,
    title: "Architecture Models of MDM",
    description: "An overview of common MDM architecture models.",
  },
  {
    icon: Ico.duplicate,
    title: "Data Duplicity Issues and How to Mitigate Them",
    description: "Why duplicate data is a problem, and ways to address it.",
  },
  {
    icon: Ico.salesforce,
    title: "Deduplication Tools for Salesforce CRM",
    description: "How dedicated deduplication tools help keep Salesforce CRM data clean.",
  },
];

const RELATED_CONTENT = [
  {
    label: "Webinar",
    title: nonprofitDataWebinar.title,
    description: nonprofitDataWebinar.excerpt,
    href: getPostHref(nonprofitDataWebinar),
  },
  {
    label: "Product",
    title: PRODUCT_PAGES.DUPLICATE_SEARCH_MERGE.label,
    description: "Find and merge duplicate records in Salesforce CRM automatically.",
    href: PRODUCT_PAGES.DUPLICATE_SEARCH_MERGE.slug,
  },
  {
    label: "Capability",
    title: "AI Data Foundations",
    description: "Building the data foundation your organization needs before scaling AI.",
    href: "/ai-data-foundations",
  },
  {
    label: "Blog",
    title: dataFoundationBlog.title,
    description: dataFoundationBlog.excerpt,
    href: getPostHref(dataFoundationBlog),
  },
  {
    label: "Service",
    title: "AI Consulting",
    description: "Mirketa's AI consulting services for organizations building on clean, reliable data.",
    href: "/ai-consulting",
  },
];

const SEO = {
  title: "Webinar: Master Data Management (MDM) | Mirketa",
  description:
    "Watch Mirketa's on-demand Master Data Management (MDM) webinar — what MDM is, why it matters, implementation steps, architecture models, and deduplication for Salesforce CRM.",
  canonical: "https://www.mirketa.com/webinars/master-data-management-mdm/",
  keywords: ["master data management webinar", "what is MDM", "MDM architecture models", "Salesforce data deduplication", "Mirketa webinar"],
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
        { "@type": "ListItem", position: 2, name: webinarMeta.title, item: "https://www.mirketa.com/webinars/master-data-management-mdm/" },
      ],
    },
  ],
};

const CONSULTATION = {
  eyebrow: "Get Started",
  heading: "Ready to Get Your Master Data Under Control?",
  description: "Talk to Mirketa about building a Master Data Management strategy and keeping your Salesforce data clean.",
  formTitle: "Talk to an Expert",
};

// ============================================================
// PAGE
// ============================================================
export default function MasterDataManagementMDM() {
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

      gsap.utils.toArray(".mdm-reveal").forEach((el) => {
        gsap.from(el, {
          y: 32,
          opacity: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      gsap.utils.toArray(".mdm-reveal-stagger").forEach((group) => {
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
    <div className="mdm-page">
      <Seo {...SEO} />
      <HeroSection textRef={heroTextRef} />
      <VideoSection />
      <OverviewSection />
      <TopicsSection />
      <RelatedSection />
      <ConsultationSection {...CONSULTATION} />
    </div>
  );
}

// ================= HERO =================
function HeroSection({ textRef }) {
  return (
    <section className="mdm-hero" aria-label="Webinar introduction">
      <div className="container">
        <Breadcrumb items={BREADCRUMB_ITEMS} className="mdm-breadcrumb breadcrumb--dark" />
      </div>
      <div className="container mdm-hero__inner">
        <div className="mdm-hero__text" ref={textRef}>
          <span className="mdm-badge">{HERO.badge}</span>
          <h1>{HERO.title}</h1>
          <p className="mdm-hero__paragraph">{HERO.paragraph}</p>
          <div className="mdm-hero__ctas">
            <a href={HERO.primaryCta.href} className="btn btn-primary mdm-btn">
              {Ico.play}
              {HERO.primaryCta.label}
            </a>
            <Link to={HERO.secondaryCta.href} className="btn btn-outline-dark mdm-btn">
              {HERO.secondaryCta.label}
            </Link>
          </div>
        </div>

        <a href="#video" className="mdm-hero__thumb" aria-label={`Watch: ${HERO.title}`}>
          <img src={webinarMeta.featuredImage} alt={`Webinar preview: ${HERO.title}`} loading="eager" />
          <span className="mdm-hero__play" aria-hidden="true">
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
    <section className="section mdm-video" id="video" aria-labelledby="mdm-video-heading">
      <div className="content-wrap">
        <div className="mdm-section-head mdm-section-head--center mdm-reveal">
          <h2 id="mdm-video-heading">Watch the Full Webinar</h2>
          <p>Master Data Management for clean, reliable business data, on demand.</p>
        </div>
        <div className="mdm-video__frame mdm-reveal">
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
    <section className="section" aria-labelledby="mdm-overview-heading">
      <div className="content-wrap mdm-overview">
        <div className="mdm-section-head mdm-reveal">
          <h2 id="mdm-overview-heading">Webinar Overview</h2>
          <p>{OVERVIEW_PARAGRAPH}</p>
        </div>
      </div>
    </section>
  );
}

// ================= WHAT YOU'LL LEARN =================
function TopicsSection() {
  return (
    <section className="section mdm-topics" aria-labelledby="mdm-topics-heading">
      <div className="content-wrap">
        <div className="mdm-section-head mdm-section-head--center mdm-reveal">
          <h2 id="mdm-topics-heading">What You'll Learn</h2>
          <p>The topics covered in this webinar.</p>
        </div>
        <div className="mdm-topics-grid mdm-reveal-stagger">
          {TOPIC_CARDS.map((card) => (
            <div className="mdm-topic-card" key={card.title}>
              <div className="mdm-topic-icon">{card.icon}</div>
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
    <section className="section mdm-related" aria-labelledby="mdm-related-heading">
      <div className="content-wrap">
        <div className="mdm-section-head mdm-section-head--center mdm-reveal">
          <h2 id="mdm-related-heading">Related Content</h2>
          <p>More resources on data management, data quality, and Salesforce.</p>
        </div>
        <div className="mdm-related-grid mdm-reveal-stagger">
          {RELATED_CONTENT.map((item) => (
            <Link to={item.href} className="mdm-related-card" key={item.title}>
              <span className="mdm-related-label">{item.label}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <span className="mdm-related-link">
                Learn more <span aria-hidden="true">&rarr;</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
