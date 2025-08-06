const { Grievance } = require("../../../modals/user/grievance.modals");
const { ApiResponse } = require("../../../utility/ApiResponse");
const { ApiError } = require("../../../utility/ApiError");
const { asyncHandler } = require("../../../utility/asyncHandler");

// ✅ Get All Pending Grievances
const getAllPendingGrievances = asyncHandler(async (req, res) => {
  try {
    console.log("Hitting getAllPendingGrievances");

    const grievances = await Grievance.find({ status: "Forwarded to VC" })
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


const getOngoingGrievances = asyncHandler(async (req, res) => {
  try {
    const grievances = await Grievance.find({ status: "Committee Assigned" })
    .populate("studentId", "name scholarNo email");

    if (!grievances || grievances.length === 0) {
      return res.status(404).json({ success: false, message: "No ongoing grievances found" });
    }

    return res.status(200).json({ success: true, data: grievances });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Internal server error", error: err.message });
  }
});

const getResolvedGrievances = asyncHandler(async (req, res) => {
  try {
    const grievances = await Grievance.find({ status: "Resolved" })
    .populate("studentId", "name scholarNo email");

    if (!grievances || grievances.length === 0) {
      return res.status(404).json({ success: false, message: "No resolved grievances found" });
    }

    return res.status(200).json({ success: true, data: grievances });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Internal server error", error: err.message });
  }
});


// const vcRejectGrievance = asyncHandler(async (req, res) => {
//   const { grievanceId } = req.body;

//   if (!grievanceId) {
//     throw new ApiError(400, "Grievance ID is required.");
//   }

//   const grievance = await Grievance.findById(grievanceId);
//   if (!grievance) {
//     throw new ApiError(404, "Grievance not found");
//   }

//   grievance.status = "Rejected";
//   grievance.rejectedDate = new Date();
//   grievance.rejectionReason = "";
//   grievance.rejectedBy = "VC";

//   await grievance.save();

//   return res.status(200).json(
//     new ApiResponse(200, grievance, "Grievance rejected successfully")
//   );
// });
const vcRejectGrievance = async (req, res) => {
  try {
    const { grievanceId } = req.body;
    if (!grievanceId) {
      return res.status(400).json({ message: "Grievance ID is required" });
    }

    const updatedGrievance = await Grievance.findByIdAndUpdate(
      grievanceId,
      { status: "Rejected by VC" },
      { new: true }
    );

    if (!updatedGrievance) {
      return res.status(404).json({ message: "Grievance not found" });
    }

    res.status(200).json({ message: "Grievance rejected successfully", grievance: updatedGrievance });
  } catch (error) {
    console.error("Error rejecting grievance:", error);
    res.status(500).json({ message: "Server error" });
  }
};


const getAllVcRejectedGrievances = asyncHandler(async (req, res) => {
  try {
    console.log("Hitting getAllVcRejectedGrievances");

    const grievances = await Grievance.find({
      status: "Rejected",
      rejectedBy: "VC",
    }).populate("studentId", "name email")
      .select("_id grievanceTitle grievanceType status proof scholarNo rejectedDate rejectionReason studentId");

    if (!grievances || grievances.length === 0) {
      return res.status(404).json({ success: false, message: "No VC rejected grievances found" });
    }

    return res.status(200).json({ success: true, data: grievances });
  } catch (err) {
    console.error("ERROR in getAllVcRejectedGrievances:", err);
    return res.status(500).json({ success: false, message: "Internal server error", error: err.message });
  }
});

//VC forwarding grievances to Registrar
const forwardToRegistrar = asyncHandler(async (req, res) => {
  const { grievanceId } = req.body;

  if (!grievanceId) {
    throw new ApiError(400, "Grievance ID is required.");
  }

  const grievance = await Grievance.findById(grievanceId);
  if (!grievance) {
    throw new ApiError(404, "Grievance not found.");
  }

  grievance.status = "Forwarded to Registrar";
  await grievance.save();

  return res.status(200).json(
    new ApiResponse(200, grievance, "Grievance forwarded to Registrar successfully.")
  );
});

  

module.exports = {
  getAllPendingGrievances,
  vcRejectGrievance,
  getAllVcRejectedGrievances,
  getOngoingGrievances,
  getResolvedGrievances,
  forwardToRegistrar,
};
