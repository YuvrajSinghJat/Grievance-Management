const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const Schema = mongoose.Schema;

// Student Schema Definition
const studentSchema = new Schema(
  {
    enrollmentNo: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    scholarNo: {
      type: String,
      trim: true,
      default: "",
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    program: {
      type: String,
      trim: true,
      default: "",
    },
    department: {
      type: String,
      trim: true,
      default: "",
    },
    faculty: {
      type: String,
      trim: true,
      default: "",
    },
    mobileNo: {
      type: String,
      trim: true,
      default: "",
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    parentName: {
      type: String,
      trim: true,
      default: "",
    },
    parentContactNo: {
      type: String,
      trim: true,
      default: "",
    },
    refreshToken: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);



// Generate Access Token
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
const Student = mongoose.model("Student", studentSchema);
module.exports = Student;
