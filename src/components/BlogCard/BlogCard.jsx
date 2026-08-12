import { Link } from "react-router-dom";
import { urlFor } from "../../sanityImage.js";
import { cleanSlug } from "../../sanityQueries.js";
import "./BlogCard.css";

function formatDate(dateString) {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

// Visual design intentionally mirrors the homepage's "Latest Insights"
// card (see Home.css .insight-card*) so blog cards feel native to the
// site rather than like a bolted-on generic template.
//
// All props below the required `post` are optional and default to the
// original /blog behavior (category badge, "Read More" to /blog/:slug) —
// the Insights hub overrides `badgeLabel`/`ctaLabel`/`href`/`external`/
// `download` per content type without changing anything for /blog.
export default function BlogCard({ post, badgeLabel, ctaLabel = "Read More", href, external = false, download = false }) {
  const slug = cleanSlug(post.slug?.current);
  const detailHref = `/blog/${slug}`;
  const ctaHref = href || detailHref;
  const badge = badgeLabel ?? post.categories?.[0]?.title;
  const imageUrl = post.mainImage ? urlFor(post.mainImage).width(600).height(340).fit("crop").auto("format").url() : null;

  return (
    <article className="blog-card">
      <Link to={detailHref} className="blog-card__media" style={imageUrl ? { backgroundImage: `url("${imageUrl}")` } : undefined} aria-hidden="true" tabIndex={-1}>
        {badge && <span className="blog-card__badge">{badge}</span>}
      </Link>
      <div className="blog-card__body">
        <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
        <h3>
          <Link to={detailHref}>{post.title}</Link>
        </h3>
        {post.excerpt && <p>{post.excerpt}</p>}
        <div className="blog-card__footer">
          {post.author?.name && (
            <span className="blog-card__author">
              {post.author.image ? (
                <img src={urlFor(post.author.image).width(40).height(40).fit("crop").url()} alt="" loading="lazy" />
              ) : (
                <span className="blog-card__author-fallback" aria-hidden="true">
                  {post.author.name.charAt(0)}
                </span>
              )}
              {post.author.name}
            </span>
          )}
          {external ? (
            <a href={ctaHref} className="blog-card__link" target="_blank" rel="noopener noreferrer" {...(download ? { download: true } : {})}>
              {ctaLabel} <span aria-hidden="true">&rarr;</span>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          ) : (
            <Link to={ctaHref} className="blog-card__link">
              {ctaLabel} <span aria-hidden="true">&rarr;</span>
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
