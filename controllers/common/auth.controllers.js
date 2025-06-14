const { Student } = require("../../modals/user/student.modal");
const { Employee } = require("../../modals/user/employee.modal");
const { Admin } = require("../../modals/admin/admin.modals"); 
const { ApiResponse } = require("../../utility/ApiResponse");
const { ApiError } = require("../../utility/ApiError");
const { asyncHandler } = require("../../utility/asyncHandler");

const commonLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //  Student
  let user = await Student.findOne({ email, password }).select("-password");
  if (user) {
    return res.status(200).json(
      new ApiResponse(200, { ...user._doc, role: "student" }, "Student login successful")
    );
  }

  // Employee
  user = await Employee.findOne({ Email: email, Password: password }).select("-Password");
  if (user) {
    return res.status(200).json(
      new ApiResponse(200, { ...user._doc, role: "employee" }, "Employee login successful")
    );
  }

  //  Admin
  user = await Admin.findOne({ email, password }).select("-password");
  if (user) {
    return res.status(200).json(
      new ApiResponse(200, { ...user._doc, role: "admin" }, "Admin login successful")
    );
  }

  //  Not Found
  throw new ApiError(404, "User not found");
});

module.exports = { commonLogin };
