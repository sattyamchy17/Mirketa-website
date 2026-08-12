import { useEffect, useMemo, useRef, useState } from "react";
import Seo from "../../components/Seo/Seo.jsx";
import BlogCard from "../../components/BlogCard/BlogCard.jsx";
import { getAllInsights, cleanSlug } from "../../sanityQueries.js";
import { urlFor } from "../../sanityImage.js";
import "./Insights.css";

// Every tab's `contentType` value must match the Sanity `post.contentType`
// dropdown option exactly (see the Studio schema and sanityQueries.js).
// Only "Blog" has real content today — the other four are fully wired up,
// they'll just show the empty state until posts are tagged that type in
// Sanity Studio. Old posts with no contentType set are coalesced to "Blog"
// at the query layer, so they always match the "Blogs" tab correctly.
const TABS = [
  { id: "all", label: "All Insights", contentType: null },
  { id: "blogs", label: "Blogs", contentType: "Blog" },
  { id: "case-studies", label: "Case Studies", contentType: "Case Study" },
  { id: "pr", label: "PR", contentType: "PR" },
  { id: "webinars", label: "Webinars", contentType: "Webinar" },
  { id: "ebooks", label: "E-books", contentType: "E-book" },
];

const FORMATS = ["Blogs", "Case Studies", "Press Releases", "Webinars", "E-books"];

const CheckIcon = (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M5 12.5l5 5L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function formatDate(dateString) {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

/**
 * Determines each card's CTA label/destination from its content type.
 * Always falls back to a safe internal "Read More" link — never a broken
 * or missing href — when the type-specific URL hasn't been filled in.
 */
function getInsightCta(post) {
  const internalHref = `/blog/${cleanSlug(post.slug?.current)}`;
  switch (post.contentType) {
    case "Case Study":
      return { label: "Read Case Study", href: internalHref, external: false };
    case "PR":
      return post.externalUrl
        ? { label: "Read More", href: post.externalUrl, external: true }
        : { label: "Read More", href: internalHref, external: false };
    case "Webinar":
      return post.externalUrl
        ? { label: "Watch Webinar", href: post.externalUrl, external: true }
        : { label: "Read More", href: internalHref, external: false };
    case "E-book":
      return post.downloadUrl
        ? { label: "Download E-book", href: post.downloadUrl, external: true, download: true }
        : { label: "Read More", href: internalHref, external: false };
    default:
      return { label: "Read More", href: internalHref, external: false };
  }
}

function FeaturedInsight({ post }) {
  const slug = cleanSlug(post.slug?.current);
  const detailHref = `/blog/${slug}`;
  const bg = post.mainImage ? urlFor(post.mainImage).width(1200).height(700).fit("crop").auto("format").url() : null;
  const cta = getInsightCta(post);

  return (
    <div className="insights-featured" style={bg ? { backgroundImage: `url("${bg}")` } : undefined}>
      <span className="insights-featured__scrim" aria-hidden="true" />
      <div className="insights-featured__body">
        <span className="insights-featured__badge">{post.contentType}</span>
        <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
        {/* Image/title always open the post's own page — only the explicit CTA
            below can point somewhere external, so there's always a way to read
            the full internal article regardless of content type. */}
        <a href={detailHref} className="insights-featured__title-link">
          <h2>{post.title}</h2>
        </a>
        {post.excerpt && <p>{post.excerpt}</p>}
        {cta.external ? (
          <a href={cta.href} className="insights-featured__link" target="_blank" rel="noopener noreferrer" {...(cta.download ? { download: true } : {})}>
            {cta.label} <span aria-hidden="true">&rarr;</span>
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        ) : (
          <a href={cta.href} className="insights-featured__link">
            {cta.label} <span aria-hidden="true">&rarr;</span>
          </a>
        )}
      </div>
    </div>
  );
}

export default function Insights() {
  const [posts, setPosts] = useState(null);
  const [status, setStatus] = useState("loading");
  const [activeTab, setActiveTab] = useState("all");
  const tabRefs = useRef([]);

  // Light-background hero: the sitewide header defaults to white text
  // assuming a dark hero, so this toggles the same override every other
  // light-background section on the site already relies on (see Header.css
  // ".has-light-hero" / Breadcrumb.css ".breadcrumb--dark").
  useEffect(() => {
    document.documentElement.classList.add("has-light-hero");
    return () => document.documentElement.classList.remove("has-light-hero");
  }, []);

  useEffect(() => {
    let cancelled = false;
    getAllInsights()
      .then((data) => {
        if (cancelled) return;
        setPosts(data);
        setStatus("ready");
      })
      .catch((err) => {
        if (cancelled) return;
        console.error("Failed to load insights from Sanity:", err);
        setStatus("error");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const activeTabConfig = TABS.find((t) => t.id === activeTab);
  const filteredPosts = useMemo(() => {
    if (!posts) return [];
    if (!activeTabConfig.contentType) return posts;
    return posts.filter((p) => p.contentType === activeTabConfig.contentType);
  }, [posts, activeTabConfig]);

  const [featured, ...rest] = filteredPosts;
  const emptyMessage = activeTabConfig.id === "all" ? "No insights available yet." : `No ${activeTabConfig.label} available yet.`;

  const handleTabKeyDown = (e, index) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const nextIndex = e.key === "ArrowRight" ? (index + 1) % TABS.length : (index - 1 + TABS.length) % TABS.length;
    setActiveTab(TABS[nextIndex].id);
    tabRefs.current[nextIndex]?.focus();
  };

  return (
    <div className="insights-page">
      <Seo
        title="Insights | Mirketa"
        description="Explore Mirketa's blogs, case studies, press releases, webinars, and e-books on enterprise AI, Salesforce, ERP, and digital transformation."
        canonical="https://www.mirketa.com/insights"
      />

      <header className="insights-hero">
        <div className="container insights-hero__inner">
          <div className="insights-hero__text">
            <span className="insights-hero__eyebrow">
              <span className="insights-hero__eyebrow-dot" aria-hidden="true" /> Insights
            </span>
            <h1>Ideas, Insights &amp; Perspectives That Move Businesses Forward</h1>
            <p>
              Mirketa's insights cover enterprise technology, Salesforce, AI, healthcare, business transformation,
              client success, and the industry trends shaping how modern organizations operate.
            </p>
          </div>
          <div className="insights-hero__panel">
            <p className="insights-hero__panel-title">Browse by Format</p>
            <ul>
              {FORMATS.map((f) => (
                <li key={f}>
                  <span aria-hidden="true">{CheckIcon}</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </header>

      <div className="insights-tabs-wrap">
        <div className="container">
          <div className="insights-tabs" role="tablist" aria-label="Insights categories">
            {TABS.map((tab, i) => (
              <button
                key={tab.id}
                ref={(el) => (tabRefs.current[i] = el)}
                role="tab"
                id={`insights-tab-${tab.id}`}
                aria-selected={activeTab === tab.id}
                aria-controls="insights-tabpanel"
                tabIndex={activeTab === tab.id ? 0 : -1}
                className={`insights-tabs__item ${activeTab === tab.id ? "is-active" : ""}`}
                onClick={() => setActiveTab(tab.id)}
                onKeyDown={(e) => handleTabKeyDown(e, i)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className="section insights-content" id="insights-tabpanel" role="tabpanel" aria-labelledby={`insights-tab-${activeTab}`}>
        <div className="container">
          {status === "loading" && (
            <div className="insights-content__skeleton" aria-hidden="true">
              <div className="insights-content__skeleton-featured" />
              <div className="insights-content__skeleton-grid">
                <div />
                <div />
                <div />
              </div>
            </div>
          )}

          {status === "error" && <p className="insights-content__status">Unable to load insights right now. Please try again.</p>}

          {status === "ready" && filteredPosts.length === 0 && <p className="insights-content__status">{emptyMessage}</p>}

          {status === "ready" && filteredPosts.length > 0 && (
            <>
              <FeaturedInsight post={featured} />
              {rest.length > 0 && (
                <div className="insights-content__grid">
                  {rest.map((post) => {
                    const cta = getInsightCta(post);
                    return <BlogCard post={post} badgeLabel={post.contentType} ctaLabel={cta.label} href={cta.href} external={cta.external} download={cta.download} key={post._id} />;
                  })}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
