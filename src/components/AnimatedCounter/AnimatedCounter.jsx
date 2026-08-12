import { useEffect, useRef, useState } from "react";
import "./AnimatedCounter.css";

// ============================================================
// AnimatedCounter — shared stat counter used across stats bands.
// Parses a leading numeric value + suffix (e.g. "99.9%", "2M+"),
// counts up via requestAnimationFrame once scrolled into view,
// and jumps straight to the final value under reduced motion.
// ============================================================

export default function AnimatedCounter({ value, label, className = "" }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const match = value.match(/^([\d.]+)(.*)$/);
    if (!match) {
      setDisplay(value);
      return;
    }
    const target = parseFloat(match[1]);
    const suffix = match[2];
    const isDecimal = match[1].includes(".");

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setDisplay(value);
      return;
    }

    let hasStarted = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          hasStarted = true;
          const duration = 1400;
          const startTime = performance.now();
          const step = (now) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const current = target * progress;
            setDisplay((isDecimal ? current.toFixed(1) : Math.floor(current)) + suffix);
            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              setDisplay(value);
            }
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div className={`animated-counter ${className}`} ref={ref}>
      <strong>{display}</strong>
      <span>{label}</span>
    </div>
  );
}
