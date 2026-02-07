import { Router } from 'express';
import * as admissionController from '../controllers/admissionController';

const router = Router();

router.get('/applicants', admissionController.getApplicants);
router.post('/apply', admissionController.apply);
router.get('/threshold', admissionController.getThreshold);
router.post('/threshold', admissionController.setThreshold);

export default router;
