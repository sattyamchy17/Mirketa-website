import { Link } from "react-router-dom";
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb.jsx";
import CareerApplicationForm from "../../../components/CareerApplicationForm/index.js";
import { CAREER_PAGES } from "../../../config/pageSlugs.js";
import "./JobDetails.css";

// ============================================================
// JobDetails — reusable job-detail page template. Every job page
// (see ../jobs/CybersecuritySOCAnalyst/) renders this component
// with its own `job` data object; nothing here is specific to any
// one role. Sections that depend on optional job fields
// (aboutElixir, functionalResponsibilities, threatHunting,
// qualifications, experienceDiscrepancy) render only when that
// field is present, so future non-security/non-healthcare roles
// can omit them without leaving empty sections behind.
// ============================================================

const CheckIcon = (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M5 12.5l5 5L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function InfoIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 8h.01M11 11h1v6h1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export default function JobDetails({ job }) {
  const breadcrumbItems = [{ label: "Home", href: "/" }, { label: "Careers", href: CAREER_PAGES.HUB.slug }, { label: job.title }];

  return (
    <div className="job-details">
      {/* ---------- Job Hero ---------- */}
      <section className="job-hero" style={job.heroImage ? { backgroundImage: `url("${job.heroImage}")` } : undefined} aria-label={job.title}>
        <div className="job-hero__scrim" />
        <div className="container">
          <Breadcrumb items={breadcrumbItems} className="job-hero__breadcrumb" />
          <div className="job-hero__inner">
            <div className="job-hero__text job-fade-up">
              <h1>{job.title}</h1>
              {job.summary && <p className="job-hero__summary">{job.summary}</p>}
            </div>

            <div className="job-hero__panel job-fade-up job-fade-up--delay-1">
              <dl className="job-hero__facts">
                <div>
                  <dt>Location</dt>
                  <dd>{job.location}</dd>
                </div>
                <div>
                  <dt>Experience</dt>
                  <dd>{job.experience}</dd>
                </div>
                <div>
                  <dt>Employment Type</dt>
                  <dd>{job.employmentType}</dd>
                </div>
              </dl>
              <a href="#apply-now" className="btn btn-primary job-hero__apply">
                Apply Now <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="container job-details__body">
        {/* ---------- About Mirketa ---------- */}
        {job.aboutMirketa && (
          <section className="job-section job-reveal" aria-labelledby="job-about-mirketa-heading">
            <h2 id="job-about-mirketa-heading">About Mirketa Inc</h2>
            <p>{job.aboutMirketa}</p>
          </section>
        )}

        {/* ---------- About Elixir EHR ---------- */}
        {job.aboutElixir && (
          <section className="job-section job-reveal" aria-labelledby="job-about-elixir-heading">
            <h2 id="job-about-elixir-heading">About Elixir EHR</h2>
            <p>{job.aboutElixir}</p>
          </section>
        )}

        {/* ---------- About the Role ---------- */}
        {job.aboutRole && (
          <section className="job-section job-reveal" aria-labelledby="job-about-role-heading">
            <h2 id="job-about-role-heading">About the Role</h2>
            <p>{job.aboutRole}</p>
          </section>
        )}

        {/* ---------- Key Responsibilities ---------- */}
        {job.responsibilities?.length > 0 && (
          <section className="job-section job-reveal" aria-labelledby="job-responsibilities-heading">
            <h2 id="job-responsibilities-heading">Key Responsibilities</h2>
            <ul className="job-checklist">
              {job.responsibilities.map((r) => (
                <li key={r}>
                  <span aria-hidden="true">{CheckIcon}</span>
                  {r}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* ---------- Functional Responsibilities ---------- */}
        {job.functionalResponsibilities?.length > 0 && (
          <section className="job-section job-reveal" aria-labelledby="job-functional-heading">
            <h2 id="job-functional-heading">Functional Responsibilities</h2>
            <ul className="job-grid-list">
              {job.functionalResponsibilities.map((r) => (
                <li key={r}>
                  <span aria-hidden="true">{CheckIcon}</span>
                  {r}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* ---------- Proactive Threat Hunting (or any other job-specific
             specialty block a future role defines under `threatHunting`) ---------- */}
        {job.threatHunting && (
          <section className="job-section job-section--highlight job-reveal" aria-labelledby="job-threat-hunting-heading">
            <h2 id="job-threat-hunting-heading">{job.threatHunting.heading}</h2>
            {job.threatHunting.intro && <p>{job.threatHunting.intro}</p>}
            <ul className="job-grid-list">
              {job.threatHunting.items.map((r) => (
                <li key={r}>
                  <span aria-hidden="true">{CheckIcon}</span>
                  {r}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* ---------- Qualifications ---------- */}
        {job.qualifications?.length > 0 && (
          <section className="job-section job-reveal" aria-labelledby="job-qualifications-heading">
            <h2 id="job-qualifications-heading">Qualifications</h2>
            <ul className="job-checklist">
              {job.qualifications.map((q) => (
                <li key={q}>
                  <span aria-hidden="true">{CheckIcon}</span>
                  {q}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* ---------- Job Information ---------- */}
        <section className="job-section job-reveal" aria-labelledby="job-information-heading">
          <h2 id="job-information-heading">Job Information</h2>
          <div className="job-info-grid">
            <div className="job-info-card">
              <h3>Location</h3>
              <p>{job.location}</p>
            </div>
            <div className="job-info-card">
              <h3>Experience</h3>
              <p>{job.experience}</p>
            </div>
            <div className="job-info-card">
              <h3>Employment Type</h3>
              <p>{job.employmentType}</p>
            </div>
          </div>

          {job.experienceDiscrepancy && (
            <div className="job-notice" role="note">
              <span aria-hidden="true" className="job-notice__icon">
                <InfoIcon />
              </span>
              <p>{job.experienceDiscrepancy}</p>
            </div>
          )}
        </section>

        {/* ---------- Apply Now ---------- */}
        <section className="job-apply-banner job-reveal" aria-labelledby="job-apply-banner-heading">
          <h2 id="job-apply-banner-heading">Ready to apply?</h2>
          <p>Share your details and resume with our hiring team below.</p>
          <a href="#apply-now" className="btn btn-primary">
            Apply Now <span aria-hidden="true">&rarr;</span>
          </a>
        </section>
      </div>

      {/* ---------- Application Form ---------- */}
      <div id="apply-now">
        <CareerApplicationForm job={job} />
      </div>

      <p className="job-details__back">
        <Link to={CAREER_PAGES.HUB.slug}>&larr; Back to all open positions</Link>
      </p>
    </div>
  );
}
