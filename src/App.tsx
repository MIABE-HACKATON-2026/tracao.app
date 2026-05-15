import { BrowserRouter, Navigate, Route, Routes, Outlet } from "react-router-dom"
import LoginPage from "./features-by-actors/auth/pages/LoginPage"
import ChoiceAccountType from "./features-by-actors/auth/pages/ChoiceAccountType"
import FarmersDashboard from "./features-by-actors/farms/pages/FarmersDashboard"
import FarmersParcels from "./features-by-actors/farms/pages/FarmersParcels"
import FarmersParcelsNew from "./features-by-actors/farms/pages/FarmersParcelsNew"
import FarmersParcelsDetails from "./features-by-actors/farms/pages/FarmersParcelsDetails"
import FarmersLots from "./features-by-actors/farms/pages/FarmersLots"
import FarmersHarvests from "./features-by-actors/farms/pages/FarmersHarvests"
import FarmersScan from "./features-by-actors/farms/pages/FarmersScan"
import FarmersTransactions from "./features-by-actors/farms/pages/FarmersTransactions"
import FarmersKYC from "./features-by-actors/farms/pages/FarmersKYC"
import FarmersProfile from "./features-by-actors/farms/pages/FarmersProfile"
import FarmersSupport from "./features-by-actors/farms/pages/FarmersSupport"
import BuyersDashboard from "./features-by-actors/buyers/pages/Dashboard"
import BuyerProfile from "./features-by-actors/buyers/pages/Profile"
import Market from "./features-by-actors/buyers/pages/Market"
import BuyerTransactions from "./features-by-actors/buyers/pages/Transactions"
import Traceability from "./features-by-actors/buyers/pages/Traceability"
import BlockchainProof from "./features-by-actors/buyers/pages/BlockchainProof"
import BuyerTransportManagement from "./features-by-actors/buyers/pages/TransportManagement"
import BuyerTransportRegistry from "./features-by-actors/buyers/pages/BuyerTransportRegistry"
import BuyerTransformations from "./features-by-actors/buyers/pages/Transformations"
import ComplianceCheck from "./features-by-actors/buyers/pages/ComplianceCheck"
import BuyerScannerQR from "./features-by-actors/buyers/pages/ScannerQR"
import ComplianceReports from "./features-by-actors/buyers/pages/ComplianceReports"
import StoresDashboard from "./features-by-actors/stores/pages/Dashboard"
import CoopProfile from "./features-by-actors/stores/pages/CoopProfile"
import Members from "./features-by-actors/stores/pages/Members"
import Agents from "./features-by-actors/stores/pages/Agents"
import ParcelsValidation from "./features-by-actors/stores/pages/ParcelsValidation"
import BatchesValidation from "./features-by-actors/stores/pages/BatchesValidation"
import ValidationsHistory from "./features-by-actors/stores/pages/ValidationsHistory"
import PendingRequests from "./features-by-actors/stores/pages/PendingRequests"
import TransportRegistry from "./features-by-actors/stores/pages/TransportRegistry"
import Transports from "./features-by-actors/stores/pages/Transports"
import FraudAlerts from "./features-by-actors/stores/pages/FraudAlerts"
import StoresReports from "./features-by-actors/stores/pages/Reports"
import StoreTransactions from "./features-by-actors/stores/pages/Transactions"
import InspectorDashboard from "./features-by-actors/stores/pages/inspector/InspectorDashboard"
import Missions from "./features-by-actors/stores/pages/inspector/Missions"
import ParcelsToInspect from "./features-by-actors/stores/pages/inspector/ParcelsToInspect"
import BatchesToVerify from "./features-by-actors/stores/pages/inspector/BatchesToVerify"
import InspectorScan from "./features-by-actors/stores/pages/inspector/InspectorScan"
import InspectorValidationsHistory from "./features-by-actors/stores/pages/inspector/InspectorValidationsHistory"
import TerrainReports from "./features-by-actors/stores/pages/inspector/TerrainReports"

// Operator pages
import TransporterDash from "./features-by-actors/transporters/pages/Dashboard"
import TransporterProfile from "./features-by-actors/transporters/pages/Profile"
import TransporterDeliveries from "./features-by-actors/transporters/pages/Deliveries"
import TransporterPending from "./features-by-actors/transporters/pages/PendingDeliveries"
import TransporterTracking from "./features-by-actors/transporters/pages/DeliveryTracking"
import TransporterScan from "./features-by-actors/transporters/pages/Scan"
import TransporterHistory from "./features-by-actors/transporters/pages/DeliveryHistory"
import ProcessorDash from "./features-by-actors/processors/pages/Dashboard"
import ProcessorAssignments from "./features-by-actors/processors/pages/MyAssignments"
import { InputLots, OutputLots } from "./features-by-actors/processors/pages/Lots"
import ProcessorHistory from "./features-by-actors/processors/pages/History"
import { ProcessorTrace } from "./features-by-actors/processors/pages/History"
import ProcessorProfile from "./features-by-actors/processors/pages/Profile"
import ProcessorTransformations from "./features-by-actors/processors/pages/Transformations"
import AgentDash from "./features-by-actors/agents/pages/Dashboard"
import AgentCreateFarmer from "./features-by-actors/agents/pages/CreateFarmer"
import AgentCaptureKYC from "./features-by-actors/agents/pages/CaptureKYC"
import AgentParcels from "./features-by-actors/agents/pages/TerrainParcels"
import AgentDataEntry from "./features-by-actors/agents/pages/DataEntry"
import AgentMissions from "./features-by-actors/agents/pages/Missions"
import AgentSync from "./features-by-actors/agents/pages/SyncQueue"
import AgentProfile from "./features-by-actors/agents/pages/Profile"
// Admin pages
import AdminDash from "./features-by-actors/admin/pages/Dashboard"
import AdminProfile from "./features-by-actors/admin/pages/Profile"
import AdminUsersPage from "./features-by-actors/admin/pages/Users"
import { AdminStores, AdminKYC, AdminBatches, AdminTransactions, AdminFraud, AdminBlockchain, AdminReports, AdminLogs } from "./features-by-actors/admin/pages/AdminPages"
import { NationalDashboard, ProductionStats, GlobalTraceability, EUDRCompliance, Audit } from "./features-by-actors/admin/pages/AdminPages"
import { CertDashboard, CertList, CertifiedParcels, CertifiedBatches } from "./features-by-actors/admin/pages/AdminPages"
import { AuthGuard, RoleGuard } from "./shared/middlewares/guards"
import DashboardLayout from "./shared/layouts/DashboardLayout"
import LoginAsOperatorPage from "./features-by-actors/auth/pages/operators/LoginAsOperatorPage"
import LoginAsOperatorPasswordPage from "./features-by-actors/auth/pages/operators/LoginAsOperatorPasswordPage"
import FarmersPersonalInfosPage from "./features-by-actors/auth/pages/farmers/FarmersPersonalInfosPage"
import FarmersContactInfosPage from "./features-by-actors/auth/pages/farmers/FarmersContactInfosPage"
import FarmersProfilVerificationPage from "./features-by-actors/auth/pages/farmers/FarmersProfilVerificationPage"
import FarmersOTPCodePage from "./features-by-actors/auth/pages/farmers/FarmersOTPCodePage"
import StoresPersonalInfosPage from "./features-by-actors/auth/pages/stores/StoresPersonalInfosPage"
import StoresOfficialProofPage from "./features-by-actors/auth/pages/stores/StoresOfficialProofPage"
import StoresConnectionInfoPage from "./features-by-actors/auth/pages/stores/StoresConnectionInfoPage"
import StoresOTPCodePage from "./features-by-actors/auth/pages/stores/StoresOTPCodePage"
import BuyerIndividualPersonalInfosPage from "./features-by-actors/auth/pages/buyer/individual/BuyerIndividualPersonalInfosPage"
import BuyerIndividualContactInfosPage from "./features-by-actors/auth/pages/buyer/individual/BuyerIndividualContactInfosPage"
import BuyerIndividualOTPCodePage from "./features-by-actors/auth/pages/buyer/individual/BuyerIndividualOTPCodePage"
import BuyerIndividualProfilVerificationPage from "./features-by-actors/auth/pages/buyer/individual/BuyerIndividualProfilVerificationPage"
import BuyerCompanyPersonalInfosPage from "./features-by-actors/auth/pages/buyer/company/BuyerCompanyPersonalInfosPage"
import BuyerCompanyContactInfosPage from "./features-by-actors/auth/pages/buyer/company/BuyerCompanyContactInfosPage"
import BuyerCompanyOfficialProofPage from "./features-by-actors/auth/pages/buyer/company/BuyerCompanyOfficialProofPage"
import BuyerCompanyConnectionInfoPage from "./features-by-actors/auth/pages/buyer/company/BuyerCompanyConnectionInfoPage"
import BuyerCompanyOTPCodePage from "./features-by-actors/auth/pages/buyer/company/BuyerCompanyOTPCodePage"
import BuyerInstitutionPersonalInfosPage from "./features-by-actors/auth/pages/buyer/institution/BuyerInstitutionPersonalInfosPage"
import BuyerInstitutionContactInfosPage from "./features-by-actors/auth/pages/buyer/institution/BuyerInstitutionContactInfosPage"
import BuyerInstitutionOfficialProofPage from "./features-by-actors/auth/pages/buyer/institution/BuyerInstitutionOfficialProofPage"
import BuyerInstitutionConnectionInfoPage from "./features-by-actors/auth/pages/buyer/institution/BuyerInstitutionConnectionInfoPage"
import BuyerInstitutionOTPCodePage from "./features-by-actors/auth/pages/buyer/institution/BuyerInstitutionOTPCodePage"
import ForgotPasswordPage from "./features-by-actors/auth/pages/password-recovery/ForgotPasswordPage"
import ResetPasswordPage from "./features-by-actors/auth/pages/password-recovery/ResetPasswordPage"
import PasswordResetSuccessPage from "./features-by-actors/auth/pages/password-recovery/PasswordResetSuccessPage"
import SetupPasswordPage from "./features-by-actors/auth/pages/SetupPasswordPage"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/register" element={<Navigate to="/account-choice" replace />} />
        <Route path="/setup-password" element={<SetupPasswordPage />} />

        <Route path="login">
          <Route index element={<LoginPage />}></Route>
          <Route path="as-operator" element={<LoginAsOperatorPage />}></Route>
          <Route path="as-operator/password" element={<LoginAsOperatorPasswordPage />}></Route>
        </Route>

        <Route path="reset-password">
          <Route index element={<ForgotPasswordPage />}></Route>
          <Route path="form" element={<ResetPasswordPage />}></Route>
          <Route path="success" element={<PasswordResetSuccessPage />}></Route>
        </Route>

        <Route path="farmers">
          <Route index element={<Navigate to="/farmers/personals-info" replace />} />
          <Route path="personals-info" element={<FarmersPersonalInfosPage />}></Route>
          <Route path="contact-infos" element={<FarmersContactInfosPage />}></Route>
          <Route path="profil-verification" element={<FarmersProfilVerificationPage />}></Route>
          <Route path="otp-code" element={<FarmersOTPCodePage />}></Route>
        </Route>

        <Route path="stores">
          <Route index element={<Navigate to="/stores/personals-info" replace />} />
          <Route path="personals-info" element={<StoresPersonalInfosPage />}></Route>
          <Route path="official-proof" element={<StoresOfficialProofPage />}></Route>
          <Route path="connection-infos" element={<StoresConnectionInfoPage />}></Route>
          <Route path="otp-code" element={<StoresOTPCodePage />}></Route>
        </Route>

        <Route path="buyers">

          <Route path="individual">
            <Route index element={<Navigate to="/buyers/individual/personals-info" replace />} />
            <Route path="personals-info" element={<BuyerIndividualPersonalInfosPage />}></Route>
            <Route path="contact-infos" element={<BuyerIndividualContactInfosPage />}></Route>
            <Route path="profil-verification" element={<BuyerIndividualProfilVerificationPage />}></Route>
            <Route path="otp-code" element={<BuyerIndividualOTPCodePage />}></Route>
          </Route>

          <Route path="company">
            <Route index element={<Navigate to="/buyers/company/personals-info" replace />} />
            <Route path="personals-info" element={<BuyerCompanyPersonalInfosPage />}></Route>
            <Route path="contact-infos" element={<BuyerCompanyContactInfosPage />}></Route>
            <Route path="official-proof" element={<BuyerCompanyOfficialProofPage />}></Route>
            <Route path="connection-info" element={<BuyerCompanyConnectionInfoPage />}></Route>
            <Route path="otp-code" element={<BuyerCompanyOTPCodePage />}></Route>
          </Route>

          <Route path="institution">
            <Route index element={<Navigate to="/buyers/institution/personals-info" replace />} />
            <Route path="personals-info" element={<BuyerInstitutionPersonalInfosPage />}></Route>
            <Route path="contact-infos" element={<BuyerInstitutionContactInfosPage />}></Route>
            <Route path="official-proof" element={<BuyerInstitutionOfficialProofPage />}></Route>
            <Route path="connection-info" element={<BuyerInstitutionConnectionInfoPage />}></Route>
            <Route path="otp-code" element={<BuyerInstitutionOTPCodePage />}></Route>
          </Route>

        </Route>

        <Route path="/account-choice" element={<ChoiceAccountType />}></Route>

        {/* Tableau de Bord Protégés */}
        <Route element={<AuthGuard />}>
          <Route element={<DashboardLayout children={<Outlet />} />}>

            <Route element={<RoleGuard allowedRoles={["farmer"]} />}>
              <Route path="/farmers/dashboard" element={<FarmersDashboard />} />
              <Route path="/farmers/parcels" element={<FarmersParcels />} />
              <Route path="/farmers/parcels/new" element={<FarmersParcelsNew />} />
              <Route path="/farmers/parcels/:id" element={<FarmersParcelsDetails />} />
              <Route path="/farmers/lots" element={<FarmersLots />} />
              <Route path="/farmers/harvests" element={<FarmersHarvests />} />
              <Route path="/farmers/scan" element={<FarmersScan />} />
              <Route path="/farmers/transactions" element={<FarmersTransactions />} />
              <Route path="/farmers/kyc" element={<FarmersKYC />} />
              <Route path="/farmers/profile" element={<FarmersProfile />} />
              <Route path="/farmers/support" element={<FarmersSupport />} />
            </Route>

            <Route element={<RoleGuard allowedRoles={["buyer"]} />}>
              <Route path="/buyers/dashboard" element={<BuyersDashboard />} />
              <Route path="/buyers/profile" element={<BuyerProfile />} />
              <Route path="/buyers/market" element={<Market />} />
              <Route path="/buyers/transactions" element={<BuyerTransactions />} />
              <Route path="/buyers/traceability" element={<Traceability />} />
              <Route path="/buyers/blockchain" element={<BlockchainProof />} />
              <Route path="/buyers/transport" element={<BuyerTransportManagement />} />
              <Route path="/buyers/transport/registry" element={<BuyerTransportRegistry />} />
              <Route path="/buyers/transformations" element={<BuyerTransformations />} />
              {/* Importateur routes */}
              <Route path="/buyers/compliance" element={<ComplianceCheck />} />
              <Route path="/buyers/scan" element={<BuyerScannerQR />} />
              <Route path="/buyers/imports" element={<BuyerTransactions />} />
              <Route path="/buyers/compliance/reports" element={<ComplianceReports />} />
            </Route>

            <Route element={<RoleGuard allowedRoles={["store"]} />}>
              <Route path="/stores/dashboard" element={<StoresDashboard />} />
              <Route path="/stores/profile" element={<CoopProfile />} />
              <Route path="/stores/members" element={<Members />} />
              <Route path="/stores/agents" element={<Agents />} />
              <Route path="/stores/parcels/validation" element={<ParcelsValidation />} />
              <Route path="/stores/batches/validation" element={<BatchesValidation />} />
              <Route path="/stores/validations/history" element={<ValidationsHistory />} />
              <Route path="/stores/pending" element={<PendingRequests />} />
              <Route path="/stores/transport/registry" element={<TransportRegistry />} />
              <Route path="/stores/transport" element={<Transports />} />
              <Route path="/stores/fraud" element={<FraudAlerts />} />
              <Route path="/stores/reports" element={<StoresReports />} />
              <Route path="/stores/transactions" element={<StoreTransactions />} />
              {/* Inspecteur routes */}
              <Route path="/stores/inspector/dashboard" element={<InspectorDashboard />} />
              <Route path="/stores/inspector/missions" element={<Missions />} />
              <Route path="/stores/inspector/parcels" element={<ParcelsToInspect />} />
              <Route path="/stores/inspector/batches" element={<BatchesToVerify />} />
              <Route path="/stores/inspector/history" element={<InspectorValidationsHistory />} />
              <Route path="/stores/inspector/scan" element={<InspectorScan />} />
              <Route path="/stores/inspector/reports" element={<TerrainReports />} />
            </Route>

            <Route element={<RoleGuard allowedRoles={["processor"]} />}>
              <Route path="/processors/dashboard" element={<ProcessorDash />} />
              <Route path="/processors/assignments" element={<ProcessorAssignments />} />
              <Route path="/processors/transformations" element={<ProcessorTransformations />} />
              <Route path="/processors/inputs" element={<InputLots />} />
              <Route path="/processors/outputs" element={<OutputLots />} />
              <Route path="/processors/history" element={<ProcessorHistory />} />
              <Route path="/processors/traceability" element={<ProcessorTrace />} />
              <Route path="/processors/profile" element={<ProcessorProfile />} />
            </Route>

            <Route element={<RoleGuard allowedRoles={["transporter"]} />}>
              <Route path="/transporters/dashboard" element={<TransporterDash />} />
              <Route path="/transporters/profile" element={<TransporterProfile />} />
              <Route path="/transporters/deliveries" element={<TransporterDeliveries />} />
              <Route path="/transporters/pending" element={<TransporterPending />} />
              <Route path="/transporters/tracking" element={<TransporterTracking />} />
              <Route path="/transporters/scan" element={<TransporterScan />} />
              <Route path="/transporters/history" element={<TransporterHistory />} />
            </Route>

            <Route element={<RoleGuard allowedRoles={["agent"]} />}>
              <Route path="/agents/dashboard" element={<AgentDash />} />
              <Route path="/agents/create-farmer" element={<AgentCreateFarmer />} />
              <Route path="/agents/kyc" element={<AgentCaptureKYC />} />
              <Route path="/agents/parcels" element={<AgentParcels />} />
              <Route path="/agents/data" element={<AgentDataEntry />} />
              <Route path="/agents/missions" element={<AgentMissions />} />
              <Route path="/agents/sync" element={<AgentSync />} />
              <Route path="/agents/profile" element={<AgentProfile />} />
            </Route>

            {/* Super Admin — accès total */}
            <Route element={<RoleGuard allowedRoles={["admin"]} allowedSubRoles={["super_admin"]} />}>
              <Route path="/admin/dashboard" element={<AdminDash />} />
              <Route path="/admin/profile" element={<AdminProfile />} />
              <Route path="/admin/users" element={<AdminUsersPage />} />
              <Route path="/admin/stores" element={<AdminStores />} />
              <Route path="/admin/kyc" element={<AdminKYC />} />
              <Route path="/admin/batches" element={<AdminBatches />} />
              <Route path="/admin/transactions" element={<AdminTransactions />} />
              <Route path="/admin/fraud" element={<AdminFraud />} />
              <Route path="/admin/blockchain" element={<AdminBlockchain />} />
              <Route path="/admin/reports" element={<AdminReports />} />
              <Route path="/admin/logs" element={<AdminLogs />} />
            </Route>

            {/* Gouvernement — accès réglementaire */}
            <Route element={<RoleGuard allowedRoles={["admin"]} allowedSubRoles={["gouvernement"]} />}>
              <Route path="/gov/dashboard" element={<NationalDashboard />} />
              <Route path="/gov/stats" element={<ProductionStats />} />
              <Route path="/gov/trace" element={<GlobalTraceability />} />
              <Route path="/gov/blockchain" element={<AdminBlockchain />} />
              <Route path="/gov/eudr" element={<EUDRCompliance />} />
              <Route path="/gov/audit" element={<Audit />} />
              <Route path="/gov/reports" element={<AdminReports />} />
            </Route>

            {/* Certificateur — accès métier */}
            <Route element={<RoleGuard allowedRoles={["admin"]} allowedSubRoles={["certificateur"]} />}>
              <Route path="/cert/dashboard" element={<CertDashboard />} />
              <Route path="/cert/certifications" element={<CertList />} />
              <Route path="/cert/parcels" element={<CertifiedParcels />} />
              <Route path="/cert/batches" element={<CertifiedBatches />} />
              <Route path="/cert/blockchain" element={<AdminBlockchain />} />
              <Route path="/cert/reports" element={<AdminReports />} />
            </Route>

          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
