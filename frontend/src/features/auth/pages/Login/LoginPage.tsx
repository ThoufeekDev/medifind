import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/auth.store";
import { useState } from "react";
import {getErrorMessage} from "../../../../shared/utils/getErrorMessage"
import './login.css';
import {
  loginSchema,
  type LoginFormData,
} from "../../validators/login.schema";
import Button from "../../../../shared/components/Button/Button";
import Input from "../../../../shared/components/Input/Input";
import AuthBrandHeader  from "../../components/AuthBrandHeader";
import SocialLoginButtons from "../../components/SocialLoginButtons";
import AuthDivider from "../../components/AuthDivider";
import AuthErrorBanner from "../../components/AuthErrorBanner";
export default function LoginPage() {
  const { login, isLoading } = useAuthStore();
  const navigate = useNavigate();
  const [authError, setAuthError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setAuthError("");

      await login({
        ...data,
        role: "USER",
      });

      navigate("/", { replace: true });
    } catch (error) {
      setAuthError(getErrorMessage(error));
    }
  };

  return (
    <div className="login-container">
      <main className="login-card">

        <AuthBrandHeader
          title="Welcome Back"
          description="Login to access your account dashboard"
        />

        {authError && (
          <AuthErrorBanner message={authError} />
        )}

        <form onSubmit={handleSubmit(onSubmit)} noValidate>

          <Input
            id="user-email"
            type="email"
            label="Email Address"
            placeholder="you@example.com"
            autoComplete="email"
            error={errors.email?.message}
            {...register("email")}
          />

          <Input
            id="user-password"
            type="password"
            label="Password"
            placeholder="••••••••"
            autoComplete="current-password"
            error={errors.password?.message}
            {...register("password")}
          />

          <div className="form-actions">
            {/* Remember me + forgot password */}
          </div>

          <Button
            type="submit"
            loading={isLoading}
            className="submit-btn"
          >
            Login
          </Button>

        </form>

        <AuthDivider />

        <SocialLoginButtons />

        <footer className="footer-text">
          Don't have an account? <Link to="/register">Sign Up</Link>
        </footer>

      </main>
    </div>
  );
}