// ============================================================
// CENTRALIZED IMAGE REGISTRY
// Every image used anywhere in the app is imported once here and
// re-exported as a single `Images` object. Components never import
// an image file directly — they import { Images } from this file.
//
// To replace an image later: drop the new file in the same path
// (same filename) OR point the import below at a new filename.
// No component code ever needs to change.
// ============================================================

// ---------- Logo ----------
import logo from "./logo/logo.png";

// ---------- Clients / trust badges ----------
import clientSalesforce from "./clients/salesforce.svg";
import clientHipaa from "./clients/hipaa.svg";
import clientSoc2 from "./clients/soc2.svg";
import clientExperience from "./clients/experience.svg";
import clientEnterprise from "./clients/enterprise.svg";

// ---------- Services ("What We Do" icons) ----------
import serviceAiCx from "./services/ai-cx.svg";
import serviceLegacySystems from "./services/legacy-systems.svg";
import serviceOperateScale from "./services/operate-scale.svg";

// ---------- Generic UI icons ----------
import iconPlay from "./icons/play.svg";
import iconQuote from "./icons/quote.svg";
import iconCheckCircle from "./icons/check-circle.svg";

// ---------- Industries ----------
import industryHealthcare from "./industries/healthcare.jpg";
import industryHiTech from "./industries/hi-tech.jpg";
import industryManufacturing from "./industries/manufacturing.jpg";
import industryNonprofits from "./industries/nonprofits.jpg";

import industryEducation from "./industries/education.svg";
import industryFinancialServices from "./industries/financial-services.svg";

// ---------- AI Spotlight ----------
import aiNetworkPattern from "./ai/ai-network.svg";

// ---------- Blogs / Latest Insights ----------
import blog1 from "./blogs/blog-1.svg";
import blog2 from "./blogs/blog-2.svg";
import blog3 from "./blogs/blog-3.svg";
import blog4 from "./blogs/blog-4.svg";

// ---------- Products & IP ----------
import productElixir from "./products/elixir.svg";
import productRrd from "./products/rrd.svg";
import productEcourier from "./products/ecourier.svg";
import productDuplicateSearchMerge from "./products/duplicate-search-merge.svg";
import productAiAccelerators from "./products/ai-accelerators.svg";

// ---------- AI Consulting page: hero ----------
import heroAiConsulting from "./hero/ai-consulting-hero.svg";

// ---------- AI Consulting page: services ----------
import serviceReadinessAssessment from "./services/readiness-assessment.svg";
import serviceStrategyRoadmap from "./services/strategy-roadmap.svg";
import serviceEnablementImplementation from "./services/enablement-implementation.svg";
import serviceAgenticOrchestration from "./services/agentic-orchestration.svg";
import serviceAgentDevelopment from "./services/agent-development.svg";

// ---------- AI Consulting page: challenge + journey icons ----------
import iconChallengeData from "./icons/challenge-data.svg";
import iconChallengePilot from "./icons/challenge-pilot.svg";
import iconChallengeCompliance from "./icons/challenge-compliance.svg";
import iconChallengePriority from "./icons/challenge-priority.svg";
import iconOptimize from "./icons/optimize.svg";

// ---------- AI Consulting page: additional industries ----------
// (Healthcare, Manufacturing, Nonprofits, Financial Services are reused
// from the Home page registry entries above.)
import industryTechnologySaas from "./industries/technology-saas.svg";
import industryRetailEcommerce from "./industries/retail-ecommerce.svg";

// ---------- AI Readiness page: hero ----------
import heroAiReadiness from "./hero/ai-readiness-hero-bg.svg";

// ---------- AI Readiness page: the enterprise AI problem ----------
import iconProblemStart from "./icons/problem-start.svg";
import iconProblemData from "./icons/problem-data.svg";
import iconProblemUsecase from "./icons/problem-usecase.svg";
import iconProblemRollout from "./icons/problem-rollout.svg";
import iconProblemTalent from "./icons/problem-talent.svg";
import iconProblemGovernance from "./icons/problem-governance.svg";

// ---------- AI Readiness page: assessment framework dimensions ----------
import iconDimensionBusiness from "./icons/dimension-business.svg";
import iconDimensionData from "./icons/dimension-data.svg";
import iconDimensionTechnology from "./icons/dimension-technology.svg";
import iconDimensionProcess from "./icons/dimension-process.svg";
import iconDimensionTalent from "./icons/dimension-talent.svg";
import iconDimensionGovernance from "./icons/dimension-governance.svg";
import illoAiReadinessMaturityScorecard from "./illustrations/ai-readiness-maturity-scorecard.svg";

// ---------- AI Roadmap Governance page ----------
import heroAiRoadmapGovernance from "./hero/ai-roadmap-governance-hero-bg.svg";
import iconDimensionSecurity from "./icons/dimension-security.svg";

// ---------- About Us page ----------
import heroAboutUs from "./hero/about-us-hero-bg.svg";

// ---------- Home page: hero slider ----------
import heroSlideAiRoadmapGovernance from "../slider/new/ARIA-AI-Banner (1).png";
import heroSlideAltrutaAiNonprofit from "../slider/new/Altruta-AI-Banner (1).png";
import heroSlideKratuAiHealthcare from "../slider/new/Kratu-AI-Banner (1).png";

// ---------- AI Readiness page: use-case readiness tiers ----------
import iconTierQuickwins from "./icons/tier-quickwins.svg";
import iconTierStrategic from "./icons/tier-strategic.svg";
import iconTierFuture from "./icons/tier-future.svg";

// ---------- AI Readiness page: risk categories ----------
import iconRiskTechnical from "./icons/risk-technical.svg";
import iconRiskOrganizational from "./icons/risk-organizational.svg";
import iconRiskCompliance from "./icons/risk-compliance.svg";

// ---------- AI Readiness page: deliverables ----------
import iconDeliverableScore from "./icons/deliverable-score.svg";
import iconDeliverableGap from "./icons/deliverable-gap.svg";
import iconDeliverableUsecases from "./icons/deliverable-usecases.svg";
import iconDeliverableRoadmap from "./icons/deliverable-roadmap.svg";
import iconDeliverableRoi from "./icons/deliverable-roi.svg";

// ---------- AI Readiness page: platforms / services offered ----------
import iconPlatformOracle from "./icons/platform-oracle.svg";
import iconPlatformNetsuite from "./icons/platform-netsuite.svg";
import iconPlatformServicenow from "./icons/platform-servicenow.svg";
import iconPlatformWorkday from "./icons/platform-workday.svg";
import iconPlatformCloud from "./icons/platform-cloud.svg";
import iconPlatformIntegration from "./icons/platform-integration.svg";

// ---------- AI Readiness page: industries served (icon chips) ----------
import iconIndustryHitech from "./icons/industry-hitech.svg";
import iconIndustryWholesale from "./icons/industry-wholesale.svg";
import iconIndustryEducation from "./icons/industry-education.svg";
import iconIndustryNonprofits from "./icons/industry-nonprofits.svg";
import iconIndustryHealthcare from "./icons/industry-healthcare.svg";
import iconIndustryEcommerce from "./icons/industry-ecommerce.svg";
import iconIndustryPrivateEquity from "./icons/industry-private-equity.svg";
import iconIndustryManufacturing from "./icons/industry-manufacturing.svg";
import iconIndustryFinancialServices from "./icons/industry-financial-services.svg";
import iconIndustryInsurance from "./icons/industry-insurance.svg";
import iconIndustryPublicSector from "./icons/industry-public-sector.svg";

// ---------- AI Enablement page ----------
import heroAiEnablement from "./hero/ai-enablement-hero-bg.svg";
import iconPillarConnectivity from "./icons/pillar-connectivity.svg";

// ---------- Agentic Orchestration & Legacy Integration page ----------
import heroAgenticOrchestration from "./hero/agentic-orchestration-hero-bg.svg";
import iconLegacyBridge from "./icons/legacy-bridge.svg";
import iconPatternFanout from "./icons/pattern-fanout.svg";
import iconPatternDag from "./icons/pattern-dag.svg";
import iconPatternOrchestratorSubagent from "./icons/pattern-orchestrator-subagent.svg";
import diagramMxnTrap from "./icons/diagram-mxn-trap.svg";
import diagramOrchestrationHub from "./icons/diagram-orchestration-hub.svg";

// ---------- Agent Development page ----------
import heroAgentDevelopment from "./hero/agent-development-hero-bg.svg";
import iconProcessGoalReceived from "./icons/process-goal-received.svg";
import iconProcessReasonPlan from "./icons/process-reason-plan.svg";
import iconProcessUseTools from "./icons/process-use-tools.svg";
import iconProcessObserveAdapt from "./icons/process-observe-adapt.svg";
import iconProcessDeliverOutcome from "./icons/process-deliver-outcome.svg";
import iconCapabilityCustomAgent from "./icons/capability-custom-agent.svg";
import iconCapabilityAgentforce from "./icons/capability-agentforce.svg";
import iconAgentTypeTaskExecution from "./icons/agent-type-task-execution.svg";
import iconAgentTypeConversational from "./icons/agent-type-conversational.svg";
import iconAgentTypeResearch from "./icons/agent-type-research.svg";
import iconAgentTypeOrchestrator from "./icons/agent-type-orchestrator.svg";

// ---------- AI Data Foundations page ----------
import heroAiDataFoundations from "./hero/ai-data-foundations-hero-bg.svg";
import iconServiceRag from "./icons/service-rag.svg";
import iconServiceMdm from "./icons/service-mdm.svg";
import iconServiceDataCloud from "./icons/service-data-cloud.svg";
import iconLayerSourceSystems from "./icons/layer-source-systems.svg";
import iconLayerDataFabric from "./icons/layer-data-fabric.svg";
import iconLayerVectorServices from "./icons/layer-vector-services.svg";
import iconTechAnalyticalFoundation from "./icons/tech-analytical-foundation.svg";
import iconTechCustomerDataPlatform from "./icons/tech-customer-data-platform.svg";

// ---------- Salesforce AI Services & CRM Solutions page ----------
import heroSalesforceAiServices from "./hero/salesforce-ai-services-hero-bg.svg";
import iconEinsteinPredictive from "./icons/einstein-predictive.svg";
import iconEinsteinBots from "./icons/einstein-bots.svg";
import iconEinsteinCopilot from "./icons/einstein-copilot.svg";
import productFinacast from "./products/finacast.svg";

// ---------- Agentforce page ----------
import heroAgentforce from "./hero/agentforce-hero-bg.svg";
import iconCapabilitySlack from "./icons/capability-slack.svg";
import iconAgentActions from "./icons/agent-actions.svg";

// ---------- Data Cloud page ----------
import heroDataCloud from "./hero/data-cloud-hero-bg.svg";
import iconIdentityResolution from "./icons/identity-resolution.svg";
import iconCapabilityIngestion from "./icons/capability-ingestion.svg";
import iconCapabilitySegments from "./icons/capability-segments.svg";
import iconLayerHarmonise from "./icons/layer-harmonise.svg";

// ---------- AI Velocity Engines hub page ----------
import heroAiVelocityEngines from "./hero/ai-velocity-engines-hero-bg.svg";
import iconVelocityDonor from "./icons/velocity-donor.svg";
import iconVelocityScribe from "./icons/velocity-scribe.svg";
import iconVelocityCodeAnalysis from "./icons/velocity-code-analysis.svg";
import iconVelocityScheduling from "./icons/velocity-scheduling.svg";
import illoMultiAgentPipeline from "./illustrations/multi-agent-pipeline.svg";

// ---------- AI Accelerator Aria page ----------
import heroAiAcceleratorAria from "./hero/ai-accelerator-aria-hero-bg.svg";
import iconAriaProblemTimeline from "./icons/aria-problem-timeline.svg";
import iconAriaProblemObjects from "./icons/aria-problem-objects.svg";
import iconAriaProblemReengage from "./icons/aria-problem-reengage.svg";
import iconAriaProblemValidation from "./icons/aria-problem-validation.svg";
import iconAriaModeUpload from "./icons/aria-mode-upload.svg";
import iconAriaModeWizard from "./icons/aria-mode-wizard.svg";
import iconAriaModePrompt from "./icons/aria-mode-prompt.svg";
import iconAriaPillarCpq from "./icons/aria-pillar-cpq.svg";
import iconAriaPillarBilling from "./icons/aria-pillar-billing.svg";
import iconAriaPillarClm from "./icons/aria-pillar-clm.svg";
import iconAriaCapCopilot from "./icons/aria-cap-copilot.svg";
import iconAriaCapEditable from "./icons/aria-cap-editable.svg";
import iconAriaCapValidation from "./icons/aria-cap-validation.svg";
import iconAriaCapWaterfall from "./icons/aria-cap-waterfall.svg";
import iconAriaCapCurrency from "./icons/aria-cap-currency.svg";
import iconAriaCapProdguard from "./icons/aria-cap-prodguard.svg";
import iconAriaCapChangeset from "./icons/aria-cap-changeset.svg";
import iconAriaCapSession from "./icons/aria-cap-session.svg";
import iconAriaTrustReview from "./icons/aria-trust-review.svg";
import iconAriaTrustSandbox from "./icons/aria-trust-sandbox.svg";
import iconAriaTrustGuards from "./icons/aria-trust-guards.svg";
import iconAriaTrustNoinstall from "./icons/aria-trust-noinstall.svg";
import iconAriaTrustRetention from "./icons/aria-trust-retention.svg";
import iconAriaTrustInfra from "./icons/aria-trust-infra.svg";
import illoAriaQuoteToCashPipeline from "./illustrations/aria-quote-to-cash-pipeline.svg";

// ---------- Salesforce Development & Consulting Services page ----------
import heroSalesforceConsulting from "./hero/salesforce-consulting-hero-bg.svg";

// ---------- Salesforce Clouds page ----------
import heroSalesforceClouds from "./hero/salesforce-clouds-hero-bg.svg";
import illoSalesforceCloudsArchitectureMap from "./illustrations/salesforce-clouds-architecture-map.svg";

// ---------- Salesforce Sales Cloud page ----------
import heroSalesforceSalesCloud from "./hero/salesforce-sales-cloud-hero-bg.svg";
import illoSalesCloudDashboard from "./illustrations/sales-cloud-dashboard.svg";
import illoSalesPipeline from "./illustrations/sales-pipeline.svg";
import illoOpportunityManagement from "./illustrations/opportunity-management.svg";
import illoLeadManagement from "./illustrations/lead-management.svg";
import illoAccountContactManagement from "./illustrations/account-contact-management.svg";
import illoAiSalesAssistant from "./illustrations/ai-sales-assistant.svg";
import illoForecastDashboard from "./illustrations/forecast-dashboard.svg";
import illoWorkflowAutomation from "./illustrations/workflow-automation.svg";
import illoCrmIntegrations from "./illustrations/crm-integrations.svg";
import illoEnterpriseSalesTeam from "./illustrations/enterprise-sales-team.svg";
import illoCustomerJourney from "./illustrations/customer-journey.svg";
import illoMobileSales from "./illustrations/mobile-sales.svg";
import illoRevenueGrowth from "./illustrations/revenue-growth.svg";

// ---------- Salesforce Service Cloud page ----------
import heroSalesforceServiceCloud from "./hero/salesforce-service-cloud-hero-bg.svg";
import illoOmnichannelSupport from "./illustrations/omnichannel-support.svg";
import illoCaseManagementWorkflow from "./illustrations/case-management-workflow.svg";
import illoAiAgentCopilot from "./illustrations/ai-agent-copilot.svg";
import illoKnowledgeBase from "./illustrations/knowledge-base.svg";
import illoServiceConsole from "./illustrations/service-console.svg";
import illoCustomer360 from "./illustrations/customer-360.svg";
import illoCsatGrowth from "./illustrations/csat-growth.svg";

// ---------- Salesforce Marketing Cloud page ----------
import heroSalesforceMarketingCloud from "./hero/salesforce-marketing-cloud-hero-bg.svg";
import illoCustomerJourneyBuilder from "./illustrations/customer-journey-builder.svg";
import illoEmailAutomationWorkflow from "./illustrations/email-automation-workflow.svg";
import illoAiCampaignRecommendations from "./illustrations/ai-campaign-recommendations.svg";
import illoCustomerSegmentation from "./illustrations/customer-segmentation.svg";
import illoMarketingAnalyticsDashboard from "./illustrations/marketing-analytics-dashboard.svg";
import illoPersonalizationEngine from "./illustrations/personalization-engine.svg";
import illoMultichannelEngagement from "./illustrations/multichannel-engagement.svg";
import iconIndustryConsumerGoods from "./icons/industry-consumer-goods.svg";

// ---------- Salesforce Revenue Cloud page ----------
import heroSalesforceRevenueCloud from "./hero/salesforce-revenue-cloud-hero-bg.svg";
import illoCpqWorkflow from "./illustrations/cpq-workflow.svg";
import illoQuoteToCashPipeline from "./illustrations/quote-to-cash-pipeline.svg";
import illoBillingAutomation from "./illustrations/billing-automation.svg";
import illoSubscriptionManagement from "./illustrations/subscription-management.svg";
import illoAiPricingRecommendations from "./illustrations/ai-pricing-recommendations.svg";
import illoContractLifecycle from "./illustrations/contract-lifecycle.svg";
import illoRevenueForecastGrowth from "./illustrations/revenue-forecast-growth.svg";
import iconIndustryTelecommunications from "./icons/industry-telecommunications.svg";
import iconIndustryProfessionalServices from "./icons/industry-professional-services.svg";

// ---------- Health Cloud page ----------
import heroHealthCloud from "./hero/health-cloud-hero-bg.svg";
import illoPatient360View from "./illustrations/patient-360-view.svg";
import illoCareCoordinationTeam from "./illustrations/care-coordination-team.svg";
import illoClinicalTimeline from "./illustrations/clinical-timeline.svg";
import illoAiClinicalIntelligence from "./illustrations/ai-clinical-intelligence.svg";
import illoEhrIntegration from "./illustrations/ehr-integration.svg";
import illoCarePlanManagement from "./illustrations/care-plan-management.svg";
import illoHealthcareAnalyticsDashboard from "./illustrations/healthcare-analytics-dashboard.svg";

// ---------- Salesforce Manufacturing Cloud page ----------
import heroManufacturingCloud from "./hero/manufacturing-cloud-hero-bg.svg";
import illoManufacturingEcosystem from "./illustrations/manufacturing-ecosystem.svg";
import illoProductionScheduling from "./illustrations/production-scheduling.svg";
import illoAccountBasedForecasting from "./illustrations/account-based-forecasting.svg";
import illoDealerPortal from "./illustrations/dealer-portal.svg";
import illoProductionPlanning from "./illustrations/production-planning.svg";
import illoAiReorderRecommendation from "./illustrations/ai-reorder-recommendation.svg";

// ---------- Salesforce Developer Services page ----------
import heroSalesforceDeveloperServices from "./hero/salesforce-developer-services-hero-bg.svg";
import illoCodeEditorApex from "./illustrations/code-editor-apex.svg";
import illoLwcComponentTree from "./illustrations/lwc-component-tree.svg";
import illoFlowAutomationCanvas from "./illustrations/flow-automation-canvas.svg";
import illoApiIntegrationHub from "./illustrations/api-integration-hub.svg";
import illoDevopsPipeline from "./illustrations/devops-pipeline.svg";
import illoAiCodeAssistant from "./illustrations/ai-code-assistant.svg";

// ---------- Salesforce Financial Services Cloud page ----------
import heroSalesforceFinancialServices from "./hero/salesforce-financial-services-hero-bg.svg";
import illoCustomer360Financial from "./illustrations/customer-360-financial.svg";
import illoAdvisorWorkspace from "./illustrations/advisor-workspace.svg";
import illoWealthPortfolioDashboard from "./illustrations/wealth-portfolio-dashboard.svg";
import illoAiFinancialInsights from "./illustrations/ai-financial-insights.svg";
import illoCoreBankingIntegration from "./illustrations/core-banking-integration.svg";
import illoComplianceWorkflow from "./illustrations/compliance-workflow.svg";

// ---------- Salesforce Developer Services & Admin Support page ----------
import heroSalesforceAdminSupport from "./hero/salesforce-admin-support-hero-bg.svg";
import illoAdminConsoleHealth from "./illustrations/admin-console-health.svg";
import illoDevCodeReview from "./illustrations/dev-code-review.svg";
import illoSupportTicketQueue from "./illustrations/support-ticket-queue.svg";
import illoPlatformMonitoring from "./illustrations/platform-monitoring.svg";
import illoTeamCollaboration from "./illustrations/team-collaboration.svg";
import illoSecurityReviewShield from "./illustrations/security-review-shield.svg";

// ---------- Kratu AI page ----------
import heroKratuAi from "./hero/kratu-ai-hero-bg.svg";
import iconKratuWorkflowClinical from "./icons/kratu-workflow-clinical.svg";
import iconKratuWorkflowRevenue from "./icons/kratu-workflow-revenue.svg";
import iconKratuWorkflowJourney from "./icons/kratu-workflow-journey.svg";
import iconKratuValueAudio from "./icons/kratu-value-audio.svg";
import iconKratuValuePolicy from "./icons/kratu-value-policy.svg";
import iconKratuValueRisk from "./icons/kratu-value-risk.svg";
import iconKratuValueDefense from "./icons/kratu-value-defense.svg";
import iconKratuChallengeDocumentation from "./icons/kratu-challenge-documentation.svg";
import iconKratuChallengePayer from "./icons/kratu-challenge-payer.svg";
import iconKratuChallengeRisk from "./icons/kratu-challenge-risk.svg";
import iconKratuPillarIngest from "./icons/kratu-pillar-ingest.svg";
import iconKratuPillarCapture from "./icons/kratu-pillar-capture.svg";
import iconKratuPillarGenerate from "./icons/kratu-pillar-generate.svg";
import iconKratuPillarScore from "./icons/kratu-pillar-score.svg";
import iconKratuPillarDefend from "./icons/kratu-pillar-defend.svg";
import iconKratuBuyerHospitals from "./icons/kratu-buyer-hospitals.svg";
import iconKratuBuyerPractice from "./icons/kratu-buyer-practice.svg";
import iconKratuBuyerRcm from "./icons/kratu-buyer-rcm.svg";
import iconKratuHighlightAmbient from "./icons/kratu-highlight-ambient.svg";
import iconKratuHighlightRelief from "./icons/kratu-highlight-relief.svg";
import iconKratuHighlightScoring from "./icons/kratu-highlight-scoring.svg";
import iconKratuHighlightDefense from "./icons/kratu-highlight-defense.svg";
import iconKratuWhySalesforce from "./icons/kratu-why-salesforce.svg";
import iconKratuWhyOutcomes from "./icons/kratu-why-outcomes.svg";
import iconKratuWhyWorkflow from "./icons/kratu-why-workflow.svg";
import iconKratuWhyScale from "./icons/kratu-why-scale.svg";
import illoKratuAmbientDocumentationDashboard from "./illustrations/kratu-ambient-documentation-dashboard.svg";

// ---------- Oracle Fusion Applications Implementation page ----------
import heroOracleFusion from "./hero/oracle-fusion-hero-bg.svg";

// ---------- Oracle Cloud ERP Consulting page (L3) ----------
import heroOracleErpConsulting from "./hero/oracle-erp-consulting-hero-bg.svg";

// ---------- Oracle HCM Consulting & Development Services page (L3) ----------
import heroOracleHcmConsulting from "./hero/oracle-hcm-consulting-hero-bg.svg";
import illoOracleHcmWorkforceDashboard from "./illustrations/oracle-hcm-workforce-dashboard.svg";

// ---------- Oracle CX Consulting & Development page (L3) ----------
import heroOracleCxConsulting from "./hero/oracle-cx-consulting-hero-bg.svg";
import illoOracleCxCaseConsole from "./illustrations/oracle-cx-case-console.svg";

// ---------- Oracle EPM Consulting Development Services page (L3) ----------
import heroOracleEpmConsulting from "./hero/oracle-epm-consulting-hero-bg.svg";
import illoOracleEpmCloseDashboard from "./illustrations/oracle-epm-close-dashboard.svg";

// ---------- Oracle SCM Consulting & Development page (L3) ----------
import heroOracleScmConsulting from "./hero/oracle-scm-consulting-hero-bg.svg";
import illoOracleScmSupplyChainDashboard from "./illustrations/oracle-scm-supply-chain-dashboard.svg";

// ---------- Oracle Premium Support Service page (L2) ----------
import heroOraclePremiumSupport from "./hero/oracle-premium-support-hero-bg.svg";

// ---------- Oracle Managed Services page (L2) ----------
import heroOracleManagedServices from "./hero/oracle-managed-services-hero-bg.svg";
import illoOracleManagedOpsDashboard from "./illustrations/oracle-managed-ops-dashboard.svg";

// ---------- ServiceNow module ----------
import heroServiceNowHub from "./hero/servicenow-hub-hero-bg.svg";
import heroServiceNowConsultingDevelopment from "./hero/servicenow-consulting-development-hero-bg.svg";
import heroServiceNowTechnologyWorkflows from "./hero/servicenow-technology-workflows-hero-bg.svg";
import heroServiceNowCustomerWorkflows from "./hero/servicenow-customer-workflows-hero-bg.svg";
import heroServiceNowEmployeeWorkflows from "./hero/servicenow-employee-workflows-hero-bg.svg";
import heroServiceNowCreatorWorkflows from "./hero/servicenow-creator-workflows-hero-bg.svg";
import heroServiceNowSupportManagedServices from "./hero/servicenow-support-managed-services-hero-bg.svg";
import illoServicenowHubDashboard from "./illustrations/servicenow-hub-dashboard.svg";
import illoServicenowCsmQueue from "./illustrations/servicenow-csm-queue.svg";
import illoServicenowHrsdOnboarding from "./illustrations/servicenow-hrsd-onboarding.svg";
import illoServicenowAppBuilder from "./illustrations/servicenow-app-builder.svg";
import illoServicenowManagedSla from "./illustrations/servicenow-managed-sla.svg";

// ---------- NetSuite module ----------
import heroNetSuiteImplementation from "./hero/netsuite-implementation-hero-bg.svg";
import heroNetSuiteAIConsulting from "./hero/netsuite-ai-consulting-hero-bg.svg";
import heroNetSuiteSupportServices from "./hero/netsuite-support-services-hero-bg.svg";
import illoNetsuiteSupportSlaDashboard from "./illustrations/netsuite-support-sla-dashboard.svg";
import illoNetsuiteImplementationTimeline from "./illustrations/netsuite-implementation-timeline.svg";
import illoNetsuiteAiForecastDashboard from "./illustrations/netsuite-ai-forecast-dashboard.svg";

// ---------- Workday module ----------
import heroWorkdayConsultingDevelopment from "./hero/workday-consulting-development-hero-bg.svg";
import heroWorkdaySupportManagedServices from "./hero/workday-support-managed-services-hero-bg.svg";
import illoWorkdayConsultingOrgDashboard from "./illustrations/workday-consulting-org-dashboard.svg";

// ---------- Cloud (AWS/Azure/GCP) module ----------
import heroCloudSetupMigration from "./hero/cloud-setup-migration-hero-bg.svg";
import heroCloudSreSecurity from "./hero/cloud-sre-security-hero-bg.svg";
import heroCloudInfraManagement from "./hero/cloud-infra-management-hero-bg.svg";
import heroAwsManagedServices from "./hero/aws-managed-services-hero-bg.svg";
import heroAzureManagedServices from "./hero/azure-managed-services-hero-bg.svg";
import heroVulnerabilityRemediationAgent from "./hero/vulnerability-remediation-agent-hero-bg.svg";
import illoCloudInfraUtilizationDashboard from "./illustrations/cloud-infra-utilization-dashboard.svg";
import illoCloudSreUptimeDashboard from "./illustrations/cloud-sre-uptime-dashboard.svg";
import illoCloudMigrationTimeline from "./illustrations/cloud-migration-timeline.svg";

// ---------- Integration & iPaaS module ----------
import heroEnterpriseIntegration from "./hero/enterprise-integration-services-hero-bg.svg";
import heroBoomiIntegration from "./hero/boomi-integration-services-hero-bg.svg";
import heroMuleSoftImplementation from "./hero/mulesoft-implementation-hero-bg.svg";
import illoIntegrationApiFlowDiagram from "./illustrations/integration-api-flow-diagram.svg";
import illoBoomiPipelineDashboard from "./illustrations/boomi-pipeline-dashboard.svg";
import illoMulesoftGatewayDashboard from "./illustrations/mulesoft-gateway-dashboard.svg";

// ---------- Industry module ----------
import heroIndustryPrivateEquity from "./hero/industry-private-equity-hero-bg.svg";
import heroIndustryEcommerce from "./hero/industry-ecommerce-hero-bg.svg";
import heroIndustryEducation from "./hero/industry-education-hero-bg.svg";
import heroIndustryFinancialServices from "./hero/industry-financial-services-hero-bg.svg";
import heroIndustryHiTech from "./hero/industry-hi-tech-hero-bg.svg";
import heroIndustryHealthcare from "./hero/industry-healthcare-hero-bg.svg";
import heroIndustryWholesale from "./hero/industry-wholesale-hero-bg.svg";
import illoErpFinancialsDashboard from "./illustrations/erp-financials-dashboard.svg";
import illoHcmWorkforceManagement from "./illustrations/hcm-workforce-management.svg";
import illoScmSupplyChain from "./illustrations/scm-supply-chain.svg";
import illoAiCopilotOracle from "./illustrations/ai-copilot-oracle.svg";
import illoLegacyToCloudMigration from "./illustrations/legacy-to-cloud-migration.svg";
import illoIntegrationHubOracle from "./illustrations/integration-hub-oracle.svg";
import illoIndustryPrivateEquityDashboard from "./illustrations/industry-private-equity-dashboard.svg";
import illoIndustryEcommerceDashboard from "./illustrations/industry-ecommerce-dashboard.svg";
import illoIndustryWholesaleDashboard from "./illustrations/industry-wholesale-dashboard.svg";

// ---------- Elixir (EHR) module ----------
import heroElixirOncMfaUseCases from "./hero/elixir-onc-mfa-hero-bg.svg";
import illoElixirOncMfaCompliance from "./illustrations/elixir-onc-mfa-compliance.svg";
import heroElixirApiDeveloperPortal from "./hero/elixir-api-developer-portal-hero-bg.svg";
import illoElixirApiPortalConsole from "./illustrations/elixir-api-portal-console.svg";
import heroElixirCertifiedModule from "./hero/elixir-certified-module-hero-bg.svg";
import illoElixirCertifiedModuleBadge from "./illustrations/elixir-certified-module-badge.svg";

// ---------- Products (Finacast / eCourier / Duplicate Search & Merge) ----------
import heroFinacast from "./hero/finacast-hero-bg.svg";
import illoFinacastForecastChart from "./illustrations/finacast-forecast-chart.svg";
import heroEcourier from "./hero/ecourier-hero-bg.svg";
import illoEcourierScheduleQueue from "./illustrations/ecourier-schedule-queue.svg";
import heroDuplicateSearchAndMerge from "./hero/duplicate-search-and-merge-hero-bg.svg";
import illoDuplicateSearchMergeBeforeAfter from "./illustrations/duplicate-search-merge-before-after.svg";

// ---------- Careers module ----------
import heroCareers from "./hero/careers-hero-bg.svg";
import heroCybersecuritySocAnalyst from "./hero/cybersecurity-soc-analyst-hero-bg.svg";

// ---------- Home page: real photography (2026 asset refresh) ----------
import homeHeroBanner from "../Home/Hero-banner/ai_hero_banner (1).jpg";
import homeAiSpotlightWave from "../Home/AI Spotlight/cyan_wave_banner.png";
import homeIndustryHealthcarePhoto from "../Home/Industry Specializations/industry_healthcare.png";
import homeIndustryManufacturingPhoto from "../Home/Industry Specializations/industry_manufacturing.png";
import homeIndustryHiTechPhoto from "../Home/Industry Specializations/industry_hitech.png";
import homeIndustryNonprofitsPhoto from "../Home/Industry Specializations/industry_nonprofit.png";
import homeIndustryEducationPhoto from "../Home/Industry Specializations/industry_education.png";
import homeIndustryFinancialServicesPhoto from "../Home/Industry Specializations/industry_finance.png";
import homeCustomerSuccessPhoto from "../Home/Customer Success/fd4cf941f486e50152402936d721367e4eaa3623 (1).png";
import homeProductsBg from "../Home/Products & IP/background/Section 8_ Products & IP (Modern Cards) (1).png";
import homeProductElixirLogo from "../Home/Products & IP/White-Logo 1.png";
import homeProductRrdLogo from "../Home/Products & IP/RRD_logo 1.png";
import homeProductEcourierLogo from "../Home/Products & IP/ScheduleReports__rslogo 1.png";
import homeContactCtaBg from "../Home/contact-bg/Contact Form.png";

export const Images = {
  logo,

  clientSalesforce,
  clientHipaa,
  clientSoc2,
  clientExperience,
  clientEnterprise,

  serviceAiCx,
  serviceLegacySystems,
  serviceOperateScale,

  iconPlay,
  iconQuote,
  iconCheckCircle,

  industryHealthcare,
  industryHiTech,
  industryManufacturing,
  industryNonprofits,
  industryEducation,
  industryFinancialServices,

  aiNetworkPattern,

  blog1,
  blog2,
  blog3,
  blog4,

  productElixir,
  productRrd,
  productEcourier,
  productDuplicateSearchMerge,
  productAiAccelerators,

  heroAiConsulting,

  serviceReadinessAssessment,
  serviceStrategyRoadmap,
  serviceEnablementImplementation,
  serviceAgenticOrchestration,
  serviceAgentDevelopment,

  iconChallengeData,
  iconChallengePilot,
  iconChallengeCompliance,
  iconChallengePriority,
  iconOptimize,

  industryTechnologySaas,
  industryRetailEcommerce,

  heroAiReadiness,

  iconProblemStart,
  iconProblemData,
  iconProblemUsecase,
  iconProblemRollout,
  iconProblemTalent,
  iconProblemGovernance,

  iconDimensionBusiness,
  iconDimensionData,
  iconDimensionTechnology,
  iconDimensionProcess,
  iconDimensionTalent,
  iconDimensionGovernance,
  heroAiRoadmapGovernance,
  iconDimensionSecurity,
  heroAboutUs,
  heroSlideAiRoadmapGovernance,
  heroSlideAltrutaAiNonprofit,
  heroSlideKratuAiHealthcare,
  illoAiReadinessMaturityScorecard,

  iconTierQuickwins,
  iconTierStrategic,
  iconTierFuture,

  iconRiskTechnical,
  iconRiskOrganizational,
  iconRiskCompliance,

  iconDeliverableScore,
  iconDeliverableGap,
  iconDeliverableUsecases,
  iconDeliverableRoadmap,
  iconDeliverableRoi,

  iconPlatformOracle,
  iconPlatformNetsuite,
  iconPlatformServicenow,
  iconPlatformWorkday,
  iconPlatformCloud,
  iconPlatformIntegration,

  iconIndustryHitech,
  iconIndustryWholesale,
  iconIndustryEducation,
  iconIndustryNonprofits,
  iconIndustryHealthcare,
  iconIndustryEcommerce,
  iconIndustryPrivateEquity,
  iconIndustryManufacturing,
  iconIndustryFinancialServices,
  iconIndustryInsurance,
  iconIndustryPublicSector,

  heroAiEnablement,
  iconPillarConnectivity,

  heroAgenticOrchestration,
  iconLegacyBridge,
  iconPatternFanout,
  iconPatternDag,
  iconPatternOrchestratorSubagent,
  diagramMxnTrap,
  diagramOrchestrationHub,

  heroAgentDevelopment,
  iconProcessGoalReceived,
  iconProcessReasonPlan,
  iconProcessUseTools,
  iconProcessObserveAdapt,
  iconProcessDeliverOutcome,
  iconCapabilityCustomAgent,
  iconCapabilityAgentforce,
  iconAgentTypeTaskExecution,
  iconAgentTypeConversational,
  iconAgentTypeResearch,
  iconAgentTypeOrchestrator,

  heroAiDataFoundations,
  iconServiceRag,
  iconServiceMdm,
  iconServiceDataCloud,
  iconLayerSourceSystems,
  iconLayerDataFabric,
  iconLayerVectorServices,
  iconTechAnalyticalFoundation,
  iconTechCustomerDataPlatform,

  heroSalesforceAiServices,
  iconEinsteinPredictive,
  iconEinsteinBots,
  iconEinsteinCopilot,
  productFinacast,

  heroAgentforce,
  iconCapabilitySlack,
  iconAgentActions,

  heroDataCloud,
  iconIdentityResolution,
  iconCapabilityIngestion,
  iconCapabilitySegments,
  iconLayerHarmonise,

  heroAiVelocityEngines,
  iconVelocityDonor,
  iconVelocityScribe,
  iconVelocityCodeAnalysis,
  iconVelocityScheduling,
  illoMultiAgentPipeline,

  heroAiAcceleratorAria,
  iconAriaProblemTimeline,
  iconAriaProblemObjects,
  iconAriaProblemReengage,
  iconAriaProblemValidation,
  iconAriaModeUpload,
  iconAriaModeWizard,
  iconAriaModePrompt,
  iconAriaPillarCpq,
  iconAriaPillarBilling,
  iconAriaPillarClm,
  iconAriaCapCopilot,
  iconAriaCapEditable,
  iconAriaCapValidation,
  iconAriaCapWaterfall,
  iconAriaCapCurrency,
  iconAriaCapProdguard,
  iconAriaCapChangeset,
  iconAriaCapSession,
  iconAriaTrustReview,
  iconAriaTrustSandbox,
  iconAriaTrustGuards,
  iconAriaTrustNoinstall,
  iconAriaTrustRetention,
  iconAriaTrustInfra,
  illoAriaQuoteToCashPipeline,

  heroKratuAi,
  iconKratuWorkflowClinical,
  iconKratuWorkflowRevenue,
  iconKratuWorkflowJourney,
  iconKratuValueAudio,
  iconKratuValuePolicy,
  iconKratuValueRisk,
  iconKratuValueDefense,
  iconKratuChallengeDocumentation,
  iconKratuChallengePayer,
  iconKratuChallengeRisk,
  iconKratuPillarIngest,
  iconKratuPillarCapture,
  iconKratuPillarGenerate,
  iconKratuPillarScore,
  iconKratuPillarDefend,
  iconKratuBuyerHospitals,
  iconKratuBuyerPractice,
  iconKratuBuyerRcm,
  iconKratuHighlightAmbient,
  iconKratuHighlightRelief,
  iconKratuHighlightScoring,
  iconKratuHighlightDefense,
  iconKratuWhySalesforce,
  iconKratuWhyOutcomes,
  iconKratuWhyWorkflow,
  iconKratuWhyScale,
  illoKratuAmbientDocumentationDashboard,

  heroSalesforceConsulting,

  heroSalesforceClouds,
  illoSalesforceCloudsArchitectureMap,

  heroSalesforceSalesCloud,
  illoSalesCloudDashboard,
  illoSalesPipeline,
  illoOpportunityManagement,
  illoLeadManagement,
  illoAccountContactManagement,
  illoAiSalesAssistant,
  illoForecastDashboard,
  illoWorkflowAutomation,
  illoCrmIntegrations,
  illoEnterpriseSalesTeam,
  illoCustomerJourney,
  illoMobileSales,
  illoRevenueGrowth,

  heroSalesforceServiceCloud,
  illoOmnichannelSupport,
  illoCaseManagementWorkflow,
  illoAiAgentCopilot,
  illoKnowledgeBase,
  illoServiceConsole,
  illoCustomer360,
  illoCsatGrowth,

  heroSalesforceMarketingCloud,
  illoCustomerJourneyBuilder,
  illoEmailAutomationWorkflow,
  illoAiCampaignRecommendations,
  illoCustomerSegmentation,
  illoMarketingAnalyticsDashboard,
  illoPersonalizationEngine,
  illoMultichannelEngagement,
  iconIndustryConsumerGoods,

  heroSalesforceRevenueCloud,
  illoCpqWorkflow,
  illoQuoteToCashPipeline,
  illoBillingAutomation,
  illoSubscriptionManagement,
  illoAiPricingRecommendations,
  illoContractLifecycle,
  illoRevenueForecastGrowth,
  iconIndustryTelecommunications,
  iconIndustryProfessionalServices,

  heroHealthCloud,
  illoPatient360View,
  illoCareCoordinationTeam,
  illoClinicalTimeline,
  illoAiClinicalIntelligence,
  illoEhrIntegration,
  illoCarePlanManagement,
  illoHealthcareAnalyticsDashboard,

  heroManufacturingCloud,
  illoManufacturingEcosystem,
  illoProductionScheduling,
  illoAccountBasedForecasting,
  illoDealerPortal,
  illoProductionPlanning,
  illoAiReorderRecommendation,

  heroSalesforceDeveloperServices,
  illoCodeEditorApex,
  illoLwcComponentTree,
  illoFlowAutomationCanvas,
  illoApiIntegrationHub,
  illoDevopsPipeline,
  illoAiCodeAssistant,

  heroSalesforceFinancialServices,
  illoCustomer360Financial,
  illoAdvisorWorkspace,
  illoWealthPortfolioDashboard,
  illoAiFinancialInsights,
  illoCoreBankingIntegration,
  illoComplianceWorkflow,

  heroSalesforceAdminSupport,
  illoAdminConsoleHealth,
  illoDevCodeReview,
  illoSupportTicketQueue,
  illoPlatformMonitoring,
  illoTeamCollaboration,
  illoSecurityReviewShield,

  heroOracleFusion,
  illoErpFinancialsDashboard,
  illoHcmWorkforceManagement,
  illoScmSupplyChain,
  illoAiCopilotOracle,
  illoLegacyToCloudMigration,
  illoIntegrationHubOracle,
  illoIndustryPrivateEquityDashboard,
  illoIndustryEcommerceDashboard,
  illoIndustryWholesaleDashboard,

  heroOracleErpConsulting,

  heroOracleHcmConsulting,
  illoOracleHcmWorkforceDashboard,

  heroOracleCxConsulting,
  illoOracleCxCaseConsole,

  heroOracleEpmConsulting,
  illoOracleEpmCloseDashboard,

  heroOracleScmConsulting,
  illoOracleScmSupplyChainDashboard,

  heroOraclePremiumSupport,

  heroOracleManagedServices,
  illoOracleManagedOpsDashboard,

  heroServiceNowHub,
  heroServiceNowConsultingDevelopment,
  heroServiceNowTechnologyWorkflows,
  heroServiceNowCustomerWorkflows,
  heroServiceNowEmployeeWorkflows,
  heroServiceNowCreatorWorkflows,
  heroServiceNowSupportManagedServices,
  illoServicenowHubDashboard,
  illoServicenowCsmQueue,
  illoServicenowHrsdOnboarding,
  illoServicenowAppBuilder,
  illoServicenowManagedSla,
  heroNetSuiteImplementation,
  heroNetSuiteAIConsulting,
  heroNetSuiteSupportServices,
  illoNetsuiteSupportSlaDashboard,
  illoNetsuiteImplementationTimeline,
  illoNetsuiteAiForecastDashboard,
  heroWorkdayConsultingDevelopment,
  heroWorkdaySupportManagedServices,
  illoWorkdayConsultingOrgDashboard,
  heroCloudSetupMigration,
  heroCloudSreSecurity,
  heroCloudInfraManagement,
  heroAwsManagedServices,
  heroAzureManagedServices,
  heroVulnerabilityRemediationAgent,
  illoCloudInfraUtilizationDashboard,
  illoCloudSreUptimeDashboard,
  illoCloudMigrationTimeline,
  heroEnterpriseIntegration,
  heroBoomiIntegration,
  heroMuleSoftImplementation,
  illoIntegrationApiFlowDiagram,
  illoBoomiPipelineDashboard,
  illoMulesoftGatewayDashboard,
  heroIndustryPrivateEquity,
  heroIndustryEcommerce,
  heroIndustryEducation,
  heroIndustryFinancialServices,
  heroIndustryHiTech,
  heroIndustryHealthcare,
  heroIndustryWholesale,

  heroElixirOncMfaUseCases,
  illoElixirOncMfaCompliance,
  heroElixirApiDeveloperPortal,
  illoElixirApiPortalConsole,
  heroElixirCertifiedModule,
  illoElixirCertifiedModuleBadge,

  heroFinacast,
  illoFinacastForecastChart,
  heroEcourier,
  illoEcourierScheduleQueue,
  heroDuplicateSearchAndMerge,
  illoDuplicateSearchMergeBeforeAfter,

  heroCareers,
  heroCybersecuritySocAnalyst,

  homeHeroBanner,
  homeAiSpotlightWave,
  homeIndustryHealthcarePhoto,
  homeIndustryManufacturingPhoto,
  homeIndustryHiTechPhoto,
  homeIndustryNonprofitsPhoto,
  homeIndustryEducationPhoto,
  homeIndustryFinancialServicesPhoto,
  homeCustomerSuccessPhoto,
  homeProductsBg,
  homeProductElixirLogo,
  homeProductRrdLogo,
  homeProductEcourierLogo,
  homeContactCtaBg,
};
