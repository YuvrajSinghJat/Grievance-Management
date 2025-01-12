const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken")

// Define Studente Schema
const studentSchema = Schema(
  {
    enrollmentNo: { 
      type: String, 
      required: true, 
      unique: true 
    },
    scholarNo: { 
      type: Number, 
      
    },
    studentName: { 
      type: String, 
      required: true 
    },
    program:{
      type: String,

    },
    department: { 
      type: String, 

    },
    faculty: { 
      type: String, 

    },
    mobileNo: { 
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
    parentName: { 
      type: String, 
    },
    parentContactNo:{
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