'use strict';
const bcrypt = require('bcrypt');
const knex = require('../connection');

const User = (user) => {
    this.username = user.username;
    this.email = user.email;
    this.id = user.id;
};

User.hashPassword = (password) => {
    return bcrypt.hash(password, 10);
};

User.create = (user) => {
    return User.hashPassword(user.password)
        .then(hashedPassword =>
            knex('users')
                .insert({
                    ...user,
                    password: hashedPassword
                })
                .returning('id'))
        .then(id => User.findOne({id}));
};

User.update = (id, userUpdate) => {
    if (userUpdate.password) {
        return User.hashPassword(userUpdate.password)
            .then(hashedPassword =>
                knex('users').update({
                    ...userUpdate,
                    password: hashedPassword
                })
                    .where({id})
                    .then(() => User.findOne({id}))
            );
    } else {
        return knex('users').update(userUpdate)
            .where({id})
            .then(() => User.findOne({id}));
    }
};

User.getAllUsers = () => {
    return knex('users').select()
        .then(users => users.map(User.sanitize));
};

User.findOne = (userFilter) => {
    return knex('users').select()
        .where(userFilter)
        .first()
        .then(User.sanitize);
};

User.isPasswordValid = (userFilter, password) => {
    return knex('users')
        .select()
        .where(userFilter)
        .first()
        .then(user => bcrypt.compare(password, user.password)
            .then(valid => valid ? user : null)
        );
};

User.sanitize = (user) => {
    delete user.password;
    return user;
};

module.exports = User;