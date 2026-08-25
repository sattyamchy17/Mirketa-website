import { Link } from "react-router-dom";
import { Images } from "../../assets/images/index.js";
import "./Footer.css";

const FOOTER_COLUMNS = [
  {
    heading: "AI Solutions",
    links: [
      { label: "Agentic Frameworks", href: "/agentic-orchestration" },
      { label: "Data Governance", href: "/ai-roadmap-governance" },
      { label: "LLM Provisioning", href: "/agentic-orchestration" },
      { label: "AI Enablement", href: "/ai-enablement" },
    ],
  },
  {
    heading: "Salesforce",
    links: [
      { label: "Sales & Service Cloud", href: "/salesforce" },
      { label: "Health Cloud", href: "/salesforce/health-cloud" },
      { label: "Nonprofit Cloud", href: "/salesforce#nonprofit-cloud" },
      { label: "Managed Support", href: "/salesforce-managed-services" },
    ],
  },
  {
    heading: "Industries",
    links: [
      { label: "Healthcare", href: "/industries/healthcare" },
      { label: "Nonprofit", href: "/salesforce#nonprofit-cloud" },
      { label: "Financial Services", href: "/industries/financial-services" },
      { label: "Manufacturing", href: "/salesforce/manufacturing-cloud" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Us", href: "/about-us" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/company/contact" },
    ],
  },
];

const SOCIAL_LINKS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/mirketainc",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M4.98 3.5a2.5 2.5 0 11-.02 5.001A2.5 2.5 0 014.98 3.5zM3 8.98h4v12H3v-12zM9 8.98h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1v6.25h-4v-5.55c0-1.32-.02-3.02-1.84-3.02-1.84 0-2.12 1.44-2.12 2.92v5.65H9v-12z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    label: "Twitter / X",
    href: "https://twitter.com/MirketaInc",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M18.9 2H22l-7.2 8.2L23 22h-6.9l-5.4-7-6.2 7H1.4l7.7-8.8L1 2h7l4.9 6.4L18.9 2z" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/MirketaInc",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M13.5 21v-7h2.35l.45-3H13.5V9c0-.87.24-1.46 1.5-1.46H16.4V5.06c-.26-.03-1.14-.11-2.16-.11-2.14 0-3.6 1.31-3.6 3.71V11H8.3v3h2.34v7h2.86z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/mirketainc173",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="2.5" y="5.5" width="19" height="13" rx="3" stroke="currentColor" strokeWidth="1.4" />
        <path d="M10.5 9.5v5l4.5-2.5-4.5-2.5z" fill="currentColor" />
      </svg>
    ),
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="content-wrap site-footer__top">
        <div className="site-footer__brand">
          <Link to="/" className="site-footer__logo">
            <img src={Images.logo} alt="Mirketa" className="site-footer__logo-img" loading="lazy" />
          </Link>
          <p>Engineering enterprise intelligence through AI and cloud transformation.</p>
          <div className="site-footer__socials">
            {SOCIAL_LINKS.map((s) => (
              <a key={s.label} href={s.href} aria-label={s.label} target="_blank" rel="noreferrer">
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="site-footer__columns">
          {FOOTER_COLUMNS.map((col) => (
            <div className="site-footer__col" key={col.heading}>
              <h4>{col.heading}</h4>
              <ul>
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="site-footer__bottom">
        <div className="content-wrap site-footer__bottom-inner">
          <p>&copy; {year} Mirketa Inc. All rights reserved.</p>
          {/* No Terms of Service / Privacy Policy page exists in this
              project yet — plain text rather than a link to a page that
              doesn't exist. Wire these up once the real legal copy is
              available. */}
          <div className="site-footer__legal">
            <span className="site-footer__legal-static">Terms</span>
            <span className="site-footer__legal-static">Privacy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
