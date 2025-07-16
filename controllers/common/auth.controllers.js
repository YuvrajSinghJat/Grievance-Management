const jwt = require("jsonwebtoken");
const { Student } = require("../../modals/user/student.modal");
const { Employee } = require("../../modals/user/employee.modal");
const { Admin } = require("../../modals/admin/admin.modals");
const { ApiResponse } = require("../../utility/ApiResponse");
const { ApiError } = require("../../utility/ApiError");
const { asyncHandler } = require("../../utility/asyncHandler");
const { RoleUser } = require("../../modals/user/roleUser.modal"); // <-- Add this


// Token Generator
const generateToken = (userId, role) => {
  return jwt.sign({ userId, role }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

// Universal Login for All Users
const commonLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }


  // Student Login
  let user = await Student.findOne({ email, password }).select("-password");
  if (user) {
    const token = generateToken(user._id, "student");
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
    });
    return res.status(200).json(
      new ApiResponse(200, { ...user._doc, role: "student" }, "Student login successful")
    );
  }

  // DOSA, VC, REGISTRAR Login from RoleUser model
user = await RoleUser.findOne({ email, password }).select("-password");
if (user) {
  const token = generateToken(user._id, user.role);
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Lax",
  });
  return res.status(200).json(
    new ApiResponse(200, { ...user._doc, role: user.role }, `${user.role.toUpperCase()} login successful`)
  );
}


  // Employee Login
  user = await Employee.findOne({ Email: email, Password: password }).select("-Password");
  if (user) {
    const token = generateToken(user._id, "employee");
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
    });
    return res.status(200).json(
      new ApiResponse(200, { ...user._doc, role: "employee" }, "Employee login successful")
    );
  }

  // Admin Login
  user = await Admin.findOne({ adminEmail: email, adminPassword: password }).select("-adminPassword");
  if (user) {
    const token = generateToken(user._id, "admin");
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
    });
    return res.status(200).json(
      new ApiResponse(200, { ...user._doc, role: "admin" }, "Admin login successful")
    );
  }

 
  // No match
  throw new ApiError(404, "Invalid credentials or user not found");
});

module.exports = { commonLogin };
