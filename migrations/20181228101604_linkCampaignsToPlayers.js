
exports.up = function(knex, Promise) {
    return knex.schema.createTable('campaign_players', function (table) {
        table.increments();
        table.integer('player_id').unsigned().references('id').inTable('users');
        table.integer('campaign_id').unsigned().references('id').inTable('campaigns');
        table.timestamps();
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('campaign_players');
};
