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