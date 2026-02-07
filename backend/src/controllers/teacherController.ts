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
    const teacher = await TeacherModel.findByPk(req.body.id);
    if (teacher) {
      await teacher.update(req.body);
      res.sendStatus(200);
    } else {
      res.status(404).json({ error: 'Teacher not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update teacher' });
  }
};

export const addTeacher = async (req: Request, res: Response) => {
  try {
    await TeacherModel.create(req.body);
    const teachers = await TeacherModel.findAll();
    res.status(201).json(teachers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add teacher' });
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
