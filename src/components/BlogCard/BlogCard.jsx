import { Link } from "react-router-dom";
import { getPostHref } from "../../blog/blogUtils.js";
import "./BlogCard.css";

function formatDate(dateString) {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

// Visual design intentionally mirrors the homepage's "Latest Insights"
// card (see Home.css .insight-card*) so blog cards feel native to the
// site rather than like a bolted-on generic template.
//
// `post` comes from the local blog data (src/blog) — see
// src/blog/blogUtils.js. All props below `post` are optional and
// default to the standard /blog behavior (category badge, "Read More"
// to /blog/:slug); the Insights hub overrides them per category
// without changing anything for /blog itself. A post with its own
// standalone page (e.g. a webinar) declares `href` in its own data
// file — getPostHref resolves the thumbnail/title/CTA to that real
// page everywhere this card is used, with no per-caller changes.
export default function BlogCard({ post, badgeLabel, ctaLabel, href, external = false, download = false }) {
  const detailHref = getPostHref(post);
  const ctaHref = href || detailHref;
  const badge = badgeLabel ?? post.category;
  const resolvedCtaLabel = ctaLabel || post.ctaLabel || "Read More";

  return (
    <article className="blog-card">
      <Link to={detailHref} className="blog-card__media" style={post.featuredImage ? { backgroundImage: `url("${post.featuredImage}")` } : undefined} aria-hidden="true" tabIndex={-1}>
        {badge && <span className="blog-card__badge">{badge}</span>}
      </Link>
      <div className="blog-card__body">
        <time dateTime={post.publishedDate}>{formatDate(post.publishedDate)}</time>
        <h3>
          <Link to={detailHref}>{post.title}</Link>
        </h3>
        {post.excerpt && <p>{post.excerpt}</p>}
        <div className="blog-card__footer">
          {post.author && (
            <span className="blog-card__author">
              <span className="blog-card__author-fallback" aria-hidden="true">
                {post.author.charAt(0)}
              </span>
              {post.author}
            </span>
          )}
          {external ? (
            <a href={ctaHref} className="blog-card__link" target="_blank" rel="noopener noreferrer" {...(download ? { download: true } : {})}>
              {resolvedCtaLabel} <span aria-hidden="true">&rarr;</span>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          ) : (
            <Link to={ctaHref} className="blog-card__link">
              {resolvedCtaLabel} <span aria-hidden="true">&rarr;</span>
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
