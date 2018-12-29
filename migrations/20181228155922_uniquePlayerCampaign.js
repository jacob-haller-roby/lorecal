
exports.up = function(knex, Promise) {
    return knex.schema.alterTable('campaign_players', function(t) {
        t.unique(['campaign_id', 'player_id'])
    })
};

exports.down = function(knex, Promise) {

};
