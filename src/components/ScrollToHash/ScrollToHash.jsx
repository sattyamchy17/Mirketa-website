import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// This app uses the plain BrowserRouter/Routes API, which — unlike native
// full-page navigation — does not scroll to an anchor after a client-side
// route change. Without this, a link like "/company/contact#contact-form"
// would land on the new page at whatever scroll position the previous page
// was left at, instead of at the target section.
export default function ScrollToHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0 });
      return;
    }
    // Wait a frame for the new route's content to mount before measuring
    // the target element's position.
    const frame = window.requestAnimationFrame(() => {
      document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    return () => window.cancelAnimationFrame(frame);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, hash]);

  return null;
}
