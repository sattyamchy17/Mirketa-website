import featuredImage from "../../assets/blog/salesforce-service-cloud-ai-sku-recognition-manufacturing/salesforce-service-cloud-ai-sku-recognition.svg";

export const post = {
  id: "salesforce-service-cloud-ai-sku-recognition-manufacturing",
  title: "AI Image Recognition and Salesforce Service Cloud for a Pipes and Faucets Manufacturer",
  slug: "salesforce-service-cloud-ai-sku-recognition-manufacturing",
  author: "Mirketa",
  publishedDate: "2026-08-27",
  category: "Customer Success",
  excerpt:
    "How Mirketa combined NLP, AI image recognition, and Salesforce Service Cloud to automatically match customer failure photos to the right SKU for a pipes and faucets manufacturer.",
  featuredImage,
  featuredImageAlt: "A customer's failure photo flowing through an AI SKU-matching and Salesforce Service Cloud hub into a faster resolved support ticket, representing an AI-powered customer service implementation for a manufacturing brand",
  seoTitle: "AI SKU Recognition on Salesforce Service Cloud",
  seoDescription:
    "See how Mirketa's AI image recognition and Salesforce Service Cloud implementation automated SKU matching and sped up service for a manufacturing brand.",
  primaryKeyword: "AI image recognition Salesforce Service Cloud manufacturing",
  secondaryKeywords: ["SKU identification AI", "Salesforce Service Cloud manufacturing", "NLP email ticket automation", "image recognition customer service", "automated SKU tagging"],
  tags: ["Salesforce Service Cloud", "Customer Success", "Manufacturing", "AI", "Case Management"],
  readingTime: "7 min read",
  content: [
    { type: "heading3", text: "Customer Success Summary" },
    {
      type: "table",
      headers: ["Detail", "Description"],
      rows: [
        ["Client", "A well-known brand in the pipes and faucet business (client name withheld)"],
        ["Industry", "Manufacturing (plumbing and fixtures)"],
        ["Challenge", "Service reps struggled to identify the correct SKU from customer-submitted failure photos across a large catalog of active and inactive items, risking missed SLAs"],
        ["Solution", "NLP-based email parsing, an AI image recognition model trained to match failure photos to SKUs, and Salesforce Service Cloud to tag and track tickets automatically"],
        ["Technologies Used", "Salesforce Service Cloud, Natural Language Processing (NLP), plug-and-play AI image recognition (partner technology)"],
        ["Business Impact", "Significantly improved service manager productivity, minimal manual intervention, and faster complaint resolution"],
      ],
    },
    { type: "heading2", text: "Background & Context" },
    {
      type: "paragraph",
      text: "The client is a well-known brand in the pipes and faucet business. Customers who experienced a product issue would email failure images of the item to the company, and the [manufacturer's](/salesforce/manufacturing-cloud) service team used those images as a reference to provide the needed servicing.",
    },
    { type: "heading2", text: "Business Challenges" },
    {
      type: "paragraph",
      text: "With a large volume of active and inactive items sold, service reps found it difficult to identify the correct SKU of the product referenced in a customer's reported email. The company needed a solution that would resolve customer issues with confidence and within their SLA.",
    },
    {
      type: "list",
      style: "bullet",
      items: [
        "**High SKU volume**, spanning both active and inactive items, made manual SKU identification slow and error-prone",
        "**No systematic way to connect a failure photo to its SKU**, leaving service reps to identify products manually from email images",
        "**SLA pressure**, with the company needing to resolve customer issues confidently and on time",
      ],
    },
    { type: "heading2", text: "Solution Overview" },
    {
      type: "paragraph",
      text: "Mirketa combined Natural Language Processing (NLP) and AI-based image recognition with [Salesforce Service Cloud](/salesforce/service-cloud) to automatically identify the SKU behind a customer's failure photo and tag it directly to the support ticket.",
    },
    { type: "heading2", text: "Architecture & Integration" },
    { type: "heading3", text: "NLP-Based SKU Identification from Email" },
    {
      type: "paragraph",
      text: "To identify the SKU code from the email body, Natural Language Processing was used. With this, the SKU code associated with existing images could be recognized from historical data, which became a training set for the AI model.",
    },
    { type: "heading3", text: "Image Recognition Model Training and Prediction" },
    {
      type: "paragraph",
      text: "The image recognition system was built to compare the image of a SKU with existing data. When a new customer complaint came in with an image but no SKU code, the model predicted the most accurate match and updated it on the respective ticket.",
    },
    { type: "heading3", text: "Self-Improving Prediction Accuracy" },
    {
      type: "paragraph",
      text: "The model was built to incorporate new data by itself over time, improving its prediction accuracy as more failure images and confirmed SKU matches flowed through the system.",
    },
    { type: "heading3", text: "Salesforce Service Cloud Integration" },
    {
      type: "paragraph",
      text: "Mirketa implemented [Salesforce Service Cloud](/salesforce/service-cloud) to streamline the complete customer service function. The function identifies complaints from email and tags the matched SKU with the corresponding ticket, while the service manager can track activity and follow up as needed.",
    },
    { type: "heading2", text: "Implementation Highlights" },
    {
      type: "list",
      style: "bullet",
      items: [
        "**NLP-based email parsing** to extract SKU codes and build a training set from historical data",
        "**AI image recognition** that predicts the correct SKU from a customer's failure photo when no SKU code is provided",
        "**A self-improving model**, incorporating new data automatically to raise prediction accuracy over time",
        "**Automated SKU tagging on tickets** through Salesforce Service Cloud, eliminating manual tagging work for the service manager",
      ],
    },
    { type: "heading2", text: "Business Outcomes" },
    {
      type: "paragraph",
      text: "By automating SKU identification from both email text and customer-submitted images, and tagging that information directly onto Service Cloud tickets, the service team no longer had to manually track down which product a customer's failure photo referred to — letting them focus on resolving the issue itself.",
    },
    { type: "heading2", text: "Key Results" },
    {
      type: "list",
      style: "bullet",
      items: [
        "**Significantly improved service manager productivity**, following the Service Cloud and image recognition implementation",
        "**Manual intervention minimized to the lowest level**, as SKU tagging no longer required manual lookup",
        "**Improved customer satisfaction**, driven by faster resolution of complaints",
        "**An easy-to-access, plug-and-play recognition system** that was simple for the service team to use",
      ],
    },
    { type: "heading2", text: "Technologies Used" },
    {
      type: "list",
      style: "bullet",
      items: ["[Salesforce Service Cloud](https://www.salesforce.com/)", "Natural Language Processing (NLP) for email parsing", "Plug-and-play AI image recognition (partner technology)"],
    },
    { type: "heading2", text: "Lessons Learned" },
    {
      type: "paragraph",
      text: "This engagement showed that text and image data often need to be treated as two separate, complementary signals rather than one problem: NLP handled the cases where a SKU code appeared in the email body, while image recognition filled the gap for customers who sent a photo with no SKU at all. Combining both, rather than relying on one, is what let the model handle the full range of how customers actually described their issue. It also reinforced the value of a self-improving model over a static one — since the catalog spans both active and inactive items, a model that keeps incorporating new confirmed matches stays accurate as the product line evolves, instead of degrading as new SKUs are introduced.",
    },
    { type: "heading2", text: "About Mirketa" },
    {
      type: "paragraph",
      text: "Mirketa Inc. is a Salesforce Crest (Gold) Consulting Partner specializing in digital transformation solutions across Education, Healthcare, and Nonprofit sectors, with additional experience delivering [Salesforce Service Cloud](/salesforce/service-cloud) and AI-powered case automation for manufacturers managing large, complex product catalogs. With deep expertise across the Salesforce platform, Mirketa enables organizations to achieve automation, scalability, and superior user experiences. Headquartered in Dublin, California, with delivery centers in Noida and Bangalore, Mirketa has successfully delivered hundreds of Salesforce implementations globally.",
    },
    {
      type: "faq",
      items: [
        {
          question: "How does AI image recognition identify a product's SKU from a customer photo?",
          answer:
            "The model is trained on existing images already linked to known SKUs. When a new failure photo comes in without a SKU code, it compares that image against the trained data to predict the most accurate match, then updates the ticket automatically.",
        },
        {
          question: "Why use both NLP and image recognition instead of just one?",
          answer:
            "NLP identifies SKU codes mentioned directly in the email body, while image recognition handles cases where a customer sends only a photo with no SKU reference. Together, they cover the different ways customers actually report a product issue.",
        },
        {
          question: "How does the model stay accurate as new products are added?",
          answer:
            "The model was built to incorporate new data by itself, so as more failure images and confirmed SKU matches pass through the system, its prediction accuracy improves rather than degrading as the active and inactive product catalog changes over time.",
        },
        {
          question: "Does this AI image recognition tool run natively inside Salesforce?",
          answer:
            "In this implementation, the image recognition capability was a plug-and-play AI tool from a partner technology, integrated with Salesforce Service Cloud rather than built as a native Salesforce feature.",
        },
        {
          question: "How does Salesforce Service Cloud fit into this solution?",
          answer:
            "Salesforce Service Cloud streamlines the customer service function end to end — it identifies complaints coming in by email, tags the matched SKU to the ticket, and gives the service manager a way to track activity and follow up on open cases.",
        },
        {
          question: "Is this SKU-matching approach specific to pipes and faucet manufacturers?",
          answer:
            "No. While this engagement was with a pipes and faucet manufacturer, the same approach — combining NLP and image recognition with Salesforce Service Cloud — applies to any manufacturer with a large product catalog where customers report issues by photo or email.",
        },
      ],
    },
    {
      type: "callout",
      text: "Struggling to match customer photos or emails to the right product across a large catalog? [Schedule a consultation with Mirketa](/company/contact) to talk through your Salesforce Service Cloud and AI roadmap, explore our [Manufacturing Cloud services](/salesforce/manufacturing-cloud), or read more Customer Success stories — including how we [enhanced service with Salesforce Service Cloud and Einstein AI for an industrial equipment manufacturer](/blog/salesforce-service-cloud-industrial-equipment-manufacturer) and [transformed sales and operations with Salesforce Einstein AI for a precision components manufacturer](/blog/salesforce-einstein-ai-precision-components-manufacturer).",
    },
  ],
};
