const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken")

// Define Studente Schema
const studentSchema = Schema(
  {
    studentEnrollmentNo: { 
      type: String, 
      required: true, 
      unique: true 
    },
    studentScholarNo: { 
      type: Number, 
      
    },
    studentName: { 
      type: String, 
      required: true 
    },
    studentProgram:{
      type: String,

    },
    studentDepartment: { 
      type: String, 

    },
    studentFaculty: { 
      type: String, 

    },
    studentMobileNo: { 
      type: Number, 
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
    studentParentName: { 
      type: String, 
    },
    studentParentContactNo:{
      type: Number,
    },
    refreshToken: { 
      type: String
    }
  },
  {
    timestamps: true 
  }
);

const options = {
  httpOnly : true,
  secure : true
}

studentSchema.methods.generateAccessToken = function (){
    accessToken = jwt.sign(
      {
        _id : this._id
      },
      process.env.ACCESS_TOKEN_SECRETKEY,
      {
        expiresIn : process.env.ACCESS_TOKEN_EXPIRY
      },
      {
        httpOnly : true,
        secure : true
      }
  )
  return accessToken
}

studentSchema.methods.generateRefreshToken = function (){
    refreshToken = jwt.sign({
      _id : this._id
    },
    process.env.REFRESH_TOKEN_SECRETKEY,
    {
      expiresIn : process.env.REFRESH_TOKEN_EXPIRY
    },
    {
      httpOnly : true,
      secure : true
    }
    )
    return refreshToken
}

// Define Student Model
const Student = mongoose.model('Student', studentSchema);

module.exports = { Student }