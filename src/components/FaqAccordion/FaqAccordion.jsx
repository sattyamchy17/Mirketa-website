import { useId, useMemo, useState } from "react";
import "./FaqAccordion.css";

// ============================================================
// FaqAccordion — shared search + single-open accordion.
// items: [{ q, a }]. idPrefix keeps ids unique when multiple
// instances render on one page (not typical, but safe).
// ============================================================

export default function FaqAccordion({ items, searchPlaceholder = "Search frequently asked questions...", className = "" }) {
  const idBase = useId();
  const [query, setQuery] = useState("");
  const [openIndex, setOpenIndex] = useState(-1);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((item) => item.q.toLowerCase().includes(q) || item.a.toLowerCase().includes(q));
  }, [items, query]);

  return (
    <div className={`faq-accordion ${className}`}>
      <div className="faq-accordion__search-wrap">
        <label htmlFor={`${idBase}-search`} className="visually-hidden">
          Search frequently asked questions
        </label>
        <input
          id={`${idBase}-search`}
          type="search"
          className="faq-accordion__search"
          placeholder={searchPlaceholder}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpenIndex(-1);
          }}
        />
      </div>
      <div className="faq-accordion__list">
        {filtered.length === 0 ? (
          <p className="faq-accordion__empty">No questions match &ldquo;{query}&rdquo;. Try a different search term.</p>
        ) : (
          filtered.map((item, i) => {
            const open = openIndex === i;
            const panelId = `${idBase}-panel-${i}`;
            return (
              <div className={`faq-accordion__item ${open ? "is-open" : ""}`} key={item.q}>
                <button
                  type="button"
                  className="faq-accordion__question"
                  aria-expanded={open}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(open ? -1 : i)}
                >
                  <span>{item.q}</span>
                  <span className="faq-accordion__icon" aria-hidden="true">{open ? "−" : "+"}</span>
                </button>
                <div id={panelId} className="faq-accordion__answer" role="region" hidden={!open}>
                  <p>{item.a}</p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
