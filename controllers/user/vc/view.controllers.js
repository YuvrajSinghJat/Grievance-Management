const { Grievance } = require("../../../modals/user/grievance.modals.js");
const { ApiResponse } = require("../../../utility/ApiResponse.js");
const { ApiError } = require("../../../utility/ApiError.js");
const { asyncHandler } = require("../../../utility/asyncHandler.js");

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

module.exports = {
  viewAllGrievances,
  viewSingleGrievances,
};
