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