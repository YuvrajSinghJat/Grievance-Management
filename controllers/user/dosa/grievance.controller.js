const { Grievance } = require("../../../modals/user/grievance.modals");
const { ApiError } = require("../../../utility/ApiError");
const { ApiResponse } = require("../../../utility/ApiResponse");
const { asyncHandler } = require("../../../utility/asyncHandler");
const mongoose = require("mongoose");

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

// All Pending Grievances
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

//new 
const forwardToVC = asyncHandler(async (req, res) => {
  const { grievanceId, actionByDosa } = req.body;

  if (!grievanceId || !actionByDosa) {
    throw new ApiError(400, "Grievance ID and actionByDosa are required");
  }

  const grievance = await Grievance.findById(grievanceId);
  if (!grievance) {
    throw new ApiError(404, "Grievance not found");
  }

  grievance.forwardedToVC = true;
  grievance.forwardedDate = new Date();
  grievance.actionByDosa = actionByDosa || "Reviewed and forwarded to VC";
  grievance.status = "Forwarded to VC";

  await grievance.save();

  return res.status(200).json(
    new ApiResponse(200, grievance, "Grievance forwarded to VC successfully")
  );
});

//to handle rejection

// const rejectGrievance = asyncHandler(async (req, res) => {
//   const { grievanceId, reason } = req.body;

//   if (!grievanceId || !reason) {
//     throw new ApiError(400, "Grievance ID and rejection reason required.");
//   }

//   const grievance = await Grievance.findById(grievanceId);
//   if (!grievance) {
//     throw new ApiError(404, "Grievance not found");
//   }

//   grievance.status = "Rejected";
//   grievance.rejectionReason = reason; // Add this field to your schema if needed
//   grievance.rejectedDate = new Date();

//   await grievance.save();

//   return res.status(200).json(
//     new ApiResponse(200, grievance, "Grievance rejected successfully")
//   );
// });
const rejectGrievance = asyncHandler(async (req, res) => {
  const { grievanceId } = req.body;

  if (!grievanceId) {
    throw new ApiError(400, "Grievance ID is required.");
  }

  const grievance = await Grievance.findById(grievanceId);
  if (!grievance) {
    throw new ApiError(404, "Grievance not found");
  }

  grievance.status = "Rejected";
  grievance.rejectedDate = new Date();

  // Optional: If rejectionReason field exists, clear it or leave blank
  grievance.rejectionReason = ""; 

  await grievance.save();

  return res.status(200).json(
    new ApiResponse(200, grievance, "Grievance rejected successfully")
  );
});

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


module.exports = {
  getAllGrievancesForDosa,
  viewSingleGreviances,
  getAllCommittees,
  forwardToVC,
  rejectGrievance,
  getAllPendingGrievances,
  getSingleCommittees,
};
