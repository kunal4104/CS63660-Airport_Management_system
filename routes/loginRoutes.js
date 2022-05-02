const express = require('express');
const loginPageController = require('../controllers/loginPageController');
const jobController = require('../controllers/jobController');
const unionTableController = require('../controllers/unionTableController');
const authController = require('../controllers/authorizationController');

const router = express.Router();

router.post('/signup', loginPageController.signup);
router.post('/login', loginPageController.login);
router.post('/logout', loginPageController.logout);
router.use(authController.protect);

router.post('/forgotPassword', loginPageController.forgotPassword);
router.patch('/resetPassword/:token', loginPageController.resetPassword);

router.patch('/updatePassword', loginPageController.updatePassword);

router.get('/userProfile', loginPageController.userProfile);
router.post('/saveProfile', loginPageController.saveProfile);
router.post('/updatePassword', loginPageController.updatePassword);
router.get('/assignedJobs', jobController.getAssignedJobs);
router.get('/inProgressJobs', jobController.getInProgessJobs);
router.post('/assignedJobs', jobController.postAssignedJobs);

router.post('/updateUnion', loginPageController.updateUnion);
router.get('/union/:id', unionTableController.getUnionDetails);
router.get('/pastJobs', jobController.getPastJobs);
router.get('/allunions', unionTableController.getAllUnionDetails);
module.exports = router;
