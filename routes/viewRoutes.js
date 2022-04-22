const express = require('express');
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authorizationController');

const router = express.Router();

router.get('/', viewsController.loginPage);

router.use(authController.protect);

//example of admin access only
// router
// 	.route('/index')
// 	.get(authController.restrictTo('admin'), viewsController.indexPage);

router.get('/index', viewsController.indexPage);
router
	.route('/admin')
	.get(authController.restrictTo('admin'), viewsController.adminPage);
// router.get('/admin', viewsController.adminPage);
//console.log('router.get(/index');
router.get('/union', viewsController.unionPage);
router.get('/member', viewsController.membersPage);
router.get('/profile', viewsController.profilePage);
router.get('/addEmployee', viewsController.addEmployeePage);
router.get('/addAircrafts', viewsController.addAircraftsPage);

module.exports = router;
