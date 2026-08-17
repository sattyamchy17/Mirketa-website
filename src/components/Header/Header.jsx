import { Fragment, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Images } from "../../assets/images/index.js";
import "./Header.css";

// ============================================================
// NAVIGATION DATA — three levels: L1 (top nav) -> L2 (group
// headings inside the mega panel) -> L3 (individual links).
// Some L1 items have ungrouped ("flat") L3 items instead of L2
// headings; those groups simply omit `heading`. Text-only by
// design — no icons anywhere in this structure.
// ============================================================
const NAV_ITEMS = [
  {
    label: "AI Solutions",
    prefixes: ["/ai-solutions", "/ai-readiness", "/ai-roadmap-governance", "/ai-consulting", "/ai-enablement", "/agentic-orchestration", "/agent-development", "/ai-data-foundations", "/salesforce-ai-services", "/agentforce", "/data-cloud", "/ai-velocity-engines", "/ai-accelerator-aria", "/kratu-ai", "/altruta-ai", "/salesforce-ai-case-management", "/netsuite-ai"],
    columns: [
      [
        {
          heading: "AI Consulting",
          items: [
            { label: "AI Readiness Assessment", href: "/ai-readiness" },
            { label: "AI Roadmap & Governance", href: "/ai-roadmap-governance" },
          ],
        },
        {
          heading: "AI Enablement",
          items: [
            { label: "Agentic Orchestration & Legacy Integration", href: "/agentic-orchestration" },
            { label: "Agent Development", href: "/agent-development" },
            { label: "AI Data Foundations", href: "/ai-data-foundations" },
          ],
        },
      ],
      [
        {
          heading: "AI Velocity Engines",
          items: [
            { label: "ARIA - AI based RCA", href: "/ai-accelerator-aria" },
            { label: "ALTRUTA - AI Nonprofit Suite", href: "/altruta-ai" },
            { label: "KRATU AI - Clinical AI", href: "/kratu-ai" },
            { label: "Case Rezolver & Management", href: "/salesforce-ai-case-management" },
            // Existing "Vulnerability Remediation Agent" content on the
            // Agentic Orchestration page — no dedicated page exists for
            // this item, so it links there rather than to a new/guessed URL.
            { label: "AI-Driven Vulnerability Management", href: "/agentic-orchestration" },
          ],
        },
      ],
      [
        {
          heading: "Salesforce AI",
          items: [
            { label: "Salesforce AI Services & CRM Solutions", href: "/salesforce-ai-services" },
            { label: "Agentforce", href: "/agentforce" },
            { label: "Salesforce Data Cloud Solutions and Expertise", href: "/data-cloud" },
          ],
        },
        {
          heading: "NetSuite AI",
          items: [{ label: "NetSuite AI", href: "/netsuite-ai" }],
        },
      ],
    ],
    featured: {
      title: "AI Readiness Assessment",
      description: "Find your fastest path to enterprise AI ROI in as little as 3 weeks.",
      cta: "Start Assessment",
      href: "/ai-readiness",
    },
  },
  {
    label: "Platforms & Technology",
    prefixes: ["/platforms"],
    columns: [
      [
        {
          heading: "Salesforce",
          items: [
            { label: "Salesforce Development & Consulting", href: "/platforms/salesforce/development-consulting" },
            {
              label: "Salesforce Clouds",
              href: "/platforms/salesforce/clouds",
              // L3 "Salesforce Clouds" fans out into its own L4 flyout — every
              // individual cloud page is a child of this item, never a direct
              // sibling under "Salesforce". Order matches the requested menu
              // structure exactly so new clouds can be appended in place.
              flyout: [
                { label: "Sales Cloud", href: "/platforms/salesforce/clouds/sales-cloud" },
                { label: "Service Cloud", href: "/platforms/salesforce/clouds/service-cloud" },
                { label: "Marketing Cloud", href: "/platforms/salesforce/clouds/marketing-cloud" },
                { label: "Experience Cloud", href: "/platforms/salesforce/clouds#experience-cloud" },
                { label: "Revenue Cloud", href: "/platforms/salesforce/clouds/revenue-cloud" },
                { label: "Health Cloud", href: "/platforms/salesforce/clouds/health-cloud" },
                { label: "Manufacturing Cloud", href: "/platforms/salesforce/clouds/manufacturing-cloud" },
              ],
            },
            { label: "Salesforce Developer Services", href: "/platforms/salesforce/developer-services" },
            { label: "Salesforce Support", href: "/platforms/salesforce/support" },
            { label: "Developer Services & Admin Support", href: "/platforms/salesforce/admin-support" },
          ],
        },
      ],
      [
        {
          heading: "ServiceNow",
          items: [
            { label: "ServiceNow Solutions", href: "/platforms/servicenow" },
            { label: "Consulting & Development", href: "/platforms/servicenow/consulting-development-services" },
            { label: "Technology", href: "/platforms/servicenow/technology-workflows" },
            { label: "Customer", href: "/platforms/servicenow/customer-workflows" },
            { label: "Employee", href: "/platforms/servicenow/employee-workflows" },
            { label: "Creator Workflows", href: "/platforms/servicenow/creator-workflows" },
            { label: "Managed Services", href: "/platforms/servicenow/support-managed-services" },
          ],
        },
        {
          heading: "Oracle Applications",
          items: [
            {
              label: "Oracle Fusion Applications Implementation",
              href: "/platforms/oracle/fusion-implementation",
              // L3 "Fusion Implementation" fans out into its own L4 flyout —
              // each Oracle Fusion consulting sub-page is a child of this
              // item, never a direct sibling under "Oracle Applications".
              flyout: [
                { label: "ERP Consulting", href: "/platforms/oracle/fusion-implementation/erp-consulting" },
                { label: "HCM", href: "/platforms/oracle/fusion-implementation/hcm-consulting" },
                { label: "CX Consulting Development", href: "/platforms/oracle/fusion-implementation/cx-consulting" },
                { label: "EPM Consulting Development Services", href: "/platforms/oracle/fusion-implementation/epm-consulting" },
                { label: "SCM", href: "/platforms/oracle/fusion-implementation/scm-consulting" },
              ],
            },
            { label: "Oracle Premium Support Service", href: "/platforms/oracle/premium-support-service" },
            { label: "Oracle Managed Services", href: "/platforms/oracle/support-services" },
          ],
        },
      ],
      [
        {
          heading: "Cloud",
          items: [
            { label: "AWS", href: "/platforms/cloud/aws" },
            { label: "Azure", href: "/platforms/cloud/azure" },
            { label: "Google Cloud Platform", href: "/platforms/cloud/gcp" },
            { label: "Cloud Setup & Migration", href: "/platforms/cloud/setup-migration" },
            { label: "Site Reliability Engineering", href: "/platforms/cloud/sre-security" },
            { label: "Cloud Infrastructure Management", href: "/platforms/cloud/infra-management" },
          ],
        },
        {
          heading: "Workday",
          items: [
            { label: "Consulting & Development", href: "/platforms/workday/consulting-development" },
            { label: "Support Managed Services", href: "/platforms/workday/managed-services" },
          ],
        },
      ],
      [
        {
          heading: "Integration & iPaaS",
          items: [
            { label: "Enterprise Integration Services", href: "/enterprise-integration-services" },
            { label: "Boomi Integration Services", href: "/boomi-integration-services-solutions" },
            { label: "MuleSoft Implementation", href: "/mulesoft-implementation" },
          ],
        },
        {
          heading: "NetSuite",
          items: [
            { label: "NetSuite Implementation", href: "/platforms/netsuite/implementation" },
            { label: "NetSuite AI Consulting", href: "/platforms/netsuite/ai-consulting" },
            { label: "NetSuite Support Services", href: "/platforms/netsuite/managed-services" },
          ],
        },
      ],
    ],
  },
  {
    label: "Industry",
    prefixes: ["/industry", "/industries"],
    isIndustryGrid: true,
    columns: [
      [
        {
          items: [
            { label: "Private Equity", href: "/industry/private-equity" },
            // No dedicated Nonprofits/Manufacturing industry page exists in
            // this project — these previously pointed at /industries/* pages
            // that were never built. Both now point at the real Salesforce
            // Cloud content that actually covers them (same destinations
            // already used by the Salesforce Clouds L4 flyout below).
            { label: "Nonprofits", href: "/platforms/salesforce/clouds#nonprofit-cloud" },
            { label: "Healthcare", href: "/industry/healthcare" },
            { label: "Manufacturing", href: "/platforms/salesforce/clouds/manufacturing-cloud" },
            { label: "Education", href: "/industry/education" },
          ],
        },
      ],
      [
        {
          items: [
            { label: "Hi-Tech", href: "/industry/hi-tech" },
            { label: "Financial Services", href: "/industry/financial-services" },
            { label: "E-commerce", href: "/industry/ecommerce" },
            { label: "Wholesale", href: "/industry/wholesale" },
          ],
        },
      ],
    ],
  },
  {
    label: "Products & IP",
    prefixes: ["/products", "/elixir", "/finacast", "/ecourier", "/duplicate-search-and-merge"],
    columns: [
      [
        {
          heading: "Elixir (EHR)",
          // Elixir (EHR) itself is an external product site, not a page in
          // this project — the heading links out to it directly (nofollow,
          // new tab) while its three child pages are real internal routes.
          headingHref: "http://elixirehr.com/",
          headingExternal: true,
          items: [
            { label: "ONC MFA Use Cases", href: "/elixir/onc-mfa-use-cases" },
            { label: "API Developer Portal", href: "/elixir/api-developer-portal" },
            { label: "Elixir Certified Module", href: "/elixir/elixir-certified-module" },
          ],
        },
      ],
      [
        {
          heading: "Other Products",
          items: [
            // RRD is an external product site (roundrobindistributor.com),
            // not a page in this project — rendered as a plain external
            // nofollow link via the "http" prefix check above.
            { label: "RRD (Round Robin Distributor)", href: "http://roundrobindistributor.com/" },
            { label: "Finacast", href: "/finacast" },
            { label: "eCourier", href: "/ecourier" },
            { label: "Duplicate Search & Merge", href: "/duplicate-search-and-merge" },
          ],
        },
      ],
    ],
    featured: {
      title: "View All Products",
      description: "Explore Mirketa's full library of pre-built accelerators and IP.",
      cta: "Browse Products",
      href: "/products",
    },
  },
  {
    label: "Insights",
    href: "/insights",
    prefixes: ["/insights", "/blog"],
  },
  {
    label: "Company",
    prefixes: ["/company", "/about-us"],
    columns: [
      [
        {
          items: [
            { label: "About Mirketa", href: "/about-us" },
            { label: "Careers", href: "/company/careers" },
            // No Press/Newsroom page exists in this project yet — rendered
            // without an href (see the !link.href branch below) rather
            // than linking to a page that was never built.
            { label: "Press & Newsroom" },
          ],
        },
      ],
      [
        {
          heading: "Partners & Certifications",
          // Links to each platform's real hub page (see App.jsx) — these
          // previously pointed at /company/partners/* pages that never
          // existed. `platformStyle` gives this group's rows the green
          // hover/active accent instead of the sitewide default blue.
          // AWS has no dedicated page yet (see the AWS entry's comment in
          // src/config/pageSlugs.js) — rendered without an href rather
          // than guessing a destination.
          platformStyle: true,
          items: [
            { label: "Salesforce", href: "/platforms/salesforce/clouds", activePrefix: "/platforms/salesforce" },
            { label: "ServiceNow", href: "/platforms/servicenow", activePrefix: "/platforms/servicenow" },
            { label: "Oracle", href: "/platforms/oracle/fusion-implementation", activePrefix: "/platforms/oracle" },
            { label: "NetSuite", href: "/platforms/netsuite/implementation", activePrefix: "/platforms/netsuite" },
            { label: "AWS" },
          ],
        },
      ],
    ],
    featured: {
      title: "Schedule a Discovery Call",
      description: "Get a same-week call with a Mirketa solution architect.",
      cta: "Book a Discovery Call",
      href: "/company/contact#book",
    },
  },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [activeFlyout, setActiveFlyout] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const closeTimer = useRef(null);
  const flyoutCloseTimer = useRef(null);
  const navRef = useRef(null);
  const panelRef = useRef(null);
  const location = useLocation();

  const activeItem = NAV_ITEMS.find((item) => item.label === activeMenu);
  // Keeps rendering the last-opened menu's content while it fades out via CSS,
  // instead of unmounting it instantly (which would skip the closing animation).
  // Updated synchronously during render (not via an effect) so the DOM reflects
  // it in the same commit — an effect-based version lags a cycle behind and
  // breaks focus-on-open for keyboard users.
  const lastActiveItemRef = useRef(null);
  if (activeItem) lastActiveItemRef.current = activeItem;
  const panelContentItem = lastActiveItemRef.current;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Close the desktop menu on outside click.
  useEffect(() => {
    if (!activeMenu) return;
    const onPointerDown = (e) => {
      if (navRef.current && !navRef.current.contains(e.target) && panelRef.current && !panelRef.current.contains(e.target)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [activeMenu]);

  // Close on route change.
  useEffect(() => {
    setActiveMenu(null);
    setMobileOpen(false);
  }, [location.pathname]);

  // The L4 flyout is scoped to whichever L1 menu is currently open — reset it
  // whenever that changes so a stale flyout never lingers into a new panel.
  useEffect(() => {
    setActiveFlyout(null);
  }, [activeMenu]);

  const handleEnter = (label) => {
    clearTimeout(closeTimer.current);
    setActiveMenu(label);
  };

  const handleLeave = () => {
    closeTimer.current = setTimeout(() => setActiveMenu(null), 150);
  };

  // Same open/close-with-delay pattern as handleEnter/handleLeave above, just
  // scoped to which L3 item's L4 column is showing inside the active panel.
  const handleFlyoutEnter = (link) => {
    clearTimeout(flyoutCloseTimer.current);
    setActiveFlyout(link);
  };

  const handleFlyoutLeave = () => {
    flyoutCloseTimer.current = setTimeout(() => setActiveFlyout(null), 150);
  };

  const closeAndFocusTrigger = (label) => {
    setActiveMenu(null);
    navRef.current?.querySelector(`[data-trigger="${label}"]`)?.focus();
  };

  const handleTriggerKeyDown = (e, item) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      clearTimeout(closeTimer.current);
      setActiveMenu(item.label);
      requestAnimationFrame(() => {
        panelRef.current?.querySelector("a, button")?.focus();
      });
    } else if (e.key === "Escape") {
      setActiveMenu(null);
    }
  };

  const handlePanelKeyDown = (e, label) => {
    if (e.key === "Escape") {
      e.preventDefault();
      closeAndFocusTrigger(label);
      return;
    }
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      const focusable = Array.from(panelRef.current?.querySelectorAll("a, button") || []);
      const currentIndex = focusable.indexOf(document.activeElement);
      const nextIndex =
        e.key === "ArrowDown" ? (currentIndex + 1) % focusable.length : (currentIndex - 1 + focusable.length) % focusable.length;
      focusable[nextIndex]?.focus();
    }
  };

  // "Industry" is excluded from the current-section highlight by request —
  // every other item keeps the standard green active-state treatment when
  // its route prefix matches the current page.
  const isSectionActive = (item) => item.label !== "Industry" && item.prefixes.some((p) => location.pathname.startsWith(p));

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <div className={`site-header-wrap ${scrolled ? "site-header-wrap--scrolled" : ""}`}>
        <div className={`top-strip ${scrolled ? "top-strip--hidden" : ""}`}>
          <div className="container top-strip__inner">
            <div className="top-strip__phones">
              <a href="tel:+18556475382" className="top-strip__item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M6.6 10.8c1.5 3 3.9 5.4 6.9 6.9l2.3-2.3c.3-.3.7-.4 1-.2 1.2.5 2.5.8 3.9.8.6 0 1 .4 1 1v3.6c0 .6-.4 1-1 1C11.4 21.6 2.4 12.6 2.4 1.3c0-.6.4-1 1-1H7c.6 0 1 .4 1 1 0 1.4.3 2.7.8 3.9.1.3.1.7-.2 1L6.6 10.8z" fill="currentColor" />
                </svg>
                <span aria-hidden="true">🇺🇸</span> +1 (855) MIRKETA
              </a>
              <a href="tel:+919876543210" className="top-strip__item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M6.6 10.8c1.5 3 3.9 5.4 6.9 6.9l2.3-2.3c.3-.3.7-.4 1-.2 1.2.5 2.5.8 3.9.8.6 0 1 .4 1 1v3.6c0 .6-.4 1-1 1C11.4 21.6 2.4 12.6 2.4 1.3c0-.6.4-1 1-1H7c.6 0 1 .4 1 1 0 1.4.3 2.7.8 3.9.1.3.1.7-.2 1L6.6 10.8z" fill="currentColor" />
                </svg>
                <span aria-hidden="true">🇮🇳</span> +91 98765 43210
              </a>
            </div>
            <div className="top-strip__links">
              <Link to="/company/careers">Careers</Link>
              <Link to="/company/contact">Contact</Link>
            </div>
          </div>
        </div>

        <header className={`site-header ${scrolled ? "site-header--scrolled" : ""}`}>
          <div className="container site-header__inner">
            <Link to="/" className="site-header__logo" aria-label="Mirketa — Home">
              <img
                src={Images.logo}
                alt="Mirketa"
                className={`site-header__logo-img ${scrolled ? "" : "site-header__logo-img--light"}`}
              />
            </Link>

            <nav className="mega-nav" aria-label="Primary" ref={navRef}>
              <ul>
                {NAV_ITEMS.map((item) =>
                  item.href ? (
                    <li key={item.label} className={`mega-nav__item ${isSectionActive(item) ? "is-current" : ""}`}>
                      <Link to={item.href} className="mega-nav__trigger">
                        {item.label}
                      </Link>
                    </li>
                  ) : (
                    <li
                      key={item.label}
                      className={`mega-nav__item ${activeMenu === item.label ? "is-active" : ""} ${isSectionActive(item) ? "is-current" : ""}`}
                      onMouseEnter={() => handleEnter(item.label)}
                      onMouseLeave={handleLeave}
                    >
                      <button
                        className="mega-nav__trigger"
                        data-trigger={item.label}
                        aria-expanded={activeMenu === item.label}
                        aria-haspopup="true"
                        onClick={() => setActiveMenu(activeMenu === item.label ? null : item.label)}
                        onKeyDown={(e) => handleTriggerKeyDown(e, item)}
                      >
                        {item.label}
                      </button>
                    </li>
                  )
                )}
              </ul>
            </nav>

            <div className="site-header__actions">
              <Link to="/company/contact#book" className="btn btn-primary">
                Book a Discovery Call
                <span className="btn-arrow">&rarr;</span>
              </Link>

              <button
                className={`hamburger ${mobileOpen ? "is-open" : ""}`}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
                onClick={() => setMobileOpen((o) => !o)}
              >
                <span />
                <span />
                <span />
              </button>
            </div>

            {/* Single shared mega panel — content swaps based on activeMenu.
                Nested inside .site-header__inner (rather than as its sibling)
                so its absolute left/right:0 resolves against this element's
                own padding edge — i.e. exactly the logo-to-button content
                span — instead of the full viewport width. */}
            <div
              className={`mega-panel ${activeItem ? "is-active" : ""} ${panelContentItem?.isIndustryGrid ? "mega-panel--grid" : ""}`}
              role="menu"
              aria-label={panelContentItem ? `${panelContentItem.label} menu` : undefined}
              ref={panelRef}
              onMouseEnter={() => panelContentItem && handleEnter(panelContentItem.label)}
              onMouseLeave={handleLeave}
              onKeyDown={(e) => panelContentItem && handlePanelKeyDown(e, panelContentItem.label)}
              inert={activeItem ? undefined : true}
            >
              {panelContentItem && (
                <div className="mega-panel__inner">
                  <div className={`mega-panel__columns ${panelContentItem.isIndustryGrid ? "mega-panel__columns--grid" : ""}`}>
                    {panelContentItem.columns.map((column, colIndex) => {
                      // Renders right after whichever column actually contains the
                      // open flyout's trigger, so both the visual grid position and
                      // the keyboard tab order flow logically: L3 trigger, then
                      // immediately its own L4 children, then on to the next column.
                      const flyoutBelongsHere = activeFlyout && column.some((group) => group.items.includes(activeFlyout));
                      return (
                      <Fragment key={colIndex}>
                      <div className="mega-panel__column">
                        {column.map((group, groupIndex) => (
                          <div className="mega-group" key={group.heading || groupIndex}>
                            {group.heading && (
                              group.headingHref ? (
                                <a
                                  href={group.headingHref}
                                  className="mega-group__heading mega-group__heading--link"
                                  {...(group.headingExternal ? { target: "_blank", rel: "nofollow noopener noreferrer" } : {})}
                                >
                                  {group.heading}
                                </a>
                              ) : (
                                <p className="mega-group__heading">{group.heading}</p>
                              )
                            )}
                            <ul className={panelContentItem.isIndustryGrid ? "mega-group__list mega-group__list--industry" : "mega-group__list"}>
                              {group.items.map((link, i) => (
                                <li
                                  key={link.label}
                                  style={{ "--i": i }}
                                  className={link.flyout ? "mega-group__item--has-flyout" : undefined}
                                  onMouseEnter={link.flyout ? () => handleFlyoutEnter(link) : undefined}
                                  onMouseLeave={link.flyout ? handleFlyoutLeave : undefined}
                                >
                                  {!link.href ? (
                                    // No real destination exists yet for this platform (see the
                                    // comment on the data above) — a plain, non-interactive row
                                    // rather than a guessed or dead link.
                                    <span className="mega-link mega-link--static">{link.label}</span>
                                  ) : link.href.startsWith("http") ? (
                                    <a href={link.href} target="_blank" rel="nofollow noopener noreferrer" className={panelContentItem.isIndustryGrid ? "mega-industry-link" : "mega-link"}>
                                      {link.label}
                                    </a>
                                  ) : (
                                  <Link
                                    to={link.href}
                                    className={`${panelContentItem.isIndustryGrid ? "mega-industry-link" : "mega-link"} ${group.platformStyle ? "mega-link--platform" : ""} ${
                                      activeFlyout?.label === link.label || (link.activePrefix && location.pathname.startsWith(link.activePrefix)) ? "is-active" : ""
                                    }`}
                                    onFocus={link.flyout ? () => handleFlyoutEnter(link) : undefined}
                                  >
                                    {link.label}
                                    {link.flyout && (
                                      <span className="mega-link__flyout-indicator" aria-hidden="true">
                                        ›
                                      </span>
                                    )}
                                    {group.platformStyle && (
                                      <span className="btn-arrow" aria-hidden="true">
                                        &rarr;
                                      </span>
                                    )}
                                  </Link>
                                  )}
                                  {link.children && (
                                    <ul className="mega-group__sublist">
                                      {link.children.map((child) => (
                                        <li key={child.label}>
                                          <Link to={child.href} className="mega-link mega-link--sub">
                                            {child.label}
                                          </Link>
                                        </li>
                                      ))}
                                    </ul>
                                  )}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>

                      {/* L4 — the open flyout's own children render as a genuine
                          grid column right next to the column that triggered it,
                          never as a floating overlay. Only one can be open at a
                          time (activeFlyout is a single value), reset whenever
                          the L1 menu changes. */}
                      {flyoutBelongsHere && (
                        <div
                          className="mega-panel__column mega-panel__column--flyout"
                          onMouseEnter={() => handleFlyoutEnter(activeFlyout)}
                          onMouseLeave={handleFlyoutLeave}
                        >
                          <p className="mega-group__heading">{activeFlyout.label}</p>
                          <ul className="mega-group__list" role="menu" aria-label={`${activeFlyout.label} submenu`}>
                            {activeFlyout.flyout.map((f, i) => {
                              const isActive = location.pathname + location.hash === f.href;
                              return (
                                <li key={f.label} style={{ "--i": i }}>
                                  <Link to={f.href} className={`mega-link ${isActive ? "is-active" : ""}`}>
                                    {f.label}
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      )}
                      </Fragment>
                      );
                    })}

                    {panelContentItem.featured && (
                      <div className="mega-panel__column mega-panel__column--featured">
                        <div className="mega-featured-card">
                          <h4>{panelContentItem.featured.title}</h4>
                          <p>{panelContentItem.featured.description}</p>
                          <Link to={panelContentItem.featured.href} className="mega-featured-card__cta">
                            {panelContentItem.featured.cta}
                            <span className="btn-arrow">&rarr;</span>
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>
      </div>

      <div className={`mobile-menu ${mobileOpen ? "mobile-menu--open" : ""}`}>
        <ul className="mobile-menu__list">
          {NAV_ITEMS.map((item) =>
            item.href ? (
              <li key={item.label} className="mobile-menu__item">
                <Link to={item.href} className="mobile-menu__trigger" onClick={() => setMobileOpen(false)}>
                  {item.label}
                </Link>
              </li>
            ) : (
            <li key={item.label} className="mobile-menu__item">
              <button
                className="mobile-menu__trigger"
                onClick={() => setMobileExpanded(mobileExpanded === item.label ? null : item.label)}
                aria-expanded={mobileExpanded === item.label}
              >
                {item.label}
              </button>
              <div className={`mobile-submenu ${mobileExpanded === item.label ? "mobile-submenu--open" : ""}`}>
                {item.columns.flat().map((group, i) => (
                  <div key={group.heading || i} className="mobile-submenu__group">
                    {group.heading && (
                      group.headingHref ? (
                        <a
                          href={group.headingHref}
                          className="mobile-submenu__heading mobile-submenu__heading--link"
                          {...(group.headingExternal ? { target: "_blank", rel: "nofollow noopener noreferrer" } : {})}
                        >
                          {group.heading}
                        </a>
                      ) : (
                        <p className="mobile-submenu__heading">{group.heading}</p>
                      )
                    )}
                    <ul>
                      {group.items.map((link) => (
                        <li key={link.label}>
                          {!link.href ? (
                            <span className="mobile-submenu__static">{link.label}</span>
                          ) : link.href.startsWith("http") ? (
                            <a href={link.href} target="_blank" rel="nofollow noopener noreferrer" onClick={() => setMobileOpen(false)}>
                              {link.label}
                            </a>
                          ) : (
                            <Link to={link.href} onClick={() => setMobileOpen(false)}>
                              {link.label}
                            </Link>
                          )}
                          {link.children && (
                            <ul className="mobile-submenu__sublist">
                              {link.children.map((child) => (
                                <li key={child.label}>
                                  <Link to={child.href} onClick={() => setMobileOpen(false)}>
                                    {child.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          )}
                          {link.flyout && (
                            <ul className="mobile-submenu__sublist">
                              {link.flyout.map((f) => {
                                const isActive = location.pathname + location.hash === f.href;
                                return (
                                  <li key={f.label}>
                                    <Link to={f.href} className={isActive ? "is-active" : undefined} onClick={() => setMobileOpen(false)}>
                                      {f.label}
                                    </Link>
                                  </li>
                                );
                              })}
                            </ul>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </li>
            )
          )}
        </ul>
        <div className="mobile-menu__footer">
          <Link to="/company/contact#book" className="btn btn-primary" onClick={() => setMobileOpen(false)}>
            Book a Discovery Call
          </Link>
        </div>
      </div>
      {mobileOpen && <div className="mobile-menu__backdrop" onClick={() => setMobileOpen(false)} />}
    </>
  );
}
