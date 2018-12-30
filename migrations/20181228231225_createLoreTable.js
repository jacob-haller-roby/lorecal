
exports.up = function(knex, Promise) {
    return knex.schema.createTable('lore', function (table) {
        table.increments();
        table.integer('day');
        table.time('time');
        table.text('entry');
        table.integer('campaign_id').unsigned().references('id').inTable('campaigns');
        table.integer('author_id').unsigned().references('id').inTable('users');
        table.timestamps();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('lore');
};
