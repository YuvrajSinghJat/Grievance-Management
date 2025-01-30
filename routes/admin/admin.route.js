const express = require("express")
const { adminSignin, adminLogout } = require("../../controllers/admin/auth.controllers.js")
const { verifyAdminJWT } = require("../../middlewares/auth.middleware.js")
const { createAdmin, createEmployee } = require("../../controllers/admin/create.controllers.js")
const { viewAllAdmins, viewAllEmployees, viewAllStudents, viewAllGrievances } = require("../../controllers/admin/view.controllers.js")
const { viewAllGrievancesByDOSA } = require("../../controllers/user/employee/grevianceHandlers.controllers.js")
const adminRouter = express.Router()

adminRouter.route("/signin")
.post(adminSignin)

adminRouter.route("/logout")
.post(verifyAdminJWT , adminLogout)

adminRouter.route("/createAdmin")
.post(verifyAdminJWT , createAdmin)

adminRouter.route("/createEmployee")
.post(verifyAdminJWT , createEmployee)

adminRouter.route("/viewAllAdmins")
.post(verifyAdminJWT , viewAllAdmins)

adminRouter.route("/viewAllEmployees")
.post(verifyAdminJWT , viewAllEmployees)

adminRouter.route("/viewAllStudents")
.post(verifyAdminJWT , viewAllStudents)

adminRouter.route("/viewAllGrievances")
.post(verifyAdminJWT , viewAllGrievances)

adminRouter.route("/viewAllGrievancesByDosa")
.get(viewAllGrievancesByDOSA) 

module.exports = { adminRouter }