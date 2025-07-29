const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');

// Define Employee Schema
const employeeSchema = new Schema(
  {
    empId: { type: String, required: true, unique: true },
    empName: { type: String, required: true },
    Designation: { type: String, required: true },
    Department: { type: String, required: true },
    Faculty: { type: String, required: true },
    MobileNo: { type: Number, required: true },
    Email: { type: String, required: true, unique: true },
    Password: { type: String, required: true },
    refreshToken: { type: String }
  },
  {
    timestamps: true
  }
);

// Access Token Method
employeeSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    { _id: this._id },
    process.env.ACCESS_TOKEN_SECRETKEY,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
};

// Refresh Token Method
employeeSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    { _id: this._id },
    process.env.REFRESH_TOKEN_SECRETKEY,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
  );
};

// Export the model
const Employee = mongoose.model('Employee', employeeSchema);
module.exports = { Employee };
