import { useEffect, useState } from "react";
import "./StickyCta.css";

// ============================================================
// StickyCta — fixed bottom-right pill, appears once the given
// heroRef element scrolls out of view. Hidden below 1024px.
// ============================================================

export default function StickyCta({ heroRef, label, href = "#contact" }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const heroEl = heroRef?.current;
    if (!heroEl) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { rootMargin: "-10% 0px 0px 0px" }
    );
    observer.observe(heroEl);
    return () => observer.disconnect();
  }, [heroRef]);

  return (
    <div className={`sticky-cta ${visible ? "is-visible" : ""}`} aria-hidden={!visible}>
      <a href={href} className="btn btn-primary sticky-cta__btn" tabIndex={visible ? 0 : -1}>
        {label} <span aria-hidden="true">→</span>
      </a>
    </div>
  );
}
