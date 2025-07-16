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
  fileGrievances,
  viewAllGrievances,
  viewSingleGrievance,
} = require("../../../controllers/user/student/grievance.controllers.js");

// Middleware
const { verifyStudentJWT } = require("../../../middlewares/auth.middleware.js");

// -------------------- Auth Routes --------------------
studentRouter.post("/signup", signup);
studentRouter.post("/signin", signin);
studentRouter.get("/logout", verifyStudentJWT, logout);

// -------------------- Grievance Routes --------------------
studentRouter.post("/fileGrievances", verifyStudentJWT, upload.single("proof"), fileGrievances);
studentRouter.post("/viewallgrievances", verifyStudentJWT, viewAllGrievances);
studentRouter.post("/viewsinglegrievance", verifyStudentJWT, viewSingleGrievance);

// Export Router
module.exports = studentRouter;
