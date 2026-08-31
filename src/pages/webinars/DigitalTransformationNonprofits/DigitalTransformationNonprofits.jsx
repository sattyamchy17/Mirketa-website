import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Seo from "../../../components/Seo/Seo.jsx";
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb.jsx";
import ConsultationSection from "../../../components/ConsultationSection/ConsultationSection.jsx";
import { post as webinarMeta } from "../../../blog/posts/digital-transformation-for-nonprofits.js";
import { post as nonprofitDataWebinar } from "../../../blog/posts/mastering-data-management-nonprofit-organizations.js";
import { parseYouTubeUrl } from "../../../utils/youtube.js";
import "./DigitalTransformationNonprofits.css";

gsap.registerPlugin(ScrollTrigger);

// ============================================================
// DATA
// Only a real video URL was supplied for this webinar — no written
// recap, speaker info, agenda, or date. The video's real, public title
// ("Webinar Digital Transformation for Nonprofits", confirmed via
// YouTube's oEmbed endpoint) is the one verified fact this page is
// built around. The overview/theme copy below is honest, general
// framing of that stated topic — not a claimed transcript of the
// recording — and no statistic, speaker, company, or quote is invented
// anywhere on this page. A Speakers section and timestamped agenda are
// deliberately omitted for the same reason.
//
// Title, excerpt, and video/thumbnail come from webinarMeta
// (src/blog/posts/digital-transformation-for-nonprofits.js) — the same
// object every listing card (Homepage Latest Insights, /insights,
// /blog, related content) reads through — so this page and its own
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

const OVERVIEW_PARAGRAPH =
  "Nonprofit organizations are increasingly expected to do more with limited staff and budgets — from managing donor relationships and volunteer programs to reporting on outcomes for funders and boards. This webinar looks at what digital transformation actually means for a mission-driven organization: modernizing the systems that run day-to-day operations, reducing manual work, and building a technology foundation that supports the mission instead of adding overhead.";

const Ico = {
  crm: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="9" cy="8" r="3" /><path d="M2 20c0-3.3 3-6 7-6s7 2.7 7 6" /><circle cx="17" cy="7" r="2.3" /><path d="M22 20c0-2.6-2-4.8-5-5.5" /></svg>
  ),
  automate: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 4v5h5M20 20v-5h-5M4.6 15a8 8 0 0014.3 3.2M19.4 9A8 8 0 005.1 5.8" /></svg>
  ),
  cloud: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 10h-1.3A5 5 0 007 11.1 3.5 3.5 0 006 18h12a4 4 0 000-8z" /></svg>
  ),
  data: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 19V5M10 19v-9M16 19V9M4 19h16" /></svg>
  ),
  play: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
  ),
};

const THEME_CARDS = [
  {
    icon: Ico.crm,
    title: "Modernizing Donor & Constituent Data",
    description: "Bringing donor, volunteer, and program data into one place instead of scattered spreadsheets and disconnected tools.",
  },
  {
    icon: Ico.automate,
    title: "Automating Manual Work",
    description: "Freeing up staff time from repetitive administrative tasks so more of it goes toward the mission.",
  },
  {
    icon: Ico.cloud,
    title: "Moving Off Legacy Systems",
    description: "Replacing aging, hard-to-maintain systems with cloud tools that are easier to manage and scale.",
  },
  {
    icon: Ico.data,
    title: "Reporting & Decision Making",
    description: "Giving leadership and funders clear, unified visibility into outcomes across fundraising and programs.",
  },
];

const RELATED_CONTENT = [
  {
    label: "Webinar",
    title: nonprofitDataWebinar.title,
    description: nonprofitDataWebinar.excerpt,
    href: nonprofitDataWebinar.href,
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
  title: "Webinar: Digital Transformation for Nonprofits | Mirketa",
  description:
    "Watch Mirketa's on-demand webinar on digital transformation for nonprofit organizations — modernizing systems, automating operations, and building a technology foundation for your mission.",
  canonical: "https://www.mirketa.com/webinars/digital-transformation-for-nonprofits/",
  keywords: [
    "digital transformation for nonprofits",
    "nonprofit technology modernization",
    "nonprofit digital strategy",
    "Mirketa webinar",
  ],
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
        { "@type": "ListItem", position: 2, name: webinarMeta.title, item: "https://www.mirketa.com/webinars/digital-transformation-for-nonprofits/" },
      ],
    },
  ],
};

const CONSULTATION = {
  eyebrow: "Get Started",
  heading: "Ready to Start Your Nonprofit's Digital Transformation?",
  description: "Talk to Mirketa about modernizing the systems your organization runs on — from donor data to day-to-day operations.",
  formTitle: "Talk to an Expert",
};

// ============================================================
// PAGE
// ============================================================
export default function DigitalTransformationNonprofits() {
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

      gsap.utils.toArray(".dtn-reveal").forEach((el) => {
        gsap.from(el, {
          y: 32,
          opacity: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      gsap.utils.toArray(".dtn-reveal-stagger").forEach((group) => {
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
    <div className="dtn-page">
      <Seo {...SEO} />
      <HeroSection textRef={heroTextRef} />
      <VideoSection />
      <OverviewSection />
      <ThemesSection />
      <RelatedSection />
      <ConsultationSection {...CONSULTATION} />
    </div>
  );
}

// ================= HERO =================
function HeroSection({ textRef }) {
  return (
    <section className="dtn-hero" aria-label="Webinar introduction">
      <div className="container">
        <Breadcrumb items={BREADCRUMB_ITEMS} className="dtn-breadcrumb breadcrumb--dark" />
      </div>
      <div className="container dtn-hero__inner">
        <div className="dtn-hero__text" ref={textRef}>
          <span className="dtn-badge">{HERO.badge}</span>
          <h1>{HERO.title}</h1>
          <p className="dtn-hero__paragraph">{HERO.paragraph}</p>
          <div className="dtn-hero__ctas">
            <a href={HERO.primaryCta.href} className="btn btn-primary dtn-btn">
              {Ico.play}
              {HERO.primaryCta.label}
            </a>
            <Link to={HERO.secondaryCta.href} className="btn btn-outline-dark dtn-btn">
              {HERO.secondaryCta.label}
            </Link>
          </div>
        </div>

        <a href="#video" className="dtn-hero__thumb" aria-label={`Watch: ${HERO.title}`}>
          <img src={webinarMeta.featuredImage} alt={`Webinar preview: ${HERO.title}`} loading="eager" />
          <span className="dtn-hero__play" aria-hidden="true">
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
    <section className="section dtn-video" id="video" aria-labelledby="dtn-video-heading">
      <div className="content-wrap">
        <div className="dtn-section-head dtn-section-head--center dtn-reveal">
          <h2 id="dtn-video-heading">Watch the Full Webinar</h2>
          <p>Digital transformation for nonprofit organizations, on demand.</p>
        </div>
        <div className="dtn-video__frame dtn-reveal">
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
    <section className="section" aria-labelledby="dtn-overview-heading">
      <div className="content-wrap dtn-overview">
        <div className="dtn-section-head dtn-reveal">
          <h2 id="dtn-overview-heading">Webinar Overview</h2>
          <p>{OVERVIEW_PARAGRAPH}</p>
        </div>
      </div>
    </section>
  );
}

// ================= THEMES =================
function ThemesSection() {
  return (
    <section className="section dtn-themes" aria-labelledby="dtn-themes-heading">
      <div className="content-wrap">
        <div className="dtn-section-head dtn-section-head--center dtn-reveal">
          <h2 id="dtn-themes-heading">What Nonprofit Digital Transformation Covers</h2>
          <p>Digital transformation looks different for every organization, but most journeys touch the same core areas.</p>
        </div>
        <div className="dtn-themes-grid dtn-reveal-stagger">
          {THEME_CARDS.map((card) => (
            <div className="dtn-theme-card" key={card.title}>
              <div className="dtn-theme-icon">{card.icon}</div>
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
    <section className="section dtn-related" aria-labelledby="dtn-related-heading">
      <div className="content-wrap">
        <div className="dtn-section-head dtn-section-head--center dtn-reveal">
          <h2 id="dtn-related-heading">Related Content</h2>
          <p>More resources on data, AI, and technology for nonprofit organizations.</p>
        </div>
        <div className="dtn-related-grid dtn-reveal-stagger">
          {RELATED_CONTENT.map((item) => (
            <Link to={item.href} className="dtn-related-card" key={item.title}>
              <span className="dtn-related-label">{item.label}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <span className="dtn-related-link">
                Learn more <span aria-hidden="true">&rarr;</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
