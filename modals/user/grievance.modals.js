const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define Grievance schema
const grievanceSchema = Schema(
  {
    studentId: {
      type: mongoose.Types.ObjectId,
      ref: "Student",
    },
    scholarNo: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    grievanceType: {
      type: String,
      required: true,
    },
    grievanceTitle: {
      type: String,
      required: true,
    },
    grievanceDescription: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "Pending",
    },
    proof: {
      type: String,
    },
    remarks: {
      type: String,
    },
    actionByDosa: {
      type: String,
    },
    actionByVC: {
      type: String,
    },
    status: { 
      type: String, default: "Pending" 
    },
    rejected: {
    type: Boolean,
    default: false,
    },
    rejectionReason: {
      type: String,
    },
    // rejectedBy: {
    //   type: String, // e.g., "DOSA", "VC", "Committee"
    // },
    rejectedBy: {
    type: String, // or an enum like ['VC', 'DOSA']
    enum: ['VC', 'DOSA'],
    default: null,
    },

    // Committee Info
    committeeMembers: [
      {
        employeeId: {
          type: mongoose.Types.ObjectId,
          ref: "Employee",
        },
        name: {
          type: String,
        },
        post: {
          type: String,
        },
      },
    ],
    actionByCommittee: {
      type: String,
    },
    vcSatisfactory: {
      type: String,
    },
    meetingWithChairperson: {
      type: String,
    },
    actionOnReportByVC: {
      type: String,
    },

    meetingDate: {
      type: String, 
    },
    meetingTime: {
      type: String,
    },
    meetingVenue: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Define Grievance model
const Grievance = mongoose.model("Grievance", grievanceSchema);
module.exports = { Grievance };
