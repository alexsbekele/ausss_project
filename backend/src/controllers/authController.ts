import type { Request, Response } from 'express';
import { TeacherModel, AlumnusModel, AdminModel } from '../models/models';
import nodemailer from 'nodemailer';

// Email transporter configuration
// Note: In production, these should be in .env
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'your-email@gmail.com',
    pass: process.env.EMAIL_PASS || 'your-app-password'
  }
});

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
      
      // Try to find admin in database, or return default if not found
      let admin = await AdminModel.findOne({ where: { email: normalizedEmail } });
      
      if (!admin) {
        // First time login - create admin record from defaults
        admin = await AdminModel.create({
          uid: 'admin-0',
          name: ADMIN_NAME,
          email: ADMIN_EMAIL,
          bio: 'School Administrator and Portal Manager',
          currentRole: 'School Director'
        });
      }

      return res.json({ 
        uid: admin.uid,
        name: admin.name,
        role: 'admin',
        email: admin.email,
        photoUrl: admin.photoUrl,
        coverPhotoUrl: admin.coverPhotoUrl,
        bio: admin.bio,
        currentRole: admin.currentRole
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
    console.error('[auth] Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
};

export const getAdmin = async (_req: Request, res: Response) => {
  try {
    const admin = await AdminModel.findOne({ where: { uid: 'admin-0' } });
    if (admin) {
      res.json({
        uid: admin.uid,
        name: admin.name,
        email: admin.email,
        role: 'admin',
        bio: admin.bio,
        currentRole: admin.currentRole,
        photoUrl: admin.photoUrl,
        coverPhotoUrl: admin.coverPhotoUrl
      });
    } else {
      // Return default if not in DB yet
      res.json({
        uid: 'admin-0',
        name: 'Bekele Merga',
        email: 'bmerga52@gmail.com',
        role: 'admin',
        bio: 'School Administrator and Portal Manager',
        currentRole: 'School Director'
      });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch admin' });
  }
};

export const updateAdmin = async (req: Request, res: Response) => {
  try {
    const { uid } = req.body;
    let admin = await AdminModel.findByPk(uid);
    if (admin) {
      await admin.update(req.body);
      res.sendStatus(200);
    } else {
      // Create if doesn't exist (first time update)
      await AdminModel.create(req.body);
      res.sendStatus(200);
    }
  } catch (error: any) {
    console.error('[auth] Failed to update admin:', error);
    res.status(500).json({ error: error.message || 'Failed to update admin profile' });
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;
  
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    const normalizedEmail = email.toLowerCase().trim();
    
    // 1. Find user (Teacher or Alumnus)
    let user: any = await TeacherModel.findOne({ where: { email: normalizedEmail } });

    if (!user) {
      user = await AlumnusModel.findOne({ where: { email: normalizedEmail } });
    }

    if (!user) {
      // For security reasons, don't reveal if email exists
      return res.status(200).json({ message: 'If an account exists with this email, a temporary password has been sent.' });
    }

    // 2. Generate temporary password
    const tempPassword = Math.random().toString(36).slice(-8);

    // 3. Update user in database
    await user.update({ password: tempPassword });

    // 4. Send email
    const mailOptions = {
      from: process.env.EMAIL_USER || 'your-email@gmail.com',
      to: normalizedEmail,
      subject: 'Temporary Password - AUSSS Portal',
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #2563eb;">AUSSS Portal Password Reset</h2>
          <p>Hello ${user.name},</p>
          <p>We received a request to reset your password. Here is your temporary password:</p>
          <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; font-size: 24px; font-weight: bold; text-align: center; margin: 20px 0;">
            ${tempPassword}
          </div>
          <p>Please log in with this temporary password and change it immediately in your profile settings.</p>
          <p>If you did not request this, please ignore this email.</p>
          <br>
          <p>Best regards,<br>AUSSS Portal Team</p>
        </div>
      `
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log(`[auth] Recovery email sent to ${normalizedEmail}`);
    } catch (mailError) {
      console.error('[auth] Failed to send recovery email (likely missing config):', mailError);
      console.log('--------------------------------------------------');
      console.log(`[DEVELOPMENT MODE] TEMPORARY PASSWORD FOR ${normalizedEmail}: ${tempPassword}`);
      console.log('--------------------------------------------------');
    }

    res.status(200).json({ 
      message: 'Temporary password has been generated and sent.',
      // In development, we might want to return the password in the response if we can't send emails
      // but for security we should probably just log it to the server console.
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ error: 'Failed to process forgot password request.' });
  }
};
