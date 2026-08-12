import { useEffect } from "react";
import Breadcrumb from "../../Breadcrumb/Breadcrumb.jsx";
import "./HeroEditorial.css";

// Signals to the sitewide Header (which defaults to white nav/logo text,
// assuming a dark hero sits behind it pre-scroll) that this page's hero
// is light instead — see .has-light-hero overrides in Header.css.
function useLightHeroHeader() {
  useEffect(() => {
    document.documentElement.classList.add("has-light-hero");
    return () => document.documentElement.classList.remove("has-light-hero");
  }, []);
}

// ============================================================
// HeroEditorial — Layout E. Light-background, narrow-column,
// magazine-style hero: small breadcrumb, large serif H1, a
// single supporting paragraph, then a full-width image band
// *below* the text instead of a side-by-side visual. Used for
// content-led / industry pages instead of the dark dashboard
// hero used elsewhere.
// ============================================================

export default function HeroEditorial({
  breadcrumbItems,
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
  metrics = [],
  image,
  imageAlt = "",
  imageCaption,
  heroTextRef,
  heroRef,
  className = "",
}) {
  useLightHeroHeader();

  return (
    <section ref={heroRef} className={`hero-editorial ${className}`.trim()} aria-label={typeof title === "string" ? title : undefined}>
      <div className="container hero-editorial__top">
        <Breadcrumb items={breadcrumbItems} className="hero-editorial__breadcrumb breadcrumb--dark" />
        <div ref={heroTextRef} className="hero-editorial__copy">
          {eyebrow && <p className="hero-editorial__eyebrow">{eyebrow}</p>}
          <h1>{title}</h1>
          <p className="hero-editorial__description">{description}</p>
          {(primaryCta || secondaryCta) && (
            <div className="hero-editorial__ctas">
              {primaryCta && (
                <a href={primaryCta.href} className="btn btn-primary hero-editorial__btn">
                  {primaryCta.label} <span aria-hidden="true">→</span>
                </a>
              )}
              {secondaryCta && (
                <a href={secondaryCta.href} className="btn btn-outline-dark hero-editorial__btn">
                  {secondaryCta.label}
                </a>
              )}
            </div>
          )}
          {metrics.length > 0 && (
            <ul className="hero-editorial__metrics">
              {metrics.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {image && (
        <figure className="hero-editorial__figure">
          <img src={image} alt={imageAlt} loading="eager" />
          {imageCaption && <figcaption>{imageCaption}</figcaption>}
        </figure>
      )}
    </section>
  );
}
