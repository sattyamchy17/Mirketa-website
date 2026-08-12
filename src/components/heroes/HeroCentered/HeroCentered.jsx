import { useEffect } from "react";
import Breadcrumb from "../../Breadcrumb/Breadcrumb.jsx";
import "./HeroCentered.css";

// Signals to the sitewide Header (which defaults to white nav/logo text,
// assuming a dark hero sits behind it pre-scroll) that this page's hero
// is light instead — see .has-light-hero overrides in Header.css.
function useLightHeroHeader() {
  useEffect(() => {
    document.documentElement.classList.add("has-light-hero");
    return () => document.documentElement.classList.remove("has-light-hero");
  }, []);
}

// ============================================================
// HeroCentered — Layout B. Centered badge/H1/description/CTAs
// on a light background, with a large visual centered beneath —
// for content-heavy pages where a two-column split competes
// with a long headline instead of framing it.
// ============================================================

export default function HeroCentered({
  badge,
  title,
  description,
  primaryCta,
  secondaryCta,
  metrics = [],
  breadcrumbItems,
  heroTextRef,
  heroRef,
  visual,
  className = "",
}) {
  useLightHeroHeader();

  return (
    <section ref={heroRef} className={`hero-centered ${className}`.trim()} aria-label={typeof title === "string" ? title : undefined}>
      <div className="container">
        {breadcrumbItems && <Breadcrumb items={breadcrumbItems} className="hero-centered__breadcrumb breadcrumb--dark" />}
        <div ref={heroTextRef} className="hero-centered__copy">
          {badge && (
            <span className="hero-centered__badge">
              <span aria-hidden="true">✦</span> {badge}
            </span>
          )}
          <h1>{title}</h1>
          <p className="hero-centered__description">{description}</p>
          {(primaryCta || secondaryCta) && (
            <div className="hero-centered__ctas">
              {primaryCta && (
                <a href={primaryCta.href} className="btn btn-primary hero-centered__btn">
                  {primaryCta.label} <span aria-hidden="true">→</span>
                </a>
              )}
              {secondaryCta && (
                <a href={secondaryCta.href} className="btn btn-outline-dark hero-centered__btn">
                  {secondaryCta.label}
                </a>
              )}
            </div>
          )}
          {metrics.length > 0 && (
            <ul className="hero-centered__metrics">
              {metrics.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
          )}
        </div>

        {visual && <div className="hero-centered__visual">{visual}</div>}
      </div>
    </section>
  );
}
