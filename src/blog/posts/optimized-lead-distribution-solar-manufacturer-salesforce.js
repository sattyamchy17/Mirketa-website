import featuredImage from "../../assets/blog/optimized-lead-distribution-solar-manufacturer-salesforce/solar-partner-geo-lead-distribution.svg";

export const post = {
  id: "optimized-lead-distribution-solar-manufacturer-salesforce",
  title: "Optimized Lead Distribution System for a Global Solar Panel Manufacturer",
  slug: "optimized-lead-distribution-solar-manufacturer-salesforce",
  author: "Mirketa",
  publishedDate: "2026-08-27",
  category: "Customer Success",
  excerpt:
    "How Mirketa built a geo-matched, round robin lead distribution system in Salesforce for a global solar panel manufacturer's installer partner network, with real-time sync to a third-party mobile app.",
  featuredImage,
  featuredImageAlt: "A geo-matched lead pin connected by round robin routing to three installer partner nodes and a mobile app icon, representing a Salesforce lead distribution system for a solar panel manufacturer",
  seoTitle: "Optimized Lead Distribution for a Solar Manufacturer",
  seoDescription:
    "See how Mirketa built a geo-matched, round robin Salesforce lead distribution system for a global solar panel manufacturer's partner network.",
  primaryKeyword: "Salesforce lead distribution system",
  secondaryKeywords: ["geo-matched lead assignment", "round robin lead routing", "partner lead management", "Salesforce mobile app integration", "solar installer network"],
  tags: ["Salesforce CRM", "Customer Success", "Lead Management", "Sales Automation", "Manufacturing"],
  readingTime: "7 min read",
  content: [
    { type: "heading3", text: "Customer Success Summary" },
    {
      type: "table",
      headers: ["Detail", "Description"],
      rows: [
        ["Client", "A major global manufacturer and seller of solar panels (client name withheld)"],
        ["Industry", "Solar panel manufacturing, sold through a worldwide network of small-business installer partners"],
        ["Challenge", "Distributing multi-source leads fairly and geographically to a tiered partner network with capacity limits, reassignment rules, and a third-party mobile app"],
        ["Solution", "An automated, geo-matched round robin Lead Distribution System built in Salesforce"],
        ["Technologies Used", "Salesforce, GeoPointe, scheduled batch Apex, round-robin assignment logic, REST API integration with a partner mobile application"],
        ["Business Impact", "Faster lead response, fair distribution across partners, optimized partner load, and real-time mobile lead access"],
      ],
    },
    { type: "heading2", text: "Background & Context" },
    {
      type: "paragraph",
      text: "The client is a major global manufacturer and seller of solar panels with an extensive network of partners worldwide. These partners — typically small businesses — purchase solar panels from the client and install them on rooftops or open spaces for end customers. As lead volume grew across regions, getting each lead to the right partner quickly and fairly became a genuine operational problem.",
    },
    { type: "heading2", text: "Business Challenges" },
    {
      type: "paragraph",
      text: "The client's lead distribution process needed to solve six distinct problems at once:",
    },
    {
      type: "list",
      style: "bullet",
      items: [
        "**Multi-source lead ingestion:** leads were entering Salesforce from multiple sources",
        "**Geographical assignment:** leads needed to be assigned to the nearest partner",
        "**Fair distribution:** partners should receive leads in a round-robin fashion",
        "**Partner hierarchy & load management:** different layers of partners with varied lead-handling capacities, each with a threshold for the maximum number of leads they could handle at a given time",
        "**Lead reassignment & expiry:** a lead could be reassigned up to three times before being considered unserviceable",
        "**Partner system integration:** partners accessed assigned leads through a mobile application built on a different tech stack, requiring seamless integration with Salesforce",
      ],
    },
    { type: "heading2", text: "Solution Overview" },
    {
      type: "paragraph",
      text: "Mirketa designed and implemented an automated Lead Distribution System in Salesforce that geo-matches every incoming lead to the nearest available partner, distributes leads fairly by round robin within capacity limits, handles reassignment when a lead is rejected, and keeps a third-party [partner mobile application](/salesforce-developer-services) in sync with Salesforce in real time.",
    },
    { type: "heading2", text: "Architecture & Integration" },
    { type: "heading3", text: "1. Geographical Mapping & Lead Assignment" },
    {
      type: "list",
      style: "bullet",
      items: [
        "Tool used: GeoPointe (can be replaced with the [Google Maps API](https://developers.google.com/maps) in the future)",
        "When a lead enters Salesforce, its latitude and longitude are determined",
        "A scheduled batch process runs every hour to identify the nearest partner using a tiered search radius (5, 15, 30, 50 miles)",
      ],
    },
    { type: "heading3", text: "2. Round-Robin Lead Assignment" },
    {
      type: "list",
      style: "bullet",
      items: [
        "Leads are distributed in a fair round-robin manner among partners",
        "Partner lead quotas are enforced based on their hierarchy",
        "If a partner is at capacity, the lead is assigned to the next available partner",
      ],
    },
    { type: "heading3", text: "3. Lead Reassignment Rules" },
    {
      type: "list",
      style: "bullet",
      items: [
        "If a partner rejects a lead, it is reassigned up to three times",
        "If no partner accepts after three attempts, it is flagged for review",
      ],
    },
    { type: "heading3", text: "4. Integration with Partner Mobile Application" },
    {
      type: "list",
      style: "bullet",
      items: [
        "Partners access leads via a mobile application built on a different tech stack",
        "Real-time updates are pushed to the mobile app through API integration",
        "Lead statuses (accepted, rejected, completed) sync back to Salesforce",
      ],
    },
    { type: "heading2", text: "Implementation Highlights" },
    {
      type: "list",
      style: "bullet",
      items: [
        "**Tiered geographic matching** using a stepped search radius (5, 15, 30, 50 miles) so leads always reach the closest available partner",
        "**Hourly scheduled batch processing** to keep assignment running automatically at scale",
        "**Hierarchy-aware round-robin routing** that respects each partner's lead-handling capacity",
        "**A three-attempt reassignment safety net** so no lead silently disappears if a partner doesn't respond",
        "**Two-way API sync** with a third-party mobile app on a completely different tech stack",
      ],
    },
    { type: "heading2", text: "Business Outcomes" },
    {
      type: "paragraph",
      text: "By automating geographic matching, fair distribution, and mobile sync, the client removed the manual coordination that previously slowed down getting a lead in front of the right installer partner — while still respecting each partner's real capacity to take on new work.",
    },
    { type: "heading2", text: "Key Results" },
    {
      type: "list",
      style: "bullet",
      items: [
        "**Improved lead response time** through automated, near-instant assignment to partners",
        "**Fair distribution** — the round-robin mechanism prevents lead hoarding",
        "**Partner efficiency optimization**, since load management ensures partners only receive leads they can handle",
        "**Enhanced partner experience**, with mobile app integration providing real-time lead access and updates",
      ],
    },
    { type: "heading2", text: "Technologies Used" },
    {
      type: "list",
      style: "bullet",
      items: ["[Salesforce](https://www.salesforce.com/)", "[GeoPointe](https://www.geopointe.com/) (geolocation matching)", "Scheduled batch Apex", "Round-robin assignment logic", "REST API integration with a partner mobile application"],
    },
    { type: "heading2", text: "Lessons Learned" },
    {
      type: "paragraph",
      text: "This engagement showed that fair distribution and geographic relevance aren't competing goals — a tiered search radius combined with hierarchy-aware round-robin routing let the system optimize for both at once. It also pointed to a clear next phase of investment. The client is evaluating future enhancements, including:",
    },
    {
      type: "list",
      style: "bullet",
      items: [
        "[AI-based lead scoring](/ai-consulting) for better prioritization",
        "Machine learning to predict partner availability and optimize lead routing",
        "Real-time push notifications for quicker partner responses",
      ],
    },
    { type: "heading2", text: "About Mirketa" },
    {
      type: "paragraph",
      text: "Mirketa Inc. is a Salesforce Crest (Gold) Consulting Partner specializing in digital transformation solutions across Education, Healthcare, and Nonprofit sectors. With deep expertise across the Salesforce platform, including [manufacturing and dealer network implementations](/salesforce/manufacturing-cloud), Mirketa enables organizations to achieve automation, scalability, and superior user experiences. Headquartered in Dublin, California, with delivery centers in Noida and Bangalore, Mirketa has successfully delivered hundreds of [Salesforce implementations](/salesforce-consulting-development-services) globally.",
    },
    {
      type: "faq",
      items: [
        {
          question: "What is geo-matched lead distribution?",
          answer:
            "Geo-matched lead distribution assigns each incoming lead to the nearest qualified partner based on location, typically using latitude and longitude and a tiered search radius, rather than assigning leads randomly or purely by availability.",
        },
        {
          question: "How does round-robin lead assignment stay fair when partners have different capacities?",
          answer:
            "In this implementation, round-robin distribution is layered with partner hierarchy and quota rules, so leads rotate fairly among eligible partners while respecting each partner's maximum load. If a partner is at capacity, the lead moves on to the next available partner rather than overloading them.",
        },
        {
          question: "What happens if a partner doesn't accept an assigned lead?",
          answer:
            "The lead is reassigned to another partner, up to three attempts. If no partner accepts after three reassignments, the lead is flagged for manual review rather than being silently dropped or left unassigned.",
        },
        {
          question: "How does Salesforce integrate with a partner mobile app built on a different tech stack?",
          answer:
            "The integration works through a REST API connection: assigned leads and real-time updates are pushed out to the mobile app, and lead status changes — accepted, rejected, or completed — sync back into Salesforce, keeping both systems consistent regardless of the underlying technology.",
        },
        {
          question: "What is GeoPointe, and why was it used for this implementation?",
          answer:
            "GeoPointe is a geolocation application for Salesforce that maps records like leads and accounts and enables location-based logic. It was used here to determine each lead's coordinates and support the tiered radius search used to find the nearest partner; a platform like the Google Maps API could serve a similar role in the future.",
        },
        {
          question: "Is this lead distribution model specific to solar panel installers?",
          answer:
            "No. While this engagement was with a solar panel manufacturer's installer network, the same geo-matched, round-robin, capacity-aware distribution model applies to any business that routes leads to a distributed network of dealers, franchisees, or service partners.",
        },
      ],
    },
    {
      type: "callout",
      text: "Managing lead distribution across a dealer, installer, or partner network on Salesforce? [Schedule a consultation with Mirketa](/company/contact) to talk through your assignment logic, explore our [Salesforce consulting services](/salesforce-consulting-development-services), or read how [an insurance agency automated round-robin lead distribution](/blog/salesforce-crm-implementation-growing-insurance-agency) and how another team [revived abandoned sales journeys with CPQ](/blog/reviving-abandoned-sales-journeys-cpq-salesforce) in more Customer Success stories.",
    },
  ],
};
