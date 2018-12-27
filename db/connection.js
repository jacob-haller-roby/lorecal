'user strict';

const mysql = require('mysql');

let connection;

if (process.env.NODE_ENV === 'production') {
    connection = mysql.createPool({
        user: process.env.SQL_USER,
        password: process.env.SQL_PW,
        database: process.env.SQL_DB,
        socketPath: `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`,
    });
} else {
    connection = mysql.createPool({
        host     : 'localhost',
        user     : 'lorecal',
        password : 'lorecal',
        database : 'lorecal'
    });
}

module.exports = connection;