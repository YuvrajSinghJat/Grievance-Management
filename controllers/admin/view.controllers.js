// const { Admin } = require("../../modals/admin/admin.modals.js");
// const { Employee } = require("../../modals/user/employee.modal.js");
// const { Grievance } = require("../../modals/user/grievance.modals.js");
// const { Student } = require("../../modals/user/student.modal.js");
// const { ApiResponse } = require("../../utility/ApiResponse.js");
// const { ApiError } = require("../../utility/ApiError.js");
// const { asyncHandler } = require("../../utility/asyncHandler.js");

// const options = {
//   httpOnly: true,
//   secure: true,
// };

// // ✅ View All Admins
// const viewAllAdmins = asyncHandler(async (req, res, next) => {
//   const admins = await Admin.find({});
//   if (!admins) {
//     throw new ApiError(404, "No Admins found!");
//   }

//   res.status(200).json(new ApiResponse(200, admins, "Admins retrieved successfully"));
// });

// // ✅ View All Employees
// const viewAllEmployees = asyncHandler(async (req, res, next) => {
//   const employees = await Employee.find({});
//   if (!employees) {
//     throw new ApiError(404, "No employees found");
//   }

//   res.status(200).json(new ApiResponse(200, employees, "Employees retrieved successfully"));
// });

// // ✅ View All Students
// const viewAllStudents = asyncHandler(async (req, res, next) => {
//   const students = await Student.find({});
//   if (!students) {
//     throw new ApiError(404, "No students found");
//   }

//   res.status(200).json(new ApiResponse(200, students, "Students retrieved successfully"));
// });

// // ✅ View All Grievances
// const viewAllGrievances = asyncHandler(async (req, res, next) => {
//   const grievances = await Grievance.find({}).populate("studentId", "name email");
//   if (!grievances) {
//     throw new ApiError(404, "No Grievances found");
//   }

//   res.status(200).json(new ApiResponse(200, grievances, "Grievances retrieved successfully"));
// });

// // ✅ View Single Grievance
// const viewSingleGreviances = asyncHandler(async (req, res, next) => {
//   const grievanceId = req.body.grievanceId;

//   const findSingleGrievance = await Grievance.findById(grievanceId);
//   if (!findSingleGrievance) {
//     throw new ApiError(404, "No Grievance found!");
//   }

//   return res.status(200).json(
//     new ApiResponse(200, findSingleGrievance, "Grievance retrieved successfully!")
//   );
// });

// // ✅ GET Faculty List (used in Create Committee page)
// const getFacultyList = asyncHandler(async (req, res, next) => {
//   const faculty = await Employee.find({
//     Designation: { $regex: /professor|faculty/i }, // 🔄 Correct field name
//   }).select("_id empName Designation"); // 🔄 Correct selected fields

//   if (!faculty || faculty.length === 0) {
//     throw new ApiError(404, "No Faculty members found");
//   }

//   res.status(200).json(new ApiResponse(200, faculty, "Faculty list fetched successfully"));
// });


// module.exports = {
//   viewAllAdmins,
//   viewAllEmployees,
//   viewAllStudents,
//   viewAllGrievances,
//   viewSingleGreviances,
//   getFacultyList, // 👈 make sure to export
// };



const {Admin}  = require("../../modals/admin/admin.modals.js");
const { Employee } = require("../../modals/user/employee.modal.js");
const { Grievance } = require("../../modals/user/grievance.modals.js");
const { Student } = require("../../modals/user/student.modal.js");
//const { Committee } = require("../../modals/admin/committee.model.js"); // ✅ ADD THIS LINE

const { ApiResponse } = require("../../utility/ApiResponse.js");
const { ApiError } = require("../../utility/ApiError.js");
const { asyncHandler } = require("../../utility/asyncHandler.js");

const options = {
  httpOnly: true,
  secure: true,
};

// ✅ View All Admins
const viewAllAdmins = asyncHandler(async (req, res, next) => {
  const admins = await Admin.find({});
  if (!admins) {
    throw new ApiError(404, "No Admins found!");
  }

  res.status(200).json(new ApiResponse(200, admins, "Admins retrieved successfully"));
});

// ✅ View All Employees
const viewAllEmployees = asyncHandler(async (req, res, next) => {
  const employees = await Employee.find({});
  if (!employees) {
    throw new ApiError(404, "No employees found");
  }

  res.status(200).json(new ApiResponse(200, employees, "Employees retrieved successfully"));
});

// ✅ View All Students
const viewAllStudents = asyncHandler(async (req, res, next) => {
  const students = await Student.find({});
  if (!students) {
    throw new ApiError(404, "No students found");
  }

  res.status(200).json(new ApiResponse(200, students, "Students retrieved successfully"));
});

// ✅ View All Grievances
const viewAllGrievances = asyncHandler(async (req, res, next) => {
  const grievances = await Grievance.find({}).populate("studentId", "name email");
  if (!grievances) {
    throw new ApiError(404, "No Grievances found");
  }

  res.status(200).json(new ApiResponse(200, grievances, "Grievances retrieved successfully"));
});

// ✅ View Single Grievance
const viewSingleGreviances = asyncHandler(async (req, res, next) => {
  const grievanceId = req.body.grievanceId;

  const findSingleGrievance = await Grievance.findById(grievanceId);
  if (!findSingleGrievance) {
    throw new ApiError(404, "No Grievance found!");
  }

  return res.status(200).json(
    new ApiResponse(200, findSingleGrievance, "Grievance retrieved successfully!")
  );
});

// ✅ GET Faculty List (used in Create Committee page)
const getFacultyList = asyncHandler(async (req, res, next) => {
  const faculty = await Employee.find({
    Designation: { $regex: /professor|faculty/i }, // 🔄 Correct field name
  }).select("_id empName Designation"); // 🔄 Correct selected fields

  if (!faculty || faculty.length === 0) {
    throw new ApiError(404, "No Faculty members found");
  }

  res.status(200).json(new ApiResponse(200, faculty, "Faculty list fetched successfully"));
});

// ✅ GET Committee List
const getAllCommittees = asyncHandler(async (req, res) => {
  const grievancesWithCommittee = await Grievance.find({
    committeeMembers: { $exists: true, $not: { $size: 0 } },
  })
    .populate("committeeMembers.employeeId", "empName") // Populate faculty name
    .select("grievanceTitle scholarNo fileName committeeMembers meetingDate meetingTime meetingVenue");

  if (!grievancesWithCommittee || grievancesWithCommittee.length === 0) {
    throw new ApiError(404, "No grievances with assigned committees found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, grievancesWithCommittee, "Committees fetched successfully"));
});












// ✅ View All Committees with grievance + file + members
// const getAllCommittees = asyncHandler(async (req, res) => {
//   const committees = await Committee.find()
//     .populate({
//       path: "grievance",
//       select: "grievanceTitle scholarNo fileName", // include file
//     })
//     .populate({
//       path: "members.facultyId",
//       select: "empName", // include faculty name
//     });

//   if (!committees || committees.length === 0) {
//     throw new ApiError(404, "No committees found");
//   }

//   res.status(200).json(new ApiResponse(200, committees, "Committees fetched successfully"));
// });

module.exports = {
  viewAllAdmins,
  viewAllEmployees,
  viewAllStudents,
  viewAllGrievances,
  viewSingleGreviances,
  getFacultyList,
  getAllCommittees, // ✅ EXPORTED HERE
};
