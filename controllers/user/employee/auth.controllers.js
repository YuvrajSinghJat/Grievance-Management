const mongoose = require("mongoose");
const { Employee } = require("../../../modals/user/employee.modal.js");
const { asyncHandler } = require("../../../utility/asyncHandler.js");
const { ApiResponse } = require("../../../utility/ApiResponse.js");
const { ApiError } = require("../../../utility/ApiError.js");
const jwt = require("jsonwebtoken");
const options = {
    httpOnly : true,
    secure : true
}


// const employeeSignup = asyncHandler( async (req,res) =>{
//     let enrollmentNo = req.body.enrollmentNo;
//     let scholarNo = req.body.scholarNo;
//     let name = req.body.name;
//     let mobileNo = req.body.mobileNo;
//     let email = req.body.email;
//     let department = req.body.department;
//     let faculty = req.body.faculty;
//     let program = req.body.program;
//     let password = req.body.password;

    
//     if(!enrollmentNo)
//     {
//         throw new ApiError(404,"Enrollment Number not found")
//     }
//     if(!name)
//     {
//         throw new ApiError(404,"Name not found")
//     }
//     if(!email)
//     {
//         throw new ApiError(404,"Email not found")
//     }

//     let findingEmail = await Student.findOne({email : email})
//     if(findingEmail)
//     {
//         throw new ApiError(404,"Email id already exist")
//     }
//     if(!password)
//     {
//         throw new ApiError(404,"Password not received")
//     }
    
//     const studentSignUp = await Student.create({
//         enrollmentNo : enrollmentNo,
//         email : email,
//         studentName : name,
//         password : password
//     })

//     if(!studentSignUp)
//     {
//         throw new ApiError(404,"WE COULD NOT CREATE USER")
//     }

//     const studentDetailsVerification = await Student.findById(studentSignUp._id).select("-password");

//     if(!studentDetailsVerification)
//     {
//         throw new ApiError(404,"USER  NOT CREATED AND FETCHED")
//     }
    
//     return res.status(200).json(
//         new ApiResponse(200,studentDetailsVerification,"USER SUCCESSFULLY CREATED")
//     )

// }
// )


const employeeSignin = asyncHandler( async (req,res) =>{
    let email = req.body.email;
    let password=req.body.password;

    const findEmployeeToLogin = await Employee.findOne({
        email:email,
        password: password
    }).select("-password")
    if(!findEmployeeToLogin){
        throw new ApiError(404,"Employee not found!")
    }
    const {accessToken, refreshToken} = await createAccessandRefreshToken(findEmployeeToLogin._id)
    const findLoggedEmployee= await Employee.findById(findEmployeeToLogin._id).select("-password -refreshToken")

    if(!findLoggedEmployee){
        throw new ApiError(404,"Employee not forund after generation of token")
    }
    return res.status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(
        new ApiResponse(200,findLoggedEmployee,"User fetched successfully with login")
    )
})

const employeeLogout = asyncHandler ( async (req,res)=>{
    console.log(req.verificationOfUser._id)
    await Employee.findByIdAndUpdate(
        req.verificationOfUser._id,
        {
            $set : {
                refreshToken : undefined
            }
        },
        {
            new : true
        }
    )
    return res
    .status(200)
    .clearCookie(accessToken,options)
    .clearCookie(refreshToken,options)
    .send(200,{},"Employee logged out successfully")
})


module.exports = {
    employeeSignin,
    employeeLogout
}