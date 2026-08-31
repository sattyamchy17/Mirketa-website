import { useParams, Link, Navigate } from "react-router-dom";
import Seo from "../../components/Seo/Seo.jsx";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb.jsx";
import ConsultationSection from "../../components/ConsultationSection/ConsultationSection.jsx";
import BlogContent from "../../components/BlogContent/BlogContent.jsx";
import BlogCard from "../../components/BlogCard/BlogCard.jsx";
import { getPostBySlug, getRelatedPosts, getPostsByCategory, getPostHref } from "../../blog/blogUtils.js";
import "../Blog/Blog.css";
import "./BlogDetail.css";

const SITE_URL = "https://www.mirketa.com";

const CONSULTATION = {
  eyebrow: "Get Started",
  heading: "Have Questions? Let's Talk",
  description: "Share a few details about your goals — a Mirketa consultant will follow up within one business day.",
  formTitle: "Schedule a Free Consultation",
};

// Discovery sidebar widgets shown on every post's detail page (not the
// Insights landing page, which has its own separate sidebar). "PR & News"
// has no real source anywhere on the site yet, so it renders an honest
// empty state instead of inventing press releases.
const DISCOVERY_WIDGETS = [
  { title: "Featured Blogs", category: "Blogs", kind: "Blog" },
  { title: "Customer Success", category: "Customer Success", kind: "Customer Success" },
  { title: "PR & News", category: null, kind: "News" },
  { title: "Webinars", category: "Webinars", kind: "Webinar" },
];

function formatDate(dateString) {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

function formatMonthYear(dateString) {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

function DiscoveryCard({ post, kind }) {
  return (
    <Link to={getPostHref(post)} className="bd-discovery-card">
      <span
        className="bd-discovery-card__media"
        style={post.featuredImage ? { backgroundImage: `url("${post.featuredImage}")` } : undefined}
        aria-hidden="true"
      />
      <span className="bd-discovery-card__title">{post.title}</span>
      <span className="bd-discovery-card__meta">
        {kind} &bull; {formatMonthYear(post.publishedDate)}
      </span>
    </Link>
  );
}

function DiscoveryWidget({ title, category, kind, excludeSlug }) {
  const posts = category
    ? getPostsByCategory(category)
        .filter((p) => p.slug !== excludeSlug)
        .slice(0, 3)
    : [];

  return (
    <div className="bd-sidebar__widget">
      <div className="bd-sidebar__widget-header">
        <span className="bd-sidebar__widget-title">
          <span className="dot-accent" aria-hidden="true" />
          {title}
        </span>
        <Link to="/insights" className="bd-sidebar__widget-link">
          View all
        </Link>
      </div>
      {posts.length === 0 ? (
        <p className="bd-sidebar__empty">No {title.toLowerCase()} yet — check back soon.</p>
      ) : (
        <div className="bd-sidebar__cards">
          {posts.map((p) => (
            <DiscoveryCard post={p} kind={kind} key={p.slug} />
          ))}
        </div>
      )}
    </div>
  );
}

function BlogDetailSidebar({ excludeSlug }) {
  return (
    <aside className="bd-sidebar">
      {DISCOVERY_WIDGETS.map((w) => (
        <DiscoveryWidget key={w.title} title={w.title} category={w.category} kind={w.kind} excludeSlug={excludeSlug} />
      ))}
    </aside>
  );
}

export default function BlogDetail() {
  const { slug } = useParams();
  // Local blog data is synchronous — no fetch/loading state needed.
  const post = getPostBySlug(slug);

  if (!post) {
    return (
      <div className="blog-detail">
        <Seo title="Article Not Found | Mirketa" description="This article could not be found." />
        <div className="blog-detail__status">
          <p>Article not found.</p>
          <Link to="/blog" className="btn btn-primary">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  // A post with its own standalone page (e.g. a webinar with a hero and
  // video embed) declares `href` in its data file — /blog/:slug redirects
  // there instead of rendering the generic article template, which has
  // no content blocks for it.
  if (post.href) {
    return <Navigate to={post.href} replace />;
  }

  const canonicalUrl = `${SITE_URL}/blog/${post.slug}`;
  const relatedPosts = getRelatedPosts(post, 3);
  const faqItems = (post.content || []).filter((block) => block.type === "faq").flatMap((block) => block.items || []);

  return (
    <div className="blog-detail">
      <Seo
        title={post.seoTitle || post.title}
        description={post.seoDescription || post.excerpt || `Read "${post.title}" on the Mirketa blog.`}
        canonical={canonicalUrl}
        keywords={[post.primaryKeyword, ...(post.secondaryKeywords || [])].filter(Boolean)}
        ogImage={post.featuredImage ? new URL(post.featuredImage, SITE_URL).href : undefined}
        schema={[
          {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.excerpt,
            image: post.featuredImage,
            author: post.author ? { "@type": "Person", name: post.author } : undefined,
            publisher: { "@type": "Organization", name: "Mirketa Inc.", url: SITE_URL },
            datePublished: post.publishedDate,
            dateModified: post.publishedDate,
            mainEntityOfPage: canonicalUrl,
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
              { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
              { "@type": "ListItem", position: 3, name: post.title, item: canonicalUrl },
            ],
          },
          faqItems.length > 0
            ? {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: faqItems.map((item) => ({
                  "@type": "Question",
                  name: item.question,
                  acceptedAnswer: { "@type": "Answer", text: item.answer },
                })),
              }
            : undefined,
        ].filter(Boolean)}
      />

      <header className={`blog-detail__hero ${post.featuredImage ? "blog-detail__hero--image" : ""}`}>
        {post.featuredImage && (
          <div className="blog-detail__hero-media" style={{ backgroundImage: `url("${post.featuredImage}")` }}>
            <div className="blog-detail__hero-scrim" aria-hidden="true" />
            <span className="sr-only">{post.featuredImageAlt || `${post.title} — featured image`}</span>
          </div>
        )}
        <div className="container blog-detail__hero-inner">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }, { label: post.title }]} />
          {post.category && <span className="blog-detail__tag">{post.category}</span>}
          <h1>{post.title}</h1>
          <a href="#contact" className="btn btn-primary blog-detail__cta">
            Contact Us <span aria-hidden="true">&rarr;</span>
          </a>
          <div className="blog-detail__meta">
            {post.author && (
              <span className="blog-detail__author">
                <span className="blog-detail__author-fallback" aria-hidden="true">
                  {post.author.charAt(0)}
                </span>
                {post.author}
              </span>
            )}
            {post.publishedDate && <time dateTime={post.publishedDate}>{formatDate(post.publishedDate)}</time>}
            {post.readingTime && <span className="blog-detail__reading-time">{post.readingTime}</span>}
          </div>
        </div>
      </header>

      <section className="section blog-detail__content">
        <div className="container blog-detail__body-wrap">
          <div className="blog-detail__body">
            <BlogContent blocks={post.content} />
          </div>
          <BlogDetailSidebar excludeSlug={post.slug} />
        </div>
      </section>

      {relatedPosts.length > 0 && (
        <section className="section blog-detail__related" aria-labelledby="blog-related-heading">
          <div className="container">
            <h2 id="blog-related-heading">Related Articles</h2>
            <div className="blog-index__grid">
              {relatedPosts.map((related) => (
                <BlogCard post={related} key={related.slug} />
              ))}
            </div>
          </div>
        </section>
      )}

      <ConsultationSection {...CONSULTATION} />
    </div>
  );
}
