import "./Timeline.css";

// ============================================================
// Timeline — vertical, connected-spine process presentation.
// An alternative to the numbered step-card grid used elsewhere,
// for pages where a process reads better as a single continuous
// journey than as parallel cards.
// items: [{ name, description }]
// ============================================================

export default function Timeline({ items = [], className = "" }) {
  return (
    <ol className={`timeline ${className}`.trim()}>
      {items.map((item, i) => (
        <li className="timeline__item" key={item.name}>
          <div className="timeline__marker">
            <span className="timeline__num">{String(i + 1).padStart(2, "0")}</span>
          </div>
          <div className="timeline__content">
            <p className="timeline__title">{item.name}</p>
            <p className="timeline__description">{item.description}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
