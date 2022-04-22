const factory = require('./factoryController');

exports.getAssignedJobs = async (req, res, next) => {
    const rows = await factory.getByAttribute(
		'jobs',
		{'technician_id':'1112223334', 'status':'1'}
	);

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
    const rows = await factory.getByAttribute(
		'jobs',
		{'technician_id':'1112223334', 'status':'2'}
	);

    res.status(200).json({
		status: 'success',
		token: 'token',
		data: rows,
	});
};