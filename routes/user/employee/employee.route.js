const express = require("express");
const { employeeSignin, employeeLogout } = require("../../../controllers/user/employee/auth.controllers");
const { verifyEmployeeJWT } = require("../../../middlewares/auth.middleware");
const { viewAllGrievancesByDOSA, viewSingleGrievance } = require("../../../controllers/user/employee/grevianceHandlers.controllers");


const employeeRouter = express.Router();

employeeRouter.route("/signin")
.post(verifyEmployeeJWT ,employeeSignin)

employeeRouter.route("/logout")
.post(verifyEmployeeJWT , employeeLogout)

employeeRouter.route("/viewSingleGrievances")
.post(verifyEmployeeJWT , viewSingleGrievance)

employeeRouter.route("/viewAllGrievancesByDOSA")
.post(verifyEmployeeJWT , viewAllGrievancesByDOSA)


module.exports = { employeeRouter }