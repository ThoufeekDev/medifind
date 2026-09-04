import { Router } from 'express';
import { doctorController } from '../controllers/DoctorController';
import { authenticateUser } from '../../../../shared/middleware/authenticateUser';
import { authorizeRoles } from '../../../../shared/middleware/authorizeRoles';
import { upload } from '../../../../shared/middleware/upload.middleware';
const router = Router();

const controller = new doctorController();

router.post(
  '/',
  authenticateUser,
  authorizeRoles('ADMIN'),
  upload.single('image'),
  controller.create.bind(controller),
);

router.get('/', authenticateUser, controller.getAll);

export default router;
