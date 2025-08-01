const { Grievance } = require("../../../modals/user/grievance.modals.js");
const { ApiResponse } = require("../../../utility/ApiResponse.js");
const { ApiError } = require("../../../utility/ApiError.js");
const { asyncHandler } = require("../../../utility/asyncHandler.js");
const { Employee } = require('../../../modals/user/employee.modal.js');

const options = {
  httpOnly: true,
  secure: true,
};

// ✅ View All Grievances
const viewAllGrievances = asyncHandler(async (req, res, next) => {
  const grievances = await Grievance.find({}).populate("studentId", "name email");
  if (!grievances) {
    throw new ApiError(404, "No Grievances found");
  }

  res.status(200).json(new ApiResponse(200, grievances, "Grievances retrieved successfully"));
});

// ✅ View Single Grievance
const viewSingleGrievances = asyncHandler(async (req, res, next) => {
  const grievanceId = req.body.grievanceId;

  const findSingleGrievance = await Grievance.findById(grievanceId);
  if (!findSingleGrievance) {
    console.log("error hai")
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

// ✅ GET committees List
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

module.exports = {
  viewAllGrievances,
  viewSingleGrievances,
  getFacultyList,
  getAllCommittees,
};
