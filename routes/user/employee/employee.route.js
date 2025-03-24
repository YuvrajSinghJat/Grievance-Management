const express = require("express");
const { employeeSignin, employeeLogout } = require("../../../controllers/user/employee/auth.controllers");
const { verifyEmployeeJWT } = require("../../../middlewares/auth.middleware");
const { viewAllGrievancesByDOSA, viewSingleGrievance, viewAllGrievancesByVC, actionByDOSA } = require("../../../controllers/user/employee/grevianceHandlers.controllers");


const employeeRouter = express.Router();

employeeRouter.route("/signin")
.post(employeeSignin)

employeeRouter.route("/logout")
.post(verifyEmployeeJWT , employeeLogout)

employeeRouter.route("/viewSingleGrievances")
.post(verifyEmployeeJWT , viewSingleGrievance)

employeeRouter.route("/viewAllGrievancesByDOSA")
.post(verifyEmployeeJWT , viewAllGrievancesByDOSA)
employeeRouter.route("actionByDOSA")
.post(verifyEmployeeJWT , actionByDOSA)

employeeRouter.route("/viewAllGrievancesByVC")
.post(verifyEmployeeJWT , viewAllGrievancesByVC)


module.exports = { employeeRouter }