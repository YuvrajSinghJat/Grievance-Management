const Student = require("../../../modals/user/student.modal.js");
const { asyncHandler } = require("../../../utility/asyncHandler.js");
const { ApiResponse } = require("../../../utility/ApiResponse.js");
const { ApiError } = require("../../../utility/ApiError.js");

const getStudentProfile = asyncHandler(async (req, res) => {
  const studentId = req.verificationOfUser?._id;

  if (!studentId) {
    throw new ApiError(401, "Unauthorized request. Student ID missing.");
  }

  const student = await Student.findById(studentId).select("scholarNo email mobileNo department");

  if (!student) {
    throw new ApiError(404, "Student not found");
  }

  return res.status(200).json(
    new ApiResponse(200, student, "Student profile fetched successfully")
  );
});


module.exports = { getStudentProfile };
