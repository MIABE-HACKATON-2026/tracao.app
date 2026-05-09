import { BrowserRouter, Navigate, Route, Routes } from "react-router"
import LoginPage from "./features-by-actors/auth/pages/LoginPage"
import ChoiceAccountType from "./features-by-actors/auth/pages/ChoiceAccountType"
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

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/register" element={<Navigate to="/account-choice" replace />} />

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
      </Routes>
    </BrowserRouter>
  )
}

export default App
