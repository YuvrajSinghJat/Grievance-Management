const { Grievance } = require("../../../modals/user/grievance.modals");
const { ApiError } = require("../../../utility/ApiError");
const { ApiResponse } = require("../../../utility/ApiResponse");
const { asyncHandler } = require("../../../utility/asyncHandler");

// @desc View All Grievances for DOSA
// @route GET /dosa/all-grievances
const getAllGrievancesForDosa = asyncHandler(async (req, res) => {
  const grievances = await Grievance.find({ status: { $ne: "Resolved" } });

  return res
    .status(200)
    .json(new ApiResponse(200, grievances, "Grievances fetched successfully for DOSA"));
});

module.exports = {
  getAllGrievancesForDosa,
};
