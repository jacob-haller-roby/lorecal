const migration = require('mysql-migrations');
const sql = require('./connection');

migration.init(sql, __dirname + '/migrations');