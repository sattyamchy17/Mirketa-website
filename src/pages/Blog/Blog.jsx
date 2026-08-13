import { useMemo, useState } from "react";
import Seo from "../../components/Seo/Seo.jsx";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb.jsx";
import ConsultationSection from "../../components/ConsultationSection/ConsultationSection.jsx";
import BlogCard from "../../components/BlogCard/BlogCard.jsx";
import { getAllPosts, getPostsByCategory } from "../../blog/blogUtils.js";
import { BLOG_CATEGORIES } from "../../blog/blogCategories.js";
import "./Blog.css";

const BREADCRUMB_ITEMS = [{ label: "Home", href: "/" }, { label: "Blog" }];

const CONSULTATION = {
  eyebrow: "Get Started",
  heading: "Have a Project in Mind? Let's Talk",
  description: "Share a few details about your goals — a Mirketa consultant will follow up within one business day.",
  formTitle: "Schedule a Free Consultation",
};

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState(null);

  // Local blog data is synchronous — no fetch/loading state needed.
  const posts = useMemo(() => (activeCategory ? getPostsByCategory(activeCategory) : getAllPosts()), [activeCategory]);

  return (
    <div className="blog-index">
      <Seo
        title="Blog | Insights on AI, Salesforce, ERP & Enterprise Technology | Mirketa"
        description="Practical insights on enterprise AI, Salesforce, ERP, and digital transformation from Mirketa's consulting team."
        canonical="https://www.mirketa.com/blog"
      />

      <header className="blog-index__header">
        <div className="container">
          <Breadcrumb items={BREADCRUMB_ITEMS} />
          <p className="blog-index__eyebrow">Insights</p>
          <h1>The Mirketa Blog</h1>
          <p className="blog-index__intro">Practical, no-fluff perspectives on enterprise AI, Salesforce, ERP, and digital transformation.</p>
        </div>
      </header>

      <section className="section blog-index__content">
        <div className="container">
          <div className="blog-index__filters" role="tablist" aria-label="Filter articles by category">
            <button type="button" className={`blog-index__filter ${!activeCategory ? "is-active" : ""}`} onClick={() => setActiveCategory(null)}>
              All
            </button>
            {BLOG_CATEGORIES.map((cat) => (
              <button
                key={cat.name}
                type="button"
                className={`blog-index__filter ${activeCategory === cat.name ? "is-active" : ""}`}
                onClick={() => setActiveCategory(cat.name)}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {posts.length === 0 ? (
            <p className="blog-index__status">No articles found.</p>
          ) : (
            <div className="blog-index__grid">
              {posts.map((post) => (
                <BlogCard post={post} key={post.slug} />
              ))}
            </div>
          )}
        </div>
      </section>

      <ConsultationSection {...CONSULTATION} />
    </div>
  );
}
