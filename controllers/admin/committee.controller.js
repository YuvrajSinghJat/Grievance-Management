const { Grievance } = require("../../modals/user/grievance.modals");
const { Employee } = require("../../modals/user/employee.modal");
const { asyncHandler } = require("../../utility/asyncHandler");
const { ApiError } = require("../../utility/ApiError");
const { ApiResponse } = require("../../utility/ApiResponse");

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

  //Find the grievance
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
        post: designation,
      };
    })
  );

  // Update grievance with committee and meeting details
  grievance.committeeMembers = committeeMembers;
  grievance.status = "Committee Assigned";
  grievance.meetingDate = meetingDate;
  grievance.meetingTime = meetingTime;
  grievance.meetingVenue = meetingVenue;

  await grievance.save();

  res.status(200).json(new ApiResponse(200, grievance, "Committee assigned successfully"));
});

module.exports = {
  createCommittee,
};
