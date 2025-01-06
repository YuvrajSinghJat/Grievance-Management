const express = require("express")
const { signup, signin } = require("../../controllers/user/auth.controllers.js")
const userRouter = express.Router()

userRouter.route("/signup").post(signup)

userRouter.route("/signin").post(signin)





module.exports = {userRouter}