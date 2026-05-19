import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import cors from "cors"
import { authorizeRoles } from "../../../../shared/middleware/authorizeRoles";
import { Role } from "@prisma/client";
import { authenticateUser } from "../../../../shared/middleware/authenticateUser";
import { otpRateLimit } from "../../../../shared/middleware/rateLimit.middleware";
import { verifyTurnStile } from "../../../../shared/middleware/verifyTurnstile.middleware";

 const router = Router();

 // Source - https://stackoverflow.com/q/79127611
// Posted by GuanHong Jiang, modified by community. See post 'Timeline' for change history
// Retrieved 2026-05-19, License - CC BY-SA 4.0


 const authController = new AuthController();


// Register & Logout routes
router.post("/register",otpRateLimit,authController.register);
router.post('/verify-otp',authController.verifyOtp);

// Logout Route
router.post('/login',authController.login);
router.post('/logout',authController.logout);

// refreshing Token
router.post('/refresh-token',authController.refreshToken)

// Get Me 
router.get('/profile',authenticateUser,authController.profile);


export default router;