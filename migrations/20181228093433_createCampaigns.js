exports.up = function (knex, Promise) {
    return knex.schema.createTable('campaigns', function (table) {
        table.increments();
        table.string('title');
        table.string('description');
        table.integer('dm_id').unsigned().references('id').inTable('users');
        table.timestamps();
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('campaigns');
};
