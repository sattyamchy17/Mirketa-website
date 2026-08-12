import "./FinanceChart.css";

// A finance-dashboard-style bar chart illustration with supporting
// KPI callouts — used for financial/close/reporting sections.
export default function FinanceChart({ title, kpis = [], bars = [], className = "" }) {
  const max = Math.max(...bars, 1);
  return (
    <div className={`illus-finance ${className}`.trim()}>
      <div className="illus-finance__head">
        <p className="illus-finance__title">{title}</p>
        <span className="illus-finance__live">
          <span className="illus-finance__live-dot" aria-hidden="true" /> LIVE
        </span>
      </div>
      <div className="illus-finance__chart" role="img" aria-label={`${title} trend chart`}>
        {bars.map((h, i) => (
          <span key={i} className="illus-finance__bar" style={{ height: `${(h / max) * 100}%` }} />
        ))}
      </div>
      <div className="illus-finance__kpis">
        {kpis.map((k) => (
          <div key={k.label}>
            <strong>{k.value}</strong>
            <span>{k.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
