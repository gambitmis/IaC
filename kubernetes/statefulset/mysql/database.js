const mysql = require("mysql2");
const dbConnection = mysql.createPool({
    host: "db",
    user: "dbadmin",
    password: "password",
    database: "login"
}).promise()

module.exports = dbConnection;