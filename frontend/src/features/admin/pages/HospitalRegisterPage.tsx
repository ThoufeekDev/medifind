import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { Turnstile } from "react-turnstile";
import "../../../styles/HospitalRegister.css"

import { registerUser } from "../../auth/services/auth.service";
import {
  hospitalRegisterSchema,
  type HospitalRegisterFormData,
} from "../../admin/validators/hospitalRegister.dto";

export default function HospitalRegisterPage() {
  const [turnstileToken, setTurnstileToken] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<HospitalRegisterFormData>({
    resolver: zodResolver(hospitalRegisterSchema),
  });

  const onSubmit = async (data: HospitalRegisterFormData) => {
    try {
      await registerUser({
        ...data,
        role:"ADMIN",
        turnstileToken,
      });

      navigate("/verify-otp", {
        state: {
          email: data.email,
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="register-container">
      <main className="register-card">
        
        {/* Brand Header */}
        <header className="brand-header">
          <div className="brand-logo" aria-hidden="true">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            MediFind
          </div>
          <h2>Register Hospital</h2>
          <p>Create your hospital admin account workspace</p>
        </header>

        {/* Form Architecture Wrapper */}
        <form onSubmit={handleSubmit(onSubmit)} noValidate>

          {/* NAME */}
          <div className="form-group">
            <label htmlFor="hosp-name">Full Name</label>
            <div className="input-wrapper">
              <input
                id="hosp-name"
                type="text"
                autoComplete="name"
                placeholder="John Doe"
                aria-invalid={errors.name ? "true" : "false"}
                {...register("name")}
              />
            </div>
            {errors.name && <p className="error-message">{errors.name.message}</p>}
          </div>

          {/* EMAIL */}
          <div className="form-group">
            <label htmlFor="hosp-email">Email Address</label>
            <div className="input-wrapper">
              <input
                id="hosp-email"
                type="email"
                autoComplete="email"
                placeholder="admin@hospital.com"
                aria-invalid={errors.email ? "true" : "false"}
                {...register("email")}
              />
            </div>
            {errors.email && <p className="error-message">{errors.email.message}</p>}
          </div>

          {/* PASSWORD */}
          <div className="form-group">
            <label htmlFor="hosp-password">Password</label>
            <div className="input-wrapper">
              <input
                id="hosp-password"
                type="password"
                autoComplete="new-password"
                placeholder="••••••••"
                aria-invalid={errors.password ? "true" : "false"}
                {...register("password")}
              />
            </div>
            {errors.password && <p className="error-message">{errors.password.message}</p>}
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="form-group">
            <label htmlFor="hosp-confirmPassword">Confirm Password</label>
            <div className="input-wrapper">
              <input
                id="hosp-confirmPassword"
                type="password"
                autoComplete="new-password"
                placeholder="••••••••"
                aria-invalid={errors.confirmPassword ? "true" : "false"}
                {...register("confirmPassword")}
              />
            </div>
            {errors.confirmPassword && (
              <p className="error-message">{errors.confirmPassword.message}</p>
            )}
          </div>

          {/* TURNSTILE CAPTCHA */}
          <div className="turnstile-wrapper">
            <Turnstile
              sitekey={import.meta.env.VITE_TURNSTILE_SITE_KEY}
              onVerify={(token) => {
                setTurnstileToken(token);
              }}
            />
          </div>

          {/* EXECUTE SUBMISSION ACTION */}
          <button type="submit" className="submit-btn">
            Register Hospital
          </button>

        </form>

        {/* Global Footer Interceptor Node */}
        <footer className="footer-text">
          Already have an account?
          <Link to="/admin/login">Admin Login</Link>
        </footer>

      </main>
    </div>
  );
}