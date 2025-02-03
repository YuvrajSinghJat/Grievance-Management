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

adminSchema.methods.generateRefreshToken = function (){
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

// Define Employee Model
const Admin = mongoose.model('Admin', adminSchema);

module.exports = { Admin }