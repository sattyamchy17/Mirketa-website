import Breadcrumb from "../../Breadcrumb/Breadcrumb.jsx";
import "./HeroAsymmetric.css";

// ============================================================
// HeroAsymmetric — Layout C. A 70/30 split for technical pages:
// content takes the dominant column, and a narrow side rail
// carries compact stat chips instead of a full dashboard mock.
// Distinct from the ~55/45 split-hero-with-dashboard pattern
// used elsewhere.
// ============================================================

export default function HeroAsymmetric({
  breadcrumbItems,
  badge,
  title,
  description,
  primaryCta,
  secondaryCta,
  stats = [],
  backgroundImage,
  heroTextRef,
  heroRef,
  className = "",
}) {
  return (
    <section
      ref={heroRef}
      className={`hero-asymmetric ${className}`.trim()}
      style={backgroundImage ? { backgroundImage: `url("${backgroundImage}")` } : undefined}
      aria-label={typeof title === "string" ? title : undefined}
    >
      <div className="hero-asymmetric__scrim" />
      <div className="container">
        <Breadcrumb items={breadcrumbItems} className="hero-asymmetric__breadcrumb" />
        <div className="hero-asymmetric__inner">
          <div ref={heroTextRef} className="hero-asymmetric__main">
            {badge && (
              <span className="hero-asymmetric__badge">
                <span aria-hidden="true">✦</span> {badge}
              </span>
            )}
            <h1>{title}</h1>
            <p className="hero-asymmetric__description">{description}</p>
            {(primaryCta || secondaryCta) && (
              <div className="hero-asymmetric__ctas">
                {primaryCta && (
                  <a href={primaryCta.href} className="btn btn-primary hero-asymmetric__btn">
                    {primaryCta.label} <span aria-hidden="true">→</span>
                  </a>
                )}
                {secondaryCta && (
                  <a href={secondaryCta.href} className="btn btn-secondary hero-asymmetric__btn">
                    {secondaryCta.label}
                  </a>
                )}
              </div>
            )}
          </div>

          {stats.length > 0 && (
            <aside className="hero-asymmetric__rail" aria-label="Key metrics">
              {stats.map((s) => (
                <div className="hero-asymmetric__chip" key={s.label}>
                  <strong>{s.value}</strong>
                  <span>{s.label}</span>
                </div>
              ))}
            </aside>
          )}
        </div>
      </div>
    </section>
  );
}
