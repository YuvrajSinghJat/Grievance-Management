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
    console.log(req.body)
    const existingAdmin= await Admin.findOne({adminEmail});

    if(existingAdmin){
        throw new ApiError(400,"Admin already exists!");
    }
    console.log(existingAdmin)
    const newAdmin= await Admin.create({
        adminId : adminId,
        adminName: adminName,
        adminDesignation : adminDesignation,
        adminDepartment: adminDepartment,
        adminFaculty: adminFaculty,
        adminMobileNo : adminMobileNo,
        adminEmail: adminEmail,
        adminPassword : adminPassword
    })
    console.log(newAdmin)

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