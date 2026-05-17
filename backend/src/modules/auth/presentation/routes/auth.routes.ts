import { Router } from "express";
import { AuthController } from "../controllers/AuthController";

import { authorizeRoles } from "../../../../shared/middleware/authorizeRoles";
import { Role } from "@prisma/client";
import { authenticateUser } from "../../../../shared/middleware/authenticateUser";

 const router = Router();

 const authController = new AuthController();
// Register & Logout routes
router.post("/register",authController.register);
router.post('/login',authController.login);


// refreshing Token
router.post('/refresh-token',authController.refreshToken)

// Logout Route
router.post('/logout',authController.logout);

router.get('/profile',authenticateUser,authController.profile);


export default router;