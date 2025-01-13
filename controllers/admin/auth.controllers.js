const { asyncHandler } = require("../../utility/asyncHandler.js");
const { Admin } = require("../../modals/admin/admin.modals.js")

const options = {
    httpOnly : true,
    secure : true
}

const adminSignin = asyncHandler(async ( req,res )=>{
    let email = req.body.email;
    let password = req.body.password;

    const adminToLogin= await Admin.findOne({
        email: email,
        password: password
    }).select("-password")
    if(!adminToLogin){
        throw new ApiError(404,"Admin not found!")
    }

    const {accessToken,refreshToken}= await createAccessAndRefreshToken(findAdminToLogin._id)
    const findLoggedAdmin = Admin.findId(findAdminToLogin._id).select("-password -refreshToken")
    if(!findLoggedAdmin){
        throw new ApiError(404,"Admin not forund after token generation")
    } 
    return res
    .status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken.options)
    .json(
        new ApiResponse(200,findLoggedAdmin,"Admin logged in successfully")
    )
} )


const adminLogout = asyncHandler( async(req,res)=>{
    console.log(req.verificationOfAdmin._id)
    await Admin.findByIdAndUpdate(
        req.verificationOfAdmin._id,
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