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
    
})

const employeeLogout = asyncHandler ( async (req,res)=>{
    
})


module.exports = {
    employeeSignin,
    employeeLogout
}