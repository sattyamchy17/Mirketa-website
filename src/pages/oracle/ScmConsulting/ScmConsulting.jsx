import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Images } from "../../../assets/images/index.js";
import Seo from "../../../components/Seo/Seo.jsx";
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb.jsx";
import HeroVisual from "../../../components/HeroVisual/HeroVisual.jsx";
import ConsultationSection from "../../../components/ConsultationSection/ConsultationSection.jsx";
import L3SideNav from "../../../components/L3SideNav/L3SideNav.jsx";
import "./ScmConsulting.css";

gsap.registerPlugin(ScrollTrigger);

// ============================================================
// ICONS
// ============================================================

const Ico = {
  check: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12.5l5 5L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  target: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.4" /><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.3" opacity="0.6" /><circle cx="12" cy="12" r="1.2" fill="currentColor" /></svg>
  ),
  cart: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 4h2l2.2 11h10.6L20 7H6.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /><circle cx="9" cy="20" r="1.3" fill="currentColor" /><circle cx="17" cy="20" r="1.3" fill="currentColor" /></svg>
  ),
  box: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 8l9-5 9 5-9 5-9-5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M3 8v8l9 5 9-5V8M12 13v8" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /></svg>
  ),
  warehouse: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 10.5L12 4l9 6.5" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M4.5 10v10h15V10" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M9 20v-6h6v6" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /></svg>
  ),
  factory: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 21V11l5 3V11l5 3V8l8 5v8H3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  receipt: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 3h12v17l-2-1.3L14 20l-2-1.3L10 20l-2-1.3L6 20V3z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /><path d="M9 8h6M9 12h6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
  ),
  truck: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 7h11v9H3zM14 11h4l3 3v2h-7z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><circle cx="7" cy="19" r="1.6" stroke="currentColor" strokeWidth="1.3" /><circle cx="17.5" cy="19" r="1.6" stroke="currentColor" strokeWidth="1.3" /></svg>
  ),
  loop: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 12a8 8 0 0113.6-5.7M20 12a8 8 0 01-13.6 5.7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><path d="M17.5 3.5v3.4h-3.4M6.5 20.5v-3.4h3.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  chartUp: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 19V13M10 19V8M16 19v-5M20 19V5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
  ),
  eye: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.4" /></svg>
  ),
  network: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="6" r="2.4" stroke="currentColor" strokeWidth="1.4" /><circle cx="6" cy="18" r="2.4" stroke="currentColor" strokeWidth="1.4" /><circle cx="18" cy="18" r="2.4" stroke="currentColor" strokeWidth="1.4" /><path d="M12 8.4L7 16M12 8.4l5 7.6M8.4 18h7.2" stroke="currentColor" strokeWidth="1.3" /></svg>
  ),
  robot: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="5" y="9" width="14" height="10" rx="3" stroke="currentColor" strokeWidth="1.5" /><path d="M12 5v4M9 14h.01M15 14h.01" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /><circle cx="12" cy="4" r="1.4" fill="currentColor" /></svg>
  ),
  compass: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" /><path d="M15 9l-2 6-6 2 2-6 6-2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  gear: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.4" /><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
  ),
  plug: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 3v5M15 3v5M7 8h10v4a5 5 0 01-10 0V8z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="M12 17v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
  ),
  headset: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 13a8 8 0 0116 0v4" stroke="currentColor" strokeWidth="1.5" /><rect x="3" y="13" width="4" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4" /><rect x="17" y="13" width="4" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4" /></svg>
  ),
  award: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="8" r="5" stroke="currentColor" strokeWidth="1.4" /><path d="M8.5 12.5L7 21l5-2.5L17 21l-1.5-8.5" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  globe: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.4" /><path d="M3 12h18M12 3c2.5 2.5 3.5 6 3.5 9s-1 6.5-3.5 9c-2.5-2.5-3.5-6-3.5-9s1-6.5 3.5-9z" stroke="currentColor" strokeWidth="1.3" /></svg>
  ),
  chip: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="7" y="7" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.4" /><path d="M9 3v4M15 3v4M9 21v-4M15 21v-4M3 9h4M3 15h4M21 9h-4M21 15h-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
  ),
  car: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 16l2-6h12l2 6" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><rect x="3" y="16" width="18" height="4" rx="1.5" stroke="currentColor" strokeWidth="1.3" /><circle cx="7.5" cy="20" r="1.4" stroke="currentColor" strokeWidth="1.2" /><circle cx="16.5" cy="20" r="1.4" stroke="currentColor" strokeWidth="1.2" /></svg>
  ),
  pulse: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 12h4l2-6 4 12 2-6h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  leaf: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M20 4C10 4 4 10 4 18c8 0 14-6 14-14z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M6 18c2-6 6-9 12-12" stroke="currentColor" strokeWidth="1.2" /></svg>
  ),
  quote: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 9c-2 0-3.5 1.6-3.5 3.6 0 2 1.5 3.4 3.3 3.4.3 2.4-1.2 3.9-3.3 4.4v1.3c3.4-.4 5.7-2.8 5.7-6.3V9H7zm10 0c-2 0-3.5 1.6-3.5 3.6 0 2 1.5 3.4 3.3 3.4.3 2.4-1.2 3.9-3.3 4.4v1.3c3.4-.4 5.7-2.8 5.7-6.3V9H17z" fill="currentColor" /></svg>
  ),
};

// ============================================================
// DATA
// ============================================================

const L3_ITEMS = [
  { label: "ERP Consulting", href: "/platforms/oracle/fusion-implementation/erp-consulting" },
  { label: "HCM", href: "/platforms/oracle/fusion-implementation/hcm-consulting" },
  { label: "CX Consulting Development", href: "/platforms/oracle/fusion-implementation/cx-consulting" },
  { label: "EPM Consulting Development Services", href: "/platforms/oracle/fusion-implementation/epm-consulting" },
  { label: "SCM", href: "/platforms/oracle/fusion-implementation/scm-consulting" },
];

const BREADCRUMB = [
  { label: "Home", href: "/" },
  { label: "Platforms & Technology", href: "/" },
  { label: "Oracle Fusion Applications Implementation", href: "/platforms/oracle/fusion-implementation" },
  { label: "SCM" },
];

const HERO = {
  badge: "Oracle Certified SCM Implementation Partner",
  title: "Oracle SCM Consulting & Development for Connected, Resilient Supply Chains",
  description:
    "Mirketa helps enterprises implement and optimize Oracle Cloud SCM — planning, procurement, manufacturing, and logistics — so supply chain teams get real-time visibility instead of disconnected spreadsheets and delayed reports.",
  primaryCta: { label: "Schedule a Consultation", href: "#contact" },
  secondaryCta: { label: "Talk to an Oracle SCM Expert", href: "#contact" },
  metrics: ["90+ Oracle SCM Engagements", "Certified SCM Consultants", "Global Delivery Model", "Post Go-Live Support Included"],
};

const HERO_DASHBOARD = {
  title: "Supply Chain Control Tower",
  stats: [
    { label: "OPEX REDUCTION", value: "23%", caption: "Avg. supply chain operating costs" },
    { label: "ON-TIME DELIVERY", value: "98%", caption: "Across logistics network" },
    { label: "INVENTORY COST", value: "28%", caption: "Reduction post go-live" },
  ],
  rows: [
    { title: "Demand plan — Q3 consumer goods", meta: "Generated from real-time demand signals", tone: "good", status: "On Track" },
    { title: "Supplier PO — steel components", meta: "Spend analysis flagged 12% cost variance", tone: "attention", status: "Review" },
    { title: "Warehouse cycle count — DC 4", meta: "Real-time inventory reconciliation", tone: "good", status: "Complete" },
  ],
  floatingCards: [
    { icon: Ico.target, title: "23% Cost Cut", subtitle: "Supply chain operating costs" },
    { icon: Ico.truck, title: "98% On-Time", subtitle: "Delivery performance" },
  ],
};

const WHY_SCM = {
  eyebrow: "Why Oracle Cloud SCM",
  heading: "One Connected Platform for Planning, Sourcing, and Delivery",
  intro: "Supply chain performance breaks down when planning, procurement, and logistics run on disconnected systems. Oracle Cloud SCM puts every function on one shared data model.",
  stat: { value: "23%", label: "Average Reduction in Supply Chain Operating Costs" },
  pillars: [
    { icon: Ico.eye, title: "Real-Time Visibility", description: "Every shipment, order, and inventory position visible the moment it changes." },
    { icon: Ico.network, title: "Connected Operations", description: "Planning, procurement, and manufacturing running on one shared data model." },
    { icon: Ico.robot, title: "AI-Powered Resilience", description: "Disruptions flagged and rerouted before they reach the customer." },
  ],
};

const SERVICES = {
  eyebrow: "Oracle SCM Consulting Services",
  heading: "Consulting Built Around How Your Supply Chain Actually Operates",
  intro: "Every engagement starts with how goods, orders, and information actually move through your business — not a generic module checklist.",
  items: [
    { icon: Ico.compass, title: "Oracle SCM Consulting", description: "A prioritized roadmap tying every SCM decision to a measurable operational outcome." },
    { icon: Ico.chartUp, title: "Oracle SCM Implementation", description: "Planning, procurement, and logistics workflows configured to your operating model." },
    { icon: Ico.loop, title: "Oracle SCM Migration & Upgrade", description: "Legacy planning and inventory systems migrated onto a governed SCM foundation." },
    { icon: Ico.plug, title: "Oracle SCM Integration", description: "SCM connected to ERP, supplier, and logistics systems your teams already rely on." },
    { icon: Ico.gear, title: "Oracle SCM Customization", description: "Business rules and workflows tailored to policies a standard build can't cover." },
    { icon: Ico.headset, title: "Managed Services & Support", description: "A dedicated team keeping your SCM environment healthy after go-live." },
  ],
};

const PILLARS = [
  {
    id: "planning",
    icon: Ico.target,
    title: "Supply Chain Planning",
    description: "Demand and supply plans built on real signals instead of static spreadsheets, so forecasts hold up when conditions change.",
    capabilities: ["Demand Forecasting", "Supply Planning", "Scenario Modeling"],
  },
  {
    id: "procurement",
    icon: Ico.cart,
    title: "Procurement & Strategic Sourcing",
    description: "Sourcing and supplier negotiation backed by spend visibility across every category and contract.",
    capabilities: ["Strategic Sourcing", "Supplier Negotiation", "Spend Analysis"],
  },
  {
    id: "inventory",
    icon: Ico.box,
    title: "Inventory Management",
    description: "Inventory positioned where demand actually needs it, with automated replenishment tuned to real consumption.",
    capabilities: ["Automated Replenishment", "Safety Stock Optimization", "Multi-Location Visibility"],
  },
  {
    id: "warehouse",
    icon: Ico.warehouse,
    title: "Warehouse Management",
    description: "Warehouse operations connected to order and inventory data, so picking, packing, and putaway run without manual reconciliation.",
    capabilities: ["Slotting Optimization", "Labor Planning", "Real-Time Cycle Counts"],
  },
  {
    id: "manufacturing",
    icon: Ico.factory,
    title: "Manufacturing Solutions",
    description: "Work orders, quality, and shop floor execution connected directly to demand and supply plans.",
    capabilities: ["Work Order Execution", "Quality Management", "Shop Floor Visibility"],
  },
  {
    id: "order-management",
    icon: Ico.receipt,
    title: "Order Management",
    description: "Orders routed, fulfilled, and tracked from a single connected view across every channel.",
    capabilities: ["Omnichannel Fulfillment", "Order Orchestration", "Exception Management"],
  },
  {
    id: "logistics",
    icon: Ico.truck,
    title: "Logistics & Transportation",
    description: "Carrier selection and shipment tracking tuned to cost and service commitments, not guesswork.",
    capabilities: ["Carrier Optimization", "Freight Visibility", "Delivery Exception Alerts"],
  },
  {
    id: "plm",
    icon: Ico.loop,
    title: "Product Lifecycle Management",
    description: "Product data, specifications, and change orders managed from concept through end-of-life in one system.",
    capabilities: ["Change Order Management", "Product Data Governance", "Supplier Collaboration"],
  },
  {
    id: "analytics",
    icon: Ico.chartUp,
    title: "Supply Chain Analytics",
    description: "Performance across planning, procurement, and logistics visible in one connected analytics layer.",
    capabilities: ["Predictive Analytics", "Performance Dashboards", "Root-Cause Analysis"],
    kpis: [
      { value: "28%", label: "Inventory Cost Reduction" },
      { value: "98%", label: "On-Time Delivery" },
      { value: "3.5x", label: "Faster Forecasting" },
    ],
  },
];

const INDUSTRIES = {
  eyebrow: "Industries We Serve",
  heading: "Oracle SCM Experience Across Complex, Physical-Goods Industries",
  intro: "Every industry brings its own sourcing, production, and delivery constraints — our teams bring specific domain context to each one.",
  items: [
    { icon: Ico.cart, title: "Retail & Consumer Goods" },
    { icon: Ico.factory, title: "Manufacturing" },
    { icon: Ico.chip, title: "High Tech" },
    { icon: Ico.car, title: "Automotive" },
    { icon: Ico.pulse, title: "Life Sciences" },
    { icon: Ico.leaf, title: "Food & Beverage" },
  ],
};

const METHODOLOGY = {
  eyebrow: "Oracle SCM Implementation Methodology",
  heading: "A Structured Roadmap From Discovery to Optimization",
  intro: "No surprises, no scope creep. Our SCM delivery methodology has been refined across enterprise supply chain transformations.",
  stages: [
    { name: "Discovery", description: "Mapping your current planning, procurement, and logistics processes." },
    { name: "Process Assessment", description: "Identifying gaps and inefficiencies before design begins." },
    { name: "Solution Design", description: "Data model, security, and integration architecture documented." },
    { name: "Configuration", description: "Core SCM setup — planning models, procurement workflows, warehouse rules." },
    { name: "Data Migration", description: "Item masters, supplier data, and inventory records migrated and validated." },
    { name: "Testing", description: "UAT, regression, and security testing completed before go-live." },
    { name: "Go-Live & Optimization", description: "Structured cutover followed by continuous tuning after launch." },
  ],
};

const WHY_MIRKETA = {
  eyebrow: "Why Choose Mirketa",
  heading: "An Oracle SCM Partner That Understands Operations, Not Just Software",
  intro: "Hundreds of partners can activate SCM modules. Fewer can tie every decision back to a measurable operational outcome.",
  items: [
    { icon: Ico.award, title: "Certified Oracle SCM Consultants", description: "Every consultant holds active Oracle SCM Cloud certifications." },
    { icon: Ico.compass, title: "Supply Chain Domain Expertise", description: "Delivery teams who understand planning and logistics, not just configuration screens." },
    { icon: Ico.robot, title: "AI-Ready Delivery Framework", description: "Implementations built to take advantage of Oracle's embedded planning AI from day one." },
    { icon: Ico.globe, title: "Global Support Coverage", description: "Follow-the-sun coverage for multi-region planning and logistics cycles." },
  ],
};

const TESTIMONIALS = {
  eyebrow: "Customer Success Stories",
  heading: "What Supply Chain Leaders Say About Their Oracle SCM Results",
  intro: "Real feedback from operations teams after their Oracle SCM engagement with Mirketa.",
  items: [
    { quote: "We used to find out about a stockout when a customer called. Now we see the risk three weeks before it happens.", name: "Elena Kowalski", role: "VP of Supply Chain, consumer goods manufacturer", metric: "28% lower inventory costs" },
    { quote: "Our procurement team was negotiating contracts with no visibility into total spend. Oracle SCM changed that conversation completely.", name: "Farid Bashir", role: "Director of Strategic Sourcing", metric: "19% lower procurement spend" },
    { quote: "Mirketa understood our warehouse floor before they touched a single configuration screen. That's the difference between a vendor and a partner.", name: "Dana Whitfield", role: "COO, distribution and logistics company", metric: "98% on-time delivery" },
  ],
};

const FAQS = [
  { q: "What is Oracle SCM Consulting & Development?", a: "Oracle SCM Consulting & Development is the process of implementing and optimizing Oracle's Cloud Supply Chain Management suite — planning, procurement, inventory, warehouse, manufacturing, and logistics — configured to your operating model." },
  { q: "How long does an Oracle SCM implementation take?", a: "A focused single-module implementation, such as Inventory or Procurement, typically takes 3–5 months. Multi-module deployments spanning planning, manufacturing, and logistics can take 8–14 months depending on scope." },
  { q: "Can you migrate us from a legacy planning or WMS system?", a: "Yes. We migrate item masters, supplier data, and inventory records from legacy planning and warehouse systems, validating every data object before it goes live on Oracle SCM." },
  { q: "What Oracle SCM modules do you implement?", a: "We implement Supply Chain Planning, Procurement, Inventory Management, Warehouse Management, Manufacturing, Order Management, Logistics and Transportation, Product Lifecycle Management, and Supply Chain Analytics." },
  { q: "How does Oracle SCM integrate with our ERP and supplier systems?", a: "We integrate Oracle SCM with Oracle ERP, supplier portals, and logistics carriers using Oracle Integration Cloud and REST APIs, so orders and inventory data flow without manual re-entry." },
  { q: "What AI capabilities does Oracle SCM include?", a: "Oracle SCM includes embedded AI for demand forecasting, disruption detection, and delivery exception alerts. We configure these against your own transaction history so recommendations reflect how your supply chain actually operates." },
  { q: "Do you provide support after go-live?", a: "Yes. Every implementation includes a structured hypercare period immediately after go-live. Clients can transition into an ongoing managed services retainer for continued optimization." },
  { q: "Are you a certified Oracle SCM implementation partner?", a: "Yes. Mirketa's consultants hold active Oracle SCM Cloud certifications, backed by a verified delivery track record across enterprise supply chain transformation engagements." },
  { q: "Can Oracle SCM support global, multi-warehouse operations?", a: "Yes. Oracle SCM is built for multi-location inventory, multi-entity manufacturing, and global logistics networks spanning dozens of countries and distribution centers." },
];

const FINAL_CTA = {
  heading: "Build a Connected, Resilient Supply Chain with Oracle Cloud SCM",
  description: "Partner with Mirketa's certified Oracle SCM consultants to connect planning, procurement, and logistics into one trusted system — or speak with an Oracle SCM expert before you commit to a roadmap.",
  primaryCta: { label: "Schedule a Consultation", href: "#contact" },
  secondaryCta: { label: "Talk to an Oracle SCM Expert", href: "#contact" },
};

const SEO = {
  title: "Oracle SCM Consulting & Development Services | Mirketa",
  description:
    "Mirketa's certified Oracle SCM consultants deliver Oracle Cloud Supply Chain Management implementation across planning, procurement, inventory, warehouse, manufacturing, and logistics.",
  canonical: "https://mirketa.us/oracle-scm-consulting-development/",
  keywords: [
    "Oracle SCM Consulting",
    "Oracle SCM Implementation",
    "Oracle Cloud SCM Services",
    "Oracle Supply Chain Management",
    "Oracle Procurement Consulting",
    "Oracle Warehouse Management",
    "Oracle Inventory Management",
    "Oracle Manufacturing Cloud",
    "Oracle Order Management",
    "Oracle SCM Consultants",
  ],
  schema: [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "Oracle SCM Consulting and Development Services",
      provider: { "@type": "Organization", name: "Mirketa Inc.", url: "https://mirketa.us" },
      name: "Oracle SCM Consulting & Development Services",
      description:
        "End-to-end Oracle Cloud SCM consulting and implementation across supply chain planning, procurement, inventory, warehouse management, manufacturing, order management, logistics, and analytics.",
      areaServed: "Global",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://mirketa.us/" },
        { "@type": "ListItem", position: 2, name: "Oracle Fusion Applications Implementation", item: "https://mirketa.us/oracle-fusion-applications-implementation/" },
        { "@type": "ListItem", position: 3, name: "Oracle SCM Consulting & Development Services", item: "https://mirketa.us/oracle-scm-consulting-development/" },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

// ============================================================
// MAIN COMPONENT
// ============================================================

export default function ScmConsulting() {
  const location = useLocation();
  const heroTextRef = useRef(null);
  const heroRef = useRef(null);
  const [showStickyCta, setShowStickyCta] = useState(false);

  useEffect(() => {
    const heroEl = heroRef.current;
    if (!heroEl) return;
    const observer = new IntersectionObserver(
      ([entry]) => setShowStickyCta(!entry.isIntersecting),
      { rootMargin: "-10% 0px 0px 0px" }
    );
    observer.observe(heroEl);
    return () => observer.disconnect();
  }, []);

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

      gsap.utils.toArray(".osc-reveal").forEach((el) => {
        gsap.from(el, {
          opacity: prefersReduced ? 1 : 0,
          y: prefersReduced ? 0 : 32,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      gsap.utils.toArray(".osc-reveal-left").forEach((el) => {
        gsap.from(el, {
          opacity: prefersReduced ? 1 : 0,
          x: prefersReduced ? 0 : -30,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      gsap.utils.toArray(".osc-reveal-right").forEach((el) => {
        gsap.from(el, {
          opacity: prefersReduced ? 1 : 0,
          x: prefersReduced ? 0 : 30,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      gsap.utils.toArray(".osc-reveal-stagger").forEach((el) => {
        gsap.from(el.children, {
          opacity: prefersReduced ? 1 : 0,
          y: prefersReduced ? 0 : 26,
          duration: 0.6,
          stagger: 0.06,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      gsap.utils.toArray(".osc-zoom-in").forEach((el) => {
        gsap.from(el, {
          opacity: prefersReduced ? 1 : 0,
          scale: prefersReduced ? 1 : 0.94,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="oracle-scm-consulting">
      <Seo {...SEO} />
      <HeroSection heroTextRef={heroTextRef} heroRef={heroRef} />
      <TrustedBySection />

      <section className="osc-l3-layout" aria-label="Oracle SCM Consulting details">
        <div className="container osc-l3-layout__grid">
          <L3SideNav eyebrow="Oracle Fusion Applications" items={L3_ITEMS} activeHref={location.pathname} ariaLabel="Oracle Fusion Applications Implementation sub-pages" />
          <div className="osc-l3-layout__content">
            <WhyScmSection />
            <ServicesSection />
            <div className="osc-pillars-flow">
              <span className="osc-pillars-flow__line" aria-hidden="true" />
              {PILLARS.map((p, i) => (
                <PillarSection key={p.id} pillar={p} reverse={i % 2 === 1} />
              ))}
            </div>
            <IndustriesSection />
            <MethodologySection />
            <WhyMirketaSection />
          </div>
        </div>
      </section>

      <TestimonialsSection />
      <FaqSection />
      <FinalCtaSection />
      <ConsultationSection
        eyebrow="Get Started"
        heading="Schedule a Free Oracle SCM Consultation"
        description="Tell us about your current planning, procurement, and logistics systems and what you're trying to achieve with Oracle Cloud SCM — an Oracle SCM expert will follow up within one business day."
        formTitle="Schedule a Free Oracle SCM Consultation"
      />
      <StickyCta visible={showStickyCta} />
    </div>
  );
}

// ============================================================
// STICKY CTA
// ============================================================

function StickyCta({ visible }) {
  return (
    <div className={`osc-sticky-cta ${visible ? "is-visible" : ""}`} aria-hidden={!visible}>
      <a href="#contact" className="btn btn-primary osc-btn" tabIndex={visible ? 0 : -1}>
        Schedule a Consultation <span aria-hidden="true">→</span>
      </a>
    </div>
  );
}

// ============================================================
// HERO
// ============================================================

function HeroSection({ heroTextRef, heroRef }) {
  return (
    <section ref={heroRef} className="osc-hero" style={{ backgroundImage: `url("${Images.heroOracleScmConsulting}")` }} aria-label="Oracle SCM Consulting & Development by Mirketa">
      <div className="osc-hero__scrim" />
      <div className="container">
        <Breadcrumb items={BREADCRUMB} className="osc-breadcrumb" />
        <div className="osc-hero__inner">
          <div ref={heroTextRef} className="osc-hero__text">
            <span className="osc-badge">
              <span className="osc-badge__spark" aria-hidden="true">✦</span> {HERO.badge}
            </span>
            <h1>{HERO.title}</h1>
            <p className="osc-hero__description">{HERO.description}</p>
            <div className="osc-hero__ctas">
              <a href={HERO.primaryCta.href} className="btn btn-primary osc-btn">
                {HERO.primaryCta.label} <span aria-hidden="true">→</span>
              </a>
              <a href={HERO.secondaryCta.href} className="btn btn-secondary osc-btn">
                {HERO.secondaryCta.label}
              </a>
            </div>
            <ul className="osc-hero__metrics">
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
            className="osc-hero__visual osc-zoom-in"
          />
        </div>
      </div>
    </section>
  );
}

// ============================================================
// TRUSTED CLIENTS
// ============================================================

function TrustedBySection() {
  const badges = [
    { icon: Images.clientSalesforce, label: "Certified Partner" },
    { icon: Images.clientSoc2, label: "SOC 2 Certified" },
    { icon: Images.clientHipaa, label: "HIPAA Ready" },
    { icon: Images.clientEnterprise, label: "Enterprise Ready" },
    { icon: Images.clientExperience, label: "15+ Years Experience" },
  ];
  const loop = [...badges, ...badges];

  return (
    <section className="osc-trusted" aria-label="Trusted clients">
      <div className="container osc-trusted__inner">
        <p className="osc-trusted__label">Trusted by Supply Chain & Operations Leaders</p>
        <div className="osc-trusted__track" role="list">
          <div className="osc-trusted__marquee">
            {loop.map((b, i) => (
              <div className="osc-trusted__badge" role="listitem" key={`${b.label}-${i}`}>
                <img src={b.icon} alt="" aria-hidden="true" />
                <span>{b.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// WHY ORACLE CLOUD SCM — stat callout + 3 value pillars
// ============================================================

function WhyScmSection() {
  return (
    <section className="osc-why-scm" id="services" aria-labelledby="osc-why-scm-heading">
      <div className="osc-why-scm__head">
        <div>
          <p className="osc-eyebrow">{WHY_SCM.eyebrow}</p>
          <h2 id="osc-why-scm-heading">{WHY_SCM.heading}</h2>
          <p className="osc-section-intro">{WHY_SCM.intro}</p>
        </div>
        <div className="osc-why-scm__stat">
          <strong>{WHY_SCM.stat.value}</strong>
          <span>{WHY_SCM.stat.label}</span>
        </div>
      </div>
      <div className="osc-why-scm__pillars osc-reveal-stagger">
        {WHY_SCM.pillars.map((p) => (
          <div className="osc-why-scm-pillar" key={p.title}>
            <span>{p.icon}</span>
            <h3>{p.title}</h3>
            <p>{p.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ============================================================
// ORACLE SCM CONSULTING SERVICES — interactive icon cards
// ============================================================

function ServicesSection() {
  return (
    <section className="osc-services" aria-labelledby="osc-services-heading">
      <div className="osc-services__head">
        <div>
          <p className="osc-eyebrow">{SERVICES.eyebrow}</p>
          <h2 id="osc-services-heading">{SERVICES.heading}</h2>
          <p className="osc-section-intro">{SERVICES.intro}</p>
        </div>
        <img src={Images.illoOracleScmSupplyChainDashboard} alt="" aria-hidden="true" className="osc-services__illo" loading="lazy" />
      </div>
      <div className="osc-services__grid osc-reveal-stagger">
        {SERVICES.items.map((s) => (
          <div className="osc-service-card" key={s.title} tabIndex={0}>
            <span className="osc-service-card__icon">{s.icon}</span>
            <h3>{s.title}</h3>
            <p>{s.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ============================================================
// SCM PILLARS — connected workflow flow, 9 independent H2s
// ============================================================

function PillarSection({ pillar, reverse }) {
  return (
    <section className={`osc-pillar ${reverse ? "osc-pillar--reverse" : ""}`} aria-labelledby={`osc-pillar-${pillar.id}-heading`}>
      <span className="osc-pillar__node" aria-hidden="true" />
      <div className="osc-pillar__card">
        <span className="osc-pillar__icon">{pillar.icon}</span>
        <h2 id={`osc-pillar-${pillar.id}-heading`}>{pillar.title}</h2>
        <p>{pillar.description}</p>
        <div className="osc-pillar__chips">
          {pillar.capabilities.map((c) => (
            <span key={c}>{c}</span>
          ))}
        </div>
        {pillar.kpis && (
          <div className="osc-pillar__kpis osc-reveal-stagger">
            {pillar.kpis.map((k) => (
              <PillarKpi key={k.label} value={k.value} label={k.label} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function PillarKpi({ value, label }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const match = value.match(/^([\d.]+)(.*)$/);
    if (!match) {
      setDisplay(value);
      return;
    }
    const target = parseFloat(match[1]);
    const suffix = match[2];
    const isDecimal = match[1].includes(".");

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setDisplay(value);
      return;
    }

    let hasStarted = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          hasStarted = true;
          const duration = 1200;
          const startTime = performance.now();
          const step = (now) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const current = target * progress;
            setDisplay((isDecimal ? current.toFixed(1) : Math.floor(current)) + suffix);
            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              setDisplay(value);
            }
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div className="osc-pillar__kpi" ref={ref}>
      <strong>{display}</strong>
      <span>{label}</span>
    </div>
  );
}

// ============================================================
// INDUSTRIES WE SERVE — badge wall
// ============================================================

function IndustriesSection() {
  return (
    <section className="osc-industries" aria-labelledby="osc-industries-heading">
      <p className="osc-eyebrow">{INDUSTRIES.eyebrow}</p>
      <h2 id="osc-industries-heading">{INDUSTRIES.heading}</h2>
      <p className="osc-section-intro">{INDUSTRIES.intro}</p>
      <div className="osc-industries__wall osc-reveal-stagger">
        {INDUSTRIES.items.map((n) => (
          <div className="osc-industry-badge" key={n.title}>
            <span>{n.icon}</span>
            {n.title}
          </div>
        ))}
      </div>
    </section>
  );
}

// ============================================================
// ORACLE SCM IMPLEMENTATION METHODOLOGY — stepped roadmap
// ============================================================

function MethodologySection() {
  return (
    <section className="osc-methodology" aria-labelledby="osc-methodology-heading">
      <p className="osc-eyebrow">{METHODOLOGY.eyebrow}</p>
      <h2 id="osc-methodology-heading">{METHODOLOGY.heading}</h2>
      <p className="osc-section-intro">{METHODOLOGY.intro}</p>
      <div className="osc-methodology__roadmap osc-reveal-stagger">
        {METHODOLOGY.stages.map((s, i) => (
          <div className={`osc-methodology__stage ${i % 2 === 1 ? "osc-methodology__stage--down" : ""}`} key={s.name}>
            <span className="osc-methodology__num">{i + 1}</span>
            <h3>{s.name}</h3>
            <p>{s.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ============================================================
// WHY CHOOSE MIRKETA — medallion cards
// ============================================================

function WhyMirketaSection() {
  return (
    <section className="osc-why-mirketa" aria-labelledby="osc-why-mirketa-heading">
      <p className="osc-eyebrow">{WHY_MIRKETA.eyebrow}</p>
      <h2 id="osc-why-mirketa-heading">{WHY_MIRKETA.heading}</h2>
      <p className="osc-section-intro">{WHY_MIRKETA.intro}</p>
      <div className="osc-why-mirketa__grid osc-reveal-stagger">
        {WHY_MIRKETA.items.map((w) => (
          <div className="osc-why-mirketa-card" key={w.title}>
            <span className="osc-why-mirketa-card__medallion">{w.icon}</span>
            <h3>{w.title}</h3>
            <p>{w.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ============================================================
// CUSTOMER SUCCESS STORIES — horizontal scroll-strip testimonials
// ============================================================

function TestimonialsSection() {
  return (
    <section className="section osc-testimonials" aria-labelledby="osc-testimonials-heading">
      <div className="container">
        <div className="section-heading osc-reveal">
          <p className="osc-eyebrow">{TESTIMONIALS.eyebrow}</p>
          <h2 id="osc-testimonials-heading">{TESTIMONIALS.heading}</h2>
          <p>{TESTIMONIALS.intro}</p>
        </div>
        <div className="osc-testimonials__strip osc-reveal-stagger">
          {TESTIMONIALS.items.map((t) => (
            <figure className="osc-testimonial-card" key={t.name}>
              <span className="osc-testimonial-card__mark" aria-hidden="true">{Ico.quote}</span>
              <blockquote>{t.quote}</blockquote>
              <p className="osc-testimonial-card__metric">{t.metric}</p>
              <figcaption>
                <strong>{t.name}</strong>
                <span>{t.role}</span>
              </figcaption>
            </figure>
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
  const [query, setQuery] = useState("");
  const [openIndex, setOpenIndex] = useState(-1);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return FAQS;
    return FAQS.filter((item) => item.q.toLowerCase().includes(q) || item.a.toLowerCase().includes(q));
  }, [query]);

  return (
    <section className="section osc-faq" aria-labelledby="osc-faq-heading">
      <div className="container">
        <div className="section-heading osc-reveal">
          <p className="osc-eyebrow">FAQ</p>
          <h2 id="osc-faq-heading">Frequently Asked Questions About Oracle SCM Consulting</h2>
        </div>
        <div className="osc-faq__search-wrap osc-reveal">
          <label htmlFor="osc-faq-search" className="visually-hidden">
            Search frequently asked questions
          </label>
          <input
            id="osc-faq-search"
            type="search"
            className="osc-faq__search"
            placeholder="Ask a question — e.g. &quot;warehouse&quot;, &quot;migration&quot;, &quot;AI&quot;..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpenIndex(-1);
            }}
          />
        </div>
        <div className="osc-faq__list osc-reveal">
          {filtered.length === 0 ? (
            <p className="osc-faq__empty">No questions match &ldquo;{query}&rdquo;. Try a different search term.</p>
          ) : (
            filtered.map((item, i) => {
              const open = openIndex === i;
              const panelId = `osc-faq-panel-${i}`;
              return (
                <div className={`osc-faq-item ${open ? "is-open" : ""}`} key={item.q}>
                  <button type="button" className="osc-faq-item__question" aria-expanded={open} aria-controls={panelId} onClick={() => setOpenIndex(open ? -1 : i)}>
                    <span>{item.q}</span>
                    <span className="osc-faq-item__icon" aria-hidden="true">{open ? "−" : "+"}</span>
                  </button>
                  <div id={panelId} className="osc-faq-item__answer" role="region" hidden={!open}>
                    <p>{item.a}</p>
                  </div>
                </div>
              );
            })
          )}
        </div>
        <p className="osc-faq__links">
          Related reading: <Link to="/platforms/oracle/fusion-implementation">Oracle Fusion Applications Implementation</Link>,{" "}
          <Link to="/platforms/oracle/fusion-implementation/erp-consulting">Oracle Cloud ERP Consulting</Link>,{" "}
          <Link to="/platforms/oracle/fusion-implementation/hcm-consulting">Oracle HCM Consulting</Link>,{" "}
          <Link to="/platforms/oracle/fusion-implementation/cx-consulting">Oracle CX Consulting</Link>,{" "}
          <Link to="/platforms/oracle/fusion-implementation/epm-consulting">Oracle EPM Consulting</Link>.
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
    <section className="osc-final-cta osc-reveal" aria-labelledby="osc-final-cta-heading">
      <div className="container osc-final-cta__inner">
        <h2 id="osc-final-cta-heading">{FINAL_CTA.heading}</h2>
        <p>{FINAL_CTA.description}</p>
        <div className="osc-final-cta__ctas">
          <a href={FINAL_CTA.primaryCta.href} className="btn btn-primary osc-btn">
            {FINAL_CTA.primaryCta.label} <span aria-hidden="true">→</span>
          </a>
          <a href={FINAL_CTA.secondaryCta.href} className="btn btn-secondary osc-btn">
            {FINAL_CTA.secondaryCta.label}
          </a>
        </div>
      </div>
    </section>
  );
}
