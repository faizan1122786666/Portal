const mongoose = require('mongoose');
const Task = require('./src/models/task.model');
const User = require('./src/models/user.model');
require('dotenv').config();

async function testAssign() {
  await mongoose.connect(process.env.MONGOOES_URL);
  console.log('Connected to DB');

  const emp = await User.findOne({ role: 'employee' });
  if(!emp) { console.log('No employee found'); return process.exit(0); }

  console.log('Assigning task to', emp.email);

  try {
    const task = new Task({
      title: 'Debug task',
      description: 'Find why it crashes',
      employeeId: emp._id,
      deadline: new Date()
    });
    
    await task.save();
    console.log('Task saved successfully:', task._id);
  } catch (err) {
    console.error('CRASH LOG:', err);
  }

  process.exit(0);
}

testAssign();
