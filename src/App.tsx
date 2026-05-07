import { BrowserRouter, Navigate, Route, Routes } from "react-router"
import LoginPage from "./features-by-actors/auth/pages/LoginPage"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />}/>
        <Route path="/login" element={<LoginPage />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
