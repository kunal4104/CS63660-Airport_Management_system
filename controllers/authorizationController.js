const jsonwebtoken = require('jsonwebtoken');
const AppError = require('./../utils/appError');

const factory = require('./factoryController');

exports.signToken = (user_id) =>
	jsonwebtoken.sign({ user_id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRE,
	});

exports.restrictTo = (...roles) => {
	return (req, res, next) => {
		// roles ['admin', 'lead-guide']. role='user'
		if (!roles.includes(req.user.type)) {
			return next(
				new AppError('You do not have permission to perform this action', 403)
			);
		}

		next();
	};
};

exports.protect = async (req, res, next) => {
	let token;
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		token = req.headers.authorization.split(' ')[1];
	} else if (req.cookies.jasonwebtoken) {
		// console.log(req.cookies);
		token = req.cookies.jasonwebtoken;
	}

	if (!token) {
		return next(
			new AppError('You are not logged in! Please log in to get access.', 401)
		);
	}

	// console.log(token);
	try {
		const decoded = await jsonwebtoken.verify(token, process.env.JWT_SECRET);
		// console.log(decoded);

		// let user = await factoryController.getById('user_login', decoded.user_id);
		var user = await factory.getByAttribute('user_login', {
			user_id: decoded.user_id,
		});

		if (!user) {
			return next(new AppError('The user no longer exist.', 401));
		}

		user = user[0];
		user.password = undefined;

		req.user = user;
		res.locals.user = user;

		next();
	} catch (err) {
		return next(
			new AppError('You are not logged in! Please log in to get access.', 401)
		);
	}
};
