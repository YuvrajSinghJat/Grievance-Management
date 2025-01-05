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

// Define admin Schema
const adminSchema = new mongoose.Schema({
  adminid: { type: Number, required: true, unique: true },
  adminname: { type: String, required: true },
  designation: { type: String, required: true },
  department: { type: String, required: true },
  faculty: { type: String, required: true },
  mobile: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
},{collection:"admin"}
);

// Define Employee Model
const Admin = mongoose.model('Admin', adminSchema);

// Create Admin API
app.post('/admin', async (req, res) => {
  try {
    const admin = new Admin(req.body);
    const savedAdmin = await admin.save();
    res.status(201).json(savedAdmin);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Fetch All admin API
app.get('/admin', async (req, res) => {
  try {
    const admin = await Admimn.find();
    res.status(200).json(admin);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start the Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
console.log(Admin.schema.paths);