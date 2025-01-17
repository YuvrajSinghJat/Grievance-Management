const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define admin Schema
const adminSchema = new Schema(
  {
    adminId: { 
      type: Number, 
      required: true, 
      unique: true 
    },
    adminName: { 
      type: String, 
      required: true 
    },
    adminDesignation: { 
      type: String, 
      required: true 
    },
    adminDepartment: { 
      type: String, 
      required: true 
    },
    adminFaculty: { 
      type: String, 
      required: true 
    },
    adminMobileNo: { 
      type: Number, 
      required: true 
    },
    adminEmail: { 
      type: String, 
      required: true, 
      unique: true 
    },
    adminPassword:{
      type: String, 
      required: true 
    }
  }
);

// Define Employee Model
const Admin = mongoose.model('Admin', adminSchema);

module.exports = { Admin }