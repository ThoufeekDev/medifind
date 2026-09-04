import { Router } from 'express';
import { SpecializationController } from '../controller/SpecializationController';

const router = Router();

const controller = new SpecializationController();

router.get('/', controller.getAll);

export default router;
