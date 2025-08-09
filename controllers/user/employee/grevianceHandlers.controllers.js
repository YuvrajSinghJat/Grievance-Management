// const mongoose = require("mongoose");
// const { asyncHandler } = require("../../../utility/asyncHandler.js");
// const { Grievance } = require("../../../modals/user/grievance.modals.js");
// const { ApiResponse } = require("../../../utility/ApiResponse.js");
// const { ApiError } = require("../../../utility/ApiError.js"); 

// // View single grievance - DOSA
// const viewSingleGrievance = asyncHandler(async (req, res, next) => {
// 	const grievanceId = req.body.grievanceId;
// 	const grievance = await Grievance.findById(grievanceId);

// 	if (!grievance) {
// 		throw new ApiError(404, "Grievance not found!");
// 	}

// 	res.status(200).json(new ApiResponse(200, grievance, "Grievance sent properly"));
// });

// // View all grievances - DOSA
// const viewAllGrievancesByDOSA = asyncHandler(async (req, res, next) => {
// 	const grievances = await Grievance.find({
// 		status: { $in: ["Pending", "Reviewed by DOSA"] },
// 	});
// 	res.status(200).json({ success: true, grievances });
// });

// // Take action - DOSA
// const actionByDOSA = asyncHandler(async (req, res, next) => {
// 	const { grievanceId, action, remarks } = req.body;

// 	const grievance = await Grievance.findById(grievanceId);
// 	if (!grievance) {
// 		return res.status(404).json({ success: false, message: "Grievance not found" });
// 	}

// 	grievance.status = action === "approveByDOSA" ? "Reviewed by DOSA" : "Rejected by DOSA";
// 	grievance.remarks = remarks;
// 	await grievance.save();

// 	res.status(200).json({ success: true, message: "Action taken by DOSA", grievance });
// });

// // View all grievances - VC
// const viewAllGrievancesByVC = asyncHandler(async (req, res, next) => {
// 	const grievances = await Grievance.find({
// 		status: { $in: ["Reviewed by DOSA", "Reviewed by VC"] },
// 	});
// 	res.status(200).json({ success: true, grievances });
// });

// // Take action - VC
// const actionByVC = asyncHandler(async (req, res, next) => {
// 	const { grievanceId, action, remarks } = req.body;

// 	const grievance = await Grievance.findById(grievanceId);
// 	if (!grievance) {
// 		return res.status(404).json({ success: false, message: "Grievance not found" });
// 	}

// 	grievance.status = action === "approveByVC" ? "Reviewed by VC" : "Rejected by VC";
// 	grievance.remarks = remarks;
// 	await grievance.save();

// 	res.status(200).json({ success: true, message: "Action taken by VC", grievance });
// });



// // View all grievances - Employee (only assigned ones)
// const viewAllGrievancesByEmployee = asyncHandler(async (req, res, next) => {
//   const employeeId = req.verificationOfUser._id;

//   // Find grievances where the logged-in employee is in committeeMembers
//   const grievances = await Grievance.find({
//     "committeeMembers.employeeId": employeeId,
//   });

//   res.status(200).json(new ApiResponse(200, grievances, "Filtered grievances for employee"));
// });



// // Take action - Chairman
// const actionByChairman = asyncHandler(async (req, res, next) => {
// 	const { grievanceId, action, remarks } = req.body;

// 	const grievance = await Grievance.findById(grievanceId);
// 	if (!grievance) {
// 		return res.status(404).json({ success: false, message: "Grievance not found" });
// 	}

// 	grievance.status = action === "approve" ? "Finalized by Chairman" : "Rejected by Chairman";
// 	grievance.remarks = remarks;
// 	await grievance.save();

// 	res.status(200).json({
// 		success: true,
// 		message: "Final decision made by Chairman",
// 		grievance,
// 	});
// });

// module.exports = {
// 	viewSingleGrievance,
// 	viewAllGrievancesByDOSA,
// 	viewAllGrievancesByVC,
// 	viewAllGrievancesByEmployee,
// 	actionByDOSA,
// 	actionByVC,
// 	actionByChairman,
// };


const mongoose = require("mongoose");
const { asyncHandler } = require("../../../utility/asyncHandler.js");
const { Grievance } = require("../../../modals/user/grievance.modals.js");
const { ApiResponse } = require("../../../utility/ApiResponse.js");
const { ApiError } = require("../../../utility/ApiError.js");

// View single grievance - DOSA
const viewSingleGrievance = asyncHandler(async (req, res, next) => {
	const grievanceId = req.body.grievanceId;
	const grievance = await Grievance.findById(grievanceId);

	if (!grievance) {
		throw new ApiError(404, "Grievance not found!");
	}

	res.status(200).json(new ApiResponse(200, grievance, "Grievance sent properly"));
});

// View all grievances - DOSA
const viewAllGrievancesByDOSA = asyncHandler(async (req, res, next) => {
	const grievances = await Grievance.find({
		status: { $in: ["Pending", "Reviewed by DOSA"] },
	});
	res.status(200).json({ success: true, grievances });
});

// Take action - DOSA
const actionByDOSA = asyncHandler(async (req, res, next) => {
	const { grievanceId, action, remarks } = req.body;

	const grievance = await Grievance.findById(grievanceId);
	if (!grievance) {
		return res.status(404).json({ success: false, message: "Grievance not found" });
	}

	grievance.status = action === "approveByDOSA" ? "Reviewed by DOSA" : "Rejected by DOSA";
	grievance.remarks = remarks;
	await grievance.save();

	res.status(200).json({ success: true, message: "Action taken by DOSA", grievance });
});

// View all grievances - VC
const viewAllGrievancesByVC = asyncHandler(async (req, res, next) => {
	const grievances = await Grievance.find({
		status: { $in: ["Reviewed by DOSA", "Reviewed by VC"] },
	});
	res.status(200).json({ success: true, grievances });
});

// Take action - VC
const actionByVC = asyncHandler(async (req, res, next) => {
	const { grievanceId, action, remarks } = req.body;

	const grievance = await Grievance.findById(grievanceId);
	if (!grievance) {
		return res.status(404).json({ success: false, message: "Grievance not found" });
	}

	grievance.status = action === "approveByVC" ? "Reviewed by VC" : "Rejected by VC";
	grievance.remarks = remarks;
	await grievance.save();

	res.status(200).json({ success: true, message: "Action taken by VC", grievance });
});

// // View all grievances - Employee (only assigned ones)
// const viewAllGrievancesByEmployee = asyncHandler(async (req, res, next) => {
// 	const employeeId = req.verificationOfUser._id;

// 	const grievances = await Grievance.find({
// 		$or: [
// 			{ "committeeMembers.employeeId": employeeId }, // Committee member
// 			{ "chairman.employeeId": employeeId }         // Chairman of the committee
// 		]
// 	});

// 	res.status(200).json(
// 		new ApiResponse(200, grievances, "Filtered grievances for employee (assigned or chairperson)")
// 	);
// });
const viewAllGrievancesByEmployee = asyncHandler(async (req, res, next) => {
  const employeeId = req.verificationOfUser._id;

  const grievances = await Grievance.find({
    $or: [
      { "committeeMembers.employeeId": employeeId }, // Committee member
      { "chairman.employeeId": employeeId }          // Chairman of the committee
    ]
  })
  .populate("studentId", "name scholarNo email")
  .lean(); // lean() makes it plain JS objects, easier to modify

  // Transform status for employee view
  const modifiedGrievances = grievances.map(g => {
    if (g.status?.toLowerCase() === "committee report") {
      return { ...g, status: "Forwarded to VC" };
    }
    return g;
  });

  res.status(200).json(
    new ApiResponse(
      200,
      modifiedGrievances,
      "Filtered grievances for employee (with status adjusted for view)"
    )
  );
});


// Take action - Chairman
const actionByChairman = asyncHandler(async (req, res, next) => {
	const { grievanceId, action, remarks } = req.body;

	const grievance = await Grievance.findById(grievanceId);
	if (!grievance) {
		return res.status(404).json({ success: false, message: "Grievance not found" });
	}

	grievance.status = action === "approve" ? "Finalized by Chairman" : "Rejected by Chairman";
	grievance.remarks = remarks;
	await grievance.save();

	res.status(200).json({
		success: true,
		message: "Final decision made by Chairman",
		grievance,
	});
});


// ✅ GET Committee List
// const getAllCommittees = asyncHandler(async (req, res) => {
//   const grievancesWithCommittee = await Grievance.find({
// 	committeeMembers: { $exists: true, $not: { $size: 0 } },
//   })
// 	.populate("committeeMembers.employeeId", "empName") // Populate faculty name
// 	.select("grievanceTitle scholarNo fileName committeeMembers meetingDate meetingTime meetingVenue");

//   if (!grievancesWithCommittee || grievancesWithCommittee.length === 0) {
// 	throw new ApiError(404, "No grievances with assigned committees found");
//   }

//   res
// 	.status(200)
// 	.json(new ApiResponse(200, grievancesWithCommittee, "Committees fetched successfully"));
// });



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
  grievance.status = "Committee Report";

  await grievance.save();

  return res.status(200).json(
	new ApiResponse(200, grievance, "Grievance forwarded to VC successfully")
  );
});

module.exports = {
	viewSingleGrievance,
	viewAllGrievancesByDOSA,
	viewAllGrievancesByVC,
	viewAllGrievancesByEmployee,
	actionByDOSA,
	actionByVC,
	actionByChairman,
	getSingleCommittees,
	forwardToVC,
};
