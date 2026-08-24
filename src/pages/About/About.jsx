import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Images } from "../../assets/images/index.js";
import Seo from "../../components/Seo/Seo.jsx";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb.jsx";
import ConsultationSection from "../../components/ConsultationSection/ConsultationSection.jsx";
import HeroVisual from "../../components/HeroVisual/HeroVisual.jsx";
import rajeevPhoto from "../../assets/Team/ceo (1).jpg";
import maureenPhoto from "../../assets/Team/Maureen (1).jpg";
import salilPhoto from "../../assets/Team/Salil-Prasad.jpg";
import ajayPhoto from "../../assets/Team/Ajay.jpg";
import rahulPhoto from "../../assets/Team/Rahul-Pasricha.jpg";
import priyankaPhoto from "../../assets/Team/HR2-copy.webp";
import "./About.css";

const BREADCRUMB_ITEMS = [{ label: "Home", href: "/" }, { label: "About Us" }];

gsap.registerPlugin(ScrollTrigger);

const Ico = {
  shield: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="M9 12l2 2 4-4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  users: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" /><path d="M3.5 20c0-3 2.5-5 5.5-5s5.5 2 5.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><circle cx="17" cy="9" r="2.4" stroke="currentColor" strokeWidth="1.4" /><path d="M15 20c.3-2.2 1.8-3.6 3.6-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
  ),
};

// ============================================================
// DATA
// Every factual claim below (partner status, certifications,
// culture award) is reused from content already published
// elsewhere on this site (see src/pages/Home/Home.js TRUST_BADGES
// and PARTNERS) — nothing here is a new or invented claim.
// ============================================================

const HERO = {
  eyebrow: "About Mirketa",
  heading: "The People Behind Mirketa's Salesforce, AI, and Data Transformation Work",
  paragraph:
    "Mirketa is an enterprise technology consulting company that helps organizations modernize how they work with Salesforce, AI, data, and cloud platforms. Behind every engagement is a team of consultants, architects, and engineers who bring platform depth to real business outcomes.",
  primaryCta: { label: "Talk to an Expert", href: "#contact" },
  secondaryCta: { label: "Meet the Team", href: "#team" },
};

const HERO_DASHBOARD = {
  title: "Mirketa at a Glance",
  liveLabel: "Since 2013",
  stats: [
    { label: "Salesforce Partnership", value: "Crest Partner", caption: "Enterprise clients since 2013" },
    { label: "Workplace Recognition", value: "Inc. Best", caption: "Recognized as a Best Workplace" },
  ],
  rows: [
    { title: "Salesforce Practice", meta: "Consulting, development, and managed services", status: "Crest Partner", tone: "good" },
    { title: "Security & Compliance", meta: "SOC 2 Type II certified, HIPAA-ready", status: "Certified", tone: "good" },
    { title: "AI & Data Foundations", meta: "Readiness, governance, agentic orchestration", status: "Active", tone: "neutral" },
  ],
  floatingCards: [
    { icon: Ico.shield, title: "SOC 2 Type II", subtitle: "HIPAA-ready delivery" },
    { icon: Ico.users, title: "Senior-Led Teams", subtitle: "Engaged strategy through go-live" },
  ],
};

const ABOUT = {
  eyebrow: "Who We Are",
  heading: "Technology Expertise That Drives Meaningful Transformation",
  paragraphs: [
    "Mirketa is an enterprise technology consulting company helping organizations modernize how they work with Salesforce, AI, data, and cloud platforms. Since 2013, we've partnered with enterprise clients as a Salesforce Crest Partner — combining platform depth with delivery discipline, SOC 2 Type II certified and HIPAA-ready, to move initiatives from strategy into production.",
    "Our work spans Salesforce consulting and development, agentic AI and data foundations, enterprise integration, and industry-specific delivery for healthcare, financial services, manufacturing, and nonprofit organizations. Whatever the platform, the goal is the same: measurable business outcomes, not just deployed technology.",
  ],
};

const VALUES = [
  { title: "Customer First", description: "We start every engagement with the outcome the client actually needs, not the technology we'd prefer to sell." },
  { title: "Build with Purpose", description: "Every system we design is built to solve a specific business problem, not just to demonstrate technical capability." },
  { title: "Continuous Innovation", description: "Platforms like Salesforce, AI, and data infrastructure evolve constantly — so does the way we implement them." },
  { title: "Collaboration", description: "We work alongside client teams, not around them, so knowledge and ownership transfer along with the technology." },
  { title: "Transformation", description: "The measure of a project isn't go-live day — it's whether the organization operates differently, and better, afterward." },
];

const EXPERTISE = [
  { title: "Salesforce", description: "Consulting, development, and managed services across Sales, Service, Marketing, Revenue, and Health Cloud.", href: "/platforms/salesforce/clouds" },
  { title: "AI Solutions", description: "AI readiness, roadmap governance, agentic orchestration, and agent development for enterprise teams.", href: "/ai-consulting" },
  { title: "Data & Analytics", description: "Unified, AI-ready data foundations across CRM, ERP, and legacy systems.", href: "/ai-data-foundations" },
  { title: "Healthcare", description: "HIPAA-ready systems and workflows for hospitals, payers, and life sciences organizations.", href: "/industry/healthcare" },
  { title: "Enterprise Technology", description: "NetSuite, Workday, ServiceNow, and Oracle consulting and managed services.", href: "/platforms/servicenow" },
  { title: "Digital Transformation", description: "End-to-end modernization from legacy systems to cloud-native, AI-enabled platforms.", href: "/ai-readiness" },
];

// Real team profiles. No LinkedIn URLs are included since no verified
// individual profile links exist in the project — do not add any.
const TEAM_MEMBERS = [
  {
    name: "Rajeev Kumar",
    title: "CEO and CPO",
    bio: "Over 18 years of experience in managing high performing teams, leading organization transformations and building business solutions using BPM, SaaS, Mobile and Web technologies.",
    photo: rajeevPhoto,
  },
  {
    name: "Maureen M. Kumar",
    title: "CFO",
    bio: "Over 20 years of experience in management roles in corporate finance.",
    photo: maureenPhoto,
  },
  {
    name: "Salil Prasad",
    title: "Advisor",
    bio: "Over 20 years of experience in the industry with the focus on large system development. Currently working as the CEO of Home Healthcare Agency based out of San Ramon.",
    photo: salilPhoto,
  },
  {
    name: "Ajay Jalali",
    title: "VP-Delivery & Operations",
    bio: "Seasoned IT Leader with deep industry knowledge and a broad range of capabilities in global delivery engagements. Over 30 years of IT experience working with OneShield, Capgemini (Capgemini, IGATE, and Patni), Steria (IIS and Xansa), and IMR including 10+ years at customer locations in the USA and Europe.",
    photo: ajayPhoto,
  },
  {
    name: "Rahul Pasricha",
    title: "Associate Director",
    bio: "Strong and enthusiastic product management professional with cross-functional experience and in-depth understanding of technology, business, and tech-enabled business.",
    photo: rahulPhoto,
  },
  {
    name: "Priyanka Goyal",
    title: "Associate Director",
    bio: "Over 17 years of established professional credentials of successfully managing HR Department, Pre & Post Recruitment process, Employee induction, Performance Management, Employee Relations, Training & Development, Statutory Compliances, Manpower Planning, Grievance Handling.",
    photo: priyankaPhoto,
  },
];

const CULTURE = {
  eyebrow: "Our Culture",
  heading: "Built by People Who Care About the Outcome",
  paragraphs: [
    "Mirketa has been recognized as one of Inc.'s Best Workplaces — a reflection of how our teams collaborate day to day, across time zones and disciplines, to deliver enterprise technology work that holds up in production.",
    "We work in small, senior-led teams that stay engaged from strategy through go-live and beyond, so the people who scope the work are the same people accountable for it landing.",
  ],
};

const FINAL_CTA = {
  heading: "Let's Build What Comes Next",
  paragraph: "Whether you're modernizing Salesforce, standing up an AI roadmap, or unifying your data foundation, Mirketa's team is ready to help you move from strategy to production.",
  primaryCta: { label: "Talk to an Expert", href: "#contact" },
  secondaryCta: { label: "Book a Discovery Call", href: "#contact" },
};

const CONSULTATION = {
  eyebrow: "Get Started",
  heading: "Schedule a Conversation With Our Team",
  description: "Tell us about your goals and one of our consultants will follow up within one business day.",
  formTitle: "Talk to an Expert",
};

const SEO = {
  title: "About Mirketa | Salesforce, AI & Technology Consulting",
  description:
    "Learn about Mirketa's team, technology expertise, and approach to helping organizations transform with Salesforce, AI, data, and enterprise technology.",
  canonical: "https://www.mirketa.com/about-us/",
  keywords: [
    "About Mirketa",
    "Mirketa team",
    "Salesforce consulting company",
    "AI consulting company",
    "enterprise technology consulting",
    "Mirketa Inc",
  ],
  schema: [
    {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      name: "About Mirketa",
      url: "https://www.mirketa.com/about-us/",
      description: "Mirketa is an enterprise technology consulting company helping organizations modernize with Salesforce, AI, data, and cloud platforms.",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.mirketa.com/" },
        { "@type": "ListItem", position: 2, name: "About Us", item: "https://www.mirketa.com/about-us/" },
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
export default function About() {
  const heroTextRef = useRef(null);
  const ripple = useRipple();

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

      gsap.utils.toArray(".abt-reveal").forEach((el) => {
        gsap.from(el, {
          y: 32,
          opacity: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      gsap.utils.toArray(".abt-reveal-stagger").forEach((group) => {
        gsap.from(group.children, {
          y: 26,
          opacity: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: { trigger: group, start: "top 85%" },
        });
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="about-page">
      <Seo {...SEO} />
      <HeroSection ripple={ripple} textRef={heroTextRef} />
      <WhoWeAreSection />
      <ValuesSection />
      <ExpertiseSection />
      <TeamSection />
      <CultureSection />
      <FinalCtaSection ripple={ripple} />
      <ContactSection />
    </div>
  );
}

// ================= HERO =================
function HeroSection({ ripple, textRef }) {
  return (
    <section className="abt-hero" aria-label="About Mirketa introduction" style={{ backgroundImage: `url("${Images.heroAboutUs}")` }}>
      <div className="abt-hero__overlay" />
      <div className="container">
        <Breadcrumb items={BREADCRUMB_ITEMS} className="abt-breadcrumb" />
      </div>
      <div className="container abt-hero__inner">
        <div className="abt-hero__text" ref={textRef}>
          <span className="abt-eyebrow">{HERO.eyebrow}</span>
          <h1>{HERO.heading}</h1>
          <p className="abt-hero__paragraph">{HERO.paragraph}</p>
          <div className="abt-hero__ctas">
            <a href={HERO.primaryCta.href} className="btn btn-primary abt-btn" onClick={ripple}>
              {HERO.primaryCta.label}
              <span className="btn-arrow">&rarr;</span>
            </a>
            <a href={HERO.secondaryCta.href} className="btn btn-secondary abt-btn">
              {HERO.secondaryCta.label}
            </a>
          </div>
        </div>

        <HeroVisual
          dashboardTitle={HERO_DASHBOARD.title}
          liveLabel={HERO_DASHBOARD.liveLabel}
          stats={HERO_DASHBOARD.stats}
          rows={HERO_DASHBOARD.rows}
          floatingCards={HERO_DASHBOARD.floatingCards}
          className="abt-hero__visual"
        />
      </div>

      <button
        className="abt-scroll-indicator"
        aria-label="Scroll to next section"
        onClick={() => document.getElementById("abt-who")?.scrollIntoView({ behavior: "smooth" })}
      >
        <span />
      </button>
    </section>
  );
}

// ================= WHO WE ARE =================
function WhoWeAreSection() {
  return (
    <section className="section abt-who" id="abt-who" aria-labelledby="abt-who-heading">
      <div className="content-wrap">
        <div className="section-heading abt-reveal">
          <span className="abt-eyebrow">{ABOUT.eyebrow}</span>
          <h2 id="abt-who-heading">{ABOUT.heading}</h2>
        </div>

        <div className="abt-who__copy abt-reveal">
          {ABOUT.paragraphs.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
      </div>
    </section>
  );
}

// ================= WHAT WE BELIEVE =================
function ValuesSection() {
  return (
    <section className="section abt-values" aria-labelledby="abt-values-heading">
      <div className="content-wrap">
        <div className="section-heading abt-reveal">
          <span className="abt-eyebrow">What We Believe</span>
          <h2 id="abt-values-heading">The Principles Behind How We Work</h2>
        </div>

        <div className="abt-values__grid abt-reveal-stagger">
          {VALUES.map((v) => (
            <div className="abt-value-card" key={v.title}>
              <h3>{v.title}</h3>
              <p>{v.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ================= OUR EXPERTISE =================
function ExpertiseSection() {
  return (
    <section className="section abt-expertise" aria-labelledby="abt-expertise-heading">
      <div className="content-wrap">
        <div className="section-heading abt-reveal">
          <span className="abt-eyebrow">What We Do</span>
          <h2 id="abt-expertise-heading">Where We Focus</h2>
        </div>

        <div className="abt-expertise__grid abt-reveal-stagger">
          {EXPERTISE.map((e) => (
            <Link to={e.href} className="abt-expertise-card" key={e.title}>
              <h3>{e.title}</h3>
              <p>{e.description}</p>
              <span className="abt-expertise-card__link">
                Learn More <span className="btn-arrow">&rarr;</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// ================= MEET OUR TEAM =================
function TeamCard({ member }) {
  return (
    <article className="abt-team-card">
      <div className="abt-team-card__media">
        <img src={member.photo} alt={`${member.name}, ${member.title} at Mirketa`} loading="lazy" />
      </div>
      <div className="abt-team-card__body">
        <h3>{member.name}</h3>
        <p className="abt-team-card__title">{member.title}</p>
        <p className="abt-team-card__bio">{member.bio}</p>
        {member.linkedin && (
          <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="abt-team-card__linkedin" aria-label={`${member.name} on LinkedIn`}>
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M4.98 3.5a2.5 2.5 0 11-.02 5.01A2.5 2.5 0 014.98 3.5zM3 9h4v12H3V9zm7 0h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.5c0-1.3-.02-3-1.83-3-1.83 0-2.1 1.43-2.1 2.9V21h-4V9z" />
            </svg>
          </a>
        )}
      </div>
    </article>
  );
}

function TeamSection() {
  return (
    <section className="section abt-team" id="team" aria-labelledby="abt-team-heading">
      <div className="content-wrap">
        <div className="section-heading abt-reveal">
          <span className="abt-eyebrow">Our People</span>
          <h2 id="abt-team-heading">Meet Our Team</h2>
          <p>Meet the people behind Mirketa's technology, consulting, and transformation journey.</p>
        </div>

        <div className="abt-team__grid abt-reveal-stagger">
          {TEAM_MEMBERS.map((member) => (
            <TeamCard member={member} key={member.name} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ================= CULTURE / PEOPLE =================
function CultureSection() {
  return (
    <section className="section abt-culture" aria-labelledby="abt-culture-heading">
      <div className="content-wrap abt-culture__inner">
        <div className="abt-culture__text abt-reveal">
          <span className="abt-eyebrow">{CULTURE.eyebrow}</span>
          <h2 id="abt-culture-heading">{CULTURE.heading}</h2>
          {CULTURE.paragraphs.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
        <div className="abt-culture__visual abt-reveal" aria-hidden="true">
          <img src={Images.illoTeamCollaboration} alt="" loading="lazy" />
        </div>
      </div>
    </section>
  );
}

// ================= FINAL CTA =================
function FinalCtaSection({ ripple }) {
  return (
    <section className="section abt-final-cta" aria-labelledby="abt-final-cta-heading">
      <div className="content-wrap abt-final-cta__inner abt-reveal">
        <h2 id="abt-final-cta-heading">{FINAL_CTA.heading}</h2>
        <p>{FINAL_CTA.paragraph}</p>
        <div className="abt-final-cta__ctas">
          <a href={FINAL_CTA.primaryCta.href} className="btn btn-primary abt-btn" onClick={ripple}>
            {FINAL_CTA.primaryCta.label}
            <span className="btn-arrow">&rarr;</span>
          </a>
          <a href={FINAL_CTA.secondaryCta.href} className="btn btn-secondary abt-btn">
            {FINAL_CTA.secondaryCta.label}
          </a>
        </div>
      </div>
    </section>
  );
}

// ================= CONTACT =================
function ContactSection() {
  return <ConsultationSection {...CONSULTATION} />;
}
