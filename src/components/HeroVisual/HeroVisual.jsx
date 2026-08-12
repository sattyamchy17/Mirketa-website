import "./HeroVisual.css";

// Premium hero-right-column visual: a mock live dashboard card plus
// floating accent cards, used in place of an embedded form so hero
// CTAs can point to a separate consultation section below.
export default function HeroVisual({ dashboardTitle, liveLabel = "LIVE", stats = [], rows = [], floatingCards = [], className = "" }) {
  return (
    <div className={`hero-visual ${className}`.trim()}>
      <div className="hero-visual__dashboard">
        <div className="hero-visual__head">
          <h2>{dashboardTitle}</h2>
          <span className="hero-visual__live">
            <span className="hero-visual__live-dot" aria-hidden="true" /> {liveLabel}
          </span>
        </div>

        <div className="hero-visual__stats">
          {stats.map((s) => (
            <div className="hero-visual__stat" key={s.label}>
              <span className="hero-visual__stat-label">{s.label}</span>
              <strong>{s.value}</strong>
              <span className="hero-visual__stat-caption">{s.caption}</span>
            </div>
          ))}
        </div>

        <ul className="hero-visual__rows">
          {rows.map((r) => (
            <li key={r.title}>
              <div>
                <p className="hero-visual__row-title">{r.title}</p>
                <p className="hero-visual__row-meta">{r.meta}</p>
              </div>
              <span className={`hero-visual__row-status hero-visual__row-status--${r.tone}`}>{r.status}</span>
            </li>
          ))}
        </ul>
      </div>

      {floatingCards.map((c, i) => (
        <div className={`hero-visual__float hero-visual__float--${i + 1}`} key={c.title}>
          <span className="hero-visual__float-icon" aria-hidden="true">
            {c.icon}
          </span>
          <div>
            <strong>{c.title}</strong>
            <span>{c.subtitle}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
