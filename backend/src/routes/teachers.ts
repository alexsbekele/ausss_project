import { Router } from 'express';
import * as teacherController from '../controllers/teacherController';

const router = Router();

router.get('/', teacherController.getAllTeachers);
router.get('/:id', teacherController.getTeacherById);
router.put('/', teacherController.updateTeacher);
router.post('/', teacherController.addTeacher);
router.delete('/:id', teacherController.deleteTeacher);

export default router;
