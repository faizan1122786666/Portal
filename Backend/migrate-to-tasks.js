require('dotenv').config();
const mongoose = require('mongoose');

async function migrate() {
  await mongoose.connect(process.env.MONGOOES_URL);
  console.log('Connected to MongoDB');

  const db = mongoose.connection.db;

  const projectsCol = db.collection('projects');
  const tasksCol = db.collection('tasks');

  const existing = await projectsCol.find({}).toArray();
  console.log(`Found ${existing.length} document(s) in 'projects' collection`);

  if (existing.length > 0) {
    // Avoid duplicate inserts
    const tasksCount = await tasksCol.countDocuments();
    if (tasksCount === 0) {
      await tasksCol.insertMany(existing);
      console.log(`Migrated ${existing.length} document(s) to 'tasks' collection`);
    } else {
      console.log(`'tasks' collection already has ${tasksCount} docs — skipping migration`);
    }
  } else {
    console.log('Nothing to migrate.');
  }

  await mongoose.disconnect();
  console.log('Done.');
}

migrate().catch(err => { console.error(err); process.exit(1); });
