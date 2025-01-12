const express = require("express")
const { signup, signin, logout } = require("../../../controllers/user/student/auth.controllers.js")
const { verifyStudentJWT } = require("../../../middlewares/auth.middleware.js")
const studentRouter = express.Router()

studentRouter.route("/signup")
.post(signup)

studentRouter.route("/signin")
.post(signin)

studentRouter.route("/logout")
.post(verifyStudentJWT , logout)

// userRouter.route("/employee/signup")
// .post(signup)

// userRouter.route("/employee/signin")
// .post(signin)

// userRouter.route("/employee/logout")
// .post(verifyJWT ,logout)

module.exports = { studentRouter }