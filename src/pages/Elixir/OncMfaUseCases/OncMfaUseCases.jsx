import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Images } from "../../../assets/images/index.js";
import { ELIXIR_PAGES, INDUSTRY_PAGES, AI_PAGES } from "../../../config/pageSlugs.js";
import Seo from "../../../components/Seo/Seo.jsx";
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb.jsx";
import StickyCta from "../../../components/StickyCta/StickyCta.jsx";
import TrustedByMarquee from "../../../components/TrustedByMarquee/TrustedByMarquee.jsx";
import FaqAccordion from "../../../components/FaqAccordion/FaqAccordion.jsx";
import HeroVisual from "../../../components/HeroVisual/HeroVisual.jsx";
import ConsultationSection from "../../../components/ConsultationSection/ConsultationSection.jsx";
import RelatedServices from "../../../components/RelatedServices/RelatedServices.jsx";
import WorkflowDiagram from "../../../components/illustrations/WorkflowDiagram/WorkflowDiagram.jsx";
import SupplyChainMap from "../../../components/illustrations/SupplyChainMap/SupplyChainMap.jsx";
import "./OncMfaUseCases.css";

gsap.registerPlugin(ScrollTrigger);

// ============================================================
// SLUG / SEO CONFIGURATION — kept local to this component per
// project convention, sourced from the central pageSlugs.js entry
// so the URL itself still only needs to change in one place.
// ============================================================

export const pageSEO = {
  slug: `${ELIXIR_PAGES.ONC_MFA_USE_CASES.slug}/`,
  title: "ONC MFA Use Cases & Healthcare Security | Mirketa",
  description:
    "Explore ONC MFA use cases for healthcare organizations — multi-factor authentication workflows that secure provider and patient access inside Elixir EHR.",
};

// ============================================================
// ICONS
// ============================================================

const Ico = {
  check: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12.5l5 5L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  key: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="8" cy="15" r="4" stroke="currentColor" strokeWidth="1.4" /><path d="M11.5 12L20 3.5M20 3.5V8M20 3.5h-4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  lock: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="5" y="11" width="14" height="9" rx="2" stroke="currentColor" strokeWidth="1.4" /><path d="M8 11V8a4 4 0 018 0v3" stroke="currentColor" strokeWidth="1.4" /></svg>
  ),
  fingerprint: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3a9 9 0 00-9 9M12 3a9 9 0 019 9M6 12a6 6 0 0112 0v3a3 3 0 01-3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /><path d="M9 12v3a3 3 0 003 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
  ),
  mobile: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="7" y="2.5" width="10" height="19" rx="2" stroke="currentColor" strokeWidth="1.4" /><path d="M11 18h2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
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
  compass: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" /><path d="M15 9l-2 6-6 2 2-6 6-2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  brain: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 4a3 3 0 00-3 3v1a3 3 0 000 6v1a3 3 0 003 3M15 4a3 3 0 013 3v1a3 3 0 010 6v1a3 3 0 01-3 3M9 4v16M15 4v16" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
  ),
  db: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><ellipse cx="12" cy="6" rx="7" ry="3" stroke="currentColor" strokeWidth="1.4" /><path d="M5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6" stroke="currentColor" strokeWidth="1.4" /><path d="M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3" stroke="currentColor" strokeWidth="1.4" /></svg>
  ),
  cloud: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 18h10a4 4 0 000-8 5.5 5.5 0 00-10.7-1.7A4.5 4.5 0 007 18z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  bolt: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M13 3L5 14h6l-1 7 8-11h-6l1-7z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  route: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="6" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.4" /><circle cx="18" cy="18" r="2.5" stroke="currentColor" strokeWidth="1.4" /><path d="M6 8.5V13a4 4 0 004 4h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
  ),
  alert: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3l10 18H2L12 3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M12 10v4M12 17h.01" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
  ),
  building: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="5" y="3" width="14" height="18" rx="1.4" stroke="currentColor" strokeWidth="1.4" /><path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
  ),
};

// ============================================================
// DATA
// ============================================================

const BREADCRUMB_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Elixir (EHR)", href: "/" },
  { label: ELIXIR_PAGES.ONC_MFA_USE_CASES.label },
];

const HERO = {
  badge: "Elixir EHR Security Capability",
  title: "ONC MFA Use Cases for Secure Healthcare Access",
  description:
    "Mirketa helps healthcare organizations configure multi-factor authentication inside the Elixir EHR platform around the real ways providers and patients log in — shared clinic workstations, remote provider access, patient portals, and third-party application access — so every login path is protected without slowing down clinical work.",
  primaryCta: { label: "Get an MFA Implementation Assessment", href: "#contact" },
  secondaryCta: { label: "Talk to a Healthcare Security Advisor", href: "#contact" },
  metrics: ["Multi-Factor Authentication on Every Login Path", "ONC-Aligned Access Control Design", "Provider, Staff & Patient Portal Coverage", "Configurable to Your Identity Provider"],
};

const HERO_DASHBOARD = {
  title: "Elixir Access Security Console",
  stats: [
    { label: "MFA COVERAGE", value: "All Logins", caption: "Providers, staff & patients" },
    { label: "SESSION VISIBILITY", value: "Continuous", caption: "Every authentication logged" },
    { label: "ACCESS DESIGN", value: "ONC-Aligned", caption: "Identity & access controls" },
  ],
  rows: [
    { title: "Provider login — second factor requested", meta: "Push notification · Approved", tone: "good", status: "Complete" },
    { title: "Patient portal access", meta: "One-time code sent via SMS", tone: "good", status: "Complete" },
    { title: "Shared workstation session", meta: "Re-authentication required after timeout", tone: "neutral", status: "In Progress" },
  ],
  floatingCards: [
    { icon: Ico.shield, title: "MFA Enforced", subtitle: "At every access point" },
    { icon: Ico.fingerprint, title: "Identity Verified", subtitle: "Before chart access is granted" },
  ],
};

const CHALLENGES = {
  eyebrow: "Key Challenges",
  heading: "Why Healthcare Login Security Is Harder Than It Looks",
  intro:
    "Healthcare access security rarely fails because nobody thought about it. It fails because clinical environments have login patterns — shared devices, remote access, third-party apps — that a generic authentication setup doesn't account for.",
  items: [
    { title: "Shared Clinic Workstations", description: "A single terminal used by multiple providers across a shift makes simple password-only access a real exposure point for patient data." },
    { title: "Remote and Multi-Location Provider Access", description: "Providers logging in from home, a second facility, or a mobile device need the same identity assurance as an on-site workstation." },
    { title: "Patient Portal Accounts as a Target", description: "Patient-facing logins are a common target for credential-stuffing attacks, and a compromised patient account exposes protected health information." },
    { title: "Inconsistent Enforcement Across Modules", description: "Some EHR modules enforce strong authentication while others quietly allow password-only access, creating gaps that are easy to miss until an audit finds them." },
  ],
};

const SOLUTION = {
  eyebrow: "Solution & Capabilities",
  heading: "Multi-Factor Authentication Configured Around How Your Teams Actually Log In",
  paragraphs: [
    "Mirketa configures Elixir's multi-factor authentication capability around the specific login patterns your organization actually has — not a generic, one-size-fits-all policy applied on top of the platform after the fact.",
    "That means shared clinic workstations, remote provider access, and patient portal logins each get an authentication approach appropriate to how they're actually used, instead of a single blanket rule that either under-protects sensitive access or adds unnecessary friction to routine clinical work.",
    "Because ONC's health IT certification criteria call out multi-factor authentication as an expectation for accessing certified health IT modules, we treat MFA configuration as a foundational part of any Elixir implementation — designed alongside your identity provider and access policies from day one, not bolted on afterward.",
  ],
};

const SERVICES = {
  eyebrow: "Key Features",
  heading: "What Mirketa Configures Inside Elixir's MFA Capability",
  intro: "Every ONC MFA engagement starts with one or more of these configuration areas, scoped to your organization's identity setup and clinical workflows.",
  items: [
    { icon: Ico.mobile, title: "Push & One-Time Passcode Authentication", description: "Second-factor verification delivered through an authenticator app, push notification, or SMS-based one-time code." },
    { icon: Ico.route, title: "Role-Based Authentication Policy", description: "Different authentication requirements for providers, administrative staff, and patients, matched to what each role can access." },
    { icon: Ico.key, title: "Single Sign-On & Identity Provider Integration", description: "Elixir MFA policy connected to the identity provider your organization already uses, instead of a separate credential store." },
    { icon: Ico.clock, title: "Session Timeout & Re-Authentication Rules", description: "Shared workstation and idle-session policies configured so re-authentication happens at the right moments, not at random." },
    { icon: Ico.shield, title: "Break-Glass Emergency Access", description: "A documented, audited emergency access path for urgent care situations that still requires identity verification." },
    { icon: Ico.db, title: "Authentication Audit Logging", description: "Every authentication event captured in a structured log your compliance and security teams can actually review." },
  ],
};

const TECHNICAL = {
  eyebrow: "Technical & Integration Information",
  heading: "How ONC MFA Configuration Fits Your Existing Identity Stack",
  intro: "Elixir's MFA capability is designed to sit alongside the identity and access infrastructure your organization already runs, not replace it.",
  items: [
    { title: "SAML & OIDC Federation", description: "Elixir authenticates against your existing identity provider using standard SAML 2.0 or OpenID Connect federation." },
    { title: "Directory Service Integration", description: "User provisioning and role assignment connected to Active Directory or another LDAP-based directory service." },
    { title: "Authenticator App & Push Support", description: "Compatible with standard TOTP authenticator apps and push-based approval flows for second-factor verification." },
    { title: "Structured Authentication Event Logs", description: "Login and authentication events exposed in a structured format for your security information and event management tooling." },
  ],
};

const AI_AUTOMATION = {
  eyebrow: "Adaptive & Risk-Based Authentication",
  heading: "Authentication That Responds to Risk, Not Just a Fixed Rule",
  intro: "Once the identity foundation is in place, Mirketa can extend Elixir's MFA configuration with risk-aware authentication logic.",
  items: [
    { title: "Unusual Login Location Detection", description: "A login attempt from an unexpected location or network can trigger an additional verification step automatically." },
    { title: "New Device Recognition", description: "First-time devices are flagged for extra verification, while previously trusted devices follow the standard authentication flow." },
    { title: "Failed Attempt Pattern Monitoring", description: "Repeated failed login attempts against a single account are surfaced to security teams instead of failing silently." },
    { title: "Automated De-Provisioning Alerts", description: "Access for departed staff or expired accounts is flagged for review as part of the authentication workflow, not a separate manual process." },
  ],
};

const BENEFITS = {
  eyebrow: "Benefits",
  heading: "What Changes Once MFA Is Configured Around Real Login Patterns",
  intro: "These are the practical outcomes healthcare organizations look for when they configure MFA correctly the first time, rather than retrofitting it after an audit finding.",
  items: [
    { title: "Fewer Password-Only Access Points", description: "Every meaningful access path — provider, staff, and patient — is covered by a second authentication factor appropriate to its risk." },
    { title: "Less Friction for Routine Clinical Work", description: "Authentication policy matched to actual usage patterns means providers aren't re-verifying more often than the workflow requires." },
    { title: "An Audit Trail That Holds Up", description: "Structured authentication logs give your compliance team evidence of access controls instead of a reconstruction exercise." },
    { title: "A Clearer Path to Meeting ONC Expectations", description: "MFA configuration aligned with ONC's certification criteria from the start, rather than a gap discovered during a review." },
  ],
};

const USE_CASES = {
  eyebrow: "Use Cases",
  heading: "Where ONC MFA Configuration Applies Inside Elixir",
  intro: "Every login path below carries its own risk profile — the right MFA configuration reflects that instead of treating them identically.",
  items: [
    { icon: Ico.building, title: "Shared Clinic Workstations" },
    { icon: Ico.mobile, title: "Remote & Telehealth Provider Access" },
    { icon: Ico.users, title: "Patient Portal Login" },
    { icon: Ico.route, title: "Third-Party & API-Connected Applications" },
    { icon: Ico.alert, title: "Emergency Break-Glass Access" },
    { icon: Ico.shield, title: "Administrative & Billing Staff Access" },
  ],
};

const SCENARIOS = {
  eyebrow: "Implementation Scenarios",
  heading: "How This Plays Out in a Real Healthcare Environment",
  intro: "Illustrative scenarios based on common healthcare access patterns — not a specific client engagement.",
  cases: [
    {
      title: "A Multi-Site Clinic Standardizes Provider Login Security",
      tag: "Ambulatory Care",
      challenge: "Providers moving between locations had inconsistent authentication requirements depending on which workstation or device they used.",
      approach: "Mirketa configured a uniform MFA policy tied to the provider's identity rather than the device, applied consistently across every location.",
      result: "Providers get the same authentication experience everywhere, and access policy is defined once instead of per location.",
    },
    {
      title: "A Health System Extends MFA to the Patient Portal",
      tag: "Hospitals & Health Systems",
      challenge: "The patient portal allowed password-only login while every internal system already required a second factor, leaving a clear gap.",
      approach: "Mirketa configured SMS and authenticator-app second-factor options for patient portal accounts, with a fallback verification path for patients without a smartphone.",
      result: "Patient accounts now carry the same baseline authentication expectation as internal systems, closing a previously overlooked gap.",
    },
  ],
};

const WHY_MIRKETA = {
  eyebrow: "Why Mirketa",
  heading: "Implementation Support That Understands Clinical Workflow, Not Just Security Policy",
  intro: "Plenty of partners can turn on a multi-factor authentication setting. Fewer understand why a nurse's station terminal needs a different policy than a physician's laptop.",
  items: [
    { icon: Ico.award, title: "Elixir Platform Depth", description: "Configuration experience specific to Elixir's access control and authentication capabilities, not a generic security add-on." },
    { icon: Ico.compass, title: "Clinical Workflow Awareness", description: "Authentication policy designed around how care teams actually move through their day, not just a checklist of settings." },
    { icon: Ico.clock, title: "Structured, Scoped Delivery", description: "A defined implementation timeline that respects the change-management process your organization already requires." },
    { icon: Ico.shield, title: "Access Control Design First", description: "MFA is configured as part of a broader access control approach, not a single setting toggled in isolation." },
    { icon: Ico.users, title: "Dedicated Delivery Team", description: "The consultants who scope your engagement support it through go-live and beyond." },
    { icon: Ico.compass, title: "Support Beyond Go-Live", description: "Ongoing configuration support available as your identity provider or access policies change." },
  ],
};

const TECHNOLOGIES = {
  eyebrow: "Technology Stack",
  heading: "The Identity & Access Technologies This Work Typically Touches",
  intro: "Selected based on the identity infrastructure your organization already has, not a default recommendation.",
  items: [
    { icon: Ico.key, title: "SAML 2.0 / OpenID Connect" },
    { icon: Ico.db, title: "Active Directory / LDAP" },
    { icon: Ico.mobile, title: "TOTP Authenticator Apps" },
    { icon: Ico.bolt, title: "Push-Based Approval Services" },
    { icon: Ico.cloud, title: "Elixir EHR Platform" },
    { icon: Ico.brain, title: "Risk-Based Authentication Logic" },
  ],
};

const PROCESS = {
  eyebrow: "Implementation Process",
  heading: "A Five-Stage Path From Access Review to Monitored MFA",
  intro: "A structured methodology for configuring MFA inside Elixir without disrupting clinical operations mid-rollout.",
  steps: [
    { label: "Access Review" },
    { label: "Policy Design" },
    { label: "Configuration" },
    { label: "Validation" },
    { label: "Launch & Monitor" },
  ],
  detail: [
    { name: "Access Review", description: "Current login paths, identity provider, and access patterns mapped across providers, staff, and patient portal accounts." },
    { name: "Policy Design", description: "Authentication requirements defined per role and access path, aligned with ONC expectations and your internal policy." },
    { name: "Configuration", description: "MFA settings, identity federation, and directory integration configured inside Elixir." },
    { name: "Validation", description: "Structured testing across real login scenarios — shared workstations, remote access, patient portal — before rollout." },
    { name: "Launch & Monitor", description: "Supported rollout followed by ongoing monitoring of authentication logs and access policy effectiveness." },
  ],
};

const FAQS = [
  { q: "What are ONC MFA use cases?", a: "ONC MFA use cases describe the specific login scenarios — provider access, patient portal login, shared workstations, remote access, and third-party application access — where multi-factor authentication needs to be configured to meet ONC's health IT certification expectations." },
  { q: "Does ONC require multi-factor authentication?", a: "ONC's health IT certification criteria include a multi-factor authentication requirement for accessing certain certified health IT modules. Mirketa configures Elixir's MFA capability with that expectation in mind as part of implementation." },
  { q: "Can MFA be configured differently for providers versus patients?", a: "Yes. Providers, administrative staff, and patients typically have different authentication needs, and Mirketa configures role-based policies rather than a single blanket rule." },
  { q: "What happens with shared clinic workstations?", a: "Shared workstations are one of the most common access risks in healthcare. We configure session timeout and re-authentication rules specific to shared-device environments." },
  { q: "Does this integrate with our existing identity provider?", a: "Yes. Elixir's MFA configuration federates with your existing identity provider using SAML 2.0 or OpenID Connect, and can integrate with Active Directory or another LDAP-based directory." },
  { q: "What about emergency access situations?", a: "We configure a documented break-glass access path for urgent care situations that still requires identity verification and is fully captured in the authentication audit log." },
  { q: "Is patient portal login covered by MFA configuration?", a: "Yes. Patient portal accounts are a common target for credential-based attacks, and we typically configure SMS or authenticator-app second-factor options with a fallback path for patients without a smartphone." },
  { q: "Do you provide support after MFA is configured?", a: "Yes. Ongoing configuration support is available as your identity provider, staff roles, or access policies change over time." },
];

const RELATED_SERVICES = {
  eyebrow: "Related Reading",
  heading: "Explore More of the Elixir (EHR) Platform",
  intro: "ONC MFA configuration is one part of a broader Elixir implementation. Here's where to look next.",
  items: [
    { slug: ELIXIR_PAGES.API_DEVELOPER_PORTAL.slug, label: ELIXIR_PAGES.API_DEVELOPER_PORTAL.label, description: "See how API access into Elixir is secured for third-party and integrated applications." },
    { slug: ELIXIR_PAGES.CERTIFIED_MODULE.slug, label: ELIXIR_PAGES.CERTIFIED_MODULE.label, description: "Learn about the certified module capabilities that MFA-protected access is built on top of." },
    { slug: INDUSTRY_PAGES.HEALTHCARE.slug, label: INDUSTRY_PAGES.HEALTHCARE.label, description: "Explore Mirketa's broader healthcare technology and EHR integration work." },
    { slug: AI_PAGES.AI_DATA_FOUNDATIONS.slug, label: AI_PAGES.AI_DATA_FOUNDATIONS.label, description: "Build the governed data foundation that keeps access and audit data reliable." },
    { slug: "/kratu-ai", label: "Kratu AI (ElixirAI)", description: "See the AI-assisted clinical and revenue workflows built on the Elixir platform." },
  ],
};

const FINAL_CTA = {
  heading: "Configure MFA Around How Your Organization Actually Logs In",
  description: "Partner with Mirketa to design and configure ONC-aligned multi-factor authentication inside Elixir — or talk to a healthcare security advisor first.",
  primaryCta: { label: "Get an MFA Implementation Assessment", href: "#contact" },
  secondaryCta: { label: "Talk to a Healthcare Security Advisor", href: "#contact" },
};

const CONSULTATION = {
  eyebrow: "Get Started",
  heading: "Get an MFA Implementation Assessment",
  description: "Tell us about your identity provider, login patterns, and compliance requirements — a healthcare security advisor will follow up within one business day.",
  formTitle: "Request an ONC MFA Assessment",
};

const SEO = {
  title: pageSEO.title,
  description: pageSEO.description,
  canonical: `https://mirketa.us${pageSEO.slug}`,
  keywords: [
    "ONC MFA Use Cases",
    "healthcare MFA",
    "multi-factor authentication healthcare",
    "ONC compliance",
    "healthcare security",
    "secure healthcare access",
  ],
  schema: [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "Healthcare Multi-Factor Authentication Configuration",
      provider: { "@type": "Organization", name: "Mirketa Inc.", url: "https://mirketa.us" },
      name: "ONC MFA Implementation for Elixir EHR",
      description: "Multi-factor authentication configuration for healthcare provider, staff, and patient portal access inside the Elixir EHR platform.",
      areaServed: "Global",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://mirketa.us/" },
        { "@type": "ListItem", position: 2, name: ELIXIR_PAGES.ONC_MFA_USE_CASES.label, item: `https://mirketa.us${pageSEO.slug}` },
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

export default function OncMfaUseCases() {
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

      gsap.utils.toArray(".mfa-reveal").forEach((el) => {
        gsap.from(el, { opacity: prefersReduced ? 1 : 0, y: prefersReduced ? 0 : 32, duration: 0.7, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 88%" } });
      });
      gsap.utils.toArray(".mfa-reveal-left").forEach((el) => {
        gsap.from(el, { opacity: prefersReduced ? 1 : 0, x: prefersReduced ? 0 : -30, duration: 0.7, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 88%" } });
      });
      gsap.utils.toArray(".mfa-reveal-right").forEach((el) => {
        gsap.from(el, { opacity: prefersReduced ? 1 : 0, x: prefersReduced ? 0 : 30, duration: 0.7, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 88%" } });
      });
      gsap.utils.toArray(".mfa-reveal-stagger").forEach((el) => {
        gsap.from(el.children, { opacity: prefersReduced ? 1 : 0, y: prefersReduced ? 0 : 26, duration: 0.6, stagger: 0.06, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 85%" } });
      });
      gsap.utils.toArray(".mfa-zoom-in").forEach((el) => {
        gsap.from(el, { opacity: prefersReduced ? 1 : 0, scale: prefersReduced ? 1 : 0.94, duration: 0.6, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 88%" } });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="elixir-onc-mfa-use-cases">
      <Seo {...SEO} />
      <HeroSection heroTextRef={heroTextRef} heroRef={heroRef} />
      <TrustedByMarquee label="Trusted by Healthcare IT and Security Teams" />
      <ChallengesSection />
      <SolutionSection />
      <ServicesSection />
      <TechnicalSection />
      <AiAutomationSection />
      <BenefitsSection />
      <UseCasesSection />
      <ScenariosSection />
      <WhyMirketaSection />
      <TechnologiesSection />
      <ProcessSection />
      <FaqSection />
      <RelatedServices {...RELATED_SERVICES} className="mfa-related mfa-reveal" />
      <FinalCtaSection />
      <ConsultationSection {...CONSULTATION} />
      <StickyCta heroRef={heroRef} label="Get an MFA Implementation Assessment" />
    </div>
  );
}

// ============================================================
// HERO
// ============================================================

function HeroSection({ heroTextRef, heroRef }) {
  return (
    <section ref={heroRef} className="mfa-hero" style={{ backgroundImage: `url("${Images.heroElixirOncMfaUseCases}")` }} aria-label="ONC MFA Use Cases by Mirketa">
      <div className="mfa-hero__scrim" />
      <div className="container">
        <Breadcrumb items={BREADCRUMB_ITEMS} className="mfa-breadcrumb" />
        <div className="mfa-hero__inner">
          <div ref={heroTextRef} className="mfa-hero__text">
            <span className="mfa-badge">
              <span className="mfa-badge__spark" aria-hidden="true">✦</span> {HERO.badge}
            </span>
            <h1>{HERO.title}</h1>
            <p className="mfa-hero__description">{HERO.description}</p>
            <div className="mfa-hero__ctas">
              <a href={HERO.primaryCta.href} className="btn btn-primary mfa-btn">
                {HERO.primaryCta.label} <span aria-hidden="true">→</span>
              </a>
              <a href={HERO.secondaryCta.href} className="btn btn-secondary mfa-btn">
                {HERO.secondaryCta.label}
              </a>
            </div>
            <ul className="mfa-hero__metrics">
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
            className="mfa-hero__visual mfa-zoom-in"
          />
        </div>
      </div>
    </section>
  );
}

// ============================================================
// KEY CHALLENGES
// ============================================================

function ChallengesSection() {
  return (
    <section className="section mfa-challenges" aria-labelledby="mfa-challenges-heading">
      <div className="container">
        <div className="section-heading mfa-reveal">
          <p className="mfa-eyebrow">{CHALLENGES.eyebrow}</p>
          <h2 id="mfa-challenges-heading">{CHALLENGES.heading}</h2>
          <p>{CHALLENGES.intro}</p>
        </div>
        <div className="mfa-challenges__grid mfa-reveal-stagger">
          {CHALLENGES.items.map((c) => (
            <div className="mfa-challenge-card" key={c.title}>
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
// SOLUTION & CAPABILITIES
// ============================================================

function SolutionSection() {
  return (
    <section className="section mfa-solution" aria-labelledby="mfa-solution-heading">
      <div className="container mfa-solution__grid">
        <div className="mfa-reveal-left">
          <p className="mfa-eyebrow">{SOLUTION.eyebrow}</p>
          <h2 id="mfa-solution-heading">{SOLUTION.heading}</h2>
          {SOLUTION.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <div className="mfa-reveal-right">
          <WorkflowDiagram
            title="Adaptive Login Verification Flow"
            steps={[{ label: "Login Attempt" }, { label: "Identity Checked" }, { label: "Second Factor" }, { label: "Verified" }, { label: "Access Granted" }]}
          />
        </div>
      </div>
    </section>
  );
}

// ============================================================
// KEY FEATURES
// ============================================================

function ServicesSection() {
  return (
    <section className="section mfa-services" aria-labelledby="mfa-services-heading">
      <div className="container">
        <div className="mfa-services__head mfa-reveal">
          <div className="section-heading">
            <p className="mfa-eyebrow">{SERVICES.eyebrow}</p>
            <h2 id="mfa-services-heading">{SERVICES.heading}</h2>
            <p>{SERVICES.intro}</p>
          </div>
        </div>
        <div className="mfa-services__grid mfa-reveal-stagger">
          {SERVICES.items.map((c) => (
            <div className="mfa-service-card" key={c.title}>
              <span className="mfa-service-card__icon">{c.icon}</span>
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
// TECHNICAL & INTEGRATION INFORMATION
// ============================================================

function TechnicalSection() {
  return (
    <section className="section mfa-technical" aria-labelledby="mfa-technical-heading">
      <div className="container">
        <div className="section-heading mfa-reveal">
          <p className="mfa-eyebrow">{TECHNICAL.eyebrow}</p>
          <h2 id="mfa-technical-heading">{TECHNICAL.heading}</h2>
          <p>{TECHNICAL.intro}</p>
        </div>
        <div className="mfa-technical__grid mfa-reveal-stagger">
          {TECHNICAL.items.map((c) => (
            <div className="mfa-technical-item" key={c.title}>
              <p className="mfa-card-title">{c.title}</p>
              <p>{c.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// ADAPTIVE & RISK-BASED AUTHENTICATION
// ============================================================

function AiAutomationSection() {
  return (
    <section className="section mfa-ai" aria-labelledby="mfa-ai-heading">
      <div className="container">
        <div className="section-heading mfa-reveal">
          <p className="mfa-eyebrow">{AI_AUTOMATION.eyebrow}</p>
          <h2 id="mfa-ai-heading">{AI_AUTOMATION.heading}</h2>
          <p>{AI_AUTOMATION.intro}</p>
        </div>
        <div className="mfa-ai__grid mfa-reveal-stagger">
          {AI_AUTOMATION.items.map((f) => (
            <div className="mfa-ai-item" key={f.title}>
              <p className="mfa-card-title">{f.title}</p>
              <p>{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// BENEFITS
// ============================================================

function BenefitsSection() {
  return (
    <section className="section mfa-benefits" aria-labelledby="mfa-benefits-heading">
      <div className="container">
        <div className="section-heading mfa-reveal">
          <p className="mfa-eyebrow">{BENEFITS.eyebrow}</p>
          <h2 id="mfa-benefits-heading">{BENEFITS.heading}</h2>
          <p>{BENEFITS.intro}</p>
        </div>
        <div className="mfa-benefits__grid mfa-reveal-stagger">
          {BENEFITS.items.map((b) => (
            <div className="mfa-benefit-item" key={b.title}>
              <span aria-hidden="true">{Ico.check}</span>
              <div>
                <p className="mfa-card-title">{b.title}</p>
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
// USE CASES
// ============================================================

function UseCasesSection() {
  return (
    <section className="section mfa-usecases" aria-labelledby="mfa-usecases-heading">
      <div className="container">
        <div className="section-heading mfa-reveal">
          <p className="mfa-eyebrow">{USE_CASES.eyebrow}</p>
          <h2 id="mfa-usecases-heading">{USE_CASES.heading}</h2>
          <p>{USE_CASES.intro}</p>
        </div>
        <div className="mfa-usecases__grid mfa-reveal-stagger">
          {USE_CASES.items.map((n) => (
            <div className="mfa-usecase-card" key={n.title}>
              <span className="mfa-usecase-card__icon">{n.icon}</span>
              <p className="mfa-card-title">{n.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// IMPLEMENTATION SCENARIOS
// ============================================================

function ScenariosSection() {
  return (
    <section className="section mfa-scenarios" aria-labelledby="mfa-scenarios-heading">
      <div className="container">
        <div className="section-heading mfa-reveal">
          <p className="mfa-eyebrow">{SCENARIOS.eyebrow}</p>
          <h2 id="mfa-scenarios-heading">{SCENARIOS.heading}</h2>
          <p>{SCENARIOS.intro}</p>
        </div>
        <div className="mfa-scenarios__grid mfa-reveal-stagger">
          {SCENARIOS.cases.map((c) => (
            <div className="mfa-scenario-card" key={c.title}>
              <span className="mfa-scenario-card__tag">{c.tag}</span>
              <p className="mfa-card-title">{c.title}</p>
              <dl className="mfa-scenario-card__fields">
                <div><dt>Challenge</dt><dd>{c.challenge}</dd></div>
                <div><dt>Approach</dt><dd>{c.approach}</dd></div>
                <div><dt>Result</dt><dd>{c.result}</dd></div>
              </dl>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// WHY MIRKETA
// ============================================================

function WhyMirketaSection() {
  return (
    <section className="section mfa-why" aria-labelledby="mfa-why-heading">
      <div className="container">
        <div className="section-heading mfa-reveal">
          <p className="mfa-eyebrow">{WHY_MIRKETA.eyebrow}</p>
          <h2 id="mfa-why-heading">{WHY_MIRKETA.heading}</h2>
          <p>{WHY_MIRKETA.intro}</p>
        </div>
        <div className="mfa-why__grid mfa-reveal-stagger">
          {WHY_MIRKETA.items.map((w, i) => (
            <div className="mfa-why-card" key={`${w.title}-${i}`}>
              <span className="mfa-why-card__icon">{w.icon}</span>
              <p className="mfa-card-title">{w.title}</p>
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
    <section className="section mfa-tech" aria-labelledby="mfa-tech-heading">
      <div className="container">
        <div className="section-heading mfa-reveal">
          <p className="mfa-eyebrow">{TECHNOLOGIES.eyebrow}</p>
          <h2 id="mfa-tech-heading">{TECHNOLOGIES.heading}</h2>
          <p>{TECHNOLOGIES.intro}</p>
        </div>
        <div className="mfa-tech__grid mfa-reveal-stagger">
          {TECHNOLOGIES.items.map((t) => (
            <div className="mfa-tech-card" key={t.title}>
              <span className="mfa-tech-card__icon">{t.icon}</span>
              <p className="mfa-card-title">{t.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// IMPLEMENTATION PROCESS
// ============================================================

function ProcessSection() {
  return (
    <section className="section mfa-process" aria-labelledby="mfa-process-heading">
      <div className="container">
        <div className="section-heading mfa-reveal">
          <p className="mfa-eyebrow">{PROCESS.eyebrow}</p>
          <h2 id="mfa-process-heading">{PROCESS.heading}</h2>
          <p>{PROCESS.intro}</p>
        </div>
        <div className="mfa-zoom-in">
          <SupplyChainMap
            title="Identity & Access Network"
            nodes={[
              { label: "Identity Provider", short: "IDP" },
              { label: "Elixir Platform", short: "EHR" },
              { label: "Provider Access", short: "MD" },
              { label: "Patient Portal", short: "PT" },
              { label: "Audit Log", short: "LOG" },
            ]}
          />
        </div>
        <div className="mfa-process__grid mfa-reveal-stagger">
          {PROCESS.detail.map((p, i) => (
            <div className="mfa-step-card" key={p.name}>
              <span className="mfa-step-card__num">{String(i + 1).padStart(2, "0")}</span>
              <p className="mfa-card-title">{p.name}</p>
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
    <section className="section mfa-faq" aria-labelledby="mfa-faq-heading">
      <div className="container">
        <div className="section-heading mfa-reveal">
          <p className="mfa-eyebrow">FAQ</p>
          <h2 id="mfa-faq-heading">Frequently Asked Questions About ONC MFA Use Cases</h2>
        </div>
        <FaqAccordion items={FAQS} className="mfa-reveal" searchPlaceholder="Ask a question — e.g. &quot;patient portal&quot;, &quot;identity provider&quot;, &quot;audit&quot;..." />
        <p className="mfa-faq__links">
          Related reading: <Link to={ELIXIR_PAGES.API_DEVELOPER_PORTAL.slug}>{ELIXIR_PAGES.API_DEVELOPER_PORTAL.label}</Link>,{" "}
          <Link to={ELIXIR_PAGES.CERTIFIED_MODULE.slug}>{ELIXIR_PAGES.CERTIFIED_MODULE.label}</Link>,{" "}
          <Link to={INDUSTRY_PAGES.HEALTHCARE.slug}>{INDUSTRY_PAGES.HEALTHCARE.label}</Link>,{" "}
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
    <section className="mfa-final-cta mfa-reveal" aria-labelledby="mfa-final-cta-heading">
      <div className="container mfa-final-cta__inner">
        <h2 id="mfa-final-cta-heading">{FINAL_CTA.heading}</h2>
        <p>{FINAL_CTA.description}</p>
        <div className="mfa-final-cta__ctas">
          <a href={FINAL_CTA.primaryCta.href} className="btn btn-primary mfa-btn">
            {FINAL_CTA.primaryCta.label} <span aria-hidden="true">→</span>
          </a>
          <a href={FINAL_CTA.secondaryCta.href} className="btn btn-secondary mfa-btn">
            {FINAL_CTA.secondaryCta.label}
          </a>
        </div>
      </div>
    </section>
  );
}
