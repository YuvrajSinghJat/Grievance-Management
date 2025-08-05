
const CommitteeReport = require("../../../modals/user/report.modal");
const { Grievance } = require("../../../modals/user/grievance.modals");

// ✅ Create Report
const createReport = async (req, res) => {
  try {
    const { grievanceId, reportText } = req.body;

    if (!grievanceId || !reportText) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const fileUrl = req.file ?`/uploads/${req.file.filename}` : "";

    const newReport = new CommitteeReport({
      grievanceId,
      reportText,
      fileUrl,
    });

    await newReport.save();

    // ✅ Update the grievance status to 'Resolved'
    await Grievance.findByIdAndUpdate(grievanceId, {
      status: "Resolved",
    });

    res.status(201).json({ message: "Report submitted successfully." });
  } catch (error) {
    console.error("Error while creating report:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ✅ View Report
const viewgrievanceReport = async (req, res) => {
  try {
    const { grievanceId } = req.params;

    // Fetch grievance and populate studentId (to get student name)
    const grievance = await Grievance.findById(grievanceId).populate("studentId","name scholarNo email department");
    // console.log("StudentId populated:", grievance.studentId); // 👈 ADD THIS

    if (!grievance) {
      return res.status(404).json({
        success: false,
        message: "Grievance not found.",
      });
    }

    const report = await CommitteeReport.findOne({ grievanceId });

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found for this grievance.",
      });
    }

    const responseData = {
      status: grievance.status,
      student: grievance.studentId, // ✅ now sending full student info
      subject: grievance.grievanceTitle,
      reportText: report.reportText,
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
