const express = require("express")
const { adminSignin, adminLogout } = require("../../controllers/admin/auth.controllers.js")
const { verifyAdminJWT } = require("../../middlewares/auth.middleware.js")

const adminRouter = express.Router()

adminRouter.route("/signin")
.post(adminSignin)

adminRouter.route("/logout")
.post(verifyAdminJWT , adminLogout)



module.exports = { adminRouter }