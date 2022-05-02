const jobController = require('../controllers/jobController');

exports.loginPage = (req, res, next) => {
	res.status(200).render('loginPage');
};

exports.indexPage = (req, res, next) => {
	res.status(200).render('index');
};

exports.adminPage = (req, res, next) => {
	res.status(200).render('admin');
};

exports.unionPage = (req, res, next) => {
	res.status(200).render('unionDetails');
};

exports.membersPage = (req, res, next) => {
	res.status(200).render('viewAllMembers');
};

exports.profilePage = (req, res, next) => {
	res.status(200).render('profileSettings');
};
exports.unionMembersPage = (req, res, next) => {
	res.status(200).render('viewAllMembers');
};

exports.addEmployeePage = (req, res, next) => {
	res.status(200).render('addEmployee');
};

exports.addAircraftsPage = (req, res, next) => {
	res.status(200).render('addAircraftsPage');
};
exports.pastJobs = (req, res, next) => {
	res.status(200).render('viewPastJobs');
};
exports.addAircraftsModelPage = (req, res, next) => {
	res.status(200).render('addAircraftModels');
};
exports.addFaaTest = (req, res, next) => {
	res.status(200).render('addFaaTest');
};
exports.addJobReport = (req, res, next) => {
	res.status(200).render('addJobReport');
};
exports.addUnion = (req, res, next) => {
	res.status(200).render('addUnion');
};
exports.allJobs = (req, res, next) => {
	res.status(200).render('allJobs');
};
exports.updatePassword = (req, res, next) => {
	res.status(200).render('updatePassword');
};

exports.scheduleTest = (req, res, next) => {
	res.status(200).render('scheduleTest');
};

exports.allAircrafts = (req, res, next) => {
	res.status(200).render('allAircrafts');
};

exports.aircraftJobs = async (req, res, next) => {
	console.log(req.params.id);
	const rows = await jobController.staticGetAirplaneJobs(req.params.id);
	for (var i = 0; i < rows.length; i++) {
		if (rows[i].date_assigned)
			rows[i].date_assigned = rows[i].date_assigned.toLocaleDateString();
		if (rows[i].date_finished)
			rows[i].date_finished = rows[i].date_finished.toLocaleDateString();
		if (rows[i].status == 0) rows[i].status = 'New';
		else if (rows[i].status == 1) rows[i].status = 'In Progress';
		else if (rows[i].status == 2) rows[i].status = 'completed ';
	}

	console.log(rows);
	res
		.status(200)
		.render('aircraftJobs', { rows: rows, flight_id: req.params.id });
};
