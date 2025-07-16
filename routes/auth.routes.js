const express = require("express");
const router = express.Router();

// Auth Controllers
const { commonLogin } = require("../controllers/common/auth.controllers");

// Forgot Password Controllers
const {
  sendOtp,
  verifyOtp,
  resetPassword,
} = require("../controllers/common/forgotPassword.controller");



//  Universal login route
router.post("/signin", commonLogin);


//  Send OTP to email
router.post("/send-otp", sendOtp);

//  Verify received OTP
router.post("/verify-otp", verifyOtp);

//  Reset password
router.post("/reset-password", resetPassword);



module.exports = router;
