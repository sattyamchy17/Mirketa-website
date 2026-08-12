import "./AnalyticsPanel.css";

const RADIUS = 34;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

// A donut-chart + KPI-list illustration for analytics/reporting
// sections.
export default function AnalyticsPanel({ title, metrics = [], donutPercent = 72, donutLabel = "", className = "" }) {
  const offset = CIRCUMFERENCE * (1 - donutPercent / 100);
  return (
    <div className={`illus-analytics ${className}`.trim()}>
      <p className="illus-analytics__title">{title}</p>
      <div className="illus-analytics__body">
        <svg viewBox="0 0 100 100" className="illus-analytics__donut" role="img" aria-label={`${donutLabel || title}: ${donutPercent}%`}>
          <circle cx="50" cy="50" r={RADIUS} fill="none" stroke="#e4e8ec" strokeWidth="10" />
          <circle
            cx="50"
            cy="50"
            r={RADIUS}
            fill="none"
            stroke="#21ad65"
            strokeWidth="10"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={offset}
            strokeLinecap="round"
            transform="rotate(-90 50 50)"
          />
          <text x="50" y="56" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f2438">
            {donutPercent}%
          </text>
        </svg>
        <ul className="illus-analytics__metrics">
          {metrics.map((m) => (
            <li key={m.label}>
              <strong>{m.value}</strong>
              <span>{m.label}</span>
            </li>
          ))}
        </ul>
      </div>
      {donutLabel && <p className="illus-analytics__caption">{donutLabel}</p>}
    </div>
  );
}
