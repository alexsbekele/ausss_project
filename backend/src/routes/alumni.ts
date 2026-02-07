import { Router } from 'express';
import * as alumniController from '../controllers/alumniController';

const router = Router();

router.get('/', alumniController.getAllAlumni);
router.get('/:id', alumniController.getAlumnusById);
router.post('/approve/:id', alumniController.approveAlumnus);
router.put('/', alumniController.updateAlumnus);
router.post('/register', alumniController.registerAlumnus);
router.delete('/:id', alumniController.deleteAlumnus);

export default router;
