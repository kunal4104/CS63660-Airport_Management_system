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

exports.getByAttribute = async (table, attributes = {}) => {
	let selectQuery = `SELECT * FROM ${table}`;
	if (Object.keys(attributes).length > 0) {
		selectQuery += ' WHERE TRUE';
		for (var key in attributes) {
			selectQuery += ` AND ${key} = "${attributes[key]}"`;
		}
	}

	console.log(selectQuery);
	const [rows, fields] = await promisePool.query(selectQuery);
	return rows;
};

exports.getByCustomQuery = async (query) => {
	const [rows, fields] = await promisePool.query(query);
	return rows;
};

exports.updateTable = async (table, attributes = {}, data = {}) => {
	let query = `UPDATE ${table} SET`;
	for (var key in attributes) {
		query += ` ${key} = "${attributes[key]}",`;
	}

	query = query.slice(0, -1);
	query += ' WHERE TRUE';
	for (var key in data) {
		query += ` AND ${key} = "${data[key]}"`;
	}

	console.log(query);
	const [ret, fields] = await promisePool.query(query);
	return ret;
};

exports.insertIntoTable = async (table, attributes = [], data = []) => {
	let query = `INSERT INTO ${table} (`;
	for(var key in attributes) {
		query += ` ${attributes[key]},`;
	}
	query = query.slice(0, -1)
	query += ') VALUES ('

	for(var key in data) {
		query += `"${data[key]}",`;
	}
	query = query.slice(0, -1)
	query += ')'
	
	console.log(query);
	try {
		const [ret,fields] = await promisePool.query( query);
		return ret
	}catch (err){
		console.log(err)
		return {err: "Error", data: err};
	}
	
	// console.log(fields)
	// return ret;
};


exports.deleteFromTable = async (table, attributes, value) => {
	let query = `DELETE FROM ${table} WHERE ${attributes} = "${value}"`;
	
	console.log(query);
	try {
		const [ret,fields] = await promisePool.query( query);
		return ret
	}catch (err){
		return {err: "Error", data: err};
	}
};