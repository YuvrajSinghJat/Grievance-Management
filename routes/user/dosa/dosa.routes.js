const express = require("express");
const router = express.Router();
const {
  getAllGrievancesForDosa,
} = require("../../../controllers/user/dosa/grievance.controller");

const {
  createEmployeeByDosa,
  DosaViewAllEmployees,
} = require("../../../controllers/user/dosa/employee.controller"); // ✅ Create this controller

// Existing route
router.get("/all-grievances", getAllGrievancesForDosa);

// ✅ Add this route
router.post("/CreateEmployee", createEmployeeByDosa);
router.post("/viewAllEmployees", DosaViewAllEmployees); 

module.exports = router;
