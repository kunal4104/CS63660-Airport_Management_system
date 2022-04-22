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
<<<<<<< HEAD
router.post('/assignedJobs', jobController.postAssignedJobs);

=======
router.post('/updateUnion', loginPageController.updateUnion);
router.get('/union/:id', unionTableController.getUnionDetails);
>>>>>>> 46b8779d373e82b8a33af36590c1945fac4e6a7d
router.get('/pastJobs', jobController.getPastJobs);
router.get('/allunions', unionTableController.getAllUnionDetails);
module.exports = router;
