const express = require("express");
const { employeeSignin, employeeLogout } = require("../../../controllers/user/employee/auth.controllers");
const { verifyEmployeeJWT } = require("../../../middlewares/auth.middleware");

const employeeRouter = express.Router();

employeeRouter.route("/signin")
.post(employeeSignin)

employeeRouter.route("/logout")
.post(verifyEmployeeJWT , employeeLogout)


module.exports = { employeeRouter }