const {Admin} = require("../../modals/admin/admin.modals.js");
const {Employee} = require("../../modals/user/employee.modal.js");
const {Grievance} = require("../../modals/user/grievance.modals.js");
const {Student} = require("../../modals/user/student.modal.js");
const {ApiResponse} = require("../../utility/ApiResponse.js");
const {ApiError} = require("../../utility/ApiError.js");
const {asyncHandler} = require("../../utility/asyncHandler.js");

const options = {
    httpOnly: true,
    secure: true
};

//view controller for admin(Head)
const viewController = {
    //fetching all admins
    viewAllAdmins: asyncHandler(async(req, res, next)=>{
        const admins =  await Admin.find({});
        if(!admins){
            throw new ApiError(404, "No Admins found!")
        };
        res.status(200).json(new ApiResponse(200, admins, "Admins retrieved successfully"));
    }),

    //fetching all employees
    viewAllEmployees: asyncHandler(async(req, res, next)=>{
        const employees = await Employee.find({});
        if(!employees){
            throw new ApiError(404, "No employees found")
        };
        res.status(200).json(new ApiResponse(200, employees, "Employees retrieved successfully"));
    }),

    //fetching all students
    viewAllStudents: asyncHandler(async(req, res, next)=>{
        const students = await Student.find({});
        if(!students){
            throw new ApiError(404, "No students found")
        }
        res.status(200).json(new ApiResponse(200, students, "Students retrieved successfully"));
    }),

    //fetching all grievances
    viewAllGrievances: asyncHandler(async(req, res, next)=>{
        const grievances = await Grievance.find({});
        if(!grievances){
            throw new ApiError(200, "No Grievances found")
        }
        res.status(200).json(new ApiResponse(404, grievances, "Grievances retrieved successfully"));
    })
}