const express = require('express');

const airplaneController = require('../controllers/airplaneController');

const router = express.Router();

router.get('/', airplaneController.getAirplanes);
router.get('/test', airplaneController.getFAAtest);

module.exports = router;
