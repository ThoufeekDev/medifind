import { Router } from "express";
import { AuthController } from "../controllers/AuthController";

import { authorizeRoles } from "../../../../shared/middleware/authorizeRoles";
import { Role } from "@prisma/client";
import { authenticateUser } from "../../../../shared/middleware/authenticateUser";
import { otpRateLimit } from "../../../../shared/middleware/rateLimit.middleware";
import { verifyTurnStile } from "../../../../shared/middleware/verifyTurnstile.middleware";

 const router = Router();

 const authController = new AuthController();


// Register & Logout routes
router.post("/register",verifyTurnStile,otpRateLimit,authController.register);
router.post('/verify-otp',authController.verifyOtp);

// Logout Route
router.post('/login',authController.login);
router.post('/logout',authController.logout);

// refreshing Token
router.post('/refresh-token',authController.refreshToken)

// Get Me 
router.get('/profile',authenticateUser,authController.profile);


export default router;