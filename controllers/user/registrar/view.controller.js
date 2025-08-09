const { Admin } = require('../../../modals/admin/admin.modals.js');
// const { Employee } = require("../../modals/user/employee.modal.js");
const { Grievance } = require("../../../modals/user/grievance.modals.js");
// const { Student } = require("../../modals/user/student.modal.js");
const { ApiResponse } = require("../../../utility/ApiResponse.js");
const { ApiError } = require("../../../utility/ApiError.js");
const { asyncHandler } = require("../../../utility/asyncHandler.js");

const CommitteeReport = require("../../../modals/user/report.modal.js");

const options = {
  httpOnly: true,
  secure: true,
};

// ✅ View All Grievances
const viewAllGrievances = asyncHandler(async (req, res, next) => {
  const grievances = await Grievance.find({}).populate("studentId", "name email");
  if (!grievances) {
    throw new ApiError(404, "No Grievances found");
  }

  res.status(200).json(new ApiResponse(200, grievances, "Grievances retrieved successfully"));
});

// ✅ View Single Grievance
const viewSingleGrievances = asyncHandler(async (req, res, next) => {
  const grievanceId = req.body.grievanceId;

  const findSingleGrievance = await Grievance.findById(grievanceId);
  if (!findSingleGrievance) {
    console.log("error hai")
    throw new ApiError(404, "No Grievance found!");
  }

  return res.status(200).json(
    new ApiResponse(200, findSingleGrievance, "Grievance retrieved successfully!")
  );
});

// ✅ View Report
// const viewgrievanceReport = async (req, res) => {
//   try {
//     const { grievanceId } = req.params;

//     // Fetch grievance and populate studentId (to get student name)
//     const grievance = await Grievance.findById(grievanceId).populate("studentId","name scholarNo email department");
//     // console.log("StudentId populated:", grievance.studentId); // 👈 ADD THIS

//     if (!grievance) {
//       return res.status(404).json({
//         success: false,
//         message: "Grievance not found.",
//       });
//     }

//     const report = await CommitteeReport.findOne({ grievanceId });

//     if (!report) {
//       return res.status(404).json({
//         success: false,
//         message: "Report not found for this grievance.",
//       });
//     }

//     const responseData = {
//       status: grievance.status,
//       student: grievance.studentId, // ✅ now sending full student info
//       subject: grievance.grievanceTitle,
//       reportText: report.reportText,
//       attachment: report.fileUrl || null,
//     };

//     res.status(200).json({
//       success: true,
//       message: "Grievance report fetched successfully.",
//       data: responseData,
//     });

//   } catch (error) {
//     console.error("Error in viewGrievanceReport:", error);
//     res.status(500).json({
//       success: false,
//       message: "Internal server error.",
//     });
//   }
// };


// ✅ View Report
const viewgrievanceReport = async (req, res) => {
  try {
    const { grievanceId } = req.params;

    const grievance = await Grievance.findById(grievanceId)
      .populate("studentId", "name scholarNo email department");

    if (!grievance) {
      return res.status(404).json({
        success: false,
        message: "Grievance not found.",
      });
    }

    const report = await CommitteeReport.findOne({ grievanceId }).sort({ updatedAt: -1 });

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found for this grievance.",
      });
    }

    const responseData = {
      status: grievance.status,
      student: grievance.studentId,
      subject: grievance.grievanceTitle,
      briefHistory: report.briefHistory,
      findings: report.findings,
      recommendations: report.recommendations || [],
      attachment: report.fileUrl || null,
    };

    res.status(200).json({
      success: true,
      message: "Grievance report fetched successfully.",
      data: responseData,
    });
  } catch (error) {
    console.error("Error in viewGrievanceReport:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

const markResolved = async (req, res) => {
  try {
    const { grievanceId } = req.body;

    if (!grievanceId) {
      return res.status(400).json({ message: "Grievance ID is required." });
    }

    const updatedGrievance = await Grievance.findByIdAndUpdate(
      grievanceId,
      { status: "Resolved" },
      { new: true }
    );

    if (!updatedGrievance) {
      return res.status(404).json({ message: "Grievance not found." });
    }

    res.status(200).json({
      message: "Grievance marked as resolved.",
      data: updatedGrievance,
    });
  } catch (error) {
    console.error("Error marking grievance resolved:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


module.exports = {
  viewAllGrievances,
  viewSingleGrievances,
  viewgrievanceReport,
  markResolved,
};
