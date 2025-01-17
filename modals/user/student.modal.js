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
    studentEmail: { 
      type: String, 
      required: true, 
      unique: true 
    },
    studentPassword: { 
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

studentSchema.methods.generateAccessToken = function (){
    jwt.sign({
        _id : this._id
      },
      process.env.ACCESS_TOKEN_SECRETKEY,
      process.env.ACCESS_TOKEN_EXPIRY
  )
}

studentSchema.methods.generateRefreshToken = function (){
    jwt.sign({
      _id : this._id
    },
    process.env.REFRESH_TOKEN_SECRETKEY,
    process.env.REFRESH_TOKEN_EXPIRY
    )
}

// Define Student Model
const Student = mongoose.model('Student', studentSchema);

module.exports = { Student }