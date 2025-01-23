const {Grievance} = require("../../../modals/user/grievance.modals");
const {ApiError} = require("../../../utility/ApiError");
const {ApiResponse} = require("../../../utility/ApiResponse")
const {asyncHandler} = require("../../../utility/asyncHandler")

const options = {
    httpOnly: true,
    secure: true
}

const viewAllGrievances = asyncHandler(async(req, res, next)=>{
    const grievances = await Grievance.find({});
    if(!grievances){
        throw new ApiError(404,"No Grievances found!")
    }
    res.status(200).send(new ApiResponse(200, grievances, "Grievances retrieved successfully!"))
});