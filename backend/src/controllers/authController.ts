import { Request, Response } from 'express';
import { TeacherModel, AlumnusModel } from '../models/models';

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    
    // Check teachers
    const teacher = await TeacherModel.findOne({ where: { email } });
    if (teacher && teacher.password === password) {
      const user = teacher.toJSON();
      return res.json({ ...user, uid: user.id, role: 'teacher' });
    }

    // Check alumni
    const alumnus = await AlumnusModel.findOne({ where: { email } });
    if (alumnus && alumnus.password === password) {
      const user = alumnus.toJSON();
      return res.json({ ...user, uid: user.userId, role: 'alumni' });
    }

    // Hardcoded Admin Login for demonstration/initial setup
    // In a real production app, this should also be in the DB
    const ADMIN_EMAIL = 'bmerga52@gmail.com';
    const ADMIN_NAME = 'Bekele Merga';
    if (email === ADMIN_EMAIL && password === 'admin123') {
      return res.json({ 
        uid: 'admin-0',
        name: ADMIN_NAME,
        email: ADMIN_EMAIL,
        role: 'admin'
      });
    }

    res.status(401).json({ error: 'Invalid email or password' });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
};

export const getAdmin = (req: Request, res: Response) => {
  const ADMIN_EMAIL = 'bmerga52@gmail.com';
  const ADMIN_NAME = 'Bekele Merga';
  res.json({
    uid: 'admin-0',
    name: ADMIN_NAME,
    email: ADMIN_EMAIL,
    role: 'admin'
  });
};
