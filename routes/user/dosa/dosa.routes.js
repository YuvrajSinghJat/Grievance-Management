const express = require("express");
const router = express.Router();
const {
  getAllGrievancesForDosa,
  viewSingleGreviances,
  getAllCommittees,
  forwardToVC,
  rejectGrievance,
  getAllPendingGrievances,
} = require("../../../controllers/user/dosa/grievance.controller");

const {
  createEmployeeByDosa,
  DosaViewAllEmployees,
} = require("../../../controllers/user/dosa/employee.controller"); // ✅ Create this controller

const {
  createReport,
  viewgrievanceReport,
}= require('../../../controllers/user/dosa/report.controller');

const{ getFacultyList } = require('../../../controllers/user/dosa/view.contoller');

const upload = require("../../../middlewares/multer.middleware");

// Existing route
router.get("/all-grievances", getAllGrievancesForDosa);
router.post("/viewSingleGrievances", viewSingleGreviances);

// ✅ Add this route
router.post("/CreateEmployee", createEmployeeByDosa);
router.post("/viewAllEmployees", DosaViewAllEmployees);
router.post("/forward-to-vc", forwardToVC);

//New report route
router.post("/CreateReport",upload.single("file"), createReport);
router.get("/viewreport/:grievanceId", viewgrievanceReport);

router.get('/grievances',getAllPendingGrievances);
router.get('/faculties',getFacultyList);

//to handle rejection

router.post("/reject-grievance", rejectGrievance);

router.get("/getAllCommittees",getAllCommittees);

module.exports = router;
