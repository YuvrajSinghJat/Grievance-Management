// modals/committee/report.modal.js
const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  grievanceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Grievance",
    required: true,
  },
  reportText: {
    type: String,
    required: true,
  },
  fileUrl: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const CommitteeReport = mongoose.model("CommitteeReport", reportSchema);
module.exports = CommitteeReport;
