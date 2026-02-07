import fs from 'fs';
import path from 'path';
import sequelize from './models';
import { 
  TeacherModel, 
  AlumnusModel, 
  PostModel, 
  CommentModel, 
  AnnouncementModel, 
  ApplicantModel 
} from './models/models';

const migrate = async () => {
  try {
    const dbPath = path.join(__dirname, 'data/db.json');
    if (!fs.existsSync(dbPath)) {
      console.log('No db.json found, skipping migration.');
      return;
    }

    const data = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));

    // Sync database
    await sequelize.sync({ force: true });
    console.log('Database synced.');

    // Migrate Teachers
    if (data.teachers) {
      for (const t of data.teachers) {
        await TeacherModel.create(t);
      }
      console.log(`Migrated ${data.teachers.length} teachers.`);
    }

    // Migrate Alumni
    if (data.alumni) {
      for (const a of data.alumni) {
        await AlumnusModel.create(a);
      }
      console.log(`Migrated ${data.alumni.length} alumni.`);
    }

    // Migrate Announcements
    if (data.announcements) {
      for (const ann of data.announcements) {
        await AnnouncementModel.create(ann);
      }
      console.log(`Migrated ${data.announcements.length} announcements.`);
    }

    // Migrate Applicants
    if (data.applicants) {
      for (const app of data.applicants) {
        await ApplicantModel.create(app);
      }
      console.log(`Migrated ${data.applicants.length} applicants.`);
    }

    // Migrate Posts and Comments
    if (data.posts) {
      for (const p of data.posts) {
        const { comments, ...postData } = p;
        await PostModel.create({
          ...postData,
          likes: JSON.stringify(p.likes || []),
        });
        
        if (comments) {
          for (const c of comments) {
            await CommentModel.create({
              ...c,
              postId: p.id,
            });
          }
        }
      }
      console.log(`Migrated ${data.posts.length} posts.`);
    }

    console.log('Migration completed successfully.');
  } catch (error) {
    console.error('Migration failed:', error);
  }
};

migrate();
