const mysql = require('mysql2');
const factory = require('./factoryController');

// create the connection to database
const pool = mysql.createPool({
	host: process.env.DB_HOST,
	user: process.env.DATABASE_USER,
	database: process.env.DATABASE_NAME,
	password: process.env.DATABASE_PASSWORD,
	port: process.env.DATABASE_PORT,
	connectionLimit: 10,
});

const promisePool = pool.promise();

exports.signup = (req, res, next) => {
	next();
};
exports.login = async (req, res, next) => {
	//get all attributes from the table
	//const [rows, fields] = await factory.getAll('user_login');

	//get by custom query
	// const rows = await factory.getByCustomQuery('SELECT * FROM `user_login`');

	//get by specific attribute value
	const rows = await factory.getByAttribute(
		'user_login',
		'user_id',
		'abhishek.1'
	);

	console.log(rows);

	res.status(200).json({
		status: 'success',
		token: 'token',
		data: rows,
	});
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
