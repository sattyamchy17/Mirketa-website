import "./BentoGrid.css";

// ============================================================
// BentoGrid — one large "feature" tile plus several smaller
// supporting tiles, as an alternative to a uniform 3-card grid.
// items: [{ icon, title, description, size: "large" | undefined }]
// Exactly one item should be marked size: "large".
// ============================================================

export default function BentoGrid({ items = [], className = "" }) {
  return (
    <div className={`bento-grid ${className}`.trim()}>
      {items.map((item) => (
        <div className={`bento-grid__tile ${item.size === "large" ? "bento-grid__tile--large" : ""}`.trim()} key={item.title}>
          {item.icon && <span className="bento-grid__icon">{item.icon}</span>}
          <p className="bento-grid__title">{item.title}</p>
          <p className="bento-grid__description">{item.description}</p>
        </div>
      ))}
    </div>
  );
}
