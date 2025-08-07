//optional 
const { Grievance } = require("../../modals/user/grievance.modals");
const { ApiResponse } = require("../../utility/ApiResponse");
const { ApiError } = require("../../utility/ApiError");
const { asyncHandler } = require("../../utility/asyncHandler");

// Get All Grievances
const getAllGrievances = async (req, res) => {
  try {
    const grievances = await Grievance.find({}).populate("studentId", "name email");
    res.status(200).json(grievances);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch grievances", error: err.message });
  }
};

module.exports = {
  getAllGrievances,
  
};
