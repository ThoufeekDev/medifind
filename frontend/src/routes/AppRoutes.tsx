import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

import Loader from "../components/common/Loader";

// Lazy Loaded Pages
const LoginPage = lazy(
  () => import("../features/auth/pages/Login/LoginPage")
);

const UserRegisterPage = lazy(
  () => import("../features/auth/pages/Register/UserRegisterPage")
);

const VerifyOtpPage = lazy(
  () => import("../features/auth/pages/VerifyOtp/VerifyOtpPage")
);

const HomePage = lazy(
  () => import("../features/auth/pages/Home/HomePage")
);

const GatewayPage = lazy(
  () => import("../features/onboarding/RegisterSelectionPage")
);

const AdminLoginPage = lazy(
  () => import("../features/admin/pages/Login/AdminLoginPage")
);

const HospitalRegisterPage = lazy(
  () => import("../features/admin/pages/Register/AdminRegisterPage")
);

const CreateHospitalPage = lazy(
  () => import("../features/admin/pages/CreateHospital/CreateHospitalPage")
);

const AdminDashboardPage = lazy(
  () => import("../features/admin/pages/Dashboard/AdminDashboardPage")
);

const DoctorPage = lazy(
  () => import("../features/admin/pages/Doctor/DoctorsPage")
);

const NotFoundPage = lazy(
  () => import("../shared/pages/NotFoundPage")
);

// Route Components
import HospitalOnboardingRoute from "./HospitalOnboardingRoute";
import AdminOnboardingRoute from "./AdminOnboardingRoute";
import AdminRoute from "./AdminProtectedRoute";
import AdminPublicRoute from "./AdminPublicRoute";
import AdminLayoutWrapper from "./AdminLayoutWrapper";
import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";
import AdminRedirect from "./AdminRedirect";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
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

          {/* Hospital Creation */}
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

          {/* Admin Dashboard Routes */}
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

                 <Route
            path="/admin/doctors"
            element={<DoctorPage/>}
            />
            
          </Route>

       


          {/* 404 */}
          <Route
            path="*"
            element={<NotFoundPage />}
          />

     
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}