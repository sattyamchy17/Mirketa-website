import { useParams, Link } from "react-router-dom";
import Seo from "../../components/Seo/Seo.jsx";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb.jsx";
import ConsultationSection from "../../components/ConsultationSection/ConsultationSection.jsx";
import BlogContent from "../../components/BlogContent/BlogContent.jsx";
import BlogCard from "../../components/BlogCard/BlogCard.jsx";
import { getPostBySlug, getRelatedPosts } from "../../blog/blogUtils.js";
import "../Blog/Blog.css";
import "./BlogDetail.css";

const SITE_URL = "https://www.mirketa.com";

const CONSULTATION = {
  eyebrow: "Get Started",
  heading: "Have Questions? Let's Talk",
  description: "Share a few details about your goals — a Mirketa consultant will follow up within one business day.",
  formTitle: "Schedule a Free Consultation",
};

function formatDate(dateString) {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
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

  const canonicalUrl = `${SITE_URL}/blog/${post.slug}`;
  const relatedPosts = getRelatedPosts(post, 3);

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
        ]}
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
