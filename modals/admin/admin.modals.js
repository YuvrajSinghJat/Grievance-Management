const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define admin Schema
const adminSchema = new Schema(
  {
    adminid: { 
      type: Number, 
      required: true, 
      unique: true 
    },
    adminName: { 
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
    }
  }
);

// Define Employee Model
const Admin = mongoose.model('Admin', adminSchema);

module.exports = { Admin }