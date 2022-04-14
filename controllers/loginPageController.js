exports.signup = (req, res, next) => {
	next();
};
exports.login = (req, res, next) => {
	res.status(200).json({
		status: 'success',
		token: 'token',
	});
};
exports.logout = (req, res, next) => {
	next();
};

exports.resetPassword = (req, res, next) => {
	next();
};

exports.forgotPassword = (req, res, next) => {
	next();
};
exports.updatePassword = (req, res, next) => {
	next();
};
