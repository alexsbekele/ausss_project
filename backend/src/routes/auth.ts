import { Router } from 'express';
import * as authController from '../controllers/authController';

const router = Router();

router.post('/login', authController.login);
router.post('/forgot-password', authController.forgotPassword);
router.get('/admin', authController.getAdmin);
router.put('/admin', authController.updateAdmin);

export default router;
