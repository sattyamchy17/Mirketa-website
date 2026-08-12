import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { PortableText } from "@portabletext/react";
import Seo from "../../components/Seo/Seo.jsx";
import ConsultationSection from "../../components/ConsultationSection/ConsultationSection.jsx";
import BlogSidebar from "../../components/BlogSidebar/BlogSidebar.jsx";
import { getPostBySlug, cleanSlug } from "../../sanityQueries.js";
import { urlFor } from "../../sanityImage.js";
import { portableTextComponents } from "../../portableTextComponents.jsx";
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
  const [post, setPost] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let cancelled = false;
    setStatus("loading");
    setPost(null);
    getPostBySlug(slug)
      .then((data) => {
        if (cancelled) return;
        if (!data) {
          setStatus("not-found");
        } else {
          setPost(data);
          setStatus("ready");
        }
      })
      .catch(() => {
        if (cancelled) return;
        setStatus("error");
      });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (status === "loading") {
    return (
      <div className="blog-detail">
        <Seo title="Loading Article... | Mirketa" description="Loading article." />
        <p className="blog-detail__status">Loading article...</p>
      </div>
    );
  }

  if (status === "not-found") {
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

  if (status === "error") {
    return (
      <div className="blog-detail">
        <Seo title="Error | Mirketa" description="Unable to load this article." />
        <p className="blog-detail__status">Unable to load articles. Please try again.</p>
      </div>
    );
  }

  const canonicalUrl = post.seo?.canonicalUrl || `${SITE_URL}/blog/${cleanSlug(post.slug.current)}`;
  const heroBackground = post.mainImage ? urlFor(post.mainImage).width(1920).height(1000).fit("crop").auto("format").url() : null;
  const primaryCategory = post.categories?.[0]?.title;

  return (
    <div className="blog-detail">
      <Seo
        title={post.seo?.metaTitle || post.title}
        description={post.seo?.metaDescription || post.excerpt || `Read "${post.title}" on the Mirketa blog.`}
        canonical={canonicalUrl}
        ogImage={post.mainImage ? urlFor(post.mainImage).width(1200).height(630).fit("crop").url() : undefined}
      />
      {post.seo?.noIndex && <meta name="robots" content="noindex, nofollow" />}

      <header
        className={`blog-detail__hero ${heroBackground ? "blog-detail__hero--image" : ""}`}
        style={heroBackground ? { backgroundImage: `url("${heroBackground}")` } : undefined}
      >
        <div className="blog-detail__hero-scrim" aria-hidden="true" />
        <div className="container blog-detail__hero-inner">
          {primaryCategory && <span className="blog-detail__tag">{primaryCategory}</span>}
          <h1>{post.title}</h1>
          <a href="#contact" className="btn btn-primary blog-detail__cta">
            Contact Us <span aria-hidden="true">&rarr;</span>
          </a>
          <div className="blog-detail__meta">
            {post.author?.name && (
              <span className="blog-detail__author">
                {post.author.image ? (
                  <img src={urlFor(post.author.image).width(40).height(40).fit("crop").url()} alt="" loading="lazy" />
                ) : (
                  <span className="blog-detail__author-fallback" aria-hidden="true">
                    {post.author.name.charAt(0)}
                  </span>
                )}
                {post.author.name}
              </span>
            )}
            {post.publishedAt && <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>}
          </div>
        </div>
      </header>

      <section className="section blog-detail__content">
        <div className="container blog-detail__layout">
          <div className="blog-detail__body-wrap">
            <div className="blog-detail__body">
              <PortableText value={post.body} components={portableTextComponents} />
            </div>
          </div>

          <BlogSidebar excludeSlug={post.slug.current} />
        </div>
      </section>

      <ConsultationSection {...CONSULTATION} />
    </div>
  );
}
