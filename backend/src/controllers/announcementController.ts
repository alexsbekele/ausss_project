import { Request, Response } from 'express';
import { AnnouncementModel } from '../models/models';

export const getAllAnnouncements = async (req: Request, res: Response) => {
  try {
    const announcements = await AnnouncementModel.findAll({
      order: [['date', 'DESC']]
    });
    res.json(announcements);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch announcements' });
  }
};

export const createAnnouncement = async (req: Request, res: Response) => {
  try {
    const announcement = await AnnouncementModel.create(req.body);
    res.status(201).json(announcement);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create announcement' });
  }
};

export const deleteAnnouncement = async (req: Request, res: Response) => {
  try {
    await AnnouncementModel.destroy({ where: { id: req.params.id } });
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete announcement' });
  }
};

export const updateAnnouncement = async (req: Request, res: Response) => {
  try {
    const announcement = await AnnouncementModel.findByPk(req.body.id);
    if (announcement) {
      await announcement.update(req.body);
      res.sendStatus(200);
    } else {
      res.status(404).json({ error: 'Announcement not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update announcement' });
  }
};
