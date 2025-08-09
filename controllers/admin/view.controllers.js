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
const mongoose = require("mongoose");
const CommitteeReport = require("../../modals/user/report.modal.js");

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



// ✅ GET single committees List
const getSingleCommittees = asyncHandler(async (req, res) => {
  const { grievanceId } = req.query;

  let query = {
    committeeMembers: { $exists: true, $not: { $size: 0 } },
  };

  if (grievanceId) {
    // Validate and convert to ObjectId
    if (!mongoose.Types.ObjectId.isValid(grievanceId)) {
      throw new ApiError(400, "Invalid grievanceId");
    }
    query._id = new mongoose.Types.ObjectId(grievanceId);
  }

  const grievancesWithCommittee = await Grievance.find(query)
    .populate("committeeMembers.employeeId", "empName")
    .select("grievanceTitle scholarNo fileName committeeMembers meetingDate meetingTime meetingVenue");

  if (!grievancesWithCommittee || grievancesWithCommittee.length === 0) {
    throw new ApiError(404, "No grievances with assigned committees found");
  }

  res.status(200).json(
    new ApiResponse(
      200,
      grievanceId ? grievancesWithCommittee[0] : grievancesWithCommittee,
      grievanceId ? "Committee for specific grievance fetched" : "All committees fetched"
    )
  );
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


// ✅ View Report
// const viewgrievanceReport = async (req, res) => {
//   try {
//     const { grievanceId } = req.params;

//     // Fetch grievance and populate studentId (to get student name)
//     const grievance = await Grievance.findById(grievanceId).populate("studentId","name scholarNo email department");
//     // console.log("StudentId populated:", grievance.studentId); // 👈 ADD THIS

//     if (!grievance) {
//       return res.status(404).json({
//         success: false,
//         message: "Grievance not found.",
//       });
//     }

//     const report = await CommitteeReport.findOne({ grievanceId });

//     if (!report) {
//       return res.status(404).json({
//         success: false,
//         message: "Report not found for this grievance.",
//       });
//     }

//     const responseData = {
//       status: grievance.status,
//       student: grievance.studentId, // ✅ now sending full student info
//       subject: grievance.grievanceTitle,
//       reportText: report.reportText,
//       attachment: report.fileUrl || null,
//     };

//     res.status(200).json({
//       success: true,
//       message: "Grievance report fetched successfully.",
//       data: responseData,
//     });

//   } catch (error) {
//     console.error("Error in viewGrievanceReport:", error);
//     res.status(500).json({
//       success: false,
//       message: "Internal server error.",
//     });
//   }
// };


// ✅ View Report
const viewgrievanceReport = async (req, res) => {
  try {
    const { grievanceId } = req.params;

    const grievance = await Grievance.findById(grievanceId)
      .populate("studentId", "name scholarNo email department");

    if (!grievance) {
      return res.status(404).json({
        success: false,
        message: "Grievance not found.",
      });
    }

    const report = await CommitteeReport.findOne({ grievanceId }).sort({ updatedAt: -1 });

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found for this grievance.",
      });
    }

    const responseData = {
      status: grievance.status,
      student: grievance.studentId,
      subject: grievance.grievanceTitle,
      briefHistory: report.briefHistory,
      findings: report.findings,
      recommendations: report.recommendations || [],
      attachment: report.fileUrl || null,
    };

    res.status(200).json({
      success: true,
      message: "Grievance report fetched successfully.",
      data: responseData,
    });
  } catch (error) {
    console.error("Error in viewGrievanceReport:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

module.exports = {
  viewAllAdmins,
  viewAllEmployees,
  viewAllStudents,
  viewAllGrievances,
  viewSingleGreviances,
  getFacultyList,
  getAllCommittees, // ✅ EXPORTED HERE
  getSingleCommittees,
  viewgrievanceReport,
};
