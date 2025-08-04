// const express = require("express");
// const {
//   employeeSignin,
//   employeeLogout
// } = require("../../../controllers/user/employee/auth.controllers");

// const {
//   viewAllGrievancesByDOSA,
//   viewSingleGrievance,
//   viewAllGrievancesByVC,
//   actionByDOSA,
//   actionByVC,
//   viewAllGrievancesByEmployee 
// } = require("../../../controllers/user/employee/grevianceHandlers.controllers");

// const { verifyEmployeeJWT } = require("../../../middlewares/auth.middleware");

// const employeeRouter = express.Router();

// // Public Route
// employeeRouter.post("/signin", employeeSignin);

// // Protected Routes
// employeeRouter.post("/logout", verifyEmployeeJWT, employeeLogout);


// employeeRouter.post("/viewSingleGrievances", verifyEmployeeJWT, viewSingleGrievance);
// employeeRouter.post("/viewAllGrievancesByDOSA", verifyEmployeeJWT, viewAllGrievancesByDOSA);
// employeeRouter.post("/actionByDOSA", verifyEmployeeJWT, actionByDOSA);
// employeeRouter.post("/viewAllGrievancesByVC", verifyEmployeeJWT, viewAllGrievancesByVC);
// employeeRouter.post("/actionByVC", verifyEmployeeJWT, actionByVC);

// //View all grievances for Employee (used in employee grievance dashboard)
// employeeRouter.get("/viewallgrievances", verifyEmployeeJWT, viewAllGrievancesByEmployee);

// module.exports = employeeRouter;


// routes/user/employee/employee.routes.js
const express = require("express");

const upload = require("../../../middlewares/multer.middleware");

const {
  employeeSignin,
  employeeLogout,
} = require("../../../controllers/user/employee/auth.controllers");

const {
  viewAllGrievancesByDOSA,
  viewSingleGrievance,
  viewAllGrievancesByVC,
  actionByDOSA,
  actionByVC,
  viewAllGrievancesByEmployee,
  actionByChairman,
  getSingleCommittees,
} = require("../../../controllers/user/employee/grevianceHandlers.controllers");

const { verifyEmployeeJWT } = require("../../../middlewares/auth.middleware");

//create report
const { createReport } = require("../../../controllers/user/employee/report.controller");

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

// View all grievances for Employee (used in employee grievance dashboard)
employeeRouter.get("/viewgrievance", verifyEmployeeJWT, viewAllGrievancesByEmployee);

employeeRouter.get("/getSingleCommittees", verifyEmployeeJWT, getSingleCommittees);

//create report route
employeeRouter.post("/createReport",verifyEmployeeJWT, upload.single("file"), createReport);

// Chairman's final action
// employeeRouter.post("/actionByChairman", verifyEmployeeJWT, actionByChairman);

module.exports = employeeRouter;
