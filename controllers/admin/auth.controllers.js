const { asyncHandler } = require("../../utility/asyncHandler.js");
const { Admin } = require("../../modals/admin/admin.modals.js")

const options = {
    httpOnly : true,
    secure : true
}

const adminSignin = asyncHandler(async ( req,res )=>{
    
} )


const adminLogout = asyncHandler( async(req,res)=>{

})


module.exports = {
    adminSignin,
    adminLogout
}