const factory = require('./factoryController');

exports.getAssignedJobs = async (req, res, next) => {
	user = req.user;
	const row1 = await factory.getByAttribute('jobs', {
		technician_id: user.SSN,
		status: 0,
	});

	const row2 = await factory.getByAttribute('jobs', {
		technician_id: user.SSN,
		status: 1,
	});

	rows = row1.concat(row2);
	// non_completed_rows = rows.filter(x => x.status != 2);
	res.status(200).json({
		status: 'success',
		token: 'token',
		data: rows,
	});
};

exports.getInProgessJobs = async (req, res, next) => {
	user = req.user;
	const rows = await factory.getByAttribute('jobs', {
		technician_id: user.SSN,
		status: 1,
	});

	res.status(200).json({
		status: 'success',
		token: 'token',
		data: rows,
	});
};

exports.postAssignedJobs = async (req, res, next) => {
	try {
		const data = req.body;
		const message = await factory.updateTable(
			'jobs',
			{
				status: data.status,
				date_finished: data.dateFinished,
				score: data.score,
				hours_spent: data.hrsSpent,
			},
			{ job_id: data.jobId }
		);

		console.log(message);
		// console.log(rows);
		res.status(200).json({
			status: 'success',
			token: 'token',
			data: { info: message.info },
		});
	} catch (error) {
		res.status(500).json({
			status: 'error',
			data: error.message,
		});
	}
};

exports.getPastJobs = async (req, res, next) => {
	user = req.user;
	const rows = await factory.getByAttribute('jobs', {
		technician_id: user.SSN,
		status: '2',
	});
	console.log(rows);
	res.status(200).json({
		status: 'success',
		data: rows,
	});
};

exports.getAirplaneJobs = async (req, res, next) => {
	airplane = req.params.id;
	const rows = await factory.getByAttribute('jobs', {
		flight_num: airplane,
	});
	console.log(rows);
	res.status(200).json({
		status: 'success',
		data: rows,
	});
};

exports.staticGetAirplaneJobs = async (reg_no) => {
	airplane = reg_no;
	const rows = await factory.getByAttribute('jobs', {
		flight_num: airplane,
	});

	return rows;
};
