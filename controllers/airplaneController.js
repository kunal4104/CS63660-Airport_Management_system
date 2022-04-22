const factory = require('./factoryController');

exports.getAirplanes = async (req, res, next) => {
	const rows = await factory.getAll('aircrafts');
	res.status(200).json({
		status: 'success',
		token: 'token',
		data: rows,
	});
};

exports.getFAAtest = async (req, res, next) => {
	// const rows = await factory.getByAttribute('', {
	// 	technician_id: '1112223334',
	// 	status: '2',
	// });
	console.log('FAA_test');
	const rows = await factory.getAll('FAA_tests');

	res.status(200).json({
		status: 'success',
		data: rows,
	});
};
