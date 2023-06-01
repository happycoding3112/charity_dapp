const mysql = require('mysql2');
const { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME } = process.env;

const con = mysql.createConnection({
	host: DB_HOST,
	user: DB_USERNAME,
	password: DB_PASSWORD,
	database: DB_NAME,
});

module.exports = { con };
