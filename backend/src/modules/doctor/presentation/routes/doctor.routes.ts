import { Router } from "express";
import { doctorController } from "../controllers/DoctorController";
import { authenticateUser } from "../../../../shared/middleware/authenticateUser";
import { authorizeRoles } from "../../../../shared/middleware/authorizeRoles";

const router = Router();


const controller = new doctorController();

router.post('/',authenticateUser,authorizeRoles("ADMIN"),controller.create.bind(controller));

router.get('/',authenticateUser,controller.getAll);

export default router;