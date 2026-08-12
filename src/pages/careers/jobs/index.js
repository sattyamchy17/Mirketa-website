// ============================================================
// Barrel export for the Careers "jobs" module. Add a new job by:
//   1. Creating jobs/<JobName>/<JobName>.jsx exporting a job data
//      object + a page component (see CybersecuritySOCAnalyst.jsx
//      for the template), and registering its slug in
//      src/config/pageSlugs.js under CAREER_PAGES.
//   2. Adding one import + one line to both exports below.
//   3. Adding one <Route> in App.jsx.
// Nothing else needs to change — the Careers hub listing (Careers.jsx)
// reads the JOBS array below automatically.
// ============================================================
import CybersecuritySOCAnalyst, { cybersecuritySocAnalystJob } from "./CybersecuritySOCAnalyst/index.js";

export { CybersecuritySOCAnalyst };

export const JOBS = [cybersecuritySocAnalystJob];
