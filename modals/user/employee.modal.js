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

// Define Employee Schema
const employeeSchema = new mongoose.Schema({
  empid: { type: Number, required: true, unique: true },
  empname: { type: String, required: true },
  designation: { type: String, required: true },
  department: { type: String, required: true },
  faculty: { type: String, required: true },
  mobile: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
},{collection:"employees"}
);

// Define Employee Model
const Employee = mongoose.model('Employee', employeeSchema);

// Create Employee API
app.post('/employees', async (req, res) => {
  try {
    const employee = new Employee(req.body);
    const savedEmployee = await employee.save();
    res.status(201).json(savedEmployee);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Fetch All Employees API
app.get('/employees', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start the Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
console.log(Employee.schema.paths);