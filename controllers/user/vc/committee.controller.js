// // const { Grievance } = require("../../modals/user/grievance.modals");
// const { Grievance } = require('../../../modals/user/grievance.modals');
// const { Employee } = require("../../../modals/user/employee.modal");
// const { asyncHandler } = require("../../../utility/asyncHandler");
// const { ApiError } = require("../../../utility/ApiError");
// const { ApiResponse } = require("../../../utility/ApiResponse");
// const { sendCommitteeMail } = require("../../../utility/sendMail");

// const createCommittee = asyncHandler(async (req, res) => {
//   const { grievanceId, members, meetingDate, meetingTime, meetingVenue } = req.body;

//   // Validate required fields
//   if (
//     !grievanceId ||
//     !Array.isArray(members) ||
//     members.length < 2 ||
//     !meetingDate ||
//     !meetingTime ||
//     !meetingVenue
//   ) {
//     throw new ApiError(400, "All fields (grievanceId, members, date, time, venue) are required");
//   }

//   //Find the grievance
//   const grievance = await Grievance.findById(grievanceId);
//   if (!grievance) {
//     throw new ApiError(404, "Grievance not found");
//   }

//   // Build committee members
//   const committeeMembers = await Promise.all(
//     members.map(async ({ facultyId, designation }) => {
//       const faculty = await Employee.findById(facultyId);
//       if (!faculty) throw new ApiError(404, `Faculty not found: ${facultyId}`);
//       return {
//         employeeId: faculty._id,
//         name: faculty.empName,
//         email: faculty.Email,
//         post: designation,
//       };
//     })
//   );


//   // Update grievance with committee and meeting details
//   // grievance.committeeMembers = committeeMembers;
//   grievance.committeeMembers = committeeMembers.map(({ employeeId, name, post }) => ({
//   employeeId,
//   name,
//   post,
//   }));
//   grievance.status = "Committee Assigned";
//   grievance.meetingDate = meetingDate;
//   grievance.meetingTime = meetingTime;
//   grievance.meetingVenue = meetingVenue;

//   await grievance.save();

// // Send email to all members
// const emails = committeeMembers.map(m => m.email).filter(Boolean);
// if (emails.length > 0) {
//   await sendCommitteeMail(
//     emails,
//     "Committee Assignment Notification",
//     `
//       <p>Dear Committee Member,</p>
//       <p>You have been assigned to a grievance committee.</p>
//       <p><b>Grievance ID:</b> ${grievance._id}</p>
//       <p><b>Date:</b> ${meetingDate}</p>
//       <p><b>Time:</b> ${meetingTime}</p>
//       <p><b>Venue:</b> ${meetingVenue}</p>
//       <p>Regards,<br>Medi-Caps University</p>
//     `
//   );
// }

//   res.status(200).json(new ApiResponse(200, grievance, "Committee assigned successfully"));
// });

// module.exports = {
//   createCommittee,
// };

const { Grievance } = require('../../../modals/user/grievance.modals');
const { Employee } = require("../../../modals/user/employee.modal");
const { asyncHandler } = require("../../../utility/asyncHandler");
const { ApiError } = require("../../../utility/ApiError");
const { ApiResponse } = require("../../../utility/ApiResponse");
const { sendCommitteeMail } = require("../../../utility/sendMail");

const createCommittee = asyncHandler(async (req, res) => {
  const { grievanceId, members, meetingDate, meetingTime, meetingVenue } = req.body;

  // Validate required fields
  if (
    !grievanceId ||
    !Array.isArray(members) ||
    members.length < 2 ||
    !meetingDate ||
    !meetingTime ||
    !meetingVenue
  ) {
    throw new ApiError(400, "All fields (grievanceId, members, date, time, venue) are required");
  }

  // Find the grievance
  const grievance = await Grievance.findById(grievanceId);
  if (!grievance) {
    throw new ApiError(404, "Grievance not found");
  }

  // Build committee members
  const committeeMembers = await Promise.all(
    members.map(async ({ facultyId, designation }) => {
      const faculty = await Employee.findById(facultyId);
      if (!faculty) throw new ApiError(404, `Faculty not found: ${facultyId}`);
      return {
        employeeId: faculty._id,
        name: faculty.empName,
        email: faculty.Email, // make sure this matches your schema
        post: designation,
      };
    })
  );

  // Update grievance with committee and meeting details
  grievance.committeeMembers = committeeMembers.map(({ employeeId, name, post }) => ({
    employeeId,
    name,
    post,
  }));
  grievance.status = "Committee Assigned";
  grievance.meetingDate = meetingDate;
  grievance.meetingTime = meetingTime;
  grievance.meetingVenue = meetingVenue;

  await grievance.save();

  // Send email to each member individually
  for (const member of committeeMembers) {
    if (member.email) {
      await sendCommitteeMail(
        member.email,
        "Committee Assignment Notification",
        `
          <p>Dear ${member.name},</p>
          <p>You have been assigned to a grievance committee.</p>
          <p><b>Grievance ID:</b> ${grievance._id}</p>
          <p><b>Date:</b> ${meetingDate}</p>
          <p><b>Time:</b> ${meetingTime}</p>
          <p><b>Venue:</b> ${meetingVenue}</p>
          <p>Regards,<br>Medi-Caps University</p>
        `
      );
    }
  }

  res.status(200).json(new ApiResponse(200, grievance, "Committee assigned successfully"));
});

module.exports = {
  createCommittee,
};
