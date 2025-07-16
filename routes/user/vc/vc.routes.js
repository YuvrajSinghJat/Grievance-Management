const express = require("express");
const router = express.Router();
const { viewForwardedReports } = require("../../../controllers/user/vc/report.controller");

// VC route to view forwarded grievances
router.get("/reports", viewForwardedReports);

module.exports = router;
