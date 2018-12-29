
exports.up = function(knex, Promise) {
    return knex.schema.alterTable('campaigns', function(t) {
        t.text('description').alter();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.alterTable('campaigns', function(t) {
        t.string('description').alter();
    });
};
