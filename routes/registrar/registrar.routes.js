const express = require('express');
const router = express.Router();

// Correct relative path
const registrarController = require('../../controllers/user/registrar/registrar.controllers.js');

// View forwarded reports from Dosa
router.get('/view-forwarded-reports', registrarController.getReports);

// Update final status of grievance
router.post('/update-grievance-status', registrarController.updateGrievanceStatus);

module.exports = router;
