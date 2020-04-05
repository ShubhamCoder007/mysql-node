const mysql = require('mysql');

var mysqlConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "demo",
    multipleStatements: true
});

mysqlConnection.connect(err => {
    if(!err) console.log("connected...");
    else console.log('Connection failed... ',err);
});

module.exports = mysqlConnection;