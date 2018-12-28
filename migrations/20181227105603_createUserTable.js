exports.up = function (knex, Promise) {
    return knex.schema.createTable('users', function (table) {
        table.increments();
        table.string('username');
        table.string('email');
        table.string('password');
        table.timestamps();
    })
        .then(() =>
            knex('users').insert({
                username: 'jroby',
                email: 'jscotroby@gmail.com'
            })
        );
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('users');
};
