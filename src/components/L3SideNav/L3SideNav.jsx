import { Link } from "react-router-dom";
import "./L3SideNav.css";

// ============================================================
// L3SideNav — shared dark vertical sub-navigation for L3 pages
// nested under an L2 platform hub (e.g. every Oracle Fusion
// Applications Implementation consulting page). Collapses to a
// horizontal scrollable strip below 1024px. Text-only, matching
// the mega-menu flyout it mirrors.
// ============================================================

export default function L3SideNav({ eyebrow, items, activeHref, ariaLabel }) {
  return (
    <nav className="l3-side-nav" aria-label={ariaLabel || "Section navigation"}>
      {eyebrow && <p className="l3-side-nav__eyebrow">{eyebrow}</p>}
      <ul className="l3-side-nav__list">
        {items.map((item) => {
          const isActive = item.href === activeHref;
          return (
            <li key={item.label}>
              {isActive ? (
                <span className="l3-side-nav__link is-active" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link to={item.href} className="l3-side-nav__link">
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
