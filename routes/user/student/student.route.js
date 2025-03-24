const express = require("express")
const { signup, signin, logout } = require("../../../controllers/user/student/auth.controllers.js")
const { verifyStudentJWT } = require("../../../middlewares/auth.middleware.js")
const { fileGreviances, viewAllGrievances, viewSingleGreviances } = require("../../../controllers/user/student/greviance.controllers.js")
const studentRouter = express.Router()

studentRouter.route("/signup")
.post(signup)

studentRouter.route("/signin") //working fine
.post(signin)

studentRouter.route("/logout") //working fine
.get(verifyStudentJWT , logout)

studentRouter.route("/fileGreviances") //working fine
.post(verifyStudentJWT ,fileGreviances)

studentRouter.route("/viewallgreviances")
.post(verifyStudentJWT ,viewAllGrievances)

studentRouter.route("/viewsinglegreviance")
.post(verifyStudentJWT ,viewSingleGreviances)

// userRouter.route("/employee/signup")
// .post(signup)

// userRouter.route("/employee/signin")
// .post(signin)

// userRouter.route("/employee/logout")
// .post(verifyJWT ,logout)

module.exports = { studentRouter }