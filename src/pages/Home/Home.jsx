import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import Seo from "../../components/Seo/Seo.jsx";
import ConsultationSection from "../../components/ConsultationSection/ConsultationSection.jsx";
import VideoModal from "../../components/VideoModal/VideoModal.jsx";
import "./Home.css";

const FEATURED_CASE_STUDY_YOUTUBE_ID = "WK8V3TT2cFc";

import {
  // Hero
  HERO_SLIDES,
  heroSwiperConfig,
  useHeroAnimation,
  // Client logos
  TRUST_BADGES,
  duplicateForMarquee,
  // Counters
  STATS,
  useInView,
  useCountUp,
  // What we do
  WHAT_WE_DO,
  // AI spotlight
  AI_SPOTLIGHT_TABS,
  AI_SPOTLIGHT_BG,
  useTabs,
  // Industry
  INDUSTRIES,
  industrySwiperConfig,
  // Customer success
  FEATURED_CASE_STUDY,
  CUSTOMER_SUCCESS_BG,
  TESTIMONIALS,
  testimonialSwiperConfig,
  playIcon,
  quoteIcon,
  // Products
  PRODUCTS,
  PRODUCTS_SECTION_BG,
  // Partners
  PARTNERS,
  partnersSwiperConfig,
  // Insights
  useInsights,
  insightsSwiperConfig,
  // Shared
  useCarouselNav,
  cssUrl,
  // SEO
  SEO,
  // Contact CTA
  CONTACT_CTA_BG,
} from "./Home.js";

export default function Home() {
  return (
    <>
      <Seo {...SEO} />
      <HeroSection />
      <ClientLogosSection />
      <CountersSection />
      <WhatWeDoSection />
      <AISpotlightSection />
      <IndustrySection />
      <CustomerSuccessSection />
      <ProductsSection />
      <TechnologyPartnersSection />
      <LatestInsightsSection />
      <ContactCTASection />
    </>
  );
}

// ================= HERO =================
// Every slide is one full-width background image with an overlay and the
// content sitting directly on top — never a boxed/card visual. Slide 1
// (index 0) keeps the site's original animated graphic as its small
// supporting visual, since it's the only slide without a product photo of
// its own; the ambient orbit/particle/glow-line loop keeps running via
// graphicRef regardless of which slide is currently active.
function HeroSection() {
  const graphicRef = useRef(null);
  useHeroAnimation(graphicRef);

  const [reduceMotion, setReduceMotion] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
  }, []);

  const swiperProps = reduceMotion ? { ...heroSwiperConfig, autoplay: false, speed: 0 } : heroSwiperConfig;

  return (
    <section className="hero" aria-label="Introduction" aria-roledescription="carousel">
      <Swiper {...swiperProps} className="hero-swiper">
        {HERO_SLIDES.map((slide) => (
          <SwiperSlide key={slide.heading}>
            <div className="hero-slide" style={{ "--hero-slide-bg": cssUrl(slide.bg) }}>
              <div className="hero-slide__overlay" aria-hidden="true" />
              <div className="container hero__inner">
                <div className="hero__text">
                  <h1>{slide.heading}</h1>
                  <p>{slide.paragraph}</p>
                  <div className="hero__ctas">
                    <Link to={slide.primaryCta.href} className="btn btn-primary">
                      {slide.primaryCta.label}
                      <span className="btn-arrow">&rarr;</span>
                    </Link>
                    {slide.secondaryCta && (
                      <Link to={slide.secondaryCta.href} className="btn btn-secondary">
                        {slide.secondaryCta.label}
                      </Link>
                    )}
                  </div>
                </div>

                {slide.visual && (
                  <div className="hero__graphic" ref={graphicRef} aria-hidden="true">
                    <div className="hero-orbit hero-orbit--1" />
                    <div className="hero-orbit hero-orbit--2" />

                    <svg className="hero-glow-lines" viewBox="0 0 400 400" fill="none">
                      <path className="hero-glow-line" d="M40 200 H140" stroke="#21ad65" strokeWidth="2" />
                      <path className="hero-glow-line" d="M360 160 H260" stroke="#21ad65" strokeWidth="2" />
                      <path className="hero-glow-line" d="M200 40 V140" stroke="#21ad65" strokeWidth="2" />
                      <path className="hero-glow-line" d="M200 360 V260" stroke="#21ad65" strokeWidth="2" />
                      <path className="hero-glow-line" d="M90 90 L150 150" stroke="#21ad65" strokeWidth="2" />
                      <path className="hero-glow-line" d="M310 310 L250 250" stroke="#21ad65" strokeWidth="2" />
                    </svg>

                    <div className="hero-chip">
                      <span>AI</span>
                    </div>

                    <span className="hero-particle hero-particle--1" />
                    <span className="hero-particle hero-particle--2" />
                    <span className="hero-particle hero-particle--3" />
                    <span className="hero-particle hero-particle--4" />
                    <span className="hero-particle hero-particle--5" />
                  </div>
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
        <div className="hero-swiper__pagination" role="tablist" aria-label="Hero slides" />
      </Swiper>
    </section>
  );
}

// ================= CLIENT LOGOS =================
function ClientLogosSection() {
  const track = duplicateForMarquee(TRUST_BADGES);

  return (
    <section className="client-logos" aria-label="Certifications and trust indicators">
      <div className="client-logos__marquee">
        <div className="client-logos__track">
          {track.map((badge, i) => (
            <div className="client-logo" key={`${badge.label}-${i}`}>
              <span className="client-logo__icon">
                <img src={badge.icon} alt="" width="30" height="30" loading="lazy" />
              </span>
              <span className="client-logo__text">
                <strong>{badge.label}</strong>
                <small>{badge.sub}</small>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ================= COUNTERS =================
function StatItem({ stat }) {
  const [ref, inView] = useInView({ threshold: 0.4 });
  const display = useCountUp(stat.value, inView, 1800, stat.decimals);

  return (
    <div className="stat-item" ref={ref}>
      <p className="stat-item__value">
        {display}
        {stat.suffix}
      </p>
      <p className="stat-item__label">{stat.label}</p>
    </div>
  );
}

function CountersSection() {
  return (
    <section className="statistics" aria-label="Mirketa by the numbers">
      <div className="content-wrap statistics__grid">
        {STATS.map((stat) => (
          <StatItem stat={stat} key={stat.label} />
        ))}
      </div>
    </section>
  );
}

// ================= WHAT WE DO =================
function WhatWeDoSection() {
  return (
    <section className="section what-we-do" aria-labelledby="what-we-do-heading">
      <div className="content-wrap">
        <div className="section-heading">
          <h2 id="what-we-do-heading">{WHAT_WE_DO.heading}</h2>
          <p>{WHAT_WE_DO.description}</p>
        </div>

        <div className="what-we-do__grid">
          {WHAT_WE_DO.cards.map((card) => (
            <div className="wwd-card" key={card.title}>
              <span className="wwd-card__icon">
                <img src={card.icon} alt="" width="30" height="30" loading="lazy" />
              </span>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ================= AI SPOTLIGHT =================
function AISpotlightSection() {
  const { activeId, setActiveId, active } = useTabs(AI_SPOTLIGHT_TABS, AI_SPOTLIGHT_TABS[1].id);

  return (
    <section className="section ai-spotlight" aria-labelledby="ai-spotlight-heading">
      <div className="content-wrap">
        <div className="section-heading">
          <h2 id="ai-spotlight-heading">AI Spotlight</h2>
          <p>Discover how prepared your organization is for enterprise AI adoption.</p>
        </div>

        <div className="ai-spotlight__layout">
          <div className="ai-spotlight__tabs" role="tablist" aria-orientation="vertical">
            {AI_SPOTLIGHT_TABS.map((tab) => (
              <button
                key={tab.id}
                role="tab"
                id={`tab-${tab.id}`}
                aria-selected={tab.id === activeId}
                aria-controls="ai-spotlight-panel"
                className={`ai-spotlight__tab ${tab.id === activeId ? "is-active" : ""}`}
                onClick={() => setActiveId(tab.id)}
              >
                <span className="ai-spotlight__tab-label">{tab.label}</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M5 3l6 5-6 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            ))}
          </div>

          <div
            className="ai-spotlight__panel"
            role="tabpanel"
            id="ai-spotlight-panel"
            aria-labelledby={`tab-${active.id}`}
            key={active.id}
            style={{ "--ai-pattern": cssUrl(AI_SPOTLIGHT_BG) }}
          >
            {active.tag && <span className="ai-spotlight__badge">{active.tag}</span>}
            <h3>{active.heading}</h3>
            <p>{active.description}</p>
            <Link to={active.cta.href} className="btn btn-primary">
              {active.cta.label}
              <span className="btn-arrow">&rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ================= INDUSTRY SPECIALIZATIONS =================
function IndustrySection() {
  const { bindSwiper, slidePrev, slideNext } = useCarouselNav();

  return (
    <section className="section industry" aria-labelledby="industry-heading">
      <div className="content-wrap">
        <div className="industry__header">
          <div>
            <span className="section-eyebrow">Where We Deliver</span>
            <h2 id="industry-heading">Industry Specializations</h2>
          </div>
          <div className="industry__nav">
            <button className="industry__arrow" aria-label="Previous industry" onClick={slidePrev}>
              &larr;
            </button>
            <button className="industry__arrow" aria-label="Next industry" onClick={slideNext}>
              &rarr;
            </button>
          </div>
        </div>

        <Swiper {...industrySwiperConfig} onSwiper={bindSwiper} className="industry__swiper">
          {INDUSTRIES.map((ind) => (
            <SwiperSlide key={ind.name}>
              <Link
                to={ind.href}
                className="industry-card"
                style={{ backgroundImage: cssUrl(ind.image) }}
              >
                <div className="industry-card__overlay" />
                <div className="industry-card__content">
                  <h3>{ind.name}</h3>
                  <p>{ind.tagline}</p>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

// ================= CUSTOMER SUCCESS =================
function CustomerSuccessSection() {
  const { bindSwiper, slidePrev, slideNext } = useCarouselNav();
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const handlePlayClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsVideoOpen(true);
  };

  return (
    <section className="section customer-success" aria-labelledby="customer-success-heading">
      <div className="content-wrap">
        <div className="customer-success__top">
          <h2 id="customer-success-heading">Customer Success</h2>
          <div className="customer-success__nav">
            <button aria-label="Previous testimonial" onClick={slidePrev}>
              &larr;
            </button>
            <button aria-label="Next testimonial" onClick={slideNext}>
              &rarr;
            </button>
          </div>
        </div>

        <div className="customer-success__grid">
          <Link to={FEATURED_CASE_STUDY.href} className="case-study-card">
            <div className="case-study-card__media" style={{ backgroundImage: cssUrl(CUSTOMER_SUCCESS_BG) }}>
              <span className="case-study-card__scrim" aria-hidden="true" />
              <button type="button" className="case-study-card__play" aria-label="Play case study video" onClick={handlePlayClick}>
                <img src={playIcon} alt="" width="22" height="22" loading="lazy" />
              </button>
            </div>
            <div className="case-study-card__body">
              <h3>{FEATURED_CASE_STUDY.title}</h3>
              <p>{FEATURED_CASE_STUDY.description}</p>
              <span className="case-study-card__link">
                Read Case Study <span className="btn-arrow">&rarr;</span>
              </span>
            </div>
          </Link>

          <VideoModal
            isOpen={isVideoOpen}
            onClose={() => setIsVideoOpen(false)}
            youtubeId={FEATURED_CASE_STUDY_YOUTUBE_ID}
            title={FEATURED_CASE_STUDY.title}
          />

          <Swiper {...testimonialSwiperConfig} onSwiper={bindSwiper} className="testimonial-swiper">
            {TESTIMONIALS.map((t) => (
              <SwiperSlide key={t.name}>
                <blockquote className="testimonial-card">
                  <img className="testimonial-card__quote" src={quoteIcon} alt="" width="34" height="26" loading="lazy" />
                  <p>{t.quote}</p>
                  <footer>
                    <span className="testimonial-card__avatar">{t.initials}</span>
                    <div>
                      <strong>{t.name}</strong>
                      <small>{t.title}</small>
                    </div>
                  </footer>
                </blockquote>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}

// ================= PRODUCTS & IP =================
function ProductsSection() {
  return (
    <section className="section products" aria-labelledby="products-heading" style={{ "--products-bg": cssUrl(PRODUCTS_SECTION_BG) }}>
      <div className="content-wrap">
        <div className="products__top">
          <h2 id="products-heading">Products &amp; IP</h2>
          <Link to="/industry/healthcare" className="products__view-all">
            View All Products <span className="btn-arrow">&rarr;</span>
          </Link>
        </div>

        <div className="products__grid">
          {PRODUCTS.map((p) =>
            p.href.startsWith("http") ? (
              <a href={p.href} target="_blank" rel="nofollow noopener noreferrer" className="product-card" key={p.name}>
                <span className="product-card__visual">
                  <img src={p.icon} alt={p.name} loading="lazy" />
                </span>
                <p>{p.tagline}</p>
              </a>
            ) : (
              <Link to={p.href} className="product-card" key={p.name}>
                <span className="product-card__visual">
                  <img src={p.icon} alt={p.name} loading="lazy" />
                </span>
                <p>{p.tagline}</p>
              </Link>
            )
          )}
        </div>
      </div>
    </section>
  );
}

// ================= TECHNOLOGY PARTNERS =================
function TechnologyPartnersSection() {
  return (
    <section className="section partners" aria-labelledby="partners-heading">
      <div className="content-wrap">
        <div className="section-heading">
          <h2 id="partners-heading">Technology Partners</h2>
          <p>Hover any badge to discover what it means for our enterprise engagement.</p>
        </div>

        <Swiper {...partnersSwiperConfig} className="partners__swiper">
          {PARTNERS.map((p) => (
            <SwiperSlide key={p.name}>
              <div className="partner-card">
                <strong>{p.name}</strong>
                <small>{p.sub}</small>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

// ================= LATEST INSIGHTS =================
function LatestInsightsSection() {
  const { insights, status } = useInsights();
  const { bindSwiper, slidePrev, slideNext } = useCarouselNav();

  return (
    <section className="section insights" aria-labelledby="insights-heading">
      <div className="content-wrap">
        <div className="insights__header">
          <div>
            <h2 id="insights-heading">Latest Insights</h2>
            <p>Discover how prepared your organization is for enterprise AI adoption.</p>
          </div>
          <div className="insights__nav">
            <button aria-label="Previous insight" onClick={slidePrev}>
              &larr;
            </button>
            <button aria-label="Next insight" onClick={slideNext}>
              &rarr;
            </button>
          </div>
        </div>

        {status === "loading" && <p className="insights__status">Loading latest insights...</p>}
        {status === "error" && <p className="insights__status">Unable to load insights right now. Please check back soon.</p>}
        {status === "ready" && insights.length === 0 && <p className="insights__status">No articles published yet.</p>}

        {status === "ready" && insights.length > 0 && (
          <Swiper {...insightsSwiperConfig} onSwiper={bindSwiper} className="insights__swiper">
            {insights.map((post) => (
              <SwiperSlide key={post.href}>
                <article className="insight-card">
                  <div className="insight-card__media" style={{ backgroundImage: cssUrl(post.image) }}>
                    <span className="insight-card__badge">{post.category}</span>
                  </div>
                  <div className="insight-card__body">
                    <time>{post.date}</time>
                    <h3>{post.title}</h3>
                    <p>{post.excerpt}</p>
                    <Link to={post.href} className="insight-card__link">
                      Read More <span className="btn-arrow">&rarr;</span>
                    </Link>
                  </div>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
}

// ================= CONTACT CTA =================
const CONTACT_CTA_CONSULTATION = {
  eyebrow: "Get Started",
  heading: "Not sure where to start with AI? Let's figure it out together.",
  description:
    "Book a free 30-minute call with one of our senior solution architects. No slides, no pitch. Just a candid conversation about your stack, your goals, and whether AI is the right move now.",
  formTitle: "Book Your Free AI Readiness Call",
  id: "book",
  className: "home-contact-cta",
  backgroundImage: CONTACT_CTA_BG,
};

function ContactCTASection() {
  return <ConsultationSection {...CONTACT_CTA_CONSULTATION} />;
}
