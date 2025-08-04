const OTP = require("../../modals/user/otp.model");
const Student = require("../../modals/user/student.modal");
const { Employee } = require("../../modals/user/employee.modal");
const { Admin } = require("../../modals/admin/admin.modals");
const nodemailer = require("nodemailer");
const {asyncHandler} = require("../../utility/asyncHandler");

// Check if the user exists in Student, Employee, or Admin collection
const isRegisteredUser = async (email) => {
  const student = await Student.findOne({ email });
  const employee = await Employee.findOne({ Email: email }); 
  const admin = await Admin.findOne({ adminEmail: email });

  return student || employee || admin;
};

// Send OTP to registered user
// exports.sendOtp = async (req, res) => {
//   const { email } = req.body;

//   if (!email) {
//     return res.status(400).json({ success: false, message: "Email is required" });
//   }

//   try {
//     const user = await isRegisteredUser(email);
//     if (!user) {
//       console.log(`OTP Request Denied → Email not registered: ${email}`);
//       return res.status(404).json({ success: false, message: "Email not registered in the system" });
//     }

//     const otp = Math.floor(100000 + Math.random() * 900000);
//     await OTP.create({ email, otp });
  

//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     await transporter.sendMail({
//       from: `"Support Team" <${process.env.EMAIL_USER}>`,
//       to: email,
//       subject: "Your OTP for password reset",
//       text: `Your OTP is ${otp}. Please do not share it with anyone.`,
//     });

//     console.log(`OTP sent successfully to: ${email}`);
//     res.json({ success: true, message: "OTP sent to email" });
//   } catch (err) {
//     console.error("Error while sending OTP:", err);
//     res.status(500).json({ success: false, message: "Failed to send OTP. Please try again." });
//   }
// };

  exports.sendOtp = asyncHandler(async (req, res) => {
    try {
      const { email } = req.body;

      const user = await Student.findOne({ email });

      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }

      // Dummy OTP logic (replace with your own)
      const otp = Math.floor(100000 + Math.random() * 900000);
      console.log(`OTP for ${email}: ${otp}`);

      // TODO: send OTP via email service

      return res.status(200).json({ success: true, message: "OTP sent", otp });
    } catch (error) {
      console.error("Error while sending OTP:", error);
      return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  });

// Verify OTP from user
exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ success: false, message: "Email and OTP are required" });
  }

  try {
    const validOtp = await OTP.findOne({ email, otp });

    if (!validOtp) {
      return res.status(400).json({ success: false, message: "Invalid or expired OTP" });
    }

    res.json({ success: true, message: "OTP verified successfully" });
  } catch (err) {
    console.error("OTP verification error:", err);
    res.status(500).json({ success: false, message: "OTP verification failed" });
  }
};

// Reset password for a valid user
exports.resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  if (!email || !newPassword) {
    return res.status(400).json({ success: false, message: "Email and new password are required" });
  }

  try {
    const student = await Student.findOneAndUpdate(
      { email },
      { password: newPassword },
      { new: true }
    );

    const employee = await Employee.findOneAndUpdate(
      { Email: email },
      { Password: newPassword },
      { new: true }
    );

    const admin = await Admin.findOneAndUpdate(
      { adminEmail: email },
      { adminPassword: newPassword },
      { new: true }
    );

    if (!student && !employee && !admin) {
      console.log(`Password Reset Failed → User not found: ${email}`);
      return res.status(404).json({ success: false, message: "User not found in the system" });
    }

    await OTP.deleteMany({ email });

    console.log(`Password reset successful for: ${email}`);
    res.json({ success: true, message: "Password reset successfully" });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
