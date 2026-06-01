// import { BrowserRouter, Routes, Route } from "react-router-dom"

// import RegisterPage from "../features/auth/pages/UserRegisterPage"
// import VerifyOtpPage from "../features/auth/pages/VerifyOtpPage"


// import HomePage from "../features/auth/pages/HomePage"
// import LoginPage from "../features/auth/pages/LoginPage"

// import GatewayPage from "../features/onboarding/RegisterSelectionPage"

// import ProtectedRoute from "./ProtectedRoute"

// import PublicRoute from "./PublicRoute"
// import AdminLoginPage from "../features/admin/pages/AdminLoginPage"
// import HospitalRegisterPage from "../features/admin/pages/AdminRegisterPage"

// import CreatHospitalPage from "../features/admin/pages/CreateHospitalPage"
// import AdminRoute from "./AdminProtectedRoute"
// import AdminPublicRoute from "./AdminPublicRoute"

// export default function AppRoutes() {
//     return (
//         <BrowserRouter>
//             <Routes>

//                 <Route path="/register"
//                     element={
//                         <PublicRoute>
//                             <GatewayPage />
//                         </PublicRoute>
//                     }
//                 />
//                 <Route path="/register/user" element={
//                     <PublicRoute>
//                         <RegisterPage />
//                     </PublicRoute>

//                 } />
//                 <Route path="/verify-otp" element={

//                     <PublicRoute>
//                         <VerifyOtpPage />
//                     </PublicRoute>
//                 } />

//                 <Route path="/login/user" element={
//                     <PublicRoute>
//                         <LoginPage />
//                     </PublicRoute>
//                 } />
//                 <Route
//                     path="/"
//                     element={
//                         <ProtectedRoute>
//                             <HomePage />
//                         </ProtectedRoute>

//                     }
//                 />


//                 <Route
//                     path="/register/hospital"
//                     element={
//                        <AdminPublicRoute>
//                         <HospitalRegisterPage />
//                        </AdminPublicRoute>

//                     }
//                 />

//                 <Route path="admin/login" element={
//                     <AdminPublicRoute>  
//                         <AdminLoginPage />
//                     </AdminPublicRoute>
//                 } />

//                 <Route
//                     path="/admin/create-hospital"
//                     element={
//                         <AdminRoute>
//                             <CreatHospitalPage />
//                         </AdminRoute>
//                     }
//                 />

//             </Routes>
//         </BrowserRouter>
//     )
// }

import { BrowserRouter, Routes, Route } from "react-router-dom";

// Auth feature imports
import LoginPage from "../features/auth/pages/Login/LoginPage";
import UserRegisterPage from "../features/auth/pages/Register/UserRegisterPage";

// Admin feature imports
import AdminLoginPage from "../features/admin/pages/Login/AdminLoginPage";
import HospitalRegisterPage from "../features/admin/pages/Register/AdminRegisterPage";
import CreateHospitalPage from "../features/admin/pages/CreateHospital/CreateHospitalPage";
import AdminDashboardPage from "../features/admin/pages/Dashboard/AdminDashboardPage"; // Updated path

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

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public / Core Routes */}
                <Route path="/register" element={<PublicRoute><GatewayPage /></PublicRoute>} />
                <Route path="/register/user" element={<PublicRoute><UserRegisterPage /></PublicRoute>} />
                <Route path="/verify-otp" element={<PublicRoute><VerifyOtpPage /></PublicRoute>} />
                <Route path="/login/user" element={<PublicRoute><LoginPage /></PublicRoute>} />
                <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />

                {/* Admin Public Routes */}
                <Route path="/register/hospital" element={<AdminPublicRoute><HospitalRegisterPage /></AdminPublicRoute>} />
                <Route path="/admin/login" element={<AdminPublicRoute><AdminLoginPage /></AdminPublicRoute>} />

                {/* Admin Dashboard Protected Layout Shell */}
                <Route element={<AdminRoute><AdminLayoutWrapper /></AdminRoute>}>
                    <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
                    <Route path="/admin/create-hospital" element={<CreateHospitalPage />} />
                </Route>

                <Route path="/admin" element={<AdminRedirect />} />

<Route
  path="/admin/login"
  element={
    <AdminPublicRoute>
      <AdminLoginPage />
    </AdminPublicRoute>
  }
/>


            </Routes>
        </BrowserRouter>
    );
}