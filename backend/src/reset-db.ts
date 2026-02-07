import sequelize from './models';

const resetDatabase = async () => {
  try {
    console.log('Starting database reset...');
    
    // Sync with force: true will DROP all tables and recreate them
    await sequelize.sync({ force: true });
    
    console.log('-----------------------------------------');
    console.log('SUCCESS: Database has been fully reset.');
    console.log('All posts, comments, alumni, and teachers have been removed.');
    console.log('The database schema is now clean and ready for new data.');
    console.log('-----------------------------------------');
    
    process.exit(0);
  } catch (error) {
    console.error('Database reset failed:', error);
    process.exit(1);
  }
};

resetDatabase();
