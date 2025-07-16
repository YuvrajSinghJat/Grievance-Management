const express = require("express");
const router = express.Router();
const { getAllGrievancesForDosa } = require("../../../controllers/user/dosa/grievance.controller");

// Example route
router.get("/all-grievances", getAllGrievancesForDosa);

module.exports = router;
