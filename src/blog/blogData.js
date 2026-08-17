// ============================================================
// CENTRAL BLOG DATA — the one source of truth every page (Home,
// Insights, /blog, /blog/:slug) reads through via blogUtils.js.
// To publish a new post: create src/blog/posts/<slug>.js following
// the same shape as the posts below, then add one import + one
// line to the array here. Nothing else needs to change — Home and
// Insights automatically pick up the new post via its
// `publishedDate` and `category`.
// ============================================================

import { post as enterpriseCustomerSuccessUnifiedDataFoundation } from "./posts/enterprise-customer-success-unified-data-foundation.js";
import { post as aiAssistedCustomerHealthScoringChurnReduction } from "./posts/ai-assisted-customer-health-scoring-churn-reduction.js";
import { post as enterpriseAiReadinessFoundationScalableAi } from "./posts/enterprise-ai-readiness-foundation-scalable-ai.js";
import { post as agenticAiEnterprisePilotsToProduction } from "./posts/agentic-ai-enterprise-pilots-to-production.js";
import { post as salesforceAgentforceImplementationEnterpriseGuide } from "./posts/salesforce-agentforce-implementation-enterprise-guide.js";
import { post as modernizingServicenowWorkflowsAiEra } from "./posts/modernizing-servicenow-workflows-ai-era.js";
import { post as salesforceDataCloudUnifiedCustomerDataFoundation } from "./posts/salesforce-data-cloud-unified-customer-data-foundation.js";
import { post as healthcareDataReadinessForAiGuide } from "./posts/healthcare-data-readiness-for-ai-guide.js";
import { post as dataCloudForAgentforce } from "./posts/data-cloud-for-agentforce.js";

export const blogPosts = [
  enterpriseCustomerSuccessUnifiedDataFoundation,
  aiAssistedCustomerHealthScoringChurnReduction,
  enterpriseAiReadinessFoundationScalableAi,
  agenticAiEnterprisePilotsToProduction,
  salesforceAgentforceImplementationEnterpriseGuide,
  modernizingServicenowWorkflowsAiEra,
  salesforceDataCloudUnifiedCustomerDataFoundation,
  healthcareDataReadinessForAiGuide,
  dataCloudForAgentforce,
];
