const express = require('express');

const adminPageController = require('../controllers/adminPageController');

const router = express.Router();

router.post('/addEmployee', adminPageController.addEmployee);
router.get('/getAircraftModels', adminPageController.getAircraftModels);
router.post('/addAircrafts', adminPageController.addAircraft);
router.post('/addAircraftsModels', adminPageController.addAircraftModels);
router.post('/addFaaTest', adminPageController.addFaaTest);
router.post('/addNewUnion', adminPageController.addNewUnion);
router.get('/getAllJobs', adminPageController.getAllJobs);
router.get('/getAllEmployees', adminPageController.getAllEmployees);
router.get('/getAllAircrafts', adminPageController.getAllAircrafts);


router.get('/technician', adminPageController.getTechnician);

module.exports = router;
