import { BrowserRouter, Routes, Route } from "react-router-dom";

// Auth feature imports
import LoginPage from "../features/auth/pages/Login/LoginPage";
import UserRegisterPage from "../features/auth/pages/Register/UserRegisterPage";

// Admin feature imports
import AdminLoginPage from "../features/admin/pages/Login/AdminLoginPage";
import HospitalRegisterPage from "../features/admin/pages/Register/AdminRegisterPage";
import CreateHospitalPage from "../features/admin/pages/CreateHospital/CreateHospitalPage";
import AdminDashboardPage from "../features/admin/pages/Dashboard/AdminDashboardPage"; // Updated path
import HospitalOnboardingRoute from "./HospitalOnboardingRoute";

import AdminOnboardingRoute from "./AdminOnboardingRoute";

// Structural Routing Layout components
import AdminRoute from "./AdminProtectedRoute";
import AdminPublicRoute from "./AdminPublicRoute";
import AdminLayoutWrapper from "./AdminLayoutWrapper";
import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";
import HomePage from "../features/auth/pages/Home/HomePage";
import GatewayPage from "../features/onboarding/RegisterSelectionPage";
import VerifyOtpPage from "../features/auth/pages/VerifyOtp/VerifyOtpPage";
import AdminRedirect from "./AdminRedirect";


import NotFoundPage from "../shared/pages/NotFoundPage"


export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* User Routes */}
        <Route
          path="/register"
          element={
            <PublicRoute>
              <GatewayPage />
            </PublicRoute>
          }
        />

        <Route
          path="/register/user"
          element={
            <PublicRoute>
              <UserRegisterPage />
            </PublicRoute>
          }
        />

        <Route
          path="/verify-otp"
          element={
            <PublicRoute>
              <VerifyOtpPage />
            </PublicRoute>
          }
        />

        <Route
          path="/user/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />

        {/* Admin Public Routes */}
        <Route
          path="/register/hospital"
          element={
            <AdminPublicRoute>
              <HospitalRegisterPage />
            </AdminPublicRoute>
          }
        />

        <Route
          path="/admin/login"
          element={
            <AdminPublicRoute>
              <AdminLoginPage />
            </AdminPublicRoute>
          }
        />

        {/* Admin Redirect */}
        <Route
          path="/admin"
          element={<AdminRedirect />}
        />

        {/* Create Hospital */}
        <Route
          path="/admin/create-hospital"
          element={
            <AdminRoute>
              <AdminOnboardingRoute>
                <CreateHospitalPage />
              </AdminOnboardingRoute>
            </AdminRoute>
          }
        />

        {/* Dashboard Routes */}
        <Route
          element={
            <AdminRoute>
              <HospitalOnboardingRoute>
                <AdminLayoutWrapper />
              </HospitalOnboardingRoute>
            </AdminRoute>
          }
        >
          <Route
            path="/admin/dashboard"
            element={<AdminDashboardPage />}
          />
        </Route>

        <Route
        path="*"
         element={<NotFoundPage />}
/>

      </Routes>
    </BrowserRouter>
  );
}