const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define Employee Schema
const employeeSchema = Schema(
  {
    empId: { 
      type: String, 
      required: true, 
      unique: true 
    },
    empName: {
      type: String, 
      required: true 
    },
    Designation: { 
      type: String, 
      required: true 
    },
    Department: { 
      type: String, 
      required: true 
    },
    Faculty: { 
      type: String, 
      required: true 
    },
    MobileNo: { 
      type: Number, 
      required: true 
    },
    Email: { 
      type: String, 
      required: true, 
      unique: true 
    },
    Password: { 
      type: String, 
      required: true 
    },
    refreshToken : {
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

employeeSchema.methods.generateAccessToken = function (){
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

employeeSchema.methods.generateRefreshToken = function (){
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
const Employee = mongoose.model('Employee', employeeSchema);

module.exports = { Employee }