import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Images } from "../../assets/images/index.js";
import Seo from "../../components/Seo/Seo.jsx";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb.jsx";
import ConsultationSection from "../../components/ConsultationSection/ConsultationSection.jsx";
import {
  AI_VELOCITY_PRODUCTS,
  CONTENT_TYPES,
  HUB_STATS,
  INDUSTRY_FILTERS,
  SEO,
  useDebouncedValue,
  useFeaturedContent,
  useWpPosts,
} from "./AIVelocityEngines.js";
import "./AIVelocityEngines.css";

gsap.registerPlugin(ScrollTrigger);

const HERO = {
  eyebrow: "AI Resource & Product Hub",
  title: "AI Velocity Engines: Pre-Built Accelerators for Enterprise AI",
  description:
    "Explore Mirketa's library of ready-to-deploy AI Velocity Engines, plus the latest blogs, webinars, eBooks, use cases, and case studies — all updated automatically as new content is published.",
  primaryCta: { label: "Explore AI Engines", href: "#engines" },
  secondaryCta: { label: "View Latest Resources", href: "#resources" },
};

const BREADCRUMB_ITEMS = [{ label: "Home", href: "/" }, { label: "AI Velocity Engines" }];

const CONTACT = {
  heading: "Not Sure Which AI Velocity Engine Fits Your Roadmap?",
  description: "Talk to one of our AI solution architects about which pre-built accelerator maps to your highest-value use case.",
  formTitle: "Talk to an AI Solutions Expert",
};

const cssUrl = (src) => `url("${src}")`;

// ============================================================
// MAIN COMPONENT
// ============================================================

export default function AIVelocityEngines() {
  const heroTextRef = useRef(null);
  const [searchInput, setSearchInput] = useState("");
  const [activeType, setActiveType] = useState("all");
  const [activeIndustry, setActiveIndustry] = useState("all");

  const debouncedSearch = useDebouncedValue(searchInput, 350);
  const industryLabel = INDUSTRY_FILTERS.find((i) => i.key === activeIndustry)?.label;
  const effectiveSearch = [debouncedSearch, activeIndustry !== "all" ? industryLabel : ""].filter(Boolean).join(" ").trim();

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (heroTextRef.current) {
        gsap.from(heroTextRef.current.children, { opacity: 0, y: 28, duration: 0.8, stagger: 0.12, ease: "power3.out" });
      }
      gsap.utils.toArray(".ve-reveal").forEach((el) => {
        gsap.from(el, { opacity: 0, y: 32, duration: 0.7, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 88%" } });
      });
      gsap.utils.toArray(".ve-reveal-stagger").forEach((el) => {
        gsap.from(el.children, { opacity: 0, y: 26, duration: 0.6, stagger: 0.08, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 85%" } });
      });
    });
    return () => ctx.revert();
  }, []);

  const visibleTypes = activeType === "all" ? CONTENT_TYPES : CONTENT_TYPES.filter((t) => t.key === activeType);

  return (
    <div className="ai-velocity-engines">
      <Seo {...SEO} />
      <HeroSection heroTextRef={heroTextRef} />
      <ProductsSection />
      <ToolbarSection
        searchInput={searchInput}
        onSearchChange={setSearchInput}
        activeType={activeType}
        onTypeChange={setActiveType}
        activeIndustry={activeIndustry}
        onIndustryChange={setActiveIndustry}
      />
      {activeType === "all" && !effectiveSearch && <FeaturedCarousel />}
      <div id="resource-sections">
        {visibleTypes.map((type) => (
          <ContentSection
            key={type.key}
            type={type}
            search={effectiveSearch}
            expanded={activeType !== "all"}
            onViewAll={() => {
              setActiveType(type.key);
              document.getElementById("resources")?.scrollIntoView({ behavior: "smooth" });
            }}
          />
        ))}
      </div>
      <ConsultationSection {...CONTACT} />
    </div>
  );
}

// ============================================================
// HERO
// ============================================================

function HeroSection({ heroTextRef }) {
  return (
    <section className="ve-hero" style={{ backgroundImage: cssUrl(Images.heroAiVelocityEngines) }} aria-label="AI Velocity Engines Hub">
      <div className="ve-hero__scrim" />
      <div className="container">
        <Breadcrumb items={BREADCRUMB_ITEMS} className="ve-breadcrumb" />
      </div>
      <div className="container ve-hero__inner">
        <div ref={heroTextRef} className="ve-hero__text">
          <p className="ve-eyebrow">{HERO.eyebrow}</p>
          <h1>{HERO.title}</h1>
          <p className="ve-hero__description">{HERO.description}</p>
          <div className="ve-hero__ctas">
            <a href={HERO.primaryCta.href} className="btn btn-primary ve-btn">
              {HERO.primaryCta.label} <span aria-hidden="true">→</span>
            </a>
            <a href={HERO.secondaryCta.href} className="btn btn-secondary ve-btn">
              {HERO.secondaryCta.label}
            </a>
          </div>
        </div>
        <div className="ve-hero__stats">
          {HUB_STATS.map((s) => (
            <div className="ve-hero__stat" key={s.label}>
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
      <button type="button" className="ve-scroll-indicator" onClick={() => document.getElementById("engines")?.scrollIntoView({ behavior: "smooth" })} aria-label="Scroll to AI engines">
        <span />
      </button>
    </section>
  );
}

// ============================================================
// AI VELOCITY ENGINES — product grid (static internal pages)
// ============================================================

function ProductsSection() {
  return (
    <section className="section ve-products" id="engines" aria-labelledby="ve-products-heading">
      <div className="container">
        <div className="ve-products__head ve-reveal">
          <img src={Images.illoMultiAgentPipeline} alt="" aria-hidden="true" className="ve-products__illo" loading="lazy" />
          <div className="section-heading">
            <p className="ve-eyebrow">AI Velocity Engines</p>
            <h2 id="ve-products-heading">Pre-Built AI Accelerators, Ready to Deploy</h2>
          </div>
        </div>
        <div className="ve-products__grid ve-reveal-stagger">
          {AI_VELOCITY_PRODUCTS.map((p) =>
            p.href ? (
              <a className="ve-product-card" href={p.href} key={p.title}>
                <img src={p.icon} alt="" loading="lazy" />
                <h3>{p.title}</h3>
                <p>{p.description}</p>
                <span className="ve-product-card__link">Explore <span aria-hidden="true">→</span></span>
              </a>
            ) : (
              // No dedicated page exists yet — a plain, non-interactive card
              // rather than a guessed or dead link.
              <div className="ve-product-card ve-product-card--static" key={p.title}>
                <img src={p.icon} alt="" loading="lazy" />
                <h3>{p.title}</h3>
                <p>{p.description}</p>
                <span className="ve-product-card__link ve-product-card__link--static">Coming Soon</span>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// SEARCH + FILTERS TOOLBAR
// ============================================================

function ToolbarSection({ searchInput, onSearchChange, activeType, onTypeChange, activeIndustry, onIndustryChange }) {
  return (
    <section className="ve-toolbar" id="resources" aria-label="Search and filter AI resources">
      <div className="container">
        <div className="ve-toolbar__search-wrap">
          <label htmlFor="ve-search" className="visually-hidden">Search blogs, AI products, webinars, eBooks, case studies, and use cases</label>
          <input
            id="ve-search"
            type="search"
            className="ve-toolbar__search"
            placeholder="Search blogs, webinars, eBooks, case studies, use cases..."
            value={searchInput}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        <div className="ve-toolbar__filters">
          <div className="ve-toolbar__pills" role="group" aria-label="Filter by content type">
            <button type="button" className={`ve-pill ${activeType === "all" ? "is-active" : ""}`} onClick={() => onTypeChange("all")}>All Content</button>
            {CONTENT_TYPES.map((t) => (
              <button key={t.key} type="button" className={`ve-pill ${activeType === t.key ? "is-active" : ""}`} onClick={() => onTypeChange(t.key)}>
                {t.label}
              </button>
            ))}
          </div>
          <div className="ve-toolbar__pills ve-toolbar__pills--industry" role="group" aria-label="Filter by industry">
            <button type="button" className={`ve-pill ve-pill--ghost ${activeIndustry === "all" ? "is-active" : ""}`} onClick={() => onIndustryChange("all")}>All Industries</button>
            {INDUSTRY_FILTERS.map((i) => (
              <button key={i.key} type="button" className={`ve-pill ve-pill--ghost ${activeIndustry === i.key ? "is-active" : ""}`} onClick={() => onIndustryChange(i.key)}>
                {i.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// FEATURED CONTENT CAROUSEL
// ============================================================

function FeaturedCarousel() {
  const { items, loading } = useFeaturedContent();

  if (loading) {
    return (
      <section className="section ve-featured" aria-label="Featured content">
        <div className="container">
          <div className="ve-skeleton ve-skeleton--carousel" />
        </div>
      </section>
    );
  }

  if (!items.length) return null;

  return (
    <section className="section ve-featured" aria-labelledby="ve-featured-heading">
      <div className="container">
        <div className="section-heading ve-reveal">
          <p className="ve-eyebrow">Featured Content</p>
          <h2 id="ve-featured-heading">The Latest Across Every Resource Type</h2>
        </div>
        <Swiper
          modules={[Autoplay]}
          loop={items.length > 1}
          grabCursor
          speed={700}
          autoplay={{ delay: 5500, disableOnInteraction: false, pauseOnMouseEnter: true }}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{ 900: { slidesPerView: Math.min(2, items.length) } }}
          className="ve-featured__swiper"
        >
          {items.map((item) => (
            <SwiperSlide key={`${item.typeKey}-${item.id}`}>
              <a className="ve-featured-card" href={item.link} target="_blank" rel="noreferrer">
                <div className="ve-featured-card__media" style={item.image ? { backgroundImage: cssUrl(item.image) } : undefined}>
                  {!item.image && <span className="ve-featured-card__placeholder">{item.typeLabel}</span>}
                </div>
                <div className="ve-featured-card__body">
                  <span className="ve-featured-card__tag">{item.typeLabel}</span>
                  <h3>{item.title}</h3>
                  <p>{item.excerpt}</p>
                  <span className="ve-featured-card__meta">{item.dateLabel} · {item.readingTime}</span>
                </div>
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

// ============================================================
// DYNAMIC CONTENT SECTION — one per content type
// ============================================================

function ContentSection({ type, search, expanded, onViewAll }) {
  const [page, setPage] = useState(1);
  const [refreshToken, setRefreshToken] = useState(0);
  const perPage = expanded ? 9 : 3;
  const { posts, loading, error, hasMore } = useWpPosts({ categorySlug: type.categorySlug, search, perPage, page, refreshToken });

  useEffect(() => {
    setPage(1);
  }, [type.categorySlug, search]);

  return (
    <section className={`section ve-content-section ${expanded ? "ve-content-section--expanded" : ""}`} aria-labelledby={`ve-${type.key}-heading`}>
      <div className="container">
        <div className="ve-content-section__header ve-reveal">
          <h2 id={`ve-${type.key}-heading`}>Latest {type.label}</h2>
          {!expanded && (
            <button type="button" className="ve-content-section__view-all" onClick={onViewAll}>
              View all {type.label.toLowerCase()} →
            </button>
          )}
        </div>

        {loading && page === 1 && (
          <div className="ve-cards-grid">
            {Array.from({ length: perPage }).map((_, i) => (
              <div className="ve-skeleton ve-skeleton--card" key={i} />
            ))}
          </div>
        )}

        {!loading && error && (
          <div className="ve-state ve-state--error" role="alert">
            <p>Live content from WordPress couldn't be loaded right now ({error}).</p>
            <button type="button" onClick={() => setRefreshToken((t) => t + 1)}>Retry</button>
          </div>
        )}

        {!error && !loading && posts.length === 0 && (
          <div className="ve-state ve-state--empty">
            <p>No {type.label.toLowerCase()} published yet{search ? ` matching "${search}"` : ""}. Check back soon — new posts appear here automatically.</p>
          </div>
        )}

        {posts.length > 0 && (
          <div className="ve-cards-grid ve-reveal-stagger">
            {posts.map((post) => (
              <ContentCard key={post.id} post={post} ctaLabel={type.ctaLabel} />
            ))}
          </div>
        )}

        {hasMore && posts.length > 0 && (
          <div className="ve-load-more">
            <button type="button" className="btn btn-outline-dark ve-btn" onClick={() => setPage((p) => p + 1)} disabled={loading}>
              {loading ? "Loading…" : "Load More"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function ContentCard({ post, ctaLabel }) {
  return (
    <article className="ve-card">
      <a href={post.link} target="_blank" rel="noreferrer" className="ve-card__media" style={post.image ? { backgroundImage: cssUrl(post.image) } : undefined} aria-hidden={!post.image}>
        {!post.image && <span className="ve-card__media-fallback" aria-hidden="true">{post.title.slice(0, 1)}</span>}
      </a>
      <div className="ve-card__body">
        {post.categoryLabel && <span className="ve-card__badge">{post.categoryLabel}</span>}
        <h3><a href={post.link} target="_blank" rel="noreferrer">{post.title}</a></h3>
        <p>{post.excerpt}</p>
        <div className="ve-card__meta">
          <span>{post.author}</span>
          <span>{post.dateLabel}</span>
          <span>{post.readingTime}</span>
        </div>
        <a href={post.link} target="_blank" rel="noreferrer" className="ve-card__cta">
          {ctaLabel} <span aria-hidden="true">→</span>
        </a>
      </div>
    </article>
  );
}
