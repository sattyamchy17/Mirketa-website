import Seo from "../../../../components/Seo/Seo.jsx";
import JobDetails from "../../JobDetails/index.js";
import { CAREER_PAGES } from "../../../../config/pageSlugs.js";
import { Images } from "../../../../assets/images/index.js";
import "./CybersecuritySOCAnalyst.css";

// ============================================================
// JOB DATA — source of truth for both this page and the job
// card rendered on the Careers hub (see ../index.js). Every
// string below is taken directly from the job requirements as
// supplied; nothing has been invented or reworded in meaning.
// ============================================================
export const cybersecuritySocAnalystJob = {
  slug: CAREER_PAGES.CYBERSECURITY_SOC_ANALYST.slug,
  title: "Cybersecurity SOC Analyst",
  location: "Gurugram",
  experience: "3–4 years",
  employmentType: "Full-time",
  heroImage: Images.heroCybersecuritySocAnalyst,
  summary: "Join Mirketa's security operations team monitoring, triaging, and hunting threats across enterprise environments — including Elixir EHR, Mirketa's Salesforce-native healthcare platform.",

  aboutMirketa:
    "Mirketa Inc is a California-based digital transformation and technology company, headquartered in Dublin, CA, serving clients across the United States and Europe. We specialize in enterprise platforms including Salesforce, healthcare technology, cloud infrastructure, analytics, and custom application development.",

  aboutElixir:
    "Elixir EHR is Mirketa's native Salesforce-based EHR and Practice Management platform, purpose-built to leverage the scalability, security, and extensibility of the Salesforce ecosystem. Elixir enables healthcare providers to modernize clinical and operational workflows while benefiting from Salesforce-native reporting, automation, interoperability, and ecosystem integrations.",

  aboutRole: "We are seeking an experienced SOC Analyst with 8–12 years of proven professional experience.",

  // The supplied source content states two different experience
  // requirements for this role — see `experienceDiscrepancy` below.
  // Both values are preserved verbatim rather than silently
  // reconciled; confirm the correct figure before production.
  experienceDiscrepancy:
    'The source content for this role lists two different experience requirements: "8–12 years of proven professional experience" under About the Role, and "3–4 years" under Job Information. Both values are shown below exactly as provided — please confirm the correct figure before this listing goes live.',

  responsibilities: [
    "Handle and escalate security alerts in line with defined severity and escalation procedures.",
    "Perform technical triage and analysis of security events to determine scope and impact.",
    "Investigate and respond to web attacks targeting monitored environments.",
    "Investigate and respond to malware infections identified across endpoints and networks.",
    "Investigate and respond to phishing campaigns reported or detected within the environment.",
    "Monitor and respond to alerts generated across the organization's security technology stack.",
  ],

  functionalResponsibilities: [
    "Monitor SIEM (Security Information and Event Management) solutions for security events.",
    "Monitor security devices across the environment for anomalies and alerts.",
    "Apply behavioral analytics to identify deviations from normal activity.",
    "Monitor IDS/IPS (Intrusion Detection/Prevention Systems) for potential threats.",
    "Maintain and review log management data to support investigations.",
    "Work within security analytics platforms to analyze and correlate events.",
    "Document security events accurately for tracking and reporting.",
    "Acknowledge security alerts in a timely manner per defined SLAs.",
    "Manage cases and updates through ticketing systems.",
    "Escalate alerts to the appropriate teams based on severity and impact.",
    "Support Incident Response activities as required.",
    "Follow established SOPs (Standard Operating Procedures) during investigations.",
    "Follow defined playbooks for consistent incident handling.",
    "Report urgent incidents promptly to relevant stakeholders.",
    "Manage the ticket queue to ensure timely handling of open items.",
    "Provide on-call support as part of the SOC rotation.",
    "Collaborate with partner teams during investigations and escalations.",
    "Collaborate with end users to gather context and resolve security concerns.",
  ],

  threatHunting: {
    heading: "Proactive Threat Hunting Services",
    intro: "Beyond alert-driven monitoring, this role includes proactive threat hunting activities within the environment.",
    items: [
      "Apply the MITRE ATT&CK framework to guide threat hunting activities.",
      "Use Keysight cybersecurity tools as part of the threat hunting toolset.",
      "Conduct threat hunting to proactively identify hidden threats.",
      "Detect anomalies within the environment that may indicate compromise.",
      "Identify Indicators of Compromise (IOCs) across monitored systems.",
      "Analyze TTPs (Tactics, Techniques, and Procedures) used by threat actors.",
      "Incorporate threat intelligence into hunting and investigation activities.",
      "Conduct hypothesis-driven investigations based on emerging threat patterns.",
      "Stay informed on cybercriminal tactics and techniques relevant to the environment.",
    ],
  },

  // No qualifications list was supplied in the source content — left
  // empty rather than invented; JobDetails skips this section when empty.
  qualifications: [],
};

export const pageSEO = {
  slug: `${cybersecuritySocAnalystJob.slug}/`,
  title: "Cybersecurity SOC Analyst Jobs | Mirketa",
  description: "Explore the Cybersecurity SOC Analyst opportunity at Mirketa and learn about responsibilities, experience, location, and application details.",
};

const SEO = {
  title: pageSEO.title,
  description: pageSEO.description,
  canonical: `https://mirketa.us${pageSEO.slug}`,
  keywords: ["Cybersecurity SOC Analyst", "SOC Analyst jobs", "cybersecurity careers", "Mirketa careers", "threat hunting jobs"],
  schema: [
    {
      "@context": "https://schema.org",
      "@type": "JobPosting",
      title: cybersecuritySocAnalystJob.title,
      description: `${cybersecuritySocAnalystJob.aboutRole} ${cybersecuritySocAnalystJob.summary}`,
      identifier: {
        "@type": "PropertyValue",
        name: "Mirketa",
        value: cybersecuritySocAnalystJob.slug,
      },
      datePosted: "2026-08-11",
      employmentType: "FULL_TIME",
      hiringOrganization: {
        "@type": "Organization",
        name: "Mirketa Inc.",
        sameAs: "https://mirketa.us",
      },
      jobLocation: {
        "@type": "Place",
        address: {
          "@type": "PostalAddress",
          addressLocality: cybersecuritySocAnalystJob.location,
          addressCountry: "IN",
        },
      },
      url: `https://mirketa.us${pageSEO.slug}`,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://mirketa.us/" },
        { "@type": "ListItem", position: 2, name: "Careers", item: `https://mirketa.us${CAREER_PAGES.HUB.slug}/` },
        { "@type": "ListItem", position: 3, name: cybersecuritySocAnalystJob.title, item: `https://mirketa.us${pageSEO.slug}` },
      ],
    },
  ],
};

export default function CybersecuritySOCAnalyst() {
  return (
    <div className="job-cybersecurity-soc-analyst">
      <Seo {...SEO} />
      <JobDetails job={cybersecuritySocAnalystJob} />
    </div>
  );
}
