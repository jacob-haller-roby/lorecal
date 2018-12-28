'user strict';

const knex = require('knex');
const knex_configs = require('../knexfile');

module.exports = knex(knex_configs[process.env.NODE_ENV]);
