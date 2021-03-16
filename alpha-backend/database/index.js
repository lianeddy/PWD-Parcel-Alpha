const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    database: 'ppa_database',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
})

module.export=connection