const express = require("express");
const { employeeSignin, employeeLogout } = require("../../../controllers/user/employee/auth.controllers");
const { verifyEmployeeJWT } = require("../../../middlewares/auth.middleware");
const {
  viewAllGrievancesByDOSA,
  viewSingleGrievance,
  viewAllGrievancesByVC,
  actionByDOSA,
  actionByVC
} = require("../../../controllers/user/employee/grevianceHandlers.controllers");

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

module.exports = employeeRouter;
