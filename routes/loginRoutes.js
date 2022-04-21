const express = require('express');
const loginPageController = require('../controllers/loginPageController');
const jobController = require('../controllers/jobController');

const router = express.Router();

router.post('/signup', loginPageController.signup);
router.post('/login', loginPageController.login);
router.get('/logout', loginPageController.logout);

router.post('/forgotPassword', loginPageController.forgotPassword);
router.patch('/resetPassword/:token', loginPageController.resetPassword);

router.patch('/updatePassword', loginPageController.updatePassword);

router.get('/userProfile', loginPageController.userProfile);
router.post('/saveProfile', loginPageController.saveProfile);

router.get('/assignedJobs', jobController.getAssignedJobs);
router.get('/pastJobs', jobController.getPastJobs);

module.exports = router;
