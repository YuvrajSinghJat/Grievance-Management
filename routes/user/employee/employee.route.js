const express = require("express");
const {
  employeeSignin,
  employeeLogout
} = require("../../../controllers/user/employee/auth.controllers");

const {
  viewAllGrievancesByDOSA,
  viewSingleGrievance,
  viewAllGrievancesByVC,
  actionByDOSA,
  actionByVC,
  viewAllGrievancesByEmployee 
} = require("../../../controllers/user/employee/grevianceHandlers.controllers");

const { verifyEmployeeJWT } = require("../../../middlewares/auth.middleware");

const employeeRouter = express.Router();

// Public Route
employeeRouter.post("/signin", employeeSignin);

// Protected Routes
employeeRouter.post("/logout", verifyEmployeeJWT, employeeLogout);

employeeRouter.post("/viewSingleGrievances", verifyEmployeeJWT, viewSingleGrievance);
employeeRouter.post("/viewAllGrievancesByDOSA", verifyEmployeeJWT, viewAllGrievancesByDOSA);
employeeRouter.post("/actionByDOSA", verifyEmployeeJWT, actionByDOSA);
employeeRouter.post("/viewAllGrievancesByVC", verifyEmployeeJWT, viewAllGrievancesByVC);
employeeRouter.post("/actionByVC", verifyEmployeeJWT, actionByVC);

//View all grievances for Employee (used in employee grievance dashboard)
employeeRouter.get("/viewallgrievances", verifyEmployeeJWT, viewAllGrievancesByEmployee);

module.exports = employeeRouter;
