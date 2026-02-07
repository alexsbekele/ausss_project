import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import teacherRoutes from './routes/teachers';
import alumniRoutes from './routes/alumni';
import postRoutes from './routes/posts';
import announcementRoutes from './routes/announcements';
import admissionRoutes from './routes/admission';
import { logger, errorHandler } from './middleware';
import sequelize from './models';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(logger);

// Health check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/alumni', alumniRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/announcements', announcementRoutes);
app.use('/api/admission', admissionRoutes);

// Error handling
app.use(errorHandler);

// Sync database and start server
sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Backend server running at http://localhost:${port}`);
    console.log('SQLite Database synced.');
  });
}).catch(err => {
  console.error('Failed to sync database:', err);
});
