const mongoose = require("mongoose");
const { Employee } = require("../../../modals/user/employee.modal.js");
const { asyncHandler } = require("../../../utility/asyncHandler.js");
const { ApiResponse } = require("../../../utility/ApiResponse.js");
const { ApiError } = require("../../../utility/ApiError.js");
const jwt = require("jsonwebtoken");

const options = {
    httpOnly: true,
    secure: true
};

const createAccessAndRefreshToken = async function (_id) {
    let user = await Employee.findById(_id);
    let accessToken = await user.generateAccessToken();
    let refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
};

const employeeSignin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const findEmployee = await Employee.findOne({
        Email: email,
        Password: password
    }).select("-Password");

    if (!findEmployee) {
        throw new ApiError(404, "Employee not found!");
    }

    const { accessToken, refreshToken } = await createAccessAndRefreshToken(findEmployee._id);

    // Add role to the user object manually
    const userWithRole = {
        ...findEmployee._doc,
        role: "employee"
    };

    return res.status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(new ApiResponse(200, userWithRole, "Employee login successful"));
});

const employeeLogout = asyncHandler(async (req, res) => {
    await Employee.findByIdAndUpdate(
        req.verificationOfUser._id,
        { $unset: { refreshToken: "" } },
        { new: true }
    );

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "Employee logged out successfully"));
});

module.exports = {
    employeeSignin,
    employeeLogout
};