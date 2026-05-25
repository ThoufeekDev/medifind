import { BrowserRouter, Routes, Route } from "react-router-dom"

import RegisterPage from "../features/auth/pages/UserRegisterPage"
import VerifyOtpPage from "../features/auth/pages/VerifyOtpPage"


import HomePage from "../features/auth/pages/HomePage"
import LoginPage from "../features/auth/pages/LoginPage"

import GatewayPage from "../features/onboarding/RegisterSelectionPage"

import ProtectedRoute from "./ProtectedRoute"

import PublicRoute from "./PublicRoute"
import AdminLoginPage from "../features/admin/pages/AdminLoginPage"
import HospitalRegisterPage from "../features/admin/pages/HospitalRegisterPage"

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/register"
                element={
                    <PublicRoute>
                        <GatewayPage/>
                        </PublicRoute>
                }
                />
                <Route path="/register/user" element={
                    <PublicRoute>
                        <RegisterPage />
                    </PublicRoute>

                } />
                <Route path="/verify-otp" element={

                    <PublicRoute>
                        <VerifyOtpPage />
                    </PublicRoute>
                } />

                <Route path="/login/user" element={
                    <PublicRoute>
                        <LoginPage />
                    </PublicRoute>
                } />
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <HomePage />
                        </ProtectedRoute>

                    }
                />


                <Route
                path="/register/hospital"
                element={<HospitalRegisterPage/>}
                />

                <Route path="admin/login" element={
                    <AdminLoginPage/>
                }/>

            </Routes>
        </BrowserRouter>
    )
}