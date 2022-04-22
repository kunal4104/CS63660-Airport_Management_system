const factory = require('./factoryController');

exports.addEmployee = async (req, res, next) => {
	const data = req.body;
	let empType = data.type === 'admin' ? 'admin' : 'user';

	const message_user_login = await factory.insertIntoTable(
		'user_login',
		['user_id', 'password', 'type'],
		[data.user_id, data.password, empType]
	);

	if (!message_user_login.err) {
		const message_emp_insert = await factory.insertIntoTable(
			'employees',
			['name', 'SSN', 'address', 'phone_num', 'salary', 'user_id'],
			[
				data.name,
				data.SSN,
				data.address,
				data.phone_num,
				data.salary,
				data.user_id,
			]
		);

		if (!message_emp_insert.err) {
			var message_sub_insert;
			if (data.type === 'technician') {
				message_sub_insert = await factory.insertIntoTable(
					'technician',
					['SSN', 'expertise'],
					[data.SSN, data.expertise]
				);
			} else if (data.type === 'ATC') {
				message_sub_insert = await factory.insertIntoTable(
					'ATC_employees',
					['SSN', 'last_testDate'],
					[data.SSN, data.last_testDate]
				);
			} else {
				res.status(200).json({
					status: 'success',
					token: 'token',
					data: { info: message_emp_insert.info },
				});
			}
			// console.log(message_sub_insert)
			if (!message_sub_insert.err) {
				res.status(200).json({
					status: 'success',
					token: 'token',
					data: { info: message_emp_insert.info },
				});
			} else {
				const message_user_login_delete = await factory.deleteFromTable(
					'user_login',
					'user_id',
					data.user_id
				);
				const message_employee_delete = await factory.deleteFromTable(
					'employees',
					'SSN',
					data.SSN
				);
				res.status(409).json({
					status: 'Failure',
					token: 'token',
					data: { info: message_employee_delete.info },
				});
			}
		} else {
			//Delete from user_login table
			const message_user_login_delete = await factory.deleteFromTable(
				'user_login',
				'user_id',
				data.user_id
			);
			res.status(409).json({
				status: 'Failure',
				token: 'token',
				data: { info: message_user_login_delete.info },
			});
		}
	} else {
		res.status(409).json({
			status: 'Failure',
			token: 'token',
			data: { info: message_user_login.info },
		});
	}
};

exports.getAircraftModels = async (req, res, next) => {
	const message_get_aircraft_models = await factory.getAll('aircraft_models');

	if (!message_get_aircraft_models.err) {
		res.status(200).json({
			status: 'success',
			data: message_get_aircraft_models,
		});
	} else {
		res.status(409).json({
			status: 'Failure',
			data: { info: message_get_aircraft_models.info },
		});
	}
};

exports.addAircraft = async (req, res, next) => {
	const data = req.body;

	const message_add_aircraft = await factory.insertIntoTable(
		'aircrafts',
		['model', 'registration_no'],
		[data.model, data.registration_no]
	);

	if (!message_add_aircraft.err) {
		res.status(200).json({
			status: 'success',
			token: 'token',
			data: { info: message_add_aircraft.info },
		});
	} else {
		res.status(409).json({
			status: 'Failure',
			token: 'token',
			data: { info: message_add_aircraft.info },
		});
	}
};

exports.addAircraftModels = async (req, res, next) => {
	const data = req.body;

	const message_add_aircraft_model = await factory.insertIntoTable(
		'aircraft_models',
		['model_num', 'name', 'capacity', 'weight'],
		[data.model_num, data.name, data.capacity, data.weight]
	);

	if (!message_add_aircraft_model.err) {
		res.status(200).json({
			status: 'success',
			token: 'token',
			data: { info: message_add_aircraft_model.info },
		});
	} else {
		res.status(409).json({
			status: 'Failure',
			token: 'token',
			data: { info: message_add_aircraft_model.info },
		});
	}
};

exports.addFaaTest = async (req, res, next) => {
	const data = req.body;

	const message_add_aircraft_model = await factory.insertIntoTable(
		'FAA_tests',
		['name', 'max_score'],
		[data.name, data.max_score]
	);

	if (!message_add_aircraft_model.err) {
		res.status(200).json({
			status: 'success',
			token: 'token',
			data: { info: message_add_aircraft_model.info },
		});
	} else {
		res.status(409).json({
			status: 'Failure',
			token: 'token',
			data: { info: message_add_aircraft_model.info },
		});
	}
};
exports.addNewUnion = async (req, res, next) => {
	const data = req.body;

	const message_add_aircraft_model = await factory.insertIntoTable(
		'unions',
		['union_id', 'name', 'founder_name', 'founded_date'],
		[data.union_id, data.name, data.founder_name, data.founded_date]
	);

	if (!message_add_aircraft_model.err) {
		res.status(200).json({
			status: 'success',
			token: 'token',
			data: { info: message_add_aircraft_model.info },
		});
	} else {
		res.status(409).json({
			status: 'Failure',
			token: 'token',
			data: { info: message_add_aircraft_model.info },
		});
	}
};

exports.getTechnician = async (req, res, next) => {
	const technicians = await factory.getAll('technician');
	ssn = [];
	technicians.forEach((el) => {
		ssn.push(el.SSN);
	});
	console.log(ssn);
	const employee = await factory.getByCondition('employees', [
		['SSN', 'IN', `(${ssn})`],
	]);
	console.log(employee);

	if (!employee.err) {
		res.status(200).json({
			status: 'success',
			data: employee,
		});
	} else {
		res.status(409).json({
			status: 'Failure',
			data: { info: employee.info },
		});
	}
};

exports.assignTask = async (req, res, next) => {
	const data = req.body;

	var dateObj = new Date();
	var month = dateObj.getUTCMonth() + 1; //months from 1-12
	var day = dateObj.getUTCDate();
	var year = dateObj.getUTCFullYear();
	var date = year + '-' + month + '-' + day;

	const assign = await factory.insertIntoTable(
		'jobs',
		['flight_num', 'technician_id', 'test_id', 'date_assigned', 'status'],
		[data.flight_num, data.technician_id, data.test_id, date, 0]
	);
	console.log(data);
	return res.status(200).json({
		status: 'success',
		data: data,
	});

	// if (!assign.err) {
	// 	res.status(200).json({
	// 		status: 'success',
	// 		token: 'token',
	// 		data: { info: assign.info },
	// 	});
	// } else {
	// 	res.status(409).json({
	// 		status: 'Failure',
	// 		token: 'token',
	// 		data: { info: assign.info },
	// 	});
	// }
};
