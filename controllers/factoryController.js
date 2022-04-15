const mysql = require('mysql2');

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

exports.getAll = async (table) => {
	const [rows, fields] = await promisePool.query(`SELECT * FROM ${table}`);
	// res.status(200).json({
	// 	status: 'success',
	// 	data: rows,
	// });
	return rows;
};

exports.getByAttribute = async (table, attribute, value) => {
	console.log(table, attribute, value);
	const [rows, fields] = await promisePool.query(
		`SELECT * FROM ${table} WHERE ${attribute} = "${value}"`
	);
	return rows;
};

exports.getByCustomQuery = async (query) => {
	const [rows, fields] = await promisePool.query(query);
	return rows;
};
