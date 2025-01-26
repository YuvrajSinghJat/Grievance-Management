const { Grievance } = require("../../../modals/user/grievance.modals.js");
const { ApiError } = require("../../../utility/ApiError.js");
const { ApiResponse } = require("../../../utility/ApiResponse.js")
const { asyncHandler } = require("../../../utility/asyncHandler.js")

const options = {
    httpOnly: true,
    secure: true
}

const fileGreviances = asyncHandler( async(req,res,next) =>{

})

const viewSingleGreviances = asyncHandler(async(req,res,next)=>{

})

const viewAllGrievances = asyncHandler( async(req, res, next)=>{
    const grievances = await Grievance.find({});
    if(!grievances){
        throw new ApiError(404,"No Grievances found!")
    }

    res
    .status(200)
    .json(new ApiResponse(200, grievances, "Grievances retrieved successfully!"))
});





module.exports = { 
    fileGreviances,
    viewSingleGreviances,
    viewAllGrievances,
 }