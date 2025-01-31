const mongoose = require("mongoose");
const { Employee } = require("../../../modals/user/employee.modal.js");
const { Student } = require("../../../modals/user/student.modal.js");
const { asyncHandler } = require("../../../utility/asyncHandler.js");
const { ApiResponse } = require("../../../utility/ApiResponse.js");
const { ApiError } = require("../../../utility/ApiError.js");
const jwt = require("jsonwebtoken");
const options = {
    httpOnly : true,
    secure : true
}


const createAccessAndRefeshToken = async function(_id){
        let user = await Student.findById(_id);
        //console.log(user)
        // let accessToken =  "one"
        // let refreshToken = "two"
        let accessToken = await user.generateAccessToken();
        let refreshToken = await user.generateRefreshToken();
    
        user.refreshToken = refreshToken ;
        await user.save({validateBeforeSave : false});
        console.log(refreshToken)
        console.log(accessToken)
        return { accessToken,refreshToken }
}

const signup = asyncHandler( async (req,res) =>{
    let enrollmentNo = req.body.enrollmentNo;
    let scholarNo = req.body.scholarNo;
    let name = req.body.name;
    let mobileNo = req.body.mobileNo;
    let email = req.body.email;
    let department = req.body.department;
    let faculty = req.body.faculty;
    let program = req.body.program;
    let password = req.body.password;
    // console.log(enrollmentNo)
    // console.log(name)
    // console.log(email)
    // console.log(password)
    if(!enrollmentNo)
    {
        throw new ApiError(404,"Enrollment Number not found")
    }
    if(!name)
    {
        throw new ApiError(404,"Name not found")
    }
    if(!email)
    {
        throw new ApiError(404,"Email not found")
    }

    let findingEmail = await Student.findOne({email : email})
    if(findingEmail)
    {
        throw new ApiError(404,"Email id already exist")
    }
    if(!password)
    {
        throw new ApiError(404,"Password not received")
    }
    
    const studentSignUp = await Student.create({
        studentEnrollmentNo : enrollmentNo,
        email : email,
        studentName : name,
        password : password
    })

    if(!studentSignUp)
    {
        throw new ApiError(404,"WE COULD NOT CREATE USER")
    }

    const studentDetailsVerification = await Student.findById(studentSignUp._id).select("-password");

    if(!studentDetailsVerification)
    {
        throw new ApiError(404,"USER  NOT CREATED AND FETCHED")
    }
    
    return res.status(200).json(
        new ApiResponse(200,studentDetailsVerification,"USER SUCCESSFULLY CREATED")
    )

}
)


const signin = asyncHandler( async (req,res) =>{
    let email = req.body.email;
    let password = req.body.password;

    const findStudentToLogin = await Student.findOne({
        email : email,
        password : password
    }).select("-password")

    if(!findStudentToLogin)
    {
        throw new ApiError(404,"User not found!")
    }
    console.log(findStudentToLogin)
    const {accessToken,refreshToken} = await createAccessAndRefeshToken(findStudentToLogin._id)

    const findLoggedUser = await Student.findById(findStudentToLogin._id).select("-password -refreshToken")

    if(!findLoggedUser)
    {
        throw new ApiError(404,"User not found! after generating tokens")
    }

    return res
    .status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(
        new ApiResponse(200,findLoggedUser,"User fetch successfully wiyh login")
    )
})

const logout = asyncHandler( async (req,res,next)=>{
    console.log(req.verificationOfUser._id)
    await Student.findByIdAndUpdate(
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
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .send(200,{},"User logout properly")
})

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
    signin,
    signup,
    logout
}
