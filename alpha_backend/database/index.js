const mysql = require("mysql");

const util = require("util");

const db = mysql.createConnection({
  host: "localhost",
  user: "sintha",
  password: "asd123",
  database: "ppa_database",
  port: 3306,
});

const query = util.promisify(db.query).bind(db);

module.exports = query;
