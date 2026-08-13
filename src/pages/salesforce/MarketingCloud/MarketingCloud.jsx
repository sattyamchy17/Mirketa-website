import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Images } from "../../../assets/images/index.js";
import Seo from "../../../components/Seo/Seo.jsx";
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb.jsx";
import HeroVisual from "../../../components/HeroVisual/HeroVisual.jsx";
import ConsultationSection from "../../../components/ConsultationSection/ConsultationSection.jsx";
import "./MarketingCloud.css";

gsap.registerPlugin(ScrollTrigger);

// ============================================================
// ICONS
// ============================================================

const Ico = {
  frown: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.4" /><path d="M8.5 15.5c1-1.6 2.3-2.4 3.5-2.4s2.5.8 3.5 2.4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /><circle cx="9" cy="9.5" r="1" fill="currentColor" /><circle cx="15" cy="9.5" r="1" fill="currentColor" /></svg>
  ),
  gear: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.4" /><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
  ),
  scatter: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="6" cy="6" r="2.4" stroke="currentColor" strokeWidth="1.4" /><circle cx="18" cy="7" r="2.4" stroke="currentColor" strokeWidth="1.4" /><circle cx="7" cy="18" r="2.4" stroke="currentColor" strokeWidth="1.4" /><circle cx="17" cy="17" r="2.4" stroke="currentColor" strokeWidth="1.4" /></svg>
  ),
  mail: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" /><path d="M4 6.5l8 6 8-6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
  ),
  plug: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 3v5M15 3v5M7 8h10v4a5 5 0 01-10 0V8z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="M12 17v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
  ),
  eye: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.4" /></svg>
  ),
  compass: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" /><path d="M15 9l-2 6-6 2 2-6 6-2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  rocket: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 2c3 2 5 6 5 10 0 3-1 6-5 10-4-4-5-7-5-10 0-4 2-8 5-10z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><circle cx="12" cy="10" r="1.6" fill="currentColor" /></svg>
  ),
  flow: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="4" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" /><rect x="14" y="13" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" /><path d="M10 7.5h4a3 3 0 013 3V14" stroke="currentColor" strokeWidth="1.4" /></svg>
  ),
  phone: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="6" y="2" width="12" height="20" rx="3" stroke="currentColor" strokeWidth="1.5" /><path d="M10 19h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
  ),
  megaphone: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 10v4h3l6 4V6L6 10H3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="M17 8a5 5 0 010 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
  ),
  sparkle: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /></svg>
  ),
  map: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 3L3 5v16l6-2 6 2 6-2V3l-6 2-6-2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M9 3v16M15 5v16" stroke="currentColor" strokeWidth="1.3" opacity="0.6" /></svg>
  ),
  robot: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="5" y="9" width="14" height="10" rx="3" stroke="currentColor" strokeWidth="1.5" /><path d="M12 5v4M9 14h.01M15 14h.01" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /><circle cx="12" cy="4" r="1.4" fill="currentColor" /></svg>
  ),
  chartUp: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 19V13M10 19V8M16 19v-5M20 19V5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
  ),
  gear2: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="10" width="18" height="4" rx="2" stroke="currentColor" strokeWidth="1.4" /><rect x="3" y="18" width="12" height="4" rx="2" stroke="currentColor" strokeWidth="1.4" /><rect x="3" y="2" width="15" height="4" rx="2" stroke="currentColor" strokeWidth="1.4" /></svg>
  ),
  clock: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" /><path d="M12 7v5l4 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  tag: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3l8 8-8.5 8.5a1.5 1.5 0 01-2.1 0L3.5 13.6a1.5 1.5 0 010-2.1L12 3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><circle cx="9" cy="8" r="1.6" fill="currentColor" /></svg>
  ),
  target: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.4" /><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.3" opacity="0.6" /><circle cx="12" cy="12" r="1.2" fill="currentColor" /></svg>
  ),
  document: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 3h9l3 3v15H6z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M9 10h6M9 14h6M9 18h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
  ),
  award: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="8" r="5" stroke="currentColor" strokeWidth="1.4" /><path d="M8.5 12.5L7 21l5-2.5L17 21l-1.5-8.5" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  globe: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.4" /><path d="M3 12h18M12 3c2.5 2.5 3.5 6 3.5 9s-1 6.5-3.5 9c-2.5-2.5-3.5-6-3.5-9s1-6.5 3.5-9z" stroke="currentColor" strokeWidth="1.3" /></svg>
  ),
  handshake: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 12l4-4 4 4-4 4-4-4zM21 12l-4-4-4 4 4 4 4-4z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M11 12h2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
  ),
  bolt: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M13 2L4 14h7l-1 8 10-13h-7l0-7z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  check: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12.5l5 5L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  cross: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
  ),
};

// ============================================================
// DATA
// ============================================================

const BREADCRUMB = [
  { label: "Home", href: "/" },
  { label: "Platforms & Technology", href: "/platforms/salesforce/clouds" },
  { label: "Salesforce Clouds", href: "/platforms/salesforce/clouds" },
  { label: "Marketing Cloud" },
];

const HERO = {
  badge: "Salesforce Summit Partner • Marketing Cloud Experts",
  title: "Deliver Personalized Customer Experiences with Salesforce Marketing Cloud",
  description:
    "Transform your marketing with Salesforce Marketing Cloud consulting, implementation, Journey Builder, Email Studio, AI-powered personalization, campaign automation, and customer engagement solutions. Create connected experiences that increase customer loyalty, improve campaign performance, and maximize marketing ROI.",
  primaryCta: { label: "Book Free Consultation", href: "#contact" },
  secondaryCta: { label: "Talk to a Marketing Cloud Expert", href: "#contact" },
  metrics: ["500+ Salesforce Projects Delivered", "Certified Salesforce Marketing Cloud Consultants", "Global Delivery Team", "Trusted by Enterprise Businesses"],
};

const HERO_DASHBOARD = {
  title: "Journey Builder Console",
  stats: [
    { label: "Email Revenue", value: "46%", caption: "Lift from AI personalization" },
    { label: "Higher Open Rate", value: "34%", caption: "Send-time optimization" },
    { label: "Compliance Rate", value: "99.2%", caption: "Automated consent management" },
  ],
  rows: [
    { title: "Journey: Welcome Series", meta: "12,480 contacts • Live", status: "Active", tone: "good" },
    { title: "Campaign: Q3 Product Launch", meta: "Email + SMS + Social", status: "Scheduled", tone: "neutral" },
    { title: "Segment: At-Risk Renewals", meta: "AI-flagged • 812 contacts", status: "Needs Action", tone: "attention" },
    { title: "A/B Test: Subject Lines", meta: "Einstein-optimized", status: "Winner Selected", tone: "good" },
  ],
  floatingCards: [
    { icon: Ico.sparkle, title: "Einstein AI", subtitle: "Content suggestions live" },
    { icon: Ico.robot, title: "Campaign Optimization", subtitle: "Send-time automation" },
  ],
};

const CHALLENGES = {
  eyebrow: "Marketing Challenges We Solve",
  heading: "The Marketing Problems Slowing Down Your Growth",
  intro: "Most marketing teams aren't short on ideas — they're short on a platform that connects data, channels, and AI. These are the problems we hear most before a Marketing Cloud engagement.",
  illo: Images.illoMultichannelEngagement,
  items: [
    { icon: Ico.frown, title: "Low Customer Engagement", description: "Campaigns go out, but open rates and click-throughs keep declining." },
    { icon: Ico.gear, title: "Manual Campaign Management", description: "Marketers spend hours building and scheduling instead of strategizing." },
    { icon: Ico.scatter, title: "Poor Customer Segmentation", description: "Every audience gets the same message because segmentation is an afterthought." },
    { icon: Ico.mail, title: "Low Email Performance", description: "Send times, subject lines, and content aren't optimized by data." },
    { icon: Ico.plug, title: "Disconnected Marketing Channels", description: "Email, SMS, social, and ads run in silos with no shared customer view." },
    { icon: Ico.eye, title: "Lack of Customer Insights", description: "Decisions are made on gut feel because the data lives in five different tools." },
  ],
};

const SERVICES = {
  eyebrow: "Our Salesforce Marketing Cloud Services",
  heading: "End-to-End Marketing Cloud Consulting & Development",
  intro: "From first strategy session to long-term managed support, our certified consultants handle every phase of your Marketing Cloud transformation.",
  illo: Images.illoEmailAutomationWorkflow,
  items: [
    { icon: Ico.compass, title: "Marketing Cloud Consulting", description: "Strategic assessment of your channels, data, and campaign workflow before configuration begins." },
    { icon: Ico.rocket, title: "Marketing Cloud Implementation", description: "Full lifecycle deployment configured around how your marketing team actually works." },
    { icon: Ico.flow, title: "Journey Builder Setup", description: "Multi-step, cross-channel journeys triggered by real customer behavior." },
    { icon: Ico.mail, title: "Email Studio", description: "Deliverability, templates, and automation built for scale and performance." },
    { icon: Ico.phone, title: "Mobile Studio", description: "SMS and push campaigns integrated directly into your customer journeys." },
    { icon: Ico.megaphone, title: "Advertising Studio", description: "Paid social and search audiences built from your first-party CRM data." },
    { icon: Ico.sparkle, title: "Personalization Solutions", description: "1:1 content and product recommendations powered by Einstein AI." },
    { icon: Ico.gear2, title: "Marketing Automation", description: "Automation Studio workflows that eliminate manual campaign work." },
    { icon: Ico.map, title: "Customer Journey Mapping", description: "End-to-end journey design grounded in your real customer data." },
    { icon: Ico.robot, title: "AI-powered Campaign Optimization", description: "Einstein-driven send time, content, and channel optimization." },
    { icon: Ico.chartUp, title: "Analytics & Reporting", description: "Datorama dashboards that tie marketing activity to revenue." },
    { icon: Ico.gear, title: "Managed Marketing Cloud Services", description: "A dedicated team keeping your Marketing Cloud org healthy long-term." },
  ],
};

const PRODUCTS = {
  eyebrow: "Salesforce Marketing Cloud Products",
  heading: "Every Marketing Cloud Product, Configured to Perform",
  intro: "We configure each product around your campaigns and customer data — not a generic template.",
  illo: Images.illoCustomerSegmentation,
  items: [
    { title: "Journey Builder", description: "Cross-channel customer journeys triggered by real-time behavior.", illo: Images.illoCustomerJourneyBuilder },
    { title: "Email Studio", description: "Template design, automation, and deliverability at enterprise scale.", illo: Images.illoEmailAutomationWorkflow },
    { title: "Mobile Studio", description: "SMS, MMS, and push messaging inside the same customer journey." },
    { title: "Social Studio", description: "Social listening and publishing connected to your CRM data." },
    { title: "Advertising Studio", description: "First-party data activation across paid social and search." },
    { title: "Interaction Studio", description: "Real-time behavioral tracking across web and app touchpoints." },
    { title: "Intelligence (Datorama)", description: "Cross-channel marketing analytics in one unified dashboard." },
    { title: "Personalization", description: "1:1 content and product recommendations at every touchpoint.", illo: Images.illoPersonalizationEngine },
    { title: "Audience Builder", description: "Unified audience segments built from every connected data source.", illo: Images.illoCustomerSegmentation },
    { title: "Contact Builder", description: "A single customer data model shared across every studio." },
    { title: "Automation Studio", description: "Scheduled and triggered workflows that run without manual input." },
    { title: "AI & Einstein Marketing", description: "Predictive scoring, send-time optimization, and content generation.", illo: Images.illoAiCampaignRecommendations },
  ],
};

const COMPARISON = {
  eyebrow: "Why Salesforce Marketing Cloud?",
  heading: "Traditional Marketing vs. Salesforce Marketing Cloud",
  intro: "Side by side, the gap between disconnected campaign tools and a modern Marketing Cloud implementation is hard to ignore.",
  rows: [
    { label: "Customer Journeys", traditional: "Static, one-size-fits-all campaigns", marketingCloud: "Dynamic journeys triggered by real behavior" },
    { label: "Personalization", traditional: "Same message for every recipient", marketingCloud: "1:1 content powered by Einstein AI" },
    { label: "AI Recommendations", traditional: "No predictive capability", marketingCloud: "AI-driven product and content recommendations" },
    { label: "Email Automation", traditional: "Manually scheduled sends", marketingCloud: "Behavior-triggered, automated email flows" },
    { label: "Audience Segmentation", traditional: "Broad, static lists", marketingCloud: "Dynamic segments built from unified data" },
    { label: "Multi-channel Campaigns", traditional: "Separate tools per channel", marketingCloud: "Email, SMS, social, and ads in one journey" },
    { label: "Analytics", traditional: "Manual exports, days out of date", marketingCloud: "Live Datorama dashboards tied to revenue" },
    { label: "Customer Engagement", traditional: "Reactive, campaign-by-campaign", marketingCloud: "Continuous, journey-driven engagement" },
    { label: "Marketing ROI", traditional: "Difficult to attribute", marketingCloud: "Tracked end-to-end from touch to revenue" },
  ],
};

const AI_MARKETING = {
  eyebrow: "AI-Powered Marketing Automation",
  heading: "How AI Makes Every Campaign Smarter",
  intro: "AI in Marketing Cloud isn't a bolt-on feature — configured correctly, it becomes the layer that decides what to send, when, and to whom.",
  illo: Images.illoAiCampaignRecommendations,
  items: [
    { icon: Ico.clock, title: "Einstein Send Time Optimization", description: "Every email sends at the moment each individual recipient is most likely to engage." },
    { icon: Ico.tag, title: "AI Product Recommendations", description: "Recommendations generated from real purchase and browsing behavior." },
    { icon: Ico.map, title: "Predictive Customer Journeys", description: "Journeys adapt in real time based on predicted next best action." },
    { icon: Ico.mail, title: "AI Email Personalization", description: "Subject lines and content tailored automatically to each segment." },
    { icon: Ico.eye, title: "Customer Intent Analysis", description: "Behavioral signals surface buying intent before a lead ever converts." },
    { icon: Ico.target, title: "Lead Scoring", description: "Leads ranked automatically so sales follows up on the right accounts first." },
    { icon: Ico.sparkle, title: "AI Content Suggestions", description: "Einstein GPT drafts on-brand copy variations in seconds." },
    { icon: Ico.chartUp, title: "Marketing Performance Insights", description: "AI surfaces which campaigns are actually driving revenue." },
  ],
};

const INDUSTRIES = {
  eyebrow: "Industry Solutions",
  heading: "Marketing Cloud Expertise Across Every Vertical",
  intro: "Customer engagement looks different by industry — we bring vertical context to every Marketing Cloud engagement.",
  items: [
    { icon: Images.iconIndustryHealthcare, title: "Healthcare" },
    { icon: Images.iconIndustryEcommerce, title: "Retail" },
    { icon: Images.iconIndustryManufacturing, title: "Manufacturing" },
    { icon: Images.iconIndustryFinancialServices, title: "Financial Services" },
    { icon: Images.iconIndustryEducation, title: "Education" },
    { icon: Images.iconIndustryHitech, title: "High-Tech" },
    { icon: Images.iconIndustryConsumerGoods, title: "Consumer Goods" },
    { icon: Images.iconIndustryNonprofits, title: "Non-Profit" },
  ],
};

const PROCESS = {
  eyebrow: "Marketing Cloud Implementation Process",
  heading: "A Structured Path From Discovery to Go-Live",
  intro: "No surprises, no scope creep. Our Marketing Cloud delivery framework has been refined across hundreds of implementations.",
  illo: Images.illoMarketingAnalyticsDashboard,
  steps: [
    { name: "Discovery Workshop", description: "We map your current campaigns, channels, and customer data." },
    { name: "Marketing Assessment", description: "A structured audit of segmentation, automation, and reporting gaps." },
    { name: "Solution Architecture", description: "Data model, journey, and integration architecture, fully documented." },
    { name: "Platform Configuration", description: "Core Marketing Cloud setup across every studio you need." },
    { name: "Data Integration", description: "Connecting Marketing Cloud to CRM, CDP, and analytics platforms." },
    { name: "Journey Builder Setup", description: "Cross-channel journeys built around real customer behavior." },
    { name: "Campaign Automation", description: "Automation Studio workflows that remove manual campaign work." },
    { name: "Testing & QA", description: "Rendering, deliverability, and journey QA before go-live." },
    { name: "User Training", description: "Role-based training so marketers are productive on day one." },
    { name: "Go-Live & Optimization", description: "Structured launch with ongoing optimization after go-live." },
  ],
};

const INTEGRATION_ECOSYSTEM = {
  eyebrow: "Integration Ecosystem",
  heading: "Marketing Cloud, Connected to Your Full Stack",
  items: ["Salesforce CRM", "Sales Cloud", "Service Cloud", "Data Cloud", "MuleSoft", "Slack", "Tableau", "Google Analytics", "Meta Ads", "LinkedIn", "Snowflake", "AWS"],
};

const WHY_MIRKETA = {
  eyebrow: "Why Choose Mirketa",
  heading: "A Marketing Cloud Partner That Delivers Outcomes",
  intro: "Hundreds of partners can configure Marketing Cloud. Fewer can tie every decision back to a measurable marketing outcome.",
  items: [
    { icon: Ico.award, title: "Salesforce Summit Partner", description: "Our highest-tier Salesforce partnership, backed by a verified delivery track record." },
    { icon: Ico.compass, title: "Certified Marketing Cloud Consultants", description: "Every consultant holds active Marketing Cloud and Einstein certifications." },
    { icon: Ico.globe, title: "Enterprise Marketing Expertise", description: "Deep experience delivering Marketing Cloud for complex, multi-brand organizations." },
    { icon: Ico.sparkle, title: "AI-first Marketing Solutions", description: "Einstein AI is part of the architecture, not an afterthought." },
    { icon: Ico.bolt, title: "Agile Delivery", description: "Two-week sprints with regular demos keep every engagement on schedule." },
    { icon: Ico.globe, title: "Global Support", description: "A delivery model built to support distributed, multi-region marketing teams." },
    { icon: Ico.document, title: "Proven Implementation Framework", description: "A structured methodology refined across hundreds of Salesforce projects." },
    { icon: Ico.handshake, title: "Long-term Managed Services", description: "98% client retention because our work continues past go-live." },
  ],
};

const CASE_STUDIES = {
  eyebrow: "Case Studies",
  heading: "Real Marketing Cloud Outcomes From Real Deployments",
  intro: "Anonymized results from recent Marketing Cloud engagements across industries.",
  cases: [
    {
      title: "Retail Brand Increases Email Revenue by 46%",
      industry: "Retail",
      challenge: "Campaigns were sent to the full list with no segmentation, and email revenue had plateaued.",
      solution: "We implemented Journey Builder with Einstein send-time optimization and behavior-based segmentation.",
      results: "Every campaign now targets the right audience at the moment they're most likely to buy.",
      metrics: [{ value: "46%", label: "Email Revenue" }, { value: "34%", label: "Higher Open Rate" }, { value: "2.4×", label: "Click-Through Rate" }],
    },
    {
      title: "Financial Services Firm Cuts Campaign Build Time by 60%",
      industry: "Financial Services",
      challenge: "Marketing built every campaign manually across four disconnected tools, delaying every launch.",
      solution: "We consolidated campaign creation into Automation Studio with reusable, compliant templates.",
      results: "Marketers now launch multi-channel campaigns in days instead of weeks.",
      metrics: [{ value: "60%", label: "Faster Build Time" }, { value: "4→1", label: "Tools Consolidated" }, { value: "99.2%", label: "Compliance Rate" }],
    },
    {
      title: "Consumer Goods Company Lifts Marketing ROI by 3.1×",
      industry: "Consumer Goods",
      challenge: "Leadership couldn't tie marketing spend to actual revenue across channels.",
      solution: "We deployed Datorama dashboards connected to Marketing Cloud, CRM, and ad platform data.",
      results: "Leadership now sees a single, trusted ROI number across every campaign and channel.",
      metrics: [{ value: "3.1×", label: "Marketing ROI" }, { value: "41%", label: "Better Attribution" }, { value: "28%", label: "Ad Spend Saved" }],
    },
  ],
};

const TESTIMONIALS = [
  { quote: "Journey Builder alone changed how our team thinks about campaigns. We went from blasting the full list to genuinely personalized journeys, and the revenue lift was immediate.", name: "Elena Vargas", role: "VP of Marketing, a national retail brand" },
  { quote: "Mirketa didn't just implement Marketing Cloud — they rebuilt our segmentation strategy from the ground up. Our email performance metrics improved within the first send cycle.", name: "Thomas Reid", role: "Director of Digital Marketing" },
  { quote: "The Datorama dashboards gave our CMO a single source of truth for marketing ROI for the first time. That visibility alone justified the investment.", name: "Priya Nandakumar", role: "Head of Marketing Operations" },
  { quote: "What stood out was how much Mirketa understood marketing, not just Salesforce. Every recommendation was tied to a campaign outcome, not just a feature.", name: "Jonas Berg", role: "CMO, consumer goods company" },
];

const FAQS = [
  { q: "What does Salesforce Marketing Cloud consulting include?", a: "Our Marketing Cloud consulting starts with a discovery workshop that maps your existing channels, data sources, and campaign workflow. From there we deliver a prioritized roadmap covering implementation, Journey Builder, personalization, and integration — each recommendation tied to a measurable marketing outcome." },
  { q: "How long does a Salesforce Marketing Cloud implementation take?", a: "A focused Marketing Cloud implementation for a single team typically takes 8–12 weeks. Multi-studio deployments with complex data integration and journey design can take 4–6 months. We provide a detailed timeline during discovery, before implementation begins." },
  { q: "What Salesforce Marketing Cloud development services do you offer?", a: "We provide custom AMPscript and SSJS development, API integrations, and custom data extensions for marketing workflows that go beyond standard configuration — all built to Salesforce best-practice and security standards." },
  { q: "Are you a certified Salesforce Marketing Cloud partner?", a: "Yes. Mirketa is a Salesforce Summit Partner with consultants holding active Marketing Cloud, Einstein, and Platform certifications, backed by a track record across hundreds of Salesforce engagements." },
  { q: "What is Salesforce Journey Builder and how do you configure it?", a: "Journey Builder is Marketing Cloud's tool for designing multi-step, cross-channel customer journeys triggered by real behavior. We design journeys around your actual customer lifecycle — not a generic template — so every touchpoint is timed and personalized." },
  { q: "What can Salesforce Email Studio do for our campaigns?", a: "Email Studio handles template design, list management, automation, and deliverability at enterprise scale. We configure sender authentication, deliverability monitoring, and AMPscript personalization so every send performs at its full potential." },
  { q: "Do you offer Salesforce marketing automation services?", a: "Yes. We build Automation Studio workflows and Journey Builder automation that eliminate manual campaign work — from data imports and segmentation to multi-channel sends and follow-up triggers." },
  { q: "How does Salesforce personalization actually work?", a: "Salesforce personalization uses Einstein AI and your unified customer data to tailor content, product recommendations, and send timing to each individual — configured against your own CRM and behavioral data, not a generic model." },
  { q: "What Salesforce AI marketing capabilities are available?", a: "Marketing Cloud includes Einstein Send Time Optimization, AI product recommendations, predictive journey branching, and lead scoring — all trained on your own customer and campaign data rather than a one-size-fits-all model." },
  { q: "How does enterprise marketing automation scale across regions?", a: "We architect shared data models and reusable journey templates so distributed marketing teams can launch consistent campaigns while still customizing for regional audiences, languages, and compliance requirements." },
  { q: "How much does Salesforce Marketing Cloud consulting cost?", a: "Pricing depends on scope, studio count, and integration complexity. Most implementations range from $25,000 to $130,000. We provide a detailed, fixed-scope proposal after a free discovery consultation — no hidden fees." },
  { q: "Is customer data secure inside Salesforce Marketing Cloud?", a: "Marketing Cloud runs on Salesforce's enterprise-grade infrastructure with role-based access and audit trails. We layer on data governance, consent management, and permission design aligned to your compliance requirements, including GDPR and CCPA considerations." },
];

const FINAL_CTA = {
  heading: "Ready to Transform Your Marketing with Salesforce Marketing Cloud?",
  description: "Partner with Mirketa's Salesforce experts to build intelligent, AI-powered marketing experiences that increase customer engagement, improve campaign performance, and accelerate business growth.",
  primaryCta: { label: "Book Free Consultation", href: "#contact" },
  secondaryCta: { label: "Talk to Our Experts", href: "#contact" },
};

const SEO = {
  title: "Salesforce Marketing Cloud Consulting & Development Services | Mirketa",
  description:
    "Mirketa's certified Salesforce consultants deliver Marketing Cloud implementation, Journey Builder, Email Studio, AI-powered personalization, and campaign automation that maximizes marketing ROI.",
  canonical: "https://mirketa.us/salesforce-marketing-cloud-consulting-development/",
  keywords: [
    "Salesforce Marketing Cloud Consulting",
    "Salesforce Marketing Cloud Implementation",
    "Salesforce Marketing Cloud Development",
    "Salesforce Marketing Cloud Partner",
    "Salesforce Journey Builder",
    "Salesforce Email Studio",
    "Salesforce Marketing Automation",
    "Salesforce Personalization",
    "Salesforce CRM Marketing",
    "AI-powered Marketing Automation",
    "Enterprise Marketing Solutions",
    "Salesforce Digital Marketing",
    "Customer Journey Management",
  ],
  schema: [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "Salesforce Marketing Cloud Consulting and Development Services",
      provider: { "@type": "Organization", name: "Mirketa Inc.", url: "https://mirketa.us" },
      name: "Salesforce Marketing Cloud Consulting & Development",
      description:
        "End-to-end Salesforce Marketing Cloud consulting, implementation, Journey Builder, Email Studio, AI-powered personalization, campaign automation, and managed services.",
      areaServed: "Global",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://mirketa.us/" },
        { "@type": "ListItem", position: 2, name: "Platforms & Technology", item: "https://mirketa.us/platforms/salesforce/clouds" },
        { "@type": "ListItem", position: 3, name: "Salesforce Clouds", item: "https://mirketa.us/platforms/salesforce/clouds" },
        { "@type": "ListItem", position: 4, name: "Marketing Cloud", item: "https://mirketa.us/salesforce-marketing-cloud-consulting-development/" },
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

export default function MarketingCloud() {
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
    const ctx = gsap.context(() => {
      if (heroTextRef.current) {
        gsap.from(heroTextRef.current.children, {
          opacity: 0,
          y: 28,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
        });
      }

      gsap.utils.toArray(".mkc-reveal").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 32,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      gsap.utils.toArray(".mkc-reveal-stagger").forEach((el) => {
        gsap.from(el.children, {
          opacity: 0,
          y: 26,
          duration: 0.6,
          stagger: 0.06,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      gsap.utils.toArray(".mkc-zoom-in").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          scale: 0.94,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="salesforce-marketing-cloud">
      <Seo {...SEO} />
      <HeroSection heroTextRef={heroTextRef} heroRef={heroRef} />
      <TrustedBySection />
      <ChallengesSection />
      <ServicesSection />
      <ProductsSection />
      <ComparisonSection />
      <AiMarketingSection />
      <IndustriesSection />
      <ProcessSection />
      <IntegrationEcosystemSection />
      <WhyMirketaSection />
      <CaseStudiesSection />
      <TestimonialsSection />
      <FaqSection />
      <FinalCtaSection />
      <ConsultationSection
        eyebrow="Get Started"
        heading="Talk to a Marketing Cloud Expert"
        description="Tell us about your campaigns and customer journey goals — a Marketing Cloud expert will follow up within one business day."
        formTitle="Talk to a Marketing Cloud Expert"
      />
      <StickyCta visible={showStickyCta} />
    </div>
  );
}

// ============================================================
// STICKY CTA — desktop only, appears once the hero scrolls out of view
// ============================================================

function StickyCta({ visible }) {
  return (
    <div className={`mkc-sticky-cta ${visible ? "is-visible" : ""}`} aria-hidden={!visible}>
      <a href="#contact" className="btn btn-primary mkc-btn" tabIndex={visible ? 0 : -1}>
        Book Free Consultation <span aria-hidden="true">→</span>
      </a>
    </div>
  );
}

// ============================================================
// HERO
// ============================================================

function HeroSection({ heroTextRef, heroRef }) {
  return (
    <section ref={heroRef} className="mkc-hero" style={{ backgroundImage: `url("${Images.heroSalesforceMarketingCloud}")` }} aria-label="Salesforce Marketing Cloud Consulting by Mirketa">
      <div className="mkc-hero__scrim" />
      <div className="container">
        <Breadcrumb items={BREADCRUMB} className="mkc-breadcrumb" />
        <div className="mkc-hero__inner">
          <div ref={heroTextRef} className="mkc-hero__text">
            <span className="mkc-badge">
              <span className="mkc-badge__spark" aria-hidden="true">✦</span> {HERO.badge}
            </span>
            <h1>{HERO.title}</h1>
            <p className="mkc-hero__description">{HERO.description}</p>
            <div className="mkc-hero__ctas">
              <a href={HERO.primaryCta.href} className="btn btn-primary mkc-btn">
                {HERO.primaryCta.label} <span aria-hidden="true">→</span>
              </a>
              <a href={HERO.secondaryCta.href} className="btn btn-secondary mkc-btn">
                {HERO.secondaryCta.label}
              </a>
            </div>
            <ul className="mkc-hero__metrics">
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
            className="mkc-hero__visual"
          />
        </div>
      </div>
    </section>
  );
}

// ============================================================
// TRUSTED BY
// ============================================================

function TrustedBySection() {
  const badges = [
    { icon: Images.clientSalesforce, label: "Salesforce Partner" },
    { icon: Images.clientSoc2, label: "SOC 2 Certified" },
    { icon: Images.clientHipaa, label: "HIPAA Ready" },
    { icon: Images.clientEnterprise, label: "Enterprise Ready" },
    { icon: Images.clientExperience, label: "15+ Years Experience" },
  ];
  const loop = [...badges, ...badges];

  return (
    <section className="mkc-trusted" aria-label="Trusted by global enterprises">
      <div className="container mkc-trusted__inner">
        <p className="mkc-trusted__label">Trusted By</p>
        <div className="mkc-trusted__track" role="list">
          <div className="mkc-trusted__marquee">
            {loop.map((b, i) => (
              <div className="mkc-trusted__badge" role="listitem" key={`${b.label}-${i}`}>
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
// MARKETING CHALLENGES WE SOLVE
// ============================================================

function ChallengesSection() {
  return (
    <section className="section mkc-challenges" aria-labelledby="mkc-challenges-heading">
      <div className="container">
        <div className="mkc-challenges__head mkc-reveal">
          <div className="section-heading">
            <p className="mkc-eyebrow">{CHALLENGES.eyebrow}</p>
            <h2 id="mkc-challenges-heading">{CHALLENGES.heading}</h2>
            <p>{CHALLENGES.intro}</p>
          </div>
          <img src={CHALLENGES.illo} alt="" aria-hidden="true" className="mkc-challenges__illo" loading="lazy" />
        </div>
        <div className="mkc-challenges__grid mkc-reveal-stagger">
          {CHALLENGES.items.map((c) => (
            <div className="mkc-challenge-card" key={c.title}>
              <span className="mkc-challenge-card__icon">{c.icon}</span>
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
// OUR SALESFORCE MARKETING CLOUD SERVICES
// ============================================================

function ServicesSection() {
  return (
    <section className="section mkc-services" id="services" aria-labelledby="mkc-services-heading">
      <div className="container">
        <div className="mkc-services__head mkc-reveal">
          <div className="section-heading">
            <p className="mkc-eyebrow">{SERVICES.eyebrow}</p>
            <h2 id="mkc-services-heading">{SERVICES.heading}</h2>
            <p>{SERVICES.intro}</p>
          </div>
          <img src={SERVICES.illo} alt="" aria-hidden="true" className="mkc-services__illo" loading="lazy" />
        </div>
        <div className="mkc-services__grid mkc-reveal-stagger">
          {SERVICES.items.map((s) => (
            <div className="mkc-service-card" key={s.title}>
              <span className="mkc-service-card__icon">{s.icon}</span>
              <h3>{s.title}</h3>
              <p>{s.description}</p>
              <a href="#contact" className="mkc-service-card__link">
                Learn More <span aria-hidden="true">→</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// SALESFORCE MARKETING CLOUD PRODUCTS
// ============================================================

function ProductsSection() {
  return (
    <section className="section mkc-products" id="products" aria-labelledby="mkc-products-heading">
      <div className="container">
        <div className="mkc-products__head mkc-reveal">
          <img src={PRODUCTS.illo} alt="" aria-hidden="true" className="mkc-products__illo" loading="lazy" />
          <div className="section-heading">
            <p className="mkc-eyebrow">{PRODUCTS.eyebrow}</p>
            <h2 id="mkc-products-heading">{PRODUCTS.heading}</h2>
            <p>{PRODUCTS.intro}</p>
          </div>
        </div>
        <div className="mkc-products__grid mkc-reveal-stagger">
          {PRODUCTS.items.map((p) => (
            <div className={`mkc-product-card ${p.illo ? "mkc-product-card--illo" : ""}`} key={p.title}>
              {p.illo ? (
                <img src={p.illo} alt="" aria-hidden="true" className="mkc-product-card__illo" loading="lazy" />
              ) : (
                <span className="mkc-product-card__check" aria-hidden="true">{Ico.check}</span>
              )}
              <h3>{p.title}</h3>
              <p>{p.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// WHY SALESFORCE MARKETING CLOUD — comparison
// ============================================================

function ComparisonSection() {
  return (
    <section className="section mkc-comparison" aria-labelledby="mkc-comparison-heading">
      <div className="container">
        <div className="section-heading mkc-reveal">
          <p className="mkc-eyebrow">{COMPARISON.eyebrow}</p>
          <h2 id="mkc-comparison-heading">{COMPARISON.heading}</h2>
          <p>{COMPARISON.intro}</p>
        </div>
        <div className="mkc-comparison__table mkc-reveal-stagger">
          <div className="mkc-comparison__row mkc-comparison__row--head">
            <span></span>
            <span>Traditional Marketing</span>
            <span>Salesforce Marketing Cloud</span>
          </div>
          {COMPARISON.rows.map((r) => (
            <div className="mkc-comparison__row" key={r.label}>
              <span className="mkc-comparison__label">{r.label}</span>
              <span className="mkc-comparison__cell mkc-comparison__cell--traditional">
                <span aria-hidden="true">{Ico.cross}</span> {r.traditional}
              </span>
              <span className="mkc-comparison__cell mkc-comparison__cell--mc">
                <span aria-hidden="true">{Ico.check}</span> {r.marketingCloud}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// AI-POWERED MARKETING AUTOMATION
// ============================================================

function AiMarketingSection() {
  return (
    <section className="section mkc-ai" aria-labelledby="mkc-ai-heading">
      <div className="container">
        <div className="mkc-ai__head mkc-reveal">
          <div className="section-heading">
            <p className="mkc-eyebrow">{AI_MARKETING.eyebrow}</p>
            <h2 id="mkc-ai-heading">{AI_MARKETING.heading}</h2>
            <p>{AI_MARKETING.intro}</p>
          </div>
          <img src={AI_MARKETING.illo} alt="" aria-hidden="true" className="mkc-ai__illo" loading="lazy" />
        </div>
        <div className="mkc-ai__grid mkc-reveal-stagger">
          {AI_MARKETING.items.map((a) => (
            <div className="mkc-ai-card" key={a.title}>
              <span className="mkc-ai-card__icon">{a.icon}</span>
              <h3>{a.title}</h3>
              <p>{a.description}</p>
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

function IndustriesSection() {
  return (
    <section className="section mkc-industries" aria-labelledby="mkc-industries-heading">
      <div className="container">
        <div className="section-heading mkc-reveal">
          <p className="mkc-eyebrow">{INDUSTRIES.eyebrow}</p>
          <h2 id="mkc-industries-heading">{INDUSTRIES.heading}</h2>
          <p>{INDUSTRIES.intro}</p>
        </div>
        <div className="mkc-industries__grid mkc-reveal-stagger">
          {INDUSTRIES.items.map((i) => (
            <div className="mkc-industry-card" key={i.title}>
              <img src={i.icon} alt="" aria-hidden="true" />
              <h3>{i.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// MARKETING CLOUD IMPLEMENTATION PROCESS
// ============================================================

function ProcessSection() {
  return (
    <section className="section mkc-process" aria-labelledby="mkc-process-heading">
      <div className="container">
        <div className="mkc-process__head mkc-reveal">
          <div className="section-heading">
            <p className="mkc-eyebrow">{PROCESS.eyebrow}</p>
            <h2 id="mkc-process-heading">{PROCESS.heading}</h2>
            <p>{PROCESS.intro}</p>
          </div>
          <img src={PROCESS.illo} alt="" aria-hidden="true" className="mkc-process__illo" loading="lazy" />
        </div>
        <div className="mkc-process__rail mkc-reveal-stagger">
          {PROCESS.steps.map((p, i) => (
            <div className="mkc-step-card" key={p.name}>
              <span className="mkc-step-card__num">{String(i + 1).padStart(2, "0")}</span>
              <h3>{p.name}</h3>
              <p>{p.description}</p>
              {i < PROCESS.steps.length - 1 && <span className="mkc-step-card__arrow" aria-hidden="true">→</span>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// INTEGRATION ECOSYSTEM
// ============================================================

function IntegrationEcosystemSection() {
  return (
    <section className="section mkc-stack" aria-labelledby="mkc-stack-heading">
      <div className="container">
        <div className="section-heading mkc-reveal">
          <p className="mkc-eyebrow">{INTEGRATION_ECOSYSTEM.eyebrow}</p>
          <h2 id="mkc-stack-heading">{INTEGRATION_ECOSYSTEM.heading}</h2>
        </div>
        <ul className="mkc-stack__wall mkc-reveal-stagger">
          {INTEGRATION_ECOSYSTEM.items.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// ============================================================
// WHY CHOOSE MIRKETA
// ============================================================

function WhyMirketaSection() {
  return (
    <section className="section mkc-why" aria-labelledby="mkc-why-heading">
      <div className="container">
        <div className="section-heading mkc-reveal">
          <p className="mkc-eyebrow">{WHY_MIRKETA.eyebrow}</p>
          <h2 id="mkc-why-heading">{WHY_MIRKETA.heading}</h2>
          <p>{WHY_MIRKETA.intro}</p>
        </div>
        <div className="mkc-why__grid mkc-reveal-stagger">
          {WHY_MIRKETA.items.map((w) => (
            <div className="mkc-why-card" key={w.title}>
              <span className="mkc-why-card__icon">{w.icon}</span>
              <h3>{w.title}</h3>
              <p>{w.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// CASE STUDIES
// ============================================================

function CaseStudiesSection() {
  return (
    <section className="section mkc-cases" aria-labelledby="mkc-cases-heading">
      <div className="container">
        <div className="section-heading mkc-reveal">
          <p className="mkc-eyebrow">{CASE_STUDIES.eyebrow}</p>
          <h2 id="mkc-cases-heading">{CASE_STUDIES.heading}</h2>
          <p>{CASE_STUDIES.intro}</p>
        </div>
        <div className="mkc-cases__grid mkc-reveal-stagger">
          {CASE_STUDIES.cases.map((c) => (
            <div className="mkc-case-card" key={c.title}>
              <span className="mkc-case-card__tag">{c.industry}</span>
              <h3>{c.title}</h3>
              <dl className="mkc-case-card__fields">
                <div><dt>Business Challenge</dt><dd>{c.challenge}</dd></div>
                <div><dt>Salesforce Solution</dt><dd>{c.solution}</dd></div>
                <div><dt>Results Achieved</dt><dd>{c.results}</dd></div>
              </dl>
              <div className="mkc-case-card__metrics">
                {c.metrics.map((m) => (
                  <div key={m.label}>
                    <strong>{m.value}</strong>
                    <span>{m.label}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// TESTIMONIALS
// ============================================================

function TestimonialsSection() {
  return (
    <section className="section mkc-testimonials" aria-labelledby="mkc-testimonials-heading">
      <div className="container">
        <div className="section-heading mkc-reveal">
          <p className="mkc-eyebrow">Testimonials</p>
          <h2 id="mkc-testimonials-heading">What Our Clients Say About Their Marketing Cloud Results</h2>
        </div>
        <div className="mkc-testimonials__grid mkc-reveal-stagger">
          {TESTIMONIALS.map((t) => (
            <figure className="mkc-testimonial-card" key={t.name}>
              <img src={Images.iconQuote} alt="" aria-hidden="true" className="mkc-testimonial-card__mark" />
              <blockquote>{t.quote}</blockquote>
              <figcaption>
                <strong>{t.name}</strong>
                {t.role && <span>{t.role}</span>}
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
    <section className="section mkc-faq" aria-labelledby="mkc-faq-heading">
      <div className="container">
        <div className="section-heading mkc-reveal">
          <p className="mkc-eyebrow">FAQ</p>
          <h2 id="mkc-faq-heading">Frequently Asked Questions About Salesforce Marketing Cloud</h2>
        </div>
        <div className="mkc-faq__search-wrap mkc-reveal">
          <label htmlFor="mkc-faq-search" className="visually-hidden">
            Search frequently asked questions
          </label>
          <input
            id="mkc-faq-search"
            type="search"
            className="mkc-faq__search"
            placeholder="Ask a question — e.g. &quot;Journey Builder&quot;, &quot;pricing&quot;, &quot;AI&quot;..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpenIndex(-1);
            }}
          />
        </div>
        <div className="mkc-faq__list mkc-reveal">
          {filtered.length === 0 ? (
            <p className="mkc-faq__empty">No questions match &ldquo;{query}&rdquo;. Try a different search term.</p>
          ) : (
            filtered.map((item, i) => {
              const open = openIndex === i;
              const panelId = `mkc-faq-panel-${i}`;
              return (
                <div className={`mkc-faq-item ${open ? "is-open" : ""}`} key={item.q}>
                  <button type="button" className="mkc-faq-item__question" aria-expanded={open} aria-controls={panelId} onClick={() => setOpenIndex(open ? -1 : i)}>
                    <span>{item.q}</span>
                    <span className="mkc-faq-item__icon" aria-hidden="true">{open ? "−" : "+"}</span>
                  </button>
                  <div id={panelId} className="mkc-faq-item__answer" role="region" hidden={!open}>
                    <p>{item.a}</p>
                  </div>
                </div>
              );
            })
          )}
        </div>
        <p className="mkc-faq__links">
          Related reading: <Link to="/platforms/salesforce/development-consulting">Salesforce Development & Consulting</Link>,{" "}
          <Link to="/platforms/salesforce/clouds">Salesforce Clouds</Link>,{" "}
          <Link to="/platforms/salesforce/clouds/sales-cloud">Salesforce Sales Cloud</Link>,{" "}
          <Link to="/platforms/salesforce/clouds/service-cloud">Salesforce Service Cloud</Link>,{" "}
          <Link to="/data-cloud">Salesforce Data Cloud</Link>, <Link to="/agentforce">Agentforce</Link>,{" "}
          <Link to="/ai-consulting">AI Consulting</Link>, <Link to="/ai-enablement">AI Enablement</Link>,{" "}
          <a href="#services">Integration Services</a>, <Link to="/insights">Customer Success</Link>,{" "}
          <Link to="/blog">Blogs</Link>.
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
    <section className="mkc-final-cta mkc-reveal" aria-labelledby="mkc-final-cta-heading">
      <div className="container mkc-final-cta__inner">
        <h2 id="mkc-final-cta-heading">{FINAL_CTA.heading}</h2>
        <p>{FINAL_CTA.description}</p>
        <div className="mkc-final-cta__ctas">
          <a href={FINAL_CTA.primaryCta.href} className="btn btn-primary mkc-btn">
            {FINAL_CTA.primaryCta.label} <span aria-hidden="true">→</span>
          </a>
          <a href={FINAL_CTA.secondaryCta.href} className="btn btn-secondary mkc-btn">
            {FINAL_CTA.secondaryCta.label}
          </a>
        </div>
        <Link to="/platforms/salesforce/clouds" className="mkc-final-cta__all-services">
          Explore All Salesforce Clouds →
        </Link>
      </div>
    </section>
  );
}
