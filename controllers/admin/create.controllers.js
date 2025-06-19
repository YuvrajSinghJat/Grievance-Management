const { Admin } = require("../../modals/admin/admin.modals.js");
const { Employee } = require("../../modals/user/employee.modal.js");
const { ApiResponse } = require("../../utility/ApiResponse.js");
const { ApiError } = require("../../utility/ApiError.js");
const { asyncHandler } = require("../../utility/asyncHandler.js");

// Secure cookie options (if needed for login tokens)
const options = {
  httpOnly: true,
  secure: true
};

// ✅ Create Admin Controller
const createAdmin = asyncHandler(async (req, res, next) => {
  const {
    adminId,
    adminName,
    adminDesignation,
    adminDepartment,
    adminFaculty,
    adminMobileNo,
    adminEmail,
    adminPassword
  } = req.body;

  console.log("Creating Admin:", req.body);

  // Check if admin already exists
  const existingAdmin = await Admin.findOne({ adminEmail });
  if (existingAdmin) {
    throw new ApiError(400, "Admin already exists!");
  }

  // Create new admin
  const newAdmin = await Admin.create({
    adminId,
    adminName,
    adminDesignation,
    adminDepartment,
    adminFaculty,
    adminMobileNo,
    adminEmail,
    adminPassword // ⚠️ Note: hash this before saving in production
  });

  console.log("Admin created:", newAdmin);

  return res
    .status(201)
    .json(new ApiResponse(201, newAdmin, "Admin created successfully!"));
});

// ✅ Create Employee Controller
const createEmployee = asyncHandler(async (req, res, next) => {
  const {
    empId,
    empName,
    Designation,
    Department,
    Faculty,
    MobileNo,
    Email,
    Password
  } = req.body;

  console.log("Creating Employee:", req.body);

  // Check if employee already exists by email or empId
  const existingEmp = await Employee.findOne({ $or: [{ Email }, { empId }] });
  if (existingEmp) {
    return next(new ApiError(400, "Employee already exists!"));
  }

  // Create new employee
  const newEmp = new Employee({
    empId,
    empName,
    Designation,
    Department,
    Faculty,
    MobileNo,
    Email,
    Password // ⚠️ Note: hash this before saving in production
  });

  await newEmp.save();

  console.log("Employee created:", newEmp);

  return res
    .status(201)
    .json(new ApiResponse(201, newEmp, "Employee created successfully"));
});

// ✅ Export Controllers
module.exports = {
  createAdmin,
  createEmployee
};
