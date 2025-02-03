const {Admin} = require("../../modals/admin/admin.modals.js");
const {Employee} = require("../../modals/user/employee.modal.js");
const {ApiResponse} = require("../../utility/ApiResponse.js");
const {ApiError} = require("../../utility/ApiError.js");
const {asyncHandler} = require("../../utility/asyncHandler.js");
const mongoose = require("mongoose");

const options = {
    httpOnly : true,
    secure : true
}

//createAdmin controller
const createAdmin = asyncHandler(async (req,res,next) =>{
    const {
        adminId,
        adminName,
        adminDesignation,
        adminDepartment,
        adminFaculty,
        adminMobileNo,
        adminEmail,
        adminPassword
    } = req.body;

    const existingAdmin= await Admin.findOne({$or:[{adminEmail},{adminId}]});
    if(existingAdmin){
        return next(new ApiError(400,"Admin already exists!"));
    }
    const newAdmin= new Admin({
        adminId,
        adminName,
        adminDesignation,
        adminDepartment,
        adminFaculty,
        adminMobileNo,
        adminEmail,
        adminPassword
    })
    await newAdmin.save();

    const response=new ApiResponse(201, newAdmin,"Admin created successfully!");
    return res.status(201).json(response);
})

//createEmployee controller
const createEmployee= asyncHandler(async(req, res, next)=>{
    const {
        empId,
        empName,
        Designation,
        Department,
        Faculty,
        MobileNo,
        Email,
        Password
    }=req.body;

    const existingEmp= await Employee.findOne({$or:[{Email},{empId}]});
    if(existingEmp){
        return next(new ApiError(400,"Employee already exists!"));
    }

    const newEmp= new Employee({
        empId,
        empName,
        Designation,
        Department,
        Faculty,
        MobileNo,
        Email,
        Password
    })
    await newEmp.save();

    const response=new ApiResponse(201, newEmp, "Employee created successfully");
    return res.status(201).json(response);
})

module.exports = {
    createAdmin,
    createEmployee,
    
}