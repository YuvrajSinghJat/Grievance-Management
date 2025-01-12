const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define Employee Schema
const employeeSchema = Schema(
  {
    empId: { 
      type: Number, 
      required: true, 
      unique: true 
    },
    empName: {
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
    mobileNo: { 
      type: Number, 
      required: true 
    },
    email: { 
      type: String, 
      required: true, 
      unique: true 
    },
    password: { 
      type: String, 
      required: true 
    },
    refreshToken: { 
      type: String
    }
  },
  {
    timestamps: true 
  }
);

// Define Employee Model
const Employee = mongoose.model('Employee', employeeSchema);

module.exports = { Employee }