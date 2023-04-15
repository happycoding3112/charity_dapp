const mysql = require("mysql");
const { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME } = process.env;

var con = mysql.createConnection({
  host: DB_HOST,
  user: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
});

con.connect((err) => {
  if (err) throw err;
  console.log(DB_NAME + " Connected!");
});
