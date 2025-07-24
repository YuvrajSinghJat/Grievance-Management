const jwt = require("jsonwebtoken");

// ✅ Import models
const Student = require("../../modals/user/student.modal");
const { Employee } = require("../../modals/user/employee.modal");
const Admin = require("../../modals/admin/admin.modals");
const { RoleUser } = require("../../modals/user/roleUser.modal.js");

const { ApiResponse } = require("../../utility/ApiResponse");
const { ApiError } = require("../../utility/ApiError");
const { asyncHandler } = require("../../utility/asyncHandler");

// ✅ Token Generator
const generateToken = (userId, role) => {
  return jwt.sign({ userId, role }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

// ✅ Unified Login Controller (No bcrypt)
const commonLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  let user;

  // 🔹 Student Login
  user = await Student.findOne({ email });
  if (user && password === user.password) {
    const role = "student";
    const token = generateToken(user._id, role);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
    });

    return res.status(200).json(
      new ApiResponse(
        200,
        {
          data: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role,
          },
          token,
        },
        "Student login successful"
      )
    );
  }

  // 🔹 RoleUser Login (VC, DOSA, Registrar)
  user = await RoleUser.findOne({ email });
  if (user && password === user.password) {
    const role = user.role.toLowerCase();
    const token = generateToken(user._id, role);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
    });

    return res.status(200).json(
      new ApiResponse(
        200,
        {
          data: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role,
          },
          token,
        },
        `${role.toUpperCase()} login successful`
      )
    );
  }

  // 🔹 Employee Login
  user = await Employee.findOne({ Email: email, Password: password });
  if (user) {
    const role = "employee";
    const token = generateToken(user._id, role);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
    });

    return res.status(200).json(
      new ApiResponse(
        200,
        {
          data: {
            _id: user._id,
            name: user.Name,
            email: user.Email,
            role,
          },
          token,
        },
        "Employee login successful"
      )
    );
  }

  // 🔹 Admin Login
  user = await Admin.findOne({ adminEmail: email, adminPassword: password });
  if (user) {
    const role = "admin";
    const token = generateToken(user._id, role);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
    });

    return res.status(200).json(
      new ApiResponse(
        200,
        {
          data: {
            _id: user._id,
            name: user.adminName,
            email: user.adminEmail,
            role,
          },
          token,
        },
        "Admin login successful"
      )
    );
  }

  // ❌ User not found
  throw new ApiError(404, "Invalid credentials or user not found");
});

module.exports = { commonLogin };
