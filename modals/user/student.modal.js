const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");

const Schema = mongoose.Schema;

// Define Student Schema
const studentSchema = new Schema(
  {
    enrollmentNo: { 
      type: String, 
      required: true, 
      unique: true 
    },
    scholarNo: { 
      type: Number 
    },
    name: { 
      type: String, 
      required: true 
    },
    studentProgram: { 
      type: String 
    },
    studentDepartment: { 
      type: String 
    },
    studentFaculty: { 
      type: String 
    },
    mobileNo: { 
      type: Number 
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
    parentName: { 
      type: String 
    },
    parentContactNo: { 
      type: Number 
    },
    refreshToken: { 
      type: String 
    }
  },
  {
    timestamps: true
  }
);

//  Generate Access Token
studentSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    { _id: this._id },
    process.env.ACCESS_TOKEN_SECRETKEY,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
};

// Generate Refresh Token
studentSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    { _id: this._id },
    process.env.REFRESH_TOKEN_SECRETKEY,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
  );
};

// Export Student Model
const Student = mongoose.model('Student', studentSchema);
module.exports = { Student };
