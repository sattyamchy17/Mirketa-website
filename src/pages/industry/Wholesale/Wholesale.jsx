import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Images } from "../../../assets/images/index.js";
import { INDUSTRY_PAGES, ORACLE_PAGES, NETSUITE_PAGES, AI_PAGES, CLOUD_PAGES } from "../../../config/pageSlugs.js";
import Seo from "../../../components/Seo/Seo.jsx";
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb.jsx";
import StickyCta from "../../../components/StickyCta/StickyCta.jsx";
import TrustedByMarquee from "../../../components/TrustedByMarquee/TrustedByMarquee.jsx";
import AnimatedCounter from "../../../components/AnimatedCounter/AnimatedCounter.jsx";
import FaqAccordion from "../../../components/FaqAccordion/FaqAccordion.jsx";
import HeroVisual from "../../../components/HeroVisual/HeroVisual.jsx";
import ConsultationSection from "../../../components/ConsultationSection/ConsultationSection.jsx";
import RelatedServices from "../../../components/RelatedServices/RelatedServices.jsx";
import WorkflowDiagram from "../../../components/illustrations/WorkflowDiagram/WorkflowDiagram.jsx";
import SupplyChainMap from "../../../components/illustrations/SupplyChainMap/SupplyChainMap.jsx";
import AnalyticsPanel from "../../../components/illustrations/AnalyticsPanel/AnalyticsPanel.jsx";
import "./Wholesale.css";

gsap.registerPlugin(ScrollTrigger);

// ============================================================
// SLUG / SEO CONFIGURATION — kept local to this component per
// project convention, sourced from the central pageSlugs.js entry
// so the URL itself still only needs to change in one place.
// ============================================================

export const pageSEO = {
  slug: `${INDUSTRY_PAGES.WHOLESALE.slug}/`,
  title: "Wholesale Distribution Solutions | Mirketa",
  description:
    "Wholesale Distribution Solutions from Mirketa: inventory management, supply chain visibility, B2B order management, and ERP for distributors and sellers.",
};

// ============================================================
// ICONS
// ============================================================

const Ico = {
  check: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12.5l5 5L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  truck: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 7h11v9H3V7z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="M14 11h4l3 3v2h-7v-5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><circle cx="7" cy="18" r="1.6" stroke="currentColor" strokeWidth="1.3" /><circle cx="17.5" cy="18" r="1.6" stroke="currentColor" strokeWidth="1.3" /></svg>
  ),
  box: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 7l9-4 9 4-9 4-9-4z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M3 7v10l9 4 9-4V7M12 11v10" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /></svg>
  ),
  route: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="6" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.4" /><circle cx="18" cy="18" r="2.5" stroke="currentColor" strokeWidth="1.4" /><path d="M6 8.5V13a4 4 0 004 4h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
  ),
  db: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><ellipse cx="12" cy="6" rx="7" ry="3" stroke="currentColor" strokeWidth="1.4" /><path d="M5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6" stroke="currentColor" strokeWidth="1.4" /><path d="M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3" stroke="currentColor" strokeWidth="1.4" /></svg>
  ),
  compass: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" /><path d="M15 9l-2 6-6 2 2-6 6-2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  clock: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" /><path d="M12 7v5l3.5 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
  ),
  award: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="8" r="5" stroke="currentColor" strokeWidth="1.4" /><path d="M8.5 12.5L7 21l5-2.5L17 21l-1.5-8.5" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  users: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="9" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.4" /><path d="M3.5 19c.6-3.4 2.9-5.2 5.5-5.2s4.9 1.8 5.5 5.2" stroke="currentColor" strokeWidth="1.4" /><circle cx="17" cy="9" r="2.6" stroke="currentColor" strokeWidth="1.3" opacity="0.7" /><path d="M15.5 13.4c2.2.3 3.7 1.9 4 4.6" stroke="currentColor" strokeWidth="1.3" opacity="0.7" /></svg>
  ),
  heart: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 20s-7-4.5-9.3-9A5 5 0 0112 6a5 5 0 019.3 5c-2.3 4.5-9.3 9-9.3 9z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  brain: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 4a3 3 0 00-3 3v1a3 3 0 000 6v1a3 3 0 003 3M15 4a3 3 0 013 3v1a3 3 0 010 6v1a3 3 0 01-3 3M9 4v16M15 4v16" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
  ),
  cloud: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 18h10a4 4 0 000-8 5.5 5.5 0 00-10.7-1.7A4.5 4.5 0 007 18z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  factory: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 21V11l5 3V11l5 3V8l8 5v8H3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  cart: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 4h2l2.2 11h10.6L20 7H6.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /><circle cx="9" cy="20" r="1.3" fill="currentColor" /><circle cx="17" cy="20" r="1.3" fill="currentColor" /></svg>
  ),
  bolt: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M13 3L5 14h6l-1 7 8-11h-6l1-7z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  bandage: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="4" y="9" width="16" height="6" rx="3" transform="rotate(-30 12 12)" stroke="currentColor" strokeWidth="1.4" /><circle cx="9.5" cy="10" r="1" fill="currentColor" /><circle cx="14.5" cy="14" r="1" fill="currentColor" /></svg>
  ),
};

// ============================================================
// DATA
// ============================================================

const BREADCRUMB_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Industry", href: "/" },
  { label: INDUSTRY_PAGES.WHOLESALE.label },
];

const HERO = {
  badge: "Wholesale Distribution Technology Partner",
  title: "Wholesale Distribution Solutions Built to Keep Inventory and Orders in Sync",
  description:
    "Mirketa's Wholesale Distribution Solutions connect inventory, purchasing, and B2B order management into one accurate, real-time view — so warehouse teams stop guessing on stock levels, sales reps quote from real availability, and supply chain visibility extends all the way to your suppliers.",
  primaryCta: { label: "Get a Distribution Technology Assessment", href: "#contact" },
  secondaryCta: { label: "Talk to a Distribution Solutions Advisor", href: "#contact" },
  metrics: ["ERP-Certified Distribution Consultants", "Real-Time Inventory Accuracy", "Supplier & B2B Portal Integration", "Fixed-Scope Delivery Timelines"],
};

const HERO_DASHBOARD = {
  title: "Distribution Operations Console",
  stats: [
    { label: "INVENTORY ACCURACY", value: "99.3%", caption: "Across all warehouses" },
    { label: "STOCKOUT RATE", value: "-27%", caption: "After reorder automation" },
    { label: "ON-TIME DELIVERY", value: "97.8%", caption: "B2B order fulfillment" },
  ],
  rows: [
    { title: "Reorder point triggered — SKU 4471", meta: "Purchase order auto-generated", tone: "good", status: "Complete" },
    { title: "Inbound shipment — supplier #12", meta: "In transit · ETA 2 days", tone: "neutral", status: "In Progress" },
    { title: "B2B order sync — customer portal", meta: "Real-time inventory check", tone: "good", status: "Verified" },
  ],
  floatingCards: [
    { icon: Ico.box, title: "Real-Time Inventory", subtitle: "99.3% accuracy across sites" },
    { icon: Ico.truck, title: "Supplier Visibility", subtitle: "Inbound shipments tracked" },
  ],
};

const CHALLENGES = {
  eyebrow: "Industry Challenges",
  heading: "Why Inventory and Order Data Fall Out of Sync for Distributors",
  intro:
    "Wholesale distribution technology challenges rarely trace back to one broken system. They trace back to warehouse, ERP, and B2B ordering systems that were never designed to update each other in real time.",
  items: [
    { title: "Inventory Counts Don't Match Reality", description: "Warehouse management and ERP systems fall out of sync, so sales reps quote availability that doesn't actually exist." },
    { title: "Reordering Happens Reactively", description: "Purchase orders get triggered after a stockout instead of before one, because reorder points aren't connected to real usage data." },
    { title: "B2B Customers Can't See Real Availability", description: "Customer ordering portals show stale inventory data, leading to order cancellations and frustrated repeat buyers." },
    { title: "No Visibility Into Supplier Shipments", description: "Purchasing teams have no way to see inbound shipment status without calling suppliers directly." },
  ],
};

const SOLUTION = {
  eyebrow: "Industry Solutions",
  heading: "One Real-Time View Across Inventory, Orders, and Suppliers",
  paragraphs: [
    "Mirketa's Wholesale Distribution Solutions start by connecting warehouse management, ERP, and B2B ordering systems so inventory counts update everywhere the moment a transaction happens — not overnight, not on the next batch sync.",
    "Reorder automation is built on top of that real-time data, so purchase orders trigger based on actual usage patterns and lead times instead of a static reorder point nobody has updated in years. That means fewer emergency orders and fewer stockouts on the SKUs your customers order most.",
    "For distributors managing complex supplier networks, we extend that same visibility upstream — connecting inbound shipment tracking so purchasing teams know what's coming before it arrives, not after a customer asks why their order is delayed.",
  ],
};

const SERVICES = {
  eyebrow: "Services We Offer",
  heading: "Six Ways Mirketa Supports Wholesale Distribution Technology",
  intro: "Every engagement starts with one of these six service lines and expands as your distribution operation grows.",
  items: [
    { icon: Ico.box, title: "Inventory Management Implementation", description: "Real-time inventory visibility across every warehouse, connected to ERP and B2B ordering systems." },
    { icon: Ico.truck, title: "Supply Chain & Supplier Integration", description: "Inbound shipment tracking and supplier data connected so purchasing teams see what's coming before it arrives." },
    { icon: Ico.route, title: "B2B Order Management & Portals", description: "Customer ordering portals that reflect real-time inventory instead of stale, batch-synced data." },
    { icon: Ico.db, title: "ERP Implementation for Distribution", description: "NetSuite and Oracle implementations designed for how distributors actually manage purchasing and fulfillment." },
    { icon: Ico.compass, title: "Demand Planning & Reorder Automation", description: "Reorder points calculated from actual usage patterns and supplier lead times, not static thresholds." },
    { icon: Ico.brain, title: "Distribution Analytics & Reporting", description: "Fill rate, on-time delivery, and inventory turnover reporting built from real operational data." },
  ],
};

const PLATFORM_EXPERTISE = {
  eyebrow: "Platform Expertise",
  heading: "The Platforms Behind Every Wholesale Distribution Engagement",
  intro: "We bring proven implementation depth across the platforms distributors already depend on.",
  items: [
    { title: "NetSuite for Distribution ERP", description: "Inventory, purchasing, and order management built for multi-warehouse distribution operations." },
    { title: "Oracle Fusion for Complex Supply Chains", description: "Financial and supply chain consolidation for larger distributors with complex organizational structures." },
    { title: "AI-Powered Demand Forecasting", description: "Reorder points and purchasing recommendations based on actual demand patterns, not guesswork." },
    { title: "Cloud Infrastructure for Multi-Warehouse Operations", description: "Real-time data synchronization across every warehouse and distribution center." },
  ],
};

const AI_AUTOMATION = {
  eyebrow: "AI & Automation",
  heading: "Where AI Actually Reduces Stockouts and Excess Inventory",
  intro: "These are the AI and automation capabilities Mirketa builds into wholesale distribution engagements once the data foundation is in place.",
  items: [
    { title: "Automated Reorder Point Calculation", description: "Purchase orders triggered based on actual usage patterns and supplier lead times, not static thresholds." },
    { title: "Demand Forecasting", description: "Seasonal and trend-based demand predictions applied to purchasing decisions before stockouts happen." },
    { title: "Supplier Performance Scoring", description: "On-time delivery and quality data tracked automatically to inform future purchasing decisions." },
    { title: "B2B Order Anomaly Detection", description: "Unusual order patterns flagged for review before they become a fulfillment or fraud problem." },
    { title: "Warehouse Slotting Optimization", description: "Pick paths and storage locations optimized based on actual order patterns, not static layouts." },
    { title: "Natural Language Inventory Q&A", description: "Purchasing and sales teams can ask plain-language questions across inventory data instead of building a new report." },
  ],
};

const BENEFITS = {
  eyebrow: "Business Benefits",
  heading: "What Changes Once Inventory and Orders Run on One Connected Layer",
  intro: "These are the outcomes Mirketa's wholesale distribution clients consistently report.",
  stats: [
    { value: "99.3%", label: "Inventory Accuracy" },
    { value: "27%", label: "Reduction in Stockouts" },
    { value: "97.8%", label: "On-Time Delivery Rate" },
    { value: "3x", label: "Faster Reorder Cycle Time" },
  ],
  items: [
    { title: "Sales Reps Quote Real Availability", description: "Inventory data updates in real time, so quotes reflect what's actually in stock, not a stale batch sync." },
    { title: "Fewer Emergency Purchase Orders", description: "Reorder automation based on real usage patterns means fewer last-minute, premium-priced orders." },
    { title: "B2B Customers Trust the Portal", description: "Real-time inventory visibility in the ordering portal reduces cancellations and repeat-order friction." },
    { title: "Purchasing Sees Supplier Shipments Before They Arrive", description: "Inbound shipment tracking gives purchasing teams a head start on planning, not a surprise on arrival." },
  ],
};

const USE_CASES = {
  eyebrow: "Industry Use Cases",
  heading: "Wholesale Distribution Solutions Across Business Models",
  intro: "Every distribution business model brings its own inventory and fulfillment requirements — our approach adapts to how each one actually operates.",
  items: [
    { icon: Ico.factory, title: "Industrial Distribution" },
    { icon: Ico.cart, title: "Consumer Goods Distribution" },
    { icon: Ico.box, title: "Food & Beverage Distribution" },
    { icon: Ico.truck, title: "Building Materials" },
    { icon: Ico.bolt, title: "Electrical & Electronic Components" },
    { icon: Ico.bandage, title: "Medical Supply Distribution" },
  ],
};

const SUCCESS_STORIES = {
  eyebrow: "Success Stories",
  heading: "Real Wholesale Distribution Outcomes",
  intro: "Anonymized results from recent wholesale distribution engagements.",
  cases: [
    {
      title: "Industrial Distributor Cuts Stockouts by 27% With Automated Reordering",
      industry: "Industrial Distribution",
      challenge: "Reorder points were set once years ago and never updated, leading to frequent stockouts on fast-moving SKUs.",
      solution: "We implemented demand-based reorder automation connected to real usage data and supplier lead times.",
      outcome: "Stockout rate dropped 27%, with purchase orders now triggered before inventory runs critically low.",
    },
    {
      title: "Consumer Goods Distributor Achieves 99.3% Inventory Accuracy Across Six Warehouses",
      industry: "Consumer Goods Distribution",
      challenge: "Inventory counts were reconciled manually across six warehouses, creating discrepancies that led to overselling.",
      solution: "We connected warehouse management systems to a unified ERP with real-time inventory synchronization.",
      outcome: "Inventory accuracy reached 99.3% across all six warehouses, eliminating overselling incidents.",
    },
  ],
};

const WHY_MIRKETA = {
  eyebrow: "Why Choose Mirketa",
  heading: "A Technology Partner That Understands Distribution Operations",
  intro: "Plenty of partners can implement an ERP. Fewer understand the reorder cycles and fulfillment pressure that shape every distribution technology decision.",
  items: [
    { icon: Ico.award, title: "ERP-Certified Distribution Consultants", description: "Our consultants hold active certifications and have led multiple distribution ERP implementations." },
    { icon: Ico.compass, title: "Real-Time Inventory Expertise", description: "We design for real-time data synchronization, not overnight batch syncs that leave gaps." },
    { icon: Ico.clock, title: "Fixed-Scope Delivery Timelines", description: "A documented scope and timeline agreed before kickoff, with change requests handled transparently." },
    { icon: Ico.shield, title: "Supply Chain Visibility Built In", description: "Supplier and shipment tracking designed into the technology from day one, not an afterthought." },
    { icon: Ico.users, title: "Dedicated Delivery Team", description: "The consultants who scope your engagement support it through go-live and beyond." },
    { icon: Ico.heart, title: "Support Beyond Go-Live", description: "Ongoing technology support available as your distribution operation grows." },
  ],
};

const TECHNOLOGIES = {
  eyebrow: "Technology Stack",
  heading: "The Platforms We Build Wholesale Distribution Solutions On",
  intro: "Selected based on your warehouse footprint and fulfillment model, not a default recommendation.",
  items: [
    { icon: Ico.db, title: "NetSuite" },
    { icon: Ico.cloud, title: "Oracle Fusion" },
    { icon: Ico.box, title: "Warehouse Management Systems" },
    { icon: Ico.brain, title: "AI & ML Demand Forecasting" },
    { icon: Ico.route, title: "B2B Commerce Portals" },
    { icon: Ico.truck, title: "Supplier Integration APIs" },
  ],
};

const PROCESS = {
  eyebrow: "Industry Process",
  heading: "A Five-Stage Path From Assessment to Real-Time Operations",
  intro: "A structured methodology refined across wholesale distribution engagements in industrial, consumer goods, and food and beverage distribution.",
  steps: [
    { label: "Operations Assessment" },
    { label: "Technology Roadmap" },
    { label: "Integration & Automation" },
    { label: "Testing & Warehouse Validation" },
    { label: "Launch & Optimize" },
  ],
  detail: [
    { name: "Operations Assessment", description: "Current inventory, purchasing, and order management systems mapped across every warehouse." },
    { name: "Technology Roadmap", description: "An integration and automation plan documented and prioritized against your fulfillment model." },
    { name: "Integration & Automation", description: "Warehouse, ERP, and B2B ordering systems connected on a shared, real-time data model." },
    { name: "Testing & Warehouse Validation", description: "Structured testing with warehouse and purchasing stakeholders using real order scenarios." },
    { name: "Launch & Optimize", description: "Supported go-live followed by continuous refinement as your distribution network grows." },
  ],
};

const FAQS = [
  { q: "What are Wholesale Distribution Solutions from Mirketa?", a: "Wholesale Distribution Solutions cover inventory management, supply chain and supplier integration, B2B order management, ERP implementation, demand planning, and distribution analytics for distributors and B2B sellers." },
  { q: "Can you fix inventory accuracy issues across multiple warehouses?", a: "Yes. We connect warehouse management systems to a unified ERP with real-time synchronization, so inventory counts stay accurate across every location." },
  { q: "How does reorder automation actually work?", a: "Reorder points are calculated from real usage patterns and supplier lead times instead of a static threshold, so purchase orders trigger before a stockout, not after one." },
  { q: "Do you work with distributors in specific industries, or general wholesale?", a: "We work across distribution business models, including industrial distribution, consumer goods, food and beverage, building materials, electrical and electronic components, and medical supply distribution." },
  { q: "Can our B2B customers see real-time inventory in our ordering portal?", a: "Yes. We connect ordering portals directly to live inventory data, eliminating the stale, batch-synced numbers that cause order cancellations." },
  { q: "How long does a typical distribution technology engagement take?", a: "A focused inventory and ERP integration typically takes 10 to 16 weeks. Larger, multi-warehouse engagements can take 4 to 8 months depending on complexity." },
  { q: "What platforms do you typically implement for distribution clients?", a: "Most engagements involve NetSuite for distribution ERP, with Oracle Fusion for larger, more complex supply chains, supplemented with AI-powered demand forecasting." },
  { q: "Do you provide ongoing support after go-live?", a: "Yes. Every engagement can transition into ongoing support as your distribution network and warehouse footprint grow." },
];

const RELATED_SERVICES = {
  eyebrow: "Related Services",
  heading: "Explore More Ways Mirketa Supports Distribution Operations",
  intro: "Wholesale distribution technology often overlaps with related industries and platforms. Here's where to look next.",
  items: [
    { slug: INDUSTRY_PAGES.ECOMMERCE.slug, label: INDUSTRY_PAGES.ECOMMERCE.label, description: "See how Mirketa supports the e-commerce channels many distributors sell through alongside B2B." },
    { slug: INDUSTRY_PAGES.HI_TECH.slug, label: INDUSTRY_PAGES.HI_TECH.label, description: "Explore technology solutions for the hi-tech companies supplying hardware to distribution networks." },
    { slug: NETSUITE_PAGES.IMPLEMENTATION.slug, label: NETSUITE_PAGES.IMPLEMENTATION.label, description: "Implement NetSuite ERP for inventory, purchasing, and order management built for distribution." },
    { slug: ORACLE_PAGES.SCM_CONSULTING.slug, label: ORACLE_PAGES.SCM_CONSULTING.label, description: "Extend supply chain visibility with Oracle SCM for larger, more complex distribution networks." },
    { slug: AI_PAGES.AI_DATA_FOUNDATIONS.slug, label: AI_PAGES.AI_DATA_FOUNDATIONS.label, description: "Build the governed data foundation that makes demand forecasting and AI reliable." },
    { slug: CLOUD_PAGES.INFRA_MANAGEMENT.slug, label: CLOUD_PAGES.INFRA_MANAGEMENT.label, description: "Manage the cloud infrastructure behind real-time inventory synchronization across warehouses." },
  ],
};

const FINAL_CTA = {
  heading: "Turn Real-Time Inventory Into a Fulfillment Advantage",
  description: "Partner with Mirketa to connect inventory, purchasing, and B2B ordering on one real-time platform — or talk to a distribution solutions advisor first.",
  primaryCta: { label: "Get a Distribution Technology Assessment", href: "#contact" },
  secondaryCta: { label: "Talk to a Distribution Solutions Advisor", href: "#contact" },
};

const CONSULTATION = {
  eyebrow: "Get Started",
  heading: "Get a Distribution Technology Assessment",
  description: "Tell us about your warehouses, order volume, and supplier network — a distribution solutions advisor will follow up within one business day.",
  formTitle: "Get a Free Distribution Technology Assessment",
};

const SEO = {
  title: pageSEO.title,
  description: pageSEO.description,
  canonical: `https://mirketa.us${pageSEO.slug}`,
  keywords: [
    "Wholesale Distribution Solutions",
    "Inventory Management",
    "Distribution",
    "Supply Chain",
    "ERP Solutions",
  ],
  schema: [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "Wholesale Distribution Solutions",
      provider: { "@type": "Organization", name: "Mirketa Inc.", url: "https://mirketa.us" },
      name: "Wholesale Distribution Solutions",
      description: "Inventory management, supply chain integration, ERP implementation, and demand planning for wholesale distributors.",
      areaServed: "Global",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://mirketa.us/" },
        { "@type": "ListItem", position: 2, name: INDUSTRY_PAGES.WHOLESALE.label, item: `https://mirketa.us${pageSEO.slug}` },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ],
};

// ============================================================
// MAIN COMPONENT
// ============================================================

export default function Wholesale() {
  const heroTextRef = useRef(null);
  const heroRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (heroTextRef.current) {
        gsap.from(heroTextRef.current.children, {
          opacity: prefersReduced ? 1 : 0,
          y: prefersReduced ? 0 : 28,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
        });
      }

      gsap.utils.toArray(".whd-reveal").forEach((el) => {
        gsap.from(el, { opacity: prefersReduced ? 1 : 0, y: prefersReduced ? 0 : 32, duration: 0.7, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 88%" } });
      });
      gsap.utils.toArray(".whd-reveal-left").forEach((el) => {
        gsap.from(el, { opacity: prefersReduced ? 1 : 0, x: prefersReduced ? 0 : -30, duration: 0.7, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 88%" } });
      });
      gsap.utils.toArray(".whd-reveal-right").forEach((el) => {
        gsap.from(el, { opacity: prefersReduced ? 1 : 0, x: prefersReduced ? 0 : 30, duration: 0.7, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 88%" } });
      });
      gsap.utils.toArray(".whd-reveal-stagger").forEach((el) => {
        gsap.from(el.children, { opacity: prefersReduced ? 1 : 0, y: prefersReduced ? 0 : 26, duration: 0.6, stagger: 0.06, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 85%" } });
      });
      gsap.utils.toArray(".whd-zoom-in").forEach((el) => {
        gsap.from(el, { opacity: prefersReduced ? 1 : 0, scale: prefersReduced ? 1 : 0.94, duration: 0.6, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 88%" } });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="industry-wholesale">
      <Seo {...SEO} />
      <HeroSection heroTextRef={heroTextRef} heroRef={heroRef} />
      <TrustedByMarquee label="Trusted by Distribution and Supply Chain Leaders" />
      <ChallengesSection />
      <SolutionSection />
      <ServicesSection />
      <PlatformExpertiseSection />
      <AiAutomationSection />
      <BenefitsSection />
      <UseCasesSection />
      <SuccessStoriesSection />
      <WhyMirketaSection />
      <TechnologiesSection />
      <ProcessSection />
      <FaqSection />
      <RelatedServices {...RELATED_SERVICES} className="whd-related whd-reveal" />
      <FinalCtaSection />
      <ConsultationSection {...CONSULTATION} />
      <StickyCta heroRef={heroRef} label="Get a Distribution Technology Assessment" />
    </div>
  );
}

// ============================================================
// HERO
// ============================================================

function HeroSection({ heroTextRef, heroRef }) {
  return (
    <section ref={heroRef} className="whd-hero" style={{ backgroundImage: `url("${Images.heroIndustryWholesale}")` }} aria-label="Wholesale Distribution Solutions by Mirketa">
      <div className="whd-hero__scrim" />
      <div className="container">
        <Breadcrumb items={BREADCRUMB_ITEMS} className="whd-breadcrumb" />
        <div className="whd-hero__inner">
          <div ref={heroTextRef} className="whd-hero__text">
            <span className="whd-badge">
              <span className="whd-badge__spark" aria-hidden="true">✦</span> {HERO.badge}
            </span>
            <h1>{HERO.title}</h1>
            <p className="whd-hero__description">{HERO.description}</p>
            <div className="whd-hero__ctas">
              <a href={HERO.primaryCta.href} className="btn btn-primary whd-btn">
                {HERO.primaryCta.label} <span aria-hidden="true">→</span>
              </a>
              <a href={HERO.secondaryCta.href} className="btn btn-secondary whd-btn">
                {HERO.secondaryCta.label}
              </a>
            </div>
            <ul className="whd-hero__metrics">
              {HERO.metrics.map((m) => (
                <li key={m}>
                  <span aria-hidden="true">{Ico.check}</span>
                  {m}
                </li>
              ))}
            </ul>
          </div>

          <HeroVisual
            dashboardTitle={HERO_DASHBOARD.title}
            stats={HERO_DASHBOARD.stats}
            rows={HERO_DASHBOARD.rows}
            floatingCards={HERO_DASHBOARD.floatingCards}
            className="whd-hero__visual whd-zoom-in"
          />
        </div>
      </div>
    </section>
  );
}

// ============================================================
// INDUSTRY CHALLENGES
// ============================================================

function ChallengesSection() {
  return (
    <section className="section whd-challenges" aria-labelledby="whd-challenges-heading">
      <div className="container">
        <div className="section-heading whd-reveal">
          <p className="whd-eyebrow">{CHALLENGES.eyebrow}</p>
          <h2 id="whd-challenges-heading">{CHALLENGES.heading}</h2>
          <p>{CHALLENGES.intro}</p>
        </div>
        <div className="whd-challenges__grid whd-reveal-stagger">
          {CHALLENGES.items.map((c) => (
            <div className="whd-challenge-card" key={c.title}>
              <h3>{c.title}</h3>
              <p>{c.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// INDUSTRY SOLUTIONS
// ============================================================

function SolutionSection() {
  return (
    <section className="section whd-solution" aria-labelledby="whd-solution-heading">
      <div className="container whd-solution__grid">
        <div className="whd-reveal-left">
          <img src={Images.illoIndustryWholesaleDashboard} alt="" aria-hidden="true" className="whd-solution__illo" loading="lazy" />
          <p className="whd-eyebrow">{SOLUTION.eyebrow}</p>
          <h2 id="whd-solution-heading">{SOLUTION.heading}</h2>
          {SOLUTION.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <div className="whd-reveal-right">
          <AnalyticsPanel
            title="Inventory Health"
            donutPercent={99}
            donutLabel="Inventory accuracy across all warehouses"
            metrics={[
              { value: "99.3%", label: "Inventory accuracy" },
              { value: "-27%", label: "Stockout rate" },
            ]}
          />
        </div>
      </div>
    </section>
  );
}

// ============================================================
// SERVICES WE OFFER
// ============================================================

function ServicesSection() {
  return (
    <section className="section whd-services" aria-labelledby="whd-services-heading">
      <div className="container">
        <div className="section-heading whd-reveal">
          <p className="whd-eyebrow">{SERVICES.eyebrow}</p>
          <h2 id="whd-services-heading">{SERVICES.heading}</h2>
          <p>{SERVICES.intro}</p>
        </div>
        <div className="whd-services__grid whd-reveal-stagger">
          {SERVICES.items.map((c) => (
            <div className="whd-service-card" key={c.title}>
              <span className="whd-service-card__icon">{c.icon}</span>
              <h3>{c.title}</h3>
              <p>{c.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// PLATFORM EXPERTISE
// ============================================================

function PlatformExpertiseSection() {
  return (
    <section className="section whd-platform" aria-labelledby="whd-platform-heading">
      <div className="container">
        <div className="section-heading whd-reveal">
          <p className="whd-eyebrow">{PLATFORM_EXPERTISE.eyebrow}</p>
          <h2 id="whd-platform-heading">{PLATFORM_EXPERTISE.heading}</h2>
          <p>{PLATFORM_EXPERTISE.intro}</p>
        </div>
        <div className="whd-platform__grid whd-reveal-stagger">
          {PLATFORM_EXPERTISE.items.map((c) => (
            <div className="whd-platform-item" key={c.title}>
              <p className="whd-card-title">{c.title}</p>
              <p>{c.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// AI & AUTOMATION
// ============================================================

function AiAutomationSection() {
  return (
    <section className="section whd-ai" aria-labelledby="whd-ai-heading">
      <div className="container">
        <div className="section-heading whd-reveal">
          <p className="whd-eyebrow">{AI_AUTOMATION.eyebrow}</p>
          <h2 id="whd-ai-heading">{AI_AUTOMATION.heading}</h2>
          <p>{AI_AUTOMATION.intro}</p>
        </div>
        <div className="whd-ai__layout">
          <div className="whd-ai__grid whd-reveal-stagger">
            {AI_AUTOMATION.items.map((f) => (
              <div className="whd-ai-item" key={f.title}>
                <p className="whd-card-title">{f.title}</p>
                <p>{f.description}</p>
              </div>
            ))}
          </div>
          <div className="whd-reveal-right">
            <WorkflowDiagram
              title="Reorder Automation Flow"
              steps={[{ label: "Usage Tracked" }, { label: "Threshold Hit" }, { label: "PO Generated" }, { label: "Supplier Notified" }, { label: "Stock Received" }]}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// BUSINESS BENEFITS
// ============================================================

function BenefitsSection() {
  return (
    <section className="section whd-benefits" aria-labelledby="whd-benefits-heading">
      <div className="container">
        <div className="section-heading whd-reveal">
          <p className="whd-eyebrow">{BENEFITS.eyebrow}</p>
          <h2 id="whd-benefits-heading">{BENEFITS.heading}</h2>
          <p>{BENEFITS.intro}</p>
        </div>
        <div className="whd-benefits__stats whd-reveal-stagger">
          {BENEFITS.stats.map((s) => (
            <AnimatedCounter key={s.label} value={s.value} label={s.label} className="whd-stat" />
          ))}
        </div>
        <div className="whd-benefits__grid whd-reveal-stagger">
          {BENEFITS.items.map((b) => (
            <div className="whd-benefit-item" key={b.title}>
              <span aria-hidden="true">{Ico.check}</span>
              <div>
                <p className="whd-card-title">{b.title}</p>
                <p>{b.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// INDUSTRY USE CASES
// ============================================================

function UseCasesSection() {
  return (
    <section className="section whd-usecases" aria-labelledby="whd-usecases-heading">
      <div className="container">
        <div className="section-heading whd-reveal">
          <p className="whd-eyebrow">{USE_CASES.eyebrow}</p>
          <h2 id="whd-usecases-heading">{USE_CASES.heading}</h2>
          <p>{USE_CASES.intro}</p>
        </div>
        <div className="whd-usecases__grid whd-reveal-stagger">
          {USE_CASES.items.map((n) => (
            <div className="whd-usecase-card" key={n.title}>
              <span className="whd-usecase-card__icon">{n.icon}</span>
              <p className="whd-card-title">{n.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// SUCCESS STORIES
// ============================================================

function SuccessStoriesSection() {
  return (
    <section className="section whd-cases" aria-labelledby="whd-cases-heading">
      <div className="container">
        <div className="section-heading whd-reveal">
          <p className="whd-eyebrow">{SUCCESS_STORIES.eyebrow}</p>
          <h2 id="whd-cases-heading">{SUCCESS_STORIES.heading}</h2>
          <p>{SUCCESS_STORIES.intro}</p>
        </div>
        <div className="whd-cases__grid whd-reveal-stagger">
          {SUCCESS_STORIES.cases.map((c) => (
            <div className="whd-case-card" key={c.title}>
              <span className="whd-case-card__tag">{c.industry}</span>
              <p className="whd-card-title">{c.title}</p>
              <dl className="whd-case-card__fields">
                <div><dt>Challenge</dt><dd>{c.challenge}</dd></div>
                <div><dt>Solution</dt><dd>{c.solution}</dd></div>
                <div><dt>Outcome</dt><dd>{c.outcome}</dd></div>
              </dl>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// WHY CHOOSE MIRKETA
// ============================================================

function WhyMirketaSection() {
  return (
    <section className="section whd-why" aria-labelledby="whd-why-heading">
      <div className="container">
        <div className="section-heading whd-reveal">
          <p className="whd-eyebrow">{WHY_MIRKETA.eyebrow}</p>
          <h2 id="whd-why-heading">{WHY_MIRKETA.heading}</h2>
          <p>{WHY_MIRKETA.intro}</p>
        </div>
        <div className="whd-why__grid whd-reveal-stagger">
          {WHY_MIRKETA.items.map((w) => (
            <div className="whd-why-card" key={w.title}>
              <span className="whd-why-card__icon">{w.icon}</span>
              <p className="whd-card-title">{w.title}</p>
              <p>{w.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// TECHNOLOGY STACK
// ============================================================

function TechnologiesSection() {
  return (
    <section className="section whd-tech" aria-labelledby="whd-tech-heading">
      <div className="container">
        <div className="section-heading whd-reveal">
          <p className="whd-eyebrow">{TECHNOLOGIES.eyebrow}</p>
          <h2 id="whd-tech-heading">{TECHNOLOGIES.heading}</h2>
          <p>{TECHNOLOGIES.intro}</p>
        </div>
        <div className="whd-tech__grid whd-reveal-stagger">
          {TECHNOLOGIES.items.map((t) => (
            <div className="whd-tech-card" key={t.title}>
              <span className="whd-tech-card__icon">{t.icon}</span>
              <p className="whd-card-title">{t.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// INDUSTRY PROCESS
// ============================================================

function ProcessSection() {
  return (
    <section className="section whd-process" aria-labelledby="whd-process-heading">
      <div className="container">
        <div className="section-heading whd-reveal">
          <p className="whd-eyebrow">{PROCESS.eyebrow}</p>
          <h2 id="whd-process-heading">{PROCESS.heading}</h2>
          <p>{PROCESS.intro}</p>
        </div>
        <div className="whd-zoom-in">
          <SupplyChainMap
            title="Distribution Network"
            nodes={[
              { label: "Suppliers", short: "SUP" },
              { label: "Warehouse", short: "WH" },
              { label: "Purchasing", short: "PUR" },
              { label: "B2B Customers", short: "CUST" },
              { label: "Logistics", short: "LOG" },
            ]}
          />
        </div>
        <div className="whd-process__grid whd-reveal-stagger">
          {PROCESS.detail.map((p, i) => (
            <div className="whd-step-card" key={p.name}>
              <span className="whd-step-card__num">{String(i + 1).padStart(2, "0")}</span>
              <p className="whd-card-title">{p.name}</p>
              <p>{p.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// FAQ
// ============================================================

function FaqSection() {
  return (
    <section className="section whd-faq" aria-labelledby="whd-faq-heading">
      <div className="container">
        <div className="section-heading whd-reveal">
          <p className="whd-eyebrow">FAQ</p>
          <h2 id="whd-faq-heading">Frequently Asked Questions About Wholesale Distribution Solutions</h2>
        </div>
        <FaqAccordion items={FAQS} className="whd-reveal" searchPlaceholder="Ask a question — e.g. &quot;reorder&quot;, &quot;inventory&quot;, &quot;ERP&quot;..." />
        <p className="whd-faq__links">
          Related reading: <Link to={INDUSTRY_PAGES.ECOMMERCE.slug}>{INDUSTRY_PAGES.ECOMMERCE.label}</Link>,{" "}
          <Link to={INDUSTRY_PAGES.HI_TECH.slug}>{INDUSTRY_PAGES.HI_TECH.label}</Link>,{" "}
          <Link to={NETSUITE_PAGES.IMPLEMENTATION.slug}>{NETSUITE_PAGES.IMPLEMENTATION.label}</Link>,{" "}
          <Link to={ORACLE_PAGES.SCM_CONSULTING.slug}>{ORACLE_PAGES.SCM_CONSULTING.label}</Link>,{" "}
          <Link to={AI_PAGES.AI_DATA_FOUNDATIONS.slug}>{AI_PAGES.AI_DATA_FOUNDATIONS.label}</Link>.
        </p>
      </div>
    </section>
  );
}

// ============================================================
// FINAL CTA
// ============================================================

function FinalCtaSection() {
  return (
    <section className="whd-final-cta whd-reveal" aria-labelledby="whd-final-cta-heading">
      <div className="container whd-final-cta__inner">
        <h2 id="whd-final-cta-heading">{FINAL_CTA.heading}</h2>
        <p>{FINAL_CTA.description}</p>
        <div className="whd-final-cta__ctas">
          <a href={FINAL_CTA.primaryCta.href} className="btn btn-primary whd-btn">
            {FINAL_CTA.primaryCta.label} <span aria-hidden="true">→</span>
          </a>
          <a href={FINAL_CTA.secondaryCta.href} className="btn btn-secondary whd-btn">
            {FINAL_CTA.secondaryCta.label}
          </a>
        </div>
      </div>
    </section>
  );
}
