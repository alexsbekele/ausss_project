import { Request, Response } from 'express';
import { ApplicantModel, SettingModel } from '../models/models';

export const getApplicants = async (req: Request, res: Response) => {
  try {
    const applicants = await ApplicantModel.findAll({
      order: [['appliedDate', 'DESC']]
    });
    res.json(applicants);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch applicants' });
  }
};

export const apply = async (req: Request, res: Response) => {
  try {
    const applicantData = req.body;
    await ApplicantModel.create(applicantData);
    res.status(201).json(applicantData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit application' });
  }
};

export const getThreshold = async (req: Request, res: Response) => {
  try {
    const setting = await SettingModel.findByPk('admission_threshold');
    res.json({ threshold: setting ? Number(setting.value) : 2.5 });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch threshold' });
  }
};

export const setThreshold = async (req: Request, res: Response) => {
  try {
    const { threshold } = req.body;
    await SettingModel.upsert({ 
      key: 'admission_threshold', 
      value: String(threshold) 
    });
    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ error: 'Failed to set threshold' });
  }
};
