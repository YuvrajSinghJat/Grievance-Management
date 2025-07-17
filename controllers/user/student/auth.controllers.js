const mongoose = require("mongoose");
const Student = require("../../../modals/user/student.modal.js");  // ✅ Correct default export
const Employee = require("../../../modals/user/employee.modal.js"); // Also default export

const { asyncHandler } = require("../../../utility/asyncHandler.js");
const { ApiResponse } = require("../../../utility/ApiResponse.js");
const { ApiError } = require("../../../utility/ApiError.js");

const jwt = require("jsonwebtoken");

// ✅ Secure cookie options
const options = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production", // Only secure in production
  sameSite: "Lax",
};

// ✅ Generate Access and Refresh Tokens
const createAccessAndRefreshToken = async (_id) => {
  const user = await Student.findById(_id);
  if (!user) throw new ApiError(404, "Student not found");

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  return { accessToken, refreshToken };
};

// ✅ Student Signup
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

// ✅ Student Signin
const signin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  const student = await Student.findOne({ email, password }); // Don't select "-password" here
  if (!student) {
    throw new ApiError(401, "Invalid email or password");
  }

  const { accessToken, refreshToken } = await createAccessAndRefreshToken(student._id);

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

// ✅ Student Logout
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

// 🔒 Placeholder: Employee Auth (not implemented yet)
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
