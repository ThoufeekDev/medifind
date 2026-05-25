import { Router } from "express";
import { HospitalController } from "../controllers/HospitalController";
import { adminMiddleware } from "../../../../shared/middleware/admin.middleware";
import {authenticateUser} from "../../../../shared/middleware/authenticateUser"
const controller = new HospitalController();

const router = Router();



router.post('/',authenticateUser,adminMiddleware,controller.create);

router.get('/me',authenticateUser,adminMiddleware,controller.getMyHospital);

export default router