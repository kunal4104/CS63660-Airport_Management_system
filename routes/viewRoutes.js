const express = require('express');
const viewsController = require('../controllers/viewsController');

const router = express.Router();

router.get('/', viewsController.loginPage);

//router.get('/index', viewsController.unionPage);
router.get('/index', viewsController.indexPage);
//console.log('router.get(/index');
router.get('/union', viewsController.unionPage);
router.get('/member', viewsController.membersPage);
router.get('/profile', viewsController.profilePage);
module.exports = router;