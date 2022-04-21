const factory = require('./factoryController');

exports.getAssignedJobs = async (req, res, next) => {
    const rows = await factory.getByAttribute(
		'jobs',
		{'technician_id':'1112223334'}
	);

    res.status(200).json({
		status: 'success',
		token: 'token',
		data: rows,
	});
};