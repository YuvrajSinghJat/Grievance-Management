const { Grievance } = require("../../../modals/user/grievance.modals");
const { ApiResponse } = require("../../../utility/ApiResponse");
const { ApiError } = require("../../../utility/ApiError");
const { asyncHandler } = require("../../../utility/asyncHandler");

// ✅ Get All Pending Grievances
const getAllPendingGrievances = asyncHandler(async (req, res) => {
  try {
    console.log("Hitting getAllPendingGrievances");

    const grievances = await Grievance.find({ status: "Pending" })
      .select("_id grievanceTitle scholarNo meetingDate meetingTime meetingVenue");

    if (!grievances || grievances.length === 0) {
      console.log("No pending grievances found");
      return res.status(404).json({ success: false, message: "No pending grievances found" });
    }

    console.log("Grievances fetched:", grievances);
    return res.status(200).json({ success: true, data: grievances });
  } catch (err) {
    console.error("ERROR in getAllPendingGrievances:", err);
    return res.status(500).json({ success: false, message: "Internal server error", error: err.message });
  }
});

module.exports = {
  getAllPendingGrievances,
};
