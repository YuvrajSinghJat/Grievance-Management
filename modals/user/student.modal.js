const express = require('express');
const mongoose = require('mongoose');
const bodyparser=require("body-parser")
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Connect to MongoDB
const mongoURI = 'mongodb://localhost:27017/GrievanceManagementSystem';
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

// Define Studente Schema
const studentSchema= new mongoose.Schema({
  enrollmentno: { type: String, required: true, unique: true },
  scholarno: { type: Number, required: true, unique: true },
  studentname: { type: String, required: true },
  program:{type: String,required: true},
  department: { type: String, required: true },
  faculty: { type: String, required: true },
  mobile: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  parentname: { type: String, required: true },
  parentcontact:{type: Number,required: true}
},{collection:"student"});

// Define Student Model
const Student = mongoose.model('Student', studentSchema);

// Create Student API
app.post('/student', async (req, res) => {
  try {
    const student = new Student(req.body);
    const savedStudent = await student.save();
    res.status(201).json(savedStudent);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Fetch All Employees API
app.get('/student', async (req, res) => {
  try {
    const student= await Student.find();
    res.status(200).json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start the Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
console.log(Student.schema.paths);