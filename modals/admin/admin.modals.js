const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const Schema = mongoose.Schema;

// Define Admin Schema
const adminSchema = new Schema(
  {
    adminId: {
      type: Number,
      required: true,
      unique: true,
    },
    adminName: {
      type: String,
      required: true,
    },
    adminDesignation: {
      type: String,
      required: true,
    },
    adminDepartment: {
      type: String,
      required: true,
    },
    adminFaculty: {
      type: String,
      required: true,
    },
    adminMobileNo: {
      type: Number,
      required: true,
    },
    adminEmail: {
      type: String,
      required: true,
      unique: true,
    },
    adminPassword: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt fields
);

// 🔐 Generate Access Token
adminSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      role: 'admin',
    },
    process.env.ACCESS_TOKEN_SECRETKEY,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY || '1d',
    }
  );
};

// 🔐 Generate Refresh Token
adminSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      role: 'admin',
    },
    process.env.REFRESH_TOKEN_SECRETKEY,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY || '7d',
    }
  );
};

const Admin = mongoose.model('Admin', adminSchema);

module.exports = {Admin};

