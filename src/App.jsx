import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import ScrollToHash from "./components/ScrollToHash/ScrollToHash.jsx";
import Home from "./pages/Home/Home.jsx";
import About from "./pages/About/About.jsx";
import Contact from "./pages/Contact/Contact.jsx";
import AIConsulting from "./pages/AIConsulting/AIConsulting.jsx";
import AIReadiness from "./pages/AIReadiness/AIReadiness.jsx";
import AIRoadmapGovernance from "./pages/AIRoadmapGovernance/AIRoadmapGovernance.jsx";
import AIEnablement from "./pages/AIEnablement/AIEnablement.jsx";
import AgenticOrchestration from "./pages/AgenticOrchestration/AgenticOrchestration.jsx";
import AgentDevelopment from "./pages/AgentDevelopment/AgentDevelopment.jsx";
import AIDataFoundations from "./pages/AIDataFoundations/AIDataFoundations.jsx";
import SalesforceAIServices from "./pages/SalesforceAIServices/SalesforceAIServices.jsx";
import Agentforce from "./pages/Agentforce/Agentforce.jsx";
import DataCloud from "./pages/DataCloud/DataCloud.jsx";
import AIVelocityEngines from "./pages/AIVelocityEngines/AIVelocityEngines.jsx";
import AIAcceleratorAria from "./pages/AIAcceleratorAria/AIAcceleratorAria.jsx";
import KratuAI from "./pages/KratuAI/KratuAI.jsx";
import AltrutaAI from "./pages/AltrutaAI/AltrutaAI.jsx";
import CaseRezolver from "./pages/CaseRezolver/CaseRezolver.jsx";
import NetSuiteAI from "./pages/NetSuiteAI/NetSuiteAI.jsx";
import SalesforceConsulting from "./pages/SalesforceConsulting/SalesforceConsulting.jsx";
import SalesforceClouds from "./pages/SalesforceClouds/SalesforceClouds.jsx";
import SalesCloud from "./pages/salesforce/SalesCloud/SalesCloud.jsx";
import ServiceCloud from "./pages/salesforce/ServiceCloud/ServiceCloud.jsx";
import MarketingCloud from "./pages/salesforce/MarketingCloud/MarketingCloud.jsx";
import RevenueCloud from "./pages/salesforce/RevenueCloud/RevenueCloud.jsx";
import HealthCloud from "./pages/salesforce/HealthCloud/HealthCloud.jsx";
import ManufacturingCloud from "./pages/salesforce/ManufacturingCloud/ManufacturingCloud.jsx";
import DeveloperServices from "./pages/salesforce/DeveloperServices/DeveloperServices.jsx";
import FinancialServices from "./pages/salesforce/FinancialServices/FinancialServices.jsx";
import AdminSupport from "./pages/salesforce/AdminSupport/AdminSupport.jsx";
import FusionImplementation from "./pages/oracle/FusionImplementation/FusionImplementation.jsx";
import ErpConsulting from "./pages/oracle/ErpConsulting/ErpConsulting.jsx";
import HcmConsulting from "./pages/oracle/HcmConsulting/HcmConsulting.jsx";
import CxConsulting from "./pages/oracle/CxConsulting/CxConsulting.jsx";
import EpmConsulting from "./pages/oracle/EpmConsulting/EpmConsulting.jsx";
import ScmConsulting from "./pages/oracle/ScmConsulting/ScmConsulting.jsx";
import PremiumSupport from "./pages/oracle/PremiumSupport/PremiumSupport.jsx";
import ManagedServices from "./pages/oracle/ManagedServices/ManagedServices.jsx";
import ServiceNow from "./pages/servicenow/ServiceNow.jsx";
import ConsultingDevelopmentServices from "./pages/servicenow/consulting-development-services/ConsultingDevelopmentServices.jsx";
import TechnologyWorkflows from "./pages/servicenow/technology-workflows/TechnologyWorkflows.jsx";
import CustomerWorkflows from "./pages/servicenow/customer-workflows/CustomerWorkflows.jsx";
import EmployeeWorkflows from "./pages/servicenow/employee-workflows/EmployeeWorkflows.jsx";
import CreatorWorkflows from "./pages/servicenow/creator-workflows/CreatorWorkflows.jsx";
import SupportManagedServices from "./pages/servicenow/support-managed-services/SupportManagedServices.jsx";
import { NetsuiteAI, NetsuiteImplementation, NetsuiteSupportServices } from "./pages/netsuite/index.js";
import { WorkdayConsultingDevelopment, WorkdaySupportManagedServices } from "./pages/workday/index.js";
import { CloudSetupMigration, SiteReliabilityEngineering, InfrastructureManagement } from "./pages/cloud/index.js";
import { EnterpriseIntegrationServices, BoomiIntegrationServices, MuleSoftImplementation } from "./pages/integration-ipaas/index.js";
import { PrivateEquity, Ecommerce, Education, FinancialServices as IndustryFinancialServices, HiTech, Healthcare, Wholesale } from "./pages/industry/index.js";
import { OncMfaUseCases, ApiDeveloperPortal, ElixirCertifiedModule } from "./pages/Elixir/index.js";
import { Finacast, Ecourier, DuplicateSearchAndMerge } from "./pages/Products/index.js";
import Careers from "./pages/careers/index.js";
import { CybersecuritySOCAnalyst } from "./pages/careers/jobs/index.js";
import { NETSUITE_PAGES, WORKDAY_PAGES, CLOUD_PAGES, INTEGRATION_PAGES, INDUSTRY_PAGES, ELIXIR_PAGES, PRODUCT_PAGES, CAREER_PAGES } from "./config/pageSlugs.js";
import Blog from "./pages/Blog/Blog.jsx";
import BlogDetail from "./pages/BlogDetail/BlogDetail.jsx";
import Insights from "./pages/Insights/Insights.jsx";

// Industry and Elixir pages each live under a shared parent route, so
// each child path is derived from its own full slug in pageSlugs.js
// (stripping the shared prefix) rather than hardcoded here. Elixir has
// no bare "/elixir" route — the nav's "Elixir (EHR)" heading links out
// to the external elixirehr.com site instead of a page in this project.
const industryChildPath = (fullSlug) => fullSlug.split("/").pop();

// Careers job pages live under a shared "/careers" parent
// route (same pathless-parent nesting as /industry and /elixir above),
// with the hub page itself as that parent's index route.
const careerChildPath = (fullSlug) => fullSlug.split("/").pop();

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToHash />
      <Header />
      <main id="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/company/contact" element={<Contact />} />
          <Route path="/ai-consulting" element={<AIConsulting />} />
          <Route path="/ai-readiness" element={<AIReadiness />} />
          <Route path="/ai-roadmap-governance" element={<AIRoadmapGovernance />} />
          <Route path="/ai-enablement" element={<AIEnablement />} />
          <Route path="/agentic-orchestration" element={<AgenticOrchestration />} />
          <Route path="/agent-development" element={<AgentDevelopment />} />
          <Route path="/ai-data-foundations" element={<AIDataFoundations />} />
          <Route path="/salesforce-ai-services" element={<SalesforceAIServices />} />
          <Route path="/agentforce" element={<Agentforce />} />
          <Route path="/data-cloud" element={<DataCloud />} />
          <Route path="/ai-velocity-engines" element={<AIVelocityEngines />} />
          <Route path="/ai-accelerator-aria" element={<AIAcceleratorAria />} />
          <Route path="/kratu-ai" element={<KratuAI />} />
          <Route path="/altruta-ai" element={<AltrutaAI />} />
          <Route path="/salesforce-ai-case-management" element={<CaseRezolver />} />
          <Route path="/netsuite-ai" element={<NetSuiteAI />} />
          <Route path="/salesforce-consulting-development-services" element={<SalesforceConsulting />} />
          <Route path="/salesforce" element={<SalesforceClouds />} />
          <Route path="/salesforce/sales-cloud" element={<SalesCloud />} />
          <Route path="/salesforce/service-cloud" element={<ServiceCloud />} />
          <Route path="/salesforce/marketing-cloud" element={<MarketingCloud />} />
          <Route path="/salesforce/revenue-cloud" element={<RevenueCloud />} />
          <Route path="/salesforce/health-cloud" element={<HealthCloud />} />
          <Route path="/salesforce/manufacturing-cloud" element={<ManufacturingCloud />} />
          <Route path="/salesforce-developer-services" element={<DeveloperServices />} />
          <Route path="/salesforce-financial-services" element={<FinancialServices />} />
          <Route path="/salesforce-managed-services" element={<AdminSupport />} />
          <Route path="/oracle-fusion-applications-implementation" element={<FusionImplementation />} />
          <Route path="/oracle-fusion/erp-consulting" element={<ErpConsulting />} />
          <Route path="/oracle-fusion/hcm-consulting" element={<HcmConsulting />} />
          <Route path="/oracle-fusion/cx-consulting" element={<CxConsulting />} />
          <Route path="/oracle-fusion/epm-consulting" element={<EpmConsulting />} />
          <Route path="/oracle-fusion/scm-consulting" element={<ScmConsulting />} />
          <Route path="/oracle-premium-support-service" element={<PremiumSupport />} />
          <Route path="/oracle-managed-service" element={<ManagedServices />} />
          <Route path="/servicenow" element={<ServiceNow />} />
          <Route path="/servicenow-consulting-development-services" element={<ConsultingDevelopmentServices />} />
          <Route path="/servicenow-technology-workflows" element={<TechnologyWorkflows />} />
          <Route path="/servicenow-customer-workflows" element={<CustomerWorkflows />} />
          <Route path="/servicenow-employee-workflows" element={<EmployeeWorkflows />} />
          <Route path="/servicenow-creator-workflows" element={<CreatorWorkflows />} />
          <Route path="/servicenow-support-managed-services" element={<SupportManagedServices />} />
          <Route path={NETSUITE_PAGES.AI.slug} element={<NetsuiteAI />} />
          <Route path={NETSUITE_PAGES.IMPLEMENTATION.slug} element={<NetsuiteImplementation />} />
          <Route path={NETSUITE_PAGES.SUPPORT_SERVICES.slug} element={<NetsuiteSupportServices />} />
          <Route path={WORKDAY_PAGES.CONSULTING_DEVELOPMENT.slug} element={<WorkdayConsultingDevelopment />} />
          <Route path={WORKDAY_PAGES.SUPPORT_MANAGED_SERVICES.slug} element={<WorkdaySupportManagedServices />} />
          <Route path={CLOUD_PAGES.SETUP_MIGRATION.slug} element={<CloudSetupMigration />} />
          <Route path={CLOUD_PAGES.SITE_RELIABILITY_ENGINEERING.slug} element={<SiteReliabilityEngineering />} />
          <Route path={CLOUD_PAGES.INFRA_MANAGEMENT.slug} element={<InfrastructureManagement />} />
          <Route path={INTEGRATION_PAGES.ENTERPRISE.slug} element={<EnterpriseIntegrationServices />} />
          <Route path={INTEGRATION_PAGES.BOOMI.slug} element={<BoomiIntegrationServices />} />
          <Route path={INTEGRATION_PAGES.MULESOFT.slug} element={<MuleSoftImplementation />} />
          <Route path="/industries">
            <Route path={industryChildPath(INDUSTRY_PAGES.PRIVATE_EQUITY.slug)} element={<PrivateEquity />} />
            <Route path={industryChildPath(INDUSTRY_PAGES.ECOMMERCE.slug)} element={<Ecommerce />} />
            <Route path={industryChildPath(INDUSTRY_PAGES.EDUCATION.slug)} element={<Education />} />
            <Route path={industryChildPath(INDUSTRY_PAGES.FINANCIAL_SERVICES.slug)} element={<IndustryFinancialServices />} />
            <Route path={industryChildPath(INDUSTRY_PAGES.HI_TECH.slug)} element={<HiTech />} />
            <Route path={industryChildPath(INDUSTRY_PAGES.HEALTHCARE.slug)} element={<Healthcare />} />
            <Route path={industryChildPath(INDUSTRY_PAGES.WHOLESALE.slug)} element={<Wholesale />} />
          </Route>
          {/* Elixir pages no longer share a common URL prefix post-migration —
              each is now an independent top-level route. */}
          <Route path={ELIXIR_PAGES.ONC_MFA_USE_CASES.slug} element={<OncMfaUseCases />} />
          <Route path={ELIXIR_PAGES.API_DEVELOPER_PORTAL.slug} element={<ApiDeveloperPortal />} />
          <Route path={ELIXIR_PAGES.CERTIFIED_MODULE.slug} element={<ElixirCertifiedModule />} />
          <Route path={PRODUCT_PAGES.FINACAST.slug} element={<Finacast />} />
          <Route path={PRODUCT_PAGES.ECOURIER.slug} element={<Ecourier />} />
          <Route path={PRODUCT_PAGES.DUPLICATE_SEARCH_MERGE.slug} element={<DuplicateSearchAndMerge />} />
          <Route path={CAREER_PAGES.HUB.slug}>
            <Route index element={<Careers />} />
            <Route path={careerChildPath(CAREER_PAGES.CYBERSECURITY_SOC_ANALYST.slug)} element={<CybersecuritySOCAnalyst />} />
          </Route>
          <Route path="/insights" element={<Insights />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />

          {/* Legacy slug redirects — old URLs kept live so bookmarked/indexed
              links land on the new canonical page instead of breaking. */}
          <Route path="/industry/private-equity" element={<Navigate to="/industries/private-equity" replace />} />
          <Route path="/industry/hi-tech" element={<Navigate to="/industries/hi-tech" replace />} />
          <Route path="/industry/financial-services" element={<Navigate to="/industries/financial-services" replace />} />
          <Route path="/industry/healthcare" element={<Navigate to="/industries/healthcare" replace />} />
          <Route path="/platforms/salesforce/clouds/manufacturing-cloud" element={<Navigate to="/salesforce/manufacturing-cloud" replace />} />
          <Route path="/industry/ecommerce" element={<Navigate to="/industries/e-commerce" replace />} />
          <Route path="/industry/wholesale" element={<Navigate to="/industries/wholesale" replace />} />
          <Route path="/industry/education" element={<Navigate to="/industries/education" replace />} />
          <Route path="/platforms/salesforce/development-consulting" element={<Navigate to="/salesforce-consulting-development-services" replace />} />
          <Route path="/platforms/salesforce/developer-services" element={<Navigate to="/salesforce-developer-services" replace />} />
          <Route path="/platforms/salesforce/admin-support" element={<Navigate to="/salesforce-managed-services" replace />} />
          <Route path="/platforms/salesforce/clouds/sales-cloud" element={<Navigate to="/salesforce/sales-cloud" replace />} />
          <Route path="/platforms/salesforce/clouds/service-cloud" element={<Navigate to="/salesforce/service-cloud" replace />} />
          <Route path="/platforms/salesforce/clouds/marketing-cloud" element={<Navigate to="/salesforce/marketing-cloud" replace />} />
          <Route path="/platforms/salesforce/clouds/revenue-cloud" element={<Navigate to="/salesforce/revenue-cloud" replace />} />
          <Route path="/platforms/salesforce/clouds/health-cloud" element={<Navigate to="/salesforce/health-cloud" replace />} />
          <Route path="/platforms/servicenow/consulting-development-services" element={<Navigate to="/servicenow-consulting-development-services" replace />} />
          <Route path="/platforms/servicenow/technology-workflows" element={<Navigate to="/servicenow-technology-workflows" replace />} />
          <Route path="/platforms/servicenow/customer-workflows" element={<Navigate to="/servicenow-customer-workflows" replace />} />
          <Route path="/platforms/servicenow/employee-workflows" element={<Navigate to="/servicenow-employee-workflows" replace />} />
          <Route path="/platforms/servicenow/creator-workflows" element={<Navigate to="/servicenow-creator-workflows" replace />} />
          <Route path="/platforms/servicenow/support-managed-services" element={<Navigate to="/servicenow-support-managed-services" replace />} />
          <Route path="/platforms/oracle/fusion-implementation/erp-consulting" element={<Navigate to="/oracle-fusion/erp-consulting" replace />} />
          <Route path="/platforms/oracle/fusion-implementation/hcm-consulting" element={<Navigate to="/oracle-fusion/hcm-consulting" replace />} />
          <Route path="/platforms/oracle/fusion-implementation/cx-consulting" element={<Navigate to="/oracle-fusion/cx-consulting" replace />} />
          <Route path="/platforms/oracle/fusion-implementation/epm-consulting" element={<Navigate to="/oracle-fusion/epm-consulting" replace />} />
          <Route path="/platforms/oracle/fusion-implementation/scm-consulting" element={<Navigate to="/oracle-fusion/scm-consulting" replace />} />
          <Route path="/platforms/oracle/fusion-implementation" element={<Navigate to="/oracle-fusion-applications-implementation" replace />} />
          <Route path="/platforms/oracle/premium-support-service" element={<Navigate to="/oracle-premium-support-service" replace />} />
          <Route path="/platforms/oracle/support-services" element={<Navigate to="/oracle-managed-service" replace />} />
          <Route path="/platforms/cloud/setup-migration" element={<Navigate to="/cloud-setup-migration" replace />} />
          <Route path="/platforms/cloud/sre-security" element={<Navigate to="/cloud-site-reliability-engineering" replace />} />
          <Route path="/platforms/cloud/infra-management" element={<Navigate to="/cloud-infrastructure-setup-migration" replace />} />
          <Route path="/platforms/workday/consulting-development" element={<Navigate to="/workday-consulting-development" replace />} />
          <Route path="/platforms/workday/managed-services" element={<Navigate to="/workday-support-managed-services" replace />} />
          <Route path="/boomi-integration-services-solutions" element={<Navigate to="/boomi-integration-services" replace />} />
          <Route path="/mulesoft-implementation" element={<Navigate to="/mulesoft-integration-services" replace />} />
          <Route path="/platforms/netsuite/implementation" element={<Navigate to="/netsuite-implementation-development" replace />} />
          <Route path="/platforms/netsuite/ai-consulting" element={<Navigate to="/netsuite-ai-consulting" replace />} />
          <Route path="/platforms/netsuite/managed-services" element={<Navigate to="/netsuite-support-services" replace />} />
          <Route path="/platforms/salesforce/clouds" element={<Navigate to="/salesforce" replace />} />
          <Route path="/platforms/servicenow" element={<Navigate to="/servicenow" replace />} />
          <Route path="/company/careers" element={<Navigate to="/careers" replace />} />
          <Route path="/ecourier" element={<Navigate to="/ecourier-report-scheduler" replace />} />
          <Route path="/duplicate-search-and-merge" element={<Navigate to="/duplicate-search-merge" replace />} />
          <Route path="/elixir/onc-mfa-use-cases" element={<Navigate to="/onc-mfa-use-cases" replace />} />
          <Route path="/elixir/api-developer-portal" element={<Navigate to="/api-developer-portal" replace />} />
          <Route path="/elixir/elixir-certified-module" element={<Navigate to="/elixir-certified-module" replace />} />

          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
