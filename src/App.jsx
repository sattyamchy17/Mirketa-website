import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Home from "./pages/Home/Home.jsx";
import AIConsulting from "./pages/AIConsulting/AIConsulting.jsx";
import AIReadiness from "./pages/AIReadiness/AIReadiness.jsx";
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

// Careers job pages live under a shared "/company/careers" parent
// route (same pathless-parent nesting as /industry and /elixir above),
// with the hub page itself as that parent's index route.
const careerChildPath = (fullSlug) => fullSlug.split("/").pop();

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <main id="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ai-consulting" element={<AIConsulting />} />
          <Route path="/ai-readiness" element={<AIReadiness />} />
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
          <Route path="/platforms/salesforce/development-consulting" element={<SalesforceConsulting />} />
          <Route path="/platforms/salesforce/clouds" element={<SalesforceClouds />} />
          <Route path="/platforms/salesforce/clouds/sales-cloud" element={<SalesCloud />} />
          <Route path="/platforms/salesforce/clouds/service-cloud" element={<ServiceCloud />} />
          <Route path="/platforms/salesforce/clouds/marketing-cloud" element={<MarketingCloud />} />
          <Route path="/platforms/salesforce/clouds/revenue-cloud" element={<RevenueCloud />} />
          <Route path="/platforms/salesforce/clouds/health-cloud" element={<HealthCloud />} />
          <Route path="/platforms/salesforce/clouds/manufacturing-cloud" element={<ManufacturingCloud />} />
          <Route path="/platforms/salesforce/developer-services" element={<DeveloperServices />} />
          <Route path="/salesforce-financial-services" element={<FinancialServices />} />
          <Route path="/platforms/salesforce/admin-support" element={<AdminSupport />} />
          <Route path="/platforms/oracle/fusion-implementation" element={<FusionImplementation />} />
          <Route path="/platforms/oracle/fusion-implementation/erp-consulting" element={<ErpConsulting />} />
          <Route path="/platforms/oracle/fusion-implementation/hcm-consulting" element={<HcmConsulting />} />
          <Route path="/platforms/oracle/fusion-implementation/cx-consulting" element={<CxConsulting />} />
          <Route path="/platforms/oracle/fusion-implementation/epm-consulting" element={<EpmConsulting />} />
          <Route path="/platforms/oracle/fusion-implementation/scm-consulting" element={<ScmConsulting />} />
          <Route path="/platforms/oracle/premium-support-service" element={<PremiumSupport />} />
          <Route path="/platforms/oracle/support-services" element={<ManagedServices />} />
          <Route path="/platforms/servicenow" element={<ServiceNow />} />
          <Route path="/platforms/servicenow/consulting-development-services" element={<ConsultingDevelopmentServices />} />
          <Route path="/platforms/servicenow/technology-workflows" element={<TechnologyWorkflows />} />
          <Route path="/platforms/servicenow/customer-workflows" element={<CustomerWorkflows />} />
          <Route path="/platforms/servicenow/employee-workflows" element={<EmployeeWorkflows />} />
          <Route path="/platforms/servicenow/creator-workflows" element={<CreatorWorkflows />} />
          <Route path="/platforms/servicenow/support-managed-services" element={<SupportManagedServices />} />
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
          <Route path="/industry">
            <Route path={industryChildPath(INDUSTRY_PAGES.PRIVATE_EQUITY.slug)} element={<PrivateEquity />} />
            <Route path={industryChildPath(INDUSTRY_PAGES.ECOMMERCE.slug)} element={<Ecommerce />} />
            <Route path={industryChildPath(INDUSTRY_PAGES.EDUCATION.slug)} element={<Education />} />
            <Route path={industryChildPath(INDUSTRY_PAGES.FINANCIAL_SERVICES.slug)} element={<IndustryFinancialServices />} />
            <Route path={industryChildPath(INDUSTRY_PAGES.HI_TECH.slug)} element={<HiTech />} />
            <Route path={industryChildPath(INDUSTRY_PAGES.HEALTHCARE.slug)} element={<Healthcare />} />
            <Route path={industryChildPath(INDUSTRY_PAGES.WHOLESALE.slug)} element={<Wholesale />} />
          </Route>
          <Route path="/elixir">
            <Route path={industryChildPath(ELIXIR_PAGES.ONC_MFA_USE_CASES.slug)} element={<OncMfaUseCases />} />
            <Route path={industryChildPath(ELIXIR_PAGES.API_DEVELOPER_PORTAL.slug)} element={<ApiDeveloperPortal />} />
            <Route path={industryChildPath(ELIXIR_PAGES.CERTIFIED_MODULE.slug)} element={<ElixirCertifiedModule />} />
          </Route>
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
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
