import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Images } from "../../../assets/images/index.js";
import { INDUSTRY_PAGES, SALESFORCE_PAGES, NETSUITE_PAGES, AI_PAGES } from "../../../config/pageSlugs.js";
import Seo from "../../../components/Seo/Seo.jsx";
import StickyCta from "../../../components/StickyCta/StickyCta.jsx";
import TrustedByMarquee from "../../../components/TrustedByMarquee/TrustedByMarquee.jsx";
import AnimatedCounter from "../../../components/AnimatedCounter/AnimatedCounter.jsx";
import FaqAccordion from "../../../components/FaqAccordion/FaqAccordion.jsx";
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb.jsx";
import HeroVisual from "../../../components/HeroVisual/HeroVisual.jsx";
import ConsultationSection from "../../../components/ConsultationSection/ConsultationSection.jsx";
import RelatedServices from "../../../components/RelatedServices/RelatedServices.jsx";
import WorkflowDiagram from "../../../components/illustrations/WorkflowDiagram/WorkflowDiagram.jsx";
import SupplyChainMap from "../../../components/illustrations/SupplyChainMap/SupplyChainMap.jsx";
import AnalyticsPanel from "../../../components/illustrations/AnalyticsPanel/AnalyticsPanel.jsx";
import "./Ecommerce.css";

gsap.registerPlugin(ScrollTrigger);

// ============================================================
// SLUG / SEO CONFIGURATION — kept local to this component per
// project convention, sourced from the central pageSlugs.js entry
// so the URL itself still only needs to change in one place.
// ============================================================

export const pageSEO = {
  slug: `${INDUSTRY_PAGES.ECOMMERCE.slug}/`,
  title: "E-commerce Solutions | Mirketa",
  description:
    "E-commerce Solutions from Mirketa: omnichannel order sync, inventory accuracy, personalization, and peak-season scaling for online retailers.",
};

// ============================================================
// ICONS
// ============================================================

const Ico = {
  check: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12.5l5 5L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  cart: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 4h2l2.2 11h10.6L20 7H6.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /><circle cx="9" cy="20" r="1.3" fill="currentColor" /><circle cx="17" cy="20" r="1.3" fill="currentColor" /></svg>
  ),
  box: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 8l9-5 9 5-9 5-9-5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M3 8v8l9 5 9-5V8" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M12 13v8" stroke="currentColor" strokeWidth="1.4" /></svg>
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
  store: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 9l1-5h14l1 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /><path d="M4 9v11h16V9" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M9 20v-6h6v6" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M4 9a2.5 2.5 0 005 0 2.5 2.5 0 005 0 2.5 2.5 0 005 0" stroke="currentColor" strokeWidth="1.2" /></svg>
  ),
  layers: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3l9 5-9 5-9-5 9-5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M3 13l9 5 9-5" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M3 17l9 5 9-5" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  repeat: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 12a8 8 0 0114-5.3M20 12a8 8 0 01-14 5.3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /><path d="M18 3v4h-4M6 21v-4h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  target: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.4" /><circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.4" /><circle cx="12" cy="12" r="1.4" fill="currentColor" /></svg>
  ),
};

// ============================================================
// DATA
// ============================================================

const BREADCRUMB_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Industry", href: "/" },
  { label: INDUSTRY_PAGES.ECOMMERCE.label },
];

const HERO = {
  badge: "E-commerce Technology Partner",
  title: "E-commerce Solutions Built to Keep Every Channel, Order, and Customer in Sync",
  description:
    "Mirketa's E-commerce Solutions connect your storefront, marketplaces, point-of-sale, and warehouse into one operational system — so inventory stays accurate across every channel, checkout stops leaking revenue to abandoned carts, and your team stops reconciling spreadsheets during peak season. This is Online Retail and Omnichannel Commerce built to actually hold together under real order volume.",
  primaryCta: { label: "Get an E-commerce Technology Assessment", href: "#contact" },
  secondaryCta: { label: "Talk to an E-commerce Solutions Advisor", href: "#contact" },
  metrics: ["Omnichannel Inventory Sync", "Cart Recovery Workflows Built In", "Peak-Season Load Tested", "Personalization-Ready Data Layer"],
};

const HERO_DASHBOARD = {
  title: "Commerce Operations Console",
  stats: [
    { label: "INVENTORY ACCURACY", value: "99.5%", caption: "Across all channels" },
    { label: "CART RECOVERY", value: "+24%", caption: "Revenue recovered" },
    { label: "PEAK LOAD UPTIME", value: "100%", caption: "Through last Black Friday" },
  ],
  rows: [
    { title: "Inventory sync — marketplace channel", meta: "Real-time stock levels reconciled", tone: "good", status: "Synced" },
    { title: "Abandoned cart — high-value order", meta: "Automated recovery email sent", tone: "neutral", status: "In Progress" },
    { title: "Order fulfillment — peak season spike", meta: "Warehouse to storefront handoff", tone: "good", status: "On Track" },
  ],
  floatingCards: [
    { icon: Ico.box, title: "99.5% Inventory Accuracy", subtitle: "Synced across every channel" },
    { icon: Ico.repeat, title: "24% Cart Recovery Lift", subtitle: "Automated recovery workflows" },
  ],
};

const CHALLENGES = {
  eyebrow: "Industry Challenges",
  heading: "Why Growing E-commerce Brands Outgrow Their Technology Stack",
  intro:
    "Most e-commerce technology problems don't show up on launch day — they show up eighteen months later, once a brand is running its storefront, two marketplaces, a POS system, and a growing subscription base on tools that were never designed to talk to each other. By the time leadership notices, the cost is already showing up as overselling, missed personalization opportunities, and a support team drowning in order-status tickets.",
  items: [
    { title: "Inventory Desynced Across Channels", description: "Storefront, marketplace listings, and point-of-sale each show a different stock count, so customers order items that are already sold out and fulfillment has to cancel or substitute after the fact." },
    { title: "Cart Abandonment With No Recovery Workflow", description: "The majority of shopping carts are abandoned before checkout, yet many brands have no automated email, SMS, or retargeting sequence built to bring that revenue back." },
    { title: "Customer Data Siloed From the CRM", description: "Purchase history lives in the commerce platform while service and marketing run out of a separate CRM, so personalization and support both operate on an incomplete picture of the customer." },
    { title: "Peak-Season Traffic Spikes Causing Outages", description: "Flash sales and holiday traffic surges push undersized infrastructure past its limit right when conversion matters most, turning a marketing win into a checkout outage." },
  ],
};

const SOLUTION = {
  eyebrow: "Industry Solutions",
  heading: "E-commerce Solutions Designed Around Order Accuracy and Customer Experience",
  paragraphs: [
    "Mirketa's E-commerce Solutions start with the thing most platform migrations skip: a single, governed source of truth for inventory, orders, and customer data across every channel you sell through. Whether that's a Shopify Plus storefront, a marketplace presence on Amazon and Walmart, or a wholesale portal running alongside retail, we design the integration layer so a change in one system reflects everywhere else within minutes, not overnight batch jobs.",
    "From there, we layer in the automation that actually moves revenue — cart abandonment sequences tuned to your customer's real browsing behavior, personalization and recommendation logic that draws on unified purchase history instead of a single channel's data, and warehouse and fulfillment workflows that route orders to the right location automatically. This is Digital Commerce infrastructure built for how customers actually shop, not how the platform vendor assumed they would.",
    "Because we bring implementation depth across Salesforce Commerce and Service Cloud, NetSuite for order and inventory management, and modern cloud infrastructure, we can design a stack that fits your existing investments instead of forcing a rip-and-replace. The result is Omnichannel Commerce that scales through peak season without a fire drill, and a Customer Experience that feels consistent whether someone buys on your app, your website, or a marketplace listing.",
  ],
};

const SERVICES = {
  eyebrow: "Services We Offer",
  heading: "Six Ways Mirketa Delivers E-commerce Solutions",
  intro: "Every engagement starts with one of these six service lines and expands as your channel mix grows.",
  items: [
    { icon: Ico.route, title: "Omnichannel Order Management", description: "Orders routed and tracked consistently whether they originate on your storefront, a marketplace, or in-store POS." },
    { icon: Ico.store, title: "Storefront & Marketplace Integration", description: "Shopify, BigCommerce, Amazon, and Walmart connected to one inventory and order backbone instead of managed in isolation." },
    { icon: Ico.db, title: "Customer Data Platform Implementation", description: "Purchase history, service interactions, and marketing engagement unified into one customer record your teams can actually use." },
    { icon: Ico.box, title: "Warehouse & Fulfillment Automation", description: "Pick, pack, and ship workflows automated and connected to real-time inventory so promised delivery dates hold up." },
    { icon: Ico.brain, title: "Personalization & Recommendation Engines", description: "Product recommendations and offers built on unified behavioral and purchase data, not a single channel's cookie trail." },
    { icon: Ico.clock, title: "Peak-Season Scalability Planning", description: "Infrastructure and workflow load-tested against your actual Black Friday and flash-sale traffic patterns before they happen." },
  ],
};

const PLATFORM_EXPERTISE = {
  eyebrow: "Platform Expertise",
  heading: "The Platforms Behind Every E-commerce Solutions Engagement",
  intro: "We bring proven implementation depth across the platforms most online retailers and DTC brands already depend on.",
  items: [
    { title: "Salesforce Commerce & Service Cloud", description: "Storefront experience and post-purchase customer service unified on one connected platform family." },
    { title: "NetSuite for Order & Inventory Management", description: "Real-time inventory and order visibility across warehouses, storefronts, and marketplace channels." },
    { title: "Cloud Infrastructure for Peak Scaling", description: "Elastic infrastructure sized and tested for flash sales and seasonal demand, not just average-day traffic." },
    { title: "AI-Powered Personalization", description: "Recommendation and offer logic built on unified customer data instead of channel-specific guesswork." },
  ],
};

const AI_AUTOMATION = {
  eyebrow: "AI & Automation",
  heading: "Where AI Actually Moves the Needle in Digital Commerce",
  intro: "These are the AI and automation capabilities Mirketa builds into e-commerce solutions engagements once the data foundation is in place.",
  items: [
    { title: "AI-Powered Product Recommendations", description: "Cross-sell and upsell suggestions generated from unified purchase and browsing history, not a single-channel data slice." },
    { title: "Automated Cart Abandonment Recovery", description: "Email, SMS, and retargeting sequences triggered by real browsing behavior instead of a flat time-based rule." },
    { title: "Demand Forecasting for Inventory", description: "Historical and seasonal sales data applied to predict stock needs before a channel actually sells out." },
    { title: "Dynamic Pricing & Promotion Logic", description: "Pricing and promotions adjusted automatically based on inventory position and demand signals." },
    { title: "Fraud Detection at Checkout", description: "Suspicious order patterns flagged in real time before fulfillment ships an order that should have been reviewed." },
    { title: "Conversational Commerce Assistants", description: "AI-assisted chat that helps customers find products and check order status without opening a support ticket." },
  ],
};

const BENEFITS = {
  eyebrow: "Business Benefits",
  heading: "What Changes Once Commerce Operations Run on One Technology Layer",
  intro: "These are the outcomes Mirketa's e-commerce solutions clients consistently report.",
  stats: [
    { value: "28%", label: "Higher Cart Conversion" },
    { value: "99.6%", label: "Order Sync Accuracy" },
    { value: "92%", label: "Same-Day Fulfillment" },
    { value: "3x", label: "Peak Traffic Handled" },
  ],
  items: [
    { title: "One Accurate Inventory Number, Everywhere", description: "Storefront, marketplace, and POS all reflect the same stock count, eliminating overselling and cancellation emails." },
    { title: "Recovered Revenue From Abandoned Carts", description: "Automated recovery workflows bring back checkout revenue that used to disappear silently." },
    { title: "A Customer Experience That Feels Consistent", description: "Personalization and support both draw on the same unified customer record, wherever the interaction happens." },
    { title: "Infrastructure That Holds Up During Peak Season", description: "Traffic spikes from flash sales and holidays get handled by infrastructure tested for that exact scenario." },
  ],
};

const USE_CASES = {
  eyebrow: "Industry Use Cases",
  heading: "E-commerce Solutions Across Business Models",
  intro: "Every commerce model brings its own operational demands — our approach adapts to how each one actually runs.",
  items: [
    { icon: Ico.cart, title: "B2C Retail" },
    { icon: Ico.store, title: "B2B Wholesale Commerce" },
    { icon: Ico.target, title: "DTC Brands" },
    { icon: Ico.layers, title: "Marketplace Sellers" },
    { icon: Ico.repeat, title: "Subscription Commerce" },
    { icon: Ico.route, title: "Omnichannel Retailers" },
  ],
};

const SUCCESS_STORIES = {
  eyebrow: "Success Stories",
  heading: "Real E-commerce Solutions Outcomes",
  intro: "Anonymized results from recent e-commerce solutions engagements.",
  cases: [
    {
      title: "DTC Brand Cuts Cart Abandonment Losses by 32%",
      industry: "DTC Brand",
      challenge: "A direct-to-consumer apparel brand had no automated recovery workflow, losing the majority of abandoned checkouts with no follow-up.",
      solution: "We built a behavior-triggered cart recovery sequence across email and SMS, tied to unified customer and browsing data.",
      outcome: "Recovered checkout revenue rose 32% within the first full quarter, with recovery emails now generated automatically instead of manually.",
    },
    {
      title: "Marketplace Seller Eliminates Overselling Across Three Channels",
      industry: "Marketplace Seller",
      challenge: "A multi-channel seller running Shopify, Amazon, and Walmart storefronts frequently oversold items due to disconnected inventory counts.",
      solution: "We implemented a real-time inventory sync layer on NetSuite that pushed stock updates to every channel within minutes of a sale.",
      outcome: "Overselling incidents dropped to near zero, and order cancellation-driven support tickets fell by more than half.",
    },
  ],
};

const WHY_MIRKETA = {
  eyebrow: "Why Choose Mirketa",
  heading: "A Technology Partner That Understands Commerce Operations",
  intro: "Plenty of partners can stand up a storefront. Fewer understand why inventory accuracy and peak-season readiness should shape the entire technology roadmap.",
  items: [
    { icon: Ico.award, title: "Deep E-commerce Domain Experience", description: "We understand order lifecycles, channel economics, and peak-season demand, not just generic storefront setup." },
    { icon: Ico.compass, title: "Omnichannel Integration Expertise", description: "Storefront, marketplace, POS, and warehouse connected as one system instead of a patchwork of point integrations." },
    { icon: Ico.clock, title: "Peak-Season Readiness Built In", description: "Infrastructure and workflows tested against real flash-sale and holiday traffic before they're needed." },
    { icon: Ico.shield, title: "Data Accuracy & Compliance First", description: "Payment, customer, and order data handled with the security and compliance rigor commerce operations require." },
    { icon: Ico.users, title: "Dedicated Commerce Operations Team", description: "The consultants who scope your engagement support it through launch and every peak season after." },
    { icon: Ico.heart, title: "Support Beyond Launch", description: "Ongoing optimization available as channels, promotions, and order volume evolve." },
  ],
};

const TECHNOLOGIES = {
  eyebrow: "Technology Stack",
  heading: "The Platforms We Build E-commerce Solutions On",
  intro: "Selected based on your actual channel mix and order volume, not a default recommendation.",
  items: [
    { icon: Ico.cloud, title: "Salesforce Commerce Cloud" },
    { icon: Ico.db, title: "NetSuite" },
    { icon: Ico.store, title: "Shopify Plus Integrations" },
    { icon: Ico.brain, title: "AI Personalization Engines" },
    { icon: Ico.layers, title: "Cloud CDN & Infrastructure" },
    { icon: Ico.route, title: "Headless Commerce APIs" },
  ],
};

const PROCESS = {
  eyebrow: "Industry Process",
  heading: "A Five-Stage Path From Assessment to Peak-Ready Launch",
  intro: "A structured methodology refined across e-commerce solutions engagements spanning B2C retail, marketplace, and subscription commerce.",
  steps: [
    { label: "Discovery & Platform Assessment" },
    { label: "Integration Design" },
    { label: "Build & Automate" },
    { label: "Testing & Peak Readiness" },
    { label: "Launch & Optimize" },
  ],
  detail: [
    { name: "Discovery & Platform Assessment", description: "Current storefront, marketplace, and fulfillment systems mapped against your actual order volume and channel mix." },
    { name: "Integration Design", description: "An inventory and order sync architecture designed to connect every channel to one governed source of truth." },
    { name: "Build & Automate", description: "Cart recovery, personalization, and fulfillment automation built on top of the unified data layer." },
    { name: "Testing & Peak Readiness", description: "Infrastructure and workflows load-tested against flash-sale and holiday-level traffic before go-live." },
    { name: "Launch & Optimize", description: "Continuous refinement of conversion, fulfillment speed, and personalization as order patterns evolve." },
  ],
};

const FAQS = [
  { q: "What are E-commerce Solutions?", a: "E-commerce Solutions cover omnichannel order management, storefront and marketplace integration, customer data platform implementation, and fulfillment automation — the technology layer that keeps inventory, orders, and customer data consistent across every channel you sell through." },
  { q: "Can you sync inventory across our storefront, marketplaces, and POS?", a: "Yes. We build a real-time inventory sync layer, typically on NetSuite, that pushes stock updates to every connected channel within minutes of a sale, eliminating overselling." },
  { q: "How does this help with cart abandonment specifically?", a: "We build behavior-triggered recovery workflows across email, SMS, and retargeting, tied to unified customer and browsing data, so abandoned checkout revenue gets recovered automatically instead of disappearing silently." },
  { q: "Do you work with B2B wholesale and subscription commerce, or only B2C retail?", a: "We work across commerce models, including B2C retail, B2B wholesale, DTC brands, marketplace sellers, subscription commerce, and omnichannel retailers, adapting our approach to each model's operational demands." },
  { q: "Can our infrastructure handle Black Friday or a flash sale without going down?", a: "We load-test infrastructure and checkout workflows against your actual peak traffic patterns before the event, so scaling is planned rather than reactive." },
  { q: "Can you connect our e-commerce platform to our CRM?", a: "Yes. We unify purchase history, service interactions, and marketing engagement into one customer record so personalization and support both work from the same data." },
  { q: "What platforms do you typically implement for e-commerce clients?", a: "Most engagements involve Salesforce Commerce or Service Cloud for storefront and customer experience, and NetSuite for order and inventory management, supplemented with AI-powered personalization." },
  { q: "Do you provide ongoing support after launch?", a: "Yes. Every engagement can transition into ongoing optimization support as channels, promotions, and order volume grow." },
];

const RELATED_SERVICES = {
  eyebrow: "Related Services",
  heading: "Explore More Ways Mirketa Supports Digital Commerce Teams",
  intro: "E-commerce technology often overlaps with related industries and platforms. Here's where to look next.",
  items: [
    { slug: INDUSTRY_PAGES.HI_TECH.slug, label: INDUSTRY_PAGES.HI_TECH.label, description: "See how Mirketa supports the hi-tech and SaaS platforms many e-commerce brands build on." },
    { slug: INDUSTRY_PAGES.WHOLESALE.slug, label: INDUSTRY_PAGES.WHOLESALE.label, description: "Explore technology solutions for B2B wholesale operations adjacent to e-commerce distribution." },
    { slug: SALESFORCE_PAGES.DEVELOPMENT_CONSULTING.slug, label: SALESFORCE_PAGES.DEVELOPMENT_CONSULTING.label, description: "Extend your Commerce Cloud storefront with custom Salesforce development and consulting." },
    { slug: NETSUITE_PAGES.IMPLEMENTATION.slug, label: NETSUITE_PAGES.IMPLEMENTATION.label, description: "Implement NetSuite as the order and inventory backbone behind your omnichannel operations." },
    { slug: AI_PAGES.AI_DATA_FOUNDATIONS.slug, label: AI_PAGES.AI_DATA_FOUNDATIONS.label, description: "Build the governed data foundation that makes personalization and demand forecasting reliable." },
  ],
};

const FINAL_CTA = {
  heading: "Turn Commerce Operations Into a Growth Advantage",
  description: "Partner with Mirketa for E-commerce Solutions that keep inventory accurate, checkout converting, and infrastructure ready for peak season — or talk to an advisor before your next big sale.",
  primaryCta: { label: "Get an E-commerce Technology Assessment", href: "#contact" },
  secondaryCta: { label: "Talk to an E-commerce Solutions Advisor", href: "#contact" },
};

const CONSULTATION = {
  eyebrow: "Get Started",
  heading: "Get an E-commerce Technology Assessment",
  description: "Tell us about your channel mix, platform stack, and peak-season goals — an e-commerce solutions advisor will follow up within one business day.",
  formTitle: "Get a Free E-commerce Technology Assessment",
};

const SEO = {
  title: pageSEO.title,
  description: pageSEO.description,
  canonical: `https://mirketa.us${pageSEO.slug}`,
  keywords: [
    "E-commerce Solutions",
    "Online Retail",
    "Omnichannel Commerce",
    "Digital Commerce",
    "Customer Experience",
  ],
  schema: [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "E-commerce Solutions",
      provider: { "@type": "Organization", name: "Mirketa Inc.", url: "https://mirketa.us" },
      name: "E-commerce Solutions",
      description: "Omnichannel order management, storefront and marketplace integration, and fulfillment automation for online retailers and DTC brands.",
      areaServed: "Global",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://mirketa.us/" },
        { "@type": "ListItem", position: 2, name: INDUSTRY_PAGES.ECOMMERCE.label, item: `https://mirketa.us${pageSEO.slug}` },
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

export default function Ecommerce() {
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

      gsap.utils.toArray(".ecm-reveal").forEach((el) => {
        gsap.from(el, { opacity: prefersReduced ? 1 : 0, y: prefersReduced ? 0 : 32, duration: 0.7, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 88%" } });
      });
      gsap.utils.toArray(".ecm-reveal-left").forEach((el) => {
        gsap.from(el, { opacity: prefersReduced ? 1 : 0, x: prefersReduced ? 0 : -30, duration: 0.7, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 88%" } });
      });
      gsap.utils.toArray(".ecm-reveal-right").forEach((el) => {
        gsap.from(el, { opacity: prefersReduced ? 1 : 0, x: prefersReduced ? 0 : 30, duration: 0.7, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 88%" } });
      });
      gsap.utils.toArray(".ecm-reveal-stagger").forEach((el) => {
        gsap.from(el.children, { opacity: prefersReduced ? 1 : 0, y: prefersReduced ? 0 : 26, duration: 0.6, stagger: 0.06, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 85%" } });
      });
      gsap.utils.toArray(".ecm-zoom-in").forEach((el) => {
        gsap.from(el, { opacity: prefersReduced ? 1 : 0, scale: prefersReduced ? 1 : 0.94, duration: 0.6, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 88%" } });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="industry-ecommerce">
      <Seo {...SEO} />
      <HeroSection heroTextRef={heroTextRef} heroRef={heroRef} />
      <TrustedByMarquee label="Trusted by Online Retailers, DTC Brands, and Marketplace Sellers" />
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
      <RelatedServices {...RELATED_SERVICES} className="ecm-related ecm-reveal" />
      <FinalCtaSection />
      <ConsultationSection {...CONSULTATION} />
      <StickyCta heroRef={heroRef} label="Get an E-commerce Technology Assessment" />
    </div>
  );
}

// ============================================================
// HERO
// ============================================================

function HeroSection({ heroTextRef, heroRef }) {
  return (
    <section ref={heroRef} className="ecm-hero" style={{ backgroundImage: `url("${Images.heroIndustryEcommerce}")` }} aria-label="E-commerce Solutions by Mirketa">
      <div className="ecm-hero__scrim" />
      <div className="container">
        <Breadcrumb items={BREADCRUMB_ITEMS} className="ecm-breadcrumb" />
        <div className="ecm-hero__inner">
          <div ref={heroTextRef} className="ecm-hero__text">
            <span className="ecm-badge">
              <span className="ecm-badge__spark" aria-hidden="true">✦</span> {HERO.badge}
            </span>
            <h1>{HERO.title}</h1>
            <p className="ecm-hero__description">{HERO.description}</p>
            <div className="ecm-hero__ctas">
              <a href={HERO.primaryCta.href} className="btn btn-primary ecm-btn">
                {HERO.primaryCta.label} <span aria-hidden="true">→</span>
              </a>
              <a href={HERO.secondaryCta.href} className="btn btn-secondary ecm-btn">
                {HERO.secondaryCta.label}
              </a>
            </div>
            <ul className="ecm-hero__metrics">
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
            className="ecm-hero__visual ecm-zoom-in"
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
    <section className="section ecm-challenges" aria-labelledby="ecm-challenges-heading">
      <div className="container">
        <div className="section-heading ecm-reveal">
          <p className="ecm-eyebrow">{CHALLENGES.eyebrow}</p>
          <h2 id="ecm-challenges-heading">{CHALLENGES.heading}</h2>
          <p>{CHALLENGES.intro}</p>
        </div>
        <div className="ecm-challenges__grid ecm-reveal-stagger">
          {CHALLENGES.items.map((c) => (
            <div className="ecm-challenge-card" key={c.title}>
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
    <section className="section ecm-solution" aria-labelledby="ecm-solution-heading">
      <div className="container ecm-solution__grid">
        <div className="ecm-reveal-left">
          <img src={Images.illoIndustryEcommerceDashboard} alt="" aria-hidden="true" className="ecm-solution__illo" loading="lazy" />
          <p className="ecm-eyebrow">{SOLUTION.eyebrow}</p>
          <h2 id="ecm-solution-heading">{SOLUTION.heading}</h2>
          {SOLUTION.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <div className="ecm-reveal-right">
          <AnalyticsPanel
            title="Omnichannel Inventory Accuracy"
            donutPercent={99}
            donutLabel="Order sync accuracy across every channel"
            metrics={[
              { value: "28%", label: "Higher cart conversion" },
              { value: "92%", label: "Same-day fulfillment" },
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
    <section className="section ecm-services" aria-labelledby="ecm-services-heading">
      <div className="container">
        <div className="section-heading ecm-reveal">
          <p className="ecm-eyebrow">{SERVICES.eyebrow}</p>
          <h2 id="ecm-services-heading">{SERVICES.heading}</h2>
          <p>{SERVICES.intro}</p>
        </div>
        <div className="ecm-services__grid ecm-reveal-stagger">
          {SERVICES.items.map((c) => (
            <div className="ecm-service-card" key={c.title}>
              <span className="ecm-service-card__icon">{c.icon}</span>
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
    <section className="section ecm-platform" aria-labelledby="ecm-platform-heading">
      <div className="container">
        <div className="section-heading ecm-reveal">
          <p className="ecm-eyebrow">{PLATFORM_EXPERTISE.eyebrow}</p>
          <h2 id="ecm-platform-heading">{PLATFORM_EXPERTISE.heading}</h2>
          <p>{PLATFORM_EXPERTISE.intro}</p>
        </div>
        <div className="ecm-platform__grid ecm-reveal-stagger">
          {PLATFORM_EXPERTISE.items.map((c) => (
            <div className="ecm-platform-item" key={c.title}>
              <p className="ecm-card-title">{c.title}</p>
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
    <section className="section ecm-ai" aria-labelledby="ecm-ai-heading">
      <div className="container">
        <div className="section-heading ecm-reveal">
          <p className="ecm-eyebrow">{AI_AUTOMATION.eyebrow}</p>
          <h2 id="ecm-ai-heading">{AI_AUTOMATION.heading}</h2>
          <p>{AI_AUTOMATION.intro}</p>
        </div>
        <div className="ecm-ai__layout">
          <div className="ecm-ai__grid ecm-reveal-stagger">
            {AI_AUTOMATION.items.map((f) => (
              <div className="ecm-ai-item" key={f.title}>
                <p className="ecm-card-title">{f.title}</p>
                <p>{f.description}</p>
              </div>
            ))}
          </div>
          <div className="ecm-reveal-right">
            <WorkflowDiagram
              title="Shopper-to-Fulfillment Flow"
              steps={[{ label: "Browse" }, { label: "Personalize" }, { label: "Cart" }, { label: "Checkout" }, { label: "Fulfill" }]}
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
    <section className="section ecm-benefits" aria-labelledby="ecm-benefits-heading">
      <div className="container">
        <div className="section-heading ecm-reveal">
          <p className="ecm-eyebrow">{BENEFITS.eyebrow}</p>
          <h2 id="ecm-benefits-heading">{BENEFITS.heading}</h2>
          <p>{BENEFITS.intro}</p>
        </div>
        <div className="ecm-benefits__stats ecm-reveal-stagger">
          {BENEFITS.stats.map((s) => (
            <AnimatedCounter key={s.label} value={s.value} label={s.label} className="ecm-stat" />
          ))}
        </div>
        <div className="ecm-benefits__grid ecm-reveal-stagger">
          {BENEFITS.items.map((b) => (
            <div className="ecm-benefit-item" key={b.title}>
              <span aria-hidden="true">{Ico.check}</span>
              <div>
                <p className="ecm-card-title">{b.title}</p>
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
    <section className="section ecm-usecases" aria-labelledby="ecm-usecases-heading">
      <div className="container">
        <div className="section-heading ecm-reveal">
          <p className="ecm-eyebrow">{USE_CASES.eyebrow}</p>
          <h2 id="ecm-usecases-heading">{USE_CASES.heading}</h2>
          <p>{USE_CASES.intro}</p>
        </div>
        <div className="ecm-usecases__grid ecm-reveal-stagger">
          {USE_CASES.items.map((n) => (
            <div className="ecm-usecase-card" key={n.title}>
              <span className="ecm-usecase-card__icon">{n.icon}</span>
              <p className="ecm-card-title">{n.title}</p>
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
    <section className="section ecm-cases" aria-labelledby="ecm-cases-heading">
      <div className="container">
        <div className="section-heading ecm-reveal">
          <p className="ecm-eyebrow">{SUCCESS_STORIES.eyebrow}</p>
          <h2 id="ecm-cases-heading">{SUCCESS_STORIES.heading}</h2>
          <p>{SUCCESS_STORIES.intro}</p>
        </div>
        <div className="ecm-cases__grid ecm-reveal-stagger">
          {SUCCESS_STORIES.cases.map((c) => (
            <div className="ecm-case-card" key={c.title}>
              <span className="ecm-case-card__tag">{c.industry}</span>
              <p className="ecm-card-title">{c.title}</p>
              <dl className="ecm-case-card__fields">
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
    <section className="section ecm-why" aria-labelledby="ecm-why-heading">
      <div className="container">
        <div className="section-heading ecm-reveal">
          <p className="ecm-eyebrow">{WHY_MIRKETA.eyebrow}</p>
          <h2 id="ecm-why-heading">{WHY_MIRKETA.heading}</h2>
          <p>{WHY_MIRKETA.intro}</p>
        </div>
        <div className="ecm-why__grid ecm-reveal-stagger">
          {WHY_MIRKETA.items.map((w) => (
            <div className="ecm-why-card" key={w.title}>
              <span className="ecm-why-card__icon">{w.icon}</span>
              <p className="ecm-card-title">{w.title}</p>
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
    <section className="section ecm-tech" aria-labelledby="ecm-tech-heading">
      <div className="container">
        <div className="section-heading ecm-reveal">
          <p className="ecm-eyebrow">{TECHNOLOGIES.eyebrow}</p>
          <h2 id="ecm-tech-heading">{TECHNOLOGIES.heading}</h2>
          <p>{TECHNOLOGIES.intro}</p>
        </div>
        <div className="ecm-tech__grid ecm-reveal-stagger">
          {TECHNOLOGIES.items.map((t) => (
            <div className="ecm-tech-card" key={t.title}>
              <span className="ecm-tech-card__icon">{t.icon}</span>
              <p className="ecm-card-title">{t.title}</p>
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
    <section className="section ecm-process" aria-labelledby="ecm-process-heading">
      <div className="container">
        <div className="section-heading ecm-reveal">
          <p className="ecm-eyebrow">{PROCESS.eyebrow}</p>
          <h2 id="ecm-process-heading">{PROCESS.heading}</h2>
          <p>{PROCESS.intro}</p>
        </div>
        <div className="ecm-zoom-in">
          <SupplyChainMap
            title="Commerce Network"
            nodes={[
              { label: "Storefront", short: "WEB" },
              { label: "Marketplace", short: "MKT" },
              { label: "Warehouse", short: "WH" },
              { label: "Payments", short: "PAY" },
              { label: "Customer", short: "CX" },
            ]}
          />
        </div>
        <div className="ecm-process__grid ecm-reveal-stagger">
          {PROCESS.detail.map((p, i) => (
            <div className="ecm-step-card" key={p.name}>
              <span className="ecm-step-card__num">{String(i + 1).padStart(2, "0")}</span>
              <p className="ecm-card-title">{p.name}</p>
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
    <section className="section ecm-faq" aria-labelledby="ecm-faq-heading">
      <div className="container">
        <div className="section-heading ecm-reveal">
          <p className="ecm-eyebrow">FAQ</p>
          <h2 id="ecm-faq-heading">Frequently Asked Questions About E-commerce Solutions</h2>
        </div>
        <FaqAccordion items={FAQS} className="ecm-reveal" searchPlaceholder="Ask a question — e.g. &quot;cart abandonment&quot;, &quot;inventory sync&quot;, &quot;platforms&quot;..." />
        <p className="ecm-faq__links">
          Related reading: <Link to={INDUSTRY_PAGES.HI_TECH.slug}>{INDUSTRY_PAGES.HI_TECH.label}</Link>,{" "}
          <Link to={INDUSTRY_PAGES.WHOLESALE.slug}>{INDUSTRY_PAGES.WHOLESALE.label}</Link>,{" "}
          <Link to={SALESFORCE_PAGES.DEVELOPER_SERVICES.slug}>{SALESFORCE_PAGES.DEVELOPER_SERVICES.label}</Link>,{" "}
          <Link to={NETSUITE_PAGES.IMPLEMENTATION.slug}>{NETSUITE_PAGES.IMPLEMENTATION.label}</Link>,{" "}
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
    <section className="ecm-final-cta ecm-reveal" aria-labelledby="ecm-final-cta-heading">
      <div className="container ecm-final-cta__inner">
        <h2 id="ecm-final-cta-heading">{FINAL_CTA.heading}</h2>
        <p>{FINAL_CTA.description}</p>
        <div className="ecm-final-cta__ctas">
          <a href={FINAL_CTA.primaryCta.href} className="btn btn-primary ecm-btn">
            {FINAL_CTA.primaryCta.label} <span aria-hidden="true">→</span>
          </a>
          <a href={FINAL_CTA.secondaryCta.href} className="btn btn-secondary ecm-btn">
            {FINAL_CTA.secondaryCta.label}
          </a>
        </div>
      </div>
    </section>
  );
}
