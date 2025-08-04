// // // controllers/committee/report.controller.js
// // const CommitteeReport = require("../../../modals/user/report.modal");

// // const createReport = async (req, res) => {
// //   try {
// //     const { grievanceId, reportText } = req.body;

// //     if (!grievanceId || !reportText) {
// //       return res.status(400).json({ message: "All fields are required." });
// //     }

// //     const fileUrl = req.file ? `/uploads/reports/${req.file.filename}` : "";

// //     const newReport = new CommitteeReport({
// //       grievanceId,
// //       reportText,
// //       fileUrl,
// //     });

// //     await newReport.save();

// //     res.status(201).json({ message: "Report submitted successfully." });
// //   } catch (error) {
// //     console.error("Report creation error:", error);
// //     res.status(500).json({ message: "Server error while submitting report." });
// //   }
// // };

// // module.exports = { createReport };

// const CommitteeReport = require("../../../modals/user/report.modal");

// const createReport = async (req, res) => {
//   try {
//     const { grievanceId, reportText } = req.body;

//     console.log("Received:", grievanceId, reportText); // ✅ Debug

//     if (!grievanceId || !reportText) {
//       return res.status(400).json({ message: "All fields are required." });
//     }

//     const fileUrl = req.file ? `/uploads/reports/${req.file.filename}` : "";

//     const newReport = new CommitteeReport({
//       grievanceId,
//       reportText,
//       fileUrl,
//     });

//     await newReport.save();

//     res.status(201).json({ message: "Report submitted successfully." });
//   } catch (error) {
//     console.error("Report creation error:", error);
//     res.status(500).json({ message: "Server error while submitting report." });
//   }
// };

// module.exports = { createReport };

const CommitteeReport = require("../../../modals/user/report.modal");
const { Grievance } = require("../../../modals/user/grievance.modals");

const createReport = async (req, res) => {
  try {
    const { grievanceId, reportText } = req.body;

    if (!grievanceId || !reportText) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const fileUrl = req.file ? `/uploads/reports/${req.file.filename}` : "";

    const newReport = new CommitteeReport({
      grievanceId,
      reportText,
      fileUrl,
    });

    await newReport.save();

    // await Grievance.findByIdAndUpdate(grievanceId,{
    //     status: "Resolved",
    // });
    // ✅ Update grievance status to 'Resolved'
    await Grievance.findByIdAndUpdate(grievanceId, {
      $set: { status: "Resolved" },
    });

    res.status(201).json({ message: "Report submitted successfully." });
  } catch (error) {
    console.error("Error while creating report:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { createReport };
