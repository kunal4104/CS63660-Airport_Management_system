exports.loginPage = (req, res, next) => {
	res.status(200).render('loginPage');
};

exports.indexPage = (req, res, next) => {
	res.status(200).render('index');
};
