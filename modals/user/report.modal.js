// modals/committee/report.modal.js
const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  grievanceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Grievance",
    required: true,
  },
  // reportText: {
  //   type: String,
  //   required: true,
  // },
  briefHistory: { 
    type: String, 
    required: true 
  },

  findings: {
    type: String, 
    required: true 
  },
recommendations: [
  {
    enrollment: { type: String, required: true },
    recommendation: { type: String, required: true }
  }
],
  fileUrl: {
    type: String,
    default: "",
  },
}, { timestamps: true });

const CommitteeReport = mongoose.model("CommitteeReport", reportSchema);
module.exports = CommitteeReport;
