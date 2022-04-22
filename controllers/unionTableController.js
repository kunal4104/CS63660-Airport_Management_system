const factory = require('./factoryController');

exports.getUnionDetails = async (req, res, next) => {
	console.log(req.params.id)
    const rows = await factory.getByAttribute(
		'employees',
		{union_id:req.params.id}
	);
	//console.log(rows)

    res.status(200).json({
		status: 'success',
		token: 'token',
		data: rows,
	});
};

exports.getAllUnionDetails = async(req, res, next) => {
	const message_getAllUnionDetails = await factory.getAll(
		'unions'
	);

    if (!message_getAllUnionDetails.err) {
        res.status(200).json({
            status: 'success',
            token: 'token',
            data: message_getAllUnionDetails,
        });
    }else {
        res.status(409).json({
            status: 'Failure',
            token: 'token',
            data: {info: message_getAllUnionDetails.info},
        });
    }
};