const express = require("express");
const router = express.Router();
const { viewForwardedReports } = require("../../../controllers/user/vc/report.controller");
const viewController = require('../../../controllers/user/vc/view.controllers')

// VC route to view forwarded grievances
router.get("/reports", viewForwardedReports);

router.post("/viewGrievances", viewController.viewAllGrievances);
router.post("/viewSingleGrievances", viewController.viewSingleGrievances);

module.exports = router;
