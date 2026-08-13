import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Seo from "../../components/Seo/Seo.jsx";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb.jsx";
import ConsultationSection from "../../components/ConsultationSection/ConsultationSection.jsx";
import "./Contact.css";

const BREADCRUMB_ITEMS = [{ label: "Home", href: "/" }, { label: "Contact" }];

gsap.registerPlugin(ScrollTrigger);

// ============================================================
// DATA — the phone number and LinkedIn URL below are the only
// real, already-published contact channels found anywhere in this
// project (see Header.jsx's top strip and Footer.jsx's social
// links). No email, address, or booking URL is invented here.
// ============================================================

const HERO = {
  eyebrow: "Contact",
  heading: "Let's Talk About What's Next",
  paragraph:
    "Tell us about your goals and we'll connect you with the right person on our team — whether that's a quick question or a deeper conversation about your roadmap.",
  primaryCta: { label: "Fill Out the Form", href: "#contact-form" },
  secondaryCta: { label: "Book a Discovery Call", href: "#book" },
};

const DISCOVERY_CALL = {
  eyebrow: "Discovery Call",
  heading: "Book a Discovery Call",
  paragraph:
    "A discovery call is a no-obligation conversation with a Mirketa consultant about your goals, current systems, and where Salesforce, AI, data, or platform expertise could help. There's no fixed agenda beyond understanding what you're trying to solve.",
  points: [
    "A conversation focused on your specific goals and current systems",
    "Straightforward guidance on whether Mirketa is the right fit",
    "No pressure, no fixed agenda",
  ],
  cta: { label: "Request a Discovery Call", href: "#contact-form" },
};

const CONSULTATION = {
  eyebrow: "Get Started",
  heading: "Talk to an Expert",
  description: "Share a few details about your goals and one of our consultants will follow up within one business day.",
  formTitle: "Talk to an Expert",
  id: "contact-form",
};

const CONTACT_CHANNELS = {
  eyebrow: "Other Ways to Reach Us",
  heading: "Prefer to Connect Directly?",
  phone: { label: "+1 (855) MIRKETA", href: "tel:+18556475382" },
  linkedin: { label: "Mirketa on LinkedIn", href: "https://www.linkedin.com/company/mirketainc" },
};

const SEO = {
  title: "Contact Mirketa | Talk to Our Experts",
  description:
    "Get in touch with Mirketa to talk with an expert or book a discovery call about Salesforce, AI, data, and enterprise technology initiatives.",
  canonical: "https://www.mirketa.com/company/contact/",
  keywords: ["Contact Mirketa", "Talk to an Expert", "Book a Discovery Call", "Mirketa consulting contact"],
  schema: [
    {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      name: "Contact Mirketa",
      url: "https://www.mirketa.com/company/contact/",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.mirketa.com/" },
        { "@type": "ListItem", position: 2, name: "Contact", item: "https://www.mirketa.com/company/contact/" },
      ],
    },
  ],
};

// ============================================================
// SHARED HOOKS — scoped to this page.
// ============================================================

function useRipple() {
  return (e) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const ripple = document.createElement("span");
    const size = Math.max(rect.width, rect.height);
    ripple.className = "btn-ripple";
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
    btn.appendChild(ripple);
    ripple.addEventListener("animationend", () => ripple.remove());
  };
}

// ============================================================
// PAGE
// ============================================================
export default function Contact() {
  const heroTextRef = useRef(null);
  const ripple = useRipple();

  // Light-background hero: the sitewide header defaults to white text
  // assuming a dark hero, so this toggles the same override every other
  // light-background hero on the site already relies on (see Header.css
  // ".has-light-hero" / Breadcrumb.css ".breadcrumb--dark").
  useEffect(() => {
    document.documentElement.classList.add("has-light-hero");
    return () => document.documentElement.classList.remove("has-light-hero");
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.from(heroTextRef.current.children, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
      });

      gsap.utils.toArray(".ct-reveal").forEach((el) => {
        gsap.from(el, {
          y: 32,
          opacity: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="contact-page">
      <Seo {...SEO} />
      <HeroSection ripple={ripple} textRef={heroTextRef} />
      <DiscoveryCallSection ripple={ripple} />
      <ContactFormSection />
      <ContactChannelsSection />
    </div>
  );
}

// ================= HERO =================
function HeroSection({ ripple, textRef }) {
  return (
    <section className="ct-hero" aria-label="Contact Mirketa introduction">
      <div className="container">
        <Breadcrumb items={BREADCRUMB_ITEMS} className="ct-breadcrumb breadcrumb--dark" />
      </div>
      <div className="container ct-hero__inner">
        <div className="ct-hero__text" ref={textRef}>
          <span className="ct-eyebrow">{HERO.eyebrow}</span>
          <h1>{HERO.heading}</h1>
          <p className="ct-hero__paragraph">{HERO.paragraph}</p>
          <div className="ct-hero__ctas">
            <a href={HERO.primaryCta.href} className="btn btn-primary ct-btn" onClick={ripple}>
              {HERO.primaryCta.label}
              <span className="btn-arrow">&rarr;</span>
            </a>
            <a href={HERO.secondaryCta.href} className="btn btn-secondary ct-btn">
              {HERO.secondaryCta.label}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ================= DISCOVERY CALL =================
function DiscoveryCallSection({ ripple }) {
  return (
    <section className="section ct-discovery" id="book" aria-labelledby="ct-discovery-heading">
      <div className="content-wrap ct-discovery__inner">
        <div className="ct-discovery__text ct-reveal">
          <span className="ct-eyebrow">{DISCOVERY_CALL.eyebrow}</span>
          <h2 id="ct-discovery-heading">{DISCOVERY_CALL.heading}</h2>
          <p>{DISCOVERY_CALL.paragraph}</p>
          <a href={DISCOVERY_CALL.cta.href} className="btn btn-primary ct-btn" onClick={ripple}>
            {DISCOVERY_CALL.cta.label}
            <span className="btn-arrow">&rarr;</span>
          </a>
        </div>
        <ul className="ct-discovery__points ct-reveal">
          {DISCOVERY_CALL.points.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// ================= CONTACT FORM =================
function ContactFormSection() {
  return <ConsultationSection {...CONSULTATION} />;
}

// ================= OTHER WAYS TO REACH US =================
function ContactChannelsSection() {
  return (
    <section className="section ct-channels" aria-labelledby="ct-channels-heading">
      <div className="content-wrap ct-channels__inner ct-reveal">
        <span className="ct-eyebrow">{CONTACT_CHANNELS.eyebrow}</span>
        <h2 id="ct-channels-heading">{CONTACT_CHANNELS.heading}</h2>
        <div className="ct-channels__list">
          <a href={CONTACT_CHANNELS.phone.href} className="ct-channel">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6.6 10.8c1.5 3 3.9 5.4 6.9 6.9l2.3-2.3c.3-.3.7-.4 1-.2 1.2.5 2.5.8 3.9.8.6 0 1 .4 1 1v3.6c0 .6-.4 1-1 1C11.4 21.6 2.4 12.6 2.4 1.3c0-.6.4-1 1-1H7c.6 0 1 .4 1 1 0 1.4.3 2.7.8 3.9.1.3.1.7-.2 1L6.6 10.8z" fill="currentColor" />
            </svg>
            {CONTACT_CHANNELS.phone.label}
          </a>
          <a href={CONTACT_CHANNELS.linkedin.href} target="_blank" rel="noopener noreferrer" className="ct-channel">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M4.98 3.5a2.5 2.5 0 11-.02 5.01A2.5 2.5 0 014.98 3.5zM3 9h4v12H3V9zm7 0h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.5c0-1.3-.02-3-1.83-3-1.83 0-2.1 1.43-2.1 2.9V21h-4V9z" />
            </svg>
            {CONTACT_CHANNELS.linkedin.label}
          </a>
        </div>
      </div>
    </section>
  );
}
