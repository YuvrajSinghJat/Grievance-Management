const { Grievance } = require("../../../modals/user/grievance.modals.js");
const { ApiError } = require("../../../utility/ApiError.js");
const { ApiResponse } = require("../../../utility/ApiResponse.js");
const { asyncHandler } = require("../../../utility/asyncHandler.js");

// @desc    File a Grievance
// @route   POST /student/fileGrievances
const fileGrievances = asyncHandler(async (req, res) => {
  const {
    scholarNo,
    email,
    mobile,
    department,
    grievanceType,
    title,
    description,
  } = req.body;

  if (
    !scholarNo || !email || !mobile || !department ||
    !grievanceType || !title || !description
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const studentId = req.verificationOfUser?._id;
  if (!studentId) {
    throw new ApiError(401, "Unauthorized request. Student ID missing.");
  }

  const grievanceData = {
    studentId,
    scholarNo,
    email,
    mobile,
    department,
    grievanceType,
    grievanceTitle: title,
    grievanceDescription: description,
  };

  if (req.file) {
    grievanceData.proof = req.file.filename;
  }

  const grievance = await Grievance.create(grievanceData);
  if (!grievance) {
    throw new ApiError(500, "Grievance could not be filed. Please try again.");
  }

  return res.status(201).json(
    new ApiResponse(201, grievance, "Grievance successfully filed")
  );
});

// @desc    View All Grievances of logged-in student
// @route   POST /student/viewallgrievances
const viewAllGrievances = asyncHandler(async (req, res) => {
  const studentId = req.verificationOfUser?._id;
  if (!studentId) {
    throw new ApiError(401, "Unauthorized request. Student ID missing.");
  }

  const grievances = await Grievance.find({ studentId }).select(
    "-grievanceDescription -proof -actionByDosa -actionByVC -committeeMembers -actionByCommittee -vcSatisfactory -meetingWithChairperson -actionOnReportByVC"
  );

  if (!grievances || grievances.length === 0) {
    throw new ApiError(404, "No grievances found.");
  }

  return res.status(200).json(
    new ApiResponse(200, grievances, "Grievances retrieved successfully")
  );
});

// @desc    View Single Grievance by ID
// @route   POST /student/viewsinglegrievance
const viewSingleGrievance = asyncHandler(async (req, res) => {
  const studentId = req.verificationOfUser?._id;
  const { grievanceId } = req.body;

  if (!grievanceId) {
    throw new ApiError(400, "Grievance ID is required");
  }

  const grievance = await Grievance.findOne({ _id: grievanceId, studentId });
  if (!grievance) {
    throw new ApiError(404, "Grievance not found");
  }

  return res.status(200).json(
    new ApiResponse(200, grievance, "Grievance retrieved successfully")
  );
});

module.exports = {
  fileGrievances,
  viewAllGrievances,
  viewSingleGrievance,
};
