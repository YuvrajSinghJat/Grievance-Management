const { Grievance } = require("../../../modals/user/grievance.modals");
const { ApiError } = require("../../../utility/ApiError");
const { ApiResponse } = require("../../../utility/ApiResponse");
const { asyncHandler } = require("../../../utility/asyncHandler");

// @desc    VC can view all forwarded reports
// @route   GET /vc/reports
const viewForwardedReports = asyncHandler(async (req, res) => {
  const grievances = await Grievance.find({ status: "Forwarded to VC" });

  return res.status(200).json(
    new ApiResponse(200, grievances, "Forwarded grievances fetched successfully for VC")
  );
});

module.exports = {
  viewForwardedReports,
};
