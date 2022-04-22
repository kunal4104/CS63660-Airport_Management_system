const express = require('express');

const adminPageController = require('../controllers/adminPageController');

const router = express.Router();

router.post('/addEmployee', adminPageController.addEmployee);
router.get('/getAircraftModels', adminPageController.getAircraftModels);
router.post('/addAircrafts', adminPageController.addAircraft);
router.post('/addAircraftsModels', adminPageController.addAircraftModels);

module.exports = router;
