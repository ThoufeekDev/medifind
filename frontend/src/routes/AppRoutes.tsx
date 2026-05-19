import {BrowserRouter,Routes,Route} from "react-router-dom"

import RegisterPage from "../features/auth/pages/RegisterPage"
import VerifyOtpPage from "../features/auth/pages/VerifyOtpPage"


import HomePage from "../features/auth/pages/HomePage"
export default function AppRoutes() {
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/register" element={<RegisterPage/>}/>
            <Route path="/verify-otp" element={<VerifyOtpPage/>}/>

            <Route path="/home" element={<HomePage/>}/>
        </Routes>
        </BrowserRouter>
    )
}