import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../auth/store/auth.store";
import { loginSchema, type LoginFormData } from "../../../auth/validators/login.schema";
import { useState } from "react";
import { getErrorMessage } from "../../../../shared/utils/getErrorMessage";
import './adminLogin.css';

export default function AdminLoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const [authError, setAuthError] = useState("");
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const {isLoading} = useAuthStore();

  const onSubmit = async (data: LoginFormData) => {
    try {
      setAuthError("");
    
     
      await login({...data,role:"ADMIN"});
      navigate("/admin");
    } catch (error:any) {
      console.error("[GATEWAY_AUTH_FAILURE]", error);
      // const message = error?.response?.data?.message || "Something went wrong"
      setAuthError(getErrorMessage(error))
      
    }
  };

  return (
    <div className="admin-login-container">
      <main className="admin-login-card">
        
        {/* Simplified User-like Header Identity Module */}
        <header className="brand-header">
          <div className="brand-logo" aria-hidden="true">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            MediFind
          </div>
          <h2>System Gateway</h2>
          <p>Login to access your administrative workspace panel</p>
        </header>

        {/* Action Failure Banner */}
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
          
          {/* Email Form Group */}
          <div className="form-group">
            <label htmlFor="adm-email">Email Address</label>
            <div className="input-wrapper">
              <input
                id="adm-email"
                type="email"
                autoComplete="email"
                placeholder="admin@medifind.com"
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

          {/* Password Form Group */}
          <div className="form-group">
            <label htmlFor="adm-password">Password</label>
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

          {/* Primary Submit Control Button */}
          <button type="submit" className="submit-btn" disabled={isLoading}>
            {isLoading?"Logging in...":"Login"}
          </button>
          
        </form>
        
      </main>
    </div>
  );
}