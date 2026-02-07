import { Request, Response } from 'express';
import { AlumnusModel } from '../models/models';

export const getAllAlumni = async (req: Request, res: Response) => {
  try {
    const alumni = await AlumnusModel.findAll();
    res.json(alumni);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch alumni' });
  }
};

export const getAlumnusById = async (req: Request, res: Response) => {
  try {
    const alumnus = await AlumnusModel.findByPk(req.params.id);
    if (alumnus) res.json(alumnus);
    else res.status(404).json({ error: 'Alumnus not found' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch alumnus' });
  }
};

export const approveAlumnus = async (req: Request, res: Response) => {
  try {
    const alumnus = await AlumnusModel.findByPk(req.params.id);
    if (alumnus) {
      await alumnus.update({ isApproved: true });
      res.sendStatus(200);
    } else {
      res.status(404).json({ error: 'Alumnus not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to approve alumnus' });
  }
};

export const updateAlumnus = async (req: Request, res: Response) => {
  try {
    const alumnus = await AlumnusModel.findByPk(req.body.userId);
    if (alumnus) {
      await alumnus.update(req.body);
      res.sendStatus(200);
    } else {
      res.status(404).json({ error: 'Alumnus not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update alumnus' });
  }
};

export const registerAlumnus = async (req: Request, res: Response) => {
  try {
    const alumnusData = req.body;
    await AlumnusModel.create(alumnusData);
    res.status(201).json(alumnusData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to register alumnus' });
  }
};

export const deleteAlumnus = async (req: Request, res: Response) => {
  try {
    await AlumnusModel.destroy({ where: { userId: req.params.id } });
    const alumni = await AlumnusModel.findAll();
    res.json(alumni);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete alumnus' });
  }
};
