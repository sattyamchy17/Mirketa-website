import { Link } from "react-router-dom";
import "./RelatedServices.css";

// items: [{ label, description, slug }]. `slug` should come from a
// central config (e.g. src/config/pageSlugs.js) rather than being
// hardcoded at the call site.
export default function RelatedServices({ eyebrow = "Related Services", heading, intro, items = [], className = "" }) {
  return (
    <section className={`related-services ${className}`.trim()} aria-labelledby="related-services-heading">
      <div className="container">
        <div className="section-heading related-services__heading">
          <p className="related-services__eyebrow">{eyebrow}</p>
          <h2 id="related-services-heading">{heading}</h2>
          {intro && <p>{intro}</p>}
        </div>
        <div className="related-services__grid">
          {items.map((item) => (
            <Link to={item.slug} className="related-services__card" key={item.slug}>
              <h3>{item.label}</h3>
              <p>{item.description}</p>
              <span className="related-services__link" aria-hidden="true">
                Learn more →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
