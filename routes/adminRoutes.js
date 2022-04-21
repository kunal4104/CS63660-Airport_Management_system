const express = require('express');

const adminPageController = require('../controllers/adminPageController');

const router = express.Router();

router.post('/addEmployee', adminPageController.addEmployee);

module.exports = router;
