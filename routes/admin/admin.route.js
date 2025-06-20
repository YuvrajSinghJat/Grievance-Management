const express = require("express")
const { adminSignin, adminLogout } = require("../../controllers/admin/auth.controllers.js")
const { verifyAdminJWT } = require("../../middlewares/auth.middleware.js")
const { createAdmin, createEmployee } = require("../../controllers/admin/create.controllers.js")
const { viewAllAdmins, viewAllEmployees, viewAllStudents, viewAllGrievances, viewSingleGreviances } = require("../../controllers/admin/view.controllers.js")
const { getFacultyList } = require("../../controllers/admin/view.controllers.js")
const { createCommittee } = require("../../controllers/admin/committee.controller.js");
const { getAllPendingGrievances } = require("../../controllers/admin/grievance.controller.js");


const adminRouter = express.Router()

adminRouter.route("/signin")//working fine
.post(adminSignin)

adminRouter.route("/logout")//working fine
.post(verifyAdminJWT , adminLogout)

adminRouter.route("/createAdmin")//working fine
.post(verifyAdminJWT , createAdmin)

adminRouter.route("/viewAllAdmins")//working fine
.post(verifyAdminJWT , viewAllAdmins)

adminRouter.route("/createEmployee") //working fine
.post(verifyAdminJWT , createEmployee)

adminRouter.route("/viewAllEmployees") //working fine
.post(verifyAdminJWT , viewAllEmployees)

adminRouter.route("/viewAllStudents") //working fine
.post(verifyAdminJWT , viewAllStudents)

adminRouter.route("/viewAllGrievances") //working fine
.post(verifyAdminJWT , viewAllGrievances)

adminRouter.route("/viewSingleGrievances") //working fine 
.post(verifyAdminJWT , viewSingleGreviances)

adminRouter.route("/faculties").get(verifyAdminJWT, getFacultyList); //working fine

adminRouter.route("/createCommittee").post(verifyAdminJWT, createCommittee); // working fine

adminRouter.get("/grievances", verifyAdminJWT, getAllPendingGrievances);



module.exports =  adminRouter ;