import { useMemo, useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Seo from "../../components/Seo/Seo.jsx";
import BlogCard from "../../components/BlogCard/BlogCard.jsx";
import { getAllPosts, getPostsByCategory, getPostHref } from "../../blog/blogUtils.js";
import { BLOG_CATEGORIES } from "../../blog/blogCategories.js";
import "./Insights.css";

// Every tab maps directly to one of the 4 real categories the local
// blog system organizes around (see src/blog/blogCategories.js) —
// preserving this page's existing tabbed structure. A category added
// here (e.g. PR & News, once real posts exist for it) automatically
// gets its own tab and Load More behavior with no further changes.
const TABS = [{ id: "all", label: "All Insights", category: null }, ...BLOG_CATEGORIES.map((c) => ({ id: c.slug, label: c.name, category: c.name }))];

const FORMATS = BLOG_CATEGORIES.map((c) => c.name);

// Cards shown per "page" below the featured post — divides evenly into
// both the 2-column and 3-column grid breakpoints so a row never ends
// half-full right after loading more.
const PAGE_SIZE = 6;

function formatDate(dateString) {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

// ============================================================
// SIDEBAR — "Latest Blogs" and "Customer Success" are backed by
// real posts from the local blog data (src/blog). "PR & News" has
// no real source anywhere on the site yet (no press/newsroom
// content exists), so it renders an honest empty state rather
// than inventing press releases — swap in real items here once
// that content exists.
// ============================================================
function InsightsSidebar() {
  const latestBlogs = getPostsByCategory("Blogs").slice(0, 5);
  const successStories = getPostsByCategory("Customer Success").slice(0, 3);

  return (
    <aside className="insights-sidebar">
      <div className="insights-side-card">
        <div className="insights-side-card__header">
          <span className="insights-side-card__title">
            <span className="dot-accent" aria-hidden="true" />
            Latest Blogs
          </span>
          <Link to="/blog" className="insights-side-card__link-all">
            View all
          </Link>
        </div>
        {latestBlogs.length === 0 ? (
          <p className="insights-side-empty">No blog posts published yet.</p>
        ) : (
          latestBlogs.map((post) => (
            <Link to={getPostHref(post)} className="insights-latest-item" key={post.slug}>
              <span
                className="insights-latest-thumb"
                style={post.featuredImage ? { backgroundImage: `url("${post.featuredImage}")` } : undefined}
                aria-hidden="true"
              />
              <span>
                <span className="insights-latest-title">{post.title}</span>
                <span className="insights-latest-date">{formatDate(post.publishedDate)}</span>
              </span>
            </Link>
          ))
        )}
      </div>

      <div className="insights-side-card">
        <div className="insights-side-card__header">
          <span className="insights-side-card__title">
            <span className="dot-accent" aria-hidden="true" />
            Customer Success
          </span>
          <Link to="/blog" className="insights-side-card__link-all">
            View all
          </Link>
        </div>
        {successStories.length === 0 ? (
          <p className="insights-side-empty">No Customer Success stories published yet.</p>
        ) : (
          successStories.map((post) => (
            <div className="insights-story-item" key={post.slug}>
              <span className="insights-story-mark">
                <span className="dot" aria-hidden="true" />
                Customer Success
              </span>
              <p className="insights-story-headline">{post.excerpt || post.title}</p>
              <Link to={getPostHref(post)} className="insights-link-arrow">
                Read case study <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          ))
        )}
      </div>

      <div className="insights-side-card">
        <div className="insights-side-card__header">
          <span className="insights-side-card__title">
            <span className="dot-accent" aria-hidden="true" />
            PR &amp; News
          </span>
        </div>
        <p className="insights-side-empty">No press releases or news updates yet — check back soon.</p>
      </div>
    </aside>
  );
}

function FeaturedInsight({ post }) {
  const detailHref = getPostHref(post);

  return (
    <div className="insights-featured" style={post.featuredImage ? { backgroundImage: `url("${post.featuredImage}")` } : undefined}>
      <span className="insights-featured__scrim" aria-hidden="true" />
      <div className="insights-featured__body">
        <span className="insights-featured__badge">{post.category}</span>
        <time dateTime={post.publishedDate}>{formatDate(post.publishedDate)}</time>
        {/* Image/title always open the post's own page — only the explicit CTA
            below can point somewhere external, so there's always a way to read
            the full internal article regardless of category. */}
        <a href={detailHref} className="insights-featured__title-link">
          <h2>{post.title}</h2>
        </a>
        {post.excerpt && <p>{post.excerpt}</p>}
        <a href={detailHref} className="insights-featured__link">
          Read More <span aria-hidden="true">&rarr;</span>
        </a>
      </div>
    </div>
  );
}

export default function Insights() {
  const [activeTab, setActiveTab] = useState("all");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const tabRefs = useRef([]);

  // Light-background hero: the sitewide header defaults to white text
  // assuming a dark hero, so this toggles the same override every other
  // light-background section on the site already relies on (see Header.css
  // ".has-light-hero" / Breadcrumb.css ".breadcrumb--dark").
  useEffect(() => {
    document.documentElement.classList.add("has-light-hero");
    return () => document.documentElement.classList.remove("has-light-hero");
  }, []);

  const activeTabConfig = TABS.find((t) => t.id === activeTab);

  // Local blog data is synchronous — no fetch/loading state needed.
  // getAllPosts/getPostsByCategory already return the complete, sorted
  // collection for the active tab — nothing is dropped here, so the
  // visibleCount slice below is purely a display window, not a data limit.
  const filteredPosts = useMemo(() => {
    return activeTabConfig.category ? getPostsByCategory(activeTabConfig.category) : getAllPosts();
  }, [activeTabConfig]);

  const [featured, ...rest] = filteredPosts;
  const visibleRest = rest.slice(0, visibleCount);
  const hasMore = visibleCount < rest.length;
  const emptyMessage = activeTabConfig.id === "all" ? "No insights available yet." : `No ${activeTabConfig.label} available yet.`;

  // Switching tabs starts each category's Load More back at the first page,
  // whether the tab changed by click or by arrow-key navigation below.
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [activeTab]);

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
        description="Explore Mirketa's customer success stories, blogs, webinars, and e-books on enterprise AI, Salesforce, ERP, and digital transformation."
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
            <p className="insights-hero__panel-title">Browse by Category</p>
            <ul>
              {FORMATS.map((f) => (
                <li key={f}>
                  <span aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M5 12.5l5 5L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
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
        <div className="container insights-content__layout">
          <div className="insights-content__main">
            {filteredPosts.length === 0 && <p className="insights-content__status">{emptyMessage}</p>}

            {filteredPosts.length > 0 && (
              <>
                <FeaturedInsight post={featured} />
                {visibleRest.length > 0 && (
                  <div className="insights-content__grid">
                    {visibleRest.map((post) => (
                      <BlogCard post={post} key={post.slug} />
                    ))}
                  </div>
                )}
                {hasMore && (
                  <div className="insights-content__load-more">
                    <button type="button" className="btn btn-outline-dark" onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}>
                      Load More
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

          <InsightsSidebar />
        </div>
      </section>
    </div>
  );
}
