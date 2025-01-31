const { Grievance } = require("../../../modals/user/grievance.modals.js");
const { ApiError } = require("../../../utility/ApiError.js");
const { ApiResponse } = require("../../../utility/ApiResponse.js")
const { asyncHandler } = require("../../../utility/asyncHandler.js")

const options = {
    httpOnly: true,
    secure: true
}

const fileGreviances = asyncHandler( async(req,res,next) =>{
    const grievanceType = req.body.grievanceType;
    const title = req.body.title;
    const description = req.body.description;

    if(!grievanceType)
    {
        throw new ApiError(404,"Grievance Type not found")
    }
    if(!title)
    {
        throw new ApiError(404,"Grievance Title not found")
    }
    if(!description)
    {
        throw new ApiError(404,"Grievance Description not found")
    }
    
    const studentId = await req.verificationOfUser._id;

    const fileGreviances = await Grievance.create({
        studentId : studentId,
        grievanceType : grievanceType,
        grievanceTitle : title,
        grievanceDescription : description
    })

    if(!fileGreviances)
    {
        throw new ApiError(404,"Grievance donot file please try again")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200,fileGreviances,"Grievance successfully filled")
    )

})

const viewSingleGreviances = asyncHandler(async(req,res,next)=>{
    const studentId = req.verificationOfUser._id;
    const grievanceId = req.body.grievanceId;

    const findSingleGrievance = await Grievance.find({
        _id : grievanceId,
        studentId : studentId
    })

    if(!findSingleGrievance){
        throw new ApiError(404,"No Grievances found!")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, findSingleGrievance, "Grievance retrieved successfully!")
    )

})

const viewAllGrievances = asyncHandler( async(req, res, next)=>{
    const studentId = req.verificationOfUser._id;
    const grievances = await Grievance.find(
        {
            studentId : studentId
        }
    ).select("-grievanceDescription -proof -actionByDosa -actionByVC -committeeMembers -actionByCommittee -vcSatisfactory -meetingWithChairperson -actionOnReportByVC")

    if(!grievances){
        throw new ApiError(404,"No Grievances found!")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, grievances, "Grievances retrieved successfully!")
    )
});





module.exports = { 
    fileGreviances,
    viewSingleGreviances,
    viewAllGrievances,
 }