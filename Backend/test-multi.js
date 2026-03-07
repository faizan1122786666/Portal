const mongoose = require('mongoose');
const Task = require('./src/models/task.model');
const User = require('./src/models/user.model');
require('dotenv').config();

async function testMultiAssign() {
  await mongoose.connect(process.env.MONGOOES_URL);
  
  const emps = await User.find({ role: 'employee' }).limit(2);
  if(emps.length === 0) { console.log('No employees'); process.exit(0); }

  try {
    const task = new Task({
      title: 'Multi Assign Test',
      description: 'Test Array',
      assignedEmployees: emps.map(e => e._id),
      deadline: new Date()
    });
    await task.save();
    console.log('Saved multiple assignees:', task.assignedEmployees.length);
  } catch(e) { console.error('Error:', e) }

  process.exit(0);
}
testMultiAssign();
