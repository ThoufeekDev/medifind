import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation } from "react-router-dom";
import './verifyOtp.css'
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/auth.store";
import {
  verifyOtpSchema,
  type VerifyOtpFormData,
} from "../../validators/verify-otp.schema";
import { getMyHospital } from "../../../admin/services/hospital.service";
import { useHospitalStore } from "../../../admin/store/hospital.store";
export default function VerifyOtpPage() {
  const location = useLocation();
  const email = location.state?.email || "";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyOtpFormData>({
    resolver: zodResolver(verifyOtpSchema),
    defaultValues: {
      email,
    },
  });

  const navigate = useNavigate();
  const verifyOtpAndLogin = useAuthStore((state=>state.verifyOtpAndLogin))

  const onSubmit = async (data: VerifyOtpFormData) => {
    try {
     
       await verifyOtpAndLogin(data);
      
       const currentUser = useAuthStore.getState().user;
        console.log("Current user after OTP verification:", currentUser);
       if(currentUser?.role === "ADMIN"){
          navigate('/admin')
       }else {
         navigate('/')
       }
       
      //  if(currentUser?.role === "ADMIN"){
      //     const hospital = await useHospitalStore.getState().fetchHospital();
      //   if(hospital){
      //      navigate('/admin/dashboard')
      //   }else{
      //     navigate('/admin/create-hospital')
      //   }

      //  }else {
      //   console.log("Navigating to home page for regular user.");
      //    navigate("/")
      //  }

       console.log('OTP Successfull')
     
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="otp-container">
      <div className="otp-card">
        
        {/* Brand Header */}
        <div className="brand-header">
          <div className="brand-logo">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            MediFind
          </div>
          <h2>Verify OTP</h2>
          <p>
            We've sent a verification code to <br />
            <span className="email-highlight">{email || "your email"}</span>
          </p>
        </div>

        {/* Verification Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          
          {/* Hidden or Read-only Email Field (Kept functional for form state) */}
          {(!email || errors.email) && (
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <div className="input-wrapper">
                <input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  {...register("email")}
                />
              </div>
              {errors.email && <p className="error-message">{errors.email.message}</p>}
            </div>
          )}

          {/* OTP Code Field */}
          <div className="form-group">
            <label htmlFor="otp">Verification Code</label>
            <div className="input-wrapper">
              <input
                id="otp"
                type="text"
                className="otp-input"
                placeholder="0 0 0 0 0 0"
                maxLength={6} // Adjust if your OTP length differs
                autoComplete="one-time-code"
                inputMode="numeric"
                {...register("otp")}
              />
            </div>
            {errors.otp && <p className="error-message">{errors.otp.message}</p>}
          </div>

          {/* Submit Action Button */}
          <button type="submit" className="submit-btn">
            Verify Code
          </button>
        </form>

        {/* Footer Link */}
        <p className="resend-text">
          Didn't receive the code?{" "}
          <button type="button" className="resend-link">
            Resend Code
          </button>
        </p>

      </div>
    </div>
  );
}