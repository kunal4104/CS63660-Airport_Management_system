const express = require('express');
const viewsController = require('../controllers/viewsController');
const { route } = require('./loginRoutes');
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
router.get('/unionMembers', viewsController.unionMembersPage);
router.get('/addEmployee', viewsController.addEmployeePage);
router.get('/addAircrafts', viewsController.addAircraftsPage);
router.get('/pastJobs', viewsController.pastJobs);
router.get('/addAircraftModels', viewsController.addAircraftsModelPage);
router.get('/addFaaTest', viewsController.addFaaTest);
router.get('/addJobReport', viewsController.addJobReport);
router.get('/addUnion', viewsController.addUnion);
router.get('/loginPage', viewsController.loginPage);
router.get('/updatePassword', viewsController.updatePassword);
module.exports = router;
