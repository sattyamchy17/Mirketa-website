import "./SupplyChainMap.css";

const POSITIONS = [
  { x: 190, y: 100 },
  { x: 60, y: 40 },
  { x: 320, y: 40 },
  { x: 60, y: 165 },
  { x: 320, y: 165 },
];

// A hub-and-node network illustration for supply-chain / operations
// visibility sections.
export default function SupplyChainMap({ title, nodes = [], className = "" }) {
  const shown = nodes.slice(0, 5);
  return (
    <div className={`illus-supply ${className}`.trim()}>
      <p className="illus-supply__title">{title}</p>
      <svg viewBox="0 0 380 200" className="illus-supply__svg" role="img" aria-label={title}>
        {shown.map((n, i) => {
          if (i === 0) return null;
          const a = POSITIONS[0];
          const b = POSITIONS[i];
          return <line key={`l-${n.label}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="#e4e8ec" strokeWidth="2" />;
        })}
        {shown.map((n, i) => {
          const p = POSITIONS[i];
          return (
            <g key={n.label}>
              <circle cx={p.x} cy={p.y} r={i === 0 ? 30 : 24} fill={i === 0 ? "#21ad65" : "#ffffff"} stroke="#21ad65" strokeWidth="2" />
              <text x={p.x} y={p.y + 4} textAnchor="middle" fontSize="9" fontWeight="700" fill={i === 0 ? "#ffffff" : "#0f2438"}>
                {n.short}
              </text>
            </g>
          );
        })}
      </svg>
      <ul className="illus-supply__legend">
        {shown.map((n) => (
          <li key={n.label}>{n.label}</li>
        ))}
      </ul>
    </div>
  );
}
