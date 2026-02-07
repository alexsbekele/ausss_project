import { Router } from 'express';
import * as announcementController from '../controllers/announcementController';

const router = Router();

router.get('/', announcementController.getAllAnnouncements);
router.post('/', announcementController.createAnnouncement);
router.delete('/:id', announcementController.deleteAnnouncement);
router.put('/', announcementController.updateAnnouncement);

export default router;
