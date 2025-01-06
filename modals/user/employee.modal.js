const mongoose = require('mongoose');
const Schema = mongoose.Schema();

// Define Employee Schema
const employeeSchema = new Schema(
  {
    empid: { 
      type: Number, 
      required: true, 
      unique: true 
    },
    empname: {
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
      unique: true 
    },
    password: { 
      type: String, 
      required: true 
    },
    refreshToken: { 
      type: String
    },
    accessToken: { 
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