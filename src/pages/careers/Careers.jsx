import { Link } from "react-router-dom";
import Seo from "../../components/Seo/Seo.jsx";
import HeroVisual from "../../components/HeroVisual/HeroVisual.jsx";
import { Images } from "../../assets/images/index.js";
import { CAREER_PAGES } from "../../config/pageSlugs.js";
import { JOBS } from "./jobs/index.js";
import "./Careers.css";

// ============================================================
// SEO CONFIGURATION
// ============================================================
export const pageSEO = {
  slug: `${CAREER_PAGES.HUB.slug}/`,
  title: "Careers at Mirketa | Technology Jobs & Opportunities",
  description: "Explore career opportunities at Mirketa and join teams working across Salesforce, AI, healthcare, cloud, and enterprise technology.",
};

const SEO = {
  title: pageSEO.title,
  description: pageSEO.description,
  canonical: `https://mirketa.us${pageSEO.slug}`,
  keywords: ["Mirketa careers", "technology jobs", "Salesforce careers", "cybersecurity jobs", "enterprise technology careers"],
  schema: [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://mirketa.us/" },
        { "@type": "ListItem", position: 2, name: "Careers", item: `https://mirketa.us${pageSEO.slug}` },
      ],
    },
  ],
};

// ============================================================
// ICONS
// ============================================================
const Ico = {
  layers: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3l9 5-9 5-9-5 9-5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M3 13l9 5 9-5" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  users: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="9" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.4" /><path d="M3.5 19c.6-3.4 2.9-5.2 5.5-5.2s4.9 1.8 5.5 5.2" stroke="currentColor" strokeWidth="1.4" /><circle cx="17" cy="9" r="2.6" stroke="currentColor" strokeWidth="1.3" opacity="0.7" /><path d="M15.5 13.4c2.2.3 3.7 1.9 4 4.6" stroke="currentColor" strokeWidth="1.3" opacity="0.7" /></svg>
  ),
  compass: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" /><path d="M15 9l-2 6-6 2 2-6 6-2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
  ),
  chart: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 20V10M12 20V4M20 20v-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
  ),
  globe: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.4" /><path d="M3 12h18M12 3c2.5 2.5 3.8 5.6 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.6-3.8-9s1.3-6.5 3.8-9z" stroke="currentColor" strokeWidth="1.2" /></svg>
  ),
  spark: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3l1.8 5.6L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.4L12 3z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /></svg>
  ),
  puzzle: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 4h4a1 1 0 011 1v2a2 2 0 104 0V5a1 1 0 011-1h1v14h-1a1 1 0 01-1-1v-2a2 2 0 10-4 0v2a1 1 0 01-1 1H9v-5H7a2 2 0 100-4h2V4z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" /></svg>
  ),
  route: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="6" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.4" /><circle cx="18" cy="18" r="2.5" stroke="currentColor" strokeWidth="1.4" /><path d="M6 8.5V13a4 4 0 004 4h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
  ),
  arrow: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  pin: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 21s-6.5-6-6.5-11A6.5 6.5 0 1118.5 10c0 5-6.5 11-6.5 11z" stroke="currentColor" strokeWidth="1.4" /><circle cx="12" cy="10" r="2.2" stroke="currentColor" strokeWidth="1.3" /></svg>
  ),
  clock: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" /><path d="M12 7v5l3.5 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
  ),
  briefcase: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="7" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.4" /><path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" stroke="currentColor" strokeWidth="1.4" /><path d="M3 12h18" stroke="currentColor" strokeWidth="1.4" /></svg>
  ),
};

// ============================================================
// CONTENT — qualitative descriptions only; no fabricated
// headcount, benefits, salary, or policy claims anywhere below.
// ============================================================
const HERO = {
  heading: "Build What Matters. Grow With Mirketa.",
  description: "Join a team solving complex technology challenges across Salesforce, healthcare, cloud, AI, enterprise applications, and digital transformation.",
  primaryCta: { label: "View Open Positions", href: "#job-openings" },
  secondaryCta: { label: "Life at Mirketa", href: "#why-join" },
};

const HERO_DASHBOARD = {
  title: "Mirketa Careers",
  stats: [
    { label: "OPEN POSITIONS", value: String(JOBS.length), caption: "Across engineering & security" },
    { label: "DELIVERY", value: "US & Europe", caption: "Client-facing project teams" },
    { label: "FOCUS", value: "AI-Native", caption: "Enterprise transformation" },
  ],
  rows: JOBS.slice(0, 3).map((job) => ({ title: job.title, meta: `${job.location} · ${job.employmentType}`, tone: "good", status: "Open" })),
};

const WHY_JOIN = {
  eyebrow: "Why Join Mirketa",
  heading: "Work That Actually Moves the Needle",
  intro: "We hire people who want to solve real enterprise problems, not push tickets through a queue.",
  tiles: [
    { icon: Ico.layers, title: "Real Enterprise Transformation", description: "Work on Salesforce, healthcare, cloud, and AI projects for organizations that depend on getting them right.", size: "large" },
    { icon: Ico.spark, title: "Modern Technology, Daily", description: "Hands-on exposure to current platforms and AI tooling instead of legacy maintenance work." },
    { icon: Ico.users, title: "Experienced Technical Teams", description: "Work alongside senior architects and engineers who mentor as part of how delivery happens." },
    { icon: Ico.puzzle, title: "Challenging Business Problems", description: "The kind of problems that require understanding both the technology and the business behind it." },
    { icon: Ico.chart, title: "Room to Grow", description: "Career paths shaped by the platforms and specializations you want to go deeper on." },
    { icon: Ico.globe, title: "Global Client Exposure", description: "Direct exposure to client organizations across the United States and Europe." },
  ],
};

const CULTURE = {
  eyebrow: "Life at Mirketa",
  heading: "A Collaborative, Delivery-Focused Culture",
  paragraphs: [
    "Mirketa's teams are organized around delivery — small, cross-functional groups that own a client engagement from discovery through go-live, rather than handing work off between silos.",
    "That structure means engineers, architects, and analysts work closely together day to day, with direct visibility into the business outcomes their work is driving.",
    "Innovation and AI adoption aren't a separate initiative here — they're part of how the delivery teams already approach client work across Salesforce, healthcare technology, and cloud platforms.",
  ],
  pillars: [
    { icon: Ico.route, title: "Ownership End-to-End" },
    { icon: Ico.compass, title: "Cross-Functional Collaboration" },
    { icon: Ico.spark, title: "AI-Forward Delivery" },
  ],
};

const GROWTH = {
  eyebrow: "Career Growth",
  heading: "Grow Across the Platforms Enterprises Actually Run On",
  intro: "The technology stack you'll work in spans the platforms enterprise clients depend on — with room to specialize as your career progresses.",
  items: ["Salesforce", "Healthcare Technology (Elixir EHR)", "Cloud Infrastructure", "Enterprise AI", "ServiceNow, NetSuite & Workday", "Cybersecurity Operations"],
};

const FINAL_CTA = {
  heading: "Don't See the Right Role Yet?",
  description: "New openings are added as Mirketa's delivery teams grow — check back, or explore what's currently open.",
  cta: { label: "View Open Positions", href: "#job-openings" },
};

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function Careers() {
  return (
    <div className="careers-page">
      <Seo {...SEO} />
      <HeroSection />
      <WhyJoinSection />
      <CultureSection />
      <JobOpeningsSection />
      <GrowthSection />
      <FinalCtaSection />
    </div>
  );
}

function HeroSection() {
  return (
    <section className="careers-hero" style={{ backgroundImage: `url("${Images.heroCareers}")` }} aria-label="Careers at Mirketa">
      <div className="careers-hero__scrim" />
      <div className="container careers-hero__inner">
        <div className="careers-hero__text careers-fade-up">
          <h1>{HERO.heading}</h1>
          <p className="careers-hero__description">{HERO.description}</p>
          <div className="careers-hero__ctas">
            <a href={HERO.primaryCta.href} className="btn btn-primary">
              {HERO.primaryCta.label} <span aria-hidden="true">&rarr;</span>
            </a>
            <a href={HERO.secondaryCta.href} className="btn btn-secondary">
              {HERO.secondaryCta.label}
            </a>
          </div>
        </div>
        <HeroVisual dashboardTitle={HERO_DASHBOARD.title} stats={HERO_DASHBOARD.stats} rows={HERO_DASHBOARD.rows} className="careers-hero__visual careers-fade-up careers-fade-up--delay-1" />
      </div>
    </section>
  );
}

function WhyJoinSection() {
  return (
    <section className="section careers-why" id="why-join" aria-labelledby="careers-why-heading">
      <div className="container">
        <div className="section-heading careers-reveal">
          <p className="careers-eyebrow">{WHY_JOIN.eyebrow}</p>
          <h2 id="careers-why-heading">{WHY_JOIN.heading}</h2>
          <p>{WHY_JOIN.intro}</p>
        </div>
        <div className="careers-bento careers-reveal-stagger">
          {WHY_JOIN.tiles.map((t) => (
            <div className={`careers-bento-tile ${t.size === "large" ? "careers-bento-tile--large" : ""}`.trim()} key={t.title}>
              <span className="careers-bento-tile__icon">{t.icon}</span>
              <h3>{t.title}</h3>
              <p>{t.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CultureSection() {
  return (
    <section className="section careers-culture" aria-labelledby="careers-culture-heading">
      <div className="container careers-culture__grid">
        <div className="careers-reveal-left">
          <p className="careers-eyebrow">{CULTURE.eyebrow}</p>
          <h2 id="careers-culture-heading">{CULTURE.heading}</h2>
          {CULTURE.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <div className="careers-culture__pillars careers-reveal-right">
          {CULTURE.pillars.map((p) => (
            <div className="careers-culture-pillar" key={p.title}>
              <span aria-hidden="true">{p.icon}</span>
              <p>{p.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function JobOpeningsSection() {
  return (
    <section className="section careers-jobs" id="job-openings" aria-labelledby="careers-jobs-heading">
      <div className="container">
        <div className="section-heading careers-reveal">
          <p className="careers-eyebrow">Current Opportunities</p>
          <h2 id="careers-jobs-heading">Job Openings For You</h2>
          <p>Every open role below links to its full job description and application form.</p>
        </div>

        {JOBS.length === 0 ? (
          <p className="careers-jobs__empty">No open positions right now — check back soon.</p>
        ) : (
          <div className="careers-jobs__grid careers-reveal-stagger">
            {JOBS.map((job) => (
              <Link to={job.slug} className="job-card" key={job.slug}>
                <span className="job-card__icon" aria-hidden="true">
                  {Ico.briefcase}
                </span>
                <h3>{job.title}</h3>
                <ul className="job-card__meta">
                  <li>
                    <span aria-hidden="true">{Ico.pin}</span> {job.location}
                  </li>
                  <li>
                    <span aria-hidden="true">{Ico.clock}</span> {job.experience}
                  </li>
                  <li>
                    <span aria-hidden="true">{Ico.briefcase}</span> {job.employmentType}
                  </li>
                </ul>
                <span className="job-card__cta">
                  View Job Description <span aria-hidden="true">{Ico.arrow}</span>
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function GrowthSection() {
  return (
    <section className="section careers-growth" aria-labelledby="careers-growth-heading">
      <div className="container">
        <div className="section-heading careers-reveal">
          <p className="careers-eyebrow">{GROWTH.eyebrow}</p>
          <h2 id="careers-growth-heading">{GROWTH.heading}</h2>
          <p>{GROWTH.intro}</p>
        </div>
        <ul className="careers-growth__list careers-reveal-stagger">
          {GROWTH.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function FinalCtaSection() {
  return (
    <section className="careers-final-cta careers-reveal" aria-labelledby="careers-final-cta-heading">
      <div className="container careers-final-cta__inner">
        <h2 id="careers-final-cta-heading">{FINAL_CTA.heading}</h2>
        <p>{FINAL_CTA.description}</p>
        <a href={FINAL_CTA.cta.href} className="btn btn-primary">
          {FINAL_CTA.cta.label} <span aria-hidden="true">&rarr;</span>
        </a>
      </div>
    </section>
  );
}
