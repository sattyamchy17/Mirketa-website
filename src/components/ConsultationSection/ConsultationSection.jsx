import { Images } from "../../assets/images/index.js";
import ContactForm from "../ContactForm/ContactForm.jsx";
import "./ConsultationSection.css";

const DEFAULT_BENEFITS = [
  "A specialist follows up within one business day",
  "A no-obligation conversation about your specific goals",
  "Answers from someone who actually works in this space",
  "Your information stays confidential",
];

const DEFAULT_TRUST_BADGES = [
  { icon: Images.clientSalesforce, label: "Certified Partner" },
  { icon: Images.clientSoc2, label: "SOC 2 Certified" },
  { icon: Images.clientHipaa, label: "HIPAA Ready" },
  { icon: Images.clientEnterprise, label: "Enterprise Ready" },
];

const CheckIcon = (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12.5l5 5L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

// Premium below-hero consultation section: a 50/50 content + form
// layout, with the shared ContactForm restyled into a glassmorphism
// card on the right. Never a bespoke form — this only restyles the
// presentation around the existing shared component. `benefits` and
// `trustBadges` are optional and come with sensible sitewide
// defaults so every existing call site keeps working unchanged;
// pages can pass their own page-specific values instead.
export default function ConsultationSection({
  eyebrow = "Get Started",
  heading,
  description,
  benefits = DEFAULT_BENEFITS,
  showTrustBadges = true,
  formTitle,
  id = "contact",
  className = "",
  backgroundImage,
}) {
  return (
    <section
      className={`consultation-section ${className}`.trim()}
      id={id}
      aria-labelledby="consultation-section-heading"
      style={backgroundImage ? { "--consultation-bg": `url("${backgroundImage}")` } : undefined}
    >
      <div className="consultation-section__decor consultation-section__decor--a" aria-hidden="true" />
      <div className="consultation-section__decor consultation-section__decor--b" aria-hidden="true" />
      <div className="container consultation-section__inner">
        <div className="consultation-section__content">
          <p className="consultation-section__eyebrow">{eyebrow}</p>
          <h2 id="consultation-section-heading">{heading}</h2>
          {description && <p className="consultation-section__description">{description}</p>}
          {benefits.length > 0 && (
            <ul className="consultation-section__benefits">
              {benefits.map((b) => (
                <li key={b}>
                  <span aria-hidden="true">{CheckIcon}</span>
                  {b}
                </li>
              ))}
            </ul>
          )}
          {showTrustBadges && (
            <div className="consultation-section__trust">
              {DEFAULT_TRUST_BADGES.map((b) => (
                <span className="consultation-section__trust-badge" key={b.label}>
                  <img src={b.icon} alt="" aria-hidden="true" loading="lazy" />
                  {b.label}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="consultation-section__card">
          <ContactForm title={formTitle} />
        </div>
      </div>
    </section>
  );
}
