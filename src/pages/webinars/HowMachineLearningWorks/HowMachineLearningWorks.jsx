import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Seo from "../../../components/Seo/Seo.jsx";
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb.jsx";
import ConsultationSection from "../../../components/ConsultationSection/ConsultationSection.jsx";
import { post as webinarMeta } from "../../../blog/posts/how-machine-learning-works.js";
import { post as agentforceGuide } from "../../../blog/posts/salesforce-agentforce-implementation-enterprise-guide.js";
import { post as dataCloudAgentforce } from "../../../blog/posts/data-cloud-for-agentforce.js";
import { post as delphiWebinar } from "../../../blog/posts/delphi-salesforce-ai-analytics.js";
import { parseYouTubeUrl } from "../../../utils/youtube.js";
import { getPostHref } from "../../../blog/blogUtils.js";
import "./HowMachineLearningWorks.css";

gsap.registerPlugin(ScrollTrigger);

// ============================================================
// DATA
// No written recap was supplied for this webinar — only the real video
// URL. Its own real, published YouTube description (fetched and
// verified directly from the video) contains a genuine intro and a
// real 6-item topic list, reproduced below lightly cleaned up for
// formatting (removing a duplicated/SEO-stuffed title and a couple of
// stray typos) but with no change to what it actually says. No
// statistic, speaker, date, or quote is invented anywhere on this
// page. No Speakers section is included — none was given.
//
// Title, excerpt, and video/thumbnail come from webinarMeta
// (src/blog/posts/how-machine-learning-works.js) — the same object
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

// Reproduces the video's own real description, lightly cleaned up.
const OVERVIEW_PARAGRAPHS = [
  "Machine learning is a form of artificial intelligence that allows computers to enter a mode of self-learning. When exposed to new facts, these programs are able to learn, grow, change, and develop.",
  "Put directly, the iterative aspect of machine learning is its ability to adapt to new data independently. This is possible because programs learn from preceding computations and use pattern recognition to produce reliable results.",
];

const Ico = {
  brain: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 3a3 3 0 00-3 3v1a3 3 0 000 6v1a3 3 0 003 3M15 3a3 3 0 013 3v1a3 3 0 010 6v1a3 3 0 01-3 3M9 3v18M15 3v18" /></svg>
  ),
  growth: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 17l6-6 4 4 8-8M21 7v6M21 7h-6" /></svg>
  ),
  check: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 12l2 2 4-4" /><circle cx="12" cy="12" r="9" /></svg>
  ),
  gears: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 00.3 1.9l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.9-.3 1.7 1.7 0 00-1 1.5V21a2 2 0 11-4 0v-.1a1.7 1.7 0 00-1-1.6 1.7 1.7 0 00-1.9.3l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1.7 1.7 0 00.3-1.9 1.7 1.7 0 00-1.5-1H3a2 2 0 110-4h.1a1.7 1.7 0 001.5-1 1.7 1.7 0 00-.3-1.9l-.1-.1a2 2 0 112.8-2.8l.1.1a1.7 1.7 0 001.9.3H9a1.7 1.7 0 001-1.5V3a2 2 0 114 0v.1a1.7 1.7 0 001 1.5 1.7 1.7 0 001.9-.3l.1-.1a2 2 0 112.8 2.8l-.1.1a1.7 1.7 0 00-.3 1.9V9a1.7 1.7 0 001.5 1H21a2 2 0 110 4h-.1a1.7 1.7 0 00-1.5 1z" /></svg>
  ),
  build: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M14.7 6.3a4 4 0 015.7 5.4l-7.4 7.4a2 2 0 01-2.8 0l-3.3-3.3a2 2 0 010-2.8l7.4-7.4a4 4 0 010 5.7" /><path d="M4 20l3-1 1-3" /></svg>
  ),
  salesforce: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M17.5 19a4.5 4.5 0 000-9 5.5 5.5 0 00-10.6-1.6A4 4 0 003 12.4" /><path d="M12 15v5M9 18h6" /></svg>
  ),
  play: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
  ),
};

// Reproduces the real 6-item topic list from the video's own description.
const TOPIC_CARDS = [
  {
    icon: Ico.brain,
    title: "How It Relates to AI and Deep Learning",
    description: "See where machine learning fits within the broader fields of artificial intelligence and deep learning.",
  },
  {
    icon: Ico.growth,
    title: "Why Machine Learning — and Its Business Impact",
    description: "Understand why organizations invest in machine learning and the kind of business impact it can have.",
  },
  {
    icon: Ico.check,
    title: "Does Machine Learning Actually Work?",
    description: "Look at whether machine learning delivers on its promise in real-world use.",
  },
  {
    icon: Ico.gears,
    title: "How Machine Learning Works",
    description: "Walk through the mechanics of how a machine learning model actually learns from data.",
  },
  {
    icon: Ico.build,
    title: "How to Develop Machine Learning Applications",
    description: "Get a practical look at what goes into building a machine learning application.",
  },
  {
    icon: Ico.salesforce,
    title: "Machine Learning and Salesforce",
    description: "See how machine learning capabilities show up inside the Salesforce platform.",
  },
];

const RELATED_CONTENT = [
  {
    label: "Webinar",
    title: delphiWebinar.title,
    description: delphiWebinar.excerpt,
    href: getPostHref(delphiWebinar),
  },
  {
    label: "Service",
    title: "AI Consulting",
    description: "Mirketa's AI consulting services for organizations exploring machine learning and AI.",
    href: "/ai-consulting",
  },
  {
    label: "Assessment",
    title: "AI Readiness",
    description: "Find out how prepared your organization is to adopt AI and machine learning.",
    href: "/ai-readiness",
  },
  {
    label: "Solution",
    title: "Agentic Orchestration",
    description: "Explore how Mirketa builds orchestrated AI agent workflows for the enterprise.",
    href: "/agentic-orchestration",
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
  title: "Webinar: How Machine Learning Works | Mirketa",
  description:
    "Watch Mirketa's on-demand webinar on how machine learning works — what it is, how it relates to AI, and how it's applied in business and in Salesforce.",
  canonical: "https://www.mirketa.com/webinars/how-machine-learning-works/",
  keywords: ["how machine learning works", "what is machine learning", "machine learning webinar", "machine learning and Salesforce", "Mirketa webinar"],
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
        { "@type": "ListItem", position: 2, name: webinarMeta.title, item: "https://www.mirketa.com/webinars/how-machine-learning-works/" },
      ],
    },
  ],
};

const CONSULTATION = {
  eyebrow: "Get Started",
  heading: "Curious How Machine Learning Fits Your Business?",
  description: "Talk to Mirketa about where machine learning and AI can realistically add value to your organization.",
  formTitle: "Talk to an Expert",
};

// ============================================================
// PAGE
// ============================================================
export default function HowMachineLearningWorks() {
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

      gsap.utils.toArray(".hml-reveal").forEach((el) => {
        gsap.from(el, {
          y: 32,
          opacity: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      gsap.utils.toArray(".hml-reveal-stagger").forEach((group) => {
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
    <div className="hml-page">
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
    <section className="hml-hero" aria-label="Webinar introduction">
      <div className="container">
        <Breadcrumb items={BREADCRUMB_ITEMS} className="hml-breadcrumb breadcrumb--dark" />
      </div>
      <div className="container hml-hero__inner">
        <div className="hml-hero__text" ref={textRef}>
          <span className="hml-badge">{HERO.badge}</span>
          <h1>{HERO.title}</h1>
          <p className="hml-hero__paragraph">{HERO.paragraph}</p>
          <div className="hml-hero__ctas">
            <a href={HERO.primaryCta.href} className="btn btn-primary hml-btn">
              {Ico.play}
              {HERO.primaryCta.label}
            </a>
            <Link to={HERO.secondaryCta.href} className="btn btn-outline-dark hml-btn">
              {HERO.secondaryCta.label}
            </Link>
          </div>
        </div>

        <a href="#video" className="hml-hero__thumb" aria-label={`Watch: ${HERO.title}`}>
          <img src={webinarMeta.featuredImage} alt={`Webinar preview: ${HERO.title}`} loading="eager" />
          <span className="hml-hero__play" aria-hidden="true">
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
    <section className="section hml-video" id="video" aria-labelledby="hml-video-heading">
      <div className="content-wrap">
        <div className="hml-section-head hml-section-head--center hml-reveal">
          <h2 id="hml-video-heading">Watch the Full Webinar</h2>
          <p>How machine learning works, on demand.</p>
        </div>
        <div className="hml-video__frame hml-reveal">
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
    <section className="section" aria-labelledby="hml-overview-heading">
      <div className="content-wrap hml-overview">
        <div className="hml-section-head hml-reveal">
          <h2 id="hml-overview-heading">Webinar Overview</h2>
          {OVERVIEW_PARAGRAPHS.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>
    </section>
  );
}

// ================= WHAT YOU'LL LEARN =================
function TopicsSection() {
  return (
    <section className="section hml-topics" aria-labelledby="hml-topics-heading">
      <div className="content-wrap">
        <div className="hml-section-head hml-section-head--center hml-reveal">
          <h2 id="hml-topics-heading">What You'll Learn</h2>
          <p>The topics covered in this webinar.</p>
        </div>
        <div className="hml-topics-grid hml-reveal-stagger">
          {TOPIC_CARDS.map((card) => (
            <div className="hml-topic-card" key={card.title}>
              <div className="hml-topic-icon">{card.icon}</div>
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
    <section className="section hml-related" aria-labelledby="hml-related-heading">
      <div className="content-wrap">
        <div className="hml-section-head hml-section-head--center hml-reveal">
          <h2 id="hml-related-heading">Related Content</h2>
          <p>More resources on AI, machine learning, and Salesforce.</p>
        </div>
        <div className="hml-related-grid hml-reveal-stagger">
          {RELATED_CONTENT.map((item) => (
            <Link to={item.href} className="hml-related-card" key={item.title}>
              <span className="hml-related-label">{item.label}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <span className="hml-related-link">
                Learn more <span aria-hidden="true">&rarr;</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
