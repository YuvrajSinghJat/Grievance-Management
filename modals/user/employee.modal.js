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
    empDesignation: { 
      type: String, 
      required: true 
    },
    empDepartment: { 
      type: String, 
      required: true 
    },
    empFaculty: { 
      type: String, 
      required: true 
    },
    empMobileNo: { 
      type: Number, 
      required: true 
    },
    empEmail: { 
      type: String, 
      required: true, 
      unique: true 
    },
    empPassword: { 
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