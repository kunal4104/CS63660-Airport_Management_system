exports.loginPage = (req, res, next) => {
	res.status(200).render('loginPage');
};

exports.indexPage = (req, res, next) => {
	res.status(200).render('index');
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

exports.pastJobs = (req, res, next) => {
	res.status(200).render('viewPastJobs');
}
