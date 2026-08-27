import featuredImage from "../../assets/blog/salesforce-community-cloud-financial-planning-portal/salesforce-community-cloud-financial-planning.svg";

export const post = {
  id: "salesforce-community-cloud-financial-planning-portal",
  title: "A Community Cloud-Based Financial Planning Portal for Financial Advisors",
  slug: "salesforce-community-cloud-financial-planning-portal",
  author: "Mirketa",
  publishedDate: "2026-08-27",
  category: "Customer Success",
  excerpt:
    "How Mirketa built a Salesforce Community Cloud financial planning portal that aggregates banking, investment, and risk data into one platform for advisors and their clients.",
  featuredImage,
  featuredImageAlt: "Banking and investment data flowing through a Salesforce Community Cloud portal into a holistic advisor view, representing a financial planning portal for financial advisors",
  seoTitle: "Salesforce Community Cloud Financial Planning Portal",
  seoDescription:
    "See how Mirketa built a Salesforce Community Cloud portal giving financial advisors a single, cost-effective platform for planning, data, and client access.",
  primaryKeyword: "Salesforce Community Cloud financial planning portal",
  secondaryKeywords: ["Salesforce financial advisor platform", "Community Cloud self-service portal", "financial planning simulation Salesforce", "Salesforce Financial Services Cloud", "household account access portal"],
  tags: ["Experience Cloud", "Customer Success", "Financial Services", "Salesforce Consulting", "CRM Implementation"],
  readingTime: "6 min read",
  content: [
    { type: "heading3", text: "Customer Success Summary" },
    {
      type: "table",
      headers: ["Detail", "Description"],
      rows: [
        ["Client", "Financial advisory firms using Salesforce CRM (client name withheld)"],
        ["Industry", "Financial services and wealth management"],
        ["Challenge", "Advisors relied on two or more disconnected systems for a holistic view of client accounts, with no existing Salesforce app aggregating financial data or running planning simulations natively"],
        ["Solution", "A financial planning portal on Salesforce Community Cloud, aggregating third-party financial data with in-platform planning and risk simulation"],
        ["Technologies Used", "Salesforce Community Cloud (Experience Cloud), custom Java application, third-party financial data integration"],
        ["Business Impact", "A single, cost-effective, out-of-the-box core system replacing multiple disconnected tools for financial advisors"],
      ],
    },
    { type: "heading2", text: "Background & Context" },
    {
      type: "paragraph",
      text: "Financial advisors on the [Salesforce](https://www.salesforce.com/) CRM platform often need a holistic view of their clients' banking and investment assets, financial planning, and alerts, while also giving clients direct access to planning tools and their own accounts.",
    },
    { type: "heading2", text: "Business Challenges" },
    {
      type: "paragraph",
      text: "Financial Advisors on salesforce.com CRM often use two or more systems to get the holistic view of their client's banking and investment assets, planning, alerts, and provide direct access to planning tools and accounts to the clients. Moreover, none of the current systems available on the Salesforce platform aggregate financial data, and their planning simulations are done outside the Salesforce platform.",
    },
    { type: "heading2", text: "Solution Overview" },
    {
      type: "paragraph",
      text: "Mirketa built a financial planning portal on [Salesforce Community Cloud](/salesforce-financial-services) (now known as Experience Cloud), giving advisors and their clients a single platform for aggregated financial data, planning, and risk simulation — capabilities that previously required multiple disconnected systems.",
    },
    { type: "heading2", text: "Architecture & Integration" },
    { type: "heading3", text: "Smart Configuration" },
    {
      type: "paragraph",
      text: "Mirketa provided domain-specific looks and flows by simply configuring objects and business rules, rather than building custom code for every requirement.",
    },
    { type: "heading3", text: "Comprehensive Planning Features" },
    {
      type: "paragraph",
      text: "All planning features — including third-party financial data, stock values, risk simulation, and planning — are available through one platform.",
    },
    { type: "heading3", text: "Java App for Computation" },
    {
      type: "paragraph",
      text: "For CPU-intensive computations, Mirketa built a Java application that works as a service to provide the required computational data to the Salesforce platform.",
    },
    { type: "heading3", text: "Customer Portal" },
    {
      type: "paragraph",
      text: "A self-service portal through Salesforce Community Cloud provides access to multiple users in the same household through their unique IDs.",
    },
    { type: "heading2", text: "Implementation Highlights" },
    {
      type: "list",
      style: "bullet",
      items: [
        "**Configuration-first delivery**, using objects and business rules to provide domain-specific flows rather than custom development for every requirement",
        "**Aggregated financial data**, including third-party data, stock values, and risk simulation, unified in one platform",
        "**A dedicated Java service** handling CPU-intensive planning computations alongside the Salesforce platform",
        "**Household-level self-service access**, letting multiple users in the same household log in with their own unique IDs",
      ],
    },
    { type: "heading2", text: "Business Outcomes" },
    {
      type: "paragraph",
      text: "The portal gave financial advisors an out-of-the-box, cost-effective core system to get a holistic view of their clients — replacing the two or more disconnected systems advisors previously relied on, and bringing planning simulations onto the Salesforce platform for the first time.",
    },
    { type: "heading2", text: "Key Results" },
    {
      type: "list",
      style: "bullet",
      items: [
        "**A single core system** replacing the two or more disconnected tools advisors previously used to get a holistic client view",
        "**In-platform planning simulations**, closing a gap no other Salesforce financial planning app addressed at the time",
        "**Self-service household access**, giving multiple users in the same household their own unique logins",
        "**A cost-effective, out-of-the-box implementation**, built through configuration rather than extensive custom development",
      ],
    },
    { type: "heading2", text: "Technologies Used" },
    {
      type: "list",
      style: "bullet",
      items: ["Salesforce Community Cloud (Experience Cloud)", "Custom Java application", "Third-party financial data integration"],
    },
    { type: "heading2", text: "Lessons Learned" },
    {
      type: "paragraph",
      text: "This engagement showed that configuration-first delivery — using Salesforce's own objects and business rules rather than reaching for custom code by default — can deliver a domain-specific experience while keeping the system cost-effective and maintainable. It also reinforced that not every workload belongs inside Salesforce: pairing the platform with a purpose-built Java service for CPU-intensive risk simulations kept the core CRM responsive while still delivering planning features natively to advisors and clients, an approach consistent with how Salesforce documents [extending platform capabilities with external services](https://www.salesforce.com/). Finally, household-level self-service access proved that a financial planning portal needs to model real client relationships, not just individual logins, since multiple family members often need visibility into the same accounts.",
    },
    { type: "heading2", text: "About Mirketa" },
    {
      type: "paragraph",
      text: "Mirketa Inc. is a Salesforce Crest (Gold) Consulting Partner specializing in digital transformation solutions across Education, Healthcare, and Nonprofit sectors, with additional experience delivering [Salesforce Financial Services](/salesforce-financial-services) and Community Cloud (Experience Cloud) solutions for financial advisory firms. With deep expertise across the Salesforce platform, Mirketa enables organizations to achieve automation, scalability, and superior user experiences. Headquartered in Dublin, California, with delivery centers in Noida and Bangalore, Mirketa has successfully delivered hundreds of Salesforce implementations globally.",
    },
    {
      type: "faq",
      items: [
        {
          question: "What is Salesforce Community Cloud, and is it still called that?",
          answer:
            "Salesforce Community Cloud is the platform used to build self-service portals for external users like clients or partners. Salesforce has since renamed it Experience Cloud, though it provides the same underlying portal and community-building capabilities described in this implementation.",
        },
        {
          question: "Why did financial advisors need a portal that aggregates data from multiple systems?",
          answer:
            "Before this solution, advisors used two or more disconnected systems to get a holistic view of a client's banking and investment assets, planning, and alerts. Aggregating that data into one platform removed the need to manually cross-reference multiple tools for a single client conversation.",
        },
        {
          question: "Why was a separate Java application built alongside the Salesforce platform?",
          answer:
            "Financial planning and risk simulation involve CPU-intensive computations that aren't well suited to Salesforce's platform limits. A dedicated Java service handled those computations and fed the results back into Salesforce, keeping the core CRM responsive.",
        },
        {
          question: "Can multiple people in the same household access the same financial planning portal?",
          answer:
            "Yes. The self-service customer portal, built on Salesforce Community Cloud, gives multiple users within the same household access through their own unique IDs, rather than sharing a single login.",
        },
        {
          question: "Does this financial planning solution require heavy custom development?",
          answer:
            "No. Mirketa's approach favored configuring Salesforce objects and business rules to deliver domain-specific flows, which kept the resulting system cost-effective and closer to an out-of-the-box implementation than a fully custom build.",
        },
        {
          question: "How is this different from other financial planning apps available on the Salesforce platform?",
          answer:
            "At the time of this implementation, no other system available on the Salesforce platform aggregated financial data or ran planning simulations natively within Salesforce — planning simulations typically had to be done outside the platform, which this solution brought in-platform.",
        },
      ],
    },
    {
      type: "callout",
      text: "Still stitching together multiple systems to get a holistic view of your clients? [Schedule a consultation with Mirketa](/company/contact) to talk through your Salesforce financial services roadmap, explore our [Salesforce Financial Services solutions](/salesforce-financial-services), or read more Customer Success stories — including how we [implemented Salesforce CRM for a growing insurance agency](/blog/salesforce-crm-implementation-growing-insurance-agency) and [built an integrated KYC and CPQ onboarding flow](/blog/integrated-kyc-cpq-b2b-onboarding-salesforce).",
    },
  ],
};
