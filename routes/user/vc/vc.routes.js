const express = require("express");
const router = express.Router();
const { viewForwardedReports } = require("../../../controllers/user/vc/report.controller");
const viewController = require('../../../controllers/user/vc/view.controllers');
const createCommitteecontroller = require('../../../controllers/user/vc/committee.controller');
const grievanceController = require('../../../controllers/user/vc/grievance.controller');


// VC route to view forwarded grievances
router.get("/reports", viewForwardedReports);
router.post("/viewGrievances", viewController.viewGrievancesForwardedToVC);
// router.post("/viewGrievances", viewController.viewAllGrievances);
router.post("/viewSingleGrievances", viewController.viewSingleGrievances);
router.post('/createCommittee', createCommitteecontroller.createCommittee);
router.get('/getAllCommittees', viewController.getAllCommittees);
router.get('/faculties', viewController.getFacultyList);
router.get('/grivances', grievanceController.getAllPendingGrievances);

router.get('/getSingleCommittees',viewController.getSingleCommittees);
router.get('/viewreport/:grievanceId', viewController.viewgrievanceReport);

// reject route

router.post('/reject-grievance',grievanceController.vcRejectGrievance);
router.get('/rejected-grievance',grievanceController.getAllVcRejectedGrievances);
router.get('/resolved-grievances', grievanceController.getResolvedGrievances);
router.get('/ongoing-grievances', grievanceController.getOngoingGrievances);
router.post('/forward-to-registrar', grievanceController.forwardToRegistrar);

//reconsider route

// reconsider route
router.post('/reconsider-grievance', grievanceController.vcReconsiderGrievance);
router.get("/reconsidered-grievances", grievanceController.getReconsiderGrievances);




module.exports = router;
