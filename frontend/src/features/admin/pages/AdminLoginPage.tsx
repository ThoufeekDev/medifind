import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../auth/store/auth.store";
import { loginSchema, type LoginFormData } from "../../auth/validators/login.schema";
import { useState } from "react";
import "../../../styles/adminLogin.css";

export default function AdminLoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const [authError, setAuthError] = useState("");
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const onSubmit = async (data: LoginFormData) => {
    try {
      setAuthError("");
     
      await login(data);
    //   console.log("test",useAuthStore.getState().user)
      const currentUser = useAuthStore.getState().user;
    
      if (currentUser?.role !== "ADMIN") {
        setAuthError("Access denied. Direct console authorizations require explicit administrative privileges.");
        return;
      }

      navigate("/dashboard");
    } catch (error) {
      console.error("[AUTH_FAILURE]", error);
      setAuthError("The credentials provided do not match our administrative database profiles.");
    }
  };

  return (
    <div className="admin-login-container">
      <main className="admin-login-card">
        
        {/* Core Identity System Block */}
        <header className="admin-header">
          <div className="admin-badge" role="status">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
            Console Verification
          </div>
          <h1>System Gateway</h1>
          <p>Provide secure credential mappings to establish administrative runtime access</p>
        </header>

        {/* Semantic Level Warnings */}
        {authError && (
          <div className="alert-error" role="alert">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <span>{authError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          
          {/* Identity Control Node */}
          <div className="form-group">
            <label htmlFor="adm-email">Corporate Email Link</label>
            <div className="input-wrapper">
              <input
                id="adm-email"
                type="email"
                autoComplete="email"
                placeholder="root@medifind.com"
                aria-invalid={errors.email ? "true" : "false"}
                {...register("email")}
              />
            </div>
            {errors.email && (
              <p className="error-message" id="email-error">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Secure Credential Node */}
          <div className="form-group">
            <label htmlFor="adm-password">Access Token Secret</label>
            <div className="input-wrapper">
              <input
                id="adm-password"
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                aria-invalid={errors.password ? "true" : "false"}
                {...register("password")}
              />
            </div>
            {errors.password && (
              <p className="error-message" id="password-error">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Core Submission Processor Vector */}
          <button type="submit" className="submit-btn">
            Authorize Gateway Environment
          </button>
          
        </form>
        
      </main>
    </div>
  );
}