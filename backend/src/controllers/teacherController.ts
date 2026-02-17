import { Request, Response } from 'express';
import { TeacherModel } from '../models/models';

export const getAllTeachers = async (req: Request, res: Response) => {
  try {
    const teachers = await TeacherModel.findAll();
    res.json(teachers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch teachers' });
  }
};

export const getTeacherById = async (req: Request, res: Response) => {
  try {
    const teacher = await TeacherModel.findByPk(req.params.id);
    if (teacher) res.json(teacher);
    else res.status(404).json({ error: 'Teacher not found' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch teacher' });
  }
};

export const updateTeacher = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    console.log('[teachers] Attempting to update teacher with ID:', id);
    const teacher = await TeacherModel.findByPk(id);
    if (teacher) {
      await teacher.update(req.body);
      console.log('[teachers] Teacher updated successfully:', id);
      res.sendStatus(200);
    } else {
      console.warn('[teachers] Teacher not found for update:', id);
      res.status(404).json({ error: 'Teacher not found' });
    }
  } catch (error: any) {
    console.error('[teachers] Failed to update teacher:', error);
    res.status(500).json({ error: error.message || 'Failed to update teacher' });
  }
};

export const addTeacher = async (req: Request, res: Response) => {
  try {
    console.log('[teachers] Attempting to add new teacher:', req.body.email);
    await TeacherModel.create(req.body);
    console.log('[teachers] Teacher added successfully:', req.body.email);
    const teachers = await TeacherModel.findAll();
    res.status(201).json(teachers);
  } catch (error: any) {
    console.error('[teachers] Failed to add teacher:', error);
    res.status(500).json({ error: error.message || 'Failed to add teacher' });
  }
};

export const deleteTeacher = async (req: Request, res: Response) => {
  try {
    await TeacherModel.destroy({ where: { id: req.params.id } });
    const teachers = await TeacherModel.findAll();
    res.json(teachers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete teacher' });
  }
};
