const factory = require('./factoryController');
const AppError = require('./../utils/appError');
const authController = require('../controllers/authorizationController');
exports.signup = (req, res, next) => {
	next();
};

exports.login = async (req, res, next) => {
	//get all attributes from the table
	//const [rows, fields] = await factory.getAll('user_login');

	//get by custom query
	// const rows = await factory.getByCustomQuery('SELECT * FROM `user_login`');

	//get by specific attribute value
	console.log(req);
	try {
		const { user_id, password } = req.body;
		const user = req.user;
		if (!user_id || !password) {
			return next(new AppError('Please provide user_id and password', 400));
		}

		var row = await factory.getByAttribute('user_login', {
			user_id: user_id,
		});

		if (row.length == 0 || row[0].password != password) {
			return next(new AppError('Invalid user_id or password', 400));
		}

		row = row[0];

		const token = authController.signToken(user_id);
		res.cookie('jasonwebtoken', token, {
			expires: new Date(
				Date.now() + process.env.JWT_EXPIRE * 24 * 60 * 60 * 1000
			),
			httpOnly: true,
		});

		row.password = undefined;

		res.status(200).json({
			status: 'success',
			token: token,
			data: row,
		});
	} catch (error) {
		res.status(500).json({
			status: 'error',
			data: error.message,
		});
	}
};

exports.logout = (req, res, next) => {
	res.cookie('jasonwebtoken', 'loggedout', {
		expires: new Date(Date.now() + 10 * 1000),
		httpOnly: true,
	});
	res.status(200).json({ status: 'success' });
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

exports.userProfile = async (req, res, next) => {
	const user = req.user;
	var ssnvalue = await factory.getSSN('employees', { user_id: user.user_id });
	console.log(ssnvalue);
	const rows = await factory.getByAttribute('employees', { SSN: ssnvalue[0].SSN });

	const techRows = await factory.getByAttribute('technician', {
		SSN: ssnvalue[0].SSN,
	});

	const atcRows = await factory.getByAttribute('ATC_employees', {
		SSN: ssnvalue[0].SSN,
	});

	// if techRows.length() == 0 {

	// }
	// console.log(techRows);
	// console.log(atcRows);

	if (techRows.length == 0) {
		rows[0].last_testDate = atcRows[0].last_testDate;
	}

	if (atcRows.length == 0) {
		rows[0].expertise = techRows[0].expertise;
	}
	// console.log(rows);
	res.status(200).json({
		status: 'success',
		token: 'token',
		data: rows,
	});
};

exports.saveProfile = async (req, res, next) => {
	const data = req.body;
	const message = await factory.updateTable(
		'employees',
		{
			name: data.name,
			SSN: data.SSN,
			address: data.address,
			phone_num: data.phone_num,
			salary: data.salary,
			union_id: data.union_id,
		},
		{ SSN: data.SSN }
	);



	console.log(message);
	// console.log(rows);
	res.status(200).json({
		status: 'success',
		token: 'token',
		data: { info: message.info },
	});
};

exports.updateUnion = async (req, res, next) => {
	console.log('Im here');
	const data = req.body;
	const user = req.user;
	console.log("user", user);	
	var ssnvalue = await factory.getSSN('employees', { user_id: user.user_id });
	console.log("ssnvalue", ssnvalue[0].SSN);
	union_membership = await factory.getCountMembershipAttribute('employees', {'union_id': data.union_id});
	console.log("union_membership", union_membership[0].max_count);
	const message = await factory.updateTable(
		'employees',
		{'union_id' : data.union_id, 'union_membership': union_membership[0].max_count + 1},
		{'SSN': ssnvalue[0].SSN},
	);
}
