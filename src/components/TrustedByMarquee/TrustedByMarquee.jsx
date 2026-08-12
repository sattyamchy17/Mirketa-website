import { Images } from "../../assets/images/index.js";
import "./TrustedByMarquee.css";

// ============================================================
// TrustedByMarquee — shared scrolling trust-badge band.
// Reuses the site-wide certification badge set by default;
// pass `badges` to override for a page-specific set.
// ============================================================

const DEFAULT_BADGES = [
  { icon: Images.clientSalesforce, label: "Certified Partner" },
  { icon: Images.clientSoc2, label: "SOC 2 Certified" },
  { icon: Images.clientHipaa, label: "HIPAA Ready" },
  { icon: Images.clientEnterprise, label: "Enterprise Ready" },
  { icon: Images.clientExperience, label: "15+ Years Experience" },
];

export default function TrustedByMarquee({ label = "Trusted by Enterprise Teams", badges = DEFAULT_BADGES }) {
  const loop = [...badges, ...badges];

  return (
    <section className="trusted-marquee" aria-label={label}>
      <div className="container trusted-marquee__inner">
        <p className="trusted-marquee__label">{label}</p>
        <div className="trusted-marquee__track" role="list">
          <div className="trusted-marquee__scroll">
            {loop.map((b, i) => (
              <div className="trusted-marquee__badge" role="listitem" key={`${b.label}-${i}`}>
                <img src={b.icon} alt="" aria-hidden="true" loading="lazy" />
                <span>{b.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
