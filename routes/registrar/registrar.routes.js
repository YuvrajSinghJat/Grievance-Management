const express = require('express');
const router = express.Router();

// Correct relative path
const registrarController = require('../../controllers/user/registrar/registrar.controllers.js');
// const grievanceController = require('../../controllers/user/registrar/grievance.controller.js');
const viewgrievancecontroller = require('../../controllers/user/registrar/view.controller.js')

// View forwarded reports from Dosa
router.get('/view-forwarded-reports', registrarController.getReports);

// Update final status of grievance
router.post('/update-grievance-status', registrarController.updateGrievanceStatus);

// router.post('/registrargrievance', grievanceController.getAllGrievances);

router.post('/allgrievanceregistrar', viewgrievancecontroller.viewAllGrievances);
router.post('/viewSingleGrievances', viewgrievancecontroller.viewSingleGrievances);

module.exports = router;
