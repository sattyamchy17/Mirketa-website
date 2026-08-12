import Breadcrumb from "../../Breadcrumb/Breadcrumb.jsx";
import "./HeroFullBleed.css";

// ============================================================
// HeroFullBleed — Layout D. A taller, full-bleed background
// visual with a single glass overlay card carrying the copy —
// no side-by-side dashboard. Reserved for high-impact pages
// where the background illustration should read as atmosphere
// rather than a boxed-in mockup.
// ============================================================

export default function HeroFullBleed({
  breadcrumbItems,
  badge,
  title,
  description,
  primaryCta,
  secondaryCta,
  metrics = [],
  backgroundImage,
  heroTextRef,
  heroRef,
  align = "left",
  className = "",
}) {
  return (
    <section
      ref={heroRef}
      className={`hero-fullbleed hero-fullbleed--${align} ${className}`.trim()}
      style={backgroundImage ? { backgroundImage: `url("${backgroundImage}")` } : undefined}
      aria-label={typeof title === "string" ? title : undefined}
    >
      <div className="hero-fullbleed__scrim" />
      <div className="container hero-fullbleed__container">
        <Breadcrumb items={breadcrumbItems} className="hero-fullbleed__breadcrumb" />
        <div ref={heroTextRef} className="hero-fullbleed__card">
          {badge && (
            <span className="hero-fullbleed__badge">
              <span aria-hidden="true">✦</span> {badge}
            </span>
          )}
          <h1>{title}</h1>
          <p className="hero-fullbleed__description">{description}</p>
          {(primaryCta || secondaryCta) && (
            <div className="hero-fullbleed__ctas">
              {primaryCta && (
                <a href={primaryCta.href} className="btn btn-primary hero-fullbleed__btn">
                  {primaryCta.label} <span aria-hidden="true">→</span>
                </a>
              )}
              {secondaryCta && (
                <a href={secondaryCta.href} className="btn btn-secondary hero-fullbleed__btn">
                  {secondaryCta.label}
                </a>
              )}
            </div>
          )}
          {metrics.length > 0 && (
            <ul className="hero-fullbleed__metrics">
              {metrics.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
