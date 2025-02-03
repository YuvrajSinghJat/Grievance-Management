const { asyncHandler } = require("../../utility/asyncHandler.js");
const { Admin } = require("../../modals/admin/admin.modals.js");
const { ApiError } = require("../../utility/ApiError.js");

const options = {
    httpOnly : true,
    secure : true
}

const createAccessAndRefeshToken = async function(_id){
    let user = await Admin.findById(_id);
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

const adminSignin = asyncHandler(async ( req,res )=>{
    let email = req.body.email;
    let password = req.body.password;

    const adminToLogin = await Admin.findOne({
        email: email,
        password: password
    }).select("-password")
    if(!adminToLogin){
        throw new ApiError(404,"Admin not found!")
    }

    const {accessToken,refreshToken} = await createAccessAndRefreshToken(adminToLogin._id)

    const findLoggedAdmin = await Admin.findById(adminToLogin._id).select("-password -refreshToken")
    if(!findLoggedAdmin){
        throw new ApiError(404,"Admin not forund after token generation")
    } 
    return res
    .status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(
        new ApiResponse(200,findLoggedAdmin,"Admin logged in successfully")
    )
} )


const adminLogout = asyncHandler( async(req,res)=>{
    console.log(req.verificationOfUser._id)
    await Admin.findByIdAndUpdate(
        req.verificationOfUser._id,
        {
            $set:{
                refreshToken: undefined
            },
        },{
            new: true
        }
    )
    return res
    .status(200)
    .clearCookie(accessToken,options)
    .clearCookie(refreshToken,options)
    .send(200,{},"User logout properly")
})

module.exports = {
    adminSignin,
    adminLogout
}