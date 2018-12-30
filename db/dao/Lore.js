const knex = require('../connection');
const DaoFactory = require('./DaoFactory');
const TABLES = require('../tables');
const COLUMNS = require('../columns');
const TO_ONE = require('../toOne');

const Lore = DaoFactory(
    (lore) => {
        this.id = lore.id;
        this.day = lore.day;
        this.time = lore.time;
        this.entry = lore.entry;
        this.campaign_id = lore.campaign_id;
        this.author_id = lore.author_id;
    },
    TABLES.LORE
);

Lore.find = (loreFilter) => {
    return knex(TABLES.LORE)
        .where(Lore.applyTableName(loreFilter))
        .leftJoin(`${TABLES.USERS} as ${TO_ONE.LORE.AUTHOR}`, `${TO_ONE.LORE.AUTHOR}.${COLUMNS.DEFAULT.ID}`, `${TABLES.LORE}.${COLUMNS.LORE.AUTHOR_ID}`)
        .leftJoin(`${TABLES.USERS} as ${TO_ONE.LORE.CAMPAIGN}`, `${TO_ONE.LORE.CAMPAIGN}.${COLUMNS.DEFAULT.ID}`, `${TABLES.LORE}.${COLUMNS.LORE.CAMPAIGN_ID}`)
        .options({ nestTables: true })
        .then(Lore.reduceJoins);
};

module.exports = Lore;