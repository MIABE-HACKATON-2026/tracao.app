import { BrowserRouter, Navigate, Route, Routes } from "react-router"
import LoginPage from "./features-by-actors/auth/pages/LoginPage"
import ChoiceAccountType from "./features-by-actors/auth/pages/ChoiceAccountType"
import LoginAsOperatorPage from "./features-by-actors/auth/pages/operators/LoginAsOperatorPage"
import LoginAsOperatorPasswordPage from "./features-by-actors/auth/pages/operators/LoginAsOperatorPasswordPage"
import FarmersPersonalInfosPage from "./features-by-actors/auth/pages/farmers/FarmersPersonalInfosPage"
import FarmersContactInfosPage from "./features-by-actors/auth/pages/farmers/FarmersContactInfosPage"
import FarmersProfilVerificationPage from "./features-by-actors/auth/pages/farmers/FarmersProfilVerificationPage"
import FarmersOTPCodePage from "./features-by-actors/auth/pages/farmers/FarmersOTPCodePage"
import StoresPersonalInfoPage from "./features-by-actors/auth/pages/stores/StoresPersonalInfoPage"
import StoresOfficalProofPage from "./features-by-actors/auth/pages/stores/StoresOfficalProofPage"
import StoresConnectionInfoPage from "./features-by-actors/auth/pages/stores/StoresConnectionInfoPage"
import StoresOTPCodePage from "./features-by-actors/auth/pages/stores/StoresOTPCodePage"

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

        <Route path="farmers">
          <Route index element={<Navigate to="/farmers/personals-info" replace />} />
          <Route path="personals-info" element={<FarmersPersonalInfosPage />}></Route>
          <Route path="contact-infos" element={<FarmersContactInfosPage />}></Route>
          <Route path="profil-verification" element={<FarmersProfilVerificationPage />}></Route>
          <Route path="otp-code" element={<FarmersOTPCodePage />}></Route>
        </Route>

        <Route path="stores">
          <Route index element={<Navigate to="/stores/personals-info" replace />} />
          <Route path="personals-info" element={<StoresPersonalInfoPage />}></Route>
          <Route path="official-proof" element={<StoresOfficalProofPage />}></Route>
          <Route path="connection-infos" element={<StoresConnectionInfoPage />}></Route>
          <Route path="otp-code" element={<StoresOTPCodePage />}></Route>
        </Route>

        <Route path="/account-choice" element={<ChoiceAccountType />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
