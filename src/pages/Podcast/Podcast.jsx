import { useEffect, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Seo from "../../components/Seo/Seo.jsx";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb.jsx";
import ConsultationSection from "../../components/ConsultationSection/ConsultationSection.jsx";
import { STATS } from "../Home/Home.js";
import firstEpisodeThumbnail from "../../assets/podcast/podcast 1/edited_center_smile 1.png";
import "./Podcast.css";

const BREADCRUMB_ITEMS = [{ label: "Home", href: "/" }, { label: "Podcast" }];

gsap.registerPlugin(ScrollTrigger);

// ============================================================
// DATA
// No episodes, host persona, or listener reviews exist yet, so
// every section below is written as an honest "coming soon" or
// generic value-prop state rather than inventing specific
// episodes, guests, dates, or testimonials. Stats are the real,
// already-published sitewide figures from Home.js (STATS) — not
// separately invented numbers. Topic categories mirror Mirketa's
// real, already-published service areas (Salesforce, AI, Cloud,
// Data, ERP) rather than fabricated episode themes.
// ============================================================

const Ico = {
  play: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
  ),
  mic: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3v10.5M12 3l-4 3M12 3l4 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /><circle cx="12" cy="17" r="4" stroke="currentColor" strokeWidth="1.8" /></svg>
  ),
  ai: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" /></svg>
  ),
  salesforce: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M17.5 19a4.5 4.5 0 000-9 5.5 5.5 0 00-10.6-1.6A4 4 0 003 12.4" /><path d="M12 15v5M9 18h6" /></svg>
  ),
  cloud: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 10h-1.3A5 5 0 007 11.1 3.5 3.5 0 006 18h12a4 4 0 000-8z" /></svg>
  ),
  data: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 19V5M10 19v-9M16 19V9M4 19h16" /></svg>
  ),
  erp: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M4 10h16M10 4v16" /></svg>
  ),
  automation: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 4v5h5M20 20v-5h-5M4.6 15a8 8 0 0014.3 3.2M19.4 9A8 8 0 005.1 5.8" /></svg>
  ),
  strategy: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 17l6-6 4 4 8-8M21 7v6M21 7h-6" /></svg>
  ),
  innovation: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 2l2.4 6.5L21 11l-6.6 2.5L12 20l-2.4-6.5L3 11l6.6-2.5z" /></svg>
  ),
  experts: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 2l3 6 6.5 1-4.7 4.6L18 20l-6-3.4L6 20l1.2-6.4L2.5 9l6.5-1z" /></svg>
  ),
  leaders: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 21h18M6 21V9l6-4 6 4v12M10 21v-6h4v6" /></svg>
  ),
  insight: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 18h6M10 21h4M12 3a6 6 0 00-3.5 10.9c.4.3.5.7.5 1.1v.5h6v-.5c0-.4.1-.8.5-1.1A6 6 0 0012 3z" /></svg>
  ),
  story: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6L9 17l-5-5" /></svg>
  ),
  calendar: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
  ),
  action: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 12h4l3 8 4-16 3 8h4" /></svg>
  ),
};

const HERO = {
  eyebrow: "Mirketa Podcast",
  heading: "Conversations Driving",
  headingAccent: "Digital Transformation",
  paragraph:
    "Straight talk on the enterprise AI, Salesforce, cloud, data, and ERP programs Mirketa's team works on every day — what worked, what broke, and what we'd do differently.",
  primaryCta: { label: "Get Notified at Launch", href: "#notify" },
  secondaryCta: { label: "Talk to an Expert", href: "/company/contact" },
};

const PLATFORMS = ["Spotify", "Apple Podcasts", "YouTube", "Amazon Music"];

// Real first episode — title and channel verified via YouTube's public
// oEmbed endpoint for this exact URL, not invented. Thumbnail is the
// image provided for this episode at src/assets/podcast/podcast 1/.
const FIRST_EPISODE = {
  eyebrow: "First Episode",
  heading: "Our First Episode Is Here",
  paragraph: "Watch our very first episode of the Mirketa Podcast Series below.",
  badge: "Episode 1",
  tags: ["Enterprise AI", "Case Resolution"],
  title: "Beyond the Case: E01 - Building an Enterprise AI Case Resolution Platform",
  description: "The first episode of the Mirketa Podcast Series, going inside what it takes to build an enterprise AI case resolution platform.",
  thumbnail: firstEpisodeThumbnail,
  href: "https://www.youtube.com/watch?v=uDAAw2qZF4g",
};

const MORE_EPISODES = [2, 3, 4, 5, 6];

const HOST = {
  eyebrow: "Meet the Host",
  heading: "Hosted by the Mirketa Team",
  note: "Every transformation story is really a story about people deciding to trust a new system.",
  bio: "The Mirketa Podcast Series is hosted by consultants and architects from Mirketa's own delivery teams — the people who work inside enterprise AI, Salesforce, cloud, data, and ERP programs day to day. The show puts a microphone in front of the people actually running transformation programs, not just the ones presenting the results.",
  linkedin: "https://www.linkedin.com/company/mirketainc",
};

const TOPICS = [
  { icon: Ico.ai, label: "Artificial Intelligence" },
  { icon: Ico.salesforce, label: "Salesforce" },
  { icon: Ico.cloud, label: "Cloud Transformation" },
  { icon: Ico.data, label: "Data & Analytics" },
  { icon: Ico.erp, label: "ERP Solutions" },
  { icon: Ico.automation, label: "Automation" },
  { icon: Ico.strategy, label: "Digital Strategy" },
  { icon: Ico.innovation, label: "Enterprise Innovation" },
];

const WHY_LISTEN = [
  { icon: Ico.experts, title: "Industry Experts", description: "Guests with hands-on delivery experience, not just a title." },
  { icon: Ico.leaders, title: "Enterprise Leaders", description: "Conversations built around the programs Mirketa's own teams help run." },
  { icon: Ico.insight, title: "Practical Insights", description: "Frameworks and decisions you can actually apply on Monday." },
  { icon: Ico.story, title: "Customer Success Stories", description: "Real rollouts, with the parts that went wrong left in." },
  { icon: Ico.calendar, title: "New Episodes", description: "Fresh conversations as they're recorded — no fixed seasonal gaps." },
  { icon: Ico.action, title: "Actionable Business Strategies", description: "Something concrete to take back to your team, every episode." },
];

const CONSULTATION = {
  eyebrow: "Stay in the Loop",
  heading: "Get Notified When We Launch",
  description: "Share your details and we'll let you know as soon as the first episode of the Mirketa Podcast Series is live.",
  formTitle: "Get Notified at Launch",
};

const SEO = {
  title: "Mirketa Podcast Series | Enterprise AI & Tech Insights",
  description: "Catch the latest episodes on enterprise AI enablement and tech innovation from the Mirketa Podcast Series.",
  canonical: "https://www.mirketa.com/podcast/",
  keywords: ["Mirketa Podcast", "enterprise AI podcast", "Salesforce podcast", "tech innovation podcast"],
  schema: [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Mirketa Podcast Series",
      url: "https://www.mirketa.com/podcast/",
      description: "Catch the latest episodes on enterprise AI enablement and tech innovation.",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.mirketa.com/" },
        { "@type": "ListItem", position: 2, name: "Podcast", item: "https://www.mirketa.com/podcast/" },
      ],
    },
  ],
};

// ============================================================
// PAGE
// ============================================================
export default function Podcast() {
  const heroTextRef = useRef(null);

  // Light-background hero: the sitewide header defaults to white text
  // assuming a dark hero, so this toggles the same override every other
  // light-background hero on the site already relies on (see Header.css
  // ".has-light-hero" / Breadcrumb.css ".breadcrumb--dark").
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

      gsap.utils.toArray(".pod-reveal").forEach((el) => {
        gsap.from(el, {
          y: 32,
          opacity: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      gsap.utils.toArray(".pod-reveal-stagger").forEach((group) => {
        gsap.from(group.children, {
          y: 24,
          opacity: 0,
          duration: 0.6,
          stagger: 0.06,
          ease: "power2.out",
          scrollTrigger: { trigger: group, start: "top 88%" },
        });
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="podcast-page">
      <Seo {...SEO} />
      <HeroSection textRef={heroTextRef} />
      <StatsSection />
      <FirstEpisodeSection />
      <MoreEpisodesSection />
      <HostSection />
      <TopicsSection />
      <WhyListenSection />
      <ConsultationSection {...CONSULTATION} id="notify" />
    </div>
  );
}

// ================= HERO =================
function HeroSection({ textRef }) {
  const bars = useMemo(() => Array.from({ length: 48 }, (_, i) => ({ h: 8 + Math.round(Math.random() * 24), accent: i % 8 === 3 })), []);

  return (
    <section className="pod-hero" aria-label="Mirketa Podcast Series introduction">
      <div className="container">
        <Breadcrumb items={BREADCRUMB_ITEMS} className="pod-breadcrumb breadcrumb--dark" />
      </div>
      <div className="container pod-hero__inner">
        <div className="pod-hero__text" ref={textRef}>
          <span className="pod-eyebrow">{HERO.eyebrow}</span>
          <h1>
            {HERO.heading} <span className="pod-accent">{HERO.headingAccent}</span>
          </h1>
          <p className="pod-hero__paragraph">{HERO.paragraph}</p>
          <div className="pod-hero__ctas">
            <a href={HERO.primaryCta.href} className="btn btn-primary pod-btn">
              {HERO.primaryCta.label}
              <span className="btn-arrow">&rarr;</span>
            </a>
            <Link to={HERO.secondaryCta.href} className="btn btn-outline-dark pod-btn">
              {HERO.secondaryCta.label}
            </Link>
          </div>
          <div className="pod-platforms">
            <span className="pod-platforms__label">Launching Soon On</span>
            <div className="pod-platforms__list">
              {PLATFORMS.map((p) => (
                <span className="pod-platform-pill" key={p}>
                  <span className="pod-platform-pill__dot">{Ico.play}</span>
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="pod-hero__visual">
          <div className="pod-hero__art">
            <div className="pod-hero__mark">{Ico.mic}</div>
          </div>
          <div className="pod-hero__float-card">
            <span className="pod-pulse" aria-hidden="true" />
            <div>
              <strong>First Episode</strong>
              <span>Now Live</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="pod-waveform" aria-hidden="true">
          {bars.map((bar, i) => (
            <span
              key={i}
              className={bar.accent ? "pod-waveform__bar pod-waveform__bar--accent" : "pod-waveform__bar"}
              style={{ height: `${bar.h}px`, animationDelay: `${(i % 12) * 0.15}s` }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ================= STATS =================
function StatsSection() {
  return (
    <section className="pod-stats" aria-label="Mirketa by the numbers">
      <div className="container pod-stats__grid">
        {STATS.map((stat) => (
          <div className="pod-stat" key={stat.label}>
            <p className="pod-stat__value">
              {stat.value.toFixed(stat.decimals)}
              {stat.suffix}
            </p>
            <p className="pod-stat__label">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ================= FIRST EPISODE =================
function FirstEpisodeSection() {
  return (
    <section className="section pod-featured" id="episodes" aria-labelledby="pod-featured-heading">
      <div className="content-wrap">
        <div className="pod-section-head pod-reveal">
          <span className="pod-eyebrow">{FIRST_EPISODE.eyebrow}</span>
          <h2 id="pod-featured-heading">{FIRST_EPISODE.heading}</h2>
          <p>{FIRST_EPISODE.paragraph}</p>
        </div>

        <div className="pod-featured-card pod-reveal">
          <a
            href={FIRST_EPISODE.href}
            target="_blank"
            rel="noopener noreferrer"
            className="pod-featured-art pod-featured-art--photo"
            aria-label={`Watch "${FIRST_EPISODE.title}" on YouTube`}
          >
            <span className="pod-featured-badge">{FIRST_EPISODE.badge}</span>
            <img src={FIRST_EPISODE.thumbnail} alt={FIRST_EPISODE.title} className="pod-featured-thumb" />
            <span className="pod-featured-play" aria-hidden="true">
              {Ico.play}
            </span>
          </a>
          <div className="pod-featured-body">
            <div className="pod-featured-meta">
              {FIRST_EPISODE.tags.map((tag) => (
                <span className="pod-tag pod-tag--highlight" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
            <h3 className="pod-featured-title">{FIRST_EPISODE.title}</h3>
            <p className="pod-featured-desc">{FIRST_EPISODE.description}</p>
            <a href={FIRST_EPISODE.href} target="_blank" rel="noopener noreferrer" className="btn btn-primary pod-btn">
              {Ico.play}
              Watch on YouTube
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ================= MORE EPISODES =================
function MoreEpisodesSection() {
  return (
    <section className="section" aria-labelledby="pod-more-heading">
      <div className="content-wrap">
        <div className="pod-section-head pod-reveal">
          <span className="pod-eyebrow">More Episodes</span>
          <h2 id="pod-more-heading">More conversations are on the way</h2>
          <p>We're recording the next set of episodes now — check back soon to see them here.</p>
        </div>

        <div className="pod-episodes-grid pod-reveal-stagger">
          {MORE_EPISODES.map((n) => (
            <article className="pod-ep-card" key={n}>
              <div className="pod-ep-thumb">
                <span className="pod-ep-thumb__num">{n}</span>
                <div className="pod-ep-thumb__play">{Ico.play}</div>
              </div>
              <div className="pod-ep-body">
                <span className="pod-tag">Episode {n}</span>
                <h4 className="pod-ep-title">Coming Soon</h4>
                <p>This episode hasn't been recorded yet — get notified when it's live.</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ================= HOST =================
function HostSection() {
  return (
    <section className="section" id="host" aria-labelledby="pod-host-heading">
      <div className="content-wrap pod-host">
        <div className="pod-host__portrait">
          <div className="pod-host__mark">{Ico.mic}</div>
          <p className="pod-host__note">{HOST.note}</p>
        </div>
        <div className="pod-host__copy">
          <span className="pod-eyebrow">{HOST.eyebrow}</span>
          <h2 id="pod-host-heading">{HOST.heading}</h2>
          <p className="pod-host__bio">{HOST.bio}</p>
          <a href={HOST.linkedin} target="_blank" rel="noopener noreferrer" className="pod-social-btn" aria-label="Mirketa on LinkedIn">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M4.98 3.5a2.5 2.5 0 11-.02 5.01A2.5 2.5 0 014.98 3.5zM3 9h4v12H3V9zm7 0h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.5c0-1.3-.02-3-1.83-3-1.83 0-2.1 1.43-2.1 2.9V21h-4V9z" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

// ================= TOPICS =================
function TopicsSection() {
  return (
    <section className="section pod-topics" id="topics" aria-labelledby="pod-topics-heading">
      <div className="content-wrap">
        <div className="pod-section-head pod-section-head--center pod-reveal">
          <span className="pod-eyebrow">Topics Covered</span>
          <h2 id="pod-topics-heading">What we'll talk about</h2>
          <p>The recurring threads we build every episode around.</p>
        </div>
        <div className="pod-topics-grid pod-reveal-stagger">
          {TOPICS.map((t) => (
            <div className="pod-topic-card" key={t.label}>
              <div className="pod-topic-icon">{t.icon}</div>
              <h5>{t.label}</h5>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ================= WHY LISTEN =================
function WhyListenSection() {
  return (
    <section className="section" aria-labelledby="pod-why-heading">
      <div className="content-wrap">
        <div className="pod-section-head pod-reveal">
          <span className="pod-eyebrow">Why Listen</span>
          <h2 id="pod-why-heading">Built for people making the decisions</h2>
          <p>Not marketing recaps — working conversations with the people running the programs.</p>
        </div>
        <div className="pod-why-grid pod-reveal-stagger">
          {WHY_LISTEN.map((w) => (
            <div className="pod-why-card" key={w.title}>
              <div className="pod-why-icon">{w.icon}</div>
              <h5>{w.title}</h5>
              <p>{w.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
