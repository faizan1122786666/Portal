const mongoose = require('mongoose');
const Task = require('./src/models/task.model');
const User = require('./src/models/user.model');
require('dotenv').config();

async function testGetAll() {
  await mongoose.connect(process.env.MONGOOES_URL);
  console.log('Connected to DB');

  try {
    const tasks = await Task.find()
      .populate('employeeId', 'name email designation profileImage')
      .sort({ createdAt: -1 });
    console.log(`Successfully fetched ${tasks.length} tasks`);
  } catch (err) {
    console.error('CRASH LOG:', err);
  }

  process.exit(0);
}

testGetAll();
