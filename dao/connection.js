'user strict';

var mysql = require('mysql');

var connection;

if (process.env.NODE_ENV === 'production') {
    connection = mysql.createConnection({
        user: process.env.SQL_USER,
        password: process.env.SQL_PW,
        database: process.env.SQL_DB,
        socketPath: `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`,
    });
} else {
    connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'lorecal',
        password : 'lorecal',
        database : 'lorecal'
    });
}

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;