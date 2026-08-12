import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getLatestBlogs, getLatestCaseStudies, getLatestPressReleases, cleanSlug } from "../../sanityQueries.js";
import { urlFor } from "../../sanityImage.js";
import "./BlogSidebar.css";

function SidebarItem({ post }) {
  const slug = cleanSlug(post.slug?.current);
  const thumb = post.mainImage ? urlFor(post.mainImage).width(160).height(140).fit("crop").auto("format").url() : null;

  return (
    <Link to={`/blog/${slug}`} className="blog-sidebar__item">
      <span className="blog-sidebar__thumb" aria-hidden={!thumb} style={thumb ? { backgroundImage: `url("${thumb}")` } : undefined} />
      <span className="blog-sidebar__item-title">{post.title}</span>
    </Link>
  );
}

function SidebarSection({ heading, posts }) {
  if (!posts || posts.length === 0) return null;
  return (
    <div className="blog-sidebar__section">
      <p className="blog-sidebar__heading">{heading}</p>
      <div className="blog-sidebar__list">
        {posts.map((post) => (
          <SidebarItem post={post} key={post._id} />
        ))}
      </div>
    </div>
  );
}

// Related-content rail for the blog detail page. All three sections are
// dynamic — none of this is hardcoded — and each section hides itself
// entirely if Sanity has no matching content yet (see sanityQueries.js:
// "Case Study" and "Press Release" categories don't exist in the dataset
// today, so those two sections render nothing until posts are tagged that way).
export default function BlogSidebar({ excludeSlug }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    let cancelled = false;
    Promise.all([getLatestBlogs(2, excludeSlug), getLatestCaseStudies(2, excludeSlug), getLatestPressReleases(2, excludeSlug)])
      .then(([blogs, caseStudies, pressReleases]) => {
        if (cancelled) return;
        setData({ blogs, caseStudies, pressReleases });
      })
      .catch((err) => {
        if (cancelled) return;
        console.error("Failed to load blog sidebar content from Sanity:", err);
        setData({ blogs: [], caseStudies: [], pressReleases: [] });
      });
    return () => {
      cancelled = true;
    };
  }, [excludeSlug]);

  if (!data) return null;
  if (data.blogs.length === 0 && data.caseStudies.length === 0 && data.pressReleases.length === 0) return null;

  return (
    <aside className="blog-sidebar" aria-label="Related content">
      <SidebarSection heading="Latest Blogs" posts={data.blogs} />
      <SidebarSection heading="Latest Case Studies" posts={data.caseStudies} />
      <SidebarSection heading="Latest Press Releases" posts={data.pressReleases} />
    </aside>
  );
}
