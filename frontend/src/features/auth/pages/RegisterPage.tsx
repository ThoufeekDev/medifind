import { useForm } from "react-hook-form";
// zodREsolver connects Ract Hook form with zod
import { zodResolver } from "@hookform/resolvers/zod";
import "../../../styles/register.css"
import { registerUser } from "../services/auth.service";
import {
  registerSchema,
  type RegisterFormData,
} from "../validators/register.schema";
import { useNavigate } from "react-router-dom";
export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const navigate = useNavigate();
  const onSubmit = async (data: RegisterFormData) => {
      try {
        console.log("trigger")
         await registerUser({
            ...data,
            turnstileToken:"temporary-token"
         })

         console.log("Registered succesful")
         navigate('/verify-otp',{
           state:{
            email:data.email
           }
         })
      }catch(error){
          console.error(error);
      }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        
        {/* Brand Header */}
        <div className="brand-header">
          <div className="brand-logo">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            MediFind
          </div>
          <h2>Create Account</h2>
          <p>Sign up to get started with MediFind</p>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit(onSubmit)}>
          
          {/* Full Name */}
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <div className="input-wrapper">
              <input 
                id="name"
                type="text" 
                placeholder="John Doe" 
                {...register("name")} 
              />
            </div>
            {errors.name && <p className="error-message">{errors.name.message}</p>}
          </div>

          {/* Email Address */}
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-wrapper">
              <input 
                id="email"
                type="email" 
                placeholder="you@example.com" 
                {...register("email")} 
              />
            </div>
            {errors.email && <p className="error-message">{errors.email.message}</p>}
          </div>

          {/* Phone Number */}
          {/* <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <div className="input-wrapper">
              <input 
                id="phone"
                type="tel" 
                placeholder="+1 (555) 000-0000" 
                {...register("phone")} 
              />
            </div>
            {errors.phone && <p className="error-message">{errors.phone.message}</p>}
          </div> */}

          {/* Password */}
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <input 
                id="password"
                type="password" 
                placeholder="••••••••" 
                {...register("password")} 
              />
            </div>
            {errors.password && <p className="error-message">{errors.password.message}</p>}
          </div>

          {/* Confirm Password */}
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="input-wrapper">
              <input 
                id="confirmPassword"
                type="password" 
                placeholder="••••••••" 
                {...register("confirmPassword")} 
              />
            </div>
            {errors.confirmPassword && <p className="error-message">{errors.confirmPassword.message}</p>}
          </div>

          {/* Terms and Privacy Checkbox */}
          {/* <div className="checkbox-group">
            <input 
              id="terms" 
              type="checkbox" 
              {...register("terms")}
            />
            <label htmlFor="terms">
              I agree to the <a href="#terms">Terms of Service</a> and <a href="#privacy">Privacy Policy</a>
            </label>
          </div>
          {errors.terms && <p className="error-message" style={{marginTop: '-1rem', marginBottom: '1rem'}}>{errors.terms.message}</p>} */}

          {/* Submit Button */}
          <button type="submit" className="submit-btn">
            Create Account
          </button>
        </form>

        {/* Social Authentication */}
        <div className="divider">Or continue with</div>

        <div className="social-grid">
          {/* Google Login */}
          <button type="button" className="social-btn">
            <svg viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            Google
          </button>

          {/* Apple Login (Replaced GitHub) */}
          <button type="button" className="social-btn">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.05 20.28c-.98.95-2.05 1.88-3.08 1.88-1.02 0-1.4-.61-2.55-.61-1.16 0-1.57.61-2.55.61-1.02 0-2.15-1-3.15-1.88C3.68 18.25 2 14.24 2 10.24c0-3.98 2.6-6.15 5.16-6.15 1.05 0 1.95.59 2.53.59.57 0 1.6-.63 2.84-.63 1.34 0 2.45.47 3.19 1.45-2.81 1.68-2.35 5.37.49 6.51-1.12 2.62-2.51 5.12-3.7 6.27zm-2.81-17c1.1-1.32.95-3.28.95-3.28s-1.74.17-2.79 1.35c-1.02 1.14-.88 3.14-.88 3.14s1.65.11 2.72-1.21z"/>
            </svg>
            Apple
          </button>
        </div>

      </div>
    </div>
  );
}