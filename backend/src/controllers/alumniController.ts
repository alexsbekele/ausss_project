import type { Request, Response } from 'express';
import { AlumnusModel } from '../models/models';

export const getAllAlumni = async (_req: Request, res: Response) => {
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
    const { userId } = req.body;
    console.log('[alumni] Attempting to update alumnus with ID:', userId);
    const alumnus = await AlumnusModel.findByPk(userId);
    if (alumnus) {
      await alumnus.update(req.body);
      console.log('[alumni] Alumnus updated successfully:', userId);
      res.sendStatus(200);
    } else {
      console.warn('[alumni] Alumnus not found for update:', userId);
      res.status(404).json({ error: 'Alumnus not found' });
    }
  } catch (error: any) {
    console.error('[alumni] Failed to update alumnus:', error);
    res.status(500).json({ error: error.message || 'Failed to update alumnus' });
  }
};

export const registerAlumnus = async (req: Request, res: Response) => {
  try {
    const alumnusData = req.body;
    console.log('[alumni] Attempting to register new alumnus:', alumnusData.email);
    await AlumnusModel.create(alumnusData);
    console.log('[alumni] Alumnus registered successfully:', alumnusData.email);
    const alumni = await AlumnusModel.findAll();
    res.status(201).json(alumni);
  } catch (error: any) {
    console.error('[alumni] Failed to register alumnus:', error);
    res.status(500).json({ error: error.message || 'Failed to register alumnus' });
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
