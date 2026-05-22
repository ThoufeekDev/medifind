import { BrowserRouter, Routes, Route } from "react-router-dom"

import RegisterPage from "../features/auth/pages/RegisterPage"
import VerifyOtpPage from "../features/auth/pages/VerifyOtpPage"


import HomePage from "../features/auth/pages/HomePage"
import LoginPage from "../features/auth/pages/LoginPage"

import ProtectedRoute from "./ProtectedRoute"

import PublicRoute from "./PublicRoute"

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/register" element={
                    <PublicRoute>
                        <RegisterPage />
                    </PublicRoute>

                } />
                <Route path="/verify-otp" element={

                    <PublicRoute>
                        <VerifyOtpPage />
                    </PublicRoute>
                } />

                <Route path="/login" element={
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

            </Routes>
        </BrowserRouter>
    )
}