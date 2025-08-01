const { Grievance } = require("../../../modals/user/grievance.modals");
const { ApiError } = require("../../../utility/ApiError");
const { ApiResponse } = require("../../../utility/ApiResponse");
const { asyncHandler } = require("../../../utility/asyncHandler");

// @desc View All Grievances for DOSA
// @route GET /dosa/all-grievances
// const getAllGrievancesForDosa = asyncHandler(async (req, res) => {
//   const grievances = await Grievance.find({ status: { $ne: "Resolved" } });

//   return res
//     .status(200)
//     .json(new ApiResponse(200, grievances, "Grievances fetched successfully for DOSA"));
// });
//Dosa view all grievances
const getAllGrievancesForDosa = asyncHandler(async (req, res) => {
  try {
    const grievances = await Grievance.find({});

    if (!grievances || grievances.length === 0) {
      return res.status(404).json(new ApiResponse(404, null, "No grievances found"));
    }

    return res.status(200).json(new ApiResponse(200, grievances, "Grievances fetched successfully for DOSA"));
  } catch (error) {
    console.error("Error fetching grievances for DOSA:", error);
    throw new ApiError(500, "Internal Server Error");
  }
});

//view grievance details
const viewSingleGreviances = asyncHandler(async (req, res) => {
  const grievanceId = req.body.grievanceId; // ✅ FIXED: read from body

  const findSingleGrievance = await Grievance.findById(grievanceId);
  if (!findSingleGrievance) {
    throw new ApiError(404, "No Grievance found!");
  }

  return res.status(200).json(
    new ApiResponse(200, findSingleGrievance, "Grievance retrieved successfully!")
  );
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
  getAllGrievancesForDosa,
  viewSingleGreviances,
  getAllCommittees
};
