// const CommitteeReport = require("../../../modals/user/report.modal");
// const { Grievance } = require("../../../modals/user/grievance.modals");

// const createReport = async (req, res) => {
//   try {
//     const { grievanceId, reportText } = req.body;

//     if (!grievanceId || !reportText) {
//       return res.status(400).json({ message: "All fields are required." });
//     }

//     const fileUrl = req.file ? `/uploads/${req.file.filename}` : "";

//     // Upsert = update if exists, else create
//     const updatedReport = await CommitteeReport.findOneAndUpdate(
//       { grievanceId },
//       { reportText, fileUrl },
//       { new: true, upsert: true } // upsert creates if not exists
//     );

//     // ✅ Update grievance status
//     const updatedGrievance = await Grievance.findByIdAndUpdate(
//       grievanceId,
//       { status: "Report Created" },
//       { new: true }
//     );

//     res.status(201).json({
//       message: "Report saved successfully.",
//       grievance: updatedGrievance,
//       report: updatedReport
//     });
//   } catch (error) {
//     console.error("Error while creating/updating report:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };



// // ✅ View Report
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

//     const report = await CommitteeReport.findOne({ grievanceId }).sort({ updatedAt: -1 }); // latest first;

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

// module.exports = {
//   createReport,
//   viewgrievanceReport,
// };

// controllers/committee/report.controller.js
const CommitteeReport = require("../../../modals/user/report.modal");
const { Grievance } = require("../../../modals/user/grievance.modals");

const createReport = async (req, res) => {
  try {
    const { grievanceId, briefHistory, findings, recommendations } = req.body;

    if (!grievanceId || !briefHistory || !findings) {
      return res.status(400).json({ message: "All required fields must be filled." });
    }

    let parsedRecommendations = [];
    try {
      parsedRecommendations = recommendations ? JSON.parse(recommendations) : [];
    } catch (err) {
      console.error("Invalid recommendations JSON:", err);
    }

    const fileUrl = req.file ? `/uploads/${req.file.filename}` : "";

    // ✅ Upsert report
    const updatedReport = await CommitteeReport.findOneAndUpdate(
      { grievanceId },
      {
        briefHistory,
        findings,
        recommendations: parsedRecommendations,
        fileUrl
      },
      { new: true, upsert: true }
    );

    // ✅ Update grievance status
    const updatedGrievance = await Grievance.findByIdAndUpdate(
      grievanceId,
      { status: "Report Created" },
      { new: true }
    );

    res.status(201).json({
      message: "Report saved successfully.",
      grievance: updatedGrievance,
      report: updatedReport
    });
  } catch (error) {
    console.error("Error while creating/updating report:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

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

module.exports = {
  createReport,
  viewgrievanceReport,
};
