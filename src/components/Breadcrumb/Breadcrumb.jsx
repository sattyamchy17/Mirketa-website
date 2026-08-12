import { Link } from "react-router-dom";
import "./Breadcrumb.css";

// ============================================================
// Breadcrumb — shared hero breadcrumb nav.
// items: [{ label, href? }] — the last item (no href) renders
// as the current page via aria-current="page".
// ============================================================

export default function Breadcrumb({ items, className = "" }) {
  return (
    <nav className={`breadcrumb ${className}`} aria-label="Breadcrumb">
      <ol>
        {items.map((b, i) => (
          <li key={b.label}>
            {b.href ? <Link to={b.href}>{b.label}</Link> : <span aria-current="page">{b.label}</span>}
            {i < items.length - 1 && <span aria-hidden="true"> / </span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
