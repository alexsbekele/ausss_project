import { Request, Response } from 'express';
import { TeacherModel, AlumnusModel } from '../models/models';

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    console.debug('[auth] login attempt for', email);
    
    // Hardcoded Admin Login for demonstration/initial setup
    const ADMIN_EMAIL = 'bmerga52@gmail.com';
    const ADMIN_NAME = 'Bekele Merga';
    const normalizedEmail = email.toLowerCase().trim();

    if (normalizedEmail === ADMIN_EMAIL.toLowerCase() && password === 'admin123') {
      console.log('[auth] Admin login success:', ADMIN_EMAIL);
      return res.json({ 
        uid: 'admin-0',
        name: ADMIN_NAME,
        role: 'admin',
        email: ADMIN_EMAIL,
        photoUrl: undefined,
        coverPhotoUrl: undefined,
        bio: 'School Administrator and Portal Manager',
        currentRole: 'School Director'
      });
    }

    // Check teachers
    const teacher = await TeacherModel.findOne({ where: { email: normalizedEmail } });
    if (teacher && teacher.password === password) {
      console.log('[auth] Teacher login success:', normalizedEmail);
      const user = teacher.get({ plain: true });
      return res.json({ 
        uid: user.id,
        name: user.name,
        role: 'teacher',
        email: user.email,
        photoUrl: user.photoUrl,
        coverPhotoUrl: user.coverPhotoUrl,
        bio: user.bio,
        subject: user.subject
      });
    }

    // Check alumni
    const alumnus = await AlumnusModel.findOne({ where: { email: normalizedEmail } });
    if (alumnus && alumnus.password === password) {
      console.log('[auth] Alumni login success:', normalizedEmail);
      const user = alumnus.get({ plain: true });
      return res.json({ 
        uid: user.userId,
        name: user.name,
        role: 'alumni',
        email: user.email,
        photoUrl: user.photoUrl,
        coverPhotoUrl: user.coverPhotoUrl,
        bio: user.bio,
        currentGrade: user.currentGrade,
        currentRole: user.currentRole
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
