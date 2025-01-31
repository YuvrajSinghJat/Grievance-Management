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
    Designation: { 
      type: String, 
      required: true 
    },
    Department: { 
      type: String, 
      required: true 
    },
    Faculty: { 
      type: String, 
      required: true 
    },
    MobileNo: { 
      type: Number, 
      required: true 
    },
    Email: { 
      type: String, 
      required: true, 
      unique: true 
    },
    Password: { 
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