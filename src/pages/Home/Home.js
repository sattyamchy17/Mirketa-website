// ============================================================
// HOME.JS
// All homepage JavaScript: data, image references, custom hooks
// (Swiper configs, GSAP animation, counter animation, AI Spotlight
// tabs, scroll effects, event handlers, utility functions).
// Home.jsx only renders JSX using what is exported from this file.
//
// Every image comes from the centralized registry at
// src/assets/images/index.js — never import an image file directly
// here or in Home.jsx. Replacing an image is a one-file swap there.
// ============================================================

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Autoplay } from "swiper/modules";
import { Images } from "../../assets/images/index.js";
import { getLatestPosts, getLatestPostByCategory } from "../../blog/blogUtils.js";

export const playIcon = Images.iconPlay;
export const quoteIcon = Images.iconQuote;

// ================= SEO =================
export const SEO = {
  title: "Enterprise AI Transformation Consulting | Mirketa",
  description:
    "Mirketa designs and deploys agentic AI, CRM, ERP, and cloud platforms that turn fragmented systems into measurable outcomes in 90 days. Get started today.",
  canonical: "https://www.mirketa.com/",
  keywords: [
    "Enterprise AI Transformation",
    "Enterprise AI",
    "AI Consulting Services",
    "Salesforce Crest Partner",
    "Agentic AI",
    "CRM Consulting",
    "ERP Consulting",
    "Cloud Transformation",
    "Digital Transformation",
    "AI Implementation",
    "Business Automation",
    "AI-native digital transformation for enterprises",
    "enterprise AI implementation partner",
    "AI and Salesforce consulting company",
    "enterprise automation and AI consulting",
  ],
  schema: [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Enterprise AI Transformation Consulting | Mirketa",
      url: "https://www.mirketa.com/",
      description:
        "Mirketa designs and deploys agentic AI, CRM, ERP, and cloud platforms that turn fragmented systems into measurable outcomes in 90 days.",
      isPartOf: { "@type": "WebSite", name: "Mirketa", url: "https://www.mirketa.com/" },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://www.mirketa.com/" }],
    },
  ],
};

// ================= HERO =================
export const HERO_CONTENT = {
  heading: "AI-Native Digital Transformation for the Modern Enterprise",
  paragraph:
    "We design, build, and operate agentic AI, CRM, ERP, and cloud platforms that turn fragmented systems into measurable business ones in 90 days.",
  primaryCta: { label: "Get Your AI Readiness Assessment", href: "/ai-readiness"},
  secondaryCta: { label: "Explore AI Solutions", href: "/ai-solutions" },
};

export const HERO_BG_PHOTO = Images.homeHeroBanner;

// ================= CONTACT CTA =================
export const CONTACT_CTA_BG = Images.homeContactCtaBg;

/** GSAP entrance + ambient loop animation for the hero graphic and copy. */
export function useHeroAnimation(textRef, graphicRef) {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(textRef.current.children, {
        y: 28,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
      });

      gsap.to(".hero-orbit", {
        rotation: 360,
        repeat: -1,
        duration: 40,
        ease: "linear",
        transformOrigin: "50% 50%",
      });

      gsap.to(".hero-particle", {
        y: "-=18",
        duration: 2.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.3,
      });

      gsap.to(".hero-glow-line", {
        opacity: 0.9,
        duration: 1.6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.4,
      });
    }, graphicRef);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

// ================= CLIENT LOGOS =================
export const TRUST_BADGES = [
  { label: "Salesforce Crest Partner", sub: "Since 2013", icon: Images.clientSalesforce },
  { label: "HIPAA", sub: "Ready & Compliant", icon: Images.clientHipaa },
  { label: "SOC 2", sub: "Type II Certified", icon: Images.clientSoc2 },
  { label: "15+ Years", sub: "Experience", icon: Images.clientExperience },
  { label: "50+ Enterprise", sub: "Clients", icon: Images.clientEnterprise },
];

/** Doubles a list so a CSS marquee track can loop seamlessly. */
export function duplicateForMarquee(list) {
  return [...list, ...list];
}

// ================= COUNTERS =================
export const STATS = [
  { value: 100, decimals: 0, suffix: "+", label: "Satisfied Clients" },
  { value: 30, decimals: 0, suffix: "+", label: "Enterprise Integration" },
  { value: 1000, decimals: 0, suffix: "+", label: "Successful Projects" },
  { value: 2, decimals: 0, suffix: "M+ Hr", label: "Cloud Experience" },
  { value: 9.6, decimals: 2, suffix: "", label: "CSAT" },
];

/** Fires `true` once an element enters the viewport, then disconnects. */
export function useInView(options = { threshold: 0.3 }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.disconnect();
      }
    }, options);

    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [ref, inView];
}

/** Animates a numeric value from 0 to `end` once `start` becomes true. */
export function useCountUp(end, start, duration = 1800, decimalsOverride = null) {
  const decimals = decimalsOverride ?? (String(end).split(".")[1] || "").length;
  const [value, setValue] = useState((0).toFixed(decimals));
  const rafRef = useRef(null);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!start || hasRun.current) return;
    hasRun.current = true;

    const startTime = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * end;
      setValue(current.toFixed(decimals));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setValue(end.toFixed(decimals));
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => rafRef.current && cancelAnimationFrame(rafRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start]);

  return value;
}

// ================= WHAT WE DO =================
export const WHAT_WE_DO = {
  heading: "What We Do",
  description:
    "We help enterprises modernize operations, deploy AI systems, and scale digital transformation initiatives.",
  cards: [
    {
      title: "Build AI CX",
      description: "Create intelligent customer experiences using generative and Agentic frameworks that drive real engagement.",
      icon: Images.serviceAiCx,
    },
    {
      title: "Modernize Legacy Systems",
      description: "Bridge the gap between legacy and cloud modern tools with secure, high-performance integration layers.",
      icon: Images.serviceLegacySystems,
    },
    {
      title: "Operate & Scale",
      description: "Post-launch governance, DevOps, and managed services to ensure your transformation delivers long-term ROI.",
      icon: Images.serviceOperateScale,
    },
  ],
};

// ================= AI SPOTLIGHT =================
export const AI_SPOTLIGHT_BG = Images.homeAiSpotlightWave;

export const AI_SPOTLIGHT_TABS = [
  {
    id: "agentic-accelerator",
    label: "Agentic Accelerator",
    tag: "",
    heading: "Agentic Accelerator",
    description:
      "Deploy custom AI agents in weeks, not months. Pre-built agent templates and orchestration patterns move you from pilot to production fast.",
    cta: { label: "See Agentforce in Action", href: "/agentforce" },
  },
  {
    id: "ai-readiness-assessment",
    label: "AI Readiness Assessment",
    tag: "FEATURED SERVICE",
    heading: "AI Readiness Assessment",
    description:
      "We evaluate your data infrastructure, security protocols, and operational workflows to build a roadmap for autonomous AI agents.",
    cta: { label: "Start Assessment", href: "/ai-readiness"},
  },
  {
    id: "guardrail-ops",
    label: "Guardrail Ops",
    tag: "",
    heading: "Guardrail Ops",
    description: "Ethics and safety layers for enterprise AI, built directly into every agent workflow we deploy.",
    cta: { label: "Talk to Our AI Architecture Team", href: "/agent-development" },
  },
  {
    id: "guardian-ops",
    label: "Guardian Ops",
    tag: "",
    heading: "Guardian Ops",
    description: "Continuous monitoring and managed AI operations that keep autonomous agents compliant and on-mission.",
    cta: { label: "Talk to Our AI Architecture Team", href: "/agent-development" },
  },
];

/** Generic single-select tab state hook, used by the AI Spotlight section. */
export function useTabs(items, initialId) {
  const [activeId, setActiveId] = useState(initialId);
  const active = items.find((item) => item.id === activeId);
  return { activeId, setActiveId, active };
}

// ================= INDUSTRY SPECIALIZATIONS =================
// education.jpg / financial-services.jpg not shot yet — closest matching
// placeholder graphics render in their place until the real photos land at:
// src/assets/images/industries/education.jpg
// src/assets/images/industries/financial-services.jpg
export const INDUSTRIES = [
  { name: "Nonprofits", tagline: "Mission-aligned journeys", href: "/industries/nonprofits", image: Images.homeIndustryNonprofitsPhoto },
  { name: "Healthcare", tagline: "Patient data unification, HIPAA-ready", href: "/industries/healthcare", image: Images.homeIndustryHealthcarePhoto },
  { name: "Manufacturing", tagline: "Supply chain integration", href: "/industries/manufacturing", image: Images.homeIndustryManufacturingPhoto },
  { name: "Hi-Tech", tagline: "Fraud detection & automated underwriting", href: "/industries/hi-tech", image: Images.homeIndustryHiTechPhoto },
  { name: "Education", tagline: "Predictive retention, unified student view", href: "/industries/education", image: Images.homeIndustryEducationPhoto },
  { name: "Financial Services", tagline: "Compliant AI, modern advisor CRM", href: "/industries/financial-services", image: Images.homeIndustryFinancialServicesPhoto },
];

export const industrySwiperConfig = {
  modules: [Autoplay],
  loop: true,
  speed: 800,
  autoplay: { delay: 3200, disableOnInteraction: false, pauseOnMouseEnter: true },
  spaceBetween: 24,
  slidesPerView: 4,
  breakpoints: {
    0: { slidesPerView: 1.2 },
    560: { slidesPerView: 2.2 },
    900: { slidesPerView: 3 },
    1200: { slidesPerView: 4 },
  },
};

// ================= CUSTOMER SUCCESS =================
export const CUSTOMER_SUCCESS_BG = Images.homeCustomerSuccessPhoto;

// Always the latest "Customer Success" post from the local blog (see
// src/blog/blogUtils.js) — adding a newer post in that category takes over
// this card automatically, with zero edits needed here.
const latestCustomerSuccessPost = getLatestPostByCategory("Customer Success");

export const FEATURED_CASE_STUDY = latestCustomerSuccessPost
  ? {
      title: latestCustomerSuccessPost.title,
      description: latestCustomerSuccessPost.excerpt,
      href: `/blog/${latestCustomerSuccessPost.slug}`,
    }
  : {
      title: "Fortune 500 Financial Services Transformation",
      description: "We orchestrated a multi-cloud Salesforce architecture integrated with...",
      href: "/blog",
    };

// TODO: Add image
// src/assets/images/testimonials/david-miller.jpg
// TODO: Add image
// src/assets/images/testimonials/sarah-richards.jpg
// TODO: Add image
// src/assets/images/testimonials/amir-khan.jpg
// Avatars render as initials-on-green until the photos above are dropped in.
export const TESTIMONIALS = [
  {
    quote:
      "Mirketa's expertise in Salesforce and AI orchestration was the catalyst for our digital transformation. They didn't just implement software — they re-imagined our entire workflow.",
    name: "David Miller",
    title: "CTO, Global Finance Corp",
    initials: "DM",
  },
  {
    quote:
      "The measurable ROI we've seen since partnering with Mirketa is astounding. Their team understands the nuances of enterprise-scale healthcare data like no other partner.",
    name: "Sarah Richards",
    title: "VP of Operations, HealthFirst",
    initials: "SR",
  },
  {
    quote:
      "Mirketa listened first, built second. Our adoption rates on the new platform are the highest we've seen with any technology rollout in a decade.",
    name: "Amir Khan",
    title: "Head of Ops, Meridian Manufacturing",
    initials: "AK",
  },
];

export const testimonialSwiperConfig = {
  modules: [Autoplay],
  loop: true,
  grabCursor: true,
  speed: 700,
  autoplay: { delay: 4200, disableOnInteraction: false, pauseOnMouseEnter: true },
  spaceBetween: 20,
  slidesPerView: 1,
};

// ================= PRODUCTS & IP =================
export const PRODUCTS_SECTION_BG = Images.homeProductsBg;

export const PRODUCTS = [
  { name: "elixir", tagline: "Clinical Trial & Healthcare Life Sciences Management", href: "/products/elixir", icon: Images.homeProductElixirLogo, visual: Images.heroElixirCertifiedModule },
  { name: "RRD", tagline: "Smart Lead & Case Assignment", href: "http://roundrobindistributor.com/", icon: Images.homeProductRrdLogo, visual: null },
  { name: "eCourier", tagline: "Automated Report Scheduler", href: "/ecourier", icon: Images.homeProductEcourierLogo, visual: Images.heroEcourier },
  { name: "Duplicate Search & Merge", tagline: "Clean, AI-Ready Data", href: "/duplicate-search-and-merge", icon: Images.productDuplicateSearchMerge, visual: Images.heroDuplicateSearchAndMerge },
  { name: "AI Accelerators", tagline: "Pre-built, proven, ready to deploy", href: "/products/ai-accelerators", icon: Images.productAiAccelerators, visual: Images.aiNetworkPattern },
];

// ================= TECHNOLOGY PARTNERS =================
// TODO: Add image
// src/assets/images/partners/best-workplaces.jpg
// TODO: Add image
// src/assets/images/partners/netsuite.jpg
// TODO: Add image
// src/assets/images/partners/everest-group.jpg
// TODO: Add image
// src/assets/images/partners/pledge1.jpg
// TODO: Add image
// src/assets/images/partners/salesforce-specialty.jpg
// TODO: Add image
// src/assets/images/partners/oracle.jpg
// Cards render as text badges until the logos above are dropped in.
export const PARTNERS = [
  { name: "Inc. Best Workplaces", sub: "CULTURE AWARD" },
  { name: "NetSuite Alliance Partner", sub: "ERP INTEGRATION" },
  { name: "Everest Group PEAK Matrix 2025", sub: "PEAK MATRIX" },
  { name: "Pledge 1% Member", sub: "PHILANTHROPY" },
  { name: "Salesforce Master Specialty", sub: "HEALTHCARE SPECIALTY" },
  { name: "Oracle Partner", sub: "CLOUD PARTNER" },
];

export const partnersSwiperConfig = {
  modules: [Autoplay],
  loop: true,
  speed: 4000,
  autoplay: { delay: 0, disableOnInteraction: false, pauseOnMouseEnter: true },
  spaceBetween: 20,
  slidesPerView: 5,
  allowTouchMove: false,
  breakpoints: {
    0: { slidesPerView: 2 },
    560: { slidesPerView: 3 },
    900: { slidesPerView: 4 },
    1200: { slidesPerView: 5 },
  },
};

// ================= LATEST INSIGHTS =================
// Backed by the local blog data (see src/blog/blogUtils.js's getLatestPosts) —
// no hardcoded posts here. The 4-item shape below is what the existing
// LatestInsightsSection JSX/CSS in Home.jsx already expects, so the card
// markup itself needs zero changes when the data source changes.
const LATEST_INSIGHTS_COUNT = 4; // matches insightsSwiperConfig's desktop slidesPerView

function formatInsightDate(dateString) {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function mapPostToInsight(post) {
  return {
    category: post.category || "Insights",
    date: formatInsightDate(post.publishedDate),
    title: post.title,
    excerpt: post.excerpt,
    href: `/blog/${post.slug}`,
    image: post.featuredImage || Images.aiNetworkPattern,
  };
}

export const insightsSwiperConfig = {
  speed: 600,
  spaceBetween: 24,
  slidesPerView: 4,
  breakpoints: {
    0: { slidesPerView: 1.1 },
    560: { slidesPerView: 2 },
    900: { slidesPerView: 3 },
    1280: { slidesPerView: 4 },
  },
};

/**
 * Reads the latest posts for the "Latest Insights" section from the local
 * blog data. Synchronous, so `status` is always "ready" — kept in the
 * returned shape so LatestInsightsSection's JSX needs no changes.
 */
export function useInsights() {
  const insights = getLatestPosts(LATEST_INSIGHTS_COUNT).map(mapPostToInsight);
  return { insights, status: "ready" };
}

// ================= SHARED CAROUSEL HELPERS =================
/** Returns stable prev/next handlers bound to a Swiper instance ref. */
export function useCarouselNav() {
  const swiperRef = useRef(null);
  const bindSwiper = (swiper) => {
    swiperRef.current = swiper;
  };
  const slidePrev = () => swiperRef.current?.slidePrev();
  const slideNext = () => swiperRef.current?.slideNext();
  return { bindSwiper, slidePrev, slideNext };
}

/**
 * Builds a safe CSS `url(...)` value for use in inline `background-image` styles.
 * Inline SVGs that reference an internal gradient (`fill="url(#id)"`) get inlined
 * by Vite as a data URI containing literal, unescaped parentheses. Wrapping the
 * whole value in quotes keeps that inner `url(#id)` from breaking the outer
 * `url()` the browser is trying to parse — without quoting, the declaration is
 * silently dropped and the image never appears.
 */
export function cssUrl(src) {
  return `url("${src}")`;
}
