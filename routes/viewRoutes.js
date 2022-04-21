const express = require('express');
const viewsController = require('../controllers/viewsController');

const router = express.Router();

router.get('/', viewsController.loginPage);

//router.get('/index', viewsController.unionPage);
router.get('/index', viewsController.indexPage);
router.get('/admin', viewsController.adminPage);
//console.log('router.get(/index');
router.get('/union', viewsController.unionPage);
router.get('/member', viewsController.membersPage);
router.get('/profile', viewsController.profilePage);
router.get('/addEmployee', viewsController.addEmployeePage);


module.exports = router;