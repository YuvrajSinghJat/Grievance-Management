const express = require("express");
const studentRouter = express.Router();
const upload = require("../../../middlewares/multer.middleware");

// Controllers
const {
  signup,
  signin,
  logout,
} = require("../../../controllers/user/student/auth.controllers.js");

const {
  fileGreviances,
  viewAllGrievances,
  viewSingleGreviances,
} = require("../../../controllers/user/student/greviance.controllers.js");

// Middleware
const { verifyStudentJWT } = require("../../../middlewares/auth.middleware.js");
studentRouter.post("/fileGreviances", verifyStudentJWT, upload.single("proof"), fileGreviances);
// -------------------- Auth Routes --------------------

/**
 * @route   POST /student/signup
 * @desc    Register a new student
 */
studentRouter.post("/signup", signup);

/**
 * @route   POST /student/signin
 * @desc    Student login
 */
studentRouter.post("/signin", signin);

/**
 * @route   GET /student/logout
 * @desc    Logout student (requires authentication)
 */
studentRouter.get("/logout", verifyStudentJWT, logout);

//Grievance Routes 

/**
 * @route   POST /student/fileGreviances
 * @desc    Student files a grievance (requires authentication)
 */
studentRouter.post("/fileGreviances", verifyStudentJWT, fileGreviances);

/**
 * @route   POST /student/viewallgreviances
 * @desc    Student views all grievances (requires authentication)
 */
studentRouter.post("/viewallgreviances", verifyStudentJWT, viewAllGrievances);

/**
 * @route   POST /student/viewsinglegreviance
 * @desc    Student views a single grievance (requires authentication)
 */
studentRouter.post("/viewsinglegreviance", verifyStudentJWT, viewSingleGreviances);

//Export Router
module.exports = studentRouter;
