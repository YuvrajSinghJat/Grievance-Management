const express = require("express");
const adminRouter = express.Router(); // ✅ Declare before using

const { adminSignin, adminLogout } = require("../../controllers/admin/auth.controllers.js");
const { verifyAdminJWT } = require("../../middlewares/auth.middleware.js");
const { createAdmin, createEmployee } = require("../../controllers/admin/create.controllers.js");
const {
  viewAllAdmins,
  viewAllEmployees,
  viewAllStudents,
  viewAllGrievances,
  viewSingleGreviances,
  getFacultyList
} = require("../../controllers/admin/view.controllers.js");

const { createCommittee } = require("../../controllers/admin/committee.controller.js");
const {
  getAllPendingGrievances,
  getAllCommittees
} = require("../../controllers/admin/grievance.controller.js");

// ✅ ROUTES

adminRouter.route("/signin").post(adminSignin);

adminRouter.route("/logout").post(verifyAdminJWT, adminLogout);

adminRouter.route("/createAdmin").post(verifyAdminJWT, createAdmin);

adminRouter.route("/viewAllAdmins").post(verifyAdminJWT, viewAllAdmins);


adminRouter.route("/createEmployee").post(verifyAdminJWT, createEmployee);

adminRouter.route("/viewAllEmployees").post(verifyAdminJWT, viewAllEmployees);

adminRouter.route("/viewAllStudents").post(verifyAdminJWT, viewAllStudents);

adminRouter.route("/viewAllGrievances").post(verifyAdminJWT, viewAllGrievances);

adminRouter.route("/viewSingleGrievances").post(verifyAdminJWT, viewSingleGreviances);

adminRouter.route("/faculties").get(verifyAdminJWT, getFacultyList);

adminRouter.route("/createCommittee").post(verifyAdminJWT, createCommittee);

adminRouter.get("/grievances", verifyAdminJWT, getAllPendingGrievances);

adminRouter.get("/getAllCommittees", verifyAdminJWT, getAllCommittees); // ✅ This now works fine

module.exports = adminRouter;
