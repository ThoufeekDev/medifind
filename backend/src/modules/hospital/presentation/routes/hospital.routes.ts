import { Router } from 'express';
import { HospitalController } from '../controllers/HospitalController';
import { adminMiddleware } from '../../../../shared/middleware/admin.middleware';
import { authenticateUser } from '../../../../shared/middleware/authenticateUser';
import { upload } from '../../../../shared/middleware/upload.middleware';
const controller = new HospitalController();

const router = Router();

router.post('/', authenticateUser, upload.single('image'), adminMiddleware, controller.create);

router.get('/me', authenticateUser, adminMiddleware, controller.getMyHospital);

export default router;
