const factory = require('./factoryController');

exports.signup = (req, res, next) => {
	next();
};
exports.login = async (req, res, next) => {
	//get all attributes from the table
	//const [rows, fields] = await factory.getAll('user_login');

	//get by custom query
	// const rows = await factory.getByCustomQuery('SELECT * FROM `user_login`');

	//get by specific attribute value
	try {
		const rows = await factory.getByAttribute(
			'user_login',
			{'user_id':1}
		);
	
		console.log(rows);
	
		res.status(200).json({
			status: 'success',
			token: 'token',
			data: rows,
		});
	} catch(error){
		res.status(500).json({
			status: 'error',
			data: error,
		});
	}

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

exports.userProfile = async (req, res, next) => {
	const rows = await factory.getByAttribute(
		'employees',
		{'SSN':'1122334455'}
	);

	const techRows = await factory.getByAttribute(
		'technician',
		{'SSN':'1122334455'}
	);

	const atcRows = await factory.getByAttribute(
		'ATC_employees',
		{'SSN':'1122334455'}
	);

	
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
		{ 'name' : data.name, 'SSN' : data.SSN, 'address' : data.address, 'phone_num' : data.phone_num, 'salary' : data.salary, 'union_id' : data.union_id},
		{'SSN': data.SSN},
	);


	console.log(message)
	// console.log(rows);
	res.status(200).json({
		status: 'success',
		token: 'token',
		data: {info: message.info},
	});
};


