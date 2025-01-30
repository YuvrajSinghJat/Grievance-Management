const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Define Grievance schema
const grievanceSchema = Schema(
	{
		studentId: {
			type: mongoose.Types.ObjectId,
			ref: "Student",
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
		proof: {
			type: String,
		},

		actionByDosa: {
			type: String,
		},
		actionByVC: {
			type: String,
		},
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
	},
	{
		timestamps: true,
	}
);

//Define Grievance Model
const Grievance = mongoose.model("Grievance", grievanceSchema);

module.exports = { Grievance };
