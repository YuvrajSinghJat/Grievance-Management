const mongoose = require("mongoose");
const { asyncHandler } = require("../../../utility/asyncHandler.js");
const { Grievance } = require("../../../modals/user/grievance.modals.js");
const { ApiResponse } = require("../../../utility/ApiResponse.js");

// View single grievances - DOSAs
const viewSingleGrievance = asyncHandler(async (req, res, next) => {
	const grievanceId = req.body.grievanceId;
	const grievances = await Grievance.find({
		_id : grievanceId
	})

    if(!grievances){
        throw new ApiError(404,"Grievances not found!")
    }

	res
	.status(200)
	.json(
		new ApiResponse(200,grievances,"Grievances send properly")
	);
});



/* This code snippet defines a function `viewAllGrievancesByDOSA` that retrieves all grievances that
have a status of either "Pending" or "Reviewed by DOSA" from the database. It then populates the
"student" field with the properties "name" and "email". Finally, it sends a JSON response with a
success status and the retrieved grievances. */
// View all grievances - DOSAs
const viewAllGrievancesByDOSA = asyncHandler(async (req, res, next) => {
	const grievances = await Grievance.find({
		status: { $in: ["Pending", "Reviewed by DOSA"] },
	})
	res.status(200).json({ success: true, grievances });
});

// View all grievances - VC
const viewAllGrievancesByVC = asyncHandler(async (req, res, next) => {
	const grievances = await Grievance.find({
		status: { $in: ["Reviewed by DOSA", "Reviewed by VC"] },
	}).populate("student", "name email");
	res.status(200).json({ success: true, grievances });
});

// View all grievances - Employee
const viewAllGrievancesByEmployee = asyncHandler(async (req, res, next) => {
	const grievances = await Grievance.find({ status: "Pending" }).populate(
		"student",
		"name email"
	);
	res.status(200).json({ success: true, grievances });
});



// Take action - DOSA
const actionByDOSA = asyncHandler(async (req, res, next) => {
	const { grievanceId, action, remarks } = req.body;

	const grievance = await Grievance.findById(grievanceId);
	if (!grievance)
		return res
			.status(404)
			.json({ success: false, message: "Grievance not found" });

	grievance.status =
		action === "approve" ? "Reviewed by DOSA" : "Rejected by DOSA";
	grievance.remarks = remarks;
	await grievance.save();

	res
		.status(200)
		.json({ success: true, message: "Action taken by DOSA", grievance });
});



// Take action - VC
const actionByVC = asyncHandler(async (req, res, next) => {
	const { grievanceId, action, remarks } = req.body;

	const grievance = await Grievance.findById(grievanceId);
	if (!grievance)
		return res
			.status(404)
			.json({ success: false, message: "Grievance not found" });

	grievance.status = action === "approve" ? "Reviewed by VC" : "Rejected by VC";
	grievance.remarks = remarks;
	await grievance.save();

	res
		.status(200)
		.json({ success: true, message: "Action taken by VC", grievance });
});



// Take action - Chairman
const actionByChairman = asyncHandler(async (req, res, next) => {
	const { grievanceId, action, remarks } = req.body;

	const grievance = await Grievance.findById(grievanceId);
	if (!grievance)
		return res
			.status(404)
			.json({ success: false, message: "Grievance not found" });

	grievance.status =
		action === "approve" ? "Finalized by Chairman" : "Rejected by Chairman";
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
