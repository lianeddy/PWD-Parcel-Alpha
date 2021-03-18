const mysql = require("mysql");
const util = require("util");
require("dotenv").config();

const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.PORT,
});

const query = util.promisify(db.query).bind(db);

module.exports = query;
