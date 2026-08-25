// ============================================================
// CENTRALIZED PAGE SLUG CONFIGURATION
//
// Every route, breadcrumb, CTA, and internal link for the NetSuite
// module (and its cross-links to other platforms) resolves through
// this file instead of a hardcoded URL string. To change a URL,
// change it once here — every page, nav entry, and route using the
// constant picks up the new path automatically.
//
// New NetSuite pages register a new entry under NETSUITE_PAGES;
// nothing else in this file needs to change for them to be linkable.
// ============================================================

export const NETSUITE_PAGES = {
  AI: {
    slug: "/netsuite-ai-consulting",
    label: "NetSuite AI Consulting",
  },
  IMPLEMENTATION: {
    slug: "/netsuite-implementation-development",
    label: "NetSuite Implementation",
  },
  SUPPORT_SERVICES: {
    // Matches the URL already reserved for this item in the site nav
    // (previously labeled "NetSuite Managed Services").
    slug: "/netsuite-support-services",
    label: "NetSuite Support Services",
  },
};

export const WORKDAY_PAGES = {
  CONSULTING_DEVELOPMENT: {
    slug: "/workday-consulting-development",
    label: "Workday Consulting & Development",
  },
  SUPPORT_MANAGED_SERVICES: {
    // Matches the URL already reserved for this item in the site nav
    // (previously labeled "Managed Services").
    slug: "/workday-support-managed-services",
    label: "Workday Support Managed Services",
  },
};

export const INTEGRATION_PAGES = {
  ENTERPRISE: {
    slug: "/enterprise-integration-services",
    label: "Enterprise Integration Services",
  },
  BOOMI: {
    slug: "/boomi-integration-services",
    label: "Boomi Integration Services and Solutions",
  },
  MULESOFT: {
    slug: "/mulesoft-integration-services",
    label: "MuleSoft Implementation",
  },
};

// Reference slugs for the other platforms so NetSuite/Workday pages can link
// out to them without hardcoding paths inline. These mirror the
// routes already registered in src/App.jsx — if one of those routes
// changes, update it here too.
export const ORACLE_PAGES = {
  FUSION_IMPLEMENTATION: { slug: "/oracle-fusion-applications-implementation", label: "Oracle Fusion Applications Implementation" },
  ERP_CONSULTING: { slug: "/oracle-fusion/erp-consulting", label: "Oracle ERP Consulting" },
  HCM_CONSULTING: { slug: "/oracle-fusion/hcm-consulting", label: "Oracle HCM Consulting" },
  SCM_CONSULTING: { slug: "/oracle-fusion/scm-consulting", label: "Oracle SCM Consulting" },
  EPM_CONSULTING: { slug: "/oracle-fusion/epm-consulting", label: "Oracle EPM Consulting" },
  PREMIUM_SUPPORT: { slug: "/oracle-premium-support-service", label: "Oracle Premium Support Service" },
  MANAGED_SERVICES: { slug: "/oracle-managed-service", label: "Oracle Managed Services" },
};

export const SALESFORCE_PAGES = {
  DEVELOPMENT_CONSULTING: { slug: "/salesforce-consulting-development-services", label: "Salesforce Development & Consulting" },
  CLOUDS: { slug: "/salesforce", label: "Salesforce Clouds" },
  REVENUE_CLOUD: { slug: "/salesforce/revenue-cloud", label: "Salesforce Revenue Cloud" },
  FINANCIAL_SERVICES: { slug: "/salesforce-financial-services", label: "Salesforce Financial Services" },
  DEVELOPER_SERVICES: { slug: "/salesforce-developer-services", label: "Salesforce Developer Services" },
};

export const SERVICENOW_PAGES = {
  HUB: { slug: "/servicenow", label: "ServiceNow Consulting & Implementation" },
  TECHNOLOGY_WORKFLOWS: { slug: "/servicenow-technology-workflows", label: "ServiceNow Technology Workflows" },
  CUSTOMER_WORKFLOWS: { slug: "/servicenow-customer-workflows", label: "ServiceNow Customer Workflows" },
  SUPPORT_MANAGED_SERVICES: { slug: "/servicenow-support-managed-services", label: "ServiceNow Support & Managed Services" },
};

export const AI_PAGES = {
  AI_CONSULTING: { slug: "/ai-consulting", label: "AI Consulting" },
  AI_READINESS: { slug: "/ai-readiness", label: "AI Readiness" },
  AGENTIC_ORCHESTRATION: { slug: "/agentic-orchestration", label: "Agentic Orchestration" },
  AI_DATA_FOUNDATIONS: { slug: "/ai-data-foundations", label: "AI Data Foundations" },
  NETSUITE_AI_LEGACY: { slug: "/netsuite-ai", label: "NetSuite AI" },
};

// Industry pages are nested under a shared "/industry" parent route
// in App.jsx (React Router nested <Route> parent/child, not a flat
// per-page path) — see feedback_industry_nested_routes memory before
// touching this. Slugs are deliberately singular ("/industry/...",
// not the older plural "/industries/..." the nav used to use).
export const INDUSTRY_PAGES = {
  PRIVATE_EQUITY: { slug: "/industries/private-equity", label: "Private Equity" },
  ECOMMERCE: { slug: "/industries/e-commerce", label: "E-commerce" },
  EDUCATION: { slug: "/industries/education", label: "Education" },
  FINANCIAL_SERVICES: { slug: "/industries/financial-services", label: "Financial Services" },
  HI_TECH: { slug: "/industries/hi-tech", label: "Hi-Tech" },
  HEALTHCARE: { slug: "/industries/healthcare", label: "Healthcare" },
  WHOLESALE: { slug: "/industries/wholesale", label: "Wholesale" },
};

// Elixir (EHR) is an external product (elixirehr.com) — the nav's
// "Elixir (EHR)" heading links out to it directly and has no page of
// its own in this project. Only its three child pages are real
// routes here, nested under a shared "/elixir" parent route in
// App.jsx (same pathless-parent pattern as INDUSTRY_PAGES) with no
// bare "/elixir" route registered.
export const ELIXIR_PAGES = {
  ONC_MFA_USE_CASES: { slug: "/onc-mfa-use-cases", label: "ONC MFA Use Cases" },
  API_DEVELOPER_PORTAL: { slug: "/api-developer-portal", label: "API Developer Portal" },
  CERTIFIED_MODULE: { slug: "/elixir-certified-module", label: "Elixir Certified Module" },
};

// RRD (Round Robin Distributor) is an external product site
// (roundrobindistributor.com) — the nav's "RRD" item links out to it
// directly and has no page of its own in this project. Only these
// three products have real routes here, at flat root-level slugs
// (matching the user's literal requirement, not nested under
// "/products/" the way the old placeholder nav hrefs were).
export const PRODUCT_PAGES = {
  FINACAST: { slug: "/finacast", label: "Finacast" },
  ECOURIER: { slug: "/ecourier-report-scheduler", label: "eCourier" },
  DUPLICATE_SEARCH_MERGE: { slug: "/duplicate-search-merge", label: "Duplicate Search & Merge" },
};

// Careers pages live under a shared "/careers" parent route in
// App.jsx (same pathless-parent nesting as INDUSTRY_PAGES/ELIXIR_PAGES
// above) — matching the "Careers" link already reserved in Header.jsx's
// Company mega-menu (href: "/careers"), not a flat top-level
// "/careers/..." path.
export const CAREER_PAGES = {
  HUB: { slug: "/careers", label: "Careers" },
  CYBERSECURITY_SOC_ANALYST: {
    slug: "/careers/cybersecurity-soc-analyst",
    label: "Cybersecurity SOC Analyst",
    location: "Gurugram",
    employmentType: "Full-time",
  },
};

export const CLOUD_PAGES = {
  // AWS/Azure/GCP nav entries are reserved but not yet built as pages —
  // left here as reference only; do not link to them until they exist.
  AWS: { slug: "/platforms/cloud/aws", label: "AWS" },
  AZURE: { slug: "/platforms/cloud/azure", label: "Azure" },
  GCP: { slug: "/platforms/cloud/gcp", label: "Google Cloud Platform" },
  SETUP_MIGRATION: {
    slug: "/cloud-setup-migration",
    label: "Cloud Setup & Migration",
  },
  SITE_RELIABILITY_ENGINEERING: {
    // Matches the URL already reserved for this item in the site nav
    // (previously labeled "SRE & Security Monitoring").
    slug: "/cloud-site-reliability-engineering",
    label: "Site Reliability Engineering",
  },
  INFRA_MANAGEMENT: { slug: "/cloud-infrastructure-setup-migration", label: "Cloud Infrastructure Management" },
};
