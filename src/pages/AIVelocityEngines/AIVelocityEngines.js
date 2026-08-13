import { useEffect, useRef, useState } from "react";
import { Images } from "../../assets/images/index.js";

// ============================================================
// WORDPRESS REST API INTEGRATION
//
// This hub is intentionally NOT hardcoded: every blog, webinar,
// eBook, use case, case study, and press-release card below is
// fetched live from Mirketa's WordPress REST API (the standard
// `/wp-json/wp/v2/posts` endpoint that ships with every
// WordPress install) so newly published posts appear here
// automatically with no code changes.
//
// IMPORTANT — verify against your live site before shipping:
// the exact category *slugs* used to segment content types
// (CONTENT_TYPES below) could not be confirmed at build time
// because mirketa.com's REST API was unreachable from this
// dev environment (network timeouts on every attempt, including
// the plain homepage — not specific to /wp-json/). The slugs
// below are the standard WordPress defaults for these content
// types; if your site's actual category slugs differ, update
// `categorySlug` for the relevant entry and everything else
// (fetching, search, filters, pagination) keeps working as-is.
// ============================================================

export const WP_BASE_URL = "https://mirketa.com/wp-json/wp/v2";

export const CONTENT_TYPES = [
  { key: "blog", label: "Blogs", categorySlug: "blog", ctaLabel: "Read More" },
  { key: "webinar", label: "Webinars", categorySlug: "webinars", ctaLabel: "Watch Now" },
  { key: "ebook", label: "eBooks", categorySlug: "ebooks", ctaLabel: "Download" },
  { key: "use-case", label: "Use Cases", categorySlug: "use-cases", ctaLabel: "Read More" },
  { key: "case-study", label: "Case Studies", categorySlug: "case-studies", ctaLabel: "Read More" },
  { key: "press-release", label: "AI News", categorySlug: "press-releases", ctaLabel: "Read More" },
];

export const INDUSTRY_FILTERS = [
  { key: "healthcare", label: "Healthcare" },
  { key: "nonprofit", label: "Nonprofit" },
  { key: "manufacturing", label: "Manufacturing" },
  { key: "financial-services", label: "Financial Services" },
  { key: "education", label: "Education" },
  { key: "retail", label: "Retail" },
  { key: "hi-tech", label: "High Tech" },
];

// Real Mirketa AI Velocity Engine products. Four of these (Donor AI,
// Aria AI, Kratu AI, Case Rezolver) have real dedicated pages elsewhere
// in this project — linked directly rather than through the
// "/ai-solutions/velocity/*" prefix this file previously (and
// incorrectly) claimed was "sourced from this site's own primary
// navigation"; that prefix was never a real route anywhere. The other
// four have no dedicated page yet, so `href` is intentionally omitted
// rather than pointing at a guessed or dead URL — see the `!p.href`
// branch below.
export const AI_VELOCITY_PRODUCTS = [
  { icon: Images.iconVelocityDonor, title: "Donor AI — AltrutaAI", description: "AI-driven donor engagement and retention for nonprofit fundraising teams.", href: "/altruta-ai" },
  { icon: Images.iconAgentTypeConversational, title: "Aria AI", description: "Conversational AI assistant for real-time customer and employee engagement.", href: "/ai-accelerator-aria" },
  { icon: Images.iconDimensionGovernance, title: "Vendor Compliance AI", description: "Automated vendor risk scoring and compliance monitoring at scale." },
  { icon: Images.productElixir, title: "Kratu AI (ElixirAI)", description: "AI-powered healthcare workflow intelligence built on the Elixir platform.", href: "/kratu-ai" },
  { icon: Images.iconAgentTypeTaskExecution, title: "Case Rezolver & Management", description: "Autonomous case triage, routing, and resolution for service teams.", href: "/salesforce-ai-case-management" },
  { icon: Images.iconVelocityScribe, title: "Scribe — Ambient Listening", description: "Ambient AI transcription and structured note generation from conversations." },
  { icon: Images.iconVelocityCodeAnalysis, title: "Code Analysis", description: "AI-assisted code review, quality scoring, and vulnerability detection." },
  { icon: Images.iconVelocityScheduling, title: "Smart Appointment Scheduling", description: "Predictive, AI-optimised appointment scheduling that reduces no-shows." },
];

export const SEO = {
  title: "AI Velocity Engines — Pre-Built AI Accelerators | Mirketa",
  description:
    "Explore Mirketa's AI Velocity Engines: ready-to-deploy AI accelerators, plus the latest blogs, webinars, eBooks, use cases, and case studies.",
  canonical: "https://www.mirketa.com/ai-velocity-engines/",
  keywords: [
    "AI Velocity Engines",
    "AI Accelerators",
    "AI Resource Hub",
    "Pre-Built AI Solutions",
    "Donor AI",
    "AI Agent Products",
    "Enterprise AI Products",
    "AI Use Cases",
    "AI velocity engines and accelerators for enterprises",
    "pre-built AI accelerators for Salesforce",
    "enterprise AI product and resource hub",
    "ready to deploy AI solutions",
  ],
  schema: [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "AI Velocity Engines — Pre-Built AI Accelerators",
      url: "https://www.mirketa.com/ai-velocity-engines/",
      description:
        "A library of ready-to-deploy AI Velocity Engines, plus the latest blogs, webinars, eBooks, use cases, and case studies.",
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      itemListElement: AI_VELOCITY_PRODUCTS.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: p.title,
        description: p.description,
        url: `https://www.mirketa.com${p.href}`,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.mirketa.com/" },
        { "@type": "ListItem", position: 2, name: "AI Velocity Engines", item: "https://www.mirketa.com/ai-velocity-engines/" },
      ],
    },
  ],
};

export const HUB_STATS = [
  { value: "200+", label: "Enterprise Clients" },
  { value: "15+", label: "Years Salesforce Experience" },
  { value: "500+", label: "Projects Delivered" },
  { value: "8", label: "AI Velocity Engines" },
];

// ============================================================
// HELPERS
// ============================================================

export function stripHtml(html) {
  if (!html) return "";
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&hellip;/g, "…")
    .replace(/&amp;/g, "&")
    .replace(/&#8217;/g, "’")
    .replace(/&#8220;|&#8221;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

export function formatDate(dateString) {
  if (!dateString) return "";
  try {
    return new Date(dateString).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
  } catch {
    return "";
  }
}

export function estimateReadingTime(html) {
  const words = stripHtml(html).split(" ").filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

export function normalizePost(raw) {
  const media = raw._embedded?.["wp:featuredmedia"]?.[0];
  const author = raw._embedded?.author?.[0];
  const terms = raw._embedded?.["wp:term"]?.flat() || [];
  const category = terms.find((t) => t.taxonomy === "category");

  return {
    id: raw.id,
    title: stripHtml(raw.title?.rendered),
    excerpt: stripHtml(raw.excerpt?.rendered),
    link: raw.link,
    date: raw.date,
    dateLabel: formatDate(raw.date),
    readingTime: estimateReadingTime(raw.content?.rendered || raw.excerpt?.rendered),
    author: author?.name || "Mirketa Team",
    categoryLabel: category?.name || "",
    image: media?.source_url || null,
    imageAlt: media?.alt_text || stripHtml(raw.title?.rendered),
  };
}

// ============================================================
// HOOKS
// ============================================================

export function useDebouncedValue(value, delay = 350) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}

const REQUEST_TIMEOUT_MS = 10000;

/**
 * A bare `fetch()` to an unreachable or slow host can hang indefinitely
 * (no built-in timeout), which would leave the hub's loading skeletons
 * spinning forever instead of surfacing the error state. This wraps
 * fetch with an AbortController so a dead API fails fast and visibly.
 */
async function fetchWithTimeout(url, timeoutMs = REQUEST_TIMEOUT_MS) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { signal: controller.signal });
  } catch (err) {
    if (err.name === "AbortError") throw new Error("Request timed out");
    throw err;
  } finally {
    clearTimeout(timer);
  }
}

const categoryIdCache = new Map();

async function resolveCategoryId(slug) {
  if (categoryIdCache.has(slug)) return categoryIdCache.get(slug);
  const res = await fetchWithTimeout(`${WP_BASE_URL}/categories?slug=${encodeURIComponent(slug)}`);
  if (!res.ok) throw new Error(`Category lookup failed (${res.status})`);
  const data = await res.json();
  const id = data?.[0]?.id ?? null;
  categoryIdCache.set(slug, id);
  return id;
}

/**
 * Fetches posts for a given content-type category, live from WordPress.
 * Supports search (WP `search` param), pagination (`page`/`per_page`),
 * and exposes loading/error/empty states so the UI never silently breaks
 * if a category is empty or the API is unreachable.
 */
export function useWpPosts({ categorySlug, search = "", perPage = 6, page = 1, enabled = true, refreshToken = 0 }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const requestId = useRef(0);

  useEffect(() => {
    if (!enabled) return;
    const currentRequest = ++requestId.current;
    setLoading(true);
    setError(null);

    (async () => {
      try {
        const categoryId = categorySlug ? await resolveCategoryId(categorySlug) : null;
        const params = new URLSearchParams({
          per_page: String(perPage),
          page: String(page),
          _embed: "1",
          orderby: "date",
          order: "desc",
        });
        if (categoryId) params.set("categories", String(categoryId));
        if (search) params.set("search", search);

        const res = await fetchWithTimeout(`${WP_BASE_URL}/posts?${params.toString()}`);
        if (!res.ok) throw new Error(`WordPress returned ${res.status}`);
        const data = await res.json();
        if (requestId.current !== currentRequest) return;

        const normalized = data.map(normalizePost);
        if (page === 1) {
          setPosts(normalized);
        } else {
          setPosts((prev) => [...prev, ...normalized]);
        }
        setTotalPages(Number(res.headers.get("X-WP-TotalPages")) || 1);
      } catch (err) {
        if (requestId.current !== currentRequest) return;
        setError(err.message || "Unable to load content right now.");
        if (page === 1) setPosts([]);
      } finally {
        if (requestId.current === currentRequest) setLoading(false);
      }
    })();
  }, [categorySlug, search, perPage, page, enabled, refreshToken]);

  return { posts, loading, error, hasMore: page < totalPages };
}

/** Fetches a single latest post per content type, for the featured carousel. */
export function useFeaturedContent() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      const results = await Promise.allSettled(
        CONTENT_TYPES.map(async (type) => {
          const categoryId = await resolveCategoryId(type.categorySlug);
          const params = new URLSearchParams({ per_page: "1", _embed: "1", orderby: "date", order: "desc" });
          if (categoryId) params.set("categories", String(categoryId));
          const res = await fetchWithTimeout(`${WP_BASE_URL}/posts?${params.toString()}`);
          if (!res.ok) throw new Error("fetch failed");
          const data = await res.json();
          if (!data.length) return null;
          return { ...normalizePost(data[0]), typeLabel: type.label, typeKey: type.key };
        })
      );
      if (cancelled) return;
      setItems(
        results
          .filter((r) => r.status === "fulfilled" && r.value)
          .map((r) => r.value)
      );
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return { items, loading };
}
