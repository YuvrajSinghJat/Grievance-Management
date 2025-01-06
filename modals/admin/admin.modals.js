const mongoose = require('mongoose');
const Schema = mongoose.Schema();

// Define admin Schema
const adminSchema = new mongoose.Schema(
  {
    adminid: { 
      type: Number, 
      required: true, 
      unique: true 
    },
    adminname: { 
      type: String, 
      required: true 
    },
    designation: { 
      type: String, 
      required: true 
    },
    department: { 
      type: String, 
      required: true 
    },
    faculty: { 
      type: String, 
      required: true 
    },
    mobile: { 
      type: Number, 
      required: true 
    },
    email: { 
      type: String, 
      required: true, 
      unique: true },
    password: { 
      type: String, 
      required: true 
    }
  }
);

// Define Employee Model
const Admin = mongoose.model('Admin', adminSchema);