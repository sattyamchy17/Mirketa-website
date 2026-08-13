import { Link } from "react-router-dom";
import FaqAccordion from "../FaqAccordion/FaqAccordion.jsx";
import "./BlogContent.css";

// ============================================================
// BlogContent — renders a blog post's `content` block array (see
// src/blog/posts/*.js) into JSX. This is the one place blog body
// markup lives; BlogDetail.jsx never hardcodes article content.
//
// Supported block types: heading2, heading3, paragraph, list,
// callout, faq. Paragraph/list text supports two lightweight inline
// tokens — **bold** and [label](/path or https://url) — parsed by
// renderInline() below, so authors can add emphasis and internal/
// external links directly in blogData without a rich-text editor
// or an extra markdown dependency.
// ============================================================

const INLINE_TOKEN = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*/g;

function renderInline(text) {
  if (!text) return null;
  const nodes = [];
  let lastIndex = 0;
  let match;
  let key = 0;
  INLINE_TOKEN.lastIndex = 0;
  while ((match = INLINE_TOKEN.exec(text)) !== null) {
    if (match.index > lastIndex) nodes.push(text.slice(lastIndex, match.index));
    if (match[1] !== undefined) {
      const href = match[2];
      const isExternal = /^https?:\/\//.test(href);
      nodes.push(
        isExternal ? (
          <a key={key++} href={href} target="_blank" rel="noopener noreferrer">
            {match[1]}
          </a>
        ) : (
          <Link key={key++} to={href}>
            {match[1]}
          </Link>
        )
      );
    } else {
      nodes.push(<strong key={key++}>{match[3]}</strong>);
    }
    lastIndex = INLINE_TOKEN.lastIndex;
  }
  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));
  return nodes;
}

export default function BlogContent({ blocks }) {
  if (!Array.isArray(blocks) || blocks.length === 0) return null;

  return (
    <div className="blog-content">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "heading2":
            return <h2 key={i}>{renderInline(block.text)}</h2>;
          case "heading3":
            return <h3 key={i}>{renderInline(block.text)}</h3>;
          case "paragraph":
            return <p key={i}>{renderInline(block.text)}</p>;
          case "list": {
            const ListTag = block.style === "number" ? "ol" : "ul";
            return (
              <ListTag key={i} className="blog-content__list">
                {block.items.map((item, j) => (
                  <li key={j}>{renderInline(item)}</li>
                ))}
              </ListTag>
            );
          }
          case "callout":
            return (
              <div key={i} className="blog-callout" role="note">
                <p>{renderInline(block.text)}</p>
              </div>
            );
          case "faq":
            return (
              <div key={i} className="blog-faq">
                <h2>{block.heading || "Frequently Asked Questions"}</h2>
                <FaqAccordion items={block.items.map((qa) => ({ q: qa.question, a: qa.answer }))} searchPlaceholder="Search this article's FAQs..." />
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
