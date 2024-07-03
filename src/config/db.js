//src/config/db.js
const mysql = require("mysql2");
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

//me conecto
connection.connect(function(err) {
    if (err) {
        return console.error(err);
    }
    console.log("Conectado a la base de datos");
    });

//exportamos modulo
module.exports = connection;