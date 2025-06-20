const mongoose = require("mongoose");
const { Employee } = require("../../../modals/user/employee.modal.js");
const { Student } = require("../../../modals/user/student.modal.js");
const { asyncHandler } = require("../../../utility/asyncHandler.js");
const { ApiResponse } = require("../../../utility/ApiResponse.js");
const { ApiError } = require("../../../utility/ApiError.js");
const jwt = require("jsonwebtoken");

const options = {
  httpOnly: true,
  secure: true,
};

// Generate Access and Refresh Token
const createAccessAndRefeshToken = async function (_id) {
  let user = await Student.findById(_id);
  let accessToken = await user.generateAccessToken();
  let refreshToken = await user.generateRefreshToken();

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  return { accessToken, refreshToken };
};


// Student Signup Controller

const signup = asyncHandler(async (req, res) => {
  const {
    enrollmentNo,
    scholarNo,
    name,
    email,
    password,
    mobileNo,
    department,
    faculty,
    program,
    parentName,
    parentContactNo,
  } = req.body;

  if (!enrollmentNo || !name || !email || !password) {
    throw new ApiError(400, "Required fields are missing");
  }

  const existingEmail = await Student.findOne({ email });
  if (existingEmail) {
    throw new ApiError(409, "Email already registered");
  }

  const newStudent = await Student.create({
    enrollmentNo,
    scholarNo,
    name,
    email,
    password,
    mobileNo,
    department,
    faculty,
    program,
    parentName,
    parentContactNo,
  });

  if (!newStudent) {
    throw new ApiError(500, "Failed to create user");
  }

  const studentDetails = await Student.findById(newStudent._id).select("-password");

  return res
    .status(201)
    .json(new ApiResponse(201, studentDetails, "Student registered successfully"));
});


// Student Signin Controller

const signin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const student = await Student.findOne({ email, password }).select("-password");
  if (!student) {
    throw new ApiError(404, "Invalid email or password");
  }

  const { accessToken, refreshToken } = await createAccessAndRefeshToken(student._id);

  const user = await Student.findById(student._id).select("-password -refreshToken");
  if (!user) {
    throw new ApiError(500, "User not found after token generation");
  }

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse(200, { ...user._doc, role: "student" }, "Login successful"));
});

// Student Logout Controller

const logout = asyncHandler(async (req, res) => {
  await Student.findByIdAndUpdate(req.verificationOfUser._id, {
    $unset: { refreshToken: "" },
  });

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "Logged out successfully"));
});

// Placeholder for Employee Auth
const employeeSignin = asyncHandler(async (req, res) => {
  res.send("Employee login logic not implemented");
});

const employeeLogout = asyncHandler(async (req, res) => {
  res.send("Employee logout logic not implemented");
});

module.exports = {
  signin,
  signup,
  logout,
  employeeSignin,
  employeeLogout,
};
