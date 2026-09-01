import { Router } from "express";
import { AuthController } from "../controllers/AuthController";

import { authenticateUser } from "../../../../shared/middleware/authenticateUser";
import { otpRateLimit } from "../../../../shared/middleware/rateLimit.middleware";

 const router = Router();

 const authController = new AuthController();

 /**
  * !register need otpRatelimit - temp removed
  */

// Register & Logout routes
router.post("/register",authController.register);
router.post('/verify-otp',authController.verifyOtp);

// Logout Route
router.post('/login',authController.login);
router.post('/logout',authController.logout);

// refreshing Token
router.post('/refresh-token',authController.refreshToken)

// Get Me 
router.get('/profile',authenticateUser,authController.profile);


export default router;