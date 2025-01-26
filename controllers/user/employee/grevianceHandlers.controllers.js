const mongoose = require("mongoose")
const { asyncHandler } = require("../../../utility/asyncHandler.js")


const viewAllGrievancesByDOSA = asyncHandler( async(req,res,next)={

})

const viewAllGrievancesByVC = asyncHandler( async(req,res,next)=>{

})

const viewAllGrievancesByEmployee = asyncHandler(async(req,res,next)=>{

})

const actionByDOSA = asyncHandler(async(req,res,next)=>{
    
})

const actionByVC = asyncHandler(async(req,res,next)=>{
    
})

const actionByChairman = asyncHandler(async(req,res,next)=>{
    
})


module.exports = {
    viewAllGrievancesByDOSA,
    viewAllGrievancesByVC,
    viewAllGrievancesByEmployee,
    actionByDOSA,
    actionByVC,
    actionByChairman
}