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

// View all grievances - Employee
const viewAllGrievancesByEmployee = asyncHandler(async (req, res, next) => {
	// Future Improvement: Filter by department if needed using req.user.department
	const grievances = await Grievance.find({ status: "Pending" });

	res.status(200).json({ success: true, grievances });
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

module.exports = {
	viewSingleGrievance,
	viewAllGrievancesByDOSA,
	viewAllGrievancesByVC,
	viewAllGrievancesByEmployee,
	actionByDOSA,
	actionByVC,
	actionByChairman,
};
