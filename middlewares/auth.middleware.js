// const jwt = require("jsonwebtoken");
// const { asyncHandler } = require("../utility/asyncHandler.js");
// const { ApiError } = require("../utility/ApiError.js");

// const Student = require("../modals/user/student.modal.js");
// // const Employee = require("../modals/user/employee.modal.js");
// const { Employee } = require("../modals/user/employee.modal.js");

// const Admin = require("../modals/admin/admin.modals.js");

// // 🔐 Common function to verify token and fetch user
// const verifyToken = async (req, role) => {
//   const token = req.cookies.token;

//   if (!token) {
//     throw new ApiError(401, "Token is not provided");
//   }

//   let decoded;
//   try {
//     decoded = jwt.verify(token, process.env.JWT_SECRET);
//   } catch (err) {
//     throw new ApiError(401, "Invalid or expired token");
//   }

//   let user;
//   if (role === "student") {
//     user = await Student.findById(decoded.userId).select("-password");
//   } else if (role === "employee") {
//     user = await Employee.findById(decoded.userId).select("-password");
//   } else if (role === "admin") {
//     user = await Admin.findById(decoded.userId).select("-adminPassword");
//   }

//   if (!user) {
//     throw new ApiError(401, "User not found for this token");
//   }

//   req.verificationOfUser = user;
// };


// // 🧑‍🎓 Middleware for student
// const verifyStudentJWT = asyncHandler(async (req, res, next) => {
//   await verifyToken(req, "student");
//   next();
// });

// // 🧑‍💼 Middleware for employee
// const verifyEmployeeJWT = asyncHandler(async (req, res, next) => {
//   await verifyToken(req, "employee");
//   next();
// });

// // 👨‍💼 Middleware for admin
// const verifyAdminJWT = asyncHandler(async (req, res, next) => {
//   await verifyToken(req, "admin");
//   next();
// });




// module.exports = {
//   verifyStudentJWT,
//   verifyEmployeeJWT,
//   verifyAdminJWT,
// };


const jwt = require("jsonwebtoken");
const { asyncHandler } = require("../utility/asyncHandler.js");
const { ApiError } = require("../utility/ApiError.js");

const Student = require("../modals/user/student.modal.js");
const { Employee } = require("../modals/user/employee.modal.js");
const Admin = require("../modals/admin/admin.modals.js");

// 🔐 Common function to verify token and fetch user
const verifyToken = async (req, role) => {
  const token = req.cookies.token;

  if (!token) {
    throw new ApiError(401, "Token is not provided");
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    throw new ApiError(401, "Invalid or expired token");
  }

  let user;
  if (role === "student") {
    user = await Student.findById(decoded.userId).select("-password");
  } else if (role === "employee") {
    user = await Employee.findById(decoded.userId).select("-password");
  } else if (role === "admin") {
    user = await Admin.findById(decoded.userId).select("-adminPassword");
  }

  if (!user) {
    throw new ApiError(401, "User not found for this token");
  }

  req.verificationOfUser = user;

  // ✅ Safe place to log
  console.log(`✅ Verified ${role} ID:`, user._id);
};

// 🧑‍🎓 Middleware for student
const verifyStudentJWT = asyncHandler(async (req, res, next) => {
  await verifyToken(req, "student");
  next();
});

// 🧑‍💼 Middleware for employee
const verifyEmployeeJWT = asyncHandler(async (req, res, next) => {
  await verifyToken(req, "employee");
  next();
});

// 👨‍💼 Middleware for admin
const verifyAdminJWT = asyncHandler(async (req, res, next) => {
  await verifyToken(req, "admin");
  next();
});

module.exports = {
  verifyStudentJWT,
  verifyEmployeeJWT,
  verifyAdminJWT,
};




