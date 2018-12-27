'use strict';

const sql = require('./connection');

const User = (user) => {
    this.username = user.username;
    this.email = user.email;
    this.id = user.id;
};

User.getAllUsers = (result) => {
    sql.query("select * from user", (err, res) => {

        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            console.log('users : ', res);
            result(null, res);
        }
    });
};

module.exports = User;