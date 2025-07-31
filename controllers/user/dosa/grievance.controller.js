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

module.exports = {
  getAllGrievancesForDosa,
};
