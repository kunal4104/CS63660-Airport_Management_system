const express = require('express');
const viewsController = require('../controllers/viewsController');

const router = express.Router();

router.get('/', viewsController.loginPage);
router.get('/index', viewsController.indexPage);

module.exports = router;
