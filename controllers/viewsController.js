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
	console.log('unionPage');
	res.status(200).render('unionDetails');
};

exports.membersPage = (req, res, next) => {
	res.status(200).render('viewAllMembers');
}

exports.profilePage = (req, res, next) => {
	res.status(200).render('profileSettings');
}

exports.addEmployeePage = (req, res, next) => {
	res.status(200).render('addEmployee');
};

exports.addAircraftsPage = (req, res, next) => {
	res.status(200).render('addAircraftsPage');
};