const jwt = require("jsonwebtoken")
const { asyncHandler } = require("../utility/asyncHandler.js")
const { ApiError } = require("../utility/ApiError.js")

const { Admin } = require("../modals/admin/admin.modals.js")
const { Student } = require("../modals/user/student.modal.js")
const { Employee } = require("../modals/user/employee.modal.js")
//const cookie = require("cookie-parser")

const verifyStudentJWT = asyncHandler ( async (req,res,next)=>{
    console.log(req.cookies)
    const accessToken = req.cookies.accessToken 
    const refreshToken = req.cookies.refreshToken

    if(!accessToken)
    {
        throw new ApiError(401,"Token is not verified")
    }

    const tokenDecoding = jwt.verify(accessToken,process.env.ACCESS_TOKEN_SECRETKEY)

    const verificationOfUser = await Student.findById(tokenDecoding._id).select("-password -refreshToken" )

    if(!verificationOfUser)
    {
        throw new ApiError(401,"Token is not verified and user is not found")
    }

    req.verificationOfUser = verificationOfUser;
    next()

})

const verifyEmployeeJWT = asyncHandler ( async (req,res,next)=>{
    const accessToken = req.cookie.accessToken 
    const refreshToken = req.cookie.refreshToken

    if(!accessToken)
    {
        throw new ApiError(401,"Token is not verified")
    }

    const tokenDecoding = jwt.verify(accessToken,process.env.ACCESS_TOKEN_SECRETKEY)

    const verificationOfUser = await Employee.findById(tokenDecoding._id).select("-password -refreshToken" )

    if(!verificationOfUser)
    {
        throw new ApiError(401,"Token is not verified and user is not found")
    }

    req.verificationOfUser = verificationOfUser;
    next()

})

const verifyAdminJWT = asyncHandler ( async (req,res,next)=>{
    const accessToken = req.cookie.accessToken 
    const refreshToken = req.cookie.refreshToken

    if(!accessToken)
    {
        throw new ApiError(401,"Token is not verified")
    }

    const tokenDecoding = jwt.verify(accessToken,process.env.ACCESS_TOKEN_SECRETKEY)

    const verificationOfUser = await Admin.findById(tokenDecoding._id).select("-password -refreshToken" )

    if(!verificationOfUser)
    {
        throw new ApiError(401,"Token is not verified and user is not found")
    }

    req.verificationOfUser = verificationOfUser;
    next()

})


module.exports = { 
    verifyStudentJWT,
    verifyEmployeeJWT,
    verifyAdminJWT
 }